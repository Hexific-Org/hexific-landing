'use client';

import React from 'react';
import Link from 'next/link';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'how-to-use', label: 'How to Use' },
    { id: 'ai-acceleration', label: 'AI Acceleration' },
    { id: 'tips', label: 'Tips for Better Audits' },
    { id: 'file-requirements', label: 'File Requirements' },
];

export default function FastAuditPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Fast Audit
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Instant automated security analysis for your smart contracts.
                </p>

                {/* Overview */}
                <section id="overview" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Overview
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Fast Audit provides instant automated security analysis powered by Slither,
                        a leading static analysis framework for Solidity. Get comprehensive vulnerability
                        detection in under 5 minutes.
                    </p>

                    {/* Pricing callout */}
                    <div className="border-l-4 border-lime-400 bg-lime-950/20 pl-4 py-3 rounded-r mb-6">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-lime-400">Pricing:</strong> Fast Audit is <strong className="text-white">free</strong> without AI acceleration.
                            Enable <strong className="text-white">Hexific AI</strong> for enhanced analysis (paid).
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">What's Included</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>Vulnerability detection (70+ detectors)</li>
                                <li>Severity categorization</li>
                                <li>Code location pinpointing</li>
                                <li>PDF report download</li>
                                <li>Unlimited free audits (without AI)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">Supported Inputs</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>Single .sol files</li>
                                <li>ZIP archives (Foundry/Hardhat)</li>
                                <li>Verified contract addresses</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* How to Use */}
                <section id="how-to-use" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        How to Use
                    </h2>

                    <h3 className="text-lg text-white font-semibold mb-2">Option A: Upload Your Contract</h3>
                    <ol className="text-gray-300 space-y-1 mb-4 list-decimal list-inside">
                        <li>Go to <Link href="/" className="text-lime-400 hover:underline">hexific.com</Link></li>
                        <li>Drag and drop your .sol file or ZIP archive</li>
                        <li>Choose whether to enable Hexific AI acceleration (optional, paid)</li>
                        <li>Click "Start Audit"</li>
                        <li>Wait for results (typically 30 seconds to 5 minutes)</li>
                    </ol>

                    {/* Code callout */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 mb-6">
                        <p className="text-gray-500 text-xs mb-1">For Foundry/Hardhat projects:</p>
                        <code className="text-lime-400 text-sm">zip -r my-project.zip src/ foundry.toml lib/</code>
                    </div>

                    <h3 className="text-lg text-white font-semibold mb-2">Option B: Audit by Address</h3>
                    <ol className="text-gray-300 space-y-1 mb-2 list-decimal list-inside">
                        <li>Go to <Link href="/" className="text-lime-400 hover:underline">hexific.com</Link></li>
                        <li>Switch to "Contract Address" mode</li>
                        <li>Enter the verified contract address</li>
                        <li>Choose whether to enable Hexific AI acceleration (optional, paid)</li>
                        <li>Click "Start Audit"</li>
                    </ol>
                    <p className="text-gray-500 text-sm">
                        <em>Note:</em> Contract must be verified on Etherscan. Ethereum mainnet only.
                    </p>
                </section>

                {/* AI Acceleration */}
                <section id="ai-acceleration" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Hexific AI Acceleration
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Hexific AI is an optional paid feature that enhances your audit with AI-powered analysis.
                        Fast Audit focuses on <strong className="text-white">pure vulnerability detection</strong> — no remediation suggestions.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Without AI */}
                        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-semibold">Without AI</h3>
                                <span className="bg-lime-400/20 text-lime-400 px-2 py-0.5 rounded text-xs font-medium">Free</span>
                            </div>
                            <ul className="text-gray-300 space-y-1 text-sm">
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Slither static analysis</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> 70+ vulnerability detectors</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Severity categorization</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> PDF report</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Unlimited audits</li>
                            </ul>
                        </div>

                        {/* With AI */}
                        <div className="bg-gray-900/50 rounded-xl border border-lime-400/30 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-white font-semibold">With Hexific AI</h3>
                                <span className="bg-lime-400 text-black px-2 py-0.5 rounded text-xs font-medium">Paid</span>
                            </div>
                            <ul className="text-gray-300 space-y-1 text-sm">
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Everything in free tier</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> AI-powered vulnerability analysis</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Enhanced detection accuracy</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> Deeper code analysis</li>
                                <li className="flex items-center"><span className="text-lime-400 mr-2">✓</span> More comprehensive findings</li>
                            </ul>
                        </div>
                    </div>

                    {/* HexiChat note */}
                    <div className="border-l-4 border-blue-400 bg-blue-950/20 pl-4 py-3 rounded-r mt-6">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-blue-400">Looking for recommendations?</strong> Fast Audit is pure audit only.
                            For remediation suggestions and code improvement recommendations, try <strong className="text-white">HexiChat</strong> — our AI assistant for smart contract development (coming soon).
                        </p>
                    </div>
                </section>

                {/* Tips */}
                <section id="tips" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Tips for Better Audits
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">Before Uploading</h3>
                            <ol className="text-gray-300 space-y-1 text-sm list-decimal list-inside">
                                <li>Remove test files and node_modules from ZIP</li>
                                <li>Keep file size under 100MB</li>
                                <li>Include lib/ folder for Foundry projects</li>
                                <li>Use a recent Solidity compiler version</li>
                            </ol>
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">After Getting Results</h3>
                            <ol className="text-gray-300 space-y-1 text-sm list-decimal list-inside">
                                <li>Fix Critical and Major issues first</li>
                                <li>Don't ignore Informational findings</li>
                                <li>Download and save the PDF report</li>
                                <li>Re-audit after making fixes</li>
                            </ol>
                        </div>
                    </div>
                </section>

                {/* File Requirements */}
                <section id="file-requirements" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        File Requirements
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">Accepted Formats</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>.sol (single Solidity file)</li>
                                <li>.zip (project archive)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg text-white font-semibold mb-2">Limits</h3>
                            <ul className="text-gray-300 space-y-1 text-sm list-disc list-inside">
                                <li>Maximum file size: 100MB</li>
                                <li>Solidity version: 0.4.0 - 0.8.x</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="border-t border-gray-800 pt-8 mt-12">
                    <Link href="/" className="text-lime-400 hover:underline">
                        Start Free Audit →
                    </Link>
                </div>
            </article>
        </DocsLayout>
    );
}
