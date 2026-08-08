'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Sparkles, CheckCircle2, Database, Send, Workflow } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#040705] text-white overflow-hidden tech-grid-pattern">
      
      {/* Background Emerald Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-500/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-teal-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tech-card border border-tech-border text-xs font-mono text-slate-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Next-Gen AI Business Process Automation</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              Automate Repetitive <br className="hidden sm:inline" />
              Business Tasks with <br className="hidden sm:inline" />
              <span className="gradient-text-electric">Intelligent AI Workflows</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Eliminate manual data entry, streamline lead routing, and connect your CRM, WhatsApp, and billing pipelines into autonomous 24/7 AI systems.
            </p>

            {/* Dual CTAs */}
            <div className="w-full max-w-sm sm:max-w-none mx-auto lg:mx-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="#services"
                className="w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 tracking-wide"
              >
                <span>See Automations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-4 sm:py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-tech-card border border-tech-border hover:border-emerald-500/50 hover:text-white transition-all flex items-center justify-center gap-2 tracking-wide"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Book a Free Consultation</span>
              </Link>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> n8n & Webhook Ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> Sub-10s Latency</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> 100% Custom Workflows</span>
            </div>

          </div>

          {/* Right Column: Workflow SVG Diagram */}
          <div className="lg:col-span-5">
            <div className="tech-card rounded-2xl p-6 border border-tech-border shadow-2xl relative bg-[#07120a]/90">
              
              <div className="flex items-center justify-between border-b border-tech-border pb-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Workflow className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>AI Automation Diagram</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  STATUS: ACTIVE
                </span>
              </div>

              {/* Workflow Diagram Nodes */}
              <div className="space-y-4">
                
                {/* Node 1 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a170e] border border-tech-border">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">1. Trigger: Inquiry Received</div>
                    <div className="text-[10px] font-mono text-slate-400">Form / WhatsApp / Webhook</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 animate-pulse" />
                </div>

                {/* Node 2 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">2. AI Agent Qualification</div>
                    <div className="text-[10px] font-mono text-emerald-400">Parses Intent & Drafts Proposal</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-0.5 h-6 bg-gradient-to-b from-teal-400 to-emerald-400 animate-pulse" />
                </div>

                {/* Node 3 */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0a170e] border border-tech-border">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">3. CRM Sync & Booking</div>
                    <div className="text-[10px] font-mono text-slate-400">HubSpot / Stripe / Calendar</div>
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-tech-border/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>n8n Pipeline Architecture</span>
                <span className="text-emerald-400 font-bold">100% Automated</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
