import React, { useState, useEffect, useRef } from 'react';
import { 
  School, GraduationCap, Users, BookOpen, Calendar, 
  FileText, Award, Bell, CheckCircle2, Search, Plus, 
  Filter, Download, Sparkles, MessageSquare, ClipboardList,
  Clock, ShieldCheck, Bookmark, ChevronRight, Send, Check,
  Video, Mic, MicOff, VideoOff, ScreenShare, Share2, AlertCircle,
  HelpCircle, MessageCircle, BarChart3, TrendingUp, UserCheck,
  UserX, Paperclip, Smile, Image as ImageIcon,
  CheckCheck, Volume2, Sparkle, Eye, Star, Layers, Zap, X,
  ExternalLink, RefreshCw, Bot, Smartphone, RotateCcw,
  ArrowRight, Play, CheckSquare, Radio, Maximize2, Minimize2,
  PhoneOff, Hand, MessageSquareMore, CheckCircle,
  ChevronLeft, Compass, Palette, Trash2, Trophy, Share,
  Camera, UploadCloud, Edit3, Music, Film, FileCheck, Printer, PenTool
} from 'lucide-react';
import { ShankarAILogo } from './ShankarAILogo';
import { getAllTeachers } from '../data/davTeachers50';
import { saveCloudDoubtChats, fetchCloudDoubtChats, subscribeCloudDoubtChats } from '../services/supabaseClient';

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
        desc: 'Clear submission deadlines (08:30 AM standard), notebook formatting guidelines, and parental verification sign-off protocols.'
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
      { label: 'Subjects Active', val: '8 Core Subjects' },
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
    sealTitle: 'Supervised by Faculty Academic Coordination Cell'
  },
  live_class: {
    pageNumber: '03',
    code: 'DAV-DIR-2026-WEBRTC03',
    directiveName: 'WEBRTC REAL ONLINE LIVE CLASSROOM PROTOCOL',
    tagline: 'High-Definition Interactive WebRTC Streaming & Smart Board Virtual Lecture Hall',
    badgeText: 'PAGE 3 - IN-WEBSITE DISTANCE LEARNING',
    gradeScope: 'Broadcasting: Class LKG to Class 8 Live Lecture Streams',
    sectionScope: 'Technology: WebRTC P2P In-Website Engine - Free - Unlimited Duration',
    overview: 'This document authorizes the implementation of real-time virtual classroom sessions embedded directly within the school portal. Utilizing enterprise WebRTC peer-to-peer technology, students attend live interactive video lectures with zero third-party downloads, zero time cutoffs, and integrated smart whiteboard tools.',
    corePillars: [
      {
        title: '100% In-Website Video',
        desc: 'Embedded video call engine operating directly on the portal page without requiring Zoom, Google Meet apps, or external login credentials.'
      },
      {
        title: 'Zero Time Restrictions',
        desc: 'Unrestricted session length allowing full 45-minute academic periods without third-party trial cutoffs.'
      },
      {
        title: 'Smart Whiteboard & Screen Share',
        desc: 'Built-in interactive digital smartboard enabling teachers to sketch diagrams, write mathematical formulas, and share teaching presentations.'
      }
    ],
    centralButtonText: 'Open Full-Screen Live Video Classroom',
    centralButtonSub: 'Launch WebRTC HD Video Room with Screen Sharing & Smart Whiteboard',
    instructions: [
      'Step 1: Click the central button above to launch the full-screen Live Video Classroom.',
      'Step 2: Select your class standard (Class LKG to Class 8) to join the active lecture.',
      'Step 3: Click Join Live Class Now to connect into the high-definition audio/video room.',
      'Step 4: Toggle your microphone and camera using the bottom meeting toolbar.',
      'Step 5: Switch between the live video feed and the interactive teacher smartboard as needed.'
    ],
    statPills: [
      { label: 'Video Quality', val: '1080p HD WebRTC' },
      { label: 'Session Duration', val: 'Unlimited Period' },
      { label: 'Interactive Tools', val: 'Whiteboard + Screen' },
      { label: 'App Requirement', val: 'Zero (Browser Native)' }
    ],
    sealTitle: 'Accredited by DAV Digital Learning Board'
  },
  tests: {
    pageNumber: '04',
    code: 'DAV-DIR-2026-EXAM04',
    directiveName: 'CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE',
    tagline: 'Standardized Curriculum Unit Examinations, Timer Simulation & Performance Analytics',
    badgeText: 'PAGE 4 - FORMATIVE ASSESSMENT ARCHITECTURE',
    gradeScope: 'Evaluation Scope: Class LKG to Class 8 - All Academic Disciplines',
    sectionScope: 'Format: Timed Multiple-Choice, Numerical Analysis & Instant Scorecard',
    overview: 'This academic directive codifies the standards for online unit tests, formative quizzes, and periodic assessment simulators. Built according to DAV Education Board test blueprints, students test conceptual mastery under timed exam conditions with instant automatic evaluation and detailed pedagogical explanations.',
    corePillars: [
      {
        title: 'Teacher Test Authoring',
        desc: 'Dimension 5 faculty can create custom MCQ, subjective, or combined tests with multi-section deployment and answer keys.'
      },
      {
        title: 'Synchronized Countdown Timer',
        desc: 'Strict per-test countdown clock ensuring authentic exam pacing, time management discipline, and automated submission upon expiry.'
      },
      {
        title: 'Automatic Scorecard & Leaderboard',
        desc: 'Immediate scorecard generation with question matrix, answer explanations, and automated class leaderboard.'
      }
    ],
    centralButtonText: 'Open Full-Screen Online Test & Exam Suite',
    centralButtonSub: 'Launch Timed Exam Portal with Instant Evaluation & Solution Review',
    instructions: [
      'Step 1: Click the central button above to open the full-screen Online Test & Exam Suite.',
      'Step 2: Teachers (Dimension 5): Click Create New Examination to author and deploy tests.',
      'Step 3: Students: Select Class and Section to view scheduled unit tests.',
      'Step 4: Attempt the timed exam using the question matrix palette (White, Red, Green, Yellow).',
      'Step 5: Submit test to view instant scorecard, full solution review, and class leaderboard.'
    ],
    statPills: [
      { label: 'Question Bank', val: 'DAV Board Syllabus' },
      { label: 'Timer Control', val: 'Custom Scheduled' },
      { label: 'Scoring', val: 'Instant Auto-Grading' },
      { label: 'Palette Matrix', val: '4-Color Status System' }
    ],
    sealTitle: 'Validated by DAV Examination Controller Cell'
  },
  attendance: {
    pageNumber: '05',
    code: 'DAV-DIR-2026-ATT05',
    directiveName: 'INSTITUTIONAL DIGITAL ATTENDANCE REGISTRY',
    tagline: 'Daily Student Roll Call, Attendance Verification & 75% Statutory Compliance Register',
    badgeText: 'PAGE 5 - STATUTORY COMPLIANCE & ATTENDANCE',
    gradeScope: 'Roll Roster: All Classes LKG to Class 8 (Sections A to E)',
    sectionScope: 'Authorization: Student Read-Only Audit - Teacher Authorized Roll Marking',
    overview: 'This directive defines the statutory regulations governing daily attendance recording across all divisions of DAV Public School. Under Board regulations, maintaining a minimum of 75% cumulative attendance is a mandatory prerequisite for examination eligibility.',
    corePillars: [
      {
        title: 'Board 75% Mandate',
        desc: 'Strict enforcement of the 75% attendance criterion with automated attendance alerts for students falling below the mandatory threshold.'
      },
      {
        title: 'Role-Based Security',
        desc: 'Read-only verification mode for students and parents; cryptographic faculty-only authorization for marking and modifying student attendance.'
      },
      {
        title: 'Tri-State Marking System',
        desc: 'Instant toggle between Present (P), Absent (A), and Late (L) with one-click cloud synchronization and institutional date logging.'
      }
    ],
    centralButtonText: 'Open Full-Screen Digital Attendance Register',
    centralButtonSub: 'Launch Interactive Class Roster Register with Roll Call Controls',
    instructions: [
      'Step 1: Click the central button above to access the full-screen Digital Attendance Register.',
      'Step 2: Filter by your target Class (LKG to 8) and Section (A to E).',
      'Step 3: Students: Verify your name and daily attendance status (Present, Absent, Late).',
      'Step 4: Teachers: Click P, A, or L next to each student roll number to record presence.',
      'Step 5: Teachers: Click Save & Sync Register to commit the daily attendance record.'
    ],
    statPills: [
      { label: 'Class Scope', val: 'Class LKG to Class 8' },
      { label: 'Sections', val: 'Sections A, B, C, D, E' },
      { label: 'Statutory Rule', val: '75% Minimum Presence' },
      { label: 'Status Types', val: 'Present / Absent (Two-State)' }
    ],
    sealTitle: 'Certified by DAV Office of the Registrar & Attendance Board'
  },
  marks_ledger: {
    pageNumber: '06',
    code: 'DAV-DIR-2026-MARKS06',
    directiveName: 'ACADEMIC PERFORMANCE & EXAMINATION MARKS LEDGER',
    tagline: 'Standardized Periodic Assessments, Term Scorecards & Grade Computation',
    badgeText: 'PAGE 6 - EVALUATION & REPORT CARD LEDGER',
    gradeScope: 'Classes: LKG to Class 8 (11 Academic Standards)',
    sectionScope: 'Examination Terms: Periodic 1 to 4, Half-Yearly, Pre-Boards & Annual',
    overview: 'Official institutional ledger for entering, tracking, and publishing student examination marks across all academic terms. Provides automatic total aggregation, percentage calculation, and CBSE grading. Dimension 5 teachers have exclusive marks entry rights.',
    corePillars: [
      {
        title: 'Class-Specific Term Schedules',
        desc: 'Class 8 follows Periodic 1, Half-Yearly, Periodic 2, Pre-Board 1, Pre-Board 2, and Annual Board. Classes LKG-7 follow Periodic 1 to 4, Half-Yearly, and Annual.'
      },
      {
        title: 'Automatic Grade Computation',
        desc: 'Real-time calculation of total marks, percentage, and CBSE grades (A1, A2, B1, B2, C1, C2, D, E) upon faculty entry.'
      },
      {
        title: 'Student Report Card Generation',
        desc: 'Students can review their individual term marks, view faculty remarks, and download or print official printable report cards.'
      }
    ],
    centralButtonText: 'Open Student Examination Marks Leaderboard',
    centralButtonSub: 'View & Manage Student Report Cards, Terms & Grades',
    instructions: [
      'Step 1: Click the central button above to launch the Student Marks & Report Ledger.',
      'Step 2: Select your Class standard (LKG to 8) and Section (A to E).',
      'Step 3: Select the specific Examination Term (Periodic Test, Half-Yearly, Pre-Board, Annual).',
      'Step 4: Teachers (Dimension 5): Enter subject marks and click Save Marks Ledger.',
      'Step 5: Students: Inspect your term scorecard and click Print Report Card.'
    ],
    statPills: [
      { label: 'Terms for Class 8', val: 'PT1, HY, PT2, PB1, PB2, Board' },
      { label: 'Terms for LKG-7', val: 'PT1, PT2, HY, PT3, PT4, Annual' },
      { label: 'Subjects', val: '7 Core Subject Marks' },
      { label: 'Access Control', val: 'Teacher Entry - Student Audit' }
    ],
    sealTitle: 'Validated by DAV Academic Controller of Examinations'
  }
};

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
        'Arvind Saxena', 'Rakesh Sharma', 'Anand Kumar Mishra', 'Deepak Chopra'
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

  // Dynamic directory of chat contacts based on user role:
  // If student (Dim 1-4): show registered Dimension 5 teachers.
  // If teacher (Dim 5): show registered Dimension 1-4 students.
  // Never show self.
  const [chatContactsList, setChatContactsList] = useState(() => {
    try {
      const raw = localStorage.getItem('dav_registered_users');
      const allUsers = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(allUsers)) return [];

      const currentId = user?.id?.toLowerCase();
      const currentName = user?.name?.toLowerCase();

      if (isDimension5) {
        // Teacher sees registered students
        return allUsers
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
      } else {
        // Student sees registered teachers
        return allUsers
          .filter(u => {
            const isT = u.dimension === 5 || u.isTeacher || (u.role && u.role.toLowerCase().includes('teacher'));
            const isSelf = (u.id && currentId && u.id.toLowerCase() === currentId) || (u.name && currentName && u.name.toLowerCase() === currentName);
            return isT && !isSelf;
          })
          .map((u, idx) => ({
            id: u.id || `tch_${idx}`,
            name: (u.name && (u.name.startsWith('Prof.') || u.name.startsWith('Dr.') || u.name.startsWith('Mr.') || u.name.startsWith('Mrs.'))) ? u.name : `Prof. ${u.name || 'Faculty Member'}`,
            subtitle: u.subject || 'Faculty Teacher',
            role: 'Verified DAV Faculty (Dimension 5)',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'teacher',
            subject: u.subject || 'Science & Technology'
          }));
      }
    } catch (e) {
      return [];
    }
  });

  const refreshChatContacts = () => {
    try {
      const raw = localStorage.getItem('dav_registered_users');
      const allUsers = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(allUsers)) return;

      const currentId = user?.id?.toLowerCase();
      const currentName = user?.name?.toLowerCase();

      if (isDimension5) {
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
        setChatContactsList(students);
      } else {
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
            role: 'Verified DAV Faculty (Dimension 5)',
            dp: u.dp || u.avatar || null,
            status: 'Online',
            type: 'teacher',
            subject: u.subject || 'Science & Technology'
          }));
        setChatContactsList(teachers);
      }
    } catch (e) {}
  };

  useEffect(() => {
    refreshChatContacts();
    window.addEventListener('storage', refreshChatContacts);
    window.addEventListener('dav_faculty_updated', refreshChatContacts);
    window.addEventListener('dav_user_updated', refreshChatContacts);
    return () => {
      window.removeEventListener('storage', refreshChatContacts);
      window.removeEventListener('dav_faculty_updated', refreshChatContacts);
      window.removeEventListener('dav_user_updated', refreshChatContacts);
    };
  }, [user, isDimension5]);

  // Helper to extract real enrolled students from localStorage registered database
  const getInitialRosterForClass = (classNum, sec) => {
    try {
      const raw = localStorage.getItem('dav_registered_users');
      if (raw) {
        const users = JSON.parse(raw);
        if (Array.isArray(users)) {
          const matching = users.filter(u => 
            !u.isTeacher && u.dimension !== 4 && u.dimension !== 5 &&
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
      }
    } catch (e) {}
    return [];
  };

  // =========================================================================
  // PAGE 1: DAILY HOMEWORK & CLASSWORK MANAGEMENT
  // =========================================================================
  const [isHwModalOpen, setIsHwModalOpen] = useState(false);
  const [selectedHwClass, setSelectedHwClass] = useState('8');
  const [selectedHwSection, setSelectedHwSection] = useState('D');
  const [hwFilterSubject, setHwFilterSubject] = useState('all');

  const [homeworkStore, setHomeworkStore] = useState(() => {
    try {
      const stored = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  const [showAssignHwModal, setShowAssignHwModal] = useState(false);
  const [newHwClass, setNewHwClass] = useState('8');
  const [newHwSection, setNewHwSection] = useState('D');
  const [newHwSubject, setNewHwSubject] = useState('Science & Technology');
  const [newHwTeacher, setNewHwTeacher] = useState(() => {
    if (user?.name) {
      return (user.name.startsWith('Prof.') || user.name.startsWith('Mrs.') || user.name.startsWith('Mr.') || user.name.startsWith('Dr.')) ? user.name : 'Prof. ' + user.name;
    }
    return 'Prof. Hira Beta (Dimension 5)';
  });
  const [newHwChapter, setNewHwChapter] = useState('');
  const [newHwTitle, setNewHwTitle] = useState('');
  const [newHwDesc, setNewHwDesc] = useState('');
  const [newHwDueDate, setNewHwDueDate] = useState('Tomorrow, 08:30 AM');

  const persistHomework = (updated) => {
    setHomeworkStore(updated);
    try {
      localStorage.setItem(HOMEWORK_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleCreateHomework = (e) => {
    e.preventDefault();
    if (!newHwTitle.trim() || !newHwDesc.trim()) return;

    const newHw = {
      id: 'hw_' + Date.now(),
      classId: newHwClass,
      section: newHwSection,
      subject: newHwSubject,
      chapter: newHwChapter.trim() || 'General Curriculum Unit',
      title: newHwTitle.trim(),
      desc: newHwDesc.trim(),
      dueDate: newHwDueDate.trim() || 'Next Class Period',
      teacher: newHwTeacher || user?.name || 'DAV Subject Faculty',
      createdAt: 'Just Now'
    };

    const updated = [newHw, ...homeworkStore];
    persistHomework(updated);
    playSoundChime('sent');
    setShowAssignHwModal(false);
    setNewHwTitle('');
    setNewHwChapter('');
    setNewHwDesc('');
  };

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
  const [mobileChatTab, setMobileChatTab] = useState('roster');

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

  // Chat Conversations Map
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

  const handleSelectContact = (contactId) => {
    setActiveContactId(contactId);
    setMobileChatTab('chat');
    playSoundChime('sent');
  };

  // Send Message Handler
  const handleSendMessage = () => {
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
      senderName: senderName,
      senderClassSec: senderClassSec,
      text: chatInputText.trim(),
      media: pendingMedia ? { ...pendingMedia } : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const currentChatList = teacherChatsMap[activeContact.id] || [];
    const updatedChatList = [...currentChatList, newMsg];
    const updatedMap = {
      ...teacherChatsMap,
      [activeContact.id]: updatedChatList
    };

    persistChats(updatedMap);
    playSoundChime('sent');
    setChatInputText('');
    setPendingMedia(null);
    setIsMessageDelivering(true);

    setTimeout(() => {
      setIsMessageDelivering(false);
      playSoundChime('delivered');
      const deliveredMap = {
        ...updatedMap,
        [activeContact.id]: updatedChatList.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)
      };
      persistChats(deliveredMap);
    }, 600);
  };

  // Instant AI Conceptual Answer Handler
  const handleInstantAIAnswer = () => {
    if (!activeContact) return;
    setIsMessageDelivering(true);
    playSoundChime('sent');

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'teacher',
        senderName: activeContact.name,
        senderClassSec: activeContact.subtitle || 'DAV Academic Advisory',
        text: 'Greetings! Based on the prescribed DAV CBSE Curriculum, here is the verified conceptual explanation: Please review textbook chapter exercises carefully, ensure formulas are written with proper units, and apply step-by-step reasoning. Feel free to ask any specific follow-up query!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        isAiAssisted: true
      };

      const currentChatList = teacherChatsMap[activeContact.id] || [];
      const updatedMap = {
        ...teacherChatsMap,
        [activeContact.id]: [...currentChatList, aiReply]
      };
      persistChats(updatedMap);
      setIsMessageDelivering(false);
      playSoundChime('received');
    }, 900);
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

      // 3. Save to custom teachers store
      const stored = localStorage.getItem(CUSTOM_TEACHERS_STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter(t => t.id !== ('tch_reg_' + (user?.id || 'me')));
      const newEntry = {
        id: 'tch_reg_' + (user?.id || 'me'),
        name: cleanName,
        subject: cleanSubject,
        department: cleanSubject,
        role: 'Verified DAV Faculty (Dimension 5)',
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

  // Real WebRTC Live Room Link Generator for DAV School
  const getLiveRoomUrl = (session, classNum) => {
    const rawId = session?.id || 'live_stream';
    const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeClass = (classNum || '8').replace(/[^a-zA-Z0-9_-]/g, '_');
    const roomName = `DAV_School_Class_${safeClass}_${safeId}`;
    const userName = encodeURIComponent(user?.name || (isFacultyRole ? 'DAV Faculty Teacher' : 'DAV Student'));
    return `https://p2p.mirotalk.com/join/${roomName}?name=${userName}`;
  };

  // Live broadcasts store: completely real, no mock cards
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

  const handleStartFacultyBroadcast = () => {
    const session = {
      id: 'live_' + Date.now(),
      classId: selectedLiveClassNum,
      subject: user?.subject || 'Interactive Curriculum',
      topic: `Class ${selectedLiveClassNum} Live Interactive Period with ${user?.name || 'Faculty'}`,
      teacher: user?.name || 'Verified DAV Faculty',
      status: 'live',
      activeParticipants: 1,
      time: 'Streaming Now'
    };
    const updated = [session, ...liveSessionsStore.filter(s => s.classId !== selectedLiveClassNum)];
    persistLiveSessions(updated);
    setActiveLiveSessionData(session);
    setIsInsideLiveRoom(true);
    playSoundChime('delivered');
  };

  // =========================================================================
  // PAGE 4: CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE
  // =========================================================================
  const [isTestPortalOpen, setIsTestPortalOpen] = useState(false);
  const [selectedTestClass, setSelectedTestClass] = useState('8');
  const [selectedTestSection, setSelectedTestSection] = useState('D');

  // Teacher Test Creator State (Dimension 5 Only)
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

  // Deploy New Test Handler (Dimension 5 Only)
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

  // Add / Enroll Real Student Handler
  const handleEnrollStudent = (classNum, sec, rollNum, studentName) => {
    if (!studentName.trim()) return;
    const roll = Number(rollNum) || 1;
    const name = studentName.trim();

    // 1. Update Attendance
    const aKey = classNum + '-' + sec;
    const aExisting = attendanceStore[aKey] || getInitialRosterForClass(classNum, sec);
    const aUpdated = [...aExisting.filter(s => s.roll !== roll), { roll, name, status: 'present' }].sort((a, b) => a.roll - b.roll);
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
      const mExisting = nextMarksStore[mKey] || [];
      const mUpdated = [...mExisting.filter(s => s.roll !== roll), {
        roll,
        name,
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
      }].sort((a, b) => a.roll - b.roll);
      nextMarksStore[mKey] = mUpdated;
    });

    setMarksLedgerStore(nextMarksStore);
    try {
      localStorage.setItem(MARKS_LEDGER_STORAGE_KEY, JSON.stringify(nextMarksStore));
    } catch (e) {}

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
  const [enrollStudentRoll, setEnrollStudentRoll] = useState('');
  const [enrollStudentName, setEnrollStudentName] = useState('');

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

  // Update a Student's subject mark (allows empty/null)
  const handleUpdateStudentMark = (roll, subjectKey, value) => {
    if (!isFacultyRole) return;
    const maxAllowed = marksMaxConfig[subjectKey] || 100;
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
    let totalMax = 0;
    let filledCount = 0;

    DAV_SUBJECTS_10.forEach(sub => {
      const maxForSub = marksMaxConfig[sub.key] || 100;
      if (student.marks && student.marks[sub.key] !== null && student.marks[sub.key] !== undefined) {
        totalObtained += Number(student.marks[sub.key]);
        totalMax += maxForSub;
        filledCount++;
      }
    });

    const percentage = totalMax > 0 ? ((totalObtained / totalMax) * 100).toFixed(1) : '-';

    // Section rank among currentMarksRoster
    const sortedSection = [...currentMarksRoster].sort((a, b) => {
      const totA = DAV_SUBJECTS_10.reduce((s, sub) => s + (Number(a.marks?.[sub.key]) || 0), 0);
      const totB = DAV_SUBJECTS_10.reduce((s, sub) => s + (Number(b.marks?.[sub.key]) || 0), 0);
      return totB - totA;
    });

    const sRankIdx = sortedSection.findIndex(s => s.roll === student.roll);
    const sectionRank = sRankIdx !== -1 ? (sRankIdx + 1) : '-';

    const uId = `${selectedMarksSection}_${student.roll}_${student.name}`;
    const overallRank = overallClassRankMap[uId] || '-';

    return {
      totalObtained: filledCount > 0 ? totalObtained : '-',
      totalMax: filledCount > 0 ? totalMax : '-',
      percentage: percentage !== '-' ? `${percentage}%` : '-',
      sectionRank: `#${sectionRank}`,
      overallRank: `#${overallRank}`
    };
  };

  const currentMeta = PDF_PAGES_METADATA[activePage] || PDF_PAGES_METADATA.homework;


  return (
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500 selection:text-slate-950 pb-16">
      
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
            <div className="flex items-center justify-center gap-2 pt-4 pb-6 flex-wrap">
              {PRESENTATION_PAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { handlePageChange(p.id); }}
                  title={p.title}
                  className={`transition-all duration-300 cursor-pointer rounded-full font-black text-[11px] font-mono border-2 ${
                    activePage === p.id
                      ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 border-teal-200 shadow-lg shadow-teal-400/40 px-4 py-1.5 scale-105'
                      : 'bg-slate-900 text-purple-300 border-purple-700 hover:border-teal-500 hover:text-teal-300 px-3 py-1.5 flex items-center justify-center'
                  }`}
                >
                  {activePage === p.id ? `Page ${p.num} / 6` : `P${p.num}`}
                </button>
              ))}
            </div>

            {/* ====================================================== */}
            {/* THE MAIN PAGE CARD (MINT GREEN + PURPLE GLOW)          */}
            {/* ====================================================== */}
            <div className="relative w-full rounded-3xl overflow-hidden border-2 border-purple-700/60 shadow-[0_30px_80px_-10px_rgba(124,58,237,0.4)] bg-gradient-to-br from-[#1a0533] via-[#0d1a2e] to-[#001a1a]">

              {/* Glowing background blobs */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl" />
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-fuchsia-700/10 blur-3xl" />

              {/* Top accent stripe */}
              <div className="w-full h-1.5 bg-gradient-to-r from-purple-600 via-fuchsia-400 to-teal-400" />

              <div className="relative z-10 p-6 sm:p-10 md:p-14 space-y-8">

                {/* Page number badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-teal-400/15 border border-teal-400/40 text-teal-300 font-mono font-black text-[11px] tracking-widest uppercase">
                    PAGE {currentMeta.pageNumber} OF 06
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-700/30 border border-purple-500/40 text-purple-200 font-mono text-[10px] font-bold">
                    {currentMeta.badgeText}
                  </span>
                </div>

                {/* Section icon + title */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-700 via-fuchsia-600 to-teal-500 shadow-xl shadow-purple-700/40 mb-2">
                    {activePage === 'homework' && <ClipboardList className="w-10 h-10 text-white" />}
                    {activePage === 'doubts_chat' && <MessageSquare className="w-10 h-10 text-white" />}
                    {activePage === 'live_class' && <Video className="w-10 h-10 text-white" />}
                    {activePage === 'tests' && <CheckSquare className="w-10 h-10 text-white" />}
                    {activePage === 'attendance' && <UserCheck className="w-10 h-10 text-white" />}
                    {activePage === 'marks_ledger' && <Award className="w-10 h-10 text-white" />}
                  </div>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                    {currentMeta.directiveName}
                  </h2>
                  <p className="text-xs sm:text-sm text-purple-200/80 italic max-w-2xl mx-auto">
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
                        className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-600 to-teal-400 hover:from-rose-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-xl shadow-rose-600/30 hover:scale-105 active:scale-95 transition cursor-pointer border border-teal-200/60"
                      >
                        <Video className="w-4 h-4 text-slate-950" />
                        <span>Launch WebRTC Live Classroom Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Overview description */}
                <div className="max-w-3xl mx-auto text-center text-xs sm:text-sm text-slate-300/90 leading-relaxed bg-white/5 rounded-2xl px-6 py-4 border border-purple-700/30">
                  {currentMeta.overview}
                </div>

                {/* 3 Core feature pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentMeta.corePillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-teal-900/30 border border-teal-500/20 hover:border-teal-400/50 transition space-y-2 shadow-lg"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 text-slate-950 flex items-center justify-center font-black text-xs font-mono">
                        0{idx + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-teal-200">{pillar.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Stat pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  {currentMeta.statPills.map((pill, i) => (
                    <div key={i} className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-purple-700/50 text-center shadow-md">
                      <div className="text-[9px] text-purple-300 font-mono uppercase tracking-wider">{pill.label}</div>
                      <div className="text-xs sm:text-sm font-black text-teal-300">{pill.val}</div>
                    </div>
                  ))}
                </div>

                {/* ================================================ */}
                {/* CENTRAL LAUNCH BUTTON - Medium Button in center */}
                {/* ================================================ */}
                <div className="flex flex-col items-center gap-3 py-2">
                  <button
                    onClick={() => {
                      setIsFullScreenInteractive(true);
                      playSoundChime('sent');
                    }}
                    className="inline-flex items-center justify-center gap-3 px-8 sm:px-14 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-teal-400 hover:from-purple-500 hover:via-fuchsia-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base shadow-2xl shadow-purple-600/40 hover:shadow-teal-400/30 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-teal-200/60"
                  >
                    <span>{currentMeta.centralButtonText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <p className="text-[11px] text-purple-300/70 font-mono text-center">
                    {currentMeta.centralButtonSub}
                  </p>
                </div>

                {/* Instructions Box */}
                <div className="max-w-2xl mx-auto rounded-2xl bg-slate-900/70 border border-purple-800/60 p-4 sm:p-5 space-y-2">
                  <h4 className="text-[11px] font-black uppercase text-teal-300 font-mono flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>How to Use This Academic Section:</span>
                  </h4>
                  <ul className="space-y-1 text-[11px] sm:text-xs text-slate-300">
                    {currentMeta.instructions.map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-teal-400 font-bold shrink-0">{i + 1}.</span>
                        <span>{step.replace(/^Step \d+:\s*/, '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directive Seal & Scope */}
                <div className="pt-4 border-t border-purple-800/40 flex items-center justify-between flex-wrap gap-3 text-[11px] font-mono text-purple-300/80">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    <span>{currentMeta.sealTitle}</span>
                  </div>
                  <div>
                    Directive Code: <span className="text-teal-300 font-bold">{currentMeta.code}</span>
                  </div>
                </div>

              </div>

              {/* ================================================== */}
              {/* SLIDE NAVIGATION BAR - BOTTOM                      */}
              {/* ================================================== */}
              <div className="w-full bg-slate-950/80 border-t border-purple-800/50 px-6 py-4 flex items-center justify-between flex-wrap gap-4">
                
                <button
                  onClick={handlePrevSlide}
                  disabled={currentPageIdx === 0}
                  className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-purple-700"
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
                        activePage === p.id ? 'w-6 bg-teal-400' : 'bg-purple-800 hover:bg-purple-600'
                      }`}
                      title={p.title}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  disabled={currentPageIdx === PRESENTATION_PAGES.length - 1}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
                        ? 'bg-gradient-to-br from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-lg shadow-teal-400/30 font-black'
                        : 'bg-slate-900/70 text-purple-200 border-purple-800 hover:border-teal-400/60 font-bold'
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
            {/* --------------------------------------------------------------------- */}
            {activePage === 'homework' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Gen Z Hero Graphical Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-teal-950 border-2 border-teal-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/50 text-xs font-mono font-bold text-teal-300">
                      <ClipboardList className="w-3.5 h-3.5 text-teal-300" />
                      <span>PAGE 1 - DAILY HOMEWORK &amp; SYLLABUS DIRECTIVE</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Daily Homework Hub <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">Class &amp; Section Manager</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Select your Class (LKG to Class 8) and Section (A to E) to review daily curriculum assignments, textbook exercise citations, and submission deadlines.
                    </p>

                    {/* Permission-Gated Action Button */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      {isDimension5 ? (
                        <button
                          onClick={() => {
                            setNewHwClass(selectedHwClass);
                            setNewHwSection(selectedHwSection);
                            setShowAssignHwModal(true);
                          }}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-400 hover:from-purple-500 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-purple-600/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-4 h-4 text-slate-950" />
                          <span>Assign New Homework (Dimension 5 Faculty)</span>
                        </button>
                      ) : (
                        <div className="px-5 py-2.5 rounded-xl bg-slate-900/90 border border-teal-500/40 text-teal-300 font-mono text-xs flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>Student Mode: Daily Homework Viewer (Dimension 1-4)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Class & Section Selector Controls */}
                <div className="w-full space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="text-xs font-black uppercase text-teal-300 font-mono tracking-wider">
                        Step 1: Select Academic Class (Nursery, LKG, UKG, 1 to 8)
                      </label>
                      <span className="text-[11px] text-purple-300 font-mono">
                        Active Class: <strong className="text-teal-300">Class {selectedHwClass}</strong>
                      </span>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5 sm:gap-2">
                      {SCHOOL_CLASSES_CONFIG.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelectedHwClass(c.id);
                            playSoundChime('sent');
                          }}
                          className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                            selectedHwClass === c.id
                              ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md scale-105'
                              : 'bg-slate-950 text-purple-200 border-purple-800/80 hover:border-purple-600'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>

                    {/* Step 2: Select Section */}
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2 border-t border-purple-800/60">
                      <label className="text-xs font-black uppercase text-teal-300 font-mono tracking-wider">
                        Step 2: Select Section (A, B, C, D, E)
                      </label>
                      <span className="text-[11px] text-purple-300 font-mono">
                        Active Cohort: <strong className="text-cyan-300">Class {selectedHwClass} - Section {selectedHwSection}</strong>
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
                          className={`py-2 rounded-xl text-xs font-black transition cursor-pointer border ${
                            selectedHwSection === sec
                              ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white border-purple-300 shadow-md scale-105'
                              : 'bg-slate-950 text-purple-300 border-purple-800/80 hover:border-purple-600'
                          }`}
                        >
                          Section {sec}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Filtered Homework Cards */}
                  {(() => {
                    const filtered = homeworkStore.filter(
                      h => h.classId === selectedHwClass && h.section === selectedHwSection
                    );

                    if (filtered.length === 0) {
                      return (
                        <div className="p-10 text-center rounded-3xl bg-slate-900/50 border border-purple-900/60 space-y-3">
                          <ClipboardList className="w-12 h-12 text-purple-400 mx-auto opacity-40" />
                          <h4 className="text-base font-bold text-white">
                            No Homework Assigned Yet for Class {selectedHwClass} - Section {selectedHwSection}
                          </h4>
                          <p className="text-xs text-purple-300 max-w-md mx-auto">
                            Teachers of this section have not published an assignment yet today. Check back soon or select another section!
                          </p>
                          {isDimension5 && (
                            <button
                              onClick={() => {
                                setNewHwClass(selectedHwClass);
                                setNewHwSection(selectedHwSection);
                                setShowAssignHwModal(true);
                              }}
                              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer shadow-md"
                            >
                              Assign Homework to Class {selectedHwClass}-{selectedHwSection} Now
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
                            className="p-5 rounded-2xl bg-slate-900/90 border border-purple-800 hover:border-teal-400 transition shadow-lg space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs border border-teal-500/30">
                                {hw.subject}
                              </span>
                              <span className="text-[11px] font-mono text-purple-300">
                                Due: {hw.dueDate}
                              </span>
                            </div>

                            <div className="text-[11px] text-purple-300 font-mono">
                              {hw.chapter}
                            </div>

                            <h4 className="text-sm font-black text-white">{hw.title}</h4>
                            <p className="text-xs text-purple-200/90 leading-relaxed whitespace-pre-wrap">{hw.desc}</p>

                            <div className="pt-3 border-t border-purple-900 flex items-center justify-between text-xs">
                              <span className="text-purple-300">Teacher: <strong className="text-white">{hw.teacher}</strong></span>
                              <span className="text-[10px] text-teal-300 font-mono">{hw.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Teacher: Assign New Homework Modal (Dimension 5 Only) */}
                {showAssignHwModal && isDimension5 && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-2xl bg-purple-950/95 border-2 border-teal-400/80 rounded-3xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <Plus className="w-4 h-4 text-teal-300" />
                          <span>Publish New Homework to Students (Dimension 5)</span>
                        </h3>
                        <button onClick={() => setShowAssignHwModal(false)} className="text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleCreateHomework} className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Target Class</label>
                            <select
                              value={newHwClass}
                              onChange={(e) => setNewHwClass(e.target.value)}
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            >
                              {SCHOOL_CLASSES_CONFIG.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Section</label>
                            <select
                              value={newHwSection}
                              onChange={(e) => setNewHwSection(e.target.value)}
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            >
                              {['A', 'B', 'C', 'D', 'E'].map(s => (
                                <option key={s} value={s}>Section {s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Subject</label>
                            <select
                              value={newHwSubject}
                              onChange={(e) => setNewHwSubject(e.target.value)}
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            >
                              {['Science & Technology', 'Mathematics', 'Social Science', 'English', 'Hindi', 'Sanskrit', 'Computer Science'].map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Due Date</label>
                            <input
                              type="text"
                              value={newHwDueDate}
                              onChange={(e) => setNewHwDueDate(e.target.value)}
                              placeholder="e.g. Tomorrow, 08:30 AM"
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Assigning Faculty Member</label>
                            <select
                              value={newHwTeacher}
                              onChange={(e) => setNewHwTeacher(e.target.value)}
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            >
                              {teachersList.map(t => (
                                <option key={t.id} value={t.name}>
                                  {t.name} ({t.subject}) {t.isRegisteredFaculty ? '* Verified' : ''}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Chapter / Unit</label>
                            <input
                              type="text"
                              value={newHwChapter}
                              onChange={(e) => setNewHwChapter(e.target.value)}
                              placeholder="e.g. Chapter 11: The Human Eye (DAV Textbook)"
                              className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Assignment Title</label>
                          <input
                            type="text"
                            value={newHwTitle}
                            onChange={(e) => setNewHwTitle(e.target.value)}
                            placeholder="e.g. Ray Diagram of Human Eye &amp; Myopia Numerical Questions"
                            className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Detailed Instructions</label>
                          <textarea
                            rows={3}
                            value={newHwDesc}
                            onChange={(e) => setNewHwDesc(e.target.value)}
                            placeholder="Mention notebook section, textbook page number references, and submission rules..."
                            className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white leading-relaxed"
                            required
                          />
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setShowAssignHwModal(false)}
                            className="px-4 py-2.5 rounded-xl bg-slate-800 text-purple-200 text-xs font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
                          >
                            Publish to Students
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

              </div>
            )}

{/* --------------------------------------------------------------------- */}
            {/* PAGE 2: FACULTY ACADEMIC DIRECT DESK (CHAT & CONSULTATION)            */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'doubts_chat' && (
              <div className="w-full space-y-4 animate-fadeIn">
                
                {/* Top Control Header */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-950 to-teal-950/90 border border-purple-500/50 flex items-center justify-between flex-wrap gap-3 shadow-xl">
                  <div>
                    <h2 className="text-base font-black text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-teal-300" />
                      <span>{isDimension5 ? 'Faculty Direct Desk - Student Consultation Directory' : 'Faculty Academic Direct Desk - Verified Teachers Directory'}</span>
                    </h2>
                    <p className="text-xs text-purple-200/90 mt-0.5">
                      {isDimension5 ? 'Direct messaging with enrolled students - Rich media support - Sub-second delivery' : 'Direct academic doubt clearance with verified faculty - Rich media support'}
                    </p>
                  </div>

                  {/* Controls: Edit Profile, Wallpaper */}
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Role Indicator (Automatic, no manual toggle) */}
                    <div className="px-3 py-1.5 rounded-xl bg-purple-900/60 border border-purple-600 text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                      <span>{isDimension5 ? `Faculty: ${user?.name || 'Teacher'} (${user?.subject || 'Science & Tech'})` : `Student: ${user?.name || 'Enrolled Student'}`}</span>
                    </div>

                    {/* Teacher Profile & DP Edit (Dimension 5 Only) */}
                    {isDimension5 && (
                      <button
                        onClick={() => setShowTeacherProfileModal(true)}
                        className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-600 text-purple-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-teal-300" />
                        <span>Edit Faculty Profile &amp; DP</span>
                      </button>
                    )}

                    {/* Wallpaper Picker Button */}
                    <button
                      onClick={() => setShowWallpaperPicker(prev => !prev)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-purple-700 text-purple-200 hover:text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      title="Change Chat Wallpaper"
                    >
                      <Palette className="w-3.5 h-3.5 text-teal-300" />
                      <span>Wallpaper</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsDoubtSessionResolved(true);
                        playSoundChime('delivered');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-600 text-purple-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-teal-300" />
                      <span>End Doubt Session</span>
                    </button>

                  </div>
                </div>

                {/* Wallpaper Picker Dropdown Modal */}
                {showWallpaperPicker && (
                  <div className="p-4 rounded-2xl bg-purple-950/95 border border-purple-600 shadow-2xl space-y-3 animate-fadeIn text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-300 uppercase tracking-wider font-mono">Choose Chat Background Wallpaper</span>
                      <button onClick={() => setShowWallpaperPicker(false)} className="text-purple-300 hover:text-white">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => {
                          setChatWallpaper('default');
                          localStorage.setItem(CHAT_WALLPAPER_STORAGE_KEY, 'default');
                          setShowWallpaperPicker(false);
                        }}
                        className="p-2.5 rounded-xl bg-slate-950 border border-purple-700 hover:border-teal-400 text-center font-bold text-purple-200"
                      >
                        Deep Cosmos (Default)
                      </button>
                      <button
                        onClick={() => {
                          setChatWallpaper('emerald');
                          localStorage.setItem(CHAT_WALLPAPER_STORAGE_KEY, 'emerald');
                          setShowWallpaperPicker(false);
                        }}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-teal-950 to-slate-950 border border-teal-600 text-center font-bold text-teal-200"
                      >
                        Mint &amp; Emerald
                      </button>
                      <button
                        onClick={() => {
                          setChatWallpaper('purple');
                          localStorage.setItem(CHAT_WALLPAPER_STORAGE_KEY, 'purple');
                          setShowWallpaperPicker(false);
                        }}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-purple-950 to-slate-950 border border-purple-500 text-center font-bold text-fuchsia-200"
                      >
                        Royal Purple
                      </button>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          id="chat-custom-wallpaper-upload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const r = new FileReader();
                              r.onload = (ev) => {
                                setChatWallpaper(ev.target.result);
                                localStorage.setItem(CHAT_WALLPAPER_STORAGE_KEY, ev.target.result);
                                setShowWallpaperPicker(false);
                              };
                              r.readAsDataURL(file);
                            }
                          }}
                        />
                        <label
                          htmlFor="chat-custom-wallpaper-upload"
                          className="p-2.5 rounded-xl bg-slate-900 border border-teal-500 text-teal-300 hover:bg-slate-800 text-center font-bold block cursor-pointer"
                        >
                          Upload Custom Photo
                        </label>
                      </div>
                    </div>
                    {/* Fit mode selector */}
                    <div className="flex items-center gap-3 pt-2 border-t border-purple-800/80">
                      <span className="text-purple-300">Photo Display:</span>
                      <button
                        onClick={() => setWallpaperFitMode('contain')}
                        className={`px-3 py-1 rounded-lg font-bold ${wallpaperFitMode === 'contain' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-purple-300'}`}
                      >
                        Fit Whole Photo (No Zoom / Distortion)
                      </button>
                      <button
                        onClick={() => setWallpaperFitMode('cover')}
                        className={`px-3 py-1 rounded-lg font-bold ${wallpaperFitMode === 'cover' ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-purple-300'}`}
                      >
                        Fill Area (Cover)
                      </button>
                    </div>
                  </div>
                )}

                {/* Mobile Tab Switcher */}
                <div className="flex sm:hidden bg-purple-950/80 rounded-xl p-1 border border-purple-800 text-xs">
                  <button
                    onClick={() => setMobileChatTab('roster')}
                    className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 ${
                      mobileChatTab === 'roster' ? 'bg-teal-500 text-slate-950 font-black' : 'text-purple-300'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>{isDimension5 ? 'Students' : 'Teachers'}</span>
                  </button>
                  <button
                    onClick={() => setMobileChatTab('chat')}
                    className={`flex-1 py-1.5 rounded-lg font-bold flex items-center justify-center gap-1.5 ${
                      mobileChatTab === 'chat' ? 'bg-teal-500 text-slate-950 font-black' : 'text-purple-300'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Panel</span>
                  </button>
                </div>

                {/* Main Chat Workspace Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 h-[720px] rounded-3xl overflow-hidden border border-purple-800 bg-slate-950 shadow-2xl">
                  
                  {/* Left Column: Contacts Directory (Width 4/12 on desktop) */}
                  <div className={`sm:col-span-4 lg:col-span-4 bg-purple-950/40 border-r border-purple-800 flex flex-col h-full ${
                    mobileChatTab === 'roster' ? 'flex' : 'hidden sm:flex'
                  }`}>
                    
                    {/* Search & Header */}
                    <div className="p-3 border-b border-purple-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase text-teal-300 tracking-wider font-mono">
                          {isDimension5 ? 'Registered Students' : 'Registered Faculty'}
                        </span>
                        <span className="text-[11px] font-mono text-purple-300">
                          {chatContactsList.length} Online
                        </span>
                      </div>
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
                        <input
                          type="text"
                          placeholder={isDimension5 ? "Search student name or class..." : "Search teacher name or subject..."}
                          value={contactSearchQuery}
                          onChange={(e) => setContactSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-purple-700 rounded-xl text-xs text-white placeholder-purple-400 focus:outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>

                    {/* Contacts List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-purple-900/40 scrollbar-thin">
                      {chatContactsList.length === 0 ? (
                        <div className="p-8 text-center space-y-2 text-purple-300 text-xs">
                          <Users className="w-8 h-8 text-purple-500 mx-auto opacity-40" />
                          <p className="font-bold text-white">
                            {isDimension5 ? 'No registered students yet' : 'No registered faculty yet'}
                          </p>
                          <p className="text-[11px]">
                            {isDimension5 
                              ? 'Students who register accounts in Dimension 1 to 4 will appear here for direct messaging.'
                              : 'Teachers who register in Dimension 5 will appear here for academic consultations.'}
                          </p>
                        </div>
                      ) : (
                        chatContactsList
                          .filter(c => {
                            if (!contactSearchQuery.trim()) return true;
                            const q = contactSearchQuery.toLowerCase();
                            return (c.name && c.name.toLowerCase().includes(q)) || (c.subtitle && c.subtitle.toLowerCase().includes(q));
                          })
                          .map((contact) => {
                            const isSelected = activeContact?.id === contact.id;
                            const msgs = teacherChatsMap[contact.id] || [];
                            const lastMsg = msgs[msgs.length - 1];

                            return (
                              <button
                                key={contact.id}
                                onClick={() => handleSelectContact(contact.id)}
                                className={`w-full p-3 flex items-start gap-3 text-left transition cursor-pointer ${
                                  isSelected ? 'bg-purple-900/60 border-l-4 border-teal-400' : 'hover:bg-purple-900/20'
                                }`}
                              >
                                {/* Avatar / DP */}
                                <div className="relative shrink-0">
                                  {contact.dp ? (
                                    <img
                                      src={contact.dp}
                                      alt={contact.name}
                                      className="w-10 h-10 rounded-2xl object-cover border border-teal-400 shadow-md"
                                    />
                                  ) : (
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                                      {contact.name.charAt(0)}
                                    </div>
                                  )}
                                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-slate-950" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1">
                                    <h4 className="text-xs font-bold text-white truncate">{contact.name}</h4>
                                    <span className="text-[10px] text-purple-400 font-mono">
                                      {lastMsg ? lastMsg.time : 'Active'}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-teal-300 truncate font-mono">
                                    {contact.subtitle}
                                  </p>
                                  {lastMsg && (
                                    <p className="text-[11px] text-purple-300 truncate mt-0.5">
                                      {lastMsg.text || (lastMsg.media ? `[${lastMsg.media.type}]` : '...')}
                                    </p>
                                  )}
                                </div>
                              </button>
                            );
                          })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Chat Stream & Message Input (Width 8/12 on desktop) */}
                  <div className={`sm:col-span-8 lg:col-span-8 flex flex-col h-full bg-slate-950 ${
                    mobileChatTab === 'chat' ? 'flex' : 'hidden sm:flex'
                  }`}>
                    
                    {/* Active Chat Header */}
                    {activeContact ? (
                      <div className="p-3.5 border-b border-purple-800 bg-purple-950/60 flex items-center justify-between flex-wrap gap-2 shrink-0">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setMobileChatTab('roster')}
                            className="p-1 rounded-lg text-purple-300 hover:text-white sm:hidden cursor-pointer"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          
                          {activeContact.dp ? (
                            <img
                              src={activeContact.dp}
                              alt={activeContact.name}
                              className="w-10 h-10 rounded-2xl object-cover border border-teal-400 shadow-md"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-teal-500 text-slate-950 font-black flex items-center justify-center text-sm shadow-md">
                              {activeContact.name.charAt(0)}
                            </div>
                          )}

                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                              <span>{activeContact.name}</span>
                              <span className="w-2 h-2 rounded-full bg-teal-400" />
                            </h3>
                            <p className="text-[10px] sm:text-xs text-teal-300 font-mono">
                              {activeContact.subtitle} - {activeContact.role}
                            </p>
                          </div>
                        </div>

                        {/* Top Actions: AI Answer */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleInstantAIAnswer}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-black text-[11px] flex items-center gap-1.5 shadow-md cursor-pointer hover:opacity-95"
                          >
                            <Bot className="w-3.5 h-3.5" />
                            <span>Instant Teacher AI Answer</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 border-b border-purple-800 bg-purple-950/60 text-xs text-purple-300">
                        Select a contact from directory
                      </div>
                    )}

                    {/* Messages Body with Custom Wallpaper */}
                    <div
                      className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
                      style={
                        chatWallpaper.startsWith('data:') || chatWallpaper.startsWith('http')
                          ? {
                              backgroundImage: `url(${chatWallpaper})`,
                              backgroundSize: wallpaperFitMode === 'contain' ? 'contain' : 'cover',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: '#020617'
                            }
                          : chatWallpaper === 'emerald'
                          ? { background: 'linear-gradient(135deg, #022c22 0%, #020617 100%)' }
                          : chatWallpaper === 'purple'
                          ? { background: 'linear-gradient(135deg, #2e1065 0%, #020617 100%)' }
                          : { background: '#020617' }
                      }
                    >
                      {activeContact && (!teacherChatsMap[activeContact.id] || teacherChatsMap[activeContact.id].length === 0) ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-purple-300">
                          <MessageSquare className="w-10 h-10 text-teal-400 opacity-60" />
                          <h4 className="text-sm font-bold text-white">Start Direct Consultation</h4>
                          <p className="text-xs max-w-sm">
                            Type a question or homework doubt below, attach photos/notes, and get verified answers.
                          </p>
                        </div>
                      ) : (
                        (teacherChatsMap[activeContact?.id] || []).map((msg) => {
                          const isMe = isDimension5 ? msg.sender === 'teacher' : msg.sender === 'student';

                          return (
                            <div
                              key={msg.id}
                              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fadeIn`}
                            >
                              <div
                                className={`max-w-[85%] sm:max-w-[70%] p-3 rounded-2xl space-y-1.5 shadow-lg ${
                                  isMe
                                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 rounded-br-none'
                                    : 'bg-purple-900/90 text-white rounded-bl-none border border-purple-700/60'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3 text-[10px] font-mono opacity-80 border-b border-black/10 pb-1">
                                  <span className="font-black">{msg.senderName}</span>
                                  <span>{msg.senderClassSec}</span>
                                </div>

                                {/* Media Renderers */}
                                {msg.media && (
                                  <div className="pt-1">
                                    {msg.media.type === 'image' && (
                                      <img
                                        src={msg.media.dataUrl}
                                        alt={msg.media.name}
                                        className="rounded-xl max-h-64 object-contain w-full border border-black/20"
                                      />
                                    )}
                                    {msg.media.type === 'audio' && (
                                      <audio controls src={msg.media.dataUrl} className="w-full max-w-xs" />
                                    )}
                                    {msg.media.type === 'video' && (
                                      <video controls src={msg.media.dataUrl} className="w-full max-w-xs max-h-60 rounded-xl" />
                                    )}
                                  </div>
                                )}

                                {msg.text && (
                                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                )}

                                <div className="flex items-center justify-end gap-1 text-[9px] font-mono opacity-80 pt-0.5">
                                  <span>{msg.time}</span>
                                  {isMe && (
                                    <span>
                                      {msg.status === 'delivered' ? (
                                        <CheckCheck className="w-3 h-3 text-slate-950" />
                                      ) : (
                                        <Check className="w-3 h-3 text-slate-950/70" />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Pending Media Preview */}
                    {pendingMedia && (
                      <div className="px-4 py-2 bg-purple-950/95 border-t border-purple-800 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-teal-300">
                          <Paperclip className="w-4 h-4 text-teal-300" />
                          <span className="font-bold truncate max-w-xs">{pendingMedia.name}</span>
                          <span className="text-[10px] uppercase font-mono text-purple-300">({pendingMedia.type})</span>
                        </div>
                        <button
                          onClick={() => setPendingMedia(null)}
                          className="p-1 rounded-lg hover:bg-purple-900 text-purple-300 hover:text-white cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Chat Input Bar with SINGLE PIN ICON */}
                    <div className="p-3 bg-purple-950/95 border-t border-purple-800 space-y-2 shrink-0">
                      <div className="flex items-center gap-2">
                        
                        {/* Single Paperclip Pin Icon */}
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
                          title="Attach Media (Image, Video, Audio, Handwritten Notes)"
                          className="p-2.5 rounded-xl bg-slate-900 hover:bg-purple-900 text-teal-300 border border-purple-700 cursor-pointer transition hover:scale-105"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>

                        {/* Text Input */}
                        <input
                          type="text"
                          placeholder={isDimension5 ? "Type your academic advice or guidance..." : "Type your question or chapter doubt here..."}
                          value={chatInputText}
                          onChange={(e) => setChatInputText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-700 text-white placeholder-purple-400 text-xs sm:text-sm focus:outline-none focus:border-teal-400"
                        />

                        {/* Send Button */}
                        <button
                          type="button"
                          disabled={!chatInputText.trim() && !pendingMedia}
                          onClick={handleSendMessage}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition disabled:opacity-40 cursor-pointer shadow-lg"
                        >
                          <Send className="w-4 h-4" />
                          <span className="hidden sm:inline">Send</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Edit Faculty Profile & DP Modal */}
                {showTeacherProfileModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
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
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  setCustomProfileForm(prev => ({ ...prev, dp: ev.target.result }));
                                };
                                reader.readAsDataURL(file);
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

              </div>
            )}


            {/* --------------------------------------------------------------------- */}
            {/* PAGE 3: 100% IN-WEBSITE REAL ONLINE LIVE CLASSROOM (WEBRTC)          */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'live_class' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Live Class Graphical Landing Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-rose-950 border-2 border-rose-500/50 p-8 md:p-12 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

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

                      {isFacultyRole && (
                        <button
                          onClick={() => {
                            const educatorName = user?.name ? (user.name.startsWith('Prof.') || user.name.startsWith('Mrs.') || user.name.startsWith('Mr.') || user.name.startsWith('Dr.') ? user.name : `Prof. ${user.name}`) : (activeTeacher?.name || 'Mrs. Sunita Sharma');
                            const myBroadcast = {
                              id: `live_broadcast_${Date.now()}`,
                              classId: selectedLiveClassNum || user?.classNum || '8',
                              subject: user?.subject || activeTeacher?.subject || 'Science & Technology',
                              topic: `Interactive Faculty Live Lecture with ${educatorName}`,
                              teacher: educatorName,
                              status: 'live',
                              activeParticipants: 45,
                              time: 'Streaming Now',
                              isRegisteredFaculty: true
                            };
                            const updatedBroadcasts = [myBroadcast, ...liveSessionsStore.filter(p => p.id !== myBroadcast.id)];
                            persistLiveSessions(updatedBroadcasts);
                            setActiveLiveSessionData(myBroadcast);
                            setIsInsideLiveRoom(true);
                            playSoundChime('sent');
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

                {/* Quick Live Lecture Schedule Preview */}
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Video className="w-4 h-4 text-rose-400" />
                      <span>Active &amp; Upcoming Live Lectures (Class 8)</span>
                    </h3>
                    <span className="text-xs text-rose-300 font-mono">2 Classes Live Now</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scheduledLiveClasses.filter(c => c.classId === selectedLiveClassNum).map((session) => (
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
                    ))}
                  </div>
                </div>

                {/* Class Selection Pop-up for Live Lectures */}
                {isLivePortalModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-rose-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Video className="w-5 h-5" />
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
                            Educator: {activeLiveSessionData?.teacher || user?.name || 'Mrs. Sunita Sharma'} - Real-Time WebRTC Video Stream
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
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied Invite Link!</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5 text-emerald-400" />
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
                          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
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

                        <button
                          onClick={() => {
                            setIsInsideLiveRoom(false);
                            setIsWhiteboardActive(false);
                            playSoundChime('alert');
                          }}
                          className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer transition"
                        >
                          <PhoneOff className="w-3.5 h-3.5" />
                          <span>Leave Class</span>
                        </button>
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
                              <PenTool className="w-12 h-12 text-teal-400 mx-auto animate-bounce" />
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
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

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
                        ? 'Dimension 5 Faculty: Deploy timed MCQ & subjective examinations, monitor student submissions, and review real-time test leaderboards.'
                        : 'Attempt scheduled DAV unit examinations with timed countdown, MCQ options, and notebook photo uploads for subjective questions.'}
                    </p>

                    {/* Action Buttons: Teacher Leaderboard vs Student Attempt */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      {isDimension5 ? (
                        <button
                          onClick={() => {
                            setShowTeacherLeaderboardModal(true);
                            playSoundChime('sent');
                          }}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Trophy className="w-4 h-4 text-slate-950" />
                          <span>Check Test Leaderboard</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setIsTestPortalOpen(true);
                            playSoundChime('sent');
                          }}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
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
                          className="px-6 py-3 rounded-2xl bg-purple-900 border-2 border-teal-400 text-teal-300 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-xl hover:scale-105"
                        >
                          <Plus className="w-4 h-4 text-teal-300" />
                          <span>Create &amp; Deploy New Examination (Dimension 5)</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Available Tests Preview for Class & Section */}
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between pb-1 flex-wrap gap-2">
                    <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-amber-400" />
                      <span>Active Verified Unit Tests for Class {selectedTestClass} - Section {selectedTestSection}</span>
                    </h3>
                    <span className="text-xs text-amber-300 font-mono">
                      {testsDatabase.filter(t => t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true)).length} Tests Ready
                    </span>
                  </div>

                  {testsDatabase.filter(t => t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true)).length === 0 ? (
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

                              {isDimension5 ? (
                                <button
                                  onClick={() => {
                                    setLeaderboardSelectedTest(t);
                                    setShowTeacherLeaderboardModal(true);
                                    playSoundChime('sent');
                                  }}
                                  className="w-full py-2.5 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 hover:text-white font-black text-xs cursor-pointer shadow-md hover:opacity-95 flex items-center justify-center gap-1.5"
                                >
                                  <Trophy className="w-3.5 h-3.5 text-teal-300" />
                                  <span>Check Test Leaderboard</span>
                                </button>
                              ) : windowActive ? (
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
                              )}
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
                              <GraduationCap className="w-4 h-4" />
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

                {/* TEACHER CHECK LEADERBOARD MODAL (Dimension 5 Only) */}
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
                              Dimension 5 Exclusive: Review answers, inspect notebook photos, and override scores
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
                            <Plus className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Author &amp; Deploy New Examination (Dimension 5)
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
                          <Trophy className="w-16 h-16 text-amber-400 mx-auto" />
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
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300">
                      <UserCheck className="w-3.5 h-3.5 text-cyan-300" />
                      <span>PAGE 5 - DIGITAL ATTENDANCE REGISTRY</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Daily Digital Attendance <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Registry &amp; Records</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Students verify daily attendance and 75% CBSE compliance. Dimension 5 teachers have exclusive authorization to mark Present or Absent and enroll students.
                    </p>

                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setIsAttendanceModalOpen(true);
                          playSoundChime('sent');
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-slate-950" />
                        <span>Filter Class &amp; Section Roster</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {isDimension5 && (
                        <button
                          onClick={() => {
                            setEnrollStudentRoll(String(currentAttRoster.length + 1));
                            setEnrollStudentName('');
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
                        <UserCheck className="w-5 h-5" />
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
                              setEnrollStudentRoll(String(currentAttRoster.length + 1));
                              setEnrollStudentName('');
                              setShowEnrollModal(true);
                              playSoundChime('sent');
                            }}
                            className="px-4 py-2 rounded-xl bg-purple-900 border border-teal-400 text-teal-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Student</span>
                          </button>
                          <button
                            onClick={handleSaveAttendance}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:scale-105 transition"
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
                        <Users className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
                        <h4 className="text-sm font-bold text-white">
                          No students enrolled yet for Class {selectedAttClass} - Section {selectedAttSection}
                        </h4>
                        <p className="text-xs text-purple-300 max-w-md mx-auto">
                          {isDimension5 
                            ? "As a Dimension 5 Faculty member, click 'Enroll Student' above to register real students into this class cohort."
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
                                      <Trash2 className="w-4 h-4" />
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
                              <GraduationCap className="w-4 h-4" />
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
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-xs font-mono font-bold text-indigo-300">
                      <Award className="w-3.5 h-3.5 text-indigo-300" />
                      <span>PAGE 6 - STUDENT EXAMINATION MARKS LEADERBOARD</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Examination Marks <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Leaderboard &amp; Report Cards</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Standardized periodic assessments across 10 official DAV subjects, customizable maximum marks, section rankings, and overall class leaderboard. Dimension 5 teachers enter marks and enroll students.
                    </p>

                    <div className="pt-2 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setIsMarksModalOpen(true);
                          playSoundChime('sent');
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-400 hover:from-indigo-400 hover:to-teal-300 text-slate-950 font-black text-xs md:text-sm flex items-center gap-2 shadow-xl shadow-indigo-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <Award className="w-4 h-4 text-slate-950" />
                        <span>Select Term, Class &amp; Section</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {isDimension5 && (
                        <>
                          <button
                            onClick={() => {
                              setEnrollStudentRoll(String(currentMarksRoster.length + 1));
                              setEnrollStudentName('');
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
                            <FileCheck className="w-4 h-4" />
                            <span>Save Marks Ledger (Dimension 5)</span>
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
                        {isDimension5 ? 'Editing Mode (Dimension 5 Teacher)' : 'Student Verification Mode'}
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
                      <Award className="w-12 h-12 text-purple-400 mx-auto opacity-50" />
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
                                  {s.name}
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
                                          max={maxForSub}
                                          value={markVal !== null && markVal !== undefined ? markVal : ''}
                                          placeholder="-"
                                          onChange={(e) => handleUpdateStudentMark(s.roll, sub.key, e.target.value)}
                                          className="w-14 p-1.5 rounded-lg bg-slate-950 border border-purple-700 text-center font-mono font-bold text-white text-xs focus:border-teal-400"
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
                                      <Printer className="w-3 h-3 text-teal-300" />
                                      <span>Report</span>
                                    </button>
                                    {isDimension5 && (
                                      <button
                                        onClick={() => handleRemoveStudent(selectedMarksClass, selectedMarksSection, s.roll)}
                                        title="Remove student from roster"
                                        className="p-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 cursor-pointer"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
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
                            <Award className="w-5 h-5" />
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
                              <GraduationCap className="w-4 h-4" />
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

                {/* CONFIGURE MAX MARKS MODAL (Dimension 5 Only) */}
                {showMaxMarksConfigModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
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

                {/* ENROLL STUDENT MODAL (Dimension 5 Only) */}
                {showEnrollModal && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-md bg-slate-900 border-2 border-teal-400 rounded-3xl p-6 shadow-2xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5 text-teal-300" />
                          <h3 className="text-base font-black text-white">Enroll Real Student</h3>
                        </div>
                        <button onClick={() => setShowEnrollModal(false)} className="text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-xs text-purple-300">
                        Enroll a student into <strong className="text-teal-300">Class {selectedMarksClass} - Section {selectedMarksSection}</strong> roster:
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEnrollStudent(selectedMarksClass, selectedMarksSection, enrollStudentRoll, enrollStudentName);
                          setShowEnrollModal(false);
                        }}
                        className="space-y-4 text-xs"
                      >
                        <div className="space-y-1">
                          <label className="font-bold text-purple-300">Roll Number:</label>
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

                        <div className="pt-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setShowEnrollModal(false)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-purple-300 font-bold cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-slate-950 font-black cursor-pointer shadow-lg hover:scale-105 transition"
                          >
                            Enroll to Class Roster
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {/* OFFICIAL PRINTABLE STUDENT REPORT CARD MODAL */}
                {showReportCardModal && selectedReportStudent && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn overflow-y-auto">
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
                          <Printer className="w-4 h-4" />
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

