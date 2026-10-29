import React, { useEffect, useRef, useState } from 'react';
import { CloudRain, Sun, Snowflake, Wind, Power, RotateCcw } from 'lucide-react';

/**
 * VfxWeatherAtmosphere - Adaptive Weather Atmosphere VFX
 * Embedded in Section 7, Subsection 3 (Weather of your Area)
 * 
 * Auto-detects:
 * - Rain (streaks, droplet ripples, lightning)
 * - Sunny (solar rays, brightness, lens flare)
 * - Snow (falling drifting snowflakes)
 * - Windy (sweeping wind streamlines, fluttering leaves)
 * 
 * Runs for 12 seconds automatically, with an on-screen Turn Off / Replay toggle button.
 */
export function VfxWeatherAtmosphere({ weatherCode = 0, windSpeed = 8, cityName = 'Patna' }) {
  const [isActive, setIsActive] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(12);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);

  // Determine weather category from Open-Meteo code & wind speed
  const getWeatherType = () => {
    const code = Number(weatherCode) || 0;
    const wind = Number(windSpeed) || 0;

    // Snow codes
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
      return 'snow';
    }
    // Rain codes
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99)) {
      return 'rain';
    }
    // Windy codes or high wind speed
    if (wind >= 18 || code === 3 || code === 45 || code === 48) {
      return 'windy';
    }
    // Default: Sunny / Clear Sky
    return 'sunny';
  };

  const weatherType = getWeatherType();

  // Reset timer whenever city or weather code changes
  useEffect(() => {
    setIsActive(true);
    setSecondsRemaining(12);
    startTimeRef.current = performance.now();
  }, [weatherCode, cityName]);

  // 12-second countdown timer
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // 60 FPS Canvas Weather Simulation
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 380);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || 380;
    };
    window.addEventListener('resize', handleResize);

    // Weather Particles Pool
    const rainDrops = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 25 + 20,
      speed: Math.random() * 12 + 16,
      opacity: Math.random() * 0.4 + 0.4
    }));

    const ripples = [];

    const snowFlakes = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3.5 + 1.5,
      speedY: Math.random() * 1.5 + 1.0,
      speedX: (Math.random() - 0.5) * 0.8,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      opacity: Math.random() * 0.5 + 0.5
    }));

    const windLines = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 100 + 80,
      speed: Math.random() * 10 + 12,
      opacity: Math.random() * 0.35 + 0.25
    }));

    const leaves = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 8,
      speedX: Math.random() * 4 + 3,
      speedY: (Math.random() - 0.5) * 2,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      color: ['#ea580c', '#f59e0b', '#84cc16', '#ca8a04'][Math.floor(Math.random() * 4)]
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // ----------------------------------------
      // 1. RAIN ANIMATION
      // ----------------------------------------
      if (weatherType === 'rain') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.65)';
        ctx.lineWidth = 1.6;

        rainDrops.forEach((d) => {
          d.y += d.speed;
          d.x += 1.8; // slant

          if (d.y > height) {
            d.y = -10;
            d.x = Math.random() * width;
            if (ripples.length < 25) {
              ripples.push({ x: d.x, y: height - 10, r: 2, alpha: 0.7 });
            }
          }

          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + 4, d.y + d.length);
          ctx.stroke();
        });

        // Water Splash Ripples
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rip = ripples[i];
          rip.r += 0.8;
          rip.alpha -= 0.03;
          if (rip.alpha <= 0) {
            ripples.splice(i, 1);
          } else {
            ctx.beginPath();
            ctx.ellipse(rip.x, rip.y, rip.r * 2, rip.r, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(186, 230, 253, ${rip.alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // ----------------------------------------
      // 2. SUNNY ANIMATION
      // ----------------------------------------
      else if (weatherType === 'sunny') {
        const sunX = width - 80;
        const sunY = 70;
        const sunRadius = 45;

        // Rotating Sunbeams
        ctx.save();
        ctx.translate(sunX, sunY);
        ctx.rotate(time * 0.2);

        for (let i = 0; i < 14; i++) {
          const angle = (i * Math.PI) / 7;
          const rayLen = 140 + Math.sin(time * 3 + i) * 20;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * (sunRadius + 10), Math.sin(angle) * (sunRadius + 10));
          ctx.lineTo(Math.cos(angle) * rayLen, Math.sin(angle) * rayLen);
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        ctx.restore();

        // Pulsing Solar Flare
        const corona = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 160);
        corona.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
        corona.addColorStop(0.4, 'rgba(251, 191, 36, 0.45)');
        corona.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
        ctx.fillStyle = corona;
        ctx.fill();

        // Golden Sun Disk
        ctx.beginPath();
        ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#fef08a';
        ctx.shadowBlur = 30;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ----------------------------------------
      // 3. SNOW ANIMATION
      // ----------------------------------------
      else if (weatherType === 'snow') {
        snowFlakes.forEach((f) => {
          f.wobble += f.wobbleSpeed;
          f.y += f.speedY;
          f.x += f.speedX + Math.sin(f.wobble) * 0.8;

          if (f.y > height) {
            f.y = -10;
            f.x = Math.random() * width;
          }
          if (f.x > width) f.x = 0;
          if (f.x < 0) f.x = width;

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#bae6fd';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      // ----------------------------------------
      // 4. WINDY ANIMATION
      // ----------------------------------------
      else if (weatherType === 'windy') {
        ctx.strokeStyle = 'rgba(224, 242, 254, 0.35)';
        ctx.lineWidth = 2;

        windLines.forEach((w) => {
          w.x += w.speed;
          if (w.x > width + 100) {
            w.x = -120;
            w.y = Math.random() * height;
          }

          ctx.beginPath();
          ctx.moveTo(w.x, w.y);
          ctx.lineTo(w.x + w.length, w.y + Math.sin(w.x * 0.02) * 8);
          ctx.stroke();
        });

        // Floating leaves
        leaves.forEach((l) => {
          l.x += l.speedX;
          l.y += l.speedY;
          l.angle += l.rotationSpeed;

          if (l.x > width + 40) {
            l.x = -30;
            l.y = Math.random() * height;
          }

          ctx.save();
          ctx.translate(l.x, l.y);
          ctx.rotate(l.angle);
          ctx.beginPath();
          ctx.ellipse(0, 0, l.size, l.size * 0.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = l.color;
          ctx.fill();
          ctx.restore();
        });
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, weatherType]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl">
      {/* 60 FPS Atmospheric Canvas */}
      {isActive && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
        />
      )}

      {/* Floating Control Toolbar (Auto 12s + Turn Off / Replay Option) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/70 border border-white/20 text-xs font-bold text-white backdrop-blur-md shadow-md">
          {weatherType === 'rain' && <CloudRain className="w-3.5 h-3.5 text-cyan-300 animate-bounce" />}
          {weatherType === 'sunny' && <Sun className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
          {weatherType === 'snow' && <Snowflake className="w-3.5 h-3.5 text-blue-200 animate-spin" />}
          {weatherType === 'windy' && <Wind className="w-3.5 h-3.5 text-teal-200 animate-pulse" />}
          
          <span className="capitalize">{weatherType} VFX</span>
          {isActive ? (
            <span className="text-[11px] font-mono text-cyan-300">({secondsRemaining}s)</span>
          ) : (
            <span className="text-[11px] text-stone-400">(Off)</span>
          )}
        </div>

        {/* Turn Off / Replay Toggle Button */}
        <button
          type="button"
          onClick={() => {
            if (isActive) {
              setIsActive(false);
            } else {
              setIsActive(true);
              setSecondsRemaining(12);
              startTimeRef.current = performance.now();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer backdrop-blur-md shadow-md border ${
            isActive
              ? 'bg-red-500/80 hover:bg-red-600 text-white border-red-400/50'
              : 'bg-emerald-500/80 hover:bg-emerald-600 text-white border-emerald-400/50'
          }`}
          title={isActive ? 'Turn Off Animation' : 'Replay Weather Animation'}
        >
          {isActive ? (
            <>
              <Power className="w-3 h-3" />
              <span>Turn Off</span>
            </>
          ) : (
            <>
              <RotateCcw className="w-3 h-3" />
              <span>Replay (12s)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default VfxWeatherAtmosphere;
