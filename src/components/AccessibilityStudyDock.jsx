import React, { useState, useEffect } from 'react';
import { 
  Eye, Volume2, VolumeX, Moon, Sun, Type, 
  Minus, Plus, Sparkles, Sliders, X, Check, CloudRain, Flame, Headphones 
} from 'lucide-react';
import { davAudio } from '../services/davAudioEngine';

export function AccessibilityStudyDock({ isOpen, onClose }) {
  // State preferences with localStorage persistence
  const [dyslexicFont, setDyslexicFont] = useState(() => {
    return localStorage.getItem('dav_a11y_dyslexic') === 'true';
  });
  const [readingRuler, setReadingRuler] = useState(() => {
    return localStorage.getItem('dav_a11y_ruler') === 'true';
  });
  const [textScale, setTextScale] = useState(() => {
    return parseInt(localStorage.getItem('dav_a11y_scale') || '100', 10);
  });
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('dav_a11y_contrast') === 'true';
  });
  const [nightWarmth, setNightWarmth] = useState(() => {
    return localStorage.getItem('dav_a11y_warmth') === 'true';
  });
  const [ambientSound, setAmbientSound] = useState('none');

  // Apply Dyslexia font to body
  useEffect(() => {
    if (dyslexicFont) {
      document.body.style.fontFamily = 'Comic Sans MS, Arial Rounded MT Bold, sans-serif';
    } else {
      document.body.style.fontFamily = '';
    }
    localStorage.setItem('dav_a11y_dyslexic', dyslexicFont.toString());
  }, [dyslexicFont]);

  // Apply Text Scaling to html element
  useEffect(() => {
    document.documentElement.style.fontSize = `${(textScale / 100) * 16}px`;
    localStorage.setItem('dav_a11y_scale', textScale.toString());
  }, [textScale]);

  // Apply High Contrast / Night filter
  useEffect(() => {
    let filterStyle = '';
    if (nightWarmth) {
      filterStyle += 'sepia(0.25) contrast(1.05) ';
    }
    if (highContrast) {
      filterStyle += 'contrast(1.3) brightness(1.05) ';
    }
    document.documentElement.style.filter = filterStyle.trim();
    localStorage.setItem('dav_a11y_contrast', highContrast.toString());
    localStorage.setItem('dav_a11y_warmth', nightWarmth.toString());
  }, [highContrast, nightWarmth]);

  // Handle Reading Ruler mouse position
  useEffect(() => {
    if (!readingRuler) {
      const existing = document.getElementById('dav-reading-ruler');
      if (existing) existing.remove();
      return;
    }

    let ruler = document.getElementById('dav-reading-ruler');
    if (!ruler) {
      ruler = document.createElement('div');
      ruler.id = 'dav-reading-ruler';
      ruler.style.position = 'fixed';
      ruler.style.left = '0';
      ruler.style.width = '100vw';
      ruler.style.height = '36px';
      ruler.style.background = 'rgba(245, 158, 11, 0.15)';
      ruler.style.borderTop = '2px solid rgba(245, 158, 11, 0.6)';
      ruler.style.borderBottom = '2px solid rgba(245, 158, 11, 0.6)';
      ruler.style.pointerEvents = 'none';
      ruler.style.zIndex = '99999';
      ruler.style.transition = 'top 0.05s ease-out';
      document.body.appendChild(ruler);
    }

    const handleMouseMove = (e) => {
      if (ruler) {
        ruler.style.top = `${e.clientY - 18}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    localStorage.setItem('dav_a11y_ruler', 'true');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      const existing = document.getElementById('dav-reading-ruler');
      if (existing) existing.remove();
    };
  }, [readingRuler]);

  // Handle Ambient Soundscape
  const handleToggleAmbient = (type) => {
    if (ambientSound === type) {
      davAudio.stopAmbient();
      setAmbientSound('none');
    } else {
      davAudio.startAmbient(type);
      setAmbientSound(type);
    }
  };

  const handleReset = () => {
    setDyslexicFont(false);
    setReadingRuler(false);
    setTextScale(100);
    setHighContrast(false);
    setNightWarmth(false);
    davAudio.stopAmbient();
    setAmbientSound('none');
    document.documentElement.style.filter = '';
    document.documentElement.style.fontSize = '16px';
    document.body.style.fontFamily = '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                <span>Accessibility & Focus Engine</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Concepts #172 - #189</span>
              </h2>
              <p className="text-xs text-stone-400">Inclusive Reading, Lo-Fi Soundscapes & Visual Accommodations</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Controls */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Text Sizing */}
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-amber-400" /> Dynamic Text Scale (Concept #175)
              </span>
              <span className="font-mono text-amber-400 font-bold">{textScale}%</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTextScale(prev => Math.max(80, prev - 10))}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input 
                type="range" 
                min="80" 
                max="140" 
                step="5"
                value={textScale}
                onChange={(e) => setTextScale(parseInt(e.target.value, 10))}
                className="flex-1 accent-amber-500 cursor-pointer"
              />
              <button
                onClick={() => setTextScale(prev => Math.min(140, prev + 10))}
                className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reading Aids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Dyslexia Font */}
            <button
              onClick={() => setDyslexicFont(!dyslexicFont)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                dyslexicFont 
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-900'
              }`}
            >
              <div className="text-xs font-bold mb-1 flex items-center justify-between">
                <span>Dyslexia-Friendly Font</span>
                {dyslexicFont && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-stone-400">High-legibility letterforms reducing letter flipping (Concept #172)</p>
            </button>

            {/* Reading Ruler */}
            <button
              onClick={() => setReadingRuler(!readingRuler)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                readingRuler 
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-900'
              }`}
            >
              <div className="text-xs font-bold mb-1 flex items-center justify-between">
                <span>Reading Guide Ruler</span>
                {readingRuler && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-stone-400">Follows cursor to focus on one sentence at a time (Concept #174)</p>
            </button>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                highContrast 
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-900'
              }`}
            >
              <div className="text-xs font-bold mb-1 flex items-center justify-between">
                <span>High Contrast Mode</span>
                {highContrast && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-stone-400">Deep blacks & vivid accents for low-vision clarity (Concept #176)</p>
            </button>

            {/* Night Warmth */}
            <button
              onClick={() => setNightWarmth(!nightWarmth)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                nightWarmth 
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300' 
                  : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:bg-stone-900'
              }`}
            >
              <div className="text-xs font-bold mb-1 flex items-center justify-between">
                <span>Night Eye Comfort</span>
                {nightWarmth && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </div>
              <p className="text-[11px] text-stone-400">Warm amber filter blocking blue light for late night study (Concept #183)</p>
            </button>

          </div>

          {/* Lo-Fi Ambient Study Soundscape */}
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-200 flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-amber-400" />
                <span>Lo-Fi Ambient Soundscape Mixer (Concept #189)</span>
              </span>
              <span className="text-[10px] text-stone-500">Synthesized Offline</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleToggleAmbient('rain')}
                className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                  ambientSound === 'rain'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700/60 hover:bg-stone-800'
                }`}
              >
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                <span>Monsoon Rain</span>
              </button>

              <button
                onClick={() => handleToggleAmbient('campfire')}
                className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                  ambientSound === 'campfire'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700/60 hover:bg-stone-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Campfire</span>
              </button>

              <button
                onClick={() => handleToggleAmbient('binaural_focus')}
                className={`py-2 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
                  ambientSound === 'binaural_focus'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700/60 hover:bg-stone-800'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Alpha Waves</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/70 text-xs text-stone-500 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-stone-400 hover:text-stone-200 underline text-xs"
          >
            Reset All Accommodations
          </button>
          <span>Auto-persisted in local storage</span>
        </div>

      </div>
    </div>
  );
}
