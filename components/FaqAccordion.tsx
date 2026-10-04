'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  categories: string[];
  items: FaqItem[];
}

export default function FaqAccordion({ categories, items }: FaqAccordionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* SEARCH & FILTER BAR */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. refund, WhatsApp, pricing, timeline)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#040705] border border-emerald-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm transition-all shadow-inner"
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="FAQ Categories">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-[#07120a] text-slate-400 border border-emerald-500/20 hover:border-emerald-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ACCORDION LIST */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 space-y-2">
          <p className="text-slate-300 font-semibold">No matching questions found</p>
          <p className="text-xs text-slate-500">Try adjusting your search terms or selecting another category.</p>
        </div>
      ) : (
        <div className="space-y-3 max-w-3xl mx-auto">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden tech-card ${
                  isOpen
                    ? 'bg-[#09170e] border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-[#07120a] border-emerald-500/20 hover:border-emerald-500/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <span className="font-display font-bold text-white text-base sm:text-lg leading-snug">
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-emerald-500/20 text-emerald-400 rotate-180' : 'bg-[#040705] text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-emerald-500/20 space-y-3">
                        <p>{item.answer}</p>
                        <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#040705] border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
                          Category: {item.category}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
