import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Trophy, Flame, Clock, Target, Play, Pause, RotateCcw, Volume2, 
  VolumeX, ShieldAlert, Sparkles, Award, Star, CheckCircle2, User, 
  Search, Maximize2, Minimize2, BookOpen, Brain, Zap, Bell, Check,
  BarChart3, Medal, Radio, HeartHandshake
} from 'lucide-react';

// Pre-seeded Classmate Roster for DAV Public School Khabra
const BASE_STUDENTS_ROSTER = [
  {
    id: 'rishibhai',
    name: 'Rishit Shankar',
    classSec: 'Class 8-D (Roll 25)',
    role: 'Head Boy & Lead Developer',
    avatar: '/rishit_shankar.jpg',
    todayMinutes: 195,
    weekMinutes: 1240,
    allTimeMinutes: 5840,
    streakDays: 42,
    favoriteSubject: 'Sanskrit & Science',
    status: 'Deep Studying Sanskrit',
    badge: '🏆 Grandmaster'
  },
  {
    id: 'saharsh',
    name: 'Saharsh Shankar',
    classSec: 'Class 6-B (Roll 14)',
    role: 'VVIP Honor Student',
    avatar: null,
    todayMinutes: 160,
    weekMinutes: 980,
    allTimeMinutes: 4210,
    streakDays: 31,
    favoriteSubject: 'Mathematics',
    status: 'Practicing Algebra',
    badge: '💎 Diamond Scholar'
  },
  {
    id: 'priya_m',
    name: 'Priya Mishra',
    classSec: 'Class 8-A (Roll 12)',
    role: 'Science Club President',
    avatar: null,
    todayMinutes: 145,
    weekMinutes: 890,
    allTimeMinutes: 3950,
    streakDays: 28,
    favoriteSubject: 'Science',
    status: 'Revising Force & Pressure',
    badge: '🌟 Gold Scholar'
  },
  {
    id: 'aarav_k',
    name: 'Aarav Kumar',
    classSec: 'Class 7-C (Roll 08)',
    role: 'Math Olympiad Gold',
    avatar: null,
    todayMinutes: 130,
    weekMinutes: 810,
    allTimeMinutes: 3420,
    streakDays: 22,
    favoriteSubject: 'Mathematics',
    status: 'Solving Rational Numbers',
    badge: '🥈 Silver Scholar'
  },
  {
    id: 'ananya_s',
    name: 'Ananya Sharma',
    classSec: 'Class 8-B (Roll 19)',
    role: 'Literary Secretary',
    avatar: null,
    todayMinutes: 110,
    weekMinutes: 720,
    allTimeMinutes: 3100,
    streakDays: 19,
    favoriteSubject: 'English',
    status: 'Reading English Literature',
    badge: '🥉 Bronze Scholar'
  },
  {
    id: 'rohit_v',
    name: 'Rohit Verma',
    classSec: 'Class 7-A (Roll 33)',
    role: 'Sports Vice-Captain',
    avatar: null,
    todayMinutes: 85,
    weekMinutes: 540,
    allTimeMinutes: 2480,
    streakDays: 14,
    favoriteSubject: 'Social Science',
    status: 'History Chapter 4',
    badge: '⚡ Focus Rising'
  },
  {
    id: 'sneha_p',
    name: 'Sneha Patel',
    classSec: 'Class 6-D (Roll 05)',
    role: 'Cultural Secretary',
    avatar: null,
    todayMinutes: 70,
    weekMinutes: 460,
    allTimeMinutes: 2190,
    streakDays: 11,
    favoriteSubject: 'Hindi',
    status: 'Hindi Gyan Sagar',
    badge: '🌱 Avid Learner'
  }
];

// Web Audio Ambient Synthesizer
class FocusSoundEngine {
  constructor() {
    this.ctx = null;
    this.binauralOsc1 = null;
    this.binauralOsc2 = null;
    this.noiseNode = null;
    this.gainNode = null;
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
    try {
      if (this.binauralOsc1) { this.binauralOsc1.stop(); this.binauralOsc1.disconnect(); this.binauralOsc1 = null; }
      if (this.binauralOsc2) { this.binauralOsc2.stop(); this.binauralOsc2.disconnect(); this.binauralOsc2 = null; }
      if (this.noiseNode) { this.noiseNode.stop(); this.noiseNode.disconnect(); this.noiseNode = null; }
      if (this.gainNode) { this.gainNode.disconnect(); this.gainNode = null; }
    } catch (e) {}
    this.currentTrack = 'none';
  }

  playBinaural40Hz() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    try {
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);

      // 200 Hz carrier left, 240 Hz carrier right -> 40 Hz Gamma Focus beat
      this.binauralOsc1 = this.ctx.createOscillator();
      this.binauralOsc1.type = 'sine';
      this.binauralOsc1.frequency.setValueAtTime(200, this.ctx.currentTime);
      this.binauralOsc1.connect(this.gainNode);
      this.binauralOsc1.start();

      this.binauralOsc2 = this.ctx.createOscillator();
      this.binauralOsc2.type = 'sine';
      this.binauralOsc2.frequency.setValueAtTime(240, this.ctx.currentTime);
      this.binauralOsc2.connect(this.gainNode);
      this.binauralOsc2.start();

      this.currentTrack = 'binaural';
    } catch (e) {}
  }

  playRain() {
    this.init();
    this.stop();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Pink-noise soothing rain profile
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = buffer;
      this.noiseNode.loop = true;

      // Low pass filter to simulate gentle rain
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, this.ctx.currentTime);

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);

      this.noiseNode.connect(filter);
      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.noiseNode.start();
      this.currentTrack = 'rain';
    } catch (e) {}
  }

  playBuzzer() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {}
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.8);
    } catch (e) {}
  }
}

const soundEngine = new FocusSoundEngine();

export function StudyLeaderboardSection({ user, onRequireLogin }) {
  const currentUserId = (user?.id || 'rishibhai').toLowerCase();
  const currentUserName = user?.name || (currentUserId === 'rishibhai' ? 'Rishit Shankar' : 'DAV Student');

  // Active Tab: 'leaderboard' | 'focus_mode'
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [timeFilter, setTimeFilter] = useState('today'); // 'today' | 'week' | 'all'
  const [searchQuery, setSearchQuery] = useState('');

  // Current user's live study stats loaded from localStorage
  const [myStudyStats, setMyStudyStats] = useState(() => {
    try {
      const saved = localStorage.getItem(`dav_study_stats_${currentUserId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      todayMinutes: currentUserId === 'rishibhai' ? 195 : 45,
      weekMinutes: currentUserId === 'rishibhai' ? 1240 : 280,
      allTimeMinutes: currentUserId === 'rishibhai' ? 5840 : 1120,
      streakDays: currentUserId === 'rishibhai' ? 42 : 5,
      sessionsCompleted: currentUserId === 'rishibhai' ? 18 : 3,
      favoriteSubject: 'Science'
    };
  });

  // Save stats helper
  const updateMyStudyTime = (addedMinutes, subject) => {
    setMyStudyStats(prev => {
      const next = {
        ...prev,
        todayMinutes: prev.todayMinutes + addedMinutes,
        weekMinutes: prev.weekMinutes + addedMinutes,
        allTimeMinutes: prev.allTimeMinutes + addedMinutes,
        sessionsCompleted: (prev.sessionsCompleted || 0) + 1,
        favoriteSubject: subject || prev.favoriteSubject
      };
      try {
        localStorage.setItem(`dav_study_stats_${currentUserId}`, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Combine roster with current user
  const leaderboardList = useMemo(() => {
    const list = BASE_STUDENTS_ROSTER.map(student => {
      if (student.id.toLowerCase() === currentUserId) {
        return {
          ...student,
          name: currentUserName,
          todayMinutes: myStudyStats.todayMinutes,
          weekMinutes: myStudyStats.weekMinutes,
          allTimeMinutes: myStudyStats.allTimeMinutes,
          streakDays: myStudyStats.streakDays,
          favoriteSubject: myStudyStats.favoriteSubject
        };
      }
      return student;
    });

    // If current user is not in pre-seeded list, inject them
    if (!list.some(s => s.id.toLowerCase() === currentUserId)) {
      list.push({
        id: currentUserId,
        name: currentUserName,
        classSec: user?.class ? `Class ${user.class}` : 'Class 8-D',
        role: 'DAV Enrolled Scholar',
        avatar: user?.photoUrl || null,
        todayMinutes: myStudyStats.todayMinutes,
        weekMinutes: myStudyStats.weekMinutes,
        allTimeMinutes: myStudyStats.allTimeMinutes,
        streakDays: myStudyStats.streakDays,
        favoriteSubject: myStudyStats.favoriteSubject,
        status: 'Active on Portal',
        badge: '⚡ Focus Rising'
      });
    }

    // Sort by chosen time filter
    return list.sort((a, b) => {
      if (timeFilter === 'today') return b.todayMinutes - a.todayMinutes;
      if (timeFilter === 'week') return b.weekMinutes - a.weekMinutes;
      return b.allTimeMinutes - a.allTimeMinutes;
    });
  }, [currentUserId, currentUserName, myStudyStats, timeFilter, user]);

  const filteredLeaderboard = useMemo(() => {
    if (!searchQuery.trim()) return leaderboardList;
    const q = searchQuery.toLowerCase();
    return leaderboardList.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.classSec.toLowerCase().includes(q) ||
      s.favoriteSubject.toLowerCase().includes(q)
    );
  }, [leaderboardList, searchQuery]);

  // =========================================================================
  // DEEP STUDY FOCUS MODE STATE
  // =========================================================================
  const [focusSubject, setFocusSubject] = useState('Science');
  const [focusChapter, setFocusChapter] = useState('Chapter 1: Nutrition in Plants & Animals');
  const [targetDurationMinutes, setTargetDurationMinutes] = useState(25);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [isFocusActive, setIsFocusActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [ambientSound, setAmbientSound] = useState('none'); // 'none' | 'binaural' | 'rain'
  const [distractionCount, setDistractionCount] = useState(0);
  const [showDistractionWarning, setShowDistractionWarning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionCompletedCelebration, setSessionCompletedCelebration] = useState(false);

  const containerRef = useRef(null);

  // Anti-Tab Switch Guard: Page Visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isFocusActive && !isPaused && document.visibilityState === 'hidden') {
        soundEngine.playBuzzer();
        setDistractionCount(prev => prev + 1);
        setShowDistractionWarning(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isFocusActive, isPaused]);

  // Focus Timer Countdown
  useEffect(() => {
    let interval = null;
    if (isFocusActive && !isPaused && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            // Completed!
            soundEngine.stop();
            soundEngine.playChime();
            setIsFocusActive(false);
            setSessionCompletedCelebration(true);
            updateMyStudyTime(targetDurationMinutes, focusSubject);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocusActive, isPaused, secondsRemaining, targetDurationMinutes, focusSubject]);

  // Ambient sound switcher
  const handleSoundChange = (soundType) => {
    setAmbientSound(soundType);
    if (soundType === 'binaural') soundEngine.playBinaural40Hz();
    else if (soundType === 'rain') soundEngine.playRain();
    else soundEngine.stop();
  };

  const startFocusSession = (mins = targetDurationMinutes) => {
    if (user?.plan === 'guest' || user?.isDemo) {
      if (onRequireLogin) {
        onRequireLogin(
          'Login to Continue',
          'You are exploring in Demo Preview. Please log in or register with your Student ID & Password to start recorded deep focus sessions and earn streak points on the campus leaderboard.'
        );
      }
      return;
    }
    setTargetDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
    setIsFocusActive(true);
    setIsPaused(false);
    setDistractionCount(0);
    setShowDistractionWarning(false);
    setSessionCompletedCelebration(false);
    if (ambientSound !== 'none') handleSoundChange(ambientSound);
  };

  const pauseFocusSession = () => {
    setIsPaused(true);
    soundEngine.stop();
  };

  const resumeFocusSession = () => {
    setIsPaused(false);
    if (ambientSound !== 'none') handleSoundChange(ambientSound);
  };

  const stopFocusSession = () => {
    soundEngine.stop();
    setIsFocusActive(false);
    setIsPaused(false);
    setSecondsRemaining(targetDurationMinutes * 60);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, Math.round(((targetDurationMinutes * 60 - secondsRemaining) / (targetDurationMinutes * 60)) * 100));

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-gradient-to-b from-stone-950 via-slate-900 to-indigo-950 text-slate-100 pb-28 selection:bg-amber-400 selection:text-stone-950 font-sans"
    >
      {/* SECTION 8 HEADER HERO */}
      <div className="w-full bg-stone-950/95 backdrop-blur-md border-b-2 border-amber-400 px-4 sm:px-8 py-5 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 border-2 border-amber-300 shadow-xl flex items-center justify-center text-stone-950 font-black text-2xl shrink-0">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 shadow-xs">
                  SECTION 8 • DAV ACADEMIC ARENA
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-stone-900 px-2 py-0.5 rounded-full border border-amber-500/40">
                  <Flame className="w-3 h-3 text-orange-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 mt-0.5">
                <span>STUDY LEADERBOARD & DEEP FOCUS OS</span>
                <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
              </h1>
            </div>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-2 bg-stone-900/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-amber-400 text-stone-950 shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Campus Leaderboard</span>
            </button>
            <button
              onClick={() => setActiveTab('focus_mode')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition cursor-pointer ${
                activeTab === 'focus_mode'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Brain className="w-4 h-4 text-emerald-300" />
              <span>Deep Study Focus Mode</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* ===================================================================
            TAB 1: LIVE CAMPUS LEADERBOARD
            =================================================================== */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">

            {/* MY STATS HERO BAR */}
            <div className="w-full bg-gradient-to-r from-amber-600/30 via-purple-900/40 to-slate-900 rounded-3xl p-6 border-2 border-amber-400/60 shadow-2xl backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400 text-stone-950 font-black flex items-center justify-center text-xl shadow-lg border-2 border-white">
                    {user?.photoUrl ? (
                      <img src={user.photoUrl} alt={currentUserName} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      currentUserName.charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="text-xs uppercase font-black text-amber-300 tracking-wider">
                      Your Registered Student Card
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white">
                      {currentUserName}
                    </div>
                    <div className="text-xs text-slate-300">
                      Fav Subject: <strong className="text-amber-300">{myStudyStats.favoriteSubject}</strong> • {myStudyStats.sessionsCompleted} Focus Sessions Completed
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="bg-stone-950/80 px-4 py-2.5 rounded-2xl border border-amber-400/40 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Today's Study</span>
                    <div className="text-xl font-black text-amber-300 font-mono">
                      {Math.floor(myStudyStats.todayMinutes / 60)}h {myStudyStats.todayMinutes % 60}m
                    </div>
                  </div>
                  <div className="bg-stone-950/80 px-4 py-2.5 rounded-2xl border border-amber-400/40 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Weekly Total</span>
                    <div className="text-xl font-black text-white font-mono">
                      {Math.floor(myStudyStats.weekMinutes / 60)}h {myStudyStats.weekMinutes % 60}m
                    </div>
                  </div>
                  <div className="bg-stone-950/80 px-4 py-2.5 rounded-2xl border border-amber-400/40 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Streak</span>
                    <div className="text-xl font-black text-orange-400 flex items-center justify-center gap-1 font-mono">
                      <Flame className="w-4 h-4 fill-orange-400 animate-pulse" />
                      <span>{myStudyStats.streakDays} Days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TOP 3 PODIUM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* 2nd Place: Silver */}
              {leaderboardList[1] && (
                <div className="order-2 md:order-1 bg-stone-900/90 rounded-3xl p-5 border-2 border-slate-400 shadow-xl text-center relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-3 right-3 text-2xl font-black text-slate-400">🥈 #2</div>
                  <div className="pt-2">
                    <div className="w-16 h-16 rounded-2xl bg-slate-300 text-stone-950 font-black text-2xl flex items-center justify-center mx-auto shadow-md border-2 border-white">
                      {leaderboardList[1].avatar ? (
                        <img src={leaderboardList[1].avatar} alt="" className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        leaderboardList[1].name.charAt(0)
                      )}
                    </div>
                    <div className="text-base font-black text-white mt-3">{leaderboardList[1].name}</div>
                    <div className="text-xs text-slate-400">{leaderboardList[1].classSec}</div>
                    <div className="mt-2 text-xs font-bold text-slate-300 bg-stone-800/80 py-1 px-3 rounded-full inline-block">
                      {leaderboardList[1].badge}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-around text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px]">Study Time</span>
                      <div className="font-mono font-black text-slate-200">
                        {timeFilter === 'today' ? `${leaderboardList[1].todayMinutes}m` : `${Math.floor(leaderboardList[1].weekMinutes / 60)}h`}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Streak</span>
                      <div className="font-mono font-black text-orange-400">{leaderboardList[1].streakDays}d 🔥</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 1st Place: Gold Crown */}
              {leaderboardList[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/30 via-stone-900 to-stone-900 rounded-3xl p-6 border-4 border-amber-400 shadow-2xl text-center relative overflow-hidden transform md:-translate-y-2 flex flex-col justify-between">
                  <div className="absolute top-3 right-3 text-3xl font-black text-amber-300 animate-bounce">👑 #1</div>
                  <div className="pt-2">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-stone-950 font-black text-3xl flex items-center justify-center mx-auto shadow-xl border-4 border-white">
                      {leaderboardList[0].avatar ? (
                        <img src={leaderboardList[0].avatar} alt="" className="w-full h-full object-cover rounded-3xl" />
                      ) : (
                        leaderboardList[0].name.charAt(0)
                      )}
                    </div>
                    <div className="text-lg font-black text-white mt-3">{leaderboardList[0].name}</div>
                    <div className="text-xs font-bold text-amber-300">{leaderboardList[0].classSec} • {leaderboardList[0].role}</div>
                    <div className="mt-2 text-xs font-black text-stone-950 bg-gradient-to-r from-yellow-400 to-amber-300 py-1 px-3.5 rounded-full inline-block shadow-md">
                      {leaderboardList[0].badge}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-500/40 flex justify-around text-xs">
                    <div>
                      <span className="text-amber-200 text-[10px]">Campus Record</span>
                      <div className="font-mono font-black text-white text-base">
                        {timeFilter === 'today' ? `${leaderboardList[0].todayMinutes}m` : `${Math.floor(leaderboardList[0].weekMinutes / 60)}h ${leaderboardList[0].weekMinutes % 60}m`}
                      </div>
                    </div>
                    <div>
                      <span className="text-amber-200 text-[10px]">Unbroken Streak</span>
                      <div className="font-mono font-black text-orange-400 text-base">{leaderboardList[0].streakDays} Days 🔥</div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3rd Place: Bronze */}
              {leaderboardList[2] && (
                <div className="order-3 md:order-3 bg-stone-900/90 rounded-3xl p-5 border-2 border-amber-700 shadow-xl text-center relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-3 right-3 text-2xl font-black text-amber-600">🥉 #3</div>
                  <div className="pt-2">
                    <div className="w-16 h-16 rounded-2xl bg-amber-700 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md border-2 border-white">
                      {leaderboardList[2].avatar ? (
                        <img src={leaderboardList[2].avatar} alt="" className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        leaderboardList[2].name.charAt(0)
                      )}
                    </div>
                    <div className="text-base font-black text-white mt-3">{leaderboardList[2].name}</div>
                    <div className="text-xs text-slate-400">{leaderboardList[2].classSec}</div>
                    <div className="mt-2 text-xs font-bold text-amber-400 bg-stone-800/80 py-1 px-3 rounded-full inline-block">
                      {leaderboardList[2].badge}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-around text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px]">Study Time</span>
                      <div className="font-mono font-black text-slate-200">
                        {timeFilter === 'today' ? `${leaderboardList[2].todayMinutes}m` : `${Math.floor(leaderboardList[2].weekMinutes / 60)}h`}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Streak</span>
                      <div className="font-mono font-black text-orange-400">{leaderboardList[2].streakDays}d 🔥</div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* FULL LEADERBOARD TABLE WITH SEARCH & TIMEFRAME SWITCHER */}
            <div className="bg-stone-900/90 rounded-3xl p-6 border-2 border-slate-800 shadow-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-amber-300">Timeframe:</span>
                  {[
                    { id: 'today', label: 'Today (Live)' },
                    { id: 'week', label: 'This Week' },
                    { id: 'all', label: 'All-Time Champions' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setTimeFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        timeFilter === f.id
                          ? 'bg-amber-400 text-stone-950 font-black'
                          : 'bg-stone-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search classmate, class, roll..."
                    className="w-full bg-stone-950 text-white text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Roster List */}
              <div className="space-y-2.5">
                {filteredLeaderboard.map((student, idx) => {
                  const isMe = student.id.toLowerCase() === currentUserId;
                  const rank = idx + 1;
                  const displayMinutes = timeFilter === 'today' 
                    ? student.todayMinutes 
                    : timeFilter === 'week' 
                      ? student.weekMinutes 
                      : student.allTimeMinutes;

                  return (
                    <div
                      key={student.id}
                      className={`p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 transition ${
                        isMe
                          ? 'bg-amber-400/15 border-2 border-amber-400 shadow-lg'
                          : 'bg-stone-950/60 hover:bg-stone-850 border border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-8 text-center font-black text-sm ${
                          rank === 1 ? 'text-amber-400 text-lg' : rank === 2 ? 'text-slate-300' : rank === 3 ? 'text-amber-600' : 'text-slate-500'
                        }`}>
                          #{rank}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-stone-800 text-white font-black text-sm flex items-center justify-center shrink-0">
                          {student.avatar ? (
                            <img src={student.avatar} alt="" className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            student.name.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-black text-white flex items-center gap-2">
                            <span>{student.name}</span>
                            {isMe && (
                              <span className="text-[10px] bg-amber-400 text-stone-950 px-2 py-0.2 rounded-full font-black">
                                YOU
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400">
                            {student.classSec} • {student.favoriteSubject}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase">Focus Time</span>
                          <div className="font-mono font-black text-white text-base">
                            {Math.floor(displayMinutes / 60)}h {displayMinutes % 60}m
                          </div>
                        </div>
                        <div className="hidden sm:block">
                          <span className="text-[10px] text-slate-400 uppercase">Streak</span>
                          <div className="font-mono font-black text-orange-400 text-sm">
                            {student.streakDays}d 🔥
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================
            TAB 2: DEEP STUDY FOCUS MODE
            =================================================================== */}
        {activeTab === 'focus_mode' && (
          <div className="space-y-6">

            {/* Anti-Tab Switch Warning Alert Banner */}
            {showDistractionWarning && (
              <div className="w-full bg-rose-950/90 border-2 border-rose-500 text-rose-200 p-4 rounded-2xl flex items-center justify-between gap-3 animate-pulse">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <strong className="text-white text-sm">Focus Interruption Detected!</strong>
                    <p className="text-xs text-rose-300">
                      You left or switched tabs during your deep study session. Total tab switches logged: <strong>{distractionCount}</strong>. Stay locked in!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDistractionWarning(false)}
                  className="px-3 py-1.5 rounded-xl bg-rose-800 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Session Completed Celebration Modal */}
            {sessionCompletedCelebration && (
              <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl border-4 border-emerald-300 text-center shadow-2xl space-y-3">
                <div className="text-4xl animate-bounce">🎉 🌟 🏆</div>
                <h3 className="text-2xl font-black">EXCELLENT FOCUS SESSION COMPLETED!</h3>
                <p className="text-sm text-emerald-100 max-w-lg mx-auto">
                  Congratulations <strong>{currentUserName}</strong>! You just completed <strong>{targetDurationMinutes} minutes</strong> of deep focus on <strong>{focusSubject}</strong> with zero excuses. Your study time and streak have been credited to the DAV Campus Leaderboard!
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => startFocusSession(targetDurationMinutes)}
                    className="px-6 py-2.5 rounded-xl bg-white text-stone-950 font-black text-xs hover:bg-emerald-100 cursor-pointer shadow-lg"
                  >
                    Start Another Session 🔁
                  </button>
                  <button
                    onClick={() => {
                      setSessionCompletedCelebration(false);
                      setActiveTab('leaderboard');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-900 text-white font-bold text-xs hover:bg-emerald-800 cursor-pointer"
                  >
                    View My Updated Rank 📊
                  </button>
                </div>
              </div>
            )}

            {/* MAIN FOCUS TIMER DISPLAY */}
            <div className="w-full bg-gradient-to-br from-stone-900 via-indigo-950 to-stone-950 rounded-3xl p-6 sm:p-12 border-4 border-emerald-400 shadow-2xl text-center relative overflow-hidden">
              
              {/* Fullscreen & Ambient Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Subject:</span>
                  <select
                    value={focusSubject}
                    onChange={(e) => setFocusSubject(e.target.value)}
                    disabled={isFocusActive}
                    className="bg-stone-950 text-white text-xs font-black py-2 px-3 rounded-xl border border-emerald-400/50 focus:outline-none"
                  >
                    <option value="Science">🔬 Science</option>
                    <option value="Mathematics">📐 Mathematics</option>
                    <option value="Social Science">🌍 Social Science</option>
                    <option value="English">📖 English</option>
                    <option value="Hindi">✍️ Hindi</option>
                    <option value="Sanskrit">🛕 Sanskrit</option>
                    <option value="Dharam Shiksha">🕉️ Dharam Shiksha</option>
                    <option value="Computer Science">💻 Computer Science</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Sound:</span>
                    {[
                      { id: 'none', label: 'Mute' },
                      { id: 'binaural', label: '40Hz Wave' },
                      { id: 'rain', label: 'Rain' }
                    ].map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSoundChange(s.id)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          ambientSound === s.id
                            ? 'bg-emerald-500 text-stone-950 font-black'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-xl bg-stone-950 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
                    title="Fullscreen Focus"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Big Neon Circular Timer Counter */}
              <div className="my-10 max-w-sm mx-auto relative flex items-center justify-center">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-slate-800 flex flex-col items-center justify-center relative shadow-2xl bg-stone-950/80">
                  
                  {/* Progress Glow Ring */}
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-emerald-400 transition-all duration-1000"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${progressPercent >= 25 ? '100% 0%' : '50% 0%'}, ${progressPercent >= 50 ? '100% 100%' : '50% 50%'}, ${progressPercent >= 75 ? '0% 100%' : '50% 50%'}, ${progressPercent >= 100 ? '0% 0%' : '50% 50%'})`
                    }}
                  />

                  <div className="relative z-10 space-y-1">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-300">
                      {isFocusActive ? (isPaused ? '⏸️ PAUSED' : '🔥 IN DEEP FOCUS') : 'READY TO STUDY'}
                    </span>
                    <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight drop-shadow-md">
                      {formatTime(secondsRemaining)}
                    </div>
                    <div className="text-xs text-slate-400">
                      {progressPercent}% Complete
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons (When idle) */}
              {!isFocusActive && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                  {[
                    { mins: 15, label: '15m Sprint' },
                    { mins: 25, label: '25m Pomodoro' },
                    { mins: 45, label: '45m Deep Work' },
                    { mins: 60, label: '60m Master Class' }
                  ].map(p => (
                    <button
                      key={p.mins}
                      onClick={() => {
                        setTargetDurationMinutes(p.mins);
                        setSecondsRemaining(p.mins * 60);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        targetDurationMinutes === p.mins
                          ? 'bg-amber-400 text-stone-950 font-black border-white shadow-md'
                          : 'bg-stone-950 text-slate-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {!isFocusActive ? (
                  <button
                    onClick={() => startFocusSession()}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-base sm:text-lg flex items-center gap-2 shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-emerald-300"
                  >
                    <Play className="w-5 h-5 fill-stone-950" />
                    <span>START DEEP FOCUS NOW</span>
                  </button>
                ) : (
                  <>
                    {isPaused ? (
                      <button
                        onClick={resumeFocusSession}
                        className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Play className="w-4 h-4 fill-stone-950" />
                        <span>Resume</span>
                      </button>
                    ) : (
                      <button
                        onClick={pauseFocusSession}
                        className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                      >
                        <Pause className="w-4 h-4 fill-stone-950" />
                        <span>Pause</span>
                      </button>
                    )}

                    <button
                      onClick={stopFocusSession}
                      className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Stop Session</span>
                    </button>
                  </>
                )}
              </div>

              {/* Distraction Count Info */}
              {isFocusActive && (
                <div className="mt-8 text-xs text-slate-400 flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Anti-Tab Switch Protection: Active • Distractions: {distractionCount}</span>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
