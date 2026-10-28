import React, { useState } from 'react';
import { 
  X, Check, Sparkles, Shield, IndianRupee, QrCode, 
  ArrowRight, ArrowLeft, CheckCircle2, Clock, Smartphone, 
  Banknote, AlertCircle, User, Mail, GraduationCap, School
} from 'lucide-react';
import { submitPurchaseRequest, getPurchases } from '../services/purchaseService';

export function CustomPurchaseModal({ isOpen, onClose, user, onPurchaseSubmitted }) {
  // Page Steps: 1 ('plan_amount') -> 2 ('profile_details') -> 3 ('payment_mode') -> 4 ('success')
  const [currentPage, setCurrentPage] = useState(1);

  // Page 1: Plan & Amount
  const [selectedPlan, setSelectedPlan] = useState('normal'); // 'normal' | 'vip' | 'vvip' | 'teacher'
  const [customAmount, setCustomAmount] = useState(299);

  // Page 2: Student Profile Details
  const [fullName, setFullName] = useState(user?.name || user?.fullName || '');
  const [classNum, setClassNum] = useState(user?.classNum || user?.class || '8');
  const [section, setSection] = useState(user?.section || 'A');
  const [email, setEmail] = useState(user?.email || user?.googleEmail || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [admissionNo, setAdmissionNo] = useState(user?.admissionNumber || `ADM-${Math.floor(1000 + Math.random() * 9000)}`);

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
            <form onSubmit={handleGoToPage3} className="space-y-4 animate-fadeIn">
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
            <form onSubmit={handleFinalSubmit} className="space-y-5 animate-fadeIn">
              
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

              {/* Two Payment Modes Only: Cash or Online */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Select Payment Mode (Only Two Options):
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Mode 1: Cash */}
                  <div
                    onClick={() => setPaymentMode('cash')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center ${
                      paymentMode === 'cash'
                        ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center mb-2">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div className="font-black text-xs text-slate-900">1. Cash in Hand</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Pay at School Campus</div>
                  </div>

                  {/* Mode 2: Online (Paytm QR) */}
                  <div
                    onClick={() => setPaymentMode('online')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition text-center ${
                      paymentMode === 'online'
                        ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-400/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center mb-2">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="font-black text-xs text-slate-900">2. Online (Paytm QR)</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">GPay / PhonePe / Paytm</div>
                  </div>

                </div>
              </div>

              {/* Cash Instructions */}
              {paymentMode === 'cash' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="font-black text-amber-950 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-amber-700" />
                    <span>Cash Payment Instructions:</span>
                  </div>
                  <p className="leading-relaxed">
                    You can pay the ₹{customAmount} contribution in cash directly at school to <strong>Head Boy Rishit Shankar</strong>.
                  </p>
                  <div>
                    <label className="block text-[11px] font-bold text-amber-950 mb-1">
                      Cash Note / When will you hand over? (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Handing over cash in Class 8-D tomorrow morning"
                      value={referenceNote}
                      onChange={(e) => setReferenceNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Online Paytm QR Instructions */}
              {paymentMode === 'online' && (
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/60 to-slate-50 border border-blue-200 text-center space-y-3">
                  <div className="text-xs font-black text-blue-950 flex items-center justify-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-700" />
                    <span>Paytm QR Code &amp; UPI Gateway</span>
                  </div>

                  {/* Paytm QR SVG Image */}
                  <div className="w-44 h-44 bg-white border border-slate-300 rounded-2xl p-2 mx-auto shadow-inner flex flex-col items-center justify-center">
                    <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                      <rect x="10" y="10" width="25" height="25" fill="#002e6e" />
                      <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="18" width="9" height="9" fill="#002e6e" />
                      <rect x="65" y="10" width="25" height="25" fill="#002e6e" />
                      <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="73" y="18" width="9" height="9" fill="#002e6e" />
                      <rect x="10" y="65" width="25" height="25" fill="#002e6e" />
                      <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="73" width="9" height="9" fill="#002e6e" />
                      <rect x="42" y="15" width="16" height="8" fill="#002e6e" />
                      <rect x="45" y="35" width="10" height="30" fill="#00b9f1" />
                      <rect x="65" y="65" width="15" height="15" fill="#002e6e" />
                      <rect x="75" y="45" width="15" height="12" fill="#00b9f1" />
                    </svg>
                  </div>

                  <div className="space-y-0.5">
                    <div className="text-xs font-mono font-bold text-slate-800">
                      UPI ID: <span className="text-[#002e6e]">9470033984@ptyes</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      BHIM / GPay UPI: 9470033984@upi
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 text-left mb-1">
                      UPI Transaction / UTR / Reference ID (Optional):
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Paytm Ref 42918820192"
                      value={referenceNote}
                      onChange={(e) => setReferenceNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              )}

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
              PAGE 4: SUCCESS CONFIRMATION
              ========================================================================= */}
          {currentPage === 4 && (
            <div className="py-8 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  Request Dispatched to Rishit Shankar
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Payment Request Submitted!
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Your verification request for <strong>{submittedData?.planName}</strong> (₹{submittedData?.amount}) has been sent directly to Administrator Rishit Shankar's Admin Vault.
                </p>
              </div>

              {/* Live Upgrade Instructions */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left space-y-1.5 max-w-md mx-auto">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>How your account automatically upgrades:</span>
                </div>
                <p className="leading-relaxed">
                  As soon as Administrator Rishit Shankar approves your request, simply <strong>refresh this webpage</strong> or <strong>log in again</strong>. Your account will automatically develop and upgrade to {submittedData?.planName} with full access unlocked!
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs uppercase tracking-wider shadow-lg mx-auto transition cursor-pointer"
              >
                Close &amp; Continue Exploring
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default CustomPurchaseModal;
