import React, { useEffect, useRef } from 'react';

/**
 * VfxLecturesAudioWave - Section 6 (Chapter Explanations / Video & Audio Lectures)
 * Dynamic Audio Frequency Spectrum & Sonic Laser Matrix
 * Features oscillating speech frequency nodes that bob on harmonic soundwaves,
 * connecting with electric cyan/violet laser strings that vibrate and tether to the cursor.
 */
export function VfxLecturesAudioWave() {
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

    const nodeCount = Math.min(Math.floor(width / 32), 50);
    const audioColors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#a855f7', '#10b981', '#38bdf8'];

    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      x: 0,
      y: 0,
      freq: Math.random() * 0.04 + 0.01,
      amp: Math.random() * 25 + 10,
      phase: (i / nodeCount) * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2.2 + 1.2,
      color: audioColors[i % audioColors.length]
    }));

    let mouse = { x: -2000, y: -2000, active: false };
    let time = 0;

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
      time += 0.03;

      // 1. Calculate positions with harmonic wave oscillation
      nodes.forEach((node) => {
        node.baseX += node.vx;
        if (node.baseX < 0) { node.baseX = 0; node.vx *= -1; }
        if (node.baseX > width) { node.baseX = width; node.vx *= -1; }

        // Harmonic speech wave bobbing
        let waveOffset = Math.sin(time * 2 + node.phase) * node.amp;

        // Extra vibration if near mouse cursor
        if (mouse.active) {
          const dx = mouse.x - node.baseX;
          const dy = mouse.y - (node.baseY + waveOffset);
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const influence = (1 - dist / 180);
            waveOffset += Math.sin(time * 6 + node.phase) * (influence * 30);
            node.x = node.baseX + (dx / dist) * influence * 15;
            node.y = node.baseY + waveOffset + (dy / dist) * influence * 15;

            // Connect sonic laser beam to cursor
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${influence * 0.8})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Sonic ripple around cursor
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else {
            node.x = node.baseX;
            node.y = node.baseY + waveOffset;
          }
        } else {
          node.x = node.baseX;
          node.y = node.baseY + waveOffset;
        }

        // Render audio node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Miniature vertical equalizer bar
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - node.radius);
        ctx.lineTo(node.x, node.y - node.radius - (Math.abs(Math.sin(time * 3 + node.phase)) * 12));
        ctx.strokeStyle = `rgba(6, 182, 212, 0.45)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 2. Connect neighboring audio spectrum nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.26;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.9;
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
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70 mix-blend-screen"
    />
  );
}

export default VfxLecturesAudioWave;
