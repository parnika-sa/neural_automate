'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function DataDeletionForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name and registered email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: phone.trim() ? `Phone: ${phone.trim()}` : 'N/A',
          workflowType: 'Data Deletion Request',
          message: details.trim() || 'User requested full deletion of personal records and chatbot logs.',
          preferredSlot: 'Immediate Request',
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit deletion request.');
      }

      setStatus('success');
      // Navigate to thank you page after slight delay
      setTimeout(() => {
        router.push('/thank-you?source=data-deletion');
      }, 1500);
    } catch (err: any) {
      console.error('Data Deletion Request Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Network error. Please try sending an email directly to ' + SITE_CONFIG.email);
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-display font-bold text-white">Deletion Request Received</h3>
        <p className="text-sm text-slate-300">
          We have logged your request. Our team will verify your identity and confirm deletion within 30 calendar days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 space-y-4 shadow-xl">
      {status === 'error' && (
        <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="del-name" className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            id="del-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-xl bg-[#040705] border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs transition-colors"
          />
        </div>

        <div>
          <label htmlFor="del-email" className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
            Registered Email *
          </label>
          <input
            id="del-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-4 py-2.5 rounded-xl bg-[#040705] border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="del-phone" className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
          WhatsApp / Phone Number (Optional)
        </label>
        <input
          id="del-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className="w-full px-4 py-2.5 rounded-xl bg-[#040705] border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs transition-colors"
        />
      </div>

      <div>
        <label htmlFor="del-details" className="block text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider mb-1">
          Specific Data to Remove (Optional)
        </label>
        <textarea
          id="del-details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="e.g., Delete all WhatsApp chatbot logs from my phone number."
          className="w-full px-4 py-2.5 rounded-xl bg-[#040705] border border-emerald-500/20 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-xs transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Data Deletion Request</span>
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center font-mono">
        Prefer direct email? Write to <a href={`mailto:${SITE_CONFIG.email}?subject=Data Deletion Request`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a>
      </p>
    </form>
  );
}
