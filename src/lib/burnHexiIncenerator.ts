import axios from 'axios';
import { 
    Connection, 
    Keypair, 
    TransactionInstruction, 
    TransactionMessage,
    VersionedTransaction,
    PublicKey 
} from '@solana/web3.js';
import bs58 from 'bs58';

const PRIV_B58 = process.env.PRIV_B58 || '';

interface BurnInstructionsResponse {
    assetId: string;                        // Asset that will be processed
    instructions: SerializedInstruction[];  // Array of instructions
    lamportsReclaimed: number;              // Lamports that will be reclaimed
    solanaReclaimed: number;               // SOL equivalent
    instructionType: string;               // Type of burn operation
    isDestructiveAction: boolean;          // Always true for burns
}

interface SerializedInstruction {
    programId: string;                     // Program ID as base58 string
    accounts: SerializedAccount[];         // Account metadata
    data: string;                         // Base64 encoded instruction data
}

interface SerializedAccount {
    pubkey: string;                       // Account public key as base58 string
    isSigner: boolean;                    // Whether account must sign
    isWritable: boolean;                  // Whether account is writable
}

async function main(amount: number): Promise<BurnInstructionsResponse> {
    // Get burn instructions from API
    const response = await axios.post('https://v1.api.sol-incinerator.com/burn-instructions', {
        userPublicKey: '9UpVXGUJo2Hbgt2uw7UhUyNgusuYVdoHYnstV8J7wGt3',
        assetId: '3ghjaogpDVt7QZ6eNauoggmj4WYw23TkpyVN2yZjpump',
        autoCloseTokenAccounts: false,
        burnAmount: amount
    }, {
        headers: {
            'x-api-key': 'your-api-key-here'
        }
    });

    console.log('Instructions:', response.data.instructions);
    console.log('Lamports reclaimed:', response.data.lamportsReclaimed);

    // Convert serialized instructions to TransactionInstruction objects
    const instructions: TransactionInstruction[] = response.data.instructions.map((ix: SerializedInstruction) => {
        return new TransactionInstruction({
            programId: new PublicKey(ix.programId),
            keys: ix.accounts.map((acc: SerializedAccount) => ({
                pubkey: new PublicKey(acc.pubkey),
                isSigner: acc.isSigner,
                isWritable: acc.isWritable
            })),
            data: Buffer.from(ix.data, 'base64')
        });
    });

    // Create transaction
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    const wallet = Keypair.fromSecretKey(bs58.decode(PRIV_B58));
    
    // Get fresh blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    
    // Create transaction message
    const message = new TransactionMessage({
        payerKey: wallet.publicKey,  // Set fee payer
        recentBlockhash: blockhash,
        instructions: instructions
    }).compileToV0Message();
    
    // Create and sign transaction
    const transaction = new VersionedTransaction(message);
    transaction.sign([wallet]);
    
    // Send transaction
    const signature = await connection.sendTransaction(transaction);
    console.log('Transaction signature:', signature);

    return {
        ...response.data,
        instructions: instructions
    }
}

main(100).catch(console.error);