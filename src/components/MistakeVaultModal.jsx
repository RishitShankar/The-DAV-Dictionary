import React, { useState } from 'react';
import { 
  FileText, TrendingUp, CheckCircle2, XCircle, RotateCcw, 
  Trash2, X, AlertTriangle, Sparkles, HelpCircle, Check
} from 'lucide-react';

const INITIAL_MISTAKES = [
  {
    id: 'err_1',
    subject: 'Mathematics',
    chapter: 'Ch 6: Squares & Square Roots',
    question: 'Which of the following numbers cannot be a perfect square just by looking at its unit digit?',
    userWrongAnswer: '1024',
    correctAnswer: '3087',
    explanation: 'A natural number ending in 2, 3, 7, or 8 can never be a perfect square. 3087 ends in 7.',
    resolved: false
  },
  {
    id: 'err_2',
    subject: 'Physics',
    chapter: 'Ch 11: Force & Pressure',
    question: 'A porter stands stationary holding 25 kg on his head for 15 minutes. What is the mechanical work done?',
    userWrongAnswer: '3750 Joules',
    correctAnswer: 'Zero',
    explanation: 'Work W = F · s. Since the porter is stationary, displacement s = 0, so work done is strictly zero.',
    resolved: false
  },
  {
    id: 'err_3',
    subject: 'Chemistry',
    chapter: 'Ch 4: Metals and Non-Metals',
    question: 'Which metal is liquid at room temperature?',
    userWrongAnswer: 'Bromine',
    correctAnswer: 'Mercury (Hg)',
    explanation: 'Mercury is the only liquid metal. Bromine is a liquid non-metal.',
    resolved: false
  },
  {
    id: 'err_4',
    subject: 'Biology',
    chapter: 'Ch 8: Cell Structure & Functions',
    question: 'Who coined the phrase "Omnis cellula e cellula" adding to the cell theory?',
    userWrongAnswer: 'Robert Hooke',
    correctAnswer: 'Rudolf Virchow',
    explanation: 'Rudolf Virchow in 1855 proved that all living cells arise from pre-existing cells.',
    resolved: false
  },
  {
    id: 'err_5',
    subject: 'Social Science',
    chapter: 'Civics: The Indian Constitution',
    question: 'Which Fundamental Right did Dr. Ambedkar call the "Heart and Soul of the Constitution"?',
    userWrongAnswer: 'Right to Equality',
    correctAnswer: 'Right to Constitutional Remedies (Article 32)',
    explanation: 'Article 32 gives citizens the power to petition the Supreme Court directly if fundamental rights are violated.',
    resolved: false
  }
];

export function MistakeVaultModal({ isOpen, onClose }) {
  const [mistakes, setMistakes] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_mistake_vault');
      return saved ? JSON.parse(saved) : INITIAL_MISTAKES;
    } catch (e) {
      return INITIAL_MISTAKES;
    }
  });

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeRetestId, setActiveRetestId] = useState(null);
  const [retestChoice, setRetestChoice] = useState(null);

  if (!isOpen) return null;

  const handleResolve = (id) => {
    const updated = mistakes.map(m => m.id === id ? { ...m, resolved: true } : m);
    setMistakes(updated);
    try {
      localStorage.setItem('dav_mistake_vault', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleResetVault = () => {
    setMistakes(INITIAL_MISTAKES);
    try {
      localStorage.setItem('dav_mistake_vault', JSON.stringify(INITIAL_MISTAKES));
    } catch (e) {}
  };

  const filteredMistakes = mistakes.filter(m => 
    selectedSubject === 'all' || m.subject === selectedSubject
  );

  const pendingCount = mistakes.filter(m => !m.resolved).length;
  const resolvedCount = mistakes.filter(m => m.resolved).length;
  const predictedScore = Math.min(98, 88 + (resolvedCount * 2));

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-stone-800 bg-stone-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-400/10 px-2.5 py-0.5 rounded-full border border-rose-400/30">
                  Concept #155 &amp; #156
                </span>
                <span className="text-xs text-stone-400 font-bold">Intelligent Error Notebook</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                The Mistake Vault &amp; Score Predictor
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-xl hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score Predictor Banner */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-mono font-black text-lg">
              {predictedScore}%
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Predicted DAV Board Examination Score</span>
              </div>
              <p className="text-[11px] text-stone-400">
                You have {pendingCount} uncorrected errors. Resolving them lifts your forecast to 98%!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetVault}
              className="text-xs text-stone-500 hover:text-stone-300 font-bold flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Sample Errors</span>
            </button>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="bg-stone-950/60 px-6 py-2.5 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto text-xs font-bold scrollbar-none">
          {['all', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Science'].map(s => (
            <button
              key={s}
              onClick={() => setSelectedSubject(s)}
              className={`px-3.5 py-1.5 rounded-xl transition cursor-pointer whitespace-nowrap ${
                selectedSubject === s 
                  ? 'bg-rose-500 text-white font-black shadow-md' 
                  : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              {s === 'all' ? 'All Subjects' : s}
            </button>
          ))}
        </div>

        {/* Mistakes List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredMistakes.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              No recorded mistakes in this category. Clean record!
            </div>
          ) : (
            filteredMistakes.map(item => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all duration-300 space-y-3 ${
                  item.resolved 
                    ? 'bg-stone-950/40 border-stone-800 opacity-60' 
                    : 'bg-stone-950 border-stone-800 hover:border-rose-500/50 shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30 text-[10px]">
                      {item.subject}
                    </span>
                    <span className="text-stone-400 text-[11px] font-medium">{item.chapter}</span>
                  </div>

                  {item.resolved ? (
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Resolved</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleResolve(item.id)}
                      className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 cursor-pointer bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark Mastered</span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {item.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                    <span className="text-[10px] font-bold uppercase block text-rose-400">Previous Incorrect Selection:</span>
                    <span>{item.userWrongAnswer}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                    <span className="text-[10px] font-bold uppercase block text-emerald-400">Official Correct Answer:</span>
                    <span>{item.correctAnswer}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  <strong className="text-amber-300">Explanation &amp; Exam Strategy: </strong>
                  {item.explanation}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500">
          <span>DAVDixence Intelligent Error Notebook • Powered by Spaced Repetition</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Close Notebook
          </button>
        </div>

      </div>
    </div>
  );
}
