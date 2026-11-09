import React, { useState, useEffect } from 'react';
import {
  Bell, BellOff, Shield, Check, Clock, AlertCircle,
  Inbox, Sparkles, Send, VolumeX, Eye, MessageSquare,
  Smartphone, UserCheck, Plus, X
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainNotificationManager() {
  const [notificationsData, setNotificationsData] = useState(() => focusDataStore.getNotifications());
  const [releasedToast, setReleasedToast] = useState(null);
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [autoReplyMsg, setAutoReplyMsg] = useState(
    'I am currently deep in study on DAV Smart Portal until 8:00 PM. I will get back to you during my scheduled notification window.'
  );
  const [newWhitelistName, setNewWhitelistName] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'notifications_updated') {
        setNotificationsData(data);
      }
    });
    return unsub;
  }, []);

  const handleReleaseBatch = (slotId, label) => {
    const updated = focusDataStore.releaseBatch(slotId);
    setNotificationsData(updated);
    setReleasedToast(`Delivered all held notifications for ${label}!`);
    setTimeout(() => setReleasedToast(null), 4000);
  };

  const handleAddWhitelist = () => {
    if (!newWhitelistName.trim()) return;
    const current = focusDataStore.getNotifications();
    const updated = {
      ...current,
      whitelist: [...current.whitelist, newWhitelistName.trim()]
    };
    focusDataStore.saveNotifications(updated);
    setNewWhitelistName('');
    setShowAddContact(false);
  };

  const handleRemoveWhitelist = (index) => {
    const current = focusDataStore.getNotifications();
    const updatedList = current.whitelist.filter((_, i) => i !== index);
    const updated = { ...current, whitelist: updatedList };
    focusDataStore.saveNotifications(updated);
  };

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* Toast Alert */}
      {releasedToast && (
        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center space-x-2 animate-in slide-in-from-top">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{releasedToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#131922] via-stone-900 to-black border border-stone-800 p-6 shadow-2xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <BellOff className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-black text-white">Smart Notification Shield</h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                Scheduled Batches
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Never get interrupted mid-formula. Distracting notifications are held silently and delivered in 3 curated batches daily.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Scheduled Batch Delivery Slots */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-stone-300 uppercase tracking-wider">
          Daily Scheduled Batches
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {notificationsData.slots.map((slot) => (
            <div
              key={slot.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col justify-between h-36 ${
                slot.released
                  ? 'bg-stone-950/60 border-stone-850'
                  : 'bg-stone-900/90 border-cyan-500/40 shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{slot.label}</span>
                <span className="font-mono text-xs font-black text-cyan-400">{slot.time}</span>
              </div>

              <div className="my-2">
                <div className="text-2xl font-black text-white">
                  {slot.count} <span className="text-xs font-normal text-stone-400">held</span>
                </div>
                <p className="text-[10px] text-stone-500">
                  {slot.released ? 'Batch already released' : 'Waiting for scheduled slot'}
                </p>
              </div>

              {!slot.released ? (
                <button
                  onClick={() => handleReleaseBatch(slot.id, slot.label)}
                  className="w-full py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-[11px] font-bold text-white shadow-md transition-all"
                >
                  Release Now
                </button>
              ) : (
                <span className="text-[11px] text-stone-500 text-center font-semibold">
                  ✓ Delivered
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Auto-Reply During Focus Mode */}
      <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Auto-Reply During Focus Sessions</h4>
          </div>
          <button
            onClick={() => setAutoReplyEnabled(!autoReplyEnabled)}
            className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
              autoReplyEnabled ? 'bg-emerald-500' : 'bg-stone-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                autoReplyEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {autoReplyEnabled && (
          <div className="space-y-2">
            <textarea
              rows="2"
              value={autoReplyMsg}
              onChange={(e) => setAutoReplyMsg(e.target.value)}
              className="w-full p-3 rounded-2xl bg-stone-950 border border-stone-850 text-xs text-stone-300 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[10px] text-stone-500">
              This message is automatically dispatched to WhatsApp and SMS contacts while your focus session runs.
            </p>
          </div>
        )}
      </div>

      {/* Whitelisted Contacts */}
      <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">VIP Priority Whitelist (Instant Delivery)</h4>
          </div>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            + Add Contact
          </button>
        </div>
        <p className="text-xs text-stone-400">
          Calls and messages from these contacts will immediately ring through, even during deep focus sessions:
        </p>

        {showAddContact && (
          <div className="flex space-x-2 py-1">
            <input
              type="text"
              value={newWhitelistName}
              onChange={(e) => setNewWhitelistName(e.target.value)}
              placeholder="Contact Name or Title"
              className="flex-1 px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white"
            />
            <button
              onClick={handleAddWhitelist}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 text-xs font-bold text-white"
            >
              Add
            </button>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {notificationsData.whitelist.map((wl, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center space-x-2"
            >
              <span>👤 {wl}</span>
              <button
                onClick={() => handleRemoveWhitelist(i)}
                className="text-stone-400 hover:text-rose-400 text-xs"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Intercepted Queue Vault */}
      <div className="p-5 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <Inbox className="w-4 h-4 text-cyan-400" />
          <span>Intercepted Notification Vault</span>
        </h4>

        <div className="space-y-2">
          {notificationsData.interceptedQueue.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-stone-950 border border-stone-850 flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center font-black text-[10px] text-stone-300">
                  {item.app.charAt(0)}
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{item.app}</span>
                    <span className="text-stone-400">• {item.sender}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{item.snippet}</p>
                </div>
              </div>
              <span className="font-mono text-stone-500 text-[10px]">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
