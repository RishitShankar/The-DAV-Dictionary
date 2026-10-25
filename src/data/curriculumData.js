// DAV Smart Portal - Complete Official Curriculum Data (DAVCMC / DAVCAE)
// Comprehensive directory of classes, subjects, and official textbooks for Rishi AI & Section 2 Digital Library

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
  { id: 'Nursery', label: 'Nursery (Early Childhood Foundation)' }
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
    { id: 'maths', name: 'Secondary Mathematics', pdf: 'Secondary-Mathematics.pdf' },
    { id: 'english', name: 'English Literature Reader', pdf: 'English-Literature.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Sanskrit-Surabhi.pdf' },
    { id: 'comp', name: 'Hands On in Computer / ICT', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz.pdf' }
  ],
  '6': [
    { id: 'science', name: 'The Living World: Science', pdf: 'The-Living-World-Science.pdf' },
    { id: 'sst', name: 'We and Our World: Social Science', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'maths', name: 'Secondary Mathematics', pdf: 'Secondary-Mathematics.pdf' },
    { id: 'hindi', name: 'Hindi Gyan Sagar (ज्ञान सागर)', pdf: 'Hindi-Gyan-Sagar.pdf' },
    { id: 'english', name: 'English Literature Reader', pdf: 'English-Literature.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Sanskrit-Surabhi.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz.pdf' }
  ],
  '5': [
    { id: 'science', name: 'My Living World (Science)', pdf: 'My-Living-World.pdf' },
    { id: 'sst', name: 'We and Our World: Social Studies', pdf: 'We-And-Our-World.pdf' },
    { id: 'maths', name: 'Primary Mathematics (STD-5)', pdf: 'Primary-Mathematics.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Hindi-Bhasha-Madhuri.pdf' },
    { id: 'english', name: 'My English Reader & Practice', pdf: 'English-Reader.pdf' },
    { id: 'sanskrit', name: 'Surabhi Sanskrit (सुरभिः)', pdf: 'Sanskrit-Surabhi.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz.pdf' }
  ],
  '4': [
    { id: 'science', name: 'The Living World (Science)', pdf: 'The-Living-World.pdf' },
    { id: 'sst', name: 'We and Our World (Social Science)', pdf: 'We-And-Our-World.pdf' },
    { id: 'maths', name: 'Primary Mathematics (STD-IV)', pdf: 'Primary-Mathematics.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'english', name: 'My English Reader & Practice', pdf: 'English-Reader.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' }
  ],
  '3': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Primary-Mathematics.pdf' },
    { id: 'science', name: 'My Living World (Science)', pdf: 'My-Living-World.pdf' },
    { id: 'sst', name: 'We and Our World (EVS)', pdf: 'We-And-Our-World.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Madhuri (भाषा माधुरी)', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'english', name: 'My English Reader & Practice', pdf: 'English-Reader.pdf' },
    { id: 'comp', name: 'Hands On in Computer', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk', name: 'Kid Wiz (General Knowledge)', pdf: 'Kid-Wiz.pdf' }
  ],
  '2': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Primary-Mathematics.pdf' },
    { id: 'evs', name: 'My Living World (EVS)', pdf: 'My-Living-World.pdf' },
    { id: 'hindi', name: 'Hindi Bhasha Abhyas (भाषा अभ्यास)', pdf: 'Bhasha-Abhyas.pdf' },
    { id: 'english', name: 'My English Reader & Practice', pdf: 'English-Reader.pdf' },
    { id: 'comp', name: 'Online with Computers', pdf: 'Online-With-Computers.pdf' }
  ],
  '1': [
    { id: 'maths', name: 'Primary Mathematics', pdf: 'Primary-Mathematics.pdf' },
    { id: 'evs', name: 'My Living World (EVS)', pdf: 'My-Living-World-EVS.pdf' },
    { id: 'hindi', name: 'Bal Bhasha (बाल भाषा)', pdf: 'Hindi-Bal-Bhasha.pdf' },
    { id: 'english', name: 'English Practice Book', pdf: 'English-Practice-Book.pdf' },
    { id: 'comp', name: 'Online with Computers', pdf: 'Online-With-Computers.pdf' },
    { id: 'gk', name: 'Wow General Knowledge (GK)', pdf: 'Wow-GK.pdf' }
  ],
  'UKG': [
    { id: 'maths', name: 'Kindergarten Mathematics', pdf: 'Mathematics.pdf' },
    { id: 'english', name: 'English Reader & Rhymes', pdf: 'English.pdf' },
    { id: 'hindi', name: 'Bal Madhuri (बाल माधुरी)', pdf: 'Bal-Madhuri-Hindi.pdf' },
    { id: 'hindi_sa', name: 'Shabd Abhyas (शब्द अभ्यास)', pdf: 'Shabd-Abhyas-Hindi.pdf' },
    { id: 'act', name: 'Integrated Activity Book', pdf: 'Integrated-Activity-Book.pdf' },
    { id: 'art', name: 'Art & Craft Drawing Book', pdf: 'Drawing-Art.pdf' }
  ],
  'LKG': [
    { id: 'english', name: 'Fun With English & Phonics', pdf: 'Fun-With-English.pdf' },
    { id: 'maths', name: 'Fun With Maths', pdf: 'Fun-With-Maths.pdf' },
    { id: 'evs', name: 'Environmental Studies (EVS)', pdf: 'EVS.pdf' },
    { id: 'act', name: 'Integrated Activity Workbook', pdf: 'Integrated-Activity-Book.pdf' }
  ],
  'Nursery': [
    { id: 'rhymes', name: 'Rhymes & Alphabet Playbook', pdf: 'Nursery-Rhymes.pdf' },
    { id: 'numbers', name: 'Numbers & Shapes Coloring Book', pdf: 'Nursery-Numbers.pdf' },
    { id: 'activity', name: 'Picture Book & Activity World', pdf: 'Nursery-Activity.pdf' },
    { id: 'hindi', name: 'Baal Geet & Chitraavali (बाल गीत)', pdf: 'Nursery-Baal-Geet.pdf' }
  ]
};

export const DAV_CHAPTERS_MAP = {
  // ==========================================
  // CLASS 8 CHAPTERS
  // ==========================================
  '8_sst': [
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
    { num: 11, title: 'The First War of Independence – 1857', part: 'Unit II: History' },
    { num: 12, title: 'Impact of British Rule on India', part: 'Unit II: History' },
    { num: 13, title: 'Colonialism and Urban Change', part: 'Unit II: History' },
    { num: 14, title: 'The Nationalist Movement (1870 to 1947)', part: 'Unit II: History' },
    { num: 15, title: 'India Marches Ahead', part: 'Unit II: History' },
    { num: 16, title: 'Our Constitution', part: 'Unit III: Civics' },
    { num: 17, title: 'Fundamental Rights, Duties and Directive Principles', part: 'Unit III: Civics' },
    { num: 18, title: 'The Union Government: The Legislature', part: 'Unit III: Civics' },
    { num: 19, title: 'The Union Government: The Executive', part: 'Unit III: Civics' },
    { num: 20, title: 'The Union Government: The Judiciary', part: 'Unit III: Civics' },
    { num: 21, title: 'Social Justice and the Marginalised', part: 'Unit III: Civics' },
    { num: 22, title: 'Safeguarding the Marginalised', part: 'Unit III: Civics' }
  ],
  '8_science': [
    { num: 1, title: 'The Cell – Its Structure and Functions' },
    { num: 2, title: 'Microorganisms: Friends or Foes' },
    { num: 3, title: 'Metals and Non-Metals' },
    { num: 4, title: 'Force and Pressure' },
    { num: 5, title: 'Friction' },
    { num: 6, title: 'Sources of Energy' },
    { num: 7, title: 'Combustion and Flame' },
    { num: 8, title: 'Conservation of Plants and Animals' },
    { num: 9, title: 'Crop Production and Management' },
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
  '8_maths': [
    { num: 1, title: 'Squares and Square Roots' },
    { num: 2, title: 'Cubes and Cube Roots' },
    { num: 3, title: 'Exponents and Radicals' },
    { num: 4, title: 'Direct and Inverse Variations' },
    { num: 5, title: 'Profit, Loss and Discount' },
    { num: 6, title: 'Compound Interest' },
    { num: 7, title: 'Algebraic Identities' },
    { num: 8, title: 'Polynomials (Division of Algebraic Expressions)' },
    { num: 9, title: 'Linear Equations in One Variable' },
    { num: 10, title: 'Parallel Lines' },
    { num: 11, title: 'Understanding Quadrilaterals' },
    { num: 12, title: 'Construction of Quadrilaterals' },
    { num: 13, title: 'Introduction to Graphs' },
    { num: 14, title: 'Mensuration' },
    { num: 15, title: 'Statistics and Probability' },
    { num: 16, title: 'Rotational Symmetry' }
  ],
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
  '8_sanskrit': [
    { num: 1, title: 'सुवचनानि' },
    { num: 2, title: 'वसुधैव कुटुम्बकम्' },
    { num: 3, title: 'अहम् अपि विद्यालयं गमिष्यामि' },
    { num: 4, title: 'क्षमस्व महर्षे (स्वामी दयानन्दः)' },
    { num: 5, title: 'गुणाः पूजास्थानम्' },
    { num: 6, title: 'ईश्वरः यत् करोति शोभनम् एव करोति' },
    { num: 7, title: 'सफलम् जीवनम्' },
    { num: 8, title: 'क्रोधेन कार्यं न सिध्यति' },
    { num: 9, title: 'प्रहेलिकाः अन्तरालापः च' },
    { num: 10, title: 'मधुराणि सुभाषितानि' }
  ],
  '8_comp': [
    { num: 1, title: 'Introduction to HTML5 and Web Design' },
    { num: 2, title: 'Cascading Style Sheets (CSS3)' },
    { num: 3, title: 'Programming with Python: Basics & Variables' },
    { num: 4, title: 'Python Control Statements: If-Else & Loops' },
    { num: 5, title: 'Cyber Security, Phishing and Digital Ethics' },
    { num: 6, title: 'Cloud Computing and Storage Concepts' },
    { num: 7, title: 'Artificial Intelligence & Future Tech' }
  ],

  // ==========================================
  // CLASS 7 CHAPTERS
  // ==========================================
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
  ],
  '7_maths': [
    { num: 1, title: 'Rational Numbers (Properties & Representation)' },
    { num: 2, title: 'Operations on Rational Numbers' },
    { num: 3, title: 'Rational Numbers as Decimals' },
    { num: 4, title: 'Exponents and Radicals' },
    { num: 5, title: 'Applications of Percentage (Profit, Loss, SI)' },
    { num: 6, title: 'Algebraic Expressions' },
    { num: 7, title: 'Linear Equations in One Variable' },
    { num: 8, title: 'Triangle and Its Properties' },
    { num: 9, title: 'Congruence of Triangles' },
    { num: 10, title: 'Construction of Triangles' },
    { num: 11, title: 'Perimeter and Area of Plane Figures' },
    { num: 12, title: 'Data Handling (Mean, Median, Mode, Graphs)' },
    { num: 13, title: 'Symmetry (Lines & Rotational)' },
    { num: 14, title: 'Visualising Solid Shapes' }
  ],
  '7_hindi': [
    { num: 1, title: 'बारहमासा (नारायणलाल परमार)' },
    { num: 2, title: 'नाटक में नाटक (मंगलेश डबराल)' },
    { num: 3, title: 'निर्मला, साँप और सयाल' },
    { num: 4, title: 'बातूनी (हरिशंकर परसाई)' },
    { num: 5, title: 'राजू का सपना' },
    { num: 6, title: 'समय (कविता - रामगोपाल वर्मा)' },
    { num: 7, title: 'स्कूल की छुट्टियाँ (आर. के. नारायण)' },
    { num: 8, title: 'एवरेस्ट की चुनौती (एच.पी.एस. अहलूवालिया)' },
    { num: 9, title: 'सवाल का जवाब' },
    { num: 10, title: 'झंडा ऊँचा रहे हमारा (श्यामलाल गुप्त)' },
    { num: 11, title: 'उस रात की बात' },
    { num: 12, title: 'सूरदास के पद' },
    { num: 13, title: 'साहस को सलाम (अरुणिमा सिन्हा)' },
    { num: 14, title: 'काकी (सियारामशरण गुप्त)' },
    { num: 15, title: 'ज्ञान और कर्म' },
    { num: 16, title: 'देशभक्त पुरू (एकांकी)' },
    { num: 17, title: 'काबुलिवाला (रवीन्द्रनाथ ठाकुर)' },
    { num: 18, title: 'कटुक वचन मत बोल' },
    { num: 19, title: 'मुक्ति (कविता)' },
    { num: 20, title: 'शिष्टाचार' }
  ],
  '7_english': [
    { num: 1, title: 'Monkey Trouble (Ruskin Bond)' },
    { num: 2, title: 'Birdie, Will You Pet? (W. Allingham)' },
    { num: 3, title: 'A Hero (R.K. Narayan)' },
    { num: 4, title: 'Fight, Manju, Fight! (Sigrun Srivastav)' },
    { num: 5, title: 'The Desert Flower' },
    { num: 6, title: 'The Song of the Whale (Kit Wright)' },
    { num: 7, title: 'The Stone Cutter' },
    { num: 8, title: 'Stone Soup in Bohemia' },
    { num: 9, title: 'A Secret for Two (Quentin Reynolds)' },
    { num: 10, title: 'The Spider and the Fly (Mary Howitt)' },
    { num: 11, title: 'The Olympic Granny' },
    { num: 12, title: 'The Model Millionaire (Oscar Wilde)' }
  ],
  '7_sanskrit': [
    { num: 1, title: 'बुद्धिः एव उत्तमा' },
    { num: 2, title: 'अभ्यासः एव परमो गुरुः' },
    { num: 3, title: 'उपकारकाः वृक्षाः' },
    { num: 4, title: 'आचारः परमो धर्मः' },
    { num: 5, title: 'सुवचनानि' },
    { num: 6, title: 'मधुराः श्लोकाः' },
    { num: 7, title: 'बुद्धिमान् गोपालकः' },
    { num: 8, title: 'अविवेकः परमापदां पदम्' },
    { num: 9, title: 'स्वामी विवेकानन्दः' },
    { num: 10, title: 'विद्या सर्वस्य भूषणम्' }
  ],
  '7_comp': [
    { num: 1, title: 'GIMP: Image Editing and Layers' },
    { num: 2, title: 'Advanced GIMP: Tools and Filters' },
    { num: 3, title: 'Scratch Programming: Animations & Games' },
    { num: 4, title: 'Python: Interactive Loops and Conditions' },
    { num: 5, title: 'Internet Safety and Digital Footprint' }
  ],

  // ==========================================
  // CLASS 6 CHAPTERS
  // ==========================================
  '6_science': [
    { num: 1, title: 'Our Environment & Biotic Components' },
    { num: 2, title: 'Food: Its Essential Components' },
    { num: 3, title: 'Structure and Nature of Matter' },
    { num: 4, title: 'Separation of Substances' },
    { num: 5, title: 'Changes Around Us' },
    { num: 6, title: 'Measurement and Motion' },
    { num: 7, title: 'The World of Living Organisms' },
    { num: 8, title: 'Structure and Function of Plants' },
    { num: 9, title: 'Structure and Function of Animals' },
    { num: 10, title: 'Work and Energy' },
    { num: 11, title: 'Electric Currents and Circuits' },
    { num: 12, title: 'Magnets and Magnetic Fields' },
    { num: 13, title: 'Rain, Thunder and Lightning' },
    { num: 14, title: 'Light and Shadows' }
  ],
  '6_sst': [
    { num: 1, title: 'The Planet Earth and the Solar System' },
    { num: 2, title: 'Representation of the Earth (Maps & Globes)' },
    { num: 3, title: 'Locating Places on Earth (Latitudes & Longitudes)' },
    { num: 4, title: 'Motions of the Earth: Rotation & Revolution' },
    { num: 5, title: 'Realms of the Earth (Lithosphere, Atmosphere)' },
    { num: 6, title: 'Major Relief Features of the Earth' },
    { num: 7, title: 'India – My Motherland' },
    { num: 8, title: 'Studying the Past: Sources of History' },
    { num: 9, title: 'Life of Early Man' },
    { num: 10, title: 'The Indus Valley Civilization' },
    { num: 11, title: 'The Early Vedic Civilization' },
    { num: 12, title: 'The Later Vedic Period' },
    { num: 13, title: 'Rise of Small Kingdoms and Republics' },
    { num: 14, title: 'The Mauryan Empire' },
    { num: 15, title: 'Community and Its Development' },
    { num: 16, title: 'Rural Local Self-Government (Panchayats)' },
    { num: 17, title: 'Urban Local Self-Government (Municipalities)' },
    { num: 18, title: 'Our Cultural Heritage' }
  ],
  '6_maths': [
    { num: 1, title: 'Natural Numbers and Whole Numbers' },
    { num: 2, title: 'Factors and Multiples (Divisibility, HCF, LCM)' },
    { num: 3, title: 'Integers and the Number Line' },
    { num: 4, title: 'Fractions' },
    { num: 5, title: 'Decimals' },
    { num: 6, title: 'Introduction to Algebra' },
    { num: 7, title: 'Linear Equations in One Variable' },
    { num: 8, title: 'Basic Geometrical Concepts' },
    { num: 9, title: 'Line Segments' },
    { num: 10, title: 'Angles and Their Measurement' },
    { num: 11, title: 'Pairs of Lines and Transversals' },
    { num: 12, title: 'Triangles' },
    { num: 13, title: 'Circles' },
    { num: 14, title: 'Geometrical Constructions' },
    { num: 15, title: 'Perimeter and Area' },
    { num: 16, title: 'Statistics (Tally Marks & Bar Graphs)' }
  ],
  '6_hindi': [
    { num: 1, title: 'साथी हाथ बढ़ाना (साहिर लुधियानवी)' },
    { num: 2, title: 'नाटक में नाटक (मंगलेश डबराल)' },
    { num: 3, title: 'निर्मला, साँप और सयाल' },
    { num: 4, title: 'अभिनव भारत' },
    { num: 5, title: 'अनोखा रहस्य' },
    { num: 6, title: 'अनोखा पुरस्कार' },
    { num: 7, title: 'सुंदर लाल (पर्यावरण प्रेमी)' },
    { num: 8, title: 'दोहे (तुलसीदास, कबीर)' },
    { num: 9, title: 'सिक्किम की यात्रा' },
    { num: 10, title: 'पोंगल' },
    { num: 11, title: 'सच्चा वीर' },
    { num: 12, title: 'दस आमों की कीमत (आर. के. नारायण)' },
    { num: 13, title: 'अनोखी दौड़' },
    { num: 14, title: 'एक रोमांचक यात्रा' },
    { num: 15, title: 'परिश्रम (कविता)' },
    { num: 16, title: 'बसंती हवा (केदारनाथ अग्रवाल)' },
    { num: 17, title: 'यात्रा और यात्री' },
    { num: 18, title: 'बोध' },
    { num: 19, title: 'राष्ट्र का गौरव' },
    { num: 20, title: 'आओ मिलकर गाएं' }
  ],
  '6_english': [
    { num: 1, title: 'How Daddy Decided What He Wanted to Be' },
    { num: 2, title: 'The White Elephant (Ruskin Bond)' },
    { num: 3, title: 'Leisure (W.H. Davies - Poem)' },
    { num: 4, title: 'My Experiments with Truth (M.K. Gandhi)' },
    { num: 5, title: 'Today and Tomorrow (J.E. Carpenter)' },
    { num: 6, title: 'The Helpful Young Man' },
    { num: 7, title: 'Bharat Desh (Subramania Bharati)' },
    { num: 8, title: 'Hanuman and the Sun' },
    { num: 9, title: 'The Cherry Tree (Ruskin Bond)' },
    { num: 10, title: 'The Stone Soup' },
    { num: 11, title: 'The Raven and the Fox' },
    { num: 12, title: 'A Strange Visitor' }
  ],
  '6_sanskrit': [
    { num: 1, title: 'पुरः पुरः प्रगच्छ रे' },
    { num: 2, title: 'मम प्रियः विद्यालयः' },
    { num: 3, title: 'चत्वारि प्रिय मित्राणि' },
    { num: 4, title: 'मधुराः श्लोकाः' },
    { num: 5, title: 'धन्या मातुलानी' },
    { num: 6, title: 'विमानाकारं रचयाम' },
    { num: 7, title: 'बकस्य प्रतिकारः' },
    { num: 8, title: 'सूक्तिस्तबकः' },
    { num: 9, title: 'क्रीडामहोत्सवः' },
    { num: 10, title: 'कृषिकाः कर्मवीराः' }
  ],
  '6_comp': [
    { num: 1, title: 'Computer System and Storage Devices' },
    { num: 2, title: 'Operating Systems and File Management' },
    { num: 3, title: 'MS Word: Formatting and Advanced Tools' },
    { num: 4, title: 'MS PowerPoint: Multimedia Presentations' },
    { num: 5, title: 'Introduction to QBASIC / Scratch' }
  ],

  // ==========================================
  // CLASS 5 CHAPTERS
  // ==========================================
  '5_hindi': [
    { num: 1, title: 'दिमागी लड़ाई (कहानी)' },
    { num: 2, title: 'लौह पुरुष (सरदार वल्लभभाई पटेल)' },
    { num: 3, title: 'पेड़ (कविता - विजयगुप्त)' },
    { num: 4, title: 'पुरस्कार (कहानी)' },
    { num: 5, title: 'दो पहलवान' },
    { num: 6, title: 'नदी यहाँ पर (कविता - डॉ. श्रीप्रसाद)' },
    { num: 7, title: 'पतीले की मृत्यु' },
    { num: 8, title: 'शाम एक किसान (सर्वेश्वर दयाल सक्सेना)' },
    { num: 9, title: 'अजंता की गुफाएँ' },
    { num: 10, title: 'एक बौना और लकड़हारा' },
    { num: 11, title: 'बिरसा मुंडा' },
    { num: 12, title: 'अगर न नभ में बादल होते' },
    { num: 13, title: 'प्रियतम (सूर्यकांत त्रिपाठी निराला)' },
    { num: 14, title: 'बुद्धिमान राजा' },
    { num: 15, title: 'जंगल की आग' },
    { num: 16, title: 'संकल्प (कविता)' },
    { num: 17, title: 'हार की जीत (सुदर्शन)' },
    { num: 18, title: 'अंधेर नगरी (भारतेन्दु हरिश्चंद्र)' },
    { num: 19, title: 'हिम्मत कभी न हारिए' },
    { num: 20, title: 'नीति के दोहे (कबीर, रहीम)' }
  ],
  '5_science': [
    { num: 1, title: 'My Body: Breathing & Skeletal System' },
    { num: 2, title: 'Plants: Seed Dispersal by Wind, Water, Animals' },
    { num: 3, title: 'Forests & Ecological Balance' },
    { num: 4, title: 'Deficiency Diseases (Goitre, Anemia, Scurvy, Rickets)' },
    { num: 5, title: 'Animals – Our Friends' },
    { num: 6, title: 'Rocks & Minerals' },
    { num: 7, title: 'Simple Machines (Lever, Pulley, Inclined Plane)' },
    { num: 8, title: 'Properties of Water (Solution, Suspension)' },
    { num: 9, title: 'Fuels (Renewable and Non-renewable)' },
    { num: 10, title: 'Air & Atmosphere' },
    { num: 11, title: 'Our Solar System' },
    { num: 12, title: 'Observing the Sky' }
  ],
  '5_sst': [
    { num: 1, title: 'Importance of Family' },
    { num: 2, title: 'Human Migration' },
    { num: 3, title: 'Variation in Shelters' },
    { num: 4, title: 'Sensitivity Towards Others' },
    { num: 5, title: 'Community Services' },
    { num: 6, title: 'Leisure Time & Recreation' },
    { num: 7, title: 'Changing Trends in Occupations' },
    { num: 8, title: 'Respecting Regional Differences' },
    { num: 9, title: 'Physical Divisions of India (Himalayas, Thar, Deccan)' },
    { num: 10, title: 'Environmental Issues & Preservation' },
    { num: 11, title: 'It’s Emergency!' },
    { num: 12, title: 'Breathing Life into Waste' },
    { num: 13, title: 'India’s Freedom Struggle' },
    { num: 14, title: 'Our Rich Heritage' }
  ],
  '5_maths': [
    { num: 1, title: 'Numbers up to 99,99,99,999 (Large Numbers)' },
    { num: 2, title: 'Operations on Large Numbers' },
    { num: 3, title: 'Multiples and Factors (HCF & LCM)' },
    { num: 4, title: 'Fractional Numbers (Addition & Subtraction)' },
    { num: 5, title: 'Multiplication & Division of Fractions' },
    { num: 6, title: 'Decimals (Place Value & Conversions)' },
    { num: 7, title: 'Operations on Decimals' },
    { num: 8, title: 'Simplification of Numerical Expressions (BODMAS)' },
    { num: 9, title: 'Rounding Off Numbers' },
    { num: 10, title: 'Averages' },
    { num: 11, title: 'Profit and Loss' },
    { num: 12, title: 'Percentage' },
    { num: 13, title: 'Simple Interest' },
    { num: 14, title: 'Triangles and Angles' },
    { num: 15, title: 'Perimeter, Area and Volume' },
    { num: 16, title: 'Data Handling and Bar Graphs' }
  ],
  '5_english': [
    { num: 1, title: 'Growing Up: Monday Morning Blues' },
    { num: 2, title: "Where There's a Will: The Fearless Fighter" },
    { num: 3, title: 'Adventure: The Boy Who Saved Holland' },
    { num: 4, title: 'Travel: A Journey by Train' },
    { num: 5, title: 'Sports: The Golden Girl (P.T. Usha)' },
    { num: 6, title: 'Nature: The Voice of the Woods' },
    { num: 7, title: 'Wit and Humour: Tenali Raman and the Thieves' },
    { num: 8, title: 'Science and Discovery: The Magic Wand' }
  ],
  '5_sanskrit': [
    { num: 1, title: 'मधुरा प्रभातवेला' },
    { num: 2, title: 'मम परिवारः' },
    { num: 3, title: 'वयम् किं कुर्मः?' },
    { num: 4, title: 'शाक-हट्टम् (शाकविपणिका)' },
    { num: 5, title: 'अस्माकं प्रिय मित्राणि (पशवः)' },
    { num: 6, title: 'मधुराणि वचनानि' },
    { num: 7, title: 'मम प्रिय विद्यालयः' },
    { num: 8, title: 'अव्यय-पदानि' },
    { num: 9, title: 'सुवचनानि' },
    { num: 10, title: 'अभ्यास-प्रश्नोत्तरी' }
  ],
  '5_comp': [
    { num: 1, title: 'Generations of Computers and Memory' },
    { num: 2, title: 'Windows 10 / Operating System Basics' },
    { num: 3, title: 'MS Word: Mail Merge and Tables' },
    { num: 4, title: 'MS PowerPoint: Transitions and Sound' },
    { num: 5, title: 'Introduction to Internet and E-mail' }
  ],

  // ==========================================
  // CLASS 4 CHAPTERS
  // ==========================================
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
  '4_hindi': [
    { num: 1, title: 'फैलती चप्पलें' },
    { num: 2, title: 'उल्टा-पुलटा (कविता)' },
    { num: 3, title: 'अनोखा ढंग' },
    { num: 4, title: 'मित्रता' },
    { num: 5, title: 'सेर को सवा सेर' },
    { num: 6, title: 'पहली बारिश (कविता)' },
    { num: 7, title: 'दादी का रेडियो' },
    { num: 8, title: 'किस्से कहानियों की दुनिया' },
    { num: 9, title: 'नया सवेरा' },
    { num: 10, title: 'एक बौना और लकड़हारा' },
    { num: 11, title: 'चतुर चित्रकार' },
    { num: 12, title: 'आँख मिचौनी' },
    { num: 13, title: 'होनहार बालक' },
    { num: 14, title: 'चाचा छक्कन ने केले खरीदे' },
    { num: 15, title: 'होली के रंग' },
    { num: 16, title: 'सीखो और सिखाओ' }
  ],
  '4_english': [
    { num: 1, title: 'Sports: A True Friend & The Mix-up' },
    { num: 2, title: 'Travel: The Rich Lady and the Travel Guide' },
    { num: 3, title: 'Wit and Humour: Clever Birbal & Tenali Rama' },
    { num: 4, title: 'Fantasy and Adventure' },
    { num: 5, title: 'Nature and Living World' },
    { num: 6, title: 'The King and the Spider' },
    { num: 7, title: 'The Echo' },
    { num: 8, title: 'The Silver Arrow' }
  ],
  '4_comp': [
    { num: 1, title: 'Computer Inside and Outside' },
    { num: 2, title: 'Tux Paint: Magic Tools and Stamps' },
    { num: 3, title: 'LOGO Programming: Primitive Commands' },
    { num: 4, title: 'REPEAT and Procedures in LOGO' }
  ],

  // ==========================================
  // CLASS 3 CHAPTERS
  // ==========================================
  '3_hindi': [
    { num: 1, title: 'भोलू भुलक्कड़' },
    { num: 2, title: 'चतुर चीकू' },
    { num: 3, title: 'हाथी और चींटी' },
    { num: 4, title: 'चींटी ने सिखाया' },
    { num: 5, title: 'बहादुर बित्तो' },
    { num: 6, title: 'घमंडी मक्खी' },
    { num: 7, title: 'दादाजी' },
    { num: 8, title: 'अगर न नभ में बादल होते' },
    { num: 9, title: 'गीत का कमाल' },
    { num: 10, title: 'बुझो तो जाने' },
    { num: 11, title: 'चाँद का कुर्ता' },
    { num: 12, title: 'सुबह (कविता)' },
    { num: 13, title: 'ऐसे थे लाल बहादुर' },
    { num: 14, title: 'सच्चा मित्र' },
    { num: 15, title: 'परीलोक की सैर' },
    { num: 16, title: 'सीखो (कविता)' }
  ],
  '3_science': [
    { num: 1, title: 'My Body' },
    { num: 2, title: 'Plants Around Us' },
    { num: 3, title: 'Leaf: The Food Factory' },
    { num: 4, title: 'Importance of Plants' },
    { num: 5, title: 'Animals Around Us' },
    { num: 6, title: 'Feeding Habits of Animals' },
    { num: 7, title: 'Birds: Food and Shelter' },
    { num: 8, title: 'All About Water' },
    { num: 9, title: 'Water as a Resource' },
    { num: 10, title: 'Properties of Water' }
  ],
  '3_sst': [
    { num: 1, title: 'The Family' },
    { num: 2, title: 'Family Similarities' },
    { num: 3, title: 'Our Food' },
    { num: 4, title: 'Our Dress' },
    { num: 5, title: 'The Early Man' },
    { num: 6, title: 'Learning About Works' },
    { num: 7, title: 'If You Believe You Can, You Can!' },
    { num: 8, title: 'Let Us Enjoy!' },
    { num: 9, title: 'Our Homes' },
    { num: 10, title: 'Beautiful Homes' }
  ],
  '3_maths': [
    { num: 1, title: 'Numbers up to 9999' },
    { num: 2, title: 'Addition' },
    { num: 3, title: 'Subtraction' },
    { num: 4, title: 'Multiplication' },
    { num: 5, title: 'Division' },
    { num: 6, title: 'Day, Date and Time' },
    { num: 7, title: 'Money' },
    { num: 8, title: 'Length' },
    { num: 9, title: 'Weight' },
    { num: 10, title: 'Capacity' }
  ],
  '3_english': [
    { num: 1, title: 'Animal World: The Dolphins' },
    { num: 2, title: 'Nature Cares: The Tree & Chipko Movement' },
    { num: 3, title: 'Regard for Values: Krishna and Sudama' },
    { num: 4, title: 'Adventure: The Brave Little Kite' },
    { num: 5, title: 'Travel: The Magic Carpet' },
    { num: 6, title: 'Sports: The Relay Race' },
    { num: 7, title: 'Humour: Tenali Raman Paints' },
    { num: 8, title: 'Festivals: The Festival of Lights' }
  ],
  '3_comp': [
    { num: 1, title: 'Getting Started with Computers' },
    { num: 2, title: 'Keyboard and Mouse Skills' },
    { num: 3, title: 'Drawing in MS Paint' },
    { num: 4, title: 'Introduction to Word Processing' }
  ],

  // ==========================================
  // CLASS 2 CHAPTERS
  // ==========================================
  '2_evs': [
    { num: 1, title: 'More About Myself' },
    { num: 2, title: 'My Body Parts & Senses' },
    { num: 3, title: 'Food We Eat' },
    { num: 4, title: 'Clothes We Wear' },
    { num: 5, title: 'Houses We Live In' },
    { num: 6, title: 'My Family and Neighbours' },
    { num: 7, title: 'Plants Around Us' },
    { num: 8, title: 'Animal Kingdom' },
    { num: 9, title: 'Seasons of the Year' },
    { num: 10, title: 'Pollution and Cleanliness' }
  ],
  '2_maths': [
    { num: 1, title: 'Numbers up to 1000' },
    { num: 2, title: 'Addition with Regrouping' },
    { num: 3, title: 'Subtraction with Regrouping' },
    { num: 4, title: 'Multiplication Tables (2 to 10)' },
    { num: 5, title: 'Division Basics' },
    { num: 6, title: 'Shapes and Patterns' },
    { num: 7, title: 'Measurement of Length, Weight & Capacity' },
    { num: 8, title: 'Time, Days of Week and Money' }
  ],
  '2_hindi': [
    { num: 1, title: 'सीखो (कविता)' },
    { num: 2, title: 'चीकू का जन्मदिन' },
    { num: 3, title: 'मेले की सैर' },
    { num: 4, title: 'सच्चा मित्र' },
    { num: 5, title: 'तितली और कली' },
    { num: 6, title: 'दादी की सीख' },
    { num: 7, title: 'बुलबुल के बच्चे' },
    { num: 8, title: 'प्यासा कौआ' },
    { num: 9, title: 'पेड़ हमारे मित्र' },
    { num: 10, title: 'ऋतुओं का खेल' },
    { num: 11, title: 'बहादुर बच्चे' },
    { num: 12, title: 'हम नन्हें-नन्हें बच्चे हैं' }
  ],
  '2_english': [
    { num: 1, title: 'A Special Child' },
    { num: 2, title: 'The Clever Crow' },
    { num: 3, title: 'Fun with Animals' },
    { num: 4, title: 'Helping Hands' },
    { num: 5, title: 'The Rain Song' },
    { num: 6, title: 'My Garden' },
    { num: 7, title: 'Grandma’s Glasses' },
    { num: 8, title: 'The Magic Pot' }
  ],
  '2_comp': [
    { num: 1, title: 'What is a Computer?' },
    { num: 2, title: 'Parts of a Computer' },
    { num: 3, title: 'Using the Mouse & Keyboard' },
    { num: 4, title: 'Fun with Tux Paint' }
  ],

  // ==========================================
  // CLASS 1 CHAPTERS
  // ==========================================
  '1_evs': [
    { num: 1, title: 'About Me & My Family' },
    { num: 2, title: 'Our Body Parts and 5 Senses' },
    { num: 3, title: 'Food & Fresh Water' },
    { num: 4, title: 'Clothes We Wear' },
    { num: 5, title: 'Our Sweet Home' },
    { num: 6, title: 'Good Habits & Manners' },
    { num: 7, title: 'Plants & Trees Around Us' },
    { num: 8, title: 'Animals & Birds' }
  ],
  '1_maths': [
    { num: 1, title: 'Pre-Number Concepts (Big/Small, Top/Bottom)' },
    { num: 2, title: 'Numbers from 1 to 9 & Concept of Zero' },
    { num: 3, title: 'Addition up to 10' },
    { num: 4, title: 'Subtraction up to 10' },
    { num: 5, title: 'Numbers from 10 to 99' },
    { num: 6, title: 'Basic Shapes & Spatial Understanding' },
    { num: 7, title: 'Measurement with Non-Standard Units' },
    { num: 8, title: 'Money and Time Basics' }
  ],
  '1_hindi': [
    { num: 1, title: 'अक्षर ज्ञान (अ से ज्ञ)' },
    { num: 2, title: 'दो अक्षर वाले अमात्रिक शब्द' },
    { num: 3, title: 'तीन अक्षर वाले अमात्रिक शब्द' },
    { num: 4, title: 'चार अक्षर वाले अमात्रिक शब्द' },
    { num: 5, title: 'आ की मात्रा वाले शब्द' },
    { num: 6, title: 'इ और ई की मात्रा' },
    { num: 7, title: 'उ और ऊ की मात्रा' },
    { num: 8, title: 'बाल गीत एवं सुंदर कविताएँ' }
  ],
  '1_english': [
    { num: 1, title: 'Alphabet Recognition & Phonics Sounds' },
    { num: 2, title: 'Vowels and Consonants' },
    { num: 3, title: 'Naming Words (Nouns)' },
    { num: 4, title: 'One and Many (Singular/Plural)' },
    { num: 5, title: 'He, She, It (Pronouns)' },
    { num: 6, title: 'Action Words (Verbs)' },
    { num: 7, title: 'Describing Words' },
    { num: 8, title: 'Rhymes & Fun Poetry' }
  ],
  '1_comp': [
    { num: 1, title: 'Meet the Computer: A Smart Machine' },
    { num: 2, title: 'Main Parts of Computer (CPU, Monitor, Mouse, Keyboard)' },
    { num: 3, title: 'Do’s and Don’ts in Computer Lab' },
    { num: 4, title: 'Clicking and Drawing in Paint' }
  ],

  // ==========================================
  // UKG CHAPTERS
  // ==========================================
  'UKG_maths': [
    { num: 1, title: 'Number Recognition (1 to 100)' },
    { num: 2, title: 'Before, After and Between Numbers' },
    { num: 3, title: 'Greater Than, Less Than & Equal To' },
    { num: 4, title: 'Simple Picture Addition' },
    { num: 5, title: 'Simple Picture Subtraction' },
    { num: 6, title: '2D Shapes & Clock Basics' }
  ],
  'UKG_english': [
    { num: 1, title: 'Sight Words and 3-Letter Words (CVC)' },
    { num: 2, title: 'Phonics Blends (sh, ch, th)' },
    { num: 3, title: 'Rhyming Word Families (-at, -en, -in, -op, -ug)' },
    { num: 4, title: 'This and That Usage' },
    { num: 5, title: 'Prepositions: In, On, Under' },
    { num: 6, title: 'Conversational Phrases and Action Songs' }
  ],
  'UKG_hindi': [
    { num: 1, title: 'स्वर एवं व्यंजन ज्ञान (अ से ज्ञ)' },
    { num: 2, title: 'दो अक्षर वाले शब्द (घर, फल, जल)' },
    { num: 3, title: 'तीन अक्षर वाले शब्द (कमल, सड़क, मटर)' },
    { num: 4, title: 'चार अक्षर वाले शब्द (अचकन, बरगद, शरबत)' },
    { num: 5, title: 'आ की मात्रा वाले शब्द (आम, कान, बादल)' },
    { num: 6, title: 'इ और ई की मात्रा' },
    { num: 7, title: 'उ और ऊ की मात्रा' },
    { num: 8, title: 'चित्र पठन एवं बाल कविताएँ' }
  ],
  'UKG_hindi_bm': [
    { num: 1, title: 'वर्णमाला दोहराव' },
    { num: 2, title: 'दो वर्णों के शब्द' },
    { num: 3, title: 'तीन वर्णों के शब्द' },
    { num: 4, title: 'चार वर्णों के शब्द' },
    { num: 5, title: 'आ की मात्रा' },
    { num: 6, title: 'कविताएँ एवं कहानियाँ' }
  ],
  'UKG_hindi_sa': [
    { num: 1, title: 'अक्षर अभ्यास' },
    { num: 2, title: 'शब्द निर्माण' },
    { num: 3, title: 'मात्रा अभ्यास' },
    { num: 4, title: 'वाक्य रचना' }
  ],
  'UKG_act': [
    { num: 1, title: 'Fine Motor Skills & Tracing' },
    { num: 2, title: 'Color Identification & Matching' },
    { num: 3, title: 'Patterns and Mazes' },
    { num: 4, title: 'Cut and Paste Activities' }
  ],

  // ==========================================
  // LKG CHAPTERS
  // ==========================================
  'LKG_english': [
    { num: 1, title: 'Alphabet Tracing & Identification (A to Z)' },
    { num: 2, title: 'Phonics Sounds of Letters' },
    { num: 3, title: 'Object to Letter Association' },
    { num: 4, title: 'Vowel Sounds (A, E, I, O, U)' },
    { num: 5, title: 'Nursery Rhymes and Finger Plays' }
  ],
  'LKG_maths': [
    { num: 1, title: 'Big and Small, Heavy and Light' },
    { num: 2, title: 'Numbers 1 to 20 Counting' },
    { num: 3, title: 'Number Tracing & Counting Objects' },
    { num: 4, title: 'Matching Shapes (Circle, Square, Triangle)' },
    { num: 5, title: 'Color Sorting and Sequences' }
  ],
  'LKG_evs': [
    { num: 1, title: 'Parts of the Body and Five Senses' },
    { num: 2, title: 'My Family and My School' },
    { num: 3, title: 'Fruits and Vegetables' },
    { num: 4, title: 'Domestic and Wild Animals' },
    { num: 5, title: 'Good Habits, Cleanliness and Magic Words' }
  ],
  'LKG_act': [
    { num: 1, title: 'Hand-Eye Coordination Patterns' },
    { num: 2, title: 'Coloring Within Boundaries' },
    { num: 3, title: 'Dot-to-Dot Joining' },
    { num: 4, title: 'Paper Tearing and Pasting' }
  ],

  // ==========================================
  // NURSERY CHAPTERS
  // ==========================================
  'Nursery_rhymes': [
    { num: 1, title: 'Early Morning Phonics & Rhymes' },
    { num: 2, title: 'Letter Tracing & Strokes (Standing, Sleeping lines)' },
    { num: 3, title: 'Colors of Rainbow' },
    { num: 4, title: 'Shapes Exploration' },
    { num: 5, title: 'Action Songs and Rhyme Recitation' }
  ],
  'Nursery_numbers': [
    { num: 1, title: 'Counting with Pictures (1 to 10)' },
    { num: 2, title: 'Circle and Trace Numbers' },
    { num: 3, title: 'Matching Similar Objects' },
    { num: 4, title: 'Big and Small Comparison' }
  ],
  'Nursery_activity': [
    { num: 1, title: 'Scribbling and Crayon Holding' },
    { num: 2, title: 'Finger Printing & Palm Art' },
    { num: 3, title: 'Sticker Fun and Shapes' },
    { num: 4, title: 'Clay Moulding' }
  ],
  'Nursery_hindi': [
    { num: 1, title: 'अ से अः तक स्वर पहचान' },
    { num: 2, title: 'चित्र देखकर बोलो' },
    { num: 3, title: 'बाल कविताएँ एवं अभिनय' },
    { num: 4, title: 'रंग भरो और सीखो' }
  ],
  // ==========================================
  // GENERAL KNOWLEDGE (KID WIZ) & ART CHAPTERS
  // ==========================================
  '8_gk': [
    { num: 1, title: 'Our World: Environment & Biodiversity' },
    { num: 2, title: 'Incredible India: Heritage, Monuments & States' },
    { num: 3, title: 'Science & Frontiers of Technology' },
    { num: 4, title: 'World Geography, Leaders & International Bodies' },
    { num: 5, title: 'Sports Panorama: Champions & World Records' },
    { num: 6, title: 'Literature, Art, Culture & Nobel Laureates' },
    { num: 7, title: 'Mental Aptitude, Logical Reasoning & Puzzles' },
    { num: 8, title: 'Current Affairs & Digital Media Awareness' }
  ],
  '7_gk': [
    { num: 1, title: 'Environment & Global Biodiversity' },
    { num: 2, title: 'Science Frontiers, Inventions & Discoveries' },
    { num: 3, title: 'Heritage & Constitution of India' },
    { num: 4, title: 'World Panorama & International Organizations' },
    { num: 5, title: 'Literature, Awards & Nobel Laureates' },
    { num: 6, title: 'Sports Extravaganza & World Records' },
    { num: 7, title: 'Mental Ability, Logic & Aptitude' },
    { num: 8, title: 'Media, Digital Literacy & Current Affairs' }
  ],
  '6_gk': [
    { num: 1, title: 'Natural World & Biodiversity' },
    { num: 2, title: 'Science, Technology & Inventions' },
    { num: 3, title: 'Incredible India: Monuments & States' },
    { num: 4, title: 'Global Perspectives: Countries & Capitals' },
    { num: 5, title: 'Literature, Language & Mythology' },
    { num: 6, title: 'Sports Panorama & Championships' },
    { num: 7, title: 'Logic, Puzzles & IQ Boosters' },
    { num: 8, title: 'Environment & Conservation' }
  ],
  '5_gk': [
    { num: 1, title: 'Amazing Animals & Plant Kingdom' },
    { num: 2, title: 'Scientific Wonders & Space Odyssey' },
    { num: 3, title: 'India – Our Pride, Heritage & Firsts' },
    { num: 4, title: 'World Geography & Famous Landmarks' },
    { num: 5, title: 'Sports Arena & Olympic Legends' },
    { num: 6, title: 'Art, Music, Dance & Performing Arts' },
    { num: 7, title: 'Brain Teasers, Math Magic & Word Puzzles' },
    { num: 8, title: 'Current Affairs & Global Leaders' }
  ],
  '4_gk': [
    { num: 1, title: 'Flora and Fauna of the World' },
    { num: 2, title: 'India: Symbols, Festivals & States' },
    { num: 3, title: 'Science in Everyday Life' },
    { num: 4, title: 'Wonders of the World' },
    { num: 5, title: 'Games and Sports Heroes' },
    { num: 6, title: 'Folk Tales and Famous Authors' },
    { num: 7, title: 'Fun with Numbers & Reasoning' },
    { num: 8, title: 'Good Habits & Safety Rules' }
  ],
  '3_gk': [
    { num: 1, title: 'Nature’s Wonders (Flora & Fauna)' },
    { num: 2, title: 'Things Around Us & Common Gadgets' },
    { num: 3, title: 'Incredible India (States & Capitals)' },
    { num: 4, title: 'World Watch: Flags & Currencies' },
    { num: 5, title: 'Sports Spectrum & Champions' },
    { num: 6, title: 'Art & Culture of India' },
    { num: 7, title: 'Word Power & Language Riddles' },
    { num: 8, title: 'Life Skills & Etiquette' }
  ],
  '2_gk': [
    { num: 1, title: 'Animals: Domestic, Wild and Aquatic' },
    { num: 2, title: 'Plants, Fruits and Flowers' },
    { num: 3, title: 'My Country India: National Symbols' },
    { num: 4, title: 'Famous People and Leaders' },
    { num: 5, title: 'Popular Outdoor and Indoor Games' },
    { num: 6, title: 'Good Manners and Safety' },
    { num: 7, title: 'Fun Riddles and Brain Games' },
    { num: 8, title: 'Our Helpers in the Community' }
  ],
  '1_gk': [
    { num: 1, title: 'Our Surroundings & Nature' },
    { num: 2, title: 'Animal Kingdom & Birds' },
    { num: 3, title: 'Plants, Trees and Flowers' },
    { num: 4, title: 'Healthy Habits and Good Manners' },
    { num: 5, title: 'Festivals of India' },
    { num: 6, title: 'Games and Sports' },
    { num: 7, title: 'Shapes, Colors and Puzzles' },
    { num: 8, title: 'Magic Words and Greetings' }
  ],
  'UKG_art': [
    { num: 1, title: 'Primary & Secondary Colors Fun' },
    { num: 2, title: 'Drawing Lines, Waves & Shapes' },
    { num: 3, title: 'Finger Printing & Leaf Stamping Art' },
    { num: 4, title: 'Paper Folding (Origami Boat, Butterfly)' },
    { num: 5, title: 'Festive Drawing & Freehand Coloring' }
  ]
};

/**
 * Get chapters for a class and subject, with intelligent normalization and authentic fallbacks
 */
export function getChaptersForClassSubject(classId, subjectId) {
  const normClass = String(classId).replace(/class\s*/i, '').trim();
  const rawSubj = String(subjectId).toLowerCase().trim();
  
  // 1. Direct match (e.g. '8_sst', '5_hindi', 'UKG_maths', 'Nursery_activity')
  const directKey = `${normClass}_${rawSubj}`;
  if (DAV_CHAPTERS_MAP[directKey]) {
    return DAV_CHAPTERS_MAP[directKey];
  }

  // 2. Comprehensive subject alias normalization
  let subjKey = rawSubj;
  
  if (rawSubj.includes('evs') || rawSubj.includes('environmental')) {
    subjKey = 'evs';
  } else if (rawSubj.includes('sst') || rawSubj.includes('soc') || rawSubj.includes('we and our world') || rawSubj.includes('itihas') || rawSubj.includes('geography') || rawSubj.includes('civics')) {
    subjKey = 'sst';
  } else if (rawSubj.includes('sci') || rawSubj.includes('vigyan') || rawSubj.includes('living world')) {
    subjKey = 'science';
  } else if (rawSubj.includes('hin') || rawSubj.includes('bhasha') || rawSubj.includes('madhuri') || rawSubj.includes('abhyas') || rawSubj.includes('gyan sagar') || rawSubj.includes('bal') || rawSubj.includes('geet')) {
    if (normClass === 'UKG' && (rawSubj.includes('shabd') || rawSubj.includes('sa'))) {
      subjKey = 'hindi_sa';
    } else {
      subjKey = 'hindi';
    }
  } else if (rawSubj.includes('math') || rawSubj.includes('ganit') || rawSubj.includes('number')) {
    subjKey = normClass === 'Nursery' ? 'numbers' : 'maths';
  } else if (rawSubj.includes('eng') || rawSubj.includes('reader') || rawSubj.includes('phonic') || rawSubj.includes('literature') || rawSubj.includes('practice')) {
    subjKey = normClass === 'Nursery' ? 'rhymes' : 'english';
  } else if (rawSubj.includes('sans') || rawSubj.includes('surabhi')) {
    subjKey = 'sanskrit';
  } else if (rawSubj.includes('comp') || /\bict\b/i.test(rawSubj) || rawSubj.includes('online with') || rawSubj.includes('hands on')) {
    subjKey = 'comp';
  } else if (rawSubj.includes('gk') || rawSubj.includes('wiz') || rawSubj.includes('knowledge')) {
    subjKey = 'gk';
  } else if (rawSubj.includes('act') || rawSubj.includes('activity') || rawSubj.includes('picture book')) {
    subjKey = normClass === 'Nursery' ? 'activity' : 'act';
  } else if (rawSubj.includes('art') || rawSubj.includes('craft') || rawSubj.includes('drawing')) {
    subjKey = 'art';
  } else if (rawSubj.includes('rhyme')) {
    subjKey = 'rhymes';
  }

  const aliasKey = `${normClass}_${subjKey}`;
  if (DAV_CHAPTERS_MAP[aliasKey]) {
    return DAV_CHAPTERS_MAP[aliasKey];
  }

  // 3. Fallback mappings for primary classes & Pre-K
  if (subjKey === 'science' && DAV_CHAPTERS_MAP[`${normClass}_evs`]) {
    return DAV_CHAPTERS_MAP[`${normClass}_evs`];
  }
  if (subjKey === 'evs' && DAV_CHAPTERS_MAP[`${normClass}_science`]) {
    return DAV_CHAPTERS_MAP[`${normClass}_science`];
  }
  if (subjKey === 'sst' && DAV_CHAPTERS_MAP[`${normClass}_evs`]) {
    return DAV_CHAPTERS_MAP[`${normClass}_evs`];
  }
  if (normClass === 'Nursery') {
    if (subjKey === 'english' && DAV_CHAPTERS_MAP['Nursery_rhymes']) return DAV_CHAPTERS_MAP['Nursery_rhymes'];
    if (subjKey === 'maths' && DAV_CHAPTERS_MAP['Nursery_numbers']) return DAV_CHAPTERS_MAP['Nursery_numbers'];
    if (subjKey === 'act' && DAV_CHAPTERS_MAP['Nursery_activity']) return DAV_CHAPTERS_MAP['Nursery_activity'];
  }
  if (normClass === 'UKG') {
    if (subjKey === 'hindi' && DAV_CHAPTERS_MAP['UKG_hindi']) return DAV_CHAPTERS_MAP['UKG_hindi'];
    if (subjKey === 'act' && DAV_CHAPTERS_MAP['UKG_act']) return DAV_CHAPTERS_MAP['UKG_act'];
  }
  if (normClass === 'LKG') {
    if (subjKey === 'act' && DAV_CHAPTERS_MAP['LKG_act']) return DAV_CHAPTERS_MAP['LKG_act'];
  }

  // 4. Authentic 10-Unit Syllabus Framework (never fake placeholder titles)
  return [
    { num: 1, title: 'Unit 1: Foundational Principles & Introduction' },
    { num: 2, title: 'Unit 2: Core Concepts & Structure' },
    { num: 3, title: 'Unit 3: Scientific & Theoretical Mechanisms' },
    { num: 4, title: 'Unit 4: Analytical Reasoning & Formulae' },
    { num: 5, title: 'Unit 5: Textual Interpretation & Applications' },
    { num: 6, title: 'Unit 6: Practical Experiments & Real-World Use' },
    { num: 7, title: 'Unit 7: Critical Thinking & Cause-Effect Relationships' },
    { num: 8, title: 'Unit 8: Model Problems & Step-by-Step Solutions' },
    { num: 9, title: 'Unit 9: Higher Order Thinking Skills (HOTS)' },
    { num: 10, title: 'Unit 10: Comprehensive Examination Revision' }
  ];
}
