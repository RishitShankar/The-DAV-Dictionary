import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Trophy, Flame, Clock, Target, Sparkles, Award, Star, CheckCircle2, 
  User, Search, BookOpen, Brain, Zap, Bell, Check, BarChart3, Medal, 
  Smartphone, Monitor, ArrowRight, ShieldCheck, RefreshCw, Compass,
  Sliders, Filter, ChevronUp, ChevronDown, Heart, Layers, ArrowUpRight,
  Play, Volume2, ShieldAlert
} from 'lucide-react';

import { getRegisteredUsers } from '../data/preloadedUsers';
import { DigitalFocusSuite } from './DigitalFocusSuite';
import { focusDataStore, ambientAudio } from '../services/focusDataStore';

export function StudyLeaderboardSection({ user, onRequireLogin }) {
  // ---------------------------------------------------------------------------
  // State 1: Active Section Tab
  // 'leaderboard' (Campus Scholastic Arena) | 'focus' (ReGain & BrainPal Focus OS)
  // ---------------------------------------------------------------------------
  const [activeSectionTab, setActiveSectionTab] = useState(() => {
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
  // State 2: Focus APK Mode vs Website Scholastic Mode
  // ---------------------------------------------------------------------------
  const [isApkMode, setIsApkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_apk_focus_mode');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleToggleApkMode = (targetState) => {
    setIsApkMode(targetState);
    try {
      localStorage.setItem('dav_apk_focus_mode', String(targetState));
    } catch (e) {}
    // If switching to APK mode, default to Focus Suite
    if (targetState) {
      setActiveSectionTab('focus');
    }
  };

  // ---------------------------------------------------------------------------
  // State 3: Filter & Search Controls
  // ---------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all'); // 'all' | '8' | '9' | '10' | '11' | '12'
  const [selectedTierFilter, setSelectedTierFilter] = useState('all'); // 'all' | 'Gold' | 'Silver' | 'Bronze' | 'Platinum' | 'Iron'
  const [timeframeFilter, setTimeframeFilter] = useState('all_time'); // 'all_time' | 'weekly' | 'today'

  // ---------------------------------------------------------------------------
  // State 4: Accumulated Study Duration (in milliseconds)
  // ---------------------------------------------------------------------------
  const [accumulatedStudyMs, setAccumulatedStudyMs] = useState(() => {
    try {
      const uid = (user?.id || 'rishibhai').toLowerCase();
      const saved = localStorage.getItem(`dav_study_ms_${uid}`);
      return saved ? parseInt(saved, 10) : 3600000 * 4.5; // default 4.5h
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

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
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
        hue: Math.random() > 0.5 ? 42 : 160 // Gold (42) or Emerald (160)
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

      // Draw stars
      stars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.hue === 42 
          ? `rgba(251, 191, 36, ${s.alpha})`
          : `rgba(52, 211, 153, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.hue === 42 ? '#fbbf24' : '#34d399';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Format Helper: hh:mm:ss:ms
  const formatTimeFull = (totalMs) => {
    const hours = Math.floor(totalMs / 3600000);
    const mins = Math.floor((totalMs % 3600000) / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  const formatHoursShort = (totalMs) => {
    const hours = (totalMs / 3600000).toFixed(1);
    return `${hours} hrs`;
  };

  // ---------------------------------------------------------------------------
  // Leaderboard Computation
  // ---------------------------------------------------------------------------
  const leaderboardData = useMemo(() => {
    const allUsers = getRegisteredUsers();
    const realUsers = allUsers.filter(u => {
      if (u.plan === 'guest' || u.plan === 'demo' || u.isDemo) return false;
      return true;
    });

    const currentUid = (user?.id || 'rishibhai').toLowerCase();

    // Generate comprehensive list including default champions
    const computed = realUsers.map(u => {
      const uid = (u.id || '').toLowerCase();
      let ms = 0;
      if (uid === currentUid) {
        ms = accumulatedStudyMs;
      } else {
        const saved = localStorage.getItem(`dav_study_ms_${uid}`);
        if (saved) {
          ms = parseInt(saved, 10);
        } else {
          if (uid === 'rishibhai') ms = 3600000 * 24.5;
          else if (uid === 'saharsh') ms = 3600000 * 19.2;
          else if (uid === 'aaditya') ms = 3600000 * 16.8;
          else if (uid === 'ananya') ms = 3600000 * 15.4;
          else if (uid === 'pranav') ms = 3600000 * 14.1;
          else {
            const seed = (u.name || uid).charCodeAt(0) + (u.name || uid).length;
            ms = 3600000 * (3 + (seed % 10));
          }
        }
      }
      return {
        id: u.id,
        name: u.name || u.id,
        classNum: u.classNum || '10',
        section: u.section || 'A',
        dimension: u.dimension || 1,
        totalMs: ms
      };
    });

    // Make sure current user is always included even if newly registered
    const exists = computed.some(c => (c.id || '').toLowerCase() === currentUid);
    if (!exists && user) {
      computed.push({
        id: user.id,
        name: user.name || 'You',
        classNum: user.classNum || '8',
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
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          `class ${s.classNum}`.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Class filter
      if (selectedClassFilter !== 'all') {
        if (String(s.classNum) !== selectedClassFilter) return false;
      }
      // Tier filter
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
      classNum: user?.classNum || '8',
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
      {/* Top Header Banner: Branding, Mode Switcher & Tab Bar          */}
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
                  isApkMode 
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {isApkMode ? '📱 Focus APK Mode Active' : '🌐 Web Scholastic Portal'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Campus Scholastic Arena &amp; Focus OS</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-stone-800 text-[10px] font-mono text-stone-300 border border-stone-700">
                  DAV Toppers v4.5
                </span>
              </h1>
            </div>
          </div>

          {/* Controls: Mode Switcher & Dual Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* APK Mode Simulator Switch */}
            <button
              type="button"
              onClick={() => handleToggleApkMode(!isApkMode)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
                isApkMode
                  ? 'bg-purple-950/80 text-purple-200 border-purple-500/60 shadow-lg shadow-purple-900/30'
                  : 'bg-stone-900/80 text-stone-300 hover:text-white border-stone-700'
              }`}
              title="Toggle APK Mode with Simulated Android Phone Shell"
            >
              <Smartphone className={`w-4 h-4 ${isApkMode ? 'text-purple-400' : 'text-stone-400'}`} />
              <span className="hidden sm:inline">{isApkMode ? 'APK Mode: ON' : 'Switch to APK Mode'}</span>
            </button>

            {/* Dual Tabs (Focus Suite vs Scholastic Leaderboard) */}
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
                <span>1. ReGain Focus OS (Screen Time &amp; App Limits)</span>
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

          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Main Body Content                                             */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

        {/* ========================================================================= */}
        {/* VIEW 1: CAMPUS SCHOLASTIC LEADERBOARD                                     */}
        {/* ========================================================================= */}
        {activeSectionTab === 'leaderboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Banner Callout for ReGain Focus Suite */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/70 via-stone-900 to-teal-950/70 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center font-bold shadow-lg shadow-emerald-500/20 flex-shrink-0">
                  <Flame className="w-6 h-6 text-emerald-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2">
                    <span>ReGain Digital Focus OS &amp; BrainPal Reels Counter</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">100% Workable</span>
                  </h3>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Block distracting apps, track short-video doomscroll velocity, schedule study blocks &amp; anti-uninstall protection.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectSectionTab('focus')}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition shrink-0 transform hover:scale-105"
              >
                <span>Open Focus OS Suite ⚡</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

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
                    className="px-3 py-1.5 rounded-xl bg-stone-855 hover:bg-stone-800 text-xs font-bold text-stone-200 border border-stone-750 transition cursor-pointer hover:border-amber-400/50"
                  >
                    +15 min
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickBoost(30)}
                    className="px-3 py-1.5 rounded-xl bg-stone-855 hover:bg-stone-800 text-xs font-bold text-stone-200 border border-stone-750 transition cursor-pointer hover:border-amber-400/50"
                  >
                    +30 min
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickBoost(60)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-xs font-black text-stone-950 shadow-md transition cursor-pointer hover:scale-105"
                  >
                    +1 Hour 🚀
                  </button>
                </div>

              </div>
            </div>

            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {top3.map((champ, i) => (
                <div
                  key={champ.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between h-52 relative overflow-hidden shadow-2xl transition transform hover:scale-[1.02] ${
                    i === 0
                      ? 'bg-gradient-to-br from-amber-950/90 via-stone-900 to-black border-amber-400/80 ring-2 ring-amber-500/40 shadow-amber-500/10'
                      : i === 1
                      ? 'bg-gradient-to-br from-slate-800/90 via-stone-900 to-black border-slate-400/60 shadow-slate-500/10'
                      : 'bg-gradient-to-br from-amber-950/50 via-stone-900 to-black border-amber-700/60 shadow-amber-700/10'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl filter drop-shadow">
                      {i === 0 ? '👑' : i === 1 ? '🥈' : '🥉'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase font-mono bg-black/70 text-white border border-white/20 shadow-inner">
                      Rank #{champ.rank}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white truncate">{champ.name}</h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Class {champ.classNum}-{champ.section} • {champ.tierBadge}
                    </p>
                    <div className="text-2xl font-mono font-black text-amber-400 mt-3 flex items-center justify-between">
                      <span>{formatHoursShort(champ.totalMs)}</span>
                      <span className="text-[10px] uppercase font-mono text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                        {formatTimeFull(champ.totalMs)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Bar: Search, Class, Tier */}
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-xl backdrop-blur-xl">
              
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students by name, roll no, class..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              {/* Class Selector */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                {['all', '8', '9', '10', '11', '12'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedClassFilter === cls
                        ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                        : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-800'
                    }`}
                  >
                    {cls === 'all' ? 'All Grades' : `Class ${cls}`}
                  </button>
                ))}
              </div>

              {/* Tier Selector */}
              <div className="flex items-center space-x-1.5">
                {['all', 'Gold', 'Silver', 'Bronze'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTierFilter(tier)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTierFilter === tier
                        ? 'bg-white text-stone-950 font-black shadow-md'
                        : 'bg-stone-950 hover:bg-stone-850 text-stone-400 border border-stone-800'
                    }`}
                  >
                    {tier === 'all' ? 'All Tiers' : tier}
                  </button>
                ))}
              </div>

            </div>

            {/* Leaderboard Table List */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 divide-y divide-slate-800/80 overflow-hidden shadow-2xl">
              <div className="px-5 py-3 bg-stone-950/60 border-b border-stone-800 flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-stone-400 font-mono">
                <span>Rank &amp; Student</span>
                <span>Study Duration</span>
              </div>

              {filteredLeaderboard.map((student) => {
                const isCurrentUser = (student.id || '').toLowerCase() === (user?.id || 'rishibhai').toLowerCase();
                return (
                  <div
                    key={student.id}
                    className={`p-4 flex items-center justify-between transition-colors ${
                      isCurrentUser
                        ? 'bg-amber-950/40 border-l-4 border-l-amber-400'
                        : 'hover:bg-slate-850'
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

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: DEEP STUDY FOCUS SUITE (REGAIN & BRAINPAL ECOSYSTEM)               */}
        {/* ========================================================================= */}
        {activeSectionTab === 'focus' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* APK Mode Notification Bar if active */}
            {isApkMode && (
              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  <span><strong>APK Focus OS Mode Active:</strong> Simulating native Android focus lockouts, reel limits &amp; anti-uninstall protection.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleApkMode(false)}
                  className="text-[11px] font-bold text-purple-400 hover:text-white underline cursor-pointer"
                >
                  Exit APK Mode
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
