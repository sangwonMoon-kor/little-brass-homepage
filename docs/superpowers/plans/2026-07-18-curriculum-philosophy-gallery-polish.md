# Little Brass Photo and Subpage Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈 사진 구성, 커리큘럼 가독성, 두 공동원장 소개, 공간·수업 갤러리를 승인된 White·Navy·Brass 편집 체계로 완성한다.

**Architecture:** 현재 Hono JSX 페이지와 단일 `public/static/style.css` 구조를 유지한다. 페이지의 정적 데이터와 마크업만 목적에 맞게 재구성하고, Vitest가 렌더링된 HTML·자산·CSS 계약을 검증하도록 한 뒤 1440px·768px·390px에서 실제 렌더링을 확인한다.

**Tech Stack:** TypeScript, Hono JSX, CSS, Vitest, Vite, Sharp(기존 자산 확인에만 사용)

## Global Constraints

- Base White `#FFFFFF`, Navy `#102B4E`, Brass `#B79035`, Rule `#DEDEDE`를 유지한다.
- 실제 학원이나 원장 사진, 악기 형태를 생성형 이미지로 만들지 않는다.
- 존재하지 않는 원장 경력·담당 악기·학력·개인 소개를 작성하지 않는다.
- 새 UI 프레임워크, 애니메이션 라이브러리, 런타임 의존성을 추가하지 않는다.
- 홈 히어로 영상, 예약 링크 두 개, 내비게이션, 연락처와 외부 URL은 변경하지 않는다.
- 그라디언트, 큰 그림자, 둥근 카드 묶음, `transition: all`을 추가하지 않는다.
- `.superpowers/`는 사용자 소유 미추적 폴더이므로 열거나 스테이징하지 않는다.

---

## File Map

- `src/pages/HomePage.tsx`: 악기 카드 표시 문법과 `WHY LITTLE BRASS` 두 사진 구조
- `src/pages/CurriculumPage.tsx`: 사진 없는 인트로, 텍스트 중심 음악이론반, 수업 안내 위계
- `src/pages/PhilosophyPage.tsx`: 김효민·안세은 공동원장 프로필
- `src/pages/GalleryPage.tsx`: 공간·수업과 무대 사진 데이터와 두 섹션
- `public/static/style.css`: 모든 새 구조의 데스크톱·태블릿·모바일 시각 규칙
- `tests/assets.test.ts`: 페이지별 승인 자산과 제거된 자산 계약
- `tests/accessibility-structure.test.ts`: 섹션 제목, 공동원장 이름, 단일 h1과 탭 구조 계약
- `tests/build-output.test.ts`: 사진 프레임·타이포그래피·반응형·모션 금지 계약

---

### Task 1: 홈 악기 카드와 두 사진 `WHY LITTLE BRASS`

**Files:**
- Modify: `tests/assets.test.ts`
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/build-output.test.ts`
- Modify: `src/pages/HomePage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: 기존 `instruments`, `educationPoints`, `.instrument-card`, `.home-education-inner` 구조
- Produces: `.instrument-card-media`, `.education-photo-stack`, `.education-photo-primary`, `.education-photo-secondary`

- [ ] **Step 1: 홈의 새 사진 구조를 요구하는 실패 테스트 작성**

`tests/assets.test.ts`에서 홈 자산 계약을 다음처럼 바꾼다.

```ts
it('pairs a real lesson with both directors in the homepage education story', async () => {
  const home = await (await app.request('https://example.com/')).text()

  expect(home).toContain('class="education-photo-stack')
  expect(home).toContain('/static/images/academy/ensemble-lesson-01.webp')
  expect(home).toContain('/static/images/academy/faculty-duo-brass-01.webp')
})
```

`tests/build-output.test.ts`에 카드 비율과 사진 스택 계약을 추가한다.

```ts
it('uses bounded editorial frames for instrument and education photography', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')

  expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*aspect-ratio:\s*4\s*\/\s*5;/s)
  expect(styles).toContain('.education-photo-stack')
  expect(styles).toContain('.education-photo-secondary')
})
```

- [ ] **Step 2: 홈 테스트가 원하는 이유로 실패하는지 확인**

Run: `npm test -- tests/assets.test.ts tests/build-output.test.ts`

Expected: `education-photo-stack`, `faculty-duo-brass-01.webp`, `.instrument-card-media`가 없어 FAIL.

- [ ] **Step 3: 홈 마크업을 최소 구현**

각 악기 이미지에 공통 프레임을 추가한다.

```tsx
<figure class="instrument-card">
  <div class="instrument-card-media">
    <img
      src={instrument.image}
      alt={`리틀브라스에서 배우는 ${instrument.name}`}
      width="1024"
      height="1024"
      loading="lazy"
      decoding="async"
    />
  </div>
  <figcaption>...</figcaption>
</figure>
```

한 장 사진을 다음 두 장 구조로 교체한다.

```tsx
<div class="education-photo-stack reveal" aria-label="리틀브라스 수업과 공동원장">
  <figure class="education-photo education-photo-primary">
    <img src="/static/images/academy/ensemble-lesson-01.webp" alt="리틀브라스 학생들의 금관악기 합주 수업" width="2400" height="1800" loading="lazy" decoding="async" />
  </figure>
  <figure class="education-photo education-photo-secondary">
    <img src="/static/images/academy/faculty-duo-brass-01.webp" alt="금관악기와 함께한 리틀브라스 공동원장" width="1600" height="2400" loading="lazy" decoding="async" />
  </figure>
</div>
```

- [ ] **Step 4: 홈 CSS를 최소 구현**

`public/static/style.css`의 기존 카드와 교육 사진 규칙을 아래 계약으로 교체·보완한다.

```css
.instrument-card-media {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #f7f6f2;
}

.instrument-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.education-photo-stack {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(150px, 0.52fr);
  align-items: end;
  gap: 20px;
  padding-left: 18px;
  border-left: 1px solid var(--home-navy);
}

.education-photo-primary { align-self: start; }
.education-photo-secondary { transform: translateY(40px); }
```

모바일 media query에서는 두 사진을 `grid-template-columns: minmax(0, 1fr)`로 쌓고 secondary의 transform을 제거한다.

- [ ] **Step 5: 홈 테스트와 전체 테스트 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts`

Expected: PASS.

- [ ] **Step 6: 홈 변경 커밋**

```bash
git add src/pages/HomePage.tsx public/static/style.css tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts
git commit -m "feat: refine homepage photography"
```

---

### Task 2: 사진 없는 커리큘럼과 읽기 쉬운 수업 정보

**Files:**
- Modify: `tests/assets.test.ts`
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/build-output.test.ts`
- Modify: `src/pages/CurriculumPage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: `PageIntro`의 이미지 optional 계약, `instrumentCurricula`, `lessonOptions`, 기존 tab/tabpanel JavaScript
- Produces: `.theory-ledger`, `.theory-overview`, `.theory-information`, 확대한 `.lesson-ledger`

- [ ] **Step 1: 커리큘럼 자산·구조·가독성 실패 테스트 작성**

`tests/assets.test.ts`의 커리큘럼 사진 테스트를 다음 계약으로 바꾼다.

```ts
it('keeps the curriculum text-led without unrelated portraits', async () => {
  const curriculum = await (await app.request('https://example.com/curriculum')).text()

  expect(curriculum).not.toContain('/static/images/academy/instructor-trumpet-portrait-02.webp')
  expect(curriculum).not.toContain('/static/images/academy/faculty-duo-presentation-01.webp')
  expect(curriculum).not.toContain('class="theory-media')
  expect(curriculum).toContain('class="theory-ledger')
})
```

`tests/accessibility-structure.test.ts`에 다음을 추가한다.

```ts
it('orders the text-led curriculum from practice to theory and lesson guidance', async () => {
  const html = await page('/curriculum')
  const headings = ['실기 과정', '뮤토랑 음악이론반', '수업 안내']

  expect(headings.map((heading) => html.indexOf(heading))).toEqual(
    [...headings.map((heading) => html.indexOf(heading))].sort((a, b) => a - b),
  )
  expect(html).toContain('aria-labelledby="theory-title"')
  expect(html).toContain('aria-labelledby="lesson-title"')
})
```

`tests/build-output.test.ts`에 최소 글자 크기 계약을 추가한다.

```ts
it('keeps curriculum lesson copy readable', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')

  expect(styles).toMatch(/\.stage-summary\s*\{[^}]*font-size:\s*(?:15|16)px;/s)
  expect(styles).toMatch(/\.lesson-heading h3\s*\{[^}]*font-size:\s*(?:21|22|23|24)px;/s)
  expect(styles).toMatch(/\.lesson-description\s*\{[^}]*font-size:\s*(?:15|16)px;/s)
})
```

- [ ] **Step 2: 커리큘럼 테스트가 기존 사진과 작은 타입 때문에 실패하는지 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts`

Expected: 기존 두 사진이 렌더링되고 `.theory-ledger`와 새 타입 크기 계약이 없어 FAIL.

- [ ] **Step 3: 커리큘럼 인트로와 이론반 마크업 구현**

`PageIntro`에서 `image`, `imageAlt`, `imageWidth`, `imageHeight` props를 제거한다.

음악이론반을 다음 구조로 교체한다.

```tsx
<section class="editorial-section theory-section" aria-labelledby="theory-title">
  <div class="editorial-container theory-ledger">
    <div class="theory-overview reveal">
      <p class="section-kicker">음악을 읽는 힘</p>
      <h2 id="theory-title" class="section-title">뮤토랑 음악이론반</h2>
      <p class="theory-intro">악보를 읽고 듣고 이해하는 힘을 실기와 별도로 또는 함께 배울 수 있습니다.</p>
    </div>
    <div class="theory-information reveal">
      <dl class="theory-facts">...</dl>
      <ul class="theory-topics">...</ul>
    </div>
  </div>
</section>
```

- [ ] **Step 4: 커리큘럼 간격과 타입 CSS 구현**

```css
.curriculum-page .page-intro { border-bottom: 1px solid var(--home-rule); }
.curriculum-practical { padding-top: clamp(56px, 6vw, 88px); }

.theory-ledger {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(48px, 7vw, 96px);
  align-items: start;
}

.theory-information {
  padding-left: clamp(28px, 4vw, 56px);
  border-left: 1px solid var(--home-rule);
}

.stage-summary,
.lesson-description { font-size: 16px; line-height: 1.7; }
.lesson-heading h3 { font-size: 22px; line-height: 1.35; }
.lesson-heading p,
.lesson-ledger dt,
.lesson-ledger dd { font-size: 15px; line-height: 1.6; }
```

모바일에서는 `.theory-ledger`를 한 열로 만들고 `.theory-information`의 left border/padding을 top border/padding으로 바꾼다.

- [ ] **Step 5: 커리큘럼 테스트와 타입체크 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts && npm run typecheck`

Expected: PASS.

- [ ] **Step 6: 커리큘럼 변경 커밋**

```bash
git add src/pages/CurriculumPage.tsx public/static/style.css tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts
git commit -m "feat: improve curriculum readability"
```

---

### Task 3: 김효민·안세은 공동원장 소개

**Files:**
- Modify: `tests/assets.test.ts`
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `src/pages/PhilosophyPage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: 철학 인트로의 `faculty-duo-standing-01.webp`, 기존 `values`, `differences`
- Produces: `directors` 데이터, `.director-grid`, `.director-profile`, `.director-role`

- [ ] **Step 1: 공동원장 이름과 사진 매핑 실패 테스트 작성**

`tests/assets.test.ts`의 철학 자산 테스트를 다음처럼 확장한다.

```ts
it('maps each co-director to the approved portrait', async () => {
  const philosophy = await (await app.request('https://example.com/philosophy')).text()

  expect(philosophy).toContain('/static/images/academy/faculty-duo-standing-01.webp')
  expect(philosophy).toContain('/static/images/academy/instructor-portrait-01.webp')
  expect(philosophy).toContain('/static/images/academy/instructor-trumpet-portrait-01.webp')
})
```

`tests/accessibility-structure.test.ts`에 다음을 추가한다.

```ts
it('introduces both Little Brass co-directors with equal roles', async () => {
  const html = await page('/philosophy')

  expect(html).toContain('김효민 원장')
  expect(html).toContain('안세은 원장')
  expect(html.match(/공동원장/g)).toHaveLength(2)
  expect(html).not.toContain('골드쌤 원장')
})
```

- [ ] **Step 2: 기존 단일 원장 구조 때문에 실패하는지 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: 안세은 사진·이름이 없고 `골드쌤 원장`이 남아 FAIL.

- [ ] **Step 3: 공동원장 데이터와 동등한 프로필 마크업 구현**

```tsx
const directors = [
  {
    name: '김효민 원장',
    role: '공동원장',
    image: '/static/images/academy/instructor-portrait-01.webp',
    imageAlt: '리틀브라스 김효민 공동원장',
    width: 1365,
    height: 2048,
  },
  {
    name: '안세은 원장',
    role: '공동원장',
    image: '/static/images/academy/instructor-trumpet-portrait-01.webp',
    imageAlt: '리틀브라스 안세은 공동원장',
    width: 1365,
    height: 2048,
  },
] as const
```

```tsx
<section class="editorial-section director-section" aria-labelledby="director-title">
  <div class="editorial-container">
    <div class="section-heading reveal">
      <div>
        <p class="section-kicker">공동원장 소개</p>
        <h2 id="director-title" class="section-title">리틀브라스를 함께 이끄는 두 원장</h2>
      </div>
      <p>두 원장은 한 사람의 호흡과 속도를 존중하며, 첫 소리부터 무대까지 함께 지도합니다.</p>
    </div>
    <div class="director-grid reveal">
      {directors.map((director) => (
        <article class="director-profile">
          <figure><img src={director.image} alt={director.imageAlt} width={director.width} height={director.height} loading="lazy" decoding="async" /></figure>
          <p class="director-role">{director.role}</p>
          <h3>{director.name}</h3>
        </article>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 4: 공동원장 레이아웃 CSS 구현**

```css
.director-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(28px, 5vw, 72px);
}

.director-profile figure { aspect-ratio: 4 / 5; overflow: hidden; }
.director-profile img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.director-role { margin-top: 20px; color: var(--home-brass); font-size: 13px; font-weight: 700; letter-spacing: 0.12em; }
.director-profile h3 { margin-top: 8px; color: var(--home-navy); font-size: clamp(26px, 3vw, 36px); }
```

모바일에서는 한 열로 쌓되 두 프로필 사이에 1px Rule과 상단 여백을 둔다.

- [ ] **Step 5: 철학 페이지 테스트 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: PASS.

- [ ] **Step 6: 공동원장 변경 커밋**

```bash
git add src/pages/PhilosophyPage.tsx public/static/style.css tests/assets.test.ts tests/accessibility-structure.test.ts
git commit -m "feat: present both academy directors"
```

---

### Task 4: 공간과 수업·무대로 나뉜 갤러리

**Files:**
- Modify: `tests/assets.test.ts`
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `src/pages/GalleryPage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: 기존 `PageIntro`, `.editorial-gallery`, `.gallery-figure` 렌더링 문법
- Produces: `spaceImages`, `lessonStageImages`, `.gallery-section`, `.gallery-section-space`, `.gallery-section-stage`

- [ ] **Step 1: 두 갤러리 섹션과 공간 자산 실패 테스트 작성**

`tests/assets.test.ts`의 갤러리 계약을 다음처럼 바꾼다.

```ts
it('separates academy spaces from lesson and stage records', async () => {
  const gallery = await (await app.request('https://example.com/gallery')).text()

  expect(gallery).toContain('/static/images/academy/brand-wall-01.webp')
  expect(gallery).toContain('/static/images/academy/lobby-01.webp')
  expect(gallery).toContain('/static/images/academy/practice-room-01.webp')
  expect(gallery).toContain('/static/images/academy/lesson-room-01.webp')
  expect(gallery).toContain('/static/images/academy/academy-concert-group-01.webp')
  expect(gallery).toContain('/static/images/academy/ensemble-lesson-02.webp')
})
```

`tests/accessibility-structure.test.ts`에 다음을 추가한다.

```ts
it('labels academy space before lesson and stage gallery records', async () => {
  const html = await page('/gallery')

  expect(html).toContain('id="gallery-space-title"')
  expect(html).toContain('id="gallery-stage-title"')
  expect(html.indexOf('학원 공간')).toBeLessThan(html.indexOf('수업과 무대'))
})
```

- [ ] **Step 2: 공간 이미지가 없는 현재 갤러리에서 실패하는지 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: 공간 자산과 두 제목 id가 없어 FAIL.

- [ ] **Step 3: 갤러리 데이터를 두 배열로 분리하고 두 섹션 렌더링**

```tsx
const spaceImages = [
  { src: '/static/images/academy/brand-wall-01.webp', alt: '리틀브라스 로고와 금관악기 전시가 보이는 학원 공간', caption: 'Brand Wall · 리틀브라스의 첫인상', width: 1155, height: 1362, className: 'gallery-figure gallery-figure-lead' },
  { src: '/static/images/academy/lobby-01.webp', alt: '리틀브라스 학원 로비와 대기 공간', caption: 'Lobby · 대기 공간', width: 1600, height: 1067, className: 'gallery-figure' },
  { src: '/static/images/academy/practice-room-01.webp', alt: '방음 설비를 갖춘 리틀브라스 개인 연습실', caption: 'Practice Room · 개인 연습실', width: 1385, height: 2048, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/lesson-room-01.webp', alt: '리틀브라스 레슨실', caption: 'Lesson Room · 레슨실', width: 1600, height: 1021, className: 'gallery-figure' },
  { src: '/static/images/academy/corridor-01.webp', alt: '리틀브라스 레슨실로 이어지는 복도', caption: 'Hallway · 레슨실 복도', width: 1432, height: 2048, className: 'gallery-figure' },
] as const
```

수업과 무대 배열은 다음 자산과 순서를 사용한다.

```tsx
const lessonStageImages = [
  { src: '/static/images/academy/ensemble-lesson-02.webp', alt: '함께 금관악기를 연주하는 리틀브라스 학생들', caption: 'Ensemble Lesson · 합주 수업', width: 2400, height: 1800, className: 'gallery-figure gallery-figure-lead' },
  { src: '/static/images/academy/academy-concert-group-01.webp', alt: '리틀브라스 정기 연주회 단체 사진', caption: 'Academy Concert · 정기 연주회', width: 2400, height: 1351, className: 'gallery-figure' },
  { src: '/static/images/academy/recital-solo-performance-01.webp', alt: '무대에서 독주하는 리틀브라스 연주자', caption: 'Solo Recital · 독주 무대', width: 1800, height: 2400, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/student-performance-01.webp', alt: '무대에서 금관악기를 연주하는 리틀브라스 학생', caption: 'Student Stage · 학생 연주', width: 1800, height: 2400, className: 'gallery-figure gallery-figure-tall' },
  { src: '/static/images/academy/award-ceremony-01.webp', alt: '연주회에서 상장을 받은 리틀브라스 학생', caption: 'Award · 연습이 기록으로 남는 순간', width: 1800, height: 2400, className: 'gallery-figure' },
  { src: '/static/images/academy/faculty-recital-stage-01.webp', alt: '리틀브라스 강사진의 연주회 무대', caption: 'Faculty Recital · 강사진 연주회', width: 2048, height: 1365, className: 'gallery-figure' },
] as const
```

공통 렌더링은 작은 지역 함수 `GalleryGrid({ images })`로 추출해 두 섹션에서 같은 figure·alt·lazy loading 계약을 사용한다.

- [ ] **Step 4: 갤러리 두 섹션의 Rule과 반응형 CSS 구현**

```css
.gallery-section + .gallery-section {
  border-top: 1px solid var(--home-rule);
}

.gallery-section-stage { padding-top: clamp(64px, 8vw, 112px); }
.gallery-section .editorial-gallery { margin-top: clamp(32px, 5vw, 64px); }
```

기존 데스크톱 편집 그리드와 모바일 한 열 계약은 유지하고, 각 섹션이 별도 reveal 그룹으로 동작하게 한다.

- [ ] **Step 5: 갤러리 테스트와 전체 접근성 계약 확인**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: PASS.

- [ ] **Step 6: 갤러리 변경 커밋**

```bash
git add src/pages/GalleryPage.tsx public/static/style.css tests/assets.test.ts tests/accessibility-structure.test.ts
git commit -m "feat: separate academy gallery stories"
```

---

### Task 5: 반응형 시각 점검과 최종 검증

**Files:**
- Modify if needed: `public/static/style.css`
- Modify if a regression is discovered: corresponding `tests/*.test.ts`

**Interfaces:**
- Consumes: Tasks 1–4의 최종 페이지와 CSS
- Produces: 빌드 가능한 최종 사이트, 1440px·768px·390px 검증 기록

- [ ] **Step 1: 전체 자동 검증 실행**

Run: `npm run typecheck && npm test && npm run build && git diff --check`

Expected: type errors 0, Vitest all PASS, Vite build 성공, whitespace error 0.

- [ ] **Step 2: 로컬 프로덕션 미리보기 시작**

Run: `npm run preview -- --ip 127.0.0.1 --port 59060`

Expected: `http://127.0.0.1:59060`에서 Pages preview가 응답.

- [ ] **Step 3: 데스크톱 1440×900 시각 점검**

홈, `/curriculum`, `/philosophy`, `/gallery`에서 다음을 확인한다.

```text
- 홈 악기 카드 네 장의 프레임·캡션 높이가 동일함
- WHY 두 사진과 오른쪽 목록의 높이·시선 균형이 맞음
- 커리큘럼 인트로/이론반에 빈 사진 슬롯이 없음
- 수업 안내 본문이 확대 없이 읽힘
- 두 공동원장 카드가 같은 폭과 위계를 가짐
- 갤러리 공간 → 수업과 무대 순서와 Rule이 명확함
- 가로 스크롤과 잘린 텍스트가 없음
```

- [ ] **Step 4: 태블릿 768px 및 모바일 390×844 시각 점검**

두 폭에서 동일 페이지를 확인하고, 모바일에서는 특히 다음을 검사한다.

```text
- WHY 사진 두 장이 한 열로 자연스럽게 쌓임
- 커리큘럼 탭이 가로 스크롤 없이 2×2 또는 한 열로 맞음
- theory ledger가 한 열이며 상단 Rule을 사용함
- 공동원장 사이에 충분한 구분이 있고 이름이 잘리지 않음
- 갤러리 모든 이미지가 viewport 안에 머묾
```

- [ ] **Step 5: 발견된 시각 회귀에 실패 테스트를 먼저 추가한 뒤 수정**

예를 들어 모바일 갤러리 overflow가 발견되면 `tests/assets.test.ts`에 정확한 축소 track 계약을 먼저 추가한다.

```ts
expect(styles).toContain(
  '.gallery-section .editorial-gallery {\n    grid-template-columns: minmax(0, 1fr);',
)
```

테스트 실패를 확인한 뒤 해당 media query만 최소 수정하고 전체 테스트를 다시 실행한다.

- [ ] **Step 6: 최종 검증과 마감 커밋**

Run: `npm run typecheck && npm test && npm run build && git diff --check && git status --short`

Expected: 모든 검증 PASS, 의도한 파일 외에는 `.superpowers/`만 미추적 상태.

```bash
git add public/static/style.css tests
git commit -m "fix: polish responsive academy pages"
```

변경할 시각 회귀가 없으면 빈 커밋을 만들지 않는다.
