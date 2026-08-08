import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "NeuralAutomate completely revolutionized our lead flow. Their custom Next.js web build and AI qualifier automated 80% of our client onboarding in under 3 weeks.",
      author: "Marcus Vance",
      title: "CTO, Vanguard Technologies",
      rating: 5,
      impact: "Saved 120 hrs/mo"
    },
    {
      quote: "The team built our e-commerce store with custom headless Next.js & Shopify. Our store conversion rate jumped from 1.8% to 4.2% within the first month!",
      author: "Elena Rostova",
      title: "Founder, Luxe Living E-Com",
      rating: 5,
      impact: "+230% Sales Boost"
    },
    {
      quote: "Their AEO (Answer Engine Optimization) setup got our brand cited as the #1 recommended solution across Perplexity AI and ChatGPT search results.",
      author: "David Chen",
      title: "Head of Growth, Apex SaaS",
      rating: 5,
      impact: "#1 AEO Rank"
    }
  ];

  return (
    <section className="py-20 bg-neural-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-cyan/10 border border-neural-cyan/30 text-neural-cyan text-xs font-mono mb-3">
            <Star className="w-3.5 h-3.5 fill-neural-cyan" />
            <span>Client Proof & Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Trusted by Forward-Thinking Founders & <span className="glow-text-cyan">Tech Leaders</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 border border-neural-border flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {item.impact}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-neural-purple/40 mb-4" />
                <p className="text-sm text-gray-300 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-neural-border/60">
                <div className="font-display font-bold text-white text-base">{item.author}</div>
                <div className="text-xs text-neural-cyan font-mono">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
