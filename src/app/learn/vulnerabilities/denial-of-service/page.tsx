'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function DenialOfServicePage() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Vulnerabilities', href: '/learn/vulnerabilities' },
        { label: 'Denial of Service (DoS)' },
      ]} />

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Intermediate
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            Medium Severity
          </span>
        </div>
        
        <h1>Denial of Service (DoS) Attacks</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          How gas limits, unbounded loops, unexpected reverts, and external call failures 
          can be weaponized to permanently halt your smart contract.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            8 min read
          </span>
          <span>•</span>
          <span>Updated Jan 2025</span>
          <span>•</span>
          <span>By Hexific Security Team</span>
        </div>
      </header>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">∞</div>
          <div className="text-xs text-gray-500">Permanent Lockout</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">30M</div>
          <div className="text-xs text-gray-500">Block Gas Limit</div>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-400">#5</div>
          <div className="text-xs text-gray-500">Common Vuln Type</div>
        </div>
        <div className="p-4 bg-lime-500/10 border border-lime-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-lime-400">100%</div>
          <div className="text-xs text-gray-500">Preventable</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 Table of Contents
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-dos" className="toc-link hover:text-lime-400">What is a DoS Attack?</a></li>
          <li><a href="#attack-vectors" className="toc-link hover:text-lime-400">DoS Attack Vectors</a></li>
          <li><a href="#gas-limit-dos" className="toc-link hover:text-lime-400">Gas Limit DoS</a></li>
          <li><a href="#unexpected-revert" className="toc-link hover:text-lime-400">Unexpected Revert DoS</a></li>
          <li><a href="#block-stuffing" className="toc-link hover:text-lime-400">Block Stuffing Attacks</a></li>
          <li><a href="#griefing" className="toc-link hover:text-lime-400">Griefing Attacks</a></li>
          <li><a href="#real-examples" className="toc-link hover:text-lime-400">Real-World Examples</a></li>
          <li><a href="#vulnerable-patterns" className="toc-link hover:text-lime-400">Vulnerable Code Patterns</a></li>
          <li><a href="#prevention" className="toc-link hover:text-lime-400">Prevention Strategies</a></li>
          <li><a href="#testing" className="toc-link hover:text-lime-400">Testing for DoS Vulnerabilities</a></li>
        </ul>
      </nav>

      {/* Article Content */}
      <article>
        <section id="what-is-dos">
          <h2>What is a DoS Attack?</h2>
          <p>
            A Denial of Service (DoS) attack in smart contracts occurs when an attacker 
            can make a contract function unusable or the entire contract inoperable. Unlike 
            traditional web DoS attacks that flood servers with traffic, smart contract DoS 
            attacks exploit logic flaws to permanently or temporarily block functionality.
          </p>

          <AlertBox type="danger" title="Permanent vs Temporary DoS">
            The scariest DoS attacks are <strong>permanent</strong> — funds can be locked forever 
            with no way to recover them. Even temporary DoS can cause significant damage during 
            time-sensitive operations like auctions or liquidations.
          </AlertBox>

          <div className="my-8 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="text-lime-400 font-semibold mb-4">🎯 What Makes Smart Contract DoS Unique?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h5 className="font-medium text-red-400 mb-2">⚠️ No Recovery Option</h5>
                <p className="text-sm text-gray-400">
                  Unlike servers that can be restarted, immutable contracts cannot be 
                  patched. A DoS vulnerability may lock funds forever.
                </p>
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <h5 className="font-medium text-orange-400 mb-2">⚠️ Gas Constraints</h5>
                <p className="text-sm text-gray-400">
                  Every transaction has a gas limit (~30M per block). Operations exceeding 
                  this limit become impossible to execute.
                </p>
              </div>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h5 className="font-medium text-yellow-400 mb-2">⚠️ External Dependencies</h5>
                <p className="text-sm text-gray-400">
                  Contracts calling external contracts can be blocked if those calls 
                  fail or consume excessive gas.
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h5 className="font-medium text-purple-400 mb-2">⚠️ Economic Incentives</h5>
                <p className="text-sm text-gray-400">
                  Attackers may profit from DoS by blocking competitors, manipulating 
                  auctions, or preventing liquidations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="attack-vectors">
          <h2>DoS Attack Vectors</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">⛽</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">1. Gas Limit DoS</h4>
                  <p className="text-sm text-gray-400">
                    Unbounded loops or operations that grow with user input can exceed 
                    block gas limits, making functions uncallable.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded">Most Common</span>
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">Loops</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">❌</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">2. Unexpected Revert DoS</h4>
                  <p className="text-sm text-gray-400">
                    When a function depends on external calls that can be made to fail, 
                    attackers can force the entire transaction to revert.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded">External Calls</span>
                    <span className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">Push Pattern</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">📦</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">3. Block Stuffing</h4>
                  <p className="text-sm text-gray-400">
                    Flooding the network with high-gas transactions to prevent specific 
                    time-sensitive operations from being included in blocks.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">Network Level</span>
                    <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded">Expensive</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">💀</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">4. Griefing Attacks</h4>
                  <p className="text-sm text-gray-400">
                    Attackers make operations more expensive or inconvenient for others, 
                    even if they don't directly profit.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded">No Direct Profit</span>
                    <span className="text-xs px-2 py-0.5 bg-pink-500/20 text-pink-400 rounded">Malicious Intent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-white/[0.02] border border-cyan-500/20 rounded-xl">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="font-semibold text-white mb-2">5. Owner Action Required</h4>
                  <p className="text-sm text-gray-400">
                    When critical functions require owner action, a lost/compromised owner 
                    key can permanently DoS the contract.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">Centralization</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded">Key Management</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gas-limit-dos">
          <h2>Gas Limit DoS Deep Dive</h2>
          <p>
            The most common DoS vulnerability occurs when a function's gas consumption 
            grows unboundedly with user-controlled data. Once gas exceeds the block limit, 
            the function becomes impossible to execute.
          </p>

          <div className="my-8 p-6 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20 rounded-xl">
            <h4 className="font-semibold text-white mb-4 text-center">⛽ How Gas Limit DoS Works</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <span className="text-lime-400 font-mono text-sm w-16">Day 1:</span>
                <span className="text-gray-300 text-sm">Contract has 100 users, function costs 500K gas ✓</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
                <span className="text-yellow-400 font-mono text-sm w-16">Day 30:</span>
                <span className="text-gray-300 text-sm">Contract has 5,000 users, function costs 10M gas ✓</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <span className="text-orange-400 font-mono text-sm w-16">Day 90:</span>
                <span className="text-orange-300 text-sm">Contract has 50,000 users, function costs 100M gas ⚠️</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                <span className="text-red-400 font-mono text-sm w-16">Result:</span>
                <span className="text-red-300 text-sm font-medium">Block limit is 30M gas — FUNCTION PERMANENTLY BROKEN 💥</span>
              </div>
            </div>
          </div>

          <h3>Common Patterns That Cause Gas Limit DoS</h3>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">🔄 Iterating Over Arrays</h4>
              <p className="text-sm text-gray-400">
                Looping through all users, tokens, or stakes to calculate totals or 
                distribute rewards.
              </p>
              <code className="text-xs text-gray-500 mt-2 block">for(uint i = 0; i &lt; users.length; i++)</code>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">💰 Batch Transfers</h4>
              <p className="text-sm text-gray-400">
                Sending payments to all participants in a single transaction 
                (airdrop, dividend distribution).
              </p>
              <code className="text-xs text-gray-500 mt-2 block">payable(user).transfer(amount)</code>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">🗑️ Array Cleanup</h4>
              <p className="text-sm text-gray-400">
                Deleting or resetting large arrays/mappings element by element.
              </p>
              <code className="text-xs text-gray-500 mt-2 block">delete largeArray;</code>
            </div>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">📊 State Aggregation</h4>
              <p className="text-sm text-gray-400">
                Computing sums, averages, or rankings across all entries on-chain.
              </p>
              <code className="text-xs text-gray-500 mt-2 block">totalVotes += votes[i]</code>
            </div>
          </div>
        </section>

        <section id="unexpected-revert">
          <h2>Unexpected Revert DoS</h2>
          <p>
            When your contract makes external calls and those calls can fail or be made 
            to fail, attackers can use this to block your contract's functionality.
          </p>

          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">1</span>
              <div>
                <h4 className="font-semibold text-white">Contract Has Push Payment Pattern</h4>
                <p className="text-sm text-gray-400">Auction sends refunds to outbid participants automatically</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">2</span>
              <div>
                <h4 className="font-semibold text-red-400">Attacker Deploys Malicious Contract 🎭</h4>
                <p className="text-sm text-gray-400">Contract with no receive() function or one that always reverts</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">3</span>
              <div>
                <h4 className="font-semibold text-red-400">Attacker Places Bid 💥</h4>
                <p className="text-sm text-gray-400">Uses malicious contract as the bidder address</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-orange-500/30 rounded-full flex items-center justify-center text-orange-400 font-bold">4</span>
              <div>
                <h4 className="font-semibold text-orange-400">No One Can Outbid</h4>
                <p className="text-sm text-gray-400">Any new bid tries to refund attacker → refund fails → entire tx reverts</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center text-red-400 font-bold">5</span>
              <div>
                <h4 className="font-semibold text-red-400">Auction Permanently Broken 🔒</h4>
                <p className="text-sm text-gray-400">Attacker wins with minimal bid, or auction is stuck forever</p>
              </div>
            </div>
          </div>

          <AlertBox type="warning" title="Not Just ETH Transfers">
            This applies to any external call: ERC20 transfers (some tokens revert on failure), 
            callback functions, oracle calls, or any interaction with external contracts.
          </AlertBox>
        </section>

        <section id="block-stuffing">
          <h2>Block Stuffing Attacks</h2>
          <p>
            Block stuffing is a network-level DoS where an attacker fills blocks with 
            their own transactions to prevent target transactions from being included.
          </p>

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-white mb-4">📦 Block Stuffing Mechanics</h4>
            <div className="space-y-3">
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-gray-400 text-sm">
                  <strong className="text-white">Target:</strong> Time-sensitive operations like:
                </span>
                <ul className="mt-2 text-xs text-gray-500 space-y-1 ml-4">
                  <li>• Auction endings</li>
                  <li>• Liquidation deadlines</li>
                  <li>• Option expiries</li>
                  <li>• Governance vote deadlines</li>
                </ul>
              </div>
              
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="text-gray-400 text-sm">
                  <strong className="text-white">Method:</strong> Submit many high-gas-price transactions 
                  that consume the entire block space, pushing out victim transactions.
                </span>
              </div>
              
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <span className="text-yellow-400 text-sm">
                  <strong>Cost:</strong> Very expensive on Ethereum mainnet (~$50K+ per block), 
                  but cheaper on L2s and alt-L1s.
                </span>
              </div>
            </div>
          </div>

          <h3>Famous Example: Fomo3D (2018)</h3>
          <div className="my-4 p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
            <p className="text-sm text-gray-400 mb-3">
              The winner of Fomo3D's jackpot used block stuffing to prevent anyone else from 
              buying keys in the final moments. By filling blocks with high-gas transactions, 
              they ensured no one could extend the timer, winning 10,469 ETH (~$3M at the time).
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Gaming</span>
              <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">$3M Profit</span>
            </div>
          </div>
        </section>

        <section id="griefing">
          <h2>Griefing Attacks</h2>
          <p>
            Griefing attacks don't aim to profit — they aim to cause harm or inconvenience 
            to other users, often at a cost to the attacker.
          </p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-white/[0.02] border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-3">🎯 Storage Bombing</h4>
              <p className="text-sm text-gray-400 mb-3">
                Attacker fills storage slots with data, making future operations 
                more expensive or hitting storage limits.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Example:</strong> Creating thousands of tiny positions to 
                make iteration expensive.
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-3">🗳️ Governance Blocking</h4>
              <p className="text-sm text-gray-400 mb-3">
                Using enough tokens to block quorum or veto proposals without 
                any intention to participate constructively.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Example:</strong> Voting against every proposal to stall 
                protocol development.
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-yellow-500/20 rounded-xl">
              <h4 className="font-semibold text-yellow-400 mb-3">💸 Dust Attacks</h4>
              <p className="text-sm text-gray-400 mb-3">
                Sending tiny amounts to many addresses to bloat state or make 
                accounting more complex.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Example:</strong> Sending 1 wei to every address that 
                interacted with a protocol.
              </div>
            </div>
            
            <div className="p-5 bg-white/[0.02] border border-purple-500/20 rounded-xl">
              <h4 className="font-semibold text-purple-400 mb-3">⚔️ Competitive Blocking</h4>
              <p className="text-sm text-gray-400 mb-3">
                Blocking competitor transactions or making them fail to gain 
                market advantage.
              </p>
              <div className="text-xs text-gray-500">
                <strong>Example:</strong> Front-running liquidation bots to make 
                their transactions fail.
              </div>
            </div>
          </div>
        </section>

        <section id="real-examples">
          <h2>Real-World Examples</h2>
          
          <div className="space-y-4 my-6">
            <div className="p-5 bg-gradient-to-r from-red-500/10 to-transparent border border-red-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">GovernMental Ponzi - ETH Locked Forever</h4>
                <span className="text-xs text-gray-500">2016</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                The payout function iterated over all investors to reset their balances. 
                When the investor count grew too large, the function exceeded the block 
                gas limit. 1,100 ETH remained permanently locked in the contract.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">Gas Limit DoS</span>
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Permanent Lock</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">King of the Ether - Auction Stuck</h4>
                <span className="text-xs text-gray-500">2016</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                The game used push payments to refund the previous "king" when dethroned. 
                When the refund failed (malicious contract), the entire game broke as 
                no new king could be crowned.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">Unexpected Revert</span>
                <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">Push Pattern</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Fomo3D - Block Stuffing Winner</h4>
                <span className="text-xs text-gray-500">2018</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Winner used block stuffing to prevent other players from extending 
                the timer, ensuring they won the jackpot of 10,469 ETH.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">Block Stuffing</span>
                <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">$3M Profit</span>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Akutars NFT - 34M USD Locked</h4>
                <span className="text-xs text-gray-500">2022</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                A DoS bug combined with a logical error permanently locked $34M worth 
                of ETH in the Akutars NFT contract. The contract required processing 
                all refunds before withdrawal, but the refund logic was flawed.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 rounded">Logic DoS</span>
                <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-400 rounded">$34M Locked</span>
              </div>
            </div>
          </div>
        </section>

        <section id="vulnerable-patterns">
          <h2>Vulnerable Code Patterns</h2>
          
          <h3>❌ Pattern 1: Unbounded Loop</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Gas grows with user count
contract VulnerableRewards {
    address[] public stakers;
    mapping(address => uint256) public stakes;
    
    function distributeRewards() external {
        uint256 totalStake = 0;
        
        // 💥 First loop: calculate total (gas grows O(n))
        for (uint i = 0; i < stakers.length; i++) {
            totalStake += stakes[stakers[i]];
        }
        
        // 💥 Second loop: distribute (gas grows O(n))
        for (uint i = 0; i < stakers.length; i++) {
            uint256 share = rewards * stakes[stakers[i]] / totalStake;
            payable(stakers[i]).transfer(share);  // Also vulnerable!
        }
        
        // With 10,000 stakers: ~50M gas (exceeds block limit)
    }
}`}
            language="solidity"
            filename="VulnerableRewards.sol"
          />

          <h3>❌ Pattern 2: External Call in Loop</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: One failed transfer blocks everyone
contract VulnerableAuction {
    address public highestBidder;
    uint256 public highestBid;
    
    function bid() external payable {
        require(msg.value > highestBid, "Bid too low");
        
        // 💥 If previous bidder is a contract that reverts...
        // This entire function becomes uncallable!
        payable(highestBidder).transfer(highestBid);  
        
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}`}
            language="solidity"
            filename="VulnerableAuction.sol"
          />

          <h3>❌ Pattern 3: Array Deletion DoS</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Deleting large arrays costs unlimited gas
contract VulnerableReset {
    uint256[] public data;
    
    function addData(uint256 value) external {
        data.push(value);  // Array grows over time
    }
    
    function resetAllData() external {
        // 💥 If data has 100,000 elements:
        // delete costs ~500M gas (impossible to execute)
        delete data;
    }
    
    function clearOneByOne() external {
        // 💥 Same problem, different syntax
        while (data.length > 0) {
            data.pop();  // Each pop costs ~5000 gas
        }
    }
}`}
            language="solidity"
            filename="VulnerableReset.sol"
          />

          <h3>❌ Pattern 4: Required Owner Action</h3>
          <CodeBlock
            code={`// 🚨 VULNERABLE: Lost owner key = permanent DoS
contract VulnerableVault {
    address public owner;
    bool public paused = true;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    // Users deposit funds...
    function deposit() external payable {
        // deposits work fine
    }
    
    // 💥 But withdrawals require owner to unpause first!
    function withdraw() external {
        require(!paused, "Contract paused");  
        // If owner loses keys, funds are locked forever
        payable(msg.sender).transfer(balances[msg.sender]);
    }
    
    function unpause() external onlyOwner {
        paused = false;
    }
}`}
            language="solidity"
            filename="VulnerableVault.sol"
          />
        </section>

        <section id="prevention">
          <h2>Prevention Strategies</h2>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📤</span>
                <h4 className="font-semibold text-lime-400">Pull Over Push</h4>
              </div>
              <p className="text-sm text-gray-400">
                Instead of sending funds to users, let users withdraw their funds. 
                One user's failed withdrawal doesn't affect others.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📊</span>
                <h4 className="font-semibold text-lime-400">Pagination / Batching</h4>
              </div>
              <p className="text-sm text-gray-400">
                Process large operations in fixed-size batches across multiple 
                transactions instead of all at once.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⛽</span>
                <h4 className="font-semibold text-lime-400">Gas Limits on Calls</h4>
              </div>
              <p className="text-sm text-gray-400">
                Limit gas forwarded to external calls so malicious contracts 
                can't consume all available gas.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔀</span>
                <h4 className="font-semibold text-lime-400">Isolate External Calls</h4>
              </div>
              <p className="text-sm text-gray-400">
                Don't let one failed external call revert the entire transaction. 
                Use try/catch or low-level calls with error handling.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📈</span>
                <h4 className="font-semibold text-lime-400">Incremental State Updates</h4>
              </div>
              <p className="text-sm text-gray-400">
                Track running totals instead of recalculating from scratch. 
                Update on each deposit/withdrawal rather than looping.
              </p>
            </div>

            <div className="p-5 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔐</span>
                <h4 className="font-semibold text-lime-400">Escape Hatches</h4>
              </div>
              <p className="text-sm text-gray-400">
                Provide emergency withdrawal mechanisms that don't depend on 
                complex state or external calls.
              </p>
            </div>
          </div>

          <h3>✅ Secure Pattern: Pull Payments</h3>
          <CodeBlock
            code={`// ✅ SECURE: Pull pattern - users withdraw their own funds
contract SecureAuction {
    address public highestBidder;
    uint256 public highestBid;
    mapping(address => uint256) public pendingReturns;
    
    function bid() external payable {
        require(msg.value > highestBid, "Bid too low");
        
        // ✅ Don't transfer immediately - record for later withdrawal
        if (highestBidder != address(0)) {
            pendingReturns[highestBidder] += highestBid;
        }
        
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    // ✅ Users pull their own funds - one failure doesn't affect others
    function withdraw() external {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "Nothing to withdraw");
        
        // CEI pattern
        pendingReturns[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }
}`}
            language="solidity"
            filename="SecureAuction.sol"
          />

          <h3>✅ Secure Pattern: Pagination</h3>
          <CodeBlock
            code={`// ✅ SECURE: Process in batches with pagination
contract SecureRewards {
    address[] public stakers;
    uint256 public lastProcessedIndex;
    uint256 public constant BATCH_SIZE = 100;
    
    // Store running total (don't recalculate)
    uint256 public totalStaked;
    mapping(address => uint256) public stakes;
    mapping(address => uint256) public pendingRewards;
    
    // ✅ Track totals incrementally
    function stake(uint256 amount) external {
        stakes[msg.sender] += amount;
        totalStaked += amount;  // O(1) update
        stakers.push(msg.sender);
    }
    
    // ✅ Process in fixed-size batches
    function distributeRewardsBatch(uint256 rewardAmount) external {
        uint256 endIndex = lastProcessedIndex + BATCH_SIZE;
        if (endIndex > stakers.length) {
            endIndex = stakers.length;
        }
        
        for (uint i = lastProcessedIndex; i < endIndex; i++) {
            address staker = stakers[i];
            uint256 share = rewardAmount * stakes[staker] / totalStaked;
            pendingRewards[staker] += share;
        }
        
        lastProcessedIndex = endIndex;
        
        // Reset for next distribution cycle
        if (lastProcessedIndex >= stakers.length) {
            lastProcessedIndex = 0;
        }
    }
    
    // ✅ Users claim their own rewards
    function claimRewards() external {
        uint256 amount = pendingRewards[msg.sender];
        require(amount > 0, "No rewards");
        pendingRewards[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}`}
            language="solidity"
            filename="SecureRewards.sol"
          />

          <h3>✅ Secure Pattern: Isolated External Calls</h3>
          <CodeBlock
            code={`// ✅ SECURE: Isolate external calls with try/catch
contract SecureDistributor {
    mapping(address => uint256) public failedTransfers;
    
    function distribute(address[] calldata recipients, uint256[] calldata amounts) external {
        for (uint i = 0; i < recipients.length; i++) {
            // ✅ Try the transfer, but don't revert if it fails
            (bool success, ) = payable(recipients[i]).call{
                value: amounts[i],
                gas: 50000  // Limit gas to prevent griefing
            }("");
            
            if (!success) {
                // ✅ Record failed transfer for manual claim
                failedTransfers[recipients[i]] += amounts[i];
                emit TransferFailed(recipients[i], amounts[i]);
            }
        }
    }
    
    // ✅ Fallback for failed transfers
    function claimFailedTransfer() external {
        uint256 amount = failedTransfers[msg.sender];
        require(amount > 0, "No failed transfers");
        failedTransfers[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
}`}
            language="solidity"
            filename="SecureDistributor.sol"
          />
        </section>

        <section id="testing">
          <h2>Testing for DoS Vulnerabilities</h2>

          <CodeBlock
            code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SecureAuction.sol";

contract DoSTest is Test {
    SecureAuction auction;
    MaliciousContract attacker;
    
    function setUp() public {
        auction = new SecureAuction();
        attacker = new MaliciousContract();
    }
    
    // ✅ Test: Malicious contract can't block auction
    function test_MaliciousContractCannotBlockBids() public {
        // Attacker places initial bid from malicious contract
        vm.deal(address(attacker), 1 ether);
        vm.prank(address(attacker));
        auction.bid{value: 1 ether}();
        
        // Legitimate user should be able to outbid
        address user = makeAddr("user");
        vm.deal(user, 2 ether);
        vm.prank(user);
        auction.bid{value: 2 ether}();  // Should NOT revert
        
        assertEq(auction.highestBidder(), user);
        assertEq(auction.pendingReturns(address(attacker)), 1 ether);
    }
    
    // ✅ Test: Gas doesn't grow unboundedly
    function test_GasUsageIsBounded() public {
        // Add many users
        for (uint i = 0; i < 1000; i++) {
            address user = address(uint160(i + 1));
            vm.deal(user, 1 ether);
            vm.prank(user);
            auction.bid{value: 1 wei * (i + 1)}();
        }
        
        // New bid should still work in bounded gas
        address newBidder = makeAddr("new");
        vm.deal(newBidder, 10 ether);
        
        uint256 gasBefore = gasleft();
        vm.prank(newBidder);
        auction.bid{value: 10 ether}();
        uint256 gasUsed = gasBefore - gasleft();
        
        // Should use reasonable gas (not grow with user count)
        assertLt(gasUsed, 100000, "Gas should be bounded");
    }
    
    // ✅ Fuzz: Pagination handles any batch size
    function testFuzz_PaginationWorks(uint8 numUsers) public {
        vm.assume(numUsers > 0);
        
        for (uint i = 0; i < numUsers; i++) {
            address user = address(uint160(i + 1));
            vm.deal(user, 1 ether);
            vm.prank(user);
            rewards.stake{value: 0.1 ether}();
        }
        
        // Should be able to process all in batches
        uint256 batches = (numUsers + BATCH_SIZE - 1) / BATCH_SIZE;
        for (uint i = 0; i < batches; i++) {
            rewards.distributeRewardsBatch(1 ether);
        }
        
        // All users should have pending rewards
        for (uint i = 0; i < numUsers; i++) {
            address user = address(uint160(i + 1));
            assertGt(rewards.pendingRewards(user), 0);
        }
    }
}

// Malicious contract that always reverts on ETH receive
contract MaliciousContract {
    receive() external payable {
        revert("No ETH accepted");  // Always reverts
    }
    
    function bid(address auction) external payable {
        SecureAuction(auction).bid{value: msg.value}();
    }
}`}
            language="solidity"
            filename="DoSTest.t.sol"
          />

          <div className="my-6 p-5 bg-white/[0.02] border border-lime-400/10 rounded-xl">
            <h4 className="font-semibold text-lime-400 mb-3">🛠️ DoS Detection Tools</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Slither</h5>
                <code className="text-xs text-gray-400">slither . --detect locked-ether,costly-loop</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Foundry Gas Report</h5>
                <code className="text-xs text-gray-400">forge test --gas-report</code>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Echidna</h5>
                <p className="text-xs text-gray-400">Fuzz testing for gas consumption bounds</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-white mb-2">Tenderly</h5>
                <p className="text-xs text-gray-400">Simulate transactions with varying gas limits</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="my-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="text-xl font-bold text-lime-400 mb-4">✅ DoS Prevention Checklist</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'No unbounded loops over user-controlled data',
              'Pull pattern used instead of push payments',
              'External calls isolated with try/catch',
              'Gas limits set on external calls',
              'Pagination for batch operations',
              'Running totals instead of on-demand aggregation',
              'Emergency withdrawal mechanisms exist',
              'No critical functions requiring owner action',
              'Tested with malicious/reverting contracts',
              'Gas usage profiled at scale',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-lime-400">☐</span>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference */}
        <section className="my-12 p-6 bg-white/[0.02] border border-lime-400/10 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4">📚 Quick Reference</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-red-400 mb-2">🚫 Never Do</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Loop over all users</li>
                <li>• Push payments to unknown addresses</li>
                <li>• Delete large arrays at once</li>
                <li>• Depend on external calls succeeding</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-lime-400 mb-2">✅ Always Do</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use pull pattern for payments</li>
                <li>• Paginate batch operations</li>
                <li>• Track running totals</li>
                <li>• Handle external call failures</li>
              </ul>
            </div>
            
            <div className="p-4 bg-black/30 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Gas Limits</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Block limit: ~30M gas</li>
                <li>• Safe tx limit: ~10M gas</li>
                <li>• SSTORE: ~20K gas</li>
                <li>• Transfer: ~21K gas</li>
              </ul>
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
              {['DoS', 'Gas Limit', 'Pull Pattern', 'Pagination', 'Smart Contract Security'].map((tag) => (
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
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Reentrancy Attacks</h4>
              <p className="text-sm text-gray-500 mt-1">External calls can also enable reentrancy</p>
            </Link>
            <Link href="/learn/vulnerabilities/front-running" className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl hover:border-lime-400/30 transition-colors group">
              <h4 className="font-medium text-white group-hover:text-lime-400 transition-colors">Front-Running & MEV</h4>
              <p className="text-sm text-gray-500 mt-1">Block stuffing is a related attack vector</p>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Worried About DoS Vulnerabilities?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Our auditors analyze gas consumption patterns and external call risks to 
            identify DoS vulnerabilities before they cause permanent damage.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
          >
            Get a Free Audit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </footer>
    </div>
  );
}
