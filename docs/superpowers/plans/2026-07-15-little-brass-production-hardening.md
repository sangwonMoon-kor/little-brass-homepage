# Little Brass Production Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the intentional five-page Little Brass website while shipping production-grade routing, SEO, security, performance, accessibility, restrained motion, maintainable modules, and regression tests.

**Architecture:** Keep Hono, Vite, TypeScript, and Cloudflare Pages. Introduce a small app factory, route/site configuration, focused page modules, a shared layout/SEO layer, and an injectable RSS service so route behavior and failure paths can be tested with `app.request()`.

**Tech Stack:** Hono 4.12.30, Vite 6.4.x, Vitest 4.1.10, Tailwind CSS 3.4.19 CLI, vanilla browser JavaScript, Sharp, FFmpeg, Cloudflare Pages.

## Global Constraints

- The only public content routes are `/`, `/curriculum`, `/philosophy`, `/gallery`, and `/location`.
- Keep the existing Korean-first content, real academy photography, gold/white/charcoal palette, and serif-led premium identity.
- Do not add the retired `/about`, `/teachers`, `/achievements`, `/faq`, `/online`, or `/contact` pages.
- Do not restore a floating reservation button.
- Do not migrate frameworks or introduce a client-side React runtime.
- Do not invent instructor credentials, outcomes, testimonials, prices, or statistics.
- Lazyweb may be used only when the user explicitly requests Lazyweb in the current message.
- `PUBLIC_SITE_URL` is optional; request origin is the fallback until `littlebrass.com` is connected.
- UI animation properties are limited to `transform`, `opacity`, and color-related properties; interactive animation stays under 300ms.
- Preserve a clean working tree between tasks and commit only task-scoped changes.

---

### Task 1: Add the test harness and lock the desired route contract

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `tests/routes.test.ts`

**Interfaces:**
- Consumes: current default Hono app export from `src/index.tsx`
- Produces: `npm test`, route-status assertions, canonical assertions, sitemap/robots assertions

- [ ] **Step 1: Install and configure Vitest**

Run:

```bash
npm install --save-dev vitest@4.1.10
```

Change `package.json` scripts to:

```json
{
  "scripts": {
    "dev": "vite",
    "dev:sandbox": "wrangler pages dev dist --ip 0.0.0.0 --port 3000",
    "build": "vite build",
    "preview": "wrangler pages dev dist",
    "deploy": "npm run build && wrangler pages deploy dist",
    "deploy:prod": "npm run build && wrangler pages deploy dist --project-name little-brass-homepage",
    "cf-typegen": "wrangler types --env-interface CloudflareBindings",
    "clean-port": "fuser -k 3000/tcp 2>/dev/null || true",
    "test": "vitest run"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    restoreMocks: true,
  },
})
```

- [ ] **Step 2: Write failing route/SEO tests**

Create `tests/routes.test.ts`:

```ts
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
})
```

- [ ] **Step 3: Run the test and verify the intended failures**

Run:

```bash
npm test -- tests/routes.test.ts
```

Expected: failures for page-specific canonical URLs, 404 status, dynamic sitemap, and dynamic robots. The existing 200 page assertions should pass.

- [ ] **Step 4: Commit the red test harness**

```bash
git add package.json package-lock.json vitest.config.ts tests/routes.test.ts
git commit -m "test: define homepage route contract"
```

---

### Task 2: Centralize site configuration and fix SEO/HTTP behavior

**Files:**
- Create: `src/config/site.ts`
- Create: `src/types/site.ts`
- Modify: `src/renderer.tsx`
- Modify: `src/index.tsx`
- Delete: `public/sitemap.xml`
- Delete: `public/robots.txt`
- Create: `public/favicon.svg`
- Create: `public/apple-touch-icon.png`
- Create: `public/static/images/og/little-brass-og.jpg`
- Modify: `scripts/optimize-images.mjs`
- Modify: `tests/routes.test.ts`

**Interfaces:**
- Produces: `SITE`, `PUBLIC_ROUTES`, `getPageMeta(pathname)`, `resolveSiteOrigin(requestUrl, configuredOrigin?)`
- Consumes: renderer metadata fields `title`, `description`, `canonicalUrl`, `ogImageUrl`, `pathname`

- [ ] **Step 1: Extend the failing test for `PUBLIC_SITE_URL`, icons, and JSON-LD**

Add tests using the future app factory environment overload. Static public files are verified on disk here because `app.request()` exercises the Hono worker only; the built-preview smoke test verifies their HTTP responses in Task 8:

```ts
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

  const icon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')
  expect(icon).toContain('<svg')
})

it('includes verified MusicSchool structured data on the homepage', async () => {
  const response = await app.request('https://example.com/')
  const html = await response.text()
  expect(html).toContain('"@type":"MusicSchool"')
  expect(html).toContain('서울특별시 강동구 상일로12길 99')
  expect(html).not.toContain('aggregateRating')
})
```

Run and confirm failure:

```bash
npm test -- tests/routes.test.ts
```

- [ ] **Step 2: Create the canonical site model**

Create `src/types/site.ts`:

```ts
export type PublicPath = '/' | '/curriculum' | '/philosophy' | '/gallery' | '/location'

export interface PageMeta {
  path: PublicPath
  title: string
  description: string
}

export type Bindings = {
  PUBLIC_SITE_URL?: string
}
```

Create `src/config/site.ts` with one object for verified academy data, the five route records, and these pure helpers:

```ts
import type { PageMeta, PublicPath } from '../types/site'

export const SITE = {
  name: 'Little Brass',
  description: '리틀브라스 음악학원 - 트럼펫, 호른, 트롬본, 유포늄 금관악기 전문 교육. 서울 강동구 상일동.',
  phone: '010-5819-4687',
  email: 'little_brass@naver.com',
  address: '서울특별시 강동구 상일로12길 99 리엔프라자 501호',
  reservationUrl: 'https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5',
  instagramUrl: 'https://www.instagram.com/little_brass.official',
  youtubeUrl: 'https://youtube.com/@Littlebrass',
  ogImagePath: '/static/images/og/little-brass-og.jpg',
} as const

export const PUBLIC_ROUTES: readonly PageMeta[] = [
  { path: '/', title: 'Little Brass - 음악이 흐르는 공간', description: SITE.description },
  { path: '/curriculum', title: '커리큘럼 - Little Brass', description: '트럼펫, 호른, 트롬본, 유포늄 실기 과정과 음악이론 수업을 안내합니다.' },
  { path: '/philosophy', title: '교육철학 - Little Brass', description: '리틀브라스의 금관악기 전문 교육 철학과 수업 방향을 소개합니다.' },
  { path: '/gallery', title: '갤러리 - Little Brass', description: '리틀브라스의 레슨실, 연습실, 악기와 학원 공간을 확인하세요.' },
  { path: '/location', title: '찾아오시는 길 - Little Brass', description: '서울 강동구 상일동 리틀브라스 위치와 교통, 주차 정보를 안내합니다.' },
]

export function getPageMeta(pathname: string): PageMeta | undefined {
  return PUBLIC_ROUTES.find((route) => route.path === pathname)
}

export function resolveSiteOrigin(requestUrl: string, configuredOrigin?: string): string {
  return new URL(configuredOrigin || requestUrl).origin
}

export function absoluteUrl(origin: string, path: string): string {
  return new URL(path, `${origin}/`).toString()
}
```

- [ ] **Step 3: Make the renderer accept route-aware metadata**

Change the renderer context type to:

```ts
type RendererProps = {
  children?: unknown
  title: string
  description: string
  canonicalUrl: string
  ogImageUrl: string
  pathname: string
}
```

Use those values for title, description, OG, Twitter, and canonical tags. Replace `/favicon.ico` with `/favicon.svg` and `/apple-touch-icon.png`. Add the homepage `MusicSchool` JSON-LD using only `SITE.name`, address, phone, URL, and image. Import `readFile` from `node:fs/promises` in the route test before adding the favicon assertion.

- [ ] **Step 4: Add dynamic sitemap/robots routes and a true 404**

Register `/sitemap.xml` and `/robots.txt` from `PUBLIC_ROUTES`, using `PUBLIC_SITE_URL` when present and the request origin otherwise. Render the 404 with status 404:

```ts
return c.html(rendered404Html, 404)
```

If `c.render()` is retained, set `c.status(404)` before returning it:

```ts
c.status(404)
return c.render(<NotFoundPage />, meta)
```

- [ ] **Step 5: Generate branded share and icon assets**

Extend `scripts/optimize-images.mjs` with an `--og-only` mode. Use the existing `yellow-door-01.jpg` or a representative instrument/academy image to generate:

```bash
node scripts/optimize-images.mjs --og-only
```

The script must output `1200×630` JPEG at `public/static/images/og/little-brass-og.jpg` and `180×180` PNG at `public/apple-touch-icon.png`. Create a simple brass-gold `LB` SVG at `public/favicon.svg`; do not use an external image.

- [ ] **Step 6: Run tests and commit**

```bash
npm test -- tests/routes.test.ts
npm run build
git add src public scripts tests
git add -u public/sitemap.xml public/robots.txt
git commit -m "fix: make routing and metadata production-correct"
```

Expected: route suite passes and build exits 0.

---

### Task 3: Extract and harden the Naver RSS service

**Files:**
- Create: `src/types/blog.ts`
- Create: `src/services/blog.ts`
- Create: `tests/blog.test.ts`
- Create: `tests/fixtures/naver-rss.xml`
- Modify: `src/index.tsx`

**Interfaces:**
- Produces: `parseBlogFeed(xml, limit)`, `isAllowedBlogUrl(url)`, `fetchBlogPosts(options): Promise<BlogFeedResult>`
- Consumes: injected `fetchImpl`, timeout `3_000`, cache TTL `900_000`, maximum 3 posts

- [ ] **Step 1: Write RSS parser and failure tests first**

Create tests covering:

```ts
import { describe, expect, it, vi } from 'vitest'
import { fetchBlogPosts, parseBlogFeed } from '../src/services/blog'

describe('parseBlogFeed', () => {
  it('returns at most three safe Naver posts', () => {
    const posts = parseBlogFeed(FIXTURE_XML, 3)
    expect(posts).toHaveLength(3)
    expect(posts.every((post) => new URL(post.link).hostname.endsWith('naver.com'))).toBe(true)
  })

  it('drops javascript and non-Naver links', () => {
    const xml = '<rss><channel><item><title>bad</title><link><![CDATA[javascript:alert(1)]]></link></item></channel></rss>'
    expect(parseBlogFeed(xml, 3)).toEqual([])
  })

  it('returns an empty list for malformed XML', () => {
    expect(parseBlogFeed('<not-rss>', 3)).toEqual([])
  })
})

describe('fetchBlogPosts', () => {
  it('falls back without throwing when the network fails', async () => {
    const result = await fetchBlogPosts({
      fetchImpl: vi.fn().mockRejectedValue(new Error('offline')),
      fallbackPosts: [{ title: '공지', link: 'https://blog.naver.com/little_brass', description: '블로그에서 최신 소식을 확인하세요.', date: '', thumbnail: null }],
    })
    expect(result.source).toBe('fallback')
    expect(result.posts[0]?.title).toBe('공지')
  })

  it('falls back when the request is aborted by the timeout signal', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new DOMException('Timed out', 'AbortError'))
    const result = await fetchBlogPosts({ fetchImpl, timeoutMs: 1, fallbackPosts: [] })
    expect(result).toMatchObject({ source: 'fallback', posts: [] })
  })
})
```

Run and confirm import failure:

```bash
npm test -- tests/blog.test.ts
```

- [ ] **Step 2: Implement the minimal parser and fetch service**

Use the existing CDATA/date/thumbnail logic once in `src/services/blog.ts`. Validate links with:

```ts
export function isAllowedBlogUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' &&
      (url.hostname === 'blog.naver.com' || url.hostname === 'm.blog.naver.com')
  } catch {
    return false
  }
}
```

Use `AbortSignal.timeout(3_000)` and an injected `fetchImpl`. Cache a successful result for 15 minutes in module memory, keyed by feed URL. Return a discriminated result:

```ts
export type BlogFeedResult = {
  posts: BlogPost[]
  source: 'live' | 'cache' | 'fallback'
  message?: string
}
```

Return the supplied fallback list with `source: 'fallback'` on any network, status, parse, or timeout failure.

- [ ] **Step 3: Reuse the service in both homepage and API**

Remove both duplicated parser implementations from `src/index.tsx`. The homepage renders `result.posts`. `/api/blog/rss` returns 200 when `source` is `live` or `cache`:

```ts
return c.json({ success: true, posts })
```

When `source` is `fallback`, the API returns status 503 with `{ success: false, posts, message }`. In both cases the JSON shape is stable. Keep the homepage at 200 and include the fallback post.

- [ ] **Step 4: Run focused/full tests and commit**

```bash
npm test -- tests/blog.test.ts tests/routes.test.ts
npm test
git add src tests
git commit -m "fix: harden Naver blog feed handling"
```

---

### Task 4: Split the monolithic app without changing page content

**Files:**
- Create: `src/app.tsx`
- Create: `src/components/Layout.tsx`
- Create: `src/components/Navigation.tsx`
- Create: `src/components/Seo.tsx`
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/CurriculumPage.tsx`
- Create: `src/pages/PhilosophyPage.tsx`
- Create: `src/pages/GalleryPage.tsx`
- Create: `src/pages/LocationPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `src/index.tsx`
- Delete: `src/renderer.tsx`
- Modify: `tests/routes.test.ts`

**Interfaces:**
- Produces: `createApp(dependencies?)`, named page components, shared `Layout`
- Consumes: `PUBLIC_ROUTES`, `getPageMeta`, `fetchBlogPosts`

- [ ] **Step 1: Add a characterization test for heading/content preservation**

For each route, assert its current unique heading/text before moving JSX:

```ts
const contentMarkers = [
  ['/', '금관악기 전문 교육'],
  ['/curriculum', '실기 과정'],
  ['/philosophy', '교육철학'],
  ['/gallery', '학원의 순간들'],
  ['/location', '찾아오시는 길'],
] as const

it.each(contentMarkers)('preserves route content for %s', async (path, marker) => {
  const response = await app.request(`https://example.com${path}`)
  expect(await response.text()).toContain(marker)
})
```

Run and confirm all characterization assertions pass before moving code.

- [ ] **Step 2: Move each route body unchanged into its page module**

Move these current ranges without copy edits:

- Home route body: `src/index.tsx:81-320` → `HomePage.tsx`
- Curriculum route body: `src/index.tsx:321-721` → `CurriculumPage.tsx`
- Philosophy route body: `src/index.tsx:722-821` → `PhilosophyPage.tsx`
- Gallery route body: `src/index.tsx:822-921` → `GalleryPage.tsx`
- Location route body: `src/index.tsx:922-1062` → `LocationPage.tsx`
- 404 JSX: `src/index.tsx:1063-1131` → `NotFoundPage.tsx`

`HomePage` accepts `posts: BlogPost[]`; the other page components take no props.

- [ ] **Step 3: Split layout/navigation and create the app factory**

`src/app.tsx` exports:

```ts
export type AppDependencies = {
  getBlogPosts?: typeof fetchBlogPosts
}

export function createApp(dependencies: AppDependencies = {}): Hono<{ Bindings: Bindings }> {
  const app = new Hono<{ Bindings: Bindings }>()
  const getBlogPosts = dependencies.getBlogPosts ?? fetchBlogPosts
  // register middleware, five pages, sitemap, robots, API, and notFound
  return app
}
```

`src/index.tsx` becomes:

```ts
import { createApp } from './app'

const app = createApp()

export { createApp }
export default app
```

- [ ] **Step 4: Verify no content regression and commit**

```bash
npm test
npm run build
test "$(wc -l < src/index.tsx | tr -d ' ')" -lt 20
git add src tests
git commit -m "refactor: split homepage routes into focused modules"
```

---

### Task 5: Remove runtime Tailwind and clear production dependency advisories

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `styles/tailwind.css`
- Create: `tailwind.config.cjs`
- Create: `scripts/build-css.mjs`
- Modify: `src/components/Layout.tsx`
- Delete: `public/static/tailwind-config.js`
- Create: `tests/build-output.test.ts`

**Interfaces:**
- Produces: `public/static/tailwind.css` during build
- Consumes: class names from `src/**/*.tsx` and `public/static/app.js`

- [ ] **Step 1: Write a failing production-markup test**

```ts
it('uses local compiled CSS without the Tailwind runtime CDN', async () => {
  const response = await app.request('https://example.com/')
  const html = await response.text()
  expect(html).toContain('href="/static/tailwind.css"')
  expect(html).not.toContain('cdn.tailwindcss.com')
  expect(html).not.toContain('/static/tailwind-config.js')
})
```

Run and confirm it fails on the CDN script.

- [ ] **Step 2: Upgrade Hono and install Tailwind 3 CLI dependencies**

```bash
npm install hono@4.12.30
npm install --save-dev tailwindcss@3.4.19 postcss@8 autoprefixer@10
```

Set scripts:

```json
{
  "build:css": "node scripts/build-css.mjs",
  "build": "npm run build:css && vite build"
}
```

- [ ] **Step 3: Configure deterministic CSS generation**

`styles/tailwind.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`tailwind.config.cjs` must preserve every color, font, and shadow token from the existing `public/static/tailwind-config.js` and scan:

```js
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './public/static/app.js'],
  theme: {
    extend: {
      colors: {
        gold: { 50: '#FAF8F0', 100: '#F4E4B7', 200: '#E6C86F', 300: '#D4AF37', 400: '#C5A572', 500: '#D4AF37', 600: '#B8941C', 700: '#A67C1A', 800: '#8B6515', 900: '#6F5010' },
        navy: { 50: '#E8ECF1', 100: '#C5D2E0', 200: '#8FA9C8', 300: '#5A7FA0', 400: '#3A5A7F', 500: '#1E3A5F', 600: '#2C5F8D', 700: '#173050', 800: '#1E3A5F', 900: '#0F1E3A' },
        bronze: { 400: '#E09856', 500: '#CD7F32', 600: '#B56F2A' },
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Sans KR', 'serif'],
        sans: ['Noto Sans KR', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cursive: ['Dancing Script', 'cursive'],
      },
      boxShadow: {
        gold: '0 4px 20px rgba(212, 175, 55, 0.2)',
        navy: '0 4px 20px rgba(30, 58, 95, 0.2)',
        premium: '0 10px 40px rgba(30, 58, 95, 0.1), 0 2px 8px rgba(212, 175, 55, 0.1)',
      },
    },
  },
  plugins: [],
}
```

Create `scripts/build-css.mjs`:

```js
import { spawnSync } from 'node:child_process'

const executable = process.platform === 'win32'
  ? 'node_modules/.bin/tailwindcss.cmd'
  : 'node_modules/.bin/tailwindcss'
const result = spawnSync(
  executable,
  ['-c', 'tailwind.config.cjs', '-i', 'styles/tailwind.css', '-o', 'public/static/tailwind.css', '--minify'],
  { stdio: 'inherit' },
)

process.exit(result.status ?? 1)
```

- [ ] **Step 4: Switch the layout to compiled CSS**

Remove both Tailwind scripts and link `/static/tailwind.css` before `/static/style.css`.

- [ ] **Step 5: Verify dependencies/build and commit**

```bash
npm test
npm run build
npm audit --omit=dev
test -s public/static/tailwind.css
git add package.json package-lock.json styles tailwind.config.cjs scripts src public/static/tailwind.css tests
git add -u public/static/tailwind-config.js
git commit -m "build: compile Tailwind and update Hono"
```

Expected: production audit reports 0 vulnerabilities; HTML contains no Tailwind CDN.

---

### Task 6: Apply balanced UI/UX, accessibility, and Emil motion rules

**Files:**
- Modify: `src/components/Layout.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/CurriculumPage.tsx`
- Modify: `src/pages/LocationPage.tsx`
- Modify: `public/static/style.css`
- Modify: `public/static/app.js`
- Create: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Produces: active navigation, skip link, accessible tabs/menu, safe hero contrast, explicit booking microcopy, reduced-motion styles
- Consumes: `SITE.reservationUrl`, `SITE.phone`, current pathname

- [ ] **Step 1: Write failing structure tests**

Assert the home and curriculum HTML contains:

```ts
expect(homeHtml).toContain('href="#main-content"')
expect(homeHtml).toContain('id="main-content"')
expect(homeHtml).toContain('네이버 예약으로 이동합니다')
expect(curriculumHtml).toContain('role="tablist"')
expect(curriculumHtml).toContain('aria-selected="true"')
expect(locationHtml).toContain('5호선 상일동역')
expect(locationHtml).not.toContain('9호선 상일동역')
```

Assert `/gallery` has `aria-current="page"` only on the gallery link.

Run and confirm failures.

- [ ] **Step 2: Improve the layout and navigation semantics**

- Add a focusable skip link before navigation and `id="main-content"` to main.
- Generate desktop/mobile nav links from `PUBLIC_ROUTES`.
- Set `aria-current="page"` on the exact active route.
- Keep five desktop links and the existing mobile menu design.
- Use two visible hamburger lines that morph to an X with `aria-expanded`; update the accessible name between `메뉴 열기` and `메뉴 닫기`.
- Close on Escape and outside pointerdown without cloning DOM nodes.

- [ ] **Step 3: Improve the home evaluation and booking flow**

- Strengthen the existing hero scrim rather than replacing the video/photo.
- Keep `원데이 클래스 예약` primary and `커리큘럼 보기` secondary.
- Add the external-navigation microcopy below the CTA.
- Rewrite the existing offer intro into these three scannable statements: `트럼펫·호른·트롬본·유포늄을 배우는 금관악기 전문 교육`, `기초부터 입시·오디션까지 이어지는 단계별 커리큘럼`, and `레슨과 개인 연습에 집중할 수 있는 전용 공간`.
- Add one inline booking band after the education-value section: title `처음이라도 괜찮습니다`, body `원데이 클래스로 악기와 수업 방식을 먼저 만나보세요.`, primary action `네이버에서 원데이 클래스 예약`, and secondary `전화로 상담하기` using `tel:`.
- Do not create a sticky/floating CTA.

- [ ] **Step 4: Apply Emil motion and accessibility rules**

Define the exact tokens from the design spec. Replace `transition: all`, inline `onmouseover/onmouseout`, ungated hover transforms, and global section observer behavior. Add:

```css
@media (hover: hover) and (pointer: fine) {
  .interactive-card:hover { transform: translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
  }
  .reveal,
  .hero-title,
  .hero-subtitle,
  .hero-buttons {
    animation: none !important;
    transform: none !important;
  }
}
```

Delete scroll-progress JavaScript and markup. Observe only elements with a deliberate `.reveal` class. Buttons use `transform 160ms var(--ease-out)` and `scale(0.97)` on active.

- [ ] **Step 5: Make curriculum tabs keyboard-accessible**

Add `role="tablist"`, `role="tab"`, `aria-controls`, `aria-selected`, `tabindex`, and `role="tabpanel"`. In `app.js`, support Left/Right/Home/End, update selection state, move focus, and keep panels synchronized.

- [ ] **Step 6: Run tests, capture visual evidence, and commit**

```bash
npm test
npm run build
npm run dev -- --host 127.0.0.1
playwright screenshot --browser=chromium --viewport-size=1440,1000 --full-page http://127.0.0.1:5173/ /tmp/little-brass-desktop.png
playwright screenshot --browser=chromium --viewport-size=390,844 --full-page http://127.0.0.1:5173/ /tmp/little-brass-mobile.png
git add src public/static tests
git commit -m "feat: refine homepage UX and accessible motion"
```

Inspect both screenshots before committing; verify no clipped navigation, overlapping CTA, or unreadable hero text.

---

### Task 7: Optimize images and hero video

**Files:**
- Modify: `scripts/optimize-images.mjs`
- Create: `public/static/images/**/*.webp`
- Create: `public/static/videos/hero-poster.webp`
- Modify: `public/static/videos/hero-video.mp4`
- Modify: `src/pages/*.tsx`
- Create: `tests/assets.test.ts`

**Interfaces:**
- Produces: WebP images with dimensions, poster under 160KB, hero MP4 target under 3.5MB
- Consumes: original JPEG/PNG assets as source material

- [ ] **Step 1: Write failing asset-budget tests**

Use `node:fs` in Vitest to assert:

```ts
expect(statSync('public/static/videos/hero-video.mp4').size).toBeLessThanOrEqual(3_500_000)
expect(statSync('public/static/videos/hero-poster.webp').size).toBeLessThanOrEqual(160_000)
```

Request the home/gallery pages and assert lower-page images use `.webp`, `loading="lazy"`, `decoding="async"`, and dimensions. Run and confirm failure.

- [ ] **Step 2: Extend the Sharp script and generate WebP assets**

For academy photos, generate WebP at quality 80 and max width 1600. For instrument images, generate WebP at quality 82 and max width 1200. Preserve aspect ratio and do not upscale.

- [ ] **Step 3: Re-encode the hero video and generate poster**

Run two-pass visual checks while targeting the size budget:

```bash
ffmpeg -y -i public/static/videos/hero-video.mp4 -vf "scale='min(1280,iw)':-2" -c:v libx264 -preset slow -crf 28 -movflags +faststart -an /tmp/hero-video.mp4
mv /tmp/hero-video.mp4 public/static/videos/hero-video.mp4
ffmpeg -y -ss 00:00:01 -i public/static/videos/hero-video.mp4 -frames:v 1 -vf "scale=1280:-2" /tmp/hero-poster.png
node scripts/optimize-images.mjs --poster /tmp/hero-poster.png
```

If the MP4 is over 3.5MB, use CRF 29. If visible banding or face/instrument artifacts are present, use CRF 27 and document the resulting exception rather than shipping damaged video.

- [ ] **Step 4: Update page markup with responsive asset behavior**

- Hero video: `poster`, `preload="metadata"`, `aria-hidden="true"`, JSX markup rather than `dangerouslySetInnerHTML`.
- First meaningful/LCP image: eager, no lazy attribute.
- All lower images: WebP, `loading="lazy"`, `decoding="async"`, intrinsic dimensions or aspect ratio.
- Decorative CTA background images: empty alt.

- [ ] **Step 5: Verify budgets and commit**

```bash
npm test -- tests/assets.test.ts
npm test
npm run build
du -sh public
git add scripts public src tests
git commit -m "perf: optimize homepage media assets"
```

---

### Task 8: Update documentation and run final production verification

**Files:**
- Modify: `README.md`
- Create: `docs/deployment/custom-domain-checklist.md`
- Modify: `LAUNCH_CHECKLIST.md` only if present; otherwise do not create it
- Modify: `.gitignore` only for generated local screenshots if needed

**Interfaces:**
- Produces: accurate five-route README, current commands, Cloudflare domain handoff checklist
- Consumes: final package scripts and `PUBLIC_SITE_URL` behavior

- [ ] **Step 1: Rewrite README against the final implementation**

Document exactly:

- five implemented pages
- current Pages URL
- `npm ci`, `npm run dev`, `npm test`, `npm run build`, `npm run deploy`
- Hono/Vite/Tailwind build-time architecture
- Naver reservation/blog integration
- asset optimization script
- `PUBLIC_SITE_URL` behavior

Remove claims for missing pages, a contact API, unimplemented maps, and stale sandbox URLs.

- [ ] **Step 2: Write the custom-domain checklist**

Include this order:

1. Deploy and smoke-test the final `main` build on `*.pages.dev`.
2. Add `littlebrass.com` through Pages → Custom domains before changing DNS records.
3. Add the apex domain to the same Cloudflare account/zone and point nameservers as Cloudflare instructs.
4. Add `www.littlebrass.com`; choose `https://littlebrass.com` as canonical.
5. Set production `PUBLIC_SITE_URL=https://littlebrass.com` and redeploy.
6. Redirect `www` and production `*.pages.dev` to the apex domain.
7. Verify SSL, canonical, OG, sitemap, robots, all five pages, and real 404s.
8. Submit the final sitemap to search consoles only after redirects are stable.

- [ ] **Step 3: Run the full verification gate from a clean install**

```bash
git status --short
npm ci
npm test
npm run build
npm audit --omit=dev
git diff --check origin/main...HEAD
```

Start the built preview and verify status/title/assets:

```bash
npx wrangler pages dev dist --ip 127.0.0.1 --port 3000
for path in / /curriculum /philosophy /gallery /location /missing /sitemap.xml /robots.txt /favicon.svg; do
  curl -sS -o /tmp/lb-response -w "$path %{http_code} %{size_download}\n" "http://127.0.0.1:3000$path"
done
```

Expected: five pages 200, `/missing` 404, sitemap/robots/favicon 200, tests 0 failures, build exit 0, production audit 0 vulnerabilities.

- [ ] **Step 4: Run the final Emil animation review**

Audit the final diff against `review-animations`: no `transition: all`, no `ease-in` on UI, no layout-property animation, reduced-motion present, hover gated, press feedback 100–160ms, and UI durations under 300ms. Any blocking finding is fixed and re-verified before completion.

- [ ] **Step 5: Commit documentation and final verification fixes**

```bash
git add README.md docs .gitignore
git commit -m "docs: align homepage and domain handoff guidance"
```

Final handoff must report test count, build result, audit result, final asset sizes, commits created, and the remaining external-only domain steps.
