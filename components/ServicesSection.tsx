import React from 'react';
import Link from 'next/link';
import { Bot, Code2, ShoppingBag, TrendingUp, Search, ArrowRight, CheckCircle, Sparkles, Cpu, Layers } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      id: 'ai-automation',
      icon: Bot,
      badge: 'Most Requested',
      title: 'AI & Workflow Automations',
      description: 'Replace manual repetitive tasks with autonomous AI agents, automated lead qualification, Zapier/Make webhooks, & custom CRM synchronization.',
      features: [
        'Custom GPT-4 & Claude Autonomous AI Agents',
        'Auto Lead Capture & 24/7 AI Qualification',
        'Make.com / Zapier Custom Webhook Architecture',
        'ERP & Database Automated Pipelines'
      ],
      color: 'from-neural-purple to-purple-600',
      glow: 'shadow-neural-purple/20'
    },
    {
      id: 'web-development',
      icon: Code2,
      badge: 'High Performance',
      title: 'Next.js Custom Web Systems',
      description: 'Ultra-fast, responsive web platforms built with Next.js 14, TypeScript, & dynamic animations. Designed for 99+ Google Lighthouse scores and maximum conversion.',
      features: [
        'Next.js 14 App Router Architecture',
        'Sub-Second Page Load Speeds',
        'Glassmorphism & Cyber UI Aesthetics',
        'Integrated CMS & Admin Dashboards'
      ],
      color: 'from-neural-cyan to-blue-600',
      glow: 'shadow-neural-cyan/20'
    },
    {
      id: 'ecommerce',
      icon: ShoppingBag,
      badge: 'Revenue Driven',
      title: 'E-Commerce Store Engineering',
      description: 'High-converting digital storefronts on Shopify, WooCommerce, or Headless Next.js with automated inventory, checkout optimization, & instant payment gateways.',
      features: [
        'Headless E-Commerce & Custom Storefronts',
        'Automated Order & Inventory Sync',
        'Custom Checkout Funnels & Upsell Mechanics',
        'Multi-Currency & Global Shipping Integration'
      ],
      color: 'from-emerald-500 to-teal-700',
      glow: 'shadow-emerald-500/20'
    },
    {
      id: 'marketing',
      icon: TrendingUp,
      badge: 'Growth Funnels',
      title: 'Digital Marketing & CRO',
      description: 'Scale traffic into paying clients with high-ROAS ad campaigns, Conversion Rate Optimization (CRO), retargeting funnels, & data analytics dashboards.',
      features: [
        'Omnichannel Performance Marketing (Meta/Google)',
        'Conversion Rate Optimization & A/B Testing',
        'Automated Email & SMS Nurture Workflows',
        'Real-time ROI Analytics Dashboards'
      ],
      color: 'from-pink-500 to-rose-700',
      glow: 'shadow-pink-500/20'
    },
    {
      id: 'aeo-geo',
      icon: Search,
      badge: 'Next-Gen SEO',
      title: 'SEO, AEO & GEO Optimization',
      description: 'Ensure your brand is cited and ranked #1 across Google, ChatGPT, Perplexity AI, Claude, and SearchGPT with schema markup & semantic LLM indexing.',
      features: [
        'Answer Engine Optimization (AEO) for AI Search',
        'Generative Engine Optimization (GEO) Citations',
        'JSON-LD Structured Data Schema Architecture',
        'Technical On-Page & Speed SEO Audits'
      ],
      color: 'from-amber-400 to-orange-600',
      glow: 'shadow-amber-500/20'
    }
  ];

  return (
    <section className="py-20 relative bg-neural-dark/80" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-cyan/10 border border-neural-cyan/30 text-neural-cyan text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>End-to-End (A-Z) Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Comprehensive Digital Systems <br />
            <span className="glow-text-cyan">Built & Engineered Under One Roof</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base leading-relaxed">
            From initial concept to deployment, AI automation, and global search engine dominance—we handle everything A-Z.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} p-0.5 shadow-lg ${service.glow}`}>
                      <div className="w-full h-full bg-neural-dark rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-neural-card border border-neural-border text-gray-300">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-neural-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-4 h-4 text-neural-cyan shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?service=${service.id}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-neural-border/60 text-xs font-semibold text-gray-300 group-hover:text-neural-cyan transition-colors"
                >
                  <span>Build This System</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}

          {/* Full Custom Enterprise Card */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-neural-purple/20 via-neural-card to-neural-dark border-neural-purple/40">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 p-0.5 mb-6">
                <div className="w-full h-full bg-neural-dark rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">
                Full-Stack Custom Enterprise Agency Package
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Need a complete digital overhaul? Combine Web Dev + E-Commerce + AI Automations + AEO Strategy in one seamless rollout.
              </p>
            </div>

            <Link
              href="/contact"
              className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-white bg-gradient-to-r from-neural-purple to-neural-cyan hover:opacity-95 transition-opacity"
            >
              Request Custom Strategy Proposal
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
