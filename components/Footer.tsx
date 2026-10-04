'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, MapPin, Globe, Share2, Check, ShieldCheck, Phone, Bot, ArrowUpRight, Activity } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${SITE_CONFIG.brandName} - AI Business Automation Studio`,
      text: 'Build modern websites and 24/7 WhatsApp AI automations with NeuralAutomate.dev.',
      url: typeof window !== 'undefined' ? window.location.origin : SITE_CONFIG.siteUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled share dialog
      }
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        // Fallback
      }
    }
  };

  const handleGlobeClick = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer role="contentinfo" aria-label="Site Footer" className="bg-[#020503] border-t border-emerald-500/20 pt-16 pb-12 relative overflow-hidden text-slate-400">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* TOP MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-500/10">
          
          {/* COLUMN 1: BRAND PROFILE */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 group-hover:border-emerald-400 transition-all shrink-0">
                <Image
                  src="/logo.png"
                  alt={`${SITE_CONFIG.brandName} Logo`}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                Neural<span className="gradient-text-electric">Automate</span>.dev
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, engineer, and deploy high-converting websites, 24/7 WhatsApp AI chatbots, and automated n8n lead workflows.
            </p>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleGlobeClick}
                title="Scroll to Top"
                className="w-8 h-8 rounded-lg bg-[#07120a] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
                aria-label="Scroll to Top"
              >
                <Globe className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                title="Share Website Link"
                className="w-8 h-8 rounded-lg bg-[#07120a] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer relative"
                aria-label="Share Website Link"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded shadow-lg whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* COLUMN 2: SERVICES */}
          <nav aria-label="Services Links" className="space-y-3">
            <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
              Services
            </h3>
            <ul role="list" className="space-y-2 text-xs">
              <li>
                <Link href="/services/whatsapp-bot" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>WhatsApp AI Bots</span>
                </Link>
              </li>
              <li>
                <Link href="/services/crm-sync" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Lead CRM Auto-Sync</span>
                </Link>
              </li>
              <li>
                <Link href="/services/invoice-automation" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Invoice Automation</span>
                </Link>
              </li>
              <li>
                <Link href="/services/data-entry" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Data Entry OCR</span>
                </Link>
              </li>
              <li>
                <Link href="/services/ai-email-responder" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>AI Email Responder</span>
                </Link>
              </li>
              <li>
                <Link href="/services/custom-n8n" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1 group">
                  <span>Custom n8n Pipelines</span>
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/services" className="text-emerald-400 font-mono text-[11px] hover:underline inline-flex items-center gap-1">
                  <span>All Services</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* COLUMN 3: EXPLORE */}
          <nav aria-label="Explore Links" className="space-y-3">
            <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
              Explore
            </h3>
            <ul role="list" className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing & Plans</Link></li>
              <li>
                <Link href="/demo" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Live Sandbox</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950">LIVE</span>
                </Link>
              </li>
              <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog & Insights</Link></li>
              <li><Link href="/calculator" className="hover:text-emerald-400 transition-colors">ROI Calculator</Link></li>
            </ul>
          </nav>

          {/* COLUMN 4: LEGAL & SUPPORT */}
          <nav aria-label="Legal & Support Links" className="space-y-3">
            <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
              Legal & Support
            </h3>
            <ul role="list" className="space-y-2 text-xs">
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
              <li><Link href="/support" className="hover:text-emerald-400 transition-colors">Support Desk</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund-policy" className="hover:text-emerald-400 transition-colors">Refund Policy</Link></li>
              <li><Link href="/delivery-policy" className="hover:text-emerald-400 transition-colors">Delivery Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
              <li><Link href="/data-deletion" className="hover:text-emerald-400 transition-colors">Data Deletion</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new Event('open-cookie-settings'));
                    }
                  }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </nav>

          {/* COLUMN 5: DIRECT REACH & ADDRESS */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
              Direct Reach
            </h3>
            <address className="not-italic space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-emerald-400 transition-colors truncate">{SITE_CONFIG.email}</a>
              </p>

              {/* NEO Phone Line */}
              <p className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={SITE_CONFIG.neoWhatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  {SITE_CONFIG.neoPhoneDisplay} <span className="text-[10px] text-emerald-400 font-mono font-bold">(NEO AI)</span>
                </a>
              </p>

              {/* WhatsApp Founder Line */}
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  {SITE_CONFIG.whatsappDisplay} <span className="text-[10px] text-slate-400 font-mono">(IN Founder)</span>
                </a>
              </p>

              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{SITE_CONFIG.location}</span>
              </p>

              <div className="pt-2 text-[11px] text-slate-500 leading-normal flex items-start gap-1.5 border-t border-emerald-500/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.businessModel}</span>
              </div>
            </address>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL DISCLOSURE */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-2">
          <p>© 2026 {SITE_CONFIG.brandName}. All rights reserved.</p>
          <p className="text-slate-400 text-center sm:text-right">
            Operated by <span className="text-slate-200 font-semibold">{SITE_CONFIG.operatorName}</span> ({SITE_CONFIG.location})
          </p>
        </div>
      </div>
    </footer>
  );
}

