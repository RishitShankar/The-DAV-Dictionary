import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, Compass, Sparkles, Video, Bus, CheckSquare, 
  Trophy, Settings, Heart, Star, Key, Award, FlaskConical, 
  FileText, ShieldCheck, ArrowRight, CornerDownLeft, X, Layers, Brain
} from 'lucide-react';
import { DAV_200_PLATFORM_CONCEPTS } from '../data/dav200PlatformConceptsData';

export function GlobalCommandPalette({ 
  isOpen, 
  onClose, 
  onSelectSection,
  onOpenVirtualLab,
  onOpenMistakeVault,
  onOpenAdmitCard,
  onOpenConceptsVault
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
    { id: 'sec_1', type: 'section', title: 'Section 1: Campus Overview', subtitle: 'Central navigation & portals radar', icon: Compass, action: () => onSelectSection?.(1) },
    { id: 'sec_2', type: 'section', title: 'Section 2: Digital Textbooks', subtitle: '70+ DAV Curriculum Books (LKG to 8)', icon: BookOpen, action: () => onSelectSection?.(2) },
    { id: 'sec_4', type: 'section', title: 'Section 4: Rishi AI Workspace', subtitle: 'Curriculum-grounded artificial intelligence tutor', icon: Sparkles, action: () => onSelectSection?.(4) },
    { id: 'sec_5', type: 'section', title: 'Section 5: Faculty Desk & Channels', subtitle: '50+ Teachers Roster & Daily Diary', icon: Award, action: () => onSelectSection?.(5) },
    { id: 'sec_7', type: 'section', title: 'Section 7: Bus Radar & Utilities', subtitle: 'Buses #1–200 live campus tracking', icon: Bus, action: () => onSelectSection?.(7) },
    { id: 'sec_8', type: 'section', title: 'Section 8: CBT Exam Simulator', subtitle: 'Full-screen mock testing hall & timer', icon: CheckSquare, action: () => onSelectSection?.(8) },
    { id: 'sec_9', type: 'section', title: 'Section 9: Deep Study Focus Suite', subtitle: 'Pomodoro timer, binaural audio & leaderboard', icon: Trophy, action: () => onSelectSection?.(9) },
    { id: 'sec_10', type: 'section', title: 'Section 10: Settings Hub', subtitle: 'Themes, accent engine & preferences', icon: Settings, action: () => onSelectSection?.(10) },
    
    // Feature Modals
    { id: 'act_lab', type: 'tool', title: 'Interactive 3D Virtual Science Lab', subtitle: 'Simulate optics, circuits, and acid-base reactions', icon: FlaskConical, action: () => onOpenVirtualLab?.() },
    { id: 'act_mistake', type: 'tool', title: 'The Mistake Vault (Error Notebook)', subtitle: 'Review and re-test questions missed in tests', icon: FileText, action: () => onOpenMistakeVault?.() },
    { id: 'act_admit', type: 'tool', title: 'Digital Hall Ticket & Verified QR Admit Card', subtitle: 'Generate official DAV Term-2 exam pass', icon: ShieldCheck, action: () => onOpenAdmitCard?.() },
    { id: 'act_concepts', type: 'tool', title: '110 Master Concepts Knowledge Vault', subtitle: 'Formulas, mnemonics & interactive quizzes', icon: Brain, action: () => onOpenConceptsVault?.() },
  ];

  // Filter commands & 200 concepts
  const filtered = query.trim() ? [
    ...primaryCommands.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.subtitle.toLowerCase().includes(query.toLowerCase())
    ),
    ...DAV_200_PLATFORM_CONCEPTS.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10).map(c => ({
      id: `concept_${c.id}`,
      type: 'concept',
      title: `Concept #${c.id}: ${c.title}`,
      subtitle: `${c.category} • ${c.badge}`,
      icon: Layers,
      action: () => onOpenConceptsVault?.()
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
      className="fixed inset-0 z-[9999] bg-stone-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 font-sans animate-in fade-in duration-150"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-stone-100"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-800 flex items-center gap-3 bg-stone-950/90 relative">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search 200 concepts, or jump to section (e.g. 'Virtual Lab', 'Bus', 'Admit Card')..."
            className="flex-1 bg-transparent text-sm text-white placeholder-stone-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-500 hover:text-white text-xs font-bold mr-2"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-800 rounded border border-stone-700">
            ESC to close
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-stone-800/40">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500">
              No matching commands or concepts found for "{query}".
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon || Sparkles;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition ${
                    isSelected 
                      ? 'bg-amber-400 text-stone-950 shadow-md font-bold' 
                      : 'text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold truncate">
                        {item.title}
                      </div>
                      <div className={`text-[11px] truncate ${isSelected ? 'text-stone-900' : 'text-stone-400'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-stone-950" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2.5 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Ctrl + K to open anytime</span>
          </div>
          <span>DAVDixence 200-Concepts Spotlight</span>
        </div>

      </div>
    </div>
  );
}
