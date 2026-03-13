'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function SecureAccessControlPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Secure Access Control' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30">
            Best Practice
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
            Authorization
          </span>
        </div>

        <h1>Implementing Secure Access Control</h1>

        <p className="text-lg text-gray-400 mt-4 max-w-3xl">
          Best practices for role-based access control using OpenZeppelin&apos;s AccessControl, Ownable patterns,
          and custom authorization solutions. Learn how to protect your protocol&apos;s critical functions
          from unauthorized access.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            8 min read
          </span>
          <span>•</span>
          <span>Updated Dec 18, 2024</span>
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
          <li><a href="#why-access-control" className="toc-link hover:text-lime-400">Why Access Control Matters</a></li>
          <li><a href="#ownable-pattern" className="toc-link hover:text-lime-400">The Ownable Pattern</a></li>
          <li><a href="#role-based-access" className="toc-link hover:text-lime-400">Role-Based Access Control (RBAC)</a></li>
          <li><a href="#custom-modifiers" className="toc-link hover:text-lime-400">Custom Access Modifiers</a></li>
          <li><a href="#multi-sig" className="toc-link hover:text-lime-400">Multi-Signature Authorization</a></li>
          <li><a href="#timelocks" className="toc-link hover:text-lime-400">Timelocks &amp; Governance</a></li>
          <li><a href="#common-vulnerabilities" className="toc-link hover:text-lime-400">Common Access Control Vulnerabilities</a></li>
          <li><a href="#tx-origin" className="toc-link hover:text-lime-400">tx.origin vs msg.sender</a></li>
          <li><a href="#upgradeable-access" className="toc-link hover:text-lime-400">Access Control in Upgradeable Contracts</a></li>
          <li><a href="#checklist" className="toc-link hover:text-lime-400">Access Control Checklist</a></li>
          <li><a href="#further-reading" className="toc-link hover:text-lime-400">Further Reading</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        {/* Overview */}
        <section id="overview">
          <h2>Overview</h2>
          <p>
            Access control determines <strong>who</strong> can call <strong>which</strong> functions in your smart
            contract. Without it, anyone can call admin functions — minting tokens, pausing the protocol,
            upgrading logic, or draining treasury funds. Proper access control is the difference between a
            secure protocol and a catastrophic exploit.
          </p>
          <p>
            Solidity provides no built-in authorization system, so developers must implement their own. The
            ecosystem has converged on several well-tested patterns — from simple single-owner models to
            sophisticated role-based hierarchies.
          </p>

          <AlertBox type="danger" title="Real-World Impact">
            Access control vulnerabilities are one of the most common causes of smart contract exploits.
            In 2023 alone, over <strong>$800M</strong> was lost due to unauthorized access — from unprotected
            <code>initialize()</code> functions to missing role checks on critical operations.
          </AlertBox>
        </section>

        {/* Why Access Control Matters */}
        <section id="why-access-control">
          <h2>Why Access Control Matters</h2>
          <p>
            Smart contracts are <em>public by default</em>. Every external and public function can be called
            by any address on the network — EOAs, other contracts, and even automated bots. Without
            explicit authorization checks, there is no restriction.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-3">🚨 Functions That Need Protection</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Token minting and burning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Pausing / unpausing the protocol</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Upgrading contract logic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Withdrawing treasury funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Changing protocol parameters (fees, limits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Whitelisting / blacklisting addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Setting oracle addresses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span>Emergency shutdown triggers</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-green-500/20 bg-green-500/5">
              <h4 className="text-green-400 font-semibold mb-3">✅ Access Control Strategies</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Ownable</strong> — Single owner, simple admin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>RBAC</strong> — Multiple roles, granular permissions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Multi-sig</strong> — N-of-M approval required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Timelock</strong> — Delayed execution for governance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>DAO governance</strong> — Community voting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Allowlists</strong> — Address-level permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Hierarchical</strong> — Role admin chains</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span><strong>Renounce</strong> — Remove admin keys entirely</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ownable Pattern */}
        <section id="ownable-pattern">
          <h2>The Ownable Pattern</h2>
          <p>
            The simplest form of access control: a single <code>owner</code> address that has admin
            privileges. OpenZeppelin&apos;s <code>Ownable</code> is the standard implementation.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20, Ownable {
    uint256 public maxSupply;

    constructor(uint256 _maxSupply)
        ERC20("MyToken", "MTK")
        Ownable(msg.sender) // Sets deployer as initial owner
    {
        maxSupply = _maxSupply;
    }

    /// @notice Only the owner can mint new tokens
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= maxSupply, "Exceeds max supply");
        _mint(to, amount);
    }

    /// @notice Only the owner can change the max supply
    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        require(_maxSupply >= totalSupply(), "Below current supply");
        maxSupply = _maxSupply;
    }

    /// @notice Owner can transfer ownership to a new address
    // Inherited: transferOwnership(address newOwner)

    /// @notice Owner can renounce ownership permanently
    // Inherited: renounceOwnership()
}`}
            language="solidity"
            filename="MyToken.sol"
          />

          <AlertBox type="warning" title="Ownable Limitations">
            <code>Ownable</code> is fine for simple use cases, but has significant limitations:
            it&apos;s a <strong>single point of failure</strong>. If the owner key is compromised, the entire
            protocol is at risk. If the key is lost, admin functionality is gone forever. For production
            protocols, use RBAC or multi-sig instead.
          </AlertBox>

          <h3>Ownable2Step — Safer Ownership Transfer</h3>
          <p>
            OpenZeppelin&apos;s <code>Ownable2Step</code> adds a confirmation step to ownership transfers,
            preventing accidental transfers to wrong addresses:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract SafeOwnable is Ownable2Step {
    constructor() Ownable(msg.sender) {}

    // Step 1: Current owner initiates transfer
    // transferOwnership(newOwner) → sets pendingOwner

    // Step 2: New owner must actively accept
    // acceptOwnership() → only callable by pendingOwner

    // This prevents transferring ownership to:
    // - A typo address
    // - A contract that can't call acceptOwnership()
    // - An address whose private key is unknown
}`}
            language="solidity"
            filename="SafeOwnable.sol"
          />

          <AlertBox type="success" title="Best Practice">
            Always prefer <code>Ownable2Step</code> over <code>Ownable</code>. The two-step transfer
            prevents irreversible ownership loss from typos or misconfigurations.
          </AlertBox>
        </section>

        {/* Role-Based Access Control */}
        <section id="role-based-access">
          <h2>Role-Based Access Control (RBAC)</h2>
          <p>
            For protocols with multiple admin functions that should be controlled by different parties,
            OpenZeppelin&apos;s <code>AccessControl</code> provides a robust RBAC system. Each role is
            identified by a <code>bytes32</code> hash and can be granted to multiple addresses.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract ManagedToken is ERC20, AccessControl, Pausable {
    // Define roles as constants — hashed for gas efficiency
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    bytes32 public constant FEE_MANAGER_ROLE = keccak256("FEE_MANAGER_ROLE");

    uint256 public transferFee; // basis points (1 = 0.01%)

    constructor() ERC20("ManagedToken", "MGD") {
        // DEFAULT_ADMIN_ROLE can grant/revoke all other roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // Optionally grant initial roles
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    /// @notice Mint — only MINTER_ROLE
    function mint(address to, uint256 amount)
        external
        onlyRole(MINTER_ROLE)
    {
        _mint(to, amount);
    }

    /// @notice Burn — only BURNER_ROLE
    function burn(address from, uint256 amount)
        external
        onlyRole(BURNER_ROLE)
    {
        _burn(from, amount);
    }

    /// @notice Pause — only PAUSER_ROLE
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /// @notice Unpause — only PAUSER_ROLE
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /// @notice Set fee — only FEE_MANAGER_ROLE
    function setTransferFee(uint256 _fee)
        external
        onlyRole(FEE_MANAGER_ROLE)
    {
        require(_fee <= 1000, "Fee too high"); // Max 10%
        transferFee = _fee;
    }
}`}
            language="solidity"
            filename="ManagedToken.sol"
          />

          <h3>Role Hierarchy — Admin Roles</h3>
          <p>
            Each role has an <strong>admin role</strong> that can grant and revoke it. By default,
            <code>DEFAULT_ADMIN_ROLE</code> is the admin for all roles. You can create custom hierarchies:
          </p>

          <CodeBlock
            code={`contract HierarchicalAccess is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    constructor() {
        // DEFAULT_ADMIN_ROLE → can manage ADMIN_ROLE
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        // ADMIN_ROLE → can manage OPERATOR_ROLE
        _setRoleAdmin(OPERATOR_ROLE, ADMIN_ROLE);

        // OPERATOR_ROLE → can manage EXECUTOR_ROLE
        _setRoleAdmin(EXECUTOR_ROLE, OPERATOR_ROLE);

        // Hierarchy:
        // DEFAULT_ADMIN_ROLE
        //   └── ADMIN_ROLE
        //         └── OPERATOR_ROLE
        //               └── EXECUTOR_ROLE
    }
}`}
            language="solidity"
            filename="HierarchicalAccess.sol"
          />

          <AlertBox type="info" title="Principle of Least Privilege">
            Grant each address only the minimum roles it needs. A minting bot should have <code>MINTER_ROLE</code>
            only — not <code>DEFAULT_ADMIN_ROLE</code>. If the bot&apos;s key is compromised, the damage is
            limited to unauthorized minting, not total protocol takeover.
          </AlertBox>
        </section>

        {/* Custom Modifiers */}
        <section id="custom-modifiers">
          <h2>Custom Access Modifiers</h2>
          <p>
            Sometimes you need access control logic beyond simple role checks — rate limiting, time
            windows, or conditional permissions. Custom modifiers handle these cases:
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CustomAccess {
    address public owner;
    mapping(address => bool) public operators;
    mapping(address => uint256) public lastActionTime;

    uint256 public constant ACTION_COOLDOWN = 1 hours;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyOperator() {
        require(operators[msg.sender], "Not operator");
        _;
    }

    modifier onlyOwnerOrOperator() {
        require(
            msg.sender == owner || operators[msg.sender],
            "Not authorized"
        );
        _;
    }

    /// @notice Rate-limited action — prevents spam
    modifier rateLimited() {
        require(
            block.timestamp >= lastActionTime[msg.sender] + ACTION_COOLDOWN,
            "Action on cooldown"
        );
        lastActionTime[msg.sender] = block.timestamp;
        _;
    }

    /// @notice Time-windowed action — only during business hours
    modifier onlyDuringWindow(uint256 start, uint256 end) {
        require(
            block.timestamp >= start && block.timestamp <= end,
            "Outside time window"
        );
        _;
    }

    /// @notice Combine modifiers for layered security
    function sensitiveAction()
        external
        onlyOperator
        rateLimited
    {
        // Only operators can call, max once per hour
    }
}`}
            language="solidity"
            filename="CustomAccess.sol"
          />

          <AlertBox type="warning" title="Modifier Ordering">
            Modifiers execute in the order they appear. Place the cheapest checks first (access control)
            and expensive checks last (state reads) to save gas on unauthorized calls that revert early.
          </AlertBox>
        </section>

        {/* Multi-Sig */}
        <section id="multi-sig">
          <h2>Multi-Signature Authorization</h2>
          <p>
            For high-value operations, require multiple signers to approve before execution. This prevents
            a single compromised key from causing catastrophic damage.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleMultiSig {
    address[] public signers;
    uint256 public requiredSignatures;

    struct Proposal {
        address target;
        bytes data;
        uint256 value;
        uint256 approvalCount;
        bool executed;
        mapping(address => bool) hasApproved;
    }

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;

    modifier onlySigner() {
        require(_isSigner(msg.sender), "Not a signer");
        _;
    }

    constructor(address[] memory _signers, uint256 _required) {
        require(_signers.length >= _required, "Not enough signers");
        require(_required > 0, "Need at least 1 signature");

        for (uint256 i = 0; i < _signers.length; i++) {
            require(_signers[i] != address(0), "Invalid signer");
            signers.push(_signers[i]);
        }
        requiredSignatures = _required;
    }

    function propose(
        address target,
        bytes calldata data,
        uint256 value
    ) external onlySigner returns (uint256 proposalId) {
        proposalId = proposalCount++;
        Proposal storage p = proposals[proposalId];
        p.target = target;
        p.data = data;
        p.value = value;

        emit ProposalCreated(proposalId, target, msg.sender);
    }

    function approve(uint256 proposalId) external onlySigner {
        Proposal storage p = proposals[proposalId];
        require(!p.executed, "Already executed");
        require(!p.hasApproved[msg.sender], "Already approved");

        p.hasApproved[msg.sender] = true;
        p.approvalCount++;

        emit ProposalApproved(proposalId, msg.sender);

        // Auto-execute when threshold is met
        if (p.approvalCount >= requiredSignatures) {
            _execute(proposalId);
        }
    }

    function _execute(uint256 proposalId) internal {
        Proposal storage p = proposals[proposalId];
        p.executed = true;

        (bool success, ) = p.target.call{value: p.value}(p.data);
        require(success, "Execution failed");

        emit ProposalExecuted(proposalId);
    }

    function _isSigner(address account) internal view returns (bool) {
        for (uint256 i = 0; i < signers.length; i++) {
            if (signers[i] == account) return true;
        }
        return false;
    }

    event ProposalCreated(uint256 indexed id, address target, address proposer);
    event ProposalApproved(uint256 indexed id, address approver);
    event ProposalExecuted(uint256 indexed id);

    receive() external payable {}
}`}
            language="solidity"
            filename="SimpleMultiSig.sol"
          />

          <AlertBox type="info" title="Production Multi-Sig">
            For production use, don&apos;t roll your own multi-sig. Use battle-tested solutions like{' '}
            <strong>Gnosis Safe (Safe{'{'}&apos;{'}'} Wallet)</strong>, which supports hardware wallet
            signers, module extensions, and has been securing billions of dollars in DeFi.
          </AlertBox>
        </section>

        {/* Timelocks */}
        <section id="timelocks">
          <h2>Timelocks &amp; Governance</h2>
          <p>
            Timelocks add a mandatory delay between proposing an action and executing it. This gives
            users time to react — they can exit the protocol if they disagree with a pending change.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TimelockAdmin is AccessControl {
    bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
    bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");

    uint256 public constant MIN_DELAY = 2 days;
    uint256 public constant MAX_DELAY = 30 days;

    struct TimelockAction {
        address target;
        bytes data;
        uint256 executeAfter;
        bool executed;
        bool cancelled;
    }

    mapping(bytes32 => TimelockAction) public actions;

    function schedule(
        address target,
        bytes calldata data,
        uint256 delay
    ) external onlyRole(PROPOSER_ROLE) returns (bytes32 actionId) {
        require(delay >= MIN_DELAY, "Delay too short");
        require(delay <= MAX_DELAY, "Delay too long");

        actionId = keccak256(abi.encode(target, data, block.timestamp));
        require(actions[actionId].executeAfter == 0, "Already scheduled");

        actions[actionId] = TimelockAction({
            target: target,
            data: data,
            executeAfter: block.timestamp + delay,
            executed: false,
            cancelled: false
        });

        emit ActionScheduled(actionId, target, delay);
    }

    function execute(bytes32 actionId) external onlyRole(EXECUTOR_ROLE) {
        TimelockAction storage action = actions[actionId];
        require(action.executeAfter != 0, "Not scheduled");
        require(!action.executed, "Already executed");
        require(!action.cancelled, "Cancelled");
        require(
            block.timestamp >= action.executeAfter,
            "Timelock not expired"
        );

        action.executed = true;

        (bool success, ) = action.target.call(action.data);
        require(success, "Execution failed");

        emit ActionExecuted(actionId);
    }

    function cancel(bytes32 actionId) external onlyRole(PROPOSER_ROLE) {
        TimelockAction storage action = actions[actionId];
        require(!action.executed, "Already executed");
        action.cancelled = true;

        emit ActionCancelled(actionId);
    }

    event ActionScheduled(bytes32 indexed id, address target, uint256 delay);
    event ActionExecuted(bytes32 indexed id);
    event ActionCancelled(bytes32 indexed id);
}`}
            language="solidity"
            filename="TimelockAdmin.sol"
          />

          <AlertBox type="success" title="Progressive Decentralization">
            Many protocols start with a multi-sig owner, then migrate to a timelock, and eventually to
            full DAO governance. This is called <strong>progressive decentralization</strong> — start
            centralized for agility, decentralize as the protocol matures.
          </AlertBox>
        </section>

        {/* Common Vulnerabilities */}
        <section id="common-vulnerabilities">
          <h2>Common Access Control Vulnerabilities</h2>

          <div className="space-y-6 my-8">
            {/* Vuln 1 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Vulnerability 1: Missing access control on critical functions
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                The most basic and devastating mistake — forgetting to add an access modifier to a function
                that should be restricted.
              </p>

              <CodeComparison
                vulnerable={{
                  title: '❌ No access control',
                  code: `// Anyone can mint unlimited tokens!
function mint(address to, uint256 amount) external {
    _mint(to, amount);
}

// Anyone can set the fee to 100%!
function setFee(uint256 newFee) external {
    fee = newFee;
}`
                }}
                secure={{
                  title: '✅ Protected functions',
                  code: `function mint(address to, uint256 amount)
    external
    onlyRole(MINTER_ROLE)
{
    _mint(to, amount);
}

function setFee(uint256 newFee)
    external
    onlyRole(FEE_MANAGER_ROLE)
{
    require(newFee <= MAX_FEE, "Too high");
    fee = newFee;
}`
                }}
              />
            </div>

            {/* Vuln 2 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Vulnerability 2: Unprotected <code>initialize()</code> in proxies
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                This is one of the most exploited vulnerabilities in DeFi. With upgradeable contracts, the
                <code>initialize()</code> function replaces the constructor — but unlike constructors, it can
                be called by anyone if not properly guarded.
              </p>

              <CodeComparison
                vulnerable={{
                  title: '❌ Anyone can re-initialize',
                  code: `function initialize(address _owner) external {
    owner = _owner;
    // No initializer guard!
    // Attacker calls this and becomes owner
}`
                }}
                secure={{
                  title: '✅ Guarded initializer',
                  code: `import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

function initialize(address _owner)
    external
    initializer  // Can only be called once
{
    __Ownable_init(_owner);
    __Pausable_init();
}`
                }}
              />

              <AlertBox type="danger" title="Real Exploit">
                The Wormhole bridge exploit ($326M) involved an unprotected initialization function.
                The attacker called <code>initialize()</code> on the implementation contract and gained
                control of the guardian set.
              </AlertBox>
            </div>

            {/* Vuln 3 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Vulnerability 3: Centralized admin with no constraints
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                An owner who can drain all funds, change any parameter without limits, or rug-pull instantly
                is a red flag — even if the current owner is trustworthy.
              </p>

              <CodeComparison
                vulnerable={{
                  title: '❌ Unlimited admin power',
                  code: `function withdrawAll() external onlyOwner {
    // Owner can drain everything at any time
    payable(owner).transfer(address(this).balance);
}

function setFee(uint256 _fee) external onlyOwner {
    // No upper bound — owner can set 100% fee
    fee = _fee;
}`
                }}
                secure={{
                  title: '✅ Constrained admin',
                  code: `function emergencyWithdraw() external onlyOwner {
    require(paused(), "Must be paused first");
    // Limited to emergency situations
    payable(owner).transfer(address(this).balance);
    emit EmergencyWithdrawal(owner, address(this).balance);
}

function setFee(uint256 _fee) external onlyOwner {
    require(_fee <= 500, "Fee cannot exceed 5%");
    require(
        _fee <= fee + 100, // Max 1% increase at a time
        "Increase too large"
    );
    fee = _fee;
}`
                }}
              />
            </div>

            {/* Vuln 4 */}
            <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 className="text-red-400 font-semibold mb-2">
                ❌ Vulnerability 4: Default visibility is not <code>internal</code>
              </h4>
              <p className="text-gray-300 text-sm mb-3">
                In older Solidity versions ({'<'}0.5.0), the default visibility for functions was <code>public</code>.
                Even in modern Solidity, developers sometimes declare helper functions as <code>public</code> or
                <code>external</code> when they should be <code>internal</code> or <code>private</code>.
              </p>
              <p className="text-gray-400 text-sm">
                <strong>Fix:</strong> Always explicitly declare function visibility. Use <code>internal</code> or
                <code>private</code> for helper functions. Audit every <code>public</code> and <code>external</code>{' '}
                function for proper access control.
              </p>
            </div>
          </div>
        </section>

        {/* tx.origin vs msg.sender */}
        <section id="tx-origin">
          <h2>tx.origin vs msg.sender</h2>
          <p>
            This is a classic authentication pitfall. <code>tx.origin</code> always refers to the <strong>
            original EOA</strong> that initiated the transaction, while <code>msg.sender</code> is the
            <strong>immediate caller</strong>. Using <code>tx.origin</code> for authorization opens a
            phishing attack vector.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Using tx.origin',
              code: `function withdraw() external {
    // BAD: tx.origin is the EOA, not
    // the direct caller
    require(tx.origin == owner, "Not owner");
    payable(owner).transfer(address(this).balance);
}

// Attack: Malicious contract tricks owner
// into calling it, then calls withdraw().
// tx.origin == owner passes!`
            }}
            secure={{
              title: '✅ Using msg.sender',
              code: `function withdraw() external {
    // GOOD: msg.sender is the direct caller
    require(msg.sender == owner, "Not owner");
    payable(owner).transfer(address(this).balance);
}

// Attack fails: msg.sender would be the
// malicious contract, not the owner.
// Check correctly rejects the call.`
            }}
          />

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 to-transparent rounded-xl border border-red-500/20">
            <h4 className="text-red-400 font-semibold mb-4">🎣 tx.origin Phishing Attack Flow</h4>
            <div className="font-mono text-sm text-gray-300 space-y-2">
              <p>1. Owner receives a tempting transaction (airdrop claim, etc)</p>
              <p>2. Owner calls <span className="text-yellow-400">MaliciousContract.claimAirdrop()</span></p>
              <p>3. MaliciousContract calls <span className="text-yellow-400">VulnerableVault.withdraw()</span></p>
              <p>4. Inside withdraw: <span className="text-red-400">tx.origin == owner</span> → ✓ PASSES</p>
              <p>5. <span className="text-red-400">All funds sent to owner address (controlled by attacker via vault drain)</span></p>
            </div>
          </div>

          <AlertBox type="danger" title="Rule">
            <strong>Never use <code>tx.origin</code> for authorization.</strong> Always use <code>msg.sender</code>.
            The only acceptable use of <code>tx.origin</code> is to check that the caller is an EOA
            (<code>require(tx.origin == msg.sender)</code>), but even that has edge cases with account
            abstraction (ERC-4337).
          </AlertBox>
        </section>

        {/* Upgradeable Access */}
        <section id="upgradeable-access">
          <h2>Access Control in Upgradeable Contracts</h2>
          <p>
            Upgradeable contracts introduce unique access control challenges. The <code>upgradeToAndCall()</code>{' '}
            function is the most powerful operation in your protocol — it can replace the entire contract logic.
            It must be protected accordingly.
          </p>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract SecureUpgradeable is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();  // Prevent initialization of implementation
    }

    function initialize(address admin) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(UPGRADER_ROLE, admin);
    }

    /// @notice Only UPGRADER_ROLE can upgrade the contract
    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyRole(UPGRADER_ROLE)
    {
        // Additional checks can go here:
        // - Verify new implementation is valid
        // - Emit upgrade proposal event
        // - Check timelock has expired
    }

    // Key security measures for upgradeable contracts:
    //
    // 1. _disableInitializers() in constructor
    //    → Prevents anyone from initializing the implementation
    //
    // 2. initializer modifier on initialize()
    //    → Ensures initialize can only be called once
    //
    // 3. Separate UPGRADER_ROLE (not DEFAULT_ADMIN_ROLE)
    //    → Principle of least privilege for upgrades
    //
    // 4. Protected _authorizeUpgrade()
    //    → UUPS pattern requires explicit authorization
}`}
            language="solidity"
            filename="SecureUpgradeable.sol"
          />

          <AlertBox type="warning" title="Implementation Contract Security">
            Always call <code>_disableInitializers()</code> in the constructor of your implementation
            contract. Without this, an attacker can call <code>initialize()</code> directly on the implementation
            contract (not the proxy) and potentially <code>selfdestruct</code> it, bricking all proxies.
          </AlertBox>
        </section>

        {/* Checklist */}
        <section id="checklist">
          <h2>Access Control Checklist</h2>
          <p>
            Use this checklist when auditing access control in your contracts:
          </p>

          <div className="my-8 p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Every <code>public</code>/<code>external</code> function reviewed for access control</p>
                  <p className="text-gray-500 text-sm">Ask: &quot;Should any address be able to call this?&quot;</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium"><code>msg.sender</code> used instead of <code>tx.origin</code></p>
                  <p className="text-gray-500 text-sm">Prevents phishing attacks via malicious contracts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Principle of least privilege applied to all roles</p>
                  <p className="text-gray-500 text-sm">Each address has only the minimum permissions needed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Admin powers are constrained with bounds and limits</p>
                  <p className="text-gray-500 text-sm">Max fee caps, rate limits, timelock delays</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Two-step ownership transfer (<code>Ownable2Step</code>)</p>
                  <p className="text-gray-500 text-sm">Prevents accidental transfer to wrong address</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium"><code>initialize()</code> functions protected with <code>initializer</code> modifier</p>
                  <p className="text-gray-500 text-sm">For upgradeable contracts — prevents re-initialization</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Implementation contracts have initializers disabled</p>
                  <p className="text-gray-500 text-sm"><code>_disableInitializers()</code> in constructor</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Critical operations behind multi-sig or timelock</p>
                  <p className="text-gray-500 text-sm">Treasury withdrawals, upgrades, parameter changes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Role grants and revocations emit events</p>
                  <p className="text-gray-500 text-sm">Enables off-chain monitoring and alerting</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-lime-400 text-sm font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Renounce functionality considered for immutable protocols</p>
                  <p className="text-gray-500 text-sm">Remove admin keys once the protocol is stable</p>
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
              href="https://docs.openzeppelin.com/contracts/5.x/access-control"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                OpenZeppelin Access Control
              </h4>
              <p className="text-sm text-gray-500 mt-1">Official documentation for AccessControl and Ownable</p>
            </a>
            <a
              href="https://docs.openzeppelin.com/contracts/5.x/api/access"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                OpenZeppelin Access API Reference
              </h4>
              <p className="text-sm text-gray-500 mt-1">AccessControl, Ownable, Ownable2Step, AccessManager</p>
            </a>
            <a
              href="https://swcregistry.io/docs/SWC-105/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                SWC-105: Unprotected Ether Withdrawal
              </h4>
              <p className="text-sm text-gray-500 mt-1">Smart Contract Weakness Classification entry</p>
            </a>
            <Link
              href="/learn/vulnerabilities/access-control-vulnerabilities"
              className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group"
            >
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">
                Access Control Vulnerabilities
              </h4>
              <p className="text-sm text-gray-500 mt-1">Our in-depth vulnerability guide on access control flaws</p>
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
              {['Access Control', 'OpenZeppelin', 'RBAC', 'Modifiers', 'Ownable', 'Multi-Sig', 'Security'].map((tag) => (
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
            <Link href="/learn/best-practices/checks-effects-interactions" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Checks-Effects-Interactions Pattern</h4>
              <p className="text-sm text-gray-500 mt-1">The fundamental pattern for secure smart contracts</p>
            </Link>
            <Link href="/learn/best-practices/upgradeable-contracts" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Safe Upgradeable Contract Patterns</h4>
              <p className="text-sm text-gray-500 mt-1">Proxy patterns and storage collision prevention</p>
            </Link>
            <Link href="/learn/vulnerabilities/access-control-vulnerabilities" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Access Control Vulnerabilities</h4>
              <p className="text-sm text-gray-500 mt-1">Common authorization mistakes and exploits</p>
            </Link>
            <Link href="/learn/vulnerabilities/tx-origin-phishing" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">tx.origin Phishing</h4>
              <p className="text-sm text-gray-500 mt-1">How tx.origin enables phishing attacks</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-lime-400/10 flex items-center justify-center text-lime-400 flex-shrink-0">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Verify your access control implementation</h3>
              <p className="text-gray-400">
                Get a free automated audit from Hexific. Our AI scanner checks for missing access control,
                unprotected initializers, tx.origin usage, and 200+ other vulnerability patterns.
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
