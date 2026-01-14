'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

// This is a sample article page - In production, you'd fetch content from a CMS or MDX files
export default function ReentrancyAttackPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Reentrancy Attacks' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            Critical Severity
          </span>
        </div>
        
        <h1>Understanding Reentrancy Attacks</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            10 min read
          </span>
          <span>•</span>
          <span>Updated Dec 15, 2024</span>
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
          <li><a href="#what-is-reentrancy" className="toc-link hover:text-lime-400">What is Reentrancy?</a></li>
          <li><a href="#how-it-works" className="toc-link hover:text-lime-400">How the Attack Works</a></li>
          <li><a href="#real-world-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Techniques</a></li>
          <li><a href="#code-examples" className="toc-link hover:text-lime-400">Code Examples</a></li>
          <li><a href="#tools" className="toc-link hover:text-lime-400">Detection Tools</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-is-reentrancy">
          <h2>What is Reentrancy?</h2>
          <p>
            A reentrancy attack occurs when a malicious contract exploits the fact that external calls
            can transfer control to an untrusted contract, which can then call back into the vulnerable
            contract before the first execution is complete.
          </p>
          <p>
            This happens because Solidity allows external calls during function execution, and if state
            changes happen after the external call, an attacker can manipulate the contract state.
          </p>

          <AlertBox type="danger" title="Historical Impact">
            The most famous reentrancy attack was the DAO hack in 2016, which resulted in the loss of
            3.6 million ETH (worth ~$60M at the time) and led to the Ethereum hard fork.
          </AlertBox>
        </section>

        <section id="how-it-works">
          <h2>How the Attack Works</h2>
          <p>
            The attack follows this general pattern:
          </p>
          <ol>
            <li>Attacker calls a vulnerable <code>withdraw()</code> function</li>
            <li>The contract sends ETH to the attacker before updating state</li>
            <li>Attacker's <code>receive()</code> or <code>fallback()</code> function is triggered</li>
            <li>Attacker re-enters the <code>withdraw()</code> function</li>
            <li>Since state wasn't updated, the check passes again</li>
            <li>Process repeats until funds are drained</li>
          </ol>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <h4 className="text-red-400 font-semibold mb-3">🔄 Attack Flow</h4>
            <div className="font-mono text-sm text-gray-300 space-y-1">
              <p>1. Attacker → withdraw() → sends ETH</p>
              <p>2. ETH transfer → triggers receive()</p>
              <p>3. receive() → calls withdraw() again</p>
              <p>4. Balance not updated → withdraw succeeds</p>
              <p>5. Repeat until contract is drained</p>
            </div>
          </div>
        </section>

        <section id="real-world-examples">
          <h2>Real-World Examples</h2>
          
          <div className="grid gap-4 my-6">
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">⟠</span>
                <h4 className="font-semibold text-white">The DAO Hack (2016)</h4>
              </div>
              <p className="text-sm text-gray-400">
                $60M lost due to reentrancy in the splitDAO function. Led to the ETH/ETC fork.
              </p>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔴</span>
                <h4 className="font-semibold text-white">Curve Finance (2023)</h4>
              </div>
              <p className="text-sm text-gray-400">
                $70M lost due to a Vyper compiler bug that broke reentrancy guards.
              </p>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🦊</span>
                <h4 className="font-semibold text-white">Grim Finance (2021)</h4>
              </div>
              <p className="text-sm text-gray-400">
                $30M lost through reentrancy in the depositFor function.
              </p>
            </div>
          </div>
        </section>

        <section id="prevention">
          <h2>Prevention Techniques</h2>

          <h3>1. Checks-Effects-Interactions Pattern (CEI)</h3>
          <p>
            The most fundamental defense. Always follow this order:
          </p>
          <ul>
            <li><strong>Checks:</strong> Validate all conditions and inputs first</li>
            <li><strong>Effects:</strong> Update all state variables</li>
            <li><strong>Interactions:</strong> Make external calls last</li>
          </ul>

          <h3>2. Reentrancy Guards</h3>
          <p>
            Use OpenZeppelin's <code>ReentrancyGuard</code> modifier or implement your own mutex lock:
          </p>

          <CodeBlock
            code={`import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureVault is ReentrancyGuard {
    mapping(address => uint256) public balances;
    
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient");
        
        // Effects before interactions
        balances[msg.sender] -= amount;
        
        // Interaction last
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`}
            language="solidity"
            filename="SecureVault.sol"
          />

          <h3>3. Pull Over Push Pattern</h3>
          <p>
            Instead of sending ETH to users, let them withdraw. This limits the attack surface.
          </p>

          <AlertBox type="success" title="Best Practice">
            Combine multiple techniques: CEI pattern + ReentrancyGuard + Pull payments for maximum security.
          </AlertBox>
        </section>

        <section id="code-examples">
          <h2>Code Examples</h2>
          <p>
            Let's compare vulnerable code with its secure counterpart:
          </p>

          <CodeComparison
            vulnerable={{
              title: 'Vulnerable Code',
              code: `function withdraw() external {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "No balance");
    
    // ❌ External call BEFORE state update
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");
    
    // ❌ State updated AFTER external call
    balances[msg.sender] = 0;
}`
            }}
            secure={{
              title: 'Secure Code',
              code: `function withdraw() external nonReentrant {
    uint256 balance = balances[msg.sender];
    require(balance > 0, "No balance");
    
    // ✅ State updated BEFORE external call
    balances[msg.sender] = 0;
    
    // ✅ External call AFTER state update
    (bool success, ) = msg.sender.call{value: balance}("");
    require(success, "Transfer failed");
}`
            }}
          />
        </section>

        <section id="tools">
          <h2>Detection Tools</h2>
          <p>
            Use these tools to detect reentrancy vulnerabilities in your code:
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">🔧 Slither</h4>
              <p className="text-sm text-gray-400 mb-2">
                Static analysis framework that detects reentrancy patterns.
              </p>
              <code className="text-xs text-gray-500">slither . --detect reentrancy-eth</code>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">🔧 Mythril</h4>
              <p className="text-sm text-gray-400 mb-2">
                Symbolic execution tool for deep vulnerability analysis.
              </p>
              <code className="text-xs text-gray-500">myth analyze contract.sol</code>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">🔧 Foundry</h4>
              <p className="text-sm text-gray-400 mb-2">
                Write reentrancy tests with invariant testing.
              </p>
              <code className="text-xs text-gray-500">forge test --match-test testReentrancy</code>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">🔧 Hexific Audit</h4>
              <p className="text-sm text-gray-400 mb-2">
                AI-powered automated audit with manual review.
              </p>
              <Link href="/" className="text-xs text-lime-400 hover:underline">Get a free audit →</Link>
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
              {['Reentrancy', 'Solidity', 'DeFi', 'CEI Pattern', 'Security'].map((tag) => (
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
              <p className="text-sm text-gray-500 mt-1">Understanding flash loan exploits in DeFi</p>
            </Link>
            <Link href="/learn/vulnerabilities/access-control-vulnerabilities" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Access Control Vulnerabilities</h4>
              <p className="text-sm text-gray-500 mt-1">Common authorization mistakes</p>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
