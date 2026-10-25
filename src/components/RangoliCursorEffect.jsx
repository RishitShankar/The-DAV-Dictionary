import React, { useEffect, useRef } from 'react';

// Authentic vibrant Rangoli festival color palette (Gulal, Haldi, Kumkum, Peacock, Emerald, Indigo)
const RANGOLI_PALETTE = [
  '#FF1493', // Deep Gulal Pink
  '#FF4081', // Rose Pink
  '#FF5722', // Deep Kumkum Vermilion
  '#FF9100', // Saffron Orange
  '#FFD700', // Marigold / Turmeric Gold
  '#FFEB3B', // Bright Haldi Yellow
  '#00E676', // Emerald Green
  '#1DE9B6', // Mint Peacock Green
  '#00E5FF', // Peacock Turquoise
  '#2979FF', // Royal Blue
  '#7C4DFF', // Indigo Violet
  '#D500F9', // Radiant Magenta
  '#FFFFFF'  // White Rangoli Base Powder
];

export function RangoliCursorEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const maxParticles = 200;

    // Track mouse position
    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      lastX: window.innerWidth / 2,
      lastY: window.innerHeight / 2,
      hasMoved: false
    };

    let colorIndex = 0;
    const getNextColor = () => {
      const c = RANGOLI_PALETTE[colorIndex % RANGOLI_PALETTE.length];
      colorIndex++;
      return c;
    };

    // Resize canvas
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle Class representing a Rangoli powder grain / speck / spark
    class RangoliParticle {
      constructor(x, y, vx, vy, color, size, isSparkle = false) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.originalSize = size;
        this.size = size;
        this.life = 1.0;
        // Fade rate: alive for ~0.8 to 1.4 seconds
        this.decay = 0.015 + Math.random() * 0.02;
        this.isSparkle = isSparkle;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Slight air resistance
        this.vx *= 0.96;
        this.vy *= 0.96;
        // Subtle gravity / drift
        this.vy += 0.04;
        this.life -= this.decay;
        this.size = Math.max(0, this.originalSize * (this.life ** 0.8));
        this.rotation += this.rotationSpeed;
      }

      draw(c) {
        if (this.life <= 0 || this.size <= 0) return;
        c.save();
        c.globalAlpha = Math.max(0, Math.min(1, this.life));
        c.translate(this.x, this.y);
        c.rotate(this.rotation);

        if (this.isSparkle) {
          // Rangoli 4-point glitter star
          c.fillStyle = this.color;
          c.shadowColor = 'transparent';
          c.shadowBlur = 0;
          c.beginPath();
          const s = this.size * 1.5;
          c.moveTo(0, -s);
          c.quadraticCurveTo(0, 0, s, 0);
          c.quadraticCurveTo(0, 0, 0, s);
          c.quadraticCurveTo(0, 0, -s, 0);
          c.quadraticCurveTo(0, 0, 0, -s);
          c.fill();
        } else {
          // Soft glowing powder grain
          c.fillStyle = this.color;
          c.shadowColor = 'transparent';
          c.shadowBlur = 0;
          c.beginPath();
          c.arc(0, 0, this.size, 0, Math.PI * 2);
          c.fill();
        }

        c.restore();
      }
    }

    // Add particles at (x, y)
    const addRangoliBurst = (x, y, count = 3, spread = 2.5, isScroll = false) => {
      for (let i = 0; i < count; i++) {
        if (particles.length >= maxParticles) {
          particles.shift(); // Remove oldest to keep 60fps smooth
        }
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.5 + Math.random() * spread);
        const vx = Math.cos(angle) * speed;
        // If scrolling, add vertical bias
        const vy = Math.sin(angle) * speed + (isScroll ? (Math.random() - 0.5) * 2 : 0);
        const color = getNextColor();
        const size = 3 + Math.random() * 4.5;
        const isSparkle = Math.random() < 0.25; // 25% are Rangoli glitter sparkles

        particles.push(new RangoliParticle(x, y, vx, vy, color, size, isSparkle));
      }
    };

    // Mouse Move Listener
    const handleMouseMove = (e) => {
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.hasMoved = true;

      // Distance moved
      const dx = mouse.x - mouse.lastX;
      const dy = mouse.y - mouse.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Add particles proportional to movement
      const count = Math.min(6, Math.max(2, Math.floor(dist / 6)));
      addRangoliBurst(mouse.x, mouse.y, count, 2.8);
    };

    // Scroll Listener: emits glowing Rangoli dust waves when scrolling
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Use current mouse position or center of screen
      const x = mouse.hasMoved ? mouse.x : window.innerWidth / 2;
      const y = mouse.hasMoved ? mouse.y : window.innerHeight / 2;

      // Emit vibrant Rangoli powder on scroll
      const particleCount = Math.min(8, Math.max(3, Math.floor(Math.abs(delta) / 10) + 2));
      addRangoliBurst(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, particleCount, 3.5, true);

      // Also add tiny side-dust specks near cursor
      for (let j = 0; j < 2; j++) {
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 40;
        addRangoliBurst(x + offsetX, y + offsetY, 2, 2, true);
      }
    };

    // Wheel listener for direct trackpad / wheel responsiveness
    const handleWheel = (e) => {
      if (mouse.hasMoved) {
        addRangoliBurst(mouse.x, mouse.y, 4, 3.2, true);
      }
    };

    // Click / Tap: Festive Rangoli Mandala Flower Splash
    const handleClick = (e) => {
      const clickX = e.clientX || mouse.x;
      const clickY = e.clientY || mouse.y;

      // 8-petal symmetrical Rangoli burst
      const petals = 12;
      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2;
        const color = RANGOLI_PALETTE[i % RANGOLI_PALETTE.length];
        
        // Inner petal particle
        const vx1 = Math.cos(angle) * 3.5;
        const vy1 = Math.sin(angle) * 3.5;
        particles.push(new RangoliParticle(clickX, clickY, vx1, vy1, color, 5, false));

        // Outer sparkle petal
        const vx2 = Math.cos(angle) * 5.5;
        const vy2 = Math.sin(angle) * 5.5;
        particles.push(new RangoliParticle(clickX, clickY, vx2, vy2, color, 4, true));
      }
    };

    // Touch support for mobile devices
    const handleTouchMove = (e) => {
      if (!e.touches || e.touches.length === 0) return;
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.hasMoved = true;
      addRangoliBurst(mouse.x, mouse.y, 3, 2.5);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Main Animation Render Loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update and draw each Rangoli particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0 || p.size <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}

export default RangoliCursorEffect;
