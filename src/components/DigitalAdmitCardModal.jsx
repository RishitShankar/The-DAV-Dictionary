import React from 'react';
import { ShieldCheck, Printer, X, QrCode, School, CheckCircle2, Download } from 'lucide-react';

export function DigitalAdmitCardModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const candidateName = user?.name || 'Rishit Shankar';
  const candidateClass = user?.classNum ? `Class ${user.classNum}-${user.section || 'D'}` : 'Class 8-D';
  const rollNo = user?.studentId || 'DAV-2026-8D-042';

  const examSchedule = [
    { date: '18 Feb 2027', subject: 'Mathematics', code: '041', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
    { date: '21 Feb 2027', subject: 'Science (Physics, Chem, Bio)', code: '086', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
    { date: '24 Feb 2027', subject: 'Social Science (Hist, Civ, Geo)', code: '087', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
    { date: '27 Feb 2027', subject: 'English Language & Literature', code: '184', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
    { date: '02 Mar 2027', subject: 'Hindi (Gyan & Abhyas Sagar)', code: '002', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
    { date: '05 Mar 2027', subject: 'Sanskrit (Surbhi & Vyakaran)', code: '122', time: '09:00 AM – 12:00 PM', room: 'Hall 3 (Block A)' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[92vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
      >
        {/* Modal Top Actions */}
        <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
              Concept #188
            </span>
            <span className="text-xs text-stone-400 font-bold">DAV Examination Hall Ticket</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Hall Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Admit Card Canvas */}
        <div className="p-6 overflow-y-auto space-y-6 bg-white text-stone-950 rounded-b-2xl">
          
          {/* Card Official Border & Header */}
          <div className="border-2 border-stone-900 p-5 rounded-2xl relative space-y-4">
            
            {/* Header Badge */}
            <div className="text-center border-b-2 border-stone-900 pb-4 space-y-1">
              <div className="flex items-center justify-center gap-2 text-red-900 font-black text-sm uppercase tracking-widest">
                <School className="w-5 h-5" />
                <span>DAV COLLEGE MANAGING COMMITTEE, CHITRA GUPTA ROAD, NEW DELHI</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight uppercase">
                DAV PUBLIC SCHOOL, KHABRA, MUZAFFARPUR
              </h1>
              <p className="text-xs text-stone-600 font-bold">
                Affiliated to CBSE, New Delhi • Regional Centre Muzaffarpur, Bihar
              </p>
              <div className="inline-block mt-2 px-4 py-1 bg-stone-900 text-amber-300 rounded font-mono font-black text-xs uppercase tracking-wider">
                OFFICIAL ADMIT CARD • ANNUAL BOARD EXAMINATION (2026–27)
              </div>
            </div>

            {/* Candidate Metadata & Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start pt-2">
              
              {/* Photo & Stamp Box */}
              <div className="sm:col-span-1 flex flex-col items-center gap-2">
                <div className="w-28 h-32 border-2 border-dashed border-stone-800 bg-stone-100 rounded-xl flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-amber-400/30 flex items-center justify-center text-stone-800 font-black text-xl mb-1">
                    {candidateName.charAt(0)}
                  </div>
                  <span className="text-[9px] font-bold text-stone-600 uppercase">Verified Candidate</span>
                  <div className="absolute bottom-1 right-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
                <div className="w-28 border border-stone-400 py-1 text-center text-[10px] font-mono text-stone-500">
                  Candidate Sign
                </div>
              </div>

              {/* Candidate Info Table */}
              <div className="sm:col-span-2 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-1 border-b pb-1">
                  <span className="font-bold text-stone-600">Candidate Name:</span>
                  <span className="font-black text-stone-900">{candidateName}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b pb-1">
                  <span className="font-bold text-stone-600">Roll Number:</span>
                  <span className="font-mono font-black text-stone-900">{rollNo}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b pb-1">
                  <span className="font-bold text-stone-600">Class &amp; Section:</span>
                  <span className="font-bold text-stone-900">{candidateClass}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 border-b pb-1">
                  <span className="font-bold text-stone-600">Examination Centre:</span>
                  <span className="font-bold text-stone-900">Main Campus, Khabra</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="font-bold text-stone-600">Verification Status:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Eligible (Attendance &gt; 85%)</span>
                  </span>
                </div>
              </div>

              {/* QR Code Verification */}
              <div className="sm:col-span-1 flex flex-col items-center justify-center border-2 border-stone-900 p-2 rounded-xl bg-stone-50">
                <div className="w-20 h-20 bg-stone-900 text-white flex items-center justify-center rounded-lg mb-1">
                  <QrCode className="w-14 h-14" />
                </div>
                <span className="text-[8px] font-mono font-black text-stone-600 text-center uppercase">
                  Scan to Verify Validity on Portal
                </span>
              </div>

            </div>

            {/* Date Sheet Table */}
            <div className="pt-2">
              <h3 className="text-xs font-black uppercase text-stone-800 mb-2">
                Examination Date Sheet &amp; Seating Allotment
              </h3>
              <div className="overflow-x-auto rounded-lg border border-stone-800">
                <table className="w-full text-left text-xs font-sans">
                  <thead className="bg-stone-900 text-white text-[10px] uppercase font-mono">
                    <tr>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Subject</th>
                      <th className="py-2 px-2">Code</th>
                      <th className="py-2 px-3">Timings</th>
                      <th className="py-2 px-3">Room Allotment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-300 text-stone-900 font-medium text-[11px]">
                    {examSchedule.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                        <td className="py-2 px-3 font-mono font-bold">{row.date}</td>
                        <td className="py-2 px-3 font-bold">{row.subject}</td>
                        <td className="py-2 px-2 font-mono text-stone-600">{row.code}</td>
                        <td className="py-2 px-3">{row.time}</td>
                        <td className="py-2 px-3 font-mono text-stone-700">{row.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Candidate Rules & Signatures */}
            <div className="pt-3 border-t border-stone-400 flex flex-col sm:flex-row justify-between items-end gap-4 text-[10px] text-stone-600">
              <div className="space-y-0.5 max-w-sm">
                <p className="font-bold text-stone-900 uppercase">Important Candidate Instructions:</p>
                <p>1. Must carry this original Admit Card to the examination hall daily.</p>
                <p>2. Electronic gadgets, mobile phones, and smart watches are strictly prohibited.</p>
                <p>3. Candidates must occupy their seats 15 minutes before the exam commences.</p>
              </div>

              <div className="flex items-center gap-8 text-center pt-2">
                <div>
                  <div className="font-serif italic font-bold text-stone-800 text-sm">Rishit Shankar</div>
                  <div className="w-24 border-t border-stone-800 mt-1" />
                  <span className="text-[9px] font-bold text-stone-700">Head Boy (Founder)</span>
                </div>

                <div>
                  <div className="font-serif italic font-bold text-stone-800 text-sm">DAV Controller</div>
                  <div className="w-24 border-t border-stone-800 mt-1" />
                  <span className="text-[9px] font-bold text-stone-700">Controller of Exams</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
