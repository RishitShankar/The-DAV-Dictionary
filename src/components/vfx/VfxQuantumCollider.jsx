import React, { useEffect, useRef } from 'react';

/**
 * VfxQuantumCollider - The Quantum Particle Supercollider (Atomic Orbitals)
 * 60 FPS HTML5 Canvas with Bohr-Schrödinger probability clouds, spinning electron rings,
 * pulsing quark nuclei, photon emission bursts on click, and magnetic deflection tethers.
 */
export function VfxQuantumCollider() {
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
    let isMouseDown = false;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Photon emission bursts on click
    const photons = [];
    const handleClick = (e) => {
      for (let i = 0; i < 28; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        photons.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 3 + 1.5,
          alpha: 1.0,
          color: ['#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#34d399'][Math.floor(Math.random() * 5)]
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', () => { isMouseDown = true; });
    window.addEventListener('mouseup', () => { isMouseDown = false; });
    window.addEventListener('click', handleClick);

    // Orbital Shells (K, L, M, N shells)
    const shells = [
      { radiusX: 90, radiusY: 45, tilt: 0.35, speed: 0.035, electrons: 2, color: '#38bdf8' },
      { radiusX: 160, radiusY: 75, tilt: -0.65, speed: -0.024, electrons: 4, color: '#818cf8' },
      { radiusX: 240, radiusY: 110, tilt: 1.15, speed: 0.018, electrons: 6, color: '#c084fc' },
      { radiusX: 320, radiusY: 150, tilt: -1.75, speed: -0.012, electrons: 8, color: '#f43f5e' }
    ];

    // Probability Cloud Particles (Schrödinger Quantum Field)
    const cloudCount = Math.min(Math.floor(width / 14), 130);
    const cloud = Array.from({ length: cloudCount }, () => ({
      dist: Math.random() * 360 + 20,
      angle: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.6 + 0.2,
      hue: Math.random() * 60 + 190 // Cyan to violet spectrum
    }));

    // Quarks inside Nucleus
    const quarks = [
      { color: '#ef4444', angle: 0, dist: 12, speed: 0.05 },
      { color: '#3b82f6', angle: 2.1, dist: 14, speed: -0.045 },
      { color: '#10b981', angle: 4.2, dist: 11, speed: 0.06 }
    ];

    let t = 0;
    let animId;

    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Deep Quantum Vacuum Background with subtle radial glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.7);
      bgGrad.addColorStop(0, '#0c1022');
      bgGrad.addColorStop(0.5, '#050711');
      bgGrad.addColorStop(1, '#020307');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Quantum Probability Cloud (Schrödinger Wavefunction)
      cloud.forEach((p) => {
        p.angle += p.orbitSpeed;
        const px = cx + Math.cos(p.angle) * p.dist;
        const py = cy + Math.sin(p.angle) * (p.dist * 0.65);

        // Magnetic Deflection tether towards mouse
        const dx = mouseX - px;
        const dy = mouseY - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        let drawX = px;
        let drawY = py;
        if (d < 220) {
          const force = (1 - d / 220) * 35;
          drawX += (dx / d) * force;
          drawY += (dy / d) * force;

          // Tether line
          if (Math.random() < 0.15) {
            ctx.beginPath();
            ctx.moveTo(drawX, drawY);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `hsla(${p.hue}, 90%, 65%, ${0.2 * (1 - d / 220)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsl(${p.hue}, 85%, 60%)`;
        ctx.fill();
      });

      // 2. Spinning Electron Orbital Shells
      shells.forEach((shell, sIdx) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(shell.tilt + Math.sin(t * 0.2 + sIdx) * 0.1);

        // Elliptical Bohr Shell Path
        ctx.beginPath();
        ctx.ellipse(0, 0, shell.radiusX, shell.radiusY, 0, 0, Math.PI * 2);
        ctx.strokeStyle = shell.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.4;
        ctx.setLineDash([6, 8]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbiting Electrons
        const step = (Math.PI * 2) / shell.electrons;
        for (let i = 0; i < shell.electrons; i++) {
          const eAngle = t * shell.speed * 4 + step * i;
          const ex = Math.cos(eAngle) * shell.radiusX;
          const ey = Math.sin(eAngle) * shell.radiusY;

          // Electron Glow
          ctx.beginPath();
          ctx.arc(ex, ey, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.95;
          ctx.shadowBlur = 14;
          ctx.shadowColor = shell.color;
          ctx.fill();

          // Particle Trail
          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = shell.color;
          ctx.fill();
        }
        ctx.restore();
      });

      // 3. Central Atomic Nucleus & Gluon Field
      const pulse = 18 + Math.sin(t * 4) * 3;
      const nucGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, pulse * 2.2);
      nucGrad.addColorStop(0, '#ffffff');
      nucGrad.addColorStop(0.3, '#38bdf8');
      nucGrad.addColorStop(0.7, '#818cf8');
      nucGrad.addColorStop(1, 'rgba(129, 140, 248, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, pulse * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = nucGrad;
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();

      // Spinning Quarks
      quarks.forEach((q) => {
        q.angle += q.speed;
        const qx = cx + Math.cos(q.angle) * q.dist;
        const qy = cy + Math.sin(q.angle) * q.dist;
        ctx.beginPath();
        ctx.arc(qx, qy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = q.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = q.color;
        ctx.fill();
      });

      // 4. Photons Bursting on Click
      for (let i = photons.length - 1; i >= 0; i--) {
        const ph = photons[i];
        ph.x += ph.vx;
        ph.y += ph.vy;
        ph.alpha -= 0.018;

        if (ph.alpha <= 0) {
          photons.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ph.x, ph.y, ph.radius, 0, Math.PI * 2);
        ctx.fillStyle = ph.color;
        ctx.globalAlpha = ph.alpha;
        ctx.shadowBlur = 12;
        ctx.shadowColor = ph.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxQuantumCollider;
