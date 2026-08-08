import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "NeuralAutomate built our custom n8n lead qualification agent. We cut incoming lead response latency from 4 hours to under 10 seconds!",
      name: "Marcus Vance",
      role: "CTO",
      company: "Vanguard Tech",
      metric: "120 hrs/mo Saved",
      rating: 5
    },
    {
      quote: "The CRM and WhatsApp auto-responder pipelines reduced our customer support ticket backlog by 75% in the first 3 weeks of deployment.",
      name: "Elena Rostova",
      role: "Head of Operations",
      company: "Luxe Flow E-Com",
      metric: "+340% Lead Velocity",
      rating: 5
    },
    {
      quote: "Their document parsing and PDF data extraction AI automation saved our financial team over 150 hours of manual spreadsheet data entry every month.",
      name: "David Chen",
      role: "VP of Engineering",
      company: "Apex Capital",
      metric: "150 hrs/mo Saved",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-[#040705] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Star className="w-3.5 h-3.5 fill-emerald-400" />
            <span>Verified Founder Proof</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Trusted by Forward-Thinking <span className="gradient-text-electric">Tech Leaders</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See how autonomous workflows give founders their time back.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

      </div>
    </section>
  );
}
