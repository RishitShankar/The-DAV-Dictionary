// Official Geographic, Weather, Academic & Fleet Data for Section 7: Kids Fun & Gadgets Suite
// Principal: Shri Anil Kumar Singh • Head Boy: Rishit Shankar
// Exact Destination: 492F+563, Khabra, Muzaffarpur, Bihar 843113

export const DAV_KHABRA_COORDINATES = {
  name: 'D.A.V. Public School, Khabra',
  campus: 'Khabra Campus, Muzaffarpur, Bihar',
  plusCode: '492F+563, Khabra, Muzaffarpur, Bihar 843113',
  address: '492F+563, Khabra, Muzaffarpur, Bihar 843113',
  lat: 26.0730,
  lng: 85.3735,
  pincode: '843113',
  principal: 'Shri Anil Kumar Singh',
  headBoy: 'Rishit Shankar (Class 8-D, Roll 25)',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=492F%2B563,+Khabra,+Muzaffarpur,+Bihar+843113',
  directionsBaseUrl: 'https://www.google.com/maps/dir/?api=1&destination=492F%2B563,+Khabra,+Muzaffarpur,+Bihar+843113&travelmode=driving&dir_action=navigate'
};

// Popular preset locations in Muzaffarpur & Bihar
export const PRESET_STARTING_LOCATIONS = [
  {
    id: 'muz_brahmpura',
    name: 'Brahmpura / Maa Tara Biryani (NH-22)',
    area: 'NH-22 Corridor, Muzaffarpur',
    lat: 26.1080,
    lng: 85.3680,
    roadKm: 4.1,
    busMins: 10,
    carMins: 8,
    bikeMins: 18,
    walkMins: 50,
    emoji: '🛣️'
  },
  {
    id: 'muz_station',
    name: 'Muzaffarpur Railway Junction',
    area: 'Station Road, Muzaffarpur',
    lat: 26.1226,
    lng: 85.3906,
    roadKm: 7.5,
    busMins: 18,
    carMins: 14,
    bikeMins: 24,
    walkMins: 90,
    emoji: '🚆'
  },
  {
    id: 'zero_mile',
    name: 'Zero Mile Chowk',
    area: 'NH-28 Intersection, Muzaffarpur',
    lat: 26.1310,
    lng: 85.4120,
    roadKm: 6.8,
    busMins: 15,
    carMins: 12,
    bikeMins: 20,
    walkMins: 80,
    emoji: '🚦'
  },
  {
    id: 'mithanpura',
    name: 'Mithanpura Chowk',
    area: 'Club Road, Muzaffarpur',
    lat: 26.1180,
    lng: 85.3850,
    roadKm: 5.4,
    busMins: 12,
    carMins: 10,
    bikeMins: 16,
    walkMins: 65,
    emoji: '🏬'
  },
  {
    id: 'ramdayalu',
    name: 'Ramdayalu Nagar',
    area: 'Hajipur Road, Muzaffarpur',
    lat: 26.0950,
    lng: 85.3780,
    roadKm: 3.2,
    busMins: 8,
    carMins: 6,
    bikeMins: 12,
    walkMins: 38,
    emoji: '🏘️'
  },
  {
    id: 'gobarsahi',
    name: 'Gobarsahi Chowk',
    area: 'NH-28 Bypass, Muzaffarpur',
    lat: 26.1020,
    lng: 85.3610,
    roadKm: 4.5,
    busMins: 10,
    carMins: 8,
    bikeMins: 15,
    walkMins: 55,
    emoji: '🏙️'
  },
  {
    id: 'bhagwanpur',
    name: 'Bhagwanpur Chowk',
    area: 'Rewa Road, Muzaffarpur',
    lat: 26.1380,
    lng: 85.3620,
    roadKm: 8.9,
    busMins: 20,
    carMins: 16,
    bikeMins: 28,
    walkMins: 105,
    emoji: '🚏'
  },
  {
    id: 'patna',
    name: 'Patna City (Capital Hub)',
    area: 'Gandhi Maidan / Patna Jn',
    lat: 25.6093,
    lng: 85.1235,
    roadKm: 76.0,
    busMins: 130,
    carMins: 95,
    bikeMins: 210,
    walkMins: 920,
    emoji: '🏛️'
  }
];

// Principal Anil Kumar Singh's Official DAV Khabra Bus Fleet Database
export const DAV_BUS_FLEET = [
  {
    busId: 'BUS-01',
    password: 'dav123',
    busNumber: 'Bus No. 01',
    nickName: 'Golden Eagle Express',
    colorTheme: 'from-amber-500 to-yellow-600',
    accentColor: '#f59e0b',
    plateNumber: 'BR-06-P-8842',
    model: 'Tata Starbus 42-Seater (School Edition)',
    driverName: 'Rajesh Kumar Singh',
    driverPhone: '+91 98350 12345',
    attendantName: 'Manoj Pandey',
    attendantPhone: '+91 91234 56789',
    routeTitle: 'Ramdayalu ➔ Aghoria Bazar ➔ Mithanpura ➔ DAV Khabra',
    currentStatus: 'moving',
    currentSpeed: 38,
    heading: 'North-East towards Khabra',
    currentLocationName: 'Passing Aghoria Bazar Chowk (Near Central Bank)',
    currentLat: 26.1142,
    currentLng: 85.3725,
    destinationDistanceKm: 4.8,
    etaMinutes: 12,
    kidsOnboard: 38,
    totalCapacity: 42,
    cctvStatus: 'Active (4 Cameras Recording)',
    speedGovernor: 'Active (Max 40 km/h)',
    acStatus: 'Air Cooled & Ventilated',
    firstAidKit: 'Inspected Today 07:15 AM',
    stops: [
      { name: 'Ramdayalu Nagar (Origin)', time: '06:45 AM', completed: true },
      { name: 'Aghoria Bazar (Stop 2)', time: '07:02 AM', completed: true },
      { name: 'Mithanpura Petrol Pump (Stop 3)', time: '07:15 AM', completed: false, isNext: true },
      { name: 'Zero Mile Turn (Stop 4)', time: '07:25 AM', completed: false },
      { name: 'Khabra Bakhri Chowk (Stop 5)', time: '07:32 AM', completed: false },
      { name: 'D.A.V. Public School Khabra Campus', time: '07:40 AM', completed: false, isFinal: true }
    ]
  },
  {
    busId: 'BUS-02',
    password: 'dav123',
    busNumber: 'Bus No. 02',
    nickName: 'Blue Star Falcon Cruiser',
    colorTheme: 'from-blue-500 to-indigo-600',
    accentColor: '#3b82f6',
    plateNumber: 'BR-06-PA-1920',
    model: 'Eicher Skyline Pro 44-Seater',
    driverName: 'Dharmendra Yadav',
    driverPhone: '+91 94310 98765',
    attendantName: 'Rakesh Sharma',
    attendantPhone: '+91 98765 43210',
    routeTitle: 'Zero Mile ➔ Mirzapur ➔ Bakhri ➔ DAV Khabra',
    currentStatus: 'moving',
    currentSpeed: 35,
    heading: 'South-East towards Khabra Gates',
    currentLocationName: 'Crossing Mirzapur Main Road (1.4 km from School)',
    currentLat: 26.0980,
    currentLng: 85.3890,
    destinationDistanceKm: 2.1,
    etaMinutes: 5,
    kidsOnboard: 41,
    totalCapacity: 44,
    cctvStatus: 'Active (3 Cameras Recording)',
    speedGovernor: 'Active (Max 40 km/h)',
    acStatus: 'Full Air-Conditioned',
    firstAidKit: 'Inspected Today 07:00 AM',
    stops: [
      { name: 'Zero Mile Chowk (Origin)', time: '07:05 AM', completed: true },
      { name: 'Bochahan Road Turn (Stop 2)', time: '07:18 AM', completed: true },
      { name: 'Mirzapur Village Crossing (Stop 3)', time: '07:28 AM', completed: true },
      { name: 'Khabra Gate (Stop 4)', time: '07:34 AM', completed: false, isNext: true },
      { name: 'D.A.V. Public School Khabra Campus', time: '07:40 AM', completed: false, isFinal: true }
    ]
  },
  {
    busId: 'BUS-03',
    password: 'dav123',
    busNumber: 'Bus No. 03',
    nickName: 'Yellow Tiger School Rocket',
    colorTheme: 'from-orange-500 to-amber-600',
    accentColor: '#f97316',
    plateNumber: 'BR-06-PC-4021',
    model: 'Ashok Leyland Sunshine 40-Seater',
    driverName: 'Sunil Kumar Verma',
    driverPhone: '+91 98012 34567',
    attendantName: 'Deepak Singh',
    attendantPhone: '+91 93041 23456',
    routeTitle: 'Gobarsahi ➔ Bhagwanpur ➔ Saraiya Ganj ➔ DAV Khabra',
    currentStatus: 'stopped',
    currentSpeed: 0,
    heading: 'Boarding students at Stop 3',
    currentLocationName: 'Stopped at Bhagwanpur Chowk (Boarding Students)',
    currentLat: 26.1380,
    currentLng: 85.3620,
    destinationDistanceKm: 8.9,
    etaMinutes: 20,
    kidsOnboard: 32,
    totalCapacity: 40,
    cctvStatus: 'Active (Full HD Dual Feed)',
    speedGovernor: 'Active (Max 40 km/h)',
    acStatus: 'Air Cooled & Fresh Air Purifier',
    firstAidKit: 'Certified Medical Grade Kit',
    stops: [
      { name: 'Gobarsahi Main Gate (Origin)', time: '06:40 AM', completed: true },
      { name: 'Bhagwanpur Chowk (Stop 2)', time: '07:00 AM', completed: false, isNext: true },
      { name: 'Saraiya Ganj Tower (Stop 3)', time: '07:15 AM', completed: false },
      { name: 'Zero Mile Flyover (Stop 4)', time: '07:33 AM', completed: false },
      { name: 'D.A.V. Public School Khabra Campus', time: '07:42 AM', completed: false, isFinal: true }
    ]
  },
  {
    busId: 'BUS-04',
    password: 'dav123',
    busNumber: 'Bus No. 04',
    nickName: 'Green Rocket Superliner',
    colorTheme: 'from-emerald-500 to-teal-600',
    accentColor: '#10b981',
    plateNumber: 'BR-06-PD-7719',
    model: 'Tata Marcopolo 42-Seater',
    driverName: 'Ajay Thakur',
    driverPhone: '+91 97711 55667',
    attendantName: 'Santosh Kumar',
    attendantPhone: '+91 94302 11223',
    routeTitle: 'Muzaffarpur Jn ➔ Kalyani ➔ Bela Industrial ➔ DAV Khabra',
    currentStatus: 'moving',
    currentSpeed: 32,
    heading: 'Eastbound towards Khabra',
    currentLocationName: 'Approaching Bela Industrial Area (Smooth Traffic)',
    currentLat: 26.1150,
    currentLng: 85.4200,
    destinationDistanceKm: 3.5,
    etaMinutes: 8,
    kidsOnboard: 40,
    totalCapacity: 42,
    cctvStatus: 'Active (High Dynamic Range)',
    speedGovernor: 'Active (Max 40 km/h)',
    acStatus: 'Air Conditioned & HEPA Filtered',
    firstAidKit: 'Inspected Today 07:10 AM',
    stops: [
      { name: 'Muzaffarpur Jn Gate (Origin)', time: '06:50 AM', completed: true },
      { name: 'Kalyani Chowk (Stop 2)', time: '07:05 AM', completed: true },
      { name: 'Bela Industrial Estate (Stop 3)', time: '07:20 AM', completed: true },
      { name: 'D.A.V. Public School Khabra Campus', time: '07:40 AM', completed: false, isFinal: true }
    ]
  },
  {
    busId: 'BUS-05',
    password: 'dav123',
    busNumber: 'Bus No. 05',
    nickName: 'Junior Little Champ Shuttle (LKG–Class 2)',
    colorTheme: 'from-purple-500 to-pink-600',
    accentColor: '#a855f7',
    plateNumber: 'BR-06-PE-3312',
    model: 'Force Traveller AC Mini-Coach (30 Seater)',
    driverName: 'Vikash Jha',
    driverPhone: '+91 91223 34455',
    attendantName: 'Amit Ray & Sister Pushpa',
    attendantPhone: '+91 93860 99881',
    routeTitle: 'Maripur ➔ Kanti Colony ➔ Bakhri ➔ DAV Khabra',
    currentStatus: 'moving',
    currentSpeed: 28,
    heading: 'Careful gentle speed for kindergarteners',
    currentLocationName: 'Cruising past Kanti Road (All little ones safely buckled)',
    currentLat: 26.1260,
    currentLng: 85.3450,
    destinationDistanceKm: 6.5,
    etaMinutes: 15,
    kidsOnboard: 28,
    totalCapacity: 30,
    cctvStatus: 'Active (All Seats Visible)',
    speedGovernor: 'Active (Max 35 km/h Kid Safe)',
    acStatus: 'Baby-Friendly Climate Controlled (24°C)',
    firstAidKit: 'Pediatric First Aid & Motion Sickness Care',
    stops: [
      { name: 'Maripur Overbridge (Origin)', time: '06:55 AM', completed: true },
      { name: 'Kanti Road Corner (Stop 2)', time: '07:10 AM', completed: true },
      { name: 'Damodarpur Crossing (Stop 3)', time: '07:22 AM', completed: false, isNext: true },
      { name: 'D.A.V. Public School Khabra Campus', time: '07:42 AM', completed: false, isFinal: true }
    ]
  }
];

// Official DAV School Events & Holidays Database for Calendar
export const DAV_SCHOOL_CALENDAR_EVENTS = [
  { date: '2026-01-26', title: 'Republic Day Celebration 🇮🇳', type: 'holiday', icon: '🇮🇳' },
  { date: '2026-02-15', title: 'Maharshi Dayanand Saraswati Jayanti 🕉️', type: 'event', icon: '🕉️' },
  { date: '2026-03-04', title: 'Holi Festival Celebration 🎨', type: 'holiday', icon: '🎨' },
  { date: '2026-04-19', title: 'Mahatma Hansraj Birthday 🌟', type: 'event', icon: '🌟' },
  { date: '2026-05-15', title: 'DAV Summer Vacation Begins ☀️', type: 'holiday', icon: '☀️' },
  { date: '2026-06-18', title: 'School Reopens after Summer Break 🎒', type: 'event', icon: '🎒' },
  { date: '2026-08-15', title: 'Independence Day & Flag Hoisting 🇮🇳', type: 'event', icon: '🇮🇳' },
  { date: '2026-09-05', title: 'Teachers Day Celebration 👨‍🏫', type: 'event', icon: '👨‍🏫' },
  { date: '2026-09-18', title: 'DAV Half-Yearly Term Exams 📝', type: 'exam', icon: '📝' },
  { date: '2026-10-02', title: 'Gandhi Jayanti 🕊️', type: 'holiday', icon: '🕊️' },
  { date: '2026-10-20', title: 'Durga Puja & Dussehra Vacation 🪔', type: 'holiday', icon: '🪔' },
  { date: '2026-11-08', title: 'Diwali & Chhath Puja Holidays 🎆', type: 'holiday', icon: '🎆' },
  { date: '2026-11-14', title: 'Childrens Day Sports Gala 🏆', type: 'event', icon: '🏆' },
  { date: '2026-12-25', title: 'Christmas Holiday 🎄', type: 'holiday', icon: '🎄' }
];

// Decode Open-Meteo Weather Codes
export function decodeWeatherCode(code) {
  if (code === 0) return { label: 'Clear Sky / Sunny', icon: '☀️', mood: 'Perfect day for outdoor games!' };
  if (code === 1 || code === 2) return { label: 'Partly Cloudy', icon: '⛅', mood: 'Nice pleasant weather!' };
  if (code === 3) return { label: 'Overcast Clouds', icon: '☁️', mood: 'Cool and breezy today!' };
  if (code === 45 || code === 48) return { label: 'Misty / Foggy', icon: '🌫️', mood: 'Drive safe on roads!' };
  if (code >= 51 && code <= 55) return { label: 'Light Drizzle', icon: '🌦️', mood: 'Carry your small umbrella!' };
  if (code >= 61 && code <= 65) return { label: 'Rain Showers', icon: '🌧️', mood: 'Rainy day fun at school!' };
  if (code >= 80 && code <= 82) return { label: 'Heavy Rain Showers', icon: '⛈️', mood: 'Indoor games time!' };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', icon: '⚡', mood: 'Stay safe indoors!' };
  return { label: 'Pleasant & Mild', icon: '🌤️', mood: 'Have a great day!' };
}

// Calculate distance in KM using Haversine formula
export function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightKm = R * c;
  // Road distance is typically ~1.25x of straight line in Muzaffarpur roads
  const roadKm = Math.max(0.5, Math.round(straightKm * 1.25 * 10) / 10);
  return roadKm;
}

// Built-in Pure Web Audio API Sound Synthesizer (Zero external audio files required!)
export class KidSoundFX {
  static ctx = null;

  static init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  static playHorn() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      [0, 0.18].forEach(delay => {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(370, t + delay);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(466, t + delay);

        gain.gain.setValueAtTime(0, t + delay);
        gain.gain.linearRampToValueAtTime(0.2, t + delay + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.14);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(t + delay);
        osc2.start(t + delay);
        osc1.stop(t + delay + 0.15);
        osc2.stop(t + delay + 0.15);
      });
    } catch (e) {}
  }

  static playDing() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + 0.15);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.35);
    } catch (e) {}
  }

  static playVictory() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const t = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0.18, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  static playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.06);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    } catch (e) {}
  }

  static playBeep() {
    try {
      this.init();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, t);

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch (e) {}
  }
}
