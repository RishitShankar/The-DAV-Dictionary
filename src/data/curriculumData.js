// DAV Public School Comprehensive Curriculum Index (Classes LKG to 8)
// Developed for Shankar AI Cascading Academics Selector & Locked PDF System
// Created by Head Boy Rishit Shankar

export const DAV_CLASSES = [
  { id: '8', label: 'Class 8 (Senior Flagship)' },
  { id: '7', label: 'Class 7' },
  { id: '6', label: 'Class 6' },
  { id: '5', label: 'Class 5' },
  { id: '4', label: 'Class 4' },
  { id: '3', label: 'Class 3' },
  { id: '2', label: 'Class 2' },
  { id: '1', label: 'Class 1' },
  { id: 'UKG', label: 'UKG (Upper Kindergarten)' },
  { id: 'LKG', label: 'LKG (Lower Kindergarten)' },
];

export const DAV_SUBJECTS_BY_CLASS = {
  '8': [
    { id: 'sst', name: 'Social Science (We and Our World)', pdf: 'social-science.pdf' },
    { id: 'science', name: 'Science & Tech (The Living World)', pdf: 'science.pdf' },
    { id: 'maths', name: 'Secondary Mathematics', pdf: 'mathematics.pdf' },
    { id: 'hindi', name: 'Hindi (Gyan Sagar & Abhyas)', pdf: 'hindi-gyan-sagar.pdf' },
    { id: 'english', name: 'English (Literature, Reader, Practice)', pdf: 'english-literature.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'sanskrit.pdf' },
    { id: 'comp', name: 'Hands on Computer / ICT', pdf: 'computer.pdf' }
  ],
  '7': [
    { id: 'science', name: 'The Living World: Science', pdf: 'The-Living-World-Science.pdf' },
    { id: 'sst', name: 'We and Our World: Social Science', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'hindi', name: 'Hindi Gyan Sagar (ज्ञान सागर)', pdf: 'Hindi-Gyan-Sagar.pdf' },
    { id: 'english_lit', name: 'English Literature', pdf: 'English-Literature.pdf' },
    { id: 'english', name: 'My English Reader', pdf: 'My-English-Reader.pdf' },
    { id: 'eng_prac', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'comp', name: 'Hands On in Computer / ICT', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '6': [
    { id: 'maths', name: 'Secondary Mathematics', pdf: 'Secondary-Mathematics.pdf' },
    { id: 'science', name: 'The Living World: Science', pdf: 'The-Living-World-Science.pdf' },
    { id: 'sst', name: 'We and Our World: Social Science', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'hindi_gs', name: 'Hindi Gyan Sagar (ज्ञान सागर)', pdf: 'Hindi-Gyan-Sagar.pdf' },
    { id: 'hindi_as', name: 'Hindi Abhyas Sagar (अभ्यास सागर)', pdf: 'Hindi-Abhyas-Sagar.pdf' },
    { id: 'english_lit', name: 'English Literature Reader', pdf: 'English-Literature.pdf' },
    { id: 'english_reader', name: 'My English Reader', pdf: 'My-English-Reader.pdf' },
    { id: 'english', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '5': [
    { id: 'maths', name: 'Primary Mathematics (STD-5)', pdf: 'Primary-Mathematics.pdf' },
    { id: 'science', name: 'My Living World (Science)', pdf: 'My-Living-World-Science.pdf' },
    { id: 'sst', name: 'We and Our World: Social Studies', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Hindi-Bhasha-Madhuri.pdf' },
    { id: 'hindi_abhyas', name: 'Hindi Bhasha Abhyas (भाषा अभ्यास)', pdf: 'Hindi-Bhasha-Abhyas.pdf' },
    { id: 'english', name: 'My English Reader', pdf: 'English-Reader.pdf' },
    { id: 'eng_prac', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '4': [
    { id: 'maths', name: 'Primary Mathematics (STD-IV)', pdf: 'Primary-Mathematics.pdf' },
    { id: 'science', name: 'The Living World (Science)', pdf: 'Science-The-Living-World.pdf' },
    { id: 'sst', name: 'We and Our World (Social Science)', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Hindi-Bhasha-Madhuri.pdf' },
    { id: 'english', name: 'My English Reader', pdf: 'My-English-Reader.pdf' },
    { id: 'eng_prac', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' }
  ],
  '3': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Primary-Mathematics.pdf' },
    { id: 'science', name: 'My Living World (Science)', pdf: 'Science.pdf' },
    { id: 'evs', name: 'We and Our World (EVS)', pdf: 'We-And-Our-World-EVS.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Hindi-Bhasha-Madhuri.pdf' },
    { id: 'hindi_abhyas', name: 'Hindi Bhasha Abhyas (भाषा अभ्यास)', pdf: 'Bhasha-Abhyas-Hindi.pdf' },
    { id: 'english', name: 'My English Reader', pdf: 'My-English-Reader.pdf' },
    { id: 'eng_prac', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '2': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Mathematics.pdf' },
    { id: 'evs', name: 'My Living World (EVS)', pdf: 'My-Living-World-EVS.pdf' },
    { id: 'hindi_abhyas', name: 'Hindi Bhasha Abhyas (भाषा अभ्यास)', pdf: 'Bhasha-Abhyas-Hindi.pdf' },
    { id: 'english', name: 'My English Reader', pdf: 'My-English-Reader.pdf' },
    { id: 'eng_prac', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'comp', name: 'Online with Computers', pdf: 'Online-With-Computers.pdf' }
  ],
  '1': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Primary-Mathematics.pdf' },
    { id: 'evs', name: 'My Living World (EVS)', pdf: 'My-Living-World-EVS.pdf' },
    { id: 'english', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'comp', name: 'Online with Computers', pdf: 'Online-With-Computers.pdf' },
    { id: 'gk', name: 'Wow General Knowledge (GK)', pdf: 'Wow-GK.pdf' }
  ],
  'UKG': [
    { id: 'maths', name: 'Kindergarten Mathematics', pdf: 'Mathematics.pdf' },
    { id: 'english', name: 'English Reader & Rhymes', pdf: 'English.pdf' },
    { id: 'hindi_bm', name: 'Bal Madhuri (बाल माधुरी)', pdf: 'Bal-Madhuri-Hindi.pdf' },
    { id: 'hindi_sa', name: 'Shabd Abhyas (शब्द अभ्यास)', pdf: 'Shabd-Abhyas-Hindi.pdf' },
    { id: 'act', name: 'Integrated Activity Book', pdf: 'Integrated-Activity-Book.pdf' },
    { id: 'art', name: 'Art & Craft Drawing Book', pdf: 'Drawing-Art.pdf' }
  ],
  'LKG': [
    { id: 'english', name: 'Fun With English & Phonics', pdf: 'Fun-With-English.pdf' },
    { id: 'maths', name: 'Fun With Maths', pdf: 'Fun-With-Maths.pdf' },
    { id: 'evs', name: 'Environmental Studies (EVS)', pdf: 'EVS.pdf' },
    { id: 'act', name: 'Integrated Activity Workbook', pdf: 'Integrated-Activity-Book.pdf' }
  ]
};

export const DAV_CHAPTERS_MAP = {
  // Class 8 SST
  '8_sst': [
    { num: 16, title: 'Our Constitution', part: 'Unit III: Civics' },
    { num: 11, title: 'The First War of Independence – 1857', part: 'Unit II: History' },
    { num: 12, title: 'Impact of British Rule on India', part: 'Unit II: History' },
    { num: 1, title: 'Resources: Utilisation and Development', part: 'Unit I: Geography' },
    { num: 2, title: 'Natural Resources: Land, Soil and Water', part: 'Unit I: Geography' },
    { num: 3, title: 'Natural Resources: Vegetation and Wildlife', part: 'Unit I: Geography' },
    { num: 4, title: 'Mineral and Energy Resources', part: 'Unit I: Geography' },
    { num: 5, title: 'Agriculture', part: 'Unit I: Geography' },
    { num: 6, title: 'Manufacturing Industries', part: 'Unit I: Geography' },
    { num: 7, title: 'Human Resources', part: 'Unit I: Geography' },
    { num: 8, title: 'The Modern Period', part: 'Unit II: History' },
    { num: 9, title: 'Establishment of Company Rule in India', part: 'Unit II: History' },
    { num: 10, title: 'Colonialism: Rural and Tribal Societies', part: 'Unit II: History' },
    { num: 13, title: 'Colonialism and Urban Change', part: 'Unit II: History' },
    { num: 14, title: 'The Nationalist Movement (1870 to 1947)', part: 'Unit II: History' },
    { num: 15, title: 'India Marches Ahead', part: 'Unit II: History' },
    { num: 17, title: 'Fundamental Rights, Duties and Directive Principles', part: 'Unit III: Civics' },
    { num: 18, title: 'The Union Government: The Legislature', part: 'Unit III: Civics' },
    { num: 19, title: 'The Union Government: The Executive', part: 'Unit III: Civics' },
    { num: 20, title: 'The Union Government: The Judiciary', part: 'Unit III: Civics' },
    { num: 21, title: 'Social Justice and the Marginalised', part: 'Unit III: Civics' },
    { num: 22, title: 'Safeguarding the Marginalised', part: 'Unit III: Civics' }
  ],
  // Class 8 Science
  '8_science': [
    { num: 1, title: 'The Cell – Its Structure and Functions' },
    { num: 2, title: 'Microorganisms: Friends or Foes' },
    { num: 3, title: 'Metals and Non-Metals' },
    { num: 4, title: 'Force and Pressure' },
    { num: 5, title: 'Friction' },
    { num: 6, title: 'Sources of Energy' },
    { num: 7, title: 'Combustion' },
    { num: 8, title: 'Conservation of Plants and Animals' },
    { num: 9, title: 'Crop Production and Its Management' },
    { num: 10, title: 'Refraction and Dispersion of Light' },
    { num: 11, title: 'The Human Eye' },
    { num: 12, title: 'Sound' },
    { num: 13, title: 'Synthetic Fibres and Plastics' },
    { num: 14, title: 'Reproduction in Animals' },
    { num: 15, title: 'Reaching the Age of Adolescence' },
    { num: 16, title: 'Electric Current and Its Chemical Effects' },
    { num: 17, title: 'Stars and Solar System' },
    { num: 18, title: 'Earthquakes' },
    { num: 19, title: 'Pollution of Air' },
    { num: 20, title: 'Pollution of Water' }
  ],
  // Class 8 Maths
  '8_maths': [
    { num: 1, title: 'Squares and Square Roots' },
    { num: 2, title: 'Cubes and Cube Roots' },
    { num: 3, title: 'Exponents and Radicals' },
    { num: 4, title: 'Direct and Inverse Variation' },
    { num: 5, title: 'Profit, Loss and Discount' },
    { num: 6, title: 'Compound Interest' },
    { num: 7, title: 'Algebraic Identities' },
    { num: 8, title: 'Polynomials' },
    { num: 9, title: 'Linear Equations in One Variable' },
    { num: 10, title: 'Parallel Lines' },
    { num: 11, title: 'Understanding Quadrilaterals' },
    { num: 12, title: 'Construction of Quadrilaterals' },
    { num: 13, title: 'Introduction to Graphs' },
    { num: 14, title: 'Mensuration' },
    { num: 15, title: 'Statistics and Probability' },
    { num: 16, title: 'Rotational Symmetry' }
  ],
  // Class 8 Hindi
  '8_hindi': [
    { num: 1, title: 'हम पंछी उन्मुक्त गगन के (शिवमंगल सिंह सुमन)' },
    { num: 2, title: 'असल धन (अबराद मोहसिन)' },
    { num: 3, title: 'अच्छे पड़ोसी के गुण (गोपाल चतुर्वेदी)' },
    { num: 4, title: 'दोपहरी (शकुंत माथुर)' },
    { num: 5, title: 'आकाश को सात सीढ़ियाँ' },
    { num: 6, title: 'आश्रम के अतिथि और संस्मरण' },
    { num: 7, title: 'अन्याय के खिलाफ़ लड़ाई' },
    { num: 8, title: 'दोहे (कबीर, रहीम, बिहारी)' },
    { num: 9, title: 'जब भोलाराम ने पंप लगाया' },
    { num: 10, title: 'बातचीत की कला' },
    { num: 11, title: 'सितारों से आगे (कल्पना चावला)' },
    { num: 12, title: 'पौधे के पंख' },
    { num: 13, title: 'सूर और तुलसी के पद' },
    { num: 14, title: 'बहू की विदा' },
    { num: 15, title: 'कामचोर (इसमत चुग़ताई)' },
    { num: 16, title: 'एक तिनका (हरिऔध)' },
    { num: 17, title: 'सोना (महादेवी वर्मा)' },
    { num: 18, title: 'निर्माण (सोहनलाल द्विवेदी)' },
    { num: 19, title: 'जीवन का सच' },
    { num: 20, title: 'ईर्ष्याः तू न गई मेरे मन से (दिनकर)' }
  ],
  // Class 8 English
  '8_english': [
    { num: 1, title: 'Three Questions (Leo Tolstoy)' },
    { num: 2, title: "Granny's Tree Climbing (Ruskin Bond)" },
    { num: 3, title: 'The Fun They Had (Isaac Asimov)' },
    { num: 4, title: "Father's Help (R. K. Narayan)" },
    { num: 5, title: 'My Mother (Dr. A.P.J. Abdul Kalam)' },
    { num: 6, title: 'The Luncheon (W. Somerset Maugham)' },
    { num: 7, title: "The Children's Song (Rudyard Kipling)" },
    { num: 8, title: 'The Case of the Sharp-Eyed Jeweller' },
    { num: 9, title: 'Couplets (Alexander Pope)' },
    { num: 10, title: 'The Undeserved Reward (Premchand)' },
    { num: 11, title: 'Bangle Sellers (Sarojini Naidu)' },
    { num: 12, title: 'A Bad Dream (Donn Byrne)' }
  ],
  // Class 7 Science
  '7_science': [
    { num: 1, title: 'Nutrition in Living Organisms - Plants' },
    { num: 2, title: 'Nutrition in Living Organisms - Animals' },
    { num: 3, title: 'Acids, Bases and Salts' },
    { num: 4, title: 'Physical and Chemical Changes' },
    { num: 5, title: 'Heat & Temperature' },
    { num: 6, title: 'Respiration in Organisms' },
    { num: 7, title: 'Transportation in Plants and Animals' },
    { num: 8, title: 'Reproduction in Plants' },
    { num: 9, title: 'Motion and Time' },
    { num: 10, title: 'Electric Current and Its Effects' }
  ],
  // Class 7 SST
  '7_sst': [
    { num: 1, title: 'Components of Environment' },
    { num: 2, title: 'Earth and Its Interior' },
    { num: 3, title: 'The Delhi Sultanate' },
    { num: 4, title: 'The Mughal Empire' },
    { num: 5, title: 'Medieval Indian Architecture' },
    { num: 6, title: 'Tribes, Nomads and Settled Communities' },
    { num: 7, title: 'Democracy and Equality (Civics)' }
  ],
  // Class 5 Science
  '5_science': [
    { num: 1, title: 'My Body: Breathing & Skeletal System' },
    { num: 2, title: 'Plants: Seed Dispersal by Wind, Water, Animals' },
    { num: 3, title: 'Forests & Ecological Balance' },
    { num: 4, title: 'Deficiency Diseases (Goitre, Anemia, Scurvy, Rickets)' },
    { num: 5, title: 'Animals – Our Friends' },
    { num: 6, title: 'Rocks & Minerals' },
    { num: 7, title: 'Simple Machines (Lever, Pulley, Inclined Plane)' }
  ],
  // Class 5 SST
  '5_sst': [
    { num: 1, title: 'Importance of Family' },
    { num: 2, title: 'Human Migration' },
    { num: 3, title: 'Variation in Shelters' },
    { num: 4, title: 'Sensitivity Towards Others' },
    { num: 5, title: 'Community Services' },
    { num: 6, title: 'Physical Divisions of India (Himalayas, Thar, Deccan)' },
    { num: 7, title: 'Mapping India & Heritage' }
  ],
  // Class 6 Science
  '6_science': [
    { num: 1, title: 'Our Environment & Biotic Components' },
    { num: 2, title: 'Food & Its Essential Components' },
    { num: 3, title: 'Structure and Nature of Matter' },
    { num: 4, title: 'Separation of Substances' },
    { num: 5, title: 'Changes Around Us' },
    { num: 6, title: 'Measurement and Motion' },
    { num: 7, title: 'Electric Current & Circuits' },
    { num: 8, title: 'Magnetism: Magnetic Poles & Compass' }
  ],
  // Class 6 SST
  '6_sst': [
    { num: 1, title: 'Studying the Past: Sources of History' },
    { num: 2, title: 'Life of Early Man & Stone Age' },
    { num: 3, title: 'The Harappan / Indus Valley Civilisation' },
    { num: 4, title: 'The Vedic Age & Iron Age' },
    { num: 5, title: 'The Earth in the Solar System' },
    { num: 6, title: 'Motions of the Earth: Rotation & Revolution' },
    { num: 7, title: 'Understanding Diversity & Prejudice' }
  ],
  // Class 4 Science (The Living World)
  '4_science': [
    { num: 1, title: 'My Body: Teeth, Tongue and Digestion' },
    { num: 2, title: 'Plants Around Us & Classification' },
    { num: 3, title: 'Flowers and Fruits' },
    { num: 4, title: 'Plants: Adaptation and Habitat' },
    { num: 5, title: 'Birds: Beaks and Claws' },
    { num: 6, title: 'Insects & Creepy Crawlies' },
    { num: 7, title: 'How Animals Survive (Adaptations)' },
    { num: 8, title: 'Food & Nutrition' },
    { num: 9, title: 'Safe Management of Waste' },
    { num: 10, title: 'Water: Properties, Sources & Purification' }
  ],
  // Class 4 Social Science (We and Our World)
  '4_sst': [
    { num: 1, title: 'Family Relationships' },
    { num: 2, title: 'Sensitivity Towards Others' },
    { num: 3, title: 'Celebrating Our Diversity & Festivals' },
    { num: 4, title: 'An Ideal Home & Clean Surroundings' },
    { num: 5, title: 'Bricks and Bridges (Construction & Materials)' },
    { num: 6, title: 'Waste Management (Reduce, Reuse, Recycle)' },
    { num: 7, title: 'The Works We Do (Professions & Livelihood)' },
    { num: 8, title: 'Leisure Time & Hobbies' },
    { num: 9, title: 'Directions, Signs and Maps' },
    { num: 10, title: 'Travel and Transport' },
    { num: 11, title: 'Let Us Travel' },
    { num: 12, title: 'Indian Culture and Heritage' }
  ],
  // Class 4 Mathematics
  '4_maths': [
    { num: 1, title: 'Numbers up to 7 Digits (Indian & International)' },
    { num: 2, title: 'Addition and Subtraction of Large Numbers' },
    { num: 3, title: 'Multiplication & Properties' },
    { num: 4, title: 'Division & Word Problems' },
    { num: 5, title: 'Length: Metric Conversions' },
    { num: 6, title: 'Weight: Grams and Kilograms' },
    { num: 7, title: 'Capacity: Millilitres and Litres' },
    { num: 8, title: 'Time and Calendar (12-hr & 24-hr)' },
    { num: 9, title: 'Fractions: Types & Operations' },
    { num: 10, title: 'Angles & Types of Angles' },
    { num: 11, title: 'Perimeter of Plane Figures' }
  ],
  // Class 4 Hindi (भाषा माधुरी)
  '4_hindi': [
    { num: 1, title: 'फैलती चप्पलें' },
    { num: 2, title: 'उल्टा-पुलटा (कविता)' },
    { num: 3, title: 'अनोखा ढंग' },
    { num: 4, title: 'मित्रता' },
    { num: 5, title: 'सेर को सवा सेर' },
    { num: 6, title: 'पहली बारिश (कविता)' },
    { num: 7, title: 'दादी का रेडियो' },
    { num: 8, title: 'किस्से कहानियों की दुनिया' }
  ],
  // Class 4 English
  '4_english': [
    { num: 1, title: 'Sports: A True Friend & The Mix-up' },
    { num: 2, title: 'Travel: The Rich Lady and the Travel Guide' },
    { num: 3, title: 'Wit and Humour: Clever Birbal & Tenali Rama' },
    { num: 4, title: 'Fantasy and Adventure' },
    { num: 5, title: 'Nature and Living World' }
  ],
  // Class 7 Science
  '7_science': [
    { num: 1, title: 'Nutrition in Living Organisms - Plants' },
    { num: 2, title: 'Nutrition in Living Organisms - Animals & Man' },
    { num: 3, title: 'Chemical Substances and Processes' },
    { num: 4, title: 'Acids, Bases and Salts' },
    { num: 5, title: 'Heat & Measurement of Temperature' },
    { num: 6, title: 'Motion and Time' },
    { num: 7, title: 'Respiration in Organisms' },
    { num: 8, title: 'Transportation in Plants and Animals' },
    { num: 9, title: 'Reproduction in Plants' },
    { num: 10, title: 'Soil & Soil Profile' },
    { num: 11, title: 'Electric Charges at Rest' },
    { num: 12, title: 'Light' }
  ],
  // Class 7 SST
  '7_sst': [
    { num: 1, title: 'Components of Environment' },
    { num: 2, title: 'Earth’s Structure and Landforms' },
    { num: 3, title: 'The Surface and the Interior of the Earth' },
    { num: 4, title: 'Air Around Us & Atmosphere' },
    { num: 5, title: 'Water Surrounding the Earth: Oceans' },
    { num: 6, title: 'Life on the Earth: Biosphere' },
    { num: 7, title: 'Human Environment - Settlements & Transport' },
    { num: 8, title: 'Medieval Period: Sources & Dynasties' },
    { num: 9, title: 'The Delhi Sultanate' },
    { num: 10, title: 'The Mughal Empire' },
    { num: 11, title: 'Monumental Architecture' },
    { num: 12, title: 'Our Constitution and Democratic Governance' },
    { num: 13, title: 'State Government & Legislature' },
    { num: 14, title: 'Media and Democracy' }
  ]
};

/**
 * Get chapters for a class and subject, with safe fallbacks
 */
export function getChaptersForClassSubject(classId, subjectId) {
  const key = `${classId}_${subjectId}`;
  if (DAV_CHAPTERS_MAP[key]) {
    return DAV_CHAPTERS_MAP[key];
  }

  // Generic fallback chapters if not explicitly mapped
  return [
    { num: 1, title: 'Chapter 1: Foundational Principles & Core Concepts' },
    { num: 2, title: 'Chapter 2: Structural Systems & Characteristics' },
    { num: 3, title: 'Chapter 3: Dynamics, Interactions & Evolution' },
    { num: 4, title: 'Chapter 4: Applications, Case Studies & Practices' },
    { num: 5, title: 'Chapter 5: Advanced Problems & Critical Analysis' }
  ];
}
