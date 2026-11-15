import React from 'react';
import {
  Hourglass, Calendar, Users, ShieldAlert, Film, Trophy,
  BarChart3, Sparkles, Sliders
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

/**
 * --------------------------------------------------------------------------
 * FloatingBottomDock - Exact 1:1 ReGain App Bottom Navigation Dock
 * --------------------------------------------------------------------------
 * As seen in Screenshots 5, 6, and 7:
 * Two distinct floating dark glass islands:
 * - Island 1 (Left): [ ⌛ Focus | 📅 Schedule | 👥 Groups ]
 * - Island 2 (Right): [ 🚫 Blocks ] (separate rounded pill card)
 * Positioned inside the phone viewport container, avoiding button occlusion.
 */

export function FloatingBottomDock({ activeTab, onSelectTab, isEmbedded = true }) {
  const handleSelect = (tabId) => {
    ambientAudio.playBellChime();
    if (window.Android?.vibrate) {
      window.Android.vibrate(30);
    }
    onSelectTab(tabId);
  };

  return (
    <div className={`w-full max-w-[400px] px-3 select-none pointer-events-auto ${
      isEmbedded ? 'relative mt-auto pt-2 pb-2' : 'fixed bottom-4 left-1/2 -translate-x-1/2 z-40'
    }`}>
      <div className="flex items-center gap-2.5">
        
        {/* Main 3-Tab Container: Focus, Schedule, Groups (Matches Screenshot Navigation) */}
        <div className="flex-1 h-14 rounded-full bg-[#0d0e11]/95 backdrop-blur-2xl border border-stone-800/90 shadow-2xl shadow-black/95 px-3 flex items-center justify-around">
          
          {/* Tab 1: Focus */}
          <button
            type="button"
            onClick={() => handleSelect('focus')}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
              activeTab === 'focus'
                ? 'text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Hourglass className={`w-4 h-4 transition-transform ${activeTab === 'focus' ? 'text-white scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'focus' ? 'text-white font-bold' : 'text-stone-400'}`}>
              Focus
            </span>
          </button>

          {/* Tab 2: Schedule */}
          <button
            type="button"
            onClick={() => handleSelect('schedule')}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
              activeTab === 'schedule'
                ? 'text-emerald-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Calendar className={`w-4 h-4 transition-transform ${activeTab === 'schedule' ? 'text-emerald-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'schedule' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
              Schedule
            </span>
          </button>

          {/* Tab 3: Groups */}
          <button
            type="button"
            onClick={() => handleSelect('groups')}
            className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer ${
              activeTab === 'groups'
                ? 'text-emerald-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Users className={`w-4 h-4 transition-transform ${activeTab === 'groups' ? 'text-emerald-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'groups' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
              Groups
            </span>
          </button>

          {/* Tab 4: Reels Counter */}
          <button
            type="button"
            onClick={() => handleSelect('reels')}
            className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all cursor-pointer relative ${
              activeTab === 'reels'
                ? 'text-rose-400 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            title="BrainPal Reel Scroller"
          >
            <Film className={`w-4 h-4 transition-transform ${activeTab === 'reels' ? 'text-rose-400 scale-110 stroke-[2.5]' : 'text-stone-400'}`} />
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'reels' ? 'text-rose-400 font-bold' : 'text-stone-400'}`}>
              Reels
            </span>
            {activeTab !== 'reels' && (
              <span className="absolute 0 right-1 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

        </div>

        {/* Separate Blocks Pill Card (Exact Match to ReGain App Screenshot 7) */}
        <button
          type="button"
          onClick={() => handleSelect('blocks')}
          className={`h-14 px-4 rounded-[26px] border shadow-2xl transition-all flex flex-col items-center justify-center cursor-pointer shrink-0 ${
            activeTab === 'blocks'
              ? 'bg-[#0d0e11]/95 border-emerald-500/80 text-emerald-400 shadow-emerald-950/60'
              : 'bg-[#0d0e11]/95 border-stone-800/90 text-stone-400 hover:text-stone-200 hover:border-stone-700'
          }`}
          title="App Limits & Shorts Blocking"
        >
          {/* Prohibited / Block Icon matching Screenshot */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full border-2 ${activeTab === 'blocks' ? 'border-emerald-400' : 'border-stone-400'} flex items-center justify-center relative`}>
              <div className={`w-3.5 h-0.5 ${activeTab === 'blocks' ? 'bg-emerald-400' : 'bg-stone-400'} rotate-45 transform`} />
            </div>
          </div>
          <span className={`text-[10px] mt-0.5 tracking-tight font-medium ${activeTab === 'blocks' ? 'text-emerald-400 font-bold' : 'text-stone-400'}`}>
            Blocks
          </span>
        </button>

      </div>
    </div>
  );
}
