import React from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Bot, Code2, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServicesGridClean() {
  const services = [
    {
      id: 'seo-aeo',
      icon: Search,
      badge: 'Organic Search & AEO',
      title: 'SEO & AI Answer Engine Optimization',
      description: 'Rank #1 on Google and ensure your brand is cited across ChatGPT, Perplexity AI, SearchGPT, and Claude with custom JSON-LD schema & semantic content.',
      deliverables: [
        'Technical On-Page & Speed SEO (Sub-Second)',
        'JSON-LD Structured Data Schema Architecture',
        'ChatGPT & Perplexity AEO Answer Indexing',
        'High-Authority Link Acquisition & Digital PR'
      ]
    },
    {
      id: 'ppc-ads',
      icon: TrendingUp,
      badge: 'Paid Acquisition',
      title: 'PPC & Performance Marketing',
      description: 'Maximize your Return on Ad Spend (ROAS) across Meta (Facebook/Instagram), Google Search, & Shopping with high-converting ad copy and CRO landing pages.',
      deliverables: [
        'Meta Ads & Performance Max Setup',
        'Conversion Rate Optimization (CRO)',
        'First-Party Pixel & Retargeting Setup',
        'Automated Customer Nurture Sequences'
      ]
    },
    {
      id: 'ai-automation',
      icon: Bot,
      badge: 'Operational Speed',
      title: 'AI & Workflow Automations',
      description: 'Automate 80% of repetitive business tasks with custom 24/7 AI lead qualification agents, Make.com/Zapier webhooks, and CRM synchronization.',
      deliverables: [
        'GPT-4 & Claude Autonomous Lead Qualifier Agents',
        'Automated CRM Sync (HubSpot, Salesforce, Zoho)',
        'Instant Custom Proposal & Invoice Generators',
        'Make.com & Zapier Custom Integration Webhooks'
      ]
    },
    {
      id: 'web-engineering',
      icon: Code2,
      badge: 'Digital Systems',
      title: 'Next.js Custom Web Systems',
      description: 'Ultra-fast, high-converting Next.js 14 web applications and headless e-commerce platforms engineered for sub-second load speeds and top SEO scores.',
      deliverables: [
        'Next.js 14 App Router & TypeScript Development',
        'Headless Shopify & Custom Store Fronts',
        'Sub-Second Page Loads & 99+ Speed Scores',
        'Built-in Analytics & Lead Intake Pipelines'
      ]
    }
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold text-luxury-sky uppercase tracking-widest px-3 py-1 rounded bg-sky-50 border border-sky-100">
            Agency Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
            Comprehensive Digital Marketing & <br />
            <span className="text-sky-gradient">AI Automation Engineering</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Data-driven growth strategies engineered for predictable business scaling.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="clean-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-luxury-sky">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-slate-600">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {item.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-luxury-sky shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=${item.id}`}
                  className="inline-flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-bold text-slate-700 hover:text-luxury-sky transition-colors"
                >
                  <span>Build This Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
