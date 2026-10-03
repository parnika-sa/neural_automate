import React from 'react';
import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Disclaimer | ${SITE_CONFIG.brandName}`,
  description: `General Disclaimer for ${SITE_CONFIG.brandName} regarding AI outputs, marketing results, and third-party platform dependencies.`,
};

export default function DisclaimerPage() {
  const toc = [
    { id: "ai-accuracy", title: "1. AI & Automation Output Disclaimer" },
    { id: "marketing-results", title: "2. Marketing & SEO Results Disclaimer" },
    { id: "case-studies", title: "3. Illustrative Case Studies & Estimates" },
    { id: "third-party-platforms", title: "4. Third-Party Platform Changes" },
    { id: "compliance-responsibility", title: "5. Client Compliance & Content Responsibility" },
    { id: "contact-questions", title: "6. Questions Regarding Disclaimer" },
  ];

  return (
    <LegalLayout
      title="General Disclaimer"
      subtitle={`Important legal disclaimers regarding AI responses, digital marketing outcomes, and system dependencies.`}
      toc={toc}
    >
      <section id="ai-accuracy" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. AI & Automation Output Accuracy Disclaimer</h2>
        <p>
          Automated responses, chatbots, and document OCR extractions built by <strong>{SITE_CONFIG.brandName}</strong> utilize probabilistic Large Language Models (LLMs) and artificial intelligence algorithms. While we implement strict prompt boundaries and validation rules, AI models may occasionally produce inaccuracies ("hallucinations").
        </p>
        <p>
          Clients are advised to implement human-in-the-loop oversight for high-risk business decisions, critical customer communications, or legal documents.
        </p>
      </section>

      <section id="marketing-results" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Digital Marketing & SEO Performance Disclaimer</h2>
        <p>
          While we use industry best practices for Search Engine Optimization (SEO) and Paid Ad campaign management, search engine ranking algorithms (Google, Bing) and ad auction platforms (Meta, Google) are controlled by third-party entities.
        </p>
        <p>
          We do <strong>not</strong> guarantee specific search position rankings, exact lead volume, or guaranteed financial Return on Investment (ROI). Past campaign performance does not guarantee future results.
        </p>
      </section>

      <section id="case-studies" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Illustrative Case Studies & Figures</h2>
        <p>
          Case studies, speed benchmark numbers, and ROI calculator metrics displayed on {SITE_CONFIG.siteUrl} represent sample data models, testing scenarios, or specific past client outcomes. They are provided for illustrative and educational purposes only. Individual business results will vary depending on industry, offer strength, market demand, and ad spend budget.
        </p>
      </section>

      <section id="third-party-platforms" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Third-Party Platform Changes & Outages</h2>
        <p>
          Our automations integrate with external APIs (including Meta WhatsApp Business API, Google Cloud, n8n, OpenAI, and payment gateways). We are not responsible for service interruptions, policy changes, API deprecations, or account suspensions enforced by third-party platforms beyond our reasonable control.
        </p>
      </section>

      <section id="compliance-responsibility" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Client Compliance & Content Responsibility</h2>
        <p>
          Clients are solely responsible for ensuring that their advertising messages, WhatsApp broadcast campaigns, and automated customer communications comply with local consumer laws, anti-spam regulations (e.g. TRAI/DND rules in India), and Meta/Google terms of service.
        </p>
      </section>

      <section id="contact-questions" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">6. Questions Regarding This Disclaimer</h2>
        <p>
          If you have any questions concerning our service boundaries or disclaimer terms, please contact:
        </p>
        <div className="p-4 rounded-2xl bg-[#040805] border border-tech-border space-y-1 font-mono text-xs text-slate-300">
          <p className="text-white font-bold">{SITE_CONFIG.brandName}</p>
          <p>Operator: {SITE_CONFIG.operatorName}</p>
          <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a></p>
          <p>WhatsApp: <a href={SITE_CONFIG.whatsappUrl} className="text-emerald-400 hover:underline">{SITE_CONFIG.whatsappDisplay}</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
