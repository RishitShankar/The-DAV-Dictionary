import React, { useState } from 'react';
import { 
  HelpCircle, BookOpen, Sparkles, CheckCircle2, Lock, 
  ArrowRight, ExternalLink, ChevronRight, RotateCcw, 
  Volume2, VolumeX, Award, ShieldCheck, Flame, Zap, 
  Search, Compass, Star, Brain, Play, Check, Layers
} from 'lucide-react';
import { DAV_SUBJECTS } from '../data/mockData';

export function QuestionsAnswersSection({ 
  currentUser, 
  onOpenUpgradeModal,
  onOpenAIWithQuestion 
}) {
  // Navigation Flow State:
  // Step 1: 'class_select' (Modal/Grid to choose Grade LKG-8)
  // Step 2: 'subject_select' (Modal/Grid to choose Subject for that Grade)
  // Step 3: 'subject_chosen' (Paused at subject choice with tiered Q&A sources ready for next instruction)
  const [currentStep, setCurrentStep] = useState('class_select');
  const [selectedClass, setSelectedClass] = useState(8);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchSubject, setSearchSubject] = useState('');
  const [activeTabSource, setActiveTabSource] = useState('solutiongyan');

  // Detect user tier plan
  const userPlan = currentUser?.plan || 'normal';
  const isVip = userPlan === 'vip' || currentUser?.dimension >= 2;
  const isVvip = userPlan === 'vvip' || currentUser?.dimension >= 3 || currentUser?.isAdmin;

  // Synthesized game-like sound effects (No external mp3 needed)
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
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      } else if (type === 'level') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(554.37, audioCtx.currentTime + 0.08); // C#
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.16); // E
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
      }
    } catch (e) {}
  };

  const classLevels = [
    { cls: 8, label: 'Class 8', badge: 'Board Topper Level', color: 'from-rose-500 via-red-600 to-amber-600', emoji: '🔥', desc: 'Complete Board Syllabus Solutions' },
    { cls: 7, label: 'Class 7', badge: 'Senior Challenger', color: 'from-blue-600 via-indigo-600 to-purple-600', emoji: '⚡', desc: 'Pre-Board Concept Mastery' },
    { cls: 6, label: 'Class 6', badge: 'Middle School Champion', color: 'from-emerald-500 via-teal-600 to-cyan-600', emoji: '🏆', desc: 'Secondary Curriculum Solutions' },
    { cls: 5, label: 'Class 5', badge: 'Primary Senior Star', color: 'from-amber-500 via-orange-600 to-red-600', emoji: '⭐', desc: 'Living World, SST & Bhasha Madhuri' },
    { cls: 4, label: 'Class 4', badge: 'Junior Whiz', color: 'from-cyan-500 via-blue-600 to-indigo-600', emoji: '🚀', desc: 'English Reader, Math & EVS Q&A' },
    { cls: 3, label: 'Class 3', badge: 'Curious Explorer', color: 'from-purple-500 via-pink-600 to-rose-600', emoji: '💡', desc: 'Exercise Solutions & Story Notes' },
    { cls: 2, label: 'Class 2', badge: 'Rising Star', color: 'from-teal-500 via-emerald-600 to-green-600', emoji: '🌱', desc: 'Primary Numeracy & Word Exercises' },
    { cls: 1, label: 'Class 1', badge: 'Foundation Scout', color: 'from-yellow-500 via-amber-600 to-orange-600', emoji: '🎯', desc: 'Step-by-step Fun Learning Q&A' },
    { cls: 'UKG', label: 'UKG', badge: 'Kindergarten Explorer', color: 'from-pink-500 via-rose-500 to-red-500', emoji: '🎨', desc: 'Bal Madhuri & Early Math Answers' },
    { cls: 'LKG', label: 'LKG', badge: 'Little Champions', color: 'from-lime-500 via-green-600 to-emerald-600', emoji: '🧸', desc: 'Activity Workbook & Fun Phonics' }
  ];

  const handleSelectClass = (cls) => {
    playSfx('level');
    setSelectedClass(cls);
    setSelectedSubject(null);
    setCurrentStep('subject_select');
  };

  const handleSelectSubject = (subject) => {
    playSfx('select');
    setSelectedSubject(subject);
    setCurrentStep('subject_chosen');
  };

  const handleResetToClass = () => {
    playSfx('pop');
    setCurrentStep('class_select');
  };

  const handleResetToSubject = () => {
    playSfx('pop');
    setCurrentStep('subject_select');
  };

  // Get subjects for selected class
  const availableSubjects = DAV_SUBJECTS[selectedClass] || [];
  const filteredSubjects = availableSubjects.filter(s => 
    s.name.toLowerCase().includes(searchSubject.toLowerCase()) ||
    (s.tagline && s.tagline.toLowerCase().includes(searchSubject.toLowerCase()))
  );

  // Generate dynamic source URLs for the selected subject
  const getSubjectSourceUrls = () => {
    if (!selectedSubject) return {};
    const query = encodeURIComponent(`DAV Class ${selectedClass} ${selectedSubject.name} question answer solutions`);
    return {
      solutionGyan: `https://solutiongyan.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(selectedSubject.name)}`,
      learnCram: `https://www.learncram.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(selectedSubject.name)}`,
      ncertBookPdf: `https://ncertbookpdf.com/?s=DAV+Class+${selectedClass}+${encodeURIComponent(selectedSubject.name)}`
    };
  };

  const sourceUrls = getSubjectSourceUrls();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/80 via-purple-50/40 to-cyan-50/60 py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Playful Floating Game Orbs & Particle Accents */}
      <div className="absolute top-12 left-10 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-12 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 left-1/4 w-72 h-72 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Hero: Gen Z Arcade Quest Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white border-2 border-purple-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-purple-400/30">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                <span>Section 3 • DAV Board Solved Q&amp;A Arcade</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <span>DAV Question &amp; Answer Vault</span>
                <span className="text-2xl">⚡</span>
              </h1>
              <p className="text-xs sm:text-sm text-purple-200 mt-2 max-w-2xl leading-relaxed">
                Step-by-step solved chapter back-questions, value-based questions, short answers, and DAV board exam solutions extracted across top verified academic portals for LKG to Class 8!
              </p>

              {/* Tier Information Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mt-4 text-xs">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Normal Plan: <strong>1 Site (Solution Gyan)</strong></span>
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 font-bold border border-purple-500/40 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>VIP Plan: <strong>2 Sites (+ Learn Cram)</strong></span>
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-200 font-bold border border-amber-500/40 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-300" />
                  <span>VVIP Plan: <strong>All 3 Sites (+ ncertbookpdf)</strong></span>
                </span>
              </div>
            </div>

            {/* Sound FX Toggle & Reset Button */}
            <div className="shrink-0 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setSoundEnabled(prev => !prev)}
                className={`p-3 rounded-2xl border transition cursor-pointer flex items-center gap-2 text-xs font-bold ${
                  soundEnabled 
                    ? 'bg-purple-900/60 border-purple-400/40 text-amber-300 hover:bg-purple-800' 
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
                title={soundEnabled ? 'Mute Game SFX' : 'Enable Game Sound Effects'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX MUTED'}</span>
              </button>

              <button
                type="button"
                onClick={handleResetToClass}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition cursor-pointer"
                title="Restart Selection from Grade 1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Quest</span>
              </button>
            </div>
          </div>

          {/* Interactive Quest Progress Bar */}
          <div className="mt-6 pt-5 border-t border-purple-800/40 grid grid-cols-3 gap-2 text-center text-xs">
            <div 
              onClick={handleResetToClass}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                currentStep === 'class_select'
                  ? 'bg-amber-400 text-stone-950 font-black shadow-md border-amber-300 scale-102'
                  : 'bg-slate-900/80 text-purple-200 border-purple-800/50 hover:bg-purple-900/40'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">Step 1</div>
              <div className="font-extrabold truncate">
                {selectedClass ? (typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`) : 'Pick Grade'}
              </div>
            </div>

            <div 
              onClick={() => selectedClass && setCurrentStep('subject_select')}
              className={`p-2.5 rounded-xl border transition ${
                currentStep === 'subject_select'
                  ? 'bg-amber-400 text-stone-950 font-black shadow-md border-amber-300 scale-102'
                  : currentStep === 'subject_chosen'
                    ? 'bg-purple-900/80 text-white border-purple-400/50 cursor-pointer font-bold'
                    : 'bg-slate-900/80 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">Step 2</div>
              <div className="font-extrabold truncate">
                {selectedSubject ? selectedSubject.name : 'Select Subject'}
              </div>
            </div>

            <div 
              className={`p-2.5 rounded-xl border transition ${
                currentStep === 'subject_chosen'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black shadow-lg border-emerald-300 scale-102 animate-pulse'
                  : 'bg-slate-900/80 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider opacity-80">Step 3</div>
              <div className="font-extrabold truncate">
                {currentStep === 'subject_chosen' ? 'Q&A Vault Unlocked' : 'Paused & Waiting'}
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* STEP 1: CLASS SELECTION POP-UP / INTERACTIVE GAME MODAL */}
        {/* ========================================================================= */}
        {currentStep === 'class_select' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-200 space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold uppercase">
                  <span>Level 1: Grade Select</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Choose Your Class (LKG to Class 8)
                </h2>
                <p className="text-xs text-slate-500">
                  Select your grade to view all official DAV subject question answers
                </p>
              </div>

              <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                10 Grade Levels Available
              </div>
            </div>

            {/* 10 Grade Cards Grid with Gen Z Game Animations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
              {classLevels.map((lvl) => {
                const isSelected = selectedClass === lvl.cls;
                return (
                  <div
                    key={String(lvl.cls)}
                    onClick={() => handleSelectClass(lvl.cls)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-1.5 relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-orange-50 ring-4 ring-amber-400/20'
                        : 'border-slate-200/90 bg-slate-50 hover:border-purple-400 hover:bg-white'
                    }`}
                  >
                    {/* Top Emoji & Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        {lvl.emoji}
                      </span>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 group-hover:bg-purple-100 group-hover:text-purple-900 transition-colors">
                        {lvl.badge}
                      </span>
                    </div>

                    {/* Class Title */}
                    <div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-purple-900 transition-colors">
                        {lvl.label}
                      </h3>
                      <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {lvl.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-black text-purple-700 group-hover:text-purple-900">
                      <span>Pick Grade</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: SUBJECT SELECTION POP-UP / INTERACTIVE GAME MODAL */}
        {/* ========================================================================= */}
        {currentStep === 'subject_select' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-200 space-y-6 animate-fadeIn">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetToClass}
                    className="text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>← Change Class</span>
                  </button>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Level 2: Select Subject for {typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`}
                </h2>
                <p className="text-xs text-slate-500">
                  Click on any subject to explore solved question answers and website resources
                </p>
              </div>

              {/* Search Subject Input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search subject..."
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubjects.map((sub) => {
                const isSelected = selectedSubject?.id === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubject(sub)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-xl hover:-translate-y-1 relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 ring-4 ring-amber-400/20'
                        : 'border-slate-200 bg-slate-50/70 hover:border-purple-400 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sub.color || 'from-purple-600 to-indigo-700'} text-white flex items-center justify-center font-bold shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0`}>
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">
                          Official Curriculum
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 group-hover:text-purple-900 transition-colors">
                          {sub.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {sub.tagline || 'Textbook exercise solutions, key chapter notes and back-question answers.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-black text-purple-700 group-hover:text-purple-900">
                      <span>Choose {sub.name}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredSubjects.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-xs">
                No subjects matched your search "{searchSubject}".
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: SUBJECT CHOSEN — PAUSED AND DISPLAYING TIERED SOURCES */}
        {/* As requested: "Pause there after choosing the subject and then I will tell you what you have to do" */}
        {/* ========================================================================= */}
        {currentStep === 'subject_chosen' && selectedSubject && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-200 space-y-8 animate-fadeIn">
            
            {/* Top Bar with Selected Info & Change Options */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedSubject.color || 'from-red-600 to-amber-600'} text-white flex items-center justify-center shadow-xl shrink-0`}>
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                      {typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`}
                    </span>
                    <span className="text-xs font-bold text-slate-400">•</span>
                    <span className="text-xs font-bold text-slate-500">Subject Selected</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                    {selectedSubject.name}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedSubject.tagline || 'Official DAV curriculum textbook and chapter exercise solutions.'}
                  </p>
                </div>
              </div>

              {/* Action Buttons to Switch Grade or Subject */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetToSubject}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition cursor-pointer"
                >
                  Switch Subject
                </button>
                <button
                  type="button"
                  onClick={handleResetToClass}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition cursor-pointer"
                >
                  Change Class
                </button>
              </div>
            </div>

            {/* Official Instructions Pause Notice Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-dashed border-amber-400 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shrink-0 shadow-md">
                  <Play className="w-5 h-5 fill-stone-950" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-amber-800 tracking-wider">
                    Paused at Subject Selection (Ready for Your Next Command)
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5">
                    You have selected <strong>Class {selectedClass} • {selectedSubject.name}</strong>. The 3 tiered website sources are configured below. Tell me what next action or chapter integration you want to build!
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onOpenAIWithQuestion?.(`Give me all solved chapter question answers for DAV Class ${selectedClass} ${selectedSubject.name}`)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition"
                >
                  <Brain className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask Shankar AI</span>
                </button>
              </div>
            </div>

            {/* The 3 Tiered Extraction Websites */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-700" />
                  <span>Configured Q&amp;A Solution Websites (Based on User Tier)</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  Your Tier: <span className="text-purple-800 font-extrabold uppercase">{userPlan}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* 1. Website 1: Solution Gyan (UNLOCKED FOR ALL USERS) */}
                <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-50/80 to-white border-2 border-emerald-300 shadow-md flex flex-col justify-between space-y-4 relative overflow-hidden">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                        Site 1 • Normal Plan
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>UNLOCKED</span>
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900">
                      Solution Gyan
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Primary verified DAV Board chapter solutions with fill in the blanks, true/false, short questions, and long answer explanations.
                    </p>
                  </div>

                  <div className="pt-2">
                    <a
                      href={sourceUrls.solutionGyan}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition block text-center"
                    >
                      <span>Open on Solution Gyan</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* 2. Website 2: Learn Cram (UNLOCKED FOR VIP & VVIP) */}
                <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 relative overflow-hidden ${
                  isVip || isVvip
                    ? 'bg-gradient-to-b from-blue-50/80 to-white border-blue-300 shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-900 border border-blue-300">
                        Site 2 • VIP Plan
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${isVip || isVvip ? 'text-blue-700' : 'text-slate-500'}`}>
                        {isVip || isVvip ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{isVip || isVvip ? 'UNLOCKED' : 'LOCKED (VIP)'}</span>
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900">
                      Learn Cram
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Alternative multi-step textbook answer bank, HOTS questions, revision key points, and chapter summary notes.
                    </p>
                  </div>

                  <div className="pt-2">
                    {isVip || isVvip ? (
                      <a
                        href={sourceUrls.learnCram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition block text-center"
                      >
                        <span>Open on Learn Cram</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenUpgradeModal}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock 2nd Source (VIP)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Website 3: ncertbookpdf.com (UNLOCKED FOR VVIP & DEV MASTER) */}
                <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between space-y-4 relative overflow-hidden ${
                  isVvip
                    ? 'bg-gradient-to-b from-amber-50/80 to-white border-amber-300 shadow-md'
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                        Site 3 • VVIP Master
                      </span>
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${isVvip ? 'text-amber-700' : 'text-slate-500'}`}>
                        {isVvip ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        <span>{isVvip ? 'UNLOCKED' : 'LOCKED (VVIP)'}</span>
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900">
                      ncertbookpdf.com
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Downloadable PDF guide solutions, previous year question papers, blueprint weightage, and solved answer keys.
                    </p>
                  </div>

                  <div className="pt-2">
                    {isVvip ? (
                      <a
                        href={sourceUrls.ncertBookPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm transition block text-center"
                      >
                        <span>Open on ncertbookpdf</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenUpgradeModal}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock All 3 Sources (VVIP)</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default QuestionsAnswersSection;
