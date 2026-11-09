import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone, Film, Zap, AlertTriangle, ShieldAlert, CheckCircle2,
  Clock, Flame, RefreshCw, Volume2, VolumeX, Eye, ArrowDown,
  Sparkles, Lock, ChevronUp, ChevronDown, Play, Pause, Award,
  Heart, MessageCircle, Share2, ThumbsUp, Bookmark, Compass
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

export function BrainPalReelsTracker({ user }) {
  const [reelsData, setReelsData] = useState(() => focusDataStore.getReelsData());
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isFeedOpen, setIsFeedOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showMindfulnessModal, setShowMindfulnessModal] = useState(false);
  const [mindfulnessCountdown, setMindfulnessCountdown] = useState(15);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale | hold | exhale
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [tempBudget, setTempBudget] = useState(reelsData.dailyReelsBudget || 25);
  const [warningToast, setWarningToast] = useState(null);

  // Social interactions simulator on reels
  const [likedReels, setLikedReels] = useState({});
  const [savedReels, setSavedReels] = useState({});
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);

  // Monk mode challenge streak
  const [detoxStreakDays, setDetoxStreakDays] = useState(4);

  // Expanded 12 Real-world style Reels
  const comprehensiveReels = [
    {
      id: 'r1',
      creator: '@physics_galaxy',
      title: 'Rotational Dynamics in 60 Seconds! ⚡',
      type: 'study',
      views: '420K',
      likes: '48.2K',
      comments: '1,280',
      sound: 'Original Audio - Physics Galaxy',
      color: 'from-blue-900 to-indigo-950',
      description: 'Understanding moment of inertia about perpendicular axis with real world sphere example.'
    },
    {
      id: 'r2',
      creator: '@brainrot_central',
      title: 'POV: Me trying to study 5 min before exam 💀😭',
      type: 'brainrot',
      views: '1.2M',
      likes: '142K',
      comments: '4,109',
      sound: 'Sigma Trollface Phonk',
      color: 'from-red-950 to-stone-950',
      description: 'Literally opened the book and forgot how to read English lmao.'
    },
    {
      id: 'r3',
      creator: '@dav_toppers',
      title: 'How I scored 98.4% in CBSE Class 10 - Daily Timetable',
      type: 'study',
      views: '89K',
      likes: '12.5K',
      comments: '390',
      sound: 'Study Lofi Chill - DAV Beats',
      color: 'from-emerald-950 to-teal-950',
      description: 'Stop scrolling and follow this 3-hour deep focus Pomodoro routine.'
    },
    {
      id: 'r4',
      creator: '@random_memes_24',
      title: 'Bro thought he was him 🤣🤣 #viral #trending',
      type: 'distraction',
      views: '3.4M',
      likes: '380K',
      comments: '9,412',
      sound: 'Funny Laugh sound effect',
      color: 'from-amber-950 to-yellow-950',
      description: 'Wait till the very end to see what happens to the cat.'
    },
    {
      id: 'r5',
      creator: '@maths_wizard_dav',
      title: 'Integration by Parts Shortcut - Save 10 Minutes in Exam!',
      type: 'study',
      views: '310K',
      likes: '34K',
      comments: '810',
      sound: 'Calculus Ambient Synth',
      color: 'from-purple-950 to-slate-950',
      description: 'Tabular integration method explained clearly with algebraic-exponential polynomials.'
    },
    {
      id: 'r6',
      creator: '@skibidi_clips',
      title: 'Only in Ohio Sigma Rizz Moment 🗿🍷',
      type: 'brainrot',
      views: '4.8M',
      likes: '512K',
      comments: '18.2K',
      sound: 'Bass Boosted Phonk 8D',
      color: 'from-rose-950 to-zinc-950',
      description: 'Watch 4 times to unlock secret rizz aura.'
    },
    {
      id: 'r7',
      creator: '@dav_chem_lab',
      title: 'Redox Reactions in 3 Steps: Oxidation Number Method',
      type: 'study',
      views: '115K',
      likes: '19.4K',
      comments: '512',
      sound: 'Ambient Chemistry Synth',
      color: 'from-cyan-950 to-blue-950',
      description: 'Balancing acidic vs basic medium equations made dead simple for DAV midterms.'
    },
    {
      id: 'r8',
      creator: '@gamer_fails_daily',
      title: 'Clutch 1v4 in BGMI Bootcamp and then this happened 😱',
      type: 'distraction',
      views: '890K',
      likes: '94K',
      comments: '2,400',
      sound: 'Intense EDM Beat',
      color: 'from-amber-900 to-stone-950',
      description: 'Unbelievable spray transfer at 1 HP left!'
    }
  ];

  // Subscribe to data changes
  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'reels_updated') {
        setReelsData(data);
      }
    });
    return unsub;
  }, []);

  // Mindfulness 15s Countdown Timer
  useEffect(() => {
    let timer = null;
    let breathTimer = null;
    if (showMindfulnessModal && mindfulnessCountdown > 0) {
      timer = setInterval(() => {
        setMindfulnessCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      breathTimer = setInterval(() => {
        setBreathPhase(curr => {
          if (curr === 'inhale') return 'hold';
          if (curr === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [showMindfulnessModal, mindfulnessCountdown]);

  // Handle Swiping / Advancing to Next Reel
  const handleNextReel = () => {
    if (reelsData.hardLockoutActive) {
      ambientAudio.playBellChime();
      return;
    }

    const nextIndex = (currentReelIndex + 1) % comprehensiveReels.length;
    setCurrentReelIndex(nextIndex);

    // Increment reel in engine
    const updated = focusDataStore.incrementReelWatched();

    // Check Trigger Levels:
    // Level 1: Soft Warning at 10 reels
    if (updated.todayReelsWatched === 10) {
      setWarningToast({
        title: '⚠️ BrainPal Doomscroll Notice',
        message: 'You have consumed 10 reels in a row! Dopamine spike detected. Remember your DAV study targets.',
        tone: 'warning'
      });
      setTimeout(() => setWarningToast(null), 5000);
    }

    // Level 2: Mindfulness Intervention at 15 reels or every 10 reels
    if (updated.todayReelsWatched === 15 || (updated.todayReelsWatched > 15 && updated.todayReelsWatched % 10 === 0)) {
      setMindfulnessCountdown(15);
      setShowMindfulnessModal(true);
    }
  };

  const handlePrevReel = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex(prev => prev - 1);
    }
  };

  const toggleLike = (reelId) => {
    setLikedReels(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const toggleSave = (reelId) => {
    setSavedReels(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const currentReel = comprehensiveReels[currentReelIndex] || comprehensiveReels[0];
  const percentUsed = Math.min(100, Math.round((reelsData.todayReelsWatched / Math.max(1, reelsData.dailyReelsBudget)) * 100));

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'danger':
        return 'text-rose-400 bg-rose-950/80 border-rose-500/60';
      case 'high':
        return 'text-amber-400 bg-amber-950/80 border-amber-500/60';
      case 'moderate':
        return 'text-yellow-300 bg-yellow-950/70 border-yellow-500/40';
      default:
        return 'text-emerald-400 bg-emerald-950/70 border-emerald-500/40';
    }
  };

  return (
    <div className="w-full space-y-6 text-white">
      {/* Top Banner Alert Toast */}
      {warningToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md bg-stone-900/95 backdrop-blur-xl border border-amber-500/60 shadow-2xl shadow-amber-950/50 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300">
          <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-300">{warningToast.title}</h4>
            <p className="text-xs text-stone-300 mt-1">{warningToast.message}</p>
          </div>
        </div>
      )}

      {/* Main BrainPal Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-black border border-stone-800 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-800/80">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/40">
              <Film className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black tracking-tight text-white">BrainPal™ Reels Guardian</h2>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full">
                  AI Doomscroll Interceptor
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Active reel and short-form video counter, dopamine threshold guardian & instant friction locks.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto">
            <button
              onClick={() => {
                setTempBudget(reelsData.dailyReelsBudget);
                setShowBudgetModal(true);
              }}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 text-xs font-semibold text-stone-200 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Quota: {reelsData.dailyReelsBudget} Reels</span>
            </button>
            <button
              onClick={() => focusDataStore.resetDailyReels()}
              className="px-3.5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-400 hover:text-stone-200 transition-all"
              title="Reset today's count"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* Card 1: Reels Watched */}
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-4 border border-stone-800/80 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Reels Watched</span>
              <Smartphone className="w-4 h-4 text-rose-400" />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-3xl font-black text-white">{reelsData.todayReelsWatched}</span>
              <span className="text-xs text-stone-500">/ {reelsData.dailyReelsBudget} max</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-stone-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  percentUsed > 80 ? 'bg-rose-500' : percentUsed > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>

          {/* Card 2: Doomscroll Time */}
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-4 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Doomscroll Time</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-3xl font-black text-amber-300">
                {reelsData.totalDoomscrollMinutes}
              </span>
              <span className="text-xs text-stone-400">mins</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              ≈ {Math.round(reelsData.totalDoomscrollMinutes * 60)} seconds of short-form stimuli
            </p>
          </div>

          {/* Card 3: Velocity */}
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-4 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Scroll Velocity</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div className="mt-2 flex items-baseline space-x-1">
              <span className="text-3xl font-black text-orange-300">
                {reelsData.doomscrollVelocity}
              </span>
              <span className="text-xs text-stone-400">reels / min</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              {reelsData.doomscrollVelocity > 2 ? '⚡ Rapid dopamine loop' : '🌱 Steady pace'}
            </p>
          </div>

          {/* Card 4: Risk Status */}
          <div className="bg-stone-900/60 backdrop-blur-md rounded-2xl p-4 border border-stone-800/80">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Dopamine Status</span>
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border capitalize ${getRiskColor(reelsData.riskLevel)}`}>
                {reelsData.riskLevel} Risk
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2">
              {reelsData.hardLockoutActive ? '⛔ Quota Locked' : `${reelsData.dailyReelsBudget - reelsData.todayReelsWatched} reels remaining`}
            </p>
          </div>
        </div>

        {/* Lockout Warning Banner if Active */}
        {reelsData.hardLockoutActive && (
          <div className="mt-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="w-6 h-6 text-rose-400 animate-pulse" />
              <div>
                <h4 className="text-sm font-bold text-rose-300">Hard Quota Lockout Active</h4>
                <p className="text-xs text-stone-300">
                  Daily reels budget exhausted ({reelsData.todayReelsWatched}/{reelsData.dailyReelsBudget}). YouTube Shorts & Instagram are locked until midnight.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                focusDataStore.setDailyReelsBudget(reelsData.dailyReelsBudget + 10);
              }}
              className="px-3.5 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl shadow-lg transition-all"
            >
              Extend +10 (Strict Cooldown)
            </button>
          </div>
        )}
      </div>

      {/* Simulator Section: Interactive Reels Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Phone Screen Reel Simulator (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full max-w-sm rounded-[42px] p-3.5 bg-stone-900 border-4 border-stone-700 shadow-2xl shadow-black relative overflow-hidden">
            {/* Phone Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-950 rounded-b-2xl z-30 flex items-center justify-center">
              <div className="w-8 h-1 bg-stone-700 rounded-full" />
              <div className="w-2 h-2 ml-3 bg-stone-800 rounded-full" />
            </div>

            {/* BrainPal Floating Live Overlay HUD on top of reel */}
            <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-[11px] shadow-lg">
              <div className="flex items-center space-x-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>BrainPal™ #{reelsData.todayReelsWatched}</span>
              </div>
              <div className="flex items-center space-x-2 text-stone-300 text-[10px]">
                <span>{reelsData.totalDoomscrollMinutes}m scroll</span>
                <span className="text-amber-400 font-semibold">{percentUsed}% cap</span>
              </div>
            </div>

            {/* Reel Video Surface Simulator */}
            <div className={`relative w-full h-[540px] rounded-[32px] overflow-hidden bg-gradient-to-b ${currentReel.color} flex flex-col justify-between p-6 transition-all duration-300 select-none`}>
              {/* Background ambient pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/30 to-transparent pointer-events-none" />

              {/* Reel Header Info */}
              <div className="pt-10 z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/40 backdrop-blur-sm border border-white/10 text-white">
                  {currentReel.type === 'study' ? '📚 DAV Educational' : '🧠 Brainrot Warning'}
                </span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Central Reel Content / Graphic */}
              <div className="my-auto z-10 text-center px-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner mb-4 animate-pulse">
                  {currentReel.type === 'study' ? (
                    <Award className="w-10 h-10 text-emerald-400" />
                  ) : (
                    <Flame className="w-10 h-10 text-rose-400" />
                  )}
                </div>
                <h3 className="text-lg font-black text-white leading-tight drop-shadow-md">
                  {currentReel.title}
                </h3>
                <p className="text-xs text-white/80 mt-2 font-medium line-clamp-3">
                  {currentReel.description}
                </p>
              </div>

              {/* Bottom Reel Author & Floating Action Icons */}
              <div className="z-10 flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold text-white flex items-center space-x-1.5">
                    <span>{currentReel.creator}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </p>
                  <p className="text-[10px] text-white/60 flex items-center space-x-1 mt-0.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{currentReel.sound}</span>
                  </p>
                </div>

                <div className="flex flex-col items-center space-y-3 text-white">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(currentReel.id)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                      likedReels[currentReel.id] ? 'bg-rose-600 text-white' : 'bg-white/20 text-white'
                    }`}>
                      <Heart className={`w-5 h-5 ${likedReels[currentReel.id] ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">{currentReel.likes || '24K'}</span>
                  </button>

                  {/* Comments Button */}
                  <button
                    onClick={() => setShowCommentsDrawer(!showCommentsDrawer)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-cyan-300" />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">{currentReel.comments || '500'}</span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleSave(currentReel.id)}
                    className="flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                      savedReels[currentReel.id] ? 'bg-amber-500 text-stone-950' : 'bg-white/20 text-white'
                    }`}>
                      <Bookmark className={`w-5 h-5 ${savedReels[currentReel.id] ? 'fill-stone-950' : ''}`} />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">Save</span>
                  </button>
                </div>
              </div>

              {/* Hard Lock Overlay if Quota Exceeded */}
              {reelsData.hardLockoutActive && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-rose-950 border border-rose-500/80 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-rose-400" />
                  </div>
                  <h4 className="text-lg font-black text-rose-400">BrainPal Hard Lockout</h4>
                  <p className="text-xs text-stone-300 mt-2">
                    Daily reel quota reached ({reelsData.todayReelsWatched} reels). Feed is locked to preserve your attention span.
                  </p>
                  <div className="mt-5 p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400">
                    Switch to Section 9 Study Arena to earn unlock tokens through productive focus.
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Swipe Simulator Controls */}
            <div className="mt-4 flex items-center justify-between px-2">
              <button
                onClick={handlePrevReel}
                disabled={currentReelIndex === 0}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 text-stone-300 text-xs font-semibold flex items-center space-x-1.5 transition-all"
              >
                <ChevronUp className="w-4 h-4" />
                <span>Prev Reel</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-stone-400">
                  {currentReelIndex + 1} / {comprehensiveReels.length}
                </span>
              </div>

              <button
                onClick={handleNextReel}
                disabled={reelsData.hardLockoutActive}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-30 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-rose-900/40 transition-all"
              >
                <span>Next Reel</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Breakdown, Challenge & Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Box 1: Dopamine Detox Challenge Streak */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Dopamine Detox Sprint
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🔥 {detoxStreakDays} Day Streak
              </span>
            </div>
            <h3 className="text-lg font-black text-white">Monk Mode Attention Shield</h3>
            <p className="text-xs text-stone-300">
              By keeping your daily reels below 25, you have rescued approximately <strong>6.5 hours of focus</strong> this week alone.
            </p>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
                <span className="text-xl font-black text-white">6.5h</span>
                <p className="text-[10px] text-stone-500 mt-0.5">Time Saved</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
                <span className="text-xl font-black text-emerald-400">+34%</span>
                <p className="text-[10px] text-stone-500 mt-0.5">Recall Rate</p>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-center">
                <span className="text-xl font-black text-amber-400">0</span>
                <p className="text-[10px] text-stone-500 mt-0.5">Brainrot Relapses</p>
              </div>
            </div>
          </div>

          {/* Box 2: Why BrainPal Counts Reels */}
          <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-4">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>How BrainPal™ Reels Tracking Protects Students</span>
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Shorts and Reels utilize variable dopamine ratio schedules engineered to induce mindless scrolling. BrainPal breaks this hypnotic trance by:
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  1
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-200">Continuous Reel Count Odometer</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Counts every swipe and displays a live floating heads-up indicator over YouTube Shorts and Instagram Reels.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  2
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-200">15-Second Breath Friction Gate</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    At 15 reels, the screen halts and requires a 15-second diaphragmatic breathing cycle before continuing.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xs flex-shrink-0">
                  3
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-200">Zero-Compromise Hard Quota</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    When your daily quota (e.g. 25 reels) is exceeded, the video surface locks completely until midnight.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3: Reels Hourly Distribution */}
          <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Today's Short-Form Scroll Timeline</span>
              </h4>
              <span className="text-[11px] text-stone-400">Hourly Distribution</span>
            </div>

            <div className="space-y-2">
              {reelsData.hourlyReels?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-stone-950/50 border border-stone-800/60">
                  <span className="font-mono text-stone-400">{item.hour}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-stone-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, item.count * 20)}%` }}
                      />
                    </div>
                    <span className="font-bold text-stone-200 w-12 text-right">{item.count} reels</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mindfulness Modal (Tier 2 Breath Pause) */}
      {showMindfulnessModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-3xl p-6 text-center space-y-6 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-950 border border-cyan-500/60 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-cyan-300 animate-spin" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Mindfulness Friction Gate
              </span>
              <h3 className="text-xl font-black text-white mt-3">Pause for 15 Seconds</h3>
              <p className="text-xs text-stone-300 mt-1">
                You have watched {reelsData.todayReelsWatched} reels. Reset your dopamine baseline before proceeding.
              </p>
            </div>

            {/* Breathing Animation Orb */}
            <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500/30 to-emerald-500/30 border border-cyan-400/50 shadow-2xl flex items-center justify-center transition-all duration-1000 ${
                  breathPhase === 'inhale' ? 'scale-125 bg-cyan-400/40' : breathPhase === 'hold' ? 'scale-125 bg-emerald-400/40' : 'scale-90 bg-cyan-700/20'
                }`}
              >
                <div className="text-center">
                  <span className="text-3xl font-black text-white font-mono">{mindfulnessCountdown}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-200 mt-0.5">
                    {breathPhase}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 italic">
              "What was your single goal when you unlocked your screen today?"
            </p>

            <button
              onClick={() => setShowMindfulnessModal(false)}
              disabled={mindfulnessCountdown > 0}
              className="w-full py-3.5 rounded-2xl font-black text-sm bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 shadow-lg shadow-cyan-950 transition-all"
            >
              {mindfulnessCountdown > 0 ? `Wait ${mindfulnessCountdown}s to Unlock` : 'Resume Mindfully'}
            </button>
          </div>
        </div>
      )}

      {/* Daily Budget Adjuster Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Configure Daily Reels Quota</span>
            </h3>
            <p className="text-xs text-stone-400">
              Set the hard limit for how many reels you can watch per day before strict lockout initiates.
            </p>

            <div className="text-center py-4 bg-stone-950 rounded-2xl border border-stone-800">
              <span className="text-4xl font-black text-amber-400">{tempBudget}</span>
              <span className="text-xs text-stone-400 ml-2">reels / day</span>
            </div>

            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={tempBudget}
              onChange={(e) => setTempBudget(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>0 (Monk Mode)</span>
              <span>25 (Standard)</span>
              <span>60 (Casual)</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowBudgetModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  focusDataStore.setDailyReelsBudget(tempBudget);
                  setShowBudgetModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-stone-950 shadow-lg shadow-amber-950 transition-all"
              >
                Save Quota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
