import React, { useState, useMemo } from 'react';
import { 
  Play, Video, BookOpen, FileText, Award, CheckCircle2, 
  ExternalLink, Copy, Check, Search, Sparkles, Clock, 
  User, Layers, Filter, Download, ChevronRight, ChevronLeft, 
  Flame, ShieldCheck, HelpCircle, ArrowRight, Share2, Compass,
  Star, Lock, AlertCircle, RefreshCw, Sparkle, Smile
} from 'lucide-react';
import { 
  SECTION6_CLASSES, 
  SECTION6_SUBJECTS_BY_CLASS, 
  getSection6Teachers,
  getSection6ExplanationParts,
  getSection6SolutionParts
} from '../data/section6Data.js';
import { getSection6Chapters } from '../data/section6Chapters.js';
import { 
  resolveActiveLecture, 
  DAV_PYQ_ARCHIVE, 
  DAV_SAMPLE_PAPERS 
} from '../data/videoLecturesData.js';

export function ChapterExplanationsSection({ user, onOpenAIWithQuestion, onRequireLogin }) {
  // Sub-Section Tabs (1: Video Lectures, 2: PYQs, 3: Sample Papers)
  const [activeSubTab, setActiveSubTab] = useState('videos');

  // Video Hub State
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSubject, setSelectedSubject] = useState('maths');
  const [selectedChapterNum, setSelectedChapterNum] = useState(1);
  const [lectureMode, setLectureMode] = useState('explanation'); // 'explanation' | 'solutions'
  const [selectedPartId, setSelectedPartId] = useState('part1');
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);
  const [playerMode, setPlayerMode] = useState('chapter'); // 'chapter' | 'playlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Available classes in Section 6
  const sectionClasses = SECTION6_CLASSES;

  // Active video status: Classes 3 to 8 are active with video lessons
  const isVideoAvailable = useMemo(() => {
    return ['8', '7', '6', '5', '4', '3'].includes(selectedClass);
  }, [selectedClass]);

  // PYQ Filter State
  const [selectedPyqYear, setSelectedPyqYear] = useState('all');
  const [selectedPyqSubject, setSelectedPyqSubject] = useState('all');

  // Sample Paper Filter State
  const [selectedSampleSubject, setSelectedSampleSubject] = useState('all');

  // Subjects for currently selected class (Strictly filtered, no GK/Computer/NS/Drawing)
  const availableSubjects = useMemo(() => {
    return SECTION6_SUBJECTS_BY_CLASS[selectedClass] || SECTION6_SUBJECTS_BY_CLASS['8'];
  }, [selectedClass]);

  // Current subject object
  const currentSubjectObj = useMemo(() => {
    return availableSubjects.find(s => s.id === selectedSubject) || availableSubjects[0];
  }, [availableSubjects, selectedSubject]);

  // Chapters for currently selected class & subject
  const availableChapters = useMemo(() => {
    return getSection6Chapters(selectedClass, selectedSubject);
  }, [selectedClass, selectedSubject]);

  // Current chapter object
  const currentChapterObj = useMemo(() => {
    return availableChapters.find(c => Number(c.num) === Number(selectedChapterNum)) || availableChapters[0] || { num: 1, title: 'Chapter 1' };
  }, [availableChapters, selectedChapterNum]);

  // Filtered chapters for search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return availableChapters;
    const q = searchQuery.toLowerCase();
    return availableChapters.filter(c => 
      c.title.toLowerCase().includes(q) || 
      String(c.num).includes(q)
    );
  }, [availableChapters, searchQuery]);

  // Available parts selector or subject-specific worksheets/solutions
  const availableParts = useMemo(() => {
    if (lectureMode === 'explanation') {
      return getSection6ExplanationParts(selectedSubject);
    }
    return getSection6SolutionParts(selectedClass, selectedSubject, currentChapterObj.num);
  }, [lectureMode, selectedClass, selectedSubject, currentChapterObj]);

  // Dynamic labels for mode buttons strictly customized to the subject
  const explanationButtonLabel = useMemo(() => {
    if (selectedSubject === 'maths') return '1. One-Shot Crash Course & Concepts (DAV GURU / Theory)';
    if (selectedSubject.includes('abhyas')) return '1. व्याकरण नियम व मुख्य संकल्पना';
    if (selectedSubject.includes('practice')) return '1. Grammar Rules & Concept Overview';
    if (selectedSubject.includes('gyan') || selectedSubject.includes('madhuri')) return '1. पाठ एवं कविता भावार्थ (Explanation)';
    if (selectedSubject.includes('sans')) return '1. सम्पूर्ण पाठ हिन्दी अनुवाद (Translation)';
    return '1. Chapter Explanation (व्याख्या एवं संकल्पना)';
  }, [selectedSubject]);

  const solutionsButtonLabel = useMemo(() => {
    if (selectedSubject === 'maths') return '2. Worksheets, Brain Teasers & HOTS (Science Solutions)';
    if (selectedSubject.includes('practice')) return '2. Practice Book Worksheets & DIY (VKPDT / Solved)';
    if (selectedSubject.includes('abhyas')) return '2. अभ्यास सागर हल (सम्पूर्ण व्याकरण कार्य)';
    if (selectedSubject.includes('sans')) return '2. अभ्यास कार्यम् प्रश्नोत्तराणि (Shloka & Sandhi)';
    return '2. Textbook Question Answers (Part A, B, C, D, E)';
  }, [selectedSubject]);

  // Current selected part object
  const selectedPartObj = useMemo(() => {
    return availableParts.find(p => p.id === selectedPartId) || availableParts[0] || { id: 'part1', label: 'Part 1: Concept & Foundations' };
  }, [availableParts, selectedPartId]);

  // Available 3 specialized educators for current subject & class
  const availableTeachers = useMemo(() => {
    return getSection6Teachers(selectedClass, selectedSubject);
  }, [selectedClass, selectedSubject]);

  // Resolved active lecture object with zero cross-chapter mismatch and strict separation
  const activeLecture = useMemo(() => {
    return resolveActiveLecture({
      classId: selectedClass,
      subjectId: selectedSubject,
      chapterNum: currentChapterObj.num,
      chapterTitle: currentChapterObj.title,
      mode: lectureMode,
      selectedPart: selectedPartObj,
      teacherIndex: activeTeacherIndex
    });
  }, [selectedClass, selectedSubject, currentChapterObj, lectureMode, selectedPartObj, activeTeacherIndex]);

  // Handle Class Switch
  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    if (['8', '7', '6', '5', '4', '3'].includes(newClass)) {
      const newSubjects = SECTION6_SUBJECTS_BY_CLASS[newClass] || SECTION6_SUBJECTS_BY_CLASS['8'];
      const firstSubj = newSubjects[0].id;
      setSelectedSubject(firstSubj);
      const newChapters = getSection6Chapters(newClass, firstSubj);
      setSelectedChapterNum(newChapters[0]?.num || 1);
      setActiveTeacherIndex(0);
      setSelectedPartId('part1');
      setLectureMode('explanation');
      setPlayerMode('chapter');
    }
  };

  // Handle Subject Switch
  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    const newChapters = getSection6Chapters(selectedClass, newSubject);
    setSelectedChapterNum(newChapters[0]?.num || 1);
    setActiveTeacherIndex(0);
    setSelectedPartId(lectureMode === 'explanation' ? 'part1' : (newSubject === 'maths' ? 'ws1' : 'part_abc'));
    setPlayerMode('chapter');
  };

  // Handle Chapter Switch
  const handleChapterChange = (num) => {
    setSelectedChapterNum(num);
    setActiveTeacherIndex(0);
    setSelectedPartId(lectureMode === 'explanation' ? 'part1' : (selectedSubject === 'maths' ? 'ws1' : 'part_abc'));
    setPlayerMode('chapter');
  };

  // Handle Mode Switch (Explanation vs Solutions)
  const handleModeChange = (newMode) => {
    setLectureMode(newMode);
    setActiveTeacherIndex(0);
    if (newMode === 'explanation') {
      setSelectedPartId('part1');
    } else {
      if (selectedSubject === 'maths') setSelectedPartId('ws1');
      else if (selectedSubject.includes('practice')) setSelectedPartId('ws1');
      else if (selectedSubject.includes('abhyas')) setSelectedPartId('abhyas_1');
      else if (selectedSubject.includes('sans')) setSelectedPartId('part_abhyasa');
      else setSelectedPartId('part_abc');
    }
    setPlayerMode('chapter');
  };

  // Handle Part / Worksheet Switch
  const handlePartChange = (partId) => {
    setSelectedPartId(partId);
    setPlayerMode('chapter');
  };

  // Handle Next / Previous Chapter
  const handleNavigateChapter = (direction) => {
    const currentIndex = availableChapters.findIndex(c => Number(c.num) === Number(currentChapterObj.num));
    if (direction === 'next' && currentIndex < availableChapters.length - 1) {
      handleChapterChange(availableChapters[currentIndex + 1].num);
    } else if (direction === 'prev' && currentIndex > 0) {
      handleChapterChange(availableChapters[currentIndex - 1].num);
    }
  };

  // Copy Video Link to Clipboard
  const handleCopyLink = () => {
    if (user?.plan === 'guest' || user?.isDemo) {
      if (onRequireLogin) onRequireLogin('Login to Continue', 'Please log in with your Student ID & Password to copy lecture video links.');
      return;
    }
    const url = activeLecture.watchUrl;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Send Chapter to Rishi AI
  const handleAskAIAboutChapter = () => {
    if (onOpenAIWithQuestion) {
      const prompt = `Please explain DAV Class ${selectedClass} ${currentSubjectObj.name} Chapter ${currentChapterObj.num}: "${currentChapterObj.title}". Provide:
1. Core Concept & Summary
2. Most Important Formulas / Definitions
3. Key Book Back Questions & Answers
4. 5-Mark Expected Examination Questions`;
      onOpenAIWithQuestion(prompt);
    }
  };

  // Solve specific worksheet with Rishi AI
  const handleAskAIAboutWorksheet = () => {
    if (onOpenAIWithQuestion) {
      const prompt = `Please provide complete step-by-step solutions for DAV Class ${selectedClass} ${currentSubjectObj.name} Chapter ${currentChapterObj.num} ("${currentChapterObj.title}") — ${selectedPartObj.label}.
Please write each question clearly and show all steps, formulas, and reasoning so I can score full marks in my DAV exam.`;
      onOpenAIWithQuestion(prompt);
    }
  };

  // Filtered PYQs
  const filteredPyqs = useMemo(() => {
    return DAV_PYQ_ARCHIVE.filter(p => {
      const matchYear = selectedPyqYear === 'all' || p.year === selectedPyqYear;
      const matchClass = selectedClass === 'all' || p.classId === selectedClass;
      const matchSubject = selectedPyqSubject === 'all' || p.subject.toLowerCase().includes(selectedPyqSubject.toLowerCase());
      return matchYear && matchClass && matchSubject;
    });
  }, [selectedPyqYear, selectedClass, selectedPyqSubject]);

  // Filtered Sample Papers
  const filteredSamplePapers = useMemo(() => {
    return DAV_SAMPLE_PAPERS.filter(sp => {
      const matchClass = selectedClass === 'all' || sp.classId === selectedClass;
      const matchSubject = selectedSampleSubject === 'all' || sp.subject.toLowerCase().includes(selectedSampleSubject.toLowerCase());
      return matchClass && matchSubject;
    });
  }, [selectedClass, selectedSampleSubject]);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-24 selection:bg-amber-500 selection:text-stone-950">
      
      {/* SECTION HEADER: VIBRANT, KID-FRIENDLY & CHEERFUL */}
      <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-900 border-b border-stone-800 pt-8 pb-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full pointer-events-none animate-float-orb" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-rose-600/15 rounded-full pointer-events-none animate-float-orb" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-600/15 rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-widest mb-3 shadow-sm">
                <span className="text-base">🎒</span>
                <span>Section 6 • Official DAV Video Theater & Exam Vault</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                <span>Chapter Explanations, PYQs & Solutions</span>
                <span className="text-2xl sm:text-3xl">✨</span>
              </h1>
              <p className="mt-2.5 text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Step-by-step video lectures curated strictly for the DAV syllabus! Learn from top DAV educators with full chapter breakdowns, grammar exercises, and worksheet solutions.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-stone-950/90 p-3.5 rounded-2xl border border-stone-800 shadow-2xl">
              <div className="text-center px-3 border-r border-stone-800">
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Classes</div>
                <div className="text-xl font-black text-amber-400">3 to 8</div>
              </div>
              <div className="text-center px-3 border-r border-stone-800">
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Educators</div>
                <div className="text-xl font-black text-white">3 / Subject</div>
              </div>
              <div className="text-center px-3">
                <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Lectures</div>
                <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5 justify-center mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>5-Part Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* SUB-TABS SELECTOR (1: Video Lectures, 2: PYQs, 3: Sample Papers) */}
          <div className="flex items-center gap-2 mt-8 p-1.5 bg-stone-950/80 rounded-2xl border border-stone-800 max-w-fit shadow-lg">
            <button
              onClick={() => setActiveSubTab('videos')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'videos'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>1. Chapter Video Lectures</span>
            </button>

            <button
              onClick={() => setActiveSubTab('pyqs')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'pyqs'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Board PYQs Archive</span>
            </button>

            <button
              onClick={() => setActiveSubTab('sample_papers')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'sample_papers'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>3. DAVCAE Sample Papers</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUB-SECTION 1: VIDEO HUB & WORKSHEET PLAYER */}
      {/* ========================================================= */}
      {activeSubTab === 'videos' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">

          {/* STEP 1: CLASS SELECTOR BAR */}
          <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Select Your Class:
              </span>
              <span className="text-xs text-stone-400">
                Active Classes: <strong className="text-emerald-400">3 to 8</strong> • Junior: <strong className="text-stone-300">2, 1, UKG, LKG</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
              {sectionClasses.map((cls) => {
                const isSelected = selectedClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    onClick={() => handleClassChange(cls.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 border-amber-400 shadow-lg scale-105 ring-2 ring-amber-500/30'
                        : cls.active
                          ? 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-800'
                          : 'bg-stone-900/40 hover:bg-stone-900 text-stone-400 border-stone-800/60'
                    }`}
                  >
                    <span>{cls.label}</span>
                    {cls.active ? (
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-stone-950' : 'bg-emerald-500'}`} />
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-stone-800 text-stone-400">Junior</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* JUNIOR CLASSES (2, 1, UKG, LKG) IN-PREPARATION CARTOON BANNER */}
          {!isVideoAvailable ? (
            <div className="bg-gradient-to-br from-amber-950/40 via-stone-950 to-orange-950/30 rounded-3xl border-2 border-dashed border-amber-500/40 p-8 sm:p-14 text-center shadow-2xl max-w-3xl mx-auto my-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center mx-auto mb-5 shadow-xl text-3xl">
                🎨
              </div>
              <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
                🌟 Junior DAVian Corner (Class {selectedClass}) 🌟
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-4">
                Video Lessons for Class {selectedClass} are in Production!
              </h2>
              <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto leading-relaxed">
                Our DAV educators and animators are creating vibrant, cartoon-illustrated video stories for our young learners. In the meantime, you can explore the complete colorful picture textbooks in the Digital Library or learn interactively with Rishi AI!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
                <a
                  href="#section-2"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`To view Class ${selectedClass} official textbooks, navigate to Section 2 (Digital Library) from the top menu.`);
                  }}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open Class {selectedClass} Books in Digital Library</span>
                </a>
                <button
                  onClick={() => {
                    if (onOpenAIWithQuestion) {
                      onOpenAIWithQuestion(`I am a student of DAV Class ${selectedClass}. Can you tell me an exciting educational story with fun rhymes and moral lessons?`);
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-2 border border-stone-700 transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Fun Learning with Rishi AI</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 2: SUBJECT SELECTOR BAR (STRICT ACADEMICS ONLY, NO COMPUTER/GK/NS/DRAWING) */}
              <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800 shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Select Subject for Class {selectedClass}:
                  </span>
                  <span className="text-xs text-stone-400">
                    Core Academic Curricula: <strong className="text-white">{availableSubjects.length} Dedicated Subjects</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                  {availableSubjects.map((s) => {
                    const isSelected = selectedSubject === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleSubjectChange(s.id)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg font-black scale-105 ring-2 ring-blue-500/30'
                            : 'bg-stone-900/80 hover:bg-stone-800 text-stone-200 border-stone-800'
                        }`}
                      >
                        <span className="text-base">{s.icon || '📚'}</span>
                        <span>{s.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* MAIN 2-COLUMN VIDEO THEATER WORKSPACE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* LEFT COLUMN: CHAPTER DIRECTORY (4 COLS) */}
                <div className="lg:col-span-4 bg-stone-950 rounded-3xl border border-stone-800 p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-black text-white flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>Chapter Index</span>
                      </h3>
                      <p className="text-xs text-stone-400 mt-0.5">
                        Class {selectedClass} • {currentSubjectObj.name}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-black text-amber-400">
                      {availableChapters.length} Chapters
                    </span>
                  </div>

                  {/* Chapter Search Bar */}
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search chapter name or number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-stone-900/90 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Chapter List */}
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
                    {filteredChapters.map((ch) => {
                      const isSelected = Number(ch.num) === Number(currentChapterObj.num);
                      return (
                        <button
                          key={ch.num}
                          onClick={() => handleChapterChange(ch.num)}
                          className={`w-full text-left p-3 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                            isSelected
                              ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border-amber-500 text-white font-black shadow-md ring-1 ring-amber-500/30'
                              : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 text-stone-300'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                            isSelected ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {ch.num}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold leading-snug truncate">
                              {ch.title}
                            </div>
                            <div className="text-[10px] text-stone-400 mt-1 flex items-center gap-2">
                              <span>3 Verified Teachers</span>
                              <span>•</span>
                              <span className="text-amber-400 font-semibold">5-Part Lectures</span>
                            </div>
                          </div>
                          {isSelected && (
                            <Play className="w-4 h-4 text-amber-400 shrink-0 mt-1 fill-current animate-pulse" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Ask Rishi AI About This Chapter */}
                  <div className="mt-4 pt-4 border-t border-stone-800">
                    <button
                      onClick={handleAskAIAboutChapter}
                      className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 hover:from-stone-800 hover:to-stone-800 border border-amber-500/30 text-amber-400 text-xs font-black flex items-center justify-between transition cursor-pointer shadow-md group"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                        <span>Ask Rishi AI About Chapter {currentChapterObj.num}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN: VIDEO THEATER & MULTI-TEACHER HUB (8 COLS) */}
                <div className="lg:col-span-8 space-y-5">
                  
                  {/* TWO CORE MODES: 1. CHAPTER EXPLANATION vs 2. QUESTIONS & WORKSHEETS */}
                  <div className="bg-stone-950 p-2 rounded-2xl border border-stone-800 flex flex-wrap sm:flex-nowrap gap-2 shadow-xl">
                    <button
                      onClick={() => handleModeChange('explanation')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 ${
                        lectureMode === 'explanation'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md scale-[1.01]'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{explanationButtonLabel}</span>
                    </button>

                    <button
                      onClick={() => handleModeChange('solutions')}
                      className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center justify-center gap-2 ${
                        lectureMode === 'solutions'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.01]'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{solutionsButtonLabel}</span>
                    </button>
                  </div>

                  {/* PARTS / WORKSHEETS SELECTOR BAR */}
                  <div className="bg-stone-950 p-3.5 rounded-2xl border border-stone-800 shadow-lg">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-amber-400" />
                        {lectureMode === 'explanation' 
                          ? '5-Part Comprehensive Lecture Breakdown:' 
                          : (selectedSubject === 'maths' 
                              ? 'Select Mathematics Worksheet / Exercise:' 
                              : selectedSubject.includes('practice')
                                ? 'Select English Grammar Worksheet:'
                                : selectedSubject.includes('abhyas')
                                  ? 'Select Hindi Abhyas Sagar Section:'
                                  : 'Select Chapter Exercise Section:')
                        }
                      </span>
                      <span className="text-[11px] text-stone-400">
                        Selected: <strong className="text-amber-400">{selectedPartObj.label}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                      {availableParts.map((p) => {
                        const isSel = selectedPartId === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => handlePartChange(p.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
                              isSel
                                ? 'bg-amber-500 text-stone-950 border-amber-300 font-black shadow-md scale-105'
                                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-800'
                            }`}
                          >
                            <span>{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* VIDEO PLAYER CARD */}
                  <div className="bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl card-super-interactive border-halo-gold">
                    {/* Player Header Bar */}
                    <div className="p-4 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold shadow-md">
                          <Play className="w-4 h-4 fill-current" />
                        </span>
                        <div>
                          <h2 className="text-sm sm:text-base font-black text-white truncate max-w-md">
                            Ch {currentChapterObj.num}: {currentChapterObj.title}
                          </h2>
                          <div className="text-[11px] text-stone-400 flex items-center gap-2">
                            <span>Class {selectedClass}</span>
                            <span>•</span>
                            <span>{currentSubjectObj.name}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-bold">{selectedPartObj.label}</span>
                          </div>
                        </div>
                      </div>

                      {/* Player Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Playback Mode Switcher */}
                        <div className="inline-flex rounded-xl bg-stone-950 p-1 border border-stone-800">
                          <button
                            onClick={() => setPlayerMode('chapter')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              playerMode === 'chapter'
                                ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                                : 'text-stone-400 hover:text-white'
                            }`}
                            title="Watch Chapter / Part Video"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Lesson Video</span>
                          </button>

                          {activeLecture.playlistId && (
                            <button
                              onClick={() => setPlayerMode('playlist')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                                playerMode === 'playlist'
                                  ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                                  : 'text-stone-400 hover:text-white'
                              }`}
                              title="Switch to Full Subject Playlist"
                            >
                              <Layers className="w-3.5 h-3.5" />
                              <span>Full Playlist</span>
                            </button>
                          )}
                        </div>

                        <button
                          onClick={handleCopyLink}
                          className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-stone-700"
                          title="Copy Video Link"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                        </button>

                        <button
                          onClick={() => {
                            if (user?.plan === 'guest' || user?.isDemo) {
                              if (onRequireLogin) onRequireLogin('Login to Continue', 'Please log in with your Student ID & Password to watch official DAV video lectures on YouTube.');
                              return;
                            }
                            window.open(activeLecture.watchUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Watch on YouTube</span>
                        </button>
                      </div>
                    </div>

                    {/* Sub-Header Status Bar */}
                    <div className="px-4 py-2 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>DAV Verified Syllabus</span>
                        </span>
                        <span className="text-stone-400 text-[11px]">
                          Educator: <strong className="text-stone-200">{activeLecture.teacher.name}</strong> ({activeLecture.teacher.handle})
                        </span>
                      </div>

                      <span className="text-[11px] text-stone-400">
                        Section: <strong className="text-amber-400">{selectedPartObj.label}</strong>
                      </span>
                    </div>

                    {/* 16:9 EMBEDDED RESPONSIVE YOUTUBE PLAYER WITH ZERO DEAD SCREENS & STRICT FALLBACK HANDLING */}
                    <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                      {(user?.plan === 'guest' || user?.isDemo) ? (
                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-stone-950 via-slate-900 to-stone-950">
                          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400/50 text-amber-400 flex items-center justify-center mb-4 shadow-xl">
                            <Lock className="w-8 h-8 text-amber-400 animate-bounce" />
                          </div>
                          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2 border border-amber-400/30">
                            Video Lectures Locked in Demo Preview
                          </span>
                          <h3 className="text-xl font-black text-white max-w-md mb-2">
                            {activeLecture.title || 'Official Video Explanation'}
                          </h3>
                          <p className="text-xs text-stone-300 max-w-sm mb-6 leading-relaxed">
                            Please log in or register with your Student ID to watch video lectures, access full playlists, and unlock past-year question paper solutions.
                          </p>
                          <button
                            onClick={() => {
                              if (onRequireLogin) onRequireLogin('Login to Continue', 'Please log in with your Student ID to watch full chapter video lectures.');
                            }}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:scale-105"
                          >
                            <Lock className="w-4 h-4 text-stone-950" />
                            <span>Login to Continue</span>
                          </button>
                        </div>
                      ) : playerMode === 'playlist' && activeLecture.playlistId ? (
                        <iframe
                          key={`playlist-${activeLecture.playlistId}`}
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${activeLecture.playlistId}&rel=0&autoplay=0&modestbranding=1`}
                          title={`${currentSubjectObj.name} Course Playlist`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : activeLecture.videoId ? (
                        <iframe
                          key={`video-${activeLecture.videoId}`}
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/${activeLecture.videoId}?rel=0&autoplay=0&modestbranding=1`}
                          title={activeLecture.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : lectureMode === 'explanation' && !activeLecture.isPartAvailable ? (
                        /* All-in-One Comprehensive Lecture Card (Part 2-5 covered in Part 1) */
                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950">
                          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4 text-2xl">
                            🌟
                          </div>
                          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                            Full Syllabus Covered in Earlier Part
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white max-w-md">
                            No Separate Video Needed for {selectedPartObj.label}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-300 max-w-md mt-2 leading-relaxed">
                            {activeLecture.partNotice || "Great news! Your teacher covers the complete concepts and exercises for this chapter in the main lecture."}
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                            <button
                              onClick={() => setSelectedPartId('part1')}
                              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 transition shadow-md cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Watch Part 1 (Main Lecture)</span>
                            </button>
                            <a
                              href={activeLecture.watchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center gap-2 border border-stone-700 transition"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Search on YouTube</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        /* Solutions in Production Card (Strict Separation: No Explanation Video Fallback) */
                        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-stone-950 via-blue-950/30 to-stone-950">
                          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4 text-2xl">
                            ✍️
                          </div>
                          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-wider mb-2">
                            Worksheet Solutions & Exercises
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-white max-w-md">
                            Specific Solution Video for {selectedPartObj.label}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-300 max-w-md mt-2 leading-relaxed">
                            We strictly ensure explanation videos are not played for solutions. You can search YouTube directly for this teacher's solution video or let Rishi AI solve it step-by-step for you!
                          </p>
                          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                            <a
                              href={activeLecture.watchUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs flex items-center gap-2 transition shadow-md"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Search Solution on YouTube</span>
                            </a>
                            <button
                              onClick={handleAskAIAboutWorksheet}
                              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-2 transition shadow-md cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Solve with Rishi AI</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* School Network Fallback Notice Banner */}
                    <div className="bg-stone-900/60 px-4 py-2 border-b border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>School Wi-Fi or adblocker blocking embedded player? Click <strong>"Watch on YouTube"</strong> above.</span>
                      </div>
                      <a
                        href={activeLecture.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Direct YouTube Lecture Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Video Info Bar & Navigation Footer */}
                    <div className="p-5 bg-stone-950 border-t border-stone-800">
                      {activeLecture.isCrashCourse && (
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-red-500/20 border border-orange-500/40 text-orange-400 text-xs font-black mb-3.5 shadow-sm">
                          <Flame className="w-4 h-4 fill-current text-orange-400" />
                          <span>One-Shot Crash Course & Rapid Revision Marathon (DAV GURU)</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold text-white leading-snug">
                            {activeLecture.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-400">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-amber-400" />
                              <strong className="text-stone-200">{activeLecture.teacher.name}</strong>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-blue-400" />
                              <span>{activeLecture.duration}</span>
                            </span>
                            <span>•</span>
                            <span className="text-emerald-400 font-bold">{activeLecture.teacher.badge}</span>
                          </div>
                        </div>

                        {/* Next / Prev Chapter Navigation */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onClick={() => handleNavigateChapter('prev')}
                            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                            title="Previous Chapter"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Prev</span>
                          </button>

                          <button
                            onClick={() => handleNavigateChapter('next')}
                            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black flex items-center gap-1 transition cursor-pointer shadow-md"
                            title="Next Chapter"
                          >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* KEY TOPICS COVERED PILLS */}
                      {activeLecture.keyTopics && activeLecture.keyTopics.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-stone-800">
                          <div className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                            Topics & Exercises Covered in this Lesson:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activeLecture.keyTopics.map((topic, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-medium"
                              >
                                ✓ {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3 SPECIALIZED CURATED TEACHERS PANEL */}
                  <div className="bg-stone-950 rounded-3xl border border-stone-800 p-5 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-400" />
                          <span>Choose Educator for {selectedPartObj.label}</span>
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Select between 3 distinct verified educators teaching this exact class and subject.
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                        3 Dedicated Teachers
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      {availableTeachers.map((tch, idx) => {
                        const isSelected = activeTeacherIndex === idx;
                        const isAuthorMatch = activeLecture.teacher.id === tch.id;
                        return (
                          <button
                            key={tch.id || idx}
                            onClick={() => setActiveTeacherIndex(idx)}
                            className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                              isAuthorMatch
                                ? 'bg-stone-900 border-emerald-500 shadow-xl ring-2 ring-emerald-500/30'
                                : isSelected
                                  ? 'bg-stone-900 border-amber-500 shadow-xl ring-2 ring-amber-500/30'
                                  : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 text-stone-400'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  idx === 0 
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                                    : 'bg-stone-800 text-stone-300'
                                }`}>
                                  {idx === 0 ? 'Primary Specialist' : `Teacher Option ${idx + 1}`}
                                </span>
                                {isAuthorMatch ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                ) : isSelected ? (
                                  <Check className="w-4 h-4 text-amber-400" />
                                ) : null}
                              </div>

                              <div className="text-sm font-black text-white mt-1">
                                {tch.name}
                              </div>
                              <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                                {tch.handle}
                              </div>

                              <div className="mt-2 text-xs font-medium text-stone-300 line-clamp-2">
                                {tch.specialty}
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                              <span className="text-stone-400 truncate max-w-[120px]">{tch.badge}</span>
                              <span className={`font-bold flex items-center gap-1 ${
                                isAuthorMatch ? 'text-emerald-400' : isSelected ? 'text-amber-400' : 'text-stone-400'
                              }`}>
                                <span>{isAuthorMatch ? 'Playing' : isSelected ? 'Active' : 'Switch'}</span>
                                <Play className="w-3 h-3 fill-current" />
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* STUDY COMPANION & TEXTBOOK SYNC CARD */}
                  <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-6 rounded-3xl border border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Synchronized with Section 2 Digital Library</span>
                      </div>
                      <h4 className="text-lg font-black text-white">
                        Want to read the textbook PDF while watching?
                      </h4>
                      <p className="text-xs text-stone-300 mt-1 max-w-xl leading-relaxed">
                        Open <strong className="text-amber-400">{currentSubjectObj.name}</strong> in Section 2 to use the 10-color neon highlighter, sticky notes, and vertical reading workspace.
                      </p>
                    </div>

                    <a
                      href="#section-2"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`To view the full verified PDF for ${currentSubjectObj.name}, navigate to Section 2 (Digital Library) from the top menu.`);
                      }}
                      className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-black text-xs flex items-center gap-2 border border-stone-700 shrink-0 transition"
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      <span>Open Book in Section 2</span>
                    </a>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 2: PREVIOUS YEAR QUESTIONS (PYQs) */}
      {/* ========================================================= */}
      {activeSubTab === 'pyqs' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Header & Lock Notice */}
          <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sub-Section 2 • DAV Board Previous Year Questions (PYQs)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Board & Annual Examination Question Papers
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  Official DAVCAE question papers with full solutions, step-by-step marking rubrics, and model answers.
                </p>
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-bold">Class:</span>
                {['8', '7', '6', '5'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-blue-600 text-white font-black shadow-md'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* School Admin Vault Notice */}
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    School Examination Archive Vault
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Additional verified DAVCAE papers and question links will be populated directly by your school administrator.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onOpenAIWithQuestion) {
                    onOpenAIWithQuestion(`Generate a high-yield DAV Class ${selectedClass} practice question bank with answers for the upcoming annual exams.`);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Questions with Rishi AI</span>
              </button>
            </div>
          </div>

          {/* PYQ Papers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPyqs.map((pyq) => (
              <div
                key={pyq.id}
                className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black">
                      {pyq.year} Board Exam
                    </span>
                    <span className="text-xs font-mono text-stone-400 font-bold">
                      Class {pyq.classId}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white leading-snug group-hover:text-blue-300 transition-colors">
                    {pyq.title}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">
                    {pyq.term} • {pyq.marks} Marks • {pyq.duration}
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 space-y-1.5 text-xs text-stone-300">
                    <div className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">Highlights:</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">• Complete Section A to E questions with official marking scheme.</p>
                    <p className="text-[11px] text-stone-400 leading-relaxed">• Includes step-by-step model answers and diagram rubrics.</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      alert(`Opening ${pyq.title}... Official DAVCAE question paper archive.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenAIWithQuestion) {
                        onOpenAIWithQuestion(`Please solve all questions from DAV Class ${pyq.classId} ${pyq.subject} ${pyq.year} board examination paper with detailed step-by-step marking rubrics.`);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Solve with AI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 3: SAMPLE PAPERS & MODEL TEST PAPERS */}
      {/* ========================================================= */}
      {activeSubTab === 'sample_papers' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Header & Lock Notice */}
          <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Sub-Section 3 • Official DAVCAE Blueprint & Model Test Papers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Pre-Board & Model Practice Examination Series
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  100% compliant with DAV College Managing Committee (DAVCMC / DAVCAE) 80-mark blueprints and marking guidelines.
                </p>
              </div>

              {/* Class Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400 font-bold">Class:</span>
                {['8', '7', '6', '5'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => setSelectedClass(cls)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-emerald-600 text-white font-black shadow-md'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* School Admin Vault Notice */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    DAV Pre-Board Sample Paper Vault
                  </div>
                  <div className="text-[11px] text-stone-300">
                    Additional verified sample paper links will be added directly by your school administrator.
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (onOpenAIWithQuestion) {
                    onOpenAIWithQuestion(`Create an authentic 80-mark DAV pre-board sample test paper for Class ${selectedClass} based strictly on the official DAVCAE blueprint.`);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Test with Rishi AI</span>
              </button>
            </div>
          </div>

          {/* Sample Papers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSamplePapers.map((sp) => (
              <div
                key={sp.id}
                className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                      {sp.badge}
                    </span>
                    <span className="text-xs font-mono text-stone-400 font-bold">
                      Class {sp.classId}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-white leading-snug group-hover:text-emerald-300 transition-colors">
                    {sp.title}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1.5">
                    {sp.blueprint}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-2">
                    Rating: <strong className="text-emerald-400">{sp.rating}</strong>
                  </div>

                  {/* General Instructions */}
                  <div className="mt-4 pt-3 border-t border-stone-800 space-y-1.5 text-xs text-stone-300">
                    <div className="font-black text-stone-400 uppercase text-[10px] tracking-wider">
                      Examination Instructions:
                    </div>
                    {sp.instructions.map((ins, i) => (
                      <p key={i} className="text-[11px] text-stone-400 leading-relaxed">
                        • {ins}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      alert(`Downloading official DAVCAE sample blueprint for ${sp.title}... This PDF is prepared in compliance with the DAV Board curriculum.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenAIWithQuestion) {
                        onOpenAIWithQuestion(`Generate a full model practice test paper for DAV Class ${sp.classId} ${sp.subject} based on the official 80-mark blueprint with questions and step-by-step answer key.`);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
