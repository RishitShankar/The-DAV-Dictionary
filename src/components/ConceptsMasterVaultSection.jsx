import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, Sparkles, CheckCircle2, XCircle, Award, Search, 
  RotateCcw, Check, Bookmark, Brain, Zap, Divide, 
  Layers, Globe, HelpCircle, ArrowRight, ArrowLeft, Shuffle, 
  Share2, Trophy, Flame, Eye, Star, ChevronDown, ChevronUp,
  GraduationCap, Copy, RefreshCw, BarChart2, CheckCheck
} from 'lucide-react';
import { 
  DAV_106_CONCEPTS, 
  CONCEPT_SUBJECT_FILTERS, 
  CONCEPT_GRADE_FILTERS 
} from '../data/dav106ConceptsData';

export function ConceptsMasterVaultSection({ currentUser, onGoToSection }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'flashcards' | 'quizzer'
  
  // Persistence for Mastered & Bookmarked concepts
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_mastered_concepts_106');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_bookmarked_concepts_106');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Card quiz choices state { [conceptId]: selectedOptionIndex }
  const [quizAnswers, setQuizAnswers] = useState({});
  // Expanded details per card { [conceptId]: boolean }
  const [expandedCards, setExpandedCards] = useState({});
  // Copy notification
  const [copiedId, setCopiedId] = useState(null);

  // Flashcard mode state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Rapid Quizzer Mode state
  const [quizzerActive, setQuizzerActive] = useState(false);
  const [quizzerQuestions, setQuizzerQuestions] = useState([]);
  const [quizzerCurrentIndex, setQuizzerCurrentIndex] = useState(0);
  const [quizzerUserAnswers, setQuizzerUserAnswers] = useState({});
  const [quizzerCompleted, setQuizzerCompleted] = useState(false);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('dav_mastered_concepts_106', JSON.stringify(masteredIds));
    } catch (e) {}
  }, [masteredIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dav_bookmarked_concepts_106', JSON.stringify(bookmarkedIds));
    } catch (e) {}
  }, [bookmarkedIds]);

  const toggleMastered = (id) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleCardExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCardQuizSelect = (conceptId, optionIdx) => {
    setQuizAnswers(prev => ({ ...prev, [conceptId]: optionIdx }));
  };

  const handleCopyFormula = (concept) => {
    const text = `${concept.title} (${concept.subject})\nFormula/Law: ${concept.keyFormulaOrLaw}\nTakeaway: ${concept.davExamTip}`;
    try {
      navigator.clipboard.writeText(text);
      setCopiedId(concept.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {}
  };

  // Filtered concepts
  const filteredConcepts = useMemo(() => {
    return DAV_106_CONCEPTS.filter(c => {
      // Subject match
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) {
        return false;
      }
      // Grade match
      if (selectedGrade !== 'all' && c.classGrade !== selectedGrade) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = c.title.toLowerCase().includes(q);
        const matchesCat = c.category.toLowerCase().includes(q);
        const matchesDef = c.coreDefinition.toLowerCase().includes(q);
        const matchesLaw = c.keyFormulaOrLaw.toLowerCase().includes(q);
        const matchesTip = c.davExamTip.toLowerCase().includes(q);
        return matchesTitle || matchesCat || matchesDef || matchesLaw || matchesTip;
      }
      return true;
    });
  }, [selectedSubject, selectedGrade, searchQuery]);

  // Flashcards navigation
  const currentFlashcard = filteredConcepts[flashcardIndex] || filteredConcepts[0];

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev + 1) % Math.max(1, filteredConcepts.length));
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex(prev => (prev - 1 + filteredConcepts.length) % Math.max(1, filteredConcepts.length));
  };

  const handleShuffleFlashcard = () => {
    setIsFlipped(false);
    const rand = Math.floor(Math.random() * filteredConcepts.length);
    setFlashcardIndex(rand);
  };

  // Start Rapid Quizzer
  const handleStartRapidQuizzer = () => {
    const shuffled = [...DAV_106_CONCEPTS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setQuizzerQuestions(selected);
    setQuizzerCurrentIndex(0);
    setQuizzerUserAnswers({});
    setQuizzerCompleted(false);
    setQuizzerActive(true);
    setViewMode('quizzer');
  };

  const handleQuizzerSelectAnswer = (qIndex, optionIdx) => {
    setQuizzerUserAnswers(prev => ({ ...prev, [qIndex]: optionIdx }));
  };

  const calculateQuizzerScore = () => {
    let score = 0;
    quizzerQuestions.forEach((q, idx) => {
      if (quizzerUserAnswers[idx] === q.quickQuiz.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const masteryPercent = Math.round((masteredIds.length / DAV_106_CONCEPTS.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-[#0d0e12] to-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* =========================================================================
            HEADER & MASTERY STATS BAR
        ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-850 to-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>110 Foundation Concepts • DAV Board &amp; Olympiad Hall</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                <span>The 106+ Master Academic Concepts Vault</span>
              </h1>
              <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-2xl leading-relaxed">
                Meticulously engineered compendium of 110 foundational principles across Mathematics, Science, Social Studies, English Grammar, Computer Science, and Sanskrit. Complete with formulas, mnemonics, board exam traps, and interactive self-check quizzes.
              </p>
            </div>

            {/* Mastery Meter */}
            <div className="w-full lg:w-72 bg-stone-950/80 rounded-2xl p-4 border border-stone-800 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-stone-400 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Your Mastery Progress</span>
                </span>
                <span className="text-amber-400 font-mono font-black">{masteryPercent}%</span>
              </div>
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${Math.max(masteryPercent, 3)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono">
                <span>{masteredIds.length} of {DAV_106_CONCEPTS.length} Mastered</span>
                <span>{bookmarkedIds.length} Bookmarked</span>
              </div>
            </div>
          </div>

          {/* Quick Action Mode Selector */}
          <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer ${
                  viewMode === 'cards' 
                    ? 'bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/20' 
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Concept Cards ({filteredConcepts.length})</span>
              </button>

              <button
                onClick={() => {
                  setViewMode('flashcards');
                  setIsFlipped(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer ${
                  viewMode === 'flashcards' 
                    ? 'bg-amber-400 text-stone-950 shadow-lg shadow-amber-400/20' 
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Interactive Flashcards</span>
              </button>

              <button
                onClick={handleStartRapidQuizzer}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition cursor-pointer ${
                  viewMode === 'quizzer' 
                    ? 'bg-emerald-500 text-stone-950 shadow-lg shadow-emerald-500/20' 
                    : 'bg-stone-900 text-stone-400 hover:text-emerald-400 border border-stone-800'
                }`}
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Rapid-Fire 10-Question Test</span>
              </button>
            </div>

            {onGoToSection && (
              <button
                onClick={() => onGoToSection(1)}
                className="text-xs text-stone-400 hover:text-amber-400 transition flex items-center gap-1 font-bold"
              >
                <span>← Back to Campus Hub</span>
              </button>
            )}
          </div>
        </div>

        {/* =========================================================================
            SEARCH & MULTI-DIMENSIONAL FILTER BAR
        ========================================================================= */}
        {viewMode !== 'quizzer' && (
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 110 concepts (e.g. 'Ohm\'s Law', 'Pythagoras', 'Euler', 'Photosynthesis', 'Active Voice', 'Revolt 1857')..."
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

            {/* Subject Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
              {CONCEPT_SUBJECT_FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedSubject(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                    selectedSubject === f.id
                      ? 'bg-amber-400 text-stone-950 font-black shadow-md'
                      : 'bg-stone-900/80 text-stone-400 hover:text-white border border-stone-800/80'
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedSubject === f.id ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-800 text-stone-400'}`}>
                    {f.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Grade Filters */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-mono text-[11px] uppercase mr-1">Grade:</span>
              {CONCEPT_GRADE_FILTERS.map(g => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrade(g.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    selectedGrade === g.id
                      ? 'bg-stone-700 text-amber-300 font-bold border border-amber-400/40'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 1: CONCEPT CARDS GRID
        ========================================================================= */}
        {viewMode === 'cards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Showing {filteredConcepts.length} of {DAV_106_CONCEPTS.length} concepts</span>
              <span>Click any quiz choice for instant answer validation</span>
            </div>

            {filteredConcepts.length === 0 ? (
              <div className="text-center py-16 bg-stone-900/40 rounded-3xl border border-stone-800">
                <HelpCircle className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No concepts matched your filter</h3>
                <p className="text-xs text-stone-400 mt-1">Try clearing search terms or selecting 'All' subjects.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSubject('all');
                    setSelectedGrade('all');
                  }}
                  className="mt-4 px-4 py-2 bg-amber-400 text-stone-950 text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConcepts.map(c => {
                  const isMastered = masteredIds.includes(c.id);
                  const isBookmarked = bookmarkedIds.includes(c.id);
                  const isExpanded = !!expandedCards[c.id];
                  const chosenOption = quizAnswers[c.id];
                  const hasAnswered = chosenOption !== undefined;
                  const isCorrect = chosenOption === c.quickQuiz.correctIndex;

                  return (
                    <div
                      key={c.id}
                      className={`rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${
                        isMastered 
                          ? 'bg-gradient-to-b from-stone-900/95 to-emerald-950/20 border-emerald-500/40 shadow-emerald-950/30' 
                          : 'bg-stone-900/90 border-stone-800/90 hover:border-amber-400/50 hover:shadow-2xl'
                      }`}
                    >
                      {/* Top Accent Strip */}
                      <div className={`h-1.5 w-full ${
                        c.subject === 'Mathematics' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                        c.subject === 'Physics' ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                        c.subject === 'Chemistry' ? 'bg-gradient-to-r from-rose-500 to-red-600' :
                        c.subject === 'Biology' ? 'bg-gradient-to-r from-emerald-400 to-teal-500' :
                        c.subject === 'Social Science' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                        'bg-gradient-to-r from-cyan-400 to-blue-500'
                      }`} />

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        
                        {/* Header Badges */}
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-md">
                              Concept #{c.id}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                                {c.classGrade}
                              </span>
                              <button
                                onClick={() => toggleBookmark(c.id)}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Concept'}
                                className={`p-1 rounded hover:bg-stone-800 transition ${isBookmarked ? 'text-amber-400' : 'text-stone-500'}`}
                              >
                                <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
                              </button>
                              <button
                                onClick={() => toggleMastered(c.id)}
                                title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                                className={`p-1 rounded hover:bg-stone-800 transition ${isMastered ? 'text-emerald-400' : 'text-stone-500'}`}
                              >
                                <CheckCircle2 className={`w-4 h-4 ${isMastered ? 'fill-emerald-400/20' : ''}`} />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">
                              {c.subject} • {c.category}
                            </span>
                          </div>

                          <h3 className="text-base font-black text-white leading-snug group-hover:text-amber-300 transition-colors">
                            {c.title}
                          </h3>

                          {/* Core Definition */}
                          <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
                            {c.coreDefinition}
                          </p>
                        </div>

                        {/* Formula or Core Law Box */}
                        {c.keyFormulaOrLaw && (
                          <div className="rounded-xl bg-stone-950/90 border border-stone-800 p-3 font-mono text-xs relative group/formula">
                            <div className="flex items-center justify-between text-[10px] text-stone-500 uppercase font-sans font-bold mb-1">
                              <span>Key Formula / Scientific Law</span>
                              <button
                                onClick={() => handleCopyFormula(c)}
                                className="text-stone-400 hover:text-amber-300 transition flex items-center gap-1 text-[10px]"
                              >
                                {copiedId === c.id ? (
                                  <span className="text-emerald-400 flex items-center gap-0.5">
                                    <Check className="w-3 h-3" /> Copied!
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-0.5">
                                    <Copy className="w-3 h-3" /> Copy
                                  </span>
                                )}
                              </button>
                            </div>
                            <div className="text-amber-300 font-bold tracking-wide break-words text-[11px]">
                              {c.keyFormulaOrLaw}
                            </div>
                          </div>
                        )}

                        {/* Expandable Deep Content */}
                        {isExpanded && (
                          <div className="space-y-3 pt-2 border-t border-stone-800 text-xs">
                            {/* Real-World Analogy */}
                            <div className="bg-stone-950/60 rounded-xl p-2.5 border border-stone-850">
                              <span className="text-[10px] font-bold uppercase text-cyan-400 block mb-0.5">
                                🌍 Real-World Application:
                              </span>
                              <p className="text-stone-300 text-[11px] leading-relaxed">
                                {c.realWorldExample}
                              </p>
                            </div>

                            {/* Mnemonic / Memory Hook */}
                            <div className="bg-amber-500/10 rounded-xl p-2.5 border border-amber-500/20">
                              <span className="text-[10px] font-bold uppercase text-amber-400 block mb-0.5">
                                💡 Memory Trick / Mnemonic:
                              </span>
                              <p className="text-amber-200 text-[11px] font-medium leading-relaxed">
                                {c.mnemonicOrMemoryHook}
                              </p>
                            </div>

                            {/* DAV Board Exam Tip */}
                            <div className="bg-rose-500/10 rounded-xl p-2.5 border border-rose-500/20">
                              <span className="text-[10px] font-bold uppercase text-rose-400 block mb-0.5">
                                🎯 DAV Board Exam Tip &amp; Common Pitfalls:
                              </span>
                              <p className="text-rose-200 text-[11px] leading-relaxed">
                                {c.davExamTip}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Interactive Quick Self-Check Quiz */}
                        <div className="pt-3 border-t border-stone-800/80">
                          <div className="flex items-center justify-between text-[11px] font-bold text-stone-400 mb-2">
                            <span className="flex items-center gap-1">
                              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                              <span>Quick Self-Check:</span>
                            </span>
                            {hasAnswered && (
                              <span className={`text-[10px] font-black uppercase ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {isCorrect ? '✓ Correct!' : '✗ Review Answer'}
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-stone-200 font-medium mb-2.5 leading-snug">
                            {c.quickQuiz.question}
                          </p>

                          {/* 4 Interactive Choice Buttons */}
                          <div className="grid grid-cols-1 gap-1.5">
                            {c.quickQuiz.options.map((opt, optIdx) => {
                              const isSelected = chosenOption === optIdx;
                              const isThisCorrect = optIdx === c.quickQuiz.correctIndex;
                              let btnStyle = 'bg-stone-950/80 border-stone-800 text-stone-300 hover:border-stone-700';

                              if (hasAnswered) {
                                if (isThisCorrect) {
                                  btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                                } else if (isSelected && !isThisCorrect) {
                                  btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                                } else {
                                  btnStyle = 'bg-stone-950/40 border-stone-850 text-stone-500 opacity-60';
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleCardQuizSelect(c.id, optIdx)}
                                  className={`w-full text-left p-2 rounded-lg border text-[11px] transition cursor-pointer flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {hasAnswered && isThisCorrect && (
                                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                  )}
                                  {hasAnswered && isSelected && !isThisCorrect && (
                                    <XCircle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Explanation if answered */}
                          {hasAnswered && (
                            <div className="mt-2.5 p-2 rounded-lg bg-stone-950 border border-stone-800 text-[10px] text-stone-400 leading-relaxed">
                              <span className="font-bold text-amber-300">Explanation: </span>
                              {c.quickQuiz.explanation}
                            </div>
                          )}
                        </div>

                      </div>

                      {/* Card Bottom Action Bar */}
                      <div className="bg-stone-950/80 px-5 py-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                        <button
                          onClick={() => toggleCardExpand(c.id)}
                          className="text-stone-400 hover:text-white transition flex items-center gap-1 font-bold text-[11px]"
                        >
                          {isExpanded ? (
                            <><span>Hide Exam Details</span><ChevronUp className="w-3.5 h-3.5" /></>
                          ) : (
                            <><span>Show Exam Tips &amp; Memory Hook</span><ChevronDown className="w-3.5 h-3.5" /></>
                          )}
                        </button>

                        <button
                          onClick={() => toggleMastered(c.id)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-md transition flex items-center gap-1 cursor-pointer ${
                            isMastered 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                              : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                          }`}
                        >
                          {isMastered ? (
                            <><CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> Mastered</>
                          ) : (
                            <span>Mark Mastered</span>
                          )}
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 2: INTERACTIVE FLASHCARD ARENA
        ========================================================================= */}
        {viewMode === 'flashcards' && currentFlashcard && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
              <span>Flashcard {flashcardIndex + 1} of {filteredConcepts.length}</span>
              <span>Click card or press flip to reveal core formula and tips</span>
            </div>

            {/* Flashcard Component */}
            <div 
              onClick={() => setIsFlipped(prev => !prev)}
              className="cursor-pointer min-h-[360px] rounded-3xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-400/40 p-8 shadow-2xl relative flex flex-col justify-between transition-all duration-300 hover:border-amber-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  Concept #{currentFlashcard.id} • {currentFlashcard.subject}
                </span>
                <span className="text-xs font-bold text-stone-400">
                  {currentFlashcard.classGrade}
                </span>
              </div>

              <div className="text-center my-6 space-y-4">
                {!isFlipped ? (
                  <>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">
                      {currentFlashcard.category}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {currentFlashcard.title}
                    </h2>
                    <p className="text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                      {currentFlashcard.coreDefinition}
                    </p>
                    <div className="pt-4 text-xs font-mono text-amber-400/80">
                      [Tap anywhere to flip card &amp; reveal formula]
                    </div>
                  </>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
                      Formula &amp; Exam Strategy
                    </span>
                    <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-amber-300 font-mono text-sm sm:text-base font-bold">
                      {currentFlashcard.keyFormulaOrLaw}
                    </div>
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                      <strong>Memory Hook: </strong>{currentFlashcard.mnemonicOrMemoryHook}
                    </div>
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                      <strong>DAV Board Tip: </strong>{currentFlashcard.davExamTip}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 pt-4 border-t border-stone-800">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Click to Flip</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(currentFlashcard.id);
                  }}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${
                    masteredIds.includes(currentFlashcard.id)
                      ? 'bg-emerald-500 text-stone-950'
                      : 'bg-stone-800 text-stone-300 hover:text-white'
                  }`}
                >
                  {masteredIds.includes(currentFlashcard.id) ? '✓ Mastered' : 'Mark as Mastered'}
                </button>
              </div>
            </div>

            {/* Flashcard Navigation Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrevFlashcard}
                className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-white font-bold text-xs flex items-center gap-2 hover:bg-stone-800 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleShuffleFlashcard}
                className="px-5 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-amber-400 font-bold text-xs flex items-center gap-2 hover:bg-stone-800 transition cursor-pointer"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle</span>
              </button>

              <button
                onClick={handleNextFlashcard}
                className="px-5 py-2.5 rounded-xl bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 hover:bg-amber-300 transition cursor-pointer shadow-lg"
              >
                <span>Next Concept</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            VIEW MODE 3: RAPID-FIRE 10-QUESTION TEST
        ========================================================================= */}
        {viewMode === 'quizzer' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {!quizzerCompleted ? (
              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6">
                
                {/* Quiz Header & Progress */}
                <div className="flex items-center justify-between text-xs font-mono border-b border-stone-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-white font-bold">
                      Question {quizzerCurrentIndex + 1} of {quizzerQuestions.length}
                    </span>
                  </div>
                  <span className="text-amber-400 font-bold">
                    Score so far: {calculateQuizzerScore()} / {Object.keys(quizzerUserAnswers).length}
                  </span>
                </div>

                {/* Current Question */}
                {quizzerQuestions[quizzerCurrentIndex] && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                        {quizzerQuestions[quizzerCurrentIndex].subject}
                      </span>
                      <span className="text-xs font-bold text-stone-400">
                        {quizzerQuestions[quizzerCurrentIndex].title}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-white leading-relaxed">
                      {quizzerQuestions[quizzerCurrentIndex].quickQuiz.question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-2 pt-2">
                      {quizzerQuestions[quizzerCurrentIndex].quickQuiz.options.map((opt, oIdx) => {
                        const isChosen = quizzerUserAnswers[quizzerCurrentIndex] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleQuizzerSelectAnswer(quizzerCurrentIndex, oIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition cursor-pointer flex items-center justify-between ${
                              isChosen
                                ? 'bg-amber-400 text-stone-950 font-black border-amber-300 shadow-md'
                                : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-amber-400/50'
                            }`}
                          >
                            <span>{opt}</span>
                            {isChosen && <Check className="w-4 h-4 text-stone-950" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quizzer Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                  <button
                    disabled={quizzerCurrentIndex === 0}
                    onClick={() => setQuizzerCurrentIndex(prev => prev - 1)}
                    className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 font-bold text-xs disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {quizzerCurrentIndex < quizzerQuestions.length - 1 ? (
                    <button
                      onClick={() => setQuizzerCurrentIndex(prev => prev + 1)}
                      className="px-5 py-2 rounded-xl bg-amber-400 text-stone-950 font-black text-xs hover:bg-amber-300 transition"
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuizzerCompleted(true)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
                    >
                      Submit Rapid Test 🏆
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Final Scorecard */
              <div className="rounded-3xl bg-stone-900 border border-stone-800 p-8 text-center space-y-6 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8" />
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Rapid Test Completed!
                  </h2>
                  <p className="text-sm text-stone-400 mt-1">
                    Authentic DAV Board Curriculum Diagnostic Assessment
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 max-w-sm mx-auto">
                  <div className="text-5xl font-black font-mono text-amber-400">
                    {calculateQuizzerScore()} / {quizzerQuestions.length}
                  </div>
                  <div className="text-xs text-stone-400 mt-2 font-bold uppercase tracking-wider">
                    {calculateQuizzerScore() >= 8 ? '🌟 Outstanding Mastery (Distinction)' :
                     calculateQuizzerScore() >= 5 ? '👍 Good Effort (First Class)' :
                     '📖 Needs Further Concept Revision'}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={handleStartRapidQuizzer}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 text-stone-950 font-black text-xs hover:bg-amber-300 transition cursor-pointer"
                  >
                    Retake with New Questions 🔄
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className="px-5 py-2.5 rounded-xl bg-stone-800 text-white font-bold text-xs hover:bg-stone-700 transition cursor-pointer"
                  >
                    Back to All 110 Cards
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
