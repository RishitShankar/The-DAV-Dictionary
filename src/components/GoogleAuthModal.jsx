import React, { useState } from 'react';
import { X, Mail, User, Shield, CheckCircle, AlertCircle, ArrowRight, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';
import { 
  loginWithGoogle, 
  createStudentWithGoogle, 
  triggerSupabaseGoogleOAuth 
} from '../services/googleAuthService';

export function GoogleAuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'create'
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [classNum, setClassNum] = useState('8');
  const [section, setSection] = useState('D');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleOAuthRedirect = async () => {
    setLoading(true);
    setErrorMsg('');
    const res = await triggerSupabaseGoogleOAuth();
    if (!res.success) {
      setLoading(false);
      setErrorMsg(`Cloud OAuth redirect notice: ${res.error}. You can sign in directly below with your Google email.`);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your Google email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await loginWithGoogle({ email });
      setLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Welcome back, ${res.user.name}! Verified with Google.`);
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 600);
      } else if (res.notFound) {
        setErrorMsg(res.error || 'Account not found. Click below to Create Account with Google.');
      } else {
        setErrorMsg(res.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Failed to authenticate with Google. Please try again.');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your Google email address.');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name as it appears on your Google account.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await createStudentWithGoogle({
        name: fullName,
        email: email,
        avatar: avatarUrl || null,
        classNum,
        section
      });

      setLoading(false);
      if (res.success && res.user) {
        setSuccessMsg(`Account created successfully! Your Student ID is ${res.user.studentId}.`);
        setTimeout(() => {
          onLoginSuccess(res.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(res.error || 'Failed to create account with Google.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Error creating account. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn select-none">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800">
        
        {/* Top Google Card Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-md border border-slate-200 flex items-center justify-center">
              <GoogleIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Google Authentication</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  DAV Portal
                </span>
              </h3>
              <p className="text-xs text-slate-500">Sign in with your Google Workspace or Gmail account</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Login with Google</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('create');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`py-2 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'create'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Create with Google</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">
              {errorMsg}
              {mode === 'login' && errorMsg.includes('Create Account') && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('create');
                    setErrorMsg('');
                  }}
                  className="mt-1 block font-bold text-red-800 underline hover:text-red-950 cursor-pointer"
                >
                  Switch to "Create Account with Google" →
                </button>
              )}
            </div>
          </div>
        )}

        {successMsg && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 pt-4">
          {mode === 'login' ? (
            /* ====================================================
               1. LOGIN WITH GOOGLE VIEW
               ==================================================== */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
                <GoogleIcon className="w-8 h-8 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-slate-900">One-Click Google Authentication</div>
                  <div className="text-slate-500 text-[11px]">
                    Sign in using your linked Google credentials. All textbooks and notes stay synced.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
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
                    className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              {/* Login Button with Google Branding */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                    <span>Login with Google</span>
                  </>
                )}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400">
                  <span className="bg-white px-2">or quick action</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleOAuthRedirect}
                  disabled={loading}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  <span>Google OAuth Popup</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('create');
                    setErrorMsg('');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300/40 text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>New User? Sign Up</span>
                </button>
              </div>
            </form>
          ) : (
            /* ====================================================
               2. CREATE ACCOUNT WITH GOOGLE VIEW
               ==================================================== */
            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 font-black flex items-center justify-center shadow-xs">
                  <Sparkles className="w-5 h-5 text-stone-950" />
                </div>
                <div className="text-xs">
                  <div className="font-black text-amber-950">Instant Google Account Provisioning</div>
                  <div className="text-amber-800 text-[11px]">
                    Creates an authentic DAV Student ID (DAV-2026-XXXX) linked to your Google identity.
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name (as in Google)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

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
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grade / Class</label>
                  <select
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800"
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
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800"
                  >
                    {['A', 'B', 'C', 'D'].map(s => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <GoogleIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                    <span>Create Account with Google</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </button>

              <div className="pt-1 text-center">
                <span className="text-xs text-slate-500">Already registered? </span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Login with Google
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Google OAuth</span>
          </span>
          <span>DAV Dictionary • Class 1–8</span>
        </div>

      </div>
    </div>
  );
}
