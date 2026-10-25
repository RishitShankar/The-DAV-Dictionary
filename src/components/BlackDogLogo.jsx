import React from 'react';

export function BlackDogLogo({ className = 'w-10 h-10', bgClassName = '' }) {
  return (
    <div className={`relative flex items-center justify-center rounded-xl overflow-hidden shrink-0 ${bgClassName} ${className}`}>
      <img 
        src="/logo.png" 
        alt="DAV Dictionary Official Logo"
        className="w-full h-full object-contain select-none"
        onError={(e) => {
          e.currentTarget.src = '/new-dav-dictionary-logo.jpg';
        }}
      />
    </div>
  );
}

export default BlackDogLogo;
