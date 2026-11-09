import React, { useState, useEffect } from 'react';
import {
  Shield, Plus, HelpCircle, X, Search, ChevronDown, ChevronUp,
  Lock, Zap, Check, Play, Film, Globe, EyeOff, Sliders, Smartphone,
  AlertTriangle, Flame, ArrowRight, ExternalLink
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';
import { RegainInterventionOverlay } from './RegainInterventionOverlay';

export function RegainBlocksScreen({ onOpenShortsTracker }) {
  const [appBlocks, setAppBlocks] = useState(() => focusDataStore.getAppBlocks());
  const [showSelectorModal, setShowSelectorModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [distractingOpen, setDistractingOpen] = useState(true);
  const [configuringApp, setConfiguringApp] = useState(null);
  const [tempLimitMinutes, setTempLimitMinutes] = useState(60);

  // Simulated Launch Interception State
  const [interceptedApp, setInterceptedApp] = useState(null);

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'app_blocks_updated') {
        setAppBlocks(data);
      }
    });
    return unsub;
  }, []);

  const handleToggleShorts = (shortsId) => {
    const updated = focusDataStore.toggleShortsBlock(shortsId);
    setAppBlocks(updated);
  };

  const handleToggleApp = (appId, field = 'blockedCompletely') => {
    const updated = focusDataStore.toggleAppBlock(appId, field);
    setAppBlocks(updated);
  };

  const handleSaveAppLimit = () => {
    if (!configuringApp) return;
    const updated = focusDataStore.setAppDailyLimit(configuringApp.id, tempLimitMinutes);
    setAppBlocks(updated);
    setConfiguringApp(null);
  };

  const formatLimit = (mins) => {
    if (!mins || mins === 0) return 'No Limit';
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0 && m > 0) return `${h}h ${m}m Limit`;
    if (h > 0) return `${h}h Limit`;
    return `${m}m Limit`;
  };

  const simulateAppLaunch = (app) => {
    setInterceptedApp({
      name: app.name,
      icon: app.name === 'YouTube' ? '▶' : app.name.charAt(0),
      dailyUsageMinutes: 38,
      dailyLimitMinutes: app.dailyLimitMinutes || 30
    });
  };

  const filteredItems = appBlocks.items.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const youtubeApp = appBlocks.items.find(a => a.id === 'youtube');
  const chromeApp = appBlocks.items.find(a => a.id === 'chrome');
  const whatsappApp = appBlocks.items.find(a => a.id === 'whatsapp');
  const otherApps = filteredItems.filter(a => a.id !== 'youtube' && a.id !== 'chrome');

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* ------------------------------------------------------------- */}
      {/* Top Header: "Blocks" + "... Help"                             */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Blocks</h2>
        <button
          onClick={() => alert('Blocks shield your focus by locking short-form feeds, setting hard daily app usage limits, and neutralizing adult/distracting domains.')}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-300 hover:text-white transition-all"
        >
          <span>💬 Help</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Section 1: "App Limits" + "+ Add App"                         */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">App Limits</h3>
          <button
            onClick={() => setShowSelectorModal(true)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>+ Add App</span>
          </button>
        </div>

        {/* Dashed Border Cards for YouTube & WhatsApp (Matches Screenshot) */}
        <div className="space-y-2.5">
          {/* Card 1: YouTube */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-stone-800/90 bg-[#16171a] flex items-center justify-between">
            <div
              onClick={() => simulateAppLaunch(youtubeApp)}
              className="flex items-center space-x-3.5 cursor-pointer group"
              title="Click to test simulated launch interception"
            >
              {/* Red YouTube Circular Logo */}
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/40 flex-shrink-0 group-hover:scale-105 transition-transform">
                <Play className="w-6 h-6 fill-white text-white ml-0.5" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">YouTube</h4>
                  <span className="text-[10px] text-stone-500 font-normal">(Click to test launch)</span>
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  {formatLimit(youtubeApp?.dailyLimitMinutes || 100)}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setConfiguringApp(youtubeApp);
                setTempLimitMinutes(youtubeApp?.dailyLimitMinutes || 100);
              }}
              className="px-4 py-1.5 rounded-full bg-stone-800/90 hover:bg-stone-700 border border-stone-700/60 text-xs font-bold text-stone-200 flex items-center space-x-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-stone-800/90 bg-[#16171a] flex items-center justify-between">
            <div
              onClick={() => simulateAppLaunch(whatsappApp)}
              className="flex items-center space-x-3.5 cursor-pointer group"
              title="Click to test simulated launch interception"
            >
              {/* Green WhatsApp Circular Logo */}
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-green-900/40 flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="text-xl font-bold">💬</span>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">WhatsApp</h4>
                  <span className="text-[10px] text-stone-500 font-normal">(Click to test launch)</span>
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  {formatLimit(whatsappApp?.dailyLimitMinutes || 40)}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setConfiguringApp(whatsappApp);
                setTempLimitMinutes(whatsappApp?.dailyLimitMinutes || 40);
              }}
              className="px-4 py-1.5 rounded-full bg-stone-800/90 hover:bg-stone-700 border border-stone-700/60 text-xs font-bold text-stone-200 flex items-center space-x-1 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Section 2: "Block Shorts" with yellow "PRO" badge             */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-2">
          <h3 className="text-base font-bold text-white">Block Shorts</h3>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F59E0B] text-stone-950">
            PRO
          </span>
        </div>

        {/* 4 Cards: YouTube Shorts, IG Reels, Snapchat Spotlight, FB Reels */}
        <div className="space-y-2.5">
          {/* Card 1: YouTube Shorts */}
          <div className="p-4 rounded-2xl bg-[#1c1d21] border border-stone-800 hover:border-stone-700 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                <Film className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">YouTube Shorts</h4>
                <p className="text-[11px] text-stone-400">Neutralize short-form video feed</p>
              </div>
            </div>

            <button
              onClick={() => handleToggleShorts('yt_shorts')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 transition-all ${
                appBlocks.shortsBlocks?.find(s => s.id === 'yt_shorts')?.blocked
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {appBlocks.shortsBlocks?.find(s => s.id === 'yt_shorts')?.blocked ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Blocked</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: IG Reels */}
          <div className="p-4 rounded-2xl bg-[#1c1d21] border border-stone-800 hover:border-stone-700 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-500">
                <Film className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">IG Reels</h4>
                <p className="text-[11px] text-stone-400">Block Instagram reels player & explore feed</p>
              </div>
            </div>

            <button
              onClick={() => handleToggleShorts('ig_reels')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 transition-all ${
                appBlocks.shortsBlocks?.find(s => s.id === 'ig_reels')?.blocked
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {appBlocks.shortsBlocks?.find(s => s.id === 'ig_reels')?.blocked ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Blocked</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Snapchat Spotlight */}
          <div className="p-4 rounded-2xl bg-[#1c1d21] border border-yellow-400/30 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center text-yellow-300">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Snapchat Spotlight</h4>
                <p className="text-[11px] text-stone-400">Prevent endless vertical snaps</p>
              </div>
            </div>

            <button
              onClick={() => handleToggleShorts('snap_spotlight')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 transition-all ${
                appBlocks.shortsBlocks?.find(s => s.id === 'snap_spotlight')?.blocked
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {appBlocks.shortsBlocks?.find(s => s.id === 'snap_spotlight')?.blocked ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Blocked</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>

          {/* Card 4: Facebook Reels */}
          <div className="p-4 rounded-2xl bg-[#1c1d21] border border-stone-800 hover:border-stone-700 flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Facebook Reels</h4>
                <p className="text-[11px] text-stone-400">Disable video watch tab autoplay</p>
              </div>
            </div>

            <button
              onClick={() => handleToggleShorts('fb_reels')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1 transition-all ${
                appBlocks.shortsBlocks?.find(s => s.id === 'fb_reels')?.blocked
                  ? 'bg-emerald-500 text-stone-950 shadow-md'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {appBlocks.shortsBlocks?.find(s => s.id === 'fb_reels')?.blocked ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Blocked</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* "Select Apps to Block" Modal (Exact match to Screenshots)     */}
      {/* ------------------------------------------------------------- */}
      {showSelectorModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-[#141517] border border-stone-800 rounded-t-[36px] sm:rounded-[36px] p-6 space-y-4 shadow-2xl text-white max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <h3 className="text-base font-bold text-white">Select Apps to Block</h3>
              <button
                onClick={() => setShowSelectorModal(false)}
                className="w-8 h-8 rounded-full bg-stone-850 flex items-center justify-center text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search apps"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Item 1: YouTube Group with Sub-toggles */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-md">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">YouTube</h4>
                    <p className="text-[11px] text-stone-400">
                      {youtubeApp?.blockedCompletely ? 'Blocked completely' : 'Configured'}
                    </p>
                  </div>
                </div>

                {/* Master Toggle */}
                <button
                  onClick={() => handleToggleApp('youtube', 'blockedCompletely')}
                  className={`w-12 h-7 rounded-full p-1 transition-colors relative ${
                    youtubeApp?.blockedCompletely ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                      youtubeApp?.blockedCompletely ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-toggle: Block Shorts */}
              <div className="flex items-center justify-between pl-4 pt-1 border-t border-stone-800/60">
                <div className="flex items-center space-x-2.5">
                  <Film className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-300">Block Shorts</span>
                </div>
                <button
                  onClick={() => handleToggleApp('youtube', 'blockShorts')}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                    youtubeApp?.blockShorts ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                      youtubeApp?.blockShorts ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-toggle: Block homepage */}
              <div className="flex items-center justify-between pl-4 pt-1">
                <div className="flex items-center space-x-2.5">
                  <EyeOff className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-300">Block homepage</span>
                </div>
                <button
                  onClick={() => handleToggleApp('youtube', 'blockHomepage')}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                    youtubeApp?.blockHomepage ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                      youtubeApp?.blockHomepage ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-toggle: Study Mode */}
              <div className="flex items-center justify-between pl-4 pt-1">
                <div className="flex items-center space-x-2.5">
                  <Play className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-300">Study Mode (Allow only DAV Lectures)</span>
                </div>
                <button
                  onClick={() => handleToggleApp('youtube', 'studyMode')}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                    youtubeApp?.studyMode ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                      youtubeApp?.studyMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Item 2: Browser apps (Chrome) Group */}
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Browser apps</h4>
                    <p className="text-[11px] text-stone-400">
                      {chromeApp?.blockedCompletely ? 'Blocked completely' : 'Protected'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleApp('chrome', 'blockedCompletely')}
                  className={`w-12 h-7 rounded-full p-1 transition-colors relative ${
                    chromeApp?.blockedCompletely ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                      chromeApp?.blockedCompletely ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-toggle: Block adult content */}
              <div className="flex items-center justify-between pl-4 pt-1 border-t border-stone-800/60">
                <div className="flex items-center space-x-2.5">
                  <Shield className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-300">Block adult content</span>
                </div>
                <button
                  onClick={() => handleToggleApp('chrome', 'blockAdultContent')}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                    chromeApp?.blockAdultContent ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                      chromeApp?.blockAdultContent ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Sub-toggle: Study Mode */}
              <div className="flex items-center justify-between pl-4 pt-1">
                <div className="flex items-center space-x-2.5">
                  <Globe className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-300">Study Mode</span>
                </div>
                <button
                  onClick={() => handleToggleApp('chrome', 'studyMode')}
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                    chromeApp?.studyMode ? 'bg-emerald-500' : 'bg-stone-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                      chromeApp?.studyMode ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Accordion Group: Distracting */}
            <div className="rounded-2xl bg-stone-900/80 border border-stone-800 overflow-hidden">
              <div
                onClick={() => setDistractingOpen(!distractingOpen)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-stone-850 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${distractingOpen ? 'rotate-180' : ''}`} />
                  <span className="text-sm font-bold text-white">Distracting</span>
                </div>

                <div className="w-10 h-6 rounded-full bg-stone-700 p-0.5">
                  <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>

              {distractingOpen && (
                <div className="divide-y divide-stone-800/60 px-4 pb-2">
                  {otherApps.map((app) => (
                    <div key={app.id} className="py-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-xs font-bold text-stone-200">
                          {app.name.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-stone-200">{app.name}</span>
                      </div>

                      <button
                        onClick={() => handleToggleApp(app.id, 'blockedCompletely')}
                        className={`w-10 h-6 rounded-full p-0.5 transition-colors relative ${
                          app.blockedCompletely ? 'bg-emerald-500' : 'bg-stone-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform transform ${
                            app.blockedCompletely ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* App Daily Limit Slider Config Modal                           */}
      {/* ------------------------------------------------------------- */}
      {configuringApp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 text-white">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              <span>Set Limit: {configuringApp.name}</span>
            </h3>

            <div className="text-center py-4 bg-stone-950 rounded-2xl border border-stone-800">
              <span className="text-3xl font-black text-emerald-400 font-mono">
                {formatLimit(tempLimitMinutes)}
              </span>
              <p className="text-[11px] text-stone-500 mt-1">Daily allowable allowance</p>
            </div>

            <input
              type="range"
              min="0"
              max="240"
              step="10"
              value={tempLimitMinutes}
              onChange={(e) => setTempLimitMinutes(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>0 (Blocked)</span>
              <span>1h</span>
              <span>2h</span>
              <span>4h</span>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setConfiguringApp(null)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 text-xs font-semibold text-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAppLimit}
                className="flex-1 py-2.5 rounded-xl bg-white text-xs font-black text-stone-950 shadow-lg"
              >
                Save Limit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Simulated App Launch Interceptor Overlay                      */}
      {/* ------------------------------------------------------------- */}
      {interceptedApp && (
        <RegainInterventionOverlay
          isOpen={true}
          appName={interceptedApp.name}
          appIcon={interceptedApp.icon}
          dailyUsageMinutes={interceptedApp.dailyUsageMinutes}
          dailyLimitMinutes={interceptedApp.dailyLimitMinutes}
          onDismiss={() => setInterceptedApp(null)}
          onGrantBypass={() => {
            alert(`5-Minute Pass granted for ${interceptedApp.name}. Lock will resume after 5 mins.`);
          }}
        />
      )}
    </div>
  );
}
