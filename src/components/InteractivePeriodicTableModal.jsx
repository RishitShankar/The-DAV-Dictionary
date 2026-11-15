import React, { useState } from 'react';
import { 
  X, Atom, Search, Sparkles, Flame, Eye, Layers, 
  HelpCircle, ChevronRight, Info, CheckCircle2 
} from 'lucide-react';

const PERIODIC_ELEMENTS = [
  { z: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', group: 1, period: 1, category: 'nonmetal', shells: [1], color: '#38bdf8', flame: 'Pale Blue', valency: '1' },
  { z: 2, symbol: 'He', name: 'Helium', mass: '4.0026', group: 18, period: 1, category: 'noble_gas', shells: [2], color: '#c084fc', flame: 'N/A', valency: '0' },
  { z: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', group: 1, period: 2, category: 'alkali', shells: [2, 1], color: '#f87171', flame: 'Crimson Red', valency: '1' },
  { z: 4, symbol: 'Be', name: 'Beryllium', mass: '9.0122', group: 2, period: 2, category: 'alkaline_earth', shells: [2, 2], color: '#fb923c', flame: 'White', valency: '2' },
  { z: 5, symbol: 'B', name: 'Boron', mass: '10.81', group: 13, period: 2, category: 'metalloid', shells: [2, 3], color: '#fbbf24', flame: 'Bright Green', valency: '3' },
  { z: 6, symbol: 'C', name: 'Carbon', mass: '12.011', group: 14, period: 2, category: 'nonmetal', shells: [2, 4], color: '#4ade80', flame: 'Yellow-Orange', valency: '4' },
  { z: 7, symbol: 'N', name: 'Nitrogen', mass: '14.007', group: 15, period: 2, category: 'nonmetal', shells: [2, 5], color: '#34d399', flame: 'N/A', valency: '3, 5' },
  { z: 8, symbol: 'O', name: 'Oxygen', mass: '15.999', group: 16, period: 2, category: 'nonmetal', shells: [2, 6], color: '#2dd4bf', flame: 'Colorless (Supporter)', valency: '2' },
  { z: 9, symbol: 'F', name: 'Fluorine', mass: '18.998', group: 17, period: 2, category: 'halogen', shells: [2, 7], color: '#22d3ee', flame: 'N/A (Corrosive)', valency: '1' },
  { z: 10, symbol: 'Ne', name: 'Neon', mass: '20.180', group: 18, period: 2, category: 'noble_gas', shells: [2, 8], color: '#a855f7', flame: 'Reddish-Orange Glow', valency: '0' },
  { z: 11, symbol: 'Na', name: 'Sodium', mass: '22.990', group: 1, period: 3, category: 'alkali', shells: [2, 8, 1], color: '#ef4444', flame: 'Intense Golden Yellow', valency: '1' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.305', group: 2, period: 3, category: 'alkaline_earth', shells: [2, 8, 2], color: '#f97316', flame: 'Blinding White', valency: '2' },
  { z: 13, symbol: 'Al', name: 'Aluminium', mass: '26.982', group: 13, period: 3, category: 'post_transition', shells: [2, 8, 3], color: '#f59e0b', flame: 'Silver White', valency: '3' },
  { z: 14, symbol: 'Si', name: 'Silicon', mass: '28.085', group: 14, period: 3, category: 'metalloid', shells: [2, 8, 4], color: '#eab308', flame: 'Grayish Glow', valency: '4' },
  { z: 15, symbol: 'P', name: 'Phosphorus', mass: '30.974', group: 15, period: 3, category: 'nonmetal', shells: [2, 8, 5], color: '#84cc16', flame: 'Pale Green White', valency: '3, 5' },
  { z: 16, symbol: 'S', name: 'Sulfur', mass: '32.06', group: 16, period: 3, category: 'nonmetal', shells: [2, 8, 6], color: '#10b981', flame: 'Azure Blue', valency: '2, 4, 6' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', group: 17, period: 3, category: 'halogen', shells: [2, 8, 7], color: '#06b6d4', flame: 'N/A (Pungent Gas)', valency: '1, 3, 5, 7' },
  { z: 18, symbol: 'Ar', name: 'Argon', mass: '39.948', group: 18, period: 3, category: 'noble_gas', shells: [2, 8, 8], color: '#8b5cf6', flame: 'Pale Lilac Glow', valency: '0' },
  { z: 19, symbol: 'K', name: 'Potassium', mass: '39.098', group: 1, period: 4, category: 'alkali', shells: [2, 8, 8, 1], color: '#dc2626', flame: 'Lilac / Pale Violet', valency: '1' },
  { z: 20, symbol: 'Ca', name: 'Calcium', mass: '40.078', group: 2, period: 4, category: 'alkaline_earth', shells: [2, 8, 8, 2], color: '#ea580c', flame: 'Brick Red', valency: '2' },
  { z: 26, symbol: 'Fe', name: 'Iron', mass: '55.845', group: 8, period: 4, category: 'transition', shells: [2, 8, 14, 2], color: '#d97706', flame: 'Golden Sparks', valency: '2, 3' },
  { z: 29, symbol: 'Cu', name: 'Copper', mass: '63.546', group: 11, period: 4, category: 'transition', shells: [2, 8, 18, 1], color: '#059669', flame: 'Emerald Blue-Green', valency: '1, 2' },
  { z: 30, symbol: 'Zn', name: 'Zinc', mass: '65.38', group: 12, period: 4, category: 'transition', shells: [2, 8, 18, 2], color: '#0891b2', flame: 'Bluish-Green', valency: '2' },
  { z: 35, symbol: 'Br', name: 'Bromine', mass: '79.904', group: 17, period: 4, category: 'halogen', shells: [2, 8, 18, 7], color: '#0284c7', flame: 'Red-Brown Fumes', valency: '1' },
  { z: 47, symbol: 'Ag', name: 'Silver', mass: '107.87', group: 11, period: 5, category: 'transition', shells: [2, 8, 18, 18, 1], color: '#e2e8f0', flame: 'White Spark', valency: '1' },
  { z: 79, symbol: 'Au', name: 'Gold', mass: '196.97', group: 11, period: 6, category: 'transition', shells: [2, 8, 18, 32, 18, 1], color: '#facc15', flame: 'Inert / Noble', valency: '1, 3' }
];

export function InteractivePeriodicTableModal({ isOpen, onClose }) {
  const [selectedElement, setSelectedElement] = useState(PERIODIC_ELEMENTS[10]); // Sodium default
  const [filterCategory, setFilterCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [flameIgnited, setFlameIgnited] = useState(false);

  if (!isOpen) return null;

  const filteredElements = PERIODIC_ELEMENTS.filter(e => {
    if (filterCategory !== 'all' && e.category !== filterCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return e.name.toLowerCase().includes(q) || e.symbol.toLowerCase().includes(q) || e.z.toString() === q;
    }
    return true;
  });

  const handleSelectElement = (elem) => {
    setSelectedElement(elem);
    setFlameIgnited(false);
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Atom className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
                <span>Interactive Periodic Table & Orbitals</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Concept #107 & #123</span>
              </h2>
              <p className="text-xs text-stone-400">Class 9 & 10 DAV Science Curriculum • Bohr Orbitals, Electron Shells & Flame Colors</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Element Grid & Filters */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[180px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search element (e.g. Na, Carbon, 11)..."
                  className="w-full pl-9 pr-3 py-1.5 bg-stone-800/80 border border-stone-700 rounded-xl text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-stone-800/80 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-300 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Categories</option>
                <option value="alkali">Alkali Metals</option>
                <option value="alkaline_earth">Alkaline Earth</option>
                <option value="transition">Transition Metals</option>
                <option value="metalloid">Metalloids</option>
                <option value="nonmetal">Nonmetals</option>
                <option value="halogen">Halogens</option>
                <option value="noble_gas">Noble Gases</option>
              </select>
            </div>

            {/* Element Tiles Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredElements.map((elem) => {
                const isSelected = selectedElement.z === elem.z;
                return (
                  <button
                    key={elem.z}
                    onClick={() => handleSelectElement(elem)}
                    style={{ borderColor: isSelected ? elem.color : undefined }}
                    className={`p-2 rounded-xl text-left transition-all border ${
                      isSelected 
                        ? 'bg-stone-800 ring-2 ring-offset-1 ring-offset-stone-900 shadow-lg scale-105' 
                        : 'bg-stone-800/40 border-stone-700/60 hover:bg-stone-800/80'
                    }`}
                  >
                    <div className="flex justify-between items-start text-[10px] text-stone-400">
                      <span>{elem.z}</span>
                      <span className="text-[9px] font-mono opacity-60">{elem.valency}</span>
                    </div>
                    <div className="text-base font-black tracking-tight" style={{ color: elem.color }}>
                      {elem.symbol}
                    </div>
                    <div className="text-[10px] font-medium text-stone-300 truncate">
                      {elem.name}
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div className="text-[11px] text-stone-500 flex items-center justify-between pt-2">
              <span>Showing {filteredElements.length} essential curriculum elements</span>
              <span>Click any element to simulate its Bohr orbitals</span>
            </div>
          </div>

          {/* Right: Bohr Orbital Simulation & Lab Details */}
          <div className="lg:col-span-5 bg-stone-950/80 border border-stone-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              {/* Element Header */}
              <div className="flex items-start justify-between border-b border-stone-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black" style={{ color: selectedElement.color }}>
                      {selectedElement.symbol}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-stone-100">{selectedElement.name}</h3>
                      <p className="text-xs text-stone-400">Atomic #{selectedElement.z} • Mass {selectedElement.mass} u</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-stone-800 text-stone-300 border border-stone-700">
                    {selectedElement.category.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* 3D Bohr Orbital Simulation Canvas / SVG */}
              <div className="relative h-48 w-full flex items-center justify-center bg-stone-900/60 rounded-xl border border-stone-800/70 overflow-hidden mb-4">
                
                {/* Nucleus */}
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white shadow-lg z-10 animate-pulse"
                  style={{ backgroundColor: selectedElement.color }}
                >
                  +{selectedElement.z}
                </div>

                {/* Shells (K, L, M, N) */}
                {selectedElement.shells.map((electronCount, shellIdx) => {
                  const radius = 34 + shellIdx * 24;
                  return (
                    <div
                      key={shellIdx}
                      className="absolute rounded-full border border-stone-600/40 pointer-events-none"
                      style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`,
                      }}
                    >
                      {/* Electrons on orbital */}
                      {Array.from({ length: electronCount }).map((_, eIdx) => {
                        const angle = (2 * Math.PI * eIdx) / electronCount;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                          <div
                            key={eIdx}
                            className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 border border-cyan-200 shadow-sm"
                            style={{
                              left: `calc(50% + ${x}px - 5px)`,
                              top: `calc(50% + ${y}px - 5px)`,
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}

                <div className="absolute bottom-2 left-2 text-[10px] font-mono text-stone-500">
                  Shells ({selectedElement.shells.length}): [{selectedElement.shells.join(', ')}]
                </div>
              </div>

              {/* Element Properties Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <div className="text-stone-400 text-[10px]">Valency / Oxidation</div>
                  <div className="font-bold text-stone-200 font-mono">{selectedElement.valency}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-900/60 border border-stone-800">
                  <div className="text-stone-400 text-[10px]">Period & Group</div>
                  <div className="font-bold text-stone-200 font-mono">Period {selectedElement.period}, Grp {selectedElement.group}</div>
                </div>
              </div>

              {/* Flame Test Simulator */}
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${flameIgnited ? 'text-amber-400 animate-bounce' : 'text-stone-500'}`} />
                  <div>
                    <div className="text-[10px] text-stone-400">Bunsen Burner Flame Test</div>
                    <div className="text-xs font-semibold text-stone-200">
                      {flameIgnited ? selectedElement.flame : 'Click to ignite test'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setFlameIgnited(true)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-medium transition-colors"
                >
                  {flameIgnited ? 'Re-ignite' : 'Ignite'}
                </button>
              </div>

            </div>

            <div className="pt-3 text-[11px] text-stone-500 text-center">
              DAV Science Dept Lab Standard • Certified by CBSE/DAV Board
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
