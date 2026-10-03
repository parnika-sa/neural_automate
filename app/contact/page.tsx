'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Activity,
  ExternalLink,
  Mail,
  MessageSquare,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planQuery = searchParams.get('plan');
  const currencyQuery = searchParams.get('currency');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    workflowType: planQuery ? `${planQuery} (${currencyQuery || 'INR'})` : 'Custom AI Workflow',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (planQuery) {
      setFormData((prev) => ({
        ...prev,
        workflowType: `${planQuery} (${currencyQuery || 'INR'})`,
        message: prev.message || `I am interested in getting started with the ${planQuery} package (${currencyQuery || 'INR'}).`,
      }));
    }
  }, [planQuery, currencyQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    trackEvent('contact_form_submitted', { ...formData });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to send message. Please try again.');
      }

      // Redirect to thank-you page with source=contact
      router.push('/thank-you?source=contact');
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 text-slate-100 min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch & Schedule Consultation</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
            Let's Automate Your <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">Business Operations</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Fill out the form below, send an email, or message us directly on WhatsApp for immediate support.
          </p>
        </div>

        {/* BUSINESS INFORMATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email Us</div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
              {SITE_CONFIG.email}
            </div>
            <div className="text-[11px] text-slate-500">Responds within 24h</div>
          </a>

          {/* WhatsApp */}
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">WhatsApp Chat</div>
            <div className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
              {SITE_CONFIG.whatsappDisplay}
            </div>
            <div className="text-[11px] text-slate-500">Direct Founder Channel</div>
          </a>

          {/* Location */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Location</div>
            <div className="text-sm font-bold text-slate-200">
              {SITE_CONFIG.location}
            </div>
            <div className="text-[11px] text-slate-500">Remote Service Worldwide</div>
          </div>

          {/* Business Hours */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Business Hours</div>
            <div className="text-sm font-bold text-slate-200">
              {SITE_CONFIG.businessHours}
            </div>
            <div className="text-[11px] text-slate-500">Working Days</div>
          </div>
        </div>

        {/* PRIMARY CONTACT FORM */}
        <div className="max-w-3xl mx-auto rounded-3xl p-6 sm:p-10 border border-slate-800 bg-slate-900/60 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-100">Send Us a Direct Inquiry</h2>
                <p className="text-xs text-slate-400">We respond to every message within 24 hours.</p>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                FAST RESPONSE
              </span>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">YOUR FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">WORK EMAIL *</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">COMPANY NAME</label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">WORKFLOW / PACKAGE INTEREST</label>
                <input
                  type="text"
                  value={formData.workflowType}
                  onChange={(e) => setFormData({ ...formData, workflowType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">PROJECT DETAILS / BOTTLENECKS</label>
              <textarea
                rows={4}
                placeholder="Describe your website goals, current bottlenecks, or desired WhatsApp automation..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl font-bold text-sm text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Sending Inquiry...</span>
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Team</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* EXTERNAL MEETING SCHEDULING SECTION */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Prefer a Live Video Call?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
              Schedule 1-on-1 Session via Cal.com
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Book a live Google Meet call directly on our official Cal.com scheduling page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* 15 Min Session Card */}
            <div className="rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 bg-slate-900/60">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                    15 MINUTES
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">15-Min Technical Audit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quick call to evaluate your manual bottlenecks and explore how AI automations save team time.
                </p>
              </div>

              <a
                href="https://cal.com/neuralautomate/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Book 15-Min Audit</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* 30 Min Session Card */}
            <div className="rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 bg-slate-900/60">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                    30 MINUTES
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">30-Min Strategy Call</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep-dive architecture session to design custom web applications, AI agents, and CRM workflows.
                </p>
              </div>

              <a
                href="https://cal.com/neuralautomate/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Book 30-Min Strategy Call</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-400 font-mono inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Free Consultation • Instant Google Meet Calendar Invitation
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
