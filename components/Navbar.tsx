'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  MessageSquare,
  Database,
  FileText,
  ScanLine,
  Mail,
  Workflow,
  BookOpen,
  PlayCircle,
  Calculator,
  Compass,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceItems = [
    { title: 'WhatsApp AI Chatbot', desc: '24/7 lead qualification & booking', href: '/services/whatsapp-bot', icon: MessageSquare },
    { title: 'CRM Auto-Sync', desc: 'Real-time webhook lead routing', href: '/services/crm-sync', icon: Database },
    { title: 'Invoice Automation', desc: 'PDF generation & reminders', href: '/services/invoice-automation', icon: FileText },
    { title: 'Data Entry OCR', desc: 'AI document data extraction', href: '/services/data-entry', icon: ScanLine },
    { title: 'AI Email Responder', desc: 'Smart inbox triage & replies', href: '/services/ai-email-responder', icon: Mail },
    { title: 'n8n Custom Pipelines', desc: 'Bespoke multi-node workflows', href: '/services/custom-n8n', icon: Workflow },
  ];

  const resourceItems = [
    { title: 'Case Studies', desc: 'Real client automation results', href: '/case-studies', icon: Zap },
    { title: 'Live Demo Sandbox', desc: 'Test live AI agent workflows', href: '/demo', icon: PlayCircle, badge: 'Live' },
    { title: 'Blog & Insights', desc: 'Articles on AEO, GEO & n8n', href: '/blog', icon: BookOpen },
    { title: 'How It Works', desc: 'Our systematic 4-step process', href: '/how-it-works', icon: Compass },
    { title: 'ROI Calculator', desc: 'Calculate team time saved', href: '/calculator', icon: Calculator },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#040705]/95 backdrop-blur-md border-b border-emerald-500/20 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-emerald-500/30 group-hover:border-emerald-400 transition-all shadow-md shadow-emerald-500/10 shrink-0">
              <Image
                src="/logo.png"
                alt={`${SITE_CONFIG.brandName} Logo`}
                width={36}
                height={36}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              Neural<span className="gradient-text-electric">Automate</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 ml-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                .dev
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors py-2">
              Home
            </Link>

            <Link href="/about" className="hover:text-emerald-400 transition-colors py-2">
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors py-2 focus:outline-none cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesDropdown ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/30 shadow-2xl space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-emerald-500/20 mb-1">
                    AI Automation Services
                  </div>
                  {serviceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="pt-1 border-t border-emerald-500/20 text-center">
                    <Link href="/services" className="text-xs font-mono font-bold text-emerald-400 hover:underline block py-1">
                      View All Services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setResourcesDropdown(true)}
              onMouseLeave={() => setResourcesDropdown(false)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors py-2 focus:outline-none cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesDropdown ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {resourcesDropdown && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/30 shadow-2xl space-y-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider border-b border-emerald-500/20 mb-1">
                    Showcase & Learn
                  </div>
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-emerald-500/10 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:border-emerald-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400">{item.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link href="/pricing" className="hover:text-emerald-400 transition-colors py-2">
              Pricing
            </Link>

            <Link href="/faq" className="hover:text-emerald-400 transition-colors py-2">
              FAQ
            </Link>

            <Link href="/contact" className="hover:text-emerald-400 transition-colors py-2">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Book Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#07120a] border border-emerald-500/30 text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Clean Flex Column Layout - No text overlap!) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#07120a] border-b border-emerald-500/30 px-6 py-6 mt-3 shadow-2xl text-slate-200 space-y-5 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4 text-sm font-semibold">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
              About Us
            </Link>

            {/* Mobile Services Section */}
            <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-2.5">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Services</div>
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-300 hover:text-emerald-400 transition-colors pl-2 py-0.5"
                >
                  • {item.title}
                </Link>
              ))}
            </div>

            {/* Mobile Resources Section */}
            <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-2.5">
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Resources</div>
              {resourceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-slate-300 hover:text-emerald-400 transition-colors pl-2 py-0.5 flex items-center justify-between"
                >
                  <span>• {item.title}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Links */}
            <div className="pt-3 border-t border-emerald-500/20 flex flex-col gap-3">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
                Pricing & Plans
              </Link>
              <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
                FAQ
              </Link>
              <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
                Support Desk
              </Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-400 transition-colors">
                Contact Us
              </Link>
            </div>
          </nav>
          
          <div className="pt-4 border-t border-emerald-500/20">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Book Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
