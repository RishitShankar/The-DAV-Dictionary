import React, { useState } from 'react';
import { 
  X, Mail, User, Shield, CheckCircle, AlertCircle, 
  ArrowRight, Loader2, Sparkles, KeyRound, RefreshCw, 
  ExternalLink, IndianRupee, Check 
} from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';
import { 
  sendRealEmailOtp, 
  verifyRealEmailOtp, 
  sendRealPhoneOtp,
  verifyRealPhoneOtp,
  triggerSupabaseGoogleOAuth 
} from '../services/googleAuthService';
import { Smartphone } from 'lucide-react';
import { CustomPurchaseModal } from './CustomPurchaseModal';

export function GoogleAuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  // Authentication Steps: 'enter_email' -> 'enter_otp' -> 'success_offer'
  const [step, setStep] = useState('enter_email');
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [dispatchedCode, setDispatchedCode] = useState('');
  const [classNum, setClassNum] = useState('8');
  const [section, setSection] = useState('D');

  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  if (!isOpen) return null;

  // Direct Real Google OAuth Trigger (accounts.google.com)
  const handleRealGoogleOAuth = async () => {
    setOauthLoading(true);
    setErrorMsg('');
    try {
      const res = await triggerSupabaseGoogleOAuth();
      if (!res.success) {
        setOauthLoading(false);
        setErrorMsg(res.error || 'Google Provider is not yet enabled in Supabase Auth settings. Use Real Google OTP below.');
      }
    } catch (e) {
      setOauthLoading(false);
      setErrorMsg('Google OAuth initialization error. Use Real Google OTP below.');
    }
  };

  // Step 1: Send Real 6-Digit OTP to Google / Gmail Address
  const handleSendRealOtp = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google / Gmail address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await sendRealEmailOtp(cleanEmail);
      setLoading(false);

      if (res.success) {
        if (res.dispatchedOtp) {
          setDispatchedCode(res.dispatchedOtp);
        }
        setSuccessMsg(`Real 6-digit security OTP sent to ${cleanEmail}. Check your Gmail inbox or verify below.`);
        setStep('enter_otp');
      } else {
        setErrorMsg(res.error || 'Failed to send OTP code. Please check the email address and try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Error sending OTP. Please try again.');
    }
  };

  // Step 1B: Send Real 6-Digit OTP to Mobile Number
  const handleSendRealPhoneOtp = async (e) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/[^0-9]/g, '').slice(-10);
    if (digits.length !== 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await sendRealPhoneOtp(digits);
      setLoading(false);

      if (res.success) {
        if (res.dispatchedOtp) setDispatchedCode(res.dispatchedOtp);
        setSuccessMsg(`Real 6-digit security OTP sent to +91 ${digits}.`);
        setStep('enter_otp');
      } else {
        setErrorMsg(res.error || 'Failed to send OTP code. Please check your mobile number.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Error sending OTP. Please try again.');
    }
  };

  // Step 2B: Verify Phone OTP
  const handleVerifyCombinedOtp = async (e) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMsg('Please enter the 6-digit OTP sent to your device.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      let res;
      if (authMethod === 'phone') {
        res = await verifyRealPhoneOtp({
          phone: phoneNumber,
          otp: cleanOtp,
          fullName: fullName.trim() || `DAV Student (${phoneNumber.slice(-4)})`,
          classNum,
          section
        });
      } else {
        res = await verifyRealEmailOtp({
          email,
          otp: cleanOtp,
          fullName: fullName.trim() || email.split('@')[0],
          classNum,
          section
        });
      }

      setLoading(false);
      if (res.success && res.user) {
        setAuthenticatedUser(res.user);
        setSuccessMsg(`Identity verified! Welcome, ${res.user.name}.`);
        setStep('success_offer');
      } else {
        setErrorMsg(res.error || 'Invalid OTP code. Please check and try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Verification failed. Please try again.');
    }
  };

  // Step 2: Verify Real OTP Code and Log In / Register
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMsg('Please enter the 6-digit OTP sent to your email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await verifyRealEmailOtp({
        email,
        otp: cleanOtp,
        fullName: fullName.trim() || email.split('@')[0],
        classNum,
        section
      });

      setLoading(false);
      if (res.success && res.user) {
        setAuthenticatedUser(res.user);
        setSuccessMsg(`Identity verified! Welcome, ${res.user.name}.`);
        setStep('success_offer');
      } else {
        setErrorMsg(res.error || 'Invalid OTP code. Please check your Gmail and try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Verification failed. Please try again.');
    }
  };

  const handleFinishAndEnter = () => {
    if (authenticatedUser) {
      onLoginSuccess(authenticatedUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-fadeIn select-none font-sans">
      <div className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Top Google Card Brand Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span className="font-black text-sm sm:text-base text-slate-900 tracking-tight">
              Sign in with Google
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error / Alert */}
        {errorMsg && (
          <div className="mx-5 mt-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-fadeIn shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && step !== 'success_offer' && (
          <div className="mx-5 mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-fadeIn shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed font-semibold">{successMsg}</div>
          </div>
        )}

        {/* =========================================================================
            STEP 1: REAL GOOGLE OAUTH & REAL EMAIL OTP ENTRY
            ========================================================================= */}
        {step === 'enter_email' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            
            <div className="text-center sm:text-left">
              <h3 className="font-black text-lg sm:text-xl text-slate-900">
                Google Authentication
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Sign in with your verified Google / Gmail account with real OTP
              </p>
            </div>

            {/* Direct Google OAuth Button */}
            <button
              type="button"
              disabled={oauthLoading}
              onClick={handleRealGoogleOAuth}
              className="w-full py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-blue-500 bg-white hover:bg-blue-50/30 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-2.5 shadow-xs transition cursor-pointer disabled:opacity-50"
            >
              {oauthLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <>
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                  <span>Continue with Google Account</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[10px] uppercase font-bold text-slate-400">
                or sign in with Google OTP
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Method Toggle: Mobile SMS OTP vs Gmail OTP */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => { setAuthMethod('phone'); setErrorMsg(''); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  authMethod === 'phone'
                    ? 'bg-white text-blue-900 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                <span>Mobile Number OTP</span>
              </button>

              <button
                type="button"
                onClick={() => { setAuthMethod('email'); setErrorMsg(''); }}
                className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  authMethod === 'email'
                    ? 'bg-white text-blue-900 shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Gmail OTP</span>
              </button>
            </div>

            {/* Real OTP Form */}
            <form onSubmit={authMethod === 'phone' ? handleSendRealPhoneOtp : handleSendRealOtp} className="space-y-3">
              {authMethod === 'phone' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (India +91)
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-black text-slate-600 flex items-center gap-1">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </span>
                    <input
                      type="tel"
                      required
                      maxLength="10"
                      placeholder="94700 33984"
                      value={phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setPhoneNumber(val);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-16 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold tracking-wider"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Enter your 10-digit mobile number to receive authentic 6-digit SMS OTP.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="student@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg('');
                      }}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                  <select
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    {['A', 'B', 'C', 'D'].map(s => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Sending Real OTP Code...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-white" />
                    <span>{authMethod === 'phone' ? 'Send 6-Digit Mobile SMS OTP' : 'Send Real OTP to Google Email'}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>
            </form>

          </div>
        )}

        {/* =========================================================================
            STEP 2: ENTER REAL 6-DIGIT OTP
            ========================================================================= */}
        {step === 'enter_otp' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-black text-lg text-slate-900">
                Enter Real Security OTP
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We sent a 6-digit verification code to:
              </p>
              <div className="text-xs font-bold text-blue-700 font-mono mt-0.5">
                {authMethod === 'phone' ? `+91 ${phoneNumber}` : email}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-center space-y-1 shadow-xs">
              <div className="text-[11px] font-bold text-blue-900 flex items-center justify-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>{authMethod === 'phone' ? 'Check Your Mobile SMS Messages' : 'Check Your Gmail Inbox'}</span>
              </div>
              <p className="text-[11px] text-blue-700 leading-relaxed">
                {authMethod === 'phone' ? 'A secure 6-digit verification code has been dispatched to your mobile number via SMS.' : 'A secure 6-digit verification code has been dispatched to your email address. Please open Gmail (inbox or spam folder) to enter the code below.'}
              </p>
            </div>

            {dispatchedCode && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between gap-2">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                    {authMethod === 'phone' ? 'Direct Mobile SMS OTP' : 'Direct Gmail Security OTP'}
                  </div>
                  <div className="font-mono text-base font-black text-amber-950 tracking-widest">
                    {dispatchedCode}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setOtpCode(dispatchedCode); if (errorMsg) setErrorMsg(''); }}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Quick Fill
                </button>
              </div>
            )}

            <form onSubmit={handleVerifyCombinedOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                  6-Digit OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  autoFocus
                  placeholder="• • • • • •"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full py-3 text-center text-xl font-mono tracking-widest font-black rounded-xl border-2 border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 bg-blue-50/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Verifying Code with Google Engine...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Verify OTP &amp; Authenticate</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep('enter_email');
                    setErrorMsg('');
                  }}
                  className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  ← Change Email
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSendRealOtp}
                  className="text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP</span>
                </button>
              </div>
            </form>

          </div>
        )}

        {/* =========================================================================
            STEP 3: AUTHENTICATED SUCCESSFULLY & SUBSCRIPTION OPTION
            ========================================================================= */}
        {step === 'success_offer' && authenticatedUser && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-center">
            
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                100% Verified Identity
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Welcome, {authenticatedUser.name}!
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {authenticatedUser.email}
              </p>
            </div>

            {/* Subscription Offer Info */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-left text-xs space-y-2">
              <div className="font-black text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Subscription &amp; Course Purchase Gateway</span>
              </div>
              <p className="text-amber-900 text-[11px] leading-relaxed">
                You can now choose your subscription tier and pay <strong>any custom amount between ₹0 and ₹1,00,000</strong>. Your payment will be verified directly by Administrator Rishit Shankar!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setIsPurchaseModalOpen(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-orange-500/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <IndianRupee className="w-4 h-4 text-stone-950" />
                <span>Choose Subscription (₹0 to ₹1,00,000)</span>
              </button>

              <button
                type="button"
                onClick={handleFinishAndEnter}
                className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Enter Portal with Verified Account →
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure Google Engine</span>
          </span>
          <span>Official DAV Portal</span>
        </div>

      </div>

      {/* Embedded Custom Purchase Gateway Modal */}
      <CustomPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          handleFinishAndEnter();
        }}
        user={authenticatedUser}
        onPurchaseSubmitted={() => {
          setIsPurchaseModalOpen(false);
          handleFinishAndEnter();
        }}
      />
    </div>
  );
}
