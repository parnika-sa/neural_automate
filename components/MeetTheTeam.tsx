'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  teamMembers, 
  teamCategories, 
  TeamCategory, 
  TeamMember 
} from '@/lib/team';
import { 
  User, 
  Brain, 
  Terminal, 
  Rocket, 
  Code2, 
  Sparkles, 
  MessageSquare, 
  Activity, 
  FileText, 
  Eye, 
  Globe, 
  Cpu,
  Check,
  ShieldCheck
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  User,
  Brain,
  Terminal,
  Rocket,
  Code2,
  Sparkles,
  MessageSquare,
  Activity,
  FileText,
  Eye,
  Globe,
  Cpu,
};

// Meet The Team component: Displays founder and AI Agent ecosystem with category filtering
export default function MeetTheTeam() {
  const [activeCategory, setActiveCategory] = useState<TeamCategory | 'all'>('all');

  const visibleMembers = teamMembers.filter(m => m.visible);

  const filteredMembers = activeCategory === 'all'
    ? visibleMembers
    : visibleMembers.filter(m => m.category === activeCategory);

  const founder = visibleMembers.find(m => m.kind === 'human');
  const agentMembers = filteredMembers.filter(m => m.kind !== 'human');

  return (
    <section className="space-y-10" id="team">
      
      {/* Section Header with Honest Founder-Led Disclosure */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Human Oversight + AI Capability</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
          Meet the Team
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          <strong>NeuralAutomate.dev</strong> is founder-led by <strong>Ankit Maurya</strong>. Alongside him is our team of AI agents that support every project, and Ankit personally reviews the final quality of every deliverable.
        </p>
      </div>

      {/* Founder Highlight Card (Always shown prominently) */}
      {founder && activeCategory === 'all' && (
        <div className="max-w-3xl mx-auto tech-card rounded-3xl p-6 sm:p-8 border border-emerald-500/50 bg-gradient-to-r from-[#09170e] via-[#07120a] to-[#040805] shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-lg">
              <User className="w-8 h-8" />
            </div>

            <div className="space-y-2 flex-grow">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-display font-extrabold text-white">{founder.name}</h3>
                  <p className="text-xs font-mono text-emerald-400 font-bold">{founder.role}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-md">
                  Human Founder & Lead
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {founder.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {founder.capabilities.map((cap, i) => (
                  <span key={i} className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 bg-slate-900/80 border border-slate-800 px-2.5 py-1 rounded-lg">
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{cap}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Chips */}
      <div 
        role="tablist"
        aria-label="Team Categories"
        className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#07120a] border border-tech-border max-w-3xl mx-auto"
      >
        {teamCategories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryHighlight"
                  className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/40 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {agentMembers.map((member) => {
            const IconComponent = iconMap[member.icon] || Sparkles;

            return (
              <motion.div
                key={member.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="tech-card rounded-2xl p-5 border border-tech-border hover:border-emerald-500/40 bg-[#07120a] flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      member.kind === 'automation-engine'
                        ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    }`}>
                      {member.kind === 'automation-engine' ? 'Engine' : 'AI Agent'}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">{member.role}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-tech-border/40 space-y-1.5">
                  {member.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{cap}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs font-mono text-slate-400 max-w-xl mx-auto">
        💡 Working with AI agents means faster delivery and lower overhead, all under the direct accountability of the founder.
      </p>

    </section>
  );
}
