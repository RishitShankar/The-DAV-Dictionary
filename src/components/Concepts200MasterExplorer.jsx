import React, { useState, useMemo } from 'react';
import { 
  Layers, Search, Sparkles, Star, CheckCircle2, ChevronRight, 
  ArrowRight, ArrowLeft, Filter, Zap, Play, ExternalLink, 
  FlaskConical, FileText, ShieldCheck, Trophy, Eye, Check
} from 'lucide-react';
import { 
  DAV_200_PLATFORM_CONCEPTS, 
  CONCEPT_CATEGORIES_200 
} from '../data/dav200PlatformConceptsData';

export function Concepts200MasterExplorer({ 
  onOpenCommandPalette, 
  onOpenVirtualLab, 
  onOpenMistakeVault, 
  onOpenAdmitCard,
  onGoToSection
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImpact, setSelectedImpact] = useState('all');

  // Explored concepts storage
  const [exploredIds, setExploredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_200_explored');
      return saved ? JSON.parse(saved) : [1, 2, 3, 26, 46, 71, 107, 123, 155, 171, 188];
    } catch (e) {
      return [1, 2, 3, 26, 46, 71, 107, 123, 155, 171, 188];
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
    if (concept.id === 26 || concept.demoType === 'command_palette') {
      onOpenCommandPalette?.();
    } else if (concept.id === 123 || concept.id === 133 || concept.id === 134 || concept.demoType === 'virtual_lab') {
      onOpenVirtualLab?.();
    } else if (concept.id === 155 || concept.id === 156 || concept.demoType === 'mistake_vault') {
      onOpenMistakeVault?.();
    } else if (concept.id === 188 || concept.demoType === 'admit_card') {
      onOpenAdmitCard?.();
    } else if (concept.category === 'EdTech Power Features') {
      onGoToSection?.(8);
    } else if (concept.category === 'Navigation & Search') {
      onGoToSection?.(1);
    } else {
      onOpenCommandPalette?.();
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
                className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-amber-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>Spotlight (Ctrl+K)</span>
              </button>

              <button
                onClick={onOpenVirtualLab}
                className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-cyan-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                <span>Virtual 3D Lab</span>
              </button>

              <button
                onClick={onOpenMistakeVault}
                className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-rose-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Mistake Vault</span>
              </button>

              <button
                onClick={onOpenAdmitCard}
                className="px-4 py-2 bg-stone-900 border border-stone-800 hover:border-emerald-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>QR Admit Card</span>
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
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 200 concepts (e.g. 'Virtual Lab', 'Bento Grid', 'OLED', 'Admit Card', 'Mind Map', 'Dynamic Island')..."
              className="w-full bg-stone-900/90 border border-stone-800 focus:border-amber-400 rounded-2xl py-3.5 pl-12 pr-10 text-sm text-white placeholder-stone-500 focus:outline-none transition shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {CONCEPT_CATEGORIES_200.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-stone-950 font-black shadow-md'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat.id ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Impact Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-mono text-[11px] uppercase mr-1">Impact Level:</span>
            {['all', 'Very High Impact', 'High Impact', 'Medium Impact'].map(imp => (
              <button
                key={imp}
                onClick={() => setSelectedImpact(imp)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  selectedImpact === imp
                    ? 'bg-stone-700 text-amber-300 font-bold border border-amber-400/40'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {imp === 'all' ? 'All Impacts' : imp}
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            200 CONCEPTS GRID SHOWCASE
        ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
            <span>Showing {filtered.length} of {DAV_200_PLATFORM_CONCEPTS.length} platform concepts</span>
            <span>Click any concept card to test or mark explored</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(c => {
              const isExplored = exploredIds.includes(c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => handleLaunchConceptDemo(c)}
                  className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl cursor-pointer group ${
                    isExplored
                      ? 'bg-gradient-to-b from-stone-900/95 to-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-stone-900/90 border-stone-800 hover:border-amber-400/60 hover:shadow-2xl'
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
                        <span>Launch Interactive Feature</span>
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

      </div>
    </div>
  );
}
