import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { resolve } from 'node:path'
const manifest = JSON.parse(readFileSync('scripts/notifications/manifest.json', 'utf8'))
for (const [file, expected] of Object.entries(manifest.files)) {
  if (!file.startsWith('scripts/notifications/') && !file.startsWith('.github/workflows/discord-'))
    throw new Error('Invalid generated path')
  const actual = createHash('sha256')
    .update(readFileSync(resolve(file)))
    .digest('hex')
  if (actual !== expected) throw new Error(`Regenerate notification file: ${file}`)
}
process.stdout.write('Generated notification checksums verified.\n')
