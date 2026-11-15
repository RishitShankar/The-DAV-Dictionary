import React, { useState, useMemo } from 'react';
import { 
  Layers, Search, Sparkles, Star, CheckCircle2, ChevronRight, 
  ArrowRight, ArrowLeft, Filter, Zap, Play, ExternalLink, 
  FlaskConical, FileText, ShieldCheck, Trophy, Eye, Check, X,
  Atom, Music, Calculator, Sliders, Bus, Volume2, Flame, SlidersHorizontal
} from 'lucide-react';
import { 
  DAV_200_PLATFORM_CONCEPTS, 
  CONCEPT_CATEGORIES_200 
} from '../data/dav200PlatformConceptsData';
import { davAudio } from '../services/davAudioEngine';
import { addScholasticXp } from '../services/scholasticGamificationStore';

export function Concepts200MasterExplorer({ 
  onOpenCommandPalette, 
  onOpenVirtualLab, 
  onOpenMistakeVault, 
  onOpenAdmitCard,
  onOpenPeriodicTable,
  onOpenBusTelemetry,
  onOpenAnthemPlayer,
  onOpenFormulaSheet,
  onOpenAccessibility,
  onGoToSection
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');
  const [activeConceptModal, setActiveConceptModal] = useState(null);

  // Sandbox interactive state
  const [sandboxTheme, setSandboxTheme] = useState('saffron');
  const [sandboxBlur, setSandboxBlur] = useState(16);
  const [sandboxXpFeedback, setSandboxXpFeedback] = useState(null);

  // Explored concepts storage
  const [exploredIds, setExploredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_200_explored');
      return saved ? JSON.parse(saved) : [1, 2, 3, 26, 46, 71, 96, 98, 107, 122, 123, 155, 171, 188];
    } catch (e) {
      return [1, 2, 3, 26, 46, 71, 96, 98, 107, 122, 123, 155, 171, 188];
    }
  });

  const toggleExplored = (id) => {
    setExploredIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('dav_200_explored', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleLaunchConceptDemo = (concept) => {
    toggleExplored(concept.id);

    // Map to flagship modals if applicable
    if (concept.id === 107) {
      onOpenPeriodicTable?.();
    } else if (concept.id === 96 || concept.id === 195) {
      onOpenBusTelemetry?.();
    } else if (concept.id === 98 || concept.id === 114 || concept.id === 129) {
      onOpenAnthemPlayer?.();
    } else if (concept.id === 122 || concept.id === 136 || concept.id === 146) {
      onOpenFormulaSheet?.();
    } else if ((concept.id >= 171 && concept.id <= 190) && concept.id !== 171 && concept.id !== 188) {
      onOpenAccessibility?.();
    } else if (concept.id === 26 || concept.demoType === 'command_palette') {
      onOpenCommandPalette?.();
    } else if (concept.id === 123 || concept.id === 133 || concept.id === 134 || concept.demoType === 'virtual_lab') {
      onOpenVirtualLab?.();
    } else if (concept.id === 155 || concept.id === 156 || concept.demoType === 'mistake_vault') {
      onOpenMistakeVault?.();
    } else if (concept.id === 188 || concept.demoType === 'admit_card') {
      onOpenAdmitCard?.();
    } else {
      // Open in-line interactive concept sandbox drawer
      setActiveConceptModal(concept);
    }
  };

  // Filtered concepts
  const filtered = useMemo(() => {
    return DAV_200_PLATFORM_CONCEPTS.filter(c => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) {
        return false;
      }
      if (selectedImpact !== 'all' && c.impactLevel !== selectedImpact) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesDesc = c.description.toLowerCase().includes(q);
        const matchesCat = c.category.toLowerCase().includes(q);
        const matchesId = c.id.toString() === q.replace('#', '');
        return matchesTitle || matchesDesc || matchesCat || matchesId;
      }
      return true;
    });
  }, [selectedCategory, selectedImpact, searchQuery]);

  const progressPercent = Math.round((exploredIds.length / DAV_200_PLATFORM_CONCEPTS.length) * 100);

  const handleTestXpAward = (amount = 25) => {
    const updated = addScholasticXp(amount, '200 Concepts Sandbox Exploration');
    davAudio.playChime('success');
    setSandboxXpFeedback(`+${amount} XP Awarded! New Total: ${updated.xp}`);
    setTimeout(() => setSandboxXpFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-[#0d0e12] to-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* =========================================================================
            HEADER & PROGRESS RADAR
        ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Complete 200 Master Platform Concepts • DAVDixence</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                200 Website Design &amp; Feature Concepts Architecture
              </h1>
              <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-2xl leading-relaxed">
                A grand master catalog of 200 cutting-edge UI/UX, cognitive AI, 3D spatial sensory, collaborative, examination diagnostic, and enterprise ERP concepts engineered for DAV Public School, Khabra.
              </p>
            </div>

            {/* Architecture Explored Gauge */}
            <div className="w-full lg:w-72 bg-stone-950/80 rounded-2xl p-4 border border-stone-800 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Architecture Explored</span>
                </span>
                <span className="text-amber-400 font-mono font-black">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(progressPercent, 4)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{exploredIds.length} of {DAV_200_PLATFORM_CONCEPTS.length} Tested</span>
                <span>11 Phases Active</span>
              </div>
            </div>
          </div>

          {/* Quick Trigger Buttons */}
          <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={onOpenCommandPalette}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-amber-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Spotlight (Ctrl+K)</span>
              </button>

              <button
                onClick={onOpenPeriodicTable}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-purple-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Atom className="w-3.5 h-3.5 text-purple-400" />
                <span>Periodic Table #107</span>
              </button>

              <button
                onClick={onOpenBusTelemetry}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-cyan-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bus Telemetry #96</span>
              </button>

              <button
                onClick={onOpenAnthemPlayer}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-amber-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>DAV Anthem #98</span>
              </button>

              <button
                onClick={onOpenFormulaSheet}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-emerald-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>Formula Sheet #122</span>
              </button>

              <button
                onClick={onOpenAccessibility}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-teal-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                <span>Accessibility #172</span>
              </button>

              <button
                onClick={onOpenVirtualLab}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-cyan-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                <span>Virtual Lab #123</span>
              </button>

              <button
                onClick={onOpenMistakeVault}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-rose-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Mistake Vault #155</span>
              </button>

              <button
                onClick={onOpenAdmitCard}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-emerald-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>QR Admit Card #188</span>
              </button>
            </div>

            {onGoToSection && (
              <button
                onClick={() => onGoToSection(1)}
                className="text-stone-400 hover:text-amber-400 transition flex items-center gap-1"
              >
                <span>← Back to Overview Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            SEARCH & CATEGORY FILTERS
        ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all 200 concepts (e.g. Bento, Glassmorphism, Bus, Streak, Periodic, PWA)..."
                className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Impact Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-stone-400 shrink-0" />
              <select
                value={selectedImpact}
                onChange={(e) => setSelectedImpact(e.target.value)}
                className="bg-stone-900/90 border border-stone-800 rounded-2xl px-4 py-3 text-xs font-semibold text-stone-300 focus:outline-none focus:border-amber-400 w-full md:w-auto"
              >
                <option value="all">All Impact Levels</option>
                <option value="Very High Impact">Very High Impact</option>
                <option value="High Impact">High Impact</option>
                <option value="Medium Impact">Medium Impact</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              All Categories (200)
            </button>
            {CONCEPT_CATEGORIES_200.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            200 CONCEPTS CARDS GRID
        ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1 font-mono">
            <span>Showing {filtered.length} of 200 platform concepts</span>
            <span>Click any concept card to launch sandbox or interactive module</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((c) => {
              const isExplored = exploredIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => handleLaunchConceptDemo(c)}
                  className={`group relative rounded-3xl transition-all duration-300 border flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isExplored
                      ? 'bg-gradient-to-b from-stone-900/95 to-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-stone-900/90 border-stone-800 hover:border-amber-400/60 hover:shadow-2xl hover:scale-[1.01]'
                  }`}
                >
                  {/* Top Category Strip */}
                  <div className={`h-1.5 w-full ${
                    c.phaseNumber <= 2 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                    c.phaseNumber <= 4 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
                    c.phaseNumber <= 6 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    c.phaseNumber <= 8 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                    'bg-gradient-to-r from-rose-500 to-red-600'
                  }`} />

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                          #{c.id} • Phase {c.phaseNumber}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            c.impactLevel === 'Very High Impact' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' :
                            c.impactLevel === 'High Impact' ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {c.impactLevel}
                          </span>
                          {c.keyboardShortcut && (
                            <span className="text-[10px] font-mono bg-stone-800 border border-stone-700 text-stone-300 px-1.5 py-0.5 rounded">
                              {c.keyboardShortcut}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wide mb-1">
                        {c.category}
                      </div>

                      <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {c.title}
                      </h3>

                      <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                        {c.description}
                      </p>
                    </div>

                    {/* Bottom Status & Demo Launcher */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-stone-400 group-hover:text-amber-300 transition flex items-center gap-1">
                        <span>Launch Sandbox Demo</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExplored(c.id);
                        }}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                          isExplored 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        {isExplored ? (
                          <><Check className="w-3 h-3 text-emerald-400" /> Explored</>
                        ) : (
                          <span>Mark Explored</span>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE CONCEPT SANDBOX DRAWER / MODAL
        ========================================================================= */}
        {activeConceptModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl overflow-hidden font-sans border-amber-500/30">
              
              {/* Sandbox Header */}
              <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                    #{activeConceptModal.id}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-100 flex items-center gap-2">
                      <span>{activeConceptModal.title}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Phase {activeConceptModal.phaseNumber}
                      </span>
                    </h3>
                    <p className="text-xs text-stone-400">{activeConceptModal.category} • {activeConceptModal.impactLevel}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveConceptModal(null)}
                  className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sandbox Body */}
              <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                
                {/* Description & Blueprint */}
                <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Architectural Blueprint &amp; Feature Specification
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {activeConceptModal.description}
                  </p>
                  <div className="pt-2 flex items-center gap-3 text-[11px] text-stone-400 font-mono">
                    <span>Badge: <strong className="text-stone-200">{activeConceptModal.badge}</strong></span>
                    {activeConceptModal.keyboardShortcut && (
                      <span>Shortcut: <kbd className="px-1.5 py-0.5 bg-stone-800 rounded border border-stone-700 text-amber-300 font-bold">{activeConceptModal.keyboardShortcut}</kbd></span>
                    )}
                  </div>
                </div>

                {/* Live Sandbox Interactive Demonstration */}
                <div className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-200 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Live Interactive Sandbox Controls</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">Status: Active &amp; Tested</span>
                  </div>

                  {/* Sandbox Type: Visual / Aesthetic */}
                  {activeConceptModal.category === 'Visual & Aesthetic Design' && (
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between text-stone-400 text-[11px]">
                        <span>Glass Backdrop Blur: {sandboxBlur}px</span>
                        <span>Theme: {sandboxTheme}</span>
                      </div>
                      <input 
                        type="range" 
                        min="4" 
                        max="32" 
                        value={sandboxBlur}
                        onChange={(e) => setSandboxBlur(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-2">
                        {['saffron', 'neon', 'emerald', 'crimson'].map(t => (
                          <button
                            key={t}
                            onClick={() => setSandboxTheme(t)}
                            className={`px-3 py-1 rounded-lg text-[11px] font-semibold capitalize border ${
                              sandboxTheme === t 
                                ? 'bg-amber-500 text-stone-950 font-bold border-amber-400' 
                                : 'bg-stone-900 border-stone-700 text-stone-300'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      {/* Interactive Visual Glass Tile */}
                      <div 
                        className={`p-4 rounded-2xl border transition-all text-center ${
                          sandboxTheme === 'saffron' ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' :
                          sandboxTheme === 'neon' ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' :
                          sandboxTheme === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' :
                          'bg-rose-500/10 border-rose-500/40 text-rose-300'
                        }`}
                        style={{ backdropFilter: `blur(${sandboxBlur}px)` }}
                      >
                        <Sparkles className="w-6 h-6 mx-auto mb-1 animate-pulse" />
                        <span className="font-bold block text-sm">Glassmorphic Elevation Preview</span>
                        <span className="text-[11px] opacity-75">Cyber-Gurukul Hybrid Aesthetics Engine</span>
                      </div>
                    </div>
                  )}

                  {/* Sandbox Type: Gamification & SFX */}
                  {(activeConceptModal.category === 'Gamification & Retention' || activeConceptModal.id === 84) && (
                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => davAudio.playChime('bell')}
                          className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 flex items-center justify-center gap-2 text-stone-200"
                        >
                          <Volume2 className="w-4 h-4 text-amber-400" />
                          <span>Play Temple Bell Chime</span>
                        </button>
                        <button
                          onClick={() => davAudio.playChime('level_up')}
                          className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-emerald-400 flex items-center justify-center gap-2 text-stone-200"
                        >
                          <Trophy className="w-4 h-4 text-emerald-400" />
                          <span>Play Victory Arpeggio</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handleTestXpAward(50)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold shadow-md flex items-center justify-center gap-2"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Award +50 Scholastic XP (Test Store Persistence)</span>
                      </button>

                      {sandboxXpFeedback && (
                        <div className="text-center font-mono font-bold text-emerald-400 text-xs animate-in fade-in">
                          {sandboxXpFeedback}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sandbox Type: School Systems or EdTech */}
                  {activeConceptModal.category !== 'Visual & Aesthetic Design' && activeConceptModal.category !== 'Gamification & Retention' && (
                    <div className="space-y-2 text-xs">
                      <p className="text-stone-300">
                        This concept is fully integrated into the DAVDixence platform architecture. You can test audio triggers, explore live data telemetry, or launch the master sub-module.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          onClick={() => davAudio.playChime('success')}
                          className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 flex items-center gap-1.5"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Audio Acoustic Cue</span>
                        </button>
                        <button
                          onClick={() => handleTestXpAward(20)}
                          className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-emerald-400 text-stone-200 flex items-center gap-1.5"
                        >
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          <span>Trigger Retain XP</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Sandbox Footer */}
              <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/70 text-xs text-stone-500 flex items-center justify-between">
                <button
                  onClick={() => {
                    toggleExplored(activeConceptModal.id);
                    setActiveConceptModal(null);
                  }}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark as Explored &amp; Close</span>
                </button>
                <span>DAVDixence Architectural Concept #{activeConceptModal.id}</span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
