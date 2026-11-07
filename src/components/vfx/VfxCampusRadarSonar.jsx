import React, { useEffect, useRef } from 'react';

/**
 * VfxCampusRadarSonar - Section 7 (Kids Fun Navigator)
 * High-Caliber Campus GPS Radar Sonar, Telemetry Satellite Grid & Orbital Beacon VFX
 * Features:
 * 1. 360° sweeping dual-frequency sonar beam (Emerald & Cyan)
 * 2. Real-time concentric expanding sonar wave ripples
 * 3. Orbiting GPS Navigation Satellite with trailing telemetry beam
 * 4. Campus beacon telemetry nodes with interactive cursor tethering
 * 5. Holographic navigation grid with crosshairs and digital coordinate sparks
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

    const beaconCount = Math.min(Math.floor(width / 28), 50);

    const beacons = Array.from({ length: beaconCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.4 + 1.2,
      color: ['#10b981', '#34d399', '#06b6d4', '#38bdf8', '#fbbf24'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2
    }));

    let mouse = { x: -2000, y: -2000, active: false };
    let radarAngle = 0;
    let sonarRipples = [0, 60, 120, 180, 240, 300];
    let satelliteAngle = 0;

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
      const centerY = Math.min(height / 2, 420);
      const radarRadius = Math.min(width, height) * 0.48;

      radarAngle += 0.022;
      satelliteAngle += 0.012;

      // 1. Concentric Sonar Pulse Rings
      for (let i = 0; i < sonarRipples.length; i++) {
        sonarRipples[i] += 0.9;
        if (sonarRipples[i] > radarRadius) sonarRipples[i] = 0;

        ctx.beginPath();
        ctx.arc(centerX, centerY, sonarRipples[i], 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - sonarRipples[i] / radarRadius) * 0.22})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      // Static Telemetry Range Rings
      for (let r = 1; r <= 4; r++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radarRadius / 4) * r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 10]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Cardinal Axis Lines
      ctx.beginPath();
      ctx.moveTo(centerX - radarRadius, centerY);
      ctx.lineTo(centerX + radarRadius, centerY);
      ctx.moveTo(centerX, centerY - radarRadius);
      ctx.lineTo(centerX, centerY + radarRadius);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Dual-Frequency Sonar Sweep Beam
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(radarAngle);

      const sweepGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radarRadius);
      sweepGrad.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      sweepGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.2)');
      sweepGrad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radarRadius, 0, Math.PI * 0.28);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Sharp Beam Edge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(radarRadius, 0);
      ctx.strokeStyle = 'rgba(110, 231, 183, 0.75)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // 3. Orbiting GPS Satellite Telemetry
      const satOrbitA = radarRadius * 0.92;
      const satOrbitB = radarRadius * 0.55;
      const satX = centerX + Math.cos(satelliteAngle) * satOrbitA;
      const satY = centerY + Math.sin(satelliteAngle) * satOrbitB;

      // Satellite Orbit Ellipse
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, satOrbitA, satOrbitB, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 8]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite Laser Tether to Center
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(satX, satY);
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Satellite Blip & Panels
      ctx.save();
      ctx.translate(satX, satY);
      ctx.rotate(satelliteAngle + Math.PI / 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-6, -4, 12, 8);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(-14, -2, 6, 4);
      ctx.fillRect(8, -2, 6, 4);
      // Satellite Aura
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // 4. Render Campus Beacon Points & Constellation Lines
      beacons.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.pulse += 0.04;

        if (b.x < 0) { b.x = 0; b.vx *= -1; }
        if (b.x > width) { b.x = width; b.vx *= -1; }
        if (b.y < 0) { b.y = 0; b.vy *= -1; }
        if (b.y > height) { b.y = height; b.vy *= -1; }

        if (mouse.active) {
          const dxMouse = mouse.x - b.x;
          const dyMouse = mouse.y - b.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 180) {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distMouse / 180) * 0.45})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        const pulseScale = 1 + Math.sin(b.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Inter-beacon network grid lines
      for (let i = 0; i < beacons.length; i++) {
        for (let j = i + 1; j < beacons.length; j++) {
          const dx = beacons[i].x - beacons[j].x;
          const dy = beacons[i].y - beacons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(beacons[i].x, beacons[i].y);
            ctx.lineTo(beacons[j].x, beacons[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 0.9;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  );
}

export default VfxCampusRadarSonar;
