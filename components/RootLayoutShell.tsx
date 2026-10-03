'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import PageTransition from "@/components/PageTransition";

// Shell wrapper jo print routes (/pricing/print) par Navbar, Footer aur Cookie consent ko hide karta hai
export default function RootLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPrintRoute = pathname?.startsWith('/pricing/print');

  if (isPrintRoute) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow z-10">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
