export const DAV_SUBJECTS = {
  8: [
    { 
      id: 'eng8', 
      name: 'English (3 Books)', 
      tagline: 'Reader, Literature & Grammar Practice',
      icon: 'BookOpen', 
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng_reader', title: 'English Reader', type: 'Reader / Prose & Poetry', pdfUrl: '/books/Class 8/english-reader.pdf', size: '31 MB' },
        { id: 'eng_lit', title: 'English Literature', type: 'Literature Reader', pdfUrl: '/books/Class 8/english-literature.pdf', size: '32.5 MB' },
        { id: 'eng_prac', title: 'Practice Book', type: 'Grammar & Exercises', pdfUrl: '/books/Class 8/english-practice.pdf', size: '30.3 MB' }
      ]
    },
    { 
      id: 'hin8', 
      name: 'Hindi - हिन्दी (2 Books)', 
      tagline: 'Gyan Sagar & Abhyas Sagar',
      icon: 'Languages', 
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin_gyan', title: 'ज्ञान सागर (Gyan Sagar)', type: 'Literature / साहित्य', pdfUrl: '/books/Class 8/hindi-gyan-sagar.pdf', size: '37.9 MB' },
        { id: 'hin_abhyas', title: 'अभ्यास सागर (Abhyas Sagar)', type: 'Grammar Practice / व्याकरण अभ्यास', pdfUrl: '/books/Class 8/hindi-abhyas-sagar.pdf', size: '39.9 MB' }
      ]
    },
    { 
      id: 'math8', 
      name: 'DAV Secondary Mathematics', 
      tagline: 'Algebra, Geometry & Arithmetic',
      icon: 'Calculator', 
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math_main', title: 'DAV Secondary Mathematics (Class 8)', type: 'Complete Textbook', pdfUrl: '/books/Class 8/mathematics.pdf', size: '62.2 MB' }
      ]
    },
    { 
      id: 'sci8', 
      name: 'DAV Science & Technology', 
      tagline: 'Physics, Chemistry & Biology',
      icon: 'Sparkles', 
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci_main', title: 'Science & Technology (The Living World)', type: 'Complete Textbook', pdfUrl: '/books/Class 8/science.pdf', size: '149.4 MB' }
      ]
    },
    { 
      id: 'sst8', 
      name: 'Social Science (We and Our World)', 
      tagline: 'History, Civics & Geography',
      icon: 'Compass', 
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'sst_main', title: 'We and Our World (Social Science)', type: 'Integrated Social Science', pdfUrl: '/books/Class 8/social-science.pdf', size: '108.3 MB' }
      ]
    },
    { 
      id: 'sans8', 
      name: 'Sanskrit - संस्कृत (सुरभि)', 
      tagline: 'Sanskrit Surbhi & Vyakaran',
      icon: 'Languages', 
      color: 'from-orange-500 to-amber-700',
      books: [
        { id: 'sans_main', title: 'संस्कृत सुरभि (Surbhi)', type: 'Textbook & Vyakaran', pdfUrl: '/books/Class 8/sanskrit.pdf', size: '43.4 MB' }
      ]
    },
    { 
      id: 'comp8', 
      name: 'Hands on Computer / ICT', 
      tagline: 'Information & Communication Tech',
      icon: 'Cpu', 
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp_main', title: 'Hands on Computer (Class 8)', type: 'Computer Science & ICT', pdfUrl: '/books/Class 8/computer.pdf', size: '66.3 MB' }
      ]
    }
  ],
  LKG: [
    {
      id: 'lkg_eng',
      name: 'Fun with English',
      tagline: 'Vocabulary, Phonics, Letters & Rhymes',
      icon: 'BookOpen',
      color: 'from-blue-500 to-indigo-600',
      books: [
        { id: 'lkg_eng_book', title: 'Fun with English (Pages 1-49)', type: 'Workbook & Phonics', pdfUrl: '/books/LKG/Fun-With-English.pdf', size: '38.2 MB' }
      ]
    },
    {
      id: 'lkg_math',
      name: 'Fun with Maths',
      tagline: 'Numbers, Shapes, Counting & Patterns',
      icon: 'Calculator',
      color: 'from-purple-500 to-indigo-600',
      books: [
        { id: 'lkg_math_book', title: 'Fun with Maths (LKG)', type: 'Early Numeracy Activity Book', pdfUrl: '/books/LKG/Fun-With-Maths.pdf', size: '20.0 MB' }
      ]
    },
    {
      id: 'lkg_evs',
      name: 'Environmental Studies (EVS)',
      tagline: 'Nature, Animals, Plants & Daily Life',
      icon: 'Globe',
      color: 'from-emerald-500 to-teal-600',
      books: [
        { id: 'lkg_evs_book', title: 'EVS for Beginners (LKG)', type: 'Illustrated EVS Reader', pdfUrl: '/books/LKG/EVS.pdf', size: '14.5 MB' }
      ]
    },
    {
      id: 'lkg_act',
      name: 'Integrated Activity Workbook',
      tagline: 'Coloring, Tracing, Puzzles & Motor Skills',
      icon: 'Sparkles',
      color: 'from-amber-500 to-orange-600',
      books: [
        { id: 'lkg_act_book', title: 'Integrated Activity Book LKG', type: 'Creative Activity Book', pdfUrl: '/books/LKG/Integrated-Activity-Book.pdf', size: '15.3 MB' }
      ]
    }
  ],
  UKG: [
    {
      id: 'ukg_math',
      name: 'Kindergarten Mathematics',
      tagline: 'Numbers, Basic Addition, Shapes & Quantities',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'ukg_math_book', title: 'UKG Mathematics & Number Work', type: 'Complete Activity Textbook', pdfUrl: '/books/UKG/Mathematics.pdf', size: '38.6 MB' }
      ]
    },
    {
      id: 'ukg_eng',
      name: 'English Reader & Rhymes',
      tagline: 'Alphabet, Phonics, Sight Words & Stories',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'ukg_eng_book', title: 'English Activity Coursebook (UKG)', type: 'Coursebook & Phonics', pdfUrl: '/books/UKG/English.pdf', size: '32.0 MB' }
      ]
    },
    {
      id: 'ukg_hin_bm',
      name: 'बाल माधुरी (Bal Madhuri Hindi)',
      tagline: 'स्वर, व्यंजन, मात्रा ज्ञान एवं सचित्र कहानियाँ',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'ukg_bm_book', title: 'बाल माधुरी (UKG Hindi)', type: 'सचित्र बाल साहित्य', pdfUrl: '/books/UKG/Bal-Madhuri-Hindi.pdf', size: '38.4 MB' }
      ]
    },
    {
      id: 'ukg_hin_sa',
      name: 'शब्द अभ्यास (Shabd Abhyas)',
      tagline: 'शब्द रचना, वर्तनी एवं वर्णमाला अभ्यास',
      icon: 'Languages',
      color: 'from-orange-600 to-red-700',
      books: [
        { id: 'ukg_sa_book', title: 'शब्द अभ्यास (UKG Practice Book)', type: 'हिन्दी लेखन एवं अभ्यास', pdfUrl: '/books/UKG/Shabd-Abhyas-Hindi.pdf', size: '9.2 MB' }
      ]
    },
    {
      id: 'ukg_act',
      name: 'Integrated Activity Book',
      tagline: 'Holistic Early Childhood Learning Worksheets',
      icon: 'Sparkles',
      color: 'from-purple-600 to-indigo-700',
      books: [
        { id: 'ukg_act_book', title: 'Integrated Activity Book (UKG)', type: 'Multi-Disciplinary Workbook', pdfUrl: '/books/UKG/Integrated-Activity-Book.pdf', size: '44.6 MB' }
      ]
    },
    {
      id: 'ukg_art',
      name: 'Art & Craft Drawing Book',
      tagline: 'Colors, Doodling, Shapes & Visual Creativity',
      icon: 'HeartHandshake',
      color: 'from-pink-500 to-rose-600',
      books: [
        { id: 'ukg_art_book', title: 'Art & Drawing Book (UKG)', type: 'Creative Art & Coloring', pdfUrl: '/books/UKG/Drawing-Art.pdf', size: '12.3 MB' }
      ]
    }
  ],
  1: [
    {
      id: 'math1',
      name: 'Primary Mathematics (Class 1)',
      tagline: 'Numbers, Addition, Subtraction, Time & Shapes',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math1_book', title: 'Primary Mathematics (Class 1)', type: 'Complete Textbook', pdfUrl: '/books/Class 1/Primary-Mathematics.pdf', size: '16.8 MB' }
      ]
    },
    {
      id: 'evs1',
      name: 'My Living World (Class 1 EVS)',
      tagline: 'Plants, Animals, My Family, Food & Nature',
      icon: 'Globe',
      color: 'from-teal-600 to-green-700',
      books: [
        { id: 'evs1_book', title: 'My Living World (Class 1 EVS)', type: 'Integrated EVS Coursebook', pdfUrl: '/books/Class 1/My-Living-World-EVS.pdf', size: '15.6 MB' }
      ]
    },
    {
      id: 'eng1',
      name: 'English Practice Book (Class 1)',
      tagline: 'DAV Phonics, Grammar, Worksheets & Sentences',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng1_prac', title: 'English Practice Book (Class 1)', type: 'Grammar & Activity Book', pdfUrl: '/books/Class 1/English-Practice-Book.pdf', size: '18.0 MB' }
      ]
    },
    {
      id: 'comp1',
      name: 'Online with Computers (Class 1)',
      tagline: 'Computer Hardware, Keyboard & Mouse Basics',
      icon: 'Cpu',
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp1_book', title: 'Online with Computers (Class 1)', type: 'Digital Literacy', pdfUrl: '/books/Class 1/Online-With-Computers.pdf', size: '16.1 MB' }
      ]
    },
    {
      id: 'gk1',
      name: 'Wow General Knowledge (Class 1)',
      tagline: 'India, Animals, Monuments & Fun Trivia',
      icon: 'Sparkles',
      color: 'from-amber-500 to-yellow-600',
      books: [
        { id: 'gk1_book', title: 'Wow GK (Class 1)', type: 'General Awareness & Quizzes', pdfUrl: '/books/Class 1/Wow-GK.pdf', size: '7.7 MB' }
      ]
    }
  ],
  2: [
    {
      id: 'math2',
      name: 'Primary Mathematics (Class 2)',
      tagline: 'Place Value, Money, Measurement, Geometry & Time',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math2_book', title: 'Primary Mathematics (Class 2)', type: 'Complete Textbook', pdfUrl: '/books/Class 2/Mathematics.pdf', size: '21.5 MB' }
      ]
    },
    {
      id: 'evs2',
      name: 'My Living World (Class 2 EVS)',
      tagline: 'Living Beings, Good Habits, Neighborhood & Seasons',
      icon: 'Globe',
      color: 'from-teal-600 to-green-700',
      books: [
        { id: 'evs2_book', title: 'My Living World (Class 2 EVS)', type: 'Integrated EVS', pdfUrl: '/books/Class 2/My-Living-World-EVS.pdf', size: '20.0 MB' }
      ]
    },
    {
      id: 'hin2_abhyas',
      name: 'भाषा अभ्यास (Bhasha Abhyas Class 2)',
      tagline: 'हिन्दी व्याकरण, शब्द भंडार एवं वाक्य रचना',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin2_abhyas_book', title: 'भाषा अभ्यास (Class 2)', type: 'व्याकरण अभ्यास पुस्तिका', pdfUrl: '/books/Class 2/Bhasha-Abhyas-Hindi.pdf', size: '10.6 MB' }
      ]
    },
    {
      id: 'eng2_reader',
      name: 'My English Reader (Class 2)',
      tagline: 'Stories, Poems, Dialogues & Moral Values',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng2_reader_book', title: 'My English Reader (Class 2)', type: 'Coursebook & Stories', pdfUrl: '/books/Class 2/My-English-Reader.pdf', size: '56.2 MB' }
      ]
    },
    {
      id: 'eng2_prac',
      name: 'English Practice Book (Class 2)',
      tagline: 'Nouns, Verbs, Prepositions & Sentence Building',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng2_prac_book', title: 'English Practice Book (Class 2)', type: 'Grammar Worksheets', pdfUrl: '/books/Class 2/English-Practice-Book.pdf', size: '15.3 MB' }
      ]
    },
    {
      id: 'comp2',
      name: 'Online with Computers (Class 2)',
      tagline: 'Operating Systems, Paint, Tux Tools & Typing',
      icon: 'Cpu',
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp2_book', title: 'Online with Computers (Class 2)', type: 'Computer Science & ICT', pdfUrl: '/books/Class 2/Online-With-Computers.pdf', size: '11.1 MB' }
      ]
    }
  ],
  3: [
    {
      id: 'math3',
      name: 'Primary Mathematics (STD-III)',
      tagline: 'Multiplication, Division, Fractions, Money & Geometry',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math3_book', title: 'Primary Mathematics (STD-III)', type: 'Complete Textbook', pdfUrl: '/books/Class 3/Primary-Mathematics.pdf', size: '47.5 MB' }
      ]
    },
    {
      id: 'sci3',
      name: 'Science - My Living World (Class 3)',
      tagline: 'Living & Non-living, Plants, Animals, Food & Matter',
      icon: 'Sparkles',
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci3_book', title: 'My Living World (Class 3 Science)', type: 'General Science Coursebook', pdfUrl: '/books/Class 3/Science.pdf', size: '34.5 MB' }
      ]
    },
    {
      id: 'evs3',
      name: 'We and Our World (Std 3 EVS)',
      tagline: 'Family, Community, Transport, Heritage & Shelter',
      icon: 'Compass',
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'evs3_book', title: 'We and Our World (Std 3 EVS)', type: 'Social Studies & Environment', pdfUrl: '/books/Class 3/We-And-Our-World-EVS.pdf', size: '18.3 MB' }
      ]
    },
    {
      id: 'hin3_bm',
      name: 'भाषा माधुरी (Hindi Bhasha Madhuri)',
      tagline: 'कविता, प्रेरक कहानियाँ एवं हिन्दी साहित्य',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin3_bm_book', title: 'भाषा माधुरी (Class 3)', type: 'हिन्दी पाठ्यपुस्तक', pdfUrl: '/books/Class 3/Hindi-Bhasha-Madhuri.pdf', size: '24.8 MB' }
      ]
    },
    {
      id: 'hin3_ba',
      name: 'भाषा अभ्यास (Hindi Bhasha Abhyas)',
      tagline: 'व्याकरण, वर्तनी, विलोम, पर्यायवाची एवं अभ्यास',
      icon: 'Languages',
      color: 'from-orange-600 to-red-700',
      books: [
        { id: 'hin3_ba_book', title: 'भाषा अभ्यास (Class 3)', type: 'व्याकरण अभ्यास पुस्तिका', pdfUrl: '/books/Class 3/Bhasha-Abhyas-Hindi.pdf', size: '6.7 MB' }
      ]
    },
    {
      id: 'eng3_reader',
      name: 'My English Reader (Class 3)',
      tagline: 'Prose, Poetry, Adventure & Moral Stories',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng3_reader_book', title: 'My English Reader (Class 3)', type: 'Literature & Coursebook', pdfUrl: '/books/Class 3/My-English-Reader.pdf', size: '50.1 MB' }
      ]
    },
    {
      id: 'eng3_prac',
      name: 'English Practice Book (Class 3)',
      tagline: 'Nouns, Pronouns, Verbs, Adjectives & Grammar',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng3_prac_book', title: 'English Practice Book (Class 3)', type: 'Grammar Drills & Exercises', pdfUrl: '/books/Class 3/English-Practice-Book.pdf', size: '24.1 MB' }
      ]
    },
    {
      id: 'comp3',
      name: 'Hands On in Computer (Class 3)',
      tagline: 'Tux Paint, Windows Operations & Word Processing',
      icon: 'Cpu',
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp3_book', title: 'Hands On in Computer (Class 3)', type: 'ICT & Practical Skills', pdfUrl: '/books/Class 3/Hands-On-Computer.pdf', size: '23.7 MB' }
      ]
    },
    {
      id: 'gk3',
      name: 'Kid Wiz (Std 3 GK)',
      tagline: 'Inventions, Nature, Sports, India & World Quiz',
      icon: 'Sparkles',
      color: 'from-yellow-600 to-amber-700',
      books: [
        { id: 'gk3_book', title: 'Kid Wiz (Std 3 GK)', type: 'General Knowledge & Quizzes', pdfUrl: '/books/Class 3/Kid-Wiz-GK.pdf', size: '17.1 MB' }
      ]
    }
  ],
  4: [
    {
      id: 'math4',
      name: 'Primary Mathematics (STD-IV)',
      tagline: 'Large Numbers, Multiplication, Division, Geometry & Perimeter',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math4_book', title: 'Primary Mathematics (STD-IV)', type: 'Complete Textbook', pdfUrl: '/books/Class 4/Primary-Mathematics.pdf', size: '51.9 MB' }
      ]
    },
    {
      id: 'sci4',
      name: 'Science - The Living World (STD-IV)',
      tagline: 'Human Body, Plants, Animals, Birds, Food & Water',
      icon: 'Sparkles',
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci4_book', title: 'The Living World (Class-IV Science)', type: 'Complete Science Textbook', pdfUrl: '/books/Class 4/Science-The-Living-World.pdf', size: '34.5 MB' }
      ]
    },
    {
      id: 'sst4',
      name: 'Social Science - We and Our World',
      tagline: 'Family, Diversity, Shelters, Waste Management & Indian Heritage',
      icon: 'Compass',
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'sst4_book', title: 'We and Our World (STD-IV SST)', type: 'Social Science Textbook', pdfUrl: '/books/Class 4/We-And-Our-World-SST.pdf', size: '60.7 MB' }
      ]
    },
    {
      id: 'hin4_bm',
      name: 'Hindi - भाषा माधुरी (Bhasha Madhuri)',
      tagline: 'प्रेरक प्रसंग, कविताएं, नाटक एवं नैतिक कहानियाँ',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin4_bm_book', title: 'भाषा माधुरी (STD-IV)', type: 'हिन्दी साहित्य पाठ्यपुस्तक', pdfUrl: '/books/Class 4/Hindi-Bhasha-Madhuri.pdf', size: '43.8 MB' }
      ]
    },
    {
      id: 'eng4_reader',
      name: 'My English Reader (STD-IV)',
      tagline: 'Prose, Poetry, Sports, Wit & Adventure Stories',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng4_reader_book', title: 'My English Reader (STD-IV)', type: 'Coursebook & Stories', pdfUrl: '/books/Class 4/My-English-Reader.pdf', size: '50.2 MB' }
      ]
    },
    {
      id: 'eng4_prac',
      name: 'English Practice Book (STD-IV)',
      tagline: 'Naming Words, Pronouns, Verbs, Prepositions & Punctuation',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng4_prac_book', title: 'English Practice Book (STD-IV)', type: 'Grammar & Worksheets', pdfUrl: '/books/Class 4/English-Practice-Book.pdf', size: '46.7 MB' }
      ]
    },
    {
      id: 'comp4',
      name: 'Hands On in Computer (STD-IV)',
      tagline: 'Hardware, Windows, Word Processing, Logo & Internet',
      icon: 'Cpu',
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp4_book', title: 'Hands On in Computer (STD-IV)', type: 'Computer Science & ICT', pdfUrl: '/books/Class 4/Hands-On-Computer.pdf', size: '62.1 MB' }
      ]
    }
  ],
  5: [
    {
      id: 'math5',
      name: 'Primary Mathematics (STD-5)',
      tagline: 'Fractions, Decimals, Operations, Percentage, Profit & Loss',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math5_book', title: 'Primary Mathematics (Class 5)', type: 'Complete Textbook', pdfUrl: '/books/Class 5/Primary-Mathematics.pdf', size: '42.5 MB' }
      ]
    },
    {
      id: 'sci5',
      name: 'Science - My Living World (Class 5)',
      tagline: 'Skeletal System, Plants, Forest Wealth, Diseases & Machines',
      icon: 'Sparkles',
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci5_book', title: 'My Living World (Std 5 Science)', type: 'Complete Science Textbook', pdfUrl: '/books/Class 5/My-Living-World-Science.pdf', size: '27.8 MB' }
      ]
    },
    {
      id: 'sst5',
      name: 'Social Science (We and Our World)',
      tagline: 'Migration, Community Services, Physical Divisions & Heritage',
      icon: 'Compass',
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'sst5_book', title: 'We and Our World (STD 5 SST)', type: 'Integrated Social Science', pdfUrl: '/books/Class 5/We-And-Our-World-SST.pdf', size: '53.1 MB' }
      ]
    },
    {
      id: 'hin5_bm',
      name: 'Hindi - भाषा माधुरी (Bhasha Madhuri)',
      tagline: 'दिमागी पेच, प्रेरक प्रसंग, दोहे एवं राष्ट्रीय चेतना',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin5_bm_book', title: 'भाषा माधुरी (Class 5)', type: 'हिन्दी साहित्य पाठ्यपुस्तक', pdfUrl: '/books/Class 5/Hindi-Bhasha-Madhuri.pdf', size: '35.5 MB' }
      ]
    },
    {
      id: 'hin5_ba',
      name: 'Hindi - भाषा अभ्यास (Bhasha Abhyas)',
      tagline: 'संज्ञा, सर्वनाम, विशेषण, मुहावरे, पत्र लेखन एवं निबंध',
      icon: 'Languages',
      color: 'from-orange-600 to-red-700',
      books: [
        { id: 'hin5_ba_book', title: 'भाषा अभ्यास (Class 5)', type: 'व्याकरण अभ्यास पुस्तिका', pdfUrl: '/books/Class 5/Hindi-Bhasha-Abhyas.pdf', size: '13.7 MB' }
      ]
    },
    {
      id: 'eng5_reader',
      name: 'My English Reader (Class 5)',
      tagline: 'Growing Up, Where There Is a Will, Sports & Values',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng5_reader_book', title: 'My English Reader (Class 5)', type: 'Literature & Coursebook', pdfUrl: '/books/Class 5/English-Reader.pdf', size: '40.3 MB' }
      ]
    },
    {
      id: 'eng5_prac',
      name: 'English Practice Book (Class 5)',
      tagline: 'Tenses, Modals, Conditional Sentences & Prepositions',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng5_prac_book', title: 'English Practice Book (Class 5)', type: 'Grammar & Worksheets', pdfUrl: '/books/Class 5/English-Practice-Book.pdf', size: '37.6 MB' }
      ]
    },
    {
      id: 'sans5',
      name: 'Sanskrit - सुरभि (Surabhi Class 5)',
      tagline: 'संस्कृत वर्णमाला, शब्दरूप, धातु रूप एवं सरल श्लोक',
      icon: 'Languages',
      color: 'from-orange-500 to-amber-700',
      books: [
        { id: 'sans5_book', title: 'सुरभि संस्कृत (Class 5)', type: 'संस्कृत पाठ्यपुस्तक', pdfUrl: '/books/Class 5/Surabhi-Sanskrit.pdf', size: '23.7 MB' }
      ]
    },
    {
      id: 'gk5',
      name: 'General Knowledge (Kid Wiz Std 5)',
      tagline: 'Indian Heritage, World Wonders, Science & Mind Benders',
      icon: 'Sparkles',
      color: 'from-yellow-600 to-amber-700',
      books: [
        { id: 'gk5_book', title: 'Kid Wiz (Std 5 GK)', type: 'General Awareness & Quizzes', pdfUrl: '/books/Class 5/Kid-Wiz-GK.pdf', size: '11.4 MB' }
      ]
    }
  ],
  6: [
    {
      id: 'math6',
      name: 'Secondary Mathematics (Class 6)',
      tagline: 'Number System, Integers, Algebra, Geometry, Mensuration & Ratio',
      icon: 'Calculator',
      color: 'from-emerald-600 to-teal-700',
      books: [
        { id: 'math6_book', title: 'Secondary Mathematics (Class 6)', type: 'Complete Textbook', pdfUrl: '/books/Class 6/Secondary-Mathematics.pdf', size: '62.2 MB' }
      ]
    },
    {
      id: 'sci6',
      name: 'Science - The Living World (Class 6)',
      tagline: 'Our Environment, Food, Nature of Matter, Motion & Electricity',
      icon: 'Sparkles',
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci6_book', title: 'The Living World (Class 6 Science)', type: 'Complete Science Textbook', pdfUrl: '/books/Class 6/The-Living-World-Science.pdf', size: '64.7 MB' }
      ]
    },
    {
      id: 'sst6',
      name: 'Social Science (We and Our World)',
      tagline: 'Early Civilizations, Vedic Age, Earth in Solar System & Diversity',
      icon: 'Compass',
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'sst6_book', title: 'We and Our World (Class 6 SST)', type: 'Integrated Social Science', pdfUrl: '/books/Class 6/We-And-Our-World-SST.pdf', size: '70.7 MB' }
      ]
    },
    {
      id: 'hin6_gs',
      name: 'Hindi - ज्ञान सागर (Gyan Sagar Class 6)',
      tagline: 'प्रेरक कहानियाँ, कविताएँ, एकांकी एवं भारतीय साहित्य',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin6_gs_book', title: 'ज्ञान सागर (Hindi Gyan Sagar Class 6)', type: 'हिन्दी पाठ्यपुस्तक', pdfUrl: '/books/Class 6/Hindi-Gyan-Sagar.pdf', size: '37.9 MB' }
      ]
    },
    {
      id: 'hin6_as',
      name: 'Hindi - अभ्यास सागर (Abhyas Sagar Class 6)',
      tagline: 'वर्ण-विचार, संज्ञा, सर्वनाम, संधि एवं व्यावहारिक व्याकरण',
      icon: 'Languages',
      color: 'from-orange-600 to-red-700',
      books: [
        { id: 'hin6_as_book', title: 'अभ्यास सागर (Hindi Abhyas Sagar Class 6)', type: 'व्याकरण अभ्यास पुस्तिका', pdfUrl: '/books/Class 6/Hindi-Abhyas-Sagar.pdf', size: '39.9 MB' }
      ]
    },
    {
      id: 'eng6_lit',
      name: 'English Literature (Class 6)',
      tagline: 'Stories of Courage, Wit, Humor, Drama & Classic Poetry',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng6_lit_book', title: 'English Literature Reader (Class 6)', type: 'Literature Reader', pdfUrl: '/books/Class 6/English-Literature.pdf', size: '32.5 MB' }
      ]
    },
    {
      id: 'eng6_reader',
      name: 'My English Reader (Class 6)',
      tagline: 'Theme Units, Comprehension, Communication & Expressive Skills',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng6_reader_book', title: 'My English Reader (Class 6)', type: 'Coursebook', pdfUrl: '/books/Class 6/My-English-Reader.pdf', size: '31.0 MB' }
      ]
    },
    {
      id: 'eng6_prac',
      name: 'English Practice Book (Class 6)',
      tagline: 'Regular & Irregular Verbs, Passive Voice, Reported Speech & Clauses',
      icon: 'BookOpen',
      color: 'from-sky-600 to-cyan-700',
      books: [
        { id: 'eng6_prac_book', title: 'English Practice Book (Class 6)', type: 'Comprehensive Grammar', pdfUrl: '/books/Class 6/English-Practice-Book.pdf', size: '5.7 MB' }
      ]
    },
    {
      id: 'sans6',
      name: 'Sanskrit - सुरभि (Surabhi STD-6)',
      tagline: 'संस्कृत व्याकरण, श्लोक संग्रह एवं रोचक पाठमाला',
      icon: 'Languages',
      color: 'from-orange-500 to-amber-700',
      books: [
        { id: 'sans6_book', title: 'सुरभि संस्कृत (STD-6 Sanskrit)', type: 'संस्कृत पाठ्यपुस्तक एवं व्याकरण', pdfUrl: '/books/Class 6/Surabhi-Sanskrit.pdf', size: '35.1 MB' }
      ]
    },
    {
      id: 'gk6',
      name: 'General Knowledge (Kid Wiz STD-6)',
      tagline: 'Space Discoveries, World History, Sports & Current Affairs',
      icon: 'Sparkles',
      color: 'from-yellow-600 to-amber-700',
      books: [
        { id: 'gk6_book', title: 'Kid Wiz (STD-6 GK)', type: 'Quizzes & Olympiad Preparation', pdfUrl: '/books/Class 6/Kid-Wiz-GK.pdf', size: '33.3 MB' }
      ]
    }
  ],
  7: [
    {
      id: 'sci7',
      name: 'Science - The Living World (STD 7)',
      tagline: 'Nutrition in Plants & Animals, Heat, Acids, Bases & Salts, Motion',
      icon: 'Sparkles',
      color: 'from-green-600 to-emerald-800',
      books: [
        { id: 'sci7_book', title: 'The Living World (SCIENCE STD 7)', type: 'Complete Science Textbook', pdfUrl: '/books/Class 7/The-Living-World-Science.pdf', size: '37.9 MB' }
      ]
    },
    {
      id: 'sst7',
      name: 'Social Science (We and Our World STD 7)',
      tagline: 'Medieval India, Earth Structure, Atmosphere, Democracy & State Govt',
      icon: 'Compass',
      color: 'from-purple-600 to-indigo-800',
      books: [
        { id: 'sst7_book', title: 'We and Our World (SST STD-7)', type: 'Integrated Social Science', pdfUrl: '/books/Class 7/We-And-Our-World-SST.pdf', size: '91.0 MB' }
      ]
    },
    {
      id: 'hin7_gs',
      name: 'Hindi - ज्ञान सागर (Gyan Sagar STD 7)',
      tagline: 'कहानियाँ, प्रेरक प्रसंग, दोहे, नाटक एवं कविताएं',
      icon: 'Languages',
      color: 'from-amber-600 to-orange-700',
      books: [
        { id: 'hin7_gs_book', title: 'ज्ञान सागर (Hindi Gyan Sagar STD 7)', type: 'हिन्दी साहित्य पाठ्यपुस्तक', pdfUrl: '/books/Class 7/Hindi-Gyan-Sagar.pdf', size: '103.9 MB' }
      ]
    },
    {
      id: 'eng7_lit',
      name: 'English Literature (STD 7)',
      tagline: 'Classic Literature Reader, Drama, Poetry & Critical Analysis',
      icon: 'BookOpen',
      color: 'from-blue-600 to-indigo-700',
      books: [
        { id: 'eng7_lit_book', title: 'English Literature (STD 7)', type: 'Literature Reader', pdfUrl: '/books/Class 7/English-Literature.pdf', size: '76.4 MB' }
      ]
    },
    {
      id: 'eng7_reader',
      name: 'My English Reader (STD 7)',
      tagline: 'Theme-Based Units, Reading Comprehension & Writing Tasks',
      icon: 'BookOpen',
      color: 'from-indigo-600 to-blue-800',
      books: [
        { id: 'eng7_reader_book', title: 'My English Reader (ENG MY READER STD 7)', type: 'Coursebook', pdfUrl: '/books/Class 7/My-English-Reader.pdf', size: '147.6 MB' }
      ]
    },
    {
      id: 'eng7_prac',
      name: 'English Practice Book (STD 7)',
      tagline: 'Articles, Determiners, Clauses, Voice, Narration & Modals',
      icon: 'BookOpen',
      color: 'from-sky-600 to-cyan-700',
      books: [
        { id: 'eng7_prac_book', title: 'English Practice Book (Grammar STD 7)', type: 'Grammar & Worksheets', pdfUrl: '/books/Class 7/English-Practice-Book.pdf', size: '41.0 MB' }
      ]
    },
    {
      id: 'sans7',
      name: 'Sanskrit - सुरभि (Surabhi STD 7)',
      tagline: 'संस्कृत साहित्य, श्लोक, सन्धि, कारक एवं व्याकरण',
      icon: 'Languages',
      color: 'from-orange-500 to-amber-700',
      books: [
        { id: 'sans7_book', title: 'सुरभि संस्कृत (Sanskrit STD 7)', type: 'संस्कृत पाठ्यपुस्तक', pdfUrl: '/books/Class 7/Surabhi-Sanskrit.pdf', size: '20.3 MB' }
      ]
    },
    {
      id: 'comp7',
      name: 'Hands On in Computer / ICT (STD 7)',
      tagline: 'HTML Basics, Cyber Safety, Programming Concepts & Office',
      icon: 'Cpu',
      color: 'from-cyan-600 to-blue-700',
      books: [
        { id: 'comp7_book', title: 'Hands On Computer (ICT STD 7)', type: 'ICT & Computer Science', pdfUrl: '/books/Class 7/Hands-On-Computer.pdf', size: '121.7 MB' }
      ]
    },
    {
      id: 'gk7',
      name: 'General Knowledge (Kid Wiz STD 7)',
      tagline: 'Global Affairs, Inventions, World Leaders & Quiz Challenges',
      icon: 'Sparkles',
      color: 'from-yellow-600 to-amber-700',
      books: [
        { id: 'gk7_book', title: 'Kid Wiz Quiz Book (STD 7 GK)', type: 'General Knowledge & Quizzes', pdfUrl: '/books/Class 7/Kid-Wiz-GK.pdf', size: '38.6 MB' }
      ]
    }
  ]
};

export const PRICING_TIERS = [
  {
    id: 'free',
    name: 'Free Guest Preview',
    price: 0,
    period: 'Preview Mode',
    badge: 'Demo Access',
    badgeColor: 'bg-slate-200 text-slate-800',
    description: 'Preview the DAV Dictionary layout and curriculum structure.',
    features: [
      'Access to DAV Class 1 to 8 syllabus overview',
      'Preview books and chapter outlines',
      'Standard Shankar AI search'
    ],
    cta: 'Current Plan',
    ctaClass: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
  },
  {
    id: 'normal',
    name: 'Normal Plan (Dimension 1)',
    price: 33,
    period: 'per month',
    badge: 'Beginner Tier',
    badgeColor: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
    description: 'Full digital library access for all DAV textbooks from Class 1 to Class 8.',
    features: [
      'Complete DAV Class 1–8 e-Books & Real PDFs',
      'In-browser full-screen PDF reader',
      'Shankar AI Textbook Q&A Solver'
    ],
    cta: 'Select Normal (₹33)',
    ctaClass: 'bg-emerald-600 hover:bg-emerald-700 text-white'
  },
  {
    id: 'vip',
    name: 'VIP Plan (Dimension 2)',
    price: 66,
    period: 'per term (3 Months)',
    badge: 'Most Popular ⭐',
    badgeColor: 'bg-blue-100 text-blue-800 border border-blue-300',
    description: 'Complete academic booster with chapter summaries, solved Q&A bank, and notes.',
    features: [
      'Everything in Normal Plan',
      'Full Solved Q&A Bank with model answers',
      'High-speed Shankar AI Textbook Grounding'
    ],
    popular: true,
    cta: 'Select VIP (₹66)',
    ctaClass: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
  },
  {
    id: 'vvip',
    name: 'VVIP Plan (Dimension 3)',
    price: 99,
    period: 'Full Academic Year',
    badge: 'Head Boy Elite 🏆',
    badgeColor: 'bg-purple-100 text-purple-800 border border-purple-300',
    description: 'Unlimited 24/7 Shankar AI mentor, custom tests, geopolitics & world knowledge.',
    features: [
      'Everything in VIP Plan',
      'Unlimited 24/7 Shankar AI (Textbook + World)',
      'DAV Board Exam sample papers & answer keys',
      'Priority access to Section 10 creator features'
    ],
    cta: 'Select VVIP (₹99)',
    ctaClass: 'bg-gradient-to-r from-purple-700 to-indigo-900 text-white'
  }
];

