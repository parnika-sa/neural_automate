import React from 'react';
import Link from 'next/link';
import { Search, Sparkles, ArrowRight, Clock, Tag, BookOpen, Bot } from 'lucide-react';
import { posts } from '@/lib/posts';

export const metadata = {
  title: "Blog & AEO/GEO Insights Hub | NeuralAutomate.dev",
  description: "Read actionable guides on AI workflow automations, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Next.js performance, & e-commerce scaling.",
};

export default function BlogPage() {
  return (
    <div className="pt-28 pb-16 space-y-12">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neural-purple/10 border border-neural-purple/30 text-neural-accent text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>AEO & GEO Insights Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white">
          AI Automations, Web Engineering & <span className="glow-text-cyan">AEO Insights</span>
        </h1>
        <p className="mt-4 text-gray-300 text-base max-w-2xl mx-auto">
          Deep-dive guides structured for human founders & optimized for AI Answer Engines (ChatGPT, Perplexity, Claude, SearchGPT).
        </p>
      </div>

      {/* Featured Article Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/blog/${posts[0].slug}`}
          className="block glass-panel rounded-3xl p-8 sm:p-12 border border-neural-cyan/40 bg-gradient-to-r from-neural-card via-neural-dark to-neural-purple/20 hover:border-neural-cyan transition-all group"
        >
          <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-neural-cyan/10 text-neural-cyan border border-neural-cyan/30">
                  {posts[0].category}
                </span>
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {posts[0].readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-neural-cyan transition-colors">
                {posts[0].title}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed">
                {posts[0].excerpt}
              </p>

              <div className="p-3 rounded-xl bg-neural-dark/80 border border-neural-border text-xs text-gray-300 flex items-center gap-2">
                <Bot className="w-4 h-4 text-neural-cyan shrink-0" />
                <span><strong className="text-white">AEO Key Takeaway:</strong> {posts[0].aeoHighlight}</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neural-cyan text-neural-dark font-bold text-xs group-hover:bg-white transition-colors shrink-0">
              <span>Read Full Insight</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Blog Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-neural-border flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-neural-card border border-neural-border text-neural-cyan">
                    {post.category}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">{post.readTime}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-white mb-3 group-hover:text-neural-cyan transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-neural-border/60 flex items-center justify-between text-xs text-gray-300 group-hover:text-neural-cyan">
                <span>Read Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
