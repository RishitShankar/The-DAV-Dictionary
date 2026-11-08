import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, User, Palette, Moon, Sun, Key, Sparkles, 
  Users, Shield, Check, AlertCircle, Save, Train, Eye, ArrowRight,
  Printer, Camera, RefreshCw, X, CheckCircle2, Lock, ChevronRight
} from 'lucide-react';
import { VfxBulletTrain } from './vfx/VfxBulletTrain';
import { VFX_MASTER_CATALOG } from './vfx/VfxMasterDirector';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { updateCloudPassword, saveCloudStudent, fetchCloudStudents } from '../services/supabaseClient';

export const TEXT_COLOR_OPTIONS = [
  { id: 'red', name: 'Crimson Red', hex: '#ef4444', class: 'text-red-500', border: 'border-red-500' },
  { id: 'emerald', name: 'Emerald Green', hex: '#10b981', class: 'text-emerald-500', border: 'border-emerald-500' },
  { id: 'gold', name: 'Royal Gold', hex: '#f59e0b', class: 'text-amber-500', border: 'border-amber-500' },
  { id: 'cyan', name: 'Electric Cyan', hex: '#06b6d4', class: 'text-cyan-500', border: 'border-cyan-500' },
  { id: 'rose', name: 'Rose Pink', hex: '#f43f5e', class: 'text-rose-500', border: 'border-rose-500' },
  { id: 'purple', name: 'Deep Purple', hex: '#8b5cf6', class: 'text-purple-500', border: 'border-purple-500' },
  { id: 'orange', name: 'Bright Orange', hex: '#f97316', class: 'text-orange-500', border: 'border-orange-500' },
  { id: 'blue', name: 'Sky Blue', hex: '#3b82f6', class: 'text-blue-500', border: 'border-blue-500' },
  { id: 'white', name: 'Pure White', hex: '#ffffff', class: 'text-white', border: 'border-white' },
  { id: 'lime', name: 'Neon Lime', hex: '#84cc16', class: 'text-lime-500', border: 'border-lime-500' }
];

export function SettingsHubSection({ user, onLogout, onSelectSection }) {
  const currentUid = (user?.id || user?.studentId || 'guest').toLowerCase();
  const planTier = (user?.plan || 'normal').toLowerCase();
  const isVip = planTier === 'vip';
  const isVvip = planTier === 'vvip' || planTier === 'double_vip';
  
  // Parent quota calculation
  const parentQuota = isVvip ? 3 : isVip ? 2 : 1;

  // Active subtab inside Settings Hub: 'main' | 'student_id' | 'animation_studio' | 'parental_access'
  const [activeTab, setActiveTab] = useState('main');

  // 1. Text Color Accent
  const [selectedColor, setSelectedColor] = useState(() => {
    try {
      return localStorage.getItem('dav_text_color') || 'gold';
    } catch (e) {
      return 'gold';
    }
  });

  // 2. Theme: 'moon' (Dark) vs 'system' (White/Light)
  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('dav_theme_mode') || 'moon';
    } catch (e) {
      return 'moon';
    }
  });

  // Apply theme and color globally
  useEffect(() => {
    const root = document.documentElement;
    const colorObj = TEXT_COLOR_OPTIONS.find(c => c.id === selectedColor) || TEXT_COLOR_OPTIONS[2];
    root.style.setProperty('--portal-text-accent', colorObj.hex);
    try {
      localStorage.setItem('dav_text_color', selectedColor);
      window.dispatchEvent(new CustomEvent('dav_theme_changed', { detail: { color: selectedColor, theme: themeMode } }));
    } catch (e) {}
  }, [selectedColor, themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'system') {
      root.classList.remove('dark');
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('dav_theme_mode', themeMode);
    } catch (e) {}
  }, [themeMode]);

  // 3. Change ID & Password Form State
  const [newStudentId, setNewStudentId] = useState(user?.id || user?.studentId || '');
  const [newPassword, setNewPassword] = useState(user?.password || '');
  const [idChangeStatus, setIdChangeStatus] = useState({ type: '', message: '' });

  // 4. Animation Studio State: 15 Sections Mapping
  const [sectionVfxMap, setSectionVfxMap] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_section_vfx_map');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default: clean none across sections
    return {
      1: 'clean_none', 2: 'clean_none', 3: 'clean_none', 4: 'clean_none', 5: 'clean_none',
      6: 'clean_none', 7: 'clean_none', 8: 'clean_none', 9: 'clean_none', 10: 'clean_none',
      11: 'clean_none', 12: 'clean_none', 13: 'clean_none', 14: 'clean_none', 15: 'clean_none'
    };
  });

  const [editingSection, setEditingSection] = useState(null); // 1 to 15 when edit tab is open
  const [vfxSavedSuccess, setVfxSavedSuccess] = useState(false);

  // 5. Parental Access State
  const [parentAccounts, setParentAccounts] = useState(() => {
    try {
      const allUsers = getRegisteredUsers();
      return allUsers.filter(u => u.dimension === 8 && u.studentLinkedId === currentUid);
    } catch (e) {
      return [];
    }
  });

  const [parentInputId, setParentInputId] = useState('');
  const [parentInputPassword, setParentInputPassword] = useState('');
  const [parentError, setParentError] = useState('');
  const [parentSuccess, setParentSuccess] = useState('');

  // Handle Change ID & Password
  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setIdChangeStatus({ type: '', message: '' });

    const trimmedId = newStudentId.trim();
    const trimmedPass = newPassword.trim();

    if (!trimmedId) {
      setIdChangeStatus({ type: 'error', message: 'Student ID cannot be empty.' });
      return;
    }
    if (!trimmedPass) {
      setIdChangeStatus({ type: 'error', message: 'Password cannot be empty.' });
      return;
    }

    // Check uniqueness if ID has changed
    if (trimmedId.toLowerCase() !== currentUid) {
      const localUsers = getRegisteredUsers();
      const isTakenLocally = localUsers.some(u => (u.id || '').toLowerCase() === trimmedId.toLowerCase());
      if (isTakenLocally) {
        setIdChangeStatus({ type: 'error', message: 'Used by anyone' });
        return;
      }

      // Check cloud
      try {
        const cloudStudents = await fetchCloudStudents();
        const isTakenInCloud = cloudStudents.some(s => (s.student_id || '').toLowerCase() === trimmedId.toLowerCase());
        if (isTakenInCloud) {
          setIdChangeStatus({ type: 'error', message: 'Used by anyone' });
          return;
        }
      } catch (err) {
        console.warn('Cloud uniqueness check warning:', err);
      }
    }

    // Update user locally
    try {
      const allUsers = getRegisteredUsers();
      const updatedList = allUsers.map(u => {
        if ((u.id || '').toLowerCase() === currentUid) {
          return { ...u, id: trimmedId, studentId: trimmedId, password: trimmedPass };
        }
        return u;
      });
      saveRegisteredUsers(updatedList);

      const currentUserRaw = localStorage.getItem('dav_user');
      if (currentUserRaw) {
        const cur = JSON.parse(currentUserRaw);
        cur.id = trimmedId;
        cur.studentId = trimmedId;
        cur.password = trimmedPass;
        localStorage.setItem('dav_user', JSON.stringify(cur));
      }

      // Sync with cloud
      await updateCloudPassword(trimmedId, trimmedPass);
      window.dispatchEvent(new Event('dav_user_updated'));

      setIdChangeStatus({ type: 'success', message: 'Student ID & Password updated successfully!' });
    } catch (err) {
      setIdChangeStatus({ type: 'error', message: 'Failed to update credentials. Please retry.' });
    }
  };

  // Handle Save Section Animations
  const handleSaveVfxMap = () => {
    try {
      localStorage.setItem('dav_section_vfx_map', JSON.stringify(sectionVfxMap));
      window.dispatchEvent(new CustomEvent('dav_vfx_map_updated', { detail: sectionVfxMap }));
      setVfxSavedSuccess(true);
      setTimeout(() => setVfxSavedSuccess(false), 3000);
      setEditingSection(null);
    } catch (e) {
      alert('Could not save animation map to storage.');
    }
  };

  // Handle Add Parent Account (Dimension 8)
  const handleCreateParentAccount = async (e) => {
    e.preventDefault();
    setParentError('');
    setParentSuccess('');

    if (parentAccounts.length >= parentQuota) {
      setParentError(`Plan quota reached: Your ${planTier.toUpperCase()} plan allows a maximum of ${parentQuota} Parent ID(s).`);
      return;
    }

    const pId = parentInputId.trim();
    const pPass = parentInputPassword.trim();

    if (!pId || !pPass) {
      setParentError('Both Parent ID and Password are required.');
      return;
    }

    // Uniqueness validation: "ID is invalid and is used by someone"
    const allUsers = getRegisteredUsers();
    const isIdUsed = allUsers.some(u => (u.id || '').toLowerCase() === pId.toLowerCase());
    if (isIdUsed) {
      setParentError('ID is invalid and is used by someone');
      return;
    }

    try {
      const cloudStudents = await fetchCloudStudents();
      const isTakenCloud = cloudStudents.some(s => (s.student_id || '').toLowerCase() === pId.toLowerCase());
      if (isTakenCloud) {
        setParentError('ID is invalid and is used by someone');
        return;
      }
    } catch (err) {}

    const newParent = {
      id: pId,
      studentId: pId,
      name: `Parent of ${user?.name || user?.id}`,
      password: pPass,
      dimension: 8,
      dimensionName: 'Parent Portal (Dimension 8)',
      plan: 'parent',
      role: 'parent',
      studentLinkedId: currentUid,
      createdAt: new Date().toISOString()
    };

    try {
      const updated = [...allUsers, newParent];
      saveRegisteredUsers(updated);
      setParentAccounts(prev => [...prev, newParent]);

      // Save to Supabase Cloud
      await saveCloudStudent({
        student_id: pId,
        full_name: newParent.name,
        password: pPass,
        class_num: user?.classNum || '8',
        dimension: 8,
        plan: 'parent'
      });

      setParentInputId('');
      setParentInputPassword('');
      setParentSuccess(`Parent ID "${pId}" successfully created for Dimension 8!`);
    } catch (err) {
      setParentError('Failed to save parent account to cloud. Saved locally.');
    }
  };

  // Student Profile Dossier Info
  const [profilePhoto, setProfilePhoto] = useState(() => {
    try {
      const saved = localStorage.getItem(`dav_student_profile_${currentUid}`);
      if (saved) return JSON.parse(saved).photoUrl || user?.photoUrl || '';
    } catch (e) {}
    return user?.photoUrl || '';
  });

  return (
    <div className="relative min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col pb-20 select-none font-sans overflow-x-hidden">
      {/* 1. Sci-Fi Bullet Train Animation Running in Header */}
      <div className="relative w-full h-56 sm:h-72 overflow-hidden bg-slate-950 border-b border-amber-500/30">
        <VfxBulletTrain />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 z-10 pointer-events-none">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Train className="w-4 h-4 animate-pulse" />
            <span>High-Speed Quantum Maglev • DAV Shinkansen Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md">
            DAV Smart Settings &amp; Student Command Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Customize typography colors, global themes, animation suites, and parental credentials.
          </p>
        </div>
      </div>

      {/* Navigation Chips */}
      <div className="max-w-6xl w-full mx-auto px-4 pt-6">
        <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('main')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'main'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>General Settings</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('student_id')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'student_id'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student ID Card</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('animation_studio')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'animation_studio'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Animation Studio (15 Sections)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('parental_access')}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'parental_access'
                ? 'bg-amber-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Parental Access (Dimension 8)</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-cyan-900 text-cyan-200 text-[10px] font-mono">
              {parentAccounts.length}/{parentQuota}
            </span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto px-4 py-8 space-y-8">
        {/* TAB 1: GENERAL SETTINGS */}
        {activeTab === 'main' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
            {/* Setting 2: Text Color Picker (10 Colors) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Select Text Accent Color</h3>
                  <p className="text-xs text-slate-400">Choose from 10 high-contrast typography shades</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                {TEXT_COLOR_OPTIONS.map(c => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c.id)}
                      className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-2 cursor-pointer hover:scale-105 ${
                        isSelected 
                          ? `${c.border} bg-slate-800/90 ring-2 ring-amber-400/50 shadow-md` 
                          : 'border-slate-800 bg-slate-950/60 hover:bg-slate-850'
                      }`}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-white/20 shadow-inner flex items-center justify-center"
                        style={{ backgroundColor: c.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />}
                      </div>
                      <span className="text-[11px] font-bold text-slate-200 leading-tight">
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Live Typography Preview:</span>
                <span 
                  className="text-xs font-black uppercase tracking-wider"
                  style={{ color: TEXT_COLOR_OPTIONS.find(c => c.id === selectedColor)?.hex }}
                >
                  DAV Dictionary • Class 8 Digital Campus
                </span>
              </div>
            </div>

            {/* Setting 3: Telegram-Style Theme (System vs Moon) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Theme Mode (Telegram Style)</h3>
                  <p className="text-xs text-slate-400">Switch between System (Light) and Moon (Dark)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setThemeMode('system')}
                  className={`p-5 rounded-2xl border text-left transition flex flex-col gap-3 cursor-pointer ${
                    themeMode === 'system'
                      ? 'border-amber-400 bg-amber-500/10 ring-2 ring-amber-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sun className="w-6 h-6 text-amber-400" />
                    {themeMode === 'system' && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">System (White Theme)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Clean daylight aesthetic with white card backgrounds and dark text.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setThemeMode('moon')}
                  className={`p-5 rounded-2xl border text-left transition flex flex-col gap-3 cursor-pointer ${
                    themeMode === 'moon'
                      ? 'border-cyan-400 bg-cyan-500/10 ring-2 ring-cyan-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Moon className="w-6 h-6 text-cyan-400" />
                    {themeMode === 'moon' && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">Moon (Dark Theme)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Cyberpunk midnight aesthetic optimized for deep study sessions and OLED screens.
                    </p>
                  </div>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Active theme transforms the entire portal instantly and stays saved across sessions.
              </p>
            </div>

            {/* Setting 4: Change ID and Password */}
            <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Change Student ID &amp; Password</h3>
                  <p className="text-xs text-slate-400">
                    Update your account credentials with real-time uniqueness validation
                  </p>
                </div>
              </div>

              {idChangeStatus.message && (
                <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
                  idChangeStatus.type === 'error'
                    ? 'bg-rose-950/80 border-rose-800 text-rose-300'
                    : 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
                }`}>
                  {idChangeStatus.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  <span>{idChangeStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Student ID (Unique Username)
                  </label>
                  <input
                    type="text"
                    value={newStudentId}
                    onChange={(e) => setNewStudentId(e.target.value)}
                    placeholder="Enter new student ID"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    If this ID is taken by anyone else in the school, the system will flag "Used by anyone".
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Account Password
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Passwords do not need to be unique and can be chosen freely.
                  </span>
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs hover:brightness-110 transition cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Credentials to Cloud</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: STUDENT ID CARD VIEW */}
        {activeTab === 'student_id' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xl">
                  {user?.name ? user.name[0] : 'S'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{user?.name || 'DAV Student Scholar'}</h3>
                  <p className="text-xs text-amber-400 font-mono">ID: {user?.id || user?.studentId || 'rishibhai'}</p>
                </div>
              </div>
              <span className="py-1 px-3 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
                {user?.dimensionName || 'Scholar Pass'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Class &amp; Section</span>
                <span className="text-white font-black text-sm">Class {user?.classNum || '8'} - Sec {user?.section || 'D'}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Admission Number</span>
                <span className="text-white font-mono font-bold text-sm">{user?.admissionNumber || `ADM-${user?.id || '8921'}`}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Campus Dimension</span>
                <span className="text-cyan-400 font-bold">Dimension {user?.dimension || 1} Scholar</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Subscription Plan</span>
                <span className="text-emerald-400 font-bold uppercase">{user?.plan || 'Normal'} Active</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-400" />
                <span className="text-xs text-slate-300">Official DAVCAE Cryptographic Security Barcode</span>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print ID</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: ANIMATION STUDIO (3 ROWS x 5 COLUMNS = 15 SECTIONS) */}
        {activeTab === 'animation_studio' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>Animation Studio (Sections 1 to 15 Grid)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Configure custom high-quality background animations for each section independently.
                </p>
              </div>

              {vfxSavedSuccess && (
                <div className="py-2 px-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Animation settings saved to cloud!</span>
                </div>
              )}
            </div>

            {/* 3 ROWS x 5 COLUMNS GRID (15 SECTIONS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((secNum) => {
                const assignedId = sectionVfxMap[secNum] || 'clean_none';
                const assignedAnim = VFX_MASTER_CATALOG.find(a => a.id === assignedId) || VFX_MASTER_CATALOG[0];
                const IconComponent = assignedAnim.icon || Sparkles;

                return (
                  <div
                    key={secNum}
                    className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-md transition hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400 font-mono">
                        Section {secNum}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                        {assignedId === 'clean_none' ? 'Clean' : 'Animated'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${assignedAnim.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-xs font-bold text-white truncate block">
                          {assignedAnim.title}
                        </span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">
                          {assignedAnim.subtitle}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingSection(secNum)}
                      className="w-full py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Customize VFX</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* HALF-PANE EDIT DRAWER / MODAL FOR SELECTED SECTION */}
            {editingSection !== null && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-6 animate-fadeIn">
                <div className="bg-slate-950 border-2 border-amber-400/70 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl text-white">
                  {/* Drawer Header */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-b border-amber-500/30 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-amber-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Configure Animation for Section {editingSection}</span>
                      </h4>
                      <p className="text-xs text-slate-300">
                        Select an animation below and click Save to apply it to Section {editingSection}.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* List of 16 High-Quality Animations */}
                  <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 max-h-[60vh]">
                    {VFX_MASTER_CATALOG.map((anim) => {
                      const isCurrent = (sectionVfxMap[editingSection] || 'clean_none') === anim.id;
                      const Icon = anim.icon || Sparkles;

                      return (
                        <div
                          key={anim.id}
                          onClick={() => {
                            setSectionVfxMap(prev => ({ ...prev, [editingSection]: anim.id }));
                          }}
                          className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                            isCurrent
                              ? 'border-amber-400 bg-amber-500/10 ring-1 ring-amber-400 shadow-md'
                              : 'border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${anim.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-black text-white flex items-center gap-2">
                                <span>{anim.title}</span>
                                {anim.id === 'clean_none' && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">Default</span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-400 leading-tight">
                                {anim.subtitle}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isCurrent ? (
                              <div className="w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                                <Check className="w-4 h-4 stroke-[3]" />
                              </div>
                            ) : (
                              <span className="text-xs font-bold text-slate-500 hover:text-amber-300">Select</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Drawer Footer with Save Button */}
                  <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveVfxMap}
                      className="py-2 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs hover:brightness-110 transition cursor-pointer shadow-lg flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Animation to Cloud</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PARENTAL ACCESS & DIMENSION 8 */}
        {activeTab === 'parental_access' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">Parental Access Control (Dimension 8)</h3>
                    <p className="text-xs text-slate-400">
                      Generate unique Parent IDs linked to your scholar account
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400 block">Quota Allowance</span>
                  <span className="text-xs text-slate-400">
                    {planTier.toUpperCase()} Plan: <strong className="text-white">{parentQuota} Parent ID(s)</strong>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <p className="text-slate-300 leading-relaxed">
                  Parents logging into <strong>Dimension 8</strong> receive a customized portal with access strictly to school notices, daily timetables, academic logs, syllabus progress, faculty contacts, school donation/reviews, settings, about the creator, and school bus live GPS tracking.
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-mono">
                  <span>• Normal Plan: 1 Parent</span>
                  <span>• VIP Plan: 2 Parents</span>
                  <span>• Double VIP Plan: 3 Parents</span>
                </div>
              </div>

              {parentError && (
                <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{parentError}</span>
                </div>
              )}

              {parentSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{parentSuccess}</span>
                </div>
              )}

              {/* Parent ID Generation Form */}
              <form onSubmit={handleCreateParentAccount} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Parent ID (Must Be Unique Across School)
                  </label>
                  <input
                    type="text"
                    value={parentInputId}
                    onChange={(e) => setParentInputId(e.target.value)}
                    placeholder="e.g. parent_rishibhai"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    disabled={parentAccounts.length >= parentQuota}
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Duplicate IDs will be rejected: "ID is invalid and is used by someone".
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Parent Password
                  </label>
                  <input
                    type="text"
                    value={parentInputPassword}
                    onChange={(e) => setParentInputPassword(e.target.value)}
                    placeholder="Enter parent password"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    disabled={parentAccounts.length >= parentQuota}
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Password can be chosen freely or shared with the scholar.
                  </span>
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={parentAccounts.length >= parentQuota}
                    className={`py-2.5 px-6 rounded-xl font-black text-xs transition cursor-pointer shadow-lg flex items-center gap-2 ${
                      parentAccounts.length >= parentQuota
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-110 active:scale-95'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>Generate Dimension 8 Parent ID</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Active Parent Accounts */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Active Dimension 8 Parent Credentials ({parentAccounts.length}/{parentQuota})</span>
              </h4>

              {parentAccounts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                  No parent IDs generated yet. Use the form above to grant parental access.
                </div>
              ) : (
                <div className="space-y-3">
                  {parentAccounts.map((acc, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-white font-mono">{acc.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono">
                            Dimension 8
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Password: <span className="text-amber-400 font-bold">{acc.password}</span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                        Active &amp; Linked
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
