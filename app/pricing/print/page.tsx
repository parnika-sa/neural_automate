import React from 'react';
import type { Metadata } from 'next';
import { 
  Currency, 
  websiteSections, 
  marketingSections, 
  automationSections, 
  termsAndNotes, 
  formatPrice, 
  WHATSAPP_NUMBER, 
  WHATSAPP_DISPLAY, 
  VALID_TILL_DATE, 
  BUSINESS_EMAIL, 
  SITE_URL 
} from '@/lib/pricing';

export const metadata: Metadata = {
  title: "Pricing Guide PDF | NeuralAutomate.dev",
  robots: {
    index: false,
    follow: false,
  },
};

// Print Route Page: A4 Portrait CSS & dark theme print rendering
export default function PricingPrintPage({
  searchParams,
}: {
  searchParams: { currency?: string; section?: string };
}) {
  const currency: Currency = searchParams?.currency === 'USD' ? 'USD' : 'INR';
  const sectionKey = (searchParams?.section || 'website').toLowerCase();

  const sectionTitleMap: Record<string, string> = {
    website: "Website Development Pricing Guide",
    marketing: "Marketing Services Pricing Guide",
    automation: "AI & Automation Pricing Guide",
  };

  const documentTitle = sectionTitleMap[sectionKey] || "Pricing Guide";

  const activeSections = 
    sectionKey === 'website' ? websiteSections :
    sectionKey === 'marketing' ? marketingSections :
    automationSections;

  const whatsappMessage = encodeURIComponent("Hi NeuralAutomate, I want a quote for your services");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="bg-[#020503] text-slate-100 min-h-screen font-sans p-6 sm:p-10 max-w-[210mm] mx-auto relative print-container">
      {/* CSS Print Styles for A4 page sizing, colors, and repeating table headers */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
        @media print {
          html, body {
            background-color: #020503 !important;
            color: #f8fafc !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-container {
            padding: 0 !important;
            max-width: 100% !important;
          }
          tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          thead {
            display: table-header-group !important;
          }
          a {
            text-decoration: none !important;
          }
        }
      `}</style>

      <div className="space-y-8">
        
        {/* =================================================== */}
        {/* PAGE 1 COVER / HEADER */}
        {/* =================================================== */}
        <header className="border-b border-emerald-500/30 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/40 bg-slate-900 shrink-0">
                <img src="/logo.png" alt="NeuralAutomate Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <a href={SITE_URL} className="text-xl font-display font-black text-white hover:text-emerald-400 transition-colors">
                  Neural<span className="text-emerald-400">Automate</span>.dev
                </a>
                <p className="text-[11px] font-mono text-slate-400">
                  Autonomous AI Process Automations & High-Performance Web Systems
                </p>
              </div>
            </div>

            <a
              href={`${SITE_URL}/contact`}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shrink-0"
            >
              Get a Free Quote
            </a>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-t border-tech-border/40 pt-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                Official Investment Guide
              </span>
              <h1 className="text-2xl font-display font-extrabold text-white mt-1">
                {documentTitle}
              </h1>
            </div>

            <div className="text-left sm:text-right space-y-0.5 text-xs font-mono text-slate-300">
              <p>Currency: <strong className="text-emerald-400">{currency === 'INR' ? 'INR (₹ - India)' : 'USD ($ - International)'}</strong></p>
              <p className="text-slate-400 text-[11px]">Prices valid till <strong className="text-slate-200">{VALID_TILL_DATE}</strong></p>
            </div>
          </div>
        </header>

        {/* =================================================== */}
        {/* SECTION TABLES (MAX 3-4 COLUMNS FOR PDF READABILITY) */}
        {/* =================================================== */}
        <main className="space-y-8">
          {activeSections.map((sec) => (
            <div key={sec.id} className="space-y-3">
              
              <div className="border-l-2 border-emerald-500 pl-3">
                <h2 className="text-base font-display font-bold text-white">
                  {sec.title}
                </h2>
                <p className="text-[11px] text-slate-400">
                  {sec.description}
                </p>
              </div>

              <div className="rounded-xl border border-tech-border overflow-hidden bg-[#07120a]">
                <table className="w-full text-left border-collapse text-xs" aria-label={sec.title}>
                  <thead>
                    <tr className="bg-[#040805] text-slate-300 font-mono text-[10px] uppercase border-b border-tech-border">
                      <th scope="col" className="py-2.5 px-3.5 font-bold tracking-wider w-1/3">
                        {sec.columns[0]}
                      </th>
                      <th scope="col" className="py-2.5 px-3.5 font-bold tracking-wider">
                        {sec.columns[1]}
                      </th>

                      {/* Automation Tables: Setup + Monthly Columns */}
                      {sec.rows[0]?.setup || sec.rows[0]?.monthly ? (
                        <>
                          <th scope="col" className="py-2.5 px-3.5 font-bold tracking-wider whitespace-nowrap">
                            Setup Fee
                          </th>
                          <th scope="col" className="py-2.5 px-3.5 font-bold tracking-wider whitespace-nowrap">
                            Monthly Fee
                          </th>
                        </>
                      ) : (
                        /* Website & Marketing Tables: Single Price Column (Delivery column omitted in PDF) */
                        <th scope="col" className="py-2.5 px-3.5 font-bold tracking-wider whitespace-nowrap">
                          {sec.columns[2] || 'Price'}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tech-border/40 text-slate-300">
                    {sec.rows.map((row) => (
                      <tr key={row.slug} className={row.popular ? 'bg-emerald-950/20' : ''}>
                        
                        {/* Package / Service Name */}
                        <td className="py-3 px-3.5 font-bold text-white align-top">
                          <div className="space-y-1">
                            <div>{row.name}</div>
                            {row.popular && (
                              <span className="inline-block text-[9px] font-mono font-bold px-1.5 py-0.2 bg-emerald-500 text-slate-950 rounded">
                                Most Popular
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Details */}
                        <td className="py-3 px-3.5 text-slate-300 leading-normal align-top">
                          {row.details}
                        </td>

                        {/* Automation Price Columns */}
                        {row.setup || row.monthly ? (
                          <>
                            <td className="py-3 px-3.5 font-mono font-bold text-white whitespace-nowrap align-top">
                              {formatPrice(row.setup, currency)}
                              {row.setup?.type === 'one-time' && <span className="text-[9px] text-slate-400 font-normal ml-1">one-time</span>}
                            </td>
                            <td className="py-3 px-3.5 font-mono font-bold text-emerald-400 whitespace-nowrap align-top">
                              {formatPrice(row.monthly, currency)}
                              {row.monthly?.type === 'monthly' && <span className="text-[9px] text-slate-400 font-normal ml-1">/mo</span>}
                            </td>
                          </>
                        ) : (
                          /* Website & Marketing Price Column */
                          <td className="py-3 px-3.5 font-mono font-bold text-emerald-400 whitespace-nowrap align-top">
                            {formatPrice(row.price, currency)}
                            {row.price?.type === 'monthly' && <span className="text-[9px] text-slate-400 font-normal ml-1">/mo</span>}
                            {row.price?.type === 'one-time' && <span className="text-[9px] text-slate-400 font-normal ml-1">one-time</span>}
                            {row.price?.type === 'per-unit' && <span className="text-[9px] text-slate-400 font-normal ml-1">{row.price.unit}</span>}
                          </td>
                        )}

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {sec.note && (
                <p className="text-[10px] font-mono text-slate-400 pl-1">
                  * Note: {sec.note}
                </p>
              )}
            </div>
          ))}

          {/* Section specific extra notices */}
          {sectionKey === 'marketing' && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-slate-300">
              📌 <strong>Ad Spend Notice:</strong> Ad spend is paid directly by the client to Google/Meta and is not included in management fees.
            </div>
          )}

          {sectionKey === 'automation' && (
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs font-mono text-slate-300">
              📌 <strong>API Notice:</strong> WhatsApp Business API / Meta conversation charges are paid directly by the client to Meta.
            </div>
          )}
        </main>

        {/* =================================================== */}
        {/* TERMS AND NOTES TABLE */}
        {/* =================================================== */}
        <section className="space-y-3 pt-4 border-t border-emerald-500/30">
          <div className="border-l-2 border-emerald-500 pl-3">
            <h2 className="text-base font-display font-bold text-white">
              Terms & General Guidelines
            </h2>
            <p className="text-[10px] text-slate-400">
              Standard commercial terms for NeuralAutomate.dev client engagements.
            </p>
          </div>

          <div className="rounded-xl border border-tech-border overflow-hidden bg-[#07120a]">
            <table className="w-full text-left border-collapse text-xs" aria-label="Terms and Notes">
              <thead>
                <tr className="bg-[#040805] text-slate-300 font-mono text-[10px] uppercase border-b border-tech-border">
                  <th scope="col" className="py-2 px-3 font-bold tracking-wider w-1/4">Point</th>
                  <th scope="col" className="py-2 px-3 font-bold tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tech-border/40 text-slate-300">
                {termsAndNotes.map((term, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-3 font-bold text-white align-top whitespace-nowrap">
                      {term.point}
                    </td>
                    <td className="py-2 px-3 text-slate-300 leading-relaxed">
                      {term.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] font-mono text-center text-slate-400 pt-2">
            Prices valid till <strong className="text-emerald-400">{VALID_TILL_DATE}</strong>
          </p>
        </section>

        {/* =================================================== */}
        {/* DOCUMENT FOOTER WITH CLICKABLE LINKS */}
        {/* =================================================== */}
        <footer className="pt-4 border-t border-tech-border/50 text-[10px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div>
            <a href={SITE_URL} className="text-emerald-400 hover:underline">NeuralAutomate.dev</a>
            <span className="mx-2">|</span>
            <a href={`mailto:${BUSINESS_EMAIL}`} className="hover:text-slate-200">{BUSINESS_EMAIL}</a>
          </div>

          <div>
            <span>WhatsApp: </span>
            <a href={whatsappUrl} className="text-emerald-400 hover:underline font-bold">
              {WHATSAPP_DISPLAY}
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
