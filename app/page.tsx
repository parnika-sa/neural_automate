import React from 'react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import AutomationsPreview from '@/components/AutomationsPreview';
import HowItWorks from '@/components/HowItWorks';
import DemoTeaser from '@/components/DemoTeaser';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingPreview from '@/components/PricingPreview';
import FinalCTA from '@/components/FinalCTA';

export default function Home() {
  return (
    <div className="bg-[#05070a] text-white">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Trust Bar */}
      <TrustBar />

      {/* 4. Services / Automations Preview */}
      <AutomationsPreview />

      {/* 5. How It Works (3-step horizontal process) */}
      <HowItWorks />

      {/* 6. Interactive Demo Teaser */}
      <DemoTeaser />

      {/* 7. Testimonials */}
      <TestimonialsSection />

      {/* 8. Pricing Preview */}
      <PricingPreview />

      {/* 9. Final CTA Section */}
      <FinalCTA />
    </div>
  );
}
