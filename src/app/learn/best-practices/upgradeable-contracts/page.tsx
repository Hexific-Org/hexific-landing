'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function UpgradeableContractsPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices', href: '/learn/best-practices' },
        { label: 'Safe Upgradeable Contract Patterns' },
      ]} />

      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
            Best Practices
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-400/10 text-red-400 border border-red-400/20">
            Advanced
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
            EIP-1967
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Safe Upgradeable Contract Patterns
        </h1>

        <p className="text-lg text-gray-400 max-w-3xl mb-6">
          How to implement upgradeable smart contracts safely using proxy patterns, avoiding storage
          collisions, and managing the complex lifecycle of upgradeable protocols. One mistake can
          render your protocol permanently bricked or compromise all user funds.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            12 min read
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Dec 12, 2024
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Proxy, Upgradeable, EIP-1967, Storage
          </span>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <h2 className="text-lg font-semibold text-white mb-4">Table of Contents</h2>
        <ol className="space-y-2 text-sm">
          <li>
            <a href="#overview" className="text-gray-400 hover:text-lime-400 transition-colors">
              1. Why Upgradeable Contracts?
            </a>
          </li>
          <li>
            <a href="#how-proxies-work" className="text-gray-400 hover:text-lime-400 transition-colors">
              2. How Proxy Patterns Work
            </a>
          </li>
          <li>
            <a href="#transparent-proxy" className="text-gray-400 hover:text-lime-400 transition-colors">
              3. Transparent Proxy Pattern
            </a>
          </li>
          <li>
            <a href="#uups" className="text-gray-400 hover:text-lime-400 transition-colors">
              4. UUPS Proxy Pattern
            </a>
          </li>
          <li>
            <a href="#beacon-proxy" className="text-gray-400 hover:text-lime-400 transition-colors">
              5. Beacon Proxy Pattern
            </a>
          </li>
          <li>
            <a href="#diamond-pattern" className="text-gray-400 hover:text-lime-400 transition-colors">
              6. Diamond Pattern (EIP-2535)
            </a>
          </li>
          <li>
            <a href="#storage-collisions" className="text-gray-400 hover:text-lime-400 transition-colors">
              7. Storage Collisions &amp; Layout
            </a>
          </li>
          <li>
            <a href="#initializers" className="text-gray-400 hover:text-lime-400 transition-colors">
              8. Initializers vs Constructors
            </a>
          </li>
          <li>
            <a href="#storage-gaps" className="text-gray-400 hover:text-lime-400 transition-colors">
              9. Storage Gaps &amp; Namespaced Storage
            </a>
          </li>
          <li>
            <a href="#upgrade-safety" className="text-gray-400 hover:text-lime-400 transition-colors">
              10. Upgrade Safety Checks
            </a>
          </li>
          <li>
            <a href="#governance" className="text-gray-400 hover:text-lime-400 transition-colors">
              11. Governance &amp; Timelocks
            </a>
          </li>
          <li>
            <a href="#common-pitfalls" className="text-gray-400 hover:text-lime-400 transition-colors">
              12. Common Pitfalls
            </a>
          </li>
          <li>
            <a href="#pattern-comparison" className="text-gray-400 hover:text-lime-400 transition-colors">
              13. Pattern Comparison Table
            </a>
          </li>
          <li>
            <a href="#checklist" className="text-gray-400 hover:text-lime-400 transition-colors">
              14. Upgrade Safety Checklist
            </a>
          </li>
        </ol>
      </nav>

      {/* Article Content */}
      <article className="space-y-16">

        {/* Section 1 — Why Upgradeable Contracts? */}
        <section id="overview">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">1</span>
            Why Upgradeable Contracts?
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Smart contracts on Ethereum are immutable by default — once deployed, their code cannot change.
            While immutability is a core trust property, real-world protocols need the ability to fix bugs,
            patch vulnerabilities, and add new features. Upgradeable patterns solve this through
            indirection: users interact with a <strong className="text-white">proxy</strong> that delegates
            execution to a replaceable <strong className="text-white">implementation</strong> contract.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">✅ Benefits</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Fix critical vulnerabilities</li>
                <li>• Add new features post-launch</li>
                <li>• Optimize gas over time</li>
                <li>• Maintain a stable address</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">⚠️ Risks</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Storage collision exploits</li>
                <li>• Uninitialized proxy attacks</li>
                <li>• Centralization of upgrade power</li>
                <li>• Complexity adds attack surface</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-blue-400/5 border border-blue-400/20">
              <div className="text-blue-400 font-semibold mb-2">📊 Real Impact</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Wormhole: $326M (uninit proxy)</li>
                <li>• Audius: $6M (storage collision)</li>
                <li>• Compound: $80M (bad upgrade)</li>
                <li>• Many protocols bricked forever</li>
              </ul>
            </div>
          </div>

          <AlertBox type="warning" title="Not Always Needed">
            Not every contract needs to be upgradeable. Simpler contracts (e.g., single-purpose vaults,
            tokens with no governance) are often safer as immutable deployments. Adding upgradeability
            means adding trust assumptions — users must trust the upgrade authority.
          </AlertBox>
        </section>

        {/* Section 2 — How Proxies Work */}
        <section id="how-proxies-work">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">2</span>
            How Proxy Patterns Work
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Every proxy pattern relies on the EVM&apos;s <code className="text-lime-400">delegatecall</code> opcode.
            When a proxy receives a call, it <code className="text-lime-400">delegatecall</code>s to the implementation
            contract. The implementation&apos;s code executes, but it reads and writes to the <strong className="text-white">proxy&apos;s storage</strong>,
            not its own. This is what allows the proxy to maintain state while swapping out logic.
          </p>

          {/* Visual Diagram */}
          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-4 text-center">Delegatecall Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
              <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/30 text-center min-w-[140px]">
                <div className="text-blue-400 font-semibold mb-1">User</div>
                <div className="text-gray-500 text-xs">Sends tx</div>
              </div>
              <div className="text-gray-600 text-lg">→</div>
              <div className="p-4 rounded-xl bg-purple-400/10 border border-purple-400/30 text-center min-w-[180px]">
                <div className="text-purple-400 font-semibold mb-1">Proxy Contract</div>
                <div className="text-gray-500 text-xs">Holds storage + admin</div>
                <div className="text-gray-500 text-xs">Stable address</div>
              </div>
              <div className="text-gray-600 text-lg">→ delegatecall</div>
              <div className="p-4 rounded-xl bg-lime-400/10 border border-lime-400/30 text-center min-w-[180px]">
                <div className="text-lime-400 font-semibold mb-1">Implementation V1</div>
                <div className="text-gray-500 text-xs">Logic / code only</div>
                <div className="text-gray-500 text-xs">Replaceable</div>
              </div>
            </div>
            <div className="flex justify-center mt-3">
              <div className="text-xs text-gray-600 italic">
                After upgrade: proxy points to Implementation V2 instead
              </div>
            </div>
          </div>

          <CodeBlock
            language="solidity"
            filename="MinimalProxy.sol"
            code={`// Simplified proxy concept (DO NOT use in production)
contract MinimalProxy {
    // EIP-1967 implementation slot
    bytes32 private constant IMPL_SLOT =
        0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

    fallback() external payable {
        address impl;
        assembly {
            impl := sload(IMPL_SLOT)
        }

        assembly {
            // Copy calldata to memory
            calldatacopy(0, 0, calldatasize())

            // Delegatecall to implementation
            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)

            // Copy return data
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`}
          />

          <AlertBox type="info" title="EIP-1967 Storage Slots">
            EIP-1967 defines standardized storage slots for proxy metadata (implementation address,
            admin address, beacon address). These slots are computed as <code className="text-lime-400">
            keccak256(&quot;eip1967.proxy.implementation&quot;) - 1</code> to ensure they never collide
            with normal Solidity storage layout.
          </AlertBox>
        </section>

        {/* Section 3 — Transparent Proxy */}
        <section id="transparent-proxy">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">3</span>
            Transparent Proxy Pattern
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The <strong className="text-white">Transparent Proxy</strong> pattern (used by OpenZeppelin&apos;s
            <code className="text-lime-400"> TransparentUpgradeableProxy</code>) solves the &quot;function selector
            clash&quot; problem. Since both the proxy and the implementation can have functions with the same
            selector, the proxy routes calls based on <strong className="text-white">who the caller is</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-purple-400 font-semibold mb-3">Admin Calls</div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">→</span>
                  <span>Routed to <strong className="text-white">proxy</strong> admin functions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">→</span>
                  <span><code className="text-lime-400">upgradeTo()</code>, <code className="text-lime-400">changeAdmin()</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-0.5">→</span>
                  <span>Admin <strong className="text-white">cannot</strong> call implementation</span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-lime-400 font-semibold mb-3">Non-Admin Calls</div>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-lime-400 mt-0.5">→</span>
                  <span>Delegated to <strong className="text-white">implementation</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400 mt-0.5">→</span>
                  <span>All business logic runs here</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-lime-400 mt-0.5">→</span>
                  <span>Users <strong className="text-white">cannot</strong> call admin functions</span>
                </li>
              </ul>
            </div>
          </div>

          <CodeBlock
            language="solidity"
            filename="TransparentProxyExample.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

// Deploy flow:
// 1. Deploy implementation (MyTokenV1)
// 2. Deploy ProxyAdmin
// 3. Deploy TransparentUpgradeableProxy(impl, admin, initData)

contract MyTokenV1 {
    // Implementation must NOT have a constructor
    // Use initialize() instead
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    bool private _initialized;

    function initialize(uint256 _initialSupply) external {
        require(!_initialized, "Already initialized");
        _initialized = true;
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}

contract MyTokenV2 is MyTokenV1 {
    // V2 adds a new feature — MUST preserve V1 storage layout
    mapping(address => bool) public frozen;

    function freezeAccount(address account) external {
        frozen[account] = true;
    }

    function transfer(address to, uint256 amount) external override {
        require(!frozen[msg.sender], "Account frozen");
        require(balances[msg.sender] >= amount, "Insufficient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}`}
          />

          <div className="mt-4 p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/20">
            <p className="text-sm text-gray-400">
              <strong className="text-yellow-400">Note:</strong> In OpenZeppelin v5, the Transparent Proxy
              pattern now deploys a separate <code className="text-lime-400">ProxyAdmin</code> contract automatically.
              The admin is no longer an EOA — it&apos;s always a contract, improving security and reducing gas
              for non-admin calls (no <code className="text-lime-400">msg.sender == admin</code> check needed).
            </p>
          </div>
        </section>

        {/* Section 4 — UUPS */}
        <section id="uups">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">4</span>
            UUPS Proxy Pattern
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The <strong className="text-white">Universal Upgradeable Proxy Standard</strong> (UUPS, EIP-1822)
            moves the upgrade logic into the <strong className="text-white">implementation</strong> contract
            rather than the proxy. This makes the proxy simpler and cheaper to deploy, but introduces a
            critical risk: if the implementation forgets to include upgrade logic, the contract becomes
            permanently non-upgradeable.
          </p>

          <CodeBlock
            language="solidity"
            filename="UUPSExample.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyVaultV1 is
    Initializable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    mapping(address => uint256) public deposits;
    uint256 public totalDeposits;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address owner_) public initializer {
        __Ownable_init(owner_);
        __UUPSUpgradeable_init();
    }

    function deposit() external payable {
        deposits[msg.sender] += msg.value;
        totalDeposits += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(deposits[msg.sender] >= amount, "Insufficient");
        deposits[msg.sender] -= amount;
        totalDeposits -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Transfer failed");
    }

    // CRITICAL: Must override this or contract becomes non-upgradeable
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}`}
          />

          <div className="grid md:grid-cols-2 gap-4 mt-6 mb-6">
            <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
              <div className="text-green-400 font-semibold mb-2">UUPS Advantages</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Cheaper proxy deployment (~50% less gas)</li>
                <li>• No function selector clashes</li>
                <li>• Ability to remove upgradeability</li>
                <li>• More flexible upgrade authorization</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl bg-red-400/5 border border-red-400/20">
              <div className="text-red-400 font-semibold mb-2">UUPS Risks</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Forgetting <code className="text-lime-400">_authorizeUpgrade</code> = bricked</li>
                <li>• Upgrade logic bug = permanently stuck</li>
                <li>• Must include upgrade logic in every version</li>
                <li>• Implementation can be self-destructed</li>
              </ul>
            </div>
          </div>

          <AlertBox type="danger" title="Critical: _disableInitializers()">
            Always call <code className="text-lime-400">_disableInitializers()</code> in the constructor of
            UUPS implementations. Without this, an attacker can call <code className="text-lime-400">initialize()</code> on
            the implementation contract directly, potentially taking ownership and self-destructing it — which
            bricks all proxies pointing to it.
          </AlertBox>
        </section>

        {/* Section 5 — Beacon Proxy */}
        <section id="beacon-proxy">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">5</span>
            Beacon Proxy Pattern
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The <strong className="text-white">Beacon Proxy</strong> pattern is ideal when you have
            <strong className="text-white"> many proxy instances</strong> that should all share the same
            implementation. Instead of each proxy storing its own implementation address, they all point
            to a <strong className="text-white">Beacon</strong> contract. Upgrading the beacon upgrades
            all proxies at once.
          </p>

          {/* Visual */}
          <div className="mb-6 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-4 text-center">Beacon Proxy Architecture</h3>
            <div className="flex flex-col items-center gap-3 text-sm">
              <div className="p-3 rounded-xl bg-orange-400/10 border border-orange-400/30 text-center min-w-[200px]">
                <div className="text-orange-400 font-semibold">Beacon Contract</div>
                <div className="text-gray-500 text-xs">Stores implementation address</div>
              </div>
              <div className="text-gray-600">↑ reads impl from beacon</div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Proxy A', 'Proxy B', 'Proxy C', '...Proxy N'].map((label, i) => (
                  <div key={i} className="p-3 rounded-xl bg-purple-400/10 border border-purple-400/30 text-center min-w-[100px]">
                    <div className="text-purple-400 font-semibold text-xs">{label}</div>
                    <div className="text-gray-500 text-xs">Own storage</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <CodeBlock
            language="solidity"
            filename="BeaconProxyExample.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";

// Implementation — shared by all beacon proxies
contract UserWallet {
    address public owner;
    bool private _initialized;

    function initialize(address _owner) external {
        require(!_initialized, "Already initialized");
        _initialized = true;
        owner = _owner;
    }

    function execute(
        address target,
        bytes calldata data
    ) external returns (bytes memory) {
        require(msg.sender == owner, "Not owner");
        (bool ok, bytes memory result) = target.call(data);
        require(ok, "Execution failed");
        return result;
    }
}

// Factory — creates cloned wallets via beacon
contract WalletFactory {
    UpgradeableBeacon public immutable beacon;

    constructor(address implementation) {
        beacon = new UpgradeableBeacon(implementation, msg.sender);
    }

    function createWallet(address owner) external returns (address) {
        BeaconProxy proxy = new BeaconProxy(
            address(beacon),
            abi.encodeCall(UserWallet.initialize, (owner))
        );
        return address(proxy);
    }

    // Upgrade ALL wallets at once
    function upgradeImplementation(address newImpl) external {
        beacon.upgradeTo(newImpl);
    }
}`}
          />

          <p className="text-gray-400 text-sm mt-4">
            <strong className="text-white">Use case:</strong> Factory patterns where many identical
            contracts are deployed — wallet factories, pool factories, NFT collections. Upgrading
            the beacon upgrades hundreds or thousands of proxies in a single transaction.
          </p>
        </section>

        {/* Section 6 — Diamond Pattern */}
        <section id="diamond-pattern">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">6</span>
            Diamond Pattern (EIP-2535)
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The <strong className="text-white">Diamond</strong> pattern allows a single proxy to delegate
            to <strong className="text-white">multiple implementation contracts</strong> (called &quot;facets&quot;).
            Each function selector maps to a specific facet. This overcomes the 24KB contract size limit
            and allows granular upgrades — you can upgrade individual facets without touching others.
          </p>

          <CodeBlock
            language="solidity"
            filename="Diamond.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Simplified Diamond — maps each function selector to a facet address
struct FacetAddressAndSelectorPosition {
    address facetAddress;
    uint16 selectorPosition;
}

struct DiamondStorage {
    // selector => facet address + position
    mapping(bytes4 => FacetAddressAndSelectorPosition) facetAddressAndSelectorPosition;
    bytes4[] selectors;
    mapping(bytes4 => bool) supportedInterfaces;
    address contractOwner;
}

// Each "facet" handles a subset of functionality
contract VaultFacet {
    // Storage is shared via diamond storage pattern
    function deposit() external payable { /* ... */ }
    function withdraw(uint256 amount) external { /* ... */ }
}

contract GovernanceFacet {
    function propose(bytes calldata data) external { /* ... */ }
    function vote(uint256 proposalId, bool support) external { /* ... */ }
}

contract RewardsFacet {
    function claimRewards() external { /* ... */ }
    function stake(uint256 amount) external { /* ... */ }
}

// Diamond routes calls to the appropriate facet
// based on msg.sig (function selector)
contract Diamond {
    fallback() external payable {
        DiamondStorage storage ds;
        bytes32 position = keccak256("diamond.standard.diamond.storage");
        assembly {
            ds.slot := position
        }

        address facet = ds.facetAddressAndSelectorPosition[msg.sig].facetAddress;
        require(facet != address(0), "Diamond: Function does not exist");

        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`}
          />

          <AlertBox type="info" title="When to Use Diamonds">
            Diamonds are powerful but complex. Use them when you genuinely need multi-facet upgradability or
            are hitting the 24KB size limit. For most protocols, UUPS or Transparent Proxy is simpler and
            sufficient. Notable diamond users include Aavegotchi and Louper.
          </AlertBox>
        </section>

        {/* Section 7 — Storage Collisions */}
        <section id="storage-collisions">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">7</span>
            Storage Collisions &amp; Layout
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            The most dangerous pitfall in upgradeable contracts is <strong className="text-white">storage
            collision</strong>. Because the proxy&apos;s storage is shared with the implementation, the
            variable layout in V2 must be <strong className="text-white">strictly compatible</strong> with
            V1. Reordering, removing, or changing the type of existing variables will corrupt stored data.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Storage Collision — V2 Breaks V1 Data',
              code: `// V1 storage layout:
// slot 0: address owner
// slot 1: uint256 totalSupply
// slot 2: mapping balances

contract TokenV1 {
    address public owner;       // slot 0
    uint256 public totalSupply; // slot 1
    mapping(address => uint256) public balances; // slot 2
}

// V2: WRONG — inserted variable shifts everything
contract TokenV2 {
    address public owner;       // slot 0
    bool public paused;         // ← NEW! slot 1
    uint256 public totalSupply; // slot 2 (was slot 1!)
    mapping(address => uint256) public balances; // slot 3
    // totalSupply now reads the old 'balances' slot!
    // Completely corrupted state!
}`
            }}
            secure={{
              title: '✅ Correct V2 — Append Only',
              code: `// V1 storage layout:
// slot 0: address owner
// slot 1: uint256 totalSupply
// slot 2: mapping balances

contract TokenV1 {
    address public owner;       // slot 0
    uint256 public totalSupply; // slot 1
    mapping(address => uint256) public balances; // slot 2
}

// V2: CORRECT — only append new variables at the end
contract TokenV2 is TokenV1 {
    // Inherits all V1 storage in the same order
    // slot 0: address owner       (from V1)
    // slot 1: uint256 totalSupply (from V1)
    // slot 2: mapping balances    (from V1)

    bool public paused;         // slot 3 — NEW, appended
    mapping(address => bool) public frozen; // slot 4 — NEW
    // All V1 data remains intact
}`
            }}
          />

          <div className="mt-6 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h3 className="text-white font-semibold mb-3">Storage Layout Rules</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-red-400 font-medium mb-2">Never Do:</div>
                <ul className="text-gray-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Reorder existing variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Remove or rename variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Change variable types (e.g., uint256 → uint128)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Insert variables before existing ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Change inheritance order</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-green-400 font-medium mb-2">Always Do:</div>
                <ul className="text-gray-400 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Inherit from V1 (or keep identical layout)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Append new variables at the end only</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Use storage gaps for future flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Run <code className="text-lime-400">oz upgrades</code> validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Document slot assignments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8 — Initializers */}
        <section id="initializers">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">8</span>
            Initializers vs Constructors
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            Constructors run only during deployment and modify the <strong className="text-white">implementation&apos;s</strong> storage,
            not the proxy&apos;s. Since the proxy is deploying its own state via <code className="text-lime-400">delegatecall</code>,
            constructor logic is invisible to it. Upgradeable contracts use <strong className="text-white">initializer
            functions</strong> instead — regular functions that can only be called once.
          </p>

          <CodeComparison
            vulnerable={{
              title: '❌ Constructor — Does Not Work with Proxy',
              code: `contract VaultV1 {
    address public owner;
    uint256 public fee;

    // This runs on the IMPLEMENTATION, not the proxy!
    // The proxy's storage will have owner = address(0)
    constructor(address _owner, uint256 _fee) {
        owner = _owner;
        fee = _fee;
    }
}

// When users interact via proxy:
// vault.owner() => address(0)  ← NOT what we wanted
// vault.fee()   => 0           ← NOT what we wanted`
            }}
            secure={{
              title: '✅ Initializer — Works with Proxy',
              code: `import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract VaultV1 is Initializable {
    address public owner;
    uint256 public fee;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address _owner,
        uint256 _fee
    ) external initializer {
        owner = _owner;
        fee = _fee;
    }
}

// Proxy calls initialize() during deployment:
// vault.owner() => deployer ✓
// vault.fee()   => 100      ✓`
            }}
          />

          <div className="mt-6 space-y-3">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h4 className="text-white font-medium mb-2">Reinitializer Pattern (Multi-Version)</h4>
              <p className="text-gray-400 text-sm mb-3">
                When upgrading from V1 to V2, you often need to initialize new state. Use
                <code className="text-lime-400"> reinitializer(n)</code> to allow a one-time
                initialization per version:
              </p>
              <CodeBlock
                language="solidity"
                filename="VaultV2.sol"
                code={`contract VaultV2 is VaultV1 {
    uint256 public maxDeposit;
    bool public paused;

    /// New variables need initialization
    function initializeV2(
        uint256 _maxDeposit
    ) external reinitializer(2) {
        maxDeposit = _maxDeposit;
        paused = false;
    }
}`}
              />
            </div>
          </div>

          <AlertBox type="danger" title="Wormhole Hack ($326M)">
            In February 2022, the Wormhole bridge was exploited because an attacker called
            <code className="text-lime-400"> initialize()</code> on an uninitialized implementation
            contract. The attacker gained ownership, then used it to mint 120,000 wETH. Always call
            <code className="text-lime-400"> _disableInitializers()</code> in implementation constructors.
          </AlertBox>
        </section>

        {/* Section 9 — Storage Gaps & Namespaced Storage */}
        <section id="storage-gaps">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">9</span>
            Storage Gaps &amp; Namespaced Storage
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            When using inheritance in upgradeable contracts, parent contracts must reserve storage slots
            for future variables. Without this, adding a variable to a parent in V2 would shift all child
            storage. Two approaches exist: the traditional <strong className="text-white">storage gap</strong> pattern
            and the newer <strong className="text-white">ERC-7201 namespaced storage</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Traditional: Storage Gaps</h3>
              <CodeBlock
                language="solidity"
                filename="StorageGap.sol"
                code={`// Base contract reserves slots for future use
contract BaseV1 {
    address public owner;
    uint256 public value;

    // Reserve 48 slots for future variables
    // (50 total slots - 2 used = 48 gap)
    uint256[48] private __gap;
}

// In V2, consume gap slots for new vars
contract BaseV2 {
    address public owner;
    uint256 public value;
    bool public paused;     // uses 1 gap slot
    uint256 public fee;     // uses 1 gap slot

    // 48 - 2 new vars = 46 remaining
    uint256[46] private __gap;
}

// Child contract's storage starts at
// the same slot regardless of base changes
contract ChildV1 is BaseV1 {
    uint256 public childValue; // slot 50 always
}`}
              />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Modern: ERC-7201 Namespaced</h3>
              <CodeBlock
                language="solidity"
                filename="NamespacedStorage.sol"
                code={`// ERC-7201: Storage at deterministic slots
// No gaps needed — each namespace is isolated

contract VaultStorage {
    /// @custom:storage-location
    ///   erc7201:vault.main
    struct MainStorage {
        address owner;
        uint256 totalDeposits;
        mapping(address => uint256) balances;
    }

    // Deterministic slot from namespace
    bytes32 private constant MAIN_SLOT =
        keccak256(
            abi.encode(
                uint256(keccak256("vault.main")) - 1
            )
        ) & ~bytes32(uint256(0xff));

    function _getMainStorage()
        internal pure
        returns (MainStorage storage $)
    {
        assembly {
            $.slot := MAIN_SLOT
        }
    }
}

// Usage in implementation:
contract VaultV1 is VaultStorage {
    function deposit() external payable {
        MainStorage storage $ = _getMainStorage();
        $.balances[msg.sender] += msg.value;
        $.totalDeposits += msg.value;
    }
}`}
              />
            </div>
          </div>

          <AlertBox type="info" title="Recommendation">
            For new projects, prefer ERC-7201 namespaced storage (supported by OpenZeppelin v5+). It
            eliminates gap management entirely and makes storage layout conflicts between inherited
            contracts impossible. For existing projects using gaps, continue the gap pattern consistently.
          </AlertBox>
        </section>

        {/* Section 10 — Upgrade Safety Checks */}
        <section id="upgrade-safety">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">10</span>
            Upgrade Safety Checks
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            OpenZeppelin provides automated upgrade safety validation tools that catch storage layout
            incompatibilities <strong className="text-white">before</strong> you deploy. Always run
            these checks in your CI pipeline and before any mainnet upgrade.
          </p>

          <CodeBlock
            language="typescript"
            filename="deploy/upgrade.ts"
            code={`// Hardhat: OpenZeppelin Upgrades Plugin
import { ethers, upgrades } from "hardhat";

async function main() {
  // Deploy V1
  const V1 = await ethers.getContractFactory("VaultV1");
  const proxy = await upgrades.deployProxy(V1, [owner.address], {
    initializer: "initialize",
    kind: "uups", // or "transparent"
  });
  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", await proxy.getAddress());

  // Later — Upgrade to V2
  const V2 = await ethers.getContractFactory("VaultV2");

  // This automatically validates:
  // ✓ Storage layout compatibility
  // ✓ No missing _authorizeUpgrade (UUPS)
  // ✓ No constructor with state changes
  // ✓ No selfdestruct / delegatecall in impl
  const upgraded = await upgrades.upgradeProxy(
    await proxy.getAddress(),
    V2,
    {
      call: {
        fn: "initializeV2",
        args: [maxDeposit],
      },
    }
  );

  console.log("Upgraded to V2!");
}`}
          />

          <CodeBlock
            language="bash"
            filename="Terminal"
            code={`# Foundry: OpenZeppelin Upgrades for Foundry
# Validate upgrade safety
forge clean
forge build

# Check if V2 is compatible with V1
npx @openzeppelin/upgrades-core validate \\
  --contract VaultV2 \\
  --reference VaultV1

# Output:
# ✔ VaultV2 is upgrade-safe from VaultV1
# Storage layout: compatible
# No unsafe operations detected`}
          />

          <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="text-white font-medium mb-2">What the Validator Catches</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>Storage variable type changes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>Storage variable reordering</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>Removed storage variables</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>Inserted storage variables</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span><code className="text-lime-400">selfdestruct</code> in implementation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span><code className="text-lime-400">delegatecall</code> in implementation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>Missing <code className="text-lime-400">_authorizeUpgrade</code> (UUPS)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">✗</span>
                <span>State-modifying constructors</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11 — Governance & Timelocks */}
        <section id="governance">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">11</span>
            Governance &amp; Timelocks for Upgrades
          </h2>

          <p className="text-gray-300 mb-6 leading-relaxed">
            An upgradeable contract where a single EOA can push arbitrary code changes is a massive
            centralization risk. Production protocols should gate upgrades behind
            <strong className="text-white"> multi-sig wallets</strong>, <strong className="text-white">timelocks</strong>, or
            <strong className="text-white"> on-chain governance</strong> to give users time to react and exit
            before changes take effect.
          </p>

          <CodeBlock
            language="solidity"
            filename="TimelockUpgrade.sol"
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract GovernedVault is UUPSUpgradeable, OwnableUpgradeable {
    // Timelock for upgrades
    uint256 public constant UPGRADE_DELAY = 2 days;

    struct PendingUpgrade {
        address newImplementation;
        uint256 scheduledAt;
        bool executed;
    }

    PendingUpgrade public pendingUpgrade;

    event UpgradeScheduled(address indexed newImpl, uint256 executeAfter);
    event UpgradeExecuted(address indexed newImpl);
    event UpgradeCancelled(address indexed newImpl);

    /// @notice Schedule an upgrade (owner = multisig)
    function scheduleUpgrade(address newImpl) external onlyOwner {
        require(newImpl != address(0), "Invalid impl");
        require(newImpl.code.length > 0, "Not a contract");
        pendingUpgrade = PendingUpgrade({
            newImplementation: newImpl,
            scheduledAt: block.timestamp,
            executed: false
        });
        emit UpgradeScheduled(newImpl, block.timestamp + UPGRADE_DELAY);
    }

    /// @notice Execute a scheduled upgrade after timelock
    function executeUpgrade() external onlyOwner {
        PendingUpgrade memory up = pendingUpgrade;
        require(up.newImplementation != address(0), "No pending");
        require(!up.executed, "Already executed");
        require(
            block.timestamp >= up.scheduledAt + UPGRADE_DELAY,
            "Timelock not expired"
        );
        pendingUpgrade.executed = true;
        upgradeToAndCall(up.newImplementation, "");
        emit UpgradeExecuted(up.newImplementation);
    }

    /// @notice Cancel a pending upgrade
    function cancelUpgrade() external onlyOwner {
        address impl = pendingUpgrade.newImplementation;
        delete pendingUpgrade;
        emit UpgradeCancelled(impl);
    }

    function _authorizeUpgrade(address) internal override {
        // Authorization handled by scheduleUpgrade/executeUpgrade
        // This is called internally by upgradeToAndCall
    }
}`}
          />

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-yellow-400 font-semibold mb-2 text-sm">🔑 Multi-sig</div>
              <p className="text-gray-400 text-xs">
                Require N-of-M signers (e.g., 3/5 Safe) to propose upgrades. Prevents single-key compromise.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-blue-400 font-semibold mb-2 text-sm">⏳ Timelock</div>
              <p className="text-gray-400 text-xs">
                Enforce 24-72h delay between proposal and execution. Gives users time to review changes and exit.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-purple-400 font-semibold mb-2 text-sm">🗳️ Governance</div>
              <p className="text-gray-400 text-xs">
                Token-weighted voting via Governor. Most decentralized but slowest. Best for mature protocols.
              </p>
            </div>
          </div>
        </section>

        {/* Section 12 — Common Pitfalls */}
        <section id="common-pitfalls">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">12</span>
            Common Pitfalls
          </h2>

          <div className="space-y-6">
            {/* Pitfall 1 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3">1. Uninitialized Implementation</h3>
              <p className="text-gray-400 text-sm mb-3">
                Deploying an implementation without calling <code className="text-lime-400">_disableInitializers()</code> allows
                anyone to call <code className="text-lime-400">initialize()</code> on it, take ownership,
                and potentially <code className="text-lime-400">selfdestruct</code> it.
              </p>
              <CodeBlock
                language="solidity"
                filename="Fix.sol"
                code={`/// @custom:oz-upgrades-unsafe-allow constructor
constructor() {
    _disableInitializers();
}`}
              />
            </div>

            {/* Pitfall 2 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3">2. Using immutable / constant Incorrectly</h3>
              <p className="text-gray-400 text-sm mb-3">
                <code className="text-lime-400">immutable</code> variables are set in the constructor and
                embedded in bytecode. Since the proxy executes the implementation&apos;s bytecode via
                <code className="text-lime-400"> delegatecall</code>, they actually <strong className="text-white">do work</strong>
                — but they&apos;re set in the implementation&apos;s constructor, not the initializer. Use
                them intentionally for values that should be identical across all proxies.
              </p>
              <CodeBlock
                language="solidity"
                filename="ImmutableInProxy.sol"
                code={`contract VaultV1 is UUPSUpgradeable {
    // OK: Same value for all proxies using this impl
    // Stored in bytecode, not proxy storage
    uint256 public immutable MAX_FEE = 1000;

    // NOT OK: This is per-proxy state — use storage
    // address public immutable owner; // ← WRONG

    address public owner; // ← Correct: use storage
}`}
              />
            </div>

            {/* Pitfall 3 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3">3. Forgetting _authorizeUpgrade (UUPS)</h3>
              <p className="text-gray-400 text-sm mb-3">
                If a UUPS implementation doesn&apos;t include upgrade logic, the contract becomes
                permanently non-upgradeable. There&apos;s no recovery.
              </p>
              <CodeBlock
                language="solidity"
                filename="MissingAuthorize.sol"
                code={`// V1 — has upgrade logic ✓
contract VaultV1 is UUPSUpgradeable, OwnableUpgradeable {
    function _authorizeUpgrade(address) internal override onlyOwner {}
}

// V2 — FORGOT to inherit UUPSUpgradeable!
// Contract is now permanently stuck at V2.
contract VaultV2 is OwnableUpgradeable {
    // No _authorizeUpgrade, no upgradeToAndCall
    // BRICKED FOREVER
}`}
              />
            </div>

            {/* Pitfall 4 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3">4. selfdestruct in Implementation</h3>
              <p className="text-gray-400 text-sm mb-3">
                If the implementation contract contains <code className="text-lime-400">selfdestruct</code>,
                an attacker who initializes the implementation can destroy it, bricking all proxies. While
                <code className="text-lime-400"> selfdestruct</code> is deprecated post-Dencun, older
                contracts may still contain it.
              </p>
              <AlertBox type="danger" title="Never Include selfdestruct">
                Never include <code className="text-lime-400">selfdestruct</code> or
                <code className="text-lime-400"> delegatecall</code> in an upgradeable implementation
                contract. OpenZeppelin&apos;s upgrade validator flags both as unsafe.
              </AlertBox>
            </div>

            {/* Pitfall 5 */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-red-400/20">
              <h3 className="text-white font-semibold mb-3">5. Function Selector Clashes</h3>
              <p className="text-gray-400 text-sm mb-3">
                With transparent proxies, if the implementation has a function whose 4-byte selector matches
                a proxy admin function, it becomes uncallable for the admin. The transparent proxy pattern
                handles this by enforcing caller-based routing, but custom proxies might not.
              </p>
              <CodeBlock
                language="solidity"
                filename="SelectorClash.sol"
                code={`// These have the same 4-byte selector!
// clash_550254402() and proxyAdmin()
// Both produce selector: 0x3659cfe6

// Transparent proxy handles this:
// - Admin calls → proxy functions
// - Everyone else → implementation
// Custom proxies: check for clashes manually`}
              />
            </div>
          </div>
        </section>

        {/* Section 13 — Pattern Comparison */}
        <section id="pattern-comparison">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">13</span>
            Pattern Comparison Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/[0.06] rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-white/[0.04]">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-left p-4 text-white font-semibold">Transparent</th>
                  <th className="text-left p-4 text-white font-semibold">UUPS</th>
                  <th className="text-left p-4 text-white font-semibold">Beacon</th>
                  <th className="text-left p-4 text-white font-semibold">Diamond</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">Upgrade Logic</td>
                  <td className="p-4">Proxy (ProxyAdmin)</td>
                  <td className="p-4">Implementation</td>
                  <td className="p-4">Beacon contract</td>
                  <td className="p-4">Diamond cut</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">Deploy Cost</td>
                  <td className="p-4 text-yellow-400">Higher</td>
                  <td className="p-4 text-green-400">Lower</td>
                  <td className="p-4 text-green-400">Per-proxy: lowest</td>
                  <td className="p-4 text-yellow-400">Higher initially</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">Runtime Cost</td>
                  <td className="p-4 text-yellow-400">Higher (admin check)</td>
                  <td className="p-4 text-green-400">Lower</td>
                  <td className="p-4 text-yellow-400">Extra SLOAD</td>
                  <td className="p-4 text-yellow-400">Selector lookup</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">Multiple Impls</td>
                  <td className="p-4 text-red-400">No</td>
                  <td className="p-4 text-red-400">No</td>
                  <td className="p-4 text-red-400">No</td>
                  <td className="p-4 text-green-400">Yes (facets)</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">Batch Upgrade</td>
                  <td className="p-4 text-red-400">No</td>
                  <td className="p-4 text-red-400">No</td>
                  <td className="p-4 text-green-400">Yes (all at once)</td>
                  <td className="p-4 text-green-400">Per-facet</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">Brick Risk</td>
                  <td className="p-4 text-green-400">Low</td>
                  <td className="p-4 text-red-400">High (missing fn)</td>
                  <td className="p-4 text-green-400">Low</td>
                  <td className="p-4 text-yellow-400">Medium</td>
                </tr>
                <tr className="border-t border-white/[0.06]">
                  <td className="p-4 text-white">Complexity</td>
                  <td className="p-4 text-green-400">Low</td>
                  <td className="p-4 text-green-400">Low</td>
                  <td className="p-4 text-yellow-400">Medium</td>
                  <td className="p-4 text-red-400">High</td>
                </tr>
                <tr className="border-t border-white/[0.06] bg-white/[0.01]">
                  <td className="p-4 text-white">Best For</td>
                  <td className="p-4">Single contract, simple</td>
                  <td className="p-4">Gas-optimized, trusted team</td>
                  <td className="p-4">Factory / many clones</td>
                  <td className="p-4">Complex, large codebases</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 14 — Checklist */}
        <section id="checklist">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-lime-400/10 text-lime-400 text-sm font-bold">14</span>
            Upgrade Safety Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Implementation */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">📝</span> Implementation Contract
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  '_disableInitializers() in constructor',
                  'No selfdestruct or delegatecall',
                  'Uses initializer / reinitializer',
                  'Inherits from upgradeable variants',
                  'Storage layout is append-only',
                  'Storage gaps or ERC-7201 storage',
                  'UUPS: _authorizeUpgrade exists with access control',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deployment */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">🚀</span> Deployment &amp; Upgrade
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Proxy initialized immediately on deploy',
                  'Implementation initialized / disabled',
                  'OZ upgrade safety validator passes',
                  'Upgrade tested on fork before mainnet',
                  'Storage layout diff reviewed manually',
                  'Timelock / multisig guards upgrade path',
                  'Upgrade event emitted for monitoring',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">🔒</span> Security
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Upgrade authority is multi-sig, not EOA',
                  'Timelock delay ≥ 24 hours for mainnet',
                  'Users can exit before upgrade executes',
                  'Emergency pause mechanism exists',
                  'No function selector clashes verified',
                  'Implementation cannot be taken over',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testing */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span className="text-lime-400">🧪</span> Testing
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  'Unit tests cover V1 → V2 upgrade',
                  'Storage values preserved after upgrade',
                  'New V2 functions work correctly',
                  'Old V1 functions still behave correctly',
                  'Edge cases: mid-upgrade state transitions',
                  'Fork tests against live mainnet data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-lime-400 mt-0.5">☐</span>
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
          {['Proxy', 'Upgradeable', 'EIP-1967', 'Storage', 'UUPS', 'Transparent Proxy', 'Beacon', 'Diamond', 'ERC-7201'].map((tag) => (
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
            <Link href="/learn/vulnerabilities/storage-collision" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-red-400 mb-2">Vulnerability</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Storage Collision</h4>
              <p className="text-gray-500 text-sm">How misaligned storage in proxy contracts leads to catastrophic data corruption.</p>
            </Link>
            <Link href="/learn/best-practices/checks-effects-interactions" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">CEI Pattern</h4>
              <p className="text-gray-500 text-sm">The fundamental pattern for preventing reentrancy in all smart contracts.</p>
            </Link>
            <Link href="/learn/best-practices/secure-access-control" className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-lime-400/30 transition-all">
              <div className="text-xs text-lime-400 mb-2">Best Practice</div>
              <h4 className="text-white font-semibold group-hover:text-lime-400 transition-colors mb-2">Secure Access Control</h4>
              <p className="text-gray-500 text-sm">Essential for protecting upgrade functions with proper authorization.</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-3">Ready to audit your upgradeable contracts?</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Upgradeable contracts are among the most frequently exploited. Get a professional audit
            to verify your proxy pattern, storage layout, and upgrade governance before deploying.
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
