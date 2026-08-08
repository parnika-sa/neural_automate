'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

export default function AuditFormSky() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    service: 'seo-aeo',
    budget: '$5k - $15k',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="contact">
      {/* Glow Backdrop */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Claim Your Free Digital Audit</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Ready to Accelerate Your <br />
              <span className="text-sky-gradient">Search Rankings & Revenue?</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Fill out the form to request a 1-on-1 technical audit. Our senior marketing strategists will analyze your website, competitor keywords, and workflow bottlenecks—completely free.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-slate-400">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Free SEO & AEO Keyword Audit Report</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Custom AI Workflow Savings Estimate</span>
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Obligation & 2-Hour Response Time</span>
              </p>
            </div>
          </div>

          {/* Right Form Box */}
          <div className="lg:col-span-6 bg-white text-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-display font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Request Free Growth Audit
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ankit Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-luxury-sky"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">WORK EMAIL *</label>
                    <input
                      type="email"
                      required
                      placeholder="ankit@company.dev"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-luxury-sky"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">WEBSITE URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://neuralautomate.dev"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-luxury-sky"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">PRIMARY SERVICE</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-luxury-sky"
                    >
                      <option value="seo-aeo">SEO & AEO Ranking</option>
                      <option value="ppc-ads">PPC & Meta Ads</option>
                      <option value="ai-automation">AI & Workflow Automation</option>
                      <option value="content">Content & Brand Scaling</option>
                      <option value="web">Next.js Web System</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-600 mb-1">MONTHLY BUDGET</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-luxury-sky"
                    >
                      <option value="$2.5k - $5k">$2,500 - $5,000/mo</option>
                      <option value="$5k - $15k">$5,000 - $15,000/mo</option>
                      <option value="$15k+">$15,000+/mo Enterprise</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-luxury-sky to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Analyzing Request...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send My Audit Request</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Audit Request Received!</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you <strong className="text-slate-900">{formData.name}</strong>. Our lead digital marketer will inspect <strong>{formData.website}</strong> and send the custom report to <strong>{formData.email}</strong> shortly.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
