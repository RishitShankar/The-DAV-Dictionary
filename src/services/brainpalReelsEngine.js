/**
 * BrainPal™ Short-Form Video & Dopamine Interception Engine
 * Algorithmic doomscroll detection, velocity tracking, neural fatigue models,
 * dopamine baseline reset challenges, and audio synthesis cues.
 */

export const REELS_ENGINE_EVENTS = {
  REEL_SCROLLED: 'brainpal_reel_scrolled',
  VELOCITY_UPDATED: 'brainpal_velocity_updated',
  INTERVENTION_TRIGGERED: 'brainpal_intervention_triggered',
  TIER1_WARNING: 'brainpal_tier1_warning',
  TIER2_BREATH: 'brainpal_tier2_breath',
  TIER3_LOCKOUT: 'brainpal_tier3_lockout',
  CHALLENGE_PROGRESS: 'brainpal_challenge_progress'
};

export const REEL_CATEGORIES = {
  EDUCATIONAL: 'educational',
  BRAINROT: 'brainrot',
  MEME: 'meme',
  MOTIVATION: 'motivation',
  GAMING: 'gaming'
};

class BrainPalEngine {
  constructor() {
    this.storageKey = 'dav_brainpal_engine_state_v2';
    this.subscribers = new Set();
    this.state = this.loadState();
  }

  loadState() {
    const defaultState = {
      sessionStartTime: Date.now(),
      totalReelsToday: 14,
      dailyTargetBudget: 25,
      doomscrollDurationMs: 14 * 48 * 1000, // ~11 mins
      swipesPerMinute: 1.8,
      interventionsToday: 1,
      currentRiskState: 'moderate', // 'low' | 'moderate' | 'high' | 'critical'
      activeStreakDays: 5,
      savedHoursThisWeek: 6.8,
      milestones: [
        { id: 'm1', title: 'Dopamine Pioneer', desc: 'Avoided 50 brainrot reels in a single day', unlocked: true, icon: '🛡️' },
        { id: 'm2', title: 'Monk Mode Master', desc: 'Maintained 7 consecutive days below 20 reels', unlocked: false, progress: 5, target: 7, icon: '🧘' },
        { id: 'm3', title: 'Deep Work Champion', desc: 'Studied for 4 hours without opening Shorts', unlocked: true, icon: '🏆' },
        { id: 'm4', title: 'Board Exam Shield', desc: '100% strict shield adherence during exam week', unlocked: false, progress: 2, target: 5, icon: '⚡' }
      ],
      hourlyHistory: [
        { hour: 7, count: 2 },
        { hour: 9, count: 3 },
        { hour: 11, count: 2 },
        { hour: 12, count: 4 },
        { hour: 13, count: 3 }
      ],
      interceptionsLog: [
        { id: 'int_1', timestamp: Date.now() - 3600000, trigger: 'Soft Warning', count: 10, result: 'Acknowledged' },
        { id: 'int_2', timestamp: Date.now() - 1800000, trigger: '15s Breath Gate', count: 15, result: 'Completed' }
      ]
    };

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return defaultState;
      return { ...defaultState, ...JSON.parse(saved) };
    } catch (e) {
      return defaultState;
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {}
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(event, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(event, payload);
      } catch (err) {}
    });
  }

  recordSwipe(reelCategory = REEL_CATEGORIES.BRAINROT) {
    const nextTotal = this.state.totalReelsToday + 1;
    const additionalTimeMs = 45000; // 45 seconds average reel viewing time
    const nextDuration = this.state.doomscrollDurationMs + additionalTimeMs;
    const minutes = nextDuration / 60000;
    const velocity = Number((nextTotal / Math.max(1, minutes)).toFixed(1));

    let risk = 'low';
    if (nextTotal >= this.state.dailyTargetBudget) risk = 'critical';
    else if (nextTotal >= this.state.dailyTargetBudget * 0.75) risk = 'high';
    else if (nextTotal >= 10) risk = 'moderate';

    this.state = {
      ...this.state,
      totalReelsToday: nextTotal,
      doomscrollDurationMs: nextDuration,
      swipesPerMinute: velocity,
      currentRiskState: risk
    };

    this.saveState();
    this.notify(REELS_ENGINE_EVENTS.REEL_SCROLLED, this.state);

    // Trigger interventions
    if (nextTotal === 10) {
      this.notify(REELS_ENGINE_EVENTS.TIER1_WARNING, { count: nextTotal, velocity });
    } else if (nextTotal === 15 || (nextTotal > 15 && nextTotal % 10 === 0)) {
      this.notify(REELS_ENGINE_EVENTS.TIER2_BREATH, { count: nextTotal, velocity });
    } else if (nextTotal >= this.state.dailyTargetBudget) {
      this.notify(REELS_ENGINE_EVENTS.TIER3_LOCKOUT, { count: nextTotal, budget: this.state.dailyTargetBudget });
    }

    return this.state;
  }

  resetToday() {
    this.state = {
      ...this.state,
      totalReelsToday: 0,
      doomscrollDurationMs: 0,
      swipesPerMinute: 0,
      currentRiskState: 'low'
    };
    this.saveState();
    this.notify(REELS_ENGINE_EVENTS.REEL_SCROLLED, this.state);
    return this.state;
  }

  setBudget(newBudget) {
    this.state = {
      ...this.state,
      dailyTargetBudget: Math.max(0, newBudget)
    };
    this.saveState();
    this.notify(REELS_ENGINE_EVENTS.REEL_SCROLLED, this.state);
    return this.state;
  }

  getAttentionIntegrityScore() {
    // 0 to 100 attention score
    const budget = this.state.dailyTargetBudget || 25;
    const consumed = this.state.totalReelsToday;
    const ratio = Math.max(0, 1 - (consumed / budget));
    return Math.round(ratio * 100);
  }

  getMilestones() {
    return this.state.milestones;
  }
}

export const brainpalReelsEngine = new BrainPalEngine();
