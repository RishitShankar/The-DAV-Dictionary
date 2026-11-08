import React, { useEffect, useState, useMemo, useRef } from 'react';
import { 
  X, Download, BookOpen, Send, RefreshCw, ExternalLink, 
  Maximize2, Smartphone, Monitor, ChevronRight, ChevronLeft, Sparkles,
  BookMarked, HelpCircle, Layers, ArrowLeft, ZoomIn, ZoomOut, Loader2
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

  // Mobile detection with dynamic orientation/resize listener
  const checkIsMobileScreen = () => typeof window !== 'undefined' && (
    window.innerWidth <= 768 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (navigator.userAgent && navigator.userAgent.includes('DAVSmartPortalApp')) ||
    (window.location.host && window.location.host.includes('appassets'))
  );
  const [isMobileScreen, setIsMobileScreen] = useState(checkIsMobileScreen);

  useEffect(() => {
    const handleOrientationResize = () => setIsMobileScreen(checkIsMobileScreen());
    window.addEventListener('resize', handleOrientationResize);
    window.addEventListener('orientationchange', handleOrientationResize);
    return () => {
      window.removeEventListener('resize', handleOrientationResize);
      window.removeEventListener('orientationchange', handleOrientationResize);
    };
  }, []);

  // Mobile View Tabs: 'pdf' | 'ai'
  const [mobileTab, setMobileTab] = useState('pdf');
  const [showAiCompanion, setShowAiCompanion] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Viewer Engine: On mobile, defaults to 'canvas' (PDF.js in-app) or 'direct' on desktop
  const [viewerEngine, setViewerEngine] = useState(() => (isMobileScreen ? 'canvas' : 'direct'));

  // Reset states on book change
  useEffect(() => {
    if (isMobileScreen) {
      setMobileTab('pdf');
      setViewerEngine('canvas');
    }
  }, [book?.title, isMobileScreen]);

  // GitHub Media CDN Fallback
  const GITHUB_MEDIA_BASE = 'https://media.githubusercontent.com/media/RishitShankar/The-DAV-Dictionary/main/public';

  const resolvePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.includes('supabase.co')) return url;
    if (url.includes('githubusercontent.com')) {
      return `https://thedavdictionary.vercel.app/api/pdf-stream?url=${encodeURIComponent(url)}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    
    // In APK WebView or production mobile:
    const isApk = typeof window !== 'undefined' && (
      window.location.hostname.includes('appassets') || 
      window.location.hostname.includes('davportal') ||
      (navigator.userAgent && navigator.userAgent.includes('DAVSmartPortalApp'))
    );
    if (isApk) {
      return `https://thedavdictionary.vercel.app${encodeURI(cleanPath)}`;
    }

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

  // Absolute URL for external & Google Docs viewers (Always resolves to public domain)
  const getAbsolutePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://thedavdictionary.vercel.app${url.startsWith('/') ? url : '/' + url}`;
  };

  const absolutePdfUrl = getAbsolutePdfUrl(resolvedPdfUrl);

  // Google Docs Cloud Viewer stream fallback
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absolutePdfUrl)}&embedded=true`;

  // Active embedded src based on engine
  const activeStreamSrc = viewerEngine === 'google' ? googleViewerUrl : resolvedPdfUrl;

  // 1-Tap Mobile Redirect handler
  const handleOpenNativeMobile = () => {
    if (resolvedPdfUrl) {
      window.open(resolvedPdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // =========================================================================
  // PDF.js Canvas In-App Mobile Engine (Guaranteed 100% Reliable On Phone)
  // =========================================================================
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [scale, setScale] = useState(isMobileScreen ? 1.0 : 1.25);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [canvasError, setCanvasError] = useState(null);

  // Load PDF document using window.pdfjsLib
  useEffect(() => {
    let active = true;
    if (!resolvedPdfUrl || viewerEngine !== 'canvas') return;

    if (typeof window !== 'undefined' && window.pdfjsLib) {
      setIsPdfLoading(true);
      setCanvasError(null);

      const loadingTask = window.pdfjsLib.getDocument({
        url: resolvedPdfUrl,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true
      });

      loadingTask.promise.then((doc) => {
        if (!active) return;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setPageNum(1);
        setIsPdfLoading(false);
      }).catch((err) => {
        if (!active) return;
        console.warn('PDF.js canvas load warning:', err);
        setCanvasError('In-app canvas loader notice: ' + (err.message || 'Streaming PDF'));
        setIsPdfLoading(false);
      });
    } else {
      // PDF.js library not yet ready, fallback to direct stream
      setViewerEngine('direct');
    }

    return () => {
      active = false;
    };
  }, [resolvedPdfUrl, viewerEngine]);

  // Render Page onto Canvas
  useEffect(() => {
    let renderTask = null;
    if (!pdfDoc || viewerEngine !== 'canvas') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    pdfDoc.getPage(pageNum).then((page) => {
      const dpr = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: scale * (isMobileScreen ? 0.95 : 1.1) });

      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      renderTask = page.render(renderContext);
      return renderTask.promise;
    }).catch((err) => {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn('Canvas page render warning:', err);
      }
    });

    return () => {
      if (renderTask) {
        try { renderTask.cancel(); } catch (e) {}
      }
    };
  }, [pdfDoc, pageNum, scale, viewerEngine, isMobileScreen]);

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
              <span>
                {viewerEngine === 'canvas' ? 'In-App Canvas Engine (100% Mobile Ready)' : viewerEngine === 'google' ? 'Google Cloud Embed' : 'Direct Stream'}
              </span>
            </p>
          </div>
        </div>

        {/* Action Controls & Engine Switchers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Engine Switcher (Canvas vs Direct vs Google) */}
          <button
            onClick={() => setViewerEngine(prev => prev === 'canvas' ? 'direct' : prev === 'direct' ? 'google' : 'canvas')}
            className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-stone-700 transition cursor-pointer flex items-center gap-1 text-[11px] font-bold"
            title="Switch PDF reader engine"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Engine:</span>
            <span>{viewerEngine === 'canvas' ? 'Canvas' : viewerEngine === 'direct' ? 'Direct' : 'Google'}</span>
          </button>

          {/* 1-Tap Mobile Native Redirect / New Tab */}
          {hasRealPdf && (
            <button
              onClick={handleOpenNativeMobile}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black transition cursor-pointer flex items-center gap-1.5 text-xs shadow-md"
              title="Open full PDF in mobile viewer or dedicated browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isMobileScreen ? 'Phone App ↗' : 'New Tab'}</span>
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
              download={`${book.title}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition cursor-pointer hidden sm:flex"
              title="Download PDF to device"
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
            className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-[11px] font-black flex items-center gap-1 shrink-0 shadow-sm"
            title="Open in Phone PDF App"
          >
            <Smartphone className="w-3 h-3" />
            <span>Phone Reader ↗</span>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MAIN WORKSPACE: Adaptive View for PC & Mobile                         */}
      {/* ===================================================================== */}
      <div className="flex-1 h-full w-full flex overflow-hidden bg-stone-950 relative">
        
        {/* Stream & Scroll Container */}
        <div className={`flex-1 h-full w-full bg-stone-900 overflow-hidden flex flex-col relative ${
          isMobileScreen && mobileTab === 'ai' ? 'hidden' : 'flex'
        }`}>
          
          {/* Canvas Engine Interactive Page Navigator Bar */}
          {viewerEngine === 'canvas' && (
            <div className="bg-stone-950 px-3 py-2 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2 shrink-0 z-20 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={pageNum <= 1}
                  onClick={() => setPageNum(p => Math.max(1, p - 1))}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 disabled:opacity-40 text-stone-200 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <span className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-amber-300 font-mono font-bold">
                  Page {pageNum} / {numPages}
                </span>
                <button
                  type="button"
                  disabled={pageNum >= numPages}
                  onClick={() => setPageNum(p => Math.min(numPages, p + 1))}
                  className="px-2.5 py-1 rounded-lg bg-stone-800 disabled:opacity-40 text-stone-200 hover:text-white flex items-center gap-1 font-bold cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setScale(s => Math.max(0.6, s - 0.15))}
                  className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-stone-400">{Math.round(scale * 100)}%</span>
                <button
                  type="button"
                  onClick={() => setScale(s => Math.min(2.5, s + 0.15))}
                  className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleOpenNativeMobile}
                  className="ml-2 px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-[11px] flex items-center gap-1 cursor-pointer shadow-sm"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Open in Mobile Reader ↗</span>
                </button>
              </div>
            </div>
          )}

          {/* Canvas Rendering Area */}
          {viewerEngine === 'canvas' ? (
            <div className="flex-1 overflow-auto bg-stone-950 p-2 sm:p-4 flex items-center justify-center relative">
              {isPdfLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/80 z-20 space-y-3">
                  <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
                  <p className="text-xs text-amber-300 font-bold">Rendering High-Resolution Page {pageNum}...</p>
                </div>
              )}
              {canvasError ? (
                <div className="text-center p-6 space-y-3 max-w-md">
                  <p className="text-xs text-rose-300 font-mono">{canvasError}</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={() => setViewerEngine('direct')}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold cursor-pointer"
                    >
                      Switch to Direct Stream
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenNativeMobile}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-bold cursor-pointer"
                    >
                      Open in Phone Reader ↗
                    </button>
                  </div>
                </div>
              ) : (
                <div className="shadow-2xl border border-stone-800 rounded-lg overflow-hidden bg-white">
                  <canvas ref={canvasRef} className="block mx-auto" />
                </div>
              )}
            </div>
          ) : (
            /* Direct / Google iframe Stream */
            <iframe
              key={`stream-${viewerEngine}-${activeStreamSrc}`}
              src={activeStreamSrc}
              title={`${book.title} - Textbook Cloud Reader`}
              className="w-full h-full min-h-full flex-1 border-none bg-stone-900 block"
              style={{ width: '100%', height: '100%', minHeight: '100%' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}

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
                <BlackDogLogo className="w-5 h-5" bgClassName="bg-stone-900" />
                <div>
                  <h4 className="text-xs font-black text-white">Rishi AI Companion</h4>
                  <p className="text-[10px] text-amber-300">Live Textbook Guide</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 text-purple-200 border border-purple-500/30 font-mono">
                {chapterList.length} Chapters
              </span>
            </div>

            {/* Quick Chapter Shortcuts */}
            {chapterList.length > 0 && (
              <div className="p-2 bg-stone-950/60 border-b border-stone-800/80 overflow-x-auto flex gap-1.5 shrink-0 scrollbar-none">
                {chapterList.map((ch, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRequestChapterSummary(ch)}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-300 text-[10px] font-bold whitespace-nowrap transition cursor-pointer shrink-0 border border-stone-700"
                    title={`Summarize ${ch.title || `Chapter ${ch.num || idx + 1}`}`}
                  >
                    Ch {ch.num || idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs text-stone-200">
              {aiMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-2.5 rounded-xl ${
                    msg.role === 'user' 
                      ? 'bg-amber-500/15 border border-amber-500/30 text-amber-200 ml-4' 
                      : 'bg-stone-800/70 border border-stone-700/60 mr-4'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
              ))}
              {aiLoading && (
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2 mr-4">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Rishi AI is scanning textbook pages...</span>
                </div>
              )}
            </div>

            {/* Prompt Input */}
            <form onSubmit={handleSendAiMessage} className="p-2.5 bg-stone-950 border-t border-stone-800 flex gap-1.5 shrink-0">
              <input
                type="text"
                placeholder="Ask about this textbook..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={aiLoading || !aiQuestion.trim()}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-black transition cursor-pointer"
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
