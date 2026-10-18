import React from 'react';

export function BlackDogLogo({ className = 'w-10 h-10', bgClassName = 'bg-orange-500' }) {
  return (
    <div className={`relative flex items-center justify-center rounded-2xl ${bgClassName} shadow-lg shadow-orange-500/30 overflow-hidden ${className}`}>
      {/* Sleek stylized Black Dog Mascot SVG */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-[82%] h-[82%]"
      >
        {/* Subtle orange aura */}
        <circle cx="50" cy="50" r="46" fill="#f97316" fillOpacity="0.3" />
        
        {/* Black Dog Body & Head Silhouette */}
        <path
          d="M 22 75 
             C 25 65, 30 58, 38 52 
             C 36 46, 36 38, 38 30 
             L 42 16 
             L 50 28 
             C 55 26, 62 26, 68 29 
             L 76 16 
             L 78 32 
             C 84 40, 84 50, 80 60 
             C 86 68, 88 74, 88 84 
             C 76 86, 60 86, 50 86 
             C 40 86, 28 86, 22 75 Z"
          fill="#09090b"
          stroke="#18181b"
          strokeWidth="2"
        />

        {/* Snout and Jaw */}
        <path
          d="M 46 44 
             L 54 44 
             C 58 44, 62 47, 64 52 
             L 60 58 
             C 54 62, 46 62, 40 58 
             Z"
          fill="#18181b"
        />

        {/* Nose */}
        <ellipse cx="50" cy="52" rx="3.5" ry="2.5" fill="#f97316" />

        {/* Piercing Amber / Gold Eyes */}
        <path
          d="M 42 38 L 47 37 L 44 41 Z"
          fill="#fbbf24"
        />
        <path
          d="M 58 37 L 63 38 L 61 41 Z"
          fill="#fbbf24"
        />

        {/* Sleek collar with golden 'S' medal (Shankar) */}
        <path
          d="M 36 72 Q 50 80 64 72"
          stroke="#ea580c"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="78" r="4.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default BlackDogLogo;
