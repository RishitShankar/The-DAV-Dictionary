// Shankar AI Engine for The DAV Dictionary
// Dedicated high-intelligence AI created by Rishit Shankar
// 4-Tier Dimension Architecture (Dimension 1 Normal, Dimension 2 VIP, Dimension 3 VVIP, Dimension 4 Master Developer)
// Powered by live Google Gemini 3.5 Cloud Intelligence with official DAV syllabus grounding across ALL CLASSES (LKG to Class 8)

import { lookupTextbookDatabase, DAV_CLASS_8_SYLLABUS_INDEX, DAV_TEXTBOOK_DATABASE } from '../data/davTextbookDatabase.js';

const STORAGE_KEY = 'shankar_ai_api_key';
// Built-in intelligent engine key decoded at runtime for automatic zero-configuration AI access
const BUILTIN_KEY_B64 = 'QVEuQWI4Uk42SWtBb090SkZuOHlBQUlCMW5YQ1FDQmhYYjhBTTZJaWhIRWVOVmpJMERGWkE=';
const getBuiltinKey = () => {
  try {
    if (typeof atob === 'function') return atob(BUILTIN_KEY_B64);
    if (typeof Buffer !== 'undefined') return Buffer.from(BUILTIN_KEY_B64, 'base64').toString('utf-8');
  } catch (e) {}
  return '';
};

export function getSavedApiKey() {
  let localKey = '';
  try {
    if (typeof localStorage !== 'undefined') {
      localKey = localStorage.getItem(STORAGE_KEY) || '';
    }
  } catch (e) {}
  if (localKey && localKey.trim()) return localKey.trim();

  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
    const envKey = import.meta.env.VITE_GEMINI_API_KEY.trim();
    if (envKey) return envKey;
  }
  return getBuiltinKey();
}

export function saveApiKey(key) {
  if (typeof localStorage === 'undefined') return;
  if (!key) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, key.trim());
  }
}

/**
 * Detect targeted class from query (LKG, UKG, 1-8)
 */
export function detectClassFromQuery(query, fallbackClass = 8) {
  if (!query) return fallbackClass;
  const q = query.toLowerCase();
  
  if (/\b(?:class|std|grade)\s*lkg\b/i.test(q) || /\blkg\b/i.test(q) || /\bnursery\b/i.test(q)) return 'LKG';
  if (/\b(?:class|std|grade)\s*ukg\b/i.test(q) || /\bukg\b/i.test(q) || /\bkindergarten\b/i.test(q)) return 'UKG';
  
  const m = q.match(/\b(?:class|std|grade|standard)\s*([1-8])\b/i) ||
            q.match(/\b([1-8])(?:st|nd|rd|th)\s*(?:class|std|grade)?\b/i);
  if (m) {
    return parseInt(m[1], 10);
  }
  return fallbackClass;
}

/**
 * Detect specific pedagogical question type
 */
export function detectQuestionCategory(query) {
  const q = query.toLowerCase();
  if (/\b(hots|higher order thinking|critical thinking|analytical question)\b/i.test(q)) return 'HOTS';
  if (/\b(value based|vbq|values?|moral value)\b/i.test(q)) return 'VALUE_BASED';
  if (/\b(map skill|map work|locate on map|mark on map|outline map)\b/i.test(q)) return 'MAP_SKILL';
  if (/\b(life skills?|real world application)\b/i.test(q)) return 'LIFE_SKILLS';
  if (/\b(brain teaser|puzzle|riddle|mental math|problem solving)\b/i.test(q)) return 'BRAIN_TEASER';
  if (/\b(rishit|shankar|head boy|creator|who created you|who made you|about rishit|who are you)\b/i.test(q)) return 'CREATOR_BIO';
  if (/\b(middle of page|between page|in between|paragraph|concept|explain in detail)\b/i.test(q)) return 'MIDDLE_PAGE_CONCEPT';
  return 'GENERAL';
}

/**
 * Authoritative Master DAV Curriculum Grounding Prompt (LKG to Class 8)
 * Combined with Rishit Shankar Creator Dossier
 */
const MASTER_DAV_GROUNDING = `
=== OFFICIAL DAV PUBLIC SCHOOL CURRICULUM DIRECTORY (DAVCMC / DAVCAE) ===
You are the definitive authority on the official D.A.V. Public School curriculum for ALL classes (LKG, UKG, Class 1, 2, 3, 4, 5, 6, 7, and 8).

1. PRE-PRIMARY & PRIMARY CURRICULUM:
   - LKG:
     * Fun with English: Alphabet recognition, phonics sounds (letters A to Z), word families, rhyming words, visual matching.
     * Environmental Studies (EVS): My Body & 5 senses, Family, Animals (domestic & wild), Fruits, Vegetables, Cleanliness, Good Manners, Safety.
     * Integrated Activity Workbook: Motor skills, pattern tracing, color identification.
   - UKG:
     * Mathematics: Numbers 1 to 100, number names, Before/After/Between, Greater than/Less than, basic addition & subtraction, 2D shapes, clock/time basics.
   - CLASS 1:
     * English Practice Book: Nouns (naming words), Singular/Plural, Articles (A/An), Pronouns (He/She/It), Prepositions (in, on, under).
     * Online with Computers: Computer as an electronic machine, CPU (brain), Monitor, Keyboard, Mouse buttons & click, drawing in Paint.
   - CLASS 2:
     * English Practice Book: Doing words (Verbs), Describing words (Adjectives), Capital letters & Full stops, Opposites.
     * My Living World (EVS): Plants around us (trees, shrubs, herbs, climbers), Uses of plants, Animals (land, water), Food habits, Types of houses, Air & Water, Seasons.
   - CLASS 3:
     * Hindi (Bhasha Madhuri): चतुर चीकू, सीखो, चींटी ने सिखाया, अगर न नभ में बादल होते।
     * My English Reader: Animals, Friendship, Caring for Nature.
     * Primary Mathematics: 4-digit numbers, Addition, Subtraction, Multiplication, Division, Fractions (Halves, Thirds, Fourths), Money, Measurement of Length/Weight/Capacity.
     * We and Our World (EVS): Family relations, Food & Nutrition, Shelter, Travel, Cleanliness.
   - CLASS 4:
     * Hindi (Bhasha Madhuri): कहानियाँ एवं प्रेरक प्रसंग, दादी का हलवा, किस्सा तेनालीराम का।
     * The Living World (Science): My Body (digestive & excretory systems), Plants (roots - tap root & fibrous root, photosynthesis basics), Flowers and Fruits, Animals (herbivores, carnivores, omnivores), Birds (beaks and claws adapted to food), Insects (useful and harmful), Food nutrients (carbohydrates, proteins, fats, vitamins, minerals), Water as a universal solvent, Purification of water, Pollution.
     * Hands On in Computer: Computer memory, Tux Paint, Logo programming commands (FD, BK, RT, LT), Windows OS.
   - CLASS 5:
     * English Reader & Practice: Tenses, Modals, Conditionals, Direct & Indirect speech basics.
     * The Living World (Science): My Body (Breathing system - lungs & trachea; Skeletal system - bones & joints), Plants (seed dispersal by wind, water, animals, explosion), Forests & ecological balance, Deficiency Diseases (Goitre, Anemia, Night Blindness, Scurvy, Rickets), Rocks & Minerals (Igneous, Sedimentary, Metamorphic), Simple Machines (Lever, Pulley, Wheel & Axle, Inclined Plane).
     * We and Our World (SST): Physical Divisions of India (Northern Mountains / Himalayas, Northern Fertile Plains, Great Indian Desert / Thar, Southern Peninsular Plateau, Coastal Plains & Island groups: Andaman & Nicobar, Lakshadweep); Indian Heritage, Freedom Movement, Transport & Communication.
     * Surabhi Sanskrit: वर्णमाला, अकारान्त पुंल्लिंग शब्द, फलानि एवं शाकानि।
     * Kid Wiz GK: Indian states, capitals, world landmarks, sports, science facts.
   - CLASS 6:
     * Science (The Living World): Our Environment, Food & its components, Structure & Nature of Matter (atoms, molecules, elements, compounds, mixtures), Separation of substances, Measurement & Motion, Electric Currents & Circuits, Magnetism (poles, attraction, repulsion), Light & Shadows (opaque, transparent, translucent).
     * Social Science (We and Our World): History (Studying the Past, Life of Early Man, Indus Valley / Harappan Civilisation, Vedic Age, Early States / Janapadas, Mauryan Empire), Geography (The Earth in the Solar System, Motions of the Earth - Rotation & Revolution, Latitudes & Longitudes, Major Realms of Earth - Lithosphere, Hydrosphere, Atmosphere, Biosphere), Civics (Understanding Diversity, Prejudice & Discrimination, Government, Local Self-Government).
     * Secondary Mathematics: Number System, Factors & Multiples (HCF & LCM), Integers, Fractions, Decimals, Introduction to Algebra, Ratio & Proportion, Basic Geometrical Ideas.
   - CLASS 7:
     * Science (The Living World): Nutrition in Living Organisms (Autotrophic & Heterotrophic), Heat & Temperature, Acids, Bases & Salts (Indicators: Litmus, Phenolphthalein, China rose), Physical & Chemical Changes, Respiration in Organisms, Transportation in Plants & Animals (Xylem, Phloem, Heart chambers), Reproduction in Plants (Pollination, Fertilization, Seed dispersal), Motion & Time, Electric Current & its effects (Heating & Magnetic effects, Electromagnets), Light (Reflection, Spherical Mirrors, Lenses), Forests & Soil.
     * Social Science (We and Our World): History (Medieval India, Rise of Regional Kingdoms, The Delhi Sultanate - Slave, Khalji, Tughlaq, Sayyid, Lodi dynasties; The Mughal Empire - Babur, Humayun, Akbar, Jahangir, Shah Jahan, Aurangzeb; Medieval Architecture), Geography (Earth's Interior - Crust, Mantle, Core; Changing Face of Earth - Exogenic & Endogenic forces, Weathering, Rivers, Glaciers, Wind; Atmosphere & Weather, Water Bodies & Ocean Currents), Civics (Democracy, Equality in Indian Democracy, State Government - Vidhan Sabha & Vidhan Parishad, Media & Advertising, Gender Issues).
     * Sanskrit (Surabhi): सन्धि, शब्दरूपाणि, धातुरूपाणि, सुभाषितानि।
   - CLASS 8 (FLAGSHIP COMPLETE CURRICULUM):
     * SST (We and Our World - 22 Chapters):
       - Ch 1-7 Geography: Resources Utilisation, Land/Soil/Water, Vegetation/Wildlife, Minerals & Energy, Agriculture, Manufacturing Industries, Human Resources.
       - Ch 8-15 History: Modern Period, Company Rule, Colonialism & Tribal Societies, 1857 Revolt (Landmark uprising, Doctrine of Lapse, causes, suppression, consequences), Impact of British Rule (Wood's Despatch 1854, Macaulay's Minute 1835, Wardha Scheme 1937, Social Reforms: Sati 1829, Widow Remarriage 1856, Arya Samaj 1875 by Swami Dayanand Saraswati, Jyotiba Phule, Shri Narayana Guru, Dr. B.R. Ambedkar; Press), Colonialism & Urban Change, Nationalist Movement (1870-1947), India Marches Ahead.
       - Ch 16-22 Civics: Our Constitution (Dynamic nature: Privy Purse 1971, Bank Nationalisation, OBC reservations, RTE/RTI; Rigid & Flexible amendment procedures under Art 368; Parliamentary form; Unique federation with strong centre; Preamble ideals; Constituent Assembly 299 members, 15 female members, Dr. Rajendra Prasad President, Dr. B.R. Ambedkar Drafting Chairman), Fundamental Rights & Duties (Art 12-35, Art 51A, Art 32 Heart & Soul), Legislature, Executive, Judiciary, Social Justice, Safeguarding Marginalised.
     * Science (The Living World - 20 Chapters):
       - Ch 1 Cell Structure, Ch 2 Microorganisms, Ch 3 Metals/Non-metals, Ch 4 Force & Pressure, Ch 5 Friction, Ch 6 Energy Sources, Ch 7 Combustion, Ch 8 Conservation, Ch 9 Crop Production, Ch 10 Refraction/Dispersion, Ch 11 Human Eye, Ch 12 Sound, Ch 13 Synthetic Fibres, Ch 14 Reproduction, Ch 15 Adolescence, Ch 16 Electric Current & Chemical Effects, Ch 17 Stars & Solar System, Ch 18 Earthquakes, Ch 19 Air Pollution, Ch 20 Water Pollution.
     * Maths (16 Units): Squares, Cubes, Exponents, Variation, Profit/Loss, Compound Interest, Algebraic Identities, Polynomials, Linear Equations, Parallel Lines, Quadrilaterals, Graphs, Mensuration, Statistics/Probability.
     * Hindi (Gyan Sagar 20 Chapters): हम पंछी उन्मुक्त गगन के, असल धन, अच्छे पड़ोसी के गुण, दोपहरी, आकाश को सात सीढ़ियाँ, आश्रम के अतिथि, अन्याय के खिलाफ़ लड़ाई, दोहे, बातचीत की कला, आदि।
     * English (Literature & Reader): Three Questions, Granny's Tree Climbing, The Fun They Had, Father's Help, My Mother, The Luncheon, Children's Song, Sharp-Eyed Jeweller, Couplets, Undeserved Reward, Bangle Sellers, Bad Dream.

2. SPECIAL PEDAGOGICAL QUESTIONS FORMATS:
   - When answering a HOTS (Higher Order Thinking Skills) Question:
     * Provide sharp analytical reasoning, cause-and-effect breakdown, scientific/logical hypothesis, and critical evaluations beyond direct memorization.
   - When answering a VALUE-BASED QUESTION (VBQ):
     * Clearly highlight the core human/moral value (e.g. Integrity, Environmental stewardship, Compassion, Vedic universal harmony, Dignity of labour), link it to the textbook narrative, and provide an actionable life moral.
   - When answering a MAP SKILL Question:
     * Provide exact geographic coordinates, state names, physical features (rivers, plateaus, mountain ranges), and explicit instructions on how a student should locate and shade them on an outline map of India or the World.
   - When answering a BRAIN TEASER / PUZZLE:
     * Break down the puzzle step-by-step with clear mathematical logic, algebraic deduction, and alternative shortcut methods.
   - When answering a MIDDLE-OF-THE-PAGE Concept:
     * Act as an expert DAV teacher explaining the paragraph thoroughly with definitions, diagrams, real-life examples, and key takeaway formulas.

3. KNOWLEDGE OF CREATOR & HEAD BOY (RISHIT SHANKAR):
   - Full Name: Rishit Shankar (रीशीत शंकर). Age: 14 years old.
   - School: D.A.V. Public School, Khabra, Muzaffarpur, Bihar.
   - Class: Class 8, Section D, Roll No. 25 (Session 2026–2027).
   - Role: Head Boy of D.A.V. Public School Khabra.
   - Academic Record: Perfect 80/80 (Century) in Sanskrit Half-Yearly, 96/100 in English, 90/100 in Mathematics, 79/80 in Hindi, 77/80 in Science & Social Science.
   - Creator of: The DAV Dictionary (10-Section Campus Platform) and Shankar AI.
   - Technology Stack: HTML, CSS, JavaScript, React 18, Vite, Tailwind CSS, Google Cloud, Firebase Firestore, WebSockets, exploring Java/Kotlin for Android.
   - Creative & 3D: Blender vehicle 3D modeling, DaVinci Resolve video color grading, poster designer for Rotary Club of Tirhut, Independence Day 2026, and community tree-planting.
   - Strategy & Gaming: 1,000+ Rapid Chess games (castling, en passant, tactical endgames); Roblox Blox Fruits (Third Sea, fruit trading T-Rex/Mammoth, PvP); Mech Arena (Solis, Orion, Mimicker).
   - Financial Markets: Began studying at age 12; Pushkar Raj Thakur *Stock Market Crash Course*; technical analysis with Fibonacci retracements, Put-Call Ratio (PCR), and Options derivatives; helped design investor communications for Ashish Financial Services.
   - Family: Father Ashish Shankar (आशीष शंकर), Mother Sarita Kumari (सरिता कुमारी), Younger brother Saharsh Shankar, Grandfather living with family. Friends: Rehansh Shrevashtav, Divyanshu Kumar, Ram Kant.
`;

/**
 * Query live Google Cloud Generative Language API
 */
async function queryLiveGemini(apiKey, systemPrompt, userPrompt, targetModel = 'gemini-3.5-flash-lite', maxTokens = 3000) {
  const modelsToTry = [
    targetModel,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemma-4-26b-a4b-it'
  ];
  const uniqueModels = [...new Set(modelsToTry)];

  for (const model of uniqueModels) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const payload = {
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            parts: [{ text: userPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: maxTokens
        }
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 25000);

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const candidate = data.candidates?.[0];
        const parts = candidate?.content?.parts || [];
        const nonThoughtParts = parts.filter(p => !p.thought);
        const text = (nonThoughtParts.length > 0
          ? nonThoughtParts.map(p => p.text).join('\n\n')
          : parts.map(p => p.text).join('\n\n'))?.trim();
        if (text) {
          return { success: true, model, text };
        }
      } else {
        const errJson = await res.json().catch(() => ({}));
        console.warn(`[Shankar AI Live] Model ${model} returned ${res.status}:`, errJson.error?.message);
      }
    } catch (err) {
      console.warn(`[Shankar AI Live] Error querying ${model}:`, err.message);
    }
  }

  return { success: false };
}

/**
 * Synthesizes comprehensive study notes for a chapter
 */
export function formatStudyNotesForChapter(chap, subjectName, classNum, actionType) {
  if (!chap) return null;

  if (actionType === 'summary' || actionType === 'summarize') {
    return {
      title: `📝 Chapter Summary: ${chap.title}`,
      text: `📖 **DAV Class ${classNum} ${subjectName}**
📚 **Chapter ${chap.number}: ${chap.title}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 📝 Comprehensive Chapter Overview:
${chap.summary}

${chap.topics && chap.topics.length > 0 ? `### 📌 Core Syllabus Themes & Middle-of-Page Concepts:
${chap.topics.map((t, idx) => `**${idx + 1}. ${t.heading}:**\n${t.content}`).join('\n\n')}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Exam Strategy by Head Boy Rishit Shankar:* Review these foundational themes before attempting 3-mark and 5-mark long answer questions.`
    };
  }

  if (actionType === 'short_notes') {
    return {
      title: `📋 High-Yield Short Revision Notes: ${chap.title}`,
      text: `📋 **DAV High-Yield Short Revision Notes**
📚 **Class ${classNum} ${subjectName} • Chapter ${chap.number}: ${chap.title}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### ⚡ Essential Quick-Revision Points:
${chap.topics && chap.topics.length > 0 ? chap.topics.map(t => {
  const points = t.content.split('\n').filter(l => l.trim().length > 0).slice(0, 3);
  return `* **${t.heading}:**\n${points.map(p => `  • ${p.replace(/^\d+\.\s*/, '')}`).join('\n')}`;
}).join('\n\n') : `* **Core Focus:** ${chap.summary}`}

### 💡 High-Yield Formulae & Key Terminology:
* Master all official definitions, terms, and diagrams in this chapter.
* Ensure clear distinction between primary mechanisms and contributing factors.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 *Quick Tip:* Ideal for rapid 5-minute revision prior to class assessments and unit tests.`
    };
  }

  if (actionType === 'five_mark') {
    return {
      title: `📑 5-Mark Comprehensive Model Notes: ${chap.title}`,
      text: `📑 **DAV 5-Mark Comprehensive Model Notes**
📚 **Class ${classNum} ${subjectName} • Chapter ${chap.number}: ${chap.title}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🎯 Structured 5-Mark Examination Framework:
> **Core Theme:** Comprehensive analysis of "${chap.title}" for DAV board & final exams.

1. **Introduction & Formal Definition:**
* Establish clear historical/scientific context: ${chap.summary.slice(0, 200)}...

2. **Five Analytical Examination Points:**
${chap.topics && chap.topics.length > 0 ? chap.topics.slice(0, 5).map((t, i) => `* **Point ${i + 1} (${t.heading}):** ${t.content.split('\n')[0] || t.content.slice(0, 140)}`).join('\n') : `* Detailed 5-point elaboration based on official DAVCAE curriculum guidelines.`}

3. **Critical Conclusion & Lasting Significance:**
* Highlight constitutional, scientific, or social implications and relevance to modern development.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💎 *DAV Scoring Secret (Rishit Shankar):* Underline key terms, draw labeled diagrams where applicable, and maintain a strict point-wise format for guaranteed 5/5 full marks.`
    };
  }

  if (actionType === 'bullets') {
    return {
      title: `📌 Key Bullet Points & Glossary: ${chap.title}`,
      text: `📌 **DAV Key Bullet Points & Glossary**
📚 **Class ${classNum} ${subjectName} • Chapter ${chap.number}: ${chap.title}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 🔍 Quick Revision Bullet List:
${chap.topics && chap.topics.length > 0 ? chap.topics.flatMap(t => t.content.split('\n').filter(l => l.trim().length > 5).map(l => `* ${l.replace(/^\d+\.\s*/, '')}`)).slice(0, 15).join('\n') : `* ${chap.summary}`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Study Hack:* Read these bullet points aloud once every morning for rapid photographic memory retention.`
    };
  }

  if (actionType === 'qa') {
    const qList = chap.questions || [];
    return {
      title: `🎯 Back-of-Chapter Q&A: ${chap.title}`,
      text: `🎯 **DAV Official Back-of-Chapter Model Q&A**
📚 **Class ${classNum} ${subjectName} • Chapter ${chap.number}: ${chap.title}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${qList.length > 0 ? qList.map(q => `### Question ${q.id || `${q.section || 'D'}.${q.qNum}`}:
> *"${q.question}"*

✍️ **Model Answer:**
${q.answer}
`).join('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n') : `*Please ask any specific question number (e.g. D.1, E.2) for this chapter and Shankar AI will provide the exact model textbook answer!*`}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Curriculum Verified:* 100% compliant with DAV College Managing Committee (DAVCMC) evaluation rubrics.`
    };
  }

  return null;
}

/**
 * Main query function for Shankar AI with 4-Dimension Tier Support & All-Class Intelligence
 */
export async function askShankarAI(question, context = {}) {
  const trimmedQ = question.trim();
  const lowerQ = trimmedQ.toLowerCase();
  const isOuterWorld = context.mode === 'outer_world';
  const detectedClass = isOuterWorld ? (context.classNum || 8) : detectClassFromQuery(trimmedQ, context.classNum || 8);
  const category = detectQuestionCategory(trimmedQ);
  const user = context.user || null;
  const apiKey = getSavedApiKey();

  // Determine user dimension (0 = Guest, 1 = Normal, 2 = VIP, 3 = VVIP, 4 = Master Developer)
  let dimension = 1;
  if (user?.dimension !== undefined) {
    dimension = user.dimension;
  } else if (user?.isAdmin || user?.id === 'rishibhai') {
    dimension = 4;
  } else if (user?.plan === 'vvip') {
    dimension = 3;
  } else if (user?.plan === 'vip') {
    dimension = 2;
  } else if (user?.plan === 'guest') {
    dimension = 0;
  }

  // Check for explicit study tool action requests (e.g. clicking "Summarize", "5-Mark Notes" buttons)
  if (!isOuterWorld && context.chapter && context.actionType) {
    const classKey = context.classNum || detectedClass || 8;
    const subjKey = (context.subject || '').toLowerCase().includes('sci') ? 'science' :
                    (context.subject || '').toLowerCase().includes('sst') || (context.subject || '').toLowerCase().includes('soc') ? 'sst' :
                    (context.subject || '').toLowerCase().includes('math') ? 'maths' :
                    (context.subject || '').toLowerCase().includes('hin') ? 'hindi' :
                    (context.subject || '').toLowerCase().includes('eng') ? 'english' :
                    (context.subject || '').toLowerCase().includes('sans') ? 'sanskrit' :
                    (context.subject || 'sst');
    const chapNum = parseInt(context.chapter, 10);
    const chapterObj = DAV_TEXTBOOK_DATABASE[classKey]?.[subjKey]?.chapters?.find(c => c.number === chapNum);
    const subjectName = DAV_TEXTBOOK_DATABASE[classKey]?.[subjKey]?.name || (subjKey.toUpperCase());

    if (chapterObj) {
      const studyNotes = formatStudyNotesForChapter(chapterObj, subjectName, classKey, context.actionType);
      if (studyNotes) {
        return {
          source: 'shankar-textbook-core',
          isTextbookGrounded: true,
          chapterInfo: `DAV Class ${classKey} ${subjectName} • Ch ${chapNum}`,
          modelName: getTierBadge(dimension),
          text: studyNotes.text
        };
      }
    }
  }

  // 1. Authoritative Database Grounding Match (for background enrichment)
  const textbookMatch = !isOuterWorld ? lookupTextbookDatabase(trimmedQ, detectedClass) : null;

  // 2. LIVE CLOUD GENERATION — Fully unrestricted, powerful AI like ChatGPT and Gemini
  if (apiKey) {
    let targetModel = 'gemini-3.5-flash-lite';
    let maxTokens = 3500;
    let dimensionInstruction = '';
    let footerTag = '';

    if (dimension === 1) {
      targetModel = 'gemini-3.5-flash-lite';
      maxTokens = 3000;
      dimensionInstruction = `Provide clear, comprehensive, and helpful answers with clear structure and examples.`;
    } else if (dimension === 2) {
      targetModel = 'gemini-3.5-flash-lite';
      maxTokens = 3500;
      dimensionInstruction = `Provide in-depth, detailed explanations, exam tips, and key concepts.`;
    } else if (dimension === 3) {
      targetModel = 'gemini-3.5-flash-lite';
      maxTokens = 4096;
      dimensionInstruction = `Provide exhaustive, comprehensive model answers with step-by-step reasoning and deep syllabus mastery.`;
    } else if (dimension === 4) {
      targetModel = 'gemini-3.5-flash-lite';
      maxTokens = 4096;
      dimensionInstruction = `Provide maximum analytical depth, unconstrained intelligence, exact syllabus cross-referencing, and architectural precision.`;
    } else {
      targetModel = 'gemini-3.5-flash-lite';
      maxTokens = 2500;
      dimensionInstruction = `Provide helpful, direct, and complete answers.`;
    }

    const fullSystemPrompt = `You are "Shankar AI", a brilliant, versatile, and completely unrestricted AI intelligence engine created by Head Boy Rishit Shankar for The DAV Dictionary.

You have the comprehensive knowledge, versatility, problem-solving ability, and conversational depth of ChatGPT and Google Gemini.
You can answer ANY question across all disciplines, academic subjects, and worldly topics:
- All academic subjects (Mathematics, Science, Physics, Chemistry, Biology, History, Civics, Geography, Hindi, English, Sanskrit, Computer Science, Economics) for all classes (LKG to Class 8 and beyond)
- General knowledge, world affairs, history, geopolitics, current events, abbreviations, and technology
- Coding, programming, debugging, algorithms, and logic puzzles
- Creative writing, essays, letter drafting, summaries, and debate arguments
- Mathematical derivations, step-by-step solutions, formulas, and proofs

${MASTER_DAV_GROUNDING}

TARGET CONTEXT:
- Mode: ${isOuterWorld ? 'Outer World / General Knowledge' : 'Academics & Curriculum'}
- Class: ${typeof detectedClass === 'string' ? detectedClass : `Class ${detectedClass}`}
- Category: ${category}

RULES FOR RESPONSES:
1. Answer the user's specific question DIRECTLY, COMPLETELY, and INTELLIGENTLY.
2. NEVER give a generic boilerplate or refuse valid questions.
3. If asked about Creator Rishit Shankar, give proud, accurate, inspiring details from his biography.
4. Use rich Markdown with clear headings (###), bold bullet points, and code formatting where appropriate.
${dimensionInstruction}`;

    // Build enriched prompt with chapter context when the student selected a chapter
    let userPromptWithContext = trimmedQ;
    if (!isOuterWorld && context.chapter && context.subject) {
      const classKey = context.classNum || detectedClass || 8;
      const subjKey = (context.subject || '').toLowerCase().includes('sci') ? 'science' :
                      (context.subject || '').toLowerCase().includes('sst') || (context.subject || '').toLowerCase().includes('soc') ? 'sst' :
                      (context.subject || '').toLowerCase().includes('math') ? 'maths' :
                      (context.subject || '').toLowerCase().includes('hin') ? 'hindi' :
                      (context.subject || '').toLowerCase().includes('eng') ? 'english' :
                      (context.subject || '').toLowerCase().includes('sans') ? 'sanskrit' : null;
      const chapNum = parseInt(context.chapter, 10);
      const chapterObj = subjKey ? DAV_TEXTBOOK_DATABASE[classKey]?.[subjKey]?.chapters?.find(c => c.number === chapNum) : null;
      const subjectName = (subjKey && DAV_TEXTBOOK_DATABASE[classKey]?.[subjKey]?.name) || context.subject;
      const chapterTitle = chapterObj?.title || `Chapter ${chapNum}`;

      userPromptWithContext = `You are answering a specific DAV textbook question from the student's selected chapter.

STUDENT SELECTED CONTEXT:
- Class: ${typeof classKey === 'string' ? classKey : `Class ${classKey}`}
- Subject: ${subjectName}
- Chapter ${chapNum}: "${chapterTitle}"
${chapterObj?.summary ? `- Chapter Overview: ${chapterObj.summary.slice(0, 300)}` : ''}
${chapterObj?.topics ? `- Key Topics in Chapter: ${chapterObj.topics.map(t => t.heading).join(', ')}` : ''}

STUDENT'S QUESTION: "${trimmedQ}"

IMPORTANT: Answer this SPECIFIC question directly. Give the real answer — textbook content, explanation, definitions, or whatever the student needs. Do NOT produce a generic template.`;
    } else if (textbookMatch) {
      if (textbookMatch.type === 'question-match') {
        userPromptWithContext = `[OFFICIAL DAV TEXTBOOK GROUNDED REFERENCE:
Subject: ${textbookMatch.subjectName}
Chapter ${textbookMatch.chapterNumber}: "${textbookMatch.chapterTitle}"
Question ${textbookMatch.id || `${textbookMatch.section || 'D'}.${textbookMatch.qNum}`}: "${textbookMatch.question}"
Official Textbook Model Answer:
${textbookMatch.answer}]

Student's Query: ${trimmedQ}
Please provide an authoritative, textbook-accurate answer based on the official DAV reference above.`;
      } else if (textbookMatch.type === 'chapter-topic-match') {
        userPromptWithContext = `[OFFICIAL DAV TEXTBOOK GROUNDED REFERENCE:
Subject: ${textbookMatch.subjectName}
Chapter ${textbookMatch.chapterNumber}: "${textbookMatch.chapterTitle}"
Topic: ${textbookMatch.matchedTopic?.heading}
Textbook Content:
${textbookMatch.matchedTopic?.content}]

Student's Query: ${trimmedQ}
Please answer the question accurately using the textbook content above.`;
      } else if (['hots-match', 'value-based-match', 'map-skill-match', 'brain-teaser-match'].includes(textbookMatch.type)) {
        userPromptWithContext = `[OFFICIAL DAV TEXTBOOK GROUNDED REFERENCE:
Pedagogical Category: ${textbookMatch.type.toUpperCase()}
Subject/Reference: ${textbookMatch.subjectName} • ${textbookMatch.chapterTitle}
Problem/Question: "${textbookMatch.question}"
Official Syllabus Grounded Guidance:
${textbookMatch.answer}]

Student's Query: ${trimmedQ}
Please formulate a complete, full-mark DAV examination response based on the curriculum guidance above.`;
      }
    }

    const liveResult = await queryLiveGemini(apiKey, fullSystemPrompt, userPromptWithContext, targetModel, maxTokens);
    if (liveResult.success) {
      return {
        source: 'shankar-live',
        isLiveCloud: true,
        modelName: getTierBadge(dimension),
        isTextbookGrounded: !!textbookMatch,
        chapterInfo: (!isOuterWorld && context.chapter && context.subject)
          ? `DAV ${context.classNum ? `Class ${context.classNum}` : 'Class 8'} ${context.subject} • Ch ${context.chapter}`
          : textbookMatch
            ? `DAV Class ${detectedClass} ${textbookMatch.subjectName} • Ch ${textbookMatch.chapterNumber}`
            : (detectedClass ? `DAV ${typeof detectedClass === 'string' ? detectedClass : `Class ${detectedClass}`} Intelligence` : null),
        text: liveResult.text + footerTag
      };
    }
    // Live API call failed — fall through to offline handlers
  }

  // 3. OFFLINE FALLBACK ENGINE
  if (textbookMatch) {
    if (textbookMatch.type === 'question-match') {
      return {
        source: 'shankar-textbook-core',
        isTextbookGrounded: true,
        chapterInfo: `DAV Class ${detectedClass} ${textbookMatch.subjectName} • Ch ${textbookMatch.chapterNumber} (${textbookMatch.id || `Q${textbookMatch.qNum}`})`,
        modelName: getTierBadge(dimension),
        text: `📖 **DAV Class ${detectedClass} ${textbookMatch.subjectName}**
📚 **Chapter ${textbookMatch.chapterNumber}: ${textbookMatch.chapterTitle}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **Textbook Question ${textbookMatch.id || `${textbookMatch.section || 'D'}.${textbookMatch.qNum}`}:**
> *"${textbookMatch.question}"*

✍️ **Official Model Textbook Answer:**
${textbookMatch.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Exam Note:* Verified directly from the official DAV Class ${detectedClass} curriculum textbook for full marks.`
      };
    } else if (textbookMatch.type === 'chapter-topic-match') {
      const topic = textbookMatch.matchedTopic;
      return {
        source: 'shankar-textbook-core',
        isTextbookGrounded: true,
        chapterInfo: `DAV Class ${detectedClass} ${textbookMatch.subjectName} • Ch ${textbookMatch.chapterNumber}`,
        modelName: getTierBadge(dimension),
        text: `📖 **DAV Class ${detectedClass} ${textbookMatch.subjectName}**
📚 **Chapter ${textbookMatch.chapterNumber}: ${textbookMatch.chapterTitle}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 **Topic: ${topic.heading}**

${topic.content}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Need more answers?* Ask for any specific question or explore other chapters!`
      };
    } else if (textbookMatch.type === 'hots-match') {
      return {
        source: 'shankar-hots-core',
        isTextbookGrounded: true,
        chapterInfo: `${textbookMatch.subjectName} • HOTS Mastery`,
        modelName: getTierBadge(dimension),
        text: `🧠 **DAV HOTS (Higher Order Thinking Skills)**
📚 **${textbookMatch.subjectName} • ${textbookMatch.chapterTitle}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **Analytical Problem:**
> *"${textbookMatch.question}"*

💡 **Comprehensive Scientific & Logical Reasoning:**
${textbookMatch.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *HOTS Assessment Tip:* Evaluated for cause-and-effect reasoning, analytical deductions, and conceptual depth beyond rote memorization.`
      };
    } else if (textbookMatch.type === 'value-based-match') {
      return {
        source: 'shankar-vbq-core',
        isTextbookGrounded: true,
        chapterInfo: `${textbookMatch.subjectName} • Value-Based (VBQ)`,
        modelName: getTierBadge(dimension),
        text: `💖 **DAV Value-Based Question (VBQ)**
📚 **${textbookMatch.subjectName} • ${textbookMatch.chapterTitle}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 **Question:**
> *"${textbookMatch.question}"*

🌟 **Core Human Values & Moral Reflection:**
${textbookMatch.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Vedic Moral Ideal:* Nurturing character, civic compassion, and social responsibility in accordance with DAV philosophy.`
      };
    } else if (textbookMatch.type === 'map-skill-match') {
      return {
        source: 'shankar-map-core',
        isTextbookGrounded: true,
        chapterInfo: `${textbookMatch.subjectName} • Map Work`,
        modelName: getTierBadge(dimension),
        text: `🗺️ **DAV Official Map Skill Guide**
📚 **${textbookMatch.subjectName} • ${textbookMatch.chapterTitle}**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${textbookMatch.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *Map Examination Rule:* Always locate points using a sharp pencil, mark with a small clear dot & circle, and write the state or city name in bold uppercase.`
      };
    } else if (textbookMatch.type === 'brain-teaser-match') {
      return {
        source: 'shankar-teaser-core',
        isTextbookGrounded: true,
        chapterInfo: `${textbookMatch.subjectName} • Brain Teaser`,
        modelName: getTierBadge(dimension),
        text: `${textbookMatch.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧩 *Mathematical Strategy:* Use algebraic identities and dimensional reduction for speedy problem solving.`
      };
    }
  }

  // 4. Bio Query Offline Handler
  if (category === 'CREATOR_BIO') {
    return {
      source: 'shankar-creator-core',
      isTextbookGrounded: true,
      chapterInfo: 'Section 10 • Creator Biography',
      modelName: getTierBadge(dimension),
      text: `👑 **About Head Boy Rishit Shankar (रीशीत शंकर)**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

* **Role:** Head Boy of **D.A.V. Public School, Khabra, Muzaffarpur, Bihar** (Class 8-D, Roll No. 25).
* **Age:** 14 years old.
* **Academic Excellence:**
  - 🏆 **Sanskrit Century:** Perfect **80 / 80 (100%)** in Half-Yearly Examinations.
  - 📖 **English Topper:** **96 / 100** (prose, formal debate proposals, essays).
  - 🔢 **Mathematics:** **90 / 100** (Half-Yearly: 74/80).
  - 🇮🇳 **Hindi:** **79 / 80** (98.75%).
  - 🔬 **Science & SST:** **77 / 80** each.
* **Software Engineering & AI:** Full-stack creator of **The DAV Dictionary** (React 18, Vite, Tailwind CSS, Firebase Firestore) and **Shankar AI**.
* **Design & Multimedia:** Blender 3D vehicle modeling, DaVinci Resolve cinematic video editing, poster designer for **Rotary Club of Tirhut** and community tree-planting.
* **Chess & Gaming:** Over **1,000+ Rapid Chess games**; Blox Fruits Third Sea explorer & PvP strategist; Mech Arena tactician.
* **Financial Literacy:** Started studying markets at age 12; explores Pushkar Raj Thakur's course, Fibonacci retracements, and Options Put-Call Ratio (PCR).
* **Family:** Father **Ashish Shankar (आशीष शंकर)**, Mother **Sarita Kumari (सरिता कुमारी)**, Brother **Saharsh Shankar**, and Grandfather. Close friends: Rehansh Shrevashtav, Divyanshu Kumar, Ram Kant.`
    };
  }

  // 5. Conversational Router
  if (/^(hi|hello|hey|yo|namaste|pranam|hola|sup|greetings|good\s*(morning|afternoon|evening|day))[\s!.,?]*$/i.test(lowerQ)) {
    return {
      source: 'shankar-conversational',
      isTextbookGrounded: false,
      modelName: getTierBadge(dimension),
      text: `👋 **Greetings! I am Shankar AI**

Welcome to **The DAV Dictionary**! I am your personal academic and global intelligence engine, created by **Head Boy Rishit Shankar**.

⚡ **I am fully equipped to answer:**
* 📚 **All DAV Classes (LKG, UKG, Classes 1 to 8):** Back-of-chapter questions (Part A, B, C, D, E), middle-of-page concepts, **HOTS**, **Value-Based Questions (VBQ)**, **Map Skills**, **Life Skills**, and **Brain Teasers**.
* 🌍 **World Geopolitics & Foreign Policy:** India's global strategy, BRICS, QUAD, international relations, and trade corridors.
* 🔬 **Science, Meteorology & Astronomy:** Space exploration (ISRO/Chandrayaan-3), weather systems, thermodynamics, and cell biology.
* 👑 **About Creator:** Ask me anything about Head Boy Rishit Shankar's achievements and vision!

*How can I assist your studies today?*`
    };
  }

  // 6. Real-World Intelligence & Geopolitics Offline Knowledge Routers
  if (lowerQ.includes('muzaffarpur') || (lowerQ.includes('bihar') && (lowerQ.includes('khabra') || lowerQ.includes('where is')))) {
    return {
      source: 'shankar-geo-core',
      isTextbookGrounded: false,
      chapterInfo: 'Muzaffarpur, Bihar • Home of DAV Khabra',
      modelName: getTierBadge(dimension),
      text: `🏙️ **Muzaffarpur (मुज़फ़्फ़रपुर), Bihar**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

* **Geographic Identity:** Muzaffarpur is a premier historic city in North Bihar, situated along the sacred **Burhi Gandak River**.
* **Global Recognition:** Renowned worldwide as the **"Land of Shahi Lychee"** (शाही लीची), possessing a prestigious GI (Geographical Indication) tag.
* **Academic & Cultural Significance:** It is a vibrant educational hub of North Bihar, home to B.R. Ambedkar Bihar University (BRABU), Sri Krishna Medical College, and premier institutions like **D.A.V. Public School, Khabra** — where Head Boy Rishit Shankar leads the student council and created The DAV Dictionary!
* **Connectivity:** Strategically connected via East-West Corridor (NH-27) and North-South links, serving as the commercial gateway to Tirhut, Mithila, and Nepal border trade.`
    };
  }

  if (lowerQ.includes('brics') || lowerQ.includes('quad') || lowerQ.includes('geopolitics') || lowerQ.includes('foreign policy') || lowerQ.includes('russia') || lowerQ.includes('ukraine')) {
    return {
      source: 'shankar-geopolitics-core',
      isTextbookGrounded: false,
      chapterInfo: 'World Affairs & Geopolitics',
      modelName: getTierBadge(dimension),
      text: `🌍 **Global Geopolitical Analysis & Strategic Dynamics**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Strategic Overview of Your Query:
> **"${trimmedQ}"**

1. **Multipolar World Order & India's Strategic Autonomy:**
* Modern international relations are transitioning from unipolar dominance toward a **multipolar framework**. India champions **strategic autonomy**, engaging with diverse multilateral forums based on national interest and global peace.

2. **Key Multilateral Alliances:**
* **QUAD (Quadrilateral Security Dialogue):** Comprising India, the United States, Japan, and Australia, focusing on a Free, Open, and Rules-based Indo-Pacific, maritime domain awareness, resilient supply chains, and critical technologies.
* **BRICS (Brazil, Russia, India, China, South Africa + Expanded Members):** A coalition representing the Global South, aiming to democratize global economic governance, reform institutions (UNSC, IMF, World Bank), and promote local currency settlements.

3. **Current Diplomatic Priorities:**
* Balanced diplomacy across Eurasian energy corridors and Indo-Pacific security.
* Promotion of **Voice of the Global South**, digital public infrastructure (UPI), and the India-Middle East-Europe Economic Corridor (IMEC).`
    };
  }

  if (lowerQ.includes('chandrayaan') || lowerQ.includes('isro') || lowerQ.includes('space') || lowerQ.includes('aditya') || lowerQ.includes('gaganyaan')) {
    return {
      source: 'shankar-science-core',
      isTextbookGrounded: false,
      chapterInfo: 'ISRO & Space Exploration',
      modelName: getTierBadge(dimension),
      text: `🚀 **ISRO Space Exploration & Indian Scientific Achievements**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **Chandrayaan-3 Historic Triumph (23 August 2023):**
* India became the **first nation in human history** to achieve a flawless soft landing near the Moon's South Pole (Shiv Shakti Point).
* The **Vikram Lander** and **Pragyan Rover** conducted groundbreaking in-situ thermal, seismic, and chemical experiments, confirming the presence of sulphur and lunar soil composition.
* 23 August is now celebrated annually across India as **National Space Day**.

2. **Aditya-L1 Solar Mission:**
* India's first dedicated space observatory placed in a halo orbit around Lagrangian Point 1 (L1), 1.5 million km from Earth, observing solar flares, coronal mass ejections, and space weather.

3. **Gaganyaan Programme:**
* India's ambitious indigenous human spaceflight mission designed to carry Indian astronauts (Vyomnauts) into a 400 km low Earth orbit, reflecting India's growing aerospace prowess.`
    };
  }

  if (lowerQ.includes('weather') || lowerQ.includes('monsoon') || lowerQ.includes('climate') || lowerQ.includes('cyclone') || lowerQ.includes('el nino')) {
    return {
      source: 'shankar-meteorology-core',
      isTextbookGrounded: false,
      chapterInfo: 'Meteorology & Indian Monsoons',
      modelName: getTierBadge(dimension),
      text: `🌦️ **Meteorology, Weather Dynamics & Indian Monsoons**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. **The South-West Monsoon (June to September):**
* Lifeline of Indian agriculture, driven by differential heating between the Indian landmass and the Indian Ocean, shifting the Inter-Tropical Convergence Zone (ITCZ) northward.
* Divided into two powerful arms: the **Arabian Sea Branch** (brings torrential rain to the Western Ghats) and the **Bay of Bengal Branch** (sweeps across the North-East and Gangetic Plains).

2. **Global Oceanic-Atmospheric Teleconnections:**
* **El Niño:** Abnormal warming of sea surface temperatures in the central/eastern equatorial Pacific, typically associated with weaker Indian monsoon rainfall and drought risk.
* **La Niña:** Cooling of equatorial Pacific waters, generally favoring abundant, well-distributed monsoon precipitation in India.
* **Indian Ocean Dipole (IOD):** A positive IOD buffers India against deficient rain by bringing moisture-rich winds.`
    };
  }


  // 6b. DAV Hindi Textbooks Offline Knowledge (fallback only when no API key)
  if (lowerQ.includes('hindi literature') || (lowerQ.includes('hindi') && (lowerQ.includes('book') || lowerQ.includes('kitab') || lowerQ.includes('pustak') || lowerQ.includes('name')))) {
    return {
      source: 'shankar-textbook-core',
      isTextbookGrounded: true,
      chapterInfo: 'DAV Class 8 Hindi Curriculum • DAVCMC Publications',
      modelName: getTierBadge(dimension),
      text: `📖 **Official DAV Class 8 Hindi Textbooks**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In the official DAV Education Board curriculum for Class 8, there are **two prescribed Hindi textbooks**:

1. 📚 **ज्ञान सागर (Gyan Sagar) — Literature Reader (साहित्य पाठ्यपुस्तक):**
   * Contains prose stories, inspiring poems, and classical dohas (20 Chapters).
   * **Key Chapters include:**
     - पाठ 1: हम पंछी उन्मुक्त गगन के (शिवमंगल सिंह 'सुमन')
     - पाठ 2: असल धन (कहानी)
     - पाठ 3: अच्छे पड़ोसी के गुण
     - पाठ 4: दोपहरी (कविता)
     - पाठ 5: सागर और मेघ
     - पाठ 9: कबीर के दोहे
     - पाठ 12: सूरदास के पद

2. ✍️ **अभ्यास सागर (Abhyas Sagar) — Grammar & Composition Worksheets (व्याकरण एवं अभ्यास):**
   * Workbook designed to accompany each chapter of Gyan Sagar.
   * Covers संधि, समास, उपसर्ग-प्रत्यय, मुहावरे-लोकोक्तियाँ, कारक, वाक्य-रूपांतरण, अपठित गद्यांश, एवं पत्र लेखन।

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ *Both books are officially written, designed, and published by the **DAV College Managing Committee (DAVCMC) / DAV Center for Academic Excellence (DAVCAE)**, New Delhi.`
    };
  }

  // 6d. DAV Complete Textbook Directory Query
  if ((lowerQ.includes('book') || lowerQ.includes('textbook') || lowerQ.includes('kitab')) && (lowerQ.includes('class 8') || lowerQ.includes('std 8') || lowerQ.includes('dav'))) {
    return {
      source: 'shankar-textbook-core',
      isTextbookGrounded: true,
      chapterInfo: 'DAV Class 8 Complete Textbook Directory',
      modelName: getTierBadge(dimension),
      text: `📚 **Official DAV Class 8 Prescribed Textbooks (DAVCMC / DAVCAE)**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The official DAV Board curriculum for Class 8 uses the following prescribed textbooks:

1. **Science & Technology:** *The Living World* (20 Units: Cell Structure, Microorganisms, Synthetic Fibres, Metals/Non-metals, Force & Pressure, Light, Reproduction, etc.)
2. **Mathematics:** *Secondary Mathematics (Class VIII)* (16 Chapters: Squares & Square Roots, Cubes, Exponents, Algebraic Identities, Linear Equations, Mensuration, Statistics, etc.)
3. **Social Science (SST):** *We and Our World* (History: The Modern Period; Geography: Resources; Civics: The Union Legislature, Executive, and Judiciary)
4. **English:** 
   - *English Literature* (Stories & Poetry)
   - *My English Reader* (Thematic Comprehension Units)
   - *English Practice Book* (Applied English Grammar)
5. **Hindi:**
   - *ज्ञान सागर (Gyan Sagar)* — Literature Reader
   - *अभ्यास सागर (Abhyas Sagar)* — Grammar Workbook
6. **Sanskrit:** *सुरभिः (Surbhi)* (दश पाठ एवं व्याकरण)
7. **Naitik Shiksha:** *नैतिक शिक्षा (DAV Vedic Heritage & Values)*
8. **Computer Science:** *Hands-On ICT & Coding*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 All these textbooks are fully available to read with continuous vertical streaming in **Section 2: Digital Library**!`
    };
  }

  // 7. Final fallback — no API key configured, no offline match found
  return {
    source: 'shankar-no-key',
    isTextbookGrounded: false,
    modelName: getTierBadge(dimension),
    text: `🔑 **Shankar AI — API Key Required**
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To get real, live answers from Shankar AI, please add your **Google Gemini API Key**:

1. Click the **⚙️ Engine Key** button in the Shankar AI interface.
2. Enter your API key (starts with \`AIzaSy...\`).
3. Click **Save** — then ask your question again!

**Your Question:** *"${trimmedQ}"*

Once your key is configured, Shankar AI will answer this and any other question — academic, general knowledge, or world affairs — with complete, real, intelligent responses powered by Google Gemini.

*(💡 Get a free API key at [aistudio.google.com](https://aistudio.google.com))*`
  };
}

function getTierBadge(dimension) {
  switch (dimension) {
    case 4:
      return '💎 Master Developer Dimension (Rishit Shankar)';
    case 3:
      return '👑 Shankar AI VVIP Ultra Plan';
    case 2:
      return '⭐ Shankar AI VIP Plan';
    case 1:
      return '⚡ Shankar AI Normal Plan';
    default:
      return '🔒 Shankar AI Free Preview Mode';
  }
}
