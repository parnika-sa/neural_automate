import React from 'react';
import { Cpu, ShieldCheck, Zap, Bot, Code2, Globe } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';

export const metadata = {
  title: "About Us & Mission | NeuralAutomate.dev",
  description: "Learn how NeuralAutomate combines AI agents, n8n workflow pipelines, & Next.js architecture to empower growing businesses.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 space-y-16 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Our Mission & Story
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          Eliminating Manual Labor Through <span className="gradient-text-electric">Intelligent Automations</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto leading-relaxed">
          At <strong className="text-white">NeuralAutomate.dev</strong>, we believe modern teams shouldn't waste hundreds of hours on manual data entry, lead qualification, or copy-pasting data between SaaS tools.
        </p>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="tech-card rounded-2xl p-8 border border-tech-border">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. AI-First Efficiency</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every workflow we engineer incorporates autonomous AI agents and n8n pipelines to eliminate human friction and guarantee sub-10s response times.
            </p>
          </div>

          <div className="tech-card rounded-2xl p-8 border border-tech-border">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. 100% Code Ownership</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No proprietary vendor lock-in. You own full JSON export files for every n8n pipeline, API integration, and custom code node.
            </p>
          </div>

          <div className="tech-card rounded-2xl p-8 border border-tech-border">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Reliable Uptime SLA</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our self-hosted n8n and cloud architectures maintain 99.9% uptime with automated error retry fallbacks and instant Slack/Email alerts.
            </p>
          </div>

        </div>
      </div>

      {/* Tech Architecture Stack */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="tech-card rounded-2xl p-8 border border-tech-border text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">Our Engineering Stack</h3>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs text-slate-300">
            {['n8n Workflow Engine', 'OpenAI GPT-4o API', 'Claude 3.5 Sonnet', 'Next.js 14 App Router', 'TypeScript', 'HubSpot REST API', 'Salesforce API', 'Stripe Webhooks', 'PostgreSQL', 'Docker'].map((tech, i) => (
              <span key={i} className="px-4 py-2 rounded-xl bg-[#040705] border border-tech-border text-emerald-400">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
