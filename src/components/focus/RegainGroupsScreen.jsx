import React, { useState, useEffect } from 'react';
import {
  Users, Plus, HelpCircle, UserPlus, Check, Sparkles,
  Flame, Award, Clock, ArrowRight, MessageSquare, Send, BookOpen,
  Volume2, ShieldCheck, Heart, Star, Compass
} from 'lucide-react';
import { focusDataStore, ambientAudio } from '../../services/focusDataStore';

export function RegainGroupsScreen({ user }) {
  const [groupsData, setGroupsData] = useState(() => focusDataStore.getGroups());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState(25);
  const [activeGroupRoom, setActiveGroupRoom] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { id: 1, user: 'Aman Sharma (DAV)', text: 'Completed 2 hours of Trigonometry! 🔥', time: '1:12 PM' },
    { id: 2, user: 'Priya Patel', text: 'Starting Physics Chapter 4 session now.', time: '1:18 PM' },
    { id: 3, user: 'Rishi Shankar', text: 'Great focus everyone! Let us lead the campus board.', time: '1:24 PM' }
  ]);

  // Shared Group Timer Simulation
  const [groupTimerSeconds, setGroupTimerSeconds] = useState(25 * 60);
  const [groupTimerRunning, setGroupTimerRunning] = useState(true);

  // Group Leaderboard Simulation
  const groupRankers = [
    { rank: 1, name: 'Rishi Shankar', hours: '28.4h', badge: '🥇 DAV Champion' },
    { rank: 2, name: 'Aman Sharma', hours: '24.1h', badge: '🥈 Deep Worker' },
    { rank: 3, name: 'Priya Patel', hours: '21.8h', badge: '🥉 Math Wizard' },
    { rank: 4, name: 'Sneha Roy', hours: '19.5h', badge: '⭐ Consistent' }
  ];

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'groups_updated') {
        setGroupsData(data);
      }
    });
    return unsub;
  }, []);

  // Synchronized group timer tick
  useEffect(() => {
    let t = null;
    if (activeGroupRoom && groupTimerRunning) {
      t = setInterval(() => {
        setGroupTimerSeconds(prev => (prev <= 1 ? 25 * 60 : prev - 1));
      }, 1000);
    }
    return () => {
      if (t) clearInterval(t);
    };
  }, [activeGroupRoom, groupTimerRunning]);

  const handleJoin = (groupId) => {
    const updated = focusDataStore.joinGroup(groupId);
    setGroupsData(updated);
    ambientAudio.playBellChime();
  };

  const handleCreate = () => {
    if (!newGroupName.trim()) return;
    const updated = focusDataStore.createUserGroup(newGroupName.trim(), weeklyGoal);
    setGroupsData(updated);
    setNewGroupName('');
    setShowCreateModal(false);
    ambientAudio.playBellChime();
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      user: user?.name || 'You',
      text: chatMessage.trim(),
      time: 'Just now'
    };
    setChatLog([...chatLog, newMsg]);
    setChatMessage('');
  };

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* ------------------------------------------------------------- */}
      {/* Top Header: "Focus Groups" + "... Help"                       */}
      {/* ------------------------------------------------------------- */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-2xl font-black text-white tracking-tight">Focus Groups</h2>
        <button
          onClick={() => alert('Focus Groups allow DAV students to study together in real-time, share pomodoro streaks, and hold each other accountable!')}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-300 hover:text-white transition-all"
        >
          <span>💬 Help</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Section 1: "Your groups" + "+ Create Group"                   */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Your groups</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1"
          >
            <span>+ Create Group</span>
          </button>
        </div>

        {/* Dashed Border Card: "Create group with friends!" (Matches Screenshot) */}
        <div
          onClick={() => setShowCreateModal(true)}
          className="p-5 rounded-2xl border-2 border-dashed border-stone-800/90 hover:border-emerald-500/40 bg-stone-950/40 hover:bg-stone-900/40 cursor-pointer transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            {/* Round Green + Icon */}
            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Create group with friends!</h4>
              {/* Overlapping User Avatars (4 circles as in screenshot) */}
              <div className="flex -space-x-2 pt-0.5">
                {[1, 2, 3, 4].map(idx => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded-full bg-stone-800 border-2 border-stone-950 flex items-center justify-center text-[10px] font-bold text-stone-300 overflow-hidden"
                  >
                    👤
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* List of Active User Joined Groups */}
        {groupsData.userGroups?.map((group) => (
          <div
            key={group.id}
            onClick={() => setActiveGroupRoom(group)}
            className="p-4 rounded-2xl bg-[#1c1d21] border border-emerald-500/30 hover:border-emerald-400/60 cursor-pointer transition-all flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{group.name}</h4>
                <div className="flex items-center space-x-2 text-xs text-stone-400">
                  <span className="flex items-center text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                    {group.currentlyStudyingCount} studying now
                  </span>
                  <span>• {group.activeMembersCount} members</span>
                </div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              Open Room ›
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Section 2: "Suggested groups" + "View all"                    */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Suggested groups</h3>
          <span className="text-xs font-bold text-emerald-400 hover:text-emerald-300 cursor-pointer">
            View all
          </span>
        </div>

        <div className="space-y-2.5">
          {groupsData.suggestedGroups?.map((sg) => (
            <div
              key={sg.id}
              className="p-4 rounded-2xl bg-[#1c1d21] border border-stone-800 hover:border-stone-700 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3.5 min-w-0 pr-3">
                {/* Dark Circle with User Group Icon */}
                <div className="w-12 h-12 rounded-full bg-stone-800/80 flex items-center justify-center text-stone-400 flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{sg.name}</h4>
                  <p className="text-xs text-stone-400 font-medium">{sg.membersCount}</p>
                </div>
              </div>

              {/* Solid White "Join" Pill Button (Matches Screenshot Exactly) */}
              <button
                onClick={() => handleJoin(sg.id)}
                className="px-5 py-2 rounded-full font-black text-xs bg-white hover:bg-stone-200 text-stone-950 shadow-md transition-all active:scale-95 flex-shrink-0"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Interactive Group Study Room Modal with Synchronized Timer    */}
      {/* ------------------------------------------------------------- */}
      {activeGroupRoom && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center text-emerald-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{activeGroupRoom.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold">
                    ● {activeGroupRoom.currentlyStudyingCount} Students Focused Live
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveGroupRoom(null)}
                className="text-stone-400 hover:text-white text-xs font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Synchronized Group Pomodoro Timer */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-stone-950 border border-emerald-500/40 text-center space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                Squad Synchronized Focus Block
              </span>
              <div className="text-4xl font-black font-mono text-white">
                {formatTimer(groupTimerSeconds)}
              </div>
              <p className="text-[11px] text-stone-400">
                All members in this room are currently locked into this timer.
              </p>
            </div>

            {/* Group Leaderboard Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Weekly Squad Leaderboard
              </span>
              <div className="space-y-1.5">
                {groupRankers.map(r => (
                  <div
                    key={r.rank}
                    className="p-2.5 rounded-xl bg-stone-950 border border-stone-850 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="w-5 font-bold font-mono text-stone-400">#{r.rank}</span>
                      <span className="font-bold text-white">{r.name}</span>
                      <span className="text-[10px] text-emerald-400">{r.badge}</span>
                    </div>
                    <span className="font-mono font-black text-amber-400">{r.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group Chat & Motivation Stream */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400">Live Study Chat</span>
              <div className="h-36 overflow-y-auto space-y-2 p-3 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs">
                {chatLog.map((c) => (
                  <div key={c.id} className="p-2 rounded-xl bg-stone-900 border border-stone-850">
                    <div className="flex justify-between items-center text-[10px] text-stone-400 mb-0.5">
                      <span className="font-bold text-emerald-400">{c.user}</span>
                      <span>{c.time}</span>
                    </div>
                    <p className="text-stone-200">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2 pt-1">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Send study encouragement..."
                  className="flex-1 px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* Create Group Modal                                            */}
      {/* ------------------------------------------------------------- */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 text-white">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-400" />
              <span>Create Focus Group</span>
            </h3>
            <p className="text-xs text-stone-400">
              Invite your classmates or batchmates to study together with shared timers and screen time rankings.
            </p>

            <div>
              <label className="text-xs font-bold text-stone-300">Group Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. DAV Section 10 Board Rankers"
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-300">Weekly Target (Hours)</label>
              <input
                type="number"
                min="5"
                max="60"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-semibold text-stone-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreate}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-stone-200 text-xs font-black text-stone-950 shadow-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
