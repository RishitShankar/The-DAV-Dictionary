import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Send, Sparkles, Key, Bot, User as UserIcon, RefreshCw, 
  Check, X, BookOpen, MessageSquare, ExternalLink, ShieldCheck, 
  HelpCircle, Compass, FileText, CheckCircle2 
} from 'lucide-react';
import { askDAVGuruAI, getSavedApiKey, saveApiKey } from '../services/geminiService';

export function DAVGuruAI({ isOpen, onClose, initialPrompt = '' }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Namaste! 🙏 I am **DAV Guru AI**, your official textbook-grounded study companion for DAV Dictionary (Classes 1 to 8).

🎯 **100% Textbook Verified Mode Active:**
I answer questions directly from your DAV textbooks (Class 1 to 8)—including back-of-chapter questions (like Part D/E Question 5) and concepts from the middle of pages.

**Try asking me:**
* *"What is the answer of Class 8 SST book Chapter 11 Question number 5?"*
* *"What was the immediate cause of the Revolt of 1857?"*
* *"Explain the difference between plant and animal cells from Class 8 Science"*
* *"Find a Pythagorean triplet with smallest member 8 from DAV Maths"*`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showKeyConfig, setShowKeyConfig] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const key = getSavedApiKey();
    if (key) setApiKey(key);
  }, []);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSaveKey = () => {
    saveApiKey(apiKey);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowKeyConfig(false);
    }, 1200);
  };

  const handleSend = async (textToSend) => {
    const question = textToSend || input;
    if (!question.trim() || loading) return;

    const userMsg = { role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await askDAVGuruAI(question, {
        subject: selectedSubject !== 'all' ? selectedSubject : null,
        classNum: 8
      });
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: response.text,
        source: response.source,
        isTextbookGrounded: response.isTextbookGrounded,
        chapterInfo: response.chapterInfo
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, I encountered a temporary problem while retrieving textbook concepts. Please try again.',
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950 via-slate-900 to-red-900 text-white flex items-center justify-between border-b border-red-900/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-md text-stone-950">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl text-white tracking-tight">
                  DAV Guru AI
                </span>
                <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Textbook Grounded
                </span>
                {apiKey && (
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Gemini Live
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/90">
                Official DAV Curriculum Reference AI • Powered by Google Gemini & DAV Books Database
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border cursor-pointer ${
                showKeyConfig 
                  ? 'bg-amber-400 text-stone-950 border-amber-300' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Connect Google Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Google API Key</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key & Database Info Drawer */}
        {showKeyConfig && (
          <div className="p-4 sm:p-5 bg-amber-50/95 border-b border-amber-200 text-xs text-amber-950 animate-slideDown">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-700" />
                Connect Your Google Gemini AI Key (100% Free)
              </div>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-amber-800 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Get Free Key at Google AI Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            
            <p className="text-slate-700 mb-3 text-xs leading-relaxed">
              Google Gemini connects with our built-in <strong>DAV Textbook Database</strong> to give live, textbook-grounded answers. If you do not have an API key yet, the built-in DAV Textbook Engine is already fully active and answering questions offline!
            </p>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Paste your Google Gemini API Key here (e.g. AIzaSy...)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-slate-800"
              />
              <button
                onClick={handleSaveKey}
                className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 transition cursor-pointer"
              >
                {savedSuccess ? <Check className="w-4 h-4" /> : 'Save Key'}
              </button>
            </div>
          </div>
        )}

        {/* Quick Subject Filter & Popular Question Prompts */}
        <div className="p-2.5 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="font-bold text-slate-500 flex items-center gap-1 pl-1 shrink-0">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              Try Asking:
            </span>
            {[
              'Class 8 SST Chapter 11 Question 5',
              'Immediate cause of 1857 Revolt',
              'Class 8 Science Ch 1 Plant vs Animal Cell',
              'Class 8 Math Pythagorean Triplet for 8',
              'Three Questions by Leo Tolstoy Summary'
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1 rounded-full bg-white border border-slate-300 text-slate-700 hover:border-red-700 hover:text-red-800 transition font-medium shrink-0 cursor-pointer shadow-2xs hover:shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/60">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-800 to-rose-700 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Brain className="w-4.5 h-4.5 text-amber-300" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-gradient-to-r from-red-800 to-rose-900 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {/* Verified Textbook Grounded Header Badge */}
                  {!isUser && (msg.isTextbookGrounded || msg.chapterInfo) && (
                    <div className="mb-3 pb-2 border-b border-amber-200/80 flex items-center justify-between text-amber-800 font-bold text-xs bg-amber-50/70 -mx-4 -mt-4 px-4 pt-3 rounded-t-2xl">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Verified from Official DAV Textbook Database</span>
                      </span>
                      {msg.chapterInfo && (
                        <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-full text-amber-950 font-mono">
                          {msg.chapterInfo}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="whitespace-pre-line font-normal">
                    {msg.text}
                  </div>

                  {!isUser && msg.source === 'gemini-live' && (
                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                      Live Response from Google Gemini 1.5 Flash (Textbook Grounded)
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-2xl bg-slate-800 flex items-center justify-center text-white shrink-0">
                    <UserIcon className="w-4.5 h-4.5 text-slate-200" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-red-800 to-rose-700 flex items-center justify-center text-white shrink-0 animate-pulse">
                <Brain className="w-4.5 h-4.5 text-amber-300" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-2.5 text-xs text-slate-600 shadow-xs">
                <RefreshCw className="w-4 h-4 animate-spin text-red-700" />
                <span>Searching DAV Textbook Database & generating verified answer...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask any question, chapter topic, or Q&A (e.g. Class 8 SST Chapter 11 Question 5)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 text-slate-900"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-800 to-rose-800 hover:from-red-900 hover:to-rose-900 text-white font-bold text-sm transition flex items-center gap-1.5 disabled:opacity-50 shadow-md cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
          <div className="text-[11px] text-slate-500 text-center mt-2 flex items-center justify-center gap-2">
            <span>🛡️ Answers are strictly cross-verified with official DAV School textbooks</span>
            <span>•</span>
            <span>Classes 1 to 8</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DAVGuruAI;
