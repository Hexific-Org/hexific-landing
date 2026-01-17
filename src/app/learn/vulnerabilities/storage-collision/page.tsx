'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function StorageCollisionPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Storage Collision in Proxies' },
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
        
        <h1>Storage Collision in Proxies</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          Understanding storage layout issues in upgradeable contracts and how improper 
          slot management can lead to catastrophic data corruption and fund losses.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            11 min read
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
          <div className="text-2xl font-bold text-red-400">$500M+</div>
          <div className="text-xs text-gray-500">At Risk in Proxies</div>
        </div>
        <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-purple-400">80%+</div>
          <div className="text-xs text-gray-500">DeFi Uses Proxies</div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-400">EIP-1967</div>
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
          <li><a href="#what-are-proxies" className="toc-link hover:text-lime-400">What are Proxy Contracts?</a></li>
          <li><a href="#storage-layout" className="toc-link hover:text-lime-400">Understanding Storage Layout</a></li>
          <li><a href="#collision-types" className="toc-link hover:text-lime-400">Types of Storage Collisions</a></li>
          <li><a href="#proxy-impl-collision" className="toc-link hover:text-lime-400">Proxy-Implementation Collision</a></li>
          <li><a href="#upgrade-collision" className="toc-link hover:text-lime-400">Upgrade Storage Collision</a></li>
          <li><a href="#inheritance-collision" className="toc-link hover:text-lime-400">Inheritance Order Issues</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#eip1967" className="toc-link hover:text-lime-400">EIP-1967: Standard Storage Slots</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for Storage Collisions</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-are-proxies">
          <h2>What are Proxy Contracts?</h2>
          <p>
            Proxy contracts enable upgradeability in Ethereum by separating storage (proxy) 
            from logic (implementation). The proxy delegates all calls to an implementation 
            contract using <code>delegatecall</code>, allowing the logic to be upgraded while 
            preserving the contract's address and state.
          </p>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🔄 How Proxy Delegation Works</h4>
            <div className="space-y-3">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📦</span>
                  <div>
                    <h5 className="font-medium text-blue-400">Proxy Contract</h5>
                    <p className="text-sm text-gray-400">Holds storage, receives calls, delegates to implementation</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <h5 className="font-medium text-purple-400">Implementation Contract</h5>
                    <p className="text-sm text-gray-400">Contains logic, executes in proxy's storage context</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <span className="text-sm text-yellow-400">
                ⚠️ <strong>Key insight:</strong> When using delegatecall, the implementation's 
                code runs but reads/writes the proxy's storage!
              </span>
            </div>
          </div>

          <AlertBox type="info" title="Common Proxy Patterns">
            <ul className="mt-2 space-y-1 text-sm">
              <li>• <strong>Transparent Proxy:</strong> Admin calls go to proxy, user calls go to implementation</li>
              <li>• <strong>UUPS:</strong> Upgrade logic lives in implementation contract</li>
              <li>• <strong>Beacon Proxy:</strong> Multiple proxies share one implementation via beacon</li>
              <li>• <strong>Diamond (EIP-2535):</strong> Multiple implementations (facets) in one proxy</li>
            </ul>
          </AlertBox>
        </section>

        <section id="storage-layout">
          <h2>Understanding Storage Layout</h2>
          <p>
            Solidity stores contract state variables in 32-byte slots sequentially. 
            Understanding this layout is critical for proxy safety:
          </p>

          <CodeBlock
            code={`// Storage Layout Example
contract Example {
    uint256 a;      // Slot 0
    uint256 b;      // Slot 1
    address owner;  // Slot 2 (20 bytes, but occupies full slot)
    bool active;    // Slot 3
    
    // Mappings and dynamic arrays use different slot calculation
    mapping(address => uint256) balances;  // Slot 4 (base slot)
    // Actual data at: keccak256(key . slot)
    
    uint256[] data; // Slot 5 (stores length)
    // Actual data at: keccak256(slot) + index
}

// Storage visualization:
// ┌────────┬─────────────────────────────────────┐
// │ Slot 0 │ a (uint256)                         │
// ├────────┼─────────────────────────────────────┤
// │ Slot 1 │ b (uint256)                         │
// ├────────┼─────────────────────────────────────┤
// │ Slot 2 │ owner (address - 20 bytes)          │
// ├────────┼─────────────────────────────────────┤
// │ Slot 3 │ active (bool - 1 byte)              │
// ├────────┼─────────────────────────────────────┤
// │ Slot 4 │ balances mapping (base)             │
// ├────────┼─────────────────────────────────────┤
// │ Slot 5 │ data.length                         │
// └────────┴─────────────────────────────────────┘`}
            language="solidity"
            filename="StorageLayout.sol"
          />

          <div className="my-6 p-5 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-red-400 mb-3">💥 The Collision Problem</h4>
            <p className="text-sm text-gray-400">
              When a proxy and its implementation both declare variables at the same slot, 
              they overwrite each other's data. This is because <code>delegatecall</code> 
              uses the proxy's storage but the implementation's code.
            </p>
          </div>
        </section>

        <section id="collision-types">
          <h2>Types of Storage Collisions</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💥</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">1. Proxy-Implementation Collision</h4>
                  <p className="text-sm text-gray-400">
                    The proxy's admin/implementation storage variables collide with the 
                    implementation's state variables at the same slots.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Most Dangerous</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">EIP-1967 Fixes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔄</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">2. Upgrade Storage Collision</h4>
                  <p className="text-sm text-gray-400">
                    When upgrading, the new implementation has a different storage layout 
                    than the previous version, corrupting existing data.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">Common Mistake</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Version Issues</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">3. Inheritance Order Collision</h4>
                  <p className="text-sm text-gray-400">
                    Changing the order of inherited contracts changes the storage layout, 
                    causing variables to shift to different slots.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Subtle Bug</span>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Inheritance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📝</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">4. Variable Type Change Collision</h4>
                  <p className="text-sm text-gray-400">
                    Changing a variable's type (e.g., uint128 to uint256) can shift 
                    subsequent variables to different slots.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Type Safety</span>
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Packing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proxy-impl-collision">
          <h2>Proxy-Implementation Collision Deep Dive</h2>
          <p>
            The classic storage collision occurs when the proxy stores its own state 
            (like the implementation address) at slots that the implementation also uses.
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">💥 Collision Visualization</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-black/30 rounded-lg">
                <h5 className="text-sm font-medium text-blue-400 mb-3">Proxy Storage (What Proxy Thinks)</h5>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span className="text-gray-400">Slot 0:</span>
                    <span className="text-red-400">implementation ← COLLISION!</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span className="text-gray-400">Slot 1:</span>
                    <span className="text-red-400">admin ← COLLISION!</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-black/30 rounded-lg">
                <h5 className="text-sm font-medium text-purple-400 mb-3">Implementation (What Code Expects)</h5>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span className="text-gray-400">Slot 0:</span>
                    <span className="text-red-400">owner ← COLLISION!</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span className="text-gray-400">Slot 1:</span>
                    <span className="text-red-400">totalSupply ← COLLISION!</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
              <span className="text-sm text-red-400 font-medium">
                Result: Reading "owner" returns the implementation address! 
                Writing to "owner" corrupts the proxy's implementation pointer!
              </span>
            </div>
          </div>

          <CodeBlock
            code={`// 🚨 VULNERABLE: Classic storage collision
contract VulnerableProxy {
    address public implementation;  // Slot 0
    address public admin;           // Slot 1
    
    fallback() external payable {
        (bool success,) = implementation.delegatecall(msg.data);
        require(success);
    }
}

contract Implementation {
    address public owner;      // Slot 0 - COLLIDES with implementation!
    uint256 public totalSupply; // Slot 1 - COLLIDES with admin!
    
    function initialize(address _owner) external {
        owner = _owner;  // 💥 This OVERWRITES the proxy's implementation address!
        // Proxy is now bricked - delegatecall will call random address
    }
}`}
            language="solidity"
            filename="VulnerableProxy.sol"
          />

          <AlertBox type="danger" title="Complete Contract Failure">
            If the implementation address is overwritten, the proxy becomes unusable. 
            All funds and state are permanently locked or controlled by whoever controls 
            the corrupted address.
          </AlertBox>
        </section>

        <section id="upgrade-collision">
          <h2>Upgrade Storage Collision</h2>
          <p>
            Even with proper proxy-implementation separation, upgrading to a new 
            implementation with a different storage layout causes data corruption.
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold">V1</span>
              <div>
                <h4 className="font-semibold text-green-400">Implementation V1 (Original)</h4>
                <code className="text-xs text-gray-400 block mt-1">
                  Slot 0: owner | Slot 1: totalSupply | Slot 2: balances
                </code>
              </div>
            </div>

            <div className="flex justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">V2</span>
              <div>
                <h4 className="font-semibold text-red-400">Implementation V2 (BROKEN!) 💥</h4>
                <code className="text-xs text-gray-400 block mt-1">
                  Slot 0: <span className="text-red-400">paused (NEW!)</span> | Slot 1: owner | Slot 2: totalSupply
                </code>
                <p className="text-xs text-red-400 mt-2">
                  Adding "paused" at the beginning shifted everything! Now "owner" reads "totalSupply" value!
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// Implementation V1
contract TokenV1 {
    address public owner;        // Slot 0
    uint256 public totalSupply;  // Slot 1
    mapping(address => uint256) public balances;  // Slot 2
}

// 🚨 VULNERABLE: Implementation V2 - WRONG WAY
contract TokenV2 {
    bool public paused;          // Slot 0 - NEW! Shifts everything!
    address public owner;        // Slot 1 - Was at slot 0!
    uint256 public totalSupply;  // Slot 2 - Was at slot 1!
    mapping(address => uint256) public balances;  // Slot 3 - Was at slot 2!
    
    // After upgrade:
    // - "paused" will be true/false based on low bytes of old owner address
    // - "owner" will be garbage (the old totalSupply value)
    // - "totalSupply" will be the base slot of old balances mapping
    // - All balances are effectively lost (wrong mapping base)
}

// ✅ CORRECT: Implementation V2
contract TokenV2Safe {
    address public owner;        // Slot 0 - SAME
    uint256 public totalSupply;  // Slot 1 - SAME
    mapping(address => uint256) public balances;  // Slot 2 - SAME
    bool public paused;          // Slot 3 - NEW! Added at the end
}`}
            language="solidity"
            filename="UpgradeCollision.sol"
          />
        </section>

        <section id="inheritance-collision">
          <h2>Inheritance Order Issues</h2>
          <p>
            Solidity linearizes inheritance using C3 linearization. Changing the order 
            of parent contracts changes where their variables are stored.
          </p>

          <CodeBlock
            code={`// Base contracts
contract Ownable {
    address public owner;  // Will be at some slot
}

contract Pausable {
    bool public paused;    // Will be at some slot
}

// 🚨 V1: Ownable first
contract TokenV1 is Ownable, Pausable {
    uint256 public totalSupply;
    // Storage layout:
    // Slot 0: owner (from Ownable)
    // Slot 1: paused (from Pausable)  
    // Slot 2: totalSupply
}

// 🚨 V2: Pausable first - BREAKS EVERYTHING!
contract TokenV2 is Pausable, Ownable {
    uint256 public totalSupply;
    // Storage layout:
    // Slot 0: paused (from Pausable) - WAS owner!
    // Slot 1: owner (from Ownable) - WAS paused!
    // Slot 2: totalSupply
    
    // Result: owner and paused are SWAPPED!
    // If old owner was 0x1234...5678 (nonzero), paused is now "true"
    // owner is now address(0) or address(1) depending on old paused value
}`}
            language="solidity"
            filename="InheritanceCollision.sol"
          />

          <AlertBox type="warning" title="Diamond Inheritance Complexity">
            With diamond inheritance (multiple parents sharing grandparents), the 
            linearization becomes even more complex. Always verify storage layout 
            with tools like <code>hardhat-storage-layout</code>.
          </AlertBox>
        </section>

        <section id="real-examples">
          <h2>Real-World Examples</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Audius - $6M Governance Takeover</h4>
                <span className="text-xs text-gray-500">July 2022</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                A storage collision between the proxy and implementation allowed an attacker 
                to call the initialization function multiple times. They gained governance 
                control and transferred $6M worth of AUDIO tokens.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Storage Collision</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Governance</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Re-initialization</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Wormhole - Near Miss</h4>
                <span className="text-xs text-gray-500">2022</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Security researchers discovered that Wormhole's proxy could have been 
                compromised via storage collision during an upgrade. The issue was found 
                before exploitation.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Upgrade Risk</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Caught Early</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Furucombo - Proxy Initialization</h4>
                <span className="text-xs text-gray-500">February 2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                While primarily an uninitialized proxy attack, the exploit leveraged 
                understanding of proxy storage to gain control of the implementation 
                and steal $15M.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Uninitialized</span>
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">$15M Lost</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">OpenZeppelin UUPS Vulnerability</h4>
                <span className="text-xs text-gray-500">September 2021</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                A critical vulnerability was discovered in OpenZeppelin's UUPS implementation 
                that could allow storage collision attacks on uninitialized proxies. 
                Emergency patches were released.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">UUPS</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">Patched</span>
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>
          
          <h3>❌ Pattern 1: No Storage Gap in Base Contracts</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: No storage gap
contract BaseV1 {
    address public owner;
    uint256 public value;
    // No gap! If we add variables in V2, child contracts break
}

contract ChildV1 is BaseV1 {
    uint256 public childValue;  // Slot 2
}

// After upgrading BaseV1 to add a variable:
contract BaseV2 {
    address public owner;
    uint256 public value;
    bool public paused;  // NEW - slot 2
    // 💥 childValue was at slot 2, now paused is there!
}

// ✅ CORRECT: Use storage gaps
contract BaseV1Safe {
    address public owner;
    uint256 public value;
    
    // Reserve 50 slots for future upgrades
    uint256[50] private __gap;
}

contract BaseV2Safe {
    address public owner;
    uint256 public value;
    bool public paused;  // Uses one gap slot
    
    uint256[49] private __gap;  // Reduce gap by 1
}`}
            language="solidity"
            filename="StorageGap.sol"
          />

          <h3>❌ Pattern 2: Non-Standard Proxy Slot Usage</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Implementation stored at slot 0
contract BadProxy {
    address implementation;  // Slot 0 - will collide!
    
    fallback() external payable {
        address impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}

// 💥 Any implementation with slot 0 variables will break:
contract VictimImplementation {
    address public owner;  // Slot 0 - COLLIDES with implementation!
    
    function setOwner(address _owner) external {
        owner = _owner;  // Overwrites proxy's implementation pointer!
    }
}`}
            language="solidity"
            filename="BadProxy.sol"
          />

          <h3>❌ Pattern 3: Changing Variable Types</h3>
          <CodeBlock
            code={`// V1: Uses packed storage
contract TokenV1 {
    address public owner;     // Slot 0 (20 bytes)
    uint96 public totalSupply; // Slot 0 (12 bytes) - packed with owner
    uint256 public maxSupply;  // Slot 1
}

// 🚨 V2: Changed type size - BREAKS LAYOUT!
contract TokenV2 {
    address public owner;      // Slot 0 (20 bytes)
    uint256 public totalSupply; // Slot 1 - WAS packed in slot 0!
    uint256 public maxSupply;   // Slot 2 - WAS at slot 1!
    
    // totalSupply now reads garbage (old slot 1 value)
    // maxSupply is lost
}`}
            language="solidity"
            filename="TypeChange.sol"
          />
        </section>

        <section id="eip1967">
          <h2>EIP-1967: Standard Storage Slots</h2>
          <p>
            EIP-1967 defines standard slots for proxy storage that are virtually 
            impossible to collide with normal contract storage:
          </p>

          <div className="my-8 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-4">🛡️ EIP-1967 Standard Slots</h4>
            <div className="space-y-3">
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <code className="text-lime-400 text-sm">Implementation:</code>
                  <code className="text-xs text-gray-400 break-all">
                    keccak256("eip1967.proxy.implementation") - 1
                  </code>
                </div>
                <code className="text-xs text-gray-500 block mt-1">
                  = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
                </code>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <code className="text-purple-400 text-sm">Admin:</code>
                  <code className="text-xs text-gray-400 break-all">
                    keccak256("eip1967.proxy.admin") - 1
                  </code>
                </div>
                <code className="text-xs text-gray-500 block mt-1">
                  = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103
                </code>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <code className="text-blue-400 text-sm">Beacon:</code>
                  <code className="text-xs text-gray-400 break-all">
                    keccak256("eip1967.proxy.beacon") - 1
                  </code>
                </div>
                <code className="text-xs text-gray-500 block mt-1">
                  = 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50
                </code>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// ✅ SECURE: EIP-1967 Compliant Proxy
contract EIP1967Proxy {
    // Standard slot for implementation address
    bytes32 private constant IMPLEMENTATION_SLOT = 
        bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1);
    
    // Standard slot for admin address  
    bytes32 private constant ADMIN_SLOT = 
        bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1);
    
    constructor(address implementation, address admin) {
        _setImplementation(implementation);
        _setAdmin(admin);
    }
    
    function _setImplementation(address newImplementation) private {
        require(newImplementation.code.length > 0, "Not a contract");
        
        assembly {
            sstore(IMPLEMENTATION_SLOT, newImplementation)
        }
    }
    
    function _getImplementation() internal view returns (address impl) {
        assembly {
            impl := sload(IMPLEMENTATION_SLOT)
        }
    }
    
    function _setAdmin(address newAdmin) private {
        assembly {
            sstore(ADMIN_SLOT, newAdmin)
        }
    }
    
    fallback() external payable {
        address impl = _getImplementation();
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`}
            language="solidity"
            filename="EIP1967Proxy.sol"
          />
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📦</span>
                <h4 className="font-semibold text-lime-400">Use OpenZeppelin</h4>
              </div>
              <p className="text-sm text-gray-400">
                OpenZeppelin's proxy contracts (TransparentUpgradeableProxy, UUPSUpgradeable) 
                are battle-tested and EIP-1967 compliant.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📏</span>
                <h4 className="font-semibold text-lime-400">Storage Gaps</h4>
              </div>
              <p className="text-sm text-gray-400">
                Always include <code>uint256[50] private __gap;</code> in upgradeable 
                base contracts to reserve space for future variables.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">➕</span>
                <h4 className="font-semibold text-lime-400">Append-Only Variables</h4>
              </div>
              <p className="text-sm text-gray-400">
                Only add new state variables at the end of contracts. Never insert, 
                remove, or reorder existing variables.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔒</span>
                <h4 className="font-semibold text-lime-400">Lock Inheritance Order</h4>
              </div>
              <p className="text-sm text-gray-400">
                Never change the order of inherited contracts. Document the required 
                order in comments.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📊</span>
                <h4 className="font-semibold text-lime-400">Verify Layout</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use <code>hardhat-storage-layout</code> or <code>forge inspect</code> 
                to verify storage layout before and after upgrades.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔧</span>
                <h4 className="font-semibold text-lime-400">Upgrade Plugins</h4>
              </div>
              <p className="text-sm text-gray-400">
                Use @openzeppelin/hardhat-upgrades or foundry-upgrades which 
                automatically validate storage compatibility.
              </p>
            </div>
          </div>

          <h3>✅ Secure Upgradeable Contract Pattern</h3>
          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TokenV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    // ✅ State variables for V1
    uint256 public totalSupply;
    mapping(address => uint256) public balances;
    
    // ✅ Storage gap for future upgrades
    uint256[48] private __gap;
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();  // ✅ Prevent implementation initialization
    }
    
    function initialize(address owner_) external initializer {
        __Ownable_init(owner_);
        __UUPSUpgradeable_init();
    }
    
    function _authorizeUpgrade(address) internal override onlyOwner {}
    
    function mint(address to, uint256 amount) external onlyOwner {
        totalSupply += amount;
        balances[to] += amount;
    }
}

// ✅ V2: Correctly adds new variable at the end
contract TokenV2 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    // ✅ SAME as V1 - DO NOT CHANGE ORDER
    uint256 public totalSupply;
    mapping(address => uint256) public balances;
    
    // ✅ NEW variable added at the end (uses 1 gap slot)
    bool public paused;
    
    // ✅ Reduced gap by 1
    uint256[47] private __gap;
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize(address owner_) external initializer {
        __Ownable_init(owner_);
        __UUPSUpgradeable_init();
    }
    
    function _authorizeUpgrade(address) internal override onlyOwner {}
    
    modifier whenNotPaused() {
        require(!paused, "Paused");
        _;
    }
    
    function mint(address to, uint256 amount) external onlyOwner whenNotPaused {
        totalSupply += amount;
        balances[to] += amount;
    }
    
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }
}`}
            language="solidity"
            filename="SecureUpgradeable.sol"
          />
        </section>

        <section id="testing">
          <h2>Testing for Storage Collisions</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/TokenV1.sol";
import "../src/TokenV2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract StorageCollisionTest is Test {
    TokenV1 implementationV1;
    TokenV2 implementationV2;
    ERC1967Proxy proxy;
    TokenV1 tokenV1;
    TokenV2 tokenV2;
    
    address owner = makeAddr("owner");
    address user = makeAddr("user");
    
    function setUp() public {
        implementationV1 = new TokenV1();
        
        bytes memory initData = abi.encodeCall(TokenV1.initialize, (owner));
        proxy = new ERC1967Proxy(address(implementationV1), initData);
        
        tokenV1 = TokenV1(address(proxy));
    }
    
    // ✅ Test: V1 state is preserved after V2 upgrade
    function test_UpgradePreservesState() public {
        // Setup V1 state
        vm.prank(owner);
        tokenV1.mint(user, 1000);
        
        assertEq(tokenV1.totalSupply(), 1000);
        assertEq(tokenV1.balances(user), 1000);
        
        // Upgrade to V2
        implementationV2 = new TokenV2();
        vm.prank(owner);
        tokenV1.upgradeToAndCall(address(implementationV2), "");
        
        tokenV2 = TokenV2(address(proxy));
        
        // ✅ Verify state is preserved
        assertEq(tokenV2.totalSupply(), 1000, "totalSupply corrupted");
        assertEq(tokenV2.balances(user), 1000, "balances corrupted");
        
        // ✅ New functionality works
        assertEq(tokenV2.paused(), false, "paused should be false");
    }
    
    // ✅ Test: Storage slots match between versions
    function test_StorageLayoutCompatibility() public {
        // Read V1 storage slots
        bytes32 slot0V1 = vm.load(address(proxy), bytes32(uint256(0)));
        bytes32 slot1V1 = vm.load(address(proxy), bytes32(uint256(1)));
        
        // Upgrade
        implementationV2 = new TokenV2();
        vm.prank(owner);
        tokenV1.upgradeToAndCall(address(implementationV2), "");
        
        // Read same slots after upgrade
        bytes32 slot0V2 = vm.load(address(proxy), bytes32(uint256(0)));
        bytes32 slot1V2 = vm.load(address(proxy), bytes32(uint256(1)));
        
        // ✅ Slots should be unchanged
        assertEq(slot0V1, slot0V2, "Slot 0 changed after upgrade");
        assertEq(slot1V1, slot1V2, "Slot 1 changed after upgrade");
    }
    
    // ✅ Test: EIP-1967 slots are used correctly
    function test_EIP1967Compliance() public {
        bytes32 implSlot = bytes32(uint256(
            keccak256("eip1967.proxy.implementation")
        ) - 1);
        
        bytes32 storedImpl = vm.load(address(proxy), implSlot);
        
        assertEq(
            address(uint160(uint256(storedImpl))),
            address(implementationV1),
            "Implementation not at EIP-1967 slot"
        );
    }
    
    // ✅ Fuzz: Storage reads are consistent
    function testFuzz_StorageConsistency(uint256 mintAmount) public {
        vm.assume(mintAmount > 0 && mintAmount < type(uint128).max);
        
        vm.prank(owner);
        tokenV1.mint(user, mintAmount);
        
        // Upgrade
        implementationV2 = new TokenV2();
        vm.prank(owner);
        tokenV1.upgradeToAndCall(address(implementationV2), "");
        tokenV2 = TokenV2(address(proxy));
        
        // Values should match
        assertEq(tokenV2.totalSupply(), mintAmount);
        assertEq(tokenV2.balances(user), mintAmount);
    }
}`}
            language="solidity"
            filename="StorageCollisionTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ Storage Analysis Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Foundry</h5>
                <code className="text-xs text-gray-400 block">forge inspect Contract storage-layout</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Hardhat</h5>
                <code className="text-xs text-gray-400 block">npx hardhat storage-layout</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">OZ Upgrades Plugin</h5>
                <code className="text-xs text-gray-400 block">validateUpgrade()</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither</h5>
                <code className="text-xs text-gray-400 block">slither . --print variable-order</code>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ Proxy Storage Safety Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Using EIP-1967 compliant proxy (OZ or verified)',
              'Storage gaps in all upgradeable base contracts',
              'New variables only added at end of contract',
              'Inheritance order never changed between versions',
              'Variable types never changed (especially packed)',
              'Storage layout verified with tooling before upgrade',
              'Upgrade tested on fork/testnet first',
              'Using OZ upgrades plugin for validation',
              'Implementation properly initialized',
              '_disableInitializers() in implementation constructor',
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
              <h4 className="text-sm font-semibold text-red-400 mb-2">🚫 Never Do</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Insert variables in the middle</li>
                <li>• Remove or rename variables</li>
                <li>• Change variable types</li>
                <li>• Reorder inherited contracts</li>
                <li>• Store proxy data at slot 0</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-lime-400 mb-2">✅ Always Do</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use EIP-1967 slots</li>
                <li>• Include storage gaps</li>
                <li>• Append new variables only</li>
                <li>• Test upgrades on fork</li>
                <li>• Verify layout with tools</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-purple-400 mb-2">🔧 Tools</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• @openzeppelin/upgrades</li>
                <li>• hardhat-storage-layout</li>
                <li>• forge inspect</li>
                <li>• slither variable-order</li>
                <li>• foundry-upgrades</li>
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
              {['Proxy', 'Storage', 'Upgradeable', 'EIP-1967', 'UUPS', 'Smart Contract Security'].map((tag) => (
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
              <p className="text-sm text-gray-500 mt-1">Upgrade authorization issues</p>
            </Link>
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">Another critical contract vulnerability</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Planning a Contract Upgrade?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Storage collisions are one of the most dangerous vulnerabilities in upgradeable 
            contracts. Our auditors specialize in proxy patterns and have prevented 
            countless storage corruption issues.
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
