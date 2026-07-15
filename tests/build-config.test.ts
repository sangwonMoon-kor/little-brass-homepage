import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

describe('Cloudflare Pages build configuration', () => {
  it('clears stale artifacts before generating routes and static assets', () => {
    const config = readFileSync('vite.config.ts', 'utf8')
    expect(config).toContain('emptyOutDir: true')
  })

  it('does not let static SEO files shadow the application routes', () => {
    expect(existsSync('public/robots.txt')).toBe(false)
    expect(existsSync('public/sitemap.xml')).toBe(false)
  })
})
