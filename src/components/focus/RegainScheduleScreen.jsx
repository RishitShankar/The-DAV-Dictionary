import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Plus, Check, Trash2, Bell, BellOff,
  ChevronLeft, ChevronRight, Sparkles, BookOpen, Shield, Flame
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainScheduleScreen() {
  const [schedules, setSchedules] = useState(() => focusDataStore.getSchedules());
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form State for new schedule
  const [newTitle, setNewTitle] = useState('Daily Deep Focus');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]); // Mon to Fri
  const [autoDnd, setAutoDnd] = useState(true);
  const [targetSubject, setTargetSubject] = useState('Board Exam Prep');

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'schedules_updated') {
        setSchedules(data);
      }
    });
    return unsub;
  }, []);

  const daysOfWeek = [
    { id: 1, label: 'M', name: 'Mon' },
    { id: 2, label: 'T', name: 'Tue' },
    { id: 3, label: 'W', name: 'Wed' },
    { id: 4, label: 'T', name: 'Thu' },
    { id: 5, label: 'F', name: 'Fri' },
    { id: 6, label: 'S', name: 'Sat' },
    { id: 0, label: 'S', name: 'Sun' }
  ];

  const toggleDay = (dayId) => {
    if (selectedDays.includes(dayId)) {
      setSelectedDays(selectedDays.filter(d => d !== dayId));
    } else {
      setSelectedDays([...selectedDays, dayId]);
    }
  };

  const handleCreateSchedule = () => {
    const daysLabel = selectedDays.length === 7
      ? 'All Days'
      : selectedDays.length === 5 && !selectedDays.includes(0) && !selectedDays.includes(6)
      ? 'Mon - Fri'
      : `${selectedDays.length} days / wk`;

    const format12 = (t24) => {
      const [h, m] = t24.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`;
    };

    const newObj = {
      id: `sch_${Date.now()}`,
      title: newTitle || 'Custom Schedule',
      timeRange: `${format12(startTime)} - ${format12(endTime)}`,
      daysLabel,
      activeDays: selectedDays,
      enabled: true,
      autoDnd,
      blockDistractions: true,
      targetSubject
    };

    focusDataStore.addSchedule(newObj);
    setShowCreateModal(false);
  };

  const activeCard = schedules[activeCardIndex] || schedules[0];

  return (
    <div className="w-full space-y-8 text-white select-none">
      {/* ------------------------------------------------------------- */}
      {/* Top Title: "Create your study schedule" (Matches Screenshot)  */}
      {/* ------------------------------------------------------------- */}
      <div className="text-center pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Create your<br />study schedule
        </h2>
        <p className="text-xs text-stone-400 mt-2">
          Automate distraction-free study blocks. Your APK automatically mutes notifications during study hours.
        </p>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Horizontal Carousel Card (Matches Screenshot Exactly)        */}
      {/* ------------------------------------------------------------- */}
      <div className="relative max-w-md mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-[#1c1d21] border border-stone-800 p-5 shadow-2xl flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white tracking-wide">
              {activeCard?.title || 'Morning Study'}
            </h3>
            <p className="text-xs text-stone-400 font-medium font-mono">
              {activeCard?.timeRange || '06:00 AM - 08:00 AM'} | {activeCard?.daysLabel || 'Mon - Fri'}
            </p>
            <div className="flex items-center space-x-2 pt-1 text-[11px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>{activeCard?.targetSubject || 'DAV Core Curriculum'}</span>
            </div>
          </div>

          {/* Round + Button on right side of card */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="w-12 h-12 rounded-full bg-[#e6ede8] hover:bg-white text-stone-900 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
            title="Create or configure this schedule"
          >
            <Plus className="w-5 h-5 text-stone-900 stroke-[2.5]" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 mt-4">
          {schedules.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCardIndex(idx)}
              className={`transition-all rounded-full ${
                activeCardIndex === idx
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* "Create Schedule" Button (Solid White Pill)                   */}
      {/* ------------------------------------------------------------- */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-8 py-3.5 rounded-full font-black text-sm bg-white hover:bg-stone-200 text-stone-950 shadow-2xl transition-all active:scale-95 text-center"
        >
          Create Schedule
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Active Schedules List with On/Off Toggles                     */}
      {/* ------------------------------------------------------------- */}
      <div className="max-w-md mx-auto space-y-3 pt-4">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Active Study Routines ({schedules.filter(s => s.enabled).length} Enabled)
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold">Auto-DND Protection</span>
        </div>

        <div className="space-y-2.5">
          {schedules.map((sch) => (
            <div
              key={sch.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                sch.enabled
                  ? 'bg-stone-900/90 border-emerald-500/30 shadow-md'
                  : 'bg-stone-950/60 border-stone-850 opacity-60'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-white">{sch.title}</h4>
                  {sch.autoDnd && (
                    <BellOff className="w-3.5 h-3.5 text-amber-400" title="Auto DND Active" />
                  )}
                </div>
                <p className="text-xs text-stone-400 font-mono">
                  {sch.timeRange} • {sch.daysLabel}
                </p>
                <p className="text-[11px] text-stone-500">
                  Subject: {sch.targetSubject}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => focusDataStore.toggleSchedule(sch.id)}
                className={`w-12 h-7 rounded-full p-1 transition-colors relative flex-shrink-0 ${
                  sch.enabled ? 'bg-emerald-500' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform transform ${
                    sch.enabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Schedule Creation Modal                                       */}
      {/* ------------------------------------------------------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>New Focus Schedule</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-stone-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Routine Title */}
            <div>
              <label className="text-xs font-bold text-stone-300">Routine Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Science Revision"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Time Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-300">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-300">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Days of Week Selector */}
            <div>
              <label className="text-xs font-bold text-stone-300">Repeat Days</label>
              <div className="flex space-x-1.5 mt-2">
                {daysOfWeek.map((d) => {
                  const isSel = selectedDays.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleDay(d.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        isSel
                          ? 'bg-emerald-500 text-stone-950 shadow-md'
                          : 'bg-stone-950 text-stone-400 border border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Subject */}
            <div>
              <label className="text-xs font-bold text-stone-300">Target Subject</label>
              <input
                type="text"
                value={targetSubject}
                onChange={(e) => setTargetSubject(e.target.value)}
                placeholder="e.g. Mathematics Class 10"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Auto DND Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-950 border border-stone-800">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-stone-200">Auto Mute Notifications</span>
                <p className="text-[10px] text-stone-500">Hold all incoming notifications during this schedule</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoDnd(!autoDnd)}
                className={`w-10 h-6 rounded-full p-0.5 transition-colors ${
                  autoDnd ? 'bg-emerald-500' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    autoDnd ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateSchedule}
                className="flex-1 py-3 rounded-xl bg-white hover:bg-stone-200 text-xs font-black text-stone-950 shadow-lg"
              >
                Save Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
