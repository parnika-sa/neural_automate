'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Currency, 
  websiteSections, 
  marketingSections, 
  automationSections, 
  bundlePacks, 
  termsAndNotes, 
  pricingFaqs, 
  formatPrice, 
  PricingSection,
  WHATSAPP_NUMBER,
  SITE_URL
} from '@/lib/pricing';
import { 
  Globe, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  Code2, 
  TrendingUp, 
  Cpu, 
  Layers,
  MessageSquare,
  Download,
  Share2,
  MessageCircle
} from 'lucide-react';

// Pricing Client Component: Main interactive component for tab switching, currency toggles, tables, FAQs, & PDF downloads
export default function PricingClient() {
  const [currency, setCurrency] = useState<Currency>('INR');
  const [activeTab, setActiveTab] = useState<'website' | 'marketing' | 'automation'>('website');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Tab definitions array
  const tabs = [
    { id: 'website' as const, label: 'Website Development', icon: Code2, titleName: 'Website' },
    { id: 'marketing' as const, label: 'Marketing Services', icon: TrendingUp, titleName: 'Marketing' },
    { id: 'automation' as const, label: 'AI & Automations', icon: Cpu, titleName: 'Automation' },
  ];

  // Active tab data retrieval
  const activeSections: PricingSection[] = 
    activeTab === 'website' ? websiteSections :
    activeTab === 'marketing' ? marketingSections :
    automationSections;

  const activeTabConfig = tabs.find(t => t.id === activeTab) || tabs[0];

  // Selected PDF filename generator for current tab
  const activePdfPath = `/pricing-pdfs/NeuralAutomate-Pricing-${activeTabConfig.titleName}-${currency}.pdf`;

  // WhatsApp share link for current PDF
  const fullPdfShareUrl = `${SITE_URL}${activePdfPath}`;
  const whatsappShareText = encodeURIComponent(`Check out NeuralAutomate ${activeTabConfig.label} Pricing Guide: ${fullPdfShareUrl}`);
  const whatsappShareUrl = `https://wa.me/?text=${whatsappShareText}`;

  // Direct WhatsApp chat link
  const whatsappChatUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi NeuralAutomate, I have a question about your pricing plans.')}`;

  // Keyboard navigation handler for tabs
  const handleKeyDownTabs = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    }
  };

  return (
    <div className="space-y-16">
      
      {/* =================================================== */}
      {/* HERO & CURRENCY TOGGLE SECTION */}
      {/* =================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Pricing & Clear Deliverables</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight">
          Transparent Pricing for <span className="gradient-text-electric">Every Stage of Growth</span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From custom Next.js websites and high-ROI digital marketing to autonomous n8n workflows. No hidden fees, full code ownership.
        </p>

        {/* Currency Switcher Toggle */}
        <div className="pt-2 flex flex-col items-center justify-center gap-3">
          <div 
            className="inline-flex items-center p-1.5 rounded-2xl bg-[#040805] border border-emerald-500/30 shadow-inner"
            role="group"
            aria-label="Currency Selector"
          >
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              aria-pressed={currency === 'INR'}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currency === 'INR'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇮🇳 INR (India)</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrency('USD')}
              aria-pressed={currency === 'USD'}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                currency === 'USD'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🌐 USD (International)</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            {currency === 'INR' ? 'Prices shown in INR (₹) excl. GST' : 'Prices shown in USD ($) for international clients'}
          </span>
        </div>

        {/* Prominent Banner when USD is selected */}
        {currency === 'USD' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-200"
          >
            <div className="flex items-center gap-2.5 text-left">
              <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>International payments are handled via custom arrangement. Email <strong className="text-emerald-400">info@neuralautomate.dev</strong> or chat with us.</span>
            </div>
            <a
              href="mailto:info@neuralautomate.dev?subject=International%20Pricing%20Inquiry"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-400 hover:text-slate-950 transition-all whitespace-nowrap shrink-0"
            >
              Contact Team
            </a>
          </motion.div>
        )}
      </div>

      {/* =================================================== */}
      {/* 3 MAIN TABS NAVIGATION & TAB SPECIFIC PDF DOWNLOAD */}
      {/* =================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          
          <div 
            role="tablist" 
            aria-label="Pricing Categories" 
            className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#07120a] border border-tech-border w-full sm:w-auto"
          >
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleKeyDownTabs(e, idx)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-display font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabHighlight"
                      className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/50 rounded-xl"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick PDF Download Button for Active Tab */}
          <a
            href={activePdfPath}
            download
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-400 hover:text-slate-950 transition-all flex items-center gap-2 shadow-sm shrink-0"
            title={`Download ${activeTabConfig.label} Pricing PDF (${currency})`}
          >
            <Download className="w-4 h-4" />
            <span>Download {activeTabConfig.titleName} PDF ({currency})</span>
          </a>

        </div>
      </div>

      {/* =================================================== */}
      {/* TAB CONTENT SECTIONS (HTML TABLES) */}
      {/* =================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="space-y-16"
          >
            {activeSections.map((section) => (
              <div key={section.id} className="space-y-4">
                
                {/* Section Header */}
                <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {section.description}
                  </p>
                </div>

                {/* Table Container (Mobile Horizontal Scrollable Wrapper) */}
                <div className="tech-card rounded-2xl border border-tech-border overflow-hidden bg-[#07120a] shadow-xl">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm" aria-label={section.title}>
                      <thead>
                        <tr className="bg-[#040805] text-slate-300 font-mono text-[11px] uppercase border-b border-tech-border">
                          {section.columns.map((col, cIdx) => (
                            <th 
                              key={cIdx} 
                              scope="col"
                              className={`py-3.5 px-4 sm:px-6 font-bold tracking-wider ${
                                cIdx === 0 ? 'sticky left-0 bg-[#040805] z-20 min-w-[180px] sm:min-w-[220px]' : ''
                              }`}
                            >
                              {col}
                            </th>
                          ))}
                          <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider text-right min-w-[120px]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-tech-border/40 text-slate-300">
                        {section.rows.map((row) => {
                          const contactUrl = `/contact?plan=${encodeURIComponent(row.name)}&currency=${currency}`;
                          
                          return (
                            <tr 
                              key={row.slug}
                              className={`transition-colors hover:bg-emerald-950/20 group ${
                                row.popular ? 'bg-emerald-950/10' : ''
                              }`}
                            >
                              {/* Package / Service Name (Sticky Left on Mobile) */}
                              <td className="py-4 px-4 sm:px-6 sticky left-0 bg-[#07120a] group-hover:bg-[#09170e] z-10 font-bold text-white border-r border-tech-border/30">
                                <div className="flex flex-col gap-1 items-start">
                                  <div className="flex items-center gap-2">
                                    <span>{row.name}</span>
                                  </div>
                                  {row.popular && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 shadow-sm">
                                      Most Popular
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Details / What's Included */}
                              <td className="py-4 px-4 sm:px-6 text-slate-300 leading-relaxed max-w-xs sm:max-w-md">
                                {row.details}
                              </td>

                              {/* Case 1: Separate Setup & Monthly Columns (Automation Tab) */}
                              {row.setup || row.monthly ? (
                                <>
                                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-white">
                                    {formatPrice(row.setup, currency)}
                                    {row.setup?.type === 'one-time' && <span className="text-[10px] text-slate-400 font-normal ml-1">one-time</span>}
                                  </td>
                                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-emerald-400">
                                    {formatPrice(row.monthly, currency)}
                                    {row.monthly?.type === 'monthly' && <span className="text-[10px] text-slate-400 font-normal ml-1">/mo</span>}
                                  </td>
                                </>
                              ) : (
                                /* Case 2: Single Price Column (Website & Marketing Tabs) */
                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-white">
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-emerald-400 font-bold">{formatPrice(row.price, currency)}</span>
                                    {row.price?.type === 'monthly' && <span className="text-[10px] text-slate-400 font-normal">/mo</span>}
                                    {row.price?.type === 'one-time' && <span className="text-[10px] text-slate-400 font-normal">one-time</span>}
                                    {row.price?.type === 'per-unit' && <span className="text-[10px] text-slate-400 font-normal">{row.price.unit}</span>}
                                  </div>
                                </td>
                              )}

                              {/* Delivery or Billing Column */}
                              {(row.delivery || row.billing) && (
                                <td className="py-4 px-4 sm:px-6 whitespace-nowrap text-xs font-mono text-slate-400">
                                  {row.delivery || row.billing}
                                </td>
                              )}

                              {/* Action CTA Button */}
                              <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                                <Link
                                  href={contactUrl}
                                  className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                    row.popular
                                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                                      : 'bg-tech-card border border-tech-border text-slate-200 hover:border-emerald-500/40 hover:text-white'
                                  }`}
                                >
                                  <span>{row.quoteOnly ? 'Get Quote' : 'Get Started'}</span>
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Optional Note Below Table */}
                {section.note && (
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
                    <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{section.note}</span>
                  </div>
                )}

              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =================================================== */}
      {/* BUNDLE PACKS SECTION (HTML TABLE) */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>All-in-One Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Bundle Packs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Combine development, marketing, and AI automation into a unified monthly growth system.
          </p>
        </div>

        <div className="tech-card rounded-2xl border border-tech-border overflow-hidden bg-[#07120a] shadow-xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs sm:text-sm" aria-label="Bundle Packs">
              <thead>
                <tr className="bg-[#040805] text-slate-300 font-mono text-[11px] uppercase border-b border-tech-border">
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider sticky left-0 bg-[#040805] z-20 min-w-[180px]">Bundle</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider">What's Included</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider">One-time Setup</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider">Monthly</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tech-border/40 text-slate-300">
                {bundlePacks.map((bundle) => {
                  const contactUrl = `/contact?plan=${encodeURIComponent(bundle.name)}&currency=${currency}`;

                  return (
                    <tr 
                      key={bundle.slug} 
                      className={`transition-colors hover:bg-emerald-950/20 group ${
                        bundle.popular ? 'bg-emerald-950/10' : ''
                      }`}
                    >
                      <td className="py-4 px-4 sm:px-6 sticky left-0 bg-[#07120a] group-hover:bg-[#09170e] z-10 font-bold text-white border-r border-tech-border/30">
                        <div className="flex flex-col gap-1 items-start">
                          <span>{bundle.name}</span>
                          {bundle.popular && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 shadow-sm">
                              Most Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-slate-300 max-w-md">
                        {bundle.details}
                      </td>
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-white">
                        {formatPrice(bundle.setup, currency)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">one-time</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono font-bold text-emerald-400">
                        {formatPrice(bundle.monthly, currency)}
                        <span className="text-[10px] text-slate-400 font-normal ml-1">/mo</span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <Link
                          href={contactUrl}
                          className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            bundle.popular
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-tech-card border border-tech-border text-slate-200 hover:border-emerald-500/40 hover:text-white'
                          }`}
                        >
                          <span>Get Started</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Bundles save roughly 10-15% compared to buying individual services separately.</span>
        </div>
      </section>

      {/* =================================================== */}
      {/* TERMS AND NOTES SECTION (HTML TABLE) */}
      {/* =================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-6">
        <div className="space-y-1 border-l-2 border-emerald-500 pl-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Terms & Notes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear guidelines regarding billing terms, revision policies, third-party software, and legal compliance.
          </p>
        </div>

        <div className="tech-card rounded-2xl border border-tech-border overflow-hidden bg-[#07120a] shadow-xl">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-xs sm:text-sm" aria-label="Terms and Notes">
              <thead>
                <tr className="bg-[#040805] text-slate-300 font-mono text-[11px] uppercase border-b border-tech-border">
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider sticky left-0 bg-[#040805] z-20 min-w-[160px] sm:min-w-[200px]">Point</th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tech-border/40 text-slate-300">
                {termsAndNotes.map((term, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-emerald-950/20 group">
                    <td className="py-4 px-4 sm:px-6 sticky left-0 bg-[#07120a] group-hover:bg-[#09170e] z-10 font-bold text-white border-r border-tech-border/30 whitespace-nowrap">
                      {term.point}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-300 leading-relaxed">
                      {term.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
      {/* =================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
            Everything You Need to Know About Our Plans
          </h2>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="tech-card rounded-2xl p-6 border border-tech-border cursor-pointer transition-all hover:border-emerald-500/40 bg-[#07120a]"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span className="text-emerald-400 font-mono text-xs">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <button type="button" className="text-emerald-400 p-1 shrink-0" aria-label="Toggle FAQ answer">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-tech-border/60 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =================================================== */}
      {/* DOWNLOAD FULL PRICE GUIDE & WHATSAPP SHARE SECTION */}
      {/* =================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="tech-card rounded-3xl p-6 sm:p-10 border border-tech-border bg-[#07120a] space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Download className="w-3.5 h-3.5" />
              <span>Downloadable PDF Price Guides</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Download Full Price Guides ({currency})
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Download A4 print-ready PDF documents for offline review or client proposals.
            </p>
          </div>

          {/* 3 PDF Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <a
              href={`/pricing-pdfs/NeuralAutomate-Pricing-Website-${currency}.pdf`}
              download
              className="p-4 rounded-2xl bg-[#040805] border border-tech-border hover:border-emerald-500/40 text-center space-y-2 group transition-all"
            >
              <Code2 className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Website Dev PDF</div>
              <div className="text-[10px] font-mono text-slate-400">Next.js & WordPress ({currency})</div>
            </a>

            <a
              href={`/pricing-pdfs/NeuralAutomate-Pricing-Marketing-${currency}.pdf`}
              download
              className="p-4 rounded-2xl bg-[#040805] border border-tech-border hover:border-emerald-500/40 text-center space-y-2 group transition-all"
            >
              <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Marketing PDF</div>
              <div className="text-[10px] font-mono text-slate-400">SEO & Paid Ads ({currency})</div>
            </a>

            <a
              href={`/pricing-pdfs/NeuralAutomate-Pricing-Automation-${currency}.pdf`}
              download
              className="p-4 rounded-2xl bg-[#040805] border border-tech-border hover:border-emerald-500/40 text-center space-y-2 group transition-all"
            >
              <Cpu className="w-6 h-6 text-emerald-400 mx-auto group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-white">Automation PDF</div>
              <div className="text-[10px] font-mono text-slate-400">WhatsApp & n8n ({currency})</div>
            </a>
          </div>

          {/* Social Share & Direct WhatsApp Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share PDF on WhatsApp</span>
            </a>

            <a
              href={whatsappChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* FINAL CALL TO ACTION (CTA) */}
      {/* =================================================== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="tech-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-gradient-to-b from-[#09170e] to-[#040805] text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Need a Custom Solution?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Ready to Automate & Scale Your Business?
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Get a tailored technical quote or book a 1-on-1 consultation session with our lead automation engineers today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact?plan=Custom%20Quote"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-200 bg-tech-card border border-tech-border hover:border-emerald-500/40 hover:text-white transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Book a Free Call</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
