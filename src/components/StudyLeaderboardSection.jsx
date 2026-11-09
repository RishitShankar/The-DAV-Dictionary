import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, Flame, Clock, Target, Sparkles, Award, Star, CheckCircle2, 
  User, Search, BookOpen, Brain, Zap, Bell, Check, BarChart3, Medal, 
  Smartphone, Monitor, ArrowRight, ShieldCheck, RefreshCw, Compass,
  Sliders, Filter, ChevronUp, ChevronDown, Heart, Layers
} from 'lucide-react';

import { getRegisteredUsers } from '../data/preloadedUsers';
import { DigitalFocusSuite } from './DigitalFocusSuite';

export function StudyLeaderboardSection({ user, onRequireLogin }) {
  // Application Mode Toggle: Web Mode (Leaderboard only) vs APK Mode (Focus + Leaderboard)
  const [isApkMode, setIsApkMode] = useState(() => {
    try {
      return localStorage.getItem('dav_apk_focus_mode') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [activeTabInApk, setActiveTabInApk] = useState('focus'); // 'focus' | 'leaderboard'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all'); // 'all' | '8' | '9' | '10' | '11' | '12'
  const [timeframeFilter, setTimeframeFilter] = useState('all_time'); // 'today' | 'week' | 'all_time'
  const [selectedTierFilter, setSelectedTierFilter] = useState('all'); // 'all' | 'Gold' | 'Silver' | 'Bronze' | 'Iron'

  // Total accumulated study ms for current user
  const [accumulatedStudyMs, setAccumulatedStudyMs] = useState(() => {
    try {
      const uid = (user?.id || 'rishibhai').toLowerCase();
      const saved = localStorage.getItem(`dav_study_ms_${uid}`);
      return saved ? parseInt(saved, 10) : 3600000 * 2.5; // default 2.5h
    } catch (e) {
      return 3600000 * 2.5;
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

  const handleToggleApkMode = (targetState) => {
    setIsApkMode(targetState);
    try {
      localStorage.setItem('dav_apk_focus_mode', String(targetState));
    } catch (e) {}
  };

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

  // Leaderboard data calculation
  const leaderboardData = useMemo(() => {
    const allUsers = getRegisteredUsers();
    const realUsers = allUsers.filter(u => {
      if (u.plan === 'guest' || u.plan === 'demo' || u.isDemo) return false;
      return true;
    });

    const computed = realUsers.map(u => {
      const uid = (u.id || '').toLowerCase();
      let ms = 0;
      if (uid === (user?.id || '').toLowerCase()) {
        ms = accumulatedStudyMs;
      } else {
        const saved = localStorage.getItem(`dav_study_ms_${uid}`);
        if (saved) {
          ms = parseInt(saved, 10);
        } else {
          if (uid === 'rishibhai') ms = 3600000 * 18.5;
          else if (uid === 'saharsh') ms = 3600000 * 14.2;
          else ms = 3600000 * (4 + (u.name ? u.name.length % 8 : 2));
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

  // Filtered by Search, Class, and Tier
  const filteredLeaderboard = useMemo(() => {
    return leaderboardData.filter(s => {
      // Search
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
    const uid = (user?.id || '').toLowerCase();
    return leaderboardData.find(e => (e.id || '').toLowerCase() === uid) || {
      rank: 42,
      name: user?.name || 'You',
      tier: 'Silver',
      totalMs: accumulatedStudyMs
    };
  }, [leaderboardData, user, accumulatedStudyMs]);

  const top3 = leaderboardData.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans select-none pb-24">
      
      {/* ------------------------------------------------------------- */}
      {/* Top Header Banner with Mode Selector                          */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-b border-amber-500/30 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                  Section 9 • Scholastic Arena
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isApkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'}`}>
                  {isApkMode ? '📱 Focus APK Mode Active' : '🌐 Web Leaderboard Mode'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {isApkMode ? 'DAV Focus Suite & Campus Leaderboard' : 'DAV Campus Study Leaderboard'}
              </h1>
            </div>
          </div>

          {/* Mode Switcher Pill */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => handleToggleApkMode(false)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                !isApkMode
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Website Mode (Leaderboard Only)</span>
            </button>

            <button
              type="button"
              onClick={() => handleToggleApkMode(true)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isApkMode
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Focus APK Mode</span>
            </button>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Main Container                                                */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* MODE A: WEBSITE MODE (CAMPUS LEADERBOARD ONLY)                            */}
        {/* ========================================================================= */}
        {!isApkMode && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Banner Callout for APK Mode */}
            <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    Need Deep Study Focus, BrainPal Reels Counter & Anti-Uninstall Shield?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Switch to <strong>Focus APK Mode</strong> to unlock the complete ReGain & BrainPal Digital Focus OS.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleApkMode(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition shrink-0"
              >
                <span>Switch to Focus APK Mode ⚡</span>
              </button>
            </div>

            {/* Top 3 Podium Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {top3.map((champ, i) => (
                <div
                  key={champ.id}
                  className={`p-6 rounded-3xl border flex flex-col justify-between h-48 relative overflow-hidden shadow-2xl ${
                    i === 0
                      ? 'bg-gradient-to-br from-amber-950/80 via-stone-900 to-black border-amber-400/80 ring-2 ring-amber-500/30'
                      : i === 1
                      ? 'bg-gradient-to-br from-slate-800 via-stone-900 to-black border-slate-400/60'
                      : 'bg-gradient-to-br from-amber-950/40 via-stone-900 to-black border-amber-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-3xl">{i === 0 ? '👑' : i === 1 ? '🥈' : '🥉'}</span>
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase font-mono bg-black/60 text-white border border-white/20">
                      Rank #{champ.rank}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white truncate">{champ.name}</h3>
                    <p className="text-xs text-stone-400">Class {champ.classNum}-{champ.section} • {champ.tierBadge}</p>
                    <div className="text-xl font-mono font-black text-amber-400 mt-2">
                      {formatHoursShort(champ.totalMs)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Filters Bar: Search, Class, Tier */}
            <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              {/* Search input */}
              <div className="relative flex-1 min-w-[220px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search students, roll no, class..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Class Selector */}
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                {['all', '8', '9', '10', '11', '12'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClassFilter(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
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
              {filteredLeaderboard.map((student) => {
                const isCurrentUser = (student.id || '').toLowerCase() === (user?.id || '').toLowerCase();
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
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
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
                      <span className="text-[10px] text-stone-500">Study Duration</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE B: APPLICATION / APK MODE (BOTH FOCUS SUITE & LEADERBOARD ACTIVE)   */}
        {/* ========================================================================= */}
        {isApkMode && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* APK Mode 2-Tab Navigation Bar */}
            <div className="flex items-center justify-between gap-4 p-2 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTabInApk('focus')}
                  className={`py-2 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    activeTabInApk === 'focus'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>1. Deep Focus & Screen Time Suite</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTabInApk('leaderboard')}
                  className={`py-2 px-5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition cursor-pointer ${
                    activeTabInApk === 'leaderboard'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>2. Campus Leaderboard</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleToggleApkMode(false)}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer pr-2 hidden sm:inline"
              >
                Exit APK Mode
              </button>
            </div>

            {/* Tab 1: Deep Study Focus Suite */}
            {activeTabInApk === 'focus' && (
              <DigitalFocusSuite 
                user={user}
                accumulatedStudyMs={accumulatedStudyMs}
                onAccumulateMs={handleAccumulateMs}
              />
            )}

            {/* Tab 2: Campus Leaderboard */}
            {activeTabInApk === 'leaderboard' && (
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-900/90 border border-slate-800 divide-y divide-slate-800/80 overflow-hidden shadow-2xl">
                  {filteredLeaderboard.map((student) => (
                    <div
                      key={student.id}
                      className="p-4 flex items-center justify-between hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-center space-x-4 min-w-0 pr-4">
                        <div className="w-10 text-center font-mono font-black text-sm text-amber-400">
                          #{student.rank}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white flex-shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
                          <p className="text-xs text-slate-400">
                            Class {student.classNum}-{student.section} • {student.tierBadge}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-sm font-black text-emerald-400">
                          {formatTimeFull(student.totalMs)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
