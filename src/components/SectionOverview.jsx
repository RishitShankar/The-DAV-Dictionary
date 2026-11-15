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
      id={`section-card-${sec.id}`} className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${sec.cardBg} border-2 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 cursor-pointer group select-none ${
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

  // Daily Morning Streak & Suvichar State
  const [streakData, setStreakData] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_daily_streak_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const todayStr = new Date().toDateString();
        return {
          ...parsed,
          claimedToday: parsed.lastCheckinDate === todayStr
        };
      }
    } catch (e) {}
    const todayStr = new Date().toDateString();
    return {
      count: 5,
      lastCheckinDate: todayStr,
      claimedToday: true,
      weekDays: [true, true, true, true, true, false, false]
    };
  });

  const [isStreakQuizOpen, setIsStreakQuizOpen] = useState(false);
  const [streakQuizStep, setStreakQuizStep] = useState(0);
  const [streakQuizChoice, setStreakQuizChoice] = useState(null);
  const [streakQuizCompleted, setStreakQuizCompleted] = useState(false);

  const streakQuestions = [
    {
      q: "Which organelle is known as the powerhouse of the eukaryotic cell?",
      options: ["Ribosome", "Mitochondria", "Golgi apparatus", "Lysosome"],
      correct: 1,
      tip: "Produces ATP via aerobic cellular respiration."
    },
    {
      q: "Find the square root of 576:",
      options: ["22", "24", "26", "28"],
      correct: 1,
      tip: "24 * 24 = 576."
    },
    {
      q: "Who was the founder of Arya Samaj and the spiritual foundation of all DAV institutions?",
      options: ["Maharishi Swami Dayanand Saraswati", "Mahatma Hansraj", "Swami Vivekanand", "Lala Lajpat Rai"],
      correct: 0,
      tip: "Author of Satyarth Prakash and Vedic Renaissance visionary."
    }
  ];

  const handleClaimDailyStreak = () => {
    const todayStr = new Date().toDateString();
    const newStreak = {
      count: streakData.claimedToday ? streakData.count : streakData.count + 1,
      lastCheckinDate: todayStr,
      claimedToday: true,
      weekDays: streakData.weekDays.map((d, i) => (i <= 4 ? true : d))
    };
    setStreakData(newStreak);
    setStreakQuizCompleted(true);
    try {
      localStorage.setItem('dav_daily_streak_v1', JSON.stringify(newStreak));
      window.dispatchEvent(new CustomEvent('dav_xp_awarded', { detail: { xp: 50, reason: 'Daily Streak Check-in' } }));
    } catch (e) {}
  };

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
      title: 'Section 9: Campus Scholastic Leaderboard',
      shortTitle: 'Campus Leaderboard',
      icon: Trophy,
      emoji: '🏆',
      color: 'from-amber-500 to-yellow-600',
      cardBg: 'from-amber-500/10 via-yellow-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Top 100 Scholars',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      description: 'Official Campus Leaderboard tracking DAV student study hours across Gold, Silver, Bronze, Platinum, and Iron tiers with Top 100 rankings and real-time scholastic honors.'
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
      color: 'from-rose-700 to-red-900',
      cardBg: 'from-rose-500/10 via-red-50/80 to-white',
      borderHover: 'hover:border-rose-500',
      tag: 'Developer Vault Only',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
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
    },
    {
      id: 'concepts',
      title: 'Master Academic Concepts (106+ Vault)',
      shortTitle: '106+ Concepts Vault',
      icon: Brain,
      emoji: '🧠',
      color: 'from-amber-500 to-rose-600',
      cardBg: 'from-amber-500/10 via-rose-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: '110 Concepts Active',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
      description: 'Comprehensive compendium of 110 foundational curriculum concepts across Mathematics, Science, Social Studies, English Grammar, Computer Science, and Sanskrit with interactive quizzes and flashcards.'
    },
    {
      id: 'concepts200',
      title: '200 Master Platform Concepts Architecture',
      shortTitle: '200 Concepts Blueprint',
      icon: Sparkles,
      emoji: '⚡',
      color: 'from-amber-400 to-orange-600',
      cardBg: 'from-amber-500/10 via-orange-50/80 to-white',
      borderHover: 'hover:border-amber-400',
      tag: '200 Concepts Mastered',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      description: 'The master architecture of 200 website design, UI/UX, AI intelligence, 3D virtual lab, and enterprise concepts engineered for DAV Public School, Khabra.'
    },
    {
      id: 'features300',
      title: '300 Next-Generation Feature Suite',
      shortTitle: '300 Features Explorer',
      icon: Zap,
      emoji: '🚀',
      color: 'from-cyan-400 via-teal-500 to-indigo-600',
      cardBg: 'from-cyan-500/10 via-teal-50/80 to-white',
      borderHover: 'hover:border-cyan-400',
      tag: '300 Features Live',
      tagColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 font-bold',
      description: 'Futuristic 300-feature ecosystem spanning AI tutoring, 3D STEM experiments, OMR grading, Vedic mathematics, wellness companion, and parental digests.'
    },
    {
      id: 'hitech50',
      title: '50 Hi-Tech Innovations Nexus (Quantum Hub)',
      shortTitle: '50 Hi-Tech Hub',
      icon: Zap,
      emoji: '⚡',
      color: 'from-amber-400 via-purple-500 to-cyan-500',
      cardBg: 'from-amber-500/10 via-purple-50/80 to-white',
      borderHover: 'hover:border-purple-400',
      tag: '50 Quantum Modules Live',
      tagColor: 'bg-purple-100 text-purple-900 border-purple-300 font-bold',
      description: 'Cutting-edge suite of 50 interactive technologies: Vedic Socratic AI, AR Geometry Protractor, 3D Ray-Tracing, Dual-Camera Proctoring, Sanskrit Swara Voice Engine, and IoT Bus Telemetry.'
    }
  ], []);

  // All 14 verified sections always visible for all students and visitors
  const visibleSections = sectionsList;

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
                  <button
                    type="button"
                    onClick={() => handleCardClick('hitech50')}
                    className="flex items-center gap-1.5 bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 px-3.5 py-1 rounded-full border border-purple-400/40 cursor-pointer transition shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    <span>⚡ 50 Hi-Tech Innovations Nexus</span>
                  </button>
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

        {/* ========================================================================= */}
        {/* DAILY 5-MINUTE MORNING DAV STREAK & VEDIC SUVICHAR WIDGET                 */}
        {/* ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-950 via-[#14120e] to-stone-950 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-white">
          <div className="absolute -top-16 -left-16 w-52 h-52 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Col 1: Dynamic Flame Streak Counter (4 Cols) */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/30 animate-bounce">
                    <Flame className="w-5 h-5 fill-stone-950 text-stone-950" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                      Daily DAV Streak
                    </h3>
                    <p className="text-[11px] text-stone-400">Consistent Morning Study Habit</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/30">
                  🔥 {streakData.count} Day Streak
                </span>
              </div>

              {/* 7-Day Visual Progress Track */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
                <div className="grid grid-cols-7 gap-1.5">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, dIdx) => {
                    const isPassed = streakData.weekDays[dIdx];
                    const isToday = dIdx === 4;
                    return (
                      <div 
                        key={dIdx} 
                        className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                          isPassed 
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 shadow-md font-bold' 
                            : isToday 
                              ? 'bg-stone-800 border-2 border-amber-400 text-amber-300 animate-pulse'
                              : 'bg-stone-900 border border-stone-800 text-stone-600'
                        }`}
                      >
                        {isPassed ? '✓' : day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily Streak Action Button */}
              <div>
                {streakData.claimedToday ? (
                  <div className="w-full py-2 px-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Today's +50 XP Streak Secured!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsStreakQuizOpen(true);
                      setStreakQuizStep(0);
                      setStreakQuizChoice(null);
                      setStreakQuizCompleted(false);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 cursor-pointer transition"
                  >
                    <Zap className="w-4 h-4 fill-stone-950" />
                    <span>Complete 3-Min Morning Sprint (+50 XP)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Col 2: दैनिक वैदिक सुविचार (Vedic Quote & Reflection) (5 Cols) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-stone-900 to-stone-950 border border-amber-500/30 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5" />
                  <span>दैनिक वैदिक सुविचार • Daily Vedic Thought</span>
                </span>
                <span className="text-[9px] font-mono text-stone-400 px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800">
                  Morning Assembly Core
                </span>
              </div>

              {/* Sanskrit Mantra Quote */}
              <div className="space-y-1.5">
                <p className="text-sm sm:text-base font-bold text-amber-200 tracking-wide leading-relaxed font-serif italic">
                  "विद्या ददाति विनयं विनयाद्याति पात्रताम्।<br />
                  पात्रत्वाद्धनमाप्नोति धनाद्धर्मं ततः सुखम्॥"
                </p>
                <p className="text-xs text-stone-300 leading-relaxed pt-1">
                  <strong>English Translation:</strong> Knowledge gives humility; from humility comes worthiness; from worthiness comes honorable prosperity; from prosperity comes righteous duty; and from duty follows true joy.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80 text-[10px] text-stone-400">
                <span>Source: Hitopadesha • DAV Morning Reflection</span>
                <span className="text-amber-400 font-bold">Classroom Virtue #1</span>
              </div>
            </div>

            {/* Col 3: 1-Click Academic Jumpstart (3 Cols) */}
            <div className="lg:col-span-3 p-5 rounded-2xl bg-stone-900/80 border border-stone-800 flex flex-col justify-between space-y-3 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 block mb-1">
                  Morning Study Sprint
                </span>
                <h4 className="text-sm font-black text-white">5 Minutes Before School</h4>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Quickly review chapter flashcards, check daily homework, or practice 5 MCQs before class starts.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handleCardClick(8)}
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Start 5-Minute Quiz (Sec 8)</span>
                </button>
                <button
                  onClick={() => handleCardClick(5)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition border border-stone-700"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Check Today's Homework</span>
                </button>
              </div>
            </div>

          </div>

          {/* Morning Sprint Quiz Modal */}
          {isStreakQuizOpen && (
            <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="max-w-md w-full bg-stone-900 border-2 border-amber-400 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl relative">
                
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Daily Morning Brain Sprint ({streakQuizStep + 1} of 3)
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsStreakQuizOpen(false)}
                    className="w-7 h-7 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {!streakQuizCompleted ? (
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base font-bold text-amber-100 leading-snug">
                      {streakQuestions[streakQuizStep].q}
                    </p>

                    <div className="space-y-2 pt-1">
                      {streakQuestions[streakQuizStep].options.map((opt, optIdx) => {
                        const isChosen = streakQuizChoice === optIdx;
                        const isCorrect = optIdx === streakQuestions[streakQuizStep].correct;
                        let btnCls = "bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-400/60";

                        if (streakQuizChoice !== null) {
                          if (isCorrect) btnCls = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                          else if (isChosen && !isCorrect) btnCls = "bg-rose-950/80 border-rose-500 text-rose-200";
                          else btnCls = "bg-stone-950/40 border-stone-850 text-stone-600 opacity-50";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={streakQuizChoice !== null}
                            onClick={() => setStreakQuizChoice(optIdx)}
                            className={`w-full p-3 rounded-xl border text-left text-xs transition cursor-pointer flex items-center justify-between ${btnCls}`}
                          >
                            <span>{opt}</span>
                            {streakQuizChoice !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>

                    {streakQuizChoice !== null && (
                      <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-300">
                        <span className="font-bold text-amber-400">DAV Fact: </span>
                        {streakQuestions[streakQuizStep].tip}
                      </div>
                    )}

                    {streakQuizChoice !== null && (
                      <button
                        onClick={() => {
                          if (streakQuizStep + 1 < streakQuestions.length) {
                            setStreakQuizStep(prev => prev + 1);
                            setStreakQuizChoice(null);
                          } else {
                            handleClaimDailyStreak();
                          }
                        }}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-lg"
                      >
                        {streakQuizStep + 1 < streakQuestions.length ? 'Next Question →' : 'Claim +50 XP & Lock Streak 🎉'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-xl animate-bounce">
                      🔥
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white">Streak Secured!</h4>
                      <p className="text-xs text-amber-300 font-bold mt-1">
                        +50 XP Claimed • 🔥 {streakData.count} Day Streak Active
                      </p>
                      <p className="text-xs text-stone-400 mt-2">
                        Come back tomorrow morning to maintain your streak and earn the Master Vedic Scholar badge!
                      </p>
                    </div>
                    <button
                      onClick={() => setIsStreakQuizOpen(false)}
                      className="w-full py-2.5 rounded-xl bg-amber-500 text-stone-950 font-black text-xs uppercase cursor-pointer"
                    >
                      Continue Exploring Overview
                    </button>
                  </div>
                )}

              </div>
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
