'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function AuditPreparationGuidePage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Audit Preparation Guide' },
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
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            Pre-Audit
          </span>
        </div>

        <h1>Preparing Your Protocol for Audit</h1>

        <p className="text-lg text-gray-400 mt-4 max-w-3xl">
          A complete checklist and guide for getting your smart contracts ready for a professional security
          audit. Proper preparation can reduce audit costs by up to 50%, shorten timelines, and maximize
          the number of real vulnerabilities found.
        </p>

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

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 text-center">
          <div className="text-2xl font-bold text-lime-400">50%</div>
          <div className="text-xs text-gray-500 mt-1">Cost reduction with proper prep</div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 text-center">
          <div className="text-2xl font-bold text-lime-400">2-4 wks</div>
          <div className="text-xs text-gray-500 mt-1">Recommended prep time</div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 text-center">
          <div className="text-2xl font-bold text-red-400">70%</div>
          <div className="text-xs text-gray-500 mt-1">Of bugs are preventable pre-audit</div>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 text-center">
          <div className="text-2xl font-bold text-yellow-400">90%+</div>
          <div className="text-xs text-gray-500 mt-1">Test coverage target</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#overview" className="toc-link hover:text-lime-400">Overview</a></li>
          <li><a href="#timeline" className="toc-link hover:text-lime-400">Audit Preparation Timeline</a></li>
          <li><a href="#code-freeze" className="toc-link hover:text-lime-400">Phase 1: Code Freeze &amp; Cleanup</a></li>
          <li><a href="#documentation" className="toc-link hover:text-lime-400">Phase 2: Documentation</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Phase 3: Testing &amp; Coverage</a></li>
          <li><a href="#internal-review" className="toc-link hover:text-lime-400">Phase 4: Internal Security Review</a></li>
          <li><a href="#automated-tools" className="toc-link hover:text-lime-400">Phase 5: Automated Security Tools</a></li>
          <li><a href="#audit-package" className="toc-link hover:text-lime-400">Phase 6: The Audit Package</a></li>
          <li><a href="#choosing-auditor" className="toc-link hover:text-lime-400">Choosing an Auditor</a></li>
          <li><a href="#during-audit" className="toc-link hover:text-lime-400">During the Audit</a></li>
          <li><a href="#post-audit" className="toc-link hover:text-lime-400">Post-Audit Actions</a></li>
          <li><a href="#master-checklist" className="toc-link hover:text-lime-400">Master Preparation Checklist</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        {/* Overview */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            A security audit is the most important step before deploying a smart contract to mainnet.
            But the value you get from an audit depends enormously on <strong>how well you prepare</strong>.
            Auditors who spend time deciphering undocumented code, fixing compilation errors, or tracing
            through untested logic are auditors <em>not</em> finding your critical vulnerabilities.
          </p>
          <p>
            This guide walks you through a structured preparation process — from code freeze to the
            final audit package — so your auditors can focus entirely on finding real security issues.
          </p>

          <AlertBox type="info" title="Why Preparation Matters">
            Well-prepared protocols get significantly more value from audits. Auditors can spend 100%
            of their time on security analysis instead of deciphering poorly documented or untested code.
            Many audit firms report that <strong>30-40% of findings</strong> in poorly prepared codebases
            are issues that should have been caught by the team&apos;s own testing and review process.
          </AlertBox>
        </section>

        {/* Timeline */}
        <section id="timeline">
          <h2>Audit Preparation Timeline</h2>
          <p>
            Plan for <strong>2-4 weeks of preparation</strong> before your audit start date. Here&apos;s
            a recommended timeline:
          </p>

          <div className="my-8 space-y-0">
            {/* Week 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm border border-lime-400/30">
                  W1
                </div>
                <div className="w-0.5 h-full bg-lime-400/20 mt-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-white font-semibold">Week 1: Code Freeze &amp; Cleanup</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Freeze features, remove dead code, fix compiler warnings, standardize formatting,
                  finalize contract architecture.
                </p>
              </div>
            </div>

            {/* Week 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 font-bold text-sm border border-yellow-400/30">
                  W2
                </div>
                <div className="w-0.5 h-full bg-yellow-400/20 mt-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-white font-semibold">Week 2: Documentation &amp; Testing</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Write NatSpec comments, create architecture docs, achieve 90%+ test coverage,
                  add integration tests for critical flows.
                </p>
              </div>
            </div>

            {/* Week 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400 font-bold text-sm border border-blue-400/30">
                  W3
                </div>
                <div className="w-0.5 h-full bg-blue-400/20 mt-2"></div>
              </div>
              <div className="pb-8">
                <h4 className="text-white font-semibold">Week 3: Internal Review &amp; Automated Tools</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Run Slither, Mythril, and other automated tools. Conduct internal peer review.
                  Fix all low-hanging fruit before the audit.
                </p>
              </div>
            </div>

            {/* Week 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center text-green-400 font-bold text-sm border border-green-400/30">
                  W4
                </div>
              </div>
              <div className="pb-4">
                <h4 className="text-white font-semibold">Week 4: Package &amp; Submit</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Compile the audit package, verify everything builds and tests pass from a clean clone,
                  submit to auditor with tagged commit hash.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 1: Code Freeze */}
        <section id="code-freeze">
          <h2>Phase 1: Code Freeze &amp; Cleanup</h2>
          <p>
            The single most important rule: <strong>do not change code during an audit</strong>. Every
            change invalidates the auditor&apos;s work on that section. Finalize your code completely
            before the audit begins.
          </p>

          <h3>Code Cleanup Checklist</h3>
          <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Remove all dead code and unused imports</p>
                <p className="text-gray-500 text-sm">Commented-out code, unused variables, legacy functions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Fix all compiler warnings</p>
                <p className="text-gray-500 text-sm">Zero warnings should be the goal — they mask real issues</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Standardize code formatting</p>
                <p className="text-gray-500 text-sm">Use forge fmt or prettier-solidity for consistent style</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Pin Solidity compiler version</p>
                <p className="text-gray-500 text-sm">Use exact version (0.8.20) not ranges (^0.8.0)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Pin all dependency versions</p>
                <p className="text-gray-500 text-sm">Lock OpenZeppelin, Chainlink, and other library versions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Remove TODO/FIXME/HACK comments</p>
                <p className="text-gray-500 text-sm">Either fix the issue or document it as a known limitation</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800">
              <span className="text-lime-400 font-bold">□</span>
              <div>
                <p className="text-white font-medium">Verify build from clean clone</p>
                <p className="text-gray-500 text-sm"><code>git clone ... &amp;&amp; forge build</code> should succeed with zero errors</p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`# Verify clean build from scratch
git clone <your-repo> fresh-clone
cd fresh-clone
forge install  # or npm install
forge build    # Zero errors, zero warnings

# Check for TODO/FIXME comments
grep -rn "TODO\\|FIXME\\|HACK\\|XXX" src/

# Format all Solidity files
forge fmt

# Check for unused imports (Slither)
slither . --detect unused-import`}
            language="bash"
            filename="Terminal"
          />

          <AlertBox type="warning" title="Feature Freeze Discipline">
            Once you declare a code freeze, <strong>no new features</strong>. Only critical bug fixes are
            allowed, and each fix should be carefully reviewed. Tag a specific git commit as the audit
            target — this is the exact code the auditors will review.
          </AlertBox>
        </section>

        {/* Phase 2: Documentation */}
        <section id="documentation">
          <h2>Phase 2: Documentation</h2>
          <p>
            Good documentation is arguably the highest-ROI preparation activity. When auditors understand
            your design intent, they can identify subtle logic bugs — not just common vulnerability patterns.
          </p>

          <h3>NatSpec Comments</h3>
          <p>
            Every public and external function should have NatSpec documentation. This helps auditors
            understand what each function <em>should</em> do, so they can verify it actually does that.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ No documentation',
              code: `function swap(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minOut,
    address to
) external returns (uint256) {
    // ... 80 lines of swap logic
}`
            }}
            secure={{
              title: '✅ Well-documented',
              code: `/// @notice Swap exact input tokens for output
/// @dev Uses constant product formula (x*y=k)
/// @param tokenIn Address of input token
/// @param tokenOut Address of output token
/// @param amountIn Exact amount of input tokens
/// @param minOut Minimum output (slippage protection)
/// @param to Recipient of output tokens
/// @return amountOut Actual output amount
function swap(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minOut,
    address to
) external returns (uint256 amountOut) {
    // ... 80 lines of swap logic
}`
            }}
          />

          <h3>Architecture Documentation</h3>
          <p>
            Create a high-level design document that covers:
          </p>

          <div className="my-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-lime-400/20 bg-lime-400/5">
              <h4 className="text-lime-400 font-semibold mb-3">📐 System Architecture</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Contract interaction diagram</li>
                <li>• Inheritance hierarchy</li>
                <li>• External protocol integrations</li>
                <li>• Deployment architecture (proxies, factories)</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-blue-400/20 bg-blue-400/5">
              <h4 className="text-blue-400 font-semibold mb-3">🔄 Core Flows</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• User journey for each main feature</li>
                <li>• Token flow diagrams</li>
                <li>• State transition diagrams</li>
                <li>• Admin operation workflows</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-yellow-400/20 bg-yellow-400/5">
              <h4 className="text-yellow-400 font-semibold mb-3">⚠️ Trust Assumptions</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Who has admin privileges and what they can do</li>
                <li>• External contract trust boundaries</li>
                <li>• Oracle assumptions</li>
                <li>• Token standard assumptions (ERC-20 quirks)</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-red-400/20 bg-red-400/5">
              <h4 className="text-red-400 font-semibold mb-3">🎯 Known Risks &amp; Trade-offs</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Accepted risks and why</li>
                <li>• Gas vs. security trade-offs made</li>
                <li>• Centralization risks</li>
                <li>• Areas you&apos;re most concerned about</li>
              </ul>
            </div>
          </div>

          <AlertBox type="success" title="Pro Tip: Areas of Concern">
            Include a list of <strong>specific areas you&apos;re worried about</strong>. This helps auditors
            prioritize their review. &quot;We&apos;re unsure about the edge cases in our liquidation
            math&quot; is gold for an auditor — it directs them to the exact code that needs scrutiny.
          </AlertBox>
        </section>

        {/* Phase 3: Testing */}
        <section id="testing">
          <h2>Phase 3: Testing &amp; Coverage</h2>
          <p>
            Comprehensive tests serve dual purposes: they catch bugs before the audit <em>and</em> they
            serve as executable documentation for auditors. A well-tested codebase tells auditors
            exactly which scenarios you&apos;ve considered and which you may have missed.
          </p>

          <h3>Target: 90%+ Line Coverage</h3>
          <p>
            While 100% coverage doesn&apos;t guarantee security, low coverage is a strong signal
            that edge cases are untested — and therefore potentially broken.
          </p>

          <CodeBlock
            code={`# Foundry — run tests with coverage report
forge coverage

# Foundry — generate detailed lcov report
forge coverage --report lcov

# Hardhat — run coverage
npx hardhat coverage

# View report in browser
open coverage/index.html`}
            language="bash"
            filename="Terminal"
          />

          <h3>Types of Tests to Include</h3>

          <div className="my-6 space-y-4">
            {/* Unit Tests */}
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 text-sm font-bold">
                  1
                </div>
                <h4 className="text-white font-semibold">Unit Tests</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Test each function in isolation. Cover happy paths, edge cases, and revert conditions.
              </p>
              <CodeBlock
                code={`function test_withdraw_success() public {
    // Setup
    vm.deal(address(vault), 10 ether);
    vault.deposit{value: 1 ether}();

    // Execute
    uint256 balBefore = address(this).balance;
    vault.withdraw(1 ether);
    uint256 balAfter = address(this).balance;

    // Assert
    assertEq(balAfter - balBefore, 1 ether);
    assertEq(vault.balances(address(this)), 0);
}

function test_withdraw_reverts_insufficient() public {
    vm.expectRevert("Insufficient balance");
    vault.withdraw(1 ether);
}

function test_withdraw_reverts_zero_amount() public {
    vm.expectRevert("Amount must be > 0");
    vault.withdraw(0);
}`}
                language="solidity"
                filename="VaultTest.t.sol"
              />
            </div>

            {/* Integration Tests */}
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-400 text-sm font-bold">
                  2
                </div>
                <h4 className="text-white font-semibold">Integration Tests</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Test multi-contract interactions and complete user flows end-to-end.
              </p>
              <CodeBlock
                code={`function test_full_lending_flow() public {
    // 1. User deposits collateral
    vm.startPrank(alice);
    collateralToken.approve(address(pool), 100e18);
    pool.depositCollateral(100e18);

    // 2. User borrows against collateral
    pool.borrow(50e18);
    assertEq(debtToken.balanceOf(alice), 50e18);

    // 3. User repays partial debt
    debtToken.approve(address(pool), 25e18);
    pool.repay(25e18);
    assertEq(debtToken.balanceOf(alice), 25e18);

    // 4. User withdraws collateral (partial)
    pool.withdrawCollateral(40e18);
    vm.stopPrank();

    // Verify health factor is still > 1
    assertGt(pool.healthFactor(alice), 1e18);
}`}
                language="solidity"
                filename="IntegrationTest.t.sol"
              />
            </div>

            {/* Fuzz Tests */}
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-bold">
                  3
                </div>
                <h4 className="text-white font-semibold">Fuzz Tests</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Let the fuzzer discover edge cases you haven&apos;t thought of. Essential for math-heavy code.
              </p>
              <CodeBlock
                code={`function testFuzz_deposit_withdraw_invariant(
    uint256 depositAmount
) public {
    // Bound to reasonable range
    depositAmount = bound(depositAmount, 1, 1000 ether);

    // Deposit
    vm.deal(address(this), depositAmount);
    vault.deposit{value: depositAmount}();

    // Withdraw
    vault.withdraw(depositAmount);

    // Invariant: balance should be exactly 0 after full withdrawal
    assertEq(vault.balances(address(this)), 0);
    // Invariant: contract balance unchanged (received back exact amount)
}

function testFuzz_swap_no_free_tokens(
    uint256 amountIn
) public {
    amountIn = bound(amountIn, 1e6, 1000e18);

    uint256 poolBalBefore = token.balanceOf(address(pool));
    uint256 userBalBefore = token.balanceOf(address(this));

    pool.swap(amountIn);

    uint256 poolBalAfter = token.balanceOf(address(pool));
    uint256 userBalAfter = token.balanceOf(address(this));

    // Invariant: no tokens created from thin air
    assertEq(
        poolBalBefore + userBalBefore,
        poolBalAfter + userBalAfter
    );
}`}
                language="solidity"
                filename="FuzzTest.t.sol"
              />
            </div>

            {/* Invariant Tests */}
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 text-sm font-bold">
                  4
                </div>
                <h4 className="text-white font-semibold">Invariant / Stateful Fuzz Tests</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Define properties that should <em>always</em> hold true, regardless of call sequence.
                The fuzzer tries random sequences of function calls to break your invariants.
              </p>
              <CodeBlock
                code={`// Invariant: total deposits must always equal contract balance
function invariant_solvency() public view {
    assertGe(
        address(vault).balance,
        vault.totalDeposits(),
        "Vault is insolvent!"
    );
}

// Invariant: no user balance exceeds total
function invariant_no_balance_exceeds_total() public view {
    for (uint i = 0; i < actors.length; i++) {
        assertLe(
            vault.balances(actors[i]),
            vault.totalDeposits()
        );
    }
}`}
                language="solidity"
                filename="InvariantTest.t.sol"
              />
            </div>
          </div>

          <AlertBox type="info" title="Test as Documentation">
            Well-named tests are documentation. An auditor reading <code>test_withdraw_reverts_when_paused()</code>{' '}
            immediately understands the expected behavior. Name your tests descriptively using the format:
            <code>test_functionName_condition_expectedOutcome</code>.
          </AlertBox>
        </section>

        {/* Phase 4: Internal Review */}
        <section id="internal-review">
          <h2>Phase 4: Internal Security Review</h2>
          <p>
            Before paying for an external audit, conduct your own internal review. This catches the
            &quot;low-hanging fruit&quot; that would otherwise consume expensive audit hours.
          </p>

          <h3>Internal Review Workflow</h3>
          <div className="my-6 space-y-4">
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">Step 1: Fresh Eyes Review</h4>
              <p className="text-gray-400 text-sm">
                Have a team member who <strong>didn&apos;t write the code</strong> read through every contract
                line by line. Fresh eyes catch what the original developer became blind to.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">Step 2: Function-by-Function Walkthrough</h4>
              <p className="text-gray-400 text-sm">
                For each external function, verify: access control, input validation, state changes,
                external calls, event emissions, and return values. Use the CEI pattern as a guide.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">Step 3: Threat Modeling</h4>
              <p className="text-gray-400 text-sm">
                For each user role, ask: &quot;What&apos;s the worst thing this role could do?&quot;
                Consider malicious users, compromised admin keys, flash loan attackers, and MEV bots.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">Step 4: Edge Case Analysis</h4>
              <p className="text-gray-400 text-sm">
                Test with extreme values: 0, 1, type(uint256).max, empty arrays, self-referencing
                addresses (address(this)), and first/last user scenarios.
              </p>
            </div>
          </div>

          <h3>Common Issues to Check</h3>
          <div className="my-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">Reentrancy</h4>
              <p className="text-xs text-gray-400">CEI pattern followed? ReentrancyGuard on all external-call functions?</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">Access Control</h4>
              <p className="text-xs text-gray-400">All admin functions protected? tx.origin not used for auth?</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">Integer Math</h4>
              <p className="text-xs text-gray-400">Division before multiplication? Precision loss in calculations?</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">External Calls</h4>
              <p className="text-xs text-gray-400">Return values checked? SafeERC20 used? Reentrancy considered?</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">Oracle Usage</h4>
              <p className="text-xs text-gray-400">Stale price checks? Multiple oracle fallbacks? TWAP for spot prices?</p>
            </div>
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <h4 className="font-semibold text-white mb-2 text-sm">Front-Running</h4>
              <p className="text-xs text-gray-400">Slippage protection? Commit-reveal where needed? Deadline parameters?</p>
            </div>
          </div>
        </section>

        {/* Phase 5: Automated Tools */}
        <section id="automated-tools">
          <h2>Phase 5: Automated Security Tools</h2>
          <p>
            Run automated analysis tools to catch known vulnerability patterns. Fix every finding
            before the audit — these are issues the auditors would flag anyway.
          </p>

          <div className="my-8 space-y-4">
            {/* Slither */}
            <div className="p-5 rounded-xl border border-lime-400/20 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🐍</span>
                <h4 className="text-lime-400 font-semibold">Slither — Static Analysis</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                The most widely used static analysis tool. Detects 80+ vulnerability patterns
                including reentrancy, uninitialized variables, and unchecked return values.
              </p>
              <CodeBlock
                code={`# Install
pip3 install slither-analyzer

# Run full analysis
slither .

# Run specific detectors
slither . --detect reentrancy-eth,uninitialized-state

# Generate human-readable report
slither . --print human-summary

# Check for unused code
slither . --detect dead-code,unused-import`}
                language="bash"
                filename="Terminal"
              />
            </div>

            {/* Mythril */}
            <div className="p-5 rounded-xl border border-blue-400/20 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🔮</span>
                <h4 className="text-blue-400 font-semibold">Mythril — Symbolic Execution</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Uses symbolic execution and SMT solving to find deep bugs that static analysis misses.
                Slower but catches more complex issues.
              </p>
              <CodeBlock
                code={`# Install via Docker (recommended)
docker pull mythril/myth

# Analyze a single contract
myth analyze src/MyContract.sol

# Analyze with increased depth (slower, more thorough)
myth analyze src/MyContract.sol --execution-timeout 300

# Output as JSON for CI integration
myth analyze src/MyContract.sol -o json`}
                language="bash"
                filename="Terminal"
              />
            </div>

            {/* Aderyn */}
            <div className="p-5 rounded-xl border border-purple-400/20 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🦅</span>
                <h4 className="text-purple-400 font-semibold">Aderyn — Rust-Based Analyzer</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Fast Rust-based static analyzer designed for Foundry projects. Generates Markdown
                reports ready for audit documentation.
              </p>
              <CodeBlock
                code={`# Install
cargo install aderyn

# Run analysis
aderyn .

# Output shows:
# - High issues
# - Medium issues  
# - Low issues
# - Gas optimizations
# Generated report in report.md`}
                language="bash"
                filename="Terminal"
              />
            </div>

            {/* Foundry Tools */}
            <div className="p-5 rounded-xl border border-yellow-400/20 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">🔨</span>
                <h4 className="text-yellow-400 font-semibold">Foundry Built-In Tools</h4>
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Foundry includes powerful built-in testing capabilities including fuzzing, invariant
                testing, and gas snapshots.
              </p>
              <CodeBlock
                code={`# Run tests with verbosity
forge test -vvv

# Run fuzz tests with more runs
forge test --fuzz-runs 10000

# Run invariant tests
forge test --match-test invariant

# Gas snapshot for comparison
forge snapshot

# Storage layout inspection
forge inspect MyContract storage-layout`}
                language="bash"
                filename="Terminal"
              />
            </div>
          </div>

          <AlertBox type="warning" title="Automated Tools Are Not Enough">
            Automated tools catch ~20-30% of real vulnerabilities. They&apos;re excellent for known
            patterns but miss business logic errors, complex multi-step attacks, and novel
            vulnerabilities. They are a <em>supplement</em> to manual auditing, not a replacement.
          </AlertBox>
        </section>

        {/* Phase 6: Audit Package */}
        <section id="audit-package">
          <h2>Phase 6: The Audit Package</h2>
          <p>
            Compile everything into a clean, self-contained package that the auditor can pick up and
            start working with immediately.
          </p>

          <h3>Repository Structure</h3>
          <CodeBlock
            code={`my-protocol/
├── README.md              # Build instructions, quick start
├── AUDIT.md               # Audit-specific documentation
├── foundry.toml           # Foundry config (pinned versions)
├── .env.example           # Environment variables template
│
├── src/                   # Production contracts
│   ├── core/              # Core protocol contracts
│   ├── periphery/         # Helper/router contracts
│   └── interfaces/        # Interface definitions
│
├── test/                  # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   ├── fuzz/              # Fuzz tests
│   └── invariant/         # Invariant tests
│
├── script/                # Deployment scripts
│   └── Deploy.s.sol
│
└── docs/                  # Documentation
    ├── architecture.md    # System architecture
    ├── flows.md           # Core user flows
    ├── trust-assumptions.md
    └── diagrams/          # Architecture diagrams`}
            language="bash"
            filename="Project Structure"
          />

          <h3>The AUDIT.md File</h3>
          <p>
            This is the single most important file for auditors. It should be the first thing they read:
          </p>

          <CodeBlock
            code={`# Audit Documentation

## Scope
- **Commit hash:** \`abc123def456\`
- **Contracts in scope:** src/core/*.sol, src/periphery/Router.sol
- **Contracts out of scope:** src/mocks/*, test/*
- **Lines of code:** ~2,500 nSLOC
- **Solidity version:** 0.8.21
- **Chain:** Ethereum Mainnet
- **ERC-20 tokens interacted with:** USDC, WETH, DAI

## Architecture Overview
[Brief description + link to detailed docs]

## Roles & Permissions
| Role | Capabilities | Held by |
|------|-------------|---------|
| Owner | Pause, upgrade, set fees | 3/5 Gnosis Safe |
| Minter | Mint reward tokens | Staking contract |
| Keeper | Trigger liquidations | Gelato automation |

## Known Issues / Accepted Risks
1. Admin can set fees up to 10% (by design, multisig controlled)
2. Oracle staleness window is 1 hour (Chainlink heartbeat)
3. First depositor can inflate share price (mitigated by initial deposit)

## Areas of Concern
- Liquidation math precision with small positions
- Cross-contract reentrancy between Pool and Router
- Flash loan resistance of price calculations

## Build & Test
\`\`\`bash
forge install
forge build
forge test
\`\`\`

## External Dependencies
- OpenZeppelin Contracts v5.0.0
- Chainlink Price Feeds v0.8
- Uniswap V3 Core (oracle only)`}
            language="markdown"
            filename="AUDIT.md"
          />

          <AlertBox type="success" title="Critical: Commit Hash">
            Always specify the exact <strong>git commit hash</strong> that represents the audited code.
            This creates an immutable reference point. Auditors, users, and future reviewers can verify
            they&apos;re looking at the exact same code that was audited.
          </AlertBox>
        </section>

        {/* Choosing an Auditor */}
        <section id="choosing-auditor">
          <h2>Choosing an Auditor</h2>
          <p>
            Not all audit firms are equal. Here&apos;s what to evaluate:
          </p>

          <div className="my-6 space-y-4">
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">🏆 Track Record</h4>
              <p className="text-gray-400 text-sm">
                Review their past audit reports (most are public). Did they find meaningful vulnerabilities?
                Have any of their audited protocols been exploited? How thorough were their findings?
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">🔍 Domain Expertise</h4>
              <p className="text-gray-400 text-sm">
                A firm experienced in DeFi lending is better for auditing your lending protocol than
                a generalist firm. Check their portfolio for similar projects.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">👥 Team Size &amp; Depth</h4>
              <p className="text-gray-400 text-sm">
                Who specifically will audit your code? Request auditor profiles. Multiple auditors
                reviewing independently catch more bugs than a single person.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-gray-700 bg-white/[0.02]">
              <h4 className="text-white font-semibold mb-2">📋 Audit Types</h4>
              <p className="text-gray-400 text-sm">
                Options include: private audit (single firm), competitive audit (multiple auditors
                compete on platforms like Code4rena/Sherlock), and bug bounty (ongoing post-deployment).
                Consider combining approaches for critical protocols.
              </p>
            </div>
          </div>

          <AlertBox type="info" title="Budget Considerations">
            Audit costs typically range from <strong>$5K-$100K+</strong> depending on codebase size and
            complexity. As a rule of thumb, budget roughly <strong>$1-2 per line of code</strong> (nSLOC)
            for a reputable firm. For high-TVL protocols, multiple audits are standard practice.
          </AlertBox>
        </section>

        {/* During the Audit */}
        <section id="during-audit">
          <h2>During the Audit</h2>
          <p>
            Your job isn&apos;t done once the audit starts. Active collaboration with auditors improves
            outcomes significantly.
          </p>

          <div className="my-6 grid md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
              <h4 className="text-green-400 font-semibold mb-3">✅ Do</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Respond to auditor questions within 24 hours</li>
                <li>• Set up a dedicated communication channel (Discord/Telegram)</li>
                <li>• Provide context for design decisions when asked</li>
                <li>• Be honest about areas you&apos;re unsure about</li>
                <li>• Acknowledge findings promptly and plan fixes</li>
                <li>• Share deployment configuration details</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-3">❌ Don&apos;t</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Change code during the audit (wait for fix review)</li>
                <li>• Dismiss findings without explanation</li>
                <li>• Rush auditors to finish faster</li>
                <li>• Withhold information about the system</li>
                <li>• Skip the fix review period</li>
                <li>• Deploy before reviewing the final report</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Post-Audit */}
        <section id="post-audit">
          <h2>Post-Audit Actions</h2>
          <p>
            The audit report is not the finish line — it&apos;s the start of remediation.
          </p>

          <div className="my-6 space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-white font-semibold">Fix All Critical &amp; High Findings</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Non-negotiable. Address every critical and high severity finding before deployment.
                  Document your fix for each finding in the remediation report.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-white font-semibold">Request Fix Review</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Have the auditor verify your fixes. Fixes can introduce new bugs — a review ensures
                  your remediation is correct.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-white font-semibold">Publish the Audit Report</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Transparency builds trust. Publish the full audit report on your website and GitHub.
                  Include the commit hash and any known issues that were accepted.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-white font-semibold">Launch a Bug Bounty Program</h4>
                <p className="text-gray-400 text-sm mt-1">
                  An audit is a snapshot in time. A bug bounty provides ongoing security review from
                  the community. Use platforms like Immunefi to attract top researchers.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-sm flex-shrink-0">
                5
              </div>
              <div>
                <h4 className="text-white font-semibold">Set Up Monitoring</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Deploy monitoring for suspicious transactions, large withdrawals, governance changes,
                  and oracle price deviations. Services like OpenZeppelin Defender, Forta, and
                  Tenderly provide real-time alerts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Master Checklist */}
        <section id="master-checklist">
          <h2>Master Preparation Checklist</h2>
          <p>
            The comprehensive checklist covering every preparation step:
          </p>

          <div className="my-8 space-y-6">
            {/* Code Quality */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h4 className="text-lime-400 font-semibold mb-4">📝 Code Quality</h4>
              <div className="space-y-3">
                {[
                  'Code freeze declared — no feature changes',
                  'All dead code and unused imports removed',
                  'Zero compiler warnings',
                  'Consistent code formatting (forge fmt)',
                  'Solidity version pinned (not floating ^)',
                  'All dependencies pinned to exact versions',
                  'No TODO/FIXME/HACK comments remaining',
                  'Clean build from fresh git clone',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lime-400 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentation */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h4 className="text-lime-400 font-semibold mb-4">📚 Documentation</h4>
              <div className="space-y-3">
                {[
                  'AUDIT.md with scope, commit hash, and overview',
                  'NatSpec on all public/external functions',
                  'Architecture diagram and description',
                  'Core user flow documentation',
                  'Trust assumptions documented',
                  'Known risks and accepted trade-offs listed',
                  'Areas of concern highlighted for auditors',
                  'Roles and permissions table',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lime-400 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testing */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h4 className="text-lime-400 font-semibold mb-4">🧪 Testing</h4>
              <div className="space-y-3">
                {[
                  '90%+ line coverage achieved',
                  'Unit tests for every public function',
                  'Integration tests for core user flows',
                  'Fuzz tests for math-heavy functions',
                  'Invariant tests for critical properties',
                  'Edge cases tested (zero, max, first/last user)',
                  'Revert conditions tested explicitly',
                  'All tests pass from clean clone',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lime-400 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h4 className="text-lime-400 font-semibold mb-4">🔒 Security</h4>
              <div className="space-y-3">
                {[
                  'Slither run with zero high/medium findings',
                  'Mythril or Aderyn analysis completed',
                  'Internal peer review conducted',
                  'CEI pattern verified in all functions',
                  'Access control reviewed on every external function',
                  'Reentrancy guards on all state-changing external calls',
                  'Oracle integration checked for staleness and manipulation',
                  'Flash loan attack vectors considered',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-lime-400 text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
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
              {['Audit', 'Documentation', 'Testing', 'Preparation', 'Security', 'Checklist', 'Best Practice'].map((tag) => (
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
            <Link href="/learn/best-practices/testing-strategies" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Comprehensive Smart Contract Testing</h4>
              <p className="text-sm text-gray-500 mt-1">Unit testing, fuzzing, and formal verification strategies</p>
            </Link>
            <Link href="/learn/best-practices/checks-effects-interactions" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Checks-Effects-Interactions Pattern</h4>
              <p className="text-sm text-gray-500 mt-1">The fundamental pattern for secure smart contracts</p>
            </Link>
            <Link href="/learn/best-practices/secure-access-control" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Implementing Secure Access Control</h4>
              <p className="text-sm text-gray-500 mt-1">Role-based access control best practices</p>
            </Link>
            <Link href="/learn/checklist" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Security Checklist</h4>
              <p className="text-sm text-gray-500 mt-1">Pre-deployment security verification checklist</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Ready for an audit?</h3>
              <p className="text-gray-400">
                Start with a free automated audit from Hexific to catch the low-hanging fruit before
                engaging a manual auditor. Our AI scanner checks for 200+ vulnerability patterns in seconds.
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
