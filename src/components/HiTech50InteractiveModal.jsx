import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Sparkles, Check, Flame, Trophy, Play, Pause, Volume2, 
  RotateCcw, Copy, ExternalLink, Search, Sliders, Calculator, 
  Atom, Bus, BookOpen, Layers, ShieldCheck, Heart, Clock, 
  Send, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Eye,
  Award, Lock, Compass, BarChart3, CheckSquare, Zap, User, 
  ArrowRight, ArrowLeft, Monitor, Smartphone, MessageSquare
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

  // 1. Socratic Tutor State
  const [socraticQuestion, setSocraticQuestion] = useState('Why does ice float on water?');
  const [socraticHistory, setSocraticHistory] = useState([
    { sender: 'student', text: 'Why does ice float on water?' },
    { sender: 'ai', text: 'Namaste! Before we look at water, think about density: when a substance freezes into a solid, does it usually contract or expand?' },
    { sender: 'student', text: 'Usually substances contract and become heavier.' },
    { sender: 'ai', text: 'Exact observation! But water has anomalous expansion below 4°C forming a cage-like hydrogen-bonded crystal lattice. What do you think happens to its volume and density?' }
  ]);
  const [socraticInput, setSocraticInput] = useState('');

  // 2. Leitner Curve State
  const [leitnerBox, setLeitnerBox] = useState(1);
  const [retentionPct, setRetentionPct] = useState(88);

  // 3. Theorem Derivator State
  const [selectedTheorem, setSelectedTheorem] = useState('pythagoras');

  // 4. Cognitive Load State
  const [scrollInterval, setScrollInterval] = useState(320);
  const [fatigueIndex, setFatigueIndex] = useState(24);

  // 5. Question Predictor State
  const [predictSubject, setPredictSubject] = useState('Science');
  const [predictClass, setPredictClass] = useState('8');

  // 6. Mind-Map State
  const [activeMindNode, setActiveMindNode] = useState('Acids, Bases & Salts');

  // 7. Hindi-English Transliteration State
  const [bilingualTerm, setBilingualTerm] = useState('प्रकाश संश्लेषण');

  // 8. Persona Engine State
  const [selectedPersona, setSelectedPersona] = useState('acharya');

  // 9. Essay Evaluator State
  const [essayText, setEssayText] = useState('Mahatma Gandhi led India to freedom through Ahimsa and Satyagraha. His leadership inspired millions of common people to unite for the independence struggle.');
  const [essayScore, setEssayScore] = useState(null);

  // 10. Prereq Graph State
  const [activePrereq, setActivePrereq] = useState('Linear Equations');

  // 11. Handwritten OCR State
  const [ocrStatus, setOcrStatus] = useState('idle');

  // 12. Geometry Protractor State
  const [protractorAngle, setProtractorAngle] = useState(60);

  // 13. Chemical Reaction State
  const [reactionType, setReactionType] = useState('h2o');
  const [isReacting, setIsReacting] = useState(false);

  // 14. Graph Paper State
  const [graphPoints, setGraphPoints] = useState([{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }]);

  // 15. Shloka Lipsync State
  const [pitchAccuracy, setPitchAccuracy] = useState(94);

  // 16. Posture Guard State
  const [postureDistance, setPostureDistance] = useState(35);

  // 17. Batch Sheet Scanner State
  const [scannedSheets, setScannedSheets] = useState(40);
  const [isScanningBatch, setIsScanningBatch] = useState(false);

  // 18. Map-Skill State
  const [mapTarget, setMapTarget] = useState('Bhakra Nangal Dam');
  const [mapDistanceError, setMapDistanceError] = useState(12);

  // 19. Vedic Audio Chanting State
  const [isChanting, setIsChanting] = useState(false);

  // 20. Podcast Studio State
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);

  // 21. Hands-Free Voice Assistant State
  const [lastVoiceCmd, setLastVoiceCmd] = useState('Formula for Kinetic Energy');

  // 22. Dyslexia Reader State
  const [dyslexiaWpm, setDyslexiaWpm] = useState(160);

  // 23. Parent Audio Briefing State
  const [isParentAudioPlaying, setIsParentAudioPlaying] = useState(false);

  // 24. Indian Voice Synthesizer State
  const [selectedVoiceAccent, setSelectedVoiceAccent] = useState('indian_english');

  // 25. Debate Speech Coach State
  const [speechWpm, setSpeechWpm] = useState(142);
  const [fillerWordCount, setFillerWordCount] = useState(2);

  // 26. Optics Raytracer State
  const [objectDistance, setObjectDistance] = useState(30);

  // 27. 3D Anatomy State
  const [heartLayer, setHeartLayer] = useState('all');

  // 28. Orbital Electron State
  const [orbitalElement, setOrbitalElement] = useState('Sodium (Na)');

  // 29. Solar Gravity Orbit State
  const [orbitalVelocity, setOrbitalVelocity] = useState(29.8);

  // 30. Circuit Breadboard State
  const [isCircuitClosed, setIsCircuitClosed] = useState(false);
  const [isCircuitBlown, setIsCircuitBlown] = useState(false);

  // 31. Vedic History Museum State
  const [activeArtifact, setActiveArtifact] = useState('Pashupati Seal');

  // 32. Tectonic Sandbox State
  const [plateConvergence, setPlateConvergence] = useState(45);

  // 33. Dual-Camera Proctor State
  const [proctorIntegrity, setProctorIntegrity] = useState(99);

  // 34. Audio Frequency Classifier State
  const [ambientDecibel, setAmbientDecibel] = useState(38);

  // 35. Plagiarism AI Detector State
  const [aiProbability, setAiProbability] = useState(4);

  // 36. Dynamic QR Hallticket State
  const [qrCountdown, setQrCountdown] = useState(28);

  // 37. Face Attendance State
  const [faceCount, setFaceCount] = useState(45);

  // 38. ZK Grade Vault State
  const [zkHash, setZkHash] = useState('sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  // 39. Smart Bus Telemetry State
  const [busEtaMinutes, setBusEtaMinutes] = useState(6);

  // 40. Smartboard Sync State
  const [isBoardSynced, setIsBoardSynced] = useState(true);

  // 41. RFID Library State
  const [borrowedBook, setBorrowedBook] = useState('DAV Science Explorer Class 8');

  // 42. Classroom Clicker State
  const [clickerVotes, setClickerVotes] = useState({ A: 14, B: 28, C: 6, D: 2 });

  // 43. School Bell State
  const [currentPeriod, setCurrentPeriod] = useState(4);

  // 44. P2P Offline Sync State
  const [syncedPdfs, setSyncedPdfs] = useState(['Science_Ch3.pdf', 'Math_Ch5.pdf', 'Sanskrit_Ch2.pdf']);

  // 45. Inter-DAV Arena State
  const [arenaScores, setArenaScores] = useState({
    Dayanand: 1450,
    Hansraj: 1420,
    Ashoka: 1390,
    Tagore: 1360
  });

  // 46. Blockchain Skill Badge State
  const [badgeMinted, setBadgeMinted] = useState(false);

  // 47. Career Stream Predictor State
  const [streamMatch, setStreamMatch] = useState({ Science: 68, Commerce: 22, Humanities: 10 });

  // 48. Study-Buddy Match State
  const [matchedBuddy, setMatchedBuddy] = useState({ name: 'Aarav Sharma (Class 8-A)', strong: 'Hindi & SST', needs: 'Mathematics' });

  // 49. Metaverse Campus Quad State
  const [activeCampusZone, setActiveCampusZone] = useState('Vedic Assembly Ground');

  // 50. Karmic Points State
  const [karmicLeaves, setKarmicLeaves] = useState(148);

  // Countdown timer for QR Hallticket
  useEffect(() => {
    let t = setInterval(() => {
      setQrCountdown(prev => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleSendSocratic = () => {
    if (!socraticInput.trim()) return;
    const userMsg = socraticInput.trim();
    setSocraticHistory(prev => [
      ...prev,
      { sender: 'student', text: userMsg },
      { sender: 'ai', text: `Thought-provoking step! Now relate that to Archimedes Principle: when buoyant upward thrust equals displaced water weight, what must the density ratio be?` }
    ]);
    setSocraticInput('');
    davAudio?.playChime?.('click');
  };

  const handleSpeakVedicChant = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isChanting) {
        window.speechSynthesis.cancel();
        setIsChanting(false);
      } else {
        const utterance = new SpeechSynthesisUtterance('ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्');
        utterance.lang = 'hi-IN';
        utterance.rate = 0.85;
        utterance.onend = () => setIsChanting(false);
        utterance.onerror = () => setIsChanting(false);
        setIsChanting(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsChanting(prev => !prev);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-stone-950 border border-amber-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100 font-sans">
        
        {/* Modal Top Header Bar */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-900/80 flex items-center justify-between gap-3 select-none">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-sm flex items-center justify-center">
              #{feature.id}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {feature.badge}
                </span>
                <span className="text-[10px] font-medium text-stone-400">
                  {feature.tag}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-[280px] sm:max-w-md">
                {feature.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Previous & Next Fast Nav */}
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

        {/* Modal Description Ribbon */}
        <div className="px-5 py-3 bg-stone-900/40 border-b border-stone-800/80 flex items-start gap-3 text-xs text-stone-300 leading-relaxed">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>{feature.description}</p>
        </div>

        {/* ========================================================================= */}
        {/* WORKABLE INTERACTIVE SIMULATION WORKBENCH (FEATURES 1 TO 50)              */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* 1. Socratic Neuro-Tutor */}
          {feature.modeKey === 'socratic_tutor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-purple-300">
                  <span>🧠 Guided Socratic Inquiry Thread</span>
                  <span className="text-[10px] text-stone-400">CBSE/DAV Class 8 Science • Density & Fluids</span>
                </div>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
                  {socraticHistory.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl max-w-[85%] ${
                        item.sender === 'student' 
                          ? 'ml-auto bg-purple-600 text-white' 
                          : 'bg-stone-800/90 border border-stone-700 text-stone-200'
                      }`}
                    >
                      <span className="font-bold block text-[10px] opacity-75 mb-0.5">
                        {item.sender === 'student' ? 'Student' : 'Vedic Socratic AI'}
                      </span>
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={socraticInput}
                    onChange={(e) => setSocraticInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendSocratic()}
                    placeholder="Type your derivation hypothesis..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-stone-800 border border-stone-700 text-white focus:outline-none focus:border-purple-400"
                  />
                  <button
                    type="button"
                    onClick={handleSendSocratic}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Leitner Spaced Repetition */}
          {feature.modeKey === 'leitner_curve' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-400">Leitner 3-Tier Spaced Repetition</span>
                  <span className="text-stone-400">Current Retention: {retentionPct}%</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div 
                    onClick={() => { setLeitnerBox(1); setRetentionPct(65); }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${leitnerBox === 1 ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-stone-800/60 border-stone-700 text-stone-400'}`}
                  >
                    <span className="font-black text-sm block">Box 1 (Daily)</span>
                    <span className="text-[10px]">12 Flashcards</span>
                  </div>
                  <div 
                    onClick={() => { setLeitnerBox(2); setRetentionPct(88); }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${leitnerBox === 2 ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-stone-800/60 border-stone-700 text-stone-400'}`}
                  >
                    <span className="font-black text-sm block">Box 2 (3 Days)</span>
                    <span className="text-[10px]">28 Flashcards</span>
                  </div>
                  <div 
                    onClick={() => { setLeitnerBox(3); setRetentionPct(98); }}
                    className={`p-3 rounded-xl border cursor-pointer transition ${leitnerBox === 3 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-stone-800/60 border-stone-700 text-stone-400'}`}
                  >
                    <span className="font-black text-sm block">Box 3 (Weekly)</span>
                    <span className="text-[10px]">54 Mastered</span>
                  </div>
                </div>
                <div className="p-3 bg-stone-800/50 rounded-xl text-xs text-stone-300">
                  <span className="font-bold text-white">Active Flashcard:</span> "Define Sublimation with Ammonium Chloride example."
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setRetentionPct(Math.min(100, retentionPct + 5))} className="px-3 py-1 bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold">I Knew This (+3 Days)</button>
                    <button onClick={() => setRetentionPct(Math.max(40, retentionPct - 10))} className="px-3 py-1 bg-rose-600/30 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold">Review Tomorrow</button>
                  </div>
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
                    onClick={() => setSelectedTheorem(key)}
                    className={`px-3 py-1.5 rounded-xl font-bold uppercase transition ${selectedTheorem === key ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400'}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 text-xs space-y-3">
                <span className="font-bold text-amber-400 text-sm">Visual Axiom Breakdown:</span>
                {selectedTheorem === 'pythagoras' && (
                  <div className="space-y-2 text-stone-300">
                    <p>In a right-angled triangle with sides $a$ and $b$, and hypotenuse $c$:</p>
                    <div className="p-3 bg-stone-950 font-mono text-center text-amber-300 font-bold rounded-xl border border-stone-800">
                      a² + b² = c² &nbsp;→&nbsp; Area(Square on a) + Area(Square on b) = Area(Square on c)
                    </div>
                    <p className="text-[11px] text-stone-400">Step 1: Construct 4 congruent right triangles inside a square of side $(a+b)$. Step 2: Equate inner area $(a+b)^2 - 4(1/2 \cdot ab) = c^2$.</p>
                  </div>
                )}
                {selectedTheorem === 'archimedes' && (
                  <div className="space-y-2 text-stone-300">
                    <p>Archimedes Buoyancy Principle:</p>
                    <div className="p-3 bg-stone-950 font-mono text-center text-cyan-300 font-bold rounded-xl border border-stone-800">
                      F_buoyant = ρ_fluid \cdot V_submerged \cdot g = Weight of Displaced Fluid
                    </div>
                  </div>
                )}
                {selectedTheorem === 'newton2' && (
                  <div className="space-y-2 text-stone-300">
                    <p>Newton's Second Law of Motion:</p>
                    <div className="p-3 bg-stone-950 font-mono text-center text-emerald-300 font-bold rounded-xl border border-stone-800">
                      F = \frac{dp}{dt} = m \cdot \frac{dv}{dt} = m \cdot a
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. Cognitive Load Analyzer */}
          {feature.modeKey === 'cognitive_load' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-300">Simulate Reading Cadence & Pause Intervals:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${fatigueIndex > 60 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    Fatigue Score: {fatigueIndex}% ({fatigueIndex > 60 ? 'High Fatigue' : 'Optimal Focus'})
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  value={scrollInterval}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setScrollInterval(val);
                    setFatigueIndex(Math.round((val / 1000) * 100));
                  }}
                  className="w-full accent-amber-500"
                />
                <div className="text-[11px] text-stone-400 flex justify-between">
                  <span>Fast Smooth Scroll (Fresh Focus)</span>
                  <span>Erratic Stuttering (Cognitive Fatigue)</span>
                </div>
                {fatigueIndex > 60 && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300 flex items-center gap-2">
                    <Flame className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>Cognitive fatigue detected. Recommended: Take a 60-second Vedic breath break before Section 8 mock tests.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. Question Predictor */}
          {feature.modeKey === 'question_predictor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3">
                <div className="flex gap-2">
                  <select 
                    value={predictSubject} 
                    onChange={(e) => setPredictSubject(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white"
                  >
                    <option value="Science">Class 8 Science</option>
                    <option value="Maths">Class 8 Mathematics</option>
                    <option value="SST">Class 8 Social Science</option>
                  </select>
                  <span className="text-xs text-stone-400 self-center">15-Year Historical Paper Probability Analysis</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-800/80">
                    <span>1. Ray Diagrams for Concave Mirror (Real vs Virtual)</span>
                    <span className="font-bold text-emerald-400">92% Probability</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-800/80">
                    <span>2. Difference between Thermoplastic & Thermosetting</span>
                    <span className="font-bold text-emerald-400">88% Probability</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-stone-800/80">
                    <span>3. Solve Linear Equation with Variable on Both Sides</span>
                    <span className="font-bold text-amber-400">76% Probability</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. Mind-Map Synthesizer */}
          {feature.modeKey === 'mindmap_synthesizer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-cyan-400">Hierarchical Interactive Concept Tree (Science Ch 3)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Acids (pH < 7)', 'Bases (pH > 7)', 'Neutral Salts', 'Indicators (Litmus)'].map(node => (
                    <div
                      key={node}
                      onClick={() => setActiveMindNode(node)}
                      className={`p-3 rounded-xl border text-center cursor-pointer transition ${activeMindNode === node ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      {node}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-300">
                  <span className="font-bold text-cyan-300">Active Node Details:</span> {activeMindNode} turns blue litmus red, releases H⁺ ions in aqueous solutions, and reacts with metals to form hydrogen gas.
                </div>
              </div>
            </div>
          )}

          {/* 7. Hindi-English Transliteration */}
          {feature.modeKey === 'hindi_transliteration' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Bilingual Terminology Bridge (Hindi ⇄ English)</span>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-stone-800 rounded-xl border border-stone-700">
                    <span className="text-stone-400 text-[10px] block">Hindi Term (शब्दावली)</span>
                    <span className="font-bold text-white text-sm">{bilingualTerm}</span>
                  </div>
                  <div className="p-3 bg-stone-800 rounded-xl border border-stone-700">
                    <span className="text-stone-400 text-[10px] block">English Term</span>
                    <span className="font-bold text-emerald-400 text-sm">Photosynthesis</span>
                  </div>
                </div>
                <p className="text-stone-400 text-[11px]">Formula: 6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂ (पौधे अपना भोजन सूर्य के प्रकाश में बनाते हैं।)</p>
              </div>
            </div>
          )}

          {/* 8. Persona Engine */}
          {feature.modeKey === 'persona_engine' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-purple-400">Choose AI Tutor Persona Tone:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'acharya', label: 'DAV Acharya', icon: '🙏' },
                    { id: 'senior', label: 'Friendly Senior', icon: '🎒' },
                    { id: 'scientist', label: 'Curious Scientist', icon: '🔬' },
                    { id: 'examiner', label: 'Strict Examiner', icon: '📝' }
                  ].map(p => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPersona(p.id)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition ${selectedPersona === p.id ? 'bg-purple-500/20 border-purple-400 text-purple-300' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      <span className="text-base block mb-0.5">{p.icon}</span>
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-300 italic">
                  {selectedPersona === 'acharya' && '"आयुष्मान भव! सदैव सत्य के मार्ग पर चलें और ज्ञान का अर्जन एकाग्र चित्त होकर करें।"'}
                  {selectedPersona === 'senior' && '"Hey buddy! Don\'t sweat the math formulas, let me show you the shortcut I used to score 98 in Term 2."'}
                  {selectedPersona === 'scientist' && '"Observe carefully: why did the litmus color shift? What molecular transition just happened?"'}
                  {selectedPersona === 'examiner' && '"Step marks are strictly deducted for missing units. Write \'cm²\' explicitly after calculation."'}
                </div>
              </div>
            </div>
          )}

          {/* 9. Essay Evaluator */}
          {feature.modeKey === 'essay_evaluator' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-stone-300">CBSE 5-Tier Subjective Answer Evaluator:</span>
                <textarea
                  value={essayText}
                  onChange={(e) => setEssayText(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                />
                <button
                  type="button"
                  onClick={() => setEssayScore({ grammar: '4.5/5', thesis: '4.8/5', vocab: '4.2/5', total: '4.5/5' })}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
                >
                  Grade Against CBSE Rubric
                </button>
                {essayScore && (
                  <div className="grid grid-cols-4 gap-2 text-center pt-2">
                    <div className="p-2 bg-stone-800 rounded-lg"><span className="text-[10px] text-stone-400 block">Grammar</span><span className="font-bold text-emerald-400">{essayScore.grammar}</span></div>
                    <div className="p-2 bg-stone-800 rounded-lg"><span className="text-[10px] text-stone-400 block">Thesis</span><span className="font-bold text-emerald-400">{essayScore.thesis}</span></div>
                    <div className="p-2 bg-stone-800 rounded-lg"><span className="text-[10px] text-stone-400 block">Vocabulary</span><span className="font-bold text-emerald-400">{essayScore.vocab}</span></div>
                    <div className="p-2 bg-stone-800 rounded-lg border border-amber-500/30"><span className="text-[10px] text-stone-400 block">Overall</span><span className="font-bold text-amber-300">{essayScore.total}</span></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 10. Prereq Graph */}
          {feature.modeKey === 'prereq_graph' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Zero-Knowledge Concept Prerequisite Graph</span>
                <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <div className="text-center">
                    <span className="text-[10px] text-rose-400 font-bold block">Target Gap</span>
                    <span className="font-bold text-white">Class 8 Quadratic Eq</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-stone-500" />
                  <div className="text-center">
                    <span className="text-[10px] text-amber-400 font-bold block">Prerequisite 1</span>
                    <span className="font-bold text-white">Class 7 Linear Equations</span>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-stone-500" />
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-400 font-bold block">Root Axiom</span>
                    <span className="font-bold text-white">Class 5 Integer Signs</span>
                  </div>
                </div>
                <p className="text-stone-400 text-[11px]">System diagnostic: 78% of errors in transposition arise from confusing $(- \times - = +)$ rules from Class 5.</p>
              </div>
            </div>
          )}

          {/* 11. Handwritten OCR */}
          {feature.modeKey === 'handwritten_ocr' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-cyan-400">Handwritten Notebook OCR & Formula Scanner</span>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-stone-800 border border-stone-700 flex items-center justify-center font-handwriting text-stone-300">
                      x² + y²
                    </div>
                    <div>
                      <span className="text-white font-bold block">Simulated Notebook Page #42</span>
                      <span className="text-stone-400 text-[10px]">Handwritten Equation</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOcrStatus('scanning');
                      setTimeout(() => setOcrStatus('done'), 800);
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs"
                  >
                    {ocrStatus === 'scanning' ? 'Scanning...' : 'Extract LaTeX'}
                  </button>
                </div>
                {ocrStatus === 'done' && (
                  <div className="p-3 bg-stone-800/80 rounded-xl font-mono text-emerald-400 text-xs">
                    LaTeX: (x + y)^2 = x^2 + 2xy + y^2 &nbsp; [Confidence: 99.4%]
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 12. Geometry Protractor */}
          {feature.modeKey === 'geometry_protractor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">AR Protractor Sub-Degree Measurement</span>
                  <span className="font-mono text-amber-300 font-bold">{protractorAngle}° (Acute Angle)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={protractorAngle}
                  onChange={(e) => setProtractorAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="h-28 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-center relative overflow-hidden">
                  <div 
                    className="w-24 h-0.5 bg-amber-400 origin-left"
                    style={{ transform: `rotate(-${protractorAngle}deg)` }}
                  />
                  <div className="w-24 h-0.5 bg-stone-600 origin-left" />
                  <span className="absolute text-[10px] text-stone-500 bottom-2 right-3 font-mono">0° Baseline</span>
                </div>
              </div>
            </div>
          )}

          {/* 13. Chemical Reaction */}
          {feature.modeKey === 'chemical_reaction' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-emerald-400">Chemical Equation Particle Simulator</span>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 text-center font-mono text-sm text-cyan-300 font-bold">
                  2H₂ + O₂ &nbsp;→&nbsp; 2H₂O + Heat (Exothermic)
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsReacting(true);
                      setTimeout(() => setIsReacting(false), 1200);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    <Atom className={`w-4 h-4 ${isReacting ? 'animate-spin' : ''}`} />
                    <span>{isReacting ? 'Bonding Electrons...' : 'Trigger Molecular Reaction'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 14. Graph Paper Checker */}
          {feature.modeKey === 'graph_paper_checker' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Cartesian Coordinate Point Validator</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {graphPoints.map((pt, i) => (
                    <div key={i} className="p-2 bg-stone-800 rounded-lg">
                      <span className="text-[10px] text-stone-400 block">Point #{i+1}</span>
                      <span className="font-bold text-white">({pt.x}, {pt.y})</span>
                      <span className="text-[10px] text-emerald-400 block font-bold">✓ On Line y = 2x</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 15. Shloka Lipsync */}
          {feature.modeKey === 'shloka_lipsync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">Sanskrit Gayatri Mantra Swara Visualizer</span>
                  <span className="text-emerald-400 font-bold">Pitch Match: {pitchAccuracy}%</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-center font-serif text-sm text-amber-300">
                  ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${pitchAccuracy}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* 16. Posture Guard */}
          {feature.modeKey === 'posture_guard' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-stone-300">Ergonomic Screen Distance Sensor</span>
                  <span className={`font-bold ${postureDistance < 25 ? 'text-rose-400' : 'text-emerald-400'}`}>
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
              </div>
            </div>
          )}

          {/* 17. Batch Sheet Scanner */}
          {feature.modeKey === 'batch_sheet_scanner' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Teacher Batch Answer Sheet Scanner</span>
                <p className="text-stone-400 text-[11px]">Auto-aligns 40 physical sheets in 30 seconds for Class 8-A Midterms.</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsScanningBatch(true);
                      setTimeout(() => setIsScanningBatch(false), 900);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
                  >
                    {isScanningBatch ? 'Processing 40 Sheets...' : 'Simulate 40-Sheet Scan'}
                  </button>
                  <span className="text-emerald-400 font-bold">{scannedSheets}/40 Sheets Graded</span>
                </div>
              </div>
            </div>
          )}

          {/* 18. Map-Skill Matcher */}
          {feature.modeKey === 'map_skill_matcher' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">SST India Cartography Pinpoint Matcher</span>
                  <span className="text-stone-400">Target: {mapTarget}</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                  <span>Pin Placement Error:</span>
                  <span className="font-bold text-emerald-400">{mapDistanceError} km (Grade: A+)</span>
                </div>
              </div>
            </div>
          )}

          {/* 19. Vedic Audio Chanting */}
          {feature.modeKey === 'vedic_chant_pitch' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Vedic Chanting Swara Alignment Master</span>
                <div className="flex items-center justify-between p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="font-serif text-amber-300">ॐ शान्तिः शान्तिः शान्तिः</span>
                  <button
                    type="button"
                    onClick={handleSpeakVedicChant}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isChanting ? 'Stop Chanting' : 'Listen with Vedic Meter'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 20. Podcast Studio */}
          {feature.modeKey === 'podcast_studio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-purple-400">AI Chapter Podcast Generator (Two AI Hosts)</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Episode 14: Microorganisms Friend & Foe</span>
                    <button
                      type="button"
                      onClick={() => setIsPodcastPlaying(prev => !prev)}
                      className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {isPodcastPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isPodcastPlaying ? 'Pause' : 'Play 8-Min Episode'}</span>
                    </button>
                  </div>
                  <p className="text-stone-400 text-[11px]">Rishi: "Welcome Ananya! Did you know yeast undergoes anaerobic respiration to release carbon dioxide?"</p>
                </div>
              </div>
            </div>
          )}

          {/* 21. Hands-Free Voice Assistant */}
          {feature.modeKey === 'handsfree_voice' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-cyan-400">Hands-Free Lab Voice Assistant</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800">
                  <span className="text-[10px] text-stone-400 block">Recognized Voice Command</span>
                  <span className="font-bold text-white">"{lastVoiceCmd}"</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLastVoiceCmd('Formula for Kinetic Energy: 1/2 m v²')} className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs">Simulate: Ask KE Formula</button>
                  <button onClick={() => setLastVoiceCmd('Timer started: 30 seconds for Titration')} className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg text-xs">Simulate: 30s Lab Timer</button>
                </div>
              </div>
            </div>
          )}

          {/* 22. Dyslexia Bionic Reader */}
          {feature.modeKey === 'dyslexia_reader' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">Bionic Syllable & Fluency Reader</span>
                  <span className="text-stone-400">{dyslexiaWpm} WPM</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-200 text-sm leading-relaxed">
                  <span className="font-bold text-amber-300">Pho</span>tosynthesis is the <span className="font-bold text-amber-300">pro</span>cess by which <span className="font-bold text-amber-300">gre</span>en plants <span className="font-bold text-amber-300">syn</span>thesize nutrients.
                </div>
              </div>
            </div>
          )}

          {/* 23. Parent Audio Briefing */}
          {feature.modeKey === 'parent_audio_brief' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-emerald-400">Parent WhatsApp Daily 60-Second Audio Brief</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">Morning Briefing • Class 8</span>
                    <span className="text-stone-400 text-[10px]">3 Tasks Pending • Science Exam Tomorrow</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsParentAudioPlaying(prev => !prev)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    {isParentAudioPlaying ? 'Playing Audio...' : 'Play 60s Briefing'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 24. Indian Voice Synthesizer */}
          {feature.modeKey === 'indian_voice_accent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Authentic Indian Dialect & Sanskrit Accents</span>
                <div className="grid grid-cols-3 gap-2">
                  {['indian_english', 'hindi_shuddh', 'sanskrit_vedic'].map(acc => (
                    <button
                      key={acc}
                      type="button"
                      onClick={() => setSelectedVoiceAccent(acc)}
                      className={`p-2 rounded-xl border text-xs font-bold capitalize transition ${selectedVoiceAccent === acc ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      {acc.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 25. Debate Speech Coach */}
          {feature.modeKey === 'debate_speech_coach' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-yellow-400">Declamation & Debate Cadence Analyzer</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-stone-800 rounded-xl"><span className="text-[10px] text-stone-400 block">Pacing</span><span className="font-bold text-white">{speechWpm} WPM (Ideal)</span></div>
                  <div className="p-2.5 bg-stone-800 rounded-xl"><span className="text-[10px] text-stone-400 block">Filler Words</span><span className="font-bold text-emerald-400">{fillerWordCount} ("um", "like")</span></div>
                  <div className="p-2.5 bg-stone-800 rounded-xl border border-yellow-500/30"><span className="text-[10px] text-stone-400 block">Confidence</span><span className="font-bold text-yellow-300">92/100</span></div>
                </div>
              </div>
            </div>
          )}

          {/* 26. Optics Raytracer */}
          {feature.modeKey === 'optics_raytracer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">3D Optics Ray-Tracing Workbench (Convex Lens)</span>
                  <span className="text-stone-300">Object Distance (u): -{objectDistance} cm</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={objectDistance}
                  onChange={(e) => setObjectDistance(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-300">
                  <span className="font-bold text-cyan-300">Image Nature:</span> Real, Inverted & Magnified (Beyond 2F at +{(1 / (1/20 - 1/objectDistance)).toFixed(1)} cm)
                </div>
              </div>
            </div>
          )}

          {/* 27. 3D Anatomy Organ */}
          {feature.modeKey === 'anatomy_3d_organ' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-rose-400">Layered Dissectible Human Heart</span>
                <div className="grid grid-cols-3 gap-2">
                  {['all', 'oxygenated', 'deoxygenated'].map(layer => (
                    <button
                      key={layer}
                      type="button"
                      onClick={() => setHeartLayer(layer)}
                      className={`p-2 rounded-xl border capitalize font-bold transition ${heartLayer === layer ? 'bg-rose-500/20 border-rose-400 text-rose-300' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      {layer} Blood Path
                    </button>
                  ))}
                </div>
                <p className="text-stone-400 text-[11px]">Left ventricle pumps oxygenated blood via the aorta to the systemic circuit at 120 mmHg systolic pressure.</p>
              </div>
            </div>
          )}

          {/* 28. Orbital Electron Cloud */}
          {feature.modeKey === 'orbital_electron_cloud' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">Quantum Bohr Orbital Shell Simulator (2n²)</span>
                <select 
                  value={orbitalElement}
                  onChange={(e) => setOrbitalElement(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs"
                >
                  <option value="Sodium (Na)">Sodium (Na) - 2, 8, 1</option>
                  <option value="Carbon (C)">Carbon (C) - 2, 4</option>
                  <option value="Oxygen (O)">Oxygen (O) - 2, 6</option>
                </select>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 font-mono text-cyan-300 text-center">
                  K Shell: 2e⁻ &nbsp;|&nbsp; L Shell: 8e⁻ &nbsp;|&nbsp; M Shell: 1e⁻ (Valence = 1)
                </div>
              </div>
            </div>
          )}

          {/* 29. Solar Gravity Orbit */}
          {feature.modeKey === 'solar_gravity_orbit' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-yellow-400">Kepler Planetary Gravity & Velocity Sandbox</span>
                  <span className="font-mono text-white">{orbitalVelocity} km/s</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  step="0.5"
                  value={orbitalVelocity}
                  onChange={(e) => setOrbitalVelocity(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                />
                <p className="text-stone-400 text-[11px]">At 29.8 km/s Earth maintains a stable nearly-circular orbit around the Sun. Higher velocities cause hyperbolic escape trajectories.</p>
              </div>
            </div>
          )}

          {/* 30. Circuit Breadboard */}
          {feature.modeKey === 'circuit_breadboard' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">Breadboard Circuit & Ohm's Law (V = IR)</span>
                  <span className={isCircuitBlown ? 'text-rose-400 font-bold' : isCircuitClosed ? 'text-emerald-400 font-bold' : 'text-stone-400'}>
                    {isCircuitBlown ? 'FUSE BLOWN!' : isCircuitClosed ? 'Current: 0.09 A (Active)' : 'Circuit Open'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCircuitBlown) setIsCircuitClosed(prev => !prev);
                    }}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs"
                  >
                    Toggle Switch {isCircuitClosed ? '(OFF)' : '(ON)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCircuitBlown(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs"
                  >
                    Short-Circuit Overload
                  </button>
                  {isCircuitBlown && (
                    <button
                      type="button"
                      onClick={() => { setIsCircuitBlown(false); setIsCircuitClosed(false); }}
                      className="px-3 py-1 bg-stone-800 text-stone-300 rounded-lg text-xs"
                    >
                      Reset Fuse
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 31. Vedic History Museum */}
          {feature.modeKey === 'vedic_history_museum' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">3D Harappan & Vedic Artifact Gallery</span>
                <div className="grid grid-cols-3 gap-2">
                  {['Pashupati Seal', 'Great Bath (Mohenjo-daro)', 'Vedic Fire Altar'].map(art => (
                    <button
                      key={art}
                      type="button"
                      onClick={() => setActiveArtifact(art)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition ${activeArtifact === art ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      {art}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-300">
                  <span className="font-bold text-white">{activeArtifact}:</span> Discovered in mature Harappan layers, depicting yogic posture surrounded by animals (elephant, tiger, rhino, buffalo).
                </div>
              </div>
            </div>
          )}

          {/* 32. Tectonic Sandbox */}
          {feature.modeKey === 'tectonic_sandbox' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400">Indian-Eurasian Plate Collision Sandbox</span>
                  <span className="text-white">Convergence Rate: {plateConvergence} mm/year</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="70"
                  value={plateConvergence}
                  onChange={(e) => setPlateConvergence(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <p className="text-stone-400 text-[11px]">Subduction of Tethys Sea lithosphere pushes the Greater Himalayas upwards at ~5 mm per year.</p>
              </div>
            </div>
          )}

          {/* 33. Dual-Camera Proctor */}
          {feature.modeKey === 'dual_camera_proctor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-400">Synchronized Dual-View AI Proctoring</span>
                  <span className="font-bold text-emerald-400">Integrity: {proctorIntegrity}% (Verified)</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Camera 1 (Laptop)</span>
                    <span className="font-bold text-white">Gaze Tracking: Active</span>
                  </div>
                  <div className="p-4 bg-stone-950 rounded-xl border border-stone-800">
                    <span className="text-[10px] text-stone-400 block">Camera 2 (Mobile 45° Angle)</span>
                    <span className="font-bold text-white">Desk Perimeter: Clean</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 34. Audio Frequency Whisper */}
          {feature.modeKey === 'audio_frequency_whisper' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-400">Whisper vs Ambient Hum Decibel Analyzer</span>
                  <span className="font-mono text-emerald-400 font-bold">{ambientDecibel} dB (Normal Background)</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-stone-300">
                  <span>Frequency Classification:</span>
                  <span className="font-bold text-emerald-400">Ceiling Fan Low Hum (60 Hz) • No Human Whispers</span>
                </div>
              </div>
            </div>
          )}

          {/* 35. Plagiarism AI Detector */}
          {feature.modeKey === 'plagiarism_ai_detector' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">Semantic Perplexity & AI Text Detector</span>
                  <span className="font-bold text-emerald-400">Human-Authored: {100 - aiProbability}%</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${100 - aiProbability}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* 36. Dynamic QR Hallticket */}
          {feature.modeKey === 'rotating_qr_hallticket' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs text-center">
                <span className="font-bold text-amber-400">Rolling 30s Encrypted Admit Card Token</span>
                <div className="p-4 bg-stone-950 rounded-xl border border-stone-800 max-w-xs mx-auto">
                  <div className="w-32 h-32 mx-auto bg-stone-800 rounded-lg flex items-center justify-center font-mono text-xs text-amber-300">
                    [HMAC-QR]
                  </div>
                  <span className="text-[10px] text-stone-400 block mt-2">Rotating in: {qrCountdown}s</span>
                </div>
              </div>
            </div>
          )}

          {/* 37. Face Attendance Logger */}
          {feature.modeKey === 'face_attendance_logger' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400">Class 8-A Biometric Face Roll-Call</span>
                  <span className="font-bold text-white">{faceCount}/45 Students Present</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-emerald-400 font-mono text-center">
                  Roll #1 to #45 Verified in 3.4 seconds • Uploaded to Faculty Desk
                </div>
              </div>
            </div>
          )}

          {/* 38. ZK Grade Vault */}
          {feature.modeKey === 'zk_grade_vault' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-purple-400">Cryptographic Grade Immutability Ledger</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 font-mono text-[10px] text-stone-400 break-all">
                  SHA256: {zkHash}
                </div>
                <span className="text-emerald-400 font-bold block text-center">✓ Tamper-Proof Signature Verified</span>
              </div>
            </div>
          )}

          {/* 39. Smart Bus Telemetry */}
          {feature.modeKey === 'smart_bus_telemetry' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-400">Bus #14 Live Geofence Radar</span>
                  <span className="font-bold text-amber-400">Arrival in: {busEtaMinutes} mins</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between">
                  <span>Speed: 42 km/h</span>
                  <span>Next Stop: Khabra Chowk</span>
                  <span className="text-emerald-400 font-bold">On Time</span>
                </div>
              </div>
            </div>
          )}

          {/* 40. Smartboard Sync */}
          {feature.modeKey === 'smartboard_sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-cyan-400">Teacher Smartboard Screen Broadcast</span>
                  <span className="text-emerald-400 font-bold">&lt; 35ms Latency</span>
                </div>
                <div className="h-28 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-center font-mono text-cyan-300">
                  [Live Mirrored Math Working Canvas]
                </div>
              </div>
            </div>
          )}

          {/* 41. RFID Library */}
          {feature.modeKey === 'rfid_library_checkout' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-amber-400">1-Click Library Self-Checkout</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">{borrowedBook}</span>
                    <span className="text-stone-400 text-[10px]">Due Date: 14 Days (Nov 29, 2026)</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-bold">Checked Out</span>
                </div>
              </div>
            </div>
          )}

          {/* 42. Classroom Clicker */}
          {feature.modeKey === 'classroom_clicker_poll' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-purple-400">10-Second Low-Latency Clicker Poll</span>
                <p className="text-white font-bold">Q: Which gas is released during photosynthesis?</p>
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  {Object.entries(clickerVotes).map(([opt, cnt]) => (
                    <div key={opt} className="p-2 bg-stone-800 rounded-lg">
                      <span className="font-black text-amber-400 block">{opt}</span>
                      <span className="text-xs text-white font-bold">{cnt} votes</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 43. School Bell Automation */}
          {feature.modeKey === 'school_bell_automation' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">Campus Bell & Vedic Assembly Chimes</span>
                  <span className="text-stone-300">Active Period: #{currentPeriod}</span>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex justify-between items-center">
                  <span>Next Bell Chime:</span>
                  <span className="font-bold text-amber-300">11:45 AM (Short Recess Chime)</span>
                </div>
              </div>
            </div>
          )}

          {/* 44. P2P Offline Sync */}
          {feature.modeKey === 'p2p_offline_sync' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-blue-400">Zero-Data Local Wi-Fi Mesh Sync</span>
                <div className="space-y-1.5">
                  {syncedPdfs.map(f => (
                    <div key={f} className="p-2.5 bg-stone-800/80 rounded-lg flex justify-between">
                      <span className="text-white font-medium">{f}</span>
                      <span className="text-emerald-400 font-bold">Offline Ready</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 45. Inter-DAV Arena */}
          {feature.modeKey === 'inter_dav_arena' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-yellow-400">Weekly House Clash Arena (Live Points)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {Object.entries(arenaScores).map(([house, pts]) => (
                    <div key={house} className="p-3 bg-stone-800 rounded-xl border border-stone-700">
                      <span className="text-stone-400 text-[10px] block font-bold">{house} House</span>
                      <span className="font-black text-amber-300 text-base">{pts} XP</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 46. Blockchain Skill Badge */}
          {feature.modeKey === 'blockchain_badge_mint' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs text-center">
                <span className="font-bold text-amber-400">Cryptographic Scholastic Credential</span>
                <div className="p-4 bg-stone-950 rounded-2xl border border-amber-500/40 max-w-xs mx-auto space-y-2">
                  <Award className="w-10 h-10 text-amber-400 mx-auto" />
                  <span className="font-bold text-white block">DAV Olympiad Excellence 2026</span>
                  <span className="text-[10px] text-stone-400 block font-mono">Token #DAV-88219-GOLD</span>
                  <button
                    type="button"
                    onClick={() => setBadgeMinted(true)}
                    className="px-4 py-1.5 bg-amber-500 text-stone-950 font-bold rounded-lg text-xs"
                  >
                    {badgeMinted ? 'Minted to Profile Vault!' : 'Mint Credential'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 47. Career Stream Predictor */}
          {feature.modeKey === 'career_stream_predictor' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-cyan-400">Class 8-10 Transition Stream Recommender</span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 bg-stone-800 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] text-stone-400 block">Science (PCM/PCB)</span>
                    <span className="font-bold text-cyan-300 text-sm">{streamMatch.Science}% Match</span>
                  </div>
                  <div className="p-2.5 bg-stone-800 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Commerce</span>
                    <span className="font-bold text-white text-sm">{streamMatch.Commerce}% Match</span>
                  </div>
                  <div className="p-2.5 bg-stone-800 rounded-xl">
                    <span className="text-[10px] text-stone-400 block">Humanities</span>
                    <span className="font-bold text-white text-sm">{streamMatch.Humanities}% Match</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 48. Study-Buddy Match */}
          {feature.modeKey === 'study_buddy_match' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-rose-400">Algorithmic Peer Mentorship Match</span>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 space-y-1">
                  <span className="font-bold text-white block">{matchedBuddy.name}</span>
                  <span className="text-emerald-400 block">Strengths: {matchedBuddy.strong}</span>
                  <span className="text-rose-400 block">Learning Goal: {matchedBuddy.needs}</span>
                </div>
              </div>
            </div>
          )}

          {/* 49. Metaverse Campus Quad */}
          {feature.modeKey === 'metaverse_campus_quad' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <span className="font-bold text-emerald-400">Virtual 3D DAV Campus Quad (Khabra Muzaffarpur)</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Vedic Assembly Ground', 'Central Library', 'Advanced Science Lab', 'Sports Complex'].map(z => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setActiveCampusZone(z)}
                      className={`p-2 rounded-xl border font-bold text-xs transition ${activeCampusZone === z ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-stone-800 border-stone-700 text-stone-400'}`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-stone-300 text-center">
                  Active in: <span className="font-bold text-white">{activeCampusZone}</span> • 12 classmates online
                </div>
              </div>
            </div>
          )}

          {/* 50. Karmic Points Tracker */}
          {feature.modeKey === 'karmic_points_tracker' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-400">Vedic Dharma & Community Seva Tracker</span>
                  <span className="font-bold text-emerald-300 text-sm">🍃 {karmicLeaves} Karmic Leaves</span>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setKarmicLeaves(prev => prev + 10);
                      davAudio?.playChime?.('click');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                  >
                    + Log Tree Plantation (+10 🍃)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setKarmicLeaves(prev => prev + 5);
                      davAudio?.playChime?.('click');
                    }}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs"
                  >
                    + Log Peer Tutoring (+5 🍃)
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3 border-t border-stone-800 bg-stone-900/80 flex items-center justify-between text-xs text-stone-400">
          <span>Target Audience: <strong className="text-white">{feature.targetAudience}</strong></span>
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
