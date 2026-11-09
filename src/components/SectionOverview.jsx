import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BookOpen, Brain, Award, FileText, User, 
  HelpCircle, Bell, Compass, ArrowRight, Sparkles, 
  Layers, School, Heart, CheckCircle2, Star, Zap, Flame,
  BookmarkCheck, MessageCircle, ShieldCheck, Video, Bus, Navigation, 
  CheckSquare, MapPin, Trophy, Play, Activity, Radio, Eye, KeyRound
} from 'lucide-react';

// =========================================================================
// ANIMATION 1: INTERACTIVE COSMIC STAR-MESH & VEDIC AURORA CANVAS
// =========================================================================
function CosmicStarMeshCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 3;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Particle nodes for Vedic Constellation
    const particleCount = Math.min(50, Math.floor(width / 24));
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(245, 158, 11, ' : (Math.random() > 0.5 ? 'rgba(239, 68, 68, ' : 'rgba(56, 189, 248, '),
      alpha: Math.random() * 0.5 + 0.25
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(245, 158, 11, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Subtle mouse attraction
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140 && mdist > 5) {
          p.x += (mdx / mdist) * 0.35;
          p.y += (mdy / mdist) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#f59e0b';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

// =========================================================================
// ANIMATION 2: 3D HOLOGRAPHIC PERSPECTIVE TILT CARD WITH LIGHT FLARE
// =========================================================================
function HolographicSectionCard({ sec, isCurrent, isBeingClicked, onClick }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
    const rotateY = ((x - centerX) / centerX) * 9;

    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const IconComp = sec.icon || Sparkles;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-6px) scale(1.015)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)',
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.45s ease-out'
      }}
      className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${sec.cardBg} border-2 relative overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl cursor-pointer group select-none vfx-card-beam-container ${
        isCurrent
          ? 'border-amber-400 ring-4 ring-amber-400/25 vfx-card-beam-glow'
          : isHovered 
            ? 'border-amber-400/80 ring-2 ring-amber-400/20 vfx-card-beam-glow' 
            : `border-slate-200/90 ${sec.borderHover}`
      } ${isBeingClicked ? 'scale-95 ring-4 ring-red-500 transition-transform' : ''}`}
    >
      {/* Dynamic Specular Glare Reflection follows cursor */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle 240px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.45), transparent 70%)`
          }}
        />
      )}

      {/* Subtle Corner Floating Emoji */}
      <div className="absolute -right-3 -bottom-3 text-6xl opacity-10 select-none pointer-events-none group-hover:scale-130 group-hover:opacity-25 transition-all duration-300">
        {sec.emoji}
      </div>

      <div className="relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shrink-0`}>
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
// ANIMATION 3: ANIMATED LIVE CAMPUS STATS COUNTER & RADAR BEACON DECK
// =========================================================================
function LiveCampusStatsRadarDeck() {
  const [counts, setCounts] = useState({
    books: 0,
    sections: 0,
    aiHours: 0,
    scholars: 0
  });

  useEffect(() => {
    let start = performance.now();
    const duration = 1600; // 1.6s smooth counter climb

    const animateCounts = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setCounts({
        books: Math.floor(easeProgress * 70),
        sections: Math.floor(easeProgress * 14),
        aiHours: Math.floor(easeProgress * 24),
        scholars: Math.floor(easeProgress * 10000)
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    const id = requestAnimationFrame(animateCounts);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 backdrop-blur-md border border-amber-500/30 shadow-2xl text-white relative overflow-hidden">
      
      {/* Background Neon Scanner Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-950 to-transparent pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Radar Beacon Status */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/40 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Radar scanner sweep */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-transparent vfx-radar-sweep-scanner" />
            {/* Concentric Sonar Rings */}
            <div className="absolute w-8 h-8 rounded-full border border-emerald-400/40 vfx-radar-sonar-ring" />
            <div className="absolute w-4 h-4 rounded-full border border-emerald-400/60" />
            {/* Center Beacon */}
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 font-mono">
                CAMPUS INTELLIGENCE RADAR ACTIVE
              </span>
            </div>
            <p className="text-xs text-stone-300 font-medium mt-0.5">
              Live DAV Curriculum telemetry &amp; synced academic repository
            </p>
          </div>
        </div>

        {/* 4 Rolling Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full lg:w-auto">
          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono tracking-tight">
              {counts.books}+
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-stone-300 block uppercase">Textbooks</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-black text-rose-400 font-mono tracking-tight">
              {counts.sections}
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-stone-300 block uppercase">Sections</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono tracking-tight">
              {counts.aiHours}/7
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-stone-300 block uppercase">Rishi AI</span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono tracking-tight">
              {counts.scholars.toLocaleString()}+
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-stone-300 block uppercase">DAV Scholars</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// =========================================================================
// ANIMATION 4: FLOATING GOLDEN DAV MASCOT BOOK & CELEBRATION CHIME
// =========================================================================
function FloatingGoldenBookMascot({ onCelebrate }) {
  const [sparkles, setSparkles] = useState([]);

  const handleMascotClick = (e) => {
    onCelebrate();
    // Spawn floating sparkles
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 80
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 2200);
  };

  return (
    <div 
      onClick={handleMascotClick}
      className="relative cursor-pointer group shrink-0 select-none vfx-flying-book"
      title="Click to unleash Vedic celebration burst!"
    >
      {/* Outer Glowing Pulsing Aura */}
      <div 
        className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-300 opacity-75 group-hover:opacity-100 animate-spin" 
        style={{ animationDuration: '10s' }} 
      />

      {/* Golden Book Crest Box */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 p-2 border-2 border-amber-400/90 flex flex-col items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
        <img 
          src="/logo.png" 
          alt="Official DAV Logo Crest" 
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-stone-950 text-[9px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" />
          <span>DAV MOTTO</span>
        </div>
      </div>

      {/* Floating Vedic Flame */}
      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-stone-950 flex items-center justify-center shadow-lg animate-bounce">
        <Flame className="w-4 h-4 text-red-900 fill-red-800" />
      </div>

      {/* Stardust particles on click */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          className="absolute w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047] pointer-events-none vfx-stardust-sparkle"
        />
      ))}
    </div>
  );
}

// =========================================================================
// MAIN OVERVIEW HUB COMPONENT (SECTION 1)
// =========================================================================
export function SectionOverview({ currentUser, onSelectSection, onOpenPurchaseModal }) {
  const [clickedCardId, setClickedCardId] = useState(null);
  const [isSparkleActive, setIsSparkleActive] = useState(false);
  const [shockwaveCoord, setShockwaveCoord] = useState(null);

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
      description: 'The master directory and architectural dashboard for all verified academic sections. Jump directly to any section with one click and inspect live campus telemetry.'
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

  // ANIMATION 5: Radial Golden Shockwave Teleportation Ripple
  const handleCardClick = (id, event) => {
    if (event) {
      setShockwaveCoord({ x: event.clientX, y: event.clientY });
    }
    setClickedCardId(id);
    setTimeout(() => {
      setClickedCardId(null);
      setShockwaveCoord(null);
      onSelectSection(id);
    }, 320);
  };

  const handleTriggerSparkles = () => {
    setIsSparkleActive(true);
    setTimeout(() => setIsSparkleActive(false), 2200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbeb] via-[#fff7ed] to-[#f0f9ff] py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* ANIMATION 1: COSMIC STAR-MESH CANVAS & VEDIC AURORA ORBS */}
      <CosmicStarMeshCanvas />

      {/* Floating Vedic Aurora Light Beams & Multi-Layered Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-400/25 to-orange-500/20 blur-3xl pointer-events-none vfx-ambient-orb-gold" />
      <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-gradient-to-bl from-rose-500/20 to-red-600/15 blur-3xl pointer-events-none vfx-ambient-orb-ruby" />
      <div className="absolute bottom-10 left-1/3 w-[32rem] h-[32rem] rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-600/15 blur-3xl pointer-events-none vfx-ambient-orb-cyan" />
      <div className="absolute top-0 right-1/4 w-72 h-[120%] bg-gradient-to-b from-amber-300/15 via-transparent to-transparent pointer-events-none vfx-light-beam-sweep" />

      {/* ANIMATION 5: EXPANDING RADIAL SHOCKWAVE TELEPORT OVERLAY */}
      {shockwaveCoord && (
        <div 
          className="fixed pointer-events-none z-50 rounded-full vfx-teleport-shockwave-ring"
          style={{
            left: `${shockwaveCoord.x - 75}px`,
            top: `${shockwaveCoord.y - 75}px`,
            width: '150px',
            height: '150px'
          }}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* TOP CREST BANNER WITH ANIMATION 4 (FLOATING GOLDEN MASCOT) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white border border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle god-rays in banner */}
          <div className="vfx-god-rays opacity-40" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Animated DAV Crest & Vedic Flame */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              
              {/* ANIMATION 4: FLOATING GOLDEN MASCOT BOOK */}
              <FloatingGoldenBookMascot onCelebrate={handleTriggerSparkles} />

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
                onClick={(e) => handleCardClick(2, e)}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>Open Section 2 (Textbooks) →</span>
              </button>

              <button
                onClick={(e) => handleCardClick(11, e)}
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

        {/* ANIMATION 3: LIVE CAMPUS STATS & RADAR BEACON DECK */}
        <LiveCampusStatsRadarDeck />

        {/* 14 SECTIONS GRID WITH ANIMATION 2 (3D HOLOGRAPHIC TILT & LASER BEAM) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 animate-spin-slow" />
              <span>Explore All Verified Academic Sections</span>
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
              Interactive 3D Cards • Click any to teleport
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleSections.map((sec) => (
              <HolographicSectionCard
                key={sec.id}
                sec={sec}
                isCurrent={sec.id === 1}
                isBeingClicked={clickedCardId === sec.id}
                onClick={(e) => handleCardClick(sec.id, e)}
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
              onClick={(e) => handleCardClick(14, e)}
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
