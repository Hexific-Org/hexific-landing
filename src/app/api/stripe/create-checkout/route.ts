import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 });
    }
    const stripe = new Stripe(secretKey, { apiVersion: '2026-02-25.clover' });
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
    }

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'https://hexific.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Hexific AI Audit',
              description: 'Advanced AI-powered smart contract security audit',
              images: [`${origin}/og-image.jpg`],
            },
            unit_amount: 500, // $5.00 (500 cents) - adjust as needed
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?audit=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#free-audit-upload`,
      metadata: {
        userId: user.id,
        type: 'ai_audit',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}
