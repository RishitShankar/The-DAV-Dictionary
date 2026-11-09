import React, { useState, useEffect } from 'react';
import {
  Volume2, VolumeX, Music, Sparkles, Sliders, Play, Pause,
  CloudRain, Wind, Flame, Compass, Radio, Heart
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

/**
 * RegainSoundscapesPlayer - Dedicated Web Audio Ambient & Binaural Studio
 * Synthesizes pure procedural audio with zero network latency.
 */
export function RegainSoundscapesPlayer() {
  const [activeTrack, setActiveTrack] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [binauralFreq, setBinauralFreq] = useState(432); // 432Hz | 528Hz | 40Hz Gamma

  const soundscapes = [
    {
      id: 'binaural_432',
      name: '432Hz Alpha Waves',
      tagline: 'Deep flow state & cognitive calm',
      icon: '🧠',
      frequencyLabel: '432 Hz',
      gradient: 'from-indigo-900 to-purple-950'
    },
    {
      id: 'rain',
      name: 'Monsoon Rain on Glass',
      tagline: 'Filtered pink noise with gentle modulation',
      icon: '🌧️',
      frequencyLabel: '800 Hz LPF',
      gradient: 'from-blue-950 to-slate-950'
    },
    {
      id: 'white_noise',
      name: 'Pure White Static',
      tagline: 'Blocks outside voices and campus chatter',
      icon: '📻',
      frequencyLabel: 'Full Spectrum',
      gradient: 'from-stone-900 to-zinc-950'
    },
    {
      id: 'zen_bowl',
      name: 'Tibetan Harmonic Bell',
      tagline: 'Singing bowl intervals for mindful pacing',
      icon: '🔔',
      frequencyLabel: '280 Hz Fundamental',
      gradient: 'from-amber-950 to-yellow-950'
    }
  ];

  const handleToggle = (trackId) => {
    if (activeTrack === trackId) {
      ambientAudio.stopAll();
      setActiveTrack(null);
    } else {
      setActiveTrack(trackId);
      ambientAudio.playTrack(trackId);
    }
  };

  const handleVolumeChange = (newVal) => {
    setVolume(newVal);
    ambientAudio.setVolume(newVal);
  };

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#121922] via-stone-900 to-black border border-stone-800 p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Music className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white">Audio Synthesis Studio</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                Web Audio DSP
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Zero-bandwidth procedural focus soundscapes generated directly in your browser or APK via Web Audio API.
            </p>
          </div>
        </div>

        {/* Master Volume Slider */}
        <div className="mt-6 p-4 rounded-2xl bg-stone-950/80 border border-stone-850 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-300">
            {volume === 0 ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
            <span>Master Synthesis Volume</span>
          </div>
          <div className="flex-1 max-w-xs flex items-center space-x-3">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <span className="font-mono text-xs font-bold text-indigo-300 w-10 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Soundscape Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {soundscapes.map((sc) => {
          const isPlaying = activeTrack === sc.id;
          return (
            <div
              key={sc.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between h-44 relative overflow-hidden bg-gradient-to-br ${sc.gradient} ${
                isPlaying
                  ? 'border-indigo-400/80 shadow-xl shadow-indigo-950/60 ring-2 ring-indigo-500/20'
                  : 'border-stone-800/80 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between z-10">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{sc.icon}</span>
                  <div>
                    <h4 className="text-base font-black text-white">{sc.name}</h4>
                    <span className="font-mono text-[10px] text-indigo-300 font-bold">
                      {sc.frequencyLabel}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(sc.id)}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-lg ${
                    isPlaying
                      ? 'bg-white text-stone-950 font-black'
                      : 'bg-stone-900/80 border border-white/20 text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-stone-950" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>
              </div>

              <div className="z-10">
                <p className="text-xs text-stone-300">{sc.tagline}</p>
                {isPlaying && (
                  <div className="flex items-center space-x-1.5 mt-2 text-indigo-300 text-[10px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                    <span>Oscillating in real-time</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
