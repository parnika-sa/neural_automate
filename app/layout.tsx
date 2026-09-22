import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeoAeoGeoSchema from "@/components/SeoAeoGeoSchema";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuralAutomate.dev | AI Workflow Automations & Business Systems",
  description: "Autonomous AI process automations, n8n webhook pipelines, WhatsApp chatbots, CRM auto-sync, & document OCR parsing.",
  keywords: [
    "NeuralAutomate",
    "AI Automation Agency",
    "n8n Workflows",
    "WhatsApp AI Bot",
    "CRM Auto Sync",
    "Invoice Automation",
    "Document Parsing AI"
  ],
  authors: [{ name: "NeuralAutomate.dev Team" }],
  creator: "NeuralAutomate.dev",
  metadataBase: new URL("https://neuralautomate.dev"),
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "NeuralAutomate.dev | AI Automation Agency",
    description: "Automate repetitive business tasks with custom n8n workflows and AI agents.",
    url: "https://neuralautomate.dev",
    siteName: "NeuralAutomate.dev",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NeuralAutomate.dev - Automate Once. Scale Forever",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralAutomate.dev | AI Automation Agency",
    description: "Automate repetitive business tasks with custom n8n workflows and AI agents.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <SeoAeoGeoSchema />
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THXKVTLJ');`,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-THXKVTLJ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />
        <main className="flex-grow z-10">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
