# Homepage Visual Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 승인된 화이트·Navy·Brass 홈 화면과 최종 보정 학원 사진을 실제 Hono JSX 홈페이지에 구현한다.

**Architecture:** 기존 Hono JSX 라우팅과 `SITE` 설정을 유지하면서 홈 전용 마크업을 `HomePage.tsx`에서 재구성한다. 공통 내비게이션과 푸터는 `pathname === '/'`일 때만 예약 중복을 제거하고, 홈 스타일은 기존 하위 페이지 스타일을 건드리지 않는 `.home-*` 선택자로 덮어쓴다.

**Tech Stack:** Hono JSX, TypeScript, CSS, Vitest, Sharp, Vite, Cloudflare Pages

## Global Constraints

- 홈 기본 배경은 `#FFFFFF`, Navy는 `#102B4E`, Deep Navy는 `#0A1C33`, Brass는 `#B79035`, Rule은 `#DEDEDE`를 사용한다.
- 히어로 영상 위에는 제목·설명·버튼을 올리지 않는다.
- 홈에서 `SITE.reservationUrl`을 사용하는 사용자 노출 링크는 히어로 소개와 최종 CTA의 정확히 두 개다.
- 교육 기준에는 승인된 `brand-wall-01.webp`를 사용하고 CSS로 다시 확대 크롭하지 않는다.
- 중간 예약 띠와 최종 CTA 사진을 제거한다.
- 새 UI 프레임워크, 모션 라이브러리 또는 런타임 의존성을 추가하지 않는다.
- `1440px`, `768px`, `390px`에서 가로 넘침이 없어야 한다.

---

### Task 1: 홈 구조 회귀 테스트

**Files:**
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/assets.test.ts`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `createApp()`가 반환하는 홈 HTML 문자열
- Produces: 예약 링크 수, 새 섹션 클래스, 승인 이미지와 CSS 토큰에 대한 회귀 계약

- [ ] **Step 1: 새 홈 구조를 요구하는 실패 테스트를 작성한다**

```ts
it('shows exactly two booking links on the homepage', async () => {
  const html = await page('/')
  const escapedUrl = SITE.reservationUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  expect(html.match(new RegExp(`href="${escapedUrl}"`, 'g')) ?? []).toHaveLength(2)
  expect(html).not.toContain('class="nav-booking-link"')
  expect(html).not.toContain('class="mobile-booking-link"')
  expect(html).not.toContain('>네이버 예약</a>')
})

it('uses the approved homepage sequence', async () => {
  const html = await page('/')
  expect(html).toContain('class="home-video-stage"')
  expect(html).toContain('class="home-hero-intro"')
  expect(html).toContain('class="instrument-band"')
  expect(html).toContain('class="instrument-cards"')
  expect(html).toContain('class="home-education"')
  expect(html).toContain('class="home-space"')
  expect(html).toContain('class="home-news"')
  expect(html).toContain('class="home-cta"')
})
```

- [ ] **Step 2: 테스트를 실행해 기존 마크업 때문에 실패하는지 확인한다**

Run: `npm test -- tests/accessibility-structure.test.ts tests/assets.test.ts tests/build-output.test.ts`

Expected: FAIL — `home-video-stage`, `instrument-band`, `brand-wall-01.webp` 또는 정확히 두 개의 예약 링크 계약이 아직 충족되지 않는다.

- [ ] **Step 3: 승인 이미지 자산 계약을 추가한다**

```ts
it('ships the approved education photograph as an optimized WebP', () => {
  const imagePath = 'public/static/images/academy/brand-wall-01.webp'
  expect(existsSync(imagePath)).toBe(true)
  expect(statSync(imagePath).size).toBeLessThanOrEqual(400_000)
})
```

- [ ] **Step 4: 홈 전용 시각 토큰 계약을 추가한다**

```ts
it('uses the approved white navy brass homepage palette', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')
  expect(styles).toContain('--home-navy: #102b4e;')
  expect(styles).toContain('--home-deep-navy: #0a1c33;')
  expect(styles).toContain('--home-brass: #b79035;')
  expect(styles).toContain('--home-rule: #dedede;')
})
```

- [ ] **Step 5: 테스트만 커밋한다**

```bash
git add tests/accessibility-structure.test.ts tests/assets.test.ts tests/build-output.test.ts
git commit -m "test: define refined homepage contracts"
```

### Task 2: 승인 사진과 홈 JSX 구조

**Files:**
- Create: `public/static/images/academy/brand-wall-01.webp`
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `SITE.reservationUrl`, `BlogPost[]`, 기존 영상·악기·공간 사진
- Produces: CSS가 배치할 `.home-video-stage`, `.home-hero-intro`, `.instrument-band`, `.instrument-cards`, `.home-education`, `.home-space-grid`, `.news-card-grid`, `.home-cta` 구조

- [ ] **Step 1: 승인 PNG를 WebP로 변환한다**

Run:

```bash
node -e "import sharp from 'sharp'; await sharp('/Users/openclaw/.codex/generated_images/019f6456-9d2b-71b2-9395-cd842d911fbf/exec-37e2d16d-aec4-4d87-95d6-9e917642a15b.png').webp({ quality: 88, smartSubsample: true }).toFile('public/static/images/academy/brand-wall-01.webp')"
```

Expected: `brand-wall-01.webp`가 `1155 × 1362` 비율로 생성되고 400KB 이하이다.

- [ ] **Step 2: 홈을 승인된 섹션 순서로 재구성한다**

`HomePage.tsx`의 `instruments` 데이터는 다음 형태로 확장한다.

```ts
const instruments = [
  { name: '트럼펫', english: 'TRUMPET', note: '선명하고 곧은 소리', image: '/static/images/instruments/trumpet.webp' },
  { name: '호른', english: 'HORN', note: '깊고 따뜻한 울림', image: '/static/images/instruments/horn.webp' },
  { name: '트롬본', english: 'TROMBONE', note: '넓고 힘 있는 음색', image: '/static/images/instruments/trombone.webp' },
  { name: '유포늄', english: 'EUPHONIUM', note: '부드럽고 풍성한 소리', image: '/static/images/instruments/euphonium.webp' },
]
```

교육 기준 사진은 다음 정확한 자산과 크기 힌트를 사용한다.

```tsx
<img
  src="/static/images/academy/brand-wall-01.webp"
  alt="리틀브라스 로고와 금관악기가 보이는 학원 진열 공간"
  width="1155"
  height="1362"
  loading="lazy"
  decoding="async"
/>
```

히어로 소개와 최종 CTA에만 `SITE.reservationUrl` 링크를 두고 `booking-line`은 삭제한다.

- [ ] **Step 3: 구조 테스트를 실행한다**

Run: `npm test -- tests/accessibility-structure.test.ts tests/assets.test.ts`

Expected: 새 구조와 이미지 관련 테스트 PASS. CSS 토큰 테스트는 아직 FAIL할 수 있다.

- [ ] **Step 4: 사진과 JSX를 커밋한다**

```bash
git add public/static/images/academy/brand-wall-01.webp src/pages/HomePage.tsx
git commit -m "feat: rebuild homepage content around approved imagery"
```

### Task 3: 홈 예약 중복 제거와 공통 셸

**Files:**
- Modify: `src/components/Navigation.tsx`
- Modify: `src/components/Layout.tsx`
- Test: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Consumes: `pathname: string`
- Produces: 홈에서는 예약 링크가 없는 내비게이션·푸터, 하위 페이지에서는 기존 예약 링크 유지

- [ ] **Step 1: 홈 전용 예약 링크 조건을 구현한다**

`Navigation.tsx`에서는 두 예약 링크를 각각 다음 조건으로 감싼다.

```tsx
{pathname !== '/' && (
  <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="nav-booking-link">
    원데이 클래스
  </a>
)}
```

모바일 예약 링크에도 같은 조건을 사용한다.

- [ ] **Step 2: 홈 정보 띠와 푸터 조건을 구현한다**

`Layout.tsx`에서 `const isHome = pathname === '/'`를 선언하고 내비게이션 앞에 다음을 렌더링한다.

```tsx
{isHome && (
  <div class="site-info-bar">
    <div><span>{SITE.address}</span><a href={`tel:${SITE.phone}`}>{SITE.phone}</a></div>
  </div>
)}
```

푸터의 네이버 예약 링크는 `{!isHome && (...)}` 조건으로 감싼다.

- [ ] **Step 3: 예약 계약 테스트를 실행한다**

Run: `npm test -- tests/accessibility-structure.test.ts`

Expected: 홈 예약 링크는 정확히 2개이고 `/gallery`의 내비게이션 활성 상태는 2개로 유지되어 PASS.

- [ ] **Step 4: 공통 셸 변경을 커밋한다**

```bash
git add src/components/Navigation.tsx src/components/Layout.tsx tests/accessibility-structure.test.ts
git commit -m "feat: simplify homepage booking entry points"
```

### Task 4: 화이트·Navy·Brass 레이아웃과 반응형 구현

**Files:**
- Modify: `public/static/style.css`
- Test: `tests/build-output.test.ts`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Consumes: Task 2의 홈 클래스 구조
- Produces: 1440px/768px/390px에서 승인된 레이아웃과 시각 토큰

- [ ] **Step 1: 홈 토큰과 기본 면을 정의한다**

```css
:root {
  --home-white: #fff;
  --home-navy: #102b4e;
  --home-deep-navy: #0a1c33;
  --home-brass: #b79035;
  --home-muted-brass: #8b681e;
  --home-ink: #17202c;
  --home-muted: #626a73;
  --home-rule: #dedede;
  --home-soft: #f8f8f6;
}

.home-page { overflow: clip; background: var(--home-white); color: var(--home-ink); }
```

- [ ] **Step 2: 데스크톱 홈 레이아웃을 구현한다**

다음 고정 구조를 사용한다.

```css
.home-video-stage { position: relative; aspect-ratio: 16 / 7; min-height: 480px; overflow: hidden; background: var(--home-deep-navy); }
.home-video-stage .hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.home-hero-intro-inner { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(320px, .95fr); gap: 80px; align-items: end; }
.instrument-band-grid { display: grid; grid-template-columns: 1.2fr repeat(4, 1fr); }
.instrument-cards { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.home-education-inner { display: grid; grid-template-columns: minmax(340px, .9fr) minmax(0, 1.1fr); gap: clamp(64px, 9vw, 120px); align-items: center; }
.education-photo { aspect-ratio: 1155 / 1362; overflow: hidden; }
.education-photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.home-space-grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); gap: 14px; }
.news-card-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.home-cta-inner { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(300px, 1fr); gap: 80px; align-items: center; min-height: 352px; }
```

교육 기준은 `border-block: 1px solid var(--home-rule)`만 사용하며 Navy 띠와 사진 테두리는 만들지 않는다.

- [ ] **Step 3: 태블릿과 모바일 접힘을 구현한다**

```css
@media (max-width: 900px) {
  .home-hero-intro-inner, .home-education-inner, .home-cta-inner { grid-template-columns: 1fr; }
  .instrument-band-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .instrument-band-intro { grid-column: 1 / -1; }
  .instrument-cards, .news-card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .home-space-grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1fr); }
}

@media (max-width: 640px) {
  .site-info-bar { display: none; }
  .home-video-stage { min-height: 0; aspect-ratio: 4 / 3; }
  .instrument-cards, .news-card-grid { grid-template-columns: 1fr; }
  .home-space-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .space-lead { grid-column: 1 / -1; }
}
```

- [ ] **Step 4: CSS 회귀 테스트와 전체 검증을 실행한다**

Run: `npm run typecheck && npm test && npm run build`

Expected: 모든 명령 exit 0. CSS에 `linear-gradient`, `transition: all`, `border-radius: 9999px`가 없다.

- [ ] **Step 5: 레이아웃을 커밋한다**

```bash
git add public/static/style.css tests/assets.test.ts tests/build-output.test.ts
git commit -m "feat: apply refined homepage visual system"
```

### Task 5: 실제 화면 검증과 문서 동기화

**Files:**
- Modify: `docs/superpowers/specs/2026-07-16-homepage-visual-refinement-design.md`

**Interfaces:**
- Consumes: 프로덕션 빌드와 로컬 미리보기
- Produces: 승인 기준을 충족하는 최종 홈과 재현 가능한 검증 기록

- [ ] **Step 1: 프로덕션 미리보기를 실행한다**

Run: `npm run build && npx wrangler pages dev dist --ip 127.0.0.1 --port 59058`

Expected: `http://localhost:59058/`에서 홈이 열린다.

- [ ] **Step 2: 1440px, 768px, 390px에서 확인한다**

확인 항목:

- 영상 위에 텍스트가 없다.
- 영상 아래 소개와 첫 예약 버튼이 있다.
- Navy 악기 띠와 네 장의 악기 사진이 중복 설명 없이 이어진다.
- 교육 기준 사진은 로고·진열창·하단 패널만 보이고, 섹션 위아래는 1px 회색 선이다.
- 공간 사진은 데스크톱 한 줄 `2:1:1`, 모바일 대표 한 장 + 보조 두 장이다.
- 중간 예약 띠가 없고 마지막 CTA에는 사진이 없다.
- 홈 예약 링크는 처음과 끝 두 개뿐이다.

- [ ] **Step 3: 최종 검증을 다시 실행한다**

Run: `npm run typecheck && npm test && npm run build && git diff --check`

Expected: 모든 명령 exit 0이고 whitespace 오류가 없다.

- [ ] **Step 4: 문서와 최종 조정을 커밋한다**

```bash
git add docs/superpowers/specs/2026-07-16-homepage-visual-refinement-design.md
git commit -m "docs: record final homepage image treatment"
```
