'use client';

import { useState } from 'react';
import { ArticleCard, SectionHeader, Breadcrumb, Article } from '@/components/learn/LearnComponents';
import '../styles.css';

// Best practices articles data
const bestPracticesArticles: Article[] = [
  {
    slug: 'checks-effects-interactions',
    title: 'Checks-Effects-Interactions Pattern',
    description: 'The fundamental pattern for writing secure smart contracts. Learn how to structure your functions to prevent reentrancy.',
    category: 'Best Practices',
    difficulty: 'beginner',
    tags: ['CEI', 'Reentrancy', 'Pattern', 'Solidity'],
    readTime: '5 min read',
    date: 'Dec 20, 2024',
    featured: true,
  },
  {
    slug: 'secure-access-control',
    title: 'Implementing Secure Access Control',
    description: 'Best practices for role-based access control using OpenZeppelin AccessControl and custom solutions.',
    category: 'Best Practices',
    difficulty: 'intermediate',
    tags: ['Access Control', 'OpenZeppelin', 'RBAC', 'Modifiers'],
    readTime: '8 min read',
    date: 'Dec 18, 2024',
    featured: true,
  },
  {
    slug: 'audit-preparation-guide',
    title: 'Preparing Your Protocol for Audit',
    description: 'Complete checklist and guide for getting your smart contracts ready for a professional security audit.',
    category: 'Best Practices',
    difficulty: 'beginner',
    tags: ['Audit', 'Documentation', 'Testing', 'Preparation'],
    readTime: '10 min read',
    date: 'Dec 15, 2024',
    featured: true,
  },
  {
    slug: 'upgradeable-contracts',
    title: 'Safe Upgradeable Contract Patterns',
    description: 'How to implement upgradeable contracts safely using proxy patterns and avoiding storage collisions.',
    category: 'Best Practices',
    difficulty: 'advanced',
    tags: ['Proxy', 'Upgradeable', 'EIP-1967', 'Storage'],
    readTime: '12 min read',
    date: 'Dec 12, 2024',
  },
  {
    slug: 'oracle-integration',
    title: 'Secure Oracle Integration',
    description: 'Best practices for integrating Chainlink and other oracles safely to prevent price manipulation attacks.',
    category: 'Best Practices',
    difficulty: 'intermediate',
    tags: ['Oracle', 'Chainlink', 'TWAP', 'Price Feed'],
    readTime: '9 min read',
    date: 'Dec 10, 2024',
  },
  {
    slug: 'gas-optimization-security',
    title: 'Gas Optimization Without Compromising Security',
    description: 'How to optimize gas costs while maintaining security. Common pitfalls to avoid.',
    category: 'Best Practices',
    difficulty: 'intermediate',
    tags: ['Gas', 'Optimization', 'Security', 'Trade-offs'],
    readTime: '7 min read',
    date: 'Dec 8, 2024',
  },
  {
    slug: 'testing-strategies',
    title: 'Comprehensive Smart Contract Testing',
    description: 'Unit testing, integration testing, fuzzing, and formal verification strategies for bulletproof contracts.',
    category: 'Best Practices',
    difficulty: 'intermediate',
    tags: ['Testing', 'Foundry', 'Hardhat', 'Fuzzing'],
    readTime: '11 min read',
    date: 'Dec 5, 2024',
  },
  {
    slug: 'emergency-procedures',
    title: 'Implementing Emergency Stop Mechanisms',
    description: 'How to build circuit breakers and pause functionality for emergency situations.',
    category: 'Best Practices',
    difficulty: 'beginner',
    tags: ['Pausable', 'Emergency', 'Circuit Breaker'],
    readTime: '6 min read',
    date: 'Dec 3, 2024',
  },
  {
    slug: 'safe-math-operations',
    title: 'Safe Arithmetic in Solidity',
    description: 'Understanding Solidity 0.8+ overflow protection and when you still need to be careful.',
    category: 'Best Practices',
    difficulty: 'beginner',
    tags: ['SafeMath', 'Arithmetic', 'Overflow', 'Solidity 0.8'],
    readTime: '5 min read',
    date: 'Nov 30, 2024',
  },
  {
    slug: 'external-call-safety',
    title: 'Making Safe External Calls',
    description: 'How to safely interact with external contracts and handle return values properly.',
    category: 'Best Practices',
    difficulty: 'intermediate',
    tags: ['External Calls', 'Interface', 'Return Values'],
    readTime: '7 min read',
    date: 'Nov 28, 2024',
  },
];

// Category filters
const categoryOptions = [
  { value: 'all', label: 'All Topics', icon: '📚' },
  { value: 'patterns', label: 'Design Patterns', icon: '🏗️' },
  { value: 'testing', label: 'Testing', icon: '🧪' },
  { value: 'deployment', label: 'Deployment', icon: '🚀' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
];

export default function BestPracticesPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles
  const filteredArticles = bestPracticesArticles.filter((article) => {
    if (difficultyFilter && article.difficulty !== difficultyFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const featuredArticles = filteredArticles.filter(a => a.featured);
  const regularArticles = filteredArticles.filter(a => !a.featured);

  return (
    <div>
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Best Practices' },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ✅ Best Practices
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Proven patterns and strategies for building secure smart contracts. 
          From basic patterns to advanced deployment strategies.
        </p>
      </div>

      {/* Quick Tips Banner */}
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-lime-400/10 to-green-500/10 border border-lime-400/20">
        <h3 className="text-lg font-semibold text-lime-400 mb-4">💡 Quick Security Tips</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Always follow the CEI pattern</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Use ReentrancyGuard for sensitive functions</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Check return values from external calls</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Implement access control on admin functions</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Use TWAP for price oracle data</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-sm text-gray-300">Write comprehensive tests before deploy</p>
          </div>
        </div>
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
            placeholder="Search best practices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-lime-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setCategoryFilter(option.value)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all flex items-center gap-2 ${
                  categoryFilter === option.value
                    ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                    : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wider mr-2 self-center">Difficulty:</span>
          <button
            onClick={() => setDifficultyFilter(null)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
              difficultyFilter === null
                ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
          >
            All
          </button>
          {['beginner', 'intermediate', 'advanced'].map((level) => (
            <button
              key={level}
              onClick={() => setDifficultyFilter(level)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-all capitalize ${
                difficultyFilter === level
                  ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredArticles.length} of {bestPracticesArticles.length} guides
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="🌟 Essential Guides" description="Start with these foundational best practices" />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} basePath="/learn/best-practices" />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <SectionHeader title="All Best Practices" description="Complete collection of security guides" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} basePath="/learn/best-practices" />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-6xl mb-4">📭</span>
          <h3 className="text-xl font-semibold text-white mb-2">No guides found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your filters or search query.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setDifficultyFilter(null);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-sm text-lime-400 border border-lime-400/30 rounded-lg hover:bg-lime-400/10 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Security Checklist CTA */}
      <section className="mt-16">
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">📋</div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Security Checklist</h3>
              <p className="text-gray-400">
                Use our comprehensive pre-deployment checklist to ensure your contracts are audit-ready.
              </p>
            </div>
            <a
              href="/learn/checklist"
              className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors whitespace-nowrap"
            >
              View Checklist →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
