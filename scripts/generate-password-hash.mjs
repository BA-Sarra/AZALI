import { randomBytes, scryptSync } from 'node:crypto';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const N = 16384;
const r = 8;
const p = 1;

async function main() {
  let password = process.argv[2];
  if (!password) {
    const rl = readline.createInterface({ input, output });
    password = await rl.question('Admin password to hash: ');
    rl.close();
  }

  if (!password || password.length < 10) {
    console.error('Use a stronger password, at least 10 characters.');
    process.exit(1);
  }

  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64, { N, r, p }).toString('hex');
  console.log(`scrypt$${N}$${r}$${p}$${salt}$${hash}`);
}

main();
