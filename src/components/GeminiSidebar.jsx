import React from 'react';
import { 
  BookOpen, Layers, X, Sparkles, User, ChevronRight, 
  PanelLeftClose, Award, CheckCircle2, LogOut, Lock, Compass, HelpCircle, Heart,
  ClipboardList, MessageSquareMore, Video, CheckSquare, UserCheck, Bus, Trophy, Star
} from 'lucide-react';

export function GeminiSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSelectSection, 
  user,
  isTeacher = false,
  teacherSubDimension = 'teacher_explorer',
  onToggleSubDimension,
  teacherSubSection = 'homework',
  onSelectTeacherSubSection,
  onOpenAdminProgram,
  onLogout 
}) {
  const isAdmin = user?.isAdmin || user?.id === 'rishibhai';
  const isDimension4 = Boolean(
    (user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') &&
    user?.dimension !== 1 &&
    user?.dimension !== 2 &&
    user?.dimension !== 3 &&
    user?.dimension !== 5
  );
  const isGuest = user?.plan === 'guest';

  const sections = [
    { id: 1, name: 'Section 1: Master Overview & Hub', icon: Compass, status: '11 Sections Hub' },
    { id: 2, name: 'Section 2: Official DAV Textbooks (LKG–8)', icon: BookOpen, status: 'Digital Library' },
    { id: 3, name: 'Section 3: Questions & Answers', icon: HelpCircle, status: 'Reserved' },
    { id: 4, name: 'Section 4: Rishi AI Companion', icon: Sparkles, status: 'AI Workspace' },
    { id: 5, name: 'Section 5: Dimension 5 Faculty OS', icon: Award, status: 'Teachers OS' },
    { id: 6, name: 'Section 6: Video Explanations & PYQs', icon: Video, status: 'Lectures & PYQs' },
    { id: 7, name: 'Section 7: Kids Fun & Live Bus GPS', icon: Bus, status: 'Kids Portal' },
    { id: 8, name: 'Section 8: Study Leaderboard & Focus Mode', icon: Trophy, status: 'Study Ranks & OS' },
    { id: 9, name: 'Section 9: Student Personal Profile', icon: User, status: 'Smart ID Vault' },
    { id: 10, name: 'Section 10: Donate & Reviews Hub', icon: Heart, status: '2 Pages: Donate & Review' },
    { id: 11, name: 'Section 11: About Creator Rishit Shankar', icon: Award, status: 'Head Boy Profile' },
    ...(isDimension4 ? [
      { id: 12, name: 'Section 12: Developer Review Vault', icon: Star, status: 'Dimension 4 Person' }
    ] : []),
  ];

  const teacherSubSections = [
    { id: 'homework', name: 'Sub-Section 1: Daily Homework Hub', icon: ClipboardList, status: 'Classwork & Diary' },
    { id: 'doubts_chat', name: 'Sub-Section 2: Faculty WhatsApp Desk', icon: MessageSquareMore, status: '50+ Verified Roster' },
    { id: 'live_class', name: 'Sub-Section 3: Live Video Classes', icon: Video, status: 'Broadcast Studio' },
    { id: 'tests', name: 'Sub-Section 4: Tests & Exam Suite', icon: CheckSquare, status: 'Online Question Bank' },
    { id: 'attendance', name: 'Sub-Section 5: Attendance Registry', icon: UserCheck, status: 'Daily Rolls & Registry' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 transition-opacity"
        />
      )}

      {/* Slide-out Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-72 sm:w-80 bg-slate-900 text-slate-100 z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="DAV Dictionary Logo" 
              className="w-14 h-14 object-contain drop-shadow-md" 
            />
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                <span>DAV Dictionary</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                  isTeacher ? 'bg-purple-900/80 text-purple-200' : 'bg-red-900/80 text-amber-300'
                }`}>
                  {isTeacher ? 'DIM 5' : '10'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isTeacher ? 'Section 1: Faculty Master OS' : '10 Main Sections Menu'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="Close Sidebar"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Guest Preview Notice */}
        {isGuest && (
          <div className="p-3 bg-orange-950/40 border-b border-orange-500/30 text-xs text-orange-200 flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-400 shrink-0" />
            <div className="text-[11px]">
              <strong>Free Preview Mode:</strong> Log in via Blackboard with your ID & password to unlock all 4 dimensions.
            </div>
          </div>
        )}

        {/* Navigation List: Teacher Sub-Sections OR Student 10 Sections */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {isTeacher && (
            <div className="p-2.5 mb-3 rounded-2xl bg-purple-950/70 border border-purple-500/40 shadow-inner">
              <div className="text-[10px] text-purple-300 font-bold uppercase mb-2 flex items-center justify-between">
                <span>Faculty Dimension Mode:</span>
                <span className="font-mono text-teal-300 font-black">
                  {teacherSubDimension === 'teacher_only' ? '5A Only Faculty' : '5B Explorer'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_only')}
                  className={`py-1.5 px-2 rounded-xl font-bold text-center transition cursor-pointer flex items-center justify-center gap-1 ${
                    teacherSubDimension === 'teacher_only'
                      ? 'bg-purple-600 text-white shadow-md font-black border border-purple-400'
                      : 'bg-purple-900/40 text-purple-300 hover:bg-purple-800/60'
                  }`}
                >
                  <span>🎓 5A: Only OS</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_explorer')}
                  className={`py-1.5 px-2 rounded-xl font-bold text-center transition cursor-pointer flex items-center justify-center gap-1 ${
                    teacherSubDimension === 'teacher_explorer'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-black border border-teal-400'
                      : 'bg-purple-900/40 text-purple-300 hover:bg-purple-800/60'
                  }`}
                >
                  <span>🌐 5B: Explorer</span>
                </button>
              </div>
            </div>
          )}

          {isTeacher && teacherSubDimension === 'teacher_only' ? (
            <>
              <div className="px-3 py-2 text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Section 1: Faculty Master OS</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono">
                  Dim 5A
                </span>
              </div>

              {teacherSubSections.map((sub) => {
                const isActive = teacherSubSection === sub.id;
                const IconComp = sub.icon || Sparkles;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      if (onSelectTeacherSubSection) {
                        onSelectTeacherSubSection(sub.id);
                      }
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-800 to-indigo-900 text-white font-bold shadow-md shadow-purple-950/40 border border-purple-500/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-purple-300' : 'text-slate-400 group-hover:text-purple-300'}`} />
                      <div className="truncate">
                        <div className="text-xs truncate font-medium">{sub.name}</div>
                        <div className="text-[10px] opacity-70">{sub.status}</div>
                      </div>
                    </div>

                    {isActive ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-300 shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0 transition" />
                    )}
                  </button>
                );
              })}
            </>
          ) : (
            <>
              <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>10 Main Sections</span>
              </div>

              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                const isSpecialCreator = sec.id === 10;
                const isTeacherSec5 = sec.id === 5 && isTeacher;
                const IconComp = sec.icon || Sparkles;

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onSelectSection(sec.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? isTeacherSec5
                          ? 'bg-gradient-to-r from-purple-800 to-teal-900 text-white font-bold shadow-md shadow-purple-950/40 border border-teal-400'
                          : 'bg-gradient-to-r from-red-800 to-red-900 text-white font-bold shadow-md shadow-red-950/40'
                        : isTeacherSec5
                        ? 'bg-purple-950/40 border border-purple-500/40 text-teal-300 hover:bg-purple-900/60 font-semibold'
                        : isSpecialCreator
                        ? 'bg-amber-950/20 border border-amber-500/30 text-amber-200 hover:bg-amber-900/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <IconComp className={`w-4 h-4 shrink-0 ${
                        isActive 
                          ? isTeacherSec5 ? 'text-teal-300' : 'text-amber-300' 
                          : isTeacherSec5 ? 'text-teal-400' : isSpecialCreator ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`} />
                      <div className="truncate">
                        <div className="text-xs truncate font-medium flex items-center gap-1.5">
                          <span>{sec.name}</span>
                          {isTeacherSec5 && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-400 text-slate-950 font-black">
                              MY FACULTY OS
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] opacity-70">{sec.status}</div>
                      </div>
                    </div>

                    {isActive ? (
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isTeacherSec5 ? 'text-teal-300' : 'text-amber-300'}`} />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 shrink-0 transition" />
                    )}
                  </button>
                );
              })}
            </>
          )}
        </div>

        {/* Bottom Profile Info & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 truncate">
              <div className={`w-9 h-9 rounded-full ${
                isTeacher ? 'bg-gradient-to-tr from-purple-700 to-indigo-600 border border-purple-400/50' : 'bg-gradient-to-tr from-red-700 to-amber-600 border border-amber-400/50'
              } text-white font-black text-sm flex items-center justify-center shrink-0`}>
                {user?.name ? user.name.slice(0, 2).toUpperCase() : isTeacher ? 'FC' : 'RS'}
              </div>
              <div className="truncate">
                <div className="text-xs font-extrabold text-white truncate">
                  {user?.name || (isTeacher ? 'DAV Faculty Member' : 'Rishit Shankar')}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>
                    {isTeacher 
                      ? 'Dimension 5: DAV Faculty Teacher'
                      : (user?.dimensionName || (isAdmin ? 'Dimension 4: Master Developer' : 'Dimension 1: Normal Plan'))
                    }
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              title="Log out and return to Blackboard Login"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default GeminiSidebar;
