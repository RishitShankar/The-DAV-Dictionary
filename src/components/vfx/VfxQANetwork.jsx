import React, { useEffect, useRef } from 'react';

/**
 * VfxQANetwork - Section 3 (Questions & Answers)
 * Interactive Golden Knowledge Synapses & Neural Q&A Grid
 * Features floating scholarly nodes (?, !, Q, A, ∑, √) connecting with golden laser filaments
 * and dynamic proximity tethers to the student's cursor.
 */
export function VfxQANetwork() {
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

    const symbols = ['?', '!', 'Q', 'A', '∑', '√', 'π', '★', '❖'];
    const nodeCount = Math.min(Math.floor(width / 32), 52);

    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2.5 + 1.2,
      symbol: i % 4 === 0 ? symbols[Math.floor(Math.random() * symbols.length)] : null,
      color: ['#fbbf24', '#f59e0b', '#c084fc', '#e879f9', '#ffffff'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.03 + 0.01
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

      // 1. Update and draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        // Bounce on boundaries
        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > width) { node.x = width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > height) { node.y = height; node.vy *= -1; }

        // Gravitational magnetic pull toward cursor if nearby
        if (mouse.active) {
          const dxMouse = mouse.x - node.x;
          const dyMouse = mouse.y - node.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 180 && distMouse > 15) {
            const force = (1 - distMouse / 180) * 0.35;
            node.x += (dxMouse / distMouse) * force;
            node.y += (dyMouse / distMouse) * force;

            // Connect laser filament to cursor
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${(1 - distMouse / 180) * 0.75})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Cursor focal glow spark
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#fbbf24';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Draw node body
        const r = node.radius + Math.sin(node.pulse) * 0.8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw scholarly symbol if present
        if (node.symbol) {
          ctx.font = 'bold 10px monospace';
          ctx.fillStyle = 'rgba(253, 224, 71, 0.85)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.symbol, node.x, node.y - 10);
        }
      });

      // 2. Connect nearby knowledge nodes with golden laser filaments
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const alpha = (1 - dist / 125) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            ctx.lineWidth = 0.8;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-75 mix-blend-screen"
    />
  );
}

export default VfxQANetwork;
