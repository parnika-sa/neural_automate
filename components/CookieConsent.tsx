'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, ShieldCheck, X, Check, Lock, Info } from 'lucide-react';
import { getConsent, saveConsent, hasConsent, loadGTM } from '@/lib/consent';

// Cookie Consent banner component: Client component for consent popup & customizable modal
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  // Toggle states customize modal ke liye
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  useEffect(() => {
    // Component mount hone ke baad hi execution start hogi hydration mismatch rokne ke liye
    setMounted(true);

    const existingConsent = getConsent();
    if (existingConsent) {
      // Agar pehle se saved choice hai aur analytics/marketing active hain toh GTM load kar lo
      if (existingConsent.analytics || existingConsent.marketing) {
        loadGTM();
      }
      setIsVisible(false);
      setAnalyticsConsent(existingConsent.analytics);
      setMarketingConsent(existingConsent.marketing);
    } else {
      // Direct first-time user ko banner dikhao
      setIsVisible(true);
    }

    // Custom event listener footer ke "Cookie Settings" button ke liye
    const handleOpenSettings = () => {
      const current = getConsent();
      if (current) {
        setAnalyticsConsent(current.analytics);
        setMarketingConsent(current.marketing);
      }
      setIsVisible(true);
      setShowCustomize(true);
    };

    window.addEventListener('open-cookie-settings', handleOpenSettings);

    // Escape key press handler accessibility ke liye
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showCustomize) {
        setShowCustomize(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-cookie-settings', handleOpenSettings);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Accept All handler
  const handleAcceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setAnalyticsConsent(true);
    setMarketingConsent(true);
    setIsVisible(false);
    setShowCustomize(false);
  };

  // Reject Non-Essential handler
  const handleRejectNonEssential = () => {
    saveConsent({ analytics: false, marketing: false });
    setAnalyticsConsent(false);
    setMarketingConsent(false);
    setIsVisible(false);
    setShowCustomize(false);
  };

  // Custom preference save handler
  const handleSavePreferences = () => {
    saveConsent({ analytics: analyticsConsent, marketing: marketingConsent });
    setIsVisible(false);
    setShowCustomize(false);
  };

  // Hydration mismatch prevention: Jab tak client on mount nahi hota tab tak render mat karo
  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed inset-x-0 bottom-0 z-[999] p-4 sm:p-6 pointer-events-none flex justify-center items-end"
          role="dialog"
          aria-label="Cookie Consent Banner"
          aria-live="polite"
        >
          {/* Main Cookie Banner Box */}
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="pointer-events-auto w-full max-w-4xl bg-[#090f0c]/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(16,185,129,0.15)] text-slate-200"
          >
            {/* Header & Description */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Cookie className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-white text-base">
                    Cookie Preferences & Privacy
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  We use cookies to improve your experience and analyze site traffic.{' '}
                  <Link 
                    href="/privacy" 
                    className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 font-medium transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>

              {/* Banner Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                <button
                  type="button"
                  onClick={() => setShowCustomize(!showCustomize)}
                  aria-expanded={showCustomize}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/90 text-slate-300 border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Customize</span>
                </button>

                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer"
                >
                  Reject Non-Essential
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  Accept All
                </button>
              </div>
            </div>

            {/* Customize Expandable Panel / Modal */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden border-t border-emerald-500/20 mt-4 pt-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      Manage Cookie Categories
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowCustomize(false)}
                      className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                      aria-label="Close preferences modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Necessary Cookies - Always Active */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-xs text-white">
                          <span>Necessary</span>
                          <Lock className="w-3 h-3 text-slate-400" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Always Active
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Essential for basic navigation, security, and site core features. Cannot be turned off.
                      </p>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">Analytics</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={analyticsConsent}
                            onChange={(e) => setAnalyticsConsent(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Helps us measure site traffic, page speed performance, and user navigation patterns.
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">Marketing</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={marketingConsent}
                            onChange={(e) => setMarketingConsent(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        Used to deliver relevant business automation ads and measure campaign effectiveness.
                      </p>
                    </div>
                  </div>

                  {/* Save Preferences Button */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
