import React, { useEffect, useRef } from 'react';

/**
 * VfxBulletTrain - Ultra High-Speed Sci-Fi Shinkansen & Maglev Bullet Train
 * Pure HTML5 Canvas 60 FPS animation with dynamic camera parallax, neon rail sparks,
 * chromatic motion blur, and interactive supersonic boost.
 */
export function VfxBulletTrain() {
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
    let isBoosted = false;
    let boostTimer = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseDown = () => {
      isBoosted = true;
      boostTimer = 40;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('touchstart', handleMouseDown);

    // City skyline buildings
    const buildings = [];
    const bldgCount = 35;
    for (let i = 0; i < bldgCount; i++) {
      buildings.push({
        x: (i * (width / bldgCount)),
        w: width / bldgCount + 4,
        h: 80 + Math.random() * 200,
        color: i % 2 === 0 ? 'rgba(15, 23, 42, 0.85)' : 'rgba(30, 41, 59, 0.75)',
        windows: Array.from({ length: 12 }, () => Math.random() > 0.4)
      });
    }

    // High-speed rail spark particles
    const sparks = [];
    // Starfield
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      size: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.7 + 0.3
    }));

    // Bullet Train State
    let trainX = -width * 0.5;
    const trainY = height * 0.72;
    const baseSpeed = 16;
    const trainLength = 340;
    const trainHeight = 38;

    const render = () => {
      // Clear with dark cyberpunk night gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.55, '#0f172a');
      bgGrad.addColorStop(0.72, '#1e1b4b');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Stars
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        s.x -= isBoosted ? 2.5 : 0.8;
        if (s.x < 0) s.x = width;
      });
      ctx.globalAlpha = 1;

      // Distant Cyber City Skyline
      buildings.forEach(b => {
        ctx.fillStyle = b.color;
        const bY = height * 0.72 - b.h;
        ctx.fillRect(b.x, bY, b.w, b.h);

        // Windows
        b.windows.forEach((on, idx) => {
          if (on) {
            ctx.fillStyle = idx % 3 === 0 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(251, 191, 36, 0.8)';
            const wx = b.x + 6 + (idx % 3) * 10;
            const wy = bY + 12 + Math.floor(idx / 3) * 16;
            ctx.fillRect(wx, wy, 4, 6);
          }
        });

        b.x -= isBoosted ? 4.5 : 1.5;
        if (b.x + b.w < 0) b.x = width;
      });

      // Horizon Cyber Neon Glow Grid
      const horizonY = height * 0.72;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      // Maglev Elevated Tracks
      const trackGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + 30);
      trackGrad.addColorStop(0, '#38bdf8');
      trackGrad.addColorStop(0.3, '#0284c7');
      trackGrad.addColorStop(1, '#0f172a');

      ctx.fillStyle = trackGrad;
      ctx.fillRect(0, horizonY, width, 14);

      // Neon Guide Rails (Dual Cyan & Amber Beams)
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#06b6d4';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 2);
      ctx.lineTo(width, horizonY + 2);
      ctx.stroke();

      ctx.shadowColor = '#f59e0b';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 12);
      ctx.lineTo(width, horizonY + 12);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Update train speed and position
      if (boostTimer > 0) {
        boostTimer--;
        if (boostTimer === 0) isBoosted = false;
      }
      const speed = isBoosted ? baseSpeed * 2.4 : baseSpeed;
      trainX += speed;
      if (trainX > width + 200) {
        trainX = -trainLength - 100;
      }

      // Train Motion Blur & Supersonic Jet Stream Trail
      const trailGrad = ctx.createLinearGradient(trainX - 250, trainY, trainX + 40, trainY);
      trailGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      trailGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      trailGrad.addColorStop(0.85, isBoosted ? 'rgba(239, 68, 68, 0.6)' : 'rgba(14, 165, 233, 0.5)');
      trailGrad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.fillStyle = trailGrad;
      ctx.fillRect(trainX - 220, trainY - 10, 240, trainHeight + 20);

      // Draw Sci-Fi Bullet Train (Aerodynamic Nose + Sleek Body)
      ctx.save();
      ctx.shadowBlur = isBoosted ? 25 : 15;
      ctx.shadowColor = isBoosted ? '#ef4444' : '#38bdf8';

      // Train Body Metallic Gradient
      const bodyGrad = ctx.createLinearGradient(trainX, trainY - trainHeight, trainX, trainY);
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(0.4, '#e2e8f0');
      bodyGrad.addColorStop(0.8, '#0f172a');
      bodyGrad.addColorStop(1, '#020617');

      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      // Rear
      ctx.moveTo(trainX, trainY);
      ctx.lineTo(trainX, trainY - trainHeight);
      // Roof line
      ctx.lineTo(trainX + trainLength - 100, trainY - trainHeight);
      // Curved aerodynamic bullet nose
      ctx.bezierCurveTo(
        trainX + trainLength - 40, trainY - trainHeight + 4,
        trainX + trainLength - 10, trainY - 8,
        trainX + trainLength, trainY
      );
      ctx.lineTo(trainX, trainY);
      ctx.closePath();
      ctx.fill();

      // Neon Cyber Body Stripe (Japanese Shinkansen Inspired Blue/Cyan or Red when Boosted)
      ctx.strokeStyle = isBoosted ? '#ef4444' : '#0284c7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(trainX, trainY - trainHeight * 0.5);
      ctx.lineTo(trainX + trainLength - 60, trainY - trainHeight * 0.5);
      ctx.stroke();

      // Tinted Passenger Windows
      const windowCount = 10;
      const windowW = 18;
      const windowH = 10;
      const startWX = trainX + 20;
      for (let w = 0; w < windowCount; w++) {
        const wx = startWX + w * 24;
        if (wx < trainX + trainLength - 90) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(wx, trainY - trainHeight + 8, windowW, windowH);
          // Interior cyan glow
          ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.fillRect(wx + 2, trainY - trainHeight + 10, windowW - 4, windowH - 4);
        }
      }

      // Cockpit Windshield (High angle bullet nose cockpit)
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(trainX + trainLength - 85, trainY - trainHeight + 4);
      ctx.lineTo(trainX + trainLength - 45, trainY - trainHeight + 16);
      ctx.lineTo(trainX + trainLength - 70, trainY - trainHeight + 16);
      ctx.closePath();
      ctx.fill();

      // Front Xenon Laser Headlights
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(trainX + trainLength - 8, trainY - 6, 5, 0, Math.PI * 2);
      ctx.fill();

      // Forward Projected Light Beam
      const beamGrad = ctx.createLinearGradient(trainX + trainLength, trainY - 6, trainX + trainLength + 400, trainY - 6);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      beamGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(trainX + trainLength, trainY - 6);
      ctx.lineTo(trainX + trainLength + 450, trainY - 50);
      ctx.lineTo(trainX + trainLength + 450, trainY + 30);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Generate Sparks along track underneath train
      if (Math.random() > 0.3) {
        sparks.push({
          x: trainX + Math.random() * trainLength,
          y: trainY + 2 + Math.random() * 8,
          vx: -(Math.random() * 8 + 4),
          vy: -(Math.random() * 4 + 1),
          size: Math.random() * 2.5 + 1,
          color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24',
          life: 25
        });
      }

      // Draw & update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) sparks.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // Speed Indicator HUD in corner
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.lineWidth = 1;
      ctx.fillRect(width - 210, 20, 190, 52);
      ctx.strokeRect(width - 210, 20, 190, 52);

      ctx.fillStyle = isBoosted ? '#ef4444' : '#38bdf8';
      ctx.font = 'bold 10px monospace';
      ctx.fillText(isBoosted ? 'SUPERSONIC BOOST ACTIVE' : 'MAGLEV LINE SPEED', width - 200, 36);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 18px monospace';
      ctx.fillText(isBoosted ? '620 KM/H' : '385 KM/H', width - 200, 58);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
