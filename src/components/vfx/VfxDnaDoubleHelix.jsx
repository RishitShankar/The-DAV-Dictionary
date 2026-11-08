import React, { useEffect, useRef } from 'react';

/**
 * VfxDnaDoubleHelix - The Cybernetic DNA Double Helix (Bio-Genetic Code Stream)
 * 3D twisting nucleotide ladder with glowing A-T and G-C base pairs,
 * gene-splicing particle rings, and CRISPR molecular tracer beams that unravel
 * and re-link as you navigate.
 */
export function VfxDnaDoubleHelix() {
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

    // Nucleotide base pair colors (Adenine = Green, Thymine = Red, Guanine = Yellow, Cytosine = Blue)
    const basePairTypes = [
      { name: 'A-T', colA: '#10b981', colB: '#ef4444' },
      { name: 'G-C', colA: '#f59e0b', colB: '#3b82f6' }
    ];

    // Helix rungs
    const rungCount = 36;
    const rungs = Array.from({ length: rungCount }, (_, i) => ({
      yNorm: i / rungCount,
      pair: basePairTypes[i % 2],
      spliceGlow: 0
    }));

    // Orbiting Gene-Splicing Particle Rings
    const ringParticles = Array.from({ length: 40 }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.015,
      yPos: Math.random() * height,
      radius: Math.random() * 70 + 40,
      color: Math.random() > 0.5 ? '#10b981' : '#38bdf8'
    }));

    let t = 0;
    let animId;

    const render = () => {
      t += 0.018;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;

      // Deep Bio-Cybernetic Matrix Background
      const bg = ctx.createRadialGradient(cx, height / 2, 30, cx, height / 2, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#041416');
      bg.addColorStop(0.5, '#02090b');
      bg.addColorStop(1, '#010405');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      const helixRadius = 85;
      const verticalPitch = 0.008;

      // 1. Draw 3D Twisting Double Helix Rungs
      rungs.forEach((rung) => {
        // Continuous upward vertical drift
        let currentY = ((rung.yNorm * height + t * 40) % (height + 80)) - 40;
        const angle = currentY * verticalPitch + t * 1.5;

        // Interactive CRISPR Beam unravelling near cursor
        const distToMouse = Math.abs(currentY - mouseY);
        let unwrap = 1.0;
        if (distToMouse < 120 && Math.abs(cx - mouseX) < 180) {
          unwrap = 1.0 + (1 - distToMouse / 120) * 0.7;
          rung.spliceGlow = 1.0;

          // CRISPR molecular tracer beam
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(cx, currentY);
          ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        } else {
          rung.spliceGlow *= 0.95;
        }

        const effectiveR = helixRadius * unwrap;
        const x1 = cx + Math.sin(angle) * effectiveR;
        const z1 = Math.cos(angle);
        const x2 = cx - Math.sin(angle) * effectiveR;
        const z2 = -z1;

        // Depth perspective
        const scale1 = (z1 + 2) / 3;
        const scale2 = (z2 + 2) / 3;

        // Base Pair Hydrogen Bonding Rung
        ctx.beginPath();
        ctx.moveTo(x1, currentY);
        ctx.lineTo(cx, currentY);
        ctx.strokeStyle = rung.pair.colA;
        ctx.lineWidth = 2.5 * scale1;
        ctx.shadowBlur = 10;
        ctx.shadowColor = rung.pair.colA;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, currentY);
        ctx.lineTo(x2, currentY);
        ctx.strokeStyle = rung.pair.colB;
        ctx.lineWidth = 2.5 * scale2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = rung.pair.colB;
        ctx.stroke();

        // Strand 1 Nucleotide Bead
        ctx.beginPath();
        ctx.arc(x1, currentY, 6.5 * scale1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 14;
        ctx.shadowColor = rung.pair.colA;
        ctx.fill();

        // Strand 2 Nucleotide Bead
        ctx.beginPath();
        ctx.arc(x2, currentY, 6.5 * scale2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 14;
        ctx.shadowColor = rung.pair.colB;
        ctx.fill();
      });

      // 2. Gene-Splicing Orbiting Particle Rings
      ringParticles.forEach((rp) => {
        rp.angle += rp.speed;
        const rx = cx + Math.cos(rp.angle) * rp.radius;
        const ry = rp.yPos + Math.sin(rp.angle) * (rp.radius * 0.4);

        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rp.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = rp.color;
        ctx.fill();
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

export default VfxDnaDoubleHelix;
