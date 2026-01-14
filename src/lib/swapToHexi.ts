import { 
  Keypair,
  VersionedTransaction,
  Connection,
  TransactionMessage,
  AddressLookupTableAccount,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import bs58 from 'bs58';

const PRIV_B58 = process.env.PRIV_B58 || '';
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

const SENDER_ENDPOINT = 'http://sg-sender.helius-rpc.com/fast';

const SWAP_AMOUNT = 1000000; // 0.001 SOL
const SWAP_FROM_TOKEN = "So11111111111111111111111111111111111111112";
const SWAP_TO_TOKEN = "3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump";
const SWAP_SLIPPAGE_BPS = 50;

const TIP_ACCOUNTS = [
  "4ACfpUFoaSD9bfPdeu6DBt89gB6ENTeHBXCAi87NhDEE",
  "D2L6yPZ2FmmmTKPgzaMKdhu6EWZcTpLy1Vhx8uvZe7NZ",
  "9bnz4RShgq1hAnLnZbP8kbgBg1kEmcJBYQq3gQbmnSta",
  "5VY91ws6B2hMmBFRsXkoAAdsPHBJwRfBht4DXox3xkwn",
  "2nyhqdwKcJZR2vcqCyrYsaPVdAnFoJjiksCXJ7hfEYgD",
  "2q5pghRs6arqVjRvT5gfgWfWcHWmw1ZuCzphgd5KfWGJ",
  "wyvPkWjVZz1M8fHQnMMCDTQDbkManefNNhweYk5WkcF",
  "3KCKozbAaF75qEU33jtzozcJ29yJuaLJTy2jFdzUY8bT",
  "4vieeGHPYPG2MmyPRcYjdiDmmhN3ww7hsFNap8pVN3Ey",
  "4TQLFNWK8AovT1gFvda5jfw2oJeRMKEmw7aH6MGBJ3or"
];

// Use the Jupiter API to get a quote
// https://dev.jup.ag/docs/api/swap-api/quote
async function getQuote(inputMint: string, outputMint: string, amount: number, slippageBps: number) {
  console.log("Request Jupiter quote");
  const url = `https://lite-api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
  const response = (await fetch(url)).json();
  return response
}

// Use the Jupiter API to get a swap transaction, based on the quote response
// https://dev.jup.ag/docs/api/swap-api/swap
async function getSwap(quote: any) {
  console.log("Request Jupiter swap");

  const user_wallet = Keypair.fromSecretKey(bs58.decode(PRIV_B58));
  const url = "https://lite-api.jup.ag/swap/v1/swap"
  const args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quoteResponse: quote,
      userPublicKey: user_wallet.publicKey,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: {
        priorityLevelWithMaxLamports: {
          maxLamports: 1000000,
          priorityLevel: "veryHigh"
        }
      }
    })
  }
  const response = (await fetch(url, args)).json();
  return response;
}

async function createSenderTransactionFromSwapResponse(swapResponse: any) {
  console.log("Create transaction for Sender");

  // Deserialize the Jupiter transaction
  const transactionBase64 = swapResponse.swapTransaction
  const jupiterTransaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));

  // Get the Address Lookup Tables
  const connection = new Connection(
    'https://mainnet.helius-rpc.com/?api-key=' + HELIUS_API_KEY
  );

  let altAccountResponses = await Promise.all(
    jupiterTransaction.message.addressTableLookups.map(l => connection.getAddressLookupTable(l.accountKey))
  );

  let altAccounts: AddressLookupTableAccount[] = altAccountResponses.map(item => {
    if (item.value == null) throw new Error("ALT is null");
    return item.value;
  });

  // Use the Address Lookup Tables to decompile the transaction
  let decompiledMessage = TransactionMessage.decompile(jupiterTransaction.message, {
    addressLookupTableAccounts: altAccounts,
  });

  // Note that Jupiter has already added the Compute Budget instructions
  // Nothing needs to be done here

  // Add a tip instruction
  const user_wallet = Keypair.fromSecretKey(bs58.decode(PRIV_B58));
  const transferIx = SystemProgram.transfer({
    fromPubkey: user_wallet.publicKey,
    toPubkey: new PublicKey(TIP_ACCOUNTS[Math.floor(Math.random() * TIP_ACCOUNTS.length)]!),
    lamports: 0.0002 * LAMPORTS_PER_SOL,
  })

  decompiledMessage.instructions.push(transferIx);

  // Compile the full transaction
  const transaction = new VersionedTransaction(decompiledMessage.compileToV0Message(altAccounts));

  // Sign the transaction
  transaction.sign([user_wallet]);

  return transaction;
}

async function broadcastTransactionWithSender(transaction: VersionedTransaction) {
  console.log("Send to Sender");

  const connection = new Connection(
    'https://mainnet.helius-rpc.com/?api-key=' + HELIUS_API_KEY
  );

  const response = await fetch(SENDER_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now().toString(),
      method: 'sendTransaction',
      params: [
        Buffer.from(transaction.serialize()).toString('base64'),
        {
          encoding: 'base64',
          skipPreflight: true, // Required for Sender
          maxRetries: 0
        }
      ]
    })
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  console.log("Sender Response:");
  console.log(json);

  console.log("Wait for confirmation");
  const {blockhash, lastValidBlockHeight} = await connection.getLatestBlockhash();
  const result = await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: bs58.encode(transaction.signatures[0]!)
  }, 'confirmed');
  console.log("Confirmed");
}

async function main() {
  const amount = SWAP_AMOUNT.toString();
  const quote = await getQuote(SWAP_FROM_TOKEN, SWAP_TO_TOKEN, SWAP_AMOUNT, SWAP_SLIPPAGE_BPS);
  const swap = await getSwap(quote);
  const senderTransaction = await createSenderTransactionFromSwapResponse(swap);
  console.log("Signature:", bs58.encode(senderTransaction.signatures[0]!));
  await broadcastTransactionWithSender(senderTransaction);
}

main().catch(console.error);