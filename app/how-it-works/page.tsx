import React from 'react';
import HowItWorks from '@/components/HowItWorks';
import FinalCTA from '@/components/FinalCTA';
import { Workflow, CheckCircle2, ShieldCheck, Cpu, Code2, Database } from 'lucide-react';

export const metadata = {
  title: "How It Works & n8n Methodology | NeuralAutomate.dev",
  description: "Learn how NeuralAutomate maps your business manual bottlenecks, engineers custom n8n pipelines, and deploys autonomous AI agents.",
};

export default function HowItWorksPage() {
  const deepPhases = [
    {
      step: "Phase 1: Workflow Mapping & Audit",
      description: "We analyze your manual spreadsheets, CRM bottlenecks, and email inquiries to design an architectural map of triggers and endpoints.",
      icon: Workflow,
      items: ["Process bottleneck audit", "Webhook trigger mapping", "Data schema design"]
    },
    {
      step: "Phase 2: Custom n8n Engineering",
      description: "Our automation engineers build self-hosted or cloud n8n pipelines, OpenAI/Claude prompt chains, and custom JavaScript webhook handlers.",
      icon: Code2,
      items: ["n8n workflow node setup", "API key authentication", "Error handling & retries"]
    },
    {
      step: "Phase 3: Testing & Staging",
      description: "We run simulated data payloads through the automation pipeline to verify sub-10s latency and zero data loss before going live.",
      icon: Database,
      items: ["Sandbox payload testing", "Edge case validation", "Slack/Email alert triggers"]
    },
    {
      step: "Phase 4: Live Deployment & SLA",
      description: "We deploy the automation to production on custom domain `neuralautomate.dev` with active 24/7 uptime monitoring and SLA guarantees.",
      icon: Cpu,
      items: ["24/7 uptime monitoring", "Full source code handover", "Monthly optimization audits"]
    }
  ];

  return (
    <div className="pt-28 pb-16 space-y-16 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Full Engineering Methodology
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          From Manual Bottlenecks to <span className="gradient-text-electric">Autonomous AI Systems</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
          A step-by-step breakdown of how NeuralAutomate engineers, tests, and deploys scalable n8n workflows.
        </p>
      </div>

      <HowItWorks />

      {/* Deep Phase Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Deep-Dive Engineering Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deepPhases.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div key={idx} className="tech-card rounded-2xl p-6 sm:p-8 border border-tech-border space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{p.step}</h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {p.description}
                </p>

                <ul className="space-y-2 pt-2 border-t border-tech-border/60">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
