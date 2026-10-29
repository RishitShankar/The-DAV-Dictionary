import React, { useEffect, useRef } from 'react';

/**
 * VfxMathMatrixBackground - Non-stop Floating Math & Digits Matrix
 * Embedded in Section 7, Subsection 4 (Smart DAV Calculator)
 * 
 * Features:
 * - Constant non-stop animation
 * - Symbols: π, 0-9, radius (r), ∑, √, ∞, ∫, Δ, θ, λ, ÷, ×, ±, ², ³, sin, cos
 * - Luminous neon emerald/teal/amber mathematical drift with mouse repulsion
 */
export function VfxMathMatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 600;
    };
    window.addEventListener('resize', handleResize);

    const mathGlyphs = [
      'π', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'r', '∑', '√', '∞', '∫', 'Δ', 'θ', 'λ', '%', '÷', '×',
      '±', 'x²', 'y³', 'sin', 'cos', 'tan', 'log'
    ];

    const count = Math.min(Math.floor(width / 22), 65);

    const symbols = Array.from({ length: count }, () => ({
      glyph: mathGlyphs[Math.floor(Math.random() * mathGlyphs.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      vy: -(Math.random() * 0.7 + 0.35), // gentle upward float
      vx: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 14 + 13,
      angle: (Math.random() - 0.5) * 0.4,
      rotationSpeed: (Math.random() - 0.5) * 0.012,
      alpha: Math.random() * 0.45 + 0.2,
      color: ['#34d399', '#10b981', '#6ee7b7', '#a7f3d0', '#fbbf24', '#38bdf8'][Math.floor(Math.random() * 6)]
    }));

    // Mouse interaction
    let mouse = { x: -2000, y: -2000, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      symbols.forEach((s) => {
        s.y += s.vy;
        s.x += s.vx;
        s.angle += s.rotationSpeed;

        // Recycle at bottom
        if (s.y < -30) {
          s.y = height + 20;
          s.x = Math.random() * width;
          s.glyph = mathGlyphs[Math.floor(Math.random() * mathGlyphs.length)];
        }
        if (s.x < -30) s.x = width + 20;
        if (s.x > width + 30) s.x = -20;

        // Repel from cursor
        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (1 - dist / 110) * 1.8;
            s.x += (dx / dist) * force;
            s.y += (dy / dist) * force;
          }
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        ctx.font = `bold ${s.size}px monospace`;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(s.glyph, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ background: 'transparent' }}
    />
  );
}

export default VfxMathMatrixBackground;
