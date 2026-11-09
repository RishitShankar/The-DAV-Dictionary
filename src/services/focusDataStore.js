/**
 * DAV Digital Focus & Wellbeing Engine - Data Store & Audio Synthesis
 * Complete state persistence, screen time tracking, BrainPal reels engine,
 * app blocking rules, study schedules, focus groups, and Web Audio synthesizers.
 */

const STORAGE_KEYS = {
  SCREEN_TIME: 'dav_focus_screen_time_v2',
  REELS_TRACKER: 'dav_focus_brainpal_reels_v2',
  APP_BLOCKS: 'dav_focus_app_blocks_v2',
  SCHEDULES: 'dav_focus_schedules_v2',
  GROUPS: 'dav_focus_groups_v2',
  STRICT_SHIELD: 'dav_focus_strict_shield_v2',
  NOTIFICATIONS: 'dav_focus_notifications_v2',
  CURRENT_SESSION: 'dav_focus_current_session_v2'
};

// --------------------------------------------------------------------------
// Web Audio API Synthesizer for Ambient Study Sounds
// --------------------------------------------------------------------------
class AmbientAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.activeNodes = [];
    this.currentTrack = null;
    this.masterGain = null;
    this.volume = 0.5;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
    }
  }

  stopAll() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.activeNodes = [];
    this.currentTrack = null;
  }

  playTrack(trackId) {
    this.init();
    if (!this.audioCtx) return false;
    this.stopAll();

    this.currentTrack = trackId;
    const ctx = this.audioCtx;

    try {
      if (trackId === 'binaural_432') {
        // Dual sine oscillators for 432Hz deep focus alpha wave (432Hz left, 440Hz right = 8Hz alpha beat)
        const oscL = ctx.createOscillator();
        const oscR = ctx.createOscillator();
        const panL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const panR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const gain = ctx.createGain();

        oscL.type = 'sine';
        oscL.frequency.setValueAtTime(432, ctx.currentTime);
        oscR.type = 'sine';
        oscR.frequency.setValueAtTime(440, ctx.currentTime);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);

        if (panL && panR) {
          panL.pan.setValueAtTime(-0.8, ctx.currentTime);
          panR.pan.setValueAtTime(0.8, ctx.currentTime);
          oscL.connect(panL);
          panL.connect(gain);
          oscR.connect(panR);
          panR.connect(gain);
        } else {
          oscL.connect(gain);
          oscR.connect(gain);
        }

        gain.connect(this.masterGain);
        oscL.start();
        oscR.start();
        this.activeNodes.push(oscL, oscR, gain);
        return true;
      }

      if (trackId === 'rain') {
        // Pink noise filtered through lowpass with subtle modulations
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.35, ctx.currentTime);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start();
        this.activeNodes.push(noise, filter, gain);
        return true;
      }

      if (trackId === 'white_noise') {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.12;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.25, ctx.currentTime);

        source.connect(gain);
        gain.connect(this.masterGain);
        source.start();
        this.activeNodes.push(source, gain);
        return true;
      }

      if (trackId === 'zen_bowl') {
        // Tibetan bowl harmonic chime
        const playChime = () => {
          if (!this.currentTrack || this.currentTrack !== 'zen_bowl') return;
          const fund = 280;
          const harmonics = [1, 2.76, 5.4, 8.9];
          const gains = [0.4, 0.2, 0.1, 0.05];

          harmonics.forEach((h, idx) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(fund * h, ctx.currentTime);

            g.gain.setValueAtTime(gains[idx], ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5);

            osc.connect(g);
            g.connect(this.masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 6.0);
            this.activeNodes.push(osc, g);
          });
        };

        playChime();
        const intervalId = setInterval(() => {
          if (this.currentTrack === 'zen_bowl') {
            playChime();
          } else {
            clearInterval(intervalId);
          }
        }, 8000);
        return true;
      }

      return false;
    } catch (err) {
      console.warn('Audio synthesis failed:', err);
      return false;
    }
  }

  playBellChime() {
    this.init();
    if (!this.audioCtx) return;
    const ctx = this.audioCtx;
    try {
      const freqs = [528, 1056, 1584];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        gain.gain.setValueAtTime(0.2 / (i + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 2.5);
      });
    } catch (e) {}
  }
}

export const ambientAudio = new AmbientAudioEngine();

// --------------------------------------------------------------------------
// Default Initial Data Models
// --------------------------------------------------------------------------

const DEFAULT_SCREEN_TIME = {
  lastScanned: new Date().toISOString(),
  totalScreenTimeMinutes: 254, // 4h 14m
  usefulMinutes: 168,          // 2h 48m
  distractedMinutes: 86,       // 1h 26m
  devicePickups: 48,
  firstPickup: '06:15 AM',
  longestFocusSessionMinutes: 52,
  hourlyUsage: [
    { hour: '00', useful: 0, distracted: 0 },
    { hour: '01', useful: 0, distracted: 0 },
    { hour: '02', useful: 0, distracted: 0 },
    { hour: '03', useful: 0, distracted: 0 },
    { hour: '04', useful: 0, distracted: 0 },
    { hour: '05', useful: 0, distracted: 0 },
    { hour: '06', useful: 12, distracted: 5 },
    { hour: '07', useful: 24, distracted: 8 },
    { hour: '08', useful: 35, distracted: 10 },
    { hour: '09', useful: 45, distracted: 6 },
    { hour: '10', useful: 20, distracted: 14 },
    { hour: '11', useful: 18, distracted: 12 },
    { hour: '12', useful: 14, distracted: 31 },
    { hour: '13', useful: 0, distracted: 0 },
    { hour: '14', useful: 0, distracted: 0 },
    { hour: '15', useful: 0, distracted: 0 },
    { hour: '16', useful: 0, distracted: 0 },
    { hour: '17', useful: 0, distracted: 0 },
    { hour: '18', useful: 0, distracted: 0 },
    { hour: '19', useful: 0, distracted: 0 },
    { hour: '20', useful: 0, distracted: 0 },
    { hour: '21', useful: 0, distracted: 0 },
    { hour: '22', useful: 0, distracted: 0 },
    { hour: '23', useful: 0, distracted: 0 }
  ],
  appUsageList: [
    { id: 'dav_dict', name: 'DAV Smart Portal', icon: 'BookOpen', category: 'useful', minutes: 82, pickups: 12, limitMinutes: 0 },
    { id: 'notion', name: 'Notion Study Notes', icon: 'FileText', category: 'useful', minutes: 54, pickups: 8, limitMinutes: 0 },
    { id: 'youtube', name: 'YouTube', icon: 'Youtube', category: 'distracted', minutes: 46, pickups: 14, limitMinutes: 60 },
    { id: 'instagram', name: 'Instagram & Reels', icon: 'Instagram', category: 'distracted', minutes: 28, pickups: 9, limitMinutes: 30 },
    { id: 'whatsapp', name: 'WhatsApp', icon: 'MessageCircle', category: 'distracted', minutes: 22, pickups: 18, limitMinutes: 40 },
    { id: 'chrome', name: 'Chrome Browser', icon: 'Globe', category: 'mixed', minutes: 22, pickups: 7, limitMinutes: 90 }
  ]
};

const DEFAULT_REELS_TRACKER = {
  todayReelsWatched: 12,
  dailyReelsBudget: 25,
  totalDoomscrollMinutes: 9.6,
  doomscrollVelocity: 1.8, // reels/minute
  riskLevel: 'moderate',    // low | moderate | high | danger
  tier1WarningsTriggered: 1,
  tier2BreathsCompleted: 0,
  hardLockoutActive: false,
  hourlyReels: [
    { hour: '07:00', count: 2 },
    { hour: '09:00', count: 3 },
    { hour: '11:00', count: 2 },
    { hour: '12:30', count: 5 }
  ],
  reelsFeedSimulator: [
    {
      id: 'r1',
      creator: '@physics_galaxy',
      title: 'Rotational Dynamics in 60 Seconds! ⚡',
      type: 'study',
      views: '420K',
      sound: 'Original Audio - Physics Galaxy',
      color: 'from-blue-900 to-indigo-950',
      description: 'Understanding moment of inertia about perpendicular axis with real world sphere example.'
    },
    {
      id: 'r2',
      creator: '@brainrot_central',
      title: 'POV: Me trying to study 5 min before exam 💀😭',
      type: 'brainrot',
      views: '1.2M',
      sound: 'Sigma Trollface Phonk',
      color: 'from-red-950 to-stone-950',
      description: 'Literally opened the book and forgot how to read English lmao.'
    },
    {
      id: 'r3',
      creator: '@dav_toppers',
      title: 'How I scored 98.4% in CBSE Class 10 - Daily Timetable',
      type: 'study',
      views: '89K',
      sound: 'Study Lofi Chill - DAV Beats',
      color: 'from-emerald-950 to-teal-950',
      description: 'Stop scrolling and follow this 3-hour deep focus Pomodoro routine.'
    },
    {
      id: 'r4',
      creator: '@random_memes_24',
      title: 'Bro thought he was him 🤣🤣 #viral #trending',
      type: 'distraction',
      views: '3.4M',
      sound: 'Funny Laugh sound effect',
      color: 'from-amber-950 to-yellow-950',
      description: 'Wait till the very end to see what happens to the cat.'
    },
    {
      id: 'r5',
      creator: '@maths_wizard_dav',
      title: 'Integration by Parts Shortcut - Save 10 Minutes in Exam!',
      type: 'study',
      views: '310K',
      sound: 'Calculus Ambient Synth',
      color: 'from-purple-950 to-slate-950',
      description: 'Tabular integration method explained clearly with algebraic-exponential polynomials.'
    }
  ]
};

const DEFAULT_APP_BLOCKS = {
  searchQuery: '',
  blockedAppsSummary: 6,
  distractingAccordionOpen: true,
  items: [
    {
      id: 'youtube',
      name: 'YouTube',
      iconUrl: 'https://cdn.simpleicons.org/youtube/FF0000',
      blockedCompletely: false,
      blockShorts: true,
      blockHomepage: true,
      studyMode: false,
      dailyLimitMinutes: 100 // 1h 40m
    },
    {
      id: 'chrome',
      name: 'Browser apps',
      iconUrl: 'https://cdn.simpleicons.org/googlechrome/4285F4',
      blockedCompletely: false,
      blockAdultContent: true,
      studyMode: true,
      dailyLimitMinutes: 120
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      iconUrl: 'https://cdn.simpleicons.org/whatsapp/25D366',
      blockedCompletely: false,
      blockShorts: false,
      blockHomepage: false,
      studyMode: false,
      dailyLimitMinutes: 40
    },
    {
      id: 'facebook',
      name: 'Facebook',
      iconUrl: 'https://cdn.simpleicons.org/facebook/1877F2',
      blockedCompletely: true,
      dailyLimitMinutes: 0
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      iconUrl: 'https://cdn.simpleicons.org/flipkart/2874F0',
      blockedCompletely: true,
      dailyLimitMinutes: 0
    },
    {
      id: 'instagram',
      name: 'Instagram',
      iconUrl: 'https://cdn.simpleicons.org/instagram/E4405F',
      blockedCompletely: false,
      blockShorts: true,
      dailyLimitMinutes: 20
    },
    {
      id: 'chess',
      name: 'Chess',
      iconUrl: 'https://cdn.simpleicons.org/chessdotcom/81B64C',
      blockedCompletely: false,
      dailyLimitMinutes: 30
    },
    {
      id: 'jiohotstar',
      name: 'JioHotstar',
      iconUrl: 'https://cdn.simpleicons.org/disneyplus/000000',
      blockedCompletely: false,
      dailyLimitMinutes: 0
    },
    {
      id: 'souledstore',
      name: 'The Souled Store',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/869/869636.png',
      blockedCompletely: false,
      dailyLimitMinutes: 0
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      iconUrl: 'https://cdn.simpleicons.org/snapchat/FFFC00',
      blockedCompletely: false,
      blockShorts: true,
      dailyLimitMinutes: 15
    },
    {
      id: 'meesho',
      name: 'Meesho',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/891/891462.png',
      blockedCompletely: false,
      dailyLimitMinutes: 0
    },
    {
      id: 'amazon',
      name: 'Amazon',
      iconUrl: 'https://cdn.simpleicons.org/amazon/FF9900',
      blockedCompletely: false,
      dailyLimitMinutes: 30
    }
  ],
  shortsBlocks: [
    { id: 'yt_shorts', name: 'YouTube Shorts', isPro: true, blocked: true, icon: 'Play' },
    { id: 'ig_reels', name: 'IG Reels', isPro: true, blocked: true, icon: 'Film' },
    { id: 'snap_spotlight', name: 'Snapchat Spotlight', isPro: true, blocked: true, icon: 'Zap' },
    { id: 'fb_reels', name: 'Facebook Reels', isPro: true, blocked: true, icon: 'Video' }
  ]
};

const DEFAULT_SCHEDULES = [
  {
    id: 'sch_morning',
    title: 'Morning Study',
    timeRange: '06:00 AM - 08:00 AM',
    daysLabel: 'Mon - Fri',
    activeDays: [1, 2, 3, 4, 5],
    enabled: true,
    autoDnd: true,
    blockDistractions: true,
    targetSubject: 'Mathematics & Science'
  },
  {
    id: 'sch_afternoon',
    title: 'Afternoon Deep Session',
    timeRange: '02:00 PM - 04:30 PM',
    daysLabel: 'Mon - Sat',
    activeDays: [1, 2, 3, 4, 5, 6],
    enabled: true,
    autoDnd: true,
    blockDistractions: true,
    targetSubject: 'English & Social Sciences'
  },
  {
    id: 'sch_evening',
    title: 'Evening Revision & Homework',
    timeRange: '07:00 PM - 09:30 PM',
    daysLabel: 'All Days',
    activeDays: [0, 1, 2, 3, 4, 5, 6],
    enabled: false,
    autoDnd: false,
    blockDistractions: true,
    targetSubject: 'DAV Daily Revision'
  },
  {
    id: 'sch_night',
    title: 'Late Night Sprint',
    timeRange: '10:00 PM - 12:00 AM',
    daysLabel: 'Weekends',
    activeDays: [5, 6],
    enabled: false,
    autoDnd: true,
    blockDistractions: true,
    targetSubject: 'Olympiad & Problem Solving'
  }
];

const DEFAULT_GROUPS = {
  userGroups: [
    {
      id: 'grp_dav_10',
      name: 'DAV Class 10 Toppers Squad',
      activeMembersCount: 28,
      currentlyStudyingCount: 9,
      weeklyGoalHours: 25,
      joined: true,
      description: 'Exclusive study circle for DAV top-scorers preparing for board excellence.'
    }
  ],
  suggestedGroups: [
    {
      id: 'grp_ras',
      name: 'Rajasthan RAS EO RO SI S...',
      membersCount: '4.4k+ members',
      rawCount: 4420,
      joined: false,
      tag: 'Competitive',
      onlineNow: 312
    },
    {
      id: 'grp_class11',
      name: 'Class 11 Commerce',
      membersCount: '3.8k+ members',
      rawCount: 3840,
      joined: false,
      tag: 'Academic',
      onlineNow: 245
    },
    {
      id: 'grp_kcet',
      name: 'KCET/CET 2026 📓✍️',
      membersCount: '3.8k+ members',
      rawCount: 3810,
      joined: false,
      tag: 'Entrance Exam',
      onlineNow: 198
    },
    {
      id: 'grp_jee_neet',
      name: 'DAV JEE & NEET Vanguard',
      membersCount: '6.2k+ members',
      rawCount: 6200,
      joined: false,
      tag: 'Competitive',
      onlineNow: 540
    }
  ]
};

const DEFAULT_STRICT_SHIELD = {
  antiUninstallEnabled: true,
  deviceAdminSimulated: true,
  strictModeActive: false,
  preventDisablePermissions: true,
  emergencyDelaySeconds: 30,
  emergencyUnlockPin: '2026',
  remainingEmergencyUnlocks: 1,
  cooldownUntil: null
};

const DEFAULT_NOTIFICATIONS = {
  batchDeliveryEnabled: true,
  slots: [
    { id: 'morning', label: 'Morning Bundle', time: '08:00 AM', count: 14, released: true },
    { id: 'afternoon', label: 'Afternoon Bundle', time: '02:00 PM', count: 28, released: false },
    { id: 'evening', label: 'Evening Bundle', time: '08:00 PM', count: 41, released: false }
  ],
  whitelist: ['Parents', 'School Teacher', 'DAV Principal Office', 'Emergency Medical'],
  interceptedQueue: [
    { id: 'n1', app: 'Instagram', sender: 'Rohit K.', snippet: 'Sent a reel about cats', time: '11:42 AM' },
    { id: 'n2', app: 'YouTube', sender: 'YouTube', snippet: 'New video from MrBeast', time: '12:15 PM' },
    { id: 'n3', app: 'Snapchat', sender: 'Sneha', snippet: 'New snap received', time: '01:04 PM' }
  ]
};

// --------------------------------------------------------------------------
// Focus Data Store Class (PubSub & Persistence)
// --------------------------------------------------------------------------
class FocusDataStore {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify(eventType, payload) {
    this.subscribers.forEach(cb => {
      try {
        cb(eventType, payload);
      } catch (err) {
        console.error('FocusDataStore subscriber error:', err);
      }
    });
  }

  // Generic Safe Storage Helper
  _load(key, fallback) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return { ...fallback, ...JSON.parse(item) };
    } catch (e) {
      return fallback;
    }
  }

  _save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }

  // --- Screen Time ---
  getScreenTimeData() {
    return this._load(STORAGE_KEYS.SCREEN_TIME, DEFAULT_SCREEN_TIME);
  }

  saveScreenTimeData(data) {
    this._save(STORAGE_KEYS.SCREEN_TIME, data);
    this.notify('screen_time_updated', data);
  }

  simulateScreenTimeScan() {
    const current = this.getScreenTimeData();
    const addUseful = Math.floor(Math.random() * 8) + 2;
    const addDistracted = Math.floor(Math.random() * 4);
    const updated = {
      ...current,
      lastScanned: new Date().toISOString(),
      usefulMinutes: current.usefulMinutes + addUseful,
      distractedMinutes: current.distractedMinutes + addDistracted,
      totalScreenTimeMinutes: current.totalScreenTimeMinutes + addUseful + addDistracted,
      devicePickups: current.devicePickups + 1
    };
    this.saveScreenTimeData(updated);
    return updated;
  }

  // --- BrainPal Reels Tracker ---
  getReelsData() {
    return this._load(STORAGE_KEYS.REELS_TRACKER, DEFAULT_REELS_TRACKER);
  }

  saveReelsData(data) {
    this._save(STORAGE_KEYS.REELS_TRACKER, data);
    this.notify('reels_updated', data);
  }

  incrementReelWatched(reelMeta = {}) {
    const data = this.getReelsData();
    const nextCount = data.todayReelsWatched + 1;
    const nextMinutes = Number((data.totalDoomscrollMinutes + 0.8).toFixed(1));
    const nextVelocity = Number((nextCount / Math.max(1, (nextMinutes / 5))).toFixed(1));

    let riskLevel = 'low';
    if (nextCount >= data.dailyReelsBudget) riskLevel = 'danger';
    else if (nextCount >= data.dailyReelsBudget * 0.7) riskLevel = 'high';
    else if (nextCount >= 8) riskLevel = 'moderate';

    const hardLock = nextCount >= data.dailyReelsBudget;

    const updated = {
      ...data,
      todayReelsWatched: nextCount,
      totalDoomscrollMinutes: nextMinutes,
      doomscrollVelocity: nextVelocity,
      riskLevel,
      hardLockoutActive: hardLock
    };

    this.saveReelsData(updated);

    // Also reflect into screen time distracted pool
    const st = this.getScreenTimeData();
    this.saveScreenTimeData({
      ...st,
      distractedMinutes: st.distractedMinutes + 1,
      totalScreenTimeMinutes: st.totalScreenTimeMinutes + 1
    });

    return updated;
  }

  setDailyReelsBudget(budget) {
    const data = this.getReelsData();
    const updated = {
      ...data,
      dailyReelsBudget: Math.max(0, budget),
      hardLockoutActive: data.todayReelsWatched >= budget
    };
    this.saveReelsData(updated);
    return updated;
  }

  resetDailyReels() {
    const data = this.getReelsData();
    const updated = {
      ...data,
      todayReelsWatched: 0,
      totalDoomscrollMinutes: 0,
      riskLevel: 'low',
      hardLockoutActive: false
    };
    this.saveReelsData(updated);
    return updated;
  }

  // --- App Blocks ---
  getAppBlocks() {
    return this._load(STORAGE_KEYS.APP_BLOCKS, DEFAULT_APP_BLOCKS);
  }

  saveAppBlocks(data) {
    this._save(STORAGE_KEYS.APP_BLOCKS, data);
    this.notify('app_blocks_updated', data);
  }

  toggleAppBlock(appId, field = 'blockedCompletely') {
    const data = this.getAppBlocks();
    const updatedItems = data.items.map(app => {
      if (app.id === appId) {
        return { ...app, [field]: !app[field] };
      }
      return app;
    });
    const blockedCount = updatedItems.filter(i => i.blockedCompletely || i.blockShorts).length;
    const updated = { ...data, items: updatedItems, blockedAppsSummary: blockedCount };
    this.saveAppBlocks(updated);
    return updated;
  }

  setAppDailyLimit(appId, limitMinutes) {
    const data = this.getAppBlocks();
    const updatedItems = data.items.map(app => {
      if (app.id === appId) {
        return { ...app, dailyLimitMinutes: limitMinutes };
      }
      return app;
    });
    const updated = { ...data, items: updatedItems };
    this.saveAppBlocks(updated);
    return updated;
  }

  toggleShortsBlock(shortsId) {
    const data = this.getAppBlocks();
    const updatedShorts = data.shortsBlocks.map(s => {
      if (s.id === shortsId) {
        return { ...s, blocked: !s.blocked };
      }
      return s;
    });
    const updated = { ...data, shortsBlocks: updatedShorts };
    this.saveAppBlocks(updated);
    return updated;
  }

  // --- Schedules ---
  getSchedules() {
    return this._load(STORAGE_KEYS.SCHEDULES, DEFAULT_SCHEDULES);
  }

  saveSchedules(schedules) {
    this._save(STORAGE_KEYS.SCHEDULES, schedules);
    this.notify('schedules_updated', schedules);
  }

  toggleSchedule(scheduleId) {
    const list = this.getSchedules();
    const updated = list.map(s => (s.id === scheduleId ? { ...s, enabled: !s.enabled } : s));
    this.saveSchedules(updated);
    return updated;
  }

  addSchedule(newSchedule) {
    const list = this.getSchedules();
    const updated = [newSchedule, ...list];
    this.saveSchedules(updated);
    return updated;
  }

  // --- Focus Groups ---
  getGroups() {
    return this._load(STORAGE_KEYS.GROUPS, DEFAULT_GROUPS);
  }

  saveGroups(data) {
    this._save(STORAGE_KEYS.GROUPS, data);
    this.notify('groups_updated', data);
  }

  joinGroup(groupId) {
    const data = this.getGroups();
    const target = data.suggestedGroups.find(g => g.id === groupId);
    if (!target) return data;

    const updatedSuggested = data.suggestedGroups.filter(g => g.id !== groupId);
    const newGroup = {
      id: target.id,
      name: target.name,
      activeMembersCount: target.rawCount + 1,
      currentlyStudyingCount: target.onlineNow + 1,
      weeklyGoalHours: 20,
      joined: true,
      description: `Active study squad for ${target.name}. Focus together, rank higher.`
    };
    const updatedUserGroups = [newGroup, ...data.userGroups];
    const updated = { userGroups: updatedUserGroups, suggestedGroups: updatedSuggested };
    this.saveGroups(updated);
    return updated;
  }

  createUserGroup(groupName, weeklyGoalHours = 20) {
    const data = this.getGroups();
    const newGroup = {
      id: `grp_custom_${Date.now()}`,
      name: groupName || 'My Study Circle',
      activeMembersCount: 1,
      currentlyStudyingCount: 1,
      weeklyGoalHours,
      joined: true,
      description: 'Private group created by you for deep study accountability.'
    };
    const updated = { ...data, userGroups: [newGroup, ...data.userGroups] };
    this.saveGroups(updated);
    return updated;
  }

  // --- Strict Shield ---
  getStrictShield() {
    return this._load(STORAGE_KEYS.STRICT_SHIELD, DEFAULT_STRICT_SHIELD);
  }

  saveStrictShield(data) {
    this._save(STORAGE_KEYS.STRICT_SHIELD, data);
    this.notify('strict_shield_updated', data);
  }

  toggleStrictMode() {
    const current = this.getStrictShield();
    const updated = { ...current, strictModeActive: !current.strictModeActive };
    this.saveStrictShield(updated);
    return updated;
  }

  // --- Notifications ---
  getNotifications() {
    return this._load(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS);
  }

  saveNotifications(data) {
    this._save(STORAGE_KEYS.NOTIFICATIONS, data);
    this.notify('notifications_updated', data);
  }

  releaseBatch(slotId) {
    const data = this.getNotifications();
    const updatedSlots = data.slots.map(s => (s.id === slotId ? { ...s, released: true, count: 0 } : s));
    const updated = { ...data, slots: updatedSlots };
    this.saveNotifications(updated);
    return updated;
  }


  // --- 30-Day Monthly Telemetry Generator ---
  getMonthlyTelemetry() {
    const days = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const useful = Math.floor(140 + Math.sin(i * 0.4) * 45 + (i % 5) * 8);
      const distracted = Math.floor(65 + Math.cos(i * 0.3) * 25 - (i > 15 ? 15 : 0));
      const reels = Math.floor(10 + Math.sin(i * 0.5) * 8);
      const pickups = Math.floor(35 + Math.random() * 20);
      days.push({
        date: dateStr,
        dayOfWeek: d.toLocaleDateString('en-US', { weekday: 'short' }),
        usefulMinutes: useful,
        distractedMinutes: Math.max(10, distracted),
        totalMinutes: useful + Math.max(10, distracted),
        reelsWatched: Math.max(0, reels),
        pickups,
        complianceScore: Math.min(100, Math.round((useful / (useful + distracted)) * 100))
      });
    }
    return days;
  }

  // --- Intervention Audit Logs ---
  getInterventionAuditLogs() {
    return [
      { id: 'log_1', timestamp: '2026-11-09T08:15:00Z', type: 'app_launch_intercepted', app: 'Instagram', action: 'Prompted 10s reflection gate', status: 'Blocked' },
      { id: 'log_2', timestamp: '2026-11-09T09:30:00Z', type: 'reels_doomscroll_warning', count: 10, action: 'Soft banner warning displayed', status: 'Acknowledged' },
      { id: 'log_3', timestamp: '2026-11-09T10:45:00Z', type: 'mindfulness_breath_gate', count: 15, action: '15s breathing cycle enforced', status: 'Completed' },
      { id: 'log_4', timestamp: '2026-11-09T11:20:00Z', type: 'anti_uninstall_tamper', action: 'Intercepted package removal trigger', status: 'Shielded' },
      { id: 'log_5', timestamp: '2026-11-09T12:05:00Z', type: 'notification_batch_held', app: 'Snapchat', action: 'Held for 2:00 PM Afternoon Bundle', status: 'Vaulted' }
    ];
  }

  // --- School District Benchmarks ---
  getSchoolDistrictBenchmarks() {
    return {
      districtName: 'DAV College Managing Committee - North Zone',
      averageDailyScreenTimeMinutes: 340, // 5h 40m
      averageDistractedMinutes: 195,     // 3h 15m
      averageUsefulMinutes: 145,         // 2h 25m
      studentPercentile: 94,             // Top 6% in digital wellbeing
      attentionRestorationScore: 'A+ (Elite Focus)'
    };
  }

  // --- Bedtime Phone Usage Analyzer ---
  getBedtimePhoneUsageAnalysis() {
    return {
      bedtimeWindowUsageMinutes: 14, // 10 PM - 6 AM
      blueLightExposureRating: 'Minimal (Protected)',
      circadianDisruptionRisk: 'Low',
      firstPickupMorning: '06:15 AM',
      lastScreenOffNight: '10:24 PM'
    };
  }

  // --- Distraction Index Calculation ---
  calculateDistractionIndex() {
    const st = this.getScreenTimeData();
    const reels = this.getReelsData();
    const useful = st.usefulMinutes || 1;
    const distracted = st.distractedMinutes || 1;
    const ratio = useful / (useful + distracted);
    const reelsPenalty = reels.todayReelsWatched * 0.01;
    const finalScore = Math.max(0, Math.min(100, Math.round((ratio - reelsPenalty) * 100)));
    return {
      score: finalScore,
      rating: finalScore >= 75 ? 'Optimal Flow' : finalScore >= 50 ? 'Moderate Control' : 'High Distraction Risk',
      usefulRatio: Math.round(ratio * 100)
    };
  }

  // --- Export Report as JSON ---
  exportStudentReportJSON(userName = 'Student') {
    const report = {
      user: userName,
      generatedAt: new Date().toISOString(),
      screenTime: this.getScreenTimeData(),
      reelsGuardian: this.getReelsData(),
      appBlocks: this.getAppBlocks(),
      strictShield: this.getStrictShield(),
      benchmarks: this.getSchoolDistrictBenchmarks(),
      distractionIndex: this.calculateDistractionIndex()
    };
    return JSON.stringify(report, null, 2);
  }

  // --- Export Report as CSV ---
  // --- Export Report as CSV ---
  exportStudentReportCSV() {
    const days = this.getMonthlyTelemetry();
    const headers = ['Date', 'Day', 'UsefulMinutes', 'DistractedMinutes', 'TotalMinutes', 'ReelsWatched', 'Pickups', 'ComplianceScore'].join(',') + '\n';
    const rows = days.map(d => [d.date, d.dayOfWeek, d.usefulMinutes, d.distractedMinutes, d.totalMinutes, d.reelsWatched, d.pickups, d.complianceScore + '%'].join(',')).join('\n');
    return headers + rows;
  }

}

export const focusDataStore = new FocusDataStore();
