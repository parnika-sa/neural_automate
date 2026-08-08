'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, CheckCircle2, Send, Sparkles, ShieldCheck, AlertCircle, Activity, ExternalLink } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const planQuery = searchParams.get('plan');

  const [activeCalType, setActiveCalType] = useState<'15min' | '30min'>('15min');

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Meeting Scheduling & Contact</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
            Schedule Your <span className="gradient-text-electric">AI Automation Call</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Select a session time below to book directly via Cal.com, or send us a message using the quick contact form.
          </p>
        </div>

        {/* Cal.com Live Embed Section */}
        <div className="tech-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 bg-[#07120a] max-w-5xl mx-auto space-y-6 shadow-2xl">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-tech-border pb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Live Calendar Booking (Cal.com)</h3>
                <span className="text-xs font-mono text-slate-400">Instant Google Meet / Zoom Video Call</span>
              </div>
            </div>

            {/* Session Type Toggle Tabs */}
            <div className="flex items-center gap-2 bg-[#040705] p-1.5 rounded-xl border border-tech-border text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveCalType('15min')}
                className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeCalType === '15min'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>15-Min Quick Audit</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCalType('30min')}
                className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  activeCalType === '30min'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>30-Min Strategy Call</span>
              </button>
            </div>
          </div>

          {/* Cal.com Embedded Iframe */}
          <div className="relative w-full rounded-2xl overflow-hidden border border-tech-border bg-[#030604] min-h-[620px]">
            <iframe
              src={`https://cal.com/neuralautomate/${activeCalType}?embed=true&layout=month_view`}
              width="100%"
              height="650px"
              frameBorder="0"
              title="Cal.com Booking Widget"
              className="w-full h-[650px] rounded-2xl"
              allow="camera; microphone; autoplay; clipboard-write;"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-3 pt-2">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Free Consultation • Instant Google Calendar Invite</span>
            </span>
            <a
              href={`https://cal.com/neuralautomate/${activeCalType}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:underline"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="max-w-4xl mx-auto tech-card rounded-3xl p-6 sm:p-8 border border-tech-border">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-tech-border pb-3 flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-white">
                  Or Send Us a Direct Message
                </h3>
                <span className="text-xs font-mono text-emerald-400">Response within 2 hours</span>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">YOUR FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ankit Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="ankit@company.dev"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">COMPANY NAME</label>
                  <input
                    type="text"
                    placeholder="NeuralAutomate"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">WORKFLOW TO AUTOMATE</label>
                  <input
                    type="text"
                    value={formData.workflowType}
                    onChange={(e) => setFormData({ ...formData, workflowType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">PROJECT DETAILS / BOTTLENECKS</label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe the manual tasks you want to automate..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Activity className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Sending Message...</span>
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
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Message Delivered!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you <strong className="text-white">{formData.name}</strong>. We received your inquiry and will email you back at <strong className="text-emerald-400">{formData.email}</strong> within 2 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400 bg-tech-card border border-tech-border hover:border-emerald-400"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
