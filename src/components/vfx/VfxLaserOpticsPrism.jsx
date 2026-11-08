import React, { useEffect, useRef } from 'react';

/**
 * VfxLaserOpticsPrism - The Crystal Prism Laser Optics Bench
 * Multiple bouncing laser beams refracting through rotating triangular glass prisms,
 * splitting into RGB spectra and reflecting off mirrors to produce kaleidoscopic light patterns.
 */
export function VfxLaserOpticsPrism() {
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
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Triangular Glass Prisms
    const prisms = [
      { x: width * 0.35, y: height * 0.45, size: 75, angle: 0, rotSpeed: 0.005 },
      { x: width * 0.68, y: height * 0.55, size: 85, angle: 1.2, rotSpeed: -0.004 }
    ];

    // Rainbow Spectrum Colors (Newton's Optics Dispersion)
    const rainbowColors = [
      '#ef4444', // Red (least refracted)
      '#f97316', // Orange
      '#eab308', // Yellow
      '#22c55e', // Green
      '#06b6d4', // Cyan
      '#3b82f6', // Blue
      '#8b5cf6'  // Violet (most refracted)
    ];

    let t = 0;
    let animId;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Deep Laboratory Darkroom Background
      const bg = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#0a0d18');
      bg.addColorStop(0.5, '#04060d');
      bg.addColorStop(1, '#010206');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Rotating Triangular Prisms with Refraction Glass Sheen
      prisms.forEach((p) => {
        p.angle += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Equilateral Triangle Vertices
        const v1 = [0, -p.size];
        const v2 = [p.size * Math.cos(Math.PI / 6), p.size * Math.sin(Math.PI / 6)];
        const v3 = [-p.size * Math.cos(Math.PI / 6), p.size * Math.sin(Math.PI / 6)];

        ctx.beginPath();
        ctx.moveTo(v1[0], v1[1]);
        ctx.lineTo(v2[0], v2[1]);
        ctx.lineTo(v3[0], v3[1]);
        ctx.closePath();

        // Crystal Glass Tint
        const prismGrad = ctx.createLinearGradient(-p.size, -p.size, p.size, p.size);
        prismGrad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        prismGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.12)');
        prismGrad.addColorStop(1, 'rgba(168, 85, 247, 0.25)');
        ctx.fillStyle = prismGrad;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#38bdf8';
        ctx.stroke();

        ctx.restore();
      });

      // 2. Incident Laser Beam (Emanating from left source towards Prism 1)
      const laserSource = { x: 40, y: height * 0.48 + Math.sin(t * 1.2) * 60 };
      const targetPrism = prisms[0];

      ctx.beginPath();
      ctx.moveTo(laserSource.x, laserSource.y);
      ctx.lineTo(targetPrism.x, targetPrism.y);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.8;
      ctx.shadowBlur = 18;
      ctx.shadowColor = '#ffffff';
      ctx.stroke();

      // Laser Emitter Lens Glow
      ctx.beginPath();
      ctx.arc(laserSource.x, laserSource.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();

      // 3. Refracted Rainbow Dispersion Beams from Prism 1 towards Prism 2
      rainbowColors.forEach((col, idx) => {
        const spread = (idx - 3) * 0.055;
        const beamAngle = 0.25 + spread + Math.sin(t * 0.8) * 0.05;
        const midX = targetPrism.x + Math.cos(beamAngle) * 320;
        const midY = targetPrism.y + Math.sin(beamAngle) * 320;

        ctx.beginPath();
        ctx.moveTo(targetPrism.x, targetPrism.y);
        ctx.lineTo(midX, midY);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2.0;
        ctx.shadowBlur = 14;
        ctx.shadowColor = col;
        ctx.stroke();

        // 4. Secondary Dispersion / Kaleidoscopic Reflection towards mouse
        const mouseAngle = Math.atan2(mouseY - midY, mouseX - midX);
        const refAngle = mouseAngle + (idx - 3) * 0.08;
        const endX = midX + Math.cos(refAngle) * 280;
        const endY = midY + Math.sin(refAngle) * 280;

        ctx.beginPath();
        ctx.moveTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = col;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxLaserOpticsPrism;
