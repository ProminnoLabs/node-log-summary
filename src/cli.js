import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { summarize } from './summarize.js';

const [path] = process.argv.slice(2);
if (process.argv.length !== 3) {
  console.error('Usage: node src/cli.js <file.ndjson>');
  process.exitCode = 2;
} else {
  const input = createReadStream(path);
  const lines = createInterface({ input, crlfDelay: Infinity });
  try {
    console.log(JSON.stringify(await summarize(lines), null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    lines.close();
    input.destroy();
  }
}
