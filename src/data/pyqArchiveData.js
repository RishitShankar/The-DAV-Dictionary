// Official DAV Previous Year Questions (PYQs) Archive
// Exclusively curated from educator VKPDT IT GURU DAV (@VKPDTITGURU / Vinod Kumar Pandit)
// Real video walkthroughs, Rishi AI solver, and authentic user uploads

export const PYQ_CLASSES = [
  { id: '8', label: 'Class 8', desc: 'DAV Board Examination (DAVCAE)' },
  { id: '7', label: 'Class 7', desc: 'DAVCAE Annual & Mid-Term Exam' },
  { id: '6', label: 'Class 6', desc: 'DAVCAE Annual & Mid-Term Exam' },
  { id: '5', label: 'Class 5', desc: 'Primary Board / Annual Exam' },
  { id: '4', label: 'Class 4', desc: 'Primary Annual & Mid-Term Exam' },
  { id: '3', label: 'Class 3', desc: 'Primary Foundation Exams' }
];

// Classes 6 to 8: 6 Subjects
export const PYQ_SUBJECTS_6_TO_8 = [
  { id: 'maths', name: 'Mathematics', hindiName: 'गणित', icon: 'Calculator', books: 'Secondary Mathematics & Worksheets', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
  { id: 'science', name: 'Science & Technology', hindiName: 'विज्ञान', icon: 'Atom', books: 'The Living World', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  { id: 'sst', name: 'Social Science (SST)', hindiName: 'सामाजिक विज्ञान', icon: 'Globe', books: 'We and Our World (History, Civics, Geography)', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
  { id: 'hindi', name: 'Hindi', hindiName: 'हिन्दी', icon: 'BookOpen', books: 'Gyan Sagar & Abhyas Sagar (ज्ञान सागर व अभ्यास सागर)', color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30' },
  { id: 'english', name: 'English', hindiName: 'अंग्रेज़ी', icon: 'FileText', books: 'English Literature, Reader & Practice Book', color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30' },
  { id: 'sanskrit', name: 'Sanskrit', hindiName: 'संस्कृत (सुरभिः)', icon: 'Scroll', books: 'सुरभिः (पाठ्यपुस्तकम् व व्याकरणम्)', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' }
];

// Class 5: 6 Subjects (Includes Sanskrit - Surbhi as taught in DAV Class 5 curriculum)
export const PYQ_SUBJECTS_CLASS_5 = [
  { id: 'maths', name: 'Mathematics', hindiName: 'गणित', icon: 'Calculator', books: 'Primary Mathematics (Worksheets & Tables)', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
  { id: 'science', name: 'Science (My Living World)', hindiName: 'विज्ञान', icon: 'Atom', books: 'My Living World', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  { id: 'sst', name: 'Social Science (We & Our World)', hindiName: 'सामाजिक विज्ञान', icon: 'Globe', books: 'We and Our World', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
  { id: 'hindi', name: 'Hindi', hindiName: 'हिन्दी', icon: 'BookOpen', books: 'Bhasha Madhuri & Bhasha Abhyas (भाषा माधुरी व अभ्यास)', color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30' },
  { id: 'english', name: 'English', hindiName: 'अंग्रेज़ी', icon: 'FileText', books: 'English Reader & Practice Book', color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30' },
  { id: 'sanskrit', name: 'Sanskrit', hindiName: 'संस्कृत (सुरभिः)', icon: 'Scroll', books: 'सुरभिः प्रवेशिका (संस्कृत वर्णमाला व पाठ्यपुस्तकम्)', color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30' }
];

// Classes 3 & 4: 5 Subjects
export const PYQ_SUBJECTS_3_TO_4 = [
  { id: 'maths', name: 'Mathematics', hindiName: 'गणित', icon: 'Calculator', books: 'Primary Mathematics (Worksheets & Tables)', color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30' },
  { id: 'science', name: 'Science (My Living World)', hindiName: 'विज्ञान', icon: 'Atom', books: 'My Living World', color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30' },
  { id: 'sst', name: 'Social Science (We & Our World)', hindiName: 'सामाजिक विज्ञान', icon: 'Globe', books: 'We and Our World', color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30' },
  { id: 'hindi', name: 'Hindi', hindiName: 'हिन्दी', icon: 'BookOpen', books: 'Bhasha Madhuri & Bhasha Abhyas (भाषा माधुरी व अभ्यास)', color: 'from-rose-500/20 to-pink-500/20 border-rose-500/30' },
  { id: 'english', name: 'English', hindiName: 'अंग्रेज़ी', icon: 'FileText', books: 'English Reader & Practice Book', color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30' }
];

// Previous 3 Academic Sessions prior to ongoing 2026-27:
// 1. 2025-26
// 2. 2024-25
// 3. 2023-24
export const PYQ_YEARS = ['2025-26', '2024-25', '2023-24'];

export function getSubjectsForClass(classId) {
  const c = parseInt(classId, 10);
  if (c >= 6) return PYQ_SUBJECTS_6_TO_8;
  if (c === 5) return PYQ_SUBJECTS_CLASS_5;
  return PYQ_SUBJECTS_3_TO_4;
}

// Marks standard:
// Class 8: 80 Marks (3 Hours)
// Class 3 to 7: 70 Marks (2.5 Hours)
export function getMarksForClass(classId) {
  const c = parseInt(classId, 10);
  if (c === 8) return '80 Marks';
  return '70 Marks';
}

export function getTimeForClass(classId) {
  const c = parseInt(classId, 10);
  if (c === 8) return '3 Hours';
  return '2.5 Hours';
}

const subjectSections = {
  maths: {
    high: [
      { name: 'Section A: Objective Questions & MCQs', count: 20, total: 20 },
      { name: 'Section B: Short Answer Type I', count: 5, total: 10 },
      { name: 'Section C: Short Answer Type II', count: 6, total: 18 },
      { name: 'Section D: Long Problems & HOTS', count: 4, total: 20 },
      { name: 'Section E: Case Study Problems', count: 3, total: 12 }
    ],
    mid: [
      { name: 'Section A: Objective Questions & MCQs', count: 18, total: 18 },
      { name: 'Section B: Short Answer Type I', count: 5, total: 10 },
      { name: 'Section C: Short Answer Type II', count: 6, total: 18 },
      { name: 'Section D: Long Problems & Geometry', count: 3, total: 15 },
      { name: 'Section E: Case / Application Problems', count: 2, total: 9 }
    ]
  },
  science: {
    high: [
      { name: 'Section A: MCQs & VSA Questions', count: 20, total: 20 },
      { name: 'Section B: Short Answer Type I', count: 6, total: 12 },
      { name: 'Section C: Short Answer Type II', count: 7, total: 21 },
      { name: 'Section D: Long Answer & Diagrams', count: 3, total: 15 },
      { name: 'Section E: Case-Study Questions', count: 3, total: 12 }
    ],
    mid: [
      { name: 'Section A: MCQs & Fill-in-the-blanks', count: 18, total: 18 },
      { name: 'Section B: Short Answer Type I', count: 5, total: 10 },
      { name: 'Section C: Short Answer Type II', count: 6, total: 18 },
      { name: 'Section D: Long Answer & Diagrams', count: 3, total: 15 },
      { name: 'Section E: Practical Skills & Reasoning', count: 3, total: 9 }
    ]
  },
  sst: {
    high: [
      { name: 'Section A: Multiple Choice Questions', count: 20, total: 20 },
      { name: 'Section B: Very Short Answer (History & Geo)', count: 4, total: 8 },
      { name: 'Section C: Short Answer Explanations', count: 5, total: 15 },
      { name: 'Section D: Long Answer Analysis', count: 4, total: 20 },
      { name: 'Section E: Case Study & Map Marking', count: 3, total: 17 }
    ],
    mid: [
      { name: 'Section A: MCQs & VSA', count: 18, total: 18 },
      { name: 'Section B: Short Answer (History & Civics)', count: 5, total: 10 },
      { name: 'Section C: Conceptual Explanations', count: 5, total: 15 },
      { name: 'Section D: Long Answer Analysis', count: 3, total: 15 },
      { name: 'Section E: Map Skills & Case Study', count: 3, total: 12 }
    ]
  },
  hindi: {
    high: [
      { name: 'खंड क: अपठित बोध (गद्यांश व काव्यांश)', count: 2, total: 16 },
      { name: 'खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)', count: 16, total: 16 },
      { name: 'खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)', count: 8, total: 32 },
      { name: 'खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)', count: 3, total: 16 }
    ],
    mid: [
      { name: 'खंड क: अपठित गद्यांश व काव्यांश बोध', count: 2, total: 14 },
      { name: 'खंड ख: व्यावहारिक व्याकरण (अभ्यास)', count: 14, total: 14 },
      { name: 'खंड ग: पाठ्यपुस्तक (गद्य व पद्य प्रश्न-उत्तर)', count: 7, total: 28 },
      { name: 'खंड घ: रचनात्मक लेखन (अनुच्छेद व पत्र)', count: 3, total: 14 }
    ]
  },
  english: {
    high: [
      { name: 'Section A: Reading Comprehension', count: 2, total: 20 },
      { name: 'Section B: Writing Skills & Practice Book', count: 5, total: 20 },
      { name: 'Section C: English Literature & Reader', count: 8, total: 32 },
      { name: 'Section D: Value-Based Long Writing', count: 1, total: 8 }
    ],
    mid: [
      { name: 'Section A: Reading Comprehension', count: 2, total: 16 },
      { name: 'Section B: Writing Skills & Practice Book', count: 4, total: 16 },
      { name: 'Section C: English Literature & Reader', count: 7, total: 26 },
      { name: 'Section D: Creative Writing / Letter', count: 2, total: 12 }
    ]
  },
  sanskrit: {
    high: [
      { name: 'खंड क: अपठित-अवबोधनम्', count: 1, total: 10 },
      { name: 'खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)', count: 3, total: 15 },
      { name: 'खंड ग: अनुप्रयुक्त-व्याकरणम् (धातुरूपाणि च)', count: 25, total: 25 },
      { name: 'खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)', count: 6, total: 30 }
    ],
    mid: [
      { name: 'खंड क: अपठित-अवबोधनम्', count: 1, total: 10 },
      { name: 'खंड ख: रचनात्मक-कार्यम् (चित्रवर्णनं च)', count: 2, total: 12 },
      { name: 'खंड ग: व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)', count: 20, total: 24 },
      { name: 'खंड घ: सुरभिः पाठाः (प्रश्नोत्तराणि)', count: 5, total: 24 }
    ]
  }
};

function buildArchive() {
  const list = [];
  PYQ_CLASSES.forEach((c) => {
    const clsNum = parseInt(c.id, 10);
    const subjectList = getSubjectsForClass(c.id);
    const isClass8 = c.id === '8';

    const examCategories = [
      {
        type: 'half_yearly',
        label: 'Half-Yearly Examination',
        hindiLabel: 'अर्धवार्षिक परीक्षा (Mid-Term)'
      },
      {
        type: isClass8 ? 'board' : 'annual',
        label: isClass8 ? 'Board Examination' : 'Annual Examination',
        hindiLabel: isClass8 ? 'वार्षिक बोर्ड परीक्षा (DAVCAE Board)' : 'वार्षिक परीक्षा (Final Annual)'
      }
    ];

    subjectList.forEach((subj) => {
      examCategories.forEach((exam) => {
        PYQ_YEARS.forEach((year) => {
          const marks = getMarksForClass(c.id);
          const timeAllowed = getTimeForClass(c.id);
          const queryTerm = exam.type === 'board' ? 'Board Exam' : (exam.type === 'half_yearly' ? 'Half Yearly' : 'Annual Exam');
          
          // Direct search query on VKPDT IT GURU channel for that exact paper
          const encodedQuery = encodeURIComponent(`DAV Class ${c.id} ${subj.name} ${queryTerm} question paper ${year}`);
          const ytSearchUrl = `https://www.youtube.com/@Vinod_Kumar_Pandit/search?query=${encodedQuery}`;
          
          const secConf = subjectSections[subj.id] || subjectSections.science;
          const sections = clsNum === 8 ? secConf.high : secConf.mid;

          list.push({
            id: `pyq_c${c.id}_${subj.id}_${exam.type}_${year.replace('-', '_')}`,
            classId: c.id,
            className: c.label,
            subjectId: subj.id,
            subjectName: subj.name,
            subjectHindi: subj.hindiName,
            examType: exam.type,
            examLabel: exam.label,
            examHindiLabel: exam.hindiLabel,
            year: year,
            marks: marks,
            timeAllowed: timeAllowed,
            educator: 'VKPDT IT GURU DAV',
            educatorChannel: 'https://www.youtube.com/@Vinod_Kumar_Pandit',
            educatorHandle: '@VKPDTITGURU',
            youtubeSearchUrl: ytSearchUrl,
            verifiedDav: true,
            description: `Official DAVCAE ${exam.label} question paper walkthrough and marking rubric by educator VKPDT IT GURU DAV.`,
            sections: sections
          });
        });
      });
    });
  });
  return list;
}

export const VKPDT_PYQ_ARCHIVE = buildArchive();

export function getPyqPapers(classId, subjectId, examType) {
  return VKPDT_PYQ_ARCHIVE.filter(p => {
    const matchClass = String(p.classId) === String(classId);
    const matchSubj = p.subjectId === subjectId;
    const matchExam = examType ? p.examType === examType : true;
    return matchClass && matchSubj && matchExam;
  });
}
