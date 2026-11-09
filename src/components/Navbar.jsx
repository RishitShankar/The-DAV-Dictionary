import React, { useState, useEffect } from 'react';
import { Menu, LogOut, Award, Star } from 'lucide-react';
import { VfxBulletTrain } from './vfx/VfxBulletTrain';

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
  const isGuest = user?.plan === 'guest' || user?.plan === 'demo' || user?.isDemo;
  const isBusDriver = Boolean(user?.dimension === 7 || user?.plan === 'bus_driver' || user?.isDriver);
  const isParent = Boolean(user?.dimension === 8 || user?.plan === 'parent' || user?.role === 'parent');

  const [isLight, setIsLight] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_theme_mode');
      return saved === 'white' || saved === 'system';
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    const handleThemeChange = (e) => {
      if (e?.detail?.theme) {
        setIsLight(e.detail.theme === 'white' || e.detail.theme === 'system');
      }
    };
    window.addEventListener('dav_theme_changed', handleThemeChange);
    return () => window.removeEventListener('dav_theme_changed', handleThemeChange);
  }, []);

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

  // Sync if user object prop updates
  useEffect(() => {
    if (user?.dp || user?.avatar || user?.photoUrl) {
      setUserPhoto(user.dp || user.avatar || user.photoUrl);
    }
  }, [user]);

  // Determine Badge appearance
  let tierBadgeBg = 'bg-stone-800 text-amber-300';
  let tierLabel = 'Demo Preview';

  if (isAdmin || user?.dimension === 6 || user?.plan === 'developer' || user?.role === 'developer') {
    tierBadgeBg = 'bg-gradient-to-r from-red-800 to-amber-700 text-white';
    tierLabel = 'Master Developer';
  } else if (user?.dimension === 8 || user?.plan === 'parent' || user?.role === 'parent') {
    tierBadgeBg = 'bg-cyan-900 text-cyan-200 border border-cyan-500';
    tierLabel = 'Parent (Dim 8)';
  } else if (user?.dimension === 7 || user?.plan === 'bus_driver') {
    tierBadgeBg = 'bg-cyan-800 text-cyan-100';
    tierLabel = 'Bus Driver (Dim 7)';
  } else if (isTeacher || user?.dimension === 5 || user?.plan === 'teacher') {
    tierBadgeBg = 'bg-purple-800 text-purple-100';
    tierLabel = 'DAV Faculty';
  } else if (user?.dimension === 4 || user?.plan === 'vvip') {
    tierBadgeBg = 'bg-amber-600 text-stone-950';
    tierLabel = 'Double VIP';
  } else if (user?.dimension === 3 || user?.plan === 'vip') {
    tierBadgeBg = 'bg-blue-600 text-white';
    tierLabel = 'VIP Pass';
  } else if (user?.dimension === 2 || user?.plan === 'normal') {
    tierBadgeBg = 'bg-emerald-700 text-white';
    tierLabel = 'Normal Plan';
  } else if (isGuest || user?.plan === 'demo' || user?.isDemo) {
    tierBadgeBg = 'bg-orange-600 text-white';
    tierLabel = 'Demo Plan';
  }

  return (
    <header className={`sticky top-0 z-40 ${isLight ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-950/95 border-slate-800 text-white shadow-md'} border-b shrink-0 transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Left: 3-Lines Hamburger Icon + Brand Logo + Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleSidebar}
              className={`p-2.5 rounded-xl transition border shadow-2xs flex items-center gap-2 cursor-pointer ${
                isLight 
                  ? 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 border-slate-200' 
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-slate-700'
              }`}
              title="Open Navigation Menu"
            >
              <Menu className={`w-5 h-5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`} />
              <span className={`hidden sm:inline text-xs font-bold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                {isBusDriver ? 'Bus Cockpit' : isParent ? 'Parent Portal' : isTeacher ? 'Faculty Menu' : 'Sections'}
              </span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="/logo.png" 
                alt="DAV Dictionary Official Logo" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md hover:scale-105 transition-transform shrink-0"
              />
              <span className={`font-extrabold text-lg sm:text-xl ${isLight ? 'text-slate-900' : 'text-white'} tracking-tight`}>DAV Dictionary</span>
            </div>
          </div>

          {/* Center: High-Speed Bullet Train Animation (Runs ONLY when activeSection === 10 on Settings Tab) */}
          {activeSection === 10 && !isBusDriver && !isParent && (
            <div className="flex-1 max-w-xl h-12 sm:h-14 relative overflow-hidden rounded-xl bg-slate-950 border border-cyan-500/30 shadow-inner flex items-center justify-center">
              <VfxBulletTrain isCompact={true} />
            </div>
          )}

          {/* Right: Profile Picture, Name, Plan badge, and Logout button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-2 pl-2 sm:pl-3">
              <div className="text-right hidden sm:block">
                <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'} truncate max-w-[130px]`}>
                  {user?.name || (isTeacher ? 'DAV Faculty' : 'Rishit Shankar')}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${tierBadgeBg}`}>
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
                  <span>{user?.name ? user.name.slice(0, 2).toUpperCase() : (isTeacher ? 'FC' : 'RS')}</span>
                )}
              </button>

              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200 cursor-pointer"
                title="Log Out"
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
