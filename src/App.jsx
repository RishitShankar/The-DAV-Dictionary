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
import { ShankarAI } from './components/ShankarAI';
import { PdfReaderModal } from './components/PdfReaderModal';
import { PricingModal } from './components/PricingModal';
import { AuthModal } from './components/AuthModal';
import { UploadPdfModal } from './components/UploadPdfModal';
import { SectionOverview } from './components/SectionOverview';
import { QuestionsAnswersSection } from './components/QuestionsAnswersSection';
import { DonationSection } from './components/DonationSection';
import { TeachersSection } from './components/TeachersSection';
import { PurpleFooter } from './components/PurpleFooter';
import { SectionErrorBoundary } from './components/SectionErrorBoundary';
import { 
  Award, Heart, Lock, Sparkles, ArrowRight, Smartphone, Monitor, 
  Home, BookOpen, Layers, User as UserIcon, ClipboardList, 
  MessageSquareMore, Video, CheckSquare, UserCheck 
} from 'lucide-react';
import { BlackDogLogo } from './components/BlackDogLogo';

export function App() {
  const [activeSection, setActiveSection] = useState(1);
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

  useEffect(() => {
    if (user && user.plan !== 'guest') {
      localStorage.setItem('dav_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dav_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dav_uploaded_pdfs', JSON.stringify(uploadedPdfs));
  }, [uploadedPdfs]);

  const handleLoginSuccess = (loggedInUser) => {
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

  const handleSelectSection = (secId) => {
    if (isTeacher && teacherSubDimension === 'teacher_only') {
      // In 5A Only Teacher mode, locked to Faculty OS (Section 5)
      setActiveSection(5);
      return;
    }
    // In 5B Teacher & Explorer mode, teacher can explore all 10 sections freely!
    setActiveSection(secId);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode('home');
    localStorage.removeItem('dav_user');
  };

  const handleOpenAIWithQuestion = (question) => {
    setAiPrompt(question);
    setIsAIOpen(true);
  };

  const handleOpenPdfReader = (book) => {
    // Check permission if in guest mode
    if (user?.plan === 'guest') {
      setLockedFeatureModal({
        title: 'Complete Book Reader Locked',
        message: 'You are currently in Free Preview mode. Please log in with your Normal, VIP, or VVIP ID & Password to read complete textbooks.'
      });
      return;
    }
    setReaderBook(book);
    setIsPdfReaderOpen(true);
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
      />
    );
  }

  const isGuest = user.plan === 'guest';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-amber-300 selection:text-red-950">
      
      {/* Guest Mode Floating Notification */}
      {isGuest && (
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-stone-950 text-xs py-2 px-4 flex items-center justify-between font-bold shadow-md z-30 sticky top-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>Free Guest Demo Preview Active • Full Textbook Reader & Downloads are Locked</span>
          </div>
          <button
            onClick={handleLogout}
            className="py-1 px-3 rounded-lg bg-stone-950 text-amber-300 text-[11px] font-black uppercase hover:bg-stone-900 transition cursor-pointer"
          >
            Sign In with ID →
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

      {/* 5th Dimension: Mobile Auto-Detection Indicator Bar */}
      {deviceDimension === 'mobile' && (
        <div className="bg-gradient-to-r from-red-900 via-amber-700 to-red-900 text-white text-[11px] font-bold py-1.5 px-4 flex items-center justify-between shadow-sm sticky top-[76px] z-30">
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>5th Dimension (Mobile Mode Active) • Auto-Optimized Touch Controls</span>
          </span>
          <button
            onClick={() => setDeviceDimension('pc')}
            className="text-[10px] underline font-bold text-amber-200 hover:text-white cursor-pointer"
          >
            Switch to PC Mode 🖥️
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`flex-1 ${deviceDimension === 'mobile' ? 'pb-24' : ''}`}>
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
          <SectionOverview onSelectSection={handleSelectSection} />
        ) : activeSection === 2 ? (
          <>
            <Hero
              onOpenAI={() => {
                setAiPrompt('');
                setIsAIOpen(true);
              }}
              onOpenPricing={() => setIsPricingOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
            />
            <BookLibrary
              onOpenPdfReader={handleOpenPdfReader}
              onOpenUploadModal={() => setIsUploadOpen(true)}
              onOpenAIWithQuestion={handleOpenAIWithQuestion}
              uploadedPdfs={uploadedPdfs}
              onDeletePdf={handleDeletePdf}
            />
          </>
        ) : activeSection === 3 ? (
          <QuestionsAnswersSection 
            currentUser={user} 
            onOpenUpgradeModal={() => setIsPricingOpen(true)}
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
          />
        ) : activeSection === 4 ? (
          <ShankarAI 
            isSectionView={true} 
            user={user} 
          />
        ) : activeSection === 5 ? (
          <TeachersSection 
            user={user} 
            isTeacherOS={isTeacher}
            initialSubSection={teacherSubSection}
            onSubSectionChange={(sub) => setTeacherSubSection(sub)}
            teacherSubDimension={teacherSubDimension}
            onToggleSubDimension={handleToggleTeacherSubDimension}
          />
        ) : activeSection === 8 ? (
          <DonationSection currentUser={user} />
        ) : activeSection === 9 ? (
          <StudentProfileSection user={user} />
        ) : activeSection === 10 ? (
          <AboutCreatorSection />
        ) : (
          <UntitledSection sectionNumber={activeSection} />
        )}
        </SectionErrorBoundary>
      </main>

      {/* Official Purple Footer displayed ONLY on Section 9 & 10 as requested by the user */}
      {(activeSection === 9 || activeSection === 10) && (
        <PurpleFooter onSelectSection={(secId) => setActiveSection(secId)} />
      )}

      {/* Modals */}
      <AdminPanelModal
        isOpen={isAdminProgramOpen}
        onClose={() => setIsAdminProgramOpen(false)}
        currentUser={user}
      />

      {/* Shankar AI Engine Component */}
      <ShankarAI
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialPrompt={aiPrompt}
        user={user}
      />

      <PdfReaderModal
        isOpen={isPdfReaderOpen}
        onClose={() => setIsPdfReaderOpen(false)}
        book={readerBook}
        currentUser={user}
        onOpenAIWithQuestion={handleOpenAIWithQuestion}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        currentPlan={user?.plan || 'normal'}
        onUpgradePlan={handleUpgradePlan}
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

      {/* Locked Feature Modal for Free Preview */}
      {lockedFeatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-orange-500/40 rounded-3xl max-w-md w-full p-6 text-white text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/20 text-orange-400 border border-orange-400/40 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-amber-300 mb-2">
              {lockedFeatureModal.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {lockedFeatureModal.message}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setLockedFeatureModal(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 cursor-pointer"
              >
                Continue Preview
              </button>
              <button
                onClick={() => {
                  setLockedFeatureModal(null);
                  handleLogout();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 text-xs font-black uppercase cursor-pointer"
              >
                Sign In Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5th Dimension: Mobile Floating Bottom Navigation Dock */}
      {deviceDimension === 'mobile' && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 py-2 px-3 shadow-2xl flex items-center justify-around">
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

    </div>
  );
}

export default App;
