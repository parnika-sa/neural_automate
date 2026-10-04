import { Metadata } from 'next';
import Link from 'next/link';
import FaqAccordion, { FaqItem } from '@/components/FaqAccordion';
import { SITE_CONFIG } from '@/lib/site-config';
import { HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: `Frequently Asked Questions (FAQ) | ${SITE_CONFIG.brandName}`,
  description: `Find answers to common questions about custom website development, AI automation workflows, pricing, delivery timelines, and pro-rata refund terms.`,
  openGraph: {
    title: `Frequently Asked Questions | ${SITE_CONFIG.brandName}`,
    description: `Clear, transparent answers about website development, WhatsApp chatbots, pricing, and support.`,
    url: `${SITE_CONFIG.siteUrl}/faq`,
  },
};

const faqCategories = [
  'Pricing and Payment',
  'Websites',
  'Marketing',
  'Automation and WhatsApp Bots',
  'Support and Refunds',
];

const faqData: FaqItem[] = [
  // 1. Pricing and Payment
  {
    id: 'pricing-structure',
    category: 'Pricing and Payment',
    question: 'How does pricing work for custom website design and AI automations?',
    answer: 'We provide fixed, transparent milestone-based pricing for custom website projects (typically 50% advance to start work, 50% upon final delivery and handover). Monthly services like SEO maintenance or chatbot hosting are billed upfront per billing cycle.',
  },
  {
    id: 'hidden-fees-taxes',
    category: 'Pricing and Payment',
    question: 'Are there any hidden fees or additional taxes?',
    answer: 'No. All costs are explicitly detailed in our agreement beforehand. Third-party infrastructure costs (such as domain registration, web hosting, or AI API usage fees from OpenAI/Anthropic/Meta) are paid directly by you to the service providers without any markups.',
  },
  {
    id: 'accepted-payment-methods',
    category: 'Pricing and Payment',
    question: 'Which payment methods do you accept?',
    answer: 'For clients in India, we accept UPI, Net Banking, and Credit/Debit Cards via Razorpay. For international clients, we process payments in USD via Stripe using major Credit Cards.',
  },
  {
    id: 'custom-package',
    category: 'Pricing and Payment',
    question: 'Can I get a custom quote for my specific workflow?',
    answer: 'Yes! If our standard packages do not match your requirements, reach out via email or WhatsApp and we will prepare a tailored proposal specific to your project scope.',
  },

  // 2. Websites
  {
    id: 'delivery-timeline',
    category: 'Websites',
    question: 'How long does it take to build and launch a custom website?',
    answer: 'Delivery timelines range from 7 to 21 business days, depending on the complexity of your package and how promptly project materials, content, and feedback are provided.',
  },
  {
    id: 'mobile-responsive-seo',
    category: 'Websites',
    question: 'Will my website be mobile-responsive and optimized for Google search?',
    answer: 'Yes. Every website we build is 100% mobile-responsive, fast-loading, accessible, and structured according to technical SEO best practices (semantic HTML, OpenGraph tags, and XML sitemaps).',
  },
  {
    id: 'tech-stack',
    category: 'Websites',
    question: 'What technology stack do you use?',
    answer: 'We engineer high-performance web applications using Next.js 14 (App Router), TypeScript, React, Tailwind CSS, and Framer Motion for sleek animations.',
  },
  {
    id: 'code-ownership',
    category: 'Websites',
    question: 'Who owns the website code and design once completed?',
    answer: 'Upon settlement of the final invoice, 100% of the custom design files and project codebase are transferred to you with full ownership rights.',
  },

  // 3. Marketing
  {
    id: 'marketing-guarantees',
    category: 'Marketing',
    question: 'Do you guarantee top Google rankings or immediate leads?',
    answer: 'While we follow search engine optimization and high-converting design standards, search engine algorithms and market dynamics fluctuate. We do not issue guarantees on exact rankings, lead volumes, or specific financial ROI.',
  },
  {
    id: 'ad-campaign-management',
    category: 'Marketing',
    question: 'How do you handle Google or Meta ad campaigns?',
    answer: 'We build conversion-focused landing pages, configure Meta Pixel and Google Tag Manager events, and design high-performing ad copy strategies to optimize your ad spend efficiently.',
  },

  // 4. Automation and WhatsApp Bots
  {
    id: 'whatsapp-bot-work',
    category: 'Automation and WhatsApp Bots',
    question: 'How do WhatsApp AI chatbots work for lead generation?',
    answer: 'Our WhatsApp bots integrate with official WhatsApp APIs and LLMs (such as Claude or GPT) to answer customer inquiries 24/7, qualify lead budget and timelines, and sync details directly into your calendar or CRM.',
  },
  {
    id: 'third-party-api-costs',
    category: 'Automation and WhatsApp Bots',
    question: 'Are there ongoing operational costs for AI automations?',
    answer: 'AI model queries (OpenAI/Anthropic) and Meta WhatsApp Business API messages incur small usage fees. These are billed directly by the respective platforms at cost value.',
  },
  {
    id: 'crm-integration',
    category: 'Automation and WhatsApp Bots',
    question: 'Can automations connect to my existing CRM or Google Sheets?',
    answer: 'Yes, using workflow orchestrators like n8n and secure webhooks, we connect your chatbot or web forms seamlessly with Google Sheets, Supabase, HubSpot, Notion, or custom databases.',
  },

  // 5. Support and Refunds
  {
    id: 'refund-policy-details',
    category: 'Support and Refunds',
    question: 'What is your refund and cancellation policy?',
    answer: 'We adhere to a fair pro-rata refund policy. If you cancel a project with 3–5 calendar days written notice, you are charged strictly for completed deliverables and effort. Any unspent advance payment is refunded to your original payment method within 5–7 working days.',
  },
  {
    id: 'revision-rounds',
    category: 'Support and Refunds',
    question: 'How many design and code revisions are included?',
    answer: 'Standard projects include 2 complimentary revision rounds during the preview/staging phase. Additional structural or scope changes outside the initial agreement are quoted separately.',
  },
  {
    id: 'getting-support',
    category: 'Support and Refunds',
    question: 'How can I get technical assistance after my project goes live?',
    answer: 'You can contact our helpdesk at info@neuralautomate.dev or ping our WhatsApp support line at +91 72689 30700. We answer inquiries within 24 business hours.',
  },
];

export default function FaqPage() {
  // Generate JSON-LD schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-[#040705] tech-grid-pattern text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* HERO */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" /> Answers & Clarifications
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Everything you need to know about our web development process, AI automation integrations, pricing model, and pro-rata policies.
          </p>
        </div>

        {/* INTERACTIVE ACCORDION */}
        <FaqAccordion categories={faqCategories} items={faqData} />

        {/* STILL HAVE QUESTIONS CTA */}
        <div className="p-8 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/30 text-center space-y-4 max-w-2xl mx-auto shadow-2xl">
          <h2 className="text-2xl font-display font-bold text-white">Still Have Questions?</h2>
          <p className="text-slate-300 text-sm">
            Have a specific workflow question or need a custom solution? Reach out directly to Ankit Maurya and our technical team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" /> Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              className="py-3 px-6 rounded-xl bg-[#040705] hover:bg-[#09170e] text-slate-100 border border-emerald-500/30 font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
