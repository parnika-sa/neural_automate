'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Activity, Lock, CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react';
import Link from 'next/link';

interface StatusData {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
}

const QUICK_PRESETS = [
  {
    id: 'break',
    level: 'important' as const,
    label: '💛 Take break',
    message: 'Take break',
  },
  {
    id: 'urgent',
    level: 'urgent' as const,
    label: '🔴 Urgent Call',
    message: 'Urgent Call',
  },
  {
    id: 'normal',
    level: 'normal' as const,
    label: '🟢 Operational',
    message: 'All Systems Operational',
  }
];

export default function StatusControlPage() {
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState<'normal' | 'important' | 'urgent'>('important');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentStatus, setCurrentStatus] = useState<StatusData | null>(null);

  useEffect(() => {
    fetchCurrentStatus();
  }, []);

  const fetchCurrentStatus = async () => {
    try {
      const res = await fetch('/api/gf-status');
      const data = await res.json();
      if (data.success) {
        setCurrentStatus(data.status);
      }
    } catch (e) {
      console.error('Failed to fetch status', e);
    }
  };

  const handlePresetSelect = (presetMsg: string, presetLvl: 'normal' | 'important' | 'urgent') => {
    setMessage(presetMsg);
    setLevel(presetLvl);
    setStatusMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pin.trim()) {
      setStatusMsg({ type: 'error', text: 'Passcode PIN is required to update status.' });
      return;
    }

    if (!message.trim()) {
      setStatusMsg({ type: 'error', text: 'Please select a status or enter custom text.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/gf-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim(), message: message.trim(), level }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to update status. Invalid PIN.' });
      } else {
        setStatusMsg({ type: 'success', text: 'Status notice updated successfully!' });
        setCurrentStatus(data.status);
        setPin(''); // Reset PIN input so next update requires entering PIN again

        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] py-6 sm:py-12 px-3 sm:px-4 w-full max-w-xl mx-auto flex flex-col justify-center items-center">
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5 sm:space-y-6 overflow-hidden">
        
        {/* Header */}
        <div className="text-center space-y-2 pb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] sm:text-xs font-semibold border border-cyan-500/20 font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>System Operational Controller</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Update Status Notice
          </h1>
          <p className="text-xs text-slate-400 max-w-xs sm:max-w-none mx-auto leading-normal">
            Select or enter a status update below. Resets automatically at 12:00 AM Midnight IST.
          </p>
        </div>

        {/* Current Status Box */}
        {currentStatus && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 font-mono gap-1">
              <span className="flex items-center gap-1 text-cyan-400">
                <Clock className="w-3.5 h-3.5 shrink-0" /> Current Live Notice:
              </span>
              <span className="text-slate-300 font-bold sm:font-normal">{currentStatus.formattedTime}</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white break-words">
              "{currentStatus.message}"
            </p>
          </div>
        )}

        {/* Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Quick Status Presets:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {QUICK_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetSelect(p.message, p.level)}
                className={`py-3 px-2 rounded-xl border text-center text-xs font-semibold transition-all min-h-[44px] flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  message === p.message
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          
          {/* Message input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Custom Status Message:
            </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Take break"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
            />
          </div>

          {/* Passcode PIN - Mandatory every submission */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 font-mono">
              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Enter Passcode PIN (Required):
            </label>
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="e.g. 9322"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest min-h-[44px]"
            />
          </div>

          {statusMsg && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span className="break-words">{statusMsg.text}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
          >
            {loading ? (
              <span>Updating status...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Update Status Notice</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-1 text-center text-xs">
          <Link href="/status" className="text-slate-400 hover:text-cyan-400 underline font-mono">
            View Public Status Page
          </Link>
        </div>

      </div>
    </div>
  );
}

