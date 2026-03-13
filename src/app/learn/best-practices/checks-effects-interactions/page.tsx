'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function ChecksEffectsInteractionsPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Checks-Effects-Interactions' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Beginner
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30">
            Best Practice
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Essential Pattern
          </span>
        </div>

        <h1>Checks-Effects-Interactions Pattern</h1>

        <p className="text-lg text-gray-400 mt-4 max-w-3xl">
          The fundamental design pattern for writing secure Solidity smart contracts. Master this pattern
          to prevent reentrancy attacks and ensure safe state management in every function you write.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5 min read
          </span>
          <span>•</span>
          <span>Updated Dec 20, 2024</span>
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
          <li><a href="#overview" className="toc-link hover:text-lime-400">Overview</a></li>
          <li><a href="#the-three-phases" className="toc-link hover:text-lime-400">The Three Phases Explained</a></li>
          <li><a href="#why-order-matters" className="toc-link hover:text-lime-400">Why Order Matters</a></li>
          <li><a href="#basic-example" className="toc-link hover:text-lime-400">Basic Example: Withdrawal Function</a></li>
          <li><a href="#advanced-examples" className="toc-link hover:text-lime-400">Advanced Examples</a></li>
          <li><a href="#common-mistakes" className="toc-link hover:text-lime-400">Common Mistakes</a></li>
          <li><a href="#cei-with-reentrancyguard" className="toc-link hover:text-lime-400">CEI + ReentrancyGuard</a></li>
          <li><a href="#multi-contract" className="toc-link hover:text-lime-400">CEI in Multi-Contract Systems</a></li>
          <li><a href="#erc20-transfers" className="toc-link hover:text-lime-400">CEI with ERC-20 Transfers</a></li>
          <li><a href="#checklist" className="toc-link hover:text-lime-400">Quick Reference Checklist</a></li>
          <li><a href="#further-reading" className="toc-link hover:text-lime-400">Further Reading</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        {/* Overview */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            The <strong>Checks-Effects-Interactions</strong> (CEI) pattern is the single most important design
            pattern in Solidity development. It prescribes a strict ordering for the operations inside any
            function that modifies state and interacts with external contracts or addresses.
          </p>
          <p>
            By following CEI, you ensure that your contract&apos;s internal state is always consistent
            before any external call is made — making it impossible for a re-entrant call to observe or
            exploit an intermediate, inconsistent state.
          </p>

          <AlertBox type="info" title="Why This Pattern Exists">
            In Solidity, any external call (sending ETH, calling another contract) hands over execution control
            to the callee. If your contract&apos;s state is not fully updated before that handoff, the callee
            can call back into your contract and find stale, exploitable state. The CEI pattern eliminates
            this entire class of vulnerability.
          </AlertBox>
        </section>

        {/* The Three Phases */}
        <section id="the-three-phases">
          <h2>The Three Phases Explained</h2>

          <div className="grid gap-6 my-8">
            {/* Phase 1: Checks */}
            <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-semibold text-blue-400 !mt-0 !mb-0">Checks</h3>
              </div>
              <p className="text-gray-300 mb-3">
                Validate <strong>all preconditions</strong> at the very top of the function. This includes
                access control, input validation, balance requirements, and any business-logic assertions.
              </p>
              <div className="font-mono text-sm text-gray-400 bg-black/30 rounded-lg p-3 space-y-1">
                <p><span className="text-blue-400">require</span>(msg.sender == owner, <span className="text-green-400">&quot;Not authorized&quot;</span>);</p>
                <p><span className="text-blue-400">require</span>(amount {'>'} 0, <span className="text-green-400">&quot;Amount must be positive&quot;</span>);</p>
                <p><span className="text-blue-400">require</span>(balances[msg.sender] {'>='} amount, <span className="text-green-400">&quot;Insufficient balance&quot;</span>);</p>
              </div>
            </div>

            {/* Phase 2: Effects */}
            <div className="p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <span className="text-yellow-400 font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 !mt-0 !mb-0">Effects</h3>
              </div>
              <p className="text-gray-300 mb-3">
                Apply <strong>all state changes</strong> to your contract&apos;s storage. Debit balances, flip
                flags, update mappings, increment counters — anything that modifies your contract&apos;s state
                must happen here, <em>before</em> any external call.
              </p>
              <div className="font-mono text-sm text-gray-400 bg-black/30 rounded-lg p-3 space-y-1">
                <p>balances[msg.sender] -= amount;</p>
                <p>totalSupply -= amount;</p>
                <p>hasWithdrawn[msg.sender] = <span className="text-blue-400">true</span>;</p>
              </div>
            </div>

            {/* Phase 3: Interactions */}
            <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-semibold text-green-400 !mt-0 !mb-0">Interactions</h3>
              </div>
              <p className="text-gray-300 mb-3">
                <strong>External calls go last.</strong> Sending ETH, calling other contracts, or invoking
                token transfers should always be the final operations. Even if the callee re-enters your
                function, all state is already up to date, so checks will fail and the attack is stopped.
              </p>
              <div className="font-mono text-sm text-gray-400 bg-black/30 rounded-lg p-3 space-y-1">
                <p>(<span className="text-blue-400">bool</span> success, ) = msg.sender.<span className="text-yellow-400">call</span>{'{'}value: amount{'}'}(<span className="text-green-400">&quot;&quot;</span>);</p>
                <p><span className="text-blue-400">require</span>(success, <span className="text-green-400">&quot;Transfer failed&quot;</span>);</p>
              </div>
            </div>
          </div>

          <AlertBox type="success" title="Mental Model">
            Think of it like a bank transaction: first the teller <strong>verifies your identity</strong> (Checks),
            then <strong>debits your account in the ledger</strong> (Effects), and only then <strong>hands you
            the cash</strong> (Interactions). You&apos;d never hand someone cash before recording the
            withdrawal — the same logic applies to smart contracts.
          </AlertBox>
        </section>

        {/* Why Order Matters */}
        <section id="why-order-matters">
          <h2>Why Order Matters</h2>
          <p>
            When a Solidity function makes an external call (e.g. sending ETH with <code>.call{'{'}value: ...{'}'}</code>),
            execution control passes to the recipient. If that recipient is a malicious contract, it
            can call back into your function — or any other public function on your contract. This is
            known as <strong>reentrancy</strong>.
          </p>
          <p>
            If your state has not been updated before the external call, the re-entrant call sees the
            <em> old</em> values. That means balance checks still pass, allowing the attacker to
            drain funds repeatedly.
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <h4 className="text-red-400 font-semibold mb-4">🔄 Reentrancy Attack Flow (Without CEI)</h4>
            <div className="font-mono text-sm text-gray-300 space-y-2">
              <p>1. Attacker calls <span className="text-yellow-400">withdraw(1 ETH)</span></p>
              <p>2. Contract checks balance → <span className="text-green-400">1 ETH ✓ passes</span></p>
              <p className="text-red-400">3. Contract sends 1 ETH to attacker → ⚠️ triggers receive()</p>
              <p className="text-red-400">4. Attacker&apos;s receive() calls <span className="text-yellow-400">withdraw(1 ETH)</span> again</p>
              <p>5. Contract checks balance → <span className="text-green-400">still 1 ETH ✓ (not yet updated!)</span></p>
              <p className="text-red-400">6. Contract sends <em>another</em> 1 ETH → repeat</p>
              <p>7. Eventually: balance set to 0, but N × 1 ETH already sent</p>
            </div>
          </div>

          <div className="my-8 p-6 bg-gradient-to-r from-green-500/10 to-transparent rounded-xl border border-green-500/20">
            <h4 className="text-green-400 font-semibold mb-4">✅ Safe Flow (With CEI)</h4>
            <div className="font-mono text-sm text-gray-300 space-y-2">
              <p>1. Attacker calls <span className="text-yellow-400">withdraw(1 ETH)</span></p>
              <p>2. Contract checks balance → <span className="text-green-400">1 ETH ✓ passes</span></p>
              <p>3. Contract sets balance to <span className="text-lime-400">0</span> (Effects)</p>
              <p>4. Contract sends 1 ETH → triggers receive()</p>
              <p>5. Attacker&apos;s receive() calls <span className="text-yellow-400">withdraw(1 ETH)</span> again</p>
              <p>6. Contract checks balance → <span className="text-red-400">0 ETH ✗ REVERTS</span></p>
              <p className="text-green-400 font-medium">Attack stopped. Only 1 ETH withdrawn.</p>
            </div>
          </div>
        </section>

        {/* Basic Example */}
        <section id="basic-example">
          <h2>Basic Example: Withdrawal Function</h2>
          <p>
            The classic illustration of CEI is a simple ETH vault with deposit and withdrawal
            functionality. Let&apos;s compare the vulnerable version with the secure version:
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Vulnerable — Interactions Before Effects',
              code: `function withdraw() external {
    uint256 bal = balances[msg.sender];
    require(bal > 0, "Nothing to withdraw");

    // INTERACTION first — danger!
    (bool ok, ) = msg.sender.call{value: bal}("");
    require(ok, "Transfer failed");

    // EFFECT after — too late
    balances[msg.sender] = 0;
}`
            }}
            secure={{
              title: '✅ Secure — Checks-Effects-Interactions',
              code: `function withdraw() external {
    // 1. CHECKS
    uint256 bal = balances[msg.sender];
    require(bal > 0, "Nothing to withdraw");

    // 2. EFFECTS
    balances[msg.sender] = 0;

    // 3. INTERACTIONS
    (bool ok, ) = msg.sender.call{value: bal}("");
    require(ok, "Transfer failed");
}`
            }}
          />

          <p>
            Notice the only difference is the <strong>order of operations</strong>. The secure version
            zeroes the balance <em>before</em> sending ETH, so even if the recipient re-enters, the
            balance check at the top will fail.
          </p>

          <AlertBox type="warning" title="A Subtle Detail">
            If the external call fails and reverts, the entire transaction reverts — including your state
            changes. This means the balance deduction is also rolled back safely. You don&apos;t lose the
            user&apos;s funds if the transfer fails.
          </AlertBox>
        </section>

        {/* Advanced Examples */}
        <section id="advanced-examples">
          <h2>Advanced Examples</h2>

          <h3>Token Swap with CEI</h3>
          <p>
            CEI applies to more than simple ETH withdrawals. Here&apos;s a token swap function where two
            external calls must be made:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenSwap {
    using SafeERC20 for IERC20;

    IERC20 public immutable tokenA;
    IERC20 public immutable tokenB;
    uint256 public rate; // tokenB per tokenA (scaled by 1e18)

    mapping(address => uint256) public depositsA;

    constructor(address _tokenA, address _tokenB, uint256 _rate) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        rate = _rate;
    }

    function swap(uint256 amountA) external {
        // ──── 1. CHECKS ────
        require(amountA > 0, "Amount must be > 0");
        uint256 amountB = (amountA * rate) / 1e18;
        require(amountB > 0, "Output too small");
        require(
            tokenB.balanceOf(address(this)) >= amountB,
            "Insufficient liquidity"
        );

        // ──── 2. EFFECTS ────
        depositsA[msg.sender] += amountA;

        // ──── 3. INTERACTIONS ────
        // Transfer tokenA from user to this contract
        tokenA.safeTransferFrom(msg.sender, address(this), amountA);
        // Transfer tokenB from this contract to user
        tokenB.safeTransfer(msg.sender, amountB);
    }
}`}
            language="solidity"
            filename="TokenSwap.sol"
          />

          <h3>Staking Contract with CEI</h3>
          <p>
            Here&apos;s a more complex example — a staking contract where users deposit tokens, accrue
            rewards, and claim them:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Staking {
    using SafeERC20 for IERC20;

    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardToken;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public rewardDebt;
    mapping(address => uint256) public pendingRewards;
    uint256 public totalStaked;
    uint256 public rewardPerToken;

    function claimRewards() external {
        // ──── 1. CHECKS ────
        _updateRewards(msg.sender);
        uint256 reward = pendingRewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        require(
            rewardToken.balanceOf(address(this)) >= reward,
            "Insufficient reward balance"
        );

        // ──── 2. EFFECTS ────
        pendingRewards[msg.sender] = 0;
        rewardDebt[msg.sender] = stakedBalance[msg.sender] * rewardPerToken;

        // ──── 3. INTERACTIONS ────
        rewardToken.safeTransfer(msg.sender, reward);

        emit RewardsClaimed(msg.sender, reward);
    }

    function unstake(uint256 amount) external {
        // ──── 1. CHECKS ────
        require(amount > 0, "Cannot unstake 0");
        require(stakedBalance[msg.sender] >= amount, "Insufficient stake");
        _updateRewards(msg.sender);

        // ──── 2. EFFECTS ────
        stakedBalance[msg.sender] -= amount;
        totalStaked -= amount;

        // ──── 3. INTERACTIONS ────
        stakingToken.safeTransfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function _updateRewards(address account) internal {
        // Pure state computation — no external calls
        if (stakedBalance[account] > 0) {
            pendingRewards[account] +=
                (stakedBalance[account] * rewardPerToken) - rewardDebt[account];
        }
        rewardDebt[account] = stakedBalance[account] * rewardPerToken;
    }

    event RewardsClaimed(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
}`}
            language="solidity"
            filename="Staking.sol"
          />

          <AlertBox type="info" title="Events and CEI">
            Where should you place event emissions? Events are <em>not</em> external calls, so they don&apos;t
            break CEI. However, it&apos;s considered best practice to emit events in the <strong>Effects</strong>{' '}
            phase (after state changes, before interactions) so that the log accurately reflects the new state.
            Some codebases emit after interactions for readability — both approaches are safe.
          </AlertBox>
        </section>

        {/* Common Mistakes */}
        <section id="common-mistakes">
          <h2>Common Mistakes</h2>
          <p>
            Even developers who know about CEI can fall into these traps:
          </p>

          <div className="space-y-6 my-8">
            {/* Mistake 1 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Mistake 1: Updating state after <em>some</em> interactions
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                Developers sometimes move only part of the state update before the external call, leaving some
                effects after. Even a <em>single</em> stale variable is enough for an attacker to exploit.
              </p>
              <CodeBlock
                code={`function withdrawAndRecord() external {
    uint256 bal = balances[msg.sender];
    require(bal > 0);

    balances[msg.sender] = 0; // ✅ Updated

    (bool ok, ) = msg.sender.call{value: bal}("");
    require(ok);

    // ❌ This state update is AFTER the interaction
    lastWithdrawalTime[msg.sender] = block.timestamp;
    withdrawalCount[msg.sender] += 1;
}`}
                language="solidity"
                filename="PartialCEI.sol"
              />
              <p className="text-gray-400 text-sm mt-3">
                <strong>Fix:</strong> Move <code>lastWithdrawalTime</code> and <code>withdrawalCount</code> updates
                above the external call, alongside the balance update.
              </p>
            </div>

            {/* Mistake 2 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Mistake 2: Hidden external calls
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                Some operations look like internal logic but actually perform external calls under the hood.
                ERC-777 tokens, for example, invoke <code>tokensReceived</code> hooks on the recipient.
              </p>
              <div className="font-mono text-sm text-gray-400 bg-black/30 rounded-lg p-3 space-y-1">
                <p><span className="text-gray-500">{'// Looks safe, but ERC-777 tokens can trigger callbacks'}</span></p>
                <p>IERC20(token).<span className="text-yellow-400">transfer</span>(to, amount);</p>
                <p></p>
                <p><span className="text-gray-500">{'// Also triggers callbacks on some token standards'}</span></p>
                <p>IERC721(nft).<span className="text-yellow-400">safeTransferFrom</span>(from, to, id);</p>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                <strong>Fix:</strong> Treat <em>any</em> token transfer as an interaction, regardless of whether
                it&apos;s a simple ERC-20 or a more complex standard with hooks.
              </p>
            </div>

            {/* Mistake 3 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Mistake 3: Cross-function reentrancy
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                CEI protects the function it&apos;s applied to, but an attacker can re-enter through a
                <em> different</em> function that reads the stale state. This is called cross-function reentrancy.
              </p>
              <CodeBlock
                code={`// Function A follows CEI...
function withdraw() external {
    uint256 bal = balances[msg.sender];
    require(bal > 0);
    balances[msg.sender] = 0;
    (bool ok, ) = msg.sender.call{value: bal}("");
    require(ok);
}

// ...but Function B reads shared state
function getVotingPower(address user) external view returns (uint256) {
    // If user re-enters here during withdraw(),
    // balances[user] is already 0 — possibly undesirable
    // if voting power should reflect "pre-withdrawal" state
    return balances[user];
}

// More dangerous: a function that writes shared state
function transfer(address to, uint256 amount) external {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    balances[to] += amount; // attacker could manipulate this
}`}
                language="solidity"
                filename="CrossFunction.sol"
              />
              <p className="text-gray-400 text-sm mt-3">
                <strong>Fix:</strong> Use a reentrancy guard (<code>nonReentrant</code>) on all functions that share
                state, not just the one performing the external call.
              </p>
            </div>

            {/* Mistake 4 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Mistake 4: Relying on <code>transfer()</code> or <code>send()</code>
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                Some developers assume <code>.transfer()</code> and <code>.send()</code> are safe because they
                forward only 2300 gas — not enough for reentrancy. But after EIP-1884 and the Istanbul hard
                fork, gas costs changed, and this assumption is unreliable.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Fix:</strong> Always use <code>.call{'{'}value: ...{'}'}</code> with CEI, rather than relying
                on gas limits as a security mechanism. Gas costs can change in future forks.
              </p>
            </div>
          </div>
        </section>

        {/* CEI + ReentrancyGuard */}
        <section id="cei-with-reentrancyguard">
          <h2>CEI + ReentrancyGuard: Defense in Depth</h2>
          <p>
            While CEI alone prevents most reentrancy attacks, combining it with OpenZeppelin&apos;s{' '}
            <code>ReentrancyGuard</code> provides <strong>defense in depth</strong>. If a future refactor
            accidentally breaks the CEI order, the guard still catches the re-entrant call.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SecureVault is ReentrancyGuard {
    mapping(address => uint256) public balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function deposit() external payable {
        // CHECKS
        require(msg.value > 0, "Must deposit something");

        // EFFECTS
        balances[msg.sender] += msg.value;

        emit Deposited(msg.sender, msg.value);
        // No interactions needed
    }

    function withdraw(uint256 amount) external nonReentrant {
        // ──── 1. CHECKS ────
        require(amount > 0, "Amount must be > 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        // ──── 2. EFFECTS ────
        balances[msg.sender] -= amount;

        emit Withdrawn(msg.sender, amount);

        // ──── 3. INTERACTIONS ────
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "ETH transfer failed");
    }

    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }
}`}
            language="solidity"
            filename="SecureVault.sol"
          />

          <AlertBox type="success" title="Best Practice">
            Always apply <strong>both</strong> CEI ordering <strong>and</strong> the <code>nonReentrant</code> modifier
            to any function that performs an external call. CEI is the primary defense; the ReentrancyGuard is a
            safety net for human error.
          </AlertBox>

          <h3>How ReentrancyGuard Works Under the Hood</h3>
          <p>
            The guard uses a simple state variable (a mutex lock) that blocks re-entrant calls:
          </p>

          <CodeBlock
            code={`// Simplified version of OpenZeppelin's ReentrancyGuard
abstract contract SimpleReentrancyGuard {
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;
    uint256 private _status = NOT_ENTERED;

    modifier nonReentrant() {
        // CHECKS: Ensure we're not already in an external call
        require(_status != ENTERED, "ReentrancyGuard: reentrant call");

        // EFFECTS: Lock before execution
        _status = ENTERED;

        _; // Execute the function body

        // Unlock after execution
        _status = NOT_ENTERED;
    }
}

// Note: Uses uint256 instead of bool because
// changing from 1→2 costs less gas than 0→1
// (no cold-to-warm SSTORE cost for non-zero to non-zero)`}
            language="solidity"
            filename="SimpleReentrancyGuard.sol"
          />
        </section>

        {/* Multi-Contract */}
        <section id="multi-contract">
          <h2>CEI in Multi-Contract Systems</h2>
          <p>
            In DeFi protocols with multiple interacting contracts (Router, Pool, Oracle, etc.),
            cross-contract reentrancy is a real threat. CEI must be enforced at the system level, not just
            within individual contracts.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/// @notice Global reentrancy lock shared across contracts
contract GlobalLock {
    uint256 private _locked = 1;

    modifier globalNonReentrant() {
        require(_locked == 1, "Locked");
        _locked = 2;
        _;
        _locked = 1;
    }

    function isLocked() external view returns (bool) {
        return _locked == 2;
    }
}

contract Pool {
    GlobalLock public immutable lock;
    mapping(address => uint256) public liquidity;

    constructor(address _lock) {
        lock = GlobalLock(_lock);
    }

    function removeLiquidity(uint256 amount)
        external
    {
        // Ensure no other contract in the system is mid-execution
        require(!lock.isLocked(), "System locked");

        // 1. CHECKS
        require(liquidity[msg.sender] >= amount, "Insufficient");

        // 2. EFFECTS
        liquidity[msg.sender] -= amount;

        // 3. INTERACTIONS
        // ... transfer tokens to user
    }
}`}
            language="solidity"
            filename="GlobalLock.sol"
          />

          <AlertBox type="warning" title="Read-Only Reentrancy">
            Even <code>view</code> functions can be dangerous during reentrancy. If an external protocol reads
            your contract&apos;s <code>totalSupply</code> or <code>getPrice()</code> during a re-entrant call, it may
            get stale data. Protocols like Curve were exploited this way. Consider exposing a{' '}
            <code>isLocked()</code> check that external integrators can verify.
          </AlertBox>
        </section>

        {/* ERC-20 Transfers */}
        <section id="erc20-transfers">
          <h2>CEI with ERC-20 Transfers</h2>
          <p>
            When your contract interacts with ERC-20 tokens, remember that <code>transfer</code> and
            <code>transferFrom</code> are external calls. Some token standards (ERC-777, ERC-1155) add
            callback hooks that make reentrancy even more likely.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenVault is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable token;
    mapping(address => uint256) public deposits;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 amount) external nonReentrant {
        // 1. CHECKS
        require(amount > 0, "Amount must be > 0");

        // 2. EFFECTS — update state BEFORE the transferFrom
        deposits[msg.sender] += amount;

        // 3. INTERACTIONS
        token.safeTransferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 amount) external nonReentrant {
        // 1. CHECKS
        require(amount > 0, "Amount must be > 0");
        require(deposits[msg.sender] >= amount, "Insufficient");

        // 2. EFFECTS — debit BEFORE the transfer
        deposits[msg.sender] -= amount;

        // 3. INTERACTIONS
        token.safeTransfer(msg.sender, amount);
    }
}`}
            language="solidity"
            filename="TokenVault.sol"
          />

          <AlertBox type="info" title="Why SafeERC20?">
            Not all ERC-20 tokens return <code>true</code> on success (looking at you, USDT). OpenZeppelin&apos;s
            <code>SafeERC20</code> wraps transfers to revert on failure regardless. Always use <code>safeTransfer</code>
            and <code>safeTransferFrom</code> instead of the raw <code>transfer</code>/<code>transferFrom</code>.
          </AlertBox>
        </section>

        {/* Checklist */}
        <section id="checklist">
          <h2>Quick Reference Checklist</h2>
          <p>
            Use this checklist when writing or reviewing any function that modifies state:
          </p>

          <div className="my-8 p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">All <code>require</code>/<code>revert</code> statements come first</p>
                  <p className="text-gray-500 text-sm">Input validation, access control, balance checks</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">All state changes happen before any external call</p>
                  <p className="text-gray-500 text-sm">Mapping updates, balance adjustments, flag toggles</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">External calls are the last operations</p>
                  <p className="text-gray-500 text-sm">ETH transfers, token transfers, cross-contract calls</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium"><code>nonReentrant</code> modifier applied as a safety net</p>
                  <p className="text-gray-500 text-sm">Defense in depth — catches human error</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Token transfers treated as external calls</p>
                  <p className="text-gray-500 text-sm">ERC-20, ERC-777, ERC-721, ERC-1155 — all have hook risks</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Cross-function reentrancy considered</p>
                  <p className="text-gray-500 text-sm">All functions sharing state have reentrancy protection</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Read-only reentrancy risks assessed</p>
                  <p className="text-gray-500 text-sm">View functions returning accurate data during callbacks</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Further Reading */}
        <section id="further-reading">
          <h2>Further Reading</h2>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <a
              href="https://docs.soliditylang.org/en/latest/security-considerations.html"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                Solidity Security Considerations
              </h4>
              <p className="text-sm text-gray-500 mt-1">Official Solidity docs on security best practices</p>
            </a>
            <a
              href="https://docs.openzeppelin.com/contracts/5.x/api/utils#ReentrancyGuard"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                OpenZeppelin ReentrancyGuard
              </h4>
              <p className="text-sm text-gray-500 mt-1">Reference implementation and usage guide</p>
            </a>
            <a
              href="https://swcregistry.io/docs/SWC-107/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                SWC-107: Reentrancy
              </h4>
              <p className="text-sm text-gray-500 mt-1">Smart Contract Weakness Classification entry</p>
            </a>
            <Link
              href="/learn/vulnerabilities/reentrancy-attack"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                Understanding Reentrancy Attacks
              </h4>
              <p className="text-sm text-gray-500 mt-1">Our in-depth vulnerability guide on reentrancy</p>
            </Link>
          </div>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h4 className="text-sm text-gray-500 mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {['CEI', 'Reentrancy', 'Solidity', 'Design Pattern', 'Security', 'Best Practice'].map((tag) => (
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
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Understanding Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">The vulnerability that CEI was designed to prevent</p>
            </Link>
            <Link href="/learn/best-practices/secure-access-control" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Implementing Secure Access Control</h4>
              <p className="text-sm text-gray-500 mt-1">Role-based access control best practices</p>
            </Link>
            <Link href="/learn/best-practices/external-call-safety" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Making Safe External Calls</h4>
              <p className="text-sm text-gray-500 mt-1">Safely interacting with external contracts</p>
            </Link>
            <Link href="/learn/best-practices/emergency-procedures" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Emergency Stop Mechanisms</h4>
              <p className="text-sm text-gray-500 mt-1">Circuit breakers and pause functionality</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Want to verify your contracts follow CEI?</h3>
              <p className="text-gray-400">
                Get a free automated audit from Hexific. Our AI scanner checks for CEI violations,
                reentrancy risks, and 200+ other vulnerability patterns.
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors whitespace-nowrap"
            >
              Free Audit →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
