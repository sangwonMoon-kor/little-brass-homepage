import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const MAX_WIDTH = 1600
const QUALITY = 85
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
const __dirname = dirname(fileURLToPath(import.meta.url))
const IMAGES_ROOT = resolve(__dirname, '../public/static/images')

async function optimizeJpg(filePath) {
  const before = (await stat(filePath)).size
  const img = sharp(filePath)
  const meta = await img.metadata()

  const needsResize = meta.width > MAX_WIDTH

  await img
    .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(filePath + '.tmp')

  // replace original with optimized
  const { rename, unlink } = await import('fs/promises')
  await unlink(filePath)
  await rename(filePath + '.tmp', filePath)

  const after = (await stat(filePath)).size
  const pct = (((before - after) / before) * 100).toFixed(1)
  const kb = (n) => (n / 1024).toFixed(0) + 'KB'
  const flag = after > 500_000 ? ' ⚠ >500KB' : ''
  console.log(`  ${filePath.split(/[\\/]/).slice(-2).join('/')}  ${kb(before)} → ${kb(after)}  (-${pct}%)${flag}`)
}

async function processDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) {
      await processDir(full)
    } else if (['.jpg', '.jpeg'].includes(extname(e.name).toLowerCase())) {
      await optimizeJpg(full)
    }
  }
}

console.log('Optimizing images (max 1600px, quality 85)...\n')
await processDir(IMAGES_ROOT)
console.log('\nDone.')
