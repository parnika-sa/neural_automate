'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, CheckCircle2, Send, Sparkles, ShieldCheck, AlertCircle, Activity, ExternalLink, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const planQuery = searchParams.get('plan');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    workflowType: planQuery ? `${planQuery} Tier Plan Inquiry` : 'Custom AI Workflow',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (planQuery) {
      setFormData((prev) => ({
        ...prev,
        workflowType: `${planQuery} Plan Inquiry`,
        message: prev.message || `Interested in the ${planQuery} tier automation package.`,
      }));
    }
  }, [planQuery]);

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

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch & Schedule Session</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
            Let's Automate Your <span className="gradient-text-electric">Business Operations</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Fill out the quick contact form below or schedule a 1-on-1 video call directly via Cal.com.
          </p>
        </div>

        {/* Primary Contact Form */}
        <div className="max-w-3xl mx-auto tech-card rounded-3xl p-6 sm:p-10 border border-emerald-500/30 bg-[#07120a] shadow-2xl space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-tech-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Send Us a Direct Inquiry</h2>
                  <p className="text-xs text-slate-400">Our n8n automation engineers reply within 2 hours.</p>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  FAST RESPONSE
                </span>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
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
                    placeholder="Ankit Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="ankit@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">COMPANY NAME</label>
                  <input
                    type="text"
                    placeholder="NeuralAutomate"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">WORKFLOW TO AUTOMATE</label>
                  <input
                    type="text"
                    value={formData.workflowType}
                    onChange={(e) => setFormData({ ...formData, workflowType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#040705] border border-tech-border text-xs text-white focus:outline-none focus:border-emerald-400 font-mono transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1.5">PROJECT DETAILS / BOTTLENECKS</label>
                <textarea
                  rows={4}
                  placeholder="Describe the manual tasks, apps, or workflows you want to automate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Sending Inquiry...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Engineers</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received Successfully!</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you <strong className="text-white">{formData.name}</strong>. Our engineering team has received your details and will get back to you at <strong className="text-emerald-400">{formData.email}</strong> within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2.5 rounded-xl text-xs font-mono text-emerald-400 bg-tech-card border border-tech-border hover:border-emerald-400 transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          )}
        </div>

        {/* External Meeting Scheduling Section (Cal.com Links) */}
        <div className="max-w-4xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Prefer a Live Video Call?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Schedule 1-on-1 Session via <span className="gradient-text-electric">Cal.com</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Book a live Google Meet call directly on our official Cal.com scheduling page.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* 15 Min Session Card */}
            <div className="tech-card rounded-2xl p-6 border border-tech-border hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 bg-[#07120a]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#040705] border border-tech-border text-emerald-400 font-bold">
                    15 MINUTES
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">15-Min Technical Audit</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quick call to evaluate your current manual bottlenecks and explore how AI automations save team time.
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
            <div className="tech-card rounded-2xl p-6 border border-tech-border hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4 bg-[#07120a]">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#040705] border border-tech-border text-emerald-400 font-bold">
                    30 MINUTES
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">30-Min Strategy Call</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep-dive architecture session to design custom n8n pipelines, AI agents, and CRM integrations.
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
