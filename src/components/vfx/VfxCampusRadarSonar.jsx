import React, { useEffect, useRef } from 'react';

/**
 * VfxCampusRadarSonar - Section 7 (Kids Fun Navigator)
 * Campus GPS Radar Sonar & Telemetry Navigation Grid
 * Features a 360° sweeping emerald sonar beam, expanding concentric radar rings,
 * campus beacon points (Bus, Gates, Sports, Science), and interactive GPS crosshairs tethered to the cursor.
 */
export function VfxCampusRadarSonar() {
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

    const beaconLabels = ['BUS #1', 'BUS #4', 'GATE A', 'MAIN LAB', 'GROUND', 'RADAR', 'CAMPUS'];
    const beaconCount = Math.min(Math.floor(width / 34), 42);

    const beacons = Array.from({ length: beaconCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.2 + 1.2,
      label: i % 6 === 0 ? beaconLabels[Math.floor(Math.random() * beaconLabels.length)] : null,
      color: ['#10b981', '#34d399', '#059669', '#fbbf24', '#38bdf8'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2
    }));

    let mouse = { x: -2000, y: -2000, active: false };
    let radarAngle = 0;
    let sonarRipples = [0, 80, 160, 240];

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

      const centerX = width / 2;
      const centerY = Math.min(height / 2, 450);
      const radarRadius = Math.min(width, height) * 0.45;

      radarAngle += 0.025;

      // 1. Radar Background Grid & Concentric Sonar Rings
      for (let i = 0; i < sonarRipples.length; i++) {
        sonarRipples[i] += 0.8;
        if (sonarRipples[i] > radarRadius) sonarRipples[i] = 0;

        ctx.beginPath();
        ctx.arc(centerX, centerY, sonarRipples[i], 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - sonarRipples[i] / radarRadius) * 0.18})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Static distance circles
      for (let r = 1; r <= 3; r++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radarRadius / 3) * r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([8, 12]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 2. 360° Rotating Sonar Sweep Beam
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(radarAngle);

      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radarRadius);
      sweepGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
      sweepGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 0.25);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Leading beam line
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radarRadius, 0);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 3. Render Campus Beacon Points
      beacons.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.pulse += 0.04;

        if (b.x < 0) { b.x = 0; b.vx *= -1; }
        if (b.x > width) { b.x = width; b.vx *= -1; }
        if (b.y < 0) { b.y = 0; b.vy *= -1; }
        if (b.y > height) { b.y = height; b.vy *= -1; }

        // Interactive GPS Crosshairs when cursor moves
        if (mouse.active) {
          const dxMouse = mouse.x - b.x;
          const dyMouse = mouse.y - b.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 160) {
            // Telemetry line to cursor
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distMouse / 160) * 0.75})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Pinging beacon ring
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.radius * 2.5, 0, Math.PI * 2);
            ctx.strokeStyle = '#34d399';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Beacon dot
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius + Math.sin(b.pulse) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label if present
        if (b.label) {
          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = 'rgba(110, 231, 183, 0.85)';
          ctx.textAlign = 'center';
          ctx.fillText(b.label, b.x, b.y - 8);
        }
      });

      // 4. Cursor Targeting Crosshair
      if (mouse.active) {
        ctx.save();
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.lineWidth = 1;
        // Reticle circle
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 22, 0, Math.PI * 2);
        ctx.stroke();
        // Cross lines
        ctx.beginPath();
        ctx.moveTo(mouse.x - 30, mouse.y);
        ctx.lineTo(mouse.x - 8, mouse.y);
        ctx.moveTo(mouse.x + 8, mouse.y);
        ctx.lineTo(mouse.x + 30, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 30);
        ctx.lineTo(mouse.x, mouse.y - 8);
        ctx.moveTo(mouse.x, mouse.y + 8);
        ctx.lineTo(mouse.x, mouse.y + 30);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Connect nearby beacons with radar telemetry lines
      for (let i = 0; i < beacons.length; i++) {
        for (let j = i + 1; j < beacons.length; j++) {
          const dx = beacons[i].x - beacons[j].x;
          const dy = beacons[i].y - beacons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.22;
            ctx.beginPath();
            ctx.moveTo(beacons[i].x, beacons[i].y);
            ctx.lineTo(beacons[j].x, beacons[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 mix-blend-screen"
    />
  );
}

export default VfxCampusRadarSonar;
