import React, { useEffect, useRef } from 'react';

/**
 * VfxSolarSystemGalaxy - Section 2 (Digital Textbooks & Library)
 * Awwwards-Caliber Solar System, Galaxy, Rocket & Spaceship Background Canvas
 * 
 * Features:
 * 1. The Sun with radiant solar corona flares
 * 2. All 8/9 Solar System Planets (Mercury, Venus, Earth with Moon, Mars, Jupiter with Red Spot,
 *    Saturn with 3D Rings, Uranus, Neptune, Pluto)
 * 3. Animated Apollo Rocket with fiery exhaust plume
 * 4. Animated Sci-Fi Spaceship with cyan ion thruster trail
 * 5. Twinkling starfield with meteors
 * 6. Interactive constellation lines connecting stars and tethering to the cursor!
 */
export function VfxSolarSystemGalaxy() {
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

    // 1. Starfield Particles
    const starCount = Math.min(Math.floor(width / 20), 85);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.0 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: ['#ffffff', '#fef08a', '#93c5fd', '#fbcfe8', '#fed7aa'][Math.floor(Math.random() * 5)]
    }));

    // 2. Solar System Planets Configuration
    const planets = [
      { name: 'Mercury', color: '#9ca3af', radius: 6, orbitR: 85, speed: 0.018, angle: 0.5 },
      { name: 'Venus', color: '#f59e0b', radius: 9, orbitR: 130, speed: 0.013, angle: 2.1 },
      { name: 'Earth', color: '#38bdf8', secondaryColor: '#22c55e', radius: 11, orbitR: 185, speed: 0.010, angle: 3.8, hasMoon: true, moonAngle: 0 },
      { name: 'Mars', color: '#ef4444', radius: 8, orbitR: 240, speed: 0.008, angle: 5.2 },
      { name: 'Jupiter', color: '#d97706', bandColor: '#fed7aa', radius: 22, orbitR: 310, speed: 0.005, angle: 1.4, hasSpot: true },
      { name: 'Saturn', color: '#fbbf24', radius: 17, orbitR: 390, speed: 0.0035, angle: 4.5, hasRings: true },
      { name: 'Uranus', color: '#2dd4bf', radius: 13, orbitR: 470, speed: 0.0025, angle: 0.9, hasThinRing: true },
      { name: 'Neptune', color: '#3b82f6', radius: 13, orbitR: 540, speed: 0.0018, angle: 2.7 },
      { name: 'Pluto', color: '#cbd5e1', radius: 4, orbitR: 600, speed: 0.0012, angle: 4.1 }
    ];

    // 3. Apollo Rocket Flight Path
    let rocket = {
      x: -100,
      y: height * 0.7,
      vx: 1.8,
      vy: -0.65,
      angle: -Math.PI / 10,
      exhaustParticles: []
    };

    // 4. Sci-Fi Spaceship Flight Path
    let spaceship = {
      x: width + 100,
      y: height * 0.35,
      vx: -1.4,
      vy: 0.35,
      angle: Math.PI * 0.95,
      trailParticles: []
    };

    // 5. Shooting Star (Meteor)
    let meteor = {
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      length: 0,
      alpha: 0
    };

    const triggerMeteor = () => {
      meteor.x = Math.random() * width * 0.8;
      meteor.y = Math.random() * (height * 0.3);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 10 + 12;
      meteor.vx = Math.cos(angle) * speed;
      meteor.vy = Math.sin(angle) * speed;
      meteor.length = Math.random() * 60 + 60;
      meteor.alpha = 1.0;
      meteor.active = true;
    };

    let meteorTimer = setInterval(triggerMeteor, 6000);

    // Mouse Tracking for Interactive Constellation Tethers
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
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const sunX = Math.max(80, width * 0.12);
      const sunY = Math.max(120, height * 0.28);

      // ==========================================
      // A) RENDER THE SUN WITH CORONA FLARES
      // ==========================================
      const sunRadius = 45;
      const coronaPulse = Math.sin(time * 3) * 6;

      // Outer Corona Gradient
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, sunRadius * 2.2 + coronaPulse);
      coronaGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
      coronaGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.6)');
      coronaGrad.addColorStop(0.7, 'rgba(239, 68, 68, 0.2)');
      coronaGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2.2 + coronaPulse, 0, Math.PI * 2);
      ctx.fillStyle = coronaGrad;
      ctx.fill();

      // Sun Core
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sun Label
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = 'rgba(254, 240, 138, 0.9)';
      ctx.textAlign = 'center';
      ctx.fillText('☀️ THE SUN', sunX, sunY + sunRadius + 14);

      // ==========================================
      // B) RENDER ORBIT RINGS & PLANETS
      // ==========================================
      planets.forEach((p) => {
        p.angle += p.speed;

        // Elliptical Orbit Track
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, p.orbitR, p.orbitR * 0.65, Math.PI / 12, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Planet Position on Ellipse
        const px = sunX + Math.cos(p.angle) * p.orbitR;
        const py = sunY + Math.sin(p.angle) * (p.orbitR * 0.65);

        // Saturn Rings (Back half)
        if (p.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.3, p.radius * 0.6, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Body
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Earth details & Moon
        if (p.hasMoon) {
          p.moonAngle += 0.05;
          const mx = px + Math.cos(p.moonAngle) * (p.radius + 12);
          const my = py + Math.sin(p.moonAngle) * (p.radius + 8);
          // Moon
          ctx.beginPath();
          ctx.arc(mx, my, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = '#f8fafc';
          ctx.fill();
        }

        // Jupiter Storm Band & Red Spot
        if (p.hasSpot) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.clip();
          // Bands
          ctx.fillStyle = p.bandColor;
          ctx.fillRect(px - p.radius, py - 4, p.radius * 2, 3);
          ctx.fillRect(px - p.radius, py + 3, p.radius * 2, 2.5);
          // Great Red Spot
          ctx.beginPath();
          ctx.arc(px + 6, py + 2, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#b91c1c';
          ctx.fill();
          ctx.restore();
        }

        // Saturn Rings (Front half)
        if (p.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.3, p.radius * 0.6, 0, 0, Math.PI);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.75)';
          ctx.lineWidth = 4;
          ctx.stroke();
          ctx.restore();
        }

        // Uranus thin ring
        if (p.hasThinRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 3);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.8, p.radius * 0.35, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        // Planet Label
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py + p.radius + 11);
      });

      // ==========================================
      // C) RENDER STARFIELD & CONSTELLATION LINES
      // ==========================================
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += (Math.random() - 0.5) * s.twinkleSpeed;
        if (s.alpha < 0.2) s.alpha = 0.2;
        if (s.alpha > 0.9) s.alpha = 0.9;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Interactive mouse constellation tethering
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const pull = (1 - dist / 150);
            s.x += (dx / dist) * pull * 0.5;
            s.y += (dy / dist) * pull * 0.5;

            // Connect laser line to cursor
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${pull * 0.65})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

            // Cursor focal starlet
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#fbbf24';
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }

        // Star dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Inter-star constellation links
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            const alpha = (1 - dist / 105) * 0.18;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ==========================================
      // D) RENDER THE APOLLO ROCKET WITH FLAME EXHAUST
      // ==========================================
      rocket.x += rocket.vx;
      rocket.y += rocket.vy;

      if (rocket.x > width + 120 || rocket.y < -100) {
        rocket.x = -80;
        rocket.y = height * (0.6 + Math.random() * 0.3);
      }

      // Add fiery exhaust particles
      rocket.exhaustParticles.push({
        x: rocket.x - Math.cos(rocket.angle) * 25,
        y: rocket.y - Math.sin(rocket.angle) * 25,
        vx: -Math.cos(rocket.angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5) * 1.5,
        vy: -Math.sin(rocket.angle) * (Math.random() * 3 + 2) + (Math.random() - 0.5) * 1.5,
        size: Math.random() * 5 + 3,
        alpha: 1.0,
        color: ['#f59e0b', '#ef4444', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)]
      });

      // Render exhaust trail
      for (let i = rocket.exhaustParticles.length - 1; i >= 0; i--) {
        const ep = rocket.exhaustParticles[i];
        ep.x += ep.vx;
        ep.y += ep.vy;
        ep.alpha -= 0.035;
        ep.size *= 0.95;

        if (ep.alpha <= 0) {
          rocket.exhaustParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(ep.x, ep.y, ep.size, 0, Math.PI * 2);
        ctx.fillStyle = ep.color;
        ctx.globalAlpha = ep.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = ep.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // Draw Rocket Body
      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      ctx.rotate(rocket.angle);

      // Rocket Fuselage (White cylinder)
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.roundRect(-20, -6, 32, 12, 3);
      ctx.fill();

      // Red Nosecone
      ctx.beginPath();
      ctx.moveTo(12, -6);
      ctx.lineTo(26, 0);
      ctx.lineTo(12, 6);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Stabilizer Fins
      ctx.beginPath();
      ctx.moveTo(-16, -6);
      ctx.lineTo(-24, -13);
      ctx.lineTo(-8, -6);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-16, 6);
      ctx.lineTo(-24, 13);
      ctx.lineTo(-8, 6);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Porthole Window
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.restore();

      // ==========================================
      // E) RENDER SCI-FI SPACESHIP WITH ION TRAIL
      // ==========================================
      spaceship.x += spaceship.vx;
      spaceship.y += spaceship.vy;

      if (spaceship.x < -100 || spaceship.y > height + 80) {
        spaceship.x = width + 80;
        spaceship.y = height * (0.2 + Math.random() * 0.35);
      }

      // Add ion particles
      spaceship.trailParticles.push({
        x: spaceship.x - Math.cos(spaceship.angle) * 22,
        y: spaceship.y - Math.sin(spaceship.angle) * 22,
        vx: -Math.cos(spaceship.angle) * 2 + (Math.random() - 0.5),
        vy: -Math.sin(spaceship.angle) * 2 + (Math.random() - 0.5),
        size: Math.random() * 3 + 2,
        alpha: 0.9
      });

      // Render ion trail
      for (let i = spaceship.trailParticles.length - 1; i >= 0; i--) {
        const tp = spaceship.trailParticles[i];
        tp.x += tp.vx;
        tp.y += tp.vy;
        tp.alpha -= 0.04;

        if (tp.alpha <= 0) {
          spaceship.trailParticles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(tp.x, tp.y, tp.size, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.globalAlpha = tp.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      // Draw Spaceship Body (Delta Wing)
      ctx.save();
      ctx.translate(spaceship.x, spaceship.y);
      ctx.rotate(spaceship.angle);

      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(-14, -12);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.8;
      ctx.fill();
      ctx.stroke();

      // Glowing Cockpit
      ctx.beginPath();
      ctx.arc(4, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7';
      ctx.fill();

      ctx.restore();

      // ==========================================
      // F) RENDER METEOR (SHOOTING STAR)
      // ==========================================
      if (meteor.active) {
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;
        meteor.alpha -= 0.03;

        if (meteor.alpha <= 0 || meteor.x > width || meteor.y > height) {
          meteor.active = false;
        } else {
          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(meteor.x - (meteor.vx / 15) * meteor.length, meteor.y - (meteor.vy / 15) * meteor.length);
          ctx.strokeStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
          ctx.lineWidth = 2.2;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorTimer);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-85 mix-blend-screen"
    />
  );
}

export default VfxSolarSystemGalaxy;
