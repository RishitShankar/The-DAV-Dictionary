import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Check, Flame, Trophy, Play, Pause, Volume2, 
  RotateCcw, Copy, ExternalLink, Search, Sliders, Calculator, 
  Atom, Bus, BookOpen, Layers, ShieldCheck, Heart, Clock, 
  Send, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Eye,
  Award, Lock, Compass, BarChart3, CheckSquare, Zap, User, 
  ArrowRight, ArrowLeft, Monitor, Smartphone, MessageSquare,
  Printer, Download, Bell, Mic, MicOff, Share2, Palette
} from 'lucide-react';
import { davAudio } from '../services/davAudioEngine';
import { addScholasticXp } from '../services/scholasticGamificationStore';
import { DAV_50_HITECH_FEATURES } from '../data/dav50HiTechFeaturesData';

export function HiTech50InteractiveModal({ 
  feature, 
  isOpen, 
  onClose,
  onSelectFeature
}) {
  if (!isOpen || !feature) return null;

  // Active feature navigation helper
  const currentIndex = DAV_50_HITECH_FEATURES.findIndex(f => f.id === feature.id);
  const prevFeature = currentIndex > 0 ? DAV_50_HITECH_FEATURES[currentIndex - 1] : null;
  const nextFeature = currentIndex < DAV_50_HITECH_FEATURES.length - 1 ? DAV_50_HITECH_FEATURES[currentIndex + 1] : null;

  // =========================================================================
  // WORKABLE INTERACTIVE STATES FOR ALL 50 FEATURES
  // =========================================================================

  // 1. Socratic Neuro-Tutor
  const [socraticTopic, setSocraticTopic] = useState('density');
  const [socraticHistory, setSocraticHistory] = useState([
    { sender: 'ai', text: 'Namaste! I am your Vedic Socratic mentor. Let us investigate density and fluids. Before we discuss why ice floats, what happens to the spacing between molecules when water cools below 4°C?' }
  ]);
  const [socraticInput, setSocraticInput] = useState('');
  const [socraticStep, setSocraticStep] = useState(1);

  // 2. Leitner Spaced Repetition Flashcards
  const [leitnerCards, setLeitnerCards] = useState([
    { id: 1, box: 1, q: 'What is the SI unit of electric potential difference?', a: 'Volt (V)', subject: 'Physics' },
    { id: 2, box: 1, q: 'Which acid is found in vinegar?', a: 'Acetic Acid (CH₃COOH)', subject: 'Chemistry' },
    { id: 3, box: 2, q: 'State Snell\'s Law of refraction.', a: 'sin(i) / sin(r) = constant (Refractive Index n)', subject: 'Physics' },
    { id: 4, box: 2, q: 'Name the powerhouse of the cell.', a: 'Mitochondria (produces ATP)', subject: 'Biology' },
    { id: 5, box: 3, q: 'What is the sum of interior angles of an n-sided polygon?', a: '(n - 2) × 180°', subject: 'Math' }
  ]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // 3. Theorem Derivator
  const [selectedTheorem, setSelectedTheorem] = useState('pythagoras');
  const [triangleA, setTriangleA] = useState(3);
  const [triangleB, setTriangleB] = useState(4);
  const [derivStep, setDerivStep] = useState(1);

  // 4. Cognitive Load Analyzer & Breathing
  const [readingTimerActive, setReadingTimerActive] = useState(false);
  const [readingSeconds, setReadingSeconds] = useState(0);
  const [wordsReadCount, setWordsReadCount] = useState(120);
  const [fatigueScore, setFatigueScore] = useState(28);
  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale');
  const [breathingCountdown, setBreathingCountdown] = useState(4);

  // 5. 15-Yr Exam Question Predictor
  const [predictClass, setPredictClass] = useState('8');
  const [predictSubject, setPredictSubject] = useState('Science');
  const [revealedModelAnswers, setRevealedModelAnswers] = useState({});

  // 6. Mind-Map Synthesizer
  const [activeMindNode, setActiveMindNode] = useState('Acids, Bases & Salts');
  const [mindSearch, setMindSearch] = useState('');

  // 7. Hindi-English Transliteration Bridge
  const [bilingualQuery, setBilingualQuery] = useState('');
  const [selectedBilingualItem, setSelectedBilingualItem] = useState({
    en: 'Photosynthesis',
    hi: 'प्रकाश संश्लेषण',
    def: 'Process where green plants synthesize nutrients using sunlight and chlorophyll.',
    formula: '6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂',
    sentenceHi: 'प्रकाश संश्लेषण द्वारा पौधे पर्यावरण में ऑक्सीजन छोड़ते हैं।'
  });

  // 8. Persona Adaptive Tone Engine
  const [personaPrompt, setPersonaPrompt] = useState('Why does lightning strike tall trees first?');
  const [selectedPersona, setSelectedPersona] = useState('acharya');

  // 9. Automated Essay & Answer Evaluator
  const [essayContent, setEssayContent] = useState('Mahatma Gandhi led the Indian freedom struggle using Ahimsa (non-violence) and Satyagraha. He united millions of people during the Salt March of 1930.');
  const [essayEvaluation, setEssayEvaluation] = useState(null);

  // 10. Prerequisite Dependency Graph
  const [activePrereqTopic, setActivePrereqTopic] = useState('algebra');

  // 11. Handwritten OCR Scanner (with Canvas Drawing)
  const [isOcrDrawing, setIsOcrDrawing] = useState(false);
  const [ocrStatus, setOcrStatus] = useState('idle');
  const [ocrResultText, setOcrResultText] = useState('');
  const ocrCanvasRef = useRef(null);

  // 12. AR Geometry Protractor
  const [protractorAngle, setProtractorAngle] = useState(45);

  // 13. Chemical Reaction Particle Simulator
  const [selectedReaction, setSelectedReaction] = useState('h2o');
  const [isReactionPlaying, setIsReactionPlaying] = useState(false);
  const chemCanvasRef = useRef(null);

  // 14. Graph Paper Auto-Corrector
  const [targetEquation, setTargetEquation] = useState('y_2x');
  const [userPoints, setUserPoints] = useState([
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 }
  ]);

  // 15. Sanskrit Shloka Lipsync Visualizer
  const [selectedShloka, setSelectedShloka] = useState('gayatri');
  const [pitchAccuracy, setPitchAccuracy] = useState(95);
  const [isChantingPlaying, setIsChantingPlaying] = useState(false);

  // 16. Posture & Ergonomic Guard
  const [postureDistance, setPostureDistance] = useState(38);
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  // 17. Batch Sheet Scanner
  const [batchSheetCount, setBatchSheetCount] = useState(25);
  const [isBatchScanning, setIsBatchScanning] = useState(false);
  const [batchResults, setBatchResults] = useState([]);

  // 18. Map-Skill Geography Matcher
  const [mapTargetItem, setMapTargetItem] = useState('Bhakra Nangal Dam');
  const [pinPosition, setPinPosition] = useState({ x: 38, y: 22 });
  const [mapDistanceError, setMapDistanceError] = useState(14);

  // 19. Vedic Audio Chanting Master
  const [activeVedicChant, setActiveVedicChant] = useState('gayatri');
  const [isVedicPlaying, setIsVedicPlaying] = useState(false);

  // 20. AI Chapter Podcast Studio
  const [podcastTopic, setPodcastTopic] = useState('microorganisms');
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  const [podcastProgress, setPodcastProgress] = useState(24);

  // 21. Hands-Free Voice Lab Assistant
  const [isVoiceListening, setIsVoiceListening] = useState(false);
  const [lastVoiceCmd, setLastVoiceCmd] = useState('Formula for Kinetic Energy');
  const [voiceReply, setVoiceReply] = useState('Kinetic Energy equals one half mass times velocity squared (KE = 1/2 m v²).');

  // 22. Bionic Dyslexia Reader
  const [dyslexiaWpm, setDyslexiaWpm] = useState(160);
  const [dyslexiaActiveWordIdx, setDyslexiaActiveWordIdx] = useState(0);
  const [isDyslexiaReading, setIsDyslexiaReading] = useState(false);

  // 23. Parent WhatsApp Daily Audio Briefing
  const [selectedParentStudent, setSelectedParentStudent] = useState('Rishit Shankar (Class 8-A)');
  const [isParentAudioPlaying, setIsParentAudioPlaying] = useState(false);

  // 24. Multi-Dialect Indian Voice Synthesizer
  const [selectedAccent, setSelectedAccent] = useState('en-IN');
  const [speechRate, setSpeechRate] = useState(0.9);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [testSpeechText, setTestSpeechText] = useState('Welcome to DAV Dixence. Learning is guided by Vedic values and scientific inquiry.');

  // 25. Debate Speech Coach
  const [isRecordingDebate, setIsRecordingDebate] = useState(false);
  const [debateWpm, setDebateWpm] = useState(138);
  const [debateFillerCount, setDebateFillerCount] = useState(2);
  const [debateScore, setDebateScore] = useState(92);

  // 26. 3D Optics Ray-Tracing Workbench
  const [focalLength, setFocalLength] = useState(20);
  const [objectDistanceU, setObjectDistanceU] = useState(35);

  // 27. Dissectible 3D Anatomy Organ (Human Heart)
  const [selectedChamber, setSelectedChamber] = useState('left_ventricle');
  const [heartBpm, setHeartBpm] = useState(72);

  // 28. Quantum Bohr Orbital Shell Simulator
  const [selectedElement, setSelectedElement] = useState('Na');

  // 29. Kepler Solar Gravity Orbit Sandbox
  const [orbitalVelocityV, setOrbitalVelocityV] = useState(29.8);
  const [sunMassMultiplier, setSunMassMultiplier] = useState(1.0);

  // 30. Circuit Breadboard & Ohm's Law
  const [circuitVoltage, setCircuitVoltage] = useState(9);
  const [circuitResistance, setCircuitResistance] = useState(100);
  const [isCircuitSwitchClosed, setIsCircuitSwitchClosed] = useState(true);
  const [isCircuitFuseBlown, setIsCircuitFuseBlown] = useState(false);

  // 31. 3D Vedic & Harappan Museum
  const [activeMuseumArtifact, setActiveMuseumArtifact] = useState('pashupati');

  // 32. Tectonic Plate Collision Sandbox
  const [convergenceRate, setConvergenceRate] = useState(45);

  // 33. Dual-Camera Synchronized AI Proctoring
  const [isDualProctorRunning, setIsDualProctorRunning] = useState(true);
  const [gazeStatus, setGazeStatus] = useState('Centered (Normal)');
  const [roomPerimeterStatus, setRoomPerimeterStatus] = useState('Clean (Single Candidate)');

  // 34. Audio Frequency Whisper Classifier
  const [ambientDb, setAmbientDb] = useState(36);
  const [detectedNoiseType, setDetectedNoiseType] = useState('Ambient Room Hum (Low)');

  // 35. Plagiarism & AI Text Detector
  const [plagText, setPlagText] = useState('Photosynthesis is a biological process utilized by green plants to transform light radiant energy into chemical glucose bonds.');
  const [humanProbScore, setHumanProbScore] = useState(94);

  // 36. Dynamic Rotating QR Hall Ticket
  const [qrCountdown, setQrCountdown] = useState(28);
  const [hallTicketToken, setHallTicketToken] = useState('DAV-2026-TERM2-88419');

  // 37. Biometric Face-ID Attendance Logger
  const [isFaceScanning, setIsFaceScanning] = useState(false);
  const [scannedFacesCount, setScannedFacesCount] = useState(45);

  // 38. Zero-Knowledge Encrypted Grade Vault
  const [gradeStudentId, setGradeStudentId] = useState('DAV-STD-0814');
  const [gradeZkHash, setGradeZkHash] = useState('sha256-4a1b8c2d9e7f...cb31');

  // 39. Smart Bus Live Telemetry & ETA
  const [busSpeed, setBusSpeed] = useState(42);
  const [busEtaMinutes, setBusEtaMinutes] = useState(7);
  const [busCurrentStop, setBusCurrentStop] = useState('Khabra Chowk');

  // 40. Smartboard Screen Sync
  const [boardColor, setBoardColor] = useState('#f59e0b');
  const [boardStrokes, setBoardStrokes] = useState([]);
  const masterBoardCanvasRef = useRef(null);

  // 41. RFID Library Self-Checkout
  const [selectedLibraryBook, setSelectedLibraryBook] = useState('DAV Science Explorer (Class 8)');
  const [loanDueDate, setLoanDueDate] = useState('Nov 29, 2026 (14 Days)');
  const [isBookLoaned, setIsBookLoaned] = useState(false);

  // 42. Live Classroom 10s Clicker
  const [clickerQuestion, setClickerQuestion] = useState('Which cell organelle is responsible for cellular respiration?');
  const [clickerVotes, setClickerVotes] = useState({ A: 12, B: 29, C: 4, D: 1 });
  const [userClickedOption, setUserClickedOption] = useState(null);

  // 43. School Bell & Assembly Chime
  const [activePeriodNumber, setActivePeriodNumber] = useState(4);
  const [bellNextTime, setBellNextTime] = useState('11:45 AM (Recess Bell)');

  // 44. Bandwidth-Adaptive Offline P2P Mesh Sync
  const [offlineSyncedChapters, setOfflineSyncedChapters] = useState([
    { name: 'Science_Ch3_Microorganisms.pdf', size: '4.2 MB', ready: true },
    { name: 'Mathematics_Ch5_LinearEquations.pdf', size: '5.8 MB', ready: true },
    { name: 'Sanskrit_Ch2_Subhashitani.pdf', size: '2.1 MB', ready: true }
  ]);

  // 45. Inter-DAV House Clash Arena
  const [houseScores, setHouseScores] = useState({
    Dayanand: 1480,
    Hansraj: 1430,
    Ashoka: 1410,
    Tagore: 1370
  });
  const [userHouse, setUserHouse] = useState('Dayanand');

  // 46. Blockchain Skill Badge Minter
  const [badgeRecipient, setBadgeRecipient] = useState('Rishit Shankar');
  const [isBadgeMinted, setIsBadgeMinted] = useState(false);

  // 47. Career & Stream AI Predictor
  const [aptitudeAnswers, setAptitudeAnswers] = useState({ science: 4, math: 5, commerce: 2, arts: 1 });

  // 48. Peer Study-Buddy Matcher
  const [myStrongSubject, setMyStrongSubject] = useState('Mathematics');
  const [myGoalSubject, setMyGoalSubject] = useState('Hindi Vyakaran');
  const [matchedPeer, setMatchedPeer] = useState({ name: 'Aarav Kumar (Class 8-B)', matchPct: 98, strength: 'Hindi & Sanskrit', needs: 'Algebra & Physics' });

  // 49. Virtual DAV Metaverse Quad
  const [activeMetaverseZone, setActiveMetaverseZone] = useState('Vedic Assembly Ground');

  // 50. Vedic Karmic Points & Tree Tracker
  const [karmicLeafCount, setKarmicLeafCount] = useState(165);
  const [recentSevaLog, setRecentSevaLog] = useState([
    'Planted Neem sapling in school garden (+15 🍃)',
    'Helped classmate with Class 7 Fractions (+10 🍃)',
    'Kept classroom clean after recess (+5 🍃)'
  ]);

  // =========================================================================
  // TIMERS & EFFECTS
  // =========================================================================

  // QR Code Admit Card 30s Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown(prev => {
        if (prev <= 1) {
          setHallTicketToken(`DAV-2026-TERM2-${Math.floor(10000 + Math.random() * 90000)}`);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 4-7-8 Breathing Cycle
  useEffect(() => {
    let t = null;
    if (isBreathingModalOpen) {
      t = setInterval(() => {
        setBreathingCountdown(prev => {
          if (prev <= 1) {
            setBreathingPhase(curr => {
              if (curr === 'Inhale') return 'Hold';
              if (curr === 'Hold') return 'Exhale';
              return 'Inhale';
            });
            return breathingPhase === 'Inhale' ? 7 : breathingPhase === 'Hold' ? 8 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [isBreathingModalOpen, breathingPhase]);

  // Audio speech synthesis helper
  const speakText = (text, lang = 'en-IN') => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = lang;
      utt.rate = speechRate;
      utt.pitch = speechPitch;
      window.speechSynthesis.speak(utt);
    }
  };

  // 1. Socratic Tutor Submit Handler
  const handleSocraticSubmit = () => {
    if (!socraticInput.trim()) return;
    const userText = socraticInput.trim();
    const newStep = socraticStep + 1;
    setSocraticStep(newStep);

    let nextAiText = '';
    const lower = userText.toLowerCase();

    if (lower.includes('volume') || lower.includes('expand')) {
      nextAiText = 'Brilliant deduction! When water freezes below 4°C, its volume increases by ~9%. Now, what does Density = Mass / Volume tell us about what happens to density?';
    } else if (lower.includes('density') || lower.includes('lighter') || lower.includes('decrease')) {
      nextAiText = 'Spot on! Increased volume means lower density (0.917 g/cm³ vs 1.0 g/cm³ for liquid water). Now connect this with Archimedes Principle: why must it float?';
    } else if (lower.includes('buoyancy') || lower.includes('displace') || lower.includes('float')) {
      nextAiText = 'Congratulations! You derived Archimedes Buoyancy Axiom! Upward buoyant force equals the weight of displaced liquid, which easily supports the lighter ice structure.';
    } else {
      nextAiText = `Interesting thought! Consider the formula Density = Mass / Volume. If the mass stays constant but molecular hydrogen bonds push water molecules into an open hexagonal crystal cage, what happens to volume?`;
    }

    setSocraticHistory(prev => [
      ...prev,
      { sender: 'student', text: userText },
      { sender: 'ai', text: nextAiText }
    ]);
    setSocraticInput('');
    davAudio?.playChime?.('click');
  };

  // 9. Essay Evaluation Handler
  const handleEvaluateEssay = () => {
    davAudio?.playChime?.('click');
    const words = essayContent.trim().split(/\s+/).filter(Boolean).length;
    const sentences = essayContent.split(/[.!?]+/).filter(Boolean).length;
    const hasAhimsa = essayContent.toLowerCase().includes('ahimsa') || essayContent.toLowerCase().includes('peace');
    const hasSatyagraha = essayContent.toLowerCase().includes('satyagraha') || essayContent.toLowerCase().includes('freedom');

    setEssayEvaluation({
      wordCount: words,
      sentenceCount: sentences,
      contentScore: hasAhimsa && hasSatyagraha ? '2.0/2.0' : '1.5/2.0',
      fluencyScore: sentences >= 2 ? '1.8/2.0' : '1.2/2.0',
      grammarScore: '0.9/1.0',
      totalScore: hasAhimsa && hasSatyagraha ? '4.7/5.0 (Grade A+)' : '4.1/5.0 (Grade A)',
      feedback: 'Excellent historical coherence and keyword alignment with the DAV Class 8 Social Science curriculum.'
    });
  };

  // 45. House Quiz Handler
  const handleHouseAnswer = (isCorrect) => {
    davAudio?.playChime?.(isCorrect ? 'success' : 'click');
    if (isCorrect) {
      setHouseScores(prev => ({
        ...prev,
        [userHouse]: prev[userHouse] + 50
      }));
      addScholasticXp?.(50);
    }
  };

  // 43. Play Period Bell Audio
  const handlePlayPeriodBell = () => {
    davAudio?.playChime?.('bell');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[94vh] bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100 font-sans">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 border-b border-stone-800 bg-stone-900/90 flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
              #{feature.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {feature.badge}
                </span>
                <span className="text-[10px] text-stone-400 font-medium">
                  {feature.tag}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-[260px] sm:max-w-lg">
                {feature.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {prevFeature && (
              <button
                type="button"
                onClick={() => onSelectFeature?.(prevFeature)}
                title={`Previous: #${prevFeature.id} ${prevFeature.title}`}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {nextFeature && (
              <button
                type="button"
                onClick={() => onSelectFeature?.(nextFeature)}
                title={`Next: #${nextFeature.id} ${nextFeature.title}`}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800/80 hover:bg-red-500/20 hover:text-red-400 text-stone-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Goal Ribbon */}
        <div className="px-5 py-2.5 bg-stone-900/40 border-b border-stone-800/80 flex items-center justify-between text-xs text-stone-300 gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="line-clamp-1">{feature.description}</p>
          </div>
          <span className="text-[10px] text-stone-400 whitespace-nowrap hidden sm:inline">
            Status: <strong className="text-emerald-400">● 100% Workable Sandbox</strong>
          </span>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE WORKSPACE BODY                                                */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* 1. Socratic Neuro-Tutor */}
          {feature.modeKey === 'socratic_tutor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">Topic Selection:</span>
                <select 
                  value={socraticTopic} 
                  onChange={(e) => {
                    setSocraticTopic(e.target.value);
                    setSocraticStep(1);
                    setSocraticHistory([
                      { sender: 'ai', text: `Namaste! Let's explore ${e.target.value === 'density' ? 'Fluids & Density' : e.target.value === 'gravity' ? 'Newton\'s Gravitation' : 'Plant Respiration'}. What is your first hypothesis about this phenomenon?` }
                    ]);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
                >
                  <option value="density">Density & Fluids (Class 8 Science)</option>
                  <option value="gravity">Universal Gravitation (Physics)</option>
                  <option value="respiration">Photosynthesis & Respiration (Biology)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900/90 border border-purple-500/30 space-y-3">
                <div className="flex justify-between items-center text-[11px] text-stone-400 pb-1 border-b border-stone-800">
                  <span>Socratic Stepping Stones</span>
                  <span className="text-purple-400 font-bold">Step #{socraticStep} of 4</span>
                </div>
                
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 text-xs">
                  {socraticHistory.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-2xl max-w-[85%] ${
                        msg.sender === 'student' 
                          ? 'ml-auto bg-purple-600 text-white font-medium' 
                          : 'bg-stone-800 border border-stone-700 text-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-bold opacity-75 mb-1">
                        <span>{msg.sender === 'student' ? 'Student' : 'Vedic Socratic AI'}</span>
                        {msg.sender === 'ai' && (
                          <button 
                            type="button" 
                            onClick={() => speakText(msg.text)} 
                            title="Read Aloud"
                            className="hover:text-amber-400"
                          >
                            <Volume2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      {msg.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={socraticInput}
                    onChange={(e) => setSocraticInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSocraticSubmit()}
                    placeholder="Type your intermediate derivation hypothesis..."
                    className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={handleSocraticSubmit}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>Submit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Leitner Spaced Repetition */}
          {feature.modeKey === 'leitner_curve' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[1, 2, 3].map(boxNum => {
                  const count = leitnerCards.filter(c => c.box === boxNum).length;
                  return (
                    <div 
                      key={boxNum} 
                      className={`p-3 rounded-2xl border transition ${
                        boxNum === 1 ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' :
                        boxNum === 2 ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' :
                        'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      }`}
                    >
                      <span className="text-[10px] font-bold block uppercase tracking-wider">
                        {boxNum === 1 ? 'Box 1: Daily' : boxNum === 2 ? 'Box 2: 3 Days' : 'Box 3: Weekly'}
                      </span>
                      <span className="text-xl font-black text-white">{count}</span>
                      <span className="text-[10px] block opacity-75">Flashcards</span>
                    </div>
                  );
                })}
              </div>

              {/* Active Flashcard Viewer */}
              <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 text-center space-y-4 min-h-48 flex flex-col justify-center items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                  {leitnerCards[activeCardIndex]?.subject} • Card #{activeCardIndex + 1} of {leitnerCards.length}
                </span>

                <div 
                  onClick={() => setIsCardFlipped(prev => !prev)}
                  className="cursor-pointer max-w-md w-full p-6 rounded-2xl bg-stone-950 border border-stone-700 hover:border-amber-400/50 transition transform hover:scale-[1.01]"
                >
                  <p className="text-sm font-bold text-white mb-2">
                    {isCardFlipped ? leitnerCards[activeCardIndex]?.a : leitnerCards[activeCardIndex]?.q}
                  </p>
                  <span className="text-[10px] text-stone-500 block font-mono">
                    (Click to {isCardFlipped ? 'Show Question' : 'Flip & Reveal Answer'})
                  </span>
                </div>

                {/* Leitner Action Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...leitnerCards];
                      updated[activeCardIndex].box = 1;
                      setLeitnerCards(updated);
                      setActiveCardIndex((activeCardIndex + 1) % leitnerCards.length);
                      setIsCardFlipped(false);
                      davAudio?.playChime?.('click');
                    }}
                    className="px-4 py-2 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold"
                  >
                    Move to Box 1 (Need Review)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...leitnerCards];
                      updated[activeCardIndex].box = Math.min(3, updated[activeCardIndex].box + 1);
                      setLeitnerCards(updated);
                      setActiveCardIndex((activeCardIndex + 1) % leitnerCards.length);
                      setIsCardFlipped(false);
                      davAudio?.playChime?.('success');
                    }}
                    className="px-4 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold"
                  >
                    I Knew This! (Promote Box +1)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Theorem Derivator */}
          {feature.modeKey === 'theorem_derivator' && (
            <div className="space-y-4">
              <div className="flex gap-2 text-xs">
                {['pythagoras', 'archimedes', 'newton2'].map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => { setSelectedTheorem(key); setDerivStep(1); }}
                    className={`px-3.5 py-2 rounded-xl font-bold uppercase transition ${
                      selectedTheorem === key ? 'bg-amber-500 text-stone-950 shadow-md font-black' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {key === 'pythagoras' ? 'Pythagoras' : key === 'archimedes' ? 'Archimedes' : 'Newton 2nd Law'}
                  </button>
                ))}
              </div>

              {selectedTheorem === 'pythagoras' && (
                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="font-bold text-amber-400 text-sm">Interactive Right Triangle Sides:</span>
                    <div className="flex items-center gap-4 text-stone-300">
                      <span>Side a: <strong>{triangleA}</strong></span>
                      <span>Side b: <strong>{triangleB}</strong></span>
                      <span className="text-emerald-400 font-bold">Hypotenuse c: <strong>{Math.sqrt(triangleA*triangleA + triangleB*triangleB).toFixed(2)}</strong></span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Adjust Side a:</label>
                      <input type="range" min="2" max="8" value={triangleA} onChange={(e) => setTriangleA(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-400 block mb-1">Adjust Side b:</label>
                      <input type="range" min="2" max="8" value={triangleB} onChange={(e) => setTriangleB(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                  </div>

                  {/* Visual SVG Derivation Diagram */}
                  <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex justify-center">
                    <svg width="220" height="160" viewBox="0 0 220 160" className="overflow-visible">
                      <polygon 
                        points={`20,140 ${20 + triangleA * 18},140 20,${140 - triangleB * 16}`} 
                        fill="rgba(245, 158, 11, 0.2)" 
                        stroke="#f59e0b" 
                        strokeWidth="2" 
                      />
                      <text x="10" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">90°</text>
                      <text x={20 + (triangleA * 9)} y="155" fill="#e5e7eb" fontSize="10">a = {triangleA}</text>
                      <text x="5" y={140 - (triangleB * 8)} fill="#e5e7eb" fontSize="10">b = {triangleB}</text>
                      <text x={30 + (triangleA * 8)} y={130 - (triangleB * 7)} fill="#10b981" fontSize="10" fontWeight="bold">
                        c² = {triangleA*triangleA + triangleB*triangleB}
                      </text>
                    </svg>
                  </div>

                  <div className="p-3 bg-stone-800/80 rounded-xl font-mono text-center text-amber-300 font-bold">
                    a² + b² = {triangleA}² + {triangleB}² = {triangleA*triangleA} + {triangleB*triangleB} = {triangleA*triangleA + triangleB*triangleB} = c²
                  </div>
                </div>
              )}

              {selectedTheorem !== 'pythagoras' && (
                <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-xs space-y-3">
                  <span className="font-bold text-cyan-400 text-sm">
                    {selectedTheorem === 'archimedes' ? 'Archimedes Principle Formula Derivation:' : 'Newton\'s Second Law Axiom:'}
                  </span>
                  <div className="p-4 bg-stone-950 font-mono text-center text-cyan-300 font-bold rounded-xl border border-stone-800">
                    {selectedTheorem === 'archimedes' 
                      ? 'F_buoyant = ρ_fluid × V_submerged × g = Weight of Displaced Fluid'
                      : 'F = dp/dt = d(mv)/dt = m × (dv/dt) = m × a'}
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    {selectedTheorem === 'archimedes' 
                      ? 'When an object is immersed partially or fully in a fluid, it experiences an upward buoyant force equal to the gravitational weight of the fluid it displaces.'
                      : 'The rate of change of momentum of a body is directly proportional to the applied unbalanced force, and takes place in the direction of the force.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 4. Cognitive Load Analyzer */}
          {feature.modeKey === 'cognitive_load' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Real-Time Reading & Cadence Test:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    fatigueScore > 60 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    Cognitive Fatigue: {fatigueScore}% ({fatigueScore > 60 ? 'Fatigue Detected' : 'Optimal Zone'})
                  </span>
                </div>

                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-stone-300 leading-relaxed max-h-36 overflow-y-auto">
                  <p>
                    "Microorganisms are classified into four major groups: bacteria, fungi, protozoa, and some algae. Viruses are also microscopic but are different from other microorganisms; they reproduce only inside the host organism's cells. Useful bacteria like Lactobacillus promote curd formation, while Rhizobium fixes atmospheric nitrogen in leguminous plants..."
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-stone-800 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Words Read</span>
                    <span className="font-black text-white text-base">{wordsReadCount}</span>
                  </div>
                  <div className="p-3 bg-stone-800 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Reading Speed</span>
                    <span className="font-black text-emerald-400 text-base">145 WPM</span>
                  </div>
                  <div className="p-3 bg-stone-800 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Scroll Stutter</span>
                    <span className="font-black text-amber-400 text-base">Low (Smooth)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFatigueScore(Math.min(100, fatigueScore + 25));
                      davAudio?.playChime?.('click');
                    }}
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-bold"
                  >
                    Simulate Late Night Stutter
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBreathingModalOpen(true)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Flame className="w-4 h-4 text-stone-950" />
                    <span>Launch 60s Vedic Pranayama Breathing</span>
                  </button>
                </div>
              </div>

              {/* Vedic Breathing Modal Overlay */}
              {isBreathingModalOpen && (
                <div className="p-6 bg-stone-950 border-2 border-amber-500/50 rounded-3xl text-center space-y-4 animate-fadeIn">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    4-7-8 Vedic Pranayama Rejuvenator
                  </span>
                  <div className="w-28 h-28 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500 flex flex-col items-center justify-center animate-pulse">
                    <span className="text-xs text-stone-400">{breathingPhase}</span>
                    <span className="text-2xl font-black text-amber-400">{breathingCountdown}s</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsBreathingModalOpen(false); setFatigueScore(15); }}
                    className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-bold"
                  >
                    Finish Breathing (Reset Fatigue to 15%)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 5. 15-Yr Question Predictor */}
          {feature.modeKey === 'question_predictor' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="text-[10px] text-stone-400 block mb-0.5">Select Class:</label>
                  <select 
                    value={predictClass} 
                    onChange={(e) => setPredictClass(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
                  >
                    {[3, 4, 5, 6, 7, 8].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-stone-400 block mb-0.5">Select Subject:</label>
                  <select 
                    value={predictSubject} 
                    onChange={(e) => setPredictSubject(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
                  >
                    <option value="Science">Science (PCB)</option>
                    <option value="Maths">Mathematics</option>
                    <option value="SST">Social Science</option>
                    <option value="Sanskrit">Sanskrit (सुरभि)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'q1', q: 'Draw ray diagram when object is placed between F and 2F in front of a concave mirror.', marks: '3 Marks', prob: '94%', past: '2019, 2021, 2024' },
                  { id: 'q2', q: 'Differentiate between Thermoplastic and Thermosetting plastics with 2 examples each.', marks: '3 Marks', prob: '88%', past: '2018, 2022, 2025' },
                  { id: 'q3', q: 'Explain female reproductive organ with labeled diagram and role of oviduct.', marks: '5 Marks', prob: '85%', past: '2020, 2023' }
                ].map(item => (
                  <div key={item.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 text-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-white text-sm">{item.q}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] whitespace-nowrap">
                        {item.prob} Probable
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-stone-400 text-[11px] pt-1">
                      <span>Weightage: <strong className="text-amber-400">{item.marks}</strong> • Appeared: {item.past}</span>
                      <button
                        type="button"
                        onClick={() => setRevealedModelAnswers(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                        className="text-amber-400 hover:underline font-bold"
                      >
                        {revealedModelAnswers[item.id] ? 'Hide Answer Scheme' : 'Reveal Model Answer Scheme'}
                      </button>
                    </div>
                    {revealedModelAnswers[item.id] && (
                      <div className="p-3 bg-stone-950 rounded-xl text-stone-300 text-[11px] border border-stone-800">
                        <strong>Marking Scheme:</strong> 1 Mark for neat ray diagram with arrow directions; 1 Mark for mentioning image position (Beyond 2F); 1 Mark for nature (Real, Inverted, Magnified).
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Mind-Map Synthesizer */}
          {feature.modeKey === 'mindmap_synthesizer' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-cyan-400">Interactive SVG Concept Knowledge Tree</span>
                <input
                  type="text"
                  placeholder="Search branch (e.g. Litmus)..."
                  value={mindSearch}
                  onChange={(e) => setMindSearch(e.target.value)}
                  className="px-3 py-1 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Acids (pH < 7)', sub: 'Sour taste, H+ ions, Turn blue litmus red' },
                  { name: 'Bases (pH > 7)', sub: 'Bitter taste, OH- ions, Soapy feel' },
                  { name: 'Neutralization', sub: 'Acid + Base → Salt + Water + Heat' },
                  { name: 'Indicators', sub: 'Litmus, Turmeric, China Rose, Phenolphthalein' }
                ].map(node => (
                  <div
                    key={node.name}
                    onClick={() => setActiveMindNode(node.name)}
                    className={`p-3 rounded-2xl border cursor-pointer transition ${
                      activeMindNode === node.name ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <span className="font-bold text-xs block text-white">{node.name}</span>
                    <span className="text-[10px] block opacity-75 mt-1">{node.sub}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-xs text-stone-300 space-y-1">
                <span className="font-bold text-cyan-300 block">Active Branch Concept Definition:</span>
                <p>
                  {activeMindNode.includes('Acids') && 'Hydrochloric acid (HCl) in gastric juice, Citric acid in lemons, Acetic acid in vinegar. They react with zinc to release hydrogen gas.'}
                  {activeMindNode.includes('Bases') && 'Sodium hydroxide (NaOH), Potassium hydroxide (KOH). Used in manufacturing soaps and antacids (Milk of Magnesia).'}
                  {activeMindNode.includes('Neutralization') && 'HCl + NaOH → NaCl + H₂O. When an ant stings, it injects formic acid; baking soda (sodium bicarbonate) neutralizes it.'}
                  {activeMindNode.includes('Indicators') && 'Natural indicator Turmeric turns reddish-brown in basic solutions. Litmus extracted from lichens.'}
                </p>
              </div>
            </div>
          )}

          {/* 7. Hindi-English Transliteration */}
          {feature.modeKey === 'hindi_transliteration' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={bilingualQuery}
                  onChange={(e) => setBilingualQuery(e.target.value)}
                  placeholder="Type term in English or Hindi (e.g. Respiration, घर्षण)..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-700 text-white"
                />
              </div>

              <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">English Term</span>
                    <span className="text-lg font-black text-white">{selectedBilingualItem.en}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Hindi (शब्दावली)</span>
                    <span className="text-lg font-black text-amber-400">{selectedBilingualItem.hi}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-stone-300">
                  <span className="font-bold text-white block">Definition:</span>
                  <p>{selectedBilingualItem.def}</p>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl font-mono text-cyan-300 text-center font-bold">
                  {selectedBilingualItem.formula}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <p className="text-stone-400 text-[11px] italic">
                    "{selectedBilingualItem.sentenceHi}"
                  </p>
                  <button
                    type="button"
                    onClick={() => speakText(`${selectedBilingualItem.en}, हिंदी में: ${selectedBilingualItem.hi}`, 'hi-IN')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Pronounce Bilingual</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 8. Persona Adaptive Tone Engine */}
          {feature.modeKey === 'persona_engine' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-300">Test Question / Prompt:</label>
                <input
                  type="text"
                  value={personaPrompt}
                  onChange={(e) => setPersonaPrompt(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-stone-900 border border-stone-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'acharya', label: 'DAV Acharya', icon: '🙏', desc: 'Vedic ethics & wisdom' },
                  { id: 'senior', label: 'Friendly Senior', icon: '🎒', desc: 'Exam shortcuts & peer tone' },
                  { id: 'scientist', label: 'Curious Scientist', icon: '🔬', desc: 'First principles & physics' },
                  { id: 'examiner', label: 'Strict Examiner', icon: '📝', desc: 'Marking scheme & rubrics' }
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPersona(p.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      selectedPersona === p.id ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-stone-900 border-stone-800 text-stone-400'
                    }`}
                  >
                    <span className="text-lg block mb-1">{p.icon}</span>
                    <span className="font-bold text-white block">{p.label}</span>
                    <span className="text-[10px] block opacity-75">{p.desc}</span>
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Adaptive Tone Output:</span>
                  <button
                    type="button"
                    onClick={() => {
                      const spoken = selectedPersona === 'acharya' ? 'प्रिय विद्यार्थी, प्रकृति का यह नियम है कि विद्युत आवेश सदैव न्यूनतम प्रतिरोध का मार्ग चुनता है।' : 'Tall objects provide the shortest path of least electrical resistance for lightning discharge.';
                      speakText(spoken);
                    }}
                    className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs flex items-center gap-1 font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-purple-400" />
                    <span>Speak in Persona Voice</span>
                  </button>
                </div>

                <div className="p-4 bg-stone-950 rounded-xl text-stone-200 text-xs leading-relaxed italic border border-stone-800">
                  {selectedPersona === 'acharya' && '"आयुष्मान भव! प्रकृति का यह शाश्वत नियम है कि जब आकाश में मेघों का घर्षण होता है, तो आवेश पृथ्वी की ओर आकर्षित होता है। वृक्ष ऊँचे होने के कारण भूमि और बादलों के बीच की दूरी को न्यूनतम कर देते हैं। इसलिए तड़ित चालक का प्रयोग वैदिक वास्तु में भी अनिवार्य माना गया है।"'}
                  {selectedPersona === 'senior' && '"Hey bro! Think of electricity as lazy: it always takes the easiest shortcut to ground. Trees are super tall, so the lightning doesn\'t have to travel as much through air resistance. Quick exam tip: never stand under a lone tree during a thunderstorm—always crouch in a low spot!"'}
                  {selectedPersona === 'scientist' && '"Observe the breakdown voltage of air: approximately 3 million volts per meter. A 20-meter banyan tree shortens the required ionization channel length significantly. Step leaders propagate from clouds, and upward streamers launch preferentially from high-curvature apexes like tree branches."'}
                  {selectedPersona === 'examiner' && '"1 Mark: Define electrical discharge. 1 Mark: Explain path of least resistance through ionized air. 1 Mark: Draw schematic of Lightning Conductor on school building. Failure to mention \'grounding copper plate\' will result in a 0.5 mark deduction."'}
                </div>
              </div>
            </div>
          )}

          {/* 9. Essay Evaluator */}
          {feature.modeKey === 'essay_evaluator' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white">Paste Student Subjective Essay / Answer:</label>
                <textarea
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 text-xs rounded-2xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="button"
                onClick={handleEvaluateEssay}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition shadow-md"
              >
                Grade Answer Against CBSE Rubric
              </button>

              {essayEvaluation && (
                <div className="p-5 rounded-2xl bg-stone-900 border border-amber-500/40 space-y-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <span className="font-bold text-white text-sm">CBSE 5-Tier Subjective Marks Breakdown</span>
                    <span className="text-base font-black text-amber-400">{essayEvaluation.totalScore}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-2.5 bg-stone-950 rounded-xl">
                      <span className="text-[10px] text-stone-400 block">Content Depth</span>
                      <span className="font-bold text-emerald-400">{essayEvaluation.contentScore}</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-xl">
                      <span className="text-[10px] text-stone-400 block">Fluency & Logic</span>
                      <span className="font-bold text-emerald-400">{essayEvaluation.fluencyScore}</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-xl">
                      <span className="text-[10px] text-stone-400 block">Grammar Accuracy</span>
                      <span className="font-bold text-emerald-400">{essayEvaluation.grammarScore}</span>
                    </div>
                    <div className="p-2.5 bg-stone-950 rounded-xl">
                      <span className="text-[10px] text-stone-400 block">Words / Sentences</span>
                      <span className="font-bold text-white">{essayEvaluation.wordCount} w / {essayEvaluation.sentenceCount} s</span>
                    </div>
                  </div>

                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    <strong>Examiner Note:</strong> {essayEvaluation.feedback}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* 10. Prereq Dependency Graph */}
          {feature.modeKey === 'prereq_graph' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {[
                  { id: 'algebra', title: 'Quadratic Equations (Class 8)' },
                  { id: 'optics', title: 'Refraction & Lenses (Class 8)' },
                  { id: 'cells', title: 'Cell Division & Mitosis (Class 8)' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePrereqTopic(item.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      activePrereqTopic === item.id ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-amber-400 text-sm">3-Tier Prerequisite Gap Diagnostic:</span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
                    <span className="text-[10px] text-rose-400 font-bold block uppercase">Level 3 (Current Challenge)</span>
                    <span className="font-bold text-white block mt-1">Class 8 Quadratic Equations</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Factorization & Roots</span>
                  </div>

                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                    <span className="text-[10px] text-amber-400 font-bold block uppercase">Level 2 (Bridge Prerequisite)</span>
                    <span className="font-bold text-white block mt-1">Class 7 Linear Equations</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">Transposition & Variables</span>
                  </div>

                  <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                    <span className="text-[10px] text-emerald-400 font-bold block uppercase">Level 1 (Root Axiom)</span>
                    <span className="font-bold text-white block mt-1">Class 5 Integer Sign Rules</span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">(- × - = +) Multiplication</span>
                  </div>
                </div>

                <div className="p-3 bg-stone-950 rounded-xl text-stone-300 text-[11px] leading-relaxed">
                  <strong>Diagnostic Recommendation:</strong> If the student makes errors in factoring $x^2 - 5x + 6 = 0$, assign a 5-question refresher on combining negative integers before attempting the quadratic formula.
                </div>
              </div>
            </div>
          )}

          {/* 11. Handwritten OCR Scanner */}
          {feature.modeKey === 'handwritten_ocr' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">Interactive Formula Scanner:</span>
                  <span className="text-stone-400 text-[11px]">Draw formula or choose sample</span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOcrStatus('scanning');
                      setTimeout(() => {
                        setOcrStatus('done');
                        setOcrResultText('(a + b)^2 = a^2 + 2ab + b^2');
                      }, 700);
                    }}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold"
                  >
                    Sample: Algebraic Identity
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOcrStatus('scanning');
                      setTimeout(() => {
                        setOcrStatus('done');
                        setOcrResultText('E = mc^2 \\quad \\text{(Einstein Mass-Energy Relation)}');
                      }, 700);
                    }}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold"
                  >
                    Sample: Physics Mass-Energy
                  </button>
                </div>

                <div className="h-32 bg-stone-950 rounded-2xl border border-stone-800 flex items-center justify-center font-mono text-stone-400 relative overflow-hidden">
                  {ocrStatus === 'scanning' && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse" />
                  )}
                  <div className="text-center">
                    <span className="text-xl font-handwriting text-stone-300 block mb-1">
                      {ocrResultText ? ocrResultText : '(a + b)² = a² + 2ab + b²'}
                    </span>
                    <span className="text-[10px] text-stone-500">Optical Pixel Matrix • 300 DPI</span>
                  </div>
                </div>

                {ocrStatus === 'done' && (
                  <div className="p-3 bg-stone-800 rounded-xl font-mono text-emerald-400 flex items-center justify-between">
                    <span>LaTeX: {ocrResultText}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard?.writeText?.(ocrResultText);
                        davAudio?.playChime?.('click');
                      }}
                      className="px-2 py-1 bg-emerald-600/30 text-emerald-300 rounded text-[10px] font-bold"
                    >
                      Copy LaTeX
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 12. AR Geometry Protractor */}
          {feature.modeKey === 'geometry_protractor' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 text-sm">Interactive AR Protractor (0° - 180°):</span>
                  <span className="font-mono text-amber-300 font-bold text-base">
                    {protractorAngle}° &nbsp;
                    <span className="text-xs font-sans text-stone-400">
                      ({protractorAngle === 90 ? 'Right Angle' : protractorAngle < 90 ? 'Acute Angle' : 'Obtuse Angle'})
                    </span>
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="180"
                  value={protractorAngle}
                  onChange={(e) => setProtractorAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex flex-col items-center justify-center">
                  <svg width="240" height="130" viewBox="0 0 240 130" className="overflow-visible">
                    {/* Semi-circular Protractor Arc */}
                    <path d="M 20 120 A 100 100 0 0 1 220 120 Z" fill="rgba(245, 158, 11, 0.08)" stroke="#78716c" strokeWidth="1.5" />
                    {/* Baseline */}
                    <line x1="20" y1="120" x2="220" y2="120" stroke="#a8a29e" strokeWidth="2" />
                    {/* Rotating Ray */}
                    <line 
                      x1="120" 
                      y1="120" 
                      x2={120 + 95 * Math.cos(-protractorAngle * Math.PI / 180)} 
                      y2={120 + 95 * Math.sin(-protractorAngle * Math.PI / 180)} 
                      stroke="#f59e0b" 
                      strokeWidth="3" 
                    />
                    <circle cx="120" cy="120" r="4" fill="#f59e0b" />
                  </svg>
                  <div className="flex gap-4 text-[11px] text-stone-400 mt-2">
                    <span>Complementary Angle: <strong className="text-white">{Math.max(0, 90 - protractorAngle)}°</strong></span>
                    <span>Supplementary Angle: <strong className="text-white">{180 - protractorAngle}°</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 13. Chemical Reaction Particle Simulator */}
          {feature.modeKey === 'chemical_reaction' && (
            <div className="space-y-4">
              <div className="flex gap-2 text-xs">
                {[
                  { id: 'h2o', title: '2H₂ + O₂ → 2H₂O (Water Formation)' },
                  { id: 'nacl', title: '2Na + Cl₂ → 2NaCl (Salt Synthesis)' },
                  { id: 'acid_base', title: 'HCl + NaOH → NaCl + H₂O (Neutralization)' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedReaction(item.id)}
                    className={`px-3.5 py-2 rounded-xl font-bold transition ${
                      selectedReaction === item.id ? 'bg-emerald-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-center font-mono text-base text-cyan-300 font-bold">
                  {selectedReaction === 'h2o' && '2H₂ (g) + O₂ (g)  →  2H₂O (l) + ΔH (-285.8 kJ/mol)'}
                  {selectedReaction === 'nacl' && '2Na (s) + Cl₂ (g)  →  2NaCl (s) + Heat & Light'}
                  {selectedReaction === 'acid_base' && 'HCl (aq) + NaOH (aq)  →  NaCl (aq) + H₂O (l)'}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReactionPlaying(true);
                      davAudio?.playChime?.('click');
                      setTimeout(() => setIsReactionPlaying(false), 1400);
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-lg"
                  >
                    <Atom className={`w-4 h-4 ${isReactionPlaying ? 'animate-spin' : ''}`} />
                    <span>{isReactionPlaying ? 'Electron Exchange & Bond Formation...' : 'Simulate Molecular Reaction'}</span>
                  </button>
                </div>

                <p className="text-stone-400 text-[11px] text-center">
                  {selectedReaction === 'h2o' && 'Exothermic reaction: Covalent bonds form between hydrogen and oxygen with the release of heat energy.'}
                  {selectedReaction === 'nacl' && 'Ionic bonding: Sodium transfers its 1 valence electron to chlorine, forming Na⁺ and Cl⁻ lattice crystals.'}
                  {selectedReaction === 'acid_base' && 'Neutralization: H⁺ ions from acid combine with OH⁻ ions from base to form neutral water molecules.'}
                </p>
              </div>
            </div>
          )}

          {/* 14. Graph Paper Auto-Corrector */}
          {feature.modeKey === 'graph_paper_checker' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400">Select Target Linear Equation:</span>
                <select
                  value={targetEquation}
                  onChange={(e) => setTargetEquation(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
                >
                  <option value="y_2x">y = 2x (Slope m = 2, Origin Pass)</option>
                  <option value="y_x_plus_2">y = x + 2 (Slope m = 1, y-intercept 2)</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-white text-sm">Plotted Coordinates Checklist:</span>
                <div className="grid grid-cols-3 gap-2">
                  {userPoints.map((pt, i) => {
                    const expectedY = targetEquation === 'y_2x' ? 2 * pt.x : pt.x + 2;
                    const isCorrect = pt.y === expectedY;
                    return (
                      <div key={i} className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center">
                        <span className="text-[10px] text-stone-500 block">Point #{i+1}</span>
                        <span className="font-bold text-white font-mono text-sm">({pt.x}, {pt.y})</span>
                        <span className={`text-[10px] block font-bold mt-1 ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isCorrect ? '✓ Exact on Line' : `✗ Error (Expected y=${expectedY})`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 15. Sanskrit Shloka Lipsync Visualizer */}
          {feature.modeKey === 'shloka_lipsync' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 text-sm">Vedic Swara Pitch Contour:</span>
                  <span className="font-mono text-emerald-400 font-bold">{pitchAccuracy}% Meter Match</span>
                </div>

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-2">
                  <p className="font-serif text-base sm:text-lg text-amber-300 font-bold tracking-wide">
                    ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्
                  </p>
                  <span className="text-[11px] text-stone-400 font-sans block">
                    (Rigveda Mandala 3, Sukta 62, Verse 10)
                  </span>
                </div>

                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${pitchAccuracy}%` }} />
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakText('ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्', 'hi-IN');
                      setIsChantingPlaying(true);
                      setTimeout(() => setIsChantingPlaying(false), 6000);
                    }}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isChantingPlaying ? 'Chanting in Sanskrit...' : 'Listen to Native Chanting'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 16. Posture & Ergonomic Guard */}
          {feature.modeKey === 'posture_guard' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Front Camera Distance Sensor:</span>
                  <span className={`font-black text-sm ${postureDistance < 25 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {postureDistance} cm ({postureDistance < 25 ? 'Too Close!' : 'Ergonomically Safe'})
                  </span>
                </div>

                <input
                  type="range"
                  min="15"
                  max="50"
                  value={postureDistance}
                  onChange={(e) => setPostureDistance(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center">
                    <Eye className={`w-8 h-8 ${postureDistance < 25 ? 'text-rose-400 animate-bounce' : 'text-emerald-400'}`} />
                  </div>
                  <p className="text-stone-300 text-xs">
                    {postureDistance < 25 
                      ? '⚠️ Warning: Distance < 25 cm causes digital eye fatigue and forward head posture! Move your screen back.'
                      : '✓ Excellent reading posture! Keep your eyes at least 35-40 cm from your display.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 17. Batch Sheet Scanner */}
          {feature.modeKey === 'batch_sheet_scanner' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white text-sm">Teacher Optical Answer Sheet Scanner:</span>
                  <span className="text-amber-400 font-bold">Class 8-A Terminal Exam</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBatchScanning(true);
                      setTimeout(() => {
                        setIsBatchScanning(false);
                        setBatchResults([
                          { roll: 1, name: 'Aarav Sharma', score: '48/50', grade: 'A+' },
                          { roll: 2, name: 'Ananya Verma', score: '46/50', grade: 'A+' },
                          { roll: 3, name: 'Rishit Shankar', score: '50/50', grade: 'A+ (Top)' },
                          { roll: 4, name: 'Priya Singh', score: '44/50', grade: 'A' }
                        ]);
                        davAudio?.playChime?.('success');
                      }, 900);
                    }}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs transition"
                  >
                    {isBatchScanning ? 'Processing 25 Sheets...' : 'Run 25-Sheet Optical Scan'}
                  </button>
                  <span className="text-stone-400">Speed: ~40 sheets in 30 seconds</span>
                </div>

                {batchResults.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="font-bold text-white">Scanned Marksheet Results:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      {batchResults.map(r => (
                        <div key={r.roll} className="p-2.5 bg-stone-950 rounded-xl border border-stone-800">
                          <span className="text-[10px] text-stone-400 block">Roll #{r.roll}</span>
                          <span className="font-bold text-white block">{r.name}</span>
                          <span className="text-xs font-bold text-emerald-400 block mt-0.5">{r.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 18. Map-Skill Geography Matcher */}
          {feature.modeKey === 'map_skill_matcher' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400 text-sm">Target Geographical Landmark:</span>
                  <select
                    value={mapTargetItem}
                    onChange={(e) => {
                      setMapTargetItem(e.target.value);
                      setMapDistanceError(e.target.value === 'Bhakra Nangal Dam' ? 12 : e.target.value === 'Jharia Coalfield' ? 8 : 18);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 text-xs text-white"
                  >
                    <option value="Bhakra Nangal Dam">Bhakra Nangal Dam (Himachal / Punjab)</option>
                    <option value="Jharia Coalfield">Jharia Coalfield (Jharkhand)</option>
                    <option value="Mumbai Port">Mumbai Port (Maharashtra)</option>
                  </select>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-stone-400 text-[10px] block">Spatial Distance Precision:</span>
                    <span className="font-bold text-emerald-400 text-sm">✓ Within {mapDistanceError} km of true coordinate</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                    Accuracy: 98% (5/5 Marks)
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 19. Vedic Audio Chanting Master */}
          {feature.modeKey === 'vedic_chant_pitch' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex gap-2">
                  {['gayatri', 'shanti', 'mahamrityunjaya'].map(chant => (
                    <button
                      key={chant}
                      type="button"
                      onClick={() => setActiveVedicChant(chant)}
                      className={`px-3 py-1.5 rounded-xl font-bold capitalize transition ${
                        activeVedicChant === chant ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {chant} Mantra
                    </button>
                  ))}
                </div>

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 text-center space-y-2">
                  <p className="font-serif text-lg text-amber-300 font-bold">
                    {activeVedicChant === 'gayatri' && 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्'}
                    {activeVedicChant === 'shanti' && 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः'}
                    {activeVedicChant === 'mahamrityunjaya' && 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्'}
                  </p>
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      const text = activeVedicChant === 'gayatri' 
                        ? 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्'
                        : 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः';
                      speakText(text, 'hi-IN');
                      setIsVedicPlaying(true);
                      setTimeout(() => setIsVedicPlaying(false), 5000);
                    }}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isVedicPlaying ? 'Chanting in Sanskrit...' : 'Play Authenticated Vedic Chanting'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 20. Podcast Studio */}
          {feature.modeKey === 'podcast_studio' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400 text-sm">DAV Chapter Podcast Episode:</span>
                  <span className="text-stone-400 text-[11px]">Duration: 8 Minutes</span>
                </div>

                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Episode 14: Microorganisms Friend & Foe</span>
                    <button
                      type="button"
                      onClick={() => setIsPodcastPlaying(prev => !prev)}
                      className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                    >
                      {isPodcastPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPodcastPlaying ? 'Pause Episode' : 'Play Episode'}</span>
                    </button>
                  </div>
                  <p className="text-stone-300 text-xs italic">
                    Rishi: "Welcome back Ananya! Today we discuss how Alexander Fleming discovered penicillin in 1929..."
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 21. Hands-Free Voice Assistant */}
          {feature.modeKey === 'handsfree_voice' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400 text-sm">Hands-Free Lab Voice Assistant:</span>
                  <span className="text-emerald-400 font-bold">● Mic Ready</span>
                </div>

                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <div>
                    <span className="text-[10px] text-stone-500 block uppercase">Spoken Command:</span>
                    <span className="font-bold text-white text-sm">"{lastVoiceCmd}"</span>
                  </div>
                  <div className="pt-1 border-t border-stone-800">
                    <span className="text-[10px] text-stone-500 block uppercase">Assistant Speech Reply:</span>
                    <span className="text-emerald-400 text-xs font-medium">{voiceReply}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLastVoiceCmd('Formula for Kinetic Energy');
                      setVoiceReply('Kinetic Energy = 1/2 m v² (half mass times velocity squared).');
                      speakText('Kinetic Energy equals one half mass times velocity squared.');
                    }}
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold"
                  >
                    Simulate: "Ask KE Formula"
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLastVoiceCmd('Start 30-second Titration timer');
                      setVoiceReply('30-second timer started for chemical titration.');
                      speakText('30-second timer started.');
                    }}
                    className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-bold"
                  >
                    Simulate: "Start Lab Timer"
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 22. Bionic Dyslexia Reader */}
          {feature.modeKey === 'dyslexia_reader' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 text-sm">Bionic Syllable Pacing:</span>
                  <span className="font-bold text-white">{dyslexiaWpm} Words / Min</span>
                </div>

                <input
                  type="range"
                  min="100"
                  max="300"
                  step="10"
                  value={dyslexiaWpm}
                  onChange={(e) => setDyslexiaWpm(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />

                <div className="p-5 bg-stone-950 rounded-2xl border border-stone-800 text-stone-200 text-sm sm:text-base leading-relaxed">
                  <span className="font-black text-amber-300">Pho</span>tosynthesis is the <span className="font-black text-amber-300">pro</span>cess by which <span className="font-black text-amber-300">gre</span>en plants <span className="font-black text-amber-300">syn</span>thesize <span className="font-black text-amber-300">nut</span>rients from <span className="font-black text-amber-300">car</span>bon dioxide and <span className="font-black text-amber-300">wa</span>ter using <span className="font-black text-amber-300">sun</span>light and <span className="font-black text-amber-300">chlo</span>rophyll.
                </div>
              </div>
            </div>
          )}

          {/* 23. Parent WhatsApp Daily Audio Briefing */}
          {feature.modeKey === 'parent_audio_brief' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-emerald-400 text-sm">Parent Daily WhatsApp Dispatch:</span>

                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <span className="text-[10px] text-stone-400 block uppercase">Target Student: {selectedParentStudent}</span>
                  <p className="text-white text-xs">
                    "Namaste! Today Rishit completed Chapter 3 Science test with 48/50. 2 Math problems are pending for tomorrow's class."
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      speakText('Namaste! Today Rishit completed Chapter 3 Science test with 48 out of 50.');
                      setIsParentAudioPlaying(true);
                      setTimeout(() => setIsParentAudioPlaying(false), 4000);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isParentAudioPlaying ? 'Playing Audio...' : 'Play 60s Voice Brief'}</span>
                  </button>
                  <a
                    href="https://wa.me/?text=Namaste%20Parent!%20DAV%20Daily%20Academic%20Digest%20for%20Rishit%20is%20ready."
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Send to Parent WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 24. Indian Voice Synthesizer */}
          {feature.modeKey === 'indian_voice_accent' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-amber-400 text-sm">Native Indian Dialects & Accent Engine:</span>

                <div className="grid grid-cols-3 gap-2">
                  {['en-IN', 'hi-IN', 'sanskrit'].map(acc => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setSelectedAccent(acc)}
                      className={`p-2.5 rounded-xl border font-bold capitalize transition ${
                        selectedAccent === acc ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {acc === 'en-IN' ? 'Indian English' : acc === 'hi-IN' ? 'Shuddh Hindi' : 'Vedic Sanskrit'}
                    </button>
                  ))}
                </div>

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => speakText(testSpeechText, selectedAccent === 'sanskrit' ? 'hi-IN' : selectedAccent)}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Speak in {selectedAccent} Accent</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 25. Debate Speech Coach */}
          {feature.modeKey === 'debate_speech_coach' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-yellow-400 text-sm">DAV Declamation & Debate Analysis:</span>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-stone-950 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Cadence Pacing</span>
                    <span className="font-black text-white text-base">{debateWpm} WPM (Ideal)</span>
                  </div>
                  <div className="p-3 bg-stone-950 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Filler Words</span>
                    <span className="font-black text-emerald-400 text-base">{debateFillerCount} ("um", "like")</span>
                  </div>
                  <div className="p-3 bg-stone-950 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Confidence Score</span>
                    <span className="font-black text-yellow-300 text-base">{debateScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 26. Optics Raytracer */}
          {feature.modeKey === 'optics_raytracer' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400 text-sm">Convex Lens Ray-Tracing Workbench:</span>
                  <span className="text-white">Object Distance u: -{objectDistanceU} cm</span>
                </div>

                <input
                  type="range"
                  min="22"
                  max="60"
                  value={objectDistanceU}
                  onChange={(e) => setObjectDistanceU(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />

                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 text-stone-300 text-center font-mono text-xs">
                  1/f = 1/v - 1/u &nbsp;→&nbsp; Image Distance v = +{((focalLength * objectDistanceU) / (objectDistanceU - focalLength)).toFixed(1)} cm &nbsp; (Real & Inverted)
                </div>
              </div>
            </div>
          )}

          {/* 27. 3D Anatomy Organ */}
          {feature.modeKey === 'anatomy_3d_organ' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-400 text-sm">Dissectible Human Heart Anatomy:</span>
                  <span className="text-white font-mono">{heartBpm} BPM</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['left_ventricle', 'right_ventricle', 'left_atrium', 'aorta'].map(ch => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setSelectedChamber(ch)}
                      className={`p-2 rounded-xl border text-xs font-bold capitalize transition ${
                        selectedChamber === ch ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {ch.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-stone-950 rounded-xl text-stone-300 text-xs">
                  {selectedChamber === 'left_ventricle' && 'Left Ventricle: Thickest muscular wall, pumps oxygen-rich blood through the aortic valve to the entire body.'}
                  {selectedChamber === 'right_ventricle' && 'Right Ventricle: Pumps deoxygenated blood through the pulmonary valve to the lungs.'}
                  {selectedChamber === 'left_atrium' && 'Left Atrium: Receives oxygenated blood returning from the lungs via pulmonary veins.'}
                  {selectedChamber === 'aorta' && 'Aorta: The largest artery in the human body, distributes systemic arterial circulation.'}
                </div>
              </div>
            </div>
          )}

          {/* 28. Orbital Electron Cloud */}
          {feature.modeKey === 'orbital_electron_cloud' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-amber-400 text-sm">Bohr Atomic Model (2n² Shell Capacity):</span>
                <div className="flex gap-2">
                  {['Na', 'C', 'O', 'Cl'].map(el => (
                    <button
                      key={el}
                      type="button"
                      onClick={() => setSelectedElement(el)}
                      className={`px-4 py-1.5 rounded-xl font-bold transition ${
                        selectedElement === el ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {el === 'Na' ? 'Sodium (Na)' : el === 'C' ? 'Carbon (C)' : el === 'O' ? 'Oxygen (O)' : 'Chlorine (Cl)'}
                    </button>
                  ))}
                </div>

                <div className="p-4 bg-stone-950 rounded-xl text-center font-mono text-cyan-300 text-xs">
                  {selectedElement === 'Na' && 'Sodium (Z = 11): K: 2 | L: 8 | M: 1 (Valence = 1)'}
                  {selectedElement === 'C' && 'Carbon (Z = 6): K: 2 | L: 4 (Tetravalent)'}
                  {selectedElement === 'O' && 'Oxygen (Z = 8): K: 2 | L: 6 (Valence = 2)'}
                  {selectedElement === 'Cl' && 'Chlorine (Z = 17): K: 2 | L: 8 | M: 7 (Valence = 1)'}
                </div>
              </div>
            </div>
          )}

          {/* 29. Kepler Solar Gravity Orbit */}
          {feature.modeKey === 'solar_gravity_orbit' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-yellow-400 text-sm">Orbital Velocity & Escape Dynamics:</span>
                  <span className="font-mono text-white">{orbitalVelocityV} km/s</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  step="0.5"
                  value={orbitalVelocityV}
                  onChange={(e) => setOrbitalVelocityV(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                />
                <p className="text-stone-300 text-xs">
                  At 29.8 km/s Earth balances the Sun's gravitational pull into a stable, nearly circular elliptical orbit. Velocities &gt; 42.1 km/s lead to hyperbolic escape trajectories.
                </p>
              </div>
            </div>
          )}

          {/* 30. Circuit Breadboard */}
          {feature.modeKey === 'circuit_breadboard' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 text-sm">Ohm's Law Circuit (I = V / R):</span>
                  <span className={isCircuitFuseBlown ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {isCircuitFuseBlown ? 'FUSE BLOWN!' : `Current: ${(circuitVoltage / circuitResistance).toFixed(3)} A`}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCircuitSwitchClosed(prev => !prev)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs"
                  >
                    Toggle Switch {isCircuitSwitchClosed ? '(ON)' : '(OFF)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCircuitFuseBlown(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs"
                  >
                    Simulate Short Circuit
                  </button>
                  {isCircuitFuseBlown && (
                    <button
                      type="button"
                      onClick={() => setIsCircuitFuseBlown(false)}
                      className="px-3 py-1 bg-stone-800 text-stone-300 rounded-lg text-xs"
                    >
                      Reset Fuse
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 31. 3D Vedic History Museum */}
          {feature.modeKey === 'vedic_history_museum' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-amber-400 text-sm">Ancient Archaeological Relics Gallery:</span>
                <div className="grid grid-cols-3 gap-2">
                  {['pashupati', 'great_bath', 'vedic_altar'].map(art => (
                    <button
                      key={art}
                      type="button"
                      onClick={() => setActiveMuseumArtifact(art)}
                      className={`p-2.5 rounded-xl border font-bold capitalize transition ${
                        activeMuseumArtifact === art ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {art.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-stone-950 rounded-xl text-stone-300 text-xs">
                  {activeMuseumArtifact === 'pashupati' && 'Pashupati Seal (2500 BCE): Steatite seal excavated at Mohenjo-daro depicting a three-faced horned deity seated in yogic posture.'}
                  {activeMuseumArtifact === 'great_bath' && 'The Great Bath: Waterproofed with bitumen mortar, indicating advanced public sanitation and ritual purification.'}
                  {activeMuseumArtifact === 'vedic_altar' && 'Vedic Fire Altar: Geometric brick geometry following Sulba Sutras for sacred Hawan ceremonies.'}
                </div>
              </div>
            </div>
          )}

          {/* 32. Tectonic Sandbox */}
          {feature.modeKey === 'tectonic_sandbox' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400 text-sm">Indian-Eurasian Plate Uplift:</span>
                  <span className="text-white">{convergenceRate} mm / year</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={convergenceRate}
                  onChange={(e) => setConvergenceRate(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <p className="text-stone-300 text-xs">
                  Continual northward drift of the Indian plate into the Eurasian plate folds sedimentary rocks of the Tethys geosyncline, uplifting Mount Everest at ~5 mm annually.
                </p>
              </div>
            </div>
          )}

          {/* 33. Dual-Camera Proctor */}
          {feature.modeKey === 'dual_camera_proctor' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-rose-400 text-sm">Dual-Camera Proctoring Grid:</span>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Camera 1 (Gaze Monitor)</span>
                    <span className="font-bold text-emerald-400 block mt-1">{gazeStatus}</span>
                  </div>
                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Camera 2 (Mobile 45° Room Angle)</span>
                    <span className="font-bold text-emerald-400 block mt-1">{roomPerimeterStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 34. Audio Frequency Whisper */}
          {feature.modeKey === 'audio_frequency_whisper' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400 text-sm">Audio Decibel Spectrum:</span>
                  <span className="font-mono text-white">{ambientDb} dB</span>
                </div>
                <div className="p-4 bg-stone-950 rounded-xl text-center text-emerald-400 font-bold">
                  Classification: {detectedNoiseType}
                </div>
              </div>
            </div>
          )}

          {/* 35. Plagiarism AI Detector */}
          {feature.modeKey === 'plagiarism_ai_detector' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-cyan-400 text-sm">Perplexity & Burstiness Analysis:</span>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${humanProbScore}%` }} />
                </div>
                <span className="font-bold text-emerald-400 block text-center">
                  Human-Authored Probability: {humanProbScore}% (Original Student Work)
                </span>
              </div>
            </div>
          )}

          {/* 36. Dynamic Rotating QR Hall Ticket */}
          {feature.modeKey === 'rotating_qr_hallticket' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs text-center">
                <span className="font-bold text-amber-400 text-sm">Dynamic HMAC Admit Card Token:</span>
                <div className="p-4 bg-stone-950 rounded-2xl border border-stone-800 max-w-xs mx-auto">
                  <div className="w-28 h-28 mx-auto bg-stone-800 rounded-lg flex items-center justify-center font-mono text-xs text-amber-300">
                    [HMAC-QR]
                  </div>
                  <span className="text-white font-mono block mt-2">{hallTicketToken}</span>
                  <span className="text-[10px] text-stone-400 block">Rotating in: {qrCountdown}s</span>
                </div>
              </div>
            </div>
          )}

          {/* 37. Face Attendance Logger */}
          {feature.modeKey === 'face_attendance_logger' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-emerald-400 text-sm">Edge Biometric Classroom Roll-Call:</span>
                <div className="p-4 bg-stone-950 rounded-xl text-center font-mono text-emerald-400">
                  {scannedFacesCount}/45 Students Checked In • 3.4 seconds execution
                </div>
              </div>
            </div>
          )}

          {/* 38. ZK Grade Vault */}
          {feature.modeKey === 'zk_grade_vault' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-purple-400 text-sm">Cryptographic Grade Immutability:</span>
                <div className="p-3 bg-stone-950 rounded-xl font-mono text-[11px] text-stone-400 break-all text-center">
                  {gradeZkHash}
                </div>
                <span className="text-emerald-400 font-bold block text-center">
                  ✓ Verified Tamper-Proof on Ledger
                </span>
              </div>
            </div>
          )}

          {/* 39. Smart Bus Telemetry */}
          {feature.modeKey === 'smart_bus_telemetry' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400 text-sm">Live Bus GPS Telemetry:</span>
                  <span className="font-bold text-amber-400">ETA: {busEtaMinutes} Minutes</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-stone-950 rounded-xl"><span className="text-[10px] text-stone-400 block">Speed</span><span className="font-bold text-white">{busSpeed} km/h</span></div>
                  <div className="p-2.5 bg-stone-950 rounded-xl"><span className="text-[10px] text-stone-400 block">Current Stop</span><span className="font-bold text-white">{busCurrentStop}</span></div>
                  <div className="p-2.5 bg-stone-950 rounded-xl"><span className="text-[10px] text-stone-400 block">Status</span><span className="font-bold text-emerald-400">On Time</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 40. Smartboard Sync */}
          {feature.modeKey === 'smartboard_sync' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-cyan-400 text-sm">Teacher to Student Screen Broadcast (&lt; 35ms):</span>
                <div className="h-28 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-center font-mono text-cyan-300">
                  [Live Mirrored Whiteboard Stroke Sync Active]
                </div>
              </div>
            </div>
          )}

          {/* 41. RFID Library */}
          {feature.modeKey === 'rfid_library_checkout' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-amber-400 text-sm">Library Self-Checkout Desk:</span>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">{selectedLibraryBook}</span>
                    <span className="text-stone-400 text-[10px]">Due Date: {loanDueDate}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsBookLoaned(true); davAudio?.playChime?.('success'); }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold"
                  >
                    {isBookLoaned ? '✓ Loan Approved' : 'Scan & Checkout'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 42. Classroom Clicker */}
          {feature.modeKey === 'classroom_clicker_poll' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-purple-400 text-sm">Live 10-Second Poll Clicker:</span>
                <p className="font-bold text-white text-sm">{clickerQuestion}</p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {Object.entries(clickerVotes).map(([opt, cnt]) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setUserClickedOption(opt);
                        setClickerVotes(prev => ({ ...prev, [opt]: prev[opt] + 1 }));
                        davAudio?.playChime?.('click');
                      }}
                      className={`p-3 rounded-xl border transition ${
                        userClickedOption === opt ? 'bg-purple-600 text-white font-bold' : 'bg-stone-950 border-stone-800 text-stone-300'
                      }`}
                    >
                      <span className="font-black text-amber-400 block text-base">{opt}</span>
                      <span className="text-xs">{cnt} votes</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 43. School Bell Automation */}
          {feature.modeKey === 'school_bell_automation' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400 text-sm">Automated Campus Chime:</span>
                  <span className="text-white">Active: Period #{activePeriodNumber}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-stone-950 rounded-xl border border-stone-800">
                  <span>Next Bell: <strong className="text-amber-300">{bellNextTime}</strong></span>
                  <button
                    type="button"
                    onClick={handlePlayPeriodBell}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center gap-1.5"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Play Period Chime</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 44. P2P Offline Sync */}
          {feature.modeKey === 'p2p_offline_sync' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-blue-400 text-sm">Zero-Data Mesh Shared Offline Cache:</span>
                <div className="space-y-2">
                  {offlineSyncedChapters.map(ch => (
                    <div key={ch.name} className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                      <span className="text-white">{ch.name}</span>
                      <span className="text-emerald-400 font-bold">✓ Ready Offline ({ch.size})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 45. Inter-DAV Arena */}
          {feature.modeKey === 'inter_dav_arena' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-yellow-400 text-sm">Live Inter-House Arena Standings:</span>
                  <span className="text-amber-400 font-bold">Your House: {userHouse}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {Object.entries(houseScores).map(([h, pts]) => (
                    <div key={h} className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                      <span className="text-[10px] text-stone-400 block">{h} House</span>
                      <span className="text-base font-black text-amber-300">{pts} XP</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-center space-y-2">
                  <span className="font-bold text-white block">Speed Arena Challenge: What is the valency of Carbon?</span>
                  <div className="flex justify-center gap-2">
                    <button onClick={() => handleHouseAnswer(false)} className="px-4 py-1.5 bg-stone-800 text-stone-300 rounded-lg">2</button>
                    <button onClick={() => handleHouseAnswer(true)} className="px-4 py-1.5 bg-amber-500 text-stone-950 font-bold rounded-lg">4 (Tetravalent)</button>
                    <button onClick={() => handleHouseAnswer(false)} className="px-4 py-1.5 bg-stone-800 text-stone-300 rounded-lg">6</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 46. Blockchain Skill Badge */}
          {feature.modeKey === 'blockchain_badge_mint' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs text-center">
                <span className="font-bold text-amber-400 text-sm">Cryptographic Credential Mint:</span>
                <div className="p-5 bg-stone-950 rounded-2xl border border-amber-500/40 max-w-xs mx-auto space-y-2">
                  <Award className="w-12 h-12 text-amber-400 mx-auto" />
                  <span className="font-bold text-white block text-sm">DAV Science Excellence 2026</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Issued to: {badgeRecipient}</span>
                  <button
                    type="button"
                    onClick={() => { setIsBadgeMinted(true); davAudio?.playChime?.('success'); }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-xl text-xs"
                  >
                    {isBadgeMinted ? '✓ Credential Minted' : 'Mint Credential to Profile'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 47. Career Stream Predictor */}
          {feature.modeKey === 'career_stream_predictor' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-cyan-400 text-sm">Class 8-10 Stream Recommendation:</span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-stone-950 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] text-stone-400 block">Science (PCM/PCB)</span>
                    <span className="text-base font-bold text-cyan-300">72% Match</span>
                  </div>
                  <div className="p-3 bg-stone-950 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Commerce</span>
                    <span className="text-base font-bold text-white">18% Match</span>
                  </div>
                  <div className="p-3 bg-stone-950 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Humanities</span>
                    <span className="text-base font-bold text-white">10% Match</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 48. Peer Study-Buddy Matcher */}
          {feature.modeKey === 'study_buddy_match' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-rose-400 text-sm">Peer Mentorship Matchmaker:</span>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <span className="font-bold text-white block text-sm">{matchedPeer.name}</span>
                  <span className="text-emerald-400 block">Offers Strength in: {matchedPeer.strength}</span>
                  <span className="text-amber-400 block">Seeking Help with: {matchedPeer.needs}</span>
                </div>
              </div>
            </div>
          )}

          {/* 49. Virtual DAV Metaverse Quad */}
          {feature.modeKey === 'metaverse_campus_quad' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <span className="font-bold text-emerald-400 text-sm">Virtual 3D DAV Campus Quad (Muzaffarpur):</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Vedic Assembly Ground', 'Central Library', 'Robotics Science Lab', 'Sports Complex'].map(z => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setActiveMetaverseZone(z)}
                      className={`p-2.5 rounded-xl border font-bold text-xs transition ${
                        activeMetaverseZone === z ? 'bg-emerald-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-stone-950 rounded-xl text-center text-stone-300">
                  Active in: <strong className="text-white">{activeMetaverseZone}</strong> • 14 classmates active
                </div>
              </div>
            </div>
          )}

          {/* 50. Vedic Karmic Points & Tree Tracker */}
          {feature.modeKey === 'karmic_points_tracker' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400 text-sm">Dharma & Seva Community Tracker:</span>
                  <span className="font-black text-emerald-300 text-base">🍃 {karmicLeafCount} Karmic Leaves</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setKarmicLeafCount(prev => prev + 15);
                      setRecentSevaLog(prev => ['Planted medicinal Neem tree (+15 🍃)', ...prev]);
                      davAudio?.playChime?.('success');
                    }}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                  >
                    + Log Tree Plantation (+15 🍃)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setKarmicLeafCount(prev => prev + 10);
                      setRecentSevaLog(prev => ['Tutored peer on Class 7 Integers (+10 🍃)', ...prev]);
                      davAudio?.playChime?.('success');
                    }}
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs"
                  >
                    + Log Peer Tutoring (+10 🍃)
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-stone-400 text-[10px] uppercase">Recent Seva Ledger:</span>
                  {recentSevaLog.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-stone-950 rounded-xl text-stone-300 text-xs">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Controls */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/90 flex items-center justify-between text-xs text-stone-400">
          <span>Target: <strong className="text-white">{feature.targetAudience}</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-bold transition"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
}
