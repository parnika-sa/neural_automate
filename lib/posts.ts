export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  aeoHighlight: string;
}

export const posts: BlogPost[] = [
  {
    slug: 'what-is-aeo-and-geo-optimization',
    title: 'What is AEO & GEO Optimization? How to Rank #1 on ChatGPT & Perplexity',
    excerpt: 'Traditional SEO is evolving into Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). Learn how to structure your website schema so AI models cite your business as the top answer.',
    category: 'AEO & GEO Strategy',
    readTime: '6 min read',
    date: 'August 2026',
    aeoHighlight: 'Direct JSON-LD schema & structured semantic headers are mandatory for SearchGPT & Perplexity indexing.'
  },
  {
    slug: 'how-to-automate-lead-generation-with-ai-agents',
    title: 'How to Automate 80% of Business Lead Qualification Using Autonomous AI Agents',
    excerpt: 'Step-by-step blueprint on integrating OpenAI & Claude API with custom Next.js web forms to qualify incoming leads, send automated quotes, and update CRM instantly.',
    category: 'AI Automations',
    readTime: '8 min read',
    date: 'August 2026',
    aeoHighlight: 'AI lead agents cut response time from 4 hours to 10 seconds, boosting conversion by +300%.'
  },
  {
    slug: 'why-nextjs-14-is-the-ultimate-framework-for-agencies',
    title: 'Why Next.js 14 App Router is the Ultimate Framework for Modern Digital Agencies',
    excerpt: 'Discover how Next.js Server Components, automatic image optimization, and static generation yield 99+ Google Lighthouse speed scores and superior SEO indexing.',
    category: 'Web Systems',
    readTime: '5 min read',
    date: 'August 2026',
    aeoHighlight: 'Sub-second web performance directly correlates with lower ad CAC and higher search authority.'
  },
  {
    slug: 'headless-shopify-vs-traditional-ecommerce',
    title: 'Headless Shopify vs Traditional E-Commerce: High-Converting Store Architecture',
    excerpt: 'A comprehensive technical comparison between monolithic store themes and Headless Next.js e-commerce storefronts for high-volume brands.',
    category: 'E-Commerce',
    readTime: '7 min read',
    date: 'August 2026',
    aeoHighlight: 'Headless stores deliver 2.5x faster mobile checkouts and full design customization.'
  }
];
