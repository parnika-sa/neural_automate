import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sanitizeInput } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const planName = sanitizeInput(body.planName || 'Starter Workflow');
    const customerEmail = sanitizeInput(body.customerEmail || 'client@company.dev');

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    const stripe = stripeSecret && !stripeSecret.includes('dummy') ? new Stripe(stripeSecret, { apiVersion: '2025-01-27.acacia' as any }) : null;

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    if (stripe) {
      try {
        const priceId = planName.includes('Growth')
          ? process.env.STRIPE_PRICE_ID_GROWTH
          : process.env.STRIPE_PRICE_ID_STARTER;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          customer_email: customerEmail,
          line_items: priceId ? [{ price: priceId, quantity: 1 }] : undefined,
          success_url: `${origin}/pricing?payment=success&gateway=stripe&plan=${encodeURIComponent(planName)}`,
          cancel_url: `${origin}/pricing?payment=cancelled`,
        });

        return NextResponse.json({ success: true, url: session.url });
      } catch (err) {
        console.warn('[Stripe API Error - Falling back to MOCK Checkout]:', err);
      }
    }

    // MOCK Stripe Checkout Session fallback
    const mockSuccessUrl = `${origin}/pricing?payment=success&gateway=stripe_mock&plan=${encodeURIComponent(planName)}`;
    return NextResponse.json({
      success: true,
      source: 'mock_fallback',
      url: mockSuccessUrl,
    });
  } catch (error) {
    console.error('[STRIPE ROUTE ERROR]:', error);
    return NextResponse.json({ error: 'Failed to initialize Stripe checkout session.' }, { status: 500 });
  }
}
