import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Award, BookOpen, CheckCircle2, XCircle, AlertTriangle, 
  Clock, ShieldAlert, Sparkles, ChevronRight, ChevronLeft, 
  FileText, HelpCircle, Flame, Lock, Crown, Star, RefreshCw, 
  MapPin, Check, Send, Eye, EyeOff, Layers, Compass, Brain,
  Info, ExternalLink, BarChart3, Shuffle, Volume2, UserCheck
} from 'lucide-react';
import { 
  VALID_EXAM_CLASSES, 
  VALID_EXAM_SUBJECTS, 
  MCQ_EXAM_BANKS, 
  getMcqBankForClassSubject,
  SUBJECTIVE_EXAM_BANKS, 
  VVI_QUESTIONS_BANK, 
  INTERACTIVE_PRACTICE_BANK 
} from '../data/examPracticeData';

export function ExamPracticeSection({ 
  currentUser, 
  onRequireLogin, 
  onOpenUpgradeModal, 
  onOpenAIWithQuestion 
}) {
  // User Tier Calculation
  const isDeveloper = Boolean(
    currentUser?.dimension === 4 || 
    currentUser?.id === 'rishibhai' || 
    currentUser?.studentId === 'rishibhai' || 
    currentUser?.role === 'developer'
  );
  const isTeacher = Boolean(
    currentUser?.dimension === 5 || 
    currentUser?.plan === 'teacher' || 
    currentUser?.isTeacher ||
    (currentUser?.role && currentUser?.role.toLowerCase().includes('teacher'))
  );
  const hasFullAccess = isDeveloper || isTeacher;
  const isGuest = !currentUser || currentUser?.plan === 'guest' || currentUser?.isDemo;
  const userPlan = currentUser?.plan || 'normal'; // 'normal' | 'vip' | 'vvip' | 'double_vip'
  const isDoubleVip = hasFullAccess || userPlan === 'vvip' || userPlan === 'double_vip';
  const isVip = isDoubleVip || userPlan === 'vip';
  const isNormal = isVip || userPlan === 'normal' || userPlan === 'pro';

  // Subsections: 'tests' (Sub 1) | 'vvi' (Sub 2) | 'practice' (Sub 3)
  const [activeSubSection, setActiveSubSection] = useState('tests');

  // Class and Subject Selection (Default: Class 8, Science)
  const [selectedClass, setSelectedClass] = useState(() => {
    const userCls = currentUser?.classNum ? `Class ${currentUser.classNum}` : 'Class 8';
    return VALID_EXAM_CLASSES.includes(userCls) ? userCls : 'Class 8';
  });
  const [selectedSubject, setSelectedSubject] = useState('Science');

  // Check if current user is below Class 3
  const isExcludedClass = !VALID_EXAM_CLASSES.includes(selectedClass);

  // -------------------------------------------------------------
  // SUBSECTION 1: TESTS (MCQ Exam & Subjective Test)
  // -------------------------------------------------------------
  const [testMode, setTestMode] = useState('mcq'); // 'mcq' | 'subjective'
  
  // MCQ Question Count: Normal=25, VIP=50, Double VIP=100
  const maxAllowedQuestions = useMemo(() => {
    if (hasFullAccess || isDoubleVip) return 100;
    if (isVip) return 50;
    if (isNormal) return 25;
    return 5; // Demo preview
  }, [hasFullAccess, isDoubleVip, isVip, isNormal]);

  const [chosenQuestionCount, setChosenQuestionCount] = useState(25);

  // Exam States
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qIndex]: chosenOptionIndex }
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // seconds
  const [cheatViolations, setCheatViolations] = useState(0);
  const [cheatNotice, setCheatNotice] = useState('');
  const [shuffledExamQuestions, setShuffledExamQuestions] = useState([]);

  // Load Exam Questions
  const loadExamQuestions = () => {
    const rawBank = getMcqBankForClassSubject(selectedClass, selectedSubject, chosenQuestionCount);
    // Shuffle options for fair exam practice while keeping correct answer index tracked
    const prepared = rawBank.map((q, idx) => {
      const originalOptions = [...q.options];
      const correctText = originalOptions[q.correctIndex || 0];
      // Deterministic pseudo-shuffle based on question ID
      const shuffled = [...originalOptions].sort(() => 0.5 - Math.random());
      const newCorrectIndex = shuffled.indexOf(correctText);
      return {
        ...q,
        displayId: idx + 1,
        shuffledOptions: shuffled,
        shuffledCorrectIndex: newCorrectIndex
      };
    });
    setShuffledExamQuestions(prepared);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsExamSubmitted(false);
    setCheatViolations(0);
    setCheatNotice('');
    // Timer: 1 minute per question + 5 mins buffer
    setTimeRemaining(chosenQuestionCount * 60);
  };

  const handleStartExam = () => {
    if (isGuest && chosenQuestionCount > 5) {
      onOpenUpgradeModal?.();
      return;
    }
    loadExamQuestions();
    setIsExamStarted(true);
  };

  // Anti-Cheat: Visibility Change Listener (10 Violations auto-submit)
  useEffect(() => {
    if (!isExamStarted || isExamSubmitted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCheatViolations(prev => {
          const nextCount = prev + 1;
          if (nextCount >= 10) {
            setCheatNotice('CRITICAL: 10 Tab Switch Violations detected! Exam submitted automatically.');
            setIsExamSubmitted(true);
          } else {
            setCheatNotice(`ANTI-CHEAT WARNING #${nextCount}/10: Leaving the exam tab is prohibited!`);
          }
          return nextCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isExamStarted, isExamSubmitted]);

  // Exam Countdown Timer
  useEffect(() => {
    if (!isExamStarted || isExamSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isExamStarted, isExamSubmitted]);

  // Format Timer mm:ss
  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Score Calculation
  const examResults = useMemo(() => {
    if (!isExamSubmitted || shuffledExamQuestions.length === 0) return null;
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    const incorrectList = [];

    shuffledExamQuestions.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      if (userChoice === undefined) {
        unattempted++;
        incorrectList.push({
          qNum: idx + 1,
          question: q.q,
          userAnsText: 'Not Attempted',
          correctAnsText: q.shuffledOptions[q.shuffledCorrectIndex],
          isUnattempted: true
        });
      } else if (userChoice === q.shuffledCorrectIndex) {
        correct++;
      } else {
        wrong++;
        incorrectList.push({
          qNum: idx + 1,
          question: q.q,
          userAnsText: q.shuffledOptions[userChoice],
          correctAnsText: q.shuffledOptions[q.shuffledCorrectIndex],
          isUnattempted: false
        });
      }
    });

    const total = shuffledExamQuestions.length;
    const percentage = Math.round((correct / total) * 100);
    let grade = 'F';
    if (percentage >= 90) grade = 'A+ (Distinction)';
    else if (percentage >= 80) grade = 'A (Exemplary)';
    else if (percentage >= 70) grade = 'B (Proficient)';
    else if (percentage >= 50) grade = 'C (Passed)';

    return {
      total,
      correct,
      wrong,
      unattempted,
      percentage,
      grade,
      incorrectList
    };
  }, [isExamSubmitted, shuffledExamQuestions, selectedAnswers]);

  // Subjective Test Answers drafting
  const [subjectiveStudentAnswers, setSubjectiveStudentAnswers] = useState({});
  const [revealedRubrics, setRevealedRubrics] = useState({});

  // -------------------------------------------------------------
  // SUBSECTION 2: VVI QUESTIONS ACCESS & DISPLAY
  // -------------------------------------------------------------
  const [selectedVviId, setSelectedVviId] = useState(1);
  const [vviMasteryStatus, setVviMasteryStatus] = useState({});

  const availableVviQuestions = useMemo(() => {
    const fullList = VVI_QUESTIONS_BANK[selectedClass]?.[selectedSubject] || VVI_QUESTIONS_BANK['Class 8']['Science'];
    // Normal: 5, VIP: 10, Double VIP: 20
    if (hasFullAccess || isDoubleVip) return fullList.slice(0, 20);
    if (isVip) return fullList.slice(0, 10);
    if (isNormal) return fullList.slice(0, 5);
    return []; // Demo users have 0 VVI questions per business model
  }, [selectedClass, selectedSubject, hasFullAccess, isDoubleVip, isVip, isNormal]);

  // -------------------------------------------------------------
  // SUBSECTION 3: INTERACTIVE PRACTICE SUITE
  // -------------------------------------------------------------
  const [practiceType, setPracticeType] = useState('fill_blanks'); // 'fill_blanks' | 'tick' | 'true_false' | 'assertion' | 'case_study' | 'match' | 'map_skills'
  
  // Fill in the blanks state
  const [fillInputs, setFillInputs] = useState({});
  const [fillResults, setFillResults] = useState({});
  
  // Tick correct state
  const [tickAnswers, setTickAnswers] = useState({});
  
  // True False state
  const [tfAnswers, setTfAnswers] = useState({});
  
  // Assertion Reason state
  const [arAnswers, setArAnswers] = useState({});
  
  // Case Study state
  const [caseAnswers, setCaseAnswers] = useState({});
  
  // Match following state
  const [matchSelections, setMatchSelections] = useState({});
  const [matchResults, setMatchResults] = useState({});
  
  // Map skills state
  const [selectedMapLocation, setSelectedMapLocation] = useState(null);
  const [mapAnswerResults, setMapAnswerResults] = useState({});

  const currentPracticeBank = useMemo(() => {
    const scienceBank = INTERACTIVE_PRACTICE_BANK['Class 8']['Science'];
    const sstBank = INTERACTIVE_PRACTICE_BANK['Class 8']['Social Science (SST)'];
    return {
      science: scienceBank,
      sst: sstBank
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-24 selection:bg-amber-500 selection:text-stone-950">
      
      {/* 1. TOP HEADER & HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-stone-900 via-slate-950 to-slate-950 border-b border-amber-500/20 pt-8 pb-6 px-4 sm:px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Section 8 • Advanced Examination & Practice Suite</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                <span>DAV Board Examination & VVI Test Arena</span>
                <span className="text-xs px-2.5 py-1 rounded-md bg-gradient-to-r from-red-600 to-amber-600 text-white font-mono uppercase tracking-widest font-black">
                  Class 3 – 8
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1.5 leading-relaxed">
                Experience full-length 25, 50 & 100-Question JEE-Style timed exams, 20 high-frequency VVI board questions, 
                and comprehensive interactive practice including assertion-reasons, case studies, and SST map skills.
              </p>
            </div>

            {/* Current Tier Badge */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 flex items-center justify-center font-black shadow-lg">
                <Crown className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Access Privilege</div>
                <div className="font-black text-sm text-amber-400 flex items-center gap-1.5">
                  {hasFullAccess ? 'Master Developer / Teacher (100% Unlocked)' : isDoubleVip ? 'Double VIP Pass (100Q + 20 VVI)' : isVip ? 'VIP Pass (50Q + 10 VVI)' : isNormal ? 'Normal Plan (25Q + 5 VVI)' : 'Free Demo Preview'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {hasFullAccess ? 'All tiers unrestricted' : isGuest ? 'Log in or upgrade to unlock all tests' : `Active plan: ${userPlan.toUpperCase()}`}
                </div>
              </div>
            </div>

          </div>

          {/* CLASS & SUBJECT SELECTOR BAR */}
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            
            {/* Class Selector Track */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-1">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Select Class:</span>
              </span>
              {VALID_EXAM_CLASSES.map(cls => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setIsExamStarted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
                    selectedClass === cls
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>

            {/* Subject Selector Track */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin py-1 ml-auto">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>Subject:</span>
              </span>
              {VALID_EXAM_SUBJECTS.map(subj => (
                <button
                  key={subj}
                  onClick={() => {
                    setSelectedSubject(subj);
                    setIsExamStarted(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    selectedSubject === subj
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-black shadow-md'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* 2. SUBSECTION TABS NAVIGATION (Sub 1, Sub 2, Sub 3) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <button
            onClick={() => setActiveSubSection('tests')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
              activeSubSection === 'tests'
                ? 'bg-gradient-to-br from-amber-500/20 via-orange-950/40 to-slate-900 border-amber-500 text-white shadow-xl'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">Subsection 1</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold">25 / 50 / 100 Qs</span>
            </div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Full-Length Examination</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Timed JEE-Style MCQ Exam & Subjective Descriptive Test Suite
            </p>
          </button>

          <button
            onClick={() => setActiveSubSection('vvi')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
              activeSubSection === 'vvi'
                ? 'bg-gradient-to-br from-purple-500/20 via-indigo-950/40 to-slate-900 border-purple-500 text-white shadow-xl'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-400">Subsection 2</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">5 / 10 / 20 Qs</span>
            </div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-purple-400" />
              <span>VVI Long-Answer Questions</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Very, Very Important chapter-wise questions with board model solutions
            </p>
          </button>

          <button
            onClick={() => setActiveSubSection('practice')}
            className={`p-4 rounded-2xl border text-left transition cursor-pointer relative overflow-hidden ${
              activeSubSection === 'practice'
                ? 'bg-gradient-to-br from-emerald-500/20 via-teal-950/40 to-slate-900 border-emerald-500 text-white shadow-xl'
                : 'bg-slate-900/60 hover:bg-slate-900 border-slate-800 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">Subsection 3</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">Interactive</span>
            </div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-400" />
              <span>Question Bank & Map Skills</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Fill blanks, tick correct, T/F, assertion-reason, cases & map skills
            </p>
          </button>

        </div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* ========================================================================= */}
        {/* SUBSECTION 1: TESTS (MCQ & SUBJECTIVE)                                    */}
        {/* ========================================================================= */}
        {activeSubSection === 'tests' && (
          <div className="space-y-6">

            {/* Test Mode Switcher (MCQ vs Subjective) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTestMode('mcq')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                    testMode === 'mcq'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Timed MCQ Exam Portal</span>
                </button>
                <button
                  onClick={() => setTestMode('subjective')}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                    testMode === 'subjective'
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Subjective Descriptive Test</span>
                </button>
              </div>

              {testMode === 'mcq' && !isExamStarted && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Exam Question Tier:</span>
                  
                  {/* 25 Qs (Normal) */}
                  <button
                    onClick={() => setChosenQuestionCount(25)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      chosenQuestionCount === 25
                        ? 'bg-amber-500 text-stone-950 font-black ring-2 ring-amber-400'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    25 Qs (Normal)
                  </button>

                  {/* 50 Qs (VIP) */}
                  <button
                    onClick={() => {
                      if (!hasFullAccess && !isVip) {
                        onOpenUpgradeModal?.();
                        return;
                      }
                      setChosenQuestionCount(50);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      chosenQuestionCount === 50
                        ? 'bg-purple-600 text-white font-black ring-2 ring-purple-400'
                        : isVip || hasFullAccess
                        ? 'bg-slate-800 text-purple-300 hover:bg-slate-700'
                        : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed opacity-70'
                    }`}
                  >
                    <span>50 Qs (VIP)</span>
                    {!isVip && !hasFullAccess && <Lock className="w-3 h-3 text-slate-500" />}
                  </button>

                  {/* 100 Qs (Double VIP) */}
                  <button
                    onClick={() => {
                      if (!hasFullAccess && !isDoubleVip) {
                        onOpenUpgradeModal?.();
                        return;
                      }
                      setChosenQuestionCount(100);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                      chosenQuestionCount === 100
                        ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white font-black ring-2 ring-amber-400'
                        : isDoubleVip || hasFullAccess
                        ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                        : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed opacity-70'
                    }`}
                  >
                    <span>100 Qs (Double VIP)</span>
                    {!isDoubleVip && !hasFullAccess && <Lock className="w-3 h-3 text-slate-500" />}
                  </button>
                </div>
              )}
            </div>

            {/* MCQ MODE CONTENT */}
            {testMode === 'mcq' && (
              <>
                {!isExamStarted ? (
                  /* Exam Ready Screen */
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl">
                    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/10">
                      <Clock className="w-10 h-10 animate-pulse" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {selectedClass} {selectedSubject} Examination Portal
                    </h2>
                    <p className="text-sm text-slate-400 mt-2 max-w-lg mx-auto">
                      You are about to launch a timed JEE-style exam with {chosenQuestionCount} authentic DAV board questions. 
                      Strict anti-cheat protocols and question palette tracking are enabled.
                    </p>

                    {/* Exam Specs Table */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 text-left">
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Total Questions</div>
                        <div className="text-lg font-black text-white">{chosenQuestionCount} MCQs</div>
                      </div>
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Allotted Time</div>
                        <div className="text-lg font-black text-amber-400">{chosenQuestionCount} Minutes</div>
                      </div>
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Marking Scheme</div>
                        <div className="text-lg font-black text-emerald-400">+1 / 0 (No Neg)</div>
                      </div>
                      <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Anti-Cheat Mode</div>
                        <div className="text-lg font-black text-red-400">10 Tab Max</div>
                      </div>
                    </div>

                    <button
                      onClick={handleStartExam}
                      className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 text-stone-950 font-black text-base shadow-xl shadow-amber-500/30 transition cursor-pointer transform hover:scale-105"
                    >
                      🚀 Launch Full Exam ({chosenQuestionCount} Questions)
                    </button>
                  </div>
                ) : isExamSubmitted ? (
                  /* Exam Performance Analysis Dashboard */
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto animate-fadeIn">
                    <div className="text-center pb-8 border-b border-slate-800">
                      <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block mb-3">
                        Examination Concluded
                      </span>
                      <h2 className="text-3xl font-black text-white">Performance & Analysis Dashboard</h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Detailed scorecard, percentage standing, and question-by-question breakdown.
                      </p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                        <div className="text-xs text-slate-400 font-bold">Total Score</div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                          {examResults?.correct} / {examResults?.total}
                        </div>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                        <div className="text-xs text-slate-400 font-bold">Percentage</div>
                        <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                          {examResults?.percentage}%
                        </div>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                        <div className="text-xs text-slate-400 font-bold">Academic Grade</div>
                        <div className="text-xl sm:text-2xl font-black text-purple-400 mt-1">
                          {examResults?.grade}
                        </div>
                      </div>
                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
                        <div className="text-xs text-slate-400 font-bold">Violations</div>
                        <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">
                          {cheatViolations} / 10
                        </div>
                      </div>
                    </div>

                    {/* Incorrect & Unattempted Questions Breakdown */}
                    {examResults?.incorrectList && examResults.incorrectList.length > 0 ? (
                      <div className="mt-8 space-y-4">
                        <h3 className="text-lg font-black text-rose-400 border-b border-rose-500/20 pb-2">
                          Review Incorrect & Unattempted Questions ({examResults.incorrectList.length})
                        </h3>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                          {examResults.incorrectList.map((item, idx) => (
                            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-rose-900/30">
                              <div className="text-xs font-bold text-slate-400">Question #{item.qNum}</div>
                              <div className="text-sm font-semibold text-white mt-1">{item.question}</div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                                <div className="p-2.5 rounded-lg bg-rose-950/40 text-rose-300 border border-rose-800/40">
                                  <strong>Your Answer:</strong> {item.userAnsText}
                                </div>
                                <div className="p-2.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                                  <strong>Correct Answer:</strong> {item.correctAnsText}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center text-emerald-300 my-6">
                        🎉 Flawless Score! You answered every single question correctly!
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-800">
                      <button
                        onClick={handleStartExam}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition cursor-pointer"
                      >
                        🔄 Retake Exam
                      </button>
                      <button
                        onClick={() => setIsExamStarted(false)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm transition cursor-pointer"
                      >
                        ← Back to Exam Selection
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Active Live JEE Exam Window */
                  <div className="space-y-4">
                    
                    {/* Top Exam Bar (Timer & Cheat Alerts) */}
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-white">
                          Question {currentQuestionIndex + 1} of {shuffledExamQuestions.length}
                        </span>
                        {cheatViolations > 0 && (
                          <span className="text-xs font-bold text-rose-400 bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-800">
                            Violations: {cheatViolations}/10
                          </span>
                        )}
                      </div>

                      {/* Timer */}
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-200 font-mono font-black text-lg shadow-md shadow-rose-950/40">
                        <Clock className="w-5 h-5 text-rose-400 animate-pulse" />
                        <span>{formatTimer(timeRemaining)}</span>
                      </div>
                    </div>

                    {cheatNotice && (
                      <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500 text-rose-200 text-xs font-bold flex items-center gap-2 animate-bounce">
                        <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{cheatNotice}</span>
                      </div>
                    )}

                    {/* Main Window (75% / 25% Layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      
                      {/* Left Question Box (3 Cols) */}
                      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[450px]">
                        {shuffledExamQuestions[currentQuestionIndex] && (
                          <div>
                            <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
                              {shuffledExamQuestions[currentQuestionIndex].chapter}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed mb-6">
                              {shuffledExamQuestions[currentQuestionIndex].q}
                            </h3>

                            {/* Options */}
                            <div className="space-y-3">
                              {shuffledExamQuestions[currentQuestionIndex].shuffledOptions.map((opt, optIdx) => {
                                const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
                                return (
                                  <label
                                    key={optIdx}
                                    onClick={() => {
                                      setSelectedAnswers(prev => ({
                                        ...prev,
                                        [currentQuestionIndex]: optIdx
                                      }));
                                    }}
                                    className={`flex items-center gap-3 p-4 rounded-xl border transition cursor-pointer ${
                                      isSelected
                                        ? 'bg-amber-500/15 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-400'
                                        : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isSelected ? 'bg-amber-500 text-stone-950' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span className="text-sm font-medium">{opt}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-slate-800">
                          <button
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold text-xs transition cursor-pointer flex items-center gap-2"
                          >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                          </button>

                          <button
                            onClick={() => {
                              setSelectedAnswers(prev => {
                                const next = { ...prev };
                                delete next[currentQuestionIndex];
                                return next;
                              });
                            }}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition cursor-pointer"
                          >
                            Clear Response
                          </button>

                          {currentQuestionIndex < shuffledExamQuestions.length - 1 ? (
                            <button
                              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-2"
                            >
                              <span>Next</span>
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to finalize and submit your examination?')) {
                                  setIsExamSubmitted(true);
                                }
                              }}
                              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 font-black text-xs shadow-lg transition cursor-pointer flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Submit Exam</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right Palette Window (1 Col) */}
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-black text-slate-300 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
                            Question Palette ({shuffledExamQuestions.length})
                          </div>

                          {/* Palette Legend */}
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mb-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-emerald-500" />
                              <span>Attempted</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-slate-700" />
                              <span>Unvisited</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-amber-500" />
                              <span>Current</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full bg-rose-500" />
                              <span>Skipped</span>
                            </div>
                          </div>

                          {/* Grid of Numbers */}
                          <div className="grid grid-cols-5 gap-1.5 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
                            {shuffledExamQuestions.map((_, pIdx) => {
                              const isAttempted = selectedAnswers[pIdx] !== undefined;
                              const isCurrent = currentQuestionIndex === pIdx;
                              let btnClass = 'bg-slate-800 text-slate-400 border border-slate-700/50';
                              if (isCurrent) {
                                btnClass = 'bg-amber-500 text-stone-950 font-black ring-2 ring-amber-300';
                              } else if (isAttempted) {
                                btnClass = 'bg-emerald-600 text-white font-bold';
                              }

                              return (
                                <button
                                  key={pIdx}
                                  onClick={() => setCurrentQuestionIndex(pIdx)}
                                  className={`h-8 rounded-lg text-xs transition cursor-pointer flex items-center justify-center ${btnClass}`}
                                >
                                  {pIdx + 1}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 pt-4 border-t border-slate-800">
                          <button
                            onClick={() => {
                              if (window.confirm('Are you ready to submit your exam now?')) {
                                setIsExamSubmitted(true);
                              }
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 text-white font-black text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
                          >
                            Submit Exam
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                )}
              </>
            )}

            {/* SUBJECTIVE MODE CONTENT */}
            {testMode === 'subjective' && (
              <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3">
                  <Info className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <strong>Subjective Test Mode:</strong> Draft your descriptive answers in the workspace below. 
                    Click <em>"View Board Model Answer & Rubric"</em> to benchmark your answer or teleport to Rishi AI for step-by-step scoring!
                  </div>
                </div>

                <div className="space-y-6">
                  {(SUBJECTIVE_EXAM_BANKS[selectedClass]?.[selectedSubject] || SUBJECTIVE_EXAM_BANKS['Class 8']['Science']).map(subQ => (
                    <div key={subQ.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
                      
                      <div className="flex items-center justify-between gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          {subQ.type}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400">
                          Max Marks: {subQ.marks}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {subQ.question}
                      </h3>

                      {/* Student Drafting Textarea */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">
                          Draft Your Written Answer:
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Type your descriptive solution with scientific terms, equations, and observations here..."
                          value={subjectiveStudentAnswers[subQ.id] || ''}
                          onChange={(e) => setSubjectiveStudentAnswers(prev => ({ ...prev, [subQ.id]: e.target.value }))}
                          className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-sans leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => setRevealedRubrics(prev => ({ ...prev, [subQ.id]: !prev[subQ.id] }))}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-black transition cursor-pointer flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{revealedRubrics[subQ.id] ? 'Hide Model Answer' : 'View Board Model Answer & Rubric'}</span>
                        </button>

                        <button
                          onClick={() => onOpenAIWithQuestion?.(`Please evaluate my answer to this DAV Class 8 Question: "${subQ.question}". My Answer is: "${subjectiveStudentAnswers[subQ.id] || 'No answer drafted'}". Rate it out of ${subQ.marks} marks and point out what is missing.`)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-md shadow-orange-500/20"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Evaluate with Rishi AI</span>
                        </button>
                      </div>

                      {/* Revealed Model Answer & Rubric */}
                      {revealedRubrics[subQ.id] && (
                        <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-amber-500/30 text-xs space-y-3 animate-fadeIn">
                          <div>
                            <div className="font-bold text-amber-400 uppercase tracking-wider mb-1">
                              DAV Board Official Model Answer:
                            </div>
                            <div className="text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                              {subQ.modelAnswer}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-slate-800">
                            <div className="font-bold text-emerald-400 uppercase tracking-wider mb-1">
                              Marking Scheme / Step-Wise Rubric:
                            </div>
                            <ul className="list-disc list-inside space-y-1 text-slate-400">
                              {subQ.rubric.map((r, rIdx) => (
                                <li key={rIdx}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSECTION 2: VERY VERY IMPORTANT (VVI) LONG-ANSWER QUESTIONS             */}
        {/* ========================================================================= */}
        {activeSubSection === 'vvi' && (
          <div className="space-y-6">
            
            {/* Business Model Tier Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/40">
                  DAV CAE High-Frequency Board Bank
                </span>
                <h3 className="text-lg font-black text-white mt-1">
                  Very, Very Important (VVI) 5-Mark Examination Questions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Normal Plan: 5 VVI Questions • VIP Plan: 10 VVI Questions • Double VIP Plan: 20 Full VVI Questions.
                </p>
              </div>

              {isGuest && (
                <button
                  onClick={onOpenUpgradeModal}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <Lock className="w-4 h-4" />
                  <span>Unlock VVI Question Vault</span>
                </button>
              )}
            </div>

            {isGuest ? (
              /* Locked for Demo / Guest Students */
              <div className="bg-slate-900 border-2 border-dashed border-purple-500/40 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto my-8">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">VVI Board Question Vault Locked</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Per our academic policy, VVI questions are reserved exclusively for enrolled students (Normal, VIP, and Double VIP plans). 
                  Free demo preview does not include the VVI 5-marker vault.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={onRequireLogin}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
                  >
                    Student Login
                  </button>
                  <button
                    onClick={onOpenUpgradeModal}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black text-xs shadow-md transition cursor-pointer"
                  >
                    Upgrade to Normal / VIP
                  </button>
                </div>
              </div>
            ) : (
              /* Accessible VVI Questions */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Side: VVI Question Navigator (1 Col) */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-2 h-fit max-h-[700px] overflow-y-auto scrollbar-thin">
                  <div className="text-xs font-black text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>VVI Questions ({availableVviQuestions.length})</span>
                    <span className="text-[10px] text-purple-400 font-bold">5 Marks Each</span>
                  </div>

                  {availableVviQuestions.map(q => {
                    const isSelected = selectedVviId === q.id;
                    const isMastered = vviMasteryStatus[q.id];
                    return (
                      <button
                        key={q.id}
                        onClick={() => setSelectedVviId(q.id)}
                        className={`w-full p-3 rounded-2xl text-left transition cursor-pointer border flex items-start gap-2.5 ${
                          isSelected
                            ? 'bg-purple-950/70 border-purple-500 text-white shadow-md'
                            : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800/80 text-slate-300'
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {q.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate">{q.title}</div>
                          <div className="text-[10px] text-purple-300/80 font-mono mt-0.5">{q.marks}</div>
                        </div>
                        {isMastered && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}

                  {/* Upgrade teaser if normal or VIP */}
                  {!isDoubleVip && !hasFullAccess && (
                    <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-center mt-3">
                      <div className="text-xs font-black text-purple-300">Unlock All 20 VVI Questions</div>
                      <p className="text-[10px] text-slate-400 mt-1">Upgrade to Double VIP for complete 20 question coverage.</p>
                      <button
                        onClick={onOpenUpgradeModal}
                        className="mt-2 w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-black transition cursor-pointer"
                      >
                        Upgrade to Double VIP
                      </button>
                    </div>
                  )}
                </div>

                {/* Right Side: VVI Question Full Viewer (2 Cols) */}
                <div className="lg:col-span-2">
                  {(() => {
                    const activeQ = availableVviQuestions.find(q => q.id === selectedVviId) || availableVviQuestions[0];
                    if (!activeQ) return null;
                    const isMastered = vviMasteryStatus[activeQ.id];

                    return (
                      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
                        
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                            {activeQ.importance}
                          </span>
                          <span className="text-xs font-mono font-bold text-amber-400">
                            {activeQ.marks}
                          </span>
                        </div>

                        {/* Question Text */}
                        <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
                          {activeQ.question}
                        </h2>

                        {/* Step-by-Step Key Points / Solution */}
                        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                          <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span>DAV Board Exemplar Model Solution (5 Steps):</span>
                          </div>
                          <ul className="space-y-2.5">
                            {activeQ.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="text-xs sm:text-sm text-slate-200 flex items-start gap-2.5 leading-relaxed">
                                <span className="w-5 h-5 rounded-md bg-purple-900/60 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                                  {pIdx + 1}
                                </span>
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Examiner Tip */}
                        {activeQ.examinerTip && (
                          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
                            <Flame className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong>Examiner Board Secret:</strong> {activeQ.examinerTip}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                          <button
                            onClick={() => setVviMasteryStatus(prev => ({ ...prev, [activeQ.id]: !prev[activeQ.id] }))}
                            className={`px-5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                              isMastered
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                            <span>{isMastered ? 'Mastered for Exam ✓' : 'Mark as Mastered'}</span>
                          </button>

                          <button
                            onClick={() => onOpenAIWithQuestion?.(`Explain in simple, step-by-step detail this DAV Class 8 VVI Board Question: "${activeQ.question}". How can I score full 5/5 marks on this in the board exam?`)}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-md shadow-orange-500/20"
                          >
                            <Sparkles className="w-4 h-4" />
                            <span>Explain with Rishi AI</span>
                          </button>
                        </div>

                      </div>
                    );
                  })()}
                </div>

              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SUBSECTION 3: COMPREHENSIVE INTERACTIVE QUESTION BANK & MAP SKILLS         */}
        {/* ========================================================================= */}
        {activeSubSection === 'practice' && (
          <div className="space-y-6">

            {/* Practice Format Selector Track */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin p-3 rounded-2xl bg-slate-900 border border-slate-800">
              {[
                { id: 'fill_blanks', label: '1. Fill in the Blanks (5 Qs)' },
                { id: 'tick', label: '2. Tick Correct Option (5 Qs)' },
                { id: 'true_false', label: '3. True or False (5 Qs)' },
                { id: 'assertion', label: '4. Assertion-Reason (5 Qs)' },
                { id: 'case_study', label: '5. Case Studies (2 Passages)' },
                { id: 'match', label: '6. Match the Following' },
                { id: 'map_skills', label: '7. SST Map Skills (Classes 3-8)' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setPracticeType(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shrink-0 ${
                    practiceType === tab.id
                      ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 1. FILL IN THE BLANKS */}
            {practiceType === 'fill_blanks' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">5 High-Yield Fill-in-the-Blanks Questions</h3>
                  <p className="text-xs text-slate-400 mt-1">Type the correct scientific term into each blank and click "Check Answer" for instant evaluation.</p>
                </div>

                <div className="space-y-4">
                  {currentPracticeBank.science.fillInTheBlanks.map((item, idx) => {
                    const result = fillResults[item.id];
                    return (
                      <div key={item.id} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3">
                        <div className="text-xs font-bold text-amber-500">Blank #{idx + 1}</div>
                        <div className="text-sm font-medium text-slate-200 leading-relaxed">
                          {item.sentence}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            type="text"
                            placeholder="Type your answer here..."
                            value={fillInputs[item.id] || ''}
                            onChange={(e) => setFillInputs(prev => ({ ...prev, [item.id]: e.target.value }))}
                            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-sans"
                          />
                          <button
                            onClick={() => {
                              const val = (fillInputs[item.id] || '').trim().toLowerCase();
                              const isCorrect = item.acceptedAnswers.includes(val);
                              setFillResults(prev => ({ ...prev, [item.id]: isCorrect ? 'correct' : 'wrong' }));
                            }}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition cursor-pointer"
                          >
                            Check Answer
                          </button>
                          <span className="text-xs text-slate-500 italic">Hint: {item.hint}</span>
                        </div>

                        {result && (
                          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                            result === 'correct' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-300' : 'bg-rose-950/80 border border-rose-500 text-rose-300'
                          }`}>
                            {result === 'correct' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                            <span>
                              {result === 'correct' ? 'Correct answer!' : `Incorrect! Correct answer is: "${item.correctAnswer}"`}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. TICK CORRECT OPTION */}
            {practiceType === 'tick' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">5 Tick-the-Correct-Option Questions</h3>
                  <p className="text-xs text-slate-400 mt-1">Select the single correct option for each question with instant explanation reveal.</p>
                </div>

                <div className="space-y-6">
                  {currentPracticeBank.science.tickCorrect.map((item, idx) => {
                    const chosen = tickAnswers[item.id];
                    return (
                      <div key={item.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                        <div className="text-xs font-bold text-amber-500">Question #{idx + 1}</div>
                        <h4 className="text-sm sm:text-base font-bold text-white">{item.question}</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {item.options.map((opt, optIdx) => {
                            const isSelected = chosen === optIdx;
                            const isCorrectOpt = optIdx === item.correctIndex;
                            let optClass = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                            if (chosen !== undefined) {
                              if (isCorrectOpt) optClass = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                              else if (isSelected) optClass = 'bg-rose-950 border-rose-500 text-rose-200';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => setTickAnswers(prev => ({ ...prev, [item.id]: optIdx }))}
                                className={`p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center gap-3 ${optClass}`}
                              >
                                <span className="w-6 h-6 rounded-md bg-slate-800 font-bold flex items-center justify-center shrink-0 text-slate-300">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {chosen !== undefined && (
                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                            <strong>Explanation:</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. TRUE OR FALSE */}
            {practiceType === 'true_false' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">5 Conceptual True-or-False Questions</h3>
                  <p className="text-xs text-slate-400 mt-1">Read the statement and determine whether it is scientifically True or False.</p>
                </div>

                <div className="space-y-4">
                  {currentPracticeBank.science.trueFalse.map((item, idx) => {
                    const userVal = tfAnswers[item.id];
                    return (
                      <div key={item.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="text-xs font-bold text-amber-500">Statement #{idx + 1}</div>
                        <p className="text-sm font-semibold text-white leading-relaxed">{item.statement}</p>
                        
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => setTfAnswers(prev => ({ ...prev, [item.id]: true }))}
                            className={`px-5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                              userVal === true
                                ? userVal === item.isTrue ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            ✓ TRUE
                          </button>
                          <button
                            onClick={() => setTfAnswers(prev => ({ ...prev, [item.id]: false }))}
                            className={`px-5 py-2 rounded-xl text-xs font-black transition cursor-pointer ${
                              userVal === false
                                ? userVal === item.isTrue ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            ✗ FALSE
                          </button>
                        </div>

                        {userVal !== undefined && (
                          <div className={`p-3 rounded-xl text-xs ${
                            userVal === item.isTrue ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                          }`}>
                            <strong>{userVal === item.isTrue ? 'Correct!' : 'Incorrect!'}</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. ASSERTION-REASON */}
            {practiceType === 'assertion' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-black text-white">5 High-Order Assertion & Reason Questions</h3>
                  <p className="text-xs text-slate-400 mt-1">Standard CBSE / DAV Board format evaluating logical connection between Assertion and Reason.</p>
                </div>

                <div className="space-y-6">
                  {currentPracticeBank.science.assertionReason.map((item, idx) => {
                    const chosen = arAnswers[item.id];
                    return (
                      <div key={item.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                        <div className="text-xs font-bold text-amber-500">Assertion-Reason Set #{idx + 1}</div>
                        
                        <div className="space-y-2 text-sm bg-slate-900 p-4 rounded-xl border border-slate-800">
                          <div>
                            <strong className="text-amber-400">Assertion (A):</strong>{' '}
                            <span className="text-white">{item.assertion}</span>
                          </div>
                          <div>
                            <strong className="text-purple-400">Reason (R):</strong>{' '}
                            <span className="text-white">{item.reason}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {item.options.map((opt, optIdx) => {
                            const isSelected = chosen === optIdx;
                            const isCorrect = optIdx === item.correctIndex;
                            let optStyle = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                            if (chosen !== undefined) {
                              if (isCorrect) optStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                              else if (isSelected) optStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => setArAnswers(prev => ({ ...prev, [item.id]: optIdx }))}
                                className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition cursor-pointer ${optStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {chosen !== undefined && (
                          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                            <strong>Board Analysis:</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. CASE STUDY QUESTIONS */}
            {practiceType === 'case_study' && (
              <div className="space-y-6">
                {currentPracticeBank.science.caseStudies.map((cs, csIdx) => (
                  <div key={cs.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/40">
                      Real-Life Science Investigation #{csIdx + 1}
                    </span>
                    <h3 className="text-xl font-black text-white">{cs.title}</h3>
                    
                    {/* Passage Box */}
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif whitespace-pre-line border-l-4 border-l-amber-500">
                      {cs.passage}
                    </div>

                    {/* Sub Questions */}
                    <div className="space-y-4 pt-2">
                      {cs.subQuestions.map((sub, sIdx) => {
                        const userAns = caseAnswers[sub.id];
                        return (
                          <div key={sub.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                            <div className="text-xs font-bold text-amber-500">Sub-Question {sIdx + 1}</div>
                            <div className="text-sm font-semibold text-white">{sub.q}</div>

                            <div className="space-y-2">
                              {sub.options.map((opt, oIdx) => {
                                const isSelected = userAns === oIdx;
                                const isCorrect = oIdx === sub.correctIndex;
                                let btnClass = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                                if (userAns !== undefined) {
                                  if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                                  else if (isSelected) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    onClick={() => setCaseAnswers(prev => ({ ...prev, [sub.id]: oIdx }))}
                                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center gap-2.5 ${btnClass}`}
                                  >
                                    <span className="w-5 h-5 rounded bg-slate-800 font-bold flex items-center justify-center shrink-0 text-slate-400 text-[10px]">
                                      {String.fromCharCode(65 + oIdx)}
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>

                            {userAns !== undefined && (
                              <div className="p-3 rounded-lg bg-slate-900 text-xs text-slate-300 border border-slate-800">
                                <strong>Answer Analysis:</strong> {sub.explanation}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. MATCH THE FOLLOWING */}
            {practiceType === 'match' && (
              <div className="space-y-6">
                {currentPracticeBank.science.matchTheFollowing.map((mf, mfIdx) => (
                  <div key={mf.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                    <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                      Interactive Pairing Suite #{mfIdx + 1}
                    </span>
                    <h3 className="text-lg font-black text-white">{mf.title}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mf.pairs.map((pair, pIdx) => (
                        <div key={pIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                          <div className="text-xs font-bold text-amber-300">{pair.left}</div>
                          <div className="text-xs text-slate-300 text-right">{pair.right}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>All 5 scientific pairs are pre-aligned to authentic DAV Board curriculum standards.</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 7. SST MAP SKILLS (CLASSES 3 TO 8) */}
            {practiceType === 'map_skills' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Social Science (SST) Map Skill Arena • Classes 3 to 8</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">Interactive India Geographic & Historical Map Practice</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    Mandatory 5-Mark DAV Board map questions covering 1857 Revolt centers, major dams, iron & steel industries, wildlife parks, and bauxite belts.
                  </p>
                </div>

                {/* Map Interactive Arena */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  
                  {/* Left: Interactive Graphical Map Canvas */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">
                      Interactive India Location Matrix (Tap pins to explore)
                    </div>

                    {/* SVG Map of India Stylized Representation */}
                    <div className="relative w-72 h-96 bg-slate-900/60 rounded-3xl border border-slate-800 flex items-center justify-center shadow-inner">
                      
                      {/* Stylized Outline & India Lat/Long Grid */}
                      <div className="absolute inset-4 border border-dashed border-slate-800/80 rounded-2xl pointer-events-none" />
                      <div className="text-[11px] font-mono text-slate-700 text-center select-none">
                        INDIA GEOGRAPHIC GRID<br/>
                        8°4'N to 37°6'N<br/>
                        68°7'E to 97°25'E
                      </div>

                      {/* Map Location Pins */}
                      {currentPracticeBank.sst.mapSkills.map((loc, lIdx) => {
                        const isSelected = selectedMapLocation?.id === loc.id;
                        return (
                          <button
                            key={loc.id}
                            onClick={() => setSelectedMapLocation(loc)}
                            style={{ left: `${loc.targetLocation.x}%`, top: `${loc.targetLocation.y}%` }}
                            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-400/40 scale-125 z-20'
                                : 'bg-rose-500 text-white hover:scale-110 z-10'
                            }`}
                            title={loc.targetLocation.name}
                          >
                            <MapPin className="w-4 h-4" />
                          </button>
                        );
                      })}

                    </div>

                    <div className="text-xs text-slate-400 mt-4 text-center">
                      Pins indicate 1857 Rebellion hubs, Dams, Bauxite deposits, and Industrial Centers.
                    </div>
                  </div>

                  {/* Right: Map Questions & Quizzes */}
                  <div className="space-y-4">
                    {currentPracticeBank.sst.mapSkills.map((mQ, mIdx) => {
                      const userChoice = mapAnswerResults[mQ.id];
                      return (
                        <div key={mQ.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                              {mQ.topic}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">{mQ.classRange}</span>
                          </div>

                          <div className="text-sm font-bold text-white">{mQ.question}</div>

                          {/* Options */}
                          <div className="grid grid-cols-2 gap-2">
                            {mQ.options.map((opt, oIdx) => {
                              const isSelected = userChoice === opt;
                              const isCorrect = opt === mQ.correctOption;
                              let btnClass = 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800';
                              if (userChoice !== undefined) {
                                if (isCorrect) btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                                else if (isSelected) btnClass = 'bg-rose-950 border-rose-500 text-rose-200';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => setMapAnswerResults(prev => ({ ...prev, [mQ.id]: opt }))}
                                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition cursor-pointer ${btnClass}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {userChoice && (
                            <div className={`p-2.5 rounded-lg text-xs ${
                              userChoice === mQ.correctOption ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                            }`}>
                              <strong>{userChoice === mQ.correctOption ? 'Correct Location!' : 'Incorrect Location!'}</strong> {mQ.hint}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
