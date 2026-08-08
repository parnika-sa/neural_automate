import { Resend } from 'resend';
import nodemailer from 'nodemailer';

const resendApiKey = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.INFO_EMAIL || 'info@neuralautomate.dev';

// Resend Client Setup
const resend = resendApiKey && !resendApiKey.includes('dummy') ? new Resend(resendApiKey) : null;

// SMTP Transporter Setup (Hostinger / Google Workspace / Zoho)
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const smtpTransporter = smtpHost && smtpUser && smtpPass && !smtpPass.includes('dummy')
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export async function sendEmailNotification({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // Prevent sending to dummy/mock domains to avoid mail server bounce NDRs
  if (!to || to.includes('company.dev') || to.includes('example.com')) {
    console.log(`[EMAIL DISPATCH SKIPPED FOR DUMMY DOMAIN]: ${to}`);
    return { success: false, skipped: true, reason: 'dummy_domain' };
  }

  // Option A: Send via Resend API (Recommended)
  if (resend) {
    try {
      const data = await resend.emails.send({
        from: `NeuralAutomate <${FROM_EMAIL}>`,
        to: [to],
        subject: subject,
        html: html,
      });
      console.log('[RESEND EMAIL DISPATCHED]:', data);
      return { success: true, provider: 'resend', data };
    } catch (error) {
      console.error('[RESEND API ERROR]:', error);
    }
  }

  // Option B: Send via Hostinger SMTP
  if (smtpTransporter) {
    try {
      const info = await smtpTransporter.sendMail({
        from: `NeuralAutomate <${FROM_EMAIL}>`,
        to: to,
        subject: subject,
        html: html,
      });
      console.log('[SMTP EMAIL DISPATCHED SUCCESSFULLY]:', info.messageId);
      return { success: true, provider: 'smtp', messageId: info.messageId };
    } catch (error) {
      console.error('[SMTP EMAIL ERROR]:', error);
    }
  }

  // Option C: MOCK Logger Fallback (When credentials are dummy/unconfigured)
  console.log(`\n================ [MOCK EMAIL DISPATCHED] ================`);
  console.log(`FROM: ${FROM_EMAIL}`);
  console.log(`TO: ${to}`);
  console.log(`SUBJECT: ${subject}`);
  console.log(`BODY:\n${html}`);
  console.log(`==========================================================\n`);

  return { success: true, mock: true };
}
