import React from 'react';
import AutomationsPreview from '@/components/AutomationsPreview';
import FinalCTA from '@/components/FinalCTA';
import Link from 'next/link';

export const metadata = {
  title: "AI Automations Directory | NeuralAutomate.dev",
  description: "Explore our full suite of pre-engineered AI workflow modules: WhatsApp chatbots, lead CRM auto-sync, invoice automation, data extraction, & custom n8n pipelines.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Automations Directory
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          Intelligent AI & <span className="gradient-text-electric">n8n Workflow Modules</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
          Explore individual automation specifications, n8n webhook triggers, and seamless SaaS integration architectures.
        </p>
      </div>

      <AutomationsPreview />
      <FinalCTA />
    </div>
  );
}
