import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Eye, X, ChevronRight, Check, Compass, Cpu, 
  Layers, Waves, Box, Sun, Binary, CloudRain, Zap, Music, Dna
} from 'lucide-react';

import { VfxSolarSystemGalaxy } from './VfxSolarSystemGalaxy';
import { VfxQuantumCollider } from './VfxQuantumCollider';
import { VfxHolographicNeuralBrain } from './VfxHolographicNeuralBrain';
import { VfxDeepOceanAbyss } from './VfxDeepOceanAbyss';
import { VfxHyperPolyhedra } from './VfxHyperPolyhedra';
import { VfxVedicAstrolabe } from './VfxVedicAstrolabe';
import { VfxMatrixDataTorrent } from './VfxMatrixDataTorrent';
import { VfxSupernovaNebula } from './VfxSupernovaNebula';
import { VfxLaserOpticsPrism } from './VfxLaserOpticsPrism';
import { VfxChladniPlateSoundwave } from './VfxChladniPlateSoundwave';
import { VfxDnaDoubleHelix } from './VfxDnaDoubleHelix';

export const VFX_MASTER_CATALOG = [
  {
    id: 'solar_system',
    title: 'Solar System Galaxy',
    subtitle: 'Section 2 Masterpiece with Sun, 9 Planets, Rocket & Space Shuttle',
    icon: Compass,
    color: 'from-amber-500 to-orange-600',
    component: VfxSolarSystemGalaxy
  },
  {
    id: 'quantum_collider',
    title: 'Quantum Particle Supercollider',
    subtitle: 'Atomic Orbitals, Bohr Shells, Schrödinger Probability Clouds & Quarks',
    icon: Zap,
    color: 'from-cyan-500 to-blue-600',
    component: VfxQuantumCollider
  },
  {
    id: 'neural_brain',
    title: 'Holographic Cyber Neural Brain',
    subtitle: '3D Rotating Wireframe Brain, Synaptic Sparks & Neurotransmitter Streams',
    icon: Cpu,
    color: 'from-purple-500 to-pink-600',
    component: VfxHolographicNeuralBrain
  },
  {
    id: 'ocean_abyss',
    title: 'Deep Ocean Bioluminescent Abyss',
    subtitle: 'Luminous Jellyfish, Drifting Plankton & Emerald Oceanic Currents',
    icon: Waves,
    color: 'from-teal-500 to-emerald-600',
    component: VfxDeepOceanAbyss
  },
  {
    id: 'hyper_polyhedra',
    title: 'Sacred Hyper-Dimensional Polyhedra',
    subtitle: '3D Platonic Solids, Origami Matrix & Chromatic Refraction Edges',
    icon: Box,
    color: 'from-amber-400 to-rose-600',
    component: VfxHyperPolyhedra
  },
  {
    id: 'vedic_astrolabe',
    title: 'Ancient Golden Vedic Astrolabe',
    subtitle: 'Celestial Planetary Gearwork, 12 Rashi Zodiac Arcs & Gnomon Sundial',
    icon: Sun,
    color: 'from-amber-600 to-yellow-500',
    component: VfxVedicAstrolabe
  },
  {
    id: 'matrix_torrent',
    title: 'Matrix Cyber Data Torrent',
    subtitle: '3D Parallax Streams of Emerald Hexadecimal Glyphs & Digital Vortex',
    icon: Binary,
    color: 'from-emerald-500 to-teal-500',
    component: VfxMatrixDataTorrent
  },
  {
    id: 'supernova_nebula',
    title: 'Supernova Nebula Forge',
    subtitle: 'Cosmic Accretion Cloud, Gravitational Lensing & Protostar Cores',
    icon: CloudRain,
    color: 'from-fuchsia-600 to-purple-600',
    component: VfxSupernovaNebula
  },
  {
    id: 'laser_prism',
    title: 'Crystal Prism Laser Optics Bench',
    subtitle: 'Incident Lasers Refracting Through Glass Prisms Into Rainbow Spectra',
    icon: Layers,
    color: 'from-blue-500 to-indigo-600',
    component: VfxLaserOpticsPrism
  },
  {
    id: 'chladni_soundwave',
    title: 'Soundwave Acoustic Resonance Field',
    subtitle: 'Harmonic 2D Chladni Nodal Mandalas Modulating with Cursor Position',
    icon: Music,
    color: 'from-violet-500 to-amber-500',
    component: VfxChladniPlateSoundwave
  },
  {
    id: 'dna_helix',
    title: 'Cybernetic DNA Double Helix',
    subtitle: '3D Twisting Nucleotide Ladder, Base Pairs & CRISPR Tracer Beams',
    icon: Dna,
    color: 'from-emerald-400 to-cyan-500',
    component: VfxDnaDoubleHelix
  }
];

export function VfxMasterDirector({ activeSection = 1 }) {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      return localStorage.getItem('dav_active_vfx_theme') || 'auto';
    } catch (e) {
      return 'auto';
    }
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Auto theme mapper based on Section
  const getAutoTheme = (sec) => {
    switch (sec) {
      case 2: return 'solar_system';
      case 3: return 'quantum_collider';
      case 4: return 'neural_brain';
      case 5: return 'vedic_astrolabe';
      case 6: return 'matrix_torrent';
      case 7: return 'ocean_abyss';
      case 8: return 'hyper_polyhedra';
      case 9: return 'dna_helix';
      case 10: return 'laser_prism';
      case 11: return 'supernova_nebula';
      case 12: return 'chladni_soundwave';
      default: return 'quantum_collider';
    }
  };

  const currentThemeId = selectedTheme === 'auto' ? getAutoTheme(activeSection) : selectedTheme;
  const currentCatalogItem = VFX_MASTER_CATALOG.find(item => item.id === currentThemeId) || VFX_MASTER_CATALOG[0];
  const ActiveComponent = currentCatalogItem.component;

  const handleSelectTheme = (id) => {
    setSelectedTheme(id);
    try {
      localStorage.setItem('dav_active_vfx_theme', id);
    } catch (e) {}
  };

  return (
    <>
      {/* 1. Active High-Performance Background Animation Canvas */}
      <ActiveComponent />

      {/* 2. Floating Sleek Animation Studio Switcher Button (Bottom-Right) */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
        {!isStudioOpen ? (
          <button
            type="button"
            onClick={() => setIsStudioOpen(true)}
            className="group py-2 px-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white border border-amber-400/40 hover:border-amber-400 shadow-xl shadow-amber-950/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            title="Open High-Quality Animation Studio"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950">
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Animation Studio</span>
              <span className="text-xs font-black text-slate-200 line-clamp-1">{currentCatalogItem.title}</span>
            </div>
          </button>
        ) : (
          /* Expanded Studio Drawer */
          <div className="w-80 sm:w-96 max-h-[75vh] bg-slate-950/95 border-2 border-amber-400/60 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col overflow-hidden text-white animate-fadeIn">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-b border-amber-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">VFX Animation Studio</h4>
                  <p className="text-[10px] text-slate-400">11 Section 2-Caliber 60 FPS Animations</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsStudioOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Smart Auto Mode Pill */}
            <div className="px-4 pt-3 pb-1">
              <button
                type="button"
                onClick={() => handleSelectTheme('auto')}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  selectedTheme === 'auto'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Smart Adaptive Auto (Changes Per Section)</span>
                </div>
                {selectedTheme === 'auto' && <Check className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            </div>

            {/* Catalog List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[50vh] pr-2">
              {VFX_MASTER_CATALOG.map((item) => {
                const isSelected = selectedTheme !== 'auto' && selectedTheme === item.id;
                const isCurrentActive = currentThemeId === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTheme(item.id)}
                    className={`w-full p-2.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-950/40'
                        : isCurrentActive
                        ? 'bg-slate-900 border-amber-500/40 text-slate-200'
                        : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <strong className="text-xs font-black text-white truncate">{item.title}</strong>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VfxMasterDirector;
