import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
  openGraph: {
    title: "NeuralAutomate.dev | AI Automation Agency",
    description: "Automate repetitive business tasks with custom n8n workflows and AI agents.",
    url: "https://neuralautomate.dev",
    siteName: "NeuralAutomate.dev",
    locale: "en_US",
    type: "website",
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
        <SeoAeoGeoSchema />
      </head>
      <body className="bg-background text-foreground min-h-screen flex flex-col font-sans antialiased relative">
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
