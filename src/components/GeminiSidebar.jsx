import React from 'react';
import { 
  BookOpen, Layers, X, Sparkles, User, ChevronRight, 
  PanelLeftClose, Award, CheckCircle2, LogOut, Lock, Compass, HelpCircle, Heart,
  ClipboardList, MessageSquareMore, Video, CheckSquare, UserCheck
} from 'lucide-react';

export function GeminiSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSelectSection, 
  user,
  isTeacher = false,
  teacherSubSection = 'homework',
  onSelectTeacherSubSection,
  onOpenAdminProgram,
  onLogout 
}) {
  const isAdmin = user?.isAdmin || user?.id === 'rishibhai';
  const isGuest = user?.plan === 'guest';

  const sections = [
    { id: 1, name: 'Section 1: Master Overview & Hub', icon: Compass, status: '10 Sections Hub' },
    { id: 2, name: 'Section 2: Official DAV Textbooks (LKG–8)', icon: BookOpen, status: 'Digital Library' },
    { id: 3, name: 'Section 3: Questions & Answers', icon: HelpCircle, status: 'Reserved' },
    { id: 4, name: 'Section 4: Shankar AI Companion', icon: Sparkles, status: 'AI Workspace' },
    { id: 5, name: 'Section 5: Dimension 5 Faculty OS', icon: Award, status: 'Teachers OS' },
    { id: 6, name: 'Section 6: Academic Dictionary', icon: BookOpen, status: 'Vocabulary' },
    { id: 7, name: 'Section 7: Syllabus & Blueprint', icon: Layers, status: 'Curriculum' },
    { id: 8, name: 'Section 8: Donate to Developer', icon: Heart, status: 'Support & Bills' },
    { id: 9, name: 'Section 9: Student Personal Profile', icon: User, status: 'Smart ID Vault' },
    { id: 10, name: 'Section 10: About Creator Rishit Shankar', icon: User, status: 'Head Boy Profile' },
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
              alt="The DAV Dictionary Logo" 
              className="w-14 h-14 object-contain drop-shadow-md" 
            />
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight flex items-center gap-1.5">
                <span>The DAV Dictionary</span>
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
          {isTeacher ? (
            <>
              <div className="px-3 py-2 text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Faculty Master Sub-Sections</span>
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-300 font-mono">
                  Dim 5
                </span>
              </div>

              {teacherSubSections.map((sub) => {
                const isActive = teacherSubSection === sub.id;
                const IconComp = sub.icon;

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
                const IconComp = sec.icon;

                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      onSelectSection(sec.id);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-red-800 to-red-900 text-white font-bold shadow-md shadow-red-950/40'
                        : isSpecialCreator
                        ? 'bg-amber-950/20 border border-amber-500/30 text-amber-200 hover:bg-amber-900/40'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : isSpecialCreator ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                      <div className="truncate">
                        <div className="text-xs truncate font-medium">{sec.name}</div>
                        <div className="text-[10px] opacity-70">{sec.status}</div>
                      </div>
                    </div>

                    {isActive ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
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
