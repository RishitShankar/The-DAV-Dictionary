import React, { useState } from 'react';
import { 
  FlaskConical, Sun, Zap, Anchor, Droplets, X, RotateCcw, 
  Sparkles, CheckCircle2, ChevronRight, Eye
} from 'lucide-react';

export function InteractiveScienceLabModal({ isOpen, onClose }) {
  const [activeBench, setActiveBench] = useState('optics'); // 'optics' | 'circuits' | 'density' | 'chemistry'

  // Optics Bench State
  const [opticsAngle, setOpticsAngle] = useState(30);
  const [refractiveIndex, setRefractiveIndex] = useState(1.52); // Glass
  const [opticsMaterial, setOpticsMaterial] = useState('Crown Glass (n=1.52)');

  // Circuits Bench State
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(10);
  const current = (voltage / resistance).toFixed(2);
  const power = (voltage * current).toFixed(1);

  // Density Bench State
  const [liquidDensity, setLiquidDensity] = useState(1.0); // Water
  const [liquidName, setLiquidName] = useState('Water (1.00 g/cm³)');
  const [objectDensity, setObjectDensity] = useState(0.6); // Wood
  const [objectName, setObjectName] = useState('Wooden Block (0.60 g/cm³)');

  // Chemistry pH Bench State
  const [selectedSolution, setSelectedSolution] = useState({ name: 'Dilute HCl Acid', ph: 1.5, type: 'acid' });
  const [selectedIndicator, setSelectedIndicator] = useState('litmus_blue');

  if (!isOpen) return null;

  // Snell's Law calculation
  const angleRad = (opticsAngle * Math.PI) / 180;
  const sinR = Math.sin(angleRad) / refractiveIndex;
  const rAngleDeg = Math.round((Math.asin(Math.min(sinR, 1)) * 180) / Math.PI);

  // Archimedes floatation status
  const doesFloat = objectDensity <= liquidDensity;
  const submergedPercent = Math.min(100, Math.round((objectDensity / liquidDensity) * 100));

  // Chemistry Indicator Color calculation
  const getReactionColor = () => {
    if (selectedIndicator === 'litmus_blue') {
      return selectedSolution.type === 'acid' ? 'bg-red-500 text-white' : 'bg-blue-600 text-white';
    }
    if (selectedIndicator === 'litmus_red') {
      return selectedSolution.type === 'base' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white';
    }
    if (selectedIndicator === 'phenolphthalein') {
      return selectedSolution.type === 'base' ? 'bg-fuchsia-500 text-white' : 'bg-stone-200 text-stone-900';
    }
    if (selectedIndicator === 'turmeric') {
      return selectedSolution.type === 'base' ? 'bg-red-800 text-amber-200' : 'bg-yellow-400 text-stone-950';
    }
    return 'bg-amber-400 text-stone-950';
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                  Concept #123 &amp; #134
                </span>
                <span className="text-xs text-stone-400 font-bold">DAV Virtual Science Laboratory</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Interactive Multi-Disciplinary Science Sandbox
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workbench Selector Tabs */}
        <div className="bg-stone-950 border-b border-stone-800/80 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-bold scrollbar-none">
          {[
            { id: 'optics', label: '1. Ray Optics & Snell\'s Law', icon: Sun },
            { id: 'circuits', label: '2. Ohm\'s Law & Electric Circuits', icon: Zap },
            { id: 'density', label: '3. Archimedes\' Floatation & Density', icon: Anchor },
            { id: 'chemistry', label: '4. pH & Chemical Indicators', icon: Droplets }
          ].map(bench => {
            const Icon = bench.icon;
            const isActive = activeBench === bench.id;
            return (
              <button
                key={bench.id}
                onClick={() => setActiveBench(bench.id)}
                className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive 
                    ? 'bg-amber-400 text-stone-950 font-black shadow-md' 
                    : 'text-stone-400 hover:text-white bg-stone-900 border border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{bench.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workbench Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* =========================================================================
              WORKBENCH 1: RAY OPTICS & SNELL'S LAW
          ========================================================================= */}
          {activeBench === 'optics' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                <div>
                  <h3 className="text-base font-black text-white">Refraction Through Optical Media</h3>
                  <p className="text-xs text-stone-400">Formula: n₁ sin(i) = n₂ sin(r) • Light bends towards normal in denser media</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-stone-400">Incident Angle i:</span>
                  <span className="text-amber-400 font-bold text-sm">{opticsAngle}°</span>
                  <span className="text-stone-500">|</span>
                  <span className="text-stone-400">Refracted Angle r:</span>
                  <span className="text-emerald-400 font-bold text-sm">{rAngleDeg}°</span>
                </div>
              </div>

              {/* Optics Canvas Simulation */}
              <div className="h-64 rounded-2xl bg-stone-950 border border-stone-800 relative overflow-hidden flex items-center justify-center">
                {/* Air / Glass Boundary */}
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-cyan-950/40 border-t-2 border-cyan-400/60 backdrop-blur-xs flex items-end justify-end p-3">
                  <span className="text-xs font-mono text-cyan-300 font-bold">{opticsMaterial}</span>
                </div>
                <div className="absolute top-2 left-3 text-xs font-mono text-stone-400">
                  Air (n = 1.00)
                </div>

                {/* Normal Line (Dotted) */}
                <div className="absolute inset-y-0 left-1/2 w-0.5 border-r border-dashed border-stone-600 z-10" />

                {/* Incident Ray Laser */}
                <div 
                  className="absolute bottom-1/2 left-1/2 w-48 h-1 bg-gradient-to-r from-red-500 to-amber-400 origin-bottom-left shadow-lg shadow-red-500/50"
                  style={{ transform: `rotate(${180 + opticsAngle}deg)` }}
                />

                {/* Refracted Ray Laser */}
                <div 
                  className="absolute top-1/2 left-1/2 w-48 h-1 bg-gradient-to-r from-amber-400 to-emerald-400 origin-top-left shadow-lg shadow-emerald-500/50"
                  style={{ transform: `rotate(${90 - rAngleDeg}deg)` }}
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <label className="text-xs font-bold text-stone-300 flex justify-between">
                    <span>Adjust Laser Angle (i):</span>
                    <span className="text-amber-400 font-mono">{opticsAngle}°</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    value={opticsAngle}
                    onChange={(e) => setOpticsAngle(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <label className="text-xs font-bold text-stone-300">Select Refracting Medium:</label>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-bold">
                    {[
                      { name: 'Water', n: 1.33 },
                      { name: 'Crown Glass', n: 1.52 },
                      { name: 'Diamond', n: 2.42 }
                    ].map(mat => (
                      <button
                        key={mat.name}
                        onClick={() => {
                          setRefractiveIndex(mat.n);
                          setOpticsMaterial(`${mat.name} (n=${mat.n})`);
                        }}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                          refractiveIndex === mat.n 
                            ? 'bg-cyan-500 text-stone-950 font-black border-cyan-400' 
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        {mat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              WORKBENCH 2: OHM'S LAW & ELECTRIC CIRCUITS
          ========================================================================= */}
          {activeBench === 'circuits' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                <div>
                  <h3 className="text-base font-black text-white">Ohm's Law Closed Circuit Simulator</h3>
                  <p className="text-xs text-stone-400">Formula: V = I × R • Current I = V / R • Power P = V × I</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-stone-300 font-bold">Current: <span className="text-cyan-400 text-sm">{current} A</span></span>
                  <span className="text-stone-300 font-bold">Power: <span className="text-amber-400 text-sm">{power} W</span></span>
                </div>
              </div>

              {/* Circuit Bulb Visualizer */}
              <div className="h-60 rounded-2xl bg-stone-950 border border-stone-800 relative flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3">
                  {/* Glowing Filament Bulb */}
                  <div 
                    className="w-24 h-24 rounded-full border-4 border-stone-700 flex items-center justify-center transition-all duration-300 shadow-2xl relative"
                    style={{
                      backgroundColor: `rgba(251, 191, 36, ${Math.min(1, Math.max(0.1, power / 40))})`,
                      boxShadow: `0 0 ${Math.min(60, power * 2)}px rgba(245, 158, 11, ${Math.min(1, power / 30)})`
                    }}
                  >
                    <Zap className={`w-10 h-10 transition-colors ${power > 10 ? 'text-stone-950' : 'text-amber-400'}`} />
                  </div>
                  <span className="text-xs font-mono text-stone-400 font-bold">
                    Filament Bulb State: {power > 0.5 ? 'Glow Active' : 'Off'}
                  </span>
                </div>
              </div>

              {/* Voltage & Resistance Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <label className="text-xs font-bold text-stone-300 flex justify-between">
                    <span>DC Battery Voltage (V):</span>
                    <span className="text-amber-400 font-mono">{voltage} Volts</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    value={voltage}
                    onChange={(e) => setVoltage(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <label className="text-xs font-bold text-stone-300 flex justify-between">
                    <span>Circuit Resistance (R):</span>
                    <span className="text-cyan-400 font-mono">{resistance} Ohms (Ω)</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={resistance}
                    onChange={(e) => setResistance(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              WORKBENCH 3: ARCHIMEDES' PRINCIPLE & LIQUID DENSITY
          ========================================================================= */}
          {activeBench === 'density' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                <div>
                  <h3 className="text-base font-black text-white">Archimedes' Buoyancy &amp; Floatation Bench</h3>
                  <p className="text-xs text-stone-400">Rule: A body floats if Object Density ≤ Liquid Density. Sinks if Density &gt; Liquid.</p>
                </div>
                <div className="text-xs font-mono font-bold">
                  Status: {doesFloat ? (
                    <span className="text-emerald-400 font-black">FLOATS ({submergedPercent}% Submerged)</span>
                  ) : (
                    <span className="text-rose-400 font-black">SINKS TO BOTTOM</span>
                  )}
                </div>
              </div>

              {/* Beaker Container */}
              <div className="h-64 rounded-2xl bg-stone-950 border border-stone-800 relative flex items-center justify-center p-4">
                <div className="w-56 h-52 border-x-4 border-b-4 border-stone-600 rounded-b-3xl relative overflow-hidden bg-stone-900/50">
                  {/* Liquid inside beaker */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-cyan-600/30 border-t border-cyan-400/80 backdrop-blur-xs flex items-center justify-center">
                    <span className="text-[11px] font-mono text-cyan-200 font-bold">{liquidName}</span>
                  </div>

                  {/* Test Object Box */}
                  <div 
                    className={`absolute w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[10px] font-black font-mono transition-all duration-500 shadow-xl left-1/2 -translate-x-1/2 ${
                      doesFloat 
                        ? 'bg-amber-500 text-stone-950 border-amber-300' 
                        : 'bg-stone-700 text-stone-300 border-stone-500 bottom-2'
                    }`}
                    style={doesFloat ? { top: `${Math.max(15, 75 - (100 - submergedPercent) * 0.4)}px` } : {}}
                  >
                    {objectDensity} g/cm³
                  </div>
                </div>
              </div>

              {/* Material Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-300 block">Select Liquid Medium:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Water (1.00 g/cm³)', d: 1.0 },
                      { name: 'Mustard Oil (0.92 g/cm³)', d: 0.92 },
                      { name: 'Glycerin (1.26 g/cm³)', d: 1.26 },
                      { name: 'Mercury (13.6 g/cm³)', d: 13.6 }
                    ].map(l => (
                      <button
                        key={l.name}
                        onClick={() => {
                          setLiquidDensity(l.d);
                          setLiquidName(l.name);
                        }}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer text-[11px] ${
                          liquidDensity === l.d 
                            ? 'bg-cyan-500 text-stone-950 font-black border-cyan-400' 
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        {l.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-300 block">Select Test Object:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Wood (0.60 g/cm³)', d: 0.6 },
                      { name: 'Ice (0.92 g/cm³)', d: 0.92 },
                      { name: 'Iron Nail (7.87 g/cm³)', d: 7.87 },
                      { name: 'Gold (19.3 g/cm³)', d: 19.3 }
                    ].map(o => (
                      <button
                        key={o.name}
                        onClick={() => {
                          setObjectDensity(o.d);
                          setObjectName(o.name);
                        }}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer text-[11px] ${
                          objectDensity === o.d 
                            ? 'bg-amber-400 text-stone-950 font-black border-amber-300' 
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        {o.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              WORKBENCH 4: CHEMICAL pH & ACID-BASE INDICATORS
          ========================================================================= */}
          {activeBench === 'chemistry' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-950 p-4 rounded-2xl border border-stone-800">
                <div>
                  <h3 className="text-base font-black text-white">Acid, Base &amp; Salt Colorimetric Indicator Bench</h3>
                  <p className="text-xs text-stone-400">Chemical indicators change color in acidic vs basic environments.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-stone-400">pH Value:</span>
                  <span className="text-amber-400 text-sm">{selectedSolution.ph}</span>
                  <span className="text-stone-500">({selectedSolution.type.toUpperCase()})</span>
                </div>
              </div>

              {/* Chemical Test Tube Display */}
              <div className="h-60 rounded-2xl bg-stone-950 border border-stone-800 relative flex items-center justify-center p-6">
                <div className="flex items-center gap-8">
                  {/* Test Tube */}
                  <div className="w-20 h-44 rounded-b-full border-4 border-stone-600 bg-stone-900/60 p-2 relative flex flex-col justify-end overflow-hidden">
                    <div 
                      className={`w-full h-32 rounded-b-full transition-all duration-500 shadow-inner flex items-center justify-center ${getReactionColor()}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wider text-center px-1">
                        Reaction Color
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="text-stone-400">Active Test:</div>
                    <div className="text-sm font-black text-white">{selectedSolution.name} + {selectedIndicator.replace('_', ' ').toUpperCase()}</div>
                    <div className="text-stone-400 text-[11px] max-w-xs leading-relaxed">
                      {selectedSolution.type === 'acid' 
                        ? 'Acids turn blue litmus red. Phenolphthalein remains colorless.'
                        : 'Bases turn red litmus blue, turmeric reddish-brown, and phenolphthalein bright pink.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-300 block">Select Test Solution:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: 'Dilute HCl Acid', ph: 1.5, type: 'acid' },
                      { name: 'Lemon Juice', ph: 2.4, type: 'acid' },
                      { name: 'Pure Water', ph: 7.0, type: 'neutral' },
                      { name: 'Sodium Hydroxide', ph: 13.0, type: 'base' }
                    ].map(s => (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSolution(s)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer text-[11px] ${
                          selectedSolution.name === s.name 
                            ? 'bg-rose-500 text-white font-black border-rose-400' 
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <span className="text-stone-300 block">Select Indicator:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'litmus_blue', name: 'Blue Litmus' },
                      { id: 'litmus_red', name: 'Red Litmus' },
                      { id: 'phenolphthalein', name: 'Phenolphthalein' },
                      { id: 'turmeric', name: 'Turmeric Extract' }
                    ].map(ind => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndicator(ind.id)}
                        className={`p-2 rounded-xl border text-center transition cursor-pointer text-[11px] ${
                          selectedIndicator === ind.id 
                            ? 'bg-amber-400 text-stone-950 font-black border-amber-300' 
                            : 'bg-stone-900 border-stone-800 text-stone-300'
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
          <span>DAVDixence Virtual Science Laboratory • Certified CBSE &amp; DAV Standards</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Close Lab Bench
          </button>
        </div>

      </div>
    </div>
  );
}
