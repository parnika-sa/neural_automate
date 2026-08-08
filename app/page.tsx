import React from 'react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import AutomationsPreview from '@/components/AutomationsPreview';
import HowItWorks from '@/components/HowItWorks';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <div className="bg-[#05070a] text-white">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Services / Automations Overview */}
      <AutomationsPreview />

      {/* 4. How It Works (3-step overview process) */}
      <HowItWorks />

      {/* 5. Final CTA Section */}
      <FinalCTA />
    </div>
  );
}
