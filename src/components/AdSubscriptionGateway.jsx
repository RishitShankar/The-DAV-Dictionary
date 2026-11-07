import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Crown, Zap, ShieldCheck, CheckCircle2, Clock, 
  Play, Gift, Star, Award, Heart, Check, ArrowRight, X, 
  Flame, Film, IndianRupee, Smartphone, Monitor, Info
} from 'lucide-react';

const SPONSORS = [
  {
    title: 'DAV Vedic Mathematics Championship 2026',
    tagline: 'Master rapid mental arithmetic and algebraic speed formulas',
    sponsor: 'DAV Muzaffarpur Academic Council',
    badge: 'Official Sponsor',
    bg: 'from-amber-700 via-orange-800 to-amber-950',
    icon: '📐',
    tip: 'Vedic Math Sutras like Ekadhikena Purvena double calculation speed in Board exams!'
  },
  {
    title: 'Digital Science & 3D Interactive Lab',
    tagline: 'Virtual physics experiments, chemical reaction simulations, and cell models',
    sponsor: 'DAV Modern Science Foundation',
    badge: 'Technology Partner',
    bg: 'from-blue-700 via-indigo-900 to-slate-950',
    icon: '🔬',
    tip: 'High-definition chapter diagrams help score 95%+ in Science & Technology.'
  },
  {
    title: 'Rishi AI Quantum Scholastic Companion',
    tagline: '24/7 curriculum-grounded instant doubt resolution for Classes LKG to 8',
    sponsor: 'Head Boy Digital India Labs',
    badge: 'Innovation Partner',
    bg: 'from-purple-700 via-rose-900 to-stone-950',
    icon: '🤖',
    tip: 'Ask Rishi AI any textbook exercise question for step-by-step Hindi & English answers.'
  },
  {
    title: 'National Sanskrit Surabhi Olympiad',
    tagline: 'Flawless mastery of Dhatu Roop, Shabda Roop, and Sanskrit Grammar',
    sponsor: 'DAV Sanskrit Parishad',
    badge: 'Curriculum Sponsor',
    bg: 'from-emerald-700 via-teal-900 to-slate-950',
    icon: '📜',
    tip: 'Dedicated by Century Scorer Rishit Shankar (80/80 in Surabhi Sanskrit).'
  },
  {
    title: 'DAV All-India Inter-School Sports Arena',
    tagline: 'Promoting national-level athletics, chess, and student fitness',
    sponsor: 'DAV Sports Authority',
    badge: 'Health & Fitness',
    bg: 'from-red-700 via-amber-800 to-slate-950',
    icon: '🏆',
    tip: 'Daily physical activity and sharp concentration lead to academic excellence.'
  }
];

export function AdSubscriptionGateway({ currentUser, onSelectPlan }) {
  const isMasterRishit = (currentUser?.id || '').toLowerCase() === 'rishibhai' || currentUser?.dimension === 4 || currentUser?.role === 'developer';
  const isTeacher = Boolean(
    currentUser?.dimension === 5 || 
    currentUser?.plan === 'teacher' || 
    currentUser?.isTeacher ||
    (currentUser?.role && currentUser?.role.toLowerCase().includes('teacher'))
  );

  // Active Super Subsection: 'purchase' or 'ad_unlock'
  const [activeSuperSection, setActiveSuperSection] = useState('ad_unlock');

  // Ad counters & active 12-hour pass
  const [adCount, setAdCount] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_ad_watch_counts');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  });

  const [activePass, setActivePass] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_ad_unlocked_tier');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.expiresAt && Date.now() < parsed.expiresAt) {
          return parsed;
        }
      }
    } catch (e) {}
    return null;
  });

  const [timeRemaining, setTimeRemaining] = useState('');

  // Ad Simulator Modal State
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [currentSponsor, setCurrentSponsor] = useState(SPONSORS[0]);
  const [adTimer, setAdTimer] = useState(6);
  const [adRewardClaimed, setAdRewardClaimed] = useState(false);
  const [activationCelebration, setActivationCelebration] = useState(null);

  // Countdown timer for active 12-hour pass
  useEffect(() => {
    if (!activePass?.expiresAt) {
      setTimeRemaining('');
      return;
    }

    const updateTimer = () => {
      const remainingMs = activePass.expiresAt - Date.now();
      if (remainingMs <= 0) {
        setActivePass(null);
        try {
          localStorage.removeItem('dav_ad_unlocked_tier');
        } catch (e) {}
        window.dispatchEvent(new CustomEvent('dav_tier_upgraded', { detail: null }));
        setTimeRemaining('Expired');
        return;
      }
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [activePass]);

  // Audio synthesizer for victory bell on ad completion
  const playVictoryChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {}
  };

  // Launch Ad Simulator
  const handleStartAdWatch = () => {
    const randomSponsor = SPONSORS[Math.floor(Math.random() * SPONSORS.length)];
    setCurrentSponsor(randomSponsor);
    setAdTimer(6);
    setAdRewardClaimed(false);
    setIsWatchingAd(true);
  };

  // Ad timer countdown effect
  useEffect(() => {
    if (!isWatchingAd) return;
    if (adTimer <= 0) {
      if (!adRewardClaimed) {
        setAdRewardClaimed(true);
        playVictoryChime();
        const newCount = adCount + 1;
        setAdCount(newCount);
        try {
          localStorage.setItem('dav_ad_watch_counts', String(newCount));
        } catch (e) {}
      }
      return;
    }

    const timerId = setTimeout(() => {
      setAdTimer((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isWatchingAd, adTimer, adRewardClaimed, adCount]);

  // Activate 12-Hour Subscription Tier
  const handleActivateTier = (tier, requiredAds, tierName) => {
    if (adCount < requiredAds) return;
    const newCount = Math.max(0, adCount - requiredAds);
    setAdCount(newCount);
    try {
      localStorage.setItem('dav_ad_watch_counts', String(newCount));
    } catch (e) {}

    const expiresAt = Date.now() + 12 * 60 * 60 * 1000;
    const passData = {
      tier,
      name: tierName,
      activatedAt: Date.now(),
      expiresAt
    };

    try {
      localStorage.setItem('dav_ad_unlocked_tier', JSON.stringify(passData));
    } catch (e) {}

    setActivePass(passData);
    setActivationCelebration(passData);
    window.dispatchEvent(new CustomEvent('dav_tier_upgraded', { detail: passData }));

    setTimeout(() => {
      setActivationCelebration(null);
    }, 4500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 select-none font-sans">
      
      {/* Super Subsection Navigation Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-amber-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-lg">
            <Crown className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Subsection 3 • Dimension Subscriptions
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Castle Architecture
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white">
              Choose Direct Purchase or Free 12-Hour Ad Access
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveSuperSection('ad_unlock')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
              activeSuperSection === 'ad_unlock'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Super Sub 2: 🎬 Watch Ads (Free 12h)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSuperSection('purchase')}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer ${
              activeSuperSection === 'purchase'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <IndianRupee className="w-4 h-4" />
            <span>Super Sub 1: 👑 Direct Plan Purchase</span>
          </button>
        </div>
      </div>

      {/* Active Pass Notification Banner */}
      {activePass && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 border-2 border-emerald-400 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-400 text-stone-950 flex items-center justify-center font-black text-lg shadow-lg">
              ⚡
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>12-Hour Ad-Watch Premium Pass Active</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                {activePass.name} • Full Access Unlocked
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-emerald-500/30">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs font-mono font-black text-amber-300 tracking-wide">
              {timeRemaining} Left
            </span>
          </div>
        </div>
      )}

      {/* Developer / Teacher Master Pass Notice */}
      {(isMasterRishit || isTeacher) && (
        <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-950/80 via-stone-900 to-purple-950/80 border border-purple-500/40 text-purple-200 text-xs sm:text-sm flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400 shrink-0 animate-pulse" />
          <div>
            <span className="font-black text-white">
              {isMasterRishit ? 'Master Developer (Rishit Shankar) Access Active' : 'DAV Faculty Teacher Master Privileges Active'}
            </span>
            <p className="text-xs text-purple-300 mt-0.5">
              You possess perpetual Double VIP status with unrestricted institutional permissions. You do not need to watch ads or purchase subscriptions.
            </p>
          </div>
        </div>
      )}

      {/* SUPER SUBSECTION 2: CASTLE APP-INSPIRED WATCH ADS FOR 12-HOUR ACCESS */}
      {activeSuperSection === 'ad_unlock' && (
        <div className="space-y-6">
          
          {/* Hero Banner with Rich Graphic Animations */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-stone-950 p-6 sm:p-10 border border-amber-500/40 shadow-2xl text-white">
            {/* Visual Graphic Animation 1: Ambient Glowing Celestial Orb */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Zero Cost • Castle App Architecture</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Watch Ads &amp; Unlock 12 Hours Premium Subscription 🎬
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                No money? No problem! As inspired by modern educational platforms, watch brief sponsored messages from verified DAV partners to earn instant 12-hour passes to Normal, VIP, or Double VIP tiers!
              </p>

              {/* Progress Summary Pill */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
                <div className="px-4 py-2 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  <span>Total Ads Watched: <strong className="text-amber-400 text-sm">{adCount}</strong></span>
                </div>

                <button
                  type="button"
                  onClick={handleStartAdWatch}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:scale-105 active:scale-95"
                >
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Watch Sponsored Ad (+1 Credit) 🚀</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Tier Cards for 12-Hour Pass */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* TIER 1: NORMAL PLAN (10 ADS) */}
            <div className="bg-slate-900/90 rounded-3xl p-6 border-2 border-emerald-500/40 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-emerald-400 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🟢</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                    10 Ads Needed
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Normal Plan</h3>
                  <div className="text-xs text-emerald-400 font-bold mt-0.5">12 Hours Full Access</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>All 70+ DAV Digital Textbooks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Complete Chapter Q&amp;A Arcade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>1 Single Device Access</span>
                  </li>
                </ul>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-emerald-400">{Math.min(adCount, 10)} / 10 Ads</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (adCount / 10) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                {adCount >= 10 ? (
                  <button
                    type="button"
                    onClick={() => handleActivateTier('normal', 10, 'Normal Plan (12h Ad Pass)')}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>⚡ Activate 12-Hour Normal Plan!</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartAdWatch}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch {10 - adCount} More Ads</span>
                  </button>
                )}
              </div>
            </div>

            {/* TIER 2: VIP SCHOLAR (25 ADS) */}
            <div className="bg-slate-900/90 rounded-3xl p-6 border-2 border-blue-500/40 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-blue-400 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🔵</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase">
                    25 Ads Needed
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">VIP Scholar Plan</h3>
                  <div className="text-xs text-blue-400 font-bold mt-0.5">12 Hours Full Access</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Everything in Normal Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Rishi AI Workspace (25 Qs daily)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>20 VVI Board Questions &amp; Videos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>2 Active Devices</span>
                  </li>
                </ul>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-blue-400">{Math.min(adCount, 25)} / 25 Ads</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (adCount / 25) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                {adCount >= 25 ? (
                  <button
                    type="button"
                    onClick={() => handleActivateTier('vip', 25, 'VIP Scholar Plan (12h Ad Pass)')}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>⚡ Activate 12-Hour VIP Plan!</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartAdWatch}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch {25 - adCount} More Ads</span>
                  </button>
                )}
              </div>
            </div>

            {/* TIER 3: DOUBLE VIP / VVIP (50 ADS) */}
            <div className="bg-slate-900/90 rounded-3xl p-6 border-2 border-purple-500/40 text-white flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400 transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">🟣</span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
                    50 Ads Needed
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">Double VIP (VVIP) Supreme</h3>
                  <div className="text-xs text-purple-400 font-bold mt-0.5">12 Hours Full Access</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Everything in VIP Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Unlimited Rishi AI (50 Qs daily)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>Offline Chapter Caching &amp; Audio Notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>3 Active Devices Simultaneously</span>
                  </li>
                </ul>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-purple-400">{Math.min(adCount, 50)} / 50 Ads</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (adCount / 50) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                {adCount >= 50 ? (
                  <button
                    type="button"
                    onClick={() => handleActivateTier('vvip', 50, 'Double VIP Supreme (12h Ad Pass)')}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105 active:scale-95"
                  >
                    <Crown className="w-4 h-4 fill-white" />
                    <span>⚡ Activate 12-Hour Double VIP!</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartAdWatch}
                    className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch {50 - adCount} More Ads</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SUPER SUBSECTION 1: DIRECT PLAN PURCHASE GATEWAY */}
      {activeSuperSection === 'purchase' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider border border-purple-500/30">
              <Crown className="w-3.5 h-3.5 text-purple-400" />
              <span>Perpetual Dimension Upgrade Gateway</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Official Academic Subscriptions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              One-time contribution supporting DAV digital servers, cloud AI speed, and continuous syllabus textbook updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Direct Plan 1: Normal Plan (₹100) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl flex flex-col justify-between hover:border-emerald-400 transition-all group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl shadow-sm">
                  📚
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Dimension 2: Normal Plan</h3>
                  <div className="text-2xl font-black text-emerald-700 mt-1">₹100</div>
                  <div className="text-[11px] text-slate-500 font-medium">Standard Academic Term Access</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All 70+ Digital Textbooks (LKG-8)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Chapter Q&amp;A Solved Exercises</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1 Single Device Session</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan('normal', 100)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Select Normal (₹100) →</span>
                </button>
              </div>
            </div>

            {/* Direct Plan 2: VIP Scholar (₹250) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-blue-500 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl shadow-sm">
                  ⚡
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Dimension 3: VIP Scholar</h3>
                  <div className="text-2xl font-black text-blue-700 mt-1">₹250</div>
                  <div className="text-[11px] text-slate-500 font-medium">Enhanced AI &amp; Exam Practice</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Everything in Normal Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>Rishi AI Workspace (25 Qs daily)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>20 VVI Board Long-Answer Bank</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>2 Devices Simultaneously</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan('vip', 250)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Select VIP (₹250) →</span>
                </button>
              </div>
            </div>

            {/* Direct Plan 3: Double VIP Supreme (₹500) */}
            <div className="bg-slate-900 rounded-3xl p-6 border-2 border-amber-400 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center font-black text-xl shadow-lg">
                  👑
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Dimension 4: Double VIP</h3>
                  <div className="text-2xl font-black text-amber-300 mt-1">₹500</div>
                  <div className="text-[11px] text-amber-200/80 font-medium">Supreme Scholar Privileges</div>
                </div>

                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Everything in VIP Plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Unlimited Rishi AI (50 Qs daily)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Offline Chapter Notes &amp; Video Lectures</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>3 Active Devices Concurrently</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onSelectPlan && onSelectPlan('vvip', 500)}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl shadow-orange-500/30 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Select Double VIP (₹500) →</span>
                </button>
              </div>
            </div>

          </div>

          {/* Developer & Teacher Clarity Card */}
          <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-200 text-purple-900 flex items-center justify-center font-black shrink-0">
                🎓
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-900">
                  Dimension 5: DAV Faculty Teachers
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Institutional teachers possess permanent master double-VIP status, complete textbook management, and student homework grading privileges with ₹0 payment.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-black shrink-0">
                👑
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Dimension 6: Developer Master (Rishit Shankar)
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Founder &amp; Head Boy Rishit Shankar retains supreme root developer authority across all databases, cloud API pipelines, and system configurations.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* INTERACTIVE AD SIMULATOR MODAL */}
      {isWatchingAd && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col relative">
            
            {/* Top Sponsor Bar */}
            <div className={`p-4 bg-gradient-to-r ${currentSponsor.bg} text-white flex items-center justify-between shadow-md`}>
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{currentSponsor.icon}</span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                    {currentSponsor.badge} • {currentSponsor.sponsor}
                  </div>
                  <h4 className="text-sm font-black text-white truncate max-w-xs">
                    {currentSponsor.title}
                  </h4>
                </div>
              </div>

              {/* Countdown Badge */}
              <div className="px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>{adTimer > 0 ? `${adTimer}s` : 'DONE'}</span>
              </div>
            </div>

            {/* Simulated Video & Media Area */}
            <div className="p-6 sm:p-8 space-y-4 bg-slate-950/90 text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-sm mx-auto flex items-center justify-center text-4xl shadow-inner border border-white/10 animate-pulse">
                {currentSponsor.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {currentSponsor.title}
                </h3>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  {currentSponsor.tagline}
                </p>
              </div>

              {/* Educational Tip Box */}
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-[11px] text-amber-200 text-left">
                <strong>Scholastic Tip:</strong> {currentSponsor.tip}
              </div>

              {/* Progress Bar */}
              <div className="space-y-1 pt-2">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-1000"
                    style={{ width: `${((6 - adTimer) / 6) * 100}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-400">
                  {adTimer > 0 ? `Please view sponsor message for ${adTimer} more seconds...` : 'Reward ready to collect!'}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                {adRewardClaimed ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    +1 Ad Credit Granted!
                  </span>
                ) : (
                  <span>Viewing sponsored announcement</span>
                )}
              </div>

              {adRewardClaimed ? (
                <button
                  type="button"
                  onClick={() => setIsWatchingAd(false)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer transition transform hover:scale-105"
                >
                  <Check className="w-4 h-4" />
                  <span>Claim &amp; Return</span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-500 font-bold text-xs cursor-not-allowed"
                >
                  Please Wait ({adTimer}s)...
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ACTIVATION CELEBRATION MODAL */}
      {activationCelebration && (
        <div className="fixed inset-0 z-[260] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="w-full max-w-md bg-gradient-to-b from-stone-900 via-slate-900 to-stone-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center text-white space-y-4 shadow-2xl relative">
            <div className="text-5xl animate-bounce">🎉</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Subscription Unlocked!</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-amber-300">
              {activationCelebration.name} Active!
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Congratulations! Your 12-hour premium pass has been successfully synchronized across the entire DAV Dictionary platform. Enjoy unrestricted learning!
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActivationCelebration(null)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl cursor-pointer"
              >
                Start Exploring Now 🚀
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdSubscriptionGateway;