import { describe, expect, it } from 'vitest'
import { createApp } from '../src/app'

const app = createApp({
  getBlogPosts: async () => ({
    posts: [],
    source: 'fallback',
    message: 'offline',
  }),
})

async function page(path: string): Promise<string> {
  const response = await app.request(`https://example.com${path}`)
  return response.text()
}

describe('accessible page structure', () => {
  it('provides a skip link and one primary heading on every page', async () => {
    for (const path of ['/', '/curriculum', '/philosophy', '/gallery', '/location']) {
      const html = await page(path)
      expect(html).toContain('href="#main-content"')
      expect(html).toContain('id="main-content"')
      expect(html.match(/<h1(?:\s|>)/g)).toHaveLength(1)
    }
  })

  it('marks only the active route in both navigation variants', async () => {
    const html = await page('/gallery')
    const activeLinks = html.match(/<a[^>]+aria-current="page"[^>]*>/g) ?? []

    expect(activeLinks).toHaveLength(2)
    expect(activeLinks.every((link) => link.includes('href="/gallery"'))).toBe(true)
  })

  it('explains external booking and includes the inline consultation choice', async () => {
    const html = await page('/')

    expect(html).toContain('네이버 예약으로 이동합니다')
    expect(html).toContain('처음이라도 괜찮습니다')
    expect(html).toContain('네이버에서 원데이 클래스 예약')
    expect(html).toContain('전화로 상담하기')
  })

  it('uses an accessible curriculum tab pattern', async () => {
    const html = await page('/curriculum')

    expect(html).toContain('role="tablist"')
    expect(html).toContain('role="tab"')
    expect(html).toContain('aria-selected="true"')
    expect(html).toContain('role="tabpanel"')
  })

  it('lists the correct subway line', async () => {
    const html = await page('/location')

    expect(html).toContain('5호선 상일동역')
    expect(html).not.toContain('9호선 상일동역')
  })
})
