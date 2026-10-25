import React, { useState, useEffect } from 'react';
import { 
  Award, User, Sparkles, Heart, ShieldCheck, Mail, MapPin, 
  BookOpen, Star, Crown, Code2, Terminal, Flame, TrendingUp, 
  Gamepad2, CheckCircle2, Target, Cpu, Layers, Copy, Check, 
  ExternalLink, ChevronRight, GraduationCap, Palette, Film, 
  Compass, Share2, Quote, ArrowUpRight, PartyPopper, MessageCircle,
  Phone, X, Send
} from 'lucide-react';
import { 
  InstagramLogo, LinkedInLogo, FacebookLogo, SnapchatLogo, 
  YouTubeLogo, XTwitterLogo, PinterestLogo, GitHubLogo, 
  TelegramLogo, WhatsAppLogo 
} from './SocialLogos';

export function AboutCreatorSection() {
  const [activeTab, setActiveTab] = useState('story');
  const [copiedBio, setCopiedBio] = useState(false);
  const [isPartyActive, setIsPartyActive] = useState(false);
  const [partyPoppers, setPartyPoppers] = useState([]);
  
  // Right-side Social Chat & Contact Panel State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const myPhoneNumber = "+91 80922 61750";
  const rawPhoneNumber = "8092261750";
  const myWhatsAppNumber = "+91 94700 33984";
  const rawWhatsAppNumber = "9470033984";
  const myEmailId = "rishitshankar@gmail.com";
  
  // Official Links Provided by Rishit Shankar
  const myInstagramUrl = "https://www.instagram.com/rishit_shankar?cplk=MXNlYzVmajBtdzFxag==";
  const myLinkedInUrl = "https://www.linkedin.com/in/rishit-shankar-05559b2bb";
  const myFacebookUrl = "https://www.facebook.com/share/1DqeFxcLH5/";
  const mySnapchatUrl = "https://www.snapchat.com/add/rishitshankar?share_id=-ZCpwO3-VMM&locale=en-IN";
  const myPinterestUrl = "https://pin.it/62wWl4pk8";
  const myXTwitterUrl = "https://x.com/RishitShan59909";
  const myYouTubeUrl = "https://youtube.com/@tofaugerman8214?si=NvJkQQPIn";
  const myGitHubUrl = "https://github.com/RishitShankar";
  const myTelegramUrl = "https://t.me/+919470033984";

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(myWhatsAppNumber);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(myPhoneNumber);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmailId);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyBio = () => {
    const bioText = `Rishit Shankar (रीशीत शंकर) • Age 14 • Class 8 DAV Khabra Head Boy, Roll 25. Full-Stack Developer of DAV Dictionary & Rishi AI. 96% in Class 8 Half-Yearly Exams (100/100 in Sanskrit, 99 in Hindi, 97 in Science & SST). Gold Medal in Chess Cluster 3. Trader, Chess Competitor (1000+ Games), 3D Modeler (Blender), and Video Editor (DaVinci Resolve). WhatsApp: +91 94700 33984 • Call: +91 80922 61750.`;
    navigator.clipboard.writeText(bioText);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  // Birthday / Celebration Party Poppers Graphic Motion Animation
  const triggerCelebrationParty = () => {
    // 1. Trigger Screen Shake on Page
    document.body.classList.remove('animate-screenShake');
    // Force reflow
    void document.body.offsetWidth;
    document.body.classList.add('animate-screenShake');
    setTimeout(() => {
      document.body.classList.remove('animate-screenShake');
    }, 700);

    // 2. Play celebratory fanfare chime with Web Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
          gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.1);
          osc.stop(ctx.currentTime + idx * 0.1 + 0.45);
        });
      }
    } catch (e) {}

    // 3. Generate 60 explosive confetti & popper particles
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'];
    const emojis = ['🎉', '🎊', '✨', '🎈', '⭐', '🎂', '👑'];
    const newPoppers = Array.from({ length: 65 }).map((_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 85, // Scatter across screen
      y: 50 + (Math.random() - 0.5) * 60,
      size: Math.floor(Math.random() * 22) + 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      angle: Math.random() * 360,
      speed: Math.random() * 450 + 150
    }));

    setPartyPoppers(newPoppers);
    setIsPartyActive(true);

    setTimeout(() => {
      setIsPartyActive(false);
      setPartyPoppers([]);
    }, 3200);
  };

  const tabs = [
    { id: 'story', label: 'Identity & Leadership', icon: Crown, color: 'text-amber-400', badge: 'Head Boy' },
    { id: 'academics', label: 'Academics & Half-Yearly', icon: GraduationCap, color: 'text-rose-400', badge: '96% Class 8' },
    { id: 'tech', label: 'Coding & Tech Stack', icon: Code2, color: 'text-cyan-400', badge: 'Full-Stack' },
    { id: 'creative', label: 'Design, 3D & Video', icon: Palette, color: 'text-purple-400', badge: 'Blender & Media' },
    { id: 'gaming_chess', label: 'Chess & Strategy', icon: Gamepad2, color: 'text-emerald-400', badge: '1000+ Chess' },
    { id: 'finance', label: 'Finance & Markets', icon: TrendingUp, color: 'text-yellow-400', badge: 'Trader' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
      
      {/* FULL SCREEN PARTY POPPER OVERLAY */}
      {isPartyActive && (
        <div className="fixed inset-0 pointer-events-none z-[120] overflow-hidden flex items-center justify-center">
          {partyPoppers.map((p) => (
            <div
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                fontSize: `${p.size}px`,
                transform: `rotate(${p.angle}deg)`,
                transition: 'all 2.8s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
              className="absolute animate-bounce select-none drop-shadow-lg"
            >
              {p.emoji}
            </div>
          ))}

          {/* Celebratory Banner Popup */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-stone-950 px-6 sm:px-10 py-4 sm:py-5 rounded-3xl shadow-2xl border-4 border-stone-950 animate-pulse text-center max-w-lg mx-4">
            <div className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2">
              <span>🎉</span>
              <span>Rishit Shankar</span>
              <span>🎊</span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-stone-950 mt-1">
              Class 8 DAV Khabra Head Boy • 96% in Class 8 Half-Yearly Exams • 100/100 in Sanskrit • Founder of DAV Dictionary!
            </p>
          </div>
        </div>
      )}

      {/* Top Banner Tag */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-500 animate-badge-bounce">
            Section 11 • Creator Biography & Vision
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={triggerCelebrationParty}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black shadow-md transition cursor-pointer btn-interactive animate-glow-gold"
          >
            <PartyPopper className="w-4 h-4 animate-float-icon" />
            <span>Celebrate Rishit!</span>
          </button>
          <button
            onClick={handleCopyBio}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 text-xs font-bold border border-amber-500/30 transition shadow-sm cursor-pointer btn-interactive"
          >
            {copiedBio ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBio ? 'Bio Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Main Profile Showcase Card */}
      <div className="bg-gradient-to-b from-stone-900 via-slate-900 to-stone-950 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden relative mb-10 card-interactive shimmer-overlay">
        
        {/* Glow Highlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-float-orb" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: '-5s' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Section */}
        <div className="p-6 sm:p-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
            
            {/* Real Photograph with Glowing Gold Border (Full Uncropped) */}
            <div className="relative group shrink-0">
              <div 
                onClick={triggerCelebrationParty}
                title="Click to celebrate Rishit Shankar!"
                className="relative max-w-[260px] sm:max-w-[300px] rounded-3xl overflow-hidden border-4 border-amber-400/90 shadow-2xl shadow-amber-500/25 bg-stone-950 p-1 flex items-center justify-center cursor-pointer hover:border-amber-300 transition-all"
              >
                <img 
                  src="/rishit_shankar.jpg" 
                  alt="Rishit Shankar - Head Boy & Creator" 
                  className="w-full h-auto max-h-[380px] object-contain rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-52 h-52 bg-gradient-to-tr from-stone-900 to-amber-900 text-amber-300 font-black text-5xl items-center justify-center">
                  RS
                </div>
              </div>

              {/* Head Boy Floating Badge (Clickable for Party Animation) */}
              <button
                onClick={triggerCelebrationParty}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap border-2 border-stone-950 hover:scale-105 transition cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 fill-stone-950" />
                <span>Head Boy • 2026–27</span>
              </button>
            </div>

            {/* Profile Intro & Title */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2">
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Rishit Shankar
                </h1>
                <span className="text-xl sm:text-2xl font-bold text-amber-400 font-serif">
                  (रीशीत शंकर)
                </span>
                <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-300 text-xs font-bold border border-red-700/60">
                  Class 8-D • Roll No. 25
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-amber-200/90 mb-3">
                Head Boy of D.A.V. Public School, Khabra, Muzaffarpur, Bihar
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
                Class 8 DAV Khabra Head Boy, full-stack software developer, 96% in Class 8 half-yearly exams, and creator of <strong>DAV Dictionary</strong> and <strong>Rishi AI</strong>. Driven to unite disciplined learning and cutting-edge artificial intelligence to empower students across India.
              </p>

              {/* Key Quick Facts Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Muzaffarpur, Bihar</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-amber-300 flex items-center gap-1.5 font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Gold Medal in Chess Cluster 3</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-emerald-300 flex items-center gap-1.5 font-bold">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Age 14 • 96%</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 font-bold">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Student Leader and Head Boy</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Founder: DAV Dictionary</span>
                </div>
              </div>

              {/* Direct Quick Contact & Socials Bar */}
              <div className="mt-4 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <a
                  href={`https://wa.me/91${rawWhatsAppNumber}?text=Hi%20Rishit%2C%20I%20am%20a%20DAV%20student%20using%20The%20DAV%20Dictionary!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-stone-950 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp: {myWhatsAppNumber}</span>
                </a>

                <a
                  href={`tel:+91${rawPhoneNumber}`}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {myPhoneNumber}</span>
                </a>

                <a
                  href={`mailto:${myEmailId}?subject=Hello%20Rishit%20-%20The%20DAV%20Dictionary&body=Hi%20Rishit%2C%0A%0A`}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{myEmailId}</span>
                </a>

                <a
                  href={myInstagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-white border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <InstagramLogo className="w-3.5 h-3.5 fill-current" />
                  <span>Instagram</span>
                </a>

                <a
                  href={mySnapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-yellow-500/20 hover:bg-yellow-400 text-yellow-300 hover:text-stone-950 border border-yellow-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <SnapchatLogo className="w-4 h-4 shrink-0" />
                  <span>Snapchat</span>
                </a>

                <a
                  href={myLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-white border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                >
                  <LinkedInLogo className="w-3.5 h-3.5 fill-current" />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* 6 Metric Highlight Cards with Exact Marks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-stone-800 bg-stone-950/70 p-4 sm:p-6 gap-3">
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-amber-500/40 text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-400">96%</div>
            <div className="text-[11px] font-bold text-stone-300 mt-0.5">Class 8 Half-Yearly</div>
            <div className="text-[10px] text-amber-300 font-semibold">Overall Aggregate</div>
          </div>

          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
            <div className="text-xl sm:text-2xl font-black text-orange-400">99 / 100</div>
            <div className="text-[11px] font-bold text-stone-300 mt-0.5">Hindi Course</div>
            <div className="text-[10px] text-stone-500">Gyan & Abhyas Sagar</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-amber-500/40 bg-gradient-to-b from-amber-500/10 to-stone-900/60 text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-300">100 / 100</div>
            <div className="text-[11px] font-bold text-stone-200 mt-0.5">Surabhi Sanskrit</div>
            <div className="text-[10px] text-amber-400 font-bold">80/80 + 20 Century!</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
            <div className="text-xl sm:text-2xl font-black text-purple-400">97 / 100</div>
            <div className="text-[11px] font-bold text-stone-300 mt-0.5">SST & Science</div>
            <div className="text-[10px] text-stone-500">77/80 + 20 in Both</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
            <div className="text-xl sm:text-2xl font-black text-cyan-400">94 / 100</div>
            <div className="text-[11px] font-bold text-stone-300 mt-0.5">Mathematics</div>
            <div className="text-[10px] text-stone-500">74/80 + 20 Marks</div>
          </div>
          <div className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 text-center">
            <div className="text-xl sm:text-2xl font-black text-yellow-400">Trader</div>
            <div className="text-[11px] font-bold text-stone-300 mt-0.5">Financial Literacy</div>
            <div className="text-[10px] text-stone-500">Fibonacci & PCR Options</div>
          </div>
        </div>

      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-stone-900/90 p-2 rounded-2xl border border-stone-800 shadow-md">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[140px] py-3 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/20 font-black'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : tab.color}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}

      {/* 1. STORY & LEADERSHIP */}
      {activeTab === 'story' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-4 flex items-center gap-2.5">
              <Crown className="w-5 h-5 text-amber-600" />
              <span>Leadership Creed & School Governance</span>
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              As the **Head Boy of D.A.V. Public School, Khabra**, Rishit represents the student body with dedication, discipline, and maturity. His leadership style is grounded in active listening, respectful communication with school authorities, and constructive initiative.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-600" />
                  School Proposal to Principal Anil Kumar
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">Inter-House Debate Championship</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rishit authored and presented a formal proposal to school Principal Anil Kumar to establish a structured Inter-House Debate Competition, giving students a platform to articulate perspectives on national, social, and academic issues.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Institutional & Student Advocacy
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-2">Procedural Discipline & Team Spirit</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Believes true leadership follows strict administrative procedures, models respectful conduct towards teachers, and fosters teamwork across classes from Nursery up to Class 8.
                </p>
              </div>
            </div>

            {/* Family & Friends Pillars */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                Family Roots & Lifelong Friends
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <strong className="text-slate-900">Family:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                    <li>Father: <strong>Ashish Shankar (आशीष शंकर)</strong></li>
                    <li>Mother: <strong>Sarita Kumari (सरिता कुमारी)</strong></li>
                    <li>Younger Brother: <strong>Saharsh Shankar</strong></li>
                    <li>Grandfather residing with the family in Muzaffarpur</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-slate-900">Friends & Creative Collaborators:</strong>
                  <p className="mt-1 text-slate-600 leading-relaxed">
                    Cherishes deep camaraderie with close friends <strong>Rehansh Shrevashtav</strong>, <strong>Divyanshu Kumar</strong>, and <strong>Ram Kant</strong>. Creates custom digital designs and festive graphics for school and community events.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 2. ACADEMICS & CENTURY SCORE */}
      {activeTab === 'academics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2.5">
              <GraduationCap className="w-5 h-5 text-rose-600" />
              <span>Academic Distinction & Verified Examination Scores</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Rishit balances rigorous performance across languages, mathematics, sciences, and social studies with conceptual clarity and disciplined study habits.
            </p>

            {/* Scorecard Bars with Correct Marks */}
            <div className="space-y-4 mb-8">
              
              {/* Sanskrit 100/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Sanskrit (संस्कृत सुरभि)
                  </span>
                  <span className="text-amber-700 font-black">100 / 100 (100% Perfect Century Score)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Hindi 99/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                    Hindi (ज्ञान सागर एवं अभ्यास सागर)
                  </span>
                  <span className="text-orange-700 font-black">99 / 100 (99%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '99%' }} />
                </div>
              </div>

              {/* Social Science (SST) 97/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                    Social Science (We and Our World)
                  </span>
                  <span className="text-purple-700 font-black">97 / 100 (77/80 + 20 Marks)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full" style={{ width: '97%' }} />
                </div>
              </div>

              {/* Science 97/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Science & Technology (The Living World)
                  </span>
                  <span className="text-emerald-700 font-black">97 / 100 (77/80 + 20 Marks)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: '97%' }} />
                </div>
              </div>

              {/* Mathematics 94/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                    Mathematics (Secondary Mathematics)
                  </span>
                  <span className="text-cyan-700 font-black">94 / 100 (74/80 + 20 Marks)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              {/* English 89/100 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    English Literature & Practice
                  </span>
                  <span className="text-blue-700 font-black">89 / 100 (69/80 + 20 Marks)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '89%' }} />
                </div>
              </div>

            </div>

            {/* Language Polymath Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                Multilingual Mastery & Vedic Precision
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Achieved a perfect century in Sanskrit grammar and comprehension. Fluent in English and Hindi with an active interest in world linguistic structures and classical literature.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 3. CODING & TECH STACK */}
      {activeTab === 'tech' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2.5">
              <Code2 className="w-5 h-5 text-cyan-600" />
              <span>Full-Stack Engineering & System Architecture</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Rishit designs and engineers production software from scratch, utilizing modern web frameworks, cloud databases, and AI models.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">Frontend Development</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">React 18 & Vite</h4>
                <p className="text-xs text-slate-600">
                  Builds responsive, component-driven user interfaces with Tailwind CSS and Lucide icons.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Artificial Intelligence</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">Rishi AI Engine</h4>
                <p className="text-xs text-slate-600">
                  Architected dual-mode intelligence with automatic textbook grounding and outer world knowledge.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Database & Storage</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">Local & Cloud DB</h4>
                <p className="text-xs text-slate-600">
                  Architected persistent student directories, JSON export backups, and cloud storage integrations.
                </p>
              </div>
            </div>

            {/* Architecture Vision Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-stone-900 text-white flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">DAV Dictionary System</div>
                <div className="text-sm font-extrabold text-white mt-0.5">10 Integrated Sections Serving LKG to Class 8</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black shrink-0">
                Active v1.0
              </span>
            </div>

          </div>
        </div>
      )}

      {/* 4. DESIGN, 3D & VIDEO */}
      {activeTab === 'creative' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2.5">
              <Palette className="w-5 h-5 text-purple-600" />
              <span>Graphic Design, 3D Modelling & Cinematic Video</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Visual storytelling and spatial creation are central to Rishit's creative projects, spanning community campaigns to vehicle geometry in Blender.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              
              {/* Graphic Design */}
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold mb-3 shadow-md">
                    <Palette className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">Graphic Design & Posters</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li>• <strong>Rotary Club of Tirhut:</strong> Crafted digital promotional posters for community leadership initiatives.</li>
                    <li>• <strong>Independence Day:</strong> Designed celebratory patriotic materials and banners.</li>
                    <li>• <strong>Tree Planting Campaign:</strong> Created awareness flyers for environmental tree plantation in Muzaffarpur.</li>
                    <li>• <strong>Digital Invitations:</strong> Personalized birthday & celebration designs for family events.</li>
                  </ul>
                </div>
              </div>

              {/* 3D Blender */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold mb-3 shadow-md">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">Blender 3D Modeling</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li>• <strong>Vehicle Geometry:</strong> Models vehicle meshes and hard-surface geometry in 3D coordinate space.</li>
                    <li>• <strong>Viewport Shading:</strong> Explores material shader nodes, light bounces, and procedural textures.</li>
                    <li>• <strong>Spatial Navigation:</strong> Masters 3D transformation modes, topology, and realistic render passes.</li>
                  </ul>
                </div>
              </div>

              {/* Video Production */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold mb-3 shadow-md">
                    <Film className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-2">DaVinci Resolve Video</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li>• <strong>Cinematic Timeline:</strong> Explores multi-camera cutting, audio track balancing, and transition pacing.</li>
                    <li>• <strong>YouTube Thumbnails:</strong> Crafts high-CTR thumbnails with bold typography and contrast.</li>
                    <li>• <strong>Color Grading:</strong> Studies node-based color science and tone curves for digital media.</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 5. CHESS & STRATEGY */}
      {activeTab === 'gaming_chess' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2.5">
              <Gamepad2 className="w-5 h-5 text-emerald-600" />
              <span>Chess Strategy & Tactical Mastery</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Rishit channels his analytical and strategic mindset through digital chess, endgame calculations, and competitive strategy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Chess 1000+ Games */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <span>♟️ Chess Mastery</span>
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                    1000+ Games
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Experienced chess competitor with over 1,000 matches logged. Focuses on blunder prevention, piece coordination, tactical king safety, and endgame mechanics (castling, en passant, pawn promotion).
                </p>
                <div className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 p-2.5 rounded-xl">
                  "Every match is a lesson: analyze mistakes immediately, reset focus, and calculate two moves deeper."
                </div>
              </div>

              {/* IPL Cricket Analytics */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Cricket Analytics & Tournament Data</span>
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                    IPL Analytics
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Avid follower of cricket analytics, tracking strike rates, run chase probabilities, and tournament data. In July 2026, Rishit actively supported a <strong>Change.org sports leadership campaign</strong> championing fair opportunities for youth athletics.
                </p>
                <div className="text-[11px] font-bold text-blue-800 bg-blue-100/70 p-2.5 rounded-xl">
                  Connects statistical analysis and team leadership to everyday competitive problem-solving.
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 6. FINANCE & MARKETS */}
      {activeTab === 'finance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2 flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <span>Trader • Financial Literacy, Technical Analysis & Markets</span>
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Rishit is an active financial market student and trader, studying risk management, derivative instruments, and capital growth principles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-yellow-50/70 border border-yellow-200">
                <div className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Foundational Study</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">Pushkar Raj Thakur</h4>
                <p className="text-xs text-slate-600">
                  Read and analyzed <em>Stock Market Crash Course</em>, absorbing market fundamentals, chart patterns, and trading psychology.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-yellow-50/70 border border-yellow-200">
                <div className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Technical Indicators</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">Fibonacci & PCR</h4>
                <p className="text-xs text-slate-600">
                  Researched Fibonacci retracement levels for support/resistance and Put-Call Ratio (PCR) for market sentiment.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-yellow-50/70 border border-yellow-200">
                <div className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Asset Allocation</div>
                <h4 className="font-black text-slate-900 text-sm mb-1.5">Mutual Funds & SIPs</h4>
                <p className="text-xs text-slate-600">
                  Studies compounding through Systematic Investment Plans (SIPs), debt vs equity risk balance, and crypto assets.
                </p>
              </div>
            </div>

            {/* Ashish Financial Services Connection */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-700" />
                Ashish Financial Services Collaboration
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Helped author investor communication summaries and promotional visual content connected with <strong>Ashish Financial Services</strong>, demonstrating an ability to present complex financial data clearly and professionally.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* GRAPHIC MOTION CELEBRATION BANNER AT THE BOTTOM */}
      <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950/90 to-stone-900 text-white border-2 border-amber-400/60 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shrink-0 shadow-lg font-black text-2xl animate-pulse">
            RS
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2 justify-center sm:justify-start flex-wrap">
              <span>Rishit Shankar</span>
              <span className="text-xs bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full font-bold uppercase">
                Creator & Head Boy
              </span>
            </h3>
            <p className="text-xs text-amber-200/90 mt-1 max-w-md">
              Tap the celebration button to trigger the whole-page party popper graphic motion animation with fanfare!
            </p>
          </div>
        </div>

        <button
          onClick={triggerCelebrationParty}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:scale-105 transition-all text-stone-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 cursor-pointer shrink-0"
        >
          <PartyPopper className="w-5 h-5" />
          <span>Launch Celebration Animation 🎉</span>
        </button>
      </div>

      {/* Floating Chat With Developer Button on Bottom Right */}
      <div className="fixed right-4 bottom-6 z-40">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="px-5 py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs sm:text-sm shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer border-2 border-emerald-300"
        >
          <MessageCircle className="w-5 h-5 text-stone-950 animate-bounce" />
          <span>Chat With Rishit (WhatsApp &amp; Socials)</span>
          <span className="w-2.5 h-2.5 rounded-full bg-stone-950 animate-ping" />
        </button>
      </div>

      {/* Right-Side Slide-Out Social Media & Contact Panel */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fadeIn">
          {/* Backdrop */}
          <div 
            onClick={() => setIsChatOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-700 shadow-2xl flex flex-col h-full z-10 text-white animate-slideInRight">
            
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">Chat &amp; Connect With Rishit</h3>
                  <p className="text-[11px] text-emerald-300/80">Head Boy &amp; Master Full-Stack Developer</p>
                </div>
              </div>

              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* PRIMARY #1: WhatsApp Direct Chat */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-emerald-800/20 to-stone-900 border border-emerald-500/40 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                    <WhatsAppLogo className="w-5 h-5 fill-current" />
                    <span>WhatsApp Instant Chat</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase">
                    Direct
                  </span>
                </div>
                <p className="text-xs text-stone-300 mb-3">
                  Click below to open WhatsApp on your phone or web browser and start chatting directly with Rishit Shankar ({myWhatsAppNumber}).
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <a
                    href={`https://wa.me/91${rawWhatsAppNumber}?text=Hi%20Rishit%2C%20I%20am%20a%20DAV%20student%20using%20The%20DAV%20Dictionary!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <WhatsAppLogo className="w-4 h-4 fill-current" />
                    <span>Open App ({myWhatsAppNumber})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://web.whatsapp.com/send?phone=91${rawWhatsAppNumber}&text=Hi%20Rishit%2C%20I%20am%20a%20DAV%20student%20using%20The%20DAV%20Dictionary!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    title="Open directly in WhatsApp Web in browser"
                  >
                    <span>WhatsApp Web</span>
                  </a>

                  <button
                    onClick={handleCopyWhatsApp}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition cursor-pointer"
                    title="Copy WhatsApp Number"
                  >
                    {copiedWhatsApp ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* DIRECT CONTACT #2: Phone & Email Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Phone */}
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span>Phone Number</span>
                    </div>
                    <div className="text-[11px] font-mono text-white mb-2">{myPhoneNumber}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`tel:+91${rawPhoneNumber}`}
                      className="flex-1 py-1 px-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-[10px] font-black text-center transition"
                    >
                      Call Now
                    </a>
                    <button
                      onClick={handleCopyPhone}
                      className="p-1 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold mb-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Google Email</span>
                    </div>
                    <div className="text-[10px] font-mono text-white truncate mb-2" title={myEmailId}>{myEmailId}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`mailto:${myEmailId}?subject=Hello%20Rishit%20-%20The%20DAV%20Dictionary&body=Hi%20Rishit%2C%0A%0AI%20am%20contacting%20you%20from%20The%20DAV%20Dictionary.%0A%0A`}
                      className="flex-1 py-1 px-2 rounded-lg bg-rose-500 hover:bg-rose-400 text-white text-[10px] font-black text-center transition"
                      title="Direct Mailto"
                    >
                      Send Email
                    </a>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${myEmailId}&su=Hello%20Rishit%20-%20The%20DAV%20Dictionary`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 px-2 rounded-lg bg-rose-600/50 hover:bg-rose-600 text-white text-[9px] font-bold text-center transition"
                      title="Open in Gmail Web"
                    >
                      Gmail
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 transition"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* OFFICIAL SOCIAL MEDIA PLATFORMS WITH REAL OFFICIAL LOGOS */}
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                  Official Verified Channels (All Platforms):
                </span>

                <div className="space-y-2">
                  {[
                    { name: 'Instagram', handle: '@rishit_shankar', url: myInstagramUrl, Logo: InstagramLogo, color: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600', badge: 'Official Profile' },
                    { name: 'Snapchat', handle: '@rishitshankar', url: mySnapchatUrl, Logo: SnapchatLogo, color: 'bg-yellow-400 text-black', badge: 'Snap & Stories' },
                    { name: 'LinkedIn', handle: 'Rishit Shankar', url: myLinkedInUrl, Logo: LinkedInLogo, color: 'bg-[#0077b5]', badge: 'Developer Network' },
                    { name: 'Facebook', handle: 'Rishit Shankar', url: myFacebookUrl, Logo: FacebookLogo, color: 'bg-[#1877f2]', badge: 'Community' },
                    { name: 'Pinterest', handle: 'Rishit Shankar', url: myPinterestUrl, Logo: PinterestLogo, color: 'bg-[#e60023]', badge: 'Art & Pinboards' },
                    { name: 'X / Twitter', handle: '@RishitShan59909', url: myXTwitterUrl, Logo: XTwitterLogo, color: 'bg-black border border-stone-700', badge: 'Official Announcements' },
                    { name: 'YouTube', handle: '@tofaugerman8214', url: myYouTubeUrl, Logo: YouTubeLogo, color: 'bg-[#ff0000]', badge: 'Channel' },
                    { name: 'GitHub', handle: '@RishitShankar', url: myGitHubUrl, Logo: GitHubLogo, color: 'bg-stone-900 border border-stone-700', badge: 'Source Code' },
                    { name: 'Telegram', handle: '+91 94700 33984', url: myTelegramUrl, Logo: TelegramLogo, color: 'bg-[#229ed9]', badge: 'Instant Ping' }
                  ].map((soc, idx) => {
                    const LogoComponent = soc.Logo;
                    return (
                      <a
                        key={idx}
                        href={soc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-stone-800/60 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/40 flex items-center justify-between gap-3 transition group"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg ${soc.color} flex items-center justify-center shrink-0 shadow-sm p-1.5`}>
                            <LogoComponent className="w-full h-full fill-current" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                              {soc.name}
                            </div>
                            <div className="text-[10px] text-stone-400 font-mono">{soc.handle}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-700">
                            {soc.badge}
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-white" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-3 bg-stone-950 border-t border-stone-800 text-center text-[10px] text-stone-400">
              Official Head Boy Communication Desk • Rishit Shankar
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Icon fallback helper
function Building(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/>
      <path d="M16 6h.01"/>
      <path d="M12 6h.01"/>
      <path d="M12 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 10h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 10h.01"/>
      <path d="M8 14h.01"/>
    </svg>
  );
}

export default AboutCreatorSection;
