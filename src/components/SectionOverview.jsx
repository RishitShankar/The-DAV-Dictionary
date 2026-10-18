import React from 'react';
import { 
  ArrowRight, Sparkles, School, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { sectionLogosMap, Section1Logo } from './SectionLogos';

export function SectionOverview({ onSelectSection }) {
  const sectionsList = [
    {
      id: 1,
      title: 'Section 1: Website Master Overview & Hub',
      shortTitle: 'Overview Hub',
      color: 'from-amber-500 to-orange-600',
      tag: 'Current Section',
      description: 'The master directory and architectural dashboard for all 10 academic dimensions of The DAV Dictionary. Get a quick summary of every tool and jump directly to any section with one click.'
    },
    {
      id: 2,
      title: 'Section 2: Official DAV Textbooks (LKG – Class 8)',
      shortTitle: 'Digital Library',
      color: 'from-red-600 to-rose-700',
      tag: '70 Full Textbooks',
      description: 'Complete digital repository with uncompressed, verified textbooks for Classes 1 to 8, UKG, and LKG. Includes the built-in PDF Reader with 10-color neon highlighter, pen, undo/redo, and automatic chapter navigation.'
    },
    {
      id: 3,
      title: 'Section 3: Questions & Answers Bank',
      shortTitle: 'Q&A Repository',
      color: 'from-blue-600 to-indigo-700',
      tag: 'Curriculum Solutions',
      description: 'Chapter-by-chapter solved exercise answers, textbook back-question solutions, and key exam revision notes curated specifically for DAV Board syllabi.'
    },
    {
      id: 4,
      title: 'Section 4: Shankar AI Academic Companion',
      shortTitle: 'Shankar AI Tutor',
      color: 'from-cyan-600 to-blue-700',
      tag: '24/7 AI Intelligence',
      description: 'Powered by Gemini AI and tuned specifically on DAV curriculum materials. Ask any academic doubt in Science, Mathematics, Hindi, English, Sanskrit, or Social Science.'
    },
    {
      id: 5,
      title: 'Section 5: Interactive Chapter Quizzes',
      shortTitle: 'Self-Assessment',
      color: 'from-amber-500 to-yellow-600',
      tag: 'Instant Score & Feedback',
      description: 'Multiple-choice quizzes with automated grading, instant answer rationales, and performance scorecards to prepare thoroughly for school exams.'
    },
    {
      id: 6,
      title: 'Section 6: The DAV Academic Dictionary',
      shortTitle: 'Word Dictionary',
      color: 'from-purple-600 to-indigo-700',
      tag: 'Vocabulary Engine',
      description: 'Search academic vocabulary with phonetic transcriptions, grammar classifications, definitions, and contextual sentences derived from DAV textbooks.'
    },
    {
      id: 7,
      title: 'Section 7: DAV Syllabus & Curriculum Guides',
      shortTitle: 'Syllabus Blueprint',
      color: 'from-sky-600 to-blue-700',
      tag: 'Examination Scheme',
      description: 'Chapter-wise mark weightage, examination blueprints, monthly split-up syllabus, and prescribed learning objectives across all subjects.'
    },
    {
      id: 8,
      title: 'Section 8: Notice Board & School Announcements',
      shortTitle: 'Live Notice Board',
      color: 'from-amber-600 to-orange-700',
      tag: 'Important Dates',
      description: 'Stay updated with examination schedules, project submission deadlines, holiday calendars, and academic circulars.'
    },
    {
      id: 9,
      title: 'Section 9: Student Personal Profile',
      shortTitle: 'Student Profile',
      color: 'from-violet-600 to-purple-800',
      tag: 'Individual ID Vault',
      description: 'Each student manages their own personal profile, uploads their photo, specifies their parent details, roll number, hobbies, and saves securely with cloud persistence.'
    },
    {
      id: 10,
      title: 'Section 10: About Creator Rishit Shankar',
      shortTitle: 'Head Boy Story',
      color: 'from-amber-600 to-yellow-500',
      tag: 'Master Developer',
      description: 'Meet Rishit Shankar (Head Boy, Class 8 DAV Khabra, 96% aggregate, 100/100 Sanskrit, Chess Gold Medalist). Contact directly via WhatsApp (+91 94700 33984), Call (+91 80922 61750), Snapchat (@rishitshankar), rishitshankar@gmail.com, and Instagram (@rishit_shankar).'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950 via-slate-900 to-stone-900 text-white border border-amber-500/30 shadow-2xl mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-stone-950 flex items-center justify-center font-black shadow-lg shrink-0 p-3">
              <Section1Logo className="w-full h-full" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold mb-1 border border-amber-400/30">
                <School className="w-3.5 h-3.5" />
                <span>Section 1 • Master Navigation Directory</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Website Overview &amp; 10 Sections Directory
              </h1>
              <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
                Welcome to the complete overview of <strong>The DAV Dictionary</strong>. Explore the brief characteristics of all 10 sections below and click on any section card to jump straight into it!
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onSelectSection(2)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-stone-950 font-black text-xs shadow-lg flex items-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
            >
              <span>Go to Section 2 (Textbooks) →</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10 Sections Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionsList.map((sec) => {
          const SectionLogo = sectionLogosMap[sec.id];
          const isCurrent = sec.id === 1;

          return (
            <div
              key={sec.id}
              className={`p-6 rounded-3xl bg-white border transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl ${
                isCurrent
                  ? 'border-amber-400/80 ring-2 ring-amber-400/20'
                  : 'border-slate-200/90 hover:border-slate-400'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-stone-950 border border-slate-700/60 p-2 flex items-center justify-center shadow-md shrink-0">
                      {SectionLogo && <SectionLogo className="w-full h-full" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Dimension {sec.id}
                      </span>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
                        {sec.shortTitle}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {sec.tag}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {sec.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectSection(sec.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 pointer-events-none'
                    : 'bg-slate-900 hover:bg-red-800 text-white shadow-sm hover:shadow-md'
                }`}
              >
                <span>{isCurrent ? 'You are here' : `Redirect to Section ${sec.id}`}</span>
                {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default SectionOverview;
