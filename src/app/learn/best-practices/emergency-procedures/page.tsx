'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function EmergencyProceduresPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Implementing Emergency Stop Mechanisms' },
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
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-400/10 text-red-400 border border-red-400/20">
            Emergency
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Implementing Emergency Stop Mechanisms
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          No matter how well-tested your contracts are, you need a plan for when things go wrong.
          Emergency stop mechanisms — circuit breakers, pause functionality, and graceful shutdown
          procedures — give you the ability to protect user funds during an active exploit or critical bug discovery.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            6 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Dec 3, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Pausable, Emergency, Circuit Breaker
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#why-emergency" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. Why Emergency Mechanisms Matter
            </a>
          </li>
          <li>
            <a href="#pausable" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. OpenZeppelin Pausable
            </a>
          </li>
          <li>
            <a href="#granular-pause" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Granular Pause Controls
            </a>
          </li>
          <li>
            <a href="#circuit-breaker" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. Circuit Breaker Pattern
            </a>
          </li>
          <li>
            <a href="#timelock" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Timelocks &amp; Governance Guards
            </a>
          </li>
          <li>
            <a href="#emergency-withdrawal" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Emergency Withdrawal
            </a>
          </li>
          <li>
            <a href="#rate-limiting" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. Rate Limiting &amp; Caps
            </a>
          </li>
          <li>
            <a href="#monitoring" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Off-Chain Monitoring &amp; Alerts
            </a>
          </li>
          <li>
            <a href="#anti-patterns" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Emergency Anti-Patterns
            </a>
          </li>
          <li>
            <a href="#incident-response" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Incident Response Playbook
            </a>
          </li>
          <li>
            <a href="#real-world" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Real-World Emergency Responses
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Emergency Readiness Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — Why Emergency Mechanisms */}
        <section id="why-emergency">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            Why Emergency Mechanisms Matter
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Smart contracts are immutable. Once deployed, you can&apos;t patch them. If a vulnerability
            is discovered — or actively exploited — the only tools you have are the emergency mechanisms
            you built <strong className="text-white">before</strong> deployment. Without them, you watch
            helplessly as funds drain.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20 text-center">
              <div className="text-3xl font-bold text-red-400 mb-1">$197M</div>
              <div className="text-sm text-gray-400">Euler Finance — no pause mechanism fast enough</div>
            </div>
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20 text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">$850M</div>
              <div className="text-sm text-gray-400">Wormhole — saved via emergency governance action</div>
            </div>
            <div className="p-5 rounded-xl bg-yellow-400/5 border border-yellow-400/20 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-1">~60s</div>
              <div className="text-sm text-gray-400">Average time to pause needed after exploit detection</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-white font-semibold mb-2">Scenarios That Require Emergency Stop</div>
              <ul className="text-sm text-gray-400 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-red-400">•</span> Active drain exploit in progress</li>
                <li className="flex items-start gap-2"><span className="text-red-400">•</span> Oracle returning stale/manipulated prices</li>
                <li className="flex items-start gap-2"><span className="text-red-400">•</span> Critical bug discovered pre-exploit</li>
                <li className="flex items-start gap-2"><span className="text-red-400">•</span> Upstream dependency compromise (bridge hack)</li>
                <li className="flex items-start gap-2"><span className="text-red-400">•</span> Abnormal withdrawal volume detected</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-white font-semibold mb-2">Decentralization vs Safety Trade-off</div>
              <p className="text-sm text-gray-400">
                Emergency controls require some centralized authority (owner, multisig, guardian).
                This is a <strong className="text-white">deliberate trade-off</strong> — a 3/5 multisig
                that can pause the protocol is far better than losing all user funds because nobody
                could act. Protocols can progressively decentralize these controls as they mature.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — OpenZeppelin Pausable */}
        <section id="pausable">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            OpenZeppelin Pausable
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The simplest and most battle-tested approach. OpenZeppelin&apos;s <code className="text-lime-400">Pausable</code> contract
            provides a <code className="text-lime-400">whenNotPaused</code> modifier and
            <code className="text-lime-400"> _pause()</code> / <code className="text-lime-400">_unpause()</code> internal
            functions. Add the modifier to any function you want to be pausable.
          </p>

          <CodeBlock
            language="solidity"
            filename="PausableVault.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract PausableVault is Pausable, Ownable2Step {
    mapping(address => uint256) public balances;

    constructor() Ownable(msg.sender) {}

    // ✅ Deposits can be paused during emergencies
    function deposit() external payable whenNotPaused {
        require(msg.value > 0, "Zero deposit");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    // ✅ Withdrawals should ALWAYS work (even when paused)
    // Users must always be able to retrieve their funds
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");
        balances[msg.sender] -= amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
        emit Withdrawn(msg.sender, amount);
    }

    // Only owner (ideally a multisig) can pause
    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
}`}
          />

          <AlertBox type="warning" title="Never Pause Withdrawals">
            Pausing withdrawals traps user funds and creates a rug-pull vector. The golden rule:
            <strong> pause deposits, swaps, and borrows — never pause withdrawals</strong>. Users must
            always be able to exit with their assets.
          </AlertBox>
        </section>

        {/* Section 3 — Granular Pause */}
        <section id="granular-pause">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Granular Pause Controls
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A single global pause is often too coarse. If only the lending functionality has a bug,
            you shouldn&apos;t need to pause swaps too. Granular pause allows you to disable specific
            operations independently.
          </p>

          <CodeBlock
            language="solidity"
            filename="GranularPause.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract GranularPause is AccessControl {
    bytes32 public constant GUARDIAN_ROLE = keccak256("GUARDIAN_ROLE");

    // Bitmask for pause flags — gas-efficient
    uint256 private _pauseFlags;

    uint256 public constant DEPOSIT_PAUSED  = 1 << 0;  // bit 0
    uint256 public constant WITHDRAW_PAUSED = 1 << 1;  // bit 1 (use sparingly!)
    uint256 public constant BORROW_PAUSED   = 1 << 2;  // bit 2
    uint256 public constant SWAP_PAUSED     = 1 << 3;  // bit 3
    uint256 public constant LIQUIDATE_PAUSED = 1 << 4; // bit 4

    modifier whenNotPaused(uint256 flag) {
        require(_pauseFlags & flag == 0, "Operation paused");
        _;
    }

    function setPause(uint256 flag, bool paused) external onlyRole(GUARDIAN_ROLE) {
        if (paused) {
            _pauseFlags |= flag;   // Set bit
        } else {
            _pauseFlags &= ~flag;  // Clear bit
        }
        emit PauseUpdated(flag, paused, msg.sender);
    }

    function isPaused(uint256 flag) external view returns (bool) {
        return _pauseFlags & flag != 0;
    }

    // Usage
    function deposit() external payable whenNotPaused(DEPOSIT_PAUSED) {
        // ... deposit logic
    }

    function borrow(uint256 amount) external whenNotPaused(BORROW_PAUSED) {
        // ... borrow logic
    }

    function swap(address tokenIn, address tokenOut, uint256 amount)
        external
        whenNotPaused(SWAP_PAUSED)
    {
        // ... swap logic
    }

    event PauseUpdated(uint256 indexed flag, bool paused, address guardian);
}`}
          />

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">Benefits</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Minimize disruption — only pause affected operations</li>
                <li>• Bitmask is gas-efficient (single SLOAD for all flags)</li>
                <li>• Separate guardian role — faster than going through governance</li>
                <li>• Each operation can be controlled independently</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
              <div className="text-yellow-400 font-semibold mb-2">Considerations</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• More complex to manage than a single pause</li>
                <li>• Guardian key management is critical</li>
                <li>• Need monitoring to detect when to pause</li>
                <li>• Consider a &quot;pause all&quot; function for catastrophic scenarios</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 — Circuit Breaker */}
        <section id="circuit-breaker">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            Circuit Breaker Pattern
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            A circuit breaker <strong className="text-white">automatically pauses</strong> the protocol
            when anomalous activity is detected — no human intervention needed. This is essential because
            exploits often happen faster than any team can respond manually.
          </p>

          <CodeBlock
            language="solidity"
            filename="CircuitBreaker.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract CircuitBreaker {
    // Track withdrawals in rolling time windows
    uint256 public constant WINDOW_DURATION = 1 hours;
    uint256 public constant MAX_WITHDRAWAL_PER_WINDOW = 100 ether;

    uint256 private _windowStart;
    uint256 private _windowWithdrawals;
    bool public circuitBroken;

    event CircuitBroken(uint256 totalWithdrawn, uint256 timestamp);
    event CircuitReset(address admin, uint256 timestamp);

    modifier circuitNotBroken() {
        require(!circuitBroken, "Circuit breaker triggered");
        _;
    }

    function _checkCircuitBreaker(uint256 amount) internal {
        // Start new window if current one expired
        if (block.timestamp >= _windowStart + WINDOW_DURATION) {
            _windowStart = block.timestamp;
            _windowWithdrawals = 0;
        }

        _windowWithdrawals += amount;

        // Trip the breaker if threshold exceeded
        if (_windowWithdrawals > MAX_WITHDRAWAL_PER_WINDOW) {
            circuitBroken = true;
            emit CircuitBroken(_windowWithdrawals, block.timestamp);
        }
    }

    // Only admin can reset after investigating
    function _resetCircuitBreaker() internal {
        circuitBroken = false;
        _windowStart = block.timestamp;
        _windowWithdrawals = 0;
        emit CircuitReset(msg.sender, block.timestamp);
    }
}

contract ProtectedVault is CircuitBreaker {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) external circuitNotBroken {
        require(balances[msg.sender] >= amount, "Insufficient");

        // Check if this withdrawal triggers the circuit breaker
        _checkCircuitBreaker(amount);

        balances[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
    }
}`}
          />

          <AlertBox type="info" title="Tuning the Thresholds">
            Set the circuit breaker threshold based on your protocol&apos;s normal activity.
            If your vault typically sees 20 ETH in withdrawals per hour, set the threshold at
            3-5× that (~60-100 ETH). Too low and you&apos;ll get false positives; too high and it
            won&apos;t trigger in time. Monitor and adjust based on real usage data.
          </AlertBox>
        </section>

        {/* Section 5 — Timelocks */}
        <section id="timelock">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Timelocks &amp; Governance Guards
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Timelocks delay sensitive admin actions (upgrading, changing parameters, moving funds) so the
            community has time to review and react. This prevents a compromised admin key from causing
            instant damage.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Instant Admin Changes',
              code: `contract RiskyVault {
    address public oracle;
    uint256 public collateralFactor;

    // Attacker with admin key changes oracle
    // and drains protocol in same block
    function setOracle(address newOracle)
        external onlyOwner
    {
        oracle = newOracle; // Instant!
    }

    function setCollateralFactor(uint256 cf)
        external onlyOwner
    {
        collateralFactor = cf; // Instant!
    }

    // If admin key is leaked:
    // Block N: setOracle(malicious)
    // Block N: borrow(everything)
    // No time for anyone to react`
            }}
            secure={{
              title: '✅ Timelocked Changes',
              code: `contract SafeVault {
    uint256 public constant TIMELOCK = 48 hours;

    struct PendingChange {
        bytes32 id;
        uint256 executeAfter;
        bool executed;
    }

    mapping(bytes32 => PendingChange) public pending;

    function proposeOracleChange(address newOracle)
        external onlyOwner
    {
        bytes32 id = keccak256(
            abi.encode("oracle", newOracle)
        );
        pending[id] = PendingChange({
            id: id,
            executeAfter: block.timestamp + TIMELOCK,
            executed: false
        });
        emit ChangeProposed(id, block.timestamp);
    }

    function executeOracleChange(address newOracle)
        external onlyOwner
    {
        bytes32 id = keccak256(
            abi.encode("oracle", newOracle)
        );
        PendingChange storage p = pending[id];
        require(block.timestamp >= p.executeAfter);
        require(!p.executed, "Already executed");
        p.executed = true;
        oracle = newOracle;
    }
    // 48-hour window for community to react!`
            }}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Timelock Best Practices</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-lime-400">1.</span>
                <span>Use <strong className="text-white">OpenZeppelin&apos;s TimelockController</strong> instead of building your own</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">2.</span>
                <span><strong className="text-white">Separate pause from timelock</strong> — pausing must be instant; parameter changes get timelocked</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">3.</span>
                <span>Include a <strong className="text-white">cancel function</strong> so proposed changes can be aborted if the community objects</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">4.</span>
                <span>Emit events for <strong className="text-white">proposed</strong>, <strong className="text-white">executed</strong>, and <strong className="text-white">cancelled</strong> changes — so monitoring tools can track them</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-lime-400">5.</span>
                <span>Typical timelock: <strong className="text-white">24-72 hours</strong> for parameter changes, <strong className="text-white">7 days</strong> for upgrades</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — Emergency Withdrawal */}
        <section id="emergency-withdrawal">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Emergency Withdrawal
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Emergency withdrawal functions let users retrieve their principal funds even when normal
            operations are paused. The key principle: <strong className="text-white">users forfeit
            any outstanding rewards or yield</strong> in exchange for immediate access to their
            deposited capital.
          </p>

          <CodeBlock
            language="solidity"
            filename="EmergencyWithdraw.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract YieldVault {
    using SafeERC20 for IERC20;

    IERC20 public immutable stakingToken;
    bool public emergencyMode;

    struct UserInfo {
        uint256 deposited;
        uint256 rewardDebt;
    }

    mapping(address => UserInfo) public userInfo;

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    // Normal withdraw: claims rewards + principal
    function withdraw(uint256 amount) external {
        require(!emergencyMode, "Use emergencyWithdraw");
        UserInfo storage user = userInfo[msg.sender];
        require(user.deposited >= amount, "Insufficient");

        uint256 pending = _pendingRewards(msg.sender);
        user.deposited -= amount;
        user.rewardDebt = _calculateDebt(user.deposited);

        // Transfer rewards + principal
        _safeTransferRewards(msg.sender, pending);
        stakingToken.safeTransfer(msg.sender, amount);
    }

    // ✅ Emergency withdraw: principal only, no rewards
    // Works even when protocol is in emergency mode
    function emergencyWithdraw() external {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amount = user.deposited;
        require(amount > 0, "Nothing to withdraw");

        // Reset user state completely
        user.deposited = 0;
        user.rewardDebt = 0;

        // Transfer ONLY the deposited principal
        stakingToken.safeTransfer(msg.sender, amount);

        emit EmergencyWithdrawn(msg.sender, amount);
    }

    // Admin activates emergency mode
    function setEmergencyMode(bool _emergency) external onlyOwner {
        emergencyMode = _emergency;
        emit EmergencyModeSet(_emergency, block.timestamp);
    }

    function _pendingRewards(address) internal view returns (uint256) { return 0; }
    function _calculateDebt(uint256) internal pure returns (uint256) { return 0; }
    function _safeTransferRewards(address, uint256) internal {}

    event EmergencyWithdrawn(address indexed user, uint256 amount);
    event EmergencyModeSet(bool enabled, uint256 timestamp);
}`}
          />

          <AlertBox type="success" title="MasterChef Pattern">
            This pattern originated in SushiSwap&apos;s MasterChef contract. Almost every yield farm
            now includes <code className="text-lime-400">emergencyWithdraw()</code>. It&apos;s considered
            a mandatory feature — any vault without it is a red flag in audits.
          </AlertBox>
        </section>

        {/* Section 7 — Rate Limiting */}
        <section id="rate-limiting">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            Rate Limiting &amp; Caps
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Rate limiting constrains how much value can flow through the protocol in a given time
            window. Even if an attacker finds an exploit, rate limiting caps the maximum possible
            damage — buying time for the team to respond.
          </p>

          <CodeBlock
            language="solidity"
            filename="RateLimitedBridge.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RateLimitedBridge {
    uint256 public constant RATE_LIMIT_DURATION = 24 hours;
    uint256 public maxDailyVolume = 1000 ether;

    uint256 private _currentWindowStart;
    uint256 private _currentVolume;

    // Per-transaction cap
    uint256 public maxTransactionSize = 100 ether;

    modifier withinLimits(uint256 amount) {
        require(amount <= maxTransactionSize, "Exceeds tx limit");
        _updateRateLimit(amount);
        _;
    }

    function _updateRateLimit(uint256 amount) private {
        // Reset window if expired
        if (block.timestamp >= _currentWindowStart + RATE_LIMIT_DURATION) {
            _currentWindowStart = block.timestamp;
            _currentVolume = 0;
        }

        _currentVolume += amount;
        require(_currentVolume <= maxDailyVolume, "Daily limit exceeded");
    }

    function bridgeOut(
        address token, uint256 amount, uint256 destChain
    ) external withinLimits(amount) {
        // ... bridge logic
    }

    // Returns remaining capacity in current window
    function remainingDailyCapacity() external view returns (uint256) {
        if (block.timestamp >= _currentWindowStart + RATE_LIMIT_DURATION) {
            return maxDailyVolume;
        }
        if (_currentVolume >= maxDailyVolume) return 0;
        return maxDailyVolume - _currentVolume;
    }
}`}
          />

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lime-400 font-semibold mb-2">Per-Transaction Caps</div>
              <p className="text-sm text-gray-400">
                Limit the max size of a single operation. Prevents flash-loan-scale attacks
                in a single transaction.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lime-400 font-semibold mb-2">Rolling Window Limits</div>
              <p className="text-sm text-gray-400">
                Cap total volume over a time period (e.g., 24h). Limits cumulative damage from
                repeated smaller exploits.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lime-400 font-semibold mb-2">TVL-Proportional Limits</div>
              <p className="text-sm text-gray-400">
                Set limits as a % of TVL (e.g., max 10% withdrawn per day). Scales naturally as
                the protocol grows.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8 — Off-Chain Monitoring */}
        <section id="monitoring">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Off-Chain Monitoring &amp; Alerts
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            On-chain mechanisms can only react to what&apos;s happening on-chain. Off-chain monitoring
            gives you <strong className="text-white">advance warning</strong> by watching for anomalous
            patterns, mempool activity, and governance proposals.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">What to Monitor</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-lime-400 text-sm font-medium mb-2">On-Chain Signals</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Large withdrawal spikes (3-5× normal volume)</li>
                    <li>• Oracle price deviations ({'>'}5% from reference)</li>
                    <li>• Flash loan borrows targeting your pools</li>
                    <li>• New contract interactions (unknown callers)</li>
                    <li>• Admin key transactions from unusual sources</li>
                  </ul>
                </div>
                <div>
                  <div className="text-lime-400 text-sm font-medium mb-2">Off-Chain Signals</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Exploit discussion on Twitter/Discord</li>
                    <li>• Similar protocol exploit (copycat risk)</li>
                    <li>• Governance proposal to drain treasury</li>
                    <li>• Dependency CVE reports (OpenZeppelin, etc.)</li>
                    <li>• Suspicious mempool transactions (frontrunning)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-3">Monitoring Tools</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {[
                  { name: 'OpenZeppelin Defender', desc: 'Automated monitoring, alerting, and response' },
                  { name: 'Forta Network', desc: 'Decentralized threat detection bots' },
                  { name: 'Tenderly', desc: 'Real-time alerting + transaction simulation' },
                  { name: 'Chainalysis / Elliptic', desc: 'Wallet risk scoring and sanctions screening' },
                ].map((tool, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                    <span className="text-lime-400 font-medium whitespace-nowrap">{tool.name}</span>
                    <span className="text-gray-500">— {tool.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 9 — Anti-Patterns */}
        <section id="anti-patterns">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Emergency Anti-Patterns
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Some &quot;emergency&quot; mechanisms are actually attack vectors themselves. Avoid these
            patterns that give teams too much power or create new vulnerabilities.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Admin Can Drain All Funds
              </h3>
              <CodeBlock
                language="solidity"
                filename="AntiPattern_Drain.sol"
                code={`// ❌ NEVER DO THIS — classic rug-pull function
function emergencyDrain() external onlyOwner {
    payable(owner()).transfer(address(this).balance);
}

// ✅ INSTEAD: Emergency withdraw sends funds back to depositors
function emergencyWithdraw() external {
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;
    payable(msg.sender).transfer(amount);
}`}
              />
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Single EOA Controls Pause
              </h3>
              <p className="text-gray-400 text-sm">
                If a single externally-owned account (EOA) can pause the entire protocol, a
                compromised key means an attacker can permanently freeze all user funds. Use a
                <strong className="text-white"> multisig</strong> (3/5 minimum) for pause authority.
                Consider a separate <strong className="text-white">guardian role</strong> that can
                only pause (not unpause) — so even a compromised guardian can&apos;t permanently
                freeze the protocol.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                No Way to Unpause
              </h3>
              <p className="text-gray-400 text-sm">
                If the pause key is lost or the owner contract is compromised, the protocol
                stays paused forever. Always have a <strong className="text-white">fallback unpause
                mechanism</strong> — e.g., a governance vote or time-based automatic unpause
                after 7 days.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Pausing Without Events
              </h3>
              <p className="text-gray-400 text-sm">
                If pause/unpause actions don&apos;t emit events, off-chain monitoring and
                frontends can&apos;t detect the state change. Always emit events for all emergency
                actions. OpenZeppelin&apos;s Pausable does this automatically.
              </p>
            </div>
          </div>
        </section>

        {/* Section 10 — Incident Response Playbook */}
        <section id="incident-response">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Incident Response Playbook
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Having emergency mechanisms is only half the battle. You also need a
            <strong className="text-white"> documented, rehearsed incident response plan</strong> so
            the team knows exactly what to do when an alert fires at 3 AM.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-400/20 text-red-400 font-bold text-sm shrink-0">
                T+0
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Detection &amp; Triage (0-5 min)</div>
                <p className="text-sm text-gray-400">
                  Alert fires from monitoring. On-call engineer confirms it&apos;s real (not a false positive).
                  Immediately execute <strong className="text-white">PAUSE</strong> via multisig.
                  Open war room channel.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-400/20 text-yellow-400 font-bold text-sm shrink-0">
                T+5
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Assessment (5-30 min)</div>
                <p className="text-sm text-gray-400">
                  Identify the vulnerability. Trace transactions. Determine: What was exploited?
                  How much was lost? Is the exploit still ongoing? Are other contracts at risk?
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-400/5 border border-blue-400/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-400/20 text-blue-400 font-bold text-sm shrink-0">
                T+30
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Containment (30-60 min)</div>
                <p className="text-sm text-gray-400">
                  If the attacker still has remaining funds at risk, attempt white-hat rescue.
                  Contact exchanges to freeze attacker&apos;s addresses. Coordinate with other
                  affected protocols.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-400/20 text-green-400 font-bold text-sm shrink-0">
                T+1h
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Communication (1-2 hours)</div>
                <p className="text-sm text-gray-400">
                  Public disclosure: what happened, what&apos;s the impact, what actions were taken.
                  Transparency builds trust. Don&apos;t hide the severity — users will find out.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-400/5 border border-purple-400/20">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-400/20 text-purple-400 font-bold text-sm shrink-0">
                T+24h
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Recovery &amp; Post-Mortem (24-72 hours)</div>
                <p className="text-sm text-gray-400">
                  Deploy fix (if upgradeable) or migration contract. Plan user reimbursement.
                  Write detailed post-mortem. Resume operations with additional monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 — Real-World Responses */}
        <section id="real-world">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Real-World Emergency Responses
          </h2>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-green-400">✓</span>
                Compound — cToken Bug (Sept 2021) — Good Response
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                A bug in Compound&apos;s reward distribution caused excessive COMP tokens to be distributed.
                The team couldn&apos;t immediately fix it due to a timelock, but they publicly disclosed the
                bug, engaged the community, and coordinated a governance fix. Most users voluntarily
                returned over-distributed tokens.
              </p>
              <div className="text-xs text-gray-600">
                Lesson: Transparent communication + community trust = effective response even without instant fix
              </div>
            </div>

            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-green-400">✓</span>
                PoolTogether — White Hat Rescue (Oct 2023) — Fast Pause
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                A vulnerability was reported by a white-hat hacker via Immunefi. The team used their
                guardian multisig to pause affected vaults within minutes, rescued user funds, deployed
                a fix, and resumed operations — zero user funds lost.
              </p>
              <div className="text-xs text-gray-600">
                Lesson: Pre-deployed pause mechanism + rehearsed response = zero losses
              </div>
            </div>

            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <h3 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-400">✗</span>
                Ronin Bridge — Delayed Detection (March 2022) — $625M
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                The Ronin Bridge was exploited for $625M, but the team didn&apos;t detect it for
                <strong className="text-white"> 6 days</strong> — only discovering the breach when
                a user reported they couldn&apos;t withdraw. No real-time monitoring, no circuit
                breakers, no automated alerts.
              </p>
              <div className="text-xs text-gray-600">
                Lesson: Without monitoring, you don&apos;t even know you&apos;re being exploited
              </div>
            </div>
          </div>
        </section>

        {/* Section 12 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Emergency Readiness Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* On-Chain Mechanisms */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-lime-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">⛓</span> On-Chain Mechanisms
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Pause functionality on all sensitive operations',
                  'Withdrawals remain accessible when paused',
                  'emergencyWithdraw() for yield/staking vaults',
                  'Circuit breaker with tuned thresholds',
                  'Rate limiting on high-value operations',
                  'Per-transaction caps on bridges/transfers',
                  'Timelock on admin parameter changes',
                  'Multisig (3/5+) for pause authority',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Off-Chain Readiness */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-yellow-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-yellow-400">📡</span> Off-Chain Readiness
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Real-time monitoring configured and alerting',
                  'Anomaly detection on withdrawal volume',
                  'Oracle price deviation alerts',
                  'War room communication channel ready',
                  'Incident response playbook documented',
                  'Team drills conducted (at least quarterly)',
                  'Bug bounty program active (Immunefi, etc.)',
                  'Emergency contacts for exchanges & partners',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Access Control */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-blue-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-blue-400">🔑</span> Access Control
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Pause role = multisig (fast, no timelock)',
                  'Parameter changes = timelocked (24-72h)',
                  'Upgrades = governance + long timelock (7d)',
                  'Guardian can pause but NOT unpause alone',
                  'Fallback unpause mechanism exists',
                  'Key rotation procedure documented',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testing */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-purple-400/20">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-purple-400">🧪</span> Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Pause/unpause tested in unit tests',
                  'Emergency withdrawal tested end-to-end',
                  'Circuit breaker threshold tested',
                  'Paused state: deposits revert, withdrawals work',
                  'Multisig execution tested on testnet',
                  'Recovery procedure tested on fork',
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
          {['Pausable', 'Emergency', 'Circuit Breaker', 'Timelock', 'Rate Limiting', 'Monitoring', 'Incident Response', 'Multisig'].map((tag) => (
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
            <Link href="/learn/best-practices/secure-access-control" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Implementing Secure Access Control</h4>
              <p className="text-gray-500 text-sm">Role-based access control patterns for managing who can pause and administer your protocol.</p>
            </Link>
            <Link href="/learn/best-practices/upgradeable-contracts" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Safe Upgradeable Contract Patterns</h4>
              <p className="text-gray-500 text-sm">How to deploy fixes after an emergency using proxy patterns safely.</p>
            </Link>
            <Link href="/learn/vulnerabilities/reentrancy-attack" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Reentrancy Attack</h4>
              <p className="text-gray-500 text-sm">The most common exploit that emergency mechanisms are designed to mitigate.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Is your protocol prepared for emergencies?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Missing pause mechanisms and circuit breakers are among the most common audit findings.
            Let us verify your emergency procedures before it&apos;s too late.
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
