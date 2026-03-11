'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function OracleIntegrationPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Secure Oracle Integration' },
      ]} />

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
            Best Practices
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
            Chainlink
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Secure Oracle Integration
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          Oracles bridge the gap between on-chain smart contracts and off-chain data. But trusting
          external data introduces critical attack vectors — from stale prices to flash loan manipulation.
          Learn how to integrate Chainlink, TWAP oracles, and multi-oracle systems safely.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            9 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Dec 10, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Oracle, Chainlink, TWAP, Price Feed
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#overview" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. What Are Oracles &amp; Why Do They Matter?
            </a>
          </li>
          <li>
            <a href="#attack-landscape" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. The Oracle Attack Landscape
            </a>
          </li>
          <li>
            <a href="#chainlink-basics" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Chainlink Price Feeds — Getting Started
            </a>
          </li>
          <li>
            <a href="#chainlink-safety" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. Chainlink Safety Checks
            </a>
          </li>
          <li>
            <a href="#staleness" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Handling Stale Data &amp; Heartbeats
            </a>
          </li>
          <li>
            <a href="#circuit-breakers" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Price Circuit Breakers
            </a>
          </li>
          <li>
            <a href="#twap" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. TWAP Oracles (Uniswap V3)
            </a>
          </li>
          <li>
            <a href="#multi-oracle" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Multi-Oracle Strategies
            </a>
          </li>
          <li>
            <a href="#spot-price-danger" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Why Spot Price Is Dangerous
            </a>
          </li>
          <li>
            <a href="#l2-considerations" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. L2 &amp; Sequencer Considerations
            </a>
          </li>
          <li>
            <a href="#common-mistakes" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Common Mistakes
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Oracle Integration Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — Overview */}
        <section id="overview">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            What Are Oracles &amp; Why Do They Matter?
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Smart contracts are deterministic — they can only access data that exists on-chain. To use
            real-world data like asset prices, weather, sports scores, or random numbers, contracts rely
            on <strong className="text-white">oracles</strong>: services that fetch off-chain data and
            deliver it on-chain. If the oracle is wrong, every contract depending on it makes wrong decisions.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-blue-400/5 border border-blue-400/20">
              <div className="text-blue-400 font-semibold mb-2">📡 Push-Based</div>
              <p className="text-sm text-gray-400 mb-2">
                Oracle updates price on-chain at regular intervals or when deviation threshold is crossed.
              </p>
              <div className="text-xs text-gray-500">
                Example: Chainlink Data Feeds
              </div>
            </div>
            <div className="p-5 rounded-xl bg-purple-400/5 border border-purple-400/20">
              <div className="text-purple-400 font-semibold mb-2">🔄 Pull-Based</div>
              <p className="text-sm text-gray-400 mb-2">
                Contract requests data on-demand. User or keeper fetches and submits proof.
              </p>
              <div className="text-xs text-gray-500">
                Example: Pyth, API3
              </div>
            </div>
            <div className="p-5 rounded-xl bg-lime-400/5 border border-lime-400/20">
              <div className="text-lime-400 font-semibold mb-2">📊 On-Chain</div>
              <p className="text-sm text-gray-400 mb-2">
                Derives price from on-chain DEX state. No external data source needed.
              </p>
              <div className="text-xs text-gray-500">
                Example: Uniswap V3 TWAP
              </div>
            </div>
          </div>

          <AlertBox type="info" title="The Oracle Problem">
            The &quot;oracle problem&quot; is fundamental to blockchain: how do you trust off-chain data
            in a trustless environment? No oracle is perfectly trustless. Even decentralized oracle
            networks like Chainlink rely on economic incentives and reputation rather than cryptographic
            proofs. Always design your protocol to be resilient to oracle failures.
          </AlertBox>
        </section>

        {/* Section 2 — Attack Landscape */}
        <section id="attack-landscape">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            The Oracle Attack Landscape
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Oracle manipulation is one of the most profitable attack vectors in DeFi, responsible for
            hundreds of millions in losses. Understanding the threat model is essential before integrating
            any price feed.
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg mt-0.5">💥</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Flash Loan Price Manipulation</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Attacker borrows massive liquidity via flash loan, swaps to manipulate a DEX price,
                    uses the inflated/deflated price in your protocol, then repays the loan — all in one transaction.
                  </p>
                  <div className="text-xs text-gray-600">
                    Examples: bZx ($8M), Harvest Finance ($34M), Mango Markets ($114M)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg mt-0.5">⏰</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Stale Price Exploitation</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Oracle stops updating (network congestion, node failure, etc.) and the protocol
                    continues using an outdated price that no longer reflects market reality.
                  </p>
                  <div className="text-xs text-gray-600">
                    Examples: Synthetix sKRW incident, LUNA depeg cascades
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg mt-0.5">🔀</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">Oracle Frontrunning</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Attacker sees an oracle price update in the mempool, knows the new price before
                    it&apos;s confirmed, and trades ahead of it to profit from the price change.
                  </p>
                  <div className="text-xs text-gray-600">
                    Common with transparent mempool chains, mitigated partially by commit-reveal
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <div className="flex items-start gap-3">
                <span className="text-red-400 text-lg mt-0.5">📉</span>
                <div>
                  <h3 className="text-white font-semibold mb-1">LP Token &amp; Derivative Price Manipulation</h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Inflating the price of LP tokens, wrapped tokens, or yield-bearing tokens by manipulating
                    the underlying pool reserves or exchange rate.
                  </p>
                  <div className="text-xs text-gray-600">
                    Examples: Warp Finance ($7.7M), numerous Curve/Balancer LP exploits
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Losses by Attack Type (DeFi, 2020–2024)</h3>
            <div className="space-y-3">
              {[
                { label: 'Flash Loan + Price Manipulation', amount: '$400M+', width: 'w-full', color: 'bg-red-400' },
                { label: 'Stale / Missing Price Checks', amount: '$150M+', width: 'w-[38%]', color: 'bg-orange-400' },
                { label: 'LP Token Pricing Errors', amount: '$80M+', width: 'w-[20%]', color: 'bg-yellow-400' },
                { label: 'Oracle Frontrunning', amount: '$30M+', width: 'w-[8%]', color: 'bg-blue-400' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white font-medium">{item.amount}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.04]">
                    <div className={`h-2 rounded-full ${item.color} ${item.width} opacity-60`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 — Chainlink Basics */}
        <section id="chainlink-basics">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Chainlink Price Feeds — Getting Started
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Chainlink is the most widely used oracle network in DeFi. Its Data Feeds aggregate prices
            from multiple independent nodes, each pulling from multiple data sources. Updates happen when
            the price deviates beyond a threshold (e.g., 0.5% for ETH/USD) or a heartbeat interval elapses.
          </p>

          <CodeBlock
            language="solidity"
            filename="BasicChainlinkConsumer.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal immutable priceFeed;

    /**
     * @param _feedAddress Chainlink price feed address
     * ETH/USD Mainnet: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
     * ETH/USD Sepolia: 0x694AA1769357215DE4FAC081bf1f309aDC325306
     */
    constructor(address _feedAddress) {
        priceFeed = AggregatorV3Interface(_feedAddress);
    }

    /**
     * @notice Get the latest ETH/USD price
     * @return price The price with 8 decimals
     */
    function getLatestPrice() public view returns (int256 price) {
        (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // Basic validation (see next section for full checks)
        require(answer > 0, "Invalid price");
        require(updatedAt > 0, "Round not complete");

        return answer; // e.g., 250000000000 = $2,500.00 (8 decimals)
    }

    /**
     * @notice Convert ETH amount to USD value
     * @param ethAmount Amount in wei (18 decimals)
     * @return usdValue USD value with 18 decimals
     */
    function ethToUsd(uint256 ethAmount) external view returns (uint256) {
        int256 price = getLatestPrice();
        // price has 8 decimals, ethAmount has 18 decimals
        // result: 18 + 8 - 8 = 18 decimals
        return (ethAmount * uint256(price)) / 1e8;
    }
}`}
          />

          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-white font-medium mb-2">Chainlink Feed Properties</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Decimals:</strong> Usually 8 for USD pairs, 18 for ETH pairs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Heartbeat:</strong> Maximum time between updates (e.g., 3600s)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Deviation:</strong> Price change % that triggers update (e.g., 0.5%)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Aggregation:</strong> Median from multiple independent nodes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Chainlink Safety Checks */}
        <section id="chainlink-safety">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            Chainlink Safety Checks
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Simply calling <code className="text-lime-400">latestRoundData()</code> and using the answer
            is <strong className="text-white">not enough</strong>. You must validate every response.
            Here is the production-grade pattern with all essential checks:
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Unsafe — No Validation',
              code: `function getPrice() external view returns (int256) {
    (, int256 answer, , , ) =
        priceFeed.latestRoundData();
    return answer;
    // Problems:
    // - answer could be 0 or negative
    // - data could be hours/days old
    // - round might be incomplete
    // - feed might be deprecated
}`
            }}
            secure={{
              title: '✅ Production-Safe — Full Validation',
              code: `function getPrice() external view returns (int256) {
    (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();

    // 1. Price must be positive
    require(answer > 0, "Negative/zero price");

    // 2. Round must be complete
    require(updatedAt > 0, "Incomplete round");

    // 3. Data must be fresh (heartbeat check)
    require(
        block.timestamp - updatedAt <= STALENESS_THRESHOLD,
        "Stale price data"
    );

    // 4. Round ID consistency
    require(
        answeredInRound >= roundId,
        "Stale round"
    );

    return answer;
}`
            }}
          />

          <div className="mt-6">
            <CodeBlock
              language="solidity"
              filename="SafeOracleConsumer.sol"
              code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SafeOracleConsumer {
    AggregatorV3Interface public immutable priceFeed;

    // Staleness threshold — should match or exceed the feed's heartbeat
    // ETH/USD: heartbeat = 3600s → use 3660s (heartbeat + buffer)
    uint256 public immutable stalenessThreshold;

    // Sanity bounds to catch extreme anomalies
    int256 public immutable minPrice;
    int256 public immutable maxPrice;

    error StalePrice(uint256 updatedAt, uint256 threshold);
    error InvalidPrice(int256 price);
    error PriceOutOfBounds(int256 price, int256 min, int256 max);
    error IncompleteRound(uint80 roundId, uint80 answeredInRound);

    constructor(
        address _feed,
        uint256 _stalenessThreshold,
        int256 _minPrice,
        int256 _maxPrice
    ) {
        priceFeed = AggregatorV3Interface(_feed);
        stalenessThreshold = _stalenessThreshold;
        minPrice = _minPrice;
        maxPrice = _maxPrice;
    }

    function getPrice() public view returns (int256) {
        (
            uint80 roundId,
            int256 answer,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // Check 1: Price is positive
        if (answer <= 0) revert InvalidPrice(answer);

        // Check 2: Data freshness
        if (block.timestamp - updatedAt > stalenessThreshold) {
            revert StalePrice(updatedAt, stalenessThreshold);
        }

        // Check 3: Round completeness
        if (answeredInRound < roundId) {
            revert IncompleteRound(roundId, answeredInRound);
        }

        // Check 4: Sanity bounds
        if (answer < minPrice || answer > maxPrice) {
            revert PriceOutOfBounds(answer, minPrice, maxPrice);
        }

        return answer;
    }
}`}
            />
          </div>

          <AlertBox type="warning" title="Feed-Specific Staleness">
            Each Chainlink feed has a different heartbeat. ETH/USD on mainnet updates every 3600s (1 hour),
            but some feeds update only every 86400s (24 hours). Always check the specific feed&apos;s parameters
            at <strong className="text-white">data.chain.link</strong> and configure your staleness
            threshold accordingly.
          </AlertBox>
        </section>

        {/* Section 5 — Staleness & Heartbeats */}
        <section id="staleness">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Handling Stale Data &amp; Heartbeats
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A &quot;heartbeat&quot; is the maximum interval between oracle updates. If the price doesn&apos;t
            deviate enough to trigger a deviation-based update, the oracle still pushes an update at the
            heartbeat interval. If <code className="text-lime-400">updatedAt</code> is older than the
            heartbeat + a buffer, the data is stale and should not be trusted.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-white/[0.06] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/[0.04]">
                  <th className="text-left p-4 text-white font-semibold">Feed</th>
                  <th className="text-left p-4 text-white font-semibold">Network</th>
                  <th className="text-left p-4 text-white font-semibold">Heartbeat</th>
                  <th className="text-left p-4 text-white font-semibold">Deviation</th>
                  <th className="text-left p-4 text-white font-semibold">Suggested Staleness</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">ETH / USD</td>
                  <td className="p-4">Ethereum</td>
                  <td className="p-4">3600s (1h)</td>
                  <td className="p-4">0.5%</td>
                  <td className="p-4 text-lime-400">3660s</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">BTC / USD</td>
                  <td className="p-4">Ethereum</td>
                  <td className="p-4">3600s (1h)</td>
                  <td className="p-4">0.5%</td>
                  <td className="p-4 text-lime-400">3660s</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">USDC / USD</td>
                  <td className="p-4">Ethereum</td>
                  <td className="p-4">86400s (24h)</td>
                  <td className="p-4">0.1%</td>
                  <td className="p-4 text-lime-400">86460s</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">ETH / USD</td>
                  <td className="p-4">Arbitrum</td>
                  <td className="p-4">3600s (1h)</td>
                  <td className="p-4">0.15%</td>
                  <td className="p-4 text-lime-400">3660s</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">ETH / USD</td>
                  <td className="p-4">Optimism</td>
                  <td className="p-4">1200s (20m)</td>
                  <td className="p-4">0.15%</td>
                  <td className="p-4 text-lime-400">1260s</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock
            language="solidity"
            filename="StalenessResolver.sol"
            code={`// Pattern: Configurable staleness per feed
contract MultiOracleConsumer {
    struct FeedConfig {
        AggregatorV3Interface feed;
        uint256 stalenessThreshold;  // heartbeat + buffer
        uint8 decimals;
    }

    mapping(address => FeedConfig) public feedConfigs;

    function addFeed(
        address token,
        address feed,
        uint256 heartbeat
    ) external onlyOwner {
        feedConfigs[token] = FeedConfig({
            feed: AggregatorV3Interface(feed),
            stalenessThreshold: heartbeat + 60, // heartbeat + 1min buffer
            decimals: AggregatorV3Interface(feed).decimals()
        });
    }

    function getPrice(address token) public view returns (uint256) {
        FeedConfig memory config = feedConfigs[token];
        require(address(config.feed) != address(0), "Feed not configured");

        (, int256 answer, , uint256 updatedAt, ) =
            config.feed.latestRoundData();

        require(answer > 0, "Invalid price");
        require(
            block.timestamp - updatedAt <= config.stalenessThreshold,
            "Stale price"
        );

        // Normalize to 18 decimals
        return uint256(answer) * 10 ** (18 - config.decimals);
    }
}`}
          />
        </section>

        {/* Section 6 — Circuit Breakers */}
        <section id="circuit-breakers">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Price Circuit Breakers
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Circuit breakers protect your protocol when oracle prices move beyond expected ranges. This
            catches legitimate market crashes, oracle malfunctions, and manipulation attempts. They should
            pause critical operations rather than silently using bad data.
          </p>

          <CodeBlock
            language="solidity"
            filename="PriceCircuitBreaker.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PriceCircuitBreaker {
    AggregatorV3Interface public immutable priceFeed;

    // Circuit breaker state
    int256 public lastValidPrice;
    uint256 public lastValidTimestamp;

    // Configurable thresholds
    uint256 public constant MAX_PRICE_CHANGE_PCT = 15; // 15% max change
    uint256 public constant CIRCUIT_BREAKER_COOLDOWN = 1 hours;

    bool public circuitBreakerTripped;

    event CircuitBreakerTripped(int256 oldPrice, int256 newPrice, uint256 changePct);
    event CircuitBreakerReset();

    error CircuitBreakerActive();
    error PriceDeviationTooHigh(uint256 changePct);

    function getPrice() public view returns (int256) {
        if (circuitBreakerTripped) revert CircuitBreakerActive();

        (, int256 answer, , uint256 updatedAt, ) =
            priceFeed.latestRoundData();

        require(answer > 0, "Invalid price");
        require(block.timestamp - updatedAt <= 3660, "Stale");

        return answer;
    }

    /// @notice Update price with circuit breaker check
    function updatePrice() external {
        (, int256 answer, , uint256 updatedAt, ) =
            priceFeed.latestRoundData();

        require(answer > 0 && updatedAt > 0, "Invalid round");

        if (lastValidPrice > 0) {
            // Calculate percentage change
            int256 diff = answer > lastValidPrice
                ? answer - lastValidPrice
                : lastValidPrice - answer;

            uint256 changePct = (uint256(diff) * 100) / uint256(lastValidPrice);

            if (changePct > MAX_PRICE_CHANGE_PCT) {
                circuitBreakerTripped = true;
                emit CircuitBreakerTripped(
                    lastValidPrice, answer, changePct
                );
                return; // Don't update — wait for manual review
            }
        }

        lastValidPrice = answer;
        lastValidTimestamp = updatedAt;
    }

    /// @notice Admin resets circuit breaker after investigation
    function resetCircuitBreaker() external onlyOwner {
        circuitBreakerTripped = false;
        // Force refresh price on next update
        lastValidPrice = 0;
        emit CircuitBreakerReset();
    }
}`}
          />

          <AlertBox type="info" title="Real Example: Chainlink&apos;s Own Breakers">
            Chainlink feeds already have built-in min/max answer bounds (e.g., LUNA/USD had a min price of
            $0.10). During the LUNA crash, the feed reported $0.10 even as the real price fell to $0.001.
            Protocols using the feed without additional bounds continued lending against LUNA at 100x its
            real value. always implement your own sanity bounds.
          </AlertBox>
        </section>

        {/* Section 7 — TWAP */}
        <section id="twap">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            TWAP Oracles (Uniswap V3)
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            <strong className="text-white">Time-Weighted Average Price (TWAP)</strong> oracles compute
            the average price over a time window using on-chain DEX data. Unlike spot prices, TWAPs
            are resistant to single-block manipulation because an attacker would need to sustain the
            manipulated price across many blocks.
          </p>

          <CodeBlock
            language="solidity"
            filename="UniswapV3TWAP.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@uniswap/v3-core/contracts/libraries/FullMath.sol";

library TWAPOracle {
    /// @notice Get TWAP price from a Uniswap V3 pool
    /// @param pool The Uniswap V3 pool address
    /// @param twapInterval Time window in seconds (e.g., 1800 = 30 min)
    /// @return price The TWAP price as a sqrt ratio
    function getTWAP(
        IUniswapV3Pool pool,
        uint32 twapInterval
    ) internal view returns (int24 arithmeticMeanTick) {
        require(twapInterval > 0, "TWAP interval must be > 0");

        uint32[] memory secondsAgos = new uint32[](2);
        secondsAgos[0] = twapInterval; // e.g., 1800 seconds ago
        secondsAgos[1] = 0;            // now

        (int56[] memory tickCumulatives, ) = pool.observe(secondsAgos);

        // Calculate arithmetic mean tick
        int56 tickCumulativesDelta =
            tickCumulatives[1] - tickCumulatives[0];

        arithmeticMeanTick = int24(
            tickCumulativesDelta / int56(int32(twapInterval))
        );

        // Always round to negative infinity
        if (
            tickCumulativesDelta < 0 &&
            (tickCumulativesDelta % int56(int32(twapInterval)) != 0)
        ) {
            arithmeticMeanTick--;
        }
    }

    /// @notice Convert tick to price with proper decimals
    function getQuoteFromTick(
        int24 tick,
        uint128 baseAmount,
        address baseToken,
        address quoteToken
    ) internal pure returns (uint256 quoteAmount) {
        uint160 sqrtRatioX96 = TickMath.getSqrtRatioAtTick(tick);

        if (sqrtRatioX96 <= type(uint128).max) {
            uint256 ratioX192 = uint256(sqrtRatioX96) * sqrtRatioX96;
            quoteAmount = baseToken < quoteToken
                ? FullMath.mulDiv(ratioX192, baseAmount, 1 << 192)
                : FullMath.mulDiv(1 << 192, baseAmount, ratioX192);
        } else {
            uint256 ratioX128 =
                FullMath.mulDiv(sqrtRatioX96, sqrtRatioX96, 1 << 64);
            quoteAmount = baseToken < quoteToken
                ? FullMath.mulDiv(ratioX128, baseAmount, 1 << 128)
                : FullMath.mulDiv(1 << 128, baseAmount, ratioX128);
        }
    }
}`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">TWAP Advantages</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Resistant to single-block flash loan attacks</li>
                <li>• No external trust assumptions (fully on-chain)</li>
                <li>• Free to query (view function)</li>
                <li>• Manipulation cost scales with window size</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">TWAP Limitations</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Lags behind actual market price</li>
                <li>• Only works for assets with deep liquidity</li>
                <li>• Vulnerable to multi-block MEV manipulation</li>
                <li>• Pool must have sufficient observation history</li>
              </ul>
            </div>
          </div>

          <AlertBox type="warning" title="TWAP Window Selection">
            Shorter windows (5-10 min) are more responsive but cheaper to manipulate. Longer windows
            (30-60 min) are harder to manipulate but lag more. For lending protocols, 30 minutes is a
            common minimum. For liquidations, consider shorter windows with additional checks.
          </AlertBox>
        </section>

        {/* Section 8 — Multi-Oracle */}
        <section id="multi-oracle">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Multi-Oracle Strategies
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Relying on a single oracle is a single point of failure. Production protocols should use
            multiple oracle sources with fallback logic. If one oracle fails or is manipulated, the
            protocol can switch to an alternative or pause until the discrepancy is resolved.
          </p>

          <CodeBlock
            language="solidity"
            filename="MultiOracle.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiOracleAggregator {
    AggregatorV3Interface public immutable chainlinkFeed;
    IUniswapV3Pool public immutable uniswapPool;

    uint256 public constant TWAP_INTERVAL = 1800;  // 30 minutes
    uint256 public constant MAX_DEVIATION = 500;     // 5% (basis points)
    uint256 public constant STALENESS = 3660;

    error OracleDeviation(int256 chainlink, int256 twap, uint256 deviation);
    error AllOraclesFailed();

    /// @notice Primary: Chainlink, fallback: TWAP, with deviation check
    function getPrice() external view returns (uint256 price) {
        (bool chainlinkOk, int256 chainlinkPrice) = _getChainlinkPrice();
        (bool twapOk, int256 twapPrice) = _getTWAPPrice();

        if (chainlinkOk && twapOk) {
            // Both available — check they agree
            uint256 deviation = _calculateDeviation(
                chainlinkPrice, twapPrice
            );
            if (deviation > MAX_DEVIATION) {
                revert OracleDeviation(
                    chainlinkPrice, twapPrice, deviation
                );
            }
            // Use Chainlink as primary (more precise)
            return uint256(chainlinkPrice);
        }

        if (chainlinkOk) return uint256(chainlinkPrice);
        if (twapOk) return uint256(twapPrice);

        revert AllOraclesFailed();
    }

    function _getChainlinkPrice()
        internal view
        returns (bool ok, int256 price)
    {
        try chainlinkFeed.latestRoundData() returns (
            uint80, int256 answer, uint256, uint256 updatedAt, uint80
        ) {
            if (
                answer > 0 &&
                block.timestamp - updatedAt <= STALENESS
            ) {
                return (true, answer);
            }
        } catch {}
        return (false, 0);
    }

    function _getTWAPPrice()
        internal view
        returns (bool ok, int256 price)
    {
        try this._fetchTWAP() returns (int256 twap) {
            if (twap > 0) return (true, twap);
        } catch {}
        return (false, 0);
    }

    function _calculateDeviation(
        int256 a,
        int256 b
    ) internal pure returns (uint256) {
        int256 diff = a > b ? a - b : b - a;
        int256 avg = (a + b) / 2;
        return (uint256(diff) * 10000) / uint256(avg);
    }

    function _fetchTWAP() external view returns (int256) {
        // TWAP calculation (see Section 7)
        // Returns price in same decimals as Chainlink
        // ... implementation omitted for brevity
        return 0;
    }
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Multi-Oracle Strategy Comparison</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="text-lime-400 font-mono font-bold min-w-[100px]">Primary +<br/>Fallback</div>
                <div className="text-gray-400">
                  Use Chainlink as primary. If stale or invalid, fall back to TWAP. Simplest and most common.
                  <span className="text-gray-600 block mt-1">Used by: Aave, Compound</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-blue-400 font-mono font-bold min-w-[100px]">Cross-Check</div>
                <div className="text-gray-400">
                  Read both oracles. If they diverge beyond a threshold, pause or revert. Most secure but may cause false positives.
                  <span className="text-gray-600 block mt-1">Used by: Liquity</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-purple-400 font-mono font-bold min-w-[100px]">Median of N</div>
                <div className="text-gray-400">
                  Use 3+ oracles, take the median. Tolerates 1 oracle being compromised. Higher gas cost.
                  <span className="text-gray-600 block mt-1">Used by: MakerDAO (for some assets)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Spot Price Danger */}
        <section id="spot-price-danger">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Why Spot Price Is Dangerous
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Using a DEX&apos;s current (spot) reserves to calculate price is the single most exploited
            oracle pattern in DeFi. Spot prices can be manipulated within a single transaction using
            flash loans, making them completely unreliable for any financial decision.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Spot Price — Trivially Manipulable',
              code: `// NEVER use this as a price oracle!
function getSpotPrice() external view returns (uint256) {
    // Read current reserves from Uniswap V2 pair
    (uint112 reserve0, uint112 reserve1, ) =
        pair.getReserves();

    // Price = reserve1 / reserve0
    return (uint256(reserve1) * 1e18) / reserve0;
}

// Attack:
// 1. Flash loan 10,000 ETH
// 2. Swap into pool → price 100x
// 3. Call your contract at inflated price
// 4. Profit, repay flash loan
// Cost: ~0.3% swap fee ($30k to steal $10M+)`
            }}
            secure={{
              title: '✅ TWAP or Chainlink — Manipulation Resistant',
              code: `// Use time-weighted average or external oracle
function getPrice() external view returns (uint256) {
    // Option A: Chainlink (off-chain aggregation)
    (, int256 answer, , uint256 updatedAt, ) =
        chainlinkFeed.latestRoundData();
    require(answer > 0, "Invalid");
    require(block.timestamp - updatedAt <= 3660, "Stale");
    return uint256(answer);

    // Option B: Uniswap V3 TWAP (30-min window)
    // Cannot be manipulated in a single block
    // Cost to manipulate scales with:
    //   time window × pool liquidity × blocks

    // Option C: Both with cross-check
    // Highest security — see Section 8
}`
            }}
          />

          <AlertBox type="danger" title="Real Attack: Mango Markets ($114M)">
            In October 2022, an attacker used $5M to manipulate the spot price of MNGO on
            Mango Markets (Solana). By inflating the token price, they borrowed $114M against their
            inflated collateral. The protocol used the spot order book price without any TWAP or
            external oracle cross-check.
          </AlertBox>
        </section>

        {/* Section 10 — L2 Considerations */}
        <section id="l2-considerations">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            L2 &amp; Sequencer Considerations
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            On Layer 2 rollups (Arbitrum, Optimism, Base), an additional risk emerges: the
            <strong className="text-white"> sequencer</strong> can go down. When the sequencer is offline,
            no new transactions are processed, but Chainlink feeds may continue showing the last known
            price. When the sequencer restarts, the stale price could be exploited before fresh updates arrive.
          </p>

          <CodeBlock
            language="solidity"
            filename="L2SequencerCheck.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract L2OracleConsumer {
    AggregatorV3Interface public immutable priceFeed;
    AggregatorV3Interface public immutable sequencerUptimeFeed;

    uint256 public constant GRACE_PERIOD = 3600; // 1 hour after restart

    error SequencerDown();
    error GracePeriodNotOver(uint256 timeSinceUp);

    /**
     * Sequencer Uptime Feed addresses:
     * Arbitrum: 0xFdB631F5EE196F0ed6FAa767959853A9F217697D
     * Optimism: 0x371EAD81c9102C9BF4874A9075FFFf170F2Ee389
     * Base:     0xBCF85224fc0756B9Fa45aAb7d157a8263872EEF8
     */
    constructor(address _priceFeed, address _sequencerFeed) {
        priceFeed = AggregatorV3Interface(_priceFeed);
        sequencerUptimeFeed = AggregatorV3Interface(_sequencerFeed);
    }

    function getPrice() external view returns (int256) {
        // Step 1: Check if sequencer is up
        _checkSequencer();

        // Step 2: Get price with standard checks
        (
            uint80 roundId,
            int256 answer,
            ,
            uint256 updatedAt,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        require(answer > 0, "Invalid price");
        require(block.timestamp - updatedAt <= 3660, "Stale price");
        require(answeredInRound >= roundId, "Stale round");

        return answer;
    }

    function _checkSequencer() internal view {
        (, int256 answer, uint256 startedAt, , ) =
            sequencerUptimeFeed.latestRoundData();

        // answer == 0: sequencer is up
        // answer == 1: sequencer is down
        if (answer != 0) revert SequencerDown();

        // Ensure grace period has passed since restart
        uint256 timeSinceUp = block.timestamp - startedAt;
        if (timeSinceUp < GRACE_PERIOD) {
            revert GracePeriodNotOver(timeSinceUp);
        }
    }
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Why the Grace Period Matters</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center text-red-400 text-xs font-bold flex-shrink-0">1</div>
                <span className="text-gray-400">Sequencer goes down. Chainlink feeds freeze at last known price.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center text-orange-400 text-xs font-bold flex-shrink-0">2</div>
                <span className="text-gray-400">Market moves significantly during downtime (e.g., ETH drops 20%).</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 text-xs font-bold flex-shrink-0">3</div>
                <span className="text-gray-400">Sequencer restarts. Old stale price is still in the feed for a few blocks.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400 text-xs font-bold flex-shrink-0">4</div>
                <span className="text-gray-400">Without grace period: attacker borrows at stale high price, profits from the real low price.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-400/10 flex items-center justify-center text-green-400 text-xs font-bold flex-shrink-0">5</div>
                <span className="text-gray-400">With grace period: protocol blocks operations for 1 hour, allowing feeds to refresh.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 — Common Mistakes */}
        <section id="common-mistakes">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Common Mistakes
          </h2>

          <div className="space-y-6">
            {/* Mistake 1 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2">1. Hardcoded Staleness Threshold</h3>
              <p className="text-gray-400 text-sm mb-3">
                Using the same staleness threshold for all feeds. USDC/USD has a 24-hour heartbeat while
                ETH/USD has a 1-hour heartbeat. Hardcoding 1 hour means USDC/USD will always revert.
              </p>
              <CodeBlock
                language="solidity"
                filename="Fix.sol"
                code={`// ❌ Bad: Same threshold for all feeds
uint256 constant STALENESS = 3600;

// ✅ Good: Per-feed configuration
mapping(address => uint256) public feedStaleness;
// ETH/USD → 3660, USDC/USD → 86460, etc.`}
              />
            </div>

            {/* Mistake 2 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2">2. Ignoring Decimal Differences</h3>
              <p className="text-gray-400 text-sm mb-3">
                Chainlink USD feeds return 8 decimals, ETH-denominated feeds return 18 decimals.
                Mixing them without normalization produces wildly wrong results.
              </p>
              <CodeBlock
                language="solidity"
                filename="DecimalNormalization.sol"
                code={`// ETH/USD returns 8 decimals: 250000000000 ($2,500)
// WBTC/ETH returns 18 decimals

function normalize(
    int256 price,
    uint8 feedDecimals,
    uint8 targetDecimals
) internal pure returns (uint256) {
    if (feedDecimals < targetDecimals) {
        return uint256(price) * 10 ** (targetDecimals - feedDecimals);
    } else {
        return uint256(price) / 10 ** (feedDecimals - targetDecimals);
    }
}`}
              />
            </div>

            {/* Mistake 3 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2">3. Not Handling Feed Deprecation</h3>
              <p className="text-gray-400 text-sm mb-3">
                Chainlink can deprecate feeds. If your contract has a hardcoded feed address with no
                way to update it, you&apos;re stuck with a dead oracle. Always include an admin function
                to update feed addresses (behind a timelock).
              </p>
              <CodeBlock
                language="solidity"
                filename="UpdatableFeed.sol"
                code={`// ✅ Allow feed updates (with timelock protection)
function updatePriceFeed(
    address token,
    address newFeed
) external onlyOwner {
    require(newFeed != address(0), "Zero address");
    require(newFeed.code.length > 0, "Not a contract");

    // Verify the new feed works
    (, int256 answer, , uint256 updatedAt, ) =
        AggregatorV3Interface(newFeed).latestRoundData();
    require(answer > 0 && updatedAt > 0, "Feed broken");

    priceFeeds[token] = AggregatorV3Interface(newFeed);
    emit PriceFeedUpdated(token, newFeed);
}`}
              />
            </div>

            {/* Mistake 4 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2">4. Using Price for Tokens with Different Decimals</h3>
              <p className="text-gray-400 text-sm mb-3">
                When calculating USD value of a token amount, you must account for both the token&apos;s
                decimals and the feed&apos;s decimals. USDC has 6 decimals, WBTC has 8, ETH has 18.
              </p>
              <CodeBlock
                language="solidity"
                filename="ProperValueCalc.sol"
                code={`/// @notice Calculate USD value of any token amount
function getUsdValue(
    address token,
    uint256 amount
) public view returns (uint256 usdValue18) {
    int256 price = getPrice(token);           // 8 decimals
    uint8 tokenDecimals = IERC20(token).decimals();

    // Normalize everything to 18 decimals
    // amount: tokenDecimals, price: 8 decimals
    // result: tokenDecimals + 8 - tokenDecimals = 8 → scale to 18
    usdValue18 = (amount * uint256(price) * 1e10)
        / (10 ** tokenDecimals);
    // amount * price = tokenDecimals + 8
    // * 1e10 = tokenDecimals + 18
    // / 10^tokenDecimals = 18 decimals ✓
}`}
              />
            </div>

            {/* Mistake 5 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2">5. No Fallback When Oracle Reverts</h3>
              <p className="text-gray-400 text-sm mb-3">
                If <code className="text-lime-400">latestRoundData()</code> reverts (multisig access
                revoked, feed deprecated, etc.), your entire protocol halts. Always wrap oracle calls
                in try/catch with a fallback strategy.
              </p>
              <CodeBlock
                language="solidity"
                filename="OracleFallback.sol"
                code={`function getPrice() public view returns (uint256) {
    // Try primary oracle
    try chainlinkFeed.latestRoundData() returns (
        uint80, int256 answer, uint256, uint256 updatedAt, uint80
    ) {
        if (answer > 0 && block.timestamp - updatedAt <= STALENESS) {
            return uint256(answer);
        }
    } catch {
        // Chainlink completely unavailable
    }

    // Fallback to TWAP
    try this.getTWAPPrice() returns (uint256 twapPrice) {
        if (twapPrice > 0) return twapPrice;
    } catch {}

    // Both failed — pause operations, don't use bad data
    revert("All oracles failed");
}`}
              />
            </div>
          </div>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Oracle Integration Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Chainlink Checks */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">📡</span> Chainlink Integration
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Validate answer > 0',
                  'Check updatedAt freshness against heartbeat',
                  'Verify answeredInRound >= roundId',
                  'Per-feed staleness threshold configured',
                  'Min / max price sanity bounds set',
                  'Feed address can be updated (with timelock)',
                  'Decimal normalization correct',
                  'try/catch wrapping for revert handling',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* TWAP Checks */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">📊</span> TWAP Oracle
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'TWAP window ≥ 30 minutes for lending',
                  'Pool has sufficient liquidity depth',
                  'Pool has enough observation history',
                  'Tick arithmetic handles rounding correctly',
                  'Decimal conversion accounts for token pair order',
                  'Fallback if pool.observe() reverts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">🏗️</span> Architecture
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Multiple oracle sources with fallback',
                  'Cross-check between oracles when both available',
                  'Circuit breaker for extreme price movements',
                  'No spot price from DEX reserves',
                  'Emergency pause if all oracles fail',
                  'Events emitted for oracle switches',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* L2 Specific */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">🔗</span> L2 Deployments
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Sequencer uptime feed checked',
                  'Grace period after sequencer restart (≥ 1h)',
                  'L2-specific heartbeat thresholds used',
                  'Different feed addresses per chain verified',
                  'Cross-chain oracle consistency validated',
                  'Sequencer downtime handling tested',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-white/[0.06]">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Oracle', 'Chainlink', 'TWAP', 'Price Feed', 'Flash Loan', 'Manipulation', 'L2', 'Sequencer', 'Multi-Oracle'].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.06]">
              {tag}
            </span>
          ))}
        </div>

        {/* Share & Bookmark */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.06] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-white/[0.04] text-gray-400 hover:text-white border border-white/[0.06] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Bookmark
            </button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/learn/vulnerabilities/oracle-manipulation" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Oracle Manipulation</h4>
              <p className="text-gray-500 text-sm">Deep dive into how oracle manipulation attacks work and real-world exploits.</p>
            </Link>
            <Link href="/learn/vulnerabilities/flash-loan-attacks" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Flash Loan Attacks</h4>
              <p className="text-gray-500 text-sm">Understanding flash loan mechanics and how they enable oracle manipulation.</p>
            </Link>
            <Link href="/learn/best-practices/emergency-procedures" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Emergency Procedures</h4>
              <p className="text-gray-500 text-sm">How to implement circuit breakers and emergency stops for oracle failures.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Is your oracle integration secure?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Oracle vulnerabilities are responsible for the largest DeFi exploits. Get your price feed
            integration audited to ensure proper validation, fallback logic, and manipulation resistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/fast-audit"
              className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors"
            >
              Start Free Audit →
            </Link>
            <Link
              href="/learn/best-practices"
              className="px-6 py-3 bg-white/[0.04] text-white font-semibold rounded-xl border border-white/[0.06] hover:border-lime-400/30 transition-colors"
            >
              ← Back to Best Practices
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
