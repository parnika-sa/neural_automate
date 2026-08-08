'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cpu, Menu, X, ArrowRight } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#040705]/90 backdrop-blur-md border-b border-tech-border py-3 shadow-xl shadow-black/60' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 p-[1px]">
              <div className="w-full h-full bg-[#040705] rounded-[7px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
              </div>
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              Neural<span className="gradient-text-electric">Automate</span>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 ml-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-emerald-400 transition-colors">
              Services
            </Link>
            <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
              Pricing
            </Link>
            <Link href="/demo" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>Live Demo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
            <Link href="/case-studies" className="hover:text-emerald-400 transition-colors">
              Case Studies
            </Link>
            <Link href="/blog" className="hover:text-emerald-400 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-emerald-400 transition-colors">
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 shadow-emerald-glow hover:-translate-y-0.5"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-tech-card border border-tech-border text-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#09120c] border-b border-tech-border px-6 py-6 mt-3 space-y-3 shadow-2xl">
          <nav className="flex flex-col space-y-3 text-sm font-semibold text-slate-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>Services (Automations)</Link>
            <Link href="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing & FAQ</Link>
            <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>Live Demo Sandbox</Link>
            <Link href="/case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
            <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog Hub</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>
          <div className="pt-3 border-t border-tech-border">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
