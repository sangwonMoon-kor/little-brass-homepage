# Little Brass Subpage Visual Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈의 승인된 화이트·Navy·Brass 디자인 언어를 커리큘럼, 교육철학, 갤러리, 찾아오시는 길에 확장하고 페이지별 목적에 맞게 정보 구조와 모바일 밀도를 개선한다.

**Architecture:** 기존 Hono JSX 라우팅, `SITE` 설정과 정적 CSS/JavaScript 구조를 유지한다. `PageIntro`에 소수의 variant와 action slot을 추가하고 각 페이지 JSX를 목적별로 재배치한 뒤, 기존 서브 페이지 CSS를 홈 토큰으로 재매핑한다. 커리큘럼 탭의 기존 접근성 JavaScript는 유지하며 새 런타임 의존성은 추가하지 않는다.

**Tech Stack:** Hono JSX, TypeScript, CSS, vanilla JavaScript, Vitest, Vite, Cloudflare Pages

## Global Constraints

- 서브 페이지 기본 배경은 `#FFFFFF`, Navy는 `#102B4E`, Deep Navy는 `#0A1C33`, Brass는 `#B79035`, Rule은 `#DEDEDE`를 사용한다.
- 홈 화면의 승인된 구조와 예약 링크 두 개 계약은 변경하지 않는다.
- 커리큘럼의 악기 설명은 선택 탭에만 한 번 렌더링한다.
- 갤러리와 찾아오시는 길의 공통 인트로 사진을 제거한다.
- 외부 지도 SDK, UI 프레임워크, 모션 라이브러리와 새 런타임 의존성을 추가하지 않는다.
- `transition: all`, `ease-in`, 그라디언트, 큰 그림자와 둥근 카드 묶음을 사용하지 않는다.
- `1440px`, `768px`, `390px`에서 가로 넘침과 음절 단위 제목 분리가 없어야 한다.

---

### Task 1: 서브 페이지 구조 회귀 테스트

**Files:**
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/assets.test.ts`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `createApp()`가 반환하는 `/curriculum`, `/philosophy`, `/gallery`, `/location` HTML과 `public/static/style.css`
- Produces: 페이지 variant, 커리큘럼 중복 제거, 방문 행동, 화이트·Navy 시각 계약

- [ ] **Step 1: 페이지별 첫 화면과 커리큘럼 중복 제거 테스트를 작성한다**

```ts
it('uses page-specific subpage introductions', async () => {
  const curriculum = await page('/curriculum')
  const gallery = await page('/gallery')
  const location = await page('/location')

  expect(curriculum).toContain('page-intro-curriculum')
  expect(gallery).toContain('page-intro-gallery')
  expect(location).toContain('page-intro-location')
  expect(gallery).not.toContain('page-intro-with-image')
  expect(location).not.toContain('page-intro-with-image')
})

it('combines instrument character and selection in one curriculum control', async () => {
  const html = await page('/curriculum')
  expect(html).not.toContain('class="instrument-guide')
  expect(html.match(/class="curriculum-tab/g)).toHaveLength(4)
  expect(html).toContain('선명하고 곧은 소리')
  expect(html).toContain('깊고 따뜻한 울림')
})

it('puts visit actions before transport details', async () => {
  const html = await page('/location')
  expect(html).toContain('class="location-hero-actions')
  expect(html.indexOf('네이버 지도에서 보기')).toBeLessThan(html.indexOf('학원까지 오는 방법'))
  expect(html).toContain('5층 501호')
})
```

- [ ] **Step 2: 테스트를 실행해 현재 공통 인트로와 중복 목록 때문에 실패하는지 확인한다**

Run: `npm test -- tests/accessibility-structure.test.ts`

Expected: FAIL — `page-intro-gallery`, `location-hero-actions`와 통합된 커리큘럼 탭 마크업이 아직 없다.

- [ ] **Step 3: 자산과 시각 토큰 회귀 테스트를 작성한다**

```ts
it('uses the approved brand wall image in the curriculum intro', async () => {
  const html = await (await app.request('https://example.com/curriculum')).text()
  expect(html).toContain('/static/images/academy/brand-wall-01.webp')
})

it('maps subpages to the homepage white navy brass palette', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')
  expect(styles).toContain('--paper: var(--home-white);')
  expect(styles).toContain('--ink: var(--home-ink);')
  expect(styles).toContain('.name-story {')
  expect(styles).toContain('background: var(--home-navy);')
})
```

- [ ] **Step 4: 테스트만 커밋한다**

```bash
git add tests/accessibility-structure.test.ts tests/assets.test.ts tests/build-output.test.ts
git commit -m "test: define subpage visual contracts"
```

### Task 2: 페이지별 JSX 구조와 공통 인트로

**Files:**
- Modify: `src/components/PageIntro.tsx`
- Modify: `src/pages/CurriculumPage.tsx`
- Modify: `src/pages/PhilosophyPage.tsx`
- Modify: `src/pages/GalleryPage.tsx`
- Modify: `src/pages/LocationPage.tsx`
- Modify: `src/components/Navigation.tsx`

**Interfaces:**
- Consumes: `PageIntroProps`, `SITE`, 기존 `instrumentCurricula`, `galleryImages`, `transport`
- Produces: `PageIntroVariant`, 선택적 `actions`, 페이지별 클래스와 중복 없는 콘텐츠 흐름

- [ ] **Step 1: `PageIntro`에 variant와 actions를 추가한다**

```tsx
import type { Child } from 'hono/jsx'

type PageIntroVariant = 'curriculum' | 'philosophy' | 'gallery' | 'location'

type PageIntroProps = {
  index: string
  title: string
  description: string
  variant: PageIntroVariant
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  actions?: Child
}

export function PageIntro(props: PageIntroProps) {
  return (
    <header class={`page-intro page-intro-${props.variant}${props.image ? ' page-intro-with-image' : ''}`}>
      <div class="page-intro-inner">
        <div class="page-intro-copy">
          <p class="page-index" aria-hidden="true">{props.index}</p>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          {props.actions ? <div class="page-intro-actions">{props.actions}</div> : null}
        </div>
        {props.image ? (
          <figure class="page-intro-media">
            <img
              src={props.image}
              alt={props.imageAlt || ''}
              width={props.imageWidth}
              height={props.imageHeight}
              decoding="async"
              fetchpriority="high"
            />
          </figure>
        ) : null}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: 커리큘럼 인트로 사진을 승인 이미지로 바꾸고 `instrument-guide`를 제거한다**

```tsx
<PageIntro
  index="01"
  variant="curriculum"
  title="커리큘럼"
  description="처음 소리를 내는 과정부터 무대와 입시·오디션까지, 현재 수준과 목표에 맞춰 이어갑니다."
  image="/static/images/academy/brand-wall-01.webp"
  imageAlt="리틀브라스 로고와 금관악기가 보이는 학원 진열 공간"
  imageWidth={1155}
  imageHeight={1362}
/>
```

각 `.curriculum-tab` 안에는 번호, 악기명과 `instrument.character`를 렌더링하고 별도 `instrument-guide` 목록은 삭제한다.

- [ ] **Step 3: 교육철학과 갤러리 구조를 페이지 목적에 맞게 변경한다**

```tsx
<PageIntro
  index="02"
  variant="philosophy"
  title="교육철학"
  description="소리를 서두르지 않고, 한 사람의 호흡과 목표에 맞춰 음악을 오래 이어갈 힘을 만듭니다."
  image="/static/images/academy/lobby-01.webp"
  imageAlt="리틀브라스 학원 대기 공간"
  imageWidth={1600}
  imageHeight={1067}
/>
<PageIntro index="03" variant="gallery" title="갤러리" description="사진으로 먼저 만나는 리틀브라스의 실제 공간입니다." />
```

교육철학의 `name-story`는 선언형 Navy 영역으로 유지하고, 갤러리는 인트로 직후 `editorial-gallery`가 시작되도록 중복 섹션 헤딩을 간결하게 만든다.

- [ ] **Step 4: 찾아오시는 길을 주소·지도 행동 중심으로 재구성한다**

```tsx
<PageIntro
  index="04"
  variant="location"
  title="찾아오시는 길"
  description="5호선 상일동역 3번 출구에서 걸어서 5분입니다."
  actions={(
    <div class="location-hero-actions">
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" class="button button-primary">네이버 지도에서 보기</a>
      <address>{SITE.address}</address>
    </div>
  )}
/>
```

본문 하단에는 `yellow-door-01.webp`, `5층 501호`, 방문 전 연락 안내를 담은 `.arrival-guide`를 추가한다.

- [ ] **Step 5: 서브 페이지 내비게이션 예약 링크에 낮은 위계 클래스를 적용한다**

```tsx
class="nav-booking-link nav-booking-link-subtle"
```

- [ ] **Step 6: 구조 테스트를 실행한다**

Run: `npm test -- tests/accessibility-structure.test.ts tests/assets.test.ts`

Expected: JSX 구조와 이미지 계약 PASS. CSS 계약은 Task 3 전까지 FAIL할 수 있다.

- [ ] **Step 7: JSX 변경을 커밋한다**

```bash
git add src/components/PageIntro.tsx src/components/Navigation.tsx src/pages/CurriculumPage.tsx src/pages/PhilosophyPage.tsx src/pages/GalleryPage.tsx src/pages/LocationPage.tsx
git commit -m "feat: restructure subpages around visitor intent"
```

### Task 3: 화이트·Navy 시각 체계와 반응형 구현

**Files:**
- Modify: `public/static/style.css`
- Modify: `public/static/app.js`
- Test: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: Task 2의 `page-intro-*`, `curriculum-tab`, `arrival-guide`, `location-hero-actions` 클래스
- Produces: 데스크톱·태블릿·모바일 레이아웃, 220ms 이하 상태 전환, reduced-motion 처리

- [ ] **Step 1: 공통 토큰을 홈 팔레트로 재매핑한다**

```css
:root {
  --paper: var(--home-white);
  --surface: var(--home-soft);
  --ink: var(--home-ink);
  --muted-ink: var(--home-muted);
  --brass: var(--home-brass);
  --rule: var(--home-rule);
  --deep-ink: var(--home-deep-navy);
  --ease-editorial: cubic-bezier(0.23, 1, 0.32, 1);
  --duration-media: 240ms;
}
```

- [ ] **Step 2: 공통 인트로와 페이지 variant를 구현한다**

```css
.page-intro { padding: 150px 0 80px; background: var(--home-white); border-bottom: 1px solid var(--home-rule); }
.page-intro-inner { align-items: center; }
.page-intro h1 { color: var(--home-deep-navy); font-size: clamp(3.25rem, 6vw, 4.8rem); word-break: keep-all; }
.page-intro-media { max-height: 360px; background: var(--home-soft); }
.page-intro-curriculum .page-intro-media { aspect-ratio: 1155 / 1362; max-width: 360px; justify-self: end; }
.page-intro-gallery .page-intro-inner,
.page-intro-location .page-intro-inner { grid-template-columns: 1fr; }
```

- [ ] **Step 3: 페이지별 핵심 영역을 구현한다**

```css
.name-story { background: var(--home-navy); color: var(--home-white); border: 0; }
.name-story .section-kicker { color: var(--home-brass); }
.name-story blockquote p { color: rgba(255,255,255,.72); }
.curriculum-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; border-block: 1px solid var(--home-rule); }
.curriculum-tab { min-height: 116px; padding: 24px; text-align: left; border-right: 1px solid var(--home-rule); transition: color 200ms var(--ease-editorial), background-color 200ms var(--ease-editorial); }
.curriculum-tab.tab-active { background: var(--home-navy); color: var(--home-white); }
.transport-section { background: var(--home-navy); color: var(--home-white); }
.arrival-guide { display: grid; grid-template-columns: minmax(280px,.8fr) minmax(0,1.2fr); gap: clamp(48px,8vw,112px); align-items: center; }
```

- [ ] **Step 4: 모바일 `390px` 레이아웃을 구현한다**

```css
@media (max-width: 640px) {
  .page-intro { padding: 112px 0 56px; }
  .page-intro h1 { max-width: 100%; font-size: clamp(2.65rem, 13vw, 3.35rem); line-height: 1.18; word-break: keep-all; }
  .page-intro-location h1 { font-size: clamp(2.45rem, 12vw, 3.1rem); }
  .curriculum-tabs { grid-template-columns: 1fr 1fr; overflow: visible; }
  .curriculum-tab { min-height: 104px; padding: 18px 16px; }
  .arrival-guide { grid-template-columns: 1fr; }
  .contact-detail-list a { overflow-wrap: anywhere; }
}
```

- [ ] **Step 5: 스크롤 진입 이동을 줄이고 키보드 탭 전환에 이동 모션을 추가하지 않는다**

```css
.motion-ready .reveal { opacity: 0; transform: translateY(10px); transition: opacity 240ms var(--ease-editorial), transform 240ms var(--ease-editorial); }
```

기존 `initCurriculumTabs()`의 즉시 panel 전환과 키보드 처리는 유지하고 JavaScript 애니메이션은 추가하지 않는다.

- [ ] **Step 6: CSS와 모션 테스트를 실행한다**

Run: `npm test -- tests/build-output.test.ts tests/assets.test.ts`

Expected: 화이트·Navy 토큰, 금지 패턴과 반응형 계약 PASS.

- [ ] **Step 7: 스타일 변경을 커밋한다**

```bash
git add public/static/style.css public/static/app.js tests/build-output.test.ts tests/assets.test.ts
git commit -m "feat: unify subpage visual system"
```

### Task 4: 전체 검증과 시각 회귀 확인

**Files:**
- Modify when verification exposes a defect: `src/components/PageIntro.tsx`, `src/pages/*.tsx`, `public/static/style.css`, `public/static/app.js`, `tests/*.test.ts`
- Update: `docs/superpowers/plans/2026-07-16-subpage-visual-unification.md`

**Interfaces:**
- Consumes: Tasks 1–3의 최종 구현
- Produces: 테스트·빌드·1440/768/390 시각 검증을 통과한 배포 가능한 `dist`

- [ ] **Step 1: 정적 검증을 실행한다**

Run: `npm run typecheck && npm test && npm run build`

Expected: 세 명령 모두 exit code 0.

- [ ] **Step 2: 로컬 미리보기에서 모든 공개 경로를 확인한다**

Run:

```bash
for route in / /curriculum /philosophy /gallery /location /missing-page; do
  curl -sS -o /dev/null -w "$route %{http_code}\n" "http://127.0.0.1:59059$route"
done
```

Expected: 공개 다섯 경로 `200`, `/missing-page` `404`.

- [ ] **Step 3: 브라우저에서 데스크톱 1440px를 확인한다**

확인 항목: 화이트 기본 면, 페이지별 다른 첫 화면, 4열 커리큘럼 탭, Navy 교육철학 선언, 갤러리 직접 시작, 찾아오시는 길의 주소·지도 우선순위.

- [ ] **Step 4: 브라우저에서 모바일 390×844를 확인한다**

확인 항목: 가로 넘침 없음, `찾아오시는 길` 자연스러운 줄바꿈, 커리큘럼 탭 2×2, 모바일 메뉴, 44px 터치 영역, 이미지 비율.

- [ ] **Step 5: 발견한 결함을 최소 범위로 수정하고 전체 검증을 다시 실행한다**

Run: `npm run typecheck && npm test && npm run build`

Expected: exit code 0이며 브라우저에서 데스크톱·모바일 결함이 재현되지 않는다.

- [ ] **Step 6: 계획 체크박스를 완료 상태로 갱신하고 커밋한다**

```bash
git add docs/superpowers/plans/2026-07-16-subpage-visual-unification.md
git commit -m "docs: complete subpage visual unification plan"
```
