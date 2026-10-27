// Official DAV Previous Year Questions (PYQs) Archive
// Exclusively curated from educator VKPDT IT GURU DAV (@VKPDTITGURU / Vinod Kumar Pandit)
// Direct Video Playback, In-Portal Video Player, Rishi AI Solver, and Authentic User Uploads

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

// Previous 3 Academic Sessions:
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

// Curated Video IDs uploaded by VKPDT IT GURU for DAV Question Papers
// Mapped by Class, Subject, and Exam Type (with year variations)
const VKPDT_VIDEO_MAP = {
  // =========================================================
  // CLASS 8 (DAV Board & Half-Yearly Examinations - 80 Marks)
  // Educator: VKPDT IT GURU DAV (@VKPDTITGURU / Vinod Kumar Pandit)
  // =========================================================
  // Mathematics
  '8_maths_half_yearly': '_Rct3P_JnUA', // DAV CLASS 8 MATHS HALF YEARLY QUESTION PAPER
  '8_maths_half_yearly_2025-26': '_Rct3P_JnUA',
  '8_maths_half_yearly_2024-25': '_Rct3P_JnUA',
  '8_maths_half_yearly_2023-24': '_Rct3P_JnUA',
  '8_maths_board': 'M0M-R28mn9g', // DAV CLASS 8 MATHEMATICS QUESTION PAPER | ANNUAL QUESTION PAPER 2024-25
  '8_maths_board_2025-26': 'M0M-R28mn9g',
  '8_maths_board_2024-25': 'OFmFaxKAFGk', // DAV 8 BOARD MATHS IMPORTANT QUESTIONS With Solution
  '8_maths_board_2023-24': '3BNTcKv9Yng', // DAV CLASS 8 PREVIOUS YEAR QUESTION PAPER PRE-BOARD

  // Science & Technology
  '8_science_half_yearly': 'gpbPCF4jZjg', // DAV CLASS 8 SCIENCE HALF YEARLY QUESTION PAPER
  '8_science_half_yearly_2025-26': 'gpbPCF4jZjg',
  '8_science_half_yearly_2024-25': 'gpbPCF4jZjg',
  '8_science_half_yearly_2023-24': 'gpbPCF4jZjg',
  '8_science_board': '4brB17L1zfM', // DAV CLASS 8 SCIENCE PREVIOUS YEAR QUESTION PAPER | ANNUAL QUESTION 2025-26
  '8_science_board_2025-26': '4brB17L1zfM',
  '8_science_board_2024-25': '4brB17L1zfM',
  '8_science_board_2023-24': '4brB17L1zfM',

  // Social Science (SST)
  '8_sst_half_yearly': 'TCGnGPybXvg', // DAV CLASS 8 S.SC HALF YEARLY QUESTION PAPER
  '8_sst_half_yearly_2025-26': 'TCGnGPybXvg',
  '8_sst_half_yearly_2024-25': 'TCGnGPybXvg',
  '8_sst_half_yearly_2023-24': 'TCGnGPybXvg',
  '8_sst_board': '9uhsc1jBiqM', // DAV CLASS 8 SOCIAL SCIENCE QUESTION PAPER | ANNUAL QUESTION 2025-26
  '8_sst_board_2025-26': '9uhsc1jBiqM',
  '8_sst_board_2024-25': 'fhMhhQzIMqM', // DAV Board Class 8 Social Science Answer Key 2026
  '8_sst_board_2023-24': '9uhsc1jBiqM',

  // Hindi (Gyan Sagar & Abhyas Sagar)
  '8_hindi_half_yearly': 'twV4hPnW5kc', // DAV CLASS 8 HINDI HALF YEARLY QUESTION PAPER
  '8_hindi_half_yearly_2025-26': 'twV4hPnW5kc',
  '8_hindi_half_yearly_2024-25': 'twV4hPnW5kc',
  '8_hindi_half_yearly_2023-24': 'twV4hPnW5kc',
  '8_hindi_board': 'IIC67yYB9Zc', // DAV CLASS 8 HINDI PREVIOUS YEAR QUESTION PAPER | ANNUAL QUESTION 2025-26
  '8_hindi_board_2025-26': 'IIC67yYB9Zc',
  '8_hindi_board_2024-25': 'IIC67yYB9Zc',
  '8_hindi_board_2023-24': 'IIC67yYB9Zc',

  // English (Literature, Reader & Practice Book)
  '8_english_half_yearly': 'vCy_p9R4pb0', // DAV CLASS 8 ENGLISH HALF YEARLY QUESTION PAPER
  '8_english_half_yearly_2025-26': 'vCy_p9R4pb0',
  '8_english_half_yearly_2024-25': 'vCy_p9R4pb0',
  '8_english_half_yearly_2023-24': 'vCy_p9R4pb0',
  '8_english_board': 'e43PUc5YV2s', // DAV CLASS 8 ENGLISH PREVIOUS YEAR QUESTION PAPER | ANNUAL QUESTION 2025-26
  '8_english_board_2025-26': 'e43PUc5YV2s',
  '8_english_board_2024-25': 'e43PUc5YV2s',
  '8_english_board_2023-24': 'e43PUc5YV2s',

  // Sanskrit (सुरभिः)
  '8_sanskrit_half_yearly': 'ZMK7osctEbY', // DAV CLASS 8 SANSKRIT HALF YEARLY QUESTION PAPER
  '8_sanskrit_half_yearly_2025-26': 'ZMK7osctEbY',
  '8_sanskrit_half_yearly_2024-25': 'ZMK7osctEbY',
  '8_sanskrit_half_yearly_2023-24': 'ZMK7osctEbY',
  '8_sanskrit_board': 'Fc-X94ulcJs', // DAV CLASS 8 SANSKRIT PREVIOUS YEAR QUESTION PAPER | ANNUAL QUESTION 2025-26
  '8_sanskrit_board_2025-26': 'Fc-X94ulcJs',
  '8_sanskrit_board_2024-25': 'Fc-X94ulcJs',
  '8_sanskrit_board_2023-24': 'Fc-X94ulcJs',

  // =========================================================
  // CLASS 7 (DAV Annual & Mid-Term - 70 Marks)
  // =========================================================
  '7_maths_half_yearly': '3WbOIyP9uEI', // DAV CLASS 7 MATHS HALF YEARLY QUESTION PAPER
  '7_maths_half_yearly_2025-26': '3WbOIyP9uEI',
  '7_maths_half_yearly_2024-25': '0kH6mfga-eE',
  '7_maths_half_yearly_2023-24': 'zTmXfePrgOA',
  '7_maths_annual': 'vTAL70OXfYk', // DAV CLASS 7 MATHS PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '7_maths_annual_2025-26': 'vTAL70OXfYk',
  '7_maths_annual_2024-25': '9yWQkHNqa8Q',
  '7_maths_annual_2023-24': 'vTAL70OXfYk',

  '7_science_half_yearly': 'q4ZeK2wSjPY', // DAV CLASS 7 SCIENCE HALF YEARLY QUESTION PAPER
  '7_science_half_yearly_2025-26': 'q4ZeK2wSjPY',
  '7_science_half_yearly_2024-25': 'q4ZeK2wSjPY',
  '7_science_half_yearly_2023-24': 'q4ZeK2wSjPY',
  '7_science_annual': 's1JZi2RbT10', // DAV CLASS 7 SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '7_science_annual_2025-26': 's1JZi2RbT10',
  '7_science_annual_2024-25': 's1JZi2RbT10',
  '7_science_annual_2023-24': 's1JZi2RbT10',

  '7_sst_half_yearly': 'RqtfM0EGEQE', // DAV CLASS 7 S.SC HALF YEARLY QUESTION PAPER
  '7_sst_half_yearly_2025-26': 'RqtfM0EGEQE',
  '7_sst_half_yearly_2024-25': 'RqtfM0EGEQE',
  '7_sst_half_yearly_2023-24': 'RqtfM0EGEQE',
  '7_sst_annual': 'AxWpao_iDFM', // DAV CLASS 7 SOCIAL SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '7_sst_annual_2025-26': 'AxWpao_iDFM',
  '7_sst_annual_2024-25': 'AxWpao_iDFM',
  '7_sst_annual_2023-24': 'AujeC_dJsvk', // DAV CLASS 7 SOCIAL SCIENCE ANNUAL QUESTION PAPER 2023-24

  '7_hindi_half_yearly': 'YST7t8wqWDQ', // DAV CLASS 7 HINDI HALF YEARLY QUESTION PAPER
  '7_hindi_half_yearly_2025-26': 'YST7t8wqWDQ',
  '7_hindi_half_yearly_2024-25': 'YST7t8wqWDQ',
  '7_hindi_half_yearly_2023-24': 'YST7t8wqWDQ',
  '7_hindi_annual': 'rsB4xeyiW1Q', // DAV CLASS 7 HINDI ANNUAL
  '7_hindi_annual_2025-26': 'rsB4xeyiW1Q',
  '7_hindi_annual_2024-25': 'rsB4xeyiW1Q',
  '7_hindi_annual_2023-24': 'rsB4xeyiW1Q',

  '7_english_half_yearly': 'nRXL_eEbbdM', // DAV CLASS 7 ENGLISH HALF YEARLY QUESTION PAPER
  '7_english_half_yearly_2025-26': 'nRXL_eEbbdM',
  '7_english_half_yearly_2024-25': 'nRXL_eEbbdM',
  '7_english_half_yearly_2023-24': 'nRXL_eEbbdM',
  '7_english_annual': 'xgxp9mA5dJI', // DAV CLASS 7 ENGLISH PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '7_english_annual_2025-26': 'xgxp9mA5dJI',
  '7_english_annual_2024-25': 'xgxp9mA5dJI',
  '7_english_annual_2023-24': 'xgxp9mA5dJI',

  '7_sanskrit_half_yearly': 'g3eE_k61OcY', // DAV CLASS 7 SANSKRIT HALF YEARLY QUESTION PAPER
  '7_sanskrit_half_yearly_2025-26': 'g3eE_k61OcY',
  '7_sanskrit_half_yearly_2024-25': 'g3eE_k61OcY',
  '7_sanskrit_half_yearly_2023-24': 'g3eE_k61OcY',
  '7_sanskrit_annual': 'PCQ9xLmzSlU', // DAV CLASS 7 SANSKRIT PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '7_sanskrit_annual_2025-26': 'PCQ9xLmzSlU',
  '7_sanskrit_annual_2024-25': 'PCQ9xLmzSlU',
  '7_sanskrit_annual_2023-24': 'PCQ9xLmzSlU',

  // =========================================================
  // CLASS 6 (DAV Annual & Mid-Term - 70 Marks)
  // =========================================================
  '6_maths_half_yearly': '0d5gEPVuiO4', // DAV CLASS 6 MATHS HALF YEARLY QUESTION PAPER
  '6_maths_half_yearly_2025-26': '0d5gEPVuiO4',
  '6_maths_half_yearly_2024-25': '0d5gEPVuiO4',
  '6_maths_half_yearly_2023-24': '0d5gEPVuiO4',
  '6_maths_annual': 'SD4XoC6UzAk', // DAV CLASS 6 MATHS PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '6_maths_annual_2025-26': 'SD4XoC6UzAk',
  '6_maths_annual_2024-25': 'ozKC1rgXd4M',
  '6_maths_annual_2023-24': 'SD4XoC6UzAk',

  '6_science_half_yearly': '5w3DjFQKlTc', // DAV CLASS 6 SCIENCE HALF YEARLY QUESTION PAPER
  '6_science_half_yearly_2025-26': '5w3DjFQKlTc',
  '6_science_half_yearly_2024-25': '5w3DjFQKlTc',
  '6_science_half_yearly_2023-24': '5w3DjFQKlTc',
  '6_science_annual': '7MR0i-45NYM', // DAV CLASS 6 SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2023-24
  '6_science_annual_2025-26': '7MR0i-45NYM',
  '6_science_annual_2024-25': '7MR0i-45NYM',
  '6_science_annual_2023-24': '7MR0i-45NYM',

  '6_sst_half_yearly': 'bx8MpXt0EwA', // DAV CLASS 6 S.SC HALF YEARLY QUESTION PAPER
  '6_sst_half_yearly_2025-26': 'bx8MpXt0EwA',
  '6_sst_half_yearly_2024-25': 'bx8MpXt0EwA',
  '6_sst_half_yearly_2023-24': 'bx8MpXt0EwA',
  '6_sst_annual': '-OijHetVIcc', // DAV CLASS 6 S.SC PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '6_sst_annual_2025-26': '-OijHetVIcc',
  '6_sst_annual_2024-25': '-OijHetVIcc',
  '6_sst_annual_2023-24': '-OijHetVIcc',

  '6_hindi_half_yearly': 'h5Q8yPI-_pY', // DAV CLASS 6 HINDI HALF YEARLY QUESTION PAPER
  '6_hindi_half_yearly_2025-26': 'h5Q8yPI-_pY',
  '6_hindi_half_yearly_2024-25': 'h5Q8yPI-_pY',
  '6_hindi_half_yearly_2023-24': 'h5Q8yPI-_pY',
  '6_hindi_annual': 'rsB4xeyiW1Q', // DAV CLASS 6 HINDI PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '6_hindi_annual_2025-26': 'rsB4xeyiW1Q',
  '6_hindi_annual_2024-25': 'rsB4xeyiW1Q',
  '6_hindi_annual_2023-24': 'rsB4xeyiW1Q',

  '6_english_half_yearly': 'DWJe6h_5sIo', // DAV CLASS 6 ENGLISH HALF YEARLY QUESTION PAPER
  '6_english_half_yearly_2025-26': 'DWJe6h_5sIo',
  '6_english_half_yearly_2024-25': 'DWJe6h_5sIo',
  '6_english_half_yearly_2023-24': 'DWJe6h_5sIo',
  '6_english_annual': 'hX13DGisoCg', // DAV CLASS 6 ENGLISH PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '6_english_annual_2025-26': 'hX13DGisoCg',
  '6_english_annual_2024-25': 'oVO589rTw08',
  '6_english_annual_2023-24': 'hX13DGisoCg',

  '6_sanskrit_half_yearly': 'I7BkWuAhRdg', // DAV CLASS 6 SANSKRIT HALF YEARLY QUESTION PAPER
  '6_sanskrit_half_yearly_2025-26': 'I7BkWuAhRdg',
  '6_sanskrit_half_yearly_2024-25': 'p1_xCEDj4Mo',
  '6_sanskrit_half_yearly_2023-24': 'I7BkWuAhRdg',
  '6_sanskrit_annual': '8HyOIFPxR4M', // DAV CLASS 6 SANSKRIT PREVIOUS YEAR ANNUAL QUESTION PAPER 2023-24
  '6_sanskrit_annual_2025-26': 'ReNQG0vLgEk',
  '6_sanskrit_annual_2024-25': 'ReNQG0vLgEk',
  '6_sanskrit_annual_2023-24': '8HyOIFPxR4M',

  // =========================================================
  // CLASS 5 (6 Subjects Including Sanskrit - 70 Marks)
  // =========================================================
  '5_maths_half_yearly': 'gBqx0r81gbo', // DAV CLASS 5 MATHS HALF YEARLY QUESTION PAPER
  '5_maths_half_yearly_2025-26': 'gBqx0r81gbo',
  '5_maths_half_yearly_2024-25': 'pmYDM2cdXFE',
  '5_maths_half_yearly_2023-24': 'xdH0g7bQl64',
  '5_maths_annual': 'ogl3N9FFBJw', // DAV CLASS 5 MATHS PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '5_maths_annual_2025-26': 'ogl3N9FFBJw',
  '5_maths_annual_2024-25': 'ogl3N9FFBJw',
  '5_maths_annual_2023-24': 'ogl3N9FFBJw',

  '5_science_half_yearly': 'DzQQYu4DM4g', // DAV CLASS 5 SCIENCE HALF YEARLY QUESTION PAPER
  '5_science_half_yearly_2025-26': 'DzQQYu4DM4g',
  '5_science_half_yearly_2024-25': 'DzQQYu4DM4g',
  '5_science_half_yearly_2023-24': 'DzQQYu4DM4g',
  '5_science_annual': '8qetYqKF78g', // DAV CLASS 5 SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '5_science_annual_2025-26': '8qetYqKF78g',
  '5_science_annual_2024-25': '8qetYqKF78g',
  '5_science_annual_2023-24': '0wN2Q2VKLN4',

  '5_sst_half_yearly': 'ov41epOAaMM', // DAV CLASS 5 SOCIAL SCIENCE HALF YEARLY QUESTION PAPER
  '5_sst_half_yearly_2025-26': 'ov41epOAaMM',
  '5_sst_half_yearly_2024-25': 'ov41epOAaMM',
  '5_sst_half_yearly_2023-24': 'ov41epOAaMM',
  '5_sst_annual': '09BTk9YDmBA', // DAV CLASS 5 SOCIAL SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '5_sst_annual_2025-26': '09BTk9YDmBA',
  '5_sst_annual_2024-25': '09BTk9YDmBA',
  '5_sst_annual_2023-24': '09BTk9YDmBA',

  '5_hindi_half_yearly': '8amtoqF0HOo', // DAV CLASS 5 HINDI HALF YEARLY QUESTION PAPER
  '5_hindi_half_yearly_2025-26': '8amtoqF0HOo',
  '5_hindi_half_yearly_2024-25': '8amtoqF0HOo',
  '5_hindi_half_yearly_2023-24': '8amtoqF0HOo',
  '5_hindi_annual': 'gXOrU1o4U34', // DAV CLASS 5 HINDI PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '5_hindi_annual_2025-26': 'gXOrU1o4U34',
  '5_hindi_annual_2024-25': 'gXOrU1o4U34',
  '5_hindi_annual_2023-24': 'gXOrU1o4U34',

  '5_english_half_yearly': 'K3tVU8IgL8g', // DAV CLASS 5 ENGLISH HALF YEARLY QUESTION PAPER
  '5_english_half_yearly_2025-26': 'K3tVU8IgL8g',
  '5_english_half_yearly_2024-25': 'K3tVU8IgL8g',
  '5_english_half_yearly_2023-24': 'K3tVU8IgL8g',
  '5_english_annual': '1Exu5C_E5L0', // DAV CLASS 5 ENGLISH PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '5_english_annual_2025-26': '1Exu5C_E5L0',
  '5_english_annual_2024-25': '1Exu5C_E5L0',
  '5_english_annual_2023-24': '1Exu5C_E5L0',

  '5_sanskrit_half_yearly': 'eHSBDfAZ5-A', // DAV CLASS 5 SANSKRIT HALF YEARLY QUESTION PAPER
  '5_sanskrit_half_yearly_2025-26': 'eHSBDfAZ5-A',
  '5_sanskrit_half_yearly_2024-25': 'eHSBDfAZ5-A',
  '5_sanskrit_half_yearly_2023-24': 'eHSBDfAZ5-A',
  '5_sanskrit_annual': '_TlLpVucAXw', // DAV CLASS 5 SANSKRIT PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '5_sanskrit_annual_2025-26': '_TlLpVucAXw',
  '5_sanskrit_annual_2024-25': '_TlLpVucAXw',
  '5_sanskrit_annual_2023-24': '_TlLpVucAXw',

  // =========================================================
  // CLASS 4 (5 Subjects - 70 Marks)
  // =========================================================
  '4_maths_half_yearly': 'iKG46TTgkVQ', // DAV CLASS 4 MATHS HALF YEARLY QUESTION PAPER
  '4_maths_half_yearly_2025-26': 'iKG46TTgkVQ',
  '4_maths_half_yearly_2024-25': 'iKG46TTgkVQ',
  '4_maths_half_yearly_2023-24': 'iKG46TTgkVQ',
  '4_maths_annual': 'ccZ13BFSFOs', // DAV CLASS 4 MATHS PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '4_maths_annual_2025-26': 'ccZ13BFSFOs',
  '4_maths_annual_2024-25': 'ccZ13BFSFOs',
  '4_maths_annual_2023-24': 'ccZ13BFSFOs',

  '4_science_half_yearly': 'MavSe_19PT8', // DAV CLASS 4 SCIENCE HALF YEARLY QUESTION PAPER
  '4_science_half_yearly_2025-26': 'MavSe_19PT8',
  '4_science_half_yearly_2024-25': 'MavSe_19PT8',
  '4_science_half_yearly_2023-24': 'MavSe_19PT8',
  '4_science_annual': 'zeOW0W1DD6w', // DAV CLASS 4 SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '4_science_annual_2025-26': 'zeOW0W1DD6w',
  '4_science_annual_2024-25': 'zeOW0W1DD6w',
  '4_science_annual_2023-24': 'zeOW0W1DD6w',

  '4_sst_half_yearly': 'YIcvQhfNwyc', // DAV CLASS 4 S.SC HALF YEARLY QUESTION PAPER
  '4_sst_half_yearly_2025-26': 'YIcvQhfNwyc',
  '4_sst_half_yearly_2024-25': 'YIcvQhfNwyc',
  '4_sst_half_yearly_2023-24': 'YIcvQhfNwyc',
  '4_sst_annual': '1zlbi20ecJE', // DAV CLASS 4 SOCIAL SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '4_sst_annual_2025-26': '1zlbi20ecJE',
  '4_sst_annual_2024-25': '1zlbi20ecJE',
  '4_sst_annual_2023-24': '1zlbi20ecJE',

  '4_hindi_half_yearly': 'uDxP7-iEmHc', // DAV CLASS 4 HINDI HALF YEARLY QUESTION PAPER
  '4_hindi_half_yearly_2025-26': 'uDxP7-iEmHc',
  '4_hindi_half_yearly_2024-25': 'uDxP7-iEmHc',
  '4_hindi_half_yearly_2023-24': 'uDxP7-iEmHc',
  '4_hindi_annual': 'U_WUl3ciz2A', // DAV CLASS 4 HINDI PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '4_hindi_annual_2025-26': 'U_WUl3ciz2A',
  '4_hindi_annual_2024-25': 'U_WUl3ciz2A',
  '4_hindi_annual_2023-24': 'U_WUl3ciz2A',

  '4_english_half_yearly': 'BIyWn9aTPK4', // DAV CLASS 4 ENGLISH HALF YEARLY QUESTION PAPER
  '4_english_half_yearly_2025-26': 'BIyWn9aTPK4',
  '4_english_half_yearly_2024-25': 'BIyWn9aTPK4',
  '4_english_half_yearly_2023-24': 'BIyWn9aTPK4',
  '4_english_annual': 'zoGXpv3myxQ', // DAV CLASS 4 ENGLISH PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '4_english_annual_2025-26': 'zoGXpv3myxQ',
  '4_english_annual_2024-25': 'zoGXpv3myxQ',
  '4_english_annual_2023-24': 'zoGXpv3myxQ',

  // =========================================================
  // CLASS 3 (5 Subjects - 70 Marks)
  // =========================================================
  '3_maths_half_yearly': 'etcFRxN8-dQ', // DAV CLASS 3 MATHS HALF YEARLY QUESTION PAPER
  '3_maths_half_yearly_2025-26': 'etcFRxN8-dQ',
  '3_maths_half_yearly_2024-25': 'etcFRxN8-dQ',
  '3_maths_half_yearly_2023-24': 'etcFRxN8-dQ',
  '3_maths_annual': 'y7p__V8TkNU', // DAV CLASS 3 MATHS PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '3_maths_annual_2025-26': 'y7p__V8TkNU',
  '3_maths_annual_2024-25': 'y7p__V8TkNU',
  '3_maths_annual_2023-24': 'y7p__V8TkNU',

  '3_science_half_yearly': 'r7UhmpTe0BA', // DAV CLASS 3 SCIENCE HALF YEARLY QUESTION PAPER
  '3_science_half_yearly_2025-26': 'r7UhmpTe0BA',
  '3_science_half_yearly_2024-25': 'L7ls8IrDNbY',
  '3_science_half_yearly_2023-24': 'r7UhmpTe0BA',
  '3_science_annual': '_fPqjs2zKaE', // DAV CLASS 3 SCIENCE PREVIOUS YEAR ANNUAL QUESTION PAPER 2023-24
  '3_science_annual_2025-26': '_fPqjs2zKaE',
  '3_science_annual_2024-25': '_fPqjs2zKaE',
  '3_science_annual_2023-24': '_fPqjs2zKaE',

  '3_sst_half_yearly': 'uzK52WEjR14', // DAV CLASS 3 S.SC HALF YEARLY QUESTION PAPER
  '3_sst_half_yearly_2025-26': 'uzK52WEjR14',
  '3_sst_half_yearly_2024-25': 'uzK52WEjR14',
  '3_sst_half_yearly_2023-24': 'uzK52WEjR14',
  '3_sst_annual': 'Ui7jUGetn-0', // DAV CLASS 3 S.SC PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '3_sst_annual_2025-26': 'Ui7jUGetn-0',
  '3_sst_annual_2024-25': 'Ui7jUGetn-0',
  '3_sst_annual_2023-24': 'Ui7jUGetn-0',

  '3_hindi_half_yearly': 'RztC6NetvlM', // DAV CLASS 3 HINDI HALF YEARLY QUESTION PAPER
  '3_hindi_half_yearly_2025-26': 'RztC6NetvlM',
  '3_hindi_half_yearly_2024-25': 'RztC6NetvlM',
  '3_hindi_half_yearly_2023-24': 'RztC6NetvlM',
  '3_hindi_annual': 'S-QKkzJvu0M', // DAV CLASS 3 HINDI PREVIOUS YEAR ANNUAL QUESTION PAPER 2025-26
  '3_hindi_annual_2025-26': 'S-QKkzJvu0M',
  '3_hindi_annual_2024-25': 'S-QKkzJvu0M',
  '3_hindi_annual_2023-24': 'S-QKkzJvu0M',

  '3_english_half_yearly': 'UR3vxtd8Nb0', // DAV CLASS 3 ENGLISH HALF YEARLY QUESTION PAPER
  '3_english_half_yearly_2025-26': 'UR3vxtd8Nb0',
  '3_english_half_yearly_2024-25': 'UR3vxtd8Nb0',
  '3_english_half_yearly_2023-24': 'UR3vxtd8Nb0',
  '3_english_annual': 'Zcw0aG2pZUM', // DAV CLASS 3 ENGLISH PREVIOUS YEAR ANNUAL QUESTION PAPER 2024-25
  '3_english_annual_2025-26': 'Zcw0aG2pZUM',
  '3_english_annual_2024-25': 'Zcw0aG2pZUM',
  '3_english_annual_2023-24': 'Zcw0aG2pZUM'
};

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
          
          // Specific Year Key -> Subject Key -> Fallback Key
          const yearSpecificKey = `${c.id}_${subj.id}_${exam.type}_${year}`;
          const subjectExamKey = `${c.id}_${subj.id}_${exam.type}`;
          const fallbackKey = `${c.id}_maths_${exam.type}`;
          
          const videoId = VKPDT_VIDEO_MAP[yearSpecificKey] || 
                          VKPDT_VIDEO_MAP[subjectExamKey] || 
                          VKPDT_VIDEO_MAP[fallbackKey] || 
                          '_Rct3P_JnUA';
          
          // Direct video URL and embedded player URL
          const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
          const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          
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
            videoId: videoId,
            videoUrl: videoUrl,
            youtubeSearchUrl: videoUrl, // fallback so any old code referencing this gets direct video link!
            embedUrl: embedUrl,
            verifiedDav: true,
            description: `Official DAVCAE ${exam.label} question paper walkthrough and marking rubric presented by educator VKPDT IT GURU DAV.`,
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
