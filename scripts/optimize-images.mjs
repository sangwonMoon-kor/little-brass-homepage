import sharp from 'sharp'
import { mkdir, readdir, stat } from 'fs/promises'
import { dirname, extname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_ROOT = resolve(__dirname, '../public')
const IMAGES_ROOT = resolve(PUBLIC_ROOT, 'static/images')
const ACADEMY_ROOT = resolve(IMAGES_ROOT, 'academy')
const INSTRUMENTS_ROOT = resolve(IMAGES_ROOT, 'instruments')
const OG_SOURCE = resolve(ACADEMY_ROOT, 'yellow-door-01.jpg')
const OG_OUTPUT = resolve(IMAGES_ROOT, 'og/little-brass-og.jpg')
const APPLE_ICON_OUTPUT = resolve(PUBLIC_ROOT, 'apple-touch-icon.png')
const POSTER_OUTPUT = resolve(PUBLIC_ROOT, 'static/videos/hero-poster.webp')

const kb = (bytes) => `${(bytes / 1024).toFixed(0)}KB`

async function convertToWebp(filePath, { maxWidth, quality }) {
  const sourceSize = (await stat(filePath)).size
  const outputPath = filePath.replace(/\.[^.]+$/, '.webp')
  const metadata = await sharp(filePath).metadata()

  await sharp(filePath)
    .resize(metadata.width > maxWidth ? { width: maxWidth, withoutEnlargement: true } : undefined)
    .webp({ quality, effort: 6 })
    .toFile(outputPath)

  const outputSize = (await stat(outputPath)).size
  console.log(`  ${filePath.split(/[\\/]/).slice(-2).join('/')}  ${kb(sourceSize)} → ${kb(outputSize)}`)
}

async function processDir(dir, extensions, options) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      await processDir(fullPath, extensions, options)
    } else if (extensions.includes(extname(entry.name).toLowerCase())) {
      await convertToWebp(fullPath, options)
    }
  }
}

async function generatePoster(sourcePath) {
  await mkdir(dirname(POSTER_OUTPUT), { recursive: true })
  await sharp(sourcePath)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 76, effort: 6 })
    .toFile(POSTER_OUTPUT)

  console.log(`Generated ${POSTER_OUTPUT} (${kb((await stat(POSTER_OUTPUT)).size)})`)
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

const posterFlagIndex = process.argv.indexOf('--poster')

if (process.argv.includes('--og-only')) {
  await generateBrandAssets()
} else if (posterFlagIndex !== -1) {
  const sourcePath = process.argv[posterFlagIndex + 1]
  if (!sourcePath) throw new Error('--poster requires a source image path')
  await generatePoster(resolve(sourcePath))
} else {
  console.log('Generating responsive WebP assets...\n')
  await processDir(ACADEMY_ROOT, ['.jpg', '.jpeg'], { maxWidth: 1600, quality: 80 })
  await processDir(INSTRUMENTS_ROOT, ['.png'], { maxWidth: 1200, quality: 82 })
  console.log('\nDone.')
}
