// Master Pipeline Orchestrator: Runs Systems 1 to 5 as clean sequential processes
// Fully automated local execution. Zero AI credits.

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runPipeline() {
  console.log('\n############################################################');
  console.log('   STARTING 5-SYSTEM AUTOMATED AUDIT & RESOLUTION PIPELINE  ');
  console.log('############################################################\n');

  const targetClasses = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['8', '7', '6', '5', '4', '3'];
  const classesArg = targetClasses.join(' ');
  console.log(`Targeting Classes: ${classesArg}\n`);

  try {
    // Step 1: System 1 Scanner
    console.log('>>> [1/5] Launching System 1 Scanner...');
    execSync(`node "${path.join(__dirname, 'system1_scanner.js')}"`, { stdio: 'inherit' });

    // Step 2: System 2 Harvester
    console.log('\n>>> [2/5] Launching System 2 Harvester...');
    execSync(`node "${path.join(__dirname, 'system2_harvester.js')}" ${classesArg}`, { stdio: 'inherit' });

    // Step 3: System 3 Re-checker
    console.log('\n>>> [3/5] Launching System 3 Re-checker...');
    execSync(`node "${path.join(__dirname, 'system3_rechecker.js')}" ${classesArg}`, { stdio: 'inherit' });

    // Step 4: System 4 Remediator
    console.log('\n>>> [4/5] Launching System 4 Remediator...');
    execSync(`node "${path.join(__dirname, 'system4_remediator.js')}" ${classesArg}`, { stdio: 'inherit' });

    // Step 5: System 5 Golden Arbiter
    console.log('\n>>> [5/5] Launching System 5 Golden Arbiter...');
    execSync(`node "${path.join(__dirname, 'system5_arbiter.js')}" ${classesArg}`, { stdio: 'inherit' });

    console.log('\n############################################################');
    console.log('   ALL 5 SYSTEMS COMPLETED SUCCESSFULLY!                    ');
    console.log('############################################################\n');
  } catch (err) {
    console.error('\n[Pipeline Error]', err.message);
    process.exit(1);
  }
}

runPipeline();
