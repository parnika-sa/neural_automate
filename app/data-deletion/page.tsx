import { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import DataDeletionForm from '@/components/DataDeletionForm';
import { SITE_CONFIG } from '@/lib/site-config';
import { Mail, MessageSquare, ShieldAlert, Clock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: `Data Deletion Request Policy | ${SITE_CONFIG.brandName}`,
  description: `Learn how to request deletion of your personal data, chatbot history, and submitted details from ${SITE_CONFIG.brandName}.`,
  openGraph: {
    title: `Data Deletion Policy | ${SITE_CONFIG.brandName}`,
    description: `Instructions and tools to request complete removal of your personal information.`,
    url: `${SITE_CONFIG.siteUrl}/data-deletion`,
  },
};

const tocItems = [
  { id: 'overview', title: '1. Overview' },
  { id: 'what-can-be-deleted', title: '2. What Data Can Be Deleted' },
  { id: 'data-retained', title: '3. Data We Must Retain' },
  { id: 'request-methods', title: '4. How to Request Deletion' },
  { id: 'timeline', title: '5. Processing Timeline' },
  { id: 'deletion-form', title: '6. Direct Request Form' },
];

export default function DataDeletionPage() {
  return (
    <LegalLayout
      title="Data Deletion Policy & Request"
      subtitle={`Instructions and automated tools to request complete erasure of your personal data at ${SITE_CONFIG.brandName}.`}
      toc={tocItems}
    >
      {/* 1. OVERVIEW */}
      <section id="overview" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">1. Overview</h2>
        <p>
          At <strong className="text-slate-200">{SITE_CONFIG.brandName}</strong> (operated by {SITE_CONFIG.operatorName}), we respect your right to control your personal data. In accordance with applicable data protection regulations including the India DPDP Act 2023 and GDPR, you can request the permanent deletion of your stored personal information at any time.
        </p>
        <p>
          This document explains what data can be erased, what limited information we are required to retain, and the exact steps to submit your deletion request.
        </p>
      </section>

      {/* 2. WHAT DATA CAN BE DELETED */}
      <section id="what-can-be-deleted" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">2. What Data Can Be Deleted</h2>
        <p>Upon receiving a verified request, we will permanently purge the following records from our active systems and databases:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-300">
          <li><strong>WhatsApp Chatbot Conversations:</strong> Chat logs, requirement details, and user identifiers captured by our automated assistants (such as NEO).</li>
          <li><strong>Contact & Demo Submissions:</strong> Form entries including your name, work email, phone number, company name, and project notes.</li>
          <li><strong>Marketing Communications:</strong> Your email address from any active update or newsletter lists.</li>
          <li><strong>Analytics Identifiers:</strong> Associated IP logs and session cookies linked to your identifier.</li>
        </ul>
      </section>

      {/* 3. DATA WE MUST RETAIN */}
      <section id="data-retained" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">3. Data We Must Retain</h2>
        <p>Some limited information cannot be deleted immediately due to statutory, tax, or legal compliance obligations:</p>
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-300">
            <ShieldAlert className="w-4 h-4" /> Legal Retention Exceptions
          </div>
          <p>
            We retain payment receipts, invoice history, and transaction logs processed through Razorpay or Stripe as required by Indian tax and accounting standards. These financial records do not contain sensitive credentials and are kept securely for the legally mandated period.
          </p>
        </div>
      </section>

      {/* 4. REQUEST METHODS */}
      <section id="request-methods" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">4. How to Request Deletion</h2>
        <p>You can initiate a data deletion request through any of the following channels:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <a
            href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Data Deletion Request')}`}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">Email Request</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Send an email to <span className="text-slate-300">{SITE_CONFIG.email}</span> with the subject line <strong>"Data Deletion Request"</strong> and include your registered email/phone.
            </p>
          </a>

          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">WhatsApp Support</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Message us directly at <span className="text-slate-300">{SITE_CONFIG.whatsappDisplay}</span> requesting deletion of your chatbot chat history.
            </p>
          </a>
        </div>
      </section>

      {/* 5. TIMELINE */}
      <section id="timeline" className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-100">5. Processing Timeline</h2>
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Clock className="w-4 h-4" /> Within 30 Calendar Days
          </div>
          <p className="text-sm text-slate-300">
            We process and complete all verified data deletion requests within <strong>30 days</strong> of receipt. Once finalized, you will receive a confirmation email verifying that your records have been permanently erased.
          </p>
        </div>
      </section>

      {/* 6. DIRECT REQUEST FORM */}
      <section id="deletion-form" className="space-y-4 pt-4">
        <h2 className="text-2xl font-bold text-slate-100">6. Submit a Request Online</h2>
        <p className="text-slate-300">
          Fill out the quick form below to send an automated deletion request directly to our team.
        </p>
        <DataDeletionForm />
      </section>
    </LegalLayout>
  );
}
