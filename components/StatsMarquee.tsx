'use client';

import React from 'react';
import { Award, TrendingUp, Zap, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function StatsMarquee() {
  const stats = [
    { label: "Keywords Ranked #1", value: "10,000+", icon: TrendingUp, color: "text-luxury-sky" },
    { label: "Client Revenue Generated", value: "$15M+", icon: Award, color: "text-emerald-600" },
    { label: "Workflow Labor Hours Saved", value: "80%", icon: Zap, color: "text-blue-600" },
    { label: "ChatGPT & Perplexity AEO Rank", value: "#1 Spot", icon: Sparkles, color: "text-amber-500" },
    { label: "Clutch Verified Rating", value: "4.9/5", icon: Star, color: "text-amber-400" },
    { label: "Client Retention Rate", value: "99.4%", icon: ShieldCheck, color: "text-sky-600" },
  ];

  return (
    <div className="w-full bg-slate-900 text-white py-5 overflow-hidden border-y border-slate-800 shadow-xl">
      <div className="flex w-max animate-marquee space-x-12">
        {/* Double the list for infinite seamless marquee loop */}
        {[...stats, ...stats].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700">
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-white leading-none">{item.value}</span>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{item.label}</span>
              </div>
              <span className="text-slate-700 ml-8 text-xl font-light">/</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
