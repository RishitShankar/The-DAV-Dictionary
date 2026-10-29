import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Wind, X } from 'lucide-react';

/**
 * VfxCycloneVortex - 3-Second Cyclone Vortex VFX
 * Triggered when navigating to Section 11 (About Creator Rishit Shankar)
 * 
 * Features:
 * - 60 FPS Canvas spiraling atmospheric hurricane vortex simulation
 * - Dual spiral storm arms with 350+ whirlwind plasma particles
 * - Atmospheric wind howl audio synthesis (Web Audio API)
 * - Precision 3.0s timer: Ferocious spinning -> Rapid shrinking at t > 2.2s -> Center Singularity Dissolve
 * - Smoothly unveils Rishit Shankar's Creator Profile
 */
export function VfxCycloneVortex({ isOpen, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(3.0);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);

  const TOTAL_DURATION = 3.0; // Exactly 3.0 seconds

  // Atmospheric Vortex Sound FX via Web Audio API
  useEffect(() => {
    if (!isOpen) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;
        const now = ctx.currentTime;

        // Roaring wind oscillator with exponential pitch sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 2.0);
        osc.frequency.exponentialRampToValueAtTime(650, now + 2.9);

        // Wind noise filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.linearRampToValueAtTime(1400, now + 2.2);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.6);
        gain.gain.linearRampToValueAtTime(0.12, now + 2.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.0);

        // Chime of revelation at 3.0s
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = 'triangle';
        chime.frequency.setValueAtTime(528, now + 2.7);
        chime.frequency.exponentialRampToValueAtTime(1056, now + 3.0);
        chimeGain.gain.setValueAtTime(0.001, now + 2.7);
        chimeGain.gain.linearRampToValueAtTime(0.1, now + 2.85);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start(now + 2.7);
        chime.stop(now + 3.2);
      }
    } catch (e) {}

    return () => {
      try { audioCtxRef.current?.close(); } catch (e) {}
    };
  }, [isOpen]);

  // 60 FPS Cyclone Vortex Canvas Simulation
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

    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.max(width, height) * 0.65;

    // Generate 320 cyclone swirl particles
    const particles = Array.from({ length: 320 }, () => {
      const arm = Math.random() < 0.5 ? 0 : Math.PI;
      const initialR = Math.random() * maxRadius * 0.9 + 20;
      return {
        r: initialR,
        initialR,
        theta: Math.random() * Math.PI * 2 + arm,
        speed: (Math.random() * 0.04 + 0.035),
        size: Math.random() * 3.5 + 1.2,
        color: [
          '#38bdf8', '#818cf8', '#c084fc', '#e0e7ff', '#fcd34d', '#22d3ee'
        ][Math.floor(Math.random() * 6)],
        alpha: Math.random() * 0.8 + 0.2
      };
    });

    startTimeRef.current = performance.now();

    const loop = (timestamp) => {
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const remaining = Math.max(0, TOTAL_DURATION - elapsed);
      setTimeLeft(remaining);

      if (elapsed >= TOTAL_DURATION) {
        if (onComplete) onComplete();
        return;
      }

      // Cyclone State:
      // t < 2.2s: expanding/stable intense rotation
      // t >= 2.2s: rapid shrinking inwards to center singularity
      let shrinkScale = 1.0;
      if (elapsed >= 2.2) {
        const shrinkProgress = (elapsed - 2.2) / 0.8; // 0 to 1
        shrinkScale = Math.max(0.02, Math.pow(1 - shrinkProgress, 2.5));
      }

      ctx.fillStyle = 'rgba(3, 7, 18, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Render Central Storm Eye
      const currentEyeRadius = Math.max(12, 50 * shrinkScale);
      const eyeGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, currentEyeRadius * 2);
      eyeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      eyeGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.6)');
      eyeGrad.addColorStop(0.7, 'rgba(129, 140, 248, 0.3)');
      eyeGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, currentEyeRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = eyeGrad;
      ctx.fill();

      // Swirling Cyclone Spiral Arms
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(elapsed * 4.5); // Fast rotation

      for (let a = 0; a < 2; a++) {
        const armOffset = a * Math.PI;
        ctx.beginPath();
        for (let r = 20; r < maxRadius * shrinkScale; r += 12) {
          const angle = Math.log(r / 20) * 2.8 + armOffset;
          const x = Math.cos(angle) * r;
          const y = Math.sin(angle) * r;
          if (r === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = a === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(192, 132, 252, 0.35)';
        ctx.lineWidth = 14 * shrinkScale;
        ctx.stroke();
      }
      ctx.restore();

      // Render Cyclone Swirl Particles
      particles.forEach((p) => {
        p.theta += p.speed * (1 + (1 - shrinkScale) * 2);
        // Slowly suck inward
        p.r -= 1.2;
        if (p.r < 15) p.r = p.initialR;

        const effectiveR = p.r * shrinkScale;
        const px = cx + Math.cos(p.theta) * effectiveR;
        const py = cy + Math.sin(p.theta) * effectiveR;

        ctx.beginPath();
        ctx.arc(px, py, p.size * shrinkScale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      });

      // Singularity Flash at the End
      if (elapsed > 2.7) {
        const flashAlpha = (elapsed - 2.7) / 0.3;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 * flashAlpha, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.9})`;
        ctx.shadowBlur = 40;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.max(0, ((TOTAL_DURATION - timeLeft) / TOTAL_DURATION) * 100));

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 bg-stone-950/90 backdrop-blur-md select-none overflow-hidden animate-fade-in">
      {/* 60 FPS Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-4xl pt-4">
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-400/50 shadow-xl backdrop-blur-md">
          <Wind className="w-4 h-4 text-cyan-300 animate-spin" />
          <span className="text-xs font-black tracking-wider text-cyan-200 uppercase">
            3-Second Cyclone Vortex Active
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onComplete) onComplete();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition cursor-pointer backdrop-blur-md"
        >
          <X className="w-3.5 h-3.5" />
          <span>Skip</span>
        </button>
      </div>

      {/* Center Cinematic Display */}
      <div className="relative z-10 text-center max-w-xl mx-auto space-y-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[11px] font-black uppercase tracking-widest shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />
          <span>Section 11 • Master Creator Dimension</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
          🌪️ Summoning Profile
        </h2>

        <p className="text-sm sm:text-base text-cyan-100 font-medium">
          D.A.V. Public School Head Boy • Rishit Shankar
        </p>

        {/* 3-Second Precision Progress Countdown Arc */}
        <div className="pt-2 flex flex-col items-center gap-2">
          <div className="w-48 h-2 rounded-full bg-white/15 overflow-hidden p-0.5 border border-cyan-400/40">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300 transition-all duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300">
            {timeLeft > 0.8 ? `Cyclone Vortex Gathering • ${timeLeft.toFixed(1)}s` : `Shrinking Into Singularity...`}
          </span>
        </div>
      </div>

      {/* Bottom Motto */}
      <div className="relative z-10 pb-4 text-center">
        <p className="text-xs text-slate-400 font-mono">
          ॐ असतो मा सद्गमय • Transitioning to Creator Profile
        </p>
      </div>
    </div>
  );
}

export default VfxCycloneVortex;
