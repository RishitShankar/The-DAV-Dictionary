import React from 'react';
import { Layers, Sparkles, PlusCircle } from 'lucide-react';

export function UntitledSection({ sectionNumber, title, description }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-3xl border-2 border-dashed border-slate-300 p-8 sm:p-14 text-center shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full -z-10 pointer-events-none" />
        
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-5 border border-slate-200">
          <Layers className="w-8 h-8 text-slate-500" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Slot Reserved • Section {sectionNumber}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          {title || 'Untitled'}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-lg mx-auto font-normal leading-relaxed">
          {description || 'This section is currently blank and reserved for your vision. When you are ready, tell me what feature or tool you would like to build here!'}
        </p>

        <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center text-xs text-slate-400">
          Section {sectionNumber} of 10 • Ready for configuration
        </div>
      </div>
    </div>
  );
}
