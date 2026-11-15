import React, { useState, useEffect } from 'react';
import { 
  X, Bus, Navigation, MapPin, Clock, Phone, AlertTriangle, 
  ShieldCheck, CheckCircle2, Radio, Compass, RefreshCw 
} from 'lucide-react';

const BUS_ROUTES = [
  {
    id: 'bus-04',
    name: 'Bus 04 • Mithanpura Express',
    driver: 'Rajesh Kumar Singh',
    phone: '+91 94314 28104',
    registration: 'BR 06 PA 4402',
    capacity: '52 Seater (Clean & GPS Enabled)',
    speed: 36,
    eta: '7 mins',
    nextStop: 'Khabra Mandir Chowk',
    totalStops: 8,
    completedStops: 6,
    stops: [
      { name: 'Bhagwanpur Chowk', time: '07:10 AM', passed: true },
      { name: 'Zila School Road', time: '07:22 AM', passed: true },
      { name: 'Mithanpura Post Office', time: '07:35 AM', passed: true },
      { name: 'Pani Tanki Chowk', time: '07:44 AM', passed: true },
      { name: 'Ramdayalu Nagar', time: '07:53 AM', passed: true },
      { name: 'Khabra Mandir Chowk', time: '08:02 AM', passed: true },
      { name: 'Khabra High School Halt', time: '08:08 AM', passed: false, active: true },
      { name: 'DAV Public School Campus Gate 1', time: '08:15 AM', passed: false }
    ]
  },
  {
    id: 'bus-07',
    name: 'Bus 07 • Bairia Zero-Mile Shuttle',
    driver: 'Manoj Sharma',
    phone: '+91 98350 19707',
    registration: 'BR 06 PA 3918',
    capacity: '48 Seater (CCTV Verified)',
    speed: 42,
    eta: '14 mins',
    nextStop: 'Maripur Overbridge',
    totalStops: 7,
    completedStops: 4,
    stops: [
      { name: 'Bairia Bus Stand', time: '07:05 AM', passed: true },
      { name: 'Zero Mile Chowk', time: '07:18 AM', passed: true },
      { name: 'Ahiyapur PS', time: '07:30 AM', passed: true },
      { name: 'Akharaghat Bridge', time: '07:42 AM', passed: true },
      { name: 'Maripur Overbridge', time: '07:56 AM', passed: false, active: true },
      { name: 'Gobarsahi Chowk', time: '08:06 AM', passed: false },
      { name: 'DAV Public School Campus Gate 2', time: '08:18 AM', passed: false }
    ]
  },
  {
    id: 'bus-12',
    name: 'Bus 12 • Junction & Station Flyer',
    driver: 'Santosh Paswan',
    phone: '+91 91225 74012',
    registration: 'BR 06 PB 6112',
    capacity: '52 Seater (First Aid Equipped)',
    speed: 31,
    eta: '4 mins',
    nextStop: 'Khabra Highway Bypass',
    totalStops: 6,
    completedStops: 5,
    stops: [
      { name: 'Muzaffarpur Junction Gate 1', time: '07:15 AM', passed: true },
      { name: 'Dharamsala Chowk', time: '07:25 AM', passed: true },
      { name: 'Sutapatti Crossing', time: '07:38 AM', passed: true },
      { name: 'Kalyani Chowk', time: '07:48 AM', passed: true },
      { name: 'Khabra Highway Bypass', time: '08:03 AM', passed: false, active: true },
      { name: 'DAV Public School Campus Gate 1', time: '08:10 AM', passed: false }
    ]
  }
];

export function DavBusTelemetryModal({ isOpen, onClose }) {
  const [selectedBusId, setSelectedBusId] = useState('bus-04');
  const [simulatedTime, setSimulatedTime] = useState('08:05:42 AM');
  const [sosSent, setSosSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      const now = new Date();
      setSimulatedTime(now.toLocaleTimeString('en-US'));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentBus = BUS_ROUTES.find(b => b.id === selectedBusId) || BUS_ROUTES[0];

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bus className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                <span>DAV Transport Fleet • Live Telemetry</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-ping" />
                  Live GPS
                </span>
              </h2>
              <p className="text-xs text-stone-400">DAV Public School, Khabra, Muzaffarpur • Real-time Safety & Route Tracking (Concept #96)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bus Selector Tabs */}
        <div className="px-6 py-3 bg-stone-950/50 border-b border-stone-800/80 flex flex-wrap gap-2">
          {BUS_ROUTES.map(bus => (
            <button
              key={bus.id}
              onClick={() => setSelectedBusId(bus.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                selectedBusId === bus.id
                  ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                  : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>{bus.name}</span>
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Live Route Progress & Telemetry */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Speed & ETA Gauge Card */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mb-1">Live Speed</div>
                <div className="text-2xl font-black text-amber-400 font-mono">{currentBus.speed} <span className="text-xs text-stone-400">km/h</span></div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Within Speed Limit
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mb-1">Campus ETA</div>
                <div className="text-2xl font-black text-emerald-400 font-mono">{currentBus.eta}</div>
                <div className="text-[10px] text-stone-400 mt-1">Arrival ~ 08:15 AM</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800 text-center">
                <div className="text-[10px] text-stone-400 font-medium uppercase tracking-wider mb-1">GPS Clock</div>
                <div className="text-lg font-bold text-stone-200 font-mono mt-1">{simulatedTime}</div>
                <div className="text-[10px] text-stone-400 mt-1">Satellite Lock: 12 Sats</div>
              </div>
            </div>

            {/* Simulated Live Route Map Representation */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-stone-200 flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-amber-400" />
                  <span>Route Path: {currentBus.name}</span>
                </div>
                <div className="text-[11px] text-amber-400/90 font-mono">
                  {currentBus.completedStops} / {currentBus.totalStops} Stops Passed
                </div>
              </div>

              {/* Graphical Route Bar */}
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden mb-5">
                <div 
                  className="bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(currentBus.completedStops / currentBus.totalStops) * 100}%` }}
                />
              </div>

              {/* Stops Timeline */}
              <div className="space-y-3 relative pl-4 border-l-2 border-stone-700/60 ml-2">
                {currentBus.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="relative flex items-center justify-between text-xs">
                    <div 
                      className={`absolute -left-[23px] w-3.5 h-3.5 rounded-full border-2 ${
                        stop.passed 
                          ? 'bg-emerald-500 border-emerald-300' 
                          : stop.active 
                            ? 'bg-amber-400 border-white ring-4 ring-amber-400/20 animate-pulse' 
                            : 'bg-stone-800 border-stone-600'
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${stop.active ? 'text-amber-300 font-bold' : stop.passed ? 'text-stone-300' : 'text-stone-500'}`}>
                        {stop.name}
                      </span>
                      {stop.active && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          Current Approaching
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-stone-400">{stop.time}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Right: Vehicle, Driver, Safety & SOS Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Driver Profile */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
              <div className="text-xs font-bold text-stone-300 uppercase tracking-wider">Assigned Driver & Bus Specs</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 font-bold text-lg">
                  {currentBus.driver.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-stone-100 text-sm">{currentBus.driver}</div>
                  <div className="text-xs text-stone-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> DAV Verified Commercial License
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Registration:</span>
                  <span className="font-mono font-bold text-stone-200">{currentBus.registration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Bus Capacity:</span>
                  <span className="text-stone-200">{currentBus.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Driver Contact:</span>
                  <a href={`tel:${currentBus.phone}`} className="text-amber-400 hover:underline flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3" /> {currentBus.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* School Campus Transport Desk Contact */}
            <div className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800 text-xs space-y-2">
              <div className="font-bold text-stone-300">Transport Control Incharge</div>
              <p className="text-stone-400 text-[11px]">
                DAV Public School, Khabra, Muzaffarpur, NH-28, Bihar 843146
              </p>
              <div className="flex justify-between text-stone-300 pt-1 font-mono">
                <span>Helpline:</span>
                <span className="text-amber-400">+91 621 228 1004</span>
              </div>
            </div>

            {/* Emergency Alert Trigger */}
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Parent / Student SOS Hotline</span>
              </div>
              <p className="text-stone-400 text-[11px]">
                If bus is delayed past scheduled pickup window by more than 15 minutes, trigger instant notification to the Transport Officer.
              </p>
              <button
                onClick={() => setSosSent(true)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  sosSent 
                    ? 'bg-emerald-600 text-white cursor-default' 
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40'
                }`}
              >
                {sosSent ? '✓ Alert Transmitted to Transport Desk' : '🚨 Trigger Bus Delay Alert'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
