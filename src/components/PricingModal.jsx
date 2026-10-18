import React, { useState } from 'react';
import { PRICING_TIERS } from '../data/mockData';
import { Check, X, Shield, Sparkles, QrCode, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export function PricingModal({ isOpen, onClose, currentPlan, onUpgradePlan }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentStep, setPaymentStep] = useState('select'); // 'select' | 'pay' | 'success'
  const [upiId, setUpiId] = useState('davschool@upi');

  if (!isOpen) return null;

  const handleSelectPlan = (tier) => {
    if (tier.id === 'free') {
      onUpgradePlan('free');
      onClose();
      return;
    }
    setSelectedPlan(tier);
    setPaymentStep('pay');
  };

  const handleSimulatePayment = () => {
    setTimeout(() => {
      setPaymentStep('success');
      setTimeout(() => {
        onUpgradePlan(selectedPlan.id);
        setPaymentStep('select');
        setSelectedPlan(null);
        onClose();
      }, 1800);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              School Development & Student Access Plans
            </div>
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Choose Your DAV Learning Tier
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Micro-pricing designed for students: Free, ₹33, ₹66, and ₹99 full-feature access.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          
          {paymentStep === 'select' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRICING_TIERS.map((tier) => {
                const isCurrent = currentPlan === tier.id;
                return (
                  <div
                    key={tier.id}
                    className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                      tier.popular
                        ? 'border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/20 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                        Recommended
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tier.badgeColor}`}>
                          {tier.badge}
                        </span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-lg leading-snug">
                        {tier.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px]">
                        {tier.description}
                      </p>

                      <div className="mt-4 mb-4 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-slate-900">₹{tier.price}</span>
                          <span className="text-xs text-slate-500">/{tier.period}</span>
                        </div>
                      </div>

                      <ul className="space-y-2 text-xs text-slate-600 mb-6">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleSelectPlan(tier)}
                      disabled={isCurrent}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isCurrent
                          ? 'bg-slate-100 text-slate-400 cursor-default'
                          : tier.ctaClass
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Tier</span>
                        </>
                      ) : (
                        <span>{tier.cta}</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Payment Screen (UPI QR Simulator) */}
          {paymentStep === 'pay' && selectedPlan && (
            <div className="max-w-md mx-auto text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8" />
              </div>

              <h4 className="text-xl font-bold text-slate-900">
                Complete ₹{selectedPlan.price} Payment
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Upgrading to <span className="font-bold text-slate-800">{selectedPlan.name}</span>
              </p>

              {/* Mock QR Code Display */}
              <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 inline-block text-center">
                <div className="w-44 h-44 bg-white border border-slate-300 rounded-xl p-2 mx-auto flex flex-col items-center justify-center shadow-inner">
                  {/* SVG generated simulated QR */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="10" y="10" width="25" height="25" fill="#1e293b" />
                    <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                    <rect x="18" y="18" width="9" height="9" fill="#1e293b" />
                    <rect x="65" y="10" width="25" height="25" fill="#1e293b" />
                    <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                    <rect x="73" y="18" width="9" height="9" fill="#1e293b" />
                    <rect x="10" y="65" width="25" height="25" fill="#1e293b" />
                    <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                    <rect x="18" y="73" width="9" height="9" fill="#1e293b" />
                    <rect x="42" y="15" width="16" height="8" fill="#1e293b" />
                    <rect x="45" y="35" width="10" height="30" fill="#800000" />
                    <rect x="65" y="65" width="15" height="15" fill="#1e293b" />
                    <rect x="75" y="45" width="15" height="12" fill="#1e293b" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-bold text-slate-700 mt-2">
                  UPI: dav.school.headboy@okhdfcbank
                </div>
                <div className="text-[11px] text-slate-400">
                  Scan using Google Pay, PhonePe, Paytm, or BHIM
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setPaymentStep('select')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={handleSimulatePayment}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Simulate Instant UPI Success</span>
                </button>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {paymentStep === 'success' && (
            <div className="py-12 text-center animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-black text-slate-900">
                Payment Received & Activated!
              </h4>
              <p className="text-sm text-slate-600 mt-2">
                Your account is now upgraded to <span className="font-bold text-emerald-700">{selectedPlan?.name}</span>.
              </p>
              <div className="text-xs text-slate-400 mt-4">
                Enjoy full access to DAV books, notes, and unlimited Shankar AI!
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
