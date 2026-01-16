'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import {
  DollarSign,
  Lock,
  AlertTriangle,
  AlertOctagon,
  Lightbulb,
  CheckCircle,
  X,
  Check,
  Link2
} from 'lucide-react';

// Types
export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  severity?: 'critical' | 'high' | 'medium' | 'low' | 'info';
  tags: string[];
  readTime: string;
  date: string;
  author?: string;
  featured?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  protocol: string;
  chain: string;
  date: string;
  lostAmount: string;
  vulnerability: string;
  description: string;
  tags: string[];
}

// Article Card Component
export function ArticleCard({ article, basePath }: { article: Article; basePath: string }) {
  const difficultyColors = {
    beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  const severityColors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <Link href={`${basePath}/${article.slug}`}>
      <article className="article-card group p-6 rounded-2xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${difficultyColors[article.difficulty]}`}>
              {article.difficulty}
            </span>
            {article.severity && (
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${severityColors[article.severity]}`}>
                {article.severity}
              </span>
            )}
          </div>
          {article.featured && (
            <span className="text-lime-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-white group-hover:text-lime-400 transition-colors mb-2">
          {article.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs text-lime-400/70 bg-lime-400/10 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime}
          </span>
          <span>{article.date}</span>
        </div>
      </article>
    </Link>
  );
}

// Case Study Card Component
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/learn/case-studies/${study.slug}`}>
      <article className="article-card group p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20 hover:border-red-500/40 transition-all duration-300">
        {/* Lost Amount Badge */}
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 text-sm font-bold text-red-400 bg-red-500/20 rounded-full border border-red-500/30 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4" />
            {study.lostAmount} Lost
          </span>
          <span className="text-xs text-gray-500">{study.date}</span>
        </div>

        {/* Protocol & Chain */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
            {getChainIcon(study.chain)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
              {study.protocol}
            </h3>
            <p className="text-xs text-gray-500">{study.chain}</p>
          </div>
        </div>

        {/* Title */}
        <p className="text-gray-300 font-medium mb-2">{study.title}</p>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{study.description}</p>

        {/* Vulnerability Type */}
        <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg mb-4">
          <Lock className="w-4 h-4 text-red-400" />
          <span className="text-sm text-gray-300">{study.vulnerability}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs text-orange-400/70 bg-orange-400/10 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}

// Feature Card for homepage
export function FeatureCard({
  icon,
  title,
  description,
  href,
  count
}: {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  count?: number;
}) {
  return (
    <Link href={href}>
      <div className="group p-6 rounded-2xl bg-white/[0.02] border border-lime-400/10 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-lime-400/10 flex items-center justify-center text-lime-400">
            {icon}
          </div>
          {count !== undefined && (
            <span className="px-2 py-1 text-xs font-semibold text-lime-400 bg-lime-400/20 rounded-full">
              {count} articles
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-lime-400 transition-colors mb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm">{description}</p>
        <div className="mt-4 flex items-center text-lime-400 text-sm font-medium">
          <span>Explore</span>
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

// Section Header
export function SectionHeader({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        {description && (
          <p className="text-gray-400">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="flex items-center gap-2 text-lime-400 hover:text-lime-300 font-medium transition-colors"
        >
          {action.label}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      )}
    </div>
  );
}

// Breadcrumb Component
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {item.href ? (
            <Link href={item.href} className="hover:text-lime-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Alert/Callout Box
export function AlertBox({
  type,
  title,
  children
}: {
  type: 'warning' | 'danger' | 'info' | 'success';
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    warning: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
      titleColor: 'text-yellow-400',
    },
    danger: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: <AlertOctagon className="w-5 h-5 text-red-400" />,
      titleColor: 'text-red-400',
    },
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Lightbulb className="w-5 h-5 text-blue-400" />,
      titleColor: 'text-blue-400',
    },
    success: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />,
      titleColor: 'text-green-400',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-4 my-6`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">{style.icon}</div>
        <div>
          {title && (
            <h4 className={`font-semibold ${style.titleColor} mb-1`}>{title}</h4>
          )}
          <div className="text-gray-300 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

// Code Comparison Component
export function CodeComparison({
  vulnerable,
  secure,
}: {
  vulnerable: { title: string; code: string };
  secure: { title: string; code: string };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <div className="learn-code-block code-vulnerable rounded-xl overflow-hidden border border-red-500/30">
        <div className="learn-code-header bg-red-500/10 px-4 py-2 flex items-center gap-2">
          <X className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium text-red-400">{vulnerable.title}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono">{vulnerable.code}</code>
        </pre>
      </div>

      <div className="learn-code-block code-secure rounded-xl overflow-hidden border border-green-500/30">
        <div className="learn-code-header bg-green-500/10 px-4 py-2 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">{secure.title}</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono">{secure.code}</code>
        </pre>
      </div>
    </div>
  );
}

// Stats Card
export function StatsCard({
  label,
  value,
  trend,
  icon
}: {
  label: string;
  value: string;
  trend?: { value: string; positive: boolean };
  icon: ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-lime-400/10">
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 rounded-lg bg-lime-400/10 flex items-center justify-center text-lime-400">
          {icon}
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}

// Difficulty Filter
export function DifficultyFilter({
  selected,
  onChange
}: {
  selected: string | null;
  onChange: (value: string | null) => void;
}) {
  const difficulties = [
    { value: 'beginner', label: 'Beginner', color: 'green' },
    { value: 'intermediate', label: 'Intermediate', color: 'yellow' },
    { value: 'advanced', label: 'Advanced', color: 'red' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${selected === null
          ? 'bg-lime-400/20 border-lime-400/50 text-lime-400'
          : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
          }`}
      >
        All Levels
      </button>
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onChange(diff.value)}
          className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${selected === diff.value
            ? `bg-${diff.color}-500/20 border-${diff.color}-500/50 text-${diff.color}-400`
            : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
            }`}
        >
          {diff.label}
        </button>
      ))}
    </div>
  );
}

// Helper function for chain icon
function getChainIcon(chain: string): ReactNode {
  // Using simple SVG icons for different chains
  const iconClass = "w-5 h-5";

  switch (chain) {
    case 'Ethereum':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5L4.5 12.75L12 16.5L19.5 12.75L12 1.5Z" className="text-blue-400" />
          <path d="M12 17.25L4.5 13.5L12 22.5L19.5 13.5L12 17.25Z" className="text-blue-300" />
        </svg>
      );
    case 'Solana':
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 17.5h13l3-3H7l-3 3zm0-5.5h13l3-3H7l-3 3zm0-5.5h13l3-3H7l-3 3z" className="text-purple-400" />
        </svg>
      );
    default:
      return <Link2 className={`${iconClass} text-gray-400`} />;
  }
}

// Empty State Component
export function EmptyState({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-lime-400/10 flex items-center justify-center text-lime-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  );
}
