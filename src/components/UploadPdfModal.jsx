import React, { useEffect, useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, FolderPlus, AlertCircle, ShieldAlert } from 'lucide-react';

export function UploadPdfModal({ isOpen, onClose, onAddPdf, currentUser }) {
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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [classNum, setClassNum] = useState('8');
  const [subject, setSubject] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const isTeacherOrDev = Boolean(
    currentUser?.dimension === 5 ||
    currentUser?.dimension === 4 ||
    currentUser?.plan === 'teacher' ||
    currentUser?.plan === 'developer' ||
    currentUser?.isAdmin ||
    currentUser?.id === 'rishibhai'
  );

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

    const isDeveloper = currentUser?.dimension === 4 || currentUser?.id === 'rishibhai';
    const approvalStatus = isDeveloper ? 'approved' : 'pending_developer_approval';

    const processUpload = (base64OrBlobUrl) => {
      const newPdfRecord = {
        id: `custom_${Date.now()}`,
        name: fileName || file?.name?.replace('.pdf', '') || 'DAV School Material',
        classNum: String(classNum),
        subject: subject.trim() || 'General Curriculum',
        size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
        data: base64OrBlobUrl,
        uploadedBy: currentUser?.name || 'DAV Teacher',
        uploaderRole: currentUser?.role || (isDeveloper ? 'Developer (Dim 4)' : 'Faculty (Dim 5)'),
        status: approvalStatus,
        uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };

      onAddPdf(newPdfRecord);

      // Save metadata to teacher submissions queue (without massive binary payload to prevent 5MB localStorage quota crash)
      try {
        const existingSubmissions = JSON.parse(localStorage.getItem('dav_pending_teacher_pdfs') || '[]');
        const safeMetadata = { ...newPdfRecord, fileData: null, hasInMemoryData: true };
        existingSubmissions.unshift(safeMetadata);
        // Keep max 20 recent submissions in metadata queue
        localStorage.setItem('dav_pending_teacher_pdfs', JSON.stringify(existingSubmissions.slice(0, 20)));
        window.dispatchEvent(new CustomEvent('dav_developer_reviews_updated'));
      } catch (e) {
        console.warn('Could not cache submission metadata to localStorage:', e);
      }

      setIsSuccess(true);
      try {
        window.dispatchEvent(new CustomEvent('dav_trigger_flame_vfx', {
          detail: {
            title: isDeveloper ? 'Textbook Approved & Live in Library!' : 'Custom PDF Submitted for Developer Review',
            subtitle: `Class ${classNum} • ${subject.trim() || 'General'} • Dimension ${currentUser?.dimension || 5} Submission`
          }
        }));
      } catch (e) {}

      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        setFileName('');
        setSubject('');
        onClose();
      }, 1200);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-fadeIn select-none font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">Teacher Custom PDF Upload</h3>
              <p className="text-xs text-slate-300">Dimension 5 &amp; 4 Faculty Portal (Classes LKG–8)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Gate for Non-Teachers */}
        {!isTeacherOrDev ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-slate-900">
              Teacher &amp; Developer Access Only
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Uploading custom PDF textbooks is reserved exclusively for verified DAV teachers (Dimension 5) and developers (Dimension 4). Please log in with a faculty account to upload books.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-800 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form Body */
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
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-red-600/20"
                >
                  {['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                    <option key={c} value={c}>{c === 'LKG' || c === 'UKG' ? c : `Class ${c}`}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject (Write Your Own)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science, Maths, Sanskrit..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-red-600/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Book / Chapter Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Chapter 3: Force & Pressure or Complete Science Book"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
              />
            </div>

            {isSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PDF submitted successfully! Queued for Developer review &amp; library display.</span>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-700 hover:to-amber-600 text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                Submit Book
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default UploadPdfModal;
