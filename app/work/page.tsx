import React from 'react';
import CaseStudies from '@/components/CaseStudies';

export const metadata = {
  title: "Client Portfolio & Proof of Impact | NeuralAutomate.dev",
  description: "View real-world client builds: Next.js web applications, Shopify stores, AI workflow automations, & AEO AI search engine rankings.",
};

export default function WorkPage() {
  return (
    <div className="pt-28 pb-16 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-mono text-neural-purple uppercase tracking-widest px-3 py-1 rounded-full bg-neural-purple/10 border border-neural-purple/30">
          Selected Client Work
        </span>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white mt-4">
          Engineered for <span className="glow-text-cyan">Maximum Impact</span>
        </h1>
        <p className="mt-4 text-gray-300 text-base max-w-2xl mx-auto">
          Explore case studies highlighting how NeuralAutomate delivers 3x+ ROI, hours of manual labor saved, and sub-second web performance.
        </p>
      </div>

      <CaseStudies />
    </div>
  );
}
