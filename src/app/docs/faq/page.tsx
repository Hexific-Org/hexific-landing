'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'general', label: 'General' },
    { id: 'technical', label: 'Technical' },
    { id: 'ai', label: 'AI & HexiChat' },
    { id: 'payment', label: 'Payment' },
];

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: React.ReactNode; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-800 last:border-0">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex justify-between items-center text-left group">
                <span className="font-medium text-white group-hover:text-lime-400 transition-colors">{question}</span>
                <span className={`text-lime-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="pb-4 text-gray-300 text-sm leading-relaxed">{answer}</div>}
        </div>
    );
}

export default function FAQPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Frequently Asked Questions
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Find answers to common questions about Hexific.
                </p>

                {/* General */}
                <section id="general" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        General Questions
                    </h2>
                    <div>
                        <FAQItem
                            question="Is Hexific really free?"
                            defaultOpen={true}
                            answer={
                                <>
                                    <p>Yes! Fast Audit without AI acceleration is <strong className="text-white">completely free and unlimited</strong>.</p>
                                    <p className="mt-2">Hexific AI acceleration is a paid feature that enhances your audit with AI-powered analysis.</p>
                                </>
                            }
                        />
                        <FAQItem
                            question="How accurate is the automated audit?"
                            answer={
                                <>
                                    <p>Slither catches approximately <strong className="text-lime-400">80% of common vulnerabilities</strong>. For high-value protocols (&gt;$1M TVL), we recommend professional manual audits in addition to automated scanning.</p>
                                </>
                            }
                        />
                        <FAQItem
                            question="What happens to my code after I upload it?"
                            answer={
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Analyzed in isolated Docker containers</li>
                                    <li>Automatically deleted within minutes</li>
                                    <li>Never stored on our servers</li>
                                    <li>Never shared with third parties</li>
                                    <li>Never used to train AI models</li>
                                </ul>
                            }
                        />
                        <FAQItem
                            question="What Solidity versions do you support?"
                            answer={<p>We support Solidity versions <strong className="text-lime-400">0.4.x through 0.8.x</strong>. The system automatically detects your compiler version.</p>}
                        />
                    </div>
                </section>

                {/* Technical */}
                <section id="technical" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Technical Questions
                    </h2>
                    <div>
                        <FAQItem
                            question="Does this work with Hardhat projects?"
                            answer={
                                <>
                                    <p>Slither works best with <strong className="text-lime-400">Foundry projects</strong>. For Hardhat, we recommend converting to Foundry structure or ensuring you have proper compilation artifacts in your ZIP.</p>
                                </>
                            }
                        />
                        <FAQItem
                            question="My audit is taking a long time..."
                            answer={
                                <ul className="space-y-1 list-disc list-inside">
                                    <li>Small contracts (&lt;100 lines): 30 seconds - 1 minute</li>
                                    <li>Medium projects (100-500 lines): 1-3 minutes</li>
                                    <li>Large projects (1000+ lines): 3-5 minutes</li>
                                    <li className="text-red-400">If stuck for more than 10 minutes, contact admin@hexific.com</li>
                                </ul>
                            }
                        />
                        <FAQItem
                            question="Can I use this in my CI/CD pipeline?"
                            answer={<p>API access for CI/CD integration is <strong className="text-lime-400">coming soon</strong>! Join our waitlist: admin@hexific.com</p>}
                        />
                        <FAQItem
                            question="What file size limits do you have?"
                            answer={
                                <>
                                    <p><strong className="text-lime-400">Maximum: 100MB</strong></p>
                                    <p className="mt-2">Tips: Remove node_modules, exclude test files, don't include build artifacts.</p>
                                </>
                            }
                        />
                    </div>
                </section>

                {/* AI */}
                <section id="ai" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        AI & HexiChat
                    </h2>
                    <div>
                        <FAQItem
                            question="What is HexiChat?"
                            answer={
                                <>
                                    <p><strong className="text-white">HexiChat</strong> is our upcoming AI assistant for smart contract development (coming soon).</p>
                                    <p className="mt-2">It will provide:</p>
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        <li>Remediation suggestions</li>
                                        <li>Code improvement recommendations</li>
                                        <li>Interactive security Q&A</li>
                                        <li>Detailed vulnerability explanations</li>
                                    </ul>
                                </>
                            }
                        />
                        <FAQItem
                            question="Does Fast Audit include remediation suggestions?"
                            answer={
                                <>
                                    <p><strong className="text-white">No.</strong> Fast Audit is pure vulnerability detection only — no remediation or code improvement recommendations.</p>
                                    <p className="mt-2">For remediations and recommendations, use <strong className="text-lime-400">HexiChat</strong> (coming soon).</p>
                                </>
                            }
                        />
                        <FAQItem
                            question="How does Hexific AI acceleration work?"
                            answer={<p>Hexific AI enhances your audit with AI-powered vulnerability analysis, providing deeper code analysis and more comprehensive findings. It does <em>not</em> include remediation suggestions — that's what HexiChat is for.</p>}
                        />
                    </div>
                </section>

                {/* Payment */}
                <section id="payment" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Payment & Billing
                    </h2>
                    <div>
                        <FAQItem
                            question="Why do I need to connect a wallet?"
                            answer={
                                <>
                                    <p>Wallet connection is <strong className="text-lime-400">only required for paid features</strong> (Hexific AI, Full Audit, HexiChat).</p>
                                    <p className="mt-2">Benefits: No account creation, fully anonymous, instant verification, Web3-native experience.</p>
                                </>
                            }
                        />
                        <FAQItem
                            question="Is this on mainnet or testnet?"
                            answer={<p><strong className="text-lime-400">Live on Base Mainnet!</strong> Payments are processed with real USDC on Base network.</p>}
                        />
                        <FAQItem
                            question="Can I get a refund?"
                            answer={<p>Payments are <strong className="text-red-400">non-refundable</strong> as processing happens instantly. Use the free tier first to test the service.</p>}
                        />
                        <FAQItem
                            question="What payment methods do you accept?"
                            answer={
                                <>
                                    <p><strong className="text-white">Current:</strong> Crypto payments via wallet connection (SOL on Solana)</p>
                                    <p className="mt-2"><strong className="text-gray-400">Coming soon:</strong> Credit card, Apple Pay, Google Pay</p>
                                </>
                            }
                        />
                    </div>
                </section>

                {/* CTA */}
                <div className="border-t border-gray-800 pt-8 mt-12">
                    <p className="text-gray-300 mb-4">Still have questions?</p>
                    <div className="flex gap-4">
                        <a href="mailto:admin@hexific.com" className="text-lime-400 hover:underline">
                            Email Support →
                        </a>
                        <Link href="/docs" className="text-lime-400 hover:underline">
                            Read Documentation →
                        </Link>
                    </div>
                </div>
            </article>
        </DocsLayout>
    );
}
