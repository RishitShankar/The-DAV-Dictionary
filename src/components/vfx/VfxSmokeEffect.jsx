import React, { useEffect, useRef, useState } from 'react';
import { Cloud, X } from 'lucide-react';

/**
 * VfxSmokeEffect - Realistic Fluid Smoke VFX
 * Triggered in Faculty Portal (Section 5, Page 2) when clicking the user profile below settings
 * 
 * Features:
 * - 60 FPS Canvas procedural expanding smoke puff simulation
 * - Fluid rolling turbulence eddies with realistic smoke diffusion
 * - Auto-dissolves over 4.5 seconds with soft opacity fade
 */
export function VfxSmokeEffect({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (!visible) return;
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

    // Emitter origin: lower left / center
    const emitterX = Math.min(width * 0.25, 260);
    const emitterY = height * 0.85;

    // Generate smoke particles pool
    const particles = [];
    const maxParticles = 90;

    startTimeRef.current = performance.now();
    const DURATION = 4.5; // 4.5 seconds total smoke duration

    const render = (now) => {
      const elapsed = (now - startTimeRef.current) / 1000;

      if (elapsed >= DURATION) {
        if (onClose) onClose();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Spawn new smoke puffs while within first 3 seconds
      if (elapsed < 3.2 && particles.length < maxParticles) {
        for (let i = 0; i < 3; i++) {
          particles.push({
            x: emitterX + (Math.random() - 0.5) * 40,
            y: emitterY + (Math.random() - 0.5) * 20,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -(Math.random() * 2.2 + 1.2),
            radius: Math.random() * 16 + 12,
            maxRadius: Math.random() * 80 + 70,
            growth: Math.random() * 0.8 + 0.6,
            angle: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.04,
            alpha: Math.random() * 0.45 + 0.35,
            color: ['#e2e8f0', '#cbd5e1', '#94a3b8', '#a7f3d0'][Math.floor(Math.random() * 4)]
          });
        }
      }

      // Update & render smoke puffs
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx += (Math.random() - 0.5) * 0.15; // gentle turbulence
        p.angle += p.angularVelocity;

        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
        }

        // Dissolve alpha over time
        p.alpha -= 0.0035;

        if (p.alpha <= 0 || p.y < -100) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);

          // Soft volumetric smoke puff gradient
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
          grad.addColorStop(0, `rgba(241, 245, 249, ${p.alpha * 0.8})`);
          grad.addColorStop(0.45, `rgba(203, 213, 225, ${p.alpha * 0.5})`);
          grad.addColorStop(0.8, `rgba(148, 163, 184, ${p.alpha * 0.2})`);
          grad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle indicator badge */}
      <div className="absolute top-6 left-6 pointer-events-auto z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 text-emerald-300 border border-emerald-400/40 text-xs shadow-xl backdrop-blur-md">
        <Cloud className="w-4 h-4 text-emerald-400 animate-pulse" />
        <span className="font-bold">Ethereal Smoke Simulation Active</span>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-2 hover:text-white cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default VfxSmokeEffect;
