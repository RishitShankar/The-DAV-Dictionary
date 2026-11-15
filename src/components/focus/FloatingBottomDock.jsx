import React from 'react';
import {
  Hourglass, Calendar, Users, ShieldAlert, Film, Trophy,
  BarChart3, Sparkles, Sliders
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

export function FloatingBottomDock({ activeTab, onSelectTab }) {
  const handleSelect = (tabId) => {
    ambientAudio.playBellChime();
    onSelectTab(tabId);
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-full max-w-[420px] px-3 select-none pointer-events-auto">
      <div className="flex items-center gap-2">
        
        {/* Main 3-Tab Container: Focus, Schedule, Groups (Matches Screenshot Navigation) */}
        <div className="flex-1 h-16 rounded-full bg-[#0d0e11]/95 backdrop-blur-2xl border border-stone-800/80 shadow-2xl shadow-black/90 px-3 flex items-center justify-around">
          
          {/* Tab 1: Focus */}
          <button
            type="button"
            onClick={() => handleSelect('focus')}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer ${
              activeTab === 'focus'
                ? 'text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Hourglass className={`w-5 h-5 transition-transform ${activeTab === 'focus' ? 'text-white scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-1 tracking-tight font-medium ${activeTab === 'focus' ? 'text-white font-bold' : 'text-stone-400'}`}>
              Focus
            </span>
          </button>

          {/* Tab 2: Schedule */}
          <button
            type="button"
            onClick={() => handleSelect('schedule')}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'text-emerald-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className={`w-5 h-5 transition-transform ${activeTab === 'schedule' ? 'text-emerald-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'schedule' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
              Schedule
            </span>
          </button>

          {/* Tab 3: Groups */}
          <button
            type="button"
            onClick={() => handleSelect('groups')}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer ${
              activeTab === 'groups'
                ? 'text-emerald-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className={`w-5 h-5 transition-transform ${activeTab === 'groups' ? 'text-emerald-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'groups' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
              Groups
            </span>
          </button>

          {/* Tab 5: BrainPal Reels (Quick Access) */}
          <button
            type="button"
            onClick={() => handleSelect('reels')}
            className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer relative ${
              activeTab === 'reels'
                ? 'text-rose-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="BrainPal Reels & Shorts Counter"
          >
            <Film className={`w-5 h-5 transition-transform ${activeTab === 'reels' ? 'text-rose-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'reels' ? 'text-rose-400 font-bold' : 'text-stone-400'}`}>
              Reels
            </span>
            {activeTab !== 'reels' && (
              <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

        </div>

        {/* Separate Blocks Pill Card (Exact Match to ReGain App Screenshot) */}
        <button
          type="button"
          onClick={() => handleSelect('blocks')}
          className={`h-16 px-5 rounded-[28px] border shadow-2xl transition-all flex flex-col items-center justify-center cursor-pointer shrink-0 ${
            activeTab === 'blocks'
              ? 'bg-[#0d0e11]/95 border-emerald-500/80 text-emerald-400 shadow-emerald-950/60'
              : 'bg-[#0d0e11]/95 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
          }`}
          title="App Limits & Shorts Blocking"
        >
          {/* Circle with diagonal slash (prohibited / block icon) */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full border-2 ${activeTab === 'blocks' ? 'border-emerald-400' : 'border-stone-400'} flex items-center justify-center relative`}>
              <div className={`w-4 h-0.5 ${activeTab === 'blocks' ? 'bg-emerald-400' : 'bg-stone-400'} rotate-45 transform`} />
            </div>
          </div>
          <span className={`text-[10px] mt-1 tracking-tight font-medium ${activeTab === 'blocks' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
            Blocks
          </span>
        </button>

      </div>
    </div>
  );
}
