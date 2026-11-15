import React, { useState, useEffect, useRef } from 'react';
import {
  Atom, Zap, Eye, Waves, Play, Pause, RotateCcw, Volume2,
  VolumeX, Sliders, CheckCircle2, Sparkles, Award, ArrowRight,
  FlaskConical, Compass, Activity, ShieldCheck, Info
} from 'lucide-react';

export function VirtualScienceLabSuite({ onClose }) {
  // Active Lab Experiment: 'circuits' | 'optics' | 'titration' | 'acoustics'
  const [activeExp, setActiveExp] = useState('circuits');

  // -------------------------------------------------------------
  // EXPERIMENT 1: OHM'S LAW & CIRCUIT SIMULATOR
  // -------------------------------------------------------------
  const [voltage, setVoltage] = useState(12); // Volts (1 to 24)
  const [resistance, setResistance] = useState(10); // Ohms (1 to 50)
  const [isCircuitClosed, setIsCircuitClosed] = useState(true);
  const circuitCanvasRef = useRef(null);

  const current = isCircuitClosed ? +(voltage / resistance).toFixed(2) : 0;
  const power = isCircuitClosed ? +(voltage * current).toFixed(1) : 0;

  // Circuit Canvas Rendering
  useEffect(() => {
    if (activeExp !== 'circuits') return;
    const canvas = circuitCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let electronOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Circuit wire rectangle
      const padX = 60;
      const padY = 50;
      ctx.lineWidth = 4;
      ctx.strokeStyle = isCircuitClosed ? '#38bdf8' : '#475569';
      ctx.strokeRect(padX, padY, w - padX * 2, h - padY * 2);

      // Battery on Left Wire
      const batY = h / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(padX - 10, batY - 25, 20, 50);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(padX - 15, batY - 18, 30, 4);
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(padX - 8, batY + 14, 16, 4);

      // Battery Text
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${voltage}V DC`, padX - 45, batY + 4);

      // Switch on Top Wire
      const swX = w / 2 - 30;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(swX - 10, padY - 10, 80, 20);
      ctx.beginPath();
      ctx.arc(swX, padY, 4, 0, Math.PI * 2);
      ctx.arc(swX + 40, padY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      // Switch contact arm
      ctx.beginPath();
      ctx.moveTo(swX, padY);
      if (isCircuitClosed) {
        ctx.lineTo(swX + 40, padY);
      } else {
        ctx.lineTo(swX + 35, padY - 22);
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#e2e8f0';
      ctx.stroke();

      // Light Bulb on Right Wire
      const bulbY = h / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(w - padX - 12, bulbY - 30, 24, 60);

      // Bulb Glass
      ctx.beginPath();
      ctx.arc(w - padX, bulbY - 8, 16, 0, Math.PI * 2);
      const glowAlpha = isCircuitClosed ? Math.min(1, power / 40) : 0.05;
      ctx.fillStyle = `rgba(250, 204, 21, ${glowAlpha})`;
      ctx.fill();
      ctx.strokeStyle = isCircuitClosed ? '#facc15' : '#64748b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Bulb Glow Aura
      if (isCircuitClosed && power > 0) {
        const radGrad = ctx.createRadialGradient(w - padX, bulbY - 8, 4, w - padX, bulbY - 8, 45);
        radGrad.addColorStop(0, `rgba(253, 224, 71, ${glowAlpha * 0.8})`);
        radGrad.addColorStop(1, 'rgba(253, 224, 71, 0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(w - padX, bulbY - 8, 45, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bulb Text
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${power}W Load`, w - padX - 25, bulbY + 35);

      // Resistor on Bottom Wire
      const resX = w / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(resX - 40, h - padY - 12, 80, 24);
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.strokeRect(resX - 40, h - padY - 12, 80, 24);

      // Color bands
      ctx.fillStyle = '#ef4444'; ctx.fillRect(resX - 25, h - padY - 10, 4, 20);
      ctx.fillStyle = '#eab308'; ctx.fillRect(resX - 10, h - padY - 10, 4, 20);
      ctx.fillStyle = '#3b82f6'; ctx.fillRect(resX + 5, h - padY - 10, 4, 20);
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(resX + 20, h - padY - 10, 4, 20);

      ctx.fillStyle = '#c084fc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${resistance} Ω`, resX - 12, h - padY + 28);

      // Moving Electrons when closed
      if (isCircuitClosed && current > 0) {
        electronOffset = (electronOffset + current * 0.7) % 30;
        ctx.fillStyle = '#38bdf8';
        const perimeter = 2 * (w - padX * 2 + h - padY * 2);
        const numElectrons = 24;

        for (let i = 0; i < numElectrons; i++) {
          const dist = (i * (perimeter / numElectrons) + electronOffset * 5) % perimeter;
          let ex = 0, ey = 0;
          const topW = w - padX * 2;
          const rightH = h - padY * 2;
          const botW = topW;

          if (dist < topW) {
            ex = padX + dist;
            ey = padY;
          } else if (dist < topW + rightH) {
            ex = w - padX;
            ey = padY + (dist - topW);
          } else if (dist < topW + rightH + botW) {
            ex = (w - padX) - (dist - topW - rightH);
            ey = h - padY;
          } else {
            ex = padX;
            ey = (h - padY) - (dist - topW - rightH - botW);
          }

          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeExp, voltage, resistance, isCircuitClosed, current, power]);

  // -------------------------------------------------------------
  // EXPERIMENT 2: RAY OPTICS BENCH
  // -------------------------------------------------------------
  const [lensType, setLensType] = useState('convex'); // 'convex' | 'concave'
  const [focalLength, setFocalLength] = useState(25); // cm
  const [objectDist, setObjectDist] = useState(45); // cm (u)
  const [objectHeight, setObjectHeight] = useState(15); // cm (ho)
  const opticsCanvasRef = useRef(null);

  // Optics Calculations: 1/f = 1/v - 1/u (Cartesian: u is negative)
  // For convex lens: f > 0, u = -objectDist
  // 1/v = 1/f + 1/u
  const u_signed = -objectDist;
  const f_signed = lensType === 'convex' ? focalLength : -focalLength;
  const invV = (1 / f_signed) + (1 / u_signed);
  const imageDist = Math.abs(invV) > 0.0001 ? +(1 / invV).toFixed(1) : 9999;
  const magnification = +(imageDist / u_signed).toFixed(2);
  const imageHeight = +(magnification * objectHeight).toFixed(1);

  useEffect(() => {
    if (activeExp !== 'optics') return;
    const canvas = opticsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const midX = w / 2;
    const midY = h / 2;
    const scale = 2.8; // px per cm

    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Principal Axis
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(w, midY);
    ctx.stroke();

    // Optical Center O
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('O (0,0)', midX - 18, midY + 16);

    // Foci Markers (F1, 2F1 on left, F2, 2F2 on right)
    const fPx = focalLength * scale;
    const foci = [
      { x: midX - fPx, label: lensType === 'convex' ? 'F₁' : 'F₂' },
      { x: midX - fPx * 2, label: lensType === 'convex' ? '2F₁' : '2F₂' },
      { x: midX + fPx, label: lensType === 'convex' ? 'F₂' : 'F₁' },
      { x: midX + fPx * 2, label: lensType === 'convex' ? '2F₂' : '2F₁' }
    ];

    foci.forEach(f => {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(f.x, midY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f87171';
      ctx.fillText(f.label, f.x - 6, midY + 16);
    });

    // Lens Drawing at midX
    ctx.strokeStyle = '#38bdf8';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (lensType === 'convex') {
      ctx.ellipse(midX, midY, 14, h * 0.4, 0, 0, Math.PI * 2);
    } else {
      ctx.moveTo(midX - 10, midY - h * 0.4);
      ctx.lineTo(midX + 10, midY - h * 0.4);
      ctx.quadraticCurveTo(midX, midY, midX + 10, midY + h * 0.4);
      ctx.lineTo(midX - 10, midY + h * 0.4);
      ctx.quadraticCurveTo(midX, midY, midX - 10, midY - h * 0.4);
    }
    ctx.fill();
    ctx.stroke();

    // Object (Candle Arrow) on Left
    const objX = midX - objectDist * scale;
    const objH_px = objectHeight * scale;
    const objTopY = midY - objH_px;

    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(objX, midY);
    ctx.lineTo(objX, objTopY);
    ctx.stroke();

    // Candle Flame
    ctx.fillStyle = '#f97316';
    ctx.beginPath();
    ctx.arc(objX, objTopY - 4, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`Object (h=${objectHeight}cm)`, objX - 45, objTopY - 12);

    // Image Arrow
    const imgX = midX + imageDist * scale;
    const imgH_px = Math.abs(imageHeight) * scale;
    const imgY = imageHeight < 0 ? midY + imgH_px : midY - imgH_px;

    if (Math.abs(imageDist) < 250) {
      ctx.strokeStyle = imageHeight < 0 ? '#34d399' : '#a855f7';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(imgX, midY);
      ctx.lineTo(imgX, imgY);
      ctx.stroke();

      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(
        `Image (${imageDist > 0 ? 'Real' : 'Virtual'}, v=${imageDist}cm)`,
        imgX - 30,
        imageHeight < 0 ? imgY + 16 : imgY - 12
      );

      // Light Rays
      // Ray 1: Parallel to axis -> Through Focus F2
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(midX, objTopY);
      ctx.lineTo(imgX, imgY);
      ctx.stroke();

      // Ray 2: Through Optical Centre O
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(objX, objTopY);
      ctx.lineTo(midX, midY);
      ctx.lineTo(imgX, imgY);
      ctx.stroke();
    }
  }, [activeExp, lensType, focalLength, objectDist, objectHeight, imageDist, imageHeight]);

  // -------------------------------------------------------------
  // EXPERIMENT 3: ACID-BASE TITRATION & PH COLORIMETER
  // -------------------------------------------------------------
  const [acidAddedMl, setAcidAddedMl] = useState(0); // 0 to 50 mL HCl added
  const [isTitratingAuto, setIsTitratingAuto] = useState(false);

  // Initial flask: 25mL of 0.1M NaOH
  // Neutralization at 25mL HCl
  const calculatePH = (volAdded) => {
    const vBase = 25; // mL
    const mBase = 0.1; // M
    const mAcid = 0.1; // M
    const molBase = (vBase * mBase) / 1000;
    const molAcid = (volAdded * mAcid) / 1000;
    const totalVolL = (vBase + volAdded) / 1000;

    if (volAdded === vBase) return 7.0; // Perfect neutral point
    if (volAdded < vBase) {
      const excessOH = (molBase - molAcid) / totalVolL;
      const pOH = -Math.log10(Math.max(1e-14, excessOH));
      return +(14 - pOH).toFixed(2);
    } else {
      const excessH = (molAcid - molBase) / totalVolL;
      const pH = -Math.log10(Math.max(1e-14, excessH));
      return +Math.max(1, pH).toFixed(2);
    }
  };

  const currentPH = calculatePH(acidAddedMl);

  // Universal indicator color lookup based on pH
  const getPHColor = (ph) => {
    if (ph >= 13) return { bg: '#3b0764', text: '#d8b4fe', name: 'Deep Violet (Strong Alkali)' };
    if (ph >= 11) return { bg: '#1e1b4b', text: '#a5b4fc', name: 'Purple-Indigo' };
    if (ph >= 9) return { bg: '#064e3b', text: '#6ee7b7', name: 'Blue-Green (Weak Alkali)' };
    if (ph >= 6.8 && ph <= 7.2) return { bg: '#047857', text: '#34d399', name: 'Emerald Green (Neutral pH 7)' };
    if (ph >= 5) return { bg: '#ca8a04', text: '#fde047', name: 'Yellow (Weak Acid)' };
    if (ph >= 3) return { bg: '#c2410c', text: '#fdba74', name: 'Orange' };
    return { bg: '#991b1b', text: '#fca5a5', name: 'Ruby Red (Strong Acid)' };
  };

  const phStyle = getPHColor(currentPH);

  useEffect(() => {
    let interval = null;
    if (isTitratingAuto) {
      interval = setInterval(() => {
        setAcidAddedMl(prev => {
          if (prev >= 45) {
            setIsTitratingAuto(false);
            return 45;
          }
          return prev + 1;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isTitratingAuto]);

  // -------------------------------------------------------------
  // EXPERIMENT 4: ACOUSTIC OSCILLOSCOPE & SOUND FREQUENCY
  // -------------------------------------------------------------
  const [audioFreq, setAudioFreq] = useState(440); // A4 440Hz
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [selectedMedium, setSelectedMedium] = useState('air');
  const scopeCanvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscNodeRef = useRef(null);

  const mediumSpeeds = {
    air: { name: 'Air (20°C)', speed: 343 },
    water: { name: 'Distilled Water', speed: 1482 },
    steel: { name: 'Structural Steel', speed: 5960 }
  };

  const waveSpeed = mediumSpeeds[selectedMedium].speed;
  const wavelengthMeters = +(waveSpeed / audioFreq).toFixed(3);
  const timePeriodMs = +(1000 / audioFreq).toFixed(2);

  // Toggle Live Audio
  const toggleOscillator = () => {
    if (isSoundPlaying) {
      if (oscNodeRef.current) {
        oscNodeRef.current.stop();
        oscNodeRef.current.disconnect();
        oscNodeRef.current = null;
      }
      setIsSoundPlaying(false);
    } else {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current) {
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(audioFreq, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.12, audioCtxRef.current.currentTime);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscNodeRef.current = osc;
        setIsSoundPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (oscNodeRef.current && audioCtxRef.current) {
      oscNodeRef.current.frequency.setTargetAtTime(audioFreq, audioCtxRef.current.currentTime, 0.05);
    }
  }, [audioFreq]);

  // Cleanup audio on unmount or tab switch
  useEffect(() => {
    return () => {
      if (oscNodeRef.current) {
        try { oscNodeRef.current.stop(); } catch (e) {}
      }
    };
  }, [activeExp]);

  // Oscilloscope Animation
  useEffect(() => {
    if (activeExp !== 'acoustics') return;
    const canvas = scopeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Draw Grid lines
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      // Oscilloscope Sine Wave
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();

      const waveCycles = (audioFreq / 100);
      const amplitude = h * 0.35;

      for (let x = 0; x < w; x++) {
        const rad = (x / w) * Math.PI * 2 * waveCycles + phase;
        const y = midY + Math.sin(rad) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += (audioFreq / 1500) * 0.4;
      frameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameId);
  }, [activeExp, audioFreq]);

  return (
    <div className="w-full space-y-6">
      {/* Top Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-slate-900 to-indigo-950 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            DAV Science &amp; Technology Lab
          </span>
          <h2 className="text-2xl font-black text-white mt-2 flex items-center gap-2">
            <Atom className="w-6 h-6 text-amber-400 animate-spin" />
            <span>Interactive Virtual Science &amp; Physics Laboratory</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time HTML5 physics simulations, ray optics tracer, chemical titration colorimeter &amp; Web Audio oscilloscope.
          </p>
        </div>

        {/* Experiment Switcher Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'circuits', label: "Ohm's Law & Circuit Lab", icon: Zap, color: 'hover:border-amber-400' },
            { id: 'optics', label: 'Ray Optics Bench', icon: Eye, color: 'hover:border-sky-400' },
            { id: 'titration', label: 'Acid-Base Titration', icon: FlaskConical, color: 'hover:border-rose-400' },
            { id: 'acoustics', label: 'Sound Waves Studio', icon: Waves, color: 'hover:border-emerald-400' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeExp === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveExp(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-2 ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-950 font-black'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 ' + tab.color
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXPERIMENT 1: OHM'S LAW & CIRCUITS                            */}
      {/* ------------------------------------------------------------- */}
      {activeExp === 'circuits' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Canvas Display */}
          <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Live Interactive Circuit Canvas</span>
              </span>
              <span className="font-mono text-sky-400">
                {isCircuitClosed ? 'Circuit Closed • Current Flowing' : 'Circuit Open • 0 A'}
              </span>
            </div>

            <canvas
              ref={circuitCanvasRef}
              width={640}
              height={360}
              className="w-full h-[360px] rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner"
            />
          </div>

          {/* Controls & Math Output */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-amber-400">
                Circuit Parameter Controls
              </h3>

              {/* Voltage Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Battery Potential (V)</span>
                  <span className="font-mono text-amber-400">{voltage} V</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={voltage}
                  onChange={(e) => setVoltage(+e.target.value)}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Resistance Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Resistance (R)</span>
                  <span className="font-mono text-purple-400">{resistance} Ω</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={resistance}
                  onChange={(e) => setResistance(+e.target.value)}
                  className="w-full accent-purple-500"
                />
              </div>

              {/* Switch Toggle */}
              <button
                onClick={() => setIsCircuitClosed(!isCircuitClosed)}
                className={`w-full py-3 rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 ${
                  isCircuitClosed
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950'
                }`}
              >
                <span>{isCircuitClosed ? 'Open Circuit (Switch OFF)' : 'Close Circuit (Switch ON)'}</span>
              </button>
            </div>

            {/* Calculations Card */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Ohm's Law Real-Time Readings
              </span>
              <div className="flex justify-between">
                <span className="text-slate-400">Current (I = V/R):</span>
                <span className="font-mono font-bold text-sky-400">{current} Amperes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Power Dissipated (P = VI):</span>
                <span className="font-mono font-bold text-amber-400">{power} Watts</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-900">
                Formula: V = I × R (Directly verified by DAV Board Experiments)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPERIMENT 2: RAY OPTICS BENCH                                */}
      {/* ------------------------------------------------------------- */}
      {activeExp === 'optics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-sky-400" />
                <span>Ray Optics Bench &amp; Image Formation</span>
              </span>
              <span className="font-mono text-emerald-400">
                {imageDist > 0 ? 'Real & Inverted Image' : 'Virtual & Erect Image'}
              </span>
            </div>

            <canvas
              ref={opticsCanvasRef}
              width={640}
              height={360}
              className="w-full h-[360px] rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner"
            />
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-sky-400">
                Lens &amp; Object Parameters
              </h3>

              {/* Lens Type */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLensType('convex')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    lensType === 'convex' ? 'bg-sky-500 text-stone-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Convex Lens
                </button>
                <button
                  onClick={() => setLensType('concave')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    lensType === 'concave' ? 'bg-sky-500 text-stone-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Concave Lens
                </button>
              </div>

              {/* Focal Length */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Focal Length (f)</span>
                  <span className="font-mono text-sky-400">{focalLength} cm</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="40"
                  value={focalLength}
                  onChange={(e) => setFocalLength(+e.target.value)}
                  className="w-full accent-sky-500"
                />
              </div>

              {/* Object Distance */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Object Distance (u)</span>
                  <span className="font-mono text-amber-400">{objectDist} cm</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="100"
                  value={objectDist}
                  onChange={(e) => setObjectDist(+e.target.value)}
                  className="w-full accent-amber-500"
                />
              </div>

              {/* Object Height */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Object Height (ho)</span>
                  <span className="font-mono text-rose-400">{objectHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={objectHeight}
                  onChange={(e) => setObjectHeight(+e.target.value)}
                  className="w-full accent-rose-500"
                />
              </div>
            </div>

            {/* Optics Math Results */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Derived Lens Formula (1/f = 1/v - 1/u)
              </span>
              <div className="flex justify-between">
                <span className="text-slate-400">Image Distance (v):</span>
                <span className="font-mono font-bold text-emerald-400">{imageDist} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Magnification (m = v/u):</span>
                <span className="font-mono font-bold text-purple-400">{magnification}×</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Image Height (hi):</span>
                <span className="font-mono font-bold text-cyan-400">{imageHeight} cm</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPERIMENT 3: ACID-BASE TITRATION                             */}
      {/* ------------------------------------------------------------- */}
      {activeExp === 'titration' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Beaker & Flask Visualizer */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 flex flex-col items-center justify-center min-h-[380px] relative">
            <div className="w-full flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Burette: 0.1 M HCl • Conical Flask: 25 mL 0.1 M NaOH</span>
              <span className="text-amber-400">Universal Indicator Color Scale</span>
            </div>

            {/* Chemical Flask Graphics */}
            <div className="relative flex flex-col items-center">
              {/* Burette Tip */}
              <div className="w-3 h-16 bg-slate-700 rounded-t relative">
                <div
                  className="w-1.5 h-1.5 rounded-full bg-rose-400 mx-auto animate-ping"
                  style={{ animationDuration: '0.8s' }}
                />
              </div>

              {/* Conical Flask */}
              <div
                className="w-48 h-56 rounded-b-[48px] border-4 border-slate-600 transition-colors duration-500 flex flex-col justify-end p-4 shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: phStyle.bg }}
              >
                {/* Meniscus wave */}
                <div className="absolute inset-x-0 bottom-0 h-36 opacity-90 transition-all duration-300 flex items-center justify-center">
                  <div className="text-center font-black" style={{ color: phStyle.text }}>
                    <div className="text-4xl font-mono">{currentPH}</div>
                    <div className="text-xs uppercase tracking-wider font-sans mt-1">pH Level</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-bold" style={{ color: phStyle.text }}>
              Current Solution State: {phStyle.name}
            </div>
          </div>

          {/* Controls & Titration Curve */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-rose-400">
                Titration Burette Dispenser
              </h3>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                <div>Acid Added: <strong className="text-rose-400 font-mono">{acidAddedMl} mL</strong> / 50 mL</div>
                <div>Equivalence Point: <strong className="text-emerald-400 font-mono">25.0 mL</strong></div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setAcidAddedMl(prev => Math.min(50, prev + 1))}
                  className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 font-black text-xs text-white shadow-md"
                >
                  +1 mL Drop HCl
                </button>
                <button
                  onClick={() => setIsTitratingAuto(!isTitratingAuto)}
                  className={`flex-1 py-3 rounded-xl font-black text-xs text-white shadow-md ${
                    isTitratingAuto ? 'bg-amber-600 hover:bg-amber-500' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {isTitratingAuto ? 'Pause Dispenser' : 'Auto Titrate ⚡'}
                </button>
              </div>

              <button
                onClick={() => {
                  setAcidAddedMl(0);
                  setIsTitratingAuto(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-400 hover:text-white"
              >
                Reset Flask to Pure Base
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                Chemical Neutralization Reaction
              </span>
              <p className="font-mono text-emerald-300 font-bold">
                NaOH (aq) + HCl (aq) → NaCl (aq) + H₂O (l)
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                At pH 7, hydronium and hydroxide ions achieve complete dynamic stoichiometric equilibrium.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXPERIMENT 4: ACOUSTICS & OSCILLOSCOPE                        */}
      {/* ------------------------------------------------------------- */}
      {activeExp === 'acoustics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          <div className="lg:col-span-2 p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-emerald-400" />
                <span>Live Audio Oscilloscope Monitor</span>
              </span>
              <span className="font-mono text-emerald-400">
                {isSoundPlaying ? '🔊 Web Audio Synthesizer Active' : '🔇 Audio Muted'}
              </span>
            </div>

            <canvas
              ref={scopeCanvasRef}
              width={640}
              height={360}
              className="w-full h-[360px] rounded-2xl bg-slate-950 border border-slate-800/80 shadow-inner"
            />
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400">
                Acoustic Frequency Synthesizer
              </h3>

              {/* Sound Toggle */}
              <button
                onClick={toggleOscillator}
                className={`w-full py-3.5 rounded-2xl text-xs font-black transition flex items-center justify-center space-x-2 ${
                  isSoundPlaying
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-950'
                }`}
              >
                {isSoundPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSoundPlaying ? 'Mute Audio Tone' : 'Play Synthesized Audio Tone'}</span>
              </button>

              {/* Frequency Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Oscillator Frequency (f)</span>
                  <span className="font-mono text-emerald-400">{audioFreq} Hz</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="10"
                  value={audioFreq}
                  onChange={(e) => setAudioFreq(+e.target.value)}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Medium Selector */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 block">Propagation Medium:</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.entries(mediumSpeeds).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedMedium(key)}
                      className={`p-2 rounded-xl text-[11px] font-bold transition ${
                        selectedMedium === key
                          ? 'bg-emerald-500 text-stone-950 font-black'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculations */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Acoustic Wave Equations (v = f × λ)
              </span>
              <div className="flex justify-between">
                <span className="text-slate-400">Speed of Sound in {mediumSpeeds[selectedMedium].name}:</span>
                <span className="font-mono font-bold text-emerald-400">{waveSpeed} m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wavelength (λ = v/f):</span>
                <span className="font-mono font-bold text-sky-400">{wavelengthMeters} Meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Time Period (T = 1/f):</span>
                <span className="font-mono font-bold text-amber-400">{timePeriodMs} ms</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
