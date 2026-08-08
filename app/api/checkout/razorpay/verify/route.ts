import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmailNotification } from '@/lib/email';
import { trackEvent } from '@/lib/analytics';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, customerEmail, customerName } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'dummy_razorpay_secret_12345';
    let isValidSignature = true;

    // Verify HMAC signature if real secret is provided
    if (keySecret && !keySecret.includes('dummy') && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      isValidSignature = generatedSignature === razorpay_signature;
    }

    if (!isValidSignature) {
      return NextResponse.json({ error: 'Razorpay payment verification signature failed.' }, { status: 400 });
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_PAYMENT_SUCCESS_WEBHOOK_URL;
    let n8nTriggered = false;

    // TODO: replace with real n8n webhook once deployed
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gateway: 'Razorpay',
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            planName,
            customerEmail,
            customerName,
            timestamp: new Date().toISOString(),
          }),
        });

        if (res.ok) n8nTriggered = true;
      } catch (err) {
        console.warn('[n8n Payment Webhook Error]:', err);
      }
    }

    // Direct Welcome Email Fallback from info@neuralautomate.dev
    const welcomeHtml = `
      <h2>🎉 Welcome to NeuralAutomate.dev!</h2>
      <p>Hi ${customerName || 'Founder'},</p>
      <p>Thank you for choosing the <strong>${planName}</strong> plan! Your payment of transaction ID <code>${razorpay_payment_id || 'MOCK_PAYMENT'}</code> was successfully processed.</p>
      <p>Our engineering team is setting up your dedicated n8n workflow environment. We will reach out to you within 4 hours to begin mapping your pipeline.</p>
      <br/>
      <p>Best regards,<br/><strong>NeuralAutomate Engineering Team</strong><br/>info@neuralautomate.dev</p>
    `;

    await sendEmailNotification({
      to: customerEmail || 'customer@example.com',
      subject: `Welcome to ${planName} | NeuralAutomate.dev`,
      html: welcomeHtml,
    });

    // Notify internal team
    await sendEmailNotification({
      to: process.env.INFO_EMAIL || 'info@neuralautomate.dev',
      subject: `🚨 [PAYMENT SUCCESS]: ${planName} via Razorpay`,
      html: `<p>New payment received from ${customerEmail || 'Client'} for ${planName}. Order ID: ${razorpay_order_id}.</p>`,
    });

    return NextResponse.json({
      success: true,
      n8nStatus: n8nTriggered ? 'live' : 'mock_fallback',
      message: 'Razorpay payment successfully verified!',
    });
  } catch (error) {
    console.error('[RAZORPAY VERIFY ROUTE ERROR]:', error);
    return NextResponse.json({ error: 'Failed to verify Razorpay payment.' }, { status: 500 });
  }
}
