import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Shield, IndianRupee, QrCode, 
  ArrowRight, CheckCircle2, Clock, Smartphone, Heart, AlertCircle 
} from 'lucide-react';
import { submitPurchaseRequest } from '../services/purchaseService';

export function CustomPurchaseModal({ isOpen, onClose, user, onPurchaseSubmitted }) {
  const [selectedPlan, setSelectedPlan] = useState('vip'); // 'normal' | 'vip' | 'vvip'
  const [customAmount, setCustomAmount] = useState(299);
  const [paymentMethod, setPaymentMethod] = useState('UPI / QR Code');
  const [referenceNote, setReferenceNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  const PLANS = [
    {
      id: 'normal',
      dimension: 1,
      name: 'Dimension 1: Normal Plan',
      badge: 'Academic Foundation',
      color: 'from-amber-600 to-amber-700',
      features: ['All 70+ DAV Textbooks LKG–Class 8', 'Daily Homework Hub & Attendance', 'Audio Textbook Pronunciation', 'Overview Dashboard Access']
    },
    {
      id: 'vip',
      dimension: 2,
      name: 'Dimension 2: VIP Plan',
      badge: 'Most Popular',
      popular: true,
      color: 'from-red-600 via-rose-600 to-amber-600',
      features: ['Everything in Normal Plan', 'Complete Chapter Q&A Solutions', '5-Mark Board Exam Model Answers', 'Faculty Interaction Desk']
    },
    {
      id: 'vvip',
      dimension: 3,
      name: 'Dimension 3: VVIP Plan',
      badge: 'Ultimate Scholar',
      color: 'from-purple-600 via-indigo-600 to-amber-500',
      features: ['Everything in VIP Plan', 'Unlimited 24/7 Rishi AI Companion', 'Full CBT Online Exam Simulator', 'All 11 Dimensions 100% Unlocked']
    }
  ];

  const QUICK_AMOUNTS = [
    { label: '₹0 (Trial / Free Request)', value: 0 },
    { label: '₹15', value: 15 },
    { label: '₹99', value: 99 },
    { label: '₹299', value: 299 },
    { label: '₹499', value: 499 },
    { label: '₹999', value: 999 },
    { label: '₹5,000', value: 5000 },
    { label: '₹25,000', value: 25000 },
    { label: '₹1,00,000 (Max)', value: 100000 }
  ];

  const handleAmountChange = (val) => {
    const num = Math.min(100000, Math.max(0, Number(val) || 0));
    setCustomAmount(num);
  };

  const handleVerifyPurchaseSubmit = (e) => {
    e.preventDefault();

    const planObj = PLANS.find(p => p.id === selectedPlan) || PLANS[1];

    const studentId = user?.studentId || user?.id || `DAV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentName = user?.name || user?.fullName || 'DAV Student';
    const studentEmail = user?.email || user?.googleEmail || 'student@gmail.com';
    const studentPhoto = user?.photoUrl || user?.avatar || user?.dp || null;

    const purchase = submitPurchaseRequest({
      studentId,
      studentName,
      studentEmail,
      studentPhoto,
      plan: selectedPlan,
      planName: planObj.name,
      amount: customAmount,
      paymentMethod,
      referenceNote
    });

    setSubmittedData(purchase);
    setIsSubmitted(true);
    if (onPurchaseSubmitted) onPurchaseSubmitted(purchase);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn select-none overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 my-auto">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-950 via-slate-900 to-amber-950 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Subscription &amp; Course Purchase Gateway</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isSubmitted ? 'Purchase Request Sent' : 'Select Subscription & Custom Amount'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Pay any custom amount from ₹0 to ₹1,00,000 • Verified by Administrator Rishit Shankar
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {!isSubmitted ? (
            <form onSubmit={handleVerifyPurchaseSubmit} className="space-y-6">
              
              {/* Step 1: Choose Subscription Tier */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  1. Choose Your Subscription Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`rounded-2xl border-2 p-3.5 cursor-pointer transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/40 shadow-md ring-2 ring-amber-400/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[9px] font-black uppercase tracking-wider shadow-xs">
                            Recommended
                          </span>
                        )}
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {plan.badge}
                          </span>
                          <h4 className="font-extrabold text-slate-900 text-sm mt-2">
                            {plan.name.replace('Dimension ', 'Dim ')}
                          </h4>
                          <ul className="mt-2.5 space-y-1.5 text-[11px] text-slate-600">
                            {plan.features.slice(0, 3).map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-2">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                          <span className={isSelected ? 'text-amber-800' : 'text-slate-500'}>
                            {isSelected ? '✓ Selected' : 'Select'}
                          </span>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-amber-500 flex items-center justify-center">
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Custom Money Between ₹0 and ₹1,00,000 */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-slate-50 to-orange-50/50 border border-amber-200 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-amber-700" />
                      <span>2. Custom Amount to Pay (₹0 to ₹1,00,000)</span>
                    </label>
                    <p className="text-[11px] text-amber-800/80">
                      Not fixed! You can contribute any amount you choose from ₹0 to ₹1,00,000.
                    </p>
                  </div>
                  
                  {/* Big Number Input */}
                  <div className="flex items-center gap-1.5 bg-white border-2 border-amber-400 rounded-xl px-3 py-1.5 shadow-xs">
                    <span className="font-black text-amber-800 text-lg">₹</span>
                    <input
                      type="number"
                      min="0"
                      max="100000"
                      value={customAmount}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="w-28 font-black text-lg text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="10"
                    value={customAmount}
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>₹0 (Free / Request)</span>
                    <span>₹25,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000 (1 Lakh Cap)</span>
                  </div>
                </div>

                {/* Quick Selection Chips */}
                <div>
                  <span className="text-[10px] font-bold text-slate-600 block mb-1.5">
                    Quick Select Amount:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_AMOUNTS.map((q) => (
                      <button
                        key={q.value}
                        type="button"
                        onClick={() => setCustomAmount(q.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                          customAmount === q.value
                            ? 'bg-amber-500 text-stone-950 border-amber-600 shadow-xs'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method & QR Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                
                {/* QR Code Container */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <div className="w-36 h-36 bg-white border border-slate-300 rounded-xl p-2 mx-auto flex items-center justify-center shadow-xs">
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
                      <rect x="45" y="35" width="10" height="30" fill="#d97706" />
                      <rect x="65" y="65" width="15" height="15" fill="#1e293b" />
                      <rect x="75" y="45" width="15" height="12" fill="#1e293b" />
                    </svg>
                  </div>
                  <div className="text-xs font-mono font-black text-amber-900 mt-2">
                    UPI: 9470033984@ptyes
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Paytm • PhonePe • Google Pay • BHIM
                  </div>
                </div>

                {/* Payment Method Selector & Reference */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                    >
                      <option value="UPI / QR Code">UPI / QR Code (Google Pay, PhonePe, Paytm)</option>
                      <option value="Paytm Wallet">Paytm Wallet</option>
                      <option value="Debit / Credit Card">Debit / Credit Card</option>
                      <option value="Cash at School Desk">Cash at DAV School Desk</option>
                      <option value="Direct Admin Request">Direct Administrator Request (Zero Fee)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Transaction Ref / UTR / Remarks (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. UTR 42918820192 or Paid via Paytm"
                      value={referenceNote}
                      onChange={(e) => setReferenceNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-900 flex items-start gap-2">
                    <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>
                      Account: <strong>{user?.name || 'Logged-in Student'}</strong> ({user?.studentId || user?.id || 'DAV-STUDENT'})
                    </span>
                  </div>
                </div>

              </div>

              {/* Submit Button: Verify Purchase */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5 text-stone-950" />
                <span>Verify Purchase (Submit to Admin) • ₹{customAmount.toLocaleString('en-IN')}</span>
              </button>

            </form>
          ) : (
            /* =========================================================
               SUBMISSION SUCCESS & ADMIN NOTIFICATION VIEW
               ========================================================= */
            <div className="py-6 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black">
                  Request ID: {submittedData?.id}
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-2">
                  Purchase Submitted for Verification!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your request to activate <strong className="text-slate-900">{submittedData?.planName}</strong> for <strong className="text-amber-700">₹{submittedData?.amount?.toLocaleString('en-IN')}</strong> has been submitted to the Admin's Program.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>Next Step: Verification in Section 12 Admin's Program</span>
                </div>
                <p className="text-amber-900 text-[11px] leading-relaxed">
                  Administrator Rishit Shankar will verify your purchase in Section 12 subsection 3 ("Verify Purchases"). Once verified, your initial trial restrictions will instantly end and your full subscription will be activated automatically!
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Got It, Return to Portal
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
