import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Check, Key, UserCheck, Eye, EyeOff, Lock, Crown, Award, ExternalLink, Loader2 } from 'lucide-react';
import { PRELOADED_DATABASE_USERS, getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { fetchCloudStudents } from '../services/supabaseClient';

export function BlackboardLogin({ onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showId, setShowId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Sync with Supabase Cloud on mount
  useEffect(() => {
    getRegisteredUsers();
    fetchCloudStudents().then(cloudUsers => {
      if (cloudUsers && cloudUsers.length > 0) {
        const local = getRegisteredUsers();
        const mergedMap = new Map();
        local.forEach(u => mergedMap.set(u.id.toLowerCase(), u));
        cloudUsers.forEach(u => {
          const key = u.id.toLowerCase();
          mergedMap.set(key, { ...(mergedMap.get(key) || {}), ...u });
        });
        saveRegisteredUsers(Array.from(mergedMap.values()));
      }
    }).catch(() => {});
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const idVal = userId.trim();
    const passVal = password.trim();

    if (!idVal && !passVal) {
      setFeedback('Please enter your ID and Password.');
      return;
    }
    if (!idVal) {
      setFeedback('Please enter your ID.');
      return;
    }
    if (!passVal) {
      setFeedback('Please enter your Password.');
      return;
    }

    setIsAuthenticating(true);

    // 1. Check Master Developer & Administrator Credentials (Dimension 4)
    if (idVal === 'rishibhai' && passVal === '123456789@aA') {
      const adminUser = {
        id: 'rishibhai',
        name: 'Rishit Shankar',
        role: 'Administrator & Developer',
        studentId: 'rishibhai',
        classNum: '8',
        plan: 'developer',
        dimension: 4,
        dimensionName: 'Dimension 4: Master Developer',
        isAdmin: true,
        email: 'rishit.shankar@davschool.edu.in'
      };
      setFeedback('');
      setLoggedInUser(adminUser);
      setIsSuccess(true);
      setIsAuthenticating(false);
      return;
    }

    // 2. Check Database Accounts (Local cache first)
    const storedUsers = getRegisteredUsers();
    let matched = storedUsers.find(
      (u) => u.id.toLowerCase() === idVal.toLowerCase() && u.password === passVal
    );

    // If not found in local cache, query live Supabase Cloud Database!
    if (!matched) {
      try {
        const cloudUsers = await fetchCloudStudents();
        if (cloudUsers) {
          matched = cloudUsers.find(
            (u) => u.id.toLowerCase() === idVal.toLowerCase() && u.password === passVal
          );
          if (matched) {
            const updated = [matched, ...storedUsers.filter(u => u.id.toLowerCase() !== matched.id.toLowerCase())];
            saveRegisteredUsers(updated);
          }
        }
      } catch (err) {
        console.warn('Supabase cloud login fallback warning:', err);
      }
    }

    setIsAuthenticating(false);

    if (matched) {
      const studentUser = {
        id: matched.id,
        name: matched.name || matched.id,
        role: matched.role || 'Student',
        studentId: matched.id,
        classNum: matched.classNum || '8',
        plan: matched.plan || 'normal',
        dimension: matched.dimension || (matched.plan === 'vvip' ? 3 : matched.plan === 'vip' ? 2 : 1),
        dimensionName: matched.dimensionName || (matched.plan === 'vvip' ? 'Dimension 3: VVIP Plan' : matched.plan === 'vip' ? 'Dimension 2: VIP Plan' : 'Dimension 1: Normal Plan'),
        isAdmin: false
      };
      setFeedback('');
      setLoggedInUser(studentUser);
      setIsSuccess(true);
      return;
    }

    // Invalid Credentials
    setFeedback('Invalid ID or Password. Contact Administrator Rishit Shankar to obtain access.');
  };

  const handleEnterPortal = () => {
    if (loggedInUser) {
      onLoginSuccess(loggedInUser);
    }
  };

  const handleEnterGuestPreview = () => {
    onLoginSuccess({
      id: 'guest_student',
      name: 'Guest Scholar',
      role: 'Free Preview User',
      studentId: 'GUEST-PREVIEW',
      classNum: '8',
      plan: 'guest',
      dimension: 0,
      dimensionName: 'Free Preview (Locked Features)',
      isAdmin: false
    });
  };

  return (
    <div className="min-h-screen bg-[#1c1613] flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 select-none font-sans">
      
      {/* Top Branding Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between mb-3 px-2 text-white">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="The DAV Dictionary Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
          />
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>The DAV Dictionary</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 uppercase">
                Official Portal
              </span>
            </h1>
            <p className="text-[11px] text-amber-200/80">
              Blackboard Authentication Gate • Dedicated by Head Boy Rishit Shankar
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <div className="text-xs font-mono text-slate-300">4 Dimensions • Class 1–8</div>
          <div className="text-[10px] text-emerald-400 font-semibold">● Portal Database Online</div>
        </div>
      </div>

      <main className="w-full max-w-5xl mx-auto">
        {/* Responsive container locked to the image aspect ratio so the form always stays inside the blackboard */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-stone-700/60 bg-stone-900">
          
          {/* Authentic Classroom Blackboard Desk Image */}
          <img
            src="/blackboard_desk.jpg"
            onError={(e) => {
              e.target.style.minHeight = '480px';
              e.target.style.backgroundColor = '#1c1613';
            }}
            alt="Classroom desk with blackboard"
            className="w-full h-auto block max-w-full"
          />

          {/* In-between blackboard portal area */}
          <section
            aria-label="Blackboard Login Portal"
            className="blackboard-overlay flex flex-col items-center justify-center px-3 py-1 sm:px-6 sm:py-3"
          >
            {!isSuccess ? (
              /* LOGIN FORM VIEW */
              <form
                onSubmit={handleLoginSubmit}
                className="w-full max-w-[360px] flex flex-col justify-between gap-1.5 sm:gap-3"
                noValidate
              >
                {/* Upper section: ID */}
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="userIdInput"
                      className="chalk-text font-bold text-xs sm:text-base md:text-lg tracking-wider uppercase"
                    >
                      ID
                    </label>
                    <span className="text-[10px] sm:text-xs text-slate-300/80">
                      {showId ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <div className="relative flex items-center w-full">
                    <input
                      id="userIdInput"
                      name="userId"
                      type={showId ? 'text' : 'password'}
                      autoComplete="username"
                      placeholder="Enter your ID (e.g. XYZ)"
                      value={userId}
                      onChange={(e) => {
                        setUserId(e.target.value);
                        if (feedback) setFeedback('');
                      }}
                      className="chalk-input w-full rounded-lg pl-2.5 pr-16 py-1 sm:pl-3.5 sm:pr-20 sm:py-2 text-xs sm:text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowId(!showId)}
                      aria-label="Show or hide ID"
                      className="absolute right-1.5 sm:right-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-slate-200/70 bg-stone-800/90 hover:bg-yellow-200/25 hover:border-yellow-200 text-[10px] sm:text-xs font-semibold text-slate-100 hover:text-yellow-200 transition-colors cursor-pointer z-20"
                    >
                      {showId ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Middle section (below ID): Password */}
                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="passwordInput"
                      className="chalk-text font-bold text-xs sm:text-base md:text-lg tracking-wider uppercase"
                    >
                      Password
                    </label>
                    <span className="text-[10px] sm:text-xs text-slate-300/80">
                      {showPassword ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <div className="relative flex items-center w-full">
                    <input
                      id="passwordInput"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your password (e.g. 123)"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (feedback) setFeedback('');
                      }}
                      className="chalk-input w-full rounded-lg pl-2.5 pr-16 py-1 sm:pl-3.5 sm:pr-20 sm:py-2 text-xs sm:text-sm md:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Show or hide password"
                      className="absolute right-1.5 sm:right-2 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-slate-200/70 bg-stone-800/90 hover:bg-yellow-200/25 hover:border-yellow-200 text-[10px] sm:text-xs font-semibold text-slate-100 hover:text-yellow-200 transition-colors cursor-pointer z-20"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Status / validation feedback */}
                {feedback && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="text-[11px] sm:text-xs text-yellow-200 text-center font-medium leading-tight"
                  >
                    {feedback}
                  </p>
                )}

                {/* Bottom section (below Password): Login Button */}
                <div className="pt-0.5 sm:pt-1 flex justify-center">
                  <button
                    type="submit"
                    className="chalk-btn w-full sm:w-2/3 rounded-lg py-1 sm:py-2 px-4 font-bold text-xs sm:text-base md:text-lg tracking-widest uppercase cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </form>
            ) : (
              /* LOGGED IN VIEW (shown after valid Login click) */
              <div className="w-full max-w-[360px] flex flex-col items-center justify-center text-center gap-2 sm:gap-3">
                <div className="inline-flex items-center justify-center w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-emerald-300/90 text-emerald-300 font-bold text-sm sm:text-lg">
                  ✓
                </div>
                <h2 className="chalk-text font-bold text-sm sm:text-xl md:text-2xl">
                  Welcome, <span className="text-yellow-200">{loggedInUser?.name}</span>!
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400/20 text-yellow-200 border border-yellow-300/60 text-[10px] sm:text-xs font-bold">
                  {loggedInUser?.dimensionName || (loggedInUser?.isAdmin ? '★ Dimension 4: Master Developer' : '● Verified DAV Student')}
                </div>
                <p className="text-slate-200/80 text-[11px] sm:text-sm">
                  Authentication successful. Ready to enter The DAV Dictionary.
                </p>

                <div className="flex gap-2 w-full justify-center pt-1">
                  <button
                    type="button"
                    onClick={handleEnterPortal}
                    className="chalk-btn rounded-lg py-1.5 sm:py-2 px-6 font-bold text-xs sm:text-sm uppercase tracking-wider cursor-pointer bg-yellow-300/30 text-yellow-200 border-yellow-200"
                  >
                    Enter Portal →
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSuccess(false);
                      setLoggedInUser(null);
                      setPassword('');
                    }}
                    className="chalk-btn rounded-lg py-1.5 sm:py-2 px-4 font-semibold text-xs sm:text-sm uppercase tracking-wider cursor-pointer"
                  >
                    Switch User
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Free Preview Bar */}
        <div className="mt-3 flex items-center justify-between gap-3 p-3 bg-stone-900/90 border border-amber-500/30 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">
              Want to see the website before signing in?
            </span>
          </div>
          <button
            type="button"
            onClick={handleEnterGuestPreview}
            className="py-1.5 px-4 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <span>Explore Free Preview (Demo)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Credentials Hint Pill (Showing the 4 Dimensions) */}
        <div className="mt-2 bg-stone-900/90 border border-stone-700/80 rounded-xl p-3 text-slate-300 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <span className="font-bold text-yellow-300">🔑 Quick Test by Dimension:</span>
            
            {/* Dimension 4: Master Developer */}
            <button
              type="button"
              onClick={() => {
                setUserId('rishibhai');
                setPassword('123456789@aA');
                setFeedback('');
              }}
              title="Click to fill Master Developer credentials"
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <Award className="w-3 h-3 text-amber-400" />
              <span>Dim 4 (Dev):</span>
              <code className="font-mono font-bold text-amber-300">rishibhai</code>
            </button>

            <span className="text-stone-500">•</span>

            {/* Dimension 1: Normal Plan */}
            <button
              type="button"
              onClick={() => {
                setUserId('student1');
                setPassword('12345689@Aa');
                setFeedback('');
              }}
              title="Click to fill Normal Plan credentials"
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <span>Dim 1 (Normal):</span>
              <code className="font-mono font-bold text-emerald-300">student1</code>
            </button>

            <span className="text-stone-500">•</span>

            {/* Dimension 2: VIP Plan */}
            <button
              type="button"
              onClick={() => {
                setUserId('vip_dav1');
                setPassword('Vip1*Shankar77');
                setFeedback('');
              }}
              title="Click to fill VIP Plan credentials"
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-200 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span>Dim 2 (VIP):</span>
              <code className="font-mono font-bold text-blue-300">vip_dav1</code>
            </button>

            <span className="text-stone-500">•</span>

            {/* Dimension 3: VVIP Plan */}
            <button
              type="button"
              onClick={() => {
                setUserId('vvip_boss1');
                setPassword('Vvip1@ShankarPro');
                setFeedback('');
              }}
              title="Click to fill VVIP Plan credentials"
              className="px-2.5 py-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <Crown className="w-3 h-3 text-purple-400" />
              <span>Dim 3 (VVIP):</span>
              <code className="font-mono font-bold text-purple-300">vvip_boss1</code>
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            25 active accounts registered in database across 4 tiers.
          </div>
        </div>

      </main>

    </div>
  );
}

export default BlackboardLogin;
