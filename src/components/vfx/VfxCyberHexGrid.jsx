import React, { useEffect, useRef } from 'react';

/**
 * VfxCyberHexGrid - Neon Cybernetic Hexagonal Energy Shield
 * 60 FPS HTML5 Canvas with glowing honeycomb grid, electric ripple wavefronts,
 * and magnetic cursor attraction.
 */
export function VfxCyberHexGrid() {
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

    const hexRadius = 32;
    const hexHeight = hexRadius * Math.sqrt(3);
    let time = 0;

    const drawHex = (x, y, r, alpha, strokeColor) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + r * Math.cos(angle);
        const hy = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const render = () => {
      time += 0.02;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / (hexRadius * 1.5)) + 2;
      const rows = Math.ceil(height / hexHeight) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * hexRadius * 1.5;
          const y = r * hexHeight + ((c % 2) * hexHeight) / 2;

          const dist = Math.hypot(x - mouseX, y - mouseY);
          const ripple = Math.sin(dist * 0.03 - time * 3);
          const isNear = dist < 220;

          const alpha = isNear 
            ? Math.max(0.15, 0.8 - dist / 220) 
            : Math.max(0.04, 0.12 + ripple * 0.08);

          const color = isNear ? '#38bdf8' : ripple > 0.5 ? '#06b6d4' : '#1e293b';

          drawHex(x, y, hexRadius * 0.92, alpha, color);

          // Center spark on near hexes
          if (isNear && Math.random() > 0.85) {
            ctx.fillStyle = '#22d3ee';
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
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
      style={{ opacity: 0.85 }}
    />
  );
}
