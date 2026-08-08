import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bot, Workflow, CheckCircle2, ShieldCheck, Zap, Terminal, Sparkles, Send } from 'lucide-react';
import { notFound } from 'next/navigation';

interface AutomationDetail {
  slug: string;
  title: string;
  badge: string;
  description: string;
  n8nTriggers: string[];
  actions: string[];
  techStack: string[];
  roiMetric: string;
  codeSnippet: string;
}

const automationsData: Record<string, AutomationDetail> = {
  'whatsapp-bot': {
    slug: 'whatsapp-bot',
    title: 'WhatsApp & Chatbot AI Auto-Reply',
    badge: 'Messaging AI',
    description: 'Autonomous 24/7 WhatsApp AI conversation agents that receive incoming user queries, qualify lead budget & scope, and schedule Calendar meetings automatically.',
    n8nTriggers: ['WhatsApp Cloud API Webhook', 'Meta Business Webhook', 'Custom Site Chat Widget'],
    actions: ['OpenAI / Claude Intent Parser', 'HubSpot Contact Upsert', 'Calendly Direct Slot Reservation'],
    techStack: ['n8n Cloud', 'WhatsApp Business API', 'OpenAI GPT-4o', 'Node.js'],
    roiMetric: 'Sub-10s Lead Qualification Latency',
    codeSnippet: `// n8n Webhook Trigger Node (WhatsApp Cloud API)
POST /api/webhook/whatsapp
Headers: { "X-Hub-Signature-256": "sha256=..." }
Payload: { "message": "Hi, I need pricing for workflow automations" }
-> AI Agent Action: "Qualifying Budget -> Draft Reply -> Send WhatsApp Message"`
  },
  'crm-sync': {
    slug: 'crm-sync',
    title: 'Lead to CRM Auto-Sync Pipeline',
    badge: 'Pipeline Sync',
    description: 'Instant webhook pipelines that intercept website form submissions, enrich IP/company data, and automatically create deals in HubSpot, Salesforce, or Airtable.',
    n8nTriggers: ['Next.js Form Webhook', 'Typeform / Google Form Submission', 'Stripe Event Trigger'],
    actions: ['Clearbit / IP Data Enrichment', 'HubSpot / Salesforce Contact Upsert', 'Slack Channel Alert'],
    techStack: ['n8n Self-Hosted', 'HubSpot API', 'Salesforce REST API', 'Airtable'],
    roiMetric: 'Zero Manual Data Entry Errors',
    codeSnippet: `// n8n Pipeline Sync
POST /api/webhook/crm-sync
Payload: { "name": "John Doe", "email": "john@company.com", "budget": "$10k" }
-> Result: "HubSpot Deal Created ID #8841 -> Slack Alert Sent"`
  },
  'invoice-automation': {
    slug: 'invoice-automation',
    title: 'Invoice & Billing Automation',
    badge: 'Finance Workflow',
    description: 'Automated billing workflow that triggers upon contract signature or deal closure, generates custom PDF invoices, and emails automated receipts.',
    n8nTriggers: ['PandaDoc / DocuSign Signed Event', 'HubSpot Deal Closed Won', 'Stripe Payment Succeeded'],
    actions: ['Generate Invoice PDF via Template', 'Stripe / QuickBooks Sync', 'Send Email Receipt with Attachment'],
    techStack: ['Stripe API', 'QuickBooks REST API', 'n8n Workflow Engine', 'SendGrid'],
    roiMetric: '100% On-Time Automated Invoicing',
    codeSnippet: `// n8n Billing Trigger
EVENT: "DEAL_CLOSED_WON"
-> Generate Invoice PDF -> Send Receipt Email -> Update Ledger`
  },
  'data-entry': {
    slug: 'data-entry',
    title: 'Data Entry & Document OCR Parsing',
    badge: 'Document AI',
    description: 'Extract structured data from unstructured PDF receipts, invoices, and spreadsheets directly into your PostgreSQL or Airtable database.',
    n8nTriggers: ['Email Attachment Received', 'Google Drive PDF Upload', 'AWS S3 File Creation'],
    actions: ['OpenAI Vision / Claude Document Parsing', 'Structured JSON Extraction', 'Database Batch Insert'],
    techStack: ['OpenAI Vision API', 'AWS S3', 'PostgreSQL', 'n8n Engine'],
    roiMetric: '99.8% Extraction Accuracy',
    codeSnippet: `// Document OCR Data Pipeline
FILE: "invoice_9981.pdf"
-> Extract: { vendor: "Acme Corp", total: "$2,499.00" } -> Insert into PostgreSQL`
  },
  'ai-email-responder': {
    slug: 'ai-email-responder',
    title: '24/7 AI Email Responder',
    badge: 'Inbox AI',
    description: 'Intelligent AI email agents that monitor your support or sales inbox, parse customer intent, and auto-draft contextual replies.',
    n8nTriggers: ['Gmail Pub/Sub Webhook', 'Outlook Graph API Trigger', 'IMAP Inbox Monitor'],
    actions: ['Knowledge Base RAG Vector Search', 'Generate Draft Reply', 'Human Approval / Auto-Send'],
    techStack: ['Gmail API', 'n8n Cloud', 'Pinecone Vector DB', 'OpenAI GPT-4o'],
    roiMetric: 'Cut Response Latency from 4 hrs to 10s',
    codeSnippet: `// Email AI Workflow
INCOMING: "How much is your Growth tier?"
-> RAG Search -> Draft Reply: "$2,499/mo includes 6 workflows" -> Auto-Send`
  },
  'email-responder': {
    slug: 'email-responder',
    title: '24/7 AI Email Responder',
    badge: 'Inbox AI',
    description: 'Intelligent AI email agents that monitor your support or sales inbox, parse customer intent, and auto-draft contextual replies.',
    n8nTriggers: ['Gmail Pub/Sub Webhook', 'Outlook Graph API Trigger', 'IMAP Inbox Monitor'],
    actions: ['Knowledge Base RAG Vector Search', 'Generate Draft Reply', 'Human Approval / Auto-Send'],
    techStack: ['Gmail API', 'n8n Cloud', 'Pinecone Vector DB', 'OpenAI GPT-4o'],
    roiMetric: 'Cut Response Latency from 4 hrs to 10s',
    codeSnippet: `// Email AI Workflow
INCOMING: "How much is your Growth tier?"
-> RAG Search -> Draft Reply: "$2,499/mo includes 6 workflows" -> Auto-Send`
  },
  'custom-n8n': {
    slug: 'custom-n8n',
    title: 'Custom n8n & API Webhooks',
    badge: 'n8n Engineering',
    description: 'Tailored multi-node n8n workflow pipelines connecting any 2+ SaaS platforms with custom JavaScript/Python nodes, conditional logic, and retry handlers.',
    n8nTriggers: ['HTTP Custom Webhook Endpoint', 'Cron Scheduled Timer', 'Database Event Listener'],
    actions: ['Custom JS Code Execution', 'Multi-API Batch Requests', 'Error Handler Fallbacks'],
    techStack: ['n8n Self-Hosted Docker', 'PostgreSQL', 'Redis Queue', 'Custom Python'],
    roiMetric: 'Unlimited Scalable Integrations',
    codeSnippet: `// Custom n8n Multi-Node Pipeline
WEBHOOK -> JS Transform Node -> Parallel API Dispatches -> Redis Queue Log`
  }
};

export async function generateStaticParams() {
  return Object.keys(automationsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const detail = automationsData[params.slug];
  if (!detail) return { title: 'Automation Not Found | NeuralAutomate.dev' };
  return {
    title: `${detail.title} | NeuralAutomate.dev`,
    description: detail.description,
  };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const detail = automationsData[params.slug];
  if (!detail) return notFound();

  return (
    <article className="pt-28 pb-20 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/services" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Automations Directory</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {detail.badge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            {detail.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {detail.description}
          </p>
        </div>

        {/* Impact Badge */}
        <div className="p-4 rounded-xl bg-[#0a180f] border border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Zap className="w-4 h-4" />
            <span>BENCHMARK IMPACT:</span>
          </div>
          <span className="text-sm font-display font-bold text-white">{detail.roiMetric}</span>
        </div>

        {/* Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* n8n Triggers */}
          <div className="tech-card rounded-2xl p-6 border border-tech-border space-y-3">
            <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase flex items-center gap-2">
              <Workflow className="w-4 h-4" /> Webhook Triggers
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {detail.n8nTriggers.map((trig, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{trig}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Actions */}
          <div className="tech-card rounded-2xl p-6 border border-tech-border space-y-3">
            <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase flex items-center gap-2">
              <Bot className="w-4 h-4" /> AI Actions & Outputs
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {detail.actions.map((act, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Code / JSON Snippet Box */}
        <div className="tech-card rounded-2xl p-6 border border-tech-border font-mono space-y-3 bg-[#030604]">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-tech-border pb-3">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>n8n_pipeline_spec.json</span>
            </span>
            <span className="text-emerald-400 text-[10px]">n8n Webhook Ready</span>
          </div>

          <pre className="text-xs text-emerald-400/90 bg-[#050b07] p-4 rounded-xl border border-tech-border overflow-x-auto leading-relaxed">
            {detail.codeSnippet}
          </pre>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-tech-card via-[#0c180e] to-[#040705] border border-emerald-500/40 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Want to deploy this automation for your company?</h3>
          <p className="text-xs text-slate-400">Book a 15-minute consultation with our n8n integration engineers.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-500"
          >
            <span>Book Consultation Call</span>
          </Link>
        </div>

      </div>
    </article>
  );
}
