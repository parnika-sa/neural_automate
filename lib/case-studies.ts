export interface CaseStudyItem {
  slug: string;
  client: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
}

export const detailedCases: CaseStudyItem[] = [
  {
    slug: 'vanguard-tech-lead-qualification',
    client: 'Vanguard Tech',
    title: 'How Vanguard Tech Cut Lead Response Time From 4 Hours to 10 Seconds',
    metric: '10s Latency',
    metricLabel: 'From 4 Hours Manual Review',
    summary: 'By deploying a custom n8n webhook pipeline integrated with GPT-4o, Vanguard Tech automated 80% of inbound lead qualification and boosted booking conversion by +300%.',
    challenge: 'Vanguard Tech received 500+ inbound web leads monthly. Sales representatives took over 4 hours to manually review form details and schedule calls, causing qualified leads to drop off.',
    solution: 'NeuralAutomate engineered an n8n webhook workflow. Incoming form submissions are enriched instantly, analyzed by a custom AI qualification agent, and auto-booked into Google Calendar.',
    results: [
      'Response latency cut from 4 hours to 10 seconds',
      'Saved 120 hours of manual sales labor monthly',
      'Conversion velocity increased by +340%'
    ]
  },
  {
    slug: 'luxe-flow-ecom-whatsapp-bot',
    client: 'Luxe Flow E-Com',
    title: 'How Luxe Flow Automated 75% of Support Tickets via WhatsApp AI Agents',
    metric: '75% Reduction',
    metricLabel: 'In Support Ticket Backlog',
    summary: 'Engineered a 24/7 WhatsApp AI conversation agent connected to Shopify inventory APIs, handling shipping inquiries and FAQs automatically.',
    challenge: 'Customer support teams were overwhelmed with repetitive order tracking and inventory questions during peak sale periods.',
    solution: 'Deployed an autonomous WhatsApp AI agent that authenticates user phone numbers and answers order status directly from Shopify webhooks.',
    results: [
      '75% reduction in manual support tickets',
      '24/7 instant response across all customer timezones',
      'Customer satisfaction rating boosted to 4.9/5'
    ]
  },
  {
    slug: 'apex-capital-document-parsing',
    client: 'Apex Capital',
    title: 'How Apex Capital Saved 150 Hours Monthly via AI PDF Document OCR',
    metric: '150 Hrs/Mo Saved',
    metricLabel: 'Manual Spreadsheet Labor Eliminated',
    summary: 'Automated extraction of financial data from incoming PDF receipts & invoices directly into PostgreSQL databases with 99.8% extraction accuracy.',
    challenge: 'Accounting staff spent over 150 hours every month manually copying line items from unstructured PDF receipts into spreadsheets.',
    solution: 'Built an n8n automated email attachment listener that passes PDFs through OpenAI Vision OCR, parses structured JSON, and executes batch database inserts.',
    results: [
      '150 hours of manual accounting entry saved every month',
      'Zero human copy-paste errors',
      'Real-time financial dashboard updating'
    ]
  }
];
