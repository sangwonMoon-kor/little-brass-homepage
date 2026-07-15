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
})
