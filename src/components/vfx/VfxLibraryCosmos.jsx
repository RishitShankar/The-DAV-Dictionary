import React, { useEffect, useRef } from 'react';

/**
 * VfxLibraryCosmos - Section 2 (Secondary Portal / Textbook Library)
 * Celestial Library Constellation & Floating Sanskrit Geometry
 * Features rotating celestial mandala rings, floating scholarly glyphs (अ, आ, ॐ, 📖, ✦),
 * and crystalline starlight filaments that link together and tether to the cursor.
 */
export function VfxLibraryCosmos() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const vedicGlyphs = ['अ', 'आ', 'इ', 'ॐ', 'ज्ञान', 'वेद', '📖', '✦', '✧'];
    const starCount = Math.min(Math.floor(width / 30), 55);

    const stars = Array.from({ length: starCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2.2 + 0.9,
      glyph: i % 5 === 0 ? vedicGlyphs[Math.floor(Math.random() * vedicGlyphs.length)] : null,
      color: ['#fbbf24', '#f59e0b', '#f97316', '#ef4444', '#fef08a'][Math.floor(Math.random() * 5)],
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.04 + 0.015
    }));

    let mouse = { x: -2000, y: -2000, active: false };
    let rotationAngle = 0;

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
      rotationAngle += 0.002;

      // 1. Subtle background celestial orbit rings
      const centerX = width / 2;
      const centerY = Math.min(height / 2, 400);

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle);
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(0, 0, r * 160, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 191, 36, ${0.05 * (4 - r)})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([12, 18]);
        ctx.stroke();
      }
      ctx.restore();

      // 2. Render & update stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        star.twinkle += star.twinkleSpeed;

        if (star.x < 0) { star.x = 0; star.vx *= -1; }
        if (star.x > width) { star.x = width; star.vx *= -1; }
        if (star.y < 0) { star.y = 0; star.vy *= -1; }
        if (star.y > height) { star.y = height; star.vy *= -1; }

        // Dynamic mouse interactive tethering
        if (mouse.active) {
          const dxMouse = mouse.x - star.x;
          const dyMouse = mouse.y - star.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 170) {
            const pull = (1 - distMouse / 170) * 0.4;
            star.x += (dxMouse / distMouse) * pull;
            star.y += (dyMouse / distMouse) * pull;

            // Constellation line to cursor
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${(1 - distMouse / 170) * 0.7})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Concentric cursor target halo
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Star glow & pulse
        const rad = star.radius + Math.sin(star.twinkle) * 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = star.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Render Sanskrit/vedic glyph
        if (star.glyph) {
          ctx.font = '11px sans-serif';
          ctx.fillStyle = 'rgba(254, 240, 138, 0.75)';
          ctx.textAlign = 'center';
          ctx.fillText(star.glyph, star.x, star.y - 9);
        }
      });

      // 3. Connect neighboring stars into constellation lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * 0.24;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-65 mix-blend-screen"
    />
  );
}

export default VfxLibraryCosmos;
