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
  LogOut,
  Coffee,
  PhoneCall,
  Flame,
  CheckCircle,
  Briefcase,
  Moon,
  ExternalLink,
  ShieldAlert,
  Terminal
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

  // Stealth Console (Chat) Auth & State
  const [chatPinInput, setChatPinInput] = useState('');
  const [showChatPin, setShowChatPin] = useState(false);
  const [activeChatPin, setActiveChatPin] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<'ankit' | 'gf' | null>(null);
  const [chatAuthError, setChatAuthError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInputText, setChatInputText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [clearingChatView, setClearingChatView] = useState(false);
  
  // Container scroll ref
  const chatScrollBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCurrentLiveStatus();
    const savedPin = sessionStorage.getItem('ping_active_pin');
    if (savedPin) {
      verifyChatLogin(savedPin, true);
    }
  }, []);

  // Poll chat messages every 2.0 seconds for steady, reliable updates without rate limits
  useEffect(() => {
    if (activeChatPin && currentUser && activeTab === 'chat') {
      fetchChatMessages(activeChatPin);
      const interval = setInterval(() => {
        fetchChatMessages(activeChatPin);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [activeChatPin, currentUser, activeTab]);

  // Scroll ONLY the inner chat div to bottom when messages update
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
      setCurrentUser('ankit'); // Alpha
      sessionStorage.setItem('ping_active_pin', cleanPin);
      setChatAuthError(null);
      setChatPinInput('');
      return true;
    } else if (cleanPin === '9322') {
      setActiveChatPin(cleanPin);
      setCurrentUser('gf'); // Pixel
      sessionStorage.setItem('ping_active_pin', cleanPin);
      setChatAuthError(null);
      setChatPinInput('');
      return true;
    } else {
      if (!isSilent) {
        setChatAuthError('Invalid Security Passcode.');
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
      if (data.success && Array.isArray(data.messages)) {
        setMessages(prev => {
          // Merge incoming server messages with any optimistic local messages
          const serverMsgs = data.messages as ChatMessage[];
          if (serverMsgs.length === 0 && prev.length === 0) return [];
          
          const map = new Map<string, ChatMessage>();
          prev.forEach(m => {
            if (m.id.startsWith('temp-')) map.set(m.id, m);
          });
          serverMsgs.forEach(m => map.set(m.id, m));
          
          return Array.from(map.values());
        });
      }
    } catch (e) {
      console.error('Failed to fetch chat messages', e);
    }
  };

  const handleSendChatMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || chatInputText;

    if (!textToSend.trim() || !activeChatPin || !currentUser) return;

    const currentNow = new Date();
    const formattedTime = currentNow.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });

    const tempId = `temp-${Date.now()}`;
    const tempMsg: ChatMessage = {
      id: tempId,
      sender: currentUser,
      text: textToSend.trim(),
      timestamp: currentNow.toISOString(),
      formattedTime
    };

    // Instant Optimistic Update
    setMessages(prev => [...prev, tempMsg]);
    if (!customText) setChatInputText('');
    setSendingMsg(true);

    try {
      const res = await fetch('/api/secret-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: activeChatPin, action: 'send', text: textToSend }),
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (e) {
      console.error('Failed to send message', e);
    } finally {
      setSendingMsg(false);
    }
  };

  const handleClearMyChatView = async () => {
    if (!activeChatPin) return;
    if (!confirm('Clear messages on your screen view only?')) {
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
    <div className="min-h-[85vh] pt-16 sm:pt-24 pb-6 sm:pb-12 px-2.5 sm:px-4 w-full max-w-xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full bg-slate-900/95 border border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-2xl backdrop-blur-xl space-y-3 overflow-hidden">
        
        {/* Navigation Tabs Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
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
                  ? 'bg-slate-800 text-slate-200 border border-slate-700 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Console</span>
              {activeChatPin && <span className="w-2 h-2 rounded-full bg-emerald-400 font-mono"></span>}
            </button>
          </div>

          <Link href="/status" target="_blank" className="text-[11px] font-mono text-slate-400 hover:text-cyan-400 underline flex items-center gap-1">
            <span>/status</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* ================= TAB 1: STATUS NOTICE UPDATE (DEFAULT) ================= */}
        {activeTab === 'status' && (
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[11px] font-semibold border border-cyan-500/20 font-mono">
                <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>System Operational Controller</span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white">
                Update Status Notice
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400 max-w-xs sm:max-w-none mx-auto">
                Type or select a status update below. Resets automatically at 12:00 AM Midnight IST.
              </p>
            </div>

            {/* Current Live Notice Box */}
            {currentLiveStatus && (
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <div className="flex flex-row items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1 text-cyan-400 font-semibold">
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

                <p className="text-sm font-bold text-white break-words">
                  "{currentLiveStatus.message}"
                </p>

                <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900 flex justify-between items-center">
                  <span>Broadcasted: {currentLiveStatus.formattedTime}</span>
                  <span>Region: IST</span>
                </div>
              </div>
            )}

            {/* Presets */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1 font-mono">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Presets:
                </label>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('All Systems Operational', 'normal')}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono"
                >
                  Reset to Operational
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {STATUS_PRESETS.map((p) => {
                  const IconComp = p.icon;
                  const isSelected = statusMsgText === p.message;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p.message, p.level)}
                      className={`py-2 px-2 rounded-xl border text-left text-xs font-semibold transition-all min-h-[40px] flex items-center gap-2 ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 ring-1 ring-cyan-400 shadow-sm'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <IconComp className={`w-3.5 h-3.5 shrink-0 ${
                        p.level === 'urgent' ? 'text-rose-400' : p.level === 'important' ? 'text-amber-400' : 'text-emerald-400'
                      }`} />
                      <span className="truncate text-xs">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleStatusNoticeSubmit} className="space-y-3 pt-0.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">
                  Custom Message:
                </label>
                <input
                  type="text"
                  value={statusMsgText}
                  onChange={(e) => setStatusMsgText(e.target.value)}
                  placeholder="e.g. Take break"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[42px]"
                />
              </div>

              {/* Priority Level */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 font-mono">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Priority:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStatusLevel('normal')}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                      statusLevel === 'normal'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusLevel('important')}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                      statusLevel === 'important'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Important
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusLevel('urgent')}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                      statusLevel === 'urgent'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    Urgent
                  </button>
                </div>
              </div>

              {/* PIN input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 font-mono">
                  <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Passcode PIN:
                </label>
                <div className="relative">
                  <input
                    type={showStatusPin ? 'text' : 'password'}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={statusPin}
                    onChange={(e) => setStatusPin(e.target.value)}
                    placeholder="Enter Security PIN..."
                    required
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest min-h-[42px]"
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
                <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                  statusNotice.type === 'success' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                }`}>
                  {statusNotice.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span className="break-words">{statusNotice.text}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={statusLoading}
                className="w-full py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
              >
                {statusLoading ? (
                  <span>Updating...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Update Status Notice</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 2: STEALTH CONSOLE (CHAT) ================= */}
        {activeTab === 'chat' && (
          <div className="space-y-2.5">
            {!activeChatPin || !currentUser ? (
              <div className="py-5 space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span>System Authentication</span>
                </div>
                
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-white">
                    Console Security Access
                  </h2>
                </div>

                <form onSubmit={handleChatPinSubmit} className="space-y-3 max-w-xs mx-auto">
                  <div className="relative">
                    <input
                      type={showChatPin ? 'text' : 'password'}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={chatPinInput}
                      onChange={(e) => setChatPinInput(e.target.value)}
                      placeholder="Enter Security PIN..."
                      required
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-4 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono tracking-widest text-center min-h-[44px]"
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
                    <p className="text-xs text-rose-400 font-mono bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                      {chatAuthError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize</span>
                  </button>
                </form>
              </div>
            ) : (
              /* Authenticated Stealth Chat UI */
              <div className="space-y-2">
                
                {/* Chat Top Bar */}
                <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-slate-200 text-xs">
                      {currentUser === 'ankit' ? 'Alpha' : 'Pixel'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handleClearMyChatView}
                      disabled={clearingChatView}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1 transition-colors min-h-[30px]"
                      title="Clear screen view"
                    >
                      <Trash2 className="w-3 h-3 text-rose-400 shrink-0" />
                      <span>Clear</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleInstantLockChat}
                      className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-[11px] font-mono font-semibold flex items-center gap-1 transition-colors min-h-[30px]"
                      title="Lock console"
                    >
                      <LogOut className="w-3 h-3 shrink-0" />
                      <span>Lock</span>
                    </button>
                  </div>
                </div>

                {/* Highly Efficient Compact Messages Box */}
                <div 
                  ref={chatScrollBoxRef}
                  className="h-[360px] sm:h-[460px] max-h-[60vh] overflow-y-auto p-2.5 sm:p-3 bg-slate-950/95 rounded-2xl border border-slate-800/90 space-y-1.5 scrollbar-thin scroll-smooth"
                >
                  <div className="text-center my-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[9px] font-mono text-slate-500">
                      Today (IST)
                    </span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="h-[80%] flex flex-col items-center justify-center text-center p-4">
                      <p className="text-xs text-slate-500 font-mono">Console session initialized. Send a message.</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe = msg.sender === currentUser;
                      const senderTag = msg.sender === 'ankit' ? 'Alpha' : 'Pixel';

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[78%] px-3 py-1.5 rounded-xl text-xs leading-snug break-words shadow-sm transition-all flex flex-col ${
                              isMe
                                ? 'bg-cyan-600 text-white rounded-br-none'
                                : 'bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-none'
                            }`}
                          >
                            <div className={`flex items-center justify-between gap-3 text-[10px] font-bold font-mono opacity-90 pb-0.5 ${
                              isMe ? 'text-cyan-200' : 'text-purple-300'
                            }`}>
                              <span>{senderTag}</span>
                              <span className="text-[9px] font-normal text-slate-300">{msg.formattedTime}</span>
                            </div>

                            <p className="text-xs whitespace-pre-wrap font-sans text-slate-100">
                              {msg.text}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Emoji Bar */}
                <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleSendChatMessage(undefined, emoji)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs transition-transform active:scale-95 shrink-0 min-h-[32px] flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                {/* Message Input Form */}
                <form onSubmit={handleSendChatMessage} className="flex items-center gap-1.5 pt-0.5">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 min-h-[42px]"
                  />
                  <button
                    type="submit"
                    disabled={sendingMsg || !chatInputText.trim()}
                    className="py-2.5 px-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition-all disabled:opacity-40 flex items-center gap-1 shrink-0 min-h-[42px]"
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
