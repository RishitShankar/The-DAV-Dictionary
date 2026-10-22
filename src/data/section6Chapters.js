import { DAV_CHAPTERS_MAP } from './curriculumData.js';

// Dedicated Abhyas Sagar chapters for Class 8, 7, 6, 5, 4, 3
const HINDI_ABHYAS_8 = [
  { num: 1, title: 'अनुस्वार, अनुनासिक एवं नुक्ता (अभ्यास 1)' },
  { num: 2, title: 'वर्ण विचार एवं उच्चारण स्थान (अभ्यास 2)' },
  { num: 3, title: 'संज्ञा व उसके भेद (अभ्यास 3)' },
  { num: 4, title: 'उपसर्ग और प्रत्यय (अभ्यास 4)' },
  { num: 5, title: 'संधि - स्वर संधि (अभ्यास 5)' },
  { num: 6, title: 'सर्वनाम व उसके भेद (अभ्यास 6)' },
  { num: 7, title: 'विशेषण व प्रविशेषण (अभ्यास 7)' },
  { num: 8, title: 'क्रिया एवं काल (अभ्यास 8)' },
  { num: 9, title: 'कारक व परसर्ग (अभ्यास 9)' },
  { num: 10, title: 'अव्यय / क्रिया-विशेषण (अभ्यास 10)' },
  { num: 11, title: 'वाक्य विचार व रचना के आधार पर भेद (अभ्यास 11)' },
  { num: 12, title: 'समास - तत्पुरुष, कर्मधारय, द्विगु (अभ्यास 12)' },
  { num: 13, title: 'मुहावरे एवं लोकोक्तियाँ (अभ्यास 13)' },
  { num: 14, title: 'अलंकार परिचय - शब्दालंकार व अर्थालंकार (अभ्यास 14)' },
  { num: 15, title: 'विराम चिह्न व प्रयोग (अभ्यास 15)' },
  { num: 16, title: 'अशुद्धि शोधन (वर्तनी व वाक्य) (अभ्यास 16)' },
  { num: 17, title: 'पत्र लेखन - औपचारिक व अनौपचारिक (अभ्यास 17)' },
  { num: 18, title: 'अनुच्छेद एवं संवाद लेखन (अभ्यास 18)' },
  { num: 19, title: 'सूचना एवं विज्ञापन लेखन (अभ्यास 19)' },
  { num: 20, title: 'अपठित गद्यांश व पद्यांश बोध (अभ्यास 20)' }
];

const ENGLISH_READER_8 = [
  { num: 1, title: 'Unit 1: Sports & Outdoor Games (The Champion Spirit)' },
  { num: 2, title: 'Unit 2: Travel & Exploration (A Journey to Discovery)' },
  { num: 3, title: 'Unit 3: Wit, Humour & Clever Minds' },
  { num: 4, title: 'Unit 4: Fantasy, Mystery & Science Wonders' },
  { num: 5, title: 'Unit 5: Nature, Environment & Wildlife Conservation' },
  { num: 6, title: 'Unit 6: Regard for Values, Life Lessons & Ethics' }
];

const ENGLISH_PRACTICE_8 = [
  { num: 1, title: 'Unit 1: Tenses & Time Expressions (Worksheets 1-4 & DIY)' },
  { num: 2, title: 'Unit 2: Narration / Direct and Indirect Speech' },
  { num: 3, title: 'Unit 3: Modals and Auxiliary Verbs' },
  { num: 4, title: 'Unit 4: Subject-Verb Agreement / Concord' },
  { num: 5, title: 'Unit 5: Non-Finites (Infinitives, Gerunds & Participles)' },
  { num: 6, title: 'Unit 6: Active and Passive Voice Transformations' },
  { num: 7, title: 'Unit 7: Connectors, Conjunctions & Linkers' },
  { num: 8, title: 'Unit 8: Prepositions & Phrasal Verbs' },
  { num: 9, title: 'Unit 9: Conditional Clauses (If / Unless Sentences)' },
  { num: 10, title: 'Unit 10: Synthesis of Sentences & Error Correction' }
];

export function getSection6Chapters(classId, subjectId) {
  const normClass = String(classId).replace(/class\s*/i, '').trim();
  const rawSubj = String(subjectId).toLowerCase().trim();

  // 1. Hindi Abhyas Sagar
  if (rawSubj.includes('abhyas')) {
    if (normClass === '8') return HINDI_ABHYAS_8;
    // Map to base hindi chapters with Abhyas title
    const base = DAV_CHAPTERS_MAP[`${normClass}_hindi`] || [];
    return base.map(ch => ({
      num: ch.num,
      title: `अभ्यास ${ch.num}: ${ch.title.replace(/\(.*?\)/g, '').trim()} व्याकरण कार्य`
    }));
  }

  // 2. English Practice Book
  if (rawSubj.includes('english_practice') || rawSubj.includes('practice')) {
    if (normClass === '8' || normClass === '7' || normClass === '6') return ENGLISH_PRACTICE_8;
    return [
      { num: 1, title: 'Unit 1: Naming Words & Pronouns' },
      { num: 2, title: 'Unit 2: Describing Words (Adjectives)' },
      { num: 3, title: 'Unit 3: Doing Words (Verbs & Tenses)' },
      { num: 4, title: 'Unit 4: Prepositions & Position Words' },
      { num: 5, title: 'Unit 5: Conjunctions & Joining Words' },
      { num: 6, title: 'Unit 6: Sentence Punctuation & Capitalization' },
      { num: 7, title: 'Unit 7: Test Assignment & Worksheets' }
    ];
  }

  // 3. English Reader
  if (rawSubj.includes('english_reader') || (rawSubj.includes('reader') && !rawSubj.includes('lit'))) {
    if (normClass === '8' || normClass === '7' || normClass === '6') return ENGLISH_READER_8;
    const base = DAV_CHAPTERS_MAP[`${normClass}_english`] || [];
    if (base.length > 0) return base;
    return ENGLISH_READER_8;
  }

  // 4. English Literature
  if (rawSubj.includes('english_lit') || rawSubj.includes('literature') || rawSubj === 'english') {
    return DAV_CHAPTERS_MAP[`${normClass}_english`] || [];
  }

  // 5. Hindi Gyan Sagar / Bhasha Madhuri
  if (rawSubj.includes('gyan') || rawSubj.includes('madhuri') || rawSubj === 'hindi') {
    return DAV_CHAPTERS_MAP[`${normClass}_hindi`] || [];
  }

  // 6. Default standard mappings (maths, science, sst, sanskrit)
  const directKey = `${normClass}_${rawSubj}`;
  if (DAV_CHAPTERS_MAP[directKey]) {
    return DAV_CHAPTERS_MAP[directKey];
  }

  // Fallbacks
  if (rawSubj.includes('sci')) return DAV_CHAPTERS_MAP[`${normClass}_science`] || [];
  if (rawSubj.includes('sst') || rawSubj.includes('soc')) return DAV_CHAPTERS_MAP[`${normClass}_sst`] || [];
  if (rawSubj.includes('math')) return DAV_CHAPTERS_MAP[`${normClass}_maths`] || [];
  if (rawSubj.includes('sans')) return DAV_CHAPTERS_MAP[`${normClass}_sanskrit`] || [];

  return [];
}
