import React from 'react';
import { AlertTriangle, RefreshCw, Home, Trash2 } from 'lucide-react';
import { isQuotaExceededError, cleanupExpendableStorage, sanitizeUserForStorage } from '../utils/safeStorage';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    if (isQuotaExceededError(error)) {
      // Auto-heal storage quota: clear heavy expendable items & sanitize dav_user
      cleanupExpendableStorage();
      try {
        const raw = localStorage.getItem('dav_user');
        if (raw) {
          const parsed = JSON.parse(raw);
          const sanitized = sanitizeUserForStorage(parsed);
          localStorage.setItem('dav_user', JSON.stringify(sanitized));
        }
      } catch (e) {}
    }
  }

  handleReload = () => {
    cleanupExpendableStorage();
    this.setState({ hasError: false, error: null });
    try {
      sessionStorage.clear();
    } catch (e) {}
    // Hard refresh avoiding cache
    window.location.reload();
  };

  handleResetState = () => {
    cleanupExpendableStorage();
    this.setState({ hasError: false, error: null });
  };

  handleCleanRecover = () => {
    try {
      cleanupExpendableStorage();
      localStorage.removeItem('dav_user');
      localStorage.removeItem('dav_teacher_sub_dim');
      sessionStorage.clear();
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-lg w-full bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-amber-300">
              Portal Recovery Assistant
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              A temporary rendering glitch was caught. Choose one of the recovery actions below to continue smoothly.
            </p>

            {this.state.error?.message && (
              <div className="text-left bg-stone-950 p-3.5 rounded-xl border border-rose-900/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
                  Glitch Diagnosis:
                </span>
                <pre className="text-[11px] font-mono text-rose-300 overflow-x-auto whitespace-pre-wrap break-all">
                  {this.state.error.message}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
              {/* Primary: Reload Page */}
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Portal</span>
              </button>

              {/* Secondary: Try In-Place Recovery */}
              <button
                type="button"
                onClick={this.handleResetState}
                className="py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-stone-700 transition"
              >
                <span>Try Again</span>
              </button>

              {/* Tertiary: Clean Cache & Home */}
              <button
                type="button"
                onClick={this.handleCleanRecover}
                className="py-2.5 px-4 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border border-rose-800/50 transition"
                title="Clears corrupted session keys and returns cleanly to Homepage"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Reset &amp; Homepage</span>
              </button>
            </div>

            <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-center gap-2">
              <Home className="w-3.5 h-3.5 text-amber-400" />
              <button
                type="button"
                onClick={this.handleCleanRecover}
                className="underline hover:text-white cursor-pointer"
              >
                Return to Campus Gateway Homepage
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
