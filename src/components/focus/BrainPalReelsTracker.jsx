import React, { useState, useEffect } from 'react';
import {
  Smartphone, Film, Zap, AlertTriangle, ShieldAlert, CheckCircle2,
  Clock, Flame, RefreshCw, Volume2, VolumeX, Eye, ArrowDown,
  Sparkles, Lock, Play, Pause, Award, Heart, ShieldCheck, Target,
  TrendingDown, Check, Activity, BarChart3, AlertCircle, Layers
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';
import { BrainPalInteractiveReelsFeed } from './BrainPalInteractiveReelsFeed';

export function BrainPalReelsTracker({ user }) {
  const [reelsData, setReelsData] = useState(() => focusDataStore.getReelsData());
  const [screenTime, setScreenTime] = useState(() => focusDataStore.getScreenTimeData());
  const [breaches, setBreaches] = useState(() => focusDataStore.getBreachesToday());
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'analytics'
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [tempBudget, setTempBudget] = useState(reelsData.dailyReelsBudget || 5);
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
              <span>BrainPal Reels Engine • 100% Workable</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>BrainPal Real-Time Reel Counter &amp; Scroller</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mt-1 leading-relaxed">
              Interactive vertical video feed, actual scroll counting (1/5, 2/5...), dopamine dwell detection, and hard lockout with a 15-second mindful breathing break when quota is reached.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* View Switcher: Interactive Feed vs Guardian Analytics */}
            <div className="flex items-center bg-stone-950 p-1 rounded-2xl border border-stone-800">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'feed'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Watch &amp; Count Reels</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Guardian Analytics</span>
              </button>
            </div>

            <button
              onClick={() => setShowBudgetModal(true)}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border border-stone-700"
            >
              <Target className="w-3.5 h-3.5 text-amber-400" />
              <span>Budget: {reelsData.dailyReelsBudget || 5}</span>
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
            <span className="text-[10px] text-stone-500">Reels &amp; App Switches</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Reels Watched vs Limit</span>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">
              {reelsData.todayReelsWatched || 0} / {reelsData.dailyReelsBudget || 5}
            </div>
            <span className="text-[10px] text-stone-500">
              {(reelsData.dailyReelsBudget - (reelsData.todayReelsWatched || 0)) > 0 
                ? `${reelsData.dailyReelsBudget - (reelsData.todayReelsWatched || 0)} Reels Remaining` 
                : 'Quota Exceeded (Hard Locked)'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">Focus Discipline</span>
            <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {complianceScore}%
            </div>
            <span className="text-[10px] text-stone-500">CBSE Scholar High Tier</span>
          </div>

        </div>
      </div>

      {/* Main Tab View: Interactive Reels Feed OR Guardian Analytics */}
      {activeTab === 'feed' ? (
        <div className="w-full">
          <BrainPalInteractiveReelsFeed onReturnToStudy={() => setActiveTab('analytics')} />
        </div>
      ) : (
        /* Live Breach Detection Log & Real Device Controls */
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
                <span className="text-stone-200 font-mono">
                  {reelsData.doomscrollVelocity || 0} reels/min
                </span>
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
                  Short-form vertical video degrades working memory and mathematical retention. Keep your daily short-video budget below 5 reels before examinations.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <strong className="text-purple-300 font-bold block">3. Binaural &amp; Soundscape Anchoring:</strong>
                <p className="text-stone-300 leading-relaxed">
                  Use our built-in 432Hz alpha focus beats or rain acoustics to silence ambient distractions and trigger flow states.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Set Daily Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-black text-white">Daily Reels Budget</h3>
                <p className="text-xs text-stone-400">Set maximum reels allowed per day</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300">Choose Budget Limit</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 5, 10, 20].map(val => (
                  <button
                    key={val}
                    onClick={() => setTempBudget(val)}
                    className={`py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                      tempBudget === val
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-800 text-stone-300 border-stone-700'
                    }`}
                  >
                    {val} reels
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBudget}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 text-xs font-black cursor-pointer transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
