'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function AccessControlVulnerabilitiesPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Access Control Vulnerabilities' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            Beginner
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            High Severity
          </span>
        </div>
        
        <h1>Access Control Vulnerabilities</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            7 min read
          </span>
          <span>•</span>
          <span>Updated Dec 10, 2024</span>
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
          <li><a href="#what-is-access-control" className="toc-link hover:text-lime-400">What is Access Control?</a></li>
          <li><a href="#common-vulnerabilities" className="toc-link hover:text-lime-400">Common Vulnerabilities</a></li>
          <li><a href="#missing-modifiers" className="toc-link hover:text-lime-400">Missing Access Modifiers</a></li>
          <li><a href="#improper-validation" className="toc-link hover:text-lime-400">Improper Role Validation</a></li>
          <li><a href="#best-practices" className="toc-link hover:text-lime-400">Best Practices</a></li>
          <li><a href="#openzeppelin" className="toc-link hover:text-lime-400">Using OpenZeppelin</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-is-access-control">
          <h2>What is Access Control?</h2>
          <p>
            Access control determines who can call specific functions in your smart contract. 
            Without proper access control, anyone can execute sensitive operations like 
            withdrawing funds, minting tokens, or changing critical parameters.
          </p>
          
          <AlertBox type="danger" title="Impact">
            Access control vulnerabilities are among the most exploited bugs in smart contracts.
            They often lead to complete loss of funds or total protocol takeover.
          </AlertBox>
        </section>

        <section id="common-vulnerabilities">
          <h2>Common Vulnerabilities</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">🔓 Missing Access Modifiers</h4>
              <p className="text-sm text-gray-400">
                Forgetting to add onlyOwner or similar modifiers to sensitive functions.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">🔓 Unprotected Initializers</h4>
              <p className="text-sm text-gray-400">
                In upgradeable contracts, anyone can call initialize() if not protected.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h4 className="font-semibold text-yellow-400 mb-2">🔓 Incorrect msg.sender Checks</h4>
              <p className="text-sm text-gray-400">
                Using tx.origin instead of msg.sender, or wrong comparison logic.
              </p>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="font-semibold text-purple-400 mb-2">🔓 Default Visibility</h4>
              <p className="text-sm text-gray-400">
                Functions without explicit visibility default to public in older Solidity versions.
              </p>
            </div>
          </div>
        </section>

        <section id="missing-modifiers">
          <h2>Missing Access Modifiers</h2>
          <p>
            The most common mistake is simply forgetting to add access control to admin functions:
          </p>

          <CodeComparison
            vulnerable={{
              title: 'Vulnerable - No Access Control',
              code: `contract VulnerableToken {
    address public owner;
    mapping(address => uint256) public balances;
    
    // ❌ Anyone can call this!
    function mint(address to, uint256 amount) external {
        balances[to] += amount;
    }
    
    // ❌ Anyone can withdraw all funds!
    function withdrawAll() external {
        payable(msg.sender).transfer(address(this).balance);
    }
    
    // ❌ Anyone can become owner!
    function setOwner(address newOwner) external {
        owner = newOwner;
    }
}`
            }}
            secure={{
              title: 'Secure - With Access Control',
              code: `contract SecureToken {
    address public owner;
    mapping(address => uint256) public balances;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // ✅ Only owner can mint
    function mint(address to, uint256 amount) external onlyOwner {
        balances[to] += amount;
    }
    
    // ✅ Only owner can withdraw
    function withdrawAll() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    // ✅ Only owner can transfer ownership
    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}`
            }}
          />
        </section>

        <section id="improper-validation">
          <h2>Improper Role Validation</h2>
          <p>
            Even when access control exists, it can be implemented incorrectly:
          </p>

          <CodeBlock
            code={`// ❌ VULNERABLE: Using == instead of require
contract BadValidation {
    address public admin;
    
    function sensitiveAction() external {
        // This doesn't revert! It just does nothing if not admin
        if (msg.sender == admin) {
            // do something
        }
        // Execution continues even for non-admins!
    }
}

// ❌ VULNERABLE: Using tx.origin
contract TxOriginVulnerable {
    address public owner;
    
    function withdraw() external {
        // Vulnerable to phishing! See tx.origin article
        require(tx.origin == owner, "Not owner");
        payable(tx.origin).transfer(address(this).balance);
    }
}

// ❌ VULNERABLE: Uninitialized owner
contract UninitializedOwner {
    address public owner; // Defaults to address(0)
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // If owner is never set, no one can call this
    // Or worse, owner might match a burnt address
    function mint(address to, uint256 amount) external onlyOwner {
        // ...
    }
}

// ✅ SECURE: Proper initialization
contract ProperInit {
    address public owner;
    
    constructor() {
        owner = msg.sender; // Set in constructor
    }
    
    // Or use initializer pattern for proxies
}`}
            language="solidity"
            filename="ValidationExamples.sol"
          />
        </section>

        <section id="best-practices">
          <h2>Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Use OpenZeppelin</h4>
              <p className="text-sm text-gray-400">
                Battle-tested access control contracts with Ownable, AccessControl, and more.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Two-Step Ownership</h4>
              <p className="text-sm text-gray-400">
                Require new owner to accept transfer, preventing accidental lockouts.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Role-Based Access</h4>
              <p className="text-sm text-gray-400">
                Use granular roles instead of a single owner for better security.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Explicit Visibility</h4>
              <p className="text-sm text-gray-400">
                Always declare function visibility explicitly (public, external, internal, private).
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// Two-step ownership transfer pattern
contract TwoStepOwnable {
    address public owner;
    address public pendingOwner;
    
    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    // Step 1: Current owner initiates transfer
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        pendingOwner = newOwner;
        emit OwnershipTransferStarted(owner, newOwner);
    }
    
    // Step 2: New owner must accept
    function acceptOwnership() external {
        require(msg.sender == pendingOwner, "Not pending owner");
        emit OwnershipTransferred(owner, pendingOwner);
        owner = pendingOwner;
        pendingOwner = address(0);
    }
    
    // Emergency: Cancel pending transfer
    function cancelTransfer() external onlyOwner {
        pendingOwner = address(0);
    }
}`}
            language="solidity"
            filename="TwoStepOwnable.sol"
          />
        </section>

        <section id="openzeppelin">
          <h2>Using OpenZeppelin AccessControl</h2>
          <p>
            For complex protocols, use role-based access control instead of simple ownership:
          </p>

          <CodeBlock
            code={`import "@openzeppelin/contracts/access/AccessControl.sol";

contract SecureProtocol is AccessControl {
    // Define roles as constants
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    constructor() {
        // Grant deployer the default admin role
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    // Only addresses with MINTER_ROLE can call
    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
    
    // Only addresses with PAUSER_ROLE can call
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    // Only addresses with ADMIN_ROLE can call
    function setFee(uint256 newFee) external onlyRole(ADMIN_ROLE) {
        fee = newFee;
    }
    
    // Role hierarchy example:
    // - DEFAULT_ADMIN_ROLE can grant/revoke all roles
    // - ADMIN_ROLE can manage protocol settings
    // - MINTER_ROLE can only mint tokens
    // - PAUSER_ROLE can only pause/unpause
}`}
            language="solidity"
            filename="AccessControlExample.sol"
          />

          <AlertBox type="info" title="Pro Tip">
            Use AccessControlEnumerable if you need to enumerate role members, or 
            AccessControlDefaultAdminRules for additional safety on admin role transfers.
          </AlertBox>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-wrap gap-2 mb-6">
          {['Access Control', 'Authorization', 'Modifiers', 'OpenZeppelin', 'Ownable'].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs text-lime-400/70 bg-lime-400/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/learn/vulnerabilities/tx-origin-phishing" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
            <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">tx.origin Phishing</h4>
            <p className="text-sm text-gray-500 mt-1">Why tx.origin is dangerous for authorization</p>
          </Link>
          <Link href="/learn/best-practices/secure-access-control" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
            <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Access Control Best Practices</h4>
            <p className="text-sm text-gray-500 mt-1">Complete guide to implementing secure access control</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
