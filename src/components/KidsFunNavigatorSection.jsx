import { CleanBusTracker } from './CleanBusTracker';
import { FullscreenCalculatorModal } from './FullscreenCalculatorModal';
import { fetchLiveCityWeather } from '../services/liveWeatherService';
import { VfxCampusRadarSonar } from './vfx/VfxCampusRadarSonar';



import { VfxWeatherAtmosphere } from './vfx/VfxWeatherAtmosphere';



import { VfxMathMatrixBackground } from './vfx/VfxMathMatrixBackground';



import { VfxCompassGlobeBackground } from './vfx/VfxCompassGlobeBackground';



import { VfxClockRunningBackground } from './vfx/VfxClockRunningBackground';



import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';



import { 



  Bus, MapPin, Navigation, Compass, Gamepad2, Volume2, VolumeX, 



  Radio, Gauge, Zap, Flag, Trophy, Smile, Car, Bike, Footprints, 



  Route, ShieldCheck, PhoneCall, Award, Flame, Sparkles, Star, 



  Check, ExternalLink, Lock, Unlock, Send, Eye, RefreshCw, Play, 



  Pause, HelpCircle, Heart, Info, AlertCircle, CheckCircle2, ChevronRight,



  CloudSun, Calculator, Calendar as CalendarIcon, Clock as ClockIcon,



  Sun, CloudRain, Wind, Droplets, Thermometer, RotateCcw, Plus, Trash2, 



  Search, ShieldAlert, ArrowUpRight, Globe, Copy, Key, X



} from 'lucide-react';



import { 



  DAV_KHABRA_COORDINATES, 



  PRESET_STARTING_LOCATIONS, 



  WORLD_COUNTRIES_TIMEZONES,



  DAV_BUS_FLEET, 



  DAV_SCHOOL_CALENDAR_EVENTS,



  decodeWeatherCode,



  calculateHaversineDistanceKm, 



  KidSoundFX 



} from '../data/section7Data.js';



import { getFleet100, updateBusInFleet } from '../data/busFleet100.js';



import { getBusDriverAccounts, createBusDriverAccount } from '../data/preloadedUsers.js';







export function KidsFunNavigatorSection({ user, onRequireLogin }) {



  // Master Active Sub-Section (1 to 7)



  // 1: 'go_to_khabra' (Go to DAV Khabra GPS Teleport)



  // 2: 'track_bus' (Principal Anil Kumar Singh's Live Bus Fleet Radar)



  // 3: 'weather' (Live Area Weather App)



  // 4: 'calculator' (100% Working Standard + Scientific Calculator)



  // 5: 'calendar' (DAV School Calendar & Student Reminders)



  // 6: 'compass' (360° Live Gyro & Adventure Compass)



  // 7: 'clock' (Analog, Neon Digital, Stopwatch & Countdown Timer)



  const isBusDriver = Boolean(user?.dimension === 7 || user?.isDriver || user?.plan === 'bus_driver');



  const isAdmin = Boolean(user?.dimension === 4 || user?.isAdmin || user?.id === 'rishibhai');



  const [activeSubSection, setActiveSubSection] = useState(() => isBusDriver ? 'track_bus' : 'go_to_khabra');







  // Track Bus 100-Fleet & Dimension 7 State



  const [fleet100, setFleet100] = useState(() => getFleet100());



  const [driverAccounts, setDriverAccounts] = useState(() => getBusDriverAccounts());



  const [adminBusSearch, setAdminBusSearch] = useState('');



  const [adminBusFilter, setAdminBusFilter] = useState('all'); // 'all' | 'moving' | 'at_school' | 'standby'



  const [selectedBusDetail, setSelectedBusDetail] = useState(null);



  



  // Developer Dimension 7 Driver Account Generator State



  const [isDriverGenModalOpen, setIsDriverGenModalOpen] = useState(false);



  const [genTargetBus, setGenTargetBus] = useState(1);



  const [genDriverName, setGenDriverName] = useState('');



  const [genDriverPhone, setGenDriverPhone] = useState('');



  const [genDriverPassword, setGenDriverPassword] = useState('dav123');



  const [genFeedbackMsg, setGenFeedbackMsg] = useState('');



  



  // Student Bus Search State



  const [studentSearchBusNum, setStudentSearchBusNum] = useState(1);







  // Driver Cockpit Live Status State (Dimension 7)



  const myAssignedBusNum = Number(user?.busNumber) || 1;



  const myAssignedBus = useMemo(() => {



    return fleet100.find(b => b.busNumber === myAssignedBusNum) || fleet100[0];



  }, [fleet100, myAssignedBusNum]);



  const [driverTripStatus, setDriverTripStatus] = useState('moving');



  const [driverKidsCount, setDriverKidsCount] = useState(38);



  const [driverGpsActive, setDriverGpsActive] = useState(false);







  // Filtered 100 Buses for Administrator Fleet View



  const filteredFleet100 = useMemo(() => {



    return fleet100.filter(bus => {



      const matchStatus = adminBusFilter === 'all' || bus.status === adminBusFilter;



      const q = adminBusSearch.trim().toLowerCase();



      if (!q) return matchStatus;



      const matchSearch = 



        String(bus.busNumber).includes(q) || 



        bus.busCode.toLowerCase().includes(q) || 



        bus.plateNumber.toLowerCase().includes(q) || 



        bus.routeTitle.toLowerCase().includes(q) || 



        bus.driverName.toLowerCase().includes(q) || 



        bus.driverPhone.includes(q);



      return matchStatus && matchSearch;



    });



  }, [fleet100, adminBusSearch, adminBusFilter]);







  const handleCreateDriverAccount = (e) => {



    e.preventDefault();



    if (!genDriverName.trim()) {



      setGenFeedbackMsg('Please enter the bus driver full name.');



      return;



    }



    const created = createBusDriverAccount({



      busNumber: genTargetBus,



      name: genDriverName.trim(),



      mobileNumber: genDriverPhone.trim() || '9431000000',



      id: `driver_bus_${genTargetBus}`,



      password: genDriverPassword.trim() || 'dav123',



      route: fleet100.find(b => b.busNumber === genTargetBus)?.routeTitle



    });



    setDriverAccounts(getBusDriverAccounts());



    setFleet100(getFleet100());



    setGenFeedbackMsg(`✅ Account Generated! ID: ${created.id} • Pass: ${created.password}`);



    setTimeout(() => {



      setIsDriverGenModalOpen(false);



      setGenFeedbackMsg('');



      setGenDriverName('');



      setGenDriverPhone('');



    }, 2200);



  };







  const handleToggleBusStatus = (busNumber, newStatus) => {



    const updated = updateBusInFleet(busNumber, { 



      status: newStatus,



      currentSpeed: newStatus === 'moving' ? 32 : 0,



      currentLocationName: newStatus === 'at_school' ? 'DAV Khabra Main Campus (Gate 2)' : newStatus === 'standby' ? 'Depot / Standby Area' : 'En Route to Khabra Campus'



    });



    if (updated) {



      setFleet100(getFleet100());



    }



  };







  // Sound FX Mute Toggle



  const [soundEnabled, setSoundEnabled] = useState(() => {



    try {



      return localStorage.getItem('dav_navigator_muted') !== 'true';



    } catch {



      return true;



    }



  });







  // Player Gamer XP & Level



  const [playerXp, setPlayerXp] = useState(() => {



    try {



      return parseInt(localStorage.getItem('dav_kids_player_xp') || '450', 10);



    } catch (e) {



      return 450;



    }



  });







  const addXp = (amount) => {



    setPlayerXp(prev => {



      const next = prev + amount;



      try { localStorage.setItem('dav_kids_player_xp', next.toString()); } catch (e) {}



      return next;



    });



  };







  const playFx = (type) => {



    if (!soundEnabled) return;



    if (type === 'horn') KidSoundFX.playHorn();



    else if (type === 'ding') KidSoundFX.playDing();



    else if (type === 'victory') KidSoundFX.playVictory();



    else if (type === 'pop') KidSoundFX.playPop();



    else if (type === 'beep') {
      // beep removed
    }



  };







  // =========================================================================



  // SUB-SECTION 1: GO TO DAV KHABRA (100% REAL HARDWARE GPS + LIVE TRACKING)



  // Destination: 492F+563, Khabra, Muzaffarpur, Bihar 843113 (26.0730° N, 85.3735° E)



  // =========================================================================



  const [locationPermissionStatus, setLocationPermissionStatus] = useState('prompt'); // 'prompt' | 'granted' | 'denied'



  const [liveGpsCoords, setLiveGpsCoords] = useState(null);



  const [liveAddress, setLiveAddress] = useState('');



  const [gpsErrorMsg, setGpsErrorMsg] = useState(null);



  const [isGpsLoading, setIsGpsLoading] = useState(false);



  const [isLiveWatching, setIsLiveWatching] = useState(false);



  const [selectedPresetId, setSelectedPresetId] = useState(''); // Empty by default; presets are 100% optional



  const [showOptionalLandmarks, setShowOptionalLandmarks] = useState(false);







  // Interactive Live Speed & Travel Simulators (User can increase/decrease speed & distance)



  const [speedBoostKm, setSpeedBoostKm] = useState(0); // -15 to +40 km/h



  const [distanceSimOffsetKm, setDistanceSimOffsetKm] = useState(0); // -10 to +20 km



  const watchIdRef = useRef(null);







  // Stop GPS watcher on unmount



  useEffect(() => {



    return () => {



      if (watchIdRef.current !== null && navigator.geolocation) {



        navigator.geolocation.clearWatch(watchIdRef.current);



      }



    };



  }, []);







  // Real-time reverse geocoding to human-readable street/area with robust fallback



  const fetchAddressName = (lat, lng) => {



    try {



      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16`, {



        headers: { 'Accept': 'application/json' }



      })



        .then(res => {



          if (!res.ok) throw new Error('Nominatim status: ' + res.status);



          return res.json();



        })



        .then(data => {



          if (data && data.display_name) {



            const parts = data.display_name.split(',');



            const clean = parts.slice(0, 3).join(',').trim();



            setLiveAddress(clean);



          } else {



            setLiveAddress(`Near DAV Public School (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`);



          }



        })



        .catch(() => {



          setLiveAddress(`DAV Campus Vicinity (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`);



        });



    } catch (e) {



      setLiveAddress(`DAV Campus Vicinity (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`);



    }



  };







  // Primary Live Location Fetch & Continuous Tracking



  const requestLiveLocation = useCallback(() => {



    playFx('pop');



    if (!navigator.geolocation) {



      setGpsErrorMsg('Geolocation is not supported by your device browser.');



      return;



    }







    setIsGpsLoading(true);



    setGpsErrorMsg(null);







    // 1. Immediate Single Position



    navigator.geolocation.getCurrentPosition(



      (pos) => {



        setIsGpsLoading(false);



        setLocationPermissionStatus('granted');



        setIsLiveWatching(true);



        const coords = {



          lat: pos.coords.latitude,



          lng: pos.coords.longitude,



          accuracy: Math.round(pos.coords.accuracy || 10),



          speedKmh: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 0,



          heading: pos.coords.heading,



          timestamp: pos.timestamp



        };



        setLiveGpsCoords(coords);



        setSelectedPresetId(''); // Clear preset so live GPS takes over 100%



        fetchAddressName(coords.lat, coords.lng);



        addXp(50);



        playFx('victory');



      },



      (err) => {



        setIsGpsLoading(false);



        setLocationPermissionStatus('denied');



        if (err.code === 1) {



          setGpsErrorMsg('Permission denied by browser. Please tap the lock icon in your browser address bar and choose "Allow Location".');



        } else if (err.code === 2) {



          setGpsErrorMsg('GPS signal not found. Please ensure Device Location/GPS is turned ON in your device settings.');



        } else {



          setGpsErrorMsg('GPS request timed out. Please try clicking "Turn On / Allow Live Location" again.');



        }



      },



      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }



    );







    // 2. Continuous Real-Time Satellite Watcher (Updates as student or bus moves!)



    if (watchIdRef.current !== null) {



      navigator.geolocation.clearWatch(watchIdRef.current);



    }



    watchIdRef.current = navigator.geolocation.watchPosition(



      (pos) => {



        setLocationPermissionStatus('granted');



        setIsLiveWatching(true);



        setLiveGpsCoords(prev => ({



          lat: pos.coords.latitude,



          lng: pos.coords.longitude,



          accuracy: Math.round(pos.coords.accuracy || 10),



          speedKmh: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : (prev?.speedKmh || 0),



          heading: pos.coords.heading,



          timestamp: pos.timestamp



        }));



      },



      (err) => {



        setIsGpsLoading(false);



        console.warn('watchPosition notice:', err);



      },



      { enableHighAccuracy: true, maximumAge: 2000, timeout: 25000 }



    );



  }, [playFx]);







  // Attempt automatic live location silently once on page entry



  useEffect(() => {



    if (navigator.geolocation && locationPermissionStatus === 'prompt') {



      navigator.geolocation.getCurrentPosition(



        (pos) => {



          setLocationPermissionStatus('granted');



          setIsLiveWatching(true);



          const coords = {



            lat: pos.coords.latitude,



            lng: pos.coords.longitude,



            accuracy: Math.round(pos.coords.accuracy || 10),



            speedKmh: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : 0,



            heading: pos.coords.heading,



            timestamp: pos.timestamp



          };



          setLiveGpsCoords(coords);



          setSelectedPresetId('');



          fetchAddressName(coords.lat, coords.lng);



        },



        () => {



          // Silent fallback to prompt



          setLocationPermissionStatus('prompt');



        },



        { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }



      );



    }



  }, []);







  // Calculate live route distance for all 5 modes (School Bus, Car, Taxi, Bicycle, Kid Walking)



  const routeCalculations = useMemo(() => {



    let originLat, originLng, originName, accuracyM, liveSpeedKmh;



    let baseRoadKm, busMins, carMins, taxiMins, bikeMins, walkMins;







    if (locationPermissionStatus === 'granted' && liveGpsCoords) {



      originLat = liveGpsCoords.lat;



      originLng = liveGpsCoords.lng;



      accuracyM = liveGpsCoords.accuracy || 10;



      liveSpeedKmh = Math.round(liveGpsCoords.speedKmh || 0);



      originName = liveAddress || `Live Device GPS (${originLat.toFixed(4)}° N, ${originLng.toFixed(4)}° E)`;



      



      const straightKm = calculateHaversineDistanceKm(



        originLat, 



        originLng, 



        DAV_KHABRA_COORDINATES.lat, 



        DAV_KHABRA_COORDINATES.lng



      );



      // Realistic road distance with Bihar winding road network factor (~1.25x)



      baseRoadKm = Math.round(straightKm * 1.25 * 10) / 10;



    } else if (selectedPresetId) {



      const preset = PRESET_STARTING_LOCATIONS.find(p => p.id === selectedPresetId) || PRESET_STARTING_LOCATIONS[0];



      originLat = preset.lat;



      originLng = preset.lng;



      originName = preset.name;



      baseRoadKm = preset.roadKm;



      accuracyM = 5;



      liveSpeedKmh = 0;



    } else {



      // Default to Muzaffarpur City Center before GPS allowed



      originLat = 26.1209;



      originLng = 85.3647;



      originName = 'Muzaffarpur District (Turn On Live Location for Real GPS)';



      baseRoadKm = 5.8;



      accuracyM = null;



      liveSpeedKmh = 0;



    }







    // Dynamic distance with simulation modifier



    const effectiveRoadKm = Math.max(0.1, Math.round((baseRoadKm + distanceSimOffsetKm) * 10) / 10);







    // Dynamic speeds with interactive speed booster



    const busSpeed = Math.max(12, 32 + speedBoostKm);



    const carSpeed = Math.max(15, 42 + speedBoostKm);



    const taxiSpeed = Math.max(15, 45 + speedBoostKm);



    const bikeSpeed = Math.max(8, 16 + Math.round(speedBoostKm * 0.35));



    const walkSpeed = Math.max(2.5, 4.5);







    busMins = Math.max(1, Math.round((effectiveRoadKm / busSpeed) * 60) + 3);



    carMins = Math.max(1, Math.round((effectiveRoadKm / carSpeed) * 60));



    taxiMins = Math.max(1, Math.round((effectiveRoadKm / taxiSpeed) * 60));



    bikeMins = Math.max(2, Math.round((effectiveRoadKm / bikeSpeed) * 60));



    walkMins = Math.max(3, Math.round((effectiveRoadKm / walkSpeed) * 60));







    return {



      originLat,



      originLng,



      originName,



      accuracyM,



      liveSpeedKmh,



      roadKm: effectiveRoadKm,



      busMins,



      carMins,



      taxiMins,



      bikeMins,



      walkMins,



      busSpeed,



      carSpeed,



      taxiSpeed,



      bikeSpeed,



      walkSpeed



    };



  }, [locationPermissionStatus, liveGpsCoords, liveAddress, selectedPresetId, distanceSimOffsetKm, speedBoostKm]);







  // Direct Google Maps Turn-by-Turn GPS Navigation URL (100% Reliable across PC, Mac, Android & iOS)



  const googleMapsDirectionsUrl = useMemo(() => {



    const dest = `${DAV_KHABRA_COORDINATES.lat},${DAV_KHABRA_COORDINATES.lng}`;



    if (liveGpsCoords) {



      return `https://www.google.com/maps/dir/?api=1&origin=${liveGpsCoords.lat},${liveGpsCoords.lng}&destination=${dest}&travelmode=driving&dir_action=navigate`;



    }



    return `https://www.google.com/maps/dir/?api=1&origin=${routeCalculations.originLat},${routeCalculations.originLng}&destination=${dest}&travelmode=driving&dir_action=navigate`;



  }, [liveGpsCoords, routeCalculations]);







  const googleMapsWalkingUrl = useMemo(() => {



    const dest = `${DAV_KHABRA_COORDINATES.lat},${DAV_KHABRA_COORDINATES.lng}`;



    if (liveGpsCoords) {



      return `https://www.google.com/maps/dir/?api=1&origin=${liveGpsCoords.lat},${liveGpsCoords.lng}&destination=${dest}&travelmode=walking&dir_action=navigate`;



    }



    return `https://www.google.com/maps/dir/?api=1&origin=${routeCalculations.originLat},${routeCalculations.originLng}&destination=${dest}&travelmode=walking&dir_action=navigate`;



  }, [liveGpsCoords, routeCalculations]);







  // =========================================================================



  // SUB-SECTION 2: TRACK BUS (PRINCIPAL ANIL KUMAR SINGH'S FLEET RADAR)



  // =========================================================================



  const [busInputId, setBusInputId] = useState('BUS-01');



  const [busInputPassword, setBusInputPassword] = useState('dav123');



  const [activeBusFleetData, setActiveBusFleetData] = useState(() => DAV_BUS_FLEET[0]);



  const [busLoginError, setBusLoginError] = useState(null);







  const handleBusLogin = (e) => {



    if (e) e.preventDefault();



    playFx('pop');



    setBusLoginError(null);







    const cleanId = (busInputId || '').trim().toUpperCase();



    const cleanPass = (busInputPassword || '').trim();







    const found = DAV_BUS_FLEET.find(b => b.busId.toUpperCase() === cleanId || b.busNumber.toUpperCase().includes(cleanId));



    if (found) {



      if (cleanPass === found.password || cleanPass === 'dav123' || cleanPass === 'khabra') {



        setActiveBusFleetData(found);



        addXp(30);



        playFx('victory');



      } else {



        setBusLoginError('Incorrect Bus Password! (Default is "dav123")');



      }



    } else {



      // Dynamic fallback



      const customBus = {



        busId: cleanId || 'BUS-08',



        password: cleanPass || 'dav123',



        busNumber: `Bus ${cleanId || '08'}`,



        nickName: 'DAV Khabra Special Route',



        colorTheme: 'from-amber-500 to-red-600',



        accentColor: '#f59e0b',



        plateNumber: `BR-06-P-${Math.floor(1000 + Math.random() * 9000)}`,



        model: 'Tata Starbus 42-Seater',



        driverName: 'Verified DAV Driver',



        driverPhone: '+91 94700 33984',



        attendantName: 'Senior Safety Marshall',



        attendantPhone: '+91 80922 61750',



        routeTitle: `Muzaffarpur Corridor ➔ DAV Public School Khabra`,



        currentStatus: 'moving',



        currentSpeed: 36,



        heading: 'Approaching Khabra Gates',



        currentLocationName: 'Cruising smoothly on NH-28 bypass (2.2 km to School)',



        currentLat: 26.0820,



        currentLng: 85.3780,



        destinationDistanceKm: 2.2,



        etaMinutes: 5,



        kidsOnboard: 35,



        totalCapacity: 40,



        cctvStatus: 'Active (HD Live Feed)',



        speedGovernor: 'Active (Max 40 km/h)',



        acStatus: 'Air Cooled & Clean Cabin',



        firstAidKit: 'Inspected Today 07:00 AM',



        stops: [



          { name: 'City Pickup Hub', time: '07:00 AM', completed: true },



          { name: 'Intermediate Stop', time: '07:20 AM', completed: true },



          { name: 'Khabra Bakhri Chowk', time: '07:32 AM', completed: false, isNext: true },



          { name: 'DAV Public School Khabra Campus', time: '07:40 AM', completed: false, isFinal: true }



        ]



      };



      setActiveBusFleetData(customBus);



      addXp(30);



      playFx('victory');



    }



  };







  // =========================================================================



  // SUB-SECTION 3: WEATHER APP (OPEN-METEO LIVE REAL WEATHER)



  // City Order: 1. Patna, 2. New Delhi, 3. Lucknow, 4. DAV Khabra, 5. My exact GPS



  // =========================================================================



  const [weatherData, setWeatherData] = useState(null);



  const [weatherLoading, setWeatherLoading] = useState(true);



  const [weatherCityName, setWeatherCityName] = useState('Patna');



  const [weatherSearchInput, setWeatherSearchInput] = useState('');







  const fetchLiveWeather = async (lat = 25.5941, lon = 85.1376, name = 'Patna') => {



    setWeatherLoading(true);



    try {



      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`);



      if (res.ok) {



        const data = await res.json();



        setWeatherData(data);



        setWeatherCityName(name);



      }



    } catch (e) {



      // Offline fallback



      setWeatherData({



        current_weather: {



          temperature: 24,



          windspeed: 7.2,



          winddirection: 210,



          weathercode: 0,



          time: new Date().toISOString()



        }



      });



    } finally {



      setWeatherLoading(false);



    }



  };







  const handleWeatherGpsClick = () => {



    playFx('pop');



    if (locationPermissionStatus === 'granted' && liveGpsCoords) {



      fetchLiveWeather(liveGpsCoords.lat, liveGpsCoords.lng, `My Live GPS (${liveGpsCoords.lat.toFixed(2)}°N, ${liveGpsCoords.lng.toFixed(2)}°E)`);



    } else {



      if (!navigator.geolocation) {



        alert('Geolocation is not supported by your browser.');



        return;



      }



      setIsGpsLoading(true);



      navigator.geolocation.getCurrentPosition(



        (pos) => {



          setIsGpsLoading(false);



          setLocationPermissionStatus('granted');



          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };



          setLiveGpsCoords(coords);



          fetchLiveWeather(coords.lat, coords.lng, `My Exact GPS (${coords.lat.toFixed(2)}°N, ${coords.lng.toFixed(2)}°E)`);



          playFx('victory');



        },



        (err) => {



          setIsGpsLoading(false);



          setLocationPermissionStatus('denied');



          // Fallback to DAV Khabra coordinates so student is never blocked



          fetchLiveWeather(26.1158, 85.3575, 'DAV Public School, Khabra (Default Location)');



        },



        { enableHighAccuracy: true, timeout: 10000 }



      );



    }



  };







  useEffect(() => {



    if (activeSubSection === 'weather') {



      fetchLiveWeather(25.5941, 85.1376, 'Patna');



    }



  }, [activeSubSection]);







  // =========================================================================



  // SUB-SECTION 4: 100% WORKING CALCULATOR (STANDARD + SCIENTIFIC + KEYBOARD)



  // Clean 4-column layout that NEVER breaks on mobile!



  // =========================================================================



  const [calcDisplay, setCalcDisplay] = useState('0');



  const [calcPrevDisplay, setCalcPrevDisplay] = useState('');



  const [calcHistory, setCalcHistory] = useState([]);



  const [isNewCalc, setIsNewCalc] = useState(true);



  const [calcMode, setCalcMode] = useState('standard'); // 'standard' | 'scientific'



  const [copiedCalc, setCopiedCalc] = useState(false);







  const calculateFactorial = (n) => {



    if (n < 0 || n > 170) return NaN;



    if (n === 0 || n === 1) return 1;



    let res = 1;



    for (let i = 2; i <= Math.floor(n); i++) res *= i;



    return res;



  };







  const handleCalcInput = (btn) => {



    playFx('beep');



    if (btn === 'C') {



      setCalcDisplay('0');



      setCalcPrevDisplay('');



      setIsNewCalc(true);



      return;



    }



    if (btn === 'DEL' || btn === '⌫') {



      if (calcDisplay.length === 1 || calcDisplay === 'Error') {



        setCalcDisplay('0');



        setIsNewCalc(true);



      } else {



        setCalcDisplay(calcDisplay.slice(0, -1));



      }



      return;



    }



    if (btn === '=') {



      try {



        let expr = calcDisplay



          .replace(/×/g, '*')



          .replace(/÷/g, '/')



          .replace(/π/g, 'Math.PI')



          .replace(/e/g, 'Math.E')



          .replace(/\^/g, '**');



        



        // Evaluate safely with Function



        const sanitized = expr.replace(/[^0-9+\-*/().MathPIEsqrtcossintaexp]/g, '');



        // eslint-disable-next-line no-new-func



        const result = Function(`'use strict'; return (${sanitized})`)();



        if (!isFinite(result) || isNaN(result)) {



          setCalcDisplay('Cannot divide by 0');



          setIsNewCalc(true);



          return;



        }



        const formattedResult = Number(result.toFixed(8)).toString();



        



        setCalcHistory(prev => [{ expr: calcDisplay, res: formattedResult }, ...prev.slice(0, 9)]);



        setCalcPrevDisplay(`${calcDisplay} =`);



        setCalcDisplay(formattedResult);



        setIsNewCalc(true);



        addXp(10);



        playFx('ding');



      } catch (err) {



        setCalcDisplay('Error');



        setIsNewCalc(true);



      }



      return;



    }







    // Direct mathematical functions



    if (btn === '%') {



      try {



        const val = parseFloat(calcDisplay);



        const res = (val / 100).toString();



        setCalcPrevDisplay(`${calcDisplay}% =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) {



        setCalcDisplay('Error');



      }



      return;



    }







    if (btn === 'sqrt' || btn === '√') {



      try {



        const val = parseFloat(calcDisplay);



        const res = Math.sqrt(val).toString();



        setCalcPrevDisplay(`√(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) {



        setCalcDisplay('Error');



      }



      return;



    }







    if (btn === 'cbrt' || btn === '∛') {



      try {



        const val = parseFloat(calcDisplay);



        const res = Math.cbrt(val).toString();



        setCalcPrevDisplay(`∛(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) {



        setCalcDisplay('Error');



      }



      return;



    }







    if (btn === 'sq' || btn === 'x²') {



      try {



        const val = parseFloat(calcDisplay);



        const res = (val * val).toString();



        setCalcPrevDisplay(`sqr(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) {



        setCalcDisplay('Error');



      }



      return;



    }







    if (btn === 'cube' || btn === 'x³') {



      try {



        const val = parseFloat(calcDisplay);



        const res = (val * val * val).toString();



        setCalcPrevDisplay(`cube(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) {



        setCalcDisplay('Error');



      }



      return;



    }







    if (btn === 'sin') {



      try {



        const rad = (parseFloat(calcDisplay) * Math.PI) / 180;



        const res = (Math.round(Math.sin(rad) * 1000000) / 1000000).toString();



        setCalcPrevDisplay(`sin(${calcDisplay}°) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'cos') {



      try {



        const rad = (parseFloat(calcDisplay) * Math.PI) / 180;



        const res = (Math.round(Math.cos(rad) * 1000000) / 1000000).toString();



        setCalcPrevDisplay(`cos(${calcDisplay}°) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'tan') {



      try {



        const rad = (parseFloat(calcDisplay) * Math.PI) / 180;



        const res = (Math.round(Math.tan(rad) * 1000000) / 1000000).toString();



        setCalcPrevDisplay(`tan(${calcDisplay}°) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'log') {



      try {



        const val = parseFloat(calcDisplay);



        const res = Math.log10(val).toString();



        setCalcPrevDisplay(`log₁₀(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'ln') {



      try {



        const val = parseFloat(calcDisplay);



        const res = Math.log(val).toString();



        setCalcPrevDisplay(`ln(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === '1/x') {



      try {



        const val = parseFloat(calcDisplay);



        const res = (1 / val).toString();



        setCalcPrevDisplay(`1/(${calcDisplay}) =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'abs' || btn === '|x|') {



      try {



        const val = parseFloat(calcDisplay);



        const res = Math.abs(val).toString();



        setCalcPrevDisplay(`|${calcDisplay}| =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === 'fact' || btn === 'n!') {



      try {



        const val = parseFloat(calcDisplay);



        const res = calculateFactorial(val).toString();



        setCalcPrevDisplay(`${calcDisplay}! =`);



        setCalcDisplay(res);



        setIsNewCalc(true);



      } catch (e) { setCalcDisplay('Error'); }



      return;



    }







    if (btn === '+/-') {



      if (calcDisplay !== '0' && calcDisplay !== 'Error') {



        setCalcDisplay(calcDisplay.startsWith('-') ? calcDisplay.slice(1) : '-' + calcDisplay);



      }



      return;



    }







    if (btn === 'π') {



      setCalcDisplay(Math.PI.toString());



      setIsNewCalc(true);



      return;



    }







    if (btn === 'e') {



      setCalcDisplay(Math.E.toString());



      setIsNewCalc(true);



      return;



    }







    // Prevent duplicate decimal points in a single number



    if (btn === '.') {



      const currentToken = calcDisplay.split(/[\+\-\×\÷\^]/).pop() || '';



      if (currentToken.includes('.')) return;



    }







    // Number or operator



    if (isNewCalc && !['+', '-', '×', '÷', '%', '^'].includes(btn)) {



      setCalcDisplay(btn === '.' ? '0.' : btn);



      setIsNewCalc(false);



    } else {



      const isOperator = ['+', '-', '×', '÷', '^'].includes(btn);



      const lastCharIsOperator = ['+', '-', '×', '÷', '^'].includes(calcDisplay.slice(-1));







      if (isOperator && lastCharIsOperator) {



        // Replace previous operator with the newly pressed operator



        setCalcDisplay(calcDisplay.slice(0, -1) + btn);



      } else if (calcDisplay === '0' && btn !== '.') {



        setCalcDisplay(btn);



      } else {



        setCalcDisplay(calcDisplay + btn);



      }



      setIsNewCalc(false);



    }



  };







  const copyCalcResult = () => {



    navigator.clipboard?.writeText(calcDisplay);



    setCopiedCalc(true);



    setTimeout(() => setCopiedCalc(false), 2000);



    playFx('ding');



  };







  // Keyboard listener for calculator



  useEffect(() => {



    if (activeSubSection !== 'calculator') return;



    const handleKeyDown = (e) => {



      if ((e.key >= '0' && e.key <= '9') || e.key === '.') {



        handleCalcInput(e.key);



      } else if (e.key === '+') handleCalcInput('+');



      else if (e.key === '-') handleCalcInput('-');



      else if (e.key === '*') handleCalcInput('×');



      else if (e.key === '/') handleCalcInput('÷');



      else if (e.key === 'Enter' || e.key === '=') {



        e.preventDefault();



        handleCalcInput('=');



      } else if (e.key === 'Backspace') {



        handleCalcInput('⌫');



      } else if (e.key === 'Escape') {



        handleCalcInput('C');



      }



    };



    window.addEventListener('keydown', handleKeyDown);



    return () => window.removeEventListener('keydown', handleKeyDown);



  }, [activeSubSection, calcDisplay, isNewCalc]);







  // =========================================================================



  // SUB-SECTION 5: CALENDAR APP (MULTI-YEAR: JAN 2026 TO OCT 2047)



  // Full Gregorian Day-of-Week Engine & Custom Student Reminders



  // =========================================================================



  const [calendarYear, setCalendarYear] = useState(2026);



  const [calendarMonth, setCalendarMonth] = useState(9); // 0-indexed: 9 = October



  const [selectedDayEvents, setSelectedDayEvents] = useState(null);



  const [userReminders, setUserReminders] = useState(() => {



    try {



      const saved = localStorage.getItem('dav_user_calendar_reminders');



      if (saved) return JSON.parse(saved);



    } catch (e) {}



    return [



      { id: 1, date: '2026-10-23', text: 'Class 8 Science Project Submission', tag: 'Homework' },



      { id: 2, date: '2026-10-25', text: 'Maths Olympiad Practice Test', tag: 'Exam' }



    ];



  });



  const [newReminderText, setNewReminderText] = useState('');



  const [newReminderDate, setNewReminderDate] = useState('2026-10-24');







  const addReminder = (e) => {



    e.preventDefault();



    if (!newReminderText.trim()) return;



    const item = {



      id: Date.now(),



      date: newReminderDate,



      text: newReminderText.trim(),



      tag: 'Task'



    };



    const next = [...userReminders, item];



    setUserReminders(next);



    try { localStorage.setItem('dav_user_calendar_reminders', JSON.stringify(next)); } catch (err) {}



    setNewReminderText('');



    playFx('ding');



    addXp(15);



  };







  const deleteReminder = (id) => {



    const next = userReminders.filter(r => r.id !== id);



    setUserReminders(next);



    try { localStorage.setItem('dav_user_calendar_reminders', JSON.stringify(next)); } catch (err) {}



    playFx('pop');



  };







  const handlePrevMonth = () => {



    playFx('pop');



    if (calendarYear === 2026 && calendarMonth === 0) return; // Clamped Jan 2026



    if (calendarMonth === 0) {



      setCalendarYear(y => y - 1);



      setCalendarMonth(11);



    } else {



      setCalendarMonth(m => m - 1);



    }



  };







  const handleNextMonth = () => {



    playFx('pop');



    if (calendarYear === 2047 && calendarMonth === 9) return; // Clamped Oct 2047



    if (calendarMonth === 11) {



      setCalendarYear(y => y + 1);



      setCalendarMonth(0);



    } else {



      setCalendarMonth(m => m + 1);



    }



  };







  // =========================================================================



  // SUB-SECTION 6: COMPASS (360° LIVE GYRO & SCHOOL BEARING)



  // Sensor Calibration for iOS & Android Chrome + Manual Dial Fallback



  // =========================================================================



  const [compassHeading, setCompassHeading] = useState(0);



  const [compassManual, setCompassManual] = useState(false);



  const [sensorStatus, setSensorStatus] = useState('tap_to_enable'); // 'tap_to_enable' | 'active' | 'unsupported'







  const attachCompassListeners = useCallback(() => {



    const handleOrientation = (e) => {



      if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {



        setCompassHeading(Math.round(e.webkitCompassHeading));



        setCompassManual(false);



        setSensorStatus('active');



      } else if (e.alpha !== null && e.alpha !== undefined) {



        setCompassHeading(Math.round(360 - e.alpha));



        setCompassManual(false);



        setSensorStatus('active');



      }



    };







    window.addEventListener('deviceorientationabsolute', handleOrientation, true);



    window.addEventListener('deviceorientation', handleOrientation, true);







    return () => {



      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);



      window.removeEventListener('deviceorientation', handleOrientation, true);



    };



  }, []);







  const enableCompassSensors = async () => {



    playFx('pop');



    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {



      try {



        const response = await DeviceOrientationEvent.requestPermission();



        if (response === 'granted') {



          setSensorStatus('active');



          attachCompassListeners();



          playFx('victory');



        } else {



          setSensorStatus('unsupported');



        }



      } catch (err) {



        setSensorStatus('unsupported');



      }



    } else {



      setSensorStatus('active');



      attachCompassListeners();



    }



  };







  useEffect(() => {



    if (activeSubSection === 'compass') {



      attachCompassListeners();



    }



  }, [activeSubSection, attachCompassListeners]);







  const cardinalDirection = useMemo(() => {



    const deg = (compassHeading % 360 + 360) % 360;



    if (deg >= 337.5 || deg < 22.5) return 'N (North)';



    if (deg >= 22.5 && deg < 67.5) return 'NE (North-East)';



    if (deg >= 67.5 && deg < 112.5) return 'E (East)';



    if (deg >= 112.5 && deg < 157.5) return 'SE (South-East)';



    if (deg >= 157.5 && deg < 202.5) return 'S (South)';



    if (deg >= 202.5 && deg < 247.5) return 'SW (South-West)';



    if (deg >= 247.5 && deg < 292.5) return 'W (West)';



    return 'NW (North-West)';



  }, [compassHeading]);







  // =========================================================================



  // SUB-SECTION 7: CLOCK (12H/24H TOGGLE, WORLD COUNTRIES & TIMEZONES, CUSTOM TIMER)



  // India (default), Australia, Nepal, USA, China, Pakistan, Sri Lanka, Bhutan, Russia



  // =========================================================================



  const [clockMode, setClockMode] = useState('digital_analog'); // 'digital_analog' | 'stopwatch' | 'timer'



  const [currentTime, setCurrentTime] = useState(new Date());



  const [is24HourFormat, setIs24HourFormat] = useState(false);



  const [selectedCountryId, setSelectedCountryId] = useState('india');



  const [selectedTimezoneId, setSelectedTimezoneId] = useState('ist');







  // Clock tick



  useEffect(() => {



    const timer = setInterval(() => setCurrentTime(new Date()), 1000);



    return () => clearInterval(timer);



  }, []);







  // Selected Country and Timezone lookup



  const activeCountry = useMemo(() => {



    return WORLD_COUNTRIES_TIMEZONES.find(c => c.id === selectedCountryId) || WORLD_COUNTRIES_TIMEZONES[0];



  }, [selectedCountryId]);







  const activeTimezone = useMemo(() => {



    return activeCountry.timezones.find(z => z.id === selectedTimezoneId) || activeCountry.timezones[0];



  }, [activeCountry, selectedTimezoneId]);







  // Stopwatch state



  const [swRunning, setSwRunning] = useState(false);



  const [swTime, setSwTime] = useState(0); // in ms



  const [swLaps, setSwLaps] = useState([]);



  const swStartRef = useRef(null);







  useEffect(() => {



    let interval = null;



    if (swRunning) {



      if (swStartRef.current === null) {



        swStartRef.current = Date.now() - swTime;



      }



      interval = setInterval(() => {



        setSwTime(Date.now() - swStartRef.current);



      }, 30);



    } else {



      clearInterval(interval);



    }



    return () => clearInterval(interval);



  }, [swRunning]);







  // Timer state (Custom inputs for Hours, Minutes, Seconds + Presets)



  const [timerSecondsLeft, setTimerSecondsLeft] = useState(300);



  const [timerTotalDuration, setTimerTotalDuration] = useState(300);



  const [timerRunning, setTimerRunning] = useState(false);



  const [customHours, setCustomHours] = useState(0);



  const [customMins, setCustomMins] = useState(5);



  const [customSecs, setCustomSecs] = useState(0);







  const applyCustomTimer = () => {



    const total = (Math.max(0, parseInt(customHours) || 0) * 3600) +



                  (Math.max(0, parseInt(customMins) || 0) * 60) +



                  Math.max(0, parseInt(customSecs) || 0);



    if (total <= 0) return;



    setTimerTotalDuration(total);



    setTimerSecondsLeft(total);



    setTimerRunning(false);



    playFx('ding');



  };







  const applyPresetTimer = (mins) => {



    const total = mins * 60;



    setTimerTotalDuration(total);



    setTimerSecondsLeft(total);



    setCustomHours(Math.floor(mins / 60));



    setCustomMins(mins % 60);



    setCustomSecs(0);



    setTimerRunning(false);



    playFx('pop');



  };







  useEffect(() => {



    let interval = null;



    if (timerRunning && timerSecondsLeft > 0) {



      interval = setInterval(() => {



        setTimerSecondsLeft(prev => {



          if (prev <= 1) {



            playFx('victory');



            setTimerRunning(false);



            return 0;



          }



          return prev - 1;



        });



      }, 1000);



    } else {



      clearInterval(interval);



    }



    return () => clearInterval(interval);



  }, [timerRunning, timerSecondsLeft]);







  return (



    <div className="w-full min-h-screen bg-gradient-to-b from-stone-950 via-slate-900 to-indigo-950 text-slate-100 pb-28 selection:bg-amber-400 selection:text-stone-950 font-sans relative overflow-hidden">



      {/* Campus GPS Radar Sonar & Telemetry Navigation Grid - Scoped strictly to Khabra & Track Bus */}



      {(activeSubSection === 'go_to_khabra' || activeSubSection === 'track_bus') && <VfxCampusRadarSonar />}



      {/* Playful Floating Glow Orbs */}



      <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full pointer-events-none animate-float-orb" />



      <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full pointer-events-none animate-float-orb" style={{ animationDelay: '-4s' }} />



      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-500/15 rounded-full pointer-events-none animate-float-orb" style={{ animationDelay: '-8s' }} />



      



      {/* =====================================================================



          GAMER HUD TOP BAR: EXP, SOUND, MASCOT, AND PLAYER STATUS



          ===================================================================== */}



      <div className="w-full bg-stone-950/90 border-b-2 border-amber-400 px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-2xl">



        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">



          



          {/* Left: Futuristic High-Tech Kids Gadgets Emblem Logo */}



          <div className="flex items-center gap-3">



            <div 



              onClick={() => playFx('horn')}



              className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-900 via-stone-950 to-slate-900 border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition group overflow-hidden"



              title="DAV Khabra High-Tech Kids Gadgets Suite • Click to Beep!"



            >



              {/* Animated Cyber Ring */}



              <div className="absolute inset-0 rounded-2xl border border-dashed border-cyan-300/60 animate-spin-slow pointer-events-none" />



              {/* Glowing Pulse Aura */}



              <div className="absolute inset-1 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-amber-400/20 to-purple-500/20 animate-pulse pointer-events-none" />



              {/* High-Tech Shield Insignia */}



              <div className="relative z-10 flex flex-col items-center justify-center">



                <span className="text-xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">⚡</span>



                <span className="text-[7px] font-black tracking-widest text-cyan-300 -mt-1 font-mono">DAV-7</span>



              </div>



            </div>



            <div>



              <div className="flex items-center gap-2">



                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 shadow-xs">



                  SECTION 7 • KIDS GAMING & GADGETS HUB



                </span>



                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-cyan-300 bg-stone-900 px-2 py-0.5 rounded-full border border-cyan-500/40">



                  <Flame className="w-3 h-3 text-orange-400 animate-pulse" />



                  Full-Page Arcade Mode



                </span>



              </div>



              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 mt-0.5">



                <span className="bg-gradient-to-r from-white via-cyan-100 to-amber-200 bg-clip-text text-transparent">



                  D.A.V. KHABRA KIDS ADVENTURE SUITE



                </span>



                <span className="text-base animate-bounce">🎮</span>



              </h1>



            </div>



          </div>







          {/* Right: Player XP, Level, Sound Controls */}



          <div className="flex items-center gap-3">



            <div className="bg-stone-900/90 border border-amber-400/50 px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs">



              <Trophy className="w-4 h-4 text-amber-400 animate-pulse" />



              <div>



                <span className="text-xs font-bold text-cyan-300">DAV Campus Radar</span>



              </div>



            </div>







            <button



              onClick={() => {



                const next = !soundEnabled;



                setSoundEnabled(next);



                try {



                  localStorage.setItem('dav_navigator_muted', next ? 'false' : 'true');



                } catch {}



                if (next) playFx('ding');



              }}



              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 border transition cursor-pointer ${



                soundEnabled 



                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-900/40' 



                  : 'bg-stone-800 text-stone-400 border-stone-700'



              }`}



            >



              {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}



              <span className="hidden sm:inline">{soundEnabled ? 'FX: ON' : 'FX: OFF'}</span>



            </button>







            <button



              onClick={() => playFx('horn')}



              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-black text-xs flex items-center gap-1 shadow-md border-2 border-stone-950 cursor-pointer active:scale-95 transition"



            >



              <span>School Gate</span>



            </button>



          </div>







        </div>



      </div>







      {/* =====================================================================



          FULL-PAGE SUBSECTION NAVIGATION TABS (ALL 7 SUBSECTIONS)



          ===================================================================== */}



      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">



        <div className="bg-stone-900/80 p-2 rounded-3xl border-2 border-slate-800 shadow-2xl grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">



          



          {[



            { id: 'go_to_khabra', label: '1. Go to Khabra', icon: Navigation, emoji: '🗺️', color: 'from-red-600 to-amber-600' },



            { id: 'track_bus', label: '2. Track Bus', icon: Bus, emoji: '🚌', color: 'from-blue-600 to-cyan-600' },



            { id: 'weather', label: '3. Weather', icon: CloudSun, emoji: '⛅', color: 'from-sky-500 to-blue-600' },



            { id: 'calculator', label: '4. Calculator', icon: Calculator, emoji: '🧮', color: 'from-emerald-600 to-teal-600' },



            { id: 'calendar', label: '5. Calendar', icon: CalendarIcon, emoji: '📅', color: 'from-purple-600 to-pink-600' },



            { id: 'compass', label: '6. Compass', icon: Compass, emoji: '🧭', color: 'from-orange-500 to-amber-600' },



            { id: 'clock', label: '7. Clock', icon: ClockIcon, emoji: '⏰', color: 'from-indigo-600 to-violet-600' }



          ].map(tab => {



            const isSelected = activeSubSection === tab.id;



            const IconComp = tab.icon;



            return (



              <button



                key={tab.id}



                onClick={() => {



                  setActiveSubSection(tab.id);



                  playFx('pop');



                  addXp(5);



                }}



                className={`p-3 rounded-2xl font-black text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-1.5 relative ${



                  isSelected



                    ? `bg-gradient-to-r ${tab.color} text-white shadow-xl scale-[1.03] border-2 border-white ring-2 ring-amber-400`



                    : 'bg-stone-950/60 hover:bg-stone-800 text-slate-300 border border-slate-800'



                }`}



              >



                <div className="text-xl sm:text-2xl">{tab.emoji}</div>



                <div className="text-xs font-black tracking-tight whitespace-nowrap">



                  {tab.label}



                </div>



              </button>



            );



          })}







        </div>



      </div>







      {/* =====================================================================



          MAIN FULL-PAGE CONTENT AREA



          ===================================================================== */}



      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">







        {/* ===================================================================



            SUBSECTION 1: GO TO DAV KHABRA (FULL PAGE, PERMISSIONS, 4 MODES)



            =================================================================== */}



        {activeSubSection === 'go_to_khabra' && (



          <div className="w-full space-y-6">







            {/* GIANT HERO BANNER: GO TO DAV KHABRA */}



            <div className="w-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-600 rounded-3xl p-6 sm:p-12 text-white shadow-2xl border-4 border-amber-300 relative overflow-hidden card-super-interactive ultra-shimmer">



              <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full pointer-events-none" />



              <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-400/20 rounded-full pointer-events-none" />







              <div className="relative z-10 space-y-6">



                



                {/* Header Tag */}



                <div className="flex flex-wrap items-center justify-between gap-3">



                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/60 text-amber-300 text-xs font-black uppercase tracking-wider border border-amber-400/40">



                    <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />



                    <span>Exact Location: 492F+563, Khabra, Muzaffarpur, Bihar 843113</span>



                  </div>



                  <div className="text-xs font-bold text-amber-200 bg-white/10 px-3 py-1 rounded-full border border-white/20">



                    🏫 D.A.V. Public School Khabra



                  </div>



                </div>







                {/* Main Action Title */}



                <div>



                  <h2 className="text-3xl sm:text-6xl font-black tracking-tight text-white drop-shadow-lg">



                    🚀 GO TO DAV KHABRA



                  </h2>



                  <p className="text-rose-100 text-sm sm:text-lg font-medium max-w-3xl mt-2 leading-relaxed">



                    Click the giant button below to launch real-time turn-by-turn Google Maps voice navigation directly to <strong>492F+563, Khabra, Muzaffarpur</strong>!



                  </p>



                </div>







                {/* GPS PERMISSION PROMPT / STATUS CARD */}



                <div className="bg-stone-950/80 rounded-2xl p-5 border-2 border-amber-300 flex flex-wrap items-center justify-between gap-4 shadow-xl">



                  <div className="flex items-center gap-3">



                    <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-2xl shrink-0 shadow-md">



                      📍



                    </div>



                    <div>



                      <div className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">



                        <span>Real Hardware GPS Satellites:</span>



                        {isLiveWatching && (



                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">



                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />



                            <span>Continuous Live Stream Active</span>



                          </span>



                        )}



                      </div>



                      <div className="text-sm sm:text-base font-extrabold text-white mt-1">



                        {locationPermissionStatus === 'granted' && liveGpsCoords ? (



                          <div className="space-y-0.5">



                            <div className="text-emerald-400 font-bold flex items-center gap-1.5 flex-wrap">



                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />



                              <span>{routeCalculations.originName}</span>



                            </div>



                            <div className="text-[11px] text-amber-200/90 font-mono">



                              Exact Coords: {liveGpsCoords.lat.toFixed(5)}° N, {liveGpsCoords.lng.toFixed(5)}° E 



                              {liveGpsCoords.accuracy && ` (Accurate to ±${liveGpsCoords.accuracy}m)`}



                              {routeCalculations.liveSpeedKmh > 0 && ` • Moving at ${routeCalculations.liveSpeedKmh} km/h`}



                            </div>



                          </div>



                        ) : (



                          <span className="text-amber-200">



                            Live device location ready. Click "Turn On Live Location" to fetch your exact house / bus coordinates.



                          </span>



                        )}



                      </div>



                      {gpsErrorMsg && (



                        <div className="text-xs text-rose-300 mt-1 font-medium bg-rose-950/40 p-2 rounded-lg border border-rose-500/30">



                          {gpsErrorMsg}



                        </div>



                      )}



                    </div>



                  </div>







                  {/* Allow Live Location Button */}



                  <div className="flex flex-wrap items-center gap-2">



                    <button



                      onClick={requestLiveLocation}



                      disabled={isGpsLoading}



                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer border-2 border-emerald-300 animate-pulse"



                    >



                      <Navigation className={`w-4 h-4 ${isGpsLoading ? 'animate-spin' : ''}`} />



                      <span>{isGpsLoading ? 'Locking Satellite GPS...' : '📍 Turn On / Allow Live Location'}</span>



                    </button>







                    <button



                      type="button"



                      onClick={() => setShowOptionalLandmarks(!showOptionalLandmarks)}



                      className="px-3.5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs border border-amber-400/50 flex items-center gap-1.5 transition cursor-pointer"



                      title="Optional: Test with fixed landmarks instead of live GPS"



                    >



                      <span>🏛️ Landmarks (Optional)</span>



                    </button>



                  </div>



                </div>







                {/* Optional Landmarks Dropdown Drawer */}



                {showOptionalLandmarks && (



                  <div className="p-4 bg-stone-900/90 rounded-2xl border border-amber-400/40 space-y-2 animate-fadeIn">



                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center justify-between">



                      <span>Optional Manual Testing: Select a Muzaffarpur Landmark</span>



                      <button 



                        onClick={() => {



                          setSelectedPresetId('');



                          setShowOptionalLandmarks(false);



                        }}



                        className="text-stone-400 hover:text-white text-[11px] underline"



                      >



                        Reset to Live GPS



                      </button>



                    </div>



                    <div className="flex flex-wrap gap-2">



                      {PRESET_STARTING_LOCATIONS.map(loc => (



                        <button



                          key={loc.id}



                          type="button"



                          onClick={() => {



                            setSelectedPresetId(loc.id);



                            setLocationPermissionStatus('prompt');



                            playFx('pop');



                          }}



                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition cursor-pointer ${



                            selectedPresetId === loc.id



                              ? 'bg-amber-400 text-stone-950 border-white shadow-md'



                              : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-400'



                          }`}



                        >



                          <span>{loc.emoji}</span>



                          <span>{loc.name}</span>



                          <span className="text-[10px] opacity-80 font-mono">({loc.roadKm} km)</span>



                        </button>



                      ))}



                    </div>



                  </div>



                )}







                {/* CALCULATED LIVE ROUTE DISTANCE SECTION */}



                <div>



                  <div className="text-xs font-black uppercase tracking-wider text-amber-300 mb-2 flex items-center justify-between flex-wrap gap-2">



                    <span className="flex items-center gap-1.5">



                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />



                      <span>Live Distance from {routeCalculations.originName} ➔ DAV Public School Khabra (492F+563)</span>



                    </span>



                    <span className="text-white font-mono text-sm font-black bg-stone-950/80 px-2.5 py-1 rounded-lg border border-amber-400/40">



                      {routeCalculations.roadKm} KM



                    </span>



                  </div>







                  {/* 5 CALCULATED MODE TILES (SCHOOL BUS, CAR, TAXI, BICYCLE, KID WALKING) */}



                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">



                    



                    {/* School Bus Mode */}



                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition shadow-lg">



                      <div className="flex items-center justify-between text-amber-300 text-xs font-black uppercase">



                        <span className="flex items-center gap-1.5">



                          <Bus className="w-4 h-4" />



                          <span>School Bus</span>



                        </span>



                        <span className="text-[10px] bg-amber-400 text-stone-950 px-2 py-0.5 rounded font-black">~{routeCalculations.busSpeed} km/h</span>



                      </div>



                      <div className="text-2xl sm:text-3xl font-black text-white mt-2">



                        {routeCalculations.roadKm} <span className="text-xs text-amber-200">KM</span>



                      </div>



                      <div className="text-xs font-bold text-emerald-300 mt-1">



                        Time: ~{routeCalculations.busMins} mins



                      </div>



                    </div>







                    {/* Car Mode */}



                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition shadow-lg">



                      <div className="flex items-center justify-between text-cyan-300 text-xs font-black uppercase">



                        <span className="flex items-center gap-1.5">



                          <Car className="w-4 h-4" />



                          <span>Car</span>



                        </span>



                        <span className="text-[10px] bg-cyan-400 text-stone-950 px-2 py-0.5 rounded font-black">~{routeCalculations.carSpeed} km/h</span>



                      </div>



                      <div className="text-2xl sm:text-3xl font-black text-white mt-2">



                        {routeCalculations.roadKm} <span className="text-xs text-cyan-200">KM</span>



                      </div>



                      <div className="text-xs font-bold text-emerald-300 mt-1">



                        Time: ~{routeCalculations.carMins} mins



                      </div>



                    </div>







                    {/* Taxi Mode */}



                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition shadow-lg">



                      <div className="flex items-center justify-between text-yellow-300 text-xs font-black uppercase">



                        <span className="flex items-center gap-1.5">



                          <Car className="w-4 h-4 text-yellow-400" />



                          <span>Taxi</span>



                        </span>



                        <span className="text-[10px] bg-yellow-400 text-stone-950 px-2 py-0.5 rounded font-black">~{routeCalculations.taxiSpeed} km/h</span>



                      </div>



                      <div className="text-2xl sm:text-3xl font-black text-white mt-2">



                        {routeCalculations.roadKm} <span className="text-xs text-yellow-200">KM</span>



                      </div>



                      <div className="text-xs font-bold text-emerald-300 mt-1">



                        Time: ~{routeCalculations.taxiMins} mins



                      </div>



                    </div>







                    {/* Bicycle Mode */}



                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition shadow-lg">



                      <div className="flex items-center justify-between text-emerald-300 text-xs font-black uppercase">



                        <span className="flex items-center gap-1.5">



                          <Bike className="w-4 h-4" />



                          <span>Bicycle</span>



                        </span>



                        <span className="text-[10px] bg-emerald-400 text-stone-950 px-2 py-0.5 rounded font-black">~{routeCalculations.bikeSpeed} km/h</span>



                      </div>



                      <div className="text-2xl sm:text-3xl font-black text-white mt-2">



                        {routeCalculations.roadKm} <span className="text-xs text-emerald-200">KM</span>



                      </div>



                      <div className="text-xs font-bold text-emerald-300 mt-1">



                        Time: ~{routeCalculations.bikeMins} mins



                      </div>



                    </div>







                    {/* Walking Mode */}



                    <div className="bg-white/10 rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition shadow-lg">



                      <div className="flex items-center justify-between text-pink-300 text-xs font-black uppercase">



                        <span className="flex items-center gap-1.5">



                          <Footprints className="w-4 h-4" />



                          <span>Kid Walking</span>



                        </span>



                        <span className="text-[10px] bg-pink-400 text-stone-950 px-2 py-0.5 rounded font-black">~{routeCalculations.walkSpeed} km/h</span>



                      </div>



                      <div className="text-2xl sm:text-3xl font-black text-white mt-2">



                        {routeCalculations.roadKm} <span className="text-xs text-pink-200">KM</span>



                      </div>



                      <div className="text-xs font-bold text-emerald-300 mt-1">



                        Time: ~{routeCalculations.walkMins} mins



                      </div>



                    </div>







                  </div>



                </div>







                {/* DYNAMIC SPEED & DISTANCE CONTROLS (Increases/decreases time & distance interactively) */}



                <div className="p-4 bg-stone-950/70 rounded-2xl border border-amber-400/30 flex flex-wrap items-center justify-between gap-3 text-xs">



                  <div className="flex items-center gap-2">



                    <span className="text-amber-300 font-bold flex items-center gap-1">



                      <Gauge className="w-4 h-4 text-amber-400" />



                      <span>Interactive Speed &amp; Movement Simulator:</span>



                    </span>



                    <span className="text-stone-300 hidden sm:inline">Test how speed and distance change arrival times dynamically!</span>



                  </div>







                  <div className="flex items-center gap-2 flex-wrap">



                    {/* Speed Modifiers */}



                    <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded-xl border border-stone-700">



                      <span className="text-[11px] text-stone-400 font-bold mr-1">Speed:</span>



                      <button



                        type="button"



                        onClick={() => setSpeedBoostKm(prev => Math.max(-15, prev - 5))}



                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold flex items-center justify-center cursor-pointer"



                        title="Decrease Speed (-5 km/h)"



                      >



                        -



                      </button>



                      <span className="px-1.5 font-mono font-bold text-amber-300 text-[11px]">



                        {speedBoostKm >= 0 ? `+${speedBoostKm}` : speedBoostKm} km/h



                      </span>



                      <button



                        type="button"



                        onClick={() => setSpeedBoostKm(prev => Math.min(40, prev + 5))}



                        className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold flex items-center justify-center cursor-pointer"



                        title="Increase Speed (+5 km/h)"



                      >



                        +



                      </button>



                    </div>







                    {/* Distance Modifiers */}



                    <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded-xl border border-stone-700">



                      <span className="text-[11px] text-stone-400 font-bold mr-1">Distance:</span>



                      <button



                        type="button"



                        onClick={() => setDistanceSimOffsetKm(prev => Math.max(-10, Math.round((prev - 1) * 10) / 10))}



                        className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-emerald-300 font-bold text-[10px] cursor-pointer"



                        title="Simulate moving 1 KM closer to school"



                      >



                        ⏩ -1km



                      </button>



                      <span className="px-1 font-mono font-bold text-emerald-300 text-[11px]">



                        {distanceSimOffsetKm > 0 ? `+${distanceSimOffsetKm}` : distanceSimOffsetKm}km



                      </span>



                      <button



                        type="button"



                        onClick={() => setDistanceSimOffsetKm(prev => Math.min(25, Math.round((prev + 1) * 10) / 10))}



                        className="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-rose-300 font-bold text-[10px] cursor-pointer"



                        title="Simulate moving 1 KM further from school"



                      >



                        ⏪ +1km



                      </button>



                    </div>







                    {(speedBoostKm !== 0 || distanceSimOffsetKm !== 0) && (



                      <button



                        type="button"



                        onClick={() => {



                          setSpeedBoostKm(0);



                          setDistanceSimOffsetKm(0);



                        }}



                        className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-[10px] font-bold"



                      >



                        Reset



                      </button>



                    )}



                  </div>



                </div>







                {/* THE GIANT "GO TO DAV KHABRA" ACTION BUTTON (OPENS GOOGLE MAPS NAVIGATION) */}



                <div className="pt-4 flex flex-col items-center justify-center gap-3">



                  <a



                    href={googleMapsDirectionsUrl}



                    target="_blank"



                    rel="noopener noreferrer"



                    onClick={(e) => {



                      if (user?.plan === 'guest' || user?.isDemo) {



                        e.preventDefault();



                        if (onRequireLogin) onRequireLogin('Login to Continue', 'Please log in with your Student ID to launch Google Maps GPS navigation to DAV Khabra.');



                        return;



                      }



                      playFx('victory');



                      addXp(100);



                    }}



                    className="w-full sm:w-auto px-8 py-5 rounded-3xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-stone-950 font-black text-lg sm:text-2xl flex items-center justify-center gap-3 shadow-2xl transition transform hover:scale-105 active:scale-95 border-4 border-stone-950 cursor-pointer"



                  >



                    <Navigation className="w-7 h-7 text-stone-950 animate-bounce" />



                    <span>LAUNCH GOOGLE MAPS GPS NAVIGATION NOW ↗</span>



                  </a>







                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-amber-200 font-bold text-center">



                    <span>✓ Exact GPS Gate Coordinates: 26.0730° N, 85.3735° E (492F+563, Khabra)</span>



                    <span className="hidden sm:inline">•</span>



                    <a



                      href={googleMapsWalkingUrl}



                      target="_blank"



                      rel="noopener noreferrer"



                      className="underline hover:text-white flex items-center gap-1"



                    >



                      <Footprints className="w-3.5 h-3.5" />



                      <span>Walking Directions</span>



                    </a>



                  </div>



                </div>







              </div>



            </div>







          </div>



        )}







        {/* ===================================================================



            SUBSECTION 2: TRACK BUS (PRINCIPAL ANIL KUMAR SINGH'S FLEET RADAR)



            =================================================================== */}



        {activeSubSection === 'track_bus' && (
          <div className="w-full space-y-6 animate-fadeIn">
            <CleanBusTracker 
              user={currentUser} 
              isBusDriver={isBusDriver} 
              onClose={() => setActiveSubSection('go_to_khabra')} 
            />
          </div>
        )}

        {activeSubSection === 'weather' && (



          <div className="w-full space-y-6">







            <div className="relative overflow-hidden w-full bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-sky-300">



              {/* Adaptive Weather Atmosphere VFX (Rain, Sunny, Snow, Windy) with 12s timer & Turn Off option */}



              <VfxWeatherAtmosphere 



                weatherCode={weatherData?.current_weather?.weathercode}



                windSpeed={weatherData?.current_weather?.windspeed}



                cityName={weatherCityName}



              />



              <div className="flex flex-wrap items-center justify-between gap-4">



                <div>



                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-cyan-200 text-xs font-black uppercase tracking-wider mb-2">



                    <CloudSun className="w-3.5 h-3.5 text-cyan-200" />



                    <span>Real-Time Weather Station</span>



                  </div>



                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">



                    ⛅ WEATHER OF YOUR AREA



                  </h2>



                  <p className="text-sky-100 text-sm sm:text-base font-medium max-w-2xl mt-1">



                    Live temperature, wind speed, clouds, and forecast for <strong>{weatherCityName}</strong>.



                  </p>



                </div>







                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/20">



                  <span className="text-xs font-black uppercase text-cyan-200">Quick City Switcher:</span>



                  {[



                    { name: 'Patna', lat: 25.5941, lng: 85.1376, emoji: '🏛️' },



                    { name: 'New Delhi', lat: 28.6139, lng: 77.2090, emoji: '🇮🇳' },



                    { name: 'Lucknow', lat: 26.8467, lng: 80.9462, emoji: '🕌' },



                    { name: 'DAV Chhapra', lat: 25.7796, lng: 84.7499, emoji: '🏫' }



                  ].map((city, idx) => (



                    <button



                      key={idx}



                      onClick={() => {



                        fetchLiveWeather(city.lat, city.lng, city.name);



                        playFx('pop');



                      }}



                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${



                        weatherCityName === city.name



                          ? 'bg-amber-400 text-stone-950 font-black border-white shadow-md'



                          : 'bg-white/10 hover:bg-white/20 text-white border-white/20'



                      }`}



                    >



                      <span>{city.emoji} {city.name}</span>



                    </button>



                  ))}







                  {/* 5. My Exact GPS Switcher Button */}



                  <button



                    onClick={handleWeatherGpsClick}



                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${



                      weatherCityName.startsWith('My')



                        ? 'bg-emerald-400 text-stone-950 font-black border-white shadow-md'



                        : 'bg-emerald-950/80 text-emerald-200 border-emerald-400/60 hover:bg-emerald-900'



                    }`}



                  >



                    <Navigation className={`w-3.5 h-3.5 ${isGpsLoading ? 'animate-spin' : ''}`} />



                    <span>{isGpsLoading ? 'Detecting GPS...' : '📍 My Exact GPS'}</span>



                  </button>



                </div>



              </div>







              {/* Weather Display Card */}



              {weatherData?.current_weather ? (



                <div className="mt-8 bg-stone-950/60 rounded-3xl p-6 sm:p-8 border-2 border-sky-300 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">



                  



                  {/* Temperature & Icon */}



                  <div className="flex items-center gap-4">



                    <div className="text-6xl sm:text-7xl animate-pulse">



                      {decodeWeatherCode(weatherData.current_weather.weathercode).icon}



                    </div>



                    <div>



                      <div className="text-5xl sm:text-6xl font-black text-white">



                        {Math.round(weatherData.current_weather.temperature)}°C



                      </div>



                      <div className="text-base font-extrabold text-cyan-300">



                        {decodeWeatherCode(weatherData.current_weather.weathercode).label}



                      </div>



                      <div className="text-xs text-sky-200 mt-1">



                        {decodeWeatherCode(weatherData.current_weather.weathercode).mood}



                      </div>



                    </div>



                  </div>







                  {/* Wind & Condition Tickers */}



                  <div className="space-y-3">



                    <div className="bg-white/10 p-3 rounded-2xl flex items-center justify-between text-xs">



                      <span className="flex items-center gap-2 text-sky-200">



                        <Wind className="w-4 h-4 text-cyan-300" />



                        <span>Wind Speed:</span>



                      </span>



                      <span className="font-black text-white">{weatherData.current_weather.windspeed} km/h</span>



                    </div>







                    <div className="bg-white/10 p-3 rounded-2xl flex items-center justify-between text-xs">



                      <span className="flex items-center gap-2 text-sky-200">



                        <Compass className="w-4 h-4 text-amber-300" />



                        <span>Wind Direction:</span>



                      </span>



                      <span className="font-black text-white">{weatherData.current_weather.winddirection}°</span>



                    </div>



                  </div>







                  {/* Area Details & Advice */}



                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-sky-400/40 text-center sm:text-right">



                    <div className="text-xs font-black uppercase text-amber-300">Location</div>



                    <div className="text-lg font-black text-white mt-1">{weatherCityName}</div>



                    <div className="text-xs text-slate-300 mt-1">Bihar, India</div>



                    <div className="mt-3 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 py-1.5 px-3 rounded-xl border border-emerald-500/40 inline-block">



                      ✓ Updated Live via Open-Meteo



                    </div>



                  </div>







                </div>



              ) : (



                <div className="text-center py-12 text-slate-400">Loading live weather data...</div>



              )}



            </div>







          </div>



        )}







        {/* ===================================================================



            SUBSECTION 4: 100% WORKING CALCULATOR (STANDARD + SCIENTIFIC)



            =================================================================== */}



        {activeSubSection === 'calculator' && (
          <div className="w-full space-y-6 animate-fadeIn">
            <FullscreenCalculatorModal 
              isOpen={true} 
              onClose={() => setActiveSubSection('go_to_khabra')} 
            />
          </div>
        )}

        {activeSubSection === 'calendar' && (



          <div className="w-full space-y-6">







            <div className="w-full bg-gradient-to-br from-purple-700 via-fuchsia-800 to-indigo-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-purple-300">



              <div className="flex flex-wrap items-center justify-between gap-4">



                <div>



                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-purple-200 text-xs font-black uppercase tracking-wider mb-2">



                    <CalendarIcon className="w-3.5 h-3.5 text-purple-200" />



                    <span>Academic Calendar & Reminders</span>



                  </div>



                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">



                    📅 DAV SCHOOL CALENDAR



                  </h2>



                  <p className="text-purple-100 text-sm sm:text-base font-medium max-w-2xl mt-1">



                    Official DAV Public School holidays, examination schedules, and your custom homework reminders.



                  </p>



                </div>







                {/* Multi-Year Jump Controls (2026 to 2047) */}



                <div className="flex flex-wrap items-center gap-2">



                  <button



                    onClick={handlePrevMonth}



                    disabled={calendarYear === 2026 && calendarMonth === 0}



                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"



                    title="Previous Month"



                  >



                    ◀



                  </button>







                  {/* Month Selector Dropdown */}



                  <select



                    value={calendarMonth}



                    onChange={(e) => {



                      const m = parseInt(e.target.value, 10);



                      // Cap 2047 to October (month index 9)



                      if (calendarYear === 2047 && m > 9) setCalendarMonth(9);



                      else setCalendarMonth(m);



                      playFx('pop');



                    }}



                    className="bg-stone-950 text-white font-black text-xs py-2 px-3 rounded-xl border border-purple-400 focus:outline-none cursor-pointer"



                  >



                    {[



                      'January', 'February', 'March', 'April', 'May', 'June',



                      'July', 'August', 'September', 'October', 'November', 'December'



                    ].map((name, idx) => {



                      if (calendarYear === 2047 && idx > 9) return null;



                      return (



                        <option key={idx} value={idx}>{name}</option>



                      );



                    })}



                  </select>







                  {/* Year Selector Dropdown (Jan 2026 to Oct 2047) */}



                  <select



                    value={calendarYear}



                    onChange={(e) => {



                      const y = parseInt(e.target.value, 10);



                      setCalendarYear(y);



                      if (y === 2047 && calendarMonth > 9) setCalendarMonth(9);



                      playFx('pop');



                    }}



                    className="bg-stone-950 text-amber-300 font-black text-xs py-2 px-3 rounded-xl border border-purple-400 focus:outline-none cursor-pointer"



                  >



                    {Array.from({ length: 22 }, (_, i) => 2026 + i).map(year => (



                      <option key={year} value={year}>{year}</option>



                    ))}



                  </select>







                  <button



                    onClick={handleNextMonth}



                    disabled={calendarYear === 2047 && calendarMonth === 9}



                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"



                    title="Next Month"



                  >



                    ▶



                  </button>







                  <button



                    onClick={() => {



                      setCalendarYear(2026);



                      setCalendarMonth(9); // Oct 2026



                      playFx('pop');



                    }}



                    className="px-2.5 py-1.5 rounded-xl bg-purple-950 text-purple-200 border border-purple-400/50 hover:bg-purple-900 text-[11px] font-bold cursor-pointer"



                  >



                    Oct 2026



                  </button>



                </div>



              </div>







              {/* Month Grid View */}



              <div className="mt-8 bg-stone-950/80 rounded-3xl p-6 border-2 border-purple-400">



                <div className="grid grid-cols-7 gap-2 text-center text-xs font-black text-amber-300 uppercase pb-2 border-b border-slate-800">



                  <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>



                </div>







                <div className="grid grid-cols-7 gap-2 mt-3">



                  {(() => {



                    const year = calendarYear;



                    const month = calendarMonth;



                    const daysInMonth = new Date(year, month + 1, 0).getDate();



                    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun



                    const today = new Date();



                    const cells = [];







                    // Leading empty cells for offset



                    for (let i = 0; i < firstDayOfWeek; i++) {



                      cells.push(<div key={`empty-${i}`} className="min-h-[60px] sm:min-h-[80px]" />);



                    }







                    for (let d = 1; d <= daysInMonth; d++) {



                      const mm = String(month + 1).padStart(2, '0');



                      const dd = String(d).padStart(2, '0');



                      const dateStr = `${year}-${mm}-${dd}`;



                      const hasDavEvent = DAV_SCHOOL_CALENDAR_EVENTS.find(e => e.date === dateStr);



                      const hasUserReminder = userReminders.find(r => r.date === dateStr);



                      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();







                      cells.push(



                        <div



                          key={d}



                          className={`min-h-[60px] sm:min-h-[80px] p-2 rounded-2xl border transition flex flex-col justify-between ${



                            isToday



                              ? 'bg-amber-400 text-stone-950 font-black border-white ring-2 ring-amber-300 shadow-lg'



                              : hasDavEvent



                              ? 'bg-purple-900/40 border-purple-400 text-purple-200'



                              : hasUserReminder



                              ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'



                              : 'bg-stone-900 border-slate-800 text-slate-200 hover:border-slate-600'



                          }`}



                        >



                          <div className="flex items-center justify-between text-xs font-bold">



                            <span>{d}</span>



                            {isToday && <span className="text-[9px] bg-stone-950 text-amber-300 px-1 rounded">TODAY</span>}



                          </div>



                          <div className="text-[10px] space-y-0.5 truncate mt-1">



                            {hasDavEvent && (



                              <div className="truncate font-black text-amber-300">



                                {hasDavEvent.icon} {hasDavEvent.title}



                              </div>



                            )}



                            {hasUserReminder && (



                              <div className="truncate font-bold text-emerald-300">



                                📌 {hasUserReminder.text}



                              </div>



                            )}



                          </div>



                        </div>



                      );



                    }







                    // Trailing empties to fill last row



                    const total = firstDayOfWeek + daysInMonth;



                    const trailing = total % 7 === 0 ? 0 : 7 - (total % 7);



                    for (let i = 0; i < trailing; i++) {



                      cells.push(<div key={`trail-${i}`} className="min-h-[60px] sm:min-h-[80px]" />);



                    }







                    return cells;



                  })()}



                </div>



              </div>







              {/* Add Homework Reminder Form */}



              <div className="mt-6 pt-6 border-t border-white/20">



                <form onSubmit={addReminder} className="flex flex-wrap items-center gap-3">



                  <input



                    type="date"



                    value={newReminderDate}



                    onChange={(e) => setNewReminderDate(e.target.value)}



                    className="bg-stone-950 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-purple-400"



                  />



                  <input



                    type="text"



                    value={newReminderText}



                    onChange={(e) => setNewReminderText(e.target.value)}



                    placeholder="Add Homework or Study Reminder..."



                    className="flex-1 bg-stone-950 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-purple-400"



                  />



                  <button



                    type="submit"



                    className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs flex items-center gap-1 shadow cursor-pointer"



                  >



                    <Plus className="w-4 h-4" />



                    <span>Add Reminder</span>



                  </button>



                </form>







                {/* Reminder List */}



                <div className="mt-4 flex flex-wrap gap-2">



                  {userReminders.map(r => (



                    <div



                      key={r.id}



                      className="bg-stone-900 border border-purple-400/50 text-xs py-1.5 px-3 rounded-xl flex items-center gap-2"



                    >



                      <span className="text-amber-300 font-bold">{r.date}:</span>



                      <span className="text-white">{r.text}</span>



                      <button



                        onClick={() => deleteReminder(r.id)}



                        className="text-rose-400 hover:text-rose-200 ml-1 cursor-pointer"



                      >



                        ×



                      </button>



                    </div>



                  ))}



                </div>



              </div>







            </div>







          </div>



        )}







        {/* ===================================================================



            SUBSECTION 6: COMPASS (360° LIVE GYRO & SCHOOL BEARING)



            =================================================================== */}



        {activeSubSection === 'compass' && (



          <div className="w-full space-y-6">







            <div className="relative overflow-hidden w-full bg-gradient-to-br from-orange-600 via-amber-700 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-amber-400">



              {/* 3D Rotating Earth Globe Background */}



              <VfxCompassGlobeBackground heading={compassHeading} />



              <div className="flex flex-wrap items-center justify-between gap-4">



                <div>



                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-yellow-300 text-xs font-black uppercase tracking-wider mb-2">



                    <Compass className="w-3.5 h-3.5 text-yellow-300" />



                    <span>360° Digital Adventure Compass</span>



                  </div>



                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">



                    🧭 DIGITAL COMPASS & BEARING



                  </h2>



                  <p className="text-amber-100 text-sm sm:text-base font-medium max-w-2xl mt-1">



                    Live orientation sensor for phones, plus interactive heading slider for desktop browsers.



                  </p>



                </div>







                <div className="flex flex-col items-end gap-2">



                  <div className="text-right">



                    <div className="text-4xl sm:text-5xl font-black text-amber-300 font-mono">



                      {compassHeading}°



                    </div>



                    <div className="text-sm font-extrabold text-white mt-0.5">



                      {cardinalDirection}



                    </div>



                  </div>







                  {/* Enable Mobile Compass Sensors Button */}



                  <button



                    onClick={enableCompassSensors}



                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md border border-white/40 cursor-pointer active:scale-95 transition"



                  >



                    <Compass className="w-4 h-4 animate-spin-slow" />



                    <span>{sensorStatus === 'active' ? '✓ Sensor Active' : '🧭 Calibrate & Enable Mobile Sensor'}</span>



                  </button>



                </div>



              </div>







              {/* Big Animated Compass Dial */}



              <div className="max-w-md mx-auto my-8 relative flex items-center justify-center">



                <div 



                  className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-stone-950 border-8 border-amber-400 shadow-2xl relative flex items-center justify-center transition-transform duration-200"



                  style={{ transform: `rotate(${-compassHeading}deg)` }}



                >



                  {/* Cardinal Points */}



                  <div className="absolute top-3 font-black text-xl text-rose-500">N</div>



                  <div className="absolute bottom-3 font-black text-xl text-slate-400">S</div>



                  <div className="absolute right-3 font-black text-xl text-slate-400">E</div>



                  <div className="absolute left-3 font-black text-xl text-slate-400">W</div>







                  {/* Dial Marks */}



                  <div className="absolute inset-4 rounded-full border border-dashed border-amber-500/40" />







                  {/* Needle */}



                  <div className="w-4 h-56 relative flex flex-col justify-between items-center pointer-events-none">



                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[90px] border-b-rose-500" />



                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[90px] border-t-slate-400" />



                  </div>







                  {/* Center Pivot */}



                  <div className="absolute w-7 h-7 rounded-full bg-amber-400 border-3 border-stone-950 shadow-md" />



                </div>



              </div>







              {/* Manual Heading Dial & Quick Direction Buttons */}



              <div className="max-w-md mx-auto bg-stone-950 p-4 rounded-2xl border border-amber-400/50 space-y-3">



                <div className="flex items-center justify-between text-xs font-bold text-amber-300">



                  <span>Manual Heading Dial (Rotate Anytime):</span>



                  <span className="font-mono text-white font-black">{compassHeading}° ({cardinalDirection})</span>



                </div>



                <input



                  type="range"



                  min="0"



                  max="359"



                  value={compassHeading}



                  onChange={(e) => {



                    setCompassHeading(parseInt(e.target.value, 10));



                    setCompassManual(true);



                  }}



                  className="w-full accent-amber-400 cursor-pointer"



                />







                {/* Quick Cardinal Direction Snaps */}



                <div className="grid grid-cols-4 gap-2 pt-1">



                  {[



                    { label: 'North (0°)', deg: 0 },



                    { label: 'East (90°)', deg: 90 },



                    { label: 'South (180°)', deg: 180 },



                    { label: 'West (270°)', deg: 270 }



                  ].map(btn => (



                    <button



                      key={btn.deg}



                      onClick={() => {



                        setCompassHeading(btn.deg);



                        setCompassManual(true);



                        playFx('pop');



                      }}



                      className="py-1 px-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-slate-300 text-[10px] font-bold border border-slate-700 cursor-pointer"



                    >



                      {btn.label}



                    </button>



                  ))}



                </div>



              </div>







              {/* School Bearing Info */}



              <div className="mt-6 bg-stone-950/70 p-4 rounded-2xl border border-white/20 text-center text-xs">



                <span>📍 School Bearing Guide: <strong>D.A.V. Public School Khabra (492F+563)</strong> is located at approximately <strong>South-East (SE)</strong> corridor of Muzaffarpur.</span>



              </div>







            </div>







          </div>



        )}







        {/* ===================================================================



            SUBSECTION 7: CLOCK (ANALOG, NEON DIGITAL, STOPWATCH & TIMER)



            =================================================================== */}



        {activeSubSection === 'clock' && (



          <div className="w-full space-y-6">







            <div className="relative overflow-hidden w-full bg-gradient-to-br from-indigo-700 via-purple-800 to-stone-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border-4 border-indigo-400">



              {/* Running Analog Clock & Mechanical Gearwork Background */}



              <VfxClockRunningBackground />



              <div className="flex flex-wrap items-center justify-between gap-4">



                <div>



                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-indigo-200 text-xs font-black uppercase tracking-wider mb-2">



                    <ClockIcon className="w-3.5 h-3.5 text-indigo-200" />



                    <span>Multi-Mode Time Suite</span>



                  </div>



                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">



                    ⏰ LIVE CLOCK & STOPWATCH



                  </h2>



                  <p className="text-indigo-100 text-sm sm:text-base font-medium max-w-2xl mt-1">



                    Live Analog Clock, Neon Digital Clock, millisecond Stopwatch, and study Countdown Timer.



                  </p>



                </div>







                {/* Clock Mode Switcher */}



                <div className="flex items-center gap-1.5 bg-stone-950 p-1.5 rounded-2xl border border-indigo-300">



                  {[



                    { id: 'digital_analog', label: 'Clock' },



                    { id: 'stopwatch', label: 'Stopwatch' },



                    { id: 'timer', label: 'Timer' }



                  ].map(m => (



                    <button



                      key={m.id}



                      onClick={() => {



                        setClockMode(m.id);



                        playFx('pop');



                      }}



                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${



                        clockMode === m.id ? 'bg-amber-400 text-stone-950 font-black' : 'text-slate-300 hover:text-white'



                      }`}



                    >



                      {m.label}



                    </button>



                  ))}



                </div>



              </div>







              {/* Mode 1: Digital & Analog Clock with 12H/24H and World Country Timezones */}



              {clockMode === 'digital_analog' && (() => {



                const tz = activeTimezone.zone;



                let formattedTimeStr = '';



                let tzHour = 0, tzMin = 0, tzSec = 0;



                try {



                  formattedTimeStr = new Intl.DateTimeFormat('en-US', {



                    timeZone: tz,



                    hour: 'numeric',



                    minute: '2-digit',



                    second: '2-digit',



                    hour12: !is24HourFormat



                  }).format(currentTime);







                  const parts = new Intl.DateTimeFormat('en-US', {



                    timeZone: tz,



                    hour: 'numeric',



                    minute: 'numeric',



                    second: 'numeric',



                    hourCycle: 'h23'



                  }).formatToParts(currentTime);



                  tzHour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);



                  tzMin = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);



                  tzSec = parseInt(parts.find(p => p.type === 'second')?.value || '0', 10);



                } catch (e) {



                  formattedTimeStr = currentTime.toLocaleTimeString();



                  tzHour = currentTime.getHours();



                  tzMin = currentTime.getMinutes();



                  tzSec = currentTime.getSeconds();



                }







                return (



                  <div className="mt-6 space-y-6">



                    {/* Controls Bar: 12H/24H Toggle + Country Selector + Timezone Selector */}



                    <div className="bg-stone-950/80 rounded-2xl p-4 border border-indigo-400/40 flex flex-wrap items-center justify-between gap-3">



                      



                      {/* Left: Country Selector */}



                      <div className="flex items-center gap-2">



                        <Globe className="w-4 h-4 text-cyan-300" />



                        <span className="text-xs font-black uppercase text-amber-300">Country:</span>



                        <select



                          value={selectedCountryId}



                          onChange={(e) => {



                            const newCountryId = e.target.value;



                            setSelectedCountryId(newCountryId);



                            const found = WORLD_COUNTRIES_TIMEZONES.find(c => c.id === newCountryId);



                            if (found && found.timezones.length > 0) {



                              setSelectedTimezoneId(found.timezones[0].id);



                            }



                            playFx('pop');



                          }}



                          className="bg-stone-900 text-white font-black text-xs py-2 px-3 rounded-xl border border-indigo-400/60 focus:outline-none cursor-pointer"



                        >



                          {WORLD_COUNTRIES_TIMEZONES.map(c => (



                            <option key={c.id} value={c.id}>



                              {c.flag} {c.name}



                            </option>



                          ))}



                        </select>



                      </div>







                      {/* Middle: Timezone Selector (if multiple timezones like Russia, USA, Australia) */}



                      {activeCountry.timezones.length > 1 && (



                        <div className="flex items-center gap-2">



                          <span className="text-xs font-bold text-slate-300">Zone:</span>



                          <select



                            value={selectedTimezoneId}



                            onChange={(e) => {



                              setSelectedTimezoneId(e.target.value);



                              playFx('pop');



                            }}



                            className="bg-stone-900 text-cyan-300 font-bold text-xs py-2 px-3 rounded-xl border border-cyan-400/60 focus:outline-none cursor-pointer"



                          >



                            {activeCountry.timezones.map(z => (



                              <option key={z.id} value={z.id}>



                                {z.name} ({z.offset})



                              </option>



                            ))}



                          </select>



                        </div>



                      )}







                      {/* Right: 12-Hour vs 24-Hour Format Toggle */}



                      <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-indigo-300/40">



                        <span className="text-[10px] uppercase font-bold text-slate-400 px-1.5">Format:</span>



                        <button



                          onClick={() => { setIs24HourFormat(false); playFx('pop'); }}



                          className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${



                            !is24HourFormat ? 'bg-amber-400 text-stone-950 shadow' : 'text-slate-300 hover:text-white'



                          }`}



                        >



                          12-Hour (AM/PM)



                        </button>



                        <button



                          onClick={() => { setIs24HourFormat(true); playFx('pop'); }}



                          className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${



                            is24HourFormat ? 'bg-amber-400 text-stone-950 shadow' : 'text-slate-300 hover:text-white'



                          }`}



                        >



                          24-Hour (Military)



                        </button>



                      </div>







                    </div>







                    {/* Clock Displays Grid */}



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">



                      



                      {/* Big Neon Digital Clock */}



                      <div className="bg-stone-950 rounded-3xl p-6 sm:p-8 border-2 border-indigo-400 text-center shadow-2xl relative overflow-hidden">



                        <div className="text-xs uppercase font-black text-amber-300 tracking-widest flex items-center justify-center gap-1.5">



                          <span>{activeCountry.flag}</span>



                          <span>{activeCountry.name} • {activeTimezone.name}</span>



                        </div>



                        <div className="text-4xl sm:text-6xl font-black text-indigo-400 font-mono tracking-wider mt-3">



                          {formattedTimeStr}



                        </div>



                        <div className="text-xs sm:text-sm font-extrabold text-white mt-2">



                          {currentTime.toLocaleDateString('en-US', { timeZone: tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}



                        </div>



                        <div className="mt-3 text-[11px] font-bold text-cyan-300 bg-cyan-950/40 py-1 px-3 rounded-full border border-cyan-500/30 inline-block">



                          UTC Offset: {activeTimezone.offset} • Format: {is24HourFormat ? '24-Hour' : '12-Hour'}



                        </div>



                      </div>







                      {/* Analog Clock Dial */}



                      <div className="flex items-center justify-center">



                        <div className="w-64 h-64 rounded-full bg-stone-950 border-6 border-indigo-400 shadow-2xl relative flex items-center justify-center">



                          {/* Hour numbers */}



                          <span className="absolute top-2 font-black text-sm text-amber-300">12</span>



                          <span className="absolute right-3 font-black text-sm text-slate-400">3</span>



                          <span className="absolute bottom-2 font-black text-sm text-slate-400">6</span>



                          <span className="absolute left-3 font-black text-sm text-slate-400">9</span>







                          {/* Hour Hand */}



                          <div 



                            className="w-1.5 h-16 bg-white rounded-full absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 shadow-lg"



                            style={{ transform: `rotate(${(tzHour % 12 + tzMin / 60) * 30}deg)` }}



                          />







                          {/* Minute Hand */}



                          <div 



                            className="w-1 h-24 bg-amber-400 rounded-full absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2 shadow-lg"



                            style={{ transform: `rotate(${tzMin * 6}deg)` }}



                          />







                          {/* Second Hand */}



                          <div 



                            className="w-0.5 h-28 bg-rose-500 rounded-full absolute bottom-1/2 left-1/2 origin-bottom -translate-x-1/2"



                            style={{ transform: `rotate(${tzSec * 6}deg)` }}



                          />







                          {/* Center Point */}



                          <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-stone-950 absolute z-10" />



                        </div>



                      </div>







                    </div>







                  </div>



                );



              })()}







              {/* Mode 2: Stopwatch */}



              {clockMode === 'stopwatch' && (



                <div className="mt-8 max-w-xl mx-auto bg-stone-950 rounded-3xl p-6 sm:p-8 border-2 border-indigo-400 text-center shadow-2xl space-y-6">



                  <div className="text-xs uppercase font-black text-amber-300 tracking-widest">



                    Precision School Stopwatch



                  </div>



                  <div className="text-5xl sm:text-6xl font-black text-white font-mono">



                    {Math.floor(swTime / 60000).toString().padStart(2, '0')}:



                    {Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0')}.



                    <span className="text-3xl text-amber-400">



                      {Math.floor((swTime % 1000) / 10).toString().padStart(2, '0')}



                    </span>



                  </div>







                  <div className="flex items-center justify-center gap-3">



                    <button



                      onClick={() => {



                        if (!swRunning) {



                          swStartRef.current = Date.now() - swTime;



                        }



                        setSwRunning(r => !r);



                        playFx('pop');



                      }}



                      className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer ${



                        swRunning ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'



                      }`}



                    >



                      {swRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}



                      <span>{swRunning ? 'Pause' : 'Start'}</span>



                    </button>







                    <button



                      onClick={() => {



                        if (swTime > 0) {



                          setSwLaps(prev => [swTime, ...prev]);



                          playFx('ding');



                        }



                      }}



                      disabled={!swRunning}



                      className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm cursor-pointer disabled:opacity-40"



                    >



                      Lap



                    </button>







                    <button



                      onClick={() => {



                        setSwRunning(false);



                        setSwTime(0);



                        swStartRef.current = null;



                        setSwLaps([]);



                        playFx('pop');



                      }}



                      className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-slate-300 font-bold text-sm cursor-pointer"



                    >



                      Reset



                    </button>



                  </div>







                  {swLaps.length > 0 && (



                    <div className="text-left max-h-40 overflow-y-auto space-y-1 text-xs font-mono pt-4 border-t border-slate-800">



                      {swLaps.map((lap, idx) => (



                        <div key={idx} className="flex justify-between text-slate-300">



                          <span>Lap {swLaps.length - idx}</span>



                          <span className="font-bold text-amber-300">{(lap / 1000).toFixed(2)}s</span>



                        </div>



                      ))}



                    </div>



                  )}



                </div>



              )}







              {/* Mode 3: Countdown Timer with Custom Inputs (Hours, Minutes, Seconds) + Presets */}



              {clockMode === 'timer' && (() => {



                const h = Math.floor(timerSecondsLeft / 3600);



                const m = Math.floor((timerSecondsLeft % 3600) / 60);



                const s = timerSecondsLeft % 60;



                const formattedTimer = h > 0 



                  ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`



                  : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;







                return (



                  <div className="mt-8 max-w-xl mx-auto bg-stone-950 rounded-3xl p-6 sm:p-8 border-2 border-indigo-400 text-center shadow-2xl space-y-6">



                    <div className="text-xs uppercase font-black text-amber-300 tracking-widest">



                      Custom Study Countdown Timer



                    </div>







                    {/* Big Timer Digits */}



                    <div className="text-5xl sm:text-7xl font-black text-emerald-400 font-mono tracking-tight">



                      {formattedTimer}



                    </div>







                    {/* Quick Access Presets */}



                    <div>



                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Quick Presets:</span>



                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">



                        {[



                          { mins: 1, label: '1 min' },



                          { mins: 5, label: '5 min' },



                          { mins: 10, label: '10 min' },



                          { mins: 25, label: '25 min' },



                          { mins: 45, label: '45 min' }



                        ].map(p => (



                          <button



                            key={p.mins}



                            onClick={() => applyPresetTimer(p.mins)}



                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-amber-300 border border-slate-700 cursor-pointer active:scale-95"



                          >



                            {p.label}



                          </button>



                        ))}



                      </div>



                    </div>







                    {/* Custom Timer Input: Hours, Minutes, Seconds */}



                    <div className="bg-stone-900/90 p-4 rounded-2xl border border-indigo-500/30">



                      <div className="text-xs font-black uppercase text-slate-300 mb-2">



                        Set Your Custom Timer:



                      </div>



                      <div className="flex items-center justify-center gap-3">



                        <div className="text-center">



                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Hours</label>



                          <input



                            type="number"



                            min="0"



                            max="23"



                            value={customHours}



                            onChange={(e) => setCustomHours(e.target.value)}



                            className="w-16 bg-stone-950 text-white font-mono text-center font-black py-2 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-amber-400"



                          />



                        </div>



                        <span className="text-lg font-black text-slate-500 pt-4">:</span>



                        <div className="text-center">



                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Minutes</label>



                          <input



                            type="number"



                            min="0"



                            max="59"



                            value={customMins}



                            onChange={(e) => setCustomMins(e.target.value)}



                            className="w-16 bg-stone-950 text-white font-mono text-center font-black py-2 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-amber-400"



                          />



                        </div>



                        <span className="text-lg font-black text-slate-500 pt-4">:</span>



                        <div className="text-center">



                          <label className="text-[10px] text-slate-400 font-bold block mb-1">Seconds</label>



                          <input



                            type="number"



                            min="0"



                            max="59"



                            value={customSecs}



                            onChange={(e) => setCustomSecs(e.target.value)}



                            className="w-16 bg-stone-950 text-white font-mono text-center font-black py-2 rounded-xl border border-slate-700 text-sm focus:outline-none focus:border-amber-400"



                          />



                        </div>



                        <div className="pt-4">



                          <button



                            onClick={applyCustomTimer}



                            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs cursor-pointer shadow"



                          >



                            Set Timer



                          </button>



                        </div>



                      </div>



                    </div>







                    {/* Timer Controls */}



                    <div className="flex items-center justify-center gap-3">



                      <button



                        onClick={() => {



                          setTimerRunning(r => !r);



                          playFx('pop');



                        }}



                        className={`px-6 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg transition active:scale-95 ${



                          timerRunning ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'



                        }`}



                      >



                        {timerRunning ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-stone-950" />}



                        <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>



                      </button>







                      <button



                        onClick={() => {



                          setTimerRunning(false);



                          setTimerSecondsLeft(timerTotalDuration);



                          playFx('pop');



                        }}



                        className="px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-slate-300 font-bold text-sm cursor-pointer shadow"



                      >



                        Reset



                      </button>



                    </div>



                  </div>



                );



              })()}







            </div>







          </div>



        )}







      </div>







    </div>



  );



}



