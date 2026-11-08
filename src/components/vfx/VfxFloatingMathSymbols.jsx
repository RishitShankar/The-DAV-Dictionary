import React, { useEffect, useRef } from 'react';

/**
 * VfxFloatingMathSymbols
 * 60 FPS HTML5 Canvas animation featuring green floating mathematical formulas,
 * Greek symbols (sin θ, cos θ, π, √, ∫, ∑, e), and numbers floating through deep space.
 */
export function VfxFloatingMathSymbols() {
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

    const MATH_GLYPHS = [
      'sin θ', 'cos θ', 'tan θ', 'π', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
      '√x', '∫ f(x)dx', 'e^(iπ) + 1 = 0', '∑ n=1', '∞', 'Δy / Δx', 'x²', 'log(x)',
      'θ', 'α', 'β', 'λ', 'Ω', 'lim x→0', 'f\'(x)', '±', '≠', '≤', '≥'
    ];

    const particles = Array.from({ length: 65 }, () => ({
      text: MATH_GLYPHS[Math.floor(Math.random() * MATH_GLYPHS.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(Math.random() * 0.8 + 0.3),
      size: Math.floor(Math.random() * 10 + 12),
      alpha: Math.random() * 0.6 + 0.25,
      color: Math.random() > 0.3 ? '#10b981' : Math.random() > 0.5 ? '#22c55e' : '#34d399'
    }));

    const render = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Repel from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          p.x += (dx / dist) * 2;
          p.y += (dy / dist) * 2;
        }

        // Screen wrap
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        ctx.font = `bold ${p.size}px monospace`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillText(p.text, p.x, p.y);
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

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
      style={{ opacity: 0.9 }}
    />
  );
}
