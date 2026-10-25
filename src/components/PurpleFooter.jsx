import React, { useState } from 'react';
import { 
  Heart, Phone, Mail, MapPin, ExternalLink, HelpCircle, 
  ChevronDown, ChevronUp, School, ShieldCheck, Sparkles, BookOpen, User, Award
} from 'lucide-react';
import { 
  WhatsAppLogo, InstagramLogo, LinkedInLogo, SnapchatLogo, 
  FacebookLogo, YouTubeLogo, XTwitterLogo, GitHubLogo 
} from './SocialLogos';

export function PurpleFooter({ currentUser, onSelectSection }) {
  const [openFaq, setOpenFaq] = useState(null);

  const isDimension4 = Boolean(
    (currentUser?.dimension === 4 || currentUser?.id === 'rishibhai' || currentUser?.studentId === 'rishibhai') &&
    currentUser?.dimension !== 1 &&
    currentUser?.dimension !== 2 &&
    currentUser?.dimension !== 3 &&
    currentUser?.dimension !== 5
  );

  const faqs = [
    {
      q: 'How do I access and read all DAV textbooks online?',
      a: 'Go to Section 2: Official DAV Textbooks and pick your class (LKG, UKG, or Classes 1 to 8). You can open verified PDFs with our built-in 10-color neon highlighter, pen, movable notes, and Rishi AI page guide!'
    },
    {
      q: 'How can I support or donate to developer Rishit Shankar?',
      a: 'Visit Section 10: Support & Donate to Developer. You can donate via UPI (9470033984@upi), Paytm, School in-hand cash, or card. Every donation immediately issues an official verified receipt and bill!'
    },
    {
      q: 'What is Rishi AI and how does it help me in exams?',
      a: 'Rishi AI is our custom academic companion tuned on DAV syllabus textbooks. It solves chapter exercises, answers 5-mark examination questions, summarizes textbook pages, and teleports directly to chapters.'
    },
    {
      q: 'How do I upload and synchronize my personal profile photo?',
      a: 'In Section 9: Student Personal Profile, click "Upload Photo" to choose your picture. It automatically syncs to cloud storage and shows in your top Navbar mini-profile across the entire site.'
    }
  ];

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <footer className="bg-gradient-to-br from-[#1a062e] via-[#290c4a] to-[#0f031b] text-white border-t-2 border-purple-500/40 py-12 px-4 sm:px-6 lg:px-8 font-sans shadow-2xl relative overflow-hidden">
      
      {/* Subtle Glowing Radial Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Banner Ribbon */}
        <div className="p-5 sm:p-6 rounded-2xl bg-purple-950/70 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <img 
              src="/logo.png" 
              alt="DAV Dictionary Logo" 
              className="w-14 h-14 object-contain drop-shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">DAV DICTIONARY</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-purple-950 uppercase">
                  11 Sections
                </span>
              </div>
              <p className="text-xs text-purple-200 mt-0.5">
                Created with dedication by Head Boy <strong>Rishit Shankar</strong> for DAV Public School
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-purple-200 bg-purple-900/60 px-4 py-2 rounded-xl border border-purple-400/20">
            <span>Made with Dedication for DAV Public School</span>
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Digital India 🇮🇳</span>
          </div>
        </div>

        {/* 4 Multi-Column Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-purple-200">
          
          {/* Col 1: About the Organization & Mission */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <School className="w-4 h-4 text-amber-400" />
              <span>About My Organization</span>
            </h4>
            <p className="text-purple-100 leading-relaxed text-xs">
              <strong>The DAV Digital Academic Initiative</strong> was founded by Rishit Shankar to provide every student across LKG, UKG, and Classes 1 to 8 with free, verified digital textbooks, 24/7 AI tutoring via Rishi AI, chapter exercise solutions, and modern educational tools.
            </p>
            <div className="pt-2 text-[11px] text-purple-300 space-y-1">
              <div>🏫 <strong>Campus:</strong> DAV Public School, Khabra, Muzaffarpur</div>
              <div>🇮🇳 <strong>Initiative:</strong> Digital India Academic Empowerment</div>
            </div>
          </div>

          {/* Col 2: Direct Developer Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Developer Contact &amp; Chat</span>
            </h4>
            <p className="text-purple-200 text-xs">
              Reach out directly to Rishit Shankar for queries, study notes, or collaboration:
            </p>

            <div className="space-y-2 text-xs">
              <a 
                href="https://api.whatsapp.com/send?phone=919470033984" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold"
              >
                <WhatsAppLogo className="w-4 h-4 fill-current shrink-0" />
                <span>WhatsApp: +91 94700 33984</span>
              </a>

              <a 
                href="tel:8092261750" 
                className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 font-bold"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Phone / Call: +91 80922 61750</span>
              </a>

              <a 
                href="mailto:rishitshankar@gmail.com" 
                className="flex items-center gap-2 text-amber-300 hover:text-amber-200 font-bold"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Email: rishitshankar@gmail.com</span>
              </a>
            </div>

            {/* Social Channels Row */}
            <div className="pt-2 flex flex-wrap gap-1.5">
              <a href="https://www.instagram.com/rishit_shankar?cplk=MXNlYzVmajBtdzFxag==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-pink-600/30 hover:bg-pink-600 text-white transition" title="Instagram">
                <InstagramLogo className="w-3.5 h-3.5 fill-current" />
              </a>
              <a href="https://www.snapchat.com/add/rishitshankar?share_id=-ZCpwO3-VMM&locale=en-IN" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-yellow-400 text-black transition" title="Snapchat">
                <SnapchatLogo className="w-3.5 h-3.5" />
              </a>
              <a href="https://www.linkedin.com/in/rishit-shankar-05559b2bb" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600 text-white transition" title="LinkedIn">
                <LinkedInLogo className="w-3.5 h-3.5 fill-current" />
              </a>
              <a href="https://www.facebook.com/share/1DqeFxcLH5/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-white transition" title="Facebook">
                <FacebookLogo className="w-3.5 h-3.5 fill-current" />
              </a>
              <a href="https://youtube.com/@tofaugerman8214?si=NvJkQQPIn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-red-600/30 hover:bg-red-600 text-white transition" title="YouTube">
                <YouTubeLogo className="w-3.5 h-3.5 fill-current" />
              </a>
              <a href="https://github.com/RishitShankar" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-stone-700/50 hover:bg-stone-700 text-white transition" title="GitHub">
                <GitHubLogo className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 3: Interactive Frequently Asked Questions (FAQs) */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Frequently Asked Questions</span>
            </h4>

            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-purple-950/60 rounded-xl border border-purple-500/20 overflow-hidden text-[11px]">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-2.5 text-left font-bold text-purple-100 flex items-center justify-between gap-2 hover:bg-purple-900/40 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp className="w-3 h-3 shrink-0 text-amber-400" /> : <ChevronDown className="w-3 h-3 shrink-0 text-purple-400" />}
                  </button>
                  {openFaq === idx && (
                    <div className="p-2.5 pt-0 text-purple-200 leading-relaxed border-t border-purple-800/40 bg-purple-950/90">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Quick 10 Dimensions Section Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Academic Dimensions</span>
            </h4>

            <div className="grid grid-cols-1 gap-1 text-[11px]">
              {[
                { id: 1, name: 'Section 1: Master Directory' },
                { id: 2, name: 'Section 2: Official Textbooks (LKG-8)' },
                { id: 3, name: 'Section 3: Questions & Answers' },
                { id: 6, name: 'Section 6: Video Explanations & PYQs' },
                { id: 7, name: 'Section 7: Kids Fun & Gadgets' },
                { id: 8, name: 'Section 8: Study Leaderboard & Focus' },
                { id: 9, name: 'Section 9: Student Personal Profile' },
                { id: 10, name: 'Section 10: Donate & Reviews Hub' },
                { id: 11, name: 'Section 11: About Creator Rishit' },
                ...(isDimension4 ? [{ id: 12, name: 'Section 12: Developer Reviews Vault' }] : [])
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => onSelectSection?.(sec.id)}
                  className="text-left py-1 text-purple-200 hover:text-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>{sec.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectSection?.(10)}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-red-950 fill-red-950" />
                <span>Support Rishit on Section 10</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottommost Copyright Bar */}
        <div className="pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-purple-300/80 gap-3">
          <div>
            © 2026 DAV Dictionary • Built with excellence by <strong>Rishit Shankar</strong> (Head Boy, DAV Public School).
          </div>
          <div className="flex items-center gap-2">
            <span>Class 8-D • 96% Scholar • 100/100 Sanskrit • Digital India 🇮🇳</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default PurpleFooter;
