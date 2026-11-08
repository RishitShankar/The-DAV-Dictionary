import React, { useEffect, useRef } from 'react';

/**
 * VfxSupernovaNebula - The Supernova Nebula Forge (Cosmic Accretion Cloud)
 * Volumetric multicolored gas clouds (violet, magenta, gold, azure) continuously swirling
 * and coalescing into protostars, featuring gravitational lensing that warps background stars.
 */
export function VfxSupernovaNebula() {
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

    // 1. Swirling Volumetric Nebula Dust Clouds
    const dustCount = Math.min(Math.floor(width / 10), 160);
    const dust = Array.from({ length: dustCount }, () => ({
      dist: Math.random() * 420 + 30,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      radius: Math.random() * 45 + 25,
      alpha: Math.random() * 0.25 + 0.08,
      hue: [270, 310, 35, 195, 220][Math.floor(Math.random() * 5)] // Violet, Magenta, Gold, Cyan
    }));

    // 2. Background Stars for Gravitational Lensing
    const starCount = Math.min(Math.floor(width / 14), 120);
    const stars = Array.from({ length: starCount }, () => ({
      origX: Math.random() * width,
      origY: Math.random() * height,
      r: Math.random() * 2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3
    }));

    // 3. Protostars (High Energy Stellar Cores)
    const protostars = [
      { angle: 0, dist: 140, speed: 0.012, size: 8, color: '#f59e0b' },
      { angle: 2.4, dist: 230, speed: -0.008, size: 10, color: '#ec4899' },
      { angle: 4.5, dist: 310, speed: 0.006, size: 12, color: '#38bdf8' }
    ];

    let t = 0;
    let animId;

    const render = () => {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Deep Cosmic Nebula Void Background
      const bg = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.75);
      bg.addColorStop(0, '#13041c');
      bg.addColorStop(0.4, '#07020d');
      bg.addColorStop(1, '#020004');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Background Stars with Gravitational Lensing around center core
      stars.forEach((st) => {
        const dx = st.origX - cx;
        const dy = st.origY - cy;
        const d = Math.sqrt(dx * dx + dy * dy);

        // Gravitational lensing curvature
        let drawX = st.origX;
        let drawY = st.origY;
        if (d > 20 && d < 320) {
          const lensStrength = (1 - d / 320) * 18;
          drawX += (dx / d) * lensStrength;
          drawY += (dy / d) * lensStrength;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${st.alpha})`;
        ctx.fill();
      });

      // 2. Swirling Volumetric Nebula Dust Clouds
      dust.forEach((d) => {
        d.angle += d.speed;
        const dx = Math.cos(d.angle) * d.dist;
        const dy = Math.sin(d.angle) * (d.dist * 0.75);

        const px = cx + dx;
        const py = cy + dy;

        const cloudGrad = ctx.createRadialGradient(px, py, 2, px, py, d.radius);
        cloudGrad.addColorStop(0, `hsla(${d.hue}, 95%, 65%, ${d.alpha * 1.5})`);
        cloudGrad.addColorStop(0.5, `hsla(${d.hue}, 85%, 50%, ${d.alpha})`);
        cloudGrad.addColorStop(1, `hsla(${d.hue}, 80%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(px, py, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = cloudGrad;
        ctx.fill();
      });

      // 3. Orbiting Protostars
      protostars.forEach((ps) => {
        ps.angle += ps.speed;
        const psX = cx + Math.cos(ps.angle) * ps.dist;
        const psY = cy + Math.sin(ps.angle) * (ps.dist * 0.7);

        // Coronal Flare
        const flare = ps.size + Math.sin(t * 5 + ps.angle) * 3;
        const pGrad = ctx.createRadialGradient(psX, psY, 2, psX, psY, flare * 2.5);
        pGrad.addColorStop(0, '#ffffff');
        pGrad.addColorStop(0.3, ps.color);
        pGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(psX, psY, flare * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pGrad;
        ctx.shadowBlur = 20;
        ctx.shadowColor = ps.color;
        ctx.fill();
      });

      // 4. Central Supernova Nucleus (Coalescing Star Heart)
      const coreR = 30 + Math.sin(t * 3) * 6;
      const coreGrad = ctx.createRadialGradient(cx, cy, 4, cx, cy, coreR * 3);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.2, '#fde047');
      coreGrad.addColorStop(0.6, '#ec4899');
      coreGrad.addColorStop(0.9, '#8b5cf6');
      coreGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();

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

export default VfxSupernovaNebula;
