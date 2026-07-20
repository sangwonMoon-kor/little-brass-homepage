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
    expect(html).toContain('어떤 악기로 시작할지')
    expect(html).toContain('함께 찾아드립니다')
    expect(html).not.toContain('class="booking-line')
  })

  it('uses an accessible curriculum tab pattern', async () => {
    const html = await page('/curriculum')

    expect(html).toContain('role="tablist"')
    expect(html).toContain('role="tab"')
    expect(html).toContain('aria-selected="true"')
    expect(html).toContain('role="tabpanel"')
  })

  it('uses page-specific subpage introductions', async () => {
    const curriculum = await page('/curriculum')
    const philosophy = await page('/philosophy')
    const gallery = await page('/gallery')
    const location = await page('/location')

    expect(curriculum).toContain('page-intro-curriculum')
    expect(philosophy).toContain('page-intro-philosophy')
    expect(gallery).toContain('page-intro-gallery')
    expect(location).toContain('page-intro-location')
    expect(philosophy).not.toContain('page-intro-with-image')
    expect(gallery).not.toContain('page-intro-with-image')
    expect(location).not.toContain('page-intro-with-image')
  })

  it('combines instrument character and selection in one curriculum control', async () => {
    const html = await page('/curriculum')

    expect(html).not.toContain('class="instrument-guide')
    expect(html.match(/class="curriculum-tab /g)).toHaveLength(4)
    expect(html).toContain('선명하고 곧은 소리')
    expect(html).toContain('깊고 따뜻한 울림')
  })

  it('orders the text-led curriculum from practice to theory and lesson guidance', async () => {
    const html = await page('/curriculum')
    const headings = ['실기 과정', '뮤토랑 음악이론반', '수업 안내']
    const positions = headings.map((heading) => html.indexOf(heading))

    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
    expect(html).toContain('aria-labelledby="theory-title"')
    expect(html).toContain('aria-labelledby="lesson-title"')
  })

  it('introduces both Little Brass co-directors with equal roles', async () => {
    const html = await page('/philosophy')

    expect(html).toContain('김효민 원장')
    expect(html).toContain('안세은 원장')
    expect(html).toContain('리틀브라스를 함께<br/>이끄는 두 원장')
    expect(html.match(/class="director-role"/g)).toHaveLength(2)
    expect(html).not.toContain('골드쌤 원장')
  })

  it('shares the current visit hours and asks visitors to confirm before arriving', async () => {
    const html = await page('/location')

    expect(html).toContain('12:00–18:00')
    expect(html).toContain('10:00–13:00')
    expect(html).toContain('수업 일정에 따라 운영시간이 달라질 수 있으니 방문 전 예약 또는 문의해 주세요.')
    expect(html).not.toContain('14:00–19:00')
    expect(html).not.toContain('14:00–21:00')
    expect(html).not.toContain('10:00–18:00')
  })

  it('shows verifiable academy information in the shared footer', async () => {
    const html = await page('/curriculum')

    expect(html).toContain('리틀브라스 음악학원')
    expect(html).toContain('대표원장 김효민 · 안세은')
    expect(html).toContain('운영시간')
    expect(html).toMatch(/<dt>평일<\/dt><dd>12:00–18:00<\/dd>/)
    expect(html).toMatch(/<dt>토요일<\/dt><dd>10:00–13:00<\/dd>/)
    expect(html).toContain('네이버 예약')
    expect(html).not.toContain('사업자등록번호')
  })

  it('uses the verified Instagram profile without a popup-only social link', async () => {
    const html = await page('/')

    expect(html).toContain(
      '<a href="https://www.instagram.com/little_brass.official/">인스타그램</a>',
    )
    expect(html).not.toContain('youtube.com')
    expect(html).not.toContain('>유튜브</a>')
  })

  it('labels academy space before lesson and stage gallery records', async () => {
    const html = await page('/gallery')

    expect(html).toContain('id="gallery-space-title"')
    expect(html).toContain('id="gallery-stage-title"')
    expect(html.indexOf('학원 공간')).toBeLessThan(html.indexOf('수업과 무대'))
  })

  it('puts visit actions before transport details', async () => {
    const html = await page('/location')

    expect(html).toContain('class="location-hero-actions')
    expect(html.indexOf('네이버 지도에서 보기')).toBeLessThan(
      html.indexOf('학원까지 오는 방법'),
    )
    expect(html).toContain('5층 501호')
  })

  it('lists the corrected subway stop, walking time, and parking notice', async () => {
    const html = await page('/location')

    expect(html).toContain('5호선 강일역 4번 출구에서 걸어서 3분입니다.')
    expect(html).toContain('5호선 강일역 4번 출구에서 도보 3분')
    expect(html).toContain('리엔프라자 건물 내 주차장 이용 가능 (주차 자리 협소)')
    expect(html).not.toContain('5호선 상일동역 3번 출구')
    expect(html).not.toContain('9호선 상일동역')
  })

  it('uses the requested student age range throughout curriculum guidance', async () => {
    const html = await page('/curriculum')
    const practicalTargets = html.match(
      /<dt>추천 대상<\/dt><dd>초등 저학년~중학생<\/dd>/g,
    ) ?? []

    expect(practicalTargets).toHaveLength(16)
    expect(html).toContain('<dt>대상</dt><dd>초등 저학년~중학생</dd>')
  })

  it('labels the former lesson room as the ensemble room', async () => {
    const html = await page('/gallery')

    expect(html).toContain('Ensemble Room · 합주실')
    expect(html).toContain('금관악기 수업을 진행하는 리틀브라스 합주실')
    expect(html).not.toContain('Lesson Room · 레슨실')
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
      'class="instrument-cards',
      'class="editorial-section home-education"',
      'class="editorial-section home-space"',
      'class="editorial-section home-news"',
      'class="home-cta"',
    ]

    for (const marker of markers) expect(html).toContain(marker)
    expect(markers.map((marker) => html.indexOf(marker))).toEqual(
      [...markers.map((marker) => html.indexOf(marker))].sort((a, b) => a - b),
    )
  })

  it('does not present generated hero media as actual lesson footage', async () => {
    const html = await page('/')

    expect(html).toContain('aria-label="금관악기 연주 영상"')
    expect(html).not.toContain('리틀브라스 실제 수업 영상')
    expect(html).not.toContain('class="video-badge"')
  })
})
