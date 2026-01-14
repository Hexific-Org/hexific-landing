'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Navigation items for HexiLearn
const navItems = [
  {
    category: 'Learn',
    items: [
      { href: '/learn', label: 'Overview', icon: '🏠' },
      { href: '/learn/vulnerabilities', label: 'Vulnerabilities', icon: '🔓' },
      { href: '/learn/case-studies', label: 'Case Studies', icon: '🔍' },
      { href: '/learn/best-practices', label: 'Best Practices', icon: '✅' },
    ]
  },
  {
    category: 'Resources',
    items: [
      { href: '/learn/glossary', label: 'Glossary', icon: '📖' },
      { href: '/learn/checklist', label: 'Security Checklist', icon: '📋' },
      { href: '/learn/resources', label: 'Tools & Resources', icon: '🛠️' },
    ]
  }
];

function LearnSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-20 h-[calc(100vh-5rem)] w-72 bg-[#000E1B]/95 backdrop-blur-xl
        border-r border-lime-400/20 overflow-y-auto z-40
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-4 py-6">
          {/* HexiLearn Logo */}
          <Link href="/learn" className="flex items-center gap-3 mb-8 px-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-lime-400/20">
              <span className="text-xl">📚</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-lime-400 to-white bg-clip-text text-transparent">
                HexiLearn
              </span>
              <p className="text-xs text-gray-500">Security Learning Center</p>
            </div>
          </Link>

          {/* Navigation Groups */}
          {navItems.map((group) => (
            <div key={group.category} className="mb-6">
              <h3 className="text-xs font-semibold text-lime-400/70 uppercase tracking-wider mb-3 px-3">
                {group.category}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/learn' && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all
                        ${isActive
                          ? 'bg-lime-400/20 text-lime-400 font-semibold shadow-lg shadow-lime-400/10'
                          : 'text-gray-400 hover:text-lime-400 hover:bg-lime-400/10'
                        }
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}

          {/* Quick Stats */}
          <div className="mt-8 p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
            <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-3">
              Learning Progress
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Vulnerabilities</span>
                  <span className="text-lime-400">12 articles</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Case Studies</span>
                  <span className="text-lime-400">8 analyses</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-lime-400 to-lime-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Back to Hexific */}
          <Link
            href="/"
            className="mt-6 flex items-center gap-2 px-3 py-2.5 text-sm text-gray-500 hover:text-lime-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Hexific</span>
          </Link>
        </div>
      </aside>
    </>
  );
}

function LearnNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 w-full z-[60] transition-all duration-300
      ${scrolled 
        ? 'bg-[#000E1B]/90 backdrop-blur-xl border-b border-lime-400/20' 
        : 'bg-transparent'
      }
    `}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
                <Image src="/logo.svg" alt="Hexific Logo" width={24} height={24} className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-lime-400 to-white bg-clip-text text-transparent hidden sm:block">
                Hexific
              </span>
            </Link>
            
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <Link href="/learn" className="text-lime-400 font-medium">
                HexiLearn
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-gray-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Get Audit CTA */}
            <Link
              href="/"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
            >
              <span>Get Audit</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#000E1B] text-white">
      <LearnNavbar onMenuClick={() => setSidebarOpen(true)} />
      <LearnSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content */}
      <main className="lg:pl-72 pt-20 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="lg:pl-72 border-t border-lime-400/10 bg-[#000E1B]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Hexific. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-lime-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="hover:text-lime-400 transition-colors">
                Terms
              </Link>
              <Link href="/docs" className="hover:text-lime-400 transition-colors">
                Docs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
