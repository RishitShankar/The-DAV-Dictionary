import React, { useState, useEffect } from 'react';
import {
  Hourglass, Calendar, Users, ShieldAlert, Film, BarChart3,
  Sparkles, Sliders, Volume2, ShieldCheck, Zap, X, Trophy,
  RefreshCw, Clock, Flame, Award, Heart, BookOpen, Layers,
  Music, Radio, Eye, CheckSquare
} from 'lucide-react';

import { RegainFocusScreen } from './focus/RegainFocusScreen';
import { RegainFocusSetupModal } from './focus/RegainFocusSetupModal';
import { RegainScheduleScreen } from './focus/RegainScheduleScreen';
import { RegainGroupsScreen } from './focus/RegainGroupsScreen';
import { RegainBlocksScreen } from './focus/RegainBlocksScreen';
import { BrainPalReelsTracker } from './focus/BrainPalReelsTracker';
import { BrainPalDoomscrollDetector } from './focus/BrainPalDoomscrollDetector';
import { BrainPalChallengeDashboard } from './focus/BrainPalChallengeDashboard';
import { RegainScreenTimeAnalytics } from './focus/RegainScreenTimeAnalytics';
import { RegainStrictShield } from './focus/RegainStrictShield';
import { RegainNotificationManager } from './focus/RegainNotificationManager';
import { RegainSoundscapesPlayer } from './focus/RegainSoundscapesPlayer';
import { RegainStudyRoomLive } from './focus/RegainStudyRoomLive';
import { RegainPermissionManager } from './focus/RegainPermissionManager';
import { FloatingBottomDock } from './focus/FloatingBottomDock';
import { focusDataStore, ambientAudio } from '../services/focusDataStore';

export function DigitalFocusSuite({ user, accumulatedStudyMs, onAccumulateMs }) {
  // Navigation active tab in focus engine
  // 'focus' | 'schedule' | 'groups' | 'blocks' | 'reels' | 'analytics' | 'strict' | 'notifications' | 'audio' | 'detector' | 'studyroom' | 'challenges' | 'permissions'
  const [activeTab, setActiveTab] = useState('focus');

  // Modal dialog states
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);

  // Audio volume state
  const [audioVolume, setAudioVolume] = useState(0.5);

  const handleStartSessionFromModal = (config) => {
    ambientAudio.playBellChime();
    if (onAccumulateMs) {
      onAccumulateMs(1000 * 60); // mark progress
    }
  };

  const handleVolumeChange = (newVal) => {
    setAudioVolume(newVal);
    ambientAudio.setVolume(newVal);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-6 pb-28 text-white">
      {/* ------------------------------------------------------------- */}
      {/* Top Secondary Navigation Pills (Desktop & Tablet Quick Jumper) */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-lg no-scrollbar">
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => setActiveTab('focus')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'focus'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Hourglass className="w-3.5 h-3.5" />
            <span>Focus Orb</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'flashcards'
                ? 'bg-purple-600 text-white font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Flashcards &amp; Revision</span>
          </button>

          <button
            onClick={() => setActiveTab('detector')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'detector'
                ? 'bg-orange-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Doomscroll Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'challenges'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Quests & Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'blocks'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>App Blocks</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'schedule'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('groups')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'groups'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Focus Groups</span>
          </button>

          <button
            onClick={() => setActiveTab('studyroom')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'studyroom'
                ? 'bg-teal-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Live Study Hall</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'analytics'
                ? 'bg-emerald-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab('audio')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'audio'
                ? 'bg-indigo-500 text-white font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Audio Studio</span>
          </button>

          <button
            onClick={() => setActiveTab('strict')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'strict'
                ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Anti-Uninstall</span>
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'permissions'
                ? 'bg-emerald-600 text-white font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>OS Permissions</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeTab === 'notifications'
                ? 'bg-cyan-500 text-stone-950 font-black shadow-md'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Notification Shield</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Active Tab View Rendering                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full">
        {/* Tab 1: ReGain Aurora Focus Screen */}
        {activeTab === 'focus' && (
          <RegainFocusScreen
            onOpenSetupModal={() => setShowSetupModal(true)}
            onOpenGroupModal={() => setActiveTab('groups')}
            onOpenSettingsDrawer={() => setShowSettingsDrawer(true)}
          />
        )}

        {/* Tab 2: Interactive Flashcards & Daily Revision Tracker */}
        {activeTab === 'flashcards' && (
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span>DAV Active Recall Flashcards &amp; Revision</span>
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  High-yield concepts, definitions, and formulas across DAV Class 8 Science, Mathematics &amp; Social Science.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
                Spaced Repetition Active
              </span>
            </div>

            {/* Flashcard Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { subject: 'Science', q: 'What is the function of the Golgi apparatus?', a: 'Packaging, modification, and dispatch of cellular proteins and lipids.', chapter: 'Ch 1: Cell Structure' },
                { subject: 'Mathematics', q: 'What is the Pythagorean Triplet formula?', a: 'For any natural number m > 1: (2m, m² - 1, m² + 1) forms a Pythagorean triplet.', chapter: 'Ch 1: Squares and Square Roots' },
                { subject: 'Social Science', q: 'Define Sustainable Development.', a: 'Development that meets the needs of the present without compromising future generations.', chapter: 'Ch 1: Resources' },
                { subject: 'Science', q: 'State Snell\'s Law of Refraction.', a: 'The ratio of sine of angle of incidence to sine of angle of refraction is constant (sin i / sin r = constant).', chapter: 'Ch 10: Refraction of Light' },
                { subject: 'Mathematics', q: 'What is the formula for Compound Interest?', a: 'A = P(1 + r/100)ⁿ, where CI = A - P.', chapter: 'Ch 6: Compound Interest' },
                { subject: 'Science', q: 'What is the chemical formula of Rust?', a: 'Hydrated Ferric Oxide: Fe₂O₃ • xH₂O.', chapter: 'Ch 3: Metals and Non-Metals' }
              ].map((card, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-400/60 transition group space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                      <span className="text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                        {card.subject}
                      </span>
                      <span className="text-stone-500">{card.chapter}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-3 group-hover:text-amber-200 transition">
                      {card.q}
                    </h4>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800/80 text-xs text-stone-300 leading-relaxed font-sans">
                    💡 <strong>Answer:</strong> {card.a}
                  </div>
                </div>
              ))}
            </div>

            {/* Revision Planner Checklist */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
                Daily Spaced Revision Target
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <span>Science: Ch 1 to 5 Flashcards</span>
                  <span className="text-emerald-400 font-bold">✓ Reviewed</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <span>Maths: Formula Practice</span>
                  <span className="text-amber-400 font-bold">In Progress</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <span>SST: Map Locations</span>
                  <span className="text-stone-500 font-bold">Scheduled (7 PM)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: BrainPal Doomscroll Velocity Detector */}
        {activeTab === 'detector' && (
          <BrainPalDoomscrollDetector />
        )}

        {/* Tab 4: Attention Mastery Quests & Badges */}
        {activeTab === 'challenges' && (
          <BrainPalChallengeDashboard />
        )}

        {/* Tab 5: ReGain Blocks Screen */}
        {activeTab === 'blocks' && (
          <RegainBlocksScreen
            onOpenShortsTracker={() => setActiveTab('reels')}
          />
        )}

        {/* Tab 6: ReGain Schedule Screen */}
        {activeTab === 'schedule' && (
          <RegainScheduleScreen />
        )}

        {/* Tab 7: ReGain Focus Groups Screen */}
        {activeTab === 'groups' && (
          <RegainGroupsScreen user={user} />
        )}

        {/* Tab 8: Live Virtual Study Hall */}
        {activeTab === 'studyroom' && (
          <RegainStudyRoomLive user={user} />
        )}

        {/* Tab 9: Screen Time Analytics & Scanner */}
        {activeTab === 'analytics' && (
          <RegainScreenTimeAnalytics />
        )}

        {/* Tab 10: Dedicated Audio Synthesizer Studio */}
        {activeTab === 'audio' && (
          <RegainSoundscapesPlayer />
        )}

        {/* Tab 11: Strict Mode & Anti-Uninstall Shield */}
        {activeTab === 'strict' && (
          <RegainStrictShield />
        )}

        {/* Tab 12: Android OS Permission Manager */}
        {activeTab === 'permissions' && (
          <RegainPermissionManager />
        )}

        {/* Tab 13: Smart Notification Shield */}
        {activeTab === 'notifications' && (
          <RegainNotificationManager />
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ReGain Focus Setup Sheet Modal                                */}
      {/* ------------------------------------------------------------- */}
      <RegainFocusSetupModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        onStartSession={handleStartSessionFromModal}
        onOpenAppBlockSelector={() => {
          setShowSetupModal(false);
          setActiveTab('blocks');
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* Slide-over Settings Drawer (from Hamburger Menu)              */}
      {/* ------------------------------------------------------------- */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-end">
          <div className="w-full max-w-sm bg-stone-900 border-l border-stone-800 h-full p-6 space-y-6 overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <span>Focus Engine Controls</span>
              </h3>
              <button
                onClick={() => setShowSettingsDrawer(false)}
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Master Volume */}
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                <span className="flex items-center space-x-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Synthesizer Volume</span>
                </span>
                <span className="font-mono text-emerald-400">{Math.round(audioVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Study Method Presets
              </span>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Pomodoro Classic</h5>
                    <p className="text-[10px] text-stone-400">25 min focus • 5 min break</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">Load ›</span>
                </button>

                <button
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Deep Work Sprint</h5>
                    <p className="text-[10px] text-stone-400">90 min focus • 15 min break</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">Load ›</span>
                </button>

                <button
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Monk Mode Ultra</h5>
                    <p className="text-[10px] text-stone-400">180 min zero-interruption session</p>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">Load ›</span>
                </button>
              </div>
            </div>

            {/* Quick Links to Security & Notifications */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  setActiveTab('strict');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Anti-Uninstall & Emergency PIN</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('permissions');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center space-x-2"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Android OS Diagnostics</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('notifications');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Notification Shield & Batches</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Floating Bottom Pill Navigation Bar (Exact match to Screenshots) */}
      {/* ------------------------------------------------------------- */}
      <FloatingBottomDock
        activeTab={activeTab}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />
    </div>
  );
}
