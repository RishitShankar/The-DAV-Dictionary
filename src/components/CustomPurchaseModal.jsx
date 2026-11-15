import React, { useEffect, useState } from 'react';
import { 
  X, Check, Sparkles, Shield, IndianRupee, QrCode, 
  ArrowRight, ArrowLeft, CheckCircle2, Clock, Smartphone, 
  Banknote, AlertCircle, User, Mail, GraduationCap, School
} from 'lucide-react';
import { submitPurchaseRequest, getPurchases } from '../services/purchaseService';

export function CustomPurchaseModal({isOpen, onClose, user, onPurchaseSubmitted }) {
  // Prevent background scroll and allow Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
 
  // Page Steps: 1 ('plan_amount') -> 2 ('profile_details') -> 3 ('payment_mode') -> 4 ('success')
  const [currentPage, setCurrentPage] = useState(1);

  // Page 1: Plan & Amount
  const [selectedPlan, setSelectedPlan] = useState('normal'); // 'normal' | 'vip' | 'vvip' | 'teacher'
  const [customAmount, setCustomAmount] = useState(299);

  // Page 2: Student Profile Details
  const [fullName, setFullName] = useState(user?.name || user?.fullName || '');
  const [classNum, setClassNum] = useState(user?.classNum || user?.class || '');
  const [section, setSection] = useState(user?.section || 'A');
  const [email, setEmail] = useState(user?.email || user?.googleEmail || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [admissionNo, setAdmissionNo] = useState(user?.admissionNumber || '');

  // Page 3: Payment Mode ('cash' | 'online')
  const [paymentMode, setPaymentMode] = useState('online'); // 'cash' | 'online'
  const [referenceNote, setReferenceNote] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  if (!isOpen) return null;

  // The 4 Plans across the 6 Dimensions:
  // Dimension 1 = Free (Current base)
  // Dimension 2 = Normal
  // Dimension 3 = VIP
  // Dimension 4 = VVIP
  // Dimension 5 = Developer
  // Dimension 6 = Teacher
  const PLANS = [
    {
      id: 'normal',
      dimension: 2,
      dimensionName: 'Dimension 2: Normal Plan',
      badge: 'Academic Foundation',
      popular: false,
      color: 'from-amber-600 to-amber-700',
      tagline: 'All textbooks & daily learning hub',
      features: [
        'Complete 70+ DAV Digital Textbooks (LKG–Class 8)',
        'Built-in PDF Reader with Multi-Color Highlighter',
        'Daily Homework & Attendance Tracking',
        'Interactive Self-Study Practice Quizzes'
      ]
    },
    {
      id: 'vip',
      dimension: 3,
      dimensionName: 'Dimension 3: VIP Plan',
      badge: 'Most Popular',
      popular: true,
      color: 'from-red-600 via-rose-600 to-amber-600',
      tagline: 'Full chapter solutions & board notes',
      features: [
        'Everything in Normal Plan',
        'Official Back-of-Chapter Question Answers',
        '10 Comprehensive 5-Mark Board Exam Model Answers',
        'High-Yield Revision Notes & Exam Summaries'
      ]
    },
    {
      id: 'vvip',
      dimension: 4,
      dimensionName: 'Dimension 4: VVIP Plan',
      badge: 'Ultimate Scholar',
      popular: false,
      color: 'from-purple-600 via-indigo-600 to-amber-500',
      tagline: 'Unlimited Rishi AI & CBT simulator',
      features: [
        'Everything in VIP Plan',
        'Unlimited 24/7 Rishi AI Intelligence Workspace',
        'Interactive Chapter Test Simulator (Up to 50 Questions)',
        'Double VIP Bound Protection'
      ]
    },
    {
      id: 'teacher',
      dimension: 6,
      dimensionName: 'Dimension 6: Teacher Plan',
      badge: 'Faculty OS',
      popular: false,
      color: 'from-emerald-600 via-teal-600 to-cyan-600',
      tagline: 'Exclusive Faculty & Explorer OS',
      features: [
        'Master Faculty OS with Teacher Class Rosters',
        'Subject Coordinator Tools & Notice Broadcast',
        'Full Student Submissions & Doubts Desk',
        'Dual Mode: Faculty OS & Full Campus Explorer'
      ]
    }
  ];

  const QUICK_AMOUNTS = [
    { label: '₹0 (Free / Trial)', value: 0 },
    { label: '₹15 (Micro Support)', value: 15 },
    { label: '₹99 (Normal Access)', value: 99 },
    { label: '₹299 (VIP Standard)', value: 299 },
    { label: '₹499 (VVIP Scholar)', value: 499 },
    { label: '₹999 (Faculty / Patron)', value: 999 },
    { label: '₹5,000 (Major Sponsor)', value: 5000 },
    { label: '₹1,00,000 (Maximum)', value: 100000 }
  ];

  const handleAmountChange = (val) => {
    const num = Math.min(100000, Math.max(0, Number(val) || 0));
    setCustomAmount(num);
  };

  const handleGoToPage2 = () => {
    setErrorMessage('');
    setCurrentPage(2);
  };

  const handleGoToPage3 = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name for the student profile.');
      return;
    }
    setErrorMessage('');
    setCurrentPage(3);
  };

  // Final Step 3 Submit
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const selectedPlanObj = PLANS.find(p => p.id === selectedPlan) || PLANS[0];
    const studentId = user?.studentId || user?.id || `std_${Math.random().toString(36).substring(2, 9)}`;

    const profileDetails = {
      fullName: fullName.trim() || 'DAV Scholar',
      classNum,
      section,
      email: email.trim(),
      phone: phone.trim(),
      admissionNumber: admissionNo.trim()
    };

    const paymentMethodLabel = paymentMode === 'cash' 
      ? 'Cash (Direct to Head Boy Rishit Shankar)'
      : 'Online (Paytm QR / UPI)';

    const res = submitPurchaseRequest({
      studentId,
      studentName: profileDetails.fullName,
      studentEmail: profileDetails.email || 'student@gmail.com',
      studentPhoto: user?.photoUrl || user?.avatar || null,
      plan: selectedPlan,
      planName: selectedPlanObj.dimensionName,
      amount: customAmount,
      paymentMethod: paymentMethodLabel,
      referenceNote: referenceNote.trim(),
      profileDetails
    });

    setIsSubmitting(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Failed to submit request.');
      return;
    }

    setSubmittedData(res.purchase);
    try {
      window.dispatchEvent(new CustomEvent('dav_trigger_confetti', { detail: { count: 150 } }));
    } catch (e) {}
    setCurrentPage(4); // Success Page
    if (onPurchaseSubmitted) onPurchaseSubmitted(res.purchase);
  };

  const selectedPlanObj = PLANS.find(p => p.id === selectedPlan) || PLANS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn select-none font-sans overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 my-auto flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-950 via-slate-900 to-amber-950 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Subscription &amp; Dimension Upgrade Gateway</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {currentPage === 4 
                ? 'Request Sent to Administrator'
                : `Step ${currentPage} of 3: ${
                    currentPage === 1 ? 'Choose Plan & Custom Amount' :
                    currentPage === 2 ? 'Student Profile Information' :
                    'Payment Mode & Confirmation'
                  }`
              }
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Verified &amp; approved directly by Administrator Rishit Shankar (Head Boy)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        {currentPage < 4 && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold shrink-0">
            <div className={`flex items-center gap-1.5 ${currentPage === 1 ? 'text-amber-800 font-black' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentPage === 1 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>1</span>
              <span>1. Choose Plan</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${currentPage === 2 ? 'text-amber-800 font-black' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentPage === 2 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>2</span>
              <span>2. Profile Details</span>
            </div>
            <span className="text-slate-300">→</span>
            <div className={`flex items-center gap-1.5 ${currentPage === 3 ? 'text-amber-800 font-black' : 'text-slate-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentPage === 3 ? 'bg-amber-600 text-white' : 'bg-slate-300 text-slate-700'}`}>3</span>
              <span>3. Payment Mode</span>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          
          {/* =========================================================================
              PAGE 1: CHOOSE PLAN & CUSTOM MONEY AMOUNT
              ========================================================================= */}
          {currentPage === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2.5">
                  Select Target Dimension:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`rounded-2xl border-2 p-3.5 cursor-pointer transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-md ring-2 ring-amber-400/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[9px] font-black uppercase tracking-wider shadow-xs">
                            Recommended
                          </span>
                        )}
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                              {plan.badge}
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-700">
                              Dim {plan.dimension}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-sm mt-1.5">
                            {plan.dimensionName}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {plan.tagline}
                          </p>
                          <ul className="mt-2 space-y-1 text-[11px] text-slate-600">
                            {plan.features.slice(0, 2).map((f, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                          <span className={isSelected ? 'text-amber-800' : 'text-slate-500'}>
                            {isSelected ? '✓ Selected' : 'Choose'}
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

              {/* Custom Money (₹0 to ₹1,00,000) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-slate-50 to-orange-50/50 border border-amber-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                      <IndianRupee className="w-4 h-4 text-amber-700" />
                      <span>Custom Contribution (₹0 to ₹1,00,000)</span>
                    </label>
                    <p className="text-[11px] text-amber-800/80">
                      You decide the amount! Every rupee directly supports server and database costs.
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

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_AMOUNTS.map((amt) => (
                    <button
                      key={amt.value}
                      type="button"
                      onClick={() => setCustomAmount(amt.value)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                        customAmount === amt.value
                          ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                          : 'bg-white hover:bg-amber-100/60 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {amt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continue to Page 2 Button */}
              <button
                type="button"
                onClick={handleGoToPage2}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
              >
                <span>Continue to Profile Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* =========================================================================
              PAGE 2: STUDENT PROFILE DETAILS (Section 9 essentials)
              ========================================================================= */}
          {currentPage === 2 && (
            <form onSubmit={handleGoToPage3} onKeyDown={(e) => { if (e.key === "Enter" && e.target.tagName === "INPUT") e.preventDefault(); }} className="space-y-4 animate-fadeIn">
              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 font-medium">
                Please enter the student details for Section 9 (Student Profile Card) and verification records:
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Aarav Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class *</label>
                  <select
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    {['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section *</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    {['A', 'B', 'C', 'D'].map(s => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp / Phone Number
                  </label>
                  <div className="relative">
                    <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      placeholder="e.g., 94700 33984"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admission / Roll Number
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="e.g., ADM-8921"
                      value={admissionNo}
                      onChange={(e) => setAdmissionNo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Plans</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
                >
                  <span>Continue to Payment Mode</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              PAGE 3: PAYMENT MODE (ONLY TWO: Cash or Online) & Send Request
              ========================================================================= */}
          {currentPage === 3 && (
            <form onSubmit={handleFinalSubmit} onKeyDown={(e) => { if (e.key === "Enter" && e.target.tagName === "INPUT") e.preventDefault(); }} className="space-y-5 animate-fadeIn">
              
              {/* Summary of Plan & Amount */}
              <div className="p-3.5 rounded-2xl bg-stone-900 text-white flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-amber-400 uppercase font-black">Plan Selected:</span>
                  <div className="font-bold text-sm text-white">{selectedPlanObj.dimensionName}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-bold">Contribution:</span>
                  <div className="text-base font-black font-mono text-amber-400">₹{customAmount}</div>
                </div>
              </div>

              {/* Single Verified Mode: Cash in Hand Only */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Official Campus Payment Mode:
                </label>
                <div className="p-4 rounded-2xl border-2 border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-400 text-white mx-auto flex items-center justify-center mb-2 shadow-md shadow-amber-500/30">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div className="font-black text-sm text-slate-900">Cash in Hand (Official Campus Desk)</div>
                  <div className="text-xs text-amber-800 font-semibold mt-0.5">Direct Handover to Head Boy Rishit Shankar</div>
                </div>
              </div>

              {/* Cash in Hand Campus Protocol */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-xs text-amber-950 space-y-3 shadow-sm">
                <div className="font-black text-xs text-amber-950 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Campus Verification Protocol:</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
                    <span className="font-bold text-amber-900 block mb-0.5">🏫 Handover Location</span>
                    <span>Class 8-D / Head Boy Office / Recess Campus Desk</span>
                  </div>
                  <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200/80">
                    <span className="font-bold text-amber-900 block mb-0.5">⚡ Activation Speed</span>
                    <span>Instant upgrade upon physical verification</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-amber-950 mb-1">
                    Handover Note / Expected Time (Optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Handing over cash during morning recess in Class 8-D"
                    value={referenceNote}
                    onChange={(e) => setReferenceNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-amber-300 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Spam Protection Notice */}
              <div className="p-2.5 rounded-xl bg-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Maximum limit: <strong>3 pending requests</strong> at a time.</span>
                <span className="text-amber-800 font-bold">Spam Protected</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className="px-4 py-3 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Profile</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Send Payment Request</span>
                </button>
              </div>

            </form>
          )}

          {/* =========================================================================
              PAGE 4: SUCCESS CONFIRMATION - ULTRA-COOL HOLOGRAPHIC ANIMATION
              ========================================================================= */}
          {currentPage === 4 && (
            <div className="py-6 text-center space-y-5 animate-scaleUp">
              
              {/* Pulsing Hologram Badge */}
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-30 blur-md animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 transform hover:rotate-6 transition">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>Encrypted Request Transmitted</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
                  Payment Request Dispatched!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Your campus cash voucher for <strong>{submittedData?.planName}</strong> (₹{submittedData?.amount}) has been logged in Head Boy Rishit Shankar's Master Admin Portal.
                </p>
              </div>

              {/* Digital Voucher Pass */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 text-white text-left space-y-2.5 max-w-md mx-auto shadow-xl border border-stone-700/80 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    DAVDixence Official Pass
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    ID: {submittedData?.id || 'DAV-REQ-' + Math.floor(1000 + Math.random() * 9000)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-stone-400 block">Student:</span>
                    <span className="font-bold text-white">{submittedData?.studentName || studentName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block">Plan:</span>
                    <span className="font-bold text-amber-300">{submittedData?.planName}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed">
                  ⚡ <strong>Next Step:</strong> Hand over the cash of ₹{submittedData?.amount} to Head Boy Rishit Shankar. Once approved, simply refresh your browser to enjoy full VIP benefits!
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-850 hover:from-black hover:to-stone-900 text-white font-black text-xs uppercase tracking-wider shadow-lg mx-auto transition cursor-pointer border border-stone-700 hover:border-amber-400"
              >
                Close &amp; Return to Dashboard
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CustomPurchaseModal;
