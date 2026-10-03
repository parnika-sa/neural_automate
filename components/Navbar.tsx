'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-xl'
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
            <span className="font-extrabold text-xl tracking-tight text-slate-100">
              Neural<span className="text-emerald-400">Automate</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 ml-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                .dev
              </span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">
              Services
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
              Pricing
            </Link>
            <Link href="/faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-emerald-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5"
            >
              <span>Book Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 mt-3 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link href="/support" onClick={() => setMobileMenuOpen(false)}>
              Support Desk
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
          </nav>
          <div className="pt-3 border-t border-slate-800">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-950 bg-emerald-500"
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
