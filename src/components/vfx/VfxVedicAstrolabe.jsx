import React, { useEffect, useRef } from 'react';

/**
 * VfxVedicAstrolabe - The Ancient Golden Vedic Astrolabe & Sundial
 * Intricate brass and golden celestial gearwork rotating on multiple planetary axes,
 * etching geometric zodiac and constellation arcs with glowing stardust particles.
 */
export function VfxVedicAstrolabe() {
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

    // Stardust embers
    const emberCount = Math.min(Math.floor(width / 16), 85);
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.5 + 0.2),
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      color: ['#fbbf24', '#f59e0b', '#fde047', '#fed7aa', '#f97316'][Math.floor(Math.random() * 5)]
    }));

    // Vedic Nakshatra Symbols / Glyphs
    const nakshatraSymbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

    let t = 0;
    let animId;

    const render = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Dark Royal Brass Vignette
      const bg = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#1c1308');
      bg.addColorStop(0.5, '#0b0804');
      bg.addColorStop(1, '#030201');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Stardust Embers
      embers.forEach((em) => {
        em.y += em.vy;
        em.x += em.vx;
        if (em.y < -10) em.y = height + 10;
        if (em.x < -10) em.x = width + 10;
        if (em.x > width + 10) em.x = -10;

        ctx.beginPath();
        ctx.arc(em.x, em.y, em.r, 0, Math.PI * 2);
        ctx.fillStyle = em.color;
        ctx.globalAlpha = em.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fbbf24';
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 2. Astrolabe Rings & Gears (Multiple Concentric Planetary Axes)
      const baseR = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.translate(cx, cy);

      // Ring 1: Outer Brass Gear Teeth
      const gearTeeth = 48;
      ctx.beginPath();
      for (let i = 0; i < gearTeeth; i++) {
        const ang = (i / gearTeeth) * Math.PI * 2 + t * 0.2;
        const outerR = baseR + (i % 2 === 0 ? 12 : 0);
        const gx = Math.cos(ang) * outerR;
        const gy = Math.sin(ang) * outerR;
        if (i === 0) ctx.moveTo(gx, gy);
        else ctx.lineTo(gx, gy);
      }
      ctx.closePath();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#f59e0b';
      ctx.stroke();

      // Ring 2: Zodiac Ring with 12 Vedic Rashi Constellations
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.88, 0, Math.PI * 2);
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fde68a';
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2 - t * 0.35;
        const rx = Math.cos(ang) * (baseR * 0.88);
        const ry = Math.sin(ang) * (baseR * 0.88);
        ctx.fillText(nakshatraSymbols[i], rx, ry);
      }

      // Ring 3: Sacred Geometric Vedic Mandalas (Nested 8-point & 12-point stars)
      ctx.save();
      ctx.rotate(t * 0.5);
      for (let rot = 0; rot < 3; rot++) {
        ctx.save();
        ctx.rotate((rot * Math.PI) / 6);
        ctx.beginPath();
        const sqR = baseR * 0.65;
        ctx.rect(-sqR / 2, -sqR / 2, sqR, sqR);
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();

      // Ring 4: Inner Counter-Rotating Gear
      ctx.beginPath();
      ctx.arc(0, 0, baseR * 0.45, 0, Math.PI * 2);
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 12]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 3. Central Gnomon (Sun Ray Pointer / Shadow Arm)
      const sunAngle = Math.atan2(mouseY - cy, mouseX - cx);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sunAngle) * (baseR * 0.95), Math.sin(sunAngle) * (baseR * 0.95));
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#f59e0b';
      ctx.stroke();

      // Central Golden Sun Boss
      const sunGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 26);
      sunGrad.addColorStop(0, '#ffffff');
      sunGrad.addColorStop(0.4, '#fbbf24');
      sunGrad.addColorStop(0.8, '#d97706');
      sunGrad.addColorStop(1, '#78350f');

      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();

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

export default VfxVedicAstrolabe;
