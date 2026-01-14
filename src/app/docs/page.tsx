'use client';

import React from 'react';
import Link from 'next/link';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How It Works' },
];

export default function DocsPage() {
  return (
    <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
      <article className="max-w-none">
        {/* Title */}
        <h1 className="text-4xl text-white font-bold mb-4">
          What is Hexific?
        </h1>
        <p className="text-xl text-gray-400 mb-12 leading-relaxed">
          Hexific is a free automated security audit platform for smart contracts.
        </p>

        {/* Overview */}
        <section id="overview" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
            Overview
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Hexific provides instant, automated security analysis for Solidity smart contracts.
            Upload your code or enter a contract address, and get a comprehensive security report
            powered by industry-leading static analysis tools.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Whether you're a solo developer building your first DeFi protocol or an established
            team preparing for mainnet deployment, Hexific helps you identify vulnerabilities
            before they become exploits.
          </p>

          <h3 className="text-lg text-white font-semibold mb-3">Key Features</h3>
          <ul className="text-gray-300 space-y-2 mb-6 list-disc list-inside">
            <li><strong className="text-white">Free Audits</strong> — Unlimited automated security analysis at no cost</li>
            <li><strong className="text-white">Hexific AI</strong> — Optional AI acceleration for enhanced analysis (paid)</li>
            <li><strong className="text-white">Fast Results</strong> — Get your audit report in under 5 minutes</li>
            <li><strong className="text-white">Multiple Input Methods</strong> — Upload .sol/.zip files or audit by contract address</li>
            <li><strong className="text-white">PDF Reports</strong> — Download professional audit reports for your records</li>
            <li><strong className="text-white">Privacy First</strong> — Your code is deleted immediately after analysis</li>
          </ul>
        </section>

        {/* How it Works - Cards */}
        <section id="how-it-works" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl text-white font-bold mb-6 pb-2 border-b border-gray-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
              <div className="text-2xl text-lime-400 font-bold mb-2">1</div>
              <h3 className="text-white font-semibold mb-1">Upload</h3>
              <p className="text-gray-400 text-sm">
                Upload your Solidity file, ZIP archive, or enter a verified contract address.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
              <div className="text-2xl text-lime-400 font-bold mb-2">2</div>
              <h3 className="text-white font-semibold mb-1">Analyze</h3>
              <p className="text-gray-400 text-sm">
                Hexific runs comprehensive security checks using Slither and other analysis tools.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
              <div className="text-2xl text-lime-400 font-bold mb-2">3</div>
              <h3 className="text-white font-semibold mb-1">Review</h3>
              <p className="text-gray-400 text-sm">
                Get a detailed report with findings categorized by severity level.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <p className="text-gray-400 mb-4">Ready to get started?</p>
          <div className="flex gap-4">
            <Link href="/docs/services" className="text-lime-400 hover:underline">
              Compare Services →
            </Link>
            <Link href="/" className="text-lime-400 hover:underline">
              Start Free Audit →
            </Link>
          </div>
        </div>
      </article>
    </DocsLayout>
  );
}