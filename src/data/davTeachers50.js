import { getRegisteredUsers } from './preloadedUsers';

// Complete Verified Roster of 50 DAV Public School Faculty Members
// Used in Section 5 (Dimension 5: Faculty WhatsApp Desk & Doubt Clearance)

export const DAV_50_TEACHERS = [
  {
    id: 'tch_01',
    name: 'Mrs. Sunita Sharma',
    subject: 'Science & Biology',
    department: 'Science',
    role: 'HOD Science & Senior Faculty',
    qualification: 'M.Sc. (Botany), B.Ed., CTET',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-A',
    avatarColor: 'from-purple-500 to-indigo-600',
    whatsappNumber: '919470033984',
    initialMessage: "Namaste! I am Mrs. Sunita Sharma. How can I help clarify your Science chapter doubt today?"
  },
  {
    id: 'tch_02',
    name: 'Mr. Rajesh Verma',
    subject: 'Secondary Mathematics',
    department: 'Mathematics',
    role: 'Senior Faculty - Mathematics',
    qualification: 'M.Sc. (Maths), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-C',
    avatarColor: 'from-teal-500 to-cyan-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Mr. Rajesh Verma here. Which numerical problem or theorem do you need help with?"
  },
  {
    id: 'tch_03',
    name: 'Dr. Anand Kumar Mishra',
    subject: 'सुरभि संस्कृत & Vedic Culture',
    department: 'Sanskrit',
    role: 'Senior Acharya',
    qualification: 'Ph.D. Sanskrit, M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-B, 8-D, 7-C',
    avatarColor: 'from-amber-500 to-orange-600',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते! अहं डॉ. आनंद कुमार मिश्रः। संस्कृत विषयस्य शंका-निवारणाय अत्र उपविष्टोऽस्मि।"
  },
  {
    id: 'tch_04',
    name: 'Mrs. Neha Srivastava',
    subject: 'Social Science (History & Civics)',
    department: 'Social Science',
    role: 'Faculty Coordinator - SST',
    qualification: 'M.A. (History), M.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-B, 8-D, 7-D',
    avatarColor: 'from-rose-500 to-pink-600',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome! Feel free to ask any query on Indian Constitution, 1857 Revolt or Map Pointing."
  },
  {
    id: 'tch_05',
    name: 'Mrs. Ritu Raj',
    subject: 'हिंदी (ज्ञान सागर & अभ्यास सागर)',
    department: 'Hindi',
    role: 'Department Lead - Hindi',
    qualification: 'M.A. (Hindi), UGC-NET',
    status: 'Online',
    assignedClass: 'Class 8-A, 8-D, 6-B',
    avatarColor: 'from-fuchsia-500 to-purple-600',
    whatsappNumber: '919470033984',
    initialMessage: "सप्रेम नमस्कार! ज्ञान सागर अथवा अभ्यास सागर के किसी भी पाठ अथवा व्याकरण के प्रश्न पूछिए।"
  },
  {
    id: 'tch_06',
    name: 'Mr. Vikram Sen',
    subject: 'English Literature & Grammar',
    department: 'English',
    role: 'Senior English Faculty',
    qualification: 'M.A. (English), Cambridge CELTA',
    status: 'Online',
    assignedClass: 'Class 8-D, 8-C',
    avatarColor: 'from-blue-500 to-indigo-600',
    whatsappNumber: '919470033984',
    initialMessage: "Greetings! Vikram Sen here. What question in English Reader or Literature can I clarify?"
  },
  {
    id: 'tch_07',
    name: 'Mrs. Manju Sinha',
    subject: 'Primary Wing EVS & Maths',
    department: 'Primary',
    role: 'Primary Wing Incharge (Classes 1-4)',
    qualification: 'B.Sc., M.Ed.',
    status: 'Online',
    assignedClass: 'Class 4-A, 3-B',
    avatarColor: 'from-emerald-500 to-teal-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello children and parents! Mrs. Manju Sinha is here for all Primary EVS & Maths doubts."
  },
  {
    id: 'tch_08',
    name: 'Mrs. Shalini Mehta',
    subject: 'Foundational Early Years (NTT)',
    department: 'Kindergarten',
    role: 'Foundational Head (Nursery, LKG, UKG)',
    qualification: 'NTT Certified, B.A. Child Psychology',
    status: 'Online',
    assignedClass: 'UKG-A, LKG-A, Nursery-A',
    avatarColor: 'from-amber-400 to-pink-500',
    whatsappNumber: '919470033984',
    initialMessage: "Warm greetings! Shalini Ma'am is active to support our kindergarten little angels and parents."
  },
  {
    id: 'tch_09',
    name: 'Mr. Arvind Prasad',
    subject: 'Physics & Optics Specialist',
    department: 'Science',
    role: 'Senior Physics Master',
    qualification: 'M.Sc. (Physics), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-cyan-500 to-blue-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Have doubts in Ray Diagrams, Electricity or Force? Send your question right here."
  },
  {
    id: 'tch_10',
    name: 'Mrs. Anjali Roy',
    subject: 'Chemistry & Periodic Elements',
    department: 'Science',
    role: 'Senior Chemistry Faculty',
    qualification: 'M.Sc. (Chemistry), CSIR-NET',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-violet-500 to-purple-600',
    whatsappNumber: '919470033984',
    initialMessage: "Namaste! Chemical reactions, combustion or synthetic fibers doubts? I'm online to explain."
  },
  {
    id: 'tch_11',
    name: 'Mr. Alok Pandey',
    subject: 'Mathematics & Mensuration',
    department: 'Mathematics',
    role: 'Faculty - Mathematics',
    qualification: 'M.Sc., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 7-A, 7-B',
    avatarColor: 'from-teal-400 to-emerald-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello students! Let's solve any algebra or mensuration problem together."
  },
  {
    id: 'tch_12',
    name: 'Mrs. Pooja Keshri',
    subject: 'English Grammar & Writing Skills',
    department: 'English',
    role: 'Faculty - English Language',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 7-C, 7-D',
    avatarColor: 'from-purple-400 to-pink-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Need assistance with Formal Letters, Tenses or Active/Passive Voice? Ask away."
  },
  {
    id: 'tch_13',
    name: 'Mr. Manoj Kumar',
    subject: 'Hands on Computer & ICT',
    department: 'Computer Science',
    role: 'Lead Computer Instructor',
    qualification: 'MCA, B.Sc. (IT)',
    status: 'Online',
    assignedClass: 'Classes 5 to 8',
    avatarColor: 'from-indigo-500 to-cyan-500',
    whatsappNumber: '919470033984',
    initialMessage: "Greetings! Manoj Sir here for HTML, Scratch, QBasic, and DAV ICT practical tasks."
  },
  {
    id: 'tch_14',
    name: 'Mrs. Vandana Singh',
    subject: 'Biology & Microorganisms',
    department: 'Science',
    role: 'Faculty - Life Sciences',
    qualification: 'M.Sc. (Zoology), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-C, 7-A',
    avatarColor: 'from-emerald-400 to-teal-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello dear students! Feel free to ask any biology or cellular physiology question."
  },
  {
    id: 'tch_15',
    name: 'Mr. Shailesh Jha',
    subject: 'Geography & Natural Resources',
    department: 'Social Science',
    role: 'Faculty - Geography',
    qualification: 'M.A. (Geography), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-sky-500 to-blue-600',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome! Map reading, soil types or climatic zones doubts? Let's discuss."
  },
  {
    id: 'tch_16',
    name: 'Mrs. Kavita Rani',
    subject: 'हिंदी काव्य & निबंध',
    department: 'Hindi',
    role: 'Faculty - Hindi Literature',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 7, Class 6',
    avatarColor: 'from-rose-400 to-red-500',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते! कबीर के दोहे, कविता के भावार्थ अथवा निबंध लेखन पर कोई प्रश्न हो तो पूछें।"
  },
  {
    id: 'tch_17',
    name: 'Mr. Rameshwar Thakur',
    subject: 'संस्कृत व्याकरण & धातु रूप',
    department: 'Sanskrit',
    role: 'Faculty - Sanskrit Vyakaran',
    qualification: 'Acharya, M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 7, Class 6',
    avatarColor: 'from-amber-500 to-yellow-600',
    whatsappNumber: '919470033984',
    initialMessage: "सुप्रभातम्! शब्दरूप, धातुरूप अथवा सन्धि प्रकरणे किमपि संशयं अस्ति चेत् पृच्छतु।"
  },
  {
    id: 'tch_18',
    name: 'Mrs. Sneha Mukherjee',
    subject: 'Fine Arts, Sketching & Craft',
    department: 'Arts',
    role: 'Head of Visual Arts',
    qualification: 'B.F.A., M.F.A. Painting',
    status: 'Online',
    assignedClass: 'Classes 1 to 8',
    avatarColor: 'from-pink-400 to-purple-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello artists! Need tips on poster making, shading techniques or art project submissions?"
  },
  {
    id: 'tch_19',
    name: 'Mr. Pradeep Tiwari',
    subject: 'Physical Education, Yoga & Health',
    department: 'Sports',
    role: 'Chief Sports & Yoga Mentor',
    qualification: 'M.P.Ed., NIS Coach',
    status: 'Online',
    assignedClass: 'Classes 1 to 8',
    avatarColor: 'from-orange-500 to-red-600',
    whatsappNumber: '919470033984',
    initialMessage: "Jai Hind! Pradeep Sir here for sports drills, fitness rules, and annual sports queries."
  },
  {
    id: 'tch_20',
    name: 'Mrs. Deepa Narayan',
    subject: 'Vocal Music, Patriotic & Vedic Hymns',
    department: 'Music',
    role: 'Music Faculty',
    qualification: 'Sangeet Visharad, M.A. Music',
    status: 'Online',
    assignedClass: 'Classes 1 to 8',
    avatarColor: 'from-violet-400 to-fuchsia-600',
    whatsappNumber: '919470033984',
    initialMessage: "Namaste! Inquiries regarding school prayer songs, DAV Anthem, or music competitions welcome!"
  },
  {
    id: 'tch_21',
    name: 'Mr. Sanjay Choudhary',
    subject: 'Civics, Democracy & Governance',
    department: 'Social Science',
    role: 'Senior Faculty - Civics',
    qualification: 'M.A. (Pol. Science), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-blue-600 to-teal-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Parliamentary procedures, fundamental duties or judiciary questions? Ask me."
  },
  {
    id: 'tch_22',
    name: 'Mrs. Rashmi Kumari',
    subject: 'Primary Mathematics (Grades 3-4)',
    department: 'Primary',
    role: 'Primary Mathematics Teacher',
    qualification: 'B.Sc. (Maths), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 4, Class 3',
    avatarColor: 'from-teal-400 to-emerald-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello dear students! Need help with fractions, decimals or word problems in Maths?"
  },
  {
    id: 'tch_23',
    name: 'Mr. Vikas Malhotra',
    subject: 'Robotics, AI & STEM Innovation',
    department: 'Computer Science',
    role: 'STEM & Atal Tinkering Lab Mentor',
    qualification: 'B.Tech (Robotics), M.Tech',
    status: 'Online',
    assignedClass: 'Classes 6 to 8',
    avatarColor: 'from-cyan-400 to-indigo-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hey innovators! Vikas Sir here. Got doubts about robotics logic, sensors, or AI code?"
  },
  {
    id: 'tch_24',
    name: 'Mrs. Suman Tiwari',
    subject: 'We Care: Environmental Studies (EVS)',
    department: 'Primary',
    role: 'Primary EVS Mentor',
    qualification: 'M.Sc. (EVS), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 3, Class 2',
    avatarColor: 'from-lime-500 to-emerald-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello students! Let's protect our nature. Ask any question about plants, animals, and environment."
  },
  {
    id: 'tch_25',
    name: 'Mr. Ajay Kashyap',
    subject: 'Economics & Consumer Awareness',
    department: 'Social Science',
    role: 'Faculty - Social Studies',
    qualification: 'M.A. (Economics), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8-E, 8-B',
    avatarColor: 'from-amber-600 to-orange-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello students! Have queries regarding money, banking, or consumer rights? Ask right away."
  },
  {
    id: 'tch_26',
    name: 'Mrs. Babita Devi',
    subject: 'भाषा माधुरी & भाषा अभ्यास (Grade 4)',
    department: 'Hindi',
    role: 'Primary Hindi Lead',
    qualification: 'M.A. (Hindi), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 4-A, 4-B',
    avatarColor: 'from-rose-500 to-pink-500',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते प्यारे बच्चों! भाषा माधुरी के किसी भी पाठ के प्रश्न उत्तर समझने के लिए यहाँ संदेश भेजें।"
  },
  {
    id: 'tch_27',
    name: 'Mr. Santosh Kumar',
    subject: 'General Science & Lab Experiments',
    department: 'Science',
    role: 'Laboratory Incharge & Faculty',
    qualification: 'B.Sc. (Hons), D.Ed.',
    status: 'Online',
    assignedClass: 'Class 6, Class 5',
    avatarColor: 'from-emerald-500 to-cyan-600',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome! Santosh Sir is here to help with all your practical experiments and observation notes."
  },
  {
    id: 'tch_28',
    name: 'Mrs. Priya Nair',
    subject: 'English Pronunciation & Phonetics',
    department: 'English',
    role: 'Language Lab Coordinator',
    qualification: 'M.A., TEFL Certified',
    status: 'Online',
    assignedClass: 'Classes 5 to 7',
    avatarColor: 'from-fuchsia-400 to-indigo-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Priya Ma'am here. Let's work together to master english phonetics and essay drafting."
  },
  {
    id: 'tch_29',
    name: 'Mr. R.K. Bhardwaj',
    subject: 'Vedic Mathematics Speed Tricks',
    department: 'Mathematics',
    role: 'Senior Vedic Maths Specialist',
    qualification: 'M.Sc., Vedic Maths Fellow',
    status: 'Online',
    assignedClass: 'Classes 6 to 8',
    avatarColor: 'from-yellow-500 to-amber-600',
    whatsappNumber: '919470033984',
    initialMessage: "Namaskar! Multiply large numbers in 2 seconds with Vedic Sutras. Ask your calculation questions."
  },
  {
    id: 'tch_30',
    name: 'Mrs. Archana Das',
    subject: 'संस्कृत सुरभि (Grade 5-6)',
    department: 'Sanskrit',
    role: 'Junior Sanskrit Faculty',
    qualification: 'B.A. (Sanskrit), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 6, Class 5',
    avatarColor: 'from-purple-500 to-pink-600',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते! संस्कृत सरल रूपेण पठितुं पृच्छतु। सर्वेषां प्रश्नानां समाधानं अत्र लप्स्यते।"
  },
  {
    id: 'tch_31',
    name: 'Mr. Amit Singh',
    subject: 'Athletics, Track & Field Coach',
    department: 'Sports',
    role: 'Physical Training Instructor',
    qualification: 'B.P.Ed., Certified Coach',
    status: 'Online',
    assignedClass: 'Classes 4 to 8',
    avatarColor: 'from-red-500 to-orange-500',
    whatsappNumber: '919470033984',
    initialMessage: "Jai Hind! Athletic events, house competitions, or march-past rules? Ask Coach Amit."
  },
  {
    id: 'tch_32',
    name: 'Mrs. Poonam Sharma',
    subject: 'Our Social Environment (Grade 5)',
    department: 'Social Science',
    role: 'Junior SST Faculty',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 5-A, 5-B',
    avatarColor: 'from-teal-500 to-blue-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello children! Ask any query from Class 5 Social Science book 'We and Our World'."
  },
  {
    id: 'tch_33',
    name: 'Mr. Kunal Bose',
    subject: 'Web Technologies & Coding Basics',
    department: 'Computer Science',
    role: 'IT Lab Faculty',
    qualification: 'B.Tech (CSE)',
    status: 'Online',
    assignedClass: 'Classes 6 to 8',
    avatarColor: 'from-cyan-500 to-teal-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello coders! Need assistance with web design, tags, or computer assignments? Let's debug."
  },
  {
    id: 'tch_34',
    name: 'Mrs. Smriti Sharan',
    subject: 'Physics Lab Experiments',
    department: 'Science',
    role: 'Physics Lab Instructor',
    qualification: 'M.Sc. (Physics), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-blue-500 to-violet-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Prism dispersion, mirrors and lenses experiment doubts? Smriti Ma'am is online."
  },
  {
    id: 'tch_35',
    name: 'Mr. Bipin Kumar',
    subject: 'Chemistry Lab Practical Work',
    department: 'Science',
    role: 'Senior Chemistry Demonstrator',
    qualification: 'B.Sc. (Chem), D.Ed.',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-purple-600 to-indigo-600',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome! Acids, bases, litmus tests or chemical equations? Bipin Sir will guide you."
  },
  {
    id: 'tch_36',
    name: 'Mrs. Rekha Gupta',
    subject: 'My English Reader (Grade 3-4)',
    department: 'English',
    role: 'Primary English Teacher',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 4, Class 3',
    avatarColor: 'from-pink-500 to-rose-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello sweet students! Ask questions on your poem recitations, word meanings and stories."
  },
  {
    id: 'tch_37',
    name: 'Mr. Dharmendra Mishra',
    subject: 'नैतिक शिक्षा & Dharma Shiksha',
    department: 'Moral Education',
    role: 'Vedic Ethics Master',
    qualification: 'M.A. Philosophy, B.Ed.',
    status: 'Online',
    assignedClass: 'Classes 3 to 8',
    avatarColor: 'from-amber-500 to-yellow-600',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते! दयानंद जी के जीवन आदर्श, हवन विधि एवं नैतिक शिक्षा के पाठों पर मार्गदर्शन प्राप्त करें।"
  },
  {
    id: 'tch_38',
    name: 'Mrs. Jyoti Swaroop',
    subject: 'LKG Rhymes, Phonics & Alphabets',
    department: 'Kindergarten',
    role: 'LKG Lead Teacher',
    qualification: 'B.A., NTT Certified',
    status: 'Online',
    assignedClass: 'LKG-A',
    avatarColor: 'from-fuchsia-400 to-pink-500',
    whatsappNumber: '919470033984',
    initialMessage: "Warm welcome parents! Jyoti Ma'am is available for all LKG rhymes, coloring and tracing queries."
  },
  {
    id: 'tch_39',
    name: 'Mrs. Madhu Bala',
    subject: 'UKG Numbers, Words & Storytelling',
    department: 'Kindergarten',
    role: 'UKG Lead Teacher',
    qualification: 'M.A., Early Childhood Dipl.',
    status: 'Online',
    assignedClass: 'UKG-A, UKG-B',
    avatarColor: 'from-teal-400 to-cyan-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello parents and little champions! Madhu Ma'am is here for UKG picture talk and vocabulary."
  },
  {
    id: 'tch_40',
    name: 'Mrs. Anita Tripathy',
    subject: 'Nursery Care, Sensorial & Rhymes',
    department: 'Kindergarten',
    role: 'Nursery Wing Educator',
    qualification: 'NTT, Child Care Certified',
    status: 'Online',
    assignedClass: 'Nursery-A',
    avatarColor: 'from-rose-400 to-amber-400',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome dear parents! Anita Ma'am is always ready to assist regarding Nursery fun learning."
  },
  {
    id: 'tch_41',
    name: 'Mr. Hemant Thakur',
    subject: 'Biology Lab Specimens & Microscopy',
    department: 'Science',
    role: 'Senior Lab Assistant',
    qualification: 'B.Sc. (Botany)',
    status: 'Online',
    assignedClass: 'Class 8, Class 7',
    avatarColor: 'from-emerald-600 to-teal-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Slide preparation, microscope focusing or specimen identification queries? Ask here."
  },
  {
    id: 'tch_42',
    name: 'Mrs. Swati Sinha',
    subject: 'French Language & Linguistics',
    department: 'Languages',
    role: 'Foreign Language Faculty',
    qualification: 'M.A. (French), Alliance Française',
    status: 'Online',
    assignedClass: 'Class 6 to 8',
    avatarColor: 'from-blue-400 to-indigo-500',
    whatsappNumber: '919470033984',
    initialMessage: "Bonjour! Swati Ma'am is here to help you master French greetings, verbs and numbers."
  },
  {
    id: 'tch_43',
    name: 'Mr. Gaurav Anand',
    subject: 'Mathematics Olympiad & Aptitude',
    department: 'Mathematics',
    role: 'Olympiad Mentor',
    qualification: 'M.Sc. (Maths), IMO Trainer',
    status: 'Online',
    assignedClass: 'Classes 5 to 8',
    avatarColor: 'from-violet-500 to-teal-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello math champions! Tackle tough logic puzzles and Olympiad challenges right here."
  },
  {
    id: 'tch_44',
    name: 'Mrs. Shilpa Rastogi',
    subject: 'Social Science Project Exhibitions',
    department: 'Social Science',
    role: 'SST Activity Coordinator',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 7, Class 6',
    avatarColor: 'from-amber-500 to-rose-500',
    whatsappNumber: '919470033984',
    initialMessage: "Hello! Need creative ideas for your Social Science portfolio or working model? Let's discuss."
  },
  {
    id: 'tch_45',
    name: 'Mr. Naresh Chandra',
    subject: 'School Discipline & Drill Parade',
    department: 'Sports',
    role: 'Senior Discipline Master',
    qualification: 'Ex-Army Physical Instructor',
    status: 'Online',
    assignedClass: 'All School Wings',
    avatarColor: 'from-slate-600 to-stone-700',
    whatsappNumber: '919470033984',
    initialMessage: "Jai Hind! Punctuality, uniform standards, and morning assembly guidelines assistance here."
  },
  {
    id: 'tch_46',
    name: 'Mrs. Tanuja Sen',
    subject: 'Central Library & Reading Circle',
    department: 'Library',
    role: 'Chief Librarian',
    qualification: 'M.Lib.Sc., UGC-NET',
    status: 'Online',
    assignedClass: 'All Students',
    avatarColor: 'from-indigo-400 to-purple-600',
    whatsappNumber: '919470033984',
    initialMessage: "Welcome to DAV Central Library! Need book recommendations or digital encyclopedia access?"
  },
  {
    id: 'tch_47',
    name: 'Mr. Sudhir Kumar',
    subject: 'Junior Science & Discovery Club',
    department: 'Science',
    role: 'Junior Science Faculty',
    qualification: 'B.Sc., B.Ed.',
    status: 'Online',
    assignedClass: 'Class 5, Class 4',
    avatarColor: 'from-teal-500 to-emerald-600',
    whatsappNumber: '919470033984',
    initialMessage: "Hello young scientists! Send your curiosity questions on shadows, magnets, and gravity!"
  },
  {
    id: 'tch_48',
    name: 'Mrs. Vibha Mishra',
    subject: 'हिंदी रचनात्मक लेखन & व्याकरण',
    department: 'Hindi',
    role: 'Hindi Faculty',
    qualification: 'M.A. (Hindi), B.Ed.',
    status: 'Online',
    assignedClass: 'Class 6, Class 5',
    avatarColor: 'from-rose-500 to-pink-600',
    whatsappNumber: '919470033984',
    initialMessage: "नमस्ते! वर्तनी शुद्धि, मुहावरे अथवा रचनात्मक लेखन में सहायता के लिए यहाँ संपर्क करें।"
  },
  {
    id: 'tch_49',
    name: 'Mr. Praveen Dubey',
    subject: 'General Knowledge & Current Affairs',
    department: 'General Studies',
    role: 'Quiz Master & Lead Educator',
    qualification: 'M.A., B.Ed.',
    status: 'Online',
    assignedClass: 'Classes 3 to 8',
    avatarColor: 'from-cyan-600 to-blue-700',
    whatsappNumber: '919470033984',
    initialMessage: "Hello sharp minds! Have questions on world capitals, inventions, or national symbols? Ask me."
  },
  {
    id: 'tch_50',
    name: 'Mrs. Anuradha Roy',
    subject: 'Student Wellness, Mind & Counseling',
    department: 'Counseling',
    role: 'Senior Counselor & Psychologist',
    qualification: 'M.A. (Psychology), RCI Certified',
    status: 'Online',
    assignedClass: 'All Classes',
    avatarColor: 'from-purple-500 to-teal-400',
    whatsappNumber: '919470033984',
    initialMessage: "Warm greetings! If you feel exam anxiety, study stress, or need friendly advice, I am here for you."
  }
];

/**
 * Dynamically retrieves all teachers:
 * Merges base verified teachers with any newly registered Dimension 5 / Teacher accounts
 * from localStorage (dav_registered_users) and current logged-in user.
 * Registered teachers appear at the very top of the list!
 */
export function getAllTeachers(currentUser = null) {
  let registeredUsers = [];
  try {
    registeredUsers = getRegisteredUsers() || [];
  } catch (e) {
    registeredUsers = [];
  }

  // Filter for teacher accounts
  const teacherUsers = registeredUsers.filter(u => 
    Boolean(
      u.dimension === 5 ||
      u.plan === 'teacher' ||
      u.isTeacher ||
      (u.role && u.role.toLowerCase().includes('teacher')) ||
      (u.dimensionName && u.dimensionName.toLowerCase().includes('faculty'))
    )
  );

  // If currentUser is a teacher and not in registeredUsers list, include them
  if (currentUser && Boolean(
    currentUser.dimension === 5 ||
    currentUser.plan === 'teacher' ||
    currentUser.isTeacher ||
    (currentUser.role && currentUser.role.toLowerCase().includes('teacher')) ||
    (currentUser.dimensionName && currentUser.dimensionName.toLowerCase().includes('faculty'))
  )) {
    const alreadyExists = teacherUsers.some(u => 
      (u.id && currentUser.id && u.id.toLowerCase() === currentUser.id.toLowerCase()) ||
      (u.name && currentUser.name && u.name.toLowerCase() === currentUser.name.toLowerCase())
    );
    if (!alreadyExists) {
      teacherUsers.push(currentUser);
    }
  }

  // Map registered teachers to standard format
  const registeredFaculty = teacherUsers.map((u, idx) => {
    const rawName = u.name || u.id || `Faculty Member ${idx + 1}`;
    const cleanName = (
      rawName.startsWith('Mr.') ||
      rawName.startsWith('Mrs.') ||
      rawName.startsWith('Ms.') ||
      rawName.startsWith('Dr.') ||
      rawName.startsWith('Prof.') ||
      rawName.startsWith('Acharya')
    ) ? rawName : `Prof. ${rawName}`;

    const subj = u.subject || u.department || 'Curriculum Studies';
    const dept = u.department || (
      subj.toLowerCase().includes('scien') || subj.toLowerCase().includes('bio') || subj.toLowerCase().includes('chem') || subj.toLowerCase().includes('phy') ? 'Science' :
      subj.toLowerCase().includes('math') ? 'Mathematics' :
      subj.toLowerCase().includes('sanskrit') ? 'Sanskrit' :
      subj.toLowerCase().includes('hindi') ? 'Hindi' :
      subj.toLowerCase().includes('eng') ? 'English' :
      subj.toLowerCase().includes('social') || subj.toLowerCase().includes('hist') || subj.toLowerCase().includes('geog') ? 'Social Science' :
      subj.toLowerCase().includes('comp') || subj.toLowerCase().includes('ai') || subj.toLowerCase().includes('ict') ? 'Computer Science' :
      'General'
    );
    const wa = u.personalWhatsApp || u.phoneNumber || u.mobileNumber || '919470033984';
    const cleanWa = String(wa).replace(/[^0-9]/g, '') || '919470033984';

    return {
      id: u.id && u.id.startsWith('tch_') ? u.id : `tch_reg_${u.id || idx}`,
      originalId: u.id,
      name: cleanName,
      subject: subj,
      department: dept,
      role: u.role || 'DAV Faculty Teacher (Dimension 5)',
      qualification: u.qualification || 'M.Sc./M.A., B.Ed., CTET Certified',
      status: 'Online',
      assignedClass: `Class ${u.classNum || '8'}-${u.section || 'All'}`,
      avatarColor: u.avatarColor || (idx % 2 === 0 ? 'from-fuchsia-600 to-purple-800' : 'from-teal-500 to-emerald-700'),
      whatsappNumber: cleanWa,
      initialMessage: `Namaste! I am ${cleanName}. How can I assist you with your academic questions and homework doubts today?`,
      isRegisteredFaculty: true,
      registeredUser: u
    };
  });

  // Filter out any duplicates against DAV_50_TEACHERS by name or ID
  const registeredNames = new Set(registeredFaculty.map(t => t.name.toLowerCase()));
  const registeredIds = new Set(registeredFaculty.map(t => t.id.toLowerCase()));

  const filteredBase = DAV_50_TEACHERS.filter(t => 
    !registeredNames.has(t.name.toLowerCase()) && !registeredIds.has(t.id.toLowerCase())
  );

  return [...registeredFaculty, ...filteredBase];
}
