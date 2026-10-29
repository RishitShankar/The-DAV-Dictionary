import React, { useEffect, useRef, useState } from 'react';
import { Flame, Sparkles, X } from 'lucide-react';

/**
 * CinematicFlameVfx - 5-Second Cinematic Flame VFX
 * Used for:
 * 1. Entering Section 2 (Digital Textbooks)
 * 2. Opening PDF (while PDF loads)
 * 3. Saving custom uploaded PDF to library
 * 
 * Features procedural GPU flame particle simulation, radiant Vedic sacred light,
 * precision 5.00s countdown arc, and automatic smooth dissolve.
 */
export function CinematicFlameVfx({
  isOpen,
  onComplete,
  title = "Opening Digital Textbook Vault",
  subtitle = "DAV School Academic Curriculum • Classes 1 to 8"
}) {
  const [timeLeft, setTimeLeft] = useState(5.0);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const audioCtxRef = useRef(null);

  const TOTAL_DURATION = 5.0; // Exactly 5.00 seconds

  // Web Audio subtle warm singing bowl tone
  useEffect(() => {
    if (!isOpen) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const now = ctx.currentTime;
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.8);

        // Harmonic frequencies (432Hz Vedic resonance)
        [216, 432, 648].forEach((freq) => {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.connect(gain);
          osc.start(now);
          osc.stop(now + 5.0);
        });
      }
    } catch (e) {}

    return () => {
      try { audioCtxRef.current?.close(); } catch (e) {}
    };
  }, [isOpen]);

  // Timer loop
  useEffect(() => {
    if (!isOpen) return;

    startTimeRef.current = performance.now();
    setTimeLeft(TOTAL_DURATION);

    const tick = (now) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      const remaining = Math.max(0, TOTAL_DURATION - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        if (onComplete) onComplete();
      } else {
        animationFrameRef.current = requestAnimationFrame(tick);
      }
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isOpen, onComplete]);

  // Canvas flame & ember physics engine
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

    // Procedural Flame Particle Pool
    const flameCount = 180;
    const flames = Array.from({ length: flameCount }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 60,
      y: height * 0.58 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(Math.random() * 3.5 + 2.0),
      size: Math.random() * 16 + 8,
      life: Math.random() * 0.8 + 0.2,
      maxLife: Math.random() * 0.8 + 0.2,
      color: ['#fbbf24', '#f59e0b', '#ef4444', '#f97316', '#ffedd5'][Math.floor(Math.random() * 5)]
    }));

    // Rising Golden Sparks & Embers
    const sparkCount = 120;
    const sparks = Array.from({ length: sparkCount }, () => ({
      x: width / 2 + (Math.random() - 0.5) * 160,
      y: height * 0.6 + Math.random() * 40,
      vx: (Math.random() - 0.5) * 2.2,
      vy: -(Math.random() * 4.5 + 1.5),
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.05 + 0.02
    }));

    let frameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark academia vignette background
      const grad = ctx.createRadialGradient(
        width / 2, height * 0.55, 30,
        width / 2, height * 0.55, Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, '#2a0a0a');
      grad.addColorStop(0.4, '#120505');
      grad.addColorStop(1, '#050202');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 1. Central Core Glowing Flame Light Aura
      const corePulse = 90 + Math.sin(Date.now() * 0.008) * 12;
      const coreGrad = ctx.createRadialGradient(
        width / 2, height * 0.56, 10,
        width / 2, height * 0.56, corePulse
      );
      coreGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
      coreGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.7)');
      coreGrad.addColorStop(0.7, 'rgba(239, 68, 68, 0.3)');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.56, corePulse, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render rising flame tongues
      ctx.save();
      flames.forEach((p) => {
        p.x += p.vx + Math.sin(p.life * 8) * 0.8;
        p.y += p.vy;
        p.life -= 0.016;
        p.size *= 0.97;

        if (p.life <= 0 || p.size <= 0.5) {
          p.x = width / 2 + (Math.random() - 0.5) * 50;
          p.y = height * 0.58 + Math.random() * 20;
          p.vx = (Math.random() - 0.5) * 1.5;
          p.vy = -(Math.random() * 3.5 + 2.0);
          p.size = Math.random() * 16 + 8;
          p.life = Math.random() * 0.8 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.shadowBlur = 14;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
      });
      ctx.restore();

      // 3. Render rising sparks / embers
      ctx.save();
      sparks.forEach((s) => {
        s.sway += s.swaySpeed;
        s.x += s.vx + Math.sin(s.sway) * 1.2;
        s.y += s.vy;
        s.alpha -= 0.005;

        if (s.y < 0 || s.alpha <= 0) {
          s.x = width / 2 + (Math.random() - 0.5) * 140;
          s.y = height * 0.6 + Math.random() * 30;
          s.vy = -(Math.random() * 4.5 + 1.5);
          s.alpha = Math.random() * 0.8 + 0.3;
          s.size = Math.random() * 3 + 1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
      });
      ctx.restore();

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.max(0, Math.min(100, (timeLeft / TOTAL_DURATION) * 100));

  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-between bg-black/95 text-white select-none overflow-hidden animate-fadeIn">
      {/* 60 FPS GPU Flame & Sparks Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Top Bar with Skip Button */}
      <div className="relative z-20 w-full flex items-center justify-between px-6 py-5 max-w-5xl">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-widest uppercase">
          <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Vedic Flame Cinematic • 5.0s</span>
        </div>

        <button
          onClick={onComplete}
          className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-stone-200 hover:text-white transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Sacred Typography & Motif */}
      <div className="relative z-20 text-center px-4 max-w-2xl mx-auto my-auto space-y-4">
        {/* Sanskrit Motto with Luminous Shimmer */}
        <div className="text-3xl sm:text-5xl font-black vfx-sanskrit-shimmer tracking-wider drop-shadow-2xl">
          ॐ तमसो मा ज्योतिर्गमय
        </div>
        <div className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-amber-300/90 font-mono">
          Lead Me From Darkness Unto Light • The DAV Motto
        </div>

        {/* Dynamic Title & Subtitle */}
        <div className="pt-2">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-medium mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Circular Progress Indicator & Countdown */}
      <div className="relative z-20 pb-8 flex flex-col items-center gap-2">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-stone-800"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-amber-400 transition-all duration-75"
              strokeDasharray={`${progressPercent}, 100`}
              strokeWidth="3.2"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute text-xs font-mono font-black text-amber-300">
            {timeLeft.toFixed(1)}s
          </span>
        </div>
        <div className="text-[11px] font-mono text-stone-400 uppercase tracking-widest">
          Synchronizing Curriculum
        </div>
      </div>
    </div>
  );
}

export default CinematicFlameVfx;
