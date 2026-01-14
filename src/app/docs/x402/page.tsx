'use client';

import React, { useState } from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const pageItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'comparison', label: 'Methods Comparison' },
    { id: 'prerequisites', label: 'Prerequisites' },
    { id: 'installation', label: 'Installation' },
    { id: 'zip-audit', label: 'ZIP Upload' },
    { id: 'address-audit', label: 'Address-Based' },
];

export default function X402Page() {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string): void => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const zipAuditCode = `import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";
import fs from 'fs';

const account = privateKeyToAccount("0xYourPrivateKey");
const fetchWithPayment = wrapFetchWithPayment(fetch, account);

const zipFile = fs.readFileSync('./my-contract.zip');
const formData = new FormData();
formData.append('file', new Blob([zipFile]), 'my-contract.zip');

const response = await fetchWithPayment('https://api.hexific.com/ai-audit-pro', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
console.log(result.detailed_audit);`;

    const addressAuditCode = `import { wrapFetchWithPayment } from "x402-fetch";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0xYourPrivateKey");
const fetchWithPayment = wrapFetchWithPayment(fetch, account);

const response = await fetchWithPayment('https://api.hexific.com/ai-audit-address', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contract_address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    network: "ethereum"
  }),
});

const result = await response.json();
console.log(result.detailed_audit);`;

    const customStyle = {
        background: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(55, 65, 81, 0.5)',
        borderRadius: '0.5rem',
        padding: '1rem',
        margin: 0,
        fontSize: '0.8rem',
    };

    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    x402 Payment Integration
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Seamless micropayments for AI-powered smart contract audits.
                </p>

                {/* Overview */}
                <section id="overview" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Overview
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Hexific offers two methods for professional AI-powered smart contract audits via x402 micropayments:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-5">
                            <h3 className="text-white font-semibold mb-2">ZIP Upload</h3>
                            <p className="text-lime-400 font-semibold text-sm mb-2">$0.10 USDC</p>
                            <ul className="text-gray-400 text-sm space-y-1">
                                <li>• Upload your Foundry/Hardhat project</li>
                                <li>• Supports unverified & private contracts</li>
                                <li>• Full Slither + Claude analysis</li>
                            </ul>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl border border-lime-400/30 p-5">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-white font-semibold">Address-Based</h3>
                                <span className="text-xs bg-lime-400/20 text-lime-400 px-2 py-0.5 rounded">50% CHEAPER</span>
                            </div>
                            <p className="text-lime-400 font-semibold text-sm mb-2">$0.05 USDC</p>
                            <ul className="text-gray-400 text-sm space-y-1">
                                <li>• Just provide contract address</li>
                                <li>• Auto-fetches from Etherscan</li>
                                <li>• Requires verified contract</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Comparison */}
                <section id="comparison" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Methods Comparison
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left py-3 text-white">Feature</th>
                                    <th className="text-center py-3 text-white">ZIP Upload</th>
                                    <th className="text-center py-3 text-white">Address-Based</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-300">
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Price</td>
                                    <td className="py-2 text-center text-lime-400">$0.10 USDC</td>
                                    <td className="py-2 text-center text-lime-400">$0.05 USDC</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">API Endpoint</td>
                                    <td className="py-2 text-center font-mono text-xs">/ai-audit-pro</td>
                                    <td className="py-2 text-center font-mono text-xs">/ai-audit-address</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Input</td>
                                    <td className="py-2 text-center">.zip file (FormData)</td>
                                    <td className="py-2 text-center">Contract address (JSON)</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Verified Required</td>
                                    <td className="py-2 text-center text-gray-500">No</td>
                                    <td className="py-2 text-center text-lime-400">Yes</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Private Contracts</td>
                                    <td className="py-2 text-center text-lime-400">Yes</td>
                                    <td className="py-2 text-center text-gray-500">No</td>
                                </tr>
                                <tr className="border-b border-gray-800">
                                    <td className="py-2">Networks</td>
                                    <td className="py-2 text-center">Any EVM</td>
                                    <td className="py-2 text-center">Ethereum (more coming)</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Best For</td>
                                    <td className="py-2 text-center">Pre-deployment audits</td>
                                    <td className="py-2 text-center">Deployed contracts</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Prerequisites */}
                <section id="prerequisites" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Prerequisites
                    </h2>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                        <li><strong className="text-white">Node.js & npm</strong> — Version 16.x or higher</li>
                        <li><strong className="text-white">Wallet with USDC on Base Sepolia</strong> — Get testnet USDC from <a href="https://faucet.circle.com" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline">Circle Faucet</a></li>
                        <li><strong className="text-white">Private Key</strong> — Store securely in environment variables</li>
                    </ul>
                </section>

                {/* Installation */}
                <section id="installation" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Installation
                    </h2>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                        <code className="text-lime-400 text-sm">npm install x402-fetch viem</code>
                    </div>
                </section>

                {/* ZIP Audit */}
                <section id="zip-audit" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        ZIP Upload Audit
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        <strong className="text-white">Endpoint:</strong> POST /ai-audit-pro • <strong className="text-lime-400">Price: $0.10 USDC</strong>
                    </p>

                    <h3 className="text-lg text-white font-semibold mb-2">When to use</h3>
                    <ul className="text-gray-300 space-y-1 mb-4 list-disc list-inside text-sm">
                        <li>Pre-deployment audits for private contracts</li>
                        <li>Projects not yet deployed on mainnet</li>
                        <li>Full Foundry/Hardhat project analysis</li>
                        <li>Contracts not verified on block explorers</li>
                    </ul>

                    <h3 className="text-lg text-white font-semibold mb-2">Example Code</h3>
                    <div className="relative group">
                        <button
                            onClick={() => copyToClipboard(zipAuditCode, 'zip')}
                            className="absolute top-2 right-2 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                        >
                            {copiedCode === 'zip' ? 'Copied!' : 'Copy'}
                        </button>
                        <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={customStyle}>
                            {zipAuditCode}
                        </SyntaxHighlighter>
                    </div>

                    {/* Requirements callout */}
                    <div className="border-l-4 border-yellow-500 bg-yellow-950/20 pl-4 py-3 rounded-r mt-4">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-yellow-400">ZIP Requirements:</strong> Max 100MB, must contain .sol files, include foundry.toml or hardhat.config.js for best results.
                        </p>
                    </div>
                </section>

                {/* Address Audit */}
                <section id="address-audit" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Address-Based Audit
                    </h2>
                    <p className="text-gray-400 text-sm mb-4">
                        <strong className="text-white">Endpoint:</strong> POST /ai-audit-address • <strong className="text-lime-400">Price: $0.05 USDC</strong>
                    </p>

                    <h3 className="text-lg text-white font-semibold mb-2">When to use</h3>
                    <ul className="text-gray-300 space-y-1 mb-4 list-disc list-inside text-sm">
                        <li>Auditing already-deployed contracts</li>
                        <li>Analyzing third-party contracts</li>
                        <li>Quick security checks on any verified contract</li>
                        <li>50% cheaper than ZIP upload!</li>
                    </ul>

                    <h3 className="text-lg text-white font-semibold mb-2">Example Code</h3>
                    <div className="relative group">
                        <button
                            onClick={() => copyToClipboard(addressAuditCode, 'address')}
                            className="absolute top-2 right-2 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
                        >
                            {copiedCode === 'address' ? 'Copied!' : 'Copy'}
                        </button>
                        <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={customStyle}>
                            {addressAuditCode}
                        </SyntaxHighlighter>
                    </div>

                    {/* Networks callout */}
                    <div className="border-l-4 border-lime-400 bg-lime-950/20 pl-4 py-3 rounded-r mt-4">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-lime-400">Supported Networks:</strong> Ethereum Mainnet (Base, Arbitrum, Polygon coming soon)
                        </p>
                    </div>
                </section>

                {/* Resources */}
                <div className="border-t border-gray-800 pt-8 mt-12">
                    <h3 className="text-lg text-white font-semibold mb-3">Resources</h3>
                    <div className="flex gap-4">
                        <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline text-sm">
                            x402 Protocol →
                        </a>
                        <a href="https://x402.gitbook.io/x402" target="_blank" rel="noopener noreferrer" className="text-lime-400 hover:underline text-sm">
                            x402 Documentation →
                        </a>
                    </div>
                </div>
            </article>
        </DocsLayout>
    );
}
