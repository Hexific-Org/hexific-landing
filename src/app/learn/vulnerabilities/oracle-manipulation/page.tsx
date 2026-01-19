'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function OracleManipulationPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Oracle Manipulation' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            Advanced
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            Critical Severity
          </span>
        </div>
        
        <h1>Oracle Manipulation Attacks</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          How attackers exploit price oracles to drain DeFi protocols, and the essential 
          defenses every protocol must implement.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12 min read
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
          <div className="text-2xl font-bold text-red-400">$1B+</div>
          <div className="text-xs text-gray-500">Total Losses</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">30%</div>
          <div className="text-xs text-gray-500">of DeFi Hacks</div>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-400">#1</div>
          <div className="text-xs text-gray-500">Flash Loan Vector</div>
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
          <li><a href="#what-are-oracles" className="toc-link hover:text-lime-400">What are Price Oracles?</a></li>
          <li><a href="#attack-types" className="toc-link hover:text-lime-400">Types of Oracle Attacks</a></li>
          <li><a href="#spot-price-attack" className="toc-link hover:text-lime-400">Spot Price Manipulation</a></li>
          <li><a href="#twap-manipulation" className="toc-link hover:text-lime-400">TWAP Oracle Weaknesses</a></li>
          <li><a href="#real-world-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#vulnerable-code" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
          <li><a href="#chainlink-integration" className="toc-link hover:text-lime-400">Chainlink Best Practices</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Oracle Attacks</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-are-oracles">
          <h2>What are Price Oracles?</h2>
          <p>
            Price oracles are smart contracts or external services that provide price data to 
            DeFi protocols. Since blockchains cannot directly access off-chain data, protocols 
            rely on oracles to determine asset prices for:
          </p>
          <ul>
            <li><strong>Lending protocols:</strong> Calculating collateral values and liquidation thresholds</li>
            <li><strong>DEXs:</strong> Providing reference prices for swaps</li>
            <li><strong>Derivatives:</strong> Settling futures and options contracts</li>
            <li><strong>Stablecoins:</strong> Maintaining price pegs</li>
            <li><strong>Synthetic assets:</strong> Minting and redeeming synths</li>
          </ul>

          <AlertBox type="danger" title="The Oracle Problem">
            If an attacker can manipulate the price an oracle reports, they can exploit any 
            protocol that relies on that price data. This is one of the most devastating 
            attack vectors in DeFi.
          </AlertBox>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">📊 Common Oracle Sources</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h5 className="font-medium text-red-400 mb-1">⚠️ Risky Sources</h5>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Single DEX spot prices</li>
                  <li>• Low-liquidity pool prices</li>
                  <li>• On-chain reserves ratios</li>
                  <li>• Single block price snapshots</li>
                </ul>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h5 className="font-medium text-green-400 mb-1">✅ Safer Sources</h5>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Chainlink price feeds</li>
                  <li>• Uniswap V3 TWAP oracles</li>
                  <li>• Multi-source aggregated prices</li>
                  <li>• Time-weighted calculations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="attack-types">
          <h2>Types of Oracle Attacks</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">1. Spot Price Manipulation</h4>
                  <p className="text-sm text-gray-400">
                    Using flash loans to temporarily move prices in a DEX pool, then exploiting 
                    protocols that read these manipulated prices within the same transaction.
                  </p>
                  <div className="mt-2 text-xs text-red-400">Most common • Highest impact</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⏱️</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">2. TWAP Manipulation</h4>
                  <p className="text-sm text-gray-400">
                    Sustained price manipulation over multiple blocks to skew time-weighted 
                    average prices. More expensive but can bypass TWAP protections.
                  </p>
                  <div className="mt-2 text-xs text-orange-400">Requires capital • Multi-block</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔗</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">3. Oracle Front-Running</h4>
                  <p className="text-sm text-gray-400">
                    Watching for oracle update transactions and front-running them to exploit 
                    the price difference before and after the update.
                  </p>
                  <div className="mt-2 text-xs text-yellow-400">MEV related • Timing dependent</div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🎭</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">4. Governance Oracle Attacks</h4>
                  <p className="text-sm text-gray-400">
                    Manipulating governance votes to change oracle sources or parameters to 
                    attacker-controlled addresses.
                  </p>
                  <div className="mt-2 text-xs text-purple-400">Governance exploits • Long-term</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="spot-price-attack">
          <h2>Spot Price Manipulation Deep Dive</h2>
          <p>
            The most common oracle attack uses flash loans to manipulate spot prices. Here's 
            exactly how it works:
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">1</span>
              <div>
                <h4 className="font-semibold text-white">Flash Loan Large Amount</h4>
                <p className="text-sm text-gray-400">Attacker borrows millions in tokens from Aave/dYdX (no collateral needed)</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center text-red-400 font-bold">2</span>
              <div>
                <h4 className="font-semibold text-red-400">Manipulate DEX Pool 💥</h4>
                <p className="text-sm text-gray-400">Swap large amount to drastically move the price in a liquidity pool</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center text-red-400 font-bold">3</span>
              <div>
                <h4 className="font-semibold text-red-400">Exploit Target Protocol 💥</h4>
                <p className="text-sm text-gray-400">Protocol reads manipulated price → allows over-borrowing, unfair liquidations, or theft</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">4</span>
              <div>
                <h4 className="font-semibold text-white">Restore Price & Repay</h4>
                <p className="text-sm text-gray-400">Swap back to restore price, repay flash loan, keep the profit</p>
              </div>
            </div>
          </div>

          <AlertBox type="warning" title="All in One Transaction">
            The entire attack happens atomically in a single transaction. If any step fails, 
            the whole transaction reverts. This makes flash loan attacks risk-free for attackers.
          </AlertBox>
        </section>

        <section id="twap-manipulation">
          <h2>TWAP Oracle Weaknesses</h2>
          <p>
            Time-Weighted Average Price (TWAP) oracles are more resistant to manipulation 
            but are not foolproof. Here are their vulnerabilities:
          </p>

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-white mb-4">How TWAP Works</h4>
            <CodeBlock
              code={`// Simplified TWAP calculation
// Price is accumulated over time, then averaged

priceCumulativeLast += price * timeElapsed;

// To get TWAP between two points:
twap = (priceCumulative2 - priceCumulative1) / (time2 - time1);

// Example: 
// If price was $100 for 10 blocks, then $200 for 10 blocks
// TWAP = ($100 * 10 + $200 * 10) / 20 = $150`}
              language="solidity"
              filename="TWAP.sol"
            />
          </div>

          <h3>TWAP Vulnerabilities</h3>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">⏰ Short TWAP Windows</h4>
              <p className="text-sm text-gray-400">
                TWAP windows of 10-30 minutes can still be manipulated by wealthy attackers 
                who sustain price manipulation across multiple blocks.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">💧 Low Liquidity Pools</h4>
              <p className="text-sm text-gray-400">
                TWAP from low liquidity pools is cheap to manipulate. Cost scales inversely 
                with pool depth.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">🆕 New Pool Attacks</h4>
              <p className="text-sm text-gray-400">
                Attackers can create new pools with manipulated prices that have minimal 
                history, skewing TWAP calculations.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">⛏️ Block Stuffing</h4>
              <p className="text-sm text-gray-400">
                In low-activity periods, attackers can fill blocks with their own transactions 
                to control price observations.
              </p>
            </div>
          </div>
        </section>

        <section id="real-world-examples">
          <h2>Real-World Oracle Attack Examples</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Mango Markets - $114M</h4>
                <span className="text-xs text-gray-500">October 2022</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Attacker Avraham Eisenberg manipulated the MNGO token price on FTX and other 
                exchanges, then used the inflated collateral value to borrow $114M from 
                Mango Markets on Solana.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Spot Price</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Solana</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Lending</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Cream Finance - $130M</h4>
                <span className="text-xs text-gray-500">October 2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Flash loan attack manipulated the price of yUSD through Yearn's price oracle, 
                allowing the attacker to borrow far more than their collateral was worth.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Ethereum</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Lending</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Harvest Finance - $34M</h4>
                <span className="text-xs text-gray-500">October 2020</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Attacker used flash loans to manipulate Curve's stablecoin pool prices, 
                then arbitraged the difference in Harvest's vault share prices.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Curve</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Yield Vault</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">BonqDAO - $120M</h4>
                <span className="text-xs text-gray-500">February 2023</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Attacker exploited Tellor oracle's update mechanism by submitting false price 
                data for WALBT token, inflating collateral values to drain the protocol.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Tellor</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Polygon</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">CDP</span>
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-code">
          <h2>Vulnerable Code Patterns</h2>
          <p>
            Let's examine common vulnerable patterns and their secure alternatives:
          </p>

          <h3>❌ Pattern 1: Direct DEX Price Reading</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Reading spot price from Uniswap V2
contract VulnerableLending {
    IUniswapV2Pair public pair;
    
    function getPrice() public view returns (uint256) {
        (uint112 reserve0, uint112 reserve1, ) = pair.getReserves();
        // Direct reserve ratio = easily manipulated with flash loans!
        return (uint256(reserve1) * 1e18) / uint256(reserve0);
    }
    
    function borrow(uint256 collateralAmount) external {
        uint256 price = getPrice(); // 💥 Manipulated price
        uint256 collateralValue = collateralAmount * price / 1e18;
        uint256 borrowableAmount = collateralValue * 75 / 100;
        
        // Attacker inflates price → borrows way more than allowed
        _mint(msg.sender, borrowableAmount);
    }
}`}
            language="solidity"
            filename="VulnerableLending.sol"
          />

          <h3>❌ Pattern 2: Single Source Oracle</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Single oracle source without validation
contract VulnerablePriceConsumer {
    AggregatorV3Interface public priceFeed;
    
    function getLatestPrice() public view returns (int256) {
        (
            ,
            int256 price,
            ,
            ,  // Missing: updatedAt check!
            
        ) = priceFeed.latestRoundData();
        
        // No staleness check!
        // No price bounds validation!
        // No backup oracle!
        
        return price;
    }
}`}
            language="solidity"
            filename="VulnerablePriceConsumer.sol"
          />

          <h3>✅ Secure Implementation</h3>
          <CodeBlock
            code={`// ✅ SECURE: Robust oracle implementation
contract SecureLending {
    AggregatorV3Interface public primaryOracle;
    AggregatorV3Interface public fallbackOracle;
    
    uint256 public constant STALENESS_THRESHOLD = 1 hours;
    uint256 public constant MAX_PRICE_DEVIATION = 10; // 10%
    
    function getPrice() public view returns (uint256) {
        // Get primary oracle price with full validation
        (
            uint80 roundId,
            int256 price,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = primaryOracle.latestRoundData();
        
        // ✅ Check 1: Price is positive
        require(price > 0, "Invalid price");
        
        // ✅ Check 2: Data is not stale
        require(
            block.timestamp - updatedAt < STALENESS_THRESHOLD,
            "Stale price data"
        );
        
        // ✅ Check 3: Round is complete
        require(answeredInRound >= roundId, "Incomplete round");
        
        // ✅ Check 4: Cross-reference with fallback
        uint256 primaryPrice = uint256(price);
        uint256 fallbackPrice = _getFallbackPrice();
        
        uint256 deviation = _calculateDeviation(primaryPrice, fallbackPrice);
        require(deviation <= MAX_PRICE_DEVIATION, "Price deviation too high");
        
        return primaryPrice;
    }
    
    function _getFallbackPrice() internal view returns (uint256) {
        (, int256 price, , uint256 updatedAt, ) = fallbackOracle.latestRoundData();
        require(price > 0 && block.timestamp - updatedAt < STALENESS_THRESHOLD, "Fallback invalid");
        return uint256(price);
    }
    
    function _calculateDeviation(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 diff = a > b ? a - b : b - a;
        return (diff * 100) / ((a + b) / 2);
    }
}`}
            language="solidity"
            filename="SecureLending.sol"
          />
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔗</span>
                <h4 className="font-semibold text-lime-400">Use Chainlink Oracles</h4>
              </div>
              <p className="text-sm text-gray-400">
                Chainlink aggregates data from multiple sources and has economic security 
                through node staking. It's the gold standard for price feeds.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⏱️</span>
                <h4 className="font-semibold text-lime-400">Use TWAP with Long Windows</h4>
              </div>
              <p className="text-sm text-gray-400">
                If using on-chain oracles, implement TWAP with windows of at least 
                30 minutes. Longer windows = more expensive to manipulate.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📊</span>
                <h4 className="font-semibold text-lime-400">Multi-Oracle Aggregation</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use multiple oracle sources and compare prices. Reject transactions 
                if sources deviate significantly from each other.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🚨</span>
                <h4 className="font-semibold text-lime-400">Circuit Breakers</h4>
              </div>
              <p className="text-sm text-gray-400">
                Implement price deviation limits that pause operations if prices 
                move too much too quickly (e.g., &gt;20% in one block).
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔒</span>
                <h4 className="font-semibold text-lime-400">Staleness Checks</h4>
              </div>
              <p className="text-sm text-gray-400">
                Always check that oracle data is recent. Stale data can be exploited 
                if real prices have moved significantly.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💧</span>
                <h4 className="font-semibold text-lime-400">Liquidity Requirements</h4>
              </div>
              <p className="text-sm text-gray-400">
                Only use prices from pools with sufficient liquidity. Set minimum 
                TVL thresholds for accepted price sources.
              </p>
            </div>
          </div>

          <AlertBox type="success" title="Defense in Depth">
            Never rely on a single defense. Combine Chainlink feeds with TWAP backup, 
            staleness checks, deviation limits, and circuit breakers for maximum protection.
          </AlertBox>
        </section>

        <section id="chainlink-integration">
          <h2>Chainlink Best Practices</h2>
          <p>
            Chainlink is the most widely used oracle solution. Here's how to integrate it 
            properly:
          </p>

          <CodeBlock
            code={`// ✅ Complete Chainlink integration with all best practices
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainlinkPriceConsumer {
    AggregatorV3Interface internal immutable priceFeed;
    
    uint256 public constant STALENESS_SECONDS = 3600; // 1 hour
    uint256 public constant MIN_PRICE = 1e6;          // Minimum sanity check
    uint256 public constant MAX_PRICE = 1e12;         // Maximum sanity check
    
    error StalePrice(uint256 updatedAt, uint256 currentTime);
    error InvalidPrice(int256 price);
    error IncompleteRound(uint80 roundId, uint80 answeredInRound);
    error SequencerDown();
    
    // For L2s like Arbitrum/Optimism
    AggregatorV3Interface internal immutable sequencerUptimeFeed;
    uint256 public constant GRACE_PERIOD_TIME = 3600;
    
    constructor(address _priceFeed, address _sequencerFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        sequencerUptimeFeed = AggregatorV3Interface(_sequencerFeed);
    }
    
    function getLatestPrice() public view returns (uint256) {
        // ✅ L2: Check sequencer uptime (Arbitrum/Optimism)
        if (address(sequencerUptimeFeed) != address(0)) {
            _checkSequencerUptime();
        }
        
        (
            uint80 roundId,
            int256 price,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        
        // ✅ Check 1: Price must be positive
        if (price <= 0) {
            revert InvalidPrice(price);
        }
        
        // ✅ Check 2: Price within sanity bounds
        uint256 uPrice = uint256(price);
        if (uPrice < MIN_PRICE || uPrice > MAX_PRICE) {
            revert InvalidPrice(price);
        }
        
        // ✅ Check 3: Data freshness
        if (block.timestamp - updatedAt > STALENESS_SECONDS) {
            revert StalePrice(updatedAt, block.timestamp);
        }
        
        // ✅ Check 4: Round completeness
        if (answeredInRound < roundId) {
            revert IncompleteRound(roundId, answeredInRound);
        }
        
        return uPrice;
    }
    
    function _checkSequencerUptime() internal view {
        (, int256 answer, , uint256 startedAt, ) = 
            sequencerUptimeFeed.latestRoundData();
        
        // answer == 0: Sequencer is up
        // answer == 1: Sequencer is down
        bool isSequencerUp = answer == 0;
        if (!isSequencerUp) {
            revert SequencerDown();
        }
        
        // Make sure the grace period has passed after sequencer comes back up
        uint256 timeSinceUp = block.timestamp - startedAt;
        if (timeSinceUp <= GRACE_PERIOD_TIME) {
            revert SequencerDown();
        }
    }
}`}
            language="solidity"
            filename="ChainlinkPriceConsumer.sol"
          />

          <div className="my-6 p-5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="font-semibold text-blue-400 mb-3">🔗 Chainlink Feed Registry</h4>
            <p className="text-sm text-gray-400 mb-3">
              Use the Feed Registry on mainnet to dynamically get price feeds:
            </p>
            <code className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded">
              0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf
            </code>
          </div>
        </section>

        <section id="testing">
          <h2>Testing for Oracle Attacks</h2>
          <p>
            Use these Foundry tests to verify your oracle implementation is secure:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SecureLending.sol";

contract OracleSecurityTest is Test {
    SecureLending lending;
    MockOracle mockOracle;
    
    function setUp() public {
        mockOracle = new MockOracle();
        lending = new SecureLending(address(mockOracle));
    }
    
    // ✅ Test: Reject stale prices
    function test_RevertWhen_PriceIsStale() public {
        mockOracle.setUpdatedAt(block.timestamp - 2 hours);
        
        vm.expectRevert("Stale price data");
        lending.getPrice();
    }
    
    // ✅ Test: Reject negative prices
    function test_RevertWhen_PriceIsNegative() public {
        mockOracle.setPrice(-1);
        
        vm.expectRevert("Invalid price");
        lending.getPrice();
    }
    
    // ✅ Test: Reject zero prices
    function test_RevertWhen_PriceIsZero() public {
        mockOracle.setPrice(0);
        
        vm.expectRevert("Invalid price");
        lending.getPrice();
    }
    
    // ✅ Test: Reject large price deviations
    function test_RevertWhen_PriceDeviationTooHigh() public {
        // Primary oracle: $100
        mockOracle.setPrice(100e8);
        // Fallback oracle: $150 (50% deviation)
        mockFallbackOracle.setPrice(150e8);
        
        vm.expectRevert("Price deviation too high");
        lending.getPrice();
    }
    
    // ✅ Fuzz test: Price manipulation resistance
    function testFuzz_PriceManipulationResistance(uint256 manipulatedPrice) public {
        // Bound to reasonable price range
        manipulatedPrice = bound(manipulatedPrice, 1, type(uint128).max);
        
        // Set manipulated price
        mockOracle.setPrice(int256(manipulatedPrice));
        
        // Should only accept if within deviation bounds
        if (_isWithinBounds(manipulatedPrice)) {
            uint256 price = lending.getPrice();
            assertGt(price, 0);
        } else {
            vm.expectRevert();
            lending.getPrice();
        }
    }
    
    // ✅ Test: Flash loan attack simulation
    function test_FlashLoanAttackPrevention() public {
        // Simulate flash loan by manipulating price in same block
        uint256 normalPrice = 100e8;
        uint256 manipulatedPrice = 1000e8; // 10x manipulation
        
        mockOracle.setPrice(int256(normalPrice));
        uint256 borrowableNormal = lending.calculateBorrowable(1 ether);
        
        // Attacker tries to manipulate
        mockOracle.setPrice(int256(manipulatedPrice));
        
        // Should be caught by deviation check
        vm.expectRevert("Price deviation too high");
        lending.calculateBorrowable(1 ether);
    }
}`}
            language="solidity"
            filename="OracleSecurityTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ Testing Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Foundry Fuzzing</h5>
                <code className="text-xs text-gray-400">forge test --fuzz-runs 10000</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither Oracle Check</h5>
                <code className="text-xs text-gray-400">slither . --detect oracle-manipulate</code>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ Oracle Security Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Using Chainlink or reputable oracle provider',
              'Staleness check with appropriate threshold',
              'Price bounds validation (min/max)',
              'Round completeness verification',
              'Multi-oracle aggregation or fallback',
              'Price deviation circuit breaker',
              'L2 sequencer uptime check (if applicable)',
              'Minimum liquidity requirements for on-chain oracles',
              'TWAP with 30+ minute window (if using DEX prices)',
              'Fuzz tests for price manipulation scenarios',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-lime-400">☐</span>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Oracle', 'Chainlink', 'TWAP', 'Flash Loan', 'Price Manipulation', 'DeFi Security'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/flash-loan-attacks" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Flash Loan Attack Vectors</h4>
              <p className="text-sm text-gray-500 mt-1">How flash loans enable oracle manipulation</p>
            </Link>
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Another critical DeFi vulnerability</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Worried About Oracle Security?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Get your oracle integrations reviewed by Hexific's security experts. 
            We've audited dozens of protocols using Chainlink, Uniswap TWAP, and custom oracles.
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
