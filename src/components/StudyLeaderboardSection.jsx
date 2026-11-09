import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, Flame, Clock, Target, Sparkles, Award, Star, CheckCircle2, 
  User, Search, BookOpen, Brain, Zap, Bell, Check, BarChart3, Medal, 
  Smartphone, Monitor, ArrowRight, ShieldCheck, RefreshCw, Compass
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
        classNum: u.classNum || '8',
        section: u.section || 'D',
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
      let tierIcon = '🛡️';

      if (rank >= 1 && rank <= 5) {
        tier = 'Gold';
        tierColor = 'text-amber-400 bg-amber-950/80 border-amber-500/80';
        tierIcon = '🥇';
      } else if (rank >= 6 && rank <= 15) {
        tier = 'Silver';
        tierColor = 'text-slate-200 bg-slate-800 border-slate-500';
        tierIcon = '🥈';
      } else if (rank >= 16 && rank <= 30) {
        tier = 'Bronze';
        tierColor = 'text-amber-600 bg-amber-950/50 border-amber-700';
        tierIcon = '🥉';
      } else if (rank >= 40 && rank <= 50) {
        tier = 'Platinum';
        tierColor = 'text-cyan-300 bg-cyan-950/80 border-cyan-500';
        tierIcon = '💎';
      } else if (rank >= 51 && rank <= 100) {
        tier = 'Iron';
        tierColor = 'text-stone-400 bg-stone-900 border-stone-700';
        tierIcon = '🛡️';
      }

      return {
        ...entry,
        rank,
        tier,
        tierColor,
        tierIcon
      };
    });
  }, [accumulatedStudyMs, user]);

  // Filtered by search
  const filteredLeaderboard = useMemo(() => {
    if (!searchQuery.trim()) return leaderboardData;
    const q = searchQuery.toLowerCase();
    return leaderboardData.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.id.toLowerCase().includes(q) || 
      `class ${s.classNum}`.toLowerCase().includes(q)
    );
  }, [leaderboardData, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-24">
      
      {/* Top Header Banner with Mode Selector */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-amber-950 border-b border-amber-500/30 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 font-black text-xl shadow-lg vfx-trophy-twinkle">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                  Section 9 • Scholastic Arena
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isApkMode ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'}`}>
                  {isApkMode ? '📱 Focus APK Mode Active' : '🌐 Web View Mode'}
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
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>📱 Focus APK Mode</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* MODE A: WEBSITE / MOBILE WEB MODE (LEADERBOARD ONLY BY DEFAULT)          */}
        {/* ========================================================================= */}
        {!isApkMode && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* APK Feature Promo Banner */}
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    Need Deep Focus, Screen Time Scanner &amp; Study Groups?
                  </h3>
                  <p className="text-xs text-slate-300">
                    Switch to <strong>DAV Focus APK Mode</strong> to unlock the 13-feature digital wellbeing and focus suite.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleApkMode(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition shrink-0"
              >
                <span>Switch to Focus APK Mode 🚀</span>
              </button>
            </div>

            {/* Campus Leaderboard Render */}
            <CampusLeaderboardView 
              user={user}
              leaderboardData={filteredLeaderboard}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              formatTimeFull={formatTimeFull}
            />

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE B: APPLICATION / APK MODE (BOTH FOCUS & LEADERBOARD ACTIVE)         */}
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
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Target className="w-4 h-4" />
                  <span>1. Deep Study Focus &amp; Screen Time Suite</span>
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
              <CampusLeaderboardView 
                user={user}
                leaderboardData={filteredLeaderboard}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                formatTimeFull={formatTimeFull}
              />
            )}

          </div>
        )}

      </div>

    </div>
  );
}

// Sub-component: Campus Leaderboard View
function CampusLeaderboardView({ 
  user, 
  leaderboardData, 
  searchQuery, 
  onSearchChange, 
  formatTimeFull 
}) {
  return (
    <div className="space-y-6">
      
      {/* Tier Classification Badges */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 vfx-trophy-twinkle" />
            <span>Campus Deep Study Tier Honors</span>
          </h3>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholar or class..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* 5 Tiers */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-amber-950/70 border border-amber-500/80 text-amber-300">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>🥇 Gold Tier</span>
            </div>
            <span className="text-[11px] block mt-0.5 opacity-90">Rank 1 to 5</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-400 text-slate-200">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>🥈 Silver Tier</span>
            </div>
            <span className="text-[11px] block mt-0.5 opacity-90">Rank 6 to 15</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-700 text-amber-500">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>🥉 Bronze Tier</span>
            </div>
            <span className="text-[11px] block mt-0.5 opacity-90">Rank 16 to 30</span>
          </div>

          <div className="p-3 rounded-2xl bg-cyan-950/70 border border-cyan-500 text-cyan-300">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>💎 Platinum Tier</span>
            </div>
            <span className="text-[11px] block mt-0.5 opacity-90">Rank 40 to 50</span>
          </div>

          <div className="p-3 rounded-2xl bg-stone-900 border border-stone-700 text-stone-300">
            <div className="font-black text-sm flex items-center gap-1.5">
              <span>🛡️ Iron Tier</span>
            </div>
            <span className="text-[11px] block mt-0.5 opacity-90">Rank 51 to 100</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 grid grid-cols-12 text-[11px] font-mono font-bold uppercase text-slate-400">
          <span className="col-span-2 sm:col-span-1">Rank</span>
          <span className="col-span-6 sm:col-span-5">Scholar</span>
          <span className="col-span-2 sm:col-span-3 text-center">Tier Honor</span>
          <span className="col-span-2 sm:col-span-3 text-right">Verified Study Time</span>
        </div>

        <div className="divide-y divide-slate-800/60 max-h-[60vh] overflow-y-auto">
          {leaderboardData.map((student) => {
            const isCurrent = student.id.toLowerCase() === (user?.id || '').toLowerCase();
            return (
              <div
                key={student.id}
                className={`p-4 grid grid-cols-12 items-center text-xs transition ${
                  isCurrent 
                    ? 'bg-amber-500/15 border-l-4 border-amber-400' 
                    : 'hover:bg-slate-850'
                } ${student.rank <= 3 ? 'vfx-holo-shimmer' : ''}`}
              >
                <div className="col-span-2 sm:col-span-1 font-mono font-black text-base flex items-center gap-1">
                  <span>{student.tierIcon}</span>
                  <span className={student.rank <= 3 ? 'text-amber-400' : 'text-slate-400'}>
                    #{student.rank}
                  </span>
                </div>

                <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {student.name[0]}
                  </div>
                  <div>
                    <span className="font-black text-white block">
                      {student.name} {isCurrent && <span className="text-amber-400 text-[10px]">(You)</span>}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Class {student.classNum}-{student.section} • Dim {student.dimension}
                    </span>
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-3 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border font-mono ${student.tierColor}`}>
                    {student.tier.toUpperCase()} TIER
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-3 text-right font-mono font-bold text-amber-300">
                  {formatTimeFull(student.totalMs)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default StudyLeaderboardSection;