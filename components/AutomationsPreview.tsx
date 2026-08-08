import React from 'react';
import ServiceCard from './ServiceCard';
import { MessageSquare, Database, FileText, Bot, Mail, Workflow, Sparkles } from 'lucide-react';

export default function AutomationsPreview() {
  const automations = [
    {
      id: 'whatsapp-bot',
      icon: MessageSquare,
      title: 'WhatsApp & Chatbot Auto-Reply',
      description: '24/7 AI conversation agents that qualify incoming messages, answer FAQs, and book calendar appointments automatically.',
      badge: 'Messaging AI',
      highlights: ['Instant WhatsApp API integration', 'Automated Lead Qualification', 'Calendar Booking Sync']
    },
    {
      id: 'crm-sync',
      icon: Database,
      title: 'Lead to CRM Auto-Sync',
      description: 'Seamless webhook pipelines that capture website inquiries and automatically enrich & create contact records in HubSpot, Salesforce, or Airtable.',
      badge: 'Pipeline Sync',
      highlights: ['Instant HubSpot & Salesforce Webhooks', 'IP & Location Data Enrichment', 'Zero Manual Data Entry']
    },
    {
      id: 'invoice-automation',
      icon: FileText,
      title: 'Invoice & Billing Automation',
      description: 'Automated invoice generation upon contract signature or deal closure, instant PDF generation, and automated receipt emails.',
      badge: 'Finance Workflow',
      highlights: ['Stripe & QuickBooks Integration', 'Auto PDF Generation', 'Payment Reminder Sequences']
    },
    {
      id: 'data-entry',
      icon: Bot,
      title: 'Data Entry & Document Parsing',
      description: 'AI-driven OCR document processing to extract data from incoming PDFs, receipts, and spreadsheets directly into your database.',
      badge: 'Document AI',
      highlights: ['PDF & Spreadsheet Data Extraction', 'PostgreSQL & Airtable Auto-Insert', '99.8% Extraction Accuracy']
    },
    {
      id: 'email-responder',
      icon: Mail,
      title: '24/7 AI Email Responder',
      description: 'AI agents that monitor your support inbox, parse customer inquiries, and generate contextual draft responses for instant approval.',
      badge: 'Inbox AI',
      highlights: ['Gmail & Outlook Webhook Integration', 'Contextual Knowledge Retrieval', 'Auto-Drafting & Escalation']
    },
    {
      id: 'custom-n8n',
      icon: Workflow,
      title: 'Custom n8n & API Webhooks',
      description: 'Tailored multi-step workflow pipelines connecting any SaaS applications via webhooks, custom logic code, and API endpoints.',
      badge: 'n8n Engineering',
      highlights: ['Self-Hosted n8n Architecture', 'Custom Webhook Endpoints', 'Complex Conditional Branching']
    }
  ];

  return (
    <section className="py-24 bg-[#040705] relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Engineered Automation Modules</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Workflows We Automate <span className="gradient-text-electric">End-to-End</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate repetitive manual tasks with battle-tested AI and n8n workflow pipelines.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {automations.map((item) => (
            <ServiceCard key={item.id} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
}
