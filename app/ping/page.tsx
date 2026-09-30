'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Activity, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Zap, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Trash2, 
  ShieldCheck,
  Heart,
  LogOut,
  MessageSquare,
  Coffee,
  PhoneCall,
  Flame,
  CheckCircle,
  Briefcase,
  Moon,
  ExternalLink,
  ShieldAlert,
  CheckCheck
} from 'lucide-react';
import Link from 'next/link';

interface StatusData {
  message: string;
  level: 'normal' | 'important' | 'urgent';
  timestamp: string;
  formattedTime: string;
}

interface ChatMessage {
  id: string;
  sender: 'ankit' | 'gf';
  text: string;
  timestamp: string;
  formattedTime: string;
}

const STATUS_PRESETS = [
  { id: 'operational', level: 'normal' as const, label: '🟢 Operational', message: 'All Systems Operational', icon: CheckCircle },
  { id: 'break', level: 'important' as const, label: '☕ Take Break', message: 'Take break', icon: Coffee },
  { id: 'urgent', level: 'urgent' as const, label: '📞 Urgent Call', message: 'Urgent Call', icon: PhoneCall },
  { id: 'deepwork', level: 'important' as const, label: '⚡ Deep Work', message: 'Deep Work / Do Not Disturb', icon: Flame },
  { id: 'meeting', level: 'important' as const, label: '💼 In a Meeting', message: 'Currently in a meeting', icon: Briefcase },
  { id: 'away', level: 'normal' as const, label: '🌙 Out / Away', message: 'Away for the day', icon: Moon },
];

const QUICK_EMOJIS = ['❤️', '😊', '☕', '👍', '😘', '🌙', '🚗'];

export default function PingControllerPage() {
  const [activeTab, setActiveTab] = useState<'status' | 'chat'>('status');

  // Status Form States
  const [statusMsgText, setStatusMsgText] = useState('');
  const [statusLevel, setStatusLevel] = useState<'normal' | 'important' | 'urgent'>('important');
  const [statusPin, setStatusPin] = useState('');
  const [showStatusPin, setShowStatusPin] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusNotice, setStatusNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [currentLiveStatus, setCurrentLiveStatus] = useState<StatusData | null>(null);
  const [fetchingLiveStatus, setFetchingLiveStatus] = useState(false);

  // Chat Auth & State
  const [chatPinInput, setChatPinInput] = useState('');
  const [showChatPin, setShowChatPin] = useState(false);
  const [activeChatPin, setActiveChatPin] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<'ankit' | 'gf' | null>(null);
  const [chatAuthError, setChatAuthError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInputText, setChatInputText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [clearingChatView, setClearingChatView] = useState(false);
  
  // Ref strictly for internal chat box scrolling ONLY (prevents window scrolling)
  const chatScrollBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCurrentLiveStatus();
    const savedPin = sessionStorage.getItem('ping_active_pin');
    if (savedPin) {
      verifyChatLogin(savedPin, true);
    }
  }, []);

  // Poll chat messages every 2.5 seconds when chat tab is active
  useEffect(() => {
    if (activeChatPin && currentUser && activeTab === 'chat') {
      fetchChatMessages(activeChatPin);
      const interval = setInterval(() => {
        fetchChatMessages(activeChatPin);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeChatPin, currentUser, activeTab]);

  // Scroll ONLY the inner chat div when messages update (DO NOT scroll window)
  useEffect(() => {
    if (activeTab === 'chat' && chatScrollBoxRef.current) {
      chatScrollBoxRef.current.scrollTop = chatScrollBoxRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const fetchCurrentLiveStatus = async () => {
    setFetchingLiveStatus(true);
    try {
      const res = await fetch('/api/gf-status');
      const data = await res.json();
      if (data.success) {
        setCurrentLiveStatus(data.status);
      }
    } catch (e) {
      console.error('Failed to fetch status', e);
    } finally {
      setFetchingLiveStatus(false);
    }
  };

  const handlePresetSelect = (presetMsg: string, presetLvl: 'normal' | 'important' | 'urgent') => {
    setStatusMsgText(presetMsg);
    setStatusLevel(presetLvl);
    setStatusNotice(null);
  };

  const handleStatusNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinToUse = statusPin.trim() || activeChatPin || '';
    
    if (!pinToUse) {
      setStatusNotice({ type: 'error', text: 'Passcode PIN is required to update status.' });
      return;
    }

    if (!statusMsgText.trim()) {
      setStatusNotice({ type: 'error', text: 'Please select a preset or type a custom message.' });
      return;
    }

    setStatusLoading(true);
    setStatusNotice(null);

    try {
      const res = await fetch('/api/gf-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinToUse, message: statusMsgText.trim(), level: statusLevel }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatusNotice({ type: 'error', text: data.error || 'Failed to update status. Invalid PIN.' });
      } else {
        setStatusNotice({ type: 'success', text: 'Status notice updated successfully!' });
        setCurrentLiveStatus(data.status);
        setStatusPin('');

        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    } catch (err) {
      setStatusNotice({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setStatusLoading(false);
    }
  };

  const verifyChatLogin = (inputPin: string, isSilent = false) => {
    const cleanPin = inputPin.trim();
    if (cleanPin === '4681') {
      setActiveChatPin(cleanPin);
      setCurrentUser('ankit');
      sessionStorage.setItem('ping_active_pin', cleanPin);
      setChatAuthError(null);
      setChatPinInput('');
      return true;
    } else if (cleanPin === '9322') {
      setActiveChatPin(cleanPin);
      setCurrentUser('gf');
      sessionStorage.setItem('ping_active_pin', cleanPin);
      setChatAuthError(null);
      setChatPinInput('');
      return true;
    } else {
      if (!isSilent) {
        setChatAuthError('Invalid Passcode PIN. Access Denied.');
      }
      return false;
    }
  };

  const handleChatPinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyChatLogin(chatPinInput);
  };

  const handleInstantLockChat = () => {
    setActiveChatPin(null);
    setCurrentUser(null);
    setMessages([]);
    sessionStorage.removeItem('ping_active_pin');
  };

  const fetchChatMessages = async (userPin: string) => {
    try {
      const res = await fetch(`/api/secret-chat?pin=${encodeURIComponent(userPin)}`);
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (e) {
      console.error('Failed to fetch chat messages', e);
    }
  };

  const handleSendChatMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || chatInputText;

    if (!textToSend.trim() || !activeChatPin) return;

    setSendingMsg(true);
    try {
      const res = await fetch('/api/secret-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: activeChatPin, action: 'send', text: textToSend }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        if (!customText) setChatInputText('');
      }
    } catch (e) {
      console.error('Failed to send chat message', e);
    } finally {
      setSendingMsg(false);
    }
  };

  const handleClearMyChatView = async () => {
    if (!activeChatPin) return;
    if (!confirm('Clear messages on your screen only? (Auto-resets for everyone at 12:00 AM Midnight IST.)')) {
      return;
    }

    setClearingChatView(true);
    try {
      const res = await fetch('/api/secret-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: activeChatPin, action: 'clear' }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages([]);
      }
    } catch (e) {
      console.error('Failed to clear chat view', e);
    } finally {
      setClearingChatView(false);
    }
  };

  const getLevelBadge = (lvl: 'normal' | 'important' | 'urgent') => {
    switch (lvl) {
      case 'urgent': return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'important': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default: return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    }
  };

  return (
    <div className="min-h-[85vh] pt-24 sm:pt-28 pb-10 sm:pb-16 px-3 sm:px-4 w-full max-w-xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full bg-slate-900/95 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4 overflow-hidden">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('status')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'status' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Status Notice</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 relative ${
                activeTab === 'chat' 
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
              <span>Secret Chat</span>
              {activeChatPin && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
            </button>
          </div>

          <Link href="/status" target="_blank" className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 underline flex items-center gap-1">
            <span>/status</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* ================= TAB 1: STATUS NOTICE UPDATE (DEFAULT) ================= */}
        {activeTab === 'status' && (
          <div className="space-y-4 sm:space-y-5">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-semibold border border-cyan-500/20 font-mono">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>System Operational Controller</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                Update Status Notice
              </h1>
              <p className="text-xs text-slate-400 max-w-xs sm:max-w-none mx-auto leading-normal">
                Type or select a status update below. Resets automatically at 12:00 AM Midnight IST.
              </p>
            </div>

            {/* Current Live Notice Box */}
            {currentLiveStatus && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 space-y-2 relative">
                <div className="flex flex-row items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 shrink-0" /> Current Live Notice:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold border ${getLevelBadge(currentLiveStatus.level || 'normal')}`}>
                      {currentLiveStatus.level || 'normal'}
                    </span>
                    <button 
                      type="button" 
                      onClick={fetchCurrentLiveStatus}
                      title="Refresh Live Status"
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${fetchingLiveStatus ? 'animate-spin text-cyan-400' : ''}`} />
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-bold text-white break-words">
                  "{currentLiveStatus.message}"
                </p>

                <div className="text-[11px] text-slate-500 font-mono pt-1 border-t border-slate-900 flex justify-between items-center">
                  <span>Broadcasted: {currentLiveStatus.formattedTime}</span>
                  <span>Region: IST</span>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Quick Status Presets:
                </label>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('All Systems Operational', 'normal')}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                >
                  Reset to Operational
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STATUS_PRESETS.map((p) => {
                  const IconComp = p.icon;
                  const isSelected = statusMsgText === p.message;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p.message, p.level)}
                      className={`py-2.5 px-2.5 rounded-xl border text-left text-xs font-semibold transition-all min-h-[44px] flex items-center gap-2 ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 shrink-0 ${
                        p.level === 'urgent' ? 'text-rose-400' : p.level === 'important' ? 'text-amber-400' : 'text-emerald-400'
                      }`} />
                      <span className="truncate">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleStatusNoticeSubmit} className="space-y-3.5 pt-1">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-300">
                    Custom Status Message:
                  </label>
                  {statusMsgText && (
                    <button
                      type="button"
                      onClick={() => setStatusMsgText('')}
                      className="text-[11px] text-slate-400 hover:text-slate-200 font-mono"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={statusMsgText}
                  onChange={(e) => setStatusMsgText(e.target.value)}
                  placeholder="e.g. Take break"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
                />
              </div>

              {/* Priority Level */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Notice Level:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatusLevel('normal')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      statusLevel === 'normal'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-1 ring-emerald-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusLevel('important')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      statusLevel === 'important'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Important
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusLevel('urgent')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                      statusLevel === 'urgent'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-1 ring-rose-400'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Urgent
                  </button>
                </div>
              </div>

              {/* PIN input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 font-mono">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Passcode PIN (Required):
                </label>
                <div className="relative">
                  <input
                    type={showStatusPin ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={statusPin}
                    onChange={(e) => setStatusPin(e.target.value)}
                    placeholder="XXXX"
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3.5 pr-10 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest min-h-[44px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowStatusPin(!showStatusPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  >
                    {showStatusPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {statusNotice && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  statusNotice.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                }`}>
                  {statusNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span className="break-words">{statusNotice.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={statusLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
              >
                {statusLoading ? (
                  <span>Updating status...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Update Status Notice</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 2: SECRET 2-USER CHAT ================= */}
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {!activeChatPin || !currentUser ? (
              <div className="py-6 space-y-5 text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/20 font-mono">
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>2-User Secret Chat</span>
                </div>
                
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    Unlock Secret Chat
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    Enter Passcode PIN (4681 or 9322) to open your private chat view.
                  </p>
                </div>

                <form onSubmit={handleChatPinSubmit} className="space-y-4 max-w-xs mx-auto">
                  <div className="relative">
                    <input
                      type={showChatPin ? 'text' : 'password'}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={chatPinInput}
                      onChange={(e) => setChatPinInput(e.target.value)}
                      placeholder="Enter Passcode..."
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest text-center min-h-[44px]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowChatPin(!showChatPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                    >
                      {showChatPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {chatAuthError && (
                    <p className="text-xs text-rose-400 font-mono bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                      {chatAuthError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlock Chat</span>
                  </button>
                </form>

                <p className="text-[11px] text-slate-500 font-mono pt-2">
                  🔒 Messages auto-reset daily at 12:00 AM Midnight IST
                </p>
              </div>
            ) : (
              /* Authenticated Chat UI - WHATSAPP STYLE */
              <div className="space-y-2.5">
                
                {/* Chat Top Bar */}
                <div className="flex items-center justify-between bg-slate-950/90 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${currentUser === 'ankit' ? 'bg-cyan-400' : 'bg-purple-400'}`}></span>
                    <div>
                      <span className="font-bold text-white block">
                        {currentUser === 'ankit' ? 'Ankit 💙 (You)' : 'Partner 💕 (You)'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Chatting with {currentUser === 'ankit' ? 'Partner 💕' : 'Ankit 💙'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleClearMyChatView}
                      disabled={clearingChatView}
                      className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors min-h-[32px]"
                      title="Clear messages on your screen only"
                    >
                      <Trash2 className="w-3 h-3 text-rose-400 shrink-0" />
                      <span className="hidden sm:inline">Clear View</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInstantLockChat}
                      className="px-2.5 py-1.5 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-mono font-semibold flex items-center gap-1 transition-colors min-h-[32px]"
                      title="Lock chat immediately"
                    >
                      <LogOut className="w-3 h-3 shrink-0" />
                      <span>Lock</span>
                    </button>
                  </div>
                </div>

                {/* Auto Midnight Notice Bar */}
                <div className="text-[10px] font-mono text-slate-500 text-center flex items-center justify-center gap-1 py-0.5">
                  <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Auto-resets daily at 12:00 AM Midnight IST</span>
                </div>

                {/* WhatsApp-Style Messages Container (Inner scrolling strictly contained) */}
                <div 
                  ref={chatScrollBoxRef}
                  className="h-[350px] sm:h-[400px] overflow-y-auto p-3.5 bg-slate-950/95 rounded-2xl border border-slate-800 space-y-3 scrollbar-thin scroll-smooth"
                >
                  <div className="text-center my-1">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Today (IST)
                    </span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="h-[80%] flex flex-col items-center justify-center text-center p-4 space-y-2">
                      <Heart className="w-8 h-8 text-slate-700 animate-bounce" />
                      <p className="text-xs text-slate-400 font-semibold">No messages yet today.</p>
                      <p className="text-[11px] text-slate-500 max-w-xs">
                        Messages sent by both of you will appear here with WhatsApp-style timestamps!
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.sender === currentUser;
                      const senderName = isMe 
                        ? 'You' 
                        : (msg.sender === 'ankit' ? 'Ankit 💙' : 'Partner 💕');

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[78%] px-3.5 py-2.5 rounded-2xl text-xs font-medium leading-relaxed break-words shadow-md transition-all ${
                              isMe
                                ? 'bg-cyan-600 text-white rounded-br-xs'
                                : 'bg-slate-800 border border-slate-700 text-slate-100 rounded-bl-xs'
                            }`}
                          >
                            {/* Sender Name */}
                            <div className={`text-[10px] font-bold mb-1 font-mono flex items-center justify-between gap-3 ${
                              isMe ? 'text-cyan-200' : 'text-purple-300'
                            }`}>
                              <span>{senderName}</span>
                            </div>

                            {/* Message Body */}
                            <p className="whitespace-pre-wrap text-xs font-sans text-slate-100">
                              {msg.text}
                            </p>

                            {/* Timestamp & Status Icon */}
                            <div className={`flex items-center justify-end gap-1 text-[9px] font-mono mt-1 ${
                              isMe ? 'text-cyan-200/80' : 'text-slate-400'
                            }`}>
                              <span>{msg.formattedTime}</span>
                              {isMe && <CheckCheck className="w-3 h-3 text-cyan-200 inline shrink-0" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Emoji Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">Quick:</span>
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleSendChatMessage(undefined, emoji)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs transition-transform active:scale-95 shrink-0 min-h-[32px] flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form onSubmit={handleSendChatMessage} className="flex items-center gap-2 pt-0.5">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[44px]"
                  />
                  <button
                    type="submit"
                    disabled={sendingMsg || !chatInputText.trim()}
                    className="py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg transition-all disabled:opacity-40 flex items-center gap-1.5 shrink-0 min-h-[44px]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
