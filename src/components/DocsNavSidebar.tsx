'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Left Sidebar - Site Navigation (shared across all doc-style pages)
export function DocsNavSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const navContent = (
        <div className="px-6 py-8">
            {/* Essentials */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 px-2">
                    Essentials
                </h3>
                <nav className="space-y-1">
                    <Link
                        href="/docs"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        What is Hexific?
                    </Link>
                    <Link
                        href="/docs/services"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/services')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        Hexific Services
                    </Link>
                    <Link
                        href="/docs/findings"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/findings')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        Findings
                    </Link>
                    <Link
                        href="/docs/wallet"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/wallet')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        Wallet Connection
                    </Link>
                </nav>
            </div>

            {/* Services */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 px-2">
                    Services
                </h3>
                <nav className="space-y-1">
                    <Link
                        href="/docs/fast-audit"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/fast-audit')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        Fast Audit
                    </Link>
                    <Link
                        href="/docs/full-audit"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/full-audit')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        Full Audit
                    </Link>
                </nav>
            </div>

            {/* Resources */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 px-2">
                    Resources
                </h3>
                <nav className="space-y-1">
                    <Link
                        href="/docs/x402"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/x402')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        x402 Integration
                    </Link>
                    <Link
                        href="/docs/faq"
                        className={`block px-3 py-2.5 text-base transition-all rounded-lg ${isActive('/docs/faq')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                            }`}
                    >
                        FAQ
                    </Link>
                </nav>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Menu Button - positioned on the right */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 z-50 lg:hidden p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white hover:bg-gray-700 transition-colors"
                aria-label="Open menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Sidebar - Full Screen */}
            <aside
                className={`fixed inset-0 w-full h-full bg-[#0a1929] flex flex-col z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Mobile Sidebar Header */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-lime-400">HEXIFIC</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Content */}
                <div className="flex-1 overflow-y-auto">
                    {navContent}
                </div>

                {/* Bottom CTA */}
                <div className="sticky bottom-0 p-6 bg-[#0a1929] border-t border-gray-800">
                    <Link
                        href="/"
                        className="block w-full bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-lime-300 transition-all text-center text-base"
                    >
                        Start Free Audit
                    </Link>
                </div>
            </aside>

            {/* Desktop Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#000E1B] border-r border-gray-800 overflow-y-auto pt-20 hidden lg:block z-40">
                {navContent}
            </aside>
        </>
    );
}
