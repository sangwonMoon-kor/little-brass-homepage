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
    expect(home).toContain('loading="lazy"')
    expect(home).toContain('decoding="async"')
    expect(home).toMatch(/<img[^>]+width="\d+"[^>]+height="\d+"/)
    expect(gallery).toContain('/static/images/academy/display-02.webp')
    expect(gallery).not.toContain('/static/images/academy/display-02.jpg')
  })

  it('bounds the desktop gallery tracks when images have intrinsic dimensions', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')
    expect(styles).toContain('grid-template-rows: repeat(2, minmax(0, 280px));')
  })
})
