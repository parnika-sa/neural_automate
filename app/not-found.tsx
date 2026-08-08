import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#040705] text-white flex flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
        <Cpu className="w-6 h-6 animate-pulse" />
      </div>
      <h1 className="text-4xl font-display font-extrabold">404 - Page Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md">
        The requested automation route or page does not exist on NeuralAutomate.dev.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}
