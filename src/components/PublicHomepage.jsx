import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, GraduationCap, Award, ShieldCheck, 
  CheckCircle2, ArrowRight, Lock, UserCheck, Brain, 
  Search, Library, Star, Crown, ChevronDown, ChevronUp,
  FileText, HelpCircle, Heart, Code2, LogIn, Highlighter,
  Flame, Laptop, Check, ArrowUpRight, School, Phone, Mail, MessageCircle,
  Play, Compass, Calculator, Calendar as CalendarIcon, Clock as ClockIcon,
  CloudSun, Bus, MapPin, Eye, Trophy, Layers, Video, ClipboardList,
  UserCheck as UserCheckIcon, Shield, Zap, ExternalLink, Rocket,
  Volume2, VolumeX, Pause, RefreshCw, Smartphone, Key, Upload, Database, Radio, Sparkle,
  ArrowLeft, Shuffle, XCircle
} from 'lucide-react';
import { WhatsAppLogo, InstagramLogo, LinkedInLogo, SnapchatLogo, YouTubeLogo, XTwitterLogo } from './SocialLogos';
import { RangoliCursorEffect } from './RangoliCursorEffect';
import { GoogleIcon } from './GoogleIcon';
import { DAV_106_CONCEPTS } from '../data/dav106ConceptsData';

export function PublicHomepage({ onGoToLogin, onEnterDemoPreview, onOpenCinematic }) {
  const [activeGradeFilter, setActiveGradeFilter] = useState('8');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeDimensionFilter, setActiveDimensionFilter] = useState('all');
  const [activeHeroTab, setActiveHeroTab] = useState(0);
  const [interactiveSectionTab, setInteractiveSectionTab] = useState(1);
  const [sampleQuizChoice, setSampleQuizChoice] = useState(null);
  const [sampleQuizRevealed, setSampleQuizRevealed] = useState(false);
  const [previewingTone, setPreviewingTone] = useState(null);
  const [interactiveAiPrompt, setInteractiveAiPrompt] = useState('science');
  const [homeConceptIndex, setHomeConceptIndex] = useState(0);
  const [homeConceptQuizChoice, setHomeConceptQuizChoice] = useState(null);
  const [homeConceptSubject, setHomeConceptSubject] = useState('all');


  // Web Audio Synthesized Campus Chimes for Section 5 Live Preview
  const playHomeChime = (toneId) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') ctx.resume();

      if (toneId === 'gurukul') {
        const freqs = [523.25, 587.33, 659.25, 783.99, 880.00];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          const t = ctx.currentTime + (idx * 0.22);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.6);
        });
      } else if (toneId === 'pulse') {
        [0, 0.4].forEach(offset => {
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.frequency.value = 440;
          osc2.frequency.value = 480;
          const t = ctx.currentTime + offset;
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);
          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.3);
          osc2.stop(t + 0.3);
        });
      } else if (toneId === 'bell') {
        [587.33, 880.00].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const t = ctx.currentTime + (idx * 0.05);
          gain.gain.setValueAtTime(0.14, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 1.2);
        });
      }
      setTimeout(() => {
        try { ctx.close(); } catch (e) {}
      }, 2000);
    } catch (e) {}
  };

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
      tagline: 'Interactive Campus Navigator & Section Gateway',
      icon: Layers,
      color: 'from-amber-500 to-orange-600',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Section 1',
      desc: 'Central control deck and visual index connecting all 14 academic sections. Real-time portal status, quick jumps, daily notifications, and student shortcuts.',
      features: ['14-Section Quick Switcher', 'Live Campus Announcements', 'Academic Shortcuts', 'Interactive Radar'],
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
      badge: 'Section 2',
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
      badge: 'Section 3',
      desc: 'Dual-mode Question & Answer engine supporting Normal, VIP, and VVIP study tracks. Connects every DAV chapter to verified solutions, exercises, and model answers.',
      features: ['Normal & VIP Plan Modes', 'Solution Gyan Integration', 'Class 1-8 Chapter Banks', 'Audio Chapter Pronunciation'],
      demoReady: 'Explore All Chapters • Login to Open Solution'
    },
    {
      num: 4,
      id: 'rishi_ai',
      category: 'ai',
      name: 'Rishi AI Intelligent Companion',
      shortName: 'Rishi AI',
      tagline: 'Curriculum-Trained Dual Engine (Academics & Outer World)',
      icon: Brain,
      color: 'from-amber-400 via-orange-500 to-yellow-500',
      glowClass: 'hover:border-amber-400/80 shadow-amber-500/20',
      badge: 'Section 4',
      desc: 'Proprietary artificial intelligence grounded in DAV textbooks and CBSE syllabus. Switch between Academic Curriculum Intelligence and Global Non-Academic Knowledge.',
      features: ['DAV Textbook Grounded', 'Class 1-8 Specific Tuning', 'Speech Voice Q&A', 'Chapter Quiz Auto-Generator'],
      demoReady: 'Explore Modes & Prompts • Login to Ask AI'
    },
    {
      num: 5,
      id: 'erp',
      category: 'erp',
      name: 'Smart School ERP & Faculty Desk',
      shortName: 'Faculty & ERP',
      tagline: '6-in-1 Daily Academic Desk & Live Virtual Schooling',
      icon: School,
      color: 'from-blue-600 to-cyan-600',
      glowClass: 'hover:border-cyan-400/60 shadow-cyan-500/10',
      badge: 'Section 5',
      desc: 'Comprehensive school operations: Daily Homework Hub, Faculty Desk, WebRTC Live Video Classrooms, WhatsApp Channels, Digital Attendance, and Exam Hall.',
      features: ['Daily Homework Hub (100% Free)', 'WebRTC HD Live Classes', 'WhatsApp Channels Hub', 'Digital Attendance Register'],
      demoReady: 'Homework & Attendance 100% Free'
    },
    {
      num: 6,
      id: 'videos',
      category: 'academics',
      name: 'Video Explanations & PYQ Bank',
      shortName: 'Video Lectures',
      tagline: 'Curated DAV Board Lectures & Previous Year Question Papers',
      icon: Video,
      color: 'from-rose-600 to-pink-600',
      glowClass: 'hover:border-rose-400/60 shadow-rose-500/10',
      badge: 'Section 6',
      desc: 'Expert video lessons linked to every chapter of Class 8, 6, and 4. Accompanied by official past-year board examination question papers and step-by-step marking schemes.',
      features: ['Multi-Part Video Lessons', 'Official DAV Past Papers', 'Chapter Playlist Switcher', 'Multi-Part Brain Teasers'],
      demoReady: 'Browse Video Syllabus • Login to Watch'
    },
    {
      num: 7,
      id: 'utilities',
      category: 'utilities',
      name: 'Kids Fun Navigator & Utilities',
      shortName: 'Kids Navigator',
      tagline: 'Live Bus Radar, Muzaffarpur Weather, 2026-2047 Calendar, Tools',
      icon: Compass,
      color: 'from-emerald-600 to-teal-700',
      glowClass: 'hover:border-emerald-400/60 shadow-emerald-500/10',
      badge: 'Section 7',
      desc: 'Live interactive tools: Principal Anil Kumar Singh Live Bus Fleet Radar, Live Muzaffarpur GPS Weather, Scientific Calculator, 2026-2047 Festival Calendar, Compass, and World Clock.',
      features: ['Live Bus Radar Fleet', 'Live Area Weather via GPS', '2026-2047 Complete Festival Calendar', 'Working Scientific Calculator'],
      demoReady: 'Bus Radar, Weather & Tools 100% Free'
    },
    {
      num: 8,
      id: 'exam_practice',
      category: 'academics',
      name: 'Online CBT Exam Practice Suite',
      shortName: 'Exam Practice',
      tagline: 'Class 8 Science CBT Simulation & Tiered Question Banks',
      icon: Award,
      color: 'from-indigo-600 to-purple-700',
      glowClass: 'hover:border-indigo-400/60 shadow-indigo-500/10',
      badge: 'Section 8',
      desc: 'Official CBT exam simulator with real-time timers, question palettes, and tiered question banks (Normal: 25 Qs, VIP: 50 Qs, Double VIP: 100 Qs) for Class 8 Science.',
      features: ['Class 8 Science Practice Bank', '25/50/100 Tiered Question Pools', 'Real-time Scorecards & Analytics', 'Official Board Simulation'],
      demoReady: 'Normal 25 Qs Free • VIP for Extended'
    },
    {
      num: 9,
      id: 'focus',
      category: 'utilities',
      name: 'Deep Study Mode',
      shortName: 'Deep Study Mode',
      tagline: 'Pomodoro Focus Timer, Binaural Audio, Study Planner & Flashcards',
      icon: Trophy,
      color: 'from-amber-600 to-red-600',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Section 9',
      desc: 'Complete distraction-free study suite featuring custom Pomodoro focus timers, synthesized ambient binaural audio (rain, alpha waves, study lo-fi), flashcard decks, and daily revision planners.',
      features: ['Pomodoro Study Timer', 'Binaural Audio Generator', 'Daily Revision Planner', 'Flashcard Mastery Deck'],
      demoReady: '100% Free & Active in Web Version'
    },
    {
      num: 10,
      id: 'settings_vfx',
      category: 'utilities',
      name: 'Settings Hub & Animation Studio',
      shortName: 'Settings & VFX',
      tagline: 'Live Section VFX Customizer, 10 Accent Themes, High-Speed Train',
      icon: Sparkles,
      color: 'from-cyan-600 to-blue-700',
      glowClass: 'hover:border-cyan-400/60 shadow-cyan-500/10',
      badge: 'Section 10',
      desc: 'Customize the portal interface with 10 vibrant accent colors, light/dark themes, and the Animation Studio where clicking "Customize VFX" live-applies animations directly to target sections.',
      features: ['10 Live Accent Color Palettes', 'Interactive Animation Studio', 'High-Speed Bullet Train VFX', 'Section Background Customizer'],
      demoReady: '100% Unlocked in Demo'
    },
    {
      num: 11,
      id: 'donate',
      category: 'community',
      name: 'Patron Donation Section',
      shortName: 'Developer Patron',
      tagline: 'Sponsor Digital Education Infrastructure & Stamped Receipt',
      icon: Heart,
      color: 'from-rose-600 to-amber-600',
      glowClass: 'hover:border-rose-400/60 shadow-rose-500/10',
      badge: 'Section 11',
      desc: 'Community support portal to maintain high-speed cloud GPU servers and textbook storage for every DAVian. Includes official stamped digital receipt generator.',
      features: ['Official Stamped Receipt PDF', 'Sponsor Cloud GPU Servers', 'Donor Hall of Fame', 'Direct Head Boy Support'],
      demoReady: 'Interactive Form • Login to Generate Bill'
    },
    {
      num: 12,
      id: 'reviews',
      category: 'community',
      name: 'Developer Reviews Section',
      shortName: 'Community Reviews',
      tagline: 'Verified Student & Parent Feedback & Campus Ratings',
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      glowClass: 'hover:border-yellow-400/60 shadow-yellow-500/10',
      badge: 'Section 12',
      desc: 'Official platform review wall where DAV students, teachers, and parents share verified experiences and feature ratings with zero hardcoded demo reviews.',
      features: ['Verified Student Reviews', '5-Star Campus Rating Matrix', 'Direct Developer Feedback', 'Real-time Review Posting'],
      demoReady: 'Read Reviews • Login to Submit'
    },
    {
      num: 13,
      id: 'dev_id',
      category: 'erp',
      name: 'Developer ID Generator Section',
      shortName: 'ID Generator Vault',
      tagline: 'All Sections ID Development, Credential Vault & Role Provisioning',
      icon: Shield,
      color: 'from-slate-700 to-zinc-900',
      glowClass: 'hover:border-amber-400/60 shadow-amber-500/10',
      badge: 'Section 13',
      desc: 'Master developer control room for generating specialized access IDs across all sections, viewing registered student accounts, managing credentials, and auditing permissions.',
      features: ['Universal Section ID Generator', 'Student Credential Directory', 'Role & Tier Provisioning', 'Developer Vault Access'],
      demoReady: 'Developer Role Access'
    },
    {
      num: 14,
      id: 'about_creator',
      category: 'community',
      name: 'About Creator (Head Boy Rishit Shankar)',
      shortName: 'Creator Showcase',
      tagline: 'Meet Head Boy Rishit Shankar — Academics, Tech Stack, Chess Champion',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      glowClass: 'hover:border-amber-400/80 shadow-amber-500/20',
      badge: 'Section 14',
      desc: 'Explore the full journey of platform creator Rishit Shankar (Head Boy, Class 8 Roll 25): 95% Half-Yearly score, DAV Cluster 3 Chess Gold Medalist, full-stack tech architecture, and 3-second Cyclone Vortex.',
      features: ['Full Academic & Leadership Story', 'DAV Cluster 3 Chess Trophies', 'Interactive Tech Stack Matrix', 'Direct Founder Endorsements'],
      demoReady: '100% Unlocked for All Students'
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
      q: "What is DAVDixence?",
      a: "DAVDixence is the premier official digital learning and comprehensive academic portal engineered specifically for DAV Public Schools by Head Boy Rishit Shankar. Spanning 14 comprehensive academic portals, DAVDixence delivers 70+ complete official DAV textbooks from Class LKG to Class 8, the proprietary curriculum-grounded Rishi AI, chapter-by-chapter verified Q&A solutions, daily homework tracking, online CBT exam practice, full chapter video explanations, Deep Study Mode with Pomodoro & binaural audio, and live Muzaffarpur bus radar & weather utilities."
    },
    {
      q: "What does Demo Preview allow me to do?",
      a: "The Demo Preview grants immediate, complete access to explore all 14 Academic Sections and Portals of DAVDixence with zero restrictions! Visitors and prospective buyers can freely explore all 70+ digital textbooks, test verified Chapter Q&A selectors, interact with the full-screen Rishi AI engine, inspect daily homework and attendance records, test the scientific lab suites, weather radar, and festival calendar, launch Deep Study Mode, and explore the developer showcase. Every single feature is 100% workable and ready for live campus deployment."
    },
    {
      q: "Is access to the textbooks, Rishi AI, and Homework Hub free?",
      a: "Yes, 100%! All core textbooks, homework tracking, digital attendance, live campus utilities, and curriculum guides are completely free for all students. Specialized VIP and Double VIP scholarship tiers provide extended CBT question pools (up to 100 questions) and multi-source study guides."
    },
    {
      q: "How do I register or log in with my Student ID?",
      a: "Click on 'Register Now / Student Login' at the top of this page. You will enter the authentic Blackboard Login Gatekeeper where you can sign in with your ID and password or click Free Preview."
    },
    {
      q: "Who is the developer of DAVDixence?",
      a: "DAVDixence was conceived, architected, and engineered by Rishit Shankar (Head Boy, Class 8 DAV School, Roll 25). He scored 95% in his Class 8 Half-Yearly exams (including 80/80 in Sanskrit and 79/80 in Hindi), 93% in PT-1, and is a DAV Cluster 3 Gold Medalist in Chess. He developed DAVDixence as an empowering, student-led innovation for the entire DAV fraternity."
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
                  14 Sections
                </span>
              </div>
              <p className="text-[11px] text-amber-300/80 font-medium hidden xs:block">
                DAV School Digital Campus &amp; Rishi AI Super-App
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-300">
            <a 
              href="#dimensions" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('dimensions')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>14 Sections</span>
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-black">All</span>
            </a>
            <a 
              href="#features-overview" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features-overview')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Campus Features
            </a>
            <a 
              href="#curriculum" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              70+ Textbooks
            </a>
            <a 
              href="#developer" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('developer')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Head Boy Rishit
            </a>
            <a 
              href="#faq" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-amber-400 transition-colors"
            >
              FAQ
            </a>
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
            <div className="text-xs font-black text-white">14 Academic Sections</div>
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
            <span>DAV School • Next-Gen Digital Learning Platform</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-black uppercase">
              14 Sections Active
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
            Welcome to the new era of DAV education. Built by students for students, featuring <strong>14 comprehensive academic sections</strong>: 70+ official textbooks, Rishi AI companion, daily homework hub, CBT exam simulation, live campus utilities, and deep focus technology.
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
            ✨ No account required for Demo Preview • Test all 14 Academic Sections in 1 click
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={onGoToLogin}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-stone-200 text-xs font-bold transition cursor-pointer"
            >
              <GoogleIcon className="w-3.5 h-3.5" />
              <span>Google Login &amp; Sign-Up Available</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </button>
          </div>

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

            {/* Quick Section Selector Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 overflow-x-auto pb-2 scrollbar-none">
              {[
                { idx: 0, label: 'Sec 1: Overview', icon: Layers },
                { idx: 1, label: 'Sec 2: 70+ Books', icon: BookOpen },
                { idx: 2, label: 'Sec 3: Q&A Bank', icon: FileText },
                { idx: 3, label: 'Sec 4: Rishi AI', icon: Brain },
                { idx: 4, label: 'Sec 5: Smart ERP', icon: School },
                { idx: 6, label: 'Sec 7: Kids Portal', icon: Compass },
                { idx: 7, label: 'Sec 8: CBT Exams', icon: Trophy },
                { idx: 8, label: 'Sec 9: Deep Focus', icon: Zap },
                { idx: 13, label: 'Sec 14: Head Boy', icon: Crown }
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
          LIVE CAMPUS PULSE & SENSORS TICKER BAR
      ========================================================================= */}
      <div className="bg-stone-950 border-y border-stone-800/80 py-3.5 px-4 overflow-x-auto relative z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 min-w-max text-xs">
          
          {/* Item 1: Location & School */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-stone-400">Campus:</span>
            <span className="font-bold text-white flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-amber-400" />
              <span>DAV Public School, Khabra, Muzaffarpur</span>
            </span>
          </div>

          {/* Item 2: Weather & Sensor */}
          <div className="flex items-center gap-2">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-stone-400">Muzaffarpur Weather:</span>
            <span className="font-bold text-emerald-400">27°C • Clear Sky • AQI Good</span>
          </div>

          {/* Item 3: Bus Transport Fleet */}
          <div className="flex items-center gap-2">
            <Bus className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-stone-400">Bus Fleet Radar:</span>
            <span className="font-bold text-cyan-300">Buses #1–200 Monitored</span>
          </div>

          {/* Item 4: Rishi AI Cloud Grounding */}
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-stone-400">Rishi AI Core:</span>
            <span className="font-bold text-amber-300">648,317 Lines Grounded</span>
          </div>

          {/* Item 5: Academic Session */}
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-purple-400" />
            <span className="font-mono text-stone-400">Academic Session:</span>
            <span className="font-bold text-purple-300">2026–27 Board Term</span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          NETFLIX-STYLE 5-SECTION MASTER DIRECTORY & GOOGLE SITELINKS
      ========================================================================= */}
      <section id="features-overview" className="py-14 bg-gradient-to-b from-[#141414] via-[#0d0e12] to-[#141414] border-b border-stone-800/90 relative overflow-hidden scroll-mt-20">
        {/* Subtle Ambient Red/Amber Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header with Netflix-Style Badge & Search Verification */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-widest bg-red-600 text-white shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>TOP 5 SECTIONS</span>
                </span>
                <span className="text-xs font-bold text-stone-400 px-2.5 py-0.5 rounded bg-stone-900 border border-stone-800">
                  Trending on DAV Dictionary Today
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <span>Top 5 Portals in DAV Dictionary</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 mt-1.5 max-w-2xl leading-relaxed">
                Cinematic quick-launch directory for the 5 most popular sections. Indexed and verified on Google Search Console for sub-second access.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-300 bg-stone-900/95 px-4 py-2 rounded-xl border border-stone-800 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-stone-400">Google Sitelinks:</span>
              <span className="text-amber-300 font-bold">dav dictionary</span>
            </div>
          </div>

          {/* 5 Netflix-Style Cinematic Poster Cards with Giant Rank Numerals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {sitelinks.map((link, idx) => {
              const rank = idx + 1;
              return (
                <div
                  key={idx}
                  onClick={link.action}
                  className="group relative rounded-2xl bg-gradient-to-b from-stone-900/90 to-stone-950/90 border border-stone-800/90 hover:border-red-500/70 shadow-xl hover:shadow-2xl hover:shadow-red-600/15 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
                >
                  {/* Top Netflix-Style Banner Accent */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-rose-600 opacity-80 group-hover:opacity-100 transition-opacity" />

                  <div className="p-5 flex-1 flex flex-col justify-between relative">
                    
                    {/* Big Netflix Top 10 Styled Rank Numeral Background */}
                    <div className="absolute top-2 right-3 pointer-events-none select-none">
                      <span className="text-6xl sm:text-7xl font-black font-mono leading-none tracking-tighter text-stone-800/60 group-hover:text-red-500/20 transition-colors">
                        #{rank}
                      </span>
                    </div>

                    <div className="relative z-10">
                      {/* Icon & Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${link.color} p-2.5 text-stone-950 flex items-center justify-center font-black shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                          <link.icon className="w-6 h-6 text-stone-950" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-stone-300 bg-stone-800/90 border border-stone-700/60 px-2 py-0.5 rounded-md group-hover:text-amber-300 transition-colors">
                          {link.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-2 leading-snug">
                        {link.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-stone-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {link.description}
                      </p>
                    </div>

                    {/* Bottom Action Bar: Netflix "Watch / Launch" Style */}
                    <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-red-600 text-white flex items-center justify-center transition-colors">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </div>
                        <span className="text-[11px] uppercase tracking-wider font-extrabold">Launch</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500 group-hover:text-stone-400">
                        {link.path}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* =========================================================================
          INTERACTIVE 14-SECTION VISUAL COMMAND CENTER & LIVE SANDBOX
      ========================================================================= */}
      <section id="interactive-sections-hub" className="py-20 bg-gradient-to-b from-[#0d0e12] via-stone-950 to-stone-900 border-b border-stone-800 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Campus Command Center</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Test Every Academic Section Live
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Click any section below to test its live capabilities directly on this page before launching into full screen.
            </p>
          </div>

          {/* Section Number Selector Tabs (1 to 14) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scroll-smooth mb-8">
            {[
              { num: 1, name: 'Overview' },
              { num: 2, name: '70+ Books' },
              { num: 3, name: 'Q&A Arcade' },
              { num: 4, name: 'Rishi AI' },
              { num: 5, name: 'Faculty OS' },
              { num: 6, name: 'Video Lectures' },
              { num: 7, name: 'Bus & Radar' },
              { num: 8, name: 'CBT Simulator' },
              { num: 9, name: 'Deep Study' },
              { num: 10, name: 'Settings & VFX' },
              { num: 11, name: 'Patron & Pay' },
              { num: 12, name: 'Reviews' },
              { num: 13, name: 'ID Generator' },
              { num: 14, name: 'Founder Bio' },
              { num: 'concepts200', name: '⚡ 200 Concepts' }
            ].map((s) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setInteractiveSectionTab(s.num)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
                  interactiveSectionTab === s.num
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 shadow-lg scale-105 border border-amber-300'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:bg-stone-850'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-mono">
                  {s.num}
                </span>
                <span>{s.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Section Live Interactive Showcase Card */}
          <div className="rounded-3xl bg-stone-950 border-2 border-stone-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden animate-fadeIn">
            
            {/* SECTION 1 PREVIEW */}
            {interactiveSectionTab === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
                    Section 1 • Dimension 1
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Campus Overview Hub &amp; Visual Portal Index
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    The central command deck that ties together all 14 academic sections, live school circulars, bell times, and instant shortcuts for daily learning.
                  </p>
                  <div className="space-y-2 pt-2">
                    {['Real-time 14-section status monitor', 'Daily DAV announcement ticker', 'Sub-second section switcher', 'Zero broken links or demo blocks'].map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(1)}
                      className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <span>Launch Overview Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Live 14-Portal Radar Map</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {allDimensions.map(d => (
                      <button
                        key={d.num}
                        type="button"
                        onClick={() => onEnterDemoPreview(d.num)}
                        className="p-3 rounded-xl bg-stone-950 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-400/50 text-left transition group cursor-pointer"
                      >
                        <div className="text-[10px] text-amber-400 font-mono font-bold">Sec {d.num}</div>
                        <div className="text-xs font-bold text-white truncate group-hover:text-amber-300">{d.shortName}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2 PREVIEW */}
            {interactiveSectionTab === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-black uppercase">
                    Section 2 • 70+ Textbooks
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Official Digital Textbook Vault (LKG to Class 8)
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Full uncompressed textbooks with zero missing pages. Equipped with neon highlighters, sticky notes, continuous vertical scroll, and text-to-speech.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Class 8 (15 Books)', 'Class 7 (12 Books)', 'Class 6 (10 Books)', 'Class 5 (9 Books)', 'Class 4 (8 Books)', 'Class 3-1 (18 Books)', 'LKG & UKG (8 Books)'].map((b, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(2)}
                      className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open 70+ Textbooks Vault</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-600/20 text-red-400 mx-auto flex items-center justify-center font-black text-xl">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-black text-white">70+ DAV Curriculum Books</h4>
                  <p className="text-xs text-stone-300 max-w-sm mx-auto">
                    Featuring Mathematics, The Living World Science, We and Our World SST, Gyan Sagar, Abhyas Sagar, Surbhi Sanskrit, and English Literature.
                  </p>
                  <div className="pt-2 text-xs font-mono text-emerald-400">
                    ⚡ 100% Free Streaming • In-App Fast PDF Reader
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4 PREVIEW (RISHI AI) */}
            {interactiveSectionTab === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
                    Section 4 • Rishi AI Core
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Rishi AI — Curriculum Grounded Dual Intelligence
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Trained directly on all DAV textbooks from LKG to Class 8. Instant 5-mark model answers, chapter summaries, HOTS explanations, and outer-world knowledge.
                  </p>
                  
                  {/* Interactive AI Prompt Chips */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-stone-400">Try an Interactive Question:</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'science', label: '🔬 Science Ch 1 Summary' },
                        { id: 'math', label: '📐 Squares & Square Roots Rule' },
                        { id: 'sanskrit', label: '🕉️ Sanskrit Shloka Meaning' },
                        { id: 'grammar', label: '✍️ English Tense Rules' }
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setInteractiveAiPrompt(p.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition ${
                            interactiveAiPrompt === p.id
                              ? 'bg-amber-400 text-stone-950 font-black'
                              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(4)}
                      className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Brain className="w-4 h-4" />
                      <span>Launch Full-Screen Rishi AI</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/30 space-y-3 font-sans">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xs">R</div>
                      <span className="text-xs font-bold text-white">Rishi AI Verified Response</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Grounded</span>
                  </div>

                  <div className="text-xs text-stone-200 space-y-2 leading-relaxed bg-stone-950/80 p-4 rounded-xl border border-stone-800">
                    {interactiveAiPrompt === 'science' && (
                      <p>
                        <strong>🔬 Class 8 Science (The Living World) Ch 1:</strong> Explores cell structure, discovery by Robert Hooke (1665), comparison of plant vs. animal cells, functions of nucleus, mitochondria (powerhouse), and plastids. High board exam probability!
                      </p>
                    )}
                    {interactiveAiPrompt === 'math' && (
                      <p>
                        <strong>📐 Squares &amp; Square Roots:</strong> A square number never ends in 2, 3, 7, or 8. The square of an odd number is always odd. Use the prime factorization or division method for square root calculations.
                      </p>
                    )}
                    {interactiveAiPrompt === 'sanskrit' && (
                      <p>
                        <strong>🕉️ Sanskrit Surabhi (पाठ १):</strong> 'गुणा गुणज्ञेषु गुणा भवन्ति...' — Qualities are truly valued only among those who know virtues. Follows classical Subhashitani moral wisdom for life.
                      </p>
                    )}
                    {interactiveAiPrompt === 'grammar' && (
                      <p>
                        <strong>✍️ English Practice Book (Tenses):</strong> Present Perfect vs. Past Indefinite. Use Present Perfect with indefinite past time with present relevance ('I have completed my homework').
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5 PREVIEW (FACULTY OS & CHIMES) */}
            {interactiveSectionTab === 5 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black uppercase">
                    Section 5 • Faculty &amp; WhatsApp Desk
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Faculty Academic Desk, Calls &amp; WhatsApp Channels
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Complete teacher-student workspace featuring WebRTC live video/audio calling with auto-pickup, WhatsApp-style broadcast channels, homework hub, and attendance.
                  </p>
                  
                  {/* Interactive Audio Chimes Preview */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-stone-400 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Audition Campus Call Ringtones:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'gurukul', label: '🔔 DAV Gurukul Chime' },
                        { id: 'pulse', label: '⚡ Classic Pulse' },
                        { id: 'bell', label: '📿 Temple Brass Bell' }
                      ].map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            playHomeChime(t.id);
                            setPreviewingTone(t.id);
                            setTimeout(() => setPreviewingTone(null), 1800);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition flex items-center gap-1.5 ${
                            previewingTone === t.id
                              ? 'bg-cyan-400 text-stone-950 font-black'
                              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white'
                          }`}
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(5)}
                      className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <School className="w-4 h-4" />
                      <span>Launch Faculty Desk &amp; Channels</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">DAV Official Broadcast Channels</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">Live</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">Class 8-D Academic Circulars</div>
                        <div className="text-[10px] text-stone-400">Code: DAV-8D-TOPPER</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">Official Channel</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">DAV Science &amp; Math Olympiad</div>
                        <div className="text-[10px] text-stone-400">Code: DAV-OLYMP-2026</div>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400">Board Prep</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7 PREVIEW (BUS TRACKER & CALENDAR) */}
            {interactiveSectionTab === 7 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase">
                    Section 7 • Transport &amp; Utilities
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Muzaffarpur Bus Radar &amp; 2026–2047 Calendar
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Official transport radar for DAV Public School, Khabra, Muzaffarpur tracking Buses #1 to #200 with real-time GPS telemetry, weather, and 21-year holiday calendar.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
                      <div className="text-lg font-black text-amber-400">Bus #1–200</div>
                      <div className="text-[10px] text-stone-400">Khabra Fleet</div>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center">
                      <div className="text-lg font-black text-emerald-400">Dec 2047</div>
                      <div className="text-[10px] text-stone-400">Calendar Range</div>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(7)}
                      className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Bus className="w-4 h-4" />
                      <span>Launch Bus Radar &amp; Utilities</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-stone-800">
                    <MapPin className="w-4 h-4" />
                    <span>DAV Khabra Live GPS Telemetry</span>
                  </div>
                  <div className="space-y-2 text-xs text-stone-300">
                    <div className="flex justify-between">
                      <span className="text-stone-400">School Hub:</span>
                      <span className="text-white font-bold">Khabra, Muzaffarpur (842001)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">GPS Coordinates:</span>
                      <span className="text-cyan-400 font-mono">26.1209° N, 85.3647° E</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Current Fleet Speed:</span>
                      <span className="text-emerald-400 font-bold">32 km/h • On Schedule</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 8 PREVIEW (CBT PRACTICE & QUIZ) */}
            {interactiveSectionTab === 8 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-black uppercase">
                    Section 8 • CBT Simulator
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Interactive Online CBT Examination Suite
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Test your preparation with official timed computer-based tests, question palette matrices, and tiered banks across Science, Math, SST, and Hindi.
                  </p>
                  
                  {/* Interactive Sample Question */}
                  <div className="p-4 rounded-2xl bg-stone-900 border border-indigo-500/40 space-y-3">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live Sample Question (Class 8 Science):</span>
                    </div>
                    <p className="text-xs text-white font-bold">
                      Which cell organelle is known as the "Powerhouse of the Cell"?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'A', text: 'Golgi Apparatus', correct: false },
                        { key: 'B', text: 'Mitochondria', correct: true },
                        { key: 'C', text: 'Ribosome', correct: false },
                        { key: 'D', text: 'Lysosome', correct: false }
                      ].map(opt => (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            setSampleQuizChoice(opt.key);
                            setSampleQuizRevealed(true);
                          }}
                          className={`p-2.5 rounded-xl text-xs font-bold text-left transition flex items-center gap-2 cursor-pointer ${
                            sampleQuizRevealed && opt.correct
                              ? 'bg-emerald-600 text-white font-black'
                              : sampleQuizRevealed && sampleQuizChoice === opt.key && !opt.correct
                                ? 'bg-rose-600 text-white font-black'
                                : 'bg-stone-950 hover:bg-stone-850 text-stone-300 border border-stone-800'
                          }`}
                        >
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/30">{opt.key}</span>
                          <span>{opt.text}</span>
                        </button>
                      ))}
                    </div>
                    {sampleQuizRevealed && (
                      <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Correct Answer: (B) Mitochondria generates ATP for cellular energy!</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(8)}
                      className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>Launch Full CBT Simulator</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                  <h4 className="text-base font-black text-white">Tiered Question Pools</h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between">
                      <span className="font-bold text-stone-300">Normal Plan:</span>
                      <span className="text-emerald-400 font-mono font-bold">25 Board Questions</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between">
                      <span className="font-bold text-stone-300">VIP Pass:</span>
                      <span className="text-cyan-400 font-mono font-bold">50 Board Questions</span>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex justify-between">
                      <span className="font-bold text-stone-300">Double VIP Pass:</span>
                      <span className="text-amber-400 font-mono font-bold">100 Full Exam Questions</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 9 PREVIEW (DEEP STUDY & GUARDIAN) */}
            {interactiveSectionTab === 9 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
                    Section 9 • Focus &amp; Anti-Doomscroll
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Deep Study Mode &amp; Screen-Time Guardian
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Zero-distraction learning with real-time app-switch and tab-blur alarms, 40Hz binaural beats, 25-minute Pomodoro timers, and 15-second dopamine resets.
                  </p>
                  <div className="space-y-2 pt-2">
                    {['Automatic alarm when switching to other apps', 'Flashcard mastery decks for Class 8', 'Synthesized 40Hz binaural focus frequencies', 'Configurable daily short-video budget (5 to 60 mins)'].map((t, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-stone-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview(9)}
                      className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Start Deep Study Session</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-stone-900 border border-amber-500/30 text-center space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    25-Minute Pomodoro Focus Arc
                  </div>
                  <div className="w-32 h-32 rounded-full border-4 border-amber-400 flex items-center justify-center mx-auto text-3xl font-mono font-black text-white shadow-xl">
                    25:00
                  </div>
                  <div className="text-xs text-stone-300">
                    🚨 Anti-Distraction Guardian Active • Alarms Trigger on Tab Switch
                  </div>
                </div>
              </div>
            )}

            {/* SPECIAL TAB: 200 PLATFORM CONCEPTS ARCHITECTURE */}
            {interactiveSectionTab === 'concepts200' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-950 p-6 sm:p-8 rounded-3xl border border-amber-500/40 shadow-2xl">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>200 Platform Concepts Architecture</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Master Architecture of 200 Platform &amp; Design Concepts
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                    Explore all 200 world-class website design, UI/UX, cognitive AI, 3D spatial sensory, collaborative, examination diagnostic, and enterprise ERP concepts engineered for DAVDixence.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-amber-400 uppercase block">Phase 1–2</span>
                      <span className="font-black text-white">Bento Grid &amp; Spotlight</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase block">Phase 3–4</span>
                      <span className="font-black text-white">Gamification &amp; CBT</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-purple-400 uppercase block">Phase 6–7</span>
                      <span className="font-black text-white">Voice AI &amp; 3D Lab</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase block">Phase 8–9</span>
                      <span className="font-black text-white">Collab &amp; Error Vault</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-rose-400 uppercase block">Phase 10</span>
                      <span className="font-black text-white">Dynamic Island HUD</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                      <span className="text-[10px] font-bold text-yellow-400 uppercase block">Phase 11</span>
                      <span className="font-black text-white">QR Admit Card &amp; ERP</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEnterDemoPreview('concepts200')}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:opacity-95 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-400/20 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Explore All 200 Platform Concepts</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
                  <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
                    <Layers className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-white">200 Concepts Master Hub</h4>
                  <p className="text-xs text-stone-300">
                    Live interactive features: Dynamic Island HUD, Ctrl+K Command Palette, Virtual 3D Science Lab, Mistake Vault, and QR Admit Card.
                  </p>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 font-mono text-xs text-emerald-400 font-bold">
                    100% Implemented &amp; Live
                  </div>
                </div>
              </div>
            )}

            {/* SECTIONS 3, 6, 10, 11, 12, 13, 14 GENERIC COMPREHENSIVE CARD */}
            {!['concepts200', 1, 2, 4, 5, 7, 8, 9].includes(interactiveSectionTab) && (
              (() => {
                const cur = allDimensions.find(d => d.num === interactiveSectionTab) || allDimensions[0];
                const IconC = cur.icon;
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase">
                        Section {cur.num} • {cur.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        {cur.name}
                      </h3>
                      <p className="text-xs font-bold text-amber-400">
                        {cur.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {cur.desc}
                      </p>
                      <div className="space-y-2 pt-2">
                        {cur.features.map((f, fi) => (
                          <div key={fi} className="flex items-center gap-2 text-xs text-stone-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEnterDemoPreview(cur.num)}
                          className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer"
                        >
                          <span>Explore Section {cur.num}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4">
                      <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${cur.color} text-white flex items-center justify-center mx-auto shadow-xl`}>
                        <IconC className="w-10 h-10" />
                      </div>
                      <h4 className="text-lg font-black text-white">{cur.name}</h4>
                      <p className="text-xs text-stone-300 max-w-sm mx-auto">{cur.demoReady}</p>
                      <div className="pt-2 text-xs font-mono text-amber-400">
                        100% Operational &amp; Tested
                      </div>
                    </div>
                  </div>
                );
              })()
            )}

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: THE 11 MASTER DIMENSIONS SHOWCASE (INTERACTIVE GRID)
      ========================================================================= */}
      <section id="dimensions" className="py-20 bg-stone-900/50 border-y border-stone-800 relative scroll-mt-20"><div id="sections" className="absolute -top-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
              Complete Architectural Blueprint
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              All 14 Academic Sections &amp; Super-Portals Explained
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed">
              DAVDixence is not just a digital library. It is an all-inclusive digital campus featuring 14 distinct academic sections and portals designed to take every DAVian to the top.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'All 14 Academic Sections' },
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

          {/* 14 Academic Sections Showcase Cards */}
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
                Want to test all 14 academic sections right now without logging in?
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
                      onError={(e) => {
                        if (!e.target.dataset.triedBackup) {
                          e.target.dataset.triedBackup = "true";
                          e.target.src = "/founder_image_forever.jpeg";
                        }
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-[11px] shadow-lg whitespace-nowrap flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Head Boy • DAV School</span>
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
                  <span>The Vision Behind The 14 Academic Sections</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  "Every DAV student deserves 24/7 access to their books, intelligent guidance, and the confidence to top their exams."
                </h2>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  As Head Boy at DAV School, I observed students frequently struggling with heavy bags, forgotten books, or lack of instant explanations while studying at home. I engineered <strong>DAVDixence</strong> into an all-in-one digital companion—expanding from a digital library into 14 comprehensive academic sections uniting Rishi AI, homework tracking, CBT exams, bus radar, and deep focus technology.
                </p>

                {/* Developer Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-950/70 border border-stone-800">
                    <div className="text-amber-400 font-black text-sm">95% Score</div>
                    <div className="text-[10px] text-stone-400">Class 8 Half-Yearly (80/80 Sanskrit)</div>
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
                    href="mailto:headboyrishitshankar@gmail.com?subject=Hello%20DAV%20Dictionary"
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-rose-500 text-rose-300 hover:text-white border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>headboyrishitshankar@gmail.com</span>
                  </a>

                  <a
                    href="https://www.instagram.com/dav_dictionary?vrfl=MWcwYmRoMWVyeWNtOA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <InstagramLogo className="w-3.5 h-3.5 fill-current" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://www.snapchat.com/add/dav_dictionary?share_id=PtOPLG5tAR8&locale=en-IN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-yellow-400/20 hover:bg-yellow-400 text-yellow-300 hover:text-stone-950 border border-yellow-400/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <SnapchatLogo className="w-3.5 h-3.5" />
                    <span>Snapchat</span>
                  </a>

                  <a
                    href="https://x.com/Dav_Dictionary"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-black hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <XTwitterLogo className="w-3.5 h-3.5 fill-current" />
                    <span>X</span>
                  </a>

                  <a
                    href="https://youtube.com/@davdictionary?si=5FCxn4yecqP35l6O"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <YouTubeLogo className="w-3.5 h-3.5 fill-current" />
                    <span>YouTube</span>
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
          COMPREHENSIVE 14-SECTION ACCESS & TIER COMPARISON MATRIX
      ========================================================================= */}
      <section id="plan-matrix" className="py-20 bg-stone-950 border-t border-stone-800 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">
              Commercial Transparency
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-3 tracking-tight">
              14-Section Feature &amp; Tier Comparison Matrix
            </h2>
            <p className="mt-3 text-stone-300 text-xs sm:text-sm">
              Clear breakdown of student access across all 14 academic sections for each tier.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-stone-800 shadow-2xl bg-stone-900/60">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-stone-950 text-stone-400 uppercase font-mono text-[11px] border-b border-stone-800">
                <tr>
                  <th className="py-4 px-6 text-white font-bold">Academic Section</th>
                  <th className="py-4 px-4 text-emerald-400 font-bold">Normal Plan (₹0)</th>
                  <th className="py-4 px-4 text-cyan-400 font-bold">VIP Pass</th>
                  <th className="py-4 px-4 text-amber-400 font-bold">Double VIP</th>
                  <th className="py-4 px-4 text-purple-400 font-bold">Teacher / Faculty OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 text-stone-200">
                {[
                  { sec: 'Sec 1: Overview Hub', normal: 'Full Access', vip: 'Full Access', vvip: 'Full Access', teacher: 'Admin Index' },
                  { sec: 'Sec 2: 70+ Digital Textbooks', normal: 'Free Streaming LKG-8', vip: 'Highlighters + Cloud', vvip: 'Offline Downloadable', teacher: 'Curriculum Blueprints' },
                  { sec: 'Sec 3: Questions & Answers', normal: 'SolutionGyan (1 Site)', vip: '2 Sites (LearnCram)', vvip: 'All 3 Sites + HOTS', teacher: 'Answer Matrix' },
                  { sec: 'Sec 4: Rishi AI Companion', normal: 'Basic Q&A', vip: 'Flashcards & 5-Marks', vvip: 'Unlimited Outer World', teacher: 'Classroom Grounding' },
                  { sec: 'Sec 5: Faculty Desk & WhatsApp', normal: 'Homework & Read', vip: 'Live Chat + Calls', vvip: 'Priority Faculty Desk', teacher: 'Broadcast Channels + Call' },
                  { sec: 'Sec 6: Video Explanations & PPT', normal: 'Curated Lectures', vip: 'PYQ 5-Year Papers', vvip: 'Board Marking Schemes', teacher: 'Upload Lesson Plans' },
                  { sec: 'Sec 7: Bus Radar & Utilities', normal: 'Bus #1–200 Radar', vip: 'Full GPS Telemetry', vvip: 'All Sensors Active', teacher: 'Fleet Dispatch Radar' },
                  { sec: 'Sec 8: Online CBT Simulator', normal: '25 Questions Test', vip: '50 Questions Bank', vvip: '100 Questions Bank', teacher: 'Auto-Graded Test Hall' },
                  { sec: 'Sec 9: Deep Study & Guardian', normal: 'Pomodoro + Alarms', vip: '40Hz Gamma Audio', vvip: 'Full Screen-Time Shield', teacher: 'Study Room Host' },
                  { sec: 'Sec 10: Settings & Animation VFX', normal: 'Standard Themes', vip: '10 Accent Palettes', vvip: 'All Live VFX Unlocked', teacher: 'Custom Classroom UI' },
                  { sec: 'Sec 11: Patron & Cash Voucher', normal: 'Cash in Hand Desk', vip: 'Digital Stamped Bill', vvip: 'Campus VIP Pass', teacher: 'Fee Record Verified' },
                  { sec: 'Sec 12: Community Reviews Wall', normal: 'Read Reviews', vip: 'Post Verified Review', vvip: 'Featured Student Voice', teacher: 'Faculty Reviewer' },
                  { sec: 'Sec 13: ID Generator & Auth', normal: 'Student View', vip: 'Student View', vvip: 'Student View', teacher: 'Classroom ID Desk' },
                  { sec: 'Sec 14: Head Boy Founder Bio', normal: '100% Unlocked', vip: '100% Unlocked', vvip: '100% Unlocked', teacher: '100% Unlocked' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-850/50 transition">
                    <td className="py-3.5 px-6 font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>{row.sec}</span>
                    </td>
                    <td className="py-3.5 px-4 text-emerald-400 font-medium">{row.normal}</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-medium">{row.vip}</td>
                    <td className="py-3.5 px-4 text-amber-300 font-medium">{row.vvip}</td>
                    <td className="py-3.5 px-4 text-purple-300 font-medium">{row.teacher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      
      {/* =========================================================================
          106+ MASTER ACADEMIC CONCEPTS COMPENDIUM & RAPID QUIZZER SHOWCASE
      ========================================================================= */}
      <section id="concepts-vault-showcase" className="py-20 bg-gradient-to-b from-stone-950 via-[#0e1017] to-stone-950 border-t border-stone-800 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-black uppercase tracking-wider mb-3">
                <Brain className="w-3.5 h-3.5" />
                <span>106+ Master Concepts • Board &amp; Olympiad Knowledge Hall</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                The 106+ Master Academic Concepts Compendium
              </h2>
              <p className="mt-3 text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                110 foundational curriculum concepts across Mathematics, Physics, Chemistry, Biology, Social Science, English Grammar, Computer Science, and Sanskrit. Complete with formulas, memory tricks, real-world examples, and instant self-check quizzes.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onEnterDemoPreview('concepts')}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider hover:opacity-95 transition shadow-xl shadow-amber-400/20 cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Full 106 Concepts Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none text-xs mb-8">
            {[
              { id: 'all', label: 'All 110 Concepts' },
              { id: 'Mathematics', label: 'Mathematics (24)' },
              { id: 'Physics', label: 'Physics (18)' },
              { id: 'Chemistry', label: 'Chemistry (18)' },
              { id: 'Biology', label: 'Biology (18)' },
              { id: 'Social Science', label: 'Social Science (18)' },
              { id: 'English', label: 'English Grammar (10)' },
              { id: 'Computer Science', label: 'Computer Science (2)' },
              { id: 'Hindi & Sanskrit', label: 'Hindi & Sanskrit (2)' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setHomeConceptSubject(tab.id);
                  setHomeConceptIndex(0);
                  setHomeConceptQuizChoice(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                  homeConceptSubject === tab.id
                    ? 'bg-rose-500 text-white font-black shadow-md shadow-rose-500/20'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Concept Showcase Spotlight Card */}
          {(() => {
            const list = DAV_106_CONCEPTS.filter(c => 
              homeConceptSubject === 'all' || c.subject === homeConceptSubject
            );
            const activeConcept = list[homeConceptIndex % list.length] || DAV_106_CONCEPTS[0];
            const hasChosen = homeConceptQuizChoice !== null;
            const isCorrect = homeConceptQuizChoice === activeConcept.quickQuiz.correctIndex;

            return (
              <div className="rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Concept Details (7 Cols) */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                          Concept #{activeConcept.id}
                        </span>
                        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">
                          {activeConcept.subject} • {activeConcept.category}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-stone-500">
                        {homeConceptIndex + 1} of {list.length} in this filter
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {activeConcept.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {activeConcept.coreDefinition}
                    </p>

                    {/* Formula / Principle Box */}
                    {activeConcept.keyFormulaOrLaw && (
                      <div className="rounded-2xl bg-stone-950/90 border border-stone-800 p-4 font-mono">
                        <span className="text-[10px] font-sans font-bold uppercase text-stone-500 block mb-1">
                          Core Law / Mathematical Formula:
                        </span>
                        <div className="text-amber-300 text-xs sm:text-sm font-bold tracking-wide break-words">
                          {activeConcept.keyFormulaOrLaw}
                        </div>
                      </div>
                    )}

                    {/* Real World + Mnemonic */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="bg-stone-950/60 rounded-xl p-3 border border-stone-850">
                        <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-1">
                          🌍 Real-World Application
                        </span>
                        <p className="text-stone-300 text-[11px] leading-relaxed">
                          {activeConcept.realWorldExample}
                        </p>
                      </div>

                      <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
                        <span className="text-[10px] font-bold uppercase text-amber-400 block mb-1">
                          💡 Memory Mnemonic
                        </span>
                        <p className="text-amber-200 text-[11px] font-medium leading-relaxed">
                          {activeConcept.mnemonicOrMemoryHook}
                        </p>
                      </div>
                    </div>

                    {/* DAV Board Tip */}
                    <div className="bg-rose-500/10 rounded-xl p-3 border border-rose-500/20">
                      <span className="text-[10px] font-bold uppercase text-rose-400 block mb-1">
                        🎯 DAV Board Examination Strategy
                      </span>
                      <p className="text-rose-200 text-[11px] leading-relaxed">
                        {activeConcept.davExamTip}
                      </p>
                    </div>

                    {/* Concept Switcher Controls */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setHomeConceptIndex(prev => (prev - 1 + list.length) % list.length);
                          setHomeConceptQuizChoice(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 font-bold text-xs hover:border-amber-400 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Previous Concept</span>
                      </button>

                      <button
                        onClick={() => {
                          setHomeConceptIndex(prev => (prev + 1) % list.length);
                          setHomeConceptQuizChoice(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 font-bold text-xs hover:border-amber-400 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Next Concept</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          const rand = Math.floor(Math.random() * list.length);
                          setHomeConceptIndex(rand);
                          setHomeConceptQuizChoice(null);
                        }}
                        className="px-4 py-2 rounded-xl bg-stone-800 text-amber-300 font-bold text-xs hover:bg-stone-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Random</span>
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Interactive Quiz Widget (5 Cols) */}
                  <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800 p-5 sm:p-6 shadow-inner space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-850 pb-3">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-black uppercase text-white tracking-wider">
                          Interactive Self-Check Quiz
                        </span>
                      </div>
                      {hasChosen && (
                        <span className={`text-[10px] font-black uppercase ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCorrect ? '✓ Correct Answer!' : '✗ Review Answer'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-200 font-bold leading-snug">
                      {activeConcept.quickQuiz.question}
                    </p>

                    {/* Quiz Choice Options */}
                    <div className="space-y-2 pt-1">
                      {activeConcept.quickQuiz.options.map((opt, optIdx) => {
                        const isSelected = homeConceptQuizChoice === optIdx;
                        const isThisCorrect = optIdx === activeConcept.quickQuiz.correctIndex;
                        let btnStyle = 'bg-stone-900 border-stone-800 text-stone-300 hover:border-stone-700';

                        if (hasChosen) {
                          if (isThisCorrect) {
                            btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isSelected && !isThisCorrect) {
                            btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                          } else {
                            btnStyle = 'bg-stone-900/40 border-stone-850 text-stone-500 opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => setHomeConceptQuizChoice(optIdx)}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {hasChosen && isThisCorrect && (
                              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            )}
                            {hasChosen && isSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {hasChosen && (
                      <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 leading-relaxed">
                        <span className="font-bold text-amber-300">Explanation: </span>
                        {activeConcept.quickQuiz.explanation}
                      </div>
                    )}

                    {/* Bottom CTA to explore all concepts */}
                    <div className="pt-2">
                      <button
                        onClick={() => onEnterDemoPreview('concepts')}
                        className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-400/50 text-xs text-amber-300 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Brain className="w-3.5 h-3.5" />
                        <span>Explore All 110 Concepts in Interactive Hall →</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })()}

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
            Choose between full Student Login or instant Free Demo Preview to experience all 14 Academic Sections today!
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
              Conceived &amp; Developed by <strong>Rishit Shankar</strong> (Head Boy, DAV School)
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
