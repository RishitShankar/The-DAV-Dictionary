import React, { useState, useEffect } from 'react';
import { Menu, Award, BookOpen, Layers, ShieldAlert, LogOut, KeyRound, User, Crown, Sparkles, Lock, Heart, Smartphone, Monitor, Bus } from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';

export function Navbar({ 
  activeSection, 
  onToggleSidebar, 
  user, 
  isTeacher = false,
  teacherSubDimension = 'teacher_explorer',
  onToggleSubDimension,
  teacherSubSection = 'homework',
  onSelectTeacherSubSection,
  deviceDimension = 'pc',
  onToggleDevice,
  onOpenAuth, 
  onOpenAdminProgram,
  onOpenAI,
  onLogout 
}) {
  const isAdmin = user?.isAdmin || user?.id === 'rishibhai';
  const isGuest = user?.plan === 'guest';

  // State to track user's real uploaded photo from Section 9 (Student Profile)
  const [userPhoto, setUserPhoto] = useState(() => {
    try {
      const uid = (user?.id || 'rishibhai').toLowerCase();
      const saved = localStorage.getItem(`dav_student_profile_${uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.photoUrl) return parsed.photoUrl;
      }
      if (user?.photoUrl) return user.photoUrl;
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
    window.addEventListener('dav_profile_photo_updated', handlePhotoUpdate);

    const uid = (user?.id || 'rishibhai').toLowerCase();
    try {
      const saved = localStorage.getItem(`dav_student_profile_${uid}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.photoUrl) setUserPhoto(parsed.photoUrl);
      } else if (uid === 'rishibhai') {
        setUserPhoto('/rishit_shankar.jpg');
      }
    } catch (e) {}

    return () => window.removeEventListener('dav_profile_photo_updated', handlePhotoUpdate);
  }, [user?.id]);

  // Badge styling according to dimension
  let tierBadgeBg = 'bg-emerald-600 text-white';
  let tierLabel = 'Normal Plan';
  if (isTeacher || user?.dimension === 5 || user?.plan === 'teacher') {
    tierBadgeBg = 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white';
    tierLabel = 'Dim 5 • Faculty';
  } else if (user?.dimension === 4 || isAdmin) {
    tierBadgeBg = 'bg-amber-600 text-white';
    tierLabel = 'Dev Master';
  } else if (user?.dimension === 3 || user?.plan === 'vvip') {
    tierBadgeBg = 'bg-purple-600 text-white';
    tierLabel = 'VVIP Pass';
  } else if (user?.dimension === 2 || user?.plan === 'vip') {
    tierBadgeBg = 'bg-blue-600 text-white';
    tierLabel = 'VIP Pass';
  } else if (isGuest) {
    tierBadgeBg = 'bg-orange-600 text-white';
    tierLabel = 'Free Preview';
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner - Head Boy Dedication */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-900 to-amber-700 text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Official DAV Modern Digital Initiative • The DAV Dictionary • Dedicated by Head Boy Rishit Shankar for Digital India 🇮🇳</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: 3-Lines Hamburger Icon + Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleSidebar}
              className={`p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition border shadow-2xs flex items-center gap-2 cursor-pointer ${
                isTeacher ? 'border-purple-300 bg-purple-50/50' : 'border-slate-200'
              }`}
              title={isTeacher ? "Open Faculty Master OS Menu" : "Open 10 Sections Menu"}
            >
              <Menu className={`w-5 h-5 ${isTeacher ? 'text-purple-700' : 'text-slate-800'}`} />
              <span className={`hidden sm:inline text-xs font-bold ${isTeacher ? 'text-purple-800' : 'text-slate-600'}`}>
                {isTeacher ? 'Faculty Menu' : 'Sections'}
              </span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="/logo.png" 
                alt="The DAV Dictionary Official Logo" 
                className="w-16 h-16 object-contain drop-shadow-md hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">The DAV Dictionary</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full border ${
                    isTeacher 
                      ? 'bg-purple-100 text-purple-800 border-purple-200' 
                      : 'bg-red-100 text-red-800 border-red-200'
                  }`}>
                    {isTeacher ? 'Faculty Portal' : 'Official'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {isTeacher ? 'Dimension 5: DAV Faculty Master OS' : 'Head Boy Digital Reference Campus'}
                </p>
              </div>
            </div>
          </div>

          {/* Current Section Indicator in Header */}
          <div className="hidden xl:flex items-center gap-2 min-w-0 overflow-hidden">
            {isTeacher ? (
              <div className="flex items-center gap-2">
                {/* Teacher Sub-Dimension Toggle (5A vs 5B) */}
                <div className="bg-purple-100/80 p-0.5 rounded-xl border border-purple-300 flex items-center text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_only')}
                    title="Sub-Dimension 5A: Only Teacher (Operates Section 5 as Section 1)"
                    className={`px-2 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teacherSubDimension === 'teacher_only'
                        ? 'bg-purple-700 text-white shadow-xs font-black'
                        : 'text-purple-800 hover:bg-purple-200/60'
                    }`}
                  >
                    <span>🎓 5A: Only Faculty</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleSubDimension && onToggleSubDimension('teacher_explorer')}
                    title="Sub-Dimension 5B: Teacher & Explorer (Access all 10 campus sections + Section 5)"
                    className={`px-2 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                      teacherSubDimension === 'teacher_explorer'
                        ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-xs font-black'
                        : 'text-purple-800 hover:bg-purple-200/60'
                    }`}
                  >
                    <span>🌐 5B: Explorer (All Sections)</span>
                  </button>
                </div>

                {/* Current Section or Sub-Section Indicator */}
                {activeSection === 5 || teacherSubDimension === 'teacher_only' ? (
                  <span className="px-3 py-1 rounded-lg bg-purple-50 text-purple-900 font-bold text-xs border border-purple-200 flex items-center gap-1.5 shadow-xs">
                    <Award className="w-3.5 h-3.5 text-purple-600" />
                    <span>{teacherSubDimension === 'teacher_only' ? 'Section 1: Faculty Master OS' : 'Section 5: Faculty Dimension'}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-lg bg-red-50 text-red-900 font-bold text-xs border border-red-200 flex items-center gap-1.5 shadow-xs">
                    <BookOpen className="w-3.5 h-3.5 text-red-600" />
                    <span>Campus Section {activeSection}</span>
                    <span className="text-red-300 mx-1">•</span>
                    <span className="font-extrabold text-purple-700">Teacher Explorer Active</span>
                  </span>
                )}
              </div>
            ) : (
              <>
                <span className="text-xs text-slate-400 font-medium">Active:</span>
                <span className="px-3 py-1 rounded-lg bg-red-50 text-red-800 font-bold text-xs border border-red-200 flex items-center gap-1.5">
                  {activeSection === 1 ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Section 1: Website Master Overview</span>
                    </>
                  ) : activeSection === 2 ? (
                    <>
                      <BookOpen className="w-3.5 h-3.5 text-red-700" />
                      <span>Section 2: Official Textbooks (LKG–8)</span>
                    </>
                  ) : activeSection === 3 ? (
                    <>
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Section 3: Questions & Answers</span>
                    </>
                  ) : activeSection === 4 ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Section 4: Shankar AI Companion</span>
                    </>
                  ) : activeSection === 5 ? (
                    <>
                      <Layers className="w-3.5 h-3.5 text-purple-600" />
                      <span>Section 5: Dimension 5 Faculty OS</span>
                    </>
                  ) : activeSection === 6 ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      <span>Section 6: Video Explanations & PYQs</span>
                    </>
                  ) : activeSection === 7 ? (
                    <>
                      <Bus className="w-3.5 h-3.5 text-amber-500" />
                      <span>Section 7: Kids Fun & Live Bus GPS</span>
                    </>
                  ) : activeSection === 8 ? (
                    <>
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Section 8: Donate to Developer</span>
                    </>
                  ) : activeSection === 9 ? (
                    <>
                      <User className="w-3.5 h-3.5 text-amber-500" />
                      <span>Section 9: Student Personal Profile</span>
                    </>
                  ) : activeSection === 10 ? (
                    <>
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>Section 10: About Creator Rishit Shankar</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-3.5 h-3.5 text-slate-500" />
                      <span>Section {activeSection}: Untitled</span>
                    </>
                  )}
                </span>
              </>
            )}
          </div>

          {/* User Account / Admin Superpower Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* 5th Dimension Switcher: PC vs Mobile Mode */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => onToggleDevice && onToggleDevice('pc')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  deviceDimension === 'pc' 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="PC Dimension: Full Desktop Interface"
              >
                <Monitor className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden md:inline">PC</span>
              </button>
              <button
                type="button"
                onClick={() => onToggleDevice && onToggleDevice('mobile')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  deviceDimension === 'mobile' 
                    ? 'bg-gradient-to-r from-red-800 to-amber-600 text-white shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="5th Dimension: Mobile Dimension (Auto-Optimized Touch UI)"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">5D Mobile</span>
              </button>
            </div>
            
            {/* Launch Shankar AI Button */}
            {onOpenAI && (
              <button
                onClick={onOpenAI}
                className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 border border-orange-400 transition-all cursor-pointer"
                title="Launch Full-Screen Shankar AI"
              >
                <BlackDogLogo className="w-4 h-4" bgClassName="bg-stone-950" />
                <span className="hidden sm:inline">Shankar AI</span>
              </button>
            )}

            {/* Exclusive Administrator Program Button for Rishit Shankar */}
            {isAdmin && (
              <button
                onClick={onOpenAdminProgram}
                className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-amber-500/20 border border-amber-300 transition-all cursor-pointer animate-pulse hover:animate-none"
                title="Launch Admin Program to generate student IDs and manage payments"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Program</span>
                <span className="bg-stone-900 text-amber-300 text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                  GEN
                </span>
              </button>
            )}

            {/* Profile Pill & Logout */}
            <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 truncate max-w-[130px]">
                  {user?.name || 'Rishit Shankar'}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${tierBadgeBg}`}>
                  {tierLabel}
                </span>
              </div>

              <button
                onClick={onOpenAuth}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-800 to-amber-600 text-white font-black text-sm flex items-center justify-center border-2 border-amber-400 shadow-sm hover:scale-105 transition cursor-pointer overflow-hidden shrink-0"
                title="Account Details & Profile Photo"
              >
                {userPhoto ? (
                  <img 
                    src={userPhoto} 
                    alt={user?.name || 'User DP'} 
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setUserPhoto(null)}
                  />
                ) : (
                  <span>{user?.name ? user.name.slice(0, 2).toUpperCase() : 'RS'}</span>
                )}
              </button>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200 cursor-pointer"
                title="Lock & Return to Blackboard Login"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
