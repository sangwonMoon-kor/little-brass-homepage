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

  it('explains external booking at the first entry point and closes with the final invitation', async () => {
    const html = await page('/')

    expect(html).toContain('네이버 예약으로 이동합니다')
    expect(html).toContain('어떤 악기로 시작할지 함께 찾아드립니다')
    expect(html).not.toContain('class="booking-line')
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

  it('uses Korean-first editorial page introductions', async () => {
    for (const path of ['/curriculum', '/philosophy', '/gallery', '/location']) {
      const html = await page(path)
      expect(html).toContain('class="page-intro')
      expect(html).not.toContain('Dancing Script')
    }
  })

  it('keeps the homepage booking path explicit without competing primary buttons', async () => {
    const html = await page('/')
    expect(html).toContain('금관악기의 첫 소리부터')
    expect(html).toContain('원데이 클래스 예약')
    expect(html).toContain('네이버 예약으로 이동합니다')
    expect(html).toContain('class="text-link')
  })

  it('shows exactly two booking links on the homepage', async () => {
    const html = await page('/')
    const bookingLinks = html.match(
      /href="https:\/\/map\.naver\.com\/p\/entry\/place\/1094694626[^\"]*"/g,
    ) ?? []

    expect(bookingLinks).toHaveLength(2)
    expect(html).not.toContain('class="nav-booking-link"')
    expect(html).not.toContain('class="mobile-booking-link"')
    expect(html).not.toContain('>네이버 예약</a>')
  })

  it('uses the approved homepage sequence', async () => {
    const html = await page('/')
    const markers = [
      'class="home-video-stage"',
      'class="home-hero-intro"',
      'class="instrument-band"',
      'class="instrument-cards"',
      'class="home-education"',
      'class="home-space"',
      'class="home-news"',
      'class="home-cta"',
    ]

    for (const marker of markers) expect(html).toContain(marker)
    expect(markers.map((marker) => html.indexOf(marker))).toEqual(
      [...markers.map((marker) => html.indexOf(marker))].sort((a, b) => a - b),
    )
  })
})
