'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, Clock, CheckCircle2, Send, Sparkles, ShieldCheck, AlertCircle, Activity } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function ContactPage() {
  const searchParams = useSearchParams();
  const planQuery = searchParams.get('plan');

  const [selectedDate, setSelectedDate] = useState('Tomorrow, 10:00 AM');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    workflowType: planQuery ? `${planQuery} Tier Plan Inquiry` : 'WhatsApp AI Bot',
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

    trackEvent('contact_form_submitted', { ...formData, selectedDate });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, preferredSlot: selectedDate }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to reserve slot. Please try again.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dates = [
    'Tomorrow, 10:00 AM',
    'Thursday, 2:00 PM',
    'Friday, 11:30 AM',
    'Next Monday, 4:00 PM'
  ];

  return (
    <div className="pt-28 pb-20 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book a 1-on-1 Strategy Session</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
            Schedule Your <span className="gradient-text-electric">AI Automation Call</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Select a convenient time slot for a 15-minute technical audit with our n8n automation engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Calendly-Style Slot Picker */}
          <div className="lg:col-span-5 tech-card rounded-3xl p-6 sm:p-8 border border-tech-border space-y-6 bg-[#07120a]">
            <div className="flex items-center gap-3 border-b border-tech-border pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">15-Min Strategy Session</h3>
                <span className="text-[11px] font-mono text-slate-400">Google Meet Video Call</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 block uppercase">SELECT CONVENIENT TIME SLOT</span>
              <div className="space-y-2">
                {dates.map((d, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between transition-all ${
                      selectedDate === d
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-500/10'
                        : 'bg-[#040705] border-tech-border text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{d}</span>
                    </span>
                    {selectedDate === d && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#040705] border border-tech-border text-xs text-slate-400 space-y-1">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> What We Cover On The Call:
              </div>
              <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
                <li>• Review your current manual process bottlenecks</li>
                <li>• Propose n8n & AI agent architecture</li>
                <li>• Deliver 24-hour fixed quote proposal</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 tech-card rounded-3xl p-6 sm:p-8 border border-tech-border">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-display font-bold text-white border-b border-tech-border pb-3">
                  Your Contact Information
                </h3>

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
                      <span>Reserving Slot & Sending Confirmation...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm Strategy Call Slot ({selectedDate})</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white">Strategy Call Reserved!</h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                  Thank you <strong className="text-white">{formData.name}</strong>. Confirmation emails & Google Meet invitations sent to <strong className="text-emerald-400">{formData.email}</strong> and <strong className="text-emerald-400">info@neuralautomate.dev</strong>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400 bg-tech-card border border-tech-border hover:border-emerald-400"
                >
                  Book Another Session
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
