'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function FlashLoanAttacksPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Flash Loan Attacks' },
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
        
        <h1>Flash Loan Attack Vectors</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            15 min read
          </span>
          <span>•</span>
          <span>Updated Dec 12, 2024</span>
          <span>•</span>
          <span>By Hexific Team</span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-are-flash-loans" className="toc-link hover:text-lime-400">What are Flash Loans?</a></li>
          <li><a href="#attack-vectors" className="toc-link hover:text-lime-400">Common Attack Vectors</a></li>
          <li><a href="#price-manipulation" className="toc-link hover:text-lime-400">Price Oracle Manipulation</a></li>
          <li><a href="#governance-attacks" className="toc-link hover:text-lime-400">Governance Attacks</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-are-flash-loans">
          <h2>What are Flash Loans?</h2>
          <p>
            Flash loans are uncollateralized loans that must be borrowed and repaid within a single 
            transaction. If the loan isn't repaid by the end of the transaction, the entire 
            transaction reverts as if it never happened.
          </p>
          
          <div className="my-6 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">💡 Key Characteristics</h4>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>No collateral required</strong> - Borrow millions with zero upfront capital</li>
              <li>• <strong>Atomic execution</strong> - Everything happens in one transaction</li>
              <li>• <strong>All-or-nothing</strong> - If repayment fails, loan never happened</li>
              <li>• <strong>Available on:</strong> Aave, dYdX, Uniswap V2/V3, Balancer</li>
            </ul>
          </div>

          <CodeBlock
            code={`// Basic flash loan structure
interface IFlashLoanReceiver {
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external returns (bool);
}

contract FlashLoanExample is IFlashLoanReceiver {
    IPool public aavePool;
    
    function executeFlashLoan(address asset, uint256 amount) external {
        address[] memory assets = new address[](1);
        assets[0] = asset;
        
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = amount;
        
        // 0 = no debt, 1 = stable, 2 = variable
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;
        
        aavePool.flashLoan(
            address(this),
            assets,
            amounts,
            modes,
            address(this),
            "",
            0
        );
    }
    
    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        // Your attack/arbitrage logic here
        
        // Repay the loan + premium
        uint256 amountOwed = amounts[0] + premiums[0];
        IERC20(assets[0]).approve(address(aavePool), amountOwed);
        
        return true;
    }
}`}
            language="solidity"
            filename="FlashLoanExample.sol"
          />
        </section>

        <section id="attack-vectors">
          <h2>Common Attack Vectors</h2>
          <p>
            Flash loans themselves aren't vulnerabilities - they're a feature. However, they amplify
            other vulnerabilities by providing attackers with massive capital. Here are the main vectors:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">🎯 Price Oracle Manipulation</h4>
              <p className="text-sm text-gray-400">
                Temporarily manipulate spot prices to trick protocols using on-chain price feeds.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">🗳️ Governance Attacks</h4>
              <p className="text-sm text-gray-400">
                Borrow governance tokens to pass malicious proposals in a single block.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h4 className="font-semibold text-yellow-400 mb-2">💱 Arbitrage Exploitation</h4>
              <p className="text-sm text-gray-400">
                Exploit pricing discrepancies between DEXs or lending protocols.
              </p>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="font-semibold text-purple-400 mb-2">🏦 Collateral Manipulation</h4>
              <p className="text-sm text-gray-400">
                Inflate collateral value to borrow more than should be allowed.
              </p>
            </div>
          </div>
        </section>

        <section id="price-manipulation">
          <h2>Price Oracle Manipulation</h2>
          <p>
            The most common flash loan attack involves manipulating prices on AMMs (Automated Market Makers)
            that protocols use as price oracles.
          </p>

          <AlertBox type="danger" title="Attack Pattern">
            <ol className="list-decimal list-inside space-y-1">
              <li>Flash loan a large amount of Token A</li>
              <li>Swap Token A for Token B on a DEX (crashes Token A price)</li>
              <li>Interact with vulnerable protocol using manipulated price</li>
              <li>Profit from mispriced assets or liquidations</li>
              <li>Swap back and repay flash loan</li>
            </ol>
          </AlertBox>

          <CodeBlock
            code={`// ❌ VULNERABLE: Using spot price from AMM
contract VulnerableLending {
    IUniswapV2Pair public pair;
    
    function getPrice() public view returns (uint256) {
        (uint112 reserve0, uint112 reserve1,) = pair.getReserves();
        // This can be manipulated within a single transaction!
        return (uint256(reserve1) * 1e18) / uint256(reserve0);
    }
    
    function borrow(uint256 collateralAmount) external {
        uint256 price = getPrice(); // Manipulable!
        uint256 borrowLimit = (collateralAmount * price) / 1e18;
        // Attacker can inflate price to borrow more
        _transferTokens(msg.sender, borrowLimit);
    }
}

// ✅ SECURE: Using Chainlink or TWAP
contract SecureLending {
    AggregatorV3Interface public priceFeed;
    
    function getPrice() public view returns (uint256) {
        (
            ,
            int256 price,
            ,
            uint256 updatedAt,
            
        ) = priceFeed.latestRoundData();
        
        // Check for stale data
        require(block.timestamp - updatedAt < 1 hours, "Stale price");
        require(price > 0, "Invalid price");
        
        return uint256(price);
    }
}`}
            language="solidity"
            filename="PriceOracleComparison.sol"
          />
        </section>

        <section id="governance-attacks">
          <h2>Governance Attacks</h2>
          <p>
            Flash loans can be used to temporarily acquire enough governance tokens to pass malicious
            proposals or manipulate voting outcomes.
          </p>

          <div className="my-6 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-red-400 mb-3">🚨 Beanstalk Attack (April 2022)</h4>
            <p className="text-gray-300 mb-3">
              Attacker used $1B in flash loaned funds to acquire enough STALK tokens to pass a 
              malicious governance proposal that drained $182M from the protocol.
            </p>
            <div className="text-sm text-gray-400">
              <strong>Attack flow:</strong> Flash loan → Deposit into Beanstalk → Vote on malicious BIP → 
              Execute BIP → Drain funds → Repay loan
            </div>
          </div>

          <CodeBlock
            code={`// ❌ VULNERABLE: No snapshot or timelock
contract VulnerableGovernance {
    mapping(address => uint256) public votingPower;
    
    function vote(uint256 proposalId, bool support) external {
        // Uses current balance - can be manipulated!
        uint256 votes = token.balanceOf(msg.sender);
        proposals[proposalId].votes += votes;
    }
    
    function execute(uint256 proposalId) external {
        // No timelock - immediate execution
        require(proposals[proposalId].votes > quorum, "Not passed");
        _executeProposal(proposalId);
    }
}

// ✅ SECURE: Snapshot voting + timelock
contract SecureGovernance {
    function vote(uint256 proposalId, bool support) external {
        // Use snapshot from proposal creation block
        uint256 snapshotBlock = proposals[proposalId].snapshotBlock;
        uint256 votes = token.getPastVotes(msg.sender, snapshotBlock);
        
        proposals[proposalId].votes += votes;
    }
    
    function execute(uint256 proposalId) external {
        require(proposals[proposalId].votes > quorum, "Not passed");
        // Timelock prevents immediate execution
        require(
            block.timestamp >= proposals[proposalId].eta,
            "Timelock not expired"
        );
        _executeProposal(proposalId);
    }
}`}
            language="solidity"
            filename="GovernanceComparison.sol"
          />
        </section>

        <section id="real-examples">
          <h2>Real-World Examples</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Euler Finance (March 2023)</h4>
                <span className="text-red-400 font-bold">$197M</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Flash loan + donation function exploit. Attacker used flash loans to create 
                leveraged positions, then donated to make themselves liquidatable at a profit.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Donation Attack</span>
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Beanstalk (April 2022)</h4>
                <span className="text-red-400 font-bold">$182M</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Flash loan governance attack. Borrowed $1B to gain voting majority and pass 
                a malicious proposal in a single transaction.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Governance</span>
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Cream Finance (October 2021)</h4>
                <span className="text-red-400 font-bold">$130M</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Flash loan + price oracle manipulation. Exploited the pricing of yUSD vault 
                tokens to drain lending pools.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Oracle</span>
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Pancake Bunny (May 2021)</h4>
                <span className="text-red-400 font-bold">$45M</span>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                Flash loan used to manipulate BUNNY/BNB price, then exploit the protocol's 
                reward calculation mechanism.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Flash Loan</span>
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Price Manipulation</span>
              </div>
            </div>
          </div>
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Use Time-Weighted Oracles</h4>
              <p className="text-sm text-gray-400">
                TWAP (Time-Weighted Average Price) oracles average prices over time, making 
                single-block manipulation impractical.
              </p>
            </div>
            
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Chainlink Price Feeds</h4>
              <p className="text-sm text-gray-400">
                Decentralized oracle networks aggregate data from multiple sources, resistant 
                to on-chain manipulation.
              </p>
            </div>
            
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Governance Timelocks</h4>
              <p className="text-sm text-gray-400">
                Delay between proposal passing and execution gives community time to react 
                to malicious proposals.
              </p>
            </div>
            
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Snapshot Voting</h4>
              <p className="text-sm text-gray-400">
                Use token balances from a past block (snapshot) for voting power, not 
                current balance.
              </p>
            </div>
            
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Multi-Block Validation</h4>
              <p className="text-sm text-gray-400">
                Require actions to span multiple blocks, making atomic flash loan attacks 
                impossible.
              </p>
            </div>
            
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-3">✅ Flash Loan Guards</h4>
              <p className="text-sm text-gray-400">
                Detect and block interactions from contracts that borrowed via flash loans 
                in the same transaction.
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// Flash loan detection guard
contract FlashLoanGuard {
    mapping(address => uint256) private _lastBlock;
    
    modifier noFlashLoan() {
        require(
            _lastBlock[tx.origin] != block.number,
            "Flash loan detected"
        );
        _lastBlock[tx.origin] = block.number;
        _;
    }
    
    // Alternative: Check if caller is a contract with code
    modifier noContract() {
        require(msg.sender == tx.origin, "No contracts");
        _;
    }
}

// TWAP Oracle implementation
contract TWAPOracle {
    uint256 public constant PERIOD = 30 minutes;
    
    uint256 public price0CumulativeLast;
    uint256 public price1CumulativeLast;
    uint32 public blockTimestampLast;
    
    FixedPoint.uq112x112 public price0Average;
    FixedPoint.uq112x112 public price1Average;
    
    function update() external {
        (
            uint256 price0Cumulative,
            uint256 price1Cumulative,
            uint32 blockTimestamp
        ) = UniswapV2OracleLibrary.currentCumulativePrices(pair);
        
        uint32 timeElapsed = blockTimestamp - blockTimestampLast;
        require(timeElapsed >= PERIOD, "Period not elapsed");
        
        price0Average = FixedPoint.uq112x112(
            uint224((price0Cumulative - price0CumulativeLast) / timeElapsed)
        );
        price1Average = FixedPoint.uq112x112(
            uint224((price1Cumulative - price1CumulativeLast) / timeElapsed)
        );
        
        price0CumulativeLast = price0Cumulative;
        price1CumulativeLast = price1Cumulative;
        blockTimestampLast = blockTimestamp;
    }
}`}
            language="solidity"
            filename="FlashLoanDefenses.sol"
          />
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['Flash Loans', 'DeFi', 'Oracle', 'Governance', 'Aave', 'Price Manipulation'].map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs text-lime-400/70 bg-lime-400/10 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/learn/vulnerabilities/oracle-manipulation" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Oracle Manipulation Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Deep dive into price oracle vulnerabilities</p>
            </Link>
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Another critical vulnerability often combined with flash loans</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
