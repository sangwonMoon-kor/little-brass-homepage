import { readFile } from 'node:fs/promises'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import app from '../src/index'

const routes = [
  ['/', 'Little Brass - 음악이 흐르는 공간'],
  ['/curriculum', '커리큘럼 - Little Brass'],
  ['/philosophy', '교육철학 - Little Brass'],
  ['/gallery', '갤러리 - Little Brass'],
  ['/location', '찾아오시는 길 - Little Brass'],
] as const

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 503 })))
})

describe('public route contract', () => {
  it.each(routes)('renders %s with unique metadata', async (path, title) => {
    const response = await app.request(`https://little-brass-homepage.pages.dev${path}`)
    const html = await response.text()

    expect(response.status).toBe(200)
    expect(html).toContain(`<title>${title}</title>`)
    expect(html).toContain(
      `<link rel="canonical" href="https://little-brass-homepage.pages.dev${path === '/' ? '/' : path}"`,
    )
  })

  it.each(['/about', '/teachers', '/achievements', '/faq', '/online', '/contact', '/missing'])(
    'returns a real 404 for %s',
    async (path) => {
      const response = await app.request(`https://little-brass-homepage.pages.dev${path}`)
      expect(response.status).toBe(404)
      expect(await response.text()).toContain('페이지를 찾을 수 없습니다')
    },
  )

  it('publishes only the five intentional routes in sitemap.xml', async () => {
    const response = await app.request('https://little-brass-homepage.pages.dev/sitemap.xml')
    const xml = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/xml')
    for (const [path] of routes) {
      expect(xml).toContain(`https://little-brass-homepage.pages.dev${path === '/' ? '/' : path}`)
    }
    expect(xml).not.toContain('/about')
    expect(xml).not.toContain('/contact')
  })

  it('uses the request origin in robots.txt before custom-domain activation', async () => {
    const response = await app.request('https://preview.example/robots.txt')
    expect(await response.text()).toContain('Sitemap: https://preview.example/sitemap.xml')
  })

  it('prefers PUBLIC_SITE_URL for canonical and sitemap output', async () => {
    const response = await app.request(
      'https://preview.example/gallery',
      undefined,
      { PUBLIC_SITE_URL: 'https://littlebrass.com' },
    )
    expect(await response.text()).toContain(
      '<link rel="canonical" href="https://littlebrass.com/gallery"',
    )
  })

  it('references and provides a branded SVG favicon', async () => {
    const response = await app.request('https://example.com/')
    expect(await response.text()).toContain('href="/favicon.svg"')

    await expect(
      readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8'),
    ).resolves.toContain('<svg')
  })

  it('includes verified MusicSchool structured data on the homepage', async () => {
    const response = await app.request('https://example.com/')
    const html = await response.text()
    expect(html).toContain('"@type":"MusicSchool"')
    expect(html).toContain('서울특별시 강동구 상일로12길 99')
    expect(html).not.toContain('aggregateRating')
  })
})
