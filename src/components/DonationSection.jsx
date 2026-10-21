import React, { useState, useEffect } from 'react';
import { 
  Heart, IndianRupee, QrCode, CreditCard, Banknote, ShieldCheck, 
  Sparkles, CheckCircle2, Copy, Check, ExternalLink, ArrowRight, 
  User, Award, School, Receipt, Printer, Share2, AlertCircle, RefreshCw
} from 'lucide-react';
import { WhatsAppLogo } from './SocialLogos';
import { DavInvoiceModal } from './DavInvoiceModal';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { getSupabaseClient, saveCloudDonation, fetchCloudDonations } from '../services/supabaseClient';

export function DonationSection({ currentUser }) {
  const [selectedUser, setSelectedUser] = useState(currentUser?.id || 'rishibhai');
  const [donorName, setDonorName] = useState(currentUser?.name || 'Rishit Shankar');
  const [donorPhone, setDonorPhone] = useState(currentUser?.personalWhatsApp || currentUser?.phoneNumber || '9470033984');
  const [donationAmount, setDonationAmount] = useState('5');
  const [paymentMode, setPaymentMode] = useState('upi'); // 'upi' | 'paytm' | 'cash' | 'card'
  const [paytmUrl, setPaytmUrl] = useState('https://paytm.me/');
  const [transactionNote, setTransactionNote] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const isAdmin = Boolean(currentUser?.isAdmin || currentUser?.id === 'rishibhai' || currentUser?.dimension === 4);

  const [donorsList, setDonorsList] = useState(() => {
    try {
      const stored = localStorage.getItem('dav_donors_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      { id: 'd_1', name: 'Saharsh Shankar', role: 'VVIP Pass & Top Contributor', amount: '₹20', badge: 'Diamond Donor', invoiceNumber: 'DAV-INV-001' },
      { id: 'd_2', name: 'Rishit Shankar', role: 'Founder & Lead Developer', amount: 'Unlimited', badge: 'Creator', invoiceNumber: 'DAV-INV-000' },
      { id: 'd_3', name: 'Class 8-D Classmates', role: 'Science & Sanskrit Batch', amount: '₹100', badge: 'Academic Star', invoiceNumber: 'DAV-INV-002' },
      { id: 'd_4', name: 'DAV Alumni & Friends', role: 'Cloud & AI Infrastructure', amount: '₹500', badge: 'Patron', invoiceNumber: 'DAV-INV-003' }
    ];
  });

  const handleDeleteDonor = (donorId, invoiceNumber, name) => {
    if (!window.confirm(`Admin Superpower: Remove donor record for "${name}" and void their invoice?`)) {
      return;
    }
    const updated = donorsList.filter(d => d.id !== donorId);
    setDonorsList(updated);
    try {
      localStorage.setItem('dav_donors_list', JSON.stringify(updated));
      const rawInvoices = localStorage.getItem('dav_invoices');
      if (rawInvoices) {
        const invoices = JSON.parse(rawInvoices);
        const filtered = invoices.filter(inv => inv.invoiceNumber !== invoiceNumber && inv.studentName !== name);
        localStorage.setItem('dav_invoices', JSON.stringify(filtered));
      }
    } catch (e) {}
  };

  // Load existing registered users
  useEffect(() => {
    const list = getRegisteredUsers();
    setRegisteredUsers(list);
    if (currentUser?.id) {
      setSelectedUser(currentUser.id);
      if (currentUser?.name) setDonorName(currentUser.name);
      if (currentUser?.personalWhatsApp || currentUser?.phoneNumber) {
        setDonorPhone(currentUser.personalWhatsApp || currentUser.phoneNumber);
      }
    }
  }, [currentUser]);

  const activeUserData = registeredUsers.find(u => u.id.toLowerCase() === selectedUser.toLowerCase()) || {
    id: selectedUser,
    name: selectedUser === 'rishibhai' ? 'Rishit Shankar' : (currentUser?.name || selectedUser),
    paidAmount: '0',
    plan: 'Normal Plan',
    classNum: '8'
  };

  useEffect(() => {
    if (activeUserData) {
      if (activeUserData.name && activeUserData.name !== 'Rishit Shankar') {
        setDonorName(activeUserData.name);
      }
      if (activeUserData.personalWhatsApp || activeUserData.phoneNumber) {
        setDonorPhone(activeUserData.personalWhatsApp || activeUserData.phoneNumber);
      }
    }
  }, [selectedUser]);

  // Parse existing paid amount (e.g., "15" or "₹15")
  const currentPaidNum = parseInt(String(activeUserData.paidAmount || '0').replace(/[^0-9]/g, ''), 10) || 0;
  const newDonationNum = parseInt(donationAmount, 10) || 0;
  const grandTotalAfterDonation = currentPaidNum + newDonationNum;

  const upiId = '9470033984@upi';
  const upiPayLink = `upi://pay?pa=${upiId}&pn=Rishit%20Shankar&am=${newDonationNum}&cu=INR&tn=DAV%20Dictionary%20Support`;
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(upiPayLink)}`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleConfirmDonation = async (e) => {
    e?.preventDefault();
    if (newDonationNum <= 0) return;

    setIsProcessing(true);

    try {
      // 1. Update user's lifetime paid amount in localStorage
      const updatedList = registeredUsers.map(u => {
        if (u.id.toLowerCase() === selectedUser.toLowerCase()) {
          return {
            ...u,
            paidAmount: String(grandTotalAfterDonation)
          };
        }
        return u;
      });

      // If user wasn't in list, add them
      if (!registeredUsers.some(u => u.id.toLowerCase() === selectedUser.toLowerCase())) {
        updatedList.push({
          id: selectedUser,
          name: currentUser?.name || selectedUser,
          paidAmount: String(grandTotalAfterDonation),
          plan: 'Donor Supporter',
          classNum: '8',
          createdAt: new Date().toLocaleDateString()
        });
      }

      saveRegisteredUsers(updatedList);
      setRegisteredUsers(updatedList);

      // 2. Generate official invoice record
      const invoiceNum = `DAV-DON-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInvoice = {
        invoiceNumber: invoiceNum,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        studentName: donorName || activeUserData.name || selectedUser,
        studentId: selectedUser,
        classNum: activeUserData.classNum || '8',
        phone: donorPhone || activeUserData.personalWhatsApp || '',
        planName: activeUserData.dimensionName || activeUserData.plan || 'DAV Digital Portal Supporter',
        baseAmount: currentPaidNum,
        donationAmount: newDonationNum,
        totalAmount: grandTotalAfterDonation,
        paymentMode: paymentMode === 'upi' ? `Instant UPI (${upiId})` 
          : paymentMode === 'paytm' ? 'Paytm Wallet / QR'
          : paymentMode === 'cash' ? 'In-Hand Cash (School Handover)'
          : 'Credit / Debit Card Online',
        transactionId: `TXN-${Date.now().toString().slice(-8)}`,
        note: transactionNote || 'Special voluntary donation contributed to Rishit Shankar for DAV Dictionary server and development costs.'
      };

      // 3. Save invoice in localStorage ('dav_invoices' and 'dav_cloud_donations') and Supabase Cloud
      try {
        const existingInvoices = JSON.parse(localStorage.getItem('dav_invoices') || '[]');
        existingInvoices.unshift(newInvoice);
        localStorage.setItem('dav_invoices', JSON.stringify(existingInvoices));

        const existingDonations = JSON.parse(localStorage.getItem('dav_cloud_donations') || '[]');
        existingDonations.unshift(newInvoice);
        localStorage.setItem('dav_cloud_donations', JSON.stringify(existingDonations));
      } catch (err) {}

      // Cloud storage sync to Supabase
      try {
        await saveCloudDonation(newInvoice);
      } catch (cloudErr) {
        console.warn('Supabase donation record sync notice:', cloudErr);
      }

      setIsProcessing(false);
      setActiveInvoice(newInvoice);
    } catch (err) {
      console.error('Donation confirmation error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/70 via-rose-50/30 to-slate-100/90 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 text-white p-6 sm:p-10 shadow-2xl border border-amber-500/30">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
              <span>Section 8 • Official Developer Donation &amp; Support Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Support &amp; Donate to Developer (Rishit Shankar)
            </h1>
            <p className="text-sm sm:text-base text-stone-300 mt-2 leading-relaxed">
              Every voluntary contribution fuels continuous cloud servers, Shankar AI Gemini API speed, verified DAV textbook scans, and new digital features for all DAV Public School students.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-amber-200">
              <span className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Official Printable Bill &amp; Receipt Generated Instantly
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                Donations Add Directly to Existing Account Balance
              </span>
            </div>
          </div>

          <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none hidden md:block">
            <Heart className="w-64 h-64 text-amber-400" />
          </div>
        </div>

        {/* Main 2-Column Donation Portal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Account Selection & Amount Slider (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            
            {/* 1. Student Account Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-red-800" />
                  <span>Select Student Account To Credit</span>
                </label>
                <span className="text-[11px] text-slate-500">Auto-detected or custom ID</span>
              </div>

              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 font-bold text-sm focus:outline-none focus:border-red-700 cursor-pointer"
              >
                {registeredUsers.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.id} ({u.id}) • Current Paid: ₹{u.paidAmount || '0'}
                  </option>
                ))}
              </select>
            </div>

            {/* Donor Profile Details: Pre-filled or Manual Entry */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] uppercase font-black text-red-800 tracking-wider block">
                Donor Profile Information (Pre-filled / Editable)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Donor Full Name</label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter donor name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold focus:outline-none focus:border-red-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="e.g. 9470033984"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 font-mono font-semibold focus:outline-none focus:border-red-700"
                  />
                </div>
              </div>
            </div>

            {/* Current Contribution vs New Donation Visual Breakdown */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Existing Payment</span>
                <span className="text-xl font-extrabold text-slate-800 font-mono">₹{currentPaidNum}</span>
                <span className="text-[10px] text-slate-500 block">{activeUserData.plan || 'Current Plan'}</span>
              </div>

              <div className="text-2xl font-black text-amber-600">+</div>

              <div className="text-center sm:text-left">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">New Donation</span>
                <span className="text-xl font-extrabold text-amber-800 font-mono">₹{newDonationNum}</span>
                <span className="text-[10px] text-amber-600 block">Voluntary Add-on</span>
              </div>

              <div className="text-2xl font-black text-emerald-600">=</div>

              <div className="text-center sm:text-right bg-white px-4 py-2 rounded-xl border border-amber-300 shadow-xs">
                <span className="text-[10px] uppercase font-black text-emerald-700 block">Updated Total</span>
                <span className="text-2xl font-black text-emerald-800 font-mono">₹{grandTotalAfterDonation}</span>
                <span className="text-[10px] text-emerald-600 font-bold block">Lifetime Contributed</span>
              </div>
            </div>

            {/* 2. Donation Amount Quick Chips */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Quick Donation Amount
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[
                  { label: '₹5', val: '5', desc: 'Chai Support' },
                  { label: '₹15', val: '15', desc: 'Mini Pack' },
                  { label: '₹50', val: '50', desc: 'Friend Pass' },
                  { label: '₹100', val: '100', desc: 'Book Patron' },
                  { label: '₹500', val: '500', desc: 'AI Sponsor' },
                  { label: '₹1000', val: '1000', desc: 'Super Donor' }
                ].map(item => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setDonationAmount(item.val)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      donationAmount === item.val
                        ? 'bg-red-800 text-white border-red-900 shadow-md scale-105'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-sm font-extrabold font-mono">{item.label}</div>
                    <div className="text-[9px] opacity-80 truncate">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Slider Chart for Custom Price (₹0 to ₹5,000 / Up to ₹1 Lakh) */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Custom Sliding Donation Chart
                </span>
                <span className="text-sm font-mono font-black text-amber-400">
                  ₹{donationAmount}
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="5000"
                step="5"
                value={Number(donationAmount) <= 5000 ? Number(donationAmount) : 5000}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Custom Amount (₹):</span>
                <input
                  type="number"
                  min="1"
                  max="100000"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-32 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono font-bold text-xs focus:outline-none focus:border-amber-400"
                  placeholder="e.g. 500"
                />
                <span className="text-[10px] text-slate-400 italic">Enter any custom amount up to ₹1,00,000</span>
              </div>
            </div>

            {/* 4. Payment Mode Tabs */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode, desc: 'Instant Apps' },
                  { id: 'paytm', label: 'Paytm', icon: IndianRupee, desc: 'Paytm URL' },
                  { id: 'cash', label: 'In-Hand Cash', icon: Banknote, desc: 'School Direct' },
                  { id: 'card', label: 'Card / Net', icon: CreditCard, desc: 'Debit / Credit' }
                ].map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMode(mode.id)}
                      className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                        paymentMode === mode.id
                          ? 'bg-slate-900 text-white border-slate-950 shadow-md'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${paymentMode === mode.id ? 'text-amber-400' : 'text-slate-500'}`} />
                      <div className="text-xs font-bold">{mode.label}</div>
                      <div className="text-[10px] opacity-70">{mode.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Personal Note */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Message / Note for Developer Rishit (Optional)
              </label>
              <input
                type="text"
                value={transactionNote}
                onChange={(e) => setTransactionNote(e.target.value)}
                placeholder="e.g. Keep up the great work for Class 8 Science & Sanskrit!"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-700"
              />
            </div>

          </div>

          {/* Right Column: Payment Details & Instant Receipt Generator (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
            
            {/* If UPI Mode Selected */}
            {paymentMode === 'upi' && (
              <div className="space-y-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Scan with Any UPI App (GPay / PhonePe / Paytm / BHIM)</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
                  <img
                    src={upiQrUrl}
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 mx-auto rounded-xl shadow-xs"
                  />
                  <div className="text-xs font-extrabold text-slate-900 mt-2 font-mono">
                    ₹{newDonationNum}
                  </div>
                </div>

                {/* UPI ID Copy Bar */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs">
                  <span className="font-mono font-bold text-slate-800">{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                  </button>
                </div>

                <a
                  href={upiPayLink}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer block"
                >
                  <span>Open Supported UPI App Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* If Paytm Mode Selected */}
            {paymentMode === 'paytm' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-3">
                  <div className="font-bold flex items-center gap-2 text-sm text-blue-900">
                    <IndianRupee className="w-4 h-4 text-blue-600" />
                    <span>Paytm Direct Developer Payment</span>
                  </div>
                  <p className="leading-relaxed">
                    You can donate directly using Paytm Wallet, Paytm UPI, or net banking via Rishit's Paytm link.
                  </p>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-blue-800 block mb-1">
                      Paytm URL / Handle:
                    </label>
                    <input
                      type="text"
                      value={paytmUrl}
                      onChange={(e) => setPaytmUrl(e.target.value)}
                      placeholder="https://paytm.me/..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-blue-300 text-xs font-mono text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <a
                  href={paytmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#002e6e] hover:bg-[#001d47] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer block text-center"
                >
                  <span>Proceed to Paytm Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* If In-Hand Cash Mode Selected */}
            {paymentMode === 'cash' && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-3">
                <div className="font-bold flex items-center gap-2 text-sm text-amber-900">
                  <Banknote className="w-4 h-4 text-amber-600" />
                  <span>In-Hand Cash Handover (DAV School)</span>
                </div>
                <p className="leading-relaxed">
                  For classmates, friends, and parents handing cash directly to Rishit Shankar in school:
                </p>
                <div className="bg-white p-3 rounded-xl border border-amber-200 text-[11px] space-y-1">
                  <div>📍 <strong>Location:</strong> DAV Public School, Khabra, Muzaffarpur</div>
                  <div>👤 <strong>Recipient:</strong> Rishit Shankar (Head Boy, Class 8-D)</div>
                  <div>💵 <strong>Handover Amount:</strong> ₹{newDonationNum} in Cash</div>
                </div>
                <p className="text-[10px] text-amber-800 italic">
                  Clicking "Confirm &amp; Generate Bill" below immediately produces your official verified invoice and registers the payment.
                </p>
              </div>
            )}

            {/* If Card Mode Selected */}
            {paymentMode === 'card' && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white text-xs space-y-3">
                <div className="font-bold flex items-center gap-2 text-sm text-cyan-300">
                  <CreditCard className="w-4 h-4" />
                  <span>Credit / Debit Card Online Simulator</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                    maxLength={19}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={4}
                      className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">
                  Encrypted test mode with instant receipt emission.
                </p>
              </div>
            )}

            {/* Action Button: Confirm & Issue Official Bill */}
            <button
              type="button"
              onClick={handleConfirmDonation}
              disabled={isProcessing || newDonationNum <= 0}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-800 via-red-900 to-amber-700 hover:from-red-700 hover:to-amber-600 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-red-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Recording Donation &amp; Cloud Sync...</span>
                </>
              ) : (
                <>
                  <Receipt className="w-4 h-4 text-amber-300" />
                  <span>Confirm ₹{newDonationNum} &amp; Generate Official Bill</span>
                </>
              )}
            </button>

            <div className="text-center text-[10px] text-slate-400">
              🔒 Official digital receipt saved in cloud database with printable tax invoice.
            </div>

          </div>

        </div>

        {/* Top Supporters / Donor Wall */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-base text-slate-900">
                DAV Academic Champions &amp; Top Supporters
              </h3>
            </div>
            <span className="text-xs font-bold text-red-800 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              DAV Public School Hall of Fame
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {donorsList.map((donor) => (
              <div key={donor.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs relative group hover:border-amber-400 transition">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 truncate pr-2">{donor.name}</span>
                  <span className="font-mono font-extrabold text-red-800 shrink-0">{donor.amount}</span>
                </div>
                <div className="text-[10px] text-slate-500 truncate">{donor.role}</div>
                <div className="mt-2 flex items-center justify-between gap-1">
                  <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {donor.badge}
                  </span>
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleDeleteDonor(donor.id, donor.invoiceNumber, donor.name)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Admin: Delete Donor Record & Void Bill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Official Invoice Modal Popup */}
      <DavInvoiceModal
        isOpen={Boolean(activeInvoice)}
        onClose={() => setActiveInvoice(null)}
        invoiceData={activeInvoice}
      />
    </div>
  );
}

export default DonationSection;
