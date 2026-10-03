import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy | ${SITE_CONFIG.brandName}`,
  description: `Fair pro-rata refund and cancellation policy for ${SITE_CONFIG.brandName}. Operated by ${SITE_CONFIG.operatorName}.`,
};

export default function RefundPolicyPage() {
  const toc = [
    { id: "overview", title: "1. Fair Pro-Rata Overview" },
    { id: "cancellation-notice", title: "2. Notice Period Requirement" },
    { id: "one-time-projects", title: "3. Website & Setup Refunds" },
    { id: "monthly-services", title: "4. Monthly Retainer Services" },
    { id: "third-party-costs", title: "5. Non-Refundable Third-Party Costs" },
    { id: "refund-process", title: "6. Processing Timeline (5-7 Days)" },
    { id: "itemized-summary", title: "7. Work-in-Progress Summary" },
    { id: "how-to-request", title: "8. How to Request a Refund" },
  ];

  return (
    <LegalLayout
      title="Refund & Cancellation Policy"
      subtitle={`Transparent, pro-rata refund guidelines for ${SITE_CONFIG.brandName}. Operated by ${SITE_CONFIG.operatorName}.`}
      toc={toc}
    >
      <section id="overview" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Fair Pro-Rata Overview</h2>
        <p>
          At <strong>{SITE_CONFIG.brandName}</strong>, we believe in honest commercial relationships and fair business practices. We operate a transparent <strong>pro-rata refund policy</strong>: you pay only for the exact work, engineering effort, and deliverables completed up to the date of cancellation.
        </p>
        <p>
          If you decide to cancel a project before completion, any unearned portion of your advance payment will be refunded directly to you.
        </p>
      </section>

      <section id="cancellation-notice" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Written Notice Requirement</h2>
        <p>
          To initiate a service cancellation or request a refund, clients must provide a written cancellation notice of <strong>3 to 5 business days</strong> via official email (<strong className="text-emerald-400">{SITE_CONFIG.email}</strong>) or WhatsApp (<strong className="text-emerald-400">{SITE_CONFIG.whatsappDisplay}</strong>).
        </p>
      </section>

      <section id="one-time-projects" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Website Development & One-Time Setup Refunds</h2>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Cancellation before work begins:</strong> 100% of advance payment refunded.</li>
          <li><strong>Cancellation during active build phase:</strong> We calculate completed design milestones, developed pages, or n8n workflow nodes. Billed pro-rata for completed work; remaining advance funds refunded.</li>
          <li><strong>Cancellation after final delivery & handoff:</strong> Completed and approved project handovers are non-refundable once source code repository or admin access has been transferred.</li>
        </ul>
      </section>

      <section id="monthly-services" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Monthly Retainer Services (SEO, Ads, Support SLA)</h2>
        <p>
          Monthly retainer services (such as SEO management, Google/Meta ad optimization, social media posting, and WhatsApp bot SLA maintenance) operate month-to-month with zero long-term lock-in:
        </p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>Work performed during the 3-5 day notice period will be charged pro-rata.</li>
          <li>Once notice expires, services stop immediately and no fees will be billed for subsequent billing cycles.</li>
        </ul>
      </section>

      <section id="third-party-costs" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Non-Refundable Third-Party Expenses</h2>
        <p>
          Fees already paid to third-party providers on your behalf (such as domain registration, web hosting server provisioning, WhatsApp API Meta conversation charges, or Google/Meta ad campaign spend) are non-refundable as these funds go directly to third-party platforms.
        </p>
      </section>

      <section id="refund-process" className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Processing Timeline (5-7 Working Days)</h2>
        <p>
          Approved refunds are processed within <strong>5 to 7 working days</strong> from the date of refund approval. Refunds will be credited back to your original payment method (bank account, credit card, or UPI via Razorpay or Stripe, subject to bank processing cycles).
        </p>
      </section>

      <section id="itemized-summary" className="space-y-3">
        <h2 className="text-xl font-bold text-white">7. Itemized Work-in-Progress Summary</h2>
        <p>
          Upon cancellation, we compile an itemized technical summary detailing all completed design assets, Next.js components, and n8n workflow nodes up to the date of notice. All completed work assets are handed over to you upon final account settlement.
        </p>
      </section>

      <section id="how-to-request" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">8. How to Request a Refund or Cancel Service</h2>
        <p>
          To request a cancellation or refund, contact us directly with your invoice or project reference:
        </p>
        <div className="p-4 rounded-2xl bg-[#040805] border border-tech-border space-y-1 font-mono text-xs text-slate-300">
          <p className="text-white font-bold">{SITE_CONFIG.brandName}</p>
          <p>Contact Person: {SITE_CONFIG.operatorName}</p>
          <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a></p>
          <p>WhatsApp: <a href={SITE_CONFIG.whatsappUrl} className="text-emerald-400 hover:underline">{SITE_CONFIG.whatsappDisplay}</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
