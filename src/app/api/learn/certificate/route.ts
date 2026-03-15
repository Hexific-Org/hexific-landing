import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isCertificateEligible, REQUIRED_CERTIFICATE_SLUGS } from '@/lib/learn-config';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const { data: progress } = await supabase
      .from('learn_progress')
      .select('article_slug, completed_at')
      .eq('user_id', user.id);

    const completedSlugs = (progress ?? []).map((p) => p.article_slug);
    const eligible = isCertificateEligible(completedSlugs);

    const completedDates = (progress ?? []).filter((p) =>
      REQUIRED_CERTIFICATE_SLUGS.includes(p.article_slug as typeof REQUIRED_CERTIFICATE_SLUGS[number])
    );
    const latestCompletedAt =
      completedDates.length > 0
        ? completedDates.sort(
            (a, b) =>
              new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime()
          )[0]?.completed_at
        : null;

    const { data: profile } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      eligible,
      completed_at: eligible ? latestCompletedAt : null,
      display_name: profile?.display_name ?? null,
      total_required: REQUIRED_CERTIFICATE_SLUGS.length,
      completed_count: completedSlugs.filter((s) =>
        REQUIRED_CERTIFICATE_SLUGS.includes(s as typeof REQUIRED_CERTIFICATE_SLUGS[number])
      ).length,
    });
  } catch (err) {
    console.error('Certificate API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to check certificate' },
      { status: 500 }
    );
  }
}
