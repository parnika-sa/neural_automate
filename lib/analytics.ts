import { getConsent } from "@/lib/consent";

/**
 * Analytics tracking helper function
 * Window dataLayer mein event push karta hai, lekin sirf tab jab user ne analytics consent diya ho.
 */
export function trackEvent(eventName: string, eventData: Record<string, any> = {}) {
  // SSR Safety check
  if (typeof window === "undefined") {
    return;
  }

  // Saved consent verify karte hain: Sirf tab push karo jab user ne analytics cookies accept ki hon
  const consent = getConsent();
  if (!consent || !consent.analytics) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[ANALYTICS BLOCKED]: User analytics consent absent for event "${eventName}"`);
    }
    return;
  }

  // DataLayer array ready kar ke event push kar rahe hain
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...eventData,
  });

  // Development mode only console log
  if (process.env.NODE_ENV !== "production") {
    console.log(`[ANALYTICS EVENT PUSHED]: ${eventName}`, eventData);
  }
}
