import React, { useState, useEffect } from 'react';
import { X, Calculator, Sparkles, Delete, RotateCcw } from 'lucide-react';
import { VfxFloatingMathSymbols } from './vfx/VfxFloatingMathSymbols';

export function FullscreenCalculatorModal({ isOpen, onClose }) {
  // Mode: 'standard' | 'scientific'
  const [calcMode, setCalcMode] = useState('standard');
  const [displayVal, setDisplayVal] = useState('0');
  const [historyVal, setHistoryVal] = useState('');
  const [angleUnit, setAngleUnit] = useState('deg'); // 'deg' | 'rad'

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'Enter') handleEvaluate();
      else if (e.key === 'Backspace') handleBackspace();
      else if (/^[0-9.+\-*/()]$/.test(e.key)) handleInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, displayVal]);

  if (!isOpen) return null;

  const handleInput = (val) => {
    setDisplayVal(prev => {
      if (prev === '0' || prev === 'Error') return val;
      return prev + val;
    });
  };

  const handleClear = () => {
    setDisplayVal('0');
    setHistoryVal('');
  };

  const handleBackspace = () => {
    setDisplayVal(prev => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const handleScientificOp = (op) => {
    try {
      const num = parseFloat(displayVal);
      if (isNaN(num)) return;

      let result;
      const angleMultiplier = angleUnit === 'deg' ? Math.PI / 180 : 1;

      switch (op) {
        case 'sin':
          result = Math.sin(num * angleMultiplier);
          break;
        case 'cos':
          result = Math.cos(num * angleMultiplier);
          break;
        case 'tan':
          result = Math.tan(num * angleMultiplier);
          break;
        case 'sqrt':
          if (num < 0) throw new Error('Invalid');
          result = Math.sqrt(num);
          break;
        case 'sq':
          result = Math.pow(num, 2);
          break;
        case 'cube':
          result = Math.pow(num, 3);
          break;
        case 'log':
          if (num <= 0) throw new Error('Invalid');
          result = Math.log10(num);
          break;
        case 'ln':
          if (num <= 0) throw new Error('Invalid');
          result = Math.log(num);
          break;
        case 'inv':
          if (num === 0) throw new Error('Div/0');
          result = 1 / num;
          break;
        case 'fact':
          if (num < 0 || !Number.isInteger(num) || num > 100) throw new Error('Invalid');
          let f = 1;
          for (let i = 2; i <= num; i++) f *= i;
          result = f;
          break;
        case 'pi':
          setDisplayVal(String(Math.PI));
          return;
        case 'e':
          setDisplayVal(String(Math.E));
          return;
        default:
          return;
      }

      setHistoryVal(`${op}(${displayVal}) =`);
      setDisplayVal(String(Number(result.toFixed(8))));
    } catch {
      setDisplayVal('Error');
    }
  };

  const handleEvaluate = () => {
    try {
      setHistoryVal(displayVal + ' =');
      // Sanitize expression
      const cleanExpr = displayVal
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, String(Math.PI))
        .replace(/e/g, String(Math.E));

      // Safe numeric math evaluator
      if (!/^[0-9.+\-*/() ]+$/.test(cleanExpr)) {
        throw new Error('Invalid characters');
      }
      const evalFn = new Function(`return (${cleanExpr})`);
      const res = evalFn();
      if (!isFinite(res)) throw new Error('Infinite');
      setDisplayVal(String(Number(res.toFixed(8))));
    } catch {
      setDisplayVal('Error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col select-none overflow-hidden animate-fadeIn">
      {/* Green Floating Math Symbols VFX Background */}
      <VfxFloatingMathSymbols />

      {/* Top Header Navigation Bar with Cut, Standard, Scientific & Function */}
      <header className="relative z-10 bg-slate-900/90 border-b border-emerald-500/30 px-4 sm:px-8 py-3.5 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 font-black shadow-md">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white">
              DAV High-Precision Math Engine
            </h2>
            <p className="text-[10px] text-emerald-400 font-mono">
              Fullscreen Mathematical Lab
            </p>
          </div>
        </div>

        {/* 3 Prominent Options: Cut, Standard, Scientific & Function */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setCalcMode('standard')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              calcMode === 'standard'
                ? 'bg-emerald-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>Standard</span>
          </button>

          <button
            type="button"
            onClick={() => setCalcMode('scientific')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              calcMode === 'scientific'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 shadow-lg font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scientific &amp; Function</span>
          </button>

          {/* Cut (Close) Option */}
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-3.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer shadow-md flex items-center gap-1"
            title="Cut and Close Calculator"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cut (Close)</span>
          </button>
        </div>
      </header>

      {/* Main Fullscreen Calculator Body */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 max-w-3xl w-full mx-auto">
        {/* Output Screen */}
        <div className="w-full bg-slate-900/90 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xl backdrop-blur-md flex flex-col items-end justify-end">
          <div className="text-xs sm:text-sm text-emerald-400/80 font-mono tracking-wider h-6 overflow-hidden">
            {historyVal}
          </div>
          <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight break-all overflow-x-auto max-w-full">
            {displayVal}
          </div>
          {calcMode === 'scientific' && (
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setAngleUnit(prev => prev === 'deg' ? 'rad' : 'deg')}
                className="py-0.5 px-2 rounded bg-slate-800 text-emerald-300 text-[10px] font-mono uppercase font-bold border border-slate-700 cursor-pointer"
              >
                {angleUnit.toUpperCase()} MODE
              </button>
            </div>
          )}
        </div>

        {/* Keypad Grid */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl backdrop-blur-md">
          {/* Scientific Function Keys (Visible when Scientific mode is selected) */}
          {calcMode === 'scientific' && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-3 pb-3 border-b border-slate-800 animate-fadeIn">
              {[
                { label: 'sin', action: () => handleScientificOp('sin') },
                { label: 'cos', action: () => handleScientificOp('cos') },
                { label: 'tan', action: () => handleScientificOp('tan') },
                { label: '√x', action: () => handleScientificOp('sqrt') },
                { label: 'x²', action: () => handleScientificOp('sq') },
                { label: 'x³', action: () => handleScientificOp('cube') },
                { label: 'log', action: () => handleScientificOp('log') },
                { label: 'ln', action: () => handleScientificOp('ln') },
                { label: '1/x', action: () => handleScientificOp('inv') },
                { label: 'n!', action: () => handleScientificOp('fact') },
                { label: 'π', action: () => handleScientificOp('pi') },
                { label: 'e', action: () => handleScientificOp('e') },
                { label: '(', action: () => handleInput('(') },
                { label: ')', action: () => handleInput(')') },
                { label: '^', action: () => handleInput('**') }
              ].map((btn, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={btn.action}
                  className="py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-950 hover:border-emerald-600 active:scale-95 transition cursor-pointer shadow-sm"
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}

          {/* Standard Keypad */}
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3 text-sm sm:text-base font-bold font-mono">
            {/* Row 1 */}
            <button
              type="button"
              onClick={handleClear}
              className="py-3.5 sm:py-4 rounded-2xl bg-rose-950/70 border border-rose-800 text-rose-300 hover:bg-rose-900 active:scale-95 transition cursor-pointer shadow-sm"
            >
              AC
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3.5 sm:py-4 rounded-2xl bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition cursor-pointer flex items-center justify-center shadow-sm"
            >
              <Delete className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleInput('%')}
              className="py-3.5 sm:py-4 rounded-2xl bg-slate-800 text-slate-200 hover:bg-slate-700 active:scale-95 transition cursor-pointer shadow-sm"
            >
              %
            </button>
            <button
              type="button"
              onClick={() => handleInput('/')}
              className="py-3.5 sm:py-4 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xl hover:bg-emerald-600 hover:text-stone-950 active:scale-95 transition cursor-pointer shadow-sm"
            >
              ÷
            </button>

            {/* Row 2 */}
            {['7', '8', '9'].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handleInput(n)}
                className="py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer shadow-sm"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleInput('*')}
              className="py-3.5 sm:py-4 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xl hover:bg-emerald-600 hover:text-stone-950 active:scale-95 transition cursor-pointer shadow-sm"
            >
              ×
            </button>

            {/* Row 3 */}
            {['4', '5', '6'].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handleInput(n)}
                className="py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer shadow-sm"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleInput('-')}
              className="py-3.5 sm:py-4 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xl hover:bg-emerald-600 hover:text-stone-950 active:scale-95 transition cursor-pointer shadow-sm"
            >
              -
            </button>

            {/* Row 4 */}
            {['1', '2', '3'].map(n => (
              <button
                key={n}
                type="button"
                onClick={() => handleInput(n)}
                className="py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer shadow-sm"
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleInput('+')}
              className="py-3.5 sm:py-4 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xl hover:bg-emerald-600 hover:text-stone-950 active:scale-95 transition cursor-pointer shadow-sm"
            >
              +
            </button>

            {/* Row 5 */}
            <button
              type="button"
              onClick={() => handleInput('0')}
              className="col-span-2 py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer shadow-sm"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => handleInput('.')}
              className="py-3.5 sm:py-4 rounded-2xl bg-slate-950 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition cursor-pointer shadow-sm"
            >
              .
            </button>
            <button
              type="button"
              onClick={handleEvaluate}
              className="py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-stone-950 font-black text-xl hover:brightness-110 active:scale-95 transition cursor-pointer shadow-lg"
            >
              =
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
