'use client';

import { useState } from 'react';
import { ArticleCard, SectionHeader, Breadcrumb, DifficultyFilter, Article } from '@/components/learn/LearnComponents';
import '../styles.css';
import { Lock, Star, Search } from 'lucide-react';

// Vulnerability articles data
const vulnerabilityArticles: Article[] = [
  {
    slug: 'reentrancy-attack',
    title: 'Reentrancy Attacks Explained',
    description: 'Deep dive into reentrancy vulnerabilities, the attack that caused the infamous DAO hack, and modern prevention techniques.',
    category: 'Vulnerabilities',
    difficulty: 'intermediate',
    severity: 'critical',
    tags: ['Reentrancy', 'Solidity', 'DeFi', 'CEI Pattern'],
    readTime: '10 min read',
    date: 'Dec 15, 2024',
    featured: true,
  },
  {
    slug: 'flash-loan-attacks',
    title: 'Flash Loan Attack Vectors',
    description: 'Understanding how flash loans enable sophisticated attacks and price manipulations in DeFi protocols.',
    category: 'Vulnerabilities',
    difficulty: 'advanced',
    severity: 'critical',
    tags: ['Flash Loans', 'DeFi', 'Price Manipulation', 'Aave'],
    readTime: '15 min read',
    date: 'Dec 12, 2024',
    featured: true,
  },
  {
    slug: 'access-control-vulnerabilities',
    title: 'Access Control Vulnerabilities',
    description: 'Common access control mistakes that lead to unauthorized function calls and privilege escalation.',
    category: 'Vulnerabilities',
    difficulty: 'beginner',
    severity: 'high',
    tags: ['Access Control', 'Authorization', 'Modifiers'],
    readTime: '7 min read',
    date: 'Dec 10, 2024',
  },
  {
    slug: 'integer-overflow-underflow',
    title: 'Integer Overflow & Underflow',
    description: 'How arithmetic bugs can break your contract logic and why Solidity 0.8+ changed everything.',
    category: 'Vulnerabilities',
    difficulty: 'beginner',
    severity: 'high',
    tags: ['Arithmetic', 'SafeMath', 'Solidity 0.8'],
    readTime: '6 min read',
    date: 'Dec 8, 2024',
  },
  {
    slug: 'oracle-manipulation',
    title: 'Oracle Manipulation Attacks',
    description: 'How attackers exploit price oracles and the importance of using TWAP and decentralized oracle networks.',
    category: 'Vulnerabilities',
    difficulty: 'advanced',
    severity: 'critical',
    tags: ['Oracles', 'Chainlink', 'TWAP', 'Price Feeds'],
    readTime: '12 min read',
    date: 'Dec 5, 2024',
  },
  {
    slug: 'front-running',
    title: 'Front-Running & MEV',
    description: 'Understanding transaction ordering attacks, sandwich attacks, and MEV protection strategies.',
    category: 'Vulnerabilities',
    difficulty: 'intermediate',
    severity: 'medium',
    tags: ['MEV', 'Front-Running', 'Sandwich Attack', 'Flashbots'],
    readTime: '9 min read',
    date: 'Dec 3, 2024',
  },
  {
    slug: 'denial-of-service',
    title: 'Denial of Service (DoS) Attacks',
    description: 'How gas limits, unbounded loops, and external calls can be exploited to halt your contract.',
    category: 'Vulnerabilities',
    difficulty: 'intermediate',
    severity: 'medium',
    tags: ['DoS', 'Gas Limit', 'Loops', 'External Calls'],
    readTime: '8 min read',
    date: 'Nov 30, 2024',
  },
  {
    slug: 'signature-replay',
    title: 'Signature Replay Attacks',
    description: 'Why signatures need nonces and domain separators, and how to implement EIP-712 correctly.',
    category: 'Vulnerabilities',
    difficulty: 'intermediate',
    severity: 'high',
    tags: ['Signatures', 'EIP-712', 'Replay Attack', 'Nonce'],
    readTime: '10 min read',
    date: 'Nov 28, 2024',
  },
  {
    slug: 'storage-collision',
    title: 'Storage Collision in Proxies',
    description: 'Understanding storage layout issues in upgradeable contracts and how to avoid them.',
    category: 'Vulnerabilities',
    difficulty: 'advanced',
    severity: 'critical',
    tags: ['Proxy', 'Upgradeable', 'Storage', 'EIP-1967'],
    readTime: '11 min read',
    date: 'Nov 25, 2024',
  },
  {
    slug: 'unchecked-return-values',
    title: 'Unchecked Return Values',
    description: 'Why ignoring return values from external calls can lead to silent failures and fund losses.',
    category: 'Vulnerabilities',
    difficulty: 'beginner',
    severity: 'medium',
    tags: ['Return Values', 'External Calls', 'Error Handling'],
    readTime: '5 min read',
    date: 'Nov 22, 2024',
  },
  {
    slug: 'timestamp-dependence',
    title: 'Timestamp Manipulation',
    description: 'The risks of using block.timestamp for critical logic and safer alternatives.',
    category: 'Vulnerabilities',
    difficulty: 'beginner',
    severity: 'low',
    tags: ['Timestamp', 'Block Variables', 'Randomness'],
    readTime: '5 min read',
    date: 'Nov 20, 2024',
  },
  {
    slug: 'tx-origin-phishing',
    title: 'tx.origin Phishing',
    description: 'Why using tx.origin for authentication is dangerous and how it enables phishing attacks.',
    category: 'Vulnerabilities',
    difficulty: 'beginner',
    severity: 'high',
    tags: ['tx.origin', 'Phishing', 'Authentication', 'msg.sender'],
    readTime: '4 min read',
    date: 'Nov 18, 2024',
  },
];

// Severity filter options
const severityOptions = [
  { value: 'critical', label: 'Critical', color: 'red' },
  { value: 'high', label: 'High', color: 'orange' },
  { value: 'medium', label: 'Medium', color: 'yellow' },
  { value: 'low', label: 'Low', color: 'green' },
];

export default function VulnerabilitiesPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles
  const filteredArticles = vulnerabilityArticles.filter((article) => {
    if (difficultyFilter && article.difficulty !== difficultyFilter) return false;
    if (severityFilter && article.severity !== severityFilter) return false;
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
        { label: 'Vulnerabilities' },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <Lock className="w-8 h-8 text-lime-400" />
          Smart Contract Vulnerabilities
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Comprehensive guides on common vulnerabilities found in smart contracts.
          Learn how attacks work and how to protect your protocols.
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
            placeholder="Search vulnerabilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-lime-400/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-lime-400/50"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Difficulty</label>
            <DifficultyFilter selected={difficultyFilter} onChange={setDifficultyFilter} />
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider">Severity</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSeverityFilter(null)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${severityFilter === null
                  ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
                  : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
              >
                All
              </button>
              {severityOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSeverityFilter(option.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${severityFilter === option.value
                    ? `bg-${option.color}-500/20 border-${option.color}-500/50 text-${option.color}-400`
                    : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-gray-500">
        Showing {filteredArticles.length} of {vulnerabilityArticles.length} articles
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="mb-12">
          <SectionHeader title="Featured" description="Must-read vulnerability guides" />
          <div className="grid md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} basePath="/learn/vulnerabilities" />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <SectionHeader title="All Vulnerabilities" description="Complete list of vulnerability guides" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} basePath="/learn/vulnerabilities" />
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-lime-400/10 flex items-center justify-center text-lime-400 mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
          <p className="text-gray-400 max-w-md">
            Try adjusting your filters or search query to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setDifficultyFilter(null);
              setSeverityFilter(null);
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-sm text-lime-400 border border-lime-400/30 rounded-lg hover:bg-lime-400/10 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
