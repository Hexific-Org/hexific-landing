'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export function ProgressTracker() {
  const pathname = usePathname();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const trackedRef = useRef<Set<string>>(new Set());

  // Only track actual article detail pages.
  // Examples we track:
  // - /learn/vulnerabilities/reentrancy-attack -> vulnerabilities/reentrancy-attack
  // - /learn/best-practices/audit-preparation-guide -> best-practices/audit-preparation-guide
  // We do NOT track listing/panel pages like /learn or /learn/vulnerabilities.
  const articleSlug = (() => {
    if (!pathname?.startsWith('/learn')) return null;

    const parts = pathname.split('/').filter(Boolean); // ["learn", "...", "...?"]
    if (parts.length < 3) return null; // /learn or /learn/<panel>

    const category = parts[1];
    const slug = parts.slice(1).join('/'); // "<category>/<detail...>"

    const trackableCategories = new Set(['vulnerabilities', 'case-studies', 'best-practices']);
    if (!trackableCategories.has(category)) return null;

    return slug;
  })();

  const recordProgress = useCallback(async (slug: string) => {
    if (trackedRef.current.has(slug)) return;
    trackedRef.current.add(slug);

    try {
      const res = await fetch('/api/learn/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article_slug: slug }),
      });
      if (res.ok) {
        trackedRef.current.add(slug);
      }
    } catch {
      trackedRef.current.delete(slug);
    }
  }, []);

  useEffect(() => {
    if (!articleSlug) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            recordProgress(articleSlug);
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px 100px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [articleSlug, recordProgress]);

  if (!articleSlug) return null;

  return <div ref={sentinelRef} className="h-1" aria-hidden />;
}
