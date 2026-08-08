'use client';

import React, { useState } from 'react';
import { Calculator, Users, TrendingUp, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RoiCalculatorClean() {
  const [traffic, setTraffic] = useState<number>(25000);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [customerValue, setCustomerValue] = useState<number>(150);

  const formatNum = (num: number) => num.toLocaleString('en-US');

  const currentLeads = Math.round(traffic * (conversionRate / 100));
  const currentRevenue = currentLeads * customerValue;

  // Growth projections with NeuralAutomate (+180% Organic Boost + CRO)
  const projectedTraffic = Math.round(traffic * 2.2);
  const projectedConversionRate = Number((conversionRate * 1.4).toFixed(1));
  const projectedLeads = Math.round(projectedTraffic * (projectedConversionRate / 100));
  const projectedRevenue = projectedLeads * customerValue;

  const monthlyGain = projectedRevenue - currentRevenue;
  const annualGain = monthlyGain * 12;

  return (
    <section className="py-20 bg-slate-50/70 border-y border-slate-100" id="calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold text-luxury-sky uppercase tracking-widest px-3 py-1 rounded bg-sky-50 border border-sky-100">
            Interactive Growth Modeler
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Calculate Your Projected <span className="text-sky-gradient">Revenue Impact</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Adjust the metrics below to estimate monthly revenue growth delivered by our SEO, PPC & AI Automation systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Slider 1: Traffic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-luxury-sky" />
                  <span>Monthly Website Visitors</span>
                </label>
                <span className="text-luxury-sky font-mono font-bold" suppressHydrationWarning>{formatNum(traffic)}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="150000"
                step="2500"
                value={traffic}
                onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-luxury-sky"
              />
            </div>

            {/* Slider 2: Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Current Conversion Rate (%)</span>
                </label>
                <span className="text-blue-600 font-mono font-bold">{conversionRate}%</span>
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
            </div>

            {/* Slider 3: Customer Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <label className="text-slate-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Average Customer Value ($)</span>
                </label>
                <span className="text-emerald-600 font-mono font-bold">${customerValue}</span>
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
            </div>

          </div>

          {/* Results Output Box */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">PROJECTED GROWTH</span>
            </div>

            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">ADDITIONAL MONTHLY REVENUE</span>
              <div className="text-4xl sm:text-5xl font-display font-black text-emerald-400 mt-1" suppressHydrationWarning>
                +${formatNum(monthlyGain)}
                <span className="text-sm font-normal text-slate-400 ml-2">/month</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">ANNUAL REVENUE GAIN</span>
                <div className="text-xl font-display font-bold text-luxury-sky mt-1" suppressHydrationWarning>
                  +${formatNum(annualGain)}
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-mono">PROJECTED LEADS</span>
                <div className="text-xl font-display font-bold text-white mt-1" suppressHydrationWarning>
                  {formatNum(projectedLeads)} <span className="text-xs text-emerald-400">(+{formatNum(projectedLeads - currentLeads)})</span>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-lg font-bold text-xs text-white bg-luxury-sky hover:bg-luxury-skyHover transition-colors shadow-md"
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
