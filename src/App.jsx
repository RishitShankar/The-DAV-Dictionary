import { MasterHubBottomNav } from './components/MasterHubBottomNav';
import { detectPlatformDimensions } from './utils/dimensionHelper';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { PublicHomepage } from './components/PublicHomepage';
import { BlackboardLogin } from './components/BlackboardLogin';
import { Navbar } from './components/Navbar';
import { GeminiSidebar } from './components/GeminiSidebar';
import { Hero } from './components/Hero';
import { BookLibrary } from './components/BookLibrary';
import { UntitledSection } from './components/UntitledSection';
import { StudentProfileSection } from './components/StudentProfileSection';
import { RishiAI } from './components/RishiAI';
import { PricingModal } from './components/PricingModal';
import { CinematicFlameVfx } from './components/vfx/CinematicFlameVfx';
import { VfxSolarSystemGalaxy } from './components/vfx/VfxSolarSystemGalaxy';
import { VfxCycloneVortex } from './components/vfx/VfxCycloneVortex';
import { VfxGlobalSuite } from './components/VfxGlobalSuite';
import { VfxMasterDirector } from './components/vfx/VfxMasterDirector';
import { SettingsHubSection, applyPortalTheme } from './components/SettingsHubSection';
import { ParentPortalSection } from './components/ParentPortalSection';
import { DeveloperIdGeneratorSection } from './components/DeveloperIdGeneratorSection';
import { AuthModal } from './components/AuthModal';
import { SectionOverview } from './components/SectionOverview';
import { QuestionsAnswersSection } from './components/QuestionsAnswersSection';
import { PurpleFooter } from './components/PurpleFooter';
import { SectionErrorBoundary } from './components/SectionErrorBoundary';
import { 
  Award, Heart, Lock, Sparkles, ArrowRight, Smartphone, Monitor, 
  Home, BookOpen, Layers, User as UserIcon, ClipboardList, 
  MessageSquareMore, Video, CheckSquare, UserCheck 
} from 'lucide-react';
import { BlackDogLogo } from './components/BlackDogLogo';
import { registerDeviceSession, releaseDeviceSession, startDeviceGuard, getDeviceMetadata } from './services/deviceAuthManager';
import { ShieldAlert } from 'lucide-react';
import { getSupabaseClient } from './services/supabaseClient';
import { findUserByGoogleEmail, createStudentWithGoogle } from './services/googleAuthService';
import { safeSetUser, safeSetItem, validateUserIntegrity } from './utils/safeStorage';


// Code-split heavy modules (Bug 3)
const TeachersSection = lazy(() => import('./components/TeachersSection').then(m => ({ default: m.TeachersSection })));
const ChapterExplanationsSection = lazy(() => import('./components/ChapterExplanationsSection').then(m => ({ default: m.ChapterExplanationsSection })));
const KidsFunNavigatorSection = lazy(() => import('./components/KidsFunNavigatorSection').then(m => ({ default: m.KidsFunNavigatorSection })));
const ExamPracticeSection = lazy(() => import('./components/ExamPracticeSection').then(m => ({ default: m.ExamPracticeSection })));
import { NewUserOnboardingGuide, SectionFirstVisitCoachmark } from './components/NewUserOnboardingGuide';
const StudyLeaderboardSection = lazy(() => import('./components/StudyLeaderboardSection').then(m => ({ default: m.StudyLeaderboardSection })));
const DonationSection = lazy(() => import('./components/DonationSection').then(m => ({ default: m.DonationSection })));
const AboutCreatorSection = lazy(() => import('./components/AboutCreatorSection').then(m => ({ default: m.AboutCreatorSection })));
const DeveloperReviewsSection = lazy(() => import('./components/DeveloperReviewsSection').then(m => ({ default: m.DeveloperReviewsSection })));
const AdminPanelModal = lazy(() => import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal })));
const PdfReaderModal = lazy(() => import('./components/PdfReaderModal').then(m => ({ default: m.PdfReaderModal })));
const CustomPurchaseModal = lazy(() => import('./components/CustomPurchaseModal').then(m => ({ default: m.CustomPurchaseModal })));
const UploadPdfModal = lazy(() => import('./components/UploadPdfModal').then(m => ({ default: m.UploadPdfModal })));

function SectionLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center animate-pulse">
      <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
      <p className="text-stone-400 font-bold text-sm tracking-wide">Loading DAV Academic Module...</p>
    </div>
  );
}

export function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));

  // Multi-Tab Desynchronization Synchronization (Bug 11)
  useEffect(() => {
    const handleStorageSync = (e) => {
      if (e.key === 'dav_user') {
        if (!e.newValue) {
          setUser(null);
          setViewMode('home');
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            if (parsed && parsed.id && parsed.id !== 'guest_student') {
              setUser(validateUserIntegrity(parsed));
              setViewMode('app');
            }
          } catch (err) {}
        }
      }
    };
    window.addEventListener('storage', handleStorageSync);
    return () => window.removeEventListener('storage', handleStorageSync);
  }, []);

  // Offline State Tracking (Bug 12)
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  const [isCycloneOpen, setIsCycloneOpen] = useState(false);
  const [flameVfx, setFlameVfx] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    onComplete: null
  });

  const trigger5sFlameVfx = (title, subtitle, onComplete = null) => {
    setFlameVfx({
      isOpen: true,
      title: title || 'Opening Digital Textbook Vault',
      subtitle: subtitle || 'DAV School Academic Curriculum • Classes 1 to 8',
      onComplete
    });
  };

  useEffect(() => {
    const handleGlobalFlame = (e) => {
      trigger5sFlameVfx(e?.detail?.title, e?.detail?.subtitle, e?.detail?.onComplete);
    };
    window.addEventListener('dav_trigger_flame_vfx', handleGlobalFlame);
    return () => window.removeEventListener('dav_trigger_flame_vfx', handleGlobalFlame);
  }, []);
  const [isCinematicOpen, setIsCinematicOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Platform Dimensions & Viewport Switcher (Ultra Super Dimension 1: PC vs Ultra Super Dimension 2: Mobile)
  const [platformDim, setPlatformDim] = useState(() => detectPlatformDimensions());
  const [deviceDimension, setDeviceDimension] = useState(() => {
    const dim = detectPlatformDimensions();
    return dim.isMobile ? 'mobile' : 'pc';
  });

  useEffect(() => {
    const handleAutoDetect = () => {
      const dim = detectPlatformDimensions();
      setPlatformDim(dim);
      setDeviceDimension(dim.isMobile ? 'mobile' : 'pc');
    };
    window.addEventListener('resize', handleAutoDetect);
    window.addEventListener('orientationchange', handleAutoDetect);
    return () => {
      window.removeEventListener('resize', handleAutoDetect);
      window.removeEventListener('orientationchange', handleAutoDetect);
    };
  }, []);

  // View mode: 'home' (Public Homepage) | 'login' (Blackboard Login Gatekeeper) | 'app' (Main Portal)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_user');
      if (saved) {
        const parsed = validateUserIntegrity(JSON.parse(saved));
        if (parsed && !parsed.isDemo && parsed.id !== 'guest_student') return parsed;
      }
    } catch (e) {}
    return null;
  });

  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_user');
      if (saved) {
        const parsed = validateUserIntegrity(JSON.parse(saved));
        if (parsed && !parsed.isDemo && parsed.id !== 'guest_student') return 'app';
      }
    } catch (e) {}
    return 'home';
  });

  // Auto-lock Dimension 7 (Bus Driver) to Section 7 (Track Bus)
  useEffect(() => {
    if (user?.dimension === 7 || user?.plan === 'bus_driver') {
      setActiveSection(7);
    }
  }, [user]);

    // Auto-lock Dimension 8 (Parent) to Parent Portal
  useEffect(() => {
    if (user?.dimension === 8 || user?.plan === 'parent' || user?.role === 'parent') {
      setActiveSection('parent');
    }
  }, [user]);

  // Castle App-Inspired 12-Hour Ad-Watch Pass Resolver
  // Section Background Animation Map (Configured exclusively via Settings -> Animation Studio)
  const [sectionVfxMap, setSectionVfxMap] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_section_vfx_map');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { 2: 'solar_system' };
  });

  const [themeMode, setThemeMode] = useState(() => {
    try {
      return localStorage.getItem('dav_theme_mode') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const [textColor, setTextColor] = useState(() => {
    try {
      return localStorage.getItem('dav_text_color') || 'amber';
    } catch (e) {
      return 'amber';
    }
  });

  useEffect(() => {
    applyPortalTheme(textColor, themeMode);

    const handleThemeChange = (e) => {
      if (e?.detail) {
        if (e.detail.theme) setThemeMode(e.detail.theme);
        if (e.detail.color) setTextColor(e.detail.color);
      }
    };
    window.addEventListener('dav_theme_changed', handleThemeChange);
    return () => window.removeEventListener('dav_theme_changed', handleThemeChange);
  }, []);

  useEffect(() => {
    const handleVfxUpdate = (e) => {
      if (e.detail) setSectionVfxMap(e.detail);
    };
    window.addEventListener('dav_vfx_map_updated', handleVfxUpdate);
    return () => window.removeEventListener('dav_vfx_map_updated', handleVfxUpdate);
  }, []);

  const [adPassUpdated, setAdPassUpdated] = useState(0);

  useEffect(() => {
    const handleTierUpgraded = () => setAdPassUpdated(prev => prev + 1);
    window.addEventListener('dav_tier_upgraded', handleTierUpgraded);
    return () => window.removeEventListener('dav_tier_upgraded', handleTierUpgraded);
  }, []);

  const activeUser = React.useMemo(() => {
    if (!user) return null;
    const isMaster = user.id === 'rishibhai' || user.dimension === 4 || user.role === 'developer';
    if (isMaster) return user;

    try {
      const savedPass = localStorage.getItem('dav_ad_unlocked_tier');
      if (savedPass) {
        const parsed = JSON.parse(savedPass);
        if (parsed?.expiresAt && Date.now() < parsed.expiresAt) {
          const dimNumber = parsed.tier === 'vvip' ? 4 : parsed.tier === 'vip' ? 3 : 2;
          return {
            ...user,
            plan: parsed.tier,
            dimension: dimNumber,
            dimensionName: parsed.name || (dimNumber === 4 ? 'Double VIP (12h Pass)' : dimNumber === 3 ? 'VIP (12h Pass)' : 'Normal (12h Pass)'),
            isPaid: true
          };
        }
      }
    } catch (e) {}
    return user;
  }, [user, adPassUpdated]);

  const isTeacher = Boolean(
    user?.dimension === 6 ||
    user?.dimension === 5 ||
    user?.plan === 'teacher' ||
    user?.isTeacher ||
    (user?.role && user?.role.toLowerCase().includes('teacher')) ||
    (user?.dimensionName && user?.dimensionName.toLowerCase().includes('faculty'))
  );

  // Sub-Dimensions for Dimension 5 (Teachers):
  // 'teacher_only' = Sub-Dimension 5A: Only Teacher (Faculty OS)
  // 'teacher_explorer' = Sub-Dimension 5B: Teacher & Explorer (Full Campus 1-10 + Section 5 Faculty Master OS)
  const [teacherSubDimension, setTeacherSubDimension] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_teacher_sub_dim');
      if (saved === 'teacher_only' || saved === 'teacher_explorer') return saved;
    } catch (e) {}
    return 'teacher_explorer'; // Default to Explorer so teacher has all 10 sections + Section 5
  });

  const handleToggleTeacherSubDimension = (mode) => {
    setTeacherSubDimension(mode);
    try {
      localStorage.setItem('dav_teacher_sub_dim', mode);
    } catch (e) {}
    if (mode === 'teacher_only') {
      setActiveSection(5);
    }
  };

  const [teacherSubSection, setTeacherSubSection] = useState('homework');

  const [uploadedPdfs, setUploadedPdfs] = useState(() => {
    const saved = localStorage.getItem('dav_uploaded_pdfs');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {}
    }
    return [];
  });

  // Modals state
  const [isAdminProgramOpen, setIsAdminProgramOpen] = useState(false);
  const [showNewUserGuide, setShowNewUserGuide] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.id !== 'guest_student') {
          return localStorage.getItem('dav_new_user_guide_pending_' + parsed.id) === 'true';
        }
      }
    } catch (e) {}
    return false;
  });

  useEffect(() => {
    const handleLaunchGuide = () => setShowNewUserGuide(true);
    window.addEventListener('dav_launch_onboarding_guide', handleLaunchGuide);
    return () => window.removeEventListener('dav_launch_onboarding_guide', handleLaunchGuide);
  }, []);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isPdfReaderOpen, setIsPdfReaderOpen] = useState(false);
  const [readerBook, setReaderBook] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [lockedFeatureModal, setLockedFeatureModal] = useState(null);
  const [remoteLogoutNotice, setRemoteLogoutNotice] = useState(null);

  useEffect(() => {
    safeSetUser(user);
  }, [user]);

  useEffect(() => {
    safeSetItem('dav_uploaded_pdfs', JSON.stringify(uploadedPdfs));
  }, [uploadedPdfs]);

  // Real-time Single Device Session Guard: Listen for remote logout or login on another device
  useEffect(() => {
    if (!user || !user.id || user.id === 'guest_student') return;

    // Refresh device session on mount
    registerDeviceSession(user).catch(() => {});

    const unsubscribeGuard = startDeviceGuard(user, (event) => {
      // User was logged out because another device logged in or remote logout occurred
      setUser(null);
      setViewMode('home');
      try { localStorage.removeItem('dav_user'); } catch (e) {}
      setRemoteLogoutNotice(event);
    });

    return () => {
      if (unsubscribeGuard) unsubscribeGuard();
    };
  }, [user?.id]);

  // Real-time listener for Administrator verification of student subscription purchases
  useEffect(() => {
    const handlePlanUpdate = (e) => {
      if (e?.detail) {
        setUser(e.detail);
      }
    };
    const handleUserUpdate = (e) => {
      if (e?.detail) {
        setUser(prev => {
          const updated = { ...(prev || {}), ...e.detail };
          safeSetUser(updated);
          return updated;
        });
      }
    };
    const handlePhotoUpdate = (e) => {
      if (e?.detail?.photoUrl) {
        const photo = e.detail.photoUrl;
        setUser(prev => {
          if (!prev) return prev;
          const updated = { ...prev, dp: photo, avatar: photo, photoUrl: photo };
          safeSetUser(updated);
          return updated;
        });
      }
    };

    window.addEventListener('dav_user_plan_updated', handlePlanUpdate);
    window.addEventListener('dav_user_updated', handleUserUpdate);
    window.addEventListener('dav_profile_photo_updated', handlePhotoUpdate);
    return () => {
      window.removeEventListener('dav_user_plan_updated', handlePlanUpdate);
      window.removeEventListener('dav_user_updated', handleUserUpdate);
      window.removeEventListener('dav_profile_photo_updated', handlePhotoUpdate);
    };
  }, [user]);

  const handleLoginSuccess = async (loggedInUser) => {
    try {
      await registerDeviceSession(loggedInUser);
    } catch (e) {}
    try {
      localStorage.setItem('dav_user', JSON.stringify(loggedInUser));
    } catch (e) {}
    setUser(loggedInUser);
    setViewMode('app');
    const userIsTeacher = Boolean(
      loggedInUser?.dimension === 5 ||
      loggedInUser?.plan === 'teacher' ||
      loggedInUser?.isTeacher ||
      (loggedInUser?.role && loggedInUser?.role.toLowerCase().includes('teacher')) ||
      (loggedInUser?.dimensionName && loggedInUser?.dimensionName.toLowerCase().includes('faculty'))
    );
    if (userIsTeacher) {
      setActiveSection(5);
    }
        const userIsBusDriver = Boolean(
      loggedInUser?.dimension === 7 ||
      loggedInUser?.plan === 'bus_driver' ||
      loggedInUser?.isDriver ||
      (loggedInUser?.dimensionName && loggedInUser?.dimensionName.toLowerCase().includes('driver'))
    );
    if (userIsBusDriver) {
      setActiveSection(7);
    }
    const userIsParent = Boolean(
      loggedInUser?.dimension === 8 ||
      loggedInUser?.plan === 'parent' ||
      loggedInUser?.role === 'parent' ||
      (loggedInUser?.dimensionName && loggedInUser?.dimensionName.toLowerCase().includes('parent'))
    );
    if (userIsParent) {
      setActiveSection('parent');
    }
    try {
      const guidePending = localStorage.getItem('dav_new_user_guide_pending_' + loggedInUser.id) === 'true';
      const guideCompleted = localStorage.getItem('dav_user_guide_completed_' + loggedInUser.id) === 'true';
      if (loggedInUser?.isNewlyRegistered || guidePending || !guideCompleted) {
        setShowNewUserGuide(true);
      }
    } catch (e) {}
  };

  // Automatic Google OAuth redirect detection & account resolver (ONLY on explicit OAuth callback)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isOAuthRedirect = 
      window.location.hash.includes('access_token=') || 
      window.location.search.includes('code=') ||
      window.location.hash.includes('type=recovery');

    // Do NOT auto-login unless returning from explicit Google OAuth redirect
    if (!isOAuthRedirect) return;

    const client = getSupabaseClient();
    if (!client) return;

    client.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user?.email && !user) {
        const email = session.user.email;
        const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || email.split('@')[0];
        const avatar = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null;
        
        let matched = await findUserByGoogleEmail(email);
        if (!matched) {
          const res = await createStudentWithGoogle({ name, email, avatar });
          matched = res.user;
        }
        if (matched) {
          try {
            if (window.history && window.history.replaceState) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          } catch (e) {}
          handleLoginSuccess(matched);
        }
      }
    }).catch(() => {});
  }, []);

  const handleSelectSection = (secId) => {
    // Dimension 7 (Bus Driver) is strictly locked to Track Bus (Section 7)
    if (user?.dimension === 7 || user?.plan === 'bus_driver') {
      if (secId !== 7) {
        alert('Bus Driver Account Notice: Dimension 7 accounts have access strictly and exclusively to the Track Bus feature (Section 7).');
        setActiveSection(7);
        return;
      }
    }
    // Sections 12 & 13 are strictly for Developer (Dimension 4) only
    if ((secId === 12 || secId === 13) && !(user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai' || user?.role === 'developer')) {
      return;
    }
    if (isTeacher && teacherSubDimension === 'teacher_only') {
      // In 5A Only Teacher mode, locked to Faculty OS (Section 5)
      setActiveSection(5);
      return;
    }
    // In 5B Teacher & Explorer mode, teacher can explore all sections freely!
    if (secId === 14 && activeSection !== 14) {
      setIsCycloneOpen(true);
      return;
    }
    setActiveSection(secId);
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    if (user?.id) {
      try {
        await releaseDeviceSession(user.id);
      } catch (e) {}
    }
    setUser(null);
    setViewMode('home');
    try {
      localStorage.removeItem('dav_user');
      localStorage.removeItem('dav_active_device_session');
      sessionStorage.clear();
      const client = getSupabaseClient();
      if (client) {
        await client.auth.signOut();
      }
    } catch (e) {}
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '/');
      }
    } catch (e) {}
  };

  // Deep-Linking Router for Google Search & Sitelinks (/login, /books, /live-classes, /question-answers, /faculty-desk)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname.toLowerCase();

    if (path === '/login' || path.startsWith('/login')) {
      setViewMode('login');
    } else if (path === '/books' || path.startsWith('/books')) {
      handleEnterDemoPreview(2);
    } else if (path === '/live-classes' || path.startsWith('/live-classes')) {
      handleEnterDemoPreview(5, 'live_class');
    } else if (path === '/question-answers' || path.startsWith('/question-answers') || path === '/qa') {
      handleEnterDemoPreview(3);
    } else if (path === '/faculty-desk' || path === '/live-chat' || path.startsWith('/faculty-desk')) {
      handleEnterDemoPreview(5, 'doubts_chat');
    }
  }, []);

  const handleOpenAIWithQuestion = (question) => {
    setAiPrompt(question);
    setIsAIOpen(true);
  };

  const handleOpenPdfReader = (book) => {
    // Check permission if in guest / demo mode
    if (user?.plan === 'guest' || user?.isDemo) {
      handleRequireLogin(
        'Login to Open Book',
        `You are currently exploring in Free Demo Preview. Please log in or register with your Student ID & Password to open and read the complete textbook: "${book?.title || 'Selected Book'}".`
      );
      return;
    }
    // 5-Second Cinematic Flame VFX while loading PDF
    trigger5sFlameVfx(
      `Opening Official Textbook: ${book?.title || 'DAV Textbook'}`,
      `Rendering Class ${book?.grade || book?.class || '8'} Curriculum • Authentic DAV School Archive`,
      () => {
        setReaderBook(book);
        setIsPdfReaderOpen(true);
      }
    );
  };

  const handleClosePdfReader = () => {
    setIsPdfReaderOpen(false);
    if (typeof document !== 'undefined') {
      try {
        document.body.style.removeProperty('overflow');
        document.documentElement.style.removeProperty('overflow');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.body.style.position = '';
        document.body.style.height = '';
        document.documentElement.style.height = '';
        document.body.classList.remove('overflow-hidden');
      } catch (e) {}
    }
  };

  const handleEnterDemoPreview = (targetSection = 1, targetSubSection = null) => {
    const demoUser = {
      id: 'guest_student',
      name: 'Guest Explorer (Demo)',
      role: 'Demo Preview Student',
      studentId: 'DEMO-PREVIEW',
      classNum: '8',
      section: 'D',
      plan: 'free',
      dimension: 1,
      dimensionName: 'Dimension 1: Free',
      isPaid: false,
      isAdmin: false,
      isDemo: true
    };
    setUser(demoUser);
    setViewMode('app');
    setActiveSection(targetSection || 1);
    if (targetSubSection) {
      setTeacherSubSection(targetSubSection);
    }
  };

  const handleRequireLogin = (title = 'Login to Continue', message = 'You are currently exploring in Free Demo Preview. Please sign in or register with your Student ID & Password to use this feature.') => {
    setLockedFeatureModal({
      title,
      message
    });
  };

  const handleAddPdf = (newPdf) => {
    setUploadedPdfs(prev => [newPdf, ...prev]);
  };

  const handleDeletePdf = (pdfId) => {
    setUploadedPdfs(prev => prev.filter(p => p.id !== pdfId));
  };

  const handleUpgradePlan = (planId) => {
    setUser(prev => prev ? { ...prev, plan: planId } : null);
  };

  // Entry Routing: Show Public Homepage first, then Blackboard on Register/Login
  if (!user) {
    if (viewMode === 'login') {
      return (
        <BlackboardLogin 
          onLoginSuccess={handleLoginSuccess} 
          onBackToHome={() => setViewMode('home')} 
        />
      );
    }
    return (
      <PublicHomepage 
        onGoToLogin={() => setViewMode('login')}
          onOpenCinematic={() => setIsCinematicOpen(true)} 
        onEnterDemoPreview={handleEnterDemoPreview}
      />
    );
  }

  const isGuest = user.plan === 'guest' || user.isDemo;

  return (
    <div className={`min-h-[100dvh] ${activeSection === 4 ? 'h-screen max-h-screen overflow-hidden' : ''} ${themeMode === 'system' ? 'light-theme bg-[#f8fafc] text-slate-900' : 'dark bg-slate-950 text-slate-100'} flex flex-col font-sans selection:bg-amber-300 selection:text-red-950`}>
      {/* Offline Connectivity Notification Banner (Bug 12) */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white text-xs sm:text-sm font-black px-4 py-2.5 text-center shadow-xl flex items-center justify-center gap-2 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          <span>Offline Mode Active: Internet connection lost. Some cloud features may be limited until reconnected.</span>
        </div>
      )}
      
      {/* Guest Mode Floating Notification */}
      {isGuest && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-500 text-stone-950 text-xs py-2 px-4 flex items-center justify-between font-bold shadow-md z-30 sticky top-0 border-b border-amber-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>🚀 Demo Preview Mode Active • Exploring DAV Dictionary • Full Unrestricted Access with Student ID &amp; Password</span>
          </div>
          <button
            onClick={() => {
              setUser(null);
              setViewMode('login');
            }}
            className="py-1 px-3.5 rounded-lg bg-stone-950 text-amber-300 text-[11px] font-black uppercase hover:bg-stone-900 transition cursor-pointer shadow-sm flex items-center gap-1.5"
          >
            <Lock className="w-3 h-3 text-amber-400" />
            <span>Login to Unlock Full Access →</span>
          </button>
        </div>
      )}

      {/* Slide-out Sidebar Drawer */}
      <GeminiSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        user={activeUser || user}
        isTeacher={isTeacher}
        teacherSubDimension={teacherSubDimension}
        onToggleSubDimension={handleToggleTeacherSubDimension}
        teacherSubSection={teacherSubSection}
        onSelectTeacherSubSection={(sub) => {
          setTeacherSubSection(sub);
          setIsSidebarOpen(false);
        }}
        onOpenAdminProgram={() => setIsAdminProgramOpen(true)}
        onLogout={handleLogout}
      />

      {/* Top Navbar with Hamburger Menu & Admin Program Launcher */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        user={activeUser || user}
        isTeacher={isTeacher}
        teacherSubDimension={teacherSubDimension}
        onToggleSubDimension={handleToggleTeacherSubDimension}
        teacherSubSection={teacherSubSection}
        onSelectTeacherSubSection={(sub) => setTeacherSubSection(sub)}
        deviceDimension={deviceDimension}
        onToggleDevice={(dim) => setDeviceDimension(dim)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminProgram={() => setIsAdminProgramOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onLogout={handleLogout}
      />



      {/* Main Content Area */}
      <main className={`flex-1 min-h-0 flex flex-col ${(deviceDimension === 'mobile' || platformDim.isMobile) ? 'pb-24' : ''} ${activeSection === 4 ? 'h-full overflow-hidden' : ''}`}>
        <Suspense fallback={<SectionLoadingFallback />}>
        <SectionErrorBoundary
          key={`section-boundary-${activeSection}`}
          sectionName={`Section ${activeSection}`}
          onGoToOverview={() => setActiveSection(1)}
        >
        {(user?.dimension === 8 || user?.plan === 'parent' || user?.role === 'parent' || activeSection === 'parent') ? (
          <ParentPortalSection 
            user={activeUser || user} 
            onLogout={handleLogout} 
            onSelectSection={handleSelectSection} 
          />
        ) : (isTeacher && teacherSubDimension === 'teacher_only') ? (
          <TeachersSection 
            user={activeUser || user} 
            isTeacherOS={true}
            initialSubSection={teacherSubSection}
            onSubSectionChange={(sub) => setTeacherSubSection(sub)}
            teacherSubDimension={teacherSubDimension}
            onToggleSubDimension={handleToggleTeacherSubDimension}
          />
        ) : activeSection === 1 ? (
          <SectionOverview currentUser={activeUser || user} onSelectSection={handleSelectSection} onOpenPurchaseModal={() => setIsPricingOpen(true)} />
        ) : activeSection === 2 ? (
          <div className={`relative min-h-[100dvh] ${sectionVfxMap[2] && sectionVfxMap[2] !== 'clean_none' ? 'bg-[#030712]/35 backdrop-blur-[1px]' : 'bg-[#030712]'} text-white`}>
            {/* Section 2 Cosmic Solar System Canvas (The Sun, 9 Planets, Rocket, Spaceship, Starfield) */}
            {/* VfxSolarSystemGalaxy removed */}
            <div className="relative z-10">
              <Hero
                onOpenAI={() => {
                  setAiPrompt('');
                  setIsAIOpen(true);
                }}
                onOpenPricing={() => setIsPricingOpen(true)}
                onOpenUpload={() => setIsUploadOpen(true)}
                onOpenCinematic={() => setIsCinematicOpen(true)}
              />
              <BookLibrary
                currentUser={activeUser || user}
                onOpenPdfReader={handleOpenPdfReader}
                onOpenUploadModal={() => setIsUploadOpen(true)}
                onOpenAIWithQuestion={handleOpenAIWithQuestion}
                uploadedPdfs={uploadedPdfs}
                onDeletePdf={handleDeletePdf}
              />
            </div>
          </div>
        ) : activeSection === 3 ? (
          <QuestionsAnswersSection 
            currentUser={activeUser || user} 
            onOpenUpgradeModal={() => setIsPricingOpen(true)}
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 4 ? (
          <RishiAI 
            isSectionView={true} 
            user={activeUser || user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 5 ? (
          <TeachersSection 
            user={activeUser || user} 
            isTeacherOS={isTeacher}
            initialSubSection={teacherSubSection}
            onSubSectionChange={(sub) => setTeacherSubSection(sub)}
            teacherSubDimension={teacherSubDimension}
            onToggleSubDimension={handleToggleTeacherSubDimension}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 6 ? (
          <ChapterExplanationsSection 
            user={activeUser || user} 
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
            onOpenPdfReader={handleOpenPdfReader}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 7 ? (
          <KidsFunNavigatorSection 
            user={activeUser || user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 8 ? (
          <ExamPracticeSection
            currentUser={activeUser || user}
            onRequireLogin={handleRequireLogin}
            onOpenUpgradeModal={() => setIsPricingOpen(true)}
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
          />
        ) : activeSection === 9 ? (
          <StudyLeaderboardSection 
            user={activeUser || user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 10 ? (
          <SettingsHubSection 
            user={activeUser || user} 
            onLogout={handleLogout} 
            onSelectSection={handleSelectSection} 
          />
        ) : activeSection === 11 ? (
          <DonationSection 
            currentUser={activeUser || user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 12 ? (
          (user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai' || user?.role === 'developer') ? (
            <DeveloperReviewsSection 
              currentUser={activeUser || user} 
              onGoToSection={handleSelectSection} 
            />
          ) : (
            <SectionOverview currentUser={activeUser || user} onSelectSection={handleSelectSection} />
          )
        ) : activeSection === 13 ? (
          (user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai' || user?.role === 'developer') ? (
            <DeveloperIdGeneratorSection currentUser={activeUser || user} />
          ) : (
            <SectionOverview currentUser={activeUser || user} onSelectSection={handleSelectSection} />
          )
        ) : activeSection === 14 ? (
          <AboutCreatorSection />
        ) : (
          <UntitledSection sectionNumber={activeSection} />
        )}
        </SectionErrorBoundary>
        </Suspense>
      </main>

      {/* Official Purple Footer displayed on Section 9, 10, 11 & (12 for Dimension 4) */}
      {(activeSection === 10 || activeSection === 11 || activeSection === 14 || ((activeSection === 12 || activeSection === 13) && (user?.dimension === 4 || user?.id === 'rishibhai'))) && (
        <PurpleFooter currentUser={activeUser || user} onSelectSection={(secId) => setActiveSection(secId)} />
      )}

      {/* Section First Visit Coachmark */}
      <SectionFirstVisitCoachmark sectionNumber={activeSection} userId={user?.id} />

      {/* New User Onboarding Guide */}
      {showNewUserGuide && (
        <NewUserOnboardingGuide
          currentUser={activeUser || user}
          onClose={() => setShowNewUserGuide(false)}
          onSelectHub={(hubId) => {}}
        />
      )}

      {/* Modals */}
      <Suspense fallback={null}>
      <AdminPanelModal
        isOpen={isAdminProgramOpen}
        onClose={() => setIsAdminProgramOpen(false)}
        currentUser={activeUser || user}
      />

      {/* Rishi AI Engine Component */}
      <RishiAI
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialPrompt={aiPrompt}
        user={activeUser || user}
      />

      <PdfReaderModal
        isOpen={isPdfReaderOpen}
        onClose={handleClosePdfReader}
        book={readerBook}
        currentUser={activeUser || user}
        onOpenAIWithQuestion={handleOpenAIWithQuestion}
      />

      {/* 11 Curated Section 2-Caliber Background Animations Suite & Studio */}
      <VfxMasterDirector activeSection={activeSection} sectionVfxMap={sectionVfxMap} />

      {/* Global VFX Engine (Click Ripples, Constellation Net, Confetti Cannon) */}
      <VfxGlobalSuite />

      {/* 3-Second Cyclone Vortex VFX for About Creator Profile (Section 14) */}
      <VfxCycloneVortex
        isOpen={isCycloneOpen}
        onComplete={() => {
          setIsCycloneOpen(false);
          setActiveSection(14);
        }}
      />

      {/* 5-Second Cinematic Flame VFX (Section 2 Open, PDF Reader Loading, Custom Upload Save) */}
      <CinematicFlameVfx
        isOpen={flameVfx.isOpen}
        title={flameVfx.title}
        subtitle={flameVfx.subtitle}
        onComplete={() => {
          if (flameVfx.onComplete) flameVfx.onComplete();
          setFlameVfx(prev => ({ ...prev, isOpen: false }));
        }}
      />

      <CustomPurchaseModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        user={activeUser || user}
        onPurchaseSubmitted={() => {
          setIsPricingOpen(false);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={activeUser || user}
        onLogin={(u) => setUser(u)}
        onLogout={handleLogout}
        onGoToSection={(sec) => {
          setActiveSection(sec);
          setIsAuthOpen(false);
        }}
      />

      <UploadPdfModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddPdf={handleAddPdf}
      />
      </Suspense>

      {/* Locked Feature Modal for Free Preview / Demo Mode */}
      {lockedFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 animate-fadeIn">
          <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/50 rounded-3xl max-w-md w-full p-6 text-white text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <Lock className="w-8 h-8 text-amber-400 animate-bounce" />
            </div>

            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40 inline-block mb-2">
              Student Login Required
            </span>

            <h3 className="text-xl font-black text-white mb-2">
              {lockedFeatureModal.title || 'Login to Continue'}
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed mb-6">
              {lockedFeatureModal.message || 'You are currently exploring in Free Demo Preview. Please sign in or register with your Student ID & Password to unlock full access.'}
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setLockedFeatureModal(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-300 transition cursor-pointer border border-stone-700"
              >
                Keep Exploring Demo
              </button>
              <button
                onClick={() => {
                  setLockedFeatureModal(null);
                  setUser(null);
                  setViewMode('login');
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 text-xs font-black uppercase shadow-lg shadow-orange-500/30 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Login Now →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5 Master Hub Bottom Navigation Dock */}
      {(deviceDimension === 'mobile' || platformDim.isMobile) && (
        <MasterHubBottomNav
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />
      )}

      {/* ========================================================================= */}
      {/* REMOTE LOGOUT / SESSION TRANSFERRED NOTIFICATION MODAL                    */}
      {/* ========================================================================= */}
      {remoteLogoutNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-stone-950 border-2 border-rose-500/80 rounded-3xl shadow-2xl p-6 sm:p-7 text-white space-y-5 text-center">
            <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/40 mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                One Man, One Device Security Protocol
              </span>
              <h3 className="text-xl font-black text-white mt-2">
                Session Terminated on This Device
              </h3>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {remoteLogoutNotice.message || 'Your account was logged in from another device. In accordance with DAV Public School’s One Man, One Device policy, only one active session is permitted at a time.'}
            </p>

            {remoteLogoutNotice.conflictDevice && (
              <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-left">
                <span className="text-stone-400 text-[10px] uppercase font-bold block">New Active Device:</span>
                <span className="font-bold text-amber-300">{remoteLogoutNotice.conflictDevice.deviceName || 'Another Device'}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setRemoteLogoutNotice(null);
                setViewMode('login');
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs transition cursor-pointer shadow-lg shadow-rose-950/40"
            >
              Return to Blackboard Login
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
