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
})
