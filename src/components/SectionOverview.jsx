import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Brain, Award, FileText, User, 
  HelpCircle, Bell, Compass, ArrowRight, Sparkles, 
  Layers, School, Heart, CheckCircle2, Star, Zap, Flame,
  BookmarkCheck, MessageCircle, ShieldCheck, Video, Bus, Navigation, 
  CheckSquare, MapPin, Trophy, Play, KeyRound
} from 'lucide-react';

// =========================================================================
// FLOATING BALLOON CIRCLES (User's Favorite Animation)
// Smooth, vibrant, colorful ambient circles floating gracefully in background
// =========================================================================
function FloatingBalloonsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Large Glowing Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-500/25 blur-3xl vfx-ambient-orb-gold" />
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-bl from-rose-500/25 to-red-600/20 blur-3xl vfx-ambient-orb-ruby" />
      <div className="absolute bottom-10 left-1/3 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-cyan-400/25 to-blue-600/20 blur-3xl vfx-ambient-orb-cyan" />
      <div className="absolute top-2/3 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/25 to-teal-600/20 blur-3xl vfx-ambient-orb-emerald" />
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-purple-500/25 to-pink-500/20 blur-3xl vfx-ambient-orb-purple" />

      {/* Floating Balloon Circles with dynamic bobbing & drifting motions */}
      <div className="absolute top-24 left-[12%] w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/40 to-yellow-300/30 shadow-lg backdrop-blur-xs border border-amber-300/40 vfx-floating-balloon-1" />
      <div className="absolute top-48 right-[15%] w-28 h-28 rounded-full bg-gradient-to-tr from-rose-400/35 to-pink-300/25 shadow-xl backdrop-blur-xs border border-rose-300/40 vfx-floating-balloon-2" />
      <div className="absolute top-[42%] left-[8%] w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/40 to-sky-300/30 shadow-md backdrop-blur-xs border border-cyan-300/40 vfx-floating-balloon-3" />
      <div className="absolute top-[60%] right-[10%] w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-400/35 to-teal-300/25 shadow-lg backdrop-blur-xs border border-emerald-300/40 vfx-floating-balloon-1" />
      <div className="absolute bottom-32 left-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/35 to-violet-300/25 shadow-xl backdrop-blur-xs border border-purple-300/40 vfx-floating-balloon-2" />
      <div className="absolute bottom-48 right-[25%] w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400/40 to-amber-300/30 shadow-md backdrop-blur-xs border border-orange-300/40 vfx-floating-balloon-3" />
      <div className="absolute top-[80%] left-[45%] w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/35 to-indigo-300/25 shadow-lg backdrop-blur-xs border border-blue-300/40 vfx-floating-balloon-1" />
    </div>
  );
}

// =========================================================================
// CLEAN SECTION CARD COMPONENT (No tilt, no rainbow beam)
// =========================================================================
function CleanSectionCard({ sec, isCurrent, isBeingClicked, onClick }) {
  const IconComp = sec.icon || Sparkles;

  return (
    <div
      onClick={onClick}
      className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${sec.cardBg} border-2 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer group select-none ${
        isCurrent
          ? 'border-amber-400 ring-4 ring-amber-400/20'
          : `border-slate-200/90 ${sec.borderHover}`
      } ${isBeingClicked ? 'scale-95 transition-transform' : ''}`}
    >
      {/* Corner Floating Emoji */}
      <div className="absolute -right-3 -bottom-3 text-6xl opacity-10 select-none pointer-events-none group-hover:scale-120 group-hover:opacity-20 transition-all duration-200">
        {sec.emoji}
      </div>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200 shrink-0`}>
              <IconComp className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Section {sec.id}
                </span>
                <span className="text-xs">{sec.emoji}</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight group-hover:text-red-900 transition-colors">
                {sec.shortTitle}
              </h3>
            </div>
          </div>

          <span className={`text-[10px] font-black px-3 py-1 rounded-full border shadow-2xs shrink-0 ${sec.tagColor}`}>
            {sec.tag}
          </span>
        </div>

        {/* Rich Description */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium">
          {sec.description}
        </p>
      </div>

      {/* Interactive Action Button */}
      <div className="pt-2 relative z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
            isCurrent
              ? 'bg-amber-400 text-stone-950 font-black shadow-md'
              : 'bg-slate-950 hover:bg-red-800 text-white hover:shadow-lg group-hover:bg-red-800'
          }`}
        >
          <span>{isCurrent ? '⭐ Current Active Hub' : `Enter Section ${sec.id} (${sec.shortTitle})`}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

// =========================================================================
// MAIN OVERVIEW HUB COMPONENT (SECTION 1)
// =========================================================================
export function SectionOverview({ currentUser, onSelectSection, onOpenPurchaseModal }) {
  const [clickedCardId, setClickedCardId] = useState(null);
  const [isSparkleActive, setIsSparkleActive] = useState(false);

  // Dimension 4 check: Sections 12 & 13 are strictly reserved for Developer Rishit Shankar
  const isDimension4 = Boolean(
    currentUser?.dimension === 4 ||
    currentUser?.id === 'rishibhai' ||
    currentUser?.studentId === 'rishibhai' ||
    currentUser?.role === 'developer'
  );

  const sectionsList = useMemo(() => [
    {
      id: 1,
      title: 'Section 1: Campus Overview',
      shortTitle: 'Campus Overview',
      icon: Compass,
      emoji: '🧭',
      color: 'from-amber-500 to-orange-600',
      cardBg: 'from-amber-500/10 via-amber-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'You Are Here',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      description: 'The master directory and architectural dashboard for all verified academic sections. Jump directly to any section with one click.'
    },
    {
      id: 2,
      title: 'Section 2: Digital Textbooks',
      shortTitle: 'Digital Textbooks',
      icon: BookOpen,
      emoji: '📚',
      color: 'from-red-600 to-rose-700',
      cardBg: 'from-red-500/10 via-rose-50/80 to-white',
      borderHover: 'hover:border-red-500',
      tag: '70+ Textbooks',
      tagColor: 'bg-red-100 text-red-900 border-red-300 font-bold',
      description: 'Complete digital repository with uncompressed, verified textbooks for Classes 1 to 8, UKG, and LKG. Includes the built-in PDF Reader with 10-color neon highlighter, pen, movable notes, and AI chapter teleportation.'
    },
    {
      id: 3,
      title: 'Section 3: Question Answers',
      shortTitle: 'Question Answers',
      icon: HelpCircle,
      emoji: '❓',
      color: 'from-blue-600 to-indigo-700',
      cardBg: 'from-blue-500/10 via-indigo-50/80 to-white',
      borderHover: 'hover:border-blue-500',
      tag: 'Curriculum Solutions',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300 font-bold',
      description: 'Chapter-by-chapter solved exercise answers, textbook back-question solutions, and key exam revision notes curated specifically for DAV Board syllabi.'
    },
    {
      id: 4,
      title: 'Section 4: Rishi AI',
      shortTitle: 'Rishi AI',
      icon: Brain,
      emoji: '⚡',
      color: 'from-orange-500 to-amber-600',
      cardBg: 'from-orange-500/10 via-amber-50/80 to-white',
      borderHover: 'hover:border-orange-500',
      tag: '24/7 AI Companion',
      tagColor: 'bg-orange-100 text-orange-900 border-orange-300 font-bold',
      description: 'Powered by Gemini AI and tuned specifically on DAV curriculum materials. Ask any academic doubt in Science, Mathematics, Hindi, English, Sanskrit, or Social Science.'
    },
    {
      id: 5,
      title: 'Section 5: Faculty Portal',
      shortTitle: 'Faculty Portal',
      icon: Award,
      emoji: '👨‍🏫',
      color: 'from-purple-600 via-fuchsia-600 to-purple-800',
      cardBg: 'from-purple-500/15 via-fuchsia-50/80 to-white',
      borderHover: 'hover:border-purple-500',
      tag: 'Faculty OS',
      tagColor: 'bg-purple-100 text-purple-950 border-purple-400 font-bold',
      description: 'Exclusive 5th Dimension Faculty Operating System for Teachers. Features daily homework dispatch, WhatsApp doubt clearing, live online classes, test creation, Rishi AI lesson planner, and student weakness radar.'
    },
    {
      id: 6,
      title: 'Section 6: Videos & Exams',
      shortTitle: 'Videos & Exams',
      icon: Video,
      emoji: '🎥',
      color: 'from-amber-500 via-orange-600 to-red-600',
      cardBg: 'from-amber-500/10 via-orange-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Videos • Notes • PYQs',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      description: 'Official chapter-wise video lectures from top verified DAV educators alongside Chapter Notes, Board PYQs (2020-2024), and official 7-Volume DAVCAE 80-mark sample papers (2020 to 2026).'
    },
    {
      id: 7,
      title: 'Section 7: Kids Fun Navigator',
      shortTitle: 'Kids Fun Navigator',
      icon: Bus,
      emoji: '🚌',
      color: 'from-amber-500 via-orange-500 to-red-600',
      cardBg: 'from-yellow-500/15 via-amber-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Kids Fun • Bus Radar',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      description: 'Exclusive Kids Fun Portal! Teleport to DAV School with auto-start live Google Maps directions, track Principal Anil Kumar Singh\'s school bus fleet with Bus ID & Password, and play the Bus Driver Arcade!'
    },
    {
      id: 8,
      title: 'Section 8: Examination & Practice',
      shortTitle: 'Exam & VVI Suite',
      icon: CheckSquare,
      emoji: '📝',
      color: 'from-emerald-500 to-teal-600',
      cardBg: 'from-emerald-500/10 via-teal-50/80 to-white',
      borderHover: 'hover:border-emerald-500',
      tag: '25/50/100 Qs • 20 VVI',
      tagColor: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-black',
      description: 'Advanced JEE-Style Examination & Board Practice Suite! Features timed 25, 50 & 100-question MCQ tests with anti-cheat, 20 high-yield VVI long-answer questions, and interactive SST map skills.'
    },
    {
      id: 9,
      title: 'Section 9: Study Leaderboard & Focus Suite',
      shortTitle: 'Study Leaderboard',
      icon: Trophy,
      emoji: '🏆',
      color: 'from-amber-500 to-yellow-600',
      cardBg: 'from-amber-500/10 via-yellow-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Campus Rankings',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      description: 'Official Campus Leaderboard tracking study time across Iron, Bronze, Silver, Gold & Diamond tiers, combined with deep focus sessions and binaural soundscapes.'
    },
    {
      id: 10,
      title: 'Section 10: Settings Hub & Student Profile',
      shortTitle: 'Settings & Profile',
      icon: User,
      emoji: '👤',
      color: 'from-violet-600 to-purple-800',
      cardBg: 'from-violet-500/10 via-purple-50/80 to-white',
      borderHover: 'hover:border-violet-500',
      tag: 'Photo DP & VFX Studio',
      tagColor: 'bg-violet-100 text-violet-900 border-violet-300 font-bold',
      description: 'Manage personal profile, avatar photo, 10-color portal text accents, dark/system themes, parental link codes, and customize background VFX via Animation Studio.'
    },
    {
      id: 11,
      title: 'Section 11: Donate & Reviews',
      shortTitle: 'Donate & Reviews',
      icon: Heart,
      emoji: '❤️',
      color: 'from-rose-600 to-pink-700',
      cardBg: 'from-rose-500/10 via-pink-50/80 to-white',
      borderHover: 'hover:border-rose-500',
      tag: 'Donate & Voice Review',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
      description: 'Support continuous portal maintenance with instant official receipts, and share student voice reviews with 677-word speech detection, audio recording, and 5-star ratings.'
    },
    {
      id: 12,
      title: 'Section 12: Developer Review Vault',
      shortTitle: 'Review Vault',
      icon: Star,
      emoji: '⭐',
      color: 'from-amber-700 to-red-900',
      cardBg: 'from-amber-500/10 via-red-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Developer Vault Only',
      tagColor: 'bg-red-100 text-red-900 border-red-300 font-bold',
      description: 'Reserved exclusively for Developer Rishit Shankar. Inspect student feedback, verify audio messages, analyze ratings, and export feedback summaries.'
    },
    {
      id: 13,
      title: 'Section 13: Developer ID Generator',
      shortTitle: 'ID Generator',
      icon: KeyRound,
      emoji: '🔑',
      color: 'from-cyan-600 to-blue-800',
      cardBg: 'from-cyan-500/10 via-blue-50/80 to-white',
      borderHover: 'hover:border-cyan-500',
      tag: 'Developer OS Only',
      tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 font-bold',
      description: 'Administrative credential generator for student IDs, teacher accounts, and bus driver passes with cryptographic validity checks.'
    },
    {
      id: 14,
      title: 'Section 14: About Creator',
      shortTitle: 'About Creator',
      icon: Sparkles,
      emoji: '🌟',
      color: 'from-amber-600 to-yellow-500',
      cardBg: 'from-amber-500/10 via-yellow-50/80 to-white',
      borderHover: 'hover:border-yellow-500',
      tag: 'Head Boy Profile',
      tagColor: 'bg-yellow-100 text-yellow-900 border-yellow-300 font-bold',
      description: 'Meet Rishit Shankar (Head Boy, Class 8 DAV School, 95% scholar, 80/80 in Sanskrit, DAV Cluster 3 Gold Medalist). Contact directly via WhatsApp, Call, and social profiles.'
    }
  ], []);

  // Filter developer-only sections (12 & 13) for regular students
  const visibleSections = useMemo(() => {
    return sectionsList.filter(sec => (sec.id !== 12 && sec.id !== 13) || isDimension4);
  }, [sectionsList, isDimension4]);

  const handleCardClick = (id) => {
    setClickedCardId(id);
    setTimeout(() => {
      setClickedCardId(null);
      onSelectSection(id);
    }, 120);
  };

  const handleTriggerSparkles = () => {
    setIsSparkleActive(true);
    setTimeout(() => setIsSparkleActive(false), 5500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbeb] via-[#fff7ed] to-[#f0f9ff] py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* FLOATING BALLOON CIRCLES ANIMATION (User Favorite) */}
      <FloatingBalloonsBackground />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* TOP CREST BANNER */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white border border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Animated DAV Crest & Vedic Flame */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              <div 
                onClick={handleTriggerSparkles}
                className="relative cursor-pointer group shrink-0 select-none"
                title="Click to activate golden celebration animation!"
              >
                {/* Outer Glowing Spinning Ring */}
                <div 
                  className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 opacity-75 group-hover:opacity-100 animate-spin" 
                  style={{ animationDuration: '10s' }} 
                />

                {/* Crest Box */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 p-2 border-2 border-amber-400/90 flex flex-col items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-200">
                  <img 
                    src="/logo.png" 
                    alt="Official DAV Logo Crest" 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-stone-950 text-[9px] font-black uppercase tracking-wider shadow-md">
                    DAV MOTTO
                  </div>
                </div>

                {/* Floating Vedic Flame */}
                <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-stone-950 flex items-center justify-center shadow-lg animate-bounce">
                  <Flame className="w-4 h-4 text-red-900 fill-red-800" />
                </div>
              </div>

              {/* Title & Slogan */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2 border border-amber-400/40 animate-badge-bounce">
                  <School className="w-3.5 h-3.5" />
                  <span>The DAV Dictionary: 14 Structured Dimensions of Academic Intelligence</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="gradient-flowing-text">Website Overview</span> &amp; Academic Hub
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  "तमसो मा ज्योतिर्गमय — Lead us from darkness to light." Designed by Head Boy <strong>Rishit Shankar</strong> to empower every DAV student with interactive textbooks, Rishi AI, exams, and digital study tools.
                </p>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-bold text-amber-200">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>14 Verified Sections</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                    <span>LKG to Class 8 Complete Books</span>
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real-time Cloud Sync</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Quick Action Launch Buttons */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto">
              {onOpenPurchaseModal && (
                <button
                  onClick={onOpenPurchaseModal}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>⭐ Purchase / Upgrade Plan</span>
                </button>
              )}

              <button
                onClick={() => handleCardClick(2)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Section 2 (Textbooks) →</span>
              </button>

              <button
                onClick={() => handleCardClick(11)}
                className="px-6 py-3 rounded-2xl bg-rose-900/80 hover:bg-rose-800 text-white border border-rose-400/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Support Developer on Section 11</span>
              </button>
            </div>

          </div>

          {/* Sparkle Burst Animation Overlay */}
          {isSparkleActive && (
            <div className="absolute inset-0 bg-amber-500/10 pointer-events-none flex items-center justify-center animate-ping">
              <Sparkles className="w-32 h-32 text-amber-400" />
            </div>
          )}

        </div>

        {/* 14 SECTIONS GRID (Clean, solid cards with subtle hover lift) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 animate-spin-slow" />
              <span>Explore All Verified Academic Sections</span>
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
              Click any card to enter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleSections.map((sec) => (
              <CleanSectionCard
                key={sec.id}
                sec={sec}
                isCurrent={sec.id === 1}
                isBeingClicked={clickedCardId === sec.id}
                onClick={() => handleCardClick(sec.id)}
              />
            ))}
          </div>
        </div>

        {/* Dimension 10 Advisor Story Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-amber-200/90 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                The Story Behind the Structured Dimensions of DAV Dictionary
              </h3>
              <p className="text-xs text-slate-500">
                Authored by Rishit Shankar (Head Boy, Class 8 DAV School)
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
            <p>
              "When I started preparing for my Class 8 board and term examinations, I noticed many students struggled to find complete, uncorrupted textbook scans, back-of-chapter answers, and instant revision solutions. Carrying heavy sets of books everywhere was inconvenient."
            </p>
            <p>
              "To solve this, I designed <strong>DAV Dictionary</strong> across structured dimensions. From LKG to Class 8, every textbook is organized with high-definition digital rendering, real-time highlighting that persists across devices, an AI academic tutor (Rishi AI) tuned to our syllabus, and instant self-testing quizzes."
            </p>
            <p className="font-bold text-red-900">
              "Every single feature has been hand-coded with love and dedication for our schoolmates. I hope this platform helps you learn faster, score 95%+, and enjoy your studies every day!"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Official Creator: <strong>Rishit Shankar</strong></span>
            <span>DAV Public School • Digital India 🇮🇳</span>
            <button
              onClick={() => handleCardClick(14)}
              className="text-red-800 hover:text-red-950 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full Head Boy Profile in Section 14 →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SectionOverview;
