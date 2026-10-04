import React from 'react';
import type { Metadata } from 'next';
import PricingClient from '@/components/PricingClient';
import { pricingFaqs } from '@/lib/pricing';

// SEO Metadata for Pricing Page
export const metadata: Metadata = {
  title: "Transparent Pricing & Plans | NeuralAutomate.dev",
  description: "Detailed pricing for website development, SEO & paid marketing, n8n workflow automations, and AI chatbots. Simple INR and USD rates with zero hidden fees.",
  keywords: [
    "NeuralAutomate Pricing",
    "Website Development Cost",
    "n8n Automation Pricing",
    "WhatsApp Bot Cost",
    "SEO Packages INR",
    "Digital Marketing Retainer"
  ],
  openGraph: {
    title: "Transparent Pricing & Investment Tiers | NeuralAutomate.dev",
    description: "Explore fixed-rate packages for custom Next.js websites, SEO & paid ads, WhatsApp chatbots, and n8n automations.",
    url: "https://neuralautomate.dev/pricing",
    siteName: "NeuralAutomate.dev",
  },
};

export default function PricingPage() {
  // Schema.org FAQ structured data generation
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': pricingFaqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="pt-28 pb-20 text-white relative min-h-screen bg-[#040705] tech-grid-pattern">
      {/* FAQ Schema Script Injection for Search Engine Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Interactive Client Component */}
      <PricingClient />
    </div>
  );
}
