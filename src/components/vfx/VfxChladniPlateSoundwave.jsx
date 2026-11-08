import React, { useEffect, useRef } from 'react';

/**
 * VfxChladniPlateSoundwave - The Soundwave Acoustic Resonance Field (Chladni Plate)
 * Real-time harmonic vibration patterns that dynamically rearrange into complex symmetrical
 * mandalas as audio frequencies modulate with cursor position.
 */
export function VfxChladniPlateSoundwave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Sand Grains on Chladni Resonating Plate
    const particleCount = Math.min(Math.floor(width / 2.2), 650);
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 440,
      y: (Math.random() - 0.5) * 440,
      vx: 0,
      vy: 0,
      color: ['#fbbf24', '#f59e0b', '#38bdf8', '#c084fc', '#ffffff'][Math.floor(Math.random() * 5)]
    }));

    let t = 0;
    let animId;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Dark Acoustic Resonance Chamber Background
      const bg = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#0d0d18');
      bg.addColorStop(0.5, '#05050c');
      bg.addColorStop(1, '#020205');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Chladni modal integers (n, m) dynamically modulated by mouse position
      const n = Math.floor((mouseX / width) * 5) + 2;
      const m = Math.floor((mouseY / height) * 5) + 2;
      const L = 220; // Half-width of resonant square plate

      ctx.save();
      ctx.translate(cx, cy);

      // Draw Outer Resonant Plate Perimeter
      ctx.beginPath();
      ctx.arc(0, 0, L + 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#38bdf8';
      ctx.stroke();

      // Particle Chladni Physics: w(x,y) = a*sin(n*pi*x/L)*sin(m*pi*y/L) - b*sin(m*pi*x/L)*sin(n*pi*y/L)
      particles.forEach((p) => {
        const xNorm = p.x / L;
        const yNorm = p.y / L;

        // Mathematical Chladni nodal value
        const w = Math.sin((n * Math.PI * p.x) / L) * Math.sin((m * Math.PI * p.y) / L)
                - Math.sin((m * Math.PI * p.x) / L) * Math.sin((n * Math.PI * p.y) / L);

        // Gradient of vibration moves sand particles towards nodal lines (where w = 0)
        const dw_dx = ((n * Math.PI) / L) * Math.cos((n * Math.PI * p.x) / L) * Math.sin((m * Math.PI * p.y) / L)
                    - ((m * Math.PI) / L) * Math.cos((m * Math.PI * p.x) / L) * Math.sin((n * Math.PI * p.y) / L);
        const dw_dy = ((m * Math.PI) / L) * Math.sin((n * Math.PI * p.x) / L) * Math.cos((m * Math.PI * p.y) / L)
                    - ((n * Math.PI) / L) * Math.sin((m * Math.PI * p.x) / L) * Math.cos((n * Math.PI * p.y) / L);

        // Force points towards nodal zero
        p.vx -= w * dw_dx * 35;
        p.vy -= w * dw_dy * 35;

        // Friction / Damping
        p.vx *= 0.88;
        p.vy *= 0.88;

        // Jitter / Thermal acoustic noise
        p.vx += (Math.random() - 0.5) * 0.8;
        p.vy += (Math.random() - 0.5) * 0.8;

        p.x += p.vx;
        p.y += p.vy;

        // Keep inside plate boundary
        const dist = Math.sqrt(p.x * p.x + p.y * p.y);
        if (dist > L) {
          p.x = (p.x / dist) * L;
          p.y = (p.y / dist) * L;
          p.vx *= -0.5;
          p.vy *= -0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxChladniPlateSoundwave;
