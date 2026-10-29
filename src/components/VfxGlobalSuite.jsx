import React, { useEffect, useRef, useState } from 'react';

// Exportable helper function to trigger celebratory confetti anywhere in the app
export function triggerCelebrationConfetti(count = 120) {
  try {
    window.dispatchEvent(new CustomEvent('dav_trigger_confetti', { detail: { count } }));
  } catch (e) {}
}

export function VfxGlobalSuite({ isDevMode = false, showConstellation = false }) {
  const constellationCanvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  // 1. Interactive Click Ripple Listener (VFX #9)
  useEffect(() => {
    const handleClick = (e) => {
      // Don't spawn on canvas clicks in cinematic view
      if (e.target?.closest('.no-ripple')) return;

      const newRipple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-12), newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 650);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // 2. Physics Confetti Cannon Engine (VFX #25 & Animation #47)
  const confettiCanvasRef = useRef(null);
  useEffect(() => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const confettiColors = ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#3b82f6', '#10b981', '#ffffff'];

    const spawnConfetti = (e) => {
      const count = e?.detail?.count || 120;
      const originX = window.innerWidth / 2;
      const originY = window.innerHeight * 0.4;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 4;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 6,
          size: Math.random() * 8 + 4,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
          gravity: 0.28,
          drag: 0.98,
          alpha: 1.0,
          shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
      }
    };

    window.addEventListener('dav_trigger_confetti', spawnConfetti);

    const render = () => {
      if (particles.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.rotation += p.rotationSpeed;
          p.alpha -= 0.009;

          if (p.alpha <= 0 || p.y > canvas.height) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(p.alpha, 0);

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('dav_trigger_confetti', spawnConfetti);
    };
  }, []);

  // 3. Constellation Background Particle Net (VFX #4)
  useEffect(() => {
    if (!showConstellation) return;
    const canvas = constellationCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const nodeCount = Math.min(Math.floor(window.innerWidth / 28), 55);
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.8
    }));

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Render point
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.45)';
        ctx.fill();

        // Check proximity to cursor
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(251, 191, 36, ${0.45 * (1 - distMouse / 140)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Link nearby nodes with filaments
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [showConstellation]);

  return (
    <>
      {/* Background Constellation Net Canvas */}
      {showConstellation && (
        <canvas
          ref={constellationCanvasRef}
          className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
        />
      )}

      {/* Physics Confetti Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-[120]"
      />

      {/* Interactive Fluid Click Ripples (VFX #9) */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="vfx-click-ripple"
            style={{
              left: `${ripple.x}px`,
              top: `${ripple.y}px`
            }}
          />
        ))}
      </div>
    </>
  );
}
