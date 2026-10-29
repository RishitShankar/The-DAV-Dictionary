import React, { useEffect, useRef } from 'react';

/**
 * VfxCompassGlobeBackground - 3D Rotating Earth Globe Canvas
 * Embedded in Section 7, Subsection 6 (Compass & Bearing)
 * 
 * Features:
 * - 3D Wireframe globe with rotating latitude/longitude meridians
 * - Inclined polar axis (23.5°)
 * - Smooth continuous rotation synced with user compass heading
 * - Luminous amber and cyan planetary navigational coordinates
 */
export function VfxCompassGlobeBackground({ heading = 0 }) {
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
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const globeRadius = Math.min(width, height) * 0.38;

      // Base rotation + heading offset
      rotation += 0.008;
      const currentAngle = rotation + (heading * Math.PI) / 180;

      // Outer Atmospheric Glow
      const glow = ctx.createRadialGradient(cx, cy, globeRadius * 0.8, cx, cy, globeRadius * 1.35);
      glow.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
      glow.addColorStop(0.6, 'rgba(245, 158, 11, 0.05)');
      glow.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius * 1.35, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Globe Outer Circle
      ctx.beginPath();
      ctx.arc(cx, cy, globeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      // Axial tilt (23.5 degrees)
      ctx.rotate((-23.5 * Math.PI) / 180);

      // Draw Latitude Parallels
      const latitudes = [-60, -40, -20, 0, 20, 40, 60];
      latitudes.forEach((lat) => {
        const rad = (lat * Math.PI) / 180;
        const y = Math.sin(rad) * globeRadius;
        const rAtLat = Math.cos(rad) * globeRadius;

        ctx.beginPath();
        ctx.ellipse(0, y, rAtLat, rAtLat * 0.28, 0, 0, Math.PI * 2);
        ctx.strokeStyle = lat === 0 ? 'rgba(251, 191, 36, 0.65)' : 'rgba(254, 240, 138, 0.22)';
        ctx.lineWidth = lat === 0 ? 1.8 : 1;
        ctx.stroke();
      });

      // Draw Rotating Longitude Meridians
      const numMeridians = 12;
      for (let i = 0; i < numMeridians; i++) {
        const phi = currentAngle + (i * Math.PI) / (numMeridians / 2);
        const cosPhi = Math.cos(phi);

        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(cosPhi) * globeRadius, globeRadius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = cosPhi > 0 ? 'rgba(251, 191, 36, 0.35)' : 'rgba(148, 163, 184, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Polar Axis Line
      ctx.beginPath();
      ctx.moveTo(0, -globeRadius * 1.25);
      ctx.lineTo(0, globeRadius * 1.25);
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // North Pole Marker
      ctx.beginPath();
      ctx.arc(0, -globeRadius, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // South Pole Marker
      ctx.beginPath();
      ctx.arc(0, globeRadius, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [heading]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75"
      style={{ background: 'transparent' }}
    />
  );
}

export default VfxCompassGlobeBackground;
