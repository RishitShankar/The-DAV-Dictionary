import React, { useEffect, useRef } from 'react';

/**
 * VfxClockRunningBackground - Running Analog Clock & Mechanical Gearwork
 * Positioned cleanly on the SIDE of the timer/stopwatch so it never obstructs
 * the digital clock numbers or stopwatch display.
 */
export function VfxClockRunningBackground({ side = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 450;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    let gearAngle = 0;

    // Helper to draw a crisp mechanical gear cog
    const drawGear = (gx, gy, radius, teeth, rotation, color) => {
      ctx.save();
      ctx.translate(gx, gy);
      ctx.rotate(rotation);

      ctx.beginPath();
      const toothDepth = radius * 0.16;
      for (let i = 0; i < teeth; i++) {
        const a1 = (i * 2 * Math.PI) / teeth;
        const a2 = a1 + Math.PI / teeth;
        const rOuter = radius + toothDepth;
        const rInner = radius - toothDepth;

        ctx.lineTo(Math.cos(a1) * rOuter, Math.sin(a1) * rOuter);
        ctx.lineTo(Math.cos(a1 + 0.08) * rOuter, Math.sin(a1 + 0.08) * rOuter);
        ctx.lineTo(Math.cos(a2 - 0.08) * rInner, Math.sin(a2 - 0.08) * rInner);
        ctx.lineTo(Math.cos(a2) * rInner, Math.sin(a2) * rInner);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.stroke();

      // Inner axle circle
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      // Spokes
      for (let s = 0; s < 4; s++) {
        const spokeAngle = (Math.PI / 2) * s;
        ctx.beginPath();
        ctx.moveTo(Math.cos(spokeAngle) * (radius * 0.35), Math.sin(spokeAngle) * (radius * 0.35));
        ctx.lineTo(Math.cos(spokeAngle) * (radius * 0.85), Math.sin(spokeAngle) * (radius * 0.85));
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      gearAngle += 0.008;
      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      // Positioned cleanly on the SIDE (Right flank)
      const cx = side && width > 550 ? width - 110 : width * 0.5;
      const cy = height * 0.5;
      const clockRadius = Math.min(width, height) * 0.28;

      // 1. Crisp Mechanical Interlocking Gears (On the Side)
      drawGear(cx - clockRadius * 0.95, cy - clockRadius * 0.45, clockRadius * 0.55, 14, gearAngle, 'rgba(251, 191, 36, 0.7)');
      drawGear(cx + clockRadius * 0.85, cy + clockRadius * 0.5, clockRadius * 0.45, 12, -gearAngle * 1.2, 'rgba(56, 189, 248, 0.7)');
      drawGear(cx - clockRadius * 0.5, cy + clockRadius * 0.85, clockRadius * 0.35, 10, gearAngle * 1.5, 'rgba(168, 85, 247, 0.6)');

      // 2. Analog Clock Face Frame
      ctx.beginPath();
      ctx.arc(cx, cy, clockRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#818cf8';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Hour Indices & Markers
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const isCardinal = i % 3 === 0;
        const outerR = clockRadius - 4;
        const innerR = isCardinal ? clockRadius - 16 : clockRadius - 10;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.strokeStyle = isCardinal ? '#fbbf24' : 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = isCardinal ? 2.5 : 1.2;
        ctx.stroke();
      }

      // 4. Clock Hands (Synchronized with real device time)
      // Hour Hand
      const hrAngle = (hr * 2 * Math.PI) / 12 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(hrAngle) * (clockRadius * 0.5), cy + Math.sin(hrAngle) * (clockRadius * 0.5));
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Minute Hand
      const minAngle = (min * 2 * Math.PI) / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(minAngle) * (clockRadius * 0.72), cy + Math.sin(minAngle) * (clockRadius * 0.72));
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Sweeping Second Hand
      const secAngle = (sec * 2 * Math.PI) / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx - Math.cos(secAngle) * 12, cy - Math.sin(secAngle) * 12);
      ctx.lineTo(cx + Math.cos(secAngle) * (clockRadius * 0.85), cy + Math.sin(secAngle) * (clockRadius * 0.85));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Center Hub
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [side]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{ background: 'transparent' }}
    />
  );
}

export default VfxClockRunningBackground;
