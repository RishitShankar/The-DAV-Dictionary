import React, { useState } from 'react';
import { 
  Key, Shield, Users, Bus, GraduationCap, CheckCircle2, 
  AlertCircle, Plus, Search, Download, Trash2, Edit3, ArrowRight, Save
} from 'lucide-react';
import { getRegisteredUsers, saveRegisteredUsers } from '../data/preloadedUsers';
import { saveCloudStudent, fetchCloudStudents, updateCloudPassword } from '../services/supabaseClient';
import { DAV_OFFICIAL_SCHOOLS } from './CleanBusTracker';

export function DeveloperIdGeneratorSection({ currentUser }) {
  // Tab: 'driver' | 'parent' | 'student' | 'all_accounts'
  const [activeTab, setActiveTab] = useState('driver');
  const [registeredList, setRegisteredList] = useState(() => getRegisteredUsers());

  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Bus Driver Account (Dimension 7) State
  const officialSchool = DAV_OFFICIAL_SCHOOLS[0];
  const [driverBusNum, setDriverBusNum] = useState(1);
  const [driverId, setDriverId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverPassword, setDriverPassword] = useState('');

  // 2. Parent Account (Dimension 8) State
  const [parentLinkedStudentId, setParentLinkedStudentId] = useState('');
  const [parentId, setParentId] = useState('');
  const [parentPassword, setParentPassword] = useState('');

  // 3. Student Account State
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('8');
  const [studentSection, setStudentSection] = useState('D');
  const [studentPlan, setStudentPlan] = useState('vip');
  const [studentPassword, setStudentPassword] = useState('');

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
      setFeedback({ type: 'error', text: 'Driver ID / Username is required.' });
      return;
    }
    if (isIdTaken(trimmedId)) {
      setFeedback({ type: 'error', text: 'Used by anyone: Driver ID already exists in system.' });
      return;
    }

    const newDriver = {
      id: trimmedId,
      studentId: trimmedId,
      name: driverName.trim() || `Driver of Bus #${driverBusNum}`,
      password: driverPassword.trim() || '1',
      dimension: 7,
      dimensionName: 'Bus Driver (Dimension 7)',
      plan: 'bus_driver',
      role: 'bus_driver',
      isDriver: true,
      busNumber: Number(driverBusNum),
      schoolId: officialSchool.id,
      schoolName: officialSchool.name,
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
    setDriverPassword('');
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

    const linkedStudent = parentLinkedStudentId.trim().toLowerCase() || 'student';

    const newParent = {
      id: trimmedId,
      studentId: trimmedId,
      name: `Parent of ${linkedStudent}`,
      password: parentPassword.trim() || '1',
      dimension: 8,
      dimensionName: 'Parent Portal (Dimension 8)',
      plan: 'parent',
      role: 'parent',
      studentLinkedId: linkedStudent,
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

    setFeedback({ type: 'success', text: `Dimension 8 Parent Account "${trimmedId}" linked to "${linkedStudent}" generated!` });
    setParentId('');
    setParentPassword('');
    setParentLinkedStudentId('');
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

    const dim = studentPlan === 'vvip' ? 4 : studentPlan === 'vip' ? 3 : 2;

    const newStudent = {
      id: trimmedId,
      studentId: trimmedId,
      name: studentName.trim() || `Scholar ${trimmedId}`,
      password: studentPassword.trim() || '1',
      classNum: studentClass,
      section: studentSection,
      plan: studentPlan,
      dimension: dim,
      dimensionName: studentPlan === 'vvip' ? 'Double VIP Pass' : studentPlan === 'vip' ? 'VIP Pass' : 'Normal Plan',
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
    setStudentPassword('');
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
                Create verified driver credentials for {officialSchool.name}. Enter any bus number freely.
              </p>
            </div>

            <form onSubmit={handleCreateDriver} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assigned School Campus (Official)
                </label>
                <div className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold">
                  {officialSchool.name}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assigned Bus Number (Enter Any Number)
                </label>
                <input
                  type="number"
                  min="1"
                  value={driverBusNum}
                  onChange={(e) => setDriverBusNum(Math.max(1, parseInt(e.target.value) || 1))}
                  placeholder="e.g. 1, 12, 101, 205..."
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Driver Username / ID (Unique)
                </label>
                <input
                  type="text"
                  value={driverId}
                  onChange={(e) => setDriverId(e.target.value)}
                  placeholder="e.g. driver_1 or 12"
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
                  placeholder="e.g. Driver Name"
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
                  Driver Password
                </label>
                <input
                  type="text"
                  value={driverPassword}
                  onChange={(e) => setDriverPassword(e.target.value)}
                  placeholder="Enter custom password"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Dimension 7 Driver Account</span>
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
                <span>Provision Dimension 8 Parent Account</span>
              </h3>
              <p className="text-xs text-slate-400">
                Generate authenticated parent credentials linked to a student account.
              </p>
            </div>

            <form onSubmit={handleCreateParent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Linked Student ID
                </label>
                <input
                  type="text"
                  value={parentLinkedStudentId}
                  onChange={(e) => setParentLinkedStudentId(e.target.value)}
                  placeholder="e.g. student_id"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Parent Username / ID (Unique)
                </label>
                <input
                  type="text"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                  placeholder="e.g. parent_01"
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
                  placeholder="Enter custom password"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Dimension 8 Parent Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: GENERATE STUDENT ACCOUNT */}
        {activeTab === 'student' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>Provision Student Scholar Account</span>
              </h3>
              <p className="text-xs text-slate-400">
                Create Normal, VIP, or Double VIP student credentials.
              </p>
            </div>

            <form onSubmit={handleCreateStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Student ID (Unique)
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. dav_student_01"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Student Name"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tier Plan
                </label>
                <select
                  value={studentPlan}
                  onChange={(e) => setStudentPlan(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:outline-none"
                >
                  <option value="normal">Normal Plan (Dimension 2)</option>
                  <option value="vip">VIP Pass (Dimension 3)</option>
                  <option value="vvip">Double VIP Pass (Dimension 4)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Password
                </label>
                <input
                  type="text"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  placeholder="Enter custom password"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  <span>Generate Student Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: ALL ACCOUNTS TABLE */}
        {activeTab === 'all_accounts' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-black text-white">
                All Provisioned Accounts ({registeredList.length})
              </h3>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID, name, plan..."
                  className="py-1.5 pl-8 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-800 rounded-2xl max-h-[500px]">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] sticky top-0">
                  <tr>
                    <th className="py-2.5 px-4">User ID</th>
                    <th className="py-2.5 px-4">Name</th>
                    <th className="py-2.5 px-4">Dimension</th>
                    <th className="py-2.5 px-4">Plan / Role</th>
                    <th className="py-2.5 px-4">Password</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredUsers.map((u, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-2.5 px-4 font-mono font-bold text-amber-400">{u.id || u.studentId}</td>
                      <td className="py-2.5 px-4">{u.name}</td>
                      <td className="py-2.5 px-4 font-mono">Dim {u.dimension || 2}</td>
                      <td className="py-2.5 px-4 uppercase text-[10px] font-bold">
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {u.plan || u.role || 'normal'}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-400">{u.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeveloperIdGeneratorSection;
