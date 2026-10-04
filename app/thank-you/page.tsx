import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';
import { CheckCircle2, MessageSquare, Home, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: `Thank You | ${SITE_CONFIG.brandName}`,
  description: `Thank you for contacting ${SITE_CONFIG.brandName}. We have received your request.`,
  robots: {
    index: false,
    follow: false,
  },
};

interface ThankYouProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ThankYouPage({ searchParams }: ThankYouProps) {
  const source = typeof searchParams.source === 'string' ? searchParams.source : 'contact';

  const getSourceDetails = () => {
    switch (source) {
      case 'demo':
        return {
          title: 'Demo Strategy Call Reserved!',
          message: 'Thank you for scheduling a strategy consultation. Our team is reviewing your requirement and will share a Google Meet calendar invitation within 24 hours.',
        };
      case 'payment':
        return {
          title: 'Payment Received Successfully!',
          message: 'Thank you for getting started with NeuralAutomate.dev. Your project kickoff confirmation and receipt have been dispatched to your email.',
        };
      case 'data-deletion':
        return {
          title: 'Data Deletion Request Received',
          message: 'We have logged your request to erase personal information. Our team will process this and send a confirmation within 30 days.',
        };
      case 'contact':
      default:
        return {
          title: 'Message Received Successfully!',
          message: 'Thank you for reaching out to NeuralAutomate.dev. We have received your inquiry and our team will get back to you within 24 hours.',
        };
    }
  };

  const details = getSourceDetails();

  return (
    <main className="min-h-screen bg-[#040705] tech-grid-pattern text-slate-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full text-center space-y-8 tech-card bg-[#07120a] border border-emerald-500/30 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ICON */}
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* HEADING & MESSAGE */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {details.title}
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            {details.message}
          </p>
        </div>

        {/* EXPECTATIONS BOX */}
        <div className="p-4 rounded-2xl bg-[#040705] border border-emerald-500/20 text-left space-y-3">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Next Steps & Expectations
          </div>
          <ul className="text-xs text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>We respond to every message within <strong>24 business hours</strong> (Mon-Sat, IST).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold">•</span>
              <span>For urgent updates, ping us directly on WhatsApp with your project details.</span>
            </li>
          </ul>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <a
            href={SITE_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare className="w-4 h-4" /> Message on WhatsApp
          </a>

          <Link
            href="/"
            className="flex-1 py-3.5 px-6 rounded-xl bg-[#040705] hover:bg-[#09170e] text-slate-200 border border-emerald-500/30 font-bold text-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
