'use client';

import Link from 'next/link';
import { FeatureCard, SectionHeader, ArticleCard, CaseStudyCard, StatsCard, Article, CaseStudy } from '@/components/learn/LearnComponents';
import './styles.css';

// Sample data - Featured Articles
const featuredArticles: Article[] = [
  {
    slug: 'reentrancy-attack',
    title: 'Understanding Reentrancy Attacks',
    description: 'Learn how reentrancy attacks work, why they are dangerous, and how to protect your smart contracts from this critical vulnerability.',
    category: 'Vulnerabilities',
    difficulty: 'intermediate',
    severity: 'critical',
    tags: ['Solidity', 'DeFi', 'Security'],
    readTime: '8 min read',
    date: 'Dec 15, 2024',
    featured: true,
  },
  {
    slug: 'flash-loan-attacks',
    title: 'Flash Loan Attack Vectors',
    description: 'Deep dive into flash loan attacks, understanding how attackers exploit uncollateralized loans to manipulate protocols.',
    category: 'Vulnerabilities',
    difficulty: 'advanced',
    severity: 'critical',
    tags: ['Flash Loans', 'DeFi', 'Manipulation'],
    readTime: '12 min read',
    date: 'Dec 10, 2024',
    featured: true,
  },
  {
    slug: 'access-control',
    title: 'Access Control Best Practices',
    description: 'Essential patterns for implementing secure access control in your smart contracts using OpenZeppelin and custom solutions.',
    category: 'Best Practices',
    difficulty: 'beginner',
    severity: 'high',
    tags: ['Access Control', 'OpenZeppelin', 'Security'],
    readTime: '6 min read',
    date: 'Dec 5, 2024',
  },
];

// Sample data - Recent Case Studies
const recentCaseStudies: CaseStudy[] = [
  {
    slug: 'euler-finance-2023',
    title: 'The $197M Flash Loan Exploit',
    protocol: 'Euler Finance',
    chain: 'Ethereum',
    date: 'Mar 2023',
    lostAmount: '$197M',
    vulnerability: 'Donation Attack + Flash Loan',
    description: 'Analysis of how a vulnerability in the donation function combined with flash loans led to one of the largest DeFi hacks.',
    tags: ['Flash Loan', 'Donation Attack', 'Lending Protocol'],
  },
  {
    slug: 'curve-finance-2023',
    title: 'Vyper Compiler Vulnerability',
    protocol: 'Curve Finance',
    chain: 'Ethereum',
    date: 'Jul 2023',
    lostAmount: '$70M',
    vulnerability: 'Reentrancy (Compiler Bug)',
    description: 'How a bug in the Vyper compiler reentrancy lock led to multiple pool exploits across Curve Finance.',
    tags: ['Reentrancy', 'Compiler Bug', 'Vyper'],
  },
];

export default function LearnPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lime-400/10 via-transparent to-transparent border border-lime-400/20 p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-semibold text-lime-400 bg-lime-400/20 rounded-full">
                🎓 Learning Center
              </span>
              <span className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full">
                by Hexific
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-lime-400 via-lime-300 to-white bg-clip-text text-transparent">
                HexiLearn
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 max-w-2xl">
              Master smart contract security with comprehensive guides, real-world case studies, and expert best practices.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                href="/learn/vulnerabilities"
                className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href="/learn/case-studies"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard icon="📚" label="Articles" value="20+" />
          <StatsCard icon="🔍" label="Case Studies" value="15+" />
          <StatsCard icon="🔓" label="Vulnerabilities Covered" value="12" />
          <StatsCard icon="💰" label="Hacks Analyzed" value="$2B+" />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <SectionHeader 
          title="Explore Topics" 
          description="Choose a category to start your learning journey"
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🔓"
            title="Vulnerabilities"
            description="Learn about common smart contract vulnerabilities, how they work, and how to prevent them."
            href="/learn/vulnerabilities"
            count={12}
          />
          <FeatureCard
            icon="🔍"
            title="Case Studies"
            description="Analyze real-world hacks and exploits with detailed breakdowns of what went wrong."
            href="/learn/case-studies"
            count={8}
          />
          <FeatureCard
            icon="✅"
            title="Best Practices"
            description="Secure coding patterns, audit preparation, and proven security strategies."
            href="/learn/best-practices"
            count={10}
          />
          <FeatureCard
            icon="📖"
            title="Glossary"
            description="Comprehensive dictionary of Web3 security terms and concepts."
            href="/learn/glossary"
          />
          <FeatureCard
            icon="📋"
            title="Security Checklist"
            description="Pre-deployment checklist to ensure your smart contracts are audit-ready."
            href="/learn/checklist"
          />
          <FeatureCard
            icon="🛠️"
            title="Tools & Resources"
            description="Recommended security tools, frameworks, and external resources."
            href="/learn/resources"
          />
        </div>
      </section>

      {/* Featured Articles */}
      <section className="mb-16">
        <SectionHeader 
          title="Featured Articles" 
          description="Hand-picked articles to get you started"
          action={{ label: 'View all articles', href: '/learn/vulnerabilities' }}
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} basePath="/learn/vulnerabilities" />
          ))}
        </div>
      </section>

      {/* Recent Case Studies */}
      <section className="mb-16">
        <SectionHeader 
          title="Latest Hack Analysis" 
          description="Understanding what went wrong in major protocol exploits"
          action={{ label: 'View all case studies', href: '/learn/case-studies' }}
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          {recentCaseStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-lime-400/20 to-lime-500/10 border border-lime-400/30 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Secure Your Protocol?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Learning is great, but professional audits provide an extra layer of security. 
              Let Hexific's experts review your smart contracts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors"
              >
                Get a Free Audit
              </Link>
              <Link
                href="/manual-audit"
                className="px-8 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                Request Manual Audit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
