'use client';

import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function RoiCalculator() {
  const [weeklyHours, setWeeklyHours] = useState<number>(30);
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(45);

  const formatNum = (num: number) => num.toLocaleString('en-US');

  // Calculations
  const totalMonthlyHours = weeklyHours * 4.33 * teamSize;
  const automatedHoursSaved = Math.round(totalMonthlyHours * 0.75); // 75% automation benchmark
  const monthlySavings = Math.round(automatedHoursSaved * hourlyRate);
  const annualSavings = monthlySavings * 12;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-purple/10 border border-neural-purple/30 text-neural-accent text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Calculate How Much Time & Money <span className="glow-text-cyan">NeuralAutomate</span> Saves You
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            Adjust the sliders below to see real projected cost savings when automating manual workflows, lead routing, and e-commerce tasks.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Panel */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-neural-border space-y-6">
            
            {/* Slider 1: Weekly Hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <label className="text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neural-cyan" />
                  <span>Manual Tasks (Hours/Week per Person)</span>
                </label>
                <span className="text-neural-cyan font-mono font-bold text-base">{weeklyHours} hrs/wk</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                step="5"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full h-2 bg-neural-card rounded-lg appearance-none cursor-pointer accent-neural-cyan"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>5 hrs</span>
                <span>40 hrs</span>
                <span>80 hrs</span>
              </div>
            </div>

            {/* Slider 2: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <label className="text-gray-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-neural-purple" />
                  <span>Team Size Impacted</span>
                </label>
                <span className="text-neural-purple font-mono font-bold text-base">{teamSize} People</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-neural-card rounded-lg appearance-none cursor-pointer accent-neural-purple"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>1 member</span>
                <span>25 members</span>
                <span>50 members</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <label className="text-gray-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Average Hourly Labor Cost ($)</span>
                </label>
                <span className="text-emerald-400 font-mono font-bold text-base">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-neural-card rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                <span>$20/hr</span>
                <span>$85/hr</span>
                <span>$150/hr</span>
              </div>
            </div>

            {/* Included Automations Checkmarks */}
            <div className="pt-4 border-t border-neural-border/60 space-y-2">
              <span className="text-xs text-gray-400 font-mono block">WHAT NEURAL AUTOMATE BUILDS FOR YOU:</span>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-neural-cyan" /> 24/7 AI Lead Responder</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-neural-cyan" /> Auto Invoice & Order Sync</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-neural-cyan" /> Next.js High Speed Web</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-neural-cyan" /> ChatGPT & SearchGPT AEO</span>
              </div>
            </div>

          </div>

          {/* Results Output Box */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-6 sm:p-8 border border-neural-cyan/40 bg-gradient-to-b from-neural-card/90 via-neural-dark to-[#090d18] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-4">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-3 h-3" /> Projected Impact
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">ESTIMATED HOURS SAVED / MONTH</span>
                <div className="text-4xl sm:text-5xl font-display font-extrabold text-white mt-1 flex items-baseline gap-2" suppressHydrationWarning>
                  <span>{formatNum(automatedHoursSaved)}</span>
                  <span className="text-lg font-normal text-neural-cyan">Hours/mo</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neural-border">
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">MONTHLY COST SAVINGS</span>
                  <div className="text-2xl font-display font-bold text-emerald-400 mt-1" suppressHydrationWarning>
                    ${formatNum(monthlySavings)}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-mono">ANNUAL ROI SAVINGS</span>
                  <div className="text-2xl font-display font-bold glow-text-cyan mt-1" suppressHydrationWarning>
                    ${formatNum(annualSavings)}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neural-purple/10 border border-neural-purple/30 text-xs text-gray-300 leading-relaxed">
                🚀 <strong className="text-white">Guaranteed Delivery:</strong> Our custom Web Systems & AI Workflows pay for themselves within 30-60 days of launch.
              </div>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-medium text-white bg-gradient-to-r from-neural-purple via-neural-cyan to-neural-blue hover:opacity-95 transition-all shadow-xl shadow-neural-purple/20 hover:-translate-y-0.5"
              >
                <span>Claim Your Custom Automation Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
