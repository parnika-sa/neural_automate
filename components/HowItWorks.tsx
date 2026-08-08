import React from 'react';
import { MessageSquare, Cpu, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Tell Us Your Workflow",
      description: "Map your manual bottlenecks, spreadsheets, or repetitive CRM tasks in a quick 15-minute consultation call.",
      icon: MessageSquare,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10"
    },
    {
      number: "02",
      title: "We Automate & Deploy It",
      description: "We engineer custom n8n pipelines, AI agents, and secure API webhooks tailored to your tech stack.",
      icon: Cpu,
      color: "text-mint-400 border-mint-500/40 bg-teal-500/10"
    },
    {
      number: "03",
      title: "You Save Hours Every Week",
      description: "Your system runs autonomously 24/7, qualifying leads, syncing CRM data, and freeing your team to scale.",
      icon: Rocket,
      color: "text-emerald-300 border-emerald-400/40 bg-emerald-400/10"
    }
  ];

  return (
    <section className="py-24 bg-[#070e09] border-y border-tech-border relative overflow-hidden" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            3-Step Onboarding Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How <span className="gradient-text-purple">NeuralAutomate</span> Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From manual friction to autonomous execution in 3 frictionless steps.
          </p>
        </div>

        {/* 3 Horizontal Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="tech-card rounded-2xl p-8 border border-tech-border relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono font-black text-3xl text-emerald-900/60">{step.number}</span>
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${step.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-tech-border/60 flex items-center text-xs text-emerald-500/80 font-mono">
                  <span>Phase {step.number} Complete</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
