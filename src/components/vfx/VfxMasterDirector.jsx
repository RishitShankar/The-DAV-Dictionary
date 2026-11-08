import React from 'react';
import { 
  Sparkles, Compass, Cpu, 
  Layers, Waves, Box, Sun, Binary, CloudRain, Zap, Music, Dna, Train, Eye, Shield, Orbit
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
import { VfxBulletTrain } from './VfxBulletTrain';
import { VfxAuroraBorealis } from './VfxAuroraBorealis';
import { VfxCyberHexGrid } from './VfxCyberHexGrid';
import { VfxGravityBlackHole } from './VfxGravityBlackHole';

// Empty clean component for default view
const VfxCleanDefault = () => null;

export const VFX_MASTER_CATALOG = [
  {
    id: 'clean_none',
    title: 'Clean Original Platform Default',
    subtitle: 'Standard clean aesthetic without background animations',
    icon: Shield,
    color: 'from-slate-600 to-slate-800',
    component: VfxCleanDefault
  },
  {
    id: 'bullet_train',
    title: 'Sci-Fi Shinkansen Bullet Train',
    subtitle: 'Aerodynamic Maglev train, supersonic motion blur, neon sparks & city skyline',
    icon: Train,
    color: 'from-cyan-500 to-blue-600',
    component: VfxBulletTrain
  },
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
  },
  {
    id: 'aurora_borealis',
    title: 'Cosmic Aurora Polar Lights',
    subtitle: 'Ethereal shimmering green and violet light curtains flowing in the polar sky',
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-600',
    component: VfxAuroraBorealis
  },
  {
    id: 'cyber_hex_grid',
    title: 'Cybernetic Honeycomb Shield',
    subtitle: 'Hexagonal holographic forcefield with interactive electrical wavefront ripples',
    icon: Shield,
    color: 'from-sky-500 to-indigo-600',
    component: VfxCyberHexGrid
  },
  {
    id: 'gravity_black_hole',
    title: 'Kerr Gravitational Singularity',
    subtitle: 'Relativistic black hole with glowing accretion gas disk and event horizon',
    icon: Orbit,
    color: 'from-amber-600 to-rose-600',
    component: VfxGravityBlackHole
  }
];

/**
 * VfxMasterDirector:
 * Only renders an animation if explicitly configured in sectionVfxMap for the active section!
 * NO floating switcher button on the page (all management moved to Settings Hub).
 */
export function VfxMasterDirector({ activeSection = 1, sectionVfxMap = {} }) {
  const chosenAnimationId = sectionVfxMap[activeSection];
  if (!chosenAnimationId || chosenAnimationId === 'clean_none') {
    return null;
  }

  const catalogItem = VFX_MASTER_CATALOG.find(item => item.id === chosenAnimationId);
  if (!catalogItem || !catalogItem.component) return null;

  const ActiveComponent = catalogItem.component;
  return <ActiveComponent />;
}
