'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function FrontRunningPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Front-Running & MEV' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Medium Severity
          </span>
        </div>
        
        <h1>Front-Running & MEV Attacks</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          Understanding transaction ordering attacks, sandwich attacks, and how MEV 
          (Maximal Extractable Value) impacts every user on the blockchain.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            9 min read
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>By Hexific Security Team</span>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">$600M+</div>
          <div className="text-xs text-gray-500">MEV Extracted (2023)</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">~$1M</div>
          <div className="text-xs text-gray-500">Daily Sandwich Attacks</div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-400">90%+</div>
          <div className="text-xs text-gray-500">Blocks Have MEV</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">✓</div>
          <div className="text-xs text-gray-500">Mitigable</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-mev" className="toc-link hover:text-lime-400">What is MEV?</a></li>
          <li><a href="#how-frontrunning-works" className="toc-link hover:text-lime-400">How Front-Running Works</a></li>
          <li><a href="#attack-types" className="toc-link hover:text-lime-400">Types of MEV Attacks</a></li>
          <li><a href="#sandwich-attack" className="toc-link hover:text-lime-400">Sandwich Attack Deep Dive</a></li>
          <li><a href="#mev-ecosystem" className="toc-link hover:text-lime-400">The MEV Ecosystem</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#protection-strategies" className="toc-link hover:text-lime-400">Protection Strategies</a></li>
          <li><a href="#flashbots-protect" className="toc-link hover:text-lime-400">Using Flashbots Protect</a></li>
          <li><a href="#contract-level" className="toc-link hover:text-lime-400">Contract-Level Defenses</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Front-Running</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-is-mev">
          <h2>What is MEV (Maximal Extractable Value)?</h2>
          <p>
            MEV refers to the maximum value that can be extracted from block production beyond 
            the standard block reward and gas fees. This is done by including, excluding, or 
            reordering transactions within a block.
          </p>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🎯 Who Extracts MEV?</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h5 className="font-medium text-purple-400 mb-2">🤖 Searchers</h5>
                <p className="text-sm text-gray-400">
                  Bots that scan the mempool for profitable opportunities and submit 
                  transactions to extract value.
                </p>
              </div>
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h5 className="font-medium text-blue-400 mb-2">🏗️ Builders</h5>
                <p className="text-sm text-gray-400">
                  Entities that construct blocks by ordering transactions to maximize 
                  extracted value.
                </p>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="font-medium text-green-400 mb-2">✅ Validators</h5>
                <p className="text-sm text-gray-400">
                  Receive bids from builders and propose the most profitable block 
                  to the network.
                </p>
              </div>
            </div>
          </div>

          <AlertBox type="info" title="The Dark Forest">
            The Ethereum mempool is often called "the dark forest" - a hostile environment 
            where any profitable transaction can be detected and exploited by MEV bots 
            within milliseconds.
          </AlertBox>
        </section>

        <section id="how-frontrunning-works">
          <h2>How Front-Running Works</h2>
          <p>
            Front-running occurs when an attacker observes a pending transaction in the 
            mempool and submits their own transaction with a higher gas price to get 
            included before the victim's transaction.
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">1</span>
              <div>
                <h4 className="font-semibold text-white">Victim Submits Transaction</h4>
                <p className="text-sm text-gray-400">User submits a DEX swap for 10 ETH → USDC at market price</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">2</span>
              <div>
                <h4 className="font-semibold text-red-400">Attacker Detects in Mempool 👁️</h4>
                <p className="text-sm text-gray-400">MEV bot sees the pending tx and calculates profit opportunity</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">3</span>
              <div>
                <h4 className="font-semibold text-red-400">Front-Run Transaction 💥</h4>
                <p className="text-sm text-gray-400">Bot submits same trade with higher gas to execute first, moving the price</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 font-bold">4</span>
              <div>
                <h4 className="font-semibold text-orange-400">Victim Gets Worse Price</h4>
                <p className="text-sm text-gray-400">User's trade executes at a worse rate due to price impact</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold">5</span>
              <div>
                <h4 className="font-semibold text-green-400">Attacker Profits</h4>
                <p className="text-sm text-gray-400">Bot may also back-run (sell after) to capture the price difference</p>
              </div>
            </div>
          </div>
        </section>

        <section id="attack-types">
          <h2>Types of MEV Attacks</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🥪</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Sandwich Attacks</h4>
                  <p className="text-sm text-gray-400">
                    The attacker places a buy order before and a sell order after a victim's 
                    large trade, profiting from the price movement they cause.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Most Common</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">DEX Swaps</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Liquidation Front-Running</h4>
                  <p className="text-sm text-gray-400">
                    Bots race to liquidate undercollateralized positions on lending protocols, 
                    earning liquidation bonuses (typically 5-10%).
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">High Competition</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Lending</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">DEX Arbitrage</h4>
                  <p className="text-sm text-gray-400">
                    Exploiting price differences between DEXs by buying low on one and 
                    selling high on another within the same block.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Generally Beneficial</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Price Efficiency</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">NFT Sniping</h4>
                  <p className="text-sm text-gray-400">
                    Front-running NFT mints or underpriced listings to acquire valuable 
                    assets before regular users.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">NFT Markets</span>
                    <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded">Mints</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-cyan-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏮️</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Back-Running</h4>
                  <p className="text-sm text-gray-400">
                    Placing a transaction immediately after a target transaction to profit 
                    from its effects (e.g., after oracle updates or large trades).
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Oracle Updates</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">State Changes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-pink-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Time-Bandit Attacks</h4>
                  <p className="text-sm text-gray-400">
                    Re-mining past blocks to capture MEV that was already extracted. 
                    Rare but theoretically possible with sufficient hashpower.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded">Theoretical</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded">Consensus Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sandwich-attack">
          <h2>Sandwich Attack Deep Dive</h2>
          <p>
            Sandwich attacks are the most common form of MEV extraction affecting regular 
            users. Let's understand exactly how they work:
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">🥪 Anatomy of a Sandwich Attack</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <span className="text-green-400 font-mono text-sm">Block N, Tx 1:</span>
                <span className="text-gray-300 text-sm">Attacker buys ETH (pushes price UP ⬆️)</span>
                <span className="ml-auto text-xs text-green-400">Front-run</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <span className="text-orange-400 font-mono text-sm">Block N, Tx 2:</span>
                <span className="text-orange-300 text-sm font-medium">Victim buys ETH at WORSE price 💸</span>
                <span className="ml-auto text-xs text-orange-400">Target</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <span className="text-red-400 font-mono text-sm">Block N, Tx 3:</span>
                <span className="text-gray-300 text-sm">Attacker sells ETH (profits from price ⬇️)</span>
                <span className="ml-auto text-xs text-red-400">Back-run</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-black/30 rounded-lg">
              <div className="text-center">
                <span className="text-lime-400 font-semibold">Attacker Profit = </span>
                <span className="text-white">Price Impact × Trade Size - Gas Costs</span>
              </div>
            </div>
          </div>

          <h3>Real Example: Uniswap Sandwich</h3>
          <CodeBlock
            code={`// Victim wants to swap 10 ETH for USDC
// Current price: 1 ETH = 2000 USDC
// Slippage tolerance: 1%

// === ATTACKER FRONT-RUN ===
// Attacker buys 50 ETH with USDC
// New price: 1 ETH = 2050 USDC (price pushed up)

// === VICTIM TRANSACTION ===
// Victim's 10 ETH swap executes
// Expected: 20,000 USDC (at 2000)
// Actual:   19,500 USDC (at 1950 effective due to combined impact)
// Loss:     500 USDC (2.5% worse)

// === ATTACKER BACK-RUN ===
// Attacker sells 50 ETH for USDC
// Receives: 102,500 USDC
// Original: 100,000 USDC spent
// Profit:   2,500 USDC - gas costs ≈ 2,400 USDC`}
            language="javascript"
            filename="sandwich-example.js"
          />

          <AlertBox type="danger" title="Who Gets Sandwiched?">
            Anyone swapping on DEXs with loose slippage settings or trading large amounts 
            relative to pool liquidity. Even "safe" 1% slippage can be exploited on 
            low-liquidity pairs.
          </AlertBox>
        </section>

        <section id="mev-ecosystem">
          <h2>The MEV Ecosystem</h2>
          <p>
            Understanding the players and infrastructure helps you protect yourself:
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="flex items-center gap-2 font-semibold text-lime-400 mb-3">
                <span>⚡</span> Flashbots
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                A research organization that created infrastructure to democratize MEV 
                extraction and reduce its negative externalities.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• MEV-Boost: PBS implementation for validators</li>
                <li>• Flashbots Protect: RPC for sandwich protection</li>
                <li>• MEV-Share: Redistributes MEV to users</li>
              </ul>
            </div>

            <div className="p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="flex items-center gap-2 font-semibold text-purple-400 mb-3">
                <span>🔒</span> Private Mempools
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Submit transactions privately to avoid public mempool exposure.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Flashbots Protect RPC</li>
                <li>• MEV Blocker (by CoW Protocol)</li>
                <li>• Blocknative Private Pool</li>
                <li>• Eden Network</li>
              </ul>
            </div>

            <div className="p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="flex items-center gap-2 font-semibold text-blue-400 mb-3">
                <span>🏗️</span> Block Builders
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Specialized entities that construct blocks to maximize value extraction.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Flashbots Builder</li>
                <li>• BloXroute</li>
                <li>• Builder0x69</li>
                <li>• Beaver Build</li>
              </ul>
            </div>

            <div className="p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="flex items-center gap-2 font-semibold text-orange-400 mb-3">
                <span>📊</span> MEV Dashboards
              </h4>
              <p className="text-sm text-gray-400 mb-3">
                Track MEV extraction and analyze blockchain activity.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• <code className="text-xs">mevboost.pics</code></li>
                <li>• <code className="text-xs">eigenphi.io</code></li>
                <li>• <code className="text-xs">zeromev.org</code></li>
                <li>• <code className="text-xs">flashbots-data.flashbots.net</code></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>
          
          <h3>❌ Pattern 1: No Slippage Protection</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: No minimum output specified
contract VulnerableSwap {
    IUniswapV2Router public router;
    
    function swapExactETHForTokens(address token) external payable {
        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = token;
        
        // amountOutMin = 0 means accept ANY output!
        // Attacker can sandwich for maximum extraction
        router.swapExactETHForTokens{value: msg.value}(
            0,  // 💥 No slippage protection!
            path,
            msg.sender,
            block.timestamp
        );
    }
}`}
            language="solidity"
            filename="VulnerableSwap.sol"
          />

          <h3>❌ Pattern 2: Public Commit Without Protection</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Reveals intent before execution
contract VulnerableAuction {
    mapping(address => uint256) public pendingBids;
    
    // Step 1: User reveals their max bid publicly
    function commitBid(uint256 amount) external {
        pendingBids[msg.sender] = amount;
        // 💥 Anyone can see this in mempool and front-run!
    }
    
    // Step 2: Execute bid
    function executeBid() external {
        uint256 bid = pendingBids[msg.sender];
        // Attacker already front-ran with bid + 1
        _processBid(msg.sender, bid);
    }
}`}
            language="solidity"
            filename="VulnerableAuction.sol"
          />

          <h3>❌ Pattern 3: Predictable Liquidation Triggers</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Predictable liquidation conditions
contract VulnerableLending {
    function liquidate(address user) external {
        require(isUnderwater(user), "Not liquidatable");
        
        // Anyone can see when positions become liquidatable
        // Bots race to call this function first
        uint256 bonus = calculateBonus(user);
        _executeLiquidation(user, msg.sender, bonus);
    }
    
    // 💥 Problem: No mechanism to fairly distribute liquidations
    // or prevent front-running of liquidation transactions
}`}
            language="solidity"
            filename="VulnerableLending.sol"
          />
        </section>

        <section id="protection-strategies">
          <h2>Protection Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🛡️</span>
                <h4 className="font-semibold text-lime-400">Private Transaction RPCs</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use Flashbots Protect, MEV Blocker, or other private mempools to hide 
                transactions from searchers until they're included in a block.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📏</span>
                <h4 className="font-semibold text-lime-400">Tight Slippage Settings</h4>
              </div>
              <p className="text-sm text-gray-400">
                Set appropriate slippage tolerance (0.1-0.5% for stables, 0.5-1% for 
                volatile pairs). Reject transactions that exceed your tolerance.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔐</span>
                <h4 className="font-semibold text-lime-400">Commit-Reveal Schemes</h4>
              </div>
              <p className="text-sm text-gray-400">
                Hide transaction details with hashed commits, then reveal after inclusion. 
                Prevents front-running by hiding intent.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🐄</span>
                <h4 className="font-semibold text-lime-400">Batch Auctions (CoW Protocol)</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use protocols that batch orders off-chain and settle at uniform clearing 
                prices, eliminating ordering-based MEV.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⏱️</span>
                <h4 className="font-semibold text-lime-400">Time-Delayed Execution</h4>
              </div>
              <p className="text-sm text-gray-400">
                Add mandatory delays between intent declaration and execution. Makes 
                front-running less predictable and profitable.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💰</span>
                <h4 className="font-semibold text-lime-400">MEV-Share Rebates</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use MEV-Share to receive a portion of the MEV your transactions generate 
                back as a rebate.
              </p>
            </div>
          </div>
        </section>

        <section id="flashbots-protect">
          <h2>Using Flashbots Protect</h2>
          <p>
            The easiest way to protect yourself from sandwich attacks is to use 
            Flashbots Protect RPC:
          </p>

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-4">🔧 Setup Instructions</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">MetaMask</h5>
                <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Settings → Networks → Add Network</li>
                  <li>Network Name: <code className="text-lime-400 bg-black/30 px-1 rounded">Flashbots Protect</code></li>
                  <li>RPC URL: <code className="text-lime-400 bg-black/30 px-1 rounded">https://rpc.flashbots.net</code></li>
                  <li>Chain ID: <code className="text-lime-400 bg-black/30 px-1 rounded">1</code></li>
                  <li>Symbol: <code className="text-lime-400 bg-black/30 px-1 rounded">ETH</code></li>
                </ol>
              </div>

              <div>
                <h5 className="text-sm font-medium text-white mb-2">With MEV-Share Rebates</h5>
                <code className="text-sm text-lime-400 bg-black/30 px-2 py-1 rounded block">
                  https://rpc.flashbots.net?hint=hash&hint=logs&hint=default_logs&hint=special_logs&hint=calldata&hint=contract_address&hint=function_selector&builder=flashbots&builder=f1b.io
                </code>
              </div>
            </div>
          </div>

          <h3>Programmatic Usage</h3>
          <CodeBlock
            code={`// Using ethers.js with Flashbots Protect
import { ethers } from 'ethers';

// Connect to Flashbots Protect RPC
const provider = new ethers.JsonRpcProvider(
  'https://rpc.flashbots.net'
);

// Your transactions are now private!
const wallet = new ethers.Wallet(privateKey, provider);

// Regular transaction - but submitted privately
const tx = await wallet.sendTransaction({
  to: uniswapRouter,
  data: swapCalldata,
  value: ethers.parseEther("1"),
  // Transactions go to Flashbots builders, not public mempool
});

// Wait for inclusion
const receipt = await tx.wait();
console.log("Protected swap executed:", receipt.hash);`}
            language="typescript"
            filename="flashbots-protect.ts"
          />

          <AlertBox type="success" title="MEV Blocker Alternative">
            CoW Protocol's MEV Blocker (<code>rpc.mevblocker.io</code>) offers similar 
            protection with additional refund mechanisms. Try both and see which works 
            better for your use case.
          </AlertBox>
        </section>

        <section id="contract-level">
          <h2>Contract-Level Defenses</h2>

          <h3>✅ Pattern 1: Enforce Slippage in Contract</h3>
          <CodeBlock
            code={`// ✅ SECURE: Contract enforces slippage protection
contract SecureSwap {
    IUniswapV2Router public router;
    
    function swapWithProtection(
        address tokenOut,
        uint256 minAmountOut,  // User specifies minimum
        uint256 deadline
    ) external payable {
        require(minAmountOut > 0, "Must specify min output");
        require(deadline > block.timestamp, "Expired");
        
        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = tokenOut;
        
        // ✅ Reverts if output is below user's minimum
        router.swapExactETHForTokens{value: msg.value}(
            minAmountOut,
            path,
            msg.sender,
            deadline
        );
    }
    
    // Helper: Calculate minimum with slippage
    function getMinOutput(
        uint256 amountIn, 
        address tokenOut,
        uint256 slippageBps  // e.g., 50 = 0.5%
    ) external view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = router.WETH();
        path[1] = tokenOut;
        
        uint256[] memory amounts = router.getAmountsOut(amountIn, path);
        uint256 expectedOut = amounts[1];
        
        // Apply slippage tolerance
        return expectedOut * (10000 - slippageBps) / 10000;
    }
}`}
            language="solidity"
            filename="SecureSwap.sol"
          />

          <h3>✅ Pattern 2: Commit-Reveal Scheme</h3>
          <CodeBlock
            code={`// ✅ SECURE: Two-phase commit-reveal auction
contract SecureAuction {
    struct Commit {
        bytes32 hash;
        uint256 commitBlock;
    }
    
    mapping(address => Commit) public commits;
    uint256 public constant REVEAL_DELAY = 10; // blocks
    
    // Phase 1: Commit hash of bid (hides amount)
    function commitBid(bytes32 bidHash) external {
        commits[msg.sender] = Commit({
            hash: bidHash,
            commitBlock: block.number
        });
        // Attacker can't see bid amount - only hash!
    }
    
    // Phase 2: Reveal actual bid after delay
    function revealBid(uint256 amount, bytes32 salt) external payable {
        Commit memory commit = commits[msg.sender];
        
        // Verify delay has passed
        require(
            block.number >= commit.commitBlock + REVEAL_DELAY,
            "Too early to reveal"
        );
        
        // Verify hash matches
        bytes32 expectedHash = keccak256(
            abi.encodePacked(msg.sender, amount, salt)
        );
        require(commit.hash == expectedHash, "Invalid reveal");
        require(msg.value == amount, "Amount mismatch");
        
        // Process bid - front-running is now pointless
        _processBid(msg.sender, amount);
        
        delete commits[msg.sender];
    }
}`}
            language="solidity"
            filename="SecureAuction.sol"
          />

          <h3>✅ Pattern 3: Fair Ordering with Chainlink</h3>
          <CodeBlock
            code={`// ✅ SECURE: Using Chainlink's Fair Sequencing Service (FSS)
// Note: FSS is still in development - this shows the concept

contract FairOrderedContract {
    // Chainlink FSS will ensure fair transaction ordering
    // based on received time, not gas price
    
    address public sequencer;
    
    modifier fairOrdered(bytes memory proof) {
        // Verify transaction was ordered fairly by sequencer
        require(
            _verifySequencerProof(proof),
            "Invalid sequencer proof"
        );
        _;
    }
    
    function executeOrder(
        bytes calldata orderData,
        bytes calldata sequencerProof
    ) external fairOrdered(sequencerProof) {
        // Transaction order guaranteed by Chainlink FSS
        // Front-running is not possible
        _processOrder(orderData);
    }
}`}
            language="solidity"
            filename="FairOrdered.sol"
          />
        </section>

        <section id="testing">
          <h2>Testing for Front-Running Vulnerabilities</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SecureSwap.sol";

contract FrontRunningTest is Test {
    SecureSwap swap;
    address attacker = makeAddr("attacker");
    address victim = makeAddr("victim");
    
    function setUp() public {
        swap = new SecureSwap(address(router));
        vm.deal(victim, 10 ether);
        vm.deal(attacker, 100 ether);
    }
    
    // ✅ Test: Slippage protection prevents sandwich
    function test_SlippageProtectionPreventsLoss() public {
        // Get expected output
        uint256 minOut = swap.getMinOutput(1 ether, USDC, 50); // 0.5%
        
        // Attacker front-runs to move price
        vm.prank(attacker);
        router.swapExactETHForTokens{value: 50 ether}(
            0, path, attacker, block.timestamp
        );
        
        // Victim's transaction should revert due to slippage
        vm.prank(victim);
        vm.expectRevert("UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT");
        swap.swapWithProtection{value: 1 ether}(USDC, minOut, block.timestamp);
    }
    
    // ✅ Test: Zero slippage is rejected
    function test_RevertWhen_NoSlippageSet() public {
        vm.prank(victim);
        vm.expectRevert("Must specify min output");
        swap.swapWithProtection{value: 1 ether}(USDC, 0, block.timestamp);
    }
    
    // ✅ Test: Commit-reveal prevents front-running
    function test_CommitRevealPreventsInformationLeak() public {
        // Victim commits hidden bid
        bytes32 salt = keccak256("secret");
        bytes32 commitHash = keccak256(
            abi.encodePacked(victim, 5 ether, salt)
        );
        
        vm.prank(victim);
        auction.commitBid(commitHash);
        
        // Attacker cannot determine bid amount from hash
        // (Would need to brute force, impractical for large range)
        
        // Fast forward past reveal delay
        vm.roll(block.number + 11);
        
        // Victim reveals
        vm.prank(victim);
        auction.revealBid{value: 5 ether}(5 ether, salt);
    }
    
    // ✅ Fuzz: Slippage always enforced
    function testFuzz_SlippageEnforced(
        uint256 tradeAmount,
        uint256 frontRunAmount
    ) public {
        tradeAmount = bound(tradeAmount, 0.1 ether, 5 ether);
        frontRunAmount = bound(frontRunAmount, 1 ether, 50 ether);
        
        uint256 minOut = swap.getMinOutput(tradeAmount, USDC, 100); // 1%
        
        // Simulate front-run
        vm.prank(attacker);
        router.swapExactETHForTokens{value: frontRunAmount}(
            0, path, attacker, block.timestamp
        );
        
        vm.prank(victim);
        // Either succeeds within slippage or reverts - never worse
        try swap.swapWithProtection{value: tradeAmount}(
            USDC, minOut, block.timestamp
        ) {
            uint256 received = IERC20(USDC).balanceOf(victim);
            assertGe(received, minOut, "Received less than minimum");
        } catch {
            // Reverted due to slippage - this is expected protection
        }
    }
}`}
            language="solidity"
            filename="FrontRunningTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ MEV Detection Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">EigenPhi</h5>
                <p className="text-xs text-gray-400">Analyze MEV transactions and identify sandwich attacks on your protocol.</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Flashbots Explorer</h5>
                <p className="text-xs text-gray-400">View MEV bundles and track searcher activity.</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">ZeroMEV</h5>
                <p className="text-xs text-gray-400">Free tool to check if your past transactions were sandwiched.</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Tenderly</h5>
                <p className="text-xs text-gray-400">Simulate transactions to see MEV exposure before execution.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ MEV Protection Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Using private RPC (Flashbots Protect / MEV Blocker)',
              'Slippage protection enforced in contract',
              'Appropriate slippage tolerance set (not 0)',
              'Deadline parameter used to prevent stale txs',
              'Commit-reveal for sensitive operations',
              'No predictable profitable patterns in mempool',
              'Consider batch auction protocols for swaps',
              'Test with simulated front-running scenarios',
              'Monitor for MEV extraction on your protocol',
              'Educate users about MEV risks',
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
              <h4 className="text-sm font-semibold text-purple-400 mb-2">Private RPCs</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• rpc.flashbots.net</li>
                <li>• rpc.mevblocker.io</li>
                <li>• protect.eden.network</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">MEV-Resistant DEXs</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• CoW Protocol (batch auction)</li>
                <li>• 1inch Fusion</li>
                <li>• Hashflow (RFQ)</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-green-400 mb-2">Slippage Guidelines</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Stablecoins: 0.1-0.3%</li>
                <li>• Major pairs: 0.5-1%</li>
                <li>• Volatile: 1-3%</li>
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
              {['MEV', 'Front-Running', 'Sandwich Attack', 'Flashbots', 'Slippage', 'DeFi Security'].map((tag) => (
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
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Oracle Manipulation Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Price oracles are often targeted alongside MEV</p>
            </Link>
            <Link href="/learn/vulnerabilities/flash-loan-attacks" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Flash Loan Attack Vectors</h4>
              <p className="text-sm text-gray-500 mt-1">Flash loans enable many MEV strategies</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Is Your Protocol MEV-Resistant?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Our auditors analyze MEV attack surfaces and help you implement robust protections. 
            We've helped protocols save millions in potential MEV extraction.
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
