import React from 'react';
import Link from 'next/link';
import { detailedCases } from '@/lib/case-studies';
import { ArrowLeft, CheckCircle2, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return detailedCases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = detailedCases.find((c) => c.slug === params.slug);
  if (!item) return { title: 'Case Study Not Found | NeuralAutomate.dev' };

  return {
    title: `${item.title} | NeuralAutomate.dev`,
    description: item.summary,
  };
}

export default function CaseStudyDetail({ params }: { params: { slug: string } }) {
  const item = detailedCases.find((c) => c.slug === params.slug);
  if (!item) return notFound();

  return (
    <article className="pt-28 pb-20 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {item.client}
            </span>
            <span className="text-xs font-mono text-slate-400">• Quantified Benchmark Result</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            {item.title}
          </h1>
        </div>

        {/* Benchmark Box */}
        <div className="p-6 rounded-2xl bg-[#08160c] border border-emerald-500/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Zap className="w-4 h-4" />
            <span>PRIMARY METRIC IMPACT:</span>
          </div>
          <span className="text-xl font-display font-extrabold text-white">{item.metric}</span>
        </div>

        {/* Article Body */}
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-tech-border space-y-6 text-slate-300 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Executive Summary</h2>
            <p className="text-sm text-slate-400">{item.summary}</p>
          </div>

          <div className="pt-4 border-t border-tech-border">
            <h2 className="text-xl font-bold text-white mb-2">The Challenge</h2>
            <p className="text-sm text-slate-400">{item.challenge}</p>
          </div>

          <div className="pt-4 border-t border-tech-border">
            <h2 className="text-xl font-bold text-white mb-2">The NeuralAutomate Solution</h2>
            <p className="text-sm text-slate-400">{item.solution}</p>
          </div>

          <div className="pt-4 border-t border-tech-border">
            <h2 className="text-xl font-bold text-white mb-4">Key Results & Outcomes</h2>
            <ul className="space-y-2.5">
              {item.results.map((res, i) => (
                <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Footer */}
          <div className="mt-8 p-6 rounded-xl bg-[#040705] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">Ready for similar automation results?</h4>
              <p className="text-xs text-slate-400">Book a 15-minute consultation with our automation engineers.</p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 font-bold text-xs shrink-0"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
