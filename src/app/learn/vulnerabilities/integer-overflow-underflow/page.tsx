'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function IntegerOverflowPage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Integer Overflow & Underflow' },
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
        
        <h1>Integer Overflow & Underflow</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            6 min read
          </span>
          <span>•</span>
          <span>Updated Dec 8, 2024</span>
          <span>•</span>
          <span>By Hexific Team</span>
        </div>
      </header>

      {/* Article Content */}
      <article>
        <section id="introduction">
          <h2>What is Integer Overflow/Underflow?</h2>
          <p>
            Integer overflow occurs when an arithmetic operation produces a value that exceeds the 
            maximum value the data type can hold. Underflow is the opposite - when a value goes 
            below the minimum (usually zero for unsigned integers).
          </p>

          <div className="my-6 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-4">📊 uint256 Limits</h4>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-sm">
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-gray-500">Minimum:</span>
                <span className="text-white ml-2">0</span>
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-gray-500">Maximum:</span>
                <span className="text-white ml-2">2²⁵⁶ - 1</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              That's 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,935
            </p>
          </div>

          <AlertBox type="success" title="Good News!">
            Since Solidity 0.8.0, arithmetic operations revert on overflow/underflow by default. 
            However, you still need to be careful with <code>unchecked</code> blocks and older contracts.
          </AlertBox>
        </section>

        <section id="how-it-works">
          <h2>How Overflow/Underflow Works</h2>
          
          <div className="my-6 p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-red-400 mb-3">🔄 Overflow Example (uint8)</h4>
            <div className="font-mono text-sm space-y-2">
              <p><span className="text-gray-400">uint8 max value:</span> <span className="text-white">255</span></p>
              <p><span className="text-gray-400">255 + 1 =</span> <span className="text-red-400">0</span> <span className="text-gray-500">(wraps around!)</span></p>
              <p><span className="text-gray-400">255 + 10 =</span> <span className="text-red-400">9</span></p>
            </div>
          </div>

          <div className="my-6 p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
            <h4 className="font-semibold text-orange-400 mb-3">🔄 Underflow Example (uint8)</h4>
            <div className="font-mono text-sm space-y-2">
              <p><span className="text-gray-400">uint8 min value:</span> <span className="text-white">0</span></p>
              <p><span className="text-gray-400">0 - 1 =</span> <span className="text-orange-400">255</span> <span className="text-gray-500">(wraps around!)</span></p>
              <p><span className="text-gray-400">5 - 10 =</span> <span className="text-orange-400">251</span></p>
            </div>
          </div>

          <CodeBlock
            code={`// In Solidity < 0.8.0, this would NOT revert
contract OverflowExample {
    // uint8 can hold values 0-255
    uint8 public value = 255;
    
    function increment() public {
        value += 1;  // Before 0.8: value becomes 0
                     // After 0.8: REVERTS!
    }
}

contract UnderflowExample {
    uint256 public balance = 100;
    
    function withdraw(uint256 amount) public {
        // Before 0.8: If amount > balance, result wraps to huge number
        // e.g., 100 - 200 = 2^256 - 100 (a massive number!)
        balance -= amount;
    }
}`}
            language="solidity"
            filename="OverflowUnderflow.sol"
          />
        </section>

        <section id="real-attack">
          <h2>Real Attack: BEC Token (2018)</h2>
          <p>
            The Beauty Chain (BEC) token had a critical overflow vulnerability in its batch transfer function:
          </p>

          <CodeBlock
            code={`// The vulnerable batchTransfer function (simplified)
function batchTransfer(address[] _receivers, uint256 _value) public {
    uint256 cnt = _receivers.length;
    
    // VULNERABLE: This multiplication can overflow!
    uint256 amount = uint256(cnt) * _value;
    
    // If overflow happens, 'amount' becomes tiny
    // but each receiver still gets full '_value'
    require(_value > 0 && balances[msg.sender] >= amount);
    
    balances[msg.sender] -= amount;  // Deducts tiny overflowed amount
    
    for (uint256 i = 0; i < cnt; i++) {
        balances[_receivers[i]] += _value;  // Adds full _value to each!
    }
}

// Attack:
// _receivers.length = 2
// _value = 2^255 (half of max uint256)
// amount = 2 * 2^255 = 2^256 = 0 (overflow!)
// Result: Sender loses 0, receivers gain 2^255 each!`}
            language="solidity"
            filename="BECVulnerability.sol"
          />

          <AlertBox type="danger" title="Impact">
            This vulnerability allowed attackers to mint tokens out of thin air, crashing 
            the token value to zero. The token was delisted from exchanges.
          </AlertBox>
        </section>

        <section id="solidity-08">
          <h2>Solidity 0.8+ Protection</h2>
          <p>
            Starting with Solidity 0.8.0, all arithmetic operations check for overflow/underflow 
            and revert if detected. This is built into the compiler.
          </p>

          <CodeBlock
            code={`// Solidity 0.8.0+
contract SafeByDefault {
    uint256 public value = type(uint256).max;  // Maximum value
    
    function tryOverflow() public {
        value += 1;  // REVERTS with Panic(0x11)
    }
}

// If you NEED unchecked math (for gas savings), be explicit:
contract UncheckedMath {
    function riskyIncrement(uint256 x) public pure returns (uint256) {
        // WARNING: This can overflow!
        unchecked {
            return x + 1;  // Does NOT revert on overflow
        }
    }
    
    // Common safe use case: loop counters
    function safeLoop(uint256[] calldata data) public pure returns (uint256 sum) {
        for (uint256 i = 0; i < data.length;) {
            sum += data[i];
            unchecked {
                ++i;  // Safe: i can't overflow before running out of gas
            }
        }
    }
}`}
            language="solidity"
            filename="Solidity08.sol"
          />
        </section>

        <section id="still-vulnerable">
          <h2>When You're Still Vulnerable</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">⚠️ unchecked Blocks</h4>
              <p className="text-sm text-gray-400">
                Code inside <code>unchecked {'{ }'}</code> bypasses overflow protection.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">⚠️ Older Contracts</h4>
              <p className="text-sm text-gray-400">
                Contracts compiled with Solidity &lt;0.8.0 are still vulnerable.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <h4 className="font-semibold text-yellow-400 mb-2">⚠️ Type Casting</h4>
              <p className="text-sm text-gray-400">
                Downcasting (uint256 to uint8) can silently truncate values.
              </p>
            </div>
            
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <h4 className="font-semibold text-purple-400 mb-2">⚠️ Assembly</h4>
              <p className="text-sm text-gray-400">
                Inline assembly bypasses all Solidity safety checks.
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// Type casting vulnerability (even in Solidity 0.8+)
contract CastingIssue {
    function unsafeCast(uint256 bigNumber) public pure returns (uint8) {
        // WARNING: This truncates without reverting!
        // 256 becomes 0, 257 becomes 1, etc.
        return uint8(bigNumber);
    }
    
    // Safe alternative
    function safeCast(uint256 bigNumber) public pure returns (uint8) {
        require(bigNumber <= type(uint8).max, "Value too large");
        return uint8(bigNumber);
    }
}

// OpenZeppelin SafeCast library
import "@openzeppelin/contracts/utils/math/SafeCast.sol";

contract WithSafeCast {
    using SafeCast for uint256;
    
    function safeCastExample(uint256 value) public pure returns (uint8) {
        return value.toUint8();  // Reverts if value > 255
    }
}`}
            language="solidity"
            filename="CastingVulnerability.sol"
          />
        </section>

        <section id="best-practices">
          <h2>Best Practices</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Use Solidity 0.8.0+</h4>
              <p className="text-sm text-gray-400">
                Always use the latest Solidity version to get built-in overflow protection.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Use SafeCast for Downcasting</h4>
              <p className="text-sm text-gray-400">
                OpenZeppelin's SafeCast library provides safe type conversions.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Review unchecked Blocks Carefully</h4>
              <p className="text-sm text-gray-400">
                Only use unchecked when you've mathematically proven overflow is impossible.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Validate Inputs</h4>
              <p className="text-sm text-gray-400">
                Check that multiplication/addition results are reasonable before using them.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Article Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-wrap gap-2 mb-6">
          {['Arithmetic', 'SafeMath', 'Solidity 0.8', 'Overflow', 'Underflow'].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs text-lime-400/70 bg-lime-400/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/learn/vulnerabilities/unchecked-return-values" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
            <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Unchecked Return Values</h4>
            <p className="text-sm text-gray-500 mt-1">Another common beginner vulnerability</p>
          </Link>
          <Link href="/learn/vulnerabilities/access-control-vulnerabilities" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
            <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Access Control Vulnerabilities</h4>
            <p className="text-sm text-gray-500 mt-1">Protect your admin functions</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
