import React, { useState } from 'react';
import { 
  X, User, Lock, Mail, Shield, CheckCircle, Database, Sparkles, 
  Key, ArrowRight, UserCheck, RefreshCw 
} from 'lucide-react';

export function AuthModal({ isOpen, onClose, user, onLogin, onLogout, onOpenDbGuide }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [generatedId, setGeneratedId] = useState('');
  const [role, setRole] = useState('Student');

  if (!isOpen) return null;

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
    
    const userData = {
      name: name || (isRegister ? 'DAV Scholar' : 'Head Boy Aryan'),
      email: email || 'student@davschool.edu.in',
      studentId: idToUse,
      classNum: studentClass,
      role: role,
      plan: user?.plan || 'free',
      joinedAt: new Date().toLocaleDateString()
    };

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
          <div className="p-6 space-y-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-800 text-amber-300 font-extrabold text-xl flex items-center justify-center shadow-inner">
                {user.name ? user.name[0].toUpperCase() : 'D'}
              </div>
              <div>
                <div className="font-extrabold text-base text-slate-900">{user.name}</div>
                <div className="text-xs font-mono font-bold text-red-800">ID: {user.studentId}</div>
                <div className="text-xs text-slate-500 mt-0.5">Role: {user.role || 'DAV Student'} • Class {user.classNum || '8'}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Current Plan</span>
                <span className="font-bold text-slate-800 uppercase">{user.plan || 'Free'} Tier</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Cloud Database Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Synced Locally + Cloud Ready
                </span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={onLogout}
                className="flex-1 py-2.5 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold transition"
              >
                Log Out
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenDbGuide();
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5" />
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

            {/* Cloud Database helper notice */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-slate-400" />
                Cloud Database Integration
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenDbGuide();
                }}
                className="text-red-700 font-bold hover:underline"
              >
                Learn How to Connect Supabase
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
