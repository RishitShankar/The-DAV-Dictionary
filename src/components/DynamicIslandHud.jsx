import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Clock, Flame, Play, Pause, RotateCcw, 
  Bus, CloudSun, ChevronDown, ChevronUp, Search, 
  FlaskConical, FileText, CheckCircle, ShieldCheck, X,
  Atom, Music, Calculator, Sliders, Layers, Rocket, Zap
} from 'lucide-react';
import { getGamificationState, subscribeToGamification } from '../services/scholasticGamificationStore';

export function DynamicIslandHud({ 
  onOpenCommandPalette, 
  onOpenVirtualLab, 
  onOpenMistakeVault, 
  onOpenAdmitCard,
  onOpenPeriodicTable,
  onOpenBusTelemetry,
  onOpenAnthemPlayer,
  onOpenFormulaSheet,
  onOpenAccessibility,
  onOpenConcepts200,
  onOpenFeatures300,
  onOpenHiTech50
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [gamification, setGamification] = useState(getGamificationState);

  // Focus Timer state in HUD
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const unsub = subscribeToGamification(setGamification);
    return unsub;
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (totalSec) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTimer = (e) => {
    e.stopPropagation();
    setIsTimerRunning(prev => !prev);
  };

  const resetTimer = (e) => {
    e.stopPropagation();
    setIsTimerRunning(false);
    setTimerSeconds(25 * 60);
  };

  return (
    <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-[9990] transition-all duration-300 font-sans pointer-events-auto">
      <div 
        onClick={() => setIsExpanded(prev => !prev)}
        className={`bg-stone-950/95 backdrop-blur-xl border border-stone-800/90 shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
          isExpanded 
            ? 'w-[94vw] sm:w-[520px] rounded-3xl p-5 border-amber-400/50 shadow-amber-500/10' 
            : 'h-10 px-4 rounded-full flex items-center gap-3.5 hover:border-stone-700 hover:scale-[1.02]'
        }`}
      >
        {!isExpanded ? (
          /* =========================================================================
             COMPACT PILL MODE (Dynamic Island Normal State)
          ========================================================================= */
          <div className="flex items-center justify-between w-full text-xs font-mono select-none">
            
            {/* Left: Flame Streak / Focus */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{gamification.streakDays}d</span>
              </div>
            </div>

            {/* Center: Live Timer or Campus Badge */}
            <div className="flex items-center gap-2 px-2 text-stone-200">
              {isTimerRunning ? (
                <div className="flex items-center gap-1.5 text-amber-300 font-black">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-stone-300">
                  <CloudSun className="w-3.5 h-3.5 text-amber-400" />
                  <span>27°C • Khabra</span>
                </div>
              )}
            </div>

            {/* Right: Quick Action / Level Pill */}
            <div className="flex items-center gap-1.5 text-stone-400">
              <span className="text-[10px] bg-stone-900 border border-stone-800 text-amber-400 px-2 py-0.5 rounded-full font-bold">
                Lv.{gamification.level}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-500" />
            </div>

          </div>
        ) : (
          /* =========================================================================
             EXPANDED COCKPIT MODE (Dynamic Island Multi-Tool Drawer)
          ========================================================================= */
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="space-y-4 text-stone-200 select-none animate-in fade-in duration-200"
          >
            {/* Cockpit Top Bar */}
            <div className="flex items-center justify-between border-b border-stone-850 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white tracking-wide uppercase">
                    DAV Dynamic Island • Campus Cockpit
                  </h4>
                  <span className="text-[10px] text-stone-400 block font-mono">
                    Muzaffarpur • Concept #171 • 200 Architecture
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setIsExpanded(false)}
                className="w-7 h-7 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Focus Engine & Streak Tracker */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-stone-900/90 to-stone-900/40 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Pomodoro Focus Engine
                </span>
                <span className="text-2xl font-black font-mono text-amber-300">
                  {formatTimer(timerSeconds)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition cursor-pointer ${
                    isTimerRunning 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                      : 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 hover:bg-amber-400'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={resetTimer}
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-400 hover:text-stone-200 flex items-center justify-center border border-stone-700 transition cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scholastic Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div 
                onClick={() => {
                  setIsExpanded(false);
                  onOpenBusTelemetry?.();
                }}
                className="bg-stone-900/60 hover:bg-stone-900 rounded-xl p-2.5 border border-stone-800 hover:border-amber-400/40 flex items-center gap-2 cursor-pointer transition"
              >
                <Bus className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-[10px] text-stone-500 block">Bus Fleet GPS:</span>
                  <span className="text-stone-300 font-bold text-[11px]">Bus #04 • 7m ETA</span>
                </div>
              </div>

              <div className="bg-stone-900/60 rounded-xl p-2.5 border border-stone-800 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                <div>
                  <span className="text-[10px] text-stone-500 block">Scholastic Rank:</span>
                  <span className="text-amber-400 font-bold text-[11px] truncate">{gamification.levelTitle}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Launchers (8 Flagship Features) */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenCommandPalette?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400 text-left transition cursor-pointer group"
              >
                <Search className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Spotlight</span>
                <span className="text-[9px] text-stone-500">Ctrl + K</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenPeriodicTable?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-purple-400 text-left transition cursor-pointer group"
              >
                <Atom className="w-4 h-4 text-purple-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Elements</span>
                <span className="text-[9px] text-stone-500">Bohr Orbitals</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenFormulaSheet?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-400 text-left transition cursor-pointer group"
              >
                <Calculator className="w-4 h-4 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Formulas</span>
                <span className="text-[9px] text-stone-500">LaTeX Hub</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenAnthemPlayer?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400 text-left transition cursor-pointer group"
              >
                <Music className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Anthem</span>
                <span className="text-[9px] text-stone-500">Vedic Chants</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenVirtualLab?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-cyan-400 text-left transition cursor-pointer group"
              >
                <FlaskConical className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Virtual Lab</span>
                <span className="text-[9px] text-stone-500">3D Workbench</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenMistakeVault?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-rose-400 text-left transition cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-rose-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">Mistake Vault</span>
                <span className="text-[9px] text-stone-500">Error Notes</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenAccessibility?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-teal-400 text-left transition cursor-pointer group"
              >
                <Sliders className="w-4 h-4 text-teal-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">A11y & Lo-Fi</span>
                <span className="text-[9px] text-stone-500">Dyslexia / Rain</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenConcepts200?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-400 text-left transition cursor-pointer group"
              >
                <Layers className="w-4 h-4 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">200 Concepts</span>
                <span className="text-[9px] text-stone-500">Blueprint</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenFeatures300?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-cyan-400 text-left transition cursor-pointer group"
              >
                <Rocket className="w-4 h-4 text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">300 Features</span>
                <span className="text-[9px] text-stone-500">Next-Gen Labs</span>
              </button>

              <button
                onClick={() => {
                  setIsExpanded(false);
                  onOpenHiTech50?.();
                }}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-yellow-400 text-left transition cursor-pointer group"
              >
                <Zap className="w-4 h-4 text-yellow-400 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-white block">50 Hi-Tech</span>
                <span className="text-[9px] text-stone-500">Quantum Hub</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
