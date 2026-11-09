import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, User, Palette, Moon, Sun, Key, Sparkles, 
  Users, Shield, Check, AlertCircle, Save, Train, Eye, ArrowRight,
  Printer, Camera, RefreshCw, X, CheckCircle2, Lock, ChevronRight, Play,
  Monitor, Volume2, Zap, Sliders, EyeOff
} from 'lucide-react';
import { VFX_MASTER_CATALOG } from './vfx/VfxMasterDirector';
import { StudentProfileSection } from './StudentProfileSection';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { updateCloudPassword, saveCloudStudent, fetchCloudStudents } from '../services/supabaseClient';

export const TEXT_COLOR_OPTIONS = [
  { id: 'black', name: 'Pitch Black', hex: '#000000', class: 'text-black', border: 'border-slate-500' },
  { id: 'white', name: 'Pure White', hex: '#ffffff', class: 'text-white', border: 'border-white' },
  { id: 'red', name: 'Primary Red', hex: '#dc2626', class: 'text-red-600', border: 'border-red-600' },
  { id: 'blue', name: 'Primary Blue', hex: '#2563eb', class: 'text-blue-600', border: 'border-blue-600' },
  { id: 'yellow', name: 'Primary Yellow', hex: '#eab308', class: 'text-yellow-500', border: 'border-yellow-500' },
  { id: 'green', name: 'Primary Green', hex: '#16a34a', class: 'text-green-600', border: 'border-green-600' },
  { id: 'orange', name: 'Primary Orange', hex: '#ea580c', class: 'text-orange-600', border: 'border-orange-600' },
  { id: 'purple', name: 'Primary Purple', hex: '#9333ea', class: 'text-purple-600', border: 'border-purple-600' },
  { id: 'cyan', name: 'Electric Cyan', hex: '#06b6d4', class: 'text-cyan-500', border: 'border-cyan-500' },
  { id: 'gold', name: 'DAV Gold', hex: '#f59e0b', class: 'text-amber-500', border: 'border-amber-500' }
];

export function applyPortalTheme(colorId, themeMode) {
  const root = document.documentElement;
  const colorObj = TEXT_COLOR_OPTIONS.find(c => c.id === colorId) || TEXT_COLOR_OPTIONS[9];
  root.style.setProperty('--portal-text-accent', colorObj.hex);
  root.setAttribute('data-accent-color', colorId);

  let styleEl = document.getElementById('dav-dynamic-accent-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dav-dynamic-accent-style';
    document.head.appendChild(styleEl);
  }

  const isBlack = colorId === 'black';
  const textShadowRule = isBlack 
    ? 'text-shadow: 0 0 2px rgba(255, 255, 255, 0.7) !important;' 
    : '';

  styleEl.innerHTML = `
    h1, h2, h3, h4, h5, h6,
    .portal-accent-text,
    .text-accent,
    .text-amber-400, .text-amber-500, .text-amber-300, .text-amber-600,
    .text-cyan-400, .text-cyan-500, .text-cyan-300, .text-cyan-600,
    .text-yellow-400, .text-yellow-500 {
      color: ${colorObj.hex} !important;
      ${textShadowRule}
    }
    .border-amber-400, .border-amber-500, .border-amber-300,
    .border-cyan-400, .border-cyan-500 {
      border-color: ${colorObj.hex} !important;
    }
  `;

  root.classList.remove('light-theme', 'white-theme', 'system-theme', 'dark');

  if (themeMode === 'white') {
    root.classList.add('light-theme', 'white-theme');
    root.setAttribute('data-theme', 'white');
  } else if (themeMode === 'dark' || themeMode === 'moon') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    // 'system': Classic original portal theme
    root.classList.add('system-theme');
    root.setAttribute('data-theme', 'system');
  }

  try {
    localStorage.setItem('dav_text_color', colorId);
    localStorage.setItem('dav_theme_mode', themeMode);
    window.dispatchEvent(new CustomEvent('dav_theme_changed', { 
      detail: { color: colorId, hex: colorObj.hex, theme: themeMode } 
    }));
  } catch (e) {}
}

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

  // Apply theme and color globally whenever changed
  useEffect(() => {
    applyPortalTheme(selectedColor, themeMode);
  }, [selectedColor, themeMode]);

  // 3. Change ID & Password Form State
  const [newStudentId, setNewStudentId] = useState(user?.id || user?.studentId || '');
  const [newPassword, setNewPassword] = useState(user?.password || '');
  // 5. Additional Campus Study Preferences
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try { return localStorage.getItem('dav_sound_enabled') !== 'false'; } catch (e) { return true; }
  });
  const [batterySaver, setBatterySaver] = useState(() => {
    try { return localStorage.getItem('dav_battery_saver') === 'true'; } catch (e) { return false; }
  });
  const [warmShield, setWarmShield] = useState(() => {
    try { return localStorage.getItem('dav_warm_shield') === 'true'; } catch (e) { return false; }
  });
  const [focusMode, setFocusMode] = useState(() => {
    try { return localStorage.getItem('dav_focus_mode') === 'true'; } catch (e) { return false; }
  });

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try { localStorage.setItem('dav_sound_enabled', String(next)); } catch (e) {}
  };
  const toggleBatterySaver = () => {
    const next = !batterySaver;
    setBatterySaver(next);
    try { localStorage.setItem('dav_battery_saver', String(next)); } catch (e) {}
  };
  const toggleWarmShield = () => {
    const next = !warmShield;
    setWarmShield(next);
    try { localStorage.setItem('dav_warm_shield', String(next)); } catch (e) {}
    if (next) {
      document.documentElement.classList.add('dav-warm-shield');
    } else {
      document.documentElement.classList.remove('dav-warm-shield');
    }
  };
  const toggleFocusMode = () => {
    const next = !focusMode;
    setFocusMode(next);
    try { localStorage.setItem('dav_focus_mode', String(next)); } catch (e) {}
  };

  const [idChangeStatus, setIdChangeStatus] = useState({ type: '', message: '' });

  // 4. Animation Studio State: 15 Sections Mapping
  const [sectionVfxMap, setSectionVfxMap] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_section_vfx_map');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      1: 'clean_none', 2: 'clean_none', 3: 'clean_none', 4: 'clean_none', 5: 'clean_none',
      6: 'clean_none', 7: 'clean_none', 8: 'clean_none', 9: 'clean_none', 10: 'clean_none',
      11: 'clean_none', 12: 'clean_none', 13: 'clean_none', 14: 'clean_none', 15: 'clean_none'
    };
  });

  // Live Split Studio State
  const [editingSection, setEditingSection] = useState(null); // 1 to 15 when edit tab is open
  const [previewVfxId, setPreviewVfxId] = useState('clean_none');
  const [vfxSavedSuccess, setVfxSavedSuccess] = useState(false);

  // When opening a section in studio, set preview to current assignment
  const handleOpenStudio = (secNum) => {
    setEditingSection(secNum);
    setPreviewVfxId(sectionVfxMap[secNum] || 'clean_none');
  };

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

  // Handle Save Section Animations to Local & Cloud
  const handleSaveVfxMap = () => {
    try {
      const updated = { ...sectionVfxMap, [editingSection]: previewVfxId };
      setSectionVfxMap(updated);
      localStorage.setItem('dav_section_vfx_map', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('dav_vfx_map_updated', { detail: updated }));
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
      setParentError(`Plan Limit: Your ${planTier.toUpperCase()} pass allows up to ${parentQuota} parent account(s). Upgrade for more.`);
      return;
    }

    const pId = parentInputId.trim();
    const pPass = parentInputPassword.trim();

    if (!pId) {
      setParentError('Parent ID cannot be empty.');
      return;
    }
    if (!pPass) {
      setParentError('Password cannot be empty.');
      return;
    }

    const allUsers = getRegisteredUsers();
    const isTakenLocally = allUsers.some(u => (u.id || '').toLowerCase() === pId.toLowerCase());
    if (isTakenLocally) {
      setParentError('ID is invalid and is used by someone');
      return;
    }

    // Check cloud uniqueness
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

  // Preview component helper for the live studio
  const currentPreviewVfx = VFX_MASTER_CATALOG.find(a => a.id === previewVfxId) || VFX_MASTER_CATALOG[0];
  const ActiveVfxComponent = currentPreviewVfx.component;

  return (
    <div className="relative min-h-[100dvh] bg-slate-950 text-slate-100 flex flex-col pb-20 select-none font-sans overflow-x-hidden">
      {/* Clean Header for Settings Hub without overlapping full-page canvas */}
      <div className="relative w-full py-8 px-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-amber-500/20 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
              <SettingsIcon className="w-4 h-4 text-amber-400" />
              <span>Student Command &amp; Personalization Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 drop-shadow-sm">
              DAV Smart Settings &amp; Student Command Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
              Customize typography colors, global themes, animation suites, and parental credentials.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 self-start md:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Live Settings Active</span>
          </div>
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
            {/* Setting 2: Text Color Picker (10 Colors - Applies Globally) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Select Text Accent Color</h3>
                  <p className="text-xs text-slate-400">Choose from 10 high-contrast typography shades (Applies Globally)</p>
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
                        {isSelected && <Check className={`w-3.5 h-3.5 stroke-[3] ${c.id === 'black' ? 'text-white' : 'text-stone-950'}`} />}
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

            {/* Setting 3: Theme Mode (System, White, Dark) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Theme Mode (3 Options)</h3>
                  <p className="text-xs text-slate-400">Choose between System Default, Pure White, or Obsidian Dark</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* 1. System Theme */}
                <button
                  type="button"
                  onClick={() => setThemeMode('system')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                    themeMode === 'system'
                      ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Monitor className="w-5 h-5 text-amber-400" />
                    {themeMode === 'system' && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">System Theme</h4>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      Classic DAV Portal original layout with balanced slate aesthetic.
                    </p>
                  </div>
                </button>

                {/* 2. Pure White Theme */}
                <button
                  type="button"
                  onClick={() => setThemeMode('white')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                    themeMode === 'white'
                      ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sun className="w-5 h-5 text-amber-400" />
                    {themeMode === 'white' && <Check className="w-4 h-4 text-amber-400 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Pure White Theme</h4>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      Daylight pure white backgrounds, crisp white cards and dark text.
                    </p>
                  </div>
                </button>

                {/* 3. Obsidian Dark Theme */}
                <button
                  type="button"
                  onClick={() => setThemeMode('dark')}
                  className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-3 cursor-pointer ${
                    themeMode === 'dark' || themeMode === 'moon'
                      ? 'border-cyan-400 bg-cyan-500/15 ring-2 ring-cyan-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Moon className="w-5 h-5 text-cyan-400" />
                    {(themeMode === 'dark' || themeMode === 'moon') && <Check className="w-4 h-4 text-cyan-400 stroke-[3]" />}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Obsidian Dark</h4>
                    <p className="text-[10px] text-slate-400 leading-tight mt-0.5">
                      Deep space dark immersion with black obsidian backgrounds everywhere.
                    </p>
                  </div>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 italic">
                Active theme transforms the entire portal instantly and stays saved across sessions.
              </p>
            </div>

            {/* Setting 3.5: Campus Study Preferences & Accessibility */}
            <div className="md:col-span-2 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">Campus Study Preferences &amp; Smart Controls</h3>
                  <p className="text-xs text-slate-400">Fine-tune your reading comfort, sound effects, battery usage, and study focus</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                {/* 1. Audio Effects */}
                <div 
                  onClick={toggleSound}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                    soundEnabled ? 'border-amber-400/60 bg-amber-500/10' : 'border-slate-800 bg-slate-950/60 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Volume2 className={`w-5 h-5 ${soundEnabled ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      soundEnabled ? 'bg-amber-400 text-stone-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {soundEnabled ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Sound Effects</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Button haptics, celebration fanfare &amp; page chimes</p>
                  </div>
                </div>

                {/* 2. Battery & Performance Saver */}
                <div 
                  onClick={toggleBatterySaver}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                    batterySaver ? 'border-emerald-400/60 bg-emerald-500/10' : 'border-slate-800 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Zap className={`w-5 h-5 ${batterySaver ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      batterySaver ? 'bg-emerald-400 text-stone-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {batterySaver ? '60 FPS LOCKED' : 'STANDARD'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Performance Mode</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Optimize graphics and preserve battery on mobile</p>
                  </div>
                </div>

                {/* 3. Night Study Warm Shield */}
                <div 
                  onClick={toggleWarmShield}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                    warmShield ? 'border-orange-400/60 bg-orange-500/10' : 'border-slate-800 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Sun className={`w-5 h-5 ${warmShield ? 'text-orange-400' : 'text-slate-500'}`} />
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      warmShield ? 'bg-orange-400 text-stone-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {warmShield ? 'WARM 2700K' : 'OFF'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Night Study Shield</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Reduces blue light during late-night exam prep</p>
                  </div>
                </div>

                {/* 4. Study Focus Mode */}
                <div 
                  onClick={toggleFocusMode}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                    focusMode ? 'border-cyan-400/60 bg-cyan-500/10' : 'border-slate-800 bg-slate-950/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Eye className={`w-5 h-5 ${focusMode ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      focusMode ? 'bg-cyan-400 text-stone-950' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {focusMode ? 'FOCUSED' : 'STANDARD'}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white">Study Focus Mode</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Minimizes distractions and cleans textbook reading view</p>
                  </div>
                </div>
              </div>
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

        {/* TAB 2: FULL RESTORED STUDENT PROFILE & ID CARD */}
        {activeTab === 'student_id' && (
          <div className="w-full animate-fadeIn">
            <StudentProfileSection user={user} onLogout={onLogout} />
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
                  Click Customize VFX on any section to open the Live Real-Time Studio!
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
                      onClick={() => handleOpenStudio(secNum)}
                      className="w-full py-1.5 px-3 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-slate-200 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Customize VFX</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* FULL-SCREEN LIVE SPLIT-SCREEN VFX STUDIO */}
            {editingSection !== null && (
              <div className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col md:flex-row overflow-hidden animate-fadeIn">
                {/* LEFT COLUMN: VFX SELECTOR PALETTE */}
                <div className="w-full md:w-96 bg-slate-900 border-r border-slate-800 flex flex-col h-full z-20 shadow-2xl shrink-0">
                  {/* Studio Left Header */}
                  <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-amber-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Section {editingSection} Live Studio</span>
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Click any VFX to apply it live instantly!
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Scrollable list of 16 animations */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {VFX_MASTER_CATALOG.map((anim) => {
                      const isCurrent = previewVfxId === anim.id;
                      const Icon = anim.icon || Sparkles;

                      return (
                        <div
                          key={anim.id}
                          onClick={() => setPreviewVfxId(anim.id)}
                          className={`p-3 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                            isCurrent
                              ? 'border-amber-400 bg-amber-500/15 ring-2 ring-amber-400 shadow-md'
                              : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${anim.color} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="overflow-hidden">
                              <span className="text-xs font-black text-white truncate block">
                                {anim.title}
                              </span>
                              <span className="text-[10px] text-slate-400 line-clamp-1">
                                {anim.subtitle}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isCurrent && (
                              <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Left Footer Action Buttons */}
                  <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
                    <button
                      type="button"
                      onClick={handleSaveVfxMap}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:brightness-110 active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Animation to Cloud &amp; Local</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSection(null)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                    >
                      Exit Preview
                    </button>
                  </div>
                </div>

                {/* RIGHT AREA: LIVE REAL-TIME SECTION PREVIEW */}
                <div className="flex-1 relative overflow-y-auto bg-slate-950 flex flex-col items-center justify-start p-6 sm:p-12">
                  {/* Live VFX Background Running at 60 FPS */}
                  {ActiveVfxComponent && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <ActiveVfxComponent />
                    </div>
                  )}

                  {/* Section Content Preview Card */}
                  <div className="relative z-10 max-w-3xl w-full bg-slate-950/75 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-none space-y-6 animate-fadeIn text-white">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/90 px-2.5 py-0.5 rounded-full border border-amber-700">
                          Live Section {editingSection} Preview
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                          {editingSection === 2 ? 'Section 2: DAV Library & Master Reference' : `Section ${editingSection} Campus Portal`}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Live Preview Active</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      This is a live interactive simulation of Section {editingSection}. The background animation you select on the left is running live right now. Click any animation to see how it looks behind your section content!
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Selected VFX</span>
                        <span className="text-sm font-black text-amber-300">{currentPreviewVfx.title}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Status</span>
                        <span className="text-sm font-black text-emerald-400">Rendering 60 FPS</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono block">Persistence</span>
                        <span className="text-sm font-black text-cyan-400">Cloud Sync Ready</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                      <span className="text-xs text-amber-200">Like this look? Click Save on the bottom left!</span>
                      <button
                        type="button"
                        onClick={handleSaveVfxMap}
                        className="py-1.5 px-4 rounded-xl bg-amber-500 text-stone-950 font-black text-xs cursor-pointer shadow-md hover:bg-amber-400"
                      >
                        Save This Animation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PARENTAL ACCESS MANAGER */}
        {activeTab === 'parental_access' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Parental Access Management (Dimension 8)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Provision dedicated parent accounts linked to your student credentials.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Parent Accounts: {parentAccounts.length} / {parentQuota}
                </span>
              </div>
            </div>

            {/* Quota Rules Information Banner */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <Shield className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white">Tier Quotas: </span>
                <span>Normal Plan: 1 Parent • VIP: 2 Parents • Double VIP: 3 Parents.</span>
                <span className="text-amber-400 font-mono ml-2">Your tier: {planTier.toUpperCase()} ({parentQuota} allowed).</span>
              </div>
            </div>

            {/* Error / Success Feedback */}
            {parentError && (
              <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{parentError}</span>
              </div>
            )}

            {parentSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{parentSuccess}</span>
              </div>
            )}

            {/* Account Creation Form */}
            {parentAccounts.length < parentQuota && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <h4 className="text-sm font-black text-white">Generate New Dimension 8 Parent Credentials</h4>

                <form onSubmit={handleCreateParentAccount} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Parent ID / Username (Unique)
                    </label>
                    <input
                      type="text"
                      value={parentInputId}
                      onChange={(e) => setParentInputId(e.target.value)}
                      placeholder="e.g. parent_01"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Must be unique across the entire school system.
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
                    />
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Password can be chosen freely.
                    </span>
                  </div>

                  <div className="sm:col-span-2 flex justify-end pt-2">
                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xs hover:brightness-110 transition cursor-pointer shadow-lg active:scale-95 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Dimension 8 Parent</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of Created Parent Accounts */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-black text-white">
                Active Linked Parent Accounts ({parentAccounts.length})
              </h4>

              {parentAccounts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs italic">
                  No parent accounts created yet. Use the form above to provision your parent credentials.
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {parentAccounts.map((acc, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 flex items-center justify-center font-bold text-xs">
                          P{idx + 1}
                        </div>
                        <div>
                          <span className="text-xs font-black text-white block">{acc.name}</span>
                          <span className="text-[11px] font-mono text-cyan-400">ID: {acc.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-slate-400">Password: <strong className="text-white">{acc.password}</strong></span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                          Dimension 8 Active
                        </span>
                      </div>
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

export default SettingsHubSection;
