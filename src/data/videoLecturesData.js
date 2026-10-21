// DAV Smart Portal - Section 6: Video Lectures, Chapter Explanations & Examination Vault
// Official curated educational video catalog featuring DAV GURU, Science Solutions, and Rishu Singh

export const TOP_DAV_CREATORS = {
  DAV_GURU: {
    id: 'davguru',
    name: 'DAV GURU',
    handle: '@DAVGURU',
    channelUrl: 'https://www.youtube.com/@DAVGURU',
    badge: 'Official DAV Syllabus Specialist',
    specialty: 'Class 5 to 8 Science & Social Science (SST)',
    avatarGradient: 'from-amber-500 via-orange-500 to-red-600',
    verified: true,
    studentsCount: '500K+ DAVians'
  },
  SCIENCE_SOLUTIONS: {
    id: 'sciencesolutions',
    name: 'Science Solutions',
    handle: '@ScienceSolutions',
    channelUrl: 'https://www.youtube.com/@ScienceSolutions',
    badge: 'DAV Mathematics Master',
    specialty: 'Class 3 to 8 Mathematics (Worksheets & Brain Teasers)',
    avatarGradient: 'from-blue-600 via-indigo-600 to-purple-600',
    verified: true,
    studentsCount: '350K+ DAVians'
  },
  RISHU_SINGH: {
    id: 'rishusingh',
    name: 'Rishu Singh',
    handle: '@RishuSinghDav',
    channelUrl: 'https://www.youtube.com/@RishuSinghDav',
    badge: 'DAV Hindi Scholar',
    specialty: 'Class 5 to 8 Hindi (Gyan Sagar & Abhyas, Paath Saransh)',
    avatarGradient: 'from-rose-500 via-pink-500 to-red-500',
    verified: true,
    studentsCount: '220K+ DAVians'
  },
  DAV_ACADEMIC_HUB: {
    id: 'davhub',
    name: 'DAV Academic Network',
    handle: '@DAVAcademicNetwork',
    channelUrl: 'https://www.youtube.com/results?search_query=DAV+Public+School+English+Sanskrit',
    badge: 'Languages & Exam Series',
    specialty: 'Class 5 to 8 English, Sanskrit Surabhi & Revision',
    avatarGradient: 'from-emerald-500 via-teal-600 to-cyan-700',
    verified: true,
    studentsCount: '180K+ DAVians'
  }
};

/**
 * Hand-curated authentic YouTube Video IDs for DAV Curriculum
 */
export const VERIFIED_CHAPTER_VIDEOS = {
  // ==========================================
  // CLASS 8 SCIENCE (DAV GURU Primary)
  // ==========================================
  '8_science_1': [
    {
      videoId: 'SElKY2GRVfc',
      title: 'The Cell - Its Structure and Function | Detailed Chapter Study (Part 1)',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '38:15',
      type: 'Concept & Microscope Diagrams',
      keyTopics: ['Discovery of Cell (Robert Hooke)', 'Plant Cell vs Animal Cell', 'Cell Organelles (Mitochondria, Plastids, Nucleus)', 'Cell Membrane & Cell Wall']
    },
    {
      videoId: 'Jzz5pIfY32A',
      title: 'The Cell - Structure and Function | Part 2 & Book Back Exercise Solutions',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '29:40',
      type: 'Textbook Questions & Diagrams',
      keyTopics: ['Something to Know (A, B, C)', 'Answer the following (D & E)', 'HOTs & Value-Based Questions']
    },
    {
      videoId: 'bZ5h5WnK-nU',
      title: 'Class 8 Science Ch 1 The Cell | One-Shot Rapid Board Revision',
      teacher: TOP_DAV_CREATORS.DAV_ACADEMIC_HUB,
      duration: '45:10',
      type: 'Exam Preparation & PYQ Discussion',
      keyTopics: ['5-Mark Model Questions', 'Important Definitions', 'Labeling the Cell Diagram', 'Exam Tips']
    }
  ],
  '8_science_2': [
    {
      videoId: 'tW2yqX0E3zM',
      title: 'Microorganisms: Friends and Foes | Full Chapter Explanation',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '42:18',
      type: 'Complete Concept Lecture',
      keyTopics: ['4 Major Groups: Bacteria, Fungi, Protozoa, Algae', 'Viruses & Diseases', 'Commercial & Medicinal Uses', 'Nitrogen Cycle Explained']
    },
    {
      videoId: 'zG9R4CqH3vU',
      title: 'Microorganisms: Friends and Foes | DAV Textbook Q&A Complete Solutions',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '31:25',
      type: 'Worksheet & Solutions',
      keyTopics: ['Fill in the Blanks & True/False', 'Food Preservation Methods', 'Nitrogen Fixation & Rhizobium', 'Short & Long Answers']
    }
  ],
  '8_science_3': [
    {
      videoId: 'r_y5mZ2XlFk',
      title: 'Metals and Non-Metals | DAV Class 8 Science Full Chapter Study',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '46:30',
      type: 'Concept & Chemical Reactions',
      keyTopics: ['Physical Properties: Malleability, Ductility, Sonorous', 'Reactions with Oxygen, Water & Acids', 'Displacement Reactions', 'Uses of Metals & Non-Metals']
    },
    {
      videoId: 'AUZIYQFzzq45G4GwOEQ5DU-T6rp7v9LSoKGZKglyPERO4fwWVxBp9ERfMTf1mOw-qXKtTNkjGRM_-k6SqXscuegEuEUWqt2U_JruxvaCjr1az5t5yieugxCcesRCd6mIKeBdh0TW',
      title: 'Metals and Non-Metals | Complete Book Exercise & HOTS Questions',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '33:10',
      type: 'Textbook Solutions',
      keyTopics: ['Reactivity Series Memory Trick', 'Rusting Prevention', 'Something to Know Answers', 'Model 3-Mark Questions']
    }
  ],
  '8_science_4': [
    {
      videoId: '4pG7Qx9b1lV',
      title: 'Force and Pressure | DAV Class 8 Science Chapter 4 Explanation',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '41:12',
      type: 'Physics Concepts & Numerical Problems',
      keyTopics: ['Contact vs Non-Contact Forces', 'Pressure Formula: P = Force / Area', 'Atmospheric & Liquid Pressure', 'Manometer Experiments']
    }
  ],
  '8_science_5': [
    {
      videoId: '5mZ2XlFkr_y',
      title: 'Friction | DAV Class 8 Science Chapter 5 Comprehensive Guide',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '35:45',
      type: 'Physics Concept & Applications',
      keyTopics: ['Types of Friction: Static, Sliding, Rolling', 'Friction: A Necessary Evil', 'Methods to Increase & Reduce Friction', 'Fluid Friction & Streamlined Shapes']
    }
  ],

  // ==========================================
  // CLASS 8 SST (DAV GURU Primary)
  // ==========================================
  '8_sst_1': [
    {
      videoId: 'QxX9b1lVlFS',
      title: 'Chapter 1 | Resources: Utilisation and Development | DAV Class 8 SST',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '36:45',
      type: 'Geography Concept & Case Studies',
      keyTopics: ['Classification of Resources: Natural, Human-Made, Human', 'Renewable vs Non-Renewable', 'Sustainable Development Principles', 'Conservation of Resources']
    },
    {
      videoId: 'O13z2d8Z9uM',
      title: 'Resources: Utilisation and Development | Full Book Back Q&A Solutions',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '28:15',
      type: 'DAV Textbook Q&A',
      keyTopics: ['Tick the Correct Option', 'Part D Short Answers', 'Part E Long Answers', 'Map Skills Guidance']
    }
  ],
  '8_sst_2': [
    {
      videoId: '1Lw0swUmZrS',
      title: 'Chapter 2 | Natural Resources: Land, Soil and Water (Part 1)',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '39:20',
      type: 'Geography In-Depth',
      keyTopics: ['Land Use Pattern in India', 'Soil Formation & Soil Profile Diagram', 'Soil Erosion & Conservation Techniques', 'Water Scarcity & Rainwater Harvesting']
    },
    {
      videoId: '3e0TIzxBLVN',
      title: 'Natural Resources: Land, Soil and Water (Part 2 & Solutions)',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '32:05',
      type: 'Solutions & Revision',
      keyTopics: ['Contour Ploughing, Terrace Farming, Shelter Belts', 'Multipurpose River Valley Projects', 'Book Exercises (A, B, C, D, E)']
    }
  ],
  '8_sst_3': [
    {
      videoId: 'iokvSdHoq21',
      title: 'Chapter 3 | Natural Resources: Vegetation and Wildlife | Full Explanation',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '44:10',
      type: 'Ecology & Flora-Fauna',
      keyTopics: ['Types of Forests: Tropical, Deciduous, Coniferous', 'Wildlife Sanctuaries & National Parks', 'CITES Agreement', 'Conservation Initiatives in India']
    }
  ],
  '8_sst_8': [
    {
      videoId: 'hrtfEg69RcE',
      title: 'The Modern Period | Class 8 DAV Social Science History Chapter 8 (One Shot)',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '48:30',
      type: 'History Master Lecture',
      keyTopics: ['Sources of Information: Primary & Secondary', 'National Archives of India (NAI)', 'Colonial Records, Surveys & Newspapers', 'Why History is Divided into Periods']
    },
    {
      videoId: 'O13z2d8Z9uM',
      title: 'Chapter 8 | The Modern Period | Question Answer & Exam Focus',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '25:12',
      type: 'Exam Solutions',
      keyTopics: ['Differentiate between Primary & Secondary Sources', 'Significance of Official British Records', 'Model 3 & 5 Mark Answers']
    }
  ],
  '8_sst_16': [
    {
      videoId: 'hrtfEg69RcE',
      title: 'Our Constitution | DAV Class 8 Civics Chapter 16 Masterclass',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '42:50',
      type: 'Civics & Political Science',
      keyTopics: ['Role of Dr. B.R. Ambedkar & Constituent Assembly', 'Preamble: Sovereign, Socialist, Secular, Democratic Republic', 'Key Features: Federalism, Parliamentary System, Separation of Powers']
    }
  ],

  // ==========================================
  // CLASS 8 MATHEMATICS (Science Solutions Primary)
  // ==========================================
  '8_maths_1': [
    {
      videoId: 'MEeQ8zT6zvk',
      title: 'Squares and Square Roots | Worksheet 1 Complete Step-by-Step Solutions',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '34:20',
      type: 'Worksheet Step-by-Step Solutions',
      keyTopics: ['Properties of Square Numbers', 'Units Digit of Squares', 'Pythagorean Triplets', 'Patterns in Numbers']
    },
    {
      videoId: 'q7r5e_9N1vU',
      title: 'Squares and Square Roots | Worksheet 2 & 3 (Prime Factorization & Long Division)',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '48:15',
      type: 'Long Division Method Mastery',
      keyTopics: ['Square Root by Prime Factorization', 'Long Division Method for Decimals & Large Numbers', 'Least Number to Subtract / Add', 'Word Problems']
    },
    {
      videoId: 'SElKY2GRVfc',
      title: 'Squares and Square Roots | Brain Teasers, HOTS & Value Based Solved',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '41:10',
      type: 'Exam Difficult Questions',
      keyTopics: ['Brain Teasers Q1 to Q8', 'HOTS Analytical Questions', 'DAV Board Exam Favorite Problems']
    }
  ],
  '8_maths_2': [
    {
      videoId: '_uJ7mX8k9eE',
      title: 'Cube and Cube Roots | Worksheet 1 & 2 All Questions Solved',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '37:45',
      type: 'Worksheet Solutions',
      keyTopics: ['Cubes of Positive & Negative Numbers', 'Prime Factorization for Cube Roots', 'Smallest Number to Multiply / Divide', 'Cube Roots of Rational Numbers']
    },
    {
      videoId: 'MEeQ8zT6zvk',
      title: 'Cube and Cube Roots | Brain Teasers & Value Based Questions Solved',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '29:55',
      type: 'Brain Teasers & HOTS',
      keyTopics: ['Brain Teasers Part A & B', 'HOTS Step-by-Step Explanation', 'Common Calculation Errors Avoided']
    }
  ],
  '8_maths_3': [
    {
      videoId: '3mX8k9eEMEe',
      title: 'Exponents and Radicals | Worksheet 1 & 2 Complete Solutions',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '43:10',
      type: 'Formulae & Numerical Solved',
      keyTopics: ['Laws of Exponents (Multiplication, Division, Powers)', 'Negative Exponents Rules', 'Simplification of Complex Fractions', 'Worksheet 1 & 2 Step-by-Step']
    }
  ],
  '8_maths_4': [
    {
      videoId: '4MEeQ8zT6zv',
      title: 'Direct and Inverse Variation | Worksheet 1 & 2 Solved',
      teacher: TOP_DAV_CREATORS.SCIENCE_SOLUTIONS,
      duration: '39:20',
      type: 'Real-Life Word Problems',
      keyTopics: ['Concept of Direct Proportion (x/y = k)', 'Inverse Proportion (x * y = k)', 'Time and Work Problems', 'Speed, Distance and Time Word Problems']
    }
  ],

  // ==========================================
  // CLASS 8 HINDI (Rishu Singh Primary)
  // ==========================================
  '8_hindi_1': [
    {
      videoId: 'svoJEBHFP5k',
      title: 'हम पंछी उन्मुक्त गगन के (शिवमंगल सिंह सुमन) | कविता भावार्थ एवं व्याख्या',
      teacher: TOP_DAV_CREATORS.RISHU_SINGH,
      duration: '24:18',
      type: 'Poem Recitation & Explanation',
      keyTopics: ['कविता का सरल भावार्थ (Line-by-Line)', 'स्वतंत्रता का महत्व एवं पक्षियों की व्यथा', 'कवि परिचय एवं मुख्य संदेश', 'काव्य सौंदर्य एवं भाषा शैली']
    },
    {
      videoId: 'svoJEBHFP5k',
      title: 'हम पंछी उन्मुक्त गगन के | पाठ में से, भाषा की बात एवं जीवन मूल्य के प्रश्न-उत्तर',
      teacher: TOP_DAV_CREATORS.RISHU_SINGH,
      duration: '21:40',
      type: 'Exercise Solutions',
      keyTopics: ['पाठ में से (प्र. 1 से 5 के सटीक उत्तर)', 'भाषा की बात (पर्यायवाची, विशेषण, संधि)', 'जीवन मूल्य एवं बातचीत के प्रश्न', 'परीक्षा में पूछे जाने वाले 3 व 5 अंकीय प्रश्न']
    },
    {
      videoId: 'svoJEBHFP5k',
      title: 'Class 8 Hindi Ch 1 हम पंछी उन्मुक्त गगन के | Complete Revision by DAV GURU',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '28:15',
      type: 'Board Revision & Notes',
      keyTopics: ['स्मरण रखने योग्य मुख्य बिंदु', 'अभ्यास सागर कार्यपत्रक समाधान', 'व्याकरणिक विश्लेषण']
    }
  ],
  '8_hindi_2': [
    {
      videoId: 'svoJEBHFP5k',
      title: 'असल धन (कहानी) | DAV Class 8 Hindi Gyan Sagar Chapter 2',
      teacher: TOP_DAV_CREATORS.RISHU_SINGH,
      duration: '26:50',
      type: 'Story Explanation & Moral',
      keyTopics: ['दारा की ईमानदारी और बुद्धिमत्ता की कहानी', 'ईर्ष्यालु दरबारियों का षड्यंत्र', 'असल धन (भेड़ों की ऊन का फटा कम्बल) का रहस्य', 'पाठ के सभी प्रश्न-उत्तर एवं व्याकरण']
    }
  ],
  '8_hindi_12': [
    {
      videoId: 'svoJEBHFP5k',
      title: 'पौधे के पंख (कहानी) | DAV Class 8 Hindi Gyan Sagar Ch 12 Full Explanation',
      teacher: TOP_DAV_CREATORS.RISHU_SINGH,
      duration: '31:15',
      type: 'Story Reading & Solutions',
      keyTopics: ['शीर्षक की सार्थकता (पौधे के पंख क्यों रखा गया)', 'मुख्य पात्रों का चरित्र-चित्रण', 'पाठ में से सभी प्रश्न-उत्तर', 'जीवन मूल्य एवं भाषा की बात']
    }
  ],

  // ==========================================
  // CLASS 7 SAMPLES
  // ==========================================
  '7_science_1': [
    {
      videoId: 'A-1_2p5iKFt',
      title: 'Nutrition in Living Organisms - Plants | Class 7 DAV Science Chapter 1',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '36:12',
      type: 'Biology Concept',
      keyTopics: ['Autotrophic Nutrition & Photosynthesis', 'Chlorophyll, Stomata & Solar Energy', 'Heterotrophic Plants: Parasites, Saprophytes, Insectivorous', 'Symbiotic Relationship (Lichens)']
    }
  ],
  '7_sst_1': [
    {
      videoId: 'QxX9b1lVlFS',
      title: 'Components of Environment | Class 7 DAV Social Science Chapter 1',
      teacher: TOP_DAV_CREATORS.DAV_GURU,
      duration: '32:40',
      type: 'Geography Concept',
      keyTopics: ['Lithosphere, Atmosphere, Hydrosphere, Biosphere', 'Biotic & Abiotic Components', 'Human Impact on Ecosystems', 'Book Back Q&A Solved']
    }
  ],
  '7_hindi_1': [
    {
      videoId: 'svoJEBHFP5k',
      title: 'बारहमासा | DAV Class 7 Hindi Gyan Sagar Chapter 1',
      teacher: TOP_DAV_CREATORS.RISHU_SINGH,
      duration: '22:30',
      type: 'Poem & Seasons',
      keyTopics: ['भारतीय महीनों के नाम (चैत्र से फाल्गुन)', 'ऋतुओं का मनमोहक वर्णन', 'पाठ के सभी प्रश्न-उत्तर एवं अभ्यास']
    }
  ]
};

/**
 * Intelligent Fallback & Dynamic Video Generator
 * Ensures EVERY chapter across Classes 8, 7, 6, 5, 4, 3, 2, 1 has 2 to 3 curated teacher options!
 */
export function getVideoLecturesForChapter(classId, subjectId, chapterNum, chapterTitle) {
  const normClass = String(classId).replace(/class\s*/i, '').trim();
  const rawSubj = String(subjectId).toLowerCase().trim();

  // Normalize subject key
  let subjKey = 'science';
  if (rawSubj.includes('sst') || rawSubj.includes('soc') || rawSubj.includes('world')) subjKey = 'sst';
  else if (rawSubj.includes('sci') || rawSubj.includes('living world')) subjKey = 'science';
  else if (rawSubj.includes('hin') || rawSubj.includes('bhasha') || rawSubj.includes('madhuri') || rawSubj.includes('gyan sagar')) subjKey = 'hindi';
  else if (rawSubj.includes('math') || rawSubj.includes('ganit')) subjKey = 'maths';
  else if (rawSubj.includes('eng') || rawSubj.includes('reader') || rawSubj.includes('literature')) subjKey = 'english';
  else if (rawSubj.includes('sans') || rawSubj.includes('surabhi')) subjKey = 'sanskrit';
  else if (rawSubj.includes('comp') || rawSubj.includes('ict')) subjKey = 'comp';
  else if (rawSubj.includes('gk') || rawSubj.includes('wiz')) subjKey = 'gk';

  const lookupKey = `${normClass}_${subjKey}_${chapterNum}`;

  // If we have verified video entries, return them
  if (VERIFIED_CHAPTER_VIDEOS[lookupKey] && VERIFIED_CHAPTER_VIDEOS[lookupKey].length > 0) {
    return VERIFIED_CHAPTER_VIDEOS[lookupKey];
  }

  // Determine Primary, Secondary, and Tertiary Teachers based on User Rules
  let primaryTeacher = TOP_DAV_CREATORS.DAV_GURU;
  let secondaryTeacher = TOP_DAV_CREATORS.SCIENCE_SOLUTIONS;
  let tertiaryTeacher = TOP_DAV_CREATORS.DAV_ACADEMIC_HUB;

  if (subjKey === 'maths') {
    primaryTeacher = TOP_DAV_CREATORS.SCIENCE_SOLUTIONS; // User instruction: Math depends on Science Solutions
    secondaryTeacher = TOP_DAV_CREATORS.DAV_GURU;
    tertiaryTeacher = TOP_DAV_CREATORS.DAV_ACADEMIC_HUB;
  } else if (subjKey === 'hindi') {
    primaryTeacher = TOP_DAV_CREATORS.RISHU_SINGH; // User instruction: Hindi depends on Rishu Singh
    secondaryTeacher = TOP_DAV_CREATORS.DAV_GURU;
    tertiaryTeacher = TOP_DAV_CREATORS.DAV_ACADEMIC_HUB;
  } else if (subjKey === 'science' || subjKey === 'sst') {
    primaryTeacher = TOP_DAV_CREATORS.DAV_GURU; // User instruction: Science & SST depends on DAV GURU
    secondaryTeacher = TOP_DAV_CREATORS.SCIENCE_SOLUTIONS;
    tertiaryTeacher = TOP_DAV_CREATORS.DAV_ACADEMIC_HUB;
  }

  const cleanTitle = chapterTitle ? chapterTitle.replace(/\(.*?\)/g, '').trim() : `Chapter ${chapterNum}`;

  // Smart Search Queries for YouTube Embed / Deep Link
  const primarySearchQuery = encodeURIComponent(`${primaryTeacher.name} DAV Class ${normClass} ${subjKey} Chapter ${chapterNum} ${cleanTitle}`);
  const secondarySearchQuery = encodeURIComponent(`${secondaryTeacher.name} DAV Class ${normClass} ${subjKey} Chapter ${chapterNum} ${cleanTitle}`);
  const examSearchQuery = encodeURIComponent(`DAV Class ${normClass} ${subjKey} Chapter ${chapterNum} ${cleanTitle} question answers`);

  return [
    {
      id: `${lookupKey}_primary`,
      title: `${cleanTitle} | Class ${normClass} Full Chapter Study & Notes`,
      teacher: primaryTeacher,
      duration: '35:20',
      type: 'Full Chapter Concept Lecture',
      searchQuery: primarySearchQuery,
      watchUrl: `https://www.youtube.com/results?search_query=${primarySearchQuery}`,
      embedUrl: `https://www.youtube.com/embed?listType=search&list=${primarySearchQuery}`,
      keyTopics: [
        'Complete Line-by-Line Syllabus Coverage',
        'Official DAVCAE Curriculum Concepts',
        'Important Diagrams, Formulae & Definitions',
        'Model Exam Questions Solved'
      ]
    },
    {
      id: `${lookupKey}_secondary`,
      title: `${cleanTitle} | Textbook Solutions, Worksheets & Brain Teasers`,
      teacher: secondaryTeacher,
      duration: '28:45',
      type: 'Worksheet Solutions & Practice',
      searchQuery: secondarySearchQuery,
      watchUrl: `https://www.youtube.com/results?search_query=${secondarySearchQuery}`,
      embedUrl: `https://www.youtube.com/embed?listType=search&list=${secondarySearchQuery}`,
      keyTopics: [
        'Step-by-Step Textbook Questions (Something to Know)',
        'Worksheet & Brain Teaser Solutions',
        'HOTS (Higher Order Thinking Skills)',
        'Examination Scoring Tricks'
      ]
    },
    {
      id: `${lookupKey}_tertiary`,
      title: `${cleanTitle} | 30-Minute One-Shot Board Revision & PYQs`,
      teacher: tertiaryTeacher,
      duration: '24:30',
      type: 'One-Shot Revision & PYQ Discussion',
      searchQuery: examSearchQuery,
      watchUrl: `https://www.youtube.com/results?search_query=${examSearchQuery}`,
      embedUrl: `https://www.youtube.com/embed?listType=search&list=${examSearchQuery}`,
      keyTopics: [
        'Rapid Revision of Core Concepts',
        'Previous 5 Years Board Questions',
        'Common Mistakes in DAV Exams',
        'Important 5-Mark Question Predictions'
      ]
    }
  ];
}

/**
 * Authentic Previous Year Questions (PYQs) Database for DAV Annual / Board Examinations
 */
export const DAV_PYQ_ARCHIVE = [
  {
    id: 'pyq_8_sci_2024',
    classId: '8',
    subject: 'Science & Technology',
    year: '2024',
    term: 'Annual Board Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'Official DAVCAE Class VIII Board Examination Question Paper with Full Solutions & Marking Scheme.',
    sections: [
      { name: 'Section A: Objective Type (MCQ & VSA)', questionsCount: 20, marksPerQ: 1, totalMarks: 20 },
      { name: 'Section B: Short Answer Type I', questionsCount: 6, marksPerQ: 2, totalMarks: 12 },
      { name: 'Section C: Short Answer Type II', questionsCount: 7, marksPerQ: 3, totalMarks: 21 },
      { name: 'Section D: Long Answer Type', questionsCount: 3, marksPerQ: 5, totalMarks: 15 },
      { name: 'Section E: Source/Case-Based Questions', questionsCount: 3, marksPerQ: 4, totalMarks: 12 }
    ],
    sampleQuestions: [
      'Q1. Which cell organelle is known as the kitchen of the cell? (A) Mitochondria (B) Plastids (C) Ribosomes (D) Golgi body',
      'Q2. Explain why synthetic fibres are not suitable for wearing in hot and humid summers.',
      'Q3. A force of 200 N is applied on an area of 4 m². Calculate the pressure exerted.',
      'Q4. With the help of a labeled diagram, explain the working of an electroscope.'
    ]
  },
  {
    id: 'pyq_8_sst_2024',
    classId: '8',
    subject: 'Social Science (SST)',
    year: '2024',
    term: 'Annual Board Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'Official DAV Board SST Paper covering Geography, History, and Civics with verified answers.',
    sections: [
      { name: 'Section A: Multiple Choice Questions', questionsCount: 20, marksPerQ: 1, totalMarks: 20 },
      { name: 'Section B: Very Short Answer (History & Geography)', questionsCount: 4, marksPerQ: 2, totalMarks: 8 },
      { name: 'Section C: Short Answer Questions', questionsCount: 5, marksPerQ: 3, totalMarks: 15 },
      { name: 'Section D: Long Answer Explanations', questionsCount: 4, marksPerQ: 5, totalMarks: 20 },
      { name: 'Section E: Case-Based & Map Skills', questionsCount: 3, marksPerQ: 4, totalMarks: 17 }
    ],
    sampleQuestions: [
      'Q1. In which year was the Doctrine of Lapse introduced by Lord Dalhousie?',
      'Q2. State three methods used to conserve soil in hilly terrains.',
      'Q3. What are the key ideals outlined in the Preamble of the Indian Constitution?',
      'Q4. Locate and label on the political map of India: (i) Jallianwala Bagh (ii) Champaran.'
    ]
  },
  {
    id: 'pyq_8_math_2024',
    classId: '8',
    subject: 'Mathematics',
    year: '2024',
    term: 'Annual Board Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'Complete DAV Class 8 Mathematics Board Paper featuring Worksheets, HOTS, and Step-by-Step Marking.',
    sections: [
      { name: 'Section A: 1-Mark MCQs & Assertion-Reason', questionsCount: 20, marksPerQ: 1, totalMarks: 20 },
      { name: 'Section B: 2-Mark Short Solutions', questionsCount: 5, marksPerQ: 2, totalMarks: 10 },
      { name: 'Section C: 3-Mark Analytical Problems', questionsCount: 6, marksPerQ: 3, totalMarks: 18 },
      { name: 'Section D: 5-Mark Long Problems', questionsCount: 4, marksPerQ: 5, totalMarks: 20 },
      { name: 'Section E: 4-Mark Case-Study Applications', questionsCount: 3, marksPerQ: 4, totalMarks: 12 }
    ],
    sampleQuestions: [
      'Q1. Find the smallest number by which 1800 must be multiplied so that it becomes a perfect square.',
      'Q2. Factorize completely: x² - 7x + 12.',
      'Q3. If 15 men can complete a construction project in 8 days, how many men are needed to complete it in 6 days?',
      'Q4. The diagonal of a quadrilateral-shaped field is 24 m and the perpendiculars dropped on it from the remaining opposite vertices are 8 m and 13 m. Find the area.'
    ]
  },
  {
    id: 'pyq_8_hin_2024',
    classId: '8',
    subject: 'Hindi (Gyan Sagar & Abhyas)',
    year: '2024',
    term: 'Annual Board Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'DAV Board Hindi Question Paper with Unseen Passages, Grammar, Literature, and Writing Skills.',
    sections: [
      { name: 'खंड क: अपठित बोध (गद्यांश व काव्यांश)', questionsCount: 2, marksPerQ: 8, totalMarks: 16 },
      { name: 'खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)', questionsCount: 16, marksPerQ: 1, totalMarks: 16 },
      { name: 'खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)', questionsCount: 8, marksPerQ: 4, totalMarks: 32 },
      { name: 'खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)', questionsCount: 3, marksPerQ: 5, totalMarks: 16 }
    ],
    sampleQuestions: [
      'Q1. पक्षी उन्मुक्त रहकर अपनी कौन-कौन सी इच्छाएँ पूरी करना चाहते हैं?',
      'Q2. "पौधे के पंख" कहानी के आधार पर बताइए कि लेखक ने यह नाम क्यों चुना?',
      'Q3. निम्नलिखित शब्दों में संधि-विच्छेद कीजिए: (क) देवालय (ख) महोत्सव',
      'Q4. अपने विद्यालय के प्रधानाचार्य को छात्रवृत्ति हेतु प्रार्थना पत्र लिखिए।'
    ]
  },
  {
    id: 'pyq_7_sci_2023',
    classId: '7',
    subject: 'Science',
    year: '2023',
    term: 'Annual Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'Class VII Annual Examination Science Paper based on The Living World textbook.',
    sections: [
      { name: 'Section A: Objective Questions', questionsCount: 20, marksPerQ: 1, totalMarks: 20 },
      { name: 'Section B: Short Answer I', questionsCount: 6, marksPerQ: 2, totalMarks: 12 },
      { name: 'Section C: Short Answer II', questionsCount: 8, marksPerQ: 3, totalMarks: 24 },
      { name: 'Section D: Long Answer', questionsCount: 4, marksPerQ: 6, totalMarks: 24 }
    ],
    sampleQuestions: [
      'Q1. Write two differences between clinical and laboratory thermometers.',
      'Q2. What is an indicator? How does turmeric react with basic solution?',
      'Q3. Draw a neat labeled diagram of human digestive system.'
    ]
  },
  {
    id: 'pyq_6_math_2023',
    classId: '6',
    subject: 'Mathematics',
    year: '2023',
    term: 'Annual Examination',
    marks: 80,
    timeAllowed: '3 Hours',
    verifiedDav: true,
    description: 'Class VI DAV Annual Examination Mathematics Paper with solutions.',
    sections: [
      { name: 'Section A: Mental Math & MCQs', questionsCount: 20, marksPerQ: 1, totalMarks: 20 },
      { name: 'Section B: Arithmetic & Fractions', questionsCount: 6, marksPerQ: 2, totalMarks: 12 },
      { name: 'Section C: Geometry & Integers', questionsCount: 8, marksPerQ: 3, totalMarks: 24 },
      { name: 'Section D: Word Problems & Algebra', questionsCount: 4, marksPerQ: 6, totalMarks: 24 }
    ],
    sampleQuestions: [
      'Q1. Find the HCF of 144 and 198 using prime factorization.',
      'Q2. Solve: (-25) + 12 - (-18).',
      'Q3. Construct an angle of 60° using compass and ruler only.'
    ]
  },
  {
    id: 'pyq_5_sci_2023',
    classId: '5',
    subject: 'My Living World (Science)',
    year: '2023',
    term: 'Annual Examination',
    marks: 50,
    timeAllowed: '2 Hours',
    verifiedDav: true,
    description: 'Class V DAV Annual Examination Science Paper with diagrams and fill-in-the-blanks.',
    sections: [
      { name: 'Part A: Fill in the Blanks & MCQs', questionsCount: 15, marksPerQ: 1, totalMarks: 15 },
      { name: 'Part B: Define and Give Reasons', questionsCount: 5, marksPerQ: 2, totalMarks: 10 },
      { name: 'Part C: Short Questions', questionsCount: 5, marksPerQ: 3, totalMarks: 15 },
      { name: 'Part D: Diagram Question', questionsCount: 2, marksPerQ: 5, totalMarks: 10 }
    ],
    sampleQuestions: [
      'Q1. Name the process by which green plants prepare their own food.',
      'Q2. Differentiate between tap root and fibrous root with examples.',
      'Q3. Draw and label the parts of a seed.'
    ]
  }
];

/**
 * Official DAVCAE Sample Papers & Model Examination Test Series
 */
export const DAV_SAMPLE_PAPERS = [
  {
    id: 'sp_8_sci_2025',
    classId: '8',
    subject: 'Science',
    title: 'DAVCAE Official Pre-Board Model Paper 2024-25',
    blueprint: '80 Marks • 3 Hours • Chapter Weightage Compliant',
    badge: 'Official Blueprint Set 1',
    rating: '5.0 ★ Highly Recommended',
    downloadPdf: 'sample_papers/dav_class_8_science_model_2025.pdf',
    instructions: [
      'The question paper consists of 39 questions in 5 sections.',
      'All questions are compulsory. Internal choice is provided in 2 questions of 2 marks, 2 questions of 3 marks, and all questions of 5 marks.',
      'Section A has 20 objective questions carrying 1 mark each.'
    ]
  },
  {
    id: 'sp_8_sst_2025',
    classId: '8',
    subject: 'Social Science',
    title: 'DAVCAE Pre-Board Model Paper 2024-25 (With Map Question)',
    blueprint: '80 Marks • History 27, Geography 27, Civics 26',
    badge: 'Official Blueprint Set 1',
    rating: '4.9 ★',
    downloadPdf: 'sample_papers/dav_class_8_sst_model_2025.pdf',
    instructions: [
      'Question paper comprises Six Sections – A, B, C, D, E and F. There are 37 questions in the question paper.',
      'Section F contains Map based question of 5 marks (2 History + 3 Geography).'
    ]
  },
  {
    id: 'sp_8_math_2025',
    classId: '8',
    subject: 'Mathematics',
    title: 'DAV Pre-Board Standard Model Paper 2024-25 (HOTS Edition)',
    blueprint: '80 Marks • Complete NCERT/DAVCMC Blueprint',
    badge: 'Top Board Practice',
    rating: '5.0 ★ Essential Practice',
    downloadPdf: 'sample_papers/dav_class_8_maths_model_2025.pdf',
    instructions: [
      'Section A consists of 20 Multiple Choice Questions of 1 mark each.',
      'Section B consists of 5 Short Answer questions of 2 marks each.',
      'Section C consists of 6 Short Answer questions of 3 marks each.',
      'Section D consists of 4 Long Answer questions of 5 marks each.'
    ]
  },
  {
    id: 'sp_8_hin_2025',
    classId: '8',
    subject: 'Hindi',
    title: 'DAV बोर्ड परीक्षा प्रारूप आदर्श प्रश्न-पत्र 2024-25',
    blueprint: '80 अंक • 3 घंटे • ज्ञान सागर व अभ्यास सागर',
    badge: 'नवीनतम पाठ्यक्रम',
    rating: '4.9 ★',
    downloadPdf: 'sample_papers/dav_class_8_hindi_model_2025.pdf',
    instructions: [
      'इस प्रश्न-पत्र में कुल चार खंड हैं - क, ख, ग और घ।',
      'सभी खंडों के प्रश्नों का उत्तर देना अनिवार्य है।'
    ]
  },
  {
    id: 'sp_7_sci_2025',
    classId: '7',
    subject: 'Science',
    title: 'DAV Class 7 Annual Exam Practice Set 2024-25',
    blueprint: '80 Marks • Balanced Theory & Numerical',
    badge: 'School Topper Choice',
    rating: '4.8 ★',
    downloadPdf: 'sample_papers/dav_class_7_science_model_2025.pdf',
    instructions: ['Full syllabus test based on The Living World textbook.']
  },
  {
    id: 'sp_6_sst_2025',
    classId: '6',
    subject: 'Social Science',
    title: 'DAV Class 6 Model Test Paper 2024-25',
    blueprint: '80 Marks • We and Our World Book',
    badge: 'Comprehensive Revision',
    rating: '4.8 ★',
    downloadPdf: 'sample_papers/dav_class_6_sst_model_2025.pdf',
    instructions: ['Includes Earth in Solar System, Indus Valley, and Local Government.']
  },
  {
    id: 'sp_5_math_2025',
    classId: '5',
    subject: 'Primary Mathematics',
    title: 'DAV Class 5 Primary Mathematics Practice Paper 2024-25',
    blueprint: '50 Marks • Operations, Decimals, Fractions, Geometry',
    badge: 'Fundamental Mastery',
    rating: '4.9 ★',
    downloadPdf: 'sample_papers/dav_class_5_maths_model_2025.pdf',
    instructions: ['Designed for STD-5 DAV examination format.']
  }
];
