'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function ExternalCallSafetyPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Making Safe External Calls' },
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
            External Calls
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Making Safe External Calls
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          Every external call in Solidity is a potential attack vector. The target contract can
          execute arbitrary code, reenter your function, consume all forwarded gas, or return
          unexpected data. This guide covers how to safely interact with external contracts,
          handle return values, and defend against malicious callees.
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
            Nov 28, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            External Calls, Interface, Return Values
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#why-dangerous" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. Why External Calls Are Dangerous
            </a>
          </li>
          <li>
            <a href="#call-types" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. Types of External Calls in Solidity
            </a>
          </li>
          <li>
            <a href="#return-values" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Always Check Return Values
            </a>
          </li>
          <li>
            <a href="#low-level" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. Low-Level Calls: call, staticcall, delegatecall
            </a>
          </li>
          <li>
            <a href="#reentrancy" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Reentrancy Through External Calls
            </a>
          </li>
          <li>
            <a href="#gas-limits" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Gas Forwarding &amp; Gas Griefing
            </a>
          </li>
          <li>
            <a href="#erc20-gotchas" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. ERC-20 Transfer Gotchas
            </a>
          </li>
          <li>
            <a href="#untrusted-contracts" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Interacting with Untrusted Contracts
            </a>
          </li>
          <li>
            <a href="#return-bombs" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Return Data Bombs &amp; Phantom Functions
            </a>
          </li>
          <li>
            <a href="#real-world" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Real-World External Call Exploits
            </a>
          </li>
          <li>
            <a href="#defense-patterns" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Defense Patterns &amp; Libraries
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. External Call Safety Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — Why Dangerous */}
        <section id="why-dangerous">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            Why External Calls Are Dangerous
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            When your contract makes an external call, it transfers execution control to another
            contract. That contract can do <em>anything</em> — call back into your contract, call
            other contracts, consume all forwarded gas, or revert. You have no control over what
            happens after you hand off execution.
          </p>

          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-4 text-center">External Call Threat Model</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 rounded-lg bg-red-400/5 border border-red-400/10">
                <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center text-red-400 text-sm font-bold shrink-0">1</div>
                <div>
                  <div className="text-white font-medium text-sm">Reentrancy</div>
                  <div className="text-gray-400 text-sm">Callee calls back into your contract before your state is updated, exploiting stale state.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-orange-400/5 border border-orange-400/10">
                <div className="w-8 h-8 rounded-lg bg-orange-400/10 flex items-center justify-center text-orange-400 text-sm font-bold shrink-0">2</div>
                <div>
                  <div className="text-white font-medium text-sm">Unexpected Revert</div>
                  <div className="text-gray-400 text-sm">Callee reverts, causing your entire transaction to fail — breaking multi-step flows.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center text-yellow-400 text-sm font-bold shrink-0">3</div>
                <div>
                  <div className="text-white font-medium text-sm">Gas Griefing</div>
                  <div className="text-gray-400 text-sm">Callee consumes all forwarded gas with expensive operations, causing your function to run out of gas.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-purple-400/5 border border-purple-400/10">
                <div className="w-8 h-8 rounded-lg bg-purple-400/10 flex items-center justify-center text-purple-400 text-sm font-bold shrink-0">4</div>
                <div>
                  <div className="text-white font-medium text-sm">Return Data Manipulation</div>
                  <div className="text-gray-400 text-sm">Callee returns unexpected data, false success booleans, or oversized return data that inflates memory costs.</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-400/5 border border-blue-400/10">
                <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center text-blue-400 text-sm font-bold shrink-0">5</div>
                <div>
                  <div className="text-white font-medium text-sm">State Manipulation</div>
                  <div className="text-gray-400 text-sm">Callee calls a third contract that changes state your logic depends on (cross-function / cross-contract reentrancy).</div>
                </div>
              </div>
            </div>
          </div>

          <AlertBox type="danger" title="Trust Boundary">
            Every external call crosses a trust boundary. Treat <strong>all</strong> external contracts
            as potentially malicious — even &quot;trusted&quot; contracts can be upgraded, compromised,
            or behave unexpectedly under edge conditions.
          </AlertBox>
        </section>

        {/* Section 2 — Call Types */}
        <section id="call-types">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            Types of External Calls in Solidity
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Solidity offers multiple ways to interact with other contracts. Each has different
            safety properties, gas behavior, and failure modes.
          </p>

          <CodeBlock
            language="solidity"
            filename="CallTypes.sol"
            code={`// 1. HIGH-LEVEL CALL — Typed, auto-reverts on failure
IERC20(token).transfer(to, amount);
// ✅ Compiler checks ABI, auto-decodes return data
// ✅ Reverts if callee reverts (propagates error)
// ⚠️ Does NOT check return value for ERC-20!

// 2. LOW-LEVEL .call() — Raw, does NOT auto-revert
(bool success, bytes memory data) = target.call(
    abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
);
// ⚠️ Returns false on failure — YOU must check!
// ⚠️ No type safety — wrong selector = silent fail
// ✅ Full control over gas forwarding

// 3. .staticcall() — Read-only, cannot modify state
(bool ok, bytes memory result) = target.staticcall(
    abi.encodeWithSelector(IERC20.balanceOf.selector, user)
);
// ✅ Guaranteed no state changes by callee
// ✅ Safe for reading data from untrusted contracts

// 4. .delegatecall() — Executes in YOUR storage context
(bool ok2, bytes memory result2) = implementation.delegatecall(data);
// ❌ EXTREMELY DANGEROUS — callee code runs with YOUR storage
// ❌ Only use in proxy patterns with trusted implementations

// 5. transfer() / send() — Legacy ETH transfer
payable(to).transfer(amount);  // Forwards 2300 gas, reverts on fail
bool sent = payable(to).send(amount); // Forwards 2300 gas, returns bool
// ❌ DEPRECATED — 2300 gas is insufficient for many receivers`}
          />

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 pr-4 text-gray-400 font-medium">Method</th>
                  <th className="text-left py-3 pr-4 text-gray-400 font-medium">Auto-Revert</th>
                  <th className="text-left py-3 pr-4 text-gray-400 font-medium">Gas Control</th>
                  <th className="text-left py-3 pr-4 text-gray-400 font-medium">State Change</th>
                  <th className="text-left py-3 text-gray-400 font-medium">Safety</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-mono text-lime-400">Contract.func()</td>
                  <td className="py-3 pr-4 text-green-400">Yes</td>
                  <td className="py-3 pr-4">All remaining</td>
                  <td className="py-3 pr-4">Yes</td>
                  <td className="py-3 text-green-400">Highest</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-mono text-lime-400">.call()</td>
                  <td className="py-3 pr-4 text-red-400">No</td>
                  <td className="py-3 pr-4">Configurable</td>
                  <td className="py-3 pr-4">Yes</td>
                  <td className="py-3 text-yellow-400">Medium</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-mono text-lime-400">.staticcall()</td>
                  <td className="py-3 pr-4 text-red-400">No</td>
                  <td className="py-3 pr-4">Configurable</td>
                  <td className="py-3 pr-4 text-green-400">No</td>
                  <td className="py-3 text-green-400">High</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 font-mono text-lime-400">.delegatecall()</td>
                  <td className="py-3 pr-4 text-red-400">No</td>
                  <td className="py-3 pr-4">Configurable</td>
                  <td className="py-3 pr-4 text-red-400">Caller&apos;s storage</td>
                  <td className="py-3 text-red-400">Dangerous</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-mono text-lime-400">.transfer()</td>
                  <td className="py-3 pr-4 text-green-400">Yes</td>
                  <td className="py-3 pr-4">2300 fixed</td>
                  <td className="py-3 pr-4">Limited</td>
                  <td className="py-3 text-red-400">Deprecated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3 — Return Values */}
        <section id="return-values">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Always Check Return Values
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The most common external call vulnerability is <strong className="text-white">ignoring the
            return value</strong>. Low-level calls return a boolean indicating success or failure.
            If you don&apos;t check it, a failed call will silently continue execution — your
            contract thinks the operation succeeded when it didn&apos;t.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Unchecked Return Value',
              code: `// LOW-LEVEL: return value ignored
function withdrawETH(uint256 amount) external {
    balances[msg.sender] -= amount;

    // If this fails, balance is reduced but
    // ETH was never sent — funds are LOST
    payable(msg.sender).call{value: amount}("");
}

// ERC-20: return value ignored
function deposit(address token, uint256 amt) external {
    // Some tokens return false on failure
    // instead of reverting
    IERC20(token).transferFrom(
        msg.sender, address(this), amt
    );
    // Balance updated even if transfer failed!
    deposits[msg.sender] += amt;
}

// .send(): return value ignored
function pay(address to, uint256 amt) external {
    payable(to).send(amt);
    // Silently fails if to is a contract
    // that reverts in receive()
}`
            }}
            secure={{
              title: '✅ Properly Checked',
              code: `// LOW-LEVEL: check success boolean
function withdrawETH(uint256 amount) external {
    balances[msg.sender] -= amount;

    (bool success, ) = payable(msg.sender)
        .call{value: amount}("");
    require(success, "ETH transfer failed");
}

// ERC-20: use SafeERC20
import {SafeERC20} from
    "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
using SafeERC20 for IERC20;

function deposit(address token, uint256 amt) external {
    // safeTransferFrom reverts if transfer
    // fails OR returns false
    IERC20(token).safeTransferFrom(
        msg.sender, address(this), amt
    );
    deposits[msg.sender] += amt;
}

// ETH: use .call with require
function pay(address to, uint256 amt) external {
    (bool ok, ) = payable(to)
        .call{value: amt}("");
    require(ok, "Payment failed");
}`
            }}
          />

          <AlertBox type="warning" title="Silent Failures Kill">
            The Solidity compiler does <strong>not</strong> warn you about unchecked low-level call
            return values. This is one of the most common findings in security audits.
            Always check the <code className="text-lime-400">bool success</code> return value.
          </AlertBox>
        </section>

        {/* Section 4 — Low-Level Calls */}
        <section id="low-level">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            Low-Level Calls: call, staticcall, delegatecall
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Low-level calls give you fine-grained control but remove all safety rails. You
            lose type checking, automatic ABI encoding, and automatic revert propagation. Use
            them only when high-level calls aren&apos;t possible or when you need specific gas control.
          </p>

          <CodeBlock
            language="solidity"
            filename="LowLevelSafety.sol"
            code={`// ✅ SAFE: Low-level call with all safety checks
function safeCall(
    address target,
    bytes memory data,
    uint256 value
) internal returns (bytes memory) {
    // 1. Verify target is a contract (not an EOA)
    require(target.code.length > 0, "Not a contract");

    // 2. Make the call and capture return data
    (bool success, bytes memory returnData) =
        target.call{value: value}(data);

    // 3. Check success
    if (!success) {
        // Bubble up the revert reason if available
        if (returnData.length > 0) {
            assembly {
                revert(add(returnData, 32), mload(returnData))
            }
        }
        revert("External call failed");
    }

    return returnData;
}

// ✅ SAFE: staticcall for read-only queries
function safeQuery(address target, bytes memory data)
    internal view returns (bytes memory)
{
    (bool success, bytes memory result) = target.staticcall(data);
    require(success, "Static call failed");
    return result;
}

// ❌ DANGEROUS: delegatecall to untrusted target
// NEVER delegatecall to user-supplied addresses!
function dangerous(address target, bytes memory data) internal {
    // Callee runs with YOUR storage, YOUR balance, YOUR msg.sender
    (bool ok, ) = target.delegatecall(data);
    require(ok);
}`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">When to Use Low-Level Calls</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Sending ETH (use <code className="text-lime-400">.call&#123;value: ...&#125;</code>)</li>
                <li>• Calling contracts without known ABI</li>
                <li>• Custom gas limits for specific calls</li>
                <li>• Forwarding arbitrary calldata (meta-transactions)</li>
                <li>• Proxy pattern implementations</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">When NOT to Use Low-Level Calls</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Calling known contract interfaces (use typed calls)</li>
                <li>• ERC-20 transfers (use SafeERC20)</li>
                <li>• Any case where high-level calls work fine</li>
                <li>• <code className="text-lime-400">delegatecall</code> to any untrusted address</li>
                <li>• When you don&apos;t need gas control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 — Reentrancy */}
        <section id="reentrancy">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Reentrancy Through External Calls
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Every external call is a reentrancy vector. When you call another contract, that
            contract (or a contract it calls) can call <em>back</em> into your contract. If your
            state isn&apos;t fully updated before the call, the reentrant call sees stale state
            and can exploit it.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ External Call Before State Update',
              code: `function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount);

    // EXTERNAL CALL — attacker can reenter!
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok);

    // State updated AFTER the call
    balances[msg.sender] -= amount;
}

// Attack flow:
// 1. Attacker calls withdraw(10)
// 2. Balance check passes (balance = 10)
// 3. ETH sent → triggers attacker's receive()
// 4. Attacker's receive() calls withdraw(10) AGAIN
// 5. Balance check passes AGAIN (still 10!)
// 6. ETH sent again → repeat until drained
// 7. Balance finally updated: 10 - 10 - 10... underflow!`
            }}
            secure={{
              title: '✅ CEI: Update State Before Call',
              code: `import {ReentrancyGuard} from
    "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Safe is ReentrancyGuard {
    function withdraw(uint256 amount)
        external nonReentrant  // Belt
    {
        require(balances[msg.sender] >= amount);

        // ✅ EFFECTS: Update state FIRST
        balances[msg.sender] -= amount;

        // ✅ INTERACTIONS: External call LAST
        (bool ok, ) = msg.sender
            .call{value: amount}("");
        require(ok);
    }
}

// Now if attacker reenters:
// 1. Attacker calls withdraw(10)
// 2. Balance set to 0 BEFORE the call
// 3. ETH sent → triggers attacker's receive()
// 4. Attacker's receive() calls withdraw(10)
// 5. nonReentrant blocks OR balance = 0 → reverts
// 6. Funds are safe ✓`
            }}
          />

          <AlertBox type="info" title="Belt and Suspenders">
            Use <strong>both</strong> the Checks-Effects-Interactions pattern <strong>and</strong> a
            ReentrancyGuard. CEI is the primary defense, and the guard is a safety net that catches
            cross-function reentrancy that CEI alone might miss. See our{' '}
            <Link href="/learn/best-practices/checks-effects-interactions" className="text-lime-400 underline hover:no-underline">
              Checks-Effects-Interactions guide
            </Link>{' '}
            for the full pattern.
          </AlertBox>
        </section>

        {/* Section 6 — Gas Limits */}
        <section id="gas-limits">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Gas Forwarding &amp; Gas Griefing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            By default, <code className="text-lime-400">.call()</code> forwards all remaining gas
            to the callee. A malicious callee can consume all of it, causing your function to run
            out of gas after the call returns. Meanwhile, <code className="text-lime-400">.transfer()</code> and
            <code className="text-lime-400"> .send()</code> forward only 2300 gas — too little for contracts
            with logic in their <code className="text-lime-400">receive()</code> function.
          </p>

          <CodeBlock
            language="solidity"
            filename="GasManagement.sol"
            code={`// ❌ GRIEFABLE: Forwards all gas to untrusted callee
function distribute(address[] calldata recipients, uint256 amount)
    external
{
    for (uint256 i = 0; i < recipients.length;) {
        // Malicious recipient consumes all gas
        // → remaining recipients never get paid
        (bool ok, ) = recipients[i].call{value: amount}("");
        require(ok, "Transfer failed");
        unchecked { ++i; }
    }
}

// ❌ BROKEN: 2300 gas insufficient for many contracts
function payLegacy(address to) external payable {
    payable(to).transfer(msg.value);
    // Fails for contracts with storage writes in receive()
    // Fails for Gnosis Safe, some multisigs, etc.
}

// ✅ SAFE: Forward limited gas for ETH transfers
function payWithGasLimit(address to, uint256 amount) internal {
    (bool ok, ) = payable(to).call{value: amount, gas: 50000}("");
    // 50000 gas is enough for most receive() logic
    // but limits damage from gas griefing
    if (!ok) {
        // Fallback: store payment for pull withdrawal
        pendingWithdrawals[to] += amount;
    }
}

// ✅ BEST: Pull pattern — no external calls during distribution
function distribute(address[] calldata recipients, uint256 amount)
    external
{
    for (uint256 i = 0; i < recipients.length;) {
        // No external call — just record the debt
        pendingWithdrawals[recipients[i]] += amount;
        unchecked { ++i; }
    }
}

function claimPayment() external {
    uint256 amount = pendingWithdrawals[msg.sender];
    require(amount > 0, "Nothing to claim");
    pendingWithdrawals[msg.sender] = 0;
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok, "Claim failed");
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Push vs Pull: When to Use Each</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-red-400/5 border border-red-400/10">
                <div className="text-red-400 font-medium mb-1">Push (Send Immediately)</div>
                <p className="text-gray-400">
                  Risky for batch payments. One failing recipient blocks everyone.
                  Only use for single, known, trusted recipients.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-400/5 border border-green-400/10">
                <div className="text-green-400 font-medium mb-1">Pull (Recipients Withdraw)</div>
                <p className="text-gray-400">
                  Safe for batch distributions. Each recipient claims independently.
                  One failure doesn&apos;t block others. Preferred pattern.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 — ERC-20 Gotchas */}
        <section id="erc20-gotchas">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            ERC-20 Transfer Gotchas
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The ERC-20 standard specifies that <code className="text-lime-400">transfer()</code> and
            <code className="text-lime-400"> transferFrom()</code> should return a boolean. But many
            popular tokens deviate from this standard in ways that break naive integrations.
          </p>

          <div className="space-y-4 mb-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Non-Standard Token Behaviors</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
                  <span className="text-yellow-400 font-bold shrink-0">USDT</span>
                  <div className="text-gray-400">
                    <code className="text-lime-400">transfer()</code> returns <strong className="text-white">void (no return value)</strong> instead of bool.
                    A high-level call expecting a bool will revert because the return data is empty.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-400/5 border border-yellow-400/10">
                  <span className="text-yellow-400 font-bold shrink-0">BNB</span>
                  <div className="text-gray-400">
                    Returns <strong className="text-white">true on failure</strong> instead of reverting.
                    Checking just the return value isn&apos;t enough — you might also need to verify balance changes.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-400/5 border border-orange-400/10">
                  <span className="text-orange-400 font-bold shrink-0">Fee-on-Transfer</span>
                  <div className="text-gray-400">
                    Tokens like STA, PAXG deduct a fee on every transfer. If you send 100, the recipient
                    gets 98. Your contract&apos;s accounting will be wrong if you don&apos;t measure actual received amount.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-400/5 border border-orange-400/10">
                  <span className="text-orange-400 font-bold shrink-0">Rebasing</span>
                  <div className="text-gray-400">
                    Tokens like stETH, AMPL change balances automatically. Your cached balance becomes stale
                    without any transfer event.
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/5 border border-red-400/10">
                  <span className="text-red-400 font-bold shrink-0">Pausable</span>
                  <div className="text-gray-400">
                    USDC, USDT can be paused by their admin, causing all transfers to revert.
                    Your protocol locks up if it depends on these transfers succeeding.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeComparison
            vulnerable={{
              title: '❌ Naive ERC-20 Integration',
              code: `function deposit(
    address token, uint256 amount
) external {
    // Fails with USDT (no return value)
    bool ok = IERC20(token)
        .transferFrom(msg.sender, address(this), amount);
    require(ok, "Transfer failed");

    // Wrong for fee-on-transfer tokens
    deposits[msg.sender] += amount;
    // Actual received may be < amount!
}

function withdraw(
    address token, uint256 amount
) external {
    deposits[msg.sender] -= amount;

    // If token is paused → reverts
    // User's deposit is stuck forever
    IERC20(token).transfer(msg.sender, amount);
}`
            }}
            secure={{
              title: '✅ Robust ERC-20 Integration',
              code: `import {SafeERC20} from
    "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
using SafeERC20 for IERC20;

function deposit(
    address token, uint256 amount
) external {
    // ✅ Works with USDT, BNB, and all tokens
    uint256 before = IERC20(token)
        .balanceOf(address(this));
    IERC20(token).safeTransferFrom(
        msg.sender, address(this), amount
    );
    uint256 received = IERC20(token)
        .balanceOf(address(this)) - before;

    // ✅ Correct for fee-on-transfer tokens
    deposits[msg.sender] += received;
}

function withdraw(
    address token, uint256 amount
) external {
    deposits[msg.sender] -= amount;
    // ✅ safeTransfer handles edge cases
    IERC20(token).safeTransfer(
        msg.sender, amount
    );
}`
            }}
          />

          <AlertBox type="success" title="Use SafeERC20 — Always">
            OpenZeppelin&apos;s <code className="text-lime-400">SafeERC20</code> wraps all ERC-20
            calls to handle missing return values, false returns, and other non-standard behaviors.
            It&apos;s the single most important library for safe external calls in DeFi.
          </AlertBox>
        </section>

        {/* Section 8 — Untrusted Contracts */}
        <section id="untrusted-contracts">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Interacting with Untrusted Contracts
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Protocols that interact with arbitrary user-supplied addresses (DEX aggregators, lending
            with any collateral, NFT marketplaces) need extra defenses. The &quot;contract&quot; at
            a user-supplied address could be anything — including a purpose-built attack contract.
          </p>

          <CodeBlock
            language="solidity"
            filename="UntrustedInteraction.sol"
            code={`// ❌ DANGEROUS: Trusting user-supplied contract
function swapViaRouter(
    address router,       // User-controlled!
    bytes calldata data   // User-controlled!
) external {
    // Attacker supplies their own "router" that:
    // - Steals approved tokens
    // - Reenters this contract
    // - Returns fake swap results
    (bool ok, ) = router.call(data);
    require(ok);
}

// ✅ SAFE: Whitelist trusted contracts
mapping(address => bool) public trustedRouters;

function swapViaRouter(
    address router,
    bytes calldata data
) external {
    require(trustedRouters[router], "Untrusted router");
    (bool ok, bytes memory result) = router.call(data);
    require(ok, "Swap failed");

    // Verify expected outcome
    uint256 received = abi.decode(result, (uint256));
    require(received >= minOutput, "Slippage exceeded");
}

// ✅ SAFE: Verify outcomes, don't trust return data
function executeAction(address target, bytes calldata data) external {
    uint256 balanceBefore = address(this).balance;

    // Execute untrusted call with limited scope
    (bool ok, ) = target.call(data);
    require(ok, "Action failed");

    // Don't trust what the contract says happened
    // Instead, measure the actual outcome
    uint256 balanceAfter = address(this).balance;
    require(balanceAfter >= balanceBefore, "Lost funds");
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Defense Strategies for Untrusted Calls</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">1.</span>
                <span><strong className="text-white">Whitelist:</strong> Only allow calls to pre-approved contract addresses</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">2.</span>
                <span><strong className="text-white">Verify outcomes:</strong> Measure balance changes instead of trusting return data</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">3.</span>
                <span><strong className="text-white">Limit scope:</strong> Use staticcall for read-only queries, gas limits for state-changing calls</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">4.</span>
                <span><strong className="text-white">Restrict calldata:</strong> Validate the function selector being called, don&apos;t pass arbitrary calldata</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400 font-bold">5.</span>
                <span><strong className="text-white">Reentrancy guards:</strong> Always use nonReentrant on functions that make external calls</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Return Bombs & Phantom Functions */}
        <section id="return-bombs">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Return Data Bombs &amp; Phantom Functions
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Two subtle attack vectors involve exploiting how Solidity handles return data from
            external calls. These are less common but can be devastating when exploited.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Return Data Bomb (Returnbomb)</h3>
              <p className="text-gray-400 text-sm mb-4">
                When you use <code className="text-lime-400">.call()</code>, all return data is copied to
                memory. A malicious contract can return megabytes of data, causing your contract
                to run out of gas just from the memory expansion cost — even if you don&apos;t use
                the return data.
              </p>
              <CodeBlock
                language="solidity"
                filename="ReturnBomb.sol"
                code={`// ❌ VULNERABLE: Copies all return data to memory
function execute(address target, bytes calldata data) external {
    (bool ok, bytes memory result) = target.call(data);
    // If target returns 1MB of data:
    // Memory expansion cost ≈ 1MB² / 512 ≈ billions of gas
    // Transaction runs out of gas!
    require(ok);
}

// ✅ SAFE: Limit return data size with assembly
function execute(address target, bytes calldata data) external {
    bool ok;
    assembly {
        // call with output limited to 256 bytes
        ok := call(
            gas(),          // forward all gas
            target,         // target address
            0,              // no ETH
            add(data.offset, 0x20), // input data
            data.length,    // input length
            0x00,           // output offset
            0x100           // output size limit: 256 bytes
        )
    }
    require(ok, "Call failed");
}

// ✅ ALTERNATIVE: Use OpenZeppelin's ExcessivelySafeCall
// or Nomad's excessivelySafeCall library`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Phantom Functions (Calling EOAs)</h3>
              <p className="text-gray-400 text-sm mb-4">
                Calling a function on an EOA (externally owned account) or a contract that doesn&apos;t
                have that function <strong className="text-white">succeeds silently</strong> with
                low-level calls. This is because <code className="text-lime-400">.call()</code> to
                an EOA always returns <code className="text-lime-400">(true, &quot;&quot;)</code>.
              </p>
              <CodeBlock
                language="solidity"
                filename="PhantomFunction.sol"
                code={`// ❌ SILENT SUCCESS: EOA has no code, call succeeds
address eoa = 0x1234...;

(bool ok, bytes memory data) = eoa.call(
    abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
);
// ok = true, data = "" — looks like success!
// But nothing actually happened

// ✅ SAFE: Check that target has code
function safeExternalCall(address target, bytes memory data)
    internal returns (bytes memory)
{
    require(target.code.length > 0, "Target is not a contract");
    (bool ok, bytes memory result) = target.call(data);
    require(ok, "Call failed");
    return result;
}

// ✅ High-level calls are safe — they check code existence
// This reverts if token is an EOA:
IERC20(token).transfer(to, amount);`}
              />
            </div>
          </div>
        </section>

        {/* Section 10 — Real-World Exploits */}
        <section id="real-world">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Real-World External Call Exploits
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">The DAO Hack — $60M (June 2016)</h3>
              <p className="text-gray-400 text-sm mb-2">
                The most famous smart contract exploit. The DAO&apos;s <code className="text-lime-400">splitDAO()</code> function
                sent ETH to a user-controlled address <em>before</em> updating the user&apos;s balance.
                The attacker&apos;s contract reentered through its <code className="text-lime-400">receive()</code> function,
                draining 3.6 million ETH. This exploit led to the Ethereum hard fork that created
                Ethereum Classic.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: External call (ETH transfer) before state update — classic reentrancy
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Wormhole Bridge — $320M (Feb 2022)</h3>
              <p className="text-gray-400 text-sm mb-2">
                The Wormhole bridge&apos;s Solana program failed to verify that a guardian set
                was valid when processing a governance VAA. The attacker spoofed a message
                instructing the bridge to mint 120,000 wrapped ETH on Solana, then bridged it
                back to Ethereum for real ETH. The core issue was insufficient validation
                of external inputs from cross-chain messages.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Unvalidated external input used to authorize a critical operation
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Multichain / Anyswap — $8M (Jan 2022)</h3>
              <p className="text-gray-400 text-sm mb-2">
                The Multichain (formerly Anyswap) router had a vulnerability where unchecked return
                values from token transfers allowed an attacker to steal funds. The router called
                <code className="text-lime-400"> transferFrom()</code> on tokens with non-standard return
                behavior, and the lack of SafeERC20 meant failed transfers were silently ignored.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Unchecked return value from ERC-20 transferFrom — should have used SafeERC20
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">King of the Ether — DoS (2016)</h3>
              <p className="text-gray-400 text-sm mb-2">
                An early example of gas griefing / DoS via external call. The contract used
                <code className="text-lime-400"> .transfer()</code> to send ETH to the previous &quot;king.&quot;
                When a contract that always reverted became king, nobody could dethrone them
                because the refund transfer always failed, blocking the entire function.
              </p>
              <div className="text-xs text-gray-600">
                Root cause: Push payment pattern with .transfer() — vulnerable to DoS by receiver
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 — Defense Patterns */}
        <section id="defense-patterns">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Defense Patterns &amp; Libraries
          </h2>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">1. Checks-Effects-Interactions (CEI)</h3>
              <p className="text-gray-400 text-sm mb-3">
                The foundational defense pattern. Structure every function as:
                <strong className="text-white"> validate → update state → call external contracts</strong>.
              </p>
              <CodeBlock
                language="solidity"
                filename="CEIPattern.sol"
                code={`function process(uint256 id) external nonReentrant {
    // CHECKS: All validation first
    require(orders[id].owner == msg.sender, "Not owner");
    require(orders[id].status == Status.Active, "Not active");
    uint256 amount = orders[id].amount;

    // EFFECTS: All state changes second
    orders[id].status = Status.Completed;
    orders[id].completedAt = block.timestamp;
    balances[msg.sender] -= amount;

    // INTERACTIONS: External calls last
    IERC20(token).safeTransfer(msg.sender, amount);
    emit OrderCompleted(id, msg.sender, amount);
}`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">2. Pull Over Push</h3>
              <p className="text-gray-400 text-sm mb-3">
                Instead of sending payments directly, record debts and let recipients withdraw.
                This eliminates DoS risks from failing external calls.
              </p>
              <CodeBlock
                language="solidity"
                filename="PullPayment.sol"
                code={`import {PullPayment} from
    "@openzeppelin/contracts/security/PullPayment.sol";

contract Auction is PullPayment {
    function bid() external payable {
        require(msg.value > highestBid, "Bid too low");

        address prevBidder = highestBidder;
        uint256 prevBid = highestBid;

        highestBidder = msg.sender;
        highestBid = msg.value;

        if (prevBidder != address(0)) {
            // ✅ Records refund instead of sending it
            // Cannot DoS the auction!
            _asyncTransfer(prevBidder, prevBid);
        }
    }

    // Previous bidders call withdrawPayments() to claim
}`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">3. Essential Libraries</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <code className="text-lime-400">SafeERC20</code>
                  <p className="text-gray-400 text-xs mt-1">Handles all ERC-20 edge cases: missing return values, false returns, non-standard tokens.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <code className="text-lime-400">ReentrancyGuard</code>
                  <p className="text-gray-400 text-xs mt-1">Mutex lock preventing reentrant calls. Apply <code className="text-lime-400">nonReentrant</code> to external functions.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <code className="text-lime-400">Address.sendValue()</code>
                  <p className="text-gray-400 text-xs mt-1">Safely sends ETH using .call(), reverts on failure, verifies balance beforehand.</p>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <code className="text-lime-400">Address.functionCall()</code>
                  <p className="text-gray-400 text-xs mt-1">Low-level call with code existence check, return value verification, and error bubbling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            External Call Safety Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Return Values */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">✅</span> Return Values
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'All .call() return values checked',
                  'No .send() used (use .call() instead)',
                  'No .transfer() used (deprecated)',
                  'SafeERC20 for all token transfers',
                  'Balance-before/after for fee-on-transfer tokens',
                  'Contract existence checked before low-level calls',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reentrancy */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">🔒</span> Reentrancy Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'CEI pattern followed in all functions',
                  'ReentrancyGuard on state-changing externals',
                  'Cross-function reentrancy considered',
                  'Cross-contract reentrancy considered (shared state)',
                  'Read-only reentrancy checked (view functions)',
                  'State fully updated before any external call',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gas & DoS */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-blue-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-400">⛽</span> Gas &amp; DoS Prevention
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Gas limits on calls to untrusted contracts',
                  'Pull pattern for batch distributions',
                  'Loops bounded by maximum iteration count',
                  'Return data size limited for low-level calls',
                  'Fallback for failed payments (pending withdrawals)',
                  'No single recipient can DoS others',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust & Validation */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-purple-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">🛡️</span> Trust &amp; Validation
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'External contract addresses whitelisted or verified',
                  'No delegatecall to user-supplied addresses',
                  'Outcomes verified (balance changes, not return data)',
                  'Function selectors validated for arbitrary calls',
                  'Non-standard token behaviors handled',
                  'Token decimal differences normalized',
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
          {['External Calls', 'Interface', 'Return Values', 'SafeERC20', 'Reentrancy', 'Low-Level Calls', 'Gas Griefing', 'Pull Pattern', 'delegatecall', 'CEI'].map((tag) => (
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
            <Link href="/learn/best-practices/checks-effects-interactions" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Checks-Effects-Interactions Pattern</h4>
              <p className="text-gray-500 text-sm">The foundational pattern for preventing reentrancy through proper function structure.</p>
            </Link>
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Reentrancy Attacks</h4>
              <p className="text-gray-500 text-sm">Deep dive into reentrancy vulnerabilities — the #1 cause of smart contract losses.</p>
            </Link>
            <Link href="/learn/vulnerabilities/unchecked-return-values" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Unchecked Return Values</h4>
              <p className="text-gray-500 text-sm">How ignoring return values leads to silent failures and fund loss.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Are your external calls safe?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            External call vulnerabilities account for the majority of DeFi exploits.
            From reentrancy to unchecked returns, our audit catches them all.
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
