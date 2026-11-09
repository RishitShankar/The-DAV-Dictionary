import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, Lock, AlertTriangle, Clock, Sparkles, Check,
  X, RefreshCw, Smartphone, Flame, Heart, ArrowRight
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

/**
 * RegainInterventionOverlay - Full Screen System-Style Android Interceptor
 * Replicates the floating intervention popups seen in ai.regainapp & BrainPal.
 * When a student attempts to open a blocked app (YouTube, Instagram, Games),
 * this overlay captures attention with intentionality friction gates.
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
  const [step, setStep] = useState('intention'); // intention | friction_wait | reflection | locked
  const [intentionText, setIntentionText] = useState('');
  const [frictionCountdown, setFrictionCountdown] = useState(10);
  const [selectedIntent, setSelectedIntent] = useState(null);

  useEffect(() => {
    let timer = null;
    if (isOpen && step === 'friction_wait' && frictionCountdown > 0) {
      timer = setInterval(() => {
        setFrictionCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setStep('reflection');
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

  const handleBypass = () => {
    ambientAudio.playBellChime();
    if (onGrantBypass) onGrantBypass();
    onDismiss();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
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
                  Limit Exceeded
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5 font-mono">
                Used: {dailyUsageMinutes}m / {dailyLimitMinutes}m limit
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full bg-stone-850 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: INTENTIONALITY CHECK */}
        {step === 'intention' && (
          <div className="space-y-4 animate-in fade-in">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Friction Gate
              </span>
              <h2 className="text-xl font-black text-white">What is your intention?</h2>
              <p className="text-xs text-stone-400">
                Pause before opening {appName}. Why are you launching this app right now?
              </p>
            </div>

            <div className="space-y-2">
              {quickIntents.map((intent, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectIntent(intent)}
                  className="w-full p-3.5 rounded-2xl bg-stone-900/90 hover:bg-stone-850 border border-stone-800 hover:border-emerald-500/40 text-left text-xs text-stone-200 font-medium transition-all flex items-center justify-between group"
                >
                  <span>{intent}</span>
                  <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-emerald-400 transition-colors" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onDismiss}
                className="w-full py-3.5 rounded-full font-black text-xs bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-950 transition-all text-center"
              >
                Close App & Stay Focused
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: MANDATORY 10-SECOND FRICTION WAIT */}
        {step === 'friction_wait' && (
          <div className="text-center space-y-5 animate-in zoom-in-95 duration-200">
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
              className="w-full py-3 rounded-full font-bold text-xs bg-stone-800 hover:bg-stone-750 text-stone-300"
            >
              Cancel & Return to Study
            </button>
          </div>
        )}

        {/* STEP 3: FINAL REFLECTION & BYPASS OPTION */}
        {step === 'reflection' && (
          <div className="text-center space-y-5 animate-in fade-in">
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
                You can grant yourself a strict 5-minute emergency pass. After 5 minutes, {appName} will lock automatically.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onDismiss}
                className="w-full py-3.5 rounded-full font-black text-xs bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-lg shadow-emerald-950 transition-all text-center"
              >
                Never Mind, Go Back to Studying
              </button>

              <button
                onClick={handleBypass}
                className="w-full py-2.5 rounded-full font-semibold text-xs text-stone-400 hover:text-stone-200 transition-all text-center"
              >
                Grant 5-Minute Pass
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
