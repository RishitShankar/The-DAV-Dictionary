import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Layers, Trophy, Award, 
  Home, ClipboardList, Video, Compass, User as UserIcon, 
  Heart, Star, Atom, Globe, Crown, X, ArrowRight, 
  ChevronUp, CheckCircle2, Zap
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';

export const MASTER_HUBS = [
  {
    id: 1,
    hubNumber: 'First Master Section',
    title: 'Master Hub 1',
    subtitle: 'Core Academics',
    badge: 'Sec 1 – 3',
    icon: BookOpen,
    accentColor: 'from-amber-500 to-orange-600',
    sections: [
      {
        number: 1,
        title: 'Section 1: Campus Overview',
        desc: 'Interactive school homepage, quick stats, announcements, and navigation desk.',
        icon: Home,
        color: 'text-red-700 bg-red-50 border-red-200'
      },
      {
        number: 2,
        title: 'Section 2: Digital Textbooks',
        desc: 'Access 70+ authentic DAV Board textbooks from Class LKG to Class 8 in-app.',
        icon: BookOpen,
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      },
      {
        number: 3,
        title: 'Section 3: Q&A Arcade',
        desc: 'Gamified chapter solutions, exercises, and interactive question-answer quests.',
        icon: Layers,
        color: 'text-purple-700 bg-purple-50 border-purple-200'
      }
    ]
  },
  {
    id: 2,
    hubNumber: 'Second Master Section',
    title: 'Master Hub 2',
    subtitle: 'AI & Faculty OS',
    badge: 'Sec 4 – 6',
    icon: Sparkles,
    accentColor: 'from-orange-500 to-amber-600',
    sections: [
      {
        number: 4,
        title: 'Section 4: Rishi AI Intelligence',
        desc: 'Full-screen curriculum-grounded AI tutor for instant doubts and examination preparation.',
        icon: Sparkles,
        color: 'text-orange-700 bg-orange-50 border-orange-200'
      },
      {
        number: 5,
        title: 'Section 5: Homework & Teachers OS',
        desc: 'Daily homework assignments, teacher notes, live faculty doubts, and submissions.',
        icon: ClipboardList,
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      },
      {
        number: 6,
        title: 'Section 6: Chapter Explanations',
        desc: 'Detailed conceptual lectures, video breakdowns, and audio guides per chapter.',
        icon: Video,
        color: 'text-blue-700 bg-blue-50 border-blue-200'
      }
    ]
  },
  {
    id: 3,
    hubNumber: 'Third Master Section',
    title: 'Master Hub 3',
    subtitle: 'Growth & ID Vault',
    badge: 'Sec 7 – 9',
    icon: Trophy,
    accentColor: 'from-emerald-500 to-teal-600',
    sections: [
      {
        number: 7,
        title: 'Section 7: Kids Fun Navigator',
        desc: 'Educational puzzles, memory cards, science games, and creative learning games.',
        icon: Compass,
        color: 'text-cyan-700 bg-cyan-50 border-cyan-200'
      },
      {
        number: 8,
        title: 'Section 8: Study Leaderboard',
        desc: 'Track classroom ranks, study streaks, quiz badges, and academic honors.',
        icon: Trophy,
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      },
      {
        number: 9,
        title: 'Section 9: Student ID Vault',
        desc: 'Encrypted personal identity card, school marks records, roll number, and dossier.',
        icon: UserIcon,
        color: 'text-purple-700 bg-purple-50 border-purple-200'
      }
    ]
  },
  {
    id: 4,
    hubNumber: 'Fourth Master Section',
    title: 'Master Hub 4',
    subtitle: 'Heritage & Dev',
    badge: 'Sec 10 – 12',
    icon: Award,
    accentColor: 'from-purple-600 to-indigo-600',
    sections: [
      {
        number: 10,
        title: 'Section 10: School Donation Hub',
        desc: 'Support DAV digital infrastructure and smart classroom equipment expansion.',
        icon: Heart,
        color: 'text-rose-700 bg-rose-50 border-rose-200'
      },
      {
        number: 11,
        title: 'Section 11: About Creator',
        desc: 'Dedicated by Head Boy Rishit Shankar. Developer vision and Digital India tribute.',
        icon: Star,
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      },
      {
        number: 12,
        title: 'Section 12: Developer Reviews',
        desc: 'Dimension 4 developer review vault, VIP approvals, and student ratings center.',
        icon: Award,
        color: 'text-yellow-700 bg-yellow-50 border-yellow-200'
      }
    ]
  },
  {
    id: 5,
    hubNumber: 'Fifth Master Section',
    title: 'Master Hub 5',
    subtitle: 'Upcoming Demo',
    badge: 'Sec 13 – 15',
    icon: Zap,
    accentColor: 'from-cyan-500 to-blue-600',
    sections: [
      {
        number: 13,
        title: 'Section 13: DAV Next-Gen VR Lab',
        desc: 'Upcoming 3D virtual science lab experiments and interactive molecule simulation.',
        icon: Atom,
        color: 'text-indigo-700 bg-indigo-50 border-indigo-200'
      },
      {
        number: 14,
        title: 'Section 14: 3D Digital Campus',
        desc: 'Upcoming virtual walkthrough of DAV Khabra campus and sports grounds.',
        icon: Globe,
        color: 'text-teal-700 bg-teal-50 border-teal-200'
      },
      {
        number: 15,
        title: 'Section 15: National Olympiad',
        desc: 'Upcoming all-India DAV inter-school Olympiad and competitive test arena.',
        icon: Crown,
        color: 'text-amber-700 bg-amber-50 border-amber-200'
      }
    ]
  }
];

export function MasterHubBottomNav({ activeSection, onSelectSection }) {
  const [openHubId, setOpenHubId] = useState(null);

  // Find which hub currently holds the active section
  const currentHub = MASTER_HUBS.find(h => h.sections.some(s => s.number === activeSection)) || MASTER_HUBS[0];
  const activeHubDetails = openHubId ? MASTER_HUBS.find(h => h.id === openHubId) : null;

  const handleToggleHub = (hubId) => {
    if (openHubId === hubId) {
      setOpenHubId(null);
    } else {
      setOpenHubId(hubId);
    }
  };

  const handleChooseSection = (secNum) => {
    onSelectSection(secNum);
    setOpenHubId(null);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* ANIMATED POP-UP DRAWER FOR 3 SUB-SECTIONS                                 */}
      {/* ========================================================================= */}
      {activeHubDetails && (
        <div className="fixed inset-0 z-45 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn select-none">
          {/* Backdrop dismiss */}
          <div className="flex-1 w-full" onClick={() => setOpenHubId(null)} />

          <div className="w-full max-w-lg mx-auto bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 pb-24 animate-slideUp relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeHubDetails.accentColor} text-white flex items-center justify-center shadow-md`}>
                  <activeHubDetails.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-amber-600 tracking-wider">
                    {activeHubDetails.hubNumber}
                  </div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">
                    {activeHubDetails.title} • {activeHubDetails.subtitle}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setOpenHubId(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-[11px] text-slate-500 mb-3 font-medium">
              Choose one of the 3 redirection sections below to launch immediately:
            </p>

            {/* 3 Section Redirection Cards */}
            <div className="space-y-2.5">
              {activeHubDetails.sections.map((sec) => {
                const isSelected = activeSection === sec.number;
                const SecIcon = sec.icon;
                return (
                  <div
                    key={sec.number}
                    onClick={() => handleChooseSection(sec.number)}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 transform active:scale-98 ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${sec.color}`}>
                        <SecIcon className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900 truncate">
                            {sec.title}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                          {sec.desc}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 text-xs font-black text-amber-700">
                      <span className="text-[11px]">Open</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5 MASTER HUB BOTTOM FLOATING DOCK                                         */}
      {/* ========================================================================= */}
      <nav 
        aria-label="5 Master Hub Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 py-2 px-2 shadow-2xl flex items-center justify-around select-none backdrop-blur-md"
      >
        {MASTER_HUBS.map((hub) => {
          const isHoldingActive = hub.sections.some(s => s.number === activeSection);
          const isDrawerOpen = openHubId === hub.id;
          const HubIcon = hub.icon;

          return (
            <button
              key={hub.id}
              type="button"
              onClick={() => handleToggleHub(hub.id)}
              className={`flex-1 flex flex-col items-center gap-1 transition-all py-1 px-1 relative cursor-pointer ${
                isDrawerOpen || isHoldingActive
                  ? 'text-amber-700 scale-102 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Active Indicator Top Dot */}
              {isHoldingActive && (
                <div className="absolute -top-2 w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm" />
              )}

              <div 
                className={`p-1.5 rounded-xl transition-all ${
                  isDrawerOpen
                    ? 'bg-amber-500 text-stone-950 shadow-md ring-2 ring-amber-400'
                    : isHoldingActive
                    ? 'bg-amber-100 text-amber-800 font-bold'
                    : 'bg-transparent text-slate-600'
                }`}
              >
                <HubIcon className="w-5 h-5" />
              </div>

              <div className="flex flex-col items-center leading-none">
                <span className="text-[10px] font-black tracking-tight text-slate-900">
                  {hub.title}
                </span>
                <span className="text-[9px] text-slate-400 font-semibold mt-0.5">
                  {hub.badge}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default MasterHubBottomNav;
