'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { CERTIFICATE_TITLE } from '@/lib/learn-config';
import { LearnCertificatePDF } from '@/components/learn/LearnCertificatePDF';

export default function CertificatePage() {
  const [data, setData] = useState<{
    eligible: boolean;
    completed_at: string | null;
    display_name: string | null;
  } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
    fetch('/api/learn/certificate')
      .then((r) => (r.ok ? r.json() : null))
      .then(setData);
  }, []);

  const name =
    (data?.display_name?.trim() || userEmail?.split('@')[0] || 'HexiLearn Graduate').trim() ||
    'HexiLearn Graduate';
  const dateStr = data?.completed_at
    ? new Date(data.completed_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  if (data === null) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!data.eligible) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
          <p className="text-amber-400 font-medium mb-2">Certificate not yet available</p>
          <p className="text-gray-400 text-sm mb-6">
            Complete all required HexiLearn articles to earn your certificate.
          </p>
          <Link
            href="/learn/profile"
            className="inline-block px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors"
          >
            View progress
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="rounded-2xl border-2 border-lime-400/40 bg-[#0a1628] p-8 md:p-12 text-center shadow-xl shadow-lime-400/5">
        <div className="flex justify-center mb-6">
          <Image
            src="/favicon.svg"
            alt="Hexific"
            width={64}
            height={64}
            className="rounded-xl"
          />
        </div>
        <p className="text-xs font-semibold text-lime-400 uppercase tracking-widest mb-2">
          Certificate of Completion
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-lime-400 mb-6">
          {CERTIFICATE_TITLE}
        </h1>
        <p className="text-xl md:text-2xl font-bold text-white mb-4">{name}</p>
        <p className="text-gray-400 text-sm mb-2">
          has successfully completed all required modules in smart contract security
          fundamentals.
        </p>
        <p className="text-gray-500 text-xs mb-10">{dateStr}</p>

        <div className="flex justify-center gap-16 md:gap-24 mt-10 pt-8 border-t border-lime-400/20">
          <div className="text-center">
            <div className="relative w-32 md:w-40 h-12 mb-2 mx-auto flex items-center justify-center">
              <Image
                src="/signatures/febri-sign.png"
                alt="Febri Nirwana"
                width={160}
                height={48}
                className="object-contain object-center"
              />
            </div>
            <p className="text-sm font-semibold text-gray-300">Febri Nirwana</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Founder</p>
          </div>
          <div className="text-center">
            <div className="relative w-32 md:w-40 h-12 mb-2 mx-auto flex items-center justify-center">
              <Image
                src="/signatures/revito-sign.png"
                alt="Revito Pradipa"
                width={160}
                height={48}
                className="object-contain object-center"
              />
            </div>
            <p className="text-sm font-semibold text-gray-300">Revito Pradipa</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Co-Founder</p>
          </div>
        </div>

        <div className="mt-10">
          <LearnCertificatePDF
            name={name}
            completedAt={data.completed_at ?? new Date().toISOString()}
          />
        </div>
      </div>
      <p className="text-center mt-6">
        <Link href="/learn/profile" className="text-lime-400 hover:text-lime-300 text-sm">
          ← Back to profile
        </Link>
      </p>
    </div>
  );
}
