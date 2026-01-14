'use client';

import React, { useState, useEffect } from 'react';

interface OnThisPageItem {
    id: string;
    label: string;
}

interface OnThisPageProps {
    items: OnThisPageItem[];
}

export function OnThisPage({ items }: OnThisPageProps) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');
            let current = '';

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id') || '';
                }
            });

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
                On This Page
            </h3>
            <nav className="space-y-0.5">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`block w-full text-left px-2 py-1.5 text-sm transition-all rounded ${activeSection === item.id
                            ? 'bg-gray-800 text-white font-medium'
                            : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </>
    );
}
