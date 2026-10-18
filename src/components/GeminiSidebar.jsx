import React from 'react';
import { 
  BookOpen, Layers, X, Sparkles, Shield, User, ChevronRight, 
  PanelLeftClose, Award, CheckCircle2, KeyRound, LogOut, Crown, Lock 
} from 'lucide-react';

export function GeminiSidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSelectSection, 
  user,
  onOpenAdminProgram,
  onLogout 
}) {
  const isAdmin = user?.isAdmin || user?.id === 'rishibhai';
  const isGuest = user?.plan === 'guest';

  const sections = [
    { id: 1, name: 'Section 1: Books (Class 1–8)', icon: BookOpen, status: 'Active (11 Subjects)' },
    { id: 2, name: 'Section 2: Untitled', icon: Layers, status: 'Reserved' },
    { id: 3, name: 'Section 3: Untitled', icon: Layers, status: 'Reserved' },
    { id: 4, name: 'Section 4: Untitled', icon: Layers, status: 'Reserved' },
    { id: 5, name: 'Section 5: Untitled', icon: Layers, status: 'Reserved' },
    { id: 6, name: 'Section 6: Untitled', icon: Layers, status: 'Reserved' },
    { id: 7, name: 'Section 7: Untitled', icon: Layers, status: 'Reserved' },
    { id: 8, name: 'Section 8: Untitled', icon: Layers, status: 'Reserved' },
    { id: 9, name: 'Section 9: Student Personal Profile', icon: User, status: 'Smart ID Vault' },
    { id: 10, name: 'Section 10: About Creator Rishit Shankar', icon: User, status: 'Head Boy Profile' },
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
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-900/80 text-amber-300 font-mono">10</span>
              </div>
              <p className="text-[11px] text-slate-400">10 Main Sections Menu</p>
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

        {/* Master Developer Quick Launch Banner (For Rishit Shankar) */}
        {isAdmin && (
          <div className="p-3 bg-amber-950/40 border-b border-amber-500/20">
            <button
              onClick={() => {
                onClose();
                onOpenAdminProgram();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <KeyRound className="w-4 h-4" />
              <span>Admin Program (25 Accounts)</span>
            </button>
          </div>
        )}

        {/* Guest Preview Notice */}
        {isGuest && (
          <div className="p-3 bg-orange-950/40 border-b border-orange-500/30 text-xs text-orange-200 flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-400 shrink-0" />
            <div className="text-[11px]">
              <strong>Free Preview Mode:</strong> Log in via Blackboard with your ID & password to unlock all 4 dimensions.
            </div>
          </div>
        )}

        {/* 10 Sections Menu List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>10 Main Sections</span>
          </div>

          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isSpecialCreator = sec.id === 10;
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
                  <sec.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : isSpecialCreator ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
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
        </div>

        {/* Bottom Profile Info & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 truncate">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-700 to-amber-600 text-white font-black text-sm flex items-center justify-center border border-amber-400/50 shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'RS'}
              </div>
              <div className="truncate">
                <div className="text-xs font-extrabold text-white truncate">
                  {user?.name || 'Rishit Shankar'}
                </div>
                <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />
                  <span>{user?.dimensionName || (isAdmin ? 'Dimension 4: Master Developer' : 'Dimension 1: Normal Plan')}</span>
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
