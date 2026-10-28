import React, { useState, useEffect } from 'react';
import { 
  User, Camera, Save, RefreshCw, CheckCircle2, Shield, 
  Crown, Award, MapPin, Heart, BookOpen, Sparkles, Download, 
  Upload, Printer, GraduationCap, Phone, Home, Mail, Key, Lock
} from 'lucide-react';
import { updateCloudPassword } from '../services/supabaseClient';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { getDeviceMetadata } from '../services/deviceAuthManager';

const PROFILE_STORAGE_KEY = 'dav_student_personal_profile';

export function StudentProfileSection({ user, onLogout }) {
  const currentUserId = user?.id || 'guest';
  const isMasterRishit = currentUserId.toLowerCase() === 'rishibhai';
  const storageKey = `dav_student_profile_${currentUserId.toLowerCase()}`;

  const buildDefaultProfile = () => {
    if (isMasterRishit) {
      return {
        fullName: 'Rishit Shankar',
        studentId: 'rishibhai',
        gender: 'Male',
        classNum: '8',
        section: 'D',
        rollNumber: '25',
        admissionNumber: 'ADM-8921-DAV',
        motherName: 'Mrs. S. Devi',
        fatherName: 'Mr. A. Shankar',
        residentialAddress: 'Muzaffarpur, Bihar',
        city: 'Muzaffarpur',
        phoneNumber: '8092261750',
        email: 'headboyrishitshankar@gmail.com',
        instagram: 'https://www.instagram.com/dav_dictionary?vrfl=MWcwYmRoMWVyeWNtOA==',
        linkedin: 'https://www.linkedin.com/in/rishit-shankar',
        currentAmbition: 'Master Full-Stack Software Developer, Chess Champion & Sanskrit Scholar',
        favoriteTeacher: 'Sanskrit & Science Teachers',
        likes: 'Artificial intelligence coding, chess tournaments, Sanskrit literature, 3D modeling, astronomy',
        dislikes: 'Superficial memorization, lack of discipline, cheating',
        favoriteSubject: 'Social Science, Sanskrit & Science',
        photoUrl: '/rishit_shankar.jpg',
        tierPlan: 'Master Developer Account'
      };
    }

    // Individual Student Account: Clean personalized template (no personal data of Rishit)
    return {
      fullName: user?.name || '',
      studentId: user?.id || user?.studentId || 'DAV-STUDENT',
      gender: 'Male',
      classNum: String(user?.classNum || '8'),
      section: user?.section || 'A',
      rollNumber: '',
      admissionNumber: user?.admissionNumber || `ADM-${user?.id || 'NEW'}`,
      motherName: '',
      fatherName: '',
      residentialAddress: '',
      city: '',
      phoneNumber: '',
      email: user?.email || '',
      instagram: '',
      linkedin: '',
      currentAmbition: '',
      favoriteTeacher: '',
      likes: '',
      dislikes: '',
      favoriteSubject: '',
      photoUrl: '', // Ready for student's own photo
      tierPlan: user?.plan === 'vvip' ? 'VVIP Scholar Pass' : user?.plan === 'vip' ? 'VIP Scholar Pass' : 'Student Scholar Pass'
    };
  };

  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return { ...buildDefaultProfile(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load profile from localStorage:', e);
    }
    return buildDefaultProfile();
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(profile.photoUrl || (isMasterRishit ? '/rishit_shankar.jpg' : ''));

  // Password Change State
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeStatus, setPasswordChangeStatus] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const cleanPass = newPasswordInput.trim();
    if (!cleanPass) {
      setPasswordChangeStatus('Please enter a new password.');
      return;
    }
    if (cleanPass.length < 6) {
      setPasswordChangeStatus('Password must be at least 6 characters.');
      return;
    }

    const currentId = user?.id || profile.studentId;
    setIsChangingPass(true);
    setPasswordChangeStatus('Syncing new password to Cloud Database...');

    // 1. Update locally in browser cache
    const localUsers = getRegisteredUsers();
    const updatedUsers = localUsers.map(u => u.id.toLowerCase() === currentId.toLowerCase() ? { ...u, password: cleanPass } : u);
    saveRegisteredUsers(updatedUsers);

    // 2. Update live in Supabase Cloud Database
    const cloudOk = await updateCloudPassword(currentId, cleanPass);
    setIsChangingPass(false);
    if (cloudOk) {
      setPasswordChangeStatus('✅ Password updated in Cloud Database! You can now log in with this new password on any device.');
      setNewPasswordInput('');
    } else {
      setPasswordChangeStatus('✅ Password updated locally on this device!');
      setNewPasswordInput('');
    }
    setTimeout(() => setPasswordChangeStatus(''), 5000);
  };

  // Sync when user prop changes
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setPhotoPreview(parsed.photoUrl || '');
      } else {
        const def = buildDefaultProfile();
        setProfile(def);
        setPhotoPreview(def.photoUrl || '');
      }
    } catch (e) {}
  }, [user?.id]);

  const handleChange = (field, value) => {
    setProfile(prev => {
      const updated = { ...prev, [field]: value };
      // Save continuously to localStorage for 100% persistence on refresh
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage error:', err);
      }
      return updated;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setPhotoPreview(base64Data);
        handleChange('photoUrl', base64Data);
        // Instant synchronization with Navbar and site-wide mini-profile
        window.dispatchEvent(new CustomEvent('dav_profile_photo_updated', {
          detail: { photoUrl: base64Data, userId: currentUserId }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(storageKey, JSON.stringify(profile));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      alert('Photo size is too large for browser storage. Please choose a smaller photo.');
    }
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(profile, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `DAV_Profile_${profile.studentId || 'student'}.json`);
    dlAnchorElem.click();
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Holographic Ambient Glow Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-orange-600/15 rounded-full pointer-events-none animate-float-orb" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full pointer-events-none animate-float-orb" style={{ animationDelay: '-4s' }} />
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-orange-950 to-stone-900 border border-orange-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-stone-950 font-black shadow-lg">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Section 9 • Official Student Profile Registry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                DAV Student Personal Profile Vault
              </h1>
              <p className="text-xs sm:text-sm text-orange-200/80 mt-1">
                Official Digital Identity & Scholastic Dossier • Guaranteed Local & Cloud Storage Persistence
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleManualSave}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition cursor-pointer"
            >
              {savedSuccess ? <CheckCircle2 className="w-4 h-4 text-emerald-950" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'Saved to Vault!' : 'Save Profile'}</span>
            </button>

            <button
              onClick={handleExportJson}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title="Export Profile as JSON"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrintCard}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition cursor-pointer"
              title="Print Student ID Card"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Persistence Status Notification */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-900/80 border border-orange-500/30 text-xs text-stone-300 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              <strong>Storage Status:</strong> Persistent Local Vault Active. Your identity data will <strong>never disappear</strong> upon refresh.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-300 bg-stone-950 px-2.5 py-0.5 rounded-md border border-stone-800">
            Account: {profile.studentId} • {profile.tierPlan}
          </span>
        </div>

        {/* Two Column Grid: ID Card Preview (Left) & Form Inputs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT: DAV STUDENT SMART IDENTITY CARD (PREVIEW)                           */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Smart ID Card Preview:</span>
            </h3>

            {/* Authentic DAV Student ID Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-600 via-orange-700 to-amber-900 text-stone-950 shadow-2xl border-2 border-amber-300 relative overflow-hidden card-super-interactive ultra-shimmer border-halo-gold">
              
              {/* Background watermark */}
              <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none">
                <img src="/logo.png" alt="watermark" className="w-64 h-64 object-contain" />
              </div>

              {/* ID Card Top Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-stone-950/20">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="DAV Logo" className="w-10 h-10 object-contain drop-shadow" />
                  <div>
                    <div className="font-black text-sm uppercase tracking-tight text-stone-950">
                      D.A.V. PUBLIC SCHOOL
                    </div>
                    <div className="text-[10px] font-bold text-stone-900 uppercase">
                      Official Student Identity Card
                    </div>
                  </div>
                </div>
                <span className="bg-stone-950 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  {profile.tierPlan.replace(/Dimension \d+:\s*/gi, '')}
                </span>
              </div>

              {/* Photo & Details Row */}
              <div className="mt-4 flex gap-4 items-center">
                
                {/* Photo Display */}
                <div className="relative group shrink-0">
                  <div className="w-24 h-28 rounded-2xl overflow-hidden border-2 border-stone-950 bg-stone-900 shadow-md flex items-center justify-center">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Student" 
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          if (isMasterRishit) {
                            e.target.src = '/rishit_shankar.jpg';
                          } else {
                            setPhotoPreview('');
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900/90 text-stone-400 p-2 text-center">
                        <User className="w-8 h-8 text-amber-400/80 mb-1" />
                        <span className="text-[9px] font-bold text-amber-200/90 leading-tight">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <label 
                    htmlFor="photoUploadInput"
                    className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-stone-950 text-amber-300 hover:scale-110 shadow-lg cursor-pointer transition border border-amber-400"
                    title="Change Photo"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <input 
                      id="photoUploadInput"
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>

                {/* Core Credentials */}
                <div className="flex-1 text-xs space-y-1 text-stone-950">
                  <div className="text-base font-black truncate leading-tight">
                    {profile.fullName || 'Student Name'}
                  </div>
                  <div className="font-bold text-[11px] text-stone-900">
                    Class: <span className="font-black">{profile.classNum}-{profile.section}</span> • Roll: <span className="font-black">{profile.rollNumber}</span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-stone-900">
                    ID: {profile.studentId}
                  </div>
                  <div className="text-[10px] font-mono text-stone-800">
                    Adm No: {profile.admissionNumber}
                  </div>
                  <div className="text-[10px] font-medium text-stone-900">
                    Father: <span className="font-bold">{profile.fatherName}</span>
                  </div>
                  <div className="text-[10px] font-medium text-stone-900">
                    City: <span className="font-bold">{profile.city}</span>
                  </div>
                  {profile.phoneNumber && (
                    <div className="text-[10px] font-mono text-stone-900">
                      Mob: <span className="font-bold">{profile.phoneNumber}</span>
                    </div>
                  )}
                  {profile.email && (
                    <div className="text-[9px] font-mono text-stone-900 truncate" title={profile.email}>
                      Email: <span className="font-bold">{profile.email}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Security Hologram Strip */}
              <div className="mt-4 pt-3 border-t-2 border-stone-950/20 flex items-center justify-between text-[9px] font-bold text-stone-900">
                <span className="font-mono tracking-wider">SECURE DIGITAL TOKEN • 2026–27</span>
                <span className="bg-stone-950 text-amber-400 px-2 py-0.5 rounded font-mono">
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Personal Statement Card */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-orange-500/30 text-xs text-stone-300 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Student Ambition & Focus:</span>
              </div>
              <p className="text-xs leading-relaxed text-stone-200 italic">
                "{profile.currentAmbition || 'Dedicated to academic excellence and school leadership.'}"
              </p>
              <div className="pt-2 border-t border-stone-800 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-stone-500 block">Favorite Subject:</span>
                  <span className="font-bold text-amber-300">{profile.favoriteSubject}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Favorite Teacher:</span>
                  <span className="font-bold text-amber-300">{profile.favoriteTeacher}</span>
                </div>
              </div>
            </div>

            {/* One Man, One Device Security Card */}
            <div className="p-4 rounded-2xl bg-stone-900 border border-emerald-500/40 text-xs text-stone-300 space-y-3">
              <div className="font-bold text-emerald-400 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Device Security & Binding:</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Current Device:</span>
                  <span className="font-bold text-white truncate ml-2">{getDeviceMetadata().deviceName}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Security Rule:</span>
                  <span className="font-bold text-emerald-300">1 Man, 1 Device, 1 Account</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">Double VIP Protocol:</span>
                  <span className="font-bold text-amber-300">
                    {user?.plan === 'vvip' || user?.dimension === 3 ? 'Double VIP Bound (1 Device Only)' : 'Strictly Enforced'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-400 leading-relaxed">
                Not a single account is allowed to be logged into two devices simultaneously. If you log out from this device, your account is released and another person is allowed to log in on this device.
              </p>

              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-2 px-3 rounded-xl bg-stone-800 hover:bg-rose-950/60 border border-stone-700 hover:border-rose-500/60 text-stone-300 hover:text-rose-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Log Out to Release This Device</span>
                </button>
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT: EDITABLE PROFILE FORM FIELDS                                       */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 bg-stone-900 rounded-3xl border border-orange-500/40 p-6 sm:p-8 shadow-xl">
            <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 mb-6">
              <User className="w-4 h-4 text-amber-400" />
              <span>Edit Personal Records & Personality Information</span>
            </h3>

            <form onSubmit={handleManualSave} className="space-y-4 text-xs">
              
              {/* Row 1: Full Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Full Student Name:</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Rishit Shankar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Gender:</label>
                  <select
                    value={profile.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Class, Section, Roll No, Admission No */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Class:</label>
                  <select
                    value={profile.classNum}
                    onChange={(e) => handleChange('classNum', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  >
                    {['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Section:</label>
                  <input
                    type="text"
                    value={profile.section}
                    onChange={(e) => handleChange('section', e.target.value)}
                    placeholder="e.g. D"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Roll No:</label>
                  <input
                    type="text"
                    value={profile.rollNumber}
                    onChange={(e) => handleChange('rollNumber', e.target.value)}
                    placeholder="e.g. 25"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Adm No:</label>
                  <input
                    type="text"
                    value={profile.admissionNumber}
                    onChange={(e) => handleChange('admissionNumber', e.target.value)}
                    placeholder="ADM-XXXX"
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 3: Parents Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Mother's Name:</label>
                  <input
                    type="text"
                    value={profile.motherName}
                    onChange={(e) => handleChange('motherName', e.target.value)}
                    placeholder="Mother's Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Father's Name:</label>
                  <input
                    type="text"
                    value={profile.fatherName}
                    onChange={(e) => handleChange('fatherName', e.target.value)}
                    placeholder="Father's Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 4: Living Place & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">City / Place:</label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="e.g. Muzaffarpur, Bihar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Residential Address:</label>
                  <input
                    type="text"
                    value={profile.residentialAddress}
                    onChange={(e) => handleChange('residentialAddress', e.target.value)}
                    placeholder="Address / Locality"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row: Student Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Phone / Mobile Number:</label>
                  <input
                    type="text"
                    value={profile.phoneNumber || ''}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    placeholder="e.g. 8092261750"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Email ID:</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="e.g. headboyrishitshankar@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              {/* Row: Social Media Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Instagram Link / Handle:</label>
                  <input
                    type="text"
                    value={profile.instagram || ''}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    placeholder="https://www.instagram.com/rishit_shankar..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">LinkedIn Profile Link:</label>
                  <input
                    type="text"
                    value={profile.linkedin || ''}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 5: What I am doing / Current Ambition */}
              <div>
                <label className="block text-stone-300 font-bold mb-1">
                  What I Am Doing / Current Ambition & Goals:
                </label>
                <textarea
                  rows="2"
                  value={profile.currentAmbition}
                  onChange={(e) => handleChange('currentAmbition', e.target.value)}
                  placeholder="Describe your current studies, coding projects, or leadership roles..."
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Row 6: Favorite Teacher & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Favorite Teacher:</label>
                  <input
                    type="text"
                    value={profile.favoriteTeacher}
                    onChange={(e) => handleChange('favoriteTeacher', e.target.value)}
                    placeholder="e.g. Sanskrit / Maths Teacher"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Favorite Subject(s):</label>
                  <input
                    type="text"
                    value={profile.favoriteSubject}
                    onChange={(e) => handleChange('favoriteSubject', e.target.value)}
                    placeholder="e.g. Social Science, Science, Sanskrit"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Row 7: Likes & Dislikes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Likes & Hobbies:</label>
                  <textarea
                    rows="2"
                    value={profile.likes}
                    onChange={(e) => handleChange('likes', e.target.value)}
                    placeholder="What do you enjoy doing?"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-bold mb-1">Dislikes / Pet Peeves:</label>
                  <textarea
                    rows="2"
                    value={profile.dislikes}
                    onChange={(e) => handleChange('dislikes', e.target.value)}
                    placeholder="What do you avoid?"
                    className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-700 text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-lg transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Lock Profile (Auto-Persists)</span>
                </button>
              </div>

            </form>

            {/* Cloud Database Password Change Section */}
            <div className="mt-8 pt-6 border-t border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <Lock className="w-4 h-4" />
                <span>Cloud Account Security & Change Password</span>
              </div>
              <p className="text-xs text-stone-400 mb-4">
                Update your account password in the live Cloud Database. Once updated, you can log in with this new password on any phone or laptop.
              </p>

              <form onSubmit={handleChangePassword} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <Key className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Enter new secure password (min 6 chars)"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isChangingPass}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{isChangingPass ? 'Updating...' : 'Update Password in Cloud'}</span>
                </button>
              </form>

              {passwordChangeStatus && (
                <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 animate-fadeIn">
                  {passwordChangeStatus}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentProfileSection;
