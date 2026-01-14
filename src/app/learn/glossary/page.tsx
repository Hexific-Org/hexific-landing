'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/learn/LearnComponents';
import '../styles.css';

// Glossary terms organized alphabetically
const glossaryTerms = [
  {
    term: 'ABI',
    definition: 'Application Binary Interface - A JSON representation of a smart contract\'s functions and events that allows external applications to interact with it.',
    category: 'Technical',
  },
  {
    term: 'Access Control',
    definition: 'Security mechanisms that restrict which addresses can call certain functions in a smart contract.',
    category: 'Security',
  },
  {
    term: 'Audit',
    definition: 'A comprehensive security review of smart contract code to identify vulnerabilities and suggest improvements.',
    category: 'Security',
  },
  {
    term: 'Block',
    definition: 'A collection of transactions that are bundled together and added to the blockchain.',
    category: 'Blockchain',
  },
  {
    term: 'CEI Pattern',
    definition: 'Checks-Effects-Interactions - A coding pattern where you first validate inputs, then update state, and finally make external calls.',
    category: 'Security',
  },
  {
    term: 'DeFi',
    definition: 'Decentralized Finance - Financial services built on blockchain technology without traditional intermediaries.',
    category: 'Ecosystem',
  },
  {
    term: 'DEX',
    definition: 'Decentralized Exchange - A cryptocurrency exchange that operates without a central authority.',
    category: 'Ecosystem',
  },
  {
    term: 'EIP',
    definition: 'Ethereum Improvement Proposal - A design document providing information about new features or processes for Ethereum.',
    category: 'Technical',
  },
  {
    term: 'ERC-20',
    definition: 'A standard interface for fungible tokens on Ethereum, defining functions like transfer and approve.',
    category: 'Standards',
  },
  {
    term: 'ERC-721',
    definition: 'A standard interface for non-fungible tokens (NFTs) on Ethereum.',
    category: 'Standards',
  },
  {
    term: 'Fallback Function',
    definition: 'A special function in Solidity that executes when a contract receives ETH or when no other function matches.',
    category: 'Technical',
  },
  {
    term: 'Flash Loan',
    definition: 'An uncollateralized loan that must be borrowed and repaid within a single transaction.',
    category: 'DeFi',
  },
  {
    term: 'Front-Running',
    definition: 'When someone sees a pending transaction and submits their own transaction first with higher gas to exploit it.',
    category: 'Security',
  },
  {
    term: 'Gas',
    definition: 'A unit measuring the computational effort required to execute operations on Ethereum.',
    category: 'Blockchain',
  },
  {
    term: 'Governance',
    definition: 'The system by which decisions are made in a decentralized protocol, often through token voting.',
    category: 'Ecosystem',
  },
  {
    term: 'Impermanent Loss',
    definition: 'The temporary loss of funds experienced by liquidity providers due to price volatility.',
    category: 'DeFi',
  },
  {
    term: 'Liquidation',
    definition: 'The process of closing a position when collateral falls below required levels in lending protocols.',
    category: 'DeFi',
  },
  {
    term: 'MEV',
    definition: 'Maximal Extractable Value - The profit that can be extracted by reordering, inserting, or censoring transactions.',
    category: 'Security',
  },
  {
    term: 'Modifier',
    definition: 'A Solidity construct that can change the behavior of functions, often used for access control.',
    category: 'Technical',
  },
  {
    term: 'Oracle',
    definition: 'A service that provides external data (like prices) to smart contracts.',
    category: 'DeFi',
  },
  {
    term: 'Proxy',
    definition: 'A smart contract pattern that allows upgrading contract logic while maintaining state and address.',
    category: 'Technical',
  },
  {
    term: 'Reentrancy',
    definition: 'A vulnerability where an external call allows an attacker to re-enter a function before it completes.',
    category: 'Security',
  },
  {
    term: 'Sandwich Attack',
    definition: 'An MEV attack where a transaction is surrounded by attacker transactions to profit from price movement.',
    category: 'Security',
  },
  {
    term: 'Slippage',
    definition: 'The difference between expected and actual price when executing a trade.',
    category: 'DeFi',
  },
  {
    term: 'Smart Contract',
    definition: 'Self-executing code deployed on a blockchain that automatically enforces the terms of an agreement.',
    category: 'Blockchain',
  },
  {
    term: 'Solidity',
    definition: 'The primary programming language for writing smart contracts on Ethereum and EVM-compatible chains.',
    category: 'Technical',
  },
  {
    term: 'TVL',
    definition: 'Total Value Locked - The total amount of assets deposited in a DeFi protocol.',
    category: 'DeFi',
  },
  {
    term: 'TWAP',
    definition: 'Time-Weighted Average Price - A pricing mechanism that averages prices over time to resist manipulation.',
    category: 'DeFi',
  },
  {
    term: 'Vault',
    definition: 'A smart contract that holds user funds and typically earns yield through various strategies.',
    category: 'DeFi',
  },
  {
    term: 'Vyper',
    definition: 'A Python-like programming language for writing smart contracts on Ethereum.',
    category: 'Technical',
  },
];

const categories = ['All', 'Security', 'DeFi', 'Technical', 'Blockchain', 'Ecosystem', 'Standards'];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter terms
  const filteredTerms = glossaryTerms.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.term.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Group by first letter
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <div>
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Glossary' },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          📖 Web3 Security Glossary
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Essential terms and concepts in blockchain security and DeFi. 
          Perfect for beginners and as a quick reference for experts.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-lime-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400/50"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                selectedCategory === category
                  ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Alphabet Quick Jump */}
      <div className="mb-8 flex flex-wrap gap-2">
        {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
          const hasTerms = groupedTerms[letter];
          return (
            <button
              key={letter}
              onClick={() => {
                const el = document.getElementById(`letter-${letter}`);
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              disabled={!hasTerms}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                hasTerms
                  ? 'bg-lime-400/10 text-lime-400 hover:bg-lime-400/20'
                  : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Terms count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredTerms.length} of {glossaryTerms.length} terms
      </div>

      {/* Glossary Terms */}
      <div className="space-y-8">
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <div className="sticky top-20 z-10 bg-[#000E1B] py-2">
              <h2 className="text-2xl font-bold text-lime-400">{letter}</h2>
            </div>
            <div className="space-y-4 mt-4">
              {groupedTerms[letter].map((item) => (
                <div
                  key={item.term}
                  className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{item.term}</h3>
                      <p className="text-gray-400 mt-1">{item.definition}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                      item.category === 'Security' ? 'bg-red-500/20 text-red-400' :
                      item.category === 'DeFi' ? 'bg-blue-500/20 text-blue-400' :
                      item.category === 'Technical' ? 'bg-purple-500/20 text-purple-400' :
                      item.category === 'Blockchain' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTerms.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-6xl mb-4">📭</span>
          <h3 className="text-xl font-semibold text-white mb-2">No terms found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your search or category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 px-4 py-2 text-sm text-lime-400 border border-lime-400/30 rounded-lg hover:bg-lime-400/10 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Suggest a term */}
      <div className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-lime-400/10 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Missing a term?</h3>
        <p className="text-gray-400 text-sm mb-4">
          Help us improve this glossary by suggesting new terms.
        </p>
        <a
          href="https://twitter.com/hexific"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 rounded-lg hover:bg-lime-400/20 transition-colors"
        >
          Suggest on Twitter
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
