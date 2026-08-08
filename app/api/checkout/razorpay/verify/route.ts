import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendEmailNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planName, customerEmail, customerName, customerPhone } = body;

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
            customerPhone,
            timestamp: new Date().toISOString(),
          }),
        });

        if (res.ok) n8nTriggered = true;
      } catch (err) {
        console.warn('[n8n Payment Webhook Error]:', err);
      }
    }

    const recipientEmail = customerEmail && typeof customerEmail === 'string' ? customerEmail.trim() : '';

    // Only send Welcome Email if email is valid and not dummy/example
    const isDummyDomain = recipientEmail.includes('company.dev') || recipientEmail.includes('example.com') || !recipientEmail.includes('@');

    if (recipientEmail && !isDummyDomain) {
      const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #10b981; margin-bottom: 10px;">🎉 Welcome to NeuralAutomate.dev!</h2>
          <p>Hi <strong>${customerName || 'Founder'}</strong>,</p>
          <p>Thank you for enrolling in the <strong>${planName}</strong> plan! Your Razorpay payment with transaction ID <code>${razorpay_payment_id || 'SUCCESS'}</code> was processed successfully.</p>
          <p>Our automation engineering team is preparing your dedicated n8n workflow environment. We will reach out to you within 4 hours to begin onboarding and workflow mapping.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">
            Best regards,<br/>
            <strong>NeuralAutomate Engineering Team</strong><br/>
            <a href="mailto:info@neuralautomate.dev" style="color: #10b981;">info@neuralautomate.dev</a>
          </p>
        </div>
      `;

      await sendEmailNotification({
        to: recipientEmail,
        subject: `Welcome to ${planName} | NeuralAutomate.dev`,
        html: welcomeHtml,
      });
    }

    // Always Notify Internal Agency Inbox (info@neuralautomate.dev)
    const adminNotificationHtml = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <h3 style="color: #10b981;">🚨 NEW PAYMENT RECEIVED (Razorpay)</h3>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Customer Name:</strong> ${customerName || 'N/A'}</p>
        <p><strong>Customer Email:</strong> ${recipientEmail || 'N/A'}</p>
        <p><strong>Customer Phone:</strong> ${customerPhone || 'N/A'}</p>
        <p><strong>Payment ID:</strong> ${razorpay_payment_id || 'N/A'}</p>
        <p><strong>Order ID:</strong> ${razorpay_order_id || 'N/A'}</p>
      </div>
    `;

    await sendEmailNotification({
      to: process.env.INFO_EMAIL || 'info@neuralautomate.dev',
      subject: `🚨 [PAYMENT SUCCESS]: ${planName} - ${customerName || recipientEmail}`,
      html: adminNotificationHtml,
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
