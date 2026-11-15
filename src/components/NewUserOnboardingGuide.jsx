import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sparkles, ChevronRight, ChevronLeft, X, CheckCircle2, 
  ArrowDown, ArrowUp, Compass, Layers, BookOpen, Brain, 
  School, Trophy, User, LogOut, Check
} from 'lucide-react';

export const BLINKIT_COACHMARK_STEPS = [
  {
    step: 1,
    targetId: 'section1-hero-header',
    title: 'Welcome to DAVDixence • Campus Overview',
    badge: 'Step 1 of 9',
    description: 'This is your central academic command center. Right above each section line, explore verified school announcements, curriculum updates, and 1-click shortcuts to all DAV study tools.',
    icon: Layers,
    color: 'from-amber-500 to-orange-600',
    preferredPlacement: 'bottom'
  },
  {
    step: 2,
    targetId: 'section-card-2',
    title: 'Section 2 • 70+ Digital Textbooks',
    badge: 'Step 2 of 9',
    description: 'The official digital archive of 70+ uncompressed DAV Board textbooks from Class LKG to Class 8. Enjoy zero missing pages, neon cyber highlighters, sticky notes, and full-screen reading.',
    icon: BookOpen,
    color: 'from-red-600 to-rose-700',
    preferredPlacement: 'top'
  },
  {
    step: 3,
    targetId: 'section-card-3',
    title: 'Section 3 • Chapter Q&A & Solutions',
    badge: 'Step 3 of 9',
    description: 'Direct chapter-by-chapter verified answers from SolutionGyan and NCERT solutions. Normal Plan gives verified solutions, while VIP unlocks multi-source answer matrices and model papers.',
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-700',
    preferredPlacement: 'top'
  },
  {
    step: 4,
    targetId: 'section-card-4',
    title: 'Section 4 • Rishi AI Intelligent Companion',
    badge: 'Step 4 of 9',
    description: 'Your 24/7 intelligent curriculum companion engineered by Head Boy Rishit Shankar. Grounded directly in DAV textbooks to solve doubts step-by-step and generate instant chapter revision tests.',
    icon: Brain,
    color: 'from-amber-400 to-yellow-500',
    preferredPlacement: 'top'
  },
  {
    step: 5,
    targetId: 'section-card-5',
    title: 'Section 5 • Faculty Desk & WebRTC Live Classes',
    badge: 'Step 5 of 9',
    description: 'Stay connected with school operations: Daily Homework Hub, verified teacher WhatsApp channels, and WebRTC HD virtual classrooms for interactive live lessons.',
    icon: School,
    color: 'from-blue-600 to-cyan-600',
    preferredPlacement: 'top'
  },
  {
    step: 6,
    targetId: 'section-card-7',
    title: 'Section 7 • Bus Fleet Radar & Weather',
    badge: 'Step 6 of 9',
    description: 'Live interactive tools: Principal Anil Kumar Singh Live School Bus Radar, real-time GPS weather for Muzaffarpur, working scientific calculator, and the 2026–2047 Indian festival calendar.',
    icon: Compass,
    color: 'from-emerald-600 to-teal-700',
    preferredPlacement: 'top'
  },
  {
    step: 7,
    targetId: 'section-card-9',
    title: 'Section 9 • Deep Study Mode',
    badge: 'Step 7 of 9',
    description: 'Distraction-free focus sanctuary! Features custom Pomodoro study timers, synthesized ambient binaural soundscapes (rain, forest, alpha waves), and daily revision flashcard decks.',
    icon: Trophy,
    color: 'from-amber-600 to-red-600',
    preferredPlacement: 'top'
  },
  {
    step: 8,
    targetId: 'navbar-sections-btn',
    title: 'Top Navigation • Sections Quick Jumper',
    badge: 'Step 8 of 9',
    description: 'Tap this 3-line hamburger menu at the top of your screen anytime to instantly navigate between all 14 academic sections or open the Parent Portal in 1 click.',
    icon: Layers,
    color: 'from-amber-500 to-yellow-500',
    preferredPlacement: 'bottom'
  },
  {
    step: 9,
    targetId: 'navbar-profile-btn',
    title: 'Profile & Account Controls',
    badge: 'Step 9 of 9',
    description: 'Manage your student profile, upload your custom photo, review verified credentials, or log out safely. Congratulations! You are now fully oriented with DAVDixence.',
    icon: User,
    color: 'from-emerald-500 to-teal-600',
    preferredPlacement: 'bottom'
  }
];

export function NewUserOnboardingGuide({ 
  currentUser, 
  onClose, 
  onSelectHub 
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const currentStep = BLINKIT_COACHMARK_STEPS[currentStepIndex];

  // Measure and scroll target into view
  const updateTargetPosition = useCallback(() => {
    if (!currentStep) return;

    // For top navbar elements, scroll smoothly to the very top first
    if (currentStep.targetId === 'navbar-sections-btn' || currentStep.targetId === 'navbar-profile-btn') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const el = document.getElementById(currentStep.targetId);
    if (el) {
      // Auto-scroll target into view with smooth animation
      if (currentStep.targetId !== 'navbar-sections-btn' && currentStep.targetId !== 'navbar-profile-btn') {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Allow a brief delay for smooth scroll to finish, then compute coordinates
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right
        });
      }, 350);
    } else {
      // Fallback if target element not in DOM
      setTargetRect({
        top: window.innerHeight * 0.25,
        left: window.innerWidth * 0.1,
        width: window.innerWidth * 0.8,
        height: 140,
        bottom: window.innerHeight * 0.25 + 140,
        right: window.innerWidth * 0.9
      });
    }
  }, [currentStep]);

  useEffect(() => {
    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);
    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [updateTargetPosition]);

  const handleNext = () => {
    if (currentStepIndex < BLINKIT_COACHMARK_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    if (currentUser?.id) {
      try {
        localStorage.setItem(`dav_user_guide_completed_${currentUser.id}`, 'true');
        localStorage.removeItem(`dav_new_user_guide_pending_${currentUser.id}`);
      } catch (e) {}
    }
    onClose?.();
  };

  if (!currentStep) return null;

  const IconComp = currentStep.icon || Sparkles;

  // Calculate Tooltip placement (above or below spotlight)
  const isTopPlacement = targetRect 
    ? (targetRect.top > window.innerHeight * 0.55 || currentStep.preferredPlacement === 'top') && targetRect.top > 250
    : false;

  const tooltipTop = targetRect 
    ? (isTopPlacement ? Math.max(16, targetRect.top - 230) : Math.min(window.innerHeight - 260, targetRect.bottom + 20))
    : window.innerHeight * 0.4;

  const tooltipLeft = targetRect
    ? Math.max(16, Math.min(window.innerWidth - 420, targetRect.left + (targetRect.width / 2) - 200))
    : window.innerWidth * 0.5 - 200;

  return (
    <div className="fixed inset-0 z-[300] select-none font-sans overflow-hidden">
      
      {/* 100% Transparent Cutout Spotlight Overlay (Clicks to background blocked) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-auto" style={{ fillRule: 'evenodd' }}>
        <defs>
          <mask id="spotlight-mask">
            {/* White area = dimmed background */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black area = 100% transparent cutout spotlight */}
            {targetRect && (
              <rect
                x={Math.max(4, targetRect.left - 8)}
                y={Math.max(4, targetRect.top - 8)}
                width={targetRect.width + 16}
                height={targetRect.height + 16}
                rx="20"
                ry="20"
                fill="black"
              />
            )}
          </mask>
        </defs>

        {/* Semi-transparent dark scrim */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(3, 7, 18, 0.78)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Glowing Spotlight Frame Border over the Target Element */}
      {targetRect && (
        <div
          className="absolute pointer-events-none transition-all duration-300 rounded-2xl border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.7)] animate-pulse"
          style={{
            top: `${Math.max(4, targetRect.top - 8)}px`,
            left: `${Math.max(4, targetRect.left - 8)}px`,
            width: `${targetRect.width + 16}px`,
            height: `${targetRect.height + 16}px`
          }}
        />
      )}

      {/* Floating Spotlight Tooltip Card (Blinkit / Mobile App Style) */}
      <div
        className="absolute z-[310] w-[94vw] max-w-md transition-all duration-300 animate-fadeIn"
        style={{
          top: `${tooltipTop}px`,
          left: `${tooltipLeft}px`
        }}
      >
        <div className="relative bg-slate-900/95 border-2 border-amber-400/80 rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.9)] p-5 sm:p-6 backdrop-blur-xl text-white">
          
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${currentStep.color} flex items-center justify-center text-white shadow-md`}>
                <IconComp size={16} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                  {currentStep.badge}
                </span>
                <h3 className="font-black text-sm sm:text-base text-white tracking-tight leading-tight">
                  {currentStep.title}
                </h3>
              </div>
            </div>

            <button
              onClick={handleComplete}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Skip Tour"
            >
              <X size={18} />
            </button>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium mb-4">
            {currentStep.description}
          </p>

          {/* Progress Dots & Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {/* Step Dots */}
            <div className="flex items-center gap-1.5">
              {BLINKIT_COACHMARK_STEPS.map((s, idx) => (
                <span
                  key={s.step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentStepIndex === idx
                      ? 'w-5 bg-amber-400'
                      : idx < currentStepIndex
                      ? 'w-1.5 bg-emerald-500'
                      : 'w-1.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1 transition"
                >
                  <ChevronLeft size={14} />
                  <span>Back</span>
                </button>
              )}

              <button
                onClick={handleNext}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5 transition transform hover:scale-105 active:scale-95"
              >
                <span>{currentStepIndex === BLINKIT_COACHMARK_STEPS.length - 1 ? 'Finish Tour ✓' : 'Next →'}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// SECTION FIRST-VISIT TRANSPARENT COACHMARK BANNER
// -----------------------------------------------------------------------------
export const SECTION_FIRST_VISIT_TEXTS = {
  2: {
    title: 'Section 2 • Digital Textbooks Vault',
    text: '📖 Open Book PDF from Class LKG to 8: Access 70+ authentic DAV Board textbooks with cloud streaming, highlighter, and AI guide.',
    color: 'border-red-500/40 text-rose-200'
  },
  3: {
    title: 'Section 3 • Q&A Arcade',
    text: '❓ Chapter Solutions: Explore solved textbook exercises, back-questions, and interactive exam revision quests.',
    color: 'border-blue-500/40 text-blue-200'
  },
  4: {
    title: 'Section 4 • Rishi AI Intelligence',
    text: '⚡ 24/7 AI Companion: Ask any academic doubt, get step-by-step math solutions, and explore DAV concepts.',
    color: 'border-orange-500/40 text-orange-200'
  },
  5: {
    title: 'Section 5 • Faculty OS & Homework Desk',
    text: '👨‍🏫 Teacher Portal: Review daily homework assignments, teacher notes, faculty WhatsApp desk, and announcements.',
    color: 'border-purple-500/40 text-purple-200'
  },
  6: {
    title: 'Section 6 • Chapter Explanations & Videos',
    text: '🎥 Video Lectures & Notes: Watch high-yield video lessons from verified DAV educators and download revision notes.',
    color: 'border-amber-500/40 text-amber-200'
  },
  7: {
    title: 'Section 7 • Kids Fun Navigator & Bus Radar',
    text: '🚌 Kids Fun Portal: Track school buses on live radar, play educational puzzles, and explore memory cards.',
    color: 'border-cyan-500/40 text-cyan-200'
  },
  8: {
    title: 'Section 8 • Examination & Practice Suite',
    text: '📝 Timed Exams & VVI Questions: Take 25/50/100-Q exams, explore 20 VVI board questions & master SST map skills.',
    color: 'border-emerald-500/40 text-emerald-200'
  }
};

export function SectionFirstVisitCoachmark({ sectionNumber, userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const info = SECTION_FIRST_VISIT_TEXTS[sectionNumber];

  useEffect(() => {
    if (!info) {
      setIsVisible(false);
      return;
    }
    const storageKey = `dav_coachmark_seen_${userId || 'guest'}_sec_${sectionNumber}`;
    try {
      const alreadySeen = localStorage.getItem(storageKey);
      if (!alreadySeen) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (e) {
      setIsVisible(true);
    }
  }, [sectionNumber, userId, info]);

  if (!isVisible || !info) return null;

  const handleDismiss = () => {
    const storageKey = `dav_coachmark_seen_${userId || 'guest'}_sec_${sectionNumber}`;
    try {
      localStorage.setItem(storageKey, 'true');
    } catch (e) {}
    setIsVisible(false);
  };

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-lg animate-fadeIn select-none">
      <div className={`bg-stone-950/85 backdrop-blur-md border ${info.color} p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-xs`}>
        <div className="flex-1 pr-2">
          <div className="text-[10px] font-black uppercase tracking-wider text-amber-400 mb-0.5">
            {info.title}
          </div>
          <div className="text-slate-200 font-medium leading-relaxed">
            {info.text}
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition cursor-pointer shrink-0 border border-white/20"
        >
          Got it ✓
        </button>
      </div>
    </div>
  );
}
