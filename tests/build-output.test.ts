import { readFileSync } from 'node:fs'
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
    expect(html).not.toContain('cdn.tailwindcss.com')
    expect(html).not.toContain('/static/tailwind-config.js')
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

  it('uses bounded editorial frames for instrument and education photography', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.instrument-card-media\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5;/s,
    )
    expect(styles).toContain('.education-photo-stack')
    expect(styles).toContain('.education-photo-secondary')
  })
})
