import React from 'react';
import { Menu, Award, BookOpen, Layers, ShieldAlert, LogOut, KeyRound, User, Crown, Sparkles, Lock } from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';

export function Navbar({ 
  activeSection, 
  onToggleSidebar, 
  user, 
  onOpenAuth, 
  onOpenAdminProgram,
  onOpenAI,
  onLogout 
}) {
  const isAdmin = user?.isAdmin || user?.id === 'rishibhai';
  const isGuest = user?.plan === 'guest';

  // Badge styling according to dimension
  let tierBadgeBg = 'bg-emerald-600 text-white';
  let tierLabel = 'Normal Plan';
  if (user?.dimension === 4 || isAdmin) {
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
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition border border-slate-200 shadow-2xs flex items-center gap-2 cursor-pointer"
              title="Open 10 Sections Menu"
            >
              <Menu className="w-5 h-5 text-slate-800" />
              <span className="hidden sm:inline text-xs font-bold text-slate-600">Sections</span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer">
              <img 
                src="/logo.png" 
                alt="The DAV Dictionary Official Logo" 
                className="w-16 h-16 object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">The DAV Dictionary</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-red-100 text-red-800 border border-red-200">
                    Official
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Head Boy Digital Reference Campus</p>
              </div>
            </div>
          </div>

          {/* Current Section Indicator in Header */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Active:</span>
            <span className="px-3 py-1 rounded-lg bg-red-50 text-red-800 font-bold text-xs border border-red-200 flex items-center gap-1.5">
              {activeSection === 1 ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-red-700" />
                  <span>Section 1: Books (11 Subjects)</span>
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
          </div>

          {/* User Account / Admin Superpower Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
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
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-800 to-amber-600 text-white font-black text-sm flex items-center justify-center border-2 border-amber-400 shadow-sm hover:scale-105 transition cursor-pointer"
                title="Account Details"
              >
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'RS'}
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
