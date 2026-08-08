'use client';

import React, { useState } from 'react';
import { Play, Sparkles, Terminal, Lock, Activity, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function DemoTeaser() {
  const [formData, setFormData] = useState({
    name: 'Marcus Vance',
    email: 'marcus@vanguard.tech',
    message: 'We need to automate incoming leads from WhatsApp to HubSpot CRM.',
  });

  const [loading, setLoading] = useState(false);
  const [outputJson, setOutputJson] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    trackEvent('demo_submitted', formData);

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to execute demo workflow');
      }

      setOutputJson(result.data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error executing demo workflow. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#040705] relative overflow-hidden" id="demo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="tech-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 bg-gradient-to-r from-tech-card via-[#0b170e] to-[#040705] shadow-2xl relative overflow-hidden">
          
          {/* Top Pill */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Workflow Sandbox</span>
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>n8n Webhook Endpoint Ready</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Controls */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                Test Live <span className="gradient-text-electric">Automation Pipeline</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Submit sample lead data below to trigger our n8n webhook pipeline, OpenAI qualification agent, and CRM JSON dispatcher.
              </p>

              <form onSubmit={handleRunDemo} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 font-bold mb-1 uppercase">SAMPLE LEAD NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 font-bold mb-1 uppercase">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 font-bold mb-1 uppercase">WORKFLOW REQUIREMENT</label>
                  <input
                    type="text"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Executing n8n Pipeline...</span>
                    </span>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Run Live Demo Workflow</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Terminal Output Stream */}
            <div className="lg:col-span-6 bg-[#030604] rounded-2xl p-4 border border-tech-border font-mono text-xs text-slate-300 min-h-[300px] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-tech-border pb-2.5 mb-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>n8n_webhook_stream.json</span>
                </span>
                <span className={`text-[10px] flex items-center gap-1 font-bold ${loading ? 'text-amber-400' : 'text-emerald-400'}`}>
                  <Activity className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : 'animate-pulse'}`} />
                  {loading ? 'EXECUTING PIPELINE...' : outputJson ? 'MOCK_RESPONSE_READY' : 'STANDBY'}
                </span>
              </div>

              {loading ? (
                <div className="my-auto py-12 text-center space-y-3 text-emerald-400">
                  <Activity className="w-8 h-8 animate-spin mx-auto text-emerald-400" />
                  <p className="text-xs font-mono font-bold animate-pulse">
                    Parsing Lead Payload & Calling Webhook...
                  </p>
                </div>
              ) : (
                <pre className="text-[11px] text-emerald-400/90 bg-[#050b07] p-3 rounded-lg border border-tech-border overflow-x-auto leading-relaxed max-h-[320px]">
                  {JSON.stringify(outputJson || {
                    event: "N8N_WORKFLOW_STANDBY",
                    status: "AWAITING_DEMO_SUBMISSION",
                    n8n_webhook_url: "NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL",
                    message: "Submit form on the left to trigger live JSON output stream."
                  }, null, 2)}
                </pre>
              )}

              <div className="mt-3 pt-2 border-t border-tech-border/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Latency: {outputJson?.latency || '8ms'}</span>
                <span className="text-emerald-500">Rate Limit: 5 req/min</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
