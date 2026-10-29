import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, X, Sparkles, Compass, Shield, Maximize2, Minimize2, ArrowRight } from 'lucide-react';

export function Cinematic15sExperience({ isOpen, onClose, onFinish }) {
  const [activeFilm, setActiveFilm] = useState(1); // 1 = Cosmic Vedic Awakening, 2 = 6-Dimension Hyperdrive
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 0 to 15 seconds
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const TOTAL_DURATION = 15.0; // Exactly 15.000 seconds

  // Handle Play/Pause
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  // Replay
  const handleReplay = () => {
    setCurrentTime(0);
    startTimeRef.current = performance.now();
    setIsPlaying(true);
    triggerAudioSting(activeFilm);
  };

  // Switch Film
  const switchFilm = (filmId) => {
    setActiveFilm(filmId);
    setCurrentTime(0);
    startTimeRef.current = performance.now();
    setIsPlaying(true);
    triggerAudioSting(filmId);
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Web Audio API Synthesizer (Harmonic frequencies for 15s experience)
  const initAudio = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (e) {}
  };

  const stopAllOscillators = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    oscillatorsRef.current = [];
  };

  const triggerAudioSting = (filmId) => {
    if (isMuted) return;
    initAudio();
    stopAllOscillators();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.12, now + 1.5);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 14.8);

      // Frequencies for Film 1 (Sacred Vedic C-Major chord 128Hz, 256Hz, 384Hz, 512Hz)
      // Frequencies for Film 2 (Sci-Fi Cybernetic D-Minor chord 146.8Hz, 220Hz, 293.6Hz, 440Hz)
      const freqs = filmId === 1 
        ? [128, 192, 256, 384, 512] 
        : [146.8, 220, 293.6, 440, 587.3];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        osc.type = filmId === 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        // Add subtle vibrato / pitch swell
        osc.frequency.exponentialRampToValueAtTime(freq * (1 + 0.05 * (idx % 2 === 0 ? 1 : -1)), now + 7.5);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 14.5);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 15.0);
        oscillatorsRef.current.push(osc);
      });
    } catch (e) {}
  };

  // Main 15s Timer Loop
  useEffect(() => {
    if (!isOpen) {
      stopAllOscillators();
      return;
    }

    startTimeRef.current = performance.now() - (currentTime * 1000);
    triggerAudioSting(activeFilm);

    const tick = (now) => {
      if (isPlaying) {
        const elapsed = (now - startTimeRef.current) / 1000;
        if (elapsed >= TOTAL_DURATION) {
          setCurrentTime(TOTAL_DURATION);
          setIsPlaying(false);
        } else {
          setCurrentTime(elapsed);
        }
      } else {
        startTimeRef.current = now - (currentTime * 1000);
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      stopAllOscillators();
    };
  }, [isOpen, isPlaying, activeFilm]);

  // Canvas Graphics Engine (60 FPS WebGL / 2D Canvas)
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool for Film 1 (Cosmic Vedic Awakening)
    const vedicParticles = Array.from({ length: 450 }, () => ({
      x: (Math.random() - 0.5) * width * 1.5 + width / 2,
      y: (Math.random() - 0.5) * height * 1.5 + height / 2,
      originX: width / 2,
      originY: height / 2,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      size: Math.random() * 3 + 1,
      color: ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#ffffff'][Math.floor(Math.random() * 5)],
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * 320 + 30,
      orbitSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
    }));

    // Particle pool for Film 2 (6-Dimension Hyperdrive)
    const hyperdriveStars = Array.from({ length: 600 }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * width,
      dimIndex: Math.floor(Math.random() * 6),
      size: Math.random() * 2 + 1
    }));

    let frameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const progress = Math.min(currentTime / TOTAL_DURATION, 1.0); // 0.0 to 1.0

      if (activeFilm === 1) {
        // ==========================================
        // FILM 1: COSMIC VEDIC AWAKENING (15 SECONDS)
        // ==========================================

        // Background space gradient
        const bgGrad = ctx.createRadialGradient(
          width / 2, height / 2, 50,
          width / 2, height / 2, Math.max(width, height) * 0.8
        );
        bgGrad.addColorStop(0, '#1e0505');
        bgGrad.addColorStop(0.5, '#0b0f19');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Phase 1 (0 to 3s): Primordial Singularity
        if (progress < 0.20) {
          const p1 = progress / 0.20;
          ctx.save();
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, 8 + p1 * 50, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${0.4 + p1 * 0.6})`;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 40 * p1;
          ctx.fill();
          ctx.restore();

          // Shockwave ripple
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, p1 * Math.max(width, height) * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(245, 158, 11, ${1 - p1})`;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Phase 2 (3s to 8s): Sacred Geometry & DAV Vedic Flame
        if (progress >= 0.15 && progress < 0.55) {
          const p2 = (progress - 0.15) / 0.40;
          ctx.save();
          ctx.translate(width / 2, height / 2);
          ctx.rotate(progress * 2);

          // Concentric Sacred Rings
          for (let r = 1; r <= 4; r++) {
            ctx.beginPath();
            ctx.arc(0, 0, r * 45 * Math.min(p2 * 1.5, 1), 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.25 * (5 - r) * Math.sin(p2 * Math.PI)})`;
            ctx.lineWidth = 1.5;
            ctx.setLineDash([8, 12]);
            ctx.stroke();
          }

          // Rotating 8-petal Sacred Lotus geometry
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.ellipse(
              Math.cos(angle) * 75 * p2,
              Math.sin(angle) * 75 * p2,
              28 * p2,
              55 * p2,
              angle,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
            ctx.stroke();
          }
          ctx.restore();

          // Center Flame Glow
          const flameSize = 40 + Math.sin(currentTime * 12) * 6;
          ctx.save();
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, flameSize, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 35;
          ctx.fill();
          ctx.restore();
        }

        // Phase 3 (8s to 12s): Knowledge Constellation Nodes
        if (progress >= 0.50 && progress < 0.82) {
          const p3 = (progress - 0.50) / 0.32;
          const subjects = ['Mathematics', 'Science', 'Social Science', 'Hindi', 'English', 'Rishi AI'];
          const nodeRadius = 180 + Math.sin(currentTime * 2) * 15;

          ctx.save();
          subjects.forEach((subj, i) => {
            const angle = (i * (Math.PI * 2)) / subjects.length + currentTime * 0.3;
            const nx = width / 2 + Math.cos(angle) * nodeRadius;
            const ny = height / 2 + Math.sin(angle) * nodeRadius;

            // Laser filament to center
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.lineTo(nx, ny);
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.4 * p3})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Connective polygon perimeter
            const nextAngle = ((i + 1) * (Math.PI * 2)) / subjects.length + currentTime * 0.3;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo(width / 2 + Math.cos(nextAngle) * nodeRadius, height / 2 + Math.sin(nextAngle) * nodeRadius);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.35 * p3})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Node circle
            ctx.beginPath();
            ctx.arc(nx, ny, 16, 0, Math.PI * 2);
            ctx.fillStyle = '#0f172a';
            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 2.5;
            ctx.fill();
            ctx.stroke();

            // Node Label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(subj, nx, ny + 32);
          });
          ctx.restore();
        }

        // Phase 4 (12s to 15s): Supernova Warp & Campus Entrance
        if (progress >= 0.80) {
          const p4 = (progress - 0.80) / 0.20;
          ctx.save();
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, p4 * Math.max(width, height) * 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(251, 191, 36, ${p4 * 0.4})`;
          ctx.fill();

          // Golden burst lines
          for (let i = 0; i < 36; i++) {
            const angle = (i * Math.PI) / 18;
            ctx.beginPath();
            ctx.moveTo(width / 2, height / 2);
            ctx.lineTo(
              width / 2 + Math.cos(angle) * Math.max(width, height) * p4,
              height / 2 + Math.sin(angle) * Math.max(width, height) * p4
            );
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - p4)})`;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
          ctx.restore();
        }

        // Render ambient orbital particles
        vedicParticles.forEach(p => {
          p.angle += p.orbitSpeed;
          const currentDist = p.distance * (1 + progress * 0.5);
          const px = width / 2 + Math.cos(p.angle) * currentDist;
          const py = height / 2 + Math.sin(p.angle) * currentDist;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;
          ctx.fill();
        });

      } else {
        // ==========================================
        // FILM 2: 6-DIMENSION HYPERDRIVE WARP (15 SECONDS)
        // ==========================================

        // Deep cyber dark background
        ctx.fillStyle = '#05070e';
        ctx.fillRect(0, 0, width, height);

        const warpSpeed = 10 + Math.pow(progress * 15, 1.8);
        const dimensionColors = [
          '#06b6d4', // Dim 1: Free (Cyan)
          '#3b82f6', // Dim 2: Normal (Blue)
          '#a855f7', // Dim 3: VIP (Purple)
          '#f59e0b', // Dim 4: VVIP (Amber Gold)
          '#10b981', // Dim 5: Developer (Emerald)
          '#ef4444'  // Dim 6: Teacher (Vedic Red)
        ];

        // Active dimension tier by progress (Traversing 1 to 6 in 15 seconds)
        const currentDimIndex = Math.min(Math.floor(progress * 6), 5);
        const activeColor = dimensionColors[currentDimIndex];

        // 3D Starfield Warp projection
        hyperdriveStars.forEach(star => {
          star.z -= warpSpeed * 0.25;
          if (star.z <= 0) {
            star.z = width;
            star.x = (Math.random() - 0.5) * width;
            star.y = (Math.random() - 0.5) * height;
          }

          const k = 250 / star.z;
          const px = star.x * k + width / 2;
          const py = star.y * k + height / 2;

          if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = (1 - star.z / width) * 4;
            ctx.beginPath();
            ctx.moveTo(px, py);
            // Trail line for warp illusion
            ctx.lineTo(
              star.x * (250 / (star.z + warpSpeed * 0.5)) + width / 2,
              star.y * (250 / (star.z + warpSpeed * 0.5)) + height / 2
            );
            ctx.strokeStyle = dimensionColors[star.dimIndex % dimensionColors.length];
            ctx.lineWidth = Math.max(size, 1);
            ctx.stroke();
          }
        });

        // Center Dimensional Hyper-Ring
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(progress * 6);

        // Gyroscopic Outer Rings
        for (let ring = 1; ring <= 3; ring++) {
          ctx.beginPath();
          ctx.ellipse(0, 0, ring * 80, ring * 40, (ring * Math.PI) / 3, 0, Math.PI * 2);
          ctx.strokeStyle = activeColor;
          ctx.lineWidth = 2.5;
          ctx.shadowBlur = 20;
          ctx.shadowColor = activeColor;
          ctx.stroke();
        }

        // Central Quantum Singularity Sphere
        ctx.beginPath();
        ctx.arc(0, 0, 35 + Math.sin(currentTime * 8) * 8, 0, Math.PI * 2);
        ctx.fillStyle = activeColor;
        ctx.shadowBlur = 40;
        ctx.shadowColor = activeColor;
        ctx.fill();
        ctx.restore();

        // High-Tech Cyber Target Reticle HUD
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        // Crosshairs
        ctx.beginPath();
        ctx.moveTo(width / 2 - 120, height / 2);
        ctx.lineTo(width / 2 + 120, height / 2);
        ctx.moveTo(width / 2, height / 2 - 120);
        ctx.lineTo(width / 2, height / 2 + 120);
        ctx.stroke();

        // Corner brackets
        const s = 60;
        const pad = 80;
        ctx.strokeStyle = activeColor;
        ctx.lineWidth = 3;
        // Top Left
        ctx.beginPath();
        ctx.moveTo(pad, pad + s);
        ctx.lineTo(pad, pad);
        ctx.lineTo(pad + s, pad);
        ctx.stroke();
        // Top Right
        ctx.beginPath();
        ctx.moveTo(width - pad - s, pad);
        ctx.lineTo(width - pad, pad);
        ctx.lineTo(width - pad, pad + s);
        ctx.stroke();
        // Bottom Left
        ctx.beginPath();
        ctx.moveTo(pad, height - pad - s);
        ctx.lineTo(pad, height - pad);
        ctx.lineTo(pad + s, height - pad);
        ctx.stroke();
        // Bottom Right
        ctx.beginPath();
        ctx.moveTo(width - pad - s, height - pad);
        ctx.lineTo(width - pad, height - pad);
        ctx.lineTo(width - pad, height - pad - s);
        ctx.stroke();
        ctx.restore();
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, activeFilm, currentTime]);

  if (!isOpen) return null;

  const currentProgressPercent = Math.min((currentTime / TOTAL_DURATION) * 100, 100);

  // Phase labels for Film 1
  const getFilm1Phase = () => {
    if (currentTime < 3.0) return 'Phase I: Primordial Quantum Singularity';
    if (currentTime < 7.5) return 'Phase II: Sacred Vedic Flame & DAV Geometry';
    if (currentTime < 11.5) return 'Phase III: Constellation of Subject Knowledge';
    return 'Phase IV: Supernova Light Warp & Campus Entrance';
  };

  // Phase labels for Film 2
  const getFilm2Phase = () => {
    if (currentTime < 2.5) return 'Stage 1: Dimension Telemetry & Quantum Alignment';
    if (currentTime < 5.0) return 'Stage 2: Dimension 1 & 2 (Free & Normal Gate)';
    if (currentTime < 8.0) return 'Stage 3: Dimension 3 & 4 (VIP & VVIP Gold Sanctum)';
    if (currentTime < 11.5) return 'Stage 4: Dimension 5 (Master Developer Rishit Shankar)';
    return 'Stage 5: Dimension 6 (Faculty Master OS & Prismatic Nexus)';
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white select-none overflow-hidden"
    >
      {/* 60 FPS Canvas Surface */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Top Header HUD Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              15-Second Cinematic Experience
            </div>
            <div className="text-base sm:text-lg font-black tracking-tight">
              {activeFilm === 1 
                ? 'तमसो मा ज्योतिर्गमय — The Cosmic Vedic Awakening' 
                : 'Quantum Dimension Leap — 6-Dimension Hyperdrive'}
            </div>
          </div>
        </div>

        {/* Film Switcher Pills */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-white/10 border border-white/20">
            <button
              onClick={() => switchFilm(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilm === 1 
                  ? 'bg-amber-500 text-stone-950 shadow-md' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Film 1: Vedic Awakening
            </button>
            <button
              onClick={() => switchFilm(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFilm === 2 
                  ? 'bg-cyan-500 text-stone-950 shadow-md' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Film 2: 6D Hyperdrive
            </button>
          </div>

          <button
            onClick={() => setIsMuted(prev => !prev)}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="hidden sm:block p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              stopAllOscillators();
              onClose();
            }}
            className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/40 text-rose-300 transition-colors"
            title="Exit Cinematic"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Cinematic Scripture Overlay (Appears dynamically in Film 1 Phase 2) */}
      {activeFilm === 1 && currentTime >= 3.0 && currentTime <= 8.5 && (
        <div className="relative z-10 text-center pointer-events-none px-4">
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black vfx-sanskrit-shimmer tracking-wider drop-shadow-2xl">
            तमसो मा ज्योतिर्गमय
          </div>
          <div className="text-xs sm:text-sm font-medium text-amber-200/80 mt-2 tracking-widest uppercase">
            From Darkness unto Light • The DAV Motto
          </div>
        </div>
      )}

      {/* Center 6D Dimension HUD Overlay (Appears in Film 2) */}
      {activeFilm === 2 && (
        <div className="relative z-10 text-center pointer-events-none px-4">
          <div className="text-2xl sm:text-4xl font-black uppercase tracking-wider text-cyan-300 drop-shadow-2xl">
            Dimension {Math.min(Math.floor((currentTime / TOTAL_DURATION) * 6) + 1, 6)} Active
          </div>
          <div className="text-xs sm:text-sm font-mono text-cyan-200/70 mt-1">
            {currentTime < 2.5 && 'FREE PLAN EXPLORER — DIMENSION 1'}
            {currentTime >= 2.5 && currentTime < 5.0 && 'NORMAL ACADEMIC SUITE — DIMENSION 2'}
            {currentTime >= 5.0 && currentTime < 8.0 && 'VIP PRIVILEGE SANCTUM — DIMENSION 3'}
            {currentTime >= 8.0 && currentTime < 10.5 && 'VVIP EXECUTIVE MAJESTY — DIMENSION 4'}
            {currentTime >= 10.5 && currentTime < 13.0 && 'DEVELOPER MASTER CONSOLE (RISHIT SHANKAR) — DIMENSION 5'}
            {currentTime >= 13.0 && 'TEACHER FACULTY MASTER OS — DIMENSION 6'}
          </div>
        </div>
      )}

      {/* Bottom Interactive HUD Bar & Timeline Scrubber */}
      <div className="relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent">
        {/* Phase Telemetry Stamp */}
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <span className="text-amber-300 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            {activeFilm === 1 ? getFilm1Phase() : getFilm2Phase()}
          </span>
          <span className="text-stone-400 font-bold">
            {currentTime.toFixed(2)}s / {TOTAL_DURATION.toFixed(2)}s
          </span>
        </div>

        {/* 15s Precision Progress Bar */}
        <div 
          className="relative w-full h-2.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden mb-4 border border-white/10"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            setCurrentTime(clickPos * TOTAL_DURATION);
            startTimeRef.current = performance.now() - (clickPos * TOTAL_DURATION * 1000);
          }}
        >
          <div 
            className={`h-full transition-all duration-75 ${
              activeFilm === 1 
                ? 'bg-gradient-to-r from-amber-500 via-red-500 to-amber-300' 
                : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500'
            }`}
            style={{ width: `${currentProgressPercent}%` }}
          />
        </div>

        {/* Playback Controls & Action */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-transform active:scale-95 shadow-lg flex items-center gap-2 text-xs"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-stone-950" /> : <Play className="w-4 h-4 fill-stone-950" />}
              <span>{isPlaying ? 'Pause' : 'Play 15s'}</span>
            </button>

            <button
              onClick={handleReplay}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-colors flex items-center gap-1.5 text-xs"
              title="Replay from 0.00s"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                stopAllOscillators();
                if (onFinish) onFinish();
                onClose();
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider transition-transform active:scale-95 shadow-xl flex items-center gap-2"
            >
              <span>Enter Campus</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
