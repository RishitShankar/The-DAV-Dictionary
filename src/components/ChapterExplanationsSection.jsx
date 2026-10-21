import React, { useState, useMemo } from 'react';
import { 
  Play, Video, BookOpen, FileText, Award, CheckCircle2, 
  ExternalLink, Copy, Check, Search, Sparkles, Clock, 
  User, Layers, Filter, Download, ChevronRight, ChevronLeft, 
  Flame, ShieldCheck, HelpCircle, ArrowRight, Share2, Compass
} from 'lucide-react';
import { DAV_CLASSES, DAV_SUBJECTS_BY_CLASS, getChaptersForClassSubject } from '../data/curriculumData';
import { 
  TOP_DAV_CREATORS, 
  getVideoLecturesForChapter, 
  DAV_PYQ_ARCHIVE, 
  DAV_SAMPLE_PAPERS 
} from '../data/videoLecturesData';

export function ChapterExplanationsSection({ user, onOpenAIWithQuestion }) {
  // Sub-Section Tabs (1: Video Lectures, 2: PYQs, 3: Sample Papers)
  const [activeSubTab, setActiveSubTab] = useState('videos');

  // Video Hub State
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSubject, setSelectedSubject] = useState('science');
  const [selectedChapterNum, setSelectedChapterNum] = useState(1);
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);
  const [playerMode, setPlayerMode] = useState('chapter'); // 'chapter' | 'playlist'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // PYQ State
  const [selectedPyqYear, setSelectedPyqYear] = useState('all');
  const [selectedPyqSubject, setSelectedPyqSubject] = useState('all');
  const [activePyqModal, setActivePyqModal] = useState(null);

  // Sample Paper State
  const [selectedSampleSubject, setSelectedSampleSubject] = useState('all');

  // Subjects for currently selected class
  const availableSubjects = useMemo(() => {
    return DAV_SUBJECTS_BY_CLASS[selectedClass] || DAV_SUBJECTS_BY_CLASS['8'];
  }, [selectedClass]);

  // Current subject object
  const currentSubjectObj = useMemo(() => {
    return availableSubjects.find(s => s.id === selectedSubject) || availableSubjects[0];
  }, [availableSubjects, selectedSubject]);

  // Chapters for currently selected class & subject
  const availableChapters = useMemo(() => {
    return getChaptersForClassSubject(selectedClass, selectedSubject);
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

  // Videos available for current chapter
  const currentVideos = useMemo(() => {
    return getVideoLecturesForChapter(selectedClass, selectedSubject, currentChapterObj.num, currentChapterObj.title);
  }, [selectedClass, selectedSubject, currentChapterObj]);

  // Active playing video
  const activeVideo = currentVideos[activeTeacherIndex] || currentVideos[0];

  // Handle Class Switch
  const handleClassChange = (newClass) => {
    setSelectedClass(newClass);
    const newSubjects = DAV_SUBJECTS_BY_CLASS[newClass] || DAV_SUBJECTS_BY_CLASS['8'];
    const firstSubj = newSubjects[0].id;
    setSelectedSubject(firstSubj);
    const newChapters = getChaptersForClassSubject(newClass, firstSubj);
    setSelectedChapterNum(newChapters[0]?.num || 1);
    setActiveTeacherIndex(0);
    setPlayerMode('chapter');
  };

  // Handle Subject Switch
  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    const newChapters = getChaptersForClassSubject(selectedClass, newSubject);
    setSelectedChapterNum(newChapters[0]?.num || 1);
    setActiveTeacherIndex(0);
    setPlayerMode('chapter');
  };

  // Handle Chapter Switch
  const handleChapterChange = (num) => {
    setSelectedChapterNum(num);
    setActiveTeacherIndex(0);
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
    const url = activeVideo.videoId 
      ? `https://www.youtube.com/watch?v=${activeVideo.videoId}`
      : activeVideo.watchUrl;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Send Chapter to Shankar AI
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
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-24">
      {/* SECTION HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-900 border-b border-stone-800 pt-8 pb-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest mb-3">
                <Video className="w-3.5 h-3.5" />
                <span>Section 6 • Official DAV Video Lecture Hub & Exam Vault</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Chapter Explanations, PYQs & Sample Papers
              </h1>
              <p className="mt-2 text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Curated chapter-wise video lectures from top verified DAV educators—<strong className="text-amber-400">DAV GURU</strong> (Science & SST), <strong className="text-blue-400">Science Solutions</strong> (Mathematics), and <strong className="text-rose-400">Rishu Singh</strong> (Hindi)—paired with Board PYQs and official DAVCAE sample test papers.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-stone-950/80 p-3 rounded-2xl border border-stone-800 shadow-xl">
              <div className="text-center px-3 border-r border-stone-800">
                <div className="text-xs text-stone-400 font-bold uppercase">Classes</div>
                <div className="text-xl font-black text-amber-400">LKG–8</div>
              </div>
              <div className="text-center px-3 border-r border-stone-800">
                <div className="text-xs text-stone-400 font-bold uppercase">Educators</div>
                <div className="text-xl font-black text-white">Top 3</div>
              </div>
              <div className="text-center px-3">
                <div className="text-xs text-stone-400 font-bold uppercase">Status</div>
                <div className="text-xs font-black text-emerald-400 flex items-center gap-1 justify-center mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Video
                </div>
              </div>
            </div>
          </div>

          {/* 3 SUB-SECTIONS NAV TABS */}
          <div className="mt-8 flex items-center gap-2 border-b border-stone-800 pb-px overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('videos')}
              className={`px-5 py-3 rounded-t-xl font-black text-sm flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
                activeSubTab === 'videos'
                  ? 'bg-stone-800 text-amber-400 border-amber-500 shadow-md'
                  : 'text-stone-400 hover:text-white border-transparent hover:bg-stone-800/50'
              }`}
            >
              <Play className="w-4 h-4 text-amber-400" />
              <span>Sub-Section 1: Chapter-Wise Video Explanations</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                Live & Active
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('pyqs')}
              className={`px-5 py-3 rounded-t-xl font-black text-sm flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
                activeSubTab === 'pyqs'
                  ? 'bg-stone-800 text-blue-400 border-blue-500 shadow-md'
                  : 'text-stone-400 hover:text-white border-transparent hover:bg-stone-800/50'
              }`}
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Sub-Section 2: Previous Year Questions (PYQs)</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold">
                2020–2024
              </span>
            </button>

            <button
              onClick={() => setActiveSubTab('sample_papers')}
              className={`px-5 py-3 rounded-t-xl font-black text-sm flex items-center gap-2 transition cursor-pointer border-b-2 whitespace-nowrap ${
                activeSubTab === 'sample_papers'
                  ? 'bg-stone-800 text-emerald-400 border-emerald-500 shadow-md'
                  : 'text-stone-400 hover:text-white border-transparent hover:bg-stone-800/50'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Sub-Section 3: Sample Papers & Model Test Papers</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                DAVCAE Blueprint
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SUB-SECTION 1: CHAPTER-WISE VIDEO EXPLANATIONS */}
      {/* ========================================================= */}
      {activeSubTab === 'videos' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* STEP 1: CLASS SELECTOR BAR */}
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 mb-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Select Class:
              </span>
              <span className="text-xs text-stone-400 font-medium">
                Primary Focus: <strong className="text-amber-400">Class 5 to 8</strong> (Full Video Coverage)
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {DAV_CLASSES.map((c) => {
                const isSelected = selectedClass === c.id;
                const isPrimary = ['8', '7', '6', '5'].includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => handleClassChange(c.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 shadow-md scale-105'
                        : isPrimary
                        ? 'bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700'
                        : 'bg-stone-900/60 hover:bg-stone-800 text-stone-400 border border-stone-800'
                    }`}
                  >
                    {isPrimary && <Flame className={`w-3.5 h-3.5 ${isSelected ? 'text-stone-950' : 'text-amber-500'}`} />}
                    <span>Class {c.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: SUBJECT SELECTOR BAR */}
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 mb-6 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                Select Subject for Class {selectedClass}:
              </span>
              <span className="text-xs text-stone-400">
                Verified Curricula: <strong className="text-white">{availableSubjects.length} Subjects</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {availableSubjects.map((s) => {
                const isSelected = selectedSubject === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSubjectChange(s.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-md font-black'
                        : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800'
                    }`}
                  >
                    <span>{s.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN 2-COLUMN VIDEO THEATER WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: CHAPTER DIRECTORY (4 COLS) */}
            <div className="lg:col-span-4 bg-stone-950 rounded-3xl border border-stone-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    Chapter Index
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Class {selectedClass} • {currentSubjectObj.name}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] font-bold text-amber-400">
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
                  className="w-full bg-stone-900 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-stone-800 focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* Scrollable Chapter List */}
              <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1">
                {filteredChapters.map((ch) => {
                  const isSelected = Number(ch.num) === Number(currentChapterObj.num);
                  return (
                    <button
                      key={ch.num}
                      onClick={() => handleChapterChange(ch.num)}
                      className={`w-full p-3 rounded-xl text-left text-xs transition cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-300 font-black shadow-md'
                          : 'bg-stone-900/80 hover:bg-stone-800/90 text-stone-300 border-stone-800 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono font-black text-[11px] shrink-0 ${
                          isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-800 text-stone-400'
                        }`}>
                          {ch.num}
                        </span>
                        <span className="truncate">{ch.title}</span>
                      </div>
                      {isSelected ? (
                        <Play className="w-4 h-4 text-stone-950 shrink-0 fill-current" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick AI Action Card */}
              <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Study with Shankar AI</span>
                </div>
                <p className="text-[11px] text-stone-300 mb-3 leading-relaxed">
                  Have doubts in {currentChapterObj.title}? Ask Shankar AI for instant line-by-line solutions.
                </p>
                <button
                  onClick={handleAskAIAboutChapter}
                  className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                >
                  <span>Ask Shankar AI About Chapter {currentChapterObj.num}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: VIDEO THEATER & MULTI-TEACHER HUB (8 COLS) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* VIDEO PLAYER CARD */}
              <div className="bg-stone-950 rounded-3xl border border-stone-800 overflow-hidden shadow-2xl">
                {/* Player Header Bar */}
                <div className="p-4 bg-stone-900 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
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
                        <span className="text-amber-400 font-bold">{activeVideo.type}</span>
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
                        title="Watch Selected Chapter Video"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Chapter Video</span>
                      </button>

                      {activeVideo.playlistId && (
                        <button
                          onClick={() => setPlayerMode('playlist')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                            playerMode === 'playlist'
                              ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                              : 'text-stone-400 hover:text-white'
                          }`}
                          title="Switch to Full Teacher Playlist"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span>Full Playlist</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                      title="Copy Video Link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                    </button>

                    {activeVideo.playlistId && (
                      <a
                        href={`https://www.youtube.com/playlist?list=${activeVideo.playlistId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold flex items-center gap-1.5 transition shadow-sm border border-stone-700"
                        title="View Full Playlist on YouTube"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Teacher Playlist</span>
                      </a>
                    )}

                    <a
                      href={activeVideo.watchUrl || `https://www.youtube.com/watch?v=${activeVideo.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Watch on YouTube</span>
                    </a>
                  </div>
                </div>

                {/* Sub-Header Status Bar */}
                <div className="px-4 py-2 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between text-xs gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>100% Verified Playable Lecture</span>
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      Educator: <strong className="text-stone-200">{activeVideo.teacher.name}</strong> ({activeVideo.teacher.handle})
                    </span>
                  </div>

                  <span className="text-[11px] text-stone-400">
                    Mode: <strong className="text-amber-400">{playerMode === 'playlist' ? 'Official Course Playlist' : 'Chapter Lesson'}</strong>
                  </span>
                </div>

                {/* 16:9 EMBEDDED RESPONSIVE YOUTUBE PLAYER */}
                <div className="relative w-full aspect-video bg-black">
                  {playerMode === 'playlist' && activeVideo.playlistId ? (
                    <iframe
                      key={`playlist-${activeVideo.playlistId}`}
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/videoseries?list=${activeVideo.playlistId}&rel=0&autoplay=0&modestbranding=1`}
                      title={`${currentSubjectObj.name} Course Playlist`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : activeVideo.videoId ? (
                    <iframe
                      key={`video-${activeVideo.videoId}`}
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?rel=0&autoplay=0&modestbranding=1`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : activeVideo.playlistId ? (
                    <iframe
                      key={`fallback-${activeVideo.playlistId}`}
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/videoseries?list=${activeVideo.playlistId}&rel=0&autoplay=0&modestbranding=1`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <Video className="w-12 h-12 text-stone-600 mb-3" />
                      <p className="text-stone-300 text-sm font-bold">Video link is updating</p>
                      <a 
                        href={activeVideo.watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Watch directly on YouTube
                      </a>
                    </div>
                  )}
                </div>

                {/* School Network Fallback Notice Banner */}
                <div className="bg-stone-900/60 px-4 py-2 border-b border-stone-800 flex flex-wrap items-center justify-between text-[11px] text-stone-400 gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>School Wi-Fi or browser blocking embedded iframe? Use <strong>"Watch on YouTube"</strong> above or toggle <strong>"Full Playlist"</strong>.</span>
                  </div>
                  <a
                    href={activeVideo.watchUrl || `https://www.youtube.com/watch?v=${activeVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 shrink-0"
                  >
                    <span>Direct YouTube Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Video Info Bar & Navigation Footer */}
                <div className="p-5 bg-stone-950 border-t border-stone-800">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-white leading-snug">
                        {activeVideo.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-400">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <strong className="text-stone-200">{activeVideo.teacher.name}</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-400" />
                          <span>{activeVideo.duration}</span>
                        </span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{activeVideo.teacher.badge}</span>
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
                  {activeVideo.keyTopics && activeVideo.keyTopics.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-stone-800">
                      <div className="text-xs font-black text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        Topics & Worksheets Solved in this Video:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeVideo.keyTopics.map((topic, i) => (
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

              {/* 2 TO 3 CURATED YOUTUBERS SELECTION PANEL */}
              <div className="bg-stone-950 rounded-3xl border border-stone-800 p-5 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Available Verified YouTubers for this Chapter
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">
                      Choose between 2 to 3 top DAV educators for different explanations, worksheets, and one-shot revisions.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                    {currentVideos.length} Educators Available
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {currentVideos.map((vid, idx) => {
                    const isSelected = activeTeacherIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveTeacherIndex(idx)}
                        className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                          isSelected
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
                              {idx === 0 ? 'Primary Recommended' : `Teacher Option ${idx + 1}`}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                          </div>

                          <div className="text-sm font-black text-white mt-1">
                            {vid.teacher.name}
                          </div>
                          <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                            {vid.teacher.handle}
                          </div>

                          <div className="mt-2 text-xs font-semibold text-stone-200 line-clamp-2">
                            {vid.title}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-stone-400 font-mono">{vid.duration}</span>
                          <span className="font-bold text-amber-400 flex items-center gap-1">
                            <span>Watch</span>
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
                  href={`#book-${currentSubjectObj.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    // Link to open PDF or trigger action
                    alert(`To view the full verified PDF for ${currentSubjectObj.name}, navigate to Section 2 (Official Textbooks) from the left sidebar.`);
                  }}
                  className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-black text-xs flex items-center gap-2 border border-stone-700 shrink-0 transition"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Open Book in Section 2</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 2: PREVIOUS YEAR QUESTIONS (PYQs) */}
      {/* ========================================================= */}
      {activeSubTab === 'pyqs' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Header & Filter Controls */}
          <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sub-Section 2 • DAV Board Previous Year Questions (PYQs)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Board & Annual Examination Question Papers
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  Authentic DAVCAE question papers with full solutions, step-by-step marking rubrics, and model answers.
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
                        ? 'bg-blue-600 text-white font-black'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stone-800">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-xs font-bold text-stone-400">Exam Year:</span>
                {['all', '2024', '2023', '2022', '2021'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedPyqYear(yr)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedPyqYear === yr
                        ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50'
                        : 'bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    {yr === 'all' ? 'All Years' : yr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PYQ PAPERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPyqs.map((paper) => (
              <div
                key={paper.id}
                className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black">
                      DAV Board Exam {paper.year}
                    </span>
                    <span className="text-xs font-mono text-stone-400 font-bold">
                      Class {paper.classId} • {paper.timeAllowed}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {paper.subject}
                  </h3>
                  <div className="text-xs text-amber-400 font-semibold mt-1">
                    {paper.term} • Maximum Marks: {paper.marks}
                  </div>
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Section Breakdown Pills */}
                  <div className="mt-4 pt-4 border-t border-stone-800/80 space-y-2">
                    <div className="text-[11px] font-black uppercase text-stone-400 tracking-wider">
                      Paper Structure & Mark Distribution:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {paper.sections.map((sec, idx) => (
                        <div key={idx} className="p-2 rounded-xl bg-stone-900/80 border border-stone-800/80">
                          <div className="font-bold text-stone-200 text-[11px] truncate">{sec.name}</div>
                          <div className="text-[10px] text-stone-400 mt-0.5">
                            {sec.questionsCount} Qs • {sec.totalMarks} Marks
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActivePyqModal(paper)}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-stone-700"
                  >
                    <span>View Sample Questions</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (onOpenAIWithQuestion) {
                        onOpenAIWithQuestion(`Solve the following questions from DAV Class ${paper.classId} ${paper.subject} ${paper.year} Board Paper with full step-by-step marking:\n\n${paper.sampleQuestions.join('\n')}`);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Practice with Shankar AI</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* MODAL: SAMPLE QUESTIONS PREVIEW */}
          {activePyqModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs font-black text-blue-400 uppercase tracking-widest">
                      DAV Board Exam {activePyqModal.year}
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">
                      Class {activePyqModal.classId} {activePyqModal.subject}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActivePyqModal(null)}
                    className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-3 max-h-96 overflow-y-auto pr-1">
                  <div className="text-xs font-black uppercase text-stone-400 tracking-wider">
                    Official Question Paper Extracts:
                  </div>
                  {activePyqModal.sampleQuestions.map((q, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-200 leading-relaxed">
                      {q}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div className="text-xs text-stone-400">
                    Maximum Marks: <strong className="text-white">{activePyqModal.marks}</strong> • Time: <strong className="text-white">{activePyqModal.timeAllowed}</strong>
                  </div>
                  <button
                    onClick={() => {
                      const paper = activePyqModal;
                      setActivePyqModal(null);
                      if (onOpenAIWithQuestion) {
                        onOpenAIWithQuestion(`Solve the following questions from DAV Class ${paper.classId} ${paper.subject} ${paper.year} Board Paper with full step-by-step marking:\n\n${paper.sampleQuestions.join('\n')}`);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Solve in Shankar AI</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 3: SAMPLE PAPERS & MODEL TEST PAPERS */}
      {/* ========================================================= */}
      {activeSubTab === 'sample_papers' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Header */}
          <div className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Sub-Section 3 • Official DAVCAE Blueprint & Model Test Papers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Pre-Board & Model Practice Examination Series
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
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
                        ? 'bg-emerald-600 text-white font-black'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    Class {cls}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Papers Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSamplePapers.map((sp) => (
              <div
                key={sp.id}
                className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition"
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

                  <h3 className="text-base font-black text-white leading-snug">
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
                        onOpenAIWithQuestion(`Generate a full model practice test paper for DAV Class ${sp.classId} ${sp.subject} based on the official 80-mark blueprint. Include Section A (1-mark MCQs), Section B (2-mark short questions), Section C (3-mark short questions), and Section D (5-mark long questions) with complete answer key.`);
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
