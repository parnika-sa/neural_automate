import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_CONFIG.brandName}`,
  description: `Terms of Service and commercial agreement guidelines for ${SITE_CONFIG.brandName}. Operated by ${SITE_CONFIG.operatorName}.`,
};

export default function TermsPage() {
  const toc = [
    { id: "acceptance", title: "1. Acceptance of Terms" },
    { id: "services-scope", title: "2. Scope of Services & Quotes" },
    { id: "payment-terms", title: "3. Payment Schedule & Terms" },
    { id: "revisions", title: "4. Revision Policy" },
    { id: "client-responsibilities", title: "5. Client Responsibilities" },
    { id: "intellectual-property", title: "6. Intellectual Property & Ownership" },
    { id: "confidentiality", title: "7. Confidentiality & Non-Disclosure" },
    { id: "third-party-costs", title: "8. Third-Party Expenses" },
    { id: "refunds-cancellations", title: "9. Refunds & Pro-Rata Cancellation" },
    { id: "limitation-liability", title: "10. Limitation of Liability" },
    { id: "termination", title: "11. Termination" },
    { id: "governing-law", title: "12. Governing Law & Contact" },
  ];

  return (
    <LegalLayout
      title="Terms of Service"
      subtitle={`Standard terms and conditions governing service engagements with ${SITE_CONFIG.brandName}. Operated by ${SITE_CONFIG.operatorName}.`}
      toc={toc}
    >
      <section id="acceptance" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing the website at <Link href="/" className="text-emerald-400 hover:underline">{SITE_CONFIG.siteUrl}</Link>, purchasing a service package, or approving a custom technical proposal issued by <strong>{SITE_CONFIG.brandName}</strong> (operated by <strong>{SITE_CONFIG.operatorName}</strong>), you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section id="services-scope" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Scope of Services & Quotes</h2>
        <p>
          We provide online-first technical services including Next.js website development, digital marketing management (SEO, Google Ads, Meta Ads), and n8n AI workflow automations. Detailed package scopes and fixed investment rates are outlined transparently on our <Link href="/pricing" className="text-emerald-400 hover:underline font-bold">Pricing Page</Link> or in custom written estimates provided prior to project initiation.
        </p>
      </section>

      <section id="payment-terms" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Payment Schedule & Terms</h2>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Website & One-Time Setup Services:</strong> Billed as 50% advance payment prior to project kickoff, and 50% final balance upon final staging approval and code deployment.</li>
          <li><strong>Monthly Retainer Services (SEO, Ads, Chatbot SLA):</strong> Billed strictly in advance on a month-to-month basis at the beginning of each billing cycle.</li>
          <li>All online payments are processed securely in INR or USD via integrated checkout gateways (Razorpay / Stripe).</li>
        </ul>
      </section>

      <section id="revisions" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Revision Policy</h2>
        <p>
          All website designs and custom automation pipelines include <strong>2 complimentary revision rounds</strong> within the agreed initial scope. Revision requests beyond 2 rounds or structural changes outside the original project scope will be quoted separately or billed at standard hourly rates.
        </p>
      </section>

      <section id="client-responsibilities" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Client Responsibilities</h2>
        <p>
          Timely project execution requires client collaboration. The client agrees to provide necessary text content, brand assets, API credentials, and feedback within 3-5 business days of request. Delays caused by missing client inputs will extend estimated delivery schedules accordingly.
        </p>
      </section>

      <section id="intellectual-property" className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Intellectual Property & Code Ownership</h2>
        <p>
          Upon receipt of 100% final payment, full intellectual property rights and code ownership for custom website source code and n8n JSON workflow exports transfer entirely to the client. We retain ownership only over pre-existing internal developer utilities, reusable script libraries, and framework boilerplate components.
        </p>
      </section>

      <section id="confidentiality" className="space-y-3">
        <h2 className="text-xl font-bold text-white">7. Confidentiality & Non-Disclosure</h2>
        <p>
          We treat all client business data, API keys, database structures, and internal workflow logic with 100% strict confidentiality under Non-Disclosure Agreement (NDA) principles. We never share or expose client proprietary data.
        </p>
      </section>

      <section id="third-party-costs" className="space-y-3">
        <h2 className="text-xl font-bold text-white">8. Third-Party Expenses</h2>
        <p>
          Third-party operational expenses such as domain registration, web hosting servers, WhatsApp API Meta conversation charges, Google/Meta ad spend, and premium SaaS subscriptions are paid directly by the client to the respective service providers and are not included in our service fees.
        </p>
      </section>

      <section id="refunds-cancellations" className="space-y-3">
        <h2 className="text-xl font-bold text-white">9. Refunds & Pro-Rata Cancellation Policy</h2>
        <p>
          We operate a fair, pro-rata cancellation policy. If a project is cancelled before completion with written notice, the client is billed only for the work and hours actually completed up to the date of notice, and any unearned advance balance is refunded within 5-7 working days.
        </p>
        <p>
          For full details on refund conditions and cancellation notices, please read our dedicated <Link href="/refund-policy" className="text-emerald-400 hover:underline font-bold">Refund and Cancellation Policy</Link>.
        </p>
      </section>

      <section id="limitation-liability" className="space-y-3">
        <h2 className="text-xl font-bold text-white">10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, {SITE_CONFIG.brandName} and its operator shall not be liable for any indirect, incidental, or consequential damages (including loss of profits, data corruption, or third-party platform API outages). Our total liability for any claim arising from a project shall not exceed the total fee paid by the client for that specific service.
        </p>
      </section>

      <section id="termination" className="space-y-3">
        <h2 className="text-xl font-bold text-white">11. Termination</h2>
        <p>
          Either party may terminate an ongoing service contract with 3-5 business days written notice via email or WhatsApp. Upon termination, an itemized summary of completed work will be compiled, final deliverables handed over, and remaining advance funds refunded pro-rata.
        </p>
      </section>

      <section id="governing-law" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">12. Governing Law & Contact Information</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, with exclusive jurisdiction in the courts of <strong>Chandigarh, India</strong>.
        </p>
        <div className="p-4 rounded-2xl bg-[#040805] border border-tech-border space-y-1 font-mono text-xs text-slate-300">
          <p className="text-white font-bold">{SITE_CONFIG.brandName}</p>
          <p>Operated by: {SITE_CONFIG.operatorName}</p>
          <p>Location: {SITE_CONFIG.location}</p>
          <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a></p>
          <p>WhatsApp: <a href={SITE_CONFIG.whatsappUrl} className="text-emerald-400 hover:underline">{SITE_CONFIG.whatsappDisplay}</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
