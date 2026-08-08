'use client';

import React from 'react';
import { Award, TrendingUp, Zap, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesSky() {
  const cases = [
    {
      title: 'E-Commerce Fashion Brand Scaling via SEO & AI Order Sync',
      client: 'Aura Luxe Fashion',
      metric: '+340%',
      metricLabel: 'Organic Sales & Traffic Growth',
      description: 'Built a high-converting Next.js storefront integrated with automated WhatsApp order updates and top Google search rankings.',
      tags: ['SEO & AEO', 'Next.js 14', 'AI Order Sync'],
      color: 'border-sky-200 bg-sky-50/30'
    },
    {
      title: 'High-ROAS Meta & Google Ad Campaign Scaling',
      client: 'Vanguard SaaS',
      metric: '4.8x ROAS',
      metricLabel: 'Return On Ad Spend',
      description: 'Redesigned acquisition landing pages, deployed dynamic pixel retargeting, and cut cost-per-lead by 38%.',
      tags: ['PPC & Meta Ads', 'CRO Funnels', 'Pixel Tracking'],
      color: 'border-blue-200 bg-blue-50/30'
    },
    {
      title: 'AI Answer Engine Dominance (ChatGPT & Perplexity)',
      client: 'Hyperion Global',
      metric: '#1 Spot',
      metricLabel: 'AI Answer Engine Citation',
      description: 'Engineered JSON-LD schema structures & entity content clusters, establishing brand authority across AI search platforms.',
      tags: ['AEO & GEO Strategy', 'JSON-LD Schema', 'Content Engine'],
      color: 'border-amber-200 bg-amber-50/30'
    },
    {
      title: 'Autonomous Lead Qualifier & CRM Automation',
      client: 'Apex Financial',
      metric: '185 Hrs',
      metricLabel: 'Saved Monthly per Team',
      description: 'Deployed an autonomous GPT-4 agent that qualifies incoming inquiries and schedules calls within 10 seconds.',
      tags: ['AI Automations', 'CRM Integration', 'Zapier / Make'],
      color: 'border-emerald-200 bg-emerald-50/30'
    }
  ];

  return (
    <section className="py-24 bg-white relative" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-luxury-sky text-xs font-mono font-bold mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Client Impact</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
              Real Client Success & <span className="text-sky-gradient">Quantifiable Results</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-luxury-sky hover:text-blue-700 transition-colors"
          >
            <span>View All Client Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((item, idx) => (
            <div
              key={idx}
              className={`glass-panel luxury-glass luxury-glass-hover rounded-3xl p-6 sm:p-8 border ${item.color} flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-luxury-sky uppercase tracking-wider">{item.client}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-mono font-extrabold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.metric}</span>
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-luxury-sky transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-bold text-emerald-600 mb-4">{item.metricLabel}</p>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span key={i} className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
