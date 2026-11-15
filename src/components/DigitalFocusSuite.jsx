import React, { useState, useEffect } from 'react';
import {
  Hourglass, Calendar, Users, ShieldAlert, Film, BarChart3,
  Sparkles, Sliders, Volume2, ShieldCheck, Zap, X, Trophy,
  RefreshCw, Clock, Flame, Award, Heart, BookOpen, Layers,
  Music, Radio, Eye, CheckSquare, Smartphone, Monitor, ChevronRight,
  Wifi, Battery, Signal, Maximize2, Minimize2
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
  // Navigation active tab in ReGain OS
  // 'focus' | 'schedule' | 'groups' | 'blocks' | 'reels' | 'analytics'
  const [activeTab, setActiveTab] = useState('focus');

  // Device & Platform Detection
  const isNativeApk = typeof window !== 'undefined' && (
    window.Android !== undefined ||
    window.location.protocol === 'file:' ||
    window.location.hostname.includes('appassets') || 
    window.location.hostname.includes('davportal') ||
    (navigator.userAgent && navigator.userAgent.includes('DAVSmartPortalApp'))
  );
  const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  const isRunningOnMobileOrApk = isNativeApk || isMobile;

  // Phone Shell Simulator mode on desktop ONLY (Never on actual mobile devices or inside APK)
  const [isPhoneFrame, setIsPhoneFrame] = useState(() => {
    if (isRunningOnMobileOrApk) return false;
    try {
      const saved = localStorage.getItem('dav_regain_phone_frame');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleTogglePhoneFrame = (val) => {
    if (isRunningOnMobileOrApk) return;
    setIsPhoneFrame(val);
    try {
      localStorage.setItem('dav_regain_phone_frame', String(val));
    } catch (e) {}
  };

  // Modal dialog states
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showAppBlockModalFromSetup, setShowAppBlockModalFromSetup] = useState(false);

  // Audio volume state
  const [audioVolume, setAudioVolume] = useState(0.5);

  const handleStartSessionFromModal = (config) => {
    ambientAudio.playBellChime();
    if (window.Android?.vibrate) window.Android.vibrate(40);
    if (onAccumulateMs) {
      onAccumulateMs(1000 * 60 * (config.focusDurationSeconds ? config.focusDurationSeconds / 60 : 25));
    }
  };

  const handleVolumeChange = (newVal) => {
    setAudioVolume(newVal);
    ambientAudio.setVolume(newVal);
  };

  return (
    <div className="relative w-full select-none text-white">
      
      {/* ------------------------------------------------------------- */}
      {/* Top Desktop Auxiliary Toolbar (View Mode Switcher)            */}
      {/* RENDERED ON DESKTOP ONLY - NEVER INSIDE APK OR MOBILE SCREENS */}
      {/* ------------------------------------------------------------- */}
      {!isRunningOnMobileOrApk && (
        <div className="max-w-md mx-auto mb-4 flex items-center justify-between px-3 py-2 rounded-2xl bg-stone-900/80 border border-stone-800 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-stone-300">ReGain App Engine v3.4</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => handleTogglePhoneFrame(true)}
              className={`px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1 transition cursor-pointer ${
                isPhoneFrame
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Authentic Smartphone Aspect Ratio"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[11px]">Phone Shell</span>
            </button>

            <button
              type="button"
              onClick={() => handleTogglePhoneFrame(false)}
              className={`px-2.5 py-1 rounded-xl font-bold flex items-center space-x-1 transition cursor-pointer ${
                !isPhoneFrame
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
              title="Expanded Full Width View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="text-[11px]">Expanded</span>
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Authentic ReGain Smartphone Viewport Container                */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`mx-auto transition-all duration-300 relative ${
          isPhoneFrame
            ? 'w-full max-w-[420px] min-h-[850px] rounded-[50px] border-[10px] border-[#18191d] ring-2 ring-stone-800 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden bg-[#021811] flex flex-col justify-between'
            : 'w-full max-w-4xl min-h-[750px] rounded-3xl sm:rounded-[36px] border border-stone-800/80 bg-[#021811] shadow-2xl overflow-hidden flex flex-col justify-between'
        }`}
      >
        {/* Simulated Android Status Bar (ONLY when phone frame simulator is explicitly enabled on desktop) */}
        {isPhoneFrame && !isRunningOnMobileOrApk && (
          <div className="relative z-30 pt-3 pb-1 px-6 flex items-center justify-between text-[11px] font-sans font-semibold text-white/90 select-none bg-black/20 backdrop-blur-sm">
            {/* Left: Clock */}
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-tight">1:24 PM</span>
              <div className="flex items-center space-x-1 opacity-70">
                <span className="text-[10px]">⌛</span>
                <span className="text-[10px]">⌛</span>
              </div>
            </div>

            {/* Center Punch-hole Camera */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-stone-800/80 shadow-inner" />

            {/* Right: Network & Battery Indicators */}
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-mono tracking-tighter opacity-80">VoLTE</span>
              <Wifi className="w-3.5 h-3.5 opacity-90" />
              <div className="flex items-center space-x-1 font-mono text-[10px]">
                <Battery className="w-3.5 h-3.5 rotate-90 opacity-90" />
                <span className="font-bold">27</span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        {/* Active Tab Screen Content                                   */}
        {/* ----------------------------------------------------------- */}
        <div className="flex-1 w-full flex flex-col relative overflow-y-auto no-scrollbar">
          
          {/* TAB 1: REGAIN FOCUS SCREEN (Exact 100% match to Screenshot 1) */}
          {activeTab === 'focus' && (
            <div className="flex-1 w-full flex flex-col justify-between">
              <RegainFocusScreen
                onOpenSetupModal={() => setShowSetupModal(true)}
                onOpenGroupModal={() => setActiveTab('groups')}
                onOpenSettingsDrawer={() => setShowSettingsDrawer(true)}
              />
            </div>
          )}

          {/* TAB 2: REGAIN SCHEDULE SCREEN (Exact match to Screenshot 5) */}
          {activeTab === 'schedule' && (
            <div className="p-4 sm:p-6 animate-fadeIn pb-24">
              <RegainScheduleScreen />
            </div>
          )}

          {/* TAB 3: REGAIN GROUPS SCREEN (Exact match to Screenshot 6) */}
          {activeTab === 'groups' && (
            <div className="p-4 sm:p-6 animate-fadeIn pb-24">
              <RegainGroupsScreen user={user} />
            </div>
          )}

          {/* TAB 4: REGAIN BLOCKS SCREEN (Exact match to Screenshot 7 & Modals 2 & 3) */}
          {activeTab === 'blocks' && (
            <div className="p-4 sm:p-6 animate-fadeIn pb-24">
              <RegainBlocksScreen
                onOpenShortsTracker={() => setActiveTab('reels')}
              />
            </div>
          )}

          {/* TAB 5: BRAINPAL REELS & SHORTS COUNTER */}
          {activeTab === 'reels' && (
            <div className="p-4 sm:p-6 animate-fadeIn pb-24">
              <BrainPalReelsTracker user={user} />
            </div>
          )}

          {/* TAB 6: SCREEN TIME SCANNER & ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="p-4 sm:p-6 animate-fadeIn pb-24">
              <RegainScreenTimeAnalytics />
            </div>
          )}

        </div>

        {/* ----------------------------------------------------------- */}
        {/* Floating Bottom Navigation Dock                             */}
        {/* Universal across all screens so student can switch anytime  */}
        {/* (Exact match to ReGain App Screenshots 5, 6, 7)             */}
        {/* ----------------------------------------------------------- */}
        <FloatingBottomDock
          activeTab={activeTab}
          onSelectTab={(tabId) => {
            if (window.Android?.vibrate) window.Android.vibrate(30);
            setActiveTab(tabId);
          }}
          isEmbedded={true}
        />

        {/* Simulated Android Navigation Gestures Bar (ONLY on Desktop Phone Frame) */}
        {isPhoneFrame && !isRunningOnMobileOrApk && (
          <div className="relative z-30 py-2.5 px-8 flex items-center justify-around bg-black/60 backdrop-blur-md border-t border-white/5 select-none text-stone-500">
            {/* Recent Apps Button */}
            <div 
              onClick={() => setActiveTab(activeTab === 'focus' ? 'blocks' : 'focus')}
              className="flex flex-col space-y-0.5 cursor-pointer p-1"
              title="Recent / Switch View"
            >
              <span className="w-3.5 h-0.5 bg-stone-500 rounded-full" />
              <span className="w-3.5 h-0.5 bg-stone-500 rounded-full" />
              <span className="w-3.5 h-0.5 bg-stone-500 rounded-full" />
            </div>
            {/* Home Circle Button */}
            <div 
              onClick={() => setActiveTab('focus')}
              className="w-3.5 h-3.5 rounded-full border border-stone-500 cursor-pointer" 
              title="Home / Focus Screen"
            />
            {/* Back Chevron */}
            <div 
              onClick={() => {
                if (activeTab !== 'focus') setActiveTab('focus');
              }}
              className="text-xs font-mono font-bold cursor-pointer p-1"
              title="Back"
            >
              &lt;
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ReGain Focus Setup Sheet Modal (Exact match to Screenshot 4)  */}
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
      {/* ReGain Hamburger Settings Slide-over Drawer                   */}
      {/* ------------------------------------------------------------- */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-end animate-fadeIn">
          <div className="w-full max-w-sm bg-[#121316] border-l border-stone-800 h-full p-6 space-y-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald-400" />
                <span>ReGain Focus Controls</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSettingsDrawer(false)}
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Synthesizer Audio Volume */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
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

            {/* Study Presets */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Study Method Presets
              </span>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Pomodoro Classic</h5>
                    <p className="text-[10px] text-stone-400">25 min focus • 5 min break</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">Load ›</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Deep Work Sprint</h5>
                    <p className="text-[10px] text-stone-400">90 min focus • 15 min break</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-bold">Load ›</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowSetupModal(true);
                    setShowSettingsDrawer(false);
                  }}
                  className="w-full p-3 rounded-xl bg-stone-850 hover:bg-stone-800 border border-stone-750 text-left transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-200">Monk Mode Ultra</h5>
                    <p className="text-[10px] text-stone-400">180 min zero-interruption session</p>
                  </div>
                  <span className="text-xs text-amber-400 font-bold">Load ›</span>
                </button>
              </div>
            </div>

            {/* Quick Feature Navigators */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('blocks');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  <span>Select Apps to Block</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('reels');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-rose-400" />
                  <span>BrainPal Reels & Shorts Counter</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('schedule');
                  setShowSettingsDrawer(false);
                }}
                className="w-full p-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-200 text-xs font-bold flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Study Routines &amp; Timetable</span>
                </span>
                <ChevronRight className="w-4 h-4 text-stone-500" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
