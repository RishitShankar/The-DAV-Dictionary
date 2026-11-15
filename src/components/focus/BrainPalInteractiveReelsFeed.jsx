import React, { useState, useEffect, useRef } from 'react';
import {
  Film, Heart, MessageCircle, Share2, Volume2, VolumeX, ChevronUp, ChevronDown,
  AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, Lock, Unlock, RefreshCw,
  Clock, Zap, Target, BookOpen, ArrowRight, Play, Pause, Award, Info
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

/**
 * --------------------------------------------------------------------------
 * BrainPal Interactive Reel Scroller & Doomscroll Lockdown Engine
 * --------------------------------------------------------------------------
 * An authentic vertical short-video feed inspired by BrainPal & Instagram Reels.
 * Real scroll navigation, real reel counting (1/5, 2/5...), dopamine dwell timer,
 * interactive canvas visualizer, sound toggle, and instant HARD LOCKOUT when the
 * budget quota is reached with a 15-second mindful breathing break.
 */

const REELS_CATALOG = [
  {
    id: 'reel_physics_1',
    creator: '@physics_galaxy_dav',
    displayName: 'Physics Galaxy DAV',
    verified: true,
    avatar: '⚡',
    title: 'Rotational Mechanics in 45 Seconds! 🪐',
    description: 'Why do figure skaters spin faster when pulling arms inward? Conservation of Angular Momentum (L = Iω) visualized.',
    tags: ['#cbse10', '#physics', '#davtopper', '#science'],
    soundName: 'Original Sound - Physics Galaxy 432Hz',
    soundType: 'binaural_432',
    visualTheme: 'space_orbit',
    initialLikes: 14200,
    initialComments: 342,
    category: 'useful'
  },
  {
    id: 'reel_maths_1',
    creator: '@topper_shankar_maths',
    displayName: 'DAV Toppers Hub',
    verified: true,
    avatar: '📐',
    title: 'Quadratic Formula Shortcut Hack 🔥',
    description: 'Solve x² - 14x + 45 = 0 in 3 seconds without split-the-middle-term. Sum = 14, Product = 45 -> (x - 9)(x - 5).',
    tags: ['#maths', '#boardexams', '#cbse2026', '#shortcuts'],
    soundName: 'Focus Lofi Rain - DAV Studio',
    soundType: 'rain',
    visualTheme: 'matrix_flow',
    initialLikes: 28900,
    initialComments: 891,
    category: 'useful'
  },
  {
    id: 'reel_brainrot_1',
    creator: '@brainrot_reels_daily',
    displayName: 'Sigma Brainrot',
    verified: false,
    avatar: '💀',
    title: 'POV: You open your textbook at 11:59 PM 😭💀',
    description: 'Literally staring at Chapter 4 for 40 minutes reading the exact same sentence 50 times. #relatable #doomscroll',
    tags: ['#brainrot', '#relatable', '#memes', '#procrastination'],
    soundName: 'Meme Bass Sound Effect - TikTok Viral',
    soundType: 'white_noise',
    visualTheme: 'meme_glitch',
    initialLikes: 104000,
    initialComments: 4210,
    category: 'distracted'
  },
  {
    id: 'reel_chem_1',
    creator: '@chemistry_pulse_dav',
    displayName: 'Chemistry Pulse DAV',
    verified: true,
    avatar: '🧪',
    title: 'Periodic Table Memorization Trick ⚡',
    description: 'Group 1 Alkali Metals: "Li-Na Ki Rab Se Faryad" (Li, Na, K, Rb, Cs, Fr). Guaranteed full marks in board questions!',
    tags: ['#chemistry', '#cbseclass10', '#mnemonic', '#topper'],
    soundName: 'Alpha Binaural Beats - 40Hz Focus',
    soundType: 'binaural_432',
    visualTheme: 'atomic_rings',
    initialLikes: 19500,
    initialComments: 412,
    category: 'useful'
  },
  {
    id: 'reel_distraction_2',
    creator: '@viral_gaming_clips',
    displayName: 'Gaming Highlights',
    verified: false,
    avatar: '🎮',
    title: 'Bro clutched a 1v4 with 1 HP remaining 🤯🔥',
    description: 'Insane sniper flick shot across the map. Drop a like if you play every night after school!',
    tags: ['#gaming', '#clutch', '#viral', '#shorts'],
    soundName: 'Intense EDM Drop - NoCopyrightSounds',
    soundType: 'rain',
    visualTheme: 'cyber_neon',
    initialLikes: 87400,
    initialComments: 1840,
    category: 'distracted'
  },
  {
    id: 'reel_biology_1',
    creator: '@dav_biology_lab',
    displayName: 'DAV Biology Circle',
    verified: true,
    avatar: '🧬',
    title: 'Nephron Filtration & Urine Formation Made Easy 🩺',
    description: 'Glomerulus ultrafiltration -> Proximal convoluted tubule reabsorption -> Loop of Henle countercurrent. Full diagram explained.',
    tags: ['#biology', '#cbse10', '#lifeprocesses', '#ncert'],
    soundName: 'Calm Piano Study - DAV Ambiance',
    soundType: 'binaural_432',
    visualTheme: 'dna_helix',
    initialLikes: 31200,
    initialComments: 620,
    category: 'useful'
  }
];

export function BrainPalInteractiveReelsFeed({ onReturnToStudy }) {
  const [reelsData, setReelsData] = useState(() => focusDataStore.getReelsData());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [dwellSeconds, setDwellSeconds] = useState(0);
  const [likedReels, setLikedReels] = useState({});
  const [likeCounts, setLikeCounts] = useState(() => {
    const map = {};
    REELS_CATALOG.forEach(r => { map[r.id] = r.initialLikes; });
    return map;
  });
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudgetInput, setNewBudgetInput] = useState(reelsData.dailyReelsBudget || 5);
  const [mindfulnessCountdown, setMindfulnessCountdown] = useState(15);
  const [breathPhase, setBreathPhase] = useState('Inhale'); // Inhale | Hold | Exhale
  const [toastMessage, setToastMessage] = useState(null);

  const canvasRef = useRef(null);
  const dwellTimerRef = useRef(null);

  // Sync with FocusDataStore
  useEffect(() => {
    const unsub = focusDataStore.subscribe((event) => {
      setReelsData(focusDataStore.getReelsData());
    });
    return () => unsub();
  }, []);

  const currentReel = REELS_CATALOG[currentIndex % REELS_CATALOG.length];
  const isHardLocked = reelsData.todayReelsWatched >= (reelsData.dailyReelsBudget || 5);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // -------------------------------------------------------------------------
  // Dwell Time Tracking & Distraction Recording
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (isHardLocked) return;
    setDwellSeconds(0);
    dwellTimerRef.current = setInterval(() => {
      setDwellSeconds(prev => {
        const next = prev + 1;
        // Log to distracted screen time every 15 seconds
        if (next % 15 === 0) {
          focusDataStore.recordDistractionSeconds(15, `Reel: ${currentReel.title}`);
        }
        return next;
      });
    }, 1000);

    return () => {
      if (dwellTimerRef.current) clearInterval(dwellTimerRef.current);
    };
  }, [currentIndex, isHardLocked, currentReel]);

  // -------------------------------------------------------------------------
  // Mindful Breathing Timer on Hard Lockout
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (!isHardLocked) return;
    ambientAudio.playWarningChime();
    const breathInterval = setInterval(() => {
      setMindfulnessCountdown(prev => {
        if (prev <= 1) {
          ambientAudio.playBellChime();
          return 0;
        }
        const currentElapsed = 15 - prev;
        if (currentElapsed < 4) setBreathPhase('Inhale (4s)');
        else if (currentElapsed < 8) setBreathPhase('Hold Breath (4s)');
        else setBreathPhase('Exhale Slowly (7s)');
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(breathInterval);
  }, [isHardLocked]);

  // -------------------------------------------------------------------------
  // Procedural Canvas Animation for Video Simulation
  // -------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    let width = (canvas.width = canvas.offsetWidth || 360);
    let height = (canvas.height = canvas.offsetHeight || 640);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 360;
      height = canvas.height = canvas.offsetHeight || 640;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (currentReel.category === 'useful') {
        bgGrad.addColorStop(0, '#061320');
        bgGrad.addColorStop(0.5, '#0c1f36');
        bgGrad.addColorStop(1, '#050a12');
      } else {
        bgGrad.addColorStop(0, '#240810');
        bgGrad.addColorStop(0.5, '#160814');
        bgGrad.addColorStop(1, '#08040a');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render theme specific visual
      if (currentReel.visualTheme === 'space_orbit') {
        // Orbiting rings
        ctx.save();
        ctx.translate(width / 2, height / 2 - 40);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(0, 0, 110, 45, t * 0.4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.beginPath();
        ctx.ellipse(0, 0, 75, 95, -t * 0.3, 0, Math.PI * 2);
        ctx.stroke();

        // Central glowing core
        const coreGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 35);
        coreGrad.addColorStop(0, '#38bdf8');
        coreGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else if (currentReel.visualTheme === 'matrix_flow') {
        // Flowing mathematical sine curves
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const y = height / 2 - 40 + Math.sin(x * 0.02 + t) * 45 + Math.cos(x * 0.01 + t * 0.5) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const y = height / 2 - 40 + Math.sin(x * 0.03 - t) * 35;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (currentReel.visualTheme === 'atomic_rings') {
        // Bohr atom simulation
        ctx.save();
        ctx.translate(width / 2, height / 2 - 40);
        for (let r = 1; r <= 3; r++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.25 * r})`;
          ctx.lineWidth = 1.8;
          ctx.arc(0, 0, r * 38, 0, Math.PI * 2);
          ctx.stroke();

          // Electron
          const angle = t * (4 - r);
          const ex = Math.cos(angle) * (r * 38);
          const ey = Math.sin(angle) * (r * 38);
          ctx.fillStyle = '#c084fc';
          ctx.beginPath();
          ctx.arc(ex, ey, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else {
        // Pulsing audio wave visualizer
        ctx.fillStyle = currentReel.category === 'useful' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(239, 68, 68, 0.7)';
        const barCount = 20;
        const barWidth = 6;
        const startX = width / 2 - (barCount * 12) / 2;
        for (let i = 0; i < barCount; i++) {
          const h = 20 + Math.abs(Math.sin(t * 3 + i * 0.4)) * 70;
          ctx.fillRect(startX + i * 12, height / 2 - 40 - h / 2, barWidth, h);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [currentIndex, currentReel]);

  // -------------------------------------------------------------------------
  // Sound Control
  // -------------------------------------------------------------------------
  const handleToggleAudio = () => {
    if (isAudioMuted) {
      setIsAudioMuted(false);
      ambientAudio.playTrack(currentReel.soundType || 'binaural_432');
      showToast('🔊 Audio track unmuted: ' + currentReel.soundName);
    } else {
      setIsAudioMuted(true);
      ambientAudio.stopAll();
      showToast('🔇 Audio muted');
    }
  };

  // -------------------------------------------------------------------------
  // Scroll Navigation Handlers (Real Reel Count Increment)
  // -------------------------------------------------------------------------
  const handleNextReel = () => {
    if (isHardLocked) {
      ambientAudio.playWarningChime();
      showToast('⚠️ Daily Reel Quota Exceeded! Complete the Mindful Reset.');
      return;
    }

    // Increment real counter in data store
    const updated = focusDataStore.incrementReelWatched({
      reelId: currentReel.id,
      title: currentReel.title,
      dwellSeconds
    });

    setReelsData(updated);
    setCurrentIndex(prev => prev + 1);

    if (updated.hardLockoutActive) {
      ambientAudio.playWarningChime();
      showToast('🚨 Quota limit reached! Reel scroller locked down.');
    } else {
      ambientAudio.playBellChime();
    }
  };

  const handlePrevReel = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleToggleLike = () => {
    const isLiked = !!likedReels[currentReel.id];
    setLikedReels(prev => ({ ...prev, [currentReel.id]: !isLiked }));
    setLikeCounts(prev => ({
      ...prev,
      [currentReel.id]: (prev[currentReel.id] || 0) + (isLiked ? -1 : 1)
    }));
    ambientAudio.playBellChime();
  };

  const handleShareReel = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('🔗 Reel link copied to clipboard!');
    } else {
      showToast('🔗 Reel link ready to share!');
    }
  };

  const handleSaveNewBudget = () => {
    focusDataStore.setDailyReelsBudget(Number(newBudgetInput));
    setShowBudgetModal(false);
    ambientAudio.playBellChime();
    showToast(`✅ Daily quota set to ${newBudgetInput} reels.`);
  };

  const handleResetReelsCounter = () => {
    focusDataStore.resetDailyReels();
    setMindfulnessCountdown(15);
    ambientAudio.playBellChime();
    showToast('🔄 Reels counter reset to 0/5!');
  };

  return (
    <div className="w-full flex flex-col items-center select-none text-white animate-fadeIn pb-12">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 border border-emerald-500 text-emerald-300 text-xs font-black px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top BrainPal Monitor Strip */}
      <div className="w-full max-w-md mb-4 bg-stone-900/90 border border-stone-800 rounded-2xl p-3.5 flex items-center justify-between shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center font-black shadow-lg">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white">BrainPal Reel Guard</span>
              <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full border ${
                isHardLocked 
                  ? 'bg-rose-950 text-rose-300 border-rose-500/50' 
                  : 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
              }`}>
                {isHardLocked ? 'LOCKED' : 'ACTIVE'}
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-mono">
              Reels: <strong className="text-amber-400">{reelsData.todayReelsWatched}</strong> / {reelsData.dailyReelsBudget || 5} budget
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowBudgetModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px] font-bold transition flex items-center gap-1 border border-stone-700 cursor-pointer"
            title="Adjust daily reels quota"
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Budget</span>
          </button>
          <button
            onClick={handleResetReelsCounter}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition border border-stone-700 cursor-pointer"
            title="Reset counter"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 9:16 Phone-style Reel Player Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[560px] sm:h-[620px] rounded-[36px] bg-stone-950 border-4 border-stone-800 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Animated Canvas Backdrop */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />

        {/* Top Floating HUD inside reel */}
        <div className="relative z-10 px-4 pt-4 flex items-center justify-between">
          
          {/* Reel Counter Tag */}
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Reel #{currentIndex + 1}</span>
            <span className="text-stone-400">({reelsData.todayReelsWatched}/{reelsData.dailyReelsBudget})</span>
          </div>

          {/* Dwell Timer & Sound Toggle */}
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{Math.floor(dwellSeconds / 60)}:{(dwellSeconds % 60).toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={handleToggleAudio}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white transition cursor-pointer"
              title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-stone-400" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
            </button>
          </div>
        </div>

        {/* Middle Gesture Area / Navigation Arrows */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-center">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevReel}
                className="pointer-events-auto p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-stone-300 hover:text-white transition cursor-pointer border border-white/10"
                title="Previous Reel"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex justify-end">
            {/* Right Side Social Action Strip */}
            <div className="pointer-events-auto flex flex-col items-center gap-4 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/10">
              
              {/* Like Button */}
              <button
                onClick={handleToggleLike}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className={`p-2.5 rounded-full transition transform group-active:scale-125 ${
                  likedReels[currentReel.id] 
                    ? 'bg-rose-500/30 text-rose-400' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  <Heart className={`w-5 h-5 ${likedReels[currentReel.id] ? 'fill-rose-400 text-rose-400' : ''}`} />
                </div>
                <span className="text-[10px] font-mono font-bold mt-1 text-stone-300">
                  {((likeCounts[currentReel.id] || 0) / 1000).toFixed(1)}k
                </span>
              </button>

              {/* Comment Button */}
              <button
                onClick={() => setCommentsOpen(!commentsOpen)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition group-active:scale-125">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold mt-1 text-stone-300">
                  {currentReel.initialComments}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShareReel}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition group-active:scale-125">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold mt-1 text-stone-300">
                  Share
                </span>
              </button>

              {/* Spinning Sound Disc */}
              <div className="w-9 h-9 rounded-full bg-stone-900 border-2 border-stone-700 flex items-center justify-center text-xs animate-spin">
                🎵
              </div>

            </div>
          </div>

          {/* Next Reel Down Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNextReel}
              className="pointer-events-auto px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 font-black text-xs transition cursor-pointer shadow-xl flex items-center gap-1.5 animate-bounce"
            >
              <span>Next Reel</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Reel Caption & Meta */}
        <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent pt-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-sm">
              {currentReel.avatar}
            </span>
            <span className="text-xs font-black text-white">{currentReel.creator}</span>
            {currentReel.verified && (
              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-[9px] flex items-center justify-center text-white font-bold">
                ✓
              </span>
            )}
            <span className={`text-[9px] font-mono px-2 py-0.2 rounded-full border ${
              currentReel.category === 'useful' 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' 
                : 'bg-rose-950 text-rose-300 border-rose-500/40'
            }`}>
              {currentReel.category === 'useful' ? 'Curriculum Study' : 'Doomscroll Distraction'}
            </span>
          </div>

          <h4 className="text-sm font-black text-white line-clamp-1">{currentReel.title}</h4>
          <p className="text-xs text-stone-300 line-clamp-2 mt-0.5 leading-relaxed">{currentReel.description}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {currentReel.tags.map(t => (
              <span key={t} className="text-[10px] font-mono text-cyan-300">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-stone-400">
            <span>🎵</span>
            <span className="truncate">{currentReel.soundName}</span>
          </div>
        </div>

        {/* ================================================================= */}
        {/* HARD LOCKOUT OVERLAY: Appears immediately when quota is reached   */}
        {/* ================================================================= */}
        {isHardLocked && (
          <div className="absolute inset-0 z-40 bg-stone-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            
            <div className="w-16 h-16 rounded-3xl bg-rose-500/20 border-2 border-rose-500/50 text-rose-400 flex items-center justify-center mb-4 shadow-xl shadow-rose-900/40 animate-pulse">
              <ShieldAlert className="w-9 h-9" />
            </div>

            <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 text-[10px] font-mono font-black uppercase tracking-wider border border-rose-500/40 mb-2">
              🚨 BrainPal Doomscroll Lockout
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Reel Limit Reached ({reelsData.todayReelsWatched}/{reelsData.dailyReelsBudget || 5})
            </h3>

            <p className="text-xs text-stone-300 max-w-xs mt-2 leading-relaxed">
              Your dopamine budget has expired. To protect your working memory and exam recall, the reel player is locked.
            </p>

            {/* Mindful Breathing Circle */}
            <div className="my-6 flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full border-4 border-emerald-500/30 flex flex-col items-center justify-center bg-stone-900/80 shadow-2xl">
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {mindfulnessCountdown}s
                </span>
                <span className="text-[10px] font-bold text-stone-400 mt-1">
                  {breathPhase}
                </span>
              </div>
              <span className="text-[11px] text-stone-400 mt-2">
                Mindful Reset to restore prefrontal cortex focus
              </span>
            </div>

            {/* Actions */}
            <div className="w-full space-y-2 max-w-xs">
              <button
                onClick={onReturnToStudy}
                disabled={mindfulnessCountdown > 0}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-black text-xs uppercase tracking-wider transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Return to DAV Textbooks</span>
              </button>

              <button
                onClick={handleResetReelsCounter}
                className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Daily Quota (Parent PIN)</span>
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Adjust Daily Budget Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-400" />
              <div>
                <h3 className="text-base font-black text-white">Daily Short-Video Quota</h3>
                <p className="text-xs text-stone-400">Set maximum reels allowed per day</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-300">Reel Quota Budget</label>
              <div className="flex items-center gap-2">
                {[3, 5, 10, 15].map(b => (
                  <button
                    key={b}
                    onClick={() => setNewBudgetInput(b)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                      newBudgetInput === b
                        ? 'bg-amber-500 text-stone-950 border-amber-400'
                        : 'bg-stone-800 text-stone-300 border-stone-700'
                    }`}
                  >
                    {b} reels
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
                onClick={handleSaveNewBudget}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 text-xs font-black cursor-pointer transition"
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
