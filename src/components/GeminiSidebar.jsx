import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Layers, X, Sparkles, User, ChevronRight, 
  PanelLeftClose, Award, CheckCircle2, LogOut, Lock, Compass, HelpCircle, Heart,
  ClipboardList, MessageSquareMore, Video, CheckSquare, UserCheck, Bus, Trophy, Star, Settings, Key
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
    (user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai' || user?.role === 'developer') &&
    user?.dimension !== 1 &&
    user?.dimension !== 2 &&
    user?.dimension !== 3 &&
    user?.dimension !== 5
  );
  const isGuest = user?.plan === 'guest';

  // State to track user's real uploaded photo from Section 10 (Student Profile)
  const [userPhoto, setUserPhoto] = useState(() => {
    try {
      if (user?.dp) return user.dp;
      if (user?.avatar) return user.avatar;
      if (user?.photoUrl) return user.photoUrl;
      const uid = (user?.id || 'rishibhai').toLowerCase();
      const saved = localStorage.getItem(`dav_student_profile_${uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.photoUrl || parsed.dp || parsed.avatar) return parsed.photoUrl || parsed.dp || parsed.avatar;
      }
      if (uid === 'rishibhai') return '/rishit_shankar.jpg';
    } catch (e) {}
    return null;
  });

  // Listen to profile photo uploads in real-time
  useEffect(() => {
    const handlePhotoUpdate = (e) => {
      if (e?.detail?.photoUrl) {
        setUserPhoto(e.detail.photoUrl);
      }
    };
    const handleUserUpdate = (e) => {
      if (e?.detail?.dp || e?.detail?.avatar || e?.detail?.photoUrl) {
        setUserPhoto(e.detail.dp || e.detail.avatar || e.detail.photoUrl);
      }
    };

    window.addEventListener('dav_profile_photo_updated', handlePhotoUpdate);
    window.addEventListener('dav_user_updated', handleUserUpdate);
    return () => {
      window.removeEventListener('dav_profile_photo_updated', handlePhotoUpdate);
      window.removeEventListener('dav_user_updated', handleUserUpdate);
    };
  }, []);

  // Sync when user prop updates
  useEffect(() => {
    if (user?.dp || user?.avatar || user?.photoUrl) {
      setUserPhoto(user.dp || user.avatar || user.photoUrl);
    }
  }, [user]);

  const sections = [
    { id: 1, name: 'Section 1: Campus Overview', icon: Compass, status: 'Overview Hub' },
    { id: 2, name: 'Section 2: Digital Textbooks', icon: BookOpen, status: 'Textbooks' },
    { id: 3, name: 'Section 3: Question Answers', icon: HelpCircle, status: 'Q&A Bank' },
    { id: 4, name: 'Section 4: Rishi AI', icon: Sparkles, status: 'AI Workspace' },
    { id: 5, name: 'Section 5: Faculty Portal', icon: Award, status: 'Faculty OS' },
    { id: 6, name: 'Section 6: Videos & Explanations', icon: Video, status: 'Lectures & Notes' },
    { id: 7, name: 'Section 7: Kids Fun Navigator', icon: Bus, status: 'Kids Portal' },
    { id: 8, name: 'Section 8: Examination & Practice', icon: CheckSquare, status: 'Exam & VVI Suite' },
    { id: 9, name: 'Section 9: Study Leaderboard', icon: Trophy, status: 'Leaderboard' },
    { id: 10, name: 'Section 10: Settings Hub', icon: Settings, status: 'Settings & Student Hub' },
    { id: 11, name: 'Section 11: Donate & Reviews', icon: Heart, status: 'Donate, Reviews & Subscriptions' },
    ...(isDimension4 ? [
      { id: 12, name: 'Section 12: Developer Reviews', icon: Star, status: 'Reviews & Feedback' },
      { id: 13, name: 'Section 13: Master ID Generator', icon: Key, status: 'Account Provisioning Desk' }
    ] : []),
    { id: 14, name: 'Section 14: About Creator', icon: Award, status: 'Head Boy Profile' },
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
          className="fixed inset-0 bg-slate-950/60 z-50 transition-opacity"
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
                  isTeacher ? 'bg-purple-900 text-purple-300' : 'bg-red-950 text-red-300'
                }`}>
                  {isTeacher ? 'FACULTY' : 'SECTIONS'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isTeacher ? 'Dimension 5 Faculty Navigation' : 'Official Academic Navigation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Close Menu"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Dimension 5 Faculty Mode Switcher */}
        {isTeacher && (
          <div className="p-3 bg-purple-950/60 border-b border-purple-800/60">
            <div className="text-[10px] font-black uppercase tracking-wider text-purple-300 mb-2 flex items-center justify-between">
              <span>Dimension 5 Faculty Mode</span>
              <span className="bg-purple-800 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">ACTIVE</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_desk')}
                className={`px-2 py-1.5 rounded-lg text-xs font-black transition text-center cursor-pointer ${
                  teacherSubDimension === 'teacher_desk'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-sm border border-purple-400'
                    : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/80 border border-transparent'
                }`}
              >
                5A: Teacher Desk
              </button>
              <button
                type="button"
                onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_explorer')}
                className={`px-2 py-1.5 rounded-lg text-xs font-black transition text-center cursor-pointer ${
                  teacherSubDimension === 'teacher_explorer'
                    ? 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-sm border border-teal-400'
                    : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/80 border border-transparent'
                }`}
              >
                5B: Explorer Mode
              </button>
            </div>
          </div>
        )}

        {/* Section List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {isTeacher && teacherSubDimension === 'teacher_desk' ? (
            <>
              <div className="px-3 py-2 text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                <span>5 Dedicated Faculty Sub-Sections</span>
              </div>

              {teacherSubSections.map((sub) => {
                const isActive = activeSection === 5 && teacherSubSection === sub.id;
                const IconComp = sub.icon;

                return (
                  <button
                    key={sub.id}
                    onClick={() => {
                      onSelectTeacherSubSection(sub.id);
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
                <span>Academic Sections</span>
              </div>

              {sections.map((sec) => {
                const isActive = activeSection === sec.id;
                const isGoldenSection = sec.id === 14;
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
                          : isGoldenSection
                          ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 text-stone-950 font-bold shadow-md shadow-amber-950/40 border border-amber-300'
                          : 'bg-gradient-to-r from-red-800 to-red-900 text-white font-bold shadow-md shadow-red-950/40'
                        : isTeacherSec5
                        ? 'bg-purple-950/40 border border-purple-500/40 text-teal-300 hover:bg-purple-900/60 font-semibold'
                        : isGoldenSection
                        ? 'bg-amber-950/30 border border-amber-500/40 text-amber-200 hover:bg-amber-900/50'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <IconComp className={`w-4 h-4 shrink-0 ${
                        isActive 
                          ? isTeacherSec5 ? 'text-teal-300' : isGoldenSection ? 'text-stone-950' : 'text-amber-300' 
                          : isTeacherSec5 ? 'text-teal-400' : isGoldenSection ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
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
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isTeacherSec5 ? 'text-teal-300' : isGoldenSection ? 'text-stone-950' : 'text-amber-300'}`} />
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
              } text-white font-black text-sm flex items-center justify-center shrink-0 overflow-hidden`}>
                {userPhoto ? (
                  <img 
                    src={userPhoto} 
                    alt={user?.name || 'User DP'} 
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setUserPhoto(null)}
                  />
                ) : (
                  <span>{user?.name ? user.name.slice(0, 2).toUpperCase() : isTeacher ? 'FC' : 'RS'}</span>
                )}
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
                      : (user?.dimensionName || (isAdmin ? 'Dimension 4: Master Developer' : 'Dimension 1: Demo Preview'))
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
              title="Log out"
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