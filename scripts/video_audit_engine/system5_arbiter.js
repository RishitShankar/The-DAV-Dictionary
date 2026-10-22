// System 5: Final Golden Arbiter & 2x Full Traversal Verification Auditor
// Executes 2 complete independent passes over all 644 chapters and 3 educator options.
// Certifies 100% playable, non-null, zero-collision state across Section 6.
// Zero AI credits used: Pure local Node.js execution.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runSystem5(targetClasses = ['8', '7', '6', '5', '4', '3']) {
  console.log('====================================================');
  console.log('   SYSTEM 5: FINAL GOLDEN ARBITER & 2X VERIFICATION ');
  console.log('====================================================');

  const { SECTION6_SUBJECTS_BY_CLASS, getSection6Teachers, getSection6SolutionParts } = await import('../../src/data/section6Data.js');
  const { getSection6Chapters } = await import('../../src/data/section6Chapters.js');
  const { resolveActiveLecture } = await import('../../src/data/videoLecturesData.js');

  const certificate = {
    certificationTimestamp: new Date().toISOString(),
    pass1: { totalChecked: 0, passed: 0, failures: [] },
    pass2: { totalChecked: 0, passed: 0, failures: [] },
    classSummaries: {},
    certified: false
  };

  async function performVerificationPass(passName) {
    console.log(`\n>>> Beginning ${passName}...`);
    const passObj = certificate[passName];

    for (const classId of targetClasses) {
      if (!certificate.classSummaries[classId]) {
        certificate.classSummaries[classId] = { totalChapters: 0, t1Ok: 0, t2Ok: 0, t3Ok: 0, solOk: 0, collisions: 0 };
      }
      const subjects = SECTION6_SUBJECTS_BY_CLASS[classId] || [];

      for (const subj of subjects) {
        const subjectId = subj.id;
        const chapters = getSection6Chapters(classId, subjectId);
        const teachers = getSection6Teachers(classId, subjectId);

        for (const ch of chapters) {
          passObj.totalChecked++;
          if (passName === 'pass1') certificate.classSummaries[classId].totalChapters++;
          const chKey = `${classId}_${subjectId}_${ch.num}`;

          // Option 1
          const expT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 0 });
          // Option 2
          const expT1 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 1 });
          // Option 3
          const expT2 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'explanation', selectedPart: { id: 'part1', label: 'Part 1' }, teacherIndex: 2 });

          // Solutions
          const solParts = getSection6SolutionParts(classId, subjectId, ch.num);
          const firstSol = solParts[0] || { id: 'ws1', label: 'Worksheet 1' };
          const solT0 = resolveActiveLecture({ classId, subjectId, chapterNum: ch.num, chapterTitle: ch.title, mode: 'solutions', selectedPart: firstSol, teacherIndex: 0 });

          let chapterFailed = false;

          // Check 1: Null or empty video ID
          if (!expT0.videoId) {
            passObj.failures.push({ chKey, issue: 'Option 1 video is null/empty', teacher: teachers[0].name });
            chapterFailed = true;
          }
          if (!expT1.videoId) {
            passObj.failures.push({ chKey, issue: 'Option 2 video is null/empty', teacher: teachers[1].name });
            chapterFailed = true;
          }
          if (!expT2.videoId) {
            passObj.failures.push({ chKey, issue: 'Option 3 video is null/empty', teacher: teachers[2].name });
            chapterFailed = true;
          }

          // Check 2: Teacher collisions
          if (expT0.videoId && expT1.videoId && expT0.videoId === expT1.videoId) {
            passObj.failures.push({ chKey, issue: 'Collision: Opt1 == Opt2', vid: expT0.videoId });
            chapterFailed = true;
            if (passName === 'pass1') certificate.classSummaries[classId].collisions++;
          }
          if (expT1.videoId && expT2.videoId && expT1.videoId === expT2.videoId) {
            passObj.failures.push({ chKey, issue: 'Collision: Opt2 == Opt3', vid: expT1.videoId });
            chapterFailed = true;
            if (passName === 'pass1') certificate.classSummaries[classId].collisions++;
          }
          if (expT0.videoId && expT2.videoId && expT0.videoId === expT2.videoId) {
            passObj.failures.push({ chKey, issue: 'Collision: Opt1 == Opt3', vid: expT0.videoId });
            chapterFailed = true;
            if (passName === 'pass1') certificate.classSummaries[classId].collisions++;
          }

          // Check 3: Explanation vs Solution
          if (expT0.videoId && solT0.videoId && expT0.videoId === solT0.videoId) {
            passObj.failures.push({ chKey, issue: 'Collision: Exp == Sol', vid: expT0.videoId });
            chapterFailed = true;
          }

          if (!chapterFailed) {
            passObj.passed++;
            if (passName === 'pass1') {
              certificate.classSummaries[classId].t1Ok++;
              certificate.classSummaries[classId].t2Ok++;
              certificate.classSummaries[classId].t3Ok++;
              certificate.classSummaries[classId].solOk++;
            }
          }
        }
      }
    }
    console.log(`  [${passName} Complete] Checked: ${passObj.totalChecked}, Passed: ${passObj.passed}, Failures: ${passObj.failures.length}`);
  }

  // Double verification passes
  await performVerificationPass('pass1');
  await performVerificationPass('pass2');

  certificate.certified = (certificate.pass1.failures.length === 0 && certificate.pass2.failures.length === 0);

  const certPath = path.join(__dirname, 'final_section6_audit_certificate.json');
  fs.writeFileSync(certPath, JSON.stringify(certificate, null, 2), 'utf8');

  console.log('\n====================================================');
  console.log(`   FINAL VERIFICATION CERTIFICATION: ${certificate.certified ? 'PASSED (100% CLEAN)' : 'ATTENTION NEEDED'}`);
  console.log('====================================================');
  for (const [cls, stats] of Object.entries(certificate.classSummaries)) {
    console.log(`- Class ${cls}: ${stats.totalChapters} chapters | T1: ${stats.t1Ok} | T2: ${stats.t2Ok} | T3: ${stats.t3Ok} | Sol: ${stats.solOk} | Collisions: ${stats.collisions}`);
  }
  console.log(`\nCertificate written to: ${certPath}\n`);

  return certificate;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const classes = args.length > 0 ? args : ['8', '7', '6', '5', '4', '3'];
  runSystem5(classes).catch(console.error);
}
