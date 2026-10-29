import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, FolderPlus, AlertCircle } from 'lucide-react';

export function UploadPdfModal({ isOpen, onClose, onAddPdf }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [classNum, setClassNum] = useState('8');
  const [subject, setSubject] = useState('English Literature');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setFileName(selected.name.replace('.pdf', ''));
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!file && !fileName) return;

    const processUpload = (base64OrBlobUrl) => {
      const newPdfRecord = {
        id: `custom_${Date.now()}`,
        name: fileName || file?.name?.replace('.pdf', '') || 'Class Book Material',
        classNum: String(classNum),
        subject: subject,
        size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
        data: base64OrBlobUrl,
        uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      onAddPdf(newPdfRecord);
      setIsSuccess(true);
      try {
        window.dispatchEvent(new CustomEvent('dav_trigger_flame_vfx', {
          detail: {
            title: 'Custom Textbook Saved to Digital Library!',
            subtitle: `Class ${classNum} ${subject} • Master Digital Archive Updated`
          }
        }));
      } catch (e) {}
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        setFileName('');
        onClose();
      }, 1000);
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        processUpload(reader.result);
      };
      reader.onerror = () => {
        processUpload(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
    } else {
      processUpload(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Upload DAV School Book / PDF</h3>
              <p className="text-xs text-slate-300">Add textbooks or notes to the Class 1–8 Library</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
          
          {/* File Picker Drag & Drop Zone */}
          <div className="border-2 border-dashed border-slate-300 hover:border-red-600 rounded-2xl p-6 text-center bg-slate-50 transition cursor-pointer relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <UploadCloud className="w-10 h-10 text-red-700 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-700">
              {file ? file.name : 'Click or drag & drop a PDF textbook or chapter file'}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Supports .pdf documents up to 50 MB
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Target Class</label>
              <select
                value={classNum}
                onChange={(e) => setClassNum(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
              >
                <option value="English Literature">English Reader</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science (Living World)</option>
                <option value="Social Science">Social Science</option>
                <option value="Hindi">Hindi (Bhasha Madhuri)</option>
                <option value="Sanskrit">Sanskrit (Surbhi)</option>
                <option value="Naitik Shiksha">Naitik Shiksha (Dharma)</option>
                <option value="Computer">ICT / Computer Science</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Book / Chapter Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Chapter 3: Force & Pressure or Full English Reader"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
            />
          </div>

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Book uploaded successfully into Class {classNum} folder!</span>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white text-xs font-bold shadow-md transition"
            >
              Save to Library
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
