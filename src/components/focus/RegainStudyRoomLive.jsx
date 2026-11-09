import React, { useState, useEffect } from 'react';
import {
  Users, Clock, MessageSquare, Send, Sparkles, Flame,
  Coffee, Heart, Award, Shield, Check, Volume2
} from 'lucide-react';
import { ambientAudio } from '../../services/focusDataStore';

export function RegainStudyRoomLive({ user, groupName = 'DAV Board Rankers' }) {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [reactions, setReactions] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [livePeers, setLivePeers] = useState([
    { id: 1, name: 'Rishi S. (Head Boy)', subject: 'Calculus Integration', status: 'Focusing', time: '48m', avatar: '👨‍🎓' },
    { id: 2, name: 'Ananya V.', subject: 'Physics Ray Optics', status: 'Focusing', time: '35m', avatar: '👩‍🔬' },
    { id: 3, name: 'Aman K.', subject: 'Chemistry Thermodynamics', status: 'Focusing', time: '1h 12m', avatar: '👨‍💻' },
    { id: 4, name: 'Priya P.', subject: 'Biology Cell Cycle', status: 'Taking Break', time: '22m', avatar: '👩‍🏫' },
    { id: 5, name: 'Sneha R.', subject: 'English Board Mock', status: 'Focusing', time: '55m', avatar: '👩‍🎓' },
    { id: 6, name: 'Devendra M.', subject: 'Computer Science Python', status: 'Focusing', time: '40m', avatar: '👨‍💻' }
  ]);

  // Timer Tick
  useEffect(() => {
    const t = setInterval(() => {
      setTimerSeconds(s => (s <= 1 ? 25 * 60 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const sendReaction = (emoji) => {
    ambientAudio.playBellChime();
    const newR = { id: Date.now(), emoji, left: Math.random() * 80 + 10 };
    setReactions(prev => [...prev, newR]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newR.id));
    }, 2000);
  };

  const formatTimer = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-6 text-white select-none relative overflow-hidden">
      {/* Floating Reactions Surface */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {reactions.map(r => (
          <div
            key={r.id}
            className="absolute bottom-10 text-3xl animate-bounce"
            style={{ left: `${r.left}%` }}
          >
            {r.emoji}
          </div>
        ))}
      </div>

      {/* Main Room Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c2017] via-stone-900 to-black border border-emerald-500/30 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Live Virtual Study Hall
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">{groupName}</h2>
          <p className="text-xs text-stone-400">
            {livePeers.length} students focused synchronously in zero-distraction silence.
          </p>
        </div>

        {/* Big Shared Countdown */}
        <div className="text-center p-4 rounded-2xl bg-black/50 border border-emerald-500/40 min-w-[200px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Synchronized Pomodoro
          </span>
          <div className="text-4xl font-black font-mono text-white mt-0.5">
            {formatTimer(timerSeconds)}
          </div>
        </div>
      </div>

      {/* Live Peer Study Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {livePeers.map(peer => (
          <div
            key={peer.id}
            className="p-4 rounded-2xl bg-[#16171a] border border-stone-850 hover:border-emerald-500/40 transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-start justify-between">
              <span className="text-2xl">{peer.avatar}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                peer.status === 'Focusing'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {peer.status}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white truncate">{peer.name}</h4>
              <p className="text-[10px] text-stone-400 truncate mt-0.5">{peer.subject}</p>
              <span className="text-[10px] font-mono font-bold text-emerald-400 mt-1 block">
                ⏱️ {peer.time} locked
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Reaction Bar */}
      <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
        <span className="text-xs font-bold text-stone-400 pl-2">Send Silent Support:</span>
        <div className="flex space-x-2">
          {['🔥', '👏', '💡', '☕', '🚀'].map(emoji => (
            <button
              key={emoji}
              onClick={() => sendReaction(emoji)}
              className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-750 active:scale-90 text-lg flex items-center justify-center transition-transform shadow"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
