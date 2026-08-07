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
    // 버전 문자열 자체는 배포마다 바뀐다. 날짜를 박아두면 CSS 를 고칠 때마다
    // 테스트가 깨지므로, "캐시 무효화 값이 붙어 있는가"만 보장한다.
    expect(html).toMatch(/href="\/static\/style\.css\?v=[A-Za-z0-9._-]+"/)
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

  it('includes responsive editorial styling for Instagram profile links', () => {
    const css = readFileSync('public/static/style.css', 'utf8')

    expect(css).toMatch(/\.instagram-profile-row\s*\{[^}]*display:\s*flex;[^}]*border-top:/s)
    expect(css).toMatch(/\.instagram-profile-link\s*\{[^}]*display:\s*inline-flex;[^}]*transition:\s*transform/s)
    expect(css).toMatch(/\.instagram-profile-link:active\s*,?[^\{]*\{[^}]*transform:\s*scale\(0\.97\)/s)
    expect(css).toMatch(/@media \(max-width:\s*640px\)[\s\S]*\.instagram-profile-row\s*\{[^}]*flex-direction:\s*column;/s)
    expect(css).toMatch(/\.gallery-journal-actions\s*\{[^}]*flex-direction:\s*column;/s)
    expect(css).toMatch(/\.gallery-journal-inner h2\s*\{[^}]*word-break:\s*keep-all;/s)
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

  it('keeps the hero video inside the viewport at tablet widths', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    // 폭을 auto 로 두면 min-height 가 aspect-ratio 를 타고 폭을 1097px 로 역산해
    // 700~1100px 구간에서 영상 오른쪽이 잘린다. 폭을 확정해야 한다.
    expect(styles).toMatch(
      /\.home-video-stage\s*\{[^}]*width:\s*100%;[^}]*aspect-ratio:\s*16\s*\/\s*7;/s,
    )
  })

  it('uses compact, consistent editorial frames for homepage photography', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toMatch(
      /\.instrument-card-media\s*\{[^}]*aspect-ratio:\s*5\s*\/\s*4;/s,
    )
    // 사진 두 장은 겹치지 않고 각자 원본 비율을 유지한다.
    // 예전에는 고정 비율 박스 안에 absolute 로 포개어 아래 사진이 위 사진을 파고들었다.
    expect(styles).toMatch(
      /\.education-photo-stack\s*\{[^}]*display:\s*flex;/s,
    )
    expect(styles).not.toMatch(
      /\.education-photo-stack\s*\{[^}]*border-left:/s,
    )
    expect(styles).not.toMatch(
      /\.education-photo\s*\{[^}]*position:\s*absolute;/s,
    )
    expect(styles).toMatch(
      /\.education-photo-primary\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*3;/s,
    )
    expect(styles).toMatch(
      /\.education-photo-secondary\s*\{[^}]*aspect-ratio:\s*3\s*\/\s*4;/s,
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

    // 본문 기준을 16px -> 17px 로 올리면서 px 로 고정돼 있던 값도 같은 비율로 옮겼다.
    expect(styles).toMatch(
      /\.stage-summary\s*\{[^}]*font-size:\s*(?:17|18|19)px;/s,
    )
    expect(styles).toMatch(
      /\.lesson-heading h3\s*\{[^}]*font-size:\s*(?:22|23|24|25)px;/s,
    )
    expect(styles).toMatch(
      /\.lesson-description\s*\{[^}]*font-size:\s*(?:16|17|18)px;/s,
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

  it('keeps the homepage education title balanced on narrow screens', async () => {
    const home = await (await app.request('https://example.com/')).text()
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(home).toContain(
      '<span class="education-title-line">악기를 배우는 시간에</span>',
    )
    expect(styles).toContain(
      'font-size: clamp(1.8rem, 8.5vw, 2.3rem);',
    )
    expect(styles).toContain('.education-title-line')
  })

  it('uses a compact two-by-two curriculum selector on mobile', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toContain(
      '.curriculum-tabs {\n    grid-template-columns: repeat(2, minmax(0, 1fr));',
    )
  })

  it('provides full-size mobile touch targets throughout the footer', () => {
    const styles = readFileSync('public/static/style.css', 'utf8')

    expect(styles).toContain(
      '.footer-contact a,\n  .footer-actions a,\n  .footer-photo-credit summary,\n  .footer-photo-credit a',
    )
    expect(styles).toContain('min-height: 44px;')
  })
})
