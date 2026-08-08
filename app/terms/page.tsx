import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: "Terms of Service | NeuralAutomate.dev",
  description: "Terms of Service for NeuralAutomate.dev - Service Level Agreements (SLA), workflow code ownership, & month-to-month subscription terms.",
};

export default function TermsPage() {
  return (
    <article className="pt-28 pb-20 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="space-y-3">
          <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            Terms & Conditions
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-slate-400">Last Updated: August 2026</p>
        </div>

        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-tech-border space-y-6 text-slate-300 text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">1. Scope of Services</h2>
            <p>
              NeuralAutomate provides custom AI business process automation engineering, self-hosted or cloud n8n pipeline setup, API webhook integrations, and maintenance support as outlined in your selected tier.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">2. Full Code & Workflow Ownership</h2>
            <p>
              Upon full payment of your monthly subscription or project invoice, you own 100% of all JSON n8n pipeline export files, custom JavaScript/Python code nodes, and custom API logic created for your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">3. Cancellation & Guarantee Policy</h2>
            <p>
              All subscription tiers operate on a month-to-month basis with zero long-term lock-in contracts. You may pause or cancel your service at any time with a 30-day written notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
            <p>
              For legal inquiries regarding these terms, reach us at <strong className="text-emerald-400">info@neuralautomate.dev</strong>.
            </p>
          </section>
        </div>

      </div>
    </article>
  );
}
