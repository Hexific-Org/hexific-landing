'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/learn/LearnComponents';
import { AlertTriangle, Clock, DollarSign, Code2, Lock, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function CurveFinance2023Page() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'technical' | 'prevention'>('timeline');

  return (
    <div className="min-h-screen bg-[#08090d]">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Case Studies', href: '/learn/case-studies' },
        { label: 'Curve Finance 2023' },
      ]} />

      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-400 text-xs font-semibold mb-3">
              ETHEREUM • JULY 2023
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              Vyper Compiler Reentrancy Bug
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              A critical vulnerability in the Vyper compiler&apos;s decorator logic broke reentrancy protections across multiple Curve Finance pools, resulting in significant losses.
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Amount Lost</span>
            </div>
            <div className="text-3xl font-bold text-red-400">$70M</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Date</span>
            </div>
            <div className="text-3xl font-bold text-orange-400">Jul 2023</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Vulnerability</span>
            </div>
            <div className="text-sm font-bold text-cyan-400">Compiler Bug</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-gray-500 uppercase tracking-wider">Attack Vector</span>
            </div>
            <div className="text-sm font-bold text-yellow-400">Reentrancy</div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-400/20">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
          <div className="w-1 h-6 bg-lime-400 rounded-full" />
          Executive Summary
        </h2>
        <div className="space-y-3 text-gray-300">
          <p>
            In July 2023, a critical bug in the Vyper compiler&apos;s handling of decorators was discovered that <span className="text-cyan-400 font-semibold">broke reentrancy protections</span> in Curve Finance pools. The bug affected all pools created using Vyper&apos;s `@internal` decorator combined with reentrancy guards.
          </p>
          <p>
            The vulnerability allowed attackers to bypass reentrancy guards through a combination of read-only reentrancy and the compiler bug. Multiple attacks exploited this vulnerability across different Curve pool implementations, resulting in approximately <span className="text-red-400 font-semibold">$70 million in losses</span>.
          </p>
          <p>
            This incident highlighted the critical importance of <span className="text-lime-400 font-semibold">formal verification</span>, extensive testing, and careful auditing of compiler-generated code, especially for security-critical components like reentrancy guards.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="mb-8 flex gap-4 border-b border-gray-800">
        {[
          { id: 'timeline', label: 'Timeline', icon: Clock },
          { id: 'technical', label: 'Technical Details', icon: Code2 },
          { id: 'prevention', label: 'Prevention', icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-all ${isActive
                ? 'border-lime-400 text-lime-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="mb-12">
          <div className="relative pl-8">
            {/* Timeline line */}
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-lime-400/20" />

            {/* Timeline events */}
            <div className="space-y-8">
              {[
                {
                  date: 'Early 2023',
                  title: 'Vyper v0.3.0 Released',
                  description: 'Vyper compiler version 0.3.0 introduced changes to decorator handling that inadvertently broke reentrancy protection in certain code patterns.',
                },
                {
                  date: 'July 27, 2023',
                  title: 'First Attack Detected',
                  description: 'Attackers begin exploiting the vulnerability in Curve Finance pools. The first significant loss occurs affecting the Alchemix USD/USDC pool.',
                },
                {
                  date: 'July 27-31, 2023',
                  title: 'Cascade of Attacks',
                  description: 'Multiple attacks occur across different Curve pools over the next few days as the market realizes the scope of the vulnerability. Approximately $70M is stolen.',
                },
                {
                  date: 'Aug 2, 2023',
                  title: 'Root Cause Identified',
                  description: 'The Vyper team and Curve Finance developers identify the root cause in the Vyper compiler\'s decorator implementation.',
                },
                {
                  date: 'Aug 3, 2023',
                  title: 'Vyper v0.3.1 Released',
                  description: 'Vyper team releases version 0.3.1 with a fix for the reentrancy guard decorator bug.',
                },
                {
                  date: 'Aug 4-5, 2023',
                  title: 'Pool Migration',
                  description: 'Curve Finance redeployed affected pools with the patched Vyper compiler and upgraded security measures.',
                },
                {
                  date: 'August 2023',
                  title: 'Post-Mortem & Analysis',
                  description: 'Community and security professionals conduct thorough analysis. Lessons learned shared across the industry.',
                },
              ].map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-5 w-4 h-4 bg-lime-400 rounded-full border-2 border-[#08090d]" />

                  {/* Content card */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:bg-white/[0.04] transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-semibold text-lime-400 uppercase tracking-wider">{event.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{event.title}</h4>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Technical Details Tab */}
      {activeTab === 'technical' && (
        <div className="mb-12 space-y-8">
          {/* What Went Wrong */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              What Went Wrong
            </h3>

            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-cyan-400/20">
                <h4 className="text-lg font-bold text-cyan-400 mb-3">1. Vyper Decorator Bug</h4>
                <p className="text-gray-300 mb-4">
                  The Vyper compiler v0.3.0 had a bug in how it processed the `@internal` decorator combined with `@nonreentrant` guards. When a function had both decorators, the compiler would generate code that didn&apos;t properly apply the reentrancy protection.
                </p>
                <div className="p-3 rounded-lg bg-white/[0.01] border border-cyan-400/10 font-mono text-xs text-gray-400">
                  <div className="mb-2 text-cyan-300"># Vulnerable Pattern</div>
                  <div className="space-y-1">
                    <div>@internal</div>
                    <div>@nonreentrant(&quot;lock&quot;)</div>
                    <div>def vulnerable_function():</div>
                    <div className="ml-4">    # Protection was bypassed</div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-yellow-400/20">
                <h4 className="text-lg font-bold text-yellow-400 mb-3">2. Read-Only Reentrancy</h4>
                <p className="text-gray-300 mb-4">
                  Attackers exploited a secondary vulnerability called &quot;read-only reentrancy.&quot; While the reentrancy lock was supposed to prevent state changes during a callback, it didn&apos;t prevent the attacker from <span className="text-cyan-400">reading stale state</span> to make incorrect calculations.
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-yellow-400">•</span>
                    <span>Attacker calls an external contract within the transaction</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-400">•</span>
                    <span>The external contract calls back into Curve pools</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-400">•</span>
                    <span>The callback reads pool balances before state is updated</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-yellow-400">•</span>
                    <span>Using these stale balances for calculations yields incorrect prices</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-red-400/20">
                <h4 className="text-lg font-bold text-red-400 mb-3">3. Price Oracle Manipulation</h4>
                <p className="text-gray-300">
                  The combination of the Vyper bug and read-only reentrancy allowed attackers to manipulate the effective price of assets in the pools. Attackers could use this price manipulation to:
                </p>
                <ul className="mt-4 space-y-2 text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>Swap tokens at artificially favorable rates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>Drain one asset entirely while leaving another</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-red-400">•</span>
                    <span>Profit from the price difference captured</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Attack Flow */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              Attack Flow
            </h3>

            <div className="space-y-3">
              {[
                { step: 1, title: 'Flash Loan', desc: 'Attacker obtains large amount of collateral via flash loan' },
                { step: 2, title: 'Callback Setup', desc: 'Specifies callback to manipulate during the transaction' },
                { step: 3, title: 'Read-Only Reenter', desc: 'Callback reenters Curve pool to read balances (reentrancy guard bypassed due to Vyper bug)' },
                { step: 4, title: 'State Stale', desc: 'Pool state hasn\'t updated yet, attacker sees incorrect balances' },
                { step: 5, title: 'Price Calc Exploit', desc: 'Pool price calculations use stale state, allowing favorable swaps' },
                { step: 6, title: 'Extract Value', desc: 'Attacker extracts value from the price discrepancy' },
                { step: 7, title: 'Repay Loan', desc: 'Flash loan repaid with profit kept by attacker' },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-lime-400/20 border border-lime-400/50 flex items-center justify-center font-bold text-lime-400">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  {index < 6 && (
                    <div className="flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-lime-400 mt-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Affected Pools */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              Affected Pools
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'alUSD/USDC', loss: '$23M', date: 'Jul 27' },
                { name: 'Compound DAI+USDC+USDT', loss: '$19.8M', date: 'Jul 27' },
                { name: 'Convex DeFi', loss: '$11.5M', date: 'Jul 28' },
                { name: 'Curve Stability Fee', loss: '$8.9M', date: 'Jul 28' },
                { name: 'crvETH', loss: '$4.2M', date: 'Jul 29' },
                { name: 'Other Pools', loss: '$2.6M', date: 'Jul 30-31' },
              ].map((pool, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/[0.02] border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{pool.name}</h4>
                    <span className="text-xs text-gray-500">{pool.date}</span>
                  </div>
                  <div className="text-red-400 font-bold text-lg">{pool.loss}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Prevention Tab */}
      {activeTab === 'prevention' && (
        <div className="mb-12 space-y-8">
          {/* Prevention Measures */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              How to Prevent This
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-lime-400" />
                  <h4 className="text-lg font-bold text-white">Compiler Testing</h4>
                </div>
                <p className="text-gray-400 mb-4">
                  Test compiler-generated code extensively, especially for critical functions like reentrancy guards.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Formal verification of compiled bytecode</li>
                  <li>• Unit tests for every decorator combination</li>
                  <li>• Integration tests with real attack scenarios</li>
                  <li>• Comparison testing across compiler versions</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-lime-400" />
                  <h4 className="text-lg font-bold text-white">Reentrancy Guards</h4>
                </div>
                <p className="text-gray-400 mb-4">
                  Use multiple layers of reentrancy protection, not just decorators.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Implement checks-effects-interactions pattern</li>
                  <li>• State mutations before external calls</li>
                  <li>• Explicit lock variables (not just decorators)</li>
                  <li>• Guard against read-only reentrancy</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-lime-400" />
                  <h4 className="text-lg font-bold text-white">Code Audits</h4>
                </div>
                <p className="text-gray-400 mb-4">
                  Conduct thorough audits with focus on compiler-specific issues.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Review generated bytecode, not just source code</li>
                  <li>• Test with multiple compiler versions</li>
                  <li>• Involve compiler experts in audits</li>
                  <li>• Verify decorator behavior specifically</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-lime-400" />
                  <h4 className="text-lg font-bold text-white">Formal Verification</h4>
                </div>
                <p className="text-gray-400 mb-4">
                  Use formal methods to prove security properties mathematically.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>• Model checking for reentrancy safety</li>
                  <li>• Prove invariants about state consistency</li>
                  <li>• Verify atomic transaction properties</li>
                  <li>• Use theorem provers for critical functions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Specific to Vyper */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              Vyper-Specific Best Practices
            </h3>

            <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-400/20">
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-bold mb-2">✓ Safe Patterns</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Use explicit mutex/lock pattern for reentrancy</li>
                    <li>• Implement checks-effects-interactions manually</li>
                    <li>• Don&apos;t rely solely on decorators for security</li>
                    <li>• Keep functions simple and isolation clear</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-red-400 font-bold mb-2">✗ Anti-Patterns</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Combining @internal and @nonreentrant (as proven here)</li>
                    <li>• Relying exclusively on decorator-based protection</li>
                    <li>• Complex decorator stacking</li>
                    <li>• Ignoring compiler version changes</li>
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.01] border border-cyan-400/10 font-mono text-xs text-gray-400">
                  <div className="mb-2 text-cyan-300"># Safe Reentrancy Pattern</div>
                  <div className="space-y-1">
                    <div>locked: bool</div>
                    <div></div>
                    <div>def safe_function():</div>
                    <div className="ml-4">    assert not self.locked</div>
                    <div className="ml-4">    self.locked = True</div>
                    <div className="ml-4">    # ... state changes ...</div>
                    <div className="ml-4">    # ... external calls ...</div>
                    <div className="ml-4">    self.locked = False</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Lessons */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <div className="w-1 h-6 bg-lime-400 rounded-full" />
              Key Lessons Learned
            </h3>

            <div className="space-y-3">
              {[
                'Compiler bugs can be as critical as smart contract bugs',
                'Don\'t trust decorators as your sole security mechanism',
                'Test the generated bytecode, not just the source code',
                'Read-only reentrancy is a valid attack vector',
                'Security-critical projects should use formal verification',
                'Upgrade compiler versions with extreme caution',
                'Multiple independent security layers are essential',
                'Monitor multiple projects using the same compiler/library',
              ].map((lesson, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-white/[0.02] border border-gray-800 hover:border-gray-700 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{lesson}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Section */}
      <div className="mt-16 pt-16 border-t border-gray-800">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </h3>
            <p className="text-gray-400 mb-4">
              Dive deeper into reentrancy vulnerabilities and compiler security.
            </p>
            <a
              href="/learn/vulnerabilities/reentrancy"
              className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-semibold"
            >
              Reentrancy Guide
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-colors">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              Test Your Knowledge
              <ArrowRight className="w-4 h-4" />
            </h3>
            <p className="text-gray-400 mb-4">
              Check if you can spot similar vulnerabilities in audit scenarios.
            </p>
            <a
              href="/learn/checklist"
              className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-semibold"
            >
              Security Checklist
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* References */}
      <div className="mt-12 p-6 rounded-xl bg-white/[0.02] border border-gray-800">
        <h3 className="text-lg font-bold text-white mb-4">References & Further Reading</h3>
        <div className="space-y-2 text-sm text-gray-400">
          <p>
            • <span className="text-gray-500">Curve Finance Blog -</span> &quot;July 2023 Incident Report&quot;
          </p>
          <p>
            • <span className="text-gray-500">Vyper Documentation -</span> &quot;Reentrancy Protection&quot;
          </p>
          <p>
            • <span className="text-gray-500">OpenZeppelin -</span> &quot;Read-Only Reentrancy&quot;
          </p>
          <p>
            • <span className="text-gray-500">Trail of Bits -</span> &quot;Vyper compiler analysis 2023&quot;
          </p>
          <p>
            • <span className="text-gray-500">Ethereum Foundation -</span> &quot;Formal Verification of Smart Contracts&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
