'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function GasOptimizationSecurityPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Gas Optimization Without Compromising Security' },
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
            Trade-offs
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Gas Optimization Without Compromising Security
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          Gas optimization is essential for a good user experience and protocol competitiveness, but some
          common optimization tricks introduce subtle security vulnerabilities. Learn which optimizations
          are safe, which are dangerous, and how to make informed trade-offs.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            7 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Dec 8, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Gas, Optimization, Security, Trade-offs
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#overview" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. The Gas-Security Trade-off
            </a>
          </li>
          <li>
            <a href="#safe-optimizations" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. Safe Optimizations (Always Do These)
            </a>
          </li>
          <li>
            <a href="#storage-packing" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Storage Packing
            </a>
          </li>
          <li>
            <a href="#calldata-memory" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. Calldata vs Memory
            </a>
          </li>
          <li>
            <a href="#unchecked-math" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Unchecked Math — When It&apos;s Safe
            </a>
          </li>
          <li>
            <a href="#dangerous-optimizations" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Dangerous Optimizations (Avoid These)
            </a>
          </li>
          <li>
            <a href="#short-circuiting" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. Short-Circuiting &amp; Require Ordering
            </a>
          </li>
          <li>
            <a href="#loops" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Loop Optimization &amp; DoS Risks
            </a>
          </li>
          <li>
            <a href="#assembly" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Assembly: Power &amp; Peril
            </a>
          </li>
          <li>
            <a href="#events-vs-storage" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Events vs Storage
            </a>
          </li>
          <li>
            <a href="#real-world" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Real-World Gas Bugs
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Gas Optimization Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — The Trade-off */}
        <section id="overview">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            The Gas-Security Trade-off
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Every gas optimization is a trade-off. Some optimizations are purely beneficial — they reduce
            cost with zero impact on security or readability. Others save gas at the expense of safety,
            introducing vulnerabilities that cost far more than any gas savings. The key is knowing which
            is which.
          </p>

          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-4 text-center">Optimization Spectrum</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-xs text-green-400 font-medium">Safe</div>
                <div className="flex-1 h-8 rounded-lg bg-gradient-to-r from-green-400/20 to-green-400/5 border border-green-400/20 flex items-center px-3">
                  <span className="text-xs text-gray-300">Storage packing, calldata, constant/immutable, caching</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-xs text-yellow-400 font-medium">Context-Dependent</div>
                <div className="flex-1 h-8 rounded-lg bg-gradient-to-r from-yellow-400/20 to-yellow-400/5 border border-yellow-400/20 flex items-center px-3">
                  <span className="text-xs text-gray-300">Unchecked math, custom errors, short-circuiting</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 text-right text-xs text-red-400 font-medium">Dangerous</div>
                <div className="flex-1 h-8 rounded-lg bg-gradient-to-r from-red-400/20 to-red-400/5 border border-red-400/20 flex items-center px-3">
                  <span className="text-xs text-gray-300">Removing checks, inline assembly, skipping ReentrancyGuard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">🎯 The Goal</div>
              <p className="text-sm text-gray-400">
                Reduce gas costs while maintaining the <strong className="text-white">same security guarantees</strong>.
                If an optimization changes the contract&apos;s behavior in any edge case, it needs careful analysis.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">💸 The Reality Check</div>
              <p className="text-sm text-gray-400">
                Saving 5,000 gas (~$0.50 at 30 gwei) per transaction is meaningless if it introduces a
                vulnerability that costs <strong className="text-white">$50M</strong>. Security always comes first.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — Safe Optimizations */}
        <section id="safe-optimizations">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            Safe Optimizations (Always Do These)
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            These optimizations are purely beneficial — they reduce gas without any security or readability
            trade-offs. Apply them in every contract.
          </p>

          <div className="space-y-4">
            {/* constant / immutable */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">✅</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Use <code className="text-lime-400">constant</code> and <code className="text-lime-400">immutable</code></h3>
                  <p className="text-gray-400 text-sm mb-3">
                    <code className="text-lime-400">constant</code> values are embedded in bytecode at compile time.
                    <code className="text-lime-400"> immutable</code> values are set in the constructor and stored in bytecode.
                    Both avoid SLOAD (2,100 gas) on every read.
                  </p>
                  <CodeBlock
                    language="solidity"
                    filename="ConstantImmutable.sol"
                    code={`// ❌ 2,100 gas per read (SLOAD)
uint256 public maxSupply = 10000;
address public admin = msg.sender;

// ✅ ~3 gas per read (embedded in bytecode)
uint256 public constant MAX_SUPPLY = 10000;
address public immutable ADMIN;

constructor() {
    ADMIN = msg.sender;
}

// Savings: ~2,097 gas per read × N reads`}
                  />
                </div>
              </div>
            </div>

            {/* Custom errors */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">✅</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Custom Errors over Require Strings</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Custom errors are ABI-encoded (4 bytes selector) instead of storing error
                    strings in bytecode. Saves both deployment and runtime gas.
                  </p>
                  <CodeBlock
                    language="solidity"
                    filename="CustomErrors.sol"
                    code={`// ❌ Stores string in bytecode + expensive ABI encoding
require(msg.sender == owner, "Caller is not the owner");
// Deployment: ~200 gas per character in string
// Runtime: ~50 gas more per revert

// ✅ 4-byte selector, typed parameters
error Unauthorized(address caller, address required);

if (msg.sender != owner) {
    revert Unauthorized(msg.sender, owner);
}
// Savings: ~100-200 gas per revert + smaller bytecode`}
                  />
                </div>
              </div>
            </div>

            {/* Cache storage reads */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">✅</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Cache Storage Reads in Local Variables</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Each SLOAD costs 2,100 gas (cold) or 100 gas (warm). If you read the same storage
                    variable multiple times, cache it in a local variable first.
                  </p>
                  <CodeBlock
                    language="solidity"
                    filename="CacheStorage.sol"
                    code={`// ❌ 3 SLOADs for the same variable
function withdraw() external {
    require(balances[msg.sender] > 0);      // SLOAD 1
    uint256 amount = balances[msg.sender];   // SLOAD 2
    balances[msg.sender] = 0;               // SSTORE
    emit Withdrawal(msg.sender, balances[msg.sender]); // SLOAD 3
}

// ✅ 1 SLOAD, cached in memory
function withdraw() external {
    uint256 bal = balances[msg.sender];     // SLOAD 1 (only)
    require(bal > 0);
    balances[msg.sender] = 0;              // SSTORE
    emit Withdrawal(msg.sender, bal);       // Memory read: ~3 gas
}
// Savings: ~4,100 gas (2 fewer SLOADs)`}
                  />
                </div>
              </div>
            </div>

            {/* Batch operations */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-lg">✅</span>
                <div className="flex-1">
                  <h3 className="text-white font-semibold mb-2">Batch Operations</h3>
                  <p className="text-gray-400 text-sm">
                    Each transaction has a base cost of 21,000 gas. Batching N operations into 1
                    transaction saves <code className="text-lime-400">(N-1) × 21,000</code> gas.
                    Use <code className="text-lime-400">multicall</code> patterns for user-facing batch operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — Storage Packing */}
        <section id="storage-packing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Storage Packing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The EVM reads and writes storage in 32-byte (256-bit) slots. If multiple variables fit in
            one slot, they&apos;re packed together, saving SLOAD/SSTORE operations. Proper packing
            can save thousands of gas per transaction — and it&apos;s completely safe.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Unpacked — 3 Slots (Bad)',
              code: `contract Unpacked {
    uint256 public amount;   // slot 0 (32 bytes)
    bool public active;      // slot 1 (1 byte, wastes 31)
    uint256 public price;    // slot 2 (32 bytes)
    address public owner;    // slot 3 (20 bytes, wastes 12)
    bool public paused;      // slot 4 (1 byte, wastes 31)

    // 5 storage slots used
    // Reading all: 5 × 2,100 = 10,500 gas (cold)
}

// Each bool/address gets its own 32-byte slot
// Massive waste of storage space`
            }}
            secure={{
              title: '✅ Packed — 3 Slots (Good)',
              code: `contract Packed {
    uint256 public amount;   // slot 0 (32 bytes)
    uint256 public price;    // slot 1 (32 bytes)
    address public owner;    // slot 2 (20 bytes)
    bool public active;      // slot 2 (1 byte)  ← packed!
    bool public paused;      // slot 2 (1 byte)  ← packed!

    // 3 storage slots used (was 5)
    // Reading all: 3 × 2,100 = 6,300 gas (cold)
    // Savings: 4,200 gas per full read
}

// address (20) + bool (1) + bool (1) = 22 bytes
// Fits in one 32-byte slot ✓`
            }}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Common Type Sizes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              {[
                { type: 'bool', size: '1 byte' },
                { type: 'uint8', size: '1 byte' },
                { type: 'uint16', size: '2 bytes' },
                { type: 'uint32', size: '4 bytes' },
                { type: 'uint64', size: '8 bytes' },
                { type: 'uint128', size: '16 bytes' },
                { type: 'address', size: '20 bytes' },
                { type: 'uint256', size: '32 bytes' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <code className="text-lime-400 text-xs">{item.type}</code>
                  <span className="text-gray-500 text-xs">{item.size}</span>
                </div>
              ))}
            </div>
          </div>

          <AlertBox type="warning" title="Packing + Upgradeable Contracts">
            If your contract is upgradeable, be careful when packing across struct boundaries. Adding
            a new variable to a packed slot in V2 can cause storage collision. Always use storage gaps
            or ERC-7201 namespaced storage with upgradeable contracts.
          </AlertBox>
        </section>

        {/* Section 4 — calldata vs memory */}
        <section id="calldata-memory">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            Calldata vs Memory
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            For <code className="text-lime-400">external</code> functions that receive arrays, bytes, or
            strings as read-only inputs, use <code className="text-lime-400">calldata</code> instead of
            <code className="text-lime-400"> memory</code>. Calldata is read directly from the transaction
            data — no copy to memory needed.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ memory — Copies Data',
              code: `// Copies entire array from calldata to memory
// Gas: 3 per byte + memory expansion
function processIds(
    uint256[] memory ids
) external {
    for (uint256 i = 0; i < ids.length; i++) {
        process(ids[i]);
    }
}

// For 100 uint256s (3,200 bytes):
// Copy cost: ~3,200 × 3 = 9,600 gas
// Memory expansion: ~additional gas`
            }}
            secure={{
              title: '✅ calldata — Zero-Copy Read',
              code: `// Reads directly from transaction calldata
// No copy, no memory expansion
function processIds(
    uint256[] calldata ids
) external {
    for (uint256 i = 0; i < ids.length; i++) {
        process(ids[i]);
    }
}

// For 100 uint256s:
// Copy cost: 0
// Reads: CALLDATALOAD per access (~3 gas)
// Savings: ~10,000+ gas for large arrays`
            }}
          />

          <AlertBox type="info" title="When You Need Memory">
            Use <code className="text-lime-400">memory</code> when you need to modify the data inside
            the function (calldata is read-only) or when passing data to an internal function that expects
            memory. For <code className="text-lime-400">public</code> functions, the compiler automatically
            copies to memory because they can be called internally too.
          </AlertBox>
        </section>

        {/* Section 5 — Unchecked Math */}
        <section id="unchecked-math">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Unchecked Math — When It&apos;s Safe
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Solidity 0.8+ automatically checks for integer overflow/underflow on every arithmetic operation
            (~100-200 gas per check). The <code className="text-lime-400">unchecked</code> block skips these
            checks. This is safe <strong className="text-white">only</strong> when you can mathematically
            prove the operation cannot overflow.
          </p>

          <CodeBlock
            language="solidity"
            filename="SafeUnchecked.sol"
            code={`// CASE 1: Loop increment — ALWAYS safe
// i is bounded by array.length which fits in uint256
for (uint256 i = 0; i < array.length;) {
    process(array[i]);
    unchecked { ++i; }  // ✅ Safe: i < array.length < 2^256
}
// Savings: ~60-80 gas per iteration

// CASE 2: Subtraction after comparison — SAFE
function withdraw(uint256 amount) external {
    uint256 bal = balances[msg.sender];
    require(bal >= amount, "Insufficient");

    unchecked {
        balances[msg.sender] = bal - amount;  // ✅ Safe: bal >= amount
    }
}

// CASE 3: Intermediate calculation — CAREFUL
function calculateFee(uint256 amount, uint256 feeBps) internal pure returns (uint256) {
    // ❌ DANGEROUS if unchecked: amount * feeBps could overflow
    // amount = 2^200, feeBps = 2^60 → overflow!
    return (amount * feeBps) / 10000;

    // ✅ Safe only if inputs are bounded
    // e.g., amount < 2^128 AND feeBps < 10000
}`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">Safe to Uncheck</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Loop counter increments (<code className="text-lime-400">++i</code>)</li>
                <li>• Subtraction after <code className="text-lime-400">require(a {'>'}= b)</code></li>
                <li>• Array index after bounds check</li>
                <li>• Timestamp math with known bounds</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">Never Uncheck</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• User-supplied arithmetic inputs</li>
                <li>• Token amount calculations</li>
                <li>• Multiplication of large numbers</li>
                <li>• Any operation where inputs aren&apos;t bounded</li>
              </ul>
            </div>
          </div>

          <AlertBox type="danger" title="Real Vulnerability">
            A project used <code className="text-lime-400">unchecked</code> on a token transfer calculation
            where a user could supply the amount. The attacker passed a value that caused an underflow, turning
            a small balance into <code className="text-lime-400">type(uint256).max</code>. Never use unchecked
            on user-controlled arithmetic.
          </AlertBox>
        </section>

        {/* Section 6 — Dangerous Optimizations */}
        <section id="dangerous-optimizations">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Dangerous Optimizations (Avoid These)
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            These &quot;optimizations&quot; save gas but introduce real security vulnerabilities. The gas
            savings are never worth the risk.
          </p>

          <div className="space-y-6">
            {/* Dangerous 1 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Removing ReentrancyGuard to Save Gas
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                ReentrancyGuard costs ~2,500 gas (1 SLOAD + 1 SSTORE). Some developers remove it
                claiming CEI is sufficient. But CEI can be accidentally broken in future code changes,
                while the guard is universal protection.
              </p>
              <CodeBlock
                language="solidity"
                filename="KeepReentrancyGuard.sol"
                code={`// ❌ "We follow CEI so we don't need the guard"
function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok);
}
// Saves: ~2,500 gas
// Risk: Future refactor breaks CEI ordering → reentrancy

// ✅ Keep the guard — defense in depth
function withdraw(uint256 amount) external nonReentrant {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok);
}
// Cost: ~2,500 gas — a tiny price for reentrancy protection`}
              />
            </div>

            {/* Dangerous 2 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Skipping Access Control Checks
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Every modifier like <code className="text-lime-400">onlyOwner</code> costs a small
                amount of gas. Never remove access control to save gas — one unguarded admin function
                is all an attacker needs.
              </p>
            </div>

            {/* Dangerous 3 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Removing Input Validation
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                Require statements cost gas, but they&apos;re the first line of defense. Removing
                zero-address checks, amount bounds, or state validation creates exploit vectors.
              </p>
              <CodeBlock
                language="solidity"
                filename="KeepValidation.sol"
                code={`// ❌ "Saves gas by removing checks"
function transfer(address to, uint256 amount) external {
    balances[msg.sender] -= amount;
    balances[to] += amount;
}
// Missing: zero-address check, balance check
// Result: Tokens burned to address(0), underflow possibilities

// ✅ Keep all validation
function transfer(address to, uint256 amount) external {
    require(to != address(0), "Zero address");
    require(balances[msg.sender] >= amount, "Insufficient");
    balances[msg.sender] -= amount;
    balances[to] += amount;
}
// Cost: ~300 gas for the safety of your users' funds`}
              />
            </div>

            {/* Dangerous 4 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Using <code className="text-lime-400">transfer()</code> / <code className="text-lime-400">send()</code> Instead of <code className="text-lime-400">call()</code>
              </h3>
              <p className="text-gray-400 text-sm">
                While <code className="text-lime-400">.transfer()</code> and <code className="text-lime-400">.send()</code> forward
                only 2,300 gas (preventing reentrancy), they can fail when the recipient is a contract that
                needs more gas. This is a DoS vector, not a security improvement. Use
                <code className="text-lime-400"> .call{'{'}value: amount{'}'}</code> with ReentrancyGuard instead.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 — Short-Circuiting */}
        <section id="short-circuiting">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            Short-Circuiting &amp; Require Ordering
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Solidity evaluates conditions left to right with short-circuit evaluation. Place cheap checks
            before expensive ones so the function reverts early, saving gas on the common failure path.
            This optimization is safe as long as <strong className="text-white">all checks remain present</strong>.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Expensive Check First',
              code: `function claim(bytes32[] calldata proof) external {
    // MerkleProof.verify: ~5,000+ gas
    require(
        MerkleProof.verify(proof, root, leaf),
        "Invalid proof"
    );

    // SLOAD: 2,100 gas
    require(!claimed[msg.sender], "Already claimed");

    // Simple comparison: ~30 gas
    require(block.timestamp >= startTime, "Not started");

    claimed[msg.sender] = true;
    token.transfer(msg.sender, CLAIM_AMOUNT);
}
// Users who already claimed pay 5,000+ gas
// just to hit the "Already claimed" revert`
            }}
            secure={{
              title: '✅ Cheap Checks First',
              code: `function claim(bytes32[] calldata proof) external {
    // Cheapest first: ~30 gas
    require(block.timestamp >= startTime, "Not started");

    // Medium: 2,100 gas (SLOAD)
    require(!claimed[msg.sender], "Already claimed");

    // Expensive last: ~5,000+ gas
    require(
        MerkleProof.verify(proof, root, leaf),
        "Invalid proof"
    );

    claimed[msg.sender] = true;
    token.transfer(msg.sender, CLAIM_AMOUNT);
}
// Already-claimed users revert after ~2,130 gas
// Savings: ~5,000 gas on common failure path`
            }}
          />
        </section>

        {/* Section 8 — Loop Optimization */}
        <section id="loops">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Loop Optimization &amp; DoS Risks
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Loops are where gas savings compound — but also where unbounded gas consumption can brick
            a contract. Every loop optimization must be weighed against the <strong className="text-white">Denial
            of Service</strong> risk of unbounded iteration.
          </p>

          <CodeBlock
            language="solidity"
            filename="LoopSafety.sol"
            code={`// ❌ DANGEROUS: Unbounded loop on user-controlled array
function distributeRewards(address[] storage recipients) external {
    // If recipients has 10,000 entries, this exceeds block gas limit
    for (uint256 i = 0; i < recipients.length; i++) {
        token.transfer(recipients[i], rewardAmount);
    }
}
// DoS vector: keep adding recipients until loop exceeds gas limit

// ✅ SAFE: Bounded loop with pagination
uint256 public constant MAX_BATCH = 100;

function distributeRewards(
    uint256 startIndex,
    uint256 batchSize
) external onlyOwner {
    require(batchSize <= MAX_BATCH, "Batch too large");
    uint256 end = startIndex + batchSize;
    if (end > recipients.length) end = recipients.length;

    for (uint256 i = startIndex; i < end;) {
        token.transfer(recipients[i], rewardAmount);
        unchecked { ++i; }  // Safe: i < end < 2^256
    }
}

// ✅ BETTER: Pull pattern (users claim individually)
mapping(address => uint256) public pendingRewards;

function claimReward() external {
    uint256 reward = pendingRewards[msg.sender];
    require(reward > 0, "No rewards");
    pendingRewards[msg.sender] = 0;
    token.transfer(msg.sender, reward);
}
// No loops at all — O(1) per user`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Loop Optimization Quick Wins</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-lime-400">1.</span>
                <span>Cache <code className="text-lime-400">array.length</code> in a local variable (avoids repeated SLOAD for storage arrays)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">2.</span>
                <span>Use <code className="text-lime-400">unchecked {'{ ++i; }'}</code> for the counter (safe when bounded)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">3.</span>
                <span>Prefer <code className="text-lime-400">++i</code> over <code className="text-lime-400">i++</code> (avoids temporary variable)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">4.</span>
                <span>Avoid reading the same storage variable inside each iteration — cache before the loop</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">5.</span>
                <span>Always set a hard maximum iteration count to prevent DoS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Assembly */}
        <section id="assembly">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Assembly: Power &amp; Peril
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Inline assembly (<code className="text-lime-400">assembly {'{ }'}</code>) gives direct EVM access,
            bypassing Solidity&apos;s safety guardrails. It can save significant gas for hot paths, but it
            disables the compiler&apos;s type checking, overflow protection, and memory safety. One wrong
            opcode can corrupt state or drain all funds.
          </p>

          <CodeComparison
            vulnerable={{
              title: '⚠️ Assembly — Fast but Risky',
              code: `// Optimized token transfer using assembly
function _transfer(
    address from,
    address to,
    uint256 amount
) internal {
    assembly {
        // Compute storage slot for balances[from]
        mstore(0x00, from)
        mstore(0x20, 0) // balances mapping slot
        let fromSlot := keccak256(0x00, 0x40)
        let fromBal := sload(fromSlot)

        // No overflow check!
        // No zero-address check!
        // No balance validation!
        sstore(fromSlot, sub(fromBal, amount))

        mstore(0x00, to)
        let toSlot := keccak256(0x00, 0x40)
        sstore(toSlot, add(sload(toSlot), amount))
    }
}
// Saves: ~500 gas
// Risk: No safety checks, hard to audit`
            }}
            secure={{
              title: '✅ Solidity — Safe and Auditable',
              code: `function _transfer(
    address from,
    address to,
    uint256 amount
) internal {
    require(from != address(0), "From zero");
    require(to != address(0), "To zero");
    require(balances[from] >= amount, "Insufficient");

    balances[from] -= amount;
    balances[to] += amount;

    emit Transfer(from, to, amount);
}

// Cost: ~500 gas more
// Benefits:
// - Compiler checks overflow/underflow
// - Clear, auditable logic
// - Input validation present
// - Events emitted for tracking`
            }}
          />

          <AlertBox type="warning" title="When Assembly Is Acceptable">
            Assembly is justified in <strong className="text-white">library-level code</strong> that&apos;s
            been battle-tested (e.g., OpenZeppelin, Solady). For application logic, stick to Solidity.
            If you must use assembly, get it audited separately and add extensive natspec comments
            explaining each operation.
          </AlertBox>
        </section>

        {/* Section 10 — Events vs Storage */}
        <section id="events-vs-storage">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Events vs Storage
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            If data only needs to be read off-chain (by frontends, indexers, or analytics), emit it as
            an event instead of storing it. Events cost ~375 gas for the first topic + 8 gas per byte,
            while storage costs 20,000 gas for a new non-zero slot.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Storing Off-Chain-Only Data',
              code: `// Storing data that's only read by the frontend
struct AuditRecord {
    address auditor;
    uint256 timestamp;
    string report;
}
AuditRecord[] public auditHistory;

function submitAudit(string calldata report) external {
    auditHistory.push(AuditRecord({
        auditor: msg.sender,
        timestamp: block.timestamp,
        report: report
    }));
}
// Cost: ~40,000+ gas (new storage slots)
// The frontend queries events anyway...`
            }}
            secure={{
              title: '✅ Events for Off-Chain Data',
              code: `event AuditSubmitted(
    address indexed auditor,
    uint256 indexed timestamp,
    string report
);

function submitAudit(string calldata report) external {
    emit AuditSubmitted(
        msg.sender,
        block.timestamp,
        report
    );
}
// Cost: ~2,000 gas (event emission)
// Frontend reads via eth_getLogs
// Savings: ~38,000 gas

// ⚠️ Only use this pattern when:
// - Data is NOT needed by on-chain logic
// - You have an off-chain indexer (subgraph)`
            }}
          />

          <AlertBox type="info" title="When You Need Both">
            Sometimes you need data both on-chain and off-chain. In that case, store the minimum
            necessary on-chain (e.g., a running total, a status flag) and emit the full details as events.
            This gives you the best of both worlds.
          </AlertBox>
        </section>

        {/* Section 11 — Real-World Gas Bugs */}
        <section id="real-world">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Real-World Gas Bugs
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">GovernorBravo — Unbounded Loop DoS</h3>
              <p className="text-gray-400 text-sm mb-2">
                A governance contract iterated over all voters in a proposal to calculate results.
                As the number of voters grew, the gas cost exceeded the block limit, making it impossible
                to execute or finalize any proposal. The governance system was permanently frozen.
              </p>
              <div className="text-xs text-gray-600">
                Fix: Pagination pattern with <code className="text-lime-400">processVotes(uint startIndex, uint count)</code>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">KingOfTheEther — transfer() Gas Limit</h3>
              <p className="text-gray-400 text-sm mb-2">
                The contract used <code className="text-lime-400">.transfer()</code> to send ETH to the
                previous &quot;king.&quot; When the previous king was a contract with a fallback requiring more
                than 2,300 gas, the transfer failed permanently, blocking all future plays.
              </p>
              <div className="text-xs text-gray-600">
                Fix: Use <code className="text-lime-400">.call{'{'}value{':'} amount{'}'}</code> with a pull-based withdrawal pattern
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Akutars NFT — Refund Loop DoS ($34M Locked)</h3>
              <p className="text-gray-400 text-sm mb-2">
                The Akutars NFT project had a refund function that looped over all bidders. A bidder
                deployed a contract that reverted on receiving ETH, blocking the entire refund loop.
                $34M in ETH was permanently locked in the contract.
              </p>
              <div className="text-xs text-gray-600">
                Fix: Pull-based refund pattern (users call <code className="text-lime-400">claimRefund()</code> individually)
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Gas Optimization Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Always Do */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-green-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400">✅</span> Always Apply
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Use constant and immutable where possible',
                  'Custom errors instead of require strings',
                  'Cache storage reads in local variables',
                  'Pack storage variables to minimize slots',
                  'Use calldata over memory for external inputs',
                  'Emit events instead of storing off-chain data',
                  'Batch operations to amortize base tx cost',
                  'Use ++i and unchecked loop counters',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Never Do */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-red-400">✗</span> Never Sacrifice
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Remove ReentrancyGuard for gas savings',
                  'Skip access control modifiers',
                  'Remove input validation / zero-address checks',
                  'Use unchecked on user-controlled arithmetic',
                  'Unbounded loops on growing arrays',
                  'Assembly for application-level logic',
                  '.transfer() / .send() instead of .call()',
                  'Skip events to save gas (lose transparency)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Context Dependent */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20 md:col-span-2">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">⚡</span> Context-Dependent (Analyze Case by Case)
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    'Unchecked math: only after proving bounds',
                    'Short-circuiting: safe if all checks present',
                    'Struct packing in upgradeable contracts',
                    'Pull vs push payment patterns',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-0.5">☐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    'Assembly in libraries vs application code',
                    'Minimal proxy (EIP-1167) for factory patterns',
                    'Bitmap vs mapping for boolean tracking',
                    'Reducing function parameter count',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-400 mt-0.5">☐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-white/[0.06]">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['Gas', 'Optimization', 'Security', 'Trade-offs', 'Storage Packing', 'Unchecked', 'Assembly', 'DoS', 'Calldata'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/denial-of-service" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Denial of Service</h4>
              <p className="text-gray-500 text-sm">How unbounded loops and push payments create DoS vulnerabilities in smart contracts.</p>
            </Link>
            <Link href="/learn/vulnerabilities/integer-overflow-underflow" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Integer Overflow / Underflow</h4>
              <p className="text-gray-500 text-sm">Why unchecked math is dangerous and when Solidity 0.8+ protection isn&apos;t enough.</p>
            </Link>
            <Link href="/learn/best-practices/safe-math-operations" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Safe Math Operations</h4>
              <p className="text-gray-500 text-sm">Understanding arithmetic safety in Solidity 0.8+ and when extra care is needed.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Are your gas optimizations safe?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Aggressive gas optimization is one of the top sources of audit findings. Let us verify your
            optimizations don&apos;t introduce vulnerabilities.
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
