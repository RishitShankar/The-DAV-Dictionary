import React, { useEffect, useRef } from 'react';

/**
 * VfxGravityBlackHole - Kerr Gravitational Black Hole & Relativistic Accretion Disk
 * 60 FPS HTML5 Canvas with gravitational light lensing, spinning accretion gas spiral,
 * photon sphere ring, and cursor gravitational pull.
 */
export function VfxGravityBlackHole() {
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

    // Accretion disk particles
    const particleCount = 450;
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 260;
      return {
        angle,
        radius,
        speed: (0.015 + Math.random() * 0.02) * (180 / radius),
        size: Math.random() * 2 + 0.8,
        color: Math.random() > 0.4 ? '#f59e0b' : Math.random() > 0.5 ? '#ef4444' : '#38bdf8'
      };
    });

    let bhX = width * 0.5;
    let bhY = height * 0.5;

    const render = () => {
      // Smoothly drift towards mouse
      bhX += (mouseX - bhX) * 0.03;
      bhY += (mouseY - bhY) * 0.03;

      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)';
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(bhX, bhY);

      // Relativistic Lensing Outer Halo
      const haloGrad = ctx.createRadialGradient(0, 0, 50, 0, 0, 280);
      haloGrad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
      haloGrad.addColorStop(0.3, 'rgba(239, 68, 68, 0.2)');
      haloGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 280, 0, Math.PI * 2);
      ctx.fill();

      // Accretion Disk Particles
      particles.forEach(p => {
        p.angle += p.speed;
        const x = Math.cos(p.angle) * p.radius;
        // Tilt disk for 3D perspective
        const y = Math.sin(p.angle) * (p.radius * 0.38);

        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Photon Sphere (Bright glowing event horizon edge)
      ctx.strokeStyle = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.stroke();

      // Event Horizon (Absolute Pure Black Void Center)
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.88 }}
    />
  );
}
