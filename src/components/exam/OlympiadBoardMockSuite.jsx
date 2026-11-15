import React, { useState, useMemo } from 'react';
import {
  Award, BookOpen, Clock, CheckCircle2, XCircle, ChevronRight,
  ChevronDown, Flame, Sparkles, Filter, Shuffle, HelpCircle,
  FileText, ShieldCheck, Printer, Zap, Trophy, Brain
} from 'lucide-react';
import {
  DAV_MASTER_BOARD_EXAMS,
  DAV_NATIONAL_OLYMPIAD_SPRINT,
  DAV_MASTER_FORMULA_DIRECTORY
} from '../../data/davMasterOlympiadAndBoardExams.js';

export function OlympiadBoardMockSuite({
  selectedClass = 'Class 8',
  selectedSubject = 'Science',
  currentUser
}) {
  const [activeTab, setActiveTab] = useState('board_papers'); // 'board_papers' | 'olympiad_sprint' | 'formula_vault'
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('all'); // 'all' | 'A' | 'B' | 'C' | 'D' | 'E'
  const [revealedSolutions, setRevealedSolutions] = useState({});

  // Olympiad Sprint State
  const [olympiadIndex, setOlympiadIndex] = useState(0);
  const [selectedOlympiadOption, setSelectedOlympiadOption] = useState(null);
  const [showOlympiadProof, setShowOlympiadProof] = useState(false);
  const [olympiadScore, setOlympiadScore] = useState({ correct: 0, wrong: 0, streak: 0 });

  // Map user subject name to key
  const subjectKey = useMemo(() => {
    const s = selectedSubject.toLowerCase();
    if (s.includes('math')) return 'mathematics';
    if (s.includes('social') || s.includes('sst')) return 'social_science';
    if (s.includes('eng')) return 'english_literature';
    if (s.includes('hin')) return 'hindi_gyan_sagar';
    return 'science';
  }, [selectedSubject]);

  const classKey = selectedClass.replace(' ', '_');
  const classData = DAV_MASTER_BOARD_EXAMS[classKey] || DAV_MASTER_BOARD_EXAMS['Class_8'];
  const subjectExamData = classData?.subjects?.[subjectKey] || classData?.subjects?.['science'];
  const activeExamSet = subjectExamData?.examSets?.[selectedSetIndex] || subjectExamData?.examSets?.[0];

  // Filtered Olympiad questions based on subject
  const filteredOlympiadQs = useMemo(() => {
    const s = selectedSubject.toLowerCase();
    return DAV_NATIONAL_OLYMPIAD_SPRINT.filter(q =>
      q.subject.toLowerCase().includes(s.includes('math') ? 'math' : s.includes('social') ? 'social' : 'science')
    );
  }, [selectedSubject]);

  const currentOlympiadQ = filteredOlympiadQs[olympiadIndex % filteredOlympiadQs.length] || DAV_NATIONAL_OLYMPIAD_SPRINT[0];

  const handleOlympiadSubmit = (optKey) => {
    if (selectedOlympiadOption) return;
    setSelectedOlympiadOption(optKey);
    setShowOlympiadProof(true);
    const isCorrect = optKey === currentOlympiadQ.correctKey;
    setOlympiadScore(prev => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      wrong: !isCorrect ? prev.wrong + 1 : prev.wrong,
      streak: isCorrect ? prev.streak + 1 : 0
    }));
  };

  const handleNextOlympiadQ = () => {
    setSelectedOlympiadOption(null);
    setShowOlympiadProof(false);
    setOlympiadIndex(prev => prev + 1);
  };

  const toggleSolution = (qId) => {
    setRevealedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('board_papers')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 ${
              activeTab === 'board_papers'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>National Board Mock Papers (38 Qs)</span>
          </button>

          <button
            onClick={() => setActiveTab('olympiad_sprint')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 ${
              activeTab === 'olympiad_sprint'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Olympiad HOTS Sprint</span>
          </button>

          <button
            onClick={() => setActiveTab('formula_vault')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center space-x-1.5 ${
              activeTab === 'formula_vault'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Master Formula &amp; Theorem Directory</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>DAVCAE National Standards Aligned</span>
        </div>
      </div>

      {/* TAB 1: BOARD MOCK PAPERS */}
      {activeTab === 'board_papers' && activeExamSet && (
        <div className="space-y-6">
          {/* Paper Header Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {selectedClass} • {selectedSubject}
                </span>
                <h3 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>{activeExamSet.setTitle}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Full 80-Mark Sample Board Paper • 3 Hours Duration • Sections A to E with Step-Wise Marking Schemes
                </p>
              </div>

              {/* Set Selector */}
              <div className="flex items-center space-x-2">
                {subjectExamData?.examSets?.map((set, idx) => (
                  <button
                    key={set.setId}
                    onClick={() => {
                      setSelectedSetIndex(idx);
                      setRevealedSolutions({});
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedSetIndex === idx
                        ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    Set {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* General Instructions Accordion */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">
                General Instructions:
              </span>
              {activeExamSet.generalInstructions?.map((instr, i) => (
                <div key={i} className="flex items-start space-x-2 text-slate-400">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{instr}</span>
                </div>
              ))}
            </div>

            {/* Section Filters */}
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter Section:</span>
              {['all', 'A', 'B', 'C', 'D', 'E'].map(sec => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(sec)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    activeSection === sec
                      ? 'bg-white text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {sec === 'all' ? 'All Sections (38 Qs)' : `Section ${sec}`}
                </button>
              ))}
            </div>
          </div>

          {/* Section A: MCQs (1 Mark Each) */}
          {(activeSection === 'all' || activeSection === 'A') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Section A: Objective Questions &amp; MCQs</span>
                  <span className="text-slate-500 text-xs normal-case font-normal">(20 Questions • 1 Mark Each)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeExamSet.sectionA_MCQs?.map(mcq => {
                  const isRevealed = revealedSolutions[mcq.id];
                  return (
                    <div key={mcq.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold font-mono">
                          Q{mcq.qNumber} ({mcq.type})
                        </span>
                        <span className="text-slate-500 text-[11px] font-mono">{mcq.domain}</span>
                      </div>

                      <p className="text-sm font-bold text-white whitespace-pre-line">{mcq.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {mcq.options?.map((opt, i) => (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border text-left transition ${
                              isRevealed && opt.startsWith(mcq.correctAnswer)
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-slate-950 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => toggleSolution(mcq.id)}
                          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                        >
                          <span>{isRevealed ? 'Hide Model Solution' : 'View Verified Model Solution'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                        </button>
                        <span className="text-[11px] text-slate-500 font-mono">1 Mark</span>
                      </div>

                      {isRevealed && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs space-y-2 animate-fadeIn">
                          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Correct Answer: Option {mcq.correctAnswer}</span>
                          </div>
                          <p className="text-slate-300 whitespace-pre-line leading-relaxed">{mcq.stepSolution}</p>
                          <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-900">
                            <strong>Marking Scheme:</strong> {mcq.markingScheme}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section B: VSA (2 Marks Each) */}
          {(activeSection === 'all' || activeSection === 'B') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-black text-purple-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Section B: Very Short Answer (VSA)</span>
                  <span className="text-slate-500 text-xs normal-case font-normal">(5 Questions • 2 Marks Each)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeExamSet.sectionB_VSA?.map(vsa => {
                  const isRevealed = revealedSolutions[vsa.id];
                  return (
                    <div key={vsa.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold font-mono">
                          Q{vsa.qNumber} (2 Marks)
                        </span>
                        <span className="text-slate-500 text-[11px] font-mono">{vsa.domain}</span>
                      </div>
                      <p className="text-sm font-bold text-white">{vsa.question}</p>

                      <button
                        onClick={() => toggleSolution(vsa.id)}
                        className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                      >
                        <span>{isRevealed ? 'Hide Model Answer' : 'View Point-Wise Model Answer'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                      </button>

                      {isRevealed && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/40 text-xs space-y-2 animate-fadeIn">
                          <p className="text-slate-200 whitespace-pre-line leading-relaxed">{vsa.modelAnswer}</p>
                          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-900 space-y-1">
                            <span className="font-bold text-purple-300">Step-Wise Evaluator Rubric:</span>
                            {vsa.markingRubric?.map((r, i) => (
                              <div key={i}>• {r}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section C: SA (3 Marks Each) */}
          {(activeSection === 'all' || activeSection === 'C') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Section C: Short Answer (SA)</span>
                  <span className="text-slate-500 text-xs normal-case font-normal">(6 Questions • 3 Marks Each)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeExamSet.sectionC_SA?.map(sa => {
                  const isRevealed = revealedSolutions[sa.id];
                  return (
                    <div key={sa.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono">
                          Q{sa.qNumber} (3 Marks)
                        </span>
                        <span className="text-slate-500 text-[11px] font-mono">{sa.domain}</span>
                      </div>
                      <p className="text-sm font-bold text-white">{sa.question}</p>

                      <button
                        onClick={() => toggleSolution(sa.id)}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
                      >
                        <span>{isRevealed ? 'Hide Step Solution' : 'View 3-Step Solution & Pitfalls'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                      </button>

                      {isRevealed && (
                        <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs space-y-2 animate-fadeIn">
                          {sa.stepSolution?.map((step, i) => (
                            <div key={i} className="text-slate-200">
                              {step}
                            </div>
                          ))}
                          {sa.commonPitfallsToAvoid && (
                            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300">
                              ⚠️ <strong>Examiner Warning:</strong> {sa.commonPitfallsToAvoid}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section D: LA (5 Marks Each) */}
          {(activeSection === 'all' || activeSection === 'D') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-black text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Section D: Long Answer (LA) with Internal Choices</span>
                  <span className="text-slate-500 text-xs normal-case font-normal">(4 Questions • 5 Marks Each)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeExamSet.sectionD_LA?.map(la => {
                  const isRevealed = revealedSolutions[la.id];
                  return (
                    <div key={la.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold font-mono">
                          Q{la.qNumber} (5 Marks • Internal Choice Available)
                        </span>
                      </div>

                      {/* Option A */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                          Option 1: {la.optionA?.domain}
                        </span>
                        <p className="text-sm text-white font-medium whitespace-pre-line">{la.optionA?.question}</p>
                      </div>

                      <div className="text-center text-xs font-black text-slate-500 uppercase tracking-widest">— OR —</div>

                      {/* Option B */}
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400">
                          Option 2: {la.optionB?.domain}
                        </span>
                        <p className="text-sm text-white font-medium whitespace-pre-line">{la.optionB?.question}</p>
                      </div>

                      <button
                        onClick={() => toggleSolution(la.id)}
                        className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                      >
                        <span>{isRevealed ? 'Hide 5-Mark Marking Breakdown' : 'View Full 5-Mark Marking Rubrics'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                      </button>

                      {isRevealed && (
                        <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/40 text-xs space-y-3 animate-fadeIn">
                          <div>
                            <span className="font-bold text-amber-300">Model Solution (Option 1):</span>
                            <p className="text-slate-300 mt-1">{la.optionA?.modelAnswerPartA}</p>
                            <p className="text-slate-300 mt-1">{la.optionA?.modelAnswerPartB}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-800">
                            <span className="font-bold text-rose-300">Model Solution (Option 2):</span>
                            <p className="text-slate-300 mt-1">{la.optionB?.modelAnswerPartA}</p>
                            <p className="text-slate-300 mt-1">{la.optionB?.modelAnswerPartB}</p>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono pt-2 border-t border-slate-800 space-y-0.5">
                            <span className="font-bold text-white">Board Evaluator Breakdown:</span>
                            {la.markingRubric?.map((r, i) => (
                              <div key={i}>• {r}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section E: Case Studies (4 Marks Each) */}
          {(activeSection === 'all' || activeSection === 'E') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Section E: Case-Based / Source-Integrated Units</span>
                  <span className="text-slate-500 text-xs normal-case font-normal">(3 Units • 4 Marks Each)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {activeExamSet.sectionE_CaseStudy?.map(cs => {
                  const isRevealed = revealedSolutions[cs.id];
                  return (
                    <div key={cs.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold font-mono">
                          Q{cs.qNumber} (4 Marks)
                        </span>
                        <span className="text-cyan-300 font-bold">{cs.caseTitle}</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                        "{cs.caseParagraph}"
                      </div>

                      <div className="space-y-2 pt-2">
                        {cs.subQuestions?.map((subQ, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                            <div className="flex items-center justify-between text-slate-400 font-bold">
                              <span>Sub-part {subQ.subPart}</span>
                              <span className="text-amber-400 font-mono">{subQ.marks} Mark</span>
                            </div>
                            <p className="text-white font-medium">{subQ.question}</p>
                            {isRevealed && (
                              <div className="pt-2 text-emerald-300 border-t border-slate-900 text-[11px] animate-fadeIn">
                                💡 <strong>Model Answer:</strong> {subQ.answer}
                                <div className="text-[10px] text-slate-500 font-mono mt-0.5">Rubric: {subQ.rubric}</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleSolution(cs.id)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                      >
                        <span>{isRevealed ? 'Hide All Case Answers' : 'View Verified Case Study Answers'}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OLYMPIAD SPRINT */}
      {activeTab === 'olympiad_sprint' && currentOlympiadQ && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-purple-500/40 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                {currentOlympiadQ.olympiadTier}
              </span>
              <h3 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>Olympiad HOTS Practice Simulator</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Concept Domain: <strong>{currentOlympiadQ.conceptDomain}</strong> • Class 8 All-India Sprint
              </p>
            </div>

            {/* Score pill */}
            <div className="flex items-center space-x-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                ✓ {olympiadScore.correct} Solved
              </span>
              <span className="px-3 py-1 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-400 font-bold">
                ✗ {olympiadScore.wrong}
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-400 font-bold">
                ⚡ Streak: {olympiadScore.streak}
              </span>
            </div>
          </div>

          {/* Problem Card */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono font-bold text-purple-400">Question #{currentOlympiadQ.questionIndex}</span>
              <span className="text-amber-400 font-mono">+4 Marks / -1 Negative</span>
            </div>

            <p className="text-sm font-bold text-white leading-relaxed">
              {currentOlympiadQ.problemStatement}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {currentOlympiadQ.options?.map((opt, i) => {
                const optKey = opt.charAt(0);
                const isSelected = selectedOlympiadOption === optKey;
                const isCorrect = optKey === currentOlympiadQ.correctKey;

                let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-purple-500/60';
                if (selectedOlympiadOption) {
                  if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold';
                  else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-300';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleOlympiadSubmit(optKey)}
                    disabled={selectedOlympiadOption !== null}
                    className={`p-3.5 rounded-xl border text-left text-xs transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOlympiadOption && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
                    )}
                    {selectedOlympiadOption && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Shortcut Proof & Next */}
            {showOlympiadProof && (
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/50 space-y-3 animate-fadeIn text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>Olympiad Shortcut Derivation</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{currentOlympiadQ.timeManagementTip}</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-sans">{currentOlympiadQ.olympiadShortcutProof}</p>
                <p className="text-slate-400 text-[11px]">{currentOlympiadQ.extendedExplanation}</p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextOlympiadQ}
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shadow-lg flex items-center space-x-1"
                  >
                    <span>Next Olympiad Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: FORMULA & THEOREM VAULT */}
      {activeTab === 'formula_vault' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/30 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Official Board Formulas
              </span>
              <h3 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Subject Formula &amp; Theorem Directory</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Complete algebraic identities, physics equations, chemical reactions, and civics rights matrix.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(DAV_MASTER_FORMULA_DIRECTORY).map(([subId, subData]) => (
              <div key={subId} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">
                  {subData.subjectTitle}
                </h4>
                <div className="space-y-2">
                  {subData.theoremsAndFormulas?.map((f, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs space-y-1">
                      <div className="font-mono text-emerald-300 font-bold text-sm">{f.expression}</div>
                      <div className="text-slate-400 text-[11px]">{f.usageContext}</div>
                      <div className="text-[10px] text-slate-500 font-mono">✓ {f.derivationKey}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
