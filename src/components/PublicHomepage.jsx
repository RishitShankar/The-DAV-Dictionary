import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, GraduationCap, Award, ShieldCheck, 
  CheckCircle2, ArrowRight, Lock, UserCheck, Brain, 
  Search, Library, Star, Crown, ChevronDown, ChevronUp,
  FileText, HelpCircle, Heart, Code2, LogIn, Highlighter,
  Flame, Laptop, Check, ArrowUpRight, School
} from 'lucide-react';

export function PublicHomepage({ onGoToLogin }) {
  const [activeGradeFilter, setActiveGradeFilter] = useState('8');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Grade books highlights
  const gradeHighlights = {
    '8': [
      { name: 'Science (The Living World)', ch: '15 Chapters', badge: 'Complete & Indexed' },
      { name: 'Mathematics', ch: '15 Chapters', badge: 'Formulae & Exercises' },
      { name: 'Social Science (We & Our World)', ch: '22 Chapters', badge: 'History, Civics, Geog' },
      { name: 'Surabhi Sanskrit', ch: 'Complete Text', badge: 'Vedic Grammar' },
      { name: 'Hindi Gyan Sagar & Abhyas', ch: 'Full Literature', badge: 'Grammar Worksheets' },
      { name: 'English Reader, Literature & Practice', ch: '3 Books', badge: 'Comprehensive' },
      { name: 'Hands On / Computers', ch: 'Complete', badge: 'Practical Labs' }
    ],
    '6': [
      { name: 'Science (The Living World)', ch: 'Full Syllabus', badge: '10 Books Available' },
      { name: 'Mathematics', ch: 'Step-by-Step', badge: 'DAV Board' },
      { name: 'Social Science', ch: 'Complete Book', badge: 'NCERT/DAV Aligned' },
      { name: 'Surabhi Sanskrit', ch: 'Sanskrit Grammar', badge: 'Official Edition' },
      { name: 'Hindi Gyan Sagar & Abhyas Sagar', ch: 'Stories & Poems', badge: 'Class 6 Standard' },
      { name: 'English Reader & Practice', ch: 'Class 6 Set', badge: 'Grammar Drills' }
    ],
    '4': [
      { name: 'Science (The Living World)', ch: '10 Chapters', badge: '7 Books Available' },
      { name: 'Primary Mathematics', ch: '11 Chapters', badge: 'Numbers & Shapes' },
      { name: 'We & Our World (SST)', ch: '12 Chapters', badge: 'Family, Bricks & Maps' },
      { name: 'Hindi Bhasha Madhuri', ch: '7 Chapters', badge: 'Literature' },
      { name: 'English Reader & Practice', ch: 'Complete', badge: 'Fluency' },
      { name: 'Hands On in Computer', ch: 'Computer Basics', badge: 'Hands On Labs' }
    ],
    'primary': [
      { name: 'Class 3 Complete Books', ch: 'Maths, EVS, Hindi, English, GK', badge: '9 Textbooks' },
      { name: 'Class 2 Complete Books', ch: 'Maths, EVS, Hindi, English', badge: '6 Textbooks' },
      { name: 'Class 1 Complete Books', ch: 'Maths, EVS, English Practice, GK', badge: '5 Textbooks' },
      { name: 'UKG / Kindergarten', ch: 'Maths, Bal Madhuri, Activity, Art', badge: '6 Textbooks' },
      { name: 'LKG / Nursery', ch: 'EVS, Fun With English, Maths, Activity', badge: '4 Textbooks' }
    ]
  };

  const faqs = [
    {
      q: "What is The DAV Dictionary & Smart Digital Library?",
      a: "It is an all-in-one educational platform engineered specifically for students of DAV Public Schools. It hosts the complete digital curriculum of 70 uncompressed DAV textbooks from LKG through Class 8, paired with Shankar AI (a curriculum-trained AI tutor), interactive chapter quizzes, a comprehensive vocabulary dictionary, and in-browser PDF annotation tools."
    },
    {
      q: "Is access to the textbooks and AI completely free?",
      a: "Yes! The core digital library, reading tools, Shankar AI questions, and quizzes are 100% free for all students. There are also specialized VIP and VVIP tiers with expanded features for dedicated scholars."
    },
    {
      q: "How do I register or log into the portal?",
      a: "Click on any 'Register Now' or 'Student Login' button on this page. You will be redirected to the authentic Blackboard Login Gatekeeper where you can sign in with your student ID & password, or enter through the Free Guest Preview."
    },
    {
      q: "Can I highlight and write notes directly on the textbooks?",
      a: "Yes! When you open any textbook, you have access to a built-in Neon Highlighter (10 glowing cyber colors), classic ink pens, and movable sticky notes. All your drawings and annotations automatically persist to your browser and sync to the cloud."
    },
    {
      q: "Who is the developer of this platform?",
      a: "The DAV Dictionary was conceived, designed, and developed by Rishit Shankar (Head Boy, Class 8 DAV Khabra, Roll 25), who scored 95% in his Class 8 exams and is a Chess Cluster 3 Gold Medalist. He created this platform as an official student initiative to empower every DAVian."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-stone-950">
      
      {/* =========================================================================
          TOP NAVIGATION BAR
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/logo.png" 
              alt="The DAV Dictionary Logo" 
              className="w-12 h-12 object-contain drop-shadow-md rounded-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">
                  The DAV Dictionary
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950">
                  Official Portal
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80 font-medium">
                DAV Public School Digital Library & Shankar AI Hub
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-stone-300">
            <a href="#about" className="hover:text-amber-400 transition-colors">Overview</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Key Features</a>
            <a href="#curriculum" className="hover:text-amber-400 transition-colors">Library Catalog</a>
            <a href="#developer" className="hover:text-amber-400 transition-colors">Meet Rishit</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGoToLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-stone-200 hover:text-white hover:bg-stone-800/80 transition-all flex items-center gap-1.5 cursor-pointer border border-stone-700"
            >
              <LogIn className="w-3.5 h-3.5 text-amber-400" />
              <span>Login</span>
            </button>

            <button
              onClick={onGoToLogin}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-stone-950" />
              <span>Register Now</span>
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          HERO SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-600/15 via-orange-600/10 to-red-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/30 text-amber-300 text-xs font-bold mb-8 shadow-inner">
            <School className="w-3.5 h-3.5 text-amber-400" />
            <span>DAV Public School Khabra • Official Academic Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            The Smart Digital Library &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              DAV Curriculum AI
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the premier academic repository for DAVians. Access all <strong>70 verified textbooks</strong> from LKG to Class 8, solve complex doubts with <strong>Shankar AI</strong>, practice chapter quizzes, and draw directly inside your books.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onGoToLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-stone-950" />
              <span>Register Now / Student Login</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <a
              href="#curriculum"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-stone-200 hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
              <Library className="w-4 h-4 text-amber-400" />
              <span>Explore 70 Textbooks</span>
            </a>
          </div>

          {/* Statistics Bar */}
          <div className="mt-16 pt-12 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">70+</div>
              <div className="text-xs text-stone-400 font-semibold mt-1">DAV Textbooks</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-black text-orange-400">LKG–8</div>
              <div className="text-xs text-stone-400 font-semibold mt-1">Complete Grades</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">24/7</div>
              <div className="text-xs text-stone-400 font-semibold mt-1">Shankar AI Tutor</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/50 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400">100%</div>
              <div className="text-xs text-stone-400 font-semibold mt-1">Free for Students</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          KEY FEATURES SECTION
      ========================================================================= */}
      <section id="features" className="py-20 bg-stone-900/40 border-y border-stone-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Engineered for Academic Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              Everything A DAV Student Needs To Succeed
            </h2>
            <p className="mt-4 text-stone-400 text-sm sm:text-base">
              Say goodbye to forgotten physical books, heavy school bags, and unclarified homework doubts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Digital Library */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Complete Digital Library</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Full-edition textbooks for Class 8, Class 6, Class 4, and all primary grades. Zero missing pages, uncompressed high-resolution scans.
              </p>
            </div>

            {/* Feature 2: Shankar AI */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-orange-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Shankar AI Curriculum Tutor</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Trained on the exact DAV curriculum. Ask about Class 8 Science cells, Class 7 Sanskrit grammar, or Class 6 Hindi literature for instant explanations.
              </p>
            </div>

            {/* Feature 3: Neon Highlighter & Pen */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-cyan-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Highlighter className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Highlighter &amp; Live Annotation</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                10 neon highlighter colors, classic ink pens, and movable notes right on the textbook pages. All drawings automatically save to cloud memory.
              </p>
            </div>

            {/* Feature 4: Interactive Quizzes */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Chapter-Wise Quizzes</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Test your knowledge before exams with instant automated scoring, explanations for wrong answers, and grade-wise question banks.
              </p>
            </div>

            {/* Feature 5: The DAV Dictionary */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Academic Vocabulary Engine</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Look up complex terms with phonetic pronunciation, parts of speech, and DAV textbook usage contexts to expand your vocabulary.
              </p>
            </div>

            {/* Feature 6: Cross-Device Cloud Sync */}
            <div className="p-7 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-rose-500/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Database &amp; Security</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Integrated with Supabase cloud infrastructure. Passwords, student profiles, and PDF drawings sync across smartphones, tablets, and laptops.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CURRICULUM SHOWCASE (LKG TO CLASS 8)
      ========================================================================= */}
      <section id="curriculum" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                Official Textbook Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                Explore Available Books By Grade
              </h2>
              <p className="text-stone-400 text-xs sm:text-sm mt-2">
                All 70 textbooks verified and indexed with chapter-by-chapter navigation.
              </p>
            </div>

            {/* Grade Switcher Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-stone-900 border border-stone-800 self-start md:self-auto overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveGradeFilter('8')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === '8'
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 8 (10 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('6')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === '6'
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 6 (10 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('4')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === '4'
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 4 (7 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('primary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === 'primary'
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                LKG – Class 3 (43 Books)
              </button>
            </div>
          </div>

          {/* Books List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gradeHighlights[activeGradeFilter]?.map((b, i) => (
              <div 
                key={i} 
                className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-500/30 transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{b.name}</h4>
                    <p className="text-[11px] text-stone-400">{b.ch}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded bg-stone-800 text-amber-300 border border-stone-700 whitespace-nowrap">
                  {b.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Quick CTA to Open Library */}
          <div className="mt-10 p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/30 to-stone-900 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="font-extrabold text-white text-base">
                Ready to start reading your DAV textbooks right now?
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                Enter your credentials or click Free Preview to access the complete reader.
              </p>
            </div>
            <button
              onClick={onGoToLogin}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-2 shrink-0 shadow-lg"
            >
              <span>Open Blackboard Reader →</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          MEET THE DEVELOPER SECTION (RISHIT SHANKAR)
      ========================================================================= */}
      <section id="developer" className="py-20 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 shadow-2xl relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Column: Photo & Badges */}
              <div className="lg:col-span-4 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl shadow-amber-500/20">
                    <img 
                      src="/rishit_shankar.jpg" 
                      alt="Rishit Shankar - Head Boy & Master Developer" 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-[11px] shadow-lg whitespace-nowrap flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Head Boy • DAV Khabra</span>
                  </div>
                </div>

                <div className="mt-6 space-y-1">
                  <h3 className="text-xl font-black text-white">Rishit Shankar</h3>
                  <p className="text-xs text-amber-300 font-bold">Class 8 • Roll 25 • Section D</p>
                  <p className="text-[11px] text-stone-400">Master Full-Stack Developer &amp; Chess Champion</p>
                </div>
              </div>

              {/* Right Column: Bio & Vision */}
              <div className="lg:col-span-8 space-y-5">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Vision Behind The Project</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  "Every DAV student deserves 24/7 access to their books, intelligent guidance, and the confidence to top their exams."
                </h2>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  As Head Boy at DAV Khabra, I observed students frequently struggling with forgotten textbooks, heavy bags, or lack of instant explanations while studying at home. I engineered <strong>The DAV Dictionary</strong> as an all-in-one digital companion—combining full textbooks with <strong>Shankar AI</strong>, customized chapter quizzes, and interactive notes.
                </p>

                {/* Developer Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-amber-400 font-black text-sm">95% Score</div>
                    <div className="text-[10px] text-stone-400">Class 8 Half-Yearly</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-emerald-400 font-black text-sm">Gold Medalist</div>
                    <div className="text-[10px] text-stone-400">Chess Cluster 3</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-cyan-400 font-black text-sm">Full-Stack</div>
                    <div className="text-[10px] text-stone-400">React, Vite, AI &amp; Cloud</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onGoToLogin}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-md"
                  >
                    <span>Connect &amp; Register Now →</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          FAQ SECTION
      ========================================================================= */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Have Questions? We Have Answers.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-stone-900/60 border border-stone-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-800/40 transition"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed border-t border-stone-800/60 bg-stone-950/40 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION (REGISTRATION GATEWAY)
      ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-stone-950 to-[#1c1613] border-t border-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/20">
            <Sparkles className="w-8 h-8" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Begin Your DAV Learning Journey?
          </h2>
          
          <p className="mt-3 text-stone-300 text-sm max-w-xl mx-auto">
            Click below to enter the Blackboard Portal, sign in with your ID and password, and unlock all 70 textbooks and Shankar AI.
          </p>

          <div className="mt-8">
            <button
              onClick={onGoToLogin}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-base shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-stone-950" />
              <span>Register Now / Open Blackboard Portal</span>
              <ArrowRight className="w-5 h-5 text-stone-950" />
            </button>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            Instant Login • Works on Mobile, Tablet &amp; PC • 100% Free
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
      ========================================================================= */}
      <footer className="bg-[#120d0b] border-t border-stone-800/80 py-10 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="The DAV Dictionary" className="w-9 h-9 object-contain" />
            <div>
              <span className="font-bold text-white text-sm">The DAV Dictionary</span>
              <p className="text-[10px] text-stone-400">तमसो मा ज्योतिर्गमय • Lead me from darkness to light</p>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-stone-300">
              Conceived &amp; Developed by <strong>Rishit Shankar</strong> (Head Boy, DAV Khabra)
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              DAV Public School Digital Library &amp; Academic AI Engine • All Rights Reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default PublicHomepage;
