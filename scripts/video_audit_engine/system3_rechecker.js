// System 3: Secondary Re-checker & Differential Auditor
// Re-evaluates all 644 chapters and verifies collision reduction against Phase 1.
// Zero AI credits used: Pure local Node.js execution.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runSystem3(targetClasses = ['8', '7', '6', '5', '4', '3']) {
  console.log('====================================================');
  console.log('   SYSTEM 3: SECONDARY RE-CHECKER & COMPARATOR      ');
  console.log('====================================================');

  const { SECTION6_SUBJECTS_BY_CLASS, getSection6Teachers, getSection6SolutionParts } = await import('../../src/data/section6Data.js');
  const { getSection6Chapters } = await import('../../src/data/section6Chapters.js');
  const { resolveActiveLecture } = await import('../../src/data/videoLecturesData.js');

  const phase1Path = path.join(__dirname, 'audit_report_phase1.json');
  let phase1Data = null;
  if (fs.existsSync(phase1Path)) {
    try {
      phase1Data = JSON.parse(fs.readFileSync(phase1Path, 'utf8'));
    } catch (e) {}
  }

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

  for (const classId of targetClasses) {
    const subjects = SECTION6_SUBJECTS_BY_CLASS[classId] || [];
    for (const subj of subjects) {
      const subjectId = subj.id;
      const chapters = getSection6Chapters(classId, subjectId);
      const teachers = getSection6Teachers(classId, subjectId);

      for (const ch of chapters) {
        auditResults.totalEvaluated++;
        const chKey = `${classId}_${subjectId}_${ch.num}`;

        // Resolve Explanation Mode
        const expT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 0 });
        const expT1 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 1 });
        const expT2 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 2 });

        // Resolve Solutions Mode
        const solParts = getSection6SolutionParts(classId, subjectId, ch.num);
        const firstSol = solParts[0] || { id: 'ws1', label: 'Worksheet 1' };
        const solT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 0 });
        const solT1 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 1 });
        const solT2 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 2 });

        auditResults.allSlots.push({
          classId,
          subjectId,
          chapterNum: ch.num,
          chapterTitle: ch.title,
          t0: { teacher: teachers[0].name, expVid: expT0.videoId, solVid: solT0.videoId },
          t1: { teacher: teachers[1].name, expVid: expT1.videoId, solVid: solT1.videoId },
          t2: { teacher: teachers[2].name, expVid: expT2.videoId, solVid: solT2.videoId }
        });

        // 1. Missing Videos
        if (!expT0.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 1', teacher: teachers[0].name });
        if (!expT1.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 2', teacher: teachers[1].name });
        if (!expT2.videoId) auditResults.missingTeacherVideos.push({ chKey, opt: 'Option 3', teacher: teachers[2].name });

        // 2. Teacher Collisions
        if (expT0.videoId && expT1.videoId && expT0.videoId === expT1.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt1 == Opt2', vid: expT0.videoId, t1: teachers[0].name, t2: teachers[1].name });
        }
        if (expT1.videoId && expT2.videoId && expT1.videoId === expT2.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt2 == Opt3', vid: expT1.videoId, t2: teachers[1].name, t3: teachers[2].name });
        }
        if (expT0.videoId && expT2.videoId && expT0.videoId === expT2.videoId) {
          auditResults.teacherCollisions.push({ chKey, collision: 'Opt1 == Opt3', vid: expT0.videoId, t1: teachers[0].name, t3: teachers[2].name });
        }

        // 3. Explanation vs Solution Collisions
        if (expT0.videoId && solT0.videoId && expT0.videoId === solT0.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 1', vid: expT0.videoId });
        }
        if (expT1.videoId && solT1.videoId && expT1.videoId === solT1.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 2', vid: expT1.videoId });
        }
        if (expT2.videoId && solT2.videoId && expT2.videoId === solT2.videoId) {
          auditResults.explanationSolutionCollisions.push({ chKey, opt: 'Option 3', vid: expT2.videoId });
        }

        // 4. Teacher Name Discrepancies
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

  const outPath = path.join(__dirname, 'audit_report_phase2.json');
  fs.writeFileSync(outPath, JSON.stringify(auditResults, null, 2), 'utf8');

  console.log(`[System 3 Done] Evaluated ${auditResults.totalEvaluated} chapters.`);
  console.log(`- Teacher Collisions: ${auditResults.teacherCollisions.length} (Phase 1 was: ${phase1Data?.teacherCollisions?.length || 'N/A'})`);
  console.log(`- Explanation vs Solution: ${auditResults.explanationSolutionCollisions.length} (Phase 1 was: ${phase1Data?.explanationSolutionCollisions?.length || 'N/A'})`);
  console.log(`- Missing Videos: ${auditResults.missingTeacherVideos.length} (Phase 1 was: ${phase1Data?.missingTeacherVideos?.length || 'N/A'})`);
  console.log(`- Teacher Name Discrepancies: ${auditResults.teacherNameDiscrepancies.length} (Phase 1 was: ${phase1Data?.teacherNameDiscrepancies?.length || 'N/A'})`);
  console.log(`- Cross-Chapter Duplicates: ${Object.keys(auditResults.crossChapterDuplicates).length} (Phase 1 was: ${Object.keys(phase1Data?.crossChapterDuplicates || {}).length || 'N/A'})`);
  console.log(`Saved phase 2 report to: ${outPath}\n`);

  return auditResults;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const classes = args.length > 0 ? args : ['8', '7', '6', '5', '4', '3'];
  runSystem3(classes).catch(console.error);
}
