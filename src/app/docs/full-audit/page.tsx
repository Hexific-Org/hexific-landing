'use client';

import React from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'audit-process', label: 'Audit Process' },
    { id: 'pricing', label: 'Pricing' },
];

export default function FullAuditPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Full Audit <span className="text-lime-400 text-lg font-normal ml-2">Premium</span>
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Comprehensive manual security review by experienced auditors.
                </p>

                {/* Overview */}
                <section id="overview" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Overview
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Full Audit provides a comprehensive manual security review by our team of experienced
                        smart contract auditors. This service is recommended for projects preparing for mainnet
                        deployment, especially those handling significant user funds.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">What's Included</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>Everything in Fast Audit</li>
                                <li>Manual expert code review</li>
                                <li>Business logic analysis</li>
                                <li>Architecture review</li>
                                <li>Detailed remediation guidance</li>
                                <li>Re-audit after fixes (1 round)</li>
                                <li>Official audit certificate</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">Ideal For</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>Mainnet deployments</li>
                                <li>DeFi protocols</li>
                                <li>NFT marketplaces</li>
                                <li>Token contracts</li>
                                <li>Projects seeking investor confidence</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Audit Process - Steps */}
                <section id="audit-process" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-6 pb-2 border-b border-gray-800">
                        Audit Process
                    </h2>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-sm">1</div>
                            <div>
                                <h3 className="text-white font-semibold">Initial Review</h3>
                                <p className="text-gray-400 text-sm">We review your codebase scope, documentation, and requirements to provide a quote.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-sm">2</div>
                            <div>
                                <h3 className="text-white font-semibold">Comprehensive Analysis</h3>
                                <p className="text-gray-400 text-sm">Deep manual review combined with automated tools. Timeline: 1-2 weeks.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-sm">3</div>
                            <div>
                                <h3 className="text-white font-semibold">Report Delivery</h3>
                                <p className="text-gray-400 text-sm">Detailed report with all findings, risk assessments, and remediation recommendations.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-sm">4</div>
                            <div>
                                <h3 className="text-white font-semibold">Fix & Re-audit</h3>
                                <p className="text-gray-400 text-sm">Implement fixes and we'll re-audit to verify all issues are resolved.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-sm">5</div>
                            <div>
                                <h3 className="text-white font-semibold">Certification</h3>
                                <p className="text-gray-400 text-sm">Official audit certificate to share with your community and investors.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Pricing
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Full Audit pricing is based on:
                    </p>
                    <ul className="text-gray-300 space-y-1 mb-4 list-disc list-inside">
                        <li>Lines of code (nSLOC)</li>
                        <li>Contract complexity</li>
                        <li>Timeline requirements</li>
                    </ul>
                    <p className="text-gray-400">
                        Contact us for a custom quote based on your project.
                    </p>
                </section>

                {/* CTA */}
                <div className="border-t border-gray-800 pt-8 mt-12">
                    <p className="text-gray-300 mb-4">Ready to get a comprehensive security review?</p>
                    <a href="mailto:admin@hexific.com?subject=Full Audit Request" className="text-lime-400 hover:underline">
                        Contact Us →
                    </a>
                </div>
            </article>
        </DocsLayout>
    );
}
