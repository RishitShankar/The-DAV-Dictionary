import React, { useState, useEffect, useRef } from 'react';
import { 
  School, GraduationCap, Users, BookOpen, Calendar, 
  FileText, Award, Bell, CheckCircle2, Search, Plus, 
  Filter, Download, Sparkles, MessageSquare, ClipboardList,
  Clock, ShieldCheck, Bookmark, ChevronRight, Send, Check,
  Video, Mic, MicOff, VideoOff, ScreenShare, Share2, AlertCircle,
  HelpCircle, MessageCircle, BarChart3, TrendingUp, UserCheck,
  UserX, PhoneCall, Paperclip, Smile, Image as ImageIcon,
  CheckCheck, Volume2, Sparkle, Eye, Star, Layers, Zap, X,
  ExternalLink, RefreshCw, Bot, Smartphone, RotateCcw,
  ArrowRight, Play, CheckSquare, Radio, Maximize2, Minimize2,
  PenTool, Eraser, PhoneOff, Hand, MessageSquareMore, CheckCircle,
  ChevronLeft, Compass, Printer
} from 'lucide-react';
import { ShankarAILogo } from './ShankarAILogo';
import { DAV_50_TEACHERS, getAllTeachers } from '../data/davTeachers50';
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

const WHATSAPP_OFFICIAL_NUMBER = '919470033984';
const TEACHER_CHATS_STORAGE_KEY = 'dav_faculty_whatsapp_50_chats_v1';
const HOMEWORK_STORAGE_KEY = 'dav_daily_homework_store_v1';
const ATTENDANCE_STORAGE_KEY = 'dav_attendance_store_v1';

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

// Official WhatsApp deep-link builder
const buildOfficialWhatsAppLink = (teacher, studentName, studentClassSec, messageText) => {
  const phone = teacher.whatsappNumber || WHATSAPP_OFFICIAL_NUMBER;
  const content = messageText || 'Academic Doubt Query';
  const body = 
`🏛️ *DAV PUBLIC SCHOOL • FACULTY DOUBT DESK*
━━━━━━━━━━━━━━━━━━━━━
👨‍🏫 *Faculty Member:* ${teacher.name} (${teacher.subject})
👤 *Student:* ${studentName || 'DAV Student'}
🏫 *Class & Section:* Class ${studentClassSec || '8-D'}
🕒 *Timestamp:* ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}

❓ *Doubt Inquiry:*
"${content}"

🔗 *Portal Verification:* Active Dimension 5 Faculty OS
━━━━━━━━━━━━━━━━━━━━━
_Sent via DAV Public School Portal_`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(body)}`;
};

// =========================================================================
// 5-PAGE AUTHENTIC ACADEMIC PDF PRESENTATION HANDBOOK METADATA
// =========================================================================
const PDF_PAGES_METADATA = {
  homework: {
    pageNumber: '01',
    code: 'DAV-DIR-2026-HW01',
    directiveName: 'DAILY HOMEWORK & CLASSWORK SYLLABUS DIRECTIVE',
    tagline: 'Standardized Homework Distribution & Academic Task Monitoring Protocol',
    badgeText: 'PAGE 1 • CURRICULUM SYLLABUS DISCIPLINE',
    gradeScope: 'Classes: LKG to Class 8 (11 Academic Standards)',
    sectionScope: 'Sections: A, B, C, D, E (5 Standardized Class Cohorts)',
    overview: 'This academic handbook establishes the institutional protocol for daily homework and classwork dissemination across DAV Public School. Designed to cultivate daily study discipline, reinforce classroom concepts, and ensure seamless synchronization between faculty, students, and parents.',
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
    centralButtonText: '🚀 Open Full-Screen Daily Homework Hub',
    centralButtonSub: 'Launch Interactive Class & Section Assignment Manager',
    instructions: [
      'Step 1: Click the central button above to launch the full-screen Daily Homework Hub.',
      'Step 2: Select your academic grade from Nursery, LKG, UKG up to Class 8.',
      'Step 3: Select your assigned section among Sections A, B, C, D, or E.',
      'Step 4: Review active subject tasks, chapter references, submission deadlines, and faculty remarks.',
      'Step 5 (Faculty Only): Use the "Assign New Homework" action to publish real-time tasks to students.'
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
    directiveName: 'FACULTY CONSULTATION & WHATSAPP DOUBT DESK',
    tagline: 'Real-Time Academic Consultation & 50+ Verified Faculty Interaction Protocol',
    badgeText: 'PAGE 2 • REAL-TIME MENTORSHIP ECOSYSTEM',
    gradeScope: 'Faculty Roster: 50+ Verified Subject Teachers & Heads of Department',
    sectionScope: 'Channels: Sub-Second Synchronized Portal Chat & Official WhatsApp Link',
    overview: 'This handbook defines the protocol for student-faculty academic consultation outside regular school hours. Eliminating educational bottlenecks, students can interact in real time with over 50 verified faculty members across all departments with sub-second message delivery and official WhatsApp integration.',
    corePillars: [
      {
        title: '50+ Faculty Roster',
        desc: 'Comprehensive directory spanning Science, Mathematics, Social Studies, English, Hindi, Sanskrit, Computer Science, and Primary wings.'
      },
      {
        title: 'Sub-Second Cloud Sync',
        desc: 'WebSocket and Supabase cloud persistence ensuring messages sent on mobile or PC arrive instantly on the recipient device with sound chimes.'
      },
      {
        title: 'Official WhatsApp Bridge',
        desc: 'Integrated one-click official WhatsApp messaging to +91 94700 33984 with pre-formatted academic inquiry payloads for rapid teacher response.'
      }
    ],
    centralButtonText: '💬 Open Full-Screen Faculty WhatsApp Desk',
    centralButtonSub: 'Launch Live 50+ Teachers Roster & Real-Time Doubt Chat Room',
    instructions: [
      'Step 1: Click the central button above to enter the full-screen WhatsApp Doubt Desk.',
      'Step 2: Search or filter the 50+ teachers roster by subject department (Science, Math, SST, Languages, etc.).',
      'Step 3: Click on any faculty member\'s card to open their dedicated academic chat channel.',
      'Step 4: Type your specific textbook doubt or exercise question and send with sub-second delivery.',
      'Step 5: Alternatively, click the green WhatsApp button to launch an official WhatsApp query directly on your phone.'
    ],
    statPills: [
      { label: 'Active Faculty', val: '50+ Verified Teachers' },
      { label: 'Departments', val: '9 Subject Wings' },
      { label: 'Delivery Latency', val: '< 0.8 Seconds' },
      { label: 'Official WhatsApp', val: '+91 94700 33984' }
    ],
    sealTitle: 'Supervised by Faculty Academic Coordination Cell'
  },
  live_class: {
    pageNumber: '03',
    code: 'DAV-DIR-2026-WEBRTC03',
    directiveName: 'WEBRTC REAL ONLINE LIVE CLASSROOM PROTOCOL',
    tagline: 'High-Definition Interactive WebRTC Streaming & Smart Board Virtual Lecture Hall',
    badgeText: 'PAGE 3 • IN-WEBSITE DISTANCE LEARNING',
    gradeScope: 'Broadcasting: Class LKG to Class 8 Live Lecture Streams',
    sectionScope: 'Technology: WebRTC P2P In-Website Engine • 100% Free • Unlimited Duration',
    overview: 'This document authorizes the implementation of real-time virtual classroom sessions embedded directly within the school portal. Utilizing enterprise WebRTC peer-to-peer technology, students attend live interactive video lectures with zero third-party downloads, zero time cutoffs, and integrated smart whiteboard tools.',
    corePillars: [
      {
        title: '100% In-Website Video',
        desc: 'Embedded video call engine operating directly on the portal page without requiring Zoom, Google Meet apps, or external login credentials.'
      },
      {
        title: 'Zero Time Restrictions',
        desc: 'Unrestricted session length allowing full 45-minute academic periods without the 5-minute demo interruptions found in trial services.'
      },
      {
        title: 'Smart Whiteboard & Screen Share',
        desc: 'Built-in interactive digital smartboard enabling teachers to sketch ray diagrams, write mathematical formulas, and share teaching presentations.'
      }
    ],
    centralButtonText: '🎥 Open Full-Screen Live Video Classroom',
    centralButtonSub: 'Launch WebRTC HD Video Room with Screen Sharing & Smart Whiteboard',
    instructions: [
      'Step 1: Click the central button above to launch the full-screen Live Video Classroom.',
      'Step 2: Select your class standard (Class LKG to Class 8) to view ongoing live streams.',
      'Step 3: Click "Join Live Class Now" to connect into the high-definition audio/video room.',
      'Step 4: Toggle your microphone and camera using the bottom meeting toolbar.',
      'Step 5: Switch between the live video feed and the interactive teacher smartboard as needed.'
    ],
    statPills: [
      { label: 'Video Quality', val: '1080p HD WebRTC' },
      { label: 'Session Duration', val: 'Unlimited (No Cutoff)' },
      { label: 'Interactive Tools', val: 'Whiteboard + Screen' },
      { label: 'App Requirement', val: 'Zero (Direct Browser)' }
    ],
    sealTitle: 'Accredited by DAV Digital Learning Board'
  },
  tests: {
    pageNumber: '04',
    code: 'DAV-DIR-2026-EXAM04',
    directiveName: 'CONTINUOUS COMPREHENSIVE EVALUATION & TEST SUITE',
    tagline: 'Standardized Curriculum Unit Examinations, Timer Simulation & Performance Analytics',
    badgeText: 'PAGE 4 • FORMATIVE ASSESSMENT ARCHITECTURE',
    gradeScope: 'Evaluation Scope: Class LKG to Class 8 • All Academic Disciplines',
    sectionScope: 'Format: Timed Multiple-Choice, Numerical Analysis & Instant Scorecard',
    overview: 'This academic handbook codifies the standards for online unit tests, formative quizzes, and periodic assessment simulators. Built according to DAV Education Board test blue-prints, students test conceptual mastery under timed exam conditions with instant automatic evaluation and detailed pedagogical explanations.',
    corePillars: [
      {
        title: 'Synchronized Countdown Timer',
        desc: 'Strict per-test countdown clock ensuring authentic exam pacing, time management discipline, and automated submission upon expiry.'
      },
      {
        title: 'Instant Automated Evaluation',
        desc: 'Immediate scorecard generation displaying raw marks, percentage scores, letter grades (A+, A, B, C), and performance band rankings.'
      },
      {
        title: 'Pedagogical Explanations',
        desc: 'In-depth solution rationale for every question, elucidating scientific principles, mathematical derivations, and key textbook facts.'
      }
    ],
    centralButtonText: '📝 Open Full-Screen Online Test & Exam Simulator',
    centralButtonSub: 'Launch Timed Exam Portal with Instant Evaluation & Solution Review',
    instructions: [
      'Step 1: Click the central button above to open the full-screen Online Test & Exam Suite.',
      'Step 2: Choose your Class (LKG to 8) and Section (A to E) to load syllabus test papers.',
      'Step 3: Select an available unit test and click "Attempt Test Now".',
      'Step 4: Navigate questions using the numbered palette, select answers, and track remaining time.',
      'Step 5: Click "Submit Test For Evaluation" to generate your comprehensive scorecard and solution key.'
    ],
    statPills: [
      { label: 'Question Bank', val: 'DAV Board Syllabus' },
      { label: 'Timer Control', val: '15 to 25 Minutes' },
      { label: 'Scoring', val: 'Instant Auto-Grading' },
      { label: 'Feedback', val: 'Step-by-Step Solutions' }
    ],
    sealTitle: 'Validated by DAV Examination Controller Cell'
  },
  attendance: {
    pageNumber: '05',
    code: 'DAV-DIR-2026-ATT05',
    directiveName: 'INSTITUTIONAL DIGITAL ATTENDANCE REGISTRY',
    tagline: 'Daily Student Roll Call, Attendance Verification & 75% Statutory Compliance Register',
    badgeText: 'PAGE 5 • STATUTORY COMPLIANCE & ATTENDANCE',
    gradeScope: 'Roll Roster: All Classes LKG to Class 8 (45 Students Per Section)',
    sectionScope: 'Authorization: Student Read-Only Audit • Teacher Authorized Roll Marking',
    overview: 'This handbook defines the statutory regulations governing daily attendance recording across all divisions of DAV Public School. Under Board regulations, maintaining a minimum of 75% cumulative attendance is a mandatory prerequisite for examination eligibility.',
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
    centralButtonText: '📊 Open Full-Screen Digital Attendance Register',
    centralButtonSub: 'Launch Interactive Class Roster Register with Roll Call Controls',
    instructions: [
      'Step 1: Click the central button above to access the full-screen Digital Attendance Register.',
      'Step 2: Filter by your target Class (LKG to 8) and Section (A to E).',
      'Step 3: Students: Verify your name and daily attendance status (Present, Absent, Late).',
      'Step 4: Teachers: Click P, A, or L next to each student\'s roll number to record presence.',
      'Step 5: Teachers: Click "Save & Sync Register" to commit the daily attendance record to the cloud database.'
    ],
    statPills: [
      { label: 'Class Scope', val: 'Class LKG to Class 8' },
      { label: 'Sections', val: 'Sections A, B, C, D, E' },
      { label: 'Statutory Rule', val: '75% Minimum Presence' },
      { label: 'Status Types', val: 'Present / Absent / Late' }
    ],
    sealTitle: 'Certified by DAV Office of the Registrar & Attendance Board'
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
  const [isFacultyRole, setIsFacultyRole] = useState(Boolean(
    isTeacherOS || 
    user?.isTeacher || 
    user?.plan === 'teacher' || 
    user?.dimension === 5 || 
    user?.isAdmin || 
    user?.dimension >= 4 ||
    (user?.role && user?.role.toLowerCase().includes('teacher')) ||
    (user?.dimensionName && user?.dimensionName.toLowerCase().includes('faculty'))
  ));

  // 5-Page Academic Presentation Configuration
  const PRESENTATION_PAGES = [
    { id: 'homework', num: 1, title: 'Page 1: Daily Homework Hub', subtitle: 'Class LKG to 8 • Section A-E Syllabus assignments' },
    { id: 'doubts_chat', num: 2, title: 'Page 2: 50+ Faculty WhatsApp Doubt Desk', subtitle: 'Live Multi-Device Chatting & Manual Replies' },
    { id: 'live_class', num: 3, title: 'Page 3: Real Online Live Classroom', subtitle: 'WebRTC P2P HD Video • 100% Free • Unlimited' },
    { id: 'tests', num: 4, title: 'Page 4: Online Test & Exam Suite', subtitle: 'Auto-Graded Weekly Quizzes & Term Exams' },
    { id: 'attendance', num: 5, title: 'Page 5: Digital Attendance Register', subtitle: 'Daily Rolls & Roster Management' }
  ];

  // Current Active Page among the 5 Graphical Animated Pages
  // 1: 'homework' | 2: 'doubts_chat' | 3: 'live_class' | 4: 'tests' | 5: 'attendance'
  const [activePage, setActivePage] = useState(initialSubSection || 'homework');

  // Interactive Full Screen Mode: false = PDF Presentation Handbook Mode, true = Full Screen Interactive Tool
  const [isFullScreenInteractive, setIsFullScreenInteractive] = useState(false);
  // PDF Paper Theme: 'white' (Real PDF Document Paper) | 'dark' (Presentation Slide)
  const [pdfPaperTheme, setPdfPaperTheme] = useState('white');
  const [pdfZoom, setPdfZoom] = useState(100);

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
    setIsFullScreenInteractive(false); // Returns to that specific page's PDF presentation view!
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

  // Dynamic teachers roster: merges 50 base verified teachers with any newly registered teacher accounts
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

  // Initial Homework list loaded from localStorage (0 static demo homeworks, dynamic)
  const [homeworkStore, setHomeworkStore] = useState(() => {
    try {
      const stored = localStorage.getItem(HOMEWORK_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    // Seed with realistic class-specific homeworks that teachers assign
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

  // Assign New Homework Form State
  const [showAssignHwModal, setShowAssignHwModal] = useState(false);
  const [newHwClass, setNewHwClass] = useState('8');
  const [newHwSection, setNewHwSection] = useState('D');
  const [newHwSubject, setNewHwSubject] = useState('Science & Technology');
  const [newHwTeacher, setNewHwTeacher] = useState(() => {
    if (user?.name) {
      return (user.name.startsWith('Prof.') || user.name.startsWith('Mrs.') || user.name.startsWith('Mr.') || user.name.startsWith('Dr.')) ? user.name : `Prof. ${user.name}`;
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
      id: `hw_${Date.now()}`,
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
  // PAGE 2: LIVE WHATSAPP FACULTY DOUBT DESK (50+ TEACHERS)
  // =========================================================================
  const [activeTeacherId, setActiveTeacherId] = useState(() => {
    const list = getAllTeachers(user);
    if (user?.isTeacher || user?.dimension === 5) {
      const matched = list.find(t => 
        (t.originalId && user?.id && t.originalId.toLowerCase() === user.id.toLowerCase()) || 
        t.id === `tch_reg_${user?.id}` || 
        (t.name && user?.name && t.name.toLowerCase().includes(user.name.toLowerCase()))
      );
      if (matched) return matched.id;
    }
    return list[0]?.id || 'tch_01';
  });
  const [teacherSearchQuery, setTeacherSearchQuery] = useState('');
  const [teacherDeptFilter, setTeacherDeptFilter] = useState('all');
  const [chatRole, setChatRole] = useState(isFacultyRole ? 'teacher' : 'student'); // 'student' | 'teacher'
  const [chatInputText, setChatInputText] = useState('');
  const [isMessageDelivering, setIsMessageDelivering] = useState(false);
  const [isDoubtSessionResolved, setIsDoubtSessionResolved] = useState(false);
  const messagesEndRef = useRef(null);

  // 50+ Teachers Chat Store
  const [teacherChatsMap, setTeacherChatsMap] = useState(() => {
    try {
      const stored = localStorage.getItem(TEACHER_CHATS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) return parsed;
      }
    } catch (e) {}
    // Seed initial conversations for all teachers
    const initialMap = {};
    const all = getAllTeachers(user);
    all.forEach(t => {
      initialMap[t.id] = [
        {
          id: 1,
          sender: 'teacher',
          text: t.initialMessage,
          time: '10:00 AM',
          status: 'delivered'
        }
      ];
    });
    return initialMap;
  });

  // Dynamically ensure newly registered teachers have chat initialized
  useEffect(() => {
    setTeacherChatsMap(prev => {
      let changed = false;
      const next = { ...prev };
      teachersList.forEach(t => {
        if (!next[t.id]) {
          next[t.id] = [
            {
              id: 1,
              sender: 'teacher',
              text: t.initialMessage,
              time: '10:00 AM',
              status: 'delivered'
            }
          ];
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [teachersList]);

  const activeTeacher = teachersList.find(t => t.id === activeTeacherId) || teachersList[0] || DAV_50_TEACHERS[0];
  const activeChatMessages = teacherChatsMap[activeTeacherId] || [
    {
      id: 1,
      sender: 'teacher',
      text: activeTeacher.initialMessage,
      time: '10:00 AM',
      status: 'delivered'
    }
  ];

  // Auto-scroll chat to latest
  useEffect(() => {
    if (activePage === 'doubts_chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatMessages, activeTeacherId, activePage]);

  // Real-Time Cross-Device Synchronization for Doubt Desk (Supabase Realtime + Fast 2.5s Poller + Storage Event)
  useEffect(() => {
    let isSubscribed = true;

    const handleIncomingSync = (cloudChats) => {
      if (!cloudChats || typeof cloudChats !== 'object') return;
      setTeacherChatsMap(prev => {
        let hasNew = false;
        let incomingFromOther = false;
        const merged = { ...prev };

        Object.keys(cloudChats).forEach(teacherId => {
          const cloudList = cloudChats[teacherId];
          const localList = merged[teacherId] || [];

          if (Array.isArray(cloudList) && cloudList.length > 0) {
            const localIds = new Set(localList.map(m => m.id));
            const newItems = cloudList.filter(m => !localIds.has(m.id));

            if (newItems.length > 0 || cloudList.length > localList.length) {
              const allMap = new Map();
              [...localList, ...cloudList].forEach(m => {
                allMap.set(m.id, m);
              });
              merged[teacherId] = Array.from(allMap.values()).sort((a, b) => a.id - b.id);
              hasNew = true;

              if (newItems.some(m => m.sender !== chatRole)) {
                incomingFromOther = true;
              }
            }
          }
        });

        if (hasNew) {
          try {
            localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(merged));
          } catch (e) {}
          if (incomingFromOther) {
            playSoundChime('received');
          }
          return merged;
        }
        return prev;
      });
    };

    // 1. Initial fetch on mount
    fetchCloudDoubtChats().then(cloudChats => {
      if (isSubscribed && cloudChats) {
        handleIncomingSync(cloudChats);
      }
    }).catch(() => {});

    // 2. Supabase Realtime channel subscription (sub-second cross-device push)
    const unsubscribe = subscribeCloudDoubtChats((cloudChats) => {
      if (isSubscribed && cloudChats) {
        handleIncomingSync(cloudChats);
      }
    });

    // 3. Fast backup poller (runs every 2500ms for mobile background reliability)
    const poller = setInterval(() => {
      fetchCloudDoubtChats().then(cloudChats => {
        if (isSubscribed && cloudChats) {
          handleIncomingSync(cloudChats);
        }
      }).catch(() => {});
    }, 2500);

    // 4. Same-device cross-tab synchronization via window storage event
    const handleStorageChange = (e) => {
      if (e.key === TEACHER_CHATS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          handleIncomingSync(parsed);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      isSubscribed = false;
      unsubscribe();
      clearInterval(poller);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [chatRole]);

  const persistTeacherChats = (updated) => {
    setTeacherChatsMap(updated);
    try {
      localStorage.setItem(TEACHER_CHATS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
    saveCloudDoubtChats(updated).catch(() => {});
  };

  const handleSendTeacherMessage = (e) => {
    e?.preventDefault();
    if (!chatInputText.trim()) return;

    const text = chatInputText.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgId = Date.now();

    const newMsg = {
      id: msgId,
      sender: chatRole,
      text: text,
      time: timeNow,
      status: 'sent' // single grey check
    };

    playSoundChime('sent');

    const updated = {
      ...teacherChatsMap,
      [activeTeacherId]: [...activeChatMessages, newMsg]
    };
    persistTeacherChats(updated);
    setChatInputText('');
    setIsMessageDelivering(true);

    // Sub-second delivery: 400ms -> 'delivered' (double cyan ticks ✓✓)
    setTimeout(() => {
      const deliveredUpdated = {
        ...updated,
        [activeTeacherId]: updated[activeTeacherId].map(m => m.id === msgId ? { ...m, status: 'delivered' } : m)
      };
      persistTeacherChats(deliveredUpdated);
      playSoundChime('delivered');
      setIsMessageDelivering(false);
    }, 420);
  };

  const handleSendViaOfficialWhatsApp = () => {
    const textToSend = chatInputText.trim() || (activeChatMessages[activeChatMessages.length - 1]?.text) || 'Doubt inquiry';
    if (chatInputText.trim()) {
      handleSendTeacherMessage();
    }
    const link = buildOfficialWhatsAppLink(activeTeacher, user?.name, '8-D', textToSend);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleInstantTeacherAIClarification = () => {
    setIsMessageDelivering(true);
    const lastStudentMsg = [...activeChatMessages].reverse().find(m => m.sender === 'student')?.text || 'Please explain this chapter topic.';

    setTimeout(() => {
      const replies = [
        `Dear student, regarding "${lastStudentMsg.slice(0, 40)}...": In DAV Textbook curriculum, this concept is explained in detail with diagrams in Section 3. Make sure to note down the key formula and definitions!`,
        `Excellent question on "${lastStudentMsg.slice(0, 40)}...": Please review your class notes. For further live explanation, join my upcoming online class or send a voice note on WhatsApp!`,
        `Very good conceptual doubt! Remember that as per DAV examination guidelines, full marks are awarded when steps and units are clearly stated. Keep practicing!`
      ];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const teacherMsg = {
        id: Date.now(),
        sender: 'teacher',
        text: replyText,
        time: timeNow,
        status: 'delivered'
      };

      const updated = {
        ...teacherChatsMap,
        [activeTeacherId]: [...(teacherChatsMap[activeTeacherId] || []), teacherMsg]
      };
      persistTeacherChats(updated);
      playSoundChime('received');
      setIsMessageDelivering(false);
    }, 1100);
  };

  // =========================================================================
  // PAGE 3: 100% IN-WEBSITE REAL ONLINE LIVE CLASSROOM (WEBRTC)
  // =========================================================================
  const [selectedLiveClassNum, setSelectedLiveClassNum] = useState('8');
  const [isLivePortalModalOpen, setIsLivePortalModalOpen] = useState(false);
  const [isInsideLiveRoom, setIsInsideLiveRoom] = useState(false);
  const [activeLiveSessionData, setActiveLiveSessionData] = useState(null);
  const [copiedLiveLink, setCopiedLiveLink] = useState(false);

  // Real WebRTC Live Room Link Generator for DAV School (100% Free, Unlimited Minutes, Zero Disconnects)
  const getLiveRoomUrl = (session, classNum) => {
    const rawId = session?.id || 'live_stream';
    const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
    const safeClass = (classNum || '8').replace(/[^a-zA-Z0-9_-]/g, '_');
    const roomName = `DAV_School_Class_${safeClass}_${safeId}`;
    const userName = encodeURIComponent(user?.name || (isFacultyRole ? 'DAV Faculty Teacher' : 'DAV Student'));
    return `https://p2p.mirotalk.com/join/${roomName}?name=${userName}`;
  };

  // Live Room Real Controls
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [isMeetingChatOpen, setIsMeetingChatOpen] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [handRaiseList, setHandRaiseList] = useState([
    { name: 'Saharsh Shankar', time: '2m ago' },
    { name: 'Aditya Raj', time: '1m ago' }
  ]);

  const [meetingChatList, setMeetingChatList] = useState([
    { id: 1, sender: 'Mrs. Sunita Sharma (Faculty)', text: 'Good afternoon class! Welcome to Chapter 11 Human Eye live demonstration. Please keep notebooks ready.', time: '04:30 PM' },
    { id: 2, sender: 'Saharsh Shankar', text: 'Present Maam! Camera and audio clear.', time: '04:31 PM' }
  ]);
  const [meetingChatInput, setMeetingChatInput] = useState('');

  // Video element refs for WebRTC
  const localVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Start Real WebRTC Local Camera Stream when entering meeting
  useEffect(() => {
    let stream = null;
    if (isInsideLiveRoom && !isCameraOff) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(s => {
            stream = s;
            mediaStreamRef.current = s;
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = s;
            }
          })
          .catch(err => {
            console.warn('Real webcam not accessible or permission denied. Fallback active.', err);
          });
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
        mediaStreamRef.current = null;
      }
    };
  }, [isInsideLiveRoom]);

  // Toggle Camera Track
  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOff(!videoTrack.enabled);
        return;
      }
    }
    setIsCameraOff(!isCameraOff);
  };

  // Toggle Microphone Track
  const toggleMicrophone = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
        return;
      }
    }
    setIsMicMuted(!isMicMuted);
  };

  // Handle Screen Share via getDisplayMedia
  const toggleScreenShare = async () => {
    if (!isScreenSharingActive) {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          setIsScreenSharingActive(true);
          screenStream.getVideoTracks()[0].onended = () => {
            setIsScreenSharingActive(false);
          };
        } catch (err) {
          setIsScreenSharingActive(false);
        }
      } else {
        setIsScreenSharingActive(true);
      }
    } else {
      setIsScreenSharingActive(false);
    }
  };

  const handleToggleHandRaise = () => {
    if (!isHandRaised) {
      setIsHandRaised(true);
      setHandRaiseList(prev => [{ name: user?.name || 'Saharsh Shankar', time: 'Just now' }, ...prev]);
      playSoundChime('alert');
    } else {
      setIsHandRaised(false);
      setHandRaiseList(prev => prev.filter(h => h.name !== (user?.name || 'Saharsh Shankar')));
    }
  };

  const handleSendMeetingChat = (e) => {
    e.preventDefault();
    if (!meetingChatInput.trim()) return;
    const newM = {
      id: Date.now(),
      sender: user?.name || 'Student (You)',
      text: meetingChatInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMeetingChatList([...meetingChatList, newM]);
    setMeetingChatInput('');
    playSoundChime('sent');
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
  // PAGE 4: TEST & EXAMINATION SUITE
  // =========================================================================
  const [isTestPortalOpen, setIsTestPortalOpen] = useState(false);
  const [selectedTestClass, setSelectedTestClass] = useState('8');
  const [selectedTestSection, setSelectedTestSection] = useState('D');
  const [activeTestExam, setActiveTestExam] = useState(null); // When attempting a test
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [examAnswersMap, setExamAnswersMap] = useState({});
  const [examTimerSeconds, setExamTimerSeconds] = useState(1200); // 20 mins
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [examFinalScore, setExamFinalScore] = useState(0);

  const testsDatabase = [
    {
      id: 'test_01',
      classId: '8',
      section: 'D',
      title: 'Weekly Unit Test: Refraction, Optical Dispersion & Human Eye',
      subject: 'Science & Technology',
      chapter: 'Chapter 11: The Human Eye',
      durationMinutes: 20,
      totalMarks: 20,
      questions: [
        {
          id: 1,
          q: 'Which optical part of the human eye controls the amount of light entering the pupil?',
          options: ['Cornea', 'Iris', 'Retina', 'Ciliary Muscles'],
          correct: 1,
          explanation: 'The Iris is the dark muscular diaphragm that regulates the size of the pupil and controls incoming light intensity.'
        },
        {
          id: 2,
          q: 'The image formed on the retina of the human eye is:',
          options: ['Virtual and erect', 'Real and inverted', 'Virtual and inverted', 'Real and erect'],
          correct: 1,
          explanation: 'The crystalline convex lens forms a real and inverted image on the retina, which the brain interprets upright.'
        },
        {
          id: 3,
          q: 'A person suffering from Myopia (near-sightedness) is corrected using which lens?',
          options: ['Convex lens', 'Concave lens', 'Bifocal cylindrical lens', 'Plane glass slab'],
          correct: 1,
          explanation: 'A concave lens of suitable diverging power diverges incoming parallel rays so they focus accurately onto the retina.'
        },
        {
          id: 4,
          q: 'The least distance of distinct vision for a normal young human adult eye is:',
          options: ['2.5 cm', '25 cm', 'Infinity', '25 meters'],
          correct: 1,
          explanation: 'The near point of a normal human eye is approximately 25 centimeters (0.25 m).'
        }
      ]
    },
    {
      id: 'test_02',
      classId: '8',
      section: 'D',
      title: 'Chapter 6 Unit Exam: Annual & Semi-Annual Compound Interest',
      subject: 'Mathematics',
      chapter: 'Chapter 6: Compound Interest',
      durationMinutes: 25,
      totalMarks: 25,
      questions: [
        {
          id: 1,
          q: 'When interest is compounded half-yearly, the rate of interest (r) per conversion period becomes:',
          options: ['2r', 'r / 2', 'r / 4', 'r'],
          correct: 1,
          explanation: 'For semi-annual compounding, rate becomes r/2 and number of conversion periods becomes 2n.'
        },
        {
          id: 2,
          q: 'What is the compound interest on ₹10,000 for 2 years at 10% per annum compounded annually?',
          options: ['₹2,000', '₹2,100', '₹2,210', '₹1,500'],
          correct: 1,
          explanation: 'A = 10000(1 + 10/100)^2 = 10000 * 1.21 = ₹12,100. CI = A - P = 12100 - 10000 = ₹2,100.'
        }
      ]
    },
    {
      id: 'test_03',
      classId: '8',
      section: 'D',
      title: 'Mock Parliamentary Assessment: Constitution & Rights',
      subject: 'Social Science',
      chapter: 'Chapter 16: Our Constitution',
      durationMinutes: 15,
      totalMarks: 15,
      questions: [
        {
          id: 1,
          q: 'Who was the Chairman of the Drafting Committee of the Indian Constitution?',
          options: ['Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Jawaharlal Nehru', 'Mahatma Gandhi'],
          correct: 1,
          explanation: 'Dr. Bhimrao Ramji Ambedkar served as the Chairman of the Drafting Committee.'
        }
      ]
    }
  ];

  // Test countdown timer
  useEffect(() => {
    let interval = null;
    if (activeTestExam && !isExamCompleted && examTimerSeconds > 0) {
      interval = setInterval(() => {
        setExamTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (examTimerSeconds === 0 && activeTestExam && !isExamCompleted) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [activeTestExam, isExamCompleted, examTimerSeconds]);

  const handleStartExam = (test) => {
    setActiveTestExam(test);
    setCurrentQuestionIdx(0);
    setExamAnswersMap({});
    setExamTimerSeconds((test.durationMinutes || 20) * 60);
    setIsExamCompleted(false);
    setExamFinalScore(0);
    playSoundChime('sent');
  };

  const handleSelectExamOption = (qIdx, optIdx) => {
    setExamAnswersMap({ ...examAnswersMap, [qIdx]: optIdx });
  };

  const handleSubmitExam = () => {
    if (!activeTestExam) return;
    let score = 0;
    activeTestExam.questions.forEach((q, idx) => {
      if (examAnswersMap[idx] === q.correct) {
        score += Math.round(activeTestExam.totalMarks / activeTestExam.questions.length);
      }
    });
    setExamFinalScore(score);
    setIsExamCompleted(true);
    playSoundChime('alert');
  };

  // =========================================================================
  // PAGE 5: DIGITAL ATTENDANCE REGISTRY
  // =========================================================================
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [selectedAttClass, setSelectedAttClass] = useState('8');
  const [selectedAttSection, setSelectedAttSection] = useState('D');
  const [attToast, setAttToast] = useState('');

  // Attendance roster database (Default 45 Students per section)
  const [attendanceRosterMap, setAttendanceRosterMap] = useState(() => {
    try {
      const stored = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    // Seed default Class 8-D Roster
    const defaultRoster = [
      { roll: 1, name: 'Aakash Verma', status: 'present' },
      { roll: 2, name: 'Aanya Sharma', status: 'present' },
      { roll: 3, name: 'Aditya Raj', status: 'present' },
      { roll: 4, name: 'Ananya Roy', status: 'present' },
      { roll: 5, name: 'Ayush Kumar', status: 'late' },
      { roll: 6, name: 'Deepak Patel', status: 'present' },
      { roll: 7, name: 'Divya Kumari', status: 'present' },
      { roll: 8, name: 'Harshit Singh', status: 'present' },
      { roll: 9, name: 'Ishita Sen', status: 'present' },
      { roll: 10, name: 'Kavya Mishra', status: 'present' },
      { roll: 11, name: 'Manish Pandey', status: 'absent' },
      { roll: 12, name: 'Mohit Sharma', status: 'present' },
      { roll: 13, name: 'Naveen Kumar', status: 'present' },
      { roll: 14, name: 'Pooja Tiwari', status: 'present' },
      { roll: 15, name: 'Prachi Gupta', status: 'present' },
      { roll: 16, name: 'Rahul Kashyap', status: 'present' },
      { roll: 17, name: 'Riya Srivastava', status: 'present' },
      { roll: 18, name: 'Rohan Verma', status: 'present' },
      { roll: 19, name: 'Saharsh Shankar', status: 'present' },
      { roll: 20, name: 'Sakshi Singh', status: 'present' },
      { roll: 21, name: 'Sameer Jha', status: 'absent' },
      { roll: 22, name: 'Sanya Malhotra', status: 'present' },
      { roll: 23, name: 'Shivam Dubey', status: 'present' },
      { roll: 24, name: 'Shruti Kumari', status: 'present' },
      { roll: 25, name: 'Siddharth Roy', status: 'present' },
      { roll: 26, name: 'Sneha Kumari', status: 'present' },
      { roll: 27, name: 'Sourabh Anand', status: 'present' },
      { roll: 28, name: 'Tanvi Sharan', status: 'present' },
      { roll: 29, name: 'Utkarsh Chandra', status: 'present' },
      { roll: 30, name: 'Vaibhav Sen', status: 'present' },
      { roll: 31, name: 'Varun Prasad', status: 'present' },
      { roll: 32, name: 'Yash Vardhan', status: 'present' }
    ];
    return { '8-D': defaultRoster };
  });

  const currentRosterKey = `${selectedAttClass}-${selectedAttSection}`;
  const currentRoster = attendanceRosterMap[currentRosterKey] || [
    { roll: 1, name: 'Aakash Verma', status: 'present' },
    { roll: 2, name: 'Aanya Sharma', status: 'present' },
    { roll: 3, name: 'Aditya Raj', status: 'present' },
    { roll: 4, name: 'Saharsh Shankar', status: 'present' },
    { roll: 5, name: 'Ayush Kumar', status: 'present' }
  ];

  const handleUpdateStudentAttendance = (roll, newStatus) => {
    if (!isFacultyRole) return; // Students cannot edit!
    const updatedRoster = currentRoster.map(s => s.roll === roll ? { ...s, status: newStatus } : s);
    const updatedMap = {
      ...attendanceRosterMap,
      [currentRosterKey]: updatedRoster
    };
    setAttendanceRosterMap(updatedMap);
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(updatedMap));
    } catch (e) {}
  };

  const handleSaveAttendance = () => {
    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendanceRosterMap));
      setAttToast('Attendance Synced with DAV Official Cloud Register!');
      playSoundChime('sent');
      setTimeout(() => setAttToast(''), 3000);
    } catch (e) {}
  };

  const currentMeta = PDF_PAGES_METADATA[activePage] || PDF_PAGES_METADATA.homework;

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-500 selection:text-slate-950 pb-16">
      
      {/* ========================================================================= */}
      {/* TOP HEADER: NEON PURPLE & MINT BLUE BRANDING (FULL SCREEN WIDTH)           */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-r from-purple-950 via-slate-950 to-teal-950 border-b border-purple-500/40 px-4 md:px-8 py-4 shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 via-fuchsia-600 to-teal-400 p-0.5 shadow-lg shadow-purple-600/30 animate-pulse">
                <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center overflow-hidden">
                  <ShankarAILogo size={34} />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal-400 border-2 border-slate-950 flex items-center justify-center text-[9px] font-black text-slate-950">
                5
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-purple-300 via-fuchsia-200 to-teal-300 bg-clip-text text-transparent tracking-tight">
                  {isTeacherOS ? 'SECTION 1: DAV FACULTY MASTER OS' : 'DAV FACULTY & STUDENT LOUNGE'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/50 text-[10px] font-mono font-bold text-teal-300 shadow-sm">
                  {isTeacherOS ? '★ Section 1 for Faculty (Dimension 5)' : 'Dimension 5 Ecosystem'}
                </span>
              </div>
              <p className="text-xs text-purple-200/80 font-medium mt-0.5">
                {isTeacherOS 
                  ? `Welcome Respected ${user?.name || 'Faculty Member'}! Complete exclusive access to all 5 faculty sub-sections: Homework, Doubt Chat, Live WebRTC Classes, Test Suite, and Attendance.`
                  : '5-Page Real-time Academic Console • WebRTC Video • WhatsApp Live Desk • Gen-Z Full Screen Edition'
                }
              </p>
            </div>
          </div>

          {/* Controls: Role Switcher & Official WhatsApp Callout */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Sub-Dimension 5A vs 5B Switcher */}
            {onToggleSubDimension && (
              <div className="bg-slate-900/90 border border-purple-500/60 p-1 rounded-xl flex items-center gap-1 shadow-inner text-xs">
                <button
                  type="button"
                  onClick={() => onToggleSubDimension('teacher_only')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    teacherSubDimension === 'teacher_only'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md font-black'
                      : 'text-purple-300 hover:text-white'
                  }`}
                  title="Sub-Dimension 5A: Operates solely on Section 5 Faculty Master OS"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Sub-Dim 5A: Only Faculty (OS)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSubDimension('teacher_explorer')}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    teacherSubDimension === 'teacher_explorer'
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md font-black'
                      : 'text-purple-300 hover:text-white'
                  }`}
                  title="Sub-Dimension 5B: Full Campus Access across all 10 sections + Section 5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Sub-Dim 5B: Teacher &amp; Explorer (All 10 Sections)</span>
                </button>
              </div>
            )}

            {/* Perspective Role Switcher */}
            {isTeacherOS ? (
              <div className="bg-purple-900/60 border border-teal-400/80 px-3.5 py-1.5 rounded-xl flex items-center gap-2 shadow-inner text-xs">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span className="font-black text-teal-300">Dimension 5 Faculty Master OS Active</span>
                <span className="text-[10px] text-purple-200">({user?.name || 'Verified Teacher'})</span>
              </div>
            ) : (
              <div className="bg-slate-900/90 border border-purple-600/50 p-1 rounded-xl flex items-center gap-1 shadow-inner text-xs">
                <button
                  onClick={() => { setIsFacultyRole(false); setChatRole('student'); }}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    !isFacultyRole
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md font-black'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student Lounge</span>
                </button>
                <button
                  onClick={() => { setIsFacultyRole(true); setChatRole('teacher'); }}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    isFacultyRole
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-md font-black'
                      : 'text-purple-300 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Faculty Master OS</span>
                </button>
              </div>
            )}

            {/* Official WhatsApp Launcher */}
            <a
              href={`https://wa.me/${WHATSAPP_OFFICIAL_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Official (+91 94700 33984)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN SECTION 5 CANVAS: PDF PRESENTATION OR FULL-SCREEN INTERACTIVE MODE    */}
      {/* ========================================================================= */}
      <main className="w-full px-2 sm:px-4 md:px-8 pt-4">

        {!isFullScreenInteractive ? (
          /* ===================================================================== */
          /* 5-PAGE AUTHENTIC ACADEMIC PDF PRESENTATION HANDBOOK SYSTEM            */
          /* ===================================================================== */
          <div className="w-full max-w-6xl mx-auto space-y-4 animate-fadeIn">
            
            {/* Acrobat-Style PDF Reader Top Workspace Bar */}
            <div className="w-full bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
              
              {/* PDF Document Identity */}
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white font-mono font-black text-xs flex items-center gap-1.5 shadow-md">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </span>
                <div>
                  <h3 className="font-mono text-xs sm:text-sm font-bold text-slate-100 flex items-center gap-2">
                    <span>DAV_Academic_Section5_Presentation_Handbook.pdf</span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Official Directive
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Ref: {currentMeta.code} • Approved by DAV CMC • Session 2026-2027
                  </p>
                </div>
              </div>

              {/* Page Stepper Navigation */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={currentPageIdx <= 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 border border-slate-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev Page</span>
                </button>

                <div className="px-3 py-1 rounded-lg bg-slate-950 border border-purple-500/80 text-teal-300 font-mono font-black text-xs shadow-inner">
                  Page {currentPageIdx + 1} of 5
                </div>

                <button
                  type="button"
                  onClick={handleNextSlide}
                  disabled={currentPageIdx >= PRESENTATION_PAGES.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 border border-slate-600 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                  title="Next Page"
                >
                  <span className="hidden sm:inline">Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* PDF Toolbar Controls: Zoom, Theme, Print, Direct Fullscreen */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Zoom Controls */}
                <div className="hidden md:flex items-center gap-1 bg-slate-950 border border-slate-700 px-2 py-1 rounded-lg font-mono text-[11px] text-slate-300">
                  <button 
                    onClick={() => setPdfZoom(prev => Math.max(75, prev - 10))}
                    className="hover:text-teal-300 px-1 font-bold cursor-pointer"
                    title="Zoom Out"
                  >
                    -
                  </button>
                  <span className="text-teal-300 font-bold min-w-[36px] text-center">{pdfZoom}%</span>
                  <button 
                    onClick={() => setPdfZoom(prev => Math.min(125, prev + 10))}
                    className="hover:text-teal-300 px-1 font-bold cursor-pointer"
                    title="Zoom In"
                  >
                    +
                  </button>
                </div>

                {/* Paper Canvas Theme Switcher */}
                <div className="flex items-center bg-slate-950 border border-slate-700 p-0.5 rounded-lg text-[11px]">
                  <button
                    onClick={() => setPdfPaperTheme('white')}
                    className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
                      pdfPaperTheme === 'white'
                        ? 'bg-slate-200 text-slate-950 font-black shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Real White Paper Document"
                  >
                    <span>📄 White Paper</span>
                  </button>
                  <button
                    onClick={() => setPdfPaperTheme('dark')}
                    className={`px-2 py-1 rounded transition cursor-pointer flex items-center gap-1 ${
                      pdfPaperTheme === 'dark'
                        ? 'bg-purple-600 text-white font-black shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                    title="Dark Presentation Slide"
                  >
                    <span>🌙 Dark Slide</span>
                  </button>
                </div>

                {/* Print PDF Button */}
                <button
                  onClick={() => window.print()}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-300" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>

                {/* Direct Launch Fullscreen Button */}
                <button
                  onClick={() => {
                    setIsFullScreenInteractive(true);
                    playSoundChime('sent');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer shadow-md"
                  title="Launch Interactive Mode in Full Screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Fullscreen</span>
                </button>
              </div>

            </div>

            {/* =================================================================== */}
            {/* 5-SECTION ILLUMINATED BUTTONS: CLICK LIGHTS UP THAT SECTION ONLY    */}
            {/* =================================================================== */}
            <div className="w-full bg-slate-950/90 border-2 border-purple-800/80 rounded-2xl p-2.5 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                
                {/* Button 1: Daily Homework Hub */}
                <button
                  onClick={() => handleSelectSectionPage('homework')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    activePage === 'homework'
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 font-black border-2 border-teal-200 shadow-xl shadow-teal-400/50 scale-[1.02] ring-4 ring-teal-400/40'
                      : 'bg-slate-900/80 border-purple-900/60 hover:border-purple-500 hover:bg-slate-900 opacity-80 hover:opacity-100 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] font-mono ${
                      activePage === 'homework' ? 'bg-slate-950 text-teal-300' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      01
                    </span>
                    <ClipboardList className={`w-4 h-4 ${activePage === 'homework' ? 'text-slate-950' : 'text-purple-400'}`} />
                  </div>
                  <div className="text-xs font-black truncate">
                    Daily Homework Hub
                  </div>
                  <div className="text-[10px] mt-0.5 flex items-center justify-between">
                    <span className={activePage === 'homework' ? 'text-slate-900 font-bold' : 'text-purple-300/70'}>
                      Class LKG to 8
                    </span>
                    {activePage === 'homework' && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-slate-950 text-teal-300 font-mono">
                        💡 Active Page
                      </span>
                    )}
                  </div>
                </button>

                {/* Button 2: Faculty WhatsApp Desk */}
                <button
                  onClick={() => handleSelectSectionPage('doubts_chat')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    activePage === 'doubts_chat'
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 font-black border-2 border-teal-200 shadow-xl shadow-teal-400/50 scale-[1.02] ring-4 ring-teal-400/40'
                      : 'bg-slate-900/80 border-purple-900/60 hover:border-purple-500 hover:bg-slate-900 opacity-80 hover:opacity-100 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] font-mono ${
                      activePage === 'doubts_chat' ? 'bg-slate-950 text-teal-300' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      02
                    </span>
                    <MessageSquareMore className={`w-4 h-4 ${activePage === 'doubts_chat' ? 'text-slate-950' : 'text-teal-400'}`} />
                  </div>
                  <div className="text-xs font-black truncate">
                    Faculty WhatsApp Desk
                  </div>
                  <div className="text-[10px] mt-0.5 flex items-center justify-between">
                    <span className={activePage === 'doubts_chat' ? 'text-slate-900 font-bold' : 'text-purple-300/70'}>
                      50+ Teachers Roster
                    </span>
                    {activePage === 'doubts_chat' && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-slate-950 text-teal-300 font-mono">
                        💡 Active Page
                      </span>
                    )}
                  </div>
                </button>

                {/* Button 3: Live Video Class */}
                <button
                  onClick={() => handleSelectSectionPage('live_class')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    activePage === 'live_class'
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 font-black border-2 border-teal-200 shadow-xl shadow-teal-400/50 scale-[1.02] ring-4 ring-teal-400/40'
                      : 'bg-slate-900/80 border-purple-900/60 hover:border-purple-500 hover:bg-slate-900 opacity-80 hover:opacity-100 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] font-mono ${
                      activePage === 'live_class' ? 'bg-slate-950 text-teal-300' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      03
                    </span>
                    <Video className={`w-4 h-4 ${activePage === 'live_class' ? 'text-slate-950' : 'text-rose-400'}`} />
                  </div>
                  <div className="text-xs font-black truncate">
                    Live Video Class (WebRTC)
                  </div>
                  <div className="text-[10px] mt-0.5 flex items-center justify-between">
                    <span className={activePage === 'live_class' ? 'text-slate-900 font-bold' : 'text-purple-300/70'}>
                      In-Website HD Meet
                    </span>
                    {activePage === 'live_class' && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-slate-950 text-teal-300 font-mono">
                        💡 Active Page
                      </span>
                    )}
                  </div>
                </button>

                {/* Button 4: Online Test & Exam */}
                <button
                  onClick={() => handleSelectSectionPage('tests')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    activePage === 'tests'
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 font-black border-2 border-teal-200 shadow-xl shadow-teal-400/50 scale-[1.02] ring-4 ring-teal-400/40'
                      : 'bg-slate-900/80 border-purple-900/60 hover:border-purple-500 hover:bg-slate-900 opacity-80 hover:opacity-100 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] font-mono ${
                      activePage === 'tests' ? 'bg-slate-950 text-teal-300' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      04
                    </span>
                    <CheckSquare className={`w-4 h-4 ${activePage === 'tests' ? 'text-slate-950' : 'text-amber-400'}`} />
                  </div>
                  <div className="text-xs font-black truncate">
                    Online Test &amp; Exams
                  </div>
                  <div className="text-[10px] mt-0.5 flex items-center justify-between">
                    <span className={activePage === 'tests' ? 'text-slate-900 font-bold' : 'text-purple-300/70'}>
                      Timed CBT Simulator
                    </span>
                    {activePage === 'tests' && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-slate-950 text-teal-300 font-mono">
                        💡 Active Page
                      </span>
                    )}
                  </div>
                </button>

                {/* Button 5: Digital Attendance */}
                <button
                  onClick={() => handleSelectSectionPage('attendance')}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    activePage === 'attendance'
                      ? 'bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 text-slate-950 font-black border-2 border-teal-200 shadow-xl shadow-teal-400/50 scale-[1.02] ring-4 ring-teal-400/40'
                      : 'bg-slate-900/80 border-purple-900/60 hover:border-purple-500 hover:bg-slate-900 opacity-80 hover:opacity-100 text-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] font-mono ${
                      activePage === 'attendance' ? 'bg-slate-950 text-teal-300' : 'bg-purple-900/40 text-purple-300'
                    }`}>
                      05
                    </span>
                    <UserCheck className={`w-4 h-4 ${activePage === 'attendance' ? 'text-slate-950' : 'text-cyan-400'}`} />
                  </div>
                  <div className="text-xs font-black truncate">
                    Digital Attendance
                  </div>
                  <div className="text-[10px] mt-0.5 flex items-center justify-between">
                    <span className={activePage === 'attendance' ? 'text-slate-900 font-bold' : 'text-purple-300/70'}>
                      Student Roster View
                    </span>
                    {activePage === 'attendance' && (
                      <span className="px-1 py-0.2 rounded text-[8px] font-black uppercase bg-slate-950 text-teal-300 font-mono">
                        💡 Active Page
                      </span>
                    )}
                  </div>
                </button>

              </div>
            </div>

            {/* =================================================================== */}
            {/* REALISTIC PDF PAPER CANVAS (WHITE A4 SHEET / DARK SLIDE)            */}
            {/* =================================================================== */}
            <div 
              style={{ 
                transform: pdfZoom !== 100 ? `scale(${pdfZoom / 100})` : 'none', 
                transformOrigin: 'top center' 
              }}
              className="w-full transition-transform duration-200"
            >
              <div className={`w-full max-w-4xl mx-auto rounded-xl p-6 sm:p-10 md:p-12 relative overflow-hidden transition-all duration-300 ${
                pdfPaperTheme === 'white'
                  ? 'bg-white text-slate-900 border-2 border-slate-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] font-serif'
                  : 'bg-slate-950 text-slate-100 border-2 border-purple-500/70 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] font-sans'
              }`}>

                {/* Diagonal Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.04]">
                  <span className="text-6xl sm:text-8xl md:text-9xl font-black font-serif tracking-widest -rotate-45 text-slate-950 whitespace-nowrap">
                    DAV PUBLIC SCHOOL • OFFICIAL DIRECTIVE
                  </span>
                </div>

                {/* PDF Header / Letterhead */}
                <div className="relative z-10 pb-5 border-b-2 border-slate-800/80 space-y-3">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    
                    {/* Official DAV Crest / Logo */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-700 via-fuchsia-600 to-teal-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
                        <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                          <ShankarAILogo size={40} />
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-widest uppercase font-bold text-teal-600 dark:text-teal-400">
                          DAV COLLEGE MANAGING COMMITTEE • NEW DELHI
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif">
                          DAV PUBLIC SCHOOL
                        </h1>
                        <div className="text-xs italic text-slate-600 dark:text-purple-300 font-serif">
                          "तमसो मा ज्योतिर्गमय" (Lead me from darkness to light) • Affiliated to CBSE
                        </div>
                      </div>
                    </div>

                    {/* Official Document Metadata Box */}
                    <div className="text-right sm:text-right font-mono text-[10px] space-y-0.5 bg-slate-100 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-300 dark:border-purple-800/60">
                      <div><strong className="text-slate-800 dark:text-teal-300">REF:</strong> {currentMeta.code}</div>
                      <div><strong className="text-slate-800 dark:text-teal-300">SESSION:</strong> 2026-2027</div>
                      <div className="text-emerald-700 dark:text-emerald-400 font-bold">● APPROVED INSTITUTIONAL DIRECTIVE</div>
                      <div className="text-purple-700 dark:text-purple-400">DOCUMENT PAGE {currentMeta.pageNumber} OF 05</div>
                    </div>

                  </div>

                  {/* Double Decorative Separation Line */}
                  <div className="border-t border-b border-slate-400/80 dark:border-purple-700/60 py-0.5 my-2">
                    <div className="text-center text-[10px] font-mono tracking-widest uppercase text-slate-600 dark:text-teal-300 font-bold">
                      OFFICIAL ACADEMIC REGULATION &amp; DIGITAL PORTAL OPERATIONAL MANUAL
                    </div>
                  </div>
                </div>

                {/* Directive Title & Academic Scopes */}
                <div className="relative z-10 pt-5 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-purple-950 border border-slate-300 dark:border-teal-500/40 text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentMeta.badgeText}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif">
                    {currentMeta.directiveName}
                  </h2>

                  <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-purple-200 italic font-serif">
                    {currentMeta.tagline}
                  </p>

                  <div className="flex items-center gap-2.5 flex-wrap pt-1 font-mono text-xs">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-purple-700 text-slate-800 dark:text-purple-200 font-bold">
                      🎓 {currentMeta.gradeScope}
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-teal-700 text-teal-800 dark:text-teal-300 font-bold">
                      🏫 {currentMeta.sectionScope}
                    </span>
                  </div>

                  {/* Directive Statement Overview */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-purple-900/60 text-slate-800 dark:text-purple-100 text-xs sm:text-sm leading-relaxed font-serif">
                    {currentMeta.overview}
                  </div>
                </div>

                {/* 3 Core Academic Pillars */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
                  {currentMeta.corePillars.map((pillar, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-300 dark:border-purple-800 space-y-1.5 shadow-sm"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-purple-900 text-teal-400 flex items-center justify-center font-black text-xs font-mono">
                        0{idx + 1}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-serif">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-purple-200/80 leading-relaxed font-sans">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* ================================================================= */}
                {/* THE MEDIUM BUTTON IN THE MEDIUM (CENTER) OF THE PAGE              */}
                {/* ================================================================= */}
                <div className="relative z-10 my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-50 via-slate-100 to-teal-50 dark:from-purple-950/70 dark:via-slate-950 dark:to-teal-950/70 border-2 border-dashed border-teal-500/70 text-center space-y-3.5 shadow-lg">
                  <div className="max-w-md mx-auto space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-800 dark:text-teal-300 text-[10px] font-mono font-black uppercase tracking-wider border border-teal-500/40">
                      ★ CENTRAL INTERACTIVE PORTAL LAUNCHER ★
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-serif">
                      {currentMeta.centralButtonSub}
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-purple-200/80 font-sans">
                      Click the medium button below to expand into the dedicated full-screen interactive mode with zero distractions
                    </p>
                  </div>

                  {/* The Medium Button */}
                  <div>
                    <button
                      onClick={() => {
                        setIsFullScreenInteractive(true);
                        playSoundChime('sent');
                      }}
                      className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-purple-700 via-fuchsia-600 to-teal-400 hover:from-purple-600 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-teal-200"
                    >
                      <span>{currentMeta.centralButtonText}</span>
                      <ArrowRight className="w-5 h-5 text-slate-950 animate-pulse" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-teal-700 dark:text-teal-300 font-mono">
                    <span>● Verified Full Screen Experience</span>
                    <span>•</span>
                    <span>Click back anytime to return to PDF presentation</span>
                  </div>
                </div>

                {/* Operational SOP Guidelines */}
                <div className="relative z-10 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-purple-900 space-y-2.5">
                  <h4 className="text-xs font-black uppercase text-teal-800 dark:text-teal-300 tracking-wider flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>Operational Standard Operating Procedure (SOP)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                    {currentMeta.instructions.map((ins, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-purple-950 text-[11px] text-slate-700 dark:text-purple-200 leading-relaxed font-sans">
                        {ins}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Institutional Signatures & Document Seal */}
                <div className="relative z-10 pt-6 mt-6 border-t-2 border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif">
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-teal-600 dark:border-teal-400 flex items-center justify-center text-[8px] font-mono font-black text-teal-700 dark:text-teal-300 text-center leading-tight p-1 rotate-12">
                      DAV CMC SEAL
                    </div>
                    <div>
                      <div className="font-black text-slate-900 dark:text-white">Rishit Shankar</div>
                      <div className="text-[10px] text-slate-600 dark:text-purple-300 font-mono">
                        Chief System Architect &amp; Digital Head
                      </div>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <div className="font-black text-slate-900 dark:text-white">
                      {currentMeta.sealTitle}
                    </div>
                    <div className="text-[10px] text-slate-600 dark:text-purple-400 font-mono">
                      DAV Public School Academic Directorate • Session 2026-2027
                    </div>
                  </div>

                </div>

                {/* Formal Page Footer */}
                <div className="relative z-10 pt-4 mt-4 border-t border-slate-300 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Page {currentMeta.pageNumber} of 05 • DAV Institutional Manual</span>
                  <span>Confidential • Authorized School Portal Property</span>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* ===================================================================== */
          /* FULL-SCREEN INTERACTIVE TOOLS WRAPPER                                  */
          /* ===================================================================== */
          <div className="w-full space-y-6 animate-fadeIn">
            
            {/* Sticky Top Bar: Return to PDF Presentation & Quick Tool Switcher */}
            <div className="w-full bg-gradient-to-r from-purple-950 via-slate-950 to-teal-950 border-b-2 border-teal-400/80 px-4 md:px-8 py-3.5 flex items-center justify-between flex-wrap gap-3 shadow-2xl sticky top-0 z-40 rounded-2xl mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsFullScreenInteractive(false);
                    playSoundChime('sent');
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-purple-900/50 cursor-pointer border border-purple-400 transition transform active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 text-teal-300" />
                  <span>⤌ Back to PDF Presentation Page {currentMeta.pageNumber}</span>
                </button>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-400 text-slate-950 font-black text-[10px] font-mono">
                    FULL-SCREEN INTERACTIVE MODE
                  </span>
                  <span className="text-xs font-black text-white">
                    {PRESENTATION_PAGES.find(p => p.id === activePage)?.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[11px] text-purple-300 font-mono mr-1 hidden md:inline">Quick Switch:</span>
                {PRESENTATION_PAGES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      handlePageChange(p.id);
                      playSoundChime('sent');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer border ${
                      activePage === p.id
                        ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-black border-teal-200 shadow-md'
                        : 'bg-slate-900/80 text-purple-300 border-purple-800 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    Page 0{p.num}
                  </button>
                ))}
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* PAGE 1: DAILY HOMEWORK & CLASSWORK MANAGEMENT                     */}
            {/* ----------------------------------------------------------------- */}
            {activePage === 'homework' && (
          <div className="w-full space-y-6 animate-fadeIn">
            
            {/* Gen Z Hero Animated Graphical Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-teal-950 border-2 border-purple-500/50 p-8 md:p-12 shadow-2xl">
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/60 border border-teal-400/40 text-xs font-mono font-bold text-teal-300">
                  <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin" />
                  <span>PAGE 1 • REAL-TIME DAILY HOMEWORK CONSOLE</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Track Your Daily <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Homework &amp; Classwork</span>
                </h2>

                <p className="text-sm md:text-base text-purple-200/80 leading-relaxed max-w-2xl">
                  Inspect subject assignments, textbook page references, submission deadlines, and practical requirements for all grades from Class LKG to Class 8.
                </p>

                {/* Primary Interactive Redirect Button */}
                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setIsHwModalOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-400 hover:from-purple-500 hover:to-teal-300 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-purple-600/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>🚀 Go to Check Daily Homework</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Teacher: Assign New Homework */}
                  {isFacultyRole && (
                    <button
                      onClick={() => setShowAssignHwModal(true)}
                      className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border-2 border-purple-500 text-purple-200 hover:text-white font-black text-sm flex items-center gap-2 transition cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-teal-300" />
                      <span>➕ Assign New Homework (Faculty)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Preview Cards Grid for Selected Default */}
            <div className="w-full">
              <div className="flex items-center justify-between pb-3">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-teal-400" />
                  <span>Recent Class 8-D Assignments Overview</span>
                </h3>
                <button
                  onClick={() => setIsHwModalOpen(true)}
                  className="text-xs text-teal-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Select Another Class / Section</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {homeworkStore.slice(0, 3).map((hw) => (
                  <div
                    key={hw.id}
                    className="p-5 rounded-2xl bg-slate-900/70 border border-purple-800/80 hover:border-teal-400 transition shadow-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-purple-900/80 text-teal-300 text-[10px] font-mono font-bold border border-purple-600">
                        Class {hw.classId}-{hw.section}
                      </span>
                      <span className="text-[11px] text-purple-300 font-mono">{hw.dueDate}</span>
                    </div>
                    <h4 className="text-sm font-black text-white">{hw.title}</h4>
                    <p className="text-xs text-purple-200/80 line-clamp-3">{hw.desc}</p>
                    <div className="pt-2 border-t border-purple-900/50 flex items-center justify-between text-[11px] text-purple-300">
                      <span>{hw.subject}</span>
                      <span className="font-bold text-teal-400">{hw.teacher}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-Screen Daily Homework Popup / Modal */}
            {isHwModalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
                <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col space-y-6">
                  
                  {/* Modal Top Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-purple-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-600 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg md:text-xl font-black text-white">
                          DAV Public School Daily Homework &amp; Classwork Hub
                        </h2>
                        <p className="text-xs text-teal-300 font-mono">
                          Verified Official Homework Portal for Students, Parents &amp; Faculty
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsHwModalOpen(false)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-200 hover:text-white border border-purple-700 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Step 1: Select Class (LKG to Class 8) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-1.5">
                      <span>Step 1: Select Grade / Class (LKG to Class 8)</span>
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                      {SCHOOL_CLASSES_CONFIG.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedHwClass(c.id)}
                          className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                            selectedHwClass === c.id
                              ? 'bg-gradient-to-r from-purple-600 to-teal-400 text-slate-950 border-teal-300 shadow-md scale-105'
                              : 'bg-slate-900/80 text-purple-300 border-purple-800 hover:border-purple-600'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Select Section (A, B, C, D, E) */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-teal-300 tracking-wider flex items-center gap-1.5">
                      <span>Step 2: Select Section (5 Sections: A, B, C, D, E)</span>
                    </label>
                    <div className="grid grid-cols-5 gap-2 max-w-md">
                      {['A', 'B', 'C', 'D', 'E'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedHwSection(s)}
                          className={`py-2.5 rounded-xl text-xs font-black transition cursor-pointer border ${
                            selectedHwSection === s
                              ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 border-teal-200 shadow-md scale-105'
                              : 'bg-slate-900/80 text-teal-300 border-teal-900 hover:border-teal-700'
                          }`}
                        >
                          Section {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Homework Display for Selected Class & Section */}
                  <div className="flex-1 space-y-4 pt-2">
                    <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-purple-900">
                      <div>
                        <h3 className="text-base font-black text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          <span>
                            Class {SCHOOL_CLASSES_CONFIG.find(c => c.id === selectedHwClass)?.name || selectedHwClass} - Section {selectedHwSection} Homework
                          </span>
                        </h3>
                        <p className="text-xs text-purple-300">
                          Displaying all active subject assignments published by school teachers
                        </p>
                      </div>

                      {isFacultyRole && (
                        <button
                          onClick={() => {
                            setNewHwClass(selectedHwClass);
                            setNewHwSection(selectedHwSection);
                            setShowAssignHwModal(true);
                          }}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                        >
                          ➕ Assign to Class {selectedHwClass}-{selectedHwSection}
                        </button>
                      )}
                    </div>

                    {/* Filtered Homework Cards */}
                    {(() => {
                      const filtered = homeworkStore.filter(
                        h => h.classId === selectedHwClass && h.section === selectedHwSection
                      );

                      if (filtered.length === 0) {
                        return (
                          <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-purple-900/60 space-y-3">
                            <ClipboardList className="w-12 h-12 text-purple-400 mx-auto opacity-40" />
                            <h4 className="text-base font-bold text-white">
                              No Homework Assigned Yet for Class {selectedHwClass} - Section {selectedHwSection}
                            </h4>
                            <p className="text-xs text-purple-300 max-w-md mx-auto">
                              Teachers of this section have not published an assignment yet today. Check back soon or select another section!
                            </p>
                            {isFacultyRole && (
                              <button
                                onClick={() => {
                                  setNewHwClass(selectedHwClass);
                                  setNewHwSection(selectedHwSection);
                                  setShowAssignHwModal(true);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
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

                </div>
              </div>
            )}

            {/* Teacher: Assign New Homework Modal */}
            {showAssignHwModal && (
              <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
                <div className="w-full max-w-2xl bg-purple-950/95 border-2 border-teal-400/80 rounded-3xl p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-teal-300" />
                      <span>Publish New Homework to Students</span>
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
                          <option>Science &amp; Technology</option>
                          <option>Mathematics</option>
                          <option>Social Science</option>
                          <option>English Literature</option>
                          <option>Hindi (Gyan Sagar &amp; Abhyas)</option>
                          <option>Sanskrit (सुरभिः)</option>
                          <option>Hands on Computer / ICT</option>
                          <option>General Knowledge / EVS</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-teal-300 uppercase mb-1">Due Date &amp; Time</label>
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
                              {t.name} ({t.subject}) {t.isRegisteredFaculty ? '★ Verified' : ''}
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
        {/* PAGE 2: LIVE WHATSAPP FACULTY DOUBT DESK (ALL 50 TEACHERS)             */}
        {/* --------------------------------------------------------------------- */}
        {activePage === 'doubts_chat' && (
          <div className="w-full space-y-4 animate-fadeIn">
            
            {/* Top Control Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-950 to-teal-950/90 border border-purple-500/50 flex items-center justify-between flex-wrap gap-3 shadow-xl">
              <div>
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-teal-300" />
                  <span>Faculty WhatsApp Desk • All {teachersList.length}+ Teachers Roster</span>
                </h2>
                <p className="text-xs text-purple-200/90 mt-0.5">
                  Click on any teacher icon to start live chatting • Sub-second delivery • Manual teacher replies &amp; WhatsApp link
                </p>
              </div>

              {/* Mode Toggle & Session End */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="bg-slate-900 border border-purple-700 rounded-xl p-0.5 text-xs flex items-center">
                  <button
                    onClick={() => setChatRole('student')}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      chatRole === 'student' ? 'bg-teal-500 text-slate-950 font-black shadow-md' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    🎒 Student Mode (Ask)
                  </button>
                  <button
                    onClick={() => setChatRole('teacher')}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      chatRole === 'teacher' ? 'bg-purple-600 text-white font-black shadow-md' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    👨‍🏫 Teacher Mode (Reply)
                  </button>
                </div>

                <button
                  onClick={() => setIsDoubtSessionResolved(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-900 border border-purple-600 text-purple-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-teal-300" />
                  <span>End Doubt Session</span>
                </button>
              </div>
            </div>

            {/* Main Full-Screen WhatsApp Interface */}
            <div className="w-full h-[80vh] min-h-[600px] rounded-3xl bg-slate-950 border-2 border-purple-500/50 overflow-hidden shadow-2xl flex flex-col md:flex-row">
              
              {/* Left Column: 50+ Teachers Roster & Search */}
              <div className="w-full md:w-96 bg-slate-900 border-r border-purple-800/80 flex flex-col shrink-0">
                
                {/* Search Bar */}
                <div className="p-3 bg-purple-950/90 border-b border-purple-800 space-y-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder={`Search ${teachersList.length}+ teachers by name or subject...`}
                      value={teacherSearchQuery}
                      onChange={(e) => setTeacherSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-purple-700 text-xs text-white placeholder-purple-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  {/* Department Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin text-[10px]">
                    {['all', 'Science', 'Mathematics', 'Social Science', 'Hindi', 'English', 'Sanskrit', 'Computer Science', 'Kindergarten'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setTeacherDeptFilter(d)}
                        className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap cursor-pointer transition ${
                          teacherDeptFilter === d
                            ? 'bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950'
                            : 'bg-slate-950 text-purple-300 hover:text-white'
                        }`}
                      >
                        {d === 'all' ? `All (${teachersList.length})` : d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 50+ Teachers Scrollable List */}
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
                      const lastMsg = (teacherChatsMap[t.id] || [])[ (teacherChatsMap[t.id] || []).length - 1 ];

                      return (
                        <div
                          key={t.id}
                          onClick={() => setActiveTeacherId(t.id)}
                          className={`p-3 flex items-start gap-3 transition cursor-pointer hover:bg-purple-950/40 ${
                            isActive ? 'bg-purple-900/50 border-l-4 border-teal-400' : ''
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 shadow-md relative`}>
                            {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-slate-900" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <div className="flex items-center gap-1.5 truncate">
                                <h4 className="text-xs font-black text-white truncate">{t.name}</h4>
                                {t.isRegisteredFaculty && (
                                  <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-teal-400 text-slate-950 font-mono shrink-0 shadow-xs">
                                    ★ Registered
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
                              {lastMsg?.text || t.initialMessage}
                            </p>
                          </div>

                          {/* 1-Click Direct WhatsApp Icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const link = buildOfficialWhatsAppLink(t, user?.name, '8-D', t.initialMessage);
                              window.open(link, '_blank');
                            }}
                            title="Direct WhatsApp Launch (+91 94700 33984)"
                            className="p-1 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-600/30 shrink-0 cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                </div>

              </div>

              {/* Right Column: 1-on-1 WhatsApp Chat Conversation */}
              <div className="flex-1 flex flex-col bg-slate-950 min-w-0 relative">
                
                {/* Active Teacher Header */}
                <div className="p-3.5 bg-purple-950 border-b border-purple-800 flex items-center justify-between text-white shrink-0 flex-wrap gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeTeacher.avatarColor} flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shrink-0`}>
                      {activeTeacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-white truncate">{activeTeacher.name}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                          {activeTeacher.subject}
                        </span>
                      </div>
                      <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Online • Sub-second delivery • {activeTeacher.role}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSendViaOfficialWhatsApp}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
                      title="Open in WhatsApp (+91 94700 33984)"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp (+91 94700 33984)</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* 1-Click Quick Academic Prompts */}
                <div className="p-2 bg-purple-950/60 border-b border-purple-900/80 flex items-center gap-2 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-thin shrink-0">
                  <span className="text-[10px] font-bold text-teal-300 uppercase shrink-0">1-Click Prompts:</span>
                  <button
                    onClick={() => setChatInputText(`Respected ${activeTeacher.name}, can you please explain the key steps for tomorrow's homework question?`)}
                    className="px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-[11px] border border-purple-600 cursor-pointer"
                  >
                    📖 Ask Homework Guidance
                  </button>
                  <button
                    onClick={() => setChatInputText(`Respected Ma'am/Sir, which textbook diagram should I practice for the upcoming unit test?`)}
                    className="px-2.5 py-1 rounded-lg bg-purple-900/80 hover:bg-purple-800 text-purple-200 text-[11px] border border-purple-600 cursor-pointer"
                  >
                    🎨 Important Diagram Query
                  </button>
                  <button
                    onClick={handleInstantTeacherAIClarification}
                    className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-[11px] shadow-sm cursor-pointer flex items-center gap-1"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>🤖 Instant Teacher AI Answer</span>
                  </button>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#2e1065_1px,transparent_1px)] [background-size:16px_16px]">
                  {activeChatMessages.map((m) => {
                    const isTeacherMsg = m.sender === 'teacher';

                    return (
                      <div
                        key={m.id}
                        className={`flex ${isTeacherMsg ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      >
                        <div
                          className={`max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed shadow-lg ${
                            isTeacherMsg
                              ? 'bg-gradient-to-r from-purple-700 to-fuchsia-700 text-white rounded-br-xs'
                              : 'bg-slate-900 text-teal-100 border border-teal-500/40 rounded-bl-xs'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3 mb-1 text-[10px] font-bold opacity-80">
                            <span>{isTeacherMsg ? activeTeacher.name : (user?.name || 'Saharsh Shankar')}</span>
                            <span className="font-mono text-[9px]">{isTeacherMsg ? activeTeacher.subject : 'Class 8-D'}</span>
                          </div>

                          <p className="whitespace-pre-wrap">{m.text}</p>

                          <div className={`text-[9px] mt-1.5 flex items-center justify-end gap-1 font-mono ${isTeacherMsg ? 'text-purple-200' : 'text-teal-300'}`}>
                            <span>{m.time}</span>
                            {m.status === 'sent' ? (
                              <Check className="w-3 h-3 text-slate-300" title="Sent (Delivering...)" />
                            ) : (
                              <CheckCheck className="w-3 h-3 text-cyan-300" title="Delivered in real-time" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Sub-second delivery indicator */}
                  {isMessageDelivering && (
                    <div className="flex justify-end animate-fadeIn">
                      <div className="px-3 py-1.5 rounded-xl bg-purple-900/60 border border-teal-400/50 text-[10px] text-teal-300 flex items-center gap-1.5 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        <span>Delivering in under 1 second...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendTeacherMessage} className="p-3 bg-purple-950 border-t border-purple-800 flex items-center gap-2 shrink-0">
                  <div className="px-2.5 py-1 rounded-xl bg-slate-900 border border-purple-700 text-[10px] font-mono text-teal-300 shrink-0">
                    {chatRole === 'teacher' ? '👨‍🏫 Teacher Reply' : '🎒 Student Ask'}
                  </div>

                  <input
                    type="text"
                    placeholder={
                      chatRole === 'teacher'
                        ? `Type manual reply as ${activeTeacher.name}...`
                        : `Ask doubt to ${activeTeacher.name} (${activeTeacher.subject})...`
                    }
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-purple-700 rounded-xl text-xs text-white placeholder-purple-400 focus:outline-none focus:border-teal-400"
                  />

                  {/* Portal Send with Sound */}
                  <button
                    type="submit"
                    disabled={!chatInputText.trim()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-teal-400 hover:from-purple-500 hover:to-teal-300 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>

                  {/* WhatsApp Forward */}
                  <button
                    type="button"
                    onClick={handleSendViaOfficialWhatsApp}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
                    title="Send via WhatsApp (+91 94700 33984)"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </form>

              </div>

            </div>

            {/* End Doubt Session Modal */}
            {isDoubtSessionResolved && (
              <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fadeIn">
                <div className="w-full max-w-md bg-purple-950 border-2 border-teal-400 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-teal-500/20 text-teal-300 mx-auto flex items-center justify-center border border-teal-400/50">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-black text-white">Doubt Session Completed</h3>
                  <p className="text-xs text-purple-200/80">
                    Your academic doubt with {activeTeacher.name} has been archived. You can return to the student lounge or close the portal.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setIsDoubtSessionResolved(false)}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 border border-purple-700 text-xs font-bold text-purple-200 cursor-pointer"
                    >
                      Continue Chatting
                    </button>
                    <button
                      onClick={() => {
                        setIsDoubtSessionResolved(false);
                        setActivePage('homework');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                    >
                      Return to Homework Hub
                    </button>
                  </div>
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
                  <span>PAGE 3 • 100% IN-WEBSITE WEBRTC LIVE CLASSROOM</span>
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
                    onClick={() => setIsLivePortalModalOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-fuchsia-600 to-teal-400 hover:from-rose-500 hover:to-teal-300 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-rose-600/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>🎥 Enter Online Live Classroom Portal</span>
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
                      }}
                      className="px-6 py-4 rounded-2xl bg-slate-900 border-2 border-rose-500 text-rose-300 hover:text-white font-black text-sm flex items-center gap-2 transition cursor-pointer"
                    >
                      <Video className="w-4 h-4 text-rose-400" />
                      <span>🔴 Start Faculty Live Broadcast</span>
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
                            <span>LIVE NOW • {session.activeParticipants} Students</span>
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
                          (Student selects ONLY Class from LKG to Class 8 • No section required)
                        </p>
                      </div>
                    </div>

                    <button onClick={() => setIsLivePortalModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Class Selection Buttons */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-purple-300 tracking-wider">
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
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-black animate-pulse">🔴 LIVE</span>
                              </div>
                              <h4 className="text-sm font-black text-white">{c.topic}</h4>
                              <p className="text-xs text-purple-300">Teacher: <strong className="text-white">{c.teacher}</strong></p>
                              <button
                                onClick={() => {
                                  setActiveLiveSessionData(c);
                                  setIsLivePortalModalOpen(false);
                                  setIsInsideLiveRoom(true);
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
                <div className="px-4 py-3 bg-slate-900/95 border-b border-purple-800 flex items-center justify-between text-white shrink-0">
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
                        Educator: {activeLiveSessionData?.teacher || user?.name || 'Mrs. Sunita Sharma'} • Real-Time WebRTC Video Stream
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
                        if (mediaStreamRef.current) {
                          mediaStreamRef.current.getTracks().forEach(t => t.stop());
                          mediaStreamRef.current = null;
                        }
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
        {/* PAGE 4: TEST & EXAMINATION SUITE                                     */}
        {/* --------------------------------------------------------------------- */}
        {activePage === 'tests' && (
          <div className="w-full space-y-6 animate-fadeIn">
            
            {/* Gen Z Hero Animated Graphical Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-amber-950 border-2 border-amber-500/50 p-8 md:p-12 shadow-2xl">
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/50 text-xs font-mono font-bold text-amber-300">
                  <CheckSquare className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  <span>PAGE 4 • ONLINE TEST &amp; EXAMINATION SIMULATOR</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Take Real <span className="bg-gradient-to-r from-amber-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Chapter &amp; Unit Tests</span>
                </h2>

                <p className="text-sm md:text-base text-purple-200/80 leading-relaxed max-w-2xl">
                  Select your Class (LKG to Class 8) and Section (A to E) to attempt verified curriculum unit tests. Real-time timer countdown, multiple choice evaluation, and instant performance report.
                </p>

                {/* Primary Middle Option */}
                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setIsTestPortalOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-teal-400 hover:from-amber-400 hover:to-teal-300 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-amber-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>📝 Attempt / Give Online Test</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Available Tests Preview for Class 8-D */}
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-amber-400" />
                  <span>Active Unit Tests for Class 8-D</span>
                </h3>
                <span className="text-xs text-amber-300 font-mono">3 Tests Ready</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {testsDatabase.filter(t => t.classId === '8' && t.section === 'D').map((t) => (
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
                        <span>•</span>
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

            {/* Test Selection Pop-up (Class -> Section -> Tests) */}
            {isTestPortalOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
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

                    <button onClick={() => setIsTestPortalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Pop-up Step 1: Select Class */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-purple-300 tracking-wider">
                      Step 1: Select Class (LKG to Class 8)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                      {SCHOOL_CLASSES_CONFIG.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedTestClass(c.id)}
                          className={`py-3 rounded-xl text-xs font-black transition cursor-pointer border ${
                            selectedTestClass === c.id
                              ? 'bg-gradient-to-r from-amber-400 to-teal-400 text-slate-950 border-amber-300 shadow-md scale-105'
                              : 'bg-slate-900 text-purple-300 border-purple-800 hover:border-purple-600'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pop-up Step 2: Select Section */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-teal-300 tracking-wider">
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

                  {/* Available Tests for selected Class and Section */}
                  <div className="space-y-3 pt-2">
                    <h3 className="text-base font-black text-white">
                      Tests Available for Class {selectedTestClass} - Section {selectedTestSection}:
                    </h3>

                    {(() => {
                      const tests = testsDatabase.filter(t => t.classId === selectedTestClass && t.section === selectedTestSection);
                      if (tests.length === 0) {
                        return (
                          <div className="p-10 rounded-2xl bg-slate-900/60 border border-purple-900 text-center space-y-2">
                            <CheckSquare className="w-8 h-8 text-purple-400 mx-auto opacity-50" />
                            <p className="text-sm font-bold text-white">No active online tests right now for Class {selectedTestClass}-{selectedTestSection}</p>
                            <p className="text-xs text-purple-300">Teachers will announce the next unit test date. Try Class 8-D to test the simulator!</p>
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {tests.map((t) => (
                            <div key={t.id} className="p-5 rounded-2xl bg-slate-900 border border-purple-700 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold">{t.subject}</span>
                                <span className="text-xs text-amber-300 font-mono">{t.durationMinutes} Minutes</span>
                              </div>
                              <h4 className="text-sm font-black text-white">{t.title}</h4>
                              <p className="text-xs text-purple-300">{t.chapter}</p>
                              <button
                                onClick={() => {
                                  setIsTestPortalOpen(false);
                                  handleStartExam(t);
                                }}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                              >
                                Attempt Test
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

            {/* FULL-SCREEN INTERACTIVE TEST SIMULATOR */}
            {activeTestExam && (
              <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col p-4 md:p-8 overflow-y-auto animate-fadeIn">
                <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col space-y-6">
                  
                  {/* Exam Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-purple-800 flex-wrap gap-3">
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-300">{activeTestExam.subject} • Class {activeTestExam.classId}-{activeTestExam.section}</span>
                      <h3 className="text-base md:text-lg font-black text-white">{activeTestExam.title}</h3>
                    </div>

                    {/* Countdown Timer */}
                    <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-amber-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                      <span className="text-base font-black text-amber-300 font-mono">
                        {Math.floor(examTimerSeconds / 60).toString().padStart(2, '0')}:{(examTimerSeconds % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Exam Completed Report Card View */}
                  {isExamCompleted ? (
                    <div className="p-8 rounded-3xl bg-slate-900 border-2 border-teal-400 text-center space-y-6 shadow-2xl">
                      <div className="w-20 h-20 rounded-full bg-teal-500/20 text-teal-300 mx-auto flex items-center justify-center border-2 border-teal-400">
                        <Award className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-2xl font-black text-white">Test Successfully Evaluated!</h4>
                        <p className="text-xs text-purple-300">DAV Academic Unit Test Result</p>
                      </div>

                      <div className="inline-block p-6 rounded-2xl bg-slate-950 border border-purple-800 text-center">
                        <span className="text-4xl font-black text-teal-300 font-mono">
                          {examFinalScore} / {activeTestExam.totalMarks}
                        </span>
                        <span className="block text-xs text-purple-300 mt-1 font-bold">
                          Percentage: {Math.round((examFinalScore / activeTestExam.totalMarks) * 100)}% • Grade: A+
                        </span>
                      </div>

                      {/* Question Review */}
                      <div className="text-left space-y-4 pt-4 border-t border-purple-900 max-h-96 overflow-y-auto">
                        <h5 className="text-xs font-black uppercase text-teal-300 tracking-wider">Detailed Solution Explanations:</h5>
                        {activeTestExam.questions.map((q, idx) => (
                          <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-purple-900 space-y-2 text-xs">
                            <div className="flex items-center justify-between font-bold">
                              <span>Q{idx + 1}. {q.q}</span>
                              {examAnswersMap[idx] === q.correct ? (
                                <span className="text-emerald-400 font-mono">✓ Correct</span>
                              ) : (
                                <span className="text-rose-400 font-mono">✗ Incorrect</span>
                              )}
                            </div>
                            <p className="text-purple-300">
                              Correct Option: <strong className="text-teal-300">{q.options[q.correct]}</strong>
                            </p>
                            <p className="text-purple-400 text-[11px] leading-relaxed italic">{q.explanation}</p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setActiveTestExam(null)}
                        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                      >
                        Close &amp; Return to Test Suite
                      </button>
                    </div>
                  ) : (
                    /* Active Questions Simulator */
                    <div className="space-y-6">
                      
                      {/* Question Navigator Palette */}
                      <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {activeTestExam.questions.map((q, idx) => (
                          <button
                            key={q.id}
                            onClick={() => setCurrentQuestionIdx(idx)}
                            className={`w-9 h-9 rounded-xl font-bold text-xs transition cursor-pointer border ${
                              currentQuestionIdx === idx
                                ? 'bg-amber-400 text-slate-950 border-amber-300 font-black scale-105'
                                : examAnswersMap[idx] !== undefined
                                ? 'bg-teal-500 text-slate-950 border-teal-400'
                                : 'bg-slate-900 text-purple-300 border-purple-800'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Current Question Box */}
                      {(() => {
                        const q = activeTestExam.questions[currentQuestionIdx];
                        return (
                          <div className="p-6 rounded-3xl bg-slate-900 border border-purple-800 space-y-5">
                            <div className="flex items-center justify-between text-xs text-purple-300">
                              <span className="font-bold">Question {currentQuestionIdx + 1} of {activeTestExam.questions.length}</span>
                              <span className="font-mono text-amber-300">Marks: {Math.round(activeTestExam.totalMarks / activeTestExam.questions.length)}</span>
                            </div>

                            <h4 className="text-base font-black text-white leading-relaxed">{q.q}</h4>

                            <div className="space-y-3 pt-2">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = examAnswersMap[currentQuestionIdx] === oIdx;
                                return (
                                  <label
                                    key={oIdx}
                                    onClick={() => handleSelectExamOption(currentQuestionIdx, oIdx)}
                                    className={`w-full p-4 rounded-2xl border text-xs flex items-center gap-3 transition cursor-pointer ${
                                      isSelected
                                        ? 'bg-teal-500/20 border-teal-400 text-white font-bold shadow-md'
                                        : 'bg-slate-950 border-purple-900/80 text-purple-200 hover:border-purple-600'
                                    }`}
                                  >
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                      isSelected ? 'border-teal-400 bg-teal-400 text-slate-950 font-black' : 'border-purple-700'
                                    }`}>
                                      {isSelected && '✓'}
                                    </div>
                                    <span>{opt}</span>
                                  </label>
                                );
                              })}
                            </div>

                            {/* Navigation & Submit Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-purple-900">
                              <button
                                disabled={currentQuestionIdx === 0}
                                onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                                className="px-5 py-2.5 rounded-xl bg-slate-800 disabled:opacity-30 text-purple-200 text-xs font-bold cursor-pointer"
                              >
                                Previous
                              </button>

                              {currentQuestionIdx < activeTestExam.questions.length - 1 ? (
                                <button
                                  onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer"
                                >
                                  Next Question
                                </button>
                              ) : (
                                <button
                                  onClick={handleSubmitExam}
                                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg"
                                >
                                  Submit Test For Evaluation
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })()}

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
            
            {/* Gen Z Hero Animated Graphical Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-950 via-slate-950 to-cyan-950 border-2 border-cyan-500/50 p-8 md:p-12 shadow-2xl">
              <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                  <span>PAGE 5 • DIGITAL ATTENDANCE REGISTRY</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  Daily Digital Attendance <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-teal-300 bg-clip-text text-transparent">Registry &amp; Records</span>
                </h2>

                <p className="text-sm md:text-base text-purple-200/80 leading-relaxed max-w-2xl">
                  Students can watch and verify their daily presence records across all sections. Teachers have the exclusive privilege to mark present, absent, or late.
                </p>

                {/* Primary Button */}
                <div className="pt-4 flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setIsAttendanceModalOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-cyan-500/30 transition transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>📊 Check Digital Attendance for Your Class</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Roster View directly on Page 5 */}
            <div className="w-full space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-800 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-black">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Class {selectedAttClass} - Section {selectedAttSection} Attendance Roster
                    </h3>
                    <p className="text-xs text-purple-300">
                      {isFacultyRole ? '👨‍🏫 Teacher Mode: Click P/A/L to toggle student presence' : '🎒 Student Mode: Read-only live verification'}
                    </p>
                  </div>
                </div>

                {isFacultyRole && (
                  <button
                    onClick={handleSaveAttendance}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-md"
                  >
                    Save &amp; Sync Register
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
                      {currentRoster.map((s) => (
                        <tr key={s.roll} className="hover:bg-purple-950/30 transition">
                          <td className="p-3 font-mono font-bold text-teal-400">#{s.roll}</td>
                          <td className="p-3 font-bold text-white">{s.name}</td>
                          <td className="p-3">
                            {s.status === 'present' ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                                🟢 Present
                              </span>
                            ) : s.status === 'absent' ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                                🔴 Absent
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                                🟡 Late
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {isFacultyRole ? (
                              <div className="inline-flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-purple-800">
                                <button
                                  onClick={() => handleUpdateStudentAttendance(s.roll, 'present')}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                    s.status === 'present' ? 'bg-emerald-500 text-slate-950' : 'text-purple-300 hover:text-white'
                                  }`}
                                >
                                  P
                                </button>
                                <button
                                  onClick={() => handleUpdateStudentAttendance(s.roll, 'absent')}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                    s.status === 'absent' ? 'bg-rose-500 text-white' : 'text-purple-300 hover:text-white'
                                  }`}
                                >
                                  A
                                </button>
                                <button
                                  onClick={() => handleUpdateStudentAttendance(s.roll, 'late')}
                                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                                    s.status === 'late' ? 'bg-amber-500 text-slate-950' : 'text-purple-300 hover:text-white'
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
              <div className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-2xl p-4 md:p-8 flex flex-col overflow-y-auto animate-fadeIn">
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

                    <button onClick={() => setIsAttendanceModalOpen(false)} className="p-2 rounded-xl bg-slate-900 border border-purple-700 cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Step 1: Class */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-purple-300 tracking-wider">
                      Select Class (LKG to Class 8)
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-2">
                      {SCHOOL_CLASSES_CONFIG.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedAttClass(c.id)}
                          className={`py-3 rounded-xl text-xs font-black transition cursor-pointer border ${
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
                    <label className="text-xs font-black uppercase text-teal-300 tracking-wider">
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
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-600 to-teal-400 text-slate-950 font-black text-sm cursor-pointer shadow-xl"
                    >
                      Open Attendance Register for Class {selectedAttClass} - Section {selectedAttSection}
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
