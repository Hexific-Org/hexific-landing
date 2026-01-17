'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function SignatureReplayPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Signature Replay Attacks' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            High Severity
          </span>
        </div>
        
        <h1>Signature Replay Attacks</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          Understanding why signatures need nonces, chain IDs, and domain separators — 
          and how to implement EIP-712 correctly to prevent replay attacks.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            10 min read
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>By Hexific Security Team</span>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">$100M+</div>
          <div className="text-xs text-gray-500">Historical Losses</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">#6</div>
          <div className="text-xs text-gray-500">Common Vuln Type</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">EIP-712</div>
          <div className="text-xs text-gray-500">Standard Solution</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">100%</div>
          <div className="text-xs text-gray-500">Preventable</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-replay" className="toc-link hover:text-lime-400">What is a Signature Replay Attack?</a></li>
          <li><a href="#how-signatures-work" className="toc-link hover:text-lime-400">How Signatures Work in Ethereum</a></li>
          <li><a href="#replay-types" className="toc-link hover:text-lime-400">Types of Replay Attacks</a></li>
          <li><a href="#same-contract" className="toc-link hover:text-lime-400">Same-Contract Replay</a></li>
          <li><a href="#cross-contract" className="toc-link hover:text-lime-400">Cross-Contract Replay</a></li>
          <li><a href="#cross-chain" className="toc-link hover:text-lime-400">Cross-Chain Replay</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#eip712" className="toc-link hover:text-lime-400">EIP-712: The Solution</a></li>
          <li><a href="#implementation" className="toc-link hover:text-lime-400">Secure Implementation</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Replay Vulnerabilities</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-is-replay">
          <h2>What is a Signature Replay Attack?</h2>
          <p>
            A signature replay attack occurs when a valid cryptographic signature is used 
            more than once to execute the same or similar action. In smart contracts, this 
            typically happens when signatures lack proper uniqueness constraints like nonces, 
            timestamps, or domain separators.
          </p>

          <AlertBox type="danger" title="The Core Problem">
            Cryptographic signatures prove that someone authorized an action, but they don't 
            inherently limit how many times that authorization can be used. Without explicit 
            protections, one signature = unlimited uses.
          </AlertBox>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🎯 Why Do Contracts Use Signatures?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h5 className="font-medium text-blue-400 mb-2">⛽ Gasless Transactions</h5>
                <p className="text-sm text-gray-400">
                  Meta-transactions let users sign messages off-chain while a relayer 
                  pays the gas fees (ERC-2771, ERC-4337).
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h5 className="font-medium text-purple-400 mb-2">✍️ Permit Functions</h5>
                <p className="text-sm text-gray-400">
                  ERC-20 Permit (EIP-2612) allows token approvals via signature 
                  instead of a separate approve transaction.
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="font-medium text-green-400 mb-2">🔐 Multi-Sig Wallets</h5>
                <p className="text-sm text-gray-400">
                  Multiple owners sign off-chain, then one transaction executes 
                  with all signatures (Gnosis Safe).
                </p>
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h5 className="font-medium text-orange-400 mb-2">📋 Off-Chain Orders</h5>
                <p className="text-sm text-gray-400">
                  DEXs like 0x and Seaport use signed orders that are submitted 
                  on-chain when matched.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-signatures-work">
          <h2>How Signatures Work in Ethereum</h2>
          <p>
            Understanding ECDSA signatures is key to understanding replay attacks:
          </p>

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-white mb-4">🔑 ECDSA Signature Components</h4>
            <div className="space-y-3">
              <div className="p-3 bg-black/30 rounded-lg flex items-center gap-3">
                <code className="text-lime-400 font-mono text-sm w-8">r</code>
                <span className="text-gray-400 text-sm">X-coordinate of random point on curve (32 bytes)</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg flex items-center gap-3">
                <code className="text-purple-400 font-mono text-sm w-8">s</code>
                <span className="text-gray-400 text-sm">Signature proof value (32 bytes)</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg flex items-center gap-3">
                <code className="text-blue-400 font-mono text-sm w-8">v</code>
                <span className="text-gray-400 text-sm">Recovery ID (1 byte: 27 or 28)</span>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// How signature verification works in Solidity
function verifySignature(
    bytes32 messageHash,
    uint8 v,
    bytes32 r,
    bytes32 s
) public pure returns (address signer) {
    // Recover the signer's address from the signature
    signer = ecrecover(messageHash, v, r, s);
    
    // ecrecover returns address(0) for invalid signatures
    require(signer != address(0), "Invalid signature");
    
    return signer;
}

// The message hash must be prefixed for eth_sign compatibility
bytes32 prefixedHash = keccak256(
    abi.encodePacked("\\x19Ethereum Signed Message:\\n32", messageHash)
);`}
            language="solidity"
            filename="SignatureVerification.sol"
          />

          <AlertBox type="info" title="Signature Malleability">
            ECDSA signatures have a malleability issue: for any valid (r, s), the pair 
            (r, -s mod n) is also valid. Always use OpenZeppelin's ECDSA library which 
            enforces s to be in the lower half of the curve order.
          </AlertBox>
        </section>

        <section id="replay-types">
          <h2>Types of Replay Attacks</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">1. Same-Contract Replay</h4>
                  <p className="text-sm text-gray-400">
                    The same signature is used multiple times on the same contract to 
                    repeat an action (e.g., claiming rewards twice).
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Most Common</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Missing Nonce</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📋</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">2. Cross-Contract Replay</h4>
                  <p className="text-sm text-gray-400">
                    A signature meant for one contract is used on another contract 
                    with compatible verification logic.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">Missing Domain</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Fork Attacks</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⛓️</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">3. Cross-Chain Replay</h4>
                  <p className="text-sm text-gray-400">
                    A signature from one blockchain is replayed on another chain 
                    (e.g., mainnet signature used on a fork or L2).
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Missing Chain ID</span>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Multi-Chain Deploys</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">4. Delayed Replay</h4>
                  <p className="text-sm text-gray-400">
                    A signature is stored and used at a later time when conditions 
                    have changed (e.g., after price movements).
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Missing Deadline</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Stale Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="same-contract">
          <h2>Same-Contract Replay Deep Dive</h2>
          <p>
            The most common replay attack occurs when a signature can be reused on the 
            same contract because there's no nonce or state change that invalidates it.
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">1</span>
              <div>
                <h4 className="font-semibold text-white">User Signs Claim Message</h4>
                <p className="text-sm text-gray-400">User signs: "Claim 100 tokens for address 0xABC"</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold">2</span>
              <div>
                <h4 className="font-semibold text-green-400">First Claim Succeeds ✓</h4>
                <p className="text-sm text-gray-400">Contract verifies signature, transfers 100 tokens</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">3</span>
              <div>
                <h4 className="font-semibold text-red-400">Attacker Replays Signature 💥</h4>
                <p className="text-sm text-gray-400">Same signature submitted again — still valid!</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">4</span>
              <div>
                <h4 className="font-semibold text-red-400">Second Claim Succeeds 💥</h4>
                <p className="text-sm text-gray-400">Another 100 tokens transferred — and again, and again...</p>
              </div>
            </div>
          </div>

          <AlertBox type="warning" title="Unlimited Claims">
            Without a nonce or used-signature tracking, the attacker can drain the 
            entire token balance by replaying the same signature in a loop.
          </AlertBox>
        </section>

        <section id="cross-contract">
          <h2>Cross-Contract Replay</h2>
          <p>
            When signatures don't include the contract address, they can be replayed 
            on other contracts with similar verification logic.
          </p>

          <div className="my-6 p-5 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 border border-orange-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">📋 Cross-Contract Attack Scenario</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h5 className="text-sm font-medium text-blue-400 mb-2">Contract A (Original)</h5>
                <code className="text-xs text-gray-400 block">
                  address: 0x1111...
                </code>
                <code className="text-xs text-gray-400 block mt-1">
                  hash = keccak256(user, amount)
                </code>
                <div className="mt-2 text-xs text-green-400">✓ Signature used here</div>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg">
                <h5 className="text-sm font-medium text-red-400 mb-2">Contract B (Attacker's Fork)</h5>
                <code className="text-xs text-gray-400 block">
                  address: 0x2222...
                </code>
                <code className="text-xs text-gray-400 block mt-1">
                  hash = keccak256(user, amount)
                </code>
                <div className="mt-2 text-xs text-red-400">💥 Same signature works!</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-center">
              <span className="text-sm text-red-400">
                Contract address not in hash → Signature valid on both contracts
              </span>
            </div>
          </div>
        </section>

        <section id="cross-chain">
          <h2>Cross-Chain Replay</h2>
          <p>
            After blockchain forks (like ETH/ETC split) or when deploying to multiple 
            chains, signatures without chain IDs can be replayed across chains.
          </p>

          <div className="my-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
              <div className="text-2xl mb-2">🔵</div>
              <h4 className="font-medium text-blue-400">Ethereum</h4>
              <code className="text-xs text-gray-500">Chain ID: 1</code>
              <div className="mt-2 text-xs text-green-400">Original signature</div>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
              <div className="text-2xl mb-2">🟣</div>
              <h4 className="font-medium text-purple-400">Polygon</h4>
              <code className="text-xs text-gray-500">Chain ID: 137</code>
              <div className="mt-2 text-xs text-red-400">Replay possible! 💥</div>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
              <div className="text-2xl mb-2">🔴</div>
              <h4 className="font-medium text-red-400">Arbitrum</h4>
              <code className="text-xs text-gray-500">Chain ID: 42161</code>
              <div className="mt-2 text-xs text-red-400">Replay possible! 💥</div>
            </div>
          </div>

          <div className="my-4 p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-3">Famous Example: Wintermute (2022)</h4>
            <p className="text-sm text-gray-400 mb-3">
              After Optimism's OP token airdrop, Wintermute accidentally replayed their 
              Ethereum transaction on Optimism. An attacker noticed and replayed 20M OP 
              tokens meant for Wintermute to their own address.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">20M OP Lost</span>
              <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Cross-Chain</span>
            </div>
          </div>
        </section>

        <section id="real-examples">
          <h2>Real-World Examples</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Sushiswap - Signature Replay</h4>
                <span className="text-xs text-gray-500">2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                A vulnerability in Sushiswap's Kashi lending platform allowed signatures 
                to be replayed across different markets, enabling unauthorized borrows.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Cross-Contract</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Lending</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Polygon Plasma Bridge - $850M at Risk</h4>
                <span className="text-xs text-gray-500">2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                A critical vulnerability allowed signature replay on the Polygon Plasma 
                bridge. Whitehat discovered it — could have drained $850M.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Bridge</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Whitehat Save</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Optimism OP Token - 20M Tokens</h4>
                <span className="text-xs text-gray-500">2022</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Wintermute's multi-sig setup on Optimism was exploited through a 
                cross-chain replay attack during the OP airdrop.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Cross-Chain</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Multi-Sig</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">BadgerDAO - $120M Hack</h4>
                <span className="text-xs text-gray-500">2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                While primarily a frontend attack, stolen approval signatures were 
                replayed to drain user wallets of $120M in assets.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Approvals</span>
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">$120M Lost</span>
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>
          
          <h3>❌ Pattern 1: No Nonce (Same-Contract Replay)</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: No nonce to prevent replay
contract VulnerableClaim {
    mapping(address => bool) public claimed;  // Wrong approach!
    
    function claim(
        uint256 amount,
        bytes memory signature
    ) external {
        // ❌ Only checks if address claimed, not if signature was used
        require(!claimed[msg.sender], "Already claimed");
        
        bytes32 hash = keccak256(abi.encodePacked(msg.sender, amount));
        bytes32 ethHash = keccak256(
            abi.encodePacked("\\x19Ethereum Signed Message:\\n32", hash)
        );
        
        address signer = recoverSigner(ethHash, signature);
        require(signer == owner, "Invalid signature");
        
        claimed[msg.sender] = true;
        
        // 💥 Problem: User can claim again with DIFFERENT amount!
        // Or attacker can use signature for msg.sender = contract
        token.transfer(msg.sender, amount);
    }
}`}
            language="solidity"
            filename="VulnerableClaim.sol"
          />

          <h3>❌ Pattern 2: No Domain Separator (Cross-Contract Replay)</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: No contract address in hash
contract VulnerablePermit {
    function permit(
        address spender,
        uint256 amount,
        uint256 deadline,
        uint8 v, bytes32 r, bytes32 s
    ) external {
        require(block.timestamp <= deadline, "Expired");
        
        // ❌ No contract address, no chain ID!
        bytes32 hash = keccak256(abi.encodePacked(
            msg.sender,  // owner
            spender,
            amount,
            deadline
        ));
        
        address signer = ecrecover(hash, v, r, s);
        require(signer == msg.sender, "Invalid sig");
        
        // 💥 This signature works on ANY contract with same logic!
        allowance[msg.sender][spender] = amount;
    }
}`}
            language="solidity"
            filename="VulnerablePermit.sol"
          />

          <h3>❌ Pattern 3: No Chain ID (Cross-Chain Replay)</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: No chain ID protection
contract VulnerableBridge {
    function withdraw(
        address to,
        uint256 amount,
        bytes memory signature
    ) external {
        // ❌ Same signature valid on mainnet, testnet, L2s, forks...
        bytes32 hash = keccak256(abi.encodePacked(
            to,
            amount,
            nonces[to]++  // Has nonce, but no chain ID!
        ));
        
        require(verifySignature(hash, signature), "Invalid");
        
        // 💥 Deploy same contract on Polygon, replay mainnet signatures
        payable(to).transfer(amount);
    }
}`}
            language="solidity"
            filename="VulnerableBridge.sol"
          />

          <h3>❌ Pattern 4: No Deadline (Delayed Replay)</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Signature never expires
contract VulnerableSwap {
    function executeOrder(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        bytes memory signature
    ) external {
        bytes32 hash = keccak256(abi.encodePacked(
            msg.sender,
            tokenIn,
            tokenOut,
            amountIn,
            minAmountOut
            // ❌ No deadline! Signature valid forever
        ));
        
        require(verifySignature(hash, signature), "Invalid");
        
        // 💥 Signature can be held and executed when prices change
        // User signed minAmountOut=100, prices dropped, they get 100 
        // instead of current fair value of 150
        _executeSwap(tokenIn, tokenOut, amountIn, minAmountOut);
    }
}`}
            language="solidity"
            filename="VulnerableSwap.sol"
          />
        </section>

        <section id="eip712">
          <h2>EIP-712: The Solution</h2>
          <p>
            EIP-712 is the standard for typed structured data signing. It prevents replay 
            attacks by including a domain separator with contract address and chain ID.
          </p>

          <div className="my-8 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-4">🛡️ EIP-712 Domain Separator Components</h4>
            <div className="space-y-3">
              <div className="p-3 bg-black/30 rounded-lg">
                <code className="text-lime-400 text-sm">name</code>
                <span className="text-gray-400 text-sm ml-3">Human-readable contract name</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <code className="text-purple-400 text-sm">version</code>
                <span className="text-gray-400 text-sm ml-3">Contract version (e.g., "1")</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <code className="text-blue-400 text-sm">chainId</code>
                <span className="text-gray-400 text-sm ml-3">Prevents cross-chain replay</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <code className="text-orange-400 text-sm">verifyingContract</code>
                <span className="text-gray-400 text-sm ml-3">Prevents cross-contract replay</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <code className="text-pink-400 text-sm">salt</code>
                <span className="text-gray-400 text-sm ml-3">(Optional) Additional uniqueness</span>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// EIP-712 Domain Separator Structure
bytes32 constant DOMAIN_TYPEHASH = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);

bytes32 DOMAIN_SEPARATOR = keccak256(abi.encode(
    DOMAIN_TYPEHASH,
    keccak256(bytes("MyProtocol")),     // name
    keccak256(bytes("1")),               // version
    block.chainid,                       // chainId (prevents cross-chain)
    address(this)                        // verifyingContract (prevents cross-contract)
));

// The final hash to sign
bytes32 digest = keccak256(abi.encodePacked(
    "\\x19\\x01",           // EIP-712 prefix
    DOMAIN_SEPARATOR,       // Domain-specific data
    structHash              // The actual message struct hash
));`}
            language="solidity"
            filename="EIP712.sol"
          />
        </section>

        <section id="implementation">
          <h2>Secure Implementation</h2>

          <h3>✅ Complete EIP-712 Implementation</h3>
          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract SecurePermit is EIP712 {
    using ECDSA for bytes32;
    
    // ✅ Nonces prevent same-contract replay
    mapping(address => uint256) public nonces;
    mapping(address => mapping(address => uint256)) public allowance;
    
    // ✅ Type hash for the Permit struct
    bytes32 public constant PERMIT_TYPEHASH = keccak256(
        "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
    );
    
    constructor() EIP712("SecurePermit", "1") {}
    
    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        // ✅ Check deadline (prevents delayed replay)
        require(block.timestamp <= deadline, "Permit expired");
        
        // ✅ Build struct hash with nonce
        bytes32 structHash = keccak256(abi.encode(
            PERMIT_TYPEHASH,
            owner,
            spender,
            value,
            nonces[owner]++,  // ✅ Increment nonce (prevents same-contract replay)
            deadline
        ));
        
        // ✅ EIP-712 digest includes domain separator (chain ID + contract address)
        bytes32 digest = _hashTypedDataV4(structHash);
        
        // ✅ Recover and verify signer
        address signer = ECDSA.recover(digest, v, r, s);
        require(signer == owner, "Invalid signature");
        
        // Execute the permit
        allowance[owner][spender] = value;
        
        emit Approval(owner, spender, value);
    }
    
    // ✅ Expose domain separator for frontend
    function DOMAIN_SEPARATOR() external view returns (bytes32) {
        return _domainSeparatorV4();
    }
    
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`}
            language="solidity"
            filename="SecurePermit.sol"
          />

          <h3>✅ Frontend Signing with ethers.js</h3>
          <CodeBlock
            code={`import { ethers } from 'ethers';

async function signPermit(
  signer: ethers.Signer,
  contractAddress: string,
  spender: string,
  value: bigint,
  nonce: bigint,
  deadline: bigint
) {
  const domain = {
    name: "SecurePermit",
    version: "1",
    chainId: await signer.provider!.getNetwork().then(n => n.chainId),
    verifyingContract: contractAddress
  };
  
  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ]
  };
  
  const message = {
    owner: await signer.getAddress(),
    spender,
    value,
    nonce,
    deadline
  };
  
  // EIP-712 typed data signing
  const signature = await signer.signTypedData(domain, types, message);
  
  // Split signature for contract
  const { v, r, s } = ethers.Signature.from(signature);
  
  return { v, r, s };
}`}
            language="typescript"
            filename="signPermit.ts"
          />

          <h3>✅ Alternative: Used Signature Tracking</h3>
          <CodeBlock
            code={`// ✅ SECURE: Track used signatures (alternative to nonces)
contract SecureClaim {
    mapping(bytes32 => bool) public usedSignatures;
    
    function claim(
        uint256 amount,
        uint256 deadline,
        bytes memory signature
    ) external {
        require(block.timestamp <= deadline, "Expired");
        
        // Create unique hash including all parameters
        bytes32 hash = keccak256(abi.encodePacked(
            "\\x19\\x01",
            DOMAIN_SEPARATOR,
            keccak256(abi.encode(
                CLAIM_TYPEHASH,
                msg.sender,
                amount,
                deadline
            ))
        ));
        
        // ✅ Check if signature was already used
        require(!usedSignatures[hash], "Signature already used");
        
        // Verify signature
        address signer = ECDSA.recover(hash, signature);
        require(signer == trustedSigner, "Invalid signature");
        
        // ✅ Mark signature as used BEFORE transfer (CEI pattern)
        usedSignatures[hash] = true;
        
        token.transfer(msg.sender, amount);
    }
}`}
            language="solidity"
            filename="SecureClaim.sol"
          />
        </section>

        <section id="testing">
          <h2>Testing for Replay Vulnerabilities</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SecurePermit.sol";

contract ReplayAttackTest is Test {
    SecurePermit permit;
    uint256 ownerKey = 0x1234;
    address owner;
    address spender = makeAddr("spender");
    
    function setUp() public {
        permit = new SecurePermit();
        owner = vm.addr(ownerKey);
    }
    
    // ✅ Test: Same signature cannot be reused
    function test_RevertWhen_SignatureReplayed() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = permit.nonces(owner);
        
        // Create valid signature
        bytes32 digest = _getDigest(owner, spender, 100, nonce, deadline);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey, digest);
        
        // First use succeeds
        permit.permit(owner, spender, 100, deadline, v, r, s);
        
        // ✅ Replay attempt should fail
        vm.expectRevert("Invalid signature");
        permit.permit(owner, spender, 100, deadline, v, r, s);
    }
    
    // ✅ Test: Expired signatures rejected
    function test_RevertWhen_SignatureExpired() public {
        uint256 deadline = block.timestamp + 1 hours;
        uint256 nonce = permit.nonces(owner);
        
        bytes32 digest = _getDigest(owner, spender, 100, nonce, deadline);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey, digest);
        
        // Fast forward past deadline
        vm.warp(deadline + 1);
        
        vm.expectRevert("Permit expired");
        permit.permit(owner, spender, 100, deadline, v, r, s);
    }
    
    // ✅ Test: Cross-chain replay protection
    function test_CrossChainReplayPrevented() public {
        uint256 deadline = block.timestamp + 1 hours;
        
        // Deploy on "mainnet" (chain 1)
        vm.chainId(1);
        SecurePermit mainnetPermit = new SecurePermit();
        
        // Create signature for mainnet
        bytes32 mainnetDigest = _getDigest(
            mainnetPermit, owner, spender, 100, 0, deadline
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey, mainnetDigest);
        
        // Switch to "polygon" (chain 137)
        vm.chainId(137);
        SecurePermit polygonPermit = new SecurePermit();
        
        // ✅ Mainnet signature should fail on Polygon
        vm.expectRevert("Invalid signature");
        polygonPermit.permit(owner, spender, 100, deadline, v, r, s);
    }
    
    // ✅ Fuzz test: Nonces always increment correctly
    function testFuzz_NonceIncrementsCorrectly(uint8 numPermits) public {
        vm.assume(numPermits > 0 && numPermits < 50);
        
        for (uint i = 0; i < numPermits; i++) {
            uint256 expectedNonce = i;
            assertEq(permit.nonces(owner), expectedNonce);
            
            uint256 deadline = block.timestamp + 1 hours;
            bytes32 digest = _getDigest(owner, spender, 100, expectedNonce, deadline);
            (uint8 v, bytes32 r, bytes32 s) = vm.sign(ownerKey, digest);
            
            permit.permit(owner, spender, 100, deadline, v, r, s);
            
            // Nonce should have incremented
            assertEq(permit.nonces(owner), expectedNonce + 1);
        }
    }
    
    function _getDigest(
        address _owner,
        address _spender,
        uint256 _value,
        uint256 _nonce,
        uint256 _deadline
    ) internal view returns (bytes32) {
        return _getDigest(permit, _owner, _spender, _value, _nonce, _deadline);
    }
    
    function _getDigest(
        SecurePermit _permit,
        address _owner,
        address _spender,
        uint256 _value,
        uint256 _nonce,
        uint256 _deadline
    ) internal view returns (bytes32) {
        bytes32 structHash = keccak256(abi.encode(
            _permit.PERMIT_TYPEHASH(),
            _owner,
            _spender,
            _value,
            _nonce,
            _deadline
        ));
        
        return keccak256(abi.encodePacked(
            "\\x19\\x01",
            _permit.DOMAIN_SEPARATOR(),
            structHash
        ));
    }
}`}
            language="solidity"
            filename="ReplayAttackTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ Signature Security Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither Detectors</h5>
                <code className="text-xs text-gray-400">slither . --detect erc20-indexed,arbitrary-send-erc20</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">OpenZeppelin</h5>
                <p className="text-xs text-gray-400">Use EIP712.sol and ECDSA.sol utilities</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">eth-sig-util</h5>
                <p className="text-xs text-gray-400">JavaScript library for EIP-712 signing</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Foundry</h5>
                <code className="text-xs text-gray-400">vm.sign(privateKey, digest)</code>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ Signature Security Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Using EIP-712 typed data signing',
              'Domain separator includes chain ID',
              'Domain separator includes contract address',
              'Nonce incremented for each signature',
              'OR: Used signatures tracked in mapping',
              'Deadline/expiry included in signed data',
              'Using OpenZeppelin ECDSA library',
              'Signature malleability handled (s in lower half)',
              'Testing replay on same contract',
              'Testing cross-chain replay scenarios',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-lime-400">☐</span>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="my-12 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">📚 Quick Reference</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-red-400 mb-2">🚫 Must Include</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Nonce (per-user counter)</li>
                <li>• Chain ID</li>
                <li>• Contract address</li>
                <li>• Deadline/expiry</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-lime-400 mb-2">✅ Use These</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• OpenZeppelin EIP712</li>
                <li>• OpenZeppelin ECDSA</li>
                <li>• signTypedData (ethers)</li>
                <li>• eth_signTypedData_v4</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Common Mistakes</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Plain ecrecover (no lib)</li>
                <li>• No domain separator</li>
                <li>• Reusing signatures</li>
                <li>• No deadline check</li>
              </ul>
            </div>
          </div>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Signatures', 'EIP-712', 'Replay Attack', 'Nonce', 'ECDSA', 'Smart Contract Security'].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs text-lime-400/70 bg-lime-400/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3">
            <button className="p-2 text-gray-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/learn/vulnerabilities/access-control-vulnerabilities" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Access Control Vulnerabilities</h4>
              <p className="text-sm text-gray-500 mt-1">Authorization mistakes related to signatures</p>
            </Link>
            <Link href="/learn/vulnerabilities/front-running" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Front-Running & MEV</h4>
              <p className="text-sm text-gray-500 mt-1">Signed transactions can be front-run</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Using Signatures in Your Protocol?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Signature replay attacks are subtle and easy to miss. Our auditors have 
            identified countless replay vulnerabilities in meta-transactions, permits, 
            and gasless systems.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
          >
            Get a Free Audit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
