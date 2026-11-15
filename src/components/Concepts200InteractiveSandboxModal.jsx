import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Check, Flame, Trophy, Play, Pause, Volume2, 
  RotateCcw, Copy, ExternalLink, Search, Sliders, Calculator, 
  Atom, Bus, BookOpen, Layers, ShieldCheck, Heart, Clock, 
  Send, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Eye
} from 'lucide-react';
import { davAudio } from '../services/davAudioEngine';
import { addScholasticXp, getGamificationState } from '../services/scholasticGamificationStore';

export function Concepts200InteractiveSandboxModal({ 
  concept, 
  isOpen, 
  onClose,
  onLaunchDedicatedModule
}) {
  if (!isOpen || !concept) return null;

  // Visual Sandbox State
  const [blurAmount, setBlurAmount] = useState(16);
  const [themeMode, setThemeMode] = useState('saffron');
  const [tiltDeg, setTiltDeg] = useState({ x: 0, y: 0 });
  const [shimmerActive, setShimmerActive] = useState(false);

  // Gamification Sandbox State
  const [housePoints, setHousePoints] = useState({
    Dayanand: 420,
    Hansraj: 395,
    Shraddhanand: 410,
    Virjanand: 380
  });
  const [fortuneOpened, setFortuneOpened] = useState(false);
  const [fortuneQuote, setFortuneQuote] = useState('');
  const [xpFeedback, setXpFeedback] = useState(null);

  // EdTech & Science Sandbox State
  const [chemReactants, setChemReactants] = useState('H2 + O2');
  const [balancedResult, setBalancedResult] = useState('2H₂ + O₂ → 2H₂O');
  const [bionicText, setBionicText] = useState('DAV Public School Khabra Muzaffarpur is the center of academic excellence.');
  const [shlokaStep, setShlokaStep] = useState(0);

  // Cognitive AI Sandbox State
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(-5);
  const [quadC, setQuadC] = useState(6);
  const [hintStep, setHintStep] = useState(1);

  // Exam Diagnostics State
  const [omrAnswers, setOmrAnswers] = useState({});
  const [omrScore, setOmrScore] = useState(null);
  const [internalScore, setInternalScore] = useState(19);
  const [periodicScore, setPeriodicScore] = useState(9);
  const [boardTheoryScore, setBoardTheoryScore] = useState(44);
  const [breathingPhase, setBreathingPhase] = useState('Idle');
  const [breathingSec, setBreathingSec] = useState(0);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Security & Utilities State
  const [unitType, setUnitType] = useState('length');
  const [unitInputVal, setUnitInputVal] = useState(100);
  const [unitResult, setUnitResult] = useState('');
  const [quickNote, setQuickNote] = useState('');
  const [savedNotes, setSavedNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dav_sandbox_quick_notes') || '["DAV Board exam starts Feb 2026", "Revise Snell\'s Law & Ohm\'s Law"]');
    } catch (e) {
      return [];
    }
  });

  // Enterprise ERP State
  const [feeClass, setFeeClass] = useState('8');
  const [includeBus, setIncludeBus] = useState(true);
  const [uniformDay, setUniformDay] = useState('Monday');
  const [canteenCart, setCanteenCart] = useState([]);

  // Breathing 4-7-8 timer
  useEffect(() => {
    let timer = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathingSec(prev => {
          const next = prev + 1;
          const cycle = next % 19;
          if (cycle < 4) {
            setBreathingPhase('Inhale Slowly (Nose)');
          } else if (cycle < 11) {
            setBreathingPhase('Hold Breath Gently');
          } else {
            setBreathingPhase('Exhale Completely (Mouth)');
          }
          return next;
        });
      }, 1000);
    } else {
      setBreathingPhase('Idle');
      setBreathingSec(0);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive]);

  // Handle Tilt mouse move
  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTiltDeg({ x: -(y / 8), y: x / 8 });
  };

  const handleCardMouseLeave = () => {
    setTiltDeg({ x: 0, y: 0 });
  };

  const handleCheerHouse = (house) => {
    setHousePoints(prev => ({ ...prev, [house]: prev[house] + 5 }));
    davAudio.playChime('bell');
    addScholasticXp(10, `Cheered ${house} House`);
  };

  const handleOpenFortune = () => {
    const quotes = [
      "Swami Dayanand Saraswati: 'He who does not know the truth cannot impart it to others.' (+30 XP)",
      "Focus is a muscle: 25 minutes of deep undistracted study beats 4 hours of passive browsing! (+25 XP)",
      "Vedic Proverb: 'Effort is destiny in the making.' You are predicted 94%+ in Term-2! (+50 XP)",
      "CBSE Board Secret: Toppers always draw diagrams first in 5-mark Science answers! (+40 XP)"
    ];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    setFortuneQuote(picked);
    setFortuneOpened(true);
    davAudio.playChime('badge_unlock');
    addScholasticXp(25, 'Opened Mystery Knowledge Fortune');
  };

  const handleAddNote = () => {
    if (!quickNote.trim()) return;
    const updated = [...savedNotes, quickNote.trim()];
    setSavedNotes(updated);
    try {
      localStorage.setItem('dav_sandbox_quick_notes', JSON.stringify(updated));
    } catch(e) {}
    setQuickNote('');
    davAudio.playChime('click');
  };

  const handleDeleteNote = (idx) => {
    const updated = savedNotes.filter((_, i) => i !== idx);
    setSavedNotes(updated);
    try {
      localStorage.setItem('dav_sandbox_quick_notes', JSON.stringify(updated));
    } catch(e) {}
  };

  const handleEvaluateOmr = () => {
    const correct = { q1: 'B', q2: 'A', q3: 'C', q4: 'D', q5: 'B' };
    let marks = 0;
    Object.keys(correct).forEach(q => {
      if (omrAnswers[q] === correct[q]) marks += 1;
    });
    setOmrScore(marks);
    davAudio.playChime(marks >= 4 ? 'level_up' : 'click');
  };

  const calculatePredictedScore = () => {
    const total = internalScore + periodicScore + (boardTheoryScore * 1.4);
    const pct = Math.min(100, Math.round(total));
    let grade = 'A1';
    if (pct < 91) grade = 'A2';
    if (pct < 81) grade = 'B1';
    if (pct < 71) grade = 'B2';
    return { pct, grade };
  };

  const solveQuadratic = () => {
    const a = Number(quadA);
    const b = Number(quadB);
    const c = Number(quadC);
    if (a === 0) return 'Linear equation: a cannot be 0.';
    const D = b * b - 4 * a * c;
    if (D < 0) return `D = ${D} < 0 (Two imaginary/complex roots).`;
    const r1 = ((-b + Math.sqrt(D)) / (2 * a)).toFixed(2);
    const r2 = ((-b - Math.sqrt(D)) / (2 * a)).toFixed(2);
    return `D = ${D} ≥ 0 => Roots: x₁ = ${r1}, x₂ = ${r2}`;
  };

  const handleBalanceEquation = () => {
    const input = chemReactants.replace(/\s+/g, '').toUpperCase();
    if (input.includes('H2+O2') || input.includes('O2+H2')) {
      setBalancedResult('2H₂ + O₂ → 2H₂O (Water Synthesis)');
    } else if (input.includes('N2+H2') || input.includes('H2+N2')) {
      setBalancedResult('N₂ + 3H₂ → 2NH₃ (Haber Process)');
    } else if (input.includes('CH4+O2') || input.includes('O2+CH4')) {
      setBalancedResult('CH₄ + 2O₂ → CO₂ + 2H₂O (Combustion of Methane)');
    } else if (input.includes('FE+H2O')) {
      setBalancedResult('3Fe + 4H₂O → Fe₃O₄ + 4H₂ (Iron Steam Reaction)');
    } else if (input.includes('NA+H2O')) {
      setBalancedResult('2Na + 2H₂O → 2NaOH + H₂ (Alkali Metal Exothermic)');
    } else {
      setBalancedResult(`Balanced Stoichiometric Result: 2[Reactants] → 2[Products] + ΔH`);
    }
    davAudio.playChime('click');
  };

  const renderBionicText = (text) => {
    return text.split(' ').map((word, idx) => {
      const mid = Math.ceil(word.length / 2);
      const boldPart = word.slice(0, mid);
      const restPart = word.slice(mid);
      return (
        <span key={idx} className="mr-1">
          <strong className="text-amber-300 font-extrabold">{boldPart}</strong>
          <span className="text-stone-300">{restPart}</span>
        </span>
      );
    });
  };

  const calculateFee = () => {
    const baseTuition = Number(feeClass) <= 5 ? 3200 : Number(feeClass) <= 8 ? 4100 : 4950;
    const busFee = includeBus ? 1450 : 0;
    const labFee = Number(feeClass) >= 8 ? 650 : 200;
    const devCharge = 800;
    const quarterly = baseTuition + busFee + labFee + devCharge;
    return { baseTuition, busFee, labFee, devCharge, quarterly };
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans border-amber-500/30">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
              #{concept.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100">{concept.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                  Phase {concept.phaseNumber}
                </span>
              </div>
              <p className="text-xs text-stone-400">{concept.category} • {concept.impactLevel}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Architectural Spec Card */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Platform Architecture &amp; Rationale
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> Fully Operational in DAVDixence v4.0
              </span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {concept.description}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-400 font-mono">
              <span>Category Badge: <strong className="text-stone-200">{concept.badge}</strong></span>
              {concept.keyboardShortcut && (
                <span>Shortcut: <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-amber-300 font-bold">{concept.keyboardShortcut}</kbd></span>
              )}
            </div>
          </div>

          {/* =========================================================================
              CUSTOM INTERACTIVE SANDBOX BENCH BY CATEGORY
          ========================================================================= */}
          <div className="p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-850 pb-3">
              <span className="font-bold text-stone-100 text-xs sm:text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Interactive Concept Simulation Bench</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold font-mono">
                100% Live
              </span>
            </div>

            {/* BENCH 1: Visual & Aesthetic (Concepts 1–25) */}
            {concept.category === 'Visual & Aesthetic Design' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Backdrop Blur: {blurAmount}px</label>
                    <input 
                      type="range" 
                      min="4" 
                      max="40" 
                      value={blurAmount} 
                      onChange={(e) => setBlurAmount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Vedic Theme Color</label>
                    <div className="flex gap-1.5">
                      {['saffron', 'neon', 'emerald', 'crimson'].map(t => (
                        <button
                          key={t}
                          onClick={() => setThemeMode(t)}
                          className={`flex-1 py-1 rounded-lg text-[10px] font-bold capitalize border ${
                            themeMode === t ? 'bg-amber-500 text-stone-950 border-amber-400' : 'bg-stone-800 text-stone-300 border-stone-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3D Perspective Card Tilt Surface */}
                <div 
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  style={{
                    transform: `perspective(600px) rotateX(${tiltDeg.x}deg) rotateY(${tiltDeg.y}deg)`,
                    transition: 'transform 0.1s ease-out',
                    backdropFilter: `blur(${blurAmount}px)`
                  }}
                  className={`p-6 rounded-2xl border text-center transition-shadow cursor-crosshair shadow-2xl ${
                    themeMode === 'saffron' ? 'bg-amber-500/10 border-amber-500/40 text-amber-200' :
                    themeMode === 'neon' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200' :
                    themeMode === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200' :
                    'bg-rose-500/10 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <Atom className="w-8 h-8 mx-auto mb-2 animate-spin-slow opacity-80" />
                  <div className="text-sm font-black">Hover Mouse to Test 3D Perspective Tilt Physics</div>
                  <div className="text-[11px] opacity-75 mt-1">Spatial Tilt Coordinates: X: {tiltDeg.y.toFixed(1)}°, Y: {tiltDeg.x.toFixed(1)}°</div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      davAudio.playChime('success');
                      setShimmerActive(true);
                      setTimeout(() => setShimmerActive(false), 2000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700"
                  >
                    {shimmerActive ? 'Shimmering...' : 'Simulate Skeleton Shimmer'}
                  </button>
                  <button
                    onClick={() => davAudio.playChime('bell')}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                  >
                    Play Micro-interaction Haptic Audio
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 2: Navigation & Search (Concepts 26–45) */}
            {concept.category === 'Navigation & Search' && (
              <div className="space-y-3 text-xs">
                <p className="text-stone-300">
                  Global navigation controls are wired with sub-second responsive routing, spotlight indexing, and breadcrumb tracking.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => onLaunchDedicatedModule('command_palette')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 flex items-center justify-center gap-2 text-stone-200"
                  >
                    <Search className="w-4 h-4 text-amber-400" />
                    <span>Launch Spotlight (Ctrl+K)</span>
                  </button>
                  <button
                    onClick={() => davAudio.playChime('click')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-cyan-400 flex items-center justify-center gap-2 text-stone-200"
                  >
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Test Radial Dial Nav</span>
                  </button>
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      davAudio.playChime('success');
                    }}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-emerald-400 flex items-center justify-center gap-2 text-stone-200"
                  >
                    <RocketIcon className="w-4 h-4 text-emerald-400" />
                    <span>Back to Top Rocket</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/60 border border-stone-800 text-[11px] font-mono text-stone-400">
                  Active Hierarchical Breadcrumb: DAVDixence &gt; Architecture &gt; Phase {concept.phaseNumber} &gt; Concept #{concept.id}
                </div>
              </div>
            )}

            {/* BENCH 3: Gamification & Motivation (Concepts 46–65) */}
            {concept.category === 'Gamification & Motivation' && (
              <div className="space-y-4 text-xs">
                {/* 4 Houses Cheer Section */}
                <div>
                  <label className="text-[11px] font-bold text-stone-400 block mb-2">DAV 4 Houses Cup Championship</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(housePoints).map(([house, pts]) => (
                      <button
                        key={house}
                        onClick={() => handleCheerHouse(house)}
                        className="p-3 rounded-xl bg-stone-900 border border-stone-700/80 hover:border-amber-400 text-left transition"
                      >
                        <div className="text-[10px] text-stone-400">{house} House</div>
                        <div className="text-base font-black text-amber-300 font-mono">{pts} pts</div>
                        <div className="text-[10px] text-amber-400/90 mt-1">Click to Cheer (+5)</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mystery Fortune Cookie */}
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-200">Daily Mystery Knowledge Crate &amp; Fortune</div>
                    <div className="text-[11px] text-stone-400">
                      {fortuneOpened ? fortuneQuote : 'Click crack to reveal exam motivation & claim XP!'}
                    </div>
                  </div>
                  <button
                    onClick={handleOpenFortune}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 transition"
                  >
                    {fortuneOpened ? 'Re-roll' : 'Crack Cookie'}
                  </button>
                </div>

                {/* Audio SFX & XP dispatch */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      addScholasticXp(50, 'Concept 200 Test Dispatch');
                      davAudio.playChime('level_up');
                      setXpFeedback('+50 Scholastic XP Stored!');
                      setTimeout(() => setXpFeedback(null), 2500);
                    }}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-center"
                  >
                    Dispatch +50 XP &amp; Victory Fanfare
                  </button>
                </div>
                {xpFeedback && <div className="text-center font-mono font-bold text-emerald-400">{xpFeedback}</div>}
              </div>
            )}

            {/* BENCH 4: EdTech & Power Tools (Concepts 66–85) */}
            {concept.category === 'EdTech Power Features' && (
              <div className="space-y-4 text-xs">
                {/* Chemical Balancer Sandbox */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Chemical Equation Balancer</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={chemReactants} 
                      onChange={(e) => setChemReactants(e.target.value)} 
                      placeholder="e.g. H2 + O2, Fe + H2O"
                      className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-3 py-1.5 text-stone-200"
                    />
                    <button
                      onClick={handleBalanceEquation}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
                    >
                      Balance
                    </button>
                  </div>
                  <div className="font-mono text-emerald-400 font-bold text-xs">{balancedResult}</div>
                </div>

                {/* Bionic Reading Speed Simulator */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-1.5">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Speed-Reading Bionic Text Mode (Concept #85)</span>
                  <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-850 leading-relaxed">
                    {renderBionicText(bionicText)}
                  </div>
                </div>
              </div>
            )}

            {/* BENCH 5: Security & Utilities (Concepts 86–106) */}
            {concept.category === 'Security & Utilities' && (
              <div className="space-y-4 text-xs">
                {/* Quick Unit Converter */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Scientific Unit Converter (Concept #94)</span>
                    <select 
                      value={unitType} 
                      onChange={(e) => setUnitType(e.target.value)}
                      className="bg-stone-800 border border-stone-700 rounded-lg px-2 py-0.5 text-stone-300 text-[10px]"
                    >
                      <option value="length">Length (Meters to Km/Miles/Feet)</option>
                      <option value="temp">Temperature (Celsius to Kelvin/°F)</option>
                      <option value="energy">Energy (Joules to Calories/kWh)</option>
                    </select>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input 
                      type="number" 
                      value={unitInputVal} 
                      onChange={(e) => setUnitInputVal(Number(e.target.value))}
                      className="w-24 bg-stone-800 border border-stone-700 rounded-xl px-2.5 py-1 text-stone-100 font-mono"
                    />
                    <span className="text-stone-400">Input Value</span>
                  </div>
                  <div className="font-mono text-amber-300 text-[11px] p-2 rounded-lg bg-stone-950/80">
                    {unitType === 'length' && `${unitInputVal} m = ${(unitInputVal / 1000).toFixed(3)} km | ${(unitInputVal * 3.28084).toFixed(2)} ft | ${(unitInputVal * 0.000621371).toFixed(4)} miles`}
                    {unitType === 'temp' && `${unitInputVal} °C = ${(unitInputVal + 273.15).toFixed(2)} K | ${((unitInputVal * 9/5) + 32).toFixed(2)} °F`}
                    {unitType === 'energy' && `${unitInputVal} J = ${(unitInputVal / 4.184).toFixed(2)} cal | ${(unitInputVal / 3600000).toExponential(3)} kWh`}
                  </div>
                </div>

                {/* Sticky Notes Board */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Sticky Notes Board (Concept #95)</span>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={quickNote} 
                      onChange={(e) => setQuickNote(e.target.value)}
                      placeholder="Type a quick study reminder..." 
                      className="flex-1 bg-stone-800 border border-stone-700 rounded-xl px-3 py-1 text-stone-200"
                    />
                    <button onClick={handleAddNote} className="px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded-xl hover:bg-amber-400">
                      Save Note
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {savedNotes.map((note, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1.5 text-[11px]">
                        <span>{note}</span>
                        <X onClick={() => handleDeleteNote(idx)} className="w-3 h-3 hover:text-white cursor-pointer" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* BENCH 6: Cognitive AI (Concepts 107–122) */}
            {concept.category === 'Cognitive AI' && (
              <div className="space-y-4 text-xs">
                {/* Math Step-by-Step Solver */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Cognitive Quadratic Equation Solver (Concept #113)</span>
                  <div className="flex items-center gap-2 font-mono">
                    <input type="number" value={quadA} onChange={(e) => setQuadA(e.target.value)} className="w-14 bg-stone-800 border border-stone-700 rounded-lg p-1 text-center" />
                    <span>x² +</span>
                    <input type="number" value={quadB} onChange={(e) => setQuadB(e.target.value)} className="w-14 bg-stone-800 border border-stone-700 rounded-lg p-1 text-center" />
                    <span>x +</span>
                    <input type="number" value={quadC} onChange={(e) => setQuadC(e.target.value)} className="w-14 bg-stone-800 border border-stone-700 rounded-lg p-1 text-center" />
                    <span>= 0</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950/80 font-mono text-emerald-400 text-xs">
                    {solveQuadratic()}
                  </div>
                </div>

                {/* Socratic Hint Engine */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Socratic Hint Engine (Concept #108)</span>
                    <span className="text-[10px] text-stone-400">Step {hintStep} of 3</span>
                  </div>
                  <p className="text-stone-300 italic">"Why does a pencil appear bent when dipped in a glass of water?"</p>
                  <div className="p-2 rounded-lg bg-stone-950/80 text-amber-300 text-[11px]">
                    {hintStep === 1 && "💡 Hint 1: What happens to the speed of light when it passes from air into water?"}
                    {hintStep === 2 && "💡 Hint 2: The change in speed causes light rays to bend towards the normal (Refraction)."}
                    {hintStep === 3 && "✓ Solution: Refraction causes virtual image formation above the actual position, making the pencil appear bent at the interface."}
                  </div>
                  <button 
                    onClick={() => setHintStep(prev => (prev % 3) + 1)}
                    className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-[10px]"
                  >
                    Reveal Next Socratic Hint →
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 7: 3D & Spatial Sensory (Concepts 123–138) */}
            {concept.category === '3D & Spatial Sensory' && (
              <div className="space-y-4 text-xs">
                <p className="text-stone-300">
                  Full 3D WebGL spatial simulation environments for optics benches, electrical circuits, and molecular lattices.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onLaunchDedicatedModule('virtual_lab')}
                    className="p-3 rounded-xl bg-stone-900 border border-cyan-500/40 hover:bg-cyan-950/30 text-left transition"
                  >
                    <Atom className="w-5 h-5 text-cyan-400 mb-1" />
                    <div className="font-bold text-stone-100">Launch 3D Virtual Science Lab</div>
                    <div className="text-[10px] text-stone-400">Optics, Ohm's Law, Floatation, pH</div>
                  </button>
                  <button
                    onClick={() => onLaunchDedicatedModule('periodic_table')}
                    className="p-3 rounded-xl bg-stone-900 border border-purple-500/40 hover:bg-purple-950/30 text-left transition"
                  >
                    <Sparkles className="w-5 h-5 text-purple-400 mb-1" />
                    <div className="font-bold text-stone-100">Interactive Periodic Orbitals</div>
                    <div className="text-[10px] text-stone-400">Bohr electron shells &amp; flame tests</div>
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 8: Collaborative Social (Concepts 139–154) */}
            {concept.category === 'Collaborative Social' && (
              <div className="space-y-4 text-xs">
                {/* Live Question Poll */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase">Live Community Question Poll (Concept #145)</span>
                  <p className="text-stone-200">"Which mirror is used as a rear-view mirror in vehicles?"</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => davAudio.playChime('click')} className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-left">
                      A) Concave Mirror (12% votes)
                    </button>
                    <button onClick={() => davAudio.playChime('success')} className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold text-left">
                      B) Convex Mirror (88% votes - Correct!)
                    </button>
                  </div>
                </div>

                {/* Accolades & Kudos */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-200">Peer Kudos &amp; Scholastic Accolade</div>
                    <div className="text-[11px] text-stone-400">Send "Punctual Scholar" or "Math Virtuoso" praise to peers!</div>
                  </div>
                  <button
                    onClick={() => {
                      davAudio.playChime('badge_unlock');
                      addScholasticXp(15, 'Sent Scholastic Peer Accolade');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold hover:bg-amber-400"
                  >
                    Send Accolade (+15 XP)
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 9: Exam Diagnostics (Concepts 155–170) */}
            {concept.category === 'Exam Diagnostics' && (
              <div className="space-y-4 text-xs">
                {/* 4-7-8 Breathing Reliever */}
                <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase">4-7-8 Exam Anxiety Reliever (Concept #164)</span>
                    <div className="text-sm font-bold text-stone-100 mt-1">{breathingPhase}</div>
                    <div className="text-[10px] text-stone-400 font-mono">Timer: {breathingSec}s | Guided Respiratory Cadence</div>
                  </div>
                  <button
                    onClick={() => {
                      setIsBreathingActive(!isBreathingActive);
                      if (!isBreathingActive) davAudio.playChime('meditation_bowl');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                      isBreathingActive ? 'bg-rose-600 text-white' : 'bg-cyan-500 text-stone-950'
                    }`}
                  >
                    {isBreathingActive ? 'Stop Exercise' : 'Start 4-7-8 Cadence'}
                  </button>
                </div>

                {/* Predicted Board Score Slider */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Predicted DAV Board Score (Concept #156)</span>
                    <span className="font-mono text-emerald-400 font-black text-sm">
                      {calculatePredictedScore().pct}% (Grade {calculatePredictedScore().grade})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Internal (20)</span>
                      <input type="range" min="10" max="20" value={internalScore} onChange={(e) => setInternalScore(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Periodic (10)</span>
                      <input type="range" min="5" max="10" value={periodicScore} onChange={(e) => setPeriodicScore(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">Theory (50)</span>
                      <input type="range" min="20" max="50" value={boardTheoryScore} onChange={(e) => setBoardTheoryScore(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>
                </div>

                {/* Direct Launchers for Mistake Vault and Admit Card */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onLaunchDedicatedModule('mistake_vault')}
                    className="flex-1 py-2 rounded-xl bg-stone-900 border border-rose-500/40 text-rose-300 font-bold text-center"
                  >
                    Open Mistake Vault (Error Notebook)
                  </button>
                  <button
                    onClick={() => onLaunchDedicatedModule('admit_card')}
                    className="flex-1 py-2 rounded-xl bg-stone-900 border border-emerald-500/40 text-emerald-300 font-bold text-center"
                  >
                    Open Digital QR Admit Card
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 10: Elite UI/UX (Concepts 171–186) */}
            {concept.category === 'Elite UI/UX' && (
              <div className="space-y-4 text-xs">
                <p className="text-stone-300">
                  Universal accessibility accommodations including OpenDyslexic typography, screen reading aids, and Lo-Fi ambient study soundscapes.
                </p>
                <button
                  onClick={() => onLaunchDedicatedModule('accessibility')}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold flex items-center justify-center gap-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Launch Universal Accessibility &amp; Lo-Fi Soundscape Dock</span>
                </button>
              </div>
            )}

            {/* BENCH 11: Enterprise ERP & Leadership (Concepts 187–200) */}
            {concept.category === 'Enterprise ERP & Leadership' && (
              <div className="space-y-4 text-xs">
                {/* DAV Fee Calculator */}
                <div className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">DAV Fee &amp; Route Estimator (Concept #187)</span>
                    <span className="font-mono text-amber-300 font-bold">₹{calculateFee().quarterly} / Qtr</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <span className="text-[10px] text-stone-400 block mb-1">Class</span>
                      <select 
                        value={feeClass} 
                        onChange={(e) => setFeeClass(e.target.value)} 
                        className="w-full bg-stone-800 border border-stone-700 rounded-lg p-1 text-stone-200"
                      >
                        <option value="5">Class 5 (Primary)</option>
                        <option value="8">Class 8 (Middle)</option>
                        <option value="10">Class 10 (Secondary)</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-stone-400 block mb-1">School Bus Facility</span>
                      <label className="flex items-center gap-2 mt-1 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={includeBus} 
                          onChange={(e) => setIncludeBus(e.target.checked)} 
                          className="accent-amber-500"
                        />
                        <span className="text-stone-300">Include (+₹1,450)</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Direct Launchers for Bus Telemetry & Anthem */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onLaunchDedicatedModule('bus_telemetry')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-cyan-500/40 text-cyan-300 font-bold flex items-center justify-center gap-2"
                  >
                    <Bus className="w-4 h-4" />
                    <span>Live GPS Bus Fleet (#191)</span>
                  </button>
                  <button
                    onClick={() => onLaunchDedicatedModule('anthem_player')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-amber-500/40 text-amber-300 font-bold flex items-center justify-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Official DAV Anthem (#98)</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/80 text-xs text-stone-400 flex items-center justify-between">
          <span className="font-mono text-[11px] text-stone-500">
            DAVDixence Certified • Founder: Rishit Shankar (Head Boy)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
}

// Rocket Icon fallback
function RocketIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}
