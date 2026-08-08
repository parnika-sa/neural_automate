import React from 'react';
import Link from 'next/link';
import { posts, BlogPost } from '@/lib/posts';
import { ArrowLeft, Clock, Tag, Share2, Bot, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found | NeuralAutomate.dev' };

  return {
    title: `${post.title} | NeuralAutomate.dev Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://neuralautomate.dev/blog/${post.slug}`,
    },
  };
}

export default function BlogPostDetail({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.excerpt,
    'author': {
      '@type': 'Organization',
      'name': 'NeuralAutomate.dev Team',
      'url': 'https://neuralautomate.dev'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'NeuralAutomate.dev',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://neuralautomate.dev/logo.png'
      }
    },
    'datePublished': '2026-08-01',
    'mainEntityOfPage': `https://neuralautomate.dev/blog/${post.slug}`
  };

  return (
    <article className="pt-28 pb-20 text-white relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights Hub</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.readTime}
            </span>
            <span className="text-xs text-slate-400 font-mono">• {post.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            {post.title}
          </h1>
        </div>

        {/* AEO / GEO Direct Answer Box */}
        <div className="p-6 rounded-2xl bg-[#08160c] border border-emerald-500/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Bot className="w-4 h-4" />
            <span>DIRECT ANSWER (AEO / LLM OVERVIEW):</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            {post.aeoHighlight}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-tech-border space-y-6 text-slate-300 text-base leading-relaxed">
          <p className="text-lg text-white font-medium">
            {post.excerpt}
          </p>

          <h2 className="text-2xl font-display font-bold text-white pt-4 border-t border-tech-border">
            1. Why Answer Engine Optimization (AEO) Matters in 2026
          </h2>
          <p>
            With search queries shifting rapidly to ChatGPT, Perplexity AI, Claude, and Google AI Overviews, traditional keyword stuffing is obsolete. Modern search engines index entities, direct factual summaries, and JSON-LD schema structures.
          </p>

          <h2 className="text-2xl font-display font-bold text-white pt-4 border-t border-tech-border">
            2. Core Pillars of A-Z Web & AI Systems
          </h2>
          <p>
            To achieve high conversion rates and search dominance, your digital platform requires:
          </p>
          <ul className="space-y-2 pl-4 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span><strong>Next.js 14 App Router:</strong> Server-Side Rendering (SSR) for sub-second crawl speed.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span><strong>Autonomous AI Agents:</strong> 24/7 lead qualification via OpenAI/Claude API.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
              <span><strong>Structured Schema:</strong> JSON-LD schema markup for Organization, Service, and FAQPage.</span>
            </li>
          </ul>

          <h2 className="text-2xl font-display font-bold text-white pt-4 border-t border-tech-border">
            3. Actionable Next Steps
          </h2>
          <p>
            Whether upgrading an existing platform or building from scratch on <strong className="text-white">neuralautomate.dev</strong>, incorporating automated AI workflows guarantees operational efficiency and revenue growth.
          </p>

          {/* Article Footer CTA */}
          <div className="mt-8 p-6 rounded-xl bg-[#040705] border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Want to implement this strategy for your business?</h4>
              <p className="text-xs text-slate-400">Book a free technical audit with our engineering team.</p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 text-slate-950 font-bold text-xs shrink-0"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
