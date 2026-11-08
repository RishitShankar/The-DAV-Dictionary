import React, { useEffect, useRef } from 'react';

/**
 * VfxAuroraBorealis - Cosmic Polar Aurora Lights
 * 60 FPS HTML5 Canvas with shimmering ethereal green, cyan, and violet curtains
 * flowing across a deep polar starscape with cursor wave distortion.
 */
export function VfxAuroraBorealis() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
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

    // Stars
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2
    }));

    let time = 0;

    const render = () => {
      time += 0.015;

      // Deep arctic night
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.5, '#052e16');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        ctx.globalAlpha = s.alpha * (0.8 + Math.sin(time * 2 + s.x) * 0.2);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 4 Flowing Aurora Curtains
      const curtains = [
        { color: 'rgba(34, 197, 94, 0.25)', speed: 0.8, offset: 0, amp: 70 },
        { color: 'rgba(6, 182, 212, 0.28)', speed: 1.1, offset: 1.5, amp: 85 },
        { color: 'rgba(168, 85, 247, 0.22)', speed: 0.6, offset: 3, amp: 60 },
        { color: 'rgba(52, 211, 153, 0.2)', speed: 1.3, offset: 4.5, amp: 95 }
      ];

      curtains.forEach((c, idx) => {
        ctx.fillStyle = c.color;
        ctx.beginPath();
        ctx.moveTo(0, height);

        const step = 20;
        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * 0.003 + time * c.speed + c.offset) * c.amp;
          const wave2 = Math.cos(x * 0.007 - time * 0.5) * (c.amp * 0.4);
          const mouseDist = Math.hypot(x - mouseX, height * 0.4 - mouseY);
          const mouseDisplace = Math.sin(mouseDist * 0.01 - time * 2) * Math.max(0, 50 - mouseDist * 0.1);

          const y = height * (0.25 + idx * 0.08) + wave1 + wave2 + mouseDisplace;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
