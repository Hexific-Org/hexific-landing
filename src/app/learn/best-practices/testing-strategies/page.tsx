'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function TestingStrategiesPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Comprehensive Smart Contract Testing' },
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
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">
            Testing
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Comprehensive Smart Contract Testing
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          Smart contracts are immutable — once deployed, bugs can&apos;t be patched. Testing is your
          last line of defense before code handles millions in value. This guide covers unit testing,
          integration testing, fuzzing, invariant testing, and formal verification strategies for
          building bulletproof contracts.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            11 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Dec 5, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Testing, Foundry, Hardhat, Fuzzing
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#why-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. Why Testing Is Non-Negotiable
            </a>
          </li>
          <li>
            <a href="#testing-pyramid" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. The Smart Contract Testing Pyramid
            </a>
          </li>
          <li>
            <a href="#unit-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Unit Testing
            </a>
          </li>
          <li>
            <a href="#integration-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. Integration Testing
            </a>
          </li>
          <li>
            <a href="#fuzz-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Fuzz Testing
            </a>
          </li>
          <li>
            <a href="#invariant-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Invariant Testing
            </a>
          </li>
          <li>
            <a href="#fork-testing" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. Fork Testing
            </a>
          </li>
          <li>
            <a href="#formal-verification" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Formal Verification
            </a>
          </li>
          <li>
            <a href="#coverage" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Test Coverage — What to Measure
            </a>
          </li>
          <li>
            <a href="#common-mistakes" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Common Testing Mistakes
            </a>
          </li>
          <li>
            <a href="#tooling" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Foundry vs Hardhat
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Testing Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — Why Testing */}
        <section id="why-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            Why Testing Is Non-Negotiable
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional software can ship a hotfix in hours. Smart contracts are <strong className="text-white">immutable</strong> —
            once deployed, a bug becomes permanent. Every exploit in DeFi history started with insufficient testing.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20 text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">$3.8B+</div>
              <div className="text-sm text-gray-400">Lost to smart contract exploits in 2022 alone</div>
            </div>
            <div className="p-5 rounded-xl bg-yellow-400/5 border border-yellow-400/20 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">~60%</div>
              <div className="text-sm text-gray-400">Of exploits could have been caught by testing</div>
            </div>
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">$0</div>
              <div className="text-sm text-gray-400">Cost to catch a bug during testing vs. production</div>
            </div>
          </div>

          <AlertBox type="danger" title="The Cost of Skipping Tests">
            The Euler Finance hack ($197M, March 2023) exploited a missing health check after a
            donation-based attack. A single integration test simulating the attack flow would have
            caught it. The DAO hack ($60M, 2016) was a reentrancy bug — detectable with a basic
            unit test calling the withdraw function recursively.
          </AlertBox>
        </section>

        {/* Section 2 — Testing Pyramid */}
        <section id="testing-pyramid">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            The Smart Contract Testing Pyramid
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Smart contract testing follows a layered approach, from fast unit tests at the base to
            slow but powerful formal verification at the top. Each layer catches different classes
            of bugs.
          </p>

          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="space-y-2 max-w-md mx-auto">
              <div className="flex justify-center">
                <div className="w-40 py-2 bg-purple-400/10 border border-purple-400/20 rounded-t-lg text-center">
                  <span className="text-xs text-purple-400 font-medium">Formal Verification</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-52 py-2 bg-blue-400/10 border border-blue-400/20 text-center">
                  <span className="text-xs text-blue-400 font-medium">Invariant / Stateful Fuzzing</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-64 py-2 bg-yellow-400/10 border border-yellow-400/20 text-center">
                  <span className="text-xs text-yellow-400 font-medium">Fuzz Testing (Stateless)</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-80 py-2 bg-green-400/10 border border-green-400/20 text-center">
                  <span className="text-xs text-green-400 font-medium">Integration Tests</span>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-full py-2 bg-lime-400/10 border border-lime-400/20 rounded-b-lg text-center">
                  <span className="text-xs text-lime-400 font-medium">Unit Tests (Foundation — Fast, Many)</span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              ← Fewer but deeper tests &nbsp;|&nbsp; More but simpler tests →
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-lime-400 font-semibold text-sm">Unit Tests</span>
              <p className="text-xs text-gray-400 mt-1">Test individual functions in isolation. Fast, easy to write, catch basic logic errors.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-green-400 font-semibold text-sm">Integration Tests</span>
              <p className="text-xs text-gray-400 mt-1">Test interactions between multiple contracts. Catch composition and flow bugs.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-yellow-400 font-semibold text-sm">Fuzz Tests</span>
              <p className="text-xs text-gray-400 mt-1">Random inputs find edge cases you didn&apos;t think of. Catch boundary and overflow bugs.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-purple-400 font-semibold text-sm">Formal Verification</span>
              <p className="text-xs text-gray-400 mt-1">Mathematical proof that properties always hold. Catches every possible violation.</p>
            </div>
          </div>
        </section>

        {/* Section 3 — Unit Testing */}
        <section id="unit-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Unit Testing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Unit tests verify that each function works correctly in isolation. For every function in
            your contract, test the <strong className="text-white">happy path</strong>,
            <strong className="text-white"> edge cases</strong>, and
            <strong className="text-white"> revert conditions</strong>.
          </p>

          <CodeBlock
            language="solidity"
            filename="test/Vault.t.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Vault.sol";

contract VaultTest is Test {
    Vault vault;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        vault = new Vault();
        deal(alice, 10 ether);
        deal(bob, 10 ether);
    }

    // ✅ Happy path: basic deposit works
    function test_deposit_creditsBalance() public {
        vm.prank(alice);
        vault.deposit{value: 1 ether}();

        assertEq(vault.balances(alice), 1 ether);
    }

    // ✅ Edge case: deposit zero
    function test_deposit_revertsOnZero() public {
        vm.prank(alice);
        vm.expectRevert("Amount must be > 0");
        vault.deposit{value: 0}();
    }

    // ✅ Revert condition: withdraw more than balance
    function test_withdraw_revertsOnInsufficientBalance() public {
        vm.prank(alice);
        vm.expectRevert("Insufficient balance");
        vault.withdraw(1 ether);
    }

    // ✅ State transition: withdrawal updates balance
    function test_withdraw_updatesBalance() public {
        vm.startPrank(alice);
        vault.deposit{value: 5 ether}();
        vault.withdraw(3 ether);
        vm.stopPrank();

        assertEq(vault.balances(alice), 2 ether);
        assertEq(alice.balance, 8 ether); // 10 - 5 + 3
    }

    // ✅ Access control: only depositor can withdraw
    function test_withdraw_onlyOwnFunds() public {
        vm.prank(alice);
        vault.deposit{value: 5 ether}();

        vm.prank(bob);
        vm.expectRevert("Insufficient balance");
        vault.withdraw(5 ether);
    }

    // ✅ Event emission
    function test_deposit_emitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit Vault.Deposited(alice, 1 ether);

        vm.prank(alice);
        vault.deposit{value: 1 ether}();
    }
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Unit Testing Naming Convention</h3>
            <p className="text-gray-400 text-sm mb-3">
              Use a consistent naming pattern so test names explain what they verify:
            </p>
            <div className="space-y-2 text-sm font-mono">
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <code className="text-lime-400">test_functionName_expectedBehavior</code>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <code className="text-lime-400">test_deposit_creditsBalance</code>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <code className="text-lime-400">test_withdraw_revertsOnInsufficientBalance</code>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <code className="text-lime-400">testFail_withdraw_asNonOwner</code>
                <span className="text-gray-500 text-xs ml-2">(Foundry testFail pattern)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Integration Testing */}
        <section id="integration-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            Integration Testing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Integration tests verify the behavior of <strong className="text-white">multiple contracts
            interacting together</strong>. Most real-world exploits happen at the boundaries between
            contracts — flash loan callbacks, oracle updates triggering liquidations, router swaps
            that interact with pools. Integration tests catch these composition bugs.
          </p>

          <CodeBlock
            language="solidity"
            filename="test/LendingIntegration.t.sol"
            code={`// Test: Full lending flow — deposit, borrow, price drop, liquidation
contract LendingIntegrationTest is Test {
    LendingPool pool;
    PriceOracle oracle;
    MockERC20 collateral;
    MockERC20 borrowAsset;
    address depositor = makeAddr("depositor");
    address borrower = makeAddr("borrower");
    address liquidator = makeAddr("liquidator");

    function setUp() public {
        oracle = new PriceOracle();
        collateral = new MockERC20("WETH", "WETH", 18);
        borrowAsset = new MockERC20("USDC", "USDC", 6);
        pool = new LendingPool(address(oracle));

        // Setup initial state
        oracle.setPrice(address(collateral), 2000e8); // $2000
        oracle.setPrice(address(borrowAsset), 1e8);   // $1

        // Fund participants
        collateral.mint(borrower, 10 ether);
        borrowAsset.mint(depositor, 1_000_000e6);
        borrowAsset.mint(liquidator, 500_000e6);
    }

    function test_fullLiquidationFlow() public {
        // Step 1: Depositor supplies USDC to the pool
        vm.startPrank(depositor);
        borrowAsset.approve(address(pool), type(uint256).max);
        pool.deposit(address(borrowAsset), 500_000e6);
        vm.stopPrank();

        // Step 2: Borrower deposits collateral and borrows
        vm.startPrank(borrower);
        collateral.approve(address(pool), type(uint256).max);
        pool.depositCollateral(address(collateral), 5 ether);
        pool.borrow(address(borrowAsset), 5000e6); // Borrow $5k against $10k collateral
        vm.stopPrank();

        // Step 3: Price drops — borrower becomes undercollateralized
        oracle.setPrice(address(collateral), 1200e8); // $2000 → $1200

        // Step 4: Liquidator repays debt and claims collateral
        vm.startPrank(liquidator);
        borrowAsset.approve(address(pool), type(uint256).max);
        pool.liquidate(borrower, address(collateral), 2500e6);
        vm.stopPrank();

        // Verify: Borrower's debt reduced, liquidator got collateral
        assertLt(pool.getBorrowBalance(borrower), 5000e6);
        assertGt(collateral.balanceOf(liquidator), 0);

        // Verify: Pool is still solvent
        assertGe(pool.totalAssets(), pool.totalDebt());
    }

    function test_cannotBorrowBeyondCollateralFactor() public {
        vm.startPrank(borrower);
        collateral.approve(address(pool), type(uint256).max);
        pool.depositCollateral(address(collateral), 5 ether);

        // 5 ETH × $2000 × 75% CF = $7,500 max borrow
        vm.expectRevert("Insufficient collateral");
        pool.borrow(address(borrowAsset), 8000e6); // Over limit
        vm.stopPrank();
    }
}`}
          />

          <AlertBox type="info" title="What to Integration-Test">
            Focus integration tests on <strong>user journey flows</strong>: deposit → borrow → repay,
            stake → earn → withdraw, swap → provide liquidity → remove. Test the full lifecycle, not
            just individual function calls. Also test <strong>cross-contract reentrancy</strong> paths
            (contract A calls B calls A).
          </AlertBox>
        </section>

        {/* Section 5 — Fuzz Testing */}
        <section id="fuzz-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Fuzz Testing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Fuzz testing feeds <strong className="text-white">random inputs</strong> into your functions
            to discover edge cases you didn&apos;t think of. Instead of testing with specific values
            (1 ether, 100 tokens), the fuzzer tries thousands of random values — including zero, max uint,
            and boundary values.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Manual: Tests 3 Values',
              code: `// Only tests the exact values we thought of
function test_deposit_1ether() public {
    vault.deposit{value: 1 ether}();
    assertEq(vault.balances(alice), 1 ether);
}

function test_deposit_100wei() public {
    vault.deposit{value: 100}();
    assertEq(vault.balances(alice), 100);
}

function test_deposit_maxEther() public {
    vault.deposit{value: 10 ether}();
    assertEq(vault.balances(alice), 10 ether);
}

// What about 0? type(uint256).max?
// What about 1 wei? 7.3 ether?
// We can't test all values manually.`
            }}
            secure={{
              title: '✅ Fuzz: Tests Thousands of Values',
              code: `// Foundry automatically generates random inputs
// for any parameter in a test function
function testFuzz_deposit(uint256 amount) public {
    // Bound: skip zero (reverts), cap at balance
    amount = bound(amount, 1, 10 ether);

    vm.deal(alice, amount);
    vm.prank(alice);
    vault.deposit{value: amount}();

    // Must hold for ALL valid inputs
    assertEq(vault.balances(alice), amount);
    assertEq(address(vault).balance, amount);
}

// Foundry default: 256 runs per fuzz test
// Configure: foundry.toml → runs = 10000
// Catches edge cases humans miss!`
            }}
          />

          <CodeBlock
            language="solidity"
            filename="test/Token.t.sol"
            code={`// Fuzz test: transfer should never create or destroy tokens
function testFuzz_transfer_preservesTotalSupply(
    address to,
    uint256 amount
) public {
    // Assumptions: filter invalid inputs
    vm.assume(to != address(0));
    vm.assume(to != address(token));
    amount = bound(amount, 0, token.balanceOf(alice));

    uint256 totalBefore = token.totalSupply();

    vm.prank(alice);
    token.transfer(to, amount);

    // Invariant: total supply must not change
    assertEq(token.totalSupply(), totalBefore);

    // Invariant: sender + receiver balances = previous total
    // (if to != alice)
    if (to != alice) {
        assertEq(
            token.balanceOf(alice) + token.balanceOf(to),
            totalBefore // assuming alice held all tokens
        );
    }
}

// Fuzz test: approve + transferFrom round-trip
function testFuzz_approveAndTransferFrom(
    uint256 approveAmount,
    uint256 transferAmount
) public {
    approveAmount = bound(approveAmount, 0, token.balanceOf(alice));
    transferAmount = bound(transferAmount, 0, approveAmount);

    vm.prank(alice);
    token.approve(bob, approveAmount);

    vm.prank(bob);
    token.transferFrom(alice, bob, transferAmount);

    assertEq(token.allowance(alice, bob), approveAmount - transferAmount);
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Foundry Fuzz Cheatcodes</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                <code className="text-lime-400 text-xs whitespace-nowrap">bound(x, min, max)</code>
                <span className="text-gray-400 text-xs">Constrain a fuzz input to a range (prefer over <code className="text-lime-400">vm.assume</code>)</span>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                <code className="text-lime-400 text-xs whitespace-nowrap">vm.assume(cond)</code>
                <span className="text-gray-400 text-xs">Skip inputs that don&apos;t satisfy the condition (high rejection = slow)</span>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                <code className="text-lime-400 text-xs whitespace-nowrap">makeAddr(&quot;name&quot;)</code>
                <span className="text-gray-400 text-xs">Create a deterministic labeled address for test actors</span>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-lg bg-white/[0.02]">
                <code className="text-lime-400 text-xs whitespace-nowrap">deal(addr, amount)</code>
                <span className="text-gray-400 text-xs">Set the ETH balance of an address for testing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — Invariant Testing */}
        <section id="invariant-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Invariant Testing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Invariant testing (also called <strong className="text-white">stateful fuzzing</strong>) is the
            most powerful automated testing technique. Instead of testing single function calls, the fuzzer
            calls <strong className="text-white">random sequences of functions</strong> with random inputs
            and verifies that critical properties always hold.
          </p>

          <CodeBlock
            language="solidity"
            filename="test/invariant/VaultInvariant.t.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/StdInvariant.sol";
import "../src/Vault.sol";

// Handler: constrains fuzzer to valid operations
contract VaultHandler is Test {
    Vault public vault;
    address[] public actors;
    mapping(address => uint256) public ghost_deposited;
    uint256 public ghost_totalDeposited;

    constructor(Vault _vault, address[] memory _actors) {
        vault = _vault;
        actors = _actors;
        for (uint256 i = 0; i < _actors.length; i++) {
            deal(_actors[i], 100 ether);
        }
    }

    function deposit(uint256 actorSeed, uint256 amount) external {
        address actor = actors[actorSeed % actors.length];
        amount = bound(amount, 1, 10 ether);

        vm.prank(actor);
        vault.deposit{value: amount}();

        ghost_deposited[actor] += amount;
        ghost_totalDeposited += amount;
    }

    function withdraw(uint256 actorSeed, uint256 amount) external {
        address actor = actors[actorSeed % actors.length];
        uint256 bal = vault.balances(actor);
        if (bal == 0) return;
        amount = bound(amount, 1, bal);

        vm.prank(actor);
        vault.withdraw(amount);

        ghost_deposited[actor] -= amount;
        ghost_totalDeposited -= amount;
    }
}

contract VaultInvariantTest is StdInvariant, Test {
    Vault vault;
    VaultHandler handler;

    function setUp() public {
        vault = new Vault();
        address[] memory actors = new address[](3);
        actors[0] = makeAddr("alice");
        actors[1] = makeAddr("bob");
        actors[2] = makeAddr("charlie");

        handler = new VaultHandler(vault, actors);
        targetContract(address(handler));
    }

    // INVARIANT 1: Vault ETH balance == sum of all user balances
    function invariant_solvency() public view {
        assertEq(
            address(vault).balance,
            handler.ghost_totalDeposited()
        );
    }

    // INVARIANT 2: No individual balance exceeds total
    function invariant_noBalanceExceedsTotal() public view {
        address[] memory actors = new address[](3);
        actors[0] = makeAddr("alice");
        actors[1] = makeAddr("bob");
        actors[2] = makeAddr("charlie");

        for (uint256 i = 0; i < actors.length; i++) {
            assertLe(
                vault.balances(actors[i]),
                address(vault).balance
            );
        }
    }
}`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Key Invariants to Test</h3>
              <ul className="text-sm text-gray-400 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span><strong className="text-white">Solvency:</strong> Contract balance ≥ total user deposits</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span><strong className="text-white">Conservation:</strong> Token total supply never changes unexpectedly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span><strong className="text-white">Monotonicity:</strong> Share price only goes up (for yield vaults)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span><strong className="text-white">Access:</strong> Only authorized roles can call admin functions</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-2">Ghost Variables</h3>
              <p className="text-sm text-gray-400">
                Ghost variables are tracking variables in your handler that mirror expected state.
                After each fuzzer action, update the ghost variable. In invariant checks, compare
                actual contract state against ghost state. If they diverge, you&apos;ve found a bug.
              </p>
            </div>
          </div>

          <AlertBox type="success" title="Invariant Testing Results">
            Trail of Bits reported that invariant testing catches <strong>2-3× more bugs</strong> than
            unit tests alone. Major protocols like Uniswap, Aave, and Compound all use invariant testing
            as a core part of their security pipeline.
          </AlertBox>
        </section>

        {/* Section 7 — Fork Testing */}
        <section id="fork-testing">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            Fork Testing
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Fork testing runs your tests against a <strong className="text-white">snapshot of real
            mainnet state</strong>. This lets you test against actual deployed contracts — real Uniswap
            pools, real Chainlink oracles, real token balances — without deploying to a testnet.
          </p>

          <CodeBlock
            language="solidity"
            filename="test/ForkTest.t.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";

interface IWETH {
    function deposit() external payable;
    function approve(address, uint256) external returns (bool);
    function balanceOf(address) external view returns (uint256);
}

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);
}

contract ForkTest is Test {
    // Real mainnet addresses
    address constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address constant ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    function setUp() public {
        // Fork mainnet at a specific block
        vm.createSelectFork("mainnet", 18_000_000);
    }

    function test_swapWETHforUSDC() public {
        uint256 amount = 10 ether;
        deal(address(this), amount);

        // Wrap ETH
        IWETH(WETH).deposit{value: amount}();
        IWETH(WETH).approve(ROUTER, amount);

        // Swap on real Uniswap
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = USDC;

        uint256[] memory amounts = IUniswapV2Router(ROUTER)
            .swapExactTokensForTokens(
                amount, 0, path, address(this), block.timestamp
            );

        // At block 18M, 10 ETH ≈ $16,000 USDC
        assertGt(amounts[1], 10_000e6, "Should receive > 10k USDC");
    }
}`}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Fork Testing Configuration</h3>
            <CodeBlock
              language="solidity"
              filename="foundry.toml"
              code={`[profile.default]
# RPC endpoint for forking (use Alchemy, Infura, etc.)
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"

# Cache RPC responses to speed up repeated runs
no_storage_caching = false

# Pin to a specific block for deterministic tests
fork_block_number = 18000000`}
            />
          </div>

          <AlertBox type="warning" title="Fork Testing Gotchas">
            <strong>Pin the block number</strong> — without it, tests may pass one day and fail the
            next as on-chain state changes. <strong>Rate limits</strong> — heavy fork testing can hit
            RPC rate limits; use caching and a dedicated RPC key. <strong>Speed</strong> — fork tests
            are 10-100× slower than local tests; use sparingly for critical integration paths.
          </AlertBox>
        </section>

        {/* Section 8 — Formal Verification */}
        <section id="formal-verification">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Formal Verification
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Formal verification uses <strong className="text-white">mathematical proofs</strong> to verify
            that a property holds for <em>all possible inputs and states</em> — not just the ones you
            tested. While fuzz testing is probabilistic (might miss a case), formal verification is
            exhaustive (proves or disproves a property completely).
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">Tools</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-medium">Certora Prover</span>
                  <span>— Industry standard, CVL specification language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-medium">Halmos</span>
                  <span>— Symbolic execution for Foundry tests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-medium">HEVM</span>
                  <span>— Symbolic EVM from DappTools</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-medium">Kontrol (K Framework)</span>
                  <span>— Formal semantics-based verification</span>
                </div>
              </div>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">When to Use</h3>
              <ul className="text-sm text-gray-400 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Core accounting logic (token balances, shares)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Mathematical formulas (AMM curves, interest rates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>Access control state machines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400">•</span>
                  <span>High-value contracts ($100M+ TVL)</span>
                </li>
              </ul>
            </div>
          </div>

          <CodeBlock
            language="solidity"
            filename="specs/Vault.spec (Certora CVL)"
            code={`// Certora Verification Language (CVL) — rule-based specification

// RULE: Depositing increases the user's balance exactly by the deposit amount
rule depositIncreasesBalance(address user, uint256 amount) {
    env e;
    require e.msg.sender == user;
    require e.msg.value == amount;
    require amount > 0;

    uint256 balBefore = balances(user);
    deposit(e);
    uint256 balAfter = balances(user);

    assert balAfter == balBefore + amount,
        "Deposit must increase balance by exact amount";
}

// RULE: Withdrawals cannot exceed the user's balance
rule cannotWithdrawMoreThanBalance(address user, uint256 amount) {
    env e;
    require e.msg.sender == user;
    require amount > balances(user);

    withdraw@withrevert(e, amount);
    assert lastReverted,
        "Withdrawing more than balance must revert";
}

// INVARIANT: Contract ETH balance always >= sum of all balances
invariant solvency()
    nativeBalances[currentContract] >= sumOfBalances()
    {
        preserved deposit(uint256 amount) with (env e) {
            require e.msg.value == amount;
        }
    }`}
          />

          <AlertBox type="info" title="Formal Verification ≠ Replacing Tests">
            Formal verification complements testing — it doesn&apos;t replace it. FV proves <em>specific
            properties</em> hold, but you still need tests for deployment flows, gas measurements,
            event emissions, and integration behavior that FV tools don&apos;t cover.
          </AlertBox>
        </section>

        {/* Section 9 — Coverage */}
        <section id="coverage">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Test Coverage — What to Measure
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Code coverage measures how much of your contract is exercised by tests. While 100% line
            coverage doesn&apos;t guarantee security, <strong className="text-white">low coverage
            guarantees blind spots</strong>. Aim for high coverage, but focus on <em>branch coverage</em>
            over line coverage.
          </p>

          <div className="mb-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Running Coverage in Foundry</h3>
            <CodeBlock
              language="solidity"
              filename="terminal"
              code={`# Generate coverage report
forge coverage

# Generate detailed LCOV report
forge coverage --report lcov

# View in terminal with summary
forge coverage --report summary

# Example output:
# | File          | % Lines   | % Branches | % Funcs |
# |---------------|-----------|------------|---------|
# | Vault.sol     | 95.2%     | 87.5%      | 100%    |
# | Token.sol     | 100%      | 92.3%      | 100%    |
# | Oracle.sol    | 78.4%     | 65.0%      | 85.7%   | ← needs work`}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lime-400 font-semibold mb-2">Line Coverage</div>
              <p className="text-sm text-gray-400">
                % of code lines executed. A baseline metric — necessary but not sufficient. Target: 95%+.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20">
              <div className="text-yellow-400 font-semibold mb-2">Branch Coverage</div>
              <p className="text-sm text-gray-400">
                % of <code className="text-lime-400">if/else</code> branches taken. More meaningful —
                ensures both success and failure paths are tested. Target: 90%+.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-purple-400/20">
              <div className="text-purple-400 font-semibold mb-2">Function Coverage</div>
              <p className="text-sm text-gray-400">
                % of functions called. If a function has 0% coverage, it&apos;s completely untested.
                Target: 100%.
              </p>
            </div>
          </div>

          <AlertBox type="warning" title="Coverage Traps">
            100% line coverage does <strong>not</strong> mean your code is secure. A test that calls a
            function without asserting anything has &quot;coverage&quot; but verifies nothing. Focus on
            <strong> meaningful assertions</strong> per test, not just executing code paths.
          </AlertBox>
        </section>

        {/* Section 10 — Common Mistakes */}
        <section id="common-mistakes">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Common Testing Mistakes
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">1.</span>
                Testing Only the Happy Path
              </h3>
              <p className="text-gray-400 text-sm">
                Most bugs live in edge cases: zero amounts, max values, duplicate calls, re-entrancy
                during callbacks, and race conditions. For every happy-path test, write at least 2
                edge-case tests.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">2.</span>
                Testing Against Your Own Mocks Instead of Real Contracts
              </h3>
              <p className="text-gray-400 text-sm">
                Mocks behave exactly as you wrote them — they won&apos;t reveal bugs caused by
                real contract behavior (gas limits, reentrancy, non-standard tokens like USDT).
                Use fork testing for integrations with real protocols.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">3.</span>
                No Assertions (Coverage Without Verification)
              </h3>
              <p className="text-gray-400 text-sm">
                A test that calls a function without <code className="text-lime-400">assertEq</code>,
                <code className="text-lime-400"> assertGt</code>, or <code className="text-lime-400">vm.expectRevert</code> proves
                nothing. Every test should have at least one meaningful assertion.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">4.</span>
                Not Testing with Multiple Actors
              </h3>
              <p className="text-gray-400 text-sm">
                Using only one address for all tests misses cross-user bugs. Use multiple actors
                (alice, bob, attacker) and test that one user&apos;s actions don&apos;t affect another user&apos;s
                balance or permissions.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">5.</span>
                Ignoring Timestamp and Block Dependencies
              </h3>
              <p className="text-gray-400 text-sm">
                If your contract uses <code className="text-lime-400">block.timestamp</code> or
                <code className="text-lime-400"> block.number</code>, test with
                <code className="text-lime-400"> vm.warp()</code> and <code className="text-lime-400">vm.roll()</code>.
                Time-sensitive bugs (lock periods, vesting, auctions) only appear when you manipulate time.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">6.</span>
                Not Testing Upgradeability
              </h3>
              <p className="text-gray-400 text-sm">
                If your contract is upgradeable, test the upgrade itself: storage layout compatibility,
                initializer idempotency, and state preservation across versions. Use
                OpenZeppelin&apos;s upgrade-safety tooling.
              </p>
            </div>
          </div>
        </section>

        {/* Section 11 — Foundry vs Hardhat */}
        <section id="tooling">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Foundry vs Hardhat
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Both are production-grade frameworks. Foundry has become the standard for security-focused
            teams due to its native fuzzing, speed, and Solidity-native tests. Hardhat remains popular
            for its JavaScript ecosystem integration and plugin system.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Feature</th>
                  <th className="text-left py-3 px-4 text-lime-400 font-medium">Foundry</th>
                  <th className="text-left py-3 px-4 text-blue-400 font-medium">Hardhat</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Test Language</td>
                  <td className="py-3 px-4">Solidity</td>
                  <td className="py-3 px-4">JavaScript / TypeScript</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Speed</td>
                  <td className="py-3 px-4 text-green-400">⚡ Very fast (Rust-based)</td>
                  <td className="py-3 px-4 text-yellow-400">Moderate (Node.js)</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Fuzz Testing</td>
                  <td className="py-3 px-4 text-green-400">Built-in</td>
                  <td className="py-3 px-4 text-yellow-400">Via plugins (Echidna)</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Invariant Testing</td>
                  <td className="py-3 px-4 text-green-400">Built-in</td>
                  <td className="py-3 px-4 text-red-400">Not native</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Fork Testing</td>
                  <td className="py-3 px-4 text-green-400">Built-in (fast)</td>
                  <td className="py-3 px-4 text-green-400">Built-in (slower)</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Gas Reports</td>
                  <td className="py-3 px-4 text-green-400">Built-in</td>
                  <td className="py-3 px-4 text-green-400">Via hardhat-gas-reporter</td>
                </tr>
                <tr className="border-b border-white/[0.04]">
                  <td className="py-3 px-4 text-white">Plugin Ecosystem</td>
                  <td className="py-3 px-4 text-yellow-400">Growing</td>
                  <td className="py-3 px-4 text-green-400">Extensive (hundreds)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white">Debugging</td>
                  <td className="py-3 px-4">Trace + verbosity flags</td>
                  <td className="py-3 px-4">console.log + stack traces</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-lime-400/5 border border-lime-400/20">
              <h3 className="text-lime-400 font-semibold mb-2">Choose Foundry When</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Security is the #1 priority</li>
                <li>• You need fuzz + invariant testing</li>
                <li>• Speed matters (large test suites)</li>
                <li>• Team prefers writing tests in Solidity</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-blue-400/5 border border-blue-400/20">
              <h3 className="text-blue-400 font-semibold mb-2">Choose Hardhat When</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Heavy frontend/backend integration</li>
                <li>• Using TypeScript for full-stack</li>
                <li>• Need specific plugins (e.g., upgrades)</li>
                <li>• Team is more comfortable with JS/TS</li>
              </ul>
            </div>
          </div>

          <AlertBox type="info" title="Use Both!">
            Many teams use <strong>Foundry for unit/fuzz/invariant tests</strong> and
            <strong> Hardhat for deployment scripts and integration with frontend tooling</strong>.
            The two are compatible — you can run Foundry tests from a Hardhat project.
          </AlertBox>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Testing Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Unit Testing */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">✅</span> Unit Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Every public/external function has tests',
                  'Happy path tested for each function',
                  'Revert conditions tested (vm.expectRevert)',
                  'Edge cases: zero, max uint, empty arrays',
                  'Access control: unauthorized callers revert',
                  'Event emissions verified (vm.expectEmit)',
                  'State changes verified with assertions',
                  'Multiple actors (alice, bob, attacker)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integration Testing */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-green-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400">✅</span> Integration Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Full user flows tested end-to-end',
                  'Multi-contract interactions verified',
                  'Oracle price change scenarios tested',
                  'Liquidation flows tested at boundary',
                  'Cross-contract reentrancy tested',
                  'Token approval + transfer flows work',
                  'Pause/unpause behavior verified',
                  'Upgrade path tested (if upgradeable)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fuzz / Invariant */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">✅</span> Fuzz &amp; Invariant Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Critical functions have fuzz tests',
                  'Inputs bounded to valid ranges',
                  'Solvency invariant defined and tested',
                  'Conservation invariant (no token creation)',
                  'Handler constrains fuzzer to valid states',
                  'Ghost variables track expected state',
                  'Run count ≥ 1,000 (production: 10,000+)',
                  'Shrinking enabled for minimal counter-examples',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coverage & CI */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-purple-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">✅</span> Coverage &amp; CI
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Line coverage ≥ 95%',
                  'Branch coverage ≥ 90%',
                  'Function coverage = 100%',
                  'Tests run in CI on every PR',
                  'Gas snapshot tracked (no regressions)',
                  'Fork tests pinned to specific block',
                  'Fuzz runs configured in CI (≥ 500)',
                  'Coverage report reviewed before merge',
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
          {['Testing', 'Foundry', 'Hardhat', 'Fuzzing', 'Invariant', 'Unit Test', 'Integration', 'Fork Testing', 'Coverage', 'Formal Verification'].map((tag) => (
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
            <Link href="/learn/best-practices/audit-preparation-guide" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Preparing Your Protocol for Audit</h4>
              <p className="text-gray-500 text-sm">Complete checklist for getting your smart contracts ready for a professional security audit.</p>
            </Link>
            <Link href="/learn/best-practices/gas-optimization-security" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Gas Optimization Without Compromising Security</h4>
              <p className="text-gray-500 text-sm">How to optimize gas costs while maintaining security guarantees.</p>
            </Link>
            <Link href="/learn/best-practices/checks-effects-interactions" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Checks-Effects-Interactions Pattern</h4>
              <p className="text-gray-500 text-sm">The fundamental pattern for writing secure smart contracts and preventing reentrancy.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Is your test suite bulletproof?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Even well-tested contracts can have gaps. Our automated audit catches vulnerabilities
            that testing alone misses — reentrancy paths, access control gaps, and logic errors.
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
