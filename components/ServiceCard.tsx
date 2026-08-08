import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export interface ServiceCardProps {
  id: string;
  icon: any;
  title: string;
  description: string;
  badge: string;
  highlights: string[];
}

export default function ServiceCard({ id, icon: Icon, title, description, badge, highlights }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${id}`}
      className="tech-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 block"
    >
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#0a160d] border border-tech-border text-emerald-400">
            {badge}
          </span>
        </div>

        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
          {description}
        </p>

        <ul className="space-y-2 mb-6">
          {highlights.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-tech-border/60 flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 group-hover:text-white transition-colors">
        <span>Learn More & Specs</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
