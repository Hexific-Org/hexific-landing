'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function UncheckedReturnValuesPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Unchecked Return Values' },
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

        <h1>Unchecked Return Values</h1>

        <p className="text-xl text-gray-300 mt-4">
          Why ignoring return values from external calls and token transfers can lead to 
          silent failures, stuck funds, and exploitable accounting errors.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 min read
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>By Hexific Security Team</span>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-400">Silent</div>
          <div className="text-xs text-gray-500">Failure Mode</div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">$33M+</div>
          <div className="text-xs text-gray-500">Lost Historically</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">ERC-20</div>
          <div className="text-xs text-gray-500">Most Common</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">Easy</div>
          <div className="text-xs text-gray-500">To Prevent</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#the-problem" className="toc-link hover:text-lime-400">The Silent Failure Problem</a></li>
          <li><a href="#low-level-calls" className="toc-link hover:text-lime-400">Low-Level Calls & Return Values</a></li>
          <li><a href="#erc20-pitfalls" className="toc-link hover:text-lime-400">ERC-20 Transfer Pitfalls</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
          <li><a href="#safe-transfer" className="toc-link hover:text-lime-400">SafeERC20 Deep Dive</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Unchecked Returns</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="the-problem">
          <h2>The Silent Failure Problem</h2>
          <p>
            In Solidity, many operations return a boolean value indicating success or failure. 
            When developers ignore these return values, the contract continues executing as 
            if everything succeeded — even when it didn't. This creates a dangerous gap between 
            what the contract thinks happened and what actually happened.
          </p>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🔇 How Silent Failures Happen</h4>

            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">1</span>
                <div>
                  <h5 className="font-medium text-green-400">Contract calls external function</h5>
                  <p className="text-xs text-gray-400">e.g., token.transfer(to, amount)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">2</span>
                <div>
                  <h5 className="font-medium text-red-400">External call fails silently</h5>
                  <p className="text-xs text-gray-400">Returns false instead of reverting</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm">3</span>
                <div>
                  <h5 className="font-medium text-yellow-400">Return value ignored</h5>
                  <p className="text-xs text-gray-400">Developer didn't check the bool return</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <span className="flex-shrink-0 w-8 h-8 bg-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">4</span>
                <div>
                  <h5 className="font-medium text-purple-400">Contract updates internal state</h5>
                  <p className="text-xs text-gray-400">Balances updated, but tokens never moved!</p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="text-sm text-red-400">
                💥 <strong>Result:</strong> Contract's accounting says funds were sent, 
                but they're still in the contract (or were never received). 
                Exploitable state desync.
              </span>
            </div>
          </div>
        </section>

        <section id="low-level-calls">
          <h2>Low-Level Calls & Return Values</h2>
          <p>
            Solidity has two ways to make external calls, and they handle failures differently:
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h4 className="font-semibold text-lime-400">High-Level Calls</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Calling functions directly on a typed contract reference. Failures 
                automatically revert the transaction.
              </p>
              <code className="text-xs text-gray-400 bg-black/30 p-2 rounded block">
                IToken(token).transfer(to, amount);
              </code>
              <p className="text-xs text-lime-400 mt-2">
                ✓ Reverts on failure (safe by default)
              </p>
            </div>

            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h4 className="font-semibold text-red-400">Low-Level Calls</h4>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Using <code>.call()</code>, <code>.send()</code>, or <code>.transfer()</code>. 
                Failures return false without reverting.
              </p>
              <code className="text-xs text-gray-400 bg-black/30 p-2 rounded block">
                address(to).call&#123;value: amt&#125;(&quot;&quot;);
              </code>
              <p className="text-xs text-red-400 mt-2">
                ✗ Returns false on failure (must check!)
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// Low-level call return values
function lowLevelCalls() external {
    // .call() returns (bool success, bytes memory data)
    (bool success, bytes memory data) = target.call{value: 1 ether}("");
    // If you don't check 'success', a failed call is silently ignored!
    
    // .send() returns bool
    bool sent = payable(to).send(1 ether);
    // Returns false if send fails (e.g., out of gas in receive())
    
    // .transfer() is the ONLY one that reverts on failure
    payable(to).transfer(1 ether);
    // Reverts with 2300 gas stipend limitation
    
    // ERC-20 transfer() returns bool (per standard)
    bool transferred = IERC20(token).transfer(to, amount);
    // Some non-standard tokens return nothing (USDT!)
}`}
            language="solidity"
            filename="LowLevelCalls.sol"
          />

          <AlertBox type="info" title="The .transfer() Exception">
            While <code>.transfer()</code> does revert on failure, it forwards only 2300 gas — 
            not enough for contracts with complex <code>receive()</code> functions. 
            The modern best practice is to use <code>.call()</code> with a return value check.
          </AlertBox>
        </section>

        <section id="erc20-pitfalls">
          <h2>ERC-20 Transfer Pitfalls</h2>
          <p>
            The ERC-20 standard specifies that <code>transfer()</code> and <code>transferFrom()</code> 
            should return a boolean. However, many popular tokens behave differently:
          </p>

          <div className="my-8 space-y-4">
            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💰</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">USDT (Tether)</h4>
                  <p className="text-sm text-gray-400">
                    The most infamous non-compliant token. USDT's <code>transfer()</code> 
                    and <code>approve()</code> return <strong>nothing</strong> (void). 
                    Standard <code>IERC20</code> interface calls will revert because 
                    the ABI decoder expects a bool return.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">$80B+ Market Cap</span>
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Non-Standard</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">BNB (Original ERC-20)</h4>
                  <p className="text-sm text-gray-400">
                    The original BNB token on Ethereum returns <strong>false</strong> 
                    on failure instead of reverting. If you don't check the return value, 
                    failed transfers go unnoticed.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Returns False</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🛑</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Fee-on-Transfer Tokens</h4>
                  <p className="text-sm text-gray-400">
                    Tokens like STA or PAXG deduct a fee on transfer. Even if you check the 
                    return value, the received amount differs from the sent amount, causing 
                    accounting errors.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Amount Mismatch</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-blue-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔐</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">Tokens with approve() Race</h4>
                  <p className="text-sm text-gray-400">
                    Some tokens (including USDT) require the allowance to be set to 0 before 
                    changing to a new value. Calling <code>approve(spender, newAmount)</code> 
                    when the current allowance is non-zero will fail.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Approve Pattern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>

          <h3>❌ Pattern 1: Unchecked .call()</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Return value ignored on .call()
contract VulnerableETHSender {
    mapping(address => uint256) public balances;
    
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        
        // 💀 If this fails (e.g., recipient reverts), 
        // balance is already zeroed out!
        // User loses their ETH forever.
        payable(msg.sender).call{value: amount}("");
    }
}

// ✅ CORRECT: Check return value
contract SafeETHSender {
    mapping(address => uint256) public balances;
    
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH transfer failed");
    }
}`}
            language="solidity"
            filename="UncheckedCall.sol"
          />

          <h3>❌ Pattern 2: Unchecked ERC-20 Transfer</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Token transfer return value ignored
contract VulnerableVault {
    IERC20 public token;
    mapping(address => uint256) public deposits;
    
    function deposit(uint256 amount) external {
        // 💀 If transferFrom returns false (BNB, some tokens),
        // deposit is credited but no tokens received!
        token.transferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
    }
    
    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient");
        deposits[msg.sender] -= amount;
        
        // 💀 If transfer returns false, balance is deducted
        // but user never receives tokens!
        token.transfer(msg.sender, amount);
    }
}`}
            language="solidity"
            filename="UncheckedERC20.sol"
          />

          <h3>❌ Pattern 3: Unchecked .send()</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: .send() return value ignored
contract VulnerableLottery {
    address[] public players;
    
    function pickWinner() external {
        uint256 index = uint256(blockhash(block.number - 1)) % players.length;
        address winner = players[index];
        
        // 💀 .send() returns false if it fails
        // Prize money stays in contract, winner gets nothing
        // No one knows it failed!
        payable(winner).send(address(this).balance);
        
        delete players;
    }
}`}
            language="solidity"
            filename="UncheckedSend.sol"
          />

          <h3>❌ Pattern 4: Batch Operations with Silent Failures</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Batch airdrop with unchecked transfers
contract VulnerableAirdrop {
    IERC20 public token;
    
    function airdrop(address[] calldata recipients, uint256 amount) external {
        for (uint256 i = 0; i < recipients.length; i++) {
            // 💀 If one transfer fails (blacklisted address, etc.),
            // it's silently skipped. Some users get tokens, some don't.
            // No way to know which ones failed!
            token.transfer(recipients[i], amount);
        }
    }
}

// ✅ CORRECT: Track failures or revert on any failure
contract SafeAirdrop {
    using SafeERC20 for IERC20;
    IERC20 public token;
    
    function airdrop(address[] calldata recipients, uint256 amount) external {
        for (uint256 i = 0; i < recipients.length; i++) {
            // Reverts if ANY transfer fails
            token.safeTransfer(recipients[i], amount);
        }
    }
}`}
            language="solidity"
            filename="UncheckedBatch.sol"
          />
        </section>

        <section id="real-examples">
          <h2>Real-World Examples</h2>

          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">King of the Ether Throne</h4>
                <span className="text-xs text-gray-500">2016</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                An early Ethereum game where users bid to become "king." The contract 
                used <code>.send()</code> to refund the dethroned king but never checked 
                the return value. When refunds failed (e.g., sending to a contract 
                without <code>receive()</code>), users lost their ETH permanently.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Unchecked .send()</span>
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Funds Locked</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">USDT Integration Failures</h4>
                <span className="text-xs text-gray-500">Ongoing</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Dozens of DeFi protocols have launched without USDT support because they 
                used the standard <code>IERC20</code> interface. USDT's non-standard return 
                value causes the ABI decoder to revert, effectively blacklisting USDT from 
                interacting with these contracts.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Non-Standard ERC-20</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">USDT Incompatibility</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Multi-Token Vault Exploits</h4>
                <span className="text-xs text-gray-500">Multiple Incidents</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Vaults that support multiple tokens often credit deposits before verifying 
                the transfer succeeded. With tokens that return false instead of reverting, 
                attackers can credit their account without actually depositing tokens.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Accounting Exploit</span>
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Free Deposits</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Ethernaut Level 9 - King</h4>
                <span className="text-xs text-gray-500">Learning</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                This CTF challenge demonstrates the unchecked return value vulnerability. 
                The contract uses <code>.transfer()</code> to send ETH, and players must 
                exploit the fact that transfers to contracts without receive() will fail.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">CTF Challenge</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Educational</span>
              </div>
            </div>
          </div>
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📦</span>
                <h4 className="font-semibold text-lime-400">Use SafeERC20</h4>
              </div>
              <p className="text-sm text-gray-400">
                OpenZeppelin's <code>SafeERC20</code> wraps all ERC-20 functions, 
                checks return values, and handles non-standard tokens like USDT.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h4 className="font-semibold text-lime-400">Always Check Returns</h4>
              </div>
              <p className="text-sm text-gray-400">
                For <code>.call()</code> and <code>.send()</code>, always capture the 
                return value and <code>require()</code> it.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔧</span>
                <h4 className="font-semibold text-lime-400">Run Static Analysis</h4>
              </div>
              <p className="text-sm text-gray-400">
                Slither detects unchecked return values automatically with the 
                <code>unchecked-transfer</code> and <code>unchecked-send</code> detectors.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧪</span>
                <h4 className="font-semibold text-lime-400">Test with Weird Tokens</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use <code>weird-erc20</code> test tokens that return false, return nothing, 
                take fees, or have other non-standard behaviors.
              </p>
            </div>
          </div>

          <h3>✅ Correct ETH Transfer Pattern</h3>
          <CodeBlock
            code={`// ✅ SECURE: Always check .call() return value
contract SafeETHTransfer {
    mapping(address => uint256) public balances;
    
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        
        // CEI pattern: update state before external call
        balances[msg.sender] = 0;
        
        // ✅ Check the return value!
        (bool success,) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH transfer failed");
        
        // If transfer fails, the entire transaction reverts
        // and balances[msg.sender] is restored to its original value
    }
    
    // Alternative: Use OpenZeppelin's Address library
    // import "@openzeppelin/contracts/utils/Address.sol";
    // using Address for address payable;
    //
    // function withdraw() external {
    //     balances[msg.sender] = 0;
    //     payable(msg.sender).sendValue(amount);  // ✅ Reverts on failure
    // }
}`}
            language="solidity"
            filename="SafeETH.sol"
          />

          <h3>✅ Correct ERC-20 Transfer Pattern</h3>
          <CodeBlock
            code={`// ✅ SECURE: Using SafeERC20 for all token interactions
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SafeVault {
    using SafeERC20 for IERC20;
    
    IERC20 public token;
    mapping(address => uint256) public deposits;
    
    constructor(address _token) {
        token = IERC20(_token);
    }
    
    function deposit(uint256 amount) external {
        // ✅ safeTransferFrom handles:
        // - Tokens that return false (reverts)
        // - Tokens that return nothing/USDT (still works)
        // - Standard tokens (normal bool check)
        token.safeTransferFrom(msg.sender, address(this), amount);
        deposits[msg.sender] += amount;
    }
    
    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient");
        deposits[msg.sender] -= amount;
        
        // ✅ safeTransfer handles all edge cases
        token.safeTransfer(msg.sender, amount);
    }
    
    function approveSpender(address spender, uint256 amount) external {
        // ✅ forceApprove handles USDT's require-zero-first pattern
        token.forceApprove(spender, amount);
    }
}`}
            language="solidity"
            filename="SafeVault.sol"
          />
        </section>

        <section id="safe-transfer">
          <h2>SafeERC20 Deep Dive</h2>
          <p>
            Understanding how SafeERC20 works under the hood helps you appreciate why 
            it's essential:
          </p>

          <CodeBlock
            code={`// Simplified SafeERC20 implementation (OpenZeppelin v5)
library SafeERC20 {
    function safeTransfer(IERC20 token, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transfer, (to, value)));
    }
    
    function safeTransferFrom(IERC20 token, address from, address to, uint256 value) internal {
        _callOptionalReturn(token, abi.encodeCall(token.transferFrom, (from, to, value)));
    }
    
    function forceApprove(IERC20 token, address spender, uint256 value) internal {
        // Handle USDT-style tokens that require approve(0) first
        bytes memory approvalCall = abi.encodeCall(token.approve, (spender, value));
        
        if (!_callOptionalReturnBool(token, approvalCall)) {
            // If direct approve fails, try setting to 0 first
            _callOptionalReturn(token, abi.encodeCall(token.approve, (spender, 0)));
            _callOptionalReturn(token, approvalCall);
        }
    }
    
    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        // Make the call
        (bool success, bytes memory returndata) = address(token).call(data);
        
        // ✅ Check 1: Call didn't revert
        require(success, "SafeERC20: low-level call failed");
        
        // ✅ Check 2: Either no return data (USDT) OR returned true
        if (returndata.length > 0) {
            require(
                abi.decode(returndata, (bool)),
                "SafeERC20: operation did not succeed"
            );
        }
        // If returndata.length == 0, we accept it (handles USDT)
    }
}`}
            language="solidity"
            filename="SafeERC20Explained.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🔍 What SafeERC20 Handles</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-white">Token Behavior</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Returns true on success
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Returns false on failure (reverts it)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Returns nothing/void (USDT)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Reverts on failure (passes through)
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-white">Special Handling</h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    USDT approve(0) requirement
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Missing return data decoding
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    Low-level call failure detection
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-lime-400">✓</span>
                    forceApprove for race condition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testing">
          <h2>Testing for Unchecked Returns</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SafeVault.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Mock token that returns false instead of reverting
contract FalseReturningToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        if (balanceOf[msg.sender] < amount) {
            return false;  // 💀 Returns false instead of reverting!
        }
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        if (balanceOf[from] < amount || allowance[from][msg.sender] < amount) {
            return false;  // 💀 Silent failure
        }
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }
}

// Mock token that returns no data (like USDT)
contract NoReturnToken {
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }
    
    // Notice: no return value!
    function transfer(address to, uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
    }
    
    function transferFrom(address from, address to, uint256 amount) external {
        require(balanceOf[from] >= amount, "Insufficient");
        require(allowance[from][msg.sender] >= amount, "No allowance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;
    }
    
    function approve(address spender, uint256 amount) external {
        allowance[msg.sender][spender] = amount;
    }
}

contract UncheckedReturnTest is Test {
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    
    // ===== Test: Vulnerable vault with false-returning token =====
    
    function test_VulnerableVaultFreeDeposit() public {
        FalseReturningToken token = new FalseReturningToken();
        
        // Alice has 0 tokens but tries to deposit
        // With unchecked return, deposit is credited for free!
        
        // Simulating the vulnerable pattern:
        uint256 depositAmount = 1000;
        
        vm.prank(alice);
        bool success = token.transferFrom(alice, address(this), depositAmount);
        
        // Transfer returned false (failed), but if unchecked...
        assertFalse(success);  // ← This is what you'd miss!
        
        // Vulnerable vault would still credit: deposits[alice] += 1000
        // Alice got free tokens in the vault!
    }
    
    // ===== Test: SafeERC20 catches false returns =====
    
    function test_SafeVaultRejectsFailedTransfer() public {
        FalseReturningToken token = new FalseReturningToken();
        SafeVault vault = new SafeVault(address(token));
        
        // Alice has 0 tokens
        vm.prank(alice);
        
        // SafeERC20 will catch the false return and revert
        vm.expectRevert();
        vault.deposit(1000);
        
        // ✅ No free deposits!
        assertEq(vault.deposits(alice), 0);
    }
    
    // ===== Test: No-return token (USDT style) =====
    
    function test_NoReturnTokenWorksWithSafeERC20() public {
        NoReturnToken token = new NoReturnToken();
        
        // SafeERC20 handles tokens that return nothing
        token.mint(alice, 1000);
        
        // Using SafeERC20 via the vault
        SafeVault vault = new SafeVault(address(token));
        
        vm.startPrank(alice);
        // Need to approve first (NoReturnToken style)
        token.approve(address(vault), 1000);
        
        // This works even though transfer returns nothing
        vault.deposit(500);
        vm.stopPrank();
        
        assertEq(vault.deposits(alice), 500);
    }
    
    // ===== Test: Unchecked ETH send =====
    
    function test_UncheckedETHSend() public {
        // Contract that rejects ETH
        RejectETH rejecter = new RejectETH();
        
        vm.deal(address(this), 1 ether);
        
        // .send() returns false when recipient rejects
        bool sent = payable(address(rejecter)).send(1 ether);
        assertFalse(sent);  // ← Must check this!
        
        // .call() also returns false
        (bool success,) = payable(address(rejecter)).call{value: 1 ether}("");
        assertFalse(success);  // ← Must check this too!
        
        // ETH is still in this contract
        assertEq(address(this).balance, 1 ether);
    }
}

contract RejectETH {
    // No receive() or fallback() — rejects all ETH
}`}
            language="solidity"
            filename="UncheckedReturnTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ Detection Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">slither . --detect unchecked-transfer,unchecked-send,unchecked-lowlevel</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Mythril</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">myth analyze Contract.sol</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Weird ERC-20s (Testing)</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">forge install d-xo/weird-erc20</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Aderyn</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">aderyn .</code>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ Return Value Safety Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Using SafeERC20 for all token interactions',
              'All .call() return values checked with require()',
              'Never using unchecked .send() for ETH transfers',
              'Using forceApprove() for approve operations',
              'Tested with non-standard tokens (USDT, BNB)',
              'Tested with false-returning tokens',
              'Tested with no-return-data tokens',
              'Running Slither unchecked-transfer detector',
              'Fee-on-transfer tokens accounted for',
              'Batch operations handle individual failures',
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

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400">Method</th>
                  <th className="text-left py-3 px-4 text-gray-400">Returns</th>
                  <th className="text-left py-3 px-4 text-gray-400">On Failure</th>
                  <th className="text-left py-3 px-4 text-gray-400">Safe?</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">.call&#123;&#125;()</td>
                  <td className="py-3 px-4">(bool, bytes)</td>
                  <td className="py-3 px-4">Returns false</td>
                  <td className="py-3 px-4 text-yellow-400">Check required</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">.send()</td>
                  <td className="py-3 px-4">bool</td>
                  <td className="py-3 px-4">Returns false</td>
                  <td className="py-3 px-4 text-yellow-400">Check required</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">.transfer()</td>
                  <td className="py-3 px-4">void</td>
                  <td className="py-3 px-4">Reverts</td>
                  <td className="py-3 px-4 text-lime-400">Auto-reverts</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-mono text-xs">IERC20.transfer()</td>
                  <td className="py-3 px-4">bool</td>
                  <td className="py-3 px-4">Returns false or reverts</td>
                  <td className="py-3 px-4 text-yellow-400">Use SafeERC20</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs">safeTransfer()</td>
                  <td className="py-3 px-4">void</td>
                  <td className="py-3 px-4">Reverts</td>
                  <td className="py-3 px-4 text-lime-400">✅ Recommended</td>
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
              {['Return Values', 'External Calls', 'SafeERC20', 'USDT', 'Error Handling', 'Solidity'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">External call risks and CEI pattern</p>
            </Link>
            <Link href="/learn/vulnerabilities/denial-of-service" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Denial of Service Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Failed external calls causing DoS</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🔍 Does Your Protocol Handle Token Edge Cases?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Unchecked return values are one of the most common findings in smart contract 
            audits. Our team tests with every known weird ERC-20 behavior to make sure 
            your protocol is battle-tested.
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
