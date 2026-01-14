'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Left Sidebar - Site Navigation (shared across all doc-style pages)
export function DocsNavSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#000E1B] border-r border-gray-800 overflow-y-auto pt-20 hidden lg:block z-40">
            <div className="px-4 py-6">

                {/* Essentials */}
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-2">
                        Essentials
                    </h3>
                    <nav className="space-y-0.5">
                        <Link
                            href="/docs"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            What is Hexific?
                        </Link>
                        <Link
                            href="/docs/services"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/services')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            Hexific Services
                        </Link>
                        <Link
                            href="/docs/findings"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/findings')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            Findings
                        </Link>
                        <Link
                            href="/docs/wallet"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/wallet')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            Wallet Connection
                        </Link>
                    </nav>
                </div>

                {/* Services */}
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-2">
                        Services
                    </h3>
                    <nav className="space-y-0.5">
                        <Link
                            href="/docs/fast-audit"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/fast-audit')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            Fast Audit
                        </Link>
                        <Link
                            href="/docs/full-audit"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/full-audit')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            Full Audit
                        </Link>
                    </nav>
                </div>

                {/* Resources */}
                <div className="mb-6">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 px-2">
                        Resources
                    </h3>
                    <nav className="space-y-0.5">
                        <Link
                            href="/docs/x402"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/x402')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            x402 Integration
                        </Link>
                        <Link
                            href="/docs/faq"
                            className={`block px-2 py-1.5 text-sm transition-all rounded ${isActive('/docs/faq')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                        >
                            FAQ
                        </Link>
                    </nav>
                </div>

            </div>
        </aside>
    );
}
