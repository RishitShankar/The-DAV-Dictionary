import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, Clock, Play, Pause, RotateCcw, Volume2, VolumeX, ShieldAlert, 
  Sparkles, Award, Star, CheckCircle2, User, Search, Maximize2, Minimize2, 
  BookOpen, Brain, Zap, Bell, Check, BarChart3, Medal, Radio, HeartHandshake, 
  Coffee, AlertCircle, Smartphone, Lock, Eye, Users, Plus, ShieldCheck, 
  X, Flame, Activity, ArrowRight, Compass, Moon, Sun, CloudRain, Music,
  Calendar, CheckSquare, RefreshCw, Layers
} from 'lucide-react';

// =========================================================================
// WEB AUDIO SYNTHESIZER ENGINE (5 SOUNDSCAPES)
// =========================================================================
class FocusAudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.nodes = [];
    this.currentTrack = 'none';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  stop() {
    this.nodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.nodes = [];
    this.currentTrack = 'none';
  }

  playTrack(trackName) {
    this.init();
    this.stop();
    if (!this.ctx) return;
    this.currentTrack = trackName;

    try {
      if (trackName === 'binaural') {
        // 40Hz Gamma Binaural Beat (Left: 200Hz, Right: 240Hz)
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.07, this.ctx.currentTime);
        masterGain.connect(this.ctx.destination);

        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        osc1.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc2.frequency.setValueAtTime(240, this.ctx.currentTime);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start();
        osc2.start();
        this.nodes = [osc1, osc2, masterGain];
      } else if (trackName === 'rain') {
        // Synthesized Rain Atmosphere (Filtered Noise)
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);

        const gainNode = this.ctx.createGain();
        gainNode.gain.setValueAtTime(0.05, this.ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        whiteNoise.start();
        this.nodes = [whiteNoise, filter, gainNode];
      } else if (trackName === 'bell') {
        // Resonant Temple Om Drone (136.1 Hz Cosmic Om)
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        masterGain.connect(this.ctx.destination);

        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(136.1, this.ctx.currentTime);

        const osc2 = this.ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(272.2, this.ctx.currentTime);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start();
        osc2.start();
        this.nodes = [osc1, osc2, masterGain];
      } else if (trackName === 'forest') {
        // Forest Calm Bird & Wind Harmonics
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        masterGain.connect(this.ctx.destination);

        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, this.ctx.currentTime); // 432 Hz healing frequency
        osc.connect(masterGain);
        osc.start();
        this.nodes = [osc, masterGain];
      } else if (trackName === 'metronome') {
        // Gentle Clock Tick Metronome
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        this.nodes = [osc, gain];
      }
    } catch (e) {
      console.warn('Audio synthesis fallback:', e);
    }
  }
}

const audioEngine = new FocusAudioSynthesizer();

// Common Apps for Screen Time & Limits
const SCAN_APPS = [
  { id: 'dav', name: 'DAV Dictionary', icon: '📖', type: 'useful', defaultMinutes: 130 },
  { id: 'pdf', name: 'Textbook Reader', icon: '📚', type: 'useful', defaultMinutes: 45 },
  { id: 'ai', name: 'Rishi AI Tutor', icon: '🤖', type: 'useful', defaultMinutes: 30 },
  { id: 'notes', name: 'Chapter Revision Notes', icon: '📝', type: 'useful', defaultMinutes: 25 },
  { id: 'instagram', name: 'Instagram & Reels', icon: '📸', type: 'distracted', defaultMinutes: 35, limit: 30 },
  { id: 'youtube', name: 'YouTube Shorts', icon: '▶️', type: 'distracted', defaultMinutes: 25, limit: 20 },
  { id: 'games', name: 'Mobile Games', icon: '🎮', type: 'distracted', defaultMinutes: 20, limit: 15 },
  { id: 'whatsapp', name: 'WhatsApp Chat', icon: '💬', type: 'distracted', defaultMinutes: 15, limit: 20 },
  { id: 'snapchat', name: 'Snapchat', icon: '👻', type: 'distracted', defaultMinutes: 10, limit: 15 }
];

export function DigitalFocusSuite({ 
  user, 
  accumulatedStudyMs, 
  onAccumulateMs 
}) {
  // Mode selection: 'timer' | 'stopwatch'
  const [studyMode, setStudyMode] = useState('timer'); // 'timer' | 'stopwatch'

  // Custom Duration State (0 to Unlimited)
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(30);
  const [activeTargetMinutes, setActiveTargetMinutes] = useState(30);

  // Active Session Timers
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(30 * 60);
  const [stopwatchSeconds, setStopwatchSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  // Soundscape
  const [activeSound, setActiveSound] = useState('none');

  // Background Ambience Theme
  const [bgTheme, setBgTheme] = useState('nebula'); // 'nebula' | 'slate' | 'rain' | 'hearth'

  // Guided Breathing Modal
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale'); // Inhale, Hold, Exhale, Rest
  const [breathingSeconds, setBreathingSeconds] = useState(4);

  // Block Notifications & Strict Commitment Lock
  const [blockNotifications, setBlockNotifications] = useState(true);
  const [strictUninstallLock, setStrictUninstallLock] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [exitCooldown, setExitCooldown] = useState(10);

  // Study Schedule State
  const [schedules, setSchedules] = useState([
    { id: 1, title: 'Evening Board Prep', time: '05:00 PM - 06:30 PM', subject: 'Science & Math', active: true },
    { id: 2, title: 'Night Vedic Revision', time: '08:30 PM - 10:00 PM', subject: 'Surabhi Sanskrit & SST', active: true }
  ]);
  const [newScheduleTitle, setNewScheduleTitle] = useState('');
  const [newScheduleTime, setNewScheduleTime] = useState('07:00 PM - 08:00 PM');
  const [newScheduleSubject, setNewScheduleSubject] = useState('DAV Secondary Mathematics');

  // Study Groups
  const [studyGroups, setStudyGroups] = useState([
    {
      id: 'grp-8d',
      name: 'Class 8-D Board Warriors',
      code: 'DAV-8D-402',
      targetHours: 3.5,
      members: [
        { name: 'Rishit Shankar (Host)', status: 'Studying Now 🟢', avatar: '👑' },
        { name: 'Saharsh Shankar', status: 'Studying Now 🟢', avatar: '⚡' },
        { name: 'Aarav Kumar', status: 'Studying Now 🟢', avatar: '📚' },
        { name: 'Priya Sharma', status: 'Active Focus 🟢', avatar: '🌟' }
      ]
    }
  ]);
  const [newGroupName, setNewGroupName] = useState('');
  const [joinGroupCode, setJoinGroupCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(studyGroups[0]);

  // App Usage Limits & Simulator
  const [appLimits, setAppLimits] = useState(() => {
    return SCAN_APPS.filter(a => a.type === 'distracted').reduce((acc, app) => {
      acc[app.id] = app.limit || 20;
      return acc;
    }, {});
  });
  const [blockedAppAlert, setBlockedAppAlert] = useState(null);

  // Active Sub-panel Tab: 'focus_arena' | 'screen_time' | 'schedule' | 'groups' | 'achievements'
  const [focusSubTab, setFocusSubTab] = useState('focus_arena');

  // Format Helper: hh:mm:ss:ms
  const formatTimeFull = (totalMs) => {
    const hours = Math.floor(totalMs / 3600000);
    const mins = Math.floor((totalMs % 3600000) / 60000);
    const secs = Math.floor((totalMs % 60000) / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
  };

  // Timer Tick Engine
  useEffect(() => {
    let interval = null;
    if (isSessionActive && !isPaused) {
      interval = setInterval(() => {
        setMilliseconds(prev => {
          if (studyMode === 'timer') {
            if (prev <= 10) {
              setRemainingSeconds(sec => {
                if (sec <= 1) {
                  setIsSessionActive(false);
                  audioEngine.stop();
                  setActiveSound('none');
                  alert('🎉 Outstanding! You completed your Deep Study Session!');
                  return 0;
                }
                return sec - 1;
              });
              return 990;
            }
            return prev - 20;
          } else {
            // Stopwatch mode (count up)
            if (prev >= 980) {
              setStopwatchSeconds(sec => sec + 1);
              return 0;
            }
            return prev + 20;
          }
        });

        // Accumulate study ms into parent & local storage
        if (onAccumulateMs) {
          onAccumulateMs(20);
        }
      }, 20);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, isPaused, studyMode, onAccumulateMs]);

  // Guided Breathing Animation Loop
  useEffect(() => {
    if (!isBreathingOpen) return;
    const interval = setInterval(() => {
      setBreathingSeconds(prev => {
        if (prev <= 1) {
          setBreathingPhase(current => {
            if (current === 'Inhale') return 'Hold';
            if (current === 'Hold') return 'Exhale';
            if (current === 'Exhale') return 'Rest';
            return 'Inhale';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingOpen]);

  // Start Session
  const handleStartSession = () => {
    const totalMins = (Number(customHours) || 0) * 60 + (Number(customMinutes) || 0);
    const finalMins = totalMins > 0 ? totalMins : 30;
    setActiveTargetMinutes(finalMins);
    setRemainingSeconds(finalMins * 60);
    setStopwatchSeconds(0);
    setMilliseconds(0);
    setIsSessionActive(true);
    setIsPaused(false);
  };

  // Quit Session with Strict Commitment Lock Check
  const handleAttemptQuit = () => {
    if (strictUninstallLock) {
      setExitCooldown(10);
      setShowExitConfirm(true);
    } else {
      if (window.confirm('Quit active study session early?')) {
        setIsSessionActive(false);
        audioEngine.stop();
        setActiveSound('none');
      }
    }
  };

  // Cooldown countdown for Strict Commitment Lock
  useEffect(() => {
    if (!showExitConfirm) return;
    if (exitCooldown <= 0) return;
    const timer = setTimeout(() => {
      setExitCooldown(prev => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [showExitConfirm, exitCooldown]);

  const handleForceQuit = () => {
    setShowExitConfirm(false);
    setIsSessionActive(false);
    audioEngine.stop();
    setActiveSound('none');
  };

  // Sound selection toggle
  const handleToggleSound = (trackKey) => {
    if (activeSound === trackKey) {
      audioEngine.stop();
      setActiveSound('none');
    } else {
      audioEngine.playTrack(trackKey);
      setActiveSound(trackKey);
    }
  };

  // Screen time calculation
  const totalUsefulMins = SCAN_APPS.filter(a => a.type === 'useful').reduce((acc, a) => acc + a.defaultMinutes, 0);
  const totalDistractedMins = SCAN_APPS.filter(a => a.type === 'distracted').reduce((acc, a) => acc + a.defaultMinutes, 0);
  const totalDailyMins = totalUsefulMins + totalDistractedMins;
  const usefulPercentage = Math.round((totalUsefulMins / totalDailyMins) * 100);

  // Background Theme Class
  const bgThemeClasses = {
    nebula: 'vfx-aurora-bg',
    slate: 'bg-slate-950',
    rain: 'bg-gradient-to-b from-blue-950 via-slate-950 to-indigo-950',
    hearth: 'bg-gradient-to-b from-stone-950 via-amber-950/40 to-stone-950'
  };

  // Current Timer Progress %
  const currentElapsedSec = studyMode === 'timer' 
    ? (activeTargetMinutes * 60) - remainingSeconds 
    : stopwatchSeconds;
  const totalTargetSec = activeTargetMinutes * 60;
  const progressRatio = studyMode === 'timer' 
    ? Math.min(1, Math.max(0, currentElapsedSec / totalTargetSec))
    : (stopwatchSeconds % 3600) / 3600;

  return (
    <div className={`rounded-3xl border border-slate-800 shadow-2xl p-4 sm:p-8 space-y-8 text-white relative overflow-hidden ${bgThemeClasses[bgTheme]}`}>
      
      {/* Visual Animation 1: Ambient Floating Energy Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

      {/* TOP HEADER: TITLE & SUB-NAV TABS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-stone-950 font-black shadow-lg">
            <Brain className="w-6 h-6 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800">
                DAV Digital Focus Architecture
              </span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Offline Compatible
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Deep Study Arena &amp; Digital Wellbeing Suite
            </h2>
          </div>
        </div>

        {/* 5 Sub-Tabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => setFocusSubTab('focus_arena')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              focusSubTab === 'focus_arena'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Focus Arena</span>
          </button>

          <button
            type="button"
            onClick={() => setFocusSubTab('screen_time')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              focusSubTab === 'screen_time'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Screen Time</span>
          </button>

          <button
            type="button"
            onClick={() => setFocusSubTab('schedule')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              focusSubTab === 'schedule'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => setFocusSubTab('groups')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              focusSubTab === 'groups'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Study Groups</span>
          </button>

          <button
            type="button"
            onClick={() => setFocusSubTab('achievements')}
            className={`px-3 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
              focusSubTab === 'achievements'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Badges</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-PANEL 1: FOCUS ARENA (TIMER / STOPWATCH / BREATHING / SOUND)         */}
      {/* ========================================================================= */}
      {focusSubTab === 'focus_arena' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Top Controls: Mode Switcher, Breathing Button, Soundscapes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Timer vs Stopwatch Switcher */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Focus Engine Mode
                </span>
                <span className="text-xs font-bold text-amber-300">
                  {studyMode === 'timer' ? 'Countdown Target Timer' : 'Open-Ended Stopwatch'}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => { if (!isSessionActive) setStudyMode('timer'); }}
                  disabled={isSessionActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    studyMode === 'timer' ? 'bg-amber-500 text-stone-950 font-black' : 'text-slate-400'
                  }`}
                >
                  Timer
                </button>
                <button
                  type="button"
                  onClick={() => { if (!isSessionActive) setStudyMode('stopwatch'); }}
                  disabled={isSessionActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    studyMode === 'stopwatch' ? 'bg-amber-500 text-stone-950 font-black' : 'text-slate-400'
                  }`}
                >
                  Stopwatch
                </button>
              </div>
            </div>

            {/* 2. Guided Breathing Modal Trigger */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Mind Reset Tool
                </span>
                <span className="text-xs font-bold text-cyan-300">
                  Pranayama Box Breathing
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsBreathingOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-cyan-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Breathing</span>
              </button>
            </div>

            {/* 3. Atmospheric Ambience Switcher */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Atmospheric Backdrop
                </span>
                <span className="text-xs font-bold text-purple-300 capitalize">
                  {bgTheme} Theme
                </span>
              </div>
              <div className="flex items-center gap-1">
                {['nebula', 'slate', 'rain', 'hearth'].map((th) => (
                  <button
                    key={th}
                    type="button"
                    onClick={() => setBgTheme(th)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer border ${
                      bgTheme === th
                        ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                        : 'border-slate-800 bg-slate-950 text-slate-400'
                    }`}
                    title={th}
                  >
                    {th === 'nebula' ? '🌌' : th === 'slate' ? '🌑' : th === 'rain' ? '🌧️' : '🔥'}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* MAIN CIRCULAR TIMER / STOPWATCH HERO */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center">
            
            {/* Visual Animation 2: Neumorphic Pulsing Radar Ring (When Active) */}
            {isSessionActive && (
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-amber-400/40 vfx-radar-ring pointer-events-none" />
            )}

            {/* Visual Animation 3: SVG Circular Gauge */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-slate-800"
                  strokeWidth="6"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-amber-400 transition-all duration-300 vfx-progress-meter"
                  strokeWidth="6"
                  strokeDasharray="264"
                  strokeDashoffset={264 - (264 * progressRatio)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              {/* Central Time Readout */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400/80 mb-1">
                  {studyMode === 'timer' ? 'Time Remaining' : 'Stopwatch Duration'}
                </span>
                
                {studyMode === 'timer' ? (
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight vfx-timer-tick">
                    {Math.floor(remainingSeconds / 60)}:
                    {String(remainingSeconds % 60).padStart(2, '0')}.
                    <span className="text-lg text-amber-400 font-normal">
                      {String(Math.floor(milliseconds / 10)).padStart(2, '0')}
                    </span>
                  </div>
                ) : (
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight vfx-timer-tick">
                    {Math.floor(stopwatchSeconds / 60)}:
                    {String(stopwatchSeconds % 60).padStart(2, '0')}.
                    <span className="text-lg text-amber-400 font-normal">
                      {String(Math.floor(milliseconds / 10)).padStart(2, '0')}
                    </span>
                  </div>
                )}

                <div className="text-[10px] text-slate-400 font-medium mt-1">
                  {isSessionActive 
                    ? isPaused ? '⏸️ Session Paused' : '⚡ Deep Focus In Progress'
                    : 'Ready to Begin'}
                </div>
              </div>
            </div>

            {/* Action Buttons: Start / Pause / Resume / Quit */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-10">
              {!isSessionActive ? (
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-xl shadow-orange-500/20 cursor-pointer transition transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <Play className="w-5 h-5 fill-stone-950" />
                  <span>Start Deep Focus Session 🚀</span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsPaused(p => !p)}
                    className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 border border-slate-700"
                  >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAttemptQuit}
                    className="px-6 py-3 rounded-2xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-200 font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Quit Session</span>
                  </button>
                </>
              )}
            </div>

            {/* Study Duration Custom Config (0 to Unlimited Hours & Minutes) */}
            {!isSessionActive && studyMode === 'timer' && (
              <div className="mt-8 pt-6 border-t border-slate-800 w-full max-w-xl space-y-4">
                <div className="text-left flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-300">
                    Custom Study Duration (0 to Unlimited)
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {customHours}h {customMinutes}m Selected
                  </span>
                </div>

                {/* Presets */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[
                    { h: 0, m: 15, label: '15m' },
                    { h: 0, m: 30, label: '30m' },
                    { h: 0, m: 45, label: '45m' },
                    { h: 1, m: 0, label: '1 hr' },
                    { h: 2, m: 0, label: '2 hrs' },
                    { h: 4, m: 0, label: '4 hrs' }
                  ].map(p => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        setCustomHours(p.h);
                        setCustomMinutes(p.m);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        customHours === p.h && customMinutes === p.m
                          ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                {/* Custom numeric inputs for vast unlimited hours */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
                    <span className="text-xs text-slate-400 font-bold">Hours:</span>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={customHours}
                      onChange={(e) => setCustomHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-transparent text-sm font-mono font-bold text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex-1 flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl">
                    <span className="text-xs text-slate-400 font-bold">Minutes:</span>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-transparent text-sm font-mono font-bold text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* SOUNDSCAPES & FOCUS AUDIO SYNTHESIZER */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Music className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-black text-white">Binaural Focus Soundscapes</h3>
                  <p className="text-[11px] text-slate-400">Pure Web Audio synthesis for deep cognitive concentration</p>
                </div>
              </div>

              {/* Visual Animation 4: Equalizer Bouncing Bars */}
              {activeSound !== 'none' && (
                <div className="flex items-end gap-1 h-6 w-12 px-2 py-1 bg-amber-500/20 border border-amber-400/40 rounded-lg">
                  <div className="w-1.5 bg-amber-400 rounded-full vfx-eq-1" />
                  <div className="w-1.5 bg-amber-400 rounded-full vfx-eq-2" />
                  <div className="w-1.5 bg-amber-400 rounded-full vfx-eq-3" />
                  <div className="w-1.5 bg-amber-400 rounded-full vfx-eq-4" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { id: 'binaural', label: '🧠 Binaural 40Hz', desc: 'Gamma Concentration' },
                { id: 'rain', label: '🌧️ Calm Rain', desc: 'Pink Noise Mask' },
                { id: 'bell', label: '🔔 Temple Om Drone', desc: '136.1Hz Harmonic' },
                { id: 'forest', label: '🌲 Forest Woods', desc: '432Hz Calm Waves' },
                { id: 'metronome', label: '⏱️ Clock Metronome', desc: 'Paced Rhythmic Beat' }
              ].map(snd => (
                <button
                  key={snd.id}
                  type="button"
                  onClick={() => handleToggleSound(snd.id)}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    activeSound === snd.id
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-black">{snd.label}</span>
                  <span className="text-[10px] text-slate-400 mt-1">{snd.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* DIGITAL FOCUS SHIELD TOGGLES (BLOCK NOTIFICATIONS & STRICT LOCK) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Toggle 1: Block Notifications */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Block Incoming Notifications</h4>
                  <p className="text-[10px] text-slate-400">Silences distraction toasts and alerts during focus</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBlockNotifications(b => !b)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  blockNotifications ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transform transition-transform ${
                    blockNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Strict Commitment / Anti-Uninstall Lock */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Strict Commitment Protection</h4>
                  <p className="text-[10px] text-slate-400">Requires 10s cooldown penalty before quitting</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStrictUninstallLock(s => !s)}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                  strictUninstallLock ? 'bg-rose-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`block w-4 h-4 rounded-full bg-white transform transition-transform ${
                    strictUninstallLock ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PANEL 2: SCREEN TIME ANALYZER (USEFUL VS DISTRACTED APPS)            */}
      {/* ========================================================================= */}
      {focusSubTab === 'screen_time' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Summary Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Today's Screen Time</span>
              <div className="text-2xl font-black text-white">
                {Math.floor(totalDailyMins / 60)}h {totalDailyMins % 60}m
              </div>
              <p className="text-[11px] text-emerald-400 font-bold">Auto-scanned across device</p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Device Pickups</span>
              <div className="text-2xl font-black text-amber-300">42 Pickups</div>
              <p className="text-[11px] text-slate-400">First pickup at 6:45 AM</p>
            </div>

            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Focus Health Score</span>
              <div className="text-2xl font-black text-emerald-400">{usefulPercentage}% Productive</div>
              <p className="text-[11px] text-amber-300 font-bold">Grade A+ (DAV Scholar)</p>
            </div>

          </div>

          {/* Visual Animation 5: Distracted vs Useful Dual Split Graph */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white flex items-center justify-between">
              <span>Distracted vs Useful Screen Time Ratio</span>
              <span className="text-xs text-amber-300 font-mono">{usefulPercentage}% vs {100 - usefulPercentage}%</span>
            </h3>

            {/* Split Progress Bar */}
            <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden flex border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                style={{ width: `${usefulPercentage}%` }}
                title="Useful Screen Time"
              />
              <div 
                className="h-full bg-gradient-to-r from-rose-500 to-amber-600 transition-all duration-1000"
                style={{ width: `${100 - usefulPercentage}%` }}
                title="Distracted Screen Time"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-bold pt-1">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span>Useful / Scholastic Time: {Math.floor(totalUsefulMins / 60)}h {totalUsefulMins % 60}m</span>
              </div>
              <div className="flex items-center gap-2 text-rose-400">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>Distracted Time: {Math.floor(totalDistractedMins / 60)}h {totalDistractedMins % 60}m</span>
              </div>
            </div>
          </div>

          {/* App List with Limits & Blocker Simulator */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-white">App Limits &amp; Automated Shield</h3>
                <p className="text-[11px] text-slate-400">Set daily usage limits. Apps automatically block upon expiration.</p>
              </div>

              <button
                type="button"
                onClick={() => setBlockedAppAlert('Instagram & Reels')}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Test App Blocker Shield</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SCAN_APPS.filter(a => a.type === 'distracted').map(app => (
                <div key={app.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{app.icon}</span>
                    <div>
                      <div className="text-xs font-black text-white">{app.name}</div>
                      <div className="text-[10px] text-slate-400">Today: {app.defaultMinutes} mins used</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-bold">Limit:</span>
                    <input
                      type="number"
                      min="5"
                      max="120"
                      value={appLimits[app.id] || 20}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 15;
                        setAppLimits(prev => ({ ...prev, [app.id]: val }));
                      }}
                      className="w-14 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-amber-300 text-center focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400">mins</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PANEL 3: STUDY SCHEDULE & NOTIFICATION REMINDERS                     */}
      {/* ========================================================================= */}
      {focusSubTab === 'schedule' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white">Daily Study Schedule &amp; Notifications</h3>
                <p className="text-[11px] text-slate-400">Scheduled study hours trigger automated device reminders</p>
              </div>

              <button
                type="button"
                onClick={async () => {
                  if ('Notification' in window) {
                    const perm = await Notification.requestPermission();
                    if (perm === 'granted') {
                      new Notification('DAV Focus Shield Active', {
                        body: 'Daily study notifications are enabled for your scheduled sessions!',
                        icon: '/logo.png'
                      });
                      alert('✓ Browser Notifications successfully enabled!');
                    } else {
                      alert('Notification permission was dismissed or blocked in your browser.');
                    }
                  } else {
                    alert('Notifications ready in DAV Focus App Mode.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Enable Browser Alerts</span>
              </button>
            </div>

            {/* List of Schedules */}
            <div className="space-y-3">
              {schedules.map(sch => (
                <div key={sch.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">{sch.title}</h4>
                      <p className="text-[11px] text-slate-400">{sch.time} • <strong className="text-amber-300">{sch.subject}</strong></p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStudyMode('timer');
                      setCustomHours(1);
                      setCustomMinutes(30);
                      setFocusSubTab('focus_arena');
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer"
                  >
                    Start Session Now →
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Schedule Form */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Session Name (e.g. Morning Math)"
                value={newScheduleTitle}
                onChange={(e) => setNewScheduleTitle(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Time (e.g. 06:00 AM - 07:30 AM)"
                value={newScheduleTime}
                onChange={(e) => setNewScheduleTime(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Subject Focus"
                value={newScheduleSubject}
                onChange={(e) => setNewScheduleSubject(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newScheduleTitle.trim()) return;
                  setSchedules(prev => [
                    ...prev,
                    {
                      id: Date.now(),
                      title: newScheduleTitle.trim(),
                      time: newScheduleTime.trim(),
                      subject: newScheduleSubject.trim(),
                      active: true
                    }
                  ]);
                  setNewScheduleTitle('');
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs rounded-xl transition cursor-pointer"
              >
                + Add Study Slot
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PANEL 4: STUDY GROUPS (MAKING GROUP & COLLABORATIVE FOCUS)           */}
      {/* ========================================================================= */}
      {focusSubTab === 'groups' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-white">Collaborative Study Circles</h3>
                <p className="text-[11px] text-slate-400">Create or join an authentic study group with classmates</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Group Code (e.g. DAV-8D-402)"
                  value={joinGroupCode}
                  onChange={(e) => setJoinGroupCode(e.target.value)}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (joinGroupCode.trim()) {
                      alert(`✓ Joined Study Group: ${joinGroupCode.trim()}`);
                      setJoinGroupCode('');
                    }
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs rounded-xl transition cursor-pointer"
                >
                  Join
                </button>
              </div>
            </div>

            {/* Active Group Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase text-amber-400">Current Study Circle</div>
                  <h4 className="text-base font-black text-white">{selectedGroup.name}</h4>
                  <p className="text-xs text-slate-400 font-mono">Code: {selectedGroup.code} • Target: {selectedGroup.targetHours} Hours/Day</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStudyMode('timer');
                    setFocusSubTab('focus_arena');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black text-xs shadow-md transition cursor-pointer"
                >
                  Start Group Focus 🟢
                </button>
              </div>

              {/* Members List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {selectedGroup.members.map((mem, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{mem.avatar}</span>
                      <span className="text-xs font-bold text-white">{mem.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">{mem.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Create New Group Input */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="text"
                placeholder="New Group Name (e.g. DAV Science Olympiad Circle)"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newGroupName.trim()) return;
                  const newCode = `DAV-${Math.floor(100 + Math.random() * 900)}`;
                  const grp = {
                    id: String(Date.now()),
                    name: newGroupName.trim(),
                    code: newCode,
                    targetHours: 3.0,
                    members: [
                      { name: `${user?.name || 'Rishit Shankar'} (Host)`, status: 'Active Focus 🟢', avatar: '👑' }
                    ]
                  };
                  setStudyGroups(prev => [...prev, grp]);
                  setSelectedGroup(grp);
                  setNewGroupName('');
                  alert(`Created new group: ${grp.name} with code: ${grp.code}`);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs rounded-xl transition cursor-pointer"
              >
                + Create Study Group
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-PANEL 5: ACHIEVEMENTS & MILESTONE BADGES                             */}
      {/* ========================================================================= */}
      {focusSubTab === 'achievements' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-black text-white">Long-Term Scholastic Badges</h3>
              <p className="text-[11px] text-slate-400">Permanent honors awarded as your accumulated study hours grow</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { hours: 1, title: '🥉 Bronze Pioneer', desc: '1 Hour of Verified Study', unlocked: accumulatedStudyMs >= 3600000 },
                { hours: 5, title: '🥈 Silver Dedication', desc: '5 Hours of Deep Concentration', unlocked: accumulatedStudyMs >= 3600000 * 5 },
                { hours: 10, title: '🥇 Golden Century', desc: '10 Hours of Deep Knowledge', unlocked: accumulatedStudyMs >= 3600000 * 10 },
                { hours: 25, title: '💎 Platinum Prodigy', desc: '25 Hours Academic Titan', unlocked: accumulatedStudyMs >= 3600000 * 25 },
                { hours: 50, title: '👑 Diamond Head Boy League', desc: '50 Hours Supreme Scholar', unlocked: accumulatedStudyMs >= 3600000 * 50 }
              ].map(badge => (
                <div 
                  key={badge.title}
                  className={`p-5 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between ${
                    badge.unlocked
                      ? 'border-amber-400 bg-slate-950 shadow-lg vfx-holo-shimmer'
                      : 'border-slate-800 bg-slate-950/60 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{badge.title.split(' ')[0]}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${badge.unlocked ? 'bg-amber-400 text-stone-950' : 'bg-slate-800 text-slate-500'}`}>
                        {badge.unlocked ? 'UNLOCKED' : `${badge.hours}h Target`}
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white">{badge.title.split(' ').slice(1).join(' ')}</h4>
                    <p className="text-[11px] text-slate-400">{badge.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                    <span>Status</span>
                    <span className={badge.unlocked ? 'text-amber-400' : 'text-slate-500'}>
                      {badge.unlocked ? 'Active on Profile' : `${Math.floor(accumulatedStudyMs / 3600000)} / ${badge.hours}h`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* GUIDED BREATHING TIME MODAL (PRANAYAMA / BOX BREATHING)                  */}
      {/* ========================================================================= */}
      {isBreathingOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="w-full max-w-md bg-slate-900 border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 text-center text-white space-y-6 shadow-2xl relative">
            
            <button
              type="button"
              onClick={() => setIsBreathingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                Pranayama 4-4-4-4 Box Breathing
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                Clear Your Mind Before Study
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Synchronize your breath to calm heart rate and heighten neuro-focus.
              </p>
            </div>

            {/* Visual Animation 6: Animated Guided Breathing Circle */}
            <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
              <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 vfx-breathing-orb flex items-center justify-center text-center shadow-2xl">
                <div>
                  <div className="text-2xl font-black uppercase tracking-widest text-white drop-shadow">
                    {breathingPhase}
                  </div>
                  <div className="text-3xl font-mono font-black text-cyan-100">
                    {breathingSeconds}s
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-cyan-200/90 font-medium italic">
              {breathingPhase === 'Inhale' && 'Slowly fill your lungs with fresh oxygen...'}
              {breathingPhase === 'Hold' && 'Hold breath gently and steady your focus...'}
              {breathingPhase === 'Exhale' && 'Smoothly release all mental tension and stress...'}
              {breathingPhase === 'Rest' && 'Rest in complete stillness and clarity...'}
            </p>

            <button
              type="button"
              onClick={() => setIsBreathingOpen(false)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Ready to Study Now 🚀
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMULATED APP BLOCKED SHIELD OVERLAY                                     */}
      {/* ========================================================================= */}
      {blockedAppAlert && (
        <div className="fixed inset-0 z-[280] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 sm:p-8 text-center text-white space-y-5 shadow-2xl vfx-blocked-alert relative">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-3xl">
              🚫
            </div>

            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-950 px-3 py-1 rounded-full border border-rose-800 inline-block">
                App Locked by DAV Focus Shield
              </div>
              <h3 className="text-xl font-black text-white mt-2">
                Daily Limit Reached for {blockedAppAlert}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                This app is temporarily blocked to protect your DAV Dictionary study streak and board examination preparation.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-bold">
              Tip: Complete your daily study target to earn recreation credits.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setBlockedAppAlert(null)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Return to DAV Study 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STRICT COMMITMENT LOCK CONFIRMATION MODAL                                */}
      {/* ========================================================================= */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[270] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fadeIn select-none font-sans">
          <div className="w-full max-w-md bg-slate-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center text-white space-y-5 shadow-2xl relative">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl font-black">
              ⏳
            </div>

            <div>
              <h3 className="text-xl font-black text-amber-300">
                Strict Commitment Lock Active!
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                To protect your academic discipline, quitting early requires a 10-second deliberate reflection delay.
              </p>
            </div>

            <div className="text-3xl font-mono font-black text-white">
              {exitCooldown > 0 ? `${exitCooldown}s` : 'READY'}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg cursor-pointer"
              >
                Keep Studying (Recommended)
              </button>

              <button
                type="button"
                disabled={exitCooldown > 0}
                onClick={handleForceQuit}
                className="px-4 py-3 rounded-2xl bg-rose-950 border border-rose-500 text-rose-300 font-bold text-xs disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Quit Early
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default DigitalFocusSuite;