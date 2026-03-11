import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('learn_progress')
      .select('article_slug, completed_at')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ progress: data ?? [] });
  } catch (err) {
    console.error('Progress GET error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const body = await req.json();
    const articleSlug = body?.article_slug?.trim();

    if (!articleSlug || articleSlug.length > 255) {
      return NextResponse.json({ error: 'Invalid article_slug' }, { status: 400 });
    }

    const { error } = await supabase.from('learn_progress').upsert(
      {
        user_id: user.id,
        article_slug: articleSlug,
        completed_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,article_slug',
        ignoreDuplicates: false,
      }
    );

    if (error) {
      console.error('Progress save error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Progress API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save progress' },
      { status: 500 }
    );
  }
}
