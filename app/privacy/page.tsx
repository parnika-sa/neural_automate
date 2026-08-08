import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | NeuralAutomate.dev",
  description: "Privacy Policy for NeuralAutomate.dev - Learn how we collect, protect, and handle data across our website and AI workflow automation systems.",
};

export default function PrivacyPage() {
  return (
    <article className="pt-28 pb-20 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            Legal Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">Last Updated: August 2026</p>
        </div>

        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-tech-border space-y-6 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
            <p>
              When you submit an audit request or book a consultation on <strong>NeuralAutomate.dev</strong>, we collect your name, business email, website URL, and project requirements. We use this data solely to prepare your technical audit and configure your n8n workflow integrations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Data Confidentiality & NDA Protection</h2>
            <p>
              We treat all client workflow data, API keys, and internal CRM structures with strict 100% confidentiality. We never sell, share, or monetize your business data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Cookies & Analytics</h2>
            <p>
              We use minimal, privacy-focused analytical telemetry to measure website performance, sub-second load speeds, and user interactions on our pages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact Us</h2>
            <p>
              If you have any questions regarding your privacy or data protection rights, please contact our legal team at <strong className="text-emerald-400">info@neuralautomate.dev</strong>.
            </p>
          </section>
        </div>

      </div>
    </article>
  );
}
