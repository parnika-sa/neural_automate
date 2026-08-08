'use client';

import React, { useState } from 'react';
import { ExternalLink, TrendingUp, Zap, ArrowUpRight, Award } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  category: 'web' | 'ai' | 'ecom' | 'marketing';
  client: string;
  metric: string;
  metricLabel: string;
  description: string;
  techStack: string[];
  gradient: string;
}

export default function CaseStudies() {
  const [filter, setFilter] = useState<string>('all');

  const cases: CaseStudy[] = [
    {
      id: '1',
      title: 'Autonomous E-Commerce System & AI Order Sync',
      category: 'ecom',
      client: 'Aura Luxe Fashion',
      metric: '+340%',
      metricLabel: 'Monthly Revenue Growth',
      description: 'Engineered a high-converting headless Shopify platform integrated with custom AI inventory prediction and automated WhatsApp shipping alerts.',
      techStack: ['Next.js 14', 'Shopify Headless', 'Make.com', 'AEO Schema'],
      gradient: 'from-purple-900/60 to-neural-dark'
    },
    {
      id: '2',
      title: 'Enterprise AI Lead Qualification Agent',
      category: 'ai',
      client: 'Vanguard SaaS',
      metric: '185 Hours',
      metricLabel: 'Saved Per Month',
      description: 'Deployed an autonomous GPT-4 powered lead responder that qualifies incoming web inquiries, drafts custom quotes, and schedules calendar calls in 10 seconds.',
      techStack: ['OpenAI API', 'Python Automation', 'HubSpot CRM', 'Zapier'],
      gradient: 'from-cyan-900/60 to-neural-dark'
    },
    {
      id: '3',
      title: 'Next.js Cyber Web Platform & GEO Ranking',
      category: 'web',
      client: 'Hyperion Logistics',
      metric: '#1 Rank',
      metricLabel: 'Across Perplexity & Google AI',
      description: 'Rebuilt legacy website into an ultra-fast Next.js platform with structured JSON-LD schemas, achieving top AI answer citations.',
      techStack: ['Next.js App Router', 'TailwindCSS', 'Framer Motion', 'JSON-LD'],
      gradient: 'from-blue-900/60 to-neural-dark'
    },
    {
      id: '4',
      title: 'High-ROAS Ad Funnel & Lead Retargeting',
      category: 'marketing',
      client: 'Apex Capital',
      metric: '4.8x ROAS',
      metricLabel: 'Ad Spend Return',
      description: 'Optimized digital marketing campaign with multi-variant CRO landing pages, dynamic Meta ad pixels, and automated lead email sequences.',
      techStack: ['CRO Funnels', 'Meta Ads Pixel', 'Klaviyo AI', 'Google Ads'],
      gradient: 'from-pink-900/60 to-neural-dark'
    }
  ];

  const filteredCases = filter === 'all' ? cases : cases.filter(c => c.category === filter);

  return (
    <section className="py-20 relative" id="work">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-purple/10 border border-neural-purple/30 text-neural-accent text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Proven Impact & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Real Client Success Stories & <span className="glow-text-cyan">Quantifiable Results</span>
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'AI Automations', value: 'ai' },
              { label: 'Web Systems', value: 'web' },
              { label: 'E-Commerce', value: 'ecom' },
              { label: 'Growth Marketing', value: 'marketing' },
            ].map(tab => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === tab.value
                    ? 'bg-neural-cyan text-neural-dark font-bold shadow-md shadow-neural-cyan/20'
                    : 'bg-neural-card border border-neural-border text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className={`glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-neural-border bg-gradient-to-b ${cs.gradient} flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-neural-cyan uppercase tracking-wider">{cs.client}</span>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{cs.metric}</span>
                  </div>
                </div>

                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-neural-cyan transition-colors">
                  {cs.title}
                </h3>
                <p className="text-xs text-emerald-400 font-mono mb-4">{cs.metricLabel}</p>

                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {cs.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neural-border/60">
                  {cs.techStack.map((tech, i) => (
                    <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded bg-neural-card border border-neural-border text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
