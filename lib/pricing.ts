// Global Config Constants
export const WHATSAPP_NUMBER = "917268930700"; // wa.me links ke liye, bina + aur spaces ke
export const WHATSAPP_DISPLAY = "+91 72689 30700"; // text display ke liye
export const VALID_TILL_DATE = "31 December 2026"; // PDF validity date
export const BUSINESS_EMAIL = "info@neuralautomate.dev"; // Support email address
export const SITE_URL = "https://neuralautomate.dev"; // Base website URL

export type Currency = 'INR' | 'USD';

export type PriceType = 'one-time' | 'monthly' | 'per-unit' | 'hourly';

export interface PriceBlock {
  inr: number | null;
  usd: number | null;
  type?: PriceType;
  startingAt?: boolean;
  unit?: string;
  rawINRText?: string;
  rawUSDText?: string;
}

export interface PricingRow {
  slug: string;
  name: string;
  details: string;
  setup?: PriceBlock; // Automation tables ke liye alag setup fee
  monthly?: PriceBlock; // Automation tables ke liye alag monthly fee
  price?: PriceBlock; // Single price column wale tables ke liye
  delivery?: string; // Website Dev tables ke liye delivery timeframe
  billing?: string; // Marketing & Add-ons ke liye billing cycle text
  popular?: boolean;
  quoteOnly?: boolean;
}

export interface PricingSection {
  id: string;
  title: string;
  description: string;
  note?: string;
  columns: string[];
  rows: PricingRow[];
}

export interface BundleRow {
  slug: string;
  name: string;
  details: string;
  setup: PriceBlock;
  monthly: PriceBlock;
  popular?: boolean;
}

export interface TermRow {
  point: string;
  detail: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Currency aur PriceBlock ke basis par numeric price ko formatted string mein convert karta hai
 */
export function formatPrice(block: PriceBlock | undefined, currency: Currency): string {
  if (!block) return '-';

  if (currency === 'INR') {
    if (block.rawINRText) return block.rawINRText;
    if (block.inr === null) return 'Custom Quote';
    const numStr = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(block.inr);
    return `${block.startingAt ? 'From ' : ''}${numStr}`;
  } else {
    if (block.rawUSDText) return block.rawUSDText;
    if (block.usd === null) return 'Custom Quote';
    const numStr = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(block.usd);
    return `${block.startingAt ? 'From ' : ''}${numStr}`;
  }
}

// ===================================================
// TAB 1: WEBSITE DEVELOPMENT SECTIONS
// ===================================================

export const websiteSections: PricingSection[] = [
  {
    id: "custom-websites",
    title: "1A. Custom-Coded Websites (Next.js / React)",
    description: "High-performance, ultra-fast custom web applications built with Next.js 14, Tailwind CSS, & React.",
    columns: ["Package", "What's Included", "Price", "Delivery"],
    rows: [
      {
        slug: "landing-page-starter",
        name: "Landing Page Starter",
        details: "1 page, mobile responsive, contact form, WhatsApp button, basic SEO",
        price: { inr: 9999, usd: 249, type: 'one-time' },
        delivery: "3-5 days"
      },
      {
        slug: "landing-page-pro",
        name: "Landing Page Pro",
        details: "1 page, premium animations, lead form + email notification, GA4/GTM setup, speed optimized",
        price: { inr: 19999, usd: 499, type: 'one-time' },
        delivery: "5-7 days",
        popular: true
      },
      {
        slug: "business-website",
        name: "Business Website",
        details: "5-8 pages (Home, About, Services, Contact, etc.), SEO-ready, blog-ready, contact forms",
        price: { inr: 29999, usd: 749, type: 'one-time' },
        delivery: "10-14 days"
      },
      {
        slug: "dynamic-website",
        name: "Dynamic Website",
        details: "Admin panel, blog/CMS, user login, forms + database, client interaction (inquiry, booking, dashboard)",
        price: { inr: 59999, usd: 1499, startingAt: true, type: 'one-time' },
        delivery: "3-4 weeks"
      },
      {
        slug: "web-app-portal",
        name: "Web App / Portal",
        details: "Custom features, user roles, dashboards, API integrations, database architecture",
        price: { inr: 125000, usd: 3000, startingAt: true, type: 'one-time' },
        delivery: "Scope dependent",
        quoteOnly: true
      }
    ]
  },
  {
    id: "payment-integrated-sites",
    title: "1B. Payment-Integrated Websites",
    description: "Websites with built-in online checkout, subscriptions, and payment gateways (Razorpay / Stripe).",
    columns: ["Package", "What's Included", "Price", "Delivery"],
    rows: [
      {
        slug: "payment-addon",
        name: "Payment Add-on",
        details: "Razorpay or Stripe checkout added seamlessly to an existing website",
        price: { inr: 14999, usd: 349, type: 'one-time' },
        delivery: "3-5 days"
      },
      {
        slug: "booking-payment-site",
        name: "Service Booking + Payment Site",
        details: "Booking/appointment system + online payment + automated confirmation emails",
        price: { inr: 49999, usd: 1199, type: 'one-time' },
        delivery: "2-3 weeks"
      },
      {
        slug: "membership-site",
        name: "Subscription / Membership Site",
        details: "Recurring payments, member login system, content locking, automated invoice generation",
        price: { inr: 79999, usd: 1899, startingAt: true, type: 'one-time' },
        delivery: "3-4 weeks"
      },
      {
        slug: "ecommerce-custom",
        name: "E-Commerce (Custom)",
        details: "Product catalog, shopping cart, checkout, order management, custom admin portal",
        price: { inr: 89999, usd: 2199, startingAt: true, type: 'one-time' },
        delivery: "4-6 weeks"
      }
    ]
  },
  {
    id: "wordpress-websites",
    title: "1C. WordPress Websites",
    description: "User-friendly WordPress CMS sites tailored for quick content updates, salon bookings, and WooCommerce stores.",
    columns: ["Package", "What's Included", "Price", "Delivery"],
    rows: [
      {
        slug: "wordpress-starter",
        name: "WordPress Starter",
        details: "3-5 pages, premium theme setup, contact form, basic SEO",
        price: { inr: 14999, usd: 399, type: 'one-time' },
        delivery: "5-7 days"
      },
      {
        slug: "wordpress-business",
        name: "WordPress Business",
        details: "8-10 pages, custom design, blog setup, SEO plugin, speed optimization",
        price: { inr: 29999, usd: 749, type: 'one-time' },
        delivery: "10-14 days",
        popular: true
      },
      {
        slug: "salon-spa-clinic-site",
        name: "Salon / Spa / Clinic Website",
        details: "Services menu, online appointment booking, gallery, Google Maps, WhatsApp integration, reviews section",
        price: { inr: 24999, usd: 649, type: 'one-time' },
        delivery: "7-10 days"
      },
      {
        slug: "woocommerce-starter",
        name: "WooCommerce Store (Starter)",
        details: "Up to 50 products, payment gateway, shipping setup, order notification emails",
        price: { inr: 39999, usd: 999, type: 'one-time' },
        delivery: "2-3 weeks"
      },
      {
        slug: "woocommerce-growth",
        name: "WooCommerce Store (Growth)",
        details: "Up to 500 products, discount coupons, abandoned cart recovery, multi-payment setup, inventory management",
        price: { inr: 74999, usd: 1799, type: 'one-time' },
        delivery: "3-4 weeks"
      }
    ]
  },
  {
    id: "website-addons",
    title: "1D. Website Add-ons & Maintenance",
    description: "A la carte upgrades, redesigns, performance optimizations, and monthly maintenance plans.",
    columns: ["Add-on", "Price", "Billing"],
    rows: [
      {
        slug: "extra-page",
        name: "Extra page",
        details: "Additional page design and development",
        price: { inr: 1500, usd: 40, type: 'per-unit', unit: 'per page' },
        billing: "per page"
      },
      {
        slug: "website-redesign",
        name: "Website redesign",
        details: "Complete UI/UX makeover of an existing outdated site",
        price: { inr: 14999, usd: 399, startingAt: true, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "multi-language",
        name: "Multi-language (2 languages)",
        details: "Full bilingual setup & language switcher",
        price: { inr: 7999, usd: 199, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "logo-brand-kit",
        name: "Logo + basic brand kit",
        details: "Custom logo creation, color palette, & typography guidelines",
        price: { inr: 4999, usd: 129, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "content-writing",
        name: "Content writing",
        details: "Professional SEO copywriting per page",
        price: { inr: 999, usd: 25, type: 'per-unit', unit: 'per page' },
        billing: "per page"
      },
      {
        slug: "speed-core-vitals",
        name: "Speed and Core Web Vitals optimization",
        details: "Image compression, code minification, and 90+ Lighthouse score optimization",
        price: { inr: 5999, usd: 149, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "domain-hosting-setup",
        name: "Domain + hosting setup",
        details: "DNS configuration, SSL certificate installation, and server provisioning",
        price: { inr: 1999, usd: 49, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "monthly-maintenance",
        name: "Monthly maintenance",
        details: "Regular plugin updates, cloud backups, security scans, 2 hrs minor edits",
        price: { inr: 2999, usd: 79, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "premium-maintenance",
        name: "Premium maintenance",
        details: "Priority support, 5 hrs content updates, 24/7 uptime monitoring",
        price: { inr: 5999, usd: 149, type: 'monthly' },
        billing: "monthly"
      }
    ]
  }
];

// ===================================================
// TAB 2: MARKETING SECTIONS
// ===================================================

export const marketingSections: PricingSection[] = [
  {
    id: "seo-services",
    title: "2A. Search Engine Optimization (SEO)",
    description: "Data-driven organic search strategies to rank higher on Google search results.",
    note: "SEO results take time to compound. A 3-month minimum commitment is recommended.",
    columns: ["Package", "What's Included", "Price", "Billing"],
    rows: [
      {
        slug: "technical-seo-audit",
        name: "Technical SEO Audit",
        details: "Site crawl, speed, indexing, schema markup, broken links, full report + fix list",
        price: { inr: 7999, usd: 199, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "on-page-seo",
        name: "On-Page SEO",
        details: "Keyword research, meta tags, content optimization, internal linking, 4 pages/mo",
        price: { inr: 9999, usd: 249, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "off-page-seo",
        name: "Off-Page SEO",
        details: "Quality backlinks (10-15/mo), guest posts, directory + citation submissions, competitor link analysis",
        price: { inr: 12999, usd: 349, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "local-seo",
        name: "Local SEO",
        details: "Google Business Profile optimization, local citations, review strategy, map ranking",
        price: { inr: 7999, usd: 199, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "seo-growth",
        name: "SEO Growth (All-in-one)",
        details: "On-page + Technical + Off-page + 2 blogs/mo + comprehensive monthly report",
        price: { inr: 24999, usd: 649, type: 'monthly' },
        billing: "monthly",
        popular: true
      },
      {
        slug: "seo-scale",
        name: "SEO Scale",
        details: "Everything in Growth + 6 blogs/mo, advanced link building, conversion tracking, monthly strategy call",
        price: { inr: 44999, usd: 1199, type: 'monthly' },
        billing: "monthly"
      }
    ]
  },
  {
    id: "paid-ads-management",
    title: "2B. Paid Ads Management (PPC)",
    description: "Targeted PPC & Social media ad campaigns to generate high-intent leads and sales.",
    note: "Ad spend is paid directly by the client to Google/Meta and is not included in management fees.",
    columns: ["Package", "What's Included", "Price", "Billing"],
    rows: [
      {
        slug: "ad-account-setup",
        name: "Ad Account + Tracking Setup",
        details: "Meta Pixel, Google conversion tracking, GTM container setup, custom audience setup",
        price: { inr: 4999, usd: 129, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "google-ads",
        name: "Google Ads Management",
        details: "Search/Display campaigns, keyword research, ad copy creation, weekly optimization, monthly report",
        price: { inr: 12999, usd: 399, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "meta-ads",
        name: "Meta Ads (Facebook + Instagram)",
        details: "Creative strategy, audience targeting, retargeting funnels, A/B testing, monthly performance report",
        price: { inr: 12999, usd: 399, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "google-meta-combo",
        name: "Google + Meta Combo",
        details: "Full cross-channel management of both Google Ads & Meta Ads platforms",
        price: { inr: 21999, usd: 649, type: 'monthly' },
        billing: "monthly",
        popular: true
      },
      {
        slug: "performance-scale-ads",
        name: "Performance Scale (For ₹1L+ ad spend)",
        details: "Dedicated account manager, advanced multi-stage funnels, weekly strategy calls",
        price: { 
          inr: 34999, 
          usd: 999, 
          type: 'monthly',
          rawINRText: "₹34,999 or 15% ad spend",
          rawUSDText: "$999 or 15% ad spend"
        },
        billing: "monthly"
      }
    ]
  },
  {
    id: "social-media-management",
    title: "2C. Social Media Management (SMM)",
    description: "Consistent branding, high-converting social content, reels, and community growth.",
    columns: ["Package", "What's Included", "Price", "Billing"],
    rows: [
      {
        slug: "smm-starter",
        name: "SMM Starter",
        details: "1 platform, 12 posts/mo (custom designs + captions), hashtag research",
        price: { inr: 7999, usd: 249, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "smm-growth",
        name: "SMM Growth",
        details: "2 platforms, 20 posts + 4 reels, post scheduling, comment & inbox management",
        price: { inr: 14999, usd: 449, type: 'monthly' },
        billing: "monthly",
        popular: true
      },
      {
        slug: "smm-premium",
        name: "SMM Premium",
        details: "3 platforms, 30 posts + 8 reels, stories, active community management, monthly analytics report",
        price: { inr: 27999, usd: 849, type: 'monthly' },
        billing: "monthly"
      }
    ]
  },
  {
    id: "extra-marketing-services",
    title: "2D. Extra Marketing Services",
    description: "A la carte marketing add-ons, content creation, and analytics dashboards.",
    columns: ["Service", "Price", "Billing"],
    rows: [
      {
        slug: "email-campaign-setup",
        name: "Email marketing campaign setup",
        details: "Mailchimp or Klaviyo account configuration & template design",
        price: { inr: 9999, usd: 249, type: 'one-time' },
        billing: "one-time"
      },
      {
        slug: "email-newsletter",
        name: "Email newsletter",
        details: "Design, copywriting, and broadcast for 1 email campaign",
        price: { inr: 2999, usd: 79, type: 'per-unit', unit: 'per campaign' },
        billing: "per campaign"
      },
      {
        slug: "reel-editing",
        name: "Short video / Reel editing",
        details: "Engaging short-form video editing with captions & graphics",
        price: { inr: 1499, usd: 39, type: 'per-unit', unit: 'per video' },
        billing: "per video"
      },
      {
        slug: "blog-writing",
        name: "Blog writing (1,000 words)",
        details: "1,000-word SEO-optimized blog article written by industry experts",
        price: { inr: 1499, usd: 39, type: 'per-unit', unit: 'per blog' },
        billing: "per blog"
      },
      {
        slug: "influencer-outreach",
        name: "Influencer outreach & coordination",
        details: "Niche influencer identification, outreach, & campaign management",
        price: { inr: 9999, usd: 249, type: 'monthly' },
        billing: "monthly"
      },
      {
        slug: "looker-studio-dashboard",
        name: "Monthly analytics dashboard",
        details: "Custom Google Looker Studio dashboard connecting GA4, GTM, Ads, & Search Console",
        price: { inr: 5999, usd: 149, type: 'one-time' },
        billing: "one-time"
      }
    ]
  }
];

// ===================================================
// TAB 3: AUTOMATION SECTIONS (Setup + Monthly Fee Columns)
// ===================================================

export const automationSections: PricingSection[] = [
  {
    id: "whatsapp-chatbot",
    title: "3A. WhatsApp Chatbot (24x7 Live)",
    description: "Automated WhatsApp AI conversation workflows for 24/7 lead qualification, booking, & customer support.",
    note: "WhatsApp Business API / Meta conversation charges are paid directly by the client.",
    columns: ["Package", "What's Included", "Setup Fee", "Monthly Fee"],
    rows: [
      {
        slug: "basic-faq-bot",
        name: "Basic FAQ Bot",
        details: "Auto-replies, interactive menu flow, business hours responder, standard FAQs",
        setup: { inr: 14999, usd: 349, type: 'one-time' },
        monthly: { inr: 2999, usd: 79, type: 'monthly' }
      },
      {
        slug: "ai-lead-bot",
        name: "AI Lead Bot",
        details: "AI conversations, lead qualification, name/requirement/budget capture, database + email alert, booking link",
        setup: { inr: 34999, usd: 849, type: 'one-time' },
        monthly: { inr: 5999, usd: 149, type: 'monthly' },
        popular: true
      },
      {
        slug: "advanced-ai-bot",
        name: "Advanced AI Bot",
        details: "Everything in AI Lead Bot + appointment booking, payment links, multi-language, CRM sync, human handover",
        setup: { inr: 59999, usd: 1499, type: 'one-time' },
        monthly: { inr: 9999, usd: 249, type: 'monthly' }
      }
    ]
  },
  {
    id: "email-automation",
    title: "3B. Email Automation",
    description: "Smart email triage, automated lead follow-up drip campaigns, and AI inbox responders.",
    columns: ["Package", "What's Included", "Setup Fee", "Monthly Fee"],
    rows: [
      {
        slug: "auto-email-responder",
        name: "Auto Email Responder",
        details: "Instant auto-replies, branded HTML templates, incoming email auto-labeling",
        setup: { inr: 7999, usd: 199, type: 'one-time' },
        monthly: { inr: 1999, usd: 49, type: 'monthly' }
      },
      {
        slug: "ai-email-responder",
        name: "AI Email Responder",
        details: "Smart AI replies, simple queries auto-replied, complex queries routed for human approval, inbox tagging",
        setup: { inr: 19999, usd: 499, type: 'one-time' },
        monthly: { inr: 3999, usd: 99, type: 'monthly' },
        popular: true
      },
      {
        slug: "email-followup-sequences",
        name: "Email Follow-up Sequences",
        details: "Automated multi-step drip follow-ups to convert cold leads into booked meetings",
        setup: { inr: 9999, usd: 249, type: 'one-time' },
        monthly: { inr: 1999, usd: 49, type: 'monthly' }
      }
    ]
  },
  {
    id: "lead-collection-crm",
    title: "3C. Lead Collection & CRM Integration",
    description: "Seamless lead capturing from web forms, Meta ads, & WhatsApp straight into your CRM or Google Sheets.",
    columns: ["Package", "What's Included", "Setup Fee", "Monthly Fee"],
    rows: [
      {
        slug: "lead-capture-basic",
        name: "Lead Capture Basic",
        details: "Leads captured from website/forms/WhatsApp into Google Sheet + instant email alert",
        setup: { inr: 9999, usd: 249, type: 'one-time' },
        monthly: { inr: 1499, usd: 39, type: 'monthly' }
      },
      {
        slug: "lead-capture-crm-sync",
        name: "Lead Capture + CRM Sync",
        details: "HubSpot / Zoho / Notion sync, lead tagging, automated sales rep assignment",
        setup: { inr: 24999, usd: 599, type: 'one-time' },
        monthly: { inr: 3999, usd: 99, type: 'monthly' },
        popular: true
      },
      {
        slug: "lead-scoring-pipeline",
        name: "Lead Scoring Pipeline",
        details: "AI lead scoring engine, hot/cold segmentation, automated follow-up triggers, sales team Slack alerts",
        setup: { inr: 39999, usd: 949, type: 'one-time' },
        monthly: { inr: 5999, usd: 149, type: 'monthly' }
      }
    ]
  },
  {
    id: "more-automations",
    title: "3D. Additional Workflow Automations",
    description: "Document OCR parsing, payment reminder triggers, report generators, and custom n8n workflows.",
    columns: ["Automation", "What It Does", "Setup Fee", "Monthly Fee"],
    rows: [
      {
        slug: "invoice-automation",
        name: "Invoice Automation",
        details: "Automated PDF invoice generation + email dispatch + overdue payment reminders",
        setup: { inr: 14999, usd: 349, type: 'one-time' },
        monthly: { inr: 2499, usd: 59, type: 'monthly' }
      },
      {
        slug: "data-entry-ocr",
        name: "Data Entry / Document OCR",
        details: "Extract key fields from PDF invoices/receipts using AI OCR & insert directly into database/Sheets",
        setup: { inr: 19999, usd: 499, type: 'one-time' },
        monthly: { inr: 3499, usd: 89, type: 'monthly' }
      },
      {
        slug: "appointment-booking-auto",
        name: "Appointment Booking Automation",
        details: "Google Calendar sync, automated WhatsApp/Email reminders, self-service rescheduling flow",
        setup: { inr: 12999, usd: 299, type: 'one-time' },
        monthly: { inr: 1999, usd: 49, type: 'monthly' }
      },
      {
        slug: "payment-reminder-auto",
        name: "Payment Reminder Automation",
        details: "Scheduled payment due reminders with embedded UPI, Razorpay, or Stripe payment links",
        setup: { inr: 9999, usd: 249, type: 'one-time' },
        monthly: { inr: 1499, usd: 39, type: 'monthly' }
      },
      {
        slug: "review-collection-auto",
        name: "Review Collection Automation",
        details: "Automatically trigger Google Business review requests to happy customers via WhatsApp",
        setup: { inr: 7999, usd: 199, type: 'one-time' },
        monthly: { inr: 1499, usd: 39, type: 'monthly' }
      },
      {
        slug: "social-media-autopost",
        name: "Social Media Auto-Posting",
        details: "Multi-platform automated posting pipeline driven by a master Notion / Google Sheet calendar",
        setup: { inr: 9999, usd: 249, type: 'one-time' },
        monthly: { inr: 1999, usd: 49, type: 'monthly' }
      },
      {
        slug: "abandoned-cart-recovery",
        name: "Abandoned Cart Recovery",
        details: "Automatically win back dropped checkout carts via personalized WhatsApp & email messages",
        setup: { inr: 14999, usd: 349, type: 'one-time' },
        monthly: { inr: 2499, usd: 59, type: 'monthly' }
      },
      {
        slug: "reports-automation",
        name: "Daily/Weekly Report Automation",
        details: "Auto-compiled executive summary reports (sales, leads, ad performance) delivered via Email/Slack",
        setup: { inr: 9999, usd: 249, type: 'one-time' },
        monthly: { inr: 1499, usd: 39, type: 'monthly' }
      },
      {
        slug: "custom-n8n-workflow",
        name: "Custom n8n Workflow",
        details: "Bespoke multi-node business process automation built to your precise technical requirements",
        setup: { 
          inr: null, 
          usd: null, 
          type: 'hourly',
          rawINRText: "₹2,500/hr or custom quote",
          rawUSDText: "$60/hr or custom quote"
        },
        monthly: { 
          inr: null, 
          usd: null, 
          rawINRText: "Quoted separately",
          rawUSDText: "Quoted separately"
        },
        quoteOnly: true
      }
    ]
  }
];

// ===================================================
// BUNDLE PACKS
// ===================================================

export const bundlePacks: BundleRow[] = [
  {
    slug: "launch-pack",
    name: "Launch Pack",
    details: "Landing Page Pro + Basic FAQ Bot + Lead Capture Basic",
    setup: { inr: 34999, usd: 849, type: 'one-time' },
    monthly: { inr: 4499, usd: 119, type: 'monthly' }
  },
  {
    slug: "growth-pack",
    name: "Growth Pack",
    details: "Business Website + SEO Growth (3 months) + AI Lead Bot",
    setup: { inr: 89999, usd: 2199, type: 'one-time' },
    monthly: { inr: 30999, usd: 799, type: 'monthly' },
    popular: true
  },
  {
    slug: "scale-pack",
    name: "Scale Pack",
    details: "Dynamic Website + Google/Meta Combo Ads + Social Premium + Advanced AI Bot + CRM Sync",
    setup: { inr: 199999, usd: 4799, type: 'one-time' },
    monthly: { inr: 65000, usd: 1699, type: 'monthly' }
  }
];

// ===================================================
// TERMS AND NOTES
// ===================================================

export const termsAndNotes: TermRow[] = [
  {
    point: "Payment terms",
    detail: "Website & initial automation setup: 50% advance upon contract signing, 50% on final delivery. Monthly retainer services are paid in advance on the 1st of each billing cycle."
  },
  {
    point: "GST",
    detail: "18% GST applicable extra on all domestic INR invoices as per Indian Government regulations."
  },
  {
    point: "Third-party costs",
    detail: "Domain registration, hosting servers, WhatsApp API Meta conversation fees, ad spend, and third-party SaaS tool subscriptions (e.g. OpenAI tokens, Twilio) are paid directly by the client."
  },
  {
    point: "Revisions",
    detail: "All website and custom workflow deployments include 2 full rounds of free revisions. Additional revision requests are billed at ₹1,500/hr ($40/hr)."
  },
  {
    point: "Minimum contract",
    detail: "SEO and Paid Ads management services require a 3-month minimum commitment for optimal algorithm learning and ROI compounding."
  },
  {
    point: "Refund policy",
    detail: "Initial advance payments are non-refundable once engineering or design work has commenced."
  },
  {
    point: "International clients",
    detail: "Email info@neuralautomate.dev for custom wire transfer / international invoicing arrangements (Razorpay checkout is currently India-only)."
  },
  {
    point: "Custom quote",
    detail: "For complex multi-system enterprise integrations that exceed standard package parameters, use the 'Get Custom Quote' button to speak directly with an automation architect."
  }
];

// ===================================================
// FREQUENTLY ASKED QUESTIONS (FAQ)
// ===================================================

export const pricingFaqs: FaqItem[] = [
  {
    question: "Which currency can I pay in?",
    answer: "You can pay in INR (for Indian clients via Razorpay/UPI/NEFT) or USD (for international clients via wire transfer/custom checkout link)."
  },
  {
    question: "What is included in the Setup Fee vs Monthly Fee for automations?",
    answer: "The Setup Fee covers custom n8n workflow engineering, API authentication, webhook mapping, and thorough testing. The Monthly Fee covers server hosting, node maintenance, continuous monitoring, and error-handling SLA support."
  },
  {
    question: "Do we own the website code and n8n workflow source files?",
    answer: "Yes, 100%! Upon final payment, you receive full ownership of your Next.js source code, clean GitHub repository access, and JSON export files for all n8n workflows."
  },
  {
    question: "Are ad spend or WhatsApp API Meta charges included in the plans?",
    answer: "No. Third-party operational expenses like Google/Meta ad spend and Meta WhatsApp API conversation charges are paid directly by you to the respective providers."
  },
  {
    question: "Can we bundle Website Development with Marketing or Automation?",
    answer: "Absolutely! Our Bundle Packs (Launch, Growth, Scale) combine development, marketing, and automation at a discounted 10-15% package rate."
  },
  {
    question: "How long does it take to deploy a project?",
    answer: "Landing pages and basic bots launch within 3-7 business days. Full business websites and multi-node automation systems launch within 10-14 business days."
  },
  {
    question: "What if our business requires a custom workflow not listed in the pricing table?",
    answer: "We engineer custom n8n pipelines for any SaaS API or internal legacy database. Click 'Get Custom Quote' or book a free 15-minute consultation to get an exact scope estimate."
  }
];
