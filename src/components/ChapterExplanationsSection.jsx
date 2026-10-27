import React, { useState, useMemo } from 'react';
import { 
  X, ArrowLeft,
  Calculator,
  Play, Video, BookOpen, FileText, Award, CheckCircle2, 
  ExternalLink, Copy, Check, Search, Sparkles, Clock, 
  User, Layers, Filter, Download, ChevronRight, ChevronLeft, 
  Flame, ShieldCheck, HelpCircle, ArrowRight, Share2, Compass,
  Star, Lock, AlertCircle, RefreshCw, Sparkle, Smile, Plus, Trash2, Upload, Eye
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
  PYQ_CLASSES, 
  getSubjectsForClass, 
  getPyqPapers, 
  VKPDT_PYQ_ARCHIVE 
} from '../data/pyqArchiveData.js';
import { 
  resolveActiveLecture, 
  DAV_PYQ_ARCHIVE, 
  DAV_SAMPLE_PAPERS 
} from '../data/videoLecturesData.js';

export function ChapterExplanationsSection({ user, onOpenAIWithQuestion, onOpenPdfReader, onRequireLogin }) {
  // Sub-Section Tabs (1: Video Lectures, 2: Notes, 3: PYQs, 4: Sample Papers)
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

  // =========================================================================
  // SUB-SECTION 2: NOTES & HANDOUTS STATE (Zero demo data, authentic upload)
  // =========================================================================
  const [uploadedNotes, setUploadedNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_official_chapter_notes_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [isUploadingNote, setIsUploadingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteChapter, setNoteChapter] = useState(1);
  const [noteFileData, setNoteFileData] = useState(null);
  const [noteFileName, setNoteFileName] = useState('');
  const [noteFileSize, setNoteFileSize] = useState('');
  const [uploadNoteError, setUploadNoteError] = useState('');
  const [selectedNotesChapterFilter, setSelectedNotesChapterFilter] = useState('all');

  // =========================================================================
  // SUB-SECTION 3: PYQ MODAL & WORKSPACE STATE (Curated from VKPDT IT GURU DAV)
  const [pyqSelectedClass, setPyqSelectedClass] = useState('8');
  const [pyqSelectedSubject, setPyqSelectedSubject] = useState('science');
  const [showPyqSubjectModal, setShowPyqSubjectModal] = useState(false);
  const [pyqSubjectSearch, setPyqSubjectSearch] = useState('');
  const [pyqExamFilter, setPyqExamFilter] = useState('all'); // 'all' | 'half_yearly' | 'board' | 'annual'
  const [attachedScannedPdfs, setAttachedScannedPdfs] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_attached_scanned_pyq_pdfs_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {};
  });

  const handleAttachScannedPdf = (paperId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please select a valid PDF file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const updated = {
        ...attachedScannedPdfs,
        [paperId]: {
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          dataUrl: event.target.result,
          uploadedAt: new Date().toLocaleDateString('en-IN')
        }
      };
      setAttachedScannedPdfs(updated);
      try {
        localStorage.setItem('dav_attached_scanned_pyq_pdfs_v1', JSON.stringify(updated));
      } catch (err) {}
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAttachedPdf = (paperId) => {
    const updated = { ...attachedScannedPdfs };
    delete updated[paperId];
    setAttachedScannedPdfs(updated);
    try {
      localStorage.setItem('dav_attached_scanned_pyq_pdfs_v1', JSON.stringify(updated));
    } catch (err) {}
  };

  // UPLOADED PYQ STATE
  // =========================================================================
  const [uploadedPyqs, setUploadedPyqs] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_uploaded_pyqs_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [isUploadingPyq, setIsUploadingPyq] = useState(false);
  const [pyqTitle, setPyqTitle] = useState('');
  const [pyqSubject, setPyqSubject] = useState('Science');
  const [pyqYear, setPyqYear] = useState('2024');
  const [pyqMarks, setPyqMarks] = useState('80 Marks');
  const [pyqFileData, setPyqFileData] = useState(null);
  const [pyqFileName, setPyqFileName] = useState('');
  const [pyqFileSize, setPyqFileSize] = useState('');
  const [uploadPyqError, setUploadPyqError] = useState('');

  // =========================================================================
  // SUB-SECTION 4: UPLOADED SAMPLE PAPERS STATE
  // =========================================================================
  const [uploadedSamplePapers, setUploadedSamplePapers] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_uploaded_sample_papers_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [isUploadingSamplePaper, setIsUploadingSamplePaper] = useState(false);
  const [sampleTitle, setSampleTitle] = useState('');
  const [sampleSubject, setSampleSubject] = useState('Science');
  const [sampleTerm, setSampleTerm] = useState('Pre-Board Blueprint');
  const [sampleMarks, setSampleMarks] = useState('80 Marks');
  const [sampleFileData, setSampleFileData] = useState(null);
  const [sampleFileName, setSampleFileName] = useState('');
  const [sampleFileSize, setSampleFileSize] = useState('');
  const [uploadSampleError, setUploadSampleError] = useState('');

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

  // Filtered PYQs (Combines user-uploaded PYQs and official DAV archive)
  const filteredPyqs = useMemo(() => {
    const all = [...uploadedPyqs, ...DAV_PYQ_ARCHIVE];
    return all.filter(p => {
      const matchYear = selectedPyqYear === 'all' || p.year === selectedPyqYear;
      const matchClass = selectedClass === 'all' || p.classId === selectedClass;
      const matchSubject = selectedPyqSubject === 'all' || p.subject.toLowerCase().includes(selectedPyqSubject.toLowerCase());
      return matchYear && matchClass && matchSubject;
    });
  }, [uploadedPyqs, selectedPyqYear, selectedClass, selectedPyqSubject]);

  // Filtered Sample Papers (Combines user-uploaded sample papers and official DAV archive)
  const filteredSamplePapers = useMemo(() => {
    const all = [...uploadedSamplePapers, ...DAV_SAMPLE_PAPERS];
    return all.filter(sp => {
      const matchClass = selectedClass === 'all' || sp.classId === selectedClass;
      const matchSubject = selectedSampleSubject === 'all' || sp.subject.toLowerCase().includes(selectedSampleSubject.toLowerCase());
      return matchClass && matchSubject;
    });
  }, [uploadedSamplePapers, selectedClass, selectedSampleSubject]);

  // Notes PDF File Picker handler
  const handlePdfFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadNoteError('Please select a valid PDF file.');
      return;
    }
    setNoteFileName(file.name);
    setNoteFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    setUploadNoteError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setNoteFileData(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Save uploaded note (Stored locally in cloud-ready persistent state)
  const handleSaveNote = () => {
    if (!noteTitle.trim()) {
      setUploadNoteError('Please enter a note title.');
      return;
    }
    if (!noteFileData) {
      setUploadNoteError('Please choose a PDF file.');
      return;
    }
    const chNum = Number(noteChapter);
    const matchedCh = availableChapters.find(c => Number(c.num) === chNum);
    const newNote = {
      id: `note_${Date.now()}`,
      title: noteTitle.trim(),
      classNum: selectedClass,
      subjectId: currentSubjectObj.id,
      subjectName: currentSubjectObj.name,
      chapterNum: chNum,
      chapterTitle: matchedCh ? matchedCh.title : `Chapter ${chNum}`,
      fileName: noteFileName,
      fileSize: noteFileSize,
      pdfUrl: noteFileData,
      uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      uploadedBy: user?.name || 'Rishit Shankar (Head Boy)'
    };
    const next = [newNote, ...uploadedNotes];
    setUploadedNotes(next);
    try {
      localStorage.setItem('dav_official_chapter_notes_v2', JSON.stringify(next));
    } catch (e) {}
    setIsUploadingNote(false);
    setNoteTitle('');
    setNoteFileData(null);
    setNoteFileName('');
    setNoteFileSize('');
    setUploadNoteError('');
  };

  const handleDeleteNote = (noteId) => {
    const next = uploadedNotes.filter(n => n.id !== noteId);
    setUploadedNotes(next);
    try {
      localStorage.setItem('dav_official_chapter_notes_v2', JSON.stringify(next));
    } catch (e) {}
  };

  const handleOpenNotePdf = (note) => {
    if (onOpenPdfReader) {
      onOpenPdfReader({
        title: note.title,
        subject: note.subjectName,
        classNum: note.classNum,
        pdfUrl: note.pdfUrl,
        fileData: note.pdfUrl,
        summary: `Official DAV Chapter Notes: ${note.title} (Class ${note.classNum})`
      });
    }
  };

  const handlePyqPdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadPyqError('Please select a valid PDF file.');
      return;
    }
    setPyqFileName(file.name);
    setPyqFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    setUploadPyqError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setPyqFileData(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSavePyq = () => {
    if (!pyqTitle.trim()) {
      setUploadPyqError('Please enter a PYQ title.');
      return;
    }
    if (!pyqFileData) {
      setUploadPyqError('Please choose a PDF file.');
      return;
    }
    const newPyq = {
      id: `pyq_${Date.now()}`,
      title: pyqTitle.trim(),
      subject: pyqSubject,
      year: pyqYear,
      classId: selectedClass,
      term: 'Annual Board Exam',
      marks: pyqMarks || '80',
      duration: '3 Hours',
      fileName: pyqFileName,
      fileSize: pyqFileSize,
      pdfUrl: pyqFileData,
      isUserUploaded: true,
      uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      uploadedBy: user?.name || 'Faculty / Student'
    };
    const next = [newPyq, ...uploadedPyqs];
    setUploadedPyqs(next);
    try {
      localStorage.setItem('dav_uploaded_pyqs_v2', JSON.stringify(next));
    } catch (e) {}
    setIsUploadingPyq(false);
    setPyqTitle('');
    setPyqFileData(null);
    setPyqFileName('');
    setUploadPyqError('');
  };

  const handleDeletePyq = (id) => {
    const next = uploadedPyqs.filter(p => p.id !== id);
    setUploadedPyqs(next);
    try {
      localStorage.setItem('dav_uploaded_pyqs_v2', JSON.stringify(next));
    } catch (e) {}
  };

  const handleSamplePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setUploadSampleError('Please select a valid PDF file.');
      return;
    }
    setSampleFileName(file.name);
    setSampleFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    setUploadSampleError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      setSampleFileData(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSamplePaper = () => {
    if (!sampleTitle.trim()) {
      setUploadSampleError('Please enter a sample paper title.');
      return;
    }
    if (!sampleFileData) {
      setUploadSampleError('Please choose a PDF file.');
      return;
    }
    const newSample = {
      id: `sample_${Date.now()}`,
      title: sampleTitle.trim(),
      subject: sampleSubject,
      term: sampleTerm,
      blueprint: `${sampleTerm} • ${sampleMarks} • 3 Hours`,
      badge: 'Uploaded Paper',
      rating: '5.0 ★ Model Paper',
      classId: selectedClass,
      fileName: sampleFileName,
      fileSize: sampleFileSize,
      pdfUrl: sampleFileData,
      isUserUploaded: true,
      instructions: [
        'Time Allowed: 3 Hours • Maximum Marks: 80',
        'All questions are compulsory according to DAVCAE curriculum blueprint.'
      ],
      uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      uploadedBy: user?.name || 'Faculty / Student'
    };
    const next = [newSample, ...uploadedSamplePapers];
    setUploadedSamplePapers(next);
    try {
      localStorage.setItem('dav_uploaded_sample_papers_v2', JSON.stringify(next));
    } catch (e) {}
    setIsUploadingSamplePaper(false);
    setSampleTitle('');
    setSampleFileData(null);
    setSampleFileName('');
    setUploadSampleError('');
  };

  const handleDeleteSamplePaper = (id) => {
    const next = uploadedSamplePapers.filter(s => s.id !== id);
    setUploadedSamplePapers(next);
    try {
      localStorage.setItem('dav_uploaded_sample_papers_v2', JSON.stringify(next));
    } catch (e) {}
  };

  // Filtered Notes for Subsection 2
  const filteredNotes = useMemo(() => {
    return uploadedNotes.filter(n => {
      const matchClass = String(n.classNum) === String(selectedClass);
      const matchSubj = n.subjectId === currentSubjectObj.id;
      const matchChapter = selectedNotesChapterFilter === 'all' || Number(n.chapterNum) === Number(selectedNotesChapterFilter);
      return matchClass && matchSubj && matchChapter;
    });
  }, [uploadedNotes, selectedClass, currentSubjectObj, selectedNotesChapterFilter]);

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
                <span>Section 6 • Videos & Exams</span>
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

          {/* SUB-TABS SELECTOR (1: Video Lectures, 2: Notes, 3: PYQs, 4: Sample Papers) */}
          <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 bg-stone-950/80 rounded-2xl border border-stone-800 shadow-lg">
            <button
              onClick={() => setActiveSubTab('videos')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'videos'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>1. Chapter Video Lectures</span>
            </button>

            <button
              onClick={() => setActiveSubTab('notes')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'notes'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>2. Notes & Handouts</span>
            </button>

            <button
              onClick={() => setActiveSubTab('pyqs')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'pyqs'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>3. Board PYQs Archive</span>
            </button>

            <button
              onClick={() => setActiveSubTab('sample_papers')}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition cursor-pointer flex items-center gap-2 ${
                activeSubTab === 'sample_papers'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-[1.02]'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>4. DAV Sample Papers</span>
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

              {/* STEP 3: PROMINENT CHAPTER SELECTOR TOOLBAR (ALWAYS VISIBLE & INSTANT TO SELECT) */}
              <div className="bg-stone-950 p-4 rounded-3xl border border-stone-800 shadow-xl flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-amber-400" />
                    <span>Select Chapter ({availableChapters.length} Total Chapters):</span>
                  </span>
                  <select
                    value={selectedChapterNum}
                    onChange={(e) => handleChapterChange(Number(e.target.value))}
                    className="bg-stone-900 border border-amber-500/60 text-white text-xs sm:text-sm font-black rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer max-w-xs sm:max-w-md shadow-lg"
                  >
                    {availableChapters.map((ch) => (
                      <option key={ch.num} value={ch.num}>
                        Chapter {ch.num}: {ch.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleChapterChange(Math.max(1, selectedChapterNum - 1))}
                    disabled={selectedChapterNum <= 1}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-stone-200 text-xs font-bold border border-stone-800 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Chapter</span>
                  </button>
                  <span className="text-xs font-mono font-bold text-amber-400 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800">
                    {selectedChapterNum} / {availableChapters.length}
                  </span>
                  <button
                    onClick={() => handleChapterChange(Math.min(availableChapters.length, selectedChapterNum + 1))}
                    disabled={selectedChapterNum >= availableChapters.length}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 text-stone-200 text-xs font-bold border border-stone-800 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed transition"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
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
      {/* SUB-SECTION 2: CHAPTER NOTES & OFFICIAL HANDOUTS VAULT */}
      {/* ========================================================= */}
      {activeSubTab === 'notes' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          
          {/* Header Banner */}
          <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-widest mb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sub-Section 2 • Official DAV Chapter Notes & Handouts</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Chapter Notes & Official Handouts Vault
                </h2>
                <div className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/70 via-purple-950/70 to-stone-900 border border-indigo-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>Google NotebookLM Study Hub</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30">
                          Audio Overviews & Notes
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-300">
                        Upload your Class 8 Science PDF to Google NotebookLM to generate deep-dive AI audio explanations, study guides, and FAQs. Export and upload notes here!
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://notebooklm.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition shrink-0 cursor-pointer shadow-md"
                  >
                    <span>Open NotebookLM</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  Verified handwritten and typed notes, chapter summaries, and formula sheets for DAV students. Clean PDF reader integration with cloud streaming.
                </p>
              </div>

              {/* Upload Button */}
              <button
                onClick={() => setIsUploadingNote(true)}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg shadow-purple-950/30 transition cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload Chapter Notes PDF</span>
              </button>
            </div>

            {/* Step 1: Class Selector */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-purple-400">
                  Select Class:
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Currently Viewing: Class {selectedClass}
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {sectionClasses.map((cls) => (
                  <button
                    key={cls.id}
                    onClick={() => handleClassChange(cls.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                      selectedClass === cls.id
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border-stone-800'
                    }`}
                  >
                    <span>{cls.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Subject Selector */}
            <div className="pt-4 mt-3 border-t border-stone-800/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-blue-400">
                  Select Subject:
                </span>
                <span className="text-xs text-stone-400">
                  {availableSubjects.length} Core Subjects
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {availableSubjects.map((s) => {
                  const isSelected = selectedSubject === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSubjectChange(s.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-400 font-black shadow-md scale-105'
                          : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border-stone-800'
                      }`}
                    >
                      <span>{s.icon || '📚'}</span>
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Chapter Filter */}
            <div className="pt-4 mt-3 border-t border-stone-800/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-400">Filter Chapter:</span>
                <select
                  value={selectedNotesChapterFilter}
                  onChange={(e) => setSelectedNotesChapterFilter(e.target.value)}
                  className="bg-stone-900 border border-stone-700 text-white text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Chapters ({availableChapters.length})</option>
                  {availableChapters.map((ch) => (
                    <option key={ch.num} value={ch.num}>
                      Ch {ch.num}: {ch.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-stone-400 font-mono">
                Total Notes in Vault: <strong className="text-purple-400">{filteredNotes.length}</strong>
              </div>
            </div>
          </div>

          {/* Upload Drawer / Modal */}
          {isUploadingNote && (
            <div className="bg-stone-950 p-6 rounded-3xl border-2 border-purple-500/60 shadow-2xl animate-fadeIn space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-purple-400" />
                  <span>Upload Official Notes PDF for Class {selectedClass} • {currentSubjectObj.name}</span>
                </h3>
                <button
                  onClick={() => setIsUploadingNote(false)}
                  className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {uploadNoteError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold">
                  {uploadNoteError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Notes Title:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chapter 1: Living World Complete Formula & Notes"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Applicable Chapter:
                  </label>
                  <select
                    value={noteChapter}
                    onChange={(e) => setNoteChapter(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
                  >
                    {availableChapters.map((ch) => (
                      <option key={ch.num} value={ch.num}>
                        Ch {ch.num}: {ch.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1">
                  Choose PDF File:
                </label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handlePdfFileChange}
                  className="w-full text-xs text-stone-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer bg-stone-900 p-2 rounded-xl border border-stone-700"
                />
                {noteFileName && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Selected: {noteFileName} ({noteFileSize})
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingNote(false)}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  <span>Save &amp; Publish Notes PDF</span>
                </button>
              </div>
            </div>
          )}

          {/* Notes Cards Display */}
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-purple-500/50 transition group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-black">
                        DAV Chapter Note
                      </span>
                      <span className="text-xs font-mono text-stone-400 font-bold">
                        Ch {note.chapterNum}
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white leading-snug group-hover:text-purple-300 transition-colors">
                      {note.title}
                    </h3>
                    <div className="text-xs text-amber-400 font-semibold mt-1">
                      {note.chapterTitle}
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 space-y-1">
                      <div>Class: <strong className="text-white">Class {note.classNum} • {note.subjectName}</strong></div>
                      <div>File: <strong className="text-stone-300">{note.fileName || 'Notes.pdf'} ({note.fileSize || 'PDF'})</strong></div>
                      <div>Uploaded: <strong className="text-stone-300">{note.uploadedAt}</strong> by {note.uploadedBy}</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenNotePdf(note)}
                      className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Notes PDF</span>
                    </button>

                    {note.pdfUrl && (
                      <a
                        href={note.pdfUrl}
                        download={`${note.title}.pdf`}
                        className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 cursor-pointer"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                      </a>
                    )}

                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-2 rounded-xl bg-stone-900 hover:bg-rose-950 text-stone-400 hover:text-rose-400 border border-stone-700 cursor-pointer"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-950 rounded-3xl border border-stone-800 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-white">
                Official Notes Vault for Class {selectedClass} • {currentSubjectObj.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 leading-relaxed">
                No notes uploaded yet for this subject. Rishit Shankar will upload verified DAV chapter notes in PDF format directly into this vault.
              </p>
              <button
                onClick={() => setIsUploadingNote(true)}
                className="mt-6 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-950/40"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload Notes PDF Now</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-SECTION 3: PREVIOUS YEAR QUESTIONS (PYQs) */}
      {/* Exclusively Curated from YouTuber VKPDT IT GURU DAV (@VKPDTITGURU) */}
      {/* Zero Demo PDFs - Real Video Walkthroughs, Rishi AI Solver, & Authentic Uploads */}
      {/* ========================================================= */}
      {activeSubTab === 'pyqs' && (() => {
        // Compute available subjects for the selected class (6 for 6-8, 5 for 3-5)
        const currentClassSubjects = getSubjectsForClass(pyqSelectedClass);
        const activeSubjectObj = currentClassSubjects.find(s => s.id === pyqSelectedSubject) || currentClassSubjects[0];
        
        // Filter subjects inside pop-up modal
        const filteredModalSubjects = currentClassSubjects.filter(s => {
          if (!pyqSubjectSearch.trim()) return true;
          const q = pyqSubjectSearch.toLowerCase();
          return s.name.toLowerCase().includes(q) || s.hindiName.toLowerCase().includes(q) || s.books.toLowerCase().includes(q);
        });

        // Get the official VKPDT IT GURU papers for selected class and subject
        const allPapersForSelection = getPyqPapers(pyqSelectedClass, activeSubjectObj.id);
        const halfYearlyPapers = allPapersForSelection.filter(p => p.examType === 'half_yearly');
        const annualOrBoardPapers = allPapersForSelection.filter(p => p.examType === 'board' || p.examType === 'annual');

        const isClass8 = pyqSelectedClass === '8';
        const secondTermLabel = isClass8 ? 'Board Examination' : 'Annual Examination';
        const secondTermHindi = isClass8 ? 'वार्षिक बोर्ड परीक्षा' : 'वार्षिक परीक्षा';

        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
            
            {/* Header & Class Navigation Card */}
            <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl space-y-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Sub-Section 3 • DAV Board Previous Year Questions (PYQs)</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    DAV Official PYQ & Question Paper Archive
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                    Featuring video solutions, marking rubrics, and detailed breakdowns exclusively from verified YouTuber <strong className="text-amber-400">VKPDT IT GURU DAV</strong> (<a href="https://www.youtube.com/@VKPDTITGURU" target="_blank" rel="noreferrer" className="underline hover:text-white">@VKPDTITGURU</a>). All demo PDFs removed.
                  </p>
                </div>

                {/* Action Controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Choose Subject Pop-up Trigger Button */}
                  <button
                    onClick={() => {
                      setPyqSubjectSearch('');
                      setShowPyqSubjectModal(true);
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-950/40 transition cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>Choose Subject (Pop-up Modal) ⚡</span>
                  </button>

                  {/* Upload Custom Scanned PYQ */}
                  <button
                    onClick={() => setIsUploadingPyq(true)}
                    className="px-4 py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-emerald-400" />
                    <span>+ Upload Your School PYQ</span>
                  </button>
                </div>
              </div>

              {/* Step 1: Interactive Class Selection Cards */}
              <div className="pt-4 border-t border-stone-800/80">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                    <span>Step 1: Choose Class (Class 8 to Class 3)</span>
                    <span className="text-blue-400">• Click any class to open Subject Pop-up</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {PYQ_CLASSES.map((c) => {
                    const isSelected = pyqSelectedClass === c.id;
                    const isC8 = c.id === '8';
                    const numSubjs = parseInt(c.id, 10) >= 6 ? 6 : 5;
                    return (
                      <button
                        key={c.id}
                        onClick={() => {
                          setPyqSelectedClass(c.id);
                          // Ensure selected subject exists in this class
                          const newSubjs = getSubjectsForClass(c.id);
                          if (!newSubjs.some(s => s.id === pyqSelectedSubject)) {
                            setPyqSelectedSubject(newSubjs[0].id);
                          }
                          setPyqSubjectSearch('');
                          // Open pop-up modal like Section 3
                          setShowPyqSubjectModal(true);
                        }}
                        className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer group relative overflow-hidden ${
                          isSelected
                            ? 'bg-gradient-to-br from-blue-950/80 to-indigo-950/80 border-blue-500 shadow-lg shadow-blue-950/50'
                            : 'bg-stone-900/80 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-black ${isSelected ? 'text-white' : 'text-stone-200'}`}>
                            {c.label}
                          </span>
                          {isC8 && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              BOARD
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400 line-clamp-1">
                          {numSubjs} Subjects • 3 Yrs PYQ
                        </div>
                        <div className="mt-2 text-[10px] font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>Select Subject</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Selection Breadcrumb & Educator Attribution */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                        Active Workspace:
                      </span>
                      <span className="text-sm font-black text-white">
                        Class {pyqSelectedClass} • {activeSubjectObj.name} ({activeSubjectObj.hindiName})
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {parseInt(pyqSelectedClass) >= 6 ? '6 Subjects Track' : '5 Subjects Track'}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-300 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span>Curated by: <strong className="text-amber-400">VKPDT IT GURU DAV</strong> (@VKPDTITGURU)</span>
                      <span>•</span>
                      <a 
                        href="https://www.youtube.com/@VKPDTITGURU" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline font-bold inline-flex items-center gap-0.5"
                      >
                        <span>Visit Channel</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setPyqSubjectSearch('');
                      setShowPyqSubjectModal(true);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>Change Subject</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenAIWithQuestion) {
                        onOpenAIWithQuestion(`Provide the complete syllabus checklist and high-yield questions for DAV Class ${pyqSelectedClass} ${activeSubjectObj.name} board and annual examinations based on the last 3 years question patterns.`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rishi AI Exam Checklist</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ======================================================= */}
            {/* SUBJECT SELECTION POP-UP MODAL (Like Section 3 Flow)    */}
            {/* ======================================================= */}
            {showPyqSubjectModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
                <div className="w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#0c1427] via-[#101b38] to-[#0a0f20] border-2 border-blue-500/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
                  
                  {/* Modal Header */}
                  <div className="p-5 sm:p-6 bg-blue-950/80 border-b border-blue-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                        DAVCAE OFFICIAL ARCHIVE • CLASS {pyqSelectedClass} • STEP 2
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                        <span>Select Subject ({parseInt(pyqSelectedClass) >= 6 ? '6 Subjects' : '5 Subjects'})</span>
                        <span className="text-blue-400">⚡</span>
                      </h2>
                      <p className="text-xs text-stone-300 mt-0.5">
                        Exclusively curated from YouTuber <strong>VKPDT IT GURU DAV</strong> (@VKPDTITGURU)
                      </p>
                    </div>

                    <button
                      onClick={() => setShowPyqSubjectModal(false)}
                      className="w-10 h-10 rounded-xl bg-blue-900/60 hover:bg-rose-600 text-blue-200 hover:text-white flex items-center justify-center transition border border-blue-700 cursor-pointer"
                      title="Close Pop-up"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal Search Bar */}
                  <div className="px-6 pt-4 pb-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-blue-400" />
                      <input
                        type="text"
                        value={pyqSubjectSearch}
                        onChange={(e) => setPyqSubjectSearch(e.target.value)}
                        placeholder={`Search Class ${pyqSelectedClass} subjects (e.g. Science, Maths, Hindi, SST, Sanskrit)... fudge`}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-blue-950/60 border border-blue-700 text-white placeholder-blue-400/60 text-xs focus:outline-none focus:border-amber-400"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Modal Subject Cards Grid */}
                  <div className="p-6 overflow-y-auto space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {filteredModalSubjects.map((subj, idx) => {
                        const isCurrent = pyqSelectedSubject === subj.id;
                        return (
                          <button
                            key={subj.id}
                            onClick={() => {
                              setPyqSelectedSubject(subj.id);
                              setShowPyqSubjectModal(false);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group flex flex-col justify-between ${
                              isCurrent
                                ? 'bg-gradient-to-br from-blue-900/90 to-indigo-900/90 border-blue-400 shadow-lg shadow-blue-950/60 ring-2 ring-blue-500/40'
                                : 'bg-stone-900/90 border-stone-800 hover:border-blue-500/60 hover:bg-stone-800/90'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-black text-xs border border-blue-500/30">
                                  #{idx + 1}
                                </span>
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
                                  3 Yrs PYQ
                                </span>
                              </div>

                              <div className="text-base font-black text-white group-hover:text-blue-300 transition-colors">
                                {subj.name}
                              </div>
                              <div className="text-xs font-semibold text-stone-300 mt-0.5">
                                {subj.hindiName}
                              </div>
                              <div className="text-[11px] text-stone-400 mt-1 line-clamp-2">
                                {subj.books}
                              </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between">
                              <span className="text-[11px] text-blue-400 font-bold">
                                Half-Yearly & {isClass8 ? 'Board' : 'Annual'}
                              </span>
                              <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-300 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                                <ChevronRight className="w-4 h-4" />
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-4 bg-blue-950/60 border-t border-blue-800/60 flex items-center justify-between text-xs text-stone-300">
                    <div>
                      Selected Class: <strong className="text-white">Class {pyqSelectedClass}</strong> • {filteredModalSubjects.length} Subject(s) Available
                    </div>
                    <button
                      onClick={() => setShowPyqSubjectModal(false)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold cursor-pointer transition border border-stone-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Exam Term Filter Tabs (Half-Yearly vs Annual/Board) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 bg-stone-900/80 p-1.5 rounded-2xl border border-stone-800">
                <button
                  onClick={() => setPyqExamFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    pyqExamFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  All Exam Papers (6 Papers)
                </button>
                <button
                  onClick={() => setPyqExamFilter('half_yearly')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    pyqExamFilter === 'half_yearly'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  Half-Yearly Examination (3 Years)
                </button>
                <button
                  onClick={() => setPyqExamFilter('annual_or_board')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                    pyqExamFilter === 'annual_or_board'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  {secondTermLabel} (3 Years)
                </button>
              </div>

              <div className="text-xs text-stone-400 font-bold">
                Showing Official Papers for: <span className="text-white">Class {pyqSelectedClass} {activeSubjectObj.name}</span>
              </div>
            </div>

            {/* ======================================================= */}
            {/* SECTION 1: HALF-YEARLY EXAMINATION PAPERS (3 YEARS)     */}
            {/* ======================================================= */}
            {(pyqExamFilter === 'all' || pyqExamFilter === 'half_yearly') && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Part 1 • Half-Yearly Examination (अर्धवार्षिक परीक्षा)
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold">
                      Last 3 Years (2023-24, 2022-23, 2021-22)
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Video Solutions by VKPDT IT GURU DAV
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {halfYearlyPapers.map((paper) => {
                    const attachedPdf = attachedScannedPdfs[paper.id];
                    return (
                      <div
                        key={paper.id}
                        className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black">
                              {paper.year} Half-Yearly
                            </span>
                            <span className="text-xs font-mono text-stone-400 font-bold">
                              Class {paper.classId} • {paper.marks}
                            </span>
                          </div>

                          <h4 className="text-base font-black text-white leading-snug group-hover:text-blue-300 transition-colors">
                            DAV Class {paper.classId} {paper.subjectName} Half-Yearly Exam ({paper.year})
                          </h4>
                          <div className="text-xs text-amber-400 font-semibold mt-1">
                            {paper.timeAllowed} • Verified DAVCAE Question Paper
                          </div>

                          {/* Educator Badge */}
                          <div className="mt-3 py-1.5 px-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-[11px]">
                            <span className="text-stone-400">Educator:</span>
                            <a
                              href={paper.educatorChannel}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <span>{paper.educator}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {/* Section Breakdown */}
                          <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-1.5 text-xs text-stone-300">
                            <div className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">
                              Paper Blueprint & Sections:
                            </div>
                            {paper.sections.slice(0, 3).map((sec, sIdx) => (
                              <p key={sIdx} className="text-[11px] text-stone-400 leading-relaxed flex items-center justify-between">
                                <span className="truncate">• {sec.name}</span>
                                <span className="font-mono text-stone-300 font-bold shrink-0">{sec.total}M</span>
                              </p>
                            ))}
                            {paper.sections.length > 3 && (
                              <p className="text-[10px] text-stone-300 font-semibold">
                                + {paper.sections.length - 3} more sections (Full marking scheme in video)
                              </p>
                            )}
                          </div>

                          {/* Attached Scanned PDF if user uploaded */}
                          {attachedPdf && (
                            <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-[11px] flex items-center justify-between">
                              <span className="text-emerald-300 font-bold truncate">
                                📎 {attachedPdf.fileName} ({attachedPdf.fileSize})
                              </span>
                              <button
                                onClick={() => handleRemoveAttachedPdf(paper.id)}
                                className="text-rose-400 hover:text-rose-300 font-bold shrink-0 ml-2 cursor-pointer"
                                title="Remove Attached PDF"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-4 border-t border-stone-800 space-y-2">
                          <div className="flex items-center gap-2">
                            {/* Watch Video Walkthrough (VKPDT IT GURU) */}
                            <a
                              href={paper.youtubeSearchUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Watch Video Walkthrough</span>
                            </a>

                            {/* Solve with Rishi AI */}
                            <button
                              onClick={() => {
                                if (onOpenAIWithQuestion) {
                                  onOpenAIWithQuestion(`Please provide the complete step-by-step solutions, answer key, and marking rubric for DAV Class ${paper.classId} ${paper.subjectName} Half-Yearly Examination (${paper.year}) as analyzed by educator VKPDT IT GURU DAV.`);
                                }
                              }}
                              className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center justify-center gap-1 shadow-md transition cursor-pointer"
                              title="Solve with Rishi AI"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI Solve</span>
                            </button>
                          </div>

                          {/* Attach / View Local Scanned PDF */}
                          <div className="flex items-center justify-between gap-2 pt-1">
                            {attachedPdf ? (
                              <button
                                onClick={() => {
                                  if (onOpenPdfReader) {
                                    onOpenPdfReader(attachedPdf.dataUrl, attachedPdf.fileName);
                                  } else {
                                    window.open(attachedPdf.dataUrl, '_blank');
                                  }
                                }}
                                className="w-full py-1.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View My Scanned PDF</span>
                              </button>
                            ) : (
                              <label className="w-full py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer">
                                <Upload className="w-3 h-3 text-blue-400" />
                                <span>Attach Physical Scanned PDF</span>
                                <input
                                  type="file"
                                  accept="application/pdf,.pdf"
                                  className="hidden"
                                  onChange={(e) => handleAttachScannedPdf(paper.id, e)}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* SECTION 2: ANNUAL / BOARD EXAMINATION PAPERS (3 YEARS)  */}
            {/* ======================================================= */}
            {(pyqExamFilter === 'all' || pyqExamFilter === 'annual_or_board') && (
              <div className="space-y-4 pt-6">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Part 2 • {secondTermLabel} ({secondTermHindi})
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      Last 3 Years (2023-24, 2022-23, 2021-22)
                    </span>
                  </div>
                  <span className="text-xs text-stone-400">
                    Video Solutions by VKPDT IT GURU DAV
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {annualOrBoardPapers.map((paper) => {
                    const attachedPdf = attachedScannedPdfs[paper.id];
                    return (
                      <div
                        key={paper.id}
                        className="bg-stone-950 p-6 rounded-3xl border border-stone-800 shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black">
                              {paper.year} {isClass8 ? 'Board Exam' : 'Annual Exam'}
                            </span>
                            <span className="text-xs font-mono text-stone-400 font-bold">
                              Class {paper.classId} • {paper.marks}
                            </span>
                          </div>

                          <h4 className="text-base font-black text-white leading-snug group-hover:text-amber-300 transition-colors">
                            DAV Class {paper.classId} {paper.subjectName} {secondTermLabel} ({paper.year})
                          </h4>
                          <div className="text-xs text-amber-400 font-semibold mt-1">
                            {paper.timeAllowed} • {isClass8 ? 'Official DAVCAE Board Examination Paper' : 'Official DAVCAE Annual Exam Paper'}
                          </div>

                          {/* Educator Badge */}
                          <div className="mt-3 py-1.5 px-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between text-[11px]">
                            <span className="text-stone-400">Educator:</span>
                            <a
                              href={paper.educatorChannel}
                              target="_blank"
                              rel="noreferrer"
                              className="text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
                            >
                              <span>{paper.educator}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>

                          {/* Section Breakdown */}
                          <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-1.5 text-xs text-stone-300">
                            <div className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">
                              Paper Blueprint & Sections:
                            </div>
                            {paper.sections.slice(0, 3).map((sec, sIdx) => (
                              <p key={sIdx} className="text-[11px] text-stone-400 leading-relaxed flex items-center justify-between">
                                <span className="truncate">• {sec.name}</span>
                                <span className="font-mono text-stone-300 font-bold shrink-0">{sec.total}M</span>
                              </p>
                            ))}
                            {paper.sections.length > 3 && (
                              <p className="text-[10px] text-stone-300 font-semibold">
                                + {paper.sections.length - 3} more sections (Full marking scheme in video)
                              </p>
                            )}
                          </div>

                          {/* Attached Scanned PDF if user uploaded */}
                          {attachedPdf && (
                            <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-[11px] flex items-center justify-between">
                              <span className="text-emerald-300 font-bold truncate">
                                📎 {attachedPdf.fileName} ({attachedPdf.fileSize})
                              </span>
                              <button
                                onClick={() => handleRemoveAttachedPdf(paper.id)}
                                className="text-rose-400 hover:text-rose-300 font-bold shrink-0 ml-2 cursor-pointer"
                                title="Remove Attached PDF"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 pt-4 border-t border-stone-800 space-y-2">
                          <div className="flex items-center gap-2">
                            {/* Watch Video Walkthrough (VKPDT IT GURU) */}
                            <a
                              href={paper.youtubeSearchUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Watch Video Walkthrough</span>
                            </a>

                            {/* Solve with Rishi AI */}
                            <button
                              onClick={() => {
                                if (onOpenAIWithQuestion) {
                                  onOpenAIWithQuestion(`Please provide the complete step-by-step solutions, answer key, and marking rubric for DAV Class ${paper.classId} ${paper.subjectName} ${secondTermLabel} (${paper.year}) as analyzed by educator VKPDT IT GURU DAV.`);
                                }
                              }}
                              className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center justify-center gap-1 shadow-md transition cursor-pointer"
                              title="Solve with Rishi AI"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>AI Solve</span>
                            </button>
                          </div>

                          {/* Attach / View Local Scanned PDF */}
                          <div className="flex items-center justify-between gap-2 pt-1">
                            {attachedPdf ? (
                              <button
                                onClick={() => {
                                  if (onOpenPdfReader) {
                                    onOpenPdfReader(attachedPdf.dataUrl, attachedPdf.fileName);
                                  } else {
                                    window.open(attachedPdf.dataUrl, '_blank');
                                  }
                                }}
                                className="w-full py-1.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>View My Scanned PDF</span>
                              </button>
                            ) : (
                              <label className="w-full py-1.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer">
                                <Upload className="w-3 h-3 text-amber-400" />
                                <span>Attach Physical Scanned PDF</span>
                                <input
                                  type="file"
                                  accept="application/pdf,.pdf"
                                  className="hidden"
                                  onChange={(e) => handleAttachScannedPdf(paper.id, e)}
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Custom Upload Drawer */}
            {isUploadingPyq && (
              <div className="bg-stone-950 p-6 rounded-3xl border-2 border-blue-500/60 shadow-2xl animate-fadeIn space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-400" />
                    <span>Upload Your School's Scanned Question Paper</span>
                  </h3>
                  <button
                    onClick={() => setIsUploadingPyq(false)}
                    className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {uploadPyqError && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold">
                    {uploadPyqError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-stone-300 block mb-1">
                      Paper Title:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DAV Public School Half-Yearly Exam 2024"
                      value={pyqTitle}
                      onChange={(e) => setPyqTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">
                      Exam Year:
                    </label>
                    <input
                      type="text"
                      placeholder="2024"
                      value={pyqYear}
                      onChange={(e) => setPyqYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">
                      Subject:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Science & Technology"
                      value={pyqSubject}
                      onChange={(e) => setPyqSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-300 block mb-1">
                      Max Marks:
                    </label>
                    <input
                      type="text"
                      placeholder="80 Marks"
                      value={pyqMarks}
                      onChange={(e) => setPyqMarks(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Select Scanned Question Paper PDF:
                  </label>
                  <input
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handlePyqPdfChange}
                    className="w-full text-xs text-stone-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer bg-stone-900 p-2 rounded-xl border border-stone-700"
                  />
                  {pyqFileName && (
                    <p className="text-[11px] text-emerald-400 mt-1">
                      Selected: {pyqFileName} ({pyqFileSize})
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUploadingPyq(false)}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePyq}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black cursor-pointer shadow-md"
                  >
                    Save Scanned Paper
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ========================================================= */}
      {/* SUB-SECTION 4: SAMPLE PAPERS & MODEL TEST PAPERS */}
      {/* ========================================================= */}
      {activeSubTab === 'sample_papers' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
          {/* Header & Lock Notice */}
          <div className="bg-stone-950 p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>Sub-Section 4 • Official DAVCAE Blueprint & Model Test Papers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Pre-Board & Model Practice Examination Series
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                  100% compliant with DAV College Managing Committee (DAVCMC / DAVCAE) 80-mark blueprints and marking guidelines.
                </p>
              </div>

              {/* Upload Sample Paper Button */}
              <button
                onClick={() => setIsUploadingSamplePaper(true)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-950/30 transition cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload / Add Sample Paper</span>
              </button>

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

          {/* Sample Paper Upload Drawer / Modal */}
          {isUploadingSamplePaper && (
            <div className="bg-stone-950 p-6 rounded-3xl border-2 border-emerald-500/60 shadow-2xl animate-fadeIn space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  <span>Upload Model / Sample Examination Paper</span>
                </h3>
                <button
                  onClick={() => setIsUploadingSamplePaper(false)}
                  className="p-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {uploadSampleError && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-bold">
                  {uploadSampleError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Sample Paper Title:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DAV Pre-Board Model Test Paper 1 (2026)"
                    value={sampleTitle}
                    onChange={(e) => setSampleTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Exam Type / Term:
                  </label>
                  <input
                    type="text"
                    placeholder="Pre-Board Blueprint"
                    value={sampleTerm}
                    onChange={(e) => setSampleTerm(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Subject:
                  </label>
                  <select
                    value={sampleSubject}
                    onChange={(e) => setSampleSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Science">Science & Technology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Social Science">Social Science (SST)</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Sanskrit">Sanskrit</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-300 block mb-1">
                    Max Marks:
                  </label>
                  <input
                    type="text"
                    placeholder="80 Marks"
                    value={sampleMarks}
                    onChange={(e) => setSampleMarks(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-300 block mb-1">
                  Choose Sample Paper PDF:
                </label>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handleSamplePdfChange}
                  className="w-full text-xs text-stone-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer bg-stone-900 p-2 rounded-xl border border-stone-700"
                />
                {sampleFileName && (
                  <p className="text-[11px] text-emerald-400 mt-1">
                    Selected: {sampleFileName} ({sampleFileSize})
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadingSamplePaper(false)}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSamplePaper}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black cursor-pointer shadow-md"
                >
                  Save Sample Paper
                </button>
              </div>
            </div>
          )}

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
