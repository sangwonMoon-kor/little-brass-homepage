# Little Brass Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic premium landing-page aesthetic with a Korean-first editorial music-academy system, while reducing the visual footprint of real academy photos on the homepage.

**Architecture:** Keep the existing Hono JSX routes and static asset pipeline. Introduce one reusable `PageIntro` component, convert page markup to semantic editorial class names, normalize the repeated curriculum content into typed data rendered by small local components, and replace the legacy stylesheet with a focused token-driven stylesheet. Preserve route contracts, external links, tab behavior, SEO, and optimized media.

**Tech Stack:** Hono JSX, TypeScript, vanilla CSS, vanilla browser JavaScript, Vitest, Vite, Cloudflare Pages

## Global Constraints

- Keep all five public routes and their existing canonical metadata.
- Keep the existing hero video, real academy photos, optimized WebP assets, reservation URL, phone, email, social links, and Naver Map link.
- Do not add a CMS, UI framework, animation library, or new runtime dependency.
- Use `Noto Serif KR` for Korean headings, `Noto Sans KR` for body/UI, and `Cormorant Garamond` only for the brand wordmark.
- Remove `Dancing Script`, repeated italic `Playfair Display`, decorative gradients, decorative shadows, pill buttons, circular icon backgrounds, and generic equal-card grids.
- Use Paper `#F4F0E8`, Surface `#FCFAF6`, Ink `#20221F`, Muted Ink `#62645E`, Brass `#9A7428`, Rule `#D8D1C4`, and Deep Ink `#171916`.
- Keep UI motion under 300ms, use `transform` and `opacity`, preserve `scale(0.97)` press feedback, gate hover to fine pointers, and provide reduced-motion behavior.
- Bound homepage academy imagery: proof images max `420px`, space lead image max `500px`, supporting images max `280px` desktop; max `320px` and `240px` respectively on mobile.
- Maintain one `h1` per page, keyboard-visible focus, 44px touch targets, image dimensions, lazy loading below the fold, and descriptive Korean alt/caption text.

---

## File Map

- Create `src/components/PageIntro.tsx`: reusable editorial header for curriculum, philosophy, gallery, and location pages.
- Modify `src/components/Navigation.tsx`: simplified global navigation with one booking action and no top information bar.
- Modify `src/components/Layout.tsx`: reduced font payload and compact editorial footer.
- Modify `src/pages/HomePage.tsx`: editorial hero, instrument index, compact proof rows, bounded academy gallery, news list, and restrained CTA.
- Modify `src/pages/PhilosophyPage.tsx`: narrative director, name, values, and proof sections without icon cards.
- Modify `src/pages/CurriculumPage.tsx`: typed curriculum data, tabs, stage rows, theory and lesson information without repeated cards.
- Modify `src/pages/GalleryPage.tsx`: captioned asymmetric gallery with bounded image tracks.
- Modify `src/pages/LocationPage.tsx`: operational information and transport lists without circular icon cards.
- Modify `src/pages/NotFoundPage.tsx`: align the error page with the same editorial system.
- Replace `public/static/style.css`: focused responsive design system and page-specific layout.
- Modify `public/static/app.js`: adapt navigation scroll state to the simplified shell while retaining accessible menu, video, reveal, and tabs.
- Modify `tests/accessibility-structure.test.ts`: assert Korean-first structural and booking contracts.
- Modify `tests/assets.test.ts`: assert bounded academy image CSS and optimized asset contracts.
- Modify `tests/build-output.test.ts`: assert removed AI-template dependencies/patterns and compositor-safe motion.

---

### Task 1: Lock the Editorial Design Contracts

**Files:**
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/assets.test.ts`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: HTML returned by `createApp()` and `public/static/style.css`.
- Produces: regression contracts used by every later task.

- [ ] **Step 1: Add failing structure assertions**

Add the following cases to `tests/accessibility-structure.test.ts`:

```ts
it('uses Korean-first editorial page introductions', async () => {
  for (const path of ['/curriculum', '/philosophy', '/gallery', '/location']) {
    const html = await page(path)
    expect(html).toContain('class="page-intro')
    expect(html).not.toContain('Dancing Script')
  }
})

it('keeps the homepage booking path explicit without competing primary buttons', async () => {
  const html = await page('/')
  expect(html).toContain('금관악기를 처음 만나는 곳')
  expect(html).toContain('원데이 클래스 예약')
  expect(html).toContain('네이버 예약으로 이동합니다')
  expect(html).toContain('class="text-link')
})
```

- [ ] **Step 2: Add failing visual-budget assertions**

Replace the legacy gallery-track test in `tests/assets.test.ts` with:

```ts
it('bounds homepage academy photography at desktop and mobile sizes', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')
  expect(styles).toContain('--home-proof-image-max: 420px;')
  expect(styles).toContain('--home-space-lead-max: 500px;')
  expect(styles).toContain('--home-space-support-max: 280px;')
  expect(styles).toContain('--home-proof-image-max: 320px;')
  expect(styles).toContain('--home-space-support-max: 240px;')
})
```

Add this case to `tests/build-output.test.ts`:

```ts
it('removes generic premium-template typography and motion patterns', async () => {
  const html = await (await app.request('https://example.com/')).text()
  const styles = readFileSync('public/static/style.css', 'utf8')
  expect(html).not.toContain('Dancing+Script')
  expect(styles).not.toContain('transition: all')
  expect(styles).not.toContain('linear-gradient')
  expect(styles).not.toContain('border-radius: 9999px')
})
```

- [ ] **Step 3: Verify the new contracts fail**

Run: `npm test -- tests/accessibility-structure.test.ts tests/assets.test.ts tests/build-output.test.ts`

Expected: FAIL because `page-intro`, the Korean hero copy, photo-size variables, and simplified font contract do not exist yet.

- [ ] **Step 4: Commit the tests**

Run:

```bash
git add tests/accessibility-structure.test.ts tests/assets.test.ts tests/build-output.test.ts
git commit -m "test: define editorial redesign contracts"
```

---

### Task 2: Build the Shared Editorial Shell

**Files:**
- Create: `src/components/PageIntro.tsx`
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Layout.tsx`
- Modify: `public/static/app.js`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: `PUBLIC_ROUTES`, `SITE`, route `pathname`, and existing mobile menu IDs.
- Produces: `PageIntro(props: PageIntroProps)`, `.site-nav`, `.page-intro`, `.site-footer`, `.button`, `.text-link`, and shared editorial tokens.

- [ ] **Step 1: Create the reusable page intro**

Create `src/components/PageIntro.tsx` with this interface and markup:

```tsx
type PageIntroProps = {
  index: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}

export function PageIntro(props: PageIntroProps) {
  return (
    <header class={`page-intro${props.image ? ' page-intro-with-image' : ''}`}>
      <div class="page-intro-inner">
        <div class="page-intro-copy">
          <p class="page-index" aria-hidden="true">{props.index}</p>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        {props.image ? (
          <figure class="page-intro-media">
            <img src={props.image} alt={props.imageAlt || ''} width={props.imageWidth} height={props.imageHeight} decoding="async" fetchpriority="high" />
          </figure>
        ) : null}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Simplify navigation and footer markup**

Keep `main-nav`, `mobile-menu-button`, and `mobile-menu` IDs for `app.js`. Remove `top-info-bar`, Font Awesome icons, and the three-column footer. Add a single desktop `.nav-booking-link` and compact footer groups for identity, contact, and actions. Load only:

```html
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap
```

- [ ] **Step 3: Replace stylesheet foundations**

Define the exact tokens below at `:root`, followed by reset, typography, focus, container, navigation, footer, button, link, page intro, reveal, and responsive rules:

```css
:root {
  --paper: #f4f0e8;
  --surface: #fcfaf6;
  --ink: #20221f;
  --muted-ink: #62645e;
  --brass: #9a7428;
  --rule: #d8d1c4;
  --deep-ink: #171916;
  --content-max: 1180px;
  --reading-max: 720px;
  --home-proof-image-max: 420px;
  --home-space-lead-max: 500px;
  --home-space-support-max: 280px;
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-press: 140ms;
  --duration-ui: 220ms;
  --duration-media: 280ms;
}
```

At `max-width: 640px`, override photo variables with:

```css
:root {
  --home-proof-image-max: 320px;
  --home-space-lead-max: 320px;
  --home-space-support-max: 240px;
}
```

- [ ] **Step 4: Adapt navigation behavior**

In `initNavigationScrollState`, remove all `topInfoBar` work. Toggle `.nav-scrolled` when `window.scrollY > 48`, keeping the `requestAnimationFrame` throttle and applying the function only on `/`.

- [ ] **Step 5: Run focused tests and typecheck**

Run: `npm test -- tests/accessibility-structure.test.ts tests/build-output.test.ts && npm run typecheck`

Expected: page-intro tests still fail until routes use `PageIntro`; typography and motion assertions pass; typecheck passes.

- [ ] **Step 6: Commit the shared shell**

Run:

```bash
git add src/components/PageIntro.tsx src/components/Navigation.tsx src/components/Layout.tsx public/static/app.js public/static/style.css
git commit -m "feat: add editorial site shell"
```

---

### Task 3: Redesign the Homepage and Bound Academy Photography

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `public/static/style.css`
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/assets.test.ts`

**Interfaces:**
- Consumes: `HomePageProps.posts`, `SITE.reservationUrl`, `SITE.phone`, hero video/poster, instrument WebPs, and academy WebPs.
- Produces: `.home-hero`, `.instrument-index`, `.proof-list`, `.proof-row`, `.home-space-grid`, `.news-list`, and `.home-cta`.

- [ ] **Step 1: Add the homepage image-structure assertion**

Add to `tests/assets.test.ts`:

```ts
it('uses a bounded captioned academy gallery on the homepage', async () => {
  const home = await (await app.request('https://example.com/')).text()
  expect(home).toContain('class="home-space-grid')
  expect(home).toContain('class="space-caption')
  expect(home).not.toContain('class="image-overlay')
})
```

Run: `npm test -- tests/assets.test.ts`

Expected: FAIL because the legacy gallery still uses image overlays.

- [ ] **Step 2: Replace the hero and instrument cards**

Use a left-bottom `.home-hero-content` containing the eyebrow `서울 강동구 · 금관악기 전문`, the `h1` text `금관악기를 처음 만나는 곳, 리틀브라스`, one booking button, one curriculum `.text-link`, and the external booking note. Replace four instrument image cards with one trumpet figure and a semantic list for 트럼펫, 호른, 트롬본, 유포늄.

- [ ] **Step 3: Replace large zigzag rows and booking card**

Render a three-item `.proof-list` with numbered rows. Use `/static/images/academy/display-03.webp` and `/static/images/academy/display-02.webp` only for the first two rows; leave the online/offline row typographic. Place the booking prompt in `.booking-line` with one button and one phone `.text-link`.

- [ ] **Step 4: Build the bounded academy gallery and news list**

Use lobby as the 16:10 lead figure and practice/lesson rooms as 4:3 support figures, with Korean figcaptions below the images. Render posts as divided `.news-row` links rather than cards, preserving fallback content and the Naver Blog link.

- [ ] **Step 5: Replace the photographic final CTA**

Use a plain `.home-cta` section containing the consultation sentence, one booking button, and no background image or overlay.

- [ ] **Step 6: Implement responsive image bounds and motion**

Set image containers with `max-height: var(--home-proof-image-max)`, `max-height: var(--home-space-lead-max)`, and `max-height: var(--home-space-support-max)`. Use `object-fit: cover`, no gradient overlays, no shadows, and only a 280ms fine-pointer image scale from `1` to `1.015` where useful.

- [ ] **Step 7: Run homepage tests**

Run: `npm test -- tests/accessibility-structure.test.ts tests/assets.test.ts tests/routes.test.ts`

Expected: PASS.

- [ ] **Step 8: Commit the homepage**

Run:

```bash
git add src/pages/HomePage.tsx public/static/style.css tests/accessibility-structure.test.ts tests/assets.test.ts
git commit -m "feat: redesign editorial homepage"
```

---

### Task 4: Redesign Philosophy, Gallery, and Location Pages

**Files:**
- Modify: `src/pages/PhilosophyPage.tsx`
- Modify: `src/pages/GalleryPage.tsx`
- Modify: `src/pages/LocationPage.tsx`
- Modify: `public/static/style.css`
- Modify: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Consumes: `PageIntro`, academy WebPs, `SITE` contact fields, reservation URL, and Naver Map URL.
- Produces: `.narrative-split`, `.numbered-list`, `.editorial-gallery`, `.contact-ledger`, and `.transport-list`.

- [ ] **Step 1: Apply `PageIntro` to all three pages**

Use indices `02`, `03`, and `04` for philosophy, gallery, and location. Use one restrained image in each intro, bounded by `.page-intro-media`; remove overlay banners and all English script labels.

- [ ] **Step 2: Convert philosophy cards into reading sections**

Keep the director introduction, explanation of the Little Brass name, three educational values, and four differentiators. Render values/differentiators as divided numbered lists, and remove Font Awesome icons, dark full-width story bands, rounded cards, and unsupported superlative copy.

- [ ] **Step 3: Convert gallery to captioned editorial figures**

Render one lead figure and five supporting figures in an asymmetric CSS grid. Keep all optimized WebPs and dimensions, remove overlay labels, and add Korean figcaptions.

- [ ] **Step 4: Convert location to operational ledgers**

Place address, phone, email, hours, booking, and map action before transport. Render subway, bus, and parking as three divided rows with text labels instead of icons/cards. Preserve `5호선 상일동역 3번 출구 도보 5분`.

- [ ] **Step 5: Run route and accessibility tests**

Run: `npm test -- tests/routes.test.ts tests/accessibility-structure.test.ts tests/assets.test.ts && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: Commit the supporting pages**

Run:

```bash
git add src/pages/PhilosophyPage.tsx src/pages/GalleryPage.tsx src/pages/LocationPage.tsx public/static/style.css
git commit -m "feat: redesign editorial information pages"
```

---

### Task 5: Normalize and Redesign the Curriculum

**Files:**
- Modify: `src/pages/CurriculumPage.tsx`
- Modify: `public/static/style.css`
- Modify: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Consumes: `PageIntro`, `initCurriculumTabs()` ARIA expectations, and existing lesson facts.
- Produces: local `Instrument`, `Stage`, `instrumentCurricula`, `StageList`, `.curriculum-tabs`, `.stage-list`, `.theory-split`, and `.lesson-ledger`.

- [ ] **Step 1: Define typed curriculum data**

Create local types:

```ts
type Stage = {
  level: string
  duration: string
  summary: string
  goals: string
  contents: string
  audience: string
}

type Instrument = {
  id: 'trumpet' | 'horn' | 'trombone' | 'euphonium'
  name: string
  character: string
  stages: Stage[]
}
```

Move every existing stage's duration, summary, goals, contents, and audience into `instrumentCurricula` so content is preserved without duplicated JSX.

- [ ] **Step 2: Render accessible tabs and stage rows**

Keep the existing `tab-*`/`tab-content-*` IDs, `role="tablist"`, `role="tab"`, `aria-controls`, `aria-selected`, and `role="tabpanel"`. Render each stage as a divided row with a two-digit index, level/duration, and a definition list for goals, contents, and audience. Do not render achievement badges or circular icons.

- [ ] **Step 3: Redesign theory and lesson information**

Use one bounded 4:3 theory image beside a reading column. Render personal lessons, one-day class, and instrument rental as a three-row `.lesson-ledger`, keeping times, prices, reservation facts, and `/location` consultation link.

- [ ] **Step 4: Verify tab and content contracts**

Run: `npm test -- tests/accessibility-structure.test.ts tests/routes.test.ts && npm run typecheck`

Expected: PASS with exactly one `h1`, accessible tabs, and the `실기 과정` route marker.

- [ ] **Step 5: Commit curriculum redesign**

Run:

```bash
git add src/pages/CurriculumPage.tsx public/static/style.css
git commit -m "feat: simplify curriculum presentation"
```

---

### Task 6: Final Polish, Visual QA, and Release

**Files:**
- Modify: `src/pages/NotFoundPage.tsx`
- Modify: `public/static/style.css`
- Modify: any page above only when visual QA finds a concrete regression

**Interfaces:**
- Consumes: completed editorial pages and production build.
- Produces: visually verified 1440px, 768px, and 390px output ready for GitHub Pages/Cloudflare deployment.

- [ ] **Step 1: Align the 404 page**

Replace decorative cards/icons with a centered editorial error code, Korean explanation, and one rectangular home button. Keep `페이지를 찾을 수 없습니다` for the route contract.

- [ ] **Step 2: Run automated verification**

Run:

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

Expected: all tests pass, typecheck exits 0, Vite build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 3: Run production preview and inspect breakpoints**

Run: `npm run preview -- --port 4173`

Inspect `/`, `/curriculum`, `/philosophy`, `/gallery`, and `/location` at widths 1440, 768, and 390. Confirm navigation, tab keyboard behavior, text wrapping, image cropping, focus states, links, and that homepage academy images stay within the specified bounds.

- [ ] **Step 4: Scan for removed AI-template markers**

Run:

```bash
rg -n "Dancing Script|linear-gradient|transition: all|rounded-full|image-overlay|feature-card|interactive-card" src public/static/style.css
```

Expected: no matches.

- [ ] **Step 5: Commit final polish**

Run:

```bash
git add src/pages/NotFoundPage.tsx public/static/style.css src/pages tests
git commit -m "fix: finish responsive editorial polish"
```

- [ ] **Step 6: Push the completed main branch**

Run: `git push origin main`

Expected: `main -> main` succeeds and the working tree is clean.

---

## Self-Review

- Spec coverage: shared visual tokens, Korean-first typography, simplified navigation/footer, homepage photo bounds, homepage section redesign, four subpage redesigns, curriculum normalization, motion, accessibility, responsive behavior, and final release are each assigned to a task.
- Placeholder scan: every implementation step names concrete markup, CSS contracts, or data fields.
- Type consistency: `PageIntroProps`, `Stage`, `Instrument`, tab IDs, class names, and test selectors are used consistently across tasks.
