import React, { useEffect, useRef } from 'react';

/**
 * VfxClockRunningBackground - Running Analog Clock & Rotating Gearwork Canvas
 * Embedded in Section 7, Subsection 7 (Clock, Stopwatch & Timer)
 * 
 * Features:
 * - Live real-time synchronized running clock hands (Hour, Minute, Continuous sweeping Second)
 * - Interlocking rotating mechanical gear wheels (cogs) rotating continuously
 * - Radial hour indices and neon indigo/violet aesthetic
 */
export function VfxClockRunningBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId;

    // Helper to draw a mechanical gear cog
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
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner axle circle
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const clockRadius = Math.min(width, height) * 0.36;

      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds() + ms / 1000;
      const min = now.getMinutes() + sec / 60;
      const hr = (now.getHours() % 12) + min / 60;

      // 1. Rotating Background Mechanical Gears
      drawGear(cx - clockRadius * 0.85, cy - clockRadius * 0.5, clockRadius * 0.45, 14, sec * 0.1, 'rgba(129, 140, 248, 0.15)');
      drawGear(cx + clockRadius * 0.9, cy + clockRadius * 0.5, clockRadius * 0.55, 18, -sec * 0.075, 'rgba(192, 132, 252, 0.15)');
      drawGear(cx + clockRadius * 0.65, cy - clockRadius * 0.75, clockRadius * 0.35, 10, sec * 0.14, 'rgba(99, 102, 241, 0.18)');

      // 2. Outer Clock Dial Rings
      ctx.beginPath();
      ctx.arc(cx, cy, clockRadius * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, clockRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#818cf8';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Hour Indices & Markers
      for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI) / 6 - Math.PI / 2;
        const isCardinal = i % 3 === 0;
        const outerR = clockRadius - 6;
        const innerR = isCardinal ? clockRadius - 22 : clockRadius - 14;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.strokeStyle = isCardinal ? '#a855f7' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = isCardinal ? 3 : 1.5;
        ctx.stroke();
      }

      // 4. Clock Hands (Synchronized with real device time)

      // Hour Hand
      const hrAngle = (hr * 2 * Math.PI) / 12 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(hrAngle) * (clockRadius * 0.5), cy + Math.sin(hrAngle) * (clockRadius * 0.5));
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Minute Hand
      const minAngle = (min * 2 * Math.PI) / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(minAngle) * (clockRadius * 0.72), cy + Math.sin(minAngle) * (clockRadius * 0.72));
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Sweeping Second Hand
      const secAngle = (sec * 2 * Math.PI) / 60 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx - Math.cos(secAngle) * 18, cy - Math.sin(secAngle) * 18);
      ctx.lineTo(cx + Math.cos(secAngle) * (clockRadius * 0.88), cy + Math.sin(secAngle) * (clockRadius * 0.88));
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Center Hub Pin
      ctx.beginPath();
      ctx.arc(cx, cy, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#f43f5e';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#f43f5e';
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
      style={{ background: 'transparent' }}
    />
  );
}

export default VfxClockRunningBackground;
