import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Download, BookOpen, Sparkles, 
  Send, Navigation, RefreshCw, ChevronRight, ChevronLeft,
  ExternalLink, FileText, Check, Link, Globe,
  PenTool, Highlighter, Eraser, Save, Trash2, MousePointer
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
import { GoogleDriveIcon } from './GoogleDriveIcon';
import { askShankarAI } from '../services/geminiService';
import { saveCloudPdfAnnotation, loadCloudPdfAnnotation } from '../services/supabaseClient';

// DAV Chapter-to-Page Index Guide for automatic AI navigation
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

  const [currentPage, setCurrentPage] = useState(1);
  const [teleportInput, setTeleportInput] = useState('');
  const [showAiCompanion, setShowAiCompanion] = useState(true);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  // Viewer Mode: 'reading' (Native Fast PDF Viewer) | 'gdrive' (Google Drive Live Cloud PDF Editor & Annotator)
  const [viewerMode, setViewerMode] = useState(book.initialMode === 'gdrive' ? 'gdrive' : 'reading');
  
  // Custom Google Drive Link support per book
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

  // GitHub Media CDN Fallback: Guarantees full binary PDFs are served without 133-byte Git LFS pointer failures
  const GITHUB_MEDIA_BASE = 'https://media.githubusercontent.com/media/RishitShankar/The-DAV-Dictionary/main/public';

  const resolvePdfUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    
    // When running on Vercel, production, or HTTPS, route /books/ to GitHub Media CDN
    const isVercelOrProduction = typeof window !== 'undefined' && (
      window.location.hostname.includes('vercel.app') || 
      window.location.hostname.includes('dav-dictionary') ||
      window.location.protocol === 'https:'
    );

    if (isVercelOrProduction && cleanPath.startsWith('/books/')) {
      return `${GITHUB_MEDIA_BASE}${encodeURI(cleanPath)}`;
    }

    return encodeURI(cleanPath);
  };

  // Interactive Annotation & Drawing Canvas State
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [annotationTool, setAnnotationTool] = useState('none'); // 'none' | 'pen' | 'highlighter' | 'eraser'
  const [penColor, setPenColor] = useState('#ef4444');
  const [penWidth, setPenWidth] = useState(3);
  const [highlightColor, setHighlightColor] = useState('#fde047');
  const [hasUnsavedAnnotations, setHasUnsavedAnnotations] = useState(false);
  const [isSavingAnnotations, setIsSavingAnnotations] = useState(false);
  const [annotationToast, setAnnotationToast] = useState(null);

  // Auto-resize canvas to match parent container
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        canvas.width = rect.width;
        canvas.height = rect.height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Restore saved drawing annotations whenever book or currentPage changes
  useEffect(() => {
    if (!canvasRef.current || !book) return;
    const canvas = canvasRef.current;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width || 800;
      canvas.height = rect.height || 600;
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasUnsavedAnnotations(false);

    // 1. Try loading from localStorage
    const key = `dav_pdf_canvas_${book.title || 'book'}_p${currentPage}`;
    const localData = localStorage.getItem(key);
    if (localData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = localData;
    }

    // 2. Also try loading from Supabase Cloud
    if (typeof loadCloudPdfAnnotation === 'function') {
      loadCloudPdfAnnotation(currentUser?.id, book.title, currentPage).then(cloudData => {
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
  }, [book?.title, currentPage, currentUser?.id]);

  // Pointer event handlers for drawing
  const getCanvasPos = (e) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
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

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);

    if (annotationTool === 'pen') {
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    } else if (annotationTool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = highlightColor;
      ctx.lineWidth = 18;
      ctx.lineCap = 'square';
      ctx.stroke();
    } else if (annotationTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 24;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    ctx.restore();
    lastPosRef.current = currentPos;
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
  };

  // Save Annotations Permanently (to both localStorage and Supabase Cloud)
  const handleSaveAnnotations = async () => {
    if (!canvasRef.current || !book) return;
    setIsSavingAnnotations(true);
    try {
      const dataUrl = canvasRef.current.toDataURL('image/png');
      const key = `dav_pdf_canvas_${book.title || 'book'}_p${currentPage}`;
      localStorage.setItem(key, dataUrl);

      // Save to Supabase Cloud
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

  const containerRef = useRef(null);
  const iframeRef = useRef(null);

  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `👋 I am your **Shankar AI Page Guide** for **"${book.title}"** (Class ${book.classNum || 8}).

⚡ **Automatic Navigation:**
* Type **"Go to page 100"**, **"Open page 80"**, or enter any number above, and I will **automatically flip the book** directly to that page!
* Ask **"Where is Chapter 16?"** or **"Where is Our Constitution?"**, and I will look up the syllabus and teleport you directly to the chapter!

🌐 **Google Drive PDF Editor:**
* Click the **"Google Drive Editor"** tab above to use Google Drive's live cloud viewer, highlighting, and Google Docs text editor.`
    }
  ]);

  const hasRealPdf = Boolean(book.pdfUrl || book.fileData);
  const rawSource = book.pdfUrl || book.fileData || '';
  const pdfBaseSource = resolvePdfUrl(rawSource);

  // Offset of +2 pages so book page 1 maps to PDF file page 3 (accounting for cover + preface)
  const pdfPhysicalPage = currentPage + 2;
  
  // Clean reading source with scrollbars and fit-horizontal enabled
  const pdfSourceWithPage = `${pdfBaseSource}#page=${pdfPhysicalPage}&view=FitH&toolbar=1&navpanes=0`;

  // Helper to extract Google Drive File ID if user provided a Google Drive URL
  const extractDriveId = (url) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  // Helper to construct absolute URL for Google Docs Viewer
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

  // Google Drive Embedded Preview URL
  const gdriveEmbedUrl = driveFileId
    ? `https://drive.google.com/file/d/${driveFileId}/preview`
    : `https://docs.google.com/viewer?url=${encodeURIComponent(getAbsolutePdfUrl(effectivePdfSource))}&embedded=true`;

  // Direct Google Drive / Docs URL for opening externally
  const gdriveDirectUrl = driveFileId
    ? `https://drive.google.com/file/d/${driveFileId}/view`
    : `https://docs.google.com/viewer?url=${encodeURIComponent(getAbsolutePdfUrl(effectivePdfSource))}`;

  // Direct Google Docs Edit URL (converts PDF to live editable Google Doc)
  const gdocsEditUrl = driveFileId
    ? `https://docs.google.com/document/d/${driveFileId}/edit`
    : `https://docs.google.com/viewer?url=${encodeURIComponent(getAbsolutePdfUrl(effectivePdfSource))}`;

  // Save custom Google Drive link
  const handleSaveCustomDriveUrl = (e) => {
    e?.preventDefault();
    const clean = customDriveInput.trim();
    setActiveDriveUrl(clean);
    try {
      if (clean) {
        localStorage.setItem(storageKeyGDrive, clean);
      } else {
        localStorage.removeItem(storageKeyGDrive);
      }
    } catch (e) {}
  };

  // Clear custom Google Drive link
  const handleClearCustomDriveUrl = () => {
    setCustomDriveInput('');
    setActiveDriveUrl('');
    try {
      localStorage.removeItem(storageKeyGDrive);
    } catch (e) {}
  };

  // Copy share link
  const handleCopyShareLink = () => {
    try {
      navigator.clipboard.writeText(gdriveDirectUrl);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    } catch (e) {}
  };

  // Lock body overflow so background website NEVER scrolls while reading PDF
  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  // Ensure current page resets properly when book changes and is never 0
  useEffect(() => {
    if (book) {
      setCurrentPage(Math.max(1, book.page || 1));
      if (book.initialMode === 'gdrive') {
        setViewerMode('gdrive');
      }
    }
  }, [book]);

  // Page flipping handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Keyboard navigation for smooth page flipping
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
  }, [currentPage]);

  const handleTeleport = (pageNumber) => {
    const p = parseInt(pageNumber, 10);
    if (!isNaN(p) && p > 0) {
      setCurrentPage(p);
      setTeleportInput('');
      setAiMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `🚀 **Teleported directly to Page ${p}** in *${book.title}*! Ask me any question, summary, or definitions from this page!`
        }
      ]);
    }
  };

  // AI Message & Auto-Teleport Parser
  const handleSendAiMessage = async (e) => {
    e?.preventDefault();
    const q = aiQuestion.trim();
    if (!q || aiLoading) return;

    setAiMessages(prev => [...prev, { role: 'user', text: q }]);
    setAiQuestion('');
    setAiLoading(true);

    try {
      // 1. Direct Page Match: e.g. "navigate me to page 50", "open page number 100", "go to page 100", "p. 80"
      const pageMatch = q.match(/(?:navigate(?:\s+me)?\s+to\s+page(?:\s+number)?|open\s+page(?:\s+number)?|go\s+to\s+page(?:\s+number)?|jump\s+to\s+page(?:\s+number)?|teleport(?:\s+me)?\s+to\s+page(?:\s+number)?|flip\s+to\s+page(?:\s+number)?|page(?:\s+number)?|p\.?|pg\.?)\s*[:#-]?\s*(\b\d{1,4}\b)/i) || q.match(/^\s*(\d{1,4})\s*$/);
      
      // 2. Syllabus chapter lookups
      let matchedChapter = null;
      const lowerQ = q.toLowerCase();
      
      Object.keys(DAV_PAGE_INDEX).forEach((key) => {
        if (book.title.toLowerCase().includes(key) || (book.subject && book.subject.toLowerCase().includes(key))) {
          const list = DAV_PAGE_INDEX[key];
          const found = list.find(item => 
            lowerQ.includes(item.name.toLowerCase()) || 
            lowerQ.includes(`chapter ${item.ch}`) ||
            lowerQ.includes(`ch ${item.ch}`) ||
            lowerQ.includes(`ch-${item.ch}`)
          );
          if (found) {
            matchedChapter = found;
          }
        }
      });

      if (matchedChapter) {
        setCurrentPage(matchedChapter.page);
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: `🎯 **Chapter Found:** **Chapter ${matchedChapter.ch}: ${matchedChapter.name}**\n\n🚀 **Automatically teleported you to Page ${matchedChapter.page}** of *${book.title}*!\n\nWould you like the key chapter summary, 5-mark important questions, or solved back-of-chapter answers for this topic?`
          }
        ]);
        setAiLoading(false);
        return;
      }

      if (pageMatch && parseInt(pageMatch[1], 10) > 0 && parseInt(pageMatch[1], 10) <= 600) {
        const targetPage = parseInt(pageMatch[1], 10);
        setCurrentPage(targetPage);
        setAiMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: `🚀 **Navigated directly to Page ${targetPage}** in *${book.title}*!\n\nThe full-page viewer has automatically opened Page ${targetPage}. Ask me anything about this page!`
          }
        ]);
        setAiLoading(false);
        return;
      }

      // General query -> Ask Shankar AI with textbook context
      const promptWithBookContext = `Student is reading the DAV textbook: "${book.title}" (Class ${book.classNum || 8} ${book.subject || ''}) at Page ${currentPage}.\n\nQuestion: ${q}`;
      const response = await askShankarAI(promptWithBookContext, {
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
          text: 'Error retrieving book intelligence. Please try asking again or type a page number above!'
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] w-screen h-screen flex flex-col bg-slate-950 overflow-hidden font-sans animate-fadeIn select-none"
    >
      
      {/* Top Fullscreen Header & Teleport Bar */}
      <header className="p-2 sm:p-2.5 bg-stone-900 border-b border-orange-500/40 text-white flex items-center justify-between flex-wrap gap-2 shrink-0">
        
        {/* Book Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-600/30 border border-orange-500 flex items-center justify-center text-amber-300 font-extrabold text-xs shrink-0">
            PDF
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
              {viewerMode === 'gdrive' ? (
                <span className="text-blue-300 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                  Google Drive Live PDF Editor Active
                </span>
              ) : (
                <span>Full-Screen Reader • <strong className="text-amber-300 font-mono">Page {currentPage}</strong></span>
              )}
            </p>
          </div>
        </div>

        {/* AI Page Teleporter Bar & Quick Navigation (Visible in Reading Mode) */}
        {viewerMode === 'reading' && (
          <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-950 border border-orange-500/40 rounded-xl px-2.5 py-1 text-xs">
            {/* Quick Prev & Next Page Steppers */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              title="Go to previous page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <span className="px-2 py-1 rounded-lg bg-stone-900 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
              Page {currentPage}
            </span>

            <button
              type="button"
              onClick={handleNextPage}
              className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              title="Go to next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-stone-800 hidden md:block" />

            <Navigation className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden md:inline" />
            <span className="text-[11px] font-bold text-orange-300 uppercase hidden md:inline">
              Jump:
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleTeleport(teleportInput);
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="number"
                placeholder="e.g. 50"
                min="1"
                max="600"
                value={teleportInput}
                onChange={(e) => setTeleportInput(e.target.value)}
                className="w-14 sm:w-16 px-2 py-1 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!teleportInput}
                className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-black text-xs transition cursor-pointer"
              >
                Go
              </button>
            </form>

            {/* Quick Teleport Preset Chips */}
            <div className="hidden lg:flex items-center gap-1 pl-2 border-l border-stone-800 text-[10px]">
              {[1, 20, 50, 80, 100, 120].map((pg) => (
                <button
                  key={pg}
                  onClick={() => handleTeleport(pg)}
                  className={`px-1.5 py-0.5 rounded border transition cursor-pointer font-mono ${
                    currentPage === pg 
                      ? 'bg-amber-500 text-stone-950 font-bold border-amber-400' 
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                  }`}
                >
                  p.{pg}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls: Mode Switcher, Google Drive, AI Companion, Download, Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Viewer Mode Switcher: Reading Mode vs Google Drive Live PDF Editor */}
          <div className="flex items-center bg-stone-950 p-1 rounded-xl border border-stone-700 text-xs">
            <button
              type="button"
              onClick={() => setViewerMode('reading')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewerMode === 'reading'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-md'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Fast DAV Full-Page PDF Reader"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">DAV Reader</span>
            </button>

            <button
              type="button"
              onClick={() => setViewerMode('gdrive')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                viewerMode === 'gdrive'
                  ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-500/30'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
              title="Switch to Google Drive Live Cloud PDF Editor & Annotator"
            >
              <GoogleDriveIcon className="w-3.5 h-3.5" />
              <span>Google Drive Editor</span>
            </button>
          </div>

          {/* External Google Drive / Google Docs Direct Launch Button */}
          <a
            href={gdriveDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition border border-blue-400 shadow-md cursor-pointer"
            title="Open directly in Google Drive / Google Docs for Live PDF Editing & Annotation"
          >
            <GoogleDriveIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open in Drive</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>

          {/* AI Page Guide Companion Toggle */}
          <button
            onClick={() => setShowAiCompanion(!showAiCompanion)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
              showAiCompanion
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-black shadow-lg shadow-amber-500/20'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border-orange-500/40'
            }`}
            title="Toggle Shankar AI Page Guide"
          >
            <BlackDogLogo className="w-3.5 h-3.5" bgClassName="bg-stone-950" />
            <span className="hidden sm:inline">AI Guide</span>
          </button>

          {hasRealPdf && (
            <a
              href={pdfBaseSource}
              target="_blank"
              rel="noreferrer"
              download
              className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title="Download Original PDF"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="Close Fullscreen Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* GOOGLE DRIVE LIVE EDITOR CONTROL BAR (When in 'gdrive' mode) */}
      {viewerMode === 'gdrive' && (
        <div className="bg-stone-900 border-b border-blue-500/40 px-3 py-2 flex items-center justify-between flex-wrap gap-2 text-xs text-white z-40 shadow-xl">
          {/* Annotation Toolbar: Cursor, Pen, Highlighter, Eraser, Clear, Save */}
          <div className="flex items-center gap-1.5 bg-stone-950 p-1 rounded-xl border border-stone-700 text-xs flex-wrap">
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

            <button
              type="button"
              onClick={() => setAnnotationTool('pen')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
                annotationTool === 'pen' ? 'bg-blue-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
              }`}
              title="Draw with Pen Tool"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Pen</span>
            </button>

            <button
              type="button"
              onClick={() => setAnnotationTool('highlighter')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
                annotationTool === 'highlighter' ? 'bg-amber-500 text-stone-950 shadow-md font-black' : 'text-stone-400 hover:text-white'
              }`}
              title="Highlight Text with Highlighter"
            >
              <Highlighter className="w-3.5 h-3.5" />
              <span>Highlight</span>
            </button>

            <button
              type="button"
              onClick={() => setAnnotationTool('eraser')}
              className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition cursor-pointer ${
                annotationTool === 'eraser' ? 'bg-rose-600 text-white shadow-md' : 'text-stone-400 hover:text-white'
              }`}
              title="Erase Drawings"
            >
              <Eraser className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Eraser</span>
            </button>

            {/* Pen Color Palette */}
            {annotationTool === 'pen' && (
              <div className="flex items-center gap-1 pl-1 border-l border-stone-800">
                {['#ef4444', '#3b82f6', '#10b981', '#a855f7', '#ffffff', '#eab308'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPenColor(c)}
                    className={`w-3.5 h-3.5 rounded-full border cursor-pointer ${penColor === c ? 'scale-125 border-white ring-1 ring-white' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}

            {/* Highlighter Color Palette */}
            {annotationTool === 'highlighter' && (
              <div className="flex items-center gap-1 pl-1 border-l border-stone-800">
                {['#fde047', '#86efac', '#67e8f9', '#f472b6'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setHighlightColor(c)}
                    className={`w-3.5 h-3.5 rounded-full border cursor-pointer ${highlightColor === c ? 'scale-125 border-white ring-1 ring-white' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            )}

            {/* Clear All on Page */}
            <button
              type="button"
              onClick={handleClearAnnotations}
              className="p-1 rounded-lg text-stone-400 hover:text-rose-400 transition cursor-pointer"
              title="Clear All Annotations on This Page"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* SAVE ANNOTATIONS BUTTON */}
            <button
              type="button"
              onClick={handleSaveAnnotations}
              disabled={isSavingAnnotations}
              className={`px-3 py-1 rounded-lg font-black text-[11px] flex items-center gap-1.5 transition shadow-lg cursor-pointer ${
                hasUnsavedAnnotations
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 animate-pulse'
                  : 'bg-emerald-700/90 hover:bg-emerald-600 text-white'
              }`}
              title="Save Annotations Permanently (Local & Supabase Cloud)"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingAnnotations ? 'Saving...' : 'Save Annotations'}</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 bg-blue-950/80 border border-blue-500/50 px-2.5 py-1 rounded-lg">
              <GoogleDriveIcon className="w-4 h-4" />
              <span className="font-extrabold text-blue-300">Google Drive Live Cloud Editor</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            <span className="text-[11px] text-stone-300 hidden md:inline">
              Live Google Cloud PDF viewer with interactive highlighting, notes, and Google Docs editing.
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Custom Google Drive Link Input */}
            <form onSubmit={handleSaveCustomDriveUrl} className="flex items-center gap-1">
              <input
                type="url"
                placeholder="Paste custom Google Drive share link..."
                value={customDriveInput}
                onChange={(e) => setCustomDriveInput(e.target.value)}
                className="w-44 sm:w-60 px-2.5 py-1 text-[11px] bg-stone-950 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-blue-400"
              />
              <button
                type="submit"
                className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition cursor-pointer"
              >
                Apply
              </button>
              {activeDriveUrl && (
                <button
                  type="button"
                  onClick={handleClearCustomDriveUrl}
                  className="px-1.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[11px]"
                  title="Reset to official textbook PDF"
                >
                  Reset
                </button>
              )}
            </form>

            {/* Quick Actions */}
            <a
              href={gdocsEditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-[11px] flex items-center gap-1 transition shadow-sm"
              title="Open in Google Docs to convert and edit textbook text directly"
            >
              <span>Edit in Google Docs</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={handleCopyShareLink}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-[11px] flex items-center gap-1 transition"
              title="Copy Google Drive View link"
            >
              {copiedNotification ? <Check className="w-3 h-3 text-emerald-400" /> : <Link className="w-3 h-3 text-blue-400" />}
              <span>{copiedNotification ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={gdriveDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center gap-1 transition"
              title="Open Fullscreen in Google Drive"
            >
              <span>Fullscreen Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main Full-Screen Split Workspace */}
      <div className="flex-1 flex overflow-hidden bg-stone-900 relative">
        
        {/* PDF Frame & Interactive Workspace */}
        <div 
          ref={containerRef} 
          className="flex-1 h-full bg-stone-950 flex flex-col overflow-hidden relative select-none"
        >
          
          {hasRealPdf || activeDriveUrl ? (
            <div className="relative w-full h-full overflow-hidden">
              
              {/* Interactive Pen & Highlighter Drawing Canvas Overlay */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 z-30 w-full h-full block"
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

              {/* Toast Notification */}
              {annotationToast && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl flex items-center gap-2 animate-fadeIn pointer-events-none">
                  <Check className="w-4 h-4" />
                  <span>{annotationToast}</span>
                </div>
              )}
              
              {/* GOOGLE DRIVE LIVE VIEWER & EDITOR IFRAME */}
              {viewerMode === 'gdrive' ? (
                <iframe
                  key={`gdrive-${effectivePdfSource}`}
                  src={gdriveEmbedUrl}
                  title={`${book.title} - Google Drive Viewer`}
                  className="w-full h-full border-none bg-white block select-none pointer-events-auto"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                /* STANDARD DAV PDF READER IFRAME */
                <>
                  <iframe
                    key={`${book.title || 'pdf-viewer'}-page-${currentPage}`}
                    ref={iframeRef}
                    src={pdfSourceWithPage}
                    title={book.title}
                    className="w-full h-full border-none bg-white block select-none pointer-events-auto"
                  />

                  {/* Floating Page Flip Controls (Left & Right) */}
                  {currentPage > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevPage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition backdrop-blur-md cursor-pointer group"
                      title={`Go back to Page ${currentPage - 1}`}
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNextPage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition backdrop-blur-md cursor-pointer group"
                    title={`Go forward to Page ${currentPage + 1}`}
                  >
                    <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>

                  {/* Bottom Reading Helper Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-25 px-3 py-1 rounded-full bg-stone-950/90 text-stone-300 border border-stone-700 text-[10px] font-medium flex items-center gap-2 pointer-events-none shadow-xl backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Reading Mode • Page {currentPage} • Scroll freely to read</span>
                  </div>
                </>
              )}

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center text-white">
              <div className="max-w-md bg-stone-900 p-8 rounded-3xl border border-orange-500/40 space-y-4">
                <BookOpen className="w-12 h-12 text-amber-400 mx-auto" />
                <h4 className="text-xl font-bold">{book.title}</h4>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {book.summary || 'Official DAV textbook curriculum notes are integrated directly into Shankar AI.'}
                </p>
                <button
                  onClick={() => onOpenAIWithQuestion(`Give me full chapter notes and solved questions for ${book.title}`)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Complete Notes in Shankar AI</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Embedded Shankar AI Page Guide Companion Sidebar */}
        {showAiCompanion && (
          <aside className="w-full sm:w-96 md:w-[420px] h-full bg-slate-950 border-l border-orange-500/40 flex flex-col z-30 shadow-2xl animate-slideLeft">
            
            {/* Sidebar Top Header */}
            <div className="p-3 bg-stone-900 border-b border-orange-500/30 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <BlackDogLogo className="w-7 h-7" bgClassName="bg-stone-950 border border-amber-400" />
                <div>
                  <h4 className="text-xs font-black uppercase text-amber-300">Shankar AI Page Guide</h4>
                  <p className="text-[10px] text-stone-400">Context: {book.title} • Page {currentPage}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAiCompanion(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Prompts For Book & Page Teleportation */}
            <div className="p-2 bg-stone-900/60 border-b border-stone-800 flex items-center gap-1.5 overflow-x-auto text-[10px] whitespace-nowrap scrollbar-thin">
              <button
                onClick={() => handleSendAiMessage({ preventDefault: () => {} }, setAiQuestion('Go to page 100'))}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-orange-950 text-orange-200 border border-orange-500/30 cursor-pointer"
              >
                🚀 Open Page 100
              </button>
              <button
                onClick={() => setAiQuestion(`Where is Our Constitution in this book?`)}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-orange-950 text-orange-200 border border-orange-500/30 cursor-pointer"
              >
                📍 Find Chapter
              </button>
              <button
                onClick={() => setAiQuestion(`Summarize key concepts from page ${currentPage} of ${book.title}`)}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-orange-950 text-orange-200 border border-orange-500/30 cursor-pointer"
              >
                Summarize Page {currentPage}
              </button>
              <button
                onClick={() => setAiQuestion(`Give me the top 3 examination questions from this chapter`)}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-orange-950 text-orange-200 border border-orange-500/30 cursor-pointer"
              >
                Top 3 Exam Questions
              </button>
            </div>

            {/* Companion Messages Area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-stone-950 text-xs text-stone-200">
              {aiMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl ${
                    m.role === 'user'
                      ? 'bg-orange-600 text-white ml-6 rounded-br-xs'
                      : 'bg-stone-900 border border-stone-800 text-stone-200 mr-4 rounded-bl-xs leading-relaxed whitespace-pre-wrap'
                  }`}
                >
                  {m.text}
                </div>
              ))}

              {aiLoading && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-900 text-amber-300 border border-stone-800">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-400" />
                  <span className="text-[11px]">Shankar AI navigating and analyzing...</span>
                </div>
              )}
            </div>

            {/* Companion Chat Input */}
            <form onSubmit={handleSendAiMessage} className="p-2.5 bg-stone-900 border-t border-orange-500/30 flex gap-1.5">
              <input
                type="text"
                placeholder="e.g. 'Go to page 100' or 'Where is Chapter 16?'..."
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-xl text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={!aiQuestion.trim() || aiLoading}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs disabled:opacity-40 cursor-pointer"
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
