// Consent Utility module for cookie consent management & dynamic GTM loading

export interface ConsentPreferences {
  necessary: true; // Necessary cookies system functions ke liye har waqt active rehti hain
  analytics: boolean; // Analytics cookies (GA4, GTM telemetry)
  marketing: boolean; // Marketing & ad retargeting cookies
  timestamp: string; // Jab user ne consent choose kiya tha
}

const COOKIE_CONSENT_KEY = "cookie_consent";

// Global dataLayer window interface declaration TypeScript build error se bachne ke liye
declare global {
  interface Window {
    dataLayer: any[];
  }
}

/**
 * LocalStorage se saved cookie consent retrieve karne ke liye helper function
 * (SSR Safe: Check karta hai ki window present hai ya nahi)
 */
export function getConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawData = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!rawData) return null;
    
    const parsed = JSON.parse(rawData);
    if (typeof parsed === "object" && parsed !== null && parsed.necessary === true) {
      return parsed as ConsentPreferences;
    }
  } catch (error) {
    console.error("[Cookie Consent] Error reading consent from localStorage:", error);
  }

  return null;
}

/**
 * User dwara saved consent check karne ke liye helper (returns boolean)
 */
export function hasConsent(): boolean {
  return getConsent() !== null;
}

/**
 * User ke cookie consent selection ko localStorage mein save karta hai aur GTM push & script load handle karta hai
 */
export function saveConsent(prefs: { analytics: boolean; marketing: boolean }): ConsentPreferences {
  const consentObj: ConsentPreferences = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      // LocalStorage mein save kar rahe hain
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentObj));

      // DataLayer update push kar rahe hain taaki GTM internal triggers fire ho sakein
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        analytics_consent: prefs.analytics,
        marketing_consent: prefs.marketing,
      });

      // Agar analytics ya marketing true hai toh GTM load/fire karo
      if (prefs.analytics || prefs.marketing) {
        loadGTM();
      }
    } catch (error) {
      console.error("[Cookie Consent] Error saving consent to localStorage:", error);
    }
  }

  return consentObj;
}

/**
 * Google Tag Manager (GTM) script ko dynamically load karta hai agar consent diya gaya ho
 */
export function loadGTM(): void {
  if (typeof window === "undefined") return;

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-THXKVTLJ";

  // Agar GTM ID absent ya empty placeholder string ho toh return kar jao
  if (!gtmId || gtmId === "GTM-XXXXXXX") {
    console.log("[Cookie Consent] GTM ID configured nahi hai, GTM script skip kar rahe hain.");
    return;
  }

  // Check double loading: Agar gtm-script pehle se DOM mein exists karta hai toh double inject na karo
  if (document.getElementById("gtm-script")) {
    return;
  }

  // DataLayer initialize aur GTM script creation
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

/**
 * Cookie consent preferences delete / clear karne ke liye utility
 */
export function clearConsent(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  }
}
