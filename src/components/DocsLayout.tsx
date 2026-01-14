'use client';

import React from 'react';
import Link from 'next/link';
import { DocsNavSidebar } from '@/components/DocsNavSidebar';

// Shared Layout for all docs pages
export function DocsLayout({
    children,
    rightSidebar
}: {
    children: React.ReactNode;
    rightSidebar?: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#000E1B]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-[#000E1B]/95 backdrop-blur-lg border-b border-gray-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-lime-400">HEXIFIC</span>
                            <span className="text-xs text-gray-500">DOCS</span>
                        </Link>
                        <nav className="hidden lg:flex items-center space-x-6">
                            <Link
                                href="/"
                                className="bg-lime-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-lime-300 transition-all text-sm"
                            >
                                Start Free Audit
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Left Sidebar */}
            <DocsNavSidebar />

            {/* Right Sidebar - On This Page */}
            {rightSidebar && (
                <aside className="fixed right-0 top-0 h-screen w-64 bg-[#000E1B] border-l border-gray-800 overflow-y-auto pt-20 hidden xl:block z-40">
                    <div className="px-4 py-6">
                        {rightSidebar}
                    </div>
                </aside>
            )}

            {/* Main Content */}
            <main className={`lg:ml-64 ${rightSidebar ? 'xl:mr-64' : ''} pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 py-8 sm:py-12`}>
                <div className="max-w-4xl mx-auto">{children}</div>
            </main>

            {/* Footer */}
            <footer className={`lg:ml-64 ${rightSidebar ? 'xl:mr-64' : ''} border-t border-gray-800 mt-12 sm:mt-20 bg-[#000E1B]`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-gray-500 text-sm">
                            © 2025 Hexific. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
                            <a
                                href="mailto:admin@hexific.com"
                                className="hover:text-gray-300 transition-colors"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
