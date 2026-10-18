import React, { useState, useEffect } from 'react';
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
import { CloudDbModal } from './components/CloudDbModal';
import { Award, Heart, Lock, Sparkles, ArrowRight } from 'lucide-react';

export function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Gatekeeper: Always starts as null so Blackboard Login Portal is the first screen seen on opening
  const [user, setUser] = useState(null);

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
  const [isDbGuideOpen, setIsDbGuideOpen] = useState(false);
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
  };

  const handleLogout = () => {
    setUser(null);
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

  const handleUpgradePlan = (planId) => {
    setUser(prev => prev ? { ...prev, plan: planId } : null);
  };

  // If no user is logged in, show the authentic Blackboard Login Gatekeeper
  if (!user) {
    return <BlackboardLogin onLoginSuccess={handleLoginSuccess} />;
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
        onSelectSection={(secId) => setActiveSection(secId)}
        user={user}
        onOpenAdminProgram={() => setIsAdminProgramOpen(true)}
        onLogout={handleLogout}
      />

      {/* Top Navbar with Hamburger Menu & Admin Program Launcher */}
      <Navbar
        activeSection={activeSection}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminProgram={() => setIsAdminProgramOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeSection === 1 ? (
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
            />
          </>
        ) : activeSection === 9 ? (
          <StudentProfileSection user={user} />
        ) : activeSection === 10 ? (
          <AboutCreatorSection />
        ) : (
          <UntitledSection sectionNumber={activeSection} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">The DAV Dictionary</span>
            <span>• 10 Sections • Created by Rishit Shankar</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Made with dedication for DAV Public School</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Digital India 🇮🇳</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AdminPanelModal
        isOpen={isAdminProgramOpen}
        onClose={() => setIsAdminProgramOpen(false)}
        currentUser={user}
        onOpenDbGuide={() => setIsDbGuideOpen(true)}
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
        onOpenDbGuide={() => setIsDbGuideOpen(true)}
      />

      <UploadPdfModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAddPdf={handleAddPdf}
      />

      <CloudDbModal
        isOpen={isDbGuideOpen}
        onClose={() => setIsDbGuideOpen(false)}
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

    </div>
  );
}

export default App;
