import React, { useState } from 'react';
import { DAV_SUBJECTS } from '../data/mockData';
import { 
  BookOpen, Calculator, Languages, HeartHandshake, Globe, Sparkles, 
  Compass, Cpu, FileText, Download, Eye, Upload, ChevronRight, Lock, 
  CheckCircle2, Search, ExternalLink, HelpCircle, Brain, BookMarked
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

export function BookLibrary({ 
  onOpenPdfReader, 
  onOpenUploadModal,
  onOpenAIWithQuestion
}) {
  const [selectedClass, setSelectedClass] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookTab, setSelectedBookTab] = useState({});

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
            Section 1: Books & Digital Library
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
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold shadow-sm transition"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Upload School PDF</span>
        </button>
      </div>

      {/* Class Selector Bar */}
      <div className="bg-slate-100/90 p-1.5 rounded-2xl flex flex-wrap gap-1.5 mb-8 border border-slate-200">
        {[8, 7, 6, 5, 4, 3, 2, 1, 'UKG', 'LKG'].map((cls) => {
          const isSelected = selectedClass === cls;
          const isClass8 = cls === 8;
          const label = (cls === 'LKG' || cls === 'UKG') ? cls : `Class ${cls}`;
          return (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`flex-1 min-w-[85px] py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center relative ${
                isSelected
                  ? 'bg-red-800 text-white shadow-md shadow-red-950/20 scale-[1.02]'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              {label}
              {isClass8 && (
                <span className="absolute -top-1.5 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase shadow">
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

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
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
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
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>Open PDF Book</span>
                </button>

                <button
                  onClick={() => onOpenAIWithQuestion(`Explain the key concepts and chapters in DAV Class 8 ${currentBook?.title || sub.name}`)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition"
                  title="Ask Shankar AI about this book"
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
