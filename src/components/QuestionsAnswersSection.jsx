import React, { useState } from 'react';
import { 
  HelpCircle, BookOpen, Sparkles, CheckCircle2, Lock, 
  ArrowRight, ExternalLink, ChevronRight, RotateCcw, 
  Volume2, VolumeX, Award, ShieldCheck, Flame, Zap, 
  Search, Compass, Star, Brain, Play, Check, Layers,
  X, ArrowLeft, Eye, BookMarked, Globe, Lightbulb
} from 'lucide-react';
import { DAV_SUBJECTS } from '../data/mockData';
import { getSubjectChapters } from '../data/davChapters';

export function QuestionsAnswersSection({ 
  currentUser, 
  onOpenUpgradeModal,
  onOpenAIWithQuestion 
}) {
  // Plan Selection: 'normal' | 'vip' | 'vvip'
  // Initial default: user's account plan or 'vvip' for testing
  const initialPlan = (currentUser?.plan === 'vvip' || currentUser?.isAdmin) 
    ? 'vvip' 
    : (currentUser?.plan === 'vip' ? 'vip' : 'vvip');

  const [activePlan, setActivePlan] = useState(initialPlan);

  // Pop-up Modal State:
  // activeModal: null | 'level1_grade' | 'level2_subject' | 'level3_chapter' | 'level4_source'
  const [activeModal, setActiveModal] = useState(null);

  // Selection states
  const [selectedClass, setSelectedClass] = useState(8);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

  // UI helpers
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [subjectSearch, setSubjectSearch] = useState('');
  const [chapterSearch, setChapterSearch] = useState('');
  const [redirectToast, setRedirectToast] = useState(null);

  // Plan capabilities
  const isNormalUnlocked = true;
  const isVipUnlocked = activePlan === 'vip' || activePlan === 'vvip' || currentUser?.isAdmin;
  const isVvipUnlocked = activePlan === 'vvip' || currentUser?.isAdmin;

  // Synthesized game-like sound effects (No external audio files needed)
  const playSfx = (type = 'click') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'select') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'level') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.08); // C#
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.16); // E
        gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.09);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.09);
      }
    } catch (e) {}
  };

  // Grade cards config for Level 1 Pop-up
  const gradeLevels = [
    { cls: 8, label: 'Class 8', badge: 'Board Topper Stage 🔥', color: 'from-rose-500 via-red-600 to-amber-600', emoji: '🔥', desc: 'All 20 Science Chapters, Math, SST & Hindi' },
    { cls: 7, label: 'Class 7', badge: 'Senior Challenger ⚡', color: 'from-blue-600 via-indigo-600 to-purple-600', emoji: '⚡', desc: 'Pre-Board Concept Mastery & Exercises' },
    { cls: 6, label: 'Class 6', badge: 'Middle School Champ 🏆', color: 'from-emerald-500 via-teal-600 to-cyan-600', emoji: '🏆', desc: 'Middle School Curriculum Q&A Solutions' },
    { cls: 5, label: 'Class 5', badge: 'Primary Senior Star ⭐', color: 'from-amber-500 via-orange-600 to-red-600', emoji: '⭐', desc: 'My Living World, SST & Bhasha Madhuri' },
    { cls: 4, label: 'Class 4', badge: 'Junior Whiz 🚀', color: 'from-cyan-500 via-blue-600 to-indigo-600', emoji: '🚀', desc: 'English Reader, Primary Math & EVS Solutions' },
    { cls: 3, label: 'Class 3', badge: 'Curious Explorer 💡', color: 'from-purple-500 via-pink-600 to-rose-600', emoji: '💡', desc: 'Exercise Solutions & Story Notes' },
    { cls: 2, label: 'Class 2', badge: 'Rising Star 🌱', color: 'from-teal-500 via-emerald-600 to-green-600', emoji: '🌱', desc: 'Primary Numeracy & Word Exercises' },
    { cls: 1, label: 'Class 1', badge: 'Foundation Scout 🎯', color: 'from-yellow-500 via-amber-600 to-orange-600', emoji: '🎯', desc: 'Step-by-step Fun Learning Q&A' },
    { cls: 'UKG', label: 'UKG', badge: 'Kindergarten Explorer 🎨', color: 'from-pink-500 via-rose-500 to-red-500', emoji: '🎨', desc: 'Bal Madhuri & Early Math Answers' },
    { cls: 'LKG', label: 'LKG', badge: 'Little Champions 🧸', color: 'from-lime-500 via-green-600 to-emerald-600', emoji: '🧸', desc: 'Activity Workbook & Fun Phonics' }
  ];

  // Step 1: User selects a plan from the purple arcade hub
  const handleSelectPlan = (plan) => {
    playSfx('level');
    setActivePlan(plan);
    // Directly open Pop-up Level 1: Grade Select as requested
    setActiveModal('level1_grade');
  };

  // Step 2: User clicks a grade in Pop-up Level 1
  const handleSelectGrade = (cls) => {
    playSfx('select');
    setSelectedClass(cls);
    setSelectedSubject(null);
    setSelectedChapter(null);
    setSubjectSearch('');
    // Open Pop-up Level 2: Subject Select
    setActiveModal('level2_subject');
  };

  // Step 3: User clicks a subject in Pop-up Level 2
  const handleSelectSubject = (subj) => {
    playSfx('select');
    setSelectedSubject(subj);
    setSelectedChapter(null);
    setChapterSearch('');
    // Open Pop-up Level 3: Chapter Select
    setActiveModal('level3_chapter');
  };

  // Step 4: User clicks a chapter in Pop-up Level 3
  const handleSelectChapter = (chap) => {
    playSfx('win');
    setSelectedChapter(chap);
    // Open Pop-up Level 4: Source Website Select
    setActiveModal('level4_source');
  };

  // Step 5: User clicks a website option in Pop-up Level 4 -> Direct Redirect
  const handleLaunchWebsite = (sourceKey, url) => {
    playSfx('level');
    setRedirectToast(`Redirecting to ${sourceKey.toUpperCase()}...`);
    setTimeout(() => {
      setRedirectToast(null);
    }, 3000);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Close modal back to arcade hub
  const handleCloseModal = () => {
    playSfx('pop');
    setActiveModal(null);
  };

  // Get subjects for selected class
  const availableSubjects = DAV_SUBJECTS[selectedClass] || [];
  const filteredSubjects = availableSubjects.filter(s => 
    s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
    (s.tagline && s.tagline.toLowerCase().includes(subjectSearch.toLowerCase()))
  );

  // Get chapters for selected subject
  const currentChapters = selectedSubject 
    ? getSubjectChapters(selectedClass, selectedSubject.id, selectedSubject.name)
    : [];

  const filteredChapters = currentChapters.filter(c => 
    c.title.toLowerCase().includes(chapterSearch.toLowerCase()) ||
    `chapter ${c.number}`.includes(chapterSearch.toLowerCase()) ||
    (c.tagline && c.tagline.toLowerCase().includes(chapterSearch.toLowerCase()))
  );

  // Generate verified website URLs for the chosen chapter
  const generateSourceUrls = () => {
    if (!selectedSubject || !selectedChapter) return {};
    
    // Clean subject and chapter names
    const cleanSub = selectedSubject.name.replace(/\(.*?\)/g, '').replace(/DAV/g, '').trim();

    // 1. Solution Gyan: Prefer direct verified URL
    let solutionGyan = selectedChapter.solutionGyanUrl;
    if (!solutionGyan) {
      solutionGyan = `https://solutiongyan.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(cleanSub)}+Chapter+${selectedChapter.number}`;
    }

    // 2. Learn Cram: Prefer direct verified URL
    let learnCram = selectedChapter.learnCramUrl;
    if (!learnCram) {
      learnCram = `https://www.learncram.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(cleanSub)}+Chapter+${selectedChapter.number}`;
    }

    // 3. ncertbookspdf:
    const ncertBookPdf = `https://ncertbookspdf.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(cleanSub)}+Chapter+${selectedChapter.number}`;

    // Subject Hub URL on Solution Gyan
    const solutionGyanHub = (selectedClass === 8 && selectedSubject.id === 'sci8')
      ? 'https://solutiongyan.com/dav-class-8/dav-class-8-science/'
      : (selectedClass === 8 && selectedSubject.id === 'sst8')
      ? 'https://solutiongyan.com/dav-class-8-sst-book-solutions/'
      : (selectedClass === 8 && selectedSubject.id === 'math8')
      ? 'https://solutiongyan.com/dav-class-8-maths-book-solutions/'
      : `https://solutiongyan.com/dav-class-${selectedClass}/`;

    return {
      solutionGyan,
      learnCram,
      ncertBookPdf,
      solutionGyanHub
    };
  };

  const sourceUrls = generateSourceUrls();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c051e] via-[#1a0a38] to-[#250b44] text-white py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden select-none">
      
      {/* Playful Floating Glowing Arcade Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl pointer-events-none animate-bounce" style={{ animationDuration: '6s' }} />

      {/* Redirect Notification Toast */}
      {redirectToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-500 text-slate-950 font-black px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white animate-bounce">
          <ExternalLink className="w-5 h-5" />
          <span>{redirectToast}</span>
        </div>
      )}

      {/* Main Full-Screen Purple Arcade Game Deck */}
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Top Quest HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-purple-950/70 border border-purple-500/40 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Flame className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="text-xs font-black text-amber-300 tracking-wider uppercase">Section 3 • DAV Arcade System</div>
              <div className="text-lg font-black text-white">Questions &amp; Answers Pop-Up Quest 🎮</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playSfx('select');
              }}
              className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-2 transition cursor-pointer ${
                soundEnabled 
                  ? 'bg-purple-900/60 text-purple-200 border-purple-500/40 hover:bg-purple-800/80' 
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title="Toggle Game Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
            </button>

            {/* Current Active Plan Badge */}
            <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Award className="w-4 h-4 fill-slate-950" />
              <span>Active Plan: {activePlan.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Hero Banner: Step 0 Plan Selector */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1d0b3e] via-[#2d115e] to-[#120629] border-2 border-purple-500/50 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/30 text-purple-300 text-xs font-black uppercase tracking-widest border border-purple-400/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Interactive Pop-Up Game Mode</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            Choose Your Program Plan to Start <span className="text-amber-400">Level 1</span>
          </h1>

          <p className="text-sm sm:text-base text-purple-200 max-w-2xl mx-auto font-medium">
            Click on your subscription plan below to launch the **Level 1 Grade Pop-Up**. Step into the full DAV solved chapter repository!
          </p>

          {/* 3 Interactive Plan Cards (Normal, VIP, VVIP) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 max-w-5xl mx-auto text-left">
            
            {/* 1. Normal Plan Card */}
            <div 
              onClick={() => handleSelectPlan('normal')}
              className={`p-6 rounded-3xl border-2 transition-all transform hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${
                activePlan === 'normal'
                  ? 'bg-gradient-to-b from-purple-900/90 to-purple-950 border-emerald-400 shadow-xl shadow-emerald-500/20'
                  : 'bg-purple-950/50 border-purple-800/60 hover:border-purple-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Normal Plan
                </span>
                <span className="text-xs font-bold text-emerald-300">1 Site Unlocked</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">Standard Explorer</h3>
              <p className="text-xs text-purple-200/80 mb-6 leading-relaxed">
                Unlock direct chapter-by-chapter verified answers from **Solution Gyan**.
              </p>
              <div className="space-y-2 text-xs font-semibold text-purple-200 mb-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>Solution Gyan (Unlocked)</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400/60">
                  <Lock className="w-4 h-4" /> <span>Learn Cram (Locked)</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400/60">
                  <Lock className="w-4 h-4" /> <span>ncertbookpdf.com (Locked)</span>
                </div>
              </div>
              <button 
                type="button"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Select Normal Plan &amp; Play 🎮</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 2. VIP Plan Card */}
            <div 
              onClick={() => handleSelectPlan('vip')}
              className={`p-6 rounded-3xl border-2 transition-all transform hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${
                activePlan === 'vip'
                  ? 'bg-gradient-to-b from-purple-900/90 to-purple-950 border-blue-400 shadow-xl shadow-blue-500/20'
                  : 'bg-purple-950/50 border-purple-800/60 hover:border-purple-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  VIP Plan
                </span>
                <span className="text-xs font-bold text-blue-300">2 Sites Unlocked</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">Elite Scholar</h3>
              <p className="text-xs text-purple-200/80 mb-6 leading-relaxed">
                Double source coverage with **Solution Gyan** and **Learn Cram** textbook solutions.
              </p>
              <div className="space-y-2 text-xs font-semibold text-purple-200 mb-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>Solution Gyan (Unlocked)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>Learn Cram (Unlocked)</span>
                </div>
                <div className="flex items-center gap-2 text-purple-400/60">
                  <Lock className="w-4 h-4" /> <span>ncertbookpdf.com (Locked)</span>
                </div>
              </div>
              <button 
                type="button"
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Select VIP Plan &amp; Play ⚡</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3. VVIP Plan Card (Highlighted / Recommended) */}
            <div 
              onClick={() => handleSelectPlan('vvip')}
              className={`p-6 rounded-3xl border-2 transition-all transform hover:-translate-y-1.5 cursor-pointer relative overflow-hidden ${
                activePlan === 'vvip'
                  ? 'bg-gradient-to-b from-purple-900/90 to-purple-950 border-amber-400 shadow-2xl shadow-amber-500/30'
                  : 'bg-purple-950/50 border-purple-800/60 hover:border-purple-500'
              }`}
            >
              <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-md">
                Full Power
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  VVIP Master
                </span>
                <span className="text-xs font-bold text-amber-300">All 3 Sites Unlocked</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1">Supreme Champion 👑</h3>
              <p className="text-xs text-purple-200/80 mb-6 leading-relaxed">
                Maximum power across **Solution Gyan**, **Learn Cram**, and **ncertbookpdf.com**!
              </p>
              <div className="space-y-2 text-xs font-semibold text-purple-200 mb-6">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>Solution Gyan (Unlocked)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>Learn Cram (Unlocked)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <CheckCircle2 className="w-4 h-4" /> <span>ncertbookpdf.com (Unlocked)</span>
                </div>
              </div>
              <button 
                type="button"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition"
              >
                <span>Select VVIP Plan &amp; Play 🌟</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Direct Pop-Up Trigger Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={() => {
                playSfx('level');
                setActiveModal('level1_grade');
              }}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:opacity-95 text-white font-black text-sm uppercase tracking-wider inline-flex items-center gap-3 shadow-2xl shadow-purple-500/40 cursor-pointer transform hover:scale-105 transition"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Open Level 1 Grade Pop-Up ({activePlan.toUpperCase()})</span>
            </button>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* POP-UP MODAL 1: LEVEL 1 GRADE / CLASS SELECTION (Class LKG to Class 8)    */}
      {/* ========================================================================= */}
      {activeModal === 'level1_grade' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#190a36] via-[#240e4f] to-[#120524] border-2 border-purple-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Pop-Up Header */}
            <div className="p-5 sm:p-6 bg-purple-950/80 border-b border-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base shadow-md">
                  1
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    {activePlan.toUpperCase()} Plan • Quest Step 1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>Level 1: Choose Your Grade</span>
                    <span>🎯</span>
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-purple-900/60 hover:bg-rose-600 text-purple-200 hover:text-white flex items-center justify-center transition border border-purple-700 cursor-pointer"
                title="Close Pop-Up"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pop-Up Body: Grid of Classes LKG to Class 8 */}
            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs sm:text-sm text-purple-200">
                Select your class to proceed to <strong className="text-amber-300">Level 2 Subject Selection</strong>. E.g. Click <strong className="text-white">Class 8</strong> to unlock all Class 8 subjects!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-2">
                {gradeLevels.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleSelectGrade(item.cls)}
                    className={`p-4 rounded-2xl border-2 text-left transition transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer relative overflow-hidden group ${
                      selectedClass === item.cls
                        ? 'bg-gradient-to-br from-amber-400/20 to-purple-600/30 border-amber-400 shadow-lg shadow-amber-500/20'
                        : 'bg-purple-950/40 border-purple-700/50 hover:border-purple-400 hover:bg-purple-900/50'
                    }`}
                  >
                    <div className="text-3xl mb-2 group-hover:scale-125 transition transform">
                      {item.emoji}
                    </div>
                    <div className="font-black text-base text-white flex items-center justify-between">
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition" />
                    </div>
                    <div className="text-[10px] font-bold text-amber-300 mt-1 line-clamp-1">
                      {item.badge}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pop-Up Footer Navigation */}
            <div className="p-4 bg-purple-950/60 border-t border-purple-800/80 flex items-center justify-between text-xs">
              <span className="text-purple-300">Current Program: <strong className="text-amber-400">{activePlan.toUpperCase()} Plan</strong></span>
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700 text-white font-bold transition"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POP-UP MODAL 2: LEVEL 2 SUBJECT SELECTION                                */}
      {/* ========================================================================= */}
      {activeModal === 'level2_subject' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#190a36] via-[#240e4f] to-[#120524] border-2 border-purple-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Pop-Up Header */}
            <div className="p-5 sm:p-6 bg-purple-950/80 border-b border-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSfx('pop');
                    setActiveModal('level1_grade');
                  }}
                  className="w-9 h-9 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white flex items-center justify-center transition border border-purple-600"
                  title="Back to Grade Selection"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    {activePlan.toUpperCase()} Plan • Class {selectedClass} • Step 2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>Level 2: Choose Subject</span>
                    <span>⚡</span>
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-purple-900/60 hover:bg-rose-600 text-purple-200 hover:text-white flex items-center justify-center transition border border-purple-700 cursor-pointer"
                title="Close Pop-Up"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter for subjects */}
            <div className="px-6 pt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                <input
                  type="text"
                  value={subjectSearch}
                  onChange={(e) => setSubjectSearch(e.target.value)}
                  placeholder={`Search Class ${selectedClass} subjects (e.g. Science, Maths, Hindi)...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700 text-white placeholder-purple-400/70 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Pop-Up Body: Grid of Subjects */}
            <div className="p-6 overflow-y-auto space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredSubjects.map((sub) => {
                  const isScience = sub.name.toLowerCase().includes('science');
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleSelectSubject(sub)}
                      className={`p-4 rounded-2xl border-2 text-left transition transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer flex flex-col justify-between space-y-3 group ${
                        isScience
                          ? 'bg-gradient-to-br from-emerald-950/80 via-purple-950/80 to-purple-900/80 border-emerald-400 shadow-md shadow-emerald-500/10'
                          : 'bg-purple-950/40 border-purple-700/50 hover:border-purple-400 hover:bg-purple-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-8 h-8 rounded-lg bg-purple-800 text-amber-300 flex items-center justify-center text-sm font-black">
                            {isScience ? '🔬' : '📚'}
                          </span>
                          {isScience && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                              20 Chapters Ready 🔥
                            </span>
                          )}
                        </div>
                        <h4 className="font-black text-sm text-white group-hover:text-amber-300 transition">
                          {sub.name}
                        </h4>
                        <p className="text-[11px] text-purple-200/80 mt-1 line-clamp-2">
                          {sub.tagline || 'DAV Board curriculum solutions & exercises'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-amber-400">
                        <span>Select Subject</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredSubjects.length === 0 && (
                <div className="text-center py-10 text-purple-300">
                  <p>No subjects found matching "{subjectSearch}".</p>
                </div>
              )}
            </div>

            {/* Pop-Up Footer Navigation */}
            <div className="p-4 bg-purple-950/60 border-t border-purple-800/80 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  playSfx('pop');
                  setActiveModal('level1_grade');
                }}
                className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Grade Selection</span>
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700 text-white font-bold transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POP-UP MODAL 3: LEVEL 3 CHAPTER SELECTION (All 20 Class 8 Science Chaps) */}
      {/* ========================================================================= */}
      {activeModal === 'level3_chapter' && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#190a36] via-[#240e4f] to-[#120524] border-2 border-purple-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Pop-Up Header */}
            <div className="p-5 sm:p-6 bg-purple-950/80 border-b border-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSfx('pop');
                    setActiveModal('level2_subject');
                  }}
                  className="w-9 h-9 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white flex items-center justify-center transition border border-purple-600"
                  title="Back to Subject Selection"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    {activePlan.toUpperCase()} Plan • Class {selectedClass} • {selectedSubject.name}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>Level 3: Choose Chapter ({currentChapters.length} Chapters)</span>
                    <span>📖</span>
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-purple-900/60 hover:bg-rose-600 text-purple-200 hover:text-white flex items-center justify-center transition border border-purple-700 cursor-pointer"
                title="Close Pop-Up"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter for chapters */}
            <div className="px-6 pt-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-purple-400" />
                <input
                  type="text"
                  value={chapterSearch}
                  onChange={(e) => setChapterSearch(e.target.value)}
                  placeholder="Search chapter number or title (e.g. 11, The Eye, Combustion, Force)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/60 border border-purple-700 text-white placeholder-purple-400/70 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Pop-Up Body: Grid of all Chapters */}
            <div className="p-6 overflow-y-auto space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredChapters.map((chap) => {
                  const isEyeChapter = chap.number === 11;
                  return (
                    <button
                      key={chap.number}
                      type="button"
                      onClick={() => handleSelectChapter(chap)}
                      className={`p-4 rounded-2xl border-2 text-left transition transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer flex flex-col justify-between space-y-3 group ${
                        isEyeChapter
                          ? 'bg-gradient-to-br from-amber-500/20 via-purple-950 to-purple-900 border-amber-400 shadow-xl shadow-amber-500/20'
                          : 'bg-purple-950/40 border-purple-700/50 hover:border-purple-400 hover:bg-purple-900/60'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            isEyeChapter 
                              ? 'bg-amber-400 text-slate-950 shadow-sm' 
                              : 'bg-purple-800 text-purple-200'
                          }`}>
                            Chapter {chap.number}
                          </span>
                          {isEyeChapter && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-300">
                              <Eye className="w-3.5 h-3.5" />
                              <span>Featured</span>
                            </span>
                          )}
                        </div>

                        <h4 className="font-black text-sm text-white group-hover:text-amber-300 transition">
                          {chap.title}
                        </h4>

                        <p className="text-[11px] text-purple-200/80 mt-1 line-clamp-2 leading-relaxed">
                          {chap.tagline}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between text-xs font-bold text-purple-300 group-hover:text-amber-400">
                        <span>View Solutions</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {filteredChapters.length === 0 && (
                <div className="text-center py-10 text-purple-300">
                  <p>No chapters found matching "{chapterSearch}".</p>
                </div>
              )}
            </div>

            {/* Pop-Up Footer Navigation */}
            <div className="p-4 bg-purple-950/60 border-t border-purple-800/80 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  playSfx('pop');
                  setActiveModal('level2_subject');
                }}
                className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Subject Selection</span>
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700 text-white font-bold transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POP-UP MODAL 4: LEVEL 4 CHOOSE SOLUTION SOURCE WEBSITE (3 TIERS)           */}
      {/* ========================================================================= */}
      {activeModal === 'level4_source' && selectedChapter && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] bg-gradient-to-br from-[#190a36] via-[#240e4f] to-[#120524] border-2 border-amber-400/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
            
            {/* Pop-Up Header */}
            <div className="p-5 sm:p-6 bg-purple-950/90 border-b border-purple-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSfx('pop');
                    setActiveModal('level3_chapter');
                  }}
                  className="w-9 h-9 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-white flex items-center justify-center transition border border-purple-600"
                  title="Back to Chapter Selection"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    {activePlan.toUpperCase()} Plan • Class {selectedClass} • Chapter {selectedChapter.number}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>Level 4: Select Solution Source</span>
                    <span>🚀</span>
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-xl bg-purple-900/60 hover:bg-rose-600 text-purple-200 hover:text-white flex items-center justify-center transition border border-purple-700 cursor-pointer"
                title="Close Pop-Up"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chapter Selection Highlight Banner */}
            <div className="p-5 bg-gradient-to-r from-amber-500/20 via-purple-900/40 to-indigo-900/30 border-b border-purple-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Target Chapter</span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Chapter {selectedChapter.number}: {selectedChapter.title}
                </h3>
                <p className="text-xs text-purple-200/80 mt-0.5">
                  Subject: {selectedSubject.name} (Class {selectedClass})
                </p>
              </div>

              {/* Instant Shankar AI trigger */}
              <button
                type="button"
                onClick={() => {
                  onOpenAIWithQuestion && onOpenAIWithQuestion(
                    `Give me complete solved textbook back-exercise questions, fill in the blanks, true/false, and short/long answers for DAV Class ${selectedClass} ${selectedSubject.name} Chapter ${selectedChapter.number} (${selectedChapter.title}).`
                  );
                  handleCloseModal();
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition whitespace-nowrap cursor-pointer"
              >
                <Brain className="w-4 h-4 text-amber-300" />
                <span>Ask Shankar AI Instantly</span>
              </button>
            </div>

            {/* Pop-Up Body: 3 Solution Website Cards */}
            <div className="p-6 overflow-y-auto space-y-5">
              <p className="text-xs sm:text-sm text-purple-200">
                Choose from verified academic portals below. Clicking on any unlocked source will open the exact chapter solution page:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* 1. Website 1: Solution Gyan (UNLOCKED FOR ALL) */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/60 to-purple-950/80 border-2 border-emerald-400/80 shadow-lg shadow-emerald-500/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-400 text-slate-950">
                        Site 1 • Normal Plan
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>UNLOCKED</span>
                      </span>
                    </div>

                    <h4 className="font-black text-lg text-white">
                      Solution Gyan
                    </h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      Primary verified DAV Board chapter solutions with step-by-step exercise answers, fill-in-the-blanks, true/false, and detailed explanations.
                    </p>

                    {selectedChapter.solutionGyanUrl && (
                      <div className="pt-1">
                        <span className="text-[10px] font-black text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 shadow-sm">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Exact Direct Chapter Solution Page Verified!</span>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => handleLaunchWebsite('solutiongyan', sourceUrls.solutionGyan)}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition cursor-pointer"
                    >
                      <span>Open Solution Gyan 🚀</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {sourceUrls.solutionGyanHub && (
                      <button
                        type="button"
                        onClick={() => handleLaunchWebsite('solutiongyan-hub', sourceUrls.solutionGyanHub)}
                        className="w-full py-2 px-3 rounded-lg bg-purple-900/40 hover:bg-purple-800/60 text-purple-200 hover:text-white font-bold text-[10px] flex items-center justify-center gap-1 transition text-center border border-purple-700/60 cursor-pointer"
                      >
                        <Globe className="w-3 h-3 text-amber-300" />
                        <span>Or Browse DAV Class {selectedClass} Subject Index</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Website 2: Learn Cram (UNLOCKED FOR VIP & VVIP) */}
                <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 ${
                  isVipUnlocked
                    ? 'bg-gradient-to-b from-blue-950/60 to-purple-950/80 border-blue-400/80 shadow-lg shadow-blue-500/10'
                    : 'bg-purple-950/40 border-purple-800/60 opacity-80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-400 text-slate-950">
                        Site 2 • VIP Plan
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-black ${isVipUnlocked ? 'text-blue-400' : 'text-purple-400'}`}>
                        {isVipUnlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span>{isVipUnlocked ? 'UNLOCKED' : 'LOCKED (VIP)'}</span>
                      </span>
                    </div>

                    <h4 className="font-black text-lg text-white">
                      Learn Cram
                    </h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      Alternative chapter question bank, revision notes, HOTS concept questions, and quick revision mind maps.
                    </p>
                  </div>

                  <div className="pt-2">
                    {isVipUnlocked ? (
                      <button
                        type="button"
                        onClick={() => handleLaunchWebsite('learncram', sourceUrls.learnCram)}
                        className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                      >
                        <span>Open Learn Cram ⚡</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseModal();
                          onOpenUpgradeModal && onOpenUpgradeModal();
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border border-purple-700"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Unlock VIP 2nd Site</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Website 3: ncertbookpdf.com (UNLOCKED FOR VVIP) */}
                <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 ${
                  isVvipUnlocked
                    ? 'bg-gradient-to-b from-amber-950/60 to-purple-950/80 border-amber-400/80 shadow-lg shadow-amber-500/20'
                    : 'bg-purple-950/40 border-purple-800/60 opacity-80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-slate-950">
                        Site 3 • VVIP Master
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-black ${isVvipUnlocked ? 'text-amber-400' : 'text-purple-400'}`}>
                        {isVvipUnlocked ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        <span>{isVvipUnlocked ? 'UNLOCKED' : 'LOCKED (VVIP)'}</span>
                      </span>
                    </div>

                    <h4 className="font-black text-lg text-white">
                      ncertbookpdf.com
                    </h4>
                    <p className="text-xs text-purple-200/80 leading-relaxed">
                      Downloadable PDF guide solutions, blueprint answers, board sample papers, and solved answer keys.
                    </p>
                  </div>

                  <div className="pt-2">
                    {isVvipUnlocked ? (
                      <button
                        type="button"
                        onClick={() => handleLaunchWebsite('ncertbookpdf', sourceUrls.ncertBookPdf)}
                        className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition cursor-pointer"
                      >
                        <span>Open ncertbookpdf 🌟</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleCloseModal();
                          onOpenUpgradeModal && onOpenUpgradeModal();
                        }}
                        className="w-full py-3 px-4 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-amber-300 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer border border-purple-700"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Unlock VVIP All 3 Sites</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Pop-Up Footer Navigation */}
            <div className="p-4 bg-purple-950/60 border-t border-purple-800/80 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  playSfx('pop');
                  setActiveModal('level3_chapter');
                }}
                className="inline-flex items-center gap-1.5 text-purple-300 hover:text-white font-bold"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Chapter Selection</span>
              </button>

              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-xl bg-purple-800/60 hover:bg-purple-700 text-white font-bold transition"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default QuestionsAnswersSection;
