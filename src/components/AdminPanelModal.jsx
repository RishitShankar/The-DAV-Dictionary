import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Key, 
  UserPlus, 
  Copy, 
  Check, 
  Trash2, 
  RefreshCw, 
  IndianRupee, 
  Download, 
  Eye, 
  EyeOff, 
  X, 
  Award, 
  Users, 
  Sparkles,
  Receipt,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  QrCode,
  Banknote,
  ExternalLink,
  MessageCircle,
  Edit3,
  Heart
} from 'lucide-react';
import { DavInvoiceModal } from './DavInvoiceModal';
import { WhatsAppLogo } from './SocialLogos';
import { PRELOADED_DATABASE_USERS, getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { 
  fetchCloudStudents, 
  saveCloudStudent, 
  updateCloudPassword, 
  deleteCloudStudent,
  deleteCloudDonation,
  fetchCloudDonations
} from '../services/supabaseClient';

export function AdminPanelModal({ isOpen, onClose, currentUser, onOpenDbGuide }) {
  if (!isOpen) return null;

  // 2-Tab Navigation State: 'students' | 'donations'
  const [activeTab, setActiveTab] = useState('students');
  const [donationsList, setDonationsList] = useState([]);
  const [donationSearchQuery, setDonationSearchQuery] = useState('');

  // 17 Form Input States (Task 3 Specification)
  const [studentName, setStudentName] = useState('');
  const [gender, setGender] = useState('Male');
  const [studentClass, setStudentClass] = useState('8');
  const [studentSection, setStudentSection] = useState('D');
  const [rollNumber, setRollNumber] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [city, setCity] = useState('Muzaffarpur');
  const [residentialAddress, setResidentialAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [personalWhatsApp, setPersonalWhatsApp] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [remarks, setRemarks] = useState('');

  // Plan Tier & Fee Chart States
  const [planTier, setPlanTier] = useState('vip');
  const [planAmount, setPlanAmount] = useState('99');
  const [generatedId, setGeneratedId] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Payment Pop-up Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Paytm'); // 'UPI' | 'Paytm' | 'Cash' | 'Card'
  const [pendingAccountData, setPendingAccountData] = useState(null);

  // Active Directory & Search States
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [copiedReceiptId, setCopiedReceiptId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [successToast, setSuccessToast] = useState('');

  // Load existing registered users & donations (Merging Local & Supabase Cloud)
  useEffect(() => {
    loadUsers();
    loadDonations();
    fetchCloudStudents().then(cloudUsers => {
      if (cloudUsers && cloudUsers.length > 0) {
        const local = getRegisteredUsers();
        const mergedMap = new Map();
        local.forEach(u => mergedMap.set(u.id.toLowerCase(), u));
        cloudUsers.forEach(u => {
          const key = u.id.toLowerCase();
          mergedMap.set(key, { ...(mergedMap.get(key) || {}), ...u });
        });
        const merged = Array.from(mergedMap.values());
        setRegisteredUsers(merged);
        saveRegisteredUsers(merged);
      }
    }).catch(err => console.warn('Supabase fetch error in admin:', err));
  }, []);

  const loadUsers = () => {
    const users = getRegisteredUsers();
    setRegisteredUsers(users);
  };

  const loadDonations = async () => {
    let localDonations = [];
    try {
      const stored = localStorage.getItem('dav_cloud_donations');
      if (stored) localDonations = JSON.parse(stored);
      const storedInvoices = localStorage.getItem('dav_invoices');
      if (storedInvoices) {
        const invs = JSON.parse(storedInvoices);
        invs.forEach(inv => {
          if (inv.donationAmount && !localDonations.some(d => d.invoiceNumber === inv.invoiceNumber)) {
            localDonations.push(inv);
          }
        });
      }
    } catch (e) {}

    try {
      const cloudDonations = await fetchCloudDonations();
      if (cloudDonations && cloudDonations.length > 0) {
        const map = new Map();
        localDonations.forEach(d => map.set(d.invoiceNumber, d));
        cloudDonations.forEach(d => map.set(d.invoiceNumber, { ...(map.get(d.invoiceNumber) || {}), ...d }));
        localDonations = Array.from(map.values());
      }
    } catch (e) {}

    setDonationsList(localDonations);
  };

  const saveUsers = (users) => {
    setRegisteredUsers(users);
    saveRegisteredUsers(users);
  };

  // Quick Auto-Generator for ID and Password
  const handleAutoGenerateCredentials = () => {
    const cleanName = studentName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const randNum = Math.floor(100 + Math.random() * 900);
    const newId = cleanName ? `dav_${cleanName}${randNum}` : `student_dav_${randNum}`;
    
    // Secure random password with uppercase, lowercase, numbers & special character
    const passChars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let randPass = '';
    for (let i = 0; i < 6; i++) {
      randPass += passChars.charAt(Math.floor(Math.random() * passChars.length));
    }
    const fullPass = `${randPass}@Aa`;

    setGeneratedId(newId);
    setGeneratedPassword(fullPass);
    if (!admissionNumber) {
      setAdmissionNumber(`ADM-${studentClass}${studentSection}-${randNum}`);
    }
  };

  // Step 1: Click "Register & Active Account" -> Open Payment Pop-up
  const handleOpenPaymentPopup = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert('Please enter the Student Full Name.');
      return;
    }

    const finalId = (generatedId || `student_${Math.floor(1000 + Math.random() * 9000)}`).trim();
    const finalPassword = (generatedPassword || '12345689@Aa').trim();

    // Prevent collision with admin
    if (finalId.toLowerCase() === 'rishibhai') {
      alert('Cannot use admin ID "rishibhai" for a student account!');
      return;
    }

    // Prevent collision with existing students
    if (registeredUsers.some(u => u.id.toLowerCase() === finalId.toLowerCase())) {
      alert(`User ID "${finalId}" already exists! Please auto-generate or choose another ID.`);
      return;
    }

    const accountDraft = {
      id: finalId,
      password: finalPassword,
      name: studentName.trim(),
      gender,
      classNum: String(studentClass),
      section: (studentSection || 'A').toUpperCase(),
      rollNumber: rollNumber || '',
      admissionNumber: admissionNumber || `ADM-${finalId}`,
      motherName: motherName || '',
      fatherName: fatherName || '',
      city: city || 'Muzaffarpur',
      residentialAddress: residentialAddress || '',
      phoneNumber: phoneNumber || personalWhatsApp || mobileNumber || '',
      personalWhatsApp: personalWhatsApp || phoneNumber || mobileNumber || '',
      mobileNumber: mobileNumber || phoneNumber || '',
      email: email || '',
      instagram: instagram || '',
      linkedin: linkedin || '',
      remarks: remarks || '',
      role: planTier === 'developer' ? 'Administrator & Developer' : planTier === 'teacher' ? 'DAV Faculty Teacher' : 'Student',
      isAdmin: planTier === 'developer',
      isTeacher: planTier === 'teacher',
      plan: planTier,
      dimension: planTier === 'developer' ? 4 : planTier === 'teacher' ? 5 : planTier === 'vvip' ? 3 : planTier === 'vip' ? 2 : 1,
      dimensionName: planTier === 'developer' 
        ? 'Dimension 4: Master Developer' 
        : planTier === 'teacher' 
        ? 'Dimension 5: Faculty OS' 
        : planTier === 'vvip' 
        ? 'Dimension 3: VVIP Pass' 
        : planTier === 'vip' 
        ? 'Dimension 2: VIP Pass' 
        : 'Dimension 1: Normal Plan',
      paidAmount: planTier === 'developer' ? 'Founder / Unlimited' : planTier === 'teacher' ? 'Institutional' : `₹${planAmount}`,
      fee: planTier === 'developer' || planTier === 'teacher' ? 0 : Number(planAmount || 0),
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    setPendingAccountData(accountDraft);
    setIsPaymentModalOpen(true);
  };

  // Step 2: In Payment Pop-up, click "Confirm & Generate Official Bill"
  const handleConfirmPaymentAndActivate = () => {
    if (!pendingAccountData) return;

    const finalAccount = {
      ...pendingAccountData,
      paymentMode: selectedPaymentMethod === 'Paytm' 
        ? 'Paytm UPI (9470033984@upi)' 
        : selectedPaymentMethod === 'UPI'
        ? 'Google Pay / BHIM UPI (9470033984@upi)'
        : selectedPaymentMethod === 'Cash'
        ? 'School In-Hand Cash (Paid to Rishit)'
        : 'Card / Net Banking',
      confirmedAt: new Date().toISOString()
    };

    // 1. Save to registered users list & Supabase Cloud
    const updatedUsers = [finalAccount, ...registeredUsers];
    saveUsers(updatedUsers);
    saveCloudStudent(finalAccount);
    window.dispatchEvent(new CustomEvent('dav_faculty_updated'));

    // 2. Automatically generate that student's Section 9 personal ID vault!
    try {
      const vaultData = {
        fullName: finalAccount.name,
        studentId: finalAccount.id,
        gender: finalAccount.gender,
        classNum: finalAccount.classNum,
        section: finalAccount.section,
        rollNumber: finalAccount.rollNumber,
        admissionNumber: finalAccount.admissionNumber,
        motherName: finalAccount.motherName,
        fatherName: finalAccount.fatherName,
        residentialAddress: finalAccount.residentialAddress,
        city: finalAccount.city,
        phoneNumber: finalAccount.phoneNumber,
        personalWhatsApp: finalAccount.personalWhatsApp,
        mobileNumber: finalAccount.mobileNumber,
        email: finalAccount.email,
        instagram: finalAccount.instagram,
        linkedin: finalAccount.linkedin,
        remarks: finalAccount.remarks,
        currentAmbition: '',
        favoriteTeacher: '',
        likes: '',
        dislikes: '',
        favoriteSubject: '',
        photoUrl: '', // Ready for Section 9 upload
        tierPlan: finalAccount.dimensionName,
        paidAmount: finalAccount.paidAmount,
        paymentMode: finalAccount.paymentMode
      };
      localStorage.setItem(`dav_student_profile_${finalAccount.id.toLowerCase()}`, JSON.stringify(vaultData));
    } catch (e) {
      console.warn('Could not auto-write student vault to localStorage:', e);
    }

    // 3. Prepare & launch the Official Bill / Tax Invoice
    const invoiceNum = `DAV-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const billData = {
      invoiceNumber: invoiceNum,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      studentName: finalAccount.name,
      studentId: finalAccount.id,
      classNum: finalAccount.classNum,
      planName: finalAccount.dimensionName,
      baseAmount: finalAccount.fee,
      donationAmount: 0,
      totalAmount: finalAccount.fee,
      paymentMode: finalAccount.paymentMode,
      transactionId: `TXN-${finalAccount.id}-${Date.now().toString().slice(-6)}`,
      note: `Official account activation receipt for ${finalAccount.name}. Personal ID vault generated in Section 9. Authorized by Rishit Shankar.`
    };

    // Close payment modal and open bill
    setIsPaymentModalOpen(false);
    setActiveInvoice(billData);

    // Auto-dispatch WhatsApp pass with bill & credentials directly to student (Task 8 requirement)
    try {
      handleSendWhatsAppMessage(finalAccount);
    } catch (waErr) {
      console.warn('Auto-WhatsApp dispatch error:', waErr);
    }

    // Toast
    setSuccessToast(`Account activated for ${finalAccount.name} (${finalAccount.id})! Pass sent via WhatsApp.`);
    setTimeout(() => setSuccessToast(''), 6000);

    // Reset inputs
    setStudentName('');
    setRollNumber('');
    setAdmissionNumber('');
    setMotherName('');
    setFatherName('');
    setResidentialAddress('');
    setPhoneNumber('');
    setPersonalWhatsApp('');
    setMobileNumber('');
    setEmail('');
    setInstagram('');
    setLinkedin('');
    setRemarks('');
    setGeneratedId('');
    setGeneratedPassword('');
    setPendingAccountData(null);
  };

  // WhatsApp Auto-Messaging Function for Student Account
  const handleSendWhatsAppMessage = (acc) => {
    let targetPhone = acc.personalWhatsApp || acc.phoneNumber || acc.mobileNumber || '';
    let cleanPhone = targetPhone.replace(/[^0-9]/g, '');

    if (!cleanPhone) {
      const prompted = window.prompt(`Enter WhatsApp number for ${acc.name}:`, '91');
      if (!prompted) return;
      cleanPhone = prompted.replace(/[^0-9]/g, '');
    }

    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    const message = `🎓 *DAV DICTIONARY - OFFICIAL STUDENT PASS*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dear *${acc.name}*,
Welcome to DAV Dictionary! Your student access has been officially activated by Head Boy & Lead Developer *Rishit Shankar*.

👤 *Student Name:* ${acc.name}
🏫 *Class & Section:* Class ${acc.classNum}-${acc.section || 'A'}
🆔 *Login ID:* ${acc.id}
🔒 *Password:* ${acc.password}
💎 *Academic Tier:* ${(acc.dimensionName || acc.plan || 'VIP').toUpperCase()}
💰 *Fee Paid:* ${acc.paidAmount || '₹' + acc.fee} (${acc.paymentMode || 'Cash'})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Blackboard Login Portal:*
http://localhost:3000/

🎓 *Student ID Vault (Section 9):*
Your official digital student card has already been pre-filled with your enrollment details!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Authorized by: *Rishit Shankar* (Head Boy, DAV Public School)
_Keep your password safe. Have a great study session!_`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // WhatsApp Acknowledgement & Receipt for Donors
  const handleSendWhatsAppThankYou = (donation) => {
    let targetPhone = donation.phone || donation.phoneNumber || donation.personalWhatsApp || '';
    let cleanPhone = targetPhone.replace(/[^0-9]/g, '');

    if (!cleanPhone) {
      const prompted = window.prompt(`Enter WhatsApp number for donor ${donation.studentName || 'Supporter'}:`, '91');
      if (!prompted) return;
      cleanPhone = prompted.replace(/[^0-9]/g, '');
    }

    if (cleanPhone.length === 10) {
      cleanPhone = `91${cleanPhone}`;
    }

    const message = `❤️ *DAV DICTIONARY - OFFICIAL DONATION RECEIPT*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dear *${donation.studentName || 'Generous Supporter'}*,
Thank you very much for your voluntary donation to DAV Dictionary! Your contribution helps keep our cloud servers, Rishi AI Gemini API, and verified textbook solutions live for all DAV Public School students.

👤 *Donor Name:* ${donation.studentName}
💰 *Donation Amount:* ₹${donation.donationAmount || donation.totalAmount}
💳 *Payment Mode:* ${donation.paymentMode || 'Instant UPI'}
🧾 *Invoice Number:* ${donation.invoiceNumber}
🆔 *Transaction ID:* ${donation.transactionId || 'TXN-' + donation.invoiceNumber}
📅 *Date:* ${donation.date || new Date().toLocaleDateString('en-IN')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Authorized & Acknowledged by: *Rishit Shankar* (Head Boy & Lead Developer)
_With heartfelt gratitude from the entire DAV student community!_`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleDeleteUser = (idToDelete) => {
    if (window.confirm(`Are you sure you want to revoke access and delete student ID: ${idToDelete}?`)) {
      const updated = registeredUsers.filter(u => u.id !== idToDelete);
      saveUsers(updated);
      deleteCloudStudent(idToDelete);
    }
  };

  const handleDeleteDonation = (donation) => {
    const invId = donation.invoiceNumber || donation.id;
    const name = donation.studentName || donation.donorName || donation.userId || 'this donor';
    if (!window.confirm(`Are you sure you want to permanently delete donor record for "${name}" (Invoice: ${invId}) and void this bill from the platform?`)) {
      return;
    }

    // 1. Remove from local state
    const updated = donationsList.filter(d => (d.invoiceNumber || d.id) !== invId);
    setDonationsList(updated);

    // 2. Remove from localStorage 'dav_cloud_donations'
    try {
      const stored = localStorage.getItem('dav_cloud_donations');
      if (stored) {
        const parsed = JSON.parse(stored);
        const filtered = parsed.filter(d => (d.invoiceNumber || d.id) !== invId);
        localStorage.setItem('dav_cloud_donations', JSON.stringify(filtered));
      }
    } catch (e) {}

    // 3. Remove from localStorage 'dav_invoices'
    try {
      const storedInvoices = localStorage.getItem('dav_invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        const filteredInvoices = parsedInvoices.filter(d => (d.invoiceNumber || d.id) !== invId);
        localStorage.setItem('dav_invoices', JSON.stringify(filteredInvoices));
      }
    } catch (e) {}

    // 4. Remove from localStorage 'dav_donors_list'
    try {
      const storedDonors = localStorage.getItem('dav_donors_list');
      if (storedDonors) {
        const parsedDonors = JSON.parse(storedDonors);
        const filteredDonors = parsedDonors.filter(d => d.invoiceNumber !== invId && d.name !== name);
        localStorage.setItem('dav_donors_list', JSON.stringify(filteredDonors));
      }
    } catch (e) {}

    // 5. Delete from Supabase cloud
    if (typeof deleteCloudDonation === 'function') {
      deleteCloudDonation(invId).catch(() => {});
    }

    // 6. Notify entire application
    window.dispatchEvent(new Event('dav_donations_updated'));
  };

  const handleEditPassword = async (userObj) => {
    const newPass = window.prompt(`Enter new password for ${userObj.name} (${userObj.id}):`, userObj.password);
    if (!newPass || !newPass.trim()) return;
    const cleanPass = newPass.trim();
    const updated = registeredUsers.map(u => u.id === userObj.id ? { ...u, password: cleanPass } : u);
    saveUsers(updated);
    const cloudSuccess = await updateCloudPassword(userObj.id, cleanPass);
    if (cloudSuccess) {
      alert(`Password for ${userObj.name} (${userObj.id}) updated in local browser and Supabase Cloud Database!`);
    } else {
      alert(`Password updated locally!`);
    }
  };

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOpenExistingInvoice = (u) => {
    const invoiceNum = `DAV-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const paidMatch = (u.paidAmount || '').match(/\d+/);
    const amount = paidMatch ? parseInt(paidMatch[0], 10) : (u.fee || 10);
    setActiveInvoice({
      invoiceNumber: invoiceNum,
      date: u.createdAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      studentName: u.name || u.id,
      studentId: u.id,
      classNum: u.classNum || '8',
      planName: u.dimensionName || `${(u.plan || 'VIP').toUpperCase()} PASS`,
      baseAmount: amount,
      donationAmount: 0,
      totalAmount: amount,
      paymentMode: u.paymentMode || 'Paytm UPI (9470033984@upi)',
      transactionId: `TXN-${u.id}-${Date.now().toString().slice(-6)}`,
      note: `Official account activation receipt for ${u.name}. Authorized by Rishit Shankar.`
    });
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registeredUsers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dav_registered_students_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Financial calculations: Combined Subscription Fees + Total Voluntary Donations
  const paidStudents = registeredUsers.filter(u => !u.isAdmin && u.id !== 'rishibhai');
  const totalStudentFees = paidStudents.reduce((sum, u) => {
    const rawVal = parseFloat(String(u.paidAmount || u.fee || 0).replace(/[^0-9.]/g, '')) || 0;
    return sum + rawVal;
  }, 0);

  const totalDonations = donationsList.reduce((sum, d) => {
    const dVal = parseFloat(String(d.donationAmount || d.totalAmount || 0).replace(/[^0-9.]/g, '')) || 0;
    return sum + dVal;
  }, 0);

  const grandTotal = totalStudentFees + totalDonations;
  const totalMoneyCollected = Number.isInteger(grandTotal) ? grandTotal : grandTotal.toFixed(2);

  // Search filter for students
  const filteredStudents = registeredUsers.filter(u => {
    const q = searchQuery.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.id && u.id.toLowerCase().includes(q)) ||
      (u.classNum && String(u.classNum).includes(q)) ||
      (u.personalWhatsApp && u.personalWhatsApp.includes(q)) ||
      (u.phoneNumber && u.phoneNumber.includes(q))
    );
  });

  // Search filter for donations
  const filteredDonations = donationsList.filter(d => {
    const q = donationSearchQuery.toLowerCase();
    return (
      (d.studentName && d.studentName.toLowerCase().includes(q)) ||
      (d.userId && d.userId.toLowerCase().includes(q)) ||
      (d.invoiceNumber && d.invoiceNumber.toLowerCase().includes(q)) ||
      (d.transactionId && d.transactionId.toLowerCase().includes(q)) ||
      (d.paymentMode && d.paymentMode.toLowerCase().includes(q)) ||
      (d.note && d.note.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden animate-fadeIn select-none font-sans">
      
      {/* ========================================================================= */}
      {/* TOP BAR: Full Screen Header with Live Metrics & Controls                  */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-stone-950 via-slate-900 to-amber-950/70 border-b border-amber-500/30 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-stone-900 border-2 border-amber-400/80 p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
            <img 
              src="/logo.png" 
              alt="DAV Dictionary Official Logo" 
              className="w-full h-full object-contain"
              onError={(e) => { e.currentTarget.src = '/new-dav-dictionary-logo.jpg'; }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-amber-300 tracking-tight">
                DAV Administrator &amp; Developer Control Program
              </h1>
              <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                Root Access: rishibhai
              </span>
            </div>
            <p className="text-[11px] text-slate-300 hidden sm:block">
              Created by Head Boy <strong className="text-amber-200">Rishit Shankar</strong> • Student Account, Fee &amp; WhatsApp Automation System
            </p>
          </div>
        </div>

        {/* Live Metrics Header Badges */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Students</span>
              <span className="font-black text-white text-sm">{paidStudents.length}</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div>
              <span className="text-[10px] text-rose-400 font-bold uppercase block">Donors</span>
              <span className="font-black text-rose-300 text-sm font-mono">{donationsList.length}</span>
            </div>
            <div className="w-px h-6 bg-slate-700" />
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">Total Revenue</span>
              <span className="font-black text-emerald-300 text-sm font-mono" title={`Fees: ₹${totalStudentFees} + Donations: ₹${totalDonations}`}>
                ₹{totalMoneyCollected}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportBackup}
            title="Download JSON Backup"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Backup</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-600 border border-rose-800/60 text-rose-200 hover:text-white transition cursor-pointer"
            title="Close Full Screen Admin Program"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2 CLICKABLE TOP TABS (Task 10 Requirement) */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('students')}
            className={`py-3 px-3 sm:px-5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'students'
                ? 'border-amber-400 text-amber-300 bg-amber-400/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Accounts &amp; Active Directory</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-mono">
              {paidStudents.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('donations')}
            className={`py-3 px-3 sm:px-5 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border-b-2 transition cursor-pointer ${
              activeTab === 'donations'
                ? 'border-rose-400 text-rose-300 bg-rose-400/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
            <span>Donor Vault &amp; Donation History</span>
            <span className="px-2 py-0.5 rounded-full bg-rose-950 text-[10px] text-rose-300 font-mono border border-rose-800/60">
              {donationsList.length} Donors • ₹{totalDonations}
            </span>
          </button>
        </div>

        {/* Quick Revenue Split Breakdown */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-slate-400 py-2">
          <span>Student Fees: <strong className="text-emerald-400 font-mono">₹{totalStudentFees}</strong></span>
          <span>+</span>
          <span>Donations: <strong className="text-rose-400 font-mono">₹{totalDonations}</strong></span>
          <span>=</span>
          <span>Total: <strong className="text-amber-300 font-mono font-bold text-sm">₹{totalMoneyCollected}</strong></span>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successToast && (
        <div className="bg-emerald-600 text-slate-950 px-4 py-2 font-black text-xs flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-slate-900 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2-TAB CONDITIONAL WORKSPACE                                               */}
      {/* ========================================================================= */}
      {activeTab === 'students' ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 overflow-hidden">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT COLUMN: Generate Paid Student's Account (All 17 Fields + Sliders) */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 border-r border-slate-800 bg-slate-900/40 p-4 sm:p-6 overflow-y-auto space-y-5">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-black text-white tracking-wide uppercase">
                  Generate Paid Student's Account
                </h2>
                <p className="text-[10px] text-slate-400">
                  Full 17-field vault generation • Auto-syncs to Section 9 &amp; Supabase Cloud
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAutoGenerateCredentials}
              className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-stone-950 border border-amber-400/50 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Auto-Fill All
            </button>
          </div>

          <form onSubmit={handleOpenPaymentPopup} className="space-y-4 text-xs">
            
            {/* 1. Basic Student Info Box */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                1. Student Identity &amp; Classroom Details
              </span>

              {/* Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">
                    Full Student Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter student full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Class, Section, Roll No & Admission No */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Class</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Section</label>
                  <select
                    value={studentSection}
                    onChange={(e) => setStudentSection(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    {['A', 'B', 'C', 'D', 'E', 'F'].map(sec => (
                      <option key={sec} value={sec}>Sec {sec}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Roll Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 25"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Admission No.</label>
                  <input
                    type="text"
                    placeholder="e.g. ADM-8921"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 2. Parents & Residence Details */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                2. Parents &amp; Residence Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mother's Name</label>
                  <input
                    type="text"
                    placeholder="Mother's Full Name"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Father's Name</label>
                  <input
                    type="text"
                    placeholder="Father's Full Name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City or Palace</label>
                  <input
                    type="text"
                    placeholder="e.g. Muzaffarpur, Patna"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Residential Address</label>
                  <input
                    type="text"
                    placeholder="Full residential address"
                    value={residentialAddress}
                    onChange={(e) => setResidentialAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. Communication & Social Channels (Crucial WhatsApp Integration) */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                3. Contact Numbers &amp; Social Handles
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 9470033984"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                    <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                    <span>Personal WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 8092261750"
                    value={personalWhatsApp}
                    onChange={(e) => setPersonalWhatsApp(e.target.value)}
                    className="w-full bg-slate-900 border border-emerald-500/50 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Alternate mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email ID</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Instagram Link Handle</label>
                  <input
                    type="text"
                    placeholder="@username or profile link"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">LinkedIn Profile Link</label>
                  <input
                    type="text"
                    placeholder="linkedin.com/in/..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Remarks / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Good student, Chess enthusiast, School scholarship"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* 4. Plan Tier & Dimension Selection */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                4. Select Plan Tier &amp; Dimension
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <button
                  type="button"
                  onClick={() => { setPlanTier('normal'); setPlanAmount('99'); }}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    planTier === 'normal'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black">Dimension 1</div>
                  <div className="text-[10px] opacity-80">Normal Plan</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setPlanTier('vip'); setPlanAmount('199'); }}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    planTier === 'vip'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-bold shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black">Dimension 2</div>
                  <div className="text-[10px] opacity-80">VIP Pass</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setPlanTier('vvip'); setPlanAmount('499'); }}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    planTier === 'vvip'
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold shadow-md'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black">Dimension 3</div>
                  <div className="text-[10px] opacity-80">Double VIP</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setPlanTier('developer'); setPlanAmount('0'); }}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    planTier === 'developer'
                      ? 'bg-amber-500/25 border-amber-400 text-amber-300 font-bold shadow-md ring-2 ring-amber-400/40'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black">Dimension 4</div>
                  <div className="text-[10px] opacity-80">Developer Master</div>
                </button>

                <button
                  type="button"
                  onClick={() => { setPlanTier('teacher'); setPlanAmount('0'); }}
                  className={`p-2 rounded-xl border text-center transition cursor-pointer ${
                    planTier === 'teacher'
                      ? 'bg-teal-500/25 border-teal-400 text-teal-300 font-bold shadow-md ring-2 ring-teal-400/40'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-black">Dimension 5</div>
                  <div className="text-[10px] opacity-80">Faculty Master OS</div>
                </button>
              </div>
            </div>

            {/* 5. Custom Fee & Donation Chart with User's Exact Presets */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    5. Custom Fee &amp; Donation Chart
                  </span>
                  <span className="text-[10px] text-slate-400">Drag slider or pick 1-click preset</span>
                </div>
                <div className="text-right">
                  <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                    ₹{Number(planAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="5000"
                step="10"
                value={planAmount}
                onChange={(e) => setPlanAmount(e.target.value)}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />

              {/* Exact Presets as specified: 0, 49, 99, 199, 499, 999 */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase">
                  Quick 1-Click Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: '₹0 Standard Friend', val: '0' },
                    { label: '₹49', val: '49' },
                    { label: '₹99', val: '99' },
                    { label: '₹199', val: '199' },
                    { label: '₹499', val: '499' },
                    { label: '₹999', val: '999' }
                  ].map(p => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setPlanAmount(p.val)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        planAmount === p.val
                          ? 'bg-amber-400 text-stone-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Decimal Fee Input (Task 8 requirement: e.g. 10.50, 10.37) */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  Custom Decimal Amount:
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-400 font-mono font-bold text-xs">₹</span>
                  <input
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g. 10.50"
                    value={planAmount}
                    onChange={(e) => setPlanAmount(e.target.value)}
                    className="w-28 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 font-mono font-bold text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 6. Account Credentials (Login ID & Password) */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  6. Account Credentials
                </span>
                <button
                  type="button"
                  onClick={handleAutoGenerateCredentials}
                  className="text-amber-400 hover:text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Auto-Generate
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-slate-400 text-[10px] font-semibold mb-1">Login ID</label>
                  <input
                    type="text"
                    placeholder="e.g. dav_aarav204"
                    value={generatedId}
                    onChange={(e) => setGeneratedId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-[10px] font-semibold mb-1">Password</label>
                  <input
                    type="text"
                    placeholder="e.g. K8w4j@Aa"
                    value={generatedPassword}
                    onChange={(e) => setGeneratedPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button -> Triggers Payment Modal */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition cursor-pointer text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Register &amp; Active Account
            </button>

          </form>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* RIGHT COLUMN: Active Students and Account Dictionary                     */}
        {/* ----------------------------------------------------------------------- */}
        <div className="lg:col-span-6 flex flex-col min-h-0 bg-slate-900/60 p-4 sm:p-6 overflow-hidden">
          
          {/* Header & Search Bar */}
          <div className="space-y-3 pb-3 border-b border-slate-800 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-white tracking-wide uppercase">
                    Active Students and Account Dictionary
                  </h2>
                  <p className="text-[10px] text-slate-400">
                    {paidStudents.length} verified enrolled students • Direct WhatsApp delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, login ID, class or WhatsApp number..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Active Students List / Table */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pt-3 pr-1">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                No students match your query. Use the left column to activate an account.
              </div>
            ) : (
              filteredStudents.map((u) => {
                const isRevealed = revealedPasswords[u.id];
                const isCopied = copiedReceiptId === u.id;
                const isRishit = u.id === 'rishibhai';

                return (
                  <div 
                    key={u.id}
                    className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    {/* Student Info */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white truncate text-sm">{u.name}</span>
                        {isRishit ? (
                          <span className="bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Master Admin</span>
                        ) : (
                          <span className="bg-purple-900/80 text-purple-200 border border-purple-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            Class {u.classNum}-{u.section || 'A'}
                          </span>
                        )}
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                          u.plan === 'developer' || u.dimension === 4
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : u.plan === 'teacher' || u.dimension === 5
                            ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                            : u.plan === 'vvip' || u.dimension === 3
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : u.plan === 'vip' || u.dimension === 2
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}>
                          {u.dimensionName || (u.plan === 'developer' ? 'Dimension 4' : u.plan === 'teacher' ? 'Dimension 5' : u.plan === 'vvip' ? 'Dimension 3' : u.plan === 'vip' ? 'Dimension 2' : 'Dimension 1')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <span>ID: <strong className="font-mono text-amber-300">{u.id}</strong></span>
                        <span>•</span>
                        <div className="flex items-center gap-1 font-mono">
                          <span>Pass:</span>
                          <strong className="text-slate-200">{isRevealed ? u.password : '••••••••'}</strong>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(u.id)}
                            className="p-0.5 text-slate-500 hover:text-white cursor-pointer"
                            title={isRevealed ? "Hide Password" : "Show Password"}
                          >
                            {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                          {!isRishit && (
                            <button
                              type="button"
                              onClick={() => handleEditPassword(u)}
                              className="p-0.5 text-amber-400 hover:text-amber-300 cursor-pointer"
                              title="Edit Password"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold font-mono">
                          {u.paidAmount || `₹${u.fee || 99}`} ({u.paymentMode?.split(' ')[0] || 'Cash'})
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons: WhatsApp Message + Bill + Delete */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      
                      {/* WhatsApp Direct Message Button */}
                      {!isRishit && (
                        <button
                          type="button"
                          onClick={() => handleSendWhatsAppMessage(u)}
                          title="Send Credentials & Bill via WhatsApp"
                          className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition cursor-pointer"
                        >
                          <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </button>
                      )}

                      {/* View & Print Official Bill */}
                      {!isRishit && (
                        <button
                          type="button"
                          onClick={() => handleOpenExistingInvoice(u)}
                          title="View & Print Official Bill"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 transition cursor-pointer"
                        >
                          <Receipt className="w-4 h-4" />
                        </button>
                      )}

                      {/* Delete / Revoke Account */}
                      {!isRishit && (
                        <button
                          type="button"
                          onClick={() => handleDeleteUser(u.id)}
                          title="Revoke Student Account"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Security Note */}
          <div className="pt-3 mt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Full Master Control by Rishit Shankar</span>
            </span>
            <span className="text-slate-500">Auto-Generates Section 9 Student ID Card</span>
          </div>

        </div>

      </div>
      ) : (
        /* ======================================================================= */
        /* TAB 2: DONOR VAULT & DONATION HISTORY (Task 10 Requirement)             */
        /* ======================================================================= */
        <div className="flex-1 flex flex-col min-h-0 bg-slate-900/60 p-4 sm:p-6 overflow-hidden space-y-4">
          
          {/* Header & Metrics Summary Row */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Donors</span>
              <div className="text-2xl font-black text-white flex items-center gap-2 mt-0.5">
                <Users className="w-5 h-5 text-rose-400" />
                <span>{donationsList.length}</span>
              </div>
              <span className="text-[10px] text-slate-500">Verified Supporters</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-rose-500/30">
              <span className="text-[10px] font-bold uppercase text-rose-400 block">Total Voluntary Donations</span>
              <div className="text-2xl font-black text-rose-300 font-mono flex items-center gap-1.5 mt-0.5">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <span>₹{totalDonations}</span>
              </div>
              <span className="text-[10px] text-rose-400/70">Section 8 Cloud Support</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/30">
              <span className="text-[10px] font-bold uppercase text-emerald-400 block">Student Subscription Fees</span>
              <div className="text-2xl font-black text-emerald-300 font-mono flex items-center gap-1.5 mt-0.5">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>₹{totalStudentFees}</span>
              </div>
              <span className="text-[10px] text-emerald-400/70">Academic Pass Enrollments</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/60 to-slate-950 border border-amber-500/40">
              <span className="text-[10px] font-bold uppercase text-amber-400 block">Grand Total Revenue</span>
              <div className="text-2xl font-black text-amber-300 font-mono flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>₹{totalMoneyCollected}</span>
              </div>
              <span className="text-[10px] text-amber-300/70">Combined Platform Vault</span>
            </div>
          </div>

          {/* Search Bar for Donors */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={donationSearchQuery}
                onChange={(e) => setDonationSearchQuery(e.target.value)}
                placeholder="Search donors by name, student ID, invoice number, transaction ID, or payment mode..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-400"
              />
            </div>

            <button
              type="button"
              onClick={loadDonations}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
              title="Refresh Donations from Cloud"
            >
              <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
              <span>Refresh Cloud Vault</span>
            </button>
          </div>

          {/* Donors List Table */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredDonations.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-950/60 border border-slate-800 space-y-3">
                <Heart className="w-12 h-12 text-rose-500/40 mx-auto" />
                <h3 className="text-sm font-black text-white">No Donation Records Found</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Voluntary contributions received via UPI, Paytm, or Cash in Section 8 will appear in this verified donor vault with printable receipts and WhatsApp delivery.
                </p>
              </div>
            ) : (
              filteredDonations.map((d, index) => {
                const isCopied = copiedReceiptId === d.invoiceNumber;
                return (
                  <div
                    key={d.invoiceNumber || index}
                    className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-rose-500/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    {/* Donor Details */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                        <span className="font-black text-white text-sm truncate">
                          {d.studentName || d.donorName || d.userId || 'Generous Donor'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          {d.paymentMode?.split(' ')[0] || 'UPI'}
                        </span>
                        {d.classNum && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                            Class {d.classNum}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <span>Invoice: <strong className="font-mono text-amber-300">{d.invoiceNumber}</strong></span>
                        <span>•</span>
                        <span>TXN: <strong className="font-mono text-slate-300">{d.transactionId}</strong></span>
                        <span>•</span>
                        <span>Date: <strong className="text-slate-300">{d.date}</strong></span>
                        <span>•</span>
                        <span className="text-rose-400 font-extrabold font-mono text-sm">
                          ₹{d.donationAmount || d.totalAmount}
                        </span>
                      </div>

                      {d.note && (
                        <p className="text-[11px] text-slate-400 italic bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
                          "{d.note}"
                        </p>
                      )}
                    </div>

                    {/* Donor Actions: View Bill + WhatsApp Receipt + Copy */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveInvoice(d)}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        title="View & Print Official Donation Invoice"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Official Bill</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSendWhatsAppThankYou(d)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                        title="Send Official Receipt via WhatsApp"
                      >
                        <WhatsAppLogo className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(d.invoiceNumber);
                          setCopiedReceiptId(d.invoiceNumber);
                          setTimeout(() => setCopiedReceiptId(null), 2000);
                        }}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                        title="Copy Invoice ID"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      {/* Delete Donor Record & Void Bill Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteDonation(d)}
                        title="Admin: Delete Donor Record & Void Bill Permanently"
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-700 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Security Note */}
          <div className="pt-3 mt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between shrink-0">
            <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Voluntary Development Support • Rishit Shankar</span>
            </span>
            <span className="text-slate-500">All Donations Sync with Supabase Cloud Database</span>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* POP-UP 1: PAYMENT METHOD SELECTOR MODAL (Step 2 of Registration)         */}
      {/* ========================================================================= */}
      {isPaymentModalOpen && pendingAccountData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
            
            {/* Payment Header */}
            <div className="p-5 bg-gradient-to-r from-amber-950/80 to-slate-900 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-amber-300 uppercase tracking-tight">
                    Payment &amp; Authorization
                  </h3>
                  <p className="text-[11px] text-slate-300">
                    Student: <strong className="text-white">{pendingAccountData.name}</strong> • Class {pendingAccountData.classNum}-{pendingAccountData.section}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Payment Body */}
            <div className="p-6 space-y-5 text-xs">
              
              {/* Order Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Selected Plan Tier</div>
                  <div className="font-black text-white text-sm">{pendingAccountData.dimensionName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Total Amount Due</div>
                  <div className="text-xl font-black text-amber-300 font-mono">
                    ₹{pendingAccountData.fee}
                  </div>
                </div>
              </div>

              {/* Payment Methods Grid */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-bold uppercase text-[10px] tracking-wider">
                  Select Official Payment Mode:
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  
                  {/* Paytm with Real QR Code */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('Paytm')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      selectedPaymentMethod === 'Paytm'
                        ? 'bg-sky-500/20 border-[#00baf2] text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#002e6e] text-[#00baf2] font-black flex items-center justify-center text-xs">
                      Paytm
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Paytm Real QR</div>
                      <div className="text-[9px] text-sky-400">9470033984@upi</div>
                    </div>
                  </button>

                  {/* UPI (GPay / PhonePe) */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('UPI')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      selectedPaymentMethod === 'UPI'
                        ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">UPI / GPay / BHIM</div>
                      <div className="text-[9px] text-emerald-400">Instant Verification</div>
                    </div>
                  </button>

                  {/* In-Hand Cash */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('Cash')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      selectedPaymentMethod === 'Cash'
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center">
                      <Banknote className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">In-Hand Cash</div>
                      <div className="text-[9px] text-amber-400">Paid directly at school</div>
                    </div>
                  </button>

                  {/* Card / Net Banking */}
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentMethod('Card')}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex items-center gap-3 ${
                      selectedPaymentMethod === 'Card'
                        ? 'bg-purple-500/20 border-purple-400 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-600/30 text-purple-400 flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Card / NetBanking</div>
                      <div className="text-[9px] text-purple-400">Debit or Credit Card</div>
                    </div>
                  </button>

                </div>
              </div>

              {/* Dynamic Paytm Real QR Code Container */}
              {selectedPaymentMethod === 'Paytm' && (
                <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center justify-center space-y-2 border-2 border-[#00baf2] shadow-inner">
                  <div className="text-center">
                    <span className="text-[10px] font-black uppercase text-slate-500 block">Scan Real Paytm QR to Pay</span>
                    <strong className="text-sm font-black text-slate-900">Rishit Shankar • Head Boy</strong>
                  </div>

                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`upi://pay?pa=9470033984@upi&pn=Rishit%20Shankar&am=${pendingAccountData.fee}&cu=INR`)}`}
                    alt="Official Paytm QR Code"
                    className="w-36 h-36 rounded-lg object-contain border border-slate-200 shadow-sm"
                  />

                  <div className="text-[10px] text-center font-mono font-bold text-slate-600">
                    UPI ID: <span className="text-[#002e6e]">9470033984@upi</span> | Phone: 8092261750
                  </div>
                </div>
              )}

              {/* Confirm & Generate Official Bill Button */}
              <button
                type="button"
                onClick={handleConfirmPaymentAndActivate}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/30 transition cursor-pointer text-xs"
              >
                <Receipt className="w-4 h-4" />
                Confirm &amp; Generate Official Bill
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* POP-UP 2: OFFICIAL TAX INVOICE & BILL GENERATOR                           */}
      {/* ========================================================================= */}
      <DavInvoiceModal
        isOpen={Boolean(activeInvoice)}
        onClose={() => setActiveInvoice(null)}
        invoiceData={activeInvoice}
      />

    </div>
  );
}

export default AdminPanelModal;
