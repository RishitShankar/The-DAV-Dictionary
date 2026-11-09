import React, { useState, useEffect } from 'react';
import {
  BarChart3, Clock, Smartphone, RefreshCw, Zap, TrendingDown,
  TrendingUp, Award, ShieldCheck, AlertCircle, ArrowUpRight, Flame
} from 'lucide-react';
import { focusDataStore } from '../../services/focusDataStore';

export function RegainScreenTimeAnalytics() {
  const [screenTimeData, setScreenTimeData] = useState(() => focusDataStore.getScreenTimeData());
  const [isScanning, setIsScanning] = useState(false);
  const [timeRangeTab, setTimeRangeTab] = useState('today'); // today | week | month
  const [selectedBarHour, setSelectedBarHour] = useState(null);

  useEffect(() => {
    const unsub = focusDataStore.subscribe((event, data) => {
      if (event === 'screen_time_updated') {
        setScreenTimeData(data);
      }
    });
    return unsub;
  }, []);

  const handleScanDevice = () => {
    setIsScanning(true);
    setTimeout(() => {
      const updated = focusDataStore.simulateScreenTimeScan();
      setScreenTimeData(updated);
      setIsScanning(false);
    }, 1200);
  };

  const formatMins = (totalMins) => {
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  };

  const usefulPercent = Math.round(
    (screenTimeData.usefulMinutes / Math.max(1, screenTimeData.totalScreenTimeMinutes)) * 100
  );
  const distractedPercent = 100 - usefulPercent;

  // Find max bar height for 24h timeline
  const maxHourlyMinutes = Math.max(
    ...screenTimeData.hourlyUsage.map(h => h.useful + h.distracted),
    45
  );

  return (
    <div className="w-full space-y-6 text-white select-none">
      {/* ------------------------------------------------------------- */}
      {/* Top Header Card with Real-time Scan Action                    */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl bg-gradient-to-br from-[#121620] via-stone-900 to-black border border-stone-800 p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                AI Device Telemetry
              </span>
              <span className="text-xs text-stone-400">
                Last scanned: {new Date(screenTimeData.lastScanned).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Screen Time Scanner</h2>
          </div>

          <button
            onClick={handleScanDevice}
            disabled={isScanning}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-black text-white shadow-lg shadow-emerald-950 transition-all active:scale-95"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Telemetry...' : 'Scan Device Usage'}</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Core Metric Gauges: Total, Useful vs Distracted, Pickups     */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Gauge 1: Total Screen Time */}
          <div className="p-5 rounded-2xl bg-stone-950/70 border border-stone-850 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-stone-400 font-semibold">
              <span>Total Screen Time</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="my-3 flex items-baseline space-x-2">
              <span className="text-4xl font-black text-white">
                {formatMins(screenTimeData.totalScreenTimeMinutes)}
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -18% vs avg
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Pickups: {screenTimeData.devicePickups} • First unlocked: {screenTimeData.firstPickup}
            </p>
          </div>

          {/* Gauge 2: Useful Screen Time */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
              <span>Useful (Study & Productivity)</span>
              <span className="font-mono font-bold">{usefulPercent}%</span>
            </div>
            <div className="my-3">
              <span className="text-4xl font-black text-emerald-300">
                {formatMins(screenTimeData.usefulMinutes)}
              </span>
            </div>
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${usefulPercent}%` }}
              />
            </div>
          </div>

          {/* Gauge 3: Distracted Screen Time */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
              <span>Distracted (Reels & Social)</span>
              <span className="font-mono font-bold">{distractedPercent}%</span>
            </div>
            <div className="my-3">
              <span className="text-4xl font-black text-rose-300">
                {formatMins(screenTimeData.distractedMinutes)}
              </span>
            </div>
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${distractedPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 24-Hour Timeline Bar Chart (Useful vs Distracted by Hour)     */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl bg-[#14161d] border border-stone-800 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">24-Hour Timeline Analysis</h3>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 mr-1.5" />
              Useful
            </span>
            <span className="flex items-center text-rose-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 mr-1.5" />
              Distracted
            </span>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="h-44 w-full flex items-end justify-between gap-1 pt-6 pb-2 px-1 border-b border-stone-800/80">
          {screenTimeData.hourlyUsage.map((hourObj) => {
            const usefulH = (hourObj.useful / maxHourlyMinutes) * 100;
            const distractedH = (hourObj.distracted / maxHourlyMinutes) * 100;
            const isSelected = selectedBarHour === hourObj.hour;

            return (
              <div
                key={hourObj.hour}
                onClick={() => setSelectedBarHour(isSelected ? null : hourObj.hour)}
                className="flex-1 flex flex-col items-center justify-end h-full cursor-pointer group"
                title={`${hourObj.hour}:00 - Useful: ${hourObj.useful}m, Distracted: ${hourObj.distracted}m`}
              >
                {/* Stacked Bar */}
                <div className="w-full max-w-[12px] flex flex-col justify-end rounded-t-sm overflow-hidden transition-all group-hover:scale-110">
                  {/* Distracted Segment (top) */}
                  {hourObj.distracted > 0 && (
                    <div
                      className="w-full bg-rose-500 hover:bg-rose-400 transition-all"
                      style={{ height: `${distractedH}%` }}
                    />
                  )}
                  {/* Useful Segment (bottom) */}
                  {hourObj.useful > 0 && (
                    <div
                      className="w-full bg-emerald-400 hover:bg-emerald-300 transition-all"
                      style={{ height: `${usefulH}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hour Axis Labels (Every 3 hours) */}
        <div className="flex justify-between text-[10px] text-stone-500 font-mono px-1">
          <span>00:00</span>
          <span>03:00</span>
          <span>06:00</span>
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>18:00</span>
          <span>21:00</span>
          <span>23:59</span>
        </div>

        {selectedBarHour && (
          <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs flex justify-between items-center text-stone-300 animate-in fade-in">
            <span>Details for hour {selectedBarHour}:00:</span>
            <span className="font-bold text-emerald-400">
              Useful: {screenTimeData.hourlyUsage.find(h => h.hour === selectedBarHour)?.useful || 0}m
            </span>
            <span className="font-bold text-rose-400">
              Distracted: {screenTimeData.hourlyUsage.find(h => h.hour === selectedBarHour)?.distracted || 0}m
            </span>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* App Usage Breakdown List (Per-App Telemetry)                  */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl bg-[#14161d] border border-stone-800 p-6 space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center justify-between">
          <span>Application Screen Time Telemetry</span>
          <span className="text-xs font-normal text-stone-400">Ranked by duration</span>
        </h3>

        <div className="space-y-3">
          {screenTimeData.appUsageList.map((app) => {
            const isUseful = app.category === 'useful';
            const isDistracted = app.category === 'distracted';
            return (
              <div
                key={app.id}
                className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-850 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isUseful
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                        : isDistracted
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                        : 'bg-stone-850 text-stone-300'
                    }`}
                  >
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{app.name}</h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                          isUseful
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : isDistracted
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {app.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {app.pickups} pickups • {app.limitMinutes > 0 ? `Limit: ${formatMins(app.limitMinutes)}` : 'Unrestricted'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-black font-mono text-white">
                    {formatMins(app.minutes)}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {Math.round((app.minutes / screenTimeData.totalScreenTimeMinutes) * 100)}% of day
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
