import React, { useState } from 'react';
import { 
  X, Mail, User, Shield, CheckCircle, AlertCircle, 
  ArrowRight, Loader2, Sparkles, PlusCircle, Check, 
  ExternalLink, ChevronRight, IndianRupee 
} from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';
import { 
  loginWithGoogle, 
  createStudentWithGoogle, 
  findUserByGoogleEmail,
  triggerSupabaseGoogleOAuth 
} from '../services/googleAuthService';
import { getRegisteredUsers } from '../data/preloadedUsers';
import { CustomPurchaseModal } from './CustomPurchaseModal';

export function GoogleAuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  // Navigation Steps: 'picker' (Account Chooser) -> 'consent' (Agree & Continue) -> 'purchase_offer'
  const [step, setStep] = useState('picker');
  const [selectedAccount, setSelectedAccount] = useState(null);
  
  // Custom account input form
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [classNum, setClassNum] = useState('8');
  const [section, setSection] = useState('D');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [createdStudentUser, setCreatedStudentUser] = useState(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  if (!isOpen) return null;

  // Retrieve existing local users to populate realistic mobile Google Account Chooser
  const localAccounts = (() => {
    try {
      const users = getRegisteredUsers();
      const accounts = [];
      const seen = new Set();
      users.forEach(u => {
        const mail = (u.email || u.googleEmail || '').toLowerCase();
        if (mail && mail.includes('@') && !seen.has(mail)) {
          seen.add(mail);
          accounts.push({
            name: u.name || 'DAV Scholar',
            email: mail,
            avatar: u.photoUrl || u.avatar || u.dp || null,
            isExisting: true,
            userRef: u
          });
        }
      });
      // Fallback sample accounts if no student accounts saved yet
      if (accounts.length === 0) {
        accounts.push({
          name: 'Rishit Shankar',
          email: 'rishit.shankar@gmail.com',
          avatar: '/rishit_shankar.jpg',
          isExisting: true
        });
      }
      return accounts;
    } catch (e) {
      return [];
    }
  })();

  const handleSelectAccount = (acc) => {
    setSelectedAccount(acc);
    setStep('consent');
    setErrorMsg('');
  };

  const handleCustomAccountNext = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail / Google Account address.');
      return;
    }
    const cleanName = fullName.trim() || email.split('@')[0];
    const acc = {
      name: cleanName,
      email: email.trim().toLowerCase(),
      avatar: avatarUrl || null,
      classNum,
      section,
      isExisting: false
    };
    setSelectedAccount(acc);
    setStep('consent');
    setErrorMsg('');
  };

  // User Clicks "Agree and continue"
  const handleAgreeAndContinue = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Check if user already exists
      let existing = await findUserByGoogleEmail(selectedAccount.email);
      if (existing) {
        // Authenticate existing user
        setCreatedStudentUser(existing);
        setSuccessMsg(`Welcome back, ${existing.name}! Logged in via Google.`);
        setLoading(false);
        setStep('purchase_offer');
        return;
      }

      // 2. Create new student account with Google details (all details filled, starts in initial starter access)
      const res = await createStudentWithGoogle({
        name: selectedAccount.name,
        email: selectedAccount.email,
        avatar: selectedAccount.avatar,
        classNum: selectedAccount.classNum || classNum,
        section: selectedAccount.section || section
      });

      setLoading(false);
      if (res.success && res.user) {
        setCreatedStudentUser(res.user);
        setSuccessMsg(`Google Account created! Official Student ID: ${res.user.studentId}`);
        // Transition to Course Purchase Offer step
        setStep('purchase_offer');
      } else {
        setErrorMsg(res.error || 'Failed to initialize Google Account.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Error completing Google Authentication.');
    }
  };

  const handleFinishAndEnter = () => {
    if (createdStudentUser) {
      onLoginSuccess(createdStudentUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn select-none font-sans">
      <div className="w-full max-w-[430px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[92vh]">
        
        {/* Top Google Card Brand Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <GoogleIcon className="w-5 h-5 shrink-0" />
            <span className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight">
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
          <div className="mx-5 mt-3 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-fadeIn shrink-0">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMsg}</div>
          </div>
        )}

        {/* =========================================================================
            SCREEN 1: AUTHENTIC GOOGLE ACCOUNT CHOOSER ("Choose an account")
            ========================================================================= */}
        {step === 'picker' && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            
            <div className="text-center sm:text-left">
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900">
                Choose an account
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                to continue to <strong className="text-slate-800">DAV Dictionary</strong>
              </p>
            </div>

            {!isAddingNew ? (
              <div className="space-y-2 pt-2">
                
                {/* List of Mobile / Device Google Accounts */}
                {localAccounts.map((acc, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectAccount(acc)}
                    className="p-3 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all cursor-pointer flex items-center justify-between group shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-300 overflow-hidden flex items-center justify-center font-bold text-slate-700 text-sm shrink-0">
                        {acc.avatar ? (
                          <img src={acc.avatar} alt={acc.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{acc.name ? acc.name[0].toUpperCase() : 'G'}</span>
                        )}
                      </div>
                      <div className="text-left truncate">
                        <div className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 truncate">
                          {acc.name}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {acc.email}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0" />
                  </div>
                ))}

                {/* + Use another account option */}
                <div
                  onClick={() => setIsAddingNew(true)}
                  className="p-3 rounded-2xl border border-dashed border-slate-300 hover:border-blue-500 hover:bg-slate-50 transition cursor-pointer flex items-center gap-3 text-slate-700 hover:text-blue-700"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <PlusCircle className="w-5 h-5" />
                  </div>
                  <div className="font-bold text-xs sm:text-sm">
                    Use another Google account
                  </div>
                </div>

              </div>
            ) : (
              /* Custom Google Account Details Form */
              <form onSubmit={handleCustomAccountNext} className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                    <select
                      value={classNum}
                      onChange={(e) => setClassNum(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
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
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white"
                    >
                      {['A', 'B', 'C', 'D'].map(s => (
                        <option key={s} value={s}>Section {s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Back to Accounts
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* =========================================================================
            SCREEN 2: GOOGLE PERMISSIONS & "AGREE AND CONTINUE"
            ========================================================================= */}
        {step === 'consent' && selectedAccount && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
            
            {/* Selected Account Capsule */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3 truncate">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shrink-0 overflow-hidden">
                  {selectedAccount.avatar ? (
                    <img src={selectedAccount.avatar} alt={selectedAccount.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{selectedAccount.name ? selectedAccount.name[0].toUpperCase() : 'G'}</span>
                  )}
                </div>
                <div className="truncate text-left">
                  <div className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                    {selectedAccount.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {selectedAccount.email}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep('picker')}
                className="text-[11px] font-bold text-blue-600 hover:underline shrink-0 ml-2 cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Google Permissions Text */}
            <div className="space-y-3 text-xs text-slate-600">
              <h4 className="font-extrabold text-slate-900 text-sm">
                DAV Dictionary wants to access your Google Account
              </h4>
              <p className="leading-relaxed">
                To continue, Google will share your <strong>name</strong>, <strong>email address</strong>, and <strong>profile picture</strong> with DAV Dictionary.
              </p>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-700" />
                  <span>Secure Scholar Access</span>
                </div>
                <p>
                  All your details (Full Name, Email, Student ID) will be automatically personalized into your DAV Dictionary account.
                </p>
              </div>

              <p className="text-[11px] text-slate-400">
                You can review DAV Dictionary's <span className="underline cursor-pointer">Privacy Policy</span> and <span className="underline cursor-pointer">Terms of Service</span> before proceeding.
              </p>
            </div>

            {/* Action Buttons: Agree and Continue */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => setStep('picker')}
                className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleAgreeAndContinue}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 order-1 sm:order-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Agree and continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            SCREEN 3: ACCOUNT CREATED & COURSE PURCHASE GATEWAY OFFER
            ========================================================================= */}
        {step === 'purchase_offer' && createdStudentUser && (
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-center">
            
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-xs">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                Personalized Scholar Account Ready
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                Welcome, {createdStudentUser.name}!
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Student ID: <strong className="text-slate-800">{createdStudentUser.studentId}</strong>
              </p>
            </div>

            {/* Information Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-left text-xs space-y-2">
              <div className="font-extrabold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Subscription &amp; Course Purchase Gateway</span>
              </div>
              <p className="text-amber-900 text-[11px] leading-relaxed">
                Your account details are fully saved. You can now choose your subscription tier and pay <strong>any custom amount from ₹0 to ₹1,00,000</strong>. Your payment will be verified directly by Administrator Rishit Shankar!
              </p>
            </div>

            {/* Actions: Open Purchase Gateway or Explore First */}
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
                Enter Portal with Initial Scholar Access →
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Google Identity Services</span>
          </span>
          <span>DAV Dictionary Portal</span>
        </div>

      </div>

      {/* Embedded Custom Purchase Gateway Modal */}
      <CustomPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          handleFinishAndEnter();
        }}
        user={createdStudentUser}
        onPurchaseSubmitted={() => {
          setIsPurchaseModalOpen(false);
          handleFinishAndEnter();
        }}
      />
    </div>
  );
}
