import React, { useEffect, useState, useMemo } from 'react';
import { 
  X, Download, BookOpen, Send, RefreshCw, ExternalLink, 
  Maximize2, Smartphone, Monitor, ChevronRight, Sparkles, 
  BookMarked, HelpCircle, Layers, ArrowLeft
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
import { askRishiAI } from '../services/geminiService';
import { getChaptersForClassSubject } from '../data/curriculumData';
import { getPrecomputedSummary } from '../data/davChapterSummaries.js';

export function PdfReaderModal(props) {
  if (!props.isOpen || !props.book) return null;
  return <PdfReaderModalInner {...props} />;
}

function PdfReaderModalInner({ isOpen, onClose, book, onOpenAIWithQuestion, currentUser }) {
  // Prevent background scroll and allow Escape key dismissal
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Mobile detection
  const isMobileScreen = typeof window !== 'undefined' && (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.userAgent && navigator.userAgent.includes('DAVSmartPortalApp')) ||
    (window.location.host && window.location.host.includes('appassets'))
  );

  // Mobile View Tabs: 'pdf' | 'ai'
  const [mobileTab, setMobileTab] = useState('pdf');
  const [showAiCompanion, setShowAiCompanion] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Viewer Engine: On mobile, Google Cloud viewer embeds seamlessly inside iframe without Android blank screen!
  // On desktop, Direct Stream delivers Chrome's native PDFium experience.
  const [viewerEngine, setViewerEngine] = useState(() => (isMobileScreen ? 'google' : 'direct'));

  // Reset states on book change
  useEffect(() => {
    if (isMobileScreen) {
      setMobileTab('pdf');
      setViewerEngine('google');
    }
  }, [book?.title, isMobileScreen]);

  // Unconditional inner render guarantees constant hook order

  // GitHub Media CDN Fallback
  const GITHUB_MEDIA_BASE = 'https://media.githubusercontent.com/media/RishitShankar/The-DAV-Dictionary/main/public';

  const resolvePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;

    if (url.includes('supabase.co')) {
      return url;
    }

    if (url.includes('githubusercontent.com')) {
      return `/api/pdf-stream?url=${encodeURIComponent(url)}`;
    }

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    
    const isVercelOrProduction = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('dav-dictionary') ||
      window.location.hostname.includes('davdictionary') ||
      window.location.protocol === 'https:'
    );

    if (isVercelOrProduction && cleanPath.startsWith('/books/')) {
      const fullGhUrl = `${GITHUB_MEDIA_BASE}${encodeURI(cleanPath)}`;
      return `/api/pdf-stream?url=${encodeURIComponent(fullGhUrl)}`;
    }

    return encodeURI(cleanPath);
  };

  const rawSource = book.pdfUrl || book.fileData || '';
  const resolvedPdfUrl = resolvePdfUrl(rawSource);
  const hasRealPdf = Boolean(rawSource);

  // Absolute URL for external & Google Docs viewers
  const getAbsolutePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${url.startsWith('/') ? url : '/' + url}`;
    }
    return `https://thedavdictionary.vercel.app${url.startsWith('/') ? url : '/' + url}`;
  };

  const absolutePdfUrl = getAbsolutePdfUrl(resolvedPdfUrl);

  // Google Docs Cloud Viewer stream (Guaranteed to render PDF pages on mobile Android & iOS)
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`;

  // Active embedded src based on engine
  const activeStreamSrc = viewerEngine === 'google' ? googleViewerUrl : resolvedPdfUrl;

  // 1-Tap Mobile Redirect handler
  const handleOpenNativeMobile = () => {
    if (resolvedPdfUrl) {
      window.open(resolvedPdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Subject Key & Chapters
  const getSubjectKey = (title = '', subject = '') => {
    const s = `${title} ${subject}`.toLowerCase();
    if (s.includes('science') || s.includes('living world')) return 'science';
    if (s.includes('social') || s.includes('world') || s.includes('sst') || s.includes('history') || s.includes('civics') || s.includes('geography')) return 'sst';
    if (s.includes('math') || s.includes('ganit') || s.includes('secondary mathematics') || s.includes('primary mathematics')) return 'maths';
    if (s.includes('hindi') || s.includes('gyan') || s.includes('abhyas') || s.includes('bhasha')) return 'hindi';
    if (s.includes('english') || s.includes('literature') || s.includes('reader')) return 'english';
    return null;
  };

  const subjectKey = getSubjectKey(book?.title, book?.subject);
  
  const chapterList = useMemo(() => {
    if (!book) return [];
    const cls = book.classNum || 8;
    const subj = book.title || book.subject || '';
    const list = getChaptersForClassSubject(cls, subj);
    return Array.isArray(list) ? list : [];
  }, [book?.classNum, book?.title, book?.subject]);

  // Rishi AI State
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `👋 I am your **Rishi AI Textbook Guide** for **"${book.title}"** (Class ${book.classNum || 8}). Ask me any questions, definitions, formulas, or exam problems from this book!`
    }
  ]);

  const handleRequestChapterSummary = async (ch) => {
    if (aiLoading) return;
    const chNum = ch?.num || ch?.number || 1;
    const chTitle = ch?.title || `Chapter ${chNum}`;

    setAiMessages(prev => [
      ...prev, 
      { role: 'user', text: `📝 **Summarize Chapter ${chNum}: ${chTitle}**` }
    ]);
    setAiLoading(true);

    const precomputed = getPrecomputedSummary(subjectKey, chNum);
    if (precomputed) {
      setTimeout(() => {
        setAiMessages(prev => [...prev, { role: 'assistant', text: precomputed }]);
        setAiLoading(false);
      }, 300);
      return;
    }

    try {
      const prompt = `Summarize Chapter ${chNum}: "${chTitle}" from DAV Class ${book.classNum || 8} textbook with core concepts, formulas, and 3 high-yield DAV board exam questions.`;
      const response = await askRishiAI(prompt, {
        classNum: book.classNum || 8,
        subject: book.title || book.subject || 'Textbook',
        chapter: chNum,
        chapterTitle: chTitle,
        actionType: 'summary'
      });

      const cleanText = (response && typeof response === 'object' && response.text)
        ? response.text
        : (typeof response === 'string' ? response : JSON.stringify(response));

      setAiMessages(prev => [...prev, { role: 'assistant', text: cleanText }]);
    } catch (err) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Error generating summary for Chapter ${chNum}: ${chTitle}. Please try asking again!`
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
      const matchedCh = chapterList.find(c => {
        const titleMatch = c.title && q.toLowerCase().includes(c.title.toLowerCase());
        const numMatch = q.match(/chapter\s*(\d+)/i);
        return titleMatch || (numMatch && (c.num === Number(numMatch[1]) || c.number === Number(numMatch[1])));
      });

      const prompt = `Student Question about DAV Class ${book.classNum || 8} "${book.title}": "${q}". Provide a comprehensive, accurate textbook answer with formulas and bullet points so the student can score 100% in DAV exams.`;
      const response = await askRishiAI(prompt, {
        classNum: book.classNum || 8,
        subject: book.title || book.subject || 'General',
        chapter: matchedCh ? (matchedCh.num || matchedCh.number) : undefined,
        chapterTitle: matchedCh ? matchedCh.title : undefined,
        actionType: matchedCh ? 'summary' : undefined
      });

      const cleanText = (response && typeof response === 'object' && response.text)
        ? response.text
        : (typeof response === 'string' ? response : JSON.stringify(response));

      setAiMessages(prev => [...prev, { role: 'assistant', text: cleanText }]);
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
      
      {/* ===================================================================== */}
      {/* TOP HEADER: UNIFIED ACROSS PC & MOBILE WITH 100% RESPONSIVE CONTROLS  */}
      {/* ===================================================================== */}
      <header className="p-2 sm:p-2.5 bg-stone-900 border-b border-orange-500/40 text-white flex items-center justify-between flex-wrap gap-2 shrink-0 z-40">
        
        {/* Book Title & School Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition cursor-pointer sm:hidden"
            title="Back / Close"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 border border-amber-400 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md">
            DAV
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-xs sm:text-sm text-white truncate max-w-[170px] sm:max-w-xs md:max-w-md">
                {book.title}
              </h3>
              <span className="text-[10px] bg-stone-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                Class {book.classNum || 8}
              </span>
            </div>
            <p className="text-[10px] text-orange-200/80 truncate flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{viewerEngine === 'google' ? 'Google Cloud Reader (Mobile Active)' : 'Direct Stream Active'}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Engine Switchers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Engine Switcher (Google Docs Cloud vs Direct Stream) */}
          <button
            onClick={() => setViewerEngine(prev => prev === 'google' ? 'direct' : 'google')}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-stone-700 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
            title={viewerEngine === 'google' ? 'Switch to Direct Stream' : 'Switch to Google Docs Cloud Viewer'}
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Engine:</span>
            <span>{viewerEngine === 'google' ? 'Google Cloud' : 'Direct'}</span>
          </button>

          {/* 1-Tap Mobile Native Redirect / New Tab */}
          {hasRealPdf && (
            <button
              onClick={handleOpenNativeMobile}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black transition cursor-pointer flex items-center gap-1.5 text-xs shadow-md"
              title="Open full PDF in mobile viewer or dedicated browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isMobileScreen ? 'Mobile View' : 'New Tab'}</span>
            </button>
          )}

          {/* PC AI Companion Toggle */}
          <button
            onClick={() => {
              if (isMobileScreen) {
                setMobileTab(prev => prev === 'ai' ? 'pdf' : 'ai');
              } else {
                setShowAiCompanion(prev => !prev);
              }
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
              (isMobileScreen ? mobileTab === 'ai' : showAiCompanion)
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-orange-500/40'
            }`}
            title="Toggle Rishi AI Companion"
          >
            <BlackDogLogo className="w-3.5 h-3.5" bgClassName="bg-stone-950" />
            <span className="hidden sm:inline">AI Guide</span>
          </button>

          {/* Download Button */}
          {hasRealPdf && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
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

      {/* ===================================================================== */}
      {/* MOBILE SEGMENTED BAR: Switch between PDF Canvas & Rishi AI Companion  */}
      {/* ===================================================================== */}
      {isMobileScreen && (
        <div className="bg-stone-900 px-3 py-1.5 border-b border-stone-800 flex items-center justify-between gap-2 shrink-0 sm:hidden">
          <div className="flex-1 grid grid-cols-2 gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-800">
            <button
              onClick={() => setMobileTab('pdf')}
              className={`py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 ${
                mobileTab === 'pdf'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Textbook</span>
            </button>
            <button
              onClick={() => setMobileTab('ai')}
              className={`py-1.5 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 ${
                mobileTab === 'ai'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <BlackDogLogo className="w-3.5 h-3.5" bgClassName="bg-stone-900" />
              <span>AI Guide ({chapterList.length} Ch)</span>
            </button>
          </div>

          <button
            onClick={handleOpenNativeMobile}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-amber-300 text-[11px] font-bold flex items-center gap-1 shrink-0"
            title="Open Fullscreen in External Mobile Viewer"
          >
            <Maximize2 className="w-3 h-3 text-amber-400" />
            <span>Fullscreen</span>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MAIN WORKSPACE: Adaptive View for PC & Mobile                         */}
      {/* ===================================================================== */}
      <div className="flex-1 h-full w-full flex overflow-hidden bg-stone-950 relative">
        
        {/* Stream & Scroll Container (Continuous Vertical Scroll) */}
        <div className={`flex-1 h-full w-full bg-stone-900 overflow-hidden flex flex-col relative ${
          isMobileScreen && mobileTab === 'ai' ? 'hidden' : 'flex'
        }`}>
          {/* Top Quick Engine Tip on Mobile */}
          {isMobileScreen && (
            <div className="px-3 py-1 bg-stone-950/80 border-b border-stone-800 flex items-center justify-between text-[10px] text-stone-400">
              <span className="truncate">
                Using <strong>{viewerEngine === 'google' ? 'Google Cloud Embed' : 'Direct Stream'}</strong>
              </span>
              <button
                onClick={handleOpenNativeMobile}
                className="text-amber-400 font-bold underline ml-2"
              >
                Tap for Android Reader ↗
              </button>
            </div>
          )}

          <iframe
            key={`stream-${viewerEngine}-${activeStreamSrc}`}
            src={activeStreamSrc}
            title={`${book.title} - Textbook Cloud Reader`}
            className="w-full h-full min-h-full flex-1 border-none bg-stone-900 block"
            style={{ width: '100%', height: '100%', minHeight: '100%' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Rishi AI Guide Sidebar / Mobile Full Screen */}
        {((isMobileScreen && mobileTab === 'ai') || (!isMobileScreen && showAiCompanion)) && (
          <aside className={`${
            isMobileScreen 
              ? 'w-full h-full flex-1' 
              : 'w-80 sm:w-88 md:w-96 border-l border-stone-800'
          } bg-stone-900 flex flex-col shrink-0 z-30 shadow-2xl`}>
            
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
                    Live tutor for {book.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (isMobileScreen) setMobileTab('pdf');
                  else setShowAiCompanion(false);
                }}
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
                  <div className="whitespace-pre-wrap font-sans leading-relaxed">
                    {typeof msg.text === 'object' ? (msg.text?.text || JSON.stringify(msg.text)) : String(msg.text || '')}
                  </div>
                </div>
              ))}

              {aiLoading && (
                <div className="p-3 rounded-xl bg-stone-800/90 text-amber-300 border border-amber-500/30 flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span className="text-[11px] font-semibold">Preparing textbook intelligence...</span>
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
                  <span className="text-stone-400 font-mono text-[9px]">Tap to Summarize</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {chapterList.map((ch, idx) => {
                    const cNum = ch.num || ch.number || (idx + 1);
                    return (
                      <button
                        key={cNum}
                        type="button"
                        onClick={() => handleRequestChapterSummary(ch)}
                        disabled={aiLoading}
                        className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 font-mono text-[10px] font-bold whitespace-nowrap transition cursor-pointer shrink-0 disabled:opacity-40"
                        title={`Ch ${cNum}: ${ch.title}`}
                      >
                        Ch {cNum}
                      </button>
                    );
                  })}
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
                className="flex-1 px-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiQuestion.trim()}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 disabled:opacity-40 transition cursor-pointer shrink-0"
                title="Send Question"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </aside>
        )}

      </div>

    </div>
  );
}

export default PdfReaderModal;
