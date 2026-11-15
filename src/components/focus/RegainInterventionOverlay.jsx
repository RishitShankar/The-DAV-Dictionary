import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Lock, AlertTriangle, Clock, Sparkles, Check,
  X, RefreshCw, Smartphone, Flame, Heart, ArrowRight, BookOpen,
  Brain, ShieldCheck
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

/**
 * RegainInterventionOverlay - Full Screen System-Style Android Interceptor
 * Replicates the floating intervention popups seen in ai.regainapp & BrainPal.
 * When a student attempts to open a blocked app (YouTube, Instagram, Games),
 * this overlay captures attention with intentionality friction gates and math challenges.
 */
export function RegainInterventionOverlay({
  isOpen,
  appName = 'Instagram',
  appIcon = '📸',
  dailyUsageMinutes = 42,
  dailyLimitMinutes = 30,
  onDismiss,
  onGrantBypass
}) {
  const [step, setStep] = useState('intention'); // intention | friction_wait | math_gate | reflection | locked
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [frictionCountdown, setFrictionCountdown] = useState(10);
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathError, setMathError] = useState(false);
  const [mathProblem, setMathProblem] = useState({ q: '14 × 7 - 18', a: 80 });

  // Play warning chime when interceptor appears
  useEffect(() => {
    if (isOpen) {
      ambientAudio.playWarningChime();
      setStep('intention');
      setFrictionCountdown(10);
      setMathAnswer('');
      setMathError(false);
      // Generate a quick math problem
      const a = Math.floor(Math.random() * 8) + 12; // 12-19
      const b = Math.floor(Math.random() * 6) + 4;  // 4-9
      const sub = Math.floor(Math.random() * 15) + 5;
      setMathProblem({ q: `${a} × ${b} - ${sub}`, a: a * b - sub });
    }
  }, [isOpen, appName]);

  useEffect(() => {
    let timer = null;
    if (isOpen && step === 'friction_wait' && frictionCountdown > 0) {
      timer = setInterval(() => {
        setFrictionCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep('reflection');
            ambientAudio.playBellChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isOpen, step, frictionCountdown]);

  if (!isOpen) return null;

  const quickIntents = [
    'Replying to an urgent study group message',
    'Checking class notes or syllabus update',
    'Just feeling bored / impulsive urge',
    'Looking up a formula explanation'
  ];

  const handleSelectIntent = (intent) => {
    setSelectedIntent(intent);
    setFrictionCountdown(10);
    setStep('friction_wait');
  };

  const handleVerifyMath = (e) => {
    e.preventDefault();
    if (parseInt(mathAnswer.trim(), 10) === mathProblem.a) {
      ambientAudio.playBellChime();
      setStep('reflection');
      setMathError(false);
    } else {
      ambientAudio.playWarningChime();
      setMathError(true);
    }
  };

  const handleBypass = () => {
    ambientAudio.playBellChime();
    if (onGrantBypass) onGrantBypass();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="w-full max-w-md bg-[#111216] border border-stone-800 rounded-[36px] p-6 space-y-6 shadow-2xl relative text-white">
        
        {/* Top Floating App Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-850">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-850 border border-stone-750 flex items-center justify-center text-2xl shadow-lg">
              {appIcon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-white">{appName} Intercepted</h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Stopped
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-mono">
                Used: {dailyUsageMinutes}m / {dailyLimitMinutes}m limit
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full bg-stone-850 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: INTENTIONALITY CHECK */}
        {step === 'intention' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Background Focus Shield Active</span>
              </span>
              <h2 className="text-xl font-black text-white">Why are you opening {appName}?</h2>
              <p className="text-xs text-stone-400">
                Pause before opening. Pick your intention or solve a math challenge to unlock.
              </p>
            </div>

            <div className="space-y-2">
              {quickIntents.map((intent, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectIntent(intent)}
                  className="w-full p-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/40 text-left text-xs text-stone-200 font-medium transition flex items-center justify-between group cursor-pointer"
                >
                  <span>{intent}</span>
                  <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onDismiss}
                className="w-full py-3.5 rounded-2xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 shadow-lg shadow-emerald-950 transition text-center cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Close App &amp; Open DAV Textbooks</span>
              </button>

              <button
                onClick={() => setStep('math_gate')}
                className="w-full py-2.5 rounded-xl text-stone-400 hover:text-stone-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Solve CBSE Math Challenge to Unlock</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MANDATORY 10-SECOND FRICTION WAIT */}
        {step === 'friction_wait' && (
          <div className="text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Mandatory Reflection Delay
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Wait {frictionCountdown}s
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-xs mx-auto">
                Selected Intent: <em>"{selectedIntent}"</em>
              </p>
            </div>

            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-1000"
                style={{ width: `${((10 - frictionCountdown) / 10) * 100}%` }}
              />
            </div>

            <p className="text-[11px] text-stone-500 italic">
              "Your DAV exams don't care about what went viral today. Keep your attention safe."
            </p>

            <button
              onClick={onDismiss}
              className="w-full py-3 rounded-2xl font-bold text-xs bg-stone-800 hover:bg-stone-750 text-stone-300 cursor-pointer"
            >
              Cancel &amp; Return to Study
            </button>
          </div>
        )}

        {/* STEP 3: MATH CHALLENGE GATE */}
        {step === 'math_gate' && (
          <form onSubmit={handleVerifyMath} className="text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Brain className="w-7 h-7" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                CBSE Class 10 Math Friction Gate
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Calculate: {mathProblem.q} = ?
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Prove you are in a logical thinking state before opening distracting media.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="number"
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="Enter numerical answer"
                className="w-full py-2.5 px-4 rounded-xl bg-stone-900 border border-stone-700 text-center text-lg font-mono font-black text-white focus:outline-none focus:border-purple-500"
                autoFocus
              />
              {mathError && (
                <span className="text-xs text-rose-400 font-bold block animate-bounce">
                  Incorrect answer! Recalculate carefully.
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep('intention')}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black cursor-pointer shadow-lg"
              >
                Verify &amp; Unlock
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: FINAL REFLECTION & BYPASS OPTION */}
        {step === 'reflection' && (
          <div className="text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Mindfulness Unlocked
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Still need to use {appName}?
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                You can grant yourself a strict 5-minute pass. After 5 minutes, {appName} will lock automatically.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onDismiss}
                className="w-full py-3.5 rounded-2xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 shadow-lg shadow-emerald-950 transition cursor-pointer"
              >
                Never Mind, Go Back to Studying
              </button>

              <button
                onClick={handleBypass}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-stone-400 hover:text-stone-200 transition cursor-pointer"
              >
                Grant 5-Minute Emergency Pass
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
