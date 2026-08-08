'use client';

import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Cpu } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#040705] relative overflow-hidden" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="tech-card rounded-3xl p-8 sm:p-14 border border-emerald-500/40 bg-gradient-to-r from-tech-card via-[#0b1c11] to-[#040705] text-center relative overflow-hidden shadow-2xl">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/15 blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Automate Your Business?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Transform Your Manual Operations Into an <br />
              <span className="gradient-text-electric">Autonomous AI Revenue Machine</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Book a free 15-minute consultation. We'll map your manual workflow bottlenecks and design a custom n8n & AI agent pipeline for your team.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="mailto:info@neuralautomate.dev"
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>Book a Free Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Obligation</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24hr Proposal Turnaround</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% NDA Guaranteed</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
