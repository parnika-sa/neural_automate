'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Users, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RoiCalculatorSky() {
  const [monthlyTraffic, setMonthlyTraffic] = useState<number>(25000);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [customerValue, setCustomerValue] = useState<number>(150);

  // Helper for deterministic number formatting across SSR and Client
  const formatNum = (num: number) => {
    return num.toLocaleString('en-US');
  };

  // Calculations
  const currentLeads = Math.round(monthlyTraffic * (conversionRate / 100));
  const currentRevenue = currentLeads * customerValue;

  // Growth Projections with NeuralAutomate (Average +180% Organic Boost + CRO)
  const projectedTraffic = Math.round(monthlyTraffic * 2.2);
  const projectedConversionRate = Number((conversionRate * 1.4).toFixed(1));
  const projectedLeads = Math.round(projectedTraffic * (projectedConversionRate / 100));
  const projectedRevenue = projectedLeads * customerValue;

  const monthlyRevenueGain = projectedRevenue - currentRevenue;
  const annualRevenueGain = monthlyRevenueGain * 12;

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-luxury-sky text-xs font-mono font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Growth Modeler</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Calculate Your Business <span className="text-sky-gradient">Revenue & Traffic Growth</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base">
            Adjust the sliders to simulate projected traffic increases and conversion boosts delivered by our SEO, PPC & AI Automation systems.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Controls Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            
            {/* Slider 1: Monthly Traffic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-luxury-sky" />
                  <span>Monthly Website Visitors</span>
                </label>
                <span className="text-luxury-sky font-mono font-extrabold text-base" suppressHydrationWarning>
                  {formatNum(monthlyTraffic)}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="150000"
                step="2500"
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-luxury-sky"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>2,000</span>
                <span>75,000</span>
                <span>150,000</span>
              </div>
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Current Conversion Rate (%)</span>
                </label>
                <span className="text-blue-600 font-mono font-extrabold text-base">{conversionRate}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8.0"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0.5%</span>
                <span>4.0%</span>
                <span>8.0%</span>
              </div>
            </div>

            {/* Slider 3: Customer Order Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Average Customer Value ($)</span>
                </label>
                <span className="text-emerald-600 font-mono font-extrabold text-base">${customerValue}</span>
              </div>
              <input
                type="range"
                min="25"
                max="800"
                step="25"
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>$25</span>
                <span>$400</span>
                <span>$800</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs text-slate-500 font-mono block">INCLUDED AGENCY ENGINE:</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-luxury-sky" /> Google & AEO #1 Rank</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-luxury-sky" /> High-ROAS Meta Ads</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-luxury-sky" /> Sub-Second Next.js Site</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-luxury-sky" /> 24/7 AI Lead Qualifier</span>
              </div>
            </div>

          </div>

          {/* Results Output Box */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">PROJECTED 6-MONTH REVENUE IMPACT</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" /> Calculated Growth
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">ADDITIONAL MONTHLY REVENUE</span>
              <div className="text-4xl sm:text-5xl font-display font-black text-emerald-400 mt-1" suppressHydrationWarning>
                +${formatNum(monthlyRevenueGain)}
                <span className="text-sm font-normal text-slate-400 ml-2">/month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">ANNUAL REVENUE GAIN</span>
                <div className="text-2xl font-display font-extrabold text-luxury-sky mt-1" suppressHydrationWarning>
                  +${formatNum(annualRevenueGain)}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">PROJECTED LEADS</span>
                <div className="text-2xl font-display font-extrabold text-white mt-1" suppressHydrationWarning>
                  {formatNum(projectedLeads)} <span className="text-xs text-emerald-400">(+{formatNum(projectedLeads - currentLeads)})</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              🚀 <strong className="text-white">Data-Backed Guarantee:</strong> Our SEO, performance ad funnels, and AI automations pay for themselves within 45 days.
            </div>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-luxury-sky to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all shadow-xl shadow-sky-500/20"
            >
              <span>Get Your Tailored Growth Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
