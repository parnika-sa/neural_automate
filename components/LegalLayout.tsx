'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export interface TocItem {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  toc: TocItem[];
  children: React.ReactNode;
}

// Shared Legal Layout component for Privacy, Terms, Refund Policy, Cookie Policy, etc.
export default function LegalLayout({ title, subtitle, toc, children }: LegalLayoutProps) {
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <article className="pt-28 pb-20 text-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="space-y-3 border-b border-tech-border/60 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Legal Compliance
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Last updated: {SITE_CONFIG.legalLastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Mobile Collapsible Table of Contents */}
        {toc.length > 0 && (
          <div className="lg:hidden tech-card rounded-2xl p-4 border border-tech-border bg-[#07120a]">
            <button
              type="button"
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between text-xs font-mono font-bold text-emerald-400"
            >
              <span>Table of Contents ({toc.length} Sections)</span>
              {mobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {mobileTocOpen && (
              <ul className="mt-3 pt-3 border-t border-tech-border/50 space-y-2 text-xs text-slate-300 font-mono">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:text-emerald-400 transition-colors block py-0.5"
                    >
                      • {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Main Content Layout: Desktop Sticky Sidebar + Content Column */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Desktop Sticky Table of Contents */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-1 space-y-4 sticky top-28 h-fit">
              <div className="tech-card rounded-2xl p-5 border border-tech-border bg-[#07120a] space-y-3">
                <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Table of Contents
                </h3>
                <nav className="space-y-1.5 text-xs font-mono text-slate-400">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1 hover:text-emerald-400 transition-colors truncate"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Right Main Article Content */}
          <main className={toc.length > 0 ? "lg:col-span-3 space-y-8" : "lg:col-span-4 space-y-8"}>
            <div className="tech-card rounded-3xl p-6 sm:p-10 border border-tech-border bg-[#07120a] space-y-8 text-slate-300 text-sm leading-relaxed max-w-3xl">
              {children}
            </div>
          </main>

        </div>

      </div>
    </article>
  );
}
