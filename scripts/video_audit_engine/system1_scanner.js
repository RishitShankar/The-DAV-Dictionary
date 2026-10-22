// System 1: Deep Audit & Inconsistency Scanner
// Evaluates all chapters in Classes 8, 7, 6, 5, 4, 3 across all academic subjects.
// Zero AI credits used: Pure local Node.js execution.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runSystem1() {
  console.log('====================================================');
  console.log('   SYSTEM 1: COMPREHENSIVE SCANNER & AUDIT ENGINE   ');
  console.log('====================================================');

  const { SECTION6_CLASSES, SECTION6_SUBJECTS_BY_CLASS, getSection6Teachers, getSection6SolutionParts } = await import('../../src/data/section6Data.js');
  const { getSection6Chapters } = await import('../../src/data/section6Chapters.js');
  const { resolveActiveLecture, VERIFIED_VIDEO_IDS, VERIFIED_PARTS_IDS, VERIFIED_MATH_WORKSHEETS_IDS, VERIFIED_SOLUTIONS_IDS, VERIFIED_TEACHER2_IDS, VERIFIED_TEACHER3_IDS } = await import('../../src/data/videoLecturesData.js');

  const classes = ['8', '7', '6', '5', '4', '3'];
  const auditResults = {
    timestamp: new Date().toISOString(),
    totalEvaluated: 0,
    missingTeacherVideos: [],
    teacherCollisions: [],
    explanationSolutionCollisions: [],
    teacherNameDiscrepancies: [],
    crossChapterDuplicates: {},
    allSlots: []
  };

  const videoToChapterMap = {};

  for (const classId of classes) {
    const subjects = SECTION6_SUBJECTS_BY_CLASS[classId] || [];
    for (const subj of subjects) {
      const subjectId = subj.id;
      const chapters = getSection6Chapters(classId, subjectId);
      const teachers = getSection6Teachers(classId, subjectId);

      for (const ch of chapters) {
        auditResults.totalEvaluated++;
        const chKey = `${classId}_${subjectId}_${ch.num}`;

        // Resolve Explanation Mode for Teacher 0, 1, 2
        const expT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 0 });
        const expT1 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 1 });
        const expT2 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 2 });

        // Resolve Solutions Mode for Teacher 0, 1, 2
        const solParts = getSection6SolutionParts(classId, subjectId, ch.num);
        const firstSol = solParts[0] || { id: 'ws1', label: 'Worksheet 1' };
        const solT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 0 });
        const solT1 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 1 });
        const solT2 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 2 });

        // Record slot state
        auditResults.allSlots.push({
          classId,
          subjectId,
          chapterNum: ch.num,
          chapterTitle: ch.title,
          t0: { teacher: teachers[0].name, vid: expT0.videoId, solVid: solT0.videoId },
          t1: { teacher: teachers[1].name, vid: expT1.videoId, solVid: solT1.videoId },
          t2: { teacher: teachers[2].name, vid: expT2.videoId, solVid: solT2.videoId }
        });

        // 1. Missing Teacher Videos
        if (!expT0.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 1', teacher: teachers[0].name });
        if (!expT1.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 2', teacher: teachers[1].name });
        if (!expT2.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 3', teacher: teachers[2].name });

        // 2. Teacher Collisions (T1 == T2, T2 == T3, T1 == T3)
        if (expT0.videoId && expT1.videoId && expT0.videoId === expT1.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt1 == Opt2', vid: expT0.videoId, t1: teachers[0].name, t2: teachers[1].name });
        }
        if (expT1.videoId && expT2.videoId && expT1.videoId === expT2.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt2 == Opt3', vid: expT1.videoId, t2: teachers[1].name, t3: teachers[2].name });
        }
        if (expT0.videoId && expT2.videoId && expT0.videoId === expT2.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt1 == Opt3', vid: expT0.videoId, t1: teachers[0].name, t3: teachers[2].name });
        }

        // 3. Explanation vs Solution Collision
        if (expT0.videoId && solT0.videoId && expT0.videoId === solT0.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 1', vid: expT0.videoId, part: firstSol.label });
        }
        if (expT1.videoId && solT1.videoId && expT1.videoId === solT1.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 2', vid: expT1.videoId, part: firstSol.label });
        }
        if (expT2.videoId && solT2.videoId && expT2.videoId === solT2.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 3', vid: expT2.videoId, part: firstSol.label });
        }

        // 4. Teacher Name Discrepancy (Resolved vs Expected)
        if (expT0.teacher.id !== teachers[0].id) {
          auditResults.teacherNameDiscrepancies.push({ chKey, opt: 'Option 1', expected: teachers[0].name, actual: expT0.teacher.name, vid: expT0.videoId });
        }
        if (expT1.teacher.id !== teachers[1].id) {
          auditResults.teacherNameDiscrepancies.push({ chKey, opt: 'Option 2', expected: teachers[1].name, actual: expT1.teacher.name, vid: expT1.videoId });
        }
        if (expT2.teacher.id !== teachers[2].id) {
          auditResults.teacherNameDiscrepancies.push({ chKey, opt: 'Option 3', expected: teachers[2].name, actual: expT2.teacher.name, vid: expT2.videoId });
        }

        // 5. Cross-Chapter Tracking
        [expT0, expT1, expT2].forEach((entry, idx) => {
          if (entry.videoId) {
            if (!videoToChapterMap[entry.videoId]) videoToChapterMap[entry.videoId] = [];
            videoToChapterMap[entry.videoId].push({ chKey, opt: `Option ${idx + 1}` });
          }
        });
      }
    }
  }

  for (const [vid, list] of Object.entries(videoToChapterMap)) {
    const distinct = new Set(list.map(x => x.chKey));
    if (distinct.size > 1) {
      auditResults.crossChapterDuplicates[vid] = list;
    }
  }

  const outPath = path.join(__dirname, 'audit_report_phase1.json');
  fs.writeFileSync(outPath, JSON.stringify(auditResults, null, 2), 'utf8');

  console.log(`[System 1 Done] Chapters Scanned: ${auditResults.totalEvaluated}`);
  console.log(`- Teacher Option Collisions: ${auditResults.teacherCollisions.length}`);
  console.log(`- Explanation vs Solution Collisions: ${auditResults.explanationSolutionCollisions.length}`);
  console.log(`- Missing Teacher Video Slots: ${auditResults.missingTeacherVideos.length}`);
  console.log(`- Teacher Name Discrepancies: ${auditResults.teacherNameDiscrepancies.length}`);
  console.log(`- Cross-Chapter Duplicate Video IDs: ${Object.keys(auditResults.crossChapterDuplicates).length}`);
  console.log(`Saved audit data to: ${outPath}\n`);

  return auditResults;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runSystem1().catch(console.error);
}
