import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Lock, Unlock, Play, Pause, Square, Coffee, Users,
  ChevronDown, Sparkles, Volume2, VolumeX, CheckCircle2, RotateCcw,
  Zap, Compass, ShieldAlert, Award, Clock, Star, MessageSquare,
  Flame, Check, Sliders, Music, ChevronRight, User
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

/**
 * --------------------------------------------------------------------------
 * RegainFocusScreen - Exact 1:1 Match to ReGain App Screenshot 1
 * --------------------------------------------------------------------------
 * (Screenshot_2026-11-09-13-24-26-052_ai.regainapp.jpg)
 * 1. Shimmering Aurora Borealis Northern Lights night sky background.
 * 2. Top Pill: [ 👤 Create group with friends! > ]
 * 3. Central Frosted Circular Orb:
 *    - "Untagged v"
 *    - "Timer"
 *    - Giant digital timer: "01:56"
 *    - "Take a break" pill inside
 *    - Gliding glowing orbital white dot around the circumference.
 * 4. Control Icons Row:
 *    - [ ≡ ] Left: Menu button (opens Focus Setup sheet)
 *    - [ 👽 ] Center: Animated Lime-Green Alien Mascot Buddy
 *    - [ 🔒 ] Right: Golden Glowing Padlock (Strict Lock)
 * 5. Bottom Action Buttons:
 *    - [ Stop Focus ] (Dark green capsule)
 *    - [ Resume ] / [ Start Focus ] (Solid white pill with bold black text)
 */

export function RegainFocusScreen({
  onOpenSetupModal,
  onOpenGroupModal,
  onOpenSettingsDrawer
}) {
  // Session State: Default paused at 01:56 matching Screenshot 1 exactly
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [sessionMode, setSessionMode] = useState('timer'); // timer | stopwatch | pomodoro
  const [selectedTag, setSelectedTag] = useState('Untagged');
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  // Time tracking: 1 minute 56 seconds default (matching screenshot 1)
  const [targetDurationSeconds, setTargetDurationSeconds] = useState(25 * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(116); // 01:56
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Break state
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakSecondsLeft, setBreakSecondsLeft] = useState(5 * 60);

  // Strict Lock state
  const [strictShield, setStrictShield] = useState(() => focusDataStore.getStrictShield());
  const [showStrictModal, setShowStrictModal] = useState(false);
  const [strictCountdown, setStrictCountdown] = useState(0);

  // Ambient Audio
  const [activeSound, setActiveSound] = useState(null);

  // Buddy mascot animation & dialogue state
  const [buddyMood, setBuddyMood] = useState('happy'); // happy | focused | sleepy | cheering
  const [buddyQuote, setBuddyQuote] = useState('Hey DAV Champion! Ready to conquer today’s syllabus?');
  const [showBuddyBubble, setShowBuddyBubble] = useState(false);

  // Completion modal
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const canvasRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Quotes pool
  const buddyQuotes = [
    '“Success is the sum of small efforts repeated daily.”',
    'Keep your eyes on the board exam gold medal! 🏅',
    'Physics formulas stick best when your screen is locked. ⚛️',
    'Deep breaths. You are building real cognitive muscle today.',
    'Binaural beats running. Zero distractions allowed. 🎧',
    'DAV toppers do not doomscroll. They create the future! 🚀'
  ];

  // -------------------------------------------------------------------------
  // Animated Aurora & Starfield Canvas Loop
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let time = 0;

    let width = (canvas.width = canvas.offsetWidth || 380);
    let height = (canvas.height = canvas.offsetHeight || 750);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 380;
      height = canvas.height = canvas.offsetHeight || 750;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.7 + 0.3
    }));

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Shimmering aurora waves in upper half
      const auroraCurtains = [
        { color: 'rgba(52, 211, 153, 0.16)', speed: 0.8, offset: 0, amp: 45 },
        { color: 'rgba(16, 185, 129, 0.22)', speed: 1.1, offset: 1.5, amp: 55 },
        { color: 'rgba(6, 182, 212, 0.14)', speed: 0.6, offset: 3, amp: 40 }
      ];

      auroraCurtains.forEach((c, idx) => {
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);

        for (let x = 0; x <= width + 15; x += 15) {
          const wave = Math.sin(x * 0.008 + time * c.speed + c.offset) * c.amp;
          const y = height * (0.35 + idx * 0.08) + wave;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, 0);
        ctx.closePath();
        ctx.fill();
      });

      // Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        ctx.globalAlpha = s.alpha * (0.8 + Math.sin(time * 2 + s.x) * 0.2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height * 0.7;
        if (s.y > height * 0.7) s.y = 0;
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // -------------------------------------------------------------------------
  // Timer Countdown Interval (Tick-by-tick real time)
  // -------------------------------------------------------------------------
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
              showToast('Break complete! Focus session resumed.');
              return 5 * 60;
            }
            return prev - 1;
          });
        } else {
          setRemainingSeconds(prev => {
            if (prev <= 1) {
              ambientAudio.playBellChime();
              setIsRunning(false);
              setIsPaused(false);
              setBuddyMood('cheering');
              setShowCompletionModal(true);
              focusDataStore.recordActiveStudySeconds(targetDurationSeconds);
              showToast('🎉 Focus block achieved! Fantastic work.');
              return 0;
            }
            return prev - 1;
          });
          setElapsedSeconds(prev => {
            const next = prev + 1;
            if (next % 60 === 0) {
              focusDataStore.recordActiveStudySeconds(60);
            }
            return next;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isPaused, isOnBreak, targetDurationSeconds]);

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

  // Format Helper: mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Progress percentage (0 - 100)
  const progressPercent = targetDurationSeconds > 0
    ? Math.min(100, Math.max(0, Math.round(((targetDurationSeconds - remainingSeconds) / targetDurationSeconds) * 100)))
    : 75;

  // Gliding Orbital Glowing Dot position along the circle
  const angle = (progressPercent / 100) * 360;
  const radius = 138;
  const centerX = 150;
  const centerY = 150;
  const dotX = centerX + radius * Math.cos(((angle - 90) * Math.PI) / 180);
  const dotY = centerY + radius * Math.sin(((angle - 90) * Math.PI) / 180);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------
  const handleStartResume = () => {
    ambientAudio.init();
    if (window.Android?.vibrate) window.Android.vibrate(35);
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
      setBuddyMood('focused');
      setBuddyQuote('Focus locked in! Let’s crush this chapter.');
      ambientAudio.playBellChime();
      showToast('Focus session started! Textbooks active.');
    } else if (isPaused) {
      setIsPaused(false);
      setBuddyMood('focused');
      setBuddyQuote('Focus resumed! Keep the momentum going.');
      ambientAudio.playBellChime();
      showToast('Focus session resumed!');
    } else {
      // Pause toggle
      setIsPaused(true);
      setBuddyMood('sleepy');
      setBuddyQuote('Session paused. Take a deep breath and resume when ready!');
      ambientAudio.stopAll();
      showToast('Session paused.');
    }
  };

  const handleStop = () => {
    if (window.Android?.vibrate) window.Android.vibrate(50);
    if (strictShield.strictModeActive) {
      setStrictCountdown(strictShield.emergencyDelaySeconds || 30);
      setShowStrictModal(true);
      return;
    }
    setIsRunning(false);
    setIsPaused(true);
    setIsOnBreak(false);
    setBuddyMood('happy');
    ambientAudio.stopAll();
    showToast('Focus session stopped.');
  };

  const handleTakeBreak = () => {
    if (window.Android?.vibrate) window.Android.vibrate(35);
    setIsOnBreak(!isOnBreak);
    setBuddyMood(isOnBreak ? 'focused' : 'sleepy');
    ambientAudio.playBellChime();
    showToast(isOnBreak ? 'Break ended! Focus resumed.' : '5-minute break started. Rest your eyes!');
  };

  const handleToggleStrict = () => {
    if (window.Android?.vibrate) window.Android.vibrate(60);
    const updated = focusDataStore.toggleStrictMode();
    setStrictShield(updated);
    ambientAudio.playWarningChime();
    showToast(updated.strictModeActive ? '🔒 Strict Shield ON: Apps locked!' : '🔓 Strict Shield OFF');
  };

  const studyTags = [
    'Untagged',
    'Physics Study',
    'Mathematics Revision',
    'Chemistry Problem Set',
    'CBSE Board Prep',
    'English Grammar',
    'Computer Science',
    'Olympiad Sprint'
  ];

  return (
    <div 
      className="relative w-full min-h-[640px] flex-1 rounded-3xl sm:rounded-[36px] overflow-hidden flex flex-col justify-between p-4 sm:p-5 select-none text-white shadow-2xl border border-emerald-950/40 bg-[#021811] pb-6"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.35) 0%, rgba(6, 78, 59, 0.45) 50%, rgba(2, 24, 17, 0.98) 100%)'
      }}
    >
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 border border-emerald-500 text-emerald-300 text-xs font-black px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 backdrop-blur-md">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Aurora Borealis Atmospheric Nebula & Canvas Stars             */}
      {/* ------------------------------------------------------------- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Snowy landscape silhouette at bottom matching screenshot */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#02120b] via-[#031d14]/80 to-transparent pointer-events-none z-0" />

      {/* ------------------------------------------------------------- */}
      {/* Top Banner Pill: "Create group with friends! >"               */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 flex justify-center pt-2">
        <button
          onClick={onOpenGroupModal}
          className="group flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-[#11241c]/80 hover:bg-[#162f25]/90 backdrop-blur-xl border border-white/10 text-emerald-100 text-xs font-semibold shadow-lg shadow-black/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-emerald-200">
            <User className="w-3.5 h-3.5" />
          </div>
          <span>Create group with friends!</span>
          <span className="text-stone-300 font-bold group-hover:translate-x-0.5 transition-transform text-sm">›</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Central Glass Orb Timer (Matches Screenshot 1 Exactly)        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2">
        
        {/* Circular Timer Ring Frame */}
        <div className="relative w-[285px] h-[285px] sm:w-[300px] sm:h-[300px] flex items-center justify-center">
          
          {/* SVG Progress Circle and Track */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Background Track Circle */}
            <circle
              cx="150"
              cy="150"
              r="138"
              fill="rgba(16, 185, 129, 0.05)"
              stroke="rgba(255, 255, 255, 0.3)"
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
          <div className="relative z-10 flex flex-col items-center text-center space-y-1.5">
            
            {/* Untagged Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTagDropdown(!showTagDropdown)}
                className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-emerald-200/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition cursor-pointer"
              >
                <span>{selectedTag}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-300" />
              </button>

              {showTagDropdown && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-stone-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-1.5 shadow-2xl z-30 space-y-0.5 animate-fadeIn">
                  {studyTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(tag);
                        setShowTagDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-xl font-medium transition cursor-pointer ${
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
            <span className="text-xs uppercase tracking-widest text-emerald-300/80 font-semibold pt-1">
              {isOnBreak ? 'Break' : sessionMode === 'stopwatch' ? 'Stopwatch' : 'Timer'}
            </span>

            {/* Giant Digital Time Numbers: Exact match to "01:56" in Screenshot */}
            <div
              onClick={onOpenSetupModal}
              className="text-6xl font-black tracking-tight text-emerald-100 font-mono drop-shadow-lg cursor-pointer hover:scale-105 transition-transform"
              title="Click to configure timer duration"
            >
              {isOnBreak ? formatTime(breakSecondsLeft) : formatTime(remainingSeconds)}
            </div>

            {/* Take a break Pill */}
            <button
              onClick={handleTakeBreak}
              className={`mt-2 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border transition cursor-pointer ${
                isOnBreak
                  ? 'bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-emerald-100'
              }`}
            >
              {isOnBreak ? 'End Break' : 'Take a break'}
            </button>
          </div>
        </div>

        {/* Mascot quote speech bubble */}
        {showBuddyBubble && (
          <div className="mt-3 px-4 py-2 max-w-xs mx-auto rounded-2xl bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-center text-xs text-emerald-200 shadow-lg animate-fadeIn">
            <span>{buddyQuote}</span>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* Bottom Control Row (Exact match to Screenshot 1)               */}
      {/* Menu [ ≡ ] | Focus Alien Mascot [ 👽 ] | Padlock [ 🔒 ]        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative z-20 space-y-4">
        
        {/* Row 1: Mascot & Icon buttons */}
        <div className="flex items-center justify-between px-6">
          
          {/* Left: Menu [ ≡ ] */}
          <button
            onClick={onOpenSetupModal}
            className="w-12 h-12 rounded-full bg-[#12231c]/80 hover:bg-[#183227] backdrop-blur-xl border border-white/10 flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            title="Focus Settings & Presets"
          >
            <Menu className="w-5 h-5 text-stone-200" />
          </button>

          {/* Center: Interactive Lime-Green Alien Mascot Buddy (Exact match to Screenshot 1) */}
          <div
            onClick={() => {
              setBuddyMood(b => (b === 'happy' ? 'focused' : b === 'focused' ? 'cheering' : 'happy'));
              ambientAudio.playBellChime();
              const nextQ = buddyQuotes[Math.floor(Math.random() * buddyQuotes.length)];
              setBuddyQuote(nextQ);
              setShowBuddyBubble(!showBuddyBubble);
            }}
            className="group relative cursor-pointer"
            title="ReGain Mascot Buddy - Click to motivate!"
          >
            {/* Circular dark halo base */}
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-md border border-emerald-500/30 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              
              {/* Cute Lime-Green Alien Mascot Head matching Screenshot 1 */}
              <div className="w-10 h-10 rounded-[18px] bg-gradient-to-b from-[#bbf7d0] to-[#4ade80] flex flex-col items-center justify-center relative shadow-md">
                {/* Two Dark Anime Oval Eyes */}
                <div className="flex space-x-2.5 pt-0.5">
                  <div className="w-2.5 h-3 bg-[#052e16] rounded-full relative">
                    {/* Eye Sparkle */}
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
                  </div>
                  <div className="w-2.5 h-3 bg-[#052e16] rounded-full relative">
                    <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 left-0.5" />
                  </div>
                </div>
                {/* Cute Smile */}
                <div className="w-3 h-1 border-b-2 border-[#052e16] rounded-full mt-0.5" />
                {/* Blushing Cheeks */}
                <div className="absolute bottom-1.5 left-1 w-1.5 h-1 bg-rose-400/50 rounded-full" />
                <div className="absolute bottom-1.5 right-1 w-1.5 h-1 bg-rose-400/50 rounded-full" />
              </div>

            </div>
          </div>

          {/* Right: Glowing Yellow Padlock (Strict Mode) */}
          <button
            onClick={handleToggleStrict}
            className={`w-12 h-12 rounded-full backdrop-blur-xl border flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer ${
              strictShield.strictModeActive
                ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-amber-500/40 animate-pulse'
                : 'bg-[#12231c]/80 border-white/10 text-amber-400 hover:text-amber-300'
            }`}
            title="Toggle Strict Anti-Tamper Lock"
          >
            <Lock className="w-5 h-5 text-amber-400" />
          </button>

        </div>

        {/* Row 2: Bottom Action Pills: "Stop Focus" & "Resume" (Exact match to Screenshot 1) */}
        <div className="flex items-center space-x-3 pt-1">
          
          {/* Stop Focus Pill (Dark translucent capsule) */}
          <button
            onClick={handleStop}
            className="flex-1 py-3.5 rounded-full font-bold text-sm bg-[#12231c]/90 hover:bg-[#183227] backdrop-blur-md border border-white/10 text-emerald-100 transition active:scale-95 text-center shadow-lg cursor-pointer"
          >
            Stop Focus
          </button>

          {/* Resume / Start Focus Pill (Solid pure white capsule with bold black text) */}
          <button
            onClick={handleStartResume}
            className="flex-1 py-3.5 rounded-full font-black text-sm bg-white hover:bg-stone-100 text-stone-950 transition active:scale-95 text-center shadow-2xl cursor-pointer"
          >
            {!isRunning ? 'Start Focus' : isPaused ? 'Resume' : 'Active Focus'}
          </button>

        </div>

      </div>

      {/* Strict Lock Unlock Countdown Modal */}
      {showStrictModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-amber-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-950 border border-amber-500/80 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Strict Focus Shield Active
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Emergency Stop Delayed
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Strict mode imposes a friction penalty before you can give up on your study target.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-2xl font-mono font-black text-amber-400">
              {strictCountdown}s remaining
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowStrictModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
              >
                Keep Studying
              </button>
              <button
                onClick={() => {
                  if (strictCountdown === 0) {
                    setShowStrictModal(false);
                    setIsRunning(false);
                    setIsPaused(true);
                  }
                }}
                disabled={strictCountdown > 0}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 text-xs font-black cursor-pointer"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-emerald-500/50 rounded-3xl p-6 text-center space-y-4 shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center text-3xl">
              🎉
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Focus Goal Achieved!</h3>
              <p className="text-xs text-stone-400 mt-1">
                You studied uninterrupted for {Math.round(targetDurationSeconds / 60)} minutes.
              </p>
            </div>
            <button
              onClick={() => setShowCompletionModal(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg"
            >
              Continue Scholar Journey
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
