import React, { useState } from 'react';
import {
  X, Clock, Coffee, Shield, Zap, ChevronRight, Check,
  Sparkles, Sliders, Smartphone, AlertCircle
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainFocusSetupModal({
  isOpen,
  onClose,
  onStartSession,
  onOpenAppBlockSelector
}) {
  const [activeTab, setActiveTab] = useState('timer'); // timer | stopwatch | pomodoro
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakCount, setBreakCount] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [isUltraFocus, setIsUltraFocus] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [showBreakPicker, setShowBreakPicker] = useState(false);

  const appBlocks = focusDataStore.getAppBlocks();
  const blockedCount = appBlocks.blockedAppsSummary || 6;

  if (!isOpen) return null;

  const handleContinue = () => {
    onStartSession({
      mode: activeTab,
      focusDurationSeconds: focusMinutes * 60,
      breakCount,
      breakDurationSeconds: breakMinutes * 60,
      isUltraFocus
    });
    onClose();
  };

  const presetDurations = [15, 25, 45, 60, 90, 120, 180];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#141517] border border-stone-800 rounded-t-[36px] sm:rounded-[36px] p-6 space-y-5 shadow-2xl text-white relative animate-in slide-in-from-bottom duration-300">
        {/* Top Drag Handle */}
        <div className="w-12 h-1.5 bg-stone-700/80 rounded-full mx-auto" />

        {/* Header Title */}
        <div className="text-center pt-1">
          <p className="text-xs font-medium text-emerald-400">
            Let's start your {focusMinutes} min focus {activeTab}
          </p>
        </div>

        {/* Mode Selector Tabs (Matches Screenshot) */}
        <div className="flex items-center justify-between p-1 bg-stone-900 rounded-2xl border border-stone-800">
          {/* Timer Tab */}
          <button
            onClick={() => setActiveTab('timer')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'timer'
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Timer
          </button>

          {/* Stopwatch Tab */}
          <button
            onClick={() => setActiveTab('stopwatch')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'stopwatch'
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Stopwatch
          </button>

          {/* Pomodoro Tab */}
          <button
            onClick={() => setActiveTab('pomodoro')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold relative transition-all ${
              activeTab === 'pomodoro'
                ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <span>Pomodoro</span>
            <span className="absolute top-2 right-4 w-1.5 h-1.5 rounded-full bg-amber-400" />
          </button>
        </div>

        {/* Rows: Focus time & Break */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 divide-y divide-stone-800 overflow-hidden">
          {/* Row 1: Focus Time */}
          <div
            onClick={() => setShowDurationPicker(!showDurationPicker)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-850 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-stone-200">Focus time</span>
            </div>
            <div className="flex items-center space-x-1.5 text-stone-400 hover:text-white">
              <span className="text-xs font-bold text-stone-300">{focusMinutes} mins</span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </div>
          </div>

          {/* Expandable Duration Picker */}
          {showDurationPicker && (
            <div className="p-4 bg-stone-950/70 space-y-3">
              <div className="flex flex-wrap gap-2">
                {presetDurations.map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setFocusMinutes(m);
                      setShowDurationPicker(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      focusMinutes === m
                        ? 'bg-emerald-500 text-stone-950 shadow-md'
                        : 'bg-stone-850 hover:bg-stone-800 text-stone-300 border border-stone-700/60'
                    }`}
                  >
                    {m < 60 ? `${m}m` : `${m / 60}h`}
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-xs text-stone-400 mb-1">
                  <span>Custom: {focusMinutes} minutes</span>
                  <span>(0 to Unlimited)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="300"
                  step="5"
                  value={focusMinutes}
                  onChange={(e) => setFocusMinutes(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Row 2: Break */}
          <div
            onClick={() => setShowBreakPicker(!showBreakPicker)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-850 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-semibold text-stone-200">Break</span>
            </div>
            <div className="flex items-center space-x-1.5 text-stone-400 hover:text-white">
              <span className="text-xs font-bold text-stone-300">{breakCount} break ({breakMinutes}m)</span>
              <ChevronRight className="w-4 h-4 text-stone-500" />
            </div>
          </div>

          {/* Expandable Break Picker */}
          {showBreakPicker && (
            <div className="p-4 bg-stone-950/70 space-y-3">
              <div className="flex space-x-2">
                {[0, 1, 2, 3].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setBreakCount(cnt)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      breakCount === cnt
                        ? 'bg-emerald-500 text-stone-950'
                        : 'bg-stone-850 text-stone-300 border border-stone-700/60'
                    }`}
                  >
                    {cnt === 0 ? 'No Break' : `${cnt} Break`}
                  </button>
                ))}
              </div>
              {breakCount > 0 && (
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Duration: {breakMinutes} mins</span>
                  <div className="flex space-x-1.5">
                    {[5, 10, 15].map(bm => (
                      <button
                        key={bm}
                        onClick={() => {
                          setBreakMinutes(bm);
                          setShowBreakPicker(false);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          breakMinutes === bm ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {bm}m
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Dual Cards (Matches Screenshot Exactly)                       */}
        {/* Left: Blocked apps card | Right: Ultra focus golden PRO card  */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left Card: Blocked Apps */}
          <div
            onClick={onOpenAppBlockSelector}
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-stone-900 border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between h-32"
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
              {/* Mini App icon stack */}
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[9px] font-bold text-white border border-stone-900">
                  ▶
                </span>
                <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[9px] font-bold text-white border border-stone-900">
                  f
                </span>
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[9px] font-bold text-white border border-stone-900">
                  W
                </span>
              </div>
            </div>

            <div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-1">
                {blockedCount} apps
              </span>
              <h4 className="text-xs font-bold text-stone-200">Blocked apps</h4>
            </div>
          </div>

          {/* Right Card: Ultra Focus PRO */}
          <div
            onClick={() => setIsUltraFocus(!isUltraFocus)}
            className={`p-4 rounded-2xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between h-32 relative overflow-hidden ${
              isUltraFocus
                ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 text-stone-950 shadow-xl shadow-amber-950/50'
                : 'bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#D97706] text-stone-950 shadow-lg'
            }`}
          >
            {/* Background Lightning bolt watermark */}
            <div className="absolute right-0 bottom-0 pointer-events-none opacity-25 translate-x-3 translate-y-3">
              <Zap className="w-24 h-24 text-white" />
            </div>

            <div className="flex items-center justify-between z-10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black text-amber-300">
                PRO
              </span>
              {isUltraFocus && (
                <div className="w-5 h-5 rounded-full bg-black text-amber-300 flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>

            <div className="z-10">
              <h4 className="text-sm font-black text-stone-950 leading-tight">Ultra focus</h4>
              <p className="text-[11px] font-semibold text-stone-900/80 mt-0.5">
                Achieve non stop focus
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bottom Button: "Continue" (Solid white pill)                  */}
        {/* ------------------------------------------------------------- */}
        <div className="pt-2">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-full font-black text-sm bg-white hover:bg-stone-200 text-stone-950 shadow-2xl transition-all active:scale-95 text-center"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
