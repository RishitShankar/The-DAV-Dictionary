import React, { useState, Suspense, lazy } from 'react';
import { 
  ClipboardList, MessageSquareMore, Video, UserCheck, Phone, Heart, 
  Banknote, Settings as SettingsIcon, Award, Bus, Shield, Sparkles, 
  ChevronRight, ArrowRight, CheckCircle2, School, Loader2
} from 'lucide-react';

const TeachersSection = lazy(() => import('./TeachersSection').then(m => ({ default: m.TeachersSection })));
const DonationSection = lazy(() => import('./DonationSection').then(m => ({ default: m.DonationSection })));
const AboutCreatorSection = lazy(() => import('./AboutCreatorSection').then(m => ({ default: m.AboutCreatorSection })));
const SettingsHubSection = lazy(() => import('./SettingsHubSection').then(m => ({ default: m.SettingsHubSection })));
const KidsFunNavigatorSection = lazy(() => import('./KidsFunNavigatorSection').then(m => ({ default: m.KidsFunNavigatorSection })));

const FallbackLoader = () => (
  <div className="py-20 flex flex-col items-center justify-center gap-3 text-cyan-400">
    <Loader2 className="w-8 h-8 animate-spin" />
    <span className="text-xs font-mono font-bold">Loading Parental Module...</span>
  </div>
);

export function ParentPortalSection({ user, onLogout, onSelectSection }) {
  // 10 Dedicated Parent Tabs
  const [parentActiveTab, setParentActiveTab] = useState('noticeboard');

  const parentNavItems = [
    { id: 'noticeboard', name: '1. School Notices & Diary', icon: ClipboardList, badge: 'Sec 5 Sub 1' },
    { id: 'timetable', name: '2. Daily Timetable & WhatsApp Desk', icon: MessageSquareMore, badge: 'Sec 5 Sub 2' },
    { id: 'live_classes', name: '3. Live Broadcast Classroom', icon: Video, badge: 'Sec 5 Sub 3' },
    { id: 'attendance', name: '4. Student Attendance Registry', icon: UserCheck, badge: 'Sec 5 Sub 5' },
    { id: 'faculty_contact', name: '5. Faculty Directory & Contacts', icon: Phone, badge: 'Sec 5 Sub 6' },
    { id: 'donate_review', name: '6. Donate & School Reviews', icon: Heart, badge: 'Reviews' },
    { id: 'donate_developer', name: '7. Donate to Developer', icon: Banknote, badge: 'Support' },
    { id: 'settings', name: '8. Parent Settings Hub', icon: SettingsIcon, badge: 'Settings' },
    { id: 'about_creator', name: '9. About Head Boy Creator', icon: Award, badge: 'Biography' },
    { id: 'track_bus', name: '10. Track School Bus Live', icon: Bus, badge: 'Live GPS' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-20">
      {/* Top Parent Portal Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 border-b border-cyan-500/30 px-4 sm:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-black text-xl shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-800">
                  Dimension 8 Verified
                </span>
                <span className="text-xs text-slate-400 font-mono">DAVCAE Parent Security Shield</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                DAV Parental Access Command Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-[11px] text-slate-400 block">Logged in as</span>
              <span className="text-xs font-bold text-cyan-300 font-mono">{user?.name || user?.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Sub-Navigation Tab Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5 overflow-x-auto shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          {parentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = parentActiveTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setParentActiveTab(item.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg font-black'
                    : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        <Suspense fallback={<FallbackLoader />}>
          {/* TAB 1: Subsection 1 of Section 5 (Daily Homework Hub & Notices) */}
          {parentActiveTab === 'noticeboard' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-cyan-300">Section 5 Sub-Section 1: Daily Homework &amp; Diary</h3>
                  <p className="text-xs text-slate-300">Live verified classroom homework, assignments, and school noticeboard</p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-900 text-cyan-200 font-mono font-bold">
                  Parent Sync Active
                </span>
              </div>
              <TeachersSection 
                user={user} 
                isTeacherOS={true} 
                initialSubSection="homework" 
                teacherSubDimension="teacher_only" 
              />
            </div>
          )}

          {/* TAB 2: Subsection 2 of Section 5 (Timetable & WhatsApp Desk) */}
          {parentActiveTab === 'timetable' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-cyan-300">Section 5 Sub-Section 2: Faculty WhatsApp Desk &amp; Timetable</h3>
                  <p className="text-xs text-slate-300">Direct instant messaging access with verified DAV teachers and subject timetable</p>
                </div>
              </div>
              <TeachersSection 
                user={user} 
                isTeacherOS={true} 
                initialSubSection="doubts_chat" 
                teacherSubDimension="teacher_only" 
              />
            </div>
          )}

          {/* TAB 3: Subsection 3 of Section 5 (Live Video Classes) */}
          {parentActiveTab === 'live_classes' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-cyan-300">Section 5 Sub-Section 3: Live Video Classes</h3>
                  <p className="text-xs text-slate-300">Live WebRTC classroom broadcasts and remote subject lectures</p>
                </div>
              </div>
              <TeachersSection 
                user={user} 
                isTeacherOS={true} 
                initialSubSection="live_class" 
                teacherSubDimension="teacher_only" 
              />
            </div>
          )}

          {/* TAB 4: Subsection 5 of Section 5 (Attendance Registry) */}
          {parentActiveTab === 'attendance' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-cyan-300">Section 5 Sub-Section 5: Attendance Registry</h3>
                  <p className="text-xs text-slate-300">Official student attendance rolls, percentage tracking, and cloud records</p>
                </div>
              </div>
              <TeachersSection 
                user={user} 
                isTeacherOS={true} 
                initialSubSection="attendance" 
                teacherSubDimension="teacher_only" 
              />
            </div>
          )}

          {/* TAB 5: Subsection 6 of Section 5 (Faculty Directory & Contacts) */}
          {parentActiveTab === 'faculty_contact' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-cyan-300">Section 5 Sub-Section 6: Verified Faculty Contact Directory</h3>
                  <p className="text-xs text-slate-300">Official contact phone numbers, emails, and consultation hours for DAV faculty</p>
                </div>
              </div>
              <TeachersSection 
                user={user} 
                isTeacherOS={true} 
                initialSubSection="tests" 
                teacherSubDimension="teacher_only" 
              />
            </div>
          )}

          {/* TAB 6: Donate & School Reviews */}
          {parentActiveTab === 'donate_review' && (
            <div className="animate-fadeIn">
              <DonationSection currentUser={user} />
            </div>
          )}

          {/* TAB 7: Donate to Developer */}
          {parentActiveTab === 'donate_developer' && (
            <div className="max-w-2xl mx-auto bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Direct Support to Developer Rishit Shankar</h3>
                  <p className="text-xs text-slate-400">Head Boy &amp; Solo Architect of DAV Dictionary Platform</p>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                DAV Dictionary is built and maintained by Rishit Shankar (Class 8). Your voluntary contribution covers cloud hosting, Supabase database, high-performance CDN, and continuous platform development.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">UPI ID:</span>
                  <span className="text-amber-400 font-mono font-bold">9470033984@upi</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Paytm / PhonePe / GPay:</span>
                  <span className="text-white font-mono font-bold">+91 9470033984</span>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <a
                  href="upi://pay?pa=9470033984@upi&pn=Rishit%20Shankar&cu=INR"
                  className="py-3 px-8 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs hover:brightness-110 shadow-lg cursor-pointer"
                >
                  Open UPI App &amp; Contribute →
                </a>
              </div>
            </div>
          )}

          {/* TAB 8: Settings Hub */}
          {parentActiveTab === 'settings' && (
            <div className="animate-fadeIn">
              <SettingsHubSection user={user} onLogout={onLogout} />
            </div>
          )}

          {/* TAB 9: About Creator */}
          {parentActiveTab === 'about_creator' && (
            <div className="animate-fadeIn">
              <AboutCreatorSection currentUser={user} />
            </div>
          )}

          {/* TAB 10: Track School Bus Live (Section 7) */}
          {parentActiveTab === 'track_bus' && (
            <div className="animate-fadeIn">
              <KidsFunNavigatorSection 
                currentUser={user} 
                initialTab="bus" 
                lockToBusOnly={true}
              />
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
