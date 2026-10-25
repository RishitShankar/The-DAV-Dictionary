import React, { useState } from 'react';
import { 
  BookOpen, Brain, Award, FileText, User, 
  HelpCircle, Bell, Compass, ArrowRight, Sparkles, 
  Layers, School, Heart, CheckCircle2, Star, Zap, Flame,
  BookmarkCheck, MessageCircle, ShieldCheck, Video, Bus, Navigation, MapPin, Trophy
} from 'lucide-react';

export function SectionOverview({ currentUser, onSelectSection }) {
  const [clickedCardId, setClickedCardId] = useState(null);
  const [isSparkleActive, setIsSparkleActive] = useState(false);

  // Dimension 4 check: Section 12 is ONLY visible to Dimension 4 person (Rishit Shankar)
  // People from dimension 1, 2, 3, and 5 CANNOT see Section 12!
  const isDimension4 = Boolean(
    (currentUser?.dimension === 4 || currentUser?.id === 'rishibhai' || currentUser?.studentId === 'rishibhai') &&
    currentUser?.dimension !== 1 &&
    currentUser?.dimension !== 2 &&
    currentUser?.dimension !== 3 &&
    currentUser?.dimension !== 5
  );

  const sectionsList = [
    {
      id: 1,
      title: 'Section 1: Website Master Overview & Hub',
      shortTitle: 'Overview Hub',
      icon: Compass,
      emoji: '🧭',
      color: 'from-amber-500 to-orange-600',
      cardBg: 'from-amber-500/10 via-amber-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'You Are Here',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'The master directory and architectural dashboard for all 11 verified academic sections. Get a quick summary of every tool and jump directly to any section with one click.'
    },
    {
      id: 2,
      title: 'Section 2: Official DAV Textbooks (LKG – Class 8)',
      shortTitle: 'Digital Library',
      icon: BookOpen,
      emoji: '📚',
      color: 'from-red-600 to-rose-700',
      cardBg: 'from-red-500/10 via-rose-50/80 to-white',
      borderHover: 'hover:border-red-500',
      tag: '70+ Textbooks',
      tagColor: 'bg-red-100 text-red-900 border-red-300',
      description: 'Complete digital repository with uncompressed, verified textbooks for Classes 1 to 8, UKG, and LKG. Includes the built-in PDF Reader with 10-color neon highlighter, pen, movable notes, and AI chapter teleportation.'
    },
    {
      id: 3,
      title: 'Section 3: Questions & Answers Bank',
      shortTitle: 'Q&A Repository',
      icon: HelpCircle,
      emoji: '❓',
      color: 'from-blue-600 to-indigo-700',
      cardBg: 'from-blue-500/10 via-indigo-50/80 to-white',
      borderHover: 'hover:border-blue-500',
      tag: 'Curriculum Solutions',
      tagColor: 'bg-blue-100 text-blue-900 border-blue-300',
      description: 'Chapter-by-chapter solved exercise answers, textbook back-question solutions, and key exam revision notes curated specifically for DAV Board syllabi.'
    },
    {
      id: 4,
      title: 'Section 4: Rishi AI Academic Companion',
      shortTitle: 'Rishi AI Tutor',
      icon: Brain,
      emoji: '⚡',
      color: 'from-orange-500 to-amber-600',
      cardBg: 'from-orange-500/10 via-amber-50/80 to-white',
      borderHover: 'hover:border-orange-500',
      tag: '24/7 AI Intelligence',
      tagColor: 'bg-orange-100 text-orange-900 border-orange-300',
      description: 'Powered by Gemini AI and tuned specifically on DAV curriculum materials. Ask any academic doubt in Science, Mathematics, Hindi, English, Sanskrit, or Social Science.'
    },
    {
      id: 5,
      title: 'Section 5: Dimension 5 Faculty Master OS (Teachers Portal)',
      shortTitle: 'Faculty Master OS',
      icon: Award,
      emoji: '👨‍🏫',
      color: 'from-purple-600 via-fuchsia-600 to-purple-800',
      cardBg: 'from-purple-500/15 via-fuchsia-50/80 to-white',
      borderHover: 'hover:border-purple-500',
      tag: 'Dimension 5: Faculty OS',
      tagColor: 'bg-purple-100 text-purple-950 border-purple-400 font-bold',
      description: 'Exclusive 5th Dimension Faculty Operating System for Teachers. Features daily homework dispatch, WhatsApp doubt clearing, live online classes, test creation, Rishi AI lesson planner, and student weakness radar across Nursery to Class 8.'
    },
    {
      id: 6,
      title: 'Section 6: Chapter Explanations, PYQs & Sample Papers',
      shortTitle: 'Video Lectures & PYQs',
      icon: Video,
      emoji: '🎥',
      color: 'from-amber-500 via-orange-600 to-red-600',
      cardBg: 'from-amber-500/10 via-orange-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'DAV Guru • Science Solutions • Rishu Singh',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
      description: 'Official chapter-wise video lectures from top verified DAV educators (DAV GURU for Science & SST, Science Solutions for Maths, Rishu Singh for Hindi) alongside Board PYQs (2020-2024) and DAVCAE 80-mark sample test papers.'
    },
    {
      id: 7,
      title: 'Section 7: Kids Fun Zone & DAV Khabra Live GPS Teleport',
      shortTitle: 'Kids Fun & Bus GPS',
      icon: Bus,
      emoji: '🚌',
      color: 'from-amber-500 via-orange-500 to-red-600',
      cardBg: 'from-yellow-500/15 via-amber-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Kids Fun • Live Bus Radar',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      description: 'Exclusive Kids Fun Portal! Teleport to DAV Khabra with auto-start live Google Maps directions, track Principal Anil Kumar Singh\'s school bus fleet with Bus ID & Password, and play the Bus Driver Arcade!'
    },
    {
      id: 8,
      title: 'Section 8: Study Time Leaderboard & Deep Study Focus Mode',
      shortTitle: 'Study Arena & Focus',
      icon: Trophy,
      emoji: '🏆',
      color: 'from-amber-500 to-yellow-600',
      cardBg: 'from-amber-500/10 via-yellow-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Live Ranks • Focus Mode',
      tagColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black',
      description: 'Track your real study time, earn campus ranks on the live DAV Khabra student leaderboard, and enter strict deep study focus mode with ambient audio, streak tracking, and anti-tab switch protection!'
    },
    {
      id: 9,
      title: 'Section 9: Student Personal Profile',
      shortTitle: 'Student Profile',
      icon: User,
      emoji: '👤',
      color: 'from-violet-600 to-purple-800',
      cardBg: 'from-violet-500/10 via-purple-50/80 to-white',
      borderHover: 'hover:border-violet-500',
      tag: 'Photo DP & Cloud Sync',
      tagColor: 'bg-violet-100 text-violet-900 border-violet-300',
      description: 'Each student manages their own personal profile, uploads their photo, specifies their parent details, roll number, hobbies, and saves securely with real-time Navbar avatar synchronization.'
    },
    {
      id: 10,
      title: 'Section 10: Donate to Developer & Community Reviews Hub',
      shortTitle: 'Donate & Review',
      icon: Heart,
      emoji: '❤️',
      color: 'from-rose-600 to-pink-700',
      cardBg: 'from-rose-500/10 via-pink-50/80 to-white',
      borderHover: 'hover:border-rose-500',
      tag: '2 Pages: Donate & Review',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      description: 'Divided into 2 pages: Page 1 lets supporters contribute with instant official receipts. Page 2 offers a full Review & Voice Feedback Hub with 677-word detection, voice writing, audio recording, media uploads, and 5-star ratings!'
    },
    {
      id: 11,
      title: 'Section 11: About Creator Rishit Shankar',
      shortTitle: 'Head Boy Story',
      icon: Sparkles,
      emoji: '🌟',
      color: 'from-amber-600 to-yellow-500',
      cardBg: 'from-amber-500/10 via-yellow-50/80 to-white',
      borderHover: 'hover:border-yellow-500',
      tag: 'Master Developer',
      tagColor: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      description: 'Meet Rishit Shankar (Head Boy, Class 8 DAV Khabra, 96% scorer, 100/100 in Sanskrit, Chess Gold Medalist). Contact directly via WhatsApp (+91 94700 33984), Call (+91 80922 61750), Snapchat (@rishitshankar), and social profiles.'
    },
    {
      id: 12,
      title: 'Section 12: Developer Reviews Vault (Dimension 4)',
      shortTitle: 'Developer Vault',
      icon: Star,
      emoji: '⭐',
      color: 'from-amber-700 to-red-900',
      cardBg: 'from-amber-500/10 via-red-50/80 to-white',
      borderHover: 'hover:border-amber-500',
      tag: 'Dimension 4 Person Only',
      tagColor: 'bg-red-100 text-red-900 border-red-300',
      description: 'Reserved exclusively for Developer Rishit Shankar. Click "Check the Reviews" in the center to view student names, review messages, voice recordings, video attachments, and 5-star ratings (or "nothing" if unrated).'
    }
  ];

  const visibleSections = sectionsList.filter(sec => sec.id !== 12 || isDimension4);

  const handleCardClick = (id) => {
    setClickedCardId(id);
    setTimeout(() => {
      setClickedCardId(null);
      onSelectSection(id);
    }, 280);
  };

  const handleTriggerSparkles = () => {
    setIsSparkleActive(true);
    setTimeout(() => setIsSparkleActive(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-blue-50/40 py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Playful Floating Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-300/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-red-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Creative Animated DAV Graphic Motion Crest Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white border border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Animated DAV Crest & Vedic Flame */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* Dynamic Animated Motion Graphic Crest */}
              <div 
                onClick={handleTriggerSparkles}
                className="relative cursor-pointer group shrink-0"
                title="Click to activate golden celebration animation!"
              >
                {/* Glowing Outer Spinning Ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 opacity-75 blur-sm group-hover:opacity-100 animate-spin" style={{ animationDuration: '10s' }} />
                
                {/* Crest Box */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-red-900 via-stone-900 to-amber-950 p-2 border-2 border-amber-400/80 flex flex-col items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  <img 
                    src="/logo.png" 
                    alt="Official DAV Logo Crest" 
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md animate-pulse"
                    style={{ animationDuration: '3s' }}
                  />
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[9px] font-black uppercase tracking-wider shadow-md">
                    DAV MOTTO
                  </div>
                </div>

                {/* Floating Vedic Flame Sparkles */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg animate-bounce">
                  <Flame className="w-3.5 h-3.5 text-red-900 fill-red-800" />
                </div>
              </div>

              {/* Title & Slogan */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-2 border border-amber-400/40 animate-badge-bounce">
                  <School className="w-3.5 h-3.5 animate-twinkle" />
                  <span>The DAV Dictionary: 11 Sections of Academic Intelligence</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  <span className="gradient-flowing-text">Website Overview</span> &amp; 11 Sections Hub
                </h1>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  "तमसो मा ज्योतिर्गमय — Lead us from darkness to light." Designed by Head Boy <strong>Rishit Shankar</strong> to empower every DAV student with interactive textbooks, Rishi AI, quizzes, and digital study tools.
                </p>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-bold text-amber-200">
                  <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>11 Comprehensive Sections</span>
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

            {/* Right: Quick Action Launch Button */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => onSelectSection(2)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105 btn-interactive"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Section 2 (Textbooks) →</span>
              </button>

              <button
                onClick={() => onSelectSection(10)}
                className="px-6 py-3 rounded-2xl bg-rose-900/80 hover:bg-rose-800 text-white border border-rose-400/40 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition btn-interactive"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>Support Developer on Section 10</span>
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

        {/* 11 Sections Interactive Kids-Friendly Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 animate-spin-slow" />
              <span>Explore All 11 Interactive Sections</span>
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              Click any card to enter
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleSections.map((sec) => {
              const IconComp = sec.icon || Sparkles;
              const isCurrent = sec.id === 1;
              const isBeingClicked = clickedCardId === sec.id;

              return (
                <div
                  key={sec.id}
                  onClick={() => handleCardClick(sec.id)}
                  className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${sec.cardBg} border-2 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-2xl cursor-pointer group relative overflow-hidden card-real-3d elevation-3d-velvet ${
                    isCurrent
                      ? 'border-amber-400 ring-4 ring-amber-400/20'
                      : `border-slate-200/80 ${sec.borderHover}`
                  } ${isBeingClicked ? 'scale-95 ring-4 ring-red-500 transition-transform' : ''}`}
                >
                  
                  {/* Subtle Corner Emoji Accent */}
                  <div className="absolute -right-3 -bottom-3 text-6xl opacity-10 select-none pointer-events-none group-hover:scale-125 group-hover:opacity-20 transition-all duration-300">
                    {sec.emoji}
                  </div>

                  <div>
                    {/* Header Row: Colorful Icon + Title + Pill Badge */}
                    <div className="flex items-center justify-between mb-4 gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0 animate-float-icon`}>
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

                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border shadow-2xs shrink-0 animate-badge-bounce ${sec.tagColor}`}>
                        {sec.tag}
                      </span>
                    </div>

                    {/* Rich Description */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium">
                      {sec.description}
                    </p>
                  </div>

                  {/* Interactive Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(sec.id);
                      }}
                      className={`w-full py-3 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-sm ${
                        isCurrent
                          ? 'bg-amber-400 text-stone-950 font-black shadow-md'
                          : 'bg-slate-950 hover:bg-red-800 text-white hover:shadow-lg group-hover:bg-red-800'
                      }`}
                    >
                      <span>{isCurrent ? '⭐ Current Active Hub' : `Enter Section ${sec.id} (${sec.shortTitle})`}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Dimension 10 Advisor Story Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                The Story Behind the 10 Dimensions of DAV Dictionary
              </h3>
              <p className="text-xs text-slate-500">
                Authored by Rishit Shankar (Head Boy, Class 8 DAV Public School, Khabra)
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
            <p>
              "When I started preparing for my Class 8 board and term examinations, I noticed many students struggled to find complete, uncorrupted textbook scans, back-of-chapter answers, and instant revision solutions. Carrying heavy sets of books everywhere was inconvenient."
            </p>
            <p>
              "To solve this, I designed <strong>DAV Dictionary</strong> across 10 structured dimensions. From LKG to Class 8, every textbook is organized with high-definition digital rendering, real-time highlighting that persists across devices, an AI academic tutor (Rishi AI) tuned to our syllabus, and instant self-testing quizzes."
            </p>
            <p className="font-bold text-red-900">
              "Every single feature has been hand-coded with love and dedication for our schoolmates. I hope this platform helps you learn faster, score 95%+, and enjoy your studies every day!"
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Official Creator: <strong>Rishit Shankar</strong></span>
            <span>DAV Public School • Digital India 🇮🇳</span>
            <button
              onClick={() => onSelectSection(10)}
              className="text-red-800 hover:text-red-950 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Read Full Head Boy Profile in Section 10 →</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default SectionOverview;
