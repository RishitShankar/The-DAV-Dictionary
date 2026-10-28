import React, { useState } from 'react';
import { 
  X, Download, BookOpen, Send, RefreshCw, ExternalLink 
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
import { askRishiAI } from '../services/geminiService';
import { DAV_CLASS_8_SYLLABUS_INDEX } from '../data/davTextbookDatabase.js';
import { getPrecomputedSummary } from '../data/davChapterSummaries.js';

export function PdfReaderModal({ isOpen, onClose, book, onOpenAIWithQuestion, currentUser }) {
  if (!isOpen || !book) return null;

  const [showAiCompanion, setShowAiCompanion] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // GitHub Media CDN Fallback: Guarantees full binary PDFs are served without Git LFS 133-byte pointer issues
  const GITHUB_MEDIA_BASE = 'https://media.githubusercontent.com/media/RishitShankar/The-DAV-Dictionary/main/public';

  const resolvePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    
    // In production on Vercel or HTTPS, route /books/ to GitHub Media CDN for direct byte-range access
    const isVercelOrProduction = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('dav-dictionary') ||
      window.location.hostname.includes('davdictionary') ||
      window.location.protocol === 'https:'
    );

    if (isVercelOrProduction && cleanPath.startsWith('/books/')) {
      return `${GITHUB_MEDIA_BASE}${encodeURI(cleanPath)}`;
    }

    return encodeURI(cleanPath);
  };

  const rawSource = book.pdfUrl || book.fileData || '';
  const resolvedPdfUrl = resolvePdfUrl(rawSource);
  const hasRealPdf = Boolean(rawSource);

  // Chapter Index & Syllabus Grounding for Active Book
  const getSubjectKey = (title = '', subject = '') => {
    const s = `${title} ${subject}`.toLowerCase();
    if (s.includes('science') || s.includes('living world')) return 'science';
    if (s.includes('social') || s.includes('world') || s.includes('sst') || s.includes('history') || s.includes('civics') || s.includes('geography')) return 'sst';
    if (s.includes('math') || s.includes('ganit') || s.includes('secondary mathematics')) return 'maths';
    if (s.includes('hindi') || s.includes('gyan') || s.includes('abhyas')) return 'hindi';
    if (s.includes('english') || s.includes('literature') || s.includes('reader')) return 'english';
    return null;
  };

  const subjectKey = getSubjectKey(book?.title, book?.subject);
  const chapterList = (subjectKey && DAV_CLASS_8_SYLLABUS_INDEX[subjectKey]?.chapters) || [];

  // Rishi AI Textbook Companion State
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `👋 I am your **Rishi AI Textbook Guide** for **"${book.title}"** (Class ${book.classNum || 8}). Ask me any questions, definitions, or exam problems from this book!`
    }
  ]);

  const handleRequestChapterSummary = async (ch) => {
    if (aiLoading) return;
    setAiMessages(prev => [
      ...prev, 
      { role: 'user', text: `📝 **Summarize Chapter ${ch.num}: ${ch.title}**` }
    ]);
    setAiLoading(true);

    const precomputed = getPrecomputedSummary(subjectKey, ch.num);
    if (precomputed) {
      setTimeout(() => {
        setAiMessages(prev => [...prev, { role: 'assistant', text: precomputed }]);
        setAiLoading(false);
      }, 350);
      return;
    }

    try {
      const prompt = `You are Rishi AI, the official DAV Public School academic intelligence companion.
Generate a comprehensive, curriculum-exact, 10-point revision summary for DAV Class ${book.classNum || 8} ${book.title}, Chapter ${ch.num}: "${ch.title}".

Structure your response with:
1. 📌 Chapter Overview & Central Theme
2. 💡 5 Core Academic Concepts & Principles
3. 📐 Important Definitions, Formulas & Terminology
4. 🎯 Top 3 Board Exam Questions with Model Answers
Write with clear markdown formatting for quick student exam revision.`;
      const response = await askRishiAI(prompt);
      setAiMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Error generating summary for Chapter ${ch.num}: ${ch.title}. Please try asking again!`
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendAiMessage = async (e) => {
    e?.preventDefault();
    const q = aiQuestion.trim();
    if (!q || aiLoading) return;

    setAiMessages(prev => [...prev, { role: 'user', text: q }]);
    setAiQuestion('');
    setAiLoading(true);

    try {
      const prompt = `You are Rishi AI, the school learning assistant for DAV Public School students. The student is reading the textbook "${book.title}" (Class ${book.classNum || 8}, Subject: ${book.subject || 'General'}). Question: "${q}". Provide a helpful, concise, curriculum-accurate answer based on the official DAV Board syllabus.`;
      const response = await askRishiAI(prompt);
      setAiMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Error retrieving book intelligence. Please try asking again!'
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen flex flex-col bg-stone-950 overflow-hidden font-sans select-none">
      
      {/* Top Header Bar */}
      <header className="p-2 sm:p-2.5 bg-stone-900 border-b border-orange-500/40 text-white flex items-center justify-between flex-wrap gap-2 shrink-0 z-40">
        
        {/* Book Title & School Badge */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center text-amber-300 font-extrabold text-xs shrink-0">
            DAV
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                {book.title}
              </h3>
              <span className="text-[10px] bg-stone-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                Class {book.classNum || 8}
              </span>
            </div>
            <p className="text-[10px] text-orange-200/80 truncate flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Instant Continuous Stream • Vertical Scroll Active</span>
            </p>
          </div>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Open in Dedicated Browser Tab */}
          {hasRealPdf && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-stone-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
              title="Open stream in dedicated browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
          )}

          {/* AI Guide Toggle */}
          <button
            onClick={() => setShowAiCompanion(!showAiCompanion)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
              showAiCompanion
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-orange-500/40'
            }`}
            title="Toggle Rishi AI Guide"
          >
            <BlackDogLogo className="w-3.5 h-3.5" bgClassName="bg-stone-950" />
            <span className="hidden sm:inline">AI Guide</span>
          </button>

          {/* Dedicated Download Button */}
          {hasRealPdf && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noreferrer"
              download={`${book.title}.pdf`}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title="Download textbook copy"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          {/* Close Modal */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="Close Fullscreen Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* Main Workspace Split: Stream & Scroll Viewer + Optional AI Sidebar */}
      <div className="flex-1 flex overflow-hidden bg-stone-950 relative">
        
        {/* Stream & Scroll Container (Continuous Vertical Scroll) */}
        <div className="flex-1 h-full bg-stone-900 overflow-hidden flex flex-col relative">
          <object
            data={resolvedPdfUrl}
            type="application/pdf"
            className="w-full flex-1 border-none bg-stone-900 block"
          >
            <iframe
              key={`stream-${resolvedPdfUrl}`}
              src={`${resolvedPdfUrl}#toolbar=1`}
              title={`${book.title} - Textbook Continuous Stream`}
              className="w-full flex-1 border-none bg-stone-900 block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            >
              <div className="p-8 text-center text-white flex flex-col items-center justify-center h-full">
                <p className="text-sm font-bold text-amber-300 mb-3">Direct PDF Stream</p>
                <a
                  href={resolvedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-black text-xs"
                >
                  Click here to Open Fullscreen PDF
                </a>
              </div>
            </iframe>
          </object>
        </div>

        {/* Right: Collapsible Rishi AI Guide Sidebar */}
        {showAiCompanion && (
          <aside className="w-80 sm:w-88 md:w-96 bg-stone-900 border-l border-stone-800 flex flex-col shrink-0 z-30 shadow-2xl">
            {/* AI Header */}
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BlackDogLogo className="w-4 h-4" bgClassName="bg-amber-500" />
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>Rishi AI Textbook Guide</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-amber-300/80">
                    Live assistant for {book.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiCompanion(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* AI Messages Stream */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-amber-500 text-stone-950 font-bold ml-6 rounded-tr-sm'
                      : 'bg-stone-800/90 text-stone-200 mr-4 rounded-tl-sm border border-stone-700/60 leading-relaxed'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="p-3 rounded-xl bg-stone-800/90 text-amber-300 border border-amber-500/30 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span className="text-[11px] font-semibold">Preparing answer...</span>
                </div>
              )}
            </div>

            {/* Chapter Summary Selector (All Chapters for this Book) */}
            {chapterList.length > 0 && (
              <div className="p-2 border-t border-stone-800 bg-stone-950 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-amber-300 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>Chapter Summaries ({chapterList.length} Chapters):</span>
                  </span>
                  <span className="text-stone-400 font-mono text-[9px]">Click for Summary</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
                  {chapterList.map((ch) => (
                    <button
                      key={ch.num}
                      type="button"
                      onClick={() => handleRequestChapterSummary(ch)}
                      disabled={aiLoading}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 font-mono text-[10px] font-bold whitespace-nowrap transition cursor-pointer shrink-0 disabled:opacity-40"
                      title={`Ch ${ch.num}: ${ch.title}`}
                    >
                      Ch {ch.num}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Suggestions */}
            <div className="p-2 border-t border-stone-800 bg-stone-950 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              <button
                type="button"
                onClick={() => {
                  if (chapterList.length > 0) {
                    handleRequestChapterSummary(chapterList[0]);
                  } else {
                    setAiQuestion('Summarize the key points and definitions of this chapter.');
                  }
                }}
                disabled={aiLoading}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer disabled:opacity-40"
              >
                📝 Full Book Summary
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiQuestion('What are 3 important 5-mark exam questions from this textbook?');
                }}
                disabled={aiLoading}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer disabled:opacity-40"
              >
                🎯 5-Mark Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiQuestion('Give me 5 rapid-fire practice MCQs with answers from this syllabus.');
                }}
                disabled={aiLoading}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer disabled:opacity-40"
              >
                ⚡ Practice MCQs
              </button>
            </div>

            {/* AI Chat Input Form */}
            <form onSubmit={handleSendAiMessage} className="p-2.5 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask any question about this textbook..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                disabled={aiLoading}
                className="flex-1 px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!aiQuestion.trim() || aiLoading}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </aside>
        )}

      </div>

    </div>
  );
}
