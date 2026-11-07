import React, { useState, useEffect } from 'react';
import { 
  Sparkles, BookOpen, Layers, Award, Heart, Star, 
  ChevronRight, ChevronLeft, X, CheckCircle2, ArrowDown,
  Info, Compass, Trophy, User, Zap, Lock, Eye, Video
} from 'lucide-react';

export const MASTER_HUB_GUIDE_STEPS = [
  {
    hubId: 1,
    title: 'Master Hub 1 • Core Academic Foundation',
    badge: 'Step 1 of 5',
    color: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/40',
    description: 'The foundation of your daily DAV studies. Houses 3 core academic sections accessible to all students:',
    sections: [
      {
        num: 1,
        title: 'Section 1: Campus Overview',
        desc: 'Interactive school homepage, daily announcements, statistics, and 1-click directory navigation.'
      },
      {
        num: 2,
        title: 'Section 2: Digital Textbooks (Classes LKG to 8)',
        desc: '70+ uncompressed authentic DAV textbooks with cloud streaming, highlighter, and PDF reader.'
      },
      {
        num: 3,
        title: 'Section 3: Q&A Arcade',
        desc: 'Chapter-wise solved exercises, textbook back-question answers, and DAV exam revision quests.'
      }
    ]
  },
  {
    hubId: 2,
    title: 'Master Hub 2 • AI Intelligence & Faculty OS',
    badge: 'Step 2 of 5',
    color: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-500/40',
    description: 'Your intelligent academic companion and teacher connectivity headquarters:',
    sections: [
      {
        num: 4,
        title: 'Section 4: Rishi AI Workspace',
        desc: 'Curriculum-grounded 24/7 AI tutor for instant step-by-step doubt solving and exam practice.'
      },
      {
        num: 5,
        title: 'Section 5: Homework & Teachers OS',
        desc: 'Daily homework assignments, verified teacher roster, live doubt clearing, and classes.'
      },
      {
        num: 6,
        title: 'Section 6: Chapter Explanations & Videos',
        desc: 'Detailed conceptual lectures, video breakdowns, and downloadable chapter revision notes.'
      }
    ]
  },
  {
    hubId: 3,
    title: 'Master Hub 3 • Practice Suite & Growth Leaderboard',
    badge: 'Step 3 of 5',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/40',
    description: 'Test your knowledge, compete with classmates, and track school bus routes:',
    sections: [
      {
        num: 7,
        title: 'Section 7: Kids Fun Navigator',
        desc: 'Live DAV school bus tracking radar with Bus ID, interactive puzzles, and educational arcade.'
      },
      {
        num: 8,
        title: 'Section 8: Examination & VVI Practice Suite (NEW!)',
        desc: 'Full-length 25/50/100-Q timed MCQ exams, 20 VVI board long-answer questions, and SST map skills.'
      },
      {
        num: 9,
        title: 'Section 9: Study Leaderboard',
        desc: 'Track classroom ranks, study streaks, quiz badges, and academic honors across DAV campuses.'
      }
    ]
  },
  {
    hubId: 4,
    title: 'Master Hub 4 • Student ID Vault & Developer HQ',
    badge: 'Step 4 of 5',
    color: 'from-purple-600 to-indigo-600',
    borderColor: 'border-purple-500/40',
    description: 'Your personal identity records, school support, and developer review center:',
    sections: [
      {
        num: 10,
        title: 'Section 10: Student ID Vault & Profile',
        desc: 'Encrypted digital ID card, academic dossier, roll number, and custom profile photo sync.'
      },
      {
        num: 11,
        title: 'Section 11: School Donation Hub',
        desc: 'Support smart classroom equipment, DAV digital infrastructure, and audio-video feedback.'
      },
      {
        num: 12,
        title: 'Section 12: Developer Reviews (Developer Only)',
        desc: 'Reserved exclusively for Developer Rishit Shankar to review ratings, voice notes, and approvals.'
      },
      {
        num: 13,
        title: 'Section 13: About Creator',
        desc: 'Meet Head Boy Rishit Shankar. Developer vision, social links, and Digital India tribute.'
      }
    ]
  },
  {
    hubId: 5,
    title: 'Master Hub 5 • Next-Gen Technology & Future Labs',
    badge: 'Step 5 of 5',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/40',
    description: 'Future-ready innovation arriving in upcoming DAV smart portal updates:',
    sections: [
      {
        num: 14,
        title: 'Section 14: DAV Next-Gen VR Lab',
        desc: 'Upcoming 3D virtual science experiments, chemical reactions, and interactive molecule labs.'
      },
      {
        num: 15,
        title: 'Section 15: 3D Digital Campus',
        desc: 'Upcoming 3D virtual walkthrough of DAV Khabra campus, sports grounds, and science halls.'
      },
      {
        num: 16,
        title: 'Section 16: National Olympiad',
        desc: 'Upcoming all-India DAV inter-school competitive exam arena and scholarship leaderboard.'
      }
    ]
  }
];

export function NewUserOnboardingGuide({ 
  currentUser, 
  onClose, 
  onSelectHub 
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const step = MASTER_HUB_GUIDE_STEPS[currentStepIndex];

  // Prevent background scroll
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleNext = () => {
    if (currentStepIndex < MASTER_HUB_GUIDE_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      onSelectHub?.(MASTER_HUB_GUIDE_STEPS[nextIdx].hubId);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      onSelectHub?.(MASTER_HUB_GUIDE_STEPS[prevIdx].hubId);
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

  return (
    <div className="fixed inset-0 z-[200] flex flex-col justify-end sm:justify-center items-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn select-none font-sans">
      
      {/* Semi-transparent Spotlight Card */}
      <div className={`w-full max-w-xl bg-slate-900/95 border ${step.borderColor} rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[85vh] sm:max-h-[90vh] relative mb-16 sm:mb-0`}>
        
        {/* Glow Header */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${step.color} text-white flex items-center justify-between shadow-lg`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                New Student Onboarding Manual • {step.badge}
              </div>
              <h3 className="font-black text-sm sm:text-base text-white">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleComplete}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition cursor-pointer"
            title="Skip Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5">
            {MASTER_HUB_GUIDE_STEPS.map((s, idx) => (
              <span
                key={s.hubId}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStepIndex === idx
                    ? 'w-6 bg-amber-400'
                    : idx < currentStepIndex
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            Hub {currentStepIndex + 1} of 5
          </span>
        </div>

        {/* Scrollable Explanations */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 scrollbar-thin">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            {step.description}
          </p>

          <div className="space-y-3">
            {step.sections.map(sec => (
              <div 
                key={sec.num} 
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>{sec.title}</span>
                </div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {sec.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>On mobile, tap the 5 dock buttons at the very bottom of the screen to open each Master Hub anytime!</span>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            disabled={currentStepIndex === 0}
            onClick={handlePrev}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-300 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={handleComplete}
            className="text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer font-semibold"
          >
            Skip Manual
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <span>{currentStepIndex === MASTER_HUB_GUIDE_STEPS.length - 1 ? 'Finish & Explore 🎉' : 'Next Hub'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Floating Animated Pointer Indicator pointing to bottom Master Hubs on mobile */}
      <div className="flex flex-col items-center animate-bounce mb-2 pointer-events-none sm:hidden">
        <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/40">
          Master Hub {step.hubId} Located in Bottom Dock ↓
        </span>
        <ArrowDown className="w-5 h-5 text-amber-400 mt-1" />
      </div>

    </div>
  );
}

// -----------------------------------------------------------------------------
// SECTION FIRST-VISIT TRANSPARENT COACHMARK BANNER (Step 6)
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
    text: '📝 Timed Exams & VVI Questions: Take 25/50/100-Q JEE exams, explore 20 VVI board questions & master SST map skills.',
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
