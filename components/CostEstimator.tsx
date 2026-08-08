'use client';

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldAlert, Send, Clock, Layers } from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function CostEstimator() {
  const options: ServiceOption[] = [
    { id: 'web', name: 'Custom Next.js Web System', price: 1499, description: 'High-speed web app with modern UI & CMS' },
    { id: 'ai', name: 'AI Workflow & Agent Automation', price: 1299, description: 'Auto-lead qualification, CRM sync & bots' },
    { id: 'ecom', name: 'E-Commerce Store Engineering', price: 1799, description: 'Shopify / Headless store with payment setup' },
    { id: 'marketing', name: 'Growth Marketing & Ad Funnels', price: 999, description: 'Meta/Google ads & CRO optimization' },
    { id: 'aeo', name: 'AEO & GEO AI Search Engine Ranking', price: 799, description: 'ChatGPT, Perplexity & Google AI schema' },
  ];

  const [selected, setSelected] = useState<string[]>(['web', 'ai']);
  const [timeline, setTimeline] = useState<'express' | 'standard'>('standard');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });

  const formatNum = (num: number) => num.toLocaleString('en-US');

  const toggleOption = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const rawTotal = selected.reduce((sum, id) => {
    const item = options.find(o => o.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  const finalEstimate = timeline === 'express' ? Math.round(rawTotal * 1.25) : rawTotal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl p-6 sm:p-10 border border-neural-border shadow-2xl relative my-16">
      
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-cyan/10 border border-neural-cyan/30 text-neural-cyan text-xs font-mono mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Transparent Project Estimator</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Configure Your Scope & Get Instant Estimated Pricing
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-2">
          Select the features your business needs and receive a transparent project cost estimate.
        </p>
      </div>

      {!submitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Options Selection */}
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-mono text-gray-400 block mb-1">STEP 1: SELECT REQUIRED SERVICES (A-Z)</span>
            {options.map((opt) => {
              const isChecked = selected.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center justify-between ${
                    isChecked
                      ? 'bg-neural-hover border-neural-cyan shadow-md shadow-neural-cyan/10'
                      : 'bg-neural-card/70 border-neural-border hover:bg-neural-card'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 ${
                      isChecked ? 'bg-neural-cyan text-neural-dark' : 'border border-gray-600'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{opt.name}</h4>
                      <p className="text-xs text-gray-400">{opt.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-neural-cyan shrink-0 ml-3" suppressHydrationWarning>
                    +${formatNum(opt.price)}
                  </span>
                </div>
              );
            })}

            {/* Timeline selector */}
            <div className="pt-4">
              <span className="text-xs font-mono text-gray-400 block mb-2">STEP 2: CHOOSE TURNAROUND SPEED</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTimeline('standard')}
                  className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                    timeline === 'standard'
                      ? 'bg-neural-hover border-neural-purple text-white'
                      : 'bg-neural-card border-neural-border text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-bold">Standard Delivery</div>
                    <div className="text-[11px] text-gray-400">3-4 Weeks Turnaround</div>
                  </div>
                  <Clock className="w-4 h-4 text-neural-purple" />
                </button>

                <button
                  type="button"
                  onClick={() => setTimeline('express')}
                  className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between ${
                    timeline === 'express'
                      ? 'bg-neural-hover border-neural-cyan text-white'
                      : 'bg-neural-card border-neural-border text-gray-400'
                  }`}
                >
                  <div>
                    <div className="font-bold">Express Launch</div>
                    <div className="text-[11px] text-neural-cyan">10-14 Days (+25% Speed)</div>
                  </div>
                  <Sparkles className="w-4 h-4 text-neural-cyan" />
                </button>
              </div>
            </div>
          </div>

          {/* Pricing & Inquiry Submission Form */}
          <div className="lg:col-span-5 glass-panel rounded-xl p-6 border border-neural-border flex flex-col justify-between bg-neural-dark">
            <div>
              <span className="text-xs text-gray-400 font-mono block uppercase">ESTIMATED INVESTMENT</span>
              <div className="text-4xl font-display font-extrabold text-white mt-1" suppressHydrationWarning>
                ${formatNum(finalEstimate)}
                <span className="text-xs font-normal text-gray-400 ml-2">USD (One-time)</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2">
                Includes complete setup, deployment on custom domain `neuralautomate.dev`, source code access, & 30 days post-launch support.
              </p>

              {/* Instant Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neural-card border border-neural-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neural-cyan"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Business Email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neural-card border border-neural-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neural-cyan"
                />
                <textarea
                  rows={2}
                  placeholder="Any specific feature requirements?"
                  value={formData.details}
                  onChange={e => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neural-card border border-neural-border text-xs text-white placeholder-gray-500 focus:outline-none focus:border-neural-cyan resize-none"
                />

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-neural-purple to-neural-cyan hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-neural-purple/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Lock In Quote & Reserve Sprint</span>
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-neural-border/60 text-[10px] text-gray-500 text-center">
              🔒 100% NDA Protection & Money-back Satisfaction Guarantee.
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <Check className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-white">Scope & Quote Submitted!</h4>
          <p className="text-gray-300 text-sm max-w-md mx-auto" suppressHydrationWarning>
            Thank you <span className="text-neural-cyan font-semibold">{formData.name}</span>. Our lead engineer will review your estimated scope of <strong className="text-white">${formatNum(finalEstimate)}</strong> and send the custom proposal to <strong className="text-white">{formData.email}</strong> within 2 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2 rounded-xl bg-neural-card border border-neural-border text-xs text-gray-300 hover:text-white"
          >
            Modify Scope Configuration
          </button>
        </div>
      )}

    </div>
  );
}
