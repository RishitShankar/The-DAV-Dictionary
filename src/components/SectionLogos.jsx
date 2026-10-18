import React from 'react';

// Custom branded vector logos for all 10 Sections of The DAV Dictionary

export function Section1Logo({ className = "w-5 h-5", ...props }) {
  // Master Overview & Hub: Golden & Crimson DAV Hexagonal Hub Crest
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>
      <polygon points="16,2 29,9.5 29,22.5 16,30 3,22.5 3,9.5" fill="url(#s1-grad)" stroke="#fef08a" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="6" fill="#1c1917" stroke="#fde047" strokeWidth="1.5" />
      <polygon points="16,11 17.5,14.5 21,16 17.5,17.5 16,21 14.5,17.5 11,16 14.5,14.5" fill="#fde047" />
    </svg>
  );
}

export function Section2Logo({ className = "w-5 h-5", ...props }) {
  // Section 2: Official DAV Textbooks (LKG-8) - Open Gilded Book with Knowledge Torch Flame
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s2-cover" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="s2-flame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      <rect x="3" y="10" width="26" height="18" rx="3" fill="url(#s2-cover)" stroke="#fcd34d" strokeWidth="1.5" />
      <path d="M5 24C9 21 13 21 16 23C19 21 23 21 27 24V13C23 11 19 11 16 13C13 11 9 11 5 13V24Z" fill="#fffbeb" stroke="#d97706" strokeWidth="1" />
      <line x1="16" y1="13" x2="16" y2="23" stroke="#92400e" strokeWidth="1.2" />
      {/* Knowledge Torch Flame on top */}
      <path d="M16 2C17.5 4.5 19 6 18 8C17 9.5 15 9.5 14 8C13 6 14.5 4.5 16 2Z" fill="url(#s2-flame)" />
      <circle cx="16" cy="7" r="1.5" fill="#fef08a" />
    </svg>
  );
}

export function Section3Logo({ className = "w-5 h-5", ...props }) {
  // Section 3: Q&A Repository - Glowing Question Beacon & Solution Shield
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s3-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
      <path d="M16 2L28 6V16C28 23 23 28 16 30C9 28 4 23 4 16V6L16 2Z" fill="url(#s3-grad)" stroke="#93c5fd" strokeWidth="1.5" />
      <path d="M12.5 11C12.5 9 14 7.5 16 7.5C18 7.5 19.5 9 19.5 11C19.5 13 17 14 16 15V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="20.5" r="1.3" fill="#ffffff" />
      <path d="M20 23L22 25L26 21" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Section4Logo({ className = "w-5 h-5", ...props }) {
  // Section 4: Shankar AI Companion - Cyber Quantum Neural Spark
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s4-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" fill="#0f172a" stroke="url(#s4-grad)" strokeWidth="1.8" />
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#38bdf8" strokeWidth="1.2" transform="rotate(30 16 16)" opacity="0.8" />
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#a855f7" strokeWidth="1.2" transform="rotate(-30 16 16)" opacity="0.8" />
      <circle cx="16" cy="16" r="4" fill="url(#s4-grad)" />
      <circle cx="16" cy="16" r="1.8" fill="#ffffff" />
    </svg>
  );
}

export function Section5Logo({ className = "w-5 h-5", ...props }) {
  // Section 5: Interactive Quizzes - Golden Winner Trophy & Victory Star
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s5-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#ca8a04" />
        </linearGradient>
      </defs>
      <path d="M9 5H23V13C23 17 20 20 16 20C12 20 9 17 9 13V5Z" fill="url(#s5-gold)" stroke="#713f12" strokeWidth="1.2" />
      <path d="M9 8H5C4 8 3 9 3 10V11C3 14 5 15 9 15" stroke="url(#s5-gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M23 8H27C28 8 29 9 29 10V11C29 14 27 15 23 15" stroke="url(#s5-gold)" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20V25H18V20" fill="url(#s5-gold)" stroke="#713f12" strokeWidth="1" />
      <rect x="10" y="25" width="12" height="4" rx="1.5" fill="#713f12" stroke="#eab308" strokeWidth="1" />
      <polygon points="16,9 17.2,11.5 20,12 18,14 18.5,17 16,15.5 13.5,17 14,14 12,12 14.8,11.5" fill="#ffffff" />
    </svg>
  );
}

export function Section6Logo({ className = "w-5 h-5", ...props }) {
  // Section 6: Academic Dictionary - Lexicon Shield with A-Z Monogram
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s6-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="24" height="24" rx="5" fill="url(#s6-grad)" stroke="#d8b4fe" strokeWidth="1.5" />
      <path d="M4 8H28" stroke="#a855f7" strokeWidth="1" />
      <line x1="8" y1="4" x2="8" y2="28" stroke="#c084fc" strokeWidth="2" />
      {/* A-Z typographic emblem */}
      <text x="17.5" y="19" fill="#fef08a" fontSize="11" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
        AZ
      </text>
      <path d="M11 23H24" stroke="#fde047" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Section7Logo({ className = "w-5 h-5", ...props }) {
  // Section 7: Syllabus & Curriculum Blueprint - Architectural Blueprint Grid & Compass
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s7-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="26" height="26" rx="4" fill="url(#s7-blue)" stroke="#38bdf8" strokeWidth="1.5" />
      {/* Blueprint Grid */}
      <line x1="3" y1="11" x2="29" y2="11" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="3" y1="19" x2="29" y2="19" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="11" y1="3" x2="11" y2="29" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      <line x1="19" y1="3" x2="19" y2="29" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
      {/* Architect Compass Drafting Legs */}
      <path d="M16 7L10 23M16 7L22 23M12.5 16.5H19.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="7" r="1.5" fill="#fde047" />
    </svg>
  );
}

export function Section8Logo({ className = "w-5 h-5", ...props }) {
  // Section 8: Notice Board & Circulars - DAV Official Circular Board with Golden Bell
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s8-wood" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="s8-bell" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="3" y="5" width="26" height="23" rx="3" fill="#1c1917" stroke="url(#s8-wood)" strokeWidth="2.5" />
      <circle cx="16" cy="4" r="2" fill="#ef4444" stroke="#fee2e2" strokeWidth="0.8" />
      {/* Notice Paper Pinned */}
      <rect x="7" y="9" width="18" height="15" rx="1.5" fill="#fef3c7" />
      <line x1="10" y1="13" x2="18" y2="13" stroke="#92400e" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="10" y1="16" x2="22" y2="16" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
      <line x1="10" y1="19" x2="19" y2="19" stroke="#b45309" strokeWidth="1" strokeLinecap="round" />
      {/* Ringing Brass Bell in corner */}
      <path d="M21 21C21 19 23 18 24.5 18C26 18 28 19 28 21L29 24H20L21 21Z" fill="url(#s8-bell)" stroke="#b45309" strokeWidth="0.8" />
      <circle cx="24.5" cy="25" r="1" fill="#b45309" />
    </svg>
  );
}

export function Section9Logo({ className = "w-5 h-5", ...props }) {
  // Section 9: Student Personal Profile - Smart Student ID Card & Biometric Vault
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s9-card" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <rect x="3" y="6" width="26" height="20" rx="3.5" fill="url(#s9-card)" stroke="#c4b5fd" strokeWidth="1.5" />
      {/* Student Photo Frame */}
      <rect x="6" y="10" width="7" height="9" rx="1.5" fill="#312e81" stroke="#a78bfa" strokeWidth="1" />
      <circle cx="9.5" cy="13" r="1.8" fill="#e0e7ff" />
      <path d="M7 17.5C7.5 16 8.5 15.5 9.5 15.5C10.5 15.5 11.5 16 12 17.5" stroke="#e0e7ff" strokeWidth="1" strokeLinecap="round" />
      {/* Card Info Lines */}
      <line x1="16" y1="11" x2="25" y2="11" stroke="#fbcfe8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="14" x2="23" y2="14" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="16" y1="17" x2="21" y2="17" stroke="#e9d5ff" strokeWidth="1.2" strokeLinecap="round" />
      {/* Smart Chip / Security Holo Stamp */}
      <circle cx="23" cy="21" r="2.5" fill="#fde047" stroke="#ca8a04" strokeWidth="0.8" />
    </svg>
  );
}

export function Section10Logo({ className = "w-5 h-5", ...props }) {
  // Section 10: About Creator Rishit Shankar - Royal Gold Crown & Monogram RS Crest
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <linearGradient id="s10-shield" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="s10-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      {/* Outer Golden Laurel Shield */}
      <path d="M16 2L28 6V17C28 23.5 22.5 28.5 16 30.5C9.5 28.5 4 23.5 4 17V6L16 2Z" fill="#1c1917" stroke="url(#s10-gold)" strokeWidth="1.8" />
      {/* Head Boy Golden Crown */}
      <polygon points="9,13 12,18 16,11 20,18 23,13 23,20 9,20" fill="url(#s10-gold)" stroke="#78350f" strokeWidth="0.8" />
      <circle cx="9" cy="12" r="1.2" fill="#ef4444" />
      <circle cx="16" cy="10" r="1.3" fill="#ef4444" />
      <circle cx="23" cy="12" r="1.2" fill="#ef4444" />
      {/* Monogram RS */}
      <text x="16" y="26.5" fill="#fde047" fontSize="6.5" fontWeight="900" fontFamily="serif" textAnchor="middle" letterSpacing="0.5">
        RS
      </text>
    </svg>
  );
}

export const sectionLogosMap = {
  1: Section1Logo,
  2: Section2Logo,
  3: Section3Logo,
  4: Section4Logo,
  5: Section5Logo,
  6: Section6Logo,
  7: Section7Logo,
  8: Section8Logo,
  9: Section9Logo,
  10: Section10Logo
};
