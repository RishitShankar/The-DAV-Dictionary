import React, { useState, useEffect } from 'react';
import { PublicHomepage } from './components/PublicHomepage';
import { BlackboardLogin } from './components/BlackboardLogin';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Navbar } from './components/Navbar';
import { GeminiSidebar } from './components/GeminiSidebar';
import { Hero } from './components/Hero';
import { BookLibrary } from './components/BookLibrary';
import { UntitledSection } from './components/UntitledSection';
import { AboutCreatorSection } from './components/AboutCreatorSection';
import { StudentProfileSection } from './components/StudentProfileSection';
import { RishiAI } from './components/RishiAI';
import { PdfReaderModal } from './components/PdfReaderModal';
import { PricingModal } from './components/PricingModal';
import { CustomPurchaseModal } from './components/CustomPurchaseModal';
import { CinematicFlameVfx } from './components/vfx/CinematicFlameVfx';
import { VfxSolarSystemGalaxy } from './components/vfx/VfxSolarSystemGalaxy';
import { VfxCycloneVortex } from './components/vfx/VfxCycloneVortex';
import { VfxGlobalSuite } from './components/VfxGlobalSuite';
import { AuthModal } from './components/AuthModal';
import { UploadPdfModal } from './components/UploadPdfModal';
import { SectionOverview } from './components/SectionOverview';
import { QuestionsAnswersSection } from './components/QuestionsAnswersSection';
import { DonationSection } from './components/DonationSection';
import { TeachersSection } from './components/TeachersSection';
import { ChapterExplanationsSection } from './components/ChapterExplanationsSection';
import { KidsFunNavigatorSection } from './components/KidsFunNavigatorSection';
import { StudyLeaderboardSection } from './components/StudyLeaderboardSection';
import { DeveloperReviewsSection } from './components/DeveloperReviewsSection';
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
import { safeSetUser, safeSetItem } from './utils/safeStorage';

export function App() {
  const [activeSection, setActiveSection] = useState(1);
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
  
  // 5th Dimension: Mobile Auto-Detection & Viewport Switcher
  const [deviceDimension, setDeviceDimension] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isMobile ? 'mobile' : 'pc';
    }
    return 'pc';
  });

  useEffect(() => {
    const handleAutoDetect = () => {
      const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setDeviceDimension(isMobile ? 'mobile' : 'pc');
    };
    window.addEventListener('resize', handleAutoDetect);
    return () => window.removeEventListener('resize', handleAutoDetect);
  }, []);

  // View mode: 'home' (Public Homepage) | 'login' (Blackboard Login Gatekeeper) | 'app' (Main Portal)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem('dav_user');
      if (saved) return 'app';
    } catch (e) {}
    return 'home';
  });

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
  };

  // Automatic Google OAuth redirect detection & account resolver
  useEffect(() => {
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
          handleLoginSuccess(matched);
        }
      }
    }).catch(() => {});
  }, []);

  const handleSelectSection = (secId) => {
    // Section 12 is strictly for Dimension 4 only (hidden from dimensions 1, 2, 3, 5)
    if (secId === 12 && !(user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai')) {
      return;
    }
    if (isTeacher && teacherSubDimension === 'teacher_only') {
      // In 5A Only Teacher mode, locked to Faculty OS (Section 5)
      setActiveSection(5);
      return;
    }
    // In 5B Teacher & Explorer mode, teacher can explore all sections freely!
    if (secId === 2 && activeSection !== 2) {
      trigger5sFlameVfx(
        'Opening Digital Textbook Vault • Classes 1 to 8',
        'DAV School Master Curriculum & Digital Library'
      );
    }
    if (secId === 11 && activeSection !== 11) {
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
    localStorage.removeItem('dav_user');
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
    <div className={`min-h-screen ${activeSection === 4 ? 'h-screen max-h-screen overflow-hidden' : ''} bg-slate-50 flex flex-col font-sans selection:bg-amber-300 selection:text-red-950`}>
      
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
        user={user}
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
        user={user}
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
      <main className={`flex-1 min-h-0 flex flex-col ${deviceDimension === 'mobile' ? 'pb-24' : ''} ${activeSection === 4 ? 'h-full overflow-hidden' : ''}`}>
        <SectionErrorBoundary
          key={`section-boundary-${activeSection}`}
          sectionName={`Section ${activeSection}`}
          onGoToOverview={() => setActiveSection(1)}
        >
        {(isTeacher && teacherSubDimension === 'teacher_only') ? (
          <TeachersSection 
            user={user} 
            isTeacherOS={true}
            initialSubSection={teacherSubSection}
            onSubSectionChange={(sub) => setTeacherSubSection(sub)}
            teacherSubDimension={teacherSubDimension}
            onToggleSubDimension={handleToggleTeacherSubDimension}
          />
        ) : activeSection === 1 ? (
          <SectionOverview currentUser={user} onSelectSection={handleSelectSection} onOpenPurchaseModal={() => setIsPricingOpen(true)} />
        ) : activeSection === 2 ? (
          <div className="relative min-h-screen bg-[#030712] text-white">
            {/* Section 2 Cosmic Solar System Canvas (The Sun, 9 Planets, Rocket, Spaceship, Starfield) */}
            <VfxSolarSystemGalaxy />
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
                currentUser={user}
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
            currentUser={user} 
            onOpenUpgradeModal={() => setIsPricingOpen(true)}
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 4 ? (
          <RishiAI 
            isSectionView={true} 
            user={user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 5 ? (
          <TeachersSection 
            user={user} 
            isTeacherOS={isTeacher}
            initialSubSection={teacherSubSection}
            onSubSectionChange={(sub) => setTeacherSubSection(sub)}
            teacherSubDimension={teacherSubDimension}
            onToggleSubDimension={handleToggleTeacherSubDimension}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 6 ? (
          <ChapterExplanationsSection 
            user={user} 
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
            onOpenPdfReader={handleOpenPdfReader}
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 7 ? (
          <KidsFunNavigatorSection 
            user={user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 8 ? (
          <StudyLeaderboardSection 
            user={user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 9 ? (
          isGuest ? (
            <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fadeIn">
              <div className="bg-stone-900 border-2 border-amber-500/50 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full pointer-events-none" />
                <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-400/40 mx-auto flex items-center justify-center mb-6 shadow-xl shadow-amber-500/20">
                  <Lock className="w-10 h-10 text-amber-400 animate-bounce" />
                </div>
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-400 text-stone-950 inline-block mb-3">
                  Dimension 9 • Student Personal Vault Locked
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                  Login to Access Your Secure Vault
                </h2>
                <p className="text-sm text-stone-300 max-w-lg mx-auto leading-relaxed mb-8">
                  The Student Personal Vault contains end-to-end encrypted school identity records, academic marks ledgers, exam passwords, and private student dossiers. Please sign in or register with your Student ID to open your vault.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => {
                      setUser(null);
                      setViewMode('login');
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-sm shadow-xl shadow-orange-500/30 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-stone-950" />
                    <span>Login to Continue</span>
                  </button>
                  <button
                    onClick={() => setActiveSection(1)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm font-bold transition cursor-pointer border border-stone-700"
                  >
                    ← Back to Overview Hub
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <StudentProfileSection user={user} onLogout={handleLogout} />
          )
        ) : activeSection === 10 ? (
          <DonationSection 
            currentUser={user} 
            onRequireLogin={handleRequireLogin}
          />
        ) : activeSection === 11 ? (
          <AboutCreatorSection />
        ) : activeSection === 12 ? (
          (user?.dimension === 4 || user?.id === 'rishibhai' || user?.studentId === 'rishibhai') ? (
            <DeveloperReviewsSection 
              currentUser={user} 
              onGoToSection={handleSelectSection} 
            />
          ) : (
            <SectionOverview currentUser={user} onSelectSection={handleSelectSection} />
          )
        ) : (
          <UntitledSection sectionNumber={activeSection} />
        )}
        </SectionErrorBoundary>
      </main>

      {/* Official Purple Footer displayed on Section 9, 10, 11 & (12 for Dimension 4) */}
      {(activeSection === 9 || activeSection === 10 || activeSection === 11 || (activeSection === 12 && (user?.dimension === 4 || user?.id === 'rishibhai'))) && (
        <PurpleFooter currentUser={user} onSelectSection={(secId) => setActiveSection(secId)} />
      )}

      {/* Modals */}
      <AdminPanelModal
        isOpen={isAdminProgramOpen}
        onClose={() => setIsAdminProgramOpen(false)}
        currentUser={user}
      />

      {/* Rishi AI Engine Component */}
      <RishiAI
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialPrompt={aiPrompt}
        user={user}
      />

      <PdfReaderModal
        isOpen={isPdfReaderOpen}
        onClose={handleClosePdfReader}
        book={readerBook}
        currentUser={user}
        onOpenAIWithQuestion={handleOpenAIWithQuestion}
      />

      {/* Global VFX Engine (Click Ripples, Constellation Net, Confetti Cannon) */}
      <VfxGlobalSuite />

      {/* 3-Second Cyclone Vortex VFX for About Creator Profile */}
      <VfxCycloneVortex
        isOpen={isCycloneOpen}
        onComplete={() => {
          setIsCycloneOpen(false);
          setActiveSection(11);
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
        user={user}
        onPurchaseSubmitted={() => {
          setIsPricingOpen(false);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
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

      {/* 5th Dimension: Mobile Floating Bottom Navigation Dock */}
      {deviceDimension === 'mobile' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200 py-2 px-3 shadow-2xl flex items-center justify-around">
          {isTeacher ? (
            <>
              <button
                type="button"
                onClick={() => setTeacherSubSection('homework')}
                className={`flex flex-col items-center gap-1 transition-all ${
                  teacherSubSection === 'homework' ? 'text-purple-600 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${teacherSubSection === 'homework' ? 'bg-purple-100 text-purple-700' : ''}`}>
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Homework</span>
              </button>

              <button
                type="button"
                onClick={() => setTeacherSubSection('doubts_chat')}
                className={`flex flex-col items-center gap-1 transition-all ${
                  teacherSubSection === 'doubts_chat' ? 'text-emerald-600 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${teacherSubSection === 'doubts_chat' ? 'bg-emerald-100 text-emerald-700' : ''}`}>
                  <MessageSquareMore className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Doubts Desk</span>
              </button>

              <button
                type="button"
                onClick={() => setTeacherSubSection('live_class')}
                className={`flex flex-col items-center gap-1 transition-all ${
                  teacherSubSection === 'live_class' ? 'text-rose-600 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${teacherSubSection === 'live_class' ? 'bg-rose-100 text-rose-700' : ''}`}>
                  <Video className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Live Classes</span>
              </button>

              <button
                type="button"
                onClick={() => setTeacherSubSection('tests')}
                className={`flex flex-col items-center gap-1 transition-all ${
                  teacherSubSection === 'tests' ? 'text-indigo-600 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${teacherSubSection === 'tests' ? 'bg-indigo-100 text-indigo-700' : ''}`}>
                  <CheckSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Tests</span>
              </button>

              <button
                type="button"
                onClick={() => setTeacherSubSection('attendance')}
                className={`flex flex-col items-center gap-1 transition-all ${
                  teacherSubSection === 'attendance' ? 'text-amber-600 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${teacherSubSection === 'attendance' ? 'bg-amber-100 text-amber-700' : ''}`}>
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Attendance</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setActiveSection(1)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeSection === 1 ? 'text-red-800 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${activeSection === 1 ? 'bg-red-100 text-red-800' : ''}`}>
                  <Home className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection(2)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeSection === 2 ? 'text-red-800 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${activeSection === 2 ? 'bg-red-100 text-red-800' : ''}`}>
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Books</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection(3)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeSection === 3 ? 'text-purple-800 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${activeSection === 3 ? 'bg-purple-100 text-purple-800' : ''}`}>
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">Q&amp;A Arcade</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAiPrompt('');
                  setIsAIOpen(true);
                }}
                className="flex flex-col items-center gap-1 transition-all text-amber-600 hover:text-amber-700 -mt-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-white">
                  <BlackDogLogo className="w-5 h-5" bgClassName="bg-stone-950" />
                </div>
                <span className="text-[10px] font-black tracking-tight text-slate-800">AI Buddy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveSection(9)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeSection === 9 ? 'text-amber-700 scale-105 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${activeSection === 9 ? 'bg-amber-100 text-amber-700' : ''}`}>
                  <UserIcon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight">ID Vault</span>
              </button>
            </>
          )}
        </nav>
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
