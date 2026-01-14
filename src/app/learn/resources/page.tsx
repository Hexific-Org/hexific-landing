'use client';

import { Breadcrumb } from '@/components/learn/LearnComponents';
import '../styles.css';

// Resources data
const tools = [
  {
    name: 'Slither',
    description: 'Static analysis framework for Solidity. Detects vulnerabilities, code optimization opportunities, and code quality issues.',
    url: 'https://github.com/crytic/slither',
    category: 'Static Analysis',
    icon: '🔍',
  },
  {
    name: 'Mythril',
    description: 'Security analysis tool for EVM bytecode using symbolic execution, SMT solving, and taint analysis.',
    url: 'https://github.com/ConsenSys/mythril',
    category: 'Static Analysis',
    icon: '🔮',
  },
  {
    name: 'Echidna',
    description: 'Ethereum smart contract fuzzer for property-based testing.',
    url: 'https://github.com/crytic/echidna',
    category: 'Fuzzing',
    icon: '🦔',
  },
  {
    name: 'Foundry',
    description: 'Blazing fast, portable, and modular toolkit for Ethereum application development.',
    url: 'https://github.com/foundry-rs/foundry',
    category: 'Development',
    icon: '🔨',
  },
  {
    name: 'Hardhat',
    description: 'Ethereum development environment for professionals with debugging and testing features.',
    url: 'https://hardhat.org/',
    category: 'Development',
    icon: '👷',
  },
  {
    name: 'OpenZeppelin Contracts',
    description: 'Library of secure, reusable, and community-audited smart contracts.',
    url: 'https://github.com/OpenZeppelin/openzeppelin-contracts',
    category: 'Libraries',
    icon: '🛡️',
  },
  {
    name: 'Solmate',
    description: 'Gas-optimized building blocks for smart contract development.',
    url: 'https://github.com/transmissions11/solmate',
    category: 'Libraries',
    icon: '⚡',
  },
  {
    name: 'Tenderly',
    description: 'Web3 development platform with debugging, monitoring, and alerting.',
    url: 'https://tenderly.co/',
    category: 'Monitoring',
    icon: '📊',
  },
];

const learningResources = [
  {
    name: 'Damn Vulnerable DeFi',
    description: 'Wargame to learn offensive security of DeFi smart contracts.',
    url: 'https://www.damnvulnerabledefi.xyz/',
    category: 'CTF',
    icon: '🎮',
  },
  {
    name: 'Ethernaut',
    description: 'Web3/Solidity based wargame by OpenZeppelin.',
    url: 'https://ethernaut.openzeppelin.com/',
    category: 'CTF',
    icon: '🎯',
  },
  {
    name: 'Capture The Ether',
    description: 'Game that teaches Ethereum smart contract security.',
    url: 'https://capturetheether.com/',
    category: 'CTF',
    icon: '🏴',
  },
  {
    name: 'Secureum',
    description: 'Free smart contract security bootcamp and resources.',
    url: 'https://secureum.xyz/',
    category: 'Course',
    icon: '🎓',
  },
  {
    name: 'Smart Contract Programmer',
    description: 'YouTube channel with Solidity tutorials and DeFi explanations.',
    url: 'https://www.youtube.com/@smartcontractprogrammer',
    category: 'Video',
    icon: '📺',
  },
  {
    name: 'Solidity by Example',
    description: 'Learn Solidity by following examples.',
    url: 'https://solidity-by-example.org/',
    category: 'Tutorial',
    icon: '📝',
  },
];

const auditReports = [
  {
    name: 'Solodit',
    description: 'Aggregated database of smart contract audit reports and findings.',
    url: 'https://solodit.xyz/',
    icon: '📑',
  },
  {
    name: 'Code4rena',
    description: 'Competitive audit platform with public reports.',
    url: 'https://code4rena.com/',
    icon: '🏟️',
  },
  {
    name: 'Sherlock',
    description: 'DeFi security contests and audit reports.',
    url: 'https://www.sherlock.xyz/',
    icon: '🔎',
  },
  {
    name: 'Cantina',
    description: 'Security research marketplace with public findings.',
    url: 'https://cantina.xyz/',
    icon: '🍷',
  },
];

const communities = [
  {
    name: 'Ethereum Security',
    description: 'Discord community focused on Ethereum security.',
    url: 'https://discord.gg/5v8v3X9Qhf',
    platform: 'Discord',
    icon: '💬',
  },
  {
    name: 'r/ethdev',
    description: 'Ethereum development subreddit.',
    url: 'https://reddit.com/r/ethdev',
    platform: 'Reddit',
    icon: '🤖',
  },
  {
    name: 'DeFi Security 101',
    description: 'Telegram group for DeFi security discussions.',
    url: 'https://t.me/hexific',
    platform: 'Telegram',
    icon: '✈️',
  },
];

export default function ResourcesPage() {
  return (
    <div>
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Resources' },
      ]} />

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          🛠️ Tools & Resources
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Curated collection of security tools, learning platforms, and communities 
          to help you build and audit secure smart contracts.
        </p>
      </div>

      {/* Security Tools */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🔧</span> Security Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{tool.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors">
                      {tool.name}
                    </h3>
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{tool.description}</p>
                  <span className="text-xs text-lime-400/70 bg-lime-400/10 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Learning Platforms */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📚</span> Learning Platforms
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningResources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{resource.icon}</span>
                <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                  {resource.category}
                </span>
              </div>
              <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors mb-2">
                {resource.name}
              </h3>
              <p className="text-sm text-gray-400">{resource.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Audit Reports */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>📑</span> Audit Report Databases
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {auditReports.map((report) => (
            <a
              key={report.name}
              href={report.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all"
            >
              <span className="text-3xl">{report.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors">
                  {report.name}
                </h3>
                <p className="text-sm text-gray-400">{report.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-500 group-hover:text-lime-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ))}
        </div>
      </section>

      {/* Communities */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>👥</span> Communities
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {communities.map((community) => (
            <a
              key={community.name}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all text-center"
            >
              <span className="text-3xl block mb-3">{community.icon}</span>
              <h3 className="font-semibold text-white group-hover:text-lime-400 transition-colors mb-1">
                {community.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2">{community.platform}</p>
              <p className="text-sm text-gray-400">{community.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Hexific CTA */}
      <section>
        <div className="p-8 rounded-2xl bg-gradient-to-br from-lime-400/10 via-transparent to-green-500/5 border border-lime-400/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Professional Security Review?
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            While tools are great for initial checks, professional audits catch vulnerabilities 
            that automated tools miss. Get your smart contracts reviewed by Hexific experts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors"
            >
              Get Free AI Audit
            </a>
            <a
              href="/manual-audit"
              className="px-6 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              Request Manual Audit
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
