import React from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';

export default function CaseStudiesClean() {
  const cases = [
    {
      title: 'E-Commerce Fashion Organic Traffic & AI Order Sync',
      client: 'Aura Luxe Fashion',
      metric: '+340%',
      metricLabel: 'Organic Sales & Traffic Growth',
      description: 'Built a high-converting Next.js storefront integrated with automated WhatsApp shipping alerts and top Google search rankings.',
      tags: ['SEO & AEO', 'Next.js 14', 'AI Sync']
    },
    {
      title: 'High-ROAS Paid Acquisition & Ad Retargeting',
      client: 'Vanguard SaaS',
      metric: '4.8x ROAS',
      metricLabel: 'Return On Ad Spend',
      description: 'Redesigned acquisition landing pages, deployed dynamic Meta pixel retargeting, and cut cost-per-lead by 38%.',
      tags: ['PPC & Meta Ads', 'CRO Funnels']
    },
    {
      title: 'AI Answer Engine Dominance (ChatGPT & Perplexity)',
      client: 'Hyperion Global',
      metric: '#1 Spot',
      metricLabel: 'AI Answer Engine Citation',
      description: 'Engineered JSON-LD schema structures & entity content clusters, establishing brand authority across AI search engines.',
      tags: ['AEO & GEO Strategy', 'JSON-LD Schema']
    },
    {
      title: 'Autonomous Lead Qualification & CRM Sync',
      client: 'Apex Financial',
      metric: '185 Hrs',
      metricLabel: 'Saved Monthly per Team',
      description: 'Deployed an autonomous GPT-4 agent that qualifies incoming inquiries and schedules calls within 10 seconds.',
      tags: ['AI Automations', 'HubSpot CRM']
    }
  ];

  return (
    <section className="py-20 bg-white" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-luxury-sky uppercase tracking-widest px-3 py-1 rounded bg-sky-50 border border-sky-100">
              Proven Results
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mt-3">
              Client Success Stories & <span className="text-sky-gradient">Metrics</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-sky hover:underline"
          >
            <span>View All Client Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((item, idx) => (
            <div key={idx} className="clean-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{item.client}</span>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{item.metric}</span>
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-bold text-emerald-600 mb-3">{item.metricLabel}</p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                {item.tags.map((t, i) => (
                  <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-600">
                    {t}
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
