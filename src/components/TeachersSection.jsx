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

const DIRECT_CONTACT_NUMBER = '919470033984';
const TEACHER_CHATS_STORAGE_KEY = 'dav_faculty_direct_chats_v3';
const HOMEWORK_STORAGE_KEY = 'dav_daily_homework_store_v1';
const ATTENDANCE_STORAGE_KEY = 'dav_attendance_store_v1';
const CUSTOM_TESTS_STORAGE_KEY = 'dav_custom_online_tests_v1';
const TEST_RESULTS_STORAGE_KEY = 'dav_test_results_store_v1';
const MARKS_LEDGER_STORAGE_KEY = 'dav_student_marks_ledger_v1';
const CUSTOM_TEACHERS_STORAGE_KEY = 'dav_custom_teachers_v1';
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
      { label: 'Status Types', val: 'Present / Absent / Late' }
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
    centralButtonText: 'Open Student Examination Marks Ledger',
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
    { id: 'marks_ledger', num: 6, title: 'Page 6: Student Marks & Examination Ledger', subtitle: 'Term Assessments - Auto-Grades - Report Cards' }
  ];

  // Current Active Page among the 6 Graphical Animated Pages
  const [activePage, setActivePage] = useState(initialSubSection || 'homework');

  // Interactive Full Screen Mode: false = PDF Presentation Handbook Mode, true = Full Screen Interactive Tool
  const [isFullScreenInteractive, setIsFullScreenInteractive] = useState(false);

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

  // Dynamic teachers roster: merges verified subject faculty with real registered Dimension 5 teachers
  const [teachersList, setTeachersList] = useState(() => getAllTeachers(user));

  useEffect(() => {
    const refreshTeachers = () => {
      setTeachersList(getAllTeachers(user));
    };
    window.addEventListener('storage', refreshTeachers);
    window.addEventListener('dav_faculty_updated', refreshTeachers);
    refreshTeachers();
    return () => {
      window.removeEventListener('storage', refreshTeachers);
      window.removeEventListener('dav_faculty_updated', refreshTeachers);
    };
  }, [user]);

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
    return [
      {
        id: 'hw_seed_01',
        classId: '8',
        section: 'D',
        subject: 'Science & Technology',
        chapter: 'Chapter 11: The Human Eye & Optical Dispersion',
        title: 'Ray Diagram of Human Eye & Myopia Correction Lenses',
        desc: 'Draw neat labelled ray diagrams in practical notebook. Explain why concave lens is used for myopia correction with focal length formula.',
        dueDate: 'Tomorrow, 08:30 AM',
        teacher: 'Mrs. Sunita Sharma (HOD Science)',
        createdAt: 'Today, 10:15 AM'
      },
      {
        id: 'hw_seed_02',
        classId: '8',
        section: 'D',
        subject: 'Mathematics',
        chapter: 'Chapter 6: Compound Interest',
        title: 'Worksheet 6.2 Semi-Annual & Annual Compounding Problems',
        desc: 'Solve Questions 1 to 8 showing step-by-step substitution into A = P(1 + r/200)^2n for half-yearly compounding.',
        dueDate: '21 Oct 2026, 09:00 AM',
        teacher: 'Mr. Rajesh Verma (Senior Math Faculty)',
        createdAt: 'Today, 11:30 AM'
      },
      {
        id: 'hw_seed_03',
        classId: '8',
        section: 'D',
        subject: 'Social Science',
        chapter: 'Chapter 16: Our Constitution',
        title: 'Preamble Core Philosophy & Fundamental Rights Chart',
        desc: 'Create comparative summary table between Fundamental Rights and Directive Principles in SST homework register.',
        dueDate: '22 Oct 2026, 08:30 AM',
        teacher: 'Mrs. Neha Srivastava',
        createdAt: 'Yesterday, 02:00 PM'
      }
    ];
  });

  const [showAssignHwModal, setShowAssignHwModal] = useState(false);
  const [newHwClass, setNewHwClass] = useState('8');
  const [newHwSection, setNewHwSection] = useState('D');
  const [newHwSubject, setNewHwSubject] = useState('Science & Technology');
  const [newHwTeacher, setNewHwTeacher] = useState(() => {
    if (user?.name) {
      return (user.name.startsWith('Prof.') || user.name.startsWith('Mrs.') || user.name.startsWith('Mr.') || user.name.startsWith('Dr.')) ? user.name : 'Prof. ' + user.name;
    }
    return 'Mrs. Sunita Sharma (HOD Science)';
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
  const [activeTeacherId, setActiveTeacherId] = useState(() => {
    const list = getAllTeachers(user);
    if (user?.isTeacher || user?.dimension === 5) {
      const matched = list.find(t => 
        (t.originalId && user?.id && t.originalId.toLowerCase() === user.id.toLowerCase()) || 
        t.id === 'tch_reg_' + user?.id || 
        (t.name && user?.name && t.name.toLowerCase().includes(user.name.toLowerCase()))
      );
      if (matched) return matched.id;
    }
    return list[0]?.id || 'tch_01';
  });

  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [teacherDeptFilter, setTeacherDeptFilter] = useState('all');
  const [chatRole, setChatRole] = useState(isFacultyRole ? 'teacher' : 'student');
  const [chatInputText, setChatInputText] = useState('');
  const [isMessageDelivering, setIsMessageDelivering] = useState(false);
  const [isDoubtSessionResolved, setIsDoubtSessionResolved] = useState(false);
  const messagesEndRef = useRef(null);

  // Mobile Chat Tab: 'roster' | 'chat'
  const [mobileChatTab, setMobileChatTab] = useState('roster');

  // Media Attachment State: null or { type: 'image'|'audio'|'video', dataUrl, name }
  const [pendingMedia, setPendingMedia] = useState(null);

  // Chat Wallpaper State
  const [chatWallpaper, setChatWallpaper] = useState(() => {
    try {
      return localStorage.getItem(CHAT_WALLPAPER_STORAGE_KEY) || 'default';
    } catch (e) {
      return 'default';
    }
  });
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);

  // Teacher Profile / DP Modal State
  const [showTeacherProfileModal, setShowTeacherProfileModal] = useState(false);
  const [customProfileForm, setCustomProfileForm] = useState({
    name: user?.name || '',
    subject: user?.subject || 'Science & Biology',
    dp: user?.dp || user?.avatar || ''
  });

  // Chat Conversations Map
  const [teacherChatsMap, setTeacherChatsMap] = useState(() => {
    try {
      const stored = localStorage.getItem(TEACHER_CHATS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}

    const initialMap = {};
    const all = getAllTeachers(user);
    all.forEach(t => {
      initialMap[t.id] = [
        {
          id: 1,
          sender: 'teacher',
          senderName: t.name,
          senderRole: t.role,
          text: t.initialMessage,
          time: '10:00 AM',
          status: 'delivered'
        }
      ];
    });
    return initialMap;
  });

  const persistChats = (updated) => {
    setTeacherChatsMap(updated);
    try {
      localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const activeTeacher = teachersList.find(t => t.id === activeTeacherId) || teachersList[0];

  const handleSelectTeacher = (teacherId) => {
    setActiveTeacherId(teacherId);
    setMobileChatTab('chat');
    playSoundChime('sent');
  };

  // Send Message Handler (Text + Media + Sender Identity)
  const handleSendMessage = () => {
    if (!chatInputText.trim() && !pendingMedia) return;

    const currentTeacher = activeTeacher;
    const isSenderStudent = chatRole === 'student';
    const senderName = isSenderStudent 
      ? (user?.name || 'Aryan Sharma') 
      : (user?.name || currentTeacher.name);
    const senderClassSec = isSenderStudent 
      ? (user?.studentClass ? 'Class ' + user.studentClass + '-D' : 'Class 8-D')
      : currentTeacher.subject;

    const newMsg = {
      id: Date.now(),
      sender: chatRole,
      senderName: senderName,
      senderClassSec: senderClassSec,
      text: chatInputText.trim(),
      media: pendingMedia ? { ...pendingMedia } : null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const currentChatList = teacherChatsMap[currentTeacher.id] || [];
    const updatedChatList = [...currentChatList, newMsg];
    const updatedMap = {
      ...teacherChatsMap,
      [currentTeacher.id]: updatedChatList
    };

    persistChats(updatedMap);
    playSoundChime('sent');
    setChatInputText('');
    setPendingMedia(null);
    setIsMessageDelivering(true);

    // Auto simulated delivery and teacher read receipt
    setTimeout(() => {
      setIsMessageDelivering(false);
      playSoundChime('delivered');
      const deliveredMap = {
        ...updatedMap,
        [currentTeacher.id]: updatedChatList.map(m => m.id === newMsg.id ? { ...m, status: 'delivered' } : m)
      };
      persistChats(deliveredMap);
    }, 600);
  };

  // Instant AI Conceptual Answer Handler
  const handleInstantAIAnswer = () => {
    const currentTeacher = activeTeacher;
    setIsMessageDelivering(true);
    playSoundChime('sent');

    setTimeout(() => {
      const aiReply = {
        id: Date.now() + 1,
        sender: 'teacher',
        senderName: currentTeacher.name,
        senderClassSec: currentTeacher.subject,
        text: 'Greetings! Based on the prescribed DAV CBSE Curriculum for ' + currentTeacher.subject + ', here is the verified conceptual explanation: Please review Chapter exercises carefully, ensure formulas are written with proper units, and apply step-by-step reasoning. Feel free to ask any specific sub-question!',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        isAiAssisted: true
      };

      const currentChatList = teacherChatsMap[currentTeacher.id] || [];
      const updatedMap = {
        ...teacherChatsMap,
        [currentTeacher.id]: [...currentChatList, aiReply]
      };
      persistChats(updatedMap);
      setIsMessageDelivering(false);
      playSoundChime('received');
    }, 900);
  };

  // Handle Media File Selection
  const handleMediaUpload = (e, mediaType) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

  // Save Custom Teacher Profile / DP
  const handleSaveTeacherProfile = (e) => {
    e.preventDefault();
    if (!customProfileForm.name.trim()) return;

    try {
      const stored = localStorage.getItem(CUSTOM_TEACHERS_STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      const updated = existing.filter(t => t.id !== ('tch_reg_' + (user?.id || 'me')));
      const newEntry = {
        id: 'tch_reg_' + (user?.id || 'me'),
        name: customProfileForm.name.trim(),
        subject: customProfileForm.subject,
        department: customProfileForm.subject.includes('Science') ? 'Science' :
                    customProfileForm.subject.includes('Math') ? 'Mathematics' :
                    customProfileForm.subject.includes('Social') ? 'Social Science' :
                    customProfileForm.subject.includes('Hindi') ? 'Hindi' :
                    customProfileForm.subject.includes('English') ? 'English' :
                    customProfileForm.subject.includes('Sanskrit') ? 'Sanskrit' : 'Computer Science',
        role: 'Verified DAV Faculty (Dimension 5)',
        qualification: 'M.Sc./M.A., B.Ed., CTET Certified',
        status: 'Online',
        assignedClass: 'Class 8-D',
        avatarColor: 'from-purple-600 to-indigo-700',
        dp: customProfileForm.dp || null,
        contactNumber: DIRECT_CONTACT_NUMBER,
        initialMessage: 'Greetings! I am ' + customProfileForm.name + '. How can I assist you with your academic questions today?'
      };
      updated.push(newEntry);
      localStorage.setItem(CUSTOM_TEACHERS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('dav_faculty_updated'));
      setTeachersList(getAllTeachers(user));
      setShowTeacherProfileModal(false);
      playSoundChime('sent');
    } catch (err) {}
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

  // Real WebRTC Live Room Link Generator for DAV School (100% Free, Unlimited Minutes, Zero Disconnects)
  const getLiveRoomUrl = (session, classNum) => {
    const rawId = session?.id || 'live_stream';
    const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeClass = (classNum || '8').replace(/[^a-zA-Z0-9_-]/g, '_');
    const roomName = `DAV_School_Class_${safeClass}_${safeId}`;
    const userName = encodeURIComponent(user?.name || (isFacultyRole ? 'DAV Faculty Teacher' : 'DAV Student'));
    return `https://p2p.mirotalk.com/join/${roomName}?name=${userName}`;
  };

  const [liveSessionsStore, setLiveSessionsStore] = useState(() => [
    {
      id: 'live_01',
      classId: '8',
      subject: 'Science & Technology',
      topic: 'Chapter 11: The Human Eye & Optical Instruments Live Lab Demonstration',
      teacher: 'Mrs. Sunita Sharma',
      status: 'live',
      activeParticipants: 42,
      time: 'Streaming Now'
    },
    {
      id: 'live_02',
      classId: '8',
      subject: 'Mathematics',
      topic: 'Chapter 6: Compound Interest Semi-Annual Compounding Derivations',
      teacher: 'Mr. Rajesh Verma',
      status: 'live',
      activeParticipants: 39,
      time: 'Streaming Now'
    },
    {
      id: 'live_03',
      classId: '8',
      subject: 'Social Science',
      topic: 'Chapter 16: The Union Government & Fundamental Rights Analysis',
      teacher: 'Mrs. Neha Srivastava',
      status: 'scheduled',
      activeParticipants: 0,
      time: 'Today, 05:30 PM'
    },
    {
      id: 'live_04',
      classId: '7',
      subject: 'Science',
      topic: 'Chapter 5: Heat & Temperature Measurement',
      teacher: 'Mr. Arvind Prasad',
      status: 'live',
      activeParticipants: 37,
      time: 'Streaming Now'
    },
    {
      id: 'live_05',
      classId: '6',
      subject: 'Mathematics',
      topic: 'Chapter 4: Ratio, Proportion & Unitary Method',
      teacher: 'Mr. Alok Pandey',
      status: 'live',
      activeParticipants: 34,
      time: 'Streaming Now'
    }
  ]);

  // Ensure any newly registered teacher is automatically listed as an active live class educator
  useEffect(() => {
    const regTeachers = teachersList.filter(t => t.isRegisteredFaculty);
    if (regTeachers.length > 0) {
      setLiveSessionsStore(prev => {
        const next = [...prev];
        regTeachers.forEach(rt => {
          if (!next.some(s => s.teacher === rt.name)) {
            next.unshift({
              id: `live_reg_${rt.id}`,
              classId: rt.registeredUser?.classNum || '8',
              subject: rt.subject || 'Academic Curriculum',
              topic: `Interactive Faculty Classroom Session with ${rt.name}`,
              teacher: rt.name,
              status: 'live',
              activeParticipants: 45,
              time: 'Streaming Now',
              isRegisteredFaculty: true
            });
          }
        });
        return next;
      });
    }
  }, [teachersList]);

  const scheduledLiveClasses = liveSessionsStore;

  // =========================================================================
  // PAGE 4: CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE
  // =========================================================================
  const [isTestPortalOpen, setIsTestPortalOpen] = useState(false);
  const [selectedTestClass, setSelectedTestClass] = useState('8');
  const [selectedTestSection, setSelectedTestSection] = useState('D');

  // Teacher Test Creator State (Dimension 5 Only)
  const [showCreateTestModal, setShowCreateTestModal] = useState(false);
  const [testFormatChoice, setTestFormatChoice] = useState('mcq'); // 'mcq' | 'subjective' | 'combined'
  const [newTestClass, setNewTestClass] = useState('8');
  const [newTestSections, setNewTestSections] = useState(['A', 'B', 'C', 'D', 'E']);
  const [newTestSubject, setNewTestSubject] = useState('Science & Technology');
  const [newTestTitle, setNewTestTitle] = useState('');
  const [newTestChapter, setNewTestChapter] = useState('');
  const [newTestDuration, setNewTestDuration] = useState(30);
  const [newTestStartTime, setNewTestStartTime] = useState('09:00 AM');
  const [newTestEndTime, setNewTestEndTime] = useState('11:00 AM');
  const [deployedShareCode, setDeployedShareCode] = useState(null);

  // 5 Default Authoring MCQs
  const [newTestQuestions, setNewTestQuestions] = useState([
    {
      id: 1,
      questionText: 'What is the standard near point of distinct vision for a normal human eye?',
      options: ['25 meters', '25 centimeters', '2.5 centimeters', 'Infinity'],
      correctAnswer: 'B',
      explanation: 'The least distance of distinct vision for a young adult with normal vision is about 25 cm.'
    },
    {
      id: 2,
      questionText: 'Which optical phenomenon is primarily responsible for the splitting of white light into spectrum colors?',
      options: ['Reflection', 'Total Internal Reflection', 'Dispersion', 'Atmospheric Scattering'],
      correctAnswer: 'C',
      explanation: 'Dispersion is the splitting of white light into its constituent colors when passing through a prism.'
    },
    {
      id: 3,
      questionText: 'Which type of lens is prescribed to correct Myopia (near-sightedness)?',
      options: ['Convex Lens', 'Concave Lens', 'Bifocal Cylindrical Lens', 'Plano-Convex Lens'],
      correctAnswer: 'B',
      explanation: 'A concave lens of appropriate focal power diverges rays to focus images directly onto the retina.'
    },
    {
      id: 4,
      questionText: 'The change in focal length of an eye lens to focus near and far objects is known as:',
      options: ['Persistence of Vision', 'Power of Accommodation', 'Astigmatism', 'Hypermetropia'],
      correctAnswer: 'B',
      explanation: 'The ability of the eye lens to adjust its focal length via ciliary muscles is power of accommodation.'
    },
    {
      id: 5,
      questionText: 'The ciliary muscles contract and relax to alter the curvature of the:',
      options: ['Cornea', 'Pupil', 'Crystalline Eye Lens', 'Retinal Fovea'],
      correctAnswer: 'C',
      explanation: 'Ciliary muscles adjust the curvature and thickness of the flexible crystalline lens.'
    }
  ]);

  const handleAddQuestion = () => {
    const nextId = newTestQuestions.length + 1;
    setNewTestQuestions(prev => [
      ...prev,
      {
        id: nextId,
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 'A',
        explanation: ''
      }
    ]);
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

  // Custom Tests Database
  const [testsDatabase, setTestsDatabase] = useState(() => {
    try {
      const stored = localStorage.getItem(CUSTOM_TESTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    return [
      {
        id: 'test_seed_01',
        title: 'Science Unit Test: Human Eye & Atmospheric Refraction',
        subject: 'Science & Technology',
        classId: '8',
        sections: ['A', 'B', 'C', 'D', 'E'],
        chapter: 'Chapter 11: Human Eye',
        durationMinutes: 30,
        totalMarks: 25,
        testCode: 'DAV-SCI-801',
        createdBy: 'Mrs. Sunita Sharma',
        questions: [
          {
            id: 1,
            questionText: 'What is the least distance of distinct vision for a normal human eye?',
            options: ['25 meters', '25 centimeters', '2.5 centimeters', 'Infinity'],
            correctAnswer: 'B',
            explanation: 'The standard near point of distinct vision is 25 cm.'
          },
          {
            id: 2,
            questionText: 'Which optical phenomenon causes the twinkling of stars in the night sky?',
            options: ['Atmospheric Refraction', 'Total Internal Reflection', 'Dispersion of Light', 'Diffraction'],
            correctAnswer: 'A',
            explanation: 'Continuous variation in refractive index of atmospheric air layers causes twinkling.'
          },
          {
            id: 3,
            questionText: 'Which lens type corrects Hypermetropia (far-sightedness)?',
            options: ['Concave Lens', 'Convex Lens', 'Cylindrical Lens', 'Bifocal Lens'],
            correctAnswer: 'B',
            explanation: 'A converging convex lens is used to correct hypermetropia.'
          },
          {
            id: 4,
            questionText: 'The colored part of the eye that regulates pupil aperture is the:',
            options: ['Cornea', 'Iris', 'Retina', 'Sclera'],
            correctAnswer: 'B',
            explanation: 'The iris is a dark muscular diaphragm controlling pupil size.'
          },
          {
            id: 5,
            questionText: 'Danger signal lights are made red because red light has:',
            options: ['Shortest wavelength and scatters most', 'Longest wavelength and scatters least', 'Highest frequency in air', 'Zero absorption in fog'],
            correctAnswer: 'B',
            explanation: 'Red has the longest wavelength and is least scattered by fog and smoke.'
          }
        ]
      },
      {
        id: 'test_seed_02',
        title: 'Mathematics Unit Test: Compound Interest & Commercial Arithmetic',
        subject: 'Mathematics',
        classId: '8',
        sections: ['A', 'B', 'C', 'D', 'E'],
        chapter: 'Chapter 6: Compound Interest',
        durationMinutes: 40,
        totalMarks: 30,
        testCode: 'DAV-MATH-802',
        createdBy: 'Mr. Rajesh Verma',
        questions: [
          {
            id: 1,
            questionText: 'If interest is compounded half-yearly, the rate of interest is:',
            options: ['Doubled', 'Halved', 'Multiplied by 4', 'Remains unchanged'],
            correctAnswer: 'B',
            explanation: 'For semi-annual compounding, rate becomes r/2 and conversion periods double.'
          },
          {
            id: 2,
            questionText: 'Find the compound interest on Rs. 10,000 for 2 years at 10% per annum compounded annually.',
            options: ['Rs. 2,000', 'Rs. 2,100', 'Rs. 2,200', 'Rs. 2,050'],
            correctAnswer: 'B',
            explanation: 'Amount = 10000 * 1.1 * 1.1 = Rs. 12,100. CI = 12,100 - 10,000 = Rs. 2,100.'
          },
          {
            id: 3,
            questionText: 'The difference between CI and SI for 1 year at 10% per annum compounded annually is:',
            options: ['Rs. 0', 'Rs. 10', 'Rs. 100', 'Depends on principal'],
            correctAnswer: 'A',
            explanation: 'For the first conversion period under annual compounding, CI equals SI.'
          }
        ]
      }
    ];
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

    const code = 'DAV-' + newTestSubject.slice(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
    const newExam = {
      id: 'test_custom_' + Date.now(),
      title: newTestTitle.trim(),
      subject: newTestSubject,
      classId: newTestClass,
      sections: [...newTestSections],
      chapter: newTestChapter.trim() || 'Curriculum Unit',
      format: testFormatChoice,
      durationMinutes: Number(newTestDuration) || 30,
      totalMarks: newTestQuestions.length * 5,
      testCode: code,
      createdBy: user?.name ? 'Prof. ' + user.name : 'Verified DAV Faculty',
      questions: newTestQuestions.map((q, idx) => ({
        id: idx + 1,
        questionText: q.questionText || ('Question ' + (idx + 1)),
        options: q.options.map((opt, oIdx) => opt.trim() || ('Option ' + String.fromCharCode(65 + oIdx))),
        correctAnswer: q.correctAnswer || 'A',
        explanation: q.explanation.trim() || 'Refer to DAV Board syllabus for complete theorem details.'
      }))
    };

    const updated = [newExam, ...testsDatabase];
    persistTests(updated);
    setDeployedShareCode(code);
    playSoundChime('sent');
  };

  // Student CBT Exam Simulator State
  const [isTakingExam, setIsTakingExam] = useState(false);
  const [activeExamData, setActiveExamData] = useState(null);
  const [examCurrentQIdx, setExamCurrentQIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState({}); // qId -> optionLetter ('A'|'B'|'C'|'D')
  const [examPaletteStatus, setExamPaletteStatus] = useState({}); // qId -> 'unvisited' | 'not_attempted' | 'answered' | 'review'
  const [examTimeRemaining, setExamTimeRemaining] = useState(1800);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examResultScore, setExamResultScore] = useState(null);
  const [examLeaderboard, setExamLeaderboard] = useState([]);

  // Start CBT Exam
  const handleStartExam = (test) => {
    setActiveExamData(test);
    setExamCurrentQIdx(0);
    setExamAnswers({});
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

  // Select Option in CBT
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
    // If current was unvisited, mark not_attempted
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
    activeExamData.questions.forEach(q => {
      if (examAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const totalQuestions = activeExamData.questions.length;
    const scorePerQ = Math.round(activeExamData.totalMarks / totalQuestions);
    const totalScoreObtained = correctCount * scorePerQ;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const cbse = calculateCbseGrade(percentage);

    const result = {
      correctCount,
      totalQuestions,
      totalScoreObtained,
      maxMarks: activeExamData.totalMarks,
      percentage,
      grade: cbse.grade,
      remarks: cbse.remarks,
      studentName: user?.name || 'Aryan Sharma',
      timeSpentMinutes: Math.round((activeExamData.durationMinutes * 60 - examTimeRemaining) / 60)
    };

    setExamResultScore(result);
    setExamSubmitted(true);
    playSoundChime('delivered');

    // Generate dynamic mock leaderboard with current student
    const leaderboard = [
      { rank: 1, name: 'Ananya Verma', score: activeExamData.totalMarks, time: '14 mins', badge: 'Gold' },
      { rank: 2, name: (user?.name || 'Aryan Sharma') + ' (You)', score: totalScoreObtained, time: result.timeSpentMinutes + ' mins', badge: percentage >= 80 ? 'Silver' : 'Participant', isCurrent: true },
      { rank: 3, name: 'Rohan Gupta', score: Math.round(activeExamData.totalMarks * 0.85), time: '19 mins', badge: 'Bronze' },
      { rank: 4, name: 'Kavita Singh', score: Math.round(activeExamData.totalMarks * 0.75), time: '22 mins', badge: 'Merit' },
      { rank: 5, name: 'Aditya Raj', score: Math.round(activeExamData.totalMarks * 0.65), time: '25 mins', badge: 'Merit' }
    ].sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }));

    setExamLeaderboard(leaderboard);
  };

  // Format MM:SS
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

    const seedRoster = {};
    SCHOOL_CLASSES_CONFIG.forEach(c => {
      c.sections.forEach(s => {
        const key = c.id + '-' + s;
        seedRoster[key] = [
          { roll: 1, name: 'Aarav Kumar', status: 'present' },
          { roll: 2, name: 'Ananya Verma', status: 'present' },
          { roll: 3, name: 'Aryan Sharma', status: 'present' },
          { roll: 4, name: 'Bhavna Jha', status: 'present' },
          { roll: 5, name: 'Chirag Tiwari', status: 'absent' },
          { roll: 6, name: 'Divyansh Roy', status: 'present' },
          { roll: 7, name: 'Esha Mukherjee', status: 'present' },
          { roll: 8, name: 'Farhan Ali', status: 'late' },
          { roll: 9, name: 'Gaurav Pathak', status: 'present' },
          { roll: 10, name: 'Ishita Sen', status: 'present' }
        ];
      });
    });
    return seedRoster;
  });

  const currentAttKey = selectedAttClass + '-' + selectedAttSection;
  const currentAttRoster = attendanceStore[currentAttKey] || [
    { roll: 1, name: 'Aarav Kumar', status: 'present' },
    { roll: 2, name: 'Aryan Sharma', status: 'present' },
    { roll: 3, name: 'Ananya Verma', status: 'present' }
  ];

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

  // =========================================================================
  // PAGE 6: STUDENT MARKS & EXAMINATION LEDGER
  // =========================================================================
  const [isMarksModalOpen, setIsMarksModalOpen] = useState(false);
  const [selectedMarksClass, setSelectedMarksClass] = useState('8');
  const [selectedMarksSection, setSelectedMarksSection] = useState('D');
  const [selectedMarksTerm, setSelectedMarksTerm] = useState('First Periodic Test (PT-1)');
  const [marksToast, setMarksToast] = useState(null);
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [selectedReportStudent, setSelectedReportStudent] = useState(null);

  const availableTerms = selectedMarksClass === '8' 
    ? EXAM_TERMS_CONFIG.class8 
    : EXAM_TERMS_CONFIG.lowerClasses;

  // Initial Marks Database for Class 8-D
  const [marksLedgerStore, setMarksLedgerStore] = useState(() => {
    try {
      const stored = localStorage.getItem(MARKS_LEDGER_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}

    const seedMarks = {};
    const key = '8-D-First Periodic Test (PT-1)';
    seedMarks[key] = [
      { roll: 1, name: 'Aarav Kumar', marks: { english: 88, hindi: 85, maths: 92, science: 90, sst: 86, sanskrit: 89, computer: 95 } },
      { roll: 2, name: 'Ananya Verma', marks: { english: 95, hindi: 92, maths: 98, science: 96, sst: 94, sanskrit: 95, computer: 99 } },
      { roll: 3, name: 'Aryan Sharma', marks: { english: 91, hindi: 89, maths: 94, science: 95, sst: 90, sanskrit: 88, computer: 96 } },
      { roll: 4, name: 'Bhavna Jha', marks: { english: 82, hindi: 80, maths: 78, science: 84, sst: 81, sanskrit: 85, computer: 90 } },
      { roll: 5, name: 'Chirag Tiwari', marks: { english: 75, hindi: 72, maths: 68, science: 74, sst: 70, sanskrit: 76, computer: 82 } },
      { roll: 6, name: 'Divyansh Roy', marks: { english: 89, hindi: 84, maths: 91, science: 88, sst: 85, sanskrit: 87, computer: 92 } },
      { roll: 7, name: 'Esha Mukherjee', marks: { english: 94, hindi: 90, maths: 96, science: 93, sst: 92, sanskrit: 91, computer: 97 } }
    ];
    return seedMarks;
  });

  const currentMarksKey = selectedMarksClass + '-' + selectedMarksSection + '-' + selectedMarksTerm;
  const currentMarksRoster = marksLedgerStore[currentMarksKey] || [
    { roll: 1, name: 'Aarav Kumar', marks: { english: 85, hindi: 80, maths: 88, science: 86, sst: 82, sanskrit: 84, computer: 90 } },
    { roll: 2, name: 'Ananya Verma', marks: { english: 94, hindi: 92, maths: 98, science: 95, sst: 93, sanskrit: 94, computer: 98 } },
    { roll: 3, name: 'Aryan Sharma', marks: { english: 90, hindi: 88, maths: 92, science: 94, sst: 89, sanskrit: 86, computer: 95 } }
  ];

  // Update a Student's subject mark
  const handleUpdateStudentMark = (roll, subjectKey, value) => {
    if (!isFacultyRole) return;
    const numVal = Math.min(100, Math.max(0, Number(value) || 0));
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

  // Compute total, percentage, grade for a student marks record
  const computeStudentAggregates = (marksObj) => {
    const subjects = ['english', 'hindi', 'maths', 'science', 'sst', 'sanskrit', 'computer'];
    let total = 0;
    subjects.forEach(sub => {
      total += Number(marksObj[sub]) || 0;
    });
    const maxMarks = 700;
    const percentage = Math.round((total / maxMarks) * 100);
    const cbse = calculateCbseGrade(percentage);
    return { total, maxMarks, percentage, ...cbse };
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
                      <span>Faculty Academic Direct Desk - Verified Teachers Directory</span>
                    </h2>
                    <p className="text-xs text-purple-200/90 mt-0.5">
                      Direct academic doubt clearance - Rich media support (Image, Audio, Video) - Sub-second delivery
                    </p>
                  </div>

                  {/* Controls: Mode Toggle, Edit Profile, Wallpaper */}
                  <div className="flex items-center gap-2 flex-wrap">
                    
                    {/* Role Toggle */}
                    <div className="bg-slate-900 border border-purple-700 rounded-xl p-0.5 text-xs flex items-center">
                      <button
                        onClick={() => {
                          setChatRole('student');
                          playSoundChime('sent');
                        }}
                        className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                          chatRole === 'student' ? 'bg-teal-500 text-slate-950 font-black shadow-md' : 'text-purple-300 hover:text-white'
                        }`}
                      >
                        Student Mode (Ask)
                      </button>
                      <button
                        onClick={() => {
                          setChatRole('teacher');
                          playSoundChime('sent');
                        }}
                        className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                          chatRole === 'teacher' ? 'bg-purple-600 text-white font-black shadow-md' : 'text-purple-300 hover:text-white'
                        }`}
                      >
                        Teacher Mode (Reply)
                      </button>
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
                  </div>
                )}

                {/* Main Full-Screen Direct Chat Interface */}
                <div className="w-full h-[80vh] min-h-[580px] rounded-3xl bg-slate-950 border-2 border-purple-500/50 overflow-hidden shadow-2xl flex flex-col md:flex-row">
                  
                  {/* Left Column: Teachers Roster & Filter */}
                  <div className={`w-full md:w-80 lg:w-96 bg-slate-900 border-r border-purple-800/80 flex flex-col shrink-0 ${
                    mobileChatTab === 'chat' ? 'hidden md:flex' : 'flex'
                  }`}>
                    
                    {/* Search Bar */}
                    <div className="p-3 bg-purple-950/90 border-b border-purple-800 space-y-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Search teachers by name or subject..."
                          value={teacherSearchQuery}
                          onChange={(e) => setTeacherSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-purple-700 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      {/* Department Filter Pills */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin text-[10px]">
                        {['all', 'Science', 'Mathematics', 'Social Science', 'Hindi', 'English', 'Sanskrit', 'Computer Science'].map((d) => (
                          <button
                            key={d}
                            onClick={() => setTeacherDeptFilter(d)}
                            className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap cursor-pointer transition ${
                              teacherDeptFilter === d
                                ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black'
                                : 'bg-slate-950 text-purple-300 hover:text-white'
                            }`}
                          >
                            {d === 'all' ? `All (${teachersList.length})` : d}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Teachers Scrollable List */}
                    <div className="flex-1 overflow-y-auto divide-y divide-purple-950/80">
                      {teachersList
                        .filter(t => {
                          if (teacherDeptFilter !== 'all' && t.department !== teacherDeptFilter) return false;
                          if (!teacherSearchQuery.trim()) return true;
                          const q = teacherSearchQuery.toLowerCase();
                          return t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
                        })
                        .map((t) => {
                          const isActive = t.id === activeTeacherId;
                          const lastMsg = (teacherChatsMap[t.id] || [])[(teacherChatsMap[t.id] || []).length - 1];

                          return (
                            <div
                              key={t.id}
                              onClick={() => handleSelectTeacher(t.id)}
                              className={`p-3 flex items-start gap-3 transition cursor-pointer hover:bg-purple-950/40 ${
                                isActive ? 'bg-purple-900/50 border-l-4 border-teal-400' : ''
                              }`}
                            >
                              {/* Teacher DP or Gradient Avatar */}
                              {t.dp ? (
                                <div className="relative shrink-0">
                                  <img src={t.dp} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shadow-md" />
                                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-slate-900" />
                                </div>
                              ) : (
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor || 'from-purple-600 to-indigo-700'} flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 shadow-md relative`}>
                                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-slate-900" />
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <div className="flex items-center gap-1.5 truncate">
                                    <h4 className="text-xs font-black text-white truncate">{t.name}</h4>
                                    {t.isRegisteredFaculty && (
                                      <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-teal-400 text-slate-950 font-mono shrink-0 shadow-xs">
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-purple-400 font-mono shrink-0">
                                    {lastMsg?.time || 'Today'}
                                  </span>
                                </div>
                                <span className="inline-block text-[10px] text-teal-300 font-mono truncate max-w-full">
                                  {t.subject}
                                </span>
                                <p className="text-[11px] text-purple-200/70 truncate mt-0.5">
                                  {lastMsg?.text || (lastMsg?.media ? `[${lastMsg.media.type.toUpperCase()} Attachment]` : t.initialMessage)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>

                  </div>

                  {/* Right Column: 1-on-1 Direct Chat Workspace */}
                  <div className={`flex-1 flex flex-col bg-slate-950 min-w-0 relative ${
                    mobileChatTab === 'roster' ? 'hidden md:flex' : 'flex'
                  }`}>
                    
                    {/* Active Teacher Header */}
                    <div className="p-3 bg-purple-950 border-b border-purple-800 flex items-center justify-between text-white shrink-0 flex-wrap gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Mobile Back Button */}
                        <button
                          onClick={() => setMobileChatTab('roster')}
                          className="md:hidden p-1.5 rounded-xl bg-purple-900/70 hover:bg-purple-800 text-teal-300 flex items-center gap-1 text-xs cursor-pointer font-bold border border-purple-700"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Roster</span>
                        </button>

                        {activeTeacher.dp ? (
                          <img src={activeTeacher.dp} alt={activeTeacher.name} className="w-10 h-10 rounded-full object-cover border-2 border-teal-400 shadow-md shrink-0" />
                        ) : (
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeTeacher.avatarColor || 'from-purple-600 to-indigo-700'} flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shrink-0`}>
                            {activeTeacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-white truncate">{activeTeacher.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                              {activeTeacher.subject}
                            </span>
                          </div>
                          <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Online - Sub-second delivery - {activeTeacher.role}</span>
                          </p>
                        </div>
                      </div>

                      {/* AI Quick Response Action */}
                      <button
                        onClick={handleInstantAIAnswer}
                        className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                        title="Generate instant conceptual explanation"
                      >
                        <Bot className="w-3.5 h-3.5 text-teal-200" />
                        <span>Instant Teacher AI Answer</span>
                      </button>
                    </div>

                    {/* Chat Messages Container with Custom Wallpaper support */}
                    <div
                      className="flex-1 p-4 overflow-y-auto space-y-3"
                      style={
                        chatWallpaper.startsWith('data:') || chatWallpaper.startsWith('http')
                          ? { backgroundImage: `url(${chatWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                          : chatWallpaper === 'emerald'
                          ? { background: 'linear-gradient(135deg, #022c22 0%, #020617 100%)' }
                          : chatWallpaper === 'purple'
                          ? { background: 'linear-gradient(135deg, #2e1065 0%, #020617 100%)' }
                          : { background: '#020617' }
                      }
                    >
                      {(teacherChatsMap[activeTeacher.id] || []).map((msg) => {
                        const isStudent = msg.sender === 'student';

                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'} animate-fadeIn`}
                          >
                            {/* Sender Identity Display */}
                            <div className="text-[10px] font-bold px-1 mb-0.5 flex items-center gap-1">
                              {isStudent ? (
                                <>
                                  <span className="text-teal-300">{msg.senderName || user?.name || 'Aryan Sharma'}</span>
                                  <span className="text-purple-300 font-normal">({msg.senderClassSec || 'Class 8-D'})</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-purple-200">{msg.senderName || activeTeacher.name}</span>
                                  <span className="text-teal-300 font-normal">({msg.senderClassSec || activeTeacher.subject})</span>
                                  {msg.isAiAssisted && (
                                    <span className="px-1.5 py-0.2 rounded bg-teal-400/20 text-teal-300 border border-teal-400/30 text-[8px] font-mono font-bold">
                                      AI Conceptual
                                    </span>
                                  )}
                                </>
                              )}
                            </div>

                            {/* Message Bubble */}
                            <div
                              className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl shadow-lg space-y-1.5 ${
                                isStudent
                                  ? 'bg-gradient-to-br from-teal-600 to-cyan-700 text-white rounded-br-none border border-teal-400/40'
                                  : 'bg-slate-900/95 text-purple-100 rounded-bl-none border border-purple-800'
                              }`}
                            >
                              {/* Media Renderers (Image, Audio, Video) */}
                              {msg.media && (
                                <div className="pt-1">
                                  {msg.media.type === 'image' && (
                                    <img
                                      src={msg.media.dataUrl}
                                      alt="Attachment"
                                      className="max-w-full max-h-60 rounded-xl object-cover cursor-pointer border border-purple-500/30 shadow-md"
                                      onClick={() => window.open(msg.media.dataUrl, '_blank')}
                                    />
                                  )}
                                  {msg.media.type === 'audio' && (
                                    <div className="bg-slate-950/80 p-2 rounded-xl border border-purple-700/50">
                                      <audio controls src={msg.media.dataUrl} className="w-full max-w-xs" />
                                      <span className="text-[9px] text-teal-300 font-mono block mt-1">{msg.media.name || 'Voice Doubt Audio'}</span>
                                    </div>
                                  )}
                                  {msg.media.type === 'video' && (
                                    <div className="bg-slate-950/80 p-1.5 rounded-xl border border-purple-700/50">
                                      <video controls src={msg.media.dataUrl} className="w-full max-w-xs max-h-60 rounded-lg" />
                                      <span className="text-[9px] text-teal-300 font-mono block mt-1">{msg.media.name || 'Video Explanation'}</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {msg.text && (
                                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                              )}

                              <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono opacity-80 pt-0.5">
                                <span>{msg.time}</span>
                                {isStudent && (
                                  <span>
                                    {msg.status === 'delivered' ? (
                                      <CheckCheck className="w-3 h-3 text-cyan-200" />
                                    ) : (
                                      <Check className="w-3 h-3 text-slate-300" />
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Pending Media Attachment Preview */}
                    {pendingMedia && (
                      <div className="px-4 py-2 bg-purple-950/90 border-t border-purple-800 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-teal-300">
                          {pendingMedia.type === 'image' && <ImageIcon className="w-4 h-4" />}
                          {pendingMedia.type === 'audio' && <Music className="w-4 h-4" />}
                          {pendingMedia.type === 'video' && <Film className="w-4 h-4" />}
                          <span className="font-bold truncate max-w-xs">{pendingMedia.name}</span>
                          <span className="text-[10px] uppercase font-mono text-purple-300">({pendingMedia.type})</span>
                        </div>
                        <button
                          onClick={() => setPendingMedia(null)}
                          className="p-1 rounded-lg hover:bg-purple-900 text-purple-300 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Sticky Bottom Input Bar (Ensures 100% accessibility on mobile portrait) */}
                    <div className="p-3 bg-purple-950/95 border-t border-purple-800 space-y-2 shrink-0">
                      
                      <div className="flex items-center gap-2">
                        {/* Media Attachment Actions */}
                        <div className="flex items-center gap-1">
                          <input
                            type="file"
                            accept="image/*"
                            id="chat-image-upload"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, 'image')}
                          />
                          <label
                            htmlFor="chat-image-upload"
                            title="Attach Textbook Photo / Diagram"
                            className="p-2 rounded-xl bg-slate-900 hover:bg-purple-900 text-purple-300 hover:text-teal-300 border border-purple-700 cursor-pointer"
                          >
                            <ImageIcon className="w-4 h-4" />
                          </label>

                          <input
                            type="file"
                            accept="audio/*"
                            id="chat-audio-upload"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, 'audio')}
                          />
                          <label
                            htmlFor="chat-audio-upload"
                            title="Attach Audio Voice Doubt"
                            className="p-2 rounded-xl bg-slate-900 hover:bg-purple-900 text-purple-300 hover:text-teal-300 border border-purple-700 cursor-pointer"
                          >
                            <Music className="w-4 h-4" />
                          </label>

                          <input
                            type="file"
                            accept="video/*"
                            id="chat-video-upload"
                            className="hidden"
                            onChange={(e) => handleMediaUpload(e, 'video')}
                          />
                          <label
                            htmlFor="chat-video-upload"
                            title="Attach Video Doubt"
                            className="p-2 rounded-xl bg-slate-900 hover:bg-purple-900 text-purple-300 hover:text-teal-300 border border-purple-700 cursor-pointer"
                          >
                            <Film className="w-4 h-4" />
                          </label>
                        </div>

                        {/* Text Input */}
                        <input
                          type="text"
                          value={chatInputText}
                          onChange={(e) => setChatInputText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder={`Type doubt query to ${activeTeacher.name}...`}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-600 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-teal-400"
                        />

                        {/* Send Button */}
                        <button
                          onClick={handleSendMessage}
                          disabled={!chatInputText.trim() && !pendingMedia}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition transform active:scale-95"
                        >
                          <span>Send</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Edit Faculty Profile Modal (Dimension 5 Only) */}
                {showTeacherProfileModal && isDimension5 && (
                  <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
                    <div className="w-full max-w-md bg-purple-950/95 border-2 border-teal-400/80 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-teal-300" />
                          <span>Configure Faculty Profile &amp; DP</span>
                        </h3>
                        <button onClick={() => setShowTeacherProfileModal(false)} className="text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveTeacherProfile} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Faculty Full Name</label>
                          <input
                            type="text"
                            value={customProfileForm.name}
                            onChange={(e) => setCustomProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g. Prof. Sunita Sharma"
                            className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Teaching Subject</label>
                          <select
                            value={customProfileForm.subject}
                            onChange={(e) => setCustomProfileForm(prev => ({ ...prev, subject: e.target.value }))}
                            className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                          >
                            <option value="Science &amp; Biology">Science &amp; Biology</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Social Science">Social Science</option>
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="Sanskrit">Sanskrit</option>
                            <option value="Computer Science">Computer Science</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Profile Photo (DP)</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              id="custom-faculty-dp-upload"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const r = new FileReader();
                                  r.onload = (ev) => {
                                    setCustomProfileForm(prev => ({ ...prev, dp: ev.target.result }));
                                  };
                                  r.readAsDataURL(file);
                                }
                              }}
                            />
                            <label
                              htmlFor="custom-faculty-dp-upload"
                              className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold cursor-pointer transition shadow-xs"
                            >
                              {customProfileForm.dp ? 'Change DP Photo' : 'Upload DP Photo'}
                            </label>
                            {customProfileForm.dp && (
                              <img src={customProfileForm.dp} alt="DP Preview" className="w-10 h-10 rounded-full object-cover border-2 border-teal-400" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-purple-800">
                          <button
                            type="button"
                            onClick={() => setShowTeacherProfileModal(false)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-purple-200 font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-teal-400 text-slate-950 font-black shadow-md cursor-pointer"
                          >
                            Save Faculty Profile
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
                            setLiveSessionsStore(prev => [myBroadcast, ...prev.filter(p => p.id !== myBroadcast.id)]);
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
                    {scheduledLiveClasses.filter(c => c.classId === '8').map((session) => (
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
                
                {/* Gen Z Hero Animated Graphical Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-amber-950 border-2 border-amber-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono font-bold text-amber-300">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-300" />
                      <span>PAGE 4 - ONLINE TEST &amp; EXAMINATION SIMULATOR</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Take Real <span className="bg-gradient-to-r from-amber-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Chapter &amp; Unit Tests</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Dimension 5 faculty creates and deploys standardized unit tests. Students attempt timed exams with CBT Question Palette Matrix (White, Red, Green, Yellow), instant auto-grading, and solution review.
                    </p>

                    {/* Action Buttons: Student Attempt vs Teacher Create */}
                    <div className="pt-2 flex items-center gap-3 flex-wrap">
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

                {/* Available Tests Preview for Class 8-D */}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testsDatabase
                      .filter(t => t.classId === selectedTestClass && (t.sections ? t.sections.includes(selectedTestSection) : true))
                      .map((t) => (
                        <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-purple-800 hover:border-amber-400 transition shadow-lg space-y-3 flex flex-col justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold font-mono">
                                {t.subject}
                              </span>
                              <span className="text-xs text-amber-300 font-mono">{t.durationMinutes} Mins</span>
                            </div>
                            <h4 className="text-sm font-black text-white">{t.title}</h4>
                            <p className="text-xs text-purple-300">{t.chapter}</p>
                            <div className="flex items-center gap-2 text-xs text-purple-400 font-mono">
                              <span>Total Marks: {t.totalMarks}</span>
                              <span>-</span>
                              <span>{t.questions.length} Questions</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleStartExam(t)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:opacity-95"
                          >
                            Attempt Test Now
                          </button>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Pop-up for Class & Section selection for Tests */}
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
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedTestClass(c.id)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedTestClass === c.id
                                  ? 'bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 border-amber-300 shadow-md scale-105'
                                  : 'bg-slate-900 text-purple-300 border-purple-800 hover:border-purple-600'
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Select Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-teal-300 tracking-wider font-mono">
                          Step 2: Select Section (A to E)
                        </label>
                        <div className="grid grid-cols-5 gap-2 max-w-md">
                          {['A', 'B', 'C', 'D', 'E'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedTestSection(s)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedTestSection === s
                                  ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md scale-105'
                                  : 'bg-slate-900 text-teal-300 border-teal-900 hover:border-teal-700'
                              }`}
                            >
                              Section {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setIsTestPortalOpen(false)}
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-teal-400 text-slate-950 font-black text-sm cursor-pointer shadow-xl hover:opacity-95"
                        >
                          Show Available Tests for Class {selectedTestClass} - Section {selectedTestSection}
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* Teacher Test Creator Modal (Dimension 5 Only) */}
                {showCreateTestModal && isDimension5 && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-5 bg-purple-950/95 border-2 border-teal-400 rounded-3xl p-6 shadow-2xl">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                        <h2 className="text-lg font-black text-white flex items-center gap-2">
                          <Plus className="w-5 h-5 text-teal-300" />
                          <span>Author &amp; Deploy New Examination (Dimension 5)</span>
                        </h2>
                        <button onClick={() => setShowCreateTestModal(false)} className="text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {deployedShareCode ? (
                        <div className="p-8 text-center space-y-4 bg-slate-900 rounded-2xl border border-teal-400">
                          <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto" />
                          <h3 className="text-xl font-black text-white">Examination Successfully Deployed!</h3>
                          <p className="text-xs text-purple-200">
                            Students in Class {newTestClass} (Sections {newTestSections.join(', ')}) can now attempt this examination.
                          </p>
                          <div className="p-3 bg-purple-950 rounded-xl font-mono text-sm text-teal-300 font-bold border border-purple-700 max-w-sm mx-auto">
                            Test Code: {deployedShareCode}
                          </div>
                          <button
                            onClick={() => setShowCreateTestModal(false)}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                          >
                            Done &amp; Return to Test Suite
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleDeployExamination} className="space-y-4 text-xs">
                          
                          {/* Step 1: Format Selection */}
                          <div>
                            <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">
                              Step 1: Examination Format
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { id: 'mcq', label: '1. MCQ Test (Auto-Graded)' },
                                { id: 'subjective', label: '2. Subjective Test' },
                                { id: 'combined', label: '3. Combined (MCQ + Subjective)' }
                              ].map(f => (
                                <button
                                  type="button"
                                  key={f.id}
                                  onClick={() => setTestFormatChoice(f.id)}
                                  className={`p-3 rounded-xl border text-center font-bold transition cursor-pointer ${
                                    testFormatChoice === f.id
                                      ? 'bg-teal-500 text-slate-950 border-teal-300 shadow-md font-black'
                                      : 'bg-slate-900 text-purple-200 border-purple-800 hover:border-purple-600'
                                  }`}
                                >
                                  {f.label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Step 2: Target Class & Sections */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">
                                Target Class (LKG to 8)
                              </label>
                              <select
                                value={newTestClass}
                                onChange={(e) => setNewTestClass(e.target.value)}
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              >
                                {SCHOOL_CLASSES_CONFIG.map(c => (
                                  <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">
                                Target Sections (Multi-Select)
                              </label>
                              <div className="flex items-center gap-2 pt-1">
                                {['A', 'B', 'C', 'D', 'E'].map(s => (
                                  <label key={s} className="flex items-center gap-1.5 cursor-pointer bg-slate-900 px-2.5 py-1.5 rounded-lg border border-purple-700">
                                    <input
                                      type="checkbox"
                                      checked={newTestSections.includes(s)}
                                      onChange={() => handleToggleSectionCheckbox(s)}
                                      className="rounded accent-teal-400"
                                    />
                                    <span className="text-white font-bold">{s}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Subject, Title & Chapter */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Subject</label>
                              <select
                                value={newTestSubject}
                                onChange={(e) => setNewTestSubject(e.target.value)}
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              >
                                {['Science & Technology', 'Mathematics', 'Social Science', 'English', 'Hindi', 'Sanskrit', 'Computer Science'].map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Examination Title</label>
                              <input
                                type="text"
                                value={newTestTitle}
                                onChange={(e) => setNewTestTitle(e.target.value)}
                                placeholder="e.g. Weekly Formative Test 2"
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Chapter Reference</label>
                              <input
                                type="text"
                                value={newTestChapter}
                                onChange={(e) => setNewTestChapter(e.target.value)}
                                placeholder="e.g. Chapter 11: Human Eye"
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              />
                            </div>
                          </div>

                          {/* Duration & Window */}
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Duration (Minutes)</label>
                              <input
                                type="number"
                                min={5}
                                max={180}
                                value={newTestDuration}
                                onChange={(e) => setNewTestDuration(e.target.value)}
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Window Start Time</label>
                              <input
                                type="text"
                                value={newTestStartTime}
                                onChange={(e) => setNewTestStartTime(e.target.value)}
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1 font-mono">Window End Time</label>
                              <input
                                type="text"
                                value={newTestEndTime}
                                onChange={(e) => setNewTestEndTime(e.target.value)}
                                className="w-full bg-slate-900 border border-purple-600 rounded-xl p-2.5 text-white"
                              />
                            </div>
                          </div>

                          {/* Question Authoring Section (Starts with 5 MCQs + Unlimited Add) */}
                          <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between pb-1 border-b border-purple-800">
                              <h3 className="text-xs font-black uppercase text-teal-300 font-mono tracking-wider">
                                Question Authoring ({newTestQuestions.length} Questions)
                              </h3>
                              <button
                                type="button"
                                onClick={handleAddQuestion}
                                className="px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Another MCQ</span>
                              </button>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                              {newTestQuestions.map((q, qIdx) => (
                                <div key={q.id || qIdx} className="p-4 rounded-2xl bg-slate-900 border border-purple-800 space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-teal-300 font-mono text-xs">Question #{qIdx + 1}</span>
                                    {newTestQuestions.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveQuestion(qIdx)}
                                        className="text-rose-400 hover:text-rose-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                        <span>Remove</span>
                                      </button>
                                    )}
                                  </div>

                                  <input
                                    type="text"
                                    value={q.questionText}
                                    onChange={(e) => {
                                      const text = e.target.value;
                                      setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, questionText: text } : item));
                                    }}
                                    placeholder="Enter question text here..."
                                    className="w-full bg-slate-950 border border-purple-700 rounded-xl p-2.5 text-white"
                                    required
                                  />

                                  {/* 4 Choices */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {['A', 'B', 'C', 'D'].map((letter, optIdx) => (
                                      <div key={letter} className="flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-lg bg-purple-900 text-teal-300 font-black flex items-center justify-center text-xs shrink-0 font-mono">
                                          {letter}
                                        </span>
                                        <input
                                          type="text"
                                          value={q.options[optIdx] || ''}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setNewTestQuestions(prev => prev.map((item, idx) => {
                                              if (idx !== qIdx) return item;
                                              const newOpts = [...item.options];
                                              newOpts[optIdx] = val;
                                              return { ...item, options: newOpts };
                                            }));
                                          }}
                                          placeholder={`Option ${letter} text...`}
                                          className="flex-1 bg-slate-950 border border-purple-800 rounded-lg p-2 text-white text-xs"
                                          required
                                        />
                                      </div>
                                    ))}
                                  </div>

                                  {/* Answer Key & Explanation */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-purple-900/60">
                                    <div className="flex items-center gap-2">
                                      <label className="text-[11px] text-teal-300 font-bold font-mono">Correct Answer:</label>
                                      <select
                                        value={q.correctAnswer}
                                        onChange={(e) => {
                                          const ans = e.target.value;
                                          setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, correctAnswer: ans } : item));
                                        }}
                                        className="bg-slate-950 border border-teal-500 rounded-lg p-1.5 text-teal-300 font-bold text-xs"
                                      >
                                        <option value="A">Option A</option>
                                        <option value="B">Option B</option>
                                        <option value="C">Option C</option>
                                        <option value="D">Option D</option>
                                      </select>
                                    </div>

                                    <input
                                      type="text"
                                      value={q.explanation}
                                      onChange={(e) => {
                                        const exp = e.target.value;
                                        setNewTestQuestions(prev => prev.map((item, idx) => idx === qIdx ? { ...item, explanation: exp } : item));
                                      }}
                                      placeholder="Solution explanation (shown in student review)..."
                                      className="bg-slate-950 border border-purple-800 rounded-lg p-1.5 text-purple-200 text-xs"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-3 pt-4 border-t border-purple-800">
                            <button
                              type="button"
                              onClick={() => setShowCreateTestModal(false)}
                              className="px-4 py-2.5 rounded-xl bg-slate-800 text-purple-200 font-bold"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black shadow-lg cursor-pointer hover:scale-105"
                            >
                              Deploy Test to Students
                            </button>
                          </div>

                        </form>
                      )}

                    </div>
                  </div>
                )}

                {/* 100% Full-Screen Student Exam Simulator (CBT) */}
                {isTakingExam && activeExamData && (
                  <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-fadeIn text-white">
                    
                    {/* Top CBT Header: Test Name, Timer Countdown, End Test */}
                    <div className="p-4 bg-slate-900 border-b border-purple-800 flex items-center justify-between flex-wrap gap-3 shrink-0">
                      <div>
                        <h3 className="text-sm font-black text-white flex items-center gap-2">
                          <span>{activeExamData.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 border border-amber-500 text-amber-300 font-mono font-bold">
                            {activeExamData.testCode || 'DAV-CBT'}
                          </span>
                        </h3>
                        <p className="text-xs text-purple-300 font-mono">
                          Candidate: <strong className="text-teal-300">{user?.name || 'Aryan Sharma'}</strong> (Class {activeExamData.classId}-{selectedTestSection})
                        </p>
                      </div>

                      {/* Timer & Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/80 shadow-md">
                          <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                          <span className="text-xs font-mono font-bold text-purple-300">Time Left:</span>
                          <span className="text-base font-black font-mono text-amber-400">
                            {formatTimerClock(examTimeRemaining)}
                          </span>
                        </div>

                        {!examSubmitted && (
                          <button
                            onClick={handleSubmitExam}
                            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                          >
                            Submit Test
                          </button>
                        )}

                        <button
                          onClick={() => {
                            setIsTakingExam(false);
                            playSoundChime('alert');
                          }}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 text-purple-300 hover:text-white text-xs font-bold"
                        >
                          End &amp; Exit
                        </button>
                      </div>
                    </div>

                    {/* Main CBT Workspace: 80% Left Question Arena + 20% Right Question Palette Matrix */}
                    {!examSubmitted ? (
                      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        
                        {/* 80% Left Question Workspace */}
                        <div className="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-y-auto space-y-6 bg-slate-950">
                          {(() => {
                            const q = activeExamData.questions[examCurrentQIdx];
                            const selectedOption = examAnswers[q.id];

                            return (
                              <div className="space-y-6 max-w-4xl">
                                
                                <div className="flex items-center justify-between text-xs text-purple-300 font-mono border-b border-purple-800/80 pb-2">
                                  <span>Question {examCurrentQIdx + 1} of {activeExamData.questions.length}</span>
                                  <span>Marks: 5.0 | Negative: 0.0</span>
                                </div>

                                {/* Question Text */}
                                <div className="text-base sm:text-lg font-bold text-white leading-relaxed">
                                  {q.questionText}
                                </div>

                                {/* 4 Options Cards */}
                                <div className="space-y-3 pt-2">
                                  {q.options.map((optText, oIdx) => {
                                    const letter = String.fromCharCode(65 + oIdx);
                                    const isChosen = selectedOption === letter;

                                    return (
                                      <div
                                        key={letter}
                                        onClick={() => handleSelectOptionInExam(letter)}
                                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                                          isChosen
                                            ? 'bg-gradient-to-r from-teal-500/30 to-cyan-500/20 border-teal-400 shadow-lg shadow-teal-400/20 scale-[1.01]'
                                            : 'bg-slate-900/80 border-purple-800/80 hover:border-purple-600'
                                        }`}
                                      >
                                        <div className={`w-8 h-8 rounded-xl font-black font-mono flex items-center justify-center text-xs shrink-0 border ${
                                          isChosen
                                            ? 'bg-teal-400 text-slate-950 border-teal-200'
                                            : 'bg-slate-950 text-purple-300 border-purple-700'
                                        }`}>
                                          {letter}
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-slate-200">{optText}</span>
                                      </div>
                                    );
                                  })}
                                </div>

                              </div>
                            );
                          })()}

                          {/* Navigation Buttons: Previous, Mark for Review, Next */}
                          <div className="pt-6 border-t border-purple-800 flex items-center justify-between flex-wrap gap-3">
                            <button
                              onClick={() => {
                                if (examCurrentQIdx > 0) handleJumpToQuestion(examCurrentQIdx - 1);
                              }}
                              disabled={examCurrentQIdx === 0}
                              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-purple-700 text-purple-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-xs"
                            >
                              &larr; Previous Question
                            </button>

                            <button
                              onClick={handleMarkForReview}
                              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>Mark for Review (Yellow)</span>
                            </button>

                            <button
                              onClick={() => {
                                if (examCurrentQIdx < activeExamData.questions.length - 1) {
                                  handleJumpToQuestion(examCurrentQIdx + 1);
                                }
                              }}
                              disabled={examCurrentQIdx === activeExamData.questions.length - 1}
                              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-teal-400 text-slate-950 font-black text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              Next Question &rarr;
                            </button>
                          </div>

                        </div>

                        {/* 20% Right Question Palette Matrix */}
                        <div className="w-full md:w-80 bg-slate-900 border-l border-purple-800 p-5 flex flex-col shrink-0 space-y-4">
                          
                          <div className="space-y-2 border-b border-purple-800 pb-3">
                            <h4 className="text-xs font-black uppercase text-teal-300 font-mono tracking-wider">
                              Question Palette Matrix
                            </h4>
                            {/* Color Legend */}
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-white border border-slate-400" />
                                <span className="text-slate-300">Not Visited</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-rose-500" />
                                <span className="text-slate-300">Not Attempted</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-emerald-500" />
                                <span className="text-slate-300">Answered</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded bg-amber-400" />
                                <span className="text-slate-300">Marked Review</span>
                              </div>
                            </div>
                          </div>

                          {/* Grid of Clickable Question Numbers */}
                          <div className="flex-1 overflow-y-auto">
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                              {activeExamData.questions.map((q, idx) => {
                                const status = examPaletteStatus[q.id] || 'unvisited';
                                const isCurrent = idx === examCurrentQIdx;

                                return (
                                  <button
                                    key={q.id}
                                    onClick={() => handleJumpToQuestion(idx)}
                                    className={`w-10 h-10 rounded-xl font-black font-mono text-xs flex items-center justify-center transition cursor-pointer border ${
                                      isCurrent ? 'ring-2 ring-teal-400 scale-110 ' : ''
                                    } ${
                                      status === 'answered'
                                        ? 'bg-emerald-500 text-slate-950 border-emerald-300 font-black'
                                        : status === 'review'
                                        ? 'bg-amber-400 text-slate-950 border-amber-200 font-black'
                                        : status === 'not_attempted'
                                        ? 'bg-rose-500 text-white border-rose-300'
                                        : 'bg-white text-slate-950 border-slate-300'
                                    }`}
                                  >
                                    {idx + 1}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-3 border-t border-purple-800">
                            <button
                              onClick={handleSubmitExam}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
                            >
                              Submit Examination
                            </button>
                          </div>

                        </div>

                      </div>
                    ) : (
                      /* CBT Scorecard, Leaderboard & Solution Review Mode */
                      <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8 bg-slate-950">
                        
                        {/* Scorecard Hero */}
                        {examResultScore && (
                          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-purple-900/60 via-slate-900 to-teal-900/50 border-2 border-teal-400 p-8 shadow-2xl text-center space-y-4">
                            <Trophy className="w-16 h-16 text-amber-400 mx-auto animate-bounce" />
                            <h2 className="text-2xl sm:text-3xl font-black text-white">Examination Performance Scorecard</h2>
                            <p className="text-xs text-purple-200 font-mono">
                              Candidate: {examResultScore.studentName} | Class {activeExamData.classId}-{selectedTestSection}
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
                              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-700">
                                <div className="text-[10px] text-purple-300 font-mono">Score Obtained</div>
                                <div className="text-lg font-black text-teal-300">{examResultScore.totalScoreObtained} / {examResultScore.maxMarks}</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-700">
                                <div className="text-[10px] text-purple-300 font-mono">Percentage</div>
                                <div className="text-lg font-black text-cyan-300">{examResultScore.percentage}%</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-700">
                                <div className="text-[10px] text-purple-300 font-mono">CBSE Grade</div>
                                <div className="text-lg font-black text-amber-300">{examResultScore.grade}</div>
                              </div>
                              <div className="p-3 rounded-xl bg-slate-950/80 border border-purple-700">
                                <div className="text-[10px] text-purple-300 font-mono">Correct Answers</div>
                                <div className="text-lg font-black text-emerald-400">{examResultScore.correctCount} / {examResultScore.totalQuestions}</div>
                              </div>
                            </div>

                            <p className="text-xs text-teal-300 font-semibold">{examResultScore.remarks}</p>
                          </div>
                        )}

                        {/* Automatic Leaderboard */}
                        <div className="max-w-4xl mx-auto space-y-3">
                          <h3 className="text-base font-black text-white flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-amber-400" />
                            <span>Official Class Leaderboard</span>
                          </h3>
                          <div className="rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-purple-950/80 text-[10px] text-teal-300 uppercase font-mono border-b border-purple-800">
                                  <tr>
                                    <th className="p-3">Rank</th>
                                    <th className="p-3">Student Name</th>
                                    <th className="p-3">Score</th>
                                    <th className="p-3">Time Taken</th>
                                    <th className="p-3 text-right">Badge</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-950/80">
                                  {examLeaderboard.map((item) => (
                                    <tr key={item.rank} className={`${item.isCurrent ? 'bg-teal-950/40 font-bold' : ''}`}>
                                      <td className="p-3 font-mono font-bold text-amber-400">#{item.rank}</td>
                                      <td className="p-3 text-white">{item.name}</td>
                                      <td className="p-3 font-mono text-teal-300">{item.score} Marks</td>
                                      <td className="p-3 font-mono text-purple-300">{item.time}</td>
                                      <td className="p-3 text-right">
                                        <span className="px-2 py-0.5 rounded-full bg-purple-900 text-purple-200 text-[10px] font-bold">
                                          {item.badge}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>

                        {/* Solution Review Mode */}
                        <div className="max-w-4xl mx-auto space-y-4">
                          <h3 className="text-base font-black text-white flex items-center gap-2">
                            <CheckSquare className="w-4 h-4 text-teal-400" />
                            <span>Detailed Pedagogical Solution Review</span>
                          </h3>

                          <div className="space-y-4">
                            {activeExamData.questions.map((q, idx) => {
                              const userAns = examAnswers[q.id];
                              const isCorrect = userAns === q.correctAnswer;

                              return (
                                <div key={q.id} className={`p-5 rounded-2xl border space-y-3 ${
                                  isCorrect ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-rose-950/20 border-rose-500/50'
                                }`}>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold text-teal-300 font-mono">Question #{idx + 1}</span>
                                    <span className={`font-bold px-2.5 py-0.5 rounded text-[10px] uppercase font-mono ${
                                      isCorrect ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                                    }`}>
                                      {isCorrect ? 'Correct (+5)' : 'Incorrect (0)'}
                                    </span>
                                  </div>

                                  <div className="text-sm font-bold text-white">{q.questionText}</div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                    {q.options.map((opt, oIdx) => {
                                      const letter = String.fromCharCode(65 + oIdx);
                                      const isUser = userAns === letter;
                                      const isAns = q.correctAnswer === letter;

                                      return (
                                        <div key={letter} className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                                          isAns
                                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 font-bold'
                                            : isUser
                                            ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                                            : 'bg-slate-900 border-purple-900 text-slate-300'
                                        }`}>
                                          <span className="font-mono font-bold">{letter}.</span>
                                          <span>{opt}</span>
                                          {isAns && <span className="ml-auto text-[10px] text-emerald-400 font-mono font-bold">(Correct)</span>}
                                          {isUser && !isAns && <span className="ml-auto text-[10px] text-rose-400 font-mono font-bold">(Your Choice)</span>}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  <div className="p-3 rounded-xl bg-slate-900/80 border border-purple-800 text-xs text-purple-200 space-y-1">
                                    <strong className="text-teal-300 block font-mono text-[10px] uppercase">Explanation:</strong>
                                    <p>{q.explanation}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    )}

                  </div>
                )}

              </div>
            )}


            {/* --------------------------------------------------------------------- */}
            {/* PAGE 5: DIGITAL ATTENDANCE REGISTRY                                   */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'attendance' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Gen Z Hero Animated Graphical Banner */}
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
                      Students verify daily attendance and 75% CBSE compliance. Dimension 5 teachers have exclusive authorization to mark Present, Absent, or Late.
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
                          {isDimension5 ? 'Teacher Mode: Click P/A/L to record attendance' : 'Student Mode: Read-only live verification'}
                        </p>
                      </div>
                    </div>

                    {isDimension5 && (
                      <button
                        onClick={handleSaveAttendance}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md hover:scale-105 transition"
                      >
                        Save &amp; Sync Register (Dimension 5)
                      </button>
                    )}
                  </div>

                  {attToast && (
                    <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 text-xs font-bold text-center animate-fadeIn">
                      {attToast}
                    </div>
                  )}

                  {/* Roster Table */}
                  <div className="w-full rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-purple-950/80 text-[10px] text-teal-300 uppercase font-mono border-b border-purple-800">
                          <tr>
                            <th className="p-3">Roll</th>
                            <th className="p-3">Student Full Name</th>
                            <th className="p-3">Attendance Status</th>
                            <th className="p-3 text-right">Actions / Verification</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-purple-950/80">
                          {currentAttRoster.map((s) => (
                            <tr key={s.roll} className="hover:bg-purple-950/30 transition">
                              <td className="p-3 font-mono font-bold text-teal-400">#{s.roll}</td>
                              <td className="p-3 font-bold text-white">{s.name}</td>
                              <td className="p-3">
                                {s.status === 'present' ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                                    Present
                                  </span>
                                ) : s.status === 'absent' ? (
                                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                                    Absent
                                  </span>
                                ) : (
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                                    Late
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-right">
                                {isDimension5 ? (
                                  <div className="inline-flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-purple-800">
                                    <button
                                      onClick={() => handleUpdateStudentAttendance(s.roll, 'present')}
                                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                        s.status === 'present' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-purple-300 hover:text-white'
                                      }`}
                                    >
                                      P
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStudentAttendance(s.roll, 'absent')}
                                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                        s.status === 'absent' ? 'bg-rose-500 text-white font-black' : 'text-purple-300 hover:text-white'
                                      }`}
                                    >
                                      A
                                    </button>
                                    <button
                                      onClick={() => handleUpdateStudentAttendance(s.roll, 'late')}
                                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                        s.status === 'late' ? 'bg-amber-500 text-slate-950 font-black' : 'text-purple-300 hover:text-white'
                                      }`}
                                    >
                                      L
                                    </button>
                                  </div>
                                ) : (
                                  <span className="text-[10px] text-purple-400 font-mono">Verified Daily</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Attendance Pop-up for Class & Section selection */}
                {isAttendanceModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Class &amp; Section for Attendance Record
                            </h2>
                            <p className="text-xs text-cyan-300 font-mono">
                              Official Institutional Attendance Registry
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsAttendanceModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Step 1: Class */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Select Class (Nursery to Class 8)
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedAttClass(c.id)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedAttClass === c.id
                                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 border-cyan-300 shadow-md scale-105'
                                  : 'bg-slate-900 text-purple-300 border-purple-800 hover:border-purple-600'
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-teal-300 tracking-wider font-mono">
                          Select Section (A to E)
                        </label>
                        <div className="grid grid-cols-5 gap-2 max-w-md">
                          {['A', 'B', 'C', 'D', 'E'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedAttSection(s)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedAttSection === s
                                  ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md scale-105'
                                  : 'bg-slate-900 text-teal-300 border-teal-900 hover:border-teal-700'
                              }`}
                            >
                              Section {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setIsAttendanceModalOpen(false)}
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 text-slate-950 font-black text-sm cursor-pointer shadow-xl hover:opacity-95"
                        >
                          Open Attendance Register for Class {selectedAttClass} - Section {selectedAttSection}
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* --------------------------------------------------------------------- */}
            {/* PAGE 6: STUDENT MARKS & EXAMINATION LEDGER                            */}
            {/* --------------------------------------------------------------------- */}
            {activePage === 'marks_ledger' && (
              <div className="w-full space-y-6 animate-fadeIn">
                
                {/* Hero Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 border-2 border-indigo-500/50 p-6 md:p-10 shadow-2xl">
                  <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-4xl space-y-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/50 text-xs font-mono font-bold text-indigo-300">
                      <Award className="w-3.5 h-3.5 text-indigo-300" />
                      <span>PAGE 6 - ACADEMIC PERFORMANCE &amp; EXAMINATION MARKS LEDGER</span>
                    </div>

                    <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                      Examination Marks <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Ledger &amp; Report Cards</span>
                    </h2>

                    <p className="text-xs md:text-sm text-purple-200/80 leading-relaxed max-w-2xl">
                      Standardized periodic assessments, automatic CBSE grade calculations, and printable official student report cards. Teachers (Dimension 5) enter and commit marks; students review their term scores.
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
                        <button
                          onClick={handleSaveMarksLedger}
                          className="px-6 py-3 rounded-2xl bg-slate-900 border-2 border-indigo-400 text-indigo-300 hover:text-white font-black text-xs md:text-sm flex items-center gap-2 transition cursor-pointer shadow-lg"
                        >
                          <FileCheck className="w-4 h-4 text-indigo-300" />
                          <span>Save Marks Ledger (Dimension 5)</span>
                        </button>
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
                        Max Marks per Subject: 100 | Total Evaluation Marks: 700
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
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-300 shadow-md scale-105 font-black'
                            : 'bg-slate-950 text-purple-300 border-purple-800 hover:border-purple-600'
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

                {/* Marks Ledger Table */}
                <div className="w-full rounded-2xl bg-slate-900 border border-purple-800 overflow-hidden shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-purple-950/80 text-[10px] text-teal-300 uppercase font-mono border-b border-purple-800">
                        <tr>
                          <th className="p-3">Roll</th>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">English</th>
                          <th className="p-3">Hindi</th>
                          <th className="p-3">Maths</th>
                          <th className="p-3">Science</th>
                          <th className="p-3">SST</th>
                          <th className="p-3">Sanskrit</th>
                          <th className="p-3">Computer</th>
                          <th className="p-3">Total (700)</th>
                          <th className="p-3">Percentage</th>
                          <th className="p-3">Grade</th>
                          <th className="p-3 text-right">Report Card</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-purple-950/80">
                        {currentMarksRoster.map((s) => {
                          const agg = computeStudentAggregates(s.marks);

                          return (
                            <tr key={s.roll} className="hover:bg-purple-950/30 transition">
                              <td className="p-3 font-mono font-bold text-teal-400">#{s.roll}</td>
                              <td className="p-3 font-bold text-white whitespace-nowrap">{s.name}</td>
                              
                              {/* 7 Subjects */}
                              {['english', 'hindi', 'maths', 'science', 'sst', 'sanskrit', 'computer'].map((subKey) => (
                                <td key={subKey} className="p-2">
                                  {isDimension5 ? (
                                    <input
                                      type="number"
                                      min={0}
                                      max={100}
                                      value={s.marks[subKey] !== undefined ? s.marks[subKey] : 0}
                                      onChange={(e) => handleUpdateStudentMark(s.roll, subKey, e.target.value)}
                                      className="w-14 p-1.5 rounded-lg bg-slate-950 border border-purple-700 text-center font-mono font-bold text-white text-xs focus:border-teal-400"
                                    />
                                  ) : (
                                    <span className="font-mono text-purple-200 font-bold px-1.5 py-1">
                                      {s.marks[subKey] || 0}
                                    </span>
                                  )}
                                </td>
                              ))}

                              {/* Aggregates */}
                              <td className="p-3 font-mono font-bold text-teal-300 whitespace-nowrap">
                                {agg.total} / 700
                              </td>
                              <td className="p-3 font-mono font-bold text-cyan-300">
                                {agg.percentage}%
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black border ${agg.color}`}>
                                  {agg.grade}
                                </span>
                              </td>

                              {/* Report Card Action */}
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedReportStudent({ ...s, aggregates: agg });
                                    setShowReportCardModal(true);
                                    playSoundChime('sent');
                                  }}
                                  className="px-3 py-1 rounded-xl bg-purple-900/60 hover:bg-purple-800 border border-purple-600 text-purple-200 hover:text-white text-[11px] font-bold flex items-center gap-1 ml-auto cursor-pointer"
                                >
                                  <Printer className="w-3 h-3 text-teal-300" />
                                  <span>Report Card</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Marks Filter Modal */}
                {isMarksModalOpen && (
                  <div className="fixed inset-0 z-50 bg-slate-950 p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                    <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-6">
                      
                      <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-lg md:text-xl font-black text-white">
                              Select Academic Standard, Section &amp; Term
                            </h2>
                            <p className="text-xs text-indigo-300 font-mono">
                              Examination Marks Ledger Navigation
                            </p>
                          </div>
                        </div>

                        <button onClick={() => setIsMarksModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 text-purple-300 hover:text-white cursor-pointer">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Step 1: Class */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-purple-300 tracking-wider font-mono">
                          Step 1: Select Class
                        </label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                          {SCHOOL_CLASSES_CONFIG.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => setSelectedMarksClass(c.id)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedMarksClass === c.id
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-300 shadow-md scale-105'
                                  : 'bg-slate-900 text-purple-300 border-purple-800 hover:border-purple-600'
                              }`}
                            >
                              {c.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 2: Section */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-teal-300 tracking-wider font-mono">
                          Step 2: Select Section (A to E)
                        </label>
                        <div className="grid grid-cols-5 gap-2 max-w-md">
                          {['A', 'B', 'C', 'D', 'E'].map((s) => (
                            <button
                              key={s}
                              onClick={() => setSelectedMarksSection(s)}
                              className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                                selectedMarksSection === s
                                  ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md scale-105'
                                  : 'bg-slate-900 text-teal-300 border-teal-900 hover:border-teal-700'
                              }`}
                            >
                              Section {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Step 3: Term */}
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-indigo-300 tracking-wider font-mono">
                          Step 3: Select Examination Term ({selectedMarksClass === '8' ? 'Class 8 Board System' : 'Standard Continuous Assessment'})
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {availableTerms.map((term) => (
                            <button
                              key={term}
                              onClick={() => setSelectedMarksTerm(term)}
                              className={`p-3 rounded-xl text-xs font-bold transition cursor-pointer text-left border ${
                                selectedMarksTerm === term
                                  ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white border-teal-300 shadow-md font-black'
                                  : 'bg-slate-900 text-purple-200 border-purple-800 hover:border-purple-600'
                              }`}
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setIsMarksModalOpen(false)}
                          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-teal-400 text-slate-950 font-black text-sm cursor-pointer shadow-xl hover:opacity-95"
                        >
                          Open Marks Ledger for Class {selectedMarksClass} - Section {selectedMarksSection}
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* Printable Official Student Report Card Modal */}
                {showReportCardModal && selectedReportStudent && (
                  <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center animate-fadeIn text-slate-900">
                    <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-purple-700 space-y-6 max-h-[90vh] overflow-y-auto">
                      
                      {/* School Header */}
                      <div className="text-center pb-4 border-b-2 border-purple-800 space-y-1">
                        <div className="inline-flex items-center gap-2 text-purple-900 font-black text-lg sm:text-xl uppercase tracking-wider">
                          <School className="w-6 h-6 text-purple-700" />
                          <span>DAV PUBLIC SCHOOL</span>
                        </div>
                        <p className="text-xs text-slate-600 font-serif italic">Affiliated to CBSE, New Delhi - Institutional Academic Record</p>
                        <h3 className="text-sm font-black text-purple-950 uppercase pt-2 tracking-widest font-mono">
                          Official Term Student Report Card - 2026
                        </h3>
                      </div>

                      {/* Student Info Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-purple-50 p-4 rounded-2xl border border-purple-200 text-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">Student Name</span>
                          <strong className="text-purple-950 font-bold">{selectedReportStudent.name}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">Roll Number</span>
                          <strong className="text-purple-950 font-bold">#{selectedReportStudent.roll}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">Standard &amp; Section</span>
                          <strong className="text-purple-950 font-bold">Class {selectedMarksClass}-{selectedMarksSection}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-mono">Examination Term</span>
                          <strong className="text-purple-950 font-bold">{selectedMarksTerm}</strong>
                        </div>
                      </div>

                      {/* Subject Marks Table */}
                      <div className="rounded-2xl border border-purple-200 overflow-hidden text-xs">
                        <table className="w-full text-left">
                          <thead className="bg-purple-900 text-white font-mono text-[10px] uppercase">
                            <tr>
                              <th className="p-2.5">Subject</th>
                              <th className="p-2.5">Maximum Marks</th>
                              <th className="p-2.5">Marks Obtained</th>
                              <th className="p-2.5">Subject Grade</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {[
                              { label: 'English Literature & Grammar', val: selectedReportStudent.marks.english },
                              { label: 'Hindi (Gyan Sagar & Abhyas)', val: selectedReportStudent.marks.hindi },
                              { label: 'Mathematics', val: selectedReportStudent.marks.maths },
                              { label: 'Science & Technology', val: selectedReportStudent.marks.science },
                              { label: 'Social Science', val: selectedReportStudent.marks.sst },
                              { label: 'Sanskrit', val: selectedReportStudent.marks.sanskrit },
                              { label: 'Computer Science', val: selectedReportStudent.marks.computer }
                            ].map((row, idx) => {
                              const g = calculateCbseGrade(row.val || 0);
                              return (
                                <tr key={idx} className="hover:bg-purple-50/50">
                                  <td className="p-2.5 font-semibold text-slate-800">{row.label}</td>
                                  <td className="p-2.5 font-mono text-slate-600">100</td>
                                  <td className="p-2.5 font-mono font-bold text-purple-950">{row.val || 0}</td>
                                  <td className="p-2.5 font-mono font-black text-purple-700">{g.grade}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {/* Cumulative Result Summary */}
                      <div className="grid grid-cols-3 gap-3 text-center bg-purple-950 text-white p-4 rounded-2xl">
                        <div>
                          <span className="text-[10px] uppercase font-mono text-purple-300 block">Total Marks</span>
                          <span className="text-base font-black text-teal-300">{selectedReportStudent.aggregates.total} / 700</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-purple-300 block">Overall Percentage</span>
                          <span className="text-base font-black text-cyan-300">{selectedReportStudent.aggregates.percentage}%</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono text-purple-300 block">CBSE Grade</span>
                          <span className="text-base font-black text-amber-300">{selectedReportStudent.aggregates.grade}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-purple-200">
                        <div className="text-center">
                          <div className="w-28 border-b border-slate-400 mb-1" />
                          <span>Class Teacher</span>
                        </div>
                        <div className="text-center">
                          <div className="w-28 border-b border-slate-400 mb-1" />
                          <span>Principal Signature</span>
                        </div>
                      </div>

                      {/* Modal Actions */}
                      <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setShowReportCardModal(false)}
                          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer hover:bg-slate-300"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="px-6 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print / Save PDF Report</span>
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

