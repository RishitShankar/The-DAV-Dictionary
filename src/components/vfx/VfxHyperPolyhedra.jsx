import React, { useEffect, useRef } from 'react';

/**
 * VfxHyperPolyhedra - The Sacred Hyper-Dimensional Polyhedra (Origami Matrix)
 * 3D floating Platonic solids (Icosahedron, Dodecahedron, Octahedron, Tetrahedron)
 * slowly morphing in deep space with neon refractive edges, chromatic light splits,
 * and magnetic attraction towards the mouse.
 */
export function VfxHyperPolyhedra() {
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

    // Standard 3D Octahedron Vertices & Edges
    const octaVertices = [
      [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]
    ];
    const octaEdges = [
      [0, 2], [2, 1], [1, 3], [3, 0],
      [0, 4], [2, 4], [1, 4], [3, 4],
      [0, 5], [2, 5], [1, 5], [3, 5]
    ];

    // Standard 3D Icosahedron Vertices & Edges
    const phi = (1 + Math.sqrt(5)) / 2;
    const icosaVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    const icosaEdges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
      [4, 5], [4, 11], [2, 11], [2, 10], [6, 10], [6, 7], [8, 7], [8, 1], [9, 1], [9, 5]
    ];

    // Array of Floating 3D Polyhedra Objects
    const polyhedra = [
      {
        type: 'icosa',
        vertices: icosaVertices,
        edges: icosaEdges,
        x: width * 0.3, y: height * 0.45,
        vx: 0.25, vy: -0.15,
        scale: 75,
        rotX: 0, rotY: 0, rotZ: 0,
        speedX: 0.008, speedY: 0.012, speedZ: 0.005,
        color: '#f59e0b', glowColor: '#fbbf24'
      },
      {
        type: 'octa',
        vertices: octaVertices,
        edges: octaEdges,
        x: width * 0.72, y: height * 0.35,
        vx: -0.2, vy: 0.18,
        scale: 85,
        rotX: 1.2, rotY: 0.5, rotZ: 0,
        speedX: -0.011, speedY: 0.015, speedZ: 0.007,
        color: '#06b6d4', glowColor: '#22d3ee'
      },
      {
        type: 'octa',
        vertices: octaVertices,
        edges: octaEdges,
        x: width * 0.5, y: height * 0.75,
        vx: 0.15, vy: 0.12,
        scale: 60,
        rotX: 0.4, rotY: 1.8, rotZ: 0.3,
        speedX: 0.014, speedY: -0.009, speedZ: 0.01,
        color: '#a855f7', glowColor: '#c084fc'
      }
    ];

    // Background starlight lattice
    const latticeCount = 60;
    const lattice = Array.from({ length: latticeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2
    }));

    let animId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space origami gradient
      const bg = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, Math.max(width, height) * 0.7);
      bg.addColorStop(0, '#0d0f1f');
      bg.addColorStop(0.5, '#05070f');
      bg.addColorStop(1, '#020308');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Starlight Lattice
      lattice.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${p.alpha})`;
        ctx.fill();
      });

      // 2. Render each Platonic Solid with 3D Matrix Perspective & Chromatic Light Split
      polyhedra.forEach((poly) => {
        poly.rotX += poly.speedX;
        poly.rotY += poly.speedY;
        poly.rotZ += poly.speedZ;

        // Position drift
        poly.x += poly.vx;
        poly.y += poly.vy;
        if (poly.x < 100 || poly.x > width - 100) poly.vx *= -1;
        if (poly.y < 100 || poly.y > height - 100) poly.vy *= -1;

        // Magnetic attraction to cursor
        const dx = mouseX - poly.x;
        const dy = mouseY - poly.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          poly.x += (dx / dist) * 1.5;
          poly.y += (dy / dist) * 1.5;
        }

        // 3D Rotation Matrix Calculation
        const cx = Math.cos(poly.rotX), sx = Math.sin(poly.rotX);
        const cy = Math.cos(poly.rotY), sy = Math.sin(poly.rotY);
        const cz = Math.cos(poly.rotZ), sz = Math.sin(poly.rotZ);

        const projected = poly.vertices.map(([vx, vy, vz]) => {
          // X rotation
          let y1 = vy * cx - vz * sx;
          let z1 = vz * cx + vy * sx;
          // Y rotation
          let x2 = vx * cy + z1 * sy;
          let z2 = z1 * cy - vx * sy;
          // Z rotation
          let x3 = x2 * cz - y1 * sz;
          let y3 = y1 * cz + x2 * sz;

          const fov = 350;
          const scale = fov / (fov + z2 * poly.scale * 0.01 + 200);

          return {
            x: poly.x + x3 * poly.scale * scale,
            y: poly.y + y3 * poly.scale * scale,
            scale,
            z: z2
          };
        });

        // Draw Chromatic Aberration & Neon Refractive Edges
        ctx.save();

        // Pass 1: Cyan chromatic shift
        ctx.beginPath();
        poly.edges.forEach(([i, j]) => {
          ctx.moveTo(projected[i].x - 1.5, projected[i].y);
          ctx.lineTo(projected[j].x - 1.5, projected[j].y);
        });
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Pass 2: Magenta chromatic shift
        ctx.beginPath();
        poly.edges.forEach(([i, j]) => {
          ctx.moveTo(projected[i].x + 1.5, projected[i].y);
          ctx.lineTo(projected[j].x + 1.5, projected[j].y);
        });
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Pass 3: Core Solid Golden / Neon Edge
        ctx.beginPath();
        poly.edges.forEach(([i, j]) => {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        });
        ctx.strokeStyle = poly.color;
        ctx.lineWidth = 2.0;
        ctx.shadowBlur = 16;
        ctx.shadowColor = poly.glowColor;
        ctx.stroke();

        // Draw Glowing Vertices
        projected.forEach((pt) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 4.5 * pt.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 12;
          ctx.shadowColor = poly.glowColor;
          ctx.fill();
        });

        ctx.restore();
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

export default VfxHyperPolyhedra;
