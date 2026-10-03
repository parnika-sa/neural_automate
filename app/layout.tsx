import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SeoAeoGeoSchema from "@/components/SeoAeoGeoSchema";
import RootLayoutShell from "@/components/RootLayoutShell";

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
        {/* Preconnect links for image assets only. GTM links consent ke baad dynamic load honge */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <SeoAeoGeoSchema />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased relative">
        <RootLayoutShell>
          {children}
        </RootLayoutShell>
      </body>
    </html>
  );
}


