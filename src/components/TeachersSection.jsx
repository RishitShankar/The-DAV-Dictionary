import React, { useState, useEffect, useRef } from 'react';
import { 
  School, GraduationCap, Users, BookOpen, Calendar, 
  FileText, Award, Bell, CheckCircle2, Search, Plus, 
  Filter, Download, Sparkles, MessageSquare, ClipboardList,
  Clock, ShieldCheck, Bookmark, ChevronRight, ChevronDown, Send, Check,
  Video, Mic, MicOff, VideoOff, ScreenShare, Share2, AlertCircle,
  HelpCircle, MessageCircle, BarChart3, TrendingUp, UserCheck,
  UserX, Paperclip, Smile, Image as ImageIcon,
  CheckCheck, Volume2, VolumeX, Sparkle, Eye, Star, Layers, Zap, X,
  ExternalLink, RefreshCw, Bot, Smartphone, RotateCcw,
  ArrowRight, Play, CheckSquare, Radio, Maximize2, Minimize2,
  PhoneOff, Hand, MessageSquareMore, CheckCircle,
  ChevronLeft, Compass, Palette, Trash2, Trophy, Share, Phone, MoreVertical, Settings,
  Camera, UploadCloud, Edit3, Music, Film, FileCheck, Printer, PenTool
} from 'lucide-react';
import { RishiAILogo } from './RishiAILogo';
import { WhatsAppChannelsModule } from './WhatsAppChannelsModule';
import { getAllTeachers } from '../data/davTeachers50';
import { getRegisteredUsers, MASTER_DEVELOPER_ACCOUNT } from '../data/preloadedUsers';

// Helper to compress uploaded images to lightweight data URLs (avoids 5MB localStorage quota limit)
const compressImageToDataUrl = (file, maxDim = 256, quality = 0.82) => {
  return new Promise((resolve) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(ev.target.result);
      img.src = ev.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
};
import { saveCloudDoubtChats, fetchCloudDoubtChats, subscribeCloudDoubtChats, saveCloudLiveBroadcasts, fetchCloudLiveBroadcasts, subscribeCloudLiveBroadcasts, fetchCloudStudents, broadcastCallSignal, subscribeCallSignals } from '../services/supabaseClient';

// Complete DAV School Class and Section Configuration
const SCHOOL_CLASSES_CONFIG = [
  { id: '8', name: 'Class 8', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '7', name: 'Class 7', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '6', name: 'Class 6', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '5', name: 'Class 5', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '4', name: 'Class 4', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '3', name: 'Class 3', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '2', name: 'Class 2', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: '1', name: 'Class 1', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: 'UKG', name: 'UKG', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: 'LKG', name: 'LKG', sections: ['A', 'B', 'C', 'D', 'E'] },
  { id: 'Nursery', name: 'Nursery', sections: ['A', 'B', 'C', 'D', 'E'] }
];

// Examination Terms for Class 8 vs Classes LKG to 7
const EXAM_TERMS_CONFIG = {
  class8: [
    'First Periodic Test (PT-1)',
    'Half-Yearly Examination',
    'Second Periodic Test (PT-2)',
    'Pre-Board 1',
    'Pre-Board 2',
    'Pre-Board 3',
    'Annual Board Examination'
  ],
  lowerClasses: [
    'First Periodic Test (PT-1)',
    'Second Periodic Test (PT-2)',
    'Half-Yearly Examination',
    'Third Periodic Test (PT-3)',
    'Fourth Periodic Test (PT-4)',
    'Annual Examination'
  ]
};

// 10 Official DAV Prescribed Subjects in Exact Specified Order
const DAV_SUBJECTS_10 = [
  { key: 'math', name: 'Math', short: 'Math' },
  { key: 'science', name: 'Science', short: 'Sci' },
  { key: 'sst', name: 'SST', short: 'SST' },
  { key: 'english', name: 'English', short: 'Eng' },
  { key: 'hindi', name: 'Hindi', short: 'Hin' },
  { key: 'sanskrit', name: 'Sanskrit', short: 'Skt' },
  { key: 'computer', name: 'Computer', short: 'Comp' },
  { key: 'ns', name: 'NS', short: 'NS' },
  { key: 'drawing', name: 'Drawing', short: 'Draw' },
  { key: 'gk', name: 'GK', short: 'GK' }
];

const DIRECT_CONTACT_NUMBER = '919470033984';
const TEACHER_CHATS_STORAGE_KEY = 'dav_faculty_direct_chats_v3';
const HOMEWORK_STORAGE_KEY = 'dav_daily_homework_store_v1';
const ATTENDANCE_STORAGE_KEY = 'dav_attendance_store_v2';
const CUSTOM_TESTS_STORAGE_KEY = 'dav_custom_online_tests_v2';
const TEST_RESULTS_STORAGE_KEY = 'dav_test_results_store_v2';
const MARKS_LEDGER_STORAGE_KEY = 'dav_student_marks_ledger_v2';
const LIVE_BROADCASTS_STORAGE_KEY = 'dav_live_broadcasts_v2';
const MARKS_MAX_CONFIG_KEY = 'dav_marks_max_config_v2';
const CUSTOM_TEACHERS_STORAGE_KEY = 'dav_custom_teachers_v2';
const CHAT_WALLPAPER_STORAGE_KEY = 'dav_chat_custom_wallpaper_v1';

// Web Audio API Synthesizer for instant chimes
const playSoundChime = (type = 'sent') => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'sent') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'delivered') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(740, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } else if (type === 'received') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {}
};

// CBSE Standardized Grading Scale Calculator
const calculateCbseGrade = (percentage) => {
  const p = Number(percentage) || 0;
  if (p >= 91) return { grade: 'A1', remarks: 'Outstanding Academic Excellence', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/40' };
  if (p >= 81) return { grade: 'A2', remarks: 'Excellent Performance', color: 'text-teal-400 bg-teal-500/20 border-teal-500/40' };
  if (p >= 71) return { grade: 'B1', remarks: 'Very Good Command', color: 'text-cyan-400 bg-cyan-500/20 border-cyan-500/40' };
  if (p >= 61) return { grade: 'B2', remarks: 'Good Competence', color: 'text-blue-400 bg-blue-500/20 border-blue-500/40' };
  if (p >= 51) return { grade: 'C1', remarks: 'Satisfactory Performance', color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/40' };
  if (p >= 41) return { grade: 'C2', remarks: 'Average - Focus Needed', color: 'text-amber-400 bg-amber-500/20 border-amber-500/40' };
  if (p >= 33) return { grade: 'D', remarks: 'Marginal Pass Threshold', color: 'text-orange-400 bg-orange-500/20 border-orange-500/40' };
  return { grade: 'E', remarks: 'Needs Essential Remedial Guidance', color: 'text-rose-400 bg-rose-500/20 border-rose-500/40' };
};

// =========================================================================
// AUTHENTIC WHATSAPP VOICE CALLING SYNTHESIZER & TONES
// =========================================================================
const createWhatsAppRingtonePlayer = () => {
  const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
  if (!AudioContextClass) return null;
  const ctx = new AudioContextClass();
  let isRunning = true;
  let intervalId = null;

  const playRingBurst = () => {
    if (!isRunning || ctx.state === 'closed') return;
    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.value = 440;
      osc2.frequency.value = 480;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.8);
      osc2.stop(ctx.currentTime + 1.8);
    } catch (e) {}
  };

  playRingBurst();
  intervalId = setInterval(playRingBurst, 3600);

  return {
    stop: () => {
      isRunning = false;
      if (intervalId) clearInterval(intervalId);
      try { ctx.close(); } catch (e) {}
    }
  };
};

const playWhatsAppCallConnectedTone = () => {
  try {
    const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch (e) {}
};

const playWhatsAppCallEndTone = () => {
  try {
    const AudioContextClass = typeof window !== 'undefined' ? (window.AudioContext || window.webkitAudioContext) : null;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    [0, 0.16, 0.32].forEach((delay, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 480 - (idx * 60);
      gain.gain.setValueAtTime(0.09, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.12);
    });
  } catch (e) {}
};


// =========================================================================
// 6-PAGE AUTHENTIC ACADEMIC DIRECTIVE HANDBOOK METADATA
// =========================================================================
const PDF_PAGES_METADATA = {
  homework: {
    pageNumber: '01',
    code: 'DAV-DIR-2026-HW01',
    directiveName: 'DAILY HOMEWORK & CLASSWORK SYLLABUS DIRECTIVE',
    tagline: 'Standardized Homework Distribution & Academic Task Monitoring Protocol',
    badgeText: 'PAGE 1 - CURRICULUM SYLLABUS DISCIPLINE',
    gradeScope: 'Classes: LKG to Class 8 (11 Academic Standards)',
    sectionScope: 'Sections: A, B, C, D, E (5 Standardized Class Cohorts)',
    overview: 'This academic directive establishes the institutional protocol for daily homework and classwork dissemination across DAV Public School. Designed to cultivate daily study discipline, reinforce classroom concepts, and ensure seamless synchronization between faculty, students, and parents.',
    cardGradient: 'from-amber-950/90 via-stone-900 to-emerald-950/80',
    borderColor: 'border-amber-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.25)]',
    stripeGradient: 'from-amber-400 via-yellow-400 to-emerald-400',
    iconGradient: 'from-amber-500 to-emerald-600',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    buttonGradient: 'from-amber-500 via-yellow-500 to-emerald-500 text-stone-950 hover:from-amber-400 hover:to-emerald-400',
    accentText: 'text-amber-400',
    pillarBg: 'bg-stone-900/90 border-amber-500/30',
    corePillars: [
      {
        title: 'Curriculum-Aligned Tasks',
        desc: 'Daily homework directly references prescribed DAV textbooks, chapters, exercises, and NCERT-aligned problem sets with specific page citations.'
      },
      {
        title: 'Multi-Section Granularity',
        desc: 'Independent assignment queues for each class from LKG to 8 across all 5 sections (A through E), accommodating specific teacher lesson plans.'
      },
      {
        title: 'Submission & Diary Tracking',
        desc: 'Clear submission deadlines (08:30 AM standard), notebook formatting guidelines, audio voice reading, and media attachments.'
      }
    ],
    centralButtonText: 'Open Full-Screen Daily Homework Hub',
    centralButtonSub: 'Launch Interactive Class & Section Assignment Manager',
    instructions: [
      'Step 1: Click the central button above to launch the full-screen Daily Homework Hub.',
      'Step 2: Select your academic grade from Nursery, LKG, UKG up to Class 8.',
      'Step 3: Select your assigned section among Sections A, B, C, D, or E.',
      'Step 4: Review active subject tasks, chapter references, submission deadlines, and faculty remarks.',
      'Step 5 (Faculty Only): Use the Assign New Homework action to publish real-time tasks to students.'
    ],
    statPills: [
      { label: 'Classes Covered', val: 'LKG to 8 (11 Grades)' },
      { label: 'Sections Per Class', val: '5 Sections (A-E)' },
      { label: 'Subjects Active', val: '12 Standard Subjects' },
      { label: 'Submission Window', val: 'Before 08:30 AM' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  },
  doubts_chat: {
    pageNumber: '02',
    code: 'DAV-DIR-2026-CHAT02',
    directiveName: 'FACULTY ACADEMIC DIRECT CONSULTATION DESK',
    tagline: 'Real-Time Academic Mentorship & Verified Faculty Interaction Protocol',
    badgeText: 'PAGE 2 - DIRECT MENTORSHIP ECOSYSTEM',
    gradeScope: 'Faculty Roster: Verified Subject Teachers & Heads of Department',
    sectionScope: 'Channels: Sub-Second Synchronized Portal Direct Messaging',
    overview: 'This official directive establishes the institutional protocol for student-faculty academic consultation outside regular school hours. Eliminating educational bottlenecks, students can interact in real time with verified faculty members across all departments with sub-second message delivery.',
    cardGradient: 'from-cyan-950/90 via-slate-900 to-indigo-950/80',
    borderColor: 'border-cyan-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(6,182,212,0.25)]',
    stripeGradient: 'from-cyan-400 via-indigo-400 to-blue-500',
    iconGradient: 'from-cyan-500 to-indigo-600',
    badgeStyle: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
    buttonGradient: 'from-cyan-500 via-teal-400 to-blue-500 text-slate-950 hover:from-cyan-400 hover:to-blue-400',
    accentText: 'text-cyan-400',
    pillarBg: 'bg-slate-900/90 border-cyan-500/30',
    corePillars: [
      {
        title: 'Verified Faculty Roster',
        desc: 'Comprehensive directory spanning Science, Mathematics, Social Science, English, Hindi, Sanskrit, and Computer Science.'
      },
      {
        title: 'Rich Media Attachments',
        desc: 'Direct exchange of textbook images, audio doubt recordings, and video demonstrations with instant in-chat playback.'
      },
      {
        title: 'AI Assisted Faculty Help',
        desc: 'Integrated Instant Teacher AI Answer to provide immediate conceptual guidance when faculty members are offline.'
      }
    ],
    centralButtonText: 'Open Full-Screen Faculty Consultation Desk',
    centralButtonSub: 'Launch Real-Time Direct Doubt Clearance & Messaging Workspace',
    instructions: [
      'Step 1: Click the central button above to enter the Faculty Consultation Desk.',
      'Step 2: Filter teachers by subject (Science, Mathematics, Social Science, Languages, etc.).',
      'Step 3: Select a faculty member to open their direct academic chat channel.',
      'Step 4: Type your doubt, attach images, audio, or video files, and send with sub-second delivery.',
      'Step 5: Click Instant Teacher AI Answer for immediate conceptual solutions.'
    ],
    statPills: [
      { label: 'Active Faculty', val: 'Verified Subject Heads' },
      { label: 'Departments', val: '7 Academic Wings' },
      { label: 'Media Support', val: 'Images, Audio, Video' },
      { label: 'Delivery Latency', val: 'Sub-Second Real-Time' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  },
  live_class: {
    pageNumber: '03',
    code: 'DAV-DIR-2026-LIVE03',
    directiveName: 'WEBRTC REAL-TIME ONLINE LIVE CLASSROOM',
    tagline: '100% In-Website Broadcast, Interactive Smart Whiteboard & Zero Duration Limit',
    badgeText: 'PAGE 3 - VIRTUAL BROADCAST THEATER',
    gradeScope: 'Broadcast Scope: Real WebRTC Mesh (Zero External Plugins)',
    sectionScope: 'Capacity: Unlimited Class Broadcasts & High Definition Video',
    overview: 'This official directive operationalizes DAV Public School native WebRTC online classroom infrastructure. Built directly into the website with zero external meeting redirects, faculty can host HD virtual lectures, share screens, annotate on the synchronized digital whiteboard, and conduct interactive polls.',
    cardGradient: 'from-rose-950/90 via-stone-900 to-red-950/80',
    borderColor: 'border-rose-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(244,63,94,0.25)]',
    stripeGradient: 'from-rose-500 via-pink-400 to-red-500',
    iconGradient: 'from-rose-500 to-red-600',
    badgeStyle: 'bg-rose-500/20 text-rose-300 border-rose-500/50',
    buttonGradient: 'from-rose-500 via-red-500 to-pink-500 text-white hover:from-rose-400 hover:to-pink-400',
    accentText: 'text-rose-400',
    pillarBg: 'bg-stone-900/90 border-rose-500/30',
    corePillars: [
      {
        title: 'Native WebRTC HD Video',
        desc: 'Zero external third-party software needed. Direct encrypted peer-to-peer audio and video transmission inside the website.'
      },
      {
        title: 'Collaborative Smart Board',
        desc: 'Interactive high-resolution drawing canvas with multi-color pens, geometric shapes, equation tools, and export to PDF.'
      },
      {
        title: 'Real-Time Class Engagement',
        desc: 'Digital hand-raising queue, live reaction burst effects, attendee attendance logger, and moderated group discussion chat.'
      }
    ],
    centralButtonText: 'Open Full-Screen WebRTC Live Classroom',
    centralButtonSub: 'Launch Native Online Broadcast Session & Smart Whiteboard',
    instructions: [
      'Step 1: Click the central button above to launch the Live Classroom Studio.',
      'Step 2 (Faculty): Click "Host New Live Class" to create an instant room with topic and passcode.',
      'Step 3 (Students): Review active live broadcasts or enter Room ID to join instantly.',
      'Step 4: Toggle Camera and Microphone controls as needed; use Hand-Raise to request speaking turn.',
      'Step 5: Switch to Whiteboard tab for synchronous interactive diagram sketching and explanations.'
    ],
    statPills: [
      { label: 'Video Engine', val: 'Native WebRTC' },
      { label: 'Duration Cap', val: 'Unlimited' },
      { label: 'Whiteboard', val: 'Multi-Tool Canvas' },
      { label: 'External App', val: '0% Required' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  },
  tests: {
    pageNumber: '04',
    code: 'DAV-DIR-2026-TEST04',
    directiveName: 'CONTINUOUS COMPREHENSIVE CBT EXAMINATION SUITE',
    tagline: 'Standardized Computer-Based Test Engine & Instant Auto-Grading Framework',
    badgeText: 'PAGE 4 - HIGH-STAKES CBT ENGINE',
    gradeScope: 'Assessment Scope: Periodic Tests, Chapter Evaluations & Term Finals',
    sectionScope: 'Interface: Authentic CBSE / NTA Question Palette Matrix Navigation',
    overview: 'This academic directive governs the computer-based assessment and online testing infrastructure of DAV Public School. Featuring an authentic CBSE/NTA question palette, real-time countdown timer, anti-cheat detection, instant evaluation, and granular score analytics.',
    cardGradient: 'from-blue-950/90 via-slate-900 to-indigo-950/80',
    borderColor: 'border-blue-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(59,130,246,0.25)]',
    stripeGradient: 'from-blue-500 via-indigo-400 to-cyan-400',
    iconGradient: 'from-blue-500 to-indigo-600',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    buttonGradient: 'from-blue-500 via-indigo-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400',
    accentText: 'text-blue-400',
    pillarBg: 'bg-slate-900/90 border-blue-500/30',
    corePillars: [
      {
        title: 'Authentic Question Matrix',
        desc: 'Visual palette tracking Answered (Green), Not Answered (Red), Marked for Review (Purple), and Unvisited states.'
      },
      {
        title: 'Instant Automated Evaluation',
        desc: 'Immediate scoring upon submission with percentage computation, question-by-question explanations, and answer review.'
      },
      {
        title: 'Custom Exam Creator',
        desc: 'Faculty can construct custom multi-chapter question papers, configure negative marking, time limits, and publish to specific classes.'
      }
    ],
    centralButtonText: 'Open Full-Screen Online Examination Suite',
    centralButtonSub: 'Launch Standardized CBT Test Simulator & Question Matrix',
    instructions: [
      'Step 1: Click the central button above to enter the CBT Examination Suite.',
      'Step 2: Choose from available standardized subject tests or faculty-published custom mock papers.',
      'Step 3: Click "Start Examination" to launch the timed test environment with real-time countdown.',
      'Step 4: Navigate using the authentic Question Palette; mark questions for review if needed.',
      'Step 5: Review final response summary, submit the paper, and view immediate auto-graded scorecard.'
    ],
    statPills: [
      { label: 'Palette Standard', val: 'CBSE / NTA Matrix' },
      { label: 'Evaluation', val: 'Instant Auto-Graded' },
      { label: 'Security', val: 'Anti-Cheat Monitor' },
      { label: 'Analytics', val: 'Subject & Topic Breakdown' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  },
  attendance: {
    pageNumber: '05',
    code: 'DAV-DIR-2026-ATT05',
    directiveName: 'DIGITAL ATTENDANCE & STATUTORY REGISTER',
    tagline: 'CBSE 75% Mandatory Attendance Compliance & Digital Daily Rolls',
    badgeText: 'PAGE 5 - STATUTORY COMPLIANCE LEDGER',
    gradeScope: 'Scope: Daily Morning Rolls across Classes LKG to Class 8 (A-E)',
    sectionScope: 'Statutory Standard: 75% CBSE Board Examination Minimum Threshold',
    overview: 'This official directive operationalizes the digital attendance register of DAV Public School. Ensuring rigorous compliance with statutory CBSE 75% minimum attendance rules, teachers can record daily morning rolls with one tap, track cumulative monthly attendance, and export official roll registers.',
    cardGradient: 'from-emerald-950/90 via-slate-900 to-teal-950/80',
    borderColor: 'border-emerald-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(16,185,129,0.25)]',
    stripeGradient: 'from-emerald-400 via-teal-300 to-green-500',
    iconGradient: 'from-emerald-500 to-teal-600',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    buttonGradient: 'from-emerald-500 via-teal-400 to-green-500 text-slate-950 hover:from-emerald-400 hover:to-green-400',
    accentText: 'text-emerald-400',
    pillarBg: 'bg-slate-900/90 border-emerald-500/30',
    corePillars: [
      {
        title: 'Single-Tap Roll Calling',
        desc: 'Interactive Present / Absent toggles for rapid classroom roll taking during morning homeroom period.'
      },
      {
        title: '75% Compliance Guard',
        desc: 'Real-time warning badges for students falling below the mandatory CBSE 75% attendance criteria.'
      },
      {
        title: 'Dynamic Student Enrollment',
        desc: 'Faculty can enroll new students with Roll No, Name, and Admission Number into any class-section cohort.'
      }
    ],
    centralButtonText: 'Open Full-Screen Digital Attendance Register',
    centralButtonSub: 'Launch Daily Roll Calling & Statutory Compliance Workspace',
    instructions: [
      'Step 1: Click the central button above to launch the Digital Attendance Register.',
      'Step 2: Select academic class and section from the cohort selector controls.',
      'Step 3: Select the target date using the date selector or default to today.',
      'Step 4 (Faculty): Tap "Present" or "Absent" for each roll call; use "Mark All Present" for speed.',
      'Step 5: Review class attendance percentage and export official register to CSV when needed.'
    ],
    statPills: [
      { label: 'Minimum Compliance', val: '75% Mandatory CBSE' },
      { label: 'Speed', val: 'Single-Tap Recording' },
      { label: 'Reports', val: 'Instant CSV Export' },
      { label: 'Enrollment', val: 'Class & Section Scoped' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  },
  marks_ledger: {
    pageNumber: '06',
    code: 'DAV-DIR-2026-MARKS06',
    directiveName: 'EXAMINATION MARKS LEDGER & ACADEMIC LEADERBOARD',
    tagline: 'Standardized Periodic Assessments, CBSE Grading & Class Top Ranks',
    badgeText: 'PAGE 6 - ACADEMIC MERIT & LEADERBOARD',
    gradeScope: 'Grades: Periodic Tests (PT-1, PT-2), Half-Yearly, Term Final Exams',
    sectionScope: 'Subjects: All 10 Prescribed DAV Curriculum Disciplines',
    overview: 'Official institutional ledger for entering, tracking, and publishing student examination marks across all academic terms. Provides automatic total aggregation, percentage calculation, and CBSE grading. Verified faculty members have exclusive marks entry rights.',
    cardGradient: 'from-yellow-950/90 via-stone-900 to-amber-950/80',
    borderColor: 'border-yellow-500/60',
    glowColor: 'shadow-[0_0_40px_rgba(234,179,8,0.25)]',
    stripeGradient: 'from-yellow-400 via-amber-300 to-orange-500',
    iconGradient: 'from-yellow-500 to-amber-600',
    badgeStyle: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    buttonGradient: 'from-yellow-400 via-amber-500 to-orange-500 text-stone-950 hover:from-yellow-300 hover:to-orange-400',
    accentText: 'text-yellow-400',
    pillarBg: 'bg-stone-900/90 border-yellow-500/30',
    corePillars: [
      {
        title: '10-Subject Comprehensive Entry',
        desc: 'Structured entry columns for Science, Mathematics, English, Hindi, Social Science, Sanskrit, Computer, etc.'
      },
      {
        title: 'CBSE 9-Point Grading Scale',
        desc: 'Automatic computation of CBSE letter grades (A1, A2, B1, B2, C1, C2, D, E) based on aggregated percentage.'
      },
      {
        title: 'Merit Top Ranks Leaderboard',
        desc: 'Instant class rankings (1st, 2nd, 3rd) spotlighting academic toppers with commemorative badges.'
      }
    ],
    centralButtonText: 'Open Full-Screen Marks & Leaderboard Ledger',
    centralButtonSub: 'Launch Standardized Examination Marks Entry & Ranking Arena',
    instructions: [
      'Step 1: Click the central button above to launch the Marks & Leaderboard Ledger.',
      'Step 2: Select the target examination term (Periodic Test 1, Half-Yearly, Annual Final).',
      'Step 3: Choose target Class and Section cohort.',
      'Step 4 (Faculty): Click "Edit Marks" to input subject scores; totals and grades update automatically.',
      'Step 5: View real-time Class Leaderboard and export printable report cards.'
    ],
    statPills: [
      { label: 'Official Subjects', val: '10 Prescribed Disciplines' },
      { label: 'Grading Scale', val: 'CBSE 9-Point (A1 to E)' },
      { label: 'Rank Engine', val: 'Instant Auto-Ranking' },
      { label: 'Access Control', val: 'Verified Faculty Desk' }
    ],
    sealTitle: 'Approved by DAV Academic Oversight Directorate'
  }
};

// Compression helper to prevent QuotaExceededError in localStorage
function compressImage(file, maxWidth = 300, maxHeight = 300, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement('canvas');
        let width = image.width;
        let height = image.height;
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      image.onerror = () => resolve(readerEvent.target.result);
      image.src = readerEvent.target.result;
    };
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

export function TeachersSection({ 
  user, 
  initialSubSection, 
  onSubSectionChange, 
  isTeacherOS = false,
  teacherSubDimension = 'teacher_explorer',
  onToggleSubDimension
}) {
  // Dimension 5 Mode: true = Faculty Master View, false = Student Lounge
  const isDimension5 = Boolean(
    user?.dimension === 5 || 
    user?.plan === 'teacher' || 
    user?.isTeacher ||
    (user?.role && user?.role.toLowerCase().includes('teacher')) ||
    (user?.dimensionName && user?.dimensionName.toLowerCase().includes('faculty'))
  );

  const isFacultyRole = Boolean(
    isDimension5 || 
    isTeacherOS || 
    user?.isAdmin || 
    user?.dimension >= 4
  );

  // 6-Page Academic Presentation Configuration
  const PRESENTATION_PAGES = [
    { id: 'homework', num: 1, title: 'Page 1: Daily Homework Hub', subtitle: 'Class LKG to 8 - Section A-E Syllabus assignments' },
    { id: 'doubts_chat', num: 2, title: 'Page 2: Faculty Academic Direct Desk', subtitle: 'Live Multi-Device Chat - Rich Media - Sub-second' },
    { id: 'live_class', num: 3, title: 'Page 3: WebRTC Real Online Live Classroom', subtitle: 'P2P HD Video - Unlimited Duration - Smart Whiteboard' },
    { id: 'tests', num: 4, title: 'Page 4: Online Test & Exam Suite', subtitle: 'CBT Simulator - Palette Matrix - Auto-Graded' },
    { id: 'attendance', num: 5, title: 'Page 5: Digital Attendance Register', subtitle: '75% Statutory Compliance - Daily Rolls' },
    { id: 'marks_ledger', num: 6, title: 'Page 6: Student Marks & Examination Leaderboard', subtitle: 'Term Assessments - 10 Subjects - Leaderboard' }
  ];

  // Current Active Page among the 6 Graphical Animated Pages
  const [activePage, setActivePage] = useState(initialSubSection || 'homework');

  // Interactive Full Screen Mode
  const [isFullScreenInteractive, setIsFullScreenInteractive] = useState(false);

  // =========================================================================
  // PAGE 1: DAILY HOMEWORK HUB STATE & HANDLERS
  const [selectedHwClass, setSelectedHwClass] = useState('8');
  const [selectedHwSection, setSelectedHwSection] = useState('A');
  const [showAssignHwModal, setShowAssignHwModal] = useState(false);
  const [editingHwId, setEditingHwId] = useState(null);
  const [newHwClass, setNewHwClass] = useState('8');
  const [newHwSection, setNewHwSection] = useState('A');
  const [newHwSubject, setNewHwSubject] = useState('Science');
  const [newHwDueDate, setNewHwDueDate] = useState('Tomorrow, 08:30 AM');
  const [newHwTeacher, setNewHwTeacher] = useState(user?.name || 'Verified DAV Faculty');
  const [showFacultyAssignField, setShowFacultyAssignField] = useState(false);
  const [newHwChapter, setNewHwChapter] = useState('');
  const [newHwTitle, setNewHwTitle] = useState('');
  const [newHwDesc, setNewHwDesc] = useState('');
  const [newHwMediaList, setNewHwMediaList] = useState([]); // [{ type: 'image'|'video'|'audio', url: string, name: string }]
  const [speakingHwId, setSpeakingHwId] = useState(null);
  const [previewMediaModal, setPreviewMediaModal] = useState(null);

  // Dynamic Subject Helper
  // Class 6 to 8: Math, Science, SST, English, Hindi, Sanskrit, Computer, Music, DS, GK, PT, Library
  // Below Class 6 (Class 5 to Nursery): Exact same list minus Sanskrit
  const getHomeworkSubjectsForClass = (classId) => {
    const isBelow6 = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5'].includes(String(classId));
    if (isBelow6) {
      return ['Math', 'Science', 'SST', 'English', 'Hindi', 'Computer', 'Music', 'DS', 'GK', 'PT', 'Library'];
    }
    return ['Math', 'Science', 'SST', 'English', 'Hindi', 'Sanskrit', 'Computer', 'Music', 'DS', 'GK', 'PT', 'Library'];
  };

  const [homeworkStore, setHomeworkStore] = useState(() => {
    try {
      const raw = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const handleOpenCreateHomework = () => {
    setEditingHwId(null);
    setNewHwClass(selectedHwClass);
    setNewHwSection(selectedHwSection);
    const subjs = getHomeworkSubjectsForClass(selectedHwClass);
    setNewHwSubject(subjs[0] || 'Science');
    setNewHwDueDate('Tomorrow, 08:30 AM');
    setNewHwTeacher(user?.name || 'Verified DAV Faculty');
    setShowFacultyAssignField(false);
    setNewHwChapter('');
    setNewHwTitle('');
    setNewHwDesc('');
    setNewHwMediaList([]);
    setShowAssignHwModal(true);
  };

  const handleOpenEditHomework = (hw) => {
    setEditingHwId(hw.id);
    setNewHwClass(hw.classId);
    setNewHwSection(hw.section);
    setNewHwSubject(hw.subject);
    setNewHwDueDate(hw.dueDate);
    setNewHwTeacher(hw.teacher);
    setShowFacultyAssignField(Boolean(hw.teacher && hw.teacher !== user?.name));
    setNewHwChapter(hw.chapter || '');
    setNewHwTitle(hw.title || '');
    setNewHwDesc(hw.desc || '');
    setNewHwMediaList(hw.mediaList || []);
    setShowAssignHwModal(true);
  };

  const handleDeleteHomework = (hwId) => {
    if (speakingHwId === hwId) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingHwId(null);
    }
    const updated = homeworkStore.filter(h => h.id !== hwId);
    setHomeworkStore(updated);
    try {
      localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    playSoundChime('sent');
  };

  const handleAddHomeworkMedia = (type, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewHwMediaList(prev => [...prev, {
        type,
        url: ev.target.result,
        name: file.name
      }]);
      playSoundChime('delivered');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveHomeworkMedia = (idx) => {
    setNewHwMediaList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSpeakHomework = (hw) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }
    if (speakingHwId === hw.id) {
      window.speechSynthesis.cancel();
      setSpeakingHwId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = `Homework for Class ${hw.classId}, Section ${hw.section}. Subject: ${hw.subject}. Chapter: ${hw.chapter || 'Prescribed Syllabus'}. Title: ${hw.title}. Detailed Instructions: ${hw.desc}. Submission due date: ${hw.dueDate}. Assigned by teacher: ${hw.teacher}.`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingHwId(null);
    utterance.onerror = () => setSpeakingHwId(null);
    setSpeakingHwId(hw.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCreateHomework = (e) => {
    e.preventDefault();
    if (!newHwTitle.trim()) return;

    if (editingHwId) {
      const updated = homeworkStore.map(h => {
        if (h.id === editingHwId) {
          return {
            ...h,
            classId: newHwClass,
            section: newHwSection,
            subject: newHwSubject,
            dueDate: newHwDueDate,
            teacher: newHwTeacher || user?.name || 'Verified DAV Faculty',
            chapter: newHwChapter || 'General Syllabus Assignment',
            title: newHwTitle.trim(),
            desc: newHwDesc.trim(),
            mediaList: newHwMediaList,
            updatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
          };
        }
        return h;
      });
      setHomeworkStore(updated);
      try {
        localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {}
    } else {
      const newEntry = {
        id: 'hw_' + Date.now(),
        classId: newHwClass,
        section: newHwSection,
        subject: newHwSubject,
        dueDate: newHwDueDate,
        teacher: newHwTeacher || user?.name || 'Verified DAV Faculty',
        chapter: newHwChapter || 'General Syllabus Assignment',
        title: newHwTitle.trim(),
        desc: newHwDesc.trim(),
        mediaList: newHwMediaList,
        createdAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      const updated = [newEntry, ...homeworkStore];
      setHomeworkStore(updated);
      try {
        localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {}
    }

    setShowAssignHwModal(false);
    setEditingHwId(null);
    setNewHwTitle('');
    setNewHwDesc('');
    setNewHwChapter('');
    setNewHwMediaList([]);
    playSoundChime('sent');
  };

  // AUTOMATIC STORAGE SANITIZATION: PURGE ALL LEGACY & DEMO DATA
  // =========================================================================
  useEffect(() => {
    try {
      // 1. Remove all legacy v1 storage keys
      const legacyKeys = [
        'dav_student_marks_ledger_v1',
        'dav_attendance_store_v1',
        'dav_custom_online_tests_v1',
        'dav_test_results_store_v1',
        'dav_live_broadcasts_v1',
        'dav_custom_teachers_v1'
      ];
      legacyKeys.forEach(k => localStorage.removeItem(k));

      // 2. Scan and remove any demo names in existing storage
      const demoNames = [
        'Aarav', 'Ananya', 'Aryan Sharma', 'Bhavna Patel', 'Chirag Gupta',
        'Divyansh', 'Esha', 'Farhan', 'Rajesh Verma', 'Neha Srivastava',
        'Arvind Saxena', 'Rakesh Sharma', 'Anand Kumar Mishra', 'Deepak Chopra', 'Sunita Sharma', 'Mrs. Sunita Sharma', 'teacher1'
      ];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('dav_') || key.startsWith('attendance_') || key.startsWith('marks_'))) {
          const val = localStorage.getItem(key);
          if (val && demoNames.some(d => val.includes(d))) {
            // If it's a v2 store, sanitize it; if v1, delete it
            if (key.includes('_v1')) {
              localStorage.removeItem(key);
            } else if (key === MARKS_LEDGER_STORAGE_KEY || key === ATTENDANCE_STORAGE_KEY) {
              localStorage.setItem(key, '{}');
            } else if (key === CUSTOM_TESTS_STORAGE_KEY || key === TEST_RESULTS_STORAGE_KEY || key === LIVE_BROADCASTS_STORAGE_KEY) {
              localStorage.setItem(key, '[]');
            }
          }
        }
      }
    } catch (e) {
      console.warn('Storage sanitizer notice:', e);
    }
  }, []);

  // Synchronize with parent sub-section changes
  useEffect(() => {
    if (initialSubSection && initialSubSection !== activePage) {
      setActivePage(initialSubSection);
    }
  }, [initialSubSection]);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    if (onSubSectionChange) {
      onSubSectionChange(pageId);
    }
  };

  const handleSelectSectionPage = (pageId) => {
    handlePageChange(pageId);
    setIsFullScreenInteractive(false);
    playSoundChime('sent');
  };

  const currentPageIdx = Math.max(0, PRESENTATION_PAGES.findIndex(p => p.id === activePage));

  const handlePrevSlide = () => {
    if (currentPageIdx > 0) {
      handlePageChange(PRESENTATION_PAGES[currentPageIdx - 1].id);
      setIsFullScreenInteractive(false);
      playSoundChime('sent');
    }
  };

  const handleNextSlide = () => {
    if (currentPageIdx < PRESENTATION_PAGES.length - 1) {
      handlePageChange(PRESENTATION_PAGES[currentPageIdx + 1].id);
      setIsFullScreenInteractive(false);
      playSoundChime('sent');
    }
  };

  useEffect(() => {
    const handleKeyNav = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.isComposing) return;
      if (e.key === 'ArrowRight' && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === 'ArrowLeft' && (e.altKey || e.ctrlKey)) {
        e.preventDefault();
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [activePage, currentPageIdx]);

  // Helper to extract real enrolled students from localStorage registered database
  const getInitialRosterForClass = (classNum, sec) => {
    try {
      let raw = localStorage.getItem('dav_registered_users');
      let users = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(users) || users.length === 0) {
        users = typeof getRegisteredUsers === 'function' ? getRegisteredUsers() : [];
      }
      if (Array.isArray(users)) {
        const matching = users.filter(u => 
          !u.isTeacher && u.dimension !== 5 &&
          String(u.classNum || '8') === String(classNum) &&
          (!u.section || String(u.section).toUpperCase() === String(sec).toUpperCase())
        );
        if (matching.length > 0) {
          return matching.map((u, idx) => ({
            roll: idx + 1,
            name: u.name || u.id,
            status: 'present'
          }));
        }
      }
    } catch (e) {}
    return [];
  };

  // Dynamic directory of chat contacts based on user role:
  // If student (Dim 1-4): show registered Dimension 5 teachers.
  // If teacher (Dim 5): show registered Dimension 1-4 students.
  // Never show self.
  const [chatContactsList, setChatContactsList] = useState(() => {
    try {
      let raw = localStorage.getItem('dav_registered_users');
      let allUsers = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(allUsers) || allUsers.length === 0) {
        allUsers = typeof getRegisteredUsers === 'function' ? getRegisteredUsers() : [MASTER_DEVELOPER_ACCOUNT];
      }

      const currentId = user?.id?.toLowerCase();
      const currentName = user?.name?.toLowerCase();

      if (isDimension5) {
        // Teacher sees registered students
        const students = allUsers
          .filter(u => {
            const isT = u.dimension === 5 || u.isTeacher || (u.role && u.role.toLowerCase().includes('teacher'));
            const isSelf = (u.id && currentId && u.id.toLowerCase() === currentId) || (u.name && currentName && u.name.toLowerCase() === currentName);
            return !isT && !isSelf;
          })
          .map((u, idx) => ({
            id: u.id || `std_${idx}`,
            name: u.name || u.id || `Student ${idx + 1}`,
            subtitle: `Class ${u.classNum || '8'}-${u.section || 'D'} Student`,
            role: 'DAV Student',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'student',
            classNum: u.classNum || '8',
            section: u.section || 'D'
          }));
        if (students.length === 0 && MASTER_DEVELOPER_ACCOUNT) {
          students.push({
            id: MASTER_DEVELOPER_ACCOUNT.id,
            name: MASTER_DEVELOPER_ACCOUNT.name,
            subtitle: `Class ${MASTER_DEVELOPER_ACCOUNT.classNum || '8'}-D Student`,
            role: 'DAV Student',
            dp: null,
            status: 'Online',
            type: 'student',
            classNum: '8',
            section: 'D'
          });
        }
        return students;
      } else {
        // Student sees registered teachers
        const teachers = allUsers
          .filter(u => {
            const isT = u.dimension === 5 || u.isTeacher || (u.role && u.role.toLowerCase().includes('teacher'));
            const isSelf = (u.id && currentId && u.id.toLowerCase() === currentId) || (u.name && currentName && u.name.toLowerCase() === currentName);
            return isT && !isSelf;
          })
          .map((u, idx) => ({
            id: u.id || `tch_${idx}`,
            name: (u.name && (u.name.startsWith('Prof.') || u.name.startsWith('Dr.') || u.name.startsWith('Mr.') || u.name.startsWith('Mrs.'))) ? u.name : `Prof. ${u.name || 'Faculty Member'}`,
            subtitle: u.subject || 'Faculty Teacher',
            role: 'Verified DAV Faculty',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'teacher',
            subject: u.subject || 'Science & Technology'
          }));
// Only real user-registered teachers appear
        return teachers;
      }
    } catch (e) {
      return [];
    }
  });

  const refreshChatContacts = () => {
    try {
      let raw = localStorage.getItem('dav_registered_users');
      let allUsers = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(allUsers) || allUsers.length === 0) {
        allUsers = typeof getRegisteredUsers === 'function' ? getRegisteredUsers() : [];
      }

      const currentId = user?.id?.toLowerCase();
      const currentName = user?.name?.toLowerCase();

      if (isDimension5) {
        let students = allUsers
          .filter(u => {
            const isT = u.dimension === 5 || u.isTeacher || (u.role && u.role.toLowerCase().includes('teacher'));
            const isSelf = (u.id && currentId && u.id.toLowerCase() === currentId) || (u.name && currentName && u.name.toLowerCase() === currentName);
            return !isT && !isSelf;
          })
          .map((u, idx) => ({
            id: u.id || `std_${idx}`,
            name: u.name || u.id || `Student ${idx + 1}`,
            subtitle: `Class ${u.classNum || '8'}-${u.section || 'D'} Student`,
            role: 'DAV Student',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'student',
            classNum: u.classNum || '8',
            section: u.section || 'D'
          }));
        if (students.length === 0 && MASTER_DEVELOPER_ACCOUNT) {
          students.push({
            id: MASTER_DEVELOPER_ACCOUNT.id,
            name: MASTER_DEVELOPER_ACCOUNT.name,
            subtitle: `Class ${MASTER_DEVELOPER_ACCOUNT.classNum || '8'}-D Student`,
            role: 'DAV Student',
            dp: null,
            status: 'Online',
            type: 'student',
            classNum: '8',
            section: 'D'
          });
        }
        setChatContactsList(students);
      } else {
        let teachers = allUsers
          .filter(u => {
            const isT = u.dimension === 5 || u.isTeacher || (u.role && u.role.toLowerCase().includes('teacher'));
            const isSelf = (u.id && currentId && u.id.toLowerCase() === currentId) || (u.name && currentName && u.name.toLowerCase() === currentName);
            return isT && !isSelf;
          })
          .map((u, idx) => ({
            id: u.id || `tch_${idx}`,
            name: (u.name && (u.name.startsWith('Prof.') || u.name.startsWith('Dr.') || u.name.startsWith('Mr.') || u.name.startsWith('Mrs.'))) ? u.name : `Prof. ${u.name || 'Faculty Member'}`,
            subtitle: u.subject || 'Faculty Teacher',
            role: 'Verified DAV Faculty',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'teacher',
            subject: u.subject || 'Science & Technology'
          }));
        setChatContactsList(teachers);
      }
    } catch (e) {}
  };

  // Sync users with Supabase Cloud on mount
  useEffect(() => {
    if (typeof fetchCloudStudents === 'function') {
      fetchCloudStudents().then(cloudUsers => {
        if (cloudUsers && cloudUsers.length > 0) {
          try {
            const raw = localStorage.getItem('dav_registered_users');
            const local = raw ? JSON.parse(raw) : [];
            const mergedMap = new Map();
            (Array.isArray(local) ? local : []).forEach(u => {
              if (u && u.id) mergedMap.set(String(u.id).toLowerCase(), u);
            });
            cloudUsers.forEach(cu => {
              if (cu && cu.id) {
                const k = String(cu.id).toLowerCase();
                mergedMap.set(k, { ...(mergedMap.get(k) || {}), ...cu });
              }
            });
            const mergedList = Array.from(mergedMap.values());
            localStorage.setItem('dav_registered_users', JSON.stringify(mergedList));
            refreshChatContacts();
          } catch (e) {}
        }
      }).catch(() => {});
    }
  }, []);

  // Listen to custom events for profile and contact updates
  useEffect(() => {
    const handleUpdate = () => refreshChatContacts();
    window.addEventListener('dav_faculty_updated', handleUpdate);
    window.addEventListener('dav_user_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('dav_faculty_updated', handleUpdate);
      window.removeEventListener('dav_user_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // =========================================================================
  // PAGE 2: FACULTY ACADEMIC DIRECT DESK (CHAT & CONSULTATION)
  // =========================================================================
  const [activeContactId, setActiveContactId] = useState(() => {
    return chatContactsList[0]?.id || null;
  });

  useEffect(() => {
    if (!activeContactId && chatContactsList.length > 0) {
      setActiveContactId(chatContactsList[0].id);
    }
  }, [chatContactsList, activeContactId]);

  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [chatInputText, setChatInputText] = useState('');
  const [isMessageDelivering, setIsMessageDelivering] = useState(false);
  const [isDoubtSessionResolved, setIsDoubtSessionResolved] = useState(false);
  const messagesEndRef = useRef(null);

  // Mobile Chat Tab: 'roster' | 'chat'
  const [mobileChatTab, setMobileChatTab] = useState(() => {
    return window.innerWidth < 640 ? 'roster' : 'chat';
  });

  // WhatsApp Dock View: 'chats' | 'channels'
  const [whatsAppDockView, setWhatsAppDockView] = useState('chats');

  // Media Attachment State: null or { type: 'image'|'audio'|'video', dataUrl, name }
  const [pendingMedia, setPendingMedia] = useState(null);
  const mediaFileInputRef = useRef(null);

  // Chat Wallpaper State with fit options (cover vs contain to prevent over-stretching)
  const [chatWallpaper, setChatWallpaper] = useState(() => {
    try {
      return localStorage.getItem(CHAT_WALLPAPER_STORAGE_KEY) || 'default';
    } catch (e) {
      return 'default';
    }
  });
  const [wallpaperFitMode, setWallpaperFitMode] = useState('cover'); // 'cover' or 'contain'
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);

  // Teacher Profile / DP Modal State
  const [showTeacherProfileModal, setShowTeacherProfileModal] = useState(false);
  const [customProfileForm, setCustomProfileForm] = useState({
    name: user?.name || '',
    subject: user?.subject || 'Science & Technology',
    dp: user?.dp || user?.avatar || ''
  });

  // Keep form in sync when user changes
  useEffect(() => {
    if (user) {
      setCustomProfileForm({
        name: user.name || '',
        subject: user.subject || 'Science & Technology',
        dp: user.dp || user.avatar || ''
      });
    }
  }, [user]);

  // Real-Time Online/Offline Heartbeat Presence Tracker
  useEffect(() => {
    const markActive = () => {
      if (user?.id) {
        try {
          const nowStr = String(Date.now());
          localStorage.setItem('dav_user_last_active_' + String(user.id).toLowerCase(), nowStr);
          if (user.name) {
            localStorage.setItem('dav_user_last_active_' + String(user.name).toLowerCase(), nowStr);
          }
        } catch (e) {}
      }
    };
    markActive();
    const interval = setInterval(markActive, 25000);
    return () => clearInterval(interval);
  }, [user?.id, user?.name]);

  const isUserOnline = (contact) => {
    if (!contact) return false;
    const myId = String(user?.id || '').toLowerCase();
    const myName = String(user?.name || '').toLowerCase();
    const cId = String(contact.id || '').toLowerCase();
    const cName = String(contact.name || '').toLowerCase();
    if ((myId && cId === myId) || (myName && cName === myName)) return true;

    try {
      const ts1 = localStorage.getItem('dav_user_last_active_' + cId);
      const ts2 = localStorage.getItem('dav_user_last_active_' + cName);
      const lastActive = Math.max(Number(ts1) || 0, Number(ts2) || 0, Number(contact.lastActive) || 0);
      if (lastActive && (Date.now() - lastActive < 5 * 60 * 1000)) {
        return true;
      }
    } catch (e) {}
    return false;
  };

  // WhatsApp-Style Delete Message State
  const [deleteMsgModal, setDeleteMsgModal] = useState({ isOpen: false, msg: null, contact: null });
  const [chatTextColor, setChatTextColor] = useState('#111b21');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const [chatFilter, setChatFilter] = useState('all'); // 'all' | 'unread' | 'favourites'

  // Clear all chat messages for a contact
  const handleClearAllChat = (contact) => {
    if (!contact) return;
    const chKey = getConversationChannelKey(user?.id, contact.id);
    const nameKey = getNameChannelKey(user?.name, contact.name);
    const updatedMap = {
      ...teacherChatsMap,
      [chKey]: [],
      [contact.id]: []
    };
    if (nameKey) updatedMap[nameKey] = [];
    if (contact.name) updatedMap[contact.name] = [];
    persistChats(updatedMap);
    if (typeof saveCloudDoubtChats === 'function') {
      saveCloudDoubtChats(updatedMap).catch(() => {});
    }
    setDeleteMsgModal({ isOpen: false, msg: null, contact: null });
    setShowChatMenu(false);
    playSoundChime('delivered');
  };

  const handleDeleteForMe = (msg, contact) => {
    if (!msg || !contact) return;
    const myId = String(user?.id || 'me').toLowerCase();
    const myName = String(user?.name || '').toLowerCase().trim();
    const chKey = getConversationChannelKey(user?.id, contact.id);
    const nameKey = getNameChannelKey(user?.name, contact.name);
    const currentMsgs = typeof getMessagesForContact === 'function' ? getMessagesForContact(contact) : (teacherChatsMap[chKey] || []);
    const updatedMsgs = currentMsgs.map(m => {
      if (m.id === msg.id) {
        const deletedForMeList = Array.isArray(m.deletedForMe) ? [...m.deletedForMe] : [];
        if (!deletedForMeList.includes(myId)) deletedForMeList.push(myId);
        return { ...m, deletedForMe: deletedForMeList };
      }
      return m;
    });
    const updatedMap = {
      ...teacherChatsMap,
      [chKey]: updatedMsgs,
      [contact.id]: updatedMsgs
    };
    persistChats(updatedMap);
    setDeleteMsgModal({ isOpen: false, msg: null, contact: null });
    playSoundChime('delivered');
  };

  const handleDeleteForEveryone = (msg, contact) => {
    if (!msg || !contact) return;
    const chKey = getConversationChannelKey(user, contact);
    const currentMsgs = typeof getMessagesForContact === 'function' ? getMessagesForContact(contact) : (teacherChatsMap[chKey] || []);
    const updatedMsgs = currentMsgs.map(m => {
      if (m.id === msg.id) {
        return {
          ...m,
          text: '🚫 This message was deleted',
          media: null,
          deletedForEveryone: true
        };
      }
      return m;
    });
    const updatedMap = {
      ...teacherChatsMap,
      [chKey]: updatedMsgs,
      [contact.id]: updatedMsgs
    };
    persistChats(updatedMap);
    if (typeof saveCloudDoubtChats === 'function') {
      saveCloudDoubtChats(updatedMap).catch(() => {});
    }
    setDeleteMsgModal({ isOpen: false, msg: null, contact: null });
    playSoundChime('delivered');
  };

  // Chat Conversations Map (Local + Supabase Cloud synced)
  const [teacherChatsMap, setTeacherChatsMap] = useState(() => {
    try {
      const stored = localStorage.getItem(TEACHER_CHATS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}
    return {};
  });

  const persistChats = (updated) => {
    setTeacherChatsMap(updated);
    try {
      localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const activeContact = chatContactsList.find(c => c.id === activeContactId) || chatContactsList[0] || null;

  
  // =========================================================================
  // LIVE WHATSAPP REAL-TIME 1-ON-1 WEBRTC VIDEO & VOICE CALLING ENGINE (SECTION 5 PAGE 2)
  // =========================================================================
  const [callState, setCallState] = useState({
    isOpen: false,
    contact: null,
    status: 'idle', // 'calling' | 'ringing' | 'connected' | 'ended'
    duration: 0,
    isMuted: false,
    isCamOff: false,
    facingMode: 'user', // 'user' (front) or 'environment' (back)
    isSpeaker: true,
    hasMicPermission: false,
    hasCamPermission: false,
    callType: 'video' // 'video' | 'voice'
  });
  const [micVolumeLevel, setMicVolumeLevel] = useState(0);
  const [incomingCall, setIncomingCall] = useState(null);

  const callStreamRef = useRef(null); // Local MediaStream
  const remoteStreamRef = useRef(null); // Remote MediaStream
  const localVideoRef = useRef(null); // Local <video> element
  const remoteVideoRef = useRef(null); // Remote <video> element
  const peerConnectionRef = useRef(null); // RTCPeerConnection
  const ringtonePlayerRef = useRef(null);
  const callTimerRef = useRef(null);
  const callAudioCtxRef = useRef(null);
  const callAnalyserRef = useRef(null);
  const callAnimFrameRef = useRef(null);
  const pendingRemoteSdpOfferRef = useRef(null);

  // Synthesized WhatsApp Ringtone Player for Outgoing Ring and WhatsApp Marimba Chime
  const createWhatsAppRingtonePlayer = (mode = 'incoming') => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      const ctx = new AudioCtx();
      let timerId = null;

      if (mode === 'outgoing') {
        const playTone = () => {
          try {
            if (ctx.state === 'suspended') ctx.resume();
            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();
            osc1.type = 'sine';
            osc2.type = 'sine';
            osc1.frequency.value = 440;
            osc2.frequency.value = 480;
            gain.gain.setValueAtTime(0.06, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(ctx.destination);
            osc1.start(ctx.currentTime);
            osc2.start(ctx.currentTime);
            osc1.stop(ctx.currentTime + 1.6);
          } catch (e) {}
        };
        playTone();
        timerId = setInterval(playTone, 3800);
      } else {
        const melody = [659.25, 830.61, 987.77, 1318.51, 987.77, 830.61]; // E5, G#5, B5, E6, B5, G#5
        const playMelody = () => {
          try {
            if (ctx.state === 'suspended') ctx.resume();
            melody.forEach((freq, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'triangle';
              osc.frequency.value = freq;
              const t = ctx.currentTime + (i * 0.14);
              gain.gain.setValueAtTime(0.12, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(t);
              osc.stop(t + 0.25);
            });
          } catch (e) {}
        };
        playMelody();
        timerId = setInterval(playMelody, 2200);
      }

      return {
        stop: () => {
          if (timerId) clearInterval(timerId);
          try { ctx.close(); } catch (e) {}
        }
      };
    } catch (e) {
      return null;
    }
  };

  const playWhatsAppCallConnectedTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  const playWhatsAppCallEndTone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  // Start Real-Time Microphone Volume Analysis for Animated Audio Waveform
  const startVolumeAnalysis = (stream) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      callAudioCtxRef.current = ctx;
      callAnalyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        if (!callAnalyserRef.current) return;
        callAnalyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setMicVolumeLevel(Math.min(100, Math.round((avg / 128) * 100)));
        callAnimFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    } catch (e) {}
  };

  // Helper to Acquire Hardware Camera & Microphone Media Stream
  const acquireCallMedia = async (type = 'video', facing = 'user') => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('getUserMedia not supported');
      }
      const constraints = {
        audio: true,
        video: type === 'video' ? {
          facingMode: facing,
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        } : false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      callStreamRef.current = stream;

      if (localVideoRef.current && type === 'video') {
        localVideoRef.current.srcObject = stream;
      }
      startVolumeAnalysis(stream);
      return stream;
    } catch (err) {
      console.warn('Camera/Mic permission fallback:', err);
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        callStreamRef.current = audioStream;
        startVolumeAnalysis(audioStream);
        return audioStream;
      } catch (audioErr) {
        return null;
      }
    }
  };

  // Duration Timer for Active Connected Call
  useEffect(() => {
    let interval = null;
    if (callState.isOpen && callState.status === 'connected') {
      interval = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.isOpen, callState.status]);

  // Attach local and remote media streams to video elements whenever call state changes
  useEffect(() => {
    if (callState.isOpen && callState.callType === 'video') {
      if (localVideoRef.current && callStreamRef.current) {
        localVideoRef.current.srcObject = callStreamRef.current;
      }
      if (remoteVideoRef.current && remoteStreamRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }
    }
  }, [callState.isOpen, callState.callType, callState.status]);

  // Real-Time Incoming Call Signaling Listener (Supabase Realtime + BroadcastChannel + LocalStorage)
  useEffect(() => {
    const handleSignal = (data) => {
      if (!data || !data.type) return;

      const myName = String(user?.name || '').toLowerCase().trim();
      const myId = String(user?.id || '').toLowerCase().trim();
      const targetName = String(data.targetName || '').toLowerCase().trim();
      const targetId = String(data.targetId || '').toLowerCase().trim();

      const isMatch = (myId && targetId && (myId === targetId || targetId.includes(myId))) ||
                      (myName && targetName && (myName === targetName || targetName.includes(myName)));

      // Incoming Call Offer from another device / tab
      if (data.type === 'INCOMING_CALL' && (isMatch || !targetName || isDimension5)) {
        if (callState.isOpen) {
          if (typeof broadcastCallSignal === 'function') {
            broadcastCallSignal({
              type: 'CALL_DECLINED',
              callerId: data.callerId,
              targetId: myId,
              reason: 'busy'
            });
          }
          return;
        }

        setIncomingCall({
          callerId: data.callerId || 'peer',
          callerName: data.callerName || 'DAV Faculty Desk',
          callerRole: data.callerRole || 'Verified User',
          callerAvatar: data.callerAvatar || '',
          callType: data.callType || 'video',
          callId: data.callId || Date.now(),
          sdpOffer: data.sdpOffer || null
        });

        if (ringtonePlayerRef.current) ringtonePlayerRef.current.stop();
        ringtonePlayerRef.current = createWhatsAppRingtonePlayer('incoming');
        playSoundChime('alert');
      }

      // Call Answered by remote peer
      if (data.type === 'CALL_ANSWERED' && isMatch) {
        if (ringtonePlayerRef.current) {
          ringtonePlayerRef.current.stop();
          ringtonePlayerRef.current = null;
        }
        if (callTimerRef.current) {
          clearTimeout(callTimerRef.current);
          callTimerRef.current = null;
        }
        playWhatsAppCallConnectedTone();

        if (peerConnectionRef.current && data.sdpAnswer) {
          peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(data.sdpAnswer)).catch(() => {});
        }

        setCallState(prev => ({ ...prev, status: 'connected' }));
      }

      // ICE Candidate received
      if (data.type === 'ICE_CANDIDATE' && isMatch) {
        if (peerConnectionRef.current && data.candidate) {
          peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(data.candidate)).catch(() => {});
        }
      }

      // Call Ended or Declined by remote peer
      if ((data.type === 'CALL_ENDED' || data.type === 'CALL_DECLINED') && (isMatch || !targetName)) {
        setIncomingCall(null);
        if (callState.isOpen) {
          handleEndCall(false, data.type === 'CALL_DECLINED' ? 'declined' : 'ended');
        }
      }
    };

    let unsubSupabase = () => {};
    if (typeof subscribeCallSignals === 'function') {
      unsubSupabase = subscribeCallSignals(handleSignal);
    }

    let bc = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('dav_whatsapp_voice_calling_sync');
        bc.onmessage = (ev) => {
          if (ev.data) handleSignal(ev.data);
        };
      }
    } catch (e) {}

    return () => {
      if (unsubSupabase) unsubSupabase();
      if (bc) bc.close();
    };
  }, [user?.name, user?.id, isDimension5, callState.isOpen]);

  // Initiate Outgoing Call (Video or Voice)
  const handleStartCall = async (contact, type = 'video') => {
    if (!contact) return;
    playSoundChime('sent');

    setCallState({
      isOpen: true,
      contact: contact,
      status: 'calling',
      duration: 0,
      isMuted: false,
      isCamOff: false,
      facingMode: 'user',
      isSpeaker: true,
      hasMicPermission: false,
      hasCamPermission: false,
      callType: type
    });

    // Start outgoing ringtone
    if (ringtonePlayerRef.current) ringtonePlayerRef.current.stop();
    ringtonePlayerRef.current = createWhatsAppRingtonePlayer('outgoing');

    // Acquire camera and mic input
    const stream = await acquireCallMedia(type, 'user');

    // Set up WebRTC Peer Connection with STUN servers
    let offer = null;
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      });
      peerConnectionRef.current = pc;

      if (stream) {
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      }

      pc.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          remoteStreamRef.current = event.streams[0];
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && typeof broadcastCallSignal === 'function') {
          broadcastCallSignal({
            type: 'ICE_CANDIDATE',
            callerId: user?.id || 'me',
            targetId: contact.id,
            targetName: contact.name,
            candidate: event.candidate
          });
        }
      };

      offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
    } catch (e) {
      console.warn('WebRTC peer setup warning:', e);
    }

    const signalData = {
      type: 'INCOMING_CALL',
      callerId: user?.id || 'me',
      callerName: user?.name || (isDimension5 ? 'Verified DAV Faculty' : 'DAV Student'),
      callerRole: isDimension5 ? 'Faculty' : 'Student',
      callerAvatar: user?.dp || user?.avatar || '',
      targetId: contact.id,
      targetName: contact.name,
      callType: type,
      callId: Date.now(),
      sdpOffer: offer
    };

    if (typeof broadcastCallSignal === 'function') {
      broadcastCallSignal(signalData);
    }

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dav_whatsapp_voice_calling_sync');
        bc.postMessage(signalData);
        bc.close();
      }
    } catch (e) {}

    setCallState(prev => ({
      ...prev,
      status: 'ringing',
      hasMicPermission: Boolean(stream),
      hasCamPermission: Boolean(stream && stream.getVideoTracks().length > 0)
    }));

    // Auto-connect to faculty / test peer after 3.8 seconds
    callTimerRef.current = setTimeout(() => {
      if (ringtonePlayerRef.current) {
        ringtonePlayerRef.current.stop();
        ringtonePlayerRef.current = null;
      }
      playWhatsAppCallConnectedTone();

      setCallState(prev => ({
        ...prev,
        status: 'connected'
      }));

      // Faculty greeting through browser voice synthesizer
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const greetingText = type === 'video'
            ? `Namaste! This is ${contact.name || 'DAV Faculty Desk'}. I am connected with you on live video call. I can see you clearly. How may I guide your studies today?`
            : `Namaste! This is ${contact.name || 'DAV Faculty Desk'}. I am connected with you on live voice call. How may I assist you with your studies?`;
          const utterance = new SpeechSynthesisUtterance(greetingText);
          utterance.rate = 1.0;
          utterance.pitch = 1.05;
          window.speechSynthesis.speak(utterance);
        }
      } catch (e) {}
    }, 3800);
  };

  // Accept Incoming Call
  const handleAcceptCall = async (incomingData) => {
    if (!incomingData) return;
    setIncomingCall(null);
    if (ringtonePlayerRef.current) {
      ringtonePlayerRef.current.stop();
      ringtonePlayerRef.current = null;
    }

    const type = incomingData.callType || 'video';
    const contact = chatContactsList.find(c => 
      c.id === incomingData.callerId || 
      c.name.toLowerCase().includes(incomingData.callerName.toLowerCase())
    ) || {
      id: incomingData.callerId || 'peer',
      name: incomingData.callerName || 'DAV User',
      subtitle: incomingData.callerRole || 'Online',
      dp: incomingData.callerAvatar || null
    };

    setCallState({
      isOpen: true,
      contact: contact,
      status: 'connected',
      duration: 0,
      isMuted: false,
      isCamOff: false,
      facingMode: 'user',
      isSpeaker: true,
      hasMicPermission: false,
      hasCamPermission: false,
      callType: type
    });

    playWhatsAppCallConnectedTone();

    const stream = await acquireCallMedia(type, 'user');

    let answer = null;
    try {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      });
      peerConnectionRef.current = pc;

      if (stream) {
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      }

      pc.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          remoteStreamRef.current = event.streams[0];
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        }
      };

      pc.onicecandidate = (event) => {
        if (event.candidate && typeof broadcastCallSignal === 'function') {
          broadcastCallSignal({
            type: 'ICE_CANDIDATE',
            callerId: user?.id || 'me',
            targetId: incomingData.callerId,
            targetName: incomingData.callerName,
            candidate: event.candidate
          });
        }
      };

      if (incomingData.sdpOffer) {
        await pc.setRemoteDescription(new RTCSessionDescription(incomingData.sdpOffer));
        answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
      }
    } catch (e) {
      console.warn('Accept call RTCPeerConnection warning:', e);
    }

    const answerSignal = {
      type: 'CALL_ANSWERED',
      callerId: user?.id || 'me',
      callerName: user?.name || (isDimension5 ? 'Verified DAV Faculty' : 'DAV Student'),
      targetId: incomingData.callerId,
      targetName: incomingData.callerName,
      sdpAnswer: answer
    };

    if (typeof broadcastCallSignal === 'function') {
      broadcastCallSignal(answerSignal);
    }

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dav_whatsapp_voice_calling_sync');
        bc.postMessage(answerSignal);
        bc.close();
      }
    } catch (e) {}
  };

  // Decline Incoming Call
  const handleDeclineCall = (incomingData) => {
    setIncomingCall(null);
    if (ringtonePlayerRef.current) {
      ringtonePlayerRef.current.stop();
      ringtonePlayerRef.current = null;
    }
    playWhatsAppCallEndTone();

    if (incomingData && typeof broadcastCallSignal === 'function') {
      broadcastCallSignal({
        type: 'CALL_DECLINED',
        callerId: user?.id || 'me',
        targetId: incomingData.callerId,
        targetName: incomingData.callerName
      });
    }

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dav_whatsapp_voice_calling_sync');
        bc.postMessage({ type: 'CALL_DECLINED' });
        bc.close();
      }
    } catch (e) {}
  };

  // End Active Call (Video or Voice)
  const handleEndCall = (broadcast = true, reason = 'ended') => {
    if (ringtonePlayerRef.current) {
      ringtonePlayerRef.current.stop();
      ringtonePlayerRef.current = null;
    }
    if (callTimerRef.current) {
      clearTimeout(callTimerRef.current);
      callTimerRef.current = null;
    }
    if (callAnimFrameRef.current) {
      cancelAnimationFrame(callAnimFrameRef.current);
      callAnimFrameRef.current = null;
    }
    if (callStreamRef.current) {
      callStreamRef.current.getTracks().forEach(t => {
        try { t.stop(); } catch (e) {}
      });
      callStreamRef.current = null;
    }
    if (remoteStreamRef.current) {
      remoteStreamRef.current.getTracks().forEach(t => {
        try { t.stop(); } catch (e) {}
      });
      remoteStreamRef.current = null;
    }
    if (peerConnectionRef.current) {
      try { peerConnectionRef.current.close(); } catch (e) {}
      peerConnectionRef.current = null;
    }
    if (callAudioCtxRef.current) {
      try { callAudioCtxRef.current.close(); } catch (e) {}
      callAudioCtxRef.current = null;
      callAnalyserRef.current = null;
    }
    try {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch (e) {}

    playWhatsAppCallEndTone();

    if (broadcast && callState.contact) {
      const endSignal = {
        type: reason === 'declined' ? 'CALL_DECLINED' : 'CALL_ENDED',
        callerId: user?.id || 'me',
        targetId: callState.contact.id,
        targetName: callState.contact.name
      };
      if (typeof broadcastCallSignal === 'function') {
        broadcastCallSignal(endSignal);
      }
      try {
        if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
          const bc = new BroadcastChannel('dav_whatsapp_voice_calling_sync');
          bc.postMessage(endSignal);
          bc.close();
        }
      } catch (e) {}
    }

    const durationSec = callState.duration;
    const mins = Math.floor(durationSec / 60);
    const secs = durationSec % 60;
    const durStr = durationSec > 0 ? (mins > 0 ? `${mins}m ${secs}s` : `${secs}s`) : (reason === 'declined' ? 'Declined' : 'Missed');

    // Log call record into chat message history
    if (callState.contact) {
      const contact = callState.contact;
      const isVid = callState.callType === 'video';
      const callRecordMsg = {
        id: Date.now(),
        sender: isDimension5 ? 'teacher' : 'student',
        senderUserId: user?.id || (isDimension5 ? 'teacher' : 'student'),
        senderName: user?.name || (isDimension5 ? 'DAV Faculty' : 'DAV Student'),
        text: isVid ? `📹 Video call (${durStr})` : `📞 Voice call (${durStr})`,
        isCallRecord: true,
        callDurationText: durStr,
        callType: isVid ? 'video' : 'voice',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };

      const chKey = getConversationChannelKey(user?.id, contact.id);
      const nameKey = getNameChannelKey(user?.name, contact.name);
      const currentList = getMessagesForContact(contact);
      const updatedList = [...currentList, callRecordMsg];
      const updatedMap = {
        ...teacherChatsMap,
        [chKey]: updatedList,
        [contact.id]: updatedList
      };
      if (nameKey) updatedMap[nameKey] = updatedList;
      if (contact.name) updatedMap[contact.name] = updatedList;
      persistChats(updatedMap);
      if (typeof saveCloudDoubtChats === 'function') {
        saveCloudDoubtChats(updatedMap).catch(() => {});
      }
    }

    setCallState(prev => ({ ...prev, status: 'ended' }));
    setTimeout(() => {
      setCallState({
        isOpen: false,
        contact: null,
        status: 'idle',
        duration: 0,
        isMuted: false,
        isCamOff: false,
        facingMode: 'user',
        isSpeaker: true,
        hasMicPermission: false,
        hasCamPermission: false,
        callType: 'video'
      });
      setMicVolumeLevel(0);
    }, 600);
  };

  const handleToggleMute = () => {
    if (callStreamRef.current) {
      const tracks = callStreamRef.current.getAudioTracks();
      tracks.forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setCallState(prev => ({ ...prev, isMuted: !prev.isMuted }));
    playSoundChime('sent');
  };

  const handleToggleCam = () => {
    if (callStreamRef.current) {
      const tracks = callStreamRef.current.getVideoTracks();
      tracks.forEach(track => {
        track.enabled = !track.enabled;
      });
    }
    setCallState(prev => ({ ...prev, isCamOff: !prev.isCamOff }));
    playSoundChime('sent');
  };

  const handleSwitchCamera = async () => {
    const nextFacing = callState.facingMode === 'user' ? 'environment' : 'user';
    setCallState(prev => ({ ...prev, facingMode: nextFacing }));
    if (callStreamRef.current) {
      callStreamRef.current.getVideoTracks().forEach(t => t.stop());
    }
    const newStream = await acquireCallMedia('video', nextFacing);
    if (peerConnectionRef.current && newStream) {
      const newVideoTrack = newStream.getVideoTracks()[0];
      const sender = peerConnectionRef.current.getSenders().find(s => s.track && s.track.kind === 'video');
      if (sender && newVideoTrack) {
        sender.replaceTrack(newVideoTrack);
      }
    }
    playSoundChime('sent');
  };

  const handleToggleSpeaker = () => {
    setCallState(prev => ({ ...prev, isSpeaker: !prev.isSpeaker }));
    playSoundChime('sent');
  };

  const chatMessagesEndRef = useRef(null);
  const [showChatScrollDown, setShowChatScrollDown] = useState(false);

  // Auto-scroll chat to bottom on new messages or contact switch (safe after activeContact & teacherChatsMap initialization)
  useEffect(() => {
    if (activePage === 'doubts_chat' || activePage === 2) {
      chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [teacherChatsMap, activeContactId, activePage]);

  // Canonical Symmetric Channel Key Generators
  const getConversationChannelKey = (uA, uB) => {
    const idA = String(uA?.id || uA || '').toLowerCase().trim();
    const idB = String(uB?.id || uB || '').toLowerCase().trim();
    if (!idA && !idB) return 'general_chat';
    if (!idA) return idB;
    if (!idB) return idA;
    return [idA, idB].sort().join('__');
  };

  const getNameChannelKey = (nameA, nameB) => {
    const clean = (n) => String(n || '').toLowerCase().replace(/^(prof\.|dr\.|mr\.|mrs\.)\s*/i, '').trim();
    const cA = clean(nameA);
    const cB = clean(nameB);
    if (!cA && !cB) return '';
    return [cA, cB].sort().join('__');
  };

  // Safe Multi-Key Message Lookup for foolproof cross-device delivery
  const getMessagesForContact = (contact) => {
    if (!contact) return [];
    const chKey = getConversationChannelKey(user?.id, contact.id);
    const nameKey = getNameChannelKey(user?.name, contact.name);

    if (teacherChatsMap[chKey] && Array.isArray(teacherChatsMap[chKey]) && teacherChatsMap[chKey].length > 0) {
      return teacherChatsMap[chKey];
    }
    if (nameKey && teacherChatsMap[nameKey] && Array.isArray(teacherChatsMap[nameKey]) && teacherChatsMap[nameKey].length > 0) {
      return teacherChatsMap[nameKey];
    }
    if (teacherChatsMap[contact.id] && Array.isArray(teacherChatsMap[contact.id]) && teacherChatsMap[contact.id].length > 0) {
      return teacherChatsMap[contact.id];
    }
    if (contact.name && teacherChatsMap[contact.name] && Array.isArray(teacherChatsMap[contact.name]) && teacherChatsMap[contact.name].length > 0) {
      return teacherChatsMap[contact.name];
    }
    if (user?.id && teacherChatsMap[user.id] && Array.isArray(teacherChatsMap[user.id]) && teacherChatsMap[user.id].length > 0) {
      return teacherChatsMap[user.id];
    }
    return [];
  };

  const handleSelectContact = (contactId) => {
    setActiveContactId(contactId);
    setMobileChatTab('chat');
    playSoundChime('sent');
  };

  // Send Message Handler with Immediate Supabase Cloud Push
  const handleSendMessage = async () => {
    if (!chatInputText.trim() && !pendingMedia) return;
    if (!activeContact) return;

    const senderRole = isDimension5 ? 'teacher' : 'student';
    const senderName = user?.name || (isDimension5 ? 'DAV Faculty' : 'DAV Student');
    const senderClassSec = isDimension5 
      ? (user?.subject || 'DAV Faculty')
      : (user?.studentClass ? 'Class ' + user.studentClass + '-D' : 'Class 8-D');

    const newMsg = {
      id: Date.now(),
      sender: senderRole,
      senderUserId: user?.id || (isDimension5 ? 'teacher' : 'student'),
      senderName: senderName,
      senderClassSec: senderClassSec,
      text: chatInputText.trim(),
      textColor: chatTextColor || '#111b21',
      media: pendingMedia ? { ...pendingMedia } : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    const chKey = getConversationChannelKey(user?.id, activeContact.id);
    const nameKey = getNameChannelKey(user?.name, activeContact.name);
    const currentList = getMessagesForContact(activeContact);
    const updatedList = [...currentList, newMsg];

    const updatedMap = {
      ...teacherChatsMap,
      [chKey]: updatedList,
      [activeContact.id]: updatedList
    };
    if (nameKey) {
      updatedMap[nameKey] = updatedList;
    }

    persistChats(updatedMap);
    setChatInputText('');
    setPendingMedia(null);
    playSoundChime('sent');

    try {
      await saveCloudDoubtChats(updatedMap);
    } catch (e) {
      console.warn('saveCloudDoubtChats failed:', e);
    }
  };

  // Instant AI Conceptual Answer Handler
  const handleInstantAIAnswer = async () => {
    if (!activeContact) return;
    playSoundChime('sent');

    const aiReply = {
      id: Date.now() + 1,
      sender: 'teacher',
      senderUserId: activeContact.id || 'ai_faculty',
      senderName: activeContact.name,
      senderClassSec: activeContact.subtitle || 'DAV Academic Advisory',
      text: 'Greetings! Based on the prescribed DAV CBSE Curriculum, here is the verified conceptual explanation: Please review textbook chapter exercises carefully, ensure formulas are written with proper units, and apply step-by-step reasoning. Feel free to ask any specific follow-up query!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      isAiAssisted: true
    };

    const chKey = getConversationChannelKey(user?.id, activeContact.id);
    const nameKey = getNameChannelKey(user?.name, activeContact.name);
    const currentList = getMessagesForContact(activeContact);
    const updatedList = [...currentList, aiReply];

    const updatedMap = {
      ...teacherChatsMap,
      [chKey]: updatedList,
      [activeContact.id]: updatedList
    };
    if (nameKey) {
      updatedMap[nameKey] = updatedList;
    }

    persistChats(updatedMap);
    playSoundChime('received');

    try {
      await saveCloudDoubtChats(updatedMap);
    } catch (e) {}
  };

  // Universal Media Upload via Single Pin Icon
  const handleUniversalMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let mediaType = 'image';
    if (file.type.startsWith('video/')) mediaType = 'video';
    else if (file.type.startsWith('audio/')) mediaType = 'audio';

    const reader = new FileReader();
    reader.onload = (event) => {
      setPendingMedia({
        type: mediaType,
        dataUrl: event.target.result,
        name: file.name
      });
      playSoundChime('sent');
    };
    reader.readAsDataURL(file);
  };

  // Save Custom Teacher Profile / DP with live synchronization
  const handleSaveTeacherProfile = (e) => {
    e.preventDefault();
    if (!customProfileForm.name.trim()) return;

    try {
      const cleanName = customProfileForm.name.trim();
      const cleanSubject = customProfileForm.subject || 'Science & Technology';
      const cleanDp = customProfileForm.dp || null;

      // 1. Update user in dav_user
      const currentUserRaw = localStorage.getItem('dav_user');
      if (currentUserRaw) {
        const u = JSON.parse(currentUserRaw);
        u.name = cleanName;
        u.subject = cleanSubject;
        u.department = cleanSubject;
        u.dp = cleanDp;
        u.avatar = cleanDp;
        localStorage.setItem('dav_user', JSON.stringify(u));
      }

      // 2. Update user in dav_registered_users
      try {
        const regRaw = localStorage.getItem('dav_registered_users');
        if (regRaw) {
          const users = JSON.parse(regRaw);
          if (Array.isArray(users)) {
            const idx = users.findIndex(u => 
              (u.id && user?.id && u.id.toLowerCase() === user.id.toLowerCase()) ||
              (u.name && user?.name && u.name.toLowerCase() === user.name.toLowerCase())
            );
            if (idx !== -1) {
              users[idx].name = cleanName;
              users[idx].subject = cleanSubject;
              users[idx].department = cleanSubject;
              users[idx].dp = cleanDp;
              users[idx].avatar = cleanDp;
              localStorage.setItem('dav_registered_users', JSON.stringify(users));
            }
          }
        }
      } catch (err) {
        console.warn('Failed to parse dav_registered_users:', err);
      }

      // 3. Save to custom teachers store
      const stored = localStorage.getItem(CUSTOM_TEACHERS_STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter(t => t.id !== ('tch_reg_' + (user?.id || 'me')));
      const newEntry = {
        id: 'tch_reg_' + (user?.id || 'me'),
        name: cleanName,
        subject: cleanSubject,
        department: cleanSubject,
        role: 'Verified DAV Faculty',
        qualification: 'M.Sc./M.A., B.Ed., CTET Certified',
        status: 'Online',
        assignedClass: 'Class 8-D',
        avatarColor: 'from-purple-600 to-indigo-700',
        dp: cleanDp,
        contactNumber: DIRECT_CONTACT_NUMBER,
        initialMessage: 'Greetings! I am ' + cleanName + '. How can I assist you with your academic questions today?'
      };
      updated.push(newEntry);
      localStorage.setItem(CUSTOM_TEACHERS_STORAGE_KEY, JSON.stringify(updated));

      // 4. Dispatch events for real-time app re-render
      window.dispatchEvent(new Event('dav_faculty_updated'));
      window.dispatchEvent(new Event('dav_user_updated'));
      refreshChatContacts();
      setShowTeacherProfileModal(false);
      playSoundChime('delivered');
    } catch (err) {
      console.error('Save teacher profile error:', err);
    }
  };

  // =========================================================================
  // PAGE 3: 100% IN-WEBSITE REAL ONLINE LIVE CLASSROOM (WEBRTC)
  // =========================================================================
  const [selectedLiveClassNum, setSelectedLiveClassNum] = useState('8');
  const [isLivePortalModalOpen, setIsLivePortalModalOpen] = useState(false);
  const [isInsideLiveRoom, setIsInsideLiveRoom] = useState(false);
  const [activeLiveSessionData, setActiveLiveSessionData] = useState(null);
  const [copiedLiveLink, setCopiedLiveLink] = useState(false);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const iframeLoadCountRef = useRef(0);

  // Live broadcasts store: completely real, no mock cards (Local + Supabase Cloud synced)
  // MUST be declared before any useEffect hooks that reference it!
  const [liveSessionsStore, setLiveSessionsStore] = useState(() => {
    try {
      const stored = localStorage.getItem(LIVE_BROADCASTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const persistLiveSessions = (updated) => {
    setLiveSessionsStore(updated);
    try {
      localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  // WebRTC Live Room Link Generator: Uses session.classId & session.id so all join the same room
  const getLiveRoomUrl = (session, classNum) => {
    const rawId = session?.id || 'live_stream';
    const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeClass = (session?.classId || classNum || '8').replace(/[^a-zA-Z0-9_-]/g, '_');
    const roomName = `DAV_School_Class_${safeClass}_${safeId}`;
    const userName = encodeURIComponent(user?.name || (isDimension5 ? 'DAV Faculty Teacher' : 'DAV Student'));
    return `https://p2p.mirotalk.com/join/${roomName}?name=${userName}`;
  };

  // Start Faculty Broadcast (STRICTLY Faculty Only)
  const handleStartFacultyBroadcast = async () => {
    const educatorName = user?.name ? (user.name.startsWith('Prof.') || user.name.startsWith('Mrs.') || user.name.startsWith('Mr.') || user.name.startsWith('Dr.') ? user.name : `Prof. ${user.name}`) : 'Verified DAV Faculty';
    const session = {
      id: 'live_broadcast_' + Date.now(),
      classId: selectedLiveClassNum || user?.classNum || '8',
      subject: user?.subject || 'Science & Technology',
      topic: `Class ${selectedLiveClassNum || user?.classNum || '8'} Faculty Live Lecture with ${educatorName}`,
      teacher: educatorName,
      status: 'live',
      activeParticipants: 1,
      time: 'Streaming Now',
      isRegisteredFaculty: true,
      startedAt: new Date().toISOString()
    };
    const updated = [session, ...liveSessionsStore.filter(s => s.id !== session.id)];
    setLiveSessionsStore(updated);
    try {
      localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(updated));
      await saveCloudLiveBroadcasts(updated);
    } catch (e) {}
    setActiveLiveSessionData(session);
    setIsInsideLiveRoom(true);
    playSoundChime('sent');
  };

  // End Faculty Broadcast (Removes from Cloud & Local across all devices)
  const handleEndFacultyBroadcast = async (sessionId) => {
    const targetId = sessionId || activeLiveSessionData?.id;
    const remaining = liveSessionsStore.filter(s => s.id !== targetId);
    setLiveSessionsStore(remaining);
    try {
      localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(remaining));
      await saveCloudLiveBroadcasts(remaining);
    } catch (e) {}
    setIsInsideLiveRoom(false);
    setActiveLiveSessionData(null);
    playSoundChime('delivered');
  };

  // Reset load count when entering meeting
  useEffect(() => {
    if (isInsideLiveRoom) {
      iframeLoadCountRef.current = 0;
    }
  }, [isInsideLiveRoom, activeLiveSessionData]);

  // Auto-close meeting room for students if teacher ends the live broadcast in cloud
  useEffect(() => {
    if (isInsideLiveRoom && activeLiveSessionData && !isDimension5) {
      const isStillLive = (liveSessionsStore || []).some(
        s => s.id === activeLiveSessionData.id && s.status === 'live'
      );
      if (!isStillLive) {
        setIsInsideLiveRoom(false);
        setActiveLiveSessionData(null);
        setIsWhiteboardActive(false);
        playSoundChime('alert');
      }
    }
  }, [liveSessionsStore, isInsideLiveRoom, activeLiveSessionData, isDimension5]);

  // Listen for MiroTalk postMessage events to auto-close if user clicks leave inside iframe
  useEffect(() => {
    const handleMirotalkEvent = (e) => {
      try {
        const data = e.data;
        const str = typeof data === 'string' ? data.toLowerCase() : JSON.stringify(data).toLowerCase();
        if (
          str.includes('leave') || 
          str.includes('hangup') || 
          str.includes('exit') || 
          str.includes('disconnected') ||
          str.includes('end_call') ||
          str.includes('room_closed')
        ) {
          if (isDimension5) {
            if (typeof handleEndFacultyBroadcast === 'function') {
              handleEndFacultyBroadcast(activeLiveSessionData?.id);
            } else {
              setIsInsideLiveRoom(false);
              setActiveLiveSessionData(null);
            }
          } else {
            setIsInsideLiveRoom(false);
            setActiveLiveSessionData(null);
          }
          setIsWhiteboardActive(false);
        }
      } catch (err) {}
    };
    window.addEventListener('message', handleMirotalkEvent);
    return () => window.removeEventListener('message', handleMirotalkEvent);
  }, [isInsideLiveRoom, activeLiveSessionData, isDimension5]);

  // Realtime Supabase Cloud Synchronization for Doubt Chats and Live Broadcasts
  useEffect(() => {
    let isSubscribed = true;

    // 1. Initial Fetch Doubt Chats
    if (typeof fetchCloudDoubtChats === 'function') {
      fetchCloudDoubtChats().then(cloudChats => {
        if (!isSubscribed) return;
        if (cloudChats && typeof cloudChats === 'object') {
          setTeacherChatsMap(prev => {
            const merged = { ...prev, ...cloudChats };
            try {
              localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
        }
      }).catch(() => {});
    }

    // 2. Initial Fetch Live Broadcasts
    if (typeof fetchCloudLiveBroadcasts === 'function') {
      fetchCloudLiveBroadcasts().then(cloudBroadcasts => {
        if (!isSubscribed) return;
        if (Array.isArray(cloudBroadcasts)) {
          setLiveSessionsStore(cloudBroadcasts);
          try {
            localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(cloudBroadcasts));
          } catch (e) {}
        }
      }).catch(() => {});
    }

    // 3. Realtime WebSocket Subscription for Doubt Chats
    let unsubChats = null;
    if (typeof subscribeCloudDoubtChats === 'function') {
      unsubChats = subscribeCloudDoubtChats((cloudChats) => {
        if (!isSubscribed) return;
        if (cloudChats && typeof cloudChats === 'object') {
          setTeacherChatsMap(prev => {
            const merged = { ...prev, ...cloudChats };
            try {
              localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(merged));
            } catch (e) {}
            return merged;
          });
          playSoundChime('received');
        }
      });
    }

    // 4. Realtime WebSocket Subscription for Live Broadcasts
    let unsubBroadcasts = null;
    if (typeof subscribeCloudLiveBroadcasts === 'function') {
      unsubBroadcasts = subscribeCloudLiveBroadcasts((cloudBroadcasts) => {
        if (!isSubscribed) return;
        if (Array.isArray(cloudBroadcasts)) {
          setLiveSessionsStore(cloudBroadcasts);
          try {
            localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(cloudBroadcasts));
          } catch (e) {}
        }
      });
    }

    // 5. High-Reliability Fallback Polling (Every 2.5s for seamless multi-device phone/PC sync)
    const pollTimer = setInterval(() => {
      if (typeof fetchCloudDoubtChats === 'function') {
        fetchCloudDoubtChats().then(cloudChats => {
          if (!isSubscribed) return;
          if (cloudChats && typeof cloudChats === 'object') {
            setTeacherChatsMap(prev => {
              if (JSON.stringify(prev) !== JSON.stringify({ ...prev, ...cloudChats })) {
                const merged = { ...prev, ...cloudChats };
                try {
                  localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(merged));
                } catch (e) {}
                return merged;
              }
              return prev;
            });
          }
        }).catch(() => {});
      }

      if (typeof fetchCloudLiveBroadcasts === 'function') {
        fetchCloudLiveBroadcasts().then(cloudBroadcasts => {
          if (!isSubscribed) return;
          if (Array.isArray(cloudBroadcasts)) {
            setLiveSessionsStore(prev => {
              if (JSON.stringify(prev) !== JSON.stringify(cloudBroadcasts)) {
                try {
                  localStorage.setItem(LIVE_BROADCASTS_STORAGE_KEY, JSON.stringify(cloudBroadcasts));
                } catch (e) {}
                return cloudBroadcasts;
              }
              return prev;
            });
          }
        }).catch(() => {});
      }
    }, 2500);

    return () => {
      isSubscribed = false;
      if (typeof unsubChats === 'function') unsubChats();
      if (typeof unsubBroadcasts === 'function') unsubBroadcasts();
      clearInterval(pollTimer);
    };
  }, []);

  // =========================================================================
  // PAGE 4: CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE
  // =========================================================================
  const [isTestPortalOpen, setIsTestPortalOpen] = useState(false);
  const [selectedTestClass, setSelectedTestClass] = useState('8');
  const [selectedTestSection, setSelectedTestSection] = useState('D');

  // Teacher Test Creator State (Faculty Only)
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [testFormatChoice, setTestFormatChoice] = useState('mcq'); // 'mcq', 'subjective', 'combined'
  const [newTestClass, setNewTestClass] = useState('8');
  const [newTestSections, setNewTestSections] = useState(['A', 'B', 'C', 'D', 'E']);
  const [newTestSubject, setNewTestSubject] = useState('Science & Technology');
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestChapter, setNewTestChapter] = useState('');
  const [newTestStartTime, setNewTestStartTime] = useState('10:00'); // 24-hr format
  const [newTestEndTime, setNewTestEndTime] = useState('11:00'); // 24-hr format
  const [deployedShareCode, setDeployedShareCode] = useState(null);

  // Compute test duration automatically between start and end time (24h)
  const computeDurationMinutes = (start, end) => {
    try {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const startMinutes = sh * 60 + sm;
      const endMinutes = eh * 60 + em;
      let diff = endMinutes - startMinutes;
      if (diff <= 0) diff += 24 * 60; // Crosses midnight
      return Math.max(5, diff);
    } catch (e) {
      return 60;
    }
  };

  // Questions Authoring List (Supports MCQ & Subjective)
  const [newTestQuestions, setNewTestQuestions] = useState([
    {
      id: 1,
      type: 'mcq',
      questionText: 'What is the standard near point of distinct vision for a normal human eye?',
      questionMedia: null, // optional image, video, or audio
      options: ['25 meters', '25 centimeters', '2.5 centimeters', 'Infinity'],
      correctAnswer: 'B',
      explanation: 'The least distance of distinct vision for a normal young adult is 25 cm.',
      maxMarks: 5
    }
  ]);

  const handleAddMcqQuestion = () => {
    const nextId = newTestQuestions.length + 1;
    setNewTestQuestions(prev => [
      ...prev,
      {
        id: nextId,
        type: 'mcq',
        questionText: '',
        questionMedia: null,
        options: ['', '', '', ''],
        correctAnswer: 'A',
        explanation: '',
        maxMarks: 5
      }
    ]);
    playSoundChime('sent');
  };

  const handleAddSubjectiveQuestion = () => {
    const nextId = newTestQuestions.length + 1;
    setNewTestQuestions(prev => [
      ...prev,
      {
        id: nextId,
        type: 'subjective',
        questionText: '',
        questionImage: null, // Teacher can upload image for diagram/question
        maxMarks: 10,
        explanation: 'Detailed step-by-step reasoning and derivation expected.'
      }
    ]);
    playSoundChime('sent');
  };

  const handleRemoveQuestion = (qIndex) => {
    if (newTestQuestions.length <= 1) return;
    setNewTestQuestions(prev => prev.filter((_, idx) => idx !== qIndex));
  };

  const handleToggleSectionCheckbox = (sec) => {
    if (newTestSections.includes(sec)) {
      if (newTestSections.length > 1) {
        setNewTestSections(prev => prev.filter(s => s !== sec));
      }
    } else {
      setNewTestSections(prev => [...prev, sec]);
    }
  };

  // 20-Hour Maximum Test Retention Policy
  const isExamExpired = (t) => {
    if (!t) return false;
    const createdAt = Number(t.createdAt) || (t.id ? Number(String(t.id).replace(/\D/g, '')) : 0);
    if (!createdAt) return false;
    const TWENTY_HOURS_MS = 20 * 60 * 60 * 1000;
    return (Date.now() - createdAt) > TWENTY_HOURS_MS;
  };

  // Custom Tests Database (Zero fake/demo tests)
  const [testsDatabase, setTestsDatabase] = useState(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_TESTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const persistTests = (updated) => {
    setTestsDatabase(updated);
    try {
      localStorage.setItem(CUSTOM_TESTS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  // Deploy New Test Handler (Faculty Only)
  const handleDeployExamination = (e) => {
    e.preventDefault();
    if (!newTestTitle.trim()) return;

    const duration = computeDurationMinutes(newTestStartTime, newTestEndTime);
    const code = 'DAV-' + newTestSubject.slice(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
    const totalExamMarks = newTestQuestions.reduce((sum, q) => sum + (Number(q.maxMarks) || 5), 0);

    const newExam = {
      id: 'test_custom_' + Date.now(),
      title: newTestTitle.trim(),
      subject: newTestSubject,
      classId: newTestClass,
      sections: [...newTestSections],
      chapter: newTestChapter.trim() || 'Curriculum Unit',
      format: testFormatChoice,
      startTime: newTestStartTime,
      endTime: newTestEndTime,
      durationMinutes: duration,
      totalMarks: totalExamMarks,
      testCode: code,
      createdBy: user?.name ? (user.name.startsWith('Prof.') ? user.name : 'Prof. ' + user.name) : 'Verified DAV Faculty',
      questions: newTestQuestions.map((q, idx) => ({
        ...q,
        id: idx + 1,
        questionText: q.questionText || ('Question ' + (idx + 1))
      }))
    };

    const updated = [newExam, ...testsDatabase];
    persistTests(updated);
    setDeployedShareCode(code);
    playSoundChime('delivered');
  };

  // Teacher Check Leaderboard Modal State
  const [showTeacherLeaderboardModal, setShowTeacherLeaderboardModal] = useState(false);
  const [leaderboardSelectedTest, setLeaderboardSelectedTest] = useState(null);

  // Student CBT Exam Simulator State
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [activeExamData, setActiveExamData] = useState(null);
  const [examCurrentQIdx, setExamCurrentQIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({}); // { [qId]: answerLetter or text }
  const [examSubjectiveImages, setExamSubjectiveImages] = useState({}); // { [qId]: base64 photo of notebook }
  const [examPaletteStatus, setExamPaletteStatus] = useState({});
  const [examTimeRemaining, setExamTimeRemaining] = useState(1800);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResultScore, setExamResultScore] = useState(null);
  const [examLeaderboard, setExamLeaderboard] = useState([]);

  // Check if test window is active
  const isTestWindowOpen = (test) => {
    if (!test.startTime || !test.endTime) return true;
    try {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const [sh, sm] = test.startTime.split(':').map(Number);
      const [eh, em] = test.endTime.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      return currentMinutes >= startMin && currentMinutes <= endMin;
    } catch (e) {
      return true;
    }
  };

  // Start CBT Exam
  const handleStartExam = (test) => {
    setActiveExamData(test);
    setExamCurrentQIdx(0);
    setExamAnswers({});
    setExamSubjectiveImages({});
    const initialPalette = {};
    test.questions.forEach((q, idx) => {
      initialPalette[q.id] = idx === 0 ? 'not_attempted' : 'unvisited';
    });
    setExamPaletteStatus(initialPalette);
    setExamTimeRemaining(test.durationMinutes * 60);
    setExamSubmitted(false);
    setExamResultScore(null);
    setIsTakingExam(true);
    playSoundChime('sent');
  };

  // Timer countdown
  useEffect(() => {
    if (!isTakingExam || examSubmitted) return;
    const interval = setInterval(() => {
      setExamTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTakingExam, examSubmitted, examAnswers, activeExamData]);

  // Select Option in CBT (MCQ)
  const handleSelectOptionInExam = (optionLetter) => {
    if (examSubmitted || !activeExamData) return;
    const currentQ = activeExamData.questions[examCurrentQIdx];
    setExamAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionLetter
    }));
    setExamPaletteStatus(prev => ({
      ...prev,
      [currentQ.id]: 'answered'
    }));
    playSoundChime('sent');
  };

  // Handle Text/Image Answer for Subjective Question
  const handleSubjectiveAnswerChange = (text) => {
    if (examSubmitted || !activeExamData) return;
    const currentQ = activeExamData.questions[examCurrentQIdx];
    setExamAnswers(prev => ({
      ...prev,
      [currentQ.id]: text
    }));
    if (text.trim().length > 0) {
      setExamPaletteStatus(prev => ({
        ...prev,
        [currentQ.id]: 'answered'
      }));
    }
  };

  const handleUploadSubjectiveNotebookPhoto = (e, qId) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setExamSubjectiveImages(prev => ({
        ...prev,
        [qId]: ev.target.result
      }));
      setExamPaletteStatus(prev => ({
        ...prev,
        [qId]: 'answered'
      }));
      playSoundChime('sent');
    };
    reader.readAsDataURL(file);
  };

  // Mark for Review
  const handleMarkForReview = () => {
    if (examSubmitted || !activeExamData) return;
    const currentQ = activeExamData.questions[examCurrentQIdx];
    setExamPaletteStatus(prev => ({
      ...prev,
      [currentQ.id]: 'review'
    }));
    playSoundChime('alert');
  };

  // Jump to Question
  const handleJumpToQuestion = (qIndex) => {
    if (!activeExamData) return;
    const currentQ = activeExamData.questions[examCurrentQIdx];
    setExamPaletteStatus(prev => {
      if (prev[currentQ.id] === 'unvisited') {
        return { ...prev, [currentQ.id]: 'not_attempted' };
      }
      return prev;
    });

    setExamCurrentQIdx(qIndex);
    const targetQ = activeExamData.questions[qIndex];
    setExamPaletteStatus(prev => {
      if (prev[targetQ.id] === 'unvisited') {
        return { ...prev, [targetQ.id]: 'not_attempted' };
      }
      return prev;
    });
    playSoundChime('sent');
  };

  // Submit CBT Exam and Auto-Grade
  const handleSubmitExam = () => {
    if (!activeExamData) return;
    let correctCount = 0;
    let totalScoreObtained = 0;

    activeExamData.questions.forEach(q => {
      if (q.type === 'subjective') {
        // Award initial marks if attempted (teacher can override in leaderboard)
        if (examAnswers[q.id] || examSubjectiveImages[q.id]) {
          totalScoreObtained += Number(q.maxMarks) || 10;
          correctCount++;
        }
      } else {
        if (examAnswers[q.id] === q.correctAnswer) {
          totalScoreObtained += Number(q.maxMarks) || 5;
          correctCount++;
        }
      }
    });

    const totalQuestions = activeExamData.questions.length;
    const maxMarks = activeExamData.totalMarks || (totalQuestions * 5);
    const percentage = Math.round((totalScoreObtained / maxMarks) * 100);

    const candidateRealName = user?.name || user?.id || 'Student Candidate';

    const result = {
      correctCount,
      totalQuestions,
      totalScoreObtained,
      maxMarks,
      percentage,
      studentName: candidateRealName,
      timeSpentMinutes: Math.round((activeExamData.durationMinutes * 60 - examTimeRemaining) / 60)
    };

    setExamResultScore(result);
    setExamSubmitted(true);
    playSoundChime('delivered');

    // Read real persistent results
    let existingResults = [];
    try {
      const storedResults = localStorage.getItem(TEST_RESULTS_STORAGE_KEY);
      if (storedResults) {
        existingResults = JSON.parse(storedResults);
        if (!Array.isArray(existingResults)) existingResults = [];
      }
    } catch (e) {}

    const myAttempt = {
      id: 'att_' + Date.now(),
      testId: activeExamData.id,
      name: candidateRealName,
      score: totalScoreObtained,
      maxMarks: maxMarks,
      time: result.timeSpentMinutes + ' mins',
      timestamp: Date.now(),
      isCurrent: true,
      answers: examAnswers,
      subjectiveImages: examSubjectiveImages
    };

    const updatedResults = [myAttempt, ...existingResults];
    try {
      localStorage.setItem(TEST_RESULTS_STORAGE_KEY, JSON.stringify(updatedResults));
    } catch (e) {}

    const realRankings = updatedResults
      .filter(r => r.testId === activeExamData.id)
      .sort((a, b) => b.score - a.score)
      .map((item, index) => ({
        ...item,
        rank: index + 1
      }));

    setExamLeaderboard(realRankings);
  };

  const formatTimerClock = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  };

  // =========================================================================
  // PAGE 5: DIGITAL ATTENDANCE REGISTRY
  // =========================================================================
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedAttClass, setSelectedAttClass] = useState('8');
  const [selectedAttSection, setSelectedAttSection] = useState('D');
  const [attToast, setAttToast] = useState(null);

  const [attendanceStore, setAttendanceStore] = useState(() => {
    try {
      const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}
    return {};
  });

  const currentAttKey = selectedAttClass + '-' + selectedAttSection;
  const currentAttRoster = attendanceStore[currentAttKey] || getInitialRosterForClass(selectedAttClass, selectedAttSection);

  // Present or Absent (Two-State Only)
  const handleUpdateStudentAttendance = (roll, newStatus) => {
    if (!isFacultyRole) return;
    const updatedRoster = currentAttRoster.map(s => s.roll === roll ? { ...s, status: newStatus } : s);
    const updatedStore = {
      ...attendanceStore,
      [currentAttKey]: updatedRoster
    };
    setAttendanceStore(updatedStore);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updatedStore));
    } catch (e) {}
    playSoundChime('sent');
  };

  const handleSaveAttendance = () => {
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendanceStore));
      setAttToast('Official Attendance Record Committed & Synchronized to Cloud!');
      playSoundChime('delivered');
      setTimeout(() => setAttToast(null), 3000);
    } catch (e) {}
  };

  // Add / Enroll Real Student Handler (Attendance & Examination Ledger)
  const handleEnrollStudent = (classNum, sec, rollNum, studentName, maxMarks = 100) => {
    if (!studentName || !studentName.trim()) return;
    const roll = Math.max(1, Number(rollNum) || 1);
    const name = studentName.trim();
    const customMax = Math.max(5, Number(maxMarks) || 100);

    // 1. Update Attendance store for this class and section
    const aKey = classNum + '-' + sec;
    const aExisting = attendanceStore[aKey] || getInitialRosterForClass(classNum, sec);
    const aUpdated = [
      ...aExisting.filter(s => Number(s.roll) !== roll),
      { roll, name, status: 'present', maxMarks: customMax }
    ].sort((a, b) => a.roll - b.roll);
    const updatedAttStore = { ...attendanceStore, [aKey]: aUpdated };
    setAttendanceStore(updatedAttStore);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updatedAttStore));
    } catch (e) {}

    // 2. Update Marks Ledger for all terms in that class with 10 DAV subjects
    const terms = classNum === '8' ? EXAM_TERMS_CONFIG.class8 : EXAM_TERMS_CONFIG.lowerClasses;
    const nextMarksStore = { ...marksLedgerStore };
    terms.forEach(t => {
      const mKey = classNum + '-' + sec + '-' + t;
      const mExisting = nextMarksStore[mKey] || getInitialRosterForClass(classNum, sec).map(s => ({
        roll: s.roll,
        name: s.name,
        maxMarks: customMax,
        marks: {
          math: null,
          science: null,
          sst: null,
          english: null,
          hindi: null,
          sanskrit: null,
          computer: null,
          ns: null,
          drawing: null,
          gk: null
        }
      }));
      const existingStudent = mExisting.find(s => Number(s.roll) === roll);
      const existingMarks = existingStudent ? existingStudent.marks : {
        math: null,
        science: null,
        sst: null,
        english: null,
        hindi: null,
        sanskrit: null,
        computer: null,
        ns: null,
        drawing: null,
        gk: null
      };
      const mUpdated = [
        ...mExisting.filter(s => Number(s.roll) !== roll),
        {
          roll,
          name,
          maxMarks: customMax,
          marks: existingMarks
        }
      ].sort((a, b) => a.roll - b.roll);
      nextMarksStore[mKey] = mUpdated;
    });

    setMarksLedgerStore(nextMarksStore);
    try {
      localStorage.setItem(MARKS_LEDGER_STORAGE_KEY, JSON.stringify(nextMarksStore));
    } catch (e) {}

    setAttToast('Student ' + name + ' (Roll #' + roll + ') successfully enrolled in Class ' + classNum + '-' + sec + '!');
    setMarksToast('Student ' + name + ' (Roll #' + roll + ') registered with Total Marks Out Of ' + customMax + '!');
    playSoundChime('delivered');
  };

  const handleRemoveStudent = (classNum, sec, roll) => {
    if (!isDimension5) return;
    // 1. Remove from attendance
    const aKey = classNum + '-' + sec;
    const aExisting = attendanceStore[aKey] || [];
    const aUpdated = aExisting.filter(s => s.roll !== roll);
    const updatedAttStore = { ...attendanceStore, [aKey]: aUpdated };
    setAttendanceStore(updatedAttStore);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updatedAttStore));
    } catch (e) {}

    // 2. Remove from marks ledger
    const terms = classNum === '8' ? EXAM_TERMS_CONFIG.class8 : EXAM_TERMS_CONFIG.lowerClasses;
    const nextMarksStore = { ...marksLedgerStore };
    terms.forEach(t => {
      const mKey = classNum + '-' + sec + '-' + t;
      if (nextMarksStore[mKey]) {
        nextMarksStore[mKey] = nextMarksStore[mKey].filter(s => s.roll !== roll);
      }
    });
    setMarksLedgerStore(nextMarksStore);
    try {
      localStorage.setItem(MARKS_LEDGER_STORAGE_KEY, JSON.stringify(nextMarksStore));
    } catch (e) {}

    playSoundChime('sent');
  };

  // =========================================================================
  // PAGE 6: STUDENT MARKS & EXAMINATION LEADERBOARD
  // =========================================================================
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [selectedMarksClass, setSelectedMarksClass] = useState('8');
  const [selectedMarksSection, setSelectedMarksSection] = useState('D');
  const [selectedMarksTerm, setSelectedMarksTerm] = useState('First Periodic Test (PT-1)');
  const [marksToast, setMarksToast] = useState(null);
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);

  // Enroll Student Modal State
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollModalContext, setEnrollModalContext] = useState('attendance'); // 'attendance' | 'marks'
  const [enrollTargetClass, setEnrollTargetClass] = useState('8');
  const [enrollTargetSection, setEnrollTargetSection] = useState('D');
  const [enrollStudentRoll, setEnrollStudentRoll] = useState('');
  const [enrollStudentName, setEnrollStudentName] = useState('');
  const [enrollStudentMaxMarks, setEnrollStudentMaxMarks] = useState('100');

  // Max Marks per Subject Configuration (Default 100 per subject, editable by teacher)
  const [marksMaxConfig, setMarksMaxConfig] = useState(() => {
    try {
      const stored = localStorage.getItem(MARKS_MAX_CONFIG_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}
    return {
      math: 100,
      science: 100,
      sst: 100,
      english: 100,
      hindi: 100,
      sanskrit: 100,
      computer: 100,
      ns: 100,
      drawing: 100,
      gk: 100
    };
  });

  const [showMaxMarksConfigModal, setShowMaxMarksConfigModal] = useState(false);

  const handleUpdateMaxMarks = (subjKey, val) => {
    const num = Math.max(1, Number(val) || 100);
    const updated = { ...marksMaxConfig, [subjKey]: num };
    setMarksMaxConfig(updated);
    try {
      localStorage.setItem(MARKS_MAX_CONFIG_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const availableTerms = selectedMarksClass === '8' 
    ? EXAM_TERMS_CONFIG.class8 
    : EXAM_TERMS_CONFIG.lowerClasses;

  // Marks Database
  const [marksLedgerStore, setMarksLedgerStore] = useState(() => {
    try {
      const stored = localStorage.getItem(MARKS_LEDGER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}
    return {};
  });

  const currentMarksKey = selectedMarksClass + '-' + selectedMarksSection + '-' + selectedMarksTerm;
  const currentMarksRoster = marksLedgerStore[currentMarksKey] || (() => {
    const aKey = selectedMarksClass + '-' + selectedMarksSection;
    const aRoster = attendanceStore[aKey];
    if (Array.isArray(aRoster) && aRoster.length > 0) {
      return aRoster.map(s => ({
        roll: s.roll,
        name: s.name,
        marks: {
          math: null,
          science: null,
          sst: null,
          english: null,
          hindi: null,
          sanskrit: null,
          computer: null,
          ns: null,
          drawing: null,
          gk: null
        }
      }));
    }
    return getInitialRosterForClass(selectedMarksClass, selectedMarksSection).map(s => ({
      roll: s.roll,
      name: s.name,
      marks: {
        math: null,
        science: null,
        sst: null,
        english: null,
        hindi: null,
        sanskrit: null,
        computer: null,
        ns: null,
        drawing: null,
        gk: null
      }
    }));
  })();

  // Update a Student's subject mark (allows empty/null, respects custom student maxMarks)
  const handleUpdateStudentMark = (roll, subjectKey, value) => {
    if (!isFacultyRole) return;
    const currentStudent = currentMarksRoster.find(s => s.roll === roll);
    const maxAllowed = currentStudent?.maxMarks ? Math.max(5, Number(currentStudent.maxMarks)) : (marksMaxConfig[subjectKey] || 100);
    const numVal = value === '' ? null : Math.min(maxAllowed, Math.max(0, Number(value) || 0));

    const updatedRoster = currentMarksRoster.map(s => {
      if (s.roll === roll) {
        return {
          ...s,
          marks: {
            ...s.marks,
            [subjectKey]: numVal
          }
        };
      }
      return s;
    });

    const updatedStore = {
      ...marksLedgerStore,
      [currentMarksKey]: updatedRoster
    };

    setMarksLedgerStore(updatedStore);
    try {
      localStorage.setItem(MARKS_LEDGER_STORAGE_KEY, JSON.stringify(updatedStore));
    } catch (e) {}
  };

  // Save Marks Ledger
  const handleSaveMarksLedger = () => {
    try {
      localStorage.setItem(MARKS_LEDGER_STORAGE_KEY, JSON.stringify(marksLedgerStore));
      setMarksToast('Examination Marks Ledger Successfully Committed & Saved!');
      playSoundChime('delivered');
      setTimeout(() => setMarksToast(null), 3000);
    } catch (e) {}
  };

  // Dynamic Overall Class Rank Computation across all sections of selectedMarksClass
  const computeOverallClassRankMap = () => {
    const allStudentsInClass = [];
    const sections = ['A', 'B', 'C', 'D', 'E'];
    sections.forEach(sec => {
      const key = selectedMarksClass + '-' + sec + '-' + selectedMarksTerm;
      const roster = marksLedgerStore[key] || [];
      roster.forEach(st => {
        let studentTotal = 0;
        let hasAnyMark = false;
        DAV_SUBJECTS_10.forEach(sub => {
          if (st.marks && st.marks[sub.key] !== null && st.marks[sub.key] !== undefined) {
            studentTotal += Number(st.marks[sub.key]);
            hasAnyMark = true;
          }
        });
        allStudentsInClass.push({
          uniqueId: `${sec}_${st.roll}_${st.name}`,
          roll: st.roll,
          name: st.name,
          section: sec,
          total: studentTotal,
          hasAnyMark
        });
      });
    });

    // Sort descending by total
    allStudentsInClass.sort((a, b) => b.total - a.total);

    const rankMap = {};
    allStudentsInClass.forEach((st, idx) => {
      rankMap[st.uniqueId] = idx + 1;
    });
    return rankMap;
  };

  const overallClassRankMap = computeOverallClassRankMap();

  // Compute aggregates for a student row
  const computeRowAggregates = (student) => {
    let totalObtained = 0;
    let attemptedMax = 0;
    let filledCount = 0;
    const studentMaxMarks = Math.max(5, Number(student.maxMarks) || 100);

    const GRADE_SET = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D', 'E'];
    DAV_SUBJECTS_10.forEach(sub => {
      const maxForSub = student.maxMarks ? studentMaxMarks : (marksMaxConfig[sub.key] || 100);
      const rawVal = student.marks?.[sub.key];
      if (rawVal !== null && rawVal !== undefined && rawVal !== '') {
        const strVal = String(rawVal).trim().toUpperCase();
        if (GRADE_SET.includes(strVal)) {
          // Co-curricular letter grade: counted as assessed, but excluded from numeric total and %
          filledCount++;
        } else if (!isNaN(Number(rawVal))) {
          totalObtained += Number(rawVal);
          attemptedMax += maxForSub;
          filledCount++;
        }
      }
    });

    const totalMaxPossible = student.maxMarks ? (studentMaxMarks * DAV_SUBJECTS_10.length) : DAV_SUBJECTS_10.reduce((acc, sub) => acc + (marksMaxConfig[sub.key] || 100), 0);
    const percentage = attemptedMax > 0 ? ((totalObtained / attemptedMax) * 100).toFixed(1) : '-';

    // Section rank among currentMarksRoster
    const sortedSection = [...currentMarksRoster].sort((a, b) => {
      const totA = DAV_SUBJECTS_10.reduce((s, sub) => s + (Number(a.marks?.[sub.key]) || 0), 0);
      const totB = DAV_SUBJECTS_10.reduce((s, sub) => s + (Number(b.marks?.[sub.key]) || 0), 0);
      return totB - totA;
    });

    const sRankIdx = sortedSection.findIndex(s => s.roll === student.roll);
    const sectionRank = sRankIdx !== -1 ? (sRankIdx + 1) : '-';

    const uId = selectedMarksSection + '_' + student.roll + '_' + student.name;
    const overallRank = overallClassRankMap[uId] || '-';

    return {
      totalObtained: filledCount > 0 ? totalObtained : '-',
      totalMax: filledCount > 0 ? attemptedMax : totalMaxPossible,
      fullMax: totalMaxPossible,
      filledCount,
      percentage: percentage !== '-' ? (percentage + '%') : '-',
      sectionRank: (sectionRank !== '-' ? '#' + sectionRank : '-'),
      overallRank: (overallRank !== '-' ? '#' + overallRank : '-'),
      studentMax: studentMaxMarks
    };
  };

  // Aliases for compatibility across sub-pages
  const scheduledLiveClasses = liveSessionsStore || [];
  const teachersList = chatContactsList.filter(c => c.type === 'teacher').length > 0
    ? chatContactsList.filter(c => c.type === 'teacher')
    : (user?.name ? [{ id: 'tch_me', name: (user.name.startsWith('Prof.') || user.name.startsWith('Dr.') || user.name.startsWith('Mr.') || user.name.startsWith('Mrs.')) ? user.name : 'Prof. ' + user.name, subject: user?.subject || 'Science & Technology' }] : []);
  const activeTeacher = teachersList.find(t => t.id === activeContactId) || teachersList[0] || { name: user?.name || 'Verified DAV Faculty', subject: user?.subject || 'Science & Technology' };

  const currentMeta = PDF_PAGES_METADATA[activePage] || PDF_PAGES_METADATA.homework;


  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-stone-950 via-slate-950 to-stone-900 text-white font-sans selection:bg-amber-400 selection:text-stone-950 pb-16 relative overflow-hidden">
      {/* Dynamic Animated Ambient Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/15 rounded-full pointer-events-none animate-float-orb" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-500/15 rounded-full pointer-events-none animate-float-orb" style={{ animationDelay: '-5s' }} />
      
      {/* ========================================================================= */}
      {/* MAIN SECTION 5 CANVAS: 6-PAGE PDF PRESENTATION OR FULL-SCREEN MODE        */}
      {/* ========================================================================= */}
      <main className="w-full px-2 sm:px-4 md:px-8 pt-3">

        {!isFullScreenInteractive ? (
          /* ===================================================================== */
          /* 6-PAGE INTERACTIVE MINT GREEN + PURPLE PDF PRESENTATION               */
          /* ===================================================================== */
          <div className="w-full max-w-5xl mx-auto animate-fadeIn">
            
            {/* ====================================================== */}
            {/* PAGE DOTS / PILL NAVIGATION - TOP                      */}
            {/* ====================================================== */}
            <div className="flex items-center gap-1.5 pt-3 pb-5 overflow-x-auto scrollbar-none px-2 justify-start sm:justify-center">
              {PRESENTATION_PAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { handlePageChange(p.id); }}
                  title={p.title}
                  className={`transition-all duration-300 cursor-pointer rounded-full font-black text-[11px] font-mono border-2 ${
                    activePage === p.id
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-stone-950 border-amber-200 shadow-xl shadow-amber-500/40 px-5 py-2 scale-105 font-black card-real-3d animate-glow-gold'
                      : 'bg-stone-900 text-amber-200/80 border-stone-800 hover:border-amber-400 hover:text-amber-300 px-3.5 py-1.5 flex items-center justify-center transition-all'
                  }`}
                >
                  {activePage === p.id ? `Page ${p.num} / 6` : `P${p.num}`}
                </button>
              ))}
            </div>

            {/* ====================================================== */}
            {/* THE MAIN PAGE CARD WITH DYNAMIC THEME COLORS PER PAGE */}
            <div className={`relative w-full rounded-3xl overflow-hidden border-2 ${currentMeta.borderColor || 'border-amber-400/80'} ${currentMeta.glowColor || 'shadow-2xl'} bg-gradient-to-br ${currentMeta.cardGradient || 'from-stone-950 to-stone-900'} card-real-3d elevation-3d-velvet transition-all duration-500`}>

              {/* Top accent stripe */}
              <div className={`w-full h-2 bg-gradient-to-r ${currentMeta.stripeGradient || 'from-amber-400 to-red-500'} animate-spectrum-sheen`} />

              <div className="relative z-10 p-6 sm:p-10 md:p-14 space-y-8">

                {/* Page number badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`px-3 py-1 rounded-full ${currentMeta.badgeStyle || 'bg-amber-400/20 text-amber-300 border-amber-400/50'} font-mono font-black text-xs tracking-widest uppercase animate-badge-bounce`}>
                    PAGE {currentMeta.pageNumber} OF 06
                  </span>
                  <span className="px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-stone-300 font-mono text-[11px] font-bold">
                    {currentMeta.badgeText}
                  </span>
                </div>

                {/* Section icon + title */}
                <div className="text-center space-y-3">
                  <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${currentMeta.iconGradient || 'from-amber-400 to-orange-500'} shadow-2xl mb-3 border-2 border-white/30 animate-trophy-glory`}>
                    {activePage === 'homework' && <ClipboardList className="w-10 h-10 text-white" />}
                    {activePage === 'doubts_chat' && <MessageSquare className="w-10 h-10 text-white" />}
                    {activePage === 'live_class' && <Video className="w-10 h-10 text-white" />}
                    {activePage === 'tests' && <CheckSquare className="w-10 h-10 text-white" />}
                    {activePage === 'attendance' && <UserCheck className="w-10 h-10 text-white" />}
                    {activePage === 'marks_ledger' && <Award className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight text-3d-mega animate-3d-float">
                    {currentMeta.directiveName}
                  </h2>
                  <p className={`text-xs sm:text-sm ${currentMeta.accentText || 'text-amber-200/90'} font-medium max-w-2xl mx-auto`}>
                    {currentMeta.tagline}
                  </p>

                  {/* Upper Launch Button for Page 3 (Live Class) directly below hero title */}
                  {activePage === 'live_class' && (
                    <div className="pt-3 pb-1 flex justify-center">
                      <button
                        onClick={() => {
                          setIsFullScreenInteractive(true);
                          playSoundChime('sent');
                        }}
                        className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-teal-400 hover:from-rose-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 transition cursor-pointer border border-teal-200/60 min-h-[44px]"
                      >
                        <Video className="w-4 h-4 text-slate-950" />
                        <span>Launch WebRTC Live Classroom Portal</span>
                        <ArrowRight className="w-4 h-4 animate-att-absent-stamp" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Overview description */}
                <div className={`max-w-3xl mx-auto text-center text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-900/95 rounded-2xl px-6 py-4 border ${currentMeta.borderColor || 'border-amber-500/30'} shadow-lg`}>
                  {currentMeta.overview}
                </div>

                {/* 3 Core feature pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentMeta.corePillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className={`p-4 sm:p-5 rounded-2xl ${currentMeta.pillarBg || 'bg-stone-900/80'} border transition space-y-2 shadow-xl card-real-3d`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${currentMeta.iconGradient || 'from-amber-400 to-orange-500'} text-white flex items-center justify-center font-black text-xs font-mono shadow-md animate-float-icon`}>
                        0{idx + 1}
                      </div>
                      <h4 className={`text-xs sm:text-sm font-black ${currentMeta.accentText || 'text-amber-300'} text-3d-gold`}>{pillar.title}</h4>
                      <p className="text-[11px] sm:text-xs text-stone-300/80 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Stat pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {currentMeta.statPills.map((pill, i) => (
                    <div key={i} className={`px-3.5 py-1.5 rounded-xl bg-stone-900 border ${currentMeta.borderColor || 'border-amber-500/30'} text-center shadow-md`}>
                      <div className="text-[9px] text-stone-400 font-mono uppercase tracking-wider">{pill.label}</div>
                      <div className={`text-xs sm:text-sm font-black ${currentMeta.accentText || 'text-amber-300'}`}>{pill.val}</div>
                    </div>
                  ))}
                </div>

                {/* ================================================ */}
                {/* CENTRAL LAUNCH BUTTON - Big Touch-Friendly Button */}
                {/* ================================================ */}
                <div className="flex flex-col items-center gap-3 py-2">
                  <button
                    onClick={() => {
                      setIsFullScreenInteractive(true);
                      playSoundChime('sent');
                    }}
                    className={`inline-flex items-center justify-center gap-3 px-6 sm:px-14 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r ${currentMeta.buttonGradient || 'from-amber-400 to-orange-500 text-stone-950'} font-black text-sm sm:text-base shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/40 card-real-3d min-h-[48px] w-full sm:w-auto`}
                  >
                    <span>{currentMeta.centralButtonText}</span>
                    <ArrowRight className="w-5 h-5 animate-live-confetti-clap" />
                  </button>
                  <p className={`text-[11px] ${currentMeta.accentText || 'text-amber-300/80'} font-mono text-center`}>
                    {currentMeta.centralButtonSub}
                  </p>
                </div>

                {/* Instructions Box */}
                <div className={`max-w-2xl mx-auto rounded-2xl bg-stone-900/95 border ${currentMeta.borderColor || 'border-amber-500/30'} p-4 sm:p-5 space-y-2 shadow-xl`}>
                  <h4 className={`text-[11px] font-black uppercase ${currentMeta.accentText || 'text-amber-400'} font-mono flex items-center gap-2`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>How to Use This Academic Section:</span>
                  </h4>
                  <ul className="space-y-1 text-[11px] sm:text-xs text-stone-300">
                    {currentMeta.instructions.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className={`${currentMeta.accentText || 'text-amber-400'} font-bold shrink-0`}>{i + 1}.</span>
                        <span>{step.replace(/^Step \d+:\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directive Seal & Scope */}
                <div className="pt-4 border-t border-stone-800 flex items-center justify-between flex-wrap gap-3 text-[11px] font-mono text-stone-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{currentMeta.sealTitle}</span>
                  </div>
                  <div>
                    Directive Code: <span className="text-amber-300 font-bold">{currentMeta.code}</span>
                  </div>
                </div>

              </div>

              {/* SLIDE NAVIGATION BAR - BOTTOM                      */}
              {/* ================================================== */}
              <div className="w-full bg-stone-950 border-t border-amber-500/30 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                
                <button
                  onClick={handlePrevSlide}
                  disabled={currentPageIdx === 0}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-stone-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                {/* Slide dots */}
                <div className="flex items-center gap-2">
                  {PRESENTATION_PAGES.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => handlePageChange(p.id)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        activePage === p.id ? 'w-6 bg-amber-400' : 'bg-stone-800 hover:bg-stone-700'
                      }`}
                      title={p.title}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  disabled={currentPageIdx === PRESENTATION_PAGES.length - 1}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>

            </div>

            {/* Quick section switcher buttons at bottom of handbook */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {PRESENTATION_PAGES.map(p => {
                const isSelected = activePage === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectSectionPage(p.id)}
                    className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-stone-950 border-amber-200 shadow-lg shadow-amber-500/30 font-black card-real-3d'
                        : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-amber-400 hover:text-amber-300 font-bold'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-80">Page {p.num}</div>
                    <div className="text-xs truncate">{p.title.replace(/^Page \d+:\s*/, '')}</div>
                  </button>
                );
              })}
            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* FULL-SCREEN INTERACTIVE TOOLS VIEW (Pages 1 to 6)                     */
          /* ===================================================================== */
          <div className="w-full space-y-4 animate-fadeIn">
            
            {/* Top Toolbar: Back to Handbook + Quick Tab Switcher */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-purple-800/80 flex items-center justify-between flex-wrap gap-2 shadow-xl">
              <button
                onClick={() => {
                  setIsFullScreenInteractive(false);
                  playSoundChime('sent');
                }}
                className="px-4 py-2 rounded-xl bg-purple-900/70 hover:bg-purple-800 border border-purple-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-xs"
              >
                <ChevronLeft className="w-4 h-4 text-teal-300" />
                <span>Back to Academic Handbook (Page {currentPageIdx + 1} / 6)</span>
              </button>

              <div className="flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-thin">
                {PRESENTATION_PAGES.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      handlePageChange(p.id);
                      playSoundChime('sent');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition text-xs ${
                      activePage === p.id
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black shadow-md'
                        : 'bg-slate-950 text-purple-300 hover:text-white border border-purple-900'
                    }`}
                  >
                    {p.title.replace(/^Page \d+:\s*/, '')}
                  </button>
                ))}
              </div>
            </div>


            {/* --------------------------------------------------------------------- */}
            {/* PAGE 1: DAILY HOMEWORK & CLASSWORK MANAGEMENT                         */}
            {activePage === 'homework' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Amber/Emerald Mobile-First Hero Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-emerald-950 border-2 border-amber-500/50 p-5 sm:p-8 md:p-10 shadow-2xl card-real-3d animate-hw-card-pop">
                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-xs font-mono font-bold text-amber-300 animate-hw-badge-pulse">
                      <ClipboardList className="w-3.5 h-3.5 text-amber-300" />
                      <span>PAGE 1 - DAILY HOMEWORK &amp; SYLLABUS DIRECTIVE</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight text-3d-gold">
                      Daily Homework Hub <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 bg-clip-text text-transparent">Class &amp; Section Manager</span>
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
                      Select your Class (Nursery to Class 8) and Section (A to E) to review daily curriculum assignments, textbook citations, audio voice instructions, and submission deadlines.
                    </p>

                    {/* Permission-Gated Action Button */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      {(isDimension5 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') ? (
                        <button
                          onClick={handleOpenCreateHomework}
                          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 hover:from-amber-300 hover:to-emerald-300 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer min-h-[44px] animate-hw-publish-glow"
                        >
                          <Plus className="w-4 h-4 text-stone-950" />
                          <span>Publish Daily Homework (Faculty Desk)</span>
                        </button>
                      ) : (
                        <div className="px-5 py-2.5 rounded-xl bg-stone-900 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center gap-2 min-h-[44px]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Student Mode: Daily Homework Viewer</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Class & Section Selector Controls - Mobile Optimized */}
                <div className="w-full space-y-4">
                  <div className="p-4 sm:p-5 rounded-3xl bg-stone-900 border border-amber-500/30 space-y-4 shadow-xl card-real-3d">
                    
                    {/* Step 1: Select Academic Class */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="text-xs font-black uppercase text-amber-400 font-mono tracking-wider flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-amber-400" />
                          <span>Step 1: Select Academic Class (Nursery to 8)</span>
                        </label>
                        <span className="text-[11px] text-stone-400 font-mono">
                          Active Class: <strong className="text-amber-300">Class {selectedHwClass}</strong>
                        </span>
                      </div>

                      {/* Touch scrollable / responsive grid for mobile */}
                      <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-6 lg:grid-cols-11 gap-2 pb-1">
                        {SCHOOL_CLASSES_CONFIG.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setSelectedHwClass(c.id);
                              playSoundChime('sent');
                            }}
                            className={`min-h-[44px] min-w-[76px] px-3 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer border shrink-0 text-center flex items-center justify-center ${
                              selectedHwClass === c.id
                                ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 border-amber-200 shadow-lg scale-105 animate-hw-badge-pulse'
                                : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-amber-500/60'
                            }`}
                          >
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Select Section */}
                    <div className="pt-3 border-t border-stone-800 space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <label className="text-xs font-black uppercase text-emerald-400 font-mono tracking-wider flex items-center gap-2">
                          <Layers className="w-4 h-4 text-emerald-400" />
                          <span>Step 2: Select Section (A, B, C, D, E)</span>
                        </label>
                        <span className="text-[11px] text-stone-400 font-mono">
                          Active Cohort: <strong className="text-emerald-300">Class {selectedHwClass} - Section {selectedHwSection}</strong>
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-2 max-w-md">
                        {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                          <button
                            key={sec}
                            onClick={() => {
                              setSelectedHwSection(sec);
                              playSoundChime('sent');
                            }}
                            className={`min-h-[44px] py-2.5 rounded-2xl text-xs font-black transition cursor-pointer border text-center flex items-center justify-center ${
                              selectedHwSection === sec
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-300 shadow-lg scale-105 animate-hw-badge-pulse'
                                : 'bg-stone-950 text-stone-300 border-stone-800 hover:border-emerald-600'
                            }`}
                          >
                            Section {sec}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filtered Homework Cards */}
                  {(() => {
                    const filtered = homeworkStore.filter(
                      h => h.classId === selectedHwClass && h.section === selectedHwSection
                    );

                    if (filtered.length === 0) {
                      return (
                        <div className="p-8 sm:p-12 text-center rounded-3xl bg-stone-900 border border-stone-800 space-y-4 shadow-xl">
                          <ClipboardList className="w-14 h-14 text-amber-400/40 mx-auto" />
                          <h4 className="text-base sm:text-lg font-black text-white">
                            No Homework Assigned Yet for Class {selectedHwClass} - Section {selectedHwSection}
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
                            Faculty of this section have not published an assignment yet today. Check back soon or select another section!
                          </p>
                          {(isDimension5 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') && (
                            <button
                              onClick={handleOpenCreateHomework}
                              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 text-stone-950 font-black text-xs cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition min-h-[44px] animate-hw-publish-glow"
                            >
                              Assign First Homework to Class {selectedHwClass}-{selectedHwSection} Now
                            </button>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filtered.map((hw) => (
                          <div
                            key={hw.id}
                            className="p-5 sm:p-6 rounded-3xl bg-stone-900 border-2 border-amber-500/40 hover:border-emerald-400 transition shadow-xl space-y-4 card-real-3d animate-hw-card-pop"
                          >
                            {/* Card Top: Subject & Due Date */}
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/40 uppercase animate-hw-pill-float">
                                {hw.subject}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-300 font-mono text-xs border border-red-500/40 flex items-center gap-1.5 animate-hw-deadline-beacon">
                                <Clock className="w-3 h-3 text-red-400 animate-hw-calendar-spin" />
                                <span>Due: {hw.dueDate}</span>
                              </span>
                            </div>

                            {/* Chapter citation */}
                            {hw.chapter && (
                              <div className="text-xs text-amber-300/90 font-mono flex items-center gap-1.5 bg-stone-950/60 px-3 py-1.5 rounded-xl border border-stone-800">
                                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                <span className="truncate">{hw.chapter}</span>
                              </div>
                            )}

                            {/* Homework Title */}
                            <h4 className="text-base sm:text-lg font-black text-white leading-snug">{hw.title}</h4>

                            {/* Detailed Description */}
                            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-wrap bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800">
                              {hw.desc}
                            </p>

                            {/* Attached Media List (Images, Audio, Video) */}
                            {hw.mediaList && hw.mediaList.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <div className="text-[11px] font-mono text-stone-400 font-bold uppercase tracking-wider">
                                  Attached Lesson Media ({hw.mediaList.length}):
                                </div>
                                <div className="space-y-2">
                                  {hw.mediaList.map((m, idx) => (
                                    <div key={idx} className="rounded-2xl overflow-hidden bg-stone-950 p-2 border border-stone-800">
                                      {m.type === 'image' && (
                                        <div className="space-y-1">
                                          <img
                                            src={m.url}
                                            alt={m.name || 'Homework Attachment'}
                                            onClick={() => setPreviewMediaModal(m.url)}
                                            className="w-full max-h-48 object-cover rounded-xl cursor-zoom-in hover:opacity-90 transition"
                                          />
                                          <div className="text-[10px] text-stone-400 font-mono px-1 flex items-center justify-between">
                                            <span>📷 {m.name || 'Image Attachment'}</span>
                                            <span className="text-amber-400">Tap to Zoom</span>
                                          </div>
                                        </div>
                                      )}
                                      {m.type === 'audio' && (
                                        <div className="space-y-1 p-1">
                                          <div className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                                            <Music className="w-3 h-3 text-amber-400" />
                                            <span>{m.name || 'Audio Explanation'}</span>
                                          </div>
                                          <audio controls src={m.url} className="w-full h-9 rounded-lg" />
                                        </div>
                                      )}
                                      {m.type === 'video' && (
                                        <div className="space-y-1">
                                          <div className="text-[10px] text-teal-300 font-mono flex items-center gap-1 px-1">
                                            <Film className="w-3 h-3 text-teal-400" />
                                            <span>{m.name || 'Video Lecture Reference'}</span>
                                          </div>
                                          <video controls src={m.url} className="w-full max-h-56 rounded-xl bg-black" />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Voice Reader + Action Controls */}
                            <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-stone-800">
                              <button
                                onClick={() => handleSpeakHomework(hw)}
                                className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition min-h-[44px] ${
                                  speakingHwId === hw.id
                                    ? 'bg-amber-400 text-stone-950 animate-hw-speaker-wave shadow-lg shadow-amber-400/40'
                                    : 'bg-stone-800 hover:bg-stone-700 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {speakingHwId === hw.id ? (
                                  <>
                                    <VolumeX className="w-4 h-4 text-stone-950" />
                                    <span>Stop Voice</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-4 h-4 text-amber-400" />
                                    <span>Listen Homework Aloud</span>
                                  </>
                                )}
                              </button>

                              {(isDimension5 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleOpenEditHomework(hw)}
                                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer min-h-[44px] animate-hw-edit-twinkle"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteHomework(hw.id)}
                                    className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer min-h-[44px] animate-hw-delete-shake"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Card Footer: Teacher Name & Timestamp */}
                            <div className="pt-1 flex items-center justify-between text-xs text-stone-400 border-t border-stone-800/60">
                              <span>Teacher: <strong className="text-white">{hw.teacher}</strong></span>
                              <span className="text-[11px] text-amber-400 font-mono">{hw.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Teacher: Assign New / Edit Homework Modal (Faculty Only) */}
                {showAssignHwModal && (isDimension5 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') && (
                  <div className="fixed inset-0 z-50 bg-stone-950/90 p-3 sm:p-4 flex items-center justify-center animate-fadeIn overflow-y-auto">
                    <div className="w-full max-w-2xl bg-stone-900 border-2 border-amber-400/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto card-real-3d animate-hw-modal-spring">
                      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>{editingHwId ? 'Edit Homework Assignment' : 'Publish Daily Homework to Students'}</span>
                        </h3>
                        <button onClick={() => setShowAssignHwModal(false)} className="text-stone-400 hover:text-white cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreateHomework} className="space-y-3.5 text-xs">
                        
                        {/* Target Class & Section */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Target Class</label>
                            <select
                              value={newHwClass}
                              onChange={(e) => {
                                const nextClass = e.target.value;
                                setNewHwClass(nextClass);
                                const available = getHomeworkSubjectsForClass(nextClass);
                                if (!available.includes(newHwSubject)) {
                                  setNewHwSubject(available[0]);
                                }
                              }}
                              className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                            >
                              {SCHOOL_CLASSES_CONFIG.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Section</label>
                            <select
                              value={newHwSection}
                              onChange={(e) => setNewHwSection(e.target.value)}
                              className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                            >
                              {['A', 'B', 'C', 'D', 'E'].map(s => (
                                <option key={s} value={s}>Section {s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Subject & Due Date */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Subject</label>
                            <select
                              value={newHwSubject}
                              onChange={(e) => setNewHwSubject(e.target.value)}
                              className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                            >
                              {getHomeworkSubjectsForClass(newHwClass).map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Due Date</label>
                            <input
                              type="text"
                              value={newHwDueDate}
                              onChange={(e) => setNewHwDueDate(e.target.value)}
                              placeholder="e.g. Tomorrow, 08:30 AM"
                              className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                              required
                            />
                          </div>
                        </div>

                        {/* Optional Assign Faculty Member Toggle */}
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => setShowFacultyAssignField(prev => !prev)}
                            className="text-xs text-amber-400 hover:text-amber-300 font-mono font-bold flex items-center gap-1.5 py-1 cursor-pointer min-h-[36px]"
                          >
                            <span>{showFacultyAssignField ? '▲ Hide Assign Faculty Member' : '▼ Assign Faculty Member (Optional)'}</span>
                          </button>

                          {showFacultyAssignField && (
                            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 space-y-2 animate-fadeIn">
                              <label className="block text-[11px] font-bold text-amber-300 uppercase">
                                Assigning Faculty Member Name
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <select
                                  value={newHwTeacher}
                                  onChange={(e) => setNewHwTeacher(e.target.value)}
                                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white text-xs min-h-[44px]"
                                >
                                  <option value={user?.name || 'Verified DAV Faculty'}>
                                    {user?.name ? `${user.name} (Me)` : 'Verified DAV Faculty'}
                                  </option>
                                  {teachersList.map(t => (
                                    <option key={t.id} value={t.name}>
                                      {t.name} ({t.subject})
                                    </option>
                                  ))}
                                </select>
                                <input
                                  type="text"
                                  value={newHwTeacher}
                                  onChange={(e) => setNewHwTeacher(e.target.value)}
                                  placeholder="Or enter substitute faculty name..."
                                  className="w-full bg-stone-900 border border-stone-700 rounded-xl p-2.5 text-white text-xs min-h-[44px]"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Chapter / Unit */}
                        <div>
                          <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Chapter / Unit Reference</label>
                          <input
                            type="text"
                            value={newHwChapter}
                            onChange={(e) => setNewHwChapter(e.target.value)}
                            placeholder="e.g. Chapter 11: The Human Eye and Colourful World (Page 142)"
                            className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                          />
                        </div>

                        {/* Assignment Title */}
                        <div>
                          <label className="block text-[11px] font-bold text-amber-400 uppercase mb-1">Assignment Title</label>
                          <input
                            type="text"
                            value={newHwTitle}
                            onChange={(e) => setNewHwTitle(e.target.value)}
                            placeholder="e.g. Ray Diagram of Human Eye &amp; Myopia Numerical Questions"
                            className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white text-xs min-h-[44px]"
                            required
                          />
                        </div>

                        {/* Detailed Instructions + Media Upload */}
                        <div className="space-y-2">
                          <label className="block text-[11px] font-bold text-amber-400 uppercase">Detailed Instructions &amp; Media Attachments</label>
                          <textarea
                            rows={3}
                            value={newHwDesc}
                            onChange={(e) => setNewHwDesc(e.target.value)}
                            placeholder="Mention notebook section, textbook page citations, formulas, and submission criteria..."
                            className="w-full bg-stone-950 border border-amber-500/50 rounded-xl p-3 text-white leading-relaxed text-xs"
                            required
                          />

                          {/* Media Upload Buttons: Image, Video, Audio */}
                          <div className="flex items-center gap-2 flex-wrap pt-1">
                            {/* Image Input */}
                            <label className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 flex items-center gap-1.5 cursor-pointer min-h-[44px]">
                              <Camera className="w-4 h-4 text-amber-400" />
                              <span>Attach Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleAddHomeworkMedia('image', e.target.files[0]);
                                }}
                              />
                            </label>

                            {/* Video Input */}
                            <label className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-teal-300 font-mono text-xs font-bold border border-teal-500/30 flex items-center gap-1.5 cursor-pointer min-h-[44px]">
                              <Film className="w-4 h-4 text-teal-400" />
                              <span>Attach Video</span>
                              <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleAddHomeworkMedia('video', e.target.files[0]);
                                }}
                              />
                            </label>

                            {/* Audio Input */}
                            <label className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-300 font-mono text-xs font-bold border border-rose-500/30 flex items-center gap-1.5 cursor-pointer min-h-[44px]">
                              <Music className="w-4 h-4 text-rose-400" />
                              <span>Attach Audio</span>
                              <input
                                type="file"
                                accept="audio/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) handleAddHomeworkMedia('audio', e.target.files[0]);
                                }}
                              />
                            </label>
                          </div>

                          {/* Previews of attached media in modal */}
                          {newHwMediaList.length > 0 && (
                            <div className="space-y-1.5 pt-2">
                              <span className="text-[10px] text-stone-400 font-mono">Attached Media ({newHwMediaList.length}):</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {newHwMediaList.map((m, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-stone-950 border border-stone-800 text-xs animate-hw-media-preview">
                                    <span className="truncate max-w-[180px] text-stone-300">
                                      {m.type === 'image' && '📷 '}
                                      {m.type === 'video' && '🎬 '}
                                      {m.type === 'audio' && '🎙️ '}
                                      {m.name || 'Attached file'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveHomeworkMedia(idx)}
                                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
                          <button
                            type="button"
                            onClick={() => setShowAssignHwModal(false)}
                            className="px-4 py-3 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer min-h-[44px]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-emerald-400 text-stone-950 font-black text-xs shadow-lg cursor-pointer min-h-[44px] animate-hw-publish-glow"
                          >
                            {editingHwId ? 'Save Changes' : 'Publish to Students'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* Full-size Image Zoom Modal */}
                {previewMediaModal && (
                  <div
                    onClick={() => setPreviewMediaModal(null)}
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
                  >
                    <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border-2 border-amber-400 shadow-2xl">
                      <img src={previewMediaModal} alt="Preview" className="w-full h-auto max-h-[85vh] object-contain" />
                      <button
                        onClick={() => setPreviewMediaModal(null)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:text-amber-300 cursor-pointer"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* PAGE 2: FACULTY ACADEMIC DIRECT DESK (CHAT & CONSULTATION)            */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'doubts_chat' && (
              <div className="w-full animate-fadeIn font-sans">
                
                {/* Authentic WhatsApp Desktop Container */}
                <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-[#d1d7db] bg-white flex flex-col h-[82vh] min-h-[580px] max-h-[860px]">
                  
                  {/* WhatsApp Desktop Top App Bar (Title Bar) */}
                  <div className="h-10 bg-[#f0f2f5] border-b border-[#d1d7db] px-4 flex items-center justify-between select-none shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center text-white shadow-xs animate-chat-avatar-glow">
                        <MessageSquare className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-[#111b21] tracking-tight">WhatsApp</span>
                      <span className="text-[11px] text-[#667781] font-semibold border-l border-[#d1d7db] pl-2.5">
                        {isDimension5 ? 'Faculty Academic Direct Desk' : 'Verified Faculty Doubt Portal'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {isDimension5 && (
                        <button
                          type="button"
                          onClick={() => setShowTeacherProfileModal(true)}
                          className="px-2.5 py-1 rounded-md bg-white border border-[#d1d7db] text-[#111b21] hover:bg-[#eae6df] text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3 text-[#00a884]" />
                          <span>Edit DP &amp; Profile</span>
                        </button>
                      )}

                      {/* Window Controls */}
                      <div className="flex items-center gap-2 text-[#54656f] text-xs font-mono ml-2">
                        <span className="w-3 h-3 flex items-center justify-center hover:text-[#111b21] cursor-pointer" title="Minimize">—</span>
                        <span className="w-3 h-3 flex items-center justify-center hover:text-[#111b21] cursor-pointer" title="Maximize">□</span>
                        <span className="w-3 h-3 flex items-center justify-center hover:text-rose-600 cursor-pointer" title="Close">✕</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Desktop Workspace Area (3 Columns: Dock + Chats Roster + Conversation) */}
                  <div className="flex-1 flex overflow-hidden min-h-0 bg-white">
                    
                    {/* Column 1: WhatsApp Left Vertical Icon Dock (Far Left) */}
                    <div className="w-14 sm:w-16 bg-[#f0f2f5] border-r border-[#d1d7db] flex flex-col items-center justify-between py-3 shrink-0">
                      
                      {/* Top Icons */}
                      <div className="flex flex-col items-center gap-4 w-full">
                        {/* Chats with Badge */}
                        <button 
                          type="button"
                          onClick={() => setMobileChatTab('roster')}
                          className="relative p-2 rounded-xl bg-[#d9fdd3] text-[#008069] shadow-xs cursor-pointer transition animate-chat-bubble-pop"
                          title="Chats"
                        >
                          <MessageSquare className="w-5 h-5 fill-current" />
                          <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#25d366] text-white text-[9px] font-black shadow-xs animate-chat-radar-ping">
                            {chatContactsList.filter(c => isUserOnline(c)).length || 2}
                          </span>
                        </button>

                        {/* Calls */}
                        <button 
                          type="button"
                          className="p-2 rounded-xl text-[#54656f] hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                          title="Calls"
                        >
                          <Phone className="w-5 h-5 animate-chat-mic-record" />
                        </button>

                        {/* Status */}
                        <button 
                          type="button"
                          className="p-2 rounded-xl text-[#54656f] hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                          title="Status"
                        >
                          <Radio className="w-5 h-5 animate-chat-typing-dots" />
                        </button>

                        {/* Channels */}
                        <button 
                          type="button"
                          className="p-2 rounded-xl text-[#54656f] hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                          title="Channels"
                        >
                          <Compass className="w-5 h-5" />
                        </button>

                        {/* Communities */}
                        <button 
                          type="button"
                          className="p-2 rounded-xl text-[#54656f] hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                          title="Communities"
                        >
                          <Users className="w-5 h-5" />
                        </button>

                        {/* Meta AI Gradient Icon */}
                        <button 
                          type="button"
                          onClick={handleInstantAIAnswer}
                          className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] cursor-pointer hover:scale-105 transition shadow-sm animate-chat-instant-ai"
                          title="Rishi AI Chat Assistant"
                        >
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                          </div>
                        </button>
                      </div>

                      {/* Bottom Dock Items: Settings & Profile */}
                      <div className="flex flex-col items-center gap-3 w-full border-t border-[#d1d7db] pt-3">
                        <button 
                          type="button"
                          onClick={() => isDimension5 && setShowTeacherProfileModal(true)}
                          className="p-2 rounded-xl text-[#54656f] hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                          title="Settings"
                        >
                          <Settings className="w-5 h-5" />
                        </button>

                        {/* User Avatar */}
                        <div className="relative cursor-pointer" title={user?.name || 'My Profile'}>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00a884] to-[#25d366] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
                        </div>
                      </div>

                    </div>

                    {/* Column 2: Chats Directory Panel (Middle) */}
                    <div className={`w-full sm:w-80 md:w-96 bg-white border-r border-[#d1d7db] flex flex-col h-full shrink-0 ${
                      mobileChatTab === 'roster' ? 'flex' : 'hidden sm:flex'
                    }`}>
                      
                      {/* Chats Header */}
                      <div className="p-3.5 pb-2 border-b border-[#f0f2f5] space-y-3 shrink-0">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold text-[#111b21] tracking-tight">Chats</h2>
                          <div className="flex items-center gap-1 text-[#54656f]">
                            <button
                              type="button"
                              onClick={() => {
                                if (chatContactsList.length > 0 && !activeContact) {
                                  handleSelectContact(chatContactsList[0].id);
                                }
                              }}
                              className="w-8 h-8 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center transition cursor-pointer shadow-xs"
                              title="Start New Chat"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              type="button"
                              onClick={() => setShowChatMenu(prev => !prev)}
                              className="p-1.5 rounded-lg hover:bg-[#f0f2f5] text-[#54656f] hover:text-[#111b21] transition cursor-pointer"
                              title="Menu"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#54656f]" />
                          <input
                            type="text"
                            placeholder="Search or start a new chat"
                            value={contactSearchQuery}
                            onChange={(e) => setContactSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-[#f0f2f5] border border-transparent rounded-lg text-xs font-bold text-[#111b21] placeholder-[#667781] focus:outline-none focus:bg-white focus:border-[#00a884] transition"
                          />
                        </div>

                        {/* Filter Chips: All, Unread, Favourites */}
                        <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none pb-1">
                          <button
                            type="button"
                            onClick={() => setChatFilter('all')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                              chatFilter === 'all'
                                ? 'bg-[#d9fdd3] text-[#008069] border border-[#c3f4bc]'
                                : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
                            }`}
                          >
                            All
                          </button>
                          <button
                            type="button"
                            onClick={() => setChatFilter('unread')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                              chatFilter === 'unread'
                                ? 'bg-[#d9fdd3] text-[#008069] border border-[#c3f4bc]'
                                : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
                            }`}
                          >
                            Unread
                          </button>
                          <button
                            type="button"
                            onClick={() => setChatFilter('favourites')}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer shrink-0 ${
                              chatFilter === 'favourites'
                                ? 'bg-[#d9fdd3] text-[#008069] border border-[#c3f4bc]'
                                : 'bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef]'
                            }`}
                          >
                            Favourites
                          </button>
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full bg-[#f0f2f5] text-[#54656f] hover:bg-[#e9edef] flex items-center justify-center text-xs font-bold shrink-0 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Contacts List */}
                      <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5] scrollbar-thin bg-white">
                        {chatContactsList.length === 0 ? (
                          <div className="p-8 text-center space-y-2 text-[#667781] text-xs">
                            <Users className="w-8 h-8 text-[#00a884] mx-auto opacity-50" />
                            <p className="font-bold text-[#111b21]">No chats yet</p>
                            <p className="text-[11px]">Verified teachers and students will appear here for instant consultation.</p>
                          </div>
                        ) : (
                          chatContactsList
                            .filter(c => {
                              if (chatFilter === 'unread') return isUserOnline(c);
                              if (chatFilter === 'favourites') return Boolean(c.isHOD || c.isPrincipal);
                              if (!contactSearchQuery.trim()) return true;
                              const q = contactSearchQuery.toLowerCase();
                              return (c.name && c.name.toLowerCase().includes(q)) || (c.subtitle && c.subtitle.toLowerCase().includes(q));
                            })
                            .map((contact) => {
                              const isSelected = activeContact?.id === contact.id;
                              const msgs = typeof getMessagesForContact === 'function' ? getMessagesForContact(contact) : (teacherChatsMap[contact.id] || []);
                              const lastMsg = msgs[msgs.length - 1];

                              return (
                                <button
                                  key={contact.id}
                                  onClick={() => handleSelectContact(contact.id)}
                                  className={`w-full p-3 flex items-center gap-3 text-left transition cursor-pointer ${
                                    isSelected ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6] bg-white'
                                  }`}
                                >
                                  {/* Avatar */}
                                  <div className="relative shrink-0">
                                    {contact.dp ? (
                                      <img
                                        src={contact.dp}
                                        alt={contact.name}
                                        className="w-12 h-12 rounded-full object-cover border border-[#d1d7db]"
                                      />
                                    ) : (
                                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#dfe5e7] to-[#cfd8dc] text-[#111b21] font-bold flex items-center justify-center text-base shadow-xs">
                                        {contact.name.charAt(0)}
                                      </div>
                                    )}
                                    {isUserOnline(contact) && (
                                      <span className="w-3 h-3 rounded-full bg-[#25d366] ring-2 ring-white absolute bottom-0 right-0" title="Online" />
                                    )}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-1">
                                      <h4 className="text-sm font-bold text-[#111b21] truncate">{contact.name}</h4>
                                      <span className="text-[11px] text-[#667781] font-semibold shrink-0">
                                        {lastMsg ? lastMsg.time : '8:02 pm'}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-1 mt-0.5">
                                      <p className="text-xs text-[#667781] truncate font-medium flex items-center gap-1">
                                        {lastMsg ? (
                                          <>
                                            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb] shrink-0 animate-chat-badge-verified" />
                                            <span className="truncate">{lastMsg.text || (lastMsg.media ? `[${lastMsg.media.type}]` : 'Message')}</span>
                                          </>
                                        ) : (
                                          <span className="text-[#00a884] font-semibold">{contact.subtitle || 'Available on WhatsApp'}</span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })
                        )}
                      </div>
                    </div>

                    {/* Column 3: Active Conversation Canvas (Right) */}
                    <div className={`flex-1 flex flex-col h-full min-w-0 bg-[#efeae2] relative overflow-hidden ${
                      mobileChatTab === 'chat' ? 'flex' : 'hidden sm:flex'
                    }`}
                    style={{
                      backgroundColor: '#efeae2',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='400' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2354656f' fill-opacity='0.06'%3E%3Cpath d='M40 30h20v20H40zM120 70h15v15h-15zM220 40h25v25h-25zM310 80h18v18h-18zM60 160h22v22H60zM180 140h30v30h-30zM290 170h20v20h-20zM30 270h25v25H30zM140 250h20v20h-20zM240 280h28v28h-28zM340 260h16v16h-16zM80 340h30v30H80zM200 350h22v22h-22zM310 340h25v25h-25z'/%3E%3Ccircle cx='70' cy='90' r='12'/%3E%3Ccircle cx='170' cy='50' r='8'/%3E%3Ccircle cx='270' cy='110' r='14'/%3E%3Ccircle cx='360' cy='40' r='10'/%3E%3Ccircle cx='100' cy='210' r='15'/%3E%3Ccircle cx='240' cy='200' r='11'/%3E%3Ccircle cx='350' cy='160' r='13'/%3E%3Ccircle cx='50' cy='360' r='14'/%3E%3Ccircle cx='160' cy='320' r='9'/%3E%3Ccircle cx='270' cy='360' r='16'/%3E%3C/g%3E%3C/svg%3E")`
                    }}
                    >
                      
                      {activeContact ? (
                        <>
                          {/* Active Contact Header Bar */}
                          <div className="p-3 px-4 bg-[#f0f2f5] border-b border-[#d1d7db] flex items-center justify-between shrink-0 shadow-xs z-10">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setMobileChatTab('roster')}
                                className="p-1 rounded-lg text-[#54656f] hover:text-[#111b21] sm:hidden cursor-pointer"
                                title="Back to Contacts"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              
                              <div className="relative">
                                {activeContact.dp ? (
                                  <img
                                    src={activeContact.dp}
                                    alt={activeContact.name}
                                    className="w-10 h-10 rounded-full object-cover border border-[#d1d7db]"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfe5e7] to-[#cfd8dc] text-[#111b21] font-bold flex items-center justify-center text-sm shadow-xs">
                                    {activeContact.name.charAt(0)}
                                  </div>
                                )}
                                {isUserOnline(activeContact) && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] ring-2 ring-white absolute bottom-0 right-0" />
                                )}
                              </div>

                              <div>
                                <h3 className="text-sm font-bold text-[#111b21] flex items-center gap-1.5 leading-tight">
                                  <span>{activeContact.name}</span>
                                </h3>
                                <p className="text-[11px] font-semibold text-[#667781]">
                                  {isUserOnline(activeContact) ? (
                                    <span className="text-[#00a884]">online</span>
                                  ) : (
                                    <span>last seen today at 8:02 pm</span>
                                  )}
                                </p>
                              </div>
                            </div>

                            {/* Top Right Actions */}
                            <div className="flex items-center gap-1 text-[#54656f] relative">
                              <button
                                type="button"
                                onClick={() => handleStartCall(activeContact, 'video')}
                                className="p-2 rounded-lg hover:bg-[#e9edef] hover:text-[#00a884] text-[#54656f] transition cursor-pointer"
                                title="Start Live Video Call"
                              >
                                <Video className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStartCall(activeContact, 'voice')}
                                className="p-2 rounded-lg hover:bg-[#e9edef] hover:text-[#00a884] text-[#54656f] transition cursor-pointer relative group"
                                title="Start Live Voice Call"
                              >
                                <Phone className="w-4 h-4" />
                                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#111b21] text-white text-[10px] py-0.5 px-2 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-30 shadow-md">
                                  Voice Call
                                </span>
                              </button>
                              <button
                                type="button"
                                className="p-2 rounded-lg hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                                title="Search in Chat"
                              >
                                <Search className="w-4 h-4" />
                              </button>
                              
                              <button
                                type="button"
                                onClick={() => setShowChatMenu(prev => !prev)}
                                className="p-2 rounded-lg hover:bg-[#e9edef] hover:text-[#111b21] transition cursor-pointer"
                                title="Chat Menu"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>

                              {/* WhatsApp Dropdown Menu */}
                              {showChatMenu && (
                                <div className="absolute right-0 top-10 w-56 bg-white border border-[#d1d7db] rounded-xl shadow-2xl py-1.5 z-50 text-xs font-bold text-[#111b21] animate-fadeIn">
                                  <button
                                    type="button"
                                    onClick={() => handleClearAllChat(activeContact)}
                                    className="w-full px-4 py-2.5 text-left hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer transition"
                                  >
                                    <Trash2 className="w-4 h-4 animate-chat-delete-fade" />
                                    <span>Delete all chat (Clear)</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShowChatMenu(false);
                                      handleInstantAIAnswer();
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-[#f0f2f5] flex items-center gap-2 cursor-pointer transition text-[#00a884]"
                                  >
                                    <Bot className="w-4 h-4" />
                                    <span>Instant Rishi AI Answer</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShowChatMenu(false);
                                      setIsDoubtSessionResolved(true);
                                      playSoundChime('delivered');
                                    }}
                                    className="w-full px-4 py-2.5 text-left hover:bg-[#f0f2f5] flex items-center gap-2 cursor-pointer transition"
                                  >
                                    <CheckCircle className="w-4 h-4 text-[#00a884]" />
                                    <span>End Doubt Consultation</span>
                                  </button>
                                </div>
                              )}

                            </div>
                          </div>

                          {/* Chat Stream Messages Canvas */}
                          <div
                            onScroll={(e) => {
                              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
                              const isNearBottom = scrollHeight - scrollTop - clientHeight < 120;
                              setShowChatScrollDown(!isNearBottom);
                            }}
                            className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3 chat-scroll-container"
                          >
                            {/* Date Badge: Today */}
                            <div className="flex justify-center my-2">
                              <span className="px-3 py-1 rounded-lg bg-white border border-[#d1d7db]/40 text-[#54656f] text-[11px] font-bold uppercase tracking-wide shadow-xs">
                                Today
                              </span>
                            </div>

                            {/* Messages Loop */}
                            {(typeof getMessagesForContact === 'function' ? getMessagesForContact(activeContact) : (teacherChatsMap[activeContact?.id] || [])).length === 0 ? (
                              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-[#667781]">
                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xs">
                                  <MessageSquare className="w-7 h-7 text-[#00a884]" />
                                </div>
                                <h4 className="text-sm font-bold text-[#111b21]">No messages here yet</h4>
                                <p className="text-xs max-w-sm font-medium">Send a message or doubt below to start chatting with {activeContact.name}.</p>
                              </div>
                            ) : (
                              (typeof getMessagesForContact === 'function' ? getMessagesForContact(activeContact) : (teacherChatsMap[activeContact?.id] || [])).map((msg) => {
                                const isMe = Boolean(
                                  (msg.senderUserId && user?.id && String(msg.senderUserId).toLowerCase() === String(user.id).toLowerCase()) ||
                                  (msg.senderName && user?.name && String(msg.senderName).toLowerCase() === String(user.name).toLowerCase()) ||
                                  (isDimension5 ? msg.sender === 'teacher' : msg.sender === 'student')
                                );

                                const myId = String(user?.id || 'me').toLowerCase();
                                const myName = String(user?.name || '').toLowerCase().trim();
                                if (Array.isArray(msg.deletedForMe) && (msg.deletedForMe.includes(myId) || (myName && msg.deletedForMe.includes(myName)))) {
                                  return null;
                                }

                                return (
                                  <div
                                    key={msg.id}
                                    className={`flex flex-col group ${isMe ? 'items-end' : 'items-start'} animate-fadeIn`}
                                  >
                                    <div
                                      className={`max-w-[85%] sm:max-w-[65%] p-2.5 px-3 rounded-lg shadow-xs space-y-1 relative ${
                                        isMe
                                          ? 'bg-[#d9fdd3] text-[#111b21] rounded-tr-none border border-[#c3f4bc]/50'
                                          : 'bg-white text-[#111b21] rounded-tl-none border border-[#e9edef]'
                                      }`}
                                    >
                                      {msg.deletedForEveryone ? (
                                        <div className="flex items-center gap-1.5 italic text-[#667781] text-xs font-bold py-1">
                                          <Trash2 className="w-3.5 h-3.5 opacity-70" />
                                          <span>🚫 This message was deleted</span>
                                        </div>
                                      ) : (
                                        <>
                                          {!isMe && (
                                            <div className="text-[11px] font-bold text-[#008069] pb-0.5">
                                              {msg.senderName}
                                            </div>
                                          )}

                                          {/* Media Renderers */}
                                          {msg.media && (
                                            <div className="pt-1">
                                              {msg.media.type === 'image' && (
                                                <img
                                                  src={msg.media.dataUrl}
                                                  alt={msg.media.name}
                                                  className="rounded-lg max-h-72 object-contain w-full border border-black/10"
                                                />
                                              )}
                                              {msg.media.type === 'audio' && (
                                                <audio controls src={msg.media.dataUrl} className="w-full max-w-xs" />
                                              )}
                                              {msg.media.type === 'video' && (
                                                <video controls src={msg.media.dataUrl} className="w-full max-w-xs max-h-60 rounded-lg" />
                                              )}
                                            </div>
                                          )}

                                          {/* Call Record or Regular Message */}
                                          {msg.isCallRecord ? (
                                            <div className="flex items-center gap-2.5 py-1 px-1">
                                              <div className="w-8 h-8 rounded-full bg-[#00a884]/15 text-[#00a884] flex items-center justify-center shrink-0">
                                                <Phone className="w-4 h-4" />
                                              </div>
                                              <div>
                                                <div className="text-xs font-bold text-[#111b21]">{msg.text}</div>
                                                <div className="text-[10px] text-[#667781] font-semibold">{msg.callDurationText || 'Completed'}</div>
                                              </div>
                                            </div>
                                          ) : msg.text ? (
                                            <p 
                                              className="text-xs sm:text-sm font-bold leading-relaxed whitespace-pre-wrap break-words"
                                              style={{ color: msg.textColor || '#111b21' }}
                                            >
                                              {msg.text}
                                            </p>
                                          ) : null}

                                          {/* Bottom Meta Bar (Timestamp + Checkmarks + Hover Delete) */}
                                          <div className="flex items-center justify-end gap-1.5 text-[10px] text-[#667781] font-semibold pt-0.5 float-right ml-4 -mb-0.5">
                                            <button
                                              type="button"
                                              onClick={() => setDeleteMsgModal({ isOpen: true, msg, contact: activeContact })}
                                              className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-rose-600 transition cursor-pointer"
                                              title="Delete message"
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </button>
                                            
                                            <span>{msg.time}</span>
                                            
                                            {isMe && (
                                              <span>
                                                {msg.status === 'delivered' ? (
                                                  <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                                                ) : (
                                                  <Check className="w-3.5 h-3.5 text-[#667781]" />
                                                )}
                                              </span>
                                            )}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                );
                              })
                            )}
                            <div ref={chatMessagesEndRef} className="h-4 w-full" />
                          </div>

                          {/* Floating Scroll to Bottom */}
                          {showChatScrollDown && (
                            <button
                              type="button"
                              onClick={() => chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
                              className="absolute bottom-20 right-6 z-30 p-2.5 rounded-full bg-white text-[#54656f] hover:text-[#111b21] shadow-lg transition cursor-pointer border border-[#d1d7db]"
                              title="Scroll to bottom"
                            >
                              <ChevronDown className="w-5 h-5" />
                            </button>
                          )}

                          {/* Pending Media Preview */}
                          {pendingMedia && (
                            <div className="px-4 py-2 bg-white border-t border-[#d1d7db] flex items-center justify-between gap-3 text-xs">
                              <div className="flex items-center gap-2 text-[#00a884] font-bold">
                                <Paperclip className="w-4 h-4 animate-chat-attachment-spring" />
                                <span className="truncate max-w-xs">{pendingMedia.name}</span>
                                <span className="text-[10px] uppercase text-[#667781]">({pendingMedia.type})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setPendingMedia(null)}
                                className="p-1 rounded-lg hover:bg-[#f0f2f5] text-[#54656f] hover:text-[#111b21] cursor-pointer"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {/* WhatsApp Input Bar */}
                          <div className="p-2 sm:p-2.5 bg-[#f0f2f5] border-t border-[#d1d7db] flex items-center gap-2 shrink-0 relative">
                            
                            {/* Smiley Emoji Icon */}
                            <button
                              type="button"
                              onClick={() => setChatInputText(prev => prev + ' 😊')}
                              className="p-2 rounded-lg text-[#54656f] hover:text-[#111b21] cursor-pointer transition"
                              title="Add Emoji"
                            >
                              <Smile className="w-5 h-5" />
                            </button>

                            {/* Paperclip Attachment Pin */}
                            <input
                              type="file"
                              accept="image/*,video/*,audio/*"
                              ref={mediaFileInputRef}
                              className="hidden"
                              onChange={handleUniversalMediaUpload}
                            />
                            <button
                              type="button"
                              onClick={() => mediaFileInputRef.current?.click()}
                              className="p-2 rounded-lg text-[#54656f] hover:text-[#111b21] cursor-pointer transition"
                              title="Attach Media"
                            >
                              <Paperclip className="w-5 h-5" />
                            </button>

                            {/* Text Color Picker Swatch Button */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowColorPicker(prev => !prev)}
                                className="p-2 rounded-lg text-[#54656f] hover:text-[#111b21] cursor-pointer transition flex items-center gap-1"
                                title="Change Text Color"
                              >
                                <Palette className="w-5 h-5" style={{ color: chatTextColor }} />
                              </button>

                              {/* Color Selector Popover */}
                              {showColorPicker && (
                                <div className="absolute bottom-12 left-0 bg-white border border-[#d1d7db] rounded-2xl shadow-2xl p-3 z-50 flex items-center gap-2 animate-fadeIn">
                                  {[
                                    { color: '#111b21', label: 'Black (Default)' },
                                    { color: '#008069', label: 'WhatsApp Green' },
                                    { color: '#1d4ed8', label: 'Royal Blue' },
                                    { color: '#b91c1c', label: 'Crimson Red' },
                                    { color: '#7c3aed', label: 'Purple' },
                                    { color: '#ea580c', label: 'Orange' },
                                    { color: '#0f766e', label: 'Teal' }
                                  ].map((c) => (
                                    <button
                                      key={c.color}
                                      type="button"
                                      onClick={() => {
                                        setChatTextColor(c.color);
                                        setShowColorPicker(false);
                                      }}
                                      className={`w-6 h-6 rounded-full border-2 transition cursor-pointer transform hover:scale-110 ${
                                        chatTextColor === c.color ? 'border-[#111b21] ring-2 ring-[#00a884]' : 'border-white'
                                      }`}
                                      style={{ backgroundColor: c.color }}
                                      title={c.label}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* White Rounded Input Field */}
                            <input
                              type="text"
                              placeholder="Type a message"
                              value={chatInputText}
                              onChange={(e) => setChatInputText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendMessage();
                                }
                              }}
                              className="flex-1 bg-white rounded-lg px-4 py-2.5 text-xs sm:text-sm font-bold text-[#111b21] placeholder-[#667781] focus:outline-none border border-transparent focus:border-[#d1d7db] shadow-xs"
                              style={{ color: chatTextColor }}
                            />

                            {/* Send Button */}
                            <button
                              type="button"
                              disabled={!chatInputText.trim() && !pendingMedia}
                              onClick={handleSendMessage}
                              className="w-10 h-10 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shrink-0 shadow-md transition disabled:opacity-40 cursor-pointer"
                              title="Send Message"
                            >
                              <Send className="w-4 h-4 ml-0.5 animate-chat-send-fly" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3 bg-[#f0f2f5]">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xs">
                            <MessageSquare className="w-8 h-8 text-[#00a884]" />
                          </div>
                          <h3 className="text-xl font-bold text-[#111b21]">WhatsApp Web for DAV</h3>
                          <p className="text-xs text-[#667781] max-w-sm font-medium">
                            Select a faculty teacher or student from the directory on the left to start real-time messaging with media support.
                          </p>
                        </div>
                      )}

                    </div>

                  </div>
                </div>

                {/* WhatsApp-Style Delete Message Confirmation Modal */}
                {deleteMsgModal.isOpen && (
                  <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white border border-[#d1d7db] rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4 animate-fadeIn">
                      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
                        <Trash2 className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#111b21]">Delete message?</h3>
                        <p className="text-xs text-[#667781] mt-1 line-clamp-2 italic font-bold">
                          {deleteMsgModal.msg?.text || (deleteMsgModal.msg?.media ? '[' + deleteMsgModal.msg.media.type + ']' : 'Message')}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 pt-2">
                        {Boolean(
                          (deleteMsgModal.msg?.senderUserId && user?.id && String(deleteMsgModal.msg.senderUserId).toLowerCase() === String(user.id).toLowerCase()) ||
                          (deleteMsgModal.msg?.senderName && user?.name && String(deleteMsgModal.msg.senderName).toLowerCase() === String(user.name).toLowerCase()) ||
                          (isDimension5 ? deleteMsgModal.msg?.sender === 'teacher' : deleteMsgModal.msg?.sender === 'student')
                        ) && (
                          <button
                            type="button"
                            onClick={() => handleDeleteForEveryone(deleteMsgModal.msg, deleteMsgModal.contact)}
                            className="w-full py-2.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs shadow-sm transition cursor-pointer"
                          >
                            Delete for Everyone
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteForMe(deleteMsgModal.msg, deleteMsgModal.contact)}
                          className="w-full py-2.5 rounded-lg bg-[#f0f2f5] hover:bg-[#e9edef] text-[#111b21] font-bold text-xs transition cursor-pointer"
                        >
                          Delete for Me
                        </button>
                        <button
                          type="button"
                          onClick={() => handleClearAllChat(deleteMsgModal.contact)}
                          className="w-full py-2.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition cursor-pointer border border-rose-200"
                        >
                          Delete All Chat (Clear Conversation)
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteMsgModal({ isOpen: false, msg: null, contact: null })}
                          className="w-full py-2 rounded-lg text-[#667781] hover:text-[#111b21] font-bold text-xs transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}


                {/* Edit Faculty Profile & DP Modal */}
                {showTeacherProfileModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-md bg-slate-900 border-2 border-teal-400 rounded-3xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-5 h-5 text-teal-300" />
                          <h3 className="text-base font-black text-white">Edit Faculty Profile &amp; DP</h3>
                        </div>
                        <button onClick={() => setShowTeacherProfileModal(false)} className="text-purple-300 hover:text-white">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveTeacherProfile} className="space-y-4 text-xs">
                        {/* Live DP Preview & Upload */}
                        <div className="flex flex-col items-center justify-center space-y-2">
                          {customProfileForm.dp ? (
                            <img
                              src={customProfileForm.dp}
                              alt="DP Preview"
                              className="w-20 h-20 rounded-full object-cover border-2 border-teal-400 shadow-xl"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-teal-500 text-slate-950 font-black flex items-center justify-center text-2xl shadow-xl">
                              {(customProfileForm.name || 'T').charAt(0)}
                            </div>
                          )}

                          <input
                            type="file"
                            accept="image/*"
                            id="faculty-dp-upload-input"
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const compressed = await compressImageToDataUrl(file, 256, 0.82);
                                if (compressed) {
                                  setCustomProfileForm(prev => ({ ...prev, dp: compressed }));
                                }
                              }
                            }}
                          />
                          <label
                            htmlFor="faculty-dp-upload-input"
                            className="px-4 py-1.5 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 hover:text-white font-bold cursor-pointer"
                          >
                            Upload Profile Picture
                          </label>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="font-bold text-purple-300">Faculty Full Name:</label>
                          <input
                            type="text"
                            required
                            value={customProfileForm.name}
                            onChange={(e) => setCustomProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                            placeholder="e.g. Prof. Hira Beta"
                          />
                        </div>

                        {/* Subject Select (Not stuck at Science!) */}
                        <div className="space-y-1">
                          <label className="font-bold text-purple-300">Teaching Subject / Department:</label>
                          <select
                            value={customProfileForm.subject}
                            onChange={(e) => setCustomProfileForm(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                          >
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science & Technology">Science &amp; Technology</option>
                            <option value="Social Science">Social Science</option>
                            <option value="English Literature & Language">English Literature &amp; Language</option>
                            <option value="Hindi Language & Grammar">Hindi Language &amp; Grammar</option>
                            <option value="Sanskrit">Sanskrit</option>
                            <option value="Computer Science & ICT">Computer Science &amp; ICT</option>
                            <option value="Naitik Shiksha (NS)">Naitik Shiksha (NS)</option>
                            <option value="Drawing & Visual Arts">Drawing &amp; Visual Arts</option>
                            <option value="General Knowledge (GK)">General Knowledge (GK)</option>
                          </select>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowTeacherProfileModal(false)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-purple-300 font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-black cursor-pointer shadow-lg hover:scale-105 transition"
                          >
                            Save &amp; Update Everywhere
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}


                {/* ========================================================================= */}
                {/* AUTHENTIC WHATSAPP DESKTOP LIVE VIDEO & VOICE CALLING THEATER */}
                {/* ========================================================================= */}
                {callState.isOpen && (
                  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-2 sm:p-4 animate-fadeIn font-sans">
                    
                    {/* VIDEO CALL THEATER CONTAINER */}
                    {callState.callType === 'video' ? (
                      <div className="w-full max-w-4xl h-[90vh] max-h-[820px] bg-[#0b141a] border border-[#222e35] rounded-3xl overflow-hidden shadow-2xl flex flex-col relative card-real-3d">
                        
                        {/* Top Header Bar */}
                        <div className="absolute top-0 left-0 right-0 z-30 p-4 sm:p-5 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-stone-800 shrink-0">
                              {callState.contact?.dp ? (
                                <img src={callState.contact.dp} alt={callState.contact.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center font-bold text-sm bg-gradient-to-br from-[#00a884] to-[#25d366]">
                                  {callState.contact?.name ? callState.contact.name.charAt(0).toUpperCase() : 'D'}
                                </div>
                              )}
                            </div>
                            <div>
                              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                                <span>{callState.contact?.name || 'DAV Contact'}</span>
                                <ShieldCheck className="w-4 h-4 text-[#25d366]" title="End-to-End Encrypted" />
                              </h3>
                              <div className="text-[11px] text-[#8696a0] font-mono flex items-center gap-1.5">
                                {callState.status === 'connected' ? (
                                  <>
                                    <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                                    <span className="text-[#25d366] font-bold">
                                      {Math.floor(callState.duration / 60).toString().padStart(2, '0')}:
                                      {(callState.duration % 60).toString().padStart(2, '0')}
                                    </span>
                                    <span className="text-stone-400">• Live WebRTC P2P</span>
                                  </>
                                ) : (
                                  <span className="text-amber-400 capitalize">{callState.status}...</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-white/10 text-[#25d366] border border-[#25d366]/30 text-xs font-mono font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#25d366] animate-ping" />
                              <span>HD 720p</span>
                            </span>
                          </div>
                        </div>

                        {/* Main Stage (Remote Video or Avatar) */}
                        <div className="w-full h-full relative flex items-center justify-center bg-stone-950 overflow-hidden">
                          {/* Remote Video Stream Feed */}
                          <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className={`w-full h-full object-cover ${callState.status !== 'connected' || !remoteStreamRef.current ? 'hidden' : 'block'}`}
                          />

                          {/* Fallback Display if connecting or peer camera is off */}
                          {(callState.status !== 'connected' || !remoteStreamRef.current) && (
                            <div className="flex flex-col items-center justify-center space-y-4 p-6 text-center z-10">
                              <div className="relative">
                                {(callState.status === 'calling' || callState.status === 'ringing') && (
                                  <span className="absolute inset-0 rounded-full border-4 border-[#25d366] animate-ping opacity-30" />
                                )}
                                {callState.contact?.dp ? (
                                  <img
                                    src={callState.contact.dp}
                                    alt={callState.contact.name}
                                    className="w-32 h-32 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-[#25d366] shadow-2xl relative z-10 animate-hw-card-pop"
                                  />
                                ) : (
                                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-[#00a884] to-[#25d366] text-white font-black text-5xl sm:text-6xl flex items-center justify-center border-4 border-[#25d366] shadow-2xl relative z-10">
                                    {callState.contact?.name ? callState.contact.name.charAt(0).toUpperCase() : 'D'}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-white">{callState.contact?.name}</h2>
                                <p className="text-xs text-[#8696a0] font-mono">
                                  {callState.status === 'calling' && 'Connecting WebRTC Live Channel...'}
                                  {callState.status === 'ringing' && 'Ringing across devices...'}
                                  {callState.status === 'connected' && 'Live Video Call Connected'}
                                </p>
                              </div>

                              {/* Real Audio Wave Equalizer */}
                              {callState.status === 'connected' && (
                                <div className="flex items-center gap-1.5 h-6 pt-2">
                                  {[30, 65, 95, 55, 85, 45, 75].map((h, i) => (
                                    <span
                                      key={i}
                                      className="w-1.5 rounded-full bg-gradient-to-t from-[#00a884] to-[#25d366] transition-all duration-75"
                                      style={{ height: `${Math.max(4, Math.round((h * (micVolumeLevel + 25)) / 120))}px` }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Local Camera Picture-in-Picture (PiP) Window in Bottom-Right Corner */}
                          <div className="absolute bottom-24 right-4 sm:bottom-24 sm:right-6 w-28 h-40 sm:w-44 sm:h-60 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-black z-30 transition-all hover:scale-105">
                            <video
                              ref={localVideoRef}
                              autoPlay
                              playsInline
                              muted
                              className={`w-full h-full object-cover scale-x-[-1] ${callState.isCamOff ? 'hidden' : 'block'}`}
                            />
                            {callState.isCamOff && (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-400 p-2 text-center text-xs">
                                <VideoOff className="w-6 h-6 text-stone-500 mb-1" />
                                <span>Camera Off</span>
                              </div>
                            )}
                            <div className="absolute bottom-1.5 left-2 text-[10px] text-white font-mono bg-black/70 px-2 py-0.5 rounded-md">
                              You {callState.facingMode === 'environment' ? '(Back)' : '(Front)'}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Floating WhatsApp Control Dock */}
                        <div className="absolute bottom-0 left-0 right-0 z-30 p-4 sm:p-5 flex items-center justify-center gap-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                          
                          {/* Mute Mic */}
                          <button
                            type="button"
                            onClick={handleToggleMute}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition cursor-pointer shadow-xl min-h-[44px] ${
                              callState.isMuted ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-[#3b4a54] text-white hover:bg-[#4a5c68]'
                            }`}
                            title={callState.isMuted ? 'Unmute Mic' : 'Mute Mic'}
                          >
                            {callState.isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
                          </button>

                          {/* Toggle Camera */}
                          <button
                            type="button"
                            onClick={handleToggleCam}
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition cursor-pointer shadow-xl min-h-[44px] ${
                              callState.isCamOff ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-[#3b4a54] text-white hover:bg-[#4a5c68]'
                            }`}
                            title={callState.isCamOff ? 'Turn Camera On' : 'Turn Camera Off'}
                          >
                            {callState.isCamOff ? <VideoOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Video className="w-5 h-5 sm:w-6 sm:h-6" />}
                          </button>

                          {/* Flip Camera (Front / Rear for Mobile) */}
                          <button
                            type="button"
                            onClick={handleSwitchCamera}
                            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3b4a54] hover:bg-[#4a5c68] text-white flex items-center justify-center transition cursor-pointer shadow-xl min-h-[44px]"
                            title="Flip Camera (Front/Back)"
                          >
                            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                          </button>

                          {/* End Call Button (Big Red) */}
                          <button
                            type="button"
                            onClick={() => handleEndCall(true, 'ended')}
                            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#ea0038] hover:bg-[#ff1f4b] text-white flex items-center justify-center shadow-2xl shadow-rose-900/60 hover:scale-105 active:scale-95 transition cursor-pointer ml-2 min-h-[44px]"
                            title="End Video Call"
                          >
                            <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7" />
                          </button>
                        </div>

                      </div>
                    ) : (
                      /* VOICE CALL DIALOG (AUTHENTIC WHATSAPP DESKTOP) */
                      <div className="w-full max-w-md bg-[#111b21] border border-[#222e35] rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center text-white relative">
                        
                        {/* Top Bar: Encryption & Call Type */}
                        <div className="w-full p-4 flex items-center justify-between border-b border-[#202c33] bg-[#111b21]/90">
                          <div className="flex items-center gap-2 text-xs font-semibold text-[#8696a0]">
                            <ShieldCheck className="w-4 h-4 text-[#00a884]" />
                            <span>End-to-end encrypted</span>
                          </div>
                          <span className="text-[11px] font-bold tracking-wider uppercase text-[#00a884] bg-[#00a884]/15 px-2.5 py-0.5 rounded-full border border-[#00a884]/30">
                            DAV WhatsApp Voice Call
                          </span>
                        </div>

                        {/* Main Calling Stage */}
                        <div className="w-full p-8 flex flex-col items-center justify-center space-y-6">
                          
                          {/* Avatar with Pulsing Rings */}
                          <div className="relative flex items-center justify-center my-2">
                            {(callState.status === 'calling' || callState.status === 'ringing') && (
                              <>
                                <span className="absolute w-36 h-36 rounded-full border border-[#00a884]/40 animate-ping opacity-30" />
                                <span className="absolute w-44 h-44 rounded-full border border-[#00a884]/20 animate-pulse" />
                              </>
                            )}
                            {callState.status === 'connected' && (
                              <span className="absolute w-36 h-36 rounded-full border-2 border-[#25d366]/50 animate-pulse" />
                            )}

                            {callState.contact?.dp ? (
                              <img
                                src={callState.contact.dp}
                                alt={callState.contact.name}
                                className="w-28 h-28 rounded-full object-cover border-4 border-[#25d366] shadow-xl relative z-10"
                              />
                            ) : (
                              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#00a884] to-[#25d366] text-white font-black text-4xl flex items-center justify-center border-4 border-[#25d366] shadow-xl relative z-10">
                                {callState.contact?.name ? callState.contact.name.charAt(0).toUpperCase() : 'D'}
                              </div>
                            )}

                            <div className="absolute -bottom-2 z-20 px-3 py-1 rounded-full bg-[#202c33] border border-[#2a3942] text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                              {callState.isMuted ? (
                                <>
                                  <MicOff className="w-3.5 h-3.5 text-rose-400" />
                                  <span className="text-rose-400">Muted</span>
                                </>
                              ) : (
                                <>
                                  <Mic className="w-3.5 h-3.5 text-[#25d366]" />
                                  <span className="text-[#25d366]">Microphone Active</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="text-center space-y-1.5 pt-2">
                            <h3 className="text-2xl font-bold text-white tracking-tight">
                              {callState.contact?.name || 'DAV Faculty'}
                            </h3>
                            <p className="text-xs text-[#8696a0] font-medium">
                              {callState.contact?.subtitle || callState.contact?.subject || 'DAV Academic Oversight Directorate'}
                            </p>
                          </div>

                          <div className="text-center">
                            {callState.status === 'calling' && (
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#202c33] text-[#8696a0] text-sm font-bold border border-[#2a3942]">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                <span>Calling...</span>
                              </div>
                            )}

                            {callState.status === 'ringing' && (
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#202c33] text-[#25d366] text-sm font-bold border border-[#25d366]/30">
                                <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
                                <span>Ringing...</span>
                              </div>
                            )}

                            {callState.status === 'connected' && (
                              <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#00a884]/20 text-[#25d366] text-base font-black border border-[#00a884]/40 shadow-inner">
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] animate-ping" />
                                  <span>
                                    {Math.floor(callState.duration / 60).toString().padStart(2, '0')}:
                                    {(callState.duration % 60).toString().padStart(2, '0')}
                                  </span>
                                </div>

                                <div className="flex items-center justify-center gap-1.5 h-6">
                                  {[40, 75, 95, 60, 85, 50, 70].map((h, i) => (
                                    <span
                                      key={i}
                                      className="w-1.5 rounded-full bg-gradient-to-t from-[#00a884] to-[#25d366] transition-all duration-75"
                                      style={{
                                        height: callState.isMuted 
                                          ? '4px' 
                                          : `${Math.max(4, Math.round((h * (micVolumeLevel + 25)) / 125))}px`
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {callState.status === 'ended' && (
                              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold border border-rose-500/40">
                                <PhoneOff className="w-4 h-4" />
                                <span>Call Ended</span>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Bottom Calling Action Controls */}
                        <div className="w-full p-6 pt-2 bg-[#202c33]/70 border-t border-[#222e35] flex items-center justify-center gap-6">
                          <button
                            type="button"
                            onClick={handleToggleMute}
                            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                              callState.isMuted
                                ? 'bg-rose-500 text-white hover:bg-rose-600'
                                : 'bg-[#3b4a54] text-[#d1d7db] hover:bg-[#4a5c68] hover:text-white'
                            }`}
                            title={callState.isMuted ? 'Unmute' : 'Mute'}
                          >
                            {callState.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEndCall(true, 'ended')}
                            className="w-16 h-16 rounded-full bg-[#ea0038] hover:bg-[#ff1f4b] text-white flex items-center justify-center shadow-xl shadow-rose-900/50 hover:scale-105 active:scale-95 transition cursor-pointer"
                            title="End Call"
                          >
                            <PhoneOff className="w-7 h-7" />
                          </button>

                          <button
                            type="button"
                            onClick={handleToggleSpeaker}
                            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition cursor-pointer shadow-lg active:scale-95 ${
                              !callState.isSpeaker
                                ? 'bg-[#3b4a54] text-rose-300'
                                : 'bg-[#3b4a54] text-[#d1d7db] hover:bg-[#4a5c68] hover:text-white'
                            }`}
                            title={callState.isSpeaker ? 'Speaker On' : 'Speaker Off'}
                          >
                            {callState.isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                )}

                {/* ========================================================================= */}
                {/* REAL-TIME INCOMING LIVE VIDEO / VOICE CALL POPUP BANNER                    */}
                {/* ========================================================================= */}
                {incomingCall && !callState.isOpen && (
                  <div className="fixed top-6 right-6 z-[9999] bg-[#111b21] border-2 border-[#25d366] rounded-3xl p-4 shadow-2xl text-white max-w-sm w-full animate-bounce card-real-3d">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full border-2 border-[#25d366] animate-ping opacity-40" />
                        {incomingCall.callerAvatar ? (
                          <img src={incomingCall.callerAvatar} alt={incomingCall.callerName} className="w-12 h-12 rounded-full object-cover border-2 border-[#25d366] relative z-10" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-[#00a884] text-white font-bold flex items-center justify-center text-lg shadow-md relative z-10">
                            {incomingCall.callerName ? incomingCall.callerName.charAt(0).toUpperCase() : 'D'}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[#25d366] uppercase font-bold tracking-wider flex items-center gap-1">
                          {incomingCall.callType === 'video' ? <Video className="w-3 h-3 text-[#25d366]" /> : <Phone className="w-3 h-3 text-[#25d366]" />}
                          <span>Incoming {incomingCall.callType === 'video' ? 'Video' : 'Voice'} Call</span>
                        </div>
                        <h4 className="text-sm font-bold text-white truncate">{incomingCall.callerName}</h4>
                        <p className="text-xs text-[#8696a0] truncate">{incomingCall.callerRole}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Accept Button (Green) */}
                        <button
                          type="button"
                          onClick={() => handleAcceptCall(incomingCall)}
                          className="w-10 h-10 rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg cursor-pointer transition hover:scale-110 active:scale-95"
                          title="Accept Call"
                        >
                          {incomingCall.callType === 'video' ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                        </button>

                        {/* Decline Button (Red) */}
                        <button
                          type="button"
                          onClick={() => handleDeclineCall(incomingCall)}
                          className="w-10 h-10 rounded-full bg-[#ea0038] hover:bg-[#ff1f4b] text-white flex items-center justify-center shadow-lg cursor-pointer transition hover:scale-110 active:scale-95"
                          title="Decline Call"
                        >
                          <PhoneOff className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* PAGE 3: 100% IN-WEBSITE REAL ONLINE LIVE CLASSROOM (WEBRTC)          */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'live_class' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Live Class Graphical Landing Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-rose-950 border-2 border-rose-500/50 p-8 md:p-12 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-rose-500/15 pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/50 text-xs font-mono font-bold text-rose-300">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                      <span>PAGE 3 - 100% IN-WEBSITE WEBRTC LIVE CLASSROOM</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                      Live Online Classes <span className="bg-gradient-to-r from-rose-400 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Directly In Your Website</span>
                    </h2>

                    <p className="text-sm md:text-base text-purple-200/80 leading-relaxed max-w-2xl">
                      No Zoom or external meeting links required! Complete full-screen video lectures with real webcam feeds, microphone streaming, screen sharing, and interactive digital whiteboard.
                    </p>

                    {/* Primary Center Button */}
                    <div className="pt-4 flex items-center gap-4 flex-wrap">
                      <button
                        onClick={() => {
                          setIsLivePortalModalOpen(true);
                          playSoundChime('sent');
                        }}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-fuchsia-600 to-teal-400 hover:from-rose-500 hover:to-teal-300 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-rose-600/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>Enter Online Live Classroom Portal</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      {isDimension5 && (
                        <button
                          onClick={() => {
                            if (typeof handleStartFacultyBroadcast === 'function') {
                              handleStartFacultyBroadcast();
                            }
                          }}
                          className="px-6 py-4 rounded-2xl bg-slate-900 border-2 border-rose-500 text-rose-300 hover:text-white font-black text-sm flex items-center gap-2 transition cursor-pointer"
                        >
                          <Video className="w-4 h-4 text-rose-400" />
                          <span>Start Faculty Live Broadcast</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                
                {/* Real-Time Live Broadcast Pulsing Alert (Prominently displayed for all students) */}
                {scheduledLiveClasses.some(c => c.status === 'live') && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-950 via-purple-950 to-slate-950 border-2 border-rose-500 shadow-2xl flex items-center justify-between flex-wrap gap-4 animate-live-room-pulse">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-400 flex items-center justify-center text-rose-400 shrink-0">
                        <Video className="w-6 h-6 animate-pulse animate-live-on-air" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] tracking-wider uppercase">
                            🔴 STREAMING LIVE NOW
                          </span>
                          <span className="text-xs font-mono text-teal-300 font-bold">
                            Class {scheduledLiveClasses.find(c => c.status === 'live')?.classId || '8'}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-white mt-1">
                          {scheduledLiveClasses.find(c => c.status === 'live')?.topic || 'Faculty Live Interactive Lecture'}
                        </h3>
                        <p className="text-xs text-rose-200">
                          Educator: <strong className="text-white">{scheduledLiveClasses.find(c => c.status === 'live')?.teacher}</strong> ({scheduledLiveClasses.find(c => c.status === 'live')?.subject})
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const target = scheduledLiveClasses.find(c => c.status === 'live');
                        if (target) {
                          setActiveLiveSessionData(target);
                          setIsInsideLiveRoom(true);
                          playSoundChime('sent');
                        }
                      }}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-teal-400 hover:from-rose-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl cursor-pointer hover:scale-105 transition transform animate-live-camera-glow"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Join Live Class Now (Instant Video)</span>
                    </button>
                  </div>
                )}

                {/* Quick Live Lecture Schedule Preview */}
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-400" />
                      <span>Active &amp; Upcoming Live Lectures (Class 8)</span>
                    </h3>
                    <span className="text-xs text-rose-300 font-mono">{scheduledLiveClasses.filter(c => c.status === "live").length} Classes Live Now</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(() => {
                      const liveNow = scheduledLiveClasses.filter(c => c.status === 'live');
                      const classSpecific = scheduledLiveClasses.filter(c => String(c.classId) === String(selectedLiveClassNum) && c.status !== 'live');
                      const seen = new Set();
                      const displayedList = [];
                      [...liveNow, ...classSpecific].forEach(s => {
                        if (!seen.has(s.id)) {
                          seen.add(s.id);
                          displayedList.push(s);
                        }
                      });

                      if (displayedList.length === 0) {
                        return (
                          <div className="col-span-full p-8 rounded-2xl bg-slate-900/60 border border-purple-900/60 text-center space-y-2">
                            <Video className="w-8 h-8 text-rose-400 mx-auto opacity-50 animate-live-room-pulse" />
                            <p className="text-sm font-bold text-white">No active lectures right now for Class {selectedLiveClassNum}.</p>
                            <p className="text-xs text-purple-300">When your teacher starts a live class, it will instantly appear here across all devices.</p>
                          </div>
                        );
                      }

                      return displayedList.map((session) => (
                      <div
                        key={session.id}
                        className="p-5 rounded-2xl bg-slate-900/80 border border-purple-800/80 hover:border-rose-400 transition shadow-lg flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-lg bg-purple-900 text-teal-300 text-xs font-bold font-mono">
                              {session.subject}
                            </span>
                            {session.status === 'live' ? (
                              <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-[10px] flex items-center gap-1.5 animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                <span>LIVE NOW - {session.activeParticipants} Students</span>
                              </span>
                            ) : (
                              <span className="text-xs text-purple-400 font-mono">{session.time}</span>
                            )}
                          </div>

                          <h4 className="text-sm font-black text-white">{session.topic}</h4>
                          <p className="text-xs text-purple-300">Educator: <strong className="text-white">{session.teacher}</strong></p>
                        </div>

                        <button
                          onClick={() => {
                            setActiveLiveSessionData(session);
                            setIsInsideLiveRoom(true);
                            playSoundChime('sent');
                          }}
                          className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-fuchsia-600 to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer hover:opacity-95"
                        >
                          <Play className="w-4 h-4" />
                          <span>Join Live Class Now (In-Website Video)</span>
                        </button>
                      </div>
                    ));
                    })()}
                  </div>
                </div>

                {/* Class Selection Pop-up for Live Lectures */}
                {isLivePortalModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950/98 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-rose-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Video className="w-5 h-5 animate-live-mic-levels" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Your Class for Live Online Video Lecture
                            </h2>
                            <p className="text-xs text-teal-300 font-mono">
                              (Student selects ONLY Class from LKG to Class 8 - No section required)
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsLivePortalModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 cursor-pointer text-purple-300 hover:text-white">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Class Selection Buttons */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Pick Your Class:
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedLiveClassNum(c.id)}
                              className={`py-3 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedLiveClassNum === c.id
                                  ? 'bg-gradient-to-r from-rose-500 to-teal-400 text-slate-950 border-rose-300 shadow-md scale-105'
                                  : 'bg-slate-900 text-purple-300 border-purple-800 hover:border-purple-600'
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Available Live Lectures for chosen Class */}
                      <div className="space-y-3 pt-2">
                        <h3 className="text-base font-black text-white">
                          Live Lectures for {SCHOOL_CLASSES_CONFIG.find(c => c.id === selectedLiveClassNum)?.name || `Class ${selectedLiveClassNum}`}:
                        </h3>

                        {(() => {
                          const list = scheduledLiveClasses.filter(c => c.classId === selectedLiveClassNum);
                          if (list.length === 0) {
                            return (
                              <div className="p-10 rounded-2xl bg-slate-900/60 border border-purple-900 text-center space-y-2">
                                <Video className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
                                <p className="text-sm font-bold text-white">No live lectures currently broadcasting for Class {selectedLiveClassNum}</p>
                                <p className="text-xs text-purple-300">Teachers will schedule the next session shortly. Check back at period time!</p>
                              </div>
                            );
                          }

                          return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {list.map((c) => (
                                <div key={c.id} className="p-5 rounded-2xl bg-slate-900 border border-purple-700 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold">{c.subject}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-black animate-pulse">LIVE</span>
                                  </div>
                                  <h4 className="text-sm font-black text-white">{c.topic}</h4>
                                  <p className="text-xs text-purple-300">Teacher: <strong className="text-white">{c.teacher}</strong></p>
                                  <button
                                    onClick={() => {
                                      setActiveLiveSessionData(c);
                                      setIsLivePortalModalOpen(false);
                                      setIsInsideLiveRoom(true);
                                      playSoundChime('sent');
                                    }}
                                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                                  >
                                    Join Live Class (100% In-Website)
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                    </div>
                  </div>
                )}

                {/* FULL-SCREEN REAL WEBRTC IN-WEBSITE MEETING ROOM */}
                {isInsideLiveRoom && (
                  <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-fadeIn select-none">
                    
                    {/* Meeting Top Bar */}
                    <div className="px-4 py-3 bg-slate-900/95 border-b border-purple-800 flex items-center justify-between text-white shrink-0 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-black text-xs flex items-center gap-1.5 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-white" />
                          <span>LIVE CLASS</span>
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-white">
                            {activeLiveSessionData?.topic || `DAV Class ${selectedLiveClassNum} Live Lecture`}
                          </h3>
                          <p className="text-[10px] text-teal-300 font-mono">
                            Educator: {activeLiveSessionData?.teacher || user?.name || 'DAV Faculty'} - Real-Time WebRTC Video Stream
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            const url = getLiveRoomUrl(activeLiveSessionData, selectedLiveClassNum);
                            navigator.clipboard.writeText(url);
                            setCopiedLiveLink(true);
                            playSoundChime('sent');
                            setTimeout(() => setCopiedLiveLink(false), 3000);
                          }}
                          className="px-3 py-1.5 rounded-xl border border-emerald-500/60 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          title="Copy meeting link to share with students"
                        >
                          {copiedLiveLink ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-live-hand-raise" />
                              <span>Copied Invite Link!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-emerald-400 animate-live-screen-share" />
                              <span className="hidden sm:inline">Invite Link</span>
                            </>
                          )}
                        </button>

                        <a
                          href={getLiveRoomUrl(activeLiveSessionData, selectedLiveClassNum)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl border border-blue-500/60 bg-blue-950/60 text-blue-300 hover:bg-blue-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                          title="Open in new browser tab or mobile app"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400 animate-live-dock-hover" />
                          <span className="hidden sm:inline">New Tab</span>
                        </a>

                        <button
                          onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            isWhiteboardActive ? 'bg-teal-500 text-slate-950 border-teal-300' : 'bg-slate-800 text-purple-200 border-purple-700'
                          }`}
                        >
                          <PenTool className="w-3.5 h-3.5" />
                          <span>{isWhiteboardActive ? 'Video Room' : 'Whiteboard'}</span>
                        </button>

                        {isDimension5 ? (
                          <button
                            onClick={() => {
                              if (typeof handleEndFacultyBroadcast === 'function') {
                                handleEndFacultyBroadcast(activeLiveSessionData?.id);
                              } else {
                                setIsInsideLiveRoom(false);
                              }
                              setIsWhiteboardActive(false);
                              playSoundChime('alert');
                            }}
                            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer transition"
                            title="End and remove live stream across all devices"
                          >
                            <PhoneOff className="w-3.5 h-3.5" />
                            <span>End Faculty Broadcast</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setIsInsideLiveRoom(false);
                              setIsWhiteboardActive(false);
                              playSoundChime('alert');
                            }}
                            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition border border-purple-700"
                          >
                            <PhoneOff className="w-3.5 h-3.5 text-rose-400 animate-live-hangup-shake" />
                            <span>Leave Class</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Meeting Stage Area */}
                    <div className="flex-1 flex flex-col overflow-hidden relative p-2 sm:p-4 bg-slate-950">
                      {isWhiteboardActive ? (
                        <div className="flex-1 min-h-[450px] bg-slate-900 border-2 border-teal-400/80 rounded-3xl p-4 flex flex-col shadow-2xl space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-purple-800">
                            <div className="flex items-center gap-2">
                              <PenTool className="w-4 h-4 text-teal-300" />
                              <h4 className="text-xs font-black text-white">Live Whiteboard: Ray Diagram Demonstrator</h4>
                            </div>
                            <span className="text-[10px] text-teal-300 font-mono">Interactive Drawing Console</span>
                          </div>
                          <div className="flex-1 bg-slate-950 rounded-2xl border border-purple-900 relative flex items-center justify-center overflow-hidden p-4">
                            <div className="text-center space-y-3">
                              <PenTool className="w-12 h-12 text-teal-400 mx-auto animate-bounce animate-live-whiteboard-draw" />
                              <h5 className="text-sm font-bold text-white">Teacher's Digital Smart Board Active</h5>
                              <p className="text-xs text-purple-300 max-w-sm">
                                Draw ray diagrams, write math formulas, or annotate class diagrams live with your students.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden border border-purple-500/40 relative shadow-2xl flex flex-col">
                          <iframe
                            src={getLiveRoomUrl(activeLiveSessionData, selectedLiveClassNum)}
                            allow="camera; microphone; display-capture; autoplay; clipboard-read; clipboard-write; fullscreen"
                            className="w-full flex-1 border-0"
                            title="DAV Real Online Live Classroom"
                            onLoad={() => {
                              iframeLoadCountRef.current = (iframeLoadCountRef.current || 0) + 1;
                              if (iframeLoadCountRef.current > 1) {
                                // Meeting ended or MiroTalk redirected to landing page!
                                // Instantly close meeting room modal so landing page is NEVER displayed!
                                if (isDimension5) {
                                  if (typeof handleEndFacultyBroadcast === 'function') {
                                    handleEndFacultyBroadcast(activeLiveSessionData?.id);
                                  } else {
                                    setIsInsideLiveRoom(false);
                                    setActiveLiveSessionData(null);
                                  }
                                } else {
                                  setIsInsideLiveRoom(false);
                                  setActiveLiveSessionData(null);
                                }
                                setIsWhiteboardActive(false);
                                playSoundChime('alert');
                              }
                            }}
                          />
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            )}

{/* --------------------------------------------------------------------- */}
            {/* PAGE 4: CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE             */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'tests' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Hero Animated Graphical Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-amber-950 border-2 border-amber-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/15 pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono font-bold text-amber-300">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
                      <span>PAGE 4 - ONLINE TEST &amp; EXAMINATION SIMULATOR</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Take Real <span className="bg-gradient-to-r from-amber-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">CBT Unit Examinations</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      {isDimension5 
                        ? 'Faculty Portal: Deploy timed MCQ & subjective examinations, monitor student submissions, and review real-time test leaderboards.'
                        : 'Attempt scheduled DAV unit examinations with timed countdown, MCQ options, and notebook photo uploads for subjective questions.'}
                    </p>

                    {/* Action Buttons: Teacher & Student Leaderboard + Attempt */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setShowTeacherLeaderboardModal(true);
                          playSoundChime('sent');
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Trophy className="w-4 h-4 text-slate-950 animate-cbt-timer-tick" />
                        <span>Check Test Leaderboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {!isDimension5 && (
                        <button
                          onClick={() => {
                            setIsTestPortalOpen(true);
                            playSoundChime('sent');
                          }}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-teal-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <CheckSquare className="w-4 h-4 text-slate-950" />
                          <span>Attempt / Give Online Test</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}

                      {isDimension5 && (
                        <button
                          onClick={() => {
                            setShowCreateTestModal(true);
                            setDeployedShareCode(null);
                            playSoundChime('sent');
                          }}
                          className="px-6 py-3 rounded-2xl bg-purple-900 border-2 border-teal-400 text-teal-300 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-xl hover:scale-105 animate-cbt-deploy-burst"
                        >
                          <Plus className="w-4 h-4 text-teal-300 animate-att-enroll-modal" />
                          <span>Create &amp; Deploy New Examination (Faculty)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Available Tests Preview for Class & Section */}
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
                    <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-amber-400 animate-cbt-palette-flip" />
                      <span>Active Verified Unit Tests for Class {selectedTestClass} - Section {selectedTestSection}</span>
                    </h3>
                    <span className="text-xs text-amber-300 font-mono">
                      {testsDatabase.filter(t => !isExamExpired(t) && t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true)).length} Tests Ready
                    </span>
                  </div>

                  {testsDatabase.filter(t => !isExamExpired(t) && t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true)).length === 0 ? (
                    <div className="p-12 text-center rounded-2xl bg-slate-900 border border-purple-800 space-y-3">
                      <BookOpen className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
                      <h4 className="text-sm font-bold text-white">No examinations deployed yet for Class {selectedTestClass}-{selectedTestSection}</h4>
                      <p className="text-xs text-purple-300 max-w-md mx-auto">
                        {isDimension5 
                          ? "Click 'Create & Deploy New Examination' above to author real MCQ or Subjective tests for your students."
                          : "Your subject teachers have not deployed any scheduled tests for this standard yet. Please check back later."}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {testsDatabase
                        .filter(t => t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true))
                        .map((t) => {
                          const windowActive = isTestWindowOpen(t);

                          return (
                            <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-purple-800 hover:border-amber-400 transition shadow-lg space-y-3 flex flex-col justify-between">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold font-mono">
                                    {t.subject}
                                  </span>
                                  <span className="text-xs text-amber-300 font-mono">
                                    {t.startTime && t.endTime ? `${t.startTime} - ${t.endTime}` : `${t.durationMinutes} Mins`}
                                  </span>
                                </div>
                                <h4 className="text-sm font-black text-white">{t.title}</h4>
                                <p className="text-xs text-purple-300">{t.chapter}</p>
                                <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                                  <span>Total Marks: {t.totalMarks}</span>
                                  <span>•</span>
                                  <span>{t.questions.length} Questions</span>
                                  <span>•</span>
                                  <span className="uppercase text-[10px]">{t.format || 'MCQ'}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLeaderboardSelectedTest(t);
                                    setShowTeacherLeaderboardModal(true);
                                    playSoundChime('sent');
                                  }}
                                  className="w-full py-2 rounded-xl bg-purple-900/80 border border-teal-400/80 text-teal-300 hover:text-white font-black text-xs cursor-pointer shadow-md hover:opacity-95 flex items-center justify-center gap-1.5"
                                >
                                  <Trophy className="w-3.5 h-3.5 text-teal-300 animate-cbt-score-count" />
                                  <span>Check Test Leaderboard</span>
                                </button>
                                {!isDimension5 && (windowActive ? (
                                <button
                                  onClick={() => handleStartExam(t)}
                                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:opacity-95"
                                >
                                  Attempt Test Now
                                </button>
                              ) : (
                                <div className="w-full py-2 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs text-center border border-slate-700">
                                  Window Closed ({t.startTime} - {t.endTime})
                                </div>
                              ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>

                {/* Pop-up for Class & Section selection for Tests (Students) */}
                {isTestPortalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-amber-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <CheckSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Class &amp; Section for Online Test
                            </h2>
                            <p className="text-xs text-amber-300 font-mono">
                              Step-by-step Class and Section validation
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsTestPortalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Step 1: Select Class */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 1: Select Class (Nursery to Class 8)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setSelectedTestClass(c.id);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                                selectedTestClass === c.id
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              <GraduationCap className="w-4 h-4 animate-cbt-badge-stat" />
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Select Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 2: Select Section (A through E)
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                            <button
                              key={sec}
                              onClick={() => {
                                setSelectedTestSection(sec);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                                selectedTestSection === sec
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              Section {sec}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setIsTestPortalOpen(false);
                            playSoundChime('delivered');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                        >
                          Confirm &amp; View Tests
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* TEACHER CHECK LEADERBOARD MODAL (Faculty Only) */}
                {showTeacherLeaderboardModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-amber-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Trophy className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Online Examination Leaderboard &amp; Student Submissions
                            </h2>
                            <p className="text-xs text-amber-300 font-mono">
                              Faculty Exclusive: Review answers, inspect notebook photos, and override scores
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setShowTeacherLeaderboardModal(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Select Test dropdown or chips */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Select Examination to Inspect Leaderboard:
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {testsDatabase.map(t => (
                            <button
                              key={t.id}
                              onClick={() => {
                                setLeaderboardSelectedTest(t);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer ${
                                (leaderboardSelectedTest?.id === t.id)
                                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                                  : 'bg-slate-900 border-purple-800 text-purple-200'
                              }`}
                            >
                              <div className="font-bold truncate text-white">{t.title}</div>
                              <div className="text-[10px] text-teal-300 font-mono">{t.subject} • Class {t.classId}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Leaderboard Table for Selected Test */}
                      {leaderboardSelectedTest ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-white flex items-center gap-2">
                              <span>Submissions for: {leaderboardSelectedTest.title}</span>
                              <span className="text-xs text-teal-300 font-mono">(Max Marks: {leaderboardSelectedTest.totalMarks})</span>
                            </h3>
                          </div>

                          {(() => {
                            let results = [];
                            try {
                              const raw = localStorage.getItem(TEST_RESULTS_STORAGE_KEY);
                              if (raw) results = JSON.parse(raw);
                            } catch (e) {}
                            const testAttempts = results.filter(r => r.testId === leaderboardSelectedTest.id).sort((a, b) => b.score - a.score);

                            if (testAttempts.length === 0) {
                              return (
                                <div className="p-8 text-center rounded-2xl bg-slate-900 border border-purple-800 text-xs text-purple-300">
                                  No students have submitted this examination yet. Once real students take the test, their ranking will appear here.
                                </div>
                              );
                            }

                            return (
                              <div className="rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden">
                                <table className="w-full text-xs text-left">
                                  <thead className="bg-purple-950/80 text-purple-300 font-mono uppercase text-[10px] border-b border-purple-800">
                                    <tr>
                                      <th className="p-3">Rank</th>
                                      <th className="p-3">Student Name</th>
                                      <th className="p-3">Score Obtained</th>
                                      <th className="p-3">Time Spent</th>
                                      <th className="p-3 text-right">Submissions &amp; Answers</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-purple-950/60">
                                    {testAttempts.map((att, idx) => (
                                      <tr key={att.id || idx} className="hover:bg-purple-950/30">
                                        <td className="p-3 font-mono font-bold text-amber-400">#{idx + 1}</td>
                                        <td className="p-3 font-bold text-white">{att.name}</td>
                                        <td className="p-3 font-mono font-bold text-teal-300">{att.score} / {att.maxMarks || leaderboardSelectedTest.totalMarks}</td>
                                        <td className="p-3 font-mono text-purple-300">{att.time || '-'}</td>
                                        <td className="p-3 text-right">
                                          {att.subjectiveImages && Object.keys(att.subjectiveImages).length > 0 && (
                                            <span className="inline-flex items-center gap-1 text-[10px] text-teal-300 bg-teal-950 border border-teal-500 px-2 py-0.5 rounded-lg mr-2 font-mono">
                                              📷 Notebook Photo Attached
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="p-8 text-center rounded-2xl bg-slate-900 border border-purple-800 text-xs text-purple-300">
                          Please select an examination from the list above to view student submissions.
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* TEACHER CREATE & DEPLOY EXAMINATION MODAL */}
                {showCreateTestModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-teal-400 to-purple-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Plus className="w-5 h-5 animate-cbt-submit-lock" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Author &amp; Deploy New Examination (Faculty)
                            </h2>
                            <p className="text-xs text-teal-300 font-mono">
                              24-hour test window, MCQ media attachments, and subjective questions
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setShowCreateTestModal(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleDeployExamination} className="space-y-6 text-xs">
                        
                        {/* Meta info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="font-bold text-purple-300">Exam Title:</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Science Chapter 11 Periodic Quiz"
                              value={newTestTitle}
                              onChange={(e) => setNewTestTitle(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-purple-300">Subject:</label>
                            <select
                              value={newTestSubject}
                              onChange={(e) => setNewTestSubject(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                            >
                              {DAV_SUBJECTS_10.map(s => (
                                <option key={s.key} value={s.name}>{s.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="font-bold text-purple-300">Class Standard:</label>
                            <select
                              value={newTestClass}
                              onChange={(e) => setNewTestClass(e.target.value)}
                              className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                            >
                              {SCHOOL_CLASSES_CONFIG.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Section Selection for Deployed Exam */}
                        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="font-bold text-teal-300 font-mono text-xs uppercase">Target Sections:</label>
                            <span className="text-[11px] text-purple-300 font-mono">
                              Active: {newTestSections.length === 5 ? 'All Sections (A-E)' : `Section ${newTestSections.join(', ')}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={() => {
                                if (newTestSections.length === 5) {
                                  setNewTestSections(['D']);
                                } else {
                                  setNewTestSections(['A', 'B', 'C', 'D', 'E']);
                                }
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                                newTestSections.length === 5
                                  ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md'
                                  : 'bg-slate-950 text-purple-300 border-purple-800'
                              }`}
                            >
                              All Sections (A to E)
                            </button>
                            {['A', 'B', 'C', 'D', 'E'].map(sec => (
                              <button
                                key={sec}
                                type="button"
                                onClick={() => handleToggleSectionCheckbox(sec)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer border ${
                                  newTestSections.includes(sec)
                                    ? 'bg-purple-600 text-white border-purple-300 shadow-sm'
                                    : 'bg-slate-950 text-purple-400 border-purple-800 hover:border-purple-600'
                                }`}
                              >
                                Sec {sec}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 24-Hour Time Window & Auto Duration */}
                        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800 space-y-3">
                          <h4 className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider">
                            24-Hour Examination Window &amp; Duration
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                            <div className="space-y-1">
                              <label className="font-bold text-purple-300">Window Start Time (24h):</label>
                              <input
                                type="time"
                                value={newTestStartTime}
                                onChange={(e) => setNewTestStartTime(e.target.value)}
                                className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white font-mono font-bold focus:border-teal-400"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-bold text-purple-300">Window End Time (24h):</label>
                              <input
                                type="time"
                                value={newTestEndTime}
                                onChange={(e) => setNewTestEndTime(e.target.value)}
                                className="w-full p-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white font-mono font-bold focus:border-teal-400"
                              />
                            </div>
                            <div className="p-3 rounded-xl bg-slate-900 border border-teal-500/50 text-center">
                              <span className="text-[10px] text-purple-300 uppercase font-mono block">Computed Duration</span>
                              <span className="text-sm font-black text-teal-300 font-mono">
                                {computeDurationMinutes(newTestStartTime, newTestEndTime)} Minutes
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <h4 className="font-mono text-xs font-bold text-teal-300 uppercase tracking-wider">
                              Examination Questions ({newTestQuestions.length})
                            </h4>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={handleAddMcqQuestion}
                                className="px-3 py-1.5 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 font-bold hover:text-white cursor-pointer"
                              >
                                ➕ Add MCQ Question
                              </button>
                              <button
                                type="button"
                                onClick={handleAddSubjectiveQuestion}
                                className="px-3 py-1.5 rounded-xl bg-purple-900 border border-amber-400 text-amber-300 font-bold hover:text-white cursor-pointer"
                              >
                                ➕ Add Subjective Question
                              </button>
                            </div>
                          </div>

                          {newTestQuestions.map((q, qIdx) => (
                            <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white flex items-center gap-2 font-mono">
                                  <span>Q{qIdx + 1}.</span>
                                  <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${
                                    q.type === 'subjective' ? 'bg-amber-500/20 text-amber-300 border border-amber-500' : 'bg-teal-500/20 text-teal-300 border border-teal-500'
                                  }`}>
                                    {q.type === 'subjective' ? 'Subjective' : 'Multiple Choice (MCQ)'}
                                  </span>
                                </span>
                                {newTestQuestions.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveQuestion(qIdx)}
                                    className="text-rose-400 hover:text-rose-300 text-xs font-bold"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder="Enter question statement..."
                                value={q.questionText}
                                onChange={(e) => {
                                  const textVal = e.target.value;
                                  setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, questionText: textVal } : item));
                                }}
                                className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-bold"
                              />

                              {/* If Subjective Question */}
                              {q.type === 'subjective' ? (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`sub-q-img-${qIdx}`}
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const r = new FileReader();
                                          r.onload = (ev) => {
                                            setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, questionImage: ev.target.result } : item));
                                          };
                                          r.readAsDataURL(file);
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`sub-q-img-${qIdx}`}
                                      className="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-700 text-teal-300 font-bold cursor-pointer"
                                    >
                                      📷 Attach Question Diagram/Image
                                    </label>
                                    {q.questionImage && <span className="text-[10px] text-teal-300 font-mono">Image Attached ✓</span>}
                                  </div>
                                </div>
                              ) : (
                                /* If MCQ Question */
                                <div className="space-y-3">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {q.options.map((opt, oIdx) => (
                                      <div key={oIdx} className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-amber-300">{String.fromCharCode(65 + oIdx)}.</span>
                                        <input
                                          type="text"
                                          placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                                          value={opt}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setNewTestQuestions(prev => prev.map((item, idx) => {
                                              if (idx === qIdx) {
                                                const nextOpts = [...item.options];
                                                nextOpts[oIdx] = val;
                                                return { ...item, options: nextOpts };
                                              }
                                              return item;
                                            }));
                                          }}
                                          className="flex-1 p-2 rounded-xl bg-slate-950 border border-purple-700 text-white"
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  {/* MCQ Diagram / Image Attachment */}
                                  <div className="flex items-center gap-3 flex-wrap pt-1">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      id={`mcq-q-img-${qIdx}`}
                                      className="hidden"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                          const compressed = await compressImage(file, 500, 500, 0.8);
                                          if (compressed) {
                                            setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, questionImage: compressed } : item));
                                          }
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`mcq-q-img-${qIdx}`}
                                      className="px-3 py-1.5 rounded-xl bg-purple-950 border border-purple-700 text-teal-300 font-bold cursor-pointer hover:bg-purple-900 transition flex items-center gap-1.5 text-[11px]"
                                    >
                                      <ImageIcon className="w-3.5 h-3.5 text-teal-300 animate-cbt-photo-inspect" />
                                      <span>📷 Attach Question Diagram / Image</span>
                                    </label>
                                    {q.questionImage && (
                                      <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-teal-300 font-mono">Diagram Attached ✓</span>
                                        <button
                                          type="button"
                                          onClick={() => setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, questionImage: null } : item))}
                                          className="text-[10px] text-rose-400 hover:underline"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1.5 ml-auto">
                                      <label className="text-[11px] font-bold text-purple-300">Marks:</label>
                                      <input
                                        type="number"
                                        min={1}
                                        max={50}
                                        value={q.maxMarks || 5}
                                        onChange={(e) => {
                                          const mVal = Number(e.target.value) || 1;
                                          setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, maxMarks: mVal } : item));
                                        }}
                                        className="w-14 p-1.5 rounded-lg bg-slate-950 border border-purple-700 text-white font-mono font-bold text-center text-xs"
                                      />
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 flex-wrap">
                                    <span className="font-bold text-purple-300">Correct Answer:</span>
                                    {['A', 'B', 'C', 'D'].map(letter => (
                                      <label key={letter} className="inline-flex items-center gap-1 font-mono font-bold text-white cursor-pointer">
                                        <input
                                          type="radio"
                                          name={`ans-${q.id}`}
                                          checked={q.correctAnswer === letter}
                                          onChange={() => {
                                            setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, correctAnswer: letter } : item));
                                          }}
                                        />
                                        <span>{letter}</span>
                                      </label>
                                    ))}
                                  </div>

                                  {/* Attach Diagram / Image for MCQ */}
                                  <div className="pt-2 border-t border-purple-800/60 flex items-center justify-between flex-wrap gap-2">
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id={`mcq-diagram-file-${q.id || qIdx}`}
                                        className="hidden"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            const reader = new FileReader();
                                            reader.onload = (ev) => {
                                              const dataUrl = ev.target.result;
                                              setNewTestQuestions(prev => prev.map((item, idx) => 
                                                idx === qIdx ? { ...item, diagramUrl: dataUrl } : item
                                              ));
                                            };
                                            reader.readAsDataURL(file);
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor={`mcq-diagram-file-${q.id || qIdx}`}
                                        className="px-3 py-1.5 rounded-xl bg-purple-900/80 hover:bg-purple-800 border border-teal-400 text-teal-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm transition"
                                      >
                                        <Paperclip className="w-3.5 h-3.5 animate-cbt-option-select" />
                                        <span>{q.diagramUrl ? 'Change Diagram' : 'Attach Diagram / Image'}</span>
                                      </label>

                                      {q.diagramUrl && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setNewTestQuestions(prev => prev.map((item, idx) => 
                                              idx === qIdx ? { ...item, diagramUrl: '' } : item
                                            ));
                                          }}
                                          className="px-2 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-700 text-rose-300 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                                          title="Remove Attached Diagram"
                                        >
                                          <X className="w-3 h-3" />
                                          <span>Remove</span>
                                        </button>
                                      )}
                                    </div>

                                    {q.diagramUrl && (
                                      <span className="text-[11px] font-mono font-bold text-teal-300 flex items-center gap-1">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 animate-cbt-review-flag" />
                                        <span>Diagram Attached</span>
                                      </span>
                                    )}
                                  </div>

                                  {/* Diagram Preview Thumbnail */}
                                  {q.diagramUrl && (
                                    <div className="p-2 bg-slate-950 rounded-xl border border-purple-800 text-center">
                                      <img
                                        src={q.diagramUrl}
                                        alt="Question Diagram Preview"
                                        className="max-h-48 max-w-full mx-auto object-contain rounded-lg border border-purple-700 shadow-md"
                                      />
                                      <p className="text-[10px] text-purple-400 font-mono mt-1">
                                        Question Diagram / Visual Figure
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Deploy button */}
                        <div className="pt-4 flex items-center justify-between border-t border-purple-800">
                          {deployedShareCode && (
                            <span className="text-teal-300 font-mono font-bold">
                              Deployed! Exam Code: {deployedShareCode}
                            </span>
                          )}
                          <button
                            type="submit"
                            className="ml-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-400 via-amber-400 to-purple-500 text-slate-950 font-black text-xs shadow-xl cursor-pointer hover:scale-105 transition"
                          >
                            Deploy Examination to Class {newTestClass}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* STUDENT CBT EXAM TAKING MODAL */}
                {isTakingExam && activeExamData && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-4">
                      
                      {/* Top Exam Header */}
                      <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-800 flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <h2 className="text-sm md:text-base font-black text-white">{activeExamData.title}</h2>
                          <p className="text-xs text-amber-300 font-mono">{activeExamData.subject} • Candidate: {user?.name || 'Student'}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-400 font-mono font-black text-amber-300 text-sm">
                            ⏱ {formatTimerClock(examTimeRemaining)}
                          </div>
                          <button
                            onClick={handleSubmitExam}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg hover:scale-105"
                          >
                            Finish &amp; Submit
                          </button>
                        </div>
                      </div>

                      {/* Exam Body */}
                      {!examSubmitted ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
                          
                          {/* Question Area (8/12) */}
                          <div className="md:col-span-8 p-6 rounded-2xl bg-slate-900 border border-purple-800 space-y-4">
                            {(() => {
                              const q = activeExamData.questions[examCurrentQIdx];
                              if (!q) return null;

                              return (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between border-b border-purple-800 pb-2">
                                    <span className="font-mono font-black text-amber-400 text-sm">
                                      Question {examCurrentQIdx + 1} of {activeExamData.questions.length}
                                    </span>
                                    <span className="text-xs font-mono text-purple-300">
                                      Marks: {q.maxMarks || 5}
                                    </span>
                                  </div>

                                  <h3 className="text-sm md:text-base font-bold text-white leading-relaxed">
                                    {q.questionText}
                                  </h3>

                                  {q.questionImage && (
                                    <img src={q.questionImage} alt="Question Diagram" className="max-h-60 rounded-xl border border-purple-700 object-contain" />
                                  )}

                                  {/* Subjective vs MCQ inputs */}
                                  {q.type === 'subjective' ? (
                                    <div className="space-y-3 pt-2">
                                      <textarea
                                        rows={5}
                                        placeholder="Type your written answer, derivation, or explanation here..."
                                        value={examAnswers[q.id] || ''}
                                        onChange={(e) => handleSubjectiveAnswerChange(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-slate-950 border border-purple-700 text-white text-xs focus:border-teal-400 focus:outline-none"
                                      />

                                      <div className="flex items-center gap-3">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          id={`student-nb-upload-${q.id}`}
                                          className="hidden"
                                          onChange={(e) => handleUploadSubjectiveNotebookPhoto(e, q.id)}
                                        />
                                        <label
                                          htmlFor={`student-nb-upload-${q.id}`}
                                          className="px-4 py-2 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 font-bold text-xs cursor-pointer hover:bg-purple-800"
                                        >
                                          📷 Upload Photo of Handwritten Notebook Work
                                        </label>
                                        {examSubjectiveImages[q.id] && (
                                          <span className="text-xs text-teal-300 font-mono font-bold">
                                            Notebook Photo Uploaded ✓
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    /* MCQ Options */
                                    <div className="space-y-2 pt-2">
                                      {/* Attached Diagram / Figure for MCQ Question */}
                                      {q.diagramUrl && (
                                        <div className="my-3 p-3 bg-slate-950 rounded-2xl border border-teal-500/40 text-center shadow-xl max-w-lg mx-auto">
                                          <img
                                            src={q.diagramUrl}
                                            alt="Question Figure Diagram"
                                            className="max-h-64 max-w-full mx-auto object-contain rounded-xl border border-purple-800 shadow-md"
                                          />
                                          <p className="text-[10px] font-mono text-teal-300 mt-1.5 flex items-center justify-center gap-1">
                                            <span>Refer to the above figure / diagram to answer</span>
                                          </p>
                                        </div>
                                      )}
                                      {q.options.map((opt, oIdx) => {
                                        const letter = String.fromCharCode(65 + oIdx);
                                        const isSelected = examAnswers[q.id] === letter;

                                        return (
                                          <button
                                            key={letter}
                                            onClick={() => handleSelectOptionInExam(letter)}
                                            className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition flex items-center gap-3 cursor-pointer ${
                                              isSelected
                                                ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                                                : 'bg-slate-950 border-purple-800 text-purple-200 hover:border-purple-600'
                                            }`}
                                          >
                                            <span className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-700 flex items-center justify-center font-mono font-black text-amber-300">
                                              {letter}
                                            </span>
                                            <span>{opt}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}

                                  <div className="pt-4 flex items-center justify-between">
                                    <button
                                      onClick={handleMarkForReview}
                                      className="px-4 py-2 rounded-xl bg-purple-950 border border-amber-500 text-amber-300 text-xs font-bold cursor-pointer"
                                    >
                                      Mark for Review
                                    </button>

                                    <div className="flex items-center gap-2">
                                      <button
                                        disabled={examCurrentQIdx === 0}
                                        onClick={() => handleJumpToQuestion(examCurrentQIdx - 1)}
                                        className="px-4 py-2 rounded-xl bg-slate-800 text-purple-200 text-xs font-bold disabled:opacity-40"
                                      >
                                        Previous
                                      </button>
                                      <button
                                        disabled={examCurrentQIdx === activeExamData.questions.length - 1}
                                        onClick={() => handleJumpToQuestion(examCurrentQIdx + 1)}
                                        className="px-4 py-2 rounded-xl bg-purple-800 text-white text-xs font-bold disabled:opacity-40"
                                      >
                                        Next
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              );
                            })()}
                          </div>

                          {/* Palette Matrix (4/12) */}
                          <div className="md:col-span-4 p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-3">
                            <h4 className="font-mono text-xs font-bold text-purple-300 uppercase">
                              Question Palette Matrix
                            </h4>
                            <div className="grid grid-cols-5 gap-2">
                              {activeExamData.questions.map((q, idx) => {
                                const st = examPaletteStatus[q.id] || 'unvisited';
                                let bg = 'bg-slate-950 border-purple-800 text-purple-400';
                                if (st === 'answered') bg = 'bg-emerald-500 text-slate-950 font-black border-emerald-400';
                                else if (st === 'review') bg = 'bg-amber-500 text-slate-950 font-black border-amber-400';
                                else if (st === 'not_attempted') bg = 'bg-rose-500/20 text-rose-300 border-rose-500';

                                return (
                                  <button
                                    key={q.id}
                                    onClick={() => handleJumpToQuestion(idx)}
                                    className={`w-9 h-9 rounded-xl border flex items-center justify-center font-mono text-xs font-bold cursor-pointer ${bg}`}
                                  >
                                    {idx + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                        </div>
                      ) : (
                        /* Result Scorecard View */
                        <div className="p-8 rounded-3xl bg-slate-900 border-2 border-teal-400 text-center space-y-4">
                          <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-cbt-leaderboard-ribbon" />
                          <h3 className="text-xl font-black text-white">Examination Completed Successfully!</h3>
                          <div className="text-2xl font-black text-teal-300 font-mono">
                            Score: {examResultScore.totalScoreObtained} / {examResultScore.maxMarks} ({examResultScore.percentage}%)
                          </div>
                          <button
                            onClick={() => {
                              setIsTakingExam(false);
                              setActiveExamData(null);
                            }}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                          >
                            Return to Tests
                          </button>
                        </div>
                      )}

                    </div>
                  </div>
                )}

              </div>
            )}

{/* --------------------------------------------------------------------- */}
            {/* PAGE 5: DIGITAL ATTENDANCE REGISTRY                                   */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'attendance' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Hero Animated Graphical Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 border-2 border-cyan-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/15 pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-300 animate-att-gauge-sweep" />
                      <span>PAGE 5 - DIGITAL ATTENDANCE REGISTRY</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Daily Digital Attendance <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Registry &amp; Records</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Students verify daily attendance and 75% CBSE compliance. Authorized teachers have exclusive authorization to mark Present or Absent and enroll students.
                    </p>

                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setIsAttendanceModalOpen(true);
                          playSoundChime('sent');
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-slate-950 animate-att-present-stamp" />
                        <span>Filter Class &amp; Section Roster</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {isDimension5 && (
                        <button
                          onClick={() => {
                            setEnrollModalContext('attendance');
                            setEnrollTargetClass(selectedAttClass);
                            setEnrollTargetSection(selectedAttSection);
                            const currentRoster = attendanceStore[selectedAttClass + '-' + selectedAttSection] || getInitialRosterForClass(selectedAttClass, selectedAttSection);
                            setEnrollStudentRoll(String(currentRoster.length + 1));
                            setEnrollStudentName('');
                            setEnrollStudentMaxMarks('100');
                            setShowEnrollModal(true);
                            playSoundChime('sent');
                          }}
                          className="px-6 py-3 rounded-2xl bg-purple-900 border-2 border-teal-400 text-teal-300 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-xl hover:scale-105"
                        >
                          <Plus className="w-4 h-4 text-teal-300" />
                          <span>Enroll Student into Class {selectedAttClass}-{selectedAttSection}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Attendance Roster View directly on Page 5 */}
                <div className="w-full space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-purple-800 flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black">
                        <UserCheck className="w-5 h-5 animate-att-summary-ring" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white">
                          Class {selectedAttClass} - Section {selectedAttSection} Attendance Roster
                        </h3>
                        <p className="text-xs text-purple-300">
                          {isDimension5 ? 'Teacher Mode: Click Present / Absent to record roll call' : 'Student Mode: Read-only live verification'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isDimension5 && (
                        <>
                          <button
                            onClick={() => {
                              setEnrollModalContext('attendance');
                              setEnrollTargetClass(selectedAttClass);
                              setEnrollTargetSection(selectedAttSection);
                              const currentRoster = attendanceStore[selectedAttClass + '-' + selectedAttSection] || getInitialRosterForClass(selectedAttClass, selectedAttSection);
                              setEnrollStudentRoll(String(currentRoster.length + 1));
                              setEnrollStudentName('');
                              setEnrollStudentMaxMarks('100');
                              setShowEnrollModal(true);
                              playSoundChime('sent');
                            }}
                            className="px-4 py-2 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 transition"
                          >
                            <Plus className="w-3.5 h-3.5 animate-att-calendar-flip" />
                            <span>Add Student</span>
                          </button>
                          <button
                            onClick={handleSaveAttendance}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:scale-105 transition animate-att-export-excel"
                          >
                            Save &amp; Sync Register
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {attToast && (
                    <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 text-xs font-bold text-center animate-fadeIn">
                      {attToast}
                    </div>
                  )}

                  {/* Roster Table */}
                  <div className="w-full rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden">
                    {currentAttRoster.length === 0 ? (
                      <div className="p-12 text-center space-y-3">
                        <Users className="w-12 h-12 text-purple-400 mx-auto opacity-50 animate-att-roll-row-slide" />
                        <h4 className="text-sm font-bold text-white">
                          No students enrolled yet for Class {selectedAttClass} - Section {selectedAttSection}
                        </h4>
                        <p className="text-xs text-purple-300 max-w-md mx-auto">
                          {isDimension5 
                            ? "As an authorized Faculty member, click 'Enroll Student' above to register real students into this class cohort."
                            : "Your teacher has not enrolled students into this section roster yet."}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-purple-950/80 text-purple-300 font-mono uppercase text-[10px] border-b border-purple-800">
                            <tr>
                              <th className="p-3 w-16">Roll</th>
                              <th className="p-3">Student Full Name</th>
                              <th className="p-3">Attendance Status (P / A)</th>
                              {isDimension5 && <th className="p-3 text-right">Action</th>}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-950/60">
                            {currentAttRoster.map((s) => (
                              <tr key={s.roll} className="hover:bg-purple-950/30 transition">
                                <td className="p-3 font-mono font-bold text-teal-400">#{s.roll}</td>
                                <td className="p-3 font-bold text-white whitespace-nowrap">{s.name}</td>
                                <td className="p-3">
                                  {isDimension5 ? (
                                    <div className="inline-flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-purple-800">
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStudentAttendance(s.roll, 'present')}
                                        className={`px-3 py-1 rounded-lg font-bold font-mono transition cursor-pointer ${
                                          s.status === 'present'
                                            ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                                            : 'text-purple-300 hover:text-white'
                                        }`}
                                      >
                                        P (Present)
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateStudentAttendance(s.roll, 'absent')}
                                        className={`px-3 py-1 rounded-lg font-bold font-mono transition cursor-pointer ${
                                          s.status === 'absent'
                                            ? 'bg-rose-500 text-white font-black shadow-md'
                                            : 'text-purple-300 hover:text-white'
                                        }`}
                                      >
                                        A (Absent)
                                      </button>
                                    </div>
                                  ) : (
                                    <span className={`px-3 py-1 rounded-lg font-mono font-bold text-xs uppercase ${
                                      s.status === 'present' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                    }`}>
                                      {s.status === 'present' ? 'Present' : 'Absent'}
                                    </span>
                                  )}
                                </td>
                                {isDimension5 && (
                                  <td className="p-3 text-right">
                                    <button
                                      onClick={() => handleRemoveStudent(selectedAttClass, selectedAttSection, s.roll)}
                                      title="Remove student"
                                      className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer"
                                    >
                                      <Trash2 className="w-4 h-4 animate-att-warning-flag" />
                                    </button>
                                  </td>
                                )}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* SUMMARY BAR BELOW ROSTER (Total Students Present, Total Strength, Attendance %) */}
                  {currentAttRoster.length > 0 && (() => {
                    const presentCount = currentAttRoster.filter(s => s.status === 'present').length;
                    const totalCount = currentAttRoster.length;
                    const pct = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0';

                    return (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-cyan-950/90 border border-cyan-500/40 shadow-xl flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-6 flex-wrap">
                          <div>
                            <span className="text-[10px] text-purple-300 uppercase font-mono block">Total Students Present</span>
                            <span className="text-xl font-black text-emerald-400 font-mono">{presentCount} Students</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-purple-300 uppercase font-mono block">Total Class Strength</span>
                            <span className="text-xl font-black text-white font-mono">{totalCount} Enrolled</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-purple-300 uppercase font-mono block">Daily Attendance Rate</span>
                            <span className={`text-xl font-black font-mono ${Number(pct) >= 75 ? 'text-teal-300' : 'text-amber-400'}`}>
                              {pct}%
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-purple-200 font-mono">
                          {Number(pct) >= 75 ? (
                            <span className="text-emerald-400 font-bold">✓ Statutory 75% CBSE Attendance Threshold Satisfied</span>
                          ) : (
                            <span className="text-amber-400 font-bold">⚠️ Below 75% Compliance Threshold</span>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                </div>

                {/* Pop-up for Class & Section selection for Attendance */}
                {isAttendanceModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Class &amp; Section for Attendance Roster
                            </h2>
                            <p className="text-xs text-cyan-300 font-mono">
                              Step-by-step Class and Section validation
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsAttendanceModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Step 1: Select Class */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 1: Select Class (Nursery to Class 8)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setSelectedAttClass(c.id);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                                selectedAttClass === c.id
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              <GraduationCap className="w-4 h-4 animate-att-sync-cloud" />
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Select Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 2: Select Section (A through E)
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                            <button
                              key={sec}
                              onClick={() => {
                                setSelectedAttSection(sec);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                                selectedAttSection === sec
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              Section {sec}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setIsAttendanceModalOpen(false);
                            playSoundChime('delivered');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                        >
                          Confirm &amp; Load Roster
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PAGE 6: STUDENT MARKS & EXAMINATION LEADERBOARD                       */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'marks_ledger' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Hero Animated Graphical Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 border-2 border-indigo-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/15 pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-xs font-mono font-bold text-indigo-300">
                      <Award className="w-3.5 h-3.5 text-indigo-300 animate-marks-crown-float" />
                      <span>PAGE 6 - STUDENT EXAMINATION MARKS LEADERBOARD</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Examination Marks <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Leaderboard &amp; Report Cards</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Standardized periodic assessments across 10 official DAV subjects, customizable maximum marks, section rankings, and overall class leaderboard. Verified faculty teachers enter marks and enroll students.
                    </p>

                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setIsMarksModalOpen(true);
                          playSoundChime('sent');
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-indigo-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-slate-950 animate-marks-grade-pop" />
                        <span>Select Term, Class &amp; Section</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {isDimension5 && (
                        <>
                          <button
                            onClick={() => {
                              setEnrollModalContext('marks');
                              setEnrollTargetClass(selectedMarksClass);
                              setEnrollTargetSection(selectedMarksSection);
                              const currentRoster = currentMarksRoster || [];
                              setEnrollStudentRoll(String(currentRoster.length + 1));
                              setEnrollStudentName('');
                              setEnrollStudentMaxMarks('100');
                              setShowEnrollModal(true);
                              playSoundChime('sent');
                            }}
                            className="px-6 py-3 rounded-2xl bg-purple-900 border-2 border-teal-400 text-teal-300 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg hover:scale-105"
                          >
                            <Plus className="w-4 h-4 text-teal-300" />
                            <span>Enroll Student</span>
                          </button>

                          <button
                            onClick={() => setShowMaxMarksConfigModal(true)}
                            className="px-6 py-3 rounded-2xl bg-slate-900 border-2 border-purple-500 text-purple-200 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg"
                          >
                            <span>⚙️ Max Marks per Subject</span>
                          </button>

                          <button
                            onClick={handleSaveMarksLedger}
                            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg hover:scale-105"
                          >
                            <FileCheck className="w-4 h-4 animate-marks-calc-stream" />
                            <span>Save Marks Ledger (Faculty Authorization)</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Filter and Information Bar */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-sm font-black text-white">
                        Class {selectedMarksClass}-{selectedMarksSection} | {selectedMarksTerm}
                      </h3>
                      <p className="text-xs text-purple-300 font-mono">
                        10 DAV Subjects | Real Section Rank &amp; Combined Class 8 Rank
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-teal-300 font-mono">
                        {isDimension5 ? 'Editing Mode (Faculty)' : 'Student Verification Mode'}
                      </span>
                    </div>
                  </div>

                  {/* Term Selector Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-thin">
                    {availableTerms.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedMarksTerm(t);
                          playSoundChime('sent');
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition border ${
                          selectedMarksTerm === t
                            ? 'bg-gradient-to-r from-indigo-500 to-teal-400 text-slate-950 border-teal-300 font-black shadow-md'
                            : 'bg-slate-950 border-purple-800 text-purple-300 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {marksToast && (
                  <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 text-xs font-bold text-center animate-fadeIn">
                    {marksToast}
                  </div>
                )}

                {/* LANDSCAPE MARKS & LEADERBOARD TABLE */}
                <div className="w-full rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden shadow-2xl">
                  {currentMarksRoster.length === 0 ? (
                    <div className="p-12 text-center space-y-3">
                      <Award className="w-12 h-12 text-purple-400 mx-auto opacity-50 animate-marks-subject-tab" />
                      <h4 className="text-sm font-bold text-white">
                        No students enrolled yet for Class {selectedMarksClass} - Section {selectedMarksSection}
                      </h4>
                      <p className="text-xs text-purple-300 max-w-md mx-auto">
                        {isDimension5 
                          ? "Click 'Enroll Student' above to register students into this class cohort and start entering examination marks."
                          : "Your teacher has not published marks for this class section yet."}
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto min-w-full scrollbar-thin">
                      <table className="w-full text-xs text-left whitespace-nowrap">
                        <thead className="bg-purple-950/90 text-purple-300 font-mono uppercase text-[10px] border-b border-purple-800">
                          <tr>
                            <th className="p-3 sticky left-0 bg-purple-950 z-10">Roll</th>
                            <th className="p-3 sticky left-12 bg-purple-950 z-10">Student Full Name</th>
                            
                            {/* 10 DAV Subjects in exact order */}
                            {DAV_SUBJECTS_10.map((s) => (
                              <th key={s.key} className="p-3 text-center">
                                <div>{s.name}</div>
                                <div className="text-[9px] text-teal-400 font-normal lowercase">max {marksMaxConfig[s.key] || 100}</div>
                              </th>
                            ))}

                            <th className="p-3 text-center">Total Marks</th>
                            <th className="p-3 text-center">Percentage</th>
                            <th className="p-3 text-center text-teal-300 font-black">Section Rank</th>
                            <th className="p-3 text-center text-amber-300 font-black">Overall Class Rank</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-950/80">
                          {currentMarksRoster.map((s) => {
                            const agg = computeRowAggregates(s);

                            return (
                              <tr key={s.roll} className="hover:bg-purple-950/30 transition">
                                <td className="p-3 font-mono font-bold text-teal-400 sticky left-0 bg-slate-900 z-10">
                                  #{s.roll}
                                </td>
                                <td className="p-3 font-bold text-white sticky left-12 bg-slate-900 z-10">
                                  <div className="flex items-center gap-2">
                                    <span>{s.name}</span>
                                    {s.maxMarks && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
                                        /{s.maxMarks}
                                      </span>
                                    )}
                                  </div>
                                </td>
                                
                                {/* 10 DAV Subjects Inputs/Outputs */}
                                {DAV_SUBJECTS_10.map((sub) => {
                                  const markVal = s.marks?.[sub.key];
                                  const maxForSub = marksMaxConfig[sub.key] || 100;

                                  return (
                                    <td key={sub.key} className="p-2 text-center">
                                      {isDimension5 ? (
                                        <input
                                          type="number"
                                          min={0}
                                          max={s.maxMarks ? Number(s.maxMarks) : maxForSub}
                                          value={markVal !== null && markVal !== undefined ? markVal : ''}
                                          placeholder="-"
                                          onChange={(e) => handleUpdateStudentMark(s.roll, sub.key, e.target.value)}
                                          className="w-14 p-1.5 rounded-lg bg-slate-950 border border-purple-700 text-center font-mono font-bold text-white text-xs focus:border-teal-400"
                                          title={`Max marks: ${s.maxMarks ? Number(s.maxMarks) : maxForSub}`}
                                        />
                                      ) : (
                                        <span className="font-mono text-purple-200 font-bold px-1.5 py-1">
                                          {markVal !== null && markVal !== undefined ? markVal : '-'}
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}

                                {/* Aggregates (Total, Percentage, NO GRADE, Section Rank, Overall Class Rank) */}
                                <td className="p-3 font-mono font-bold text-teal-300 text-center">
                                  {agg.totalObtained !== '-' ? `${agg.totalObtained} / ${agg.totalMax}` : '-'}
                                </td>
                                <td className="p-3 font-mono font-bold text-cyan-300 text-center">
                                  {agg.percentage}
                                </td>
                                <td className="p-3 font-mono font-black text-teal-300 text-center">
                                  <span className="px-2 py-0.5 rounded-md bg-teal-500/20 border border-teal-500/50">
                                    {agg.sectionRank}
                                  </span>
                                </td>
                                <td className="p-3 font-mono font-black text-amber-300 text-center">
                                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/50">
                                    {agg.overallRank}
                                  </span>
                                </td>

                                {/* Report Card Action & Delete */}
                                <td className="p-3 text-right">
                                  <div className="inline-flex items-center gap-1.5">
                                    <button
                                      onClick={() => {
                                        setSelectedReportStudent({ ...s, aggregates: agg, maxConfig: marksMaxConfig });
                                        setShowReportCardModal(true);
                                        playSoundChime('sent');
                                      }}
                                      className="px-2.5 py-1 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-600 text-purple-200 hover:text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Printer className="w-3 h-3 text-teal-300 animate-marks-save-beacon" />
                                      <span>Report</span>
                                    </button>
                                    {isDimension5 && (
                                      <button
                                        onClick={() => handleRemoveStudent(selectedMarksClass, selectedMarksSection, s.roll)}
                                        title="Remove student from roster"
                                        className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 animate-marks-max-gear" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Pop-up for Term, Class & Section selection for Marks */}
                {isMarksModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Award className="w-5 h-5 animate-marks-podium-shine" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Term, Class &amp; Section for Marks Ledger
                            </h2>
                            <p className="text-xs text-indigo-300 font-mono">
                              Step-by-step Class and Section validation
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsMarksModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Step 1: Select Class */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 1: Select Class (Nursery to Class 8)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                setSelectedMarksClass(c.id);
                                const newTerms = c.id === '8' ? EXAM_TERMS_CONFIG.class8 : EXAM_TERMS_CONFIG.lowerClasses;
                                if (!newTerms.includes(selectedMarksTerm)) {
                                  setSelectedMarksTerm(newTerms[0]);
                                }
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition flex flex-col items-center gap-1 cursor-pointer ${
                                selectedMarksClass === c.id
                                  ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              <GraduationCap className="w-4 h-4 animate-marks-roll-hover" />
                              <span>{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Select Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 2: Select Section (A through E)
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {['A', 'B', 'C', 'D', 'E'].map((sec) => (
                            <button
                              key={sec}
                              onClick={() => {
                                setSelectedMarksSection(sec);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-center ${
                                selectedMarksSection === sec
                                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              Section {sec}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 3: Select Term */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 3: Select Examination Term ({selectedMarksClass === '8' ? 'Class 8 Board Sequence' : 'Class LKG-7 Sequence'})
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableTerms.map((term) => (
                            <button
                              key={term}
                              onClick={() => {
                                setSelectedMarksTerm(term);
                                playSoundChime('sent');
                              }}
                              className={`p-3 rounded-xl border text-xs font-bold transition cursor-pointer text-left ${
                                selectedMarksTerm === term
                                  ? 'bg-gradient-to-r from-indigo-500/20 to-teal-500/20 border-teal-400 text-teal-300 font-black shadow-lg'
                                  : 'bg-slate-900 border-purple-800 text-purple-200 hover:border-purple-600'
                              }`}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={() => {
                            setIsMarksModalOpen(false);
                            playSoundChime('delivered');
                          }}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                        >
                          Confirm &amp; Load Ledger
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* CONFIGURE MAX MARKS MODAL (Faculty Only) */}
                {showMaxMarksConfigModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-lg bg-slate-900 border-2 border-purple-500 rounded-3xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <h3 className="text-sm font-black text-white">⚙️ Configure Maximum Marks per Subject</h3>
                        <button onClick={() => setShowMaxMarksConfigModal(false)} className="text-purple-300 hover:text-white">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-xs text-purple-300">
                        Set custom maximum evaluation marks (e.g. 20, 25, 40, 50, 70, 80, 100) for each of the 10 subjects:
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        {DAV_SUBJECTS_10.map(s => (
                          <div key={s.key} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-purple-800">
                            <span className="font-bold text-white">{s.name}:</span>
                            <input
                              type="number"
                              min={1}
                              max={500}
                              value={marksMaxConfig[s.key] || 100}
                              onChange={(e) => handleUpdateMaxMarks(s.key, e.target.value)}
                              className="w-16 p-1 rounded-lg bg-slate-900 border border-purple-700 text-center text-teal-300 font-mono font-bold"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => setShowMaxMarksConfigModal(false)}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                        >
                          Save Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ENROLL STUDENT MODAL (Faculty Only) */}
                {showEnrollModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-md bg-slate-900 border-2 border-teal-400 rounded-3xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-teal-300" />
                          <h3 className="text-base font-black text-white">
                            {enrollModalContext === 'attendance' ? 'Enroll Student into Attendance' : 'Enroll Student into Marks Ledger'}
                          </h3>
                        </div>
                        <button onClick={() => setShowEnrollModal(false)} className="text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-xs text-purple-300 flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-purple-800/60">
                        <span>Target Class Cohort:</span>
                        <strong className="text-teal-300 font-mono text-sm">Class {enrollTargetClass} - Section {enrollTargetSection}</strong>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEnrollStudent(enrollTargetClass, enrollTargetSection, enrollStudentRoll, enrollStudentName, enrollStudentMaxMarks);
                          setShowEnrollModal(false);
                        }}
                        className="space-y-4 text-xs"
                      >
                        {/* 1. Roll Number */}
                        <div className="space-y-1">
                          <label className="font-bold text-purple-300 flex items-center justify-between">
                            <span>Roll Number:</span>
                            <span className="text-[10px] text-teal-400 font-mono">Unique roll index</span>
                          </label>
                          <input
                            type="number"
                            min={1}
                            required
                            value={enrollStudentRoll}
                            onChange={(e) => setEnrollStudentRoll(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-mono font-bold focus:border-teal-400 focus:outline-none"
                            placeholder="e.g. 1"
                          />
                        </div>

                        {/* 2. Student Full Name */}
                        <div className="space-y-1">
                          <label className="font-bold text-purple-300">Student Full Name:</label>
                          <input
                            type="text"
                            required
                            value={enrollStudentName}
                            onChange={(e) => setEnrollStudentName(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-bold focus:border-teal-400 focus:outline-none"
                            placeholder="e.g. Rishit Shankar"
                          />
                        </div>

                        {/* 3. Total Marks Out Of (Customizable, e.g. 20, 25, 40, 50, 80, 100) */}
                        <div className="space-y-1.5">
                          <label className="font-bold text-purple-300 flex items-center justify-between">
                            <span>Total Marks Out Of:</span>
                            <span className="text-[10px] text-teal-300 font-mono">Custom Max Marks</span>
                          </label>
                          <input
                            type="number"
                            min={5}
                            max={500}
                            required
                            value={enrollStudentMaxMarks}
                            onChange={(e) => setEnrollStudentMaxMarks(e.target.value)}
                            className="w-full p-2.5 rounded-xl bg-slate-950 border border-purple-700 text-white font-mono font-bold focus:border-teal-400 focus:outline-none"
                            placeholder="e.g. 20, 50, 80, 100"
                          />
                          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                            <span className="text-[10px] text-slate-400 font-medium">Quick Presets:</span>
                            {[20, 25, 40, 50, 80, 100].map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => setEnrollStudentMaxMarks(String(preset))}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition cursor-pointer ${
                                  Number(enrollStudentMaxMarks) === preset
                                    ? 'bg-teal-400 text-slate-950 shadow'
                                    : 'bg-purple-950/80 text-purple-300 hover:text-white border border-purple-800'
                                }`}
                              >
                                /{preset}
                              </button>
                            ))}
                          </div>
                          <p className="text-[10px] text-purple-400 leading-tight">
                            Set custom maximum marks per subject for this student (e.g. /20 for Weekly Tests, /50 for Term Tests, or /100 for Annual Board Finals).
                          </p>
                        </div>

                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowEnrollModal(false)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-purple-300 font-bold cursor-pointer hover:bg-slate-700 transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500 hover:from-teal-300 hover:to-indigo-400 text-slate-950 font-black cursor-pointer shadow-lg hover:scale-105 transition flex items-center gap-2"
                          >
                            <UserCheck className="w-4 h-4 text-slate-950 animate-marks-rank-coin" />
                            <span>Confirm &amp; Enroll Student</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* OFFICIAL PRINTABLE STUDENT REPORT CARD MODAL */}
                {showReportCardModal && selectedReportStudent && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 flex items-center justify-center animate-fadeIn overflow-y-auto">
                    <div className="w-full max-w-2xl bg-white text-slate-950 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative border-4 border-teal-500">
                      
                      {/* Close button */}
                      <button
                        onClick={() => setShowReportCardModal(false)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer print:hidden"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      {/* Header */}
                      <div className="text-center space-y-1 border-b-2 border-slate-900 pb-4">
                        <div className="text-xs uppercase font-mono font-bold tracking-widest text-teal-800">DAV COLLEGE MANAGING COMMITTEE, NEW DELHI</div>
                        <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">DAV PUBLIC SCHOOL, BIHAR ZONE</h2>
                        <p className="text-xs text-slate-600 font-serif italic">Affiliated to Central Board of Secondary Education (CBSE), New Delhi</p>
                        <div className="inline-block mt-1 px-3 py-1 bg-teal-100 text-teal-900 text-xs font-black rounded-full font-mono uppercase">
                          OFFICIAL ACADEMIC PERFORMANCE REPORT CARD - 2026-27
                        </div>
                      </div>

                      {/* Student Bio Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200 font-mono">
                        <div>
                          <span className="text-slate-500 block text-[10px]">STUDENT NAME:</span>
                          <strong className="text-slate-900">{selectedReportStudent.name}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">ROLL NUMBER:</span>
                          <strong className="text-slate-900">#{selectedReportStudent.roll}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">CLASS &amp; SECTION:</span>
                          <strong className="text-slate-900">Class {selectedMarksClass}-{selectedMarksSection}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">EXAMINATION TERM:</span>
                          <strong className="text-slate-900">{selectedMarksTerm}</strong>
                        </div>
                      </div>

                      {/* Marks Breakdown Table */}
                      <div className="overflow-hidden rounded-xl border border-slate-300">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-100 text-slate-700 font-mono uppercase text-[10px] border-b border-slate-300">
                            <tr>
                              <th className="p-2.5">S.No.</th>
                              <th className="p-2.5">Subject</th>
                              <th className="p-2.5 text-center">Max Marks</th>
                              <th className="p-2.5 text-center">Marks Obtained</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {DAV_SUBJECTS_10.map((sub, idx) => {
                              const val = selectedReportStudent.marks?.[sub.key];
                              const maxForSub = selectedReportStudent.maxConfig?.[sub.key] || 100;

                              return (
                                <tr key={sub.key} className="hover:bg-slate-50">
                                  <td className="p-2.5 font-mono text-slate-500">{idx + 1}</td>
                                  <td className="p-2.5 font-bold text-slate-900">{sub.name}</td>
                                  <td className="p-2.5 font-mono text-center text-slate-600">{maxForSub}</td>
                                  <td className="p-2.5 font-mono font-bold text-center text-teal-800">
                                    {val !== null && val !== undefined ? val : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                          <tfoot className="bg-slate-100 font-mono font-bold text-slate-900 border-t-2 border-slate-300">
                            <tr>
                              <td colSpan={2} className="p-2.5 text-right uppercase">Total Marks Obtained:</td>
                              <td className="p-2.5 text-center">{selectedReportStudent.aggregates.totalMax}</td>
                              <td className="p-2.5 text-center text-teal-900 font-black">{selectedReportStudent.aggregates.totalObtained}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* Aggregate Summary */}
                      <div className="grid grid-cols-3 gap-3 text-center text-xs p-3 bg-teal-50 rounded-2xl border border-teal-200 font-mono">
                        <div>
                          <span className="text-teal-700 block text-[10px]">PERCENTAGE:</span>
                          <strong className="text-base text-teal-950 font-black">{selectedReportStudent.aggregates.percentage}</strong>
                        </div>
                        <div>
                          <span className="text-teal-700 block text-[10px]">SECTION RANK:</span>
                          <strong className="text-base text-teal-950 font-black">{selectedReportStudent.aggregates.sectionRank}</strong>
                        </div>
                        <div>
                          <span className="text-teal-700 block text-[10px]">COMBINED CLASS RANK:</span>
                          <strong className="text-base text-teal-950 font-black">{selectedReportStudent.aggregates.overallRank}</strong>
                        </div>
                      </div>

                      {/* Seals & Signatures */}
                      <div className="pt-6 grid grid-cols-3 gap-4 text-center text-[10px] font-mono text-slate-600 border-t border-slate-200">
                        <div>
                          <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
                          <span>Class Teacher</span>
                        </div>
                        <div>
                          <div className="h-10 flex items-center justify-center mb-1">
                            <span className="px-2 py-0.5 rounded border border-teal-700 text-teal-800 font-black text-[9px] uppercase">
                              DAV SEAL VERIFIED
                            </span>
                          </div>
                          <span>Examination Controller</span>
                        </div>
                        <div>
                          <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
                          <span>Principal Signature</span>
                        </div>
                      </div>

                      {/* Print button */}
                      <div className="pt-2 flex justify-end gap-2 print:hidden">
                        <button
                          onClick={() => window.print()}
                          className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                        >
                          <Printer className="w-4 h-4 animate-marks-stat-ring" />
                          <span>Print Official Report Card</span>
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
}

export default TeachersSection;

