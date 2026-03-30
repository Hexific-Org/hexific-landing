'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { Mail, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

function ForgotPasswordForm() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const redirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/reset-password`
          : '';
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });
      if (error) throw error;
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-[#08090d] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
              <Image src="/logo.svg" alt="Hexific" width={24} height={24} className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold gradient-text">Hexific</span>
          </Link>
          <div className="glass-effect rounded-2xl p-8 border border-lime-400/20 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-lime-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Check your email</h1>
            <p className="text-gray-400 text-sm mb-6">
              We sent a password reset link to <span className="text-white font-medium">{email}</span>. Click the link to set a new password.
            </p>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 font-medium text-sm"
            >
              Back to sign in
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08090d] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-3 justify-center mb-8">
          <div className="w-10 h-10 bg-lime-400 rounded-lg flex items-center justify-center">
            <Image src="/logo.svg" alt="Hexific" width={24} height={24} className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold gradient-text">Hexific</span>
        </Link>

        <div className="glass-effect rounded-2xl p-8 border border-lime-400/20 shadow-xl">
          <h1 className="text-2xl font-bold gradient-text text-center mb-2">Forgot password?</h1>
          <p className="text-gray-400 text-center mb-6">Enter your email and we’ll send you a link to reset your password.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-black/30 border border-lime-400/20 rounded-lg text-white placeholder-gray-500 focus:border-lime-400 focus:outline-none focus:ring-1 focus:ring-lime-400/50 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send reset link'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            <Link href="/sign-in" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
              ← Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090d] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-lime-400 border-t-transparent rounded-full" /></div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
