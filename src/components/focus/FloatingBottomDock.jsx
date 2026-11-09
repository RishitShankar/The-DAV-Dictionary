import React from 'react';
import {
  Hourglass, Calendar, Users, ShieldAlert, Film, BarChart3,
  Sparkles, Lock, Volume2
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

export function FloatingBottomDock({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'focus', label: 'Focus', icon: Hourglass },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'blocks', label: 'Blocks', icon: ShieldAlert, isSpecial: true },
    { id: 'reels', label: 'BrainPal', icon: Film, isBadge: 'NEW' },
    { id: 'analytics', label: 'Scanner', icon: BarChart3 }
  ];

  const handleSelect = (tabId) => {
    ambientAudio.playBellChime();
    onSelectTab(tabId);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md select-none">
      <div className="p-1.5 rounded-full bg-[#111215]/95 backdrop-blur-2xl border border-stone-700/60 shadow-2xl shadow-black/80 flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isSpecial) {
            // "Blocks" pill button (as shown on the right side of the screenshot navigation)
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-950 font-black'
                    : 'bg-stone-850 hover:bg-stone-800 text-stone-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all relative ${
                isActive
                  ? 'text-emerald-400 font-bold'
                  : 'text-stone-400 hover:text-stone-200 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : ''}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>

              {tab.isBadge && !isActive && (
                <span className="absolute -top-1 right-1 px-1 py-0.2 rounded-full text-[8px] font-black bg-rose-500 text-white animate-pulse">
                  {tab.isBadge}
                </span>
              )}

              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
