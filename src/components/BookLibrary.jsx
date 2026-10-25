import React, { useState } from 'react';
import { DAV_SUBJECTS } from '../data/mockData';
import { 
  BookOpen, Calculator, Languages, HeartHandshake, Globe, Sparkles, 
  Compass, Cpu, FileText, Download, Eye, Upload, ChevronRight, Lock, 
  CheckCircle2, Search, ExternalLink, HelpCircle, BookMarked, Trash2,
  Award, Bookmark, ArrowRight, Layers, Flame, Check, Sparkle
} from 'lucide-react';

const ICON_MAP = {
  BookOpen,
  Calculator,
  Languages,
  HeartHandshake,
  Globe,
  Sparkles,
  Compass,
  Cpu
};

// Subject Color & Icon Art Details for Interactive 3D Book Graphic
const SUBJECT_ART_MAP = {
  math: {
    badge: '📐 DAV Math Core',
    spine: 'from-emerald-700 to-teal-900',
    coverGrad: 'from-emerald-600 via-teal-700 to-emerald-950',
    accent: '#34d399',
    symbol: '∑',
    neonBorder: 'border-emerald-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(52,211,153,0.65)]',
    neonBadge: 'bg-emerald-400/20 text-emerald-300 border-emerald-400/50'
  },
  english: {
    badge: '📖 DAV English Lit',
    spine: 'from-blue-700 to-indigo-950',
    coverGrad: 'from-blue-600 via-indigo-700 to-blue-950',
    accent: '#60a5fa',
    symbol: 'Aa',
    neonBorder: 'border-cyan-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(56,189,248,0.65)]',
    neonBadge: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/50'
  },
  hindi: {
    badge: '🪔 हिन्दी साहित्य',
    spine: 'from-orange-700 to-red-950',
    coverGrad: 'from-amber-600 via-orange-700 to-red-950',
    accent: '#fb923c',
    symbol: 'अ',
    neonBorder: 'border-amber-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.65)]',
    neonBadge: 'bg-amber-400/20 text-amber-300 border-amber-400/50'
  },
  science: {
    badge: '🔬 DAV Living World',
    spine: 'from-green-700 to-emerald-950',
    coverGrad: 'from-green-600 via-emerald-700 to-green-950',
    accent: '#4ade80',
    symbol: '⚛',
    neonBorder: 'border-lime-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(163,230,53,0.65)]',
    neonBadge: 'bg-lime-400/20 text-lime-300 border-lime-400/50'
  },
  'social science': {
    badge: '🌍 We & Our World',
    spine: 'from-purple-800 to-indigo-950',
    coverGrad: 'from-purple-600 via-indigo-800 to-slate-950',
    accent: '#c084fc',
    symbol: '🌐',
    neonBorder: 'border-fuchsia-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(217,70,239,0.65)]',
    neonBadge: 'bg-fuchsia-400/20 text-fuchsia-300 border-fuchsia-400/50'
  },
  sanskrit: {
    badge: '🕉️ सुरभि संस्कृतम्',
    spine: 'from-amber-700 to-orange-950',
    coverGrad: 'from-orange-500 via-amber-700 to-orange-950',
    accent: '#facc15',
    symbol: 'ॐ',
    neonBorder: 'border-yellow-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(250,204,21,0.65)]',
    neonBadge: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/50'
  },
  computer: {
    badge: '💻 Hands On ICT',
    spine: 'from-cyan-700 to-blue-950',
    coverGrad: 'from-cyan-600 via-blue-700 to-slate-950',
    accent: '#38bdf8',
    symbol: '< / >',
    neonBorder: 'border-blue-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(96,165,250,0.65)]',
    neonBadge: 'bg-blue-400/20 text-blue-300 border-blue-400/50'
  },
  evs: {
    badge: '🌱 Environmental Studies',
    spine: 'from-teal-700 to-emerald-950',
    coverGrad: 'from-emerald-500 via-teal-700 to-emerald-950',
    accent: '#2dd4bf',
    symbol: '🌿',
    neonBorder: 'border-teal-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(45,212,191,0.65)]',
    neonBadge: 'bg-teal-400/20 text-teal-300 border-teal-400/50'
  },
  'general knowledge': {
    badge: '🏆 Kid Wiz Quiz',
    spine: 'from-yellow-700 to-amber-950',
    coverGrad: 'from-amber-500 via-yellow-600 to-amber-900',
    accent: '#fde047',
    symbol: '★',
    neonBorder: 'border-rose-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(251,113,133,0.65)]',
    neonBadge: 'bg-rose-400/20 text-rose-300 border-rose-400/50'
  },
  'art & craft': {
    badge: '🎨 Creative Art',
    spine: 'from-pink-700 to-rose-950',
    coverGrad: 'from-pink-500 via-rose-600 to-purple-950',
    accent: '#f472b6',
    symbol: '✎',
    neonBorder: 'border-pink-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(244,114,182,0.65)]',
    neonBadge: 'bg-pink-400/20 text-pink-300 border-pink-400/50'
  },
  activity: {
    badge: '🧩 Integrated Workbook',
    spine: 'from-purple-700 to-amber-950',
    coverGrad: 'from-purple-600 via-amber-600 to-stone-900',
    accent: '#fbbf24',
    symbol: '✦',
    neonBorder: 'border-violet-400',
    neonGlow: 'hover:shadow-[0_0_35px_rgba(167,139,250,0.65)]',
    neonBadge: 'bg-violet-400/20 text-violet-300 border-violet-400/50'
  }
};

function getSubjectKey(subjectStr = '') {
  const s = subjectStr.toLowerCase();
  if (s.includes('math')) return 'math';
  if (s.includes('evs') || s.includes('environmental')) return 'evs';
  if (s.includes('english') || s.includes('literature') || s.includes('reader')) return 'english';
  if (s.includes('hindi') || s.includes('ज्ञान') || s.includes('अभ्यास') || s.includes('माधुरी') || s.includes('bhasha') || s.includes('gyan') || s.includes('abhyas') || s.includes('बाल') || s.includes('शब्द')) return 'hindi';
  if (s.includes('sanskrit') || s.includes('संस्कृत') || s.includes('सुरभि') || s.includes('surabhi') || s.includes('surbhi')) return 'sanskrit';
  if (s.includes('social') || s.includes('we and our world') || s.includes('sst')) return 'social science';
  if (s.includes('science') || s.includes('living world')) return 'science';
  if (s.includes('computer') || s.includes('ict') || s.includes('online with')) return 'computer';
  if (s.includes('knowledge') || s.includes('kid wiz') || s.includes('gk') || s.includes('general')) return 'general knowledge';
  if (s.includes('art') || s.includes('drawing') || s.includes('craft')) return 'art & craft';
  if (s.includes('activity')) return 'activity';
  return 'english';
}

function getCleanSubjectName(subjectStr = '', fallback = 'Subject') {
  const k = getSubjectKey(subjectStr);
  const names = {
    math: 'Math',
    english: 'English',
    hindi: 'Hindi',
    science: 'Science',
    'social science': 'Social Science',
    sanskrit: 'Sanskrit',
    computer: 'Computer',
    evs: 'EVS',
    'general knowledge': 'General Knowledge',
    'art & craft': 'Art & Craft',
    activity: 'Activity Workbook'
  };
  return names[k] || fallback;
}

export function BookLibrary({ 
  currentUser,
  onOpenPdfReader, 
  onOpenUploadModal,
  onOpenAIWithQuestion,
  uploadedPdfs = [],
  onDeletePdf
}) {
  const [selectedClass, setSelectedClass] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookTab, setSelectedBookTab] = useState({});
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Custom PDF Upload is strictly authorized ONLY for Dimension 5 (Faculty) and Dimension 4 (Master Developer)
  const canUploadCustomPdf = Boolean(
    currentUser?.dimension === 4 ||
    currentUser?.dimension === 5 ||
    currentUser?.id === 'rishibhai' ||
    currentUser?.studentId === 'rishibhai'
  );


  const allUploaded = uploadedPdfs.length > 0 
    ? uploadedPdfs 
    : (() => {
        try {
          return JSON.parse(localStorage.getItem('dav_uploaded_pdfs') || '[]');
        } catch (e) {
          return [];
        }
      })();

  const classUploadedPdfs = allUploaded.filter(p => String(p.classNum) === String(selectedClass));
  const subjects = DAV_SUBJECTS[selectedClass] || [];

  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tagline && s.tagline.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.books && s.books.some(b => b.title.toLowerCase().includes(searchQuery.toLowerCase())));
    
    if (!matchesSearch) return false;
    if (activeFilter === 'ALL') return true;

    const subKey = getSubjectKey(s.name);
    if (activeFilter === 'MATH' && subKey === 'math') return true;
    if (activeFilter === 'ENGLISH' && subKey === 'english') return true;
    if (activeFilter === 'HINDI' && subKey === 'hindi') return true;
    if (activeFilter === 'SCIENCE' && (subKey === 'science' || subKey === 'evs')) return true;
    if (activeFilter === 'SST' && subKey === 'social science') return true;
    if (activeFilter === 'LANG' && (subKey === 'sanskrit' || subKey === 'hindi' || subKey === 'english')) return true;
    if (activeFilter === 'ICT' && subKey === 'computer') return true;

    return false;
  });

  const handleTabSelect = (subjectId, bookIndex) => {
    setSelectedBookTab(prev => ({
      ...prev,
      [subjectId]: bookIndex
    }));
  };

  return (
    <div id="library-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-all">
      
      {/* ========================================================================= */}
      {/* SECTION 2 HERO HEADER: With Rich DAV Graphic Motif & Verified Badges     */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-stone-900 text-white p-6 sm:p-10 mb-8 border border-red-900/50 shadow-2xl">
        {/* Subtle decorative background circles & radial glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/60 border border-red-500/40 text-[11px] font-black uppercase tracking-wider text-amber-300 mb-3 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Section 2 • Official DAV Digital Textbook Library</span>
              <span className="text-white/60">•</span>
              <span className="text-amber-200">5 Dimensions Compatible</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Official DAV Textbooks &amp; E-Books
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
              Complete, verified DAV Public School Board curriculum for <strong>LKG, UKG, and Classes 1 to 8</strong>. 
              Featuring interactive animated 3D book cards, crystal-clear digital pages, and instant cloud reading.
            </p>

            {/* Quick feature pill row */}
            <div className="flex flex-wrap items-center gap-3 mt-4 text-[11px] font-bold text-amber-200/90">
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Real Textbooks</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Interactive 3D Book Graphics</span>
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-xl border border-white/10">
                <Award className="w-3.5 h-3.5 text-rose-400" />
                <span>DAV Board Certified</span>
              </span>
            </div>
          </div>

          {/* Upload Custom Book PDF Button (Strictly for Faculty & Master Developer) */}
          {canUploadCustomPdf && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onOpenUploadModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer border border-amber-300 card-real-3d animate-glow-gold"
              >
                <Upload className="w-4 h-4 text-stone-950" />
                <span>Upload Custom PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CLASS SELECTOR TABS (LKG to Class 8)                                      */}
      {/* ========================================================================= */}
      <div className="bg-white/90 p-2 rounded-2xl flex flex-wrap gap-1.5 mb-6 border border-slate-200/80 shadow-sm">
        {[8, 7, 6, 5, 4, 3, 2, 1, 'UKG', 'LKG'].map((cls) => {
          const isSelected = selectedClass === cls;
          const label = (cls === 'LKG' || cls === 'UKG') ? cls : `Class ${cls}`;
          return (
            <button
              key={cls}
              onClick={() => {
                setSelectedClass(cls);
                setActiveFilter('ALL');
              }}
              className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-black transition-all text-center relative cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-red-800 to-red-950 text-white shadow-md shadow-red-950/30 scale-[1.03] border border-amber-400/40'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Uploaded Custom School PDFs for this class */}
      {classUploadedPdfs.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                Custom Uploaded Class {selectedClass} Materials ({classUploadedPdfs.length})
              </h3>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40">
              Personal Vault
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {classUploadedPdfs.map((up) => (
              <div key={up.id} className="p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between gap-3 hover:border-amber-400 transition-all">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-800 flex items-center justify-center shrink-0 font-black text-xs shadow-xs">
                    PDF
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-800 truncate" title={up.name}>{up.name}</div>
                    <div className="text-[10px] font-semibold text-slate-500">{up.subject || 'School Material'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onOpenPdfReader({
                      title: up.name,
                      subject: up.subject || 'School Subject',
                      classNum: selectedClass,
                      pdfUrl: up.data,
                      fileData: up.data,
                      summary: `Custom uploaded textbook material for Class ${selectedClass}.`
                    })}
                    className="px-3 py-1.5 rounded-xl bg-red-800 hover:bg-red-900 text-white text-[11px] font-black flex items-center gap-1 transition cursor-pointer shadow-xs"
                  >
                    <Eye className="w-3 h-3 text-amber-300" />
                    <span>Read</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove and delete "${up.name}" from your school library?`)) {
                        if (onDeletePdf) {
                          onDeletePdf(up.id);
                        } else {
                          try {
                            const list = JSON.parse(localStorage.getItem('dav_uploaded_pdfs') || '[]');
                            const updated = list.filter(p => p.id !== up.id);
                            localStorage.setItem('dav_uploaded_pdfs', JSON.stringify(updated));
                            window.location.reload();
                          } catch (err) {}
                        }
                      }
                    }}
                    title="Remove and delete this custom uploaded PDF"
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SEARCH BAR & SUBJECT FILTER CHIPS                                         */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={`Search ${typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`} books (Math, English, Science, Hindi...)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 shadow-xs"
          />
        </div>

        {/* Quick Subject Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'ALL', label: 'All Subjects' },
            { id: 'MATH', label: 'Math' },
            { id: 'ENGLISH', label: 'English' },
            { id: 'SCIENCE', label: 'Science' },
            { id: 'HINDI', label: 'Hindi' },
            { id: 'SST', label: 'Social Science' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-red-800 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBJECTS GRID: Interactive Animated 3D Book Graphics & Designs            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => {
          const IconComp = ICON_MAP[sub.icon] || BookOpen;
          const bookList = sub.books || [];
          const activeIndex = selectedBookTab[sub.id] || 0;
          const currentBook = bookList[activeIndex] || bookList[0];
          
          const subjectKey = getSubjectKey(sub.name);
          const art = SUBJECT_ART_MAP[subjectKey] || SUBJECT_ART_MAP.english;
          const cleanSubjectName = getCleanSubjectName(sub.name);

          const openThisBook = () => {
            onOpenPdfReader({
              title: currentBook?.title || sub.name,
              subject: cleanSubjectName,
              classNum: selectedClass,
              pdfUrl: currentBook?.pdfUrl,
              summary: `Official DAV Board textbook for ${currentBook?.title || sub.name}.`
            });
          };

          return (
            <div
              key={sub.id}
              className={`bg-white rounded-3xl border-2 ${art.neonBorder || 'border-amber-500/60'} ${art.neonGlow || 'hover:shadow-2xl'} overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group relative card-real-3d animate-anti-gravity`}
            >
              {/* Top Accent Stripe */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${sub.color}`} />

              <div>
                {/* ================================================================= */}
                {/* INTERACTIVE 3D BOOK COVER & GRAPHIC DESIGN EMBLEM                 */}
                {/* ================================================================= */}
                <div 
                  onClick={openThisBook}
                  className={`p-6 bg-gradient-to-br ${art.coverGrad} text-white relative overflow-hidden cursor-pointer select-none group/book`}
                  title={`Click to Open ${currentBook?.title || sub.name}`}
                >
                  {/* Decorative Subtle Geometric Watermarks */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 pointer-events-none group-hover/book:scale-150 transition-transform duration-500" />
                  <div className="absolute bottom-0 right-0 text-white/5 font-mono text-7xl font-black pointer-events-none select-none pr-3 pb-1">
                    {art.symbol}
                  </div>

                  {/* Top Bar inside Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/40 text-amber-300 border border-amber-400/30 flex items-center gap-1 shadow-inner">
                      <Sparkle className="w-2.5 h-2.5 fill-current" />
                      <span>{art.badge}</span>
                    </span>

                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/20">
                      {bookList.length} {bookList.length > 1 ? 'Books Bundle' : 'Book'}
                    </span>
                  </div>

                  {/* 3D Realistic Interactive Book Centerpiece */}
                  <div className="py-2 flex items-center justify-center relative z-10">
                    <div className="relative transform group-hover/book:scale-108 group-hover/book:-rotate-2 group-hover/book:shadow-2xl transition-all duration-300 ease-out">
                      {/* Outer 3D Book Shell */}
                      <div className="w-44 h-56 rounded-r-2xl rounded-l-md bg-stone-900 border-2 border-amber-300/60 shadow-2xl overflow-hidden relative flex flex-col justify-between p-3.5">
                        
                        {/* Book Spine Highlight on Left Edge */}
                        <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/80 via-white/20 to-transparent border-r border-amber-400/40 z-20" />
                        
                        {/* Subtle Gold Foil Corner Guards */}
                        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

                        {/* Top: DAV School Monogram Crest */}
                        <div className="flex items-center justify-between pl-3 relative z-10">
                          <span className="text-[9px] font-black tracking-widest uppercase text-amber-300/90 font-mono">
                            DAV Khabra
                          </span>
                          <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-[10px] text-amber-300 font-bold">
                            {art.symbol}
                          </span>
                        </div>

                        {/* Center: Subject Art Icon & Animated Pulse Aura */}
                        <div className="flex flex-col items-center justify-center text-center pl-2 my-auto relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shadow-lg text-white group-hover/book:scale-110 group-hover/book:rotate-6 transition-all duration-300">
                            <IconComp className="w-7 h-7 text-amber-300 drop-shadow-md" />
                          </div>
                          <div className="mt-2.5 font-black text-xs text-white uppercase tracking-wider line-clamp-1 max-w-[130px]">
                            {cleanSubjectName}
                          </div>
                          <span className="text-[9px] text-amber-200/80 font-bold font-mono">
                            Class {selectedClass}
                          </span>
                        </div>

                        {/* Bottom: Interactive Hover Indicator Pill */}
                        <div className="pl-3 relative z-10">
                          <div className="w-full py-1 rounded-lg bg-black/60 border border-amber-400/40 text-[9px] font-black uppercase text-amber-300 text-center tracking-wider shadow-inner group-hover/book:bg-amber-400 group-hover/book:text-stone-950 transition-colors">
                            Click to Read 📖
                          </div>
                        </div>

                        {/* Gilded Page Layers along right side */}
                        <div className="absolute right-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-amber-100 via-amber-200 to-amber-100 border-l border-amber-400/50 shadow-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Card Title & Tagline */}
                  <div className="mt-3 relative z-10">
                    <h3 className="font-black text-lg text-white leading-snug tracking-tight">
                      {sub.name}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5 font-medium line-clamp-1">
                      {sub.tagline || 'DAV Board Curriculum Textbook'}
                    </p>
                  </div>
                </div>

                {/* ================================================================= */}
                {/* SUB-BOOKS TAB SWITCHER (For subjects with multiple books)          */}
                {/* ================================================================= */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-200/80">
                  {bookList.length > 1 ? (
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span>Select Textbook Edition:</span>
                        <span className="text-red-800 font-bold font-mono">{activeIndex + 1}/{bookList.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {bookList.map((bk, idx) => (
                          <button
                            key={bk.id || idx}
                            type="button"
                            onClick={() => handleTabSelect(sub.id, idx)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                              activeIndex === idx
                                ? 'bg-red-800 text-white shadow-sm scale-102'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <BookMarked className="w-3.5 h-3.5" />
                            <span>{bk.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-red-800" />
                      <span className="truncate">{currentBook?.title || sub.name}</span>
                    </div>
                  )}
                </div>

                {/* ================================================================= */}
                {/* SELECTED BOOK DETAILS: STRICTLY SUBJECT NAME (NO MB SHOWN)        */}
                {/* ================================================================= */}
                <div className="p-5">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-red-50/30 border border-slate-200 shadow-xs">
                    <div className="text-xs font-black text-slate-900 truncate" title={currentBook?.title}>
                      {currentBook?.title}
                    </div>
                    {/* Strictly displays Type as the clean subject name, NO MB */}
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <div className="text-slate-600 font-medium">
                        Type: <strong className="text-red-900 font-black">{cleanSubjectName}</strong>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>DAV Verified</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =================================================================== */}
              {/* ACTION BUTTON: BIG, BOLD "OPEN PDF BOOK" ONLY (Brain icon removed)  */}
              {/* =================================================================== */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={openThisBook}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-800 via-red-900 to-amber-900 hover:from-red-700 hover:to-amber-800 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-red-950/20 hover:shadow-red-900/40 hover:scale-[1.01] active:scale-[0.99] transition-all transform cursor-pointer border border-amber-400/40 group/btn"
                  title={`Open and read ${currentBook?.title || sub.name}`}
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover/btn:scale-110 transition-transform" />
                  <span>Open PDF Book</span>
                  <ArrowRight className="w-4 h-4 text-amber-300 group-hover/btn:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}

export default BookLibrary;
