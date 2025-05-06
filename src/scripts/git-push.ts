import { execSync } from 'child_process';

const [, , ...args] = process.argv;
const msg = args.join(' ');

if (!msg) {
  console.error('❌ Commit message is required. Example: `pnpm git:push "Update env variables"`');
  process.exit(1);
}

try {
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${msg}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Git push failed:', error);
  process.exit(1);
}