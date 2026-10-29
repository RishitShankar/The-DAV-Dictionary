import React, { useState, useEffect } from 'react';
import { Menu, Award, BookOpen, Layers, ShieldAlert, LogOut, KeyRound, User, Crown, Sparkles, Lock, Heart, Smartphone, Monitor, Bus, Trophy, Star } from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';

export function Navbar({ 
  activeSection, 
  onSelectSection,
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
  onOpenCinematic,
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

  // State to track user's real uploaded photo from Section 9 (Student Profile)
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

    if (user?.dp || user?.avatar || user?.photoUrl) {
      setUserPhoto(user.dp || user.avatar || user.photoUrl);
    } else {
      const uid = (user?.id || 'rishibhai').toLowerCase();
      try {
        const saved = localStorage.getItem(`dav_student_profile_${uid}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.photoUrl || parsed.dp || parsed.avatar) {
            setUserPhoto(parsed.photoUrl || parsed.dp || parsed.avatar);
          }
        } else if (uid === 'rishibhai') {
          setUserPhoto('/rishit_shankar.jpg');
        }
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('dav_profile_photo_updated', handlePhotoUpdate);
      window.removeEventListener('dav_user_updated', handleUserUpdate);
    };
  }, [user?.id, user?.dp, user?.avatar, user?.photoUrl]);

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
    <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200 shadow-sm shrink-0">
      {/* Top Banner - Head Boy Dedication */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-900 to-amber-700 text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Official DAV Modern Digital Initiative • DAV Dictionary • Dedicated by Head Boy Rishit Shankar for Digital India 🇮🇳</span>
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
                alt="DAV Dictionary Official Logo" 
                className="w-16 h-16 object-contain drop-shadow-md hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">DAV Dictionary</span>
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

          {/* Squeezed center indicator removed for clean, uncrowded navbar layout */}

          {/* User Account / Admin Superpower Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Dimension 4 Developer Only: Interactive Section 12 Review Vault Pill */}
            {isDimension4 && (
              <button
                type="button"
                onClick={() => onSelectSection && onSelectSection(12)}
                className={`py-1.5 px-3 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 shadow-sm border ${
                  activeSection === 12
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 border-amber-300 ring-2 ring-amber-400/50'
                    : 'bg-red-950 text-amber-300 border-amber-500/40 hover:bg-red-900 hover:border-amber-400'
                }`}
                title="Dimension 4 Developer Person Only: Section 12 Review Vault"
              >
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-pulse" />
                <span className="hidden sm:inline">Section 12: Check Reviews</span>
                <span className="sm:hidden">Sec 12</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </button>
            )}

                        

{/* Launch Rishi AI Button */}
            {onOpenAI && (
              <button
                onClick={onOpenAI}
                className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-orange-500/20 border border-orange-400 transition-all cursor-pointer"
                title="Launch Full-Screen Rishi AI"
              >
                <BlackDogLogo className="w-4 h-4" bgClassName="bg-stone-950" />
                <span className="hidden sm:inline">Rishi AI</span>
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

            {/* Device Security Protocol is handled strictly in background: Normal=1 device, VIP=2 devices, Double VIP=3 devices */}

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
