import type { Metadata } from 'next';
import { getGFStatus } from '@/lib/gf-status';
import Link from 'next/link';
import { Clock, MessageSquare, AlertTriangle, CheckCircle, BellRing, ShieldCheck, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const status = getGFStatus();
  const levelPrefix = status.level === 'urgent' 
    ? '🔴 URGENT BREAK ALERT' 
    : status.level === 'important' 
    ? '💛 IMPORTANT PING' 
    : '🟢 NORMAL STATUS';
  
  return {
    title: `${levelPrefix}: ${status.message} - NeuralAutomate Status`,
    description: `GF Message Update for Ankit (${status.formattedTime}): "${status.message}". Status Priority: ${status.level.toUpperCase()}.`,
    openGraph: {
      title: `${levelPrefix}: ${status.message}`,
      description: `Updated at ${status.formattedTime} - ${status.message}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default function StatusPage() {
  const status = getGFStatus();

  const isUrgent = status.level === 'urgent';
  const isImportant = status.level === 'important';

  const badgeColor = isUrgent
    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
    : isImportant
    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';

  const badgeText = isUrgent
    ? '🚨 URGENT - TAKE 1-HOUR BREAK NOW!'
    : isImportant
    ? '💬 MESSAGE RECEIVED - PING ON BREAK'
    : '🟢 ALL GOOD - NO IMMEDIATE ACTION';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SpecialAnnouncement',
    'name': 'Girlfriend Status Update for Ankit',
    'text': status.message,
    'datePosted': status.timestamp,
    'announcementLocation': {
      '@type': 'CivicStructure',
      'name': 'NeuralAutomate Status Portal'
    },
    'category': status.level
  };

  return (
    <div className="min-h-[85vh] py-16 px-4 max-w-4xl mx-auto flex flex-col justify-center items-center">
      {/* Schema for AI Crawler / Google AI Overview */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">
              <BellRing className="w-4 h-4 animate-pulse" />
              <span>Live Status Feed & AI Overview Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ankit & GF Sync Portal
            </h1>
          </div>
          
          <div className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-2 ${badgeColor}`}>
            {isUrgent && <AlertTriangle className="w-4 h-4" />}
            {isImportant && <MessageSquare className="w-4 h-4" />}
            {!isUrgent && !isImportant && <CheckCircle className="w-4 h-4" />}
            <span>{badgeText}</span>
          </div>
        </div>

        {/* Primary Message Card (Target for AI Overview Scraping) */}
        <article className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Updated at: <time dateTime={status.timestamp} className="text-slate-200 font-bold">{status.formattedTime}</time>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Sender: <strong className="text-white">{status.updatedBy}</strong>
            </span>
          </div>

          <div className="py-2">
            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">Latest Message:</h2>
            <p className="text-xl sm:text-2xl font-medium text-slate-100 leading-relaxed bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              "{status.message}"
            </p>
          </div>

          {/* Special recommendation box for Office AI Overview */}
          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between text-xs text-slate-400 gap-2">
            <div>
              <span className="font-semibold text-cyan-400">Office Action: </span>
              {isUrgent 
                ? "Immediate 1-hour break recommended. Girlfriend needs to talk urgently." 
                : isImportant 
                ? "Girlfriend sent a message around 9 PM. Take break when comfortable."
                : "No urgent message. Focus on shift work."}
            </div>
            <Link 
              href="/status/raw" 
              className="text-slate-500 hover:text-cyan-400 transition-colors underline font-mono flex items-center gap-1 shrink-0"
              target="_blank"
            >
              <span>View Plain Text Raw Endpoint</span>
            </Link>
          </div>
        </article>

        {/* Footer info for GF & Ankit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs pt-2">
          <p>
            Update status on the secret page:{" "}
            <Link href="/ping" className="text-cyan-400 underline font-semibold hover:text-cyan-300">
              Go to /ping form
            </Link>
          </p>
          
          <div className="flex items-center gap-2 text-slate-500 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>SSR Auto-Refreshed on Request</span>
          </div>
        </div>

      </div>
    </div>
  );
}
