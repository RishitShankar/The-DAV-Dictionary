import React, { useState } from 'react';

export function RishiAILogo({ className = 'w-10 h-10', bgClassName = 'bg-stone-950 border-2 border-amber-400' }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative flex items-center justify-center rounded-2xl shadow-lg shadow-amber-500/20 overflow-hidden ${bgClassName} ${className}`}>
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-600/15 to-purple-900/25 pointer-events-none" />

      {!imageError ? (
        <img 
          src="/logo.png" 
          alt="DAV Dictionary Official Logo" 
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-0.5 relative z-10 drop-shadow-md select-none"
        />
      ) : (
        <img 
          src="/new-dav-dictionary-logo.jpg" 
          alt="DAV Dictionary Official Logo" 
          className="w-full h-full object-contain p-0.5 relative z-10 drop-shadow-md select-none"
        />
      )}
    </div>
  );
}

export default RishiAILogo;

export const ShankarAILogo = RishiAILogo;
