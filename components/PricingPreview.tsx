'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import PricingCard from './PricingCard';
import { ShieldCheck, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function PricingPreview() {
  const searchParams = useSearchParams();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    const plan = searchParams.get('plan');

    if (paymentStatus === 'success') {
      setNotification({
        type: 'success',
        message: `🎉 Payment Successful for ${plan || 'Automation Tier'}! Welcome email dispatched from info@neuralautomate.dev.`,
      });
    } else if (paymentStatus === 'cancelled') {
      setNotification({
        type: 'error',
        message: 'Payment was cancelled. You can retry checkout anytime or contact our support team.',
      });
    }
  }, [searchParams]);

  const handleCheckout = async (planName: string) => {
    setLoadingPlan(planName);
    setNotification(null);

    trackEvent('pricing_cta_clicked', { planName, gateway: 'razorpay' });

    try {
      const res = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName }),
      });

      const data = await res.json();
      if (!res.ok || !data.orderId) {
        throw new Error(data.error || 'Failed to initialize Razorpay checkout');
      }

      if (typeof (window as any).Razorpay !== 'undefined') {
        const options = {
          key: data.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_TNDkm8zEcs3gwF',
          amount: data.amount,
          currency: data.currency,
          name: 'NeuralAutomate.dev',
          description: `${planName} Subscription`,
          order_id: data.orderId,
          handler: async function (response: any) {
            setLoadingPlan(planName);
            const verifyRes = await fetch('/api/checkout/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                planName,
                customerEmail: 'client@company.dev',
                customerName: 'Valued Client',
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setNotification({
                type: 'success',
                message: `🎉 Razorpay Payment Verified! Welcome email dispatched from info@neuralautomate.dev.`,
              });
              trackEvent('payment_completed', { gateway: 'razorpay', planName, paymentId: response.razorpay_payment_id });
            } else {
              setNotification({ type: 'error', message: verifyData.error || 'Razorpay payment verification failed.' });
            }
            setLoadingPlan(null);
          },
          modal: {
            ondismiss: function () {
              setLoadingPlan(null);
            },
          },
          prefill: {
            name: 'Ankit Sharma',
            email: 'info@neuralautomate.dev',
            contact: '+919999999999',
          },
          theme: { color: '#10b981' },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay SDK failed to load. Please refresh the page.');
      }
    } catch (err: any) {
      setNotification({ type: 'error', message: err.message || 'Razorpay checkout error.' });
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      name: "Starter Workflow",
      priceINR: "₹1",
      period: "/test payment",
      description: "Ideal for small teams automating 1-2 core lead qualification pipelines.",
      features: [
        "Up to 2 Custom n8n Workflows",
        "24/7 AI Lead Qualifier Agent",
        "Instant HubSpot / CRM Auto-Sync",
        "Email & WhatsApp Webhooks",
        "Standard SLA (48hr Response)"
      ],
      ctaText: "Pay ₹1 Live Test"
    },
    {
      name: "Growth Automation",
      priceINR: "₹1,99,999",
      period: "/month",
      popular: true,
      description: "For scaling companies needing complete business process automation.",
      features: [
        "Up to 6 Custom n8n Workflows",
        "Multiple Autonomous AI Agents",
        "Invoice & Billing Auto-Sync",
        "PDF Document Parsing AI",
        "Priority Support & 24hr SLA",
        "Dedicated n8n Server Setup"
      ],
      ctaText: "Get Started Now"
    },
    {
      name: "Custom Enterprise",
      priceINR: "Custom",
      period: "/quote",
      description: "Tailored multi-node enterprise pipelines for high-volume data streams.",
      features: [
        "Unlimited n8n Workflows",
        "Custom Fine-Tuned LLM Models",
        "Dedicated VPC Infrastructure",
        "1-on-1 Engineer Slack Channel",
        "99.9% Uptime Guarantee SLA",
        "Full Source Code Handover"
      ],
      ctaText: "Contact Sales"
    }
  ];

  return (
    <section className="py-24 bg-[#070e09] border-y border-tech-border relative" id="pricing">
      {/* Razorpay Script Injection */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
            Transparent Investment Tiers
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Predictable Pricing for <span className="gradient-text-electric">Autonomous Growth</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Instant online enrollment powered securely by Razorpay.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Starter Tier Set to ₹1 for Live Test</span>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`max-w-3xl mx-auto mb-8 p-4 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span>{notification.message}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white text-xs">Dismiss</button>
          </div>
        )}

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((p, i) => (
            <PricingCard
              key={i}
              {...p}
              onCheckout={handleCheckout}
              loadingPlan={loadingPlan}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All plans include full NDA protection, zero lock-in contract, & 30-day warranty.</span>
        </div>

      </div>
    </section>
  );
}
