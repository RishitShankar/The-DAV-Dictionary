// DAVDixence Scholastic Gamification & Level Progression Engine
// Manages Student XP, Levels, Daily Study Streaks, Achievement Badges, and House Points

const STORAGE_KEY = 'dav_scholastic_gamification_v1';

const DEFAULT_STATE = {
  xp: 1450,
  level: 4,
  levelTitle: 'Senior Scholar',
  streakDays: 7,
  lastStudyDate: new Date().toISOString().split('T')[0],
  streakFreezes: 2,
  house: 'Hansraj', // 'Dayanand' | 'Hansraj' | 'Shraddhanand' | 'Virjanand'
  housePoints: 340,
  badges: [
    { id: 'first_login', title: 'Campus Pioneer', icon: 'Rocket', unlockedAt: '2026-11-01', desc: 'First entry into DAVDixence' },
    { id: 'math_pro', title: 'Pythagoras Master', icon: 'Divide', unlockedAt: '2026-11-05', desc: 'Mastered 20+ Geometry & Algebra concepts' },
    { id: 'streak_7', title: 'Dedication Flame', icon: 'Flame', unlockedAt: '2026-11-10', desc: 'Maintained a 7-day study streak' }
  ],
  completedQuests: ['daily_mcq', 'formula_check']
};

export const LEVEL_TIERS = [
  { level: 1, minXp: 0, title: 'Novice DAVian', badge: 'Iron' },
  { level: 2, minXp: 300, title: 'Junior Scholar', badge: 'Bronze' },
  { level: 3, minXp: 800, title: 'Academic Explorer', badge: 'Silver' },
  { level: 4, minXp: 1400, title: 'Senior Scholar', badge: 'Gold' },
  { level: 5, minXp: 2200, title: 'Olympiad Contender', badge: 'Platinum' },
  { level: 6, minXp: 3500, title: 'DAV Legend', badge: 'Diamond' },
  { level: 7, minXp: 5000, title: 'Head Boy Laureate', badge: 'Cosmic Gold' }
];

let listeners = [];

export function getGamificationState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    return DEFAULT_STATE;
  }
}

export function saveGamificationState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    listeners.forEach(fn => fn(state));
  } catch (e) {}
}

export function subscribeToGamification(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function addScholasticXp(amount, reason = 'Study Activity') {
  const current = getGamificationState();
  const newXp = current.xp + amount;
  
  // Check level up
  let newLevel = current.level;
  let newTitle = current.levelTitle;
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (newXp >= LEVEL_TIERS[i].minXp) {
      newLevel = LEVEL_TIERS[i].level;
      newTitle = LEVEL_TIERS[i].title;
      break;
    }
  }

  const updated = {
    ...current,
    xp: newXp,
    level: newLevel,
    levelTitle: newTitle,
    housePoints: current.housePoints + Math.round(amount / 2)
  };

  saveGamificationState(updated);
  return { updated, leveledUp: newLevel > current.level };
}

export function recordDailyStudySession() {
  const current = getGamificationState();
  const today = new Date().toISOString().split('T')[0];
  
  if (current.lastStudyDate === today) {
    return current;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = current.streakDays;

  if (current.lastStudyDate === yesterday) {
    newStreak += 1;
  } else if (current.lastStudyDate !== today) {
    // Check if streak freeze was available
    if (current.streakFreezes > 0) {
      // Consume freeze
      current.streakFreezes -= 1;
      newStreak += 1;
    } else {
      newStreak = 1;
    }
  }

  const updated = {
    ...current,
    streakDays: newStreak,
    lastStudyDate: today
  };

  saveGamificationState(updated);
  return updated;
}
