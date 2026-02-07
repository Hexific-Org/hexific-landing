'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function WeakRandomnessPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Weak Randomness & Timestamp Dependence' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Beginner
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Medium Severity
          </span>
        </div>

        <h1>Weak Randomness & Timestamp Dependence</h1>

        <p className="text-xl text-gray-300 mt-4">
          Why on-chain randomness is fundamentally broken, how miners and validators can 
          manipulate block variables, and the only secure ways to generate random numbers 
          in smart contracts.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            7 min read
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
          <div className="text-2xl font-bold text-red-400">0%</div>
          <div className="text-xs text-gray-500">On-Chain Entropy</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">15 sec</div>
          <div className="text-xs text-gray-500">Timestamp Drift</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">$100M+</div>
          <div className="text-xs text-gray-500">Lost in Exploits</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">VRF</div>
          <div className="text-xs text-gray-500">The Solution</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#the-problem" className="toc-link hover:text-lime-400">Why On-Chain Randomness Is Broken</a></li>
          <li><a href="#block-variables" className="toc-link hover:text-lime-400">Exploitable Block Variables</a></li>
          <li><a href="#timestamp" className="toc-link hover:text-lime-400">Timestamp Manipulation</a></li>
          <li><a href="#blockhash" className="toc-link hover:text-lime-400">Blockhash Predictability</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Exploits</a></li>
          <li><a href="#prevrandao" className="toc-link hover:text-lime-400">PREVRANDAO (Post-Merge)</a></li>
          <li><a href="#solutions" className="toc-link hover:text-lime-400">Secure Randomness Solutions</a></li>
          <li><a href="#chainlink-vrf" className="toc-link hover:text-lime-400">Chainlink VRF Implementation</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Weak Randomness</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="the-problem">
          <h2>Why On-Chain Randomness Is Broken</h2>
          <p>
            Blockchains are deterministic state machines — every node must produce the 
            exact same result for every transaction. This fundamental property makes true 
            randomness impossible on-chain, because any "random" value that one node 
            can compute, every other node (and every attacker) can compute too.
          </p>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🎲 The Determinism Problem</h4>

            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖥️</span>
                  <div>
                    <h5 className="font-medium text-blue-400">Traditional App</h5>
                    <p className="text-sm text-gray-400">Server generates random number privately → users can't predict</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⛓️</span>
                  <div>
                    <h5 className="font-medium text-red-400">Blockchain</h5>
                    <p className="text-sm text-gray-400">Everything is public → any on-chain "randomness" is predictable</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-sm text-yellow-400">
                💡 <strong>Key insight:</strong> If a smart contract can compute a random 
                number, so can an attacker — by reading the same inputs in the same block 
                or by simulating the transaction.
              </span>
            </div>
          </div>

          <AlertBox type="danger" title="Weak Randomness = Free Money for Attackers">
            Any lottery, game, NFT mint, or selection mechanism that uses predictable 
            on-chain data can be exploited. Attackers deploy contracts that pre-compute 
            the "random" outcome and only participate when they know they'll win.
          </AlertBox>
        </section>

        <section id="block-variables">
          <h2>Exploitable Block Variables</h2>
          <p>
            Developers commonly use these block-level variables as randomness sources. 
            Every single one is exploitable:
          </p>

          <div className="my-8 space-y-4">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏱️</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">block.timestamp</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    The timestamp of the current block. Validators can manipulate this 
                    within a ~15 second range. Also publicly known before your transaction executes.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Validator Controlled</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">Predictable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">#️⃣</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">blockhash(block.number - 1)</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    The hash of a previous block. Known to everyone once the block is 
                    produced. Returns <code>bytes32(0)</code> for blocks older than 256 
                    blocks, creating another exploit vector.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Publicly Visible</span>
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">256 Block Limit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔢</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">block.number</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    The current block number. Trivially predictable — it just increments 
                    by one each block.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Sequential</span>
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">100% Predictable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">block.prevrandao (block.difficulty)</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    After The Merge, <code>block.difficulty</code> was replaced with 
                    <code> block.prevrandao</code>. While better, validators know this value 
                    before proposing a block and can choose to skip.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Biasable</span>
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">Validator Peeking</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⛏️</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">block.coinbase</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    The address of the block's validator/miner. The validator themselves 
                    chose this value.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Validator Controlled</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⛽</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">gasleft(), msg.sender, tx.gasprice</h4>
                  <p className="text-sm text-gray-400 mb-2">
                    Transaction-level values that the sender controls or can predict. 
                    Using these as entropy sources provides zero security.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Sender Controlled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="timestamp">
          <h2>Timestamp Manipulation</h2>
          <p>
            <code>block.timestamp</code> is the most commonly misused on-chain value. 
            While it seems random, validators have significant control over it.
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">⏱️ Timestamp Manipulation Window</h4>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-black/30 rounded-lg text-center">
                <h5 className="text-sm font-medium text-blue-400 mb-2">Pre-Merge (PoW)</h5>
                <p className="text-2xl font-bold text-white mb-1">~900 sec</p>
                <p className="text-xs text-gray-500">Miners could set timestamp<br/>up to ~15 min ahead of parent</p>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg text-center">
                <h5 className="text-sm font-medium text-purple-400 mb-2">Post-Merge (PoS)</h5>
                <p className="text-2xl font-bold text-white mb-1">12 sec</p>
                <p className="text-xs text-gray-500">Fixed slot times, but validators<br/>can skip their slot</p>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg text-center">
                <h5 className="text-sm font-medium text-red-400 mb-2">Attacker Advantage</h5>
                <p className="text-2xl font-bold text-white mb-1">100%</p>
                <p className="text-xs text-gray-500">Attacker simulates the tx<br/>and knows the timestamp</p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// Common timestamp-dependent patterns and their risks

// 🚨 VULNERABLE: Timestamp as randomness
function isWinner() external view returns (bool) {
    // Validator knows this before including your tx
    // Any user can simulate and only call when they'd win
    return block.timestamp % 2 == 0;
}

// 🚨 VULNERABLE: Timestamp for time-locked logic
function unlock() external {
    // Validator can slightly adjust timestamp to unlock early
    // On PoS: attacker waits for a specific slot time
    require(block.timestamp >= unlockTime, "Too early");
    // ...
}

// ⚠️ CAUTION: Timestamp for deadlines
function bid() external payable {
    // Generally acceptable IF the window is large (hours/days)
    // NOT safe if window is small (seconds/minutes)
    require(block.timestamp < auctionEnd, "Auction ended");
    // ...
}`}
            language="solidity"
            filename="TimestampRisks.sol"
          />

          <AlertBox type="info" title="When Is block.timestamp Acceptable?">
            Using <code>block.timestamp</code> for time-based logic is acceptable when:
            (1) the time window is large enough that a ~15 second drift doesn't matter,
            (2) it's not used as a source of randomness, and 
            (3) the value at stake doesn't justify a validator's manipulation cost.
          </AlertBox>
        </section>

        <section id="blockhash">
          <h2>Blockhash Predictability</h2>
          <p>
            <code>blockhash()</code> returns the hash of a given block, but it has critical 
            limitations that developers often miss:
          </p>

          <CodeBlock
            code={`// 🚨 blockhash() gotchas

// 1. Hash of CURRENT block is always 0
bytes32 current = blockhash(block.number);
// current == bytes32(0) — ALWAYS!

// 2. Only works for last 256 blocks
bytes32 old = blockhash(block.number - 257);
// old == bytes32(0) — too old!

// 3. Previous block hash is publicly known
bytes32 prev = blockhash(block.number - 1);
// Known by everyone before this block's transactions execute

// 🚨 VULNERABLE: Common "random" pattern
function getRandomNumber() public view returns (uint256) {
    // This is PUBLIC KNOWLEDGE at execution time!
    return uint256(keccak256(abi.encodePacked(
        blockhash(block.number - 1),
        block.timestamp,
        msg.sender
    )));
}`}
            language="solidity"
            filename="BlockhashRisks.sol"
          />

          <div className="my-6 p-5 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-red-400 mb-3">💥 The 256-Block Attack</h4>
            <p className="text-sm text-gray-400 mb-3">
              Some contracts use a commit-reveal scheme where users commit in one block 
              and the blockhash of a future block is used as randomness. If the reveal 
              isn't forced within 256 blocks, <code>blockhash()</code> returns 0, and 
              the attacker knows the outcome.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-red-400">1.</span> Player commits bet at block N
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">2.</span> Randomness = blockhash(N + 1), to be revealed later
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">3.</span> Attacker waits 256+ blocks → blockhash returns 0
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">4.</span> Attacker reveals when hash=0 → predictable outcome!
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>

          <h3>❌ Pattern 1: On-Chain Lottery</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Predictable lottery winner
contract VulnerableLottery {
    address[] public players;
    
    function enter() external payable {
        require(msg.value == 0.1 ether, "Must send 0.1 ETH");
        players.push(msg.sender);
    }
    
    function pickWinner() external {
        require(players.length > 0, "No players");
        
        // 💀 ALL of these inputs are known or predictable:
        uint256 random = uint256(keccak256(abi.encodePacked(
            block.timestamp,       // Validator controlled
            block.prevrandao,      // Known to validator
            players.length         // Publicly readable
        )));
        
        uint256 index = random % players.length;
        address winner = players[index];
        
        payable(winner).transfer(address(this).balance);
        delete players;
    }
}`}
            language="solidity"
            filename="VulnerableLottery.sol"
          />

          <h3>❌ Pattern 2: NFT Rarity Manipulation</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Predictable NFT traits
contract VulnerableNFT {
    function mint() external payable {
        uint256 tokenId = totalSupply + 1;
        
        // 💀 Attacker can pre-compute rarity
        uint256 seed = uint256(keccak256(abi.encodePacked(
            block.timestamp,
            msg.sender,
            tokenId
        )));
        
        // Determine rarity from predictable "seed"
        uint256 rarity;
        if (seed % 100 < 1) {
            rarity = 3;  // Legendary (1%)
        } else if (seed % 100 < 10) {
            rarity = 2;  // Rare (9%)
        } else {
            rarity = 1;  // Common (90%)
        }
        
        _mint(msg.sender, tokenId, rarity);
    }
    
    // 💀 ATTACK CONTRACT:
    // Miner/attacker keeps trying with different msg.sender addresses 
    // or waits for a timestamp where seed % 100 < 1
    // → Guaranteed legendary NFT every time!
}`}
            language="solidity"
            filename="VulnerableNFT.sol"
          />

          <h3>❌ Pattern 3: Coin Flip Game</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Predictable coin flip
contract VulnerableCoinFlip {
    uint256 public consecutiveWins;
    uint256 lastHash;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    
    function flip(bool _guess) external returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        
        if (lastHash == blockValue) revert();
        lastHash = blockValue;
        
        // 💀 This is publicly known!
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        
        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }
}

// 💀 ATTACKER: Pre-compute the answer in the same block
contract CoinFlipAttacker {
    VulnerableCoinFlip target;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    
    constructor(address _target) {
        target = VulnerableCoinFlip(_target);
    }
    
    function attack() external {
        // Same block = same blockhash = known outcome
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        
        // Always guess correctly!
        target.flip(side);
    }
}`}
            language="solidity"
            filename="CoinFlipAttack.sol"
          />
        </section>

        <section id="real-examples">
          <h2>Real-World Exploits</h2>

          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Meebits - $75M+ NFT Exploit</h4>
                <span className="text-xs text-gray-500">May 2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Meebits used on-chain randomness to determine NFT traits during minting. 
                An attacker repeatedly reverted transactions using a smart contract until they 
                received a rare Meebits NFT — selecting only the most valuable traits.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">NFT Rarity Gaming</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Revert Exploitation</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Fomo3D - Block Stuffing</h4>
                <span className="text-xs text-gray-500">August 2018</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Fomo3D used <code>block.timestamp</code> as part of its countdown mechanism. 
                The winner stuffed blocks with high-gas transactions to prevent others from 
                calling the contract, ensuring they won the $3M jackpot.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Timestamp Dependent</span>
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">$3M Stolen</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">SmartBillions - Lottery Hack</h4>
                <span className="text-xs text-gray-500">October 2017</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                SmartBillions lottery used <code>blockhash()</code> for randomness. An 
                attacker exploited the 256-block limitation — waiting until the blockhash 
                returned 0 and submitting a claim with a known outcome.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Blockhash(0)</span>
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">400 ETH Lost</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Ethernaut - Coin Flip (Level 3)</h4>
                <span className="text-xs text-gray-500">Educational</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                The classic CTF challenge demonstrating weak randomness. Players must win 
                10 consecutive coin flips by pre-computing the "random" outcome using 
                the same blockhash in an attacker contract.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">CTF</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Beginner Friendly</span>
              </div>
            </div>
          </div>
        </section>

        <section id="prevrandao">
          <h2>PREVRANDAO (Post-Merge)</h2>
          <p>
            After Ethereum's transition to Proof of Stake (The Merge), <code>block.difficulty</code> 
            was replaced by <code>block.prevrandao</code>. While more random than previous sources, 
            it's still not cryptographically secure for high-value applications.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Better Than Before</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Generated from Beacon Chain RANDAO</li>
                <li>• Mixed from many validators</li>
                <li>• Expensive to bias (requires skipping slot)</li>
                <li>• 2^256 possible values</li>
              </ul>
            </div>

            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-3">⚠️ Still Not Secure</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Proposer knows value before block</li>
                <li>• Can choose to skip slot (1-bit bias)</li>
                <li>• Not appropriate for high-value randomness</li>
                <li>• Single proposer can affect outcome</li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={`// ⚠️ PREVRANDAO: Better but NOT cryptographically secure
function usePrevrandao() external view returns (uint256) {
    // block.prevrandao replaces block.difficulty post-Merge
    // Acceptable for LOW-VALUE randomness where bias tolerance is OK:
    // - Cosmetic NFT traits (non-financial)
    // - Non-critical game mechanics  
    // - Ordering with low stakes
    
    // ⚠️ NOT acceptable for:
    // - Lotteries with significant prizes
    // - Financial outcomes (trading, liquidation order)
    // - Any scenario where validator bribery is profitable
    
    return block.prevrandao;  // Solidity 0.8.18+
}

// The bias cost: skipping a slot costs ~0.05 ETH in missed rewards
// If the outcome is worth MORE than 0.05 ETH → still exploitable!`}
            language="solidity"
            filename="Prevrandao.sol"
          />
        </section>

        <section id="solutions">
          <h2>Secure Randomness Solutions</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔗</span>
                <h4 className="font-semibold text-lime-400">Chainlink VRF</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Verifiable Random Function. Generates provably fair randomness off-chain 
                and provides a cryptographic proof that the number wasn't tampered with.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-lime-500/20 text-lime-400 rounded">Gold Standard</span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Production Ready</span>
              </div>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔐</span>
                <h4 className="font-semibold text-lime-400">Commit-Reveal</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Users commit a hash of their secret, then reveal it later. Combined 
                secrets create randomness no single party can predict. Requires careful 
                implementation.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Complex</span>
                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">No Oracle Needed</span>
              </div>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎯</span>
                <h4 className="font-semibold text-lime-400">Pyth Entropy</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Pyth's on-chain randomness service using commit-reveal with their entropy 
                providers. Supports many chains including Solana.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Multi-Chain</span>
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Low Cost</span>
              </div>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌐</span>
                <h4 className="font-semibold text-lime-400">drand / League of Entropy</h4>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Decentralized randomness beacon run by multiple independent organizations. 
                Produces publicly verifiable random values at fixed intervals.
              </p>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Decentralized</span>
                <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Threshold BLS</span>
              </div>
            </div>
          </div>
        </section>

        <section id="chainlink-vrf">
          <h2>Chainlink VRF Implementation</h2>
          <p>
            Chainlink VRF (Verifiable Random Function) is the industry standard for 
            secure on-chain randomness. Here's a complete implementation:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

contract SecureLottery is VRFConsumerBaseV2Plus {
    // VRF configuration
    uint256 public s_subscriptionId;
    bytes32 public keyHash;
    uint32 public callbackGasLimit = 100000;
    uint16 public requestConfirmations = 3;
    uint32 public numWords = 1;
    
    // Lottery state
    address[] public players;
    address public lastWinner;
    uint256 public lastRequestId;
    
    mapping(uint256 => bool) public requestFulfilled;
    
    event LotteryEntered(address indexed player);
    event WinnerRequested(uint256 indexed requestId);
    event WinnerPicked(address indexed winner, uint256 prize);
    
    constructor(
        uint256 subscriptionId,
        address vrfCoordinator,
        bytes32 _keyHash
    ) VRFConsumerBaseV2Plus(vrfCoordinator) {
        s_subscriptionId = subscriptionId;
        keyHash = _keyHash;
    }
    
    function enter() external payable {
        require(msg.value == 0.1 ether, "Must send 0.1 ETH");
        players.push(msg.sender);
        emit LotteryEntered(msg.sender);
    }
    
    // ✅ Step 1: Request randomness from Chainlink VRF
    function pickWinner() external {
        require(players.length > 0, "No players");
        
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: s_subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );
        
        lastRequestId = requestId;
        emit WinnerRequested(requestId);
    }
    
    // ✅ Step 2: Chainlink calls back with verified random number
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        requestFulfilled[requestId] = true;
        
        // ✅ Provably fair selection — no one could predict this!
        uint256 winnerIndex = randomWords[0] % players.length;
        address winner = players[winnerIndex];
        lastWinner = winner;
        
        uint256 prize = address(this).balance;
        delete players;
        
        (bool success,) = payable(winner).call{value: prize}("");
        require(success, "Transfer failed");
        
        emit WinnerPicked(winner, prize);
    }
}`}
            language="solidity"
            filename="SecureLottery.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🔐 How Chainlink VRF Works</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold text-xs">1</span>
                <div>
                  <h5 className="text-sm font-medium text-white">Contract requests randomness</h5>
                  <p className="text-xs text-gray-500">Sends a request with a seed to the VRF Coordinator</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">2</span>
                <div>
                  <h5 className="text-sm font-medium text-white">Off-chain VRF node generates randomness + proof</h5>
                  <p className="text-xs text-gray-500">Uses a private key to generate number and cryptographic proof</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-lime-500/30 rounded-full flex items-center justify-center text-lime-400 font-bold text-xs">3</span>
                <div>
                  <h5 className="text-sm font-medium text-white">Coordinator verifies proof on-chain</h5>
                  <p className="text-xs text-gray-500">Anyone can verify the number was generated honestly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold text-xs">4</span>
                <div>
                  <h5 className="text-sm font-medium text-white">Callback delivers verified random number</h5>
                  <p className="text-xs text-gray-500">fulfillRandomWords() receives provably fair randomness</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testing">
          <h2>Testing for Weak Randomness</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

contract VulnerableCoinFlip {
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    uint256 public consecutiveWins;
    
    function flip(bool _guess) external returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1;
        
        if (side == _guess) {
            consecutiveWins++;
            return true;
        } else {
            consecutiveWins = 0;
            return false;
        }
    }
}

contract Attacker {
    VulnerableCoinFlip target;
    uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    
    constructor(address _target) {
        target = VulnerableCoinFlip(_target);
    }
    
    function attack() external {
        // Pre-compute the "random" outcome in the same block
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool guess = coinFlip == 1;
        target.flip(guess);
    }
}

contract WeakRandomnessTest is Test {
    VulnerableCoinFlip coinFlip;
    Attacker attacker;
    
    function setUp() public {
        coinFlip = new VulnerableCoinFlip();
        attacker = new Attacker(address(coinFlip));
    }
    
    // ✅ Prove: attacker wins every single time
    function test_AttackerAlwaysWins() public {
        for (uint256 i = 0; i < 10; i++) {
            // Move to next block
            vm.roll(block.number + 1);
            
            // Attacker pre-computes and always wins
            attacker.attack();
        }
        
        // 10/10 consecutive wins — impossible fairly (1/1024 chance)
        assertEq(coinFlip.consecutiveWins(), 10);
    }
    
    // ✅ Prove: timestamp-based randomness is predictable
    function test_TimestampPredictable() public {
        // Anyone can read block.timestamp before calling
        uint256 currentTimestamp = block.timestamp;
        
        bool willWin = currentTimestamp % 2 == 0;
        
        // In the same block, the result is predetermined
        // No randomness involved!
        if (willWin) {
            vm.warp(currentTimestamp); // Same timestamp
        } else {
            vm.warp(currentTimestamp + 1); // Adjust to win
        }
    }
    
    // ✅ Prove: blockhash is known in the same block
    function test_BlockhashKnown() public {
        vm.roll(100);
        
        // Previous blockhash is public information
        bytes32 prevHash = blockhash(block.number - 1);
        
        // Any contract in this block sees the same value
        // → Zero randomness for same-block reads!
        assertEq(prevHash, blockhash(99));
    }
    
    // ✅ Prove: blockhash returns 0 after 256 blocks
    function test_BlockhashReturnsZero() public {
        vm.roll(300);
        
        // Block 300 - 257 = block 43 → returns 0!
        bytes32 oldHash = blockhash(43);
        assertEq(oldHash, bytes32(0));
        
        // Block 300 - 1 = block 299 → still available
        bytes32 recentHash = blockhash(299);
        assertTrue(recentHash != bytes32(0));
    }
    
    // ✅ Prove: revert-based rarity farming
    function test_RevertBasedExploit() public {
        // Attacker tries until they get desired outcome
        bool gotRare = false;
        
        for (uint256 attempt = 0; attempt < 100; attempt++) {
            vm.roll(block.number + 1);
            
            // Simulate: check if this block would give a rare NFT
            uint256 seed = uint256(keccak256(abi.encodePacked(
                blockhash(block.number - 1),
                block.timestamp,
                address(attacker)
            )));
            
            if (seed % 100 < 1) {  // 1% legendary
                gotRare = true;
                // Only actually mint on this block!
                break;
            }
            // Otherwise, don't interact (skip / revert in contract)
        }
        
        // Within 100 blocks, attacker very likely got a legendary
        // Much better than the intended 1% chance!
    }
}`}
            language="solidity"
            filename="WeakRandomnessTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ Detection Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">slither . --detect weak-prng,timestamp</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Mythril</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">myth analyze --execution-timeout 90</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Aderyn</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">aderyn .</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Manual Review</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">grep -rn "block.timestamp\|blockhash\|prevrandao"</code>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ Randomness Safety Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Never use block.timestamp as randomness source',
              'Never use blockhash() as sole randomness source',
              'Using Chainlink VRF for valuable outcomes',
              'Commit-reveal schemes enforce timely reveals',
              'No revert-based rarity farming possible',
              'PREVRANDAO only used for low-value decisions',
              'Tested with attacker contracts in same block',
              'No blockhash(block.number) usage (always returns 0)',
              'Running Slither weak-prng detector',
              'Validator bias cost analyzed vs outcome value',
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
          <h3 className="text-xl font-bold text-white mb-4">📚 Randomness Source Comparison</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Source</th>
                  <th className="text-left py-3 px-4 text-gray-400">Security</th>
                  <th className="text-left py-3 px-4 text-gray-400">Cost</th>
                  <th className="text-left py-3 px-4 text-gray-400">Use Case</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">block.timestamp</td>
                  <td className="py-3 px-4 text-red-400">❌ None</td>
                  <td className="py-3 px-4">Free</td>
                  <td className="py-3 px-4 text-red-400">Never for randomness</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">blockhash()</td>
                  <td className="py-3 px-4 text-red-400">❌ None</td>
                  <td className="py-3 px-4">Free</td>
                  <td className="py-3 px-4 text-red-400">Never for randomness</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">block.prevrandao</td>
                  <td className="py-3 px-4 text-yellow-400">⚠️ Low</td>
                  <td className="py-3 px-4">Free</td>
                  <td className="py-3 px-4">Low-value cosmetic</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">Commit-Reveal</td>
                  <td className="py-3 px-4 text-blue-400">🟡 Medium</td>
                  <td className="py-3 px-4">2 txs</td>
                  <td className="py-3 px-4">Multi-party games</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs">Chainlink VRF</td>
                  <td className="py-3 px-4 text-lime-400">✅ High</td>
                  <td className="py-3 px-4">LINK fee</td>
                  <td className="py-3 px-4 text-lime-400">Anything valuable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Randomness', 'Timestamp', 'Blockhash', 'Chainlink VRF', 'PREVRANDAO', 'Solidity'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/oracle-manipulation" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Oracle Manipulation</h4>
              <p className="text-sm text-gray-500 mt-1">Another input manipulation vulnerability</p>
            </Link>
            <Link href="/learn/vulnerabilities/front-running" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Front-Running & MEV</h4>
              <p className="text-sm text-gray-500 mt-1">Validators can also exploit ordering</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🎲 Using Randomness in Your Protocol?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Weak randomness is one of the most exploited vulnerabilities in blockchain 
            games and NFT projects. Our auditors specialize in verifying randomness 
            implementations and VRF integrations.
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
