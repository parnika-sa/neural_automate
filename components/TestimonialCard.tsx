import React from 'react';
import { Star, Quote } from 'lucide-react';

export interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  rating: number;
}

export default function TestimonialCard({ quote, name, role, company, metric, rating }: TestimonialCardProps) {
  return (
    <div className="tech-card rounded-2xl p-6 sm:p-8 border border-tech-border flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 text-amber-400">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {metric}
          </span>
        </div>

        <Quote className="w-7 h-7 text-emerald-500/30 mb-3" />
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
          "{quote}"
        </p>
      </div>

      <div className="pt-4 border-t border-tech-border/60">
        <div className="font-display font-bold text-white text-sm">{name}</div>
        <div className="text-xs text-emerald-400 font-mono">{role}, {company}</div>
      </div>
    </div>
  );
}
