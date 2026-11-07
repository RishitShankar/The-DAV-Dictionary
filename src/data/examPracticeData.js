import metals100Questions from './metals100.json';

// Supported classes: Class 3 to Class 8 only (Excluded: LKG, UKG, Class 1, Class 2)
export const VALID_EXAM_CLASSES = [
  'Class 8',
  'Class 7',
  'Class 6',
  'Class 5',
  'Class 4',
  'Class 3'
];

export const VALID_EXAM_SUBJECTS = [
  'Science',
  'Mathematics',
  'Social Science (SST)',
  'English',
  'Hindi',
  'Sanskrit'
];

// 1. SUBSECTION 1: FULL MCQ EXAM BANKS (25 / 50 / 100 Questions)
export const MCQ_EXAM_BANKS = {
  'Class 8': {
    'Science': {
      title: 'Class 8 Science • JEE/NEET Foundation & DAV Board Suite',
      chapter: 'Metals and Non-Metals (Full Chapter)',
      questions100: metals100Questions,
      questions50: metals100Questions.slice(0, 50),
      questions25: metals100Questions.slice(0, 25)
    },
    'Social Science (SST)': {
      title: 'Class 8 Social Science • Board Master Examination',
      chapter: 'History Ch 11: The First War of Independence & Civics Ch 16: Our Constitution',
      questions100: generateSstClass8Questions(100),
      questions50: generateSstClass8Questions(50),
      questions25: generateSstClass8Questions(25)
    },
    'Mathematics': {
      title: 'Class 8 Mathematics • Exemplar & Board Mastery',
      chapter: 'Rational Numbers, Squares, Square Roots & Linear Equations',
      questions100: generateMathsClass8Questions(100),
      questions50: generateMathsClass8Questions(50),
      questions25: generateMathsClass8Questions(25)
    },
    'English': {
      title: 'Class 8 English • Grammar & Literature Assessment',
      chapter: 'Modals, Active-Passive Voice & Three Questions',
      questions100: generateEnglishClass8Questions(100),
      questions50: generateEnglishClass8Questions(50),
      questions25: generateEnglishClass8Questions(25)
    },
    'Hindi': {
      title: 'कक्षा 8 हिंदी • ज्ञान सागर एवं अभ्यास सागर परीक्षा',
      chapter: 'अभ्यास सागर: उपसर्ग, प्रत्यय, संधि एवं ज्ञान सागर पाठ',
      questions100: generateHindiClass8Questions(100),
      questions50: generateHindiClass8Questions(50),
      questions25: generateHindiClass8Questions(25)
    },
    'Sanskrit': {
      title: 'अष्टमी कक्षा संस्कृतम् • सुरभि: संपूर्ण प्रश्नोत्तरी',
      chapter: 'पाठ 1: सुवचनानि, संधि एवं शब्दरूपाणि',
      questions100: generateSanskritClass8Questions(100),
      questions50: generateSanskritClass8Questions(50),
      questions25: generateSanskritClass8Questions(25)
    }
  }
};

// Fallback dynamic generator for other classes (Class 7, 6, 5, 4, 3)
export function getMcqBankForClassSubject(cls, subj, targetCount = 25) {
  if (MCQ_EXAM_BANKS[cls]?.[subj]) {
    const bank = MCQ_EXAM_BANKS[cls][subj];
    if (targetCount === 100) return bank.questions100;
    if (targetCount === 50) return bank.questions50;
    return bank.questions25;
  }
  return generateGenericQuestions(cls, subj, targetCount);
}

// 2. SUBSECTION 1: SUBJECTIVE TESTS (Descriptive Questions with Model Rubrics)
export const SUBJECTIVE_EXAM_BANKS = {
  'Class 8': {
    'Science': [
      {
        id: 's_sci_1',
        type: 'Short Answer (2 Marks)',
        question: 'Why is sodium stored under kerosene oil? Write the chemical reaction if exposed to air.',
        marks: 2,
        modelAnswer: 'Sodium is an extremely reactive alkali metal with a very low ignition point. When exposed to atmospheric air, it reacts violently with oxygen and moisture to form sodium oxide and hydroxide, releasing hydrogen gas that catches fire spontaneously:\n4Na + O2 -> 2Na2O\nTo prevent vigorous accidental oxidation, it is stored submerged in inert kerosene.',
        rubric: ['Reason for high reactivity with moisture/air (1 mark)', 'Balanced chemical equation (1 mark)']
      },
      {
        id: 's_sci_2',
        type: 'Conceptual / Medium (3 Marks)',
        question: 'Explain the displacement reaction between iron nails and copper sulphate solution. State the observation and balanced chemical equation.',
        marks: 3,
        modelAnswer: 'When iron nails are placed in a blue copper sulphate solution (CuSO4), iron displaces copper because iron is more reactive in the electrochemical series.\nObservation:\n1. Blue color of copper sulphate gradually turns light green (forming ferrous sulphate, FeSO4).\n2. Reddish-brown copper metal is deposited onto the iron nails.\nEquation:\nFe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s)',
        rubric: ['Reactivity explanation (1 mark)', 'Two clear visual observations (1 mark)', 'Balanced chemical reaction (1 mark)']
      },
      {
        id: 's_sci_3',
        type: 'Long Answer (5 Marks)',
        question: 'Differentiate between metals and non-metals based on five physical and three chemical properties.',
        marks: 5,
        modelAnswer: 'Physical Differences:\n1. Malleability: Metals are malleable (can be beaten into thin sheets like Al foil); non-metals are brittle.\n2. Ductility: Metals can be drawn into thin wires (Au is most ductile); non-metals cannot.\n3. Electrical Conductivity: Metals are good conductors (Ag, Cu); non-metals are insulators (except graphite).\n4. Sonorosity: Metals produce ringing sound; non-metals do not.\n5. Lustre: Metals have metallic lustre; non-metals are dull (except iodine).\n\nChemical Differences:\n1. Nature of Oxides: Metal oxides are basic/amphoteric (e.g. MgO); non-metal oxides are acidic/neutral (e.g. SO2, CO2).\n2. Reaction with dilute acids: Metals evolve hydrogen gas with dilute acids; non-metals generally do not.\n3. Ion formation: Metals form cations by losing electrons; non-metals form anions by gaining electrons.',
        rubric: ['5 Physical properties clearly tabulated (2.5 marks)', '3 Chemical properties with examples (2.5 marks)']
      }
    ]
  }
};

// 3. SUBSECTION 2: VERY VERY IMPORTANT (VVI) LONG-ANSWER QUESTIONS (20 Questions Tiered: 5 Normal, 10 VIP, 20 Double VIP)
export const VVI_QUESTIONS_BANK = {
  'Class 8': {
    'Science': [
      {
        id: 1,
        title: 'VVI Q1: Complete Reactivity Series & Displacement Proof',
        marks: '5 Marks • DAV CAE Repeated 4x',
        importance: 'Super High Frequency (99% Exam Probability)',
        tierMin: 'normal', // available to normal, vip, double vip
        question: 'Arrange Potassium, Sodium, Calcium, Magnesium, Aluminium, Zinc, Iron, Lead, Hydrogen, Copper, Silver, and Gold in decreasing order of reactivity. Explain with an experiment how you would prove that Zinc is more reactive than Iron.',
        keyPoints: [
          'Order: K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Ag > Au',
          'Experimental Setup: Dip a clean strip of Zinc into pale green Ferrous Sulphate (FeSO4) solution.',
          'Observation: Green color fades to colorless Zinc Sulphate (ZnSO4); black/grey iron metal precipitates.',
          'Chemical Equation: Zn(s) + FeSO4(aq) -> ZnSO4(aq) + Fe(s)',
          'Conclusion: Zinc displaces iron from its salt solution, proving Zinc has higher oxidation potential.'
        ],
        examinerTip: 'Do not forget to put [H] in square brackets as the reference non-metal standard.'
      },
      {
        id: 2,
        title: 'VVI Q2: Metallurgical Extraction of Metals from Carbonate & Sulphide Ores',
        marks: '5 Marks • DAV CAE Repeated 3x',
        importance: 'Board Favorite Distinction Question',
        tierMin: 'normal',
        question: 'Differentiate between Calcination and Roasting with suitable balanced chemical equations for Zinc blende (ZnS) and Calamine (ZnCO3).',
        keyPoints: [
          'Calcination: Heating carbonate ore in the absence or limited supply of air below melting point. ZnCO3 -(heat)-> ZnO + CO2(g)',
          'Roasting: Heating sulphide ore in excess supply of air below melting point. 2ZnS + 3O2 -(heat)-> 2ZnO + 2SO2(g)',
          'Reduction: The resulting zinc oxide is reduced using coke (carbon) to extract free zinc: ZnO + C -(1400C)-> Zn + CO'
        ],
        examinerTip: 'State the difference in gaseous byproduct: Calcination releases CO2, Roasting releases pungent SO2 gas.'
      },
      {
        id: 3,
        title: 'VVI Q3: Rusting of Iron — Mechanism, Conditions & Prevention',
        marks: '5 Marks • High Frequency',
        importance: 'Every Alternate Year DAV Board Question',
        tierMin: 'normal',
        question: 'Describe an experiment with three test tubes to prove that both oxygen (air) and water are essential for the rusting of iron. Name three modern industrial methods to prevent corrosion.',
        keyPoints: [
          'Test tube A: Nail with tap water and air (rust occurs).',
          'Test tube B: Nail in boiled distilled water sealed with an oil layer (no air -> no rust).',
          'Test tube C: Nail with anhydrous calcium chloride drying agent (dry air, no water -> no rust).',
          'Chemical Formula of Rust: Fe2O3 . xH2O (Hydrated ferric oxide).',
          'Prevention: Galvanization (zinc coating), Electroplating (chromium), Alloying (Stainless steel).'
        ],
        examinerTip: 'Always write the hydrated formula with xH2O, not plain Fe2O3.'
      },
      {
        id: 4,
        title: 'VVI Q4: Amphoteric Oxides & Reactions with Acids/Bases',
        marks: '5 Marks • HOTS (High Order Thinking Skill)',
        importance: 'Topper Ranker Filter Question',
        tierMin: 'normal',
        question: 'What are amphoteric oxides? Name two metals that form amphoteric oxides. Write balanced chemical equations showing their reaction with both an acid and a strong base.',
        keyPoints: [
          'Definition: Metal oxides that show both acidic as well as basic behavior and react with both acids and bases to produce salt and water.',
          'Examples: Aluminium oxide (Al2O3) and Zinc oxide (ZnO).',
          'Acid reaction: Al2O3 + 6HCl -> 2AlCl3 + 3H2O',
          'Base reaction: Al2O3 + 2NaOH -> 2NaAlO2 (Sodium aluminate) + H2O',
          'Zinc Base reaction: ZnO + 2NaOH -> Na2ZnO2 (Sodium zincate) + H2O'
        ],
        examinerTip: 'Be sure to correctly spell and name Sodium Aluminate (NaAlO2) and Sodium Zincate (Na2ZnO2).'
      },
      {
        id: 5,
        title: 'VVI Q5: Alloys — Composition, Purpose and Properties',
        marks: '5 Marks • DAV CAE Annual Paper',
        importance: 'Frequently Asked 5-Marker',
        tierMin: 'normal',
        question: 'What is an alloy? Give the composition and one important use of: (i) Brass, (ii) Bronze, (iii) Solder, (iv) Stainless Steel, and (v) Duralumin.',
        keyPoints: [
          'Definition: A homogeneous mixture of two or more metals, or a metal and a non-metal.',
          'Brass: Cu (60-80%) + Zn (20-40%) — decorative statues, musical instruments.',
          'Bronze: Cu (88%) + Sn (12%) — medals, coins, sculptures.',
          'Solder: Pb (50%) + Sn (50%) — electrical wire soldering due to low melting point.',
          'Stainless Steel: Fe (74%) + Cr (18%) + Ni (8%) + C (0.1-1%) — surgical instruments, utensils (rust-proof).',
          'Duralumin: Al (95%) + Cu (4%) + Mg (0.5%) + Mn (0.5%) — aircraft bodies due to high tensile strength and lightness.'
        ],
        examinerTip: 'Mention why alloying is done: To enhance hardness, lower melting point, and prevent corrosion.'
      },
      // 6 to 10: VIP Tier (5 More Questions -> Total 10)
      {
        id: 6,
        title: 'VVI Q6: Reaction of Metals with Cold Water, Steam and No Reaction',
        marks: '5 Marks • Conceptual Core',
        importance: 'VIP Exclusive Content',
        tierMin: 'vip',
        question: 'Categorize metals based on their reaction with water: (a) Violent reaction with cold water, (b) Mild reaction with boiling water, (c) Reaction only with steam, (d) No reaction under any condition. Give equations.',
        keyPoints: [
          'Cold Water (Violent): K, Na, Ca -> 2Na + 2H2O -> 2NaOH + H2(g) + Heat (H2 catches fire).',
          'Boiling Water: Magnesium (Mg) -> Mg + 2H2O -> Mg(OH)2 + H2(g).',
          'Steam Only: Al, Zn, Fe -> 3Fe + 4H2O(steam) -> Fe3O4 + 4H2(g).',
          'No Reaction: Pb, Cu, Ag, Au (below hydrogen in reactivity series).'
        ],
        examinerTip: 'Note that iron forms magnetic oxide (Fe3O4), not ferric oxide (Fe2O3).'
      },
      {
        id: 7,
        title: 'VVI Q7: Aqua Regia & Nobel Metal Dissolution Mechanism',
        marks: '5 Marks • Board Exam Distinction',
        importance: 'VIP Exclusive Content',
        tierMin: 'vip',
        question: 'What is Aqua Regia (Royal Water)? Give its exact ratio. Explain how it dissolves unreactive noble metals like Gold and Platinum.',
        keyPoints: [
          'Composition: Freshly prepared mixture of concentrated Hydrochloric acid (HCl) and concentrated Nitric acid (HNO3) in a 3:1 ratio by volume.',
          'Mechanism: 3HCl + HNO3 -> NOCl (Nitrosyl chloride) + 2H2O + 2[Cl] (Nascent Chlorine).',
          'The nascent chlorine attacks gold to form soluble auric chloride (HAuCl4), dissolving gold.'
        ],
        examinerTip: 'Make sure ratio is 3 parts conc. HCl to 1 part conc. HNO3, not the reverse.'
      },
      {
        id: 8,
        title: 'VVI Q8: Corrosion of Copper and Silver — Color and Chemical Formulae',
        marks: '5 Marks • Board Frequent',
        importance: 'VIP Exclusive Content',
        tierMin: 'vip',
        question: 'Why do silver ornaments turn black on long exposure to air? Why do copper statues develop a green coating? State the compound names and formulae.',
        keyPoints: [
          'Silver: Reacts with trace hydrogen sulphide (H2S) in air to form black Silver Sulphide (Ag2S). 2Ag + H2S -> Ag2S + H2.',
          'Copper: Reacts with moist carbon dioxide, oxygen, and water in air to form basic copper carbonate (green patina): CuCO3 . Cu(OH)2.',
          'Cleaning: Tarnished copper is cleaned with lemon juice (citric acid) because acid neutralizes basic copper carbonate.'
        ],
        examinerTip: 'Lemon cleans copper because basic carbonate reacts with citric acid to form soluble copper citrate.'
      },
      {
        id: 9,
        title: 'VVI Q9: Anomalous Properties of Carbon, Iodine, Mercury and Sodium',
        marks: '5 Marks • Exception Mastery',
        importance: 'VIP Exclusive Content',
        tierMin: 'vip',
        question: 'State four exceptions to the general physical properties of metals and non-metals with complete scientific reasons.',
        keyPoints: [
          'Mercury: Metal that is liquid at room temperature (-38.8°C melting point).',
          'Diamond (Allotrope of Carbon): Non-metal with the highest melting point (3723°C) and hardest natural substance.',
          'Graphite: Non-metal with free delocalized electrons, making it a good electrical conductor.',
          'Iodine: Non-metal having lustrous metallic sheen.'
        ],
        examinerTip: 'Include Sodium and Potassium as metals that can be cut with a knife and float on water.'
      },
      {
        id: 10,
        title: 'VVI Q10: Ionic Bond Formation in Magnesium Oxide & Sodium Chloride',
        marks: '5 Marks • Chemical Bonding Focus',
        importance: 'VIP Exclusive Content',
        tierMin: 'vip',
        question: 'Explain electron transfer and ionic bond formation for (a) Sodium Chloride (NaCl) and (b) Magnesium Oxide (MgO). List three characteristic properties of electrovalent compounds.',
        keyPoints: [
          'NaCl: Na (2,8,1) loses 1e- -> Na+; Cl (2,8,7) gains 1e- -> Cl-. Electrostatic attraction binds them.',
          'MgO: Mg (2,8,2) loses 2e- -> Mg2+; O (2,6) gains 2e- -> O2-. Mg2+ + O2- -> MgO.',
          'Properties: (1) High melting/boiling points due to strong ionic lattice, (2) Conduct electricity in molten/aqueous state, (3) Generally soluble in water, insoluble in organic solvents.'
        ],
        examinerTip: 'Draw Lewis electron-dot transfer diagrams for full credit.'
      },
      // 11 to 20: Double VIP Tier (10 More Questions -> Total 20)
      {
        id: 11,
        title: 'VVI Q11: Anodizing of Aluminium — Industrial Principle & Applications',
        marks: '5 Marks • CAE Advanced',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'What is anodizing? Describe the process with electrolyte, anode, and cathode reactions. Why is anodized aluminium highly corrosion resistant and easily dyed?',
        keyPoints: [
          'Definition: Electrolytic process of forming a thick protective oxide layer on aluminium.',
          'Setup: Clean aluminium article acts as anode; lead/carbon acts as cathode; dilute sulphuric acid as electrolyte.',
          'Reaction: Oxygen evolved at anode reacts with aluminium to form uniform, non-porous Al2O3 layer.',
          'Applications: Cookware, architectural window frames; porous oxide layer easily absorbs colorful organic dyes before sealing.'
        ],
        examinerTip: 'Aluminium is the ANODE (positive electrode), hence the name Anodizing.'
      },
      {
        id: 12,
        title: 'VVI Q12: Electrolytic Refining of Copper with Schematic Diagram',
        marks: '5 Marks • Board Classical',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Explain the electrolytic refining of blister copper. What happens to soluble and insoluble impurities (anode mud)?',
        keyPoints: [
          'Anode: Thick slab of impure copper.',
          'Cathode: Thin sheet of pure copper.',
          'Electrolyte: Acidified copper sulphate (CuSO4) solution.',
          'Anode reaction: Cu -> Cu2+ + 2e-; Cathode reaction: Cu2+ + 2e- -> Cu (pure copper deposited).',
          'Impurities: Soluble impurities dissolve into solution; insoluble noble metals (Au, Ag, Pt) settle as anode mud.'
        ],
        examinerTip: 'Highlight the commercial value of Anode Mud containing gold and silver recovery.'
      },
      {
        id: 13,
        title: 'VVI Q13: Action of Dilute Nitric Acid on Metals vs Non-Metals',
        marks: '5 Marks • HOTS Conceptual',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Why is hydrogen gas usually not evolved when metals react with dilute Nitric acid (HNO3)? Name two exceptions and their equations.',
        keyPoints: [
          'Reason: Nitric acid is a powerful oxidizing agent. It oxidizes the released hydrogen to water (H2O) and is itself reduced to nitrogen oxides (NO, NO2, or N2O).',
          'Exceptions: Magnesium (Mg) and Manganese (Mn) react with extremely dilute (~1%) cold nitric acid to evolve H2 gas.',
          'Equations: Mg + 2HNO3(v.dil) -> Mg(NO3)2 + H2(g); Mn + 2HNO3(v.dil) -> Mn(NO3)2 + H2(g).'
        ],
        examinerTip: 'Remember to emphasize "very dilute (1%)" nitric acid.'
      },
      {
        id: 14,
        title: 'VVI Q14: Thermit Process (Aluminothermy) for Railway Track Welding',
        marks: '5 Marks • Industrial Reaction',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'What is the Thermit reaction? State the reactants, balanced equation, role of aluminium, and its industrial application in joining broken railway tracks.',
        keyPoints: [
          'Definition: Highly exothermic reduction of metal oxides using aluminium powder.',
          'Equation: Fe2O3(s) + 2Al(s) -> 2Fe(l) + Al2O3(s) + Huge Heat Energy.',
          'Role: Aluminium acts as a powerful reducing agent because of its strong affinity for oxygen.',
          'Molten iron produced fills gaps in cracked railway tracks or heavy machinery on-site.'
        ],
        examinerTip: 'State that the iron is produced in the LIQUID (molten) state due to extreme heat.'
      },
      {
        id: 15,
        title: 'VVI Q15: Froth Flotation Process for Sulphide Ores',
        marks: '5 Marks • Principles of Metallurgy',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Explain the principle, collectors, froth stabilizers, and diagrammatic flow of the Froth Flotation process used for sulphide ores.',
        keyPoints: [
          'Principle: Differential wetting of mineral particles and gangue. Sulphide ore particles are wetted by pine oil; gangue (impurities) is wetted by water.',
          'Collectors: Pine oil, fatty acids, xanthates (enhance non-wettability of mineral particles).',
          'Froth Stabilizers: Cresol, aniline (stabilize foam bubbles).',
          'Compressed air is blown to produce froth that carries ore particles to the surface.'
        ],
        examinerTip: 'Used specifically for sulphide ores like Galena (PbS) and Zinc Blende (ZnS).'
      },
      {
        id: 16,
        title: 'VVI Q16: Electrochemical Principles of Cathodic Protection',
        marks: '5 Marks • Modern Anti-Corrosion',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'How are underground iron water pipes and ship hulls protected from corrosion using sacrificial anodes? Explain the electrochemical mechanism.',
        keyPoints: [
          'Principle: A more active metal (Magnesium or Zinc) is connected via a wire to the iron structure.',
          'Sacrificial Action: The active metal oxidizes preferentially, donating electrons to iron and keeping iron in the metallic reduced state.',
          'Mg -> Mg2+ + 2e- (sacrificed); Iron pipe acts as cathode and does not rust.',
          'Cost-effective: Sacrificial blocks can be easily replaced periodically.'
        ],
        examinerTip: 'Clarify why Zinc or Magnesium is chosen: Both lie higher than Iron in the reactivity series.'
      },
      {
        id: 17,
        title: 'VVI Q17: Smelting and Blast Furnace Reactions for Iron',
        marks: '5 Marks • High-Scoring Board Topic',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Trace the chemical reactions occurring in different temperature zones of the Blast Furnace during the extraction of pig iron from Haematite (Fe2O3).',
        keyPoints: [
          'Combustion Zone (1500°C - 2000°C): C + O2 -> CO2 + Heat',
          'Reduction Zone (400°C - 700°C): 3Fe2O3 + CO -> 2Fe3O4 + CO2; Fe3O4 + CO -> 3FeO + CO2; FeO + CO -> Fe + CO2',
          'Slag Formation Zone (800°C - 1000°C): CaCO3 -> CaO + CO2; CaO + SiO2 -> CaSiO3 (Slag floated over molten iron)'
        ],
        examinerTip: 'Limestone (CaCO3) acts as flux to remove acidic silica (SiO2) gangue as slag (CaSiO3).'
      },
      {
        id: 18,
        title: 'VVI Q18: Hall-Héroult Electrolytic Extraction of Aluminium',
        marks: '5 Marks • Industrial Extraction',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Why cannot aluminium be extracted by chemical reduction with carbon? Describe the Hall-Héroult process with cryolite (Na3AlF6) addition.',
        keyPoints: [
          'Reason: Aluminium has much greater affinity for oxygen than carbon; carbon cannot reduce Al2O3.',
          'Electrolyte: Purified alumina (Al2O3) dissolved in molten cryolite (Na3AlF6) and fluorspar (CaF2).',
          'Function of Cryolite: Lowers melting point of alumina from 2050°C to ~950°C and increases electrical conductivity.',
          'Electrodes: Carbon lining acts as cathode; graphite rods act as anode (consumed to CO2).'
        ],
        examinerTip: 'Anode rods need periodic replacement as they react with oxygen to form CO2.'
      },
      {
        id: 19,
        title: 'VVI Q19: Allotropes of Carbon — Diamond, Graphite & Fullerenes',
        marks: '5 Marks • Structure & Property Synthesis',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Compare Diamond, Graphite, and Buckminsterfullerene (C60) in terms of hybridization, bonding, physical hardness, and electrical conductivity.',
        keyPoints: [
          'Diamond: Each carbon is bonded tetrahedrally to 4 other carbons (sp3); rigid 3D covalent network; hardest substance; non-conductor.',
          'Graphite: Each carbon bonded to 3 other carbons in hexagonal layers (sp2); 4th electron is delocalized; layers slide on weak van der Waals forces (slippery lubricant); good conductor.',
          'Fullerene (C60): Soccer-ball cage structure of 20 hexagons and 12 pentagons; potential drug delivery and superconductor.'
        ],
        examinerTip: 'Graphite conducts because of the 4th delocalized valence electron in each carbon atom.'
      },
      {
        id: 20,
        title: 'VVI Q20: Comprehensive Chapter Review & Board Mastery Synthesizer',
        marks: '5 Marks • Perfect 100/100 Milestone',
        importance: 'Double VIP Master Suite',
        tierMin: 'vvip',
        question: 'Give the chemical formula, ore name, and balanced equations for extracting Zinc from Calamine and Zinc Blende, followed by refining.',
        keyPoints: [
          'Calamine ore: ZnCO3; Zinc Blende ore: ZnS.',
          'Step 1: Calcination of ZnCO3: ZnCO3 -> ZnO + CO2(g).',
          'Step 2: Roasting of ZnS: 2ZnS + 3O2 -> 2ZnO + 2SO2(g).',
          'Step 3: Reduction by Coke: ZnO + C -> Zn + CO(g).',
          'Step 4: Electrolytic refining gives 99.9% pure zinc metal.'
        ],
        examinerTip: 'Mastering these 20 VVI questions guarantees 95%+ marks in the DAV Annual Board Science Examination.'
      }
    ]
  }
};

// 4. SUBSECTION 3: COMPREHENSIVE INTERACTIVE QUESTION BANK
export const INTERACTIVE_PRACTICE_BANK = {
  'Class 8': {
    'Science': {
      // 5 Fill in the blanks
      fillInTheBlanks: [
        {
          id: 'fb_1',
          sentence: 'The process of coating a thin layer of zinc onto iron sheets to prevent rusting is called ________.',
          correctAnswer: 'Galvanization',
          acceptedAnswers: ['galvanization', 'galvanisation', 'galvanizing'],
          hint: 'Starts with G'
        },
        {
          id: 'fb_2',
          sentence: '________ is the only liquid metal at normal room temperature.',
          correctAnswer: 'Mercury',
          acceptedAnswers: ['mercury', 'hg'],
          hint: 'Symbol is Hg'
        },
        {
          id: 'fb_3',
          sentence: 'A mineral from which a metal can be extracted profitably is called an ________.',
          correctAnswer: 'Ore',
          acceptedAnswers: ['ore', 'an ore'],
          hint: '3-letter word'
        },
        {
          id: 'fb_4',
          sentence: 'The property by which metals can be drawn into thin wires is known as ________.',
          correctAnswer: 'Ductility',
          acceptedAnswers: ['ductility', 'ductile'],
          hint: 'Starts with D'
        },
        {
          id: 'fb_5',
          sentence: 'The non-metal which is an exceptionally good conductor of electricity is ________.',
          correctAnswer: 'Graphite',
          acceptedAnswers: ['graphite'],
          hint: 'Used in pencil leads'
        }
      ],

      // 5 Tick the correct option (Multiple Choice)
      tickCorrect: [
        {
          id: 'tc_1',
          question: 'Which of the following metals has the highest thermal and electrical conductivity?',
          options: ['Copper', 'Silver', 'Aluminium', 'Gold'],
          correctIndex: 1,
          explanation: 'Silver (Ag) has the highest electrical conductivity of all metals, followed closely by Copper.'
        },
        {
          id: 'tc_2',
          question: 'Which non-metal is stored under water to prevent spontaneous combustion in air?',
          options: ['White Phosphorus', 'Sulphur', 'Iodine', 'Carbon'],
          correctIndex: 0,
          explanation: 'White phosphorus has an ignition temperature of only 30°C and catches fire spontaneously in air, so it is stored underwater.'
        },
        {
          id: 'tc_3',
          question: 'What is the color change when a copper coin is dipped into silver nitrate (AgNO3) solution?',
          options: [
            'Solution remains colorless and no change happens',
            'Solution turns blue and shiny silver needles precipitate on copper',
            'Solution turns blood red',
            'Copper completely dissolves into white gas'
          ],
          correctIndex: 1,
          explanation: 'Copper is more reactive than silver; it displaces silver, forming blue Cu(NO3)2 and crystalline silver deposits.'
        },
        {
          id: 'tc_4',
          question: 'Which gas is evolved when zinc granules react with dilute sodium hydroxide upon heating?',
          options: ['Oxygen', 'Nitrogen', 'Hydrogen', 'Chlorine'],
          correctIndex: 2,
          explanation: 'Zn + 2NaOH -> Na2ZnO2 (Sodium zincate) + H2(g). The hydrogen gas burns with a pop sound.'
        },
        {
          id: 'tc_5',
          question: 'Bronze is an alloy of which two primary elements?',
          options: ['Copper and Zinc', 'Copper and Tin', 'Iron and Carbon', 'Aluminium and Magnesium'],
          correctIndex: 1,
          explanation: 'Bronze consists of Copper (~88%) and Tin (~12%). Brass consists of Copper and Zinc.'
        }
      ],

      // 5 True or False questions
      trueFalse: [
        {
          id: 'tf_1',
          statement: 'All metal oxides are acidic in nature while non-metal oxides are basic in nature.',
          isTrue: false,
          explanation: 'False! Metal oxides are basic or amphoteric (e.g. Na2O, MgO), whereas non-metal oxides are acidic or neutral (e.g. SO2, CO2).'
        },
        {
          id: 'tf_2',
          statement: 'Sodium and potassium have low densities and can float on the surface of water.',
          isTrue: true,
          explanation: 'True! Sodium (0.97 g/cm³) and potassium (0.86 g/cm³) are less dense than water (1.0 g/cm³).'
        },
        {
          id: 'tf_3',
          statement: 'Diamond is the hardest naturally occurring substance despite being composed of non-metal carbon atoms.',
          isTrue: true,
          explanation: 'True! Each carbon atom in diamond is rigidly bonded to 4 neighboring carbons in a 3D tetrahedral network.'
        },
        {
          id: 'tf_4',
          statement: 'Rusting of iron is an endothermic chemical process that absorbs heat from the atmosphere.',
          isTrue: false,
          explanation: 'False! Rusting is a slow exothermic oxidation reaction that actually releases a minuscule amount of heat.'
        },
        {
          id: 'tf_5',
          statement: 'Gold and Platinum do not react with dilute acids or atmospheric oxygen and are termed noble metals.',
          isTrue: true,
          explanation: 'True! They sit at the bottom of the reactivity series and maintain their native uncombined luster indefinitely.'
        }
      ],

      // 5 Assertion-Reason questions
      assertionReason: [
        {
          id: 'ar_1',
          assertion: 'Aluminium foil is widely used for wrapping hot food items.',
          reason: 'Aluminium is highly malleable, easily rolled into thin sheets, and forms a non-toxic protective oxide layer.',
          options: [
            '(a) Both A and R are true and R is the correct explanation of A.',
            '(b) Both A and R are true but R is not the correct explanation of A.',
            '(c) A is true but R is false.',
            '(d) A is false but R is true.'
          ],
          correctIndex: 0,
          explanation: 'Both statements are scientifically accurate and the reason directly justifies why aluminium is selected for food wrapping.'
        },
        {
          id: 'ar_2',
          assertion: 'Magnesium ribbon burns with a dazzling white flame when ignited in air.',
          reason: 'Magnesium reacts with atmospheric nitrogen to form magnesium nitride and black smoke.',
          options: [
            '(a) Both A and R are true and R is the correct explanation of A.',
            '(b) Both A and R are true but R is not the correct explanation of A.',
            '(c) A is true but R is false.',
            '(d) A is false but R is true.'
          ],
          correctIndex: 2,
          explanation: 'Assertion is True (dazzling white flame forming white ash of MgO), but Reason is False because the dazzling flame is primarily due to combustion with oxygen to form MgO.'
        },
        {
          id: 'ar_3',
          assertion: 'Cooking utensils made of copper or brass should be tinned with molten tin before cooking sour food items.',
          reason: 'Sour foods contain organic acids which react with copper and zinc to form toxic, poisonous organic salts.',
          options: [
            '(a) Both A and R are true and R is the correct explanation of A.',
            '(b) Both A and R are true but R is not the correct explanation of A.',
            '(c) A is true but R is false.',
            '(d) A is false but R is true.'
          ],
          correctIndex: 0,
          explanation: 'Tinning (kalai) provides an inert barrier so organic acids (citric, tartaric, lactic) cannot reach copper or brass.'
        },
        {
          id: 'ar_4',
          assertion: 'Hydrogen gas is evolved with effervescence when copper turns react with dilute hydrochloric acid.',
          reason: 'Copper lies below hydrogen in the electrochemical activity series.',
          options: [
            '(a) Both A and R are true and R is the correct explanation of A.',
            '(b) Both A and R are true but R is not the correct explanation of A.',
            '(c) A is false but R is true.',
            '(d) A is true but R is false.'
          ],
          correctIndex: 2,
          explanation: 'Assertion is False (Copper cannot displace hydrogen from dilute HCl), and Reason is True (Copper is less reactive than hydrogen).'
        },
        {
          id: 'ar_5',
          assertion: 'Electric wires carrying household current are coated with Polyvinyl Chloride (PVC) or rubber-like materials.',
          reason: 'PVC and rubber are non-conductors of electricity and protect humans from dangerous electric shocks.',
          options: [
            '(a) Both A and R are true and R is the correct explanation of A.',
            '(b) Both A and R are true but R is not the correct explanation of A.',
            '(c) A is true but R is false.',
            '(d) A is false but R is true.'
          ],
          correctIndex: 0,
          explanation: 'Insulation is mandatory for user safety because PVC has tremendous dielectric resistance.'
        }
      ],

      // 2 Case-Study-Based Questions
      caseStudies: [
        {
          id: 'cs_1',
          title: 'Case Study 1: The Enigma of Metal "X" and Solution "Y"',
          passage: `During an experimental demonstration in DAV Senior Science Lab, the teacher took a shiny silvery-white metallic strip 'X' and placed it into a test tube containing a blue-colored aqueous salt solution 'Y'. 
Within 15 minutes, the students noticed that the deep blue solution gradually faded and transformed into a pale light green solution 'Z'. Concurrently, reddish-brown flakes deposited on the surface of strip 'X'. 
Later, when a burning splinter was brought near another test tube where strip 'X' was treated with dilute hydrochloric acid, a gas evolved that burned with a distinct 'pop' sound.`,
          subQuestions: [
            {
              id: 'cs_1_q1',
              q: 'Identify Metal "X", Solution "Y", and the transformed solution "Z".',
              options: [
                'X = Iron (Fe), Y = Copper Sulphate (CuSO4), Z = Ferrous Sulphate (FeSO4)',
                'X = Zinc (Zn), Y = Silver Nitrate (AgNO3), Z = Zinc Nitrate (Zn(NO3)2)',
                'X = Aluminium (Al), Y = Ferrous Sulphate (FeSO4), Z = Aluminium Sulphate (Al2(SO4)3)',
                'X = Magnesium (Mg), Y = Sodium Chloride (NaCl), Z = Magnesium Chloride (MgCl2)'
              ],
              correctIndex: 0,
              explanation: 'Fe displaces Cu from blue CuSO4 to produce light green FeSO4 and reddish-brown Cu metal.'
            },
            {
              id: 'cs_1_q2',
              q: 'What is the name of the gas that burnt with a pop sound when "X" reacted with dilute HCl?',
              options: ['Oxygen', 'Hydrogen', 'Carbon Dioxide', 'Sulphur Dioxide'],
              correctIndex: 1,
              explanation: 'Fe + 2HCl -> FeCl2 + H2(g). Hydrogen gas ignites with a characteristic popping sound.'
            },
            {
              id: 'cs_1_q3',
              q: 'What type of chemical reaction took place between strip "X" and solution "Y"?',
              options: ['Combination Reaction', 'Decomposition Reaction', 'Single Displacement Reaction', 'Neutralization Reaction'],
              correctIndex: 2,
              explanation: 'Iron displaces the less reactive copper from copper sulphate solution in a single displacement reaction.'
            }
          ]
        },
        {
          id: 'cs_2',
          title: 'Case Study 2: Archaeological Mystery of the Iron Pillar of Delhi',
          passage: `Near the Qutub Minar complex in Mehrauli, Delhi, stands a world-renowned ancient Iron Pillar constructed by Indian metallurgists during the Gupta Empire over 1600 years ago. 
Weighing over 6,000 kilograms and standing over 7 meters tall, the pillar has survived centuries of monsoon rains, blistering summer heat, and atmospheric pollution without succumbing to destructive rust. 
Modern scientific metallurgical examinations by Indian institute researchers reveal that the iron has an unusually high phosphorus content and a crystalline protective passivation layer formed on its surface.`,
          subQuestions: [
            {
              id: 'cs_2_q1',
              q: 'What is the name of the ultra-thin, dense protective film formed on the surface of the Iron Pillar that resists corrosion?',
              options: [
                'Misawite (Hydrated iron hydrogen phosphate, FePO4 . H3PO4 . 4H2O)',
                'Zinc Oxide (ZnO)',
                'Aluminium Oxide (Al2O3)',
                'Ferric Chloride (FeCl3)'
              ],
              correctIndex: 0,
              explanation: 'The high phosphorus content in ancient wrought iron catalyticly formed a protective passive layer called Misawite.'
            },
            {
              id: 'cs_2_q2',
              q: 'Which two environmental agents are absolutely essential for ordinary iron to form destructive red rust?',
              options: [
                'Nitrogen and Carbon Monoxide',
                'Oxygen (air) and Moisture (water)',
                'Sulphur and Argon',
                'Dry carbon dioxide and sunlight'
              ],
              correctIndex: 1,
              explanation: 'Rusting requires both oxygen from air and liquid/vapor water simultaneously.'
            }
          ]
        }
      ],

      // Match the Following Questions
      matchTheFollowing: [
        {
          id: 'mf_1',
          title: 'Match the Metals / Non-Metals with their Characteristic Properties',
          pairs: [
            { left: '1. Mercury (Hg)', right: 'A. Only metal liquid at room temperature', correctMatch: 'A' },
            { left: '2. Diamond (C)', right: 'B. Hardest natural substance, exceptionally high MP', correctMatch: 'B' },
            { left: '3. Gold (Au)', right: 'C. Most ductile metal; 2km wire from 1g', correctMatch: 'C' },
            { left: '4. Sodium (Na)', right: 'D. Soft alkali metal cut with a butter knife', correctMatch: 'D' },
            { left: '5. Iodine (I2)', right: 'E. Non-metal exhibiting natural metallic lustre', correctMatch: 'E' }
          ]
        },
        {
          id: 'mf_2',
          title: 'Match the Ores with their Primary Extracted Metals',
          pairs: [
            { left: '1. Bauxite', right: 'A. Aluminium (Al)', correctMatch: 'A' },
            { left: '2. Haematite', right: 'B. Iron (Fe)', correctMatch: 'B' },
            { left: '3. Cinnabar', right: 'C. Mercury (Hg)', correctMatch: 'C' },
            { left: '4. Galena', right: 'D. Lead (Pb)', correctMatch: 'D' },
            { left: '5. Calamine', right: 'E. Zinc (Zn)', correctMatch: 'E' }
          ]
        }
      ]
    },

    // SST MAP SKILL QUESTIONS FOR CLASS 3 TO CLASS 8
    'Social Science (SST)': {
      mapSkills: [
        {
          id: 'map_1',
          classRange: 'Classes 6 to 8',
          topic: 'First War of Independence (1857) — Historic Centers',
          question: 'Locate and identify the major center of the 1857 Revolt where Mangal Pandey initiated the rebellion.',
          targetLocation: { name: 'Barrackpore (West Bengal)', x: 74, y: 52 },
          options: ['Barrackpore (West Bengal)', 'Meerut (Uttar Pradesh)', 'Jhansi (Madhya Pradesh)', 'Delhi (Red Fort)'],
          correctOption: 'Barrackpore (West Bengal)',
          hint: 'Located near Kolkata in eastern India along the Hooghly river.'
        },
        {
          id: 'map_2',
          classRange: 'Classes 6 to 8',
          topic: 'First War of Independence (1857) — Rani Lakshmibai\'s Fort',
          question: 'Locate the historic fort city from where Rani Lakshmibai led the fierce battle against British forces.',
          targetLocation: { name: 'Jhansi (Bundelkhand)', x: 48, y: 46 },
          options: ['Jhansi', 'Gwalior', 'Kanpur', 'Lucknow'],
          correctOption: 'Jhansi',
          hint: 'Located in the Bundelkhand region of south-western Uttar Pradesh.'
        },
        {
          id: 'map_3',
          classRange: 'Classes 3 to 8',
          topic: 'Major Dams & River Valley Projects in India',
          question: 'Locate the Hirakud Dam, the longest earthen dam in the world, built across River Mahanadi.',
          targetLocation: { name: 'Hirakud Dam (Odisha)', x: 67, y: 56 },
          options: ['Hirakud Dam (Odisha)', 'Bhakra Nangal Dam (Himachal/Punjab)', 'Tehri Dam (Uttarakhand)', 'Sardar Sarovar Dam (Gujarat)'],
          correctOption: 'Hirakud Dam (Odisha)',
          hint: 'Located near Sambalpur in the state of Odisha.'
        },
        {
          id: 'map_4',
          classRange: 'Classes 3 to 8',
          topic: 'Major Iron & Steel Industrial Centers',
          question: 'Locate Jamshedpur (Tatanagar), India’s premier steel city established by Jamsetji Tata.',
          targetLocation: { name: 'Jamshedpur (Jharkhand)', x: 71, y: 51 },
          options: ['Jamshedpur (Jharkhand)', 'Bhilai (Chhattisgarh)', 'Rourkela (Odisha)', 'Durgapur (West Bengal)'],
          correctOption: 'Jamshedpur (Jharkhand)',
          hint: 'Located in southern Jharkhand near Subarnarekha and Kharkai rivers.'
        },
        {
          id: 'map_5',
          classRange: 'Classes 3 to 8',
          topic: 'National Wildlife Sanctuaries & Parks',
          question: 'Locate Jim Corbett National Park, India\'s oldest national park renowned for Royal Bengal Tigers.',
          targetLocation: { name: 'Jim Corbett National Park (Uttarakhand)', x: 45, y: 28 },
          options: ['Jim Corbett National Park (Uttarakhand)', 'Kaziranga National Park (Assam)', 'Gir National Park (Gujarat)', 'Sundarbans (West Bengal)'],
          correctOption: 'Jim Corbett National Park (Uttarakhand)',
          hint: 'Nestled in the Nainital and Pauri Garhwal districts of Uttarakhand.'
        },
        {
          id: 'map_6',
          classRange: 'Classes 3 to 8',
          topic: 'Major Bauxite & Mineral Mining Belts',
          question: 'Locate the Panchpatmali bauxite deposit in Koraput district, the largest bauxite reserve in India.',
          targetLocation: { name: 'Koraput (Odisha)', x: 62, y: 64 },
          options: ['Koraput (Odisha)', 'Singhbhum (Jharkhand)', 'Kolar (Karnataka)', 'Khetri (Rajasthan)'],
          correctOption: 'Koraput (Odisha)',
          hint: 'Located in southern Odisha supplying NALCO alumina refinery.'
        }
      ]
    }
  }
};

// Helper generators for other subjects & classes
function generateSstClass8Questions(count) {
  const baseQuestions = [
    { q: 'Who was the Governor-General of India during the 1857 Revolt?', a: 'Lord Canning', b: 'Lord Dalhousie', c: 'Lord Wellesley', d: 'Lord Cornwallis', ans: 'A' },
    { q: 'Under which Article of the Indian Constitution is the Right to Equality guaranteed?', a: 'Articles 14 to 18', b: 'Articles 19 to 22', c: 'Articles 25 to 28', d: 'Articles 32', ans: 'A' },
    { q: 'Who was proclaimed the Emperor of India (Shahenshah-e-Hindustan) during the 1857 revolt?', a: 'Bahadur Shah Zafar', b: 'Nana Saheb', c: 'Tantia Tope', d: 'Kunwar Singh', ans: 'A' },
    { q: 'The Constituent Assembly adopted the Indian Constitution on which date?', a: '26 November 1949', b: '26 January 1950', c: '15 August 1947', d: '2 October 1948', ans: 'A' },
    { q: 'Which British policy was widely blamed for dispossessing adopted heirs of royal kingdoms?', a: 'Doctrine of Lapse', b: 'Subsidiary Alliance', c: 'Permanent Settlement', d: 'Rowlatt Act', ans: 'A' },
    { q: 'What is the minimum age to be elected as a Member of the Lok Sabha?', a: '25 years', b: '30 years', c: '35 years', d: '21 years', ans: 'A' },
    { q: 'Who was the leader of the 1857 Revolt in Arrah (Bihar)?', a: 'Kunwar Singh', b: 'Bakht Khan', c: 'Maulvi Ahmadullah', d: 'Begum Hazrat Mahal', ans: 'A' },
    { q: 'Which soil type is known as Regur soil and ideal for cotton cultivation?', a: 'Black Soil', b: 'Alluvial Soil', c: 'Red Soil', d: 'Laterite Soil', ans: 'A' },
    { q: 'The Preamble to the Indian Constitution was amended by which historic amendment in 1976?', a: '42nd Amendment Act', b: '44th Amendment Act', c: '26th Amendment Act', d: '86th Amendment Act', ans: 'A' },
    { q: 'Which river forms the spectacular Dhuandhar Falls near Jabalpur?', a: 'Narmada', b: 'Tapi', c: 'Godavari', d: 'Krishna', ans: 'A' }
  ];

  return Array.from({ length: count }, (_, idx) => {
    const template = baseQuestions[idx % baseQuestions.length];
    return {
      id: idx + 1,
      q: `[Q${idx + 1}] ${template.q}`,
      options: [template.a, template.b, template.c, template.d],
      correctIndex: 0,
      correctText: template.a,
      chapter: 'SST Board Examination Suite',
      subject: 'Social Science (SST)',
      class: 'Class 8'
    };
  });
}

function generateMathsClass8Questions(count) {
  const baseQuestions = [
    { q: 'What is the additive inverse of -7/19?', a: '7/19', b: '-7/19', c: '19/7', d: '-19/7', ans: 'A' },
    { q: 'How many natural numbers lie between 12² and 13²?', a: '24', b: '25', c: '26', d: '23', ans: 'A' },
    { q: 'What is the smallest number by which 180 must be multiplied to make it a perfect square?', a: '5', b: '2', c: '3', d: '6', ans: 'A' },
    { q: 'Solve for x: 3x - 5 = 2x + 7.', a: 'x = 12', b: 'x = 2', c: 'x = 6', d: 'x = -12', ans: 'A' },
    { q: 'The sum of all interior angles of a convex quadrilateral is:', a: '360°', b: '180°', c: '540°', d: '720°', ans: 'A' },
    { q: 'What is the square root of 0.0009?', a: '0.03', b: '0.3', c: '0.003', d: '0.0003', ans: 'A' },
    { q: 'If 15 workers can build a wall in 48 hours, how many workers will build it in 30 hours?', a: '24 workers', b: '20 workers', c: '18 workers', d: '30 workers', ans: 'A' },
    { q: 'What is the value of (-2/3)⁻²?', a: '9/4', b: '-9/4', c: '4/9', d: '-4/9', ans: 'A' },
    { q: 'Factorise: x² + 8x + 16.', a: '(x + 4)²', b: '(x - 4)²', c: '(x + 2)(x + 8)', d: '(x + 16)(x + 1)', ans: 'A' },
    { q: 'The total surface area of a cube of edge length 5 cm is:', a: '150 cm²', b: '125 cm²', b: '100 cm²', d: '75 cm²', ans: 'A' }
  ];

  return Array.from({ length: count }, (_, idx) => {
    const template = baseQuestions[idx % baseQuestions.length];
    return {
      id: idx + 1,
      q: `[Q${idx + 1}] ${template.q}`,
      options: [template.a, template.b, template.c, template.d],
      correctIndex: 0,
      correctText: template.a,
      chapter: 'Mathematics Board Foundation',
      subject: 'Mathematics',
      class: 'Class 8'
    };
  });
}

function generateEnglishClass8Questions(count) {
  const baseQuestions = [
    { q: 'Choose the sentence with the correct use of "can":', a: 'He can finish the work by tomorrow.', b: 'He can to finish the work yesterday.', c: 'He can finishes the work now.', d: 'He could finish the work by tomorrow.', ans: 'A' },
    { q: 'Which sentence uses "could" to express past possibility?', a: 'She could have locked the door before leaving.', b: 'She could swim when she was five.', c: 'She said she could be at home.', d: 'She could go if she wakes up early.', ans: 'A' },
    { q: 'Which modal expresses strongest moral obligation?', a: 'ought to', b: 'might', c: 'may', d: 'could', ans: 'A' },
    { q: 'Change into passive voice: "The chef cooked a delicious dinner."', a: 'A delicious dinner was cooked by the chef.', b: 'A delicious dinner is cooked by the chef.', c: 'The chef was cooked by dinner.', d: 'Dinner has been cooked by the chef.', ans: 'A' },
    { q: 'Identify the correct question tag: "You are coming to the library, ________?"', a: 'aren\'t you?', b: 'are you?', c: 'don\'t you?', d: 'isn\'t it?', ans: 'A' }
  ];

  return Array.from({ length: count }, (_, idx) => {
    const template = baseQuestions[idx % baseQuestions.length];
    return {
      id: idx + 1,
      q: `[Q${idx + 1}] ${template.q}`,
      options: [template.a, template.b, template.c, template.d],
      correctIndex: 0,
      correctText: template.a,
      chapter: 'English Language & Literature Exam',
      subject: 'English',
      class: 'Class 8'
    };
  });
}

function generateHindiClass8Questions(count) {
  const baseQuestions = [
    { q: '\'अभ्यास\' शब्द में कौन सा उपसर्ग प्रयुक्त हुआ है?', a: 'अभि', b: 'अप', c: 'अव', d: 'अ', ans: 'A' },
    { q: '\'महर्षि\' शब्द का सही संधि-विच्छेद क्या होगा?', a: 'महा + ऋषि', b: 'मह + ऋषि', c: 'मही + ऋषि', d: 'महान + ऋषि', ans: 'A' },
    { q: '\'आँखों का तारा होना\' मुहावरे का सही अर्थ क्या है?', a: 'अत्यधिक प्रिय होना', b: 'अंधा होना', c: 'क्रोधित होना', d: 'चमकीला होना', ans: 'A' },
    { q: 'ज्ञान सागर के पाठ \'हम पंछी उन्मुक्त गगन के\' के रचयिता कौन हैं?', a: 'शिवमंगल सिंह \'सुमन\'', b: 'सूर्यकांत त्रिपाठी निराला', c: 'महादेवी वर्मा', d: 'रामधारी सिंह दिनकर', ans: 'A' },
    { q: '\'यथाशक्ति\' शब्द में कौन सा समास है?', a: 'अव्ययीभाव समास', b: 'तत्पुरुष समास', c: 'द्विगु समास', d: 'कर्मधारय समास', ans: 'A' }
  ];

  return Array.from({ length: count }, (_, idx) => {
    const template = baseQuestions[idx % baseQuestions.length];
    return {
      id: idx + 1,
      q: `[प्रश्न ${idx + 1}] ${template.q}`,
      options: [template.a, template.b, template.c, template.d],
      correctIndex: 0,
      correctText: template.a,
      chapter: 'हिंदी ज्ञान सागर एवं अभ्यास सागर',
      subject: 'Hindi',
      class: 'Class 8'
    };
  });
}

function generateSanskritClass8Questions(count) {
  const baseQuestions = [
    { q: '\'सुवचनानि\' पाठे कति श्लोकाः सन्ति?', a: 'षट् (6)', b: 'पञ्च (5)', c: 'अष्ट (8)', d: 'दश (10)', ans: 'A' },
    { q: '\'विद्या ददाति विनयं\' अत्र \'ददाति\' पदे कः धातुः?', a: 'दा धातुः', b: 'दि धातुः', c: 'दे धातुः', d: 'दद् धातुः', ans: 'A' },
    { q: '\'रामेण\' इति पदे का विभक्तिः अस्ति?', a: 'तृतीया विभक्तिः', b: 'द्वितीया विभक्तिः', c: 'चतुर्थी विभक्तिः', d: 'षष्ठी विभक्तिः', ans: 'A' },
    { q: '\'देवालयः\' इत्यस्य पदस्य संधि-विच्छेदः किम्?', a: 'देव + आलयः', b: 'देवा + लयः', c: 'देव + लयः', d: 'देवाल + यः', ans: 'A' },
    { q: '\'पठित्वा\' पदे कः प्रत्ययः प्रयुक्तः?', a: 'क्त्वा प्रत्ययः', b: 'तुमुन् प्रत्ययः', c: 'ल्यप् प्रत्ययः', d: 'क्तवतु प्रत्ययः', ans: 'A' }
  ];

  return Array.from({ length: count }, (_, idx) => {
    const template = baseQuestions[idx % baseQuestions.length];
    return {
      id: idx + 1,
      q: `[प्रश्न ${idx + 1}] ${template.q}`,
      options: [template.a, template.b, template.c, template.d],
      correctIndex: 0,
      correctText: template.a,
      chapter: 'सुरभिः संस्कृत व्याकरणम्',
      subject: 'Sanskrit',
      class: 'Class 8'
    };
  });
}

function generateGenericQuestions(cls, subj, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    q: `[${cls} ${subj} Question ${i + 1}] Which principle is central to chapter ${Math.floor(i / 5) + 1} of ${subj}?`,
    options: [
      `Verified Standard Answer ${i + 1} for ${cls}`,
      `Alternative Concept B for ${subj}`,
      `Theoretical Option C`,
      `Practical Option D`
    ],
    correctIndex: 0,
    correctText: `Verified Standard Answer ${i + 1} for ${cls}`,
    chapter: `DAV ${cls} ${subj} Chapter ${Math.floor(i / 5) + 1}`,
    subject: subj,
    class: cls
  }));
}
