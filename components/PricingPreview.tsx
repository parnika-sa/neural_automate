'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import PricingCard from './PricingCard';
import { ShieldCheck, CheckCircle2, AlertCircle, Zap, Lock, X, Activity, User, Mail, Phone, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function PricingPreview() {
  const searchParams = useSearchParams();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Customer Details Checkout Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [targetPlan, setTargetPlan] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

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

  const handlePlanSelect = (planName: string) => {
    setNotification(null);
    setTargetPlan(planName);
    setModalOpen(true);
  };

  const startRazorpayCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPlan || !customerDetails.email || !customerDetails.name) return;

    setModalOpen(false);
    setLoadingPlan(targetPlan);

    trackEvent('pricing_cta_clicked', { planName: targetPlan, gateway: 'razorpay' });

    try {
      const res = await fetch('/api/checkout/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planName: targetPlan }),
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
          description: `${targetPlan} Plan Subscription`,
          order_id: data.orderId,
          handler: async function (response: any) {
            setLoadingPlan(targetPlan);
            const verifyRes = await fetch('/api/checkout/razorpay/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                planName: targetPlan,
                customerEmail: customerDetails.email.trim(),
                customerName: customerDetails.name.trim(),
                customerPhone: customerDetails.phone.trim(),
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setNotification({
                type: 'success',
                message: `🎉 Razorpay Payment Verified! Welcome email dispatched to ${customerDetails.email}.`,
              });
              trackEvent('payment_completed', { gateway: 'razorpay', planName: targetPlan, paymentId: response.razorpay_payment_id });
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
            name: customerDetails.name,
            email: customerDetails.email,
            contact: customerDetails.phone || '',
          },
          theme: { color: '#040705' },
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
              onCheckout={handlePlanSelect}
              loadingPlan={loadingPlan}
            />
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>All plans include full NDA protection, zero lock-in contract, & 30-day warranty.</span>
        </div>

      </div>

      {/* Modern Customer Checkout Details Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="tech-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 bg-[#07120a] max-w-md w-full relative space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-tech-border pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <h3 className="text-xl font-display font-extrabold text-white">
                Enter Details for <span className="text-emerald-400">{targetPlan}</span>
              </h3>
              <p className="text-xs text-slate-400">
                Please enter your email to receive invoice receipts & n8n setup instructions.
              </p>
            </div>

            <form onSubmit={startRazorpayCheckout} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1">
                  YOUR FULL NAME *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerDetails.name}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1">
                  YOUR WORK / PERSONAL EMAIL *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com or company.com"
                    value={customerDetails.email}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-slate-300 mb-1">
                  WHATSAPP / PHONE NUMBER <span className="text-slate-500">(OPTIONAL)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={customerDetails.phone}
                    onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#040705] border border-tech-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-mint-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Proceed to Razorpay Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </section>
  );
}
