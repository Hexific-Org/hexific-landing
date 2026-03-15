'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Award, Loader2, Download } from 'lucide-react';
import { LearnCertificatePDF } from '@/components/learn/LearnCertificatePDF';

type CertificateData = {
  eligible: boolean;
  completed_at: string | null;
  display_name: string | null;
  total_required: number;
  completed_count: number;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ display_name: string | null; email: string | null } | null>(null);
  const [cert, setCert] = useState<CertificateData | null>(null);
  const [saving, setSaving] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/learn/certificate').then((r) => (r.ok ? r.json() : null)),
    ]).then(([profileData, certData]) => {
      setProfile(profileData ?? null);
      setCert(certData ?? null);
      if (profileData?.display_name != null) setDisplayNameInput(profileData.display_name);
      setLoading(false);
    });
  }, []);

  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ display_name: displayNameInput || null }),
      });
      if (res.ok) {
        const data = await res.json();
        setProfile((p) => (p ? { ...p, display_name: data.display_name } : null));
        if (cert) setCert((c) => (c ? { ...c, display_name: data.display_name } : null));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 text-lime-400 animate-spin" />
      </div>
    );
  }

  const certificateName =
    (profile?.display_name?.trim() || profile?.email?.split('@')[0] || 'HexiLearn Graduate').trim() || 'HexiLearn Graduate';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-lime-400 to-white bg-clip-text text-transparent">
        Profile
      </h1>

      <section className="rounded-2xl border border-lime-400/20 bg-white/[0.02] p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-lime-400" />
          Your name (for certificate)
        </h2>
        <form onSubmit={handleSaveName} className="space-y-3">
          <input
            type="text"
            value={displayNameInput}
            onChange={(e) => setDisplayNameInput(e.target.value)}
            placeholder={profile?.email ?? 'Your name'}
            maxLength={200}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-lime-400/20 text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save name'}
          </button>
        </form>
        {profile?.email && (
          <p className="text-sm text-gray-500 mt-2">Signed in as {profile.email}</p>
        )}
      </section>

      <section className="rounded-2xl border border-lime-400/20 bg-white/[0.02] p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-lime-400" />
          Certificate
        </h2>
        {cert && (
          <>
            <p className="text-gray-400 mb-4">
              You&apos;ve completed {cert.completed_count} of {cert.total_required} required articles.
            </p>
            {cert.eligible ? (
              <div className="space-y-4">
                <p className="text-lime-400 font-medium">
                  You&apos;ve completed HexiLearn Security Fundamentals. Your certificate will show the name: &quot;{certificateName}&quot;
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/learn/certificate"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400/20 border border-lime-400/40 text-lime-400 font-semibold rounded-lg hover:bg-lime-400/30 transition-colors"
                  >
                    View certificate
                  </Link>
                  <LearnCertificatePDF
                    name={certificateName}
                    completedAt={cert.completed_at ?? new Date().toISOString()}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Complete all {cert.total_required} articles to earn your certificate. Keep learning!
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
