'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, Heart, AlertCircle, CheckCircle2, Lock, Sparkles, MessageSquare, Zap, Clock } from 'lucide-react';
import Link from 'next/link';

interface StatusData {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
  updatedBy: string;
}

const PRESETS = [
  {
    id: 'whatsapp',
    level: 'important' as const,
    label: '💛 Sent WhatsApp Message',
    message: 'Hey Ankit, I sent you a message on WhatsApp! Take a break when you can. 📱❤️',
    badge: 'Important'
  },
  {
    id: 'urgent',
    level: 'urgent' as const,
    label: '🔴 Urgent - Take Break ASAP',
    message: 'Urgent! Please take a 1-hour break and call/message me right now! 🚨',
    badge: 'Urgent Alert'
  },
  {
    id: 'normal',
    level: 'normal' as const,
    label: '🟢 Just Checking In',
    message: 'Just checking in! Hope your shift is going smoothly. Love you! ❤️',
    badge: 'Normal'
  }
];

export default function PingPage() {
  const [pin, setPin] = useState('1234');
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState<'normal' | 'important' | 'urgent'>('important');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentStatus, setCurrentStatus] = useState<StatusData | null>(null);

  // Load saved PIN on mount
  useEffect(() => {
    const savedPin = localStorage.getItem('gf_ping_pin');
    if (savedPin) {
      setPin(savedPin);
    }
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

  const handlePresetSelect = (presetMessage: string, presetLevel: 'normal' | 'important' | 'urgent') => {
    setMessage(presetMessage);
    setLevel(presetLevel);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatusMsg({ type: 'error', text: 'Please enter a message or select a preset.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/gf-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin, message, level }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to update status.' });
      } else {
        localStorage.setItem('gf_ping_pin', pin);
        setStatusMsg({ type: 'success', text: 'Status posted! Ankit can now see it via AI Overview.' });
        setCurrentStatus(data.status);
        setMessage('');

        // Trigger celebrate confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] py-12 px-4 max-w-2xl mx-auto flex flex-col justify-center">
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2 pb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 text-xs font-semibold border border-pink-500/20">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-bounce" />
            <span>Ankit & Girlfriend Private Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Send Status Ping
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Update your message here. Ankit can read this from his office using Google AI Overview even without access to his phone!
          </p>
        </div>

        {/* Current Live Status Card */}
        {currentStatus && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono text-cyan-400">
                <Clock className="w-3.5 h-3.5" /> Currently Posted Status:
              </span>
              <span className="text-slate-400">{currentStatus.formattedTime}</span>
            </div>
            <p className="text-sm font-medium text-slate-200 italic">
              "{currentStatus.message}"
            </p>
          </div>
        )}

        {/* Quick Presets */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> 1-Tap Quick Presets:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePresetSelect(p.message, p.level)}
                className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex flex-col justify-between gap-2 ${
                  message === p.message
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <span>{p.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">{p.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {/* Custom Message Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Or Write Custom Message:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Visible to AI Overview</span>
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Call me on break! Sent message on WhatsApp..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Priority Level Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Priority Alert Level:</label>
            <div className="flex gap-2">
              {[
                { id: 'normal', label: '🟢 Normal', color: 'peer-checked:bg-emerald-500/20 peer-checked:border-emerald-500 text-emerald-400' },
                { id: 'important', label: '💛 Important', color: 'peer-checked:bg-amber-500/20 peer-checked:border-amber-500 text-amber-400' },
                { id: 'urgent', label: '🔴 Urgent Break', color: 'peer-checked:bg-rose-500/20 peer-checked:border-rose-500 text-rose-400' }
              ].map((lvl) => (
                <label key={lvl.id} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="level"
                    value={lvl.id}
                    checked={level === lvl.id}
                    onChange={() => setLevel(lvl.id as any)}
                    className="sr-only peer"
                  />
                  <div className={`p-2.5 rounded-xl border border-slate-700 text-center text-xs font-semibold transition-all bg-slate-950/60 peer-checked:ring-1 ${lvl.color}`}>
                    {lvl.label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Security PIN */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> Passcode PIN:
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
              className="w-full max-w-[140px] bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Feedback message */}
          {statusMsg && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
            }`}>
              {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{statusMsg.text}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Posting update...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Status Ping to Ankit</span>
              </>
            )}
          </button>
        </form>

        {/* View Public Status Page Link */}
        <div className="pt-2 text-center text-xs">
          <Link href="/status" className="text-slate-400 hover:text-cyan-400 underline font-mono flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Check how it looks on public /status page</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
