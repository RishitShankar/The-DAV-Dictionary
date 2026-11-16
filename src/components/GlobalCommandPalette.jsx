import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, Compass, Sparkles, Video, Bus, CheckSquare, 
  Trophy, Settings, Heart, Star, Key, Award, FlaskConical, 
  FileText, ShieldCheck, ArrowRight, CornerDownLeft, X, Layers, Brain,
  Atom, Music, Calculator, Sliders, Rocket, Zap
} from 'lucide-react';
import { DAV_200_PLATFORM_CONCEPTS } from '../data/dav200PlatformConceptsData';
import { DAV_300_FUTURE_FEATURES } from '../data/dav300FutureFeaturesData';

export function GlobalCommandPalette({ 
  isOpen, 
  onClose, 
  onSelectSection,
  onOpenVirtualLab,
  onOpenMistakeVault,
  onOpenAdmitCard,
  onOpenConceptsVault,
  onOpenConcepts200,
  onOpenFeatures300,
  onOpenHiTech50,
  onOpenPeriodicTable,
  onOpenBusTelemetry,
  onOpenAnthemPlayer,
  onOpenFormulaSheet,
  onOpenAccessibility
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Static Platform Quick Actions
  const primaryCommands = [
    { id: 'sec_1', type: 'section', title: 'Section 1: Campus Overview Hub', subtitle: 'Central navigation & portals radar', icon: Compass, action: () => onSelectSection?.(1) },
    { id: 'sec_2', type: 'section', title: 'Section 2: Digital Textbooks', subtitle: '70+ DAV Curriculum Books (LKG to 8)', icon: BookOpen, action: () => onSelectSection?.(2) },
    { id: 'sec_4', type: 'section', title: 'Section 4: Rishi AI Workspace', subtitle: 'Curriculum-grounded artificial intelligence tutor', icon: Sparkles, action: () => onSelectSection?.(4) },
    { id: 'sec_5', type: 'section', title: 'Section 5: Faculty Desk & Channels', subtitle: '50+ Teachers Roster & Daily Diary', icon: Award, action: () => onSelectSection?.(5) },
    { id: 'sec_7', type: 'section', title: 'Section 7: Bus Radar & Utilities', subtitle: 'Buses #1–200 live campus tracking', icon: Bus, action: () => onSelectSection?.(7) },
    { id: 'sec_8', type: 'section', title: 'Section 8: CBT Exam Simulator', subtitle: 'Full-screen mock testing hall & timer', icon: CheckSquare, action: () => onSelectSection?.(8) },
    { id: 'sec_9', type: 'section', title: 'Section 9: Deep Study Focus Suite', subtitle: 'Pomodoro timer, binaural audio & leaderboard', icon: Trophy, action: () => onSelectSection?.(9) },
    { id: 'sec_10', type: 'section', title: 'Section 10: Settings Hub', subtitle: 'Themes, accent engine & preferences', icon: Settings, action: () => onSelectSection?.(10) },
    
    // Feature Modals & Concepts
    { id: 'act_hitech50', type: 'hitech', title: '50 Hi-Tech Innovations Nexus (Quantum Hub)', subtitle: 'Socratic AI, Edge CV, 3D Ray-Tracing, IoT Bus & Proctoring', icon: Zap, action: () => onOpenHiTech50?.() },
    { id: 'act_200', type: 'blueprint', title: '200 Platform Concepts Master Blueprint', subtitle: 'All 200 cutting-edge features & architectural designs', icon: Layers, action: () => onOpenConcepts200?.() },
    { id: 'act_300', type: 'blueprint', title: '300 Next-Gen Features Catalog & Live Sandboxes', subtitle: 'All 300 future-ready features with interactive simulation lab benches', icon: Rocket, action: () => onOpenFeatures300?.() },
    { id: 'act_periodic', type: 'tool', title: 'Interactive Periodic Table & Orbitals', subtitle: 'Concept #107 & #123 • Bohr models & flame test lab', icon: Atom, action: () => onOpenPeriodicTable?.() },
    { id: 'act_bus_live', type: 'tool', title: 'DAV Live Bus GPS Telemetry Tracker', subtitle: 'Concept #96 • Real-time speed, stops & parent SOS hotline', icon: Bus, action: () => onOpenBusTelemetry?.() },
    { id: 'act_anthem', type: 'tool', title: 'Official DAV Anthem & Vedic Chants', subtitle: 'Concept #98 & #114 • Synchronized Sanskrit/English lyrics', icon: Music, action: () => onOpenAnthemPlayer?.() },
    { id: 'act_formula', type: 'tool', title: 'Formula Sheet Drawer & LaTeX Hub', subtitle: 'Concept #122 • Instant formulas for Physics, Chem & Math', icon: Calculator, action: () => onOpenFormulaSheet?.() },
    { id: 'act_a11y', type: 'tool', title: 'Accessibility, Dyslexia & Lo-Fi Soundscape', subtitle: 'Concept #172-#189 • Reading ruler, font scaling & soundscapes', icon: Sliders, action: () => onOpenAccessibility?.() },
    { id: 'act_lab', type: 'tool', title: 'Interactive 3D Virtual Science Lab', subtitle: 'Concept #123 • Optics, circuits & pH workbench', icon: FlaskConical, action: () => onOpenVirtualLab?.() },
    { id: 'act_mistake', type: 'tool', title: 'The Mistake Vault (Error Notebook)', subtitle: 'Concept #155 • Board score predictor & revision list', icon: FileText, action: () => onOpenMistakeVault?.() },
    { id: 'act_admit', type: 'tool', title: 'Digital Hall Ticket & QR Admit Card', subtitle: 'Concept #188 • Verified Term-2 exam pass', icon: ShieldCheck, action: () => onOpenAdmitCard?.() },
    { id: 'act_concepts', type: 'tool', title: '110 Master Academic Concepts Vault', subtitle: 'Formulas, mnemonics & interactive flashcard tests', icon: Brain, action: () => onOpenConceptsVault?.() },
  ];

  // Filter commands, 200 concepts, and 300 future features
  const filtered = query.trim() ? [
    ...primaryCommands.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.subtitle.toLowerCase().includes(query.toLowerCase())
    ),
    ...DAV_200_PLATFORM_CONCEPTS.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6).map(c => ({
      id: `concept_${c.id}`,
      type: 'concept',
      title: `Concept #${c.id}: ${c.title}`,
      subtitle: `${c.category} • ${c.badge}`,
      icon: Layers,
      action: () => {
        if (c.id === 107) onOpenPeriodicTable?.();
        else if (c.id === 96) onOpenBusTelemetry?.();
        else if (c.id === 98) onOpenAnthemPlayer?.();
        else if (c.id === 122) onOpenFormulaSheet?.();
        else if (c.id >= 171 && c.id <= 190) onOpenAccessibility?.();
        else if (c.id === 123 || c.id === 133 || c.id === 134) onOpenVirtualLab?.();
        else if (c.id === 155 || c.id === 156) onOpenMistakeVault?.();
        else if (c.id === 188) onOpenAdmitCard?.();
        else onOpenConcepts200?.();
      }
    })),
    ...DAV_300_FUTURE_FEATURES.filter(f =>
      f.title.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase()) ||
      f.category.toLowerCase().includes(query.toLowerCase()) ||
      f.tags?.some(t => t.toLowerCase().includes(query.toLowerCase()))
    ).slice(0, 6).map(f => ({
      id: `feat300_${f.id}`,
      type: 'feature300',
      title: `Feature #${f.id}: ${f.title}`,
      subtitle: `${f.category} • ${f.impact} • ${f.status}`,
      icon: Rocket,
      action: () => onOpenFeatures300?.()
    }))
  ] : primaryCommands;

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden font-sans border-amber-500/20"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-stone-800/80 bg-stone-950/60">
          <Search className="w-5 h-5 text-amber-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, concept, or feature (e.g. Periodic Table, Bus, Anthem, Lab, Ctrl+K)..."
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-sm sm:text-base outline-none font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800/80 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs sm:text-sm">
              No matching commands or concepts for "{query}". Try "Periodic", "Bus", "Lab", or "Admit".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30 shadow-md' 
                      : 'text-stone-300 hover:bg-stone-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-amber-500 text-stone-950 font-bold' : 'bg-stone-800 text-stone-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-stone-100 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-stone-400 truncate">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-3 shrink-0">
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded">
                        <span>Press Enter</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-5 py-3 border-t border-stone-800/80 bg-stone-950/70 text-xs text-stone-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-[10px] font-mono text-stone-300">↑</kbd> <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-[10px] font-mono text-stone-300">↓</kbd></span>
            <span>Execute: <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-[10px] font-mono text-stone-300">↵</kbd></span>
            <span>Dismiss: <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-[10px] font-mono text-stone-300">ESC</kbd></span>
          </div>
          <span className="font-mono text-[10px] text-amber-500/80">DAVDixence Spotlight v4.0</span>
        </div>

      </div>
    </div>
  );
}
