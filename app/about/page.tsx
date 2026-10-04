import { Metadata } from 'next';
import Link from 'next/link';
import MeetTheTeam from '@/components/MeetTheTeam';
import { SITE_CONFIG } from '@/lib/site-config';
import {
  Sparkles,
  Zap,
  Target,
  Compass,
  CheckCircle2,
  Cpu,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Clock,
  HeartHandshake,
} from 'lucide-react';

export const metadata: Metadata = {
  title: `About Us | Founder & AI Agent Team | ${SITE_CONFIG.brandName}`,
  description: `Discover how NeuralAutomate.dev combines human founder leadership with specialized AI agents to engineer modern websites and 24/7 automations.`,
  openGraph: {
    title: `About NeuralAutomate.dev | Founder & AI Agents`,
    description: `Automate Once. Scale Forever. Learn about our story, technology stack, and founder-led AI model.`,
    url: `${SITE_CONFIG.siteUrl}/about`,
  },
};

const techStackList = [
  { name: 'Next.js 14', desc: 'App Router, React, Server Components for lightning speed.' },
  { name: 'n8n Workflows', desc: 'Visual workflow engine connecting CRMs, webhooks, and databases.' },
  { name: 'WhatsApp Business API', desc: 'Official API integration for 24/7 automated customer conversations.' },
  { name: 'Claude & GPT Models', desc: 'Advanced LLM reasoning for lead qualification and copy creation.' },
  { name: 'Razorpay & Stripe', desc: 'Secure payment gateway processing for domestic & international billing.' },
  { name: 'Supabase', desc: 'Scalable PostgreSQL database and real-time backend state.' },
];

const workSteps = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We analyze your current manual bottlenecks, lead intake flow, and website goals in an initial consultation.',
  },
  {
    step: '02',
    title: 'Build',
    desc: 'Ankit Maurya designs the architecture while our AI agent fleet assists in rapid coding, copy creation, and testing.',
  },
  {
    step: '03',
    title: 'Launch',
    desc: 'We deploy your modern website and live automation pipelines on staging for review before full production launch.',
  },
  {
    step: '04',
    title: 'Support',
    desc: 'Direct founder support, 2 free revision rounds, and ongoing maintenance to keep your systems running flawlessly.',
  },
];

const coreValues = [
  {
    icon: ShieldCheck,
    title: 'Transparency',
    desc: 'No hidden taxes, no inflated team claims. You deal directly with the founder and know exactly how your project is built.',
  },
  {
    icon: Zap,
    title: 'Speed & Agility',
    desc: 'By pairing human engineering with AI pair-programmers, we deliver high-end web applications in days instead of months.',
  },
  {
    icon: HeartHandshake,
    title: 'Honest Pricing',
    desc: 'Fixed-milestone pricing with fair pro-rata refund policies. You only pay for actual value delivered.',
  },
  {
    icon: Clock,
    title: 'Long-term Support',
    desc: 'We do not drop projects after launch. We provide 24-hour response SLAs for all production systems.',
  },
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.brandName,
    url: SITE_CONFIG.siteUrl,
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.operatorName,
      jobTitle: 'Founder & Lead Engineer',
    },
    foundingDate: '2026-06',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chandigarh',
      addressCountry: 'India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.email,
      contactType: 'customer support',
    },
  };

  return (
    <main className="min-h-screen bg-[#040705] tech-grid-pattern text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto space-y-20">
        {/* 1. HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Founder-Led AI Automation Studio
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
            Automate Once. <br />
            <span className="gradient-text-electric">
              Scale Forever.
            </span>
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl font-normal leading-relaxed">
            We build modern, high-converting websites and 24/7 WhatsApp AI automation engines designed to help businesses operate faster without bloated overhead.
          </p>
        </section>

        {/* 2. OUR STORY */}
        <section className="p-8 sm:p-12 rounded-3xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">Our Story</h2>
          </div>
          <div className="text-slate-300 space-y-4 text-base leading-relaxed">
            <p>
              Founded in June 2026 in Chandigarh, India, <strong>{SITE_CONFIG.brandName}</strong> was created with a clear observation: traditional web agencies are slow, expensive, and rely on heavy account management layers that dilute work quality.
            </p>
            <p>
              We pioneered a streamlined, founder-led model where an experienced software engineer works directly alongside specialized AI agents to plan, code, test, and ship production systems at unprecedented speed.
            </p>
          </div>
        </section>

        {/* 3. MISSION AND VISION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">Our Mission</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To empower growing businesses with enterprise-grade web applications and 24/7 AI automations that turn website traffic into qualified leads automatically.
            </p>
          </div>

          <div className="p-8 rounded-2xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              A future where every ambitious company can deploy intelligent software pipelines and convert leads continuously without needing a massive internal engineering team.
            </p>
          </div>
        </section>

        {/* 4. FOUNDER NOTE */}
        <section className="p-8 sm:p-10 rounded-3xl tech-card border border-emerald-500/40 bg-gradient-to-br from-[#09170e] via-[#07120a] to-[#040705] space-y-6 shadow-2xl">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            A Note From The Founder
          </div>
          <blockquote className="text-slate-200 text-lg sm:text-xl font-medium italic leading-relaxed">
            "When you work with NeuralAutomate.dev, you won't be passed off to junior account managers. I personally review every line of code, every design component, and every automation payload before it touches production. Combining human accountability with AI speed allows us to deliver high quality without charging agency markups."
          </blockquote>
          <div className="pt-2">
            <div className="font-bold text-white text-lg">{SITE_CONFIG.operatorName}</div>
            <div className="text-xs font-mono text-slate-400">Founder & Principal Engineer, NeuralAutomate.dev</div>
          </div>
        </section>

        {/* 5. MEET THE TEAM (HUMAN + AI AGENTS) */}
        <section id="team" className="space-y-6">
          <MeetTheTeam />
        </section>

        {/* 6. HOW WE WORK (4 STEPS) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold text-white">How We Work</h2>
            <p className="text-slate-400 text-sm">A systematic 4-step workflow designed for clarity and speed.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workSteps.map((ws) => (
              <div key={ws.step} className="p-6 rounded-2xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-3 relative overflow-hidden">
                <div className="text-4xl font-black text-emerald-500/20 font-mono">{ws.step}</div>
                <h3 className="text-xl font-display font-bold text-white">{ws.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{ws.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. OUR VALUES */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold text-white">Our Core Values</h2>
            <p className="text-slate-400 text-sm">Principles that guide every project commitment.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreValues.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-6 rounded-2xl tech-card border border-emerald-500/20 bg-[#07120a] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">{v.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. TECH STACK */}
        <section className="p-8 rounded-3xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-display font-bold text-white">Our Technology Stack</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStackList.map((ts) => (
              <div key={ts.name} className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 space-y-1">
                <div className="font-mono font-bold text-emerald-400 text-sm">{ts.name}</div>
                <div className="text-xs text-slate-400">{ts.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. WHY CHOOSE US */}
        <section className="p-8 rounded-3xl tech-card border border-emerald-500/20 bg-[#07120a] space-y-6">
          <h2 className="text-2xl font-display font-bold text-white text-center">Why Businesses Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-200 text-sm">Direct Founder Access</h3>
              <p className="text-xs text-slate-400">Speak straight to the engineer building your system.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 text-center space-y-2">
              <Zap className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-200 text-sm">Rapid Delivery</h3>
              <p className="text-xs text-slate-400">Launch in 7 to 21 business days with staging previews.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 text-center space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-200 text-sm">Pro-Rata Refunds</h3>
              <p className="text-xs text-slate-400">Cancel anytime with 3-5 days notice; pay only for work done.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 text-center space-y-2">
              <Cpu className="w-6 h-6 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-slate-200 text-sm">24/7 AI Automation</h3>
              <p className="text-xs text-slate-400">Automate lead intake and support using official APIs.</p>
            </div>
          </div>
        </section>

        {/* 10. CTA SECTION */}
        <section className="text-center space-y-6 p-10 rounded-3xl tech-card border border-emerald-500/30 bg-gradient-to-r from-[#040705] via-[#08180e] to-[#040705] shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
            Ready to Automate Your Business?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Book a free strategy consultation or chat with us on WhatsApp to discuss your project scope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/contact"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Book a Free Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-8 rounded-xl bg-[#07120a] hover:bg-[#0a180d] text-white border border-emerald-500/30 font-bold text-sm transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Chat on WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
