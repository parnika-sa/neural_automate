import React from 'react';
import { Zap, Clock, ShieldCheck, Activity } from 'lucide-react';

export default function TrustBar() {
  const stats = [
    { label: "Workflows Automated", value: "50+", icon: Zap, color: "text-emerald-400" },
    { label: "Hours Saved Weekly", value: "100+", icon: Clock, color: "text-emerald-300" },
    { label: "System Uptime SLA", value: "99.9%", icon: ShieldCheck, color: "text-teal-400" },
    { label: "Average Response Time", value: "<10s", icon: Activity, color: "text-mint-400" },
  ];

  return (
    <section className="bg-[#060c08] border-y border-tech-border py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-center gap-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">{stat.value}</span>
                </div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
