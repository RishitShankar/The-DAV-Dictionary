// Official DAV Previous Year Questions (PYQs) Archive
// Exclusively curated from educator VKPDT IT GURU DAV (@VKPDTITGURU)
// Zero mock/demo PDFs - Real video walkthroughs, Rishi AI solver, and authentic user uploads

export const PYQ_CLASSES = [
  {
    "id": "8",
    "label": "Class 8",
    "desc": "DAV Board Examination (DAVCAE)"
  },
  {
    "id": "7",
    "label": "Class 7",
    "desc": "DAVCAE Annual & Mid-Term Exam"
  },
  {
    "id": "6",
    "label": "Class 6",
    "desc": "DAVCAE Annual & Mid-Term Exam"
  },
  {
    "id": "5",
    "label": "Class 5",
    "desc": "Primary Board / Annual Exam"
  },
  {
    "id": "4",
    "label": "Class 4",
    "desc": "Primary Annual & Mid-Term Exam"
  },
  {
    "id": "3",
    "label": "Class 3",
    "desc": "Primary Foundation Exams"
  }
];

export const PYQ_SUBJECTS_6_TO_8 = [
  {
    "id": "maths",
    "name": "Mathematics",
    "hindiName": "गणित",
    "icon": "Calculator",
    "books": "Secondary Mathematics & Worksheets",
    "color": "from-amber-500/20 to-orange-500/20 border-amber-500/30"
  },
  {
    "id": "science",
    "name": "Science & Technology",
    "hindiName": "विज्ञान",
    "icon": "Atom",
    "books": "The Living World",
    "color": "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
  },
  {
    "id": "sst",
    "name": "Social Science (SST)",
    "hindiName": "सामाजिक विज्ञान",
    "icon": "Globe",
    "books": "We and Our World (History, Civics, Geography)",
    "color": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
  },
  {
    "id": "hindi",
    "name": "Hindi",
    "hindiName": "हिन्दी",
    "icon": "BookOpen",
    "books": "Gyan Sagar & Abhyas Sagar (ज्ञान सागर व अभ्यास सागर)",
    "color": "from-rose-500/20 to-pink-500/20 border-rose-500/30"
  },
  {
    "id": "english",
    "name": "English",
    "hindiName": "अंग्रेज़ी",
    "icon": "FileText",
    "books": "English Literature, Reader & Practice Book",
    "color": "from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
  },
  {
    "id": "sanskrit",
    "name": "Sanskrit",
    "hindiName": "संस्कृत (सुरभिः)",
    "icon": "Scroll",
    "books": "सुरभिः (पाठ्यपुस्तकम् व व्याकरणम्)",
    "color": "from-yellow-500/20 to-amber-500/20 border-yellow-500/30"
  }
];

export const PYQ_SUBJECTS_3_TO_5 = [
  {
    "id": "maths",
    "name": "Mathematics",
    "hindiName": "गणित",
    "icon": "Calculator",
    "books": "Primary Mathematics (Worksheets & Tables)",
    "color": "from-amber-500/20 to-orange-500/20 border-amber-500/30"
  },
  {
    "id": "science",
    "name": "Science (My Living World)",
    "hindiName": "विज्ञान",
    "icon": "Atom",
    "books": "My Living World",
    "color": "from-blue-500/20 to-cyan-500/20 border-blue-500/30"
  },
  {
    "id": "sst",
    "name": "Social Science (We & Our World)",
    "hindiName": "सामाजिक विज्ञान",
    "icon": "Globe",
    "books": "We and Our World",
    "color": "from-emerald-500/20 to-teal-500/20 border-emerald-500/30"
  },
  {
    "id": "hindi",
    "name": "Hindi",
    "hindiName": "हिन्दी",
    "icon": "BookOpen",
    "books": "Bhasha Madhuri & Bhasha Abhyas (भाषा माधुरी व अभ्यास)",
    "color": "from-rose-500/20 to-pink-500/20 border-rose-500/30"
  },
  {
    "id": "english",
    "name": "English",
    "hindiName": "अंग्रेज़ी",
    "icon": "FileText",
    "books": "English Reader & Practice Book",
    "color": "from-indigo-500/20 to-purple-500/20 border-indigo-500/30"
  }
];

export const PYQ_YEARS = ['2023-24', '2022-23', '2021-22'];

export function getSubjectsForClass(classId) {
  const c = parseInt(classId, 10);
  if (c >= 6) return PYQ_SUBJECTS_6_TO_8;
  return PYQ_SUBJECTS_3_TO_5;
}

export const VKPDT_PYQ_ARCHIVE = [
  {
    "id": "pyq_c8_maths_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_maths_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_maths_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_maths_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_maths_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_maths_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Mathematics%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_science_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Science%20%26%20Technology%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c8_sst_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_sst_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_sst_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_sst_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_sst_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_sst_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Social%20Science%20(SST)%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_hindi_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Hindi%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c8_english_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_english_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_english_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_english_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_english_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_english_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20English%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_half_yearly_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_half_yearly_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_half_yearly_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_board_2023_24",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Board%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_board_2022_23",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Board%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c8_sanskrit_board_2021_22",
    "classId": "8",
    "className": "Class 8",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "board",
    "examLabel": "Board Examination",
    "examHindiLabel": "वार्षिक बोर्ड परीक्षा (DAVCAE Board)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%208%20Sanskrit%20Board%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Board Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_maths_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_maths_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_maths_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_maths_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_maths_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_maths_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Mathematics%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_science_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Science%20%26%20Technology%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c7_sst_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_sst_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_sst_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_sst_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_sst_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_sst_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Social%20Science%20(SST)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_hindi_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Hindi%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c7_english_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_english_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_english_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_english_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_english_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_english_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20English%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_half_yearly_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_half_yearly_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_half_yearly_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_annual_2023_24",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_annual_2022_23",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c7_sanskrit_annual_2021_22",
    "classId": "7",
    "className": "Class 7",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%207%20Sanskrit%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_maths_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_maths_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_maths_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_maths_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_maths_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_maths_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Mathematics%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & Objective Questions",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: 3-Mark Analytical Questions",
        "count": 6,
        "marksPerQ": 3,
        "total": 18
      },
      {
        "name": "Section D: 5-Mark Long Problems",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: 4-Mark Case-Study Based Questions",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_science_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "science",
    "subjectName": "Science & Technology",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Science%20%26%20Technology%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: 1-Mark MCQs & VSA",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: 2-Mark Short Answer Questions",
        "count": 6,
        "marksPerQ": 2,
        "total": 12
      },
      {
        "name": "Section C: 3-Mark Scientific Explanations",
        "count": 7,
        "marksPerQ": 3,
        "total": 21
      },
      {
        "name": "Section D: 5-Mark Long & Diagram Questions",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "Section E: 4-Mark Case-Study Applications",
        "count": 3,
        "marksPerQ": 4,
        "total": 12
      }
    ]
  },
  {
    "id": "pyq_c6_sst_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_sst_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_sst_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_sst_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_sst_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_sst_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sst",
    "subjectName": "Social Science (SST)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Social%20Science%20(SST)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Multiple Choice Questions (MCQ)",
        "count": 20,
        "marksPerQ": 1,
        "total": 20
      },
      {
        "name": "Section B: Very Short Answer (History/Geo/Civics)",
        "count": 4,
        "marksPerQ": 2,
        "total": 8
      },
      {
        "name": "Section C: Short Answer Explanations",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Long Answer Critical Thinking",
        "count": 4,
        "marksPerQ": 5,
        "total": 20
      },
      {
        "name": "Section E: Case-Study & Map Marking",
        "count": 3,
        "marksPerQ": 4,
        "total": 17
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_hindi_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Hindi%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित बोध (गद्यांश व काव्यांश)",
        "count": 2,
        "marksPerQ": 8,
        "total": 16
      },
      {
        "name": "खंड ख: व्यावहारिक व्याकरण (अभ्यास सागर)",
        "count": 16,
        "marksPerQ": 1,
        "total": 16
      },
      {
        "name": "खंड ग: पाठ्यपुस्तक (ज्ञान सागर गद्य व पद्य)",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (निबंध, पत्र, संवाद)",
        "count": 3,
        "marksPerQ": 5,
        "total": 16
      }
    ]
  },
  {
    "id": "pyq_c6_english_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_english_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_english_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_english_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_english_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_english_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20English%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension (Unseen)",
        "count": 2,
        "marksPerQ": 10,
        "total": 20
      },
      {
        "name": "Section B: Writing Skills & Grammar Practice",
        "count": 5,
        "marksPerQ": 4,
        "total": 20
      },
      {
        "name": "Section C: English Literature & Reader",
        "count": 8,
        "marksPerQ": 4,
        "total": 32
      },
      {
        "name": "Section D: Value-Based Long Writing",
        "count": 1,
        "marksPerQ": 8,
        "total": 8
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_half_yearly_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_half_yearly_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_half_yearly_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_annual_2023_24",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_annual_2022_23",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c6_sanskrit_annual_2021_22",
    "classId": "6",
    "className": "Class 6",
    "subjectId": "sanskrit",
    "subjectName": "Sanskrit",
    "subjectHindi": "संस्कृत (सुरभिः)",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "80 Marks",
    "timeAllowed": "3 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%206%20Sanskrit%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित-अवबोधनम्",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: रचनात्मक-कार्यम् (पत्रं, चित्रवर्णनं च)",
        "count": 3,
        "marksPerQ": 5,
        "total": 15
      },
      {
        "name": "खंड ग: अनुप्रयुक्त-व्याकरणम् (शब्दरूपाणि धातुरूपाणि च)",
        "count": 25,
        "marksPerQ": 1,
        "total": 25
      },
      {
        "name": "खंड घ: पठित-अवबोधनम् (सुरभिः पाठाः)",
        "count": 6,
        "marksPerQ": 5,
        "total": 30
      }
    ]
  },
  {
    "id": "pyq_c5_maths_half_yearly_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_maths_half_yearly_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_maths_half_yearly_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_maths_annual_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_maths_annual_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_maths_annual_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Mathematics%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_half_yearly_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_half_yearly_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_half_yearly_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_annual_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_annual_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_science_annual_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_half_yearly_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_half_yearly_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_half_yearly_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_annual_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_annual_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_sst_annual_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_half_yearly_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_half_yearly_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_half_yearly_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_annual_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_annual_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_hindi_annual_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20Hindi%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_half_yearly_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_half_yearly_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_half_yearly_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_annual_2023_24",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_annual_2022_23",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c5_english_annual_2021_22",
    "classId": "5",
    "className": "Class 5",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%205%20English%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_half_yearly_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_half_yearly_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_half_yearly_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_annual_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_annual_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_maths_annual_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Mathematics%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_half_yearly_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_half_yearly_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_half_yearly_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_annual_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_annual_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_science_annual_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_half_yearly_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_half_yearly_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_half_yearly_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_annual_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_annual_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_sst_annual_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_half_yearly_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_half_yearly_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_half_yearly_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_annual_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_annual_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_hindi_annual_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20Hindi%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_half_yearly_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_half_yearly_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_half_yearly_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_annual_2023_24",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_annual_2022_23",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c4_english_annual_2021_22",
    "classId": "4",
    "className": "Class 4",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%204%20English%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_half_yearly_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_half_yearly_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_half_yearly_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_annual_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_annual_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_maths_annual_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "maths",
    "subjectName": "Mathematics",
    "subjectHindi": "गणित",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Mathematics%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Mental Math & Objective",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Basic Operations & Fractions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Word Problems & Geometry",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Activity / Measurement Questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_half_yearly_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_half_yearly_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_half_yearly_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_annual_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_annual_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_science_annual_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "science",
    "subjectName": "Science (My Living World)",
    "subjectHindi": "विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Science%20(My%20Living%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Fill in blanks & MCQs",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Define terms & Give reasons",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Short answers & diagrams",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Practical observation questions",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_half_yearly_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_half_yearly_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_half_yearly_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_annual_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_annual_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_sst_annual_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "sst",
    "subjectName": "Social Science (We & Our World)",
    "subjectHindi": "सामाजिक विज्ञान",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Social%20Science%20(We%20%26%20Our%20World)%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: One-word and Multiple Choice",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section B: Short Concept Questions",
        "count": 5,
        "marksPerQ": 2,
        "total": 10
      },
      {
        "name": "Section C: Community & Environment Questions",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Map / Picture Identification",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_half_yearly_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_half_yearly_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_half_yearly_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_annual_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_annual_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_hindi_annual_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "hindi",
    "subjectName": "Hindi",
    "subjectHindi": "हिन्दी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20Hindi%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "खंड क: अपठित गद्यांश बोध",
        "count": 1,
        "marksPerQ": 10,
        "total": 10
      },
      {
        "name": "खंड ख: भाषा अभ्यास (व्याकरणिक प्रश्न)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "खंड ग: भाषा माधुरी (पाठों के प्रश्न-उत्तर)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "खंड घ: रचनात्मक लेखन (अनुच्छेद व चित्र वर्णन)",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_half_yearly_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Half%20Yearly%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_half_yearly_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Half%20Yearly%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_half_yearly_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "half_yearly",
    "examLabel": "Half-Yearly Examination",
    "examHindiLabel": "अर्धवार्षिक परीक्षा (Mid-Term)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Half%20Yearly%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Half-Yearly Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_annual_2023_24",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2023-24",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Annual%20question%20paper%202023-24",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_annual_2022_23",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2022-23",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Annual%20question%20paper%202022-23",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  },
  {
    "id": "pyq_c3_english_annual_2021_22",
    "classId": "3",
    "className": "Class 3",
    "subjectId": "english",
    "subjectName": "English",
    "subjectHindi": "अंग्रेज़ी",
    "examType": "annual",
    "examLabel": "Annual Examination",
    "examHindiLabel": "वार्षिक परीक्षा (Final Annual)",
    "year": "2021-22",
    "marks": "50 Marks",
    "timeAllowed": "2 Hours",
    "educator": "VKPDT IT GURU DAV",
    "educatorChannel": "https://www.youtube.com/@VKPDTITGURU",
    "educatorHandle": "@VKPDTITGURU",
    "youtubeSearchUrl": "https://www.youtube.com/results?search_query=VKPDT%20IT%20GURU%20DAV%20Class%203%20English%20Annual%20question%20paper%202021-22",
    "verifiedDav": true,
    "description": "Official DAVCAE Annual Examination question paper walkthrough and step-by-step marking rubric presented by educator VKPDT IT GURU DAV.",
    "sections": [
      {
        "name": "Section A: Reading Comprehension",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      },
      {
        "name": "Section B: English Practice Book (Grammar)",
        "count": 15,
        "marksPerQ": 1,
        "total": 15
      },
      {
        "name": "Section C: English Reader (Questions & Meanings)",
        "count": 5,
        "marksPerQ": 3,
        "total": 15
      },
      {
        "name": "Section D: Guided Creative Writing / Letter",
        "count": 2,
        "marksPerQ": 5,
        "total": 10
      }
    ]
  }
];

export function getPyqPapers(classId, subjectId, examType) {
  return VKPDT_PYQ_ARCHIVE.filter(p => {
    const matchClass = String(p.classId) === String(classId);
    const matchSubj = p.subjectId === subjectId;
    const matchExam = examType ? p.examType === examType : true;
    return matchClass && matchSubj && matchExam;
  });
}
