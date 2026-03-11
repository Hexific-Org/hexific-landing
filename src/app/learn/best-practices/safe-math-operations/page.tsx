'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function SafeMathOperationsPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Safe Arithmetic in Solidity' },
      ]} />

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
            Best Practices
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-400/10 text-green-400 border border-green-400/20">
            Beginner
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
            Arithmetic
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Safe Arithmetic in Solidity
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          Since Solidity 0.8.0, arithmetic operations automatically revert on overflow and underflow.
          But that doesn&apos;t mean arithmetic bugs are a thing of the past. Precision loss, rounding
          errors, division by zero, and <code className="text-lime-400">unchecked</code> blocks still
          cause real exploits. This guide covers what 0.8+ protects and where you still need to be careful.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Nov 30, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            SafeMath, Arithmetic, Overflow, Solidity 0.8
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#history" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. A Brief History: SafeMath to 0.8+
            </a>
          </li>
          <li>
            <a href="#how-it-works" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. How Solidity 0.8+ Overflow Protection Works
            </a>
          </li>
          <li>
            <a href="#overflow-underflow" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Overflow &amp; Underflow Explained
            </a>
          </li>
          <li>
            <a href="#unchecked" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. The unchecked Block
            </a>
          </li>
          <li>
            <a href="#division" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Division &amp; Rounding Errors
            </a>
          </li>
          <li>
            <a href="#precision" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Fixed-Point Arithmetic &amp; Precision
            </a>
          </li>
          <li>
            <a href="#multiplication-order" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. Multiplication Before Division
            </a>
          </li>
          <li>
            <a href="#casting" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Type Casting Dangers
            </a>
          </li>
          <li>
            <a href="#edge-cases" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Arithmetic Edge Cases
            </a>
          </li>
          <li>
            <a href="#real-world" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Real-World Arithmetic Exploits
            </a>
          </li>
          <li>
            <a href="#libraries" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Math Libraries
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Safe Arithmetic Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — History */}
        <section id="history">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            A Brief History: SafeMath to 0.8+
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Before Solidity 0.8.0, arithmetic silently wrapped on overflow. Adding 1 to
            <code className="text-lime-400"> type(uint256).max</code> gave you 0. This catastrophic behavior
            caused some of the largest DeFi exploits. OpenZeppelin&apos;s <code className="text-lime-400">SafeMath</code> library
            was the band-aid — but many developers forgot to use it.
          </p>

          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-4 text-center">Evolution of Arithmetic Safety</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-red-400/5 border border-red-400/10">
                <div className="w-28 text-right text-xs text-red-400 font-mono font-medium shrink-0">&lt; 0.8.0</div>
                <div className="text-sm text-gray-400">
                  Silent overflow/underflow. Required <code className="text-lime-400">SafeMath</code> on every operation.
                  Forgetting = instant vulnerability.
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
                <div className="w-28 text-right text-xs text-yellow-400 font-mono font-medium shrink-0">0.8.0+</div>
                <div className="text-sm text-gray-400">
                  Automatic overflow/underflow checks. Reverts by default. <code className="text-lime-400">SafeMath</code> no longer needed
                  for basic operations.
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-green-400/5 border border-green-400/10">
                <div className="w-28 text-right text-xs text-green-400 font-mono font-medium shrink-0">0.8.0+</div>
                <div className="text-sm text-gray-400">
                  <code className="text-lime-400">unchecked {'{ }'}</code> block added for intentional gas-optimized arithmetic
                  where overflow is impossible.
                </div>
              </div>
            </div>
          </div>

          <AlertBox type="info" title="SafeMath Is Obsolete">
            If your project uses Solidity 0.8+, you do <strong>not</strong> need SafeMath.
            Using it adds unnecessary gas overhead (~60-100 gas per operation) with zero safety benefit.
            Remove it from 0.8+ projects.
          </AlertBox>
        </section>

        {/* Section 2 — How It Works */}
        <section id="how-it-works">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            How Solidity 0.8+ Overflow Protection Works
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The Solidity compiler injects overflow/underflow checks into the generated bytecode for
            every <code className="text-lime-400">+</code>, <code className="text-lime-400">-</code>,
            <code className="text-lime-400"> *</code>, and <code className="text-lime-400">**</code> operation.
            If any operation would overflow or underflow, the transaction reverts with a Panic error.
          </p>

          <CodeBlock
            language="solidity"
            filename="AutomaticChecks.sol"
            code={`// Solidity 0.8+ — all of these revert automatically

uint256 a = type(uint256).max;
uint256 b = a + 1;  // REVERTS: Panic(0x11) — overflow

uint256 c = 0;
uint256 d = c - 1;  // REVERTS: Panic(0x11) — underflow

uint256 e = type(uint256).max;
uint256 f = e * 2;  // REVERTS: Panic(0x11) — overflow

uint256 g = 10;
uint256 h = g / 0;  // REVERTS: Panic(0x12) — division by zero

// These Panic codes are how the EVM signals the error:
// Panic(0x11) = Overflow or underflow
// Panic(0x12) = Division or modulo by zero`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">What 0.8+ Protects</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Addition overflow</li>
                <li>• Subtraction underflow</li>
                <li>• Multiplication overflow</li>
                <li>• Exponentiation overflow</li>
                <li>• Division by zero</li>
                <li>• Modulo by zero</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">What 0.8+ Does NOT Protect</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Precision loss in division (truncation)</li>
                <li>• Rounding direction (always rounds down)</li>
                <li>• Arithmetic inside <code className="text-lime-400">unchecked</code> blocks</li>
                <li>• Type narrowing casts (e.g., uint256 → uint8)</li>
                <li>• Logical errors in formulas</li>
                <li>• Intermediate overflow in complex expressions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 — Overflow & Underflow Explained */}
        <section id="overflow-underflow">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Overflow &amp; Underflow Explained
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Integers in the EVM have fixed sizes. A <code className="text-lime-400">uint8</code> can hold
            0-255, a <code className="text-lime-400">uint256</code> can hold
            0 to 2<sup>256</sup>-1. Going beyond these bounds is overflow; going below zero is underflow.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Pre-0.8: Silent Wrapping',
              code: `// Solidity < 0.8.0 — DANGEROUS
pragma solidity ^0.7.0;

contract Vulnerable {
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount)
        external
    {
        // If amount > balances[msg.sender]:
        // subtraction wraps to huge number!
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

// Attack: Alice has 0 tokens
// Alice calls transfer(bob, 1)
// balances[alice] = 0 - 1 = 2^256 - 1
// Alice now has infinite tokens!`
            }}
            secure={{
              title: '✅ 0.8+: Automatic Revert',
              code: `// Solidity >= 0.8.0 — SAFE
pragma solidity ^0.8.20;

contract Safe {
    mapping(address => uint256) public balances;

    function transfer(address to, uint256 amount)
        external
    {
        // If amount > balances[msg.sender]:
        // REVERTS with Panic(0x11)
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

// Attack: Alice has 0 tokens
// Alice calls transfer(bob, 1)
// Transaction REVERTS — no state change
// Alice still has 0 tokens ✓`
            }}
          />
        </section>

        {/* Section 4 — Unchecked */}
        <section id="unchecked">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            The unchecked Block
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The <code className="text-lime-400">unchecked</code> block disables overflow/underflow checks
            for all arithmetic inside it. This saves ~100-200 gas per operation. It&apos;s safe
            <strong className="text-white"> only when you can mathematically prove the operation
            cannot overflow</strong>.
          </p>

          <CodeBlock
            language="solidity"
            filename="UncheckedSafety.sol"
            code={`// ✅ SAFE: Loop counter can never overflow
// i starts at 0 and is bounded by array.length (< 2^256)
for (uint256 i = 0; i < array.length;) {
    process(array[i]);
    unchecked { ++i; }
}

// ✅ SAFE: Subtraction after explicit comparison
function withdraw(uint256 amount) external {
    uint256 balance = balances[msg.sender];
    require(balance >= amount, "Insufficient");

    unchecked {
        // Safe: we already proved balance >= amount
        balances[msg.sender] = balance - amount;
    }

    payable(msg.sender).transfer(amount);
}

// ❌ DANGEROUS: User-controlled arithmetic
function stake(uint256 amount, uint256 multiplier) external {
    unchecked {
        // NEVER! amount * multiplier can overflow
        uint256 reward = amount * multiplier;
        rewards[msg.sender] += reward;
    }
}

// ❌ DANGEROUS: Subtraction without prior check
function burn(uint256 amount) external {
    unchecked {
        // NEVER! Could underflow if amount > totalSupply
        totalSupply -= amount;
    }
}`}
          />

          <AlertBox type="danger" title="Rule of Thumb">
            If you can&apos;t write a one-sentence mathematical proof for why the operation is safe,
            <strong> don&apos;t use unchecked</strong>. The gas savings (~100-200 gas) are negligible
            compared to the risk of an overflow exploit that can drain your entire protocol.
          </AlertBox>
        </section>

        {/* Section 5 — Division & Rounding */}
        <section id="division">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Division &amp; Rounding Errors
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Solidity has no floating-point numbers. All division is <strong className="text-white">integer
            division</strong> — it truncates (rounds toward zero). This means <code className="text-lime-400">7 / 2 = 3</code>,
            not 3.5. While this seems minor, rounding errors compound across many operations and can be
            exploited to extract value.
          </p>

          <CodeBlock
            language="solidity"
            filename="RoundingDangers.sol"
            code={`// Problem: Division truncates — fractions are lost
uint256 result = 7 / 2;    // = 3 (not 3.5)
uint256 result2 = 1 / 2;   // = 0 (not 0.5)
uint256 result3 = 99 / 100; // = 0 (not 0.99)

// ❌ EXPLOITABLE: Fee calculation rounds down
function calculateFee(uint256 amount) public pure returns (uint256) {
    // 0.3% fee
    return amount * 3 / 1000;
}
// calculateFee(1) = 1 * 3 / 1000 = 0  ← Zero fee!
// calculateFee(333) = 333 * 3 / 1000 = 0  ← Still zero!
// Attacker: make many small transfers, pay zero fees

// ✅ SAFE: Enforce minimum fee OR round up
function calculateFeeRoundUp(uint256 amount) public pure returns (uint256) {
    // Round up: (a * b + c - 1) / c
    uint256 fee = (amount * 3 + 999) / 1000;
    return fee > 0 ? fee : 1; // Minimum 1 wei fee
}
// calculateFeeRoundUp(1) = (3 + 999) / 1000 = 1  ✓
// calculateFeeRoundUp(333) = (999 + 999) / 1000 = 1  ✓`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Rounding Direction Matters</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="text-lime-400 font-medium mb-1">Round Down (Default)</div>
                <p className="text-gray-400">
                  Use when calculating amounts the protocol <strong className="text-white">gives out</strong>
                  (rewards, withdrawals). Protocol keeps the rounding dust.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="text-yellow-400 font-medium mb-1">Round Up</div>
                <p className="text-gray-400">
                  Use when calculating amounts users <strong className="text-white">owe</strong> (fees,
                  debt, required collateral). Users pay the rounding dust.
                </p>
              </div>
            </div>
            <div className="mt-3 p-3 rounded-lg bg-lime-400/5 border border-lime-400/10">
              <code className="text-lime-400 text-xs">
                {'// Round up formula: (a + b - 1) / b  (for a / b rounding up)'}
              </code>
            </div>
          </div>
        </section>

        {/* Section 6 — Fixed-Point Precision */}
        <section id="precision">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Fixed-Point Arithmetic &amp; Precision
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Since Solidity has no decimals, protocols use <strong className="text-white">fixed-point
            arithmetic</strong> — integer values scaled by a factor (usually 10<sup>18</sup>, called
            &quot;WAD&quot; in DeFi). This gives you 18 decimal places of precision using integers.
          </p>

          <CodeBlock
            language="solidity"
            filename="FixedPoint.sol"
            code={`// Common precision constants
uint256 constant WAD = 1e18;  // 18 decimals (ERC-20 standard)
uint256 constant RAY = 1e27;  // 27 decimals (Aave, MakerDAO)
uint256 constant BPS = 10000; // Basis points (1 BPS = 0.01%)

// ✅ WAD math: multiply, then divide by WAD
function wadMul(uint256 a, uint256 b) internal pure returns (uint256) {
    return (a * b) / WAD;
}

function wadDiv(uint256 a, uint256 b) internal pure returns (uint256) {
    return (a * WAD) / b;
}

// Example: Calculate 50% of 2.5 tokens
// 2.5 tokens = 2.5e18 in WAD
// 50% = 0.5e18 in WAD
// wadMul(2.5e18, 0.5e18) = (2.5e18 * 0.5e18) / 1e18 = 1.25e18 ✓

// ⚠️ Careful: intermediate multiplication can overflow!
// a * b overflows if a * b > type(uint256).max
// With WAD: max safe a = type(uint256).max / b
// For b = 1e18: max a ≈ 1.15e59 (plenty for most cases)

// For extremely large numbers, use mulDiv:
function mulDiv(uint256 a, uint256 b, uint256 denominator)
    internal pure returns (uint256)
{
    // Uses 512-bit intermediate to prevent overflow
    // See OpenZeppelin Math.mulDiv or Solady FixedPointMathLib
}`}
          />

          <AlertBox type="info" title="Token Decimals Vary">
            Not all tokens use 18 decimals. USDC and USDT use 6. WBTC uses 8. Always check
            <code className="text-lime-400"> token.decimals()</code> and normalize before doing
            cross-token math. Mixing decimals is a common source of bugs — $1 in USDC
            (1e6) is very different from $1 in WETH (1e18).
          </AlertBox>
        </section>

        {/* Section 7 — Multiplication Before Division */}
        <section id="multiplication-order">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            Multiplication Before Division
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            This is one of the most common arithmetic mistakes in Solidity. Because integer division
            truncates, <strong className="text-white">the order of operations matters</strong>.
            Always multiply before dividing to preserve maximum precision.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Divide First — Loses Precision',
              code: `// Calculate: (amount * rate) / PRECISION
// rate = 3, amount = 10, PRECISION = 4

// WRONG ORDER: divide first
uint256 result = (amount / PRECISION) * rate;
// = (10 / 4) * 3
// = 2 * 3
// = 6

// Lost precision at the division step!
// 10 / 4 = 2.5, but truncated to 2

// Real example: token swap
// User swaps 100 tokenA for tokenB
// Price: 0.3 tokenB per tokenA
function getAmountOut(uint256 amountIn)
    public pure returns (uint256)
{
    // ❌ Divides first, precision lost
    return (amountIn / 1000) * 300;
    // 100 / 1000 = 0 → result = 0!
}`
            }}
            secure={{
              title: '✅ Multiply First — Maximum Precision',
              code: `// Calculate: (amount * rate) / PRECISION
// rate = 3, amount = 10, PRECISION = 4

// CORRECT ORDER: multiply first
uint256 result = (amount * rate) / PRECISION;
// = (10 * 3) / 4
// = 30 / 4
// = 7

// Maximum precision preserved!
// True answer: 7.5 → truncated to 7

// Real example: token swap
// User swaps 100 tokenA for tokenB
// Price: 0.3 tokenB per tokenA
function getAmountOut(uint256 amountIn)
    public pure returns (uint256)
{
    // ✅ Multiplies first, precision preserved
    return (amountIn * 300) / 1000;
    // (100 * 300) / 1000 = 30 ✓
}`
            }}
          />

          <AlertBox type="warning" title="Intermediate Overflow Risk">
            Multiplying first increases precision but risks intermediate overflow.
            If <code className="text-lime-400">amount * rate</code> can exceed <code className="text-lime-400">2^256</code>,
            use <code className="text-lime-400">Math.mulDiv(amount, rate, precision)</code> from
            OpenZeppelin, which uses 512-bit intermediate math.
          </AlertBox>
        </section>

        {/* Section 8 — Type Casting */}
        <section id="casting">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Type Casting Dangers
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Solidity 0.8+ protects against overflow in <em>arithmetic</em>, but <strong className="text-white">type
            casting</strong> between different sized integers can still silently truncate values.
            Casting <code className="text-lime-400">uint256</code> to <code className="text-lime-400">uint128</code> silently
            drops the upper bits.
          </p>

          <CodeBlock
            language="solidity"
            filename="CastingDangers.sol"
            code={`// ❌ DANGEROUS: Silent truncation in Solidity 0.8+
uint256 big = 2**200;
uint128 small = uint128(big);  // = 0 ❗ (upper bits dropped)
// No revert! No warning! Just silent data loss.

uint256 price = 300_000e18;
uint8 tiny = uint8(price);     // = 0 ❗ (only keeps lowest 8 bits)

// ❌ Real vulnerability: timestamp casting
uint256 unlockTime = block.timestamp + 365 days;
uint32 stored = uint32(unlockTime);
// block.timestamp already exceeds uint32 max (4,294,967,295)
// After 2106-02-07, uint32 overflows to 0!

// ✅ SAFE: Use SafeCast from OpenZeppelin
import "@openzeppelin/contracts/utils/math/SafeCast.sol";
using SafeCast for uint256;

uint256 big2 = 2**200;
uint128 safe = big2.toUint128();  // REVERTS! ✓

uint256 amount = 500;
uint128 safe2 = amount.toUint128();  // = 500 ✓ (fits)

// ✅ Or validate manually before casting
function safeDowncast(uint256 value) internal pure returns (uint96) {
    require(value <= type(uint96).max, "Exceeds uint96");
    return uint96(value);
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">When Downcasting Happens</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Storage packing:</strong> Casting uint256 to uint128/uint96/uint64 to fit multiple values in one slot</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Timestamp storage:</strong> Casting block.timestamp (uint256) to uint32/uint48/uint64</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Signed/unsigned conversion:</strong> Casting int256 to uint256 (or vice versa) — negative values become huge</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">•</span>
                <span><strong className="text-white">Interface compliance:</strong> External functions returning smaller types than your internal variables</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Edge Cases */}
        <section id="edge-cases">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Arithmetic Edge Cases
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Zero-Amount Operations</h3>
              <p className="text-gray-400 text-sm mb-3">
                Functions that accept an <code className="text-lime-400">amount</code> parameter should
                validate it&apos;s non-zero. A zero deposit, zero transfer, or zero swap is usually
                either a mistake or an attempt to manipulate state without economic commitment.
              </p>
              <CodeBlock
                language="solidity"
                filename="ZeroCheck.sol"
                code={`// ❌ Allows zero deposit — can manipulate state
function deposit(uint256 amount) external {
    totalDepositors++;           // State changed!
    lastDepositTime[msg.sender] = block.timestamp;
    balances[msg.sender] += amount;  // += 0
}

// ✅ Reject zero amounts
function deposit(uint256 amount) external {
    require(amount > 0, "Zero amount");
    balances[msg.sender] += amount;
}`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">First-Depositor / Inflation Attack</h3>
              <p className="text-gray-400 text-sm mb-3">
                In ERC-4626 vaults, the first depositor can manipulate the share price by donating
                tokens directly to the vault, causing rounding errors that steal from subsequent depositors.
              </p>
              <CodeBlock
                language="solidity"
                filename="InflationAttack.sol"
                code={`// Attack on share-based vaults:
// 1. Attacker deposits 1 wei → gets 1 share
// 2. Attacker donates 1,000,000e18 tokens to vault
// 3. Vault now: 1,000,000e18 + 1 assets, 1 share
// 4. Victim deposits 999,999e18 tokens
//    shares = 999,999e18 * 1 / (1,000,000e18 + 1) = 0
//    Victim gets ZERO shares!
// 5. Attacker redeems 1 share → gets everything

// ✅ Mitigation: Virtual shares/assets offset
function _convertToShares(uint256 assets) internal view returns (uint256) {
    return assets.mulDiv(
        totalSupply() + 10 ** _decimalsOffset(),
        totalAssets() + 1,
        Math.Rounding.Floor
    );
}`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Signed Integer Pitfalls</h3>
              <p className="text-gray-400 text-sm">
                <code className="text-lime-400">int256</code> has an asymmetric range:
                min = -2<sup>255</sup>, max = 2<sup>255</sup>-1. This means
                <code className="text-lime-400"> -type(int256).min</code> overflows
                (there&apos;s no positive equivalent). Also, casting a negative <code className="text-lime-400">int256</code> to
                <code className="text-lime-400"> uint256</code> gives a huge number:
                <code className="text-lime-400"> uint256(int256(-1))</code> = <code className="text-lime-400">type(uint256).max</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10 — Real-World Exploits */}
        <section id="real-world">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Real-World Arithmetic Exploits
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">BEC Token — Overflow ($900M, April 2018)</h3>
              <p className="text-gray-400 text-sm mb-2">
                The batchTransfer function in BEC (Beauty Chain) multiplied user-supplied
                <code className="text-lime-400"> _value × _receivers.length</code> without overflow protection.
                An attacker passed a huge <code className="text-lime-400">_value</code> that, when multiplied,
                overflowed to a small number — passing the balance check — then received the original
                huge value in their account.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Pre-0.8.0 Solidity, no SafeMath on critical multiplication
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Balancer V2 — Rounding Error (Aug 2023)</h3>
              <p className="text-gray-400 text-sm mb-2">
                A rounding error in Balancer&apos;s rate provider integration allowed an attacker to
                manipulate the pool&apos;s internal accounting. By repeatedly joining and exiting a pool
                with carefully calculated amounts, the rounding error accumulated, allowing the attacker
                to extract extra tokens each time.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Rounding direction favored the pool joiner instead of the pool
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Compound cToken — Precision Loss (Sept 2021)</h3>
              <p className="text-gray-400 text-sm mb-2">
                A precision error in Compound&apos;s reward distribution calculation caused excessive
                COMP token distribution. The formula divided before multiplying in certain edge cases,
                losing precision in a way that overpaid rewards. Over $80M in excess COMP was distributed.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Division before multiplication in reward accrual formula
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 — Math Libraries */}
        <section id="libraries">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Math Libraries
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            For complex mathematical operations, use battle-tested libraries instead of writing your own.
            These have been audited extensively and handle edge cases you might miss.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">OpenZeppelin Math</h3>
                <span className="text-xs text-gray-500">@openzeppelin/contracts/utils/math/</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">Math.mulDiv()</code>
                  <span>— 512-bit multiplication then division</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">Math.sqrt()</code>
                  <span>— Integer square root</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">Math.log2()</code>
                  <span>— Base-2 logarithm</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">SafeCast</code>
                  <span>— Safe downcasting (reverts on truncation)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">Solady FixedPointMathLib</h3>
                <span className="text-xs text-gray-500">solady/src/utils/FixedPointMathLib.sol</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">mulWad()</code>
                  <span>— WAD multiplication (gas-optimized)</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">divWad()</code>
                  <span>— WAD division</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">mulDivUp()</code>
                  <span>— mulDiv with ceiling rounding</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-lime-400">expWad()</code>
                  <span>— e^x in WAD precision</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-white font-semibold">PRBMath</h3>
                <span className="text-xs text-gray-500">prb-math/src/</span>
              </div>
              <p className="text-sm text-gray-400">
                Advanced fixed-point math library with signed and unsigned variants (SD59x18, UD60x18).
                Comprehensive operations: exp, ln, log2, pow, sqrt, avg, and more. Type-safe wrappers
                prevent mixing scaled and unscaled values.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Safe Arithmetic Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Basics */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">✅</span> Fundamentals
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Using Solidity 0.8+ (automatic overflow protection)',
                  'SafeMath removed from 0.8+ projects',
                  'Zero-amount checks on deposits/transfers',
                  'Division by zero checks where applicable',
                  'Multiply before divide for precision',
                  'Rounding direction favors the protocol',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Unchecked & Casting */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">⚠️</span> Unchecked &amp; Casting
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'unchecked only where mathematically provable',
                  'No unchecked on user-controlled inputs',
                  'SafeCast for all type downcasting',
                  'Signed-to-unsigned casts validated',
                  'Timestamp fits in chosen integer type',
                  'Token decimal normalization across tokens',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Precision */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-blue-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-400">🔢</span> Precision &amp; Fixed-Point
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Using mulDiv for large multiplication + division',
                  'Consistent precision scale (WAD/RAY/BPS)',
                  'First-depositor / inflation attack mitigated',
                  'Fee calculations have minimum fee or round up',
                  'Cross-token math normalizes decimals first',
                  'Fuzz tests with extreme values (0, 1, max)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Libraries & Testing */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-purple-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">📚</span> Libraries &amp; Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Using audited math libraries (OZ, Solady, PRBMath)',
                  'No custom math for standard operations',
                  'Invariant: sum of balances = total supply',
                  'Fuzz testing arithmetic functions',
                  'Edge case tests: 0, 1, max, boundary values',
                  'Formal verification on core math formulas',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">☐</span>
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
          {['SafeMath', 'Arithmetic', 'Overflow', 'Underflow', 'Solidity 0.8', 'Rounding', 'Precision', 'Fixed-Point', 'WAD', 'Unchecked'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/integer-overflow-underflow" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Integer Overflow / Underflow</h4>
              <p className="text-gray-500 text-sm">Deep dive into overflow vulnerabilities and how they&apos;ve been exploited historically.</p>
            </Link>
            <Link href="/learn/best-practices/gas-optimization-security" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Gas Optimization Without Compromising Security</h4>
              <p className="text-gray-500 text-sm">When unchecked math is safe for gas optimization and when it&apos;s dangerous.</p>
            </Link>
            <Link href="/learn/best-practices/external-call-safety" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Making Safe External Calls</h4>
              <p className="text-gray-500 text-sm">How to safely interact with external contracts and handle return values.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Are your math operations safe?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Arithmetic bugs are subtle and devastating. Rounding errors and precision loss are among
            the top audit findings. Let us verify your calculations are bulletproof.
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
