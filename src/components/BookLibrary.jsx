import React, { useState } from 'react';
import { DAV_SUBJECTS } from '../data/mockData';
import { 
  BookOpen, Calculator, Languages, HeartHandshake, Globe, Sparkles, 
  Compass, Cpu, FileText, Download, Eye, Upload, ChevronRight, Lock, 
  CheckCircle2, Search, ExternalLink, HelpCircle, Brain, BookMarked, Trash2
} from 'lucide-react';
import { GoogleDriveIcon } from './GoogleDriveIcon';

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

export function BookLibrary({ 
  onOpenPdfReader, 
  onOpenUploadModal,
  onOpenAIWithQuestion,
  uploadedPdfs = [],
  onDeletePdf
}) {
  const [selectedClass, setSelectedClass] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookTab, setSelectedBookTab] = useState({});

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

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.tagline && s.tagline.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTabSelect = (subjectId, bookIndex) => {
    setSelectedBookTab(prev => ({
      ...prev,
      [subjectId]: bookIndex
    }));
  };

  return (
    <div id="library-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header and Class Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-800 uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Section 2: Official DAV Textbooks &amp; Digital Library
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            DAV Official Textbooks ({subjects.length} Subjects)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Complete digital repository for LKG, UKG, and Classes 1 to 8 with real verified PDF textbooks.
          </p>
        </div>

        {/* Upload Custom Book PDF Button */}
        <button
          onClick={onOpenUploadModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold shadow-sm transition cursor-pointer"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload School PDF</span>
        </button>
      </div>

      {/* Class Selector Bar (No Active badge on any class) */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl flex flex-wrap gap-1.5 mb-8 border border-slate-200">
        {[8, 7, 6, 5, 4, 3, 2, 1, 'UKG', 'LKG'].map((cls) => {
          const isSelected = selectedClass === cls;
          const label = (cls === 'LKG' || cls === 'UKG') ? cls : `Class ${cls}`;
          return (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`flex-1 min-w-[85px] py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center relative cursor-pointer ${
                isSelected
                  ? 'bg-red-800 text-white shadow-md shadow-red-950/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Uploaded Custom School PDFs for this class */}
      {classUploadedPdfs.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Uploaded School Textbooks &amp; Materials ({classUploadedPdfs.length})
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800">
              Custom Uploads
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {classUploadedPdfs.map((up) => (
              <div key={up.id} className="p-3.5 rounded-xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-800 flex items-center justify-center shrink-0 font-bold text-xs">
                    PDF
                  </div>
                  <div className="truncate">
                    <div className="text-xs font-bold text-slate-800 truncate" title={up.name}>{up.name}</div>
                    <div className="text-[10px] text-slate-500">{up.subject || 'School Material'} • {up.size || 'PDF'}</div>
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
                    className="px-3 py-1.5 rounded-lg bg-red-800 hover:bg-red-900 text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Eye className="w-3 h-3 text-amber-300" />
                    <span>Read Book</span>
                  </button>

                  <button
                    onClick={() => onOpenPdfReader({
                      title: up.name,
                      subject: up.subject || 'School Subject',
                      classNum: selectedClass,
                      pdfUrl: up.data,
                      fileData: up.data,
                      summary: `Custom uploaded textbook material for Class ${selectedClass}.`,
                      initialMode: 'gdrive'
                    })}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition cursor-pointer"
                    title="Open in Google Drive Live Cloud Editor"
                  >
                    <GoogleDriveIcon className="w-3.5 h-3.5" />
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
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={`Search ${typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`} subjects (English, Hindi, Math, Science...)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Showing <span className="text-red-800 font-bold">{filteredSubjects.length}</span> Subjects for {typeof selectedClass === 'string' ? selectedClass : `Class ${selectedClass}`}
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => {
          const IconComp = ICON_MAP[sub.icon] || BookOpen;
          const bookList = sub.books || [];
          const activeIndex = selectedBookTab[sub.id] || 0;
          const currentBook = bookList[activeIndex] || bookList[0];

          return (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm card-interactive shimmer-overlay flex flex-col justify-between group"
            >
              {/* Card Header Gradient */}
              <div>
                <div className={`p-5 bg-gradient-to-r ${sub.color} text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
                      <IconComp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-black/25 text-white">
                      {bookList.length} {bookList.length > 1 ? 'Books Bundle' : 'Book'}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-lg text-white leading-snug">
                    {sub.name}
                  </h3>
                  <div className="text-xs text-white/90 mt-1 font-medium">{sub.tagline || 'DAV Board Curriculum'}</div>
                </div>

                {/* Sub-books Tab Switcher (For English: 3 books, Hindi: 2 books) */}
                <div className="p-4 bg-slate-50/70 border-b border-slate-100">
                  {bookList.length > 1 ? (
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Select Book to Read:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {bookList.map((bk, idx) => (
                          <button
                            key={bk.id || idx}
                            onClick={() => handleTabSelect(sub.id, idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                              activeIndex === idx
                                ? 'bg-red-800 text-white shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <BookMarked className="w-3 h-3" />
                            <span>{bk.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-semibold text-slate-600 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{currentBook?.title || sub.name}</span>
                    </div>
                  )}
                </div>

                {/* Selected Book Details */}
                <div className="p-5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="text-xs font-bold text-slate-800">
                      {currentBook?.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>Type: {currentBook?.type || 'Official Textbook'}</span>
                      {currentBook?.size && (
                        <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {currentBook.size}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex items-center gap-2">
                <button
                  onClick={() => onOpenPdfReader({
                    title: currentBook?.title || sub.name,
                    subject: sub.name,
                    classNum: selectedClass,
                    pdfUrl: currentBook?.pdfUrl,
                    summary: `Official DAV Board textbook for ${currentBook?.title || sub.name}.`
                  })}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>Open PDF Book</span>
                </button>

                <button
                  onClick={() => onOpenPdfReader({
                    title: currentBook?.title || sub.name,
                    subject: sub.name,
                    classNum: selectedClass,
                    pdfUrl: currentBook?.pdfUrl,
                    summary: `Official DAV Board textbook for ${currentBook?.title || sub.name}.`,
                    initialMode: 'gdrive'
                  })}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 transition cursor-pointer"
                  title="Open in Google Drive Live Cloud PDF Editor & Annotator"
                >
                  <GoogleDriveIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenAIWithQuestion(`Explain the key concepts and chapters in DAV Class 8 ${currentBook?.title || sub.name}`)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition cursor-pointer"
                  title="Ask Rishi AI about this book"
                >
                  <Brain className="w-4 h-4 text-amber-700" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
