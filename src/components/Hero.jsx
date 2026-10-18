import React from 'react';
import { BookOpen, Brain, Sparkles, UploadCloud, ShieldCheck, ArrowRight, Zap, Star } from 'lucide-react';
import { BlackDogLogo } from './BlackDogLogo';

export function Hero({ onOpenAI, onOpenPricing, onOpenUpload, onSelectClass, selectedClass }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-red-950 via-slate-900 to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-red-900/30">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        
        {/* Official Logo Banner */}
        <div className="flex justify-center mb-6">
          <div className="p-2 sm:p-3 rounded-3xl bg-white/10 backdrop-blur-md border border-amber-400/40 shadow-2xl inline-flex items-center gap-4 pr-6">
            <img 
              src="/logo.png" 
              alt="The DAV Dictionary" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-2xl hover:scale-105 transition-transform"
            />
            <div className="text-left">
              <div className="text-xs font-black uppercase tracking-wider text-amber-300">Official Release</div>
              <div className="text-lg sm:text-xl font-extrabold text-white">The DAV Dictionary</div>
              <div className="text-[11px] text-amber-200/80 font-mono">Founded by Head Boy Rishit Shankar</div>
            </div>
          </div>
        </div>

        {/* Modern Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold mb-6 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Shaping Modern India • The DAV Dictionary (Classes 1 to 8)</span>
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">The DAV Dictionary</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Crafted with pride by Head Boy Rishit Shankar. The official digital reference and textbook archive for DAV Public School students. Complete Class 1–8 curriculum, chapter notes, and Shankar AI.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('library-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm sm:text-base shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-slate-950" />
            <span>Explore Class 1–8 Books</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAI}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-sm sm:text-base flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 shadow-lg shadow-orange-600/30 border border-orange-400/50 cursor-pointer"
          >
            <BlackDogLogo className="w-6 h-6" bgClassName="bg-stone-950" />
            <span>Chat with Shankar AI</span>
            <span className="bg-stone-950 text-amber-300 text-xs px-2 py-0.5 rounded-full font-black border border-amber-400/40">ONLINE</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="px-5 py-3.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/50 text-red-100 font-semibold text-sm flex items-center gap-2 transition cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 text-amber-300" />
            <span>Upload School PDF</span>
          </button>
        </div>

        {/* Feature Highlights Row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-left">
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-amber-400">LKG to Class 8</div>
            <div className="text-xs text-slate-400 mt-1">Complete DAV Textbooks & Library</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-rose-400">Chapter Notes</div>
            <div className="text-xs text-slate-400 mt-1">Summaries & Solved Q&A Bank</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-orange-400">Shankar AI</div>
            <div className="text-xs text-slate-400 mt-1">DAV Custom Intelligence Engine</div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-xl sm:text-2xl font-black text-blue-400">4 Dimensions</div>
            <div className="text-xs text-slate-400 mt-1">Normal, VIP, VVIP & Developer</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hero;
