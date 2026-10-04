'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageSquare, MapPin, Globe, Share2, Check, ShieldCheck, Phone, Bot } from 'lucide-react';
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
    <footer className="bg-[#020503] border-t border-emerald-500/20 pt-16 pb-12 relative overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* TOP GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-emerald-500/10">
          
          {/* BRAND COLUMN (2 cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
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

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleGlobeClick}
                title="Scroll to Top"
                className="w-9 h-9 rounded-xl bg-[#07120a] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                title="Share Website Link"
                className="w-9 h-9 rounded-xl bg-[#07120a] border border-emerald-500/20 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer relative"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-slate-950 font-bold text-[10px] rounded shadow-lg whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* COMPANY & EXPLORE COLUMN */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/services" className="hover:text-emerald-400 transition-colors">All Services</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing & Plans</Link></li>
              <li><Link href="/demo" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><span>Live Demo</span> <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /></Link></li>
              <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog & Insights</Link></li>
              <li><Link href="/calculator" className="hover:text-emerald-400 transition-colors">ROI Calculator</Link></li>
            </ul>
          </div>

          {/* LEGAL COLUMN */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Legal & Support</h4>
            <ul className="space-y-2 text-xs">
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
          </div>

          {/* CONTACT & DISCLOSURES COLUMN */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Direct Reach</h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-emerald-400 transition-colors">{SITE_CONFIG.email}</a>
              </p>

              {/* NEO Phone Line */}
              <p className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={SITE_CONFIG.neoWhatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  {SITE_CONFIG.neoPhoneDisplay} <span className="text-[10px] text-emerald-400 font-mono font-bold">(NEO - AI Sales)</span>
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

              <div className="pt-2 text-[11px] text-slate-500 leading-normal flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.businessModel}</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL NOTICE */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {SITE_CONFIG.brandName}. All rights reserved.</p>
          <p className="text-slate-400">
            Operated by <span className="text-slate-200 font-semibold">{SITE_CONFIG.operatorName}</span> ({SITE_CONFIG.location})
          </p>
        </div>
      </div>
    </footer>
  );
}
