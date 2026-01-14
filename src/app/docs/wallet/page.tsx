'use client';

import React from 'react';
import { DocsLayout } from '@/components/DocsLayout';
import { OnThisPage } from '@/components/OnThisPage';

const pageItems = [
    { id: 'why-connect', label: 'Why Connect?' },
    { id: 'supported-wallets', label: 'Supported Wallets' },
    { id: 'how-to-connect', label: 'How to Connect' },
    { id: 'payment-info', label: 'Payment Information' },
];

export default function WalletPage() {
    return (
        <DocsLayout rightSidebar={<OnThisPage items={pageItems} />}>
            <article className="max-w-none">
                <h1 className="text-4xl text-white font-bold mb-4">
                    Wallet Connection
                </h1>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                    Connect your Solana wallet to access premium features and paid services.
                </p>

                {/* Why Connect */}
                <section id="why-connect" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Why Connect a Wallet?
                    </h2>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                        Connecting a wallet enables access to premium features and paid services on Hexific.
                        All payments are processed in SOL on the Solana blockchain.
                    </p>

                    {/* Callout */}
                    <div className="border-l-4 border-lime-400 bg-lime-950/20 pl-4 py-3 rounded-r">
                        <p className="text-gray-300 text-sm">
                            <strong className="text-lime-400">Note:</strong> Fast Audit is completely free and doesn't require a wallet connection.
                        </p>
                    </div>
                </section>

                {/* Supported Wallets - Cards */}
                <section id="supported-wallets" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Supported Wallets
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4 text-center">
                            <h3 className="text-white font-semibold">Phantom</h3>
                            <p className="text-gray-500 text-xs">Most popular</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4 text-center">
                            <h3 className="text-white font-semibold">Backpack</h3>
                            <p className="text-gray-500 text-xs">Multi-chain</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4 text-center">
                            <h3 className="text-white font-semibold">Solflare</h3>
                            <p className="text-gray-500 text-xs">Secure</p>
                        </div>
                    </div>
                </section>

                {/* How to Connect */}
                <section id="how-to-connect" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        How to Connect
                    </h2>
                    <ol className="text-gray-300 space-y-3 list-decimal list-inside">
                        <li><strong className="text-white">Click "Connect Wallet"</strong> — Find the button in the top navigation bar</li>
                        <li><strong className="text-white">Select your wallet</strong> — Choose from Phantom, Backpack, or Solflare</li>
                        <li><strong className="text-white">Approve the connection</strong> — Confirm the connection request in your wallet</li>
                        <li><strong className="text-white">Ready to use</strong> — You can now access premium features</li>
                    </ol>
                </section>

                {/* Payment Info */}
                <section id="payment-info" className="mb-12 scroll-mt-20">
                    <h2 className="text-2xl text-white font-bold mb-4 pb-2 border-b border-gray-800">
                        Payment Information
                    </h2>
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                        <li>All payments are processed in <strong className="text-white">SOL</strong></li>
                        <li>Transactions occur on <strong className="text-white">Solana mainnet</strong></li>
                        <li>You'll see the exact price before confirming any transaction</li>
                        <li>Transaction fees are minimal (typically less than $0.01)</li>
                    </ul>
                </section>
            </article>
        </DocsLayout>
    );
}
