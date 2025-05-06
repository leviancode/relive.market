import { execSync } from 'child_process';

function run(command: string) {
  execSync(command, { stdio: 'inherit' });
}

function runSafe(command: string) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (e) {
    throw new Error(`Failed to run: ${command}`);
  }
}

function hasUncommittedChanges(): boolean {
  try {
    const status = execSync('git status --porcelain').toString().trim();
    return status.length > 0;
  } catch {
    return true;
  }
}

function getCurrentBranch(): string {
  return execSync('git branch --show-current').toString().trim();
}

function checkout(branch: string) {
  runSafe(`git checkout ${branch}`);
}

const shouldDelete = process.argv.includes('--delete');
const originalBranch = getCurrentBranch();

if (originalBranch === 'dev') {
  console.error('❌ Already on "dev" branch.');
  process.exit(1);
}

if (hasUncommittedChanges()) {
  console.error('❌ You have uncommitted changes. Commit or stash them first.');
  process.exit(1);
}

console.log(`🔀 Starting merge of "${originalBranch}" → dev...`);

try {
  checkout('dev');
  run('git pull origin dev');
  run(`git merge ${originalBranch}`);
  run('git push origin dev');
  console.log('✅ Merge and push successful.');

  if (shouldDelete) {
    run(`git branch -d ${originalBranch}`);
    run(`git push origin --delete ${originalBranch}`);
    console.log(`🧹 Deleted local and remote branch "${originalBranch}".`);
  } else {
    console.log(`ℹ️ To delete the merged branch, rerun with "--delete".`);
  }
} catch (error) {
  console.error('❌ Merge failed. Attempting rollback...');
  try {
    run('git merge --abort');
    checkout(originalBranch);
    console.log('🛑 Merge aborted. Returned to original branch.');
  } catch (rollbackError) {
    console.error('❌ Rollback also failed. Resolve manually.');
  }
  process.exit(1);
}