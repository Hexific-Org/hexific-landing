'use client';

import { useEffect, useState } from 'react';

const TOTALS = {
  vulnerabilities: 12,
  'case-studies': 1,
  'best-practices': 3,
} as const;

export function LearnProgressWidget() {
  const [progress, setProgress] = useState<{ article_slug: string }[]>([]);

  useEffect(() => {
    fetch('/api/learn/progress')
      .then((res) => (res.ok ? res.json() : { progress: [] }))
      .then((data) => setProgress(data.progress ?? []))
      .catch(() => setProgress([]));
  }, []);

  const completedByCategory = progress.reduce(
    (acc, { article_slug }) => {
      const [category] = article_slug.split('/');
      if (category && category in acc) acc[category as keyof typeof acc]++;
      return acc;
    },
    { vulnerabilities: 0, 'case-studies': 0, 'best-practices': 0 } as Record<string, number>
  );

  const totalCompleted = progress.length;

  return (
    <div className="mt-8 p-4 bg-lime-400/5 border border-lime-400/20 rounded-xl">
      <h4 className="text-xs font-semibold text-lime-400 uppercase tracking-wider mb-3">
        Learning Progress
      </h4>
      <div className="space-y-3">
        {(['vulnerabilities', 'case-studies', 'best-practices'] as const).map((cat) => {
          const completed = completedByCategory[cat] ?? 0;
          const total = TOTALS[cat];
          const pct = total > 0 ? Math.min(100, (completed / total) * 100) : 0;
          const label = cat === 'vulnerabilities' ? 'Vulnerabilities' : cat === 'case-studies' ? 'Case Studies' : 'Best Practices';
          return (
            <div key={cat}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-400">{label}</span>
                <span className="text-lime-400">{completed} / {total}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {totalCompleted} article{totalCompleted !== 1 ? 's' : ''} completed
      </p>
    </div>
  );
}
