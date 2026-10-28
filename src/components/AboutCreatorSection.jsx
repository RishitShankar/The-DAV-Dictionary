import React, { useState } from 'react';
import { 
  Award, User, Sparkles, Heart, ShieldCheck, Mail, MapPin, 
  BookOpen, Star, Crown, Code2, Terminal, Flame, TrendingUp, 
  Gamepad2, CheckCircle2, Target, Cpu, Layers, Copy, Check, 
  ExternalLink, ChevronRight, GraduationCap, Palette, Film, 
  Compass, Share2, Quote, ArrowUpRight, PartyPopper, MessageCircle,
  Phone, X, Send, Trophy, Rocket, Laptop, Lightbulb, Zap, HelpCircle,
  FileText, CheckSquare, ListOrdered, Sparkle
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
  const myEmailId = "headboyrishitshankar@gmail.com";
  
  // Official Links Provided for DAV Dictionary
  const myInstagramUrl = "https://www.instagram.com/dav_dictionary?vrfl=MWcwYmRoMWVyeWNtOA==";
  const myLinkedInUrl = "https://www.linkedin.com/in/rishit-shankar-05559b2bb";
  const myFacebookUrl = "https://www.facebook.com/share/1K3NutKTY6/";
  const mySnapchatUrl = "https://www.snapchat.com/add/dav_dictionary?share_id=PtOPLG5tAR8&locale=en-IN";
  const myPinterestUrl = "https://pin.it/7gVcr0dpk";
  const myXTwitterUrl = "https://x.com/Dav_Dictionary";
  const myYouTubeUrl = "https://youtube.com/@davdictionary?si=5FCxn4yecqP35l6O";
  const myGitHubUrl = "https://github.com/RishitShankar";
  const myTelegramUrl = "https://t.me/Dav_Dictionary";

  const summary100Lines = [
  "Full Name: Rishit Shankar (रीशीत शंकर), 14-year-old student leader and technology innovator.",
  "Current Academic Level: Class 8-D student at DAV School.",
  "Official School Identifier: Roll No. 25 in Class 8-D.",
  "Elected Designation: Head Boy of DAV School for Academic Session 2026–27.",
  "Leadership Selection: Unanimously appointed by Principal Anil Kumar and school administration based on moral integrity, academic brilliance, and discipline.",
  "Primary Responsibility: Chief representative and student advocate for all students from LKG up to Class 8.",
  "Morning Assembly Governance: Coordinates morning assembly order, national pledge, DAV anthem, and queue management.",
  "Student Welfare Advocacy: Champions student concerns and liaises with teachers and school administration.",
  "Inter-Class Mentorship: Guides junior students with academic habits, study schedules, and school rules.",
  "Campus Discipline Standard: Models promptness, perfect uniform presentation, and courteous speech.",
  "Conflict Resolution: Mediates peer disputes with emotional maturity, active listening, and fairness.",
  "Cultural Coordination: Leads student participation in Independence Day, Republic Day, and school festivals.",
  "Environmental Initiatives: Spearheads school tree-plantation and clean-campus awareness drives.",
  "Family Heritage: Eldest son in a deeply valued, supportive family residing in Muzaffarpur, Bihar.",
  "Father: Ashish Shankar (आशीष शंकर), chief mentor and pillar of dedication.",
  "Mother: Sarita Kumari (सरिता कुमारी), source of discipline, ethics, and moral strength.",
  "Younger Brother: Saharsh Shankar, enthusiastic companion in learning and technology.",
  "Extended Family: Resides with his beloved grandfather, embracing traditional family values.",
  "Hometown Roots: Proud resident and scholar of Muzaffarpur, Bihar, India.",
  "Institutional Loyalty: Deep reverence for the DAV education movement and Vedic philosophies.",
  "Overall Half-Yearly Aggregate: Achieved an outstanding 95% total score in Class 8 Half-Yearly Examinations.",
  "Sanskrit Century Scorer: Scored a perfect 80 out of 80 (100% Century Score) in Surabhi Sanskrit (संस्कृत सुरभि).",
  "Sanskrit Grammatical Mastery: Flawless execution of Dhatu Roop, Shabda Roop, Sandhi, and translation rules.",
  "Hindi Literature Distinction: Scored 79 out of 80 (98.75%) in Hindi Gyan Sagar & Abhyas Sagar (ज्ञान एवं अभ्यास सागर).",
  "Hindi Composition Skills: Exceptional prose comprehension, poetic analysis, and essay writing.",
  "Social Science Excellence: Scored 77 out of 80 (96.25%) in SST (We and Our World).",
  "Historical & Civic Analysis: Deep understanding of the Indian Freedom Movement, Constitution, and resources.",
  "Science & Technology Distinction: Scored 77 out of 80 (96.25%) in Science & Technology (The Living World).",
  "Scientific Methodology: In-depth grasp of Physics laws, Chemical transformations, and Biological systems.",
  "Mathematics Distinction: Scored 74 out of 80 (92.5%) in Secondary Mathematics.",
  "Mathematical Problem Solving: Rigorous mastery of algebraic factorization, linear equations, and geometry.",
  "English Course Performance: Scored 69 out of 80 (86.25%) in English Literature & Practice.",
  "English Language Fluency: Articulate vocabulary, active grammar control, and creative writing.",
  "Consistent Study Regimen: Maintains a structured 4-hour daily revision plan balancing all 6 core subjects.",
  "Conceptual Over Rote: Prioritizes foundational conceptual clarity over superficial memorization.",
  "PT-1 Overall Aggregate: Scored 139.5 out of 150 (93% total) in the First Periodic Test (PT-1).",
  "PT-1 Science Perfection: Scored a perfect 25 out of 25 (100% Century) in Science PT-1.",
  "PT-1 Mathematics Excellence: Scored 24.5 out of 25 (98%) in Mathematics PT-1.",
  "PT-1 Social Science Mastery: Scored 24 out of 25 (96%) in Social Science (SST) PT-1.",
  "PT-1 Sanskrit Command: Scored 23 out of 25 (92%) in Sanskrit PT-1.",
  "PT-1 Hindi Score: Scored 22.5 out of 25 (90%) in Hindi PT-1.",
  "PT-1 English Score: Scored 20.5 out of 25 (82%) in English PT-1.",
  "Exam Stamina: Demonstrates rapid speed and meticulous double-checking across all timed tests.",
  "Error Analysis Practice: Systematically notes down every test error in an error journal to prevent repetition.",
  "Peer Study Groups: Regularly organizes study sessions to help classmates prepare for upcoming tests.",
  "Physics Wallah National Scholarship Test: Competed in the prestigious nationwide PWNSAT examination.",
  "PWNSAT Percentile: Achieved a top-ranking 98th Percentile across all national participants.",
  "PWNSAT Gold Medal: Honored with a verified Gold Medal for national academic distinction.",
  "Scientific Aptitude: Solved advanced multi-step logical, physical, and quantitative questions.",
  "National Benchmarking: Competed against tens of thousands of top students from across India.",
  "STEM Problem Solving: Natural affinity for physics mechanics, scientific reasoning, and mathematical logic.",
  "Pressure Management: Thrives in high-stakes competitive environments through calm mental composure.",
  "Time Allocation Mastery: Allocates exact time budgets per section during national-level competitive tests.",
  "Academic Ambition: Prepares for state and national Science and Mathematics Olympiads.",
  "School Honor: Brought national acclaim and recognition to DAV School.",
  "DAV Cluster 3 Gold Medalist: Won the Gold Medal in the official DAV Cluster 3 Chess Championship.",
  "Competitive Experience: Played and logged over 1,000+ competitive chess matches on online and board platforms.",
  "Primary Repertoire (White): 1.e4 King’s Pawn Opening with sharp tactical developments and center control.",
  "Primary Repertoire (Black): Sicilian Defense and solid classical defenses against 1.d4 and 1.e4.",
  "Calculation Depth: Regularly calculates 3 to 4 moves ahead, evaluating piece tension and King safety.",
  "Blunder Prevention: Adheres to the strict habit of verifying opponent candidate checks before every move.",
  "Endgame Technique: Fluid understanding of pawn promotion, King opposition, and Rook endgames.",
  "Time Control Versatility: Proficient across Rapid (10m), Blitz (3m/5m), and Classical tournament formats.",
  "Resilience in Defeat: Analyzes lost game PGNs objectively to extract structural and tactical lessons.",
  "Strategic Cross-Pollination: Connects chess piece coordination with real-life team leadership and code design.",
  "DAV Sportsmanship: Treats every competitor with dignity and respect, embodying DAV sports ethos.",
  "Cricket Analytics Passion: Avid student of cricket match data, required run rates, and tactical statistics.",
  "Probability Calculation: Studies match win percentages, boundary frequency, and bowling economy rates.",
  "Mental Concentration: Sustains hours of continuous deep focus without losing analytical stamina.",
  "Physical Stamina: Engages in daily physical exercise to complement long hours of intellectual work.",
  "Full-Stack Developer: Self-taught modern software engineer building real-world web applications.",
  "Three Production Apps: Conceptualized, engineered, and deployed 3 complete full-stack web applications.",
  "Flagship App 1: The DAV Dictionary — comprehensive digital reference campus serving thousands of students.",
  "Flagship App 2: Rishi AI Engine — custom-engineered dual-mode AI companion for curriculum doubt solving.",
  "Flagship App 3: Faculty & Student Master OS — real-time classroom coordination and student performance portal.",
  "Frontend Architecture: Built with React 18, Vite, and modular component hierarchy.",
  "Styling Engine: Designed with Tailwind CSS featuring customized color schemes and responsive layouts.",
  "Zero-Blur Rendering: Engineered crystal-clear UI rendering without distracting blur filters.",
  "Real-Time WebRTC Calling: Integrated live peer-to-peer audio and video communication channels for study rooms.",
  "Cloud Database Integration: Connected to Supabase Cloud PostgreSQL with row-level security policies.",
  "Audio Synthesis: Integrated Web Audio API to create authentic fanfare sound chimes on user milestones.",
  "Interactive Graphic UI: Created 3D typography, particle celebration popups, and animated score bars.",
  "Cross-Device Compatibility: Fully optimized for Android smartphones, tablets, Chromebooks, and PCs.",
  "Clean Code Hygiene: Maintains modular, well-documented, and error-tolerant JavaScript/React codebases.",
  "Production Deployment: Manages live cloud deployments with continuous integration and automated builds.",
  "Mission Statement: Dedicated to The DAV Dictionary Serving DAVians across India.",
  "LKG to Class 8 Coverage: Digitized access to DAV textbooks, chapter summaries, and practice materials.",
  "Curriculum Solutions: Verified solutions for textbook exercises across Science, Math, SST, Hindi, and Sanskrit.",
  "Exam Preparation Hub: Previous year questions (PYQs), model question papers, and sample answer keys.",
  "24/7 AI Guidance: Rishi AI answers student questions anytime, reducing dependency on external tuitions.",
  "Multimedia Learning: Embedded video explanations that break down challenging textbook chapters simply.",
  "Educational Equity: Ensures every student has equal access to high-quality academic tools regardless of resources.",
  "Continuous Enhancement: Rapidly fixes bugs and adds new student-requested features within hours.",
  "Student Empowerment: Designed by a student for students to make learning delightful and stress-free.",
  "Permanent Legacy: Created as a lasting technological contribution to DAV School.",
  "Core Guiding Principle: Combines rigorous personal discipline, academic brilliance, and service to society.",
  "Veneration of Teachers: Holds profound gratitude and respect for school mentors, teachers, and Principal Anil Kumar.",
  "Integrity and Humility: Stays grounded, helpful to peers, and dedicated to continuous self-improvement.",
  "Long-Term Ambition: Aspires to lead cutting-edge computer science and artificial intelligence advancements for India.",
  "Commitment to Excellence: Dedicated to representing DAV School with pride, honor, and brilliance."
];

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
    const bioText = `Rishit Shankar (रीशीत शंकर) • Age 14 • Student Leader, Head Boy of DAV School (Class 8-D, Roll No. 25). Founder & Creator of The DAV Dictionary (serving DAVians) and Rishi AI. Gold Medalist in DAV Cluster 3. 98 Percentile Gold Medalist in PWNSAT (Physics Wallah National Scholarship Test). Academic Excellence: 95% in Class 8 Half-Yearly (Sanskrit 80/80 Century Scorer, Hindi 79/80, SST 77/80, Science 77/80, Math 74/80, English 69/80) & 93% in First Periodic Test PT-1 (Math 24.5/25, Science 25/25, SST 24/25, Sanskrit 23/25, Hindi 22.5/25, English 20.5/25). Master of 1,000+ competitive chess games. Built 3 full-stack applications. WhatsApp: +91 94700 33984 • Call: +91 80922 61750.`;
    navigator.clipboard.writeText(bioText);
    setCopiedBio(true);
    setTimeout(() => setCopiedBio(false), 2000);
  };

  // Birthday / Celebration Party Poppers Graphic Motion Animation
  const triggerCelebrationParty = () => {
    document.body.classList.remove('animate-screenShake');
    void document.body.offsetWidth;
    document.body.classList.add('animate-screenShake');
    setTimeout(() => {
      document.body.classList.remove('animate-screenShake');
    }, 700);

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const notes = [523.25, 659.25, 783.99, 1046.50];
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

    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#eab308'];
    const emojis = ['🎉', '🎊', '✨', '🎈', '⭐', '🥇', '👑', '🏆'];
    const newPoppers = Array.from({ length: 65 }).map((_, i) => ({
      id: Date.now() + i,
      x: 50 + (Math.random() - 0.5) * 85,
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
    { id: 'story', label: 'Identity & Leadership', icon: Crown, color: 'text-amber-500', badge: 'Head Boy Journey' },
    { id: 'academics', label: 'Academic & Half-Yearly', icon: GraduationCap, color: 'text-rose-500', badge: '95% Half-Yearly & 93% PT-1' },
    { id: 'tech', label: 'Coding Tech & Stack', icon: Code2, color: 'text-cyan-500', badge: 'Serving DAVians' },
    { id: 'creative', label: 'Design 3D & Video', icon: Palette, color: 'text-purple-500', badge: 'How I Built DAV Dictionary' },
    { id: 'gaming_chess', label: 'Chess & Strategy', icon: Trophy, color: 'text-emerald-500', badge: '1000+ Games & Cluster 3 Gold' },
    { id: 'about_me', label: 'About Me (100-Line Summary)', icon: User, color: 'text-amber-600', badge: 'Complete 100-Line Bio' }
  ];

  return (
    <div className="section11-warm-bg min-h-screen py-8 sm:py-12 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
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
            <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-stone-950 px-6 sm:px-10 py-5 rounded-3xl shadow-2xl border-4 border-amber-600 animate-pulse text-center max-w-lg mx-4">
              <div className="text-2xl sm:text-3xl font-black flex items-center justify-center gap-2">
                <span>🎉</span>
                <span className="text-3d-mega text-white">Rishit Shankar</span>
                <span>🎊</span>
              </div>
              <p className="text-xs sm:text-sm font-black text-stone-900 mt-1">
                Gold Medalist in DAV Cluster 3 • Student Leader &amp; Head Boy • 95% Class 8 Half-Yearly (Sanskrit Century Scorer 80/80) • 98%ile PWNSAT Gold Medalist • Founder of The DAV Dictionary!
              </p>
            </div>
          </div>
        )}

        {/* Top Banner Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse shadow-md shadow-amber-400/50" />
            <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-amber-900 text-3d-amber">
              Section 11 • Creator Biography &amp; Vision
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={triggerCelebrationParty}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 text-xs font-black shadow-lg shadow-amber-500/25 transition cursor-pointer btn-interactive animate-glow-gold hover:scale-105"
            >
              <PartyPopper className="w-4 h-4 animate-float-icon" />
              <span>Celebrate Rishit! 🎉</span>
            </button>
            <button
              onClick={handleCopyBio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 hover:bg-white text-stone-900 text-xs font-bold border-2 border-amber-300/80 transition shadow-md shadow-amber-200/50 cursor-pointer btn-interactive hover:border-amber-400"
            >
              {copiedBio ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-700" />}
              <span>{copiedBio ? 'Bio Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Main Profile Showcase Card */}
        <div className="bg-gradient-to-b from-stone-900 via-slate-900 to-stone-950 rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden relative mb-10 card-interactive card-super-interactive border-halo-gold">
          
          {/* Subtle Glow Highlights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-orange-600/15 rounded-full pointer-events-none" />

          {/* Hero Section */}
          <div className="p-6 sm:p-10 relative z-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              
              {/* Real Photograph with Glowing Gold Border */}
              <div className="relative group shrink-0">
                <div 
                  onClick={triggerCelebrationParty}
                  title="Click to celebrate Rishit Shankar!"
                  className="relative max-w-[260px] sm:max-w-[290px] rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/30 bg-stone-950 p-1 flex items-center justify-center cursor-pointer hover:border-amber-300 transition-all hover:scale-102"
                >
                  <img 
                    src="/rishit_shankar.jpg" 
                    alt="Rishit Shankar - Head Boy & Creator" 
                    className="w-full h-auto max-h-[380px] object-contain rounded-2xl"
                    onError={(e) => {
                      if (!e.target.dataset.triedBackup) {
                        e.target.dataset.triedBackup = 'true';
                        e.target.src = '/founder_image_forever.jpeg';
                        return;
                      }
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-52 h-52 bg-gradient-to-tr from-stone-900 to-amber-900 text-amber-300 font-black text-5xl items-center justify-center">
                    RS
                  </div>
                </div>

                {/* Head Boy Floating Badge */}
                <button
                  onClick={triggerCelebrationParty}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 whitespace-nowrap border-2 border-stone-950 hover:scale-105 transition cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 fill-stone-950" />
                  <span>Head Boy • 2026–27</span>
                </button>
              </div>

              {/* Profile Intro & Title with 3D Typography */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-2">
                  <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight text-3d-mega">
                    Rishit Shankar
                  </h1>
                  <span className="text-xl sm:text-3xl font-bold text-amber-300 font-serif">
                    (रीशीत शंकर)
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-950/90 text-red-300 text-xs font-bold border border-red-700/60 shadow-xs">
                    Class 8-D • Roll No. 25
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/40 flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    Student Leader &amp; Head Boy
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-orange-500/20 text-orange-300 text-xs font-black border border-orange-400/40 flex items-center gap-1.5">
                    <Trophy className="w-3.5 h-3.5 text-orange-400" />
                    Gold Medalist in DAV Cluster 3
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-black border border-emerald-400/40 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    PWNSAT 98%ile Gold Medalist
                  </span>
                </div>

                <p className="text-sm sm:text-base font-bold text-amber-200/95 mb-3">
                  Head Boy of DAV School • Founder of The DAV Dictionary
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6">
                  Student leader, innovator, and creator dedicated to serving DAVians across India. Architected <strong>The DAV Dictionary</strong> and <strong>Rishi AI</strong>, achieved <strong>95% in Class 8 Half-Yearly Exams</strong> (with 80/80 in Sanskrit), <strong>93% in First Periodic Test (PT-1)</strong>, Gold Medalist in DAV Cluster 3, and 98 percentile Gold Medalist in PWNSAT conducted by Physics Wallah.
                </p>

                {/* Key Quick Facts Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700 text-stone-200 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Muzaffarpur, Bihar</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 font-bold">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Gold Medalist in DAV Cluster 3</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 font-bold">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>95% Half-Yearly • 93% PT-1</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>The DAV Dictionary Serving DAVians</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center gap-1.5 font-bold">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Made 3 Full-Stack Web Apps</span>
                  </div>
                </div>

                {/* Direct Contact & Socials Bar */}
                <div className="mt-5 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-center lg:justify-start gap-2">
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
                    href={myYouTubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <YouTubeLogo className="w-3.5 h-3.5 fill-current" />
                    <span>YouTube</span>
                  </a>

                  <a
                    href={myXTwitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-stone-700/40 hover:bg-black text-stone-200 hover:text-white border border-stone-600 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <XTwitterLogo className="w-3.5 h-3.5 fill-current" />
                    <span>X</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

          {/* 6 Metric Highlight Cards - 3D REMOVED ON 95% AND 80/80 AS EXPLICITLY DIRECTED */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-stone-800 bg-stone-950/80 p-4 sm:p-6 gap-3">
            
            {/* Card 1: 95% Total - CLEAN NON-3D TEXT */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-500/50 text-center hover:scale-103 transition shadow-md">
              <div className="text-xl sm:text-2xl font-black text-amber-400">95%</div>
              <div className="text-[11px] font-bold text-stone-200 mt-0.5">Class 8 Half-Yearly</div>
              <div className="text-[10px] text-amber-300 font-semibold">Total Aggregate</div>
            </div>

            {/* Card 2: 93% PT-1 */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-emerald-500/40 text-center hover:scale-103 transition shadow-md">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">93%</div>
              <div className="text-[11px] font-bold text-stone-200 mt-0.5">First Periodic (PT-1)</div>
              <div className="text-[10px] text-emerald-300 font-semibold">139.5 / 150 Score</div>
            </div>

            {/* Card 3: 80 / 80 Sanskrit Century Scorer - CLEAN NON-3D TEXT */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-amber-500/50 bg-gradient-to-b from-amber-500/15 to-stone-900/80 text-center hover:scale-103 transition shadow-md">
              <div className="text-xl sm:text-2xl font-black text-amber-300">80 / 80</div>
              <div className="text-[11px] font-bold text-stone-100 mt-0.5">Sanskrit Century Scorer</div>
              <div className="text-[10px] text-amber-400 font-bold">Surabhi Sanskrit (100%)</div>
            </div>

            {/* Card 4: 79 / 80 Hindi */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-orange-500/40 text-center hover:scale-103 transition shadow-md">
              <div className="text-xl sm:text-2xl font-black text-orange-400">79 / 80</div>
              <div className="text-[11px] font-bold text-stone-200 mt-0.5">Hindi Literature</div>
              <div className="text-[10px] text-stone-400">Gyan &amp; Abhyas Sagar</div>
            </div>

            {/* Card 5: DAV Cluster 3 Gold Medalist */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-purple-500/40 text-center hover:scale-103 transition shadow-md">
              <div className="text-lg sm:text-xl font-black text-purple-300">Gold Medal</div>
              <div className="text-[11px] font-bold text-stone-200 mt-0.5">DAV Cluster 3</div>
              <div className="text-[10px] text-purple-400 font-semibold">Chess Champion</div>
            </div>

            {/* Card 6: PWNSAT 98%ile */}
            <div className="p-3.5 rounded-2xl bg-stone-900/80 border border-cyan-500/40 bg-gradient-to-b from-cyan-500/10 to-stone-900/80 text-center hover:scale-103 transition shadow-md">
              <div className="text-xl sm:text-2xl font-black text-cyan-300">98 %ile</div>
              <div className="text-[11px] font-bold text-stone-200 mt-0.5">PWNSAT Exam</div>
              <div className="text-[10px] text-cyan-400 font-bold">Gold Medalist</div>
            </div>
          </div>

        </div>

        {/* Navigation Tabs - Styled in 3D Interactive Design */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-amber-100/60 p-2 rounded-2xl border-2 border-amber-300/80 shadow-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[140px] py-3 px-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/30 font-black scale-102 border-2 border-amber-600'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : tab.color}`} />
                <span className="text-xs sm:text-sm whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT PANELS - WARM CREATIVE YELLOWISH-WHITE PALETTE */}

        {/* 1. IDENTITY & LEADERSHIP: HOW I BECAME HEAD BOY */}
        {activeTab === 'story' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-md">
                  <Crown className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-amber-950 text-3d-amber">
                    Identity &amp; Leadership
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-800">
                    The Authentic Story of How I Became Head Boy of DAV School
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-300/80 mb-6">
                <h4 className="text-lg font-black text-stone-900 mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  <span>The Journey to Becoming Head Boy</span>
                </h4>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  Becoming the **Head Boy of DAV School** was not an overnight occurrence, but the result of relentless discipline, academic sincerity, and steadfast dedication to school values. From early classes through Class 8-D, Rishit proved himself through unwavering respect for teachers, helping fellow students understand difficult concepts, and actively assisting school coordinators during morning assemblies, functions, and inter-class events.
                </p>
                <p className="text-sm text-stone-700 leading-relaxed mb-4">
                  When the student council selection commenced for the academic session 2026–27, the school administration and Principal Anil Kumar evaluated student candidates on character, academic performance (95% Half-Yearly aggregate), leadership composure, and trustworthiness. Rishit stood out as a role model who bridged academic rigor with technology and moral responsibility.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-amber-200">
                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-center">
                    <div className="text-xs font-black text-amber-900">1. Student Representation</div>
                    <div className="text-[11px] text-stone-600 mt-1">Voice of every DAVian from LKG to Class 8</div>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-center">
                    <div className="text-xs font-black text-amber-900">2. Campus Discipline</div>
                    <div className="text-[11px] text-stone-600 mt-1">Assembly oversight &amp; peer mentorship</div>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-center">
                    <div className="text-xs font-black text-amber-900">3. Digital Empowerment</div>
                    <div className="text-[11px] text-stone-600 mt-1">Creator of The DAV Dictionary platform</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-amber-100/40 border border-amber-300/70">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-amber-600" />
                    Major Honors &amp; Leadership Titles
                  </div>
                  <h4 className="font-black text-stone-900 text-base mb-2">Gold Medalist in DAV Cluster 3</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Recognized as a Student Leader, Head Boy, and Founder of The DAV Dictionary. Gold Medalist in the official DAV Cluster 3 Chess Championship, setting an example of excellence in both competitive sports and organizational leadership.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300/70">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Physics Wallah National Scholarship Test
                  </div>
                  <h4 className="font-black text-stone-900 text-base mb-2">98 Percentile PWNSAT Gold Medalist</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Scored in the top 98th percentile nationwide in the prestigious PWNSAT test conducted by Physics Wallah, securing a national Gold Medal for scientific aptitude and logical reasoning.
                  </p>
                </div>
              </div>

              {/* Family Heritage */}
              <div className="p-5 rounded-2xl bg-white/95 border border-amber-200">
                <h4 className="font-black text-stone-900 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  Family Roots &amp; Support System
                </h4>
                <div className="text-xs text-stone-700">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-600">
                    <li>• Father: <strong className="text-stone-900">Ashish Shankar (आशीष शंकर)</strong></li>
                    <li>• Mother: <strong className="text-stone-900">Sarita Kumari (सरिता कुमारी)</strong></li>
                    <li>• Younger Brother: <strong className="text-stone-900">Saharsh Shankar</strong></li>
                    <li>• Grandfather residing with the family in Muzaffarpur, Bihar</li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. ACADEMIC & HALF-YEARLY: EXACT VERIFIED MARKS WITH ENGLISH (69/80) */}
        {activeTab === 'academics' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 text-3d-amber">
                    Academic &amp; Half-Yearly
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-rose-700">
                    Class 8 Half-Yearly (95% Total across 6 Subjects) &amp; First Periodic Test PT-1 (93% Total)
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                Rishit maintains top-tier academic rigor with verified marks across DAV curriculum examinations, combining mastery in Vedic Sanskrit, scientific theory, mathematical problem solving, social science, and languages.
              </p>

              {/* SECTION A: CLASS 8 HALF-YEARLY EXAMS (95% ACROSS 6 SUBJECTS) */}
              <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white/95 border-2 border-amber-300/80 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <h4 className="text-base sm:text-lg font-black text-stone-900">
                      Class 8 Half-Yearly Examination (All 6 Subjects)
                    </h4>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black shadow-xs">
                    95% Aggregate (456 / 480)
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Sanskrit 80/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        Sanskrit (संस्कृत सुरभि) — Century Scorer!
                      </span>
                      <span className="text-amber-800 font-black">80 / 80 (100% Perfect Century Score)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>

                  {/* Hindi 79/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        Hindi (ज्ञान सागर एवं अभ्यास सागर)
                      </span>
                      <span className="text-orange-800 font-black">79 / 80 (98.75%)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full" style={{ width: '98.75%' }} />
                    </div>
                  </div>

                  {/* SST 77/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        Social Science - SST (We and Our World)
                      </span>
                      <span className="text-purple-800 font-black">77 / 80 (96.25%)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: '96.25%' }} />
                    </div>
                  </div>

                  {/* Science 77/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        Science &amp; Technology (The Living World)
                      </span>
                      <span className="text-emerald-800 font-black">77 / 80 (96.25%)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '96.25%' }} />
                    </div>
                  </div>

                  {/* Mathematics 74/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                        Mathematics (Secondary Mathematics)
                      </span>
                      <span className="text-cyan-800 font-black">74 / 80 (92.5%)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '92.5%' }} />
                    </div>
                  </div>

                  {/* English 69/80 */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-stone-800 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        English (English Literature &amp; Practice)
                      </span>
                      <span className="text-blue-800 font-black">69 / 80 (86.25%)</span>
                    </div>
                    <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden border border-amber-200">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '86.25%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: FIRST PERIODIC TEST PT-1 (93%) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white/95 border-2 border-emerald-300/80 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <h4 className="text-base sm:text-lg font-black text-stone-900">
                      First Periodic Exam (PT-1)
                    </h4>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-xs">
                    93% Total (139.5 / 150)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">Science</div>
                    <div className="text-lg font-black text-emerald-700">25 / 25</div>
                    <div className="text-[10px] text-emerald-800 font-bold">100% Perfect</div>
                  </div>

                  <div className="p-3 bg-cyan-50/70 rounded-xl border border-cyan-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">Mathematics</div>
                    <div className="text-lg font-black text-cyan-700">24.5 / 25</div>
                    <div className="text-[10px] text-cyan-800 font-bold">98%</div>
                  </div>

                  <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">SST</div>
                    <div className="text-lg font-black text-purple-700">24 / 25</div>
                    <div className="text-[10px] text-purple-800 font-bold">96%</div>
                  </div>

                  <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">Sanskrit</div>
                    <div className="text-lg font-black text-amber-700">23 / 25</div>
                    <div className="text-[10px] text-amber-800 font-bold">92%</div>
                  </div>

                  <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">Hindi</div>
                    <div className="text-lg font-black text-orange-700">22.5 / 25</div>
                    <div className="text-[10px] text-orange-800 font-bold">90%</div>
                  </div>

                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-center">
                    <div className="text-[11px] font-bold text-stone-600">English</div>
                    <div className="text-lg font-black text-blue-700">20.5 / 25</div>
                    <div className="text-[10px] text-blue-800 font-bold">82%</div>
                  </div>
                </div>
              </div>

              {/* Competitive Exam Banner */}
              <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-stone-950" />
                  <div>
                    <h5 className="font-black text-base">Physics Wallah National Scholarship Test (PWNSAT)</h5>
                    <p className="text-xs font-bold text-stone-900">National 98th Percentile • Gold Medalist</p>
                  </div>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-stone-950 text-amber-300 text-xs font-black">
                  Verified Gold Medal
                </span>
              </div>

            </div>
          </div>
        )}

        {/* 3. CODING TECH & STACK: THE DAV DICTIONARY SERVING DAVIANS */}
        {activeTab === 'tech' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 text-3d-amber">
                    Coding Tech &amp; Stack
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-cyan-800">
                    The DAV Dictionary Serving DAVians • Made 3 Full-Stack Web Apps
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                Rishit engineers real-world, high-performance web applications specifically designed to solve learning bottlenecks for students across DAV schools in India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-white/95 border border-cyan-200 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold mb-3">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">App 1: The Flagship</div>
                  <h4 className="font-black text-stone-900 text-base mb-1.5">The DAV Dictionary</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    The all-in-one digital reference campus serving DAVians across LKG to Class 8 with textbooks, solutions, PYQs, and interactive study modules.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/95 border border-emerald-200 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">App 2: Artificial Intelligence</div>
                  <h4 className="font-black text-stone-900 text-base mb-1.5">Rishi AI Engine</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Custom dual-mode AI companion engineered with DAV curriculum grounding and global knowledge to clear student doubts 24/7.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white/95 border border-purple-200 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">App 3: Campus Management</div>
                  <h4 className="font-black text-stone-900 text-base mb-1.5">Faculty &amp; Student OS</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Role-based portal with real-time peer communications, WebRTC audio-video channels, and student performance dashboards.
                  </p>
                </div>
              </div>

              {/* Full-Stack Live Stack Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-stone-900 to-slate-900 text-white shadow-xl border border-amber-500/30">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h5 className="font-black text-lg text-amber-300">Modern Production Stack</h5>
                    <p className="text-xs text-slate-300">React 18 • Vite • Tailwind CSS • WebRTC • Supabase Cloud</p>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-cyan-400 text-stone-950 text-xs font-black">
                    Made 3 Apps
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                    <strong className="text-cyan-300 block mb-0.5">Frontend</strong>
                    <span className="text-slate-300">React 18 &amp; Vite</span>
                  </div>
                  <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                    <strong className="text-emerald-300 block mb-0.5">Real-Time</strong>
                    <span className="text-slate-300">WebRTC Audio/Video</span>
                  </div>
                  <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                    <strong className="text-amber-300 block mb-0.5">AI Engine</strong>
                    <span className="text-slate-300">Rishi AI Companion</span>
                  </div>
                  <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700">
                    <strong className="text-purple-300 block mb-0.5">Mission</strong>
                    <span className="text-slate-300">Serving DAVians</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 4. DESIGN 3D & VIDEO: HOW I MADE THE DAV DICTIONARY */}
        {activeTab === 'creative' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Palette className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 text-3d-amber">
                    Design 3D &amp; Video
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-purple-800">
                    How I Made The DAV Dictionary from Scratch
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                Rather than generic tutorials or personal hobby files, Rishit applied all his design, UI/UX architecture, visual branding, and interactive media skills to build **The DAV Dictionary** into an authentic digital campus.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                
                {/* Step 1: Ideation & Architecture */}
                <div className="p-5 rounded-2xl bg-white/95 border-2 border-purple-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black mb-3">
                      1
                    </div>
                    <h4 className="font-black text-stone-900 text-base mb-2">Ideation &amp; Need</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Identified that DAV students had no centralized platform for textbooks, answers, and syllabus guidance. Created the concept of 11 structured sections to cover every aspect of student life.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-100 text-[11px] font-bold text-purple-800">
                    Built for DAVians across India
                  </div>
                </div>

                {/* Step 2: UI/UX & Interactive Design */}
                <div className="p-5 rounded-2xl bg-white/95 border-2 border-amber-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black mb-3">
                      2
                    </div>
                    <h4 className="font-black text-stone-900 text-base mb-2">3D UI &amp; Graphic System</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Designed custom typography, responsive card containers, festive celebration fanfare poppers, and crystal-clear contrast to make learning exciting and intuitive on both mobile and PC.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-amber-100 text-[11px] font-bold text-amber-800">
                    Interactive animations &amp; visual depth
                  </div>
                </div>

                {/* Step 3: Video & Audio Integration */}
                <div className="p-5 rounded-2xl bg-white/95 border-2 border-rose-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black mb-3">
                      3
                    </div>
                    <h4 className="font-black text-stone-900 text-base mb-2">Multimedia &amp; Video Hub</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Curated chapter explanation videos, integrated real-time WebRTC audio-video calling for peer study, and embedded interactive audio chimes for achievement milestones.
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] font-bold text-rose-800">
                    Seamless multimedia learning
                  </div>
                </div>

              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300">
                <h5 className="font-black text-stone-900 text-sm mb-1.5">The Creative Vision Behind The DAV Dictionary</h5>
                <p className="text-xs text-stone-600 leading-relaxed">
                  "I wanted every student in DAV School and every DAV school across Bihar and India to open our site and feel inspired. A website should not be a static textbook; it should have heartbeat, celebration, interactive 3D colors, and intelligent companions to help you grow every single day."
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 5. CHESS & STRATEGY: 1000+ GAMES & DAV CLUSTER 3 GOLD */}
        {activeTab === 'gaming_chess' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 text-3d-amber">
                    Chess &amp; Strategy
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-emerald-800">
                    1,000+ Games Played • Gold Medalist in DAV Cluster 3
                  </p>
                </div>
              </div>

              <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                Strategic calculation, blunder prevention, and psychological discipline on the 64 squares define Rishit's approach to problem solving in academics and software architecture.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                
                {/* Chess Mastery Card */}
                <div className="p-6 rounded-2xl bg-white/95 border-2 border-emerald-300/80 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-black text-stone-900 text-lg flex items-center gap-2">
                      <span>♟️ Chess Mastery</span>
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-xs">
                      1,000+ Matches
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Experienced competitive chess player with over 1,000 registered games. Specialize in tactical foresight, pawn structure analysis, central dominance, and rapid endgame conversions (castling, promotion, and king safety).
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                    "On the board, every move has consequences. Calculate two steps deeper, eliminate blunders, and maintain composure under time pressure."
                  </div>
                </div>

                {/* DAV Cluster 3 Gold Medalist Card */}
                <div className="p-6 rounded-2xl bg-white/95 border-2 border-amber-300/80 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-black text-stone-900 text-lg flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-amber-600" />
                      <span>DAV Cluster 3 Gold</span>
                    </h4>
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow-xs">
                      Gold Medalist
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Gold Medalist in the official DAV Cluster 3 Chess Championship. Demonstrated tactical superiority and positional patience against top student competitors across the zone.
                  </p>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                    Combines competitive sportsmanship with student leadership across DAV School.
                  </div>
                </div>

              </div>

              {/* Cricket & Data Strategy */}
              <div className="p-5 rounded-2xl bg-white/95 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-black text-stone-900 text-sm">Cricket Analytics &amp; Strategic Probabilities</h5>
                    <p className="text-xs text-stone-600">Applies statistical modeling to IPL run rates, bowling variations, and team tactics.</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                  Analytical Mindset
                </span>
              </div>

            </div>
          </div>
        )}

        {/* 6. ABOUT ME: COMPREHENSIVE 100-LINE STRUCTURED SUMMARY */}
        {activeTab === 'about_me' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="card-warm-3d rounded-3xl p-6 sm:p-10 border-2 border-amber-300/70 shadow-xl">
              
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 flex items-center justify-center shadow-md font-black">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-amber-950 text-3d-amber">
                      About Me (100-Line Summary)
                    </h3>
                    <p className="text-xs sm:text-sm font-bold text-amber-800">
                      Complete, Verified, Line-by-Line Biography of Rishit Shankar
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-black shadow-xs">
                    100 Verified Facts
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(summary100Lines.join('\n'));
                      alert('100-line summary copied to clipboard!');
                    }}
                    className="px-3 py-1 rounded-xl bg-white hover:bg-stone-50 border border-amber-300 text-xs font-bold text-stone-800 transition flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Copy All 100 Lines</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6 bg-amber-50/80 p-4 rounded-2xl border border-amber-200">
                This comprehensive 100-line record chronologically details Rishit Shankar's school leadership as Head Boy of DAV School, top examination scores (95% Half-Yearly, 80/80 Sanskrit, 93% PT-1), national Gold Medal in PWNSAT (98th percentile), DAV Cluster 3 Chess championship, full-stack software development of The DAV Dictionary serving DAVians, and life principles.
              </p>

              {/* 100-Line Scrollable List with Number Badges */}
              <div className="space-y-2 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar">
                {summary100Lines.map((lineText, index) => {
                  const lineNum = String(index + 1).padStart(3, '0');
                  
                  // Category color tagging
                  let badgeBg = 'bg-stone-100 text-stone-700 border-stone-200';
                  let itemBorder = 'border-amber-200/60 bg-white/90';
                  
                  if (index < 20) {
                    // Identity & Leadership
                    badgeBg = 'bg-amber-100 text-amber-900 border-amber-300';
                    itemBorder = 'border-amber-200 bg-amber-50/40';
                  } else if (index < 35) {
                    // Half-Yearly Marks
                    badgeBg = 'bg-rose-100 text-rose-900 border-rose-300';
                    itemBorder = 'border-rose-200 bg-rose-50/30';
                  } else if (index < 45) {
                    // PT-1 Marks
                    badgeBg = 'bg-emerald-100 text-emerald-900 border-emerald-300';
                    itemBorder = 'border-emerald-200 bg-emerald-50/30';
                  } else if (index < 55) {
                    // PWNSAT
                    badgeBg = 'bg-cyan-100 text-cyan-900 border-cyan-300';
                    itemBorder = 'border-cyan-200 bg-cyan-50/30';
                  } else if (index < 70) {
                    // Chess Cluster 3
                    badgeBg = 'bg-purple-100 text-purple-900 border-purple-300';
                    itemBorder = 'border-purple-200 bg-purple-50/30';
                  } else if (index < 85) {
                    // Tech Stack
                    badgeBg = 'bg-teal-100 text-teal-900 border-teal-300';
                    itemBorder = 'border-teal-200 bg-teal-50/30';
                  } else if (index < 95) {
                    // The DAV Dictionary
                    badgeBg = 'bg-orange-100 text-orange-900 border-orange-300';
                    itemBorder = 'border-orange-200 bg-orange-50/30';
                  } else {
                    // Values
                    badgeBg = 'bg-amber-200 text-amber-950 border-amber-400';
                    itemBorder = 'border-amber-300 bg-amber-100/40';
                  }

                  return (
                    <div 
                      key={index} 
                      className={`p-3 rounded-xl border flex items-start gap-3 transition-all hover:translate-x-1 ${itemBorder}`}
                    >
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-black border shrink-0 ${badgeBg}`}>
                        #{lineNum}
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                        {lineText}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-amber-200 flex flex-wrap items-center justify-between text-xs text-amber-900 font-bold">
                <span>Total: Exactly 100 Comprehensive Lines</span>
                <span>Verified Official Profile • Head Boy Rishit Shankar</span>
              </div>

            </div>
          </div>
        )}

        {/* SHORT SUMMARY ABOUT ME BANNER - 3D TYPOGRAPHY & INTERACTIVE GRAPHICS */}
        <div className="mt-10 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white border-4 border-amber-400 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center shrink-0 shadow-xl font-black text-2xl sm:text-3xl animate-pulse">
                RS
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                  Short Summary About Me
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-white text-3d-mega mb-1">
                  Rishit Shankar
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-200/95 max-w-xl">
                  Student Leader, Head Boy of DAV School, Founder of The DAV Dictionary serving DAVians, Gold Medalist in DAV Cluster 3, 98 Percentile PWNSAT Gold Medalist, and 95% Class 8 Half-Yearly.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab('about_me')}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-amber-400 text-white font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                <span>Open 100-Line Summary →</span>
              </button>
              <button
                onClick={triggerCelebrationParty}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 hover:scale-105 transition-all text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/40 cursor-pointer shrink-0 border-2 border-amber-300"
              >
                <PartyPopper className="w-5 h-5" />
                <span>Celebrate Rishit 🎉</span>
              </button>
            </div>
          </div>
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
            <div 
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-slate-950/70 transition-opacity"
            />

            <div className="relative w-full max-w-md bg-stone-900 border-l border-stone-700 shadow-2xl flex flex-col h-full z-10 text-white animate-slideInRight">
              
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-emerald-950 via-stone-900 to-emerald-950 border-b border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">Chat &amp; Connect With Rishit</h3>
                    <p className="text-[11px] text-emerald-300/80">Head Boy &amp; Founder of The DAV Dictionary</p>
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

                {/* OFFICIAL SOCIAL MEDIA PLATFORMS */}
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-2">
                    Official Verified Channels:
                  </span>

                  <div className="space-y-2">
                    {[
                      { name: 'Instagram', handle: '@dav_dictionary', url: myInstagramUrl, Logo: InstagramLogo, color: 'bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600', badge: 'Official Profile' },
                      { name: 'Snapchat', handle: '@dav_dictionary', url: mySnapchatUrl, Logo: SnapchatLogo, color: 'bg-yellow-400 text-black', badge: 'Snap & Stories' },
                      { name: 'LinkedIn', handle: 'Rishit Shankar', url: myLinkedInUrl, Logo: LinkedInLogo, color: 'bg-[#0077b5]', badge: 'Developer Network' },
                      { name: 'Facebook', handle: 'DAV Dictionary', url: myFacebookUrl, Logo: FacebookLogo, color: 'bg-[#1877f2]', badge: 'Community' },
                      { name: 'Pinterest', handle: 'DAV Dictionary', url: myPinterestUrl, Logo: PinterestLogo, color: 'bg-[#e60023]', badge: 'Art & Pinboards' },
                      { name: 'X / Twitter', handle: '@Dav_Dictionary', url: myXTwitterUrl, Logo: XTwitterLogo, color: 'bg-black border border-stone-700', badge: 'Official Announcements' },
                      { name: 'YouTube', handle: '@davdictionary', url: myYouTubeUrl, Logo: YouTubeLogo, color: 'bg-[#ff0000]', badge: 'Channel' },
                      { name: 'GitHub', handle: '@RishitShankar', url: myGitHubUrl, Logo: GitHubLogo, color: 'bg-stone-900 border border-stone-700', badge: 'Source Code' },
                      { name: 'Telegram', handle: '@Dav_Dictionary', url: myTelegramUrl, Logo: TelegramLogo, color: 'bg-[#229ed9]', badge: 'Official Channel' }
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
    </div>
  );
}

export default AboutCreatorSection;
