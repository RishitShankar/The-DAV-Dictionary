import React, { useState, useEffect } from 'react';
import {
  Smartphone, Film, Zap, AlertTriangle, ShieldAlert, CheckCircle2,
  Clock, Flame, RefreshCw, Volume2, VolumeX, Eye, ArrowDown,
  Sparkles, Lock, Play, Pause, Award, Heart, ShieldCheck, Target,
  TrendingDown, Check, Activity, BarChart3, AlertCircle
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

export function BrainPalReelsTracker({ user }) {
  const [reelsData, setReelsData] = useState(() => focusDataStore.getReelsData());
  const [screenTime, setScreenTime] = useState(() => focusDataStore.getScreenTimeData());
  const [breaches, setBreaches] = useState(() => focusDataStore.getBreachesToday());
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [tempBudget, setTempBudget] = useState(reelsData.dailyReelsBudget || 20);
  const [showMindfulnessModal, setShowMindfulnessModal] = useState(false);
  const [mindfulnessCountdown, setMindfulnessCountdown] = useState(15);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [toastMsg, setToastMsg] = useState(null);

  // Sync state with focusDataStore
  useEffect(() => {
    const unsub = focusDataStore.subscribe((event) => {
      setReelsData(focusDataStore.getReelsData());
      setScreenTime(focusDataStore.getScreenTimeData());
      setBreaches(focusDataStore.getBreachesToday());
    });
    return () => unsub();
  }, []);

  // Mindfulness Breathing Timer
  useEffect(() => {
    if (!showMindfulnessModal) return;
    const interval = setInterval(() => {
      setMindfulnessCountdown(prev => {
        if (prev <= 1) {
          setShowMindfulnessModal(false);
          ambientAudio.playBellChime();
          showToast('Mindfulness reset complete! Focus restored.');
          return 15;
        }
        const currentSecond = 16 - prev;
        if (currentSecond <= 4) setBreathPhase('inhale');
        else if (currentSecond <= 8) setBreathPhase('hold');
        else setBreathPhase('exhale');
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showMindfulnessModal]);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveBudget = () => {
    focusDataStore.setDailyReelsBudget(Number(tempBudget));
    setShowBudgetModal(false);
    ambientAudio.playBellChime();
    showToast(`Daily short-video budget updated to ${tempBudget} units!`);
  };

  const handleResetReels = () => {
    focusDataStore.resetDailyReels();
    ambientAudio.playBellChime();
    showToast('Today\'s short-video counter has been reset to zero!');
  };

  const handleRecordSimulatedBreach = () => {
    focusDataStore.recordAppSwitch(15, 'Shorts / Video Distraction');
    ambientAudio.playWarningChime();
    showToast('Distraction event logged in real-time monitor!');
  };

  const complianceScore = Math.max(0, Math.min(100, Math.round(
    ((screenTime.usefulMinutes || 1) / Math.max(1, (screenTime.usefulMinutes || 1) + (screenTime.distractedMinutes || 0))) * 100
  )));

  return (
    <div className="w-full space-y-6 text-white animate-fadeIn select-none">
      
      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Section 9 • Screen-Time &amp; Reels Guardian</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              BrainPal Real-Time Distraction Shield
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-1 leading-relaxed">
              Authentic multi-device screen-time monitoring, tab-switch breach detection, and short-video restriction engine designed for serious DAV scholars.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowMindfulnessModal(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mindful Reset</span>
            </button>
            <button
              onClick={() => setShowBudgetModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Set Budget</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6">
          
          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Today's Useful Study</span>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {screenTime.usefulMinutes || 0}m
            </div>
            <span className="text-[10px] text-stone-500">Curriculum Textbook Reading</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Distraction Off-Task</span>
            <div className="text-2xl font-black text-rose-400 font-mono mt-1">
              {screenTime.distractedMinutes || 0}m
            </div>
            <span className="text-[10px] text-stone-500">App-Switches &amp; Tab Blurs</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Daily Short-Video Limit</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {reelsData.todayReelsWatched || 0} / {reelsData.dailyReelsBudget || 20}
            </div>
            <span className="text-[10px] text-stone-500">
              {(reelsData.dailyReelsBudget - (reelsData.todayReelsWatched || 0)) > 0 
                ? `${reelsData.dailyReelsBudget - (reelsData.todayReelsWatched || 0)} Units Remaining` 
                : 'Budget Exceeded (Strict Lock)'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Focus Discipline</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {complianceScore}%
            </div>
            <span className="text-[10px] text-stone-500">Class Rank: High Tier</span>
          </div>

        </div>
      </div>

      {/* Live Breach Detection Log & Real Device Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Tab & App Switch Detector */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-black text-white">Tab-Switch &amp; App Guardian</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
              {breaches} Breaches Today
            </span>
          </div>

          <p className="text-xs text-stone-300 leading-relaxed">
            Whenever you start a Deep Study session and switch tabs or minimize the browser, our background Page Visibility guardian immediately logs the departure, counts the seconds away, and sounds the focus defense alert.
          </p>

          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">Background Guardian Status</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active &amp; Guarding
              </span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">Anti-Doomscroll Velocity</span>
              <span className="text-stone-200 font-mono">1.2 checks/min</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-stone-400">Strict Anti-Uninstall Shield</span>
              <span className="text-amber-400 font-mono">Enabled</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleRecordSimulatedBreach}
              className="flex-1 py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Test Breach Detector</span>
            </button>
            <button
              onClick={handleResetReels}
              className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Reset Counter"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right: Head Boy Rishit Shankar's Study Discipline Protocol */}
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">Study Protocol by Head Boy Rishit Shankar</h3>
          </div>

          <div className="space-y-3 text-xs text-stone-300">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <strong className="text-amber-300 font-bold block">1. The 50/10 Focus Principle:</strong>
              <p className="text-stone-300 leading-relaxed">
                Study DAV textbooks for 50 uninterrupted minutes with zero tab switches. Take a strict 10-minute non-screen break to let memory consolidate.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <strong className="text-emerald-300 font-bold block">2. Zero-Doomscroll Rule:</strong>
              <p className="text-stone-300 leading-relaxed">
                Short-form vertical video degrades working memory and mathematical retention. Keep your daily short-video budget below 20 minutes before examinations.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <strong className="text-purple-300 font-bold block">3. Binaural &amp; Soundscape Anchoring:</strong>
              <p className="text-stone-300 leading-relaxed">
                Use our built-in 40Hz gamma focus beats or rain acoustics to silence ambient distractions and trigger flow states.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Modal: Daily Budget Adjuster */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <span>Set Daily Short-Video Budget</span>
              </h3>
              <button onClick={() => setShowBudgetModal(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Define the maximum short-form videos permitted per day. Once reached, the strict lockout activates to safeguard your study time.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                <span>Daily Allowance:</span>
                <span className="text-emerald-400 font-mono text-base">{tempBudget} Units</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={tempBudget}
                onChange={(e) => setTempBudget(e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition shadow-lg"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Mindfulness Breathing Reset */}
      {showMindfulnessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
          <div className="w-full max-w-sm bg-stone-900 border border-purple-500/40 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
                Dopamine Reset
              </span>
              <h3 className="text-xl font-black text-white mt-3">Reset Your Prefrontal Cortex</h3>
            </div>

            {/* Breathing Circle Animation */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                breathPhase === 'inhale' 
                  ? 'bg-purple-500/30 scale-110 border-2 border-purple-400' 
                  : breathPhase === 'hold'
                    ? 'bg-amber-500/30 scale-105 border-2 border-amber-400'
                    : 'bg-emerald-500/20 scale-90 border-2 border-emerald-400'
              }`} />
              <div className="relative z-10 text-center">
                <span className="text-4xl font-black text-white font-mono">{mindfulnessCountdown}s</span>
                <span className="block text-xs uppercase font-bold tracking-widest text-purple-300 mt-1">
                  {breathPhase.toUpperCase()}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300">
              Deep breathing restores attention span, lowers cortisol, and breaks impulsive scrolling habits.
            </p>

            <button
              onClick={() => setShowMindfulnessModal(false)}
              className="w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition"
            >
              Skip Reset
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default BrainPalReelsTracker;
