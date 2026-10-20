import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export class SectionErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`SectionErrorBoundary [${this.props.sectionName || 'Section'}] caught error:`, error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto my-12 p-6 sm:p-8 bg-white border border-rose-200 rounded-3xl shadow-xl text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-black text-slate-800">
            {this.props.sectionName || 'This Section'} Needs a Quick Refresh
          </h3>

          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            A temporary component issue occurred while loading this section. You can refresh this section or return to the Campus Overview without losing your session.
          </p>

          {this.state.error?.message && (
            <pre className="text-[11px] font-mono text-rose-700 bg-rose-50/60 p-3 rounded-xl max-w-lg mx-auto overflow-x-auto text-left border border-rose-200">
              {this.state.error.message}
            </pre>
          )}

          <div className="flex gap-2 justify-center pt-2 flex-wrap">
            <button
              type="button"
              onClick={this.handleReset}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md hover:brightness-105 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry This Section</span>
            </button>

            {this.props.onGoToOverview && (
              <button
                type="button"
                onClick={() => {
                  this.handleReset();
                  this.props.onGoToOverview();
                }}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer border border-slate-300 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Campus Overview</span>
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
