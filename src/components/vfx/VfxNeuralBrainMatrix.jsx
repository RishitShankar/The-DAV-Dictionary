import React, { useEffect, useRef } from 'react';

/**
 * VfxNeuralBrainMatrix - Section 4 (Rishi AI Master Engine)
 * Bioluminescent Quantum Neural Cortex & Synapse Network
 * Features branching neural pathways, traveling thought packets,
 * and high-voltage electrical synapse arcs connecting directly to the cursor.
 */
export function VfxNeuralBrainMatrix() {
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

    const nodeCount = Math.min(Math.floor(width / 32), 48);
    const neuralColors = ['#38bdf8', '#818cf8', '#c084fc', '#f43f5e', '#3b82f6'];

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.2 + 1.2,
      color: neuralColors[Math.floor(Math.random() * neuralColors.length)],
      pulse: Math.random() * Math.PI * 2
    }));

    // Traveling thought packet signals
    const signals = Array.from({ length: 14 }, () => ({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: Math.random() * 0.015 + 0.008
    }));

    let mouse = { x: -2000, y: -2000, active: false };

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

      // 1. Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > height) { n.y = height; n.vy *= -1; }

        // Interactive electrical arc to cursor
        if (mouse.active) {
          const dxMouse = mouse.x - n.x;
          const dyMouse = mouse.y - n.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 170) {
            const alpha = (1 - distMouse / 170);

            // Lightning arc stroke to cursor
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            // Midpoint jitter for electrical feel
            const midX = (n.x + mouse.x) / 2 + (Math.random() - 0.5) * 8;
            const midY = (n.y + mouse.y) / 2 + (Math.random() - 0.5) * 8;
            ctx.lineTo(midX, midY);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.75})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Concentric AI thought ring around cursor
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 20, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + Math.sin(n.pulse) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = n.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 2. Connect neighboring synapses
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.24;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Render traveling thought signals
      signals.forEach((sig) => {
        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          sig.progress = 0;
          sig.from = Math.floor(Math.random() * nodeCount);
          sig.to = Math.floor(Math.random() * nodeCount);
        }

        const n1 = nodes[sig.from];
        const n2 = nodes[sig.to];
        if (n1 && n2) {
          const sx = n1.x + (n2.x - n1.x) * sig.progress;
          const sy = n1.y + (n2.y - n1.y) * sig.progress;

          ctx.beginPath();
          ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#38bdf8';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

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

export default VfxNeuralBrainMatrix;
