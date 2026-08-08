'use client';

import React, { useState } from 'react';
import { Search, TrendingUp, Bot, FileText, Code2, CheckCircle2, ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface TabService {
  id: string;
  tabLabel: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  deliverables: string[];
  metrics: { value: string; label: string }[];
}

export default function ServicesTabSwitcher() {
  const tabServices: TabService[] = [
    {
      id: 'seo-aeo',
      tabLabel: 'SEO & AEO Dominance',
      icon: Search,
      badge: 'Core Growth Engine',
      title: 'Dominate Google Rankings & AI Search Engines (AEO/GEO)',
      subtitle: 'Rank #1 on Google & Get Cited on ChatGPT, Perplexity, SearchGPT & Claude',
      description: 'We combine traditional technical SEO with next-generation Answer Engine Optimization (AEO). By building custom JSON-LD schema structures and semantic content clusters, we guarantee high organic search rankings and AI citations.',
      deliverables: [
        'Technical On-Page & Speed Optimization (Sub-Second Load)',
        'JSON-LD Structured Data Schema Architecture',
        'Entity Keyword Clustering & Semantic Authority Building',
        'ChatGPT & Perplexity AI Answer Engine Indexing',
        'High-Authority Backlink Acquisition & Digital PR'
      ],
      metrics: [
        { value: '+420%', label: 'Average Organic Traffic Growth' },
        { value: '#1 Spot', label: 'Top AI Answer Engine Citation' }
      ]
    },
    {
      id: 'ppc-ads',
      tabLabel: 'PPC & Performance Ads',
      icon: TrendingUp,
      badge: 'High-ROAS Funnels',
      title: 'Omnichannel Paid Media & Conversion Rate Optimization (CRO)',
      subtitle: 'Maximize Return on Ad Spend (ROAS) Across Meta, Google & LinkedIn',
      description: 'Stop burning ad budget on low-converting clicks. Our performance marketing team builds multi-stage ad funnels, custom dynamic landing pages, and AI-driven retargeting pixels to deliver maximum ROAS.',
      deliverables: [
        'Meta (Facebook & Instagram) High-Converting Ad Campaigns',
        'Google Search, Shopping & Performance Max Setup',
        'A/B Split Testing & Landing Page CRO Engineering',
        'Advanced Pixel Tracking & First-Party Data Attribution',
        'Automated Customer Lifetime Value (LTV) Nurturing'
      ],
      metrics: [
        { value: '4.8x', label: 'Average Return on Ad Spend (ROAS)' },
        { value: '-35%', label: 'Lower Cost Per Acquisition (CPA)' }
      ]
    },
    {
      id: 'ai-automation',
      tabLabel: 'AI & Workflow Automations',
      icon: Bot,
      badge: 'Efficiency Booster',
      title: 'Autonomous AI Agents & CRM Workflow Automation',
      subtitle: 'Eliminate 80% of Manual Workflows with 24/7 AI Agents',
      description: 'We connect your website, CRM, email pipelines, and payment systems using autonomous AI agents. Leads are qualified instantly in 10 seconds, custom quotes are generated, and dev sprints are reserved without human intervention.',
      deliverables: [
        'Custom GPT-4 & Claude Autonomous Lead Qualifier Agents',
        'Zapier & Make.com Webhook Integration Architecture',
        'Automated CRM Sync (HubSpot, Salesforce, Zoho)',
        'Instant Auto-Invoice & Custom Proposal Generators',
        '24/7 Intelligent Customer Service Chatbots'
      ],
      metrics: [
        { value: '185 Hrs', label: 'Saved Monthly per Team' },
        { value: '10 Sec', label: 'Instant Lead Response Latency' }
      ]
    },
    {
      id: 'content-scaling',
      tabLabel: 'Content & Brand Scaling',
      icon: FileText,
      badge: 'Authority Engine',
      title: 'High-Authority Content Marketing & Digital PR Strategy',
      subtitle: 'Turn Content into a Predictable Inbound Lead Engine',
      description: 'Our content strategists produce deeply researched, SEO-optimized articles, whitepapers, and thought leadership pieces that position your executive brand as the dominant authority in your industry.',
      deliverables: [
        'Keyword & Intent-Driven Content Roadmaps',
        'Long-Form Technical Articles & Whitepapers',
        'Digital PR & Press Release Distribution',
        'Repurposing Engines for Social & Email Newsletters',
        'SEO Copywriting for Landing Pages'
      ],
      metrics: [
        { value: '3.5x', label: 'Inbound Lead Acceleration' },
        { value: '99%', label: 'Plagiarism-Free Originality' }
      ]
    },
    {
      id: 'web-engineering',
      tabLabel: 'High-Conversion Web Systems',
      icon: Code2,
      badge: 'Performance Systems',
      title: 'Next.js 14 Custom Web & E-Commerce Engineering',
      subtitle: 'Ultra-Fast Digital Platforms Built for Sub-Second Loading',
      description: 'We build state-of-the-art Next.js 14 web platforms, headless Shopify e-commerce stores, and high-conversion landing pages engineered for 99+ Google Lighthouse scores and superior UX.',
      deliverables: [
        'Next.js 14 App Router & TypeScript Development',
        'Headless Shopify & Custom E-Commerce Integration',
        'Mobile-First Responsive UI & Micro-Animations',
        'Built-in Analytics & Lead Capture Infrastructure',
        'Sub-Second Global Edge CDN Deployment'
      ],
      metrics: [
        { value: '99/100', label: 'Google Lighthouse Speed Score' },
        { value: '<0.8s', label: 'Global Edge Page Load Time' }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<TabService>(tabServices[0]);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-luxury-sky text-xs font-mono font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Service Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Data-Driven Digital Marketing & <br />
            <span className="text-sky-gradient">AI Automation Solutions</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Click through our interactive tabs below to explore how NeuralAutomate scales your digital presence end-to-end.
          </p>
        </div>

        {/* Tab Selector Buttons Bar (SEODiscovery Style) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-2 rounded-2xl bg-slate-100 border border-slate-200/80 max-w-4xl mx-auto">
          {tabServices.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-white text-luxury-sky shadow-md shadow-sky-900/10 border border-sky-200 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-luxury-sky' : 'text-slate-400'}`} />
                <span>{tab.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Panel */}
        <div className="glass-panel luxury-glass rounded-3xl p-6 sm:p-12 border border-sky-200 shadow-2xl bg-gradient-to-br from-white via-sky-50/40 to-slate-50 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-sky-100 text-luxury-sky border border-sky-200">
                  {activeTab.badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 leading-tight">
                {activeTab.title}
              </h3>
              <p className="text-sm font-semibold text-luxury-sky font-mono">
                {activeTab.subtitle}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeTab.description}
              </p>

              {/* Key Deliverables Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">WHAT WE DELIVER & ENGINEER:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                  {activeTab.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-luxury-sky shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Link
                  href={`/contact?service=${activeTab.id}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-luxury-sky to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all shadow-md shadow-sky-500/20"
                >
                  <span>Build This System For Your Brand</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Metrics Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-sky-200 shadow-xl space-y-6">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-3">
                  PROVEN CLIENT IMPACT METRICS
                </h4>

                {activeTab.metrics.map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-3xl sm:text-4xl font-display font-extrabold text-luxury-sky">
                      {m.value}
                    </div>
                    <div className="text-xs text-slate-600 font-semibold mt-1">
                      {m.label}
                    </div>
                  </div>
                ))}

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-luxury-sky" /> Guaranteed Performance
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Every service is backed by transparent KPI dashboards and 100% money-back satisfaction benchmarks.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
