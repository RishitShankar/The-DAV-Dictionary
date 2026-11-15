import React, { useState, useMemo } from 'react';
import { 
  Zap, Search, Sparkles, Filter, Layers, Brain, Eye, Volume2, 
  Heart, ShieldCheck, Bus, Award, ArrowRight, ArrowLeft, RefreshCw, 
  Star, CheckCircle, ExternalLink, Play, Lock, Compass, BarChart3, 
  Atom, Clock, Sliders, CheckSquare, RotateCcw
} from 'lucide-react';
import { DAV_50_HITECH_FEATURES, HITECH_CATEGORIES } from '../data/dav50HiTechFeaturesData';
import { HiTech50InteractiveModal } from './HiTech50InteractiveModal';
import { davAudio } from '../services/davAudioEngine';

export function HiTech50NexusSection({ 
  currentUser, 
  onGoToSection 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);

  // Quick explored features in local storage
  const [testedFeatureIds, setTestedFeatureIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_50_tested_features');
      return saved ? JSON.parse(saved) : [1, 11, 19, 26, 33, 39, 45, 50];
    } catch (e) {
      return [1, 11, 19, 26, 33, 39, 45, 50];
    }
  });

  const handleOpenFeatureSimulator = (feature) => {
    davAudio?.playChime?.('click');
    setActiveFeatureModal(feature);

    if (!testedFeatureIds.includes(feature.id)) {
      const updated = [...testedFeatureIds, feature.id];
      setTestedFeatureIds(updated);
      try {
        localStorage.setItem('dav_50_tested_features', JSON.stringify(updated));
      } catch (e) {}
    }
  };

  // Filtered features
  const filteredFeatures = useMemo(() => {
    return DAV_50_HITECH_FEATURES.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q) ||
          item.badge.toLowerCase().includes(q) ||
          item.targetAudience.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#030712] text-stone-100 font-sans pb-24 relative overflow-hidden select-none">
      
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Top Breadcrumb & Return to Overview */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onGoToSection?.(1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs font-bold transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Return to Campus Overview</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-stone-400 uppercase tracking-widest">
              Quantum Engine 2026 • 50 Modules Live
            </span>
          </div>
        </div>

        {/* Master Futuristic Hero Header */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-stone-900/90 via-stone-950/90 to-purple-950/40 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Atom className="w-64 h-64 text-amber-400 animate-spin" style={{ animationDuration: '60s' }} />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>THE DAV DICTIONARY • NEXT-GEN QUANTUM INNOVATIONS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              50 Hi-Tech Features <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-purple-400 bg-clip-text text-transparent">
                Next-Gen Academic & Tech Ecosystem
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              Explore 50 workable cutting-edge technologies engineered for DAV Public Schools. From 
              Vedic Socratic AI and edge computer vision to 3D ray-tracing physics, dual-camera AI proctoring, 
              real-time IoT bus telemetry, and interactive Sanskrit speech synthesis.
            </p>

            {/* Quick Live Stats Telemetry Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Innovations Active</span>
                <span className="text-lg font-black text-white">50 / 50</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Simulators Ready</span>
                <span className="text-lg font-black text-amber-400">100% Workable</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Tested by You</span>
                <span className="text-lg font-black text-emerald-400">{testedFeatureIds.length} / 50</span>
              </div>
              <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800">
                <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Core Domains</span>
                <span className="text-lg font-black text-cyan-400">7 Disciplines</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Live Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 50 features (e.g. Socratic, AR Protractor, Vedic Chanting, Bus Telemetry, Proctoring)..."
                className="w-full pl-11 pr-4 py-3 bg-stone-900/90 border border-stone-800 rounded-2xl text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-stone-400 font-mono whitespace-nowrap">
              Showing <strong className="text-white">{filteredFeatures.length}</strong> of 50 Innovations
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {HITECH_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  davAudio?.playChime?.('click');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-black'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-stone-950/30 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 50 Features Cyber-Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFeatures.map(item => {
            const isTested = testedFeatureIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="group relative p-5 rounded-3xl bg-stone-900/60 hover:bg-stone-900/90 border border-stone-800/80 hover:border-amber-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Glow Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent group-hover:via-amber-400 transition-all" />

                <div className="space-y-3">
                  {/* Card Header & Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 font-mono font-black text-xs text-amber-400 flex items-center justify-center shrink-0">
                      #{item.id}
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5 justify-end">
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {item.badge}
                      </span>
                      {isTested && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5" />
                          <span>Tested</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tag */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                      {item.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 mt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-stone-500">
                    For: <strong className="text-stone-300">{item.targetAudience}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleOpenFeatureSimulator(item)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 shadow-sm group-hover:shadow-amber-500/20"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Launch Simulator</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Fast Launch Banner */}
        <div className="p-6 rounded-3xl bg-stone-900/40 border border-stone-800 text-center space-y-3">
          <p className="text-xs text-stone-400">
            All 50 innovations are wired into the platform architecture, accessible throughout 
            Section 1 (Campus Overview), Section 8 (Exams), Section 9 (Focus Suite), and the Global Command Palette (<kbd className="px-1.5 py-0.5 bg-stone-800 rounded font-mono text-[10px] text-amber-300">Ctrl+K</kbd>).
          </p>
          <button
            type="button"
            onClick={() => handleOpenFeatureSimulator(DAV_50_HITECH_FEATURES[0])}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 font-black text-xs hover:shadow-lg transition inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Innovation #1 (Vedic Socratic AI Tutor)</span>
          </button>
        </div>

      </div>

      {/* Interactive Modal Workbench */}
      {activeFeatureModal && (
        <HiTech50InteractiveModal
          feature={activeFeatureModal}
          isOpen={Boolean(activeFeatureModal)}
          onClose={() => setActiveFeatureModal(null)}
          onSelectFeature={(feat) => setActiveFeatureModal(feat)}
        />
      )}

    </div>
  );
}
