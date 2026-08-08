'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, Globe, Share2, Check } from 'lucide-react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'NeuralAutomate.dev - AI Business Automation Agency',
      text: 'Automate your business processes with custom n8n & AI workflows.',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://neuralautomate.dev',
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
    <footer className="bg-[#020503] border-t border-tech-border pt-16 pb-12 relative overflow-hidden text-slate-400">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Grid layout: 2 columns on mobile so Automations & Navigation sit side-by-side */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-tech-border/60">
          
          {/* Brand Column (Full width 2 cols on mobile) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-[1px]">
                <div className="w-full h-full bg-[#040705] rounded-[7px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <span className="font-display font-black text-xl text-white">
                Neural<span className="gradient-text-electric">Automate</span>.dev
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, engineer, and deploy autonomous AI process automations, n8n webhook pipelines, and custom business integrations.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleGlobeClick}
                title="Scroll to Top"
                className="w-9 h-9 rounded-lg bg-tech-card border border-tech-border flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                title="Share Website Link"
                className="w-9 h-9 rounded-lg bg-tech-card border border-tech-border flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer relative"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-slate-950 font-mono font-bold text-[10px] rounded shadow-lg whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Automations Links (Left column on mobile) */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Automations</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/whatsapp-bot" className="hover:text-emerald-400 transition-colors">WhatsApp AI Chatbots</Link></li>
              <li><Link href="/services/crm-sync" className="hover:text-emerald-400 transition-colors">Lead to CRM Auto-Sync</Link></li>
              <li><Link href="/services/invoice-automation" className="hover:text-emerald-400 transition-colors">Invoice & Billing AI</Link></li>
              <li><Link href="/services/data-entry" className="hover:text-emerald-400 transition-colors">Data Entry OCR Extraction</Link></li>
              <li><Link href="/services/custom-n8n" className="hover:text-emerald-400 transition-colors">n8n Custom Pipelines</Link></li>
            </ul>
          </div>

          {/* Navigation Links (Right column on mobile - side-by-side with Automations) */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing & FAQ</Link></li>
              <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">Blog & Insights</Link></li>
              <li><Link href="/demo" className="hover:text-emerald-400 transition-colors">Live Demo Sandbox</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Book Consultation</Link></li>
            </ul>
          </div>

          {/* Direct Reach (Full width on mobile below the two columns) */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Direct Reach</h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="mailto:info@neuralautomate.dev" className="hover:text-emerald-400 transition-colors">info@neuralautomate.dev</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+17537231090" className="hover:text-emerald-400 transition-colors">+1 7537231090 <span className="text-[10px] text-emerald-400/80 font-mono">(CA)</span></a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+917268930700" className="hover:text-emerald-400 transition-colors">+91 7268930700 <span className="text-[10px] text-emerald-400/80 font-mono">(IN)</span></a>
              </p>
              <p className="flex items-start gap-2 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Plot no 225, yuvis complex, halwara airport 141106</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NeuralAutomate.dev. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
