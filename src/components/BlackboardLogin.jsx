import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Check, Key, UserCheck, Eye, EyeOff, Lock, Crown, Award, ExternalLink, Loader2, ShieldAlert, ShieldCheck, Smartphone, Monitor, AlertTriangle, LogOut, X } from 'lucide-react';
import { PRELOADED_DATABASE_USERS, getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { fetchCloudStudents } from '../services/supabaseClient';
import { checkDeviceSession, registerDeviceSession, getDeviceMetadata } from '../services/deviceAuthManager';

export function BlackboardLogin({ onLoginSuccess, onBackToHome }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showId, setShowId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [deviceConflict, setDeviceConflict] = useState(null);
  const [isSwitchingDevice, setIsSwitchingDevice] = useState(false);

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

  const handleForceSwitchDevice = async () => {
    if (!deviceConflict?.resolvedUser) return;
    setIsSwitchingDevice(true);
    try {
      await registerDeviceSession(deviceConflict.resolvedUser, true);
      const user = deviceConflict.resolvedUser;
      setDeviceConflict(null);
      setLoggedInUser(user);
      setIsSuccess(true);
    } catch (e) {
      setFeedback('Failed to transfer session to this device. Please try again.');
    } finally {
      setIsSwitchingDevice(false);
    }
  };

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

      const deviceCheck = await checkDeviceSession(adminUser.id);
      if (!deviceCheck.allowed && !deviceCheck.isSameDevice) {
        setIsAuthenticating(false);
        setDeviceConflict({
          resolvedUser: adminUser,
          conflictDevice: deviceCheck.conflictDevice,
          lastActiveMinutesAgo: deviceCheck.lastActiveMinutesAgo
        });
        return;
      }

      await registerDeviceSession(adminUser);
      setFeedback('');
      setLoggedInUser(adminUser);
      setIsSuccess(true);
      setIsAuthenticating(false);
      return;
    }

    // 2. Check Database Accounts (Local cache first)
    const storedUsers = getRegisteredUsers();
    let matched = storedUsers.find(
      (u) => (u.id.toLowerCase() === idVal.toLowerCase() || (u.admissionNumber && u.admissionNumber.toLowerCase() === idVal.toLowerCase()) || (u.name && u.name.toLowerCase() === idVal.toLowerCase())) && u.password === passVal
    );

    // If not found in local cache, query live Supabase Cloud Database!
    if (!matched) {
      try {
        const cloudUsers = await fetchCloudStudents();
        if (cloudUsers) {
          matched = cloudUsers.find(
            (u) => (u.id.toLowerCase() === idVal.toLowerCase() || (u.admissionNumber && u.admissionNumber.toLowerCase() === idVal.toLowerCase()) || (u.name && u.name.toLowerCase() === idVal.toLowerCase())) && u.password === passVal
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
      const isTeacher = Boolean(
        matched.isTeacher || 
        matched.plan === 'teacher' || 
        matched.dimension === 5 || 
        (matched.role && matched.role.toLowerCase().includes('teacher')) ||
        (matched.dimensionName && matched.dimensionName.toLowerCase().includes('faculty'))
      );
      const isDevAdmin = Boolean(
        matched.isAdmin || 
        matched.plan === 'developer' || 
        matched.dimension === 4 || 
        matched.id === 'rishibhai'
      );

      const resolvedUser = {
        id: matched.id,
        name: matched.name || matched.id,
        role: matched.role || (isTeacher ? 'DAV Faculty Teacher' : isDevAdmin ? 'Administrator & Developer' : 'Student'),
        studentId: matched.id,
        classNum: matched.classNum || '8',
        section: matched.section || 'D',
        plan: matched.plan || (isTeacher ? 'teacher' : isDevAdmin ? 'developer' : 'normal'),
        dimensionName: matched.dimensionName || (
          isTeacher ? 'Dimension 5: Faculty OS' :
          isDevAdmin ? 'Dimension 4: Master Developer' :
          matched.plan === 'vvip' ? 'Dimension 3: VVIP Plan' :
          matched.plan === 'vip' ? 'Dimension 2: VIP Plan' :
          'Dimension 1: Normal Plan'
        ),
        personalWhatsApp: matched.personalWhatsApp || matched.phoneNumber || matched.mobileNumber || '919470033984',
        phoneNumber: matched.phoneNumber || matched.personalWhatsApp || matched.mobileNumber || '919470033984',
        subject: matched.subject || (isTeacher ? 'Science & Technology' : undefined),
        department: matched.department || (isTeacher ? 'Science' : undefined),
        ...matched,
        isTeacher: isTeacher,
        isAdmin: isDevAdmin,
        dimension: isTeacher ? 5 : isDevAdmin ? 4 : (matched.dimension || 1)
      };

      // Check One Man, One Account, One Device session
      const deviceCheck = await checkDeviceSession(resolvedUser.id);
      if (!deviceCheck.allowed && !deviceCheck.isSameDevice) {
        setIsAuthenticating(false);
        setDeviceConflict({
          resolvedUser,
          conflictDevice: deviceCheck.conflictDevice,
          lastActiveMinutesAgo: deviceCheck.lastActiveMinutesAgo
        });
        return;
      }

      await registerDeviceSession(resolvedUser);
      setFeedback('');
      setLoggedInUser(resolvedUser);
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
            alt="DAV Dictionary Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
          />
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>DAV Dictionary</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-stone-950 uppercase">
                Official Portal
              </span>
            </h1>
            <p className="text-[11px] text-amber-200/80">
              Blackboard Authentication Gate • Dedicated by Head Boy Rishit Shankar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="py-1.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/15 shadow-sm"
            >
              <span>← Back to Homepage</span>
            </button>
          )}
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-slate-300">5 Dimensions • Class 1–8</div>
            <div className="text-[10px] text-emerald-400 font-semibold">● Portal Database Online</div>
          </div>
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
                  Authentication successful. Ready to enter DAV Dictionary.
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

            <span className="text-stone-500">•</span>

            {/* Dimension 5: Faculty OS (Teacher) */}
            <button
              type="button"
              onClick={() => {
                setUserId('teacher1');
                setPassword('Teach1@DAV2026');
                setFeedback('');
              }}
              title="Click to fill Dimension 5 Faculty Teacher credentials"
              className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-200 font-medium transition cursor-pointer flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3 text-teal-400" />
              <span>Dim 5 (Faculty):</span>
              <code className="font-mono font-bold text-teal-300">teacher1</code>
            </button>
          </div>

          <div className="text-[11px] text-stone-400">
            25+ active accounts registered across 5 Dimensions (including Dimension 5: Faculty OS).
          </div>
        </div>

        {/* One Man, One Device Security Protocol Active Banner */}
        <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 via-stone-900/80 to-emerald-950/60 border border-emerald-500/30 text-stone-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold text-white text-[11px] sm:text-xs">
              One Man, One Account, One Device Security Protocol Active
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-stone-400">
            <span className="text-emerald-400 font-bold">1 Account = 1 Device</span>
            <span>•</span>
            <span>Enforced for Double VIP & All Scholars</span>
          </div>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* ONE MAN, ONE DEVICE CONFLICT SECURITY MODAL                               */}
      {/* ========================================================================= */}
      {deviceConflict && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-stone-950 border-2 border-rose-500/80 rounded-3xl shadow-2xl p-6 sm:p-7 text-white space-y-5 relative">
            <button
              onClick={() => setDeviceConflict(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center border border-stone-800 transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                  One Man, One Device Security Lock
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Account Active on Another Device
                </h3>
              </div>
            </div>

            {/* Notice Banner */}
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 leading-relaxed">
              <p className="font-bold text-white mb-1">
                Policy: One Man, One Account, One Device Only.
              </p>
              <p className="text-stone-300 text-[11px]">
                DAV Public School security strictly prohibits concurrent logins on two devices. 
                {deviceConflict.resolvedUser?.plan === 'vvip' || deviceConflict.resolvedUser?.dimension === 3
                  ? ' This strict single-device rule applies equally to Double VIP (VVIP) accounts.'
                  : ' Only one phone, laptop, or tablet can be logged into an account at any time.'}
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Currently Active Device</span>
                </div>
                <div className="font-bold text-white text-sm line-clamp-1">
                  {deviceConflict.conflictDevice?.deviceName || 'Another Phone / PC'}
                </div>
                <div className="text-[10px] text-stone-400 mt-0.5">
                  Active: ~{deviceConflict.lastActiveMinutesAgo || 1} min ago
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800">
                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>This Device</span>
                </div>
                <div className="font-bold text-white text-sm line-clamp-1">
                  {getDeviceMetadata().deviceName}
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5 font-bold">
                  Attempting Login Now
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-[11px] text-stone-400 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
              To use this account here, you can log out from your previous device first, or transfer access below (which will immediately log out the other device).
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                disabled={isSwitchingDevice}
                onClick={handleForceSwitchDevice}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 transition cursor-pointer"
              >
                {isSwitchingDevice ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Switching Device...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Log Out Other Device & Activate Here</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setDeviceConflict(null)}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-bold text-xs transition cursor-pointer"
              >
                Cancel & Keep Previous Device
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default BlackboardLogin;
