'use client';

import Link from 'next/link';
import { Breadcrumb, AlertBox, CodeComparison } from '@/components/learn/LearnComponents';
import { CodeBlock } from '@/components/CodeBlock';
import '../../styles.css';

export default function EulerFinanceCaseStudy() {
  return (
    <div className="learn-content">
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Case Studies', href: '/learn/case-studies' },
        { label: 'Euler Finance Hack' },
      ]} />

      {/* Case Study Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            💰 $197M Lost
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
            ⟠ Ethereum
          </span>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            March 2023
          </span>
        </div>
        
        <h1>Euler Finance: The $197M Flash Loan Exploit</h1>
        
        <p className="text-xl text-gray-300 mt-4">
          How a vulnerable donation function combined with flash loans led to one of the largest 
          DeFi hacks of 2023.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-6">
          <span>By Hexific Research Team</span>
          <span>•</span>
          <span>15 min read</span>
          <span>•</span>
          <span>Advanced</span>
        </div>
      </header>

      {/* Key Facts */}
      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-red-400">$197M</div>
          <div className="text-xs text-gray-500">Total Lost</div>
        </div>
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-orange-400">6</div>
          <div className="text-xs text-gray-500">Transactions</div>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-yellow-400">$89M</div>
          <div className="text-xs text-gray-500">Recovered</div>
        </div>
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
          <div className="text-2xl font-bold text-green-400">45%</div>
          <div className="text-xs text-gray-500">Recovery Rate</div>
        </div>
      </div>

      {/* Table of Contents */}
      <nav className="mb-12 p-6 rounded-xl bg-white/[0.02] border border-lime-400/10">
        <h4 className="text-sm font-semibold text-lime-400 uppercase tracking-wider mb-4">
          📑 In This Analysis
        </h4>
        <ul className="space-y-2 text-sm">
          <li><a href="#background" className="toc-link hover:text-lime-400">Background on Euler</a></li>
          <li><a href="#vulnerability" className="toc-link hover:text-lime-400">The Vulnerability</a></li>
          <li><a href="#attack-flow" className="toc-link hover:text-lime-400">Attack Flow</a></li>
          <li><a href="#code-analysis" className="toc-link hover:text-lime-400">Code Analysis</a></li>
          <li><a href="#aftermath" className="toc-link hover:text-lime-400">Aftermath & Recovery</a></li>
          <li><a href="#lessons" className="toc-link hover:text-lime-400">Lessons Learned</a></li>
        </ul>
      </nav>

      {/* Content */}
      <article>
        <section id="background">
          <h2>Background on Euler Finance</h2>
          <p>
            Euler Finance was a non-custodial lending protocol on Ethereum that allowed users to 
            lend and borrow almost any ERC-20 token. What made Euler unique was its permissionless 
            listing and reactive interest rate model.
          </p>
          <p>
            Before the hack, Euler had accumulated over $200M in Total Value Locked (TVL) and was 
            considered one of the leading DeFi lending protocols.
          </p>
        </section>

        <section id="vulnerability">
          <h2>The Vulnerability</h2>
          <p>
            The exploit combined two issues in Euler's codebase:
          </p>
          
          <div className="space-y-4 my-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="font-semibold text-red-400 mb-2">🔓 Issue #1: Donation Function</h4>
              <p className="text-sm text-gray-300">
                The <code>donateToReserves()</code> function allowed users to donate eTokens to the 
                protocol reserves without properly checking if the donor had sufficient collateral.
              </p>
            </div>
            
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="font-semibold text-orange-400 mb-2">🔓 Issue #2: Soft Liquidation</h4>
              <p className="text-sm text-gray-300">
                When a user's health factor dropped below 1, anyone could liquidate them. However, 
                the liquidation process didn't account for the artificially deflated eToken balance.
              </p>
            </div>
          </div>

          <AlertBox type="danger" title="Root Cause">
            The core issue was that <code>donateToReserves()</code> reduced the user's eToken balance
            without a corresponding health check, allowing users to become artificially underwater.
          </AlertBox>
        </section>

        <section id="attack-flow">
          <h2>Attack Flow</h2>
          
          <div className="my-8 space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">1</span>
              <div>
                <h4 className="font-semibold text-white">Flash Loan DAI</h4>
                <p className="text-sm text-gray-400">Attacker borrowed 30M DAI from Aave V2 via flash loan</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">2</span>
              <div>
                <h4 className="font-semibold text-white">Deposit & Mint eTokens</h4>
                <p className="text-sm text-gray-400">Deposited 20M DAI into Euler, receiving eDAI tokens</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">3</span>
              <div>
                <h4 className="font-semibold text-white">Borrow with Leverage</h4>
                <p className="text-sm text-gray-400">Used mint() to create leveraged position (10x)</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-red-400/20 rounded-full flex items-center justify-center text-red-400 font-bold">4</span>
              <div>
                <h4 className="font-semibold text-red-400">Donate to Reserves 💥</h4>
                <p className="text-sm text-gray-400">Called donateToReserves() with most of their eDAI, making themselves liquidatable</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">5</span>
              <div>
                <h4 className="font-semibold text-white">Self-Liquidate</h4>
                <p className="text-sm text-gray-400">Created a second account to liquidate the first, receiving the collateral at a discount</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
              <span className="flex-shrink-0 w-8 h-8 bg-lime-400/20 rounded-full flex items-center justify-center text-lime-400 font-bold">6</span>
              <div>
                <h4 className="font-semibold text-white">Withdraw & Repay</h4>
                <p className="text-sm text-gray-400">Withdrew DAI from Euler and repaid the flash loan with profit</p>
              </div>
            </div>
          </div>
        </section>

        <section id="code-analysis">
          <h2>Code Analysis</h2>
          <p>
            Let's examine the vulnerable <code>donateToReserves()</code> function:
          </p>

          <CodeBlock
            code={`// Vulnerable donateToReserves function
function donateToReserves(uint subAccountId, uint amount) external nonReentrant {
    (address underlying, AssetStorage storage assetStorage, 
     address proxyAddr, address msgSender) = CALLER();

    // Get user's sub-account
    address account = getSubAccount(msgSender, subAccountId);

    // Update user's eToken balance - NO HEALTH CHECK! ❌
    assetStorage.users[account].balance = 
        encodeAmount(
            decodeAmount(assetStorage.users[account].balance) - amount
        );

    // Add to reserves
    assetStorage.reserveBalance = 
        assetStorage.reserveBalance + amount;

    // Emit event
    emit Transfer(account, address(0), amount);
    
    // Missing: checkLiquidity(account) ❌
}`}
            language="solidity"
            filename="EulerVulnerable.sol"
          />

          <AlertBox type="warning" title="What's Missing">
            The function should have included a <code>checkLiquidity(account)</code> call after 
            reducing the user's balance to ensure they remain solvent.
          </AlertBox>

          <p className="mt-6">Here's what the fixed version looks like:</p>

          <CodeBlock
            code={`// Fixed donateToReserves function
function donateToReserves(uint subAccountId, uint amount) external nonReentrant {
    (address underlying, AssetStorage storage assetStorage, 
     address proxyAddr, address msgSender) = CALLER();

    address account = getSubAccount(msgSender, subAccountId);

    // Update balance
    assetStorage.users[account].balance = 
        encodeAmount(
            decodeAmount(assetStorage.users[account].balance) - amount
        );

    assetStorage.reserveBalance = 
        assetStorage.reserveBalance + amount;

    emit Transfer(account, address(0), amount);
    
    // ✅ Critical: Check liquidity after balance change
    checkLiquidity(account);
}`}
            language="solidity"
            filename="EulerFixed.sol"
          />
        </section>

        <section id="aftermath">
          <h2>Aftermath & Recovery</h2>
          
          <p>
            In a surprising turn of events, the attacker eventually returned the stolen funds:
          </p>

          <div className="my-6 space-y-4">
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="text-sm text-gray-500">March 13, 2023</div>
              <p className="text-gray-300 mt-1">Attack executed, $197M drained from protocol</p>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="text-sm text-gray-500">March 14, 2023</div>
              <p className="text-gray-300 mt-1">Euler team offers $1M bounty for information leading to arrest</p>
            </div>
            
            <div className="p-4 bg-white/[0.02] border border-gray-700 rounded-xl">
              <div className="text-sm text-gray-500">March 18, 2023</div>
              <p className="text-gray-300 mt-1">Attacker sends on-chain message apologizing</p>
            </div>
            
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="text-sm text-green-400">March 25 - April 4, 2023</div>
              <p className="text-gray-300 mt-1">Attacker returns ~$89M in multiple transactions</p>
            </div>
          </div>
        </section>

        <section id="lessons">
          <h2>Lessons Learned</h2>
          
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Always Check Invariants</h4>
              <p className="text-sm text-gray-400">
                After any state change that affects user balances, verify that system invariants 
                (like health factors) still hold.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Audit Donation Functions</h4>
              <p className="text-sm text-gray-400">
                Donation and reserve functions can be attack vectors if they don't properly 
                validate the donor's resulting position.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Flash Loan Testing</h4>
              <p className="text-sm text-gray-400">
                Always test protocols with flash loans in mind. Any function that can be 
                called atomically should be tested for manipulation.
              </p>
            </div>
            
            <div className="p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
              <h4 className="font-semibold text-lime-400 mb-2">✅ Multiple Audits</h4>
              <p className="text-sm text-gray-400">
                Euler had been audited multiple times, but this bug was missed. Consider 
                ongoing security reviews and bug bounties.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-lime-400/10">
        <div className="flex flex-wrap gap-2 mb-6">
          {['Flash Loan', 'Donation Attack', 'Lending', 'Ethereum', 'Liquidation'].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs text-lime-400/70 bg-lime-400/10 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="p-6 bg-lime-400/5 border border-lime-400/20 rounded-xl">
          <h3 className="font-semibold text-white mb-2">🛡️ Protect Your Protocol</h3>
          <p className="text-sm text-gray-400 mb-4">
            Don't wait for an exploit. Get your smart contracts audited by Hexific's security experts.
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
