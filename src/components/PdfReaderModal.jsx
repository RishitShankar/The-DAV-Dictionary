import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, Download, BookOpen, Sparkles, 
  Send, Navigation, RefreshCw, ChevronRight, ChevronLeft,
  ExternalLink, FileText, Check, Link, Globe,
  PenTool, Highlighter, Eraser, Save, Trash2, MousePointer,
  ZoomIn, ZoomOut, Maximize2, List, Layers, RotateCcw
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
import { GoogleDriveIcon } from './GoogleDriveIcon';
import { askRishiAI } from '../services/geminiService';
import { saveCloudPdfAnnotation, loadCloudPdfAnnotation } from '../services/supabaseClient';

// DAV Chapter-to-Page Index Guide for automatic AI navigation & quick jumping
const DAV_PAGE_INDEX = {
  // Class 8 Social Science
  'social-science': [
    { ch: 1, name: 'Resources: Utilization and Development', page: 1 },
    { ch: 2, name: 'Natural Resources: Land, Soil and Water', page: 9 },
    { ch: 3, name: 'Natural Vegetation and Wildlife Resources', page: 25 },
    { ch: 4, name: 'Mineral and Energy Resources', page: 37 },
    { ch: 5, name: 'Agriculture', page: 53 },
    { ch: 6, name: 'Manufacturing Industries', page: 69 },
    { ch: 7, name: 'Human Resources', page: 83 },
    { ch: 8, name: 'The Modern Period', page: 95 },
    { ch: 9, name: 'Establishment of Company Rule in India', page: 104 },
    { ch: 10, name: 'Colonialism: Rural and Tribal Societies', page: 119 },
    { ch: 11, name: 'The First War of Independence - 1857', page: 132 },
    { ch: 12, name: 'Impact of British Rule on India', page: 147 },
    { ch: 13, name: 'Colonialism and Urban Change', page: 159 },
    { ch: 14, name: 'The Nationalist Movement (1870–1947)', page: 171 },
    { ch: 15, name: 'India After Independence', page: 185 },
    { ch: 16, name: 'Our Constitution', page: 195 },
    { ch: 17, name: 'Fundamental Rights, Duties and Directive Principles', page: 206 },
    { ch: 18, name: 'The Union Legislature', page: 218 },
    { ch: 19, name: 'The Union Executive', page: 230 },
    { ch: 20, name: 'The Judiciary', page: 241 },
    { ch: 21, name: 'Social Justice and the Marginalised', page: 252 },
    { ch: 22, name: 'Safeguarding the Marginalised', page: 262 }
  ],
  // Class 8 Science
  'science': [
    { ch: 1, name: 'The Cell - Its Structure and Functions', page: 1 },
    { ch: 2, name: 'Microorganisms: Friend and Foe', page: 18 },
    { ch: 3, name: 'Metals and Non-Metals', page: 37 },
    { ch: 4, name: 'Combustion and Flame', page: 58 },
    { ch: 5, name: 'Conservation of Plants and Animals', page: 74 },
    { ch: 6, name: 'Crop Production and Management', page: 89 },
    { ch: 7, name: 'Force and Pressure', page: 109 },
    { ch: 8, name: 'Friction', page: 130 },
    { ch: 9, name: 'Sound', page: 147 },
    { ch: 10, name: 'Chemical Effects of Electric Current', page: 168 },
    { ch: 11, name: 'Refraction and Dispersion of Light', page: 185 },
    { ch: 12, name: 'Eye and Optical Instruments', page: 204 },
    { ch: 13, name: 'Stars and The Solar System', page: 221 },
    { ch: 14, name: 'Earthquakes', page: 242 },
    { ch: 15, name: 'Pollution of Air and Water', page: 258 }
  ],
  // Class 8 Mathematics
  'mathematics': [
    { ch: 1, name: 'Squares and Square Roots', page: 1 },
    { ch: 2, name: 'Cubes and Cube Roots', page: 28 },
    { ch: 3, name: 'Exponents and Radicals', page: 44 },
    { ch: 4, name: 'Direct and Inverse Variations', page: 61 },
    { ch: 5, name: 'Profit, Loss and Discount', page: 79 },
    { ch: 6, name: 'Compound Interest', page: 97 },
    { ch: 7, name: 'Algebraic Identities', page: 114 },
    { ch: 8, name: 'Polynomials', page: 133 },
    { ch: 9, name: 'Linear Equations in One Variable', page: 151 },
    { ch: 10, name: 'Parallel Lines', page: 172 },
    { ch: 11, name: 'Understanding Quadrilaterals', page: 191 },
    { ch: 12, name: 'Special Types of Quadrilaterals', page: 208 },
    { ch: 13, name: 'Introduction to Graphs', page: 227 },
    { ch: 14, name: 'Mensuration', page: 244 },
    { ch: 15, name: 'Statistics and Probability', page: 268 }
  ],
  // Class 4 Science (The Living World)
  'living world': [
    { ch: 1, name: 'My Body', page: 1 },
    { ch: 2, name: 'Plants', page: 12 },
    { ch: 3, name: 'Flowers and Fruits', page: 24 },
    { ch: 4, name: 'Plants Around Us', page: 34 },
    { ch: 5, name: 'Birds - Beaks and Claws', page: 46 },
    { ch: 6, name: 'Insects', page: 58 },
    { ch: 7, name: 'How Animals Survive', page: 69 },
    { ch: 8, name: 'Food', page: 80 },
    { ch: 9, name: 'Safe Management of Waste', page: 92 },
    { ch: 10, name: 'Water', page: 102 }
  ],
  // Class 4 Social Science (We and Our World)
  'we and our world': [
    { ch: 1, name: 'Family Relationships', page: 1 },
    { ch: 2, name: 'Sensitivity Towards Others', page: 9 },
    { ch: 3, name: 'Celebrating Our Diversity', page: 19 },
    { ch: 4, name: 'An Ideal Home', page: 30 },
    { ch: 5, name: 'Bricks and Bridges', page: 39 },
    { ch: 6, name: 'Waste Management', page: 49 },
    { ch: 7, name: 'The Works We Do', page: 58 },
    { ch: 8, name: 'Leisure Time', page: 67 },
    { ch: 9, name: 'Directions and Maps', page: 76 },
    { ch: 10, name: 'Travel and Transport', page: 85 },
    { ch: 11, name: 'Let Us Travel', page: 94 },
    { ch: 12, name: 'Indian Culture and Heritage', page: 104 }
  ],
  // Class 4 Primary Mathematics
  'primary-mathematics': [
    { ch: 1, name: 'Numbers up to 7 Digits', page: 1 },
    { ch: 2, name: 'Addition and Subtraction', page: 18 },
    { ch: 3, name: 'Multiplication', page: 33 },
    { ch: 4, name: 'Division', page: 47 },
    { ch: 5, name: 'Length', page: 63 },
    { ch: 6, name: 'Weight', page: 77 },
    { ch: 7, name: 'Capacity', page: 89 },
    { ch: 8, name: 'Time and Calendar', page: 101 },
    { ch: 9, name: 'Fractions', page: 119 },
    { ch: 10, name: 'Angles', page: 137 },
    { ch: 11, name: 'Perimeter', page: 153 }
  ],
  // Class 4 Hindi Bhasha Madhuri
  'bhasha-madhuri': [
    { ch: 1, name: 'फैलती चप्पलें', page: 1 },
    { ch: 2, name: 'उल्टा-पुलटा', page: 6 },
    { ch: 3, name: 'अनोखा ढंग', page: 11 },
    { ch: 4, name: 'मित्रता', page: 18 },
    { ch: 5, name: 'सेर को सवा सेर', page: 25 },
    { ch: 6, name: 'पहली बारिश', page: 31 },
    { ch: 7, name: 'दादी का रेडियो', page: 37 }
  ]
};

export function PdfReaderModal({ isOpen, onClose, book, onOpenAIWithQuestion, currentUser }) {
  if (!isOpen || !book) return null;

  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(2); // +2 maps book p.1 to physical p.3 (cover+preface)
  const [teleportInput, setTeleportInput] = useState('');
  const [showChapterMenu, setShowChapterMenu] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0); // 0.8, 1.0, 1.25, 1.5
  const [showAiCompanion, setShowAiCompanion] = useState(true);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Viewer Mode: 'annotator' (Default: In-Modal High-Performance PDF Engine with zero file size limits) | 'stream' | 'gdrive'
  const [viewerMode, setViewerMode] = useState(book.initialMode === 'gdrive' ? 'gdrive' : book.initialMode === 'stream' ? 'stream' : 'annotator');

  // Custom Google Drive Link support
  const storageKeyGDrive = `dav_gdrive_custom_${book.title}`;
  const [customDriveInput, setCustomDriveInput] = useState(() => {
    try {
      return localStorage.getItem(storageKeyGDrive) || '';
    } catch (e) {
      return '';
    }
  });
  const [activeDriveUrl, setActiveDriveUrl] = useState(() => {
    try {
      return localStorage.getItem(storageKeyGDrive) || '';
    } catch (e) {
      return '';
    }
  });
  const [copiedNotification, setCopiedNotification] = useState(false);

  // PDF.js Engine State
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);
  const [isRenderingPage, setIsRenderingPage] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [pdfError, setPdfError] = useState(null);
  const [renderedDimensions, setRenderedDimensions] = useState({ width: 0, height: 0 });

  // Refs
  const containerRef = useRef(null);
  const pdfCanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  // Interactive Annotation & Drawing Canvas State
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [annotationTool, setAnnotationTool] = useState('none'); // 'none' | 'pen' | 'highlighter' | 'eraser'
  const [penColor, setPenColor] = useState('#ef4444');
  const [penWidth, setPenWidth] = useState(3);
  const [highlightColor, setHighlightColor] = useState('#fde047');
  const [hasUnsavedAnnotations, setHasUnsavedAnnotations] = useState(false);
  const [isSavingAnnotations, setIsSavingAnnotations] = useState(false);
  const [annotationToast, setAnnotationToast] = useState(null);

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

  // Helper to extract Google Drive File ID
  const extractDriveId = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const getAbsolutePdfUrl = (url) => {
    if (!url) return '';
    const resolved = resolvePdfUrl(url);
    if (resolved.startsWith('http://') || resolved.startsWith('https://')) return resolved;
    if (typeof window !== 'undefined') {
      const base = window.location.origin;
      return `${base}${resolved.startsWith('/') ? '' : '/'}${resolved}`;
    }
    return resolved;
  };

  const effectivePdfSource = activeDriveUrl.trim() || rawSource;
  const driveFileId = extractDriveId(effectivePdfSource);

  const gdriveEmbedUrl = driveFileId
    ? `https://drive.google.com/file/d/${driveFileId}/preview`
    : resolvedPdfUrl;

  const gdriveDirectUrl = driveFileId
    ? `https://drive.google.com/file/d/${driveFileId}/view`
    : resolvedPdfUrl;

  // Helper to load PDF.js from local /vendor/ or CDN fallback
  const loadPdfJs = async () => {
    if (window.pdfjsLib) return window.pdfjsLib;

    return new Promise((resolve, reject) => {
      const existing = document.getElementById('dav-pdfjs-lib');
      if (existing) {
        if (window.pdfjsLib) return resolve(window.pdfjsLib);
        existing.addEventListener('load', () => resolve(window.pdfjsLib));
        existing.addEventListener('error', reject);
        return;
      }

      const script = document.createElement('script');
      script.id = 'dav-pdfjs-lib';
      script.src = '/vendor/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('pdfjsLib initialization failed'));
        }
      };
      script.onerror = () => {
        // Fallback to CDN
        const fallback = document.createElement('script');
        fallback.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        fallback.onload = () => {
          if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve(window.pdfjsLib);
          } else {
            reject(new Error('CDN pdfjsLib failed'));
          }
        };
        fallback.onerror = (e) => reject(new Error('Could not load pdf.js from local or CDN'));
        document.head.appendChild(fallback);
      };
      document.head.appendChild(script);
    });
  };

  // Robust unlock helper to ensure scroll ALWAYS works when modal closes
  const unlockScroll = () => {
    if (typeof document !== 'undefined') {
      try {
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.height = '';
        document.documentElement.style.height = '';
        document.body.classList.remove('overflow-hidden');
      } catch (e) {}
    }
  };

  // Lock body overflow so background website NEVER scrolls while reading PDF, and GUARANTEE unlock on close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        unlockScroll();
      };
    } else {
      unlockScroll();
    }
  }, [isOpen]);

  // Handle ESC key to safely exit reader and restore scrolling
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        unlockScroll();
        if (onClose) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleModalClose = () => {
    unlockScroll();
    if (onClose) onClose();
  };

  // Ensure current page resets properly when book changes
  useEffect(() => {
    if (book) {
      setCurrentPage(Math.max(1, book.page || 1));
      if (book.initialMode === 'gdrive') {
        setViewerMode('gdrive');
      } else if (book.initialMode === 'stream') {
        setViewerMode('stream');
      } else {
        setViewerMode('annotator');
      }
    }
  }, [book]);

  // Load PDF Document via PDF.js with Range Streaming (NO BROWSER DOWNLOAD EVER TRIGGERED)
  useEffect(() => {
    let isCancelled = false;
    let loadingTask = null;

    async function initPdf() {
      if (!rawSource || viewerMode !== 'annotator') {
        setIsLoadingPdf(false);
        return;
      }
      setIsLoadingPdf(true);
      setPdfError(null);
      setLoadingProgress(15);

      try {
        const pdfjs = await loadPdfJs();
        if (isCancelled) return;

        let docParams;
        if (rawSource.startsWith('data:')) {
          try {
            const base64 = rawSource.split(',')[1] || '';
            const binStr = atob(base64);
            const bytes = new Uint8Array(binStr.length);
            for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
            docParams = { data: bytes };
          } catch (e) {
            docParams = { url: resolvedPdfUrl };
          }
        } else {
          docParams = { 
            url: resolvedPdfUrl,
            cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
            cMapPacked: true,
            enableXfa: true,
            disableRange: false,
            disableStream: false
          };
        }

        loadingTask = pdfjs.getDocument(docParams);

        loadingTask.onProgress = ({ loaded, total }) => {
          if (total > 0 && !isCancelled) {
            const pct = Math.min(99, Math.round((loaded / total) * 100));
            setLoadingProgress(pct);
          }
        };

        const doc = await loadingTask.promise;
        if (isCancelled) return;

        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setIsLoadingPdf(false);
      } catch (err) {
        if (!isCancelled) {
          console.error('Error loading PDF with PDF.js:', err);
          setPdfError('Could not load book pages directly. You can try Google Drive mode or check your internet connection.');
          setIsLoadingPdf(false);
        }
      }
    }

    initPdf();

    return () => {
      isCancelled = true;
      if (loadingTask) {
        try { loadingTask.destroy(); } catch (e) {}
      }
    };
  }, [resolvedPdfUrl, rawSource, viewerMode]);

  // Calculate physical page number (clamped within PDF range)
  const physicalPage = useMemo(() => {
    if (!totalPages) return currentPage;
    return Math.min(Math.max(1, currentPage + pageOffset), totalPages);
  }, [currentPage, pageOffset, totalPages]);

  // Render Current Page to HTML5 Canvas
  useEffect(() => {
    let isCancelled = false;

    async function renderPage() {
      if (!pdfDoc || !pdfCanvasRef.current || viewerMode !== 'annotator') return;
      setIsRenderingPage(true);

      try {
        const page = await pdfDoc.getPage(physicalPage);
        if (isCancelled) return;

        const canvas = pdfCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const container = containerRef.current;
        const availableWidth = (container ? container.clientWidth : 800) - 40;

        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const fitScale = Math.min(2.5, Math.max(0.4, availableWidth / unscaledViewport.width));
        const finalScale = fitScale * zoomLevel;
        const viewport = page.getViewport({ scale: finalScale });

        const dpr = window.devicePixelRatio || 1;
        const cssW = Math.floor(viewport.width);
        const cssH = Math.floor(viewport.height);

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;

        setRenderedDimensions({ width: cssW, height: cssH });

        ctx.save();
        ctx.scale(dpr, dpr);

        if (renderTaskRef.current) {
          try { renderTaskRef.current.cancel(); } catch (e) {}
        }

        renderTaskRef.current = page.render({
          canvasContext: ctx,
          viewport: viewport,
        });

        await renderTaskRef.current.promise;
        if (isCancelled) return;

        // Synchronize overlay annotation canvas to exact dimensions
        if (canvasRef.current) {
          const annoCanvas = canvasRef.current;
          annoCanvas.width = canvas.width;
          annoCanvas.height = canvas.height;
          annoCanvas.style.width = `${cssW}px`;
          annoCanvas.style.height = `${cssH}px`;

          loadPageAnnotations(currentPage, canvas.width, canvas.height);
        }

        setIsRenderingPage(false);
      } catch (err) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('PDF render error:', err);
        }
        if (!isCancelled) setIsRenderingPage(false);
      }
    }

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel(); } catch (e) {}
      }
    };
  }, [pdfDoc, physicalPage, zoomLevel, viewerMode]);

  // Load Saved Annotations for Page
  const loadPageAnnotations = (pageNumber, w, h) => {
    if (!canvasRef.current || !book) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasUnsavedAnnotations(false);

    const key = `dav_pdf_canvas_${book.title || 'book'}_p${pageNumber}`;
    const localData = localStorage.getItem(key);
    if (localData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = localData;
    }

    if (typeof loadCloudPdfAnnotation === 'function') {
      loadCloudPdfAnnotation(currentUser?.id, book.title, pageNumber).then(cloudData => {
        if (cloudData && cloudData.canvas_data) {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            try {
              localStorage.setItem(key, cloudData.canvas_data);
            } catch (e) {}
          };
          img.src = cloudData.canvas_data;
        }
      }).catch(() => {});
    }
  };

  // Pointer Event Handlers for Drawing with Sub-Pixel Precision
  const getCanvasPos = (e) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e) => {
    if (annotationTool === 'none') return;
    isDrawingRef.current = true;
    lastPosRef.current = getCanvasPos(e);
    setHasUnsavedAnnotations(true);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || annotationTool === 'none' || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const currentPos = getCanvasPos(e);
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);

    if (annotationTool === 'pen') {
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth * dpr;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else if (annotationTool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = 18 * dpr;
      ctx.lineCap = 'square';
      ctx.stroke();
    } else if (annotationTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 26 * dpr;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    ctx.restore();
    lastPosRef.current = currentPos;
  };

  // Save Current Page Annotations (Automatic & Instant)
  const saveCurrentPageAnnotations = () => {
    if (!canvasRef.current || !book) return;
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const key = `dav_pdf_canvas_${book.title || 'book'}_p${currentPage}`;
      localStorage.setItem(key, dataUrl);
      if (typeof saveCloudPdfAnnotation === 'function') {
        saveCloudPdfAnnotation(currentUser?.id, book.title, currentPage, dataUrl).catch(() => {});
      }
      setHasUnsavedAnnotations(false);
    } catch (e) {}
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    saveCurrentPageAnnotations();
  };

  // Save Annotations Permanently
  const handleSaveAnnotations = async () => {
    if (!canvasRef.current || !book) return;
    setIsSavingAnnotations(true);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const key = `dav_pdf_canvas_${book.title || 'book'}_p${currentPage}`;
      localStorage.setItem(key, dataUrl);

      if (typeof saveCloudPdfAnnotation === 'function') {
        await saveCloudPdfAnnotation(currentUser?.id, book.title, currentPage, dataUrl);
      }

      setHasUnsavedAnnotations(false);
      setAnnotationToast('✓ Annotations Saved! Will persist even after refreshing.');
      setTimeout(() => setAnnotationToast(null), 3500);
    } catch (err) {
      console.warn('Save annotations failed:', err);
    } finally {
      setIsSavingAnnotations(false);
    }
  };

  // Clear Annotations on Current Page
  const handleClearAnnotations = async () => {
    if (!canvasRef.current || !book) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const key = `dav_pdf_canvas_${book.title || 'book'}_p${currentPage}`;
    localStorage.removeItem(key);

    if (typeof saveCloudPdfAnnotation === 'function') {
      await saveCloudPdfAnnotation(currentUser?.id, book.title, currentPage, null);
    }

    setHasUnsavedAnnotations(false);
    setAnnotationToast('Annotations cleared for this page.');
    setTimeout(() => setAnnotationToast(null), 2500);
  };

  // Chapter List for this Book
  const bookChapters = useMemo(() => {
    if (!book) return [];
    const bTitle = (book.title || '').toLowerCase();
    const bSub = (book.subject || '').toLowerCase();

    for (const key of Object.keys(DAV_PAGE_INDEX)) {
      if (bTitle.includes(key) || bSub.includes(key)) {
        return DAV_PAGE_INDEX[key];
      }
    }
    return [];
  }, [book?.title, book?.subject]);

  // Page Flip Handlers
  const handlePrevPage = () => {
    saveCurrentPageAnnotations();
    if (currentPage > 1) {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const maxBookPages = totalPages ? Math.max(1, totalPages - pageOffset) : 600;

  const handleNextPage = () => {
    saveCurrentPageAnnotations();
    if (currentPage < maxBookPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, pageOffset]);

  const handleTeleport = (pageNumber) => {
    const p = parseInt(pageNumber, 10);
    if (!isNaN(p) && p > 0) {
      const target = Math.min(p, maxBookPages);
      setCurrentPage(target);
      setTeleportInput('');
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `🚀 **Teleported directly to Page ${target}** in *${book.title}*! Ask me any question or definitions from this page!`
        }
      ]);
    }
  };

  // Rishi AI Page Companion State
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `👋 I am your **Rishi AI Page Guide** for **"${book.title}"** (Class ${book.classNum || 8}).

⚡ **Instant Page Flip:**
* Type **"Go to page 100"**, **"Open page 50"**, or enter any number in the top bar to flip immediately.
* Ask **"Where is Chapter 16?"** or any chapter topic to teleport directly to that chapter!

🎨 **Interactive Tools:**
* Use the **Pen** or **Highlighter** tool to annotate directly on the textbook page, and click **Save** to keep your drawings permanently!`
    }
  ]);

  const handleSendAiMessage = async (e) => {
    e?.preventDefault();
    const q = aiQuestion.trim();
    if (!q || aiLoading) return;

    setAiMessages(prev => [...prev, { role: 'user', text: q }]);
    setAiQuestion('');
    setAiLoading(true);

    try {
      const pageMatch = q.match(/(?:navigate(?:\s+me)?\s+to\s+page(?:\s+number)?|open\s+page(?:\s+number)?|go\s+to\s+page(?:\s+number)?|jump\s+to\s+page(?:\s+number)?|teleport(?:\s+me)?\s+to\s+page(?:\s+number)?|flip\s+to\s+page(?:\s+number)?|page(?:\s+number)?|p\.?|pg\.?)\s*[:#-]?\s*(\b\d{1,4}\b)/i) || q.match(/^\s*(\d{1,4})\s*$/);
      
      let matchedChapter = null;
      const lowerQ = q.toLowerCase();
      
      bookChapters.forEach((item) => {
        if (
          lowerQ.includes(item.name.toLowerCase()) || 
          lowerQ.includes(`chapter ${item.ch}`) ||
          lowerQ.includes(`ch ${item.ch}`) ||
          lowerQ.includes(`ch-${item.ch}`)
        ) {
          matchedChapter = item;
        }
      });

      if (matchedChapter) {
        setCurrentPage(matchedChapter.page);
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: `🎯 **Chapter Found:** **Chapter ${matchedChapter.ch}: ${matchedChapter.name}**\n\n🚀 **Automatically opened Page ${matchedChapter.page}** of *${book.title}*!\n\nWould you like the key chapter summary, 5-mark important questions, or solved exercises for this topic?`
          }
        ]);
        setAiLoading(false);
        return;
      }

      if (pageMatch && parseInt(pageMatch[1], 10) > 0) {
        const targetPage = parseInt(pageMatch[1], 10);
        setCurrentPage(targetPage);
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: `🚀 **Navigated directly to Page ${targetPage}** in *${book.title}*!\n\nThe textbook page has opened instantly on screen.`
          }
        ]);
        setAiLoading(false);
        return;
      }

      const promptWithBookContext = `Student is reading the DAV textbook: "${book.title}" (Class ${book.classNum || 8} ${book.subject || ''}) at Page ${currentPage}.\n\nQuestion: ${q}`;
      const response = await askRishiAI(promptWithBookContext, {
        classNum: book.classNum || 8,
        subject: book.subject || 'sst',
        chapter: book.chapter || 1
      });

      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: response.text
        }
      ]);
    } catch (err) {
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: 'Error retrieving book intelligence. Please try asking again or jump to a page above!'
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
        
        {/* Book Title & Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center text-amber-300 font-extrabold text-xs shrink-0">
            DAV
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-xs sm:text-sm text-white truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {book.title}
              </h3>
              <span className="text-[10px] bg-stone-950 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                Class {book.classNum || 8}
              </span>
            </div>
            <p className="text-[10px] text-orange-200/80 truncate">
              {viewerMode === 'stream' ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Native Browser PDF Stream
                </span>
              ) : viewerMode === 'gdrive' ? (
                <span className="text-amber-300 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Cloud PDF Document Viewer
                </span>
              ) : (
                <span>
                  ⚡ Cloud PDF Reader • <strong className="text-amber-300 font-mono">Page {currentPage} of {maxBookPages}</strong>
                  {totalPages > 0 && <span className="text-stone-400 ml-1 font-mono text-[9px]">(PDF p.{physicalPage}/{totalPages})</span>}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Center Page Nav & Jump Controls (Reading Mode) */}
        {viewerMode !== 'gdrive' && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-950 border border-orange-500/40 rounded-xl px-2.5 py-1 text-xs">
            {/* Prev Page */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              title="Previous Page (Left Arrow)"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="px-2.5 py-1 rounded-lg bg-stone-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
              {currentPage} / {maxBookPages}
            </span>

            {/* Next Page */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= maxBookPages}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              title="Next Page (Right Arrow)"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-stone-800 hidden md:block" />

            {/* Jump Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTeleport(teleportInput);
              }}
              className="flex items-center gap-1"
            >
              <span className="text-[11px] font-bold text-orange-300 uppercase hidden md:inline">
                Jump:
              </span>
              <input
                type="number"
                placeholder="p."
                min="1"
                max={maxBookPages}
                value={teleportInput}
                onChange={(e) => setTeleportInput(e.target.value)}
                className="w-12 sm:w-14 px-1.5 py-1 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400 text-center"
              />
              <button
                type="submit"
                disabled={!teleportInput}
                className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-black text-xs transition cursor-pointer"
              >
                Go
              </button>
            </form>

            {/* Chapter Selector Dropdown */}
            {bookChapters.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowChapterMenu(!showChapterMenu)}
                  className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Jump directly to any Chapter"
                >
                  <List className="w-3 h-3 text-amber-400" />
                  <span className="hidden md:inline">Chapters</span>
                  <span className="text-[9px] bg-amber-500 text-stone-950 px-1 rounded-full font-bold font-mono">
                    {bookChapters.length}
                  </span>
                </button>

                {showChapterMenu && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 max-h-80 overflow-y-auto bg-stone-900 border border-amber-500/50 rounded-xl shadow-2xl z-50 p-1.5 animate-fadeIn">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 border-b border-stone-800 mb-1">
                      Table of Contents
                    </div>
                    {bookChapters.map((ch) => (
                      <button
                        key={ch.ch}
                        type="button"
                        onClick={() => {
                          setCurrentPage(ch.page);
                          setShowChapterMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                          currentPage >= ch.page && (!bookChapters.find(next => next.ch === ch.ch + 1) || currentPage < (bookChapters.find(next => next.ch === ch.ch + 1)?.page || 999))
                            ? 'bg-amber-500/20 text-amber-300 font-bold'
                            : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-2">
                          <strong className="text-amber-400 mr-1">Ch {ch.ch}:</strong>
                          {ch.name}
                        </span>
                        <span className="font-mono text-[10px] text-stone-400 shrink-0 bg-stone-950 px-1.5 py-0.5 rounded border border-stone-800">
                          p.{ch.page}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mode Switcher: HD Reader (Default) | Neon Draw | Native Stream | Google Drive */}
          <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              type="button"
              onClick={() => {
                setViewerMode('annotator');
                setAnnotationTool('none');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewerMode === 'annotator' && annotationTool === 'none'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Official Cloud PDF Reader"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>HD Reader</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewerMode('annotator');
                setAnnotationTool('highlighter');
              }}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewerMode === 'annotator' && annotationTool !== 'none'
                  ? 'bg-purple-600 text-white font-black shadow-md shadow-purple-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Interactive Canvas Drawing & Neon Highlighter"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Neon Draw</span>
            </button>

            <button
              type="button"
              onClick={() => setViewerMode('stream')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewerMode === 'stream'
                  ? 'bg-emerald-600 text-white font-black shadow-md shadow-emerald-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Continuous Native PDF Stream"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stream</span>
            </button>

            {driveFileId && (
              <button
                type="button"
                onClick={() => setViewerMode('gdrive')}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewerMode === 'gdrive'
                    ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/30'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
                title="Google Drive Cloud Document"
              >
                <GoogleDriveIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Google Drive</span>
              </button>
            )}
          </div>

          {/* AI Guide Toggle */}
          <button
            onClick={() => setShowAiCompanion(!showAiCompanion)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
              showAiCompanion
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-orange-500/40'
            }`}
            title="Toggle Rishi AI Page Guide"
          >
            <BlackDogLogo className="w-3.5 h-3.5" bgClassName="bg-stone-950" />
            <span className="hidden sm:inline">AI Guide</span>
          </button>

          {/* Direct Fullscreen Tab (Zero limits, direct native browser viewer) */}
          {hasRealPdf && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 hover:text-amber-200 border border-stone-700 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="Open direct PDF in new browser tab at maximum speed"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden xl:inline">New Tab</span>
            </a>
          )}

          {/* Dedicated Download Button (ONLY downloads when clicked by user) */}
          {hasRealPdf && (
            <a
              href={resolvedPdfUrl}
              target="_blank"
              rel="noreferrer"
              download={`${book.title}.pdf`}
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title="Download offline copy of textbook"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          {/* Close Modal */}
          <button
            onClick={handleModalClose}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="Close Fullscreen Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* Sub-Header in Stream Mode: Instant Cloud Stream banner & quick switch */}
      {viewerMode === 'stream' && (
        <div className="bg-stone-900/95 border-b border-stone-800 px-3 py-1.5 flex items-center justify-between flex-wrap gap-2 text-xs text-white z-30 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold text-xs flex items-center gap-1.5">
              <span>⚡ Continuous Vertical Scroll Active</span>
              <span className="text-stone-400 font-normal hidden sm:inline">• Scroll naturally with mouse wheel or trackpad through all {maxBookPages} pages without waiting</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={gdriveDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Open cloud stream in dedicated tab (Zero download)"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Open Fullpage Cloud Viewer</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setViewerMode('annotator');
                setAnnotationTool('highlighter');
              }}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-500/30 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Need to Highlight or Draw? Open Neon Annotator</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-Header in Annotator Mode: Drawing & Annotation Suite + Zoom Controls */}
      {viewerMode === 'annotator' && (
      <div className="bg-stone-900/90 border-b border-stone-800 px-3 py-1.5 flex items-center justify-between flex-wrap gap-2 text-xs text-white z-30 shadow-md">
        
        {/* Drawing Tools */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-700/80 flex-wrap">
          {/* Select / Scroll Tool */}
          <button
            type="button"
            onClick={() => setAnnotationTool('none')}
            className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
              annotationTool === 'none' ? 'bg-stone-700 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
            title="Cursor / Scroll Mode"
          >
            <MousePointer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cursor</span>
          </button>

          {/* Pen Tool */}
          <button
            type="button"
            onClick={() => setAnnotationTool('pen')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
              annotationTool === 'pen' ? 'bg-blue-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
            }`}
            title="Draw Freehand with Pen Tool"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Pen</span>
          </button>

          {/* Highlighter Tool */}
          <button
            type="button"
            onClick={() => setAnnotationTool('highlighter')}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
              annotationTool === 'highlighter' ? 'bg-amber-500 text-stone-950 shadow-md font-black' : 'text-stone-400 hover:text-white'
            }`}
            title="Highlight Text with Translucent Highlighter"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>Highlight</span>
          </button>

          {/* Eraser Tool */}
          <button
            type="button"
            onClick={() => setAnnotationTool('eraser')}
            className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
              annotationTool === 'eraser' ? 'bg-rose-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
            }`}
            title="Eraser Tool"
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eraser</span>
          </button>

          {/* Pen Color Palette */}
          {annotationTool === 'pen' && (
            <div className="flex items-center gap-1 pl-1.5 border-l border-stone-800">
              {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#1e293b'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setPenColor(color)}
                  className={`w-4 h-4 rounded-full border transition cursor-pointer ${
                    penColor === color ? 'scale-125 border-white shadow-md' : 'border-stone-700 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Color: ${color}`}
                />
              ))}
            </div>
          )}

          {/* Highlighter Color Palette */}
          {annotationTool === 'highlighter' && (
            <div className="flex items-center gap-1 pl-1.5 border-l border-stone-800">
              {['#fde047', '#38bdf8', '#4ade80', '#f472b6'].map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setHighlightColor(color)}
                  className={`w-4 h-4 rounded-full border transition cursor-pointer ${
                    highlightColor === color ? 'scale-125 border-white shadow-md' : 'border-stone-700 opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Highlighter: ${color}`}
                />
              ))}
            </div>
          )}

          {/* Clear Current Page */}
          <button
            type="button"
            onClick={handleClearAnnotations}
            className="p-1 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition cursor-pointer ml-1"
            title="Clear drawings on this page"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Save Annotations Button */}
          <button
            type="button"
            onClick={handleSaveAnnotations}
            disabled={isSavingAnnotations}
            className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer shadow-md ${
              hasUnsavedAnnotations
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse'
                : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-emerald-500/30'
            }`}
            title="Save annotations permanently (persists across page reloads)"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSavingAnnotations ? 'Saving...' : '✓ Auto-Saved'}</span>
          </button>
        </div>

        {/* Zoom & Page Offset Controls */}
        <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-700/80 text-xs">
          {/* Zoom Out */}
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.max(0.6, Math.round((prev - 0.15) * 100) / 100))}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition cursor-pointer"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Reset Zoom / Fit */}
          <button
            type="button"
            onClick={() => setZoomLevel(1.0)}
            className="px-2 py-0.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white font-mono text-[10px] font-bold border border-stone-800 transition cursor-pointer"
            title="Reset Zoom to Fit Width"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          {/* Zoom In */}
          <button
            type="button"
            onClick={() => setZoomLevel(prev => Math.min(2.5, Math.round((prev + 0.15) * 100) / 100))}
            className="p-1 rounded-lg hover:bg-stone-800 text-stone-300 hover:text-white transition cursor-pointer"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-3 w-[1px] bg-stone-800 mx-0.5" />

          {/* Cover Offset Calibrator */}
          <button
            type="button"
            onClick={() => setPageOffset(prev => prev === 2 ? 0 : 2)}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
              pageOffset === 2 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
            title="Toggle Cover & Preface page offset (+2 for book body, 0 for book cover)"
          >
            {pageOffset === 2 ? 'Offset: +2' : 'Offset: 0'}
          </button>
        </div>

      </div>

      )}

      {/* Main Workspace Split */}
      <div className="flex-1 flex overflow-hidden bg-stone-950 relative">
        
        {/* Left: PDF Reader Container */}
        <div 
          ref={containerRef}
          className="flex-1 h-full bg-stone-950 flex flex-col items-center justify-start overflow-hidden relative select-none"
        >
          {/* Toast Notification */}
          {annotationToast && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-fadeIn pointer-events-none">
              <Check className="w-4 h-4" />
              <span>{annotationToast}</span>
            </div>
          )}

          {/* 1. NATIVE BROWSER EMBED & STREAM MODE */}
          {viewerMode === 'stream' && (
            <div className="w-full h-full flex flex-col bg-stone-900 rounded-xl overflow-hidden border border-stone-800 shadow-2xl relative">
              <div className="p-2.5 bg-stone-950 border-b border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Native Browser PDF Engine • Zero Size Restrictions</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setViewerMode('annotator');
                      setAnnotationTool('none');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-[11px] flex items-center gap-1 transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open in Built-in HD Reader</span>
                  </button>
                  <a
                    href={resolvedPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-bold text-[11px] flex items-center gap-1 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Direct Fullscreen (New Tab)</span>
                  </a>
                </div>
              </div>

              <object
                data={resolvedPdfUrl}
                type="application/pdf"
                className="w-full flex-1 border-none bg-stone-900 block"
              >
                <iframe
                  key={`stream-${effectivePdfSource}`}
                  src={resolvedPdfUrl}
                  title={`${book.title} - Textbook Direct Stream`}
                  className="w-full flex-1 border-none bg-stone-900 block"
                >
                  <div className="p-8 text-center text-white flex flex-col items-center justify-center h-full">
                    <p className="text-sm font-bold text-amber-300 mb-3">Direct PDF Preview</p>
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
          )}

          {/* 2. CLOUD DOCUMENT MODE */}
          {viewerMode === 'gdrive' && (
            <div className="w-full h-full flex flex-col bg-stone-900 rounded-xl overflow-hidden border border-stone-800">
              <div className="p-2.5 bg-stone-900 border-b border-stone-800 flex items-center justify-between text-xs flex-wrap gap-2">
                <span className="text-stone-200 flex items-center gap-2 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Cloud Document Stream</span>
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={gdriveDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-[11px] font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  >
                    <span>Open Fullscreen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setViewerMode('annotator');
                      setAnnotationTool('none');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>HD Canvas Reader</span>
                  </button>
                </div>
              </div>
              <object
                data={gdriveEmbedUrl}
                type="application/pdf"
                className="w-full flex-1 border-none bg-stone-900 block"
              >
                <iframe
                  key={`gdrive-${effectivePdfSource}`}
                  src={gdriveEmbedUrl}
                  title={`${book.title} - Document Viewer`}
                  className="w-full flex-1 border-none bg-stone-900 block select-none pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </object>
            </div>
          )}

          {/* 3. INTERACTIVE CANVAS ANNOTATOR & NEON HIGHLIGHTER MODE */}
          {viewerMode === 'annotator' && (
            <div 
              className="w-full h-full flex flex-col items-center justify-start overflow-y-auto overflow-x-auto p-4 relative select-none"
              onWheel={(e) => {
                if (isRenderingPage) return;
                if (e.deltaY > 50) handleNextPage();
                else if (e.deltaY < -50) handlePrevPage();
              }}
            >
              {/* Sleek Sub-Second Top Loading Stream Line (No blocking cards) */}
              {isLoadingPdf && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-stone-900 z-50 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 animate-pulse transition-all duration-150"
                    style={{ width: `${Math.max(25, loadingProgress)}%` }}
                  />
                </div>
              )}

              {/* Error State */}
              {pdfError && !isLoadingPdf && (
                <div className="my-auto flex flex-col items-center justify-center p-6 text-center bg-stone-900 rounded-2xl border border-rose-500/40 shadow-2xl max-w-md">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-3 text-rose-400 font-bold">
                    !
                  </div>
                  <h4 className="text-stone-100 font-bold text-sm mb-1">
                    Unable to load canvas
                  </h4>
                  <p className="text-stone-400 text-xs mb-4">
                    {pdfError}
                  </p>
                  <button
                    type="button"
                    onClick={() => setViewerMode('stream')}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Return to Continuous Stream</span>
                  </button>
                </div>
              )}

              {/* Rendered Book Page Canvas Wrapper */}
              {!isLoadingPdf && !pdfError && (
                <div 
                  className="relative mx-auto bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-150 border border-stone-800"
                  style={{
                    width: renderedDimensions.width ? `${renderedDimensions.width}px` : 'auto',
                    height: renderedDimensions.height ? `${renderedDimensions.height}px` : 'auto',
                    minWidth: '280px',
                    minHeight: '400px'
                  }}
                >
                  <canvas
                    ref={pdfCanvasRef}
                    className="block select-none pointer-events-none bg-white"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-20 block"
                    style={{
                      pointerEvents: annotationTool === 'none' ? 'none' : 'auto',
                      cursor: annotationTool === 'pen' ? 'crosshair' : annotationTool === 'highlighter' ? 'text' : annotationTool === 'eraser' ? 'cell' : 'default',
                      touchAction: annotationTool === 'none' ? 'auto' : 'none'
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                  />

                  {/* Page Rendering Spinner Overlay */}
                  {isRenderingPage && (
                    <div className="absolute inset-0 bg-stone-950/20 -[1px] flex items-center justify-center pointer-events-none z-30">
                      <div className="px-3 py-1.5 rounded-full bg-stone-900/90 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-2 shadow-2xl">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                        <span>Rendering Page {currentPage}...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Floating Prev & Next Buttons */}
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="fixed left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition cursor-pointer group"
                  title={`Go back to Page ${currentPage - 1}`}
                >
                  <ChevronLeft className="w-5 h-5 transition transform group-hover:-translate-x-0.5" />
                </button>
              )}
              {currentPage < maxBookPages && (
                <button
                  type="button"
                  onClick={handleNextPage}
                  className="fixed left-[calc(100%-24rem)] lg:left-auto lg:right-[390px] top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition cursor-pointer group"
                  title={`Go forward to Page ${currentPage + 1}`}
                >
                  <ChevronRight className="w-5 h-5 transition transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>
          )}

        </div>

        {/* Right: Collapsible Rishi AI Page Guide Sidebar */}
        {showAiCompanion && (
          <aside className="w-80 sm:w-88 md:w-96 bg-stone-900 border-l border-stone-800 flex flex-col shrink-0 z-30 shadow-2xl">
            {/* AI Header */}
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BlackDogLogo className="w-4 h-4" bgClassName="bg-amber-500" />
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>Rishi AI Page Guide</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-amber-300/80">
                    Live companion for {book.title} (p.{currentPage})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAiCompanion(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
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
                  <span className="text-[11px] font-semibold">Reading textbook chapter & preparing answer...</span>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="p-2 border-t border-stone-800 bg-stone-950 flex items-center gap-1.5 overflow-x-auto text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setAiQuestion('Summarize the key points and definitions of this chapter.');
                }}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer"
              >
                📝 Chapter Summary
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiQuestion('What are 3 important 5-mark exam questions from this topic?');
                }}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer"
              >
                🎯 5-Mark Questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setAiQuestion('Give me 5 rapid-fire practice MCQs with answers from this page.');
                }}
                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 whitespace-nowrap cursor-pointer"
              >
                ⚡ Practice MCQs
              </button>
            </div>

            {/* AI Chat Input Form */}
            <form onSubmit={handleSendAiMessage} className="p-2.5 bg-stone-950 border-t border-stone-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about this page or 'go to page 50'..."
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
