// News-image entry for Thursday 19 November 2026 (Node 22, standard library only).
// The image is entry.png beside this file: a newspaper-style summary of the day's
// world news, drawn as HTML and rendered to PNG in this session. This program copies
// it to /output/entry.png, exactly the bytes the judge sees.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
// Fail loudly rather than shipping a broken file: PNG magic bytes, <=1 MiB, <=1024x1024.
const bytes = readFileSync(src);
if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
  throw new Error('entry.png is not a PNG');
}
if (bytes.length > 1048576) throw new Error('entry.png exceeds 1 MiB');
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error('entry.png exceeds 1024x1024');
copyFileSync(src, join(outDir, 'entry.png'));
console.log(`wrote entry.png: ${width}x${height}, ${statSync(join(outDir, 'entry.png')).size} bytes`);
