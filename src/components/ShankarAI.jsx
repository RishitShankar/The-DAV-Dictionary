import { VfxNeuralBrainMatrix } from './vfx/VfxNeuralBrainMatrix';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, Key, User as UserIcon, RefreshCw, 
  Check, X, BookOpen, MessageSquare, Maximize2, Minimize2, 
  Globe, Compass, CheckCircle2, ShieldCheck, Flame, Info,
  GraduationCap, FileText, CheckSquare, Layers, Award,
  Bookmark, Paperclip, Mic, MicOff, Image as ImageIcon, ChevronDown, ListChecks, HelpCircle,
  ArrowRight, ArrowLeft, RotateCcw
} from 'lucide-react';
import { RishiAILogo } from './RishiAILogo';
import { BlackDogLogo } from './BlackDogLogo';
import { askRishiAI, getSavedApiKey, saveApiKey } from '../services/geminiService';
import { InteractiveQuiz } from './InteractiveQuiz';
import { 
  DAV_CLASSES, 
  DAV_SUBJECTS_BY_CLASS, 
  getChaptersForClassSubject 
} from '../data/curriculumData';

function formatInline(str) {
  if (!str) return '';
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-stone-950">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function renderFormattedMessage(text, isUser) {
  if (!text) return null;
  if (isUser) {
    return <div className="whitespace-pre-wrap font-medium">{text}</div>;
  }

  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed text-slate-800">
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        // Horizontal Rule
        if (trimmed === '---' || trimmed.startsWith('━━━')) {
          return <hr key={idx} className="my-2.5 border-orange-200" />;
        }

        // Header 1 / Header 2
        if (trimmed.startsWith('# ')) {
          return (
            <h3 key={idx} className="font-black text-base sm:text-lg text-orange-950 mt-2 mb-1">
              {formatInline(trimmed.slice(2))}
            </h3>
          );
        }

        // Header 3
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="font-bold text-sm text-stone-900 mt-2.5 mb-1 text-orange-950">
              {formatInline(trimmed.slice(4))}
            </h4>
          );
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          return (
            <blockquote key={idx} className="pl-3 py-1 my-1.5 border-l-4 border-orange-500 bg-orange-50/80 rounded-r-md text-xs italic text-stone-800 font-medium">
              {formatInline(trimmed.slice(2))}
            </blockquote>
          );
        }

        // Bullet list item
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm pl-1">
              <span className="text-orange-500 font-black mt-1 leading-none text-xs">•</span>
              <span className="flex-1">{formatInline(trimmed.slice(2))}</span>
            </div>
          );
        }

        // Numbered list item
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm pl-1">
              <span className="font-bold text-orange-600 min-w-[20px] text-xs">{numMatch[1]}.</span>
              <span className="flex-1">{formatInline(numMatch[2])}</span>
            </div>
          );
        }

        // Empty line
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Regular line
        return (
          <p key={idx} className="text-xs sm:text-sm font-normal">
            {formatInline(line)}
          </p>
        );
      })}
    </div>
  );
}

export function RishiAI({ isOpen, onClose, initialPrompt = '', user, isSectionView = false, onRequireLogin }) {
  // Modes: 'academics' | 'outer_world'
  const [activeMode, setActiveMode] = useState('academics');

  // Wizard Step State: 'select_mode' | 'select_class' | 'select_subject' | 'select_chapter' | null
  const [wizardStep, setWizardStep] = useState(initialPrompt ? null : 'select_mode');

  // Cascading Academic Selections
  const [selectedClass, setSelectedClass] = useState('8');
  const [selectedSubject, setSelectedSubject] = useState('hin8_gs');
  const [selectedChapter, setSelectedChapter] = useState('1');

  // Interactive Quiz View & Dynamic Question Count
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTestConfigModal, setShowTestConfigModal] = useState(false);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);

  // Maximum questions based on student plan:
  // Normal Plan (Dimension 1 / Trial / 0): max 10
  // VIP Plan (Dimension 2): max 25
  // VVIP Plan (Dimension 3) / Master Dev (Dimension 4): max 50
  const maxQuestions = (user?.dimension === 4 || user?.isAdmin || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') ? 50
    : (user?.plan === 'vvip' || user?.dimension === 3) ? 50
    : (user?.plan === 'vip' || user?.dimension === 2) ? 25
    : 10;

  // Messages & Conversation State
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `👋 **Welcome to Rishi AI** — the proprietary full-screen intelligence engine of DAV Dictionary!

Engineered by **Head Boy Rishit Shankar** with an uncompromising dual-system architecture:

📚 **1. Academic Intelligence (DAV Textbooks & Syllabus):**
* Lock into any **Class (LKG to 8)** $\\rightarrow$ **Subject** $\\rightarrow$ **Chapter**.
* The official DAV textbook PDF is **automatically grounded and locked** into memory.
* Generate instant **Chapter Summaries**, **High-Yield Short Notes**, **5-Mark Model Answers**, **Bullet Glossaries**, **Back-of-Chapter Q&A (Part A-E)**, **HOTS**, and launch live **Interactive MCQ Test Quizzes**!

🌍 **2. Non-Academic Intelligence (Outer World Knowledge):**
* Proprietary global intelligence for **World Geopolitics**, **ISRO Space Exploration**, **Meteorology & Monsoons**, **Software Development**, and **Chess Tactics**.

*Select an option above or type your question below!*`
    }
  ]);

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [pendingMedia, setPendingMedia] = useState(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const baseInputRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const chatEndRef = useRef(null);
  const chatMessagesContainerRef = useRef(null);

  // Available subjects for currently selected class
  const availableSubjects = DAV_SUBJECTS_BY_CLASS[selectedClass] || DAV_SUBJECTS_BY_CLASS['8'];

  // Current subject object
  const currentSubjectObj = availableSubjects.find(s => s.id === selectedSubject) || availableSubjects[0];

  // Available chapters for currently selected class & subject
  const availableChapters = getChaptersForClassSubject(selectedClass, selectedSubject);

  // Current chapter object
  const currentChapterObj = availableChapters.find(c => String(c.num) === String(selectedChapter)) || availableChapters[0];

  // Sync subject when class changes
  const handleClassSelect = (newClass) => {
    setSelectedClass(newClass);
    const newSubjects = DAV_SUBJECTS_BY_CLASS[newClass] || DAV_SUBJECTS_BY_CLASS['8'];
    const firstSubject = newSubjects[0].id;
    setSelectedSubject(firstSubject);
    const newChapters = getChaptersForClassSubject(newClass, firstSubject);
    setSelectedChapter(String(newChapters[0]?.num || 1));
  };

  // Sync chapter when subject changes
  const handleSubjectSelect = (newSubject) => {
    setSelectedSubject(newSubject);
    const newChapters = getChaptersForClassSubject(selectedClass, newSubject);
    setSelectedChapter(String(newChapters[0]?.num || 1));
  };

  useEffect(() => {
    const key = getSavedApiKey();
    if (key) setApiKey(key);
  }, []);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setWizardStep(null);
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTo({
        top: chatMessagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isSectionView) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isSectionView]);

  const handleSaveKey = () => {
    saveApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowKeyConfig(false);
    }, 1200);
  };

  // Web Speech API Voice Transcription Handler
  const handleToggleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      baseInputRef.current = '';
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = true;
      recognition.interimResults = true;

      baseInputRef.current = input;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript + ' ';
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const combinedSpoken = (finalTranscript + interimTranscript).trim();
        const base = baseInputRef.current ? baseInputRef.current.trim() : '';

        if (base && combinedSpoken) {
          setInput(`${base} ${combinedSpoken}`);
        } else if (combinedSpoken) {
          setInput(combinedSpoken);
        }
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition error:', e?.error);
        setIsListening(false);
        baseInputRef.current = '';
      };

      recognition.onend = () => {
        setIsListening(false);
        baseInputRef.current = '';
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition start failed:', err);
      setIsListening(false);
      baseInputRef.current = '';
    }
  };

  // Media Attachment Handler
  const handleMediaAttach = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPendingMedia({
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        dataUrl: ev.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (textToSend, actionType = null) => {
    const question = textToSend || input;
    if (!question.trim() || loading) return;

    if (user?.plan === 'guest' || user?.isDemo) {
      if (onRequireLogin) {
        onRequireLogin(
          'Login to Continue',
          'You are currently exploring in Free Demo Preview. Please log in or register with your Student ID & Password to ask questions, solve homework doubts, and generate AI chapter quizzes with Rishi AI.'
        );
      }
      return;
    }

    // Close quiz if user sends a question
    setShowQuiz(false);

    const attached = pendingMedia;
    const userMsg = { 
      role: 'user', 
      text: question,
      media: attached ? { ...attached } : null
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setPendingMedia(null);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    setLoading(true);

    try {
      const response = await askRishiAI(question, {
        mode: activeMode,
        classNum: selectedClass === 'UKG' || selectedClass === 'LKG' ? selectedClass : Number(selectedClass),
        subject: currentSubjectObj?.name || selectedSubject,
        chapter: selectedChapter,
        chapterTitle: currentChapterObj?.title,
        actionType,
        user
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response.text,
        source: response.source,
        isLiveCloud: response.isLiveCloud,
        modelName: response.modelName,
        isTextbookGrounded: response.isTextbookGrounded,
        chapterInfo: response.chapterInfo || (activeMode === 'academics' ? `DAV Class ${selectedClass} ${currentSubjectObj?.name} • Ch ${selectedChapter}` : 'Outer World Intelligence')
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'An error occurred while processing the intelligence query. Please try again.',
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Quick Action Handler for Academics Study Buttons
  const handleAcademicsAction = (actionKey) => {
    if (actionKey === 'quiz') {
      setShowTestConfigModal(true);
      return;
    }

    const chapTitle = currentChapterObj?.title || `Chapter ${selectedChapter}`;
    const subjName = currentSubjectObj?.name || selectedSubject;

    let queryText = '';
    if (actionKey === 'summarize') {
      queryText = `Summarize DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}" with core themes and complete chapter overview.`;
    } else if (actionKey === 'short_notes') {
      queryText = `Provide high-yield short revision notes and key exam points for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    } else if (actionKey === 'five_mark') {
      queryText = `Provide 10 comprehensive 5-mark examination questions with complete model answers for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    } else if (actionKey === 'bullet_notes') {
      queryText = `Give key bullet points, definitions, formulas, and dates for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    } else if (actionKey === 'qa') {
      queryText = `Provide official back-of-chapter questions and complete model answers (पाठ में से, अभ्यास) for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    } else if (actionKey === 'hots') {
      queryText = `Give Higher Order Thinking Skills (HOTS) questions and scientific/logical reasoning for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    } else if (actionKey === 'map_skills') {
      queryText = `Provide Map Skills instructions and outline map locations for DAV Class ${selectedClass} ${subjName} Chapter ${selectedChapter}: "${chapTitle}".`;
    }

    handleSend(queryText, actionKey);
  };

  if (!isOpen && !isSectionView) return null;

  const shellContent = (
    <div 
      className={`w-full ${isSectionView ? 'max-w-6xl h-full max-h-full min-h-0 rounded-2xl sm:rounded-3xl' : isFullscreen ? 'h-screen rounded-none' : 'max-w-6xl h-[94vh] rounded-3xl'} bg-slate-950 flex flex-col min-h-0 overflow-hidden border-2 border-orange-500/50 shadow-2xl transition-all duration-200 relative z-10`}
    >
      
      {/* ========================================================================= */}
      {/* TOP LEVEL NAVIGATION BAR                                                  */}
      {/* ========================================================================= */}
      <header className="bg-stone-900 border-b border-orange-500/40 px-3 sm:px-5 py-2.5 flex items-center justify-between text-white flex-wrap gap-3 shrink-0">
        
        {/* Left: Branding & Mascot */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <RishiAILogo className="w-10 h-10 sm:w-11 sm:h-11" bgClassName="bg-stone-950 border-2 border-amber-400" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-black text-lg sm:text-xl text-white tracking-tight uppercase flex items-center gap-1.5">
                <span>Rishi AI</span>
                  <span className="text-amber-400 font-mono text-xs px-2 py-0.5 rounded-md bg-stone-950 border border-amber-400/40">
                    MASTER
                  </span>
                </span>
                <span className="hidden md:inline-flex bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {user?.dimensionName || (user?.dimension === 4 ? 'Dimension 4: Dev Master' : user?.dimension === 3 ? 'Dimension 3: VVIP Ultra' : 'DAV Proprietary Engine')}
                </span>
              </div>
              <p className="text-[11px] text-orange-200/80 font-medium hidden sm:block">
                Dedicated Intelligence Engine • Created by Head Boy Rishit Shankar
              </p>
            </div>
          </div>

          {/* Center: Mode Indicator & Change Setup Trigger */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-stone-950 p-1 rounded-2xl border border-orange-500/40 shadow-inner">
              <button
                onClick={() => {
                  setActiveMode('academics');
                  setWizardStep('select_class');
                  setShowQuiz(false);
                  setShowTestConfigModal(false);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
                  activeMode === 'academics'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>📚 Academic</span>
              </button>

              <button
                onClick={() => {
                  setActiveMode('outer_world');
                  setShowQuiz(false);
                }}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer ${
                  activeMode === 'outer_world'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-stone-300 hover:text-white hover:bg-stone-900'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>🌍 Non-Academic</span>
              </button>
            </div>

            {/* Re-open Stepped Setup Wizard */}
            <button
              onClick={() => setWizardStep('select_mode')}
              className="py-1.5 px-3 rounded-xl bg-stone-800 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/30 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              title="Change Academic Class, Subject, Chapter or Mode"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">Switch Setup</span>
            </button>
          </div>

          {/* Right Controls: Engine Token, Fullscreen, Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className={`py-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
                showKeyConfig 
                  ? 'bg-stone-950 text-amber-300 border-amber-400' 
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
              }`}
              title="Configure Cloud Neural Token"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Engine Key</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {!isSectionView && (
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
                title="Close Rishi AI"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* Engine Key Configuration Drawer */}
        {showKeyConfig && (
          <div className="p-4 bg-stone-950 border-b border-orange-500/40 text-xs text-white animate-slideDown shrink-0">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Key className="w-4 h-4" />
                <span>Rishi AI Proprietary Cloud Token Configuration</span>
              </div>
              <span className="text-[10px] text-stone-300 font-mono bg-stone-900 px-2 py-0.5 rounded border border-orange-500/30">
                Status: {apiKey ? 'Live Neural Cloud Active' : 'Master Offline Engine (100% Armed & Ready)'}
              </span>
            </div>
            <p className="text-slate-300 mb-2.5 text-xs leading-relaxed">
              • <strong>Built-in Master Offline Engine:</strong> Pre-loaded with complete DAV Class 1–8 books, questions, HOTS, Map Skills, and quizzes. <strong>100% operational with zero setup required.</strong><br />
              • <strong>Optional Neural Cloud Token:</strong> Connect an authorized token starting with <code className="text-amber-300 bg-stone-900 px-1 py-0.5 rounded font-mono">AIzaSy...</code> for unlimited real-time generation.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Paste authorized engine token (optional)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs bg-stone-900 border border-orange-500/40 rounded-xl focus:outline-none focus:border-amber-400 text-white font-mono"
              />
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1 transition cursor-pointer"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : 'Save Token'}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-HEADER: ACADEMICS ACTIONS OR NON-ACADEMIC PROMPTS                    */}
        {/* ========================================================================= */}
        {activeMode === 'academics' ? (
          <div className="bg-stone-900 border-b border-orange-500/30 p-2 sm:p-2.5 text-xs text-white space-y-2 shrink-0 z-10 relative">
            {/* Locked Book Banner & Quick Selector Pill */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/60 rounded-xl px-3 py-1 text-[11px] font-bold text-emerald-300 shadow-sm">
                  <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate max-w-[320px] sm:max-w-md">
                    LOCKED PDF: {currentSubjectObj?.pdf || 'DAV_Textbook.pdf'} • Ch {selectedChapter}: {currentChapterObj?.title}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-orange-200/80 font-mono hidden md:inline">
                  Class {selectedClass} • {currentSubjectObj?.name}
                </span>
              </div>

              <button
                onClick={() => setWizardStep('select_class')}
                className="text-[11px] font-bold text-amber-300 hover:text-white bg-stone-950 hover:bg-stone-800 border border-orange-500/40 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
              >
                <span>Change Chapter</span>
                <ChevronDown className="w-3 h-3 text-amber-400" />
              </button>
            </div>

            {/* Academics Quick Action Buttons (Summarize, Short Notes, 5-Mark, Bullets, QA, Test) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs whitespace-nowrap">
              <span className="text-[10px] font-bold text-orange-300 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Actions:
              </span>

              <button
                onClick={() => handleAcademicsAction('summarize')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>📝 Summarize Chapter</span>
              </button>

              <button
                onClick={() => handleAcademicsAction('short_notes')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                <span>📋 Short Notes</span>
              </button>

              <button
                onClick={() => handleAcademicsAction('five_mark')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>📑 5-Mark Notes</span>
              </button>

              <button
                onClick={() => handleAcademicsAction('bullet_notes')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <ListChecks className="w-3.5 h-3.5 text-amber-400" />
                <span>📌 Bullet Notes</span>
              </button>

              <button
                onClick={() => handleAcademicsAction('qa')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>🎯 Question Answers</span>
              </button>

              <button
                onClick={() => handleAcademicsAction('hots')}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>🧠 HOTS</span>
              </button>

              {String(selectedSubject).toLowerCase().includes('sst') && (
                <button
                  onClick={() => handleAcademicsAction('map_skills')}
                  className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-orange-950 text-orange-200 hover:text-white border border-orange-500/40 transition font-bold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>🗺️ Map Skills</span>
                </button>
              )}

              {/* TEST QUIZ BUTTON */}
              <button
                onClick={() => handleAcademicsAction('quiz')}
                className="px-3.5 py-1 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition font-black text-xs flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
              >
                <CheckSquare className="w-3.5 h-3.5 text-white" />
                <span>🧪 Take Interactive Test</span>
              </button>
            </div>
          </div>
        ) : (
          /* Non-Academic Outer World Quick Prompts */
          <div className="bg-stone-900/90 border-b border-blue-500/30 p-2 sm:p-2.5 text-xs text-white flex items-center gap-2 overflow-x-auto scrollbar-thin shrink-0">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 shrink-0 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Outer World Topics:
            </span>
            {[
              'India foreign policy & QUAD alignment',
              'BRICS currency & multipolar global order',
              'Chandrayaan-3 Moon South Pole discovery',
              'South-West Monsoon atmospheric mechanism',
              'Full-Stack Web Development React + Vite',
              'Chess opening tactics: Sicilian Defense',
              'Who is Head Boy Rishit Shankar?',
              'Where is Muzaffarpur, Bihar?'
            ].map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 rounded-lg bg-stone-950 hover:bg-blue-950 text-blue-200 hover:text-white border border-blue-500/40 transition font-medium shrink-0 cursor-pointer text-xs shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MAIN DISPLAY: INTERACTIVE QUIZ OR CHAT MESSAGES                           */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* INTERACTIVE TEST LAUNCHER / QUESTION RANGE MODAL                         */}
        {/* ========================================================================= */}
        {showTestConfigModal && (
          <div className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="w-full max-w-lg bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-7 text-white shadow-2xl relative overflow-hidden animate-scaleUp">
              {/* Decorative Glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setShowTestConfigModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                    DAV Examination Simulator
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Setup Interactive Chapter Test
                  </h3>
                </div>
              </div>

              {/* Chapter Badge */}
              <div className="mb-5 p-3 rounded-xl bg-stone-950 border border-orange-500/30 flex items-center justify-between text-xs">
                <div className="truncate">
                  <div className="font-bold text-amber-300 truncate">
                    Class {selectedClass} • {currentSubjectObj?.name}
                  </div>
                  <div className="text-[11px] text-stone-300 truncate">
                    Ch {selectedChapter}: {currentChapterObj?.title}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30">
                  100% Syllabus Match
                </span>
              </div>

              {/* Question Range Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-stone-200">
                    Select Question Range:
                  </label>
                  <span className="text-base font-black text-amber-400 font-mono">
                    {selectedQuestionCount} Questions
                  </span>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min="1"
                  max={maxQuestions}
                  value={selectedQuestionCount}
                  onChange={(e) => setSelectedQuestionCount(Number(e.target.value))}
                  className="w-full h-2 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                
                <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                  <span>1 Question (Quick Practice)</span>
                  <span>Max: {maxQuestions} Questions</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[5, 10, 15, 25, 50].map((preset) => {
                    const isAvailable = preset <= maxQuestions;
                    const isSelected = selectedQuestionCount === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        disabled={!isAvailable}
                        onClick={() => setSelectedQuestionCount(preset)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                            : isAvailable
                            ? 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700'
                            : 'bg-stone-950/60 text-stone-600 border border-stone-800/40 cursor-not-allowed'
                        }`}
                      >
                        <span>{preset} Qs</span>
                        {!isAvailable && (
                          <span className="text-[9px] uppercase tracking-tight text-amber-500/70">
                            {preset > 25 ? '👑 VVIP' : '💎 VIP'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Plan Tier Limit Notice */}
              <div className="mb-6 p-3 rounded-xl bg-stone-950/90 border border-stone-800 text-xs">
                {maxQuestions === 10 && (
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Normal Plan limit: <strong>1 to 10 Questions</strong></span>
                    <span className="text-amber-400 font-bold text-[11px]">VIP unlocks 25 • VVIP 50</span>
                  </div>
                )}
                {maxQuestions === 25 && (
                  <div className="flex items-center justify-between text-amber-300">
                    <span>💎 VIP Plan Active: <strong>1 to 25 Questions</strong></span>
                    <span className="text-amber-400 font-bold text-[11px]">VVIP unlocks 50</span>
                  </div>
                )}
                {maxQuestions >= 50 && (
                  <div className="flex items-center justify-between text-amber-400 font-bold">
                    <span>👑 Master VVIP Plan Active: Full 1 to 50 Questions Unlocked!</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTestConfigModal(false)}
                  className="flex-1 py-3 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowTestConfigModal(false);
                    setShowQuiz(true);
                  }}
                  className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Start Test ({selectedQuestionCount} Questions)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showQuiz ? (
          <InteractiveQuiz
            classNum={selectedClass}
            subjectId={currentSubjectObj?.name || selectedSubject}
            chapterNum={selectedChapter}
            chapterTitle={currentChapterObj?.title}
            questionCount={selectedQuestionCount}
            onClose={() => setShowQuiz(false)}
            onAskAI={(prompt) => handleSend(prompt)}
          />
        ) : (
          <div ref={chatMessagesContainerRef} className="flex-1 min-h-0 p-3 sm:p-5 overflow-y-auto space-y-3 bg-[#f8fafc] relative z-10 overscroll-contain">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <RishiAILogo className="w-9 h-9 shrink-0 mt-1" bgClassName="bg-stone-950 border border-amber-400" />
                  )}
                  
                  <div
                    className={`max-w-[88%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-br-xs'
                        : 'bg-stone-50 text-slate-900 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {/* Header badge on AI response */}
                    {!isUser && (
                      <div className="mb-3 pb-2 border-b border-orange-200 flex items-center justify-between text-orange-950 font-bold text-xs bg-amber-100/90 -mx-4 -mt-4 px-4 pt-3 rounded-t-2xl flex-wrap gap-1">
                        <span className="flex items-center gap-1.5 text-orange-900 font-extrabold">
                          <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse" />
                          <span>{msg.modelName || 'Rishi AI Master Intelligence'}</span>
                        </span>
                        {msg.chapterInfo && (
                          <span className="text-[10px] bg-amber-200 px-2 py-0.5 rounded-full text-stone-950 font-mono font-bold flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-orange-700" />
                            {msg.chapterInfo}
                          </span>
                        )}
                      </div>
                    )}

                    {renderFormattedMessage(msg.text, isUser)}
                  </div>

                  {isUser && (
                    <div className="w-9 h-9 rounded-2xl bg-orange-800 flex items-center justify-center text-white shrink-0 mt-1">
                      <UserIcon className="w-4.5 h-4.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 items-center">
                <RishiAILogo className="w-9 h-9 shrink-0 animate-pulse" bgClassName="bg-stone-950 border border-amber-400" />
                <div className="bg-stone-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-700 shadow-xs">
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-600" />
                  <span>
                    {activeMode === 'academics' 
                      ? `Rishi AI is synthesizing answer directly from Class ${selectedClass} ${currentSubjectObj?.name} Ch ${selectedChapter}...`
                      : 'Rishi AI is synthesizing global intelligence from the outer world neural engine...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* INPUT BAR WITH LOCKED PDF STATUS PILL                                     */}
        {/* ========================================================================= */}
        <div className="p-3 sm:p-4 bg-stone-950 border-t border-orange-500/40 shrink-0 relative z-10">
          
          {/* Active Context Attachment Indicator */}
          <div className="max-w-5xl mx-auto mb-2 flex items-center justify-between text-[11px] text-stone-300 px-1">
            {activeMode === 'academics' ? (
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Attached Textbook: <strong>Class {selectedClass} {currentSubjectObj?.name}</strong> • <strong>Ch {selectedChapter}: {currentChapterObj?.title}</strong>
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-mono">
                  100% Grounded
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-blue-300 font-medium">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                <span>
                  Mode: <strong>Rishi AI Outer World Master Intelligence</strong> (Unconstrained Knowledge)
                </span>
              </div>
            )}

            {activeMode === 'academics' && (
              <button
                onClick={() => setShowTestConfigModal(true)}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Open Quiz</span>
              </button>
            )}
          </div>

          {/* Pending Media Attachment Chip */}
          {pendingMedia && (
            <div className="max-w-5xl mx-auto mb-2 px-3 py-1.5 rounded-xl bg-orange-950/80 border border-orange-500/50 flex items-center justify-between text-xs text-amber-300 animate-fadeIn">
              <div className="flex items-center gap-2">
                <Paperclip className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-bold">{pendingMedia.name}</span>
                <span className="text-[10px] uppercase font-mono text-orange-200">({pendingMedia.type})</span>
              </div>
              <button
                type="button"
                onClick={() => setPendingMedia(null)}
                className="text-orange-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 max-w-5xl mx-auto"
          >
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              ref={fileInputRef}
              className="hidden"
              onChange={handleMediaAttach}
            />

            {/* Media Attachment Pin Icon */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach Homework Photo, Question Paper or Document"
              className="p-3 rounded-xl bg-stone-900 border border-orange-500/40 hover:border-amber-400 text-orange-300 hover:text-amber-400 transition cursor-pointer shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Transcription Mic Button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              title={isListening ? "Listening... Click to stop" : "Speak your question (Voice Transcription)"}
              className={`p-3 rounded-xl border transition cursor-pointer shrink-0 ${
                isListening
                  ? "bg-rose-600 border-rose-400 text-white animate-pulse shadow-lg shadow-rose-600/40"
                  : "bg-stone-900 border-orange-500/40 hover:border-amber-400 text-orange-300 hover:text-amber-400"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={
                isListening
                  ? "🎙️ Listening... Speak your question now..."
                  : activeMode === 'academics'
                  ? `Ask anything from Class ${selectedClass} ${currentSubjectObj?.name || 'SST'} Ch ${selectedChapter} (e.g. Question D.1, middle page concepts, 5-mark notes)...`
                  : 'Ask Rishi AI anything about outer world, geopolitics, space, weather, coding, chess...'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-orange-500/40 bg-stone-900 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={(!input.trim() && !pendingMedia) || loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-sm transition flex items-center gap-1.5 disabled:opacity-50 shadow-md cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>

          <div className="text-[11px] text-orange-200/70 text-center mt-2 flex items-center justify-center gap-2">
            <span>Rishi AI Proprietary Architecture</span>
            <span>•</span>
            <span>DAV Classes LKG to 8 Textbook Grounded</span>
            <span>•</span>
            <span>Interactive Assessment Engine</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEPPED INTERACTIVE WIZARD POP-UP OVERLAY                                  */}
        {/* ========================================================================= */}
        {wizardStep && (
          <div className="absolute inset-0 z-50 bg-slate-950/90 flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="w-full max-w-2xl bg-stone-900 rounded-3xl border-2 border-orange-500/50 shadow-2xl p-6 sm:p-8 text-white relative">
              
              {/* Close / Skip Wizard */}
              <button
                onClick={() => setWizardStep(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer"
                title="Enter Workspace"
              >
                <X className="w-4 h-4" />
              </button>

              {/* STEP 0: SELECT MODE */}
              {wizardStep === 'select_mode' && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-950 border-2 border-amber-400 flex items-center justify-center text-stone-950 shadow-lg">
                    <RishiAILogo className="w-12 h-12" bgClassName="bg-transparent" />
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                      Step 1 of Setup
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      Choose Your Query Domain
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-md mx-auto">
                      Select whether you want to study official DAV school textbooks or explore outer world topics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
                    
                    {/* Academic Option Card */}
                    <div 
                      onClick={() => {
                        setActiveMode('academics');
                        setWizardStep('select_class');
                      }}
                      className="p-5 rounded-2xl bg-stone-950 hover:bg-orange-950/60 border-2 border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer group shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-black text-white group-hover:text-amber-300">
                        📚 Academic Intelligence
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Study official DAV textbooks (LKG to Class 8), chapter summaries, 5-mark notes, back-of-chapter Q&A, and test quizzes.
                      </p>
                      <div className="mt-4 text-xs font-bold text-amber-400 flex items-center gap-1">
                        <span>Select Class & Books</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Non-Academic Option Card */}
                    <div 
                      onClick={() => {
                        setActiveMode('outer_world');
                        setWizardStep(null);
                      }}
                      className="p-5 rounded-2xl bg-stone-950 hover:bg-blue-950/60 border-2 border-blue-500/40 hover:border-blue-400 transition-all cursor-pointer group shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Globe className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-black text-white group-hover:text-blue-300">
                        🌍 Non-Academic Knowledge
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        Ask about world geopolitics, weather & monsoons, ISRO space missions, computer coding, chess tactics, and general knowledge.
                      </p>
                      <div className="mt-4 text-xs font-bold text-blue-400 flex items-center gap-1">
                        <span>Enter Outer World Mode</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STEP 1: SELECT CLASS */}
              {wizardStep === 'select_class' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                      Step 1 of 3 • Select Class
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">
                      Which DAV Class are you studying?
                    </h2>
                    <p className="text-xs text-stone-300 mt-1">
                      Choose your class from LKG to Class 8 to load the verified curriculum books.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-h-72 overflow-y-auto p-1">
                    {DAV_CLASSES.map((c) => {
                      const isSelected = selectedClass === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => handleClassSelect(c.id)}
                          className={`p-3 rounded-xl border-2 text-center transition cursor-pointer font-bold text-xs ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md scale-105'
                              : 'bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-800'
                          }`}
                        >
                          <div className="text-base font-black">{c.id}</div>
                          <div className="text-[10px] opacity-80 mt-0.5 truncate">{c.label.replace(`Class ${c.id}`, '').replace(` (${c.id})`, '') || 'Class'}</div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                    <button
                      onClick={() => setWizardStep('select_mode')}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Mode</span>
                    </button>

                    <button
                      onClick={() => setWizardStep('select_subject')}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                    >
                      <span>Continue: Choose Subject</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: SELECT SUBJECT */}
              {wizardStep === 'select_subject' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                      Step 2 of 3 • Select Subject
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">
                      Choose Subject for Class {selectedClass}
                    </h2>
                    <p className="text-xs text-stone-300 mt-1">
                      Only verified subjects with active textbooks are listed.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-1">
                    {availableSubjects.map((s) => {
                      const isSelected = selectedSubject === s.id;
                      return (
                        <button
                          key={s.id}
                          onClick={() => handleSubjectSelect(s.id)}
                          className={`p-3.5 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md font-black'
                              : 'bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-800 font-bold'
                          }`}
                        >
                          <div className="flex-1 pr-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs sm:text-sm font-bold">{s.name}</span>
                              {s.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                  isSelected ? 'bg-stone-950/20 text-stone-950 border border-stone-950/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {s.badge}
                                </span>
                              )}
                            </div>
                            <div className={`text-[10px] mt-0.5 font-mono ${isSelected ? 'text-stone-900' : 'text-stone-400'}`}>
                              Official Book: {s.pdf}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-stone-950 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                    <button
                      onClick={() => setWizardStep('select_class')}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Class</span>
                    </button>

                    <button
                      onClick={() => setWizardStep('select_chapter')}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition cursor-pointer"
                    >
                      <span>Continue: Choose Chapter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SELECT CHAPTER */}
              {wizardStep === 'select_chapter' && (
                <div className="space-y-6">
                  <div className="text-center">
                    <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                      Step 3 of 3 • Select Chapter
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">
                      Choose Chapter for {currentSubjectObj?.name}
                    </h2>
                    <p className="text-xs text-stone-300 mt-1">
                      This chapter will be locked into Rishi AI for 100% textbook-accurate answers and quizzes.
                    </p>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto p-1">
                    {availableChapters.map((ch) => {
                      const isSelected = String(selectedChapter) === String(ch.num);
                      return (
                        <button
                          key={ch.num}
                          onClick={() => setSelectedChapter(String(ch.num))}
                          className={`w-full p-3 rounded-xl border-2 text-left transition cursor-pointer flex items-center justify-between text-xs ${
                            isSelected
                              ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md font-black'
                              : 'bg-stone-950 hover:bg-stone-800 text-stone-200 border-stone-800 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-800 text-amber-400'}`}>
                              Ch {ch.num}
                            </span>
                            <span className="truncate max-w-xs sm:max-w-sm">{ch.title}</span>
                            {ch.part && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium ${isSelected ? 'bg-stone-950/20 text-stone-950 font-bold' : 'bg-stone-800 text-amber-300/80 border border-amber-500/20'}`}>
                                {ch.part}
                              </span>
                            )}
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-stone-950 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-800">
                    <button
                      onClick={() => setWizardStep('select_subject')}
                      className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Subject</span>
                    </button>

                    <button
                      onClick={() => setWizardStep(null)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition cursor-pointer"
                    >
                      <Paperclip className="w-4 h-4" />
                      <span>📖 Book for AI Workspace</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    );

    if (isSectionView) {
      return (
        <div className="w-full h-full p-2 sm:p-3 bg-gradient-to-br from-[#060a17] via-[#0b1226] to-[#120a1f] flex flex-col items-center justify-center overflow-hidden relative">
          {/* Bioluminescent Quantum AI Brain & Neural Synapse Canvas in outer background */}
          <VfxNeuralBrainMatrix />
          {/* Architectural Dot Grid & Ambient Cyber Mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          {/* Glowing Atmospheric Orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-orange-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute top-1/2 -right-32 w-[480px] h-[480px] bg-gradient-to-tr from-rose-700/15 via-red-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 left-1/3 w-[520px] h-[520px] bg-gradient-to-t from-indigo-900/15 via-blue-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          {/* Subtle Institutional Watermark Accent */}
          <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest text-amber-500/30 uppercase pointer-events-none hidden sm:block">
            DAV DICTIONARY REFERENCE CAMPUS • RISHI AI
          </div>
          {shellContent}
        </div>
      );
    }

    return (
      <div className={`fixed inset-0 z-[80] flex items-center justify-center ${isFullscreen ? 'p-0 w-screen h-screen' : 'p-3 sm:p-6'} bg-slate-950/90 backdrop-blur-xl overflow-hidden font-sans animate-fadeIn`}>
        {/* Bioluminescent Quantum AI Brain & Neural Synapse Canvas in outer background */}
        <VfxNeuralBrainMatrix />
        {/* Glowing Atmospheric Lights behind Modal */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        {shellContent}
      </div>
    );
  }

export const ShankarAI = RishiAI;
export default RishiAI;
