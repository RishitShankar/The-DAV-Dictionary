import React, { useState, useMemo } from 'react';
import { 
  Layers, Search, Sparkles, Star, CheckCircle2, ChevronRight, 
  ArrowRight, ArrowLeft, Filter, Zap, Play, ExternalLink, 
  FlaskConical, FileText, ShieldCheck, Trophy, Eye, Check, X,
  Atom, Music, Calculator, Sliders, Bus, Volume2, Flame, Award,
  Compass, Heart, Users, Calendar, HelpCircle
} from 'lucide-react';
import { 
  DAV_300_FUTURE_FEATURES, 
  FEATURE_CATEGORIES_300 
} from '../data/dav300FutureFeaturesData';
import { davAudio } from '../services/davAudioEngine';
import { addScholasticXp } from '../services/scholasticGamificationStore';
import { Features300InteractiveSandboxModal } from './Features300InteractiveSandboxModal';

export function Features300MasterExplorer({ 
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
  const [activeFeatureModal, setActiveFeatureModal] = useState(null);

  // Explored features storage
  const [exploredIds, setExploredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_300_explored');
      return saved ? JSON.parse(saved) : [1, 2, 8, 31, 32, 61, 91, 121, 128, 151, 181, 211, 216, 241, 271, 274, 300];
    } catch (e) {
      return [1, 2, 8, 31, 32, 61, 91, 121, 128, 151, 181, 211, 216, 241, 271, 274, 300];
    }
  });

  const toggleExplored = (id) => {
    setExploredIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('dav_300_explored', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleLaunchFeatureDemo = (feat) => {
    toggleExplored(feat.id);
    setActiveFeatureModal(feat);
    davAudio.playChime('click');
  };

  const handleLaunchSpecialty = (key) => {
    setActiveFeatureModal(null);
    if (key === 'periodic_table') onOpenPeriodicTable?.();
    else if (key === 'bus_telemetry') onOpenBusTelemetry?.();
    else if (key === 'anthem_player') onOpenAnthemPlayer?.();
    else if (key === 'formula_sheet') onOpenFormulaSheet?.();
    else if (key === 'accessibility') onOpenAccessibility?.();
    else if (key === 'command_palette') onOpenCommandPalette?.();
    else if (key === 'virtual_lab') onOpenVirtualLab?.();
    else if (key === 'mistake_vault') onOpenMistakeVault?.();
    else if (key === 'admit_card') onOpenAdmitCard?.();
  };

  // Filtered features
  const filtered = useMemo(() => {
    return DAV_300_FUTURE_FEATURES.filter(f => {
      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }
      if (selectedImpact !== 'all' && f.impactLevel !== selectedImpact) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesDesc = f.description.toLowerCase().includes(q);
        const matchesCat = f.category.toLowerCase().includes(q);
        const matchesDomain = f.domain.toLowerCase().includes(q);
        const matchesId = f.id.toString() === q.replace('#', '');
        return matchesTitle || matchesDesc || matchesCat || matchesDomain || matchesId;
      }
      return true;
    });
  }, [selectedCategory, selectedImpact, searchQuery]);

  const progressPercent = Math.round((exploredIds.length / DAV_300_FUTURE_FEATURES.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-[#0a0d14] to-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* =========================================================================
            HEADER & PROGRESS RADAR
        ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>300 Next-Generation Features • DAVDixence Grand Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                300 Advanced Platform Features Catalog
              </h1>
              <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-2xl leading-relaxed">
                The visionary educational suite for DAV Public School, Khabra. Encompassing Cognitive AI, 3D STEM labs, OMR examination engineering, Vedic linguistics, campus ERP telemetry, student mental health, and future career horizons.
              </p>
            </div>

            {/* Architecture Explored Gauge */}
            <div className="w-full lg:w-72 bg-stone-950/80 rounded-2xl p-4 border border-stone-800 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Roadmap Tested</span>
                </span>
                <span className="text-amber-400 font-mono font-black">{progressPercent}%</span>
              </div>
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(progressPercent, 4)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{exploredIds.length} of {DAV_300_FUTURE_FEATURES.length} Features Explored</span>
                <span>10 Domains Active</span>
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
                <span>Periodic Table</span>
              </button>

              <button
                onClick={onOpenBusTelemetry}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-cyan-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Bus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bus Telemetry #151</span>
              </button>

              <button
                onClick={onOpenAnthemPlayer}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-amber-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>DAV Anthem #121</span>
              </button>

              <button
                onClick={onOpenFormulaSheet}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-emerald-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vedic Math #128</span>
              </button>

              <button
                onClick={onOpenAccessibility}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-teal-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                <span>A11y &amp; Rest #216</span>
              </button>

              <button
                onClick={onOpenVirtualLab}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-cyan-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
                <span>3D Ray Optics #31</span>
              </button>

              <button
                onClick={onOpenAdmitCard}
                className="px-3.5 py-2 bg-stone-900 border border-stone-800 hover:border-emerald-400 rounded-xl text-stone-300 hover:text-white transition cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Hall Ticket #90</span>
              </button>
            </div>

            {onGoToSection && (
              <button
                onClick={() => onGoToSection(1)}
                className="text-stone-400 hover:text-amber-400 transition flex items-center gap-1 cursor-pointer"
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
                placeholder="Search across all 300 features (e.g. Socratic, OMR, Vedic Math, WhatsApp, Bus, Optics, Python)..."
                className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl pl-11 pr-4 py-3 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white cursor-pointer"
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
                className="bg-stone-900/90 border border-stone-800 rounded-2xl px-4 py-3 text-xs font-semibold text-stone-300 focus:outline-none focus:border-amber-400 w-full md:w-auto cursor-pointer"
              >
                <option value="all">All Impact Levels</option>
                <option value="Transformational">Transformational</option>
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
              All 10 Domains (300)
            </button>
            {FEATURE_CATEGORIES_300.map((cat) => (
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
            300 FEATURES CARDS GRID
        ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1 font-mono">
            <span>Showing {filtered.length} of 300 roadmap features</span>
            <span>Click any feature card to launch its live interactive simulation workbench</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((f) => {
              const isExplored = exploredIds.includes(f.id);

              return (
                <div
                  key={f.id}
                  onClick={() => handleLaunchFeatureDemo(f)}
                  className={`group relative rounded-3xl transition-all duration-300 border flex flex-col justify-between overflow-hidden cursor-pointer ${
                    isExplored
                      ? 'bg-gradient-to-b from-stone-900/95 to-emerald-950/20 border-emerald-500/40 hover:border-emerald-400'
                      : 'bg-stone-900/90 border-stone-800 hover:border-amber-400/60 hover:shadow-2xl hover:scale-[1.01]'
                  }`}
                >
                  {/* Top Category Strip */}
                  <div className={`h-1.5 w-full ${
                    f.id <= 30 ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                    f.id <= 60 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
                    f.id <= 90 ? 'bg-gradient-to-r from-rose-500 to-red-600' :
                    f.id <= 120 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                    f.id <= 150 ? 'bg-gradient-to-r from-yellow-400 to-amber-600' :
                    f.id <= 180 ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                    f.id <= 210 ? 'bg-gradient-to-r from-blue-400 to-cyan-500' :
                    f.id <= 240 ? 'bg-gradient-to-r from-teal-400 to-emerald-600' :
                    f.id <= 270 ? 'bg-gradient-to-r from-violet-400 to-purple-600' :
                    'bg-gradient-to-r from-amber-500 to-rose-500'
                  }`} />

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Badge Row */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                          Feature #{f.id}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            f.impactLevel === 'Transformational' ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30' :
                            f.impactLevel === 'Very High Impact' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' :
                            f.impactLevel === 'High Impact' ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30' :
                            'bg-stone-800 text-stone-400'
                          }`}>
                            {f.impactLevel}
                          </span>
                          <span className="text-[10px] font-mono bg-stone-800 border border-stone-700 text-stone-300 px-1.5 py-0.5 rounded">
                            {f.badge}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wide mb-1">
                        {f.category}
                      </div>

                      <h3 className="text-base font-black text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {f.title}
                      </h3>

                      <p className="text-xs text-stone-300 mt-2.5 leading-relaxed line-clamp-3">
                        {f.description}
                      </p>
                    </div>

                    {/* Bottom Status & Demo Launcher */}
                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-stone-400 group-hover:text-amber-300 transition flex items-center gap-1">
                        <span>Launch Simulation Workbench</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExplored(f.id);
                        }}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                          isExplored 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-stone-800 text-stone-400 hover:text-white'
                        }`}
                      >
                        {isExplored ? (
                          <><Check className="w-3 h-3 text-emerald-400" /> Tested</>
                        ) : (
                          <span>Mark Tested</span>
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
            INTERACTIVE FEATURE SANDBOX MODAL (ALL 300 FEATURES PLAYABLE)
        ========================================================================= */}
        {activeFeatureModal && (
          <Features300InteractiveSandboxModal
            feature={activeFeatureModal}
            isOpen={Boolean(activeFeatureModal)}
            onClose={() => setActiveFeatureModal(null)}
            onLaunchSpecialty={handleLaunchSpecialty}
          />
        )}

      </div>
    </div>
  );
}
