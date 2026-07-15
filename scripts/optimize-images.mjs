import sharp from 'sharp'
import { mkdir, readdir, stat } from 'fs/promises'
import { dirname, extname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const MAX_WIDTH = 1600
const QUALITY = 85
const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_ROOT = resolve(__dirname, '../public')
const IMAGES_ROOT = resolve(__dirname, '../public/static/images')
const OG_SOURCE = resolve(IMAGES_ROOT, 'academy/yellow-door-01.jpg')
const OG_OUTPUT = resolve(IMAGES_ROOT, 'og/little-brass-og.jpg')
const APPLE_ICON_OUTPUT = resolve(PUBLIC_ROOT, 'apple-touch-icon.png')

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

async function generateBrandAssets() {
  const overlay = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#111111" stop-opacity="0.88"/>
          <stop offset="0.72" stop-color="#111111" stop-opacity="0.28"/>
          <stop offset="1" stop-color="#111111" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#scrim)"/>
      <text x="84" y="272" fill="#d4af37" font-family="Georgia, serif" font-size="28" letter-spacing="8">PREMIUM BRASS EDUCATION</text>
      <text x="80" y="372" fill="#ffffff" font-family="Georgia, serif" font-size="82" font-weight="700">Little Brass</text>
      <rect x="84" y="420" width="96" height="3" fill="#d4af37"/>
    </svg>
  `)

  const icon = Buffer.from(`
    <svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" rx="38" fill="#1a1a1a"/>
      <circle cx="90" cy="90" r="64" fill="none" stroke="#d4af37" stroke-width="6"/>
      <text x="90" y="110" fill="#f8f3e3" font-family="Georgia, serif" font-size="62" font-weight="700" text-anchor="middle">LB</text>
    </svg>
  `)

  await mkdir(dirname(OG_OUTPUT), { recursive: true })
  await sharp(OG_SOURCE)
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([{ input: overlay }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(OG_OUTPUT)
  await sharp(icon).png({ compressionLevel: 9 }).toFile(APPLE_ICON_OUTPUT)

  console.log(`Generated ${OG_OUTPUT}`)
  console.log(`Generated ${APPLE_ICON_OUTPUT}`)
}

if (process.argv.includes('--og-only')) {
  await generateBrandAssets()
} else {
  console.log('Optimizing images (max 1600px, quality 85)...\n')
  await processDir(IMAGES_ROOT)
  console.log('\nDone.')
}
