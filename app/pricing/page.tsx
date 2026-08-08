'use client';

import React, { useState } from 'react';
import PricingPreview from '@/components/PricingPreview';
import FinalCTA from '@/components/FinalCTA';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is there a separate one-time setup fee?",
      a: "No! All setup, n8n workflow configuration, API webhook architecture, and initial testing are included in your monthly plan transparently."
    },
    {
      q: "Can we cancel or adjust our plan anytime?",
      a: "Yes. All our automation plans operate on a month-to-month basis with zero lock-in contracts. You can pause, upgrade, or cancel at any time with 30 days notice."
    },
    {
      q: "How fast will our AI workflow automations be deployed?",
      a: "Core workflows (like WhatsApp bots or Lead-to-CRM auto-sync) are typically live within 10 to 14 business days. Enterprise multi-node pipelines launch within 3 weeks."
    },
    {
      q: "Do we own the custom n8n workflow source code?",
      a: "100% yes! You get full JSON export files for every n8n pipeline, custom JS/Python logic scripts, and full ownership of your automation infrastructure."
    },
    {
      q: "What support and maintenance SLA is included?",
      a: "All plans include active uptime monitoring, automatic error retry handling, and dedicated Slack/Email engineering support (48hr SLA on Starter, 24hr SLA on Growth & Enterprise)."
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-16 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Transparent Tiers & FAQ
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          Predictable Pricing for <span className="gradient-text-electric">AI Automations</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
          Simple monthly investment tiers with zero hidden setup fees and full n8n source code ownership.
        </p>
      </div>

      {/* Pricing Cards Component */}
      <PricingPreview />

      {/* Interactive FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Everything You Need to Know About Our Plans
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="tech-card rounded-2xl p-6 border border-tech-border cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs">Q:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <button className="text-emerald-400 p-1">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-tech-border/60 pt-3">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
