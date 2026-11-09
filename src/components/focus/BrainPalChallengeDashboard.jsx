import React, { useState, useEffect } from 'react';
import {
  Award, Shield, Flame, Zap, CheckCircle2, Lock, Star,
  TrendingUp, Calendar, Heart, ArrowRight, RefreshCw
} from 'lucide-react';
import { brainpalReelsEngine } from '../../services/brainpalReelsEngine';

export function BrainPalChallengeDashboard() {
  const [engineState, setEngineState] = useState(() => brainpalReelsEngine.state);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const unsub = brainpalReelsEngine.subscribe((event, data) => {
      setEngineState({ ...data });
    });
    return unsub;
  }, []);

  const challenges = [
    {
      id: 'c1',
      title: '3-Day Dopamine Reset',
      desc: 'Limit daily reels to 10 or fewer for 3 consecutive days to down-regulate dopamine receptor saturation.',
      daysTarget: 3,
      currentDays: 3,
      reward: '500 Focus Tokens + Pioneer Badge',
      completed: true,
      icon: '🌱'
    },
    {
      id: 'c2',
      title: '7-Day Monk Mode Mastery',
      desc: 'Zero short-form video consumption (YouTube Shorts & Instagram Reels completely locked) for a full school week.',
      daysTarget: 7,
      currentDays: 5,
      reward: 'Monk Mode Master Gold Trophy',
      completed: false,
      icon: '🧘'
    },
    {
      id: 'c3',
      title: '14-Day Board Exam Armor',
      desc: 'Maintain active Strict Shield during all morning and evening study blocks. Zero tampering allowed.',
      daysTarget: 14,
      currentDays: 8,
      reward: 'Campus Scholastic Honor Roll Recognition',
      completed: false,
      icon: '⚡'
    },
    {
      id: 'c4',
      title: '30-Day Digital Renaissance',
      desc: 'Transform your screen time ratio: useful study hours must exceed distracted social time by at least 3:1.',
      daysTarget: 30,
      currentDays: 14,
      reward: 'DAV Smart Portal Supreme Scholar Crown 👑',
      completed: false,
      icon: '🏛️'
    }
  ];

  const integrityScore = brainpalReelsEngine.getAttentionIntegrityScore();

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-black border border-amber-500/30 p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black text-white">Attention Mastery Quests</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  BrainPal Gamification
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Gamified challenges engineered to rewire your attention circuits and conquer dopamine addiction.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-500/30 text-center min-w-[140px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Attention Health</span>
            <div className="text-3xl font-black text-amber-400 font-mono mt-0.5">{integrityScore}%</div>
            <span className="text-[10px] text-emerald-400 font-semibold">Resilient Focus</span>
          </div>
        </div>
      </div>

      {/* 4 Quests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {challenges.map((quest) => {
          const progressPercent = Math.min(100, Math.round((quest.currentDays / quest.daysTarget) * 100));
          return (
            <div
              key={quest.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between h-56 relative overflow-hidden ${
                quest.completed
                  ? 'bg-gradient-to-br from-emerald-950/40 via-stone-900 to-black border-emerald-500/40 shadow-xl'
                  : 'bg-[#15161a] border-stone-800 hover:border-stone-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{quest.icon}</span>
                  <div>
                    <h4 className="text-base font-black text-white">{quest.title}</h4>
                    <span className="text-xs text-stone-400 font-medium">
                      Day {quest.currentDays} of {quest.daysTarget}
                    </span>
                  </div>
                </div>

                {quest.completed ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500 text-stone-950 flex items-center space-x-1 shadow-md">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                    <span>Completed</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-stone-800 text-stone-300">
                    Active
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-stone-300 leading-relaxed">{quest.desc}</p>
                <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      quest.completed ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-stone-400">
                <span>Reward: <strong className="text-amber-300">{quest.reward}</strong></span>
                <span className="font-mono font-bold">{progressPercent}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestone Badges Showcase */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">BrainPal™ Unlocked Badges</h3>
          </div>
          <span className="text-xs text-stone-400">Campus Proof of Focus</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {engineState.milestones?.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
                m.unlocked
                  ? 'bg-amber-950/30 border-amber-500/40 shadow-lg'
                  : 'bg-stone-950/60 border-stone-850 opacity-50'
              }`}
            >
              <span className="text-3xl block">{m.icon}</span>
              <h5 className="text-xs font-bold text-white truncate">{m.title}</h5>
              <p className="text-[10px] text-stone-400 line-clamp-2">{m.desc}</p>
              {m.unlocked ? (
                <span className="text-[9px] font-black uppercase text-amber-400 block pt-1">
                  ✓ Unlocked
                </span>
              ) : (
                <span className="text-[9px] font-mono text-stone-500 block pt-1">
                  {m.progress}/{m.target} Days
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
