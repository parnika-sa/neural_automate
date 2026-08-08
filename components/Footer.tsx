import React from 'react';
import Link from 'next/link';
import { Cpu, Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#020503] border-t border-tech-border pt-16 pb-12 relative overflow-hidden text-slate-400">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-tech-border/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
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
              <span className="w-8 h-8 rounded-lg bg-tech-card border border-tech-border flex items-center justify-center text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">
                <Globe className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-lg bg-tech-card border border-tech-border flex items-center justify-center text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors">
                <Share2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Automations Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-white text-sm tracking-wide">Automations</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/services/whatsapp-bot" className="hover:text-emerald-400 transition-colors">WhatsApp AI Chatbots</Link></li>
              <li><Link href="/services/crm-sync" className="hover:text-emerald-400 transition-colors">Lead to CRM Auto-Sync</Link></li>
              <li><Link href="/services/invoice-automation" className="hover:text-emerald-400 transition-colors">Invoice & Billing AI</Link></li>
              <li><Link href="/services/data-entry" className="hover:text-emerald-400 transition-colors">Data Entry OCR Extraction</Link></li>
              <li><Link href="/services/custom-n8n" className="hover:text-emerald-400 transition-colors">n8n Custom Pipelines</Link></li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
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

          {/* Direct Reach */}
          <div className="space-y-3">
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
