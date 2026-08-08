import React from 'react';
import { Cpu } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#040705]/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
      <div className="relative w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
        <Cpu className="w-6 h-6 animate-pulse" />
      </div>

      <div className="flex flex-col items-center space-y-2 font-mono">
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NeuralAutomate Pipeline Loading...</span>
        </div>
        <div className="w-48 h-1 bg-slate-900 rounded-full overflow-hidden border border-emerald-500/20">
          <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
