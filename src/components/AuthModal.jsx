import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, Shield, CheckCircle, Database, Sparkles, 
  Key, ArrowRight, UserCheck, RefreshCw 
} from 'lucide-react';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { saveCloudStudent } from '../services/supabaseClient';

export function AuthModal({ isOpen, onClose, user, onLogin, onLogout, onOpenDbGuide, onGoToSection }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [generatedId, setGeneratedId] = useState('');
  const [role, setRole] = useState('Student');
  const [teacherSubject, setTeacherSubject] = useState('Science & Biology');
  const [teacherDp, setTeacherDp] = useState('');

  if (!isOpen) return null;

  const currentUid = (user?.id || user?.studentId || 'rishibhai').toLowerCase();
  const isMasterRishit = currentUid === 'rishibhai' || user?.isAdmin;

  const savedProfile = (() => {
    try {
      const raw = localStorage.getItem(`dav_student_profile_${currentUid}`);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  })();

  const profilePhoto = savedProfile?.photoUrl || user?.photoUrl || (isMasterRishit ? '/rishit_shankar.jpg' : null);
  const studentFullName = savedProfile?.fullName || user?.name || (isMasterRishit ? 'Rishit Shankar' : 'DAV Student');
  const classDisplay = savedProfile?.classNum || user?.classNum || '8';
  const sectionDisplay = savedProfile?.section || user?.section || 'D';
  const rollDisplay = savedProfile?.rollNumber || (isMasterRishit ? '25' : 'N/A');
  const admissionDisplay = savedProfile?.admissionNumber || (isMasterRishit ? 'ADM-8921-DAV' : `ADM-${currentUid.toUpperCase()}`);
  const tierPlan = savedProfile?.tierPlan || user?.dimensionName || (user?.plan === 'vvip' ? 'Dimension 3: VVIP Plan' : user?.plan === 'vip' ? 'Dimension 2: VIP Plan' : isMasterRishit ? 'Dimension 4: Master Developer' : 'Dimension 1: Normal Plan');

  const generateStudentId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `DAV-2026-${randomNum}`;
    setGeneratedId(newId);
    return newId;
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$';
    let res = '';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idToUse = generatedId || (isRegister ? generateStudentId() : 'DAV-2026-5542');
    const isTeacher = role === 'Teacher' || role.toLowerCase().includes('teacher');
    
    const userData = {
      id: idToUse,
      name: name || (isTeacher ? 'Prof. DAV Faculty' : isRegister ? 'DAV Scholar' : 'Head Boy Aryan'),
      email: email || (isTeacher ? 'faculty@davschool.edu.in' : 'student@davschool.edu.in'),
      password: password || '12345678',
      studentId: idToUse,
      classNum: studentClass,
      role: isTeacher ? 'DAV Faculty Teacher' : role,
      isTeacher: isTeacher,
      plan: isTeacher ? 'teacher' : (user?.plan || 'normal'),
      dimension: isTeacher ? 5 : 1,
      dimensionName: isTeacher ? 'Dimension 5: Faculty OS' : 'Dimension 1: Normal Plan',
      personalWhatsApp: '919470033984',
      phoneNumber: '919470033984',
      subject: isTeacher ? teacherSubject : undefined,
      department: isTeacher ? (
        teacherSubject.toLowerCase().includes('scien') ? 'Science' :
        teacherSubject.toLowerCase().includes('math') ? 'Mathematics' :
        teacherSubject.toLowerCase().includes('social') ? 'Social Science' :
        teacherSubject.toLowerCase().includes('hindi') ? 'Hindi' :
        teacherSubject.toLowerCase().includes('eng') ? 'English' :
        teacherSubject.toLowerCase().includes('sanskrit') ? 'Sanskrit' :
        teacherSubject.toLowerCase().includes('comp') ? 'Computer Science' : 'Science'
      ) : undefined,
      dp: isTeacher && teacherDp ? teacherDp : (user?.dp || null),
      avatar: isTeacher && teacherDp ? teacherDp : (user?.avatar || null),
      joinedAt: new Date().toLocaleDateString()
    };

    if (isRegister) {
      try {
        const stored = getRegisteredUsers();
        const updated = [userData, ...stored.filter(u => u.id !== userData.id)];
        saveRegisteredUsers(updated);
        saveCloudStudent(userData).catch(() => {});
        window.dispatchEvent(new CustomEvent('dav_faculty_updated'));
      } catch (err) {}
    }

    onLogin(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="The DAV Dictionary" 
              className="w-10 h-10 rounded-xl object-cover border border-amber-400"
            />
            <div>
              <h3 className="font-extrabold text-lg text-white">
                {user ? 'Admin & Student Profile' : (isRegister ? 'Student Registration' : 'The DAV Dictionary Portal')}
              </h3>
              <p className="text-xs text-slate-300">The DAV Dictionary • Official Reference</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logged In View */}
        {user ? (
          <div className="p-6 space-y-4">
            {/* Real Student ID Card Display with DP */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-red-50/30 border border-slate-200 flex items-center gap-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-800 to-amber-600 text-amber-200 font-extrabold text-2xl flex items-center justify-center shadow-md border-2 border-amber-400 overflow-hidden shrink-0">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt={studentFullName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{studentFullName ? studentFullName[0].toUpperCase() : 'D'}</span>
                )}
              </div>
              <div className="truncate">
                <div className="font-extrabold text-base text-slate-900 truncate">{studentFullName}</div>
                <div className="text-xs font-mono font-bold text-red-800">ID: {user.studentId || user.id || currentUid}</div>
                <div className="text-[11px] text-slate-600 mt-0.5 font-medium">
                  Class {classDisplay} • Sec {sectionDisplay} | Roll: {rollDisplay}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {admissionDisplay}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Current Plan &amp; Dimension</span>
                <span className="font-bold text-slate-900 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[11px]">
                  {tierPlan}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Cloud Database Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Synced Locally + Cloud Ready
                </span>
              </div>
            </div>

            {/* Direct Navigation to Section 9 Student ID Vault */}
            <button
              type="button"
              onClick={() => {
                if (onGoToSection) onGoToSection(9);
                else onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-800 to-amber-600 hover:from-red-700 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-red-950/20 transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-amber-300" />
              <span>Open Student ID Vault (Section 9) 🎓</span>
            </button>

            <div className="pt-1 flex gap-2">
              <button
                onClick={onLogout}
                className="flex-1 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold transition cursor-pointer"
              >
                Log Out
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenDbGuide && onOpenDbGuide();
                }}
                className="flex-1 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                <span>Cloud DB Settings</span>
              </button>
            </div>
          </div>
        ) : (
          /* Login / Register Form */
          <div className="p-6">
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className={`flex-1 py-2 rounded-lg transition ${
                  !isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  if (!generatedId) generateStudentId();
                }}
                className={`flex-1 py-2 rounded-lg transition ${
                  isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aryan Sharma (Head Boy)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>
              )}

              {isRegister && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Class</label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(c => (
                        <option key={c} value={c}>Class {c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium"
                    >
                      <option value="Student">Student</option>
                      <option value="Head Boy">Head Boy</option>
                      <option value="Head Girl">Head Girl</option>
                      <option value="Teacher">Teacher / Faculty</option>
                    </select>
                  </div>
                </div>
              )}

              {isRegister && role === 'Teacher' && (
                <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200 space-y-2.5">
                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Teaching Subject (Dimension 5)</label>
                    <select
                      value={teacherSubject}
                      onChange={(e) => setTeacherSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-purple-300 bg-white font-semibold text-purple-900"
                    >
                      <option value="Science & Biology">Science & Biology</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Social Science">Social Science</option>
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Sanskrit">Sanskrit</option>
                      <option value="Computer Science">Computer Science</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-purple-950 mb-1">Profile Picture (DP)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        id="auth-teacher-dp-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (ev) => {
                              setTeacherDp(ev.target.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor="auth-teacher-dp-upload"
                        className="px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold cursor-pointer transition shadow-xs"
                      >
                        {teacherDp ? 'Change Photo (DP)' : 'Upload Your Photo (DP)'}
                      </label>
                      {teacherDp && (
                        <div className="flex items-center gap-1.5">
                          <img src={teacherDp} alt="DP Preview" className="w-7 h-7 rounded-full object-cover border border-purple-400" />
                          <span className="text-[10px] text-emerald-700 font-bold">DP Selected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isRegister ? 'Email Address' : 'Student ID or Email'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder={isRegister ? "aryan@davschool.edu.in" : "DAV-2026-XXXX or Email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  {isRegister && (
                    <button
                      type="button"
                      onClick={handleGeneratePassword}
                      className="text-[11px] font-semibold text-red-700 hover:underline flex items-center gap-1"
                    >
                      <Key className="w-3 h-3" />
                      Generate Strong
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 font-mono"
                  />
                </div>
              </div>

              {isRegister && (
                <div className="p-3 bg-red-50 rounded-xl border border-red-200 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-red-800 font-bold">Auto-Generated Student ID:</div>
                    <div className="text-xs font-mono font-black text-red-950">{generatedId || 'DAV-2026-XXXX'}</div>
                  </div>
                  <button
                    type="button"
                    onClick={generateStudentId}
                    className="p-1.5 rounded-lg bg-red-200/60 text-red-800 hover:bg-red-200 text-xs"
                    title="Generate New ID"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-800 to-rose-800 hover:from-red-900 hover:to-rose-900 text-white text-xs font-bold shadow-md transition flex items-center justify-center gap-2"
              >
                <span>{isRegister ? 'Create & Register Student ID' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
