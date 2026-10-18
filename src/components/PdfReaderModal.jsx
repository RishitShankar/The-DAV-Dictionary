import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Download, BookOpen, Brain, Sparkles, 
  Send, Navigation, RefreshCw, Edit3, Type,
  Palette, Trash2, CheckCircle2, ChevronRight, ChevronLeft,
  Highlighter, HelpCircle, Eye, EyeOff, Save,
  RotateCcw, RotateCw, Sparkle, ArrowRight, Move, Sliders,
  Check
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
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

// 10 NEON COLORS FOR HIGHLIGHTER
const NEON_HIGHLIGHTER_COLORS = [
  { name: 'Neon Cyber Yellow', hex: '#facc15' },
  { name: 'Neon Electric Green', hex: '#22c55e' },
  { name: 'Neon Fluorescent Pink', hex: '#ec4899' },
  { name: 'Neon Solar Orange', hex: '#f97316' },
  { name: 'Neon Electric Cyan', hex: '#06b6d4' },
  { name: 'Neon Lime Flash', hex: '#84cc16' },
  { name: 'Neon Vivid Violet', hex: '#a855f7' },
  { name: 'Neon Radiant Coral', hex: '#f43f5e' },
  { name: 'Neon Aqua Mint', hex: '#14b8a6' },
  { name: 'Neon Bright Sky', hex: '#38bdf8' }
];

// 10 CLASSIC COLORS FOR PEN
const CLASSIC_PEN_COLORS = [
  { name: 'School Black', hex: '#0f172a' },
  { name: 'Dark Navy', hex: '#1e3a8a' },
  { name: 'School Red', hex: '#dc2626' },
  { name: 'Forest Green', hex: '#15803d' },
  { name: 'Royal Purple', hex: '#7e22ce' },
  { name: 'Amber Brown', hex: '#78350f' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Burnt Orange', hex: '#c2410c' },
  { name: 'Slate Grey', hex: '#475569' },
  { name: 'Dark Crimson', hex: '#991b1b' }
];

// 10 THICKNESS MODELS FOR HIGHLIGHTER
const HIGHLIGHTER_THICKNESSES = [10, 14, 18, 22, 26, 30, 34, 38, 42, 46];

// 6 THICKNESS MODELS FOR PEN
const PEN_THICKNESSES = [1, 2, 3, 5, 8, 12];

// 7 WRITING STYLE OPTIONS FOR TYPE NOTE
const NOTE_FONTS = [
  { id: 'standard', name: 'DAV Sans', className: 'font-sans font-normal' },
  { id: 'italian', name: 'Italian Cursive', className: 'font-serif italic tracking-wide' },
  { id: 'german', name: 'German Gothic', className: 'font-serif font-black tracking-wider uppercase' },
  { id: 'handwriting', name: 'Handwriting Script', className: 'font-mono font-semibold' },
  { id: 'typewriter', name: 'Typewriter Monospace', className: 'font-mono tracking-tight' },
  { id: 'chalk', name: 'Blackboard Chalk', className: 'font-sans font-black tracking-widest uppercase' },
  { id: 'calligraphy', name: 'Royal Calligraphy', className: 'font-serif italic font-bold' }
];

export function PdfReaderModal({ isOpen, onClose, book, onOpenAIWithQuestion, currentUser }) {
  if (!isOpen || !book) return null;

  const [currentPage, setCurrentPage] = useState(1);
  const [teleportInput, setTeleportInput] = useState('');
  const [showAiCompanion, setShowAiCompanion] = useState(true);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  // Editor & Annotation State
  // Tools: 'pen' | 'highlighter' | 'whitener' | 'text' | 'eraser'
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [editorTool, setEditorTool] = useState('highlighter');
  const [penColor, setPenColor] = useState(CLASSIC_PEN_COLORS[0].hex);
  const [penThickness, setPenThickness] = useState(3);
  const [penStyle, setPenStyle] = useState('normal'); // 'normal' | 'bold' | 'italian'
  
  const [highlighterColor, setHighlighterColor] = useState(NEON_HIGHLIGHTER_COLORS[0].hex);
  const [highlighterThickness, setHighlighterThickness] = useState(22);
  
  const [whitenerThickness, setWhitenerThickness] = useState(24);
  const [noteFontStyle, setNoteFontStyle] = useState('standard');
  const [textNotes, setTextNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [activeNotePosition, setActiveNotePosition] = useState(null);

  // Undo & Redo History Stacks
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // Dragging state for notes
  const [draggingNoteId, setDraggingNoteId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ startX: 0, startY: 0, initX: 0, initY: 0 });

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: `👋 I am your **Shankar AI Page Guide** for **"${book.title}"** (Class ${book.classNum || 8}).

⚡ **Automatic Navigation:**
* Type **"Go to page 100"**, **"Open page 80"**, or enter any number above, and I will **automatically flip the book** directly to that page!
* Ask **"Where is Chapter 16?"** or **"Where is Our Constitution?"**, and I will look up the syllabus and teleport you directly to the chapter!`
    }
  ]);

  const hasRealPdf = Boolean(book.pdfUrl || book.fileData);
  const rawSource = book.pdfUrl || book.fileData || '';
  const pdfBaseSource = (rawSource.startsWith('data:') || rawSource.startsWith('blob:'))
    ? rawSource
    : encodeURI(rawSource);

  // Offset of +2 pages so book page 1 maps to PDF file page 3 (accounting for cover + preface)
  const pdfPhysicalPage = currentPage + 2;
  // In editor mode, lock view cleanly to Fit and disable native scrolling so drawings stay 100% attached to their page
  const pdfSourceWithPage = isEditorActive
    ? `${pdfBaseSource}#page=${pdfPhysicalPage}&view=Fit&toolbar=0&navpanes=0&scrollbar=0`
    : `${pdfBaseSource}#page=${pdfPhysicalPage}&toolbar=1`;

  // Storage keys for page-specific canvas and notes
  const storageKeyNotes = `dav_pdf_notes_${book.title}_p${currentPage}`;
  const storageKeyCanvas = `dav_pdf_canvas_${book.title}_p${currentPage}`;

  const iframeRef = useRef(null);

  // Page flipping handlers that save the current page and switch clean state
  const handlePrevPage = () => {
    if (currentPage > 1) {
      saveCanvasData(currentPage);
      setUndoStack([]);
      setRedoStack([]);
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    saveCanvasData(currentPage);
    setUndoStack([]);
    setRedoStack([]);
    setCurrentPage(prev => prev + 1);
  };

  // Keyboard arrow listener for smooth page navigation without reload
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isEditorActive]);

  // Wheel listener to flip pages cleanly when editor is active
  const handleContainerWheel = (e) => {
    if (!isEditorActive) return;
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 450) return;
    if (e.deltaY > 60) {
      lastWheelTimeRef.current = now;
      handleNextPage();
    } else if (e.deltaY < -60) {
      lastWheelTimeRef.current = now;
      handlePrevPage();
    }
  };

  // Resize canvas so coordinates match mouse 1:1 exactly
  const syncCanvasDimensions = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const rect = container.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        restoreCanvas();
      }
    }
  };

  useEffect(() => {
    syncCanvasDimensions();
    window.addEventListener('resize', syncCanvasDimensions);
    return () => window.removeEventListener('resize', syncCanvasDimensions);
  }, [currentPage, isEditorActive]);

  // Load saved notes & drawings for the current page
  useEffect(() => {
    // 1. Load notes
    try {
      const saved = localStorage.getItem(storageKeyNotes);
      if (saved) {
        setTextNotes(JSON.parse(saved));
      } else {
        setTextNotes([]);
      }
    } catch (e) {
      setTextNotes([]);
    }

    // 2. Load canvas drawing
    restoreCanvas();
  }, [currentPage, book.title]);

  const restoreCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Instant local load from browser cache
    let localData = null;
    try {
      localData = localStorage.getItem(storageKeyCanvas);
      if (localData) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
        img.src = localData;
      }
    } catch (e) {}

    // 2. Cloud sync from Supabase
    try {
      const activeUid = currentUser?.id || 'default_student';
      const cloudData = await loadCloudPdfAnnotation(activeUid, book.title, currentPage);
      if (cloudData && cloudData.canvas_data) {
        if (!localData || localData !== cloudData.canvas_data) {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, 0, 0);
          };
          img.src = cloudData.canvas_data;
          try {
            localStorage.setItem(storageKeyCanvas, cloudData.canvas_data);
          } catch (e) {}
        }
      }
      if (cloudData && Array.isArray(cloudData.notes) && cloudData.notes.length > 0) {
        setTextNotes(prev => (prev.length === 0 ? cloudData.notes : prev));
      }
    } catch (err) {
      console.warn('Supabase PDF annotation load error:', err);
    }
  };

  // Save notes to localStorage & Supabase Cloud
  const saveNotes = (updatedNotes) => {
    setTextNotes(updatedNotes);
    try {
      localStorage.setItem(storageKeyNotes, JSON.stringify(updatedNotes));
      const canvas = canvasRef.current;
      const dataUrl = canvas ? canvas.toDataURL() : null;
      const activeUid = currentUser?.id || 'default_student';
      saveCloudPdfAnnotation(activeUid, book.title, currentPage, dataUrl, updatedNotes);
    } catch (e) {}
  };

  // Save canvas to localStorage & Supabase Cloud
  const saveCanvasData = (pageToSave = currentPage) => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        const dataUrl = canvas.toDataURL();
        const pageKey = `dav_pdf_canvas_${book.title}_p${pageToSave}`;
        localStorage.setItem(pageKey, dataUrl);
        const activeUid = currentUser?.id || 'default_student';
        saveCloudPdfAnnotation(activeUid, book.title, pageToSave, dataUrl, textNotes);
      } catch (e) {}
    }
  };

  const handleTeleport = (pageNumber) => {
    const p = parseInt(pageNumber, 10);
    if (!isNaN(p) && p > 0) {
      // Save existing page drawing before navigating
      saveCanvasData(currentPage);
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
      // 1. Direct Page Match: e.g. "go to page 100", "page 100", "open 100", "p. 80"
      const pageMatch = q.match(/(?:page|p\.?|goto|go to|open|jump to|take me to)?\s*(\b\d{1,3}\b)/i);
      
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
        saveCanvasData(currentPage);
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
        if (/page|p\.|go|open|jump|teleport|take me|\b\d{1,3}\b/i.test(q)) {
          saveCanvasData(currentPage);
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

  // Helper for 100% accurate cursor coordinates
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  // Canvas drawing handlers with 100% pinpoint accuracy
  const startDrawing = (e) => {
    if (!isEditorActive || editorTool === 'text') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);

    // Save current canvas state to undo stack before starting new stroke
    try {
      const snapshot = canvas.toDataURL();
      setUndoStack(prev => [...prev.slice(-25), snapshot]);
      setRedoStack([]); // Clear redo stack on new action
    } catch (err) {}

    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (editorTool === 'highlighter') {
      // Semi-transparent neon stroke combined with mixBlendMode: 'multiply' on canvas element
      // makes the text 100% visible and unblocked underneath!
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = highlighterColor + '80'; // 50% opacity
      ctx.lineWidth = highlighterThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (editorTool === 'whitener') {
      // Pure opaque white correction fluid
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = whitenerThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (editorTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = penColor;
      
      let finalThickness = penThickness;
      if (penStyle === 'bold') finalThickness = Math.round(penThickness * 1.6);
      ctx.lineWidth = finalThickness;

      if (penStyle === 'italian') {
        ctx.lineCap = 'square'; // Slanted calligraphy aesthetic
      } else {
        ctx.lineCap = 'round';
      }
      ctx.lineJoin = 'round';
    } else if (editorTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 28;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e) => {
    if (!isDrawingRef.current || !isEditorActive || editorTool === 'text') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveCanvasData();
    }
  };

  // Undo last drawing stroke
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length === 0) return;
    const ctx = canvas.getContext('2d');
    const previousSnapshot = undoStack[undoStack.length - 1];
    const currentSnapshot = canvas.toDataURL();

    setRedoStack(prev => [...prev.slice(-25), currentSnapshot]);
    setUndoStack(prev => prev.slice(0, prev.length - 1));

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      saveCanvasData();
    };
    img.src = previousSnapshot;
  };

  // Redo previously undone stroke
  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;
    const ctx = canvas.getContext('2d');
    const nextSnapshot = redoStack[redoStack.length - 1];
    const currentSnapshot = canvas.toDataURL();

    setUndoStack(prev => [...prev.slice(-25), currentSnapshot]);
    setRedoStack(prev => prev.slice(0, prev.length - 1));

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      saveCanvasData();
    };
    img.src = nextSnapshot;
  };

  // Keyboard shortcut listener for Ctrl+Z (Undo) and Ctrl+Y (Redo)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isEditorActive) return;
      if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditorActive, undoStack, redoStack]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        const snapshot = canvas.toDataURL();
        setUndoStack(prev => [...prev.slice(-25), snapshot]);
        setRedoStack([]);
      } catch (err) {}

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveCanvasData();
    }
  };

  // Add text note onto the page
  const handleCanvasClick = (e) => {
    if (!isEditorActive || editorTool !== 'text' || draggingNoteId) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setActiveNotePosition({ x, y });
  };

  const submitTextNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !activeNotePosition) return;

    const newNote = {
      id: Date.now(),
      text: newNoteText.trim(),
      x: activeNotePosition.x,
      y: activeNotePosition.y,
      fontStyle: noteFontStyle,
      color: penColor,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    saveNotes([...textNotes, newNote]);
    setNewNoteText('');
    setActiveNotePosition(null);
  };

  const deleteNote = (noteId) => {
    saveNotes(textNotes.filter(n => n.id !== noteId));
  };

  // Dragging handlers for movable notes
  const startDragNote = (e, note) => {
    e.stopPropagation();
    setDraggingNoteId(note.id);
    setDragOffset({
      startX: e.clientX,
      startY: e.clientY,
      initX: note.x,
      initY: note.y
    });
  };

  const onContainerMouseMove = (e) => {
    if (draggingNoteId) {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const deltaX = ((e.clientX - dragOffset.startX) / rect.width) * 100;
      const deltaY = ((e.clientY - dragOffset.startY) / rect.height) * 100;

      setTextNotes(prev => prev.map(n => {
        if (n.id === draggingNoteId) {
          return {
            ...n,
            x: Math.max(2, Math.min(88, dragOffset.initX + deltaX)),
            y: Math.max(2, Math.min(88, dragOffset.initY + deltaY))
          };
        }
        return n;
      }));
    }
  };

  const onContainerMouseUp = () => {
    if (draggingNoteId) {
      setDraggingNoteId(null);
      saveNotes(textNotes);
    }
  };

  // Font CSS helper
  const getNoteFontClass = (styleId) => {
    const f = NOTE_FONTS.find(item => item.id === styleId);
    return f ? f.className : 'font-sans font-normal';
  };

  return (
    <div 
      onMouseMove={onContainerMouseMove}
      onMouseUp={onContainerMouseUp}
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
              Full-Screen Reader • <strong className="text-amber-300 font-mono">Page {currentPage}</strong>
            </p>
          </div>
        </div>

        {/* AI Page Teleporter Bar & Quick Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-stone-950 border border-orange-500/40 rounded-xl px-2.5 py-1 text-xs">
          {/* Quick Prev & Next Page Steppers */}
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            title="Go to previous page (Drawings stay saved)"
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
            title="Go to next page (Drawings stay saved)"
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

        {/* Action Controls: Editor, AI Companion, Download, Close */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Page Editor Toggle Button */}
          <button
            onClick={() => setIsEditorActive(!isEditorActive)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
              isEditorActive
                ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-black shadow-lg shadow-emerald-500/20'
                : 'bg-stone-800 hover:bg-stone-700 text-emerald-300 border-emerald-500/40'
            }`}
            title="Toggle Page Annotation & Note Editor"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEditorActive ? 'Editing Mode' : 'Edit Page'}</span>
          </button>

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
            onClick={() => {
              saveCanvasData();
              onClose();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
            title="Close Fullscreen Reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </header>

      {/* COMPREHENSIVE 5-SECTION EDITOR TOOLBAR */}
      {isEditorActive && (
        <div className="bg-stone-900/98 border-b border-emerald-500/40 px-3 py-2 flex items-center justify-between flex-wrap gap-2 text-xs text-white z-40 shadow-xl backdrop-blur-md">
          
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* 5 Distinct Tools: Pen | Highlighter | Whitener | Type Note | Eraser */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-xl border border-stone-700">
              <button
                type="button"
                onClick={() => setEditorTool('pen')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  editorTool === 'pen'
                    ? 'bg-emerald-500 text-stone-950'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Edit3 className="w-3 h-3" />
                Pen (10 Colors)
              </button>

              <button
                type="button"
                onClick={() => setEditorTool('highlighter')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  editorTool === 'highlighter'
                    ? 'bg-amber-400 text-stone-950'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Highlighter className="w-3 h-3" />
                Highlighter (10 Neon)
              </button>

              <button
                type="button"
                onClick={() => setEditorTool('whitener')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  editorTool === 'whitener'
                    ? 'bg-white text-stone-950'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-400 inline-block" />
                Whitener
              </button>

              <button
                type="button"
                onClick={() => setEditorTool('text')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  editorTool === 'text'
                    ? 'bg-cyan-500 text-stone-950'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Type className="w-3 h-3" />
                Type Note (7 Fonts)
              </button>

              <button
                type="button"
                onClick={() => setEditorTool('eraser')}
                className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition ${
                  editorTool === 'eraser'
                    ? 'bg-rose-500 text-white'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                Eraser
              </button>
            </div>

            {/* DYNAMIC PALETTE & CONTROLS BASED ON ACTIVE TOOL */}

            {/* If Highlighter: 10 NEON COLORS & 10 THICKNESS MODELS */}
            {editorTool === 'highlighter' && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-700 flex-wrap">
                <span className="text-[10px] text-amber-300 font-bold uppercase">Neon Colors:</span>
                <div className="flex items-center gap-1">
                  {NEON_HIGHLIGHTER_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setHighlighterColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-4 h-4 rounded-full border transition-transform ${
                        highlighterColor === c.hex ? 'scale-125 border-white ring-2 ring-amber-400' : 'border-stone-800 opacity-90'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-amber-300 font-bold uppercase pl-2">Thickness (10 Models):</span>
                <div className="flex items-center gap-1">
                  {HIGHLIGHTER_THICKNESSES.map((th, idx) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setHighlighterThickness(th)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition ${
                        highlighterThickness === th ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* If Pen: 10 CLASSIC COLORS, THICKNESS & STYLES (Normal, Bold, Italian) */}
            {editorTool === 'pen' && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-700 flex-wrap">
                <span className="text-[10px] text-emerald-300 font-bold uppercase">Pen Colors:</span>
                <div className="flex items-center gap-1">
                  {CLASSIC_PEN_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.name}
                      onClick={() => setPenColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-4 h-4 rounded-full border transition-transform ${
                        penColor === c.hex ? 'scale-125 border-white ring-2 ring-emerald-400' : 'border-stone-800 opacity-90'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[10px] text-emerald-300 font-bold uppercase pl-2">Thickness:</span>
                <div className="flex items-center gap-1">
                  {PEN_THICKNESSES.map((th) => (
                    <button
                      key={th}
                      type="button"
                      onClick={() => setPenThickness(th)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition ${
                        penThickness === th ? 'bg-emerald-400 text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                      }`}
                    >
                      {th}px
                    </button>
                  ))}
                </div>

                <span className="text-[10px] text-emerald-300 font-bold uppercase pl-2">Style:</span>
                <div className="flex items-center gap-1 bg-stone-950 p-0.5 rounded-lg border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setPenStyle('normal')}
                    className={`px-2 py-0.5 rounded text-[10px] ${penStyle === 'normal' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300'}`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenStyle('bold')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${penStyle === 'bold' ? 'bg-emerald-500 text-stone-950' : 'text-stone-300'}`}
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => setPenStyle('italian')}
                    className={`px-2 py-0.5 rounded text-[10px] italic font-serif ${penStyle === 'italian' ? 'bg-emerald-500 text-stone-950 font-bold' : 'text-stone-300'}`}
                  >
                    Italian
                  </button>
                </div>
              </div>
            )}

            {/* If Whitener: Thickness selector */}
            {editorTool === 'whitener' && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-700">
                <span className="text-[10px] text-white font-bold uppercase">Whitener Size:</span>
                {[12, 18, 24, 32, 42].map((wSize) => (
                  <button
                    key={wSize}
                    type="button"
                    onClick={() => setWhitenerThickness(wSize)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      whitenerThickness === wSize ? 'bg-white text-stone-950 font-bold' : 'bg-stone-800 text-stone-300'
                    }`}
                  >
                    {wSize}px
                  </button>
                ))}
              </div>
            )}

            {/* If Type Note: 7 WRITING STYLE OPTIONS */}
            {editorTool === 'text' && (
              <div className="flex items-center gap-2 pl-2 border-l border-stone-700 flex-wrap">
                <span className="text-[10px] text-cyan-300 font-bold uppercase">7 Writing Styles:</span>
                <select
                  value={noteFontStyle}
                  onChange={(e) => setNoteFontStyle(e.target.value)}
                  className="bg-stone-950 border border-cyan-500/50 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {NOTE_FONTS.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-stone-400 italic">Click anywhere on book to drop movable note</span>
              </div>
            )}

          </div>

          {/* Right Action buttons for editor */}
          <div className="flex items-center gap-2">
            {/* Undo Button */}
            <button
              type="button"
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs flex items-center gap-1.5 transition cursor-pointer border border-stone-700 shadow-xs"
              title="Undo last stroke (Ctrl+Z)"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Undo</span>
            </button>

            {/* Redo Button */}
            <button
              type="button"
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-stone-200 text-xs flex items-center gap-1.5 transition cursor-pointer border border-stone-700 shadow-xs"
              title="Redo stroke (Ctrl+Y)"
            >
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Redo</span>
            </button>

            <button
              type="button"
              onClick={clearCanvas}
              className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs flex items-center gap-1 cursor-pointer"
              title="Clear drawings on this page"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Page</span>
            </button>
            <button
              type="button"
              onClick={() => {
                saveCanvasData();
                setIsEditorActive(false);
              }}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <Save className="w-3 h-3" />
              Done / Save
            </button>
          </div>
        </div>
      )}

      {/* Main Full-Screen Split Workspace */}
      <div className="flex-1 flex overflow-hidden bg-stone-900 relative">
        
        {/* PDF Frame & Interactive Editor Overlay */}
        <div 
          ref={containerRef} 
          onWheel={handleContainerWheel}
          className="flex-1 h-full bg-stone-950 flex flex-col overflow-hidden relative"
        >
          
          {hasRealPdf ? (
            <div className="relative w-full h-full">
              
              {/* Sticky Page Annotation Lock Indicator when Editor Active */}
              {isEditorActive && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-stone-950/90 text-amber-300 border border-amber-500/50 shadow-2xl backdrop-blur-md text-[11px] font-bold flex items-center gap-2 pointer-events-none">
                  <Highlighter className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>Annotation Mode: Page {currentPage} Locked • Use ← / → to switch pages cleanly</span>
                </div>
              )}

              {/* PDF Viewer Iframe with Static Key to completely eliminate 2-3s blank page blink */}
              <iframe
                key={book.title || 'pdf-viewer'}
                ref={iframeRef}
                src={pdfSourceWithPage}
                title={book.title}
                className="w-full h-full border-none bg-white block"
              />

              {/* Floating Page Flip Controls (Left & Right) */}
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition backdrop-blur-md cursor-pointer group"
                  title={`Go back to Page ${currentPage - 1} (Drawings stay on their page)`}
                >
                  <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              )}

              <button
                type="button"
                onClick={handleNextPage}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-stone-950/80 hover:bg-amber-500 hover:text-stone-950 text-stone-300 border border-stone-700/80 shadow-2xl transition backdrop-blur-md cursor-pointer group"
                title={`Go forward to Page ${currentPage + 1} (Drawings stay on their page)`}
              >
                <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>

              {/* 100% ACCURATE DRAWING CANVAS LAYER WITH TRANSLUCENT MULTIPLY BLEND */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                style={{
                  mixBlendMode: editorTool === 'whitener' ? 'normal' : 'multiply'
                }}
                className={`absolute inset-0 w-full h-full z-20 ${
                  isEditorActive && editorTool !== 'text' 
                    ? 'pointer-events-auto cursor-crosshair' 
                    : 'pointer-events-none'
                }`}
              />

              {/* CLICK-TO-DROP & MOVABLE/DRAGGABLE TEXT NOTE LAYER */}
              <div
                onClick={handleCanvasClick}
                className={`absolute inset-0 w-full h-full z-20 ${
                  isEditorActive && editorTool === 'text'
                    ? 'pointer-events-auto cursor-text bg-cyan-950/10'
                    : 'pointer-events-none'
                }`}
              >
                {/* Placed & Movable Text Notes */}
                {textNotes.map((note) => (
                  <div
                    key={note.id}
                    style={{ left: `${note.x}%`, top: `${note.y}%` }}
                    className="absolute pointer-events-auto max-w-xs p-2.5 rounded-xl bg-stone-900/95 border-2 border-amber-400 text-white text-xs shadow-2xl backdrop-blur-md group"
                  >
                    {/* Draggable Note Header */}
                    <div 
                      onMouseDown={(e) => startDragNote(e, note)}
                      title="Click and drag to move note anywhere on page"
                      className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-stone-800 text-[10px] text-amber-300 cursor-move bg-stone-950/60 p-1 rounded"
                    >
                      <span className="font-bold flex items-center gap-1">
                        <Move className="w-3 h-3 text-amber-400" />
                        Movable Note
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note.id);
                        }}
                        className="text-stone-400 hover:text-rose-400 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <p className={`whitespace-pre-wrap leading-relaxed ${getNoteFontClass(note.fontStyle)}`}>
                      {note.text}
                    </p>
                  </div>
                ))}

                {/* Pop-up text input when student clicks to drop note */}
                {activeNotePosition && isEditorActive && (
                  <form
                    onSubmit={submitTextNote}
                    style={{ left: `${activeNotePosition.x}%`, top: `${activeNotePosition.y}%` }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute -translate-x-4 -translate-y-4 pointer-events-auto w-72 p-3.5 rounded-2xl bg-stone-900 border-2 border-cyan-400 shadow-2xl z-30 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                      <span>Add Note to Page {currentPage}</span>
                      <button
                        type="button"
                        onClick={() => setActiveNotePosition(null)}
                        className="text-stone-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Font Selector inside pop-up */}
                    <div>
                      <label className="block text-[10px] text-stone-400 font-bold uppercase mb-1">Writing Style:</label>
                      <select
                        value={noteFontStyle}
                        onChange={(e) => setNoteFontStyle(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-lg p-1.5 text-xs text-white"
                      >
                        {NOTE_FONTS.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      autoFocus
                      rows={3}
                      placeholder="Type your study note, summary, or teacher instructions..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className={`w-full bg-stone-950 border border-stone-700 rounded-xl p-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-cyan-400 ${getNoteFontClass(noteFontStyle)}`}
                    />
                    
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActiveNotePosition(null)}
                        className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!newNoteText.trim()}
                        className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-bold text-xs"
                      >
                        Save Note
                      </button>
                    </div>
                  </form>
                )}
              </div>

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
