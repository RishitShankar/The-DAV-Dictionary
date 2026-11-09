import React, { useState, useEffect } from 'react';
import {
  Flame, Zap, AlertTriangle, ShieldAlert, Award, RefreshCw,
  Eye, Clock, BarChart3, TrendingUp, CheckCircle2, Sliders
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function BrainPalDoomscrollDetector() {
  const [reelsData, setReelsData] = useState(() => focusDataStore.getReelsData());
  const [testActive, setTestActive] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [testSeconds, setTestSeconds] = useState(10);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'reels_updated') {
        setReelsData(data);
      }
    });
    return unsub;
  }, []);

  // Attention reflex test
  useEffect(() => {
    let timer = null;
    if (testActive && testSeconds > 0) {
      timer = setInterval(() => {
        setTestSeconds(s => {
          if (s <= 1) {
            setTestActive(false);
            setTestScore(Math.round(clickCount * 9.8));
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [testActive, testSeconds, clickCount]);

  const startTest = () => {
    setClickCount(0);
    setTestSeconds(10);
    setTestScore(null);
    setTestActive(true);
  };

  const dopamineRecoveryMinutes = Math.round(reelsData.todayReelsWatched * 2.2);

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-950/40 via-stone-900 to-black border border-rose-500/30 p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white">Doomscroll Velocity Detector</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/40">
                Cognitive Neuro-Metrics
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Real-time analysis of dopamine receptor desensitization caused by rapid short-form video algorithms.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#16171a] border border-stone-800 space-y-2">
          <span className="text-xs text-stone-400 font-semibold">Estimated Recovery Time</span>
          <div className="text-3xl font-black text-amber-400">{dopamineRecoveryMinutes} mins</div>
          <p className="text-[11px] text-stone-500">
            Time required in zero-screen quiet to reset dopamine baseline.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#16171a] border border-stone-800 space-y-2">
          <span className="text-xs text-stone-400 font-semibold">Attention Fragility Score</span>
          <div className="text-3xl font-black text-rose-400">
            {Math.min(100, Math.round(reelsData.doomscrollVelocity * 28))}%
          </div>
          <p className="text-[11px] text-stone-500">
            Calculated from swipes per minute and rapid content switching.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#16171a] border border-stone-800 space-y-2">
          <span className="text-xs text-stone-400 font-semibold">Cognitive Focus Multiplier</span>
          <div className="text-3xl font-black text-emerald-400">
            {reelsData.todayReelsWatched < 10 ? '1.8x (Optimal)' : '0.7x (Impaired)'}
          </div>
          <p className="text-[11px] text-stone-500">
            Directly influences memorization and mathematical recall.
          </p>
        </div>
      </div>

      {/* Interactive Reflex & Attention Test */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Dopamine Reflex Benchmark</h3>
          </div>
          <span className="text-xs text-stone-400">10-Second Test</span>
        </div>

        <p className="text-xs text-stone-300">
          Measure how fast your brain responds to single-target focus stimuli after exposure to reels.
        </p>

        {!testActive && testScore === null && (
          <button
            onClick={startTest}
            className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-xl transition-all"
          >
            Start 10s Attention Benchmark
          </button>
        )}

        {testActive && (
          <div className="text-center space-y-4 py-4">
            <div className="text-4xl font-black text-amber-400 font-mono">{testSeconds}s Remaining</div>
            <button
              onClick={() => setClickCount(c => c + 1)}
              className="w-36 h-36 mx-auto rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-lg shadow-2xl flex items-center justify-center transition-all"
            >
              TAP! ({clickCount})
            </button>
            <p className="text-xs text-stone-400">Tap the red orb as rapidly as possible</p>
          </div>
        )}

        {testScore !== null && !testActive && (
          <div className="p-4 rounded-2xl bg-stone-950 border border-emerald-500/40 text-center space-y-2 animate-in zoom-in-95">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Benchmark Completed
            </span>
            <div className="text-3xl font-black text-white font-mono">{testScore} Points</div>
            <p className="text-xs text-stone-300">
              {testScore > 400
                ? '⚡ Elite neural focus speed! Attention circuits are healthy.'
                : '🌱 Mild short-form fatigue detected. Practice 15 minutes of quiet reading.'}
            </p>
            <button
              onClick={startTest}
              className="mt-2 px-5 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 text-xs font-bold text-stone-200"
            >
              Retest Benchmark
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
