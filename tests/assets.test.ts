import { existsSync, readFileSync, statSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app'

const app = createApp({
  getBlogPosts: async () => ({ posts: [], source: 'fallback', message: 'offline' }),
})

describe('media budgets', () => {
  it('keeps the hero video within the transfer budget', () => {
    expect(statSync('public/static/videos/hero-video.mp4').size).toBeLessThanOrEqual(3_500_000)
  })

  it('provides a lightweight hero poster', () => {
    const posterPath = 'public/static/videos/hero-poster.webp'
    expect(existsSync(posterPath)).toBe(true)
    expect(statSync(posterPath).size).toBeLessThanOrEqual(160_000)
  })

  it('uses optimized lower-page images with stable layout hints', async () => {
    const home = await (await app.request('https://example.com/')).text()
    const gallery = await (await app.request('https://example.com/gallery')).text()

    expect(home).toContain('poster="/static/videos/hero-poster.webp"')
    expect(home).toContain('/static/images/instruments/trumpet.webp')
    expect(home).toContain('/static/images/academy/ensemble-lesson-01.webp')
    expect(home).toContain('loading="lazy"')
    expect(home).toContain('decoding="async"')
    expect(home).toMatch(/<img[^>]+width="\d+"[^>]+height="\d+"/)
    expect(gallery).toContain('/static/images/academy/academy-concert-group-01.webp')
    expect(gallery).not.toContain('/static/images/academy/lobby-01.webp')
  })

  it('ships the homepage education photograph as an optimized WebP', () => {
    const imagePath = 'public/static/images/academy/ensemble-lesson-01.webp'
    expect(existsSync(imagePath)).toBe(true)
    expect(statSync(imagePath).size).toBeLessThanOrEqual(700_000)
  })

  it('keeps the curriculum text-led without unrelated portraits', async () => {
    const curriculum = await (
      await app.request('https://example.com/curriculum')
    ).text()

    expect(curriculum).not.toContain(
      '/static/images/academy/instructor-trumpet-portrait-02.webp',
    )
    expect(curriculum).not.toContain(
      '/static/images/academy/faculty-duo-presentation-01.webp',
    )
    expect(curriculum).not.toContain('class="theory-media')
    expect(curriculum).toContain('class="theory-ledger')
  })

  it('uses academy faculty photographs in the philosophy page', async () => {
    const philosophy = await (
      await app.request('https://example.com/philosophy')
    ).text()

    expect(philosophy).toContain('/static/images/academy/faculty-duo-standing-01.webp')
    expect(philosophy).toContain('/static/images/academy/instructor-portrait-01.webp')
    expect(philosophy).toContain(
      '/static/images/academy/instructor-trumpet-portrait-01.webp',
    )
    expect(philosophy).not.toContain('/static/images/academy/lobby-01.webp')
    expect(philosophy).not.toContain('/static/images/academy/corridor-01.webp')
  })

  it('uses academy lesson and stage photographs on the homepage', async () => {
    const home = await (await app.request('https://example.com/')).text()

    expect(home).toContain('/static/images/academy/ensemble-lesson-01.webp')
    expect(home).toContain('/static/images/academy/faculty-duo-brass-01.webp')
    expect(home).toContain('/static/images/academy/academy-concert-group-01.webp')
    expect(home).toContain('/static/images/academy/student-performance-01.webp')
    expect(home).not.toContain('/static/images/academy/brand-wall-01.webp')
    expect(home).not.toContain('/static/images/academy/lobby-01.webp')
    expect(home).not.toContain('/static/images/academy/practice-room-01.webp')
    expect(home).not.toContain('/static/images/academy/lesson-room-01.webp')
  })

  it('pairs a real lesson with both directors in the homepage education story', async () => {
    const home = await (await app.request('https://example.com/')).text()

    expect(home).toContain('class="education-photo-stack')
    expect(home).toContain('/static/images/academy/ensemble-lesson-01.webp')
    expect(home).toContain('/static/images/academy/faculty-duo-brass-01.webp')
  })

  it('defines the approved homepage palette', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain('--home-navy: #102b4e;')
    expect(styles).toContain('--home-deep-navy: #0a1c33;')
    expect(styles).toContain('--home-brass: #b79035;')
    expect(styles).toContain('--home-rule: #dedede;')
  })

  it('uses a bounded captioned academy gallery on the homepage', async () => {
    const home = await (await app.request('https://example.com/')).text()
    expect(home).toContain('class="home-space-grid')
    expect(home).toContain('class="space-caption')
    expect(home).not.toContain('class="image-overlay')
  })

  it('uses the approved 2:1:1 desktop space grid with shrinkable tracks', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain(
      'grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr);',
    )
  })

  it('allows the mobile space gallery track to shrink below image aspect width', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain(
      '.home-space-grid {\n    grid-template-columns: minmax(0, 1fr);\n  }',
    )
  })

  it('keeps fixed-height mobile space images inside the gallery track', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain(
      '.space-lead .space-image,\n  .space-support .space-image {\n    width: 100%;\n    min-height: 0;\n  }',
    )
  })

  it('keeps mobile editorial gallery images inside the page width', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain(
      '.editorial-gallery {\n    grid-template-columns: minmax(0, 1fr);',
    )
    expect(styles).toContain(
      '.gallery-image,\n  .gallery-figure-lead .gallery-image,\n  .gallery-figure-tall .gallery-image {\n    width: 100%;',
    )
  })
})
