import React, { useEffect, useRef } from 'react';

/**
 * VfxMatrixDataTorrent - The Matrix Cyber Data Torrent (Binary & Hex Core)
 * Cascading streams of neon emerald and cyan hexadecimal glyphs moving in 3D parallax layers,
 * forming digital vortexes around the cursor with shockwave dispersion on click.
 */
export function VfxMatrixDataTorrent() {
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
      initColumns();
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Shockwave dispersion on click
    const shockwaves = [];
    const handleClick = (e) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 360,
        alpha: 1.0,
        color: '#10b981'
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Characters: Hexadecimal, Binary, Math & Cyber symbols
    const chars = '0123456789ABCDEF01λπ∑ΩΨΞ∇{}[]<>/*+-=~#DAV';
    const fontSize = 16;
    let columns = [];

    const initColumns = () => {
      const colCount = Math.floor(width / fontSize);
      columns = Array.from({ length: colCount }, (_, i) => ({
        x: i * fontSize,
        y: Math.random() * -height,
        speed: Math.random() * 4 + 3.5,
        depth: Math.random() * 0.7 + 0.3, // 3D Parallax layers
        charHistory: []
      }));
    };
    initColumns();

    let animId;

    const render = () => {
      // Semi-transparent clear for smooth digital phosphor trailing
      ctx.fillStyle = 'rgba(2, 6, 12, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // 1. Digital Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 6.5;
        sw.alpha -= 0.02;
        if (sw.alpha <= 0) {
          shockwaves.splice(s, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = sw.alpha;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#34d399';
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      ctx.font = `${fontSize}px monospace`;

      columns.forEach((col) => {
        col.y += col.speed * col.depth;

        // Digital Vortex around cursor
        const dx = mouseX - col.x;
        const dy = mouseY - col.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let drawX = col.x;
        if (dist < 180) {
          const pull = (1 - dist / 180) * 32;
          drawX += (dx / dist) * pull;
        }

        // Generate random new glyph
        const char = chars[Math.floor(Math.random() * chars.length)];
        col.charHistory.push({ char, y: col.y, x: drawX });
        if (col.charHistory.length > 18) col.charHistory.shift();

        // Draw character column with glowing phosphor head
        col.charHistory.forEach((item, idx) => {
          const isHead = idx === col.charHistory.length - 1;
          const trailAlpha = (idx / col.charHistory.length) * col.depth;

          if (isHead) {
            // Bright white-green cursor head
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 14;
            ctx.shadowColor = '#34d399';
          } else {
            // Cyan-emerald matrix trail
            ctx.fillStyle = `rgba(16, 185, 129, ${trailAlpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#10b981';
          }

          ctx.fillText(item.char, item.x, item.y);
        });

        // Reset column when it passes the bottom
        if (col.y > height + 80) {
          col.y = Math.random() * -100;
          col.charHistory = [];
        }
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxMatrixDataTorrent;
