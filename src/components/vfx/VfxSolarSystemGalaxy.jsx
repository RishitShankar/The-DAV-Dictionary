import React, { useEffect, useRef } from 'react';

/**
 * VfxSolarSystemGalaxy - Section 2 (Digital Textbooks & Library)
 * Awwwards-Caliber Solar System, Galaxy, Rocket & Spaceship Background Canvas
 * 
 * Features:
 * 1. The Sun with radiant solar corona, pulsing plasma rays and flares
 * 2. All 8/9 Solar System Planets (Mercury, Venus, Earth with orbiting Moon, Mars,
 *    Jupiter with Red Spot, Saturn with 3D tilted golden rings, Uranus with ring,
 *    Neptune, Pluto)
 * 3. Animated Apollo Rocket with continuous fiery particle exhaust plume
 * 4. Animated Sci-Fi Spaceship with dual cyan ion thruster trail
 * 5. Shooting stars (meteors) crossing the cosmos
 * 6. Interactive constellation lines connecting stars and tethering to cursor
 */
export function VfxSolarSystemGalaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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

    // 1. Starfield Particles (Twinkling Cosmos)
    const starCount = Math.min(Math.floor(width / 16), 110);
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 0.03 + 0.015,
      color: ['#ffffff', '#fef08a', '#93c5fd', '#fbcfe8', '#fed7aa', '#67e8f9'][Math.floor(Math.random() * 6)]
    }));

    // 2. Solar System Planets Configuration
    const planets = [
      { name: 'Mercury', color: '#cbd5e1', radius: 5.5, orbitR: 75, speed: 0.022, angle: 0.6 },
      { name: 'Venus', color: '#f59e0b', radius: 8.5, orbitR: 115, speed: 0.016, angle: 2.2 },
      { name: 'Earth', color: '#38bdf8', secondaryColor: '#22c55e', radius: 10.5, orbitR: 165, speed: 0.012, angle: 3.9, hasMoon: true, moonAngle: 0 },
      { name: 'Mars', color: '#ef4444', radius: 7.5, orbitR: 215, speed: 0.009, angle: 5.3 },
      { name: 'Jupiter', color: '#d97706', bandColor: '#fed7aa', radius: 21, orbitR: 280, speed: 0.006, angle: 1.5, hasSpot: true },
      { name: 'Saturn', color: '#fbbf24', radius: 16, orbitR: 350, speed: 0.004, angle: 4.6, hasRings: true },
      { name: 'Uranus', color: '#2dd4bf', radius: 12, orbitR: 420, speed: 0.0028, angle: 0.95, hasThinRing: true },
      { name: 'Neptune', color: '#3b82f6', radius: 12, orbitR: 490, speed: 0.0020, angle: 2.8 },
      { name: 'Pluto', color: '#e2e8f0', radius: 4.5, orbitR: 560, speed: 0.0014, angle: 4.2 }
    ];

    // 3. Apollo Rocket Flight Path
    let rocket = {
      x: -80,
      y: height * 0.75,
      vx: 1.7,
      vy: -0.55,
      angle: -Math.PI / 11,
      exhaustParticles: []
    };

    // 4. Sci-Fi Spaceship Flight Path
    let spaceship = {
      x: width + 100,
      y: height * 0.38,
      vx: -1.35,
      vy: 0.32,
      angle: Math.PI * 0.96,
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
      meteor.y = Math.random() * (height * 0.35);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
      const speed = Math.random() * 10 + 13;
      meteor.vx = Math.cos(angle) * speed;
      meteor.vy = Math.sin(angle) * speed;
      meteor.length = Math.random() * 70 + 70;
      meteor.alpha = 1.0;
      meteor.active = true;
    };

    let meteorTimer = setInterval(triggerMeteor, 5000);

    // Mouse Tracking for Interactive Constellation Tethers
    let mouse = { x: -2000, y: -2000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Position the Sun prominently in top-left quadrant of viewport
      const sunX = Math.min(Math.max(120, width * 0.16), 240);
      const sunY = Math.min(Math.max(130, height * 0.22), 220);

      // ==========================================
      // A) RENDER THE SUN WITH PULSING CORONA FLARES
      // ==========================================
      const sunRadius = 40;
      const coronaPulse = Math.sin(time * 3.2) * 8;

      // Outer Corona Radiant Halo
      const coronaGrad = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, sunRadius * 2.6 + coronaPulse);
      coronaGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
      coronaGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.65)');
      coronaGrad.addColorStop(0.7, 'rgba(239, 68, 68, 0.3)');
      coronaGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius * 2.6 + coronaPulse, 0, Math.PI * 2);
      ctx.fillStyle = coronaGrad;
      ctx.fill();

      // Coronal Ray Flares (12 rotating solar rays)
      ctx.save();
      ctx.translate(sunX, sunY);
      ctx.rotate(time * 0.25);
      for (let r = 0; r < 12; r++) {
        const rayAngle = (r * Math.PI) / 6;
        const rayLen = sunRadius * 1.5 + Math.sin(time * 4 + r) * 12;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rayAngle) * sunRadius, Math.sin(rayAngle) * sunRadius);
        ctx.lineTo(Math.cos(rayAngle) * rayLen, Math.sin(rayAngle) * rayLen);
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.55)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }
      ctx.restore();

      // Sun Glowing Core
      ctx.beginPath();
      ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fef08a';
      ctx.shadowBlur = 35;
      ctx.shadowColor = '#f59e0b';
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sun Label Badge
      ctx.font = 'bold 11px monospace';
      ctx.fillStyle = '#fef08a';
      ctx.textAlign = 'center';
      ctx.fillText('☀️ THE SUN', sunX, sunY + sunRadius + 16);

      // ==========================================
      // B) RENDER ORBIT RINGS & PLANETS
      // ==========================================
      planets.forEach((p) => {
        p.angle += p.speed;

        // Elliptical Orbit Track
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, p.orbitR, p.orbitR * 0.68, Math.PI / 14, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Planet Coordinates along Orbit
        const px = sunX + Math.cos(p.angle) * p.orbitR;
        const py = sunY + Math.sin(p.angle) * (p.orbitR * 0.68);

        // Saturn Rings (Back half)
        if (p.hasRings) {
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 0.65, 0, Math.PI, Math.PI * 2);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
          ctx.lineWidth = 4.5;
          ctx.stroke();
          ctx.restore();
        }

        // Draw Planet Body with Glow
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Earth details & Moon
        if (p.hasMoon) {
          p.moonAngle += 0.05;
          const mx = px + Math.cos(p.moonAngle) * (p.radius + 12);
          const my = py + Math.sin(p.moonAngle) * (p.radius + 8);
          
          // Moon Orbit Trail
          ctx.beginPath();
          ctx.ellipse(px, py, p.radius + 12, p.radius + 8, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = 0.8;
          ctx.stroke();

          // Moon Body
          ctx.beginPath();
          ctx.arc(mx, my, 2.6, 0, Math.PI * 2);
          ctx.fillStyle = '#f8fafc';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffffff';
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Jupiter Storm Bands & Great Red Spot
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
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 0.65, 0, 0, Math.PI);
          ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
          ctx.lineWidth = 4.5;
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
          ctx.strokeStyle = 'rgba(45, 212, 191, 0.6)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
          ctx.restore();
        }

        // Planet Label
        ctx.font = 'bold 9px monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, px, py + p.radius + 12);
      });

      // ==========================================
      // C) RENDER STARFIELD & CONSTELLATION LINES
      // ==========================================
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.alpha += (Math.random() - 0.5) * s.twinkleSpeed;
        if (s.alpha < 0.25) s.alpha = 0.25;
        if (s.alpha > 0.95) s.alpha = 0.95;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Interactive mouse constellation tethering
        if (mouse.active) {
          const dx = mouse.x - s.x;
          const dy = mouse.y - s.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const pull = (1 - dist / 160);
            s.x += (dx / dist) * pull * 0.6;
            s.y += (dy / dist) * pull * 0.6;

            // Connect laser line to cursor
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(251, 191, 36, ${pull * 0.75})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();

            // Cursor focal starlet
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = '#fef08a';
            ctx.shadowBlur = 10;
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

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.22;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ==========================================
      // D) RENDER APOLLO ROCKET & EXHAUST
      // ==========================================
      rocket.x += rocket.vx;
      rocket.y += rocket.vy;

      if (rocket.x > width + 150 || rocket.y < -150) {
        rocket.x = -120;
        rocket.y = height * (0.6 + Math.random() * 0.3);
      }

      // Rocket flame particles
      for (let i = 0; i < 3; i++) {
        rocket.exhaustParticles.push({
          x: rocket.x - Math.cos(rocket.angle) * 22 + (Math.random() - 0.5) * 5,
          y: rocket.y - Math.sin(rocket.angle) * 22 + (Math.random() - 0.5) * 5,
          vx: -Math.cos(rocket.angle) * (Math.random() * 2.5 + 2.5),
          vy: -Math.sin(rocket.angle) * (Math.random() * 2.5 + 2.5),
          radius: Math.random() * 5 + 3,
          color: ['#ef4444', '#f97316', '#fbbf24', '#ffffff'][Math.floor(Math.random() * 4)],
          alpha: 1.0
        });
      }

      // Update & render exhaust
      rocket.exhaustParticles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.95;
        p.alpha -= 0.035;

        if (p.alpha <= 0 || p.radius <= 0.5) {
          rocket.exhaustParticles.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // Draw Apollo Rocket Body
      ctx.save();
      ctx.translate(rocket.x, rocket.y);
      ctx.rotate(rocket.angle);

      // Rocket Fuselage
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(-12, -7);
      ctx.lineTo(-16, -11);
      ctx.lineTo(-14, 0);
      ctx.lineTo(-16, 11);
      ctx.lineTo(-12, 7);
      ctx.closePath();
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.6;
      ctx.fill();
      ctx.stroke();

      // Red Tip Nose Cone
      ctx.beginPath();
      ctx.moveTo(22, 0);
      ctx.lineTo(10, -4);
      ctx.lineTo(10, 4);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // Porthole Window
      ctx.beginPath();
      ctx.arc(2, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      ctx.restore();

      // ==========================================
      // E) RENDER SCI-FI SPACESHIP & ION THRUSTER
      // ==========================================
      spaceship.x += spaceship.vx;
      spaceship.y += spaceship.vy;

      if (spaceship.x < -150 || spaceship.y > height + 150) {
        spaceship.x = width + 120;
        spaceship.y = height * (0.2 + Math.random() * 0.3);
      }

      // Ion Thruster Trail Particles
      for (let i = 0; i < 2; i++) {
        spaceship.trailParticles.push({
          x: spaceship.x - Math.cos(spaceship.angle) * 18,
          y: spaceship.y - Math.sin(spaceship.angle) * 18,
          vx: -Math.cos(spaceship.angle) * (Math.random() * 2 + 2),
          vy: -Math.sin(spaceship.angle) * (Math.random() * 2 + 2),
          radius: Math.random() * 4 + 2,
          color: ['#38bdf8', '#818cf8', '#a855f7', '#ffffff'][Math.floor(Math.random() * 4)],
          alpha: 0.9
        });
      }

      // Update & render ion trail
      spaceship.trailParticles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.radius *= 0.94;
        p.alpha -= 0.03;

        if (p.alpha <= 0 || p.radius <= 0.5) {
          spaceship.trailParticles.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // Draw Spaceship Body
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
          ctx.lineWidth = 2.4;
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
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-90"
      style={{ background: 'transparent' }}
    />
  );
}

export default VfxSolarSystemGalaxy;
