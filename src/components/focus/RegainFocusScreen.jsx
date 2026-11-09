import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Lock, Unlock, Play, Pause, Square, Coffee, Users,
  ChevronDown, Sparkles, Volume2, VolumeX, CheckCircle2, RotateCcw,
  Zap, Compass, ShieldAlert, Award, Clock, Star, MessageSquare,
  Flame, Check, Sliders, Music, ChevronRight
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

export function RegainFocusScreen({
  onOpenSetupModal,
  onOpenGroupModal,
  onOpenSettingsDrawer
}) {
  // Session State
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionMode, setSessionMode] = useState('timer'); // timer | stopwatch | pomodoro
  const [selectedTag, setSelectedTag] = useState('Untagged');
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // Time tracking
  const [targetDurationSeconds, setTargetDurationSeconds] = useState(25 * 60); // 25 mins
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Break state
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(5 * 60);

  // Strict Lock state
  const [strictShield, setStrictShield] = useState(() => focusDataStore.getStrictShield());
  const [showStrictModal, setShowStrictModal] = useState(false);
  const [strictCountdown, setStrictCountdown] = useState(0);

  // Ambient Audio
  const [activeSound, setActiveSound] = useState(null); // 'binaural_432' | 'rain' | 'white_noise' | 'zen_bowl'

  // Buddy mascot animation & dialogue state
  const [buddyMood, setBuddyMood] = useState('happy'); // happy | focused | sleepy | alert | cheering
  const [buddyQuote, setBuddyQuote] = useState('Hey DAV Champion! Ready to conquer today’s syllabus?');
  const [showBuddyBubble, setShowBuddyBubble] = useState(true);

  // Completion & Reflection modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [solvedCount, setSolvedCount] = useState(5);
  const [focusRating, setFocusRating] = useState(5);

  // Canvas ref for animated particle nebula
  const canvasRef = useRef(null);

  // Quotes pool
  const buddyQuotes = [
    '“Success is the sum of small efforts repeated day in and day out.”',
    'Keep your eyes on the board exam gold medal! 🏅',
    'Physics formulas stick best when your screen is locked. ⚛️',
    'Deep breaths. You are building real cognitive muscle today.',
    'Binaural beats running. Zero distractions allowed. 🎧',
    'DAV toppers do not doomscroll. They create the future! 🚀'
  ];

  // Animated Nebula Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = [];
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint floating starlight particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height * 0.7;
        if (p.y > height * 0.7) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 243, 208, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Timer Tick Interval
  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        if (isOnBreak) {
          setBreakSecondsLeft(prev => {
            if (prev <= 1) {
              setIsOnBreak(false);
              ambientAudio.playBellChime();
              setBuddyMood('focused');
              setBuddyQuote('Break complete! Let’s dive straight back in.');
              return 5 * 60;
            }
            return prev - 1;
          });
        } else {
          if (sessionMode === 'timer' || sessionMode === 'pomodoro') {
            setRemainingSeconds(prev => {
              if (prev <= 1) {
                // Completed!
                ambientAudio.playBellChime();
                setIsRunning(false);
                setIsPaused(false);
                setBuddyMood('cheering');
                setShowCompletionModal(true);
                focusDataStore.simulateScreenTimeScan();
                return 0;
              }
              return prev - 1;
            });
            setElapsedSeconds(prev => prev + 1);
          } else {
            // Stopwatch
            setElapsedSeconds(prev => prev + 1);
          }
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, isOnBreak, sessionMode]);

  // Strict Unlock Cooldown Interval
  useEffect(() => {
    let timer = null;
    if (strictCountdown > 0) {
      timer = setInterval(() => {
        setStrictCountdown(c => (c <= 1 ? 0 : c - 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [strictCountdown]);

  // Rotate quotes every 45s
  useEffect(() => {
    const qTimer = setInterval(() => {
      const randomQ = buddyQuotes[Math.floor(Math.random() * buddyQuotes.length)];
      setBuddyQuote(randomQ);
    }, 45000);
    return () => clearInterval(qTimer);
  }, []);

  // Format Helper: mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Progress percentage (0 - 100)
  const progressPercent = sessionMode === 'stopwatch'
    ? Math.min(100, (elapsedSeconds % 3600) / 36)
    : targetDurationSeconds > 0
    ? Math.min(100, Math.round(((targetDurationSeconds - remainingSeconds) / targetDurationSeconds) * 100))
    : 0;

  // Dot position along the circle (0 to 360 degrees)
  const angle = (progressPercent / 100) * 360;
  const radius = 138;
  const centerX = 150;
  const centerY = 150;
  const dotX = centerX + radius * Math.cos(((angle - 90) * Math.PI) / 180);
  const dotY = centerY + radius * Math.sin(((angle - 90) * Math.PI) / 180);

  const handleStartResume = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      setBuddyMood('focused');
      setBuddyQuote('Focus locked in! Let’s crush this chapter.');
      if (activeSound) ambientAudio.playTrack(activeSound);
    } else if (isPaused) {
      setIsPaused(false);
      setBuddyMood('focused');
      if (activeSound) ambientAudio.playTrack(activeSound);
    }
  };

  const handleStop = () => {
    if (strictShield.strictModeActive) {
      setStrictCountdown(strictShield.emergencyDelaySeconds || 30);
      setShowStrictModal(true);
      return;
    }
    setIsRunning(false);
    setIsPaused(false);
    setIsOnBreak(false);
    setBuddyMood('happy');
    ambientAudio.stopAll();
  };

  const handleTakeBreak = () => {
    setIsOnBreak(!isOnBreak);
    setBuddyMood(isOnBreak ? 'focused' : 'sleepy');
    setBuddyQuote(isOnBreak ? 'Back to full focus!' : 'Rest your eyes for 5 minutes. No doomscrolling!');
  };

  const toggleSound = (soundKey) => {
    if (activeSound === soundKey) {
      ambientAudio.stopAll();
      setActiveSound(null);
    } else {
      setActiveSound(soundKey);
      if (isRunning && !isPaused) {
        ambientAudio.playTrack(soundKey);
      }
    }
  };

  const studyTags = [
    'Untagged',
    'Physics Study',
    'Mathematics Revision',
    'Chemistry Problem Set',
    'CBSE Board Prep',
    'English Grammar',
    'Computer Science & Code',
    'Olympiad Sprint',
    'Hindi Vyakaran'
  ];

  return (
    <div className="relative w-full min-h-[780px] rounded-[36px] overflow-hidden flex flex-col justify-between p-6 select-none shadow-2xl border border-emerald-950/40 bg-gradient-to-b from-[#021811] via-[#04261d] to-[#01140e]">
      {/* ------------------------------------------------------------- */}
      {/* Aurora Borealis Atmospheric Nebula & Canvas Stars             */}
      {/* ------------------------------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Swirling Aurora emerald wave */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-emerald-400/25 via-teal-400/20 to-transparent rounded-[100%] blur-[90px] animate-pulse" />
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[100px]" />
        <div className="absolute top-40 -right-20 w-[450px] h-[450px] bg-emerald-500/15 rounded-full blur-[100px]" />

        {/* Snowy Mountain landscape silhouette at bottom */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black via-stone-950/80 to-transparent pointer-events-none" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Top Banner Pill: "Create group with friends! >"               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 flex justify-center pt-2">
        <button
          onClick={onOpenGroupModal}
          className="group flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-stone-900/80 hover:bg-stone-850/90 backdrop-blur-xl border border-emerald-500/30 text-emerald-100 text-xs font-semibold shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-600/40 flex items-center justify-center text-emerald-300">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span>Create group with friends!</span>
          <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">›</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Central Glass Orb Timer (Matches Screenshot Exactly)          */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4">
        {/* Circular Timer Ring Frame */}
        <div className="relative w-[300px] h-[300px] flex items-center justify-center">
          {/* SVG Progress Circle and Track */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Background Track Circle */}
            <circle
              cx="150"
              cy="150"
              r="138"
              fill="rgba(16, 185, 129, 0.08)"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />
            {/* Active Progress Arc */}
            <circle
              cx="150"
              cy="150"
              r="138"
              fill="none"
              stroke="rgba(167, 243, 208, 0.85)"
              strokeWidth="2.5"
              strokeDasharray={`${2 * Math.PI * 138}`}
              strokeDashoffset={`${2 * Math.PI * 138 * (1 - progressPercent / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
            {/* Orbital Glowing Dot */}
            <circle
              cx={dotX}
              cy={dotY}
              r="4.5"
              fill="#ffffff"
              className="filter drop-shadow-[0_0_8px_rgba(255,255,255,1)]"
            />
          </svg>

          {/* Internal Content of Orb */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            {/* Untagged Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-emerald-200/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                <span>{selectedTag}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {showTagDropdown && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-stone-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-1.5 shadow-2xl z-30 space-y-0.5 animate-in zoom-in-95 duration-150">
                  {studyTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        setShowTagDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-xl font-medium transition-all ${
                        selectedTag === tag ? 'bg-emerald-600/40 text-emerald-200 font-bold' : 'text-stone-300 hover:bg-white/10'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Timer / Stopwatch Label */}
            <span className="text-xs uppercase tracking-widest text-emerald-300/70 font-semibold pt-1">
              {isOnBreak ? 'Break' : sessionMode === 'stopwatch' ? 'Stopwatch' : 'Timer'}
            </span>

            {/* Giant Digital Time Numbers */}
            <div
              onClick={onOpenSetupModal}
              className="text-6xl font-black tracking-tight text-emerald-100 font-mono drop-shadow-lg cursor-pointer hover:scale-105 transition-transform"
              title="Click to configure timer"
            >
              {isOnBreak ? formatTime(breakSecondsLeft) : formatTime(remainingSeconds)}
            </div>

            {/* Take a break Pill */}
            <button
              onClick={handleTakeBreak}
              className={`mt-2 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
                isOnBreak
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg shadow-amber-950'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-emerald-100'
              }`}
            >
              {isOnBreak ? 'End Break' : 'Take a break'}
            </button>
          </div>
        </div>

        {/* Ambient Sound Bar Quick Selector */}
        <div className="mt-5 flex items-center space-x-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/20 text-[11px]">
          <span className="text-emerald-400/80 font-bold">Audio:</span>
          <button
            onClick={() => toggleSound('binaural_432')}
            className={`px-2.5 py-1 rounded-full transition-all ${
              activeSound === 'binaural_432' ? 'bg-emerald-500 text-black font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            432Hz Alpha
          </button>
          <button
            onClick={() => toggleSound('rain')}
            className={`px-2.5 py-1 rounded-full transition-all ${
              activeSound === 'rain' ? 'bg-emerald-500 text-black font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            Rain
          </button>
          <button
            onClick={() => toggleSound('zen_bowl')}
            className={`px-2.5 py-1 rounded-full transition-all ${
              activeSound === 'zen_bowl' ? 'bg-emerald-500 text-black font-bold' : 'text-stone-300 hover:text-white'
            }`}
          >
            Zen Chime
          </button>
        </div>

        {/* Focus Buddy Interactive Speech Bubble */}
        {showBuddyBubble && (
          <div className="mt-4 px-4 py-2 max-w-sm mx-auto rounded-2xl bg-emerald-950/60 backdrop-blur-md border border-emerald-500/30 text-center text-xs text-emerald-200 shadow-lg animate-in fade-in duration-300">
            <span>{buddyQuote}</span>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Bottom Control Row (Exact match to screenshot)                */}
      {/* Hamburger Menu | Focus Buddy Mascot | Padlock                */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 space-y-4">
        {/* Row 1: Mascot & Icon buttons */}
        <div className="flex items-center justify-between px-4">
          {/* Left: Hamburger menu */}
          <button
            onClick={onOpenSettingsDrawer}
            className="w-12 h-12 rounded-full bg-stone-900/80 hover:bg-stone-800 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            title="Focus Settings & Presets"
          >
            <Menu className="w-5 h-5 text-stone-200" />
          </button>

          {/* Center: Interactive Green Mascot Buddy */}
          <div
            onClick={() => {
              setBuddyMood(b => (b === 'happy' ? 'focused' : b === 'focused' ? 'cheering' : 'happy'));
              ambientAudio.playBellChime();
              const nextQ = buddyQuotes[Math.floor(Math.random() * buddyQuotes.length)];
              setBuddyQuote(nextQ);
              setShowBuddyBubble(true);
            }}
            className="group relative cursor-pointer"
            title="DAV Focus Buddy - Click to cheer up!"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-lime-400 to-green-300 p-0.5 shadow-xl shadow-emerald-950/60 flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full bg-[#04261d] flex items-center justify-center overflow-hidden relative">
                {/* Cute Animated Green Alien/Buddy Face */}
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-lime-300 to-emerald-400 flex flex-col items-center justify-center relative shadow-inner">
                  {/* Eyes */}
                  <div className="flex space-x-2 pt-1">
                    <div className="w-2 h-2.5 bg-stone-900 rounded-full animate-bounce" />
                    <div className="w-2 h-2.5 bg-stone-900 rounded-full animate-bounce delay-75" />
                  </div>
                  {/* Smile / Mouth */}
                  <div className="w-3.5 h-1.5 border-b-2 border-stone-900 rounded-full mt-1" />
                  {/* Cheeks */}
                  <div className="absolute bottom-2 left-1.5 w-1.5 h-1 bg-rose-400/60 rounded-full" />
                  <div className="absolute bottom-2 right-1.5 w-1.5 h-1 bg-rose-400/60 rounded-full" />
                </div>
              </div>
            </div>
            {/* Small tooltip */}
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-stone-900 text-emerald-300 border border-emerald-500/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Focus Buddy
            </span>
          </div>

          {/* Right: Glowing Yellow Padlock (Strict Mode) */}
          <button
            onClick={() => {
              const updated = focusDataStore.toggleStrictMode();
              setStrictShield(updated);
            }}
            className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              strictShield.strictModeActive
                ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-amber-500/40 animate-pulse'
                : 'bg-stone-900/80 border-white/10 text-amber-400/70 hover:text-amber-300'
            }`}
            title="Toggle Strict Anti-Cheat Lock"
          >
            <Lock className="w-5 h-5 text-amber-400" />
          </button>
        </div>

        {/* Row 2: Bottom Action Pills: "Stop Focus" & "Resume / Start Focus" */}
        <div className="flex items-center space-x-3 pt-2">
          {/* Stop Focus Pill */}
          <button
            onClick={handleStop}
            className="flex-1 py-4 rounded-full font-bold text-sm bg-emerald-950/70 hover:bg-emerald-900/80 backdrop-blur-md border border-emerald-500/30 text-emerald-200 transition-all active:scale-95 text-center shadow-lg"
          >
            Stop Focus
          </button>

          {/* Resume / Start Focus Pill (Solid White in screenshot) */}
          <button
            onClick={handleStartResume}
            className="flex-1 py-4 rounded-full font-black text-sm bg-white hover:bg-stone-100 text-stone-950 transition-all active:scale-95 text-center shadow-2xl shadow-emerald-950"
          >
            {!isRunning ? 'Start Focus' : isPaused ? 'Resume' : 'Active Focus'}
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Strict Lock Unlock Countdown Modal (If student tries to stop) */}
      {/* ------------------------------------------------------------- */}
      {showStrictModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-amber-500/50 rounded-3xl p-6 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500/80 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Strict Shield Active
              </span>
              <h3 className="text-xl font-black text-white mt-3">Commitment Cooldown</h3>
              <p className="text-xs text-stone-300 mt-1">
                Strict mode prevents impulsive interruptions. You must wait for the commitment delay to finish before quitting.
              </p>
            </div>

            <div className="py-4 bg-stone-950 rounded-2xl border border-stone-800">
              <span className="text-4xl font-mono font-black text-amber-400">{strictCountdown}s</span>
              <p className="text-[11px] text-stone-500 mt-1">Hold your focus until cooldown completes</p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowStrictModal(false)}
                className="flex-1 py-3 rounded-2xl bg-stone-800 text-xs font-bold text-stone-300 hover:bg-stone-700"
              >
                Keep Studying
              </button>
              <button
                onClick={() => {
                  if (strictCountdown <= 0) {
                    setIsRunning(false);
                    setIsPaused(false);
                    setShowStrictModal(false);
                    ambientAudio.stopAll();
                  }
                }}
                disabled={strictCountdown > 0}
                className="flex-1 py-3 rounded-2xl bg-rose-600 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-black text-white shadow-lg shadow-rose-950"
              >
                {strictCountdown > 0 ? `Wait ${strictCountdown}s` : 'Unlock & Exit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Session Completion & Reflection Modal                         */}
      {/* ------------------------------------------------------------- */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 border border-emerald-500/50 rounded-3xl p-6 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Award className="w-10 h-10 animate-bounce" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Session Completed! 🎉
              </span>
              <h3 className="text-2xl font-black text-white mt-3">Spectacular Focus!</h3>
              <p className="text-xs text-stone-300 mt-1">
                You studied for 25 minutes on <strong>{selectedTag}</strong> without giving in to distractions.
              </p>
            </div>

            {/* Questions Solved Rating */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left space-y-3">
              <label className="text-xs font-bold text-stone-300">Questions or Problems Solved</label>
              <div className="flex items-center space-x-2">
                {[0, 2, 5, 10, 15].map(q => (
                  <button
                    key={q}
                    onClick={() => setSolvedCount(q)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      solvedCount === q
                        ? 'bg-emerald-500 text-stone-950 shadow-md'
                        : 'bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    {q}+
                  </button>
                ))}
              </div>

              <label className="text-xs font-bold text-stone-300 pt-1 block">Session Focus Quality</label>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    onClick={() => setFocusRating(s)}
                    className="p-2 text-xl hover:scale-125 transition-transform"
                  >
                    {s <= focusRating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowCompletionModal(false)}
              className="w-full py-4 rounded-full font-black text-sm bg-white hover:bg-stone-100 text-stone-950 shadow-xl transition-all"
            >
              Log Session & Sync Leaderboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
