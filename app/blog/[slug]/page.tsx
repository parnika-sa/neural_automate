import React from 'react';
import Link from 'next/link';
import { posts } from '@/lib/posts';
import { ArrowLeft, Clock, Bot } from 'lucide-react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
    'datePublished': post.date,
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
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-tech-border text-slate-300 text-base leading-relaxed">
          <ReactMarkdown
            components={{
              h1: ({ ...props }) => <h1 className="text-3xl font-display font-extrabold text-white mt-8 mb-4 border-b border-tech-border pb-2" {...props} />,
              h2: ({ ...props }) => <h2 className="text-2xl font-display font-bold text-white mt-8 mb-4 border-b border-tech-border pb-2" {...props} />,
              h3: ({ ...props }) => <h3 className="text-xl font-display font-semibold text-emerald-400 mt-6 mb-3" {...props} />,
              p: ({ ...props }) => <p className="text-slate-300 text-base leading-relaxed mb-4" {...props} />,
              ul: ({ ...props }) => <ul className="space-y-2 pl-6 list-disc text-slate-300 text-base mb-6" {...props} />,
              ol: ({ ...props }) => <ol className="space-y-2 pl-6 list-decimal text-slate-300 text-base mb-6" {...props} />,
              li: ({ ...props }) => <li className="text-slate-300" {...props} />,
              strong: ({ ...props }) => <strong className="text-white font-semibold" {...props} />,
              code: ({ ...props }) => <code className="bg-slate-900 text-emerald-400 font-mono text-xs px-2 py-0.5 rounded border border-emerald-500/30" {...props} />,
              blockquote: ({ ...props }) => <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-4 italic text-slate-400 bg-emerald-500/5 rounded-r" {...props} />,
              table: ({ ...props }) => <div className="overflow-x-auto my-6"><table className="w-full text-left text-sm border-collapse border border-tech-border" {...props} /></div>,
              th: ({ ...props }) => <th className="bg-slate-900/80 p-3 border border-tech-border text-emerald-400 font-mono font-bold" {...props} />,
              td: ({ ...props }) => <td className="p-3 border border-tech-border text-slate-300" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>

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
