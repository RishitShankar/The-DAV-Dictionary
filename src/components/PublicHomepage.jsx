import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, GraduationCap, Award, ShieldCheck, 
  CheckCircle2, ArrowRight, Lock, UserCheck, Brain, 
  Search, Library, Star, Crown, ChevronDown, ChevronUp,
  FileText, HelpCircle, Heart, Code2, LogIn, Highlighter,
  Flame, Laptop, Check, ArrowUpRight, School, Phone, Mail, MessageCircle,
  Play, Compass, Calculator, Calendar as CalendarIcon, Clock as ClockIcon,
  CloudSun, Bus, MapPin, Eye, Trophy, Layers, Video, ClipboardList,
  UserCheck as UserCheckIcon, Shield, Zap, ExternalLink, Rocket
} from 'lucide-react';
import { WhatsAppLogo, InstagramLogo, LinkedInLogo, SnapchatLogo } from './SocialLogos';
import { RangoliCursorEffect } from './RangoliCursorEffect';

export function PublicHomepage({ onGoToLogin, onEnterDemoPreview }) {
  const [activeGradeFilter, setActiveGradeFilter] = useState('8');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeDimensionFilter, setActiveDimensionFilter] = useState('all');
  const [activeHeroTab, setActiveHeroTab] = useState(0);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  // Google Sitelinks Direct Portals (Netflix-Style Fast Jump Directory)
  const sitelinks = [
    {
      title: "Login to DAV Dictionary",
      path: "/login",
      badge: "Student Portal",
      icon: LogIn,
      color: "from-amber-400 to-orange-500",
      description: "Sign in with your Student ID and password to access the full DAV Dictionary campus, personal vault, and daily diary.",
      action: () => onGoToLogin()
    },
    {
      title: "Books from Class LKG to Class VIII",
      path: "/books",
      badge: "70+ Textbooks",
      icon: BookOpen,
      color: "from-red-500 to-rose-600",
      description: "Explore 70+ digital textbooks from Class LKG to Class 8 in Demo Preview mode. Browse chapters and full curriculum.",
      action: () => onEnterDemoPreview(2)
    },
    {
      title: "Join live classes",
      path: "/live-classes",
      badge: "WebRTC Classroom",
      icon: Video,
      color: "from-blue-500 to-cyan-500",
      description: "Attend real-time online classes, interactive video lectures, and live doubt-clearing sessions with DAV teachers.",
      action: () => onEnterDemoPreview(5, 'live_class')
    },
    {
      title: "Question Answers from LKG to Class 8",
      path: "/question-answers",
      badge: "Solution Arcade",
      icon: FileText,
      color: "from-purple-500 to-indigo-600",
      description: "Find chapter-wise solutions, NCERT and DAV textbook exercise answers, and exam preparation material.",
      action: () => onEnterDemoPreview(3)
    },
    {
      title: "Live Chat with Teachers",
      path: "/faculty-desk",
      badge: "Faculty Desk",
      icon: MessageCircle,
      color: "from-emerald-500 to-teal-500",
      description: "Connect directly with subject faculty on the Faculty Academic Desk for one-on-one doubts and homework help.",
      action: () => onEnterDemoPreview(5, 'doubts_chat')
    }
  ];


  // The 11 Core Features / Dimensions of DAV Dictionary Platform
  const allDimensions = [
    {
      num: 1,
      id: 'overview',
      category: 'core',
      name: 'Overview Hub',
      shortName: 'Overview Hub',
      tagline: 'Interactive Campus Navigator & Dimension Gateway',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Launchpad',
      desc: 'Central control deck and visual index connecting all 11 dimensions. Real-time portal status, quick jumps, daily notifications, and student shortcuts.',
      features: ['Dimension Quick Switcher', 'Live Campus Announcements', 'Academic Shortcuts', 'Quick Jump Radar'],
      demoReady: '100% Unlocked in Demo'
    },
    {
      num: 2,
      id: 'library',
      category: 'academics',
      name: 'Digital Textbooks & Library',
      shortName: '70+ Textbooks',
      tagline: 'Complete Uncompressed DAV Board Curriculum (LKG–Class 8)',
      icon: BookOpen,
      color: 'from-red-600 to-rose-700',
      glowClass: 'hover:border-red-400/60 shadow-red-500/10',
      badge: '70+ Books',
      desc: 'The official digital archive of 70 textbooks across LKG, UKG, and Classes 1 to 8. Zero missing pages, embedded with neon highlighters, sticky notes, and full-screen reading.',
      features: ['LKG to Class 8 Streaming', 'Neon Cyber Highlighters', 'Google Drive Cloud Annotator', 'Searchable Chapters'],
      demoReady: 'Preview Catalog Free • Login to Read Book'
    },
    {
      num: 3,
      id: 'qa',
      category: 'academics',
      name: 'Chapter Questions & Answers',
      shortName: 'Q&A Arcade',
      tagline: 'Interactive Solution Gyan & DAV Guide Matrix',
      icon: FileText,
      color: 'from-purple-600 to-indigo-700',
      glowClass: 'hover:border-purple-400/60 shadow-purple-500/10',
      badge: 'Solution Matrix',
      desc: 'Dual-mode Question & Answer engine supporting Normal, VIP, and VVIP study tracks. Connects every DAV chapter to verified solutions, exercises, and model answers.',
      features: ['Normal & VIP Plan Modes', 'Solution Gyan Integration', 'Class 1-8 Chapter Banks', 'Audio Chapter Pronunciation'],
      demoReady: 'Explore All Chapters • Login to Open Solution'
    },
    {
      num: 4,
      id: 'rishi_ai',
      category: 'ai',
      name: 'Rishi AI Companion',
      shortName: 'Rishi AI',
      tagline: 'Curriculum-Trained Dual Engine (Academics & Outer World)',
      icon: Brain,
      color: 'from-amber-400 via-orange-500 to-yellow-500',
      glowClass: 'hover:border-amber-400/80 shadow-amber-500/20',
      badge: '24/7 AI Tutor',
      desc: 'Proprietary artificial intelligence grounded in DAV textbooks and CBSE syllabus. Switch between Academic Curriculum Intelligence and Global Non-Academic Knowledge.',
      features: ['DAV Textbook Grounded', 'Class 1-8 Specific Tuning', 'Speech-to-Text Voice Q&A', 'Chapter Quiz Auto-Generator'],
      demoReady: 'Explore Modes & Prompts • Login to Ask AI'
    },
    {
      num: 5,
      id: 'erp',
      category: 'erp',
      name: 'Smart School ERP & Faculty Desk',
      shortName: 'Smart ERP Suite',
      tagline: '6-in-1 Daily Academic Desk & Live Virtual Schooling',
      icon: School,
      color: 'from-blue-600 to-cyan-600',
      glowClass: 'hover:border-cyan-400/60 shadow-cyan-500/10',
      badge: '6-in-1 Suite',
      desc: 'Comprehensive school operations: Page 1 Daily Homework Hub, Page 2 Faculty Desk, Page 3 WebRTC Live Video Classrooms, Page 4 Online CBT Exam Suite, Page 5 Digital Attendance, and Page 6 Leaderboard.',
      features: ['Daily Homework Hub (100% Free)', 'WebRTC HD Live Classes', 'CBT Test Palette Simulator', '75% Attendance Register'],
      demoReady: 'Homework & Attendance 100% Free'
    },
    {
      num: 6,
      id: 'videos',
      category: 'academics',
      name: 'Video Explanations & PYQ Bank',
      shortName: 'Video Lectures',
      tagline: 'Curated YouTube Lectures & Previous Year Question Papers',
      icon: Video,
      color: 'from-rose-600 to-pink-600',
      glowClass: 'hover:border-rose-400/60 shadow-rose-500/10',
      badge: 'Video & PYQs',
      desc: 'Expert video lessons linked to every chapter of Class 8, 6, and 4. Accompanied by official past-year board examination question papers and step-by-step marking schemes.',
      features: ['Multi-Part Video Lessons', 'Official DAV Past Papers', 'Chapter Playlist Switcher', 'Zero Dead-Screen Embeds'],
      demoReady: 'Browse Video Syllabus • Login to Watch'
    },
    {
      num: 7,
      id: 'utilities',
      category: 'utilities',
      name: 'Campus Smart Utilities & Radar',
      shortName: 'Campus Utilities',
      tagline: 'DAV Khabra Navigation, Weather, Bus, Scientific Tools',
      icon: Compass,
      color: 'from-emerald-600 to-teal-700',
      glowClass: 'hover:border-emerald-400/60 shadow-emerald-500/10',
      badge: 'Smart Tools',
      desc: 'Live interactive tools: Turn-by-turn Google Maps navigation to DAV Khabra, Live Bus Fleet Radar, Real-Time Muzaffarpur Weather, Scientific Calculator, Calendar, Compass, and World/School Clock.',
      features: ['Turn-by-Turn GPS to DAV Khabra', 'Live Bus Radar Fleet', 'Working Scientific Calculator', 'Live Weather, Compass & Clock'],
      demoReady: 'Calculator, Weather & Clock 100% Free'
    },
    {
      num: 8,
      id: 'focus',
      category: 'utilities',
      name: 'Deep Study Focus Mode',
      shortName: 'Deep Focus OS',
      tagline: 'Pomodoro Engine, 40Hz Binaural Beats & Focus Streaks',
      icon: Trophy,
      color: 'from-indigo-600 to-violet-700',
      glowClass: 'hover:border-violet-400/60 shadow-violet-500/10',
      badge: 'Focus Arena',
      desc: 'Distraction-free deep work zone featuring anti-tab switch detection, 40Hz Gamma wave synthesizer, ambient rain soundscapes, and live campus study leaderboards.',
      features: ['Anti-Distraction Monitor', '40Hz Binaural Focus Waves', '15m to 60m Study Sprints', 'Campus Study Leaderboard'],
      demoReady: 'View Leaderboard • Login to Start Focus'
    },
    {
      num: 9,
      id: 'vault',
      category: 'utilities',
      name: 'Secure Student Personal Vault',
      shortName: 'Student Vault',
      tagline: 'Encrypted Cloud Storage for IDs, Credentials & Records',
      icon: Shield,
      color: 'from-slate-700 to-zinc-900',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Zero-Knowledge',
      desc: 'Personal encrypted student locker. Safely store report cards, school ID cards, admission numbers, fee receipts, and private academic goals with end-to-end security.',
      features: ['Encrypted Cloud Storage', 'Digital School ID Generator', 'Academic Performance Ledger', 'Secure Password Vault'],
      demoReady: 'Protected Vault • Login to Open'
    },
    {
      num: 10,
      id: 'donate',
      category: 'community',
      name: 'Donate to Developer (Patron)',
      shortName: 'Developer Patron',
      tagline: 'Sponsor Digital Education & Instant Stamped Receipt',
      icon: Heart,
      color: 'from-amber-600 to-yellow-600',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Official Bill',
      desc: 'Community patronage gateway to keep servers running free for all students. Choose ₹5 Chai Support or custom amount via UPI, Paytm, Card, or Cash with an instant official bill.',
      features: ['Instant Stamped Invoice PDF', 'UPI, Paytm, Cash, Cards', 'Sponsor Cloud GPU Servers', 'Donor Hall of Fame'],
      demoReady: 'Interactive Form • Login to Generate Bill'
    },
    {
      num: 11,
      id: 'about',
      category: 'community',
      name: 'About Developer & Community Hub',
      shortName: 'Creator & Community',
      tagline: 'Chat with Head Boy Rishit Shankar & Launch Confetti',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      glowClass: 'hover:border-amber-400/80 shadow-amber-500/20',
      badge: 'Double VIP',
      desc: 'Meet Head Boy Rishit Shankar (Class 8, Roll 25), Chess Cluster 3 Gold Medalist, 96% academic topper. Direct sub-second chat, Launch Celebration Confetti, and community reviews.',
      features: ['Direct Chat with Rishit Shankar', 'Screen Shake Party Popper', 'Verified Social Handles', 'Official Student Endorsements'],
      demoReady: '100% Unlocked for Demo (Double VIP!)'
    }
  ];

  const filteredDimensions = activeDimensionFilter === 'all' 
    ? allDimensions 
    : allDimensions.filter(d => d.category === activeDimensionFilter);

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
      q: "What is DAV Dictionary & Smart Digital Campus?",
      a: "DAV Dictionary is an all-in-one next-generation educational ecosystem engineered specifically for students, parents, and faculty of DAV Public Schools. Across 11 super-dimensions, it hosts the complete digital curriculum of 70+ verified DAV textbooks (LKG to Class 8), paired with Rishi AI, daily homework tracking, online CBT exam simulation, live video classrooms, student attendance, study focus timer, and campus utilities."
    },
    {
      q: "What does 'Have a Demo Preview' allow me to do?",
      a: "The Demo Preview gives you instant, 1-click access to the entire 11-dimension platform without needing to register or enter credentials first! You can explore the Overview Hub, view the complete 70+ textbook library, test chapter Q&A selectors, try Rishi AI interfaces, inspect daily homework and attendance, run the scientific calculator, weather, and compass, explore deep study focus modes, and chat directly with Head Boy Rishit Shankar. Full textbook PDF viewing and AI chatting unlock as soon as you sign in."
    },
    {
      q: "Is access to the textbooks, Rishi AI, and Homework Hub free?",
      a: "Yes, 100%! The core textbooks, Rishi AI questions, daily homework hub, attendance tracker, and school utilities are completely free for all students. There are also specialized VIP and VVIP scholarship tiers with expanded multi-device sync and premium study vaults."
    },
    {
      q: "How do I register or log in with my Student ID?",
      a: "Click on 'Register Now / Student Login' at the top of this page. You will enter the authentic Blackboard Login Gatekeeper where you can sign in with your ID and password or click Free Preview."
    },
    {
      q: "Who is the developer of DAV Dictionary?",
      a: "The platform was conceived, designed, and developed by Rishit Shankar (Head Boy, Class 8 DAV Khabra, Roll 25). He scored 96% in his Class 8 exams (with 100/100 in Sanskrit and 99/100 in Hindi) and is a Chess Cluster 3 Gold Medalist. He engineered this platform as a student-led initiative to empower every DAVian."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-stone-950 relative overflow-x-hidden">
      {/* Festive Rangoli Color Particle Cursor & Scroll Effect */}
      <RangoliCursorEffect />
      
      {/* =========================================================================
          TOP NAVIGATION BAR (FUTURISTIC GLASS & AMBIENT GLOW)
      ========================================================================= */}
      <header className="sticky top-0 z-50 bg-slate-950/85 border-b border-stone-800/80 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl opacity-75 group-hover:opacity-100 transition duration-300" />
              <img 
                src="/logo.png" 
                alt="DAV Dictionary Logo" 
                className="relative w-12 h-12 object-contain rounded-xl bg-stone-950 p-1 border border-amber-500/40"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  DAV Dictionary
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-stone-950 fill-current" />
                  11 Dimensions
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium hidden xs:block">
                DAV Public School Digital Campus &amp; Rishi AI Super-App
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-300">
            <a href="#dimensions" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>11 Dimensions</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black">All</span>
            </a>
            <a href="#features-overview" className="hover:text-amber-400 transition-colors">Campus Features</a>
            <a href="#curriculum" className="hover:text-amber-400 transition-colors">70+ Textbooks</a>
            <a href="#developer" className="hover:text-amber-400 transition-colors">Head Boy Rishit</a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Have a Demo Preview Button (Header Shortcut) */}
            <button
              onClick={() => onEnterDemoPreview(1)}
              className="px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Launch full platform in Demo Mode without login"
            >
              <Rocket className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Demo Preview</span>
            </button>

            <button
              onClick={onGoToLogin}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-stone-950" />
              <span>Login / Register</span>
            </button>

          </div>

        </div>
      </header>

      {/* =========================================================================
          HERO SECTION (CENTER OF ATTRACTION • NEW ERA GRAPHIC DESIGN)
      ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-grid-pattern">
        
        {/* Futuristic Glowing Ambient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-amber-600/20 via-orange-600/15 to-purple-600/15 rounded-full -[140px] pointer-events-none animate-pulse-aura" />
        <div className="absolute top-16 right-5 w-80 h-80 bg-cyan-500/15 rounded-full -[130px] pointer-events-none animate-float-reverse" />
        <div className="absolute bottom-10 left-5 w-80 h-80 bg-emerald-500/15 rounded-full -[130px] pointer-events-none animate-float-gentle" />

        {/* Floating Futuristic Badges (Desktop) */}
        <div className="hidden xl:flex absolute left-8 top-1/3 -translate-y-1/2 p-4 rounded-2xl bg-stone-900/90 border border-amber-500/30 shadow-2xl items-center gap-3 animate-float-gentle pointer-events-none z-20">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black">
            <School className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white">11 Super-Dimensions</div>
            <div className="text-[10px] text-amber-300/80">Complete Campus OS Online</div>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-8 top-1/4 p-4 rounded-2xl bg-stone-900/90 border border-cyan-500/30 shadow-2xl items-center gap-3 animate-float-reverse pointer-events-none z-20">
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black">
            <Brain className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-left">
            <div className="text-xs font-black text-white">Rishi AI Engine</div>
            <div className="text-[10px] text-cyan-300/80">Academic &amp; Outer World AI</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Live Campus Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-900/90 border border-amber-400/50 text-amber-300 text-xs font-extrabold mb-6 shadow-xl shadow-amber-500/10 hover:border-amber-300 transition transform hover:scale-105">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>DAV Public School Khabra • Next-Gen Digital Learning Platform</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
              11 Dimensions Active
            </span>
          </div>

          {/* Main Title with Shimmering Gradient */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            The Digital Campus &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-yellow-300 animate-text-gradient font-black drop-shadow-sm">
              AI Learning Super-App
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Welcome to the new era of DAV education. Built by students for students, featuring <strong>11 comprehensive dimensions</strong>: 70+ official textbooks, Rishi AI companion, daily homework hub, CBT exam simulation, live campus utilities, and deep focus technology.
          </p>

          {/* =========================================================================
              THE TWO PRIMARY ACTION BUTTONS:
              1. REGISTER NOW / STUDENT LOGIN
              2. HAVE A DEMO PREVIEW (REPLACES OLD EXPLORE 70 TEXTBOOKS)
          ========================================================================= */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            
            {/* Left Button: Register Now / Student Login */}
            <button
              onClick={onGoToLogin}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 animate-shimmer-sweep pointer-events-none" />
              <UserCheck className="w-5 h-5 text-stone-950 relative z-10" />
              <span className="relative z-10">Register Now / Student Login</span>
              <ArrowRight className="w-4 h-4 text-stone-950 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Right Button: Have a Demo Preview */}
            <button
              onClick={() => onEnterDemoPreview(1)}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border-2 border-emerald-400/80 hover:border-emerald-300 text-emerald-300 hover:text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Rocket className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
              <span>Have a Demo Preview 🚀</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-stone-950 text-[10px] font-black uppercase">
                Instant Access
              </span>
            </button>

          </div>

          <p className="mt-3 text-xs text-stone-400 font-medium">
            ✨ No account required for Demo Preview • Test all 11 dimensions in 1 click
          </p>

          {/* =========================================================================
              INTERACTIVE LIVE HERO DIMENSION SIMULATOR
          ========================================================================= */}
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-stone-900/70 border-2 border-stone-800 p-5 sm:p-7 shadow-2xl text-left relative overflow-hidden">
            
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-xs font-mono text-stone-400 ml-2">DAV_CAMPUS_OS // INTERACTIVE SIMULATOR</span>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                Tap Any Dimension to Preview:
              </span>
            </div>

            {/* Quick Dimension Selector Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {[
                { idx: 0, label: 'Dim 1: Overview', icon: Layers },
                { idx: 1, label: 'Dim 2: 70+ Books', icon: BookOpen },
                { idx: 3, label: 'Dim 4: Rishi AI', icon: Brain },
                { idx: 4, label: 'Dim 5: Smart ERP', icon: School },
                { idx: 6, label: 'Dim 7: Utilities', icon: Compass },
                { idx: 7, label: 'Dim 8: Deep Focus', icon: Trophy }
              ].map(tab => (
                <button
                  key={tab.idx}
                  onClick={() => setActiveHeroTab(tab.idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeHeroTab === tab.idx
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black shadow-md'
                      : 'bg-stone-950/80 text-stone-300 hover:text-white border border-stone-800'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Dynamic Card Displaying Selected Dimension */}
            {allDimensions[activeHeroTab] && (
              <div className="mt-5 p-5 rounded-2xl bg-stone-950/80 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-400 text-stone-950">
                      Section {allDimensions[activeHeroTab].num}
                    </span>
                    <span className="text-xs font-bold text-stone-400">
                      {allDimensions[activeHeroTab].tagline}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white">
                    {allDimensions[activeHeroTab].name}
                  </h3>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {allDimensions[activeHeroTab].desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {allDimensions[activeHeroTab].features.map((feat, fi) => (
                      <span key={fi} className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                  <button
                    onClick={() => onEnterDemoPreview(allDimensions[activeHeroTab].num)}
                    className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <span>Test This in Demo Preview</span>
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950" />
                  </button>
                  <span className="text-[10px] text-center text-amber-300/80 font-medium">
                    {allDimensions[activeHeroTab].demoReady}
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Animated Statistics Bar */}
          <div className="mt-14 pt-10 border-t border-stone-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-400/50 hover:bg-stone-900/90 transition-all duration-300 shadow-lg group">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 group-hover:scale-110 transition-transform">11</div>
              <div className="text-xs text-stone-400 font-bold mt-1">Super Dimensions</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">● 100% Online</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-orange-400/50 hover:bg-stone-900/90 transition-all duration-300 shadow-lg group">
              <div className="text-3xl sm:text-4xl font-black text-orange-400 group-hover:scale-110 transition-transform">70+</div>
              <div className="text-xs text-stone-400 font-bold mt-1">DAV Official Books</div>
              <div className="text-[10px] text-stone-400 mt-0.5">LKG to Class 8</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-cyan-400/50 hover:bg-stone-900/90 transition-all duration-300 shadow-lg group">
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-xs text-stone-400 font-bold mt-1">Rishi AI Tutor</div>
              <div className="text-[10px] text-cyan-400 font-medium mt-0.5">DAV Grounded</div>
            </div>
            <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-emerald-400/50 hover:bg-stone-900/90 transition-all duration-300 shadow-lg group">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 group-hover:scale-110 transition-transform">100%</div>
              <div className="text-xs text-stone-400 font-bold mt-1">Free for Students</div>
              <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Zero Ads • Zero Lag</div>
            </div>
          </div>

        </div>
      </section>

      
      {/* =========================================================================
          GOOGLE SEARCH SITELINKS & FAST DIRECT PORTALS (NETFLIX STYLE)
      ========================================================================= */}
      <section className="py-12 bg-slate-950 border-b border-stone-800/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with Google Search Badges */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google Search Verified Sitelinks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
                <span>Fast Direct Portals</span>
                <span className="text-xs font-bold text-stone-400 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800">
                  Netflix-Style Directory
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
                Official sub-portals indexed for Google Search. Jump directly into any key section of DAV Dictionary.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-400 bg-stone-900/90 px-3.5 py-2 rounded-xl border border-stone-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-amber-300 font-bold">google.com/search?q=dav+dictionary</span>
            </div>
          </div>

          {/* 5 Netflix-Style Sitelinks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {sitelinks.map((link, idx) => (
              <a
                key={idx}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  link.action();
                }}
                className="group relative p-5 rounded-2xl bg-stone-900/80 hover:bg-stone-900 border border-stone-800 hover:border-amber-400/50 shadow-lg hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} p-2 text-stone-950 flex items-center justify-center font-black shadow-md group-hover:scale-110 transition-transform`}>
                      <link.icon className="w-5 h-5 text-stone-950" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded-full group-hover:text-amber-300 transition-colors">
                      {link.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {link.title}
                  </h3>
                  <p className="text-xs text-stone-400 mt-2 line-clamp-3 leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                  <span className="text-[11px] font-mono text-stone-500 group-hover:text-stone-400">{link.path}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>

{/* =========================================================================
          SECTION 2: THE 11 MASTER DIMENSIONS SHOWCASE (INTERACTIVE GRID)
      ========================================================================= */}
      <section id="dimensions" className="py-20 bg-stone-900/50 border-y border-stone-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
              Complete Architectural Blueprint
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              All 11 Super-Dimensions Explained
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              DAV Dictionary is not just a digital library. It is an all-inclusive digital campus featuring 11 distinct dimensions designed to take every DAVian to the top.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'All 11 Dimensions' },
                { id: 'academics', label: 'Core Academics & Books' },
                { id: 'ai', label: 'Rishi AI Intelligence' },
                { id: 'erp', label: 'Smart School ERP Desk' },
                { id: 'utilities', label: 'Campus Utilities & Focus' },
                { id: 'community', label: 'Patron & Community' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActiveDimensionFilter(f.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDimensionFilter === f.id
                      ? 'bg-amber-400 text-stone-950 font-black shadow-md'
                      : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* 11 Dimensions Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDimensions.map((dim) => {
              const IconComp = dim.icon;
              return (
                <div 
                  key={dim.num}
                  className={`p-6 sm:p-7 rounded-3xl bg-stone-950/80 border border-stone-800 ${dim.glowClass} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Subtle Top Gradient Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dim.color}`} />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${dim.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-amber-300 text-[10px] font-black uppercase">
                        Section {dim.num}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {dim.name}
                    </h3>
                    <p className="text-xs font-bold text-amber-400/90 mt-1">
                      {dim.tagline}
                    </p>

                    <p className="text-xs text-stone-300 mt-3 leading-relaxed">
                      {dim.desc}
                    </p>

                    {/* Features Chips */}
                    <div className="space-y-1.5 mt-4 pt-4 border-t border-stone-900">
                      {dim.features.map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-[11px] text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-stone-400 font-medium">
                      {dim.demoReady}
                    </span>
                    <button
                      onClick={() => onEnterDemoPreview(dim.num)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-stone-950 font-black text-xs transition-all flex items-center gap-1 cursor-pointer border border-amber-400/30"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Big Banner in Dimensions Section */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 border-2 border-amber-400/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Want to test all 11 features right now without logging in?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                Click Have a Demo Preview to roam freely through the entire school portal!
              </p>
            </div>
            <button
              onClick={() => onEnterDemoPreview(1)}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-stone-950 font-black text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2 shrink-0"
            >
              <Rocket className="w-4 h-4 text-stone-950" />
              <span>Launch Demo Preview Now →</span>
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CURRICULUM SHOWCASE (LKG TO CLASS 8)
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
                    ? 'bg-amber-400 text-stone-950 shadow-md font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 8 (10 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('6')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === '6'
                    ? 'bg-amber-400 text-stone-950 shadow-md font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 6 (10 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('4')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === '4'
                    ? 'bg-amber-400 text-stone-950 shadow-md font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Class 4 (7 Books)
              </button>
              <button
                onClick={() => setActiveGradeFilter('primary')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeGradeFilter === 'primary'
                    ? 'bg-amber-400 text-stone-950 shadow-md font-black'
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
                className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-amber-400/40 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: MEET THE DEVELOPER & HEAD BOY (RISHIT SHANKAR)
      ========================================================================= */}
      <section id="developer" className="py-20 bg-stone-900/40 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/40 border border-stone-800 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full -[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Photo & Badges */}
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

              {/* Bio & Vision */}
              <div className="lg:col-span-8 space-y-5">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Vision Behind The 11 Dimensions</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  "Every DAV student deserves 24/7 access to their books, intelligent guidance, and the confidence to top their exams."
                </h2>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  As Head Boy at DAV Khabra, I observed students frequently struggling with heavy bags, forgotten books, or lack of instant explanations while studying at home. I engineered <strong>DAV Dictionary</strong> into an all-in-one digital companion—expanding from a digital library into 11 comprehensive dimensions uniting Rishi AI, homework tracking, CBT exams, bus radar, and deep focus technology.
                </p>

                {/* Developer Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-amber-400 font-black text-sm">96% Score</div>
                    <div className="text-[10px] text-stone-400">Class 8 Half-Yearly (100/100 Sanskrit)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-emerald-400 font-black text-sm">Gold Medalist</div>
                    <div className="text-[10px] text-stone-400">Chess Cluster 3</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-cyan-400 font-black text-sm">Full-Stack</div>
                    <div className="text-[10px] text-stone-400">React, Vite, AI &amp; Supabase Cloud</div>
                  </div>
                </div>

                {/* Contact Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <a
                    href="https://wa.me/919470033984?text=Hi%20Rishit%2C%20I%20am%20a%20DAV%20student%20using%20The%20DAV%20Dictionary!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="tel:+918092261750"
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 80922 61750</span>
                  </a>

                  <a
                    href="mailto:rishitshankar@gmail.com?subject=Hello%20Rishit%20-%20The%20DAV%20Dictionary"
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-rose-500 text-rose-300 hover:text-white border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>rishitshankar@gmail.com</span>
                  </a>

                  <a
                    href="https://www.instagram.com/rishit_shankar?cplk=MXNlYzVmajBtdzFxag=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <InstagramLogo className="w-3.5 h-3.5 fill-current" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/rishit-shankar-05559b2bb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <LinkedInLogo className="w-3.5 h-3.5 fill-current" />
                    <span>LinkedIn</span>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FAQ SECTION
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
          SECTION 6: BOTTOM CALL TO ACTION
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
            Choose between full Student Login or instant Free Demo Preview to experience all 11 dimensions today!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onGoToLogin}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-5 h-5 text-stone-950" />
              <span>Register / Login with ID</span>
            </button>

            <button
              onClick={() => onEnterDemoPreview(1)}
              className="px-8 py-4 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border-2 border-emerald-400 text-emerald-300 hover:text-white font-black text-sm sm:text-base shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Rocket className="w-5 h-5 text-emerald-400" />
              <span>Launch Demo Preview 🚀</span>
            </button>
          </div>

          <p className="mt-4 text-[11px] text-stone-500">
            Instant Login • Mobile, Tablet &amp; PC Optimized • 100% Free
          </p>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
      ========================================================================= */}
      <footer className="bg-[#120d0b] border-t border-stone-800/80 py-10 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="DAV Dictionary" className="w-10 h-10 object-contain rounded-lg" />
            <div>
              <span className="font-bold text-white text-sm">DAV Dictionary</span>
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
