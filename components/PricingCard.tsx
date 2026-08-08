'use client';

import React from 'react';
import { Check, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';

export interface PricingCardProps {
  name: string;
  priceINR: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  onCheckout: (planName: string) => void;
  loadingPlan: string | null;
}

export default function PricingCard({
  name,
  priceINR,
  period,
  description,
  popular,
  features,
  ctaText,
  onCheckout,
  loadingPlan,
}: PricingCardProps) {
  const isEnterprise = name.includes('Enterprise');
  const isSelectedLoading = loadingPlan === name;

  return (
    <div className={`tech-card rounded-2xl p-6 sm:p-8 border relative flex flex-col justify-between ${
      popular ? 'border-emerald-400/60 bg-gradient-to-b from-[#0e1d13] via-[#09140c] to-[#040705] shadow-2xl scale-[1.02]' : 'border-tech-border'
    }`}>
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-[11px] font-mono font-bold tracking-wider uppercase shadow-md">
          Most Popular
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-display font-bold text-white">{name}</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">{description}</p>

        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-3xl sm:text-4xl font-display font-black text-white">{priceINR}</span>
          <span className="text-xs text-slate-400 font-mono">{period}</span>
        </div>

        <ul className="space-y-3 mb-8">
          {features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {isEnterprise ? (
        <Link
          href="/contact?plan=Enterprise"
          className="w-full py-3 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 bg-tech-card border border-tech-border text-slate-200 hover:border-emerald-500/40 hover:text-white transition-all"
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        <button
          onClick={() => onCheckout(name)}
          disabled={isSelectedLoading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 transition-all ${
            popular
              ? 'bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 hover:opacity-95'
              : 'bg-tech-card border border-tech-border text-slate-200 hover:border-emerald-500/40 hover:text-white'
          }`}
        >
          {isSelectedLoading ? (
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-spin text-slate-950" />
              <span>Initializing Razorpay...</span>
            </span>
          ) : (
            <>
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
