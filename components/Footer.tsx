'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Share2, Check } from 'lucide-react';

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
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-emerald-500/30 group-hover:border-emerald-400/80 transition-all shrink-0">
                <Image
                  src="/logo.png"
                  alt="NeuralAutomate Logo"
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
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
                <a href="tel:+17537231090" className="hover:text-emerald-400 transition-colors">
                  +1 7537231090 <span className="text-[10px] text-emerald-400/80 font-mono">(CA)</span>
                </a>
                <a
                  href="https://wa.me/17537231090"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Chat on WhatsApp"
                  className="inline-flex items-center justify-center p-0.5 rounded hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
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
