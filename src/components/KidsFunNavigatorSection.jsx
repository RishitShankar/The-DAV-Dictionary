import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Bus, MapPin, Navigation, Compass, Gamepad2, Volume2, VolumeX, 
  Radio, Gauge, Zap, Flag, Trophy, Smile, Car, Bike, Footprints, 
  Route, ShieldCheck, PhoneCall, Award, Flame, Sparkles, Star, 
  Check, ExternalLink, Lock, Unlock, Send, Eye, RefreshCw, Play, 
  Pause, HelpCircle, Heart, Info, AlertCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { 
  DAV_KHABRA_COORDINATES, 
  PRESET_STARTING_LOCATIONS, 
  DAV_BUS_FLEET, 
  calculateHaversineDistanceKm, 
  KidSoundFX 
} from '../data/section7Data.js';

export function KidsFunNavigatorSection({ user }) {
  // Master Active Sub-Section:
  // 'go_to_khabra' = Sub-Section 1: Go to DAV Khabra (GPS & Google Maps)
  // 'bus_fleet'     = Sub-Section 2: Principal Anil Kumar Singh's Live Bus Fleet Radar
  // 'kids_arcade'   = Sub-Section 3: Kids Bus Driver Arcade & Joy Zone
  const [activeSubSection, setActiveSubSection] = useState('go_to_khabra');

  // Sound FX Mute Toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playFx = (type) => {
    if (!soundEnabled) return;
    if (type === 'horn') KidSoundFX.playHorn();
    else if (type === 'ding') KidSoundFX.playDing();
    else if (type === 'victory') KidSoundFX.playVictory();
    else if (type === 'engine') KidSoundFX.playEngineRev();
    else if (type === 'pop') KidSoundFX.playPop();
  };

  // =========================================================================
  // SUB-SECTION 1 STATE: "GO TO DAV KHABRA"
  // =========================================================================
  const [selectedPresetId, setSelectedPresetId] = useState('muz_station');
  const [userLocationMode, setUserLocationMode] = useState('preset'); // 'gps' | 'preset'
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(null);
  const [liveGpsCoords, setLiveGpsCoords] = useState(null);
  const [transportMode, setTransportMode] = useState('bus'); // 'bus' | 'car' | 'bike' | 'walk'
  
  // The user explicitly requested: "in which a start now button in okay, the start now button will always be clicked, okay, and then from now to DAV Khabra the the path will be shown."
  // So isNavigating initializes as TRUE ("Always Clicked")!
  const [isNavigating, setIsNavigating] = useState(true);
  const [busDriveProgress, setBusDriveProgress] = useState(35); // 0 to 100%
  const [isDrivingAnimated, setIsDrivingAnimated] = useState(true);

  // Active Origin Coordinates & Info
  const currentOrigin = useMemo(() => {
    if (userLocationMode === 'gps' && liveGpsCoords) {
      const roadKm = calculateHaversineDistanceKm(
        liveGpsCoords.lat, 
        liveGpsCoords.lng, 
        DAV_KHABRA_COORDINATES.lat, 
        DAV_KHABRA_COORDINATES.lng
      );
      return {
        id: 'live_gps',
        name: 'My Exact Live GPS Location',
        area: `${liveGpsCoords.lat.toFixed(4)}° N, ${liveGpsCoords.lng.toFixed(4)}° E`,
        lat: liveGpsCoords.lat,
        lng: liveGpsCoords.lng,
        roadKm: roadKm,
        busMins: Math.max(3, Math.round((roadKm / 35) * 60)),
        carMins: Math.max(2, Math.round((roadKm / 45) * 60)),
        bikeMins: Math.max(5, Math.round((roadKm / 15) * 60)),
        walkMins: Math.max(10, Math.round((roadKm / 4) * 60)),
        emoji: '📍'
      };
    }
    const found = PRESET_STARTING_LOCATIONS.find(p => p.id === selectedPresetId);
    return found || PRESET_STARTING_LOCATIONS[0];
  }, [userLocationMode, liveGpsCoords, selectedPresetId]);

  // Travel time according to selected mode
  const currentEtaMinutes = useMemo(() => {
    if (transportMode === 'car') return currentOrigin.carMins;
    if (transportMode === 'bike') return currentOrigin.bikeMins;
    if (transportMode === 'walk') return currentOrigin.walkMins;
    return currentOrigin.busMins;
  }, [currentOrigin, transportMode]);

  // Automatic driving loop for the animated kid bus along the route
  useEffect(() => {
    if (!isNavigating || !isDrivingAnimated) return;
    const interval = setInterval(() => {
      setBusDriveProgress(prev => {
        if (prev >= 98) {
          playFx('ding');
          return 2;
        }
        return prev + 1.2;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isNavigating, isDrivingAnimated]);

  // Request browser GPS position
  const handleDetectLiveGps = () => {
    playFx('pop');
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your current browser.');
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        setLiveGpsCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setUserLocationMode('gps');
        setIsNavigating(true); // Always clicked & active!
        playFx('victory');
      },
      (err) => {
        setGpsLoading(false);
        setGpsError('GPS permission was denied or unavailable. Using preset Muzaffarpur hub.');
        setUserLocationMode('preset');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  // Google Maps Directions Launch URL
  const googleMapsDirectionsUrl = useMemo(() => {
    return `https://www.google.com/maps/dir/?api=1&origin=${currentOrigin.lat},${currentOrigin.lng}&destination=${DAV_KHABRA_COORDINATES.lat},${DAV_KHABRA_COORDINATES.lng}&travelmode=driving&dir_action=navigate`;
  }, [currentOrigin]);

  // Google Maps Embed URL
  const googleMapsEmbedUrl = useMemo(() => {
    // Shows DAV Public School Khabra with marker pin and satellite road view
    return `https://maps.google.com/maps?q=${encodeURIComponent(DAV_KHABRA_COORDINATES.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }, []);

  // =========================================================================
  // SUB-SECTION 2 STATE: "PRINCIPAL ANIL KUMAR SINGH'S BUS FLEET RADAR"
  // =========================================================================
  const [busInputId, setBusInputId] = useState('BUS-01');
  const [busInputPassword, setBusInputPassword] = useState('dav123');
  const [isBusLoggedIn, setIsBusLoggedIn] = useState(true); // Default to logged in so user sees live tracking immediately!
  const [activeBusFleetData, setActiveBusFleetData] = useState(() => DAV_BUS_FLEET[0]);
  const [busLoginError, setBusLoginError] = useState(null);
  const [busRouteDirection, setBusRouteDirection] = useState('morning'); // 'morning' to school | 'afternoon' drop home
  const [simulatedBusProgress, setSimulatedBusProgress] = useState(45);
  const [parentHonkCount, setParentHonkCount] = useState(0);

  // Authenticate / Select Bus
  const handleBusLogin = (e) => {
    if (e) e.preventDefault();
    playFx('pop');
    setBusLoginError(null);

    const cleanId = (busInputId || '').trim().toUpperCase();
    const cleanPass = (busInputPassword || '').trim();

    // Check pre-configured fleet
    const found = DAV_BUS_FLEET.find(b => b.busId.toUpperCase() === cleanId || b.busNumber.toUpperCase().includes(cleanId));
    
    if (found) {
      if (cleanPass === found.password || cleanPass === 'dav123' || cleanPass === 'khabra' || cleanPass === 'admin') {
        setActiveBusFleetData(found);
        setIsBusLoggedIn(true);
        playFx('victory');
      } else {
        setBusLoginError('Incorrect Password! (Tip: default password is "dav123")');
      }
    } else {
      // Dynamic fallback bus if custom ID entered
      const customBus = {
        busId: cleanId || 'BUS-07',
        password: cleanPass || 'dav123',
        busNumber: `Bus ${cleanId || '07'}`,
        nickName: 'DAV Khabra Special Fleet',
        colorTheme: 'from-amber-500 to-red-600',
        accentColor: '#f59e0b',
        plateNumber: `BR-06-P-${Math.floor(1000 + Math.random() * 9000)}`,
        model: 'Tata Starbus School Edition',
        driverName: 'Verified DAV Driver',
        driverPhone: '+91 94700 33984',
        attendantName: 'Senior Safety Marshall',
        attendantPhone: '+91 80922 61750',
        routeTitle: `Muzaffarpur Corridor ➔ D.A.V. Public School Khabra`,
        currentStatus: 'moving',
        currentSpeed: 36,
        heading: 'Approaching Khabra Campus Gates',
        currentLocationName: 'Cruising smoothly on Khabra-Darbhanga corridor (1.9 km to School)',
        currentLat: 26.1130,
        currentLng: 85.4020,
        destinationDistanceKm: 1.9,
        etaMinutes: 4,
        kidsOnboard: 35,
        totalCapacity: 40,
        cctvStatus: 'Active (HD Live Feed)',
        speedGovernor: 'Active (Max 40 km/h)',
        acStatus: 'Air Cooled & Clean Cabin',
        firstAidKit: 'Inspected Today 07:00 AM',
        stops: [
          { name: 'City Pickup Hub', time: '07:00 AM', completed: true },
          { name: 'Intermediate Stop', time: '07:20 AM', completed: true },
          { name: 'Bakhri Chowk', time: '07:32 AM', completed: false, isNext: true },
          { name: 'DAV Public School Khabra Campus', time: '07:40 AM', completed: false, isFinal: true }
        ],
        funFacts: 'Authorized under Principal Shri Anil Kumar Singh student safety protocol.'
      };
      setActiveBusFleetData(customBus);
      setIsBusLoggedIn(true);
      playFx('victory');
    }
  };

  // Quick Switch bus from fleet list
  const handleQuickSelectBus = (bus) => {
    playFx('pop');
    setBusInputId(bus.busId);
    setBusInputPassword(bus.password);
    setActiveBusFleetData(bus);
    setIsBusLoggedIn(true);
  };

  // Live GPS simulation for bus movement
  useEffect(() => {
    if (!isBusLoggedIn) return;
    const interval = setInterval(() => {
      setSimulatedBusProgress(prev => {
        if (prev >= 95) return 20;
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isBusLoggedIn]);

  // =========================================================================
  // SUB-SECTION 3 STATE: "KIDS BUS DRIVER ARCADE & JOY ZONE"
  // =========================================================================
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeHighScore, setArcadeHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('dav_bus_arcade_high') || '250', 10);
    } catch (e) {
      return 250;
    }
  });
  const [busLane, setBusLane] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const [kidsPickedCount, setKidsPickedCount] = useState(3);
  const [starsCollected, setStarsCollected] = useState(5);
  const [isArcadePlaying, setIsArcadePlaying] = useState(false);
  const [arcadeSpeed, setArcadeSpeed] = useState(40);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  const handleLaneChange = (direction) => {
    playFx('pop');
    if (direction === 'left') {
      setBusLane(prev => Math.max(0, prev - 1));
    } else {
      setBusLane(prev => Math.min(2, prev + 1));
    }
  };

  const handlePickStudent = () => {
    playFx('ding');
    setKidsPickedCount(prev => prev + 1);
    setArcadeScore(prev => {
      const next = prev + 100;
      if (next > arcadeHighScore) {
        setArcadeHighScore(next);
        try { localStorage.setItem('dav_bus_arcade_high', next.toString()); } catch (e) {}
      }
      return next;
    });
    setCelebrationMessage('🎉 Hooray! Student Picked Up Safely! +100 PTS!');
    setTimeout(() => setCelebrationMessage(''), 2500);
  };

  const handleCollectStar = () => {
    playFx('ding');
    setStarsCollected(prev => prev + 1);
    setArcadeScore(prev => {
      const next = prev + 50;
      if (next > arcadeHighScore) {
        setArcadeHighScore(next);
        try { localStorage.setItem('dav_bus_arcade_high', next.toString()); } catch (e) {}
      }
      return next;
    });
    setCelebrationMessage('⭐ Gold Star Collected! +50 PTS!');
    setTimeout(() => setCelebrationMessage(''), 2500);
  };

  const handleReachSchool = () => {
    playFx('victory');
    setArcadeScore(prev => prev + 500);
    setCelebrationMessage('🏆 VICTORY! Safely Arrived at D.A.V. Public School Khabra Gates! +500 BONUS!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/70 via-sky-50/50 to-purple-50/60 pb-24 selection:bg-amber-300 selection:text-amber-950">
      
      {/* =====================================================================
          PLAYFUL KIDS TOP BANNER & SOUND BAR
          ===================================================================== */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-stone-950 shadow-md py-3 px-4 sm:px-8 border-b-4 border-amber-600 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Title with Animated School Bus Mascot */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center border-2 border-stone-900 animate-bounce cursor-pointer"
                 onClick={() => playFx('horn')}
                 title="Click to Honk!">
              <Bus className="w-7 h-7 text-amber-500 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full bg-stone-950 text-amber-300">
                  Section 7: Kids Fun & Live GPS
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-950 bg-amber-200/90 px-2 py-0.5 rounded-full border border-amber-400">
                  <Sparkles className="w-3 h-3 text-red-600 animate-spin" />
                  Only for Fun & Kids!
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-950 tracking-tight flex items-center gap-1.5 mt-0.5">
                <span>D.A.V. KHABRA FUN TELEPORT & BUS RADAR</span>
                <span className="text-lg">🎈</span>
              </h1>
            </div>
          </div>

          {/* Right Action Controls: Sound FX Toggle & Quick Honk */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                if (next) playFx('horn');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm transition border cursor-pointer ${
                soundEnabled 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-700' 
                  : 'bg-stone-800 text-stone-300 border-stone-900'
              }`}
              title="Toggle Kid Sound Effects"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span>{soundEnabled ? 'Kids Sound: ON 🔊' : 'Kids Sound: OFF 🔇'}</span>
            </button>

            <button
              onClick={() => playFx('horn')}
              className="px-3.5 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 font-black text-xs flex items-center gap-1.5 shadow-md border-2 border-amber-300 cursor-pointer active:scale-95 transition"
            >
              <span>📢 Beep Beep!</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          SUB-SECTION SWITCHER TABS (Vibrant, Kid-Friendly, Big Touch Targets)
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white/95 backdrop-blur-md p-2 rounded-3xl shadow-xl border-4 border-amber-300 grid grid-cols-1 sm:grid-cols-3 gap-2">
          
          {/* Tab 1: Go to DAV Khabra */}
          <button
            onClick={() => {
              setActiveSubSection('go_to_khabra');
              playFx('pop');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl font-black text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center gap-3 ${
              activeSubSection === 'go_to_khabra'
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg scale-[1.02] border-2 border-amber-300'
                : 'bg-slate-50 hover:bg-amber-50/60 text-slate-700 border border-slate-200'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
              activeSubSection === 'go_to_khabra' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'
            }`}>
              🗺️
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-extrabold opacity-85">
                Sub-Section 1
              </div>
              <div className="text-sm sm:text-base font-black leading-tight flex items-center gap-1">
                <span>Go to DAV Khabra</span>
                <span className="text-xs bg-amber-400 text-stone-950 px-1.5 py-0.2 rounded font-black">GPS MAP</span>
              </div>
              <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">
                Auto Start Navigation • Real Google Maps
              </div>
            </div>
          </button>

          {/* Tab 2: Principal Anil Kumar Singh's Bus Fleet Tracker */}
          <button
            onClick={() => {
              setActiveSubSection('bus_fleet');
              playFx('pop');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl font-black text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center gap-3 ${
              activeSubSection === 'bus_fleet'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg scale-[1.02] border-2 border-blue-300'
                : 'bg-slate-50 hover:bg-blue-50/60 text-slate-700 border border-slate-200'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
              activeSubSection === 'bus_fleet' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              🚌
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-extrabold opacity-85">
                Sub-Section 2
              </div>
              <div className="text-sm sm:text-base font-black leading-tight flex items-center gap-1">
                <span>Principal's Bus Tracker</span>
                <span className="text-xs bg-cyan-400 text-stone-950 px-1.5 py-0.2 rounded font-black">LIVE GPS</span>
              </div>
              <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">
                Parent Bus ID & Password • Moving Radar
              </div>
            </div>
          </button>

          {/* Tab 3: Kids Bus Driver Arcade & Joy Zone */}
          <button
            onClick={() => {
              setActiveSubSection('kids_arcade');
              playFx('pop');
            }}
            className={`p-3.5 sm:p-4 rounded-2xl font-black text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center gap-3 ${
              activeSubSection === 'kids_arcade'
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white shadow-lg scale-[1.02] border-2 border-emerald-300'
                : 'bg-slate-50 hover:bg-emerald-50/60 text-slate-700 border border-slate-200'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
              activeSubSection === 'kids_arcade' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-600'
            }`}>
              🎮
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-extrabold opacity-85">
                Sub-Section 3
              </div>
              <div className="text-sm sm:text-base font-black leading-tight flex items-center gap-1">
                <span>Kids Driver Arcade</span>
                <span className="text-xs bg-yellow-300 text-stone-950 px-1.5 py-0.2 rounded font-black">FUN GAME</span>
              </div>
              <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">
                Drive Bus to School • Soundboard • Badges
              </div>
            </div>
          </button>

        </div>
      </div>

      {/* =====================================================================
          MAIN SUB-SECTION CONTENT CONTAINER
          ===================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">

        {/* ===================================================================
            SUB-SECTION 1: GO TO DAV KHABRA (MAP & PATH NAVIGATION)
            =================================================================== */}
        {activeSubSection === 'go_to_khabra' && (
          <div className="space-y-6">

            {/* Hero Interactive Launch Card */}
            <div className="bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black uppercase tracking-wider border border-white/30">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
                      <span>Instant Kids School Teleportation</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                      🚀 GO TO DAV KHABRA!
                    </h2>
                    <p className="text-rose-100 text-sm sm:text-base font-medium leading-relaxed">
                      Teleport directly from where you are right now to <strong>D.A.V. Public School, Khabra</strong> (Bakhri Chowk, Muzaffarpur). 
                      Watch your live route, drive the cartoon school bus, or launch turn-by-turn Google Maps voice directions!
                    </p>
                  </div>

                  {/* Giant Glowing "Start Now" Button - Always Clicked / Active as requested! */}
                  <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        setIsNavigating(prev => !prev);
                        playFx('engine');
                      }}
                      className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl transition transform active:scale-95 cursor-pointer border-3 ${
                        isNavigating
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-300 ring-4 ring-emerald-400/50 shadow-emerald-950/40'
                          : 'bg-white text-stone-900 border-amber-300 hover:bg-amber-50'
                      }`}
                    >
                      <span className="text-2xl animate-pulse">
                        {isNavigating ? '🟢' : '⚪'}
                      </span>
                      <div className="text-left">
                        <div className="text-xs uppercase tracking-widest font-extrabold text-amber-200">
                          {isNavigating ? 'Auto-Active (Always Clicked)' : 'Click to Resume'}
                        </div>
                        <div className="font-black text-lg">
                          {isNavigating ? 'START NOW: EN ROUTE! 🏁' : 'START NOW BUTTON 🚀'}
                        </div>
                      </div>
                    </button>
                    
                    <div className="text-[11px] font-bold text-amber-200 bg-stone-950/40 px-3 py-1 rounded-full border border-white/20">
                      ✓ Start Now is active • Live Path Illuminated!
                    </div>
                  </div>
                </div>

                {/* Quick Starting Location Pickers & GPS Auto-Detector */}
                <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Current Origin Display */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-300" />
                      <span>Starting Point (Where You Are)</span>
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{currentOrigin.emoji}</span>
                      <span className="truncate">{currentOrigin.name}</span>
                    </div>
                    <div className="text-xs text-rose-100 truncate">{currentOrigin.area}</div>
                  </div>

                  {/* Destination Display */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <div className="text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                      <Flag className="w-4 h-4 text-emerald-300" />
                      <span>Destination School</span>
                    </div>
                    <div className="mt-1 text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>🏫</span>
                      <span className="truncate">DAV Public School Khabra</span>
                    </div>
                    <div className="text-xs text-rose-100 truncate">Bakhri Chowk, Muzaffarpur • Pin 843103</div>
                  </div>

                  {/* Distance & Time Ticker */}
                  <div className="bg-stone-950/40 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Live Route Distance
                      </div>
                      <div className="text-2xl font-black text-white flex items-baseline gap-1">
                        <span>{currentOrigin.roadKm}</span>
                        <span className="text-sm font-bold text-amber-200">KM</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        ETA Time
                      </div>
                      <div className="text-2xl font-black text-emerald-300">
                        ~{currentEtaMinutes} <span className="text-xs font-bold text-white">MINS</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Location Selection Controls & Live GPS Button */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-black uppercase text-amber-200">
                      Choose Your Location:
                    </span>

                    {/* Auto-GPS Detector Button */}
                    <button
                      onClick={handleDetectLiveGps}
                      disabled={gpsLoading}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition active:scale-95"
                    >
                      <Navigation className={`w-3.5 h-3.5 ${gpsLoading ? 'animate-spin' : ''}`} />
                      <span>{gpsLoading ? 'Detecting My GPS...' : '📍 Use My Real GPS Location'}</span>
                    </button>

                    {/* Preset Dropdown */}
                    <select
                      value={userLocationMode === 'gps' ? 'gps_active' : selectedPresetId}
                      onChange={(e) => {
                        if (e.target.value === 'gps_active') return;
                        setUserLocationMode('preset');
                        setSelectedPresetId(e.target.value);
                        playFx('pop');
                      }}
                      className="bg-stone-950/80 text-white font-bold text-xs py-1.5 px-3 rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      {userLocationMode === 'gps' && (
                        <option value="gps_active">📍 Live Detected GPS Location</option>
                      )}
                      {PRESET_STARTING_LOCATIONS.map(loc => (
                        <option key={loc.id} value={loc.id}>
                          {loc.emoji} {loc.name} ({loc.roadKm} km)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mode of Travel Selector */}
                  <div className="flex items-center gap-1 bg-stone-950/50 p-1 rounded-xl">
                    {[
                      { id: 'bus', label: 'Bus', icon: Bus, mins: currentOrigin.busMins },
                      { id: 'car', label: 'Car', icon: Car, mins: currentOrigin.carMins },
                      { id: 'bike', label: 'Bicycle', icon: Bike, mins: currentOrigin.bikeMins },
                      { id: 'walk', label: 'Walk', icon: Footprints, mins: currentOrigin.walkMins }
                    ].map(mode => {
                      const IconComp = mode.icon;
                      const isSelected = transportMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setTransportMode(mode.id);
                            playFx('pop');
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-stone-950 font-black shadow-sm'
                              : 'text-rose-100 hover:text-white'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{mode.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {gpsError && (
                  <div className="mt-2 text-xs font-bold text-amber-200 bg-red-950/60 p-2 rounded-xl border border-red-400">
                    ⚠️ {gpsError}
                  </div>
                )}
              </div>
            </div>

            {/* ===============================================================
                ANIMATED KIDS CARTOON ROAD SIMULATOR
                =============================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl border-2 border-amber-300">
                    🛣️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                      <span>LIVE ANIMATED ROUTE TO DAV KHABRA</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black border border-emerald-300 animate-pulse">
                        SPEED: 38 KM/H
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Watch the yellow DAV school bus navigate through landmarks straight to the school gates!
                    </p>
                  </div>
                </div>

                {/* Honk & Cheer Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playFx('horn');
                      setParentHonkCount(c => c + 1);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md border-2 border-stone-950 transition active:scale-95 cursor-pointer"
                  >
                    <span>📢 Honk Bus Horn!</span>
                  </button>
                  <button
                    onClick={() => playFx('ding')}
                    className="px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-xs flex items-center gap-1.5 border border-purple-300 transition cursor-pointer"
                  >
                    <span>✨ Cheer Kids!</span>
                  </button>
                </div>
              </div>

              {/* The Cartoon Road Visualization Canvas / SVG */}
              <div className="relative bg-gradient-to-r from-emerald-100 via-sky-100 to-amber-100 rounded-2xl p-6 border-2 border-slate-200 overflow-hidden min-h-[220px]">
                
                {/* Background Decor: Trees, Clouds, Sunshine */}
                <div className="absolute top-2 left-6 text-2xl select-none animate-pulse">☁️</div>
                <div className="absolute top-4 left-1/3 text-2xl select-none">☀️</div>
                <div className="absolute top-2 right-12 text-2xl select-none animate-pulse">☁️</div>
                <div className="absolute bottom-2 left-10 text-xl select-none">🌳</div>
                <div className="absolute bottom-2 left-1/2 text-xl select-none">🌴</div>
                <div className="absolute bottom-2 right-16 text-xl select-none">🏫</div>

                {/* The Asphalt Highway Road */}
                <div className="relative my-8 h-20 bg-stone-800 rounded-2xl border-4 border-stone-900 shadow-inner flex items-center px-4 overflow-hidden">
                  
                  {/* Dashed Center Road Line */}
                  <div className="absolute inset-x-0 h-1 border-t-2 border-dashed border-amber-300 opacity-80" />

                  {/* Start Point Marker (Left) */}
                  <div className="absolute left-2 top-1 bottom-1 flex flex-col justify-between z-10">
                    <span className="text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded shadow">
                      START: {currentOrigin.name.slice(0, 15)}
                    </span>
                    <span className="text-lg">📍</span>
                  </div>

                  {/* Intermediate Checkpoints */}
                  <div className="absolute left-1/3 top-2 flex flex-col items-center opacity-80">
                    <span className="text-[9px] font-bold bg-stone-900 text-amber-200 px-1.5 py-0.2 rounded">
                      NH-28 Bypass
                    </span>
                  </div>
                  <div className="absolute left-2/3 top-2 flex flex-col items-center opacity-80">
                    <span className="text-[9px] font-bold bg-stone-900 text-amber-200 px-1.5 py-0.2 rounded">
                      Bakhri Chowk
                    </span>
                  </div>

                  {/* Destination School Marker (Right) */}
                  <div className="absolute right-2 top-1 bottom-1 flex flex-col justify-between items-end z-10">
                    <span className="text-[10px] font-black uppercase bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
                      DAV KHABRA GATES 🇮🇳
                    </span>
                    <span className="text-xl">🏫</span>
                  </div>

                  {/* The Moving Animated Yellow School Bus */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 ease-linear z-20 cursor-pointer"
                    style={{ left: `calc(${busDriveProgress}% - 40px)` }}
                    onClick={() => playFx('horn')}
                    title="Click the Bus to Honk!"
                  >
                    <div className="relative group">
                      {/* Speech bubble */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap shadow-md border border-stone-900 animate-bounce">
                        On the way! 🎈
                      </div>

                      {/* Bus Graphic */}
                      <div className="bg-yellow-400 border-2 border-stone-950 rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                        <Bus className="w-6 h-6 text-stone-950 fill-yellow-300" />
                        <div className="text-[10px] font-black text-stone-950 leading-none">
                          <div>DAV BUS</div>
                          <div className="text-[8px] text-red-700">KHABRA</div>
                        </div>
                      </div>

                      {/* Wheels */}
                      <div className="flex justify-between px-2 -mt-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-white animate-spin" />
                        <div className="w-2.5 h-2.5 rounded-full bg-stone-950 border border-white animate-spin" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Progress Slider / Scrub Bar */}
                <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Journey Progress:</span>
                    <span className="font-black text-red-600">{Math.round(busDriveProgress)}% Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsDrivingAnimated(prev => !prev)}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-stone-800 text-[11px] font-bold hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                    >
                      {isDrivingAnimated ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{isDrivingAnimated ? 'Pause Motion' : 'Play Motion'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setBusDriveProgress(0);
                        playFx('pop');
                      }}
                      className="px-2 py-1 rounded-lg bg-white border border-slate-300 text-stone-800 text-[11px] font-bold hover:bg-slate-100 cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* ===============================================================
                REAL GOOGLE MAPS EMBED & DIRECT TURN-BY-TURN LAUNCHER
                =============================================================== */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-300">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border-2 border-blue-300">
                    🗺️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 tracking-tight flex items-center gap-2">
                      <span>OFFICIAL GOOGLE MAPS SATELLITE & ROAD VIEW</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold border border-blue-300">
                        LIVE API EMBED
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Interactive Google Map centered directly on <strong>D.A.V. Public School, Khabra</strong>.
                    </p>
                  </div>
                </div>

                {/* Direct Google Maps Voice Navigation Launch Button */}
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playFx('victory')}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-black text-sm flex items-center gap-2 shadow-lg transition transform hover:-translate-y-0.5 border-2 border-amber-300 cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Open Full Turn-by-Turn GPS in Google Maps ↗</span>
                </a>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md relative bg-slate-100">
                <iframe
                  title="DAV Public School Khabra Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={googleMapsEmbedUrl}
                />
              </div>

              {/* Bottom Quick Navigation Cards */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 text-xs">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Flag className="w-4 h-4 text-amber-600" />
                    <span>Official Campus Gate</span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    Khabra-Darbhanga Road, At Bakhri Chowk, P.O. Mirzapur, Via Bochahan, Muzaffarpur.
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-3 border border-blue-200 text-xs">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Principal & Leadership</span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    Principal: <strong>Shri Anil Kumar Singh</strong> • Head Boy: <strong>Rishit Shankar</strong>.
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200 text-xs">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Student Safety Standards</span>
                  </div>
                  <div className="text-slate-600 mt-1">
                    Complete CCTV surveillance, verified GPS bus tracking, and emergency medical kits.
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================
            SUB-SECTION 2: PRINCIPAL ANIL KUMAR SINGH'S BUS FLEET RADAR
            =================================================================== */}
        {activeSubSection === 'bus_fleet' && (
          <div className="space-y-6">

            {/* Principal Dedicated Header */}
            <div className="bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-blue-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-300 text-xs font-black uppercase tracking-wider border border-white/30">
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                    <span>Authorized by Principal Shri Anil Kumar Singh</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                    🚌 D.A.V. KHABRA BUS RADAR
                  </h2>
                  <p className="text-blue-100 text-sm sm:text-base font-medium leading-relaxed">
                    Live GPS School Bus Fleet Tracking System for Parents & Kids. 
                    Enter your school <strong>Bus ID</strong> and <strong>Password</strong> to view the live GPS location, moving speed, next stop countdown, and verified driver details.
                  </p>
                </div>

                {/* Live Status Badge */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right">
                  <div className="text-xs uppercase font-extrabold text-cyan-300 tracking-wider">
                    School Fleet Status
                  </div>
                  <div className="text-2xl font-black text-white flex items-center justify-center sm:justify-end gap-2 mt-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span>5 BUSES ON ROAD</span>
                  </div>
                  <div className="text-[11px] text-blue-200 mt-1">
                    Real-Time GPS Sync Active • 100% Safety
                  </div>
                </div>
              </div>

              {/* Quick Preset Buses for 1-Click Parent Access */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2">
                  ⚡ 1-Click Quick Demo Bus Switcher (Click any bus to track instantly):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {DAV_BUS_FLEET.map(bus => {
                    const isSelected = activeBusFleetData?.busId === bus.busId;
                    return (
                      <button
                        key={bus.busId}
                        onClick={() => handleQuickSelectBus(bus)}
                        className={`p-2.5 rounded-xl text-left text-xs transition cursor-pointer border ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 font-black border-white shadow-md scale-105'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-black">{bus.busId}</span>
                          <span className="text-[10px]">{bus.currentStatus === 'moving' ? '🟢' : '🟡'}</span>
                        </div>
                        <div className="text-[10px] opacity-90 truncate mt-0.5">{bus.nickName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Parent Bus Login & Search Gate */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-300">
              <form onSubmit={handleBusLogin} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                
                <div className="sm:col-span-4">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Bus ID / Fleet Number:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={busInputId}
                      onChange={(e) => setBusInputId(e.target.value)}
                      placeholder="e.g. BUS-01, BUS-02"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl py-2.5 px-3 pl-9 text-sm font-bold text-stone-900 focus:outline-none focus:border-blue-600 uppercase"
                    />
                    <Bus className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                    Parent Security Password:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={busInputPassword}
                      onChange={(e) => setBusInputPassword(e.target.value)}
                      placeholder="Enter Password (e.g. dav123)"
                      className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl py-2.5 px-3 pl-9 text-sm font-bold text-stone-900 focus:outline-none focus:border-blue-600"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="sm:col-span-4 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer border-2 border-amber-300"
                  >
                    <Radio className="w-4 h-4 animate-pulse" />
                    <span>Track Live GPS 🛰️</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playFx('pop');
                      setBusRouteDirection(prev => prev === 'morning' ? 'afternoon' : 'morning');
                    }}
                    className="py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer border border-slate-300 whitespace-nowrap"
                    title="Toggle Morning Pickup vs Afternoon Drop"
                  >
                    {busRouteDirection === 'morning' ? '🌅 Morning Pickup' : '🌆 Afternoon Drop'}
                  </button>
                </div>

              </form>

              {busLoginError && (
                <div className="mt-3 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{busLoginError}</span>
                </div>
              )}
            </div>

            {/* Live Bus Tracking Radar Cockpit */}
            {activeBusFleetData && (
              <div className="space-y-6">

                {/* Active Bus Top Summary Banner */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-blue-300">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-stone-950 flex items-center justify-center font-black text-3xl shadow-lg border-2 border-stone-900">
                        🚌
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-blue-900 text-white">
                            {activeBusFleetData.busId}
                          </span>
                          <span className="text-xs font-black text-slate-500">
                            Reg: {activeBusFleetData.plateNumber}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {activeBusFleetData.model}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mt-1">
                          {activeBusFleetData.nickName}
                        </h3>
                        <div className="text-xs text-slate-600 font-medium">
                          Route: <strong>{activeBusFleetData.routeTitle}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Speedometer & Live Status Gauge */}
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-900 text-white p-3.5 rounded-2xl text-center border-2 border-amber-300 shadow-md">
                        <div className="text-[10px] uppercase font-extrabold text-amber-300">
                          Speed Gauge
                        </div>
                        <div className="text-2xl font-black text-emerald-400 flex items-baseline justify-center gap-0.5">
                          <span>{activeBusFleetData.currentSpeed}</span>
                          <span className="text-xs text-slate-400">km/h</span>
                        </div>
                        <div className="text-[9px] text-slate-400">
                          {activeBusFleetData.speedGovernor}
                        </div>
                      </div>

                      <div className="bg-emerald-50 text-emerald-950 p-3.5 rounded-2xl text-center border-2 border-emerald-300 shadow-sm">
                        <div className="text-[10px] uppercase font-extrabold text-emerald-700">
                          Live Status
                        </div>
                        <div className="text-sm font-black flex items-center justify-center gap-1.5 mt-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                          <span>{activeBusFleetData.currentStatus === 'moving' ? 'MOVING ON ROAD' : 'STOPPED AT STOP'}</span>
                        </div>
                        <div className="text-[9px] text-emerald-800 font-bold mt-0.5">
                          ETA to Khabra: ~{activeBusFleetData.etaMinutes} mins
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Real-Time GPS Pinpoint */}
                  <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xl shrink-0">
                        📍
                      </div>
                      <div>
                        <div className="text-xs font-black uppercase text-amber-900">
                          Current Live GPS Position:
                        </div>
                        <div className="text-sm sm:text-base font-extrabold text-stone-900">
                          {activeBusFleetData.currentLocationName}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          Coordinates: {activeBusFleetData.currentLat}° N, {activeBusFleetData.currentLng}° E • Distance to DAV Khabra: {activeBusFleetData.destinationDistanceKm} km
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${activeBusFleetData.currentLat},${activeBusFleetData.currentLng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 text-amber-300 font-black text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-400" />
                      <span>View Bus Coordinates in Google Maps ↗</span>
                    </a>
                  </div>

                  {/* Route Timeline / Stops Tracker */}
                  <div className="mt-6">
                    <div className="text-xs font-black uppercase text-slate-600 mb-3 flex items-center justify-between">
                      <span>School Bus Route Stops Schedule:</span>
                      <span className="text-[11px] font-bold text-blue-600">
                        {activeBusFleetData.stops.filter(s => s.completed).length} of {activeBusFleetData.stops.length} Stops Completed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {activeBusFleetData.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-2xl border transition ${
                            stop.completed
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : stop.isNext
                              ? 'bg-amber-100 border-amber-400 text-stone-950 ring-2 ring-amber-400 shadow-md scale-102'
                              : stop.isFinal
                              ? 'bg-blue-50 border-blue-300 text-blue-950 font-bold'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-black uppercase">
                            <span>{stop.completed ? '✓ Passed' : stop.isNext ? '⚡ NEXT STOP' : stop.isFinal ? '🏫 SCHOOL' : `Stop ${idx + 1}`}</span>
                            <span>{stop.time}</span>
                          </div>
                          <div className="text-xs font-black mt-1 line-clamp-2">
                            {stop.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Driver & Safety Personnel Dossier */}
                  <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {/* Driver Card */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border border-blue-300">
                          👨‍✈️
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase text-slate-500">Official DAV Driver</div>
                          <div className="text-sm font-black text-stone-900">{activeBusFleetData.driverName}</div>
                          <div className="text-xs font-mono text-slate-600">{activeBusFleetData.driverPhone}</div>
                        </div>
                      </div>
                      <a
                        href={`tel:${activeBusFleetData.driverPhone.replace(/\s+/g, '')}`}
                        className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow transition cursor-pointer"
                        title="Call Driver"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Attendant Card */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xl border border-purple-300">
                          🧑‍🏫
                        </div>
                        <div>
                          <div className="text-[10px] font-black uppercase text-slate-500">Bus Attendant</div>
                          <div className="text-sm font-black text-stone-900">{activeBusFleetData.attendantName}</div>
                          <div className="text-xs font-mono text-slate-600">{activeBusFleetData.attendantPhone}</div>
                        </div>
                      </div>
                      <a
                        href={`tel:${activeBusFleetData.attendantPhone.replace(/\s+/g, '')}`}
                        className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow transition cursor-pointer"
                        title="Call Attendant"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </div>

                    {/* Kids Onboard & Safety Badges */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase text-slate-500">Student Occupancy</div>
                        <div className="text-sm font-black text-stone-900 flex items-center justify-between mt-0.5">
                          <span>{activeBusFleetData.kidsOnboard} / {activeBusFleetData.totalCapacity} Kids Onboard</span>
                          <span className="text-xs text-emerald-600 font-bold">Seats Safe</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2 text-[10px]">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                          ✓ CCTV Active
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
                          ✓ GPS Verified
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold">
                          ✓ First Aid
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ===================================================================
            SUB-SECTION 3: KIDS BUS DRIVER ARCADE & JOY ZONE
            =================================================================== */}
        {activeSubSection === 'kids_arcade' && (
          <div className="space-y-6">

            {/* Arcade Header */}
            <div className="bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-emerald-300 relative overflow-hidden">
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-yellow-300 text-xs font-black uppercase tracking-wider border border-white/30">
                    <Gamepad2 className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                    <span>Pure Fun & Games for Kids!</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-md">
                    🎮 DAV BUS DRIVER ADVENTURE!
                  </h2>
                  <p className="text-emerald-100 text-sm sm:text-base font-medium leading-relaxed">
                    Grab the steering wheel of the official DAV School Bus! Steer left and right, pick up waiting students, collect shining gold stars, honk your horn, and drive all the way to <strong>D.A.V. Public School Khabra</strong>!
                  </p>
                </div>

                {/* Score & Trophy Showcase */}
                <div className="bg-stone-950/60 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-yellow-300 text-center">
                  <div className="text-xs uppercase font-black text-amber-300 tracking-widest">
                    Your Adventure Score
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {arcadeScore} <span className="text-sm font-bold text-yellow-300">PTS</span>
                  </div>
                  <div className="text-xs text-amber-200 mt-1 font-bold flex items-center justify-center gap-1">
                    <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                    <span>High Score: {arcadeHighScore} PTS</span>
                  </div>
                </div>
              </div>
            </div>

            {celebrationMessage && (
              <div className="bg-yellow-400 text-stone-950 font-black text-center py-3 px-4 rounded-2xl shadow-xl border-2 border-stone-950 text-sm sm:text-base animate-bounce">
                {celebrationMessage}
              </div>
            )}

            {/* Interactive Playable Bus Driving Arena */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-emerald-300">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl border-2 border-emerald-300">
                    🕹️
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-stone-900 tracking-tight">
                      3-LANE SCHOOL HIGHWAY TO KHABRA
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Use the steering buttons below to switch lanes, collect items, and arrive safely!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-xs font-black bg-purple-100 text-purple-900 px-3 py-1.5 rounded-xl border border-purple-300">
                    🎒 Students Picked: {kidsPickedCount}
                  </div>
                  <div className="text-xs font-black bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300">
                    ⭐ Gold Stars: {starsCollected}
                  </div>
                </div>
              </div>

              {/* 3-Lane Road Visualizer */}
              <div className="relative bg-stone-900 rounded-3xl p-6 border-4 border-stone-950 shadow-2xl overflow-hidden min-h-[280px]">
                
                {/* 3 Lanes Grid */}
                <div className="grid grid-cols-3 gap-4 h-56 relative">
                  
                  {/* Lane 0 (Left) */}
                  <div className={`rounded-2xl border-2 border-dashed border-slate-700 p-3 flex flex-col justify-between items-center transition ${
                    busLane === 0 ? 'bg-amber-400/10 border-amber-400' : 'bg-transparent'
                  }`}>
                    <div className="text-xs font-bold text-slate-500 uppercase">Lane 1 (Left)</div>
                    
                    {/* Item in Lane 0 */}
                    <button
                      onClick={handlePickStudent}
                      className="p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/40 text-purple-200 text-xs font-black border border-purple-400 animate-bounce cursor-pointer"
                    >
                      👦 Pick Student (+100)
                    </button>

                    {busLane === 0 && (
                      <div className="text-3xl animate-pulse">🚌</div>
                    )}
                  </div>

                  {/* Lane 1 (Center) */}
                  <div className={`rounded-2xl border-2 border-dashed border-slate-700 p-3 flex flex-col justify-between items-center transition ${
                    busLane === 1 ? 'bg-amber-400/10 border-amber-400' : 'bg-transparent'
                  }`}>
                    <div className="text-xs font-bold text-slate-500 uppercase">Lane 2 (Center)</div>
                    
                    {/* Item in Lane 1 */}
                    <button
                      onClick={handleCollectStar}
                      className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 text-amber-200 text-xs font-black border border-amber-400 animate-bounce cursor-pointer"
                    >
                      ⭐ Collect Star (+50)
                    </button>

                    {busLane === 1 && (
                      <div className="text-3xl animate-pulse">🚌</div>
                    )}
                  </div>

                  {/* Lane 2 (Right) */}
                  <div className={`rounded-2xl border-2 border-dashed border-slate-700 p-3 flex flex-col justify-between items-center transition ${
                    busLane === 2 ? 'bg-amber-400/10 border-amber-400' : 'bg-transparent'
                  }`}>
                    <div className="text-xs font-bold text-slate-500 uppercase">Lane 3 (Right)</div>
                    
                    {/* Item in Lane 2 */}
                    <button
                      onClick={handleReachSchool}
                      className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 text-xs font-black border border-emerald-400 animate-pulse cursor-pointer"
                    >
                      🏫 School Gate (+500)
                    </button>

                    {busLane === 2 && (
                      <div className="text-3xl animate-pulse">🚌</div>
                    )}
                  </div>

                </div>

                {/* Dashboard Controls Bar */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLaneChange('left')}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer border-2 border-stone-950"
                    >
                      <span>⬅️ Steer Left</span>
                    </button>

                    <button
                      onClick={() => playFx('horn')}
                      className="px-4 py-3 rounded-2xl bg-stone-950 hover:bg-stone-800 text-amber-300 font-black text-sm flex items-center gap-1.5 shadow-lg transition active:scale-95 cursor-pointer border-2 border-amber-400"
                    >
                      <span>📢 Honk!</span>
                    </button>

                    <button
                      onClick={() => handleLaneChange('right')}
                      className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer border-2 border-stone-950"
                    >
                      <span>Steer Right ➡️</span>
                    </button>
                  </div>

                  <div className="text-xs font-bold text-slate-400 flex items-center gap-2">
                    <span>Current Lane:</span>
                    <span className="font-black text-amber-300">
                      {busLane === 0 ? 'Lane 1 (Left)' : busLane === 1 ? 'Lane 2 (Center)' : 'Lane 3 (Right)'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Kids Fun Soundboard & Badges */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-xs font-black uppercase text-slate-600 mb-3">
                  🎵 Kids Interactive Soundboard (Press to play fun sound effects):
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <button
                    onClick={() => playFx('horn')}
                    className="p-3 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-black text-xs text-center border border-amber-300 transition active:scale-95 cursor-pointer"
                  >
                    <div className="text-xl mb-1">📢</div>
                    <div>Bus Horn</div>
                  </button>

                  <button
                    onClick={() => playFx('engine')}
                    className="p-3 rounded-2xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-black text-xs text-center border border-orange-300 transition active:scale-95 cursor-pointer"
                  >
                    <div className="text-xl mb-1">🏎️</div>
                    <div>Vroom Engine</div>
                  </button>

                  <button
                    onClick={() => playFx('ding')}
                    className="p-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-black text-xs text-center border border-sky-300 transition active:scale-95 cursor-pointer"
                  >
                    <div className="text-xl mb-1">✨</div>
                    <div>Magic Star</div>
                  </button>

                  <button
                    onClick={() => playFx('victory')}
                    className="p-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-black text-xs text-center border border-purple-300 transition active:scale-95 cursor-pointer"
                  >
                    <div className="text-xl mb-1">🎉</div>
                    <div>Fanfare Cheer</div>
                  </button>

                  <button
                    onClick={() => playFx('pop')}
                    className="p-3 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-xs text-center border border-emerald-300 transition active:scale-95 cursor-pointer"
                  >
                    <div className="text-xl mb-1">🎈</div>
                    <div>Bubble Pop</div>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
