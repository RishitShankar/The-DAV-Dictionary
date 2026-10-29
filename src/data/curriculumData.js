// DAV Smart Portal - Complete Official Curriculum Data (DAVCMC / DAVCAE)
// Comprehensive directory of classes, subjects, textbooks and full chapter maps for Rishi AI

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
  { id: 'Nursery', label: 'Nursery (Early Childhood)' }
];

export const DAV_SUBJECTS_BY_CLASS = {
  '8': [
    { id: 'hin8_gs', name: 'Hindi - ज्ञान सागर (Literature)', badge: 'Literature 📚', pdf: 'hindi-gyan-sagar.pdf' },
    { id: 'hin8_as', name: 'Hindi - अभ्यास सागर (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'hindi-abhyas-sagar.pdf' },
    { id: 'eng8_lit', name: 'English Literature (Class 8)', badge: 'Literature 📖', pdf: 'english-literature.pdf' },
    { id: 'eng8_reader', name: 'My English Reader (Class 8)', badge: 'Coursebook 🌟', pdf: 'english-reader.pdf' },
    { id: 'eng8_prac', name: 'English Practice Book (Class 8)', badge: 'Grammar ✍️', pdf: 'english-practice.pdf' },
    { id: 'math8', name: 'Secondary Mathematics', badge: 'Core Math 📐', pdf: 'mathematics.pdf' },
    { id: 'sci8', name: 'DAV Science & Technology (The Living World)', badge: 'Science 🔬', pdf: 'science.pdf' },
    { id: 'sst8', name: 'Social Science (We and Our World)', badge: 'SST 🌍', pdf: 'social-science.pdf' },
    { id: 'sans8', name: 'Sanskrit - सुरभि (Surabhi)', badge: 'संस्कृतम् 🕉️', pdf: 'sanskrit.pdf' },
    { id: 'comp8', name: 'Hands on Computer / ICT', badge: 'Computer 💻', pdf: 'computer.pdf' },
    { id: 'naitik8', name: 'Naitik Shiksha (नैतिक शिक्षा)', badge: 'Moral Ed 🪔', pdf: 'naitik-shiksha.pdf' }
  ],
  '7': [
    { id: 'hin7_gs', name: 'Hindi - ज्ञान सागर (Literature)', badge: 'Literature 📚', pdf: 'Hindi-Gyan-Sagar.pdf' },
    { id: 'hin7_as', name: 'Hindi - अभ्यास सागर (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'Hindi-Abhyas-Sagar.pdf' },
    { id: 'eng7_lit', name: 'English Literature (STD 7)', badge: 'Literature 📖', pdf: 'English-Literature.pdf' },
    { id: 'eng7_reader', name: 'My English Reader (STD 7)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng7_prac', name: 'English Practice Book (STD 7)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math7', name: 'Secondary Mathematics (STD 7)', badge: 'Core Math 📐', pdf: 'Secondary-Mathematics.pdf' },
    { id: 'sci7', name: 'The Living World: Science (STD 7)', badge: 'Science 🔬', pdf: 'The-Living-World-Science.pdf' },
    { id: 'sst7', name: 'We and Our World: Social Science (STD 7)', badge: 'SST 🌍', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'sans7', name: 'Sanskrit - सुरभि (STD 7)', badge: 'संस्कृतम् 🕉️', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'comp7', name: 'Hands On in Computer / ICT (STD 7)', badge: 'Computer 💻', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk7', name: 'Kid Wiz (General Knowledge STD 7)', badge: 'General Knowledge 🏆', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '6': [
    { id: 'hin6_gs', name: 'Hindi - ज्ञान सागर (Literature)', badge: 'Literature 📚', pdf: 'Hindi-Gyan-Sagar.pdf' },
    { id: 'hin6_as', name: 'Hindi - अभ्यास सागर (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'Hindi-Abhyas-Sagar.pdf' },
    { id: 'eng6_lit', name: 'English Literature (Class 6)', badge: 'Literature 📖', pdf: 'English-Literature.pdf' },
    { id: 'eng6_reader', name: 'My English Reader (Class 6)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng6_prac', name: 'English Practice Book (Class 6)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math6', name: 'Secondary Mathematics (Class 6)', badge: 'Core Math 📐', pdf: 'Secondary-Mathematics.pdf' },
    { id: 'sci6', name: 'The Living World: Science (Class 6)', badge: 'Science 🔬', pdf: 'The-Living-World-Science.pdf' },
    { id: 'sst6', name: 'We and Our World: Social Science (Class 6)', badge: 'SST 🌍', pdf: 'We-And-Our-World-SST.pdf' },
    { id: 'sans6', name: 'Sanskrit - सुरभि (Class 6)', badge: 'संस्कृतम् 🕉️', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'comp6', name: 'Hands On in Computer (Class 6)', badge: 'Computer 💻', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk6', name: 'Kid Wiz (General Knowledge Class 6)', badge: 'General Knowledge 🏆', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '5': [
    { id: 'hin5_bm', name: 'Hindi - भाषा माधुरी (Literature)', badge: 'Literature 📚', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'hin5_ba', name: 'Hindi - भाषा अभ्यास (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'Bhasha-Abhyas.pdf' },
    { id: 'eng5_reader', name: 'My English Reader (Class 5)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng5_prac', name: 'English Practice Book (Class 5)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math5', name: 'Primary Mathematics (STD-5)', badge: 'Primary Math 📐', pdf: 'Primary-Mathematics.pdf' },
    { id: 'sci5', name: 'My Living World (Science Class 5)', badge: 'Science 🔬', pdf: 'My-Living-World.pdf' },
    { id: 'sst5', name: 'We and Our World (Social Studies STD 5)', badge: 'SST 🌍', pdf: 'We-And-Our-World.pdf' },
    { id: 'sans5', name: 'Sanskrit - सुरभि (Class 5)', badge: 'संस्कृतम् 🕉️', pdf: 'Surabhi-Sanskrit.pdf' },
    { id: 'comp5', name: 'Hands On in Computer (Class 5)', badge: 'Computer 💻', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk5', name: 'Kid Wiz (General Knowledge Class 5)', badge: 'General Knowledge 🏆', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '4': [
    { id: 'hin4_bm', name: 'Hindi - भाषा माधुरी (Literature)', badge: 'Literature 📚', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'hin4_ba', name: 'Hindi - भाषा अभ्यास (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'Bhasha-Abhyas.pdf' },
    { id: 'eng4_reader', name: 'My English Reader (STD-IV)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng4_prac', name: 'English Practice Book (STD-IV)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math4', name: 'Primary Mathematics (STD-IV)', badge: 'Primary Math 📐', pdf: 'Primary-Mathematics.pdf' },
    { id: 'sci4', name: 'The Living World (Science STD-IV)', badge: 'Science 🔬', pdf: 'The-Living-World.pdf' },
    { id: 'sst4', name: 'Social Science - We and Our World', badge: 'SST 🌍', pdf: 'We-And-Our-World.pdf' },
    { id: 'comp4', name: 'Hands On in Computer (STD-IV)', badge: 'Computer 💻', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk4', name: 'Kid Wiz (General Knowledge STD-IV)', badge: 'General Knowledge 🏆', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '3': [
    { id: 'hin3_bm', name: 'Hindi - भाषा माधुरी (Literature)', badge: 'Literature 📚', pdf: 'Hindi-Bhasha-Madhuri.pdf' },
    { id: 'hin3_ba', name: 'Hindi - भाषा अभ्यास (Grammar & Practice)', badge: 'Grammar ✍️', pdf: 'Hindi-Bhasha-Abhyas.pdf' },
    { id: 'eng3_reader', name: 'My English Reader (Class 3)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng3_prac', name: 'English Practice Book (Class 3)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math3', name: 'Primary Mathematics (STD-III)', badge: 'Primary Math 📐', pdf: 'Primary-Mathematics.pdf' },
    { id: 'sci3', name: 'My Living World (Class 3 Science)', badge: 'Science 🔬', pdf: 'My-Living-World.pdf' },
    { id: 'sst3', name: 'We and Our World (STD 3 Social Studies)', badge: 'Social Studies 🌍', pdf: 'We-And-Our-World.pdf' },
    { id: 'comp3', name: 'Hands On in Computer (Class 3)', badge: 'Computer 💻', pdf: 'Hands-On-Computer.pdf' },
    { id: 'gk3', name: 'Kid Wiz (General Knowledge Class 3)', badge: 'General Knowledge 🏆', pdf: 'Kid-Wiz-GK.pdf' }
  ],
  '2': [
    { id: 'hin2_bm', name: 'Hindi - भाषा माधुरी (Literature)', badge: 'Literature 📚', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'hin2_abhyas', name: 'Hindi - भाषा अभ्यास (Practice)', badge: 'Grammar ✍️', pdf: 'Bhasha-Abhyas.pdf' },
    { id: 'eng2_reader', name: 'My English Reader (Class 2)', badge: 'Coursebook 🌟', pdf: 'My-English-Reader.pdf' },
    { id: 'eng2_prac', name: 'English Practice Book (Class 2)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math2', name: 'Primary Mathematics (Class 2)', badge: 'Primary Math 📐', pdf: 'Primary-Mathematics.pdf' },
    { id: 'evs2', name: 'My Living World (Class 2 EVS)', badge: 'EVS 🌿', pdf: 'My-Living-World.pdf' },
    { id: 'comp2', name: 'Online with Computers (Class 2)', badge: 'Computer 💻', pdf: 'Online-With-Computers.pdf' }
  ],
  '1': [
    { id: 'hin1_bm', name: 'Hindi - भाषा माधुरी (Literature)', badge: 'Literature 📚', pdf: 'Bhasha-Madhuri.pdf' },
    { id: 'hin1_abhyas', name: 'Hindi - भाषा अभ्यास (Practice)', badge: 'Grammar ✍️', pdf: 'Bhasha-Abhyas.pdf' },
    { id: 'eng1_reader', name: 'My English Reader (Class 1)', badge: 'Coursebook 🌟', pdf: 'English-Reader.pdf' },
    { id: 'eng1_prac', name: 'English Practice Book (Class 1)', badge: 'Grammar ✍️', pdf: 'English-Practice-Book.pdf' },
    { id: 'math1', name: 'Primary Mathematics (Class 1)', badge: 'Primary Math 📐', pdf: 'Primary-Mathematics.pdf' },
    { id: 'evs1', name: 'My Living World (Class 1 EVS)', badge: 'EVS 🌿', pdf: 'My-Living-World-EVS.pdf' },
    { id: 'comp1', name: 'Online with Computers (Class 1)', badge: 'Computer 💻', pdf: 'Online-With-Computers.pdf' },
    { id: 'gk1', name: 'Wow General Knowledge (Class 1)', badge: 'General Knowledge 🏆', pdf: 'Wow-GK.pdf' }
  ],
  'UKG': [
    { id: 'ukg_hin_bm', name: 'बाल माधुरी (Bal Madhuri Hindi)', badge: 'Hindi Stories 🌸', pdf: 'Bal-Madhuri-Hindi.pdf' },
    { id: 'ukg_hin_sa', name: 'शब्द अभ्यास (Shabd Abhyas)', badge: 'Hindi Writing ✍️', pdf: 'Shabd-Abhyas-Hindi.pdf' },
    { id: 'ukg_eng', name: 'English Reader & Rhymes (UKG)', badge: 'English Phonics 📖', pdf: 'English.pdf' },
    { id: 'ukg_math', name: 'Kindergarten Mathematics', badge: 'Numeracy 🔢', pdf: 'Mathematics.pdf' },
    { id: 'ukg_act', name: 'Integrated Activity Book (UKG)', badge: 'Activity Book 🎨', pdf: 'Integrated-Activity-Book.pdf' },
    { id: 'ukg_art', name: 'Art & Craft Drawing Book (UKG)', badge: 'Creative Art 🖌️', pdf: 'Drawing-Art.pdf' }
  ],
  'LKG': [
    { id: 'lkg_eng', name: 'Fun with English (Workbook & Phonics)', badge: 'Phonics & Words 📖', pdf: 'Fun-With-English.pdf' },
    { id: 'lkg_hin', name: 'अक्षर परिचय एवं बाल गीत (Hindi)', badge: 'Hindi Akshar 🌸', pdf: 'Akshar-Parichay.pdf' },
    { id: 'lkg_math', name: 'Fun with Maths (LKG)', badge: 'Numbers & Shapes 🔢', pdf: 'Fun-With-Maths.pdf' },
    { id: 'lkg_evs', name: 'Environmental Studies (EVS)', badge: 'Nature & Senses 🌱', pdf: 'EVS.pdf' },
    { id: 'lkg_act', name: 'Integrated Activity Book LKG', badge: 'Motor Skills 🎨', pdf: 'Integrated-Activity-Book.pdf' }
  ],
  'Nursery': [
    { id: 'rhymes', name: 'Rhymes & Alphabet Playbook', badge: 'Rhymes 🎶', pdf: 'Rhymes.pdf' },
    { id: 'numbers', name: 'Numbers & Shapes Coloring Book', badge: 'Shapes 🔴', pdf: 'Numbers.pdf' },
    { id: 'activity', name: 'Picture Book & Activity World', badge: 'Picture Book 🖼️', pdf: 'Activity.pdf' },
    { id: 'hindi', name: 'Baal Geet & Chitraavali (बाल गीत)', badge: 'गीत 🪔', pdf: 'Baal-Geet.pdf' }
  ]
};

export const DAV_CHAPTERS_MAP = {
  "8_hin8_gs": [
    {
      "num": 1,
      "title": "हम पंछी उन्मुक्त गगन के",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 2,
      "title": "असल धन",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 3,
      "title": "अच्छे पड़ोसी के गुण",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 4,
      "title": "दोपहरी",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 5,
      "title": "आकाश को सात सीढ़ियाँ",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 6,
      "title": "आश्रम के अतिथि और संस्मरण",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 7,
      "title": "अन्याय के ख़िलाफ़ लड़ाई",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 8,
      "title": "दोहे",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 9,
      "title": "जब भोलाराम ने पंप लगाया",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 10,
      "title": "बातचीत की कला",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 11,
      "title": "सितारों से आगे",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 12,
      "title": "पौधे के पंख",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 13,
      "title": "सूर और तुलसी के पद",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 14,
      "title": "बहू की विदा",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 15,
      "title": "कामचोर",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 16,
      "title": "एक तिनका",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 17,
      "title": "सोना",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 18,
      "title": "दुख में हार न मानो",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 19,
      "title": "जीवन का सच",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 20,
      "title": "ईर्ष्या: तू न गई मेरे मन से",
      "part": "ज्ञान सागर (साहित्य)"
    }
  ],
  "8_hin8_as": [
    {
      "num": 1,
      "title": "हम पंछी उन्मुक्त गगन के (अनुस्वार, अनुनासिक व नुक्ता)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 2,
      "title": "असल धन (कारक व उनके भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 3,
      "title": "अच्छे पड़ोसी के गुण (उपसर्ग व प्रत्यय)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 4,
      "title": "दोपहरी (अलंकार - मानवीकरण, अनुप्रास, उपमा)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 5,
      "title": "अन्याय के खिलाफ लड़ाई (स्वर संधि व दीर्घ संधि)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 6,
      "title": "आश्रम के अतिथि और संस्मरण (संज्ञा व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 7,
      "title": "धर्म की आड़ (सर्वनाम व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 8,
      "title": "सुंदर सुरभि (विशेषण व प्रविशेषण)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 9,
      "title": "नन्ना (सकर्मक व अकर्मक क्रिया)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 10,
      "title": "बातचीत की कला (मुहावरे व लोकोक्तियाँ)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 11,
      "title": "अनोखा बदला (विराम चिह्न)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 12,
      "title": "पौधे के पंख (समास - तत्पुरुष व द्वंद्व)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 13,
      "title": "सूर के पद (पद परिचय)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 14,
      "title": "बहू की विदा (रचना के आधार पर वाक्य भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 15,
      "title": "कामचोर (अशुद्धि शोधन)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 16,
      "title": "ज्ञान का भंडार (अनेक शब्दों के लिए एक शब्द)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 17,
      "title": "हार की जीत (विलोम, पर्यायवाची व समरूपी भिन्नार्थक)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 18,
      "title": "हिम्मत कभी न हारिए (अपठित गद्यांश व काव्यांश बोध)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 19,
      "title": "जब मैंने पहली पुस्तक खरीदी (पत्र लेखन - औपचारिक व अनौपचारिक)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 20,
      "title": "ईर्ष्या: तू न गई मेरे मन से (निबंध, संवाद व सूचना लेखन)",
      "part": "अभ्यास सागर (व्याकरण)"
    }
  ],
  "8_eng8_lit": [
    {
      "num": 1,
      "title": "Three Questions",
      "part": "English Literature"
    },
    {
      "num": 2,
      "title": "Granny's Tree Climbing",
      "part": "English Literature"
    },
    {
      "num": 3,
      "title": "The Fun They Had",
      "part": "English Literature"
    },
    {
      "num": 4,
      "title": "Father's Help",
      "part": "English Literature"
    },
    {
      "num": 5,
      "title": "My Mother",
      "part": "English Literature"
    },
    {
      "num": 6,
      "title": "The Luncheon",
      "part": "English Literature"
    },
    {
      "num": 7,
      "title": "The Children's Song",
      "part": "English Literature"
    },
    {
      "num": 8,
      "title": "The Case of the Sharp-Eyed Jeweller",
      "part": "English Literature"
    },
    {
      "num": 9,
      "title": "Couplets",
      "part": "English Literature"
    },
    {
      "num": 10,
      "title": "The Undeserved Reward",
      "part": "English Literature"
    },
    {
      "num": 11,
      "title": "Bangle Sellers",
      "part": "English Literature"
    },
    {
      "num": 12,
      "title": "A Bad Dream",
      "part": "English Literature"
    }
  ],
  "8_eng8_reader": [
    {
      "num": 1,
      "title": "Changing Times",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Compassionate Souls",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Enterprise",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "Nature",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "Sports",
      "part": "My English Reader"
    },
    {
      "num": 6,
      "title": "Tolerance",
      "part": "My English Reader"
    }
  ],
  "8_eng8_prac": [
    {
      "num": 1,
      "title": "Tenses",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Narration",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "Modals",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Subject-Verb Agreement",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Clauses and Complex Sentences",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Linkers",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Active and Passive Voice",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Non-Finites",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Punctuation",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Reading for Understanding",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Getting Ready for Class-IX",
      "part": "English Practice Book"
    }
  ],
  "8_math8": [
    {
      "num": 1,
      "title": "Squares and Square Roots",
      "part": "Secondary Mathematics"
    },
    {
      "num": 2,
      "title": "Cubes and Cube Roots",
      "part": "Secondary Mathematics"
    },
    {
      "num": 3,
      "title": "Exponents and Radicals",
      "part": "Secondary Mathematics"
    },
    {
      "num": 4,
      "title": "Direct and Inverse Variation",
      "part": "Secondary Mathematics"
    },
    {
      "num": 5,
      "title": "Profit, Loss and Discount",
      "part": "Secondary Mathematics"
    },
    {
      "num": 6,
      "title": "Compound Interest",
      "part": "Secondary Mathematics"
    },
    {
      "num": 7,
      "title": "Algebraic Identities",
      "part": "Secondary Mathematics"
    },
    {
      "num": 8,
      "title": "Polynomials",
      "part": "Secondary Mathematics"
    },
    {
      "num": 9,
      "title": "Linear Equations in One Variable",
      "part": "Secondary Mathematics"
    },
    {
      "num": 10,
      "title": "Parallel Lines",
      "part": "Secondary Mathematics"
    },
    {
      "num": 11,
      "title": "Understanding Quadrilaterals",
      "part": "Secondary Mathematics"
    },
    {
      "num": 12,
      "title": "Construction of Quadrilaterals",
      "part": "Secondary Mathematics"
    },
    {
      "num": 13,
      "title": "Introduction to Graphs",
      "part": "Secondary Mathematics"
    },
    {
      "num": 14,
      "title": "Mensuration",
      "part": "Secondary Mathematics"
    },
    {
      "num": 15,
      "title": "Statistics and Probability",
      "part": "Secondary Mathematics"
    },
    {
      "num": 16,
      "title": "Rotational Symmetry",
      "part": "Secondary Mathematics"
    }
  ],
  "8_sci8": [
    {
      "num": 1,
      "title": "The Cell – Its Structure and Functions",
      "part": "The Living World"
    },
    {
      "num": 2,
      "title": "Microorganisms: Friends or Foes",
      "part": "The Living World"
    },
    {
      "num": 3,
      "title": "Metals and Non-Metals",
      "part": "The Living World"
    },
    {
      "num": 4,
      "title": "Force and Pressure",
      "part": "The Living World"
    },
    {
      "num": 5,
      "title": "Friction",
      "part": "The Living World"
    },
    {
      "num": 6,
      "title": "Sources of Energy",
      "part": "The Living World"
    },
    {
      "num": 7,
      "title": "Combustion",
      "part": "The Living World"
    },
    {
      "num": 8,
      "title": "Conservation of Plants and Animals",
      "part": "The Living World"
    },
    {
      "num": 9,
      "title": "Crop Production and Its Management",
      "part": "The Living World"
    },
    {
      "num": 10,
      "title": "Refraction and Dispersion of Light",
      "part": "The Living World"
    },
    {
      "num": 11,
      "title": "The Human Eye",
      "part": "The Living World"
    },
    {
      "num": 12,
      "title": "Sound",
      "part": "The Living World"
    },
    {
      "num": 13,
      "title": "Synthetic Fibres and Plastics",
      "part": "The Living World"
    },
    {
      "num": 14,
      "title": "Reproduction in Animals",
      "part": "The Living World"
    },
    {
      "num": 15,
      "title": "Reaching the Age of Adolescence",
      "part": "The Living World"
    },
    {
      "num": 16,
      "title": "Electric Current and Its Chemical Effects",
      "part": "The Living World"
    },
    {
      "num": 17,
      "title": "Stars and Solar System",
      "part": "The Living World"
    },
    {
      "num": 18,
      "title": "Earthquakes",
      "part": "The Living World"
    },
    {
      "num": 19,
      "title": "Pollution of Air",
      "part": "The Living World"
    },
    {
      "num": 20,
      "title": "Pollution of Water",
      "part": "The Living World"
    }
  ],
  "8_sst8": [
    {
      "num": 1,
      "title": "Resources: Utilisation and Development",
      "part": "We and Our World"
    },
    {
      "num": 2,
      "title": "Natural Resources: Land, Soil and Water",
      "part": "We and Our World"
    },
    {
      "num": 3,
      "title": "Natural Resources: Vegetation and Wildlife",
      "part": "We and Our World"
    },
    {
      "num": 4,
      "title": "Mineral and Energy Resources",
      "part": "We and Our World"
    },
    {
      "num": 5,
      "title": "Agriculture",
      "part": "We and Our World"
    },
    {
      "num": 6,
      "title": "Manufacturing Industries",
      "part": "We and Our World"
    },
    {
      "num": 7,
      "title": "Human Resources",
      "part": "We and Our World"
    },
    {
      "num": 8,
      "title": "The Modern Period",
      "part": "We and Our World"
    },
    {
      "num": 9,
      "title": "Establishment of Company Rule in India",
      "part": "We and Our World"
    },
    {
      "num": 10,
      "title": "Colonialism: Rural and Tribal Societies",
      "part": "We and Our World"
    },
    {
      "num": 11,
      "title": "The First War of Independence—1857",
      "part": "We and Our World"
    },
    {
      "num": 12,
      "title": "Impact of British Rule on India",
      "part": "We and Our World"
    },
    {
      "num": 13,
      "title": "Colonialism and Urban Change",
      "part": "We and Our World"
    },
    {
      "num": 14,
      "title": "The Nationalist Movement (1870 to 1947)",
      "part": "We and Our World"
    },
    {
      "num": 15,
      "title": "India Marches Ahead",
      "part": "We and Our World"
    },
    {
      "num": 16,
      "title": "Our Constitution",
      "part": "We and Our World"
    },
    {
      "num": 17,
      "title": "Fundamental Rights, Fundamental Duties and Directive Principles of State Policy",
      "part": "We and Our World"
    },
    {
      "num": 18,
      "title": "The Union Government: The Legislature",
      "part": "We and Our World"
    },
    {
      "num": 19,
      "title": "The Union Government: The Executive",
      "part": "We and Our World"
    },
    {
      "num": 20,
      "title": "The Union Government: The Judiciary",
      "part": "We and Our World"
    },
    {
      "num": 21,
      "title": "Social Justice and the Marginalised",
      "part": "We and Our World"
    },
    {
      "num": 22,
      "title": "Safeguarding the Marginalised",
      "part": "We and Our World"
    }
  ],
  "8_sans8": [
    {
      "num": 1,
      "title": "सुवचनानि",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 2,
      "title": "वसुधैव कुटुम्बकम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 3,
      "title": "अहं नदी अस्मि",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 4,
      "title": "क्षमस्व महर्षे!",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 5,
      "title": "दिव्या गीर्वाणभारती",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 6,
      "title": "मधुराणि वचनानि",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 7,
      "title": "सफलं तस्य जीवितम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 8,
      "title": "क्रोधेन कार्यं न सिध्यति",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 9,
      "title": "अविश्वस्ते न विश्वसेत्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 10,
      "title": "गुणाः पूजास्थानम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 11,
      "title": "हितं मनोहारि च दुर्लभं वचः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 12,
      "title": "स्वाध्यायात् मा प्रमदः",
      "part": "संस्कृत सुरभि"
    }
  ],
  "8_comp8": [
    {
      "num": 1,
      "title": "Let us Explore - Computer Network",
      "part": "Hands On Computer"
    },
    {
      "num": 2,
      "title": "HTML-I",
      "part": "Hands On Computer"
    },
    {
      "num": 3,
      "title": "Lists and Tables in HTML",
      "part": "Hands On Computer"
    },
    {
      "num": 4,
      "title": "HTML-III",
      "part": "Hands On Computer"
    },
    {
      "num": 5,
      "title": "Identifying Networked Resources and Computers",
      "part": "Hands On Computer"
    },
    {
      "num": 6,
      "title": "Problem Solving",
      "part": "Hands On Computer"
    },
    {
      "num": 7,
      "title": "Programming with QBasic",
      "part": "Hands On Computer"
    },
    {
      "num": 8,
      "title": "Looping in QBasic & Project Handling",
      "part": "Hands On Computer"
    },
    {
      "num": 9,
      "title": "The Cyber World, Cyber Crime and the Law",
      "part": "Hands On Computer"
    }
  ],
  "8_naitik8": [
    {
      "num": 1,
      "title": "ओ३म् ध्वज",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 2,
      "title": "संध्या एवं दैनिक प्रार्थना",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 3,
      "title": "आत्मबोध",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 4,
      "title": "गीता के दो श्लोक",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 5,
      "title": "गायत्री जप का प्रभाव",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 6,
      "title": "संस्कृत भाषा",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 7,
      "title": "मर्यादा पुरुषोत्तम राम",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 8,
      "title": "पंच महायज्ञ",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 9,
      "title": "डी.ए.वी. गान",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 10,
      "title": "योग की पहली सीढ़ी : यम",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 11,
      "title": "योग की दूसरी सीढ़ी : नियम",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 12,
      "title": "वर्ण व्यवस्था का स्वरूप",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 13,
      "title": "आश्रम व्यवस्था",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 14,
      "title": "किस दर जाऊँ",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 15,
      "title": "आर्य समाज के नियम (३-६)",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 16,
      "title": "सत्यार्थ प्रकाश",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 17,
      "title": "डी.ए.वी. संस्थाएँ",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 18,
      "title": "राष्ट्रीय भावना",
      "part": "नैतिक शिक्षा"
    },
    {
      "num": 19,
      "title": "राष्ट्रीय गीत",
      "part": "नैतिक शिक्षा"
    }
  ],
  "7_hin7_gs": [
    {
      "num": 1,
      "title": "बारहमासा",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 2,
      "title": "नाटक में नाटक",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 3,
      "title": "निर्मला, साँप और सयाल",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 4,
      "title": "बातूनी",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 5,
      "title": "राजू का सपना",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 6,
      "title": "समय",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 7,
      "title": "स्कूल की छुट्टियाँ",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 8,
      "title": "एवरेस्ट की चुनौती",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 9,
      "title": "सवाल का जवाब",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 10,
      "title": "झंडा ऊँचा रहे हमारा",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 11,
      "title": "उस रात की बात",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 12,
      "title": "दोहे",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 13,
      "title": "साहस को सलाम",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 14,
      "title": "एस. रामानुजन",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 15,
      "title": "देशभक्त पुरु",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 16,
      "title": "काकी",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 17,
      "title": "अन्नदाता कृषक",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 18,
      "title": "बाल लीला और कुंडलिया",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 19,
      "title": "गणेशोत्सव",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 20,
      "title": "कर्मवीर",
      "part": "ज्ञान सागर (साहित्य)"
    }
  ],
  "7_hin7_as": [
    {
      "num": 1,
      "title": "बारहमासा (अनुस्वार, अनुनासिक व नुक्ता)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 2,
      "title": "नाटक में नाटक (संज्ञा व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 3,
      "title": "निर्मला, साँप और सयाल (सर्वनाम व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 4,
      "title": "बातूनी (विशेषण व प्रविशेषण)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 5,
      "title": "दादी का रेडियो (क्रिया व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 6,
      "title": "समय (काल व भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 7,
      "title": "स्कूल की छुट्टियाँ (उपसर्ग व प्रत्यय)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 8,
      "title": "एवरेस्ट की चुनौती (संधि व संधि-विच्छेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 9,
      "title": "सवाल का जवाब (विराम चिह्न)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 10,
      "title": "झंडा ऊँचा रहे हमारा (कारक)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 11,
      "title": "उस रात की बात (समास)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 12,
      "title": "सूरदास के पद (मुहावरे व लोकोक्तियाँ)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 13,
      "title": "साहसी अमित (वाक्य भेद)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 14,
      "title": "बुढ़ापा (अनेक शब्दों के लिए एक शब्द)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 15,
      "title": "ज्ञान की बात (पर्यायवाची व विलोम)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 16,
      "title": "सुदामा चरित (पद परिचय)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 17,
      "title": "आश्रम के अतिथि (अपठित गद्यांश)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 18,
      "title": "काकी (पत्र लेखन)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 19,
      "title": "गणेश उत्सव (निबंध लेखन)",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 20,
      "title": "कर्मवीर (संवाद व सूचना लेखन)",
      "part": "अभ्यास सागर (व्याकरण)"
    }
  ],
  "7_eng7_lit": [
    {
      "num": 1,
      "title": "Monkey Trouble",
      "part": "English Literature"
    },
    {
      "num": 2,
      "title": "Birdie, will you pet?",
      "part": "English Literature"
    },
    {
      "num": 3,
      "title": "A Hero",
      "part": "English Literature"
    },
    {
      "num": 4,
      "title": "Fight, Manju, Fight!",
      "part": "English Literature"
    },
    {
      "num": 5,
      "title": "I Dream a World",
      "part": "English Literature"
    },
    {
      "num": 6,
      "title": "Stone Soup in Bohemia",
      "part": "English Literature"
    },
    {
      "num": 7,
      "title": "A Stormy Adventure",
      "part": "English Literature"
    },
    {
      "num": 8,
      "title": "The Spider and the Fly",
      "part": "English Literature"
    },
    {
      "num": 9,
      "title": "The Human Robot",
      "part": "English Literature"
    },
    {
      "num": 10,
      "title": "Friends and Flatterers",
      "part": "English Literature"
    },
    {
      "num": 11,
      "title": "Chocolates in Your Dreams Too",
      "part": "English Literature"
    }
  ],
  "7_eng7_reader": [
    {
      "num": 1,
      "title": "People at Work",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Relationships",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Attitude",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "Achievers",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "The Future World",
      "part": "My English Reader"
    },
    {
      "num": 6,
      "title": "Unity in Diversity",
      "part": "My English Reader"
    }
  ],
  "7_eng7_prac": [
    {
      "num": 1,
      "title": "Articles",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "The Sentence",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "The Compound Sentence",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Phrases and Clauses",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Transitive and Intransitive Verbs",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Modals",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Passive Voice",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Reported Speech",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Future Time Reference",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Perfect Progressive Tenses",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Linkers",
      "part": "English Practice Book"
    },
    {
      "num": 12,
      "title": "Reading for Understanding",
      "part": "English Practice Book"
    }
  ],
  "7_math7": [
    {
      "num": 1,
      "title": "Rational Numbers",
      "part": "Secondary Mathematics"
    },
    {
      "num": 2,
      "title": "Operations on Rational Numbers",
      "part": "Secondary Mathematics"
    },
    {
      "num": 3,
      "title": "Rational Numbers as Decimals",
      "part": "Secondary Mathematics"
    },
    {
      "num": 4,
      "title": "Exponents and Powers",
      "part": "Secondary Mathematics"
    },
    {
      "num": 5,
      "title": "Application of Percentage",
      "part": "Secondary Mathematics"
    },
    {
      "num": 6,
      "title": "Algebraic Expressions",
      "part": "Secondary Mathematics"
    },
    {
      "num": 7,
      "title": "Linear Equations",
      "part": "Secondary Mathematics"
    },
    {
      "num": 8,
      "title": "The Triangle and Its Properties",
      "part": "Secondary Mathematics"
    },
    {
      "num": 9,
      "title": "Congruent Triangles",
      "part": "Secondary Mathematics"
    },
    {
      "num": 10,
      "title": "Construction of Triangles",
      "part": "Secondary Mathematics"
    },
    {
      "num": 11,
      "title": "Perimeter and Area",
      "part": "Secondary Mathematics"
    },
    {
      "num": 12,
      "title": "Data Handling",
      "part": "Secondary Mathematics"
    },
    {
      "num": 13,
      "title": "Symmetry",
      "part": "Secondary Mathematics"
    },
    {
      "num": 14,
      "title": "Visualising Solids",
      "part": "Secondary Mathematics"
    }
  ],
  "7_sci7": [
    {
      "num": 1,
      "title": "Nutrition in Living Organisms—Plants",
      "part": "The Living World"
    },
    {
      "num": 2,
      "title": "Nutrition in Living Organisms—Animals and Man",
      "part": "The Living World"
    },
    {
      "num": 3,
      "title": "Chemical Substances and Processes",
      "part": "The Living World"
    },
    {
      "num": 4,
      "title": "Acids, Bases and Salts",
      "part": "The Living World"
    },
    {
      "num": 5,
      "title": "Heat",
      "part": "The Living World"
    },
    {
      "num": 6,
      "title": "Motion and Time",
      "part": "The Living World"
    },
    {
      "num": 7,
      "title": "Respiration in Organisms",
      "part": "The Living World"
    },
    {
      "num": 8,
      "title": "Transportation in Plants and Animals",
      "part": "The Living World"
    },
    {
      "num": 9,
      "title": "Reproduction in Plants",
      "part": "The Living World"
    },
    {
      "num": 10,
      "title": "Soil",
      "part": "The Living World"
    },
    {
      "num": 11,
      "title": "Electric Charges at Rest",
      "part": "The Living World"
    },
    {
      "num": 12,
      "title": "Light",
      "part": "The Living World"
    },
    {
      "num": 13,
      "title": "Weather, Climate and Adaptation of Animals",
      "part": "The Living World"
    },
    {
      "num": 14,
      "title": "Fabric from Fibre",
      "part": "The Living World"
    },
    {
      "num": 15,
      "title": "Forests",
      "part": "The Living World"
    },
    {
      "num": 16,
      "title": "Water",
      "part": "The Living World"
    },
    {
      "num": 17,
      "title": "Electric Current and Its Effects",
      "part": "The Living World"
    }
  ],
  "7_sst7": [
    {
      "num": 1,
      "title": "Components of Environment",
      "part": "We and Our World"
    },
    {
      "num": 2,
      "title": "The Earth and the Changes on It",
      "part": "We and Our World"
    },
    {
      "num": 3,
      "title": "The Surface and Interior of the Earth",
      "part": "We and Our World"
    },
    {
      "num": 4,
      "title": "Air Around Us",
      "part": "We and Our World"
    },
    {
      "num": 5,
      "title": "Water Surrounding the Earth",
      "part": "We and Our World"
    },
    {
      "num": 6,
      "title": "Life on the Earth",
      "part": "We and Our World"
    },
    {
      "num": 7,
      "title": "Human Environment (Settlement, Transport and Communication)",
      "part": "We and Our World"
    },
    {
      "num": 8,
      "title": "Land and the People",
      "part": "We and Our World"
    },
    {
      "num": 9,
      "title": "Medieval Period",
      "part": "We and Our World"
    },
    {
      "num": 10,
      "title": "The Rise of Small Kingdoms in North India",
      "part": "We and Our World"
    },
    {
      "num": 11,
      "title": "The Rise of Small Kingdoms in South India",
      "part": "We and Our World"
    },
    {
      "num": 12,
      "title": "Turkish Invasions in North India",
      "part": "We and Our World"
    },
    {
      "num": 13,
      "title": "Delhi Sultanate",
      "part": "We and Our World"
    },
    {
      "num": 14,
      "title": "Regional Powers",
      "part": "We and Our World"
    },
    {
      "num": 15,
      "title": "The Mughal Empire",
      "part": "We and Our World"
    },
    {
      "num": 16,
      "title": "Emergence of Independent States",
      "part": "We and Our World"
    },
    {
      "num": 17,
      "title": "Major Religions",
      "part": "We and Our World"
    },
    {
      "num": 18,
      "title": "Democracy and Equality",
      "part": "We and Our World"
    },
    {
      "num": 19,
      "title": "Our State Governments",
      "part": "We and Our World"
    },
    {
      "num": 20,
      "title": "Media — The Mainstay of Democracy",
      "part": "We and Our World"
    },
    {
      "num": 21,
      "title": "Advertising and Democracy",
      "part": "We and Our World"
    },
    {
      "num": 22,
      "title": "Unpacking Gender",
      "part": "We and Our World"
    },
    {
      "num": 23,
      "title": "Markets Around Us",
      "part": "We and Our World"
    }
  ],
  "7_sans7": [
    {
      "num": 1,
      "title": "बुद्धिः एव अस्माकं बलम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 2,
      "title": "अभ्यासः एव परमो गुरुः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 3,
      "title": "उपकारकाः वृक्षाः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 4,
      "title": "आगच्छ! भोजनं कुर्याम",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 5,
      "title": "सुवचनानि",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 6,
      "title": "यस्य बुद्धिः तस्य बलम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 7,
      "title": "बुद्धिः एव उत्तमा",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 8,
      "title": "अविवेकः परमापदां पदम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 9,
      "title": "बुद्धिमान् गोपालकः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 10,
      "title": "मधुरवचनानि",
      "part": "संस्कृत सुरभि"
    }
  ],
  "7_comp7": [
    {
      "num": 1,
      "title": "The Evolution of Computers",
      "part": "Hands On Computer"
    },
    {
      "num": 2,
      "title": "Scratch-I",
      "part": "Hands On Computer"
    },
    {
      "num": 3,
      "title": "Scratch-II",
      "part": "Hands On Computer"
    },
    {
      "num": 4,
      "title": "Introduction to GIMP",
      "part": "Hands On Computer"
    },
    {
      "num": 5,
      "title": "GIMP Tools",
      "part": "Hands On Computer"
    },
    {
      "num": 6,
      "title": "Advanced GIMP",
      "part": "Hands On Computer"
    },
    {
      "num": 7,
      "title": "Basics of Internet",
      "part": "Hands On Computer"
    },
    {
      "num": 8,
      "title": "Internet and Web Services",
      "part": "Hands On Computer"
    }
  ],
  "7_gk7": [
    {
      "num": 1,
      "title": "Language & Literature",
      "part": "Kid Wiz GK"
    },
    {
      "num": 2,
      "title": "Environment Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 3,
      "title": "World Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 4,
      "title": "Art & Culture",
      "part": "Kid Wiz GK"
    },
    {
      "num": 5,
      "title": "Math Magic",
      "part": "Kid Wiz GK"
    },
    {
      "num": 6,
      "title": "Sports & Games",
      "part": "Kid Wiz GK"
    }
  ],
  "6_hin6_gs": [
    {
      "num": 1,
      "title": "साथी हाथ बढ़ाना",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 2,
      "title": "चिट्ठी के अक्षर",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 3,
      "title": "बरसते जल के रूप अनेक",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 4,
      "title": "पुरस्कार",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 5,
      "title": "सीखो",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 6,
      "title": "अनोखा वरदान",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 7,
      "title": "सुंदर लाल",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 8,
      "title": "नाकुन कवि बना",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 9,
      "title": "दोहे",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 10,
      "title": "पोंगल",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 11,
      "title": "तेनालीराम ने चोरों को उल्लू बनाया",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 12,
      "title": "दस आमों की कीमत",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 13,
      "title": "अनोखी दौड़",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 14,
      "title": "एक रोमांचक यात्रा",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 15,
      "title": "परिश्रम",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 16,
      "title": "धन का महत्त्व",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 17,
      "title": "यात्रा और यात्री",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 18,
      "title": "पंच परमेश्वर",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 19,
      "title": "सिकंदर और साधु",
      "part": "ज्ञान सागर (साहित्य)"
    },
    {
      "num": 20,
      "title": "आया वसंत",
      "part": "ज्ञान सागर (साहित्य)"
    }
  ],
  "6_hin6_as": [
    {
      "num": 1,
      "title": "साथी हाथ बढ़ाना",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 2,
      "title": "चिट्ठी के अक्षर",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 3,
      "title": "बरसते जल के रूप अनेक",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 4,
      "title": "पुरस्कार",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 5,
      "title": "सीखो",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 6,
      "title": "अनोखा वरदान",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 7,
      "title": "सुंदर लाल",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 8,
      "title": "नाकुन कवि बना",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 9,
      "title": "दोहे",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 10,
      "title": "पोंगल",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 11,
      "title": "तेनालीराम ने चोरों को उल्लू बनाया",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 12,
      "title": "दस आमों की कीमत",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 13,
      "title": "अनोखी दौड़",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 14,
      "title": "एक रोमांचक यात्रा",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 15,
      "title": "परिश्रम",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 16,
      "title": "धन का महत्त्व",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 17,
      "title": "यात्रा और यात्री",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 18,
      "title": "पंच परमेश्वर",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 19,
      "title": "सिकंदर और साधु",
      "part": "अभ्यास सागर (व्याकरण)"
    },
    {
      "num": 20,
      "title": "आया वसंत",
      "part": "अभ्यास सागर (व्याकरण)"
    }
  ],
  "6_eng6_lit": [
    {
      "num": 1,
      "title": "How Daddy Decided What He Wanted to Be",
      "part": "English Literature"
    },
    {
      "num": 2,
      "title": "The White Elephant",
      "part": "English Literature"
    },
    {
      "num": 3,
      "title": "Leisure",
      "part": "English Literature"
    },
    {
      "num": 4,
      "title": "My Experiments with Truth",
      "part": "English Literature"
    },
    {
      "num": 5,
      "title": "Today and Tomorrow",
      "part": "English Literature"
    },
    {
      "num": 6,
      "title": "The Helpful Young Man",
      "part": "English Literature"
    },
    {
      "num": 7,
      "title": "Bharat Desh",
      "part": "English Literature"
    },
    {
      "num": 8,
      "title": "Hanuman and I",
      "part": "English Literature"
    },
    {
      "num": 9,
      "title": "Our Tree",
      "part": "English Literature"
    },
    {
      "num": 10,
      "title": "Attila",
      "part": "English Literature"
    },
    {
      "num": 11,
      "title": "The Case of Copied Question Papers",
      "part": "English Literature"
    }
  ],
  "6_eng6_reader": [
    {
      "num": 1,
      "title": "Celebrations",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Hobbies",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Thrill in School Life",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "Performing Arts",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "Vacation Time",
      "part": "My English Reader"
    },
    {
      "num": 6,
      "title": "Tinsel World",
      "part": "My English Reader"
    }
  ],
  "6_eng6_prac": [
    {
      "num": 1,
      "title": "Putting It Together",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Regular and Irregular Verbs",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "Determiners",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Subject-Verb Agreement",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Tenses (Part-I)",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Tenses (Part-II)",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Tenses (Part-III)",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Modals",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Conditionals",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Passive Voice",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Reading for Understanding",
      "part": "English Practice Book"
    }
  ],
  "6_math6": [
    {
      "num": 1,
      "title": "Natural Numbers and Whole Numbers",
      "part": "Secondary Mathematics"
    },
    {
      "num": 2,
      "title": "Factors and Multiples",
      "part": "Secondary Mathematics"
    },
    {
      "num": 3,
      "title": "Integers",
      "part": "Secondary Mathematics"
    },
    {
      "num": 4,
      "title": "Ratio, Proportion and Unitary Method",
      "part": "Secondary Mathematics"
    },
    {
      "num": 5,
      "title": "Percentage and Its Applications",
      "part": "Secondary Mathematics"
    },
    {
      "num": 6,
      "title": "Introduction to Algebra",
      "part": "Secondary Mathematics"
    },
    {
      "num": 7,
      "title": "Linear Equations",
      "part": "Secondary Mathematics"
    },
    {
      "num": 8,
      "title": "Basic Geometrical Concepts",
      "part": "Secondary Mathematics"
    },
    {
      "num": 9,
      "title": "Line Segments",
      "part": "Secondary Mathematics"
    },
    {
      "num": 10,
      "title": "Angles",
      "part": "Secondary Mathematics"
    },
    {
      "num": 11,
      "title": "Transversal and Pairs of Lines",
      "part": "Secondary Mathematics"
    },
    {
      "num": 12,
      "title": "Triangles",
      "part": "Secondary Mathematics"
    },
    {
      "num": 13,
      "title": "Circles",
      "part": "Secondary Mathematics"
    },
    {
      "num": 14,
      "title": "Constructions",
      "part": "Secondary Mathematics"
    },
    {
      "num": 15,
      "title": "Perimeter and Area",
      "part": "Secondary Mathematics"
    },
    {
      "num": 16,
      "title": "Statistics",
      "part": "Secondary Mathematics"
    }
  ],
  "6_sci6": [
    {
      "num": 1,
      "title": "Our Environment",
      "part": "The Living World"
    },
    {
      "num": 2,
      "title": "Food",
      "part": "The Living World"
    },
    {
      "num": 3,
      "title": "Nature of Matter",
      "part": "The Living World"
    },
    {
      "num": 4,
      "title": "Separation of Substances",
      "part": "The Living World"
    },
    {
      "num": 5,
      "title": "Changes Around Us",
      "part": "The Living World"
    },
    {
      "num": 6,
      "title": "Measurement and Motion",
      "part": "The Living World"
    },
    {
      "num": 7,
      "title": "The World of Living",
      "part": "The Living World"
    },
    {
      "num": 8,
      "title": "Structure and Function of the Living Organisms – Plants",
      "part": "The Living World"
    },
    {
      "num": 9,
      "title": "Structure and Function of the Living Organisms – Animals",
      "part": "The Living World"
    },
    {
      "num": 10,
      "title": "Work and Energy",
      "part": "The Living World"
    },
    {
      "num": 11,
      "title": "Electric Currents and Circuits",
      "part": "The Living World"
    },
    {
      "num": 12,
      "title": "Light and Shadows",
      "part": "The Living World"
    },
    {
      "num": 13,
      "title": "Magnets",
      "part": "The Living World"
    },
    {
      "num": 14,
      "title": "Fabric from Fibre",
      "part": "The Living World"
    }
  ],
  "6_sst6": [
    {
      "num": 1,
      "title": "The Planet Earth and the Solar System",
      "part": "We and Our World"
    },
    {
      "num": 2,
      "title": "Globe: The Miniature Model of the Earth",
      "part": "We and Our World"
    },
    {
      "num": 3,
      "title": "Locating Places on the Earth",
      "part": "We and Our World"
    },
    {
      "num": 4,
      "title": "The Motions of the Earth",
      "part": "We and Our World"
    },
    {
      "num": 5,
      "title": "Major Domains of the Earth",
      "part": "We and Our World"
    },
    {
      "num": 6,
      "title": "Major Landforms of the Earth",
      "part": "We and Our World"
    },
    {
      "num": 7,
      "title": "Our Country – India",
      "part": "We and Our World"
    },
    {
      "num": 8,
      "title": "India: Climate, Vegetation, and Wildlife",
      "part": "We and Our World"
    },
    {
      "num": 9,
      "title": "Studying the Past",
      "part": "We and Our World"
    },
    {
      "num": 10,
      "title": "The Earliest Societies",
      "part": "We and Our World"
    },
    {
      "num": 11,
      "title": "The First Farmers and Herders",
      "part": "We and Our World"
    },
    {
      "num": 12,
      "title": "The First Cities",
      "part": "We and Our World"
    },
    {
      "num": 13,
      "title": "The Mauryan Dynasty",
      "part": "We and Our World"
    },
    {
      "num": 14,
      "title": "Early History of Deccan and South India",
      "part": "We and Our World"
    },
    {
      "num": 15,
      "title": "Life in the Towns and Villages",
      "part": "We and Our World"
    },
    {
      "num": 16,
      "title": "The Gupta Empire",
      "part": "We and Our World"
    },
    {
      "num": 17,
      "title": "The Era of Harsha",
      "part": "We and Our World"
    },
    {
      "num": 18,
      "title": "Deccan and South India (Fourth Century CE to Seventh Century CE)",
      "part": "We and Our World"
    },
    {
      "num": 19,
      "title": "India and the Outside World",
      "part": "We and Our World"
    },
    {
      "num": 20,
      "title": "The Indian Religions",
      "part": "We and Our World"
    },
    {
      "num": 21,
      "title": "Our Community Life: Unity in Diversity",
      "part": "We and Our World"
    },
    {
      "num": 22,
      "title": "Democracy and Government",
      "part": "We and Our World"
    },
    {
      "num": 23,
      "title": "Our Rural Governance",
      "part": "We and Our World"
    },
    {
      "num": 24,
      "title": "Our Urban Government",
      "part": "We and Our World"
    }
  ],
  "6_sans6": [
    {
      "num": 1,
      "title": "पुरः पुरः प्रगच्छ रे",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 2,
      "title": "मम प्रियः विद्यालयः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 3,
      "title": "चत्वारि प्रियमित्रणि",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 4,
      "title": "मधुराः श्लोकाः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 5,
      "title": "जले अपि वसन्ति जीवाः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 6,
      "title": "वीरबालिका गुञ्जनसक्सेना",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 7,
      "title": "प्रहेलिकाः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 8,
      "title": "धन्या मातुः महिमा",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 9,
      "title": "'सिक्किम' प्रदेशस्य सौन्दर्यम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 10,
      "title": "योग्यः शिष्यः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 11,
      "title": "मधुराणि वचनानि",
      "part": "संस्कृत सुरभि"
    }
  ],
  "6_comp6": [
    {
      "num": 1,
      "title": "Let us Explore - Computer Network",
      "part": "Hands On Computer"
    },
    {
      "num": 2,
      "title": "Introduction to Operating Systems",
      "part": "Hands On Computer"
    },
    {
      "num": 3,
      "title": "Word Processing and Formatting Tools",
      "part": "Hands On Computer"
    },
    {
      "num": 4,
      "title": "Spreadsheet Basics and Simple Formulas",
      "part": "Hands On Computer"
    },
    {
      "num": 5,
      "title": "Presentation Design and Animation",
      "part": "Hands On Computer"
    },
    {
      "num": 6,
      "title": "Introduction to Coding & Scratch Programming",
      "part": "Hands On Computer"
    },
    {
      "num": 7,
      "title": "Internet Services, Email and Search",
      "part": "Hands On Computer"
    },
    {
      "num": 8,
      "title": "Safe Surfing and Cyber Safety Ethics",
      "part": "Hands On Computer"
    }
  ],
  "6_gk6": [
    {
      "num": 1,
      "title": "Language & Literature",
      "part": "Kid Wiz GK"
    },
    {
      "num": 2,
      "title": "Environment Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 3,
      "title": "World Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 4,
      "title": "Art & Culture",
      "part": "Kid Wiz GK"
    },
    {
      "num": 5,
      "title": "Math Magic",
      "part": "Kid Wiz GK"
    },
    {
      "num": 6,
      "title": "Sports & Games",
      "part": "Kid Wiz GK"
    }
  ],
  "5_hin5_bm": [
    {
      "num": 1,
      "title": "दिमागी लड़ाई",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 2,
      "title": "लौह पुरुष",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 3,
      "title": "पेड़",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 4,
      "title": "पूरे एक हज़ार",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 5,
      "title": "दो पहलवान",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 6,
      "title": "नदी यहाँ पर",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 7,
      "title": "पतीले की मृत्यु",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 8,
      "title": "टपके का डर",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 9,
      "title": "अजंता की सैर",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 10,
      "title": "ये बात समझ में आई नहीं...",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 11,
      "title": "बिरसा मुंडा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 12,
      "title": "मनभावन सावन",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 13,
      "title": "प्रिय पौधा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 14,
      "title": "बुद्धिमान राजा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 15,
      "title": "अँधेर नगरी",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 16,
      "title": "चाँद का कुर्ता",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 17,
      "title": "हार की जीत",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 18,
      "title": "बेट्टीना का साहस",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 19,
      "title": "लौट आया आत्मविश्वास",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 20,
      "title": "कोशिश करने वालों की हार नहीं होती",
      "part": "भाषा माधुरी (साहित्य)"
    }
  ],
  "5_hin5_ba": [
    {
      "num": 1,
      "title": "दिमागी लड़ाई",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 2,
      "title": "लौह पुरुष",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 3,
      "title": "पेड़",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 4,
      "title": "पूरे एक हज़ार",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 5,
      "title": "दो पहलवान",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 6,
      "title": "नदी यहाँ पर",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 7,
      "title": "पतीले की मृत्यु",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 8,
      "title": "टपके का डर",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 9,
      "title": "अजंता की सैर",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 10,
      "title": "ये बात समझ में आई नहीं...",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 11,
      "title": "बिरसा मुंडा",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 12,
      "title": "मनभावन सावन",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 13,
      "title": "प्रिय पौधा",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 14,
      "title": "बुद्धिमान राजा",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 15,
      "title": "अँधेर नगरी",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 16,
      "title": "चाँद का कुर्ता",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 17,
      "title": "हार की जीत",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 18,
      "title": "बेट्टीना का साहस",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 19,
      "title": "लौट आया आत्मविश्वास",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 20,
      "title": "कोशिश करने वालों की हार नहीं होती",
      "part": "भाषा अभ्यास (व्याकरण)"
    }
  ],
  "5_eng5_reader": [
    {
      "num": 1,
      "title": "Growing Up",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Books",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Where There's A Will...",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "E-Generation",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "Go-Green!!!",
      "part": "My English Reader"
    }
  ],
  "5_eng5_prac": [
    {
      "num": 1,
      "title": "Nouns",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Determiners",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "Apostrophe (')",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Comparisons",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Verbs",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Adverbs",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Present Perfect Tense",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Sentences",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Conditionals",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Modals–I",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Modals–II",
      "part": "English Practice Book"
    },
    {
      "num": 12,
      "title": "Emphasising/Reflexive Pronouns",
      "part": "English Practice Book"
    },
    {
      "num": 13,
      "title": "Prepositions",
      "part": "English Practice Book"
    }
  ],
  "5_math5": [
    {
      "num": 1,
      "title": "Numbers upto 99,99,99,999",
      "part": "Primary Mathematics"
    },
    {
      "num": 2,
      "title": "Operations on Large Numbers",
      "part": "Primary Mathematics"
    },
    {
      "num": 3,
      "title": "Multiples and Factors",
      "part": "Primary Mathematics"
    },
    {
      "num": 4,
      "title": "Fractional Numbers",
      "part": "Primary Mathematics"
    },
    {
      "num": 5,
      "title": "Decimals",
      "part": "Primary Mathematics"
    },
    {
      "num": 6,
      "title": "Addition and Subtraction of Decimal Numbers",
      "part": "Primary Mathematics"
    },
    {
      "num": 7,
      "title": "Multiplication and Division of Decimal Numbers",
      "part": "Primary Mathematics"
    },
    {
      "num": 8,
      "title": "Simplification of Numerical Expressions",
      "part": "Primary Mathematics"
    },
    {
      "num": 9,
      "title": "Rounding Numbers",
      "part": "Primary Mathematics"
    },
    {
      "num": 10,
      "title": "Averages",
      "part": "Primary Mathematics"
    },
    {
      "num": 11,
      "title": "Profit and Loss",
      "part": "Primary Mathematics"
    },
    {
      "num": 12,
      "title": "Percentage",
      "part": "Primary Mathematics"
    },
    {
      "num": 13,
      "title": "Simple Interest",
      "part": "Primary Mathematics"
    },
    {
      "num": 14,
      "title": "Bills",
      "part": "Primary Mathematics"
    },
    {
      "num": 15,
      "title": "Temperature",
      "part": "Primary Mathematics"
    },
    {
      "num": 16,
      "title": "Triangles",
      "part": "Primary Mathematics"
    },
    {
      "num": 17,
      "title": "Data Handling",
      "part": "Primary Mathematics"
    }
  ],
  "5_sci5": [
    {
      "num": 1,
      "title": "My Body",
      "part": "My Living World"
    },
    {
      "num": 2,
      "title": "Plants",
      "part": "My Living World"
    },
    {
      "num": 3,
      "title": "Forests",
      "part": "My Living World"
    },
    {
      "num": 4,
      "title": "Animals—Our Friends",
      "part": "My Living World"
    },
    {
      "num": 5,
      "title": "Food and Health",
      "part": "My Living World"
    },
    {
      "num": 6,
      "title": "Spoilage and Wastage of Food and Food Preservation",
      "part": "My Living World"
    },
    {
      "num": 7,
      "title": "Importance of Water",
      "part": "My Living World"
    },
    {
      "num": 8,
      "title": "Properties of Water",
      "part": "My Living World"
    },
    {
      "num": 9,
      "title": "Fuels",
      "part": "My Living World"
    },
    {
      "num": 10,
      "title": "Air",
      "part": "My Living World"
    },
    {
      "num": 11,
      "title": "Our Solar System",
      "part": "My Living World"
    },
    {
      "num": 12,
      "title": "Observing the Sky",
      "part": "My Living World"
    }
  ],
  "5_sst5": [
    {
      "num": 1,
      "title": "Importance of Family",
      "part": "We and Our World"
    },
    {
      "num": 2,
      "title": "Human Migration",
      "part": "We and Our World"
    },
    {
      "num": 3,
      "title": "Variation in Shelters",
      "part": "We and Our World"
    },
    {
      "num": 4,
      "title": "Sensitivity towards Others",
      "part": "We and Our World"
    },
    {
      "num": 5,
      "title": "Community Services",
      "part": "We and Our World"
    },
    {
      "num": 6,
      "title": "Leisure Time",
      "part": "We and Our World"
    },
    {
      "num": 7,
      "title": "Changing Trends in Occupation",
      "part": "We and Our World"
    },
    {
      "num": 8,
      "title": "Respecting Regional Differences",
      "part": "We and Our World"
    },
    {
      "num": 9,
      "title": "Exploring India",
      "part": "We and Our World"
    },
    {
      "num": 10,
      "title": "Mapping India",
      "part": "We and Our World"
    },
    {
      "num": 11,
      "title": "Transport in Modern Times",
      "part": "We and Our World"
    },
    {
      "num": 12,
      "title": "Communication in Modern Times",
      "part": "We and Our World"
    },
    {
      "num": 13,
      "title": "India's Neighbours",
      "part": "We and Our World"
    }
  ],
  "5_sans5": [
    {
      "num": 1,
      "title": "मधुरा प्रभातवेला",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 2,
      "title": "मम परिवारः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 3,
      "title": "वयम् पश्यामः जन्तुशालाम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 4,
      "title": "शाकहट्टम्",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 5,
      "title": "अस्माकम् प्रियमित्राणि (पक्षिणः)",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 6,
      "title": "ये फलानि खादन्ति ते सुखिनः वसन्ति",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 7,
      "title": "चित्रप्रदर्शनी",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 8,
      "title": "अभिनवः किम् किम् करोति?",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 9,
      "title": "विडालः कुत्र अस्ति?",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 10,
      "title": "आगच्छ! गायामः",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 11,
      "title": "हरिणम् मा मारय!",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 12,
      "title": "कथयन्तु! कस्य कः वर्णः?",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 13,
      "title": "कः चतुरः अस्ति?",
      "part": "संस्कृत सुरभि"
    },
    {
      "num": 14,
      "title": "कति वस्तूनि सन्ति?",
      "part": "संस्कृत सुरभि"
    }
  ],
  "5_comp5": [
    {
      "num": 1,
      "title": "Computer - A Wonderful Machine"
    },
    {
      "num": 2,
      "title": "Hardware and Software Components"
    },
    {
      "num": 3,
      "title": "Working with Windows and Folders"
    },
    {
      "num": 4,
      "title": "Editing and Formatting in Word"
    },
    {
      "num": 5,
      "title": "Inserting Graphics and Tables"
    },
    {
      "num": 6,
      "title": "Introduction to PowerPoint"
    },
    {
      "num": 7,
      "title": "Algorithms and Flowcharts for Kids"
    },
    {
      "num": 8,
      "title": "Internet Essentials and Safe Searching"
    }
  ],
  "5_gk5": [
    {
      "num": 1,
      "title": "Language & Literature",
      "part": "Kid Wiz GK"
    },
    {
      "num": 2,
      "title": "Environment Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 3,
      "title": "World Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 4,
      "title": "Art & Culture",
      "part": "Kid Wiz GK"
    },
    {
      "num": 5,
      "title": "Math Magic",
      "part": "Kid Wiz GK"
    },
    {
      "num": 6,
      "title": "Sports & Games",
      "part": "Kid Wiz GK"
    }
  ],
  "4_hin4_bm": [
    {
      "num": 1,
      "title": "फैलती चप्पलें",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 2,
      "title": "उल्टा-पुलटा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 3,
      "title": "अनोखा ढंग",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 4,
      "title": "मित्रता",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 5,
      "title": "सेर को सवा सेर",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 6,
      "title": "पहली बारिश",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 7,
      "title": "दादी का रेडियो",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 8,
      "title": "किस्से-कहावतों की दुनिया",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 9,
      "title": "नानी की नाव चली",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 10,
      "title": "एक बौना और लकड़हारा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 11,
      "title": "मौसम",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 12,
      "title": "आँख-मिचौनी",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 13,
      "title": "चतुर चित्रकार",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 14,
      "title": "एक थी स्वाति",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 15,
      "title": "होली के रंग हज़ार",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 16,
      "title": "ऐसे भी बच्चे",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 17,
      "title": "कोयल",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 18,
      "title": "खत पहुँचे सक्को को",
      "part": "भाषा माधुरी (साहित्य)"
    }
  ],
  "4_hin4_ba": [
    {
      "num": 1,
      "title": "फैलती चप्पलें (संयुक्त व्यंजन व वर्णमाला)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 2,
      "title": "उलटा-पुलटा (संज्ञा शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 3,
      "title": "अनोखा ढंग (सर्वनाम शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 4,
      "title": "मित्रता (विशेषण शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 5,
      "title": "सेर को सवा सेर (क्रिया शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 6,
      "title": "पहली बारिश (काल)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 7,
      "title": "दादी का रेडियो (मुहावरे व अभ्यास)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 8,
      "title": "किस्से-कहानियाँ (विराम चिह्न)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 9,
      "title": "नानी की नाव चली (वर्ण विच्छेद)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 10,
      "title": "एक बौना और लकड़हारा (पर्यायवाची शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 11,
      "title": "मौसम (विलोम शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 12,
      "title": "आँख मिचौनी (अनुस्वार और अनुनासिक)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 13,
      "title": "चतुर चित्रकार (तुकांत शब्द)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 14,
      "title": "एक रूपया (संज्ञा के भेद)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 15,
      "title": "होली के रंग (पत्र लेखन)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 16,
      "title": "ऐसे भी बच्चे (अपठित गद्यांश)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 17,
      "title": "यात्रा की तैयारी (संवाद लेखन)",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 18,
      "title": "खत पहुँचे सक्को को (चित्र वर्णन व निबंध)",
      "part": "भाषा अभ्यास (व्याकरण)"
    }
  ],
  "4_eng4_reader": [
    {
      "num": 1,
      "title": "Sports",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Travel",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Wit and Humour",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "Fantasy",
      "part": "My English Reader"
    }
  ],
  "4_eng4_prac": [
    {
      "num": 1,
      "title": "Naming Words",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Genders",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "Pronouns",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Prepositions",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Describing Words",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Determiners",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Verbs",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Adverbs",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Tenses",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Sentences: Subject and Predicate",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Interrogatives",
      "part": "English Practice Book"
    },
    {
      "num": 12,
      "title": "Conditionals",
      "part": "English Practice Book"
    }
  ],
  "4_math4": [
    {
      "num": 1,
      "title": "Numbers Up to 999999",
      "part": "Primary Mathematics"
    },
    {
      "num": 2,
      "title": "Addition and Subtraction",
      "part": "Primary Mathematics"
    },
    {
      "num": 3,
      "title": "Multiplication",
      "part": "Primary Mathematics"
    },
    {
      "num": 4,
      "title": "Division",
      "part": "Primary Mathematics"
    },
    {
      "num": 5,
      "title": "Length",
      "part": "Primary Mathematics"
    },
    {
      "num": 6,
      "title": "Weight",
      "part": "Primary Mathematics"
    },
    {
      "num": 7,
      "title": "Capacity",
      "part": "Primary Mathematics"
    },
    {
      "num": 8,
      "title": "Time and Calendar",
      "part": "Primary Mathematics"
    },
    {
      "num": 9,
      "title": "Fractions",
      "part": "Primary Mathematics"
    },
    {
      "num": 10,
      "title": "Angles",
      "part": "Primary Mathematics"
    },
    {
      "num": 11,
      "title": "Perimeter",
      "part": "Primary Mathematics"
    },
    {
      "num": 12,
      "title": "Area",
      "part": "Primary Mathematics"
    },
    {
      "num": 13,
      "title": "Volume",
      "part": "Primary Mathematics"
    },
    {
      "num": 14,
      "title": "Fun with Patterns",
      "part": "Primary Mathematics"
    }
  ],
  "4_sci4": [
    {
      "num": 1,
      "title": "My Body",
      "part": "The Living World"
    },
    {
      "num": 2,
      "title": "Plants",
      "part": "The Living World"
    },
    {
      "num": 3,
      "title": "Flowers and Fruits",
      "part": "The Living World"
    },
    {
      "num": 4,
      "title": "Plants Around Us",
      "part": "The Living World"
    },
    {
      "num": 5,
      "title": "Birds—Beaks and Claws",
      "part": "The Living World"
    },
    {
      "num": 6,
      "title": "Insects",
      "part": "The Living World"
    },
    {
      "num": 7,
      "title": "Food",
      "part": "The Living World"
    },
    {
      "num": 8,
      "title": "Water Scarcity and Conservation of Water",
      "part": "The Living World"
    },
    {
      "num": 9,
      "title": "Safe Handling and Storage of Water",
      "part": "The Living World"
    },
    {
      "num": 10,
      "title": "Water Pollution",
      "part": "The Living World"
    }
  ],
  "4_sst4": [
    {
      "num": 1,
      "title": "Family Relationships",
      "part": "We and Our World"
    },
    {
      "num": 2,
      "title": "Sensitivity Towards Others",
      "part": "We and Our World"
    },
    {
      "num": 3,
      "title": "Celebrating Our Diversity",
      "part": "We and Our World"
    },
    {
      "num": 4,
      "title": "An Ideal Home",
      "part": "We and Our World"
    },
    {
      "num": 5,
      "title": "Bricks and Bridges",
      "part": "We and Our World"
    },
    {
      "num": 6,
      "title": "Waste Management",
      "part": "We and Our World"
    },
    {
      "num": 7,
      "title": "The Works We Do",
      "part": "We and Our World"
    },
    {
      "num": 8,
      "title": "Leisure Time",
      "part": "We and Our World"
    },
    {
      "num": 9,
      "title": "Directions",
      "part": "We and Our World"
    },
    {
      "num": 10,
      "title": "Travel and Tours",
      "part": "We and Our World"
    },
    {
      "num": 11,
      "title": "Let Us Travel",
      "part": "We and Our World"
    },
    {
      "num": 12,
      "title": "Let Us Communicate",
      "part": "We and Our World"
    },
    {
      "num": 13,
      "title": "India—Our Motherland",
      "part": "We and Our World"
    }
  ],
  "4_comp4": [
    {
      "num": 1,
      "title": "Computer—A Machine",
      "part": "Hands On Computer"
    },
    {
      "num": 2,
      "title": "More on Tux Paint",
      "part": "Hands On Computer"
    },
    {
      "num": 3,
      "title": "Exploring Tux Paint",
      "part": "Hands On Computer"
    },
    {
      "num": 4,
      "title": "LOGO-I",
      "part": "Hands On Computer"
    },
    {
      "num": 5,
      "title": "LOGO-II",
      "part": "Hands On Computer"
    },
    {
      "num": 6,
      "title": "Writer-Getting Started",
      "part": "Hands On Computer"
    },
    {
      "num": 7,
      "title": "Editing in Writer",
      "part": "Hands On Computer"
    },
    {
      "num": 8,
      "title": "Internet as A Pool of Information",
      "part": "Hands On Computer"
    }
  ],
  "4_gk4": [
    {
      "num": 1,
      "title": "Language and Literature"
    },
    {
      "num": 2,
      "title": "Environment Around Us"
    },
    {
      "num": 3,
      "title": "World Around Us"
    },
    {
      "num": 4,
      "title": "Art and Culture of India"
    },
    {
      "num": 5,
      "title": "Math Magic & Brain Teasers"
    },
    {
      "num": 6,
      "title": "Sports & Games Championship"
    }
  ],
  "3_hin3_bm": [
    {
      "num": 1,
      "title": "भोलू भुलक्कड़",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 2,
      "title": "चतुर कौवा",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 3,
      "title": "हाथी और चिड़िया",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 4,
      "title": "चींटी ने पाठ पढ़ाया",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 5,
      "title": "बहादुर दोस्त",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 6,
      "title": "घमंडी मक्खी",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 7,
      "title": "दादाजी",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 8,
      "title": "अगर पेड़ भी चलते होते",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 9,
      "title": "गीत का कमाल",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 10,
      "title": "बूझो तो जानें",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 11,
      "title": "चूँ-चूँ की टोपी",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 12,
      "title": "सुबह",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 13,
      "title": "ऐसे थे लाल बहादुर शास्त्री",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 14,
      "title": "सबसे बड़ा मूर्ख",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 15,
      "title": "बुआ का पत्र",
      "part": "भाषा माधुरी (साहित्य)"
    },
    {
      "num": 16,
      "title": "सवाली राम",
      "part": "भाषा माधुरी (साहित्य)"
    }
  ],
  "3_hin3_ba": [
    {
      "num": 1,
      "title": "भोलू भुलक्कड़",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 2,
      "title": "चतुर कौवा",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 3,
      "title": "हाथी और चिड़िया",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 4,
      "title": "चींटी ने अभ्यास पढ़ाया",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 5,
      "title": "बहादुर दोस्त",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 6,
      "title": "घमंडी मक्खी",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 7,
      "title": "दादाजी",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 8,
      "title": "अगर पेड़ भी चलते होते",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 9,
      "title": "गीत का कमाल",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 10,
      "title": "बूझो तो जानें",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 11,
      "title": "चूँ-चूँ की टोपी",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 12,
      "title": "सुबह",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 13,
      "title": "ऐसे थे लाल बहादुर शास्त्री",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 14,
      "title": "सबसे बड़ा मूर्ख",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 15,
      "title": "बुआ का पत्र",
      "part": "भाषा अभ्यास (व्याकरण)"
    },
    {
      "num": 16,
      "title": "सवाली राम",
      "part": "भाषा अभ्यास (व्याकरण)"
    }
  ],
  "3_eng3_reader": [
    {
      "num": 1,
      "title": "Animal World",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Nature Cares",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Regard for Values",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "Adventure",
      "part": "My English Reader"
    }
  ],
  "3_eng3_prac": [
    {
      "num": 1,
      "title": "Naming Words",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Replacing Words",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "How Many? (Numbers)",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Describing Words",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Verbs",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Prepositions",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "Fixing Words (Articles)",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Sentences",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Subject and Predicate",
      "part": "English Practice Book"
    }
  ],
  "3_math3": [
    {
      "num": 1,
      "title": "Numbers Up to 9999",
      "part": "Primary Mathematics"
    },
    {
      "num": 2,
      "title": "Addition",
      "part": "Primary Mathematics"
    },
    {
      "num": 3,
      "title": "Subtraction",
      "part": "Primary Mathematics"
    },
    {
      "num": 4,
      "title": "Multiplication",
      "part": "Primary Mathematics"
    },
    {
      "num": 5,
      "title": "Division",
      "part": "Primary Mathematics"
    },
    {
      "num": 6,
      "title": "Day, Date and Time",
      "part": "Primary Mathematics"
    },
    {
      "num": 7,
      "title": "Money",
      "part": "Primary Mathematics"
    },
    {
      "num": 8,
      "title": "Length",
      "part": "Primary Mathematics"
    },
    {
      "num": 9,
      "title": "Weight",
      "part": "Primary Mathematics"
    },
    {
      "num": 10,
      "title": "Capacity",
      "part": "Primary Mathematics"
    },
    {
      "num": 11,
      "title": "Fraction",
      "part": "Primary Mathematics"
    },
    {
      "num": 12,
      "title": "Geometry",
      "part": "Primary Mathematics"
    }
  ],
  "3_sci3": [
    {
      "num": 1,
      "title": "My Body",
      "part": "My Living World"
    },
    {
      "num": 2,
      "title": "Plants Around Us",
      "part": "My Living World"
    },
    {
      "num": 3,
      "title": "Leaf",
      "part": "My Living World"
    },
    {
      "num": 4,
      "title": "Importance of Plants",
      "part": "My Living World"
    },
    {
      "num": 5,
      "title": "Animals",
      "part": "My Living World"
    },
    {
      "num": 6,
      "title": "Feeding Habits of Animals",
      "part": "My Living World"
    },
    {
      "num": 7,
      "title": "Birds and Their Nests",
      "part": "My Living World"
    },
    {
      "num": 8,
      "title": "Food",
      "part": "My Living World"
    },
    {
      "num": 9,
      "title": "Cooking and Eating Habits",
      "part": "My Living World"
    },
    {
      "num": 10,
      "title": "Water",
      "part": "My Living World"
    }
  ],
  "3_sst3": [
    {
      "num": 1,
      "title": "The Family",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 2,
      "title": "Family Similarities",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 3,
      "title": "Our Food",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 4,
      "title": "Our Dresses",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 5,
      "title": "The Early Man",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 6,
      "title": "Learning About Works",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 7,
      "title": "If You Believe You Can, You Can!",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 8,
      "title": "Let Us Enjoy!",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 9,
      "title": "Our Homes",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 10,
      "title": "Beautiful Homes",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 11,
      "title": "Directions",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 12,
      "title": "Conquering Distances",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 13,
      "title": "Closing Distances",
      "part": "We and Our World (Social Studies)"
    },
    {
      "num": 14,
      "title": "I Am Proud To Be An Indian",
      "part": "We and Our World (Social Studies)"
    }
  ],
  "3_comp3": [
    {
      "num": 1,
      "title": "Getting Started",
      "part": "Hands On Computer"
    },
    {
      "num": 2,
      "title": "Fundamentals of Computers",
      "part": "Hands On Computer"
    },
    {
      "num": 3,
      "title": "Keyboard 1",
      "part": "Hands On Computer"
    },
    {
      "num": 4,
      "title": "Touch Typing: Play with Text Editor",
      "part": "Hands On Computer"
    },
    {
      "num": 5,
      "title": "Know the Keyboard",
      "part": "Hands On Computer"
    },
    {
      "num": 6,
      "title": "Using the Icons",
      "part": "Hands On Computer"
    },
    {
      "num": 7,
      "title": "Tux Paint: Let's Paint the World",
      "part": "Hands On Computer"
    },
    {
      "num": 8,
      "title": "Use Safe: Precautions While Using Computers",
      "part": "Hands On Computer"
    }
  ],
  "3_gk3": [
    {
      "num": 1,
      "title": "Language & Literature",
      "part": "Kid Wiz GK"
    },
    {
      "num": 2,
      "title": "Environment Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 3,
      "title": "World Around",
      "part": "Kid Wiz GK"
    },
    {
      "num": 4,
      "title": "Art & Culture",
      "part": "Kid Wiz GK"
    },
    {
      "num": 5,
      "title": "Math Magic",
      "part": "Kid Wiz GK"
    },
    {
      "num": 6,
      "title": "Sports & Games",
      "part": "Kid Wiz GK"
    }
  ],
  "2_hin2_bm": [
    {
      "num": 1,
      "title": "सीखो (कविता)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 2,
      "title": "ठीक समय पर",
      "part": "भाषा माधुरी"
    },
    {
      "num": 3,
      "title": "नीली पतंग",
      "part": "भाषा माधुरी"
    },
    {
      "num": 4,
      "title": "मेहनत का फल",
      "part": "भाषा माधुरी"
    },
    {
      "num": 5,
      "title": "जन्मदिन",
      "part": "भाषा माधुरी"
    },
    {
      "num": 6,
      "title": "दाँत का दर्द",
      "part": "भाषा माधुरी"
    },
    {
      "num": 7,
      "title": "बाल दिवस",
      "part": "भाषा माधुरी"
    },
    {
      "num": 8,
      "title": "प्यारे पेड़",
      "part": "भाषा माधुरी"
    },
    {
      "num": 9,
      "title": "बादल",
      "part": "भाषा माधुरी"
    },
    {
      "num": 10,
      "title": "दो तोते",
      "part": "भाषा माधुरी"
    },
    {
      "num": 11,
      "title": "चतुर चीकू",
      "part": "भाषा माधुरी"
    },
    {
      "num": 12,
      "title": "सीख",
      "part": "भाषा माधुरी"
    },
    {
      "num": 13,
      "title": "मेला",
      "part": "भाषा माधुरी"
    },
    {
      "num": 14,
      "title": "रोटी",
      "part": "भाषा माधुरी"
    },
    {
      "num": 15,
      "title": "राजू का सपना",
      "part": "भाषा माधुरी"
    },
    {
      "num": 16,
      "title": "अभ्यास",
      "part": "भाषा माधुरी"
    },
    {
      "num": 17,
      "title": "रेल",
      "part": "भाषा माधुरी"
    },
    {
      "num": 18,
      "title": "रोबोट",
      "part": "भाषा माधुरी"
    },
    {
      "num": 19,
      "title": "तिरंगा",
      "part": "भाषा माधुरी"
    },
    {
      "num": 20,
      "title": "यह दिल्ली है",
      "part": "भाषा माधुरी"
    }
  ],
  "2_hin2_abhyas": [
    {
      "num": 1,
      "title": "सीखो",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 2,
      "title": "ठीक काम करें",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 3,
      "title": "दादी का गाँव",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 4,
      "title": "मेहनत का फल",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 5,
      "title": "जन्मदिन",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 6,
      "title": "दाँत का दर्द",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 7,
      "title": "बाल दिवस",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 8,
      "title": "प्यारे पेड़",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 9,
      "title": "बादल",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 10,
      "title": "दो तोते",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 11,
      "title": "चतुर चीकू",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 12,
      "title": "सीख",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 13,
      "title": "मेला",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 14,
      "title": "रोटी",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 15,
      "title": "राजू का सपना",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 16,
      "title": "अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 17,
      "title": "रेल",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 18,
      "title": "रोबोट",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 19,
      "title": "टेलीफ़ोन की घंटी",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 20,
      "title": "यह दिल्ली है",
      "part": "भाषा अभ्यास"
    }
  ],
  "2_eng2_reader": [
    {
      "num": 1,
      "title": "Sheetal",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "Riddle Time",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "Puss and the Parrot",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "The Helpful Friends",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "Little Pussy",
      "part": "My English Reader"
    },
    {
      "num": 6,
      "title": "A Spark in the Dark",
      "part": "My English Reader"
    },
    {
      "num": 7,
      "title": "The Sailing Trip",
      "part": "My English Reader"
    },
    {
      "num": 8,
      "title": "A Mouse in the House",
      "part": "My English Reader"
    },
    {
      "num": 9,
      "title": "The Rainbow",
      "part": "My English Reader"
    },
    {
      "num": 10,
      "title": "The Magic Matchbox",
      "part": "My English Reader"
    },
    {
      "num": 11,
      "title": "Where is the Pink Whale?",
      "part": "My English Reader"
    },
    {
      "num": 12,
      "title": "The Crow's Nest",
      "part": "My English Reader"
    },
    {
      "num": 13,
      "title": "The Foamy Soap",
      "part": "My English Reader"
    },
    {
      "num": 14,
      "title": "Let's Draw",
      "part": "My English Reader"
    },
    {
      "num": 15,
      "title": "When I was a Baby",
      "part": "My English Reader"
    },
    {
      "num": 16,
      "title": "Hanuman",
      "part": "My English Reader"
    },
    {
      "num": 17,
      "title": "The Silver Tray",
      "part": "My English Reader"
    },
    {
      "num": 18,
      "title": "An Inch of Gold",
      "part": "My English Reader"
    },
    {
      "num": 19,
      "title": "What did Sheetal...?",
      "part": "My English Reader"
    },
    {
      "num": 20,
      "title": "The Sparrows",
      "part": "My English Reader"
    },
    {
      "num": 21,
      "title": "Wonder",
      "part": "My English Reader"
    },
    {
      "num": 22,
      "title": "Two Shops",
      "part": "My English Reader"
    },
    {
      "num": 23,
      "title": "The School in the Jungle",
      "part": "My English Reader"
    },
    {
      "num": 24,
      "title": "Whose is it???",
      "part": "My English Reader"
    },
    {
      "num": 25,
      "title": "That is Your Bag, Not Mine",
      "part": "My English Reader"
    },
    {
      "num": 26,
      "title": "The Swing",
      "part": "My English Reader"
    },
    {
      "num": 27,
      "title": "Tomorrow 'will' be a Holiday",
      "part": "My English Reader"
    },
    {
      "num": 28,
      "title": "Raghu, the Dreamer",
      "part": "My English Reader"
    }
  ],
  "2_eng2_prac": [
    {
      "num": 1,
      "title": "Sheetal",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "Riddle Time",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "Puss and the Parrot",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "Helpful Friends",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "A Spark in the Dark",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "Sailing Trip",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "A Mouse in the House",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "The Magic Matchbox",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "Where is the Pink Whale?",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "The Crow's Nest",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "The Foamy Soap",
      "part": "English Practice Book"
    },
    {
      "num": 12,
      "title": "When I was a Baby...",
      "part": "English Practice Book"
    },
    {
      "num": 13,
      "title": "Hanuman",
      "part": "English Practice Book"
    },
    {
      "num": 14,
      "title": "The Silver Tray",
      "part": "English Practice Book"
    },
    {
      "num": 15,
      "title": "An Inch of Gold",
      "part": "English Practice Book"
    },
    {
      "num": 16,
      "title": "When did Sheetal...?",
      "part": "English Practice Book"
    },
    {
      "num": 17,
      "title": "The Sparrows",
      "part": "English Practice Book"
    },
    {
      "num": 18,
      "title": "Two Shops",
      "part": "English Practice Book"
    },
    {
      "num": 19,
      "title": "The School in the Jungle",
      "part": "English Practice Book"
    },
    {
      "num": 20,
      "title": "That is Your Bag, not Mine",
      "part": "English Practice Book"
    },
    {
      "num": 21,
      "title": "Tomorrow will be a Holiday",
      "part": "English Practice Book"
    },
    {
      "num": 22,
      "title": "Raghu, the Dreamer",
      "part": "English Practice Book"
    },
    {
      "num": 23,
      "title": "Picture Talk",
      "part": "English Practice Book"
    }
  ],
  "2_math2": [
    {
      "num": 1,
      "title": "Numbers Till 100",
      "part": "Primary Mathematics"
    },
    {
      "num": 2,
      "title": "Numbers Upto 999",
      "part": "Primary Mathematics"
    },
    {
      "num": 3,
      "title": "Addition",
      "part": "Primary Mathematics"
    },
    {
      "num": 4,
      "title": "Subtraction",
      "part": "Primary Mathematics"
    },
    {
      "num": 5,
      "title": "Money",
      "part": "Primary Mathematics"
    },
    {
      "num": 6,
      "title": "Shapes",
      "part": "Primary Mathematics"
    },
    {
      "num": 7,
      "title": "Odds and Evens",
      "part": "Primary Mathematics"
    },
    {
      "num": 8,
      "title": "Multiplication",
      "part": "Primary Mathematics"
    },
    {
      "num": 9,
      "title": "Time",
      "part": "Primary Mathematics"
    },
    {
      "num": 10,
      "title": "Weights",
      "part": "Primary Mathematics"
    },
    {
      "num": 11,
      "title": "Capacity",
      "part": "Primary Mathematics"
    },
    {
      "num": 12,
      "title": "Length",
      "part": "Primary Mathematics"
    },
    {
      "num": 13,
      "title": "Fractions",
      "part": "Primary Mathematics"
    }
  ],
  "2_evs2": [
    {
      "num": 1,
      "title": "More about me",
      "part": "My Living World (EVS)"
    },
    {
      "num": 2,
      "title": "More on personal cleanliness and good habits",
      "part": "My Living World (EVS)"
    },
    {
      "num": 3,
      "title": "Our food",
      "part": "My Living World (EVS)"
    },
    {
      "num": 4,
      "title": "Our clothes",
      "part": "My Living World (EVS)"
    },
    {
      "num": 5,
      "title": "A house to live in",
      "part": "My Living World (EVS)"
    },
    {
      "num": 6,
      "title": "Neighbourhood",
      "part": "My Living World (EVS)"
    },
    {
      "num": 7,
      "title": "Plants around us",
      "part": "My Living World (EVS)"
    },
    {
      "num": 8,
      "title": "Animal world",
      "part": "My Living World (EVS)"
    },
    {
      "num": 9,
      "title": "Living things / Non-living things",
      "part": "My Living World (EVS)"
    },
    {
      "num": 10,
      "title": "Water",
      "part": "My Living World (EVS)"
    },
    {
      "num": 11,
      "title": "Weather and seasons",
      "part": "My Living World (EVS)"
    },
    {
      "num": 12,
      "title": "Means of transport",
      "part": "My Living World (EVS)"
    },
    {
      "num": 13,
      "title": "Traffic rules",
      "part": "My Living World (EVS)"
    },
    {
      "num": 14,
      "title": "Important days",
      "part": "My Living World (EVS)"
    },
    {
      "num": 15,
      "title": "Great men of Arya Samaj",
      "part": "My Living World (EVS)"
    }
  ],
  "2_comp2": [
    {
      "num": 1,
      "title": "Hello Computers",
      "part": "Online with Computers"
    },
    {
      "num": 2,
      "title": "Parts of a Computer",
      "part": "Online with Computers"
    },
    {
      "num": 3,
      "title": "Mouse",
      "part": "Online with Computers"
    },
    {
      "num": 4,
      "title": "Keyboard",
      "part": "Online with Computers"
    },
    {
      "num": 5,
      "title": "Computers in the World",
      "part": "Online with Computers"
    },
    {
      "num": 6,
      "title": "Fun with Computers",
      "part": "Online with Computers"
    },
    {
      "num": 7,
      "title": "Drawing and Colouring in Paint",
      "part": "Online with Computers"
    }
  ],
  "1_hin1_bm": [
    {
      "num": 1,
      "title": "राजा बेटा (कविता)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 2,
      "title": "अमन (दो अक्षर वाले शब्द)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 3,
      "title": "समझदार अजय (आ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 4,
      "title": "रविवार का दिन (इ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 5,
      "title": "दीपावली आई (ई की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 6,
      "title": "गुड़िया की चुनरी (उ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 7,
      "title": "जादूगर का जादू (ऊ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 8,
      "title": "मेले की सैर (ए की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 9,
      "title": "नटखट झबरू (ऐ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 10,
      "title": "शैतान शैलू",
      "part": "भाषा माधुरी"
    },
    {
      "num": 11,
      "title": "होली का दिन (ओ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 12,
      "title": "कौशल की सालगिरह (औ की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 13,
      "title": "संजय की पतंग (अं की मात्रा)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 14,
      "title": "ताँगे वाले की मूँछें (चंद्रबिंदु)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 15,
      "title": "परी (कहानी)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 16,
      "title": "तितली (कविता)",
      "part": "भाषा माधुरी"
    },
    {
      "num": 17,
      "title": "नन्हीं चिड़िया",
      "part": "भाषा माधुरी"
    },
    {
      "num": 18,
      "title": "अच्छी सीख",
      "part": "भाषा माधुरी"
    },
    {
      "num": 19,
      "title": "चतुर चूहा",
      "part": "भाषा माधुरी"
    },
    {
      "num": 20,
      "title": "गाजर का हलवा",
      "part": "भाषा माधुरी"
    },
    {
      "num": 21,
      "title": "भारत का गौरव",
      "part": "भाषा माधुरी"
    },
    {
      "num": 22,
      "title": "चंदा मामा",
      "part": "भाषा माधुरी"
    },
    {
      "num": 23,
      "title": "बिल्ली का पंजा",
      "part": "भाषा माधुरी"
    },
    {
      "num": 24,
      "title": "बाल दिवस",
      "part": "भाषा माधुरी"
    }
  ],
  "1_hin1_abhyas": [
    {
      "num": 1,
      "title": "चित्र मिलान एवं वर्ण अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 2,
      "title": "अमन - दो व तीन अक्षर वाले शब्द अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 3,
      "title": "समझदार अजय - आ (T) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 4,
      "title": "रविवार का दिन - इ (f) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 5,
      "title": "दीपावली आई - ई (ी) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 6,
      "title": "गुड़िया की चुनरी - उ (ु) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 7,
      "title": "जादूगर का जादू - ऊ (ू) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 8,
      "title": "मेले की सैर - ए (े) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 9,
      "title": "नटखट झबरू - अभ्यास कार्य",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 10,
      "title": "शैतान शैलू - ऐ (ै) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 11,
      "title": "होली का दिन - ओ (ो) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 12,
      "title": "कौशल की सालगिरह - औ (ौ) की मात्रा अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 13,
      "title": "संजय की पतंग - अं (ं) अनुस्वार अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 14,
      "title": "ताँगे वाले की मूँछें - चंद्रबिंदु (ँ) अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 15,
      "title": "परी - शब्द ज्ञान व रिक्त स्थान",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 16,
      "title": "तितली - रंग भरो व तुकांत शब्द",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 17,
      "title": "नन्हीं चिड़िया - वाक्य रचना",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 18,
      "title": "अच्छी सीख - प्रश्नोत्तर अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 19,
      "title": "चतुर चूहा - विपरीत शब्द",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 20,
      "title": "गाजर का हलवा - वाक्य सुधार",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 21,
      "title": "भारत का गौरव - समान अर्थ वाले शब्द",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 22,
      "title": "चंदा मामा - कविता अभ्यास",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 23,
      "title": "बिल्ली का पंजा - अभ्यास कार्य",
      "part": "भाषा अभ्यास"
    },
    {
      "num": 24,
      "title": "बाल दिवस - रचनात्मक कार्य",
      "part": "भाषा अभ्यास"
    }
  ],
  "1_eng1_reader": [
    {
      "num": 1,
      "title": "Neha in a Jeep",
      "part": "My English Reader"
    },
    {
      "num": 2,
      "title": "The Big Bell",
      "part": "My English Reader"
    },
    {
      "num": 3,
      "title": "The Hot Spoon",
      "part": "My English Reader"
    },
    {
      "num": 4,
      "title": "A Shop in the Ship",
      "part": "My English Reader"
    },
    {
      "num": 5,
      "title": "Chintu and the Chicks",
      "part": "My English Reader"
    },
    {
      "num": 6,
      "title": "The Thief and the Thorn",
      "part": "My English Reader"
    },
    {
      "num": 7,
      "title": "The Puss in the Class",
      "part": "My English Reader"
    },
    {
      "num": 8,
      "title": "Vicky and Nicky",
      "part": "My English Reader"
    },
    {
      "num": 9,
      "title": "The King's Ring",
      "part": "My English Reader"
    },
    {
      "num": 10,
      "title": "Let us learn about 'I'",
      "part": "My English Reader"
    },
    {
      "num": 11,
      "title": "Anil and Geeta",
      "part": "My English Reader"
    },
    {
      "num": 12,
      "title": "Out of the Cage",
      "part": "My English Reader"
    },
    {
      "num": 13,
      "title": "Clever Chicks",
      "part": "My English Reader"
    },
    {
      "num": 14,
      "title": "Tommy - the pet",
      "part": "My English Reader"
    },
    {
      "num": 15,
      "title": "A Picnic",
      "part": "My English Reader"
    },
    {
      "num": 16,
      "title": "Raju's Bunny",
      "part": "My English Reader"
    },
    {
      "num": 17,
      "title": "What is what?",
      "part": "My English Reader"
    },
    {
      "num": 18,
      "title": "Kitty's Birthday",
      "part": "My English Reader"
    },
    {
      "num": 19,
      "title": "The Ants",
      "part": "My English Reader"
    },
    {
      "num": 20,
      "title": "The Greedy Monkey",
      "part": "My English Reader"
    },
    {
      "num": 21,
      "title": "Let's compose",
      "part": "My English Reader"
    },
    {
      "num": 22,
      "title": "Leave a note",
      "part": "My English Reader"
    },
    {
      "num": 23,
      "title": "Picture Talk",
      "part": "My English Reader"
    },
    {
      "num": 24,
      "title": "Picture Story",
      "part": "My English Reader"
    }
  ],
  "1_eng1_prac": [
    {
      "num": 1,
      "title": "Neha in a Jeep (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 2,
      "title": "The Big Bell (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 3,
      "title": "The Hot Spoon (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 4,
      "title": "A Shop in the Ship (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 5,
      "title": "Chintu and the Chicks (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 6,
      "title": "The Thief and the Thorn (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 7,
      "title": "The Puss in the Class (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 8,
      "title": "Vicky and Nicky (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 9,
      "title": "The King's Ring (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 10,
      "title": "Let us learn about 'I' (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 11,
      "title": "Anil and Geeta (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 12,
      "title": "Out of the Cage (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 13,
      "title": "Clever Chicks (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 14,
      "title": "Tommy - the pet (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 15,
      "title": "A Picnic (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 16,
      "title": "Raju's Bunny (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 17,
      "title": "What is what? (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 18,
      "title": "Kitty's Birthday (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 19,
      "title": "The Ants (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 20,
      "title": "The Greedy Monkey (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 21,
      "title": "Let's compose (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 22,
      "title": "Leave a note (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 23,
      "title": "Picture Talk (Practice & Phonics)",
      "part": "English Practice Book"
    },
    {
      "num": 24,
      "title": "Picture Story (Practice & Phonics)",
      "part": "English Practice Book"
    }
  ],
  "1_math1": [
    {
      "num": 1,
      "title": "Comparison",
      "part": "Primary Mathematics"
    },
    {
      "num": 2,
      "title": "Number Concept (0-50)",
      "part": "Primary Mathematics"
    },
    {
      "num": 3,
      "title": "Addition and Subtraction (0-20)",
      "part": "Primary Mathematics"
    },
    {
      "num": 4,
      "title": "Shapes",
      "part": "Primary Mathematics"
    },
    {
      "num": 5,
      "title": "Number Concept (0-100)",
      "part": "Primary Mathematics"
    },
    {
      "num": 6,
      "title": "Length",
      "part": "Primary Mathematics"
    },
    {
      "num": 7,
      "title": "Add & Subtract",
      "part": "Primary Mathematics"
    },
    {
      "num": 8,
      "title": "Weight",
      "part": "Primary Mathematics"
    },
    {
      "num": 9,
      "title": "More on Addition (0-99)",
      "part": "Primary Mathematics"
    },
    {
      "num": 10,
      "title": "Capacity",
      "part": "Primary Mathematics"
    },
    {
      "num": 11,
      "title": "More on Subtraction",
      "part": "Primary Mathematics"
    },
    {
      "num": 12,
      "title": "Time",
      "part": "Primary Mathematics"
    },
    {
      "num": 13,
      "title": "Money",
      "part": "Primary Mathematics"
    }
  ],
  "1_evs1": [
    {
      "num": 1,
      "title": "More about me",
      "part": "My Living World (EVS)"
    },
    {
      "num": 2,
      "title": "Keeping clean",
      "part": "My Living World (EVS)"
    },
    {
      "num": 3,
      "title": "Our food",
      "part": "My Living World (EVS)"
    },
    {
      "num": 4,
      "title": "Keeping healthy",
      "part": "My Living World (EVS)"
    },
    {
      "num": 5,
      "title": "Clothing",
      "part": "My Living World (EVS)"
    },
    {
      "num": 6,
      "title": "A house is a must",
      "part": "My Living World (EVS)"
    },
    {
      "num": 7,
      "title": "Who are they?",
      "part": "My Living World (EVS)"
    },
    {
      "num": 8,
      "title": "We are a happy family",
      "part": "My Living World (EVS)"
    },
    {
      "num": 9,
      "title": "Fairs & festivals",
      "part": "My Living World (EVS)"
    },
    {
      "num": 10,
      "title": "Know your surroundings",
      "part": "My Living World (EVS)"
    },
    {
      "num": 11,
      "title": "Plants",
      "part": "My Living World (EVS)"
    },
    {
      "num": 12,
      "title": "The animal kingdom",
      "part": "My Living World (EVS)"
    },
    {
      "num": 13,
      "title": "Water",
      "part": "My Living World (EVS)"
    },
    {
      "num": 14,
      "title": "Important places",
      "part": "My Living World (EVS)"
    },
    {
      "num": 15,
      "title": "Let us meet them",
      "part": "My Living World (EVS)"
    }
  ],
  "1_comp1": [
    {
      "num": 1,
      "title": "Computers",
      "part": "Online with Computers"
    },
    {
      "num": 2,
      "title": "Parts of a Computer",
      "part": "Online with Computers"
    },
    {
      "num": 3,
      "title": "Mouse and Keyboard",
      "part": "Online with Computers"
    },
    {
      "num": 4,
      "title": "Uses of Computers",
      "part": "Online with Computers"
    }
  ],
  "1_gk1": [
    {
      "num": 1,
      "title": "Animal park",
      "part": "Wow GK"
    },
    {
      "num": 2,
      "title": "Green quiz",
      "part": "Wow GK"
    },
    {
      "num": 3,
      "title": "On my plate",
      "part": "Wow GK"
    },
    {
      "num": 4,
      "title": "Home sweet home",
      "part": "Wow GK"
    },
    {
      "num": 5,
      "title": "My India",
      "part": "Wow GK"
    },
    {
      "num": 6,
      "title": "Pair them up",
      "part": "Wow GK"
    },
    {
      "num": 7,
      "title": "Shapes and patterns",
      "part": "Wow GK"
    },
    {
      "num": 8,
      "title": "Time to celebrate",
      "part": "Wow GK"
    },
    {
      "num": 9,
      "title": "Work people do",
      "part": "Wow GK"
    },
    {
      "num": 10,
      "title": "In my body",
      "part": "Wow GK"
    },
    {
      "num": 11,
      "title": "Sporty quiz",
      "part": "Wow GK"
    },
    {
      "num": 12,
      "title": "What's the time?",
      "part": "Wow GK"
    },
    {
      "num": 13,
      "title": "Fairyland",
      "part": "Wow GK"
    },
    {
      "num": 14,
      "title": "Film fun",
      "part": "Wow GK"
    },
    {
      "num": 15,
      "title": "Wheel power",
      "part": "Wow GK"
    }
  ],
  "UKG_ukg_hin_bm": [
    {
      "num": 1,
      "title": "आओ दोहराएँ (व्यंजन: क से ह तक)",
      "part": "बाल माधुरी"
    },
    {
      "num": 2,
      "title": "स्वर (अ से अः तक सचित्र परिचय)",
      "part": "बाल माधुरी"
    },
    {
      "num": 3,
      "title": "दो अक्षर वाले शब्द एवं सरल वाक्य (वन तक चल, डर मत)",
      "part": "बाल माधुरी"
    },
    {
      "num": 4,
      "title": "तीन अक्षर वाले शब्द एवं सरल वाक्य (महल तक चल)",
      "part": "बाल माधुरी"
    },
    {
      "num": 5,
      "title": "चार अक्षर वाले शब्द एवं सरल वाक्य (उबटन मल कर कसरत कर)",
      "part": "बाल माधुरी"
    },
    {
      "num": 6,
      "title": "'आ' की मात्रा (T) वाले शब्द एवं सरल वाक्य (माता का कहा मान, सावन आया बादल आया)",
      "part": "बाल माधुरी"
    }
  ],
  "UKG_ukg_hin_sa": [
    {
      "num": 1,
      "title": "व्यंजन गीत एवं अभ्यास (क से ह)",
      "part": "शब्द अभ्यास"
    },
    {
      "num": 2,
      "title": "स्वर गीत एवं अभ्यास (अ से अः)",
      "part": "शब्द अभ्यास"
    },
    {
      "num": 3,
      "title": "दो अक्षर वाले शब्दों का अभ्यास",
      "part": "शब्द अभ्यास"
    },
    {
      "num": 4,
      "title": "तीन अक्षर वाले शब्दों का अभ्यास",
      "part": "शब्द अभ्यास"
    },
    {
      "num": 5,
      "title": "चार अक्षर वाले शब्दों का अभ्यास",
      "part": "शब्द अभ्यास"
    },
    {
      "num": 6,
      "title": "'आ' की मात्रा वाले शब्दों का अभ्यास",
      "part": "शब्द अभ्यास"
    }
  ],
  "UKG_ukg_eng": [
    {
      "num": 1,
      "title": "Initial sounds of letters of alphabet",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 2,
      "title": "Vowel Stories & Phonics",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 3,
      "title": "Language Skills, Prepositions & Reader Stories",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 4,
      "title": "Myself",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 5,
      "title": "My Family",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 6,
      "title": "My Body Parts & Sense Organs",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 7,
      "title": "Home Sweet Home",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 8,
      "title": "My School",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 9,
      "title": "Water Around Us & Water Experiments",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 10,
      "title": "Our Helpers",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 11,
      "title": "Food",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 12,
      "title": "Animals & Birds (Homes, Babies, Food)",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 13,
      "title": "How We Travel & Road Safety",
      "part": "English Reader & Rhymes"
    },
    {
      "num": 14,
      "title": "Living and Non-Living Things, Plants & Seasons",
      "part": "English Reader & Rhymes"
    }
  ],
  "UKG_ukg_math": [
    {
      "num": 1,
      "title": "Comparison",
      "part": "Kindergarten Math"
    },
    {
      "num": 2,
      "title": "Numbers (0-10)",
      "part": "Kindergarten Math"
    },
    {
      "num": 3,
      "title": "Addition and Subtraction",
      "part": "Kindergarten Math"
    },
    {
      "num": 4,
      "title": "Shapes and Their Names",
      "part": "Kindergarten Math"
    },
    {
      "num": 5,
      "title": "Numbers (11-20)",
      "part": "Kindergarten Math"
    },
    {
      "num": 6,
      "title": "Numbers (0-50)",
      "part": "Kindergarten Math"
    },
    {
      "num": 7,
      "title": "Measurement",
      "part": "Kindergarten Math"
    }
  ],
  "UKG_ukg_act": [
    {
      "num": 1,
      "title": "All About Myself and My Family"
    },
    {
      "num": 2,
      "title": "Healthy Habits, Hygiene & Cleanliness"
    },
    {
      "num": 3,
      "title": "Our Helpers, School and Community"
    },
    {
      "num": 4,
      "title": "Animal Friends and Their Homes"
    },
    {
      "num": 5,
      "title": "Plants, Trees, Flowers and Green Nature"
    },
    {
      "num": 6,
      "title": "Seasons, Festivals and Celebrations"
    }
  ],
  "UKG_ukg_art": [
    {
      "num": 1,
      "title": "Lines, Waves and Pattern Curves",
      "part": "Art & Craft"
    },
    {
      "num": 2,
      "title": "Basic Shapes & Cartoon Doodles",
      "part": "Art & Craft"
    },
    {
      "num": 3,
      "title": "Primary Colours & Magic Shading",
      "part": "Art & Craft"
    },
    {
      "num": 4,
      "title": "Fruits & Vegetables Colouring Fun",
      "part": "Art & Craft"
    },
    {
      "num": 5,
      "title": "Cute Animals & Birds Doodling",
      "part": "Art & Craft"
    },
    {
      "num": 6,
      "title": "Nature, Trees & Blooming Flowers",
      "part": "Art & Craft"
    },
    {
      "num": 7,
      "title": "Festival Greeting Crafts",
      "part": "Art & Craft"
    },
    {
      "num": 8,
      "title": "Free Expression & Poster Making",
      "part": "Art & Craft"
    }
  ],
  "LKG_lkg_eng": [
    {
      "num": 1,
      "title": "Visual Discrimination and Thinking Skills"
    },
    {
      "num": 2,
      "title": "Auditory Discrimination & Sound Identification"
    },
    {
      "num": 3,
      "title": "Letter Phonics Stories (Letters A to H)"
    },
    {
      "num": 4,
      "title": "Letter Phonics Stories (Letters I to P)"
    },
    {
      "num": 5,
      "title": "Letter Phonics Stories (Letters Q to Z)"
    },
    {
      "num": 6,
      "title": "Action Words and Daily Vocabulary"
    },
    {
      "num": 7,
      "title": "Rhymes, Finger Plays and Audio Songs"
    },
    {
      "num": 8,
      "title": "Picture Reading and Story Sequence"
    }
  ],
  "LKG_lkg_hin": [
    {
      "num": 1,
      "title": "स्वर वर्णमाला पहचान (अ से अः)"
    },
    {
      "num": 2,
      "title": "व्यंजन वर्णमाला अभ्यास (क से ड़)"
    },
    {
      "num": 3,
      "title": "चित्र पहचान व प्रथम ध्वनि मिलान"
    },
    {
      "num": 4,
      "title": "बाल गीत व कविताएँ (मछली जल की रानी है, चंदा मामा)"
    },
    {
      "num": 5,
      "title": "दो अक्षर वाले सरल शब्द (घर, फल, जल, बस)"
    },
    {
      "num": 6,
      "title": "मौखिक अभिव्यक्ति व कहानी श्रवण"
    }
  ],
  "LKG_lkg_math": [
    {
      "num": 1,
      "title": "Pre-Mathematical Concepts & Sorting",
      "part": "Fun with Maths"
    },
    {
      "num": 2,
      "title": "Primary Colours",
      "part": "Fun with Maths"
    },
    {
      "num": 3,
      "title": "Comparison",
      "part": "Fun with Maths"
    },
    {
      "num": 4,
      "title": "Shapes",
      "part": "Fun with Maths"
    },
    {
      "num": 5,
      "title": "Number Concept (1 to 9)",
      "part": "Fun with Maths"
    },
    {
      "num": 6,
      "title": "Zero (0) Concept",
      "part": "Fun with Maths"
    },
    {
      "num": 7,
      "title": "Numbers from 0 to 9 Review & Missing Numbers",
      "part": "Fun with Maths"
    }
  ],
  "LKG_lkg_evs": [
    {
      "num": 1,
      "title": "All About Me (My Body & Senses)",
      "part": "Environmental Studies"
    },
    {
      "num": 2,
      "title": "My Loving Family & Home",
      "part": "Environmental Studies"
    },
    {
      "num": 3,
      "title": "Healthy Food & Good Habits",
      "part": "Environmental Studies"
    },
    {
      "num": 4,
      "title": "My Friendly Animals & Pets",
      "part": "Environmental Studies"
    },
    {
      "num": 5,
      "title": "Plants, Green Leaves & Flowers",
      "part": "Environmental Studies"
    },
    {
      "num": 6,
      "title": "Things That Move (Vehicles & Wheels)",
      "part": "Environmental Studies"
    },
    {
      "num": 7,
      "title": "Seasons, Sun & Rainy Days",
      "part": "Environmental Studies"
    },
    {
      "num": 8,
      "title": "Community Helpers Around Us",
      "part": "Environmental Studies"
    }
  ],
  "LKG_lkg_act": [
    {
      "num": 1,
      "title": "Know Me Better",
      "part": "Integrated Activity"
    },
    {
      "num": 2,
      "title": "Pattern Fun",
      "part": "Integrated Activity"
    },
    {
      "num": 3,
      "title": "General Awareness",
      "part": "Integrated Activity"
    },
    {
      "num": 4,
      "title": "Letters & Word Associations",
      "part": "Integrated Activity"
    }
  ],
  "Nursery_rhymes": [
    {
      "num": 1,
      "title": "Early English Nursery Rhymes"
    },
    {
      "num": 2,
      "title": "Action Rhymes and Finger Movement"
    },
    {
      "num": 3,
      "title": "Animal and Bird Songs"
    },
    {
      "num": 4,
      "title": "Alphabet Sound Association (A to Z)"
    }
  ],
  "Nursery_numbers": [
    {
      "num": 1,
      "title": "Big and Small, Tall and Short Concept"
    },
    {
      "num": 2,
      "title": "Basic Colors and Shape Recognition"
    },
    {
      "num": 3,
      "title": "Counting with Objects (1 to 5)"
    },
    {
      "num": 4,
      "title": "Numbers (6 to 10) and Fun with Dots"
    }
  ],
  "Nursery_activity": [
    {
      "num": 1,
      "title": "Scribbling, Tracing and Hand Grip"
    },
    {
      "num": 2,
      "title": "Clay Modeling & Simple Folding"
    },
    {
      "num": 3,
      "title": "Tearing and Pasting Paper Craft"
    },
    {
      "num": 4,
      "title": "Free Expression & Outdoor Observation"
    }
  ],
  "Nursery_hindi": [
    {
      "num": 1,
      "title": "प्रारंभिक बाल गीत एवं तुकांत कविताएँ"
    },
    {
      "num": 2,
      "title": "पशु-पक्षी एवं प्रकृति के सरल गीत"
    },
    {
      "num": 3,
      "title": "चित्र देखकर नाम बताना एवं वार्तालाप"
    },
    {
      "num": 4,
      "title": "सरल अभिनय गीत"
    }
  ]
};

/**
 * Get chapters for a class and subject, with intelligent alias normalization
 */
export function getChaptersForClassSubject(classId, subjectId) {
  const normClass = String(classId).replace(/class\s*/i, '').trim();
  const rawSubj = String(subjectId).toLowerCase().trim();
  
  // 1. Direct match: e.g. '8_hin8_gs', '8_eng8_lit', '7_hin7_as'
  const directKey = `${normClass}_${rawSubj}`;
  if (DAV_CHAPTERS_MAP[directKey] && DAV_CHAPTERS_MAP[directKey].length > 0) {
    return DAV_CHAPTERS_MAP[directKey];
  }

  // 2. Direct key in DAV_CHAPTERS_MAP without class prefix if user passed full key
  if (DAV_CHAPTERS_MAP[rawSubj] && DAV_CHAPTERS_MAP[rawSubj].length > 0) {
    return DAV_CHAPTERS_MAP[rawSubj];
  }

  // 3. Fallback Alias matching for Hindi and English sub-books
  if (rawSubj.includes('hin') || rawSubj.includes('hindi')) {
    if (rawSubj.includes('abhyas') || rawSubj.includes('as') || rawSubj.includes('grammar') || rawSubj.includes('ba')) {
      const k = ['8', '7', '6'].includes(normClass) ? `${normClass}_hin${normClass}_as` : `${normClass}_hin${normClass}_ba`;
      if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
      if (DAV_CHAPTERS_MAP[`${normClass}_hin${normClass}_abhyas`]) return DAV_CHAPTERS_MAP[`${normClass}_hin${normClass}_abhyas`];
      if (DAV_CHAPTERS_MAP[`${normClass}_ukg_hin_sa`]) return DAV_CHAPTERS_MAP[`${normClass}_ukg_hin_sa`];
    } else {
      const k = ['8', '7', '6'].includes(normClass) ? `${normClass}_hin${normClass}_gs` : `${normClass}_hin${normClass}_bm`;
      if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
      if (DAV_CHAPTERS_MAP[`${normClass}_ukg_hin_bm`]) return DAV_CHAPTERS_MAP[`${normClass}_ukg_hin_bm`];
      if (DAV_CHAPTERS_MAP[`${normClass}_lkg_hin`]) return DAV_CHAPTERS_MAP[`${normClass}_lkg_hin`];
    }
  }

  if (rawSubj.includes('eng') || rawSubj.includes('english')) {
    if (rawSubj.includes('lit') || rawSubj.includes('literature')) {
      // Literature exists in Class 6, 7, 8
      if (['8', '7', '6'].includes(normClass)) {
        const k = `${normClass}_eng${normClass}_lit`;
        if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
      }
    } else if (rawSubj.includes('prac') || rawSubj.includes('practice')) {
      const k = `${normClass}_eng${normClass}_prac`;
      if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
    } else {
      // Reader / Coursebook
      const k = `${normClass}_eng${normClass}_reader`;
      if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
      if (DAV_CHAPTERS_MAP[`${normClass}_ukg_eng`]) return DAV_CHAPTERS_MAP[`${normClass}_ukg_eng`];
      if (DAV_CHAPTERS_MAP[`${normClass}_lkg_eng`]) return DAV_CHAPTERS_MAP[`${normClass}_lkg_eng`];
    }
  }

  // 4. Mathematics
  if (rawSubj.includes('math')) {
    const k = `${normClass}_math${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
    if (DAV_CHAPTERS_MAP[`${normClass}_ukg_math`]) return DAV_CHAPTERS_MAP[`${normClass}_ukg_math`];
    if (DAV_CHAPTERS_MAP[`${normClass}_lkg_math`]) return DAV_CHAPTERS_MAP[`${normClass}_lkg_math`];
  }

  // 5. Social Science / SST / EVS (Must be checked BEFORE Science because "Social Science" contains "sci")
  if (rawSubj.includes('sst') || rawSubj.includes('soc')) {
    const k = `${normClass}_sst${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  // 6. Science
  if (rawSubj.includes('sci')) {
    const k = `${normClass}_sci${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  if (rawSubj.includes('evs')) {
    const k = `${normClass}_evs${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
    if (DAV_CHAPTERS_MAP[`${normClass}_lkg_evs`]) return DAV_CHAPTERS_MAP[`${normClass}_lkg_evs`];
  }

  // 7. Sanskrit
  if (rawSubj.includes('sans')) {
    const k = `${normClass}_sans${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  // 8. Computer / ICT
  if (rawSubj.includes('comp') || rawSubj.includes('ict')) {
    const k = `${normClass}_comp${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  // 9. GK / Moral Ed / Activity
  if (rawSubj.includes('gk')) {
    const k = `${normClass}_gk${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  if (rawSubj.includes('naitik')) {
    const k = `${normClass}_naitik${normClass}`;
    if (DAV_CHAPTERS_MAP[k]) return DAV_CHAPTERS_MAP[k];
  }

  if (rawSubj.includes('act')) {
    if (DAV_CHAPTERS_MAP[`${normClass}_ukg_act`]) return DAV_CHAPTERS_MAP[`${normClass}_ukg_act`];
    if (DAV_CHAPTERS_MAP[`${normClass}_lkg_act`]) return DAV_CHAPTERS_MAP[`${normClass}_lkg_act`];
  }

  // Final fallback: First available subject for this class
  const classPrefix = `${normClass}_`;
  for (const mapKey of Object.keys(DAV_CHAPTERS_MAP)) {
    if (mapKey.startsWith(classPrefix)) {
      return DAV_CHAPTERS_MAP[mapKey];
    }
  }

  return [
    { num: 1, title: 'Chapter 1: DAV Foundation & Overview' },
    { num: 2, title: 'Chapter 2: Core Academic Principles' },
    { num: 3, title: 'Chapter 3: Assessment and Model Solutions' }
  ];
}
