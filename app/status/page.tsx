import type { Metadata } from 'next';
import { getSystemStatusAsync } from '@/lib/gf-status';
import Link from 'next/link';
import { Activity, Clock, Server, CheckCircle2, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const status = await getSystemStatusAsync();
  return {
    title: `System Status: "${status.message}" (${status.formattedTime}) - NeuralAutomate`,
    description: `Current NeuralAutomate service status notice: "${status.message}". Updated at ${status.formattedTime}.`,
    openGraph: {
      title: `NeuralAutomate Infrastructure Status: "${status.message}"`,
      description: `Live Operational Feed - Updated at ${status.formattedTime}`,
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function StatusPage() {
  const status = await getSystemStatusAsync();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'NeuralAutomate System Status',
    'headline': `Current Status: ${status.message}`,
    'dateModified': status.timestamp,
    'description': status.message,
  };

  return (
    <div className="min-h-[85vh] pt-24 pb-10 sm:pt-28 sm:pb-16 px-3 sm:px-4 max-w-4xl mx-auto flex flex-col justify-center items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm uppercase tracking-wider mb-1">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse shrink-0" />
              <span>Live Infrastructure Health & Operational Status</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              <Server className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0" />
              <span>System Operational Status</span>
            </h1>
          </div>
          
          <div className="px-3.5 py-1.5 rounded-full border text-xs sm:text-sm font-semibold flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>LIVE NOTICE ACTIVE</span>
          </div>
        </div>

        {/* Message Container for Crawler & AI Overview */}
        <article className="bg-slate-950/90 border border-slate-800/80 rounded-xl sm:rounded-2xl p-4 sm:p-8 space-y-4 shadow-inner">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-slate-400 text-xs font-mono gap-1.5 sm:gap-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0" />
              <span>Last Broadcast: <time dateTime={status.timestamp} className="text-slate-200 font-bold">{status.formattedTime}</time></span>
            </span>
            <span className="text-slate-500 font-mono">Region: Asia-Pacific (IST)</span>
          </div>

          <div className="py-2 sm:py-4">
            <h2 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">Current System Status Notice:</h2>
            <p className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide break-words leading-tight sm:leading-relaxed">
              "{status.message}"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/60 flex flex-row justify-end items-center text-xs text-slate-400">
            <Link 
              href="/status/raw" 
              className="text-slate-500 hover:text-cyan-400 transition-colors underline font-mono text-xs"
              target="_blank"
            >
              View Raw Text Feed
            </Link>
          </div>
        </article>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-xs pt-1 sm:pt-2 text-center sm:text-left">
          <p>
            Authorized operators can update system status at <Link href="/ping" className="text-slate-400 underline hover:text-cyan-400">/ping</Link>
          </p>
          
          <div className="flex items-center gap-2 text-slate-500 font-mono">
            <RefreshCw className="w-3.5 h-3.5 animate-spin shrink-0" />
            <span>Auto-Resets at 12:00 AM Midnight IST</span>
          </div>
        </div>

      </div>
    </div>
  );
}

