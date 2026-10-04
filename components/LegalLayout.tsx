'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, ChevronDown, ChevronUp, Clock, HelpCircle, MessageSquare } from 'lucide-react';
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
    <article className="pt-28 pb-24 text-white relative min-h-screen bg-[#040705] tech-grid-pattern selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Navigation Back Link */}
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <header className="space-y-4 border-b border-emerald-500/20 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Legal Compliance
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              Last updated: {SITE_CONFIG.legalLastUpdated}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </header>

        {/* Mobile Collapsible Table of Contents */}
        {toc.length > 0 && (
          <div className="lg:hidden rounded-2xl p-4 border border-emerald-500/30 bg-[#07120a]/90 backdrop-blur-md shadow-xl">
            <button
              type="button"
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full flex items-center justify-between text-xs font-mono font-bold text-emerald-400 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Table of Contents ({toc.length} Sections)</span>
              </span>
              {mobileTocOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {mobileTocOpen && (
              <ul className="mt-3 pt-3 border-t border-emerald-500/20 space-y-2 text-xs text-slate-300 font-mono">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMobileTocOpen(false)}
                      className="hover:text-emerald-400 transition-colors block py-1 border-l-2 border-transparent hover:border-emerald-400 pl-2"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Main Content Layout: Desktop Clean Vertical Line TOC + Borderless Content Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Desktop Sticky Table of Contents (Clean Documentation Sidebar) */}
          {toc.length > 0 && (
            <aside className="hidden lg:block lg:col-span-4 sticky top-28 h-fit space-y-6">
              <div className="border-l border-emerald-500/20 pl-4 space-y-4">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>On This Page</span>
                </div>

                <nav className="space-y-1 text-xs font-mono">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1.5 text-slate-400 hover:text-emerald-400 hover:pl-1 transition-all truncate border-l border-transparent hover:border-emerald-400"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Contact Box in Sidebar */}
              <div className="p-4 rounded-2xl bg-[#07120a] border border-emerald-500/20 space-y-2 text-xs">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>Questions about our policies?</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Our compliance and legal desk is available to assist you.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 hover:underline pt-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Contact Legal Desk →</span>
                </Link>
              </div>
            </aside>
          )}

          {/* Right Main Article Content (Borderless Clean Typography) */}
          <main className={toc.length > 0 ? "lg:col-span-8 space-y-10" : "lg:col-span-12 space-y-10"}>
            <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl font-sans [&>section]:scroll-mt-32 [&>section]:space-y-4 [&>section]:border-b [&>section]:border-emerald-500/10 [&>section]:pb-8">
              {children}
            </div>
          </main>

        </div>

      </div>
    </article>
  );
}

