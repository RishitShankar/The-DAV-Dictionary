import React, { useState } from 'react';
import { 
  X, Printer, Download, Share2, CheckCircle2, ShieldCheck, 
  Award, School, Calendar, IndianRupee, Heart, Copy, Check
} from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';
import { WhatsAppLogo } from './SocialLogos';

export function DavInvoiceModal({ 
  isOpen, 
  onClose, 
  invoiceData 
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !invoiceData) return null;

  const {
    invoiceNumber = `DAV-BILL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    studentName = 'DAV Student',
    studentId = 'dav_student',
    classNum = '8',
    planName = 'VVIP Pass',
    baseAmount = 0,
    donationAmount = 0,
    totalAmount = 0,
    paymentMode = 'UPI (9470033984@upi)',
    transactionId = `TXN-${Date.now().toString().slice(-8)}`,
    note = 'Thank you for supporting the continuous development of DAV Dictionary!'
  } = invoiceData;

  const calculatedTotal = totalAmount || (Number(baseAmount) + Number(donationAmount));

  const handlePrint = () => {
    window.print();
  };

  const handleCopySlip = () => {
    const text = `🧾 *OFFICIAL DAV DICTIONARY INVOICE / RECEIPT*
━━━━━━━━━━━━━━━━━━━━━━━━━━
📄 *Bill No:* ${invoiceNumber}
📅 *Date & Time:* ${date} at ${time}
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Student:* ${studentName} (${studentId})
🏫 *Class:* ${classNum} • DAV Public School
💎 *Academic Tier:* ${planName}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *Plan Access Fee:* ₹${baseAmount}
❤️ *Developer Donation:* ₹${donationAmount}
🔥 *TOTAL AMOUNT PAID:* ₹${calculatedTotal}
━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 *Payment Mode:* ${paymentMode}
🆔 *Transaction Ref:* ${transactionId}
✅ *Status:* Verified & Authorized
━━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 *Authorized Signatory:* Rishit Shankar
(Head Boy & Lead Developer, DAV Dictionary)
📞 WhatsApp: +91 94700 33984 | Call: +91 80922 61750
🌐 Portal: DAV Dictionary (Digital India 🇮🇳)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(`🧾 *OFFICIAL RECEIPT - DAV DICTIONARY*
Bill No: ${invoiceNumber}
Student: ${studentName} (${studentId})
Total Paid: ₹${calculatedTotal}
Payment Mode: ${paymentMode}
Verified by Developer Rishit Shankar. Thank you for your support!`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[95vh]">
        
        {/* Top Controls Bar (Hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm text-white">Official Tax Invoice &amp; Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Print Bill or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Bill</span>
            </button>
            <button
              onClick={handleCopySlip}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Copy receipt summary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{copied ? 'Copied!' : 'Copy Slip'}</span>
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Share via WhatsApp"
            >
              <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="dav-printable-receipt" className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800 bg-white">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-red-900 pb-5">
            <div className="flex items-center gap-3.5">
              <img 
                src="/logo.png" 
                alt="DAV Logo" 
                className="w-16 h-16 object-contain drop-shadow-md"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                  DAV DICTIONARY
                </h2>
                <p className="text-xs font-bold text-red-800 uppercase tracking-wider">
                  Academic Digital Reference Campus • Official Invoice
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  DAV Public School Student Initiative • Digital India 🇮🇳
                </p>
              </div>
            </div>

            <div className="sm:text-right bg-red-50 p-3 rounded-2xl border border-red-100">
              <div className="text-[10px] uppercase font-bold text-slate-500">Invoice / Bill No.</div>
              <div className="text-sm font-extrabold text-red-950 font-mono">{invoiceNumber}</div>
              <div className="text-[11px] text-slate-600 mt-1">
                📅 {date} • {time}
              </div>
            </div>
          </div>

          {/* Student & Payment Mode Info Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Billed To (Student)</span>
              <div className="font-extrabold text-slate-900 text-sm">{studentName}</div>
              <div className="text-slate-600 mt-0.5">Account ID: <span className="font-mono font-bold text-red-800">{studentId}</span></div>
              <div className="text-slate-600">Class: Class {classNum} • DAV Public School</div>
            </div>
            <div className="sm:text-right">
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Payment &amp; Authorization</span>
              <div className="font-bold text-slate-900">Mode: <span className="text-emerald-700">{paymentMode}</span></div>
              <div className="text-slate-600 mt-0.5">Ref: <span className="font-mono">{transactionId}</span></div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized &amp; Verified</span>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-white uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Item Description</th>
                  <th className="py-2.5 px-4 font-bold text-center">Category</th>
                  <th className="py-2.5 px-4 font-bold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    <div>{planName} - Digital Library &amp; Rishi AI Access</div>
                    <div className="text-[10px] text-slate-400">Class 1-8 verified curriculum textbooks &amp; 24/7 AI guide</div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-500 font-medium">Subscription</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 font-mono">₹{baseAmount}</td>
                </tr>
                {Number(donationAmount) > 0 && (
                  <tr className="bg-amber-50/50">
                    <td className="py-3 px-4 font-semibold text-amber-950">
                      <div>Voluntary Developer Donation / Support Contribution</div>
                      <div className="text-[10px] text-amber-700">Contributed to Rishit Shankar for cloud servers &amp; AI maintenance</div>
                    </td>
                    <td className="py-3 px-4 text-center text-amber-800 font-medium">Donation</td>
                    <td className="py-3 px-4 text-right font-bold text-amber-900 font-mono">+₹{donationAmount}</td>
                  </tr>
                )}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-300">
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-right font-black text-slate-900 uppercase text-xs">
                    Grand Total Paid:
                  </td>
                  <td className="py-3 px-4 text-right font-black text-red-900 font-mono text-base">
                    ₹{calculatedTotal}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Developer Seal, Paytm QR Code & Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200">
            <div className="text-xs text-slate-600 max-w-sm space-y-2">
              <p className="font-semibold italic text-slate-700">"{note}"</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Computer-generated official receipt saved in Supabase cloud vault.</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Paytm Real QR Code Container */}
              <div className="bg-slate-50 p-2 rounded-xl border border-slate-300 flex flex-col items-center shadow-xs">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`upi://pay?pa=9470033984@upi&pn=Rishit%20Shankar&am=${calculatedTotal}&cu=INR&tn=${invoiceNumber}`)}`}
                  alt="Paytm Official Payment QR"
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="text-[9px] font-black text-slate-800 mt-1 flex items-center gap-1">
                  <span className="text-[#002e6e] font-black">Pay</span><span className="text-[#00baf2] font-black">tm</span>
                  <span className="text-[8px] text-slate-500 font-mono">9470033984@upi</span>
                </div>
              </div>

              {/* Circular Digital Stamp */}
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-red-800 p-2 flex flex-col items-center justify-center text-center text-[9px] font-black text-red-900 leading-tight uppercase bg-red-50/60 rotate-[-4deg] shadow-xs select-none">
                <Award className="w-4 h-4 text-red-700 mb-0.5" />
                <span>OFFICIAL SEAL</span>
                <span className="text-[8px] font-extrabold text-slate-700">RISHIT SHANKAR</span>
                <span className="text-[7px] text-red-600 font-bold">DAV HEAD BOY</span>
              </div>
            </div>
          </div>

          {/* Footer Contact for Receipt */}
          <div className="text-center text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4">
            <span>Official Developer: <strong>Rishit Shankar</strong></span>
            <span>•</span>
            <span>WhatsApp: <strong>+91 94700 33984</strong></span>
            <span>•</span>
            <span>Email: <strong>rishitshankar@gmail.com</strong></span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default DavInvoiceModal;
