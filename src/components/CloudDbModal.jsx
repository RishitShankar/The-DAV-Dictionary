import React, { useState, useEffect } from 'react';
import { 
  X, Database, Cloud, Shield, Key, ExternalLink, Check, Server, 
  HelpCircle, ArrowRight, HardDrive, Flame, Globe, Loader2, AlertCircle, Copy
} from 'lucide-react';
import { testSupabaseConnection } from '../services/supabaseClient';

export function CloudDbModal({ isOpen, onClose }) {
  const [providerTab, setProviderTab] = useState('supabase'); // 'supabase' | 'firebase'
  
  // Supabase state
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState('');
  
  // Firebase state
  const [firebaseApiKey, setFirebaseApiKey] = useState('');
  const [firebaseProjectId, setFirebaseProjectId] = useState('');
  
  const [isSaved, setIsSaved] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // null | 'testing' | 'success' | 'error'
  const [testMessage, setTestMessage] = useState('');
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    const defaultUrl = localStorage.getItem('dav_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '';
    const defaultAnon = localStorage.getItem('dav_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    setSupabaseUrl(defaultUrl);
    setSupabaseAnonKey(defaultAnon);
    if (!localStorage.getItem('dav_supabase_url') && defaultUrl) {
      localStorage.setItem('dav_supabase_url', defaultUrl);
    }
    if (!localStorage.getItem('dav_supabase_anon_key') && defaultAnon) {
      localStorage.setItem('dav_supabase_anon_key', defaultAnon);
    }
    setFirebaseApiKey(localStorage.getItem('dav_firebase_api_key') || '');
    setFirebaseProjectId(localStorage.getItem('dav_firebase_project_id') || '');
    setTestStatus(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!supabaseUrl || !supabaseAnonKey) {
      setTestStatus('error');
      setTestMessage('Please enter both Supabase Project URL and Public Anon Key first.');
      return;
    }
    setTestStatus('testing');
    const res = await testSupabaseConnection(supabaseUrl, supabaseAnonKey);
    if (res.success) {
      setTestStatus('success');
      setTestMessage(res.message);
    } else {
      setTestStatus('error');
      setTestMessage(res.message);
    }
  };

  const copySqlToClipboard = () => {
    const sql = `CREATE TABLE IF NOT EXISTS dav_students (
  id TEXT PRIMARY KEY,
  admission_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT,
  phone TEXT,
  plan TEXT DEFAULT 'free',
  is_paid BOOLEAN DEFAULT false,
  fee_amount NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);`;
    navigator.clipboard?.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleSave = () => {
    localStorage.setItem('dav_supabase_url', supabaseUrl);
    localStorage.setItem('dav_supabase_anon_key', supabaseAnonKey);
    localStorage.setItem('dav_firebase_api_key', firebaseApiKey);
    localStorage.setItem('dav_firebase_project_id', firebaseProjectId);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-950 via-slate-900 to-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                Cloud Database Architecture & Step-by-Step Setup
              </h3>
              <p className="text-xs text-slate-300">
                Sync student accounts, payment records, and PDF library across any device
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-slate-800">
          
          {/* Provider Tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              onClick={() => setProviderTab('supabase')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                providerTab === 'supabase'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Option 1: Supabase (Recommended - Free)</span>
            </button>

            <button
              onClick={() => setProviderTab('firebase')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                providerTab === 'firebase'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Option 2: Google Firebase (Free)</span>
            </button>
          </div>

          {/* SUPABASE STEP-BY-STEP */}
          {providerTab === 'supabase' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 className="font-bold text-emerald-950 text-xs sm:text-sm flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-emerald-700" />
                  What Supabase Gives You for Free:
                </h4>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  PostgreSQL database hosted 24/7 in Mumbai (India). Stores unlimited student accounts, login passwords, and auto-syncs when refreshed on mobile, tablet, or PC.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Open Supabase</div>
                    Visit{' '}
                    <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline inline-flex items-center gap-0.5">
                      https://supabase.com <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    and click <strong>"Start your project"</strong>. Log in with your free Google account.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Create a New Project</div>
                    Click <strong>"+ New Project"</strong>. Enter Name: <code>DAV Dictionary</code>, set a database password, and pick Region: <strong>Central India (Mumbai)</strong>. Click "Create".
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Copy Your API Credentials</div>
                    Go to <strong>Project Settings</strong> (gear icon at bottom left) → <strong>API</strong>. Copy your <strong>Project URL</strong> and <strong>anon public key</strong>, and paste them below!
                  </div>
                </div>
              </div>

              {/* Supabase Form */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Enter Your Supabase Credentials</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Project URL</label>
                  <input
                    type="text"
                    placeholder="https://xyzabcdefg.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Public Anon Key</label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                    value={supabaseAnonKey}
                    onChange={(e) => setSupabaseAnonKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
                  />
                </div>

                {/* Test Connection Button & Status */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testStatus === 'testing'}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    {testStatus === 'testing' ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Server className="w-3.5 h-3.5" />
                    )}
                    <span>{testStatus === 'testing' ? 'Testing Connection...' : 'Test Supabase Connection'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={copySqlToClipboard}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'SQL Schema Copied!' : 'Copy SQL Schema'}</span>
                  </button>
                </div>

                {testStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">{testMessage}</span>
                  </div>
                )}

                {testStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-red-100/80 border border-red-300 text-red-900 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="font-semibold">{testMessage}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* FIREBASE STEP-BY-STEP */}
          {providerTab === 'firebase' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-950 text-xs sm:text-sm flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-amber-700" />
                  What Google Firebase Gives You for Free:
                </h4>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Google Cloud Firestore real-time NoSQL database. Syncs student login states instantly across web tabs and Android/iOS.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Open Firebase Console</div>
                    Visit{' '}
                    <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-amber-700 font-bold underline inline-flex items-center gap-0.5">
                      https://console.firebase.google.com <ExternalLink className="w-3 h-3" />
                    </a>{' '}
                    and sign in with your Google account.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Add Project</div>
                    Click <strong>"Add Project"</strong> → Name it <code>dav-dictionary</code>. Enable Firestore Database in Test Mode.
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <div className="text-xs text-slate-700">
                    <div className="font-bold text-slate-900 mb-0.5">Copy Web App Config</div>
                    Click the <strong>Web (&lt;/&gt;)</strong> icon to register web app. Copy the <code>apiKey</code> and <code>projectId</code> and paste them below!
                  </div>
                </div>
              </div>

              {/* Firebase Form */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Enter Your Firebase Credentials</h4>
                
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Firebase Project ID</label>
                  <input
                    type="text"
                    placeholder="dav-dictionary-889"
                    value={firebaseProjectId}
                    onChange={(e) => setFirebaseProjectId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Firebase Web API Key</label>
                  <input
                    type="password"
                    placeholder="AIzaSyBv_..."
                    value={firebaseApiKey}
                    onChange={(e) => setFirebaseApiKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-md cursor-pointer"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <HardDrive className="w-4 h-4 text-amber-400" />}
            <span>{isSaved ? 'Cloud Database Connected & Saved!' : 'Save & Connect Cloud Database'}</span>
          </button>

        </div>

      </div>
    </div>
  );
}

export default CloudDbModal;
