import React, { useState } from 'react';
import { SAMPLE_CHAPTERS } from '../data/mockData';
import { Sparkles, Brain, HelpCircle, CheckCircle, ChevronDown, ChevronUp, Copy, BookOpen, Share2 } from 'lucide-react';

export function NotesAndQA({ onOpenAIWithQuestion, onSelectChapter }) {
  const [selectedSubjectKey, setSelectedSubjectKey] = useState('eng8');
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const chapters = SAMPLE_CHAPTERS[selectedSubjectKey] || [];
  const currentChapter = chapters[0] || null;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Academic Success Hub
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Chapter Summaries & Solved Q&A Bank
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          High-scoring notes prepared for DAV students with instant AI question assistance.
        </p>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: 'eng8', label: 'Class 8 English Literature' },
          { key: 'sci8', label: 'Class 8 Science (Living World)' },
          { key: 'math8', label: 'Class 8 Mathematics' },
          { key: 'ns8', label: 'Class 8 Naitik Shiksha (Vedic)' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedSubjectKey(tab.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              selectedSubjectKey === tab.key
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {chapters.length > 0 ? (
        <div className="space-y-8">
          {chapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Chapter Banner */}
              <div className="p-6 bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    Class {chapter.classNum} • {chapter.subject}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {chapter.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAIWithQuestion(`Provide a detailed summary and exam revision notes for ${chapter.title} in DAV Class ${chapter.classNum}`)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Brain className="w-4 h-4 text-slate-950" />
                    <span>AI Overview</span>
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Column: Summary & Key Revision Points */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Executive Chapter Summary
                    </h4>
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-sm text-slate-800 leading-relaxed font-normal">
                      {chapter.summary}
                    </div>
                  </div>

                  {chapter.keyPoints && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Must-Know Key Points for Exams
                      </h4>
                      <ul className="space-y-2">
                        {chapter.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right Column: Solved Q&A Bank */}
                <div className="lg:col-span-7">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-red-600" />
                      Important Solved Questions ({chapter.qa?.length || 0})
                    </h4>
                    <span className="text-xs text-slate-500">DAV Exam Standards</span>
                  </div>

                  <div className="space-y-3">
                    {chapter.qa?.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50"
                      >
                        <div className="p-4 bg-white border-b border-slate-100 flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="font-extrabold text-red-800 text-sm">Q{idx + 1}.</span>
                            <div className="text-sm font-semibold text-slate-900 leading-snug">
                              {item.q}
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(item.a, `${chapter.id}-${idx}`)}
                            className="text-slate-400 hover:text-slate-700 transition shrink-0 p-1"
                            title="Copy Answer"
                          >
                            {copiedId === `${chapter.id}-${idx}` ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <div className="p-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 whitespace-pre-line font-normal">
                          <span className="font-bold text-emerald-800 mr-1.5">Answer:</span>
                          {item.a}
                        </div>
                        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-100 flex items-center justify-end">
                          <button
                            onClick={() => onOpenAIWithQuestion(`Explain this question in more depth with examples: "${item.q}"`)}
                            className="text-[11px] font-semibold text-red-800 hover:text-red-900 flex items-center gap-1"
                          >
                            <Brain className="w-3 h-3 text-red-700" />
                            Ask AI to explain step-by-step
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
          No notes loaded for this subject yet.
        </div>
      )}

    </div>
  );
}
