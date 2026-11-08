import React, { useEffect, useRef } from 'react';

/**
 * VfxDeepOceanAbyss - The Deep Ocean Bioluminescent Abyss
 * Luminous deep-sea jellyfish with pulsing bells and undulating tentacles,
 * drifting plankton particles, flowing emerald and cyan ocean currents,
 * and glowing shockwaves rippling away from the cursor.
 */
export function VfxDeepOceanAbyss() {
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

    // Underwater Shockwaves
    const shockwaves = [];
    const handlePointerDown = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        r: 10,
        maxR: 320,
        alpha: 0.9,
        color: Math.random() > 0.5 ? '#2dd4bf' : '#38bdf8'
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);

    // 1. Drifting Bioluminescent Plankton & Marine Snow
    const planktonCount = Math.min(Math.floor(width / 12), 110);
    const plankton = Array.from({ length: planktonCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4 + 0.15,
      vy: -(Math.random() * 0.6 + 0.2),
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.015,
      color: ['#2dd4bf', '#06b6d4', '#38bdf8', '#34d399', '#a7f3d0', '#67e8f9'][Math.floor(Math.random() * 6)]
    }));

    // 2. Bioluminescent Deep-Sea Jellyfish
    const jellyfishCount = Math.min(Math.max(3, Math.floor(width / 320)), 6);
    const jellyfish = Array.from({ length: jellyfishCount }, (_, i) => ({
      x: (width / (jellyfishCount + 1)) * (i + 1) + (Math.random() - 0.5) * 60,
      y: height * 0.4 + Math.random() * (height * 0.5),
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.4 + 0.3),
      size: Math.random() * 20 + 26,
      phase: Math.random() * Math.PI * 2,
      tentacleCount: 6,
      color: ['#06b6d4', '#2dd4bf', '#3b82f6', '#8b5cf6'][i % 4]
    }));

    let t = 0;
    let animId;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Deep Mariana Trench Oceanic Abyss Gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, height);
      oceanGrad.addColorStop(0, '#041620');
      oceanGrad.addColorStop(0.4, '#020b12');
      oceanGrad.addColorStop(0.8, '#01050a');
      oceanGrad.addColorStop(1, '#000204');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Underwater Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.r += 4.5;
        sw.alpha -= 0.015;
        if (sw.alpha <= 0) {
          shockwaves.splice(s, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = sw.color;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 2. Bioluminescent Plankton
      plankton.forEach((p) => {
        p.pulse += p.pulseSpeed;
        p.x += p.vx + Math.sin(t * 0.8 + p.pulse) * 0.3;
        p.y += p.vy;

        // Wrap around borders
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Interactive cursor repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 140) {
          p.x -= (dx / d) * 2.5;
          p.y -= (dy / d) * 2.5;
        }

        const currentAlpha = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // 3. Bioluminescent Pulsing Jellyfish
      jellyfish.forEach((j) => {
        j.phase += 0.025;
        const pulse = Math.sin(j.phase);
        const contraction = Math.max(0.7, 1 + pulse * 0.3);

        j.y += j.vy * (pulse > 0 ? 1.6 : 0.4);
        j.x += j.vx + Math.sin(t + j.phase) * 0.4;

        if (j.y < -120) {
          j.y = height + 100;
          j.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(j.x, j.y);

        // Bell Body (Translucent Dome)
        ctx.beginPath();
        ctx.ellipse(0, 0, j.size * contraction, j.size * 0.75 * (2 - contraction), 0, Math.PI, 0);
        ctx.closePath();

        const bellGrad = ctx.createRadialGradient(0, -j.size * 0.2, 2, 0, 0, j.size);
        bellGrad.addColorStop(0, '#ffffff');
        bellGrad.addColorStop(0.3, j.color);
        bellGrad.addColorStop(0.8, 'rgba(6, 182, 212, 0.4)');
        bellGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = bellGrad;
        ctx.shadowBlur = 20;
        ctx.shadowColor = j.color;
        ctx.fill();

        // Glowing Rim Margin
        ctx.beginPath();
        ctx.ellipse(0, 0, j.size * contraction, 4, 0, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Undulating Tentacles
        for (let k = 0; k < j.tentacleCount; k++) {
          const tX = ((k / (j.tentacleCount - 1)) - 0.5) * (j.size * contraction * 1.5);
          ctx.beginPath();
          ctx.moveTo(tX, 0);

          const tentacleLen = j.size * 2.8;
          for (let seg = 1; seg <= 6; seg++) {
            const segY = (seg / 6) * tentacleLen;
            const waveX = tX + Math.sin(j.phase * 1.8 + seg * 0.9 + k) * (8 + seg * 2.5);
            ctx.lineTo(waveX, segY);
          }

          ctx.strokeStyle = j.color;
          ctx.globalAlpha = 0.5;
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 8;
          ctx.shadowColor = j.color;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxDeepOceanAbyss;
