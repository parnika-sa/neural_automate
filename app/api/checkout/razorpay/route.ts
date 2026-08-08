import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { sanitizeInput } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const planName = sanitizeInput(body.planName || 'Starter Workflow');

    // Starter Workflow: ₹9,999 (999900 paise), Growth Automation: ₹29,999 (2999900 paise)
    const amountInPaise = planName.includes('Growth') ? 2999900 : 999900;

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TNDkm8zEcs3gwF';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'PWH1JCVExjom0po6EmsB47fg';

    if (keyId && keySecret && !keySecret.includes('dummy')) {
      try {
        const instance = new Razorpay({ key_id: keyId, key_secret: keySecret });
        const order = await instance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          notes: { planName },
        });

        return NextResponse.json({
          success: true,
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          keyId,
        });
      } catch (err: any) {
        console.warn('[Razorpay API Error]:', err);
        return NextResponse.json({ error: err.message || 'Razorpay order creation failed.' }, { status: 400 });
      }
    }

    return NextResponse.json({
      success: true,
      source: 'mock_fallback',
      orderId: `order_mock_${Date.now()}`,
      amount: amountInPaise,
      currency: 'INR',
      keyId: keyId,
    });
  } catch (error) {
    console.error('[RAZORPAY ROUTE ERROR]:', error);
    return NextResponse.json({ error: 'Failed to initialize Razorpay checkout order.' }, { status: 500 });
  }
}
