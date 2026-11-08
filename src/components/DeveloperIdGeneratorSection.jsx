import React, { useState } from 'react';
import { 
  Key, Shield, Users, Bus, GraduationCap, CheckCircle2, 
  AlertCircle, Plus, Search, Download, Trash2, Edit3, ArrowRight, Save
} from 'lucide-react';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { saveCloudStudent, fetchCloudStudents, updateCloudPassword } from '../services/supabaseClient';
import { DAV_OFFICIAL_SCHOOLS } from './CleanBusTracker';

export function DeveloperIdGeneratorSection({ currentUser }) {
  // Tab: 'driver' | 'parent' | 'student' | 'teacher' | 'all_accounts'
  const [activeTab, setActiveTab] = useState('driver');
  const [registeredList, setRegisteredList] = useState(() => getRegisteredUsers());

  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Bus Driver Account (Dimension 7) State
  const [driverSchool, setDriverSchool] = useState(DAV_OFFICIAL_SCHOOLS[0].id);
  const [driverBusNum, setDriverBusNum] = useState(1);
  const [driverId, setDriverId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverPassword, setDriverPassword] = useState('dav123');

  // 2. Parent Account (Dimension 8) State
  const [parentLinkedStudentId, setParentLinkedStudentId] = useState('rishibhai');
  const [parentId, setParentId] = useState('');
  const [parentPassword, setParentPassword] = useState('davparent');

  // 3. Student Account State
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [studentSection, setStudentSection] = useState('D');
  const [studentPlan, setStudentPlan] = useState('vip');
  const [studentPassword, setStudentPassword] = useState('dav123');

  // Check ID uniqueness
  const isIdTaken = (id) => {
    return registeredList.some(u => (u.id || '').toLowerCase() === id.trim().toLowerCase());
  };

  // Generate Bus Driver (Dimension 7)
  const handleCreateDriver = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    const trimmedId = driverId.trim();
    if (!trimmedId) {
      setFeedback({ type: 'error', text: 'Driver ID is required.' });
      return;
    }
    if (isIdTaken(trimmedId)) {
      setFeedback({ type: 'error', text: 'Used by anyone: Driver ID already exists in system.' });
      return;
    }

    const schoolObj = DAV_OFFICIAL_SCHOOLS.find(s => s.id === driverSchool) || DAV_OFFICIAL_SCHOOLS[0];

    const newDriver = {
      id: trimmedId,
      studentId: trimmedId,
      name: driverName.trim() || `Driver of Bus #${driverBusNum}`,
      password: driverPassword.trim() || 'dav123',
      dimension: 7,
      dimensionName: 'Bus Driver (Dimension 7)',
      plan: 'bus_driver',
      role: 'bus_driver',
      isDriver: true,
      busNumber: Number(driverBusNum),
      schoolId: schoolObj.id,
      schoolName: schoolObj.name,
      phoneNumber: driverPhone.trim(),
      createdAt: new Date().toISOString()
    };

    const updated = [...registeredList, newDriver];
    saveRegisteredUsers(updated);
    setRegisteredList(updated);

    try {
      await saveCloudStudent({
        student_id: trimmedId,
        full_name: newDriver.name,
        password: newDriver.password,
        class_num: String(driverBusNum),
        dimension: 7,
        plan: 'bus_driver'
      });
    } catch (e) {}

    setFeedback({ type: 'success', text: `Dimension 7 Bus Driver Account "${trimmedId}" created successfully for Bus #${driverBusNum}!` });
    setDriverId('');
    setDriverName('');
    setDriverPhone('');
  };

  // Generate Parent Account (Dimension 8)
  const handleCreateParent = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    const trimmedId = parentId.trim();
    if (!trimmedId) {
      setFeedback({ type: 'error', text: 'Parent ID is required.' });
      return;
    }
    if (isIdTaken(trimmedId)) {
      setFeedback({ type: 'error', text: 'ID is invalid and is used by someone.' });
      return;
    }

    const newParent = {
      id: trimmedId,
      studentId: trimmedId,
      name: `Parent of ${parentLinkedStudentId}`,
      password: parentPassword.trim() || 'davparent',
      dimension: 8,
      dimensionName: 'Parent Portal (Dimension 8)',
      plan: 'parent',
      role: 'parent',
      studentLinkedId: parentLinkedStudentId.trim().toLowerCase(),
      createdAt: new Date().toISOString()
    };

    const updated = [...registeredList, newParent];
    saveRegisteredUsers(updated);
    setRegisteredList(updated);

    try {
      await saveCloudStudent({
        student_id: trimmedId,
        full_name: newParent.name,
        password: newParent.password,
        class_num: '8',
        dimension: 8,
        plan: 'parent'
      });
    } catch (e) {}

    setFeedback({ type: 'success', text: `Dimension 8 Parent Account "${trimmedId}" linked to "${parentLinkedStudentId}" generated!` });
    setParentId('');
  };

  // Generate Student Scholar Account
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setFeedback({ type: '', text: '' });

    const trimmedId = studentId.trim();
    if (!trimmedId) {
      setFeedback({ type: 'error', text: 'Student ID is required.' });
      return;
    }
    if (isIdTaken(trimmedId)) {
      setFeedback({ type: 'error', text: 'Used by anyone: Student ID already taken.' });
      return;
    }

    const dim = studentPlan === 'vvip' ? 3 : studentPlan === 'vip' ? 2 : 1;
    const newStudent = {
      id: trimmedId,
      studentId: trimmedId,
      name: studentName.trim() || trimmedId,
      classNum: studentClass,
      section: studentSection,
      password: studentPassword.trim() || 'dav123',
      dimension: dim,
      dimensionName: `Dimension ${dim} (${studentPlan.toUpperCase()})`,
      plan: studentPlan,
      createdAt: new Date().toISOString()
    };

    const updated = [...registeredList, newStudent];
    saveRegisteredUsers(updated);
    setRegisteredList(updated);

    try {
      await saveCloudStudent({
        student_id: trimmedId,
        full_name: newStudent.name,
        password: newStudent.password,
        class_num: studentClass,
        dimension: dim,
        plan: studentPlan
      });
    } catch (e) {}

    setFeedback({ type: 'success', text: `Student Account "${trimmedId}" created successfully!` });
    setStudentId('');
    setStudentName('');
  };

  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(registeredList, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `dav_all_registered_accounts_${Date.now()}.json`;
    a.click();
  };

  // Filtered accounts list
  const filteredUsers = registeredList.filter(u => {
    const q = searchQuery.toLowerCase();
    return (u.id || '').toLowerCase().includes(q) ||
           (u.name || '').toLowerCase().includes(q) ||
           (u.plan || '').toLowerCase().includes(q) ||
           String(u.dimension || '').includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border-b border-amber-500/40 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-lg text-xl">
              <Key className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-700">
                  Section 14 • Developer Command Center
                </span>
                <span className="text-xs text-slate-400 font-mono">Rishit Shankar Master Key</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Master ID Generator &amp; Account Provisioning Desk
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className="py-2 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Accounts Backup</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 overflow-x-auto shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {[
            { id: 'driver', name: '🚌 Generate Bus Driver (Dim 7)', icon: Bus },
            { id: 'parent', name: '👨‍👩‍👧 Generate Parent Account (Dim 8)', icon: Users },
            { id: 'student', name: '🎓 Generate Student Account', icon: GraduationCap },
            { id: 'all_accounts', name: `📋 All Accounts (${registeredList.length})`, icon: Shield }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black shadow-lg'
                  : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback.text && (
        <div className="max-w-4xl w-full mx-auto px-4 pt-4">
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs font-bold ${
            feedback.type === 'error'
              ? 'bg-rose-950/80 border-rose-800 text-rose-300'
              : 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
          }`}>
            {feedback.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{feedback.text}</span>
          </div>
        </div>
      )}

      {/* Content Form Area */}
      <div className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-6">
        {/* TAB 1: GENERATE BUS DRIVER (DIMENSION 7) */}
        {activeTab === 'driver' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Bus className="w-5 h-5 text-cyan-400" />
                <span>Provision Dimension 7 Bus Driver Account</span>
              </h3>
              <p className="text-xs text-slate-400">
                Create verified driver credentials with pre-assigned school ID and bus number (1 to 100).
              </p>
            </div>

            <form onSubmit={handleCreateDriver} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assigned School Campus
                </label>
                <select
                  value={driverSchool}
                  onChange={(e) => setDriverSchool(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                >
                  {DAV_OFFICIAL_SCHOOLS.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assigned Bus Number (1 to 100)
                </label>
                <select
                  value={driverBusNum}
                  onChange={(e) => setDriverBusNum(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                >
                  {Array.from({ length: 100 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>Bus #{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Driver Username / ID (Unique)
                </label>
                <input
                  type="text"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  placeholder="e.g. driver_bus_1"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Driver Full Name
                </label>
                <input
                  type="text"
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  placeholder="e.g. Shri Ramesh Kumar"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={driverPhone}
                  onChange={(e) => setDriverPhone(e.target.value)}
                  placeholder="e.g. 9470033984"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="text"
                  value={driverPassword}
                  onChange={(e) => setDriverPassword(e.target.value)}
                  placeholder="e.g. dav123"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Dimension 7 Driver Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: GENERATE PARENT ACCOUNT (DIMENSION 8) */}
        {activeTab === 'parent' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Generate Dimension 8 Parent Account</span>
              </h3>
              <p className="text-xs text-slate-400">
                Create parent credentials linked directly to a student scholar ID.
              </p>
            </div>

            <form onSubmit={handleCreateParent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Linked Student Scholar ID
                </label>
                <input
                  type="text"
                  value={parentLinkedStudentId}
                  onChange={(e) => setParentLinkedStudentId(e.target.value)}
                  placeholder="e.g. rishibhai"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Parent Username / ID (Must Be Unique)
                </label>
                <input
                  type="text"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  placeholder="e.g. parent_rishibhai"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Parent Password
                </label>
                <input
                  type="text"
                  value={parentPassword}
                  onChange={(e) => setParentPassword(e.target.value)}
                  placeholder="Enter parent password"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Dimension 8 Parent Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: GENERATE STUDENT SCHOLAR ACCOUNT */}
        {activeTab === 'student' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>Generate Student Scholar Account</span>
              </h3>
              <p className="text-xs text-slate-400">
                Enroll student with Normal (Dim 1), VIP (Dim 2), or Double VIP (Dim 3) Scholar Pass.
              </p>
            </div>

            <form onSubmit={handleCreateStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Student ID (Unique Username)
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. rahul_dav8"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Student Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Class &amp; Section
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                  >
                    {['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                  <select
                    value={studentSection}
                    onChange={(e) => setStudentSection(e.target.value)}
                    className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                  >
                    {['A', 'B', 'C', 'D', 'E'].map(sec => (
                      <option key={sec} value={sec}>Sec {sec}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Plan Tier
                </label>
                <select
                  value={studentPlan}
                  onChange={(e) => setStudentPlan(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                >
                  <option value="normal">Normal Scholar Pass (Dim 1)</option>
                  <option value="vip">VIP Scholar Pass (Dim 2)</option>
                  <option value="vvip">Double VIP / VVIP Pass (Dim 3)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Student Password
                </label>
                <input
                  type="text"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="Enter student password"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end pt-2">
                <button
                  type="submit"
                  className="py-3 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Student Scholar Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: ALL REGISTERED ACCOUNTS */}
        {activeTab === 'all_accounts' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl space-y-4 p-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, name, plan or dimension..."
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Showing {filteredUsers.length} of {registeredList.length} accounts
              </span>
            </div>

            <div className="divide-y divide-slate-800 max-h-[60vh] overflow-y-auto">
              {filteredUsers.map((u, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{u.id}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        Dim {u.dimension || 1}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 uppercase font-bold">
                        {u.plan || 'Scholar'}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] mt-0.5">
                      Name: <strong className="text-slate-200">{u.name}</strong> • Password: <span className="font-mono text-amber-400">{u.password}</span>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Verified'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
