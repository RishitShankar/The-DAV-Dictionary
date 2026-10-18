import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, ArrowLeft, 
  HelpCircle, Sparkles, BookOpen, ChevronRight, X, Flame 
} from 'lucide-react';
import { getQuizForChapter } from '../data/quizDatabase';

export function InteractiveQuiz({ 
  classNum = 8, 
  subjectId = 'sst', 
  chapterNum = 16, 
  chapterTitle = 'Our Constitution',
  onClose,
  onAskAI
}) {
  // Retrieve quiz data from database
  const quizData = getQuizForChapter(classNum, subjectId, chapterNum);
  const questions = quizData?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (optionIndex) => {
    // If already answered this question, don't allow changing to preserve exam integrity
    if (selectedAnswers[currentIndex] !== undefined) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  // Calculate Score
  const score = questions.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="flex-1 flex flex-col bg-slate-950 text-white overflow-hidden animate-fadeIn">
      {/* Quiz Top Header Bar */}
      <div className="p-3 sm:p-4 bg-stone-900/95 border-b border-orange-500/30 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center text-amber-300">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-500/40">
                Official DAV Test Quiz
              </span>
              <span className="text-xs font-bold text-stone-300">
                Class {classNum} • {quizData.subject || subjectId.toUpperCase()}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-white truncate max-w-md">
              {quizData.chapter || chapterTitle}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <span className="text-xs font-mono font-bold text-orange-200 bg-stone-800 px-3 py-1.5 rounded-lg border border-orange-500/20">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="Exit Quiz"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Line */}
      {!isCompleted && (
        <div className="w-full bg-stone-900 h-1.5">
          <div 
            className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      )}

      {/* Quiz Content Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
        {!isCompleted ? (
          /* Active Question View */
          <div className="space-y-6">
            {/* Question Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-orange-500/30 shadow-lg">
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm flex items-center justify-center shrink-0 mt-0.5">
                  Q{currentIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {currentQ.question}
                  </h4>
                  <p className="text-xs text-orange-200/70 mt-1">
                    Select the single most accurate option according to the official DAV textbook.
                  </p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="mt-6 space-y-3">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const isAnswered = selectedAnswers[currentIndex] !== undefined;
                  const isCorrect = optIdx === currentQ.correctIndex;

                  let optionStyle = "bg-stone-950/70 hover:bg-stone-800/80 border-stone-800 text-stone-200 hover:border-orange-500/40";
                  let badge = (
                    <span className="w-7 h-7 rounded-lg bg-stone-800 border border-stone-700 text-stone-300 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  );

                  if (isAnswered) {
                    if (isCorrect) {
                      // Correct option always highlights green once answered
                      optionStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.25)]";
                      badge = (
                        <span className="w-7 h-7 rounded-lg bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center shrink-0">
                          ✓
                        </span>
                      );
                    } else if (isSelected) {
                      // Selected wrong option highlights red
                      optionStyle = "bg-rose-950/80 border-rose-500 text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.25)]";
                      badge = (
                        <span className="w-7 h-7 rounded-lg bg-rose-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                          ✕
                        </span>
                      );
                    } else {
                      optionStyle = "bg-stone-950/40 border-stone-900 text-stone-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border-2 transition-all flex items-center gap-3 text-left font-medium text-xs sm:text-sm cursor-pointer ${optionStyle} ${!isAnswered ? 'active:scale-[0.99]' : ''}`}
                    >
                      {badge}
                      <span className="flex-1">{option}</span>
                      {isAnswered && isCorrect && (
                        <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40">
                          Correct
                        </span>
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <span className="text-[11px] font-black text-rose-400 uppercase tracking-wider bg-rose-900/60 px-2 py-0.5 rounded border border-rose-500/40">
                          Incorrect
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Textbook Explanation Drawer (Appears when question is answered) */}
              {selectedAnswers[currentIndex] !== undefined && (
                <div className="mt-5 p-4 rounded-xl bg-stone-950/90 border border-orange-500/30 text-xs text-stone-200 animate-slideDown">
                  <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <span>DAV Textbook Official Explanation:</span>
                  </div>
                  <p className="leading-relaxed text-stone-300">
                    {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={handlePrev}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 disabled:hover:bg-stone-900 border border-stone-800 text-xs font-bold text-stone-300 flex items-center gap-1.5 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedAnswers[currentIndex] !== undefined && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition shadow-md cursor-pointer"
                  >
                    <span>{currentIndex === totalQuestions - 1 ? 'Finish & See Score' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Quiz Results Scorecard */
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/95 border-2 border-orange-500/50 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-stone-950 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-500/40">
                DAV Academic Assessment Completed
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                {quizData.chapter || chapterTitle}
              </h3>
              <p className="text-xs text-orange-200 mt-1">
                Class {classNum} • {quizData.subject || subjectId.toUpperCase()}
              </p>
            </div>

            {/* Scorecard Hero Box */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-stone-950 border border-orange-500/40 space-y-2">
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono">
                {score} / {totalQuestions}
              </div>
              <div className="text-sm font-bold text-stone-200">
                {percentage === 100 && '🏆 100% Century Score! Perfect Textbook Mastery!'}
                {percentage >= 80 && percentage < 100 && '🌟 80%+ Distinction! Outstanding Performance!'}
                {percentage >= 60 && percentage < 80 && '📘 60%+ First Class! Good Conceptual Foundation.'}
                {percentage < 60 && '📖 Keep Practicing! Review the chapter notes to aim for 100%.'}
              </div>
              <p className="text-xs text-stone-400">
                Correct Answers: <strong className="text-emerald-400">{score}</strong> • Mistakes: <strong className="text-rose-400">{totalQuestions - score}</strong>
              </p>
            </div>

            {/* Question Breakdown Review */}
            <div className="text-left space-y-3 pt-2">
              <h4 className="text-xs font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Review Your Answers:
              </h4>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const isRight = userAns === q.correctIndex;

                  return (
                    <div 
                      key={idx}
                      className={`p-3 rounded-xl border text-xs ${
                        isRight 
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-stone-200' 
                          : 'bg-rose-950/40 border-rose-500/40 text-stone-200'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isRight ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-bold text-white">
                            {idx + 1}. {q.question}
                          </p>
                          <p className="mt-1 text-[11px] text-stone-300">
                            Your answer: <span className={isRight ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>{q.options[userAns]}</span>
                            {!isRight && (
                              <span className="block text-emerald-300 mt-0.5">
                                Correct: <strong>{q.options[q.correctIndex]}</strong>
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs flex items-center gap-2 border border-stone-600 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => {
                  if (onAskAI) {
                    onAskAI(`Please give me comprehensive revision notes and key points for DAV Class ${classNum} ${quizData.subject || subjectId} ${quizData.chapter || chapterTitle} so I can get 100% on the quiz.`);
                  }
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-orange-950 text-orange-200 hover:text-white font-bold text-xs flex items-center gap-2 border border-orange-500/40 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Ask Shankar AI for Notes</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs transition shadow-md cursor-pointer"
              >
                <span>Back to Chat & Study</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InteractiveQuiz;
