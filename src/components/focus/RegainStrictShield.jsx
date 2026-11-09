import React, { useState, useEffect } from 'react';
import {
  ShieldAlert, ShieldCheck, Lock, Unlock, Key, AlertTriangle,
  Clock, CheckCircle2, RefreshCw, Smartphone, Eye, FileText,
  UserCheck, Shield, ChevronRight
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainStrictShield() {
  const [shieldState, setShieldState] = useState(() => focusDataStore.getStrictShield());
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [showTamperLog, setShowTamperLog] = useState(false);

  // Simulated Tamper Detection History
  const [tamperLogs, setTamperLogs] = useState([
    { id: 1, event: 'Blocked attempt to kill DAV background service', time: '10:45 AM', status: 'Prevented' },
    { id: 2, event: 'App uninstallation prompt intercepted & neutralized', time: '11:15 AM', status: 'Shielded' },
    { id: 3, event: 'Attempted to turn off accessibility permissions', time: '12:30 PM', status: 'Locked' }
  ]);

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'strict_shield_updated') {
        setShieldState(data);
      }
    });
    return unsub;
  }, []);

  const handleToggleAntiUninstall = () => {
    const updated = {
      ...shieldState,
      antiUninstallEnabled: !shieldState.antiUninstallEnabled
    };
    focusDataStore.saveStrictShield(updated);
  };

  const handleTogglePreventDisable = () => {
    const updated = {
      ...shieldState,
      preventDisablePermissions: !shieldState.preventDisablePermissions
    };
    focusDataStore.saveStrictShield(updated);
  };

  const handleVerifyOverridePin = () => {
    if (inputPin === shieldState.emergencyUnlockPin) {
      const updated = {
        ...shieldState,
        strictModeActive: false,
        remainingEmergencyUnlocks: Math.max(0, shieldState.remainingEmergencyUnlocks - 1)
      };
      focusDataStore.saveStrictShield(updated);
      setShowOverrideModal(false);
      setInputPin('');
      setPinError(false);
      alert('Emergency Unlock Granted. Strict Mode disabled for 60 minutes.');
    } else {
      setPinError(true);
    }
  };

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-black border border-amber-500/30 p-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white">Strict Anti-Tamper Shield</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                APK Security Core
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Guarantees zero cheating by locking settings during focus sessions and preventing app uninstallation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Security Rules */}
      <div className="space-y-3">
        {/* Rule 1: Anti-Uninstall Protection */}
        <div className="p-5 rounded-2xl bg-[#1a1b20] border border-stone-800 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Anti-Uninstall Guard</h4>
            </div>
            <p className="text-xs text-stone-400">
              Blocks uninstallation of DAV Dictionary during exam season and active study blocks.
            </p>
          </div>
          <button
            onClick={handleToggleAntiUninstall}
            className={`w-12 h-7 rounded-full p-1 transition-colors relative flex-shrink-0 ${
              shieldState.antiUninstallEnabled ? 'bg-emerald-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                shieldState.antiUninstallEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Rule 2: Prevent Disabling Permissions */}
        <div className="p-5 rounded-2xl bg-[#1a1b20] border border-stone-800 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Prevent Disabling Accessibility Permissions</h4>
            </div>
            <p className="text-xs text-stone-400">
              Locks Android Accessibility & Usage Access settings so you cannot bypass app limits impulsively.
            </p>
          </div>
          <button
            onClick={handleTogglePreventDisable}
            className={`w-12 h-7 rounded-full p-1 transition-colors relative flex-shrink-0 ${
              shieldState.preventDisablePermissions ? 'bg-emerald-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                shieldState.preventDisablePermissions ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Rule 3: 30-Second Commitment Delay */}
        <div className="p-5 rounded-2xl bg-[#1a1b20] border border-stone-800 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">30-Second Commitment Delay</h4>
            </div>
            <p className="text-xs text-stone-400">
              Whenever you attempt to cancel a focus session, you must wait 30 seconds to reflect on your decision.
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold">
            30s Delay
          </span>
        </div>

        {/* Rule 4: Emergency Override PIN */}
        <div className="p-5 rounded-2xl bg-[#1a1b20] border border-stone-800 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-rose-400" />
              <h4 className="text-sm font-bold text-white">Emergency Override PIN</h4>
            </div>
            <p className="text-xs text-stone-400">
              Only for true emergencies. Gives 1 temporary bypass per week. Default PIN: 2026.
            </p>
          </div>
          <button
            onClick={() => setShowOverrideModal(true)}
            className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600/50 border border-rose-500/40 text-xs font-bold text-rose-300 transition-all"
          >
            Use PIN
          </button>
        </div>
      </div>

      {/* Tamper Detection History Log */}
      <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white">Anti-Cheat Interception Log</h4>
          </div>
          <span className="text-xs text-stone-400">{tamperLogs.length} events logged</span>
        </div>

        <div className="space-y-2">
          {tamperLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-2xl bg-stone-950 border border-stone-850 flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <p className="font-bold text-stone-200">{log.event}</p>
                <span className="font-mono text-stone-500 text-[10px]">{log.time}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Unlock Modal */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Key className="w-5 h-5 text-rose-400" />
              <span>Enter Emergency PIN</span>
            </h3>
            <p className="text-xs text-stone-400">
              Remaining emergency unlocks this week: {shieldState.remainingEmergencyUnlocks}.
            </p>

            <input
              type="password"
              maxLength="4"
              value={inputPin}
              onChange={(e) => {
                setInputPin(e.target.value);
                setPinError(false);
              }}
              placeholder="••••"
              className="w-full text-center text-2xl font-mono tracking-widest py-3 rounded-2xl bg-stone-950 border border-stone-800 text-white focus:outline-none focus:border-rose-500"
            />

            {pinError && (
              <p className="text-xs text-rose-400 font-semibold text-center">
                Incorrect PIN. Default PIN is 2026.
              </p>
            )}

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 text-xs font-semibold text-stone-300"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOverridePin}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-black text-white shadow-lg"
              >
                Verify & Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
