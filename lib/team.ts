// Team Data Definitions (Human Founder & AI Agents) for NeuralAutomate.dev

export type TeamCategory = 'leadership' | 'engineering' | 'sales-ops' | 'content-research' | 'automation';

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  kind: 'human' | 'ai-agent' | 'automation-engine';
  category: TeamCategory;
  description: string;
  capabilities: [string, string, string];
  icon: string;
  visible: boolean;
}

export const teamCategories: { id: TeamCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Team & Agents' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'sales-ops', label: 'Sales & Operations' },
  { id: 'content-research', label: 'Content & Research' },
  { id: 'automation', label: 'Automation' },
];

export const teamMembers: TeamMember[] = [
  {
    slug: "ankit-maurya",
    name: "Ankit Maurya",
    role: "Founder & Lead Architect",
    kind: "human",
    category: "leadership",
    description: "Strategy, client communication, and final quality check on every deliverable. Directly accountable for every project.",
    capabilities: ["Client Strategy & Scope", "Final Code Review & QA", "Direct Founder Support"],
    icon: "User",
    visible: true,
  },
  {
    slug: "claude",
    name: "Claude",
    role: "Chief Strategy & Reasoning Agent",
    kind: "ai-agent",
    category: "leadership",
    description: "Deep reasoning for system architecture planning, pricing optimization, and strategic copywriting.",
    capabilities: ["Solution Architecture", "Copy & Content Strategy", "Complex Problem Analysis"],
    icon: "Brain",
    visible: true,
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    role: "Senior Engineering Agent",
    kind: "ai-agent",
    category: "engineering",
    description: "Repo-level coding, refactoring, API integration, and debugging directly from the terminal.",
    capabilities: ["Codebase-Wide Refactoring", "System Debugging", "Automation Scripts"],
    icon: "Terminal",
    visible: true,
  },
  {
    slug: "antigravity",
    name: "Antigravity",
    role: "Build & Deploy Agent",
    kind: "ai-agent",
    category: "engineering",
    description: "Builds web interfaces and complete Next.js feature components end to end.",
    capabilities: ["UI & Page Construction", "Feature Development", "Production Deployment"],
    icon: "Rocket",
    visible: true,
  },
  {
    slug: "copilot",
    name: "GitHub Copilot",
    role: "Pair Programming Assistant",
    kind: "ai-agent",
    category: "engineering",
    description: "Real-time syntax assistance and intelligent code completion during active development.",
    capabilities: ["Code Auto-completion", "Boilerplate Generation", "Accelerated Coding"],
    icon: "Code2",
    visible: true,
  },
  {
    slug: "lovable",
    name: "Lovable",
    role: "Rapid Prototyping Agent",
    kind: "ai-agent",
    category: "engineering",
    description: "Fast UI prototypes and landing page design concepts for rapid idea validation.",
    capabilities: ["Quick UI Mockups", "Landing Page Concepts", "Idea Validation"],
    icon: "Sparkles",
    visible: true,
  },
  {
    slug: "neo",
    name: "NEO",
    role: "Lead Qualification & Sales Assistant",
    kind: "ai-agent",
    category: "sales-ops",
    description: "Live on WhatsApp 24x7, engages incoming leads, captures project scope, and shares booking links.",
    capabilities: ["24x7 WhatsApp Chat", "Lead Qualification", "Booking Link Sharing"],
    icon: "MessageSquare",
    visible: true,
  },
  {
    slug: "alpha",
    name: "Alpha",
    role: "Operations Agent",
    kind: "ai-agent",
    category: "sales-ops",
    description: "Supports day-to-day operations, task tracking, and pipeline status monitoring.",
    capabilities: ["Operations Support", "Workflow Monitoring", "Status Reporting"],
    icon: "Activity",
    visible: true,
  },
  {
    slug: "gpt",
    name: "GPT",
    role: "Content & Research Agent",
    kind: "ai-agent",
    category: "content-research",
    description: "Generates SEO blog drafts, marketing copy variations, and research briefs.",
    capabilities: ["SEO Content Drafts", "Ad Copy Variations", "Creative Brainstorming"],
    icon: "FileText",
    visible: true,
  },
  {
    slug: "gemini",
    name: "Gemini",
    role: "Multimodal Analysis Agent",
    kind: "ai-agent",
    category: "content-research",
    description: "Analysis of visual assets, PDF documents, structured data, and rapid web research.",
    capabilities: ["Document OCR Analysis", "Data Summarization", "Visual Asset Audit"],
    icon: "Eye",
    visible: true,
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    role: "Market & SEO Research Agent",
    kind: "ai-agent",
    category: "content-research",
    description: "Competitor analysis and keyword discovery backed by live web sources.",
    capabilities: ["Competitor Audits", "Keyword Discovery", "Source-Backed Research"],
    icon: "Globe",
    visible: true,
  },
  {
    slug: "n8n",
    name: "n8n Orchestrator",
    role: "Automation Workflow Engine",
    kind: "automation-engine",
    category: "automation",
    description: "The core engine powering lead routing, webhook pipelines, email automation, and CRM sync.",
    capabilities: ["Workflow Orchestration", "Webhook Pipelines", "SaaS Integration"],
    icon: "Cpu",
    visible: true,
  },
];
