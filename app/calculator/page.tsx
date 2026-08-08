import React from 'react';
import RoiCalculator from '@/components/RoiCalculator';
import CostEstimator from '@/components/CostEstimator';

export const metadata = {
  title: "ROI & Time Savings Calculator | NeuralAutomate.dev",
  description: "Calculate how much manual labor hours and operational budget NeuralAutomate can save your business through AI automations and Next.js platforms.",
};

export default function CalculatorPage() {
  return (
    <div className="pt-28 pb-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          Interactive Financial Modeler
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mt-4">
          Quantify Your <span className="glow-text-cyan">Automation ROI</span>
        </h1>
        <p className="mt-4 text-gray-300 text-base max-w-2xl mx-auto">
          Test interactive scenarios to estimate labor cost savings and calculate your project scope investment.
        </p>
      </div>

      <RoiCalculator />
      <CostEstimator />
    </div>
  );
}
