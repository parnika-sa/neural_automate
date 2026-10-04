import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';
import { Mail, MessageSquare, Clock, ShieldCheck, HelpCircle, RefreshCw, FileText, ArrowRight, Bot } from 'lucide-react';

export const metadata: Metadata = {
  title: `Customer Support & Help Desk | ${SITE_CONFIG.brandName}`,
  description: `Get technical help, report project issues, or contact ${SITE_CONFIG.brandName}. We respond within 24 hours on working days.`,
  openGraph: {
    title: `Customer Support | ${SITE_CONFIG.brandName}`,
    description: `Direct support channels via email and WhatsApp. Guaranteed response within 24 hours.`,
    url: `${SITE_CONFIG.siteUrl}/support`,
  },
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#040705] tech-grid-pattern text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* HERO SECTION */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Client Support Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            How Can We Help You?
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Direct access to our founder and engineering leads. No automated ticketing runarounds—get clear, actionable help for your website or automation system.
          </p>
        </div>

        {/* SUPPORT CHANNELS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Support Card */}
          <div className="p-6 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-white">Email Support</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                Ideal for detailed bug reports, project change requests, or documentation questions.
              </p>
              <div className="text-xs font-mono text-slate-400 space-y-1 pt-2">
                <p><strong className="text-slate-200">Email:</strong> {SITE_CONFIG.email}</p>
                <p><strong className="text-slate-200">Response SLA:</strong> Within 24 hours</p>
              </div>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors text-center inline-flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20"
            >
              <Mail className="w-4 h-4" /> Send Email Request
            </a>
          </div>

          {/* WhatsApp Founder Support Card */}
          <div className="p-6 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-white">WhatsApp Live Chat</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                For active project queries, urgent production issues, or quick status updates.
              </p>
              <div className="text-xs font-mono text-slate-400 space-y-1 pt-2">
                <p><strong className="text-slate-200">Founder Line:</strong> {SITE_CONFIG.whatsappDisplay}</p>
                <p><strong className="text-slate-200">Hours:</strong> {SITE_CONFIG.businessHours}</p>
              </div>
            </div>
            <a
              href={SITE_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#040705] hover:bg-[#09170e] text-white border border-emerald-500/30 font-bold text-xs transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" /> Founder WhatsApp
            </a>
          </div>

          {/* NEO AI Assistant Card */}
          <div className="p-6 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-display font-bold text-white">NEO (24x7 AI)</h2>
              <p className="text-slate-300 text-xs leading-relaxed">
                24/7 automated sales & lead qualification assistant live on WhatsApp.
              </p>
              <div className="text-xs font-mono text-slate-400 space-y-1 pt-2">
                <p><strong className="text-slate-200">NEO Line:</strong> {SITE_CONFIG.neoPhoneDisplay}</p>
                <p><strong className="text-slate-200">Availability:</strong> 24 Hours / 7 Days</p>
              </div>
            </div>
            <a
              href={SITE_CONFIG.neoWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#040705] hover:bg-[#09170e] text-white border border-emerald-500/30 font-bold text-xs transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-emerald-400" /> Chat with NEO
            </a>
          </div>
        </div>

        {/* EXISTING CLIENT ISSUE REPORTING WORKFLOW */}
        <div className="p-8 rounded-2xl tech-card bg-[#07120a] border border-emerald-500/20 space-y-6 shadow-xl">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" /> For Existing Clients: Reporting an Issue
          </h2>
          <p className="text-slate-300 text-sm">
            If you have an active website or automation deployed with us, follow these 3 simple steps for the fastest resolution:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 1</div>
              <h3 className="font-semibold text-slate-200">Include URL & Context</h3>
              <p className="text-xs text-slate-400">Share the specific page URL, screenshot, or webhook payload where the issue occurred.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 2</div>
              <h3 className="font-semibold text-slate-200">Message Channel</h3>
              <p className="text-xs text-slate-400">Email us with subject "[URGENT] Project Name" or ping on our dedicated WhatsApp line.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#040705] border border-emerald-500/20 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Step 3</div>
              <h3 className="font-semibold text-slate-200">Founder Resolution</h3>
              <p className="text-xs text-slate-400">Ankit Maurya personally inspects production failures and pushes hotfixes directly.</p>
            </div>
          </div>
        </div>

        {/* QUICK HELPFUL LINKS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white">Self-Service Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/faq"
              className="p-5 rounded-xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">FAQs</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/refund-policy"
              className="p-5 rounded-xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">Refund Policy</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/delivery-policy"
              className="p-5 rounded-xl tech-card bg-[#07120a] border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">Delivery Policy</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
