'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#040705] text-white flex flex-col items-center justify-center p-4 text-center space-y-6">
      <h2 className="text-3xl font-display font-extrabold text-emerald-400">Something went wrong!</h2>
      <p className="text-slate-400 text-xs max-w-md font-mono">
        {error.message || 'An unexpected runtime error occurred.'}
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-tech-card border border-tech-border flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
