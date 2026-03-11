'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { LogOut, User } from 'lucide-react';

export function AuthUserNav() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading || !user) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const email = user.email ?? 'User';

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
        <User className="w-4 h-4" />
        {email}
      </span>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors"
      >
        <LogOut className="w-4 h-4" />
        Sign out
      </button>
    </div>
  );
}
