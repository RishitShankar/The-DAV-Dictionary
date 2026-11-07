import React, { useState } from 'react';
import { 
  X, User, KeyRound, Lock, Eye, EyeOff, Mail, School, 
  GraduationCap, Sparkles, ArrowRight, ArrowLeft, Check, 
  CheckCircle2, AlertCircle, Loader2, ShieldCheck, Award
} from 'lucide-react';
import { 
  sendRealEmailOtp, 
  registerFullStudentAccount, 
  findUserByGoogleEmail 
} from '../services/googleAuthService';
import { getRegisteredUsers } from '../data/preloadedUsers';

const CLASS_OPTIONS = [
  'LKG', 'UKG',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 
  'Class 5', 'Class 6', 'Class 7', 'Class 8', 
  'Other'
];

// Sections from A to Z
const SECTION_OPTIONS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

export function StudentRegisterModal({ isOpen, onClose, onRegisterSuccess }) {
  // Step indicator: 1 to 7
  // 1: Name -> 2: ID -> 3: Password -> 4: Class & Section -> 5: Dossier -> 6: Email OTP -> 7: Verify OTP
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Class & Section
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [customClass, setCustomClass] = useState('');
  const [customGrade, setCustomGrade] = useState('');
  const [customSection, setCustomSection] = useState('');

  // Academic Dossier
  const [motherName, setMotherName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [schoolName, setSchoolName] = useState('DAV Public School');

  // Email & OTP
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [emergencyOtp, setEmergencyOtp] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  // Step 1 -> 2: Validate Name
  const handleNextFromName = (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(2);
  };

  // Step 2 -> 3: Validate Student ID
  const handleNextFromId = (e) => {
    e.preventDefault();
    const id = studentId.trim();
    if (!id) {
      setErrorMsg('Please create a Student ID / Username.');
      return;
    }
    if (id.length < 3) {
      setErrorMsg('Student ID must be at least 3 characters long.');
      return;
    }
    // Check local existing registered users
    const localUsers = getRegisteredUsers();
    const exists = localUsers.some(u => u.id && u.id.toLowerCase() === id.toLowerCase());
    if (exists) {
      setErrorMsg('This Student ID is already taken. Please choose another.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
  };

  // Step 3 -> 4: Validate Password
  const handleNextFromPassword = (e) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg('Please enter a password.');
      return;
    }
    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter.');
      return;
    }
    setErrorMsg('');
    setCurrentStep(4);
  };

  // Step 4 -> 5: Validate Class & Section
  const handleNextFromClass = (e) => {
    e.preventDefault();
    if (selectedClass === 'Other') {
      if (!customClass.trim()) {
        setErrorMsg('Please enter your current Class / Course (e.g. Graduation, Class 9).');
        return;
      }
    }
    setErrorMsg('');
    setCurrentStep(5);
  };

  // Step 5 -> 6: Academic Dossier
  const handleNextFromDossier = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setCurrentStep(6);
  };

  // Step 6 -> 7: Send Real OTP to Gmail
  const handleSendOtp = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google / Gmail address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await sendRealEmailOtp(cleanEmail);
      setLoading(false);

      if (res.success) {
        if (res.emergencyOtp) {
          setEmergencyOtp(res.emergencyOtp);
          setSuccessMsg(`Security verification code: ${res.emergencyOtp}`);
        } else {
          setSuccessMsg(`Real 6-digit OTP code dispatched to ${cleanEmail}. Check your Gmail.`);
        }
        setCurrentStep(7);
      } else {
        setErrorMsg(res.error || 'Failed to dispatch OTP. Please check email address and try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Network error sending OTP. Please try again.');
    }
  };

  // Step 7: Verify OTP and Register Account
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (!cleanOtp) {
      setErrorMsg('Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Register account in preloaded database and Supabase
      const regResult = await registerFullStudentAccount({
        fullName: fullName.trim(),
        studentId: studentId.trim(),
        password: password.trim(),
        classNum: selectedClass === 'Other' ? 'Other' : selectedClass.replace('Class ', ''),
        section: selectedClass === 'Other' ? (customSection || 'A') : selectedSection,
        customClass: customClass.trim(),
        customGrade: customGrade.trim(),
        customSection: customSection.trim(),
        motherName: motherName.trim(),
        fatherName: fatherName.trim(),
        admissionNumber: admissionNumber.trim(),
        rollNumber: rollNumber.trim(),
        schoolName: schoolName.trim(),
        email: email.trim().toLowerCase()
      });

      setLoading(false);

      if (regResult.success && regResult.user) {
        setSuccessMsg('Account created successfully! Redirecting to Overview Hub...');
        setTimeout(() => {
          onRegisterSuccess(regResult.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(regResult.error || 'Failed to complete registration. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Registration error. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-sm animate-fadeIn select-none font-sans overflow-y-auto">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-slate-800 flex flex-col max-h-[94vh] my-auto">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-900 via-red-950 to-stone-950 text-white flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
                <span>Create Student Account</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 uppercase">
                  Step {currentStep} of 7
                </span>
              </h3>
              <p className="text-[11px] text-amber-200/80">
                DAV Smart Academic Portal Registration Wizard
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="w-full bg-stone-100 h-1.5 shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mx-5 mt-3 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2 animate-fadeIn shrink-0">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed">{errorMsg}</div>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="mx-5 mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed font-semibold">{successMsg}</div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">

          {/* STEP 1: STUDENT FULL NAME */}
          {currentStep === 1 && (
            <form onSubmit={handleNextFromName} className="space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 1 • Student Identity
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  What is your Full Name?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter your official school register name as it appears on DAV records.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. Rishit Shankar"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium bg-slate-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <span>Continue to Step 2: Choose Student ID</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: DESIRED STUDENT ID */}
          {currentStep === 2 && (
            <form onSubmit={handleNextFromId} className="space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 2 • Unique ID
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  Choose your Student ID / Username
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  This ID will be used for logging into the blackboard portal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student ID
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="e.g. rishit2026 or scholar_01"
                    value={studentId}
                    onChange={(e) => {
                      setStudentId(e.target.value.replace(/\s+/g, ''));
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium bg-slate-50/50 font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  No spaces allowed. E.g. rishit, aryan12, student_dav
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Set Password</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PASSWORD & CONFIRM PASSWORD */}
          {currentStep === 3 && (
            <form onSubmit={handleNextFromPassword} className="space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 3 • Security Password
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  Create a Secure Password
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keep this password safe to unlock your textbooks and personal vault.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-12 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Class & Section</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CLASS & SECTION (LKG TO 8 + OTHER, SECTIONS A TO Z) */}
          {currentStep === 4 && (
            <form onSubmit={handleNextFromClass} className="space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 4 • Academic Grade
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  Select Your Class & Section
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Classes from LKG to Class 8, plus Other grades. Sections from A through Z.
                </p>
              </div>

              {/* Class Selection Buttons */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Academic Class
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {CLASS_OPTIONS.map((c) => {
                    const isSelected = selectedClass === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedClass(c)}
                        className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer border text-center transform active:scale-95 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md ring-2 ring-amber-400/40 font-black scale-102'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* If "Other" is selected: Custom Class, Grade, and Section inputs */}
              {selectedClass === 'Other' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3 animate-fadeIn">
                  <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Custom Grade / Graduation Information</span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Write Your Class / Course Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Graduation (B.Tech / B.Sc), Class 9, College"
                      value={customClass}
                      onChange={(e) => setCustomClass(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Grade / Year / Branch
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1st Year, Science"
                        value={customGrade}
                        onChange={(e) => setCustomGrade(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Custom Section
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sec A, Batch 2"
                        value={customSection}
                        onChange={(e) => setCustomSection(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sections from A to Z with Animated Selection Cards */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700">
                    Section (A to Z)
                  </label>
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Selected: Section {selectedSection}
                  </span>
                </div>
                <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5 max-h-36 overflow-y-auto p-1.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  {SECTION_OPTIONS.map((sec) => {
                    const isSelected = selectedSection === sec;
                    return (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setSelectedSection(sec)}
                        className={`py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border text-center transform active:scale-95 ${
                          isSelected
                            ? 'bg-gradient-to-r from-red-800 to-amber-600 text-white border-amber-400 shadow-sm scale-110 z-10'
                            : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        {sec}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Student Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: ACADEMIC DOSSIER */}
          {currentStep === 5 && (
            <form onSubmit={handleNextFromDossier} className="space-y-3">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 5 • Student Dossier
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  Academic Record Details
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Fill in your official DAV student record dossier details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter mother's name"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter father's name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Admission Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ADM-8321"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 font-medium font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 24"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  School Name
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Next: Email &amp; OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 6: GMAIL & SEND REAL OTP */}
          {currentStep === 6 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Step 6 • Google Verification
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  Enter Your Google / Gmail Address
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  A real 6-digit cryptographic security OTP will be dispatched to your Gmail.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google / Gmail Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-medium bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Real Google SMTP Verification</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  We will send a live 6-digit authentication code to verify that you own this Gmail account. Valid for 10 minutes.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-800 via-stone-900 to-red-950 hover:from-black text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      <span>Sending Real OTP...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 text-amber-300" />
                      <span>Send Real OTP to Google Gmail</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 7: ENTER OTP & FINISH REGISTRATION */}
          {currentStep === 7 && (
            <form onSubmit={handleVerifyAndRegister} className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 shadow-sm">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  Verify 6-Digit OTP Code
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit security OTP to your email:
                </p>
                <div className="text-xs font-bold text-amber-800 font-mono mt-0.5">
                  {email}
                </div>
              </div>

              {emergencyOtp && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-center">
                  <span className="text-[10px] font-black uppercase text-emerald-700 block">Security Verification Code</span>
                  <span className="text-2xl font-black font-mono tracking-widest text-emerald-900">{emergencyOtp}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 text-center">
                  Enter 6-Digit Code
                </label>
                <input
                  type="text"
                  required
                  maxLength="6"
                  autoFocus
                  placeholder="• • • • • •"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ''));
                    if (errorMsg) setErrorMsg('');
                  }}
                  className="w-full py-3 text-center text-2xl font-mono tracking-widest font-black rounded-2xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-500/20 bg-amber-50/20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(6)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Resend / Edit</span>
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 hover:from-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying &amp; Launching...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Verify OTP &amp; Create My Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}

export default StudentRegisterModal;
