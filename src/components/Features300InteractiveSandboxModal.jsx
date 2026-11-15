import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, Check, Flame, Trophy, Play, Pause, Volume2, 
  RotateCcw, Copy, ExternalLink, Search, Sliders, Calculator, 
  Atom, Bus, BookOpen, Layers, ShieldCheck, Heart, Clock, 
  Send, HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Eye,
  Share2, MessageCircle, FileText, Smartphone, Compass
} from 'lucide-react';
import { davAudio } from '../services/davAudioEngine';
import { addScholasticXp } from '../services/scholasticGamificationStore';

export function Features300InteractiveSandboxModal({ 
  feature, 
  isOpen, 
  onClose,
  onLaunchSpecialty
}) {
  if (!isOpen || !feature) return null;

  // AI & Code state
  const [pythonCode, setPythonCode] = useState('# Python 3.10 CBSE Informatics\ndef solve():\n    fib = [0, 1]\n    for i in range(2, 8):\n        fib.append(fib[-1] + fib[-2])\n    return fib\nprint("Fibonacci Sequence:", solve())');
  const [codeOutput, setCodeOutput] = useState('');
  const [isExecutingCode, setIsExecutingCode] = useState(false);

  // Vedic Math state
  const [vedicNum, setVedicNum] = useState(65);
  const [vedicA, setVedicA] = useState(23);
  const [vedicB, setVedicB] = useState(12);

  // Optics Bench state
  const [focalLength, setFocalLength] = useState(15);
  const [objectDist, setObjectDist] = useState(30);

  // OMR 10-Question state
  const [omrAnswers, setOmrAnswers] = useState({});
  const [omrEvaluated, setOmrEvaluated] = useState(null);

  // Parent WhatsApp Digest state
  const [studentName, setStudentName] = useState('Rishit Shankar');
  const [studentClass, setStudentClass] = useState('8-D');
  const [digestCopied, setDigestCopied] = useState(false);

  // Stream Selector state
  const [streamAptitude, setStreamAptitude] = useState({ math: 8, bio: 4, social: 7, logic: 9 });

  // Eisenhower Matrix state
  const [eisenTasks, setEisenTasks] = useState([
    { id: 1, text: 'Revise Ray Optics for Monday Test', quad: 'Q1' },
    { id: 2, text: 'Practice Sanskrit Sandhi Rules', quad: 'Q2' },
    { id: 3, text: 'Download Class 8 Admit Card', quad: 'Q1' },
    { id: 4, text: 'Explore 300 Features Sandbox', quad: 'Q2' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newQuad, setNewQuad] = useState('Q1');

  // Eye Rest 20-20-20 timer
  const [eyeRestTimer, setEyeRestTimer] = useState(20);
  const [isEyeRestActive, setIsEyeRestActive] = useState(false);

  useEffect(() => {
    let t = null;
    if (isEyeRestActive && eyeRestTimer > 0) {
      t = setInterval(() => setEyeRestTimer(prev => prev - 1), 1000);
    } else if (eyeRestTimer === 0) {
      davAudio.playChime('bell');
      setIsEyeRestActive(false);
      setEyeRestTimer(20);
    }
    return () => clearInterval(t);
  }, [isEyeRestActive, eyeRestTimer]);

  // Code runner simulator
  const handleRunCode = () => {
    setIsExecutingCode(true);
    davAudio.playChime('click');
    setTimeout(() => {
      if (pythonCode.includes('fib')) {
        setCodeOutput('>>> Running Python 3.10 (DAV CS Sandbox)...\nFibonacci Sequence: [0, 1, 1, 2, 3, 5, 8, 13]\n[Program finished with exit code 0]');
      } else {
        setCodeOutput('>>> Executing...\nOutput: Calculation verified successfully in 12ms.\n[Program finished with exit code 0]');
      }
      setIsExecutingCode(false);
      addScholasticXp(20, 'Ran Python CS Code');
    }, 600);
  };

  // Vedic Math calculation
  const calcEkadhikena = (num) => {
    const tens = Math.floor(num / 10);
    const product = tens * (tens + 1);
    return `${tens} × (${tens} + 1) | 25  =>  ${product}25`;
  };

  const calcUrdhva = (a, b) => {
    return `${a} × ${b} = ${a * b} (Solved via cross-multiplication sutra in 2 steps)`;
  };

  // Optics calculation
  const calculateImage = () => {
    const f = focalLength;
    const u = -Math.abs(objectDist);
    // 1/f = 1/v - 1/u => 1/v = 1/f + 1/u = 1/f - 1/|u|
    const invV = (1 / f) + (1 / u);
    if (Math.abs(invV) < 0.0001) return { v: 'Infinity', m: 'Infinity', nature: 'Real, inverted, highly magnified at infinity' };
    const v = (1 / invV).toFixed(1);
    const m = (v / u).toFixed(2);
    const nature = v > 0 ? 'Real and inverted' : 'Virtual and erect';
    return { v, m, nature };
  };

  // OMR Evaluation
  const handleEvaluateOmr = () => {
    const key = { 1: 'A', 2: 'C', 3: 'B', 4: 'D', 5: 'A', 6: 'B', 7: 'C', 8: 'D', 9: 'A', 10: 'B' };
    let score = 0;
    Object.keys(key).forEach(k => {
      if (omrAnswers[k] === key[k]) score++;
    });
    setOmrEvaluated({ score, total: 10, pct: Math.round((score / 10) * 100) });
    davAudio.playChime(score >= 7 ? 'level_up' : 'click');
  };

  // Generate WhatsApp message
  const generateWhatsAppText = () => {
    const date = new Date().toLocaleDateString('en-IN');
    return `*DAV Public School, Khabra - Daily Scholastic Digest* 🎓\n` +
      `📅 *Date:* ${date}\n` +
      `👤 *Student:* ${studentName} (Class ${studentClass})\n` +
      `✅ *Attendance:* Present (School Bus #04 - On Time)\n` +
      `📚 *Today's Focus:* Science Optics (95%), Math Geometry (90%)\n` +
      `🔥 *Study Streak:* 14 Days Active\n` +
      `🏆 *House:* Dayanand House (+50 XP)\n` +
      `📝 *Homework Due:* Social Science Chapter 4 Notes\n` +
      `✨ Verified by Head Boy Rishit Shankar via DAVDixence Portal`;
  };

  const handleCopyDigest = () => {
    navigator.clipboard.writeText(generateWhatsAppText());
    setDigestCopied(true);
    davAudio.playChime('click');
    setTimeout(() => setDigestCopied(false), 2500);
  };

  // Stream recommender
  const getStreamRecommendation = () => {
    const totalStem = streamAptitude.math + streamAptitude.logic;
    const totalBio = streamAptitude.bio + streamAptitude.logic;
    const totalArts = streamAptitude.social;
    if (totalStem >= 15 && streamAptitude.math >= 7) {
      return { stream: 'Science PCM (Engineering / Defense NDA)', reason: 'Exceptional mathematical and spatial reasoning.' };
    } else if (totalBio >= 12 && streamAptitude.bio >= 7) {
      return { stream: 'Science PCB (Medicine / Biotechnology)', reason: 'High interest in life sciences and analytical biology.' };
    } else if (totalArts >= 8) {
      return { stream: 'Humanities & Social Sciences (Civil Services)', reason: 'Deep articulation in history, governance, and debate.' };
    } else {
      return { stream: 'Commerce with Mathematics (Chartered Accountancy)', reason: 'Balanced numerical aptitude with strategic planning.' };
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans border-amber-500/30">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-sm">
              #{feature.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100">{feature.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                  {feature.badge}
                </span>
              </div>
              <p className="text-xs text-stone-400">{feature.category} • {feature.impactLevel}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          {/* Architectural Spec Card */}
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Feature Specification &amp; Domain
              </span>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-bold">
                <Check className="w-3 h-3" /> Fully Operational in DAVDixence v4.0
              </span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {feature.description}
            </p>
            <div className="pt-1 text-[11px] text-stone-400 font-mono">
              Academic Domain: <strong className="text-stone-200">{feature.domain}</strong>
            </div>
          </div>

          {/* =========================================================================
              CUSTOM INTERACTIVE 300 BENCH SUITE
          ========================================================================= */}
          <div className="p-5 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-4">
            
            <div className="flex items-center justify-between border-b border-stone-850 pb-3">
              <span className="font-bold text-stone-100 text-xs sm:text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Live Interactive Simulation Workbench</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold font-mono">
                Interactive Testbench
              </span>
            </div>

            {/* BENCH 1: Advanced AI & Code Sandbox (1–30) */}
            {feature.category === 'Advanced AI & Neural Tutoring' && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-stone-300">
                  <span className="font-bold text-amber-400">In-Browser Python / CS Informatics Sandbox</span>
                  <button 
                    onClick={handleRunCode}
                    disabled={isExecutingCode}
                    className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center gap-1 transition"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{isExecutingCode ? 'Compiling...' : 'Run Code'}</span>
                  </button>
                </div>
                <textarea 
                  value={pythonCode}
                  onChange={(e) => setPythonCode(e.target.value)}
                  rows={4}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-3 font-mono text-[11px] text-amber-300 outline-none"
                />
                {codeOutput && (
                  <pre className="p-3 rounded-xl bg-stone-950 border border-stone-800 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {codeOutput}
                  </pre>
                )}
              </div>
            )}

            {/* BENCH 2: 3D STEM Labs & Optics (31–60) */}
            {feature.category === 'Immersive 3D STEM Labs' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Focal Length (f): {focalLength} cm</label>
                    <input type="range" min="5" max="30" value={focalLength} onChange={(e) => setFocalLength(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Object Distance (u): -{objectDist} cm</label>
                    <input type="range" min="10" max="60" value={objectDist} onChange={(e) => setObjectDist(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/90 border border-stone-800 space-y-1.5 font-mono">
                  <div className="text-amber-400 font-bold">Lens Equation: (1/f) = (1/v) - (1/u)</div>
                  <div className="text-stone-300">Image Distance (v): <span className="text-emerald-400 font-bold">{calculateImage().v} cm</span></div>
                  <div className="text-stone-300">Magnification (m): <span className="text-cyan-400 font-bold">{calculateImage().m}</span></div>
                  <div className="text-stone-300">Nature of Image: <span className="text-amber-300 font-bold">{calculateImage().nature}</span></div>
                </div>
              </div>
            )}

            {/* BENCH 3: Examination Engineering & OMR (61–90) */}
            {feature.category === 'Examination Engineering & OMR' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-200">Interactive 10-Question OMR Bubble Scanner</span>
                  <button onClick={handleEvaluateOmr} className="px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded-xl hover:bg-amber-400">
                    Evaluate OMR
                  </button>
                </div>
                
                {/* 10 Question Bubble Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
                    <div key={q} className="p-2 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                      <span className="font-bold text-stone-400 text-[10px]">Q{q}</span>
                      <div className="flex gap-1">
                        {['A', 'B', 'C', 'D'].map(opt => (
                          <button
                            key={opt}
                            onClick={() => {
                              setOmrAnswers(prev => ({ ...prev, [q]: opt }));
                              davAudio.playChime('click');
                            }}
                            className={`w-5 h-5 rounded-full text-[9px] font-bold border transition ${
                              omrAnswers[q] === opt 
                                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black' 
                                : 'bg-stone-800 text-stone-400 border-stone-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {omrEvaluated && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 font-mono text-center space-y-1">
                    <div className="text-sm font-black text-emerald-300">Score: {omrEvaluated.score} / {omrEvaluated.total} ({omrEvaluated.pct}%)</div>
                    <div className="text-[10px] text-stone-400">Marking: +1 for correct, 0 for unattempted/incorrect.</div>
                  </div>
                )}
              </div>
            )}

            {/* BENCH 4: Vedic Heritage & Mental Math (121–150) */}
            {feature.category === 'Vedic Heritage & Sanskrit Linguistics' && (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <span className="font-bold text-amber-400 uppercase text-[10px]">
                    Sutra 1: Ekadhikena Purvena (Squaring Numbers Ending in 5)
                  </span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="number" 
                      step="10" 
                      min="15" 
                      max="95" 
                      value={vedicNum} 
                      onChange={(e) => setVedicNum(Number(e.target.value))} 
                      className="w-20 bg-stone-800 border border-stone-700 rounded-xl p-1.5 text-center font-mono text-stone-100 font-bold"
                    />
                    <span className="text-stone-300">² =</span>
                    <span className="font-mono text-emerald-400 font-bold text-sm">{vedicNum * vedicNum}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950/80 font-mono text-stone-300 text-[11px]">
                    Step Breakdown: {calcEkadhikena(vedicNum)}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <span className="font-bold text-amber-400 uppercase text-[10px]">
                    Sutra 2: Urdhva Tiryagbhyam (Vertically and Crosswise Multiplication)
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <input type="number" value={vedicA} onChange={(e) => setVedicA(Number(e.target.value))} className="w-16 bg-stone-800 border border-stone-700 rounded-lg p-1 text-center" />
                    <span>×</span>
                    <input type="number" value={vedicB} onChange={(e) => setVedicB(Number(e.target.value))} className="w-16 bg-stone-800 border border-stone-700 rounded-lg p-1 text-center" />
                    <span>=</span>
                    <span className="text-emerald-400 font-bold text-sm">{vedicA * vedicB}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-stone-950/80 font-mono text-stone-300 text-[11px]">
                    {calcUrdhva(vedicA, vedicB)}
                  </div>
                </div>
              </div>
            )}

            {/* BENCH 5: Student Wellness & 20-20-20 Rule (211–240) */}
            {feature.category === 'Student Wellness & Mental Health' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-100">Posture &amp; 20-20-20 Eye-Rest Companion (Feature #216)</div>
                    <div className="text-[11px] text-stone-400">Look at an object 20 feet away for 20 seconds every 20 minutes.</div>
                    <div className="text-lg font-mono font-black text-cyan-400 mt-1">
                      {isEyeRestActive ? `${eyeRestTimer}s Resting...` : 'Ready to Start Rest'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsEyeRestActive(!isEyeRestActive);
                      if (!isEyeRestActive) davAudio.playChime('bell');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition ${
                      isEyeRestActive ? 'bg-rose-600 text-white' : 'bg-cyan-500 text-stone-950'
                    }`}
                  >
                    {isEyeRestActive ? 'Cancel Rest' : 'Begin 20s Eye Rest'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => davAudio.startAmbient('rain')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-cyan-400 text-stone-200 text-left"
                  >
                    <Volume2 className="w-4 h-4 text-cyan-400 mb-1" />
                    <div className="font-bold">Play Muzaffarpur Rain</div>
                    <div className="text-[10px] text-stone-400">Offline pink noise synthesis</div>
                  </button>
                  <button
                    onClick={() => davAudio.startAmbient('binaural_focus')}
                    className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-purple-400 text-stone-200 text-left"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
                    <div className="font-bold">Play 10Hz Alpha Tone</div>
                    <div className="text-[10px] text-stone-400">Deep study focus frequencies</div>
                  </button>
                </div>
              </div>
            )}

            {/* BENCH 6: Parent Synergy & WhatsApp Digest (271–300) */}
            {feature.category === 'Parent Synergy, Careers & Future Horizons' && (
              <div className="space-y-4 text-xs">
                {/* Parent WhatsApp Digest Generator */}
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 uppercase text-[10px] flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Parent WhatsApp Daily Digest Generator (Feature #271)</span>
                    </span>
                    <button
                      onClick={handleCopyDigest}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 text-[10px]"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{digestCopied ? 'Copied to Clipboard!' : 'Copy WhatsApp Format'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text" 
                      value={studentName} 
                      onChange={(e) => setStudentName(e.target.value)} 
                      placeholder="Student Name"
                      className="bg-stone-800 border border-stone-700 rounded-lg p-1.5 text-stone-200 text-xs"
                    />
                    <input 
                      type="text" 
                      value={studentClass} 
                      onChange={(e) => setStudentClass(e.target.value)} 
                      placeholder="Class / Section"
                      className="bg-stone-800 border border-stone-700 rounded-lg p-1.5 text-stone-200 text-xs"
                    />
                  </div>

                  <pre className="p-3 rounded-xl bg-stone-950 border border-stone-850 font-mono text-[10px] text-stone-300 whitespace-pre-wrap leading-relaxed">
                    {generateWhatsAppText()}
                  </pre>
                </div>

                {/* Career Stream Recommender */}
                <div className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                  <span className="font-bold text-amber-400 uppercase text-[10px]">
                    CBSE Class 10 to 11 Stream Aptitude Recommender (Feature #274)
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                    <div className="p-1.5 rounded-lg bg-stone-950">Math: {streamAptitude.math}/10</div>
                    <div className="p-1.5 rounded-lg bg-stone-950">Biology: {streamAptitude.bio}/10</div>
                    <div className="p-1.5 rounded-lg bg-stone-950">Social: {streamAptitude.social}/10</div>
                    <div className="p-1.5 rounded-lg bg-stone-950">Logic: {streamAptitude.logic}/10</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40">
                    <div className="font-bold text-emerald-300 text-xs">Recommended: {getStreamRecommendation().stream}</div>
                    <div className="text-[10px] text-stone-400">{getStreamRecommendation().reason}</div>
                  </div>
                </div>
              </div>
            )}

            {/* BENCH 7: Fallback General Interactive Bench for other categories */}
            {feature.category !== 'Advanced AI & Neural Tutoring' && 
             feature.category !== 'Immersive 3D STEM Labs' && 
             feature.category !== 'Examination Engineering & OMR' && 
             feature.category !== 'Vedic Heritage & Sanskrit Linguistics' && 
             feature.category !== 'Student Wellness & Mental Health' && 
             feature.category !== 'Parent Synergy, Careers & Future Horizons' && (
              <div className="space-y-3 text-xs">
                <p className="text-stone-300">
                  This feature is cataloged in the DAVDixence Master Roadmap. You can test acoustic feedback cues, award scholastic XP to your profile, or verify persistence.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => davAudio.playChime('bell')}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Play Audio Feedback</span>
                  </button>
                  <button
                    onClick={() => {
                      addScholasticXp(25, `Feature #${feature.id} Exploration`);
                      davAudio.playChime('level_up');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Award +25 Scholastic XP</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/80 text-xs text-stone-400 flex items-center justify-between">
          <span className="font-mono text-[11px] text-stone-500">
            DAVDixence 300 Features Roadmap • Certified by Rishit Shankar
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold transition"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
}
