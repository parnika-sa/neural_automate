import type { Metadata } from 'next';
import { getSystemStatus } from '@/lib/gf-status';
import Link from 'next/link';
import { Activity, Clock, Server, CheckCircle2, AlertTriangle, Info, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const status = getSystemStatus();
  return {
    title: `System Status: ${status.message} (${status.formattedTime}) - NeuralAutomate`,
    description: `Current NeuralAutomate service status notice: "${status.message}". Updated at ${status.formattedTime}.`,
    openGraph: {
      title: `NeuralAutomate Infrastructure Status: ${status.message}`,
      description: `Live Operational Feed - Updated at ${status.formattedTime}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default function StatusPage() {
  const status = getSystemStatus();

  const isUrgent = status.level === 'urgent';
  const isImportant = status.level === 'important';

  const badgeColor = isUrgent
    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
    : isImportant
    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';

  const badgeText = isUrgent
    ? 'URGENT NOTICE PENDING'
    : isImportant
    ? 'SCHEDULED NOTICE ACTIVE'
    : 'ALL SYSTEMS OPERATIONAL';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'NeuralAutomate System Status',
    'headline': `Current Status: ${status.message}`,
    'dateModified': status.timestamp,
    'description': status.message,
  };

  return (
    <div className="min-h-[85vh] py-16 px-4 max-w-4xl mx-auto flex flex-col justify-center items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm uppercase tracking-wider mb-1">
              <Activity className="w-4 h-4 animate-pulse" />
              <span>Live Infrastructure Health & Operational Status</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Server className="w-6 h-6 text-cyan-400" />
              <span>System Operational Status</span>
            </h1>
          </div>
          
          <div className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-2 ${badgeColor}`}>
            {isUrgent && <AlertTriangle className="w-4 h-4" />}
            {isImportant && <Info className="w-4 h-4" />}
            {!isUrgent && !isImportant && <CheckCircle2 className="w-4 h-4" />}
            <span>{badgeText}</span>
          </div>
        </div>

        {/* Message Container for Crawler & AI Overview */}
        <article className="bg-slate-950/90 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-inner">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" />
              Last Broadcast: <time dateTime={status.timestamp} className="text-slate-200 font-bold">{status.formattedTime}</time>
            </span>
            <span className="text-slate-500 font-mono">Region: Asia-Pacific (IST)</span>
          </div>

          <div className="py-2">
            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">Current System Status Notice:</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-wide leading-relaxed">
              "{status.message}"
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between text-xs text-slate-400 gap-2">
            <div>
              <span className="font-semibold text-cyan-400">Notice State: </span>
              {status.message}
            </div>
            <Link 
              href="/status/raw" 
              className="text-slate-500 hover:text-cyan-400 transition-colors underline font-mono shrink-0"
              target="_blank"
            >
              View Raw Text Feed
            </Link>
          </div>
        </article>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs pt-2">
          <p>
            Authorized operators can update system status at <Link href="/ping" className="text-slate-400 underline hover:text-cyan-400">/ping</Link>
          </p>
          
          <div className="flex items-center gap-2 text-slate-500 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Auto-Resets at 12:00 AM Midnight IST</span>
          </div>
        </div>

      </div>
    </div>
  );
}
