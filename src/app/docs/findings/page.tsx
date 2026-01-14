'use client';

import React from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'severity-levels', label: 'Severity Levels' },
    { id: 'reading-report', label: 'Reading Your Report' },
];

export default function FindingsPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Understanding Findings
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Learn how to interpret security findings and severity levels in your audit report.
                </p>

                {/* Severity Levels */}
                <section id="severity-levels" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Severity Levels
                    </h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                        Hexific categorizes security findings by severity to help you prioritize fixes.
                        Higher severity issues should be addressed first.
                    </p>

                    {/* Severity cards */}
                    <div className="space-y-3">
                        <div className="border-l-4 border-red-500 bg-red-950/20 pl-4 py-3 rounded-r">
                            <h3 className="text-red-500 font-semibold">Critical</h3>
                            <p className="text-gray-300 text-sm">Severe vulnerabilities — loss of funds, contract takeover. <span className="text-red-400">Fix immediately.</span></p>
                        </div>
                        <div className="border-l-4 border-red-400 bg-red-950/10 pl-4 py-3 rounded-r">
                            <h3 className="text-red-400 font-semibold">Major</h3>
                            <p className="text-gray-300 text-sm">High-risk issues exploitable under certain conditions. <span className="text-red-400">Fix before mainnet.</span></p>
                        </div>
                        <div className="border-l-4 border-orange-500 bg-orange-950/20 pl-4 py-3 rounded-r">
                            <h3 className="text-orange-400 font-semibold">Medium</h3>
                            <p className="text-gray-300 text-sm">Important issues with limited exploitability. <span className="text-orange-400">Recommended to fix.</span></p>
                        </div>
                        <div className="border-l-4 border-yellow-500 bg-yellow-950/20 pl-4 py-3 rounded-r">
                            <h3 className="text-yellow-400 font-semibold">Minor</h3>
                            <p className="text-gray-300 text-sm">Low-risk issues, harder to exploit. <span className="text-yellow-400">Good practice to fix.</span></p>
                        </div>
                        <div className="border-l-4 border-blue-500 bg-blue-950/20 pl-4 py-3 rounded-r">
                            <h3 className="text-blue-400 font-semibold">Informational</h3>
                            <p className="text-gray-300 text-sm">Code quality suggestions, no security risk. <span className="text-blue-400">Optional improvements.</span></p>
                        </div>
                        <div className="border-l-4 border-lime-500 bg-lime-950/20 pl-4 py-3 rounded-r">
                            <h3 className="text-lime-400 font-semibold">Optimization</h3>
                            <p className="text-gray-300 text-sm">Gas optimization opportunities. <span className="text-lime-400">Implement if gas costs matter.</span></p>
                        </div>
                    </div>
                </section>

                {/* Reading Your Report */}
                <section id="reading-report" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Reading Your Report
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Each finding in your report includes:
                    </p>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                        <li><strong className="text-white">Title</strong> — Brief description of the issue</li>
                        <li><strong className="text-white">Severity</strong> — Risk level (Critical to Optimization)</li>
                        <li><strong className="text-white">Location</strong> — File and line number where the issue occurs</li>
                        <li><strong className="text-white">Description</strong> — Detailed explanation of the vulnerability</li>
                        <li><strong className="text-white">Code Snippet</strong> — Relevant source code for context</li>
                    </ul>
                </section>
            </article>
        </DocsLayout>
    );
}
