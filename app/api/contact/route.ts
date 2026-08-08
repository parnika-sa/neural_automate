import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, isValidEmail } from '@/lib/sanitize';
import { sendEmailNotification } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 5, 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many consultation requests. Please wait a minute before retrying.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = sanitizeInput(body.name || '');
    const email = sanitizeInput(body.email || '');
    const company = sanitizeInput(body.company || '');
    const workflowType = sanitizeInput(body.workflowType || 'General Automation');
    const message = sanitizeInput(body.message || '');
    const preferredSlot = sanitizeInput(body.preferredSlot || 'Tomorrow, 10:00 AM');

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required fields.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid work email address.' }, { status: 400 });
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK_URL;
    let webhookSuccess = false;

    // TODO: replace with real n8n webhook once deployed
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            company,
            workflowType,
            message,
            preferredSlot,
            timestamp: new Date().toISOString(),
          }),
        });

        if (n8nRes.ok) webhookSuccess = true;
      } catch (err) {
        console.warn('[n8n Contact Webhook Unreachable - Executing Email Fallback]:', err);
      }
    }

    // Direct Email Fallback (Ensures form submissions are NEVER lost)
    const adminNotificationHtml = `
      <h2>🚨 New Consultation Inquiry on NeuralAutomate.dev</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Workflow:</strong> ${workflowType}</p>
      <p><strong>Preferred Slot:</strong> ${preferredSlot}</p>
      <p><strong>Details / Bottlenecks:</strong> ${message || 'None provided'}</p>
      <p><em>Triggered via Direct Email Fallback (n8n Webhook: ${webhookSuccess ? 'LIVE' : 'MOCK FALLBACK'})</em></p>
    `;

    const userConfirmationHtml = `
      <h2>Strategy Call Reserved - NeuralAutomate.dev</h2>
      <p>Hi ${name},</p>
      <p>Thank you for requesting an AI automation consultation. We have reserved your preferred slot: <strong>${preferredSlot}</strong>.</p>
      <p>Our engineering team is reviewing your workflow request (<strong>${workflowType}</strong>) and will send over your Google Meet link shortly.</p>
      <br/>
      <p>Best regards,<br/><strong>NeuralAutomate Engineering Team</strong><br/>info@neuralautomate.dev</p>
    `;

    // Dispatch notification to info@neuralautomate.dev
    await sendEmailNotification({
      to: process.env.INFO_EMAIL || 'info@neuralautomate.dev',
      subject: `[INQUIRY]: ${name} - ${workflowType}`,
      html: adminNotificationHtml,
    });

    // Dispatch confirmation email to user
    await sendEmailNotification({
      to: email,
      subject: `Consultation Confirmed: ${preferredSlot} | NeuralAutomate.dev`,
      html: userConfirmationHtml,
    });

    return NextResponse.json({
      success: true,
      webhookStatus: webhookSuccess ? 'live' : 'mock_fallback',
      message: 'Consultation slot successfully reserved!',
    });
  } catch (error) {
    console.error('[CONTACT API ERROR]:', error);
    return NextResponse.json({ error: 'Failed to submit consultation form.' }, { status: 500 });
  }
}
