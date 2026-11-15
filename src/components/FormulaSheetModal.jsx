import React, { useState } from 'react';
import { 
  X, Calculator, Search, Copy, Check, Sparkles, 
  BookOpen, ChevronRight, Layers, HelpCircle 
} from 'lucide-react';

const FORMULA_DATABASE = [
  // PHYSICS
  {
    id: 'phy-1',
    subject: 'Physics',
    topic: 'Motion & Kinematics',
    title: 'First Equation of Motion',
    formula: 'v = u + at',
    latex: 'v = u + at',
    explanation: 'Calculates final velocity (v) given initial velocity (u), uniform acceleration (a), and time elapsed (t).',
    units: 'v, u in m/s, a in m/s², t in s'
  },
  {
    id: 'phy-2',
    subject: 'Physics',
    topic: 'Motion & Kinematics',
    title: 'Second Equation of Motion (Displacement)',
    formula: 's = ut + (1/2)at²',
    latex: 's = ut + \\frac{1}{2}at^2',
    explanation: 'Calculates total distance/displacement (s) traveled under uniform linear acceleration.',
    units: 's in meters'
  },
  {
    id: 'phy-3',
    subject: 'Physics',
    topic: 'Motion & Kinematics',
    title: 'Third Equation of Motion (Velocity-Displacement)',
    formula: 'v² = u² + 2as',
    latex: 'v^2 = u^2 + 2as',
    explanation: 'Relates final velocity directly to displacement without requiring time.',
    units: 'v in m/s, s in meters'
  },
  {
    id: 'phy-4',
    subject: 'Physics',
    topic: 'Forces & Newton’s Laws',
    title: 'Newton’s Second Law of Motion',
    formula: 'F = ma = m(v - u)/t',
    latex: 'F = ma = m\\left(\\frac{v - u}{t}\\right) = \\frac{\\Delta p}{\\Delta t}',
    explanation: 'Rate of change of linear momentum is directly proportional to applied unbalanced force.',
    units: 'F in Newtons (N = kg·m/s²)'
  },
  {
    id: 'phy-5',
    subject: 'Physics',
    topic: 'Gravitation',
    title: 'Universal Law of Gravitation',
    formula: 'F = G · (m₁ · m₂) / r²',
    latex: 'F = G\\frac{m_1 m_2}{r^2}',
    explanation: 'Gravitational attraction between any two point masses in universe. G = 6.674 × 10⁻¹¹ N·m²/kg².',
    units: 'G in N·m²/kg²'
  },
  {
    id: 'phy-6',
    subject: 'Physics',
    topic: 'Current Electricity',
    title: 'Ohm’s Law & Resistance',
    formula: 'V = I · R  =>  R = ρ · (L / A)',
    latex: 'V = IR, \\quad R = \\rho\\frac{L}{A}',
    explanation: 'Potential difference across a conductor is proportional to current. Resistance depends on resistivity (ρ), length (L), and cross-section (A).',
    units: 'V in Volts, I in Amps, R in Ohms (Ω), ρ in Ω·m'
  },
  {
    id: 'phy-7',
    subject: 'Physics',
    topic: 'Current Electricity',
    title: 'Joule’s Law of Heating & Electrical Power',
    formula: 'H = I²Rt = VIt = (V²/R)t,  P = VI = I²R = V²/R',
    latex: 'H = I^2Rt = VIt = \\frac{V^2}{R}t, \\quad P = VI',
    explanation: 'Thermal energy dissipated in a resistive circuit. 1 kWh = 3.6 × 10⁶ Joules (1 commercial unit).',
    units: 'H in Joules (J), Power in Watts (W)'
  },
  {
    id: 'phy-8',
    subject: 'Physics',
    topic: 'Light & Optics',
    title: 'Mirror Formula & Magnification',
    formula: '(1 / f) = (1 / v) + (1 / u),  m = -v / u = h_i / h_o',
    latex: '\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}, \\quad m = -\\frac{v}{u} = \\frac{h_i}{h_o}',
    explanation: 'Spherical mirror equation (concave/convex). Use Cartesian sign convention: u is always negative.',
    units: 'f, v, u in cm; m is dimensionless'
  },
  {
    id: 'phy-9',
    subject: 'Physics',
    topic: 'Light & Optics',
    title: 'Lens Formula & Power of Lens',
    formula: '(1 / f) = (1 / v) - (1 / u),  P = 1 / f (in meters)',
    latex: '\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}, \\quad P = \\frac{1}{f\\text{ (m)}}',
    explanation: 'Thin spherical lens formula. Power of lens is measured in Dioptres (D). Convex lens has +P, concave has -P.',
    units: 'P in Dioptres (D = m⁻¹)'
  },
  {
    id: 'phy-10',
    subject: 'Physics',
    topic: 'Light & Optics',
    title: 'Snell’s Law of Refraction',
    formula: 'n = sin(i) / sin(r) = c / v',
    latex: 'n = \\frac{\\sin i}{\\sin r} = \\frac{c}{v} = \\frac{n_2}{n_1}',
    explanation: 'Ratio of sine of angle of incidence to angle of refraction equals absolute refractive index of medium.',
    units: 'n is dimensionless'
  },

  // CHEMISTRY
  {
    id: 'chem-1',
    subject: 'Chemistry',
    topic: 'Stoichiometry & Mole Concept',
    title: 'Number of Moles & Avogadro Constant',
    formula: 'n = m / M = N / N_A = V / 22.4L (at STP)',
    latex: 'n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V}{22.4\\text{ L (STP)}}',
    explanation: 'Relates mass (m), molar mass (M), and number of particles (N) to Avogadro constant N_A = 6.022 × 10²³.',
    units: 'm in grams, M in g/mol'
  },
  {
    id: 'chem-2',
    subject: 'Chemistry',
    topic: 'Acids, Bases & Salts',
    title: 'pH Scale & Hydronium Ion Concentration',
    formula: 'pH = -log₁₀[H⁺],  pH + pOH = 14 (at 25°C)',
    latex: '\\text{pH} = -\\log_{10}[\\text{H}^+], \\quad \\text{pH} + \\text{pOH} = 14',
    explanation: 'Measures acidity and basicity. Acidic: pH < 7; Neutral: pH = 7; Basic: pH > 7.',
    units: '[H⁺] in mol/L (Molarity)'
  },
  {
    id: 'chem-3',
    subject: 'Chemistry',
    topic: 'Carbon Compounds',
    title: 'Alkanes, Alkenes & Alkynes General Formulas',
    formula: 'Alkanes: CₙH₂ₙ₊₂,  Alkenes: CₙH₂ₙ,  Alkynes: CₙH₂ₙ₋₂',
    latex: '\\text{Alkane: } \\text{C}_n\\text{H}_{2n+2}, \\quad \\text{Alkene: } \\text{C}_n\\text{H}_{2n}, \\quad \\text{Alkyne: } \\text{C}_n\\text{H}_{2n-2}',
    explanation: 'Homologous series formulas for saturated hydrocarbons (single bonds) and unsaturated (double/triple bonds).',
    units: 'n = 1, 2, 3...'
  },
  {
    id: 'chem-4',
    subject: 'Chemistry',
    topic: 'Metals & Reactivity',
    title: 'Reactivity Series Mnemonic',
    formula: 'K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au',
    latex: '\\text{K} > \\text{Na} > \\text{Ca} > \\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Fe} > \\text{Pb} > [\\text{H}] > \\text{Cu} > \\text{Hg} > \\text{Ag} > \\text{Au}',
    explanation: 'Potassium is most reactive; gold is least. Any metal higher in the series displaces lower metals from their salt solutions.',
    units: 'Mnemonic: Please Send Cats Monkeys And Zebras In Lead Cages Securely'
  },

  // MATHEMATICS
  {
    id: 'math-1',
    subject: 'Mathematics',
    topic: 'Algebra & Quadratics',
    title: 'Quadratic Formula (Shreedharacharya Rule)',
    formula: 'x = [-b ± √(b² - 4ac)] / (2a),  D = b² - 4ac',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad D = b^2 - 4ac',
    explanation: 'Finds roots of ax² + bx + c = 0. If D > 0: two real roots; D = 0: two equal real roots; D < 0: no real roots.',
    units: 'a ≠ 0'
  },
  {
    id: 'math-2',
    subject: 'Mathematics',
    topic: 'Arithmetic Progressions',
    title: 'nth Term & Sum of AP',
    formula: 'aₙ = a + (n - 1)d,  Sₙ = (n/2)[2a + (n - 1)d] = (n/2)(a + l)',
    latex: 'a_n = a + (n-1)d, \\quad S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}(a + l)',
    explanation: 'a = first term, d = common difference, n = number of terms, l = last term.',
    units: 'n ∈ ℕ'
  },
  {
    id: 'math-3',
    subject: 'Mathematics',
    topic: 'Trigonometry',
    title: 'Pythagorean Trigonometric Identities',
    formula: 'sin²θ + cos²θ = 1,  1 + tan²θ = sec²θ,  1 + cot²θ = cosec²θ',
    latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta',
    explanation: 'Fundamental trigonometric identities holding true for all angles 0° ≤ θ ≤ 90°.',
    units: 'θ in degrees or radians'
  },
  {
    id: 'math-4',
    subject: 'Mathematics',
    topic: 'Coordinate Geometry',
    title: 'Distance & Section Formulas',
    formula: 'd = √[(x₂ - x₁)² + (y₂ - y₁)²],  P(x,y) = [(m₁x₂ + m₂x₁)/(m₁+m₂), (m₁y₂ + m₂y₁)/(m₁+m₂)]',
    latex: 'd = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}, \\quad P(x,y) = \\left(\\frac{m_1x_2 + m_2x_1}{m_1+m_2}, \\frac{m_1y_2 + m_2y_1}{m_1+m_2}\\right)',
    explanation: 'Calculates Cartesian distance between two points and internal division in ratio m₁ : m₂.',
    units: 'Coordinate plane'
  },
  {
    id: 'math-5',
    subject: 'Mathematics',
    topic: 'Mensuration',
    title: 'Surface Area & Volume of Sphere, Cone & Cylinder',
    formula: 'Cylinder V = πr²h, Cone V = (1/3)πr²h, Sphere V = (4/3)πr³, Sphere SA = 4πr²',
    latex: 'V_{\\text{cyl}} = \\pi r^2 h, \\quad V_{\\text{cone}} = \\frac{1}{3}\\pi r^2 h, \\quad V_{\\text{sph}} = \\frac{4}{3}\\pi r^3, \\quad A_{\\text{sph}} = 4\\pi r^2',
    explanation: 'Volume and total surface area formulas for three-dimensional geometric solids.',
    units: 'Volume in cubic units, Area in square units'
  }
];

export function FormulaSheetModal({ isOpen, onClose }) {
  const [activeSubject, setActiveSubject] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const filtered = FORMULA_DATABASE.filter(item => {
    if (activeSubject !== 'all' && item.subject !== activeSubject) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.formula.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.subject.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.latex || item.formula);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                <span>Formula Sheet Quick Drawer & LaTeX Hub</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Concept #122 & #136</span>
              </h2>
              <p className="text-xs text-stone-400">Complete Board Exam Reference • Physics, Chemistry & Mathematics</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 py-3 bg-stone-950/50 border-b border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Subject Pills */}
          <div className="flex items-center gap-2">
            {['all', 'Physics', 'Chemistry', 'Mathematics'].map(subj => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeSubject === subj
                    ? 'bg-amber-500 text-stone-950 shadow-md font-bold'
                    : 'bg-stone-800/60 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
                }`}
              >
                {subj === 'all' ? 'All Subjects' : subj}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formula, topic..."
              className="w-full pl-9 pr-3 py-1.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        {/* Formula Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-sm">
              No formulas matching "{search}".
            </div>
          ) : (
            filtered.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div 
                  key={item.id}
                  className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-all hover:bg-stone-900/50 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          item.subject === 'Physics' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' :
                          item.subject === 'Chemistry' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {item.subject}
                        </span>
                        <span className="text-xs text-stone-400">• {item.topic}</span>
                      </div>
                      <h3 className="text-base font-bold text-stone-100 mt-1">{item.title}</h3>
                    </div>

                    <button
                      onClick={() => handleCopy(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 self-start transition-all ${
                        isCopied 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                          : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied LaTeX' : 'Copy Formula'}</span>
                    </button>
                  </div>

                  {/* Formula Box */}
                  <div className="my-3 p-3.5 rounded-xl bg-stone-900/90 border border-stone-800 font-mono text-sm sm:text-base text-amber-300 font-bold tracking-wide overflow-x-auto">
                    {item.formula}
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed">
                    {item.explanation}
                  </p>

                  <div className="mt-2 text-[11px] text-stone-500 font-mono">
                    Units/Context: {item.units}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-800 bg-stone-950/70 text-xs text-stone-500 flex items-center justify-between">
          <span>CBSE Class 9 & 10 Exam Syllabus • Verified by DAV Faculty</span>
          <span>Click "Copy Formula" for instant LaTeX equation code</span>
        </div>

      </div>
    </div>
  );
}
