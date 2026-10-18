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
  Upload, 
  Eye, 
  EyeOff, 
  X, 
  Award, 
  Users, 
  Sparkles,
  MessageSquare,
  Database
} from 'lucide-react';

import { PRELOADED_DATABASE_USERS, getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { 
  fetchCloudStudents, 
  saveCloudStudent, 
  updateCloudPassword, 
  deleteCloudStudent 
} from '../services/supabaseClient';

export function AdminPanelModal({ isOpen, onClose, currentUser, onOpenDbGuide }) {
  // Only accessible to Administrator rishibhai
  if (!isOpen) return null;

  // Form State
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [studentSection, setStudentSection] = useState('D');
  const [planAmount, setPlanAmount] = useState('66');
  const [planTier, setPlanTier] = useState('vip');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [generatedId, setGeneratedId] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  
  // UI State
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [copiedReceiptId, setCopiedReceiptId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [lastGeneratedAccount, setLastGeneratedAccount] = useState(null);

  // Load existing registered users (Merging Local & Supabase Cloud)
  useEffect(() => {
    loadUsers();
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

  const saveUsers = (users) => {
    setRegisteredUsers(users);
    saveRegisteredUsers(users);
  };

  // Quick Generator for IDs and Passwords
  const handleAutoGenerateCredentials = () => {
    const cleanName = studentName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const randNum = Math.floor(100 + Math.random() * 900);
    const newId = cleanName ? `dav_${cleanName}${randNum}` : `student_dav_${randNum}`;
    
    // Generate secure password matching uppercase, lowercase, numbers, symbol
    const passChars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let randPass = '';
    for (let i = 0; i < 6; i++) {
      randPass += passChars.charAt(Math.floor(Math.random() * passChars.length));
    }
    const fullPass = `${randPass}@Aa`;

    setGeneratedId(newId);
    setGeneratedPassword(fullPass);
  };

  const handlePlanSelect = (amount, tier) => {
    setPlanAmount(amount);
    setPlanTier(tier);
  };

  const handleRegisterStudent = (e) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert('Please enter the Student Full Name.');
      return;
    }

    const finalId = (generatedId || `student_${Math.floor(1000 + Math.random() * 9000)}`).trim();
    const finalPassword = (generatedPassword || '12345689@Aa').trim();

    // Check collision with admin
    if (finalId.toLowerCase() === 'rishibhai') {
      alert('Cannot use admin ID "rishibhai" for a student account!');
      return;
    }

    // Check collision with existing students
    if (registeredUsers.some(u => u.id.toLowerCase() === finalId.toLowerCase())) {
      alert(`User ID "${finalId}" already exists! Please choose or generate another ID.`);
      return;
    }

    const newAccount = {
      id: finalId,
      password: finalPassword,
      name: studentName.trim(),
      classNum: studentClass,
      section: studentSection.toUpperCase(),
      role: 'Student',
      plan: planTier,
      dimension: planTier === 'vvip' ? 3 : planTier === 'vip' ? 2 : 1,
      dimensionName: planTier === 'vvip' ? 'Dimension 3: VVIP Plan' : planTier === 'vip' ? 'Dimension 2: VIP Plan' : 'Dimension 1: Normal Plan',
      paidAmount: `₹${planAmount}`,
      paymentMode: paymentMode,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    const updated = [newAccount, ...registeredUsers];
    saveUsers(updated);
    saveCloudStudent(newAccount); // Sync account directly to Supabase cloud!

    setLastGeneratedAccount(newAccount);
    setSuccessMessage(`Account activated for ${newAccount.name} (Class ${newAccount.classNum}-${newAccount.section})! Saved to local and Supabase cloud database.`);
    
    // Reset inputs for next student
    setStudentName('');
    setGeneratedId('');
    setGeneratedPassword('');
  };

  const handleDeleteUser = (idToDelete) => {
    if (window.confirm(`Are you sure you want to revoke access for ID: ${idToDelete}?`)) {
      const updated = registeredUsers.filter(u => u.id !== idToDelete);
      saveUsers(updated);
      deleteCloudStudent(idToDelete); // Delete from Supabase cloud
      if (lastGeneratedAccount?.id === idToDelete) {
        setLastGeneratedAccount(null);
      }
    }
  };

  const handleEditPassword = async (userObj) => {
    const newPass = window.prompt(`Enter new password for ${userObj.name} (${userObj.id}):`, userObj.password);
    if (!newPass || !newPass.trim()) return;
    const cleanPass = newPass.trim();
    const updated = registeredUsers.map(u => u.id === userObj.id ? { ...u, password: cleanPass } : u);
    saveUsers(updated);
    const cloudSuccess = await updateCloudPassword(userObj.id, cleanPass);
    if (cloudSuccess) {
      alert(`Password for ${userObj.name} (${userObj.id}) successfully updated in both local browser and Supabase Cloud Database!`);
    } else {
      alert(`Password updated locally! (Cloud update skipped if offline)`);
    }
  };

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const generateReceiptText = (acc) => {
    return `🏫 *THE DAV DICTIONARY - OFFICIAL STUDENT PASS*
━━━━━━━━━━━━━━━━━━━━
🎓 *Student Name:* ${acc.name}
📚 *Class:* Class ${acc.classNum}
💰 *Fee Paid:* ${acc.paidAmount} (${acc.paymentMode})
⭐ *Access Plan:* ${acc.plan.toUpperCase()} TIER
📅 *Date Issued:* ${acc.createdAt}
━━━━━━━━━━━━━━━━━━━━
🔑 *YOUR BLACKBOARD LOGIN CREDENTIALS:*
🌐 *Website:* http://localhost:3000/
👤 *Login ID:* ${acc.id}
🔒 *Password:* ${acc.password}
━━━━━━━━━━━━━━━━━━━━
✨ Authorized by Head Boy: *Rishit Shankar*
_Welcome to The DAV Dictionary! Please keep your password safe._`;
  };

  const handleCopyReceipt = (acc) => {
    const text = generateReceiptText(acc);
    navigator.clipboard.writeText(text);
    setCopiedReceiptId(acc.id);
    setTimeout(() => setCopiedReceiptId(null), 3000);
  };

  // Export JSON backup for Rishit
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(registeredUsers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dav_registered_students_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter real paid students (excluding master developer admin)
  const paidStudents = registeredUsers.filter(u => !u.isAdmin && u.id !== 'rishibhai');

  // Calculate total money collected
  const totalMoneyCollected = paidStudents.reduce((sum, u) => {
    const match = (u.paidAmount || '').match(/\d+/);
    return sum + (match ? parseInt(match[0], 10) : 0);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-4xl w-full shadow-2xl text-slate-100 overflow-hidden my-6">
        
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950/60 to-stone-900 border-b border-amber-500/30 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-amber-300 tracking-tight">
                  DAV Administrator & Developer Control Program
                </h2>
                <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  Admin Exclusive
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Created by Head Boy <strong className="text-amber-200">Rishit Shankar</strong> • Student Account & Fee Management System
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Financial & Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Paid Students</span>
              <p className="text-2xl font-black text-white">{paidStudents.length}</p>
              <span className="text-[10px] text-slate-400">Real registered accounts</span>
            </div>
            <Users className="w-8 h-8 text-amber-400 opacity-80" />
          </div>

          <div className="bg-slate-800/80 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-emerald-400 font-semibold uppercase">Total Revenue Collected</span>
              <p className="text-2xl font-black text-emerald-300">₹{totalMoneyCollected}</p>
              <span className="text-[10px] text-emerald-400/80">{paidStudents.length === 0 ? 'No fees collected yet' : 'Real fees from enrolled students'}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-amber-400 font-semibold uppercase">Your Role</span>
              <p className="text-sm font-bold text-amber-200">Administrator & Developer</p>
              <span className="text-[10px] text-slate-400">ID: rishibhai • Root Access</span>
            </div>
            <Award className="w-8 h-8 text-amber-300 opacity-80" />
          </div>
        </div>

        {/* Main Body: Two Columns (Generator on Left, Active Accounts Table on Right) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[70vh] overflow-y-auto">
          
          {/* LEFT COLUMN: Student ID & Password Generator Form */}
          <div className="lg:col-span-5 bg-slate-800/50 border border-slate-700/70 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Generate Paid Student Account
                </h3>
              </div>

              <form onSubmit={handleRegisterStudent} className="space-y-3.5 text-xs">
                {/* Student Full Name */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Student Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                {/* Class, Section & Payment Mode */}
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Class</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                        <option key={c} value={c}>Class {c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Section</label>
                    <select
                      value={studentSection}
                      onChange={(e) => setStudentSection(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      {['A', 'B', 'C', 'D', 'E'].map(sec => (
                        <option key={sec} value={sec}>Sec {sec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Payment</label>
                    <select
                      value={paymentMode}
                      onChange={(e) => setPaymentMode(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Cash">Cash (In-Hand)</option>
                      <option value="UPI">UPI / GPay</option>
                      <option value="Bank">Bank / Online</option>
                    </select>
                  </div>
                </div>

                {/* Plan Tier Selection (Independent of Price) */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Select Plan Tier &amp; Dimension
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPlanTier('normal')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        planTier === 'normal'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-black">Dimension 1</div>
                      <div className="text-[10px] opacity-80">Normal Plan</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlanTier('vip')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        planTier === 'vip'
                          ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-bold shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-black">Dimension 2</div>
                      <div className="text-[10px] opacity-80">VIP Pass</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPlanTier('vvip')}
                      className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                        planTier === 'vvip'
                          ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold shadow-md'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-black">Dimension 3</div>
                      <div className="text-[10px] opacity-80">VVIP Ultra</div>
                    </button>
                  </div>
                </div>

                {/* Animated Graphic Sliding Price Chart (₹0 to ₹1,00,000) */}
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-300 font-bold block text-xs">Custom Fee &amp; Donation Chart</span>
                      <span className="text-[10px] text-slate-400">Drag slider or type any custom amount (₹0 to ₹1 Lakh)</span>
                    </div>

                    <div className="text-right">
                      <div className="text-base sm:text-lg font-black text-amber-300 font-mono tracking-tight animate-pulse">
                        ₹{Number(planAmount || 0).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[9px] text-emerald-400 font-semibold uppercase tracking-wider">
                        {Number(planAmount) === 0 ? 'Free Scholarship' : Number(planAmount) <= 99 ? 'Student Rate' : Number(planAmount) <= 1000 ? 'Supporter' : 'Patron Benefactor'}
                      </div>
                    </div>
                  </div>

                  {/* Animated Visual Fill Bar */}
                  <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 transition-all duration-150 shadow-sm"
                      style={{ width: `${Math.min(100, Math.max(1, (Number(planAmount || 0) / 100000) * 100))}%` }}
                    />
                  </div>

                  {/* Interactive Slider Input */}
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="10"
                    value={planAmount}
                    onChange={(e) => setPlanAmount(e.target.value)}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />

                  {/* Direct Number Input Box */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold">Custom Amount:</span>
                    <div className="relative flex-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-xs">₹</span>
                      <input
                        type="number"
                        min="0"
                        max="100000"
                        value={planAmount}
                        onChange={(e) => setPlanAmount(e.target.value)}
                        placeholder="e.g. 50, 1000, 5000"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-6 pr-2.5 py-1 text-white text-xs font-mono font-bold focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* 1-Click Bargain & Support Presets */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
                      Quick 1-Click Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: '₹0 Free', val: '0' },
                        { label: '₹33 Standard', val: '33' },
                        { label: '₹50 Friend', val: '50' },
                        { label: '₹66 VIP', val: '66' },
                        { label: '₹99 VVIP', val: '99' },
                        { label: '₹500 Generous', val: '500' },
                        { label: '₹1,000 Supporter', val: '1000' },
                        { label: '₹5,000 Patron', val: '5000' },
                        { label: '₹50,000 Benefactor', val: '50000' },
                        { label: '₹1 Lakh Max', val: '100000' }
                      ].map(p => (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() => setPlanAmount(p.val)}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                            planAmount === p.val
                              ? 'bg-amber-400 text-stone-950 shadow-xs'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate ID & Password Button */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 font-semibold">Account Credentials</span>
                    <button
                      type="button"
                      onClick={handleAutoGenerateCredentials}
                      className="text-amber-400 hover:text-amber-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Auto-Generate
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Login ID (e.g. dav_aarav204)"
                      value={generatedId}
                      onChange={(e) => setGeneratedId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />

                    <input
                      type="text"
                      placeholder="Password (e.g. K8w4j@Aa)"
                      value={generatedPassword}
                      onChange={(e) => setGeneratedPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                {/* Submit / Activate Account Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer mt-3"
                >
                  <Sparkles className="w-4 h-4" />
                  Register & Activate Account
                </button>
              </form>
            </div>

            {/* Success Notification Box with Copy Receipt */}
            {lastGeneratedAccount && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs">
                <div className="flex items-center justify-between text-emerald-300 font-bold mb-1">
                  <span>✓ Account Created Successfully!</span>
                  <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded">Active</span>
                </div>
                <div className="text-slate-300 font-mono text-[11px] space-y-0.5">
                  <p>ID: <strong className="text-white">{lastGeneratedAccount.id}</strong></p>
                  <p>Pass: <strong className="text-white">{lastGeneratedAccount.password}</strong></p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyReceipt(lastGeneratedAccount)}
                  className="mt-2 w-full py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copiedReceiptId === lastGeneratedAccount.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Receipt Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy WhatsApp Receipt Message
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Directory of Registered Students */}
          <div className="lg:col-span-7 bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 sm:p-5 flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Active Student Accounts Directory
                </h3>
              </div>

              <button
                type="button"
                onClick={handleExportBackup}
                title="Download JSON backup of all accounts"
                className="text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-600 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Download className="w-3 h-3 text-amber-400" />
                Export Backup
              </button>
            </div>

            {/* Student Accounts Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-[10px] border-b border-slate-700">
                  <tr>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Login ID</th>
                    <th className="py-2.5 px-3">Password</th>
                    <th className="py-2.5 px-3">Plan / Fee</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {registeredUsers.map((u) => {
                    const isRevealed = revealedPasswords[u.id];
                    const isCopied = copiedReceiptId === u.id;
                    return (
                      <tr key={u.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-white">{u.name}</div>
                          <div className="text-[10px] text-slate-400">Class {u.classNum} • {u.paymentMode || 'Cash'}</div>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-amber-200">
                          {u.id}
                        </td>
                        <td className="py-2.5 px-3 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span>{isRevealed ? u.password : '••••••••'}</span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(u.id)}
                              className="text-slate-400 hover:text-white cursor-pointer"
                              title={isRevealed ? "Hide Password" : "Show Password"}
                            >
                              {isRevealed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEditPassword(u)}
                              className="text-amber-400 hover:text-amber-200 cursor-pointer ml-1 p-0.5 rounded hover:bg-slate-700"
                              title="Change Password in Cloud Database"
                            >
                              <Key className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {u.paidAmount || '₹10'} ({u.plan || 'basic'})
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyReceipt(u)}
                              title="Copy WhatsApp Receipt Message"
                              className="p-1 rounded hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUser(u.id)}
                              title="Revoke / Delete User"
                              className="p-1 rounded hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {registeredUsers.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No paid students registered yet. Use the form on the left to activate accounts.
                </div>
              )}
            </div>

            {/* Note on Student Login */}
            <div className="mt-4 p-2.5 bg-stone-900/80 border border-stone-700 rounded-lg text-[11px] text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Administrator Instruction:</strong> Any account generated above can immediately log in on the Blackboard Portal on any device using their assigned ID and Password. Rishit Shankar retains master control via ID <code className="text-amber-300 font-mono">rishibhai</code>.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminPanelModal;
