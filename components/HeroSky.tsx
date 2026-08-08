'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, ShieldCheck, Sparkles, Star, Award, TrendingUp, CheckCircle } from 'lucide-react';

export default function HeroSky() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl && email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 overflow-hidden sky-grid-pattern">
      
      {/* Background Soft Sky Blue Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-200/40 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[250px] bg-blue-200/30 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-sky-200 shadow-md shadow-sky-100 text-xs font-mono font-bold text-slate-800">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-sky opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-sky"></span>
            </span>
            <span>Next-Gen Digital Marketing & AI Agency</span>
            <span className="text-luxury-sky font-bold">neuralautomate.dev</span>
          </div>
        </div>

        {/* Headline with Word Highlights */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Scale Your Revenue with Data-Driven <br className="hidden sm:inline" />
            <span className="word-highlight">Digital Marketing</span> & <span className="word-highlight">AI Automations</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We help ambitious brands dominate organic search (SEO & AEO), execute high-ROAS ad campaigns, and automate 80% of repetitive workflows using custom AI agents.
          </p>

          {/* Hero Instant Website Audit Form Box (SEODiscovery Style) */}
          <div className="max-w-2xl mx-auto pt-4">
            {!submitted ? (
              <form onSubmit={handleAuditSubmit} className="bg-white rounded-2xl p-2.5 sm:p-3 border border-sky-200 shadow-xl shadow-sky-900/5 flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <Search className="w-4 h-4 text-luxury-sky shrink-0" />
                  <input
                    type="url"
                    required
                    placeholder="Enter your website URL (e.g. mysite.com)"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="email"
                    required
                    placeholder="Your work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-luxury-sky to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all shadow-md shadow-sky-500/25 shrink-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Analyze Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                <div className="text-emerald-700 font-bold text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Audit Report Generated!
                </div>
                <p className="text-xs text-emerald-600">
                  Our digital strategist will send a free comprehensive audit of <strong>{websiteUrl}</strong> to <strong>{email}</strong> within 15 minutes.
                </p>
              </div>
            )}
            <p className="text-[11px] text-slate-500 font-mono mt-2">
              ⚡ Free Instant SEO & AI Audit • No Credit Card Required • NDA Guaranteed
            </p>
          </div>

          {/* Trust Highlights & Industry Certifications */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-xs text-slate-600 font-semibold">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <Award className="w-4 h-4 text-amber-500" /> Google Premier Partner
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" /> Meta Certified Agency
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> Clutch 4.9/5 Rating
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> 99.4% Client Retention
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
