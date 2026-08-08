'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, CheckCircle2, ShieldCheck, Star, Award, TrendingUp } from 'lucide-react';

export default function HeroClean() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && email) setSubmitted(true);
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-slate-50/80 via-white to-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Minimal Pill */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-luxury-sky animate-pulse" />
            <span>Digital Marketing & AI Automation Systems</span>
            <span className="text-luxury-sky font-bold">• neuralautomate.dev</span>
          </span>
        </div>

        {/* Executive Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Engineering Predictable Revenue Through <br className="hidden sm:inline" />
            <span className="text-sky-gradient">Digital Marketing & AI Automations</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We help ambitious companies dominate organic search (SEO & AEO), run high-ROAS performance ads, and automate repetitive workflows with custom AI agents.
          </p>

          {/* Minimal Instant Website Audit Search Widget */}
          <div className="max-w-xl mx-auto pt-2">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-2 rounded-xl border border-slate-200 shadow-lg flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  required
                  placeholder="Enter your website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-slate-50 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:outline-none focus:border-luxury-sky"
                />
                <input
                  type="email"
                  required
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2.5 bg-slate-50 rounded-lg text-xs sm:text-sm text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:outline-none focus:border-luxury-sky"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg font-bold text-xs text-white bg-luxury-sky hover:bg-luxury-skyHover transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <span>Analyze Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 text-center space-y-1">
                <div className="font-bold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Audit Request Submitted!
                </div>
                <p className="text-[11px] text-emerald-700">
                  Our digital marketing strategist will send the complete report of <strong>{url}</strong> to <strong>{email}</strong> within 15 minutes.
                </p>
              </div>
            )}
            <p className="text-[11px] text-slate-400 font-mono mt-2 text-center">
              ⚡ Free Instant SEO & AI Audit • No Obligation • 100% NDA Protected
            </p>
          </div>

          {/* Minimal Trust Badges */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-50 border border-slate-200">
              <Award className="w-3.5 h-3.5 text-amber-500" /> Google Premier Partner
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Meta Certified Agency
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-50 border border-slate-200">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Clutch 4.9/5 Rating
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-50 border border-slate-200">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> 99.4% Retention Rate
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
