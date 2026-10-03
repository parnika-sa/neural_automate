import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Service Delivery Policy | ${SITE_CONFIG.brandName}`,
  description: `Service Delivery Policy for ${SITE_CONFIG.brandName} - Learn about digital delivery timelines, staging previews, and project handovers.`,
};

export default function DeliveryPolicyPage() {
  const toc = [
    { id: "digital-nature", title: "1. 100% Digital Delivery" },
    { id: "timelines", title: "2. Delivery Timelines" },
    { id: "delivery-process", title: "3. Delivery & Handover Process" },
    { id: "revision-policy", title: "4. Revision & Testing Rounds" },
    { id: "delay-notifications", title: "5. Delays & Dependencies" },
    { id: "contact-support", title: "6. Delivery Inquiries" },
  ];

  return (
    <LegalLayout
      title="Service Delivery Policy"
      subtitle={`Information regarding digital service delivery, project milestones, and handovers at ${SITE_CONFIG.brandName}.`}
      toc={toc}
    >
      <section id="digital-nature" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. 100% Digital Delivery (No Physical Shipping)</h2>
        <p>
          <strong>{SITE_CONFIG.brandName}</strong> provides 100% online and digital technical services including website development, digital marketing setup, and AI n8n workflow automations.
        </p>
        <p>
          We do <strong>not</strong> ship any physical goods, CD-ROMs, hardware, or printed materials. All deliverables are transmitted digitally via email, secure web portals, staging preview links, or Git repositories.
        </p>
      </section>

      <section id="timelines" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Delivery Timelines by Service Category</h2>
        <p>Delivery timeframes depend on project scope as outlined on our <Link href="/pricing" className="text-emerald-400 hover:underline font-bold">Pricing Page</Link>:</p>
        <ul className="list-disc list-inside space-y-1.5 pl-2">
          <li><strong>Landing Pages & Basic Chatbots:</strong> 3 to 7 business days.</li>
          <li><strong>Full Business Websites & Standard Automations:</strong> 10 to 14 business days.</li>
          <li><strong>Dynamic Web Apps & Enterprise Multi-Node Pipelines:</strong> 3 to 4 weeks (scope dependent).</li>
          <li><strong>Marketing Services (SEO/Ads Setup):</strong> Campaign setup within 5 to 7 business days, followed by ongoing monthly management.</li>
        </ul>
      </section>

      <section id="delivery-process" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Delivery & Handover Process</h2>
        <ol className="list-decimal list-inside space-y-2 pl-2">
          <li><strong>Staging Preview:</strong> Upon build completion, we share a live, password-protected staging preview URL (e.g. Vercel staging) for client testing and review.</li>
          <li><strong>Testing & Revisions:</strong> Client reviews functionality and requests adjustments under the revision policy.</li>
          <li><strong>Final Launch & Credentials Transfer:</strong> Upon approval and final balance payment, we deploy the site to production DNS or transfer GitHub code repository access, n8n JSON export files, and login credentials.</li>
        </ol>
      </section>

      <section id="revision-policy" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Revision & Testing Rounds</h2>
        <p>
          Each project includes <strong>2 complimentary revision rounds</strong> within the initial scope. Additional revision rounds or scope expansions beyond original requirements are billed at our standard hourly rate.
        </p>
      </section>

      <section id="delay-notifications" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Delays & Dependency Management</h2>
        <p>
          Delivery timelines are contingent upon prompt client feedback, content submission (logos, text, images), and third-party API availability. If a delay occurs due to technical platform dependencies or extended review periods, we proactively notify the client via Email or WhatsApp with a revised delivery date.
        </p>
      </section>

      <section id="contact-support" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">6. Delivery Support & Inquiries</h2>
        <p>
          For any questions regarding project milestones or delivery schedules, contact our lead engineer:
        </p>
        <div className="p-4 rounded-2xl bg-[#040805] border border-tech-border space-y-1 font-mono text-xs text-slate-300">
          <p className="text-white font-bold">{SITE_CONFIG.brandName}</p>
          <p>Operator: {SITE_CONFIG.operatorName}</p>
          <p>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-emerald-400 hover:underline">{SITE_CONFIG.email}</a></p>
          <p>WhatsApp: <a href={SITE_CONFIG.whatsappUrl} className="text-emerald-400 hover:underline">{SITE_CONFIG.whatsappDisplay}</a></p>
        </div>
      </section>
    </LegalLayout>
  );
}
