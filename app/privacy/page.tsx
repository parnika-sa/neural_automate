import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_CONFIG.brandName}`,
  description: `Privacy Policy for ${SITE_CONFIG.brandName} - Learn how we collect, handle, and protect your data across our website and AI workflow automation services.`,
};

export default function PrivacyPage() {
  const toc = [
    { id: "introduction", title: "1. Introduction & Operator Info" },
    { id: "information-collected", title: "2. Information We Collect" },
    { id: "how-we-use-data", title: "3. How We Use Data" },
    { id: "third-party-services", title: "4. Third-Party Data Sharing & AI Providers" },
    { id: "cookies", title: "5. Cookies & Tracking" },
    { id: "retention", title: "6. Data Retention" },
    { id: "your-rights", title: "7. Your Data Rights (DPDP Act & GDPR)" },
    { id: "data-security", title: "8. Data Security" },
    { id: "children-privacy", title: "9. Children's Privacy" },
    { id: "international-transfers", title: "10. International Data Transfers" },
    { id: "policy-changes", title: "11. Policy Changes" },
    { id: "contact-grievance", title: "12. Grievance Officer & Contact" },
  ];

  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle={`Comprehensive data privacy policy for ${SITE_CONFIG.brandName}. Operated by ${SITE_CONFIG.operatorName}.`}
      toc={toc}
    >
      <section id="introduction" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. Introduction & Operator Information</h2>
        <p>
          Welcome to <strong>{SITE_CONFIG.brandName}</strong> ("we", "our", or "us"). This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit our website at <Link href="/" className="text-emerald-400 hover:underline">{SITE_CONFIG.siteUrl}</Link> or engage our web development, digital marketing, and AI workflow automation services.
        </p>
        <p>
          <strong>{SITE_CONFIG.brandName}</strong> is an online-first business operated by sole proprietor <strong>{SITE_CONFIG.operatorName}</strong> based in {SITE_CONFIG.location}.
        </p>
      </section>

      <section id="information-collected" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
        <p>We collect information necessary to provide business automation services, answer inquiries, and process payments:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Inquiry & Form Data:</strong> Name, work email address, company name, phone number, and project details submitted via our contact or demo forms.</li>
          <li><strong>WhatsApp Chatbot Data:</strong> Name, requirement details, budget expectations, and conversation logs submitted when interacting with our automated WhatsApp assistants.</li>
          <li><strong>Payment Information:</strong> Transaction identifiers and payment status. We do <em>not</em> store credit/debit card numbers or UPI PINs; all payments are processed securely by Razorpay or Stripe.</li>
          <li><strong>Technical Telemetry:</strong> IP address, browser type, device info, operating system, and page usage data collected via cookies only after your explicit consent.</li>
        </ul>
      </section>

      <section id="how-we-use-data" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. How We Use Your Data</h2>
        <p>We use your data strictly for legitimate operational purposes:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li>To prepare technical audits, custom quotes, and deliver requested web development or n8n workflow automations.</li>
          <li>To communicate project status, schedule video strategy sessions, and provide ongoing technical support.</li>
          <li>To process service retainer invoices and send automated payment confirmations.</li>
          <li>To optimize website performance and user experience (analytics telemetry).</li>
        </ul>
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
          🔒 We do not sell, rent, or trade your personal data to third-party data brokers under any circumstances.
        </div>
      </section>

      <section id="third-party-services" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Third-Party Data Sharing & AI Model Processing</h2>
        <p>
          To deliver autonomous business workflows, we integrate with trusted third-party infrastructure providers. Chatbot conversations and prompt data may be processed by AI model providers (such as Anthropic Claude or OpenAI) to generate automated responses.
        </p>
        <div className="space-y-2">
          <p className="font-bold text-white text-xs font-mono uppercase">Key Service Providers:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs text-slate-300">
            <li><strong>AI Providers (Anthropic / OpenAI):</strong> Processing chatbot text conversations and automation responses.</li>
            <li><strong>Meta / WhatsApp Business API:</strong> WhatsApp messaging transmission and webhook delivery.</li>
            <li><strong>Google Analytics & GTM:</strong> Web traffic telemetry (loaded only after explicit cookie consent).</li>
            <li><strong>Razorpay & Stripe:</strong> PCI-DSS compliant online payment processing.</li>
            <li><strong>Resend / SMTP Infrastructure:</strong> Transactional email dispatch.</li>
            <li><strong>n8n & Supabase / Vercel:</strong> Workflow orchestration and secure database hosting.</li>
          </ul>
        </div>
      </section>

      <section id="cookies" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Cookies & Tracking Telemetry</h2>
        <p>
          We use minimal cookies categorized into Necessary, Analytics, and Marketing. Analytics and Marketing scripts load only after you grant consent via our Cookie Banner. For full details on cookie categories and browser controls, read our <Link href="/cookie-policy" className="text-emerald-400 hover:underline">Cookie Policy</Link>.
        </p>
      </section>

      <section id="retention" className="space-y-3">
        <h2 className="text-xl font-bold text-white">6. Data Retention</h2>
        <p>
          We retain client lead information and project technical data for as long as necessary to fulfill active service contracts or comply with statutory accounting requirements (typically up to 3 years for invoicing records). Non-converted inquiry logs are automatically purged or anonymized within 90 days.
        </p>
      </section>

      <section id="your-rights" className="space-y-3">
        <h2 className="text-xl font-bold text-white">7. Your Data Rights (DPDP Act 2023 & GDPR)</h2>
        <p>
          Under the Digital Personal Data Protection Act 2023 (India) and global data laws such as GDPR, you have the right to access, correct, or request deletion of your personal data, or withdraw consent at any time.
        </p>
        <p>
          To request permanent erasure of your data, visit our dedicated <Link href="/data-deletion" className="text-emerald-400 hover:underline font-bold">Data Deletion Page</Link> or email us directly at <strong className="text-emerald-400">{SITE_CONFIG.email}</strong>.
        </p>
      </section>

      <section id="data-security" className="space-y-3">
        <h2 className="text-xl font-bold text-white">8. Data Security</h2>
        <p>
          We implement end-to-end HTTPS encryption, 256-bit SSL network transit, restricted database access keys, and non-disclosure agreements (NDAs) to protect your proprietary business workflows and contact information.
        </p>
      </section>

      <section id="children-privacy" className="space-y-3">
        <h2 className="text-xl font-bold text-white">9. Children's Privacy</h2>
        <p>
          Our services are exclusively intended for business professionals and adults aged 18 and above. We do not knowingly collect personal information from individuals under 18 years of age.
        </p>
      </section>

      <section id="international-transfers" className="space-y-3">
        <h2 className="text-xl font-bold text-white">10. International Data Transfers</h2>
        <p>
          Because we serve global clients online, information may be processed on secure servers located in India, the United States, or the European Union. We ensure all international transfers adhere to standard contractual clauses and encryption standards.
        </p>
      </section>

      <section id="policy-changes" className="space-y-3">
        <h2 className="text-xl font-bold text-white">11. Policy Changes</h2>
        <p>
          We may update this Privacy Policy periodically to reflect infrastructure improvements or legal modifications. The "Last updated" date at the top of this document indicates the effective date of the latest revisions.
        </p>
      </section>

      <section id="contact-grievance" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">12. Grievance Officer & Contact Information</h2>
        <p>
          If you have any questions, feedback, or grievances regarding data privacy, please reach out to our Grievance Officer:
        </p>
        <div className="p-4 rounded-2xl bg-[#040805] border border-tech-border space-y-1 font-mono text-xs text-slate-300">
          <p className="text-white font-bold">{SITE_CONFIG.operatorName}</p>
          <p>Operator & Data Protection Officer, {SITE_CONFIG.brandName}</p>
          <p>Location: {SITE_CONFIG.location}</p>
          <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a></p>
          <p>WhatsApp: <a href={SITE_CONFIG.whatsappUrl} className="text-emerald-400 hover:underline">{SITE_CONFIG.whatsappDisplay}</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
