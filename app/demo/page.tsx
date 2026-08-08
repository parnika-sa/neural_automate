import React from 'react';
import DemoTeaser from '@/components/DemoTeaser';
import FinalCTA from '@/components/FinalCTA';
import { Workflow } from 'lucide-react';

export const metadata = {
  title: "Live Automation Demo Sandbox | NeuralAutomate.dev",
  description: "Test simulated n8n webhook triggers and OpenAI lead qualification pipelines in our live automation sandbox.",
};

export default function DemoPage() {
  return (
    <div className="pt-28 pb-16 space-y-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Interactive Testing Sandbox
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          Live <span className="gradient-text-electric">n8n Automation Playground</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
          In Phase 4, visitors will be able to trigger real n8n webhook pipelines directly from this interactive interface.
        </p>
      </div>

      <DemoTeaser />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tech-card rounded-2xl p-8 border border-tech-border space-y-4 bg-[#07120a]">
          <div className="flex items-center justify-between border-b border-tech-border pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-emerald-400" />
              <span>n8n Webhook Architecture Readiness</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">PHASE 4 PREPARED</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            This demo sandbox is pre-configured with client-side API listeners. In Phase 4, we will bind live POST endpoints:
          </p>

          <div className="font-mono text-xs text-slate-300 space-y-2 bg-[#040705] p-4 rounded-xl border border-tech-border">
            <div className="text-emerald-400 font-bold">// Future Live Webhook Endpoint</div>
            <div>POST https://n8n.neuralautomate.dev/webhook/v1/live-demo</div>
            <div className="text-slate-500">// Returns: &#123; status: "QUALIFIED", score: 98.4, latency: "14ms" &#125;</div>
          </div>
        </div>
      </section>

    </div>
  );
}
