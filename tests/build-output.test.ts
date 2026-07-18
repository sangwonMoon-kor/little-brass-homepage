import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app'

const app = createApp({
  getBlogPosts: async () => ({
    posts: [],
    source: 'fallback',
    message: 'offline',
  }),
})

describe('production markup', () => {
  it('uses local compiled CSS without the Tailwind runtime CDN', async () => {
    const response = await app.request('https://example.com/')
    const html = await response.text()

    expect(html).toContain('href="/static/tailwind.css"')
    expect(html).toContain('href="/static/style.css?v=20260719-curriculum-footer"')
    expect(html).not.toContain('href="/static/style.css"')
    expect(html).not.toContain('cdn.tailwindcss.com')
    expect(html).not.toContain('/static/tailwind-config.js')
  })

  it('revalidates the layout stylesheet after each deployment', () => {
    expect(existsSync('public/_headers')).toBe(true)
    const headers = readFileSync('public/_headers', 'utf8')

    expect(headers).toContain('/static/style.css')
    expect(headers).toContain('Cache-Control: public, max-age=0, must-revalidate')
  })

  it('keeps navigation underline motion on compositor-friendly transforms', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).not.toContain('transition: width')
    expect(styles).toContain('.nav-link:hover::after')
    expect(styles).toContain('transform: scaleX(1)')
  })

  it('removes generic premium-template typography and motion patterns', async () => {
    const html = await (await app.request('https://example.com/')).text()
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(html).not.toContain('Dancing+Script')
    expect(styles).not.toContain('transition: all')
    expect(styles).not.toContain('linear-gradient')
    expect(styles).not.toContain('border-radius: 9999px')
  })

  it('maps subpages to the homepage white navy brass palette', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toContain('--paper: var(--home-white);')
    expect(styles).toContain('--ink: var(--home-ink);')
    expect(styles).toMatch(
      /\.name-story\s*\{[^}]*background:\s*var\(--home-navy\);/s,
    )
  })

  it('reveals tall editorial groups as soon as visible content enters the viewport', () => {
    const script = readFileSync('public/static/app.js', 'utf8')

    expect(script).toContain("threshold: 0.06")
  })

  it('uses compact, consistent editorial frames for homepage photography', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.instrument-card-media\s*\{[^}]*aspect-ratio:\s*5\s*\/\s*4;/s,
    )
    expect(styles).toMatch(
      /\.education-photo-stack\s*\{[^}]*position:\s*relative;[^}]*aspect-ratio:\s*5\s*\/\s*6;/s,
    )
    expect(styles).toMatch(
      /\.education-photo\s*\{[^}]*position:\s*absolute;/s,
    )
  })

  it('normalizes real instrument photography without cropping it', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*display:\s*grid;/s)
    expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*padding:\s*clamp\(/s)
    expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*background:\s*#fff;/s)
    expect(styles).toMatch(/\.instrument-card-media img\s*\{[^}]*object-fit:\s*contain;/s)
    expect(styles).toContain('.instrument-card-wide .instrument-card-media img')
    expect(styles).toContain('.instrument-card-round .instrument-card-media img')
    expect(styles).toContain('.instrument-card-tall .instrument-card-media img')
  })

  it('uses a stable character-ready supporting frame', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.education-photo-secondary img\s*\{[^}]*object-position:\s*center 34%;/s,
    )
  })

  it('keeps both co-directors in one restrained desktop row', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.director-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*400px\)\);/s,
    )
    expect(styles).toMatch(
      /\.director-grid\s*\{[^}]*justify-content:\s*center;/s,
    )
    expect(styles).toMatch(
      /\.director-profile figure\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5;/s,
    )
  })

  it('keeps curriculum lesson copy readable', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.stage-summary\s*\{[^}]*font-size:\s*(?:15|16)px;/s,
    )
    expect(styles).toMatch(
      /\.lesson-heading h3\s*\{[^}]*font-size:\s*(?:21|22|23|24)px;/s,
    )
    expect(styles).toMatch(
      /\.lesson-description\s*\{[^}]*font-size:\s*(?:15|16)px;/s,
    )
  })

  it('keeps Korean editorial headings on word boundaries', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.section-title,\s*\n\.page-intro h1,\s*\n\.stage-summary,\s*\n\.lesson-heading h3\s*\{[^}]*word-break:\s*keep-all;/s,
    )
    expect(styles).toContain('overflow-wrap: break-word;')
  })

  it('gives the text-led curriculum clear navy and brass hierarchy', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.curriculum-tab\.tab-active\s*\{[^}]*background:\s*var\(--home-navy\);/s,
    )
    expect(styles).toMatch(
      /\.stage-row,\s*\n\.stage-row:first-child\s*\{[^}]*border-left:\s*3px solid var\(--home-brass\);/s,
    )
    expect(styles).toMatch(
      /\.focus-ledger\s*\{[^}]*background:\s*var\(--home-navy\);/s,
    )
    expect(styles).toMatch(
      /\.lesson-ledger article\s*\{[^}]*background:\s*var\(--home-white\);/s,
    )
  })

  it('uses a structured responsive business-information footer', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.site-footer-inner\s*\{[^}]*grid-template-columns:\s*1\.1fr 1\.35fr 1fr 0\.7fr;/s,
    )
    expect(styles).toContain('.footer-section-title')
    expect(styles).toContain('.footer-hours')
  })
})
