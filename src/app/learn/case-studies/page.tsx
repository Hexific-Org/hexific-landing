'use client';

import { useState } from 'react';
import { CaseStudyCard, SectionHeader, Breadcrumb, CaseStudy } from '@/components/learn/LearnComponents';
import '../styles.css';

// Case studies data
const caseStudies: CaseStudy[] = [
  {
    slug: 'euler-finance-2023',
    title: 'The $197M Flash Loan Exploit',
    protocol: 'Euler Finance',
    chain: 'Ethereum',
    date: 'Mar 2023',
    lostAmount: '$197M',
    vulnerability: 'Donation Attack + Flash Loan',
    description: 'A sophisticated attack combining a donation function flaw with flash loans to drain the lending protocol.',
    tags: ['Flash Loan', 'Donation Attack', 'Lending'],
  },
  {
    slug: 'curve-finance-2023',
    title: 'Vyper Compiler Reentrancy Bug',
    protocol: 'Curve Finance',
    chain: 'Ethereum',
    date: 'Jul 2023',
    lostAmount: '$70M',
    vulnerability: 'Reentrancy (Compiler Bug)',
    description: 'A bug in the Vyper compiler broke reentrancy locks, affecting multiple Curve pools.',
    tags: ['Reentrancy', 'Compiler Bug', 'Vyper', 'DEX'],
  },
  {
    slug: 'mango-markets-2022',
    title: 'Price Oracle Manipulation',
    protocol: 'Mango Markets',
    chain: 'Solana',
    date: 'Oct 2022',
    lostAmount: '$114M',
    vulnerability: 'Oracle Manipulation',
    description: 'Attacker manipulated the MNGO token price oracle to borrow against inflated collateral.',
    tags: ['Oracle', 'Price Manipulation', 'Solana'],
  },
  {
    slug: 'ronin-bridge-2022',
    title: 'Private Key Compromise',
    protocol: 'Ronin Network',
    chain: 'Ethereum',
    date: 'Mar 2022',
    lostAmount: '$625M',
    vulnerability: 'Compromised Validators',
    description: 'North Korean hackers compromised 5 of 9 validator keys through social engineering.',
    tags: ['Bridge', 'Private Key', 'Validators'],
  },
  {
    slug: 'wormhole-2022',
    title: 'Signature Verification Bypass',
    protocol: 'Wormhole',
    chain: 'Solana',
    date: 'Feb 2022',
    lostAmount: '$326M',
    vulnerability: 'Input Validation',
    description: 'Attacker bypassed signature verification to mint unbacked wrapped ETH on Solana.',
    tags: ['Bridge', 'Signature', 'Solana'],
  },
  {
    slug: 'beanstalk-2022',
    title: 'Governance Flash Loan Attack',
    protocol: 'Beanstalk',
    chain: 'Ethereum',
    date: 'Apr 2022',
    lostAmount: '$182M',
    vulnerability: 'Flash Loan Governance',
    description: 'Flash loan used to gain majority voting power and pass a malicious governance proposal.',
    tags: ['Flash Loan', 'Governance', 'DAO'],
  },
  {
    slug: 'cream-finance-2021',
    title: 'Oracle & Flash Loan Combo',
    protocol: 'Cream Finance',
    chain: 'Ethereum',
    date: 'Oct 2021',
    lostAmount: '$130M',
    vulnerability: 'Oracle Manipulation',
    description: 'Complex attack involving price oracle manipulation and flash loans to drain lending pools.',
    tags: ['Flash Loan', 'Oracle', 'Lending'],
  },
  {
    slug: 'badger-dao-2021',
    title: 'Front-End Compromise',
    protocol: 'BadgerDAO',
    chain: 'Ethereum',
    date: 'Dec 2021',
    lostAmount: '$120M',
    vulnerability: 'Front-End Attack',
    description: 'Attacker injected malicious scripts into the website to steal user approvals.',
    tags: ['Front-End', 'Approval', 'Phishing'],
  },
];

// Chain filter options
const chainOptions = ['All Chains', 'Ethereum', 'Solana', 'BSC', 'Polygon'];

// Vulnerability type options
const vulnerabilityOptions = [
  'All Types',
  'Flash Loan',
  'Reentrancy', 
  'Oracle Manipulation',
  'Bridge',
  'Governance',
  'Front-End',
];

export default function CaseStudiesPage() {
  const [chainFilter, setChainFilter] = useState('All Chains');
  const [vulnFilter, setVulnFilter] = useState('All Types');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  // Filter and sort case studies
  let filteredStudies = caseStudies.filter((study) => {
    if (chainFilter !== 'All Chains' && study.chain !== chainFilter) return false;
    if (vulnFilter !== 'All Types' && !study.tags.some(t => t.toLowerCase().includes(vulnFilter.toLowerCase()))) return false;
    return true;
  });

  // Sort
  if (sortBy === 'amount') {
    filteredStudies = [...filteredStudies].sort((a, b) => {
      const amountA = parseFloat(a.lostAmount.replace(/[$M]/g, ''));
      const amountB = parseFloat(b.lostAmount.replace(/[$M]/g, ''));
      return amountB - amountA;
    });
  }

  // Calculate total losses
  const totalLosses = caseStudies.reduce((acc, study) => {
    const amount = parseFloat(study.lostAmount.replace(/[$M]/g, ''));
    return acc + amount;
  }, 0);

  return (
    <div>
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Case Studies' },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          🔍 Protocol Hack Analysis
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Learn from the past. Detailed breakdowns of major DeFi hacks and exploits, 
          what went wrong, and how to prevent similar attacks.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-red-400">${totalLosses.toFixed(0)}M+</div>
            <div className="text-sm text-gray-400">Total Losses Analyzed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-400">{caseStudies.length}</div>
            <div className="text-sm text-gray-400">Case Studies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">6+</div>
            <div className="text-sm text-gray-400">Attack Vectors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-lime-400">4</div>
            <div className="text-sm text-gray-400">Chains Covered</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        {/* Chain Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Chain</label>
          <select
            value={chainFilter}
            onChange={(e) => setChainFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-lime-400/20 rounded-lg text-white text-sm focus:outline-none focus:border-lime-400/50"
          >
            {chainOptions.map((chain) => (
              <option key={chain} value={chain} className="bg-[#000E1B]">
                {chain}
              </option>
            ))}
          </select>
        </div>

        {/* Vulnerability Type Filter */}
        <div>
          <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Attack Type</label>
          <select
            value={vulnFilter}
            onChange={(e) => setVulnFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-lime-400/20 rounded-lg text-white text-sm focus:outline-none focus:border-lime-400/50"
          >
            {vulnerabilityOptions.map((vuln) => (
              <option key={vuln} value={vuln} className="bg-[#000E1B]">
                {vuln}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Sort By</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('date')}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                sortBy === 'date'
                  ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              📅 Date
            </button>
            <button
              onClick={() => setSortBy('amount')}
              className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                sortBy === 'amount'
                  ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              💰 Amount Lost
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredStudies.length} of {caseStudies.length} case studies
      </div>

      {/* Case Studies Grid */}
      <section>
        <div className="grid md:grid-cols-2 gap-6">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-6xl mb-4">🔍</span>
          <h3 className="text-xl font-semibold text-white mb-2">No case studies found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setChainFilter('All Chains');
              setVulnFilter('All Types');
            }}
            className="mt-4 px-4 py-2 text-sm text-lime-400 border border-lime-400/30 rounded-lg hover:bg-lime-400/10 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Timeline Section */}
      <section className="mt-16">
        <SectionHeader 
          title="2023 Attack Timeline" 
          description="Major DeFi exploits of the year"
        />
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-lime-400/20" />
          
          <div className="space-y-8">
            {caseStudies
              .filter(s => s.date.includes('2023'))
              .map((study, index) => (
                <div key={study.slug} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-lime-400 rounded-full transform -translate-x-1/2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="p-4 bg-white/[0.02] border border-lime-400/10 rounded-xl">
                      <span className="text-xs text-lime-400 font-medium">{study.date}</span>
                      <h4 className="text-white font-semibold mt-1">{study.protocol}</h4>
                      <p className="text-sm text-gray-400 mt-1">{study.vulnerability}</p>
                      <span className="text-red-400 font-bold">{study.lostAmount}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
