import React, { useState } from 'react';
import {
  X, Clock, Sliders, Shield, BellOff, Zap, Check, Trash2,
  AlertCircle, Smartphone, ExternalLink, Flame
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainAppDetailModal({
  isOpen,
  app,
  onClose,
  onSave
}) {
  if (!isOpen || !app) return null;

  const [limitMins, setLimitMins] = useState(app.limitMinutes || app.dailyLimitMinutes || 40);
  const [frictionDelay, setFrictionDelay] = useState(10); // 0s | 5s | 10s | 30s
  const [blockNotifications, setBlockNotifications] = useState(true);
  const [category, setCategory] = useState(app.category || 'distracted');

  const handleSave = () => {
    focusDataStore.setAppDailyLimit(app.id, limitMins);
    if (onSave) onSave({ ...app, limitMinutes: limitMins, frictionDelay, category });
    onClose();
  };

  const formatMins = (m) => {
    if (m === 0) return 'Completely Blocked';
    const h = Math.floor(m / 60);
    const min = m % 60;
    if (h > 0 && min > 0) return `${h}h ${min}m`;
    if (h > 0) return `${h}h`;
    return `${min}m`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="w-full max-w-md bg-[#131418] border border-stone-800 rounded-[32px] p-6 space-y-5 shadow-2xl text-white relative animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-800">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-stone-800 flex items-center justify-center text-xl font-bold shadow-md">
              {app.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-base font-black text-white">{app.name}</h3>
              <p className="text-xs text-stone-400 capitalize">{category} Application</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-850 flex items-center justify-center text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Daily Allowance Slider */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-850 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-stone-300">
            <span className="flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Daily Limit</span>
            </span>
            <span className="font-mono text-emerald-400 font-black">{formatMins(limitMins)}</span>
          </div>

          <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={limitMins}
            onChange={(e) => setLimitMins(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-stone-500">
            <span>0m (Block)</span>
            <span>30m</span>
            <span>1h</span>
            <span>3h</span>
          </div>
        </div>

        {/* Launch Friction Delay */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-850 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-stone-300">
            <span>Launch Friction Wait</span>
            <span className="text-amber-400 font-mono font-bold">{frictionDelay}s</span>
          </div>
          <p className="text-[10px] text-stone-500">
            Enforces a pause with deep breath before allowing this app to open.
          </p>
          <div className="flex space-x-2 pt-1">
            {[0, 5, 10, 30].map(s => (
              <button
                key={s}
                onClick={() => setFrictionDelay(s)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  frictionDelay === s
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-850 text-stone-400 hover:text-white'
                }`}
              >
                {s === 0 ? 'None' : `${s}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Notification Block Toggle */}
        <div className="p-4 rounded-2xl bg-stone-950 border border-stone-850 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <BellOff className="w-4 h-4 text-cyan-400" />
              <span>Mute App Notifications</span>
            </span>
            <p className="text-[10px] text-stone-500">Bundle alerts into scheduled batch</p>
          </div>
          <button
            onClick={() => setBlockNotifications(!blockNotifications)}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
              blockNotifications ? 'bg-cyan-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                blockNotifications ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Save & Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-stone-800 hover:bg-stone-750 text-xs font-bold text-stone-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-3 rounded-2xl bg-white hover:bg-stone-200 text-stone-950 font-black text-xs shadow-xl transition-all"
          >
            Apply Settings
          </button>
        </div>

      </div>
    </div>
  );
}
