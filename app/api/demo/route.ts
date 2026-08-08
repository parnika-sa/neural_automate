import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeInput, isValidEmail } from '@/lib/sanitize';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(ip, 5, 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 5 demo requests per minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const name = sanitizeInput(body.name || 'John Doe');
    const email = sanitizeInput(body.email || 'demo@neuralautomate.dev');
    const message = sanitizeInput(body.message || 'Automate our lead qualification and HubSpot CRM sync');

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid work email.' }, { status: 400 });
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL;

    // TODO: replace with real n8n webhook once deployed
    if (webhookUrl && webhookUrl.trim().length > 0) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, timestamp: new Date().toISOString() }),
        });

        if (n8nRes.ok) {
          const jsonResponse = await n8nRes.json();
          return NextResponse.json({ success: true, source: 'n8n_live_webhook', data: jsonResponse });
        }
      } catch (err) {
        console.warn('[n8n Webhook Error - Falling Back to Mock Response]:', err);
      }
    }

    // MOCK Fallback Response when n8n webhook is not deployed or unreachable
    const mockOutput = {
      event: "N8N_DEMO_WORKFLOW_EXECUTED",
      status: "QUALIFIED_SUCCESS",
      pipeline: "Lead_Qualification_v2",
      latency: "14ms",
      n8n_webhook_status: "MOCK_FALLBACK (TODO: Wire real n8n webhook URL in .env.local)",
      lead: {
        name,
        email,
        qualificationScore: 98.5,
        intent: "Enterprise n8n Workflow Automation",
        suggestedPlan: "Growth Automation ($2,499/mo)"
      },
      automated_actions: [
        "Enriched IP & Company Data",
        "Pushed Deal Record to HubSpot CRM",
        "Dispatched Instant WhatsApp & Email Confirmation from info@neuralautomate.dev"
      ]
    };

    return NextResponse.json({ success: true, source: 'mock_fallback', data: mockOutput });
  } catch (error) {
    console.error('[DEMO API ERROR]:', error);
    return NextResponse.json({ error: 'Failed to execute demo workflow.' }, { status: 500 });
  }
}
