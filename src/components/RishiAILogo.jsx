import React, { useState } from 'react';

export function RishiAILogo({ className = 'w-10 h-10', bgClassName = 'bg-stone-950 border-2 border-amber-400' }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center rounded-2xl shadow-lg shadow-amber-500/20 overflow-hidden ${bgClassName} ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-purple-900/25 pointer-events-none" />

      {!imageError ? (
        <img 
          src="/shankar-ai-logo.jpg" 
          alt="Rishi AI Official Logo" 
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-0.5 relative z-10 drop-shadow-md select-none"
        />
      ) : (
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-[85%] h-[85%] relative z-10 drop-shadow-md"
        >
          <polygon 
            points="50,4 90,26 90,74 50,96 10,74 10,26" 
            stroke="url(#shieldGoldGrad)" 
            strokeWidth="3.5" 
            strokeLinejoin="round"
            fill="#0c0716" 
            fillOpacity="0.8"
          />
          <line x1="50" y1="16" x2="28" y2="38" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
          <line x1="50" y1="16" x2="72" y2="38" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
          <line x1="28" y1="38" x2="35" y2="68" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
          <line x1="72" y1="38" x2="65" y2="68" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
          <line x1="35" y1="68" x2="50" y2="84" stroke="#e11d48" strokeWidth="1.5" opacity="0.7" />
          <line x1="65" y1="68" x2="50" y2="84" stroke="#e11d48" strokeWidth="1.5" opacity="0.7" />
          <circle cx="50" cy="16" r="3.5" fill="#fef08a" />
          <circle cx="28" cy="38" r="3" fill="#fbbf24" />
          <circle cx="72" cy="38" r="3" fill="#fbbf24" />
          <circle cx="35" cy="68" r="3" fill="#f97316" />
          <circle cx="65" cy="68" r="3" fill="#f97316" />
          <circle cx="50" cy="84" r="3.5" fill="#f43f5e" />
          <path 
            d="M 64 35 C 62 26, 42 24, 38 33 C 34 40, 42 46, 52 49 C 64 53, 68 59, 64 68 C 58 78, 36 76, 34 66" 
            stroke="url(#letterSGrad)" 
            strokeWidth="6.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          <defs>
            <linearGradient id="shieldGoldGrad" x1="10" y1="4" x2="90" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="letterSGrad" x1="34" y1="26" x2="66" y2="76" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.3" stopColor="#fde047" />
              <stop offset="0.7" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  );
}

export default RishiAILogo;

export const ShankarAILogo = RishiAILogo;
