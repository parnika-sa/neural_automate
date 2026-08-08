// Placeholder Analytics Tracker (GA4 / PostHog Ready)

export function trackEvent(eventName: string, eventData: Record<string, any> = {}) {
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData,
  };

  if (typeof window !== 'undefined') {
    // Client-side tracking placeholder
    console.log(`[ANALYTICS EVENT]: ${eventName}`, payload);
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, eventData);
    }
  } else {
    // Server-side logging placeholder
    console.log(`[SERVER ANALYTICS]: ${eventName}`, payload);
  }
}
