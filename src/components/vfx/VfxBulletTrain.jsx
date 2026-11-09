import React, { useEffect, useRef } from 'react';

/**
 * VfxBulletTrain - Ultra High-Speed Sci-Fi Shinkansen & Maglev Bullet Train
 * Pure HTML5 Canvas 60 FPS animation with dynamic camera parallax, neon rail sparks,
 * chromatic motion blur, and interactive supersonic boost.
 * Supports compact mode (Navbar banner) and full-screen mode.
 */
export function VfxBulletTrain({ isCompact = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const parent = canvas.parentElement;

    const getDimensions = () => {
      if (isCompact && parent) {
        return {
          w: Math.max(parent.clientWidth || 300, 200),
          h: Math.max(parent.clientHeight || 56, 40)
        };
      }
      return {
        w: parent?.clientWidth || window.innerWidth,
        h: parent?.clientHeight || window.innerHeight
      };
    };

    let { w: width, h: height } = getDimensions();
    canvas.width = width;
    canvas.height = height;

    let isBoosted = false;
    let boostTimer = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dims = getDimensions();
      width = canvas.width = dims.w;
      height = canvas.height = dims.h;
    };

    const triggerBoost = () => {
      isBoosted = true;
      boostTimer = 45;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousedown', triggerBoost);
    canvas.addEventListener('touchstart', triggerBoost);

    // City skyline buildings
    const bldgCount = isCompact ? 16 : 35;
    const buildings = [];
    for (let i = 0; i < bldgCount; i++) {
      buildings.push({
        x: i * (width / bldgCount),
        w: width / bldgCount + 3,
        h: isCompact ? (10 + Math.random() * (height * 0.45)) : (80 + Math.random() * 200),
        color: i % 2 === 0 ? 'rgba(15, 23, 42, 0.9)' : 'rgba(30, 41, 59, 0.8)',
        windows: Array.from({ length: 8 }, () => Math.random() > 0.45)
      });
    }

    // High-speed rail spark particles
    const sparks = [];
    // Starfield
    const stars = Array.from({ length: isCompact ? 30 : 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * (height * 0.6),
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.3
    }));

    // Bullet Train State
    let trainX = -width * 0.5;
    const horizonRatio = isCompact ? 0.72 : 0.72;
    const trainHeight = isCompact ? Math.min(20, height * 0.38) : 38;
    const trainLength = isCompact ? Math.min(190, width * 0.55) : 340;
    const baseSpeed = isCompact ? 10 : 16;

    const render = () => {
      const trainY = height * horizonRatio;

      // Dark cyberpunk night gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(0.5, '#0b1329');
      bgGrad.addColorStop(0.72, '#171b3e');
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
        s.x -= isBoosted ? 2.2 : 0.6;
        if (s.x < 0) s.x = width;
      });
      ctx.globalAlpha = 1;

      // Distant Cyber City Skyline
      buildings.forEach(b => {
        ctx.fillStyle = b.color;
        const bY = trainY - b.h;
        ctx.fillRect(b.x, bY, b.w, b.h);

        // Windows
        b.windows.forEach((on, idx) => {
          if (on) {
            ctx.fillStyle = idx % 3 === 0 ? 'rgba(56, 189, 248, 0.85)' : 'rgba(251, 191, 36, 0.85)';
            const wx = b.x + 3 + (idx % 3) * (isCompact ? 6 : 10);
            const wy = bY + 4 + Math.floor(idx / 3) * (isCompact ? 7 : 14);
            ctx.fillRect(wx, wy, isCompact ? 2 : 4, isCompact ? 3 : 6);
          }
        });

        b.x -= isBoosted ? 3.5 : 1.2;
        if (b.x + b.w < 0) b.x = width;
      });

      // Maglev Elevated Tracks
      const horizonY = trainY;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

      const trackGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + (isCompact ? 14 : 28));
      trackGrad.addColorStop(0, '#38bdf8');
      trackGrad.addColorStop(0.3, '#0284c7');
      trackGrad.addColorStop(1, '#0f172a');

      ctx.fillStyle = trackGrad;
      ctx.fillRect(0, horizonY, width, isCompact ? 8 : 14);

      // Neon Guide Rails (Dual Cyan & Amber Beams)
      ctx.shadowBlur = isCompact ? 6 : 12;
      ctx.shadowColor = '#06b6d4';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = isCompact ? 2 : 3;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 1);
      ctx.lineTo(width, horizonY + 1);
      ctx.stroke();

      ctx.shadowColor = '#f59e0b';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = isCompact ? 1.5 : 2;
      ctx.beginPath();
      ctx.moveTo(0, horizonY + (isCompact ? 6 : 10));
      ctx.lineTo(width, horizonY + (isCompact ? 6 : 10));
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Update train speed and position
      if (boostTimer > 0) {
        boostTimer--;
        if (boostTimer === 0) isBoosted = false;
      }
      const speed = isBoosted ? baseSpeed * 2.2 : baseSpeed;
      trainX += speed;
      if (trainX > width + 150) {
        trainX = -trainLength - 60;
      }

      // Train Motion Blur & Supersonic Jet Stream Trail
      const trailWidth = isCompact ? 120 : 240;
      const trailGrad = ctx.createLinearGradient(trainX - trailWidth, trainY, trainX + 20, trainY);
      trailGrad.addColorStop(0, 'rgba(6, 182, 212, 0)');
      trailGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.25)');
      trailGrad.addColorStop(0.85, isBoosted ? 'rgba(239, 68, 68, 0.6)' : 'rgba(14, 165, 233, 0.5)');
      trailGrad.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.fillStyle = trailGrad;
      ctx.fillRect(trainX - trailWidth, trainY - (isCompact ? 4 : 10), trailWidth + 20, trainHeight + (isCompact ? 8 : 20));

      // Draw Sci-Fi Bullet Train Body
      ctx.save();
      ctx.shadowBlur = isBoosted ? 18 : 10;
      ctx.shadowColor = isBoosted ? '#ef4444' : '#38bdf8';

      const bodyGrad = ctx.createLinearGradient(trainX, trainY - trainHeight, trainX, trainY);
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(0.4, '#e2e8f0');
      bodyGrad.addColorStop(0.8, '#0f172a');
      bodyGrad.addColorStop(1, '#020617');

      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.moveTo(trainX, trainY);
      ctx.lineTo(trainX, trainY - trainHeight);
      const noseOffset = isCompact ? 50 : 100;
      ctx.lineTo(trainX + trainLength - noseOffset, trainY - trainHeight);
      ctx.bezierCurveTo(
        trainX + trainLength - (isCompact ? 20 : 40), trainY - trainHeight + 2,
        trainX + trainLength - (isCompact ? 6 : 10), trainY - 4,
        trainX + trainLength, trainY
      );
      ctx.lineTo(trainX, trainY);
      ctx.closePath();
      ctx.fill();

      // Neon Body Stripe
      ctx.strokeStyle = isBoosted ? '#ef4444' : '#0284c7';
      ctx.lineWidth = isCompact ? 2 : 4;
      ctx.beginPath();
      ctx.moveTo(trainX, trainY - trainHeight * 0.5);
      ctx.lineTo(trainX + trainLength - (isCompact ? 25 : 60), trainY - trainHeight * 0.5);
      ctx.stroke();

      // Passenger Windows
      const windowCount = isCompact ? 6 : 10;
      const windowW = isCompact ? 9 : 18;
      const windowH = isCompact ? 5 : 10;
      const stepW = isCompact ? 13 : 24;
      const startWX = trainX + (isCompact ? 10 : 20);
      for (let w = 0; w < windowCount; w++) {
        const wx = startWX + w * stepW;
        if (wx < trainX + trainLength - (isCompact ? 40 : 90)) {
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(wx, trainY - trainHeight + (isCompact ? 3 : 8), windowW, windowH);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
          ctx.fillRect(wx + 1, trainY - trainHeight + (isCompact ? 4 : 10), windowW - 2, windowH - 2);
        }
      }

      // Front Xenon Laser Headlight
      ctx.shadowBlur = isCompact ? 14 : 30;
      ctx.shadowColor = '#ffffff';
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(trainX + trainLength - 4, trainY - 3, isCompact ? 3 : 5, 0, Math.PI * 2);
      ctx.fill();

      // Forward Light Beam
      const beamReach = isCompact ? 150 : 400;
      const beamGrad = ctx.createLinearGradient(trainX + trainLength, trainY - 3, trainX + trainLength + beamReach, trainY - 3);
      beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      beamGrad.addColorStop(0.3, 'rgba(56, 189, 248, 0.4)');
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');

      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(trainX + trainLength, trainY - 3);
      ctx.lineTo(trainX + trainLength + beamReach, trainY - (isCompact ? 18 : 50));
      ctx.lineTo(trainX + trainLength + beamReach, trainY + (isCompact ? 12 : 30));
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Sparks along track
      if (Math.random() > 0.35) {
        sparks.push({
          x: trainX + Math.random() * trainLength,
          y: trainY + 1 + Math.random() * 4,
          vx: -(Math.random() * 6 + 3),
          vy: -(Math.random() * 2 + 1),
          size: Math.random() * 2 + 0.8,
          color: Math.random() > 0.5 ? '#38bdf8' : '#fbbf24',
          life: 18
        });
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const p = sparks[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        if (p.life <= 0) sparks.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // Speed Badge HUD
      if (isCompact) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 1;
        ctx.fillRect(width - 92, 4, 88, 20);
        ctx.strokeRect(width - 92, 4, 88, 20);

        ctx.fillStyle = isBoosted ? '#ef4444' : '#38bdf8';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(isBoosted ? 'BOOST' : 'MAGLEV', width - 88, 14);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 9px monospace';
        ctx.fillText(isBoosted ? '620 KM/H' : '385 KM/H', width - 58, 17);
      } else {
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
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', triggerBoost);
      canvas.removeEventListener('touchstart', triggerBoost);
    };
  }, [isCompact]);

  return (
    <canvas
      ref={canvasRef}
      className={isCompact ? "w-full h-full block cursor-pointer" : "fixed inset-0 pointer-events-none z-0"}
      style={{ opacity: 0.98 }}
    />
  );
}
