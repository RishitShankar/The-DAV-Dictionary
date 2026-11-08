import React, { useEffect, useRef } from 'react';

/**
 * VfxHolographicNeuralBrain - 3D Holographic Cyber Neural Brain (Synaptic Web)
 * 3D rotating wireframe human brain with firing synaptic sparks, pulsating axon pathways,
 * neurotransmitter particle streams, and thought-wave ripples responding to cursor velocity.
 */
export function VfxHolographicNeuralBrain() {
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
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let mouseSpeed = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      mouseSpeed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Thought-wave ripples
    const ripples = [];
    const handlePointerDown = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: 280,
        alpha: 0.8
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);

    // Procedural 3D Neural Nodes mapped to human brain ellipsoid lobes
    const nodeCount = 140;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      // Dual hemisphere distribution with frontal, temporal, and occipital lobes
      const hemisphere = i % 2 === 0 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.85;
      
      const rX = 145 * Math.cos(phi) * 0.95;
      const rY = 120 * Math.sin(phi) * 1.1;
      const rZ = 160 * Math.cos(phi) * 1.15;

      const x = rX * Math.cos(theta) * 0.85 + (hemisphere * 38);
      const y = rY + (Math.sin(theta * 2) * 15);
      const z = rZ * Math.sin(theta);

      nodes.push({
        origX: x, origY: y, origZ: z,
        x, y, z,
        screenX: 0, screenY: 0,
        radius: Math.random() * 2.5 + 1.5,
        synapsePulse: Math.random(),
        synapseSpeed: Math.random() * 0.03 + 0.015,
        color: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'][Math.floor(Math.random() * 5)]
      });
    }

    // Axon interconnections
    const connections = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].origX - nodes[j].origX;
        const dy = nodes[i].origY - nodes[j].origY;
        const dz = nodes[i].origZ - nodes[j].origZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 65) {
          connections.push({ a: i, b: j, dist });
        }
      }
    }

    // Neurotransmitter Particle Streams
    const transmitters = Array.from({ length: 45 }, () => {
      const conn = connections[Math.floor(Math.random() * connections.length)] || { a: 0, b: 1 };
      return {
        conn,
        progress: Math.random(),
        speed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.5 ? '#38bdf8' : '#f472b6'
      };
    });

    let rotY = 0;
    let rotX = 0.2;
    let animId;

    const render = () => {
      rotY += 0.007 + (mouseSpeed * 0.0008);
      rotX = 0.2 + (mouseY / height - 0.5) * 0.35;
      mouseSpeed *= 0.95;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Dark cybernetic radial glow
      const bgGrad = ctx.createRadialGradient(cx, cy, 30, cx, cy, Math.max(width, height) * 0.65);
      bgGrad.addColorStop(0, '#0a0d1d');
      bgGrad.addColorStop(0.5, '#04060e');
      bgGrad.addColorStop(1, '#020205');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Thought-wave ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 3.5;
        rip.alpha -= 0.012;
        if (rip.alpha <= 0) {
          ripples.splice(r, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 2. 3D Rotation Transform of Neural Nodes
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 420;

      nodes.forEach((n) => {
        // Y-axis rotation
        let x1 = n.origX * cosY - n.origZ * sinY;
        let z1 = n.origZ * cosY + n.origX * sinY;

        // X-axis rotation
        let y2 = n.origY * cosX - z1 * sinX;
        let z2 = z1 * cosX + n.origY * sinX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 200);
        n.screenX = cx + x1 * scale;
        n.screenY = cy + y2 * scale;
        n.scale = scale;
        n.z = z2;

        n.synapsePulse += n.synapseSpeed;
      });

      // 3. Draw Axon Pathways
      connections.forEach((conn) => {
        const na = nodes[conn.a];
        const nb = nodes[conn.b];
        const avgScale = (na.scale + nb.scale) / 2;
        const alpha = Math.max(0.05, Math.min(0.45, (avgScale - 0.5) * 0.9));

        ctx.beginPath();
        ctx.moveTo(na.screenX, na.screenY);
        ctx.lineTo(nb.screenX, nb.screenY);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 1.0 * avgScale;
        ctx.stroke();
      });

      // 4. Draw Neurotransmitter Sparks travelling along Axons
      transmitters.forEach((tr) => {
        tr.progress += tr.speed;
        if (tr.progress >= 1) {
          tr.progress = 0;
          tr.conn = connections[Math.floor(Math.random() * connections.length)];
        }
        const na = nodes[tr.conn.a];
        const nb = nodes[tr.conn.b];
        const tx = na.screenX + (nb.screenX - na.screenX) * tr.progress;
        const ty = na.screenY + (nb.screenY - na.screenY) * tr.progress;

        ctx.beginPath();
        ctx.arc(tx, ty, 2.5 * na.scale, 0, Math.PI * 2);
        ctx.fillStyle = tr.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = tr.color;
        ctx.fill();
      });

      // 5. Draw Neural Synapse Nodes
      nodes.forEach((n) => {
        const pulse = 0.6 + Math.sin(n.synapsePulse) * 0.4;
        ctx.beginPath();
        ctx.arc(n.screenX, n.screenY, n.radius * n.scale * (1 + pulse * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 10 * n.scale;
        ctx.shadowColor = n.color;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

export default VfxHolographicNeuralBrain;
