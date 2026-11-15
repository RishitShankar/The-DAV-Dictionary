import React, { useState, useEffect } from 'react';
import { 
  X, Music, Play, Pause, RotateCcw, Volume2, 
  VolumeX, Sparkles, Heart, BookOpen, Share2, Award 
} from 'lucide-react';
import { davAudio } from '../services/davAudioEngine';

const ANTHEM_STANZAS = [
  {
    id: 1,
    sanskrit: "अभिनव भारत के निर्माता, हे आर्य समाज के वीर सपूतों !",
    hindi: "नवीन भारत के शिल्पी, स्वामी दयानन्द के पावन आदर्शों के अनुयायी !",
    english: "O creators of modern India, valiant sons and daughters of Arya Samaj!",
    timeSec: 0
  },
  {
    id: 2,
    sanskrit: "दयानन्द की अमर ज्योति से, जगमग जीवन कर लो पूत !",
    hindi: "महर्षि दयानन्द की ज्ञान ज्योति से अपने जीवन को पावन और प्रकाशित करो !",
    english: "By the immortal flame of Dayanand, make your life sacred and enlightened!",
    timeSec: 10
  },
  {
    id: 3,
    sanskrit: "वेदों का उद्घोष करें हम, सत्य धर्म का मार्ग चुनें ।",
    hindi: "हम चारों वेदों का ज्ञान घोष करें और सदा सत्य व धर्म के मार्ग पर चलें ।",
    english: "Let us proclaim the Vedic wisdom, and choose the righteous path of truth.",
    timeSec: 20
  },
  {
    id: 4,
    sanskrit: "डी.ए.वी. की पावन बगिया, ज्ञान-सुगंध लुटाती है ।",
    hindi: "डीएवी का यह पावन प्रांगण समस्त जगत में चरित्र और ज्ञान की सुगंध फैलाता है ।",
    english: "This sacred garden of DAV radiates the fragrance of character and supreme wisdom.",
    timeSec: 30
  },
  {
    id: 5,
    sanskrit: "ॐ असतो मा सद्गमय, तमसो मा ज्योतिर्गमय, मृत्योर्माऽमृतं गमय ॥",
    hindi: "हे प्रभु! हमें असत्य से सत्य की ओर, अंधकार से प्रकाश की ओर, मृत्यु से अमरता की ओर ले चलो ।",
    english: "Lead us from falsehood to truth, from darkness to light, from mortality to immortality.",
    timeSec: 40
  },
  {
    id: 6,
    sanskrit: "ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः ।",
    hindi: "द्युलोक, अंतरिक्ष, पृथ्वी, जल, औषधियां एवं संपूर्ण ब्रह्मांड में शांति की स्थापना हो ।",
    english: "May peace radiate in the celestial realms, in space, on earth, in water and herbs, throughout the cosmos.",
    timeSec: 50
  }
];

export function DavAnthemPlayerModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const [progressSec, setProgressSec] = useState(0);
  const [viewScript, setViewScript] = useState('both'); // 'sanskrit', 'english', 'both'

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressSec(prev => {
          const next = prev + 1;
          if (next >= 60) {
            setIsPlaying(false);
            return 0;
          }
          // Find active stanza
          const activeIndex = ANTHEM_STANZAS.findIndex((s, idx) => {
            const nextStanza = ANTHEM_STANZAS[idx + 1];
            return next >= s.timeSec && (!nextStanza || next < nextStanza.timeSec);
          });
          if (activeIndex !== -1) {
            setCurrentStanzaIndex(activeIndex);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!isPlaying) {
      davAudio.playChime('bell');
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    setProgressSec(0);
    setCurrentStanzaIndex(0);
    davAudio.playChime('bell');
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Music className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                <span>Official DAV Gaan & Vedic Anthem</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Concept #98 & #114</span>
              </h2>
              <p className="text-xs text-stone-400">DAV Public School, Khabra, Muzaffarpur • Morning Assembly Chant & Shanti Path</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setIsPlaying(false);
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Player Controls Bar */}
        <div className="p-6 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-14 h-14 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-bold transition-all active:scale-95"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>

              <button
                onClick={handleRestart}
                className="w-10 h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
                title="Restart Anthem"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div>
                <div className="text-sm font-bold text-stone-100">
                  {isPlaying ? 'Reciting: Stanza ' + (currentStanzaIndex + 1) + ' of ' + ANTHEM_STANZAS.length : 'Paused • Ready for Recitation'}
                </div>
                <div className="text-xs text-stone-400">Assembly Pitch: A440 • Acoustic Bell Chimes</div>
              </div>
            </div>

            {/* Script toggles */}
            <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl border border-stone-700 text-xs">
              <button 
                onClick={() => setViewScript('sanskrit')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${viewScript === 'sanskrit' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                संस्कृत / हिन्दी
              </button>
              <button 
                onClick={() => setViewScript('english')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${viewScript === 'english' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                English Meaning
              </button>
              <button 
                onClick={() => setViewScript('both')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${viewScript === 'both' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-300 hover:text-white'}`}
              >
                Dual Script
              </button>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-1">
            <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(progressSec / 60) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-stone-500">
              <span>00:{progressSec < 10 ? `0${progressSec}` : progressSec}</span>
              <span>01:00</span>
            </div>
          </div>

        </div>

        {/* Synchronized Lyrics Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {ANTHEM_STANZAS.map((stanza, idx) => {
            const isActive = currentStanzaIndex === idx;
            return (
              <div
                key={stanza.id}
                onClick={() => {
                  setProgressSec(stanza.timeSec);
                  setCurrentStanzaIndex(idx);
                  davAudio.playChime('bell');
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  isActive 
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-xl ring-1 ring-amber-500/30' 
                    : 'bg-stone-950/40 border-stone-800/80 hover:bg-stone-900/60 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isActive ? 'bg-amber-500 text-stone-950 font-black' : 'bg-stone-800 text-stone-400'}`}>
                    Stanza #{stanza.id}
                  </span>
                  {isActive && (
                    <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Synchronized Active
                    </span>
                  )}
                </div>

                {/* Sanskrit & Hindi */}
                {(viewScript === 'sanskrit' || viewScript === 'both') && (
                  <div className="space-y-1 mb-2">
                    <div className={`text-lg sm:text-xl font-bold tracking-wide font-serif ${isActive ? 'text-amber-200' : 'text-stone-200'}`}>
                      {stanza.sanskrit}
                    </div>
                    <div className="text-xs text-stone-400 font-sans">
                      {stanza.hindi}
                    </div>
                  </div>
                )}

                {/* English Meaning */}
                {(viewScript === 'english' || viewScript === 'both') && (
                  <div className={`text-xs italic ${isActive ? 'text-stone-300' : 'text-stone-400'}`}>
                    "{stanza.english}"
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/70 text-xs text-stone-500 flex items-center justify-between">
          <span>Arya Samaj Vedic Heritage • Dayanand Anglo-Vedic College Trust & Management Society</span>
          <span>Certified by Rishit Shankar (Head Boy)</span>
        </div>

      </div>
    </div>
  );
}
