import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, Flame, Clock, Target, Sparkles, Award, Star, CheckCircle2, 
  User, Search, BookOpen, Brain, Zap, Bell, Check, BarChart3, Medal, 
  Smartphone, Monitor, ArrowRight, ShieldCheck, RefreshCw, Compass,
  Sliders, Filter, ChevronUp, ChevronDown, Heart, Layers, ArrowUpRight,
  Play, Volume2, ShieldAlert, Download, Eye
} from 'lucide-react';

import { getRegisteredUsers } from '../data/preloadedUsers';
import { DigitalFocusSuite } from './DigitalFocusSuite';
import { focusDataStore, ambientAudio } from '../services/focusDataStore';

/**
 * --------------------------------------------------------------------------
 * Section 9: Campus Scholastic Leaderboard & APK Digital Focus OS
 * --------------------------------------------------------------------------
 * STRICT PLATFORM SEPARATION:
 * 1. WEBSITE (Desktop & Mobile Browser):
 *    - Renders 100% PURE Campus Scholastic Leaderboard ONLY.
 *    - No intrusive Deep Study Focus Mode tabs or clutter.
 *    - Fast, prestigious ranking of Top 100 DAV scholars with Class & Tier filters.
 * 2. APK APPLICATION (DAV Smart Portal Native Android APK / APK Preview Mode):
 *    - BOTH features available: Campus Leaderboard + Complete ReGain Focus OS
 *      (Screen Time Telemetry, BrainPal Reel Scroller, Background App Stopper,
 *       Study Schedules, Focus Circles, Strict Anti-Uninstall Shield).
 */

export function StudyLeaderboardSection({ user, onRequireLogin }) {
  // ---------------------------------------------------------------------------
  // Platform Detection: Native APK vs Website
  // ---------------------------------------------------------------------------
  const isNativeApk = typeof window !== 'undefined' && (
    window.Capacitor?.isNativePlatform?.() || 
    window.Android !== undefined ||
    window.location.protocol === 'capacitor:' ||
    window.location.protocol === 'file:' ||
    window.location.hostname.includes('appassets') || 
    window.location.hostname.includes('davportal') ||
    (navigator.userAgent && navigator.userAgent.includes('DAVSmartPortalApp'))
  );

  // Manual APK Simulator toggle (allows testing APK mode on web)
  const [isApkModeSimulated, setIsApkModeSimulated] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_apk_focus_mode');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const isApkActive = isNativeApk || isApkModeSimulated;

  const handleToggleApkMode = (targetState) => {
    setIsApkModeSimulated(targetState);
    try {
      localStorage.setItem('dav_apk_focus_mode', String(targetState));
    } catch (e) {}
    if (targetState) {
      setActiveSectionTab('focus');
    } else {
      setActiveSectionTab('leaderboard');
    }
  };

  // ---------------------------------------------------------------------------
  // Tab State: In APK mode, user can switch between 'focus' and 'leaderboard'.
  // On Website, always remains 'leaderboard'.
  // ---------------------------------------------------------------------------
  const [activeSectionTab, setActiveSectionTab] = useState(() => {
    if (!isApkActive) return 'leaderboard';
    try {
      const saved = localStorage.getItem('dav_section9_tab');
      return saved === 'leaderboard' ? 'leaderboard' : 'focus';
    } catch (e) {
      return 'focus';
    }
  });

  const handleSelectSectionTab = (tab) => {
    setActiveSectionTab(tab);
    try {
      localStorage.setItem('dav_section9_tab', tab);
    } catch (e) {}
  };

  // ---------------------------------------------------------------------------
  // Filter & Search Controls
  // ---------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all'); // 'all' | '8' | '9' | '10' | '11' | '12'
  const [selectedTierFilter, setSelectedTierFilter] = useState('all'); // 'all' | 'Gold' | 'Silver' | 'Bronze' | 'Platinum' | 'Iron'
  const [timeframeFilter, setTimeframeFilter] = useState('all_time'); // 'all_time' | 'weekly' | 'today'

  // ---------------------------------------------------------------------------
  // Accumulated Study Duration (in milliseconds)
  // ---------------------------------------------------------------------------
  const [accumulatedStudyMs, setAccumulatedStudyMs] = useState(() => {
    try {
      const uid = (user?.id || 'rishibhai').toLowerCase();
      const saved = localStorage.getItem(`dav_study_ms_${uid}`);
      return saved ? parseInt(saved, 10) : 3600000 * 4.5;
    } catch (e) {
      return 3600000 * 4.5;
    }
  });

  const handleAccumulateMs = (deltaMs) => {
    setAccumulatedStudyMs(prev => {
      const next = prev + deltaMs;
      try {
        const uid = (user?.id || 'rishibhai').toLowerCase();
        localStorage.setItem(`dav_study_ms_${uid}`, String(next));
      } catch (e) {}
      return next;
    });
  };

  // Quick Study Boost Handler with chime sound
  const [recentBoostMsg, setRecentBoostMsg] = useState(null);
  const handleQuickBoost = (mins) => {
    const deltaMs = mins * 60 * 1000;
    handleAccumulateMs(deltaMs);
    focusDataStore.recordActiveStudySeconds(mins * 60);
    ambientAudio.playBellChime();
    setRecentBoostMsg(`+${mins} min study streak logged! Your rank increased.`);
    setTimeout(() => setRecentBoostMsg(null), 3500);
  };

  // ---------------------------------------------------------------------------
  // Canvas Animation: Floating Golden Starlight & Nebula Net
  // ---------------------------------------------------------------------------
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = canvas.offsetWidth || 1200);
    let height = (canvas.height = canvas.offsetHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 1200;
      height = canvas.height = canvas.offsetHeight || 800;
    };
    window.addEventListener('resize', handleResize);

    const stars = [];
    const starCount = 38;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.7 + 0.3,
        hue: Math.random() > 0.5 ? 42 : 160
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move stars
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue === 42 ? `rgba(251, 191, 36, ${s.alpha})` : `rgba(52, 211, 153, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.hue === 42 ? 'rgba(251, 191, 36, 0.6)' : 'rgba(52, 211, 153, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Time formatters
  const formatTimeFull = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const formatHoursShort = (ms) => {
    const hours = (ms / 3600000).toFixed(1);
    return `${hours} hrs`;
  };

  // ---------------------------------------------------------------------------
  // Leaderboard Data Computation (Preloaded Users + Active User)
  // ---------------------------------------------------------------------------
  const leaderboardData = useMemo(() => {
    const users = getRegisteredUsers();
    const computed = users.map((u, idx) => {
      let baseMs = 3600000 * (18 - idx * 0.14);
      if (baseMs < 3600000 * 2) baseMs = 3600000 * (2 + (idx % 5) * 0.4);
      return {
        id: u.id,
        name: u.name,
        classNum: u.classNum,
        section: u.section,
        dimension: u.dimension || 1,
        totalMs: baseMs
      };
    });

    // Merge or update current user
    const currentUid = (user?.id || 'rishibhai').toLowerCase();
    const existingIdx = computed.findIndex(u => (u.id || '').toLowerCase() === currentUid);
    if (existingIdx !== -1) {
      computed[existingIdx].totalMs = accumulatedStudyMs;
    } else if (user) {
      computed.push({
        id: user.id || 'user_curr',
        name: user.name || 'Scholar',
        classNum: user.classNum || '10',
        section: user.section || 'A',
        dimension: user.dimension || 1,
        totalMs: accumulatedStudyMs
      });
    }

    const activeOnly = computed.filter(c => c.totalMs > 0);
    activeOnly.sort((a, b) => b.totalMs - a.totalMs);
    const top100 = activeOnly.slice(0, 100);

    return top100.map((entry, idx) => {
      const rank = idx + 1;
      let tier = 'Iron';
      let tierColor = 'text-stone-400 bg-stone-900 border-stone-700';
      let tierBadge = '🛡️ Iron Tier';

      if (rank >= 1 && rank <= 5) {
        tier = 'Gold';
        tierColor = 'text-amber-400 bg-amber-950/80 border-amber-500/80';
        tierBadge = '👑 Gold Vanguard';
      } else if (rank >= 6 && rank <= 15) {
        tier = 'Silver';
        tierColor = 'text-slate-200 bg-slate-800 border-slate-500';
        tierBadge = '⚡ Silver Scholar';
      } else if (rank >= 16 && rank <= 30) {
        tier = 'Bronze';
        tierColor = 'text-amber-600 bg-amber-950/50 border-amber-700';
        tierBadge = '🎖️ Bronze Scholar';
      } else if (rank >= 31 && rank <= 60) {
        tier = 'Platinum';
        tierColor = 'text-cyan-300 bg-cyan-950/80 border-cyan-500';
        tierBadge = '💎 Platinum Elite';
      } else {
        tier = 'Iron';
        tierColor = 'text-stone-400 bg-stone-900 border-stone-700';
        tierBadge = '🛡️ Iron Tier';
      }

      return {
        ...entry,
        rank,
        tier,
        tierColor,
        tierBadge
      };
    });
  }, [accumulatedStudyMs, user]);

  // Filtered Leaderboard
  const filteredLeaderboard = useMemo(() => {
    return leaderboardData.filter(s => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          `class ${s.classNum}`.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedClassFilter !== 'all') {
        if (String(s.classNum) !== selectedClassFilter) return false;
      }
      if (selectedTierFilter !== 'all') {
        if (s.tier !== selectedTierFilter) return false;
      }
      return true;
    });
  }, [leaderboardData, searchQuery, selectedClassFilter, selectedTierFilter]);

  // Current User Position
  const currentUserEntry = useMemo(() => {
    const uid = (user?.id || 'rishibhai').toLowerCase();
    const found = leaderboardData.find(e => (e.id || '').toLowerCase() === uid);
    if (found) return found;
    return {
      rank: 42,
      name: user?.name || 'You',
      classNum: user?.classNum || '10',
      section: user?.section || 'A',
      tier: 'Silver',
      tierBadge: '⚡ Silver Scholar',
      totalMs: accumulatedStudyMs
    };
  }, [leaderboardData, user, accumulatedStudyMs]);

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#070b12] text-slate-100 flex flex-col font-sans select-none pb-28 overflow-x-hidden">
      
      {/* Dynamic Animated Starfield & Golden Nebula Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40"
      />

      {/* Floating Rank Boost Toast */}
      {recentBoostMsg && (
        <div className="fixed top-20 right-6 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-amber-300 animate-bounce">
          <Sparkles className="w-4 h-4 text-stone-950" />
          <span>{recentBoostMsg}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Top Header Banner: Tailored for Website vs APK Mode          */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/80 border-b border-amber-500/20 px-4 sm:px-8 py-5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Section Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-amber-600/10 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg shadow-amber-500/20 ring-2 ring-amber-500/20">
              <Trophy className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-600/50 shadow-sm">
                  Section 9 • Scholastic Arena
                </span>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all ${
                  isApkActive 
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {isApkActive ? '📱 APK Focus Suite Active' : '🌐 Campus Scholastic Leaderboard'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>{isApkActive ? 'Campus Arena & ReGain Focus OS' : 'Campus Scholastic Leaderboard'}</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-mono text-stone-300 border border-stone-700">
                  DAV Top 100
                </span>
              </h1>
            </div>
          </div>

          {/* Controls Area */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* IN APK MODE ONLY: Dual Tabs (Focus Suite vs Leaderboard) */}
            {isApkActive && (
              <div className="flex items-center gap-1.5 bg-stone-900/90 p-1.5 rounded-2xl border border-stone-800 shadow-inner">
                <button
                  type="button"
                  onClick={() => handleSelectSectionTab('focus')}
                  className={`py-2 px-4 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                    activeSectionTab === 'focus'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-md ring-1 ring-emerald-300/40'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>1. ReGain Focus OS</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectSectionTab('leaderboard')}
                  className={`py-2 px-4 rounded-xl text-xs font-black transition flex items-center gap-2 cursor-pointer ${
                    activeSectionTab === 'leaderboard'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md ring-1 ring-amber-300/40'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>2. Campus Leaderboard</span>
                </button>
              </div>
            )}

            {/* Quick APK Simulator Toggle / Exit Button */}
            {isApkModeSimulated ? (
              <button
                type="button"
                onClick={() => handleToggleApkMode(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-purple-950 text-purple-200 border border-purple-500/60 hover:bg-purple-900 transition flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <Smartphone className="w-4 h-4 text-purple-400" />
                <span>Exit APK Mode</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleToggleApkMode(true)}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition flex items-center gap-1.5 cursor-pointer"
                title="Preview APK Focus OS & Reel Scroller in Android Phone Shell"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Preview APK View</span>
              </button>
            )}

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Main Body Content                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* ========================================================================= */}
        {/* VIEW 1: CAMPUS SCHOLASTIC LEADERBOARD (WEBSITE DEFAULT)                   */}
        {/* ========================================================================= */}
        {(!isApkActive || activeSectionTab === 'leaderboard') && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Current User Standing Quick Widget & Live Booster */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-amber-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                      {currentUserEntry.name.charAt(0)}
                    </div>
                    <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-stone-900 text-[10px] font-mono font-black text-amber-400 border border-amber-500/50">
                      #{currentUserEntry.rank}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-black text-white">{currentUserEntry.name}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-stone-950">
                        Active Scholar
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Class {currentUserEntry.classNum}-{currentUserEntry.section} • {currentUserEntry.tierBadge}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs font-mono">
                      <span className="text-emerald-400 font-bold">
                        Accumulated: {formatTimeFull(currentUserEntry.totalMs)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Boost Rank Buttons */}
                <div className="flex flex-wrap items-center gap-2 bg-stone-950/80 p-3 rounded-2xl border border-stone-800">
                  <span className="text-xs font-bold text-stone-400 mr-2 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Boost Rank:</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickBoost(15)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 cursor-pointer transition active:scale-95"
                  >
                    +15m
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickBoost(30)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 cursor-pointer transition active:scale-95"
                  >
                    +30m
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickBoost(60)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-stone-950 font-mono text-xs font-black shadow-md cursor-pointer transition active:scale-95"
                  >
                    +1h Superboost
                  </button>
                </div>

              </div>
            </div>

            {/* TOP 3 PODIUM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Rank 2 - Silver */}
              {top3[1] && (
                <div className="order-2 md:order-1 rounded-3xl bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-700/80 p-6 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-300 to-slate-500 text-stone-950 font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-slate-400/20 mb-3">
                    {top3[1].name.charAt(0)}
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-slate-800 text-slate-200 text-xs font-bold border border-slate-600 mb-1">
                    🥈 Rank #2
                  </span>
                  <h4 className="text-base font-black text-white">{top3[1].name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Class {top3[1].classNum}-{top3[1].section}</p>
                  <div className="mt-3 font-mono text-sm font-black text-slate-200">
                    {formatTimeFull(top3[1].totalMs)}
                  </div>
                  <span className="text-[10px] text-slate-400">{top3[1].tierBadge}</span>
                </div>
              )}

              {/* Rank 1 - Gold (Central & Elevated) */}
              {top3[0] && (
                <div className="order-1 md:order-2 rounded-3xl bg-gradient-to-b from-amber-950/90 via-stone-900 to-stone-950 border-2 border-amber-400 p-7 flex flex-col items-center text-center shadow-2xl relative overflow-hidden transform md:-translate-y-2 ring-4 ring-amber-500/20">
                  <div className="absolute top-2 right-2">
                    <CrownBadge />
                  </div>
                  <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-stone-950 font-black text-3xl flex items-center justify-center shadow-xl ring-4 ring-amber-400/40 mb-3 animate-pulse">
                    {top3[0].name.charAt(0)}
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-xs font-black uppercase tracking-wider shadow-md mb-1">
                    👑 Rank #1 Vanguard
                  </span>
                  <h4 className="text-lg font-black text-white">{top3[0].name}</h4>
                  <p className="text-xs text-amber-200/80 mt-0.5">Class {top3[0].classNum}-{top3[0].section}</p>
                  <div className="mt-3 font-mono text-base font-black text-amber-300">
                    {formatTimeFull(top3[0].totalMs)}
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold">{top3[0].tierBadge}</span>
                </div>
              )}

              {/* Rank 3 - Bronze */}
              {top3[2] && (
                <div className="order-3 md:order-3 rounded-3xl bg-gradient-to-b from-amber-950/40 to-stone-900 border border-amber-800/60 p-6 flex flex-col items-center text-center shadow-xl relative overflow-hidden">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-amber-700/20 mb-3">
                    {top3[2].name.charAt(0)}
                  </div>
                  <span className="px-3 py-0.5 rounded-full bg-amber-950 text-amber-400 text-xs font-bold border border-amber-700 mb-1">
                    🥉 Rank #3
                  </span>
                  <h4 className="text-base font-black text-white">{top3[2].name}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Class {top3[2].classNum}-{top3[2].section}</p>
                  <div className="mt-3 font-mono text-sm font-black text-amber-400">
                    {formatTimeFull(top3[2].totalMs)}
                  </div>
                  <span className="text-[10px] text-stone-400">{top3[2].tierBadge}</span>
                </div>
              )}

            </div>

            {/* SEARCH & FILTERS BAR */}
            <div className="p-4 sm:p-5 rounded-3xl bg-stone-900/90 border border-stone-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xl">
              
              {/* Search Field */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholar name, admission ID, or class..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">Class:</span>
                {['all', '8', '9', '10', '11', '12'].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      selectedClassFilter === cls
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                        : 'bg-stone-950 text-stone-400 hover:text-white border-stone-800'
                    }`}
                  >
                    {cls === 'all' ? 'All' : `Class ${cls}`}
                  </button>
                ))}
              </div>

              {/* Tier Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mr-1">Tier:</span>
                {['all', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedTierFilter(tier)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      selectedTierFilter === tier
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                        : 'bg-stone-950 text-stone-400 hover:text-white border-stone-800'
                    }`}
                  >
                    {tier === 'all' ? 'All Tiers' : tier}
                  </button>
                ))}
              </div>

            </div>

            {/* TOP 100 SCHOLARS LIST */}
            <div className="rounded-3xl bg-stone-900/80 border border-stone-800 shadow-xl overflow-hidden divide-y divide-stone-800/80">
              
              <div className="p-4 bg-stone-950/90 text-stone-400 text-xs font-bold uppercase tracking-wider flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center space-x-4">
                  <span className="w-10 text-center">Rank</span>
                  <span>Scholar</span>
                </div>
                <div className="text-right">
                  <span>Accumulated Study Time</span>
                </div>
              </div>

              {filteredLeaderboard.slice(0, 100).map((student) => {
                const isCurrentUser = (student.id || '').toLowerCase() === (user?.id || 'rishibhai').toLowerCase();
                return (
                  <div
                    key={student.id + student.rank}
                    className={`p-4 flex items-center justify-between transition-colors ${
                      isCurrentUser
                        ? 'bg-amber-500/10 border-l-4 border-amber-500'
                        : 'hover:bg-stone-850/60'
                    }`}
                  >
                    <div className="flex items-center space-x-4 min-w-0 pr-4">
                      {/* Rank Badge */}
                      <div className="w-10 text-center font-mono font-black text-sm text-amber-400">
                        #{student.rank}
                      </div>

                      {/* Avatar */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs text-white flex-shrink-0 ${
                        student.rank === 1 ? 'bg-amber-500 text-stone-950 ring-2 ring-amber-400' :
                        student.rank === 2 ? 'bg-slate-700 text-white' :
                        student.rank === 3 ? 'bg-amber-800 text-white' :
                        'bg-slate-800 border border-slate-700'
                      }`}>
                        {student.name.charAt(0)}
                      </div>

                      {/* Name & Class */}
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
                          {isCurrentUser && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-amber-500 text-stone-950">
                              YOU
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          Class {student.classNum}-{student.section} • {student.tierBadge}
                        </p>
                      </div>
                    </div>

                    {/* Time Counter */}
                    <div className="text-right flex-shrink-0">
                      <div className="font-mono text-sm font-black text-emerald-400">
                        {formatTimeFull(student.totalMs)}
                      </div>
                      <span className="text-[10px] text-stone-500">
                        {formatHoursShort(student.totalMs)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom APK Showcase Card (Respectful & Clean) */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950/40 via-stone-900 to-stone-950 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/40 flex items-center justify-center text-xl flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <span>Looking for ReGain Focus OS, Real Reels Counter &amp; App Stopper?</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">Exclusive to Android APK</span>
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    OS-level background app interception, doomscroll velocity tracking, and anti-uninstall protection require our featherweight 2.8 MB Android APK.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleApkMode(true)}
                  className="px-4 py-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border border-stone-700"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Preview APK Simulation</span>
                </button>

                <a
                  href="/DAV_Smart_Portal.apk"
                  download="DAV_Smart_Portal.apk"
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 text-white text-xs font-black uppercase tracking-wider transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK (2.8 MB)</span>
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DEEP STUDY FOCUS SUITE (APK MODE ONLY)                            */}
        {/* ========================================================================= */}
        {isApkActive && activeSectionTab === 'focus' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* APK Mode Notification Bar if active */}
            {isApkModeSimulated && (
              <div className="p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 flex items-center justify-between text-xs text-purple-200 shadow-lg">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    <strong>APK Focus OS Mode Active:</strong> Simulating native Android focus lockouts, real reel counter, background app stopper &amp; anti-uninstall protection.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleApkMode(false)}
                  className="text-xs font-bold text-purple-300 hover:text-white underline cursor-pointer shrink-0 ml-2"
                >
                  Back to Website Leaderboard
                </button>
              </div>
            )}

            {/* Mount the complete Digital Focus Suite */}
            <DigitalFocusSuite 
              user={user}
              accumulatedStudyMs={accumulatedStudyMs}
              onAccumulateMs={handleAccumulateMs}
            />

          </div>
        )}

      </div>
    </div>
  );
}

function CrownBadge() {
  return (
    <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs font-bold">
      👑
    </div>
  );
}
