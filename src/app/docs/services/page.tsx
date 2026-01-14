'use client';

import React from 'react';
import Link from 'next/link';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'comparison', label: 'Service Comparison' },
    { id: 'which-to-choose', label: 'Which to Choose?' },
];

export default function ServicesPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Hexific Services
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Choose the right security audit service for your project needs.
                </p>

                {/* Service Comparison - Cards */}
                <section id="comparison" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-6 pb-2 border-b border-gray-800">
                        Service Comparison
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Fast Audit Card */}
                        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl text-white font-bold">Fast Audit</h3>
                                <span className="bg-lime-400/20 text-lime-400 px-2 py-0.5 rounded text-xs font-medium">Free / Paid</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Instant automated security analysis powered by Slither.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm mb-4">
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Results in under 5 minutes</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Free without AI acceleration</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> PDF report download</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Severity categorization</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">+</span> Hexific AI acceleration (paid)</li>
                            </ul>
                            <Link href="/docs/fast-audit" className="text-lime-400 text-sm hover:underline">
                                Learn more →
                            </Link>
                        </div>

                        {/* Full Audit Card */}
                        <div className="bg-gray-900/50 rounded-xl border border-lime-400/30 p-6">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl text-white font-bold">Full Audit</h3>
                                <span className="bg-lime-400 text-black px-2 py-0.5 rounded text-xs font-medium">Premium</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Comprehensive manual review by experienced auditors.
                            </p>
                            <ul className="text-gray-300 space-y-1 text-sm mb-4">
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Everything in Fast Audit</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Manual expert code review</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Business logic analysis</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Remediation guidance</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Audit certificate</li>
                            </ul>
                            <Link href="/docs/full-audit" className="text-lime-400 text-sm hover:underline">
                                Learn more →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Which to Choose - Article style */}
                <section id="which-to-choose" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Which Service Should I Choose?
                    </h2>

                    <h3 className="text-lg text-white font-semibold mb-2">Choose Fast Audit (Free) if you...</h3>
                    <ul className="text-gray-300 space-y-1 mb-6 list-disc list-inside">
                        <li>Are in active development and want quick feedback</li>
                        <li>Need to check for common vulnerabilities</li>
                        <li>Want to run multiple iterations during development</li>
                        <li>Are deploying to testnet first</li>
                    </ul>

                    <h3 className="text-lg text-white font-semibold mb-2">Choose Fast Audit + Hexific AI if you...</h3>
                    <ul className="text-gray-300 space-y-1 mb-6 list-disc list-inside">
                        <li>Want enhanced AI-powered vulnerability detection</li>
                        <li>Need deeper code analysis and more comprehensive findings</li>
                        <li>Are preparing for mainnet but want quick results</li>
                    </ul>

                    <h3 className="text-lg text-white font-semibold mb-2">Choose Full Audit if you...</h3>
                    <ul className="text-gray-300 space-y-1 mb-6 list-disc list-inside">
                        <li>Are preparing for mainnet deployment</li>
                        <li>Handle significant user funds</li>
                        <li>Need an audit certificate for investors/users</li>
                        <li>Have complex business logic that needs expert review</li>
                        <li>Want comprehensive security assurance</li>
                    </ul>
                </section>

                {/* CTA */}
                <div className="border-t border-gray-800 pt-8 mt-12">
                    <Link href="/" className="text-lime-400 hover:underline">
                        Start Free Audit Now →
                    </Link>
                </div>
            </article>
        </DocsLayout>
    );
}
