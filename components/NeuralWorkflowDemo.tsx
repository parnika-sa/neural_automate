'use client';

import React, { useState } from 'react';
import { Bot, Zap, Database, ShoppingCart, Send, CheckCircle, Activity, Sparkles, Play, RefreshCw } from 'lucide-react';

interface Step {
  id: string;
  title: string;
  icon: any;
  category: string;
  status: string;
  latency: string;
  details: string;
  jsonOutput: string;
}

export default function NeuralWorkflowDemo() {
  const steps: Step[] = [
    {
      id: 'lead-capture',
      title: '1. Autonomous Lead Capture',
      icon: Send,
      category: 'Web System',
      status: 'Active (200 OK)',
      latency: '12ms',
      details: 'High-speed Next.js form intercepts inquiry, enriches IP location & company data instantly.',
      jsonOutput: JSON.stringify({
        event: "LEAD_INCOMING",
        domain: "neuralautomate.dev",
        visitor: { company: "Enterprise Corp", budget: "$10,000 - $25,000", intent: "E-Commerce + AI Automations" },
        timestamp: "2026-08-06T21:32:00Z"
      }, null, 2)
    },
    {
      id: 'ai-analysis',
      title: '2. Neural AI Agent Qualification',
      icon: Bot,
      category: 'AI Engine',
      status: 'Processed via LLM',
      latency: '240ms',
      details: 'AI Agent analyzes budget, project scope, & assigns priority rank #1 with custom proposal draft.',
      jsonOutput: JSON.stringify({
        agent: "Neural-Qualifier-v4",
        score: 98.4,
        tier: "High-Value Opportunity",
        suggestedTechStack: ["Next.js App Router", "Shopify Headless", "Zapier Webhooks", "AEO Schema"],
        autoReplySent: true
      }, null, 2)
    },
    {
      id: 'crm-sync',
      title: '3. CRM & E-Commerce Sync',
      icon: ShoppingCart,
      category: 'Store Engine',
      status: 'Synced',
      latency: '85ms',
      details: 'Syncs customer into CRM, generates dynamic custom pricing quote, & reserves dev sprint slot.',
      jsonOutput: JSON.stringify({
        crmStatus: "HubSpot Deal Created",
        stripeInvoice: "INV-NEURAL-8841",
        estimatedTurnaround: "14 Days",
        allocatedEngineers: ["AI Engineer", "FullStack Dev", "SEO Strategist"]
      }, null, 2)
    },
    {
      id: 'growth-retargeting',
      title: '4. AEO & Growth Engine',
      icon: Zap,
      category: 'Marketing Engine',
      status: 'Running',
      latency: '45ms',
      details: 'Submits micro-data schema to AI search engines (Perplexity, SearchGPT) for brand authority.',
      jsonOutput: JSON.stringify({
        aeoIndexed: true,
        geoCitationBoost: "+42%",
        retargetingPixel: "Meta + Google AI Ads Active",
        status: "AUTOMATION_COMPLETE"
      }, null, 2)
    }
  ];

  const [activeStep, setActiveStep] = useState<Step>(steps[0]);
  const [isRunning, setIsRunning] = useState(false);

  const simulateExecution = () => {
    setIsRunning(true);
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index < steps.length) {
        setActiveStep(steps[index]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-6xl mx-auto glass-panel rounded-2xl p-6 md:p-8 border border-neural-border shadow-2xl relative overflow-hidden my-12">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-neural-purple/15 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-neural-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-cyan/10 border border-neural-cyan/30 text-neural-cyan text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Workflow Simulation</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">
            See How NeuralAutomate Connects Your Business <span className="glow-text-cyan">A to Z</span>
          </h3>
        </div>

        <button
          onClick={simulateExecution}
          disabled={isRunning}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neural-purple to-neural-cyan text-white text-sm font-medium hover:opacity-90 transition-all shadow-lg shadow-neural-purple/20 disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Simulating Neural Flow...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Test Live AI Engine Demo</span>
            </>
          )}
        </button>
      </div>

      {/* Node Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Steps */}
        <div className="lg:col-span-6 space-y-3">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep.id === step.id;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step)}
                className={`cursor-pointer rounded-xl p-4 transition-all duration-300 border ${
                  isSelected
                    ? 'bg-neural-hover/90 border-neural-cyan shadow-lg shadow-neural-cyan/15 scale-[1.01]'
                    : 'bg-neural-card/60 border-neural-border hover:border-neural-border/80 hover:bg-neural-card'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-neural-cyan text-neural-dark' : 'bg-neural-border/50 text-neural-cyan'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{step.title}</h4>
                      <span className="text-[11px] font-mono text-gray-400">{step.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {step.latency}
                  </span>
                </div>
                <p className="text-xs text-gray-300 pl-12 leading-relaxed">
                  {step.details}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Code & Data Output Monitor */}
        <div className="lg:col-span-6 glass-panel rounded-xl p-5 border border-neural-border/80 flex flex-col justify-between font-mono bg-neural-dark/90">
          <div>
            <div className="flex items-center justify-between border-b border-neural-border pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Activity className="w-4 h-4 text-neural-cyan animate-pulse" />
                <span>Neural Event Stream Console</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[10px] text-emerald-400">STATUS: LIVE</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Selected Node:</span>
                <span className="text-neural-cyan font-semibold">{activeStep.title}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Execution Status:</span>
                <span className="text-emerald-400 font-mono">{activeStep.status}</span>
              </div>

              {/* JSON Visualizer */}
              <div className="mt-4">
                <span className="text-[11px] text-gray-400 block mb-1">REAL-TIME DATA PAYLOAD:</span>
                <pre className="text-xs text-neural-cyan/90 bg-[#05070a] p-3 rounded-lg border border-neural-border overflow-x-auto leading-relaxed max-h-56">
                  {activeStep.jsonOutput}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neural-border/50 flex items-center justify-between text-[11px] text-gray-400">
            <span>Powered by NeuralAutomate Core v4.2</span>
            <span className="text-neural-accent">Fully Automated</span>
          </div>
        </div>

      </div>
    </div>
  );
}
