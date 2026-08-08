import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FinalCTA from '@/components/FinalCTA';
import { detailedCases } from '@/lib/case-studies';

export const metadata = {
  title: "Case Studies & Client ROI | NeuralAutomate.dev",
  description: "Detailed client case studies showing how NeuralAutomate automated lead qualification, cut response latency from 4 hours to 10 seconds, & saved 185 hours monthly.",
};

export default function CaseStudiesPage() {
  return (
    <div className="pt-28 pb-16 space-y-16 text-white">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
          Quantifiable Client Impact
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          Detailed Case Studies & <span className="gradient-text-electric">n8n Automation ROI</span>
        </h1>
        <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto">
          Read real-world case studies detailing how autonomous AI workflows eliminate manual friction and accelerate revenue.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {detailedCases.map((item) => (
            <div key={item.slug} className="tech-card rounded-2xl p-6 sm:p-8 border border-tech-border flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">{item.client}</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-bold text-emerald-400 mb-4">{item.metricLabel}</p>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-tech-border/60">
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:text-white transition-colors"
                >
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}
