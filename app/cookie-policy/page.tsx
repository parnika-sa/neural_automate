import React from 'react';
import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Cookie Policy | ${SITE_CONFIG.brandName}`,
  description: `Cookie Policy for ${SITE_CONFIG.brandName} - Learn about cookie categories, dynamic consent loading, and browser management.`,
};

export default function CookiePolicyPage() {
  const toc = [
    { id: "what-are-cookies", title: "1. What Are Cookies?" },
    { id: "cookie-categories", title: "2. Categories of Cookies Used" },
    { id: "consent-mechanism", title: "3. Consent-Based Loading (GTM/GA4)" },
    { id: "retention", title: "4. Cookie Retention Periods" },
    { id: "how-to-manage", title: "5. Managing & Withdrawing Consent" },
    { id: "browser-settings", title: "6. Controlling Cookies via Browser" },
  ];

  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle={`Detailed explanation of how ${SITE_CONFIG.brandName} uses cookies and handles telemetry consent.`}
      toc={toc}
    >
      <section id="what-are-cookies" className="space-y-3">
        <h2 className="text-xl font-bold text-white">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your computer or mobile device when you visit a website. They allow websites to remember user actions and preferences (such as cookie consent choices or session states) over time.
        </p>
      </section>

      <section id="cookie-categories" className="space-y-3">
        <h2 className="text-xl font-bold text-white">2. Categories of Cookies Used</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>
            <strong>Necessary Cookies:</strong> Required for fundamental site navigation, security features, and session persistence. These are active by default and cannot be disabled.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us measure website traffic, page speed performance, and user navigation flows using Google Tag Manager and Google Analytics 4.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Allow us to measure ad campaign performance and display relevant AI solution suggestions.
          </li>
        </ul>
      </section>

      <section id="consent-mechanism" className="space-y-3">
        <h2 className="text-xl font-bold text-white">3. Consent-Based Script Loading (GTM/GA4)</h2>
        <p>
          We respect user privacy. Third-party telemetry scripts (Google Tag Manager, Google Analytics 4) are dynamically initialized <strong>only after you grant explicit consent</strong> through our Cookie Banner. If you reject non-essential cookies, no analytics or marketing scripts are loaded into your browser.
        </p>
      </section>

      <section id="retention" className="space-y-3">
        <h2 className="text-xl font-bold text-white">4. Cookie Retention Periods</h2>
        <p>
          Consent preferences stored in your browser's LocalStorage (`cookie_consent`) persist until cleared by you or up to 365 days. Analytics cookies expire automatically based on standard Google Analytics retention timelines (typically 14 months).
        </p>
      </section>

      <section id="how-to-manage" className="space-y-3">
        <h2 className="text-xl font-bold text-white">5. Managing & Withdrawing Consent</h2>
        <p>
          You can change or withdraw your cookie preferences at any time. Simply scroll to the website footer and click the <strong>"Cookie Settings"</strong> button to reopen the preference panel and modify your toggles.
        </p>
      </section>

      <section id="browser-settings" className="space-y-3 border-t border-tech-border/50 pt-4">
        <h2 className="text-xl font-bold text-white">6. Controlling Cookies via Browser Settings</h2>
        <p>
          Most web browsers allow you to manage cookie preferences through their settings menu. You can configure your browser to block third-party cookies or alert you when cookies are being sent. Note that blocking necessary cookies may impact website performance.
        </p>
      </section>
    </LegalLayout>
  );
}
