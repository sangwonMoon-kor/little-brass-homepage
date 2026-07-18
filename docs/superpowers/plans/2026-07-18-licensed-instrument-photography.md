# Licensed Instrument Photography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four AI-generated instrument cards with a coherent, licensed Yamaha product-photo set and replace the homepage supporting image with a character-ready real academy photograph.

**Architecture:** Keep the homepage component and global footer structure intact. Store optimized licensed derivatives in a dedicated `instruments/real` directory, describe their source in a compact footer disclosure, and use per-instrument shape metadata only to normalize optical scale inside the shared card frame.

**Tech Stack:** Hono JSX, TypeScript, CSS, Sharp, Vitest, Vite.

## Global Constraints

- Do not use AI image generation or AI image editing for these four instrument assets.
- Do not use Lazyweb.
- Do not alter `.superpowers/`.
- Do not push unless the user explicitly requests it.
- Preserve the current white, navy, and brass palette and the editorial type hierarchy.
- Keep every instrument complete and undistorted with `object-fit: contain`.
- Credit Yamaha Corporation and CC BY-SA 4.0 in a compact footer disclosure.

---

## File Map

- Create `public/static/images/instruments/real/trumpet-yamaha-ytr-8335la.webp`: optimized real trumpet photograph.
- Create `public/static/images/instruments/real/horn-yamaha-yhr-667v.webp`: optimized real French horn photograph.
- Create `public/static/images/instruments/real/trombone-yamaha-ysl-891z.webp`: optimized real tenor trombone photograph.
- Create `public/static/images/instruments/real/euphonium-yamaha-yep-621.webp`: optimized real euphonium photograph.
- Modify `src/pages/HomePage.tsx`: new asset paths, optical-shape metadata, and award-ceremony supporting photograph.
- Modify `src/components/Layout.tsx`: compact expandable image attribution.
- Modify `public/static/style.css`: instrument framing, supporting-image crop, and footer-credit styling.
- Modify `tests/assets.test.ts`: markup, asset, licensing, and size regression coverage.
- Modify `tests/build-output.test.ts`: bounded frame and per-shape styling coverage.

---

### Task 1: Lock the licensed asset contract

**Files:**
- Modify: `tests/assets.test.ts`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Produces: the exact four public asset paths and the footer attribution requirements used by Tasks 2–4.

- [ ] **Step 1: Write the failing asset and markup tests**

Replace the old trumpet expectation and add one focused test with these assertions:

```ts
const licensedInstrumentPaths = [
  '/static/images/instruments/real/trumpet-yamaha-ytr-8335la.webp',
  '/static/images/instruments/real/horn-yamaha-yhr-667v.webp',
  '/static/images/instruments/real/trombone-yamaha-ysl-891z.webp',
  '/static/images/instruments/real/euphonium-yamaha-yep-621.webp',
]

it('uses licensed real Yamaha photographs for every instrument card', async () => {
  const home = await (await app.request('https://example.com/')).text()

  for (const imagePath of licensedInstrumentPaths) {
    expect(home).toContain(imagePath)
    const diskPath = `public${imagePath}`
    expect(existsSync(diskPath)).toBe(true)
    expect(statSync(diskPath).size).toBeLessThanOrEqual(350_000)
  }

  expect(home).not.toContain('/static/images/instruments/trumpet-no-hands.webp')
  expect(home).not.toContain('/static/images/instruments/horn.webp')
  expect(home).not.toContain('/static/images/instruments/trombone.webp')
  expect(home).not.toContain('/static/images/instruments/euphonium.webp')
})

it('credits the licensed Yamaha instrument photography', async () => {
  const home = await (await app.request('https://example.com/')).text()

  expect(home).toContain('class="footer-photo-credit"')
  expect(home).toContain('Yamaha Corporation')
  expect(home).toContain('CC BY-SA 4.0')
  expect(home).toContain('Yamaha_Trumpet_YTR-8335LA_crop.jpg')
  expect(home).toContain('Yamaha_Horn_YHR-667V.png')
  expect(home).toContain('Yamaha_Tenor_trombone_YSL-891Z_')
  expect(home).toContain('Yamaha_Euphonium_YEP-621_transparent.png')
})
```

Update both homepage education tests to require the new supporting image:

```ts
expect(home).toContain('/static/images/academy/award-ceremony-01.webp')
expect(home).not.toContain('/static/images/academy/display-02.webp')
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- tests/assets.test.ts
```

Expected: FAIL because the four real WebP assets, new homepage paths, award photograph, and footer credit do not exist yet.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/assets.test.ts
git commit -m "test: require licensed instrument photography"
```

---

### Task 2: Add the real optimized Yamaha photographs

**Files:**
- Create: `public/static/images/instruments/real/trumpet-yamaha-ytr-8335la.webp`
- Create: `public/static/images/instruments/real/horn-yamaha-yhr-667v.webp`
- Create: `public/static/images/instruments/real/trombone-yamaha-ysl-891z.webp`
- Create: `public/static/images/instruments/real/euphonium-yamaha-yep-621.webp`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Produces: four optimized WebP files at the exact paths required by `licensedInstrumentPaths`.

- [ ] **Step 1: Download the four licensed originals into a temporary directory**

```bash
mkdir -p /tmp/littlebrass-licensed-instruments
curl --globoff -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Yamaha%20Trumpet%20YTR-8335LA%20crop.jpg?width=1600' -o /tmp/littlebrass-licensed-instruments/trumpet.jpg
curl --globoff -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Yamaha%20Horn%20YHR-667V.png?width=1600' -o /tmp/littlebrass-licensed-instruments/horn.png
curl --globoff -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Yamaha%20Tenor%20trombone%20YSL-891Z%20%28re-crop%29.jpg?width=1600' -o /tmp/littlebrass-licensed-instruments/trombone.jpg
curl --globoff -L 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Yamaha%20Euphonium%20YEP-621%20transparent.png?width=1600' -o /tmp/littlebrass-licensed-instruments/euphonium.png
```

Expected: four genuine raster photographs downloaded from Wikimedia Commons.

- [ ] **Step 2: Convert without generative edits or destructive crops**

```bash
mkdir -p public/static/images/instruments/real
node --input-type=module -e "import sharp from 'sharp'; const jobs=[['trumpet.jpg','trumpet-yamaha-ytr-8335la.webp'],['horn.png','horn-yamaha-yhr-667v.webp'],['trombone.jpg','trombone-yamaha-ysl-891z.webp'],['euphonium.png','euphonium-yamaha-yep-621.webp']]; await Promise.all(jobs.map(([source,target]) => sharp('/tmp/littlebrass-licensed-instruments/'+source).resize({width:1400,height:1400,fit:'inside',withoutEnlargement:true}).webp({quality:84,alphaQuality:90,smartSubsample:true}).toFile('public/static/images/instruments/real/'+target)));"
```

Expected: four WebP derivatives, each under 350 KB, retaining the full instrument and any source transparency.

- [ ] **Step 3: Verify the binaries**

```bash
file public/static/images/instruments/real/*.webp
du -h public/static/images/instruments/real/*.webp
```

Expected: four valid WebP images; no file exceeds 350 KB.

- [ ] **Step 4: Commit the licensed assets**

```bash
git add public/static/images/instruments/real
git commit -m "assets: add licensed Yamaha instrument photos"
```

---

### Task 3: Replace homepage assets and normalize the card composition

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `public/static/style.css`
- Modify: `tests/build-output.test.ts`
- Test: `tests/assets.test.ts`
- Test: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: the four public WebP paths created in Task 2.
- Produces: `instrument-card-wide`, `instrument-card-round`, and `instrument-card-tall` shape classes used by CSS.

- [ ] **Step 1: Write the failing frame-style assertions**

Add to `tests/build-output.test.ts`:

```ts
it('normalizes real instrument photography without cropping it', () => {
  const styles = readFileSync('public/static/style.css', 'utf8')

  expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*display:\s*grid;/s)
  expect(styles).toMatch(/\.instrument-card-media\s*\{[^}]*padding:\s*clamp\(/s)
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
```

- [ ] **Step 2: Run the focused style test and verify RED**

```bash
npm test -- tests/build-output.test.ts
```

Expected: FAIL because the shared grid/padding and shape-specific selectors are absent.

- [ ] **Step 3: Update instrument metadata and education imagery**

Replace the `instruments` array in `src/pages/HomePage.tsx` with:

```ts
const instruments = [
  {
    name: '트럼펫',
    english: 'TRUMPET',
    note: '선명하고 곧은 소리',
    image: '/static/images/instruments/real/trumpet-yamaha-ytr-8335la.webp',
    shape: 'wide',
    imageWidth: 1280,
    imageHeight: 698,
  },
  {
    name: '호른',
    english: 'HORN',
    note: '깊고 따뜻한 울림',
    image: '/static/images/instruments/real/horn-yamaha-yhr-667v.webp',
    shape: 'round',
    imageWidth: 1280,
    imageHeight: 821,
  },
  {
    name: '트롬본',
    english: 'TROMBONE',
    note: '넓고 힘 있는 음색',
    image: '/static/images/instruments/real/trombone-yamaha-ysl-891z.webp',
    shape: 'wide',
    imageWidth: 1280,
    imageHeight: 446,
  },
  {
    name: '유포늄',
    english: 'EUPHONIUM',
    note: '부드럽고 풍성한 소리',
    image: '/static/images/instruments/real/euphonium-yamaha-yep-621.webp',
    shape: 'tall',
    imageWidth: 1062,
    imageHeight: 1798,
  },
]
```

Render each card and image with:

```tsx
<figure class={`instrument-card instrument-card-${instrument.shape}`}>
  <div class="instrument-card-media">
    <img
      src={instrument.image}
      alt={`리틀브라스에서 배우는 ${instrument.name}`}
      width={instrument.imageWidth}
      height={instrument.imageHeight}
      loading="lazy"
      decoding="async"
    />
  </div>
  <figcaption>
    <div>
      <strong>{instrument.name}</strong>
      <span>{instrument.note}</span>
    </div>
    <small>{instrument.english}</small>
  </figcaption>
</figure>
```

Replace the secondary education figure with:

```tsx
<figure class="education-photo education-photo-secondary">
  <img
    src="/static/images/academy/award-ceremony-01.webp"
    alt="연주회를 마친 리틀브라스 학생과 함께한 시상식"
    width="1536"
    height="2048"
    loading="lazy"
    decoding="async"
  />
</figure>
```

Change the stack label to `리틀브라스 합주 수업과 학생 시상식`.

- [ ] **Step 4: Implement the shared optical frame**

Update `public/static/style.css` with this behavior:

```css
.instrument-card-media {
  display: grid;
  overflow: hidden;
  place-items: center;
  padding: clamp(18px, 2.2vw, 32px);
  background: #f7f6f2;
  aspect-ratio: 4 / 5;
}

.instrument-card-media img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.instrument-card-wide .instrument-card-media img {
  max-width: 100%;
  max-height: 72%;
}

.instrument-card-round .instrument-card-media img {
  max-width: 96%;
  max-height: 82%;
}

.instrument-card-tall .instrument-card-media img {
  max-width: 82%;
  max-height: 92%;
}

.education-photo-secondary img {
  object-position: center 34%;
}
```

- [ ] **Step 5: Run the homepage tests and verify GREEN**

```bash
npm test -- tests/assets.test.ts tests/build-output.test.ts
```

Expected: both test files PASS.

- [ ] **Step 6: Commit the homepage presentation**

```bash
git add src/pages/HomePage.tsx public/static/style.css tests/build-output.test.ts
git commit -m "feat: present real instrument photography"
```

---

### Task 4: Add compact compliant attribution

**Files:**
- Modify: `src/components/Layout.tsx`
- Modify: `public/static/style.css`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Produces: `.footer-photo-credit`, an accessible native details disclosure containing four source links and one license link.

- [ ] **Step 1: Add the footer disclosure**

Insert this after `.site-footer-bottom` in `src/components/Layout.tsx`:

```tsx
<details class="footer-photo-credit">
  <summary>악기 사진 출처</summary>
  <div>
    <span>Yamaha Corporation · WebP 변환 및 크기 조정</span>
    <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Trumpet_YTR-8335LA_crop.jpg" target="_blank" rel="noopener noreferrer">트럼펫</a>
    <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Horn_YHR-667V.png" target="_blank" rel="noopener noreferrer">호른</a>
    <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Tenor_trombone_YSL-891Z_(re-crop).jpg" target="_blank" rel="noopener noreferrer">트롬본</a>
    <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Euphonium_YEP-621_transparent.png" target="_blank" rel="noopener noreferrer">유포늄</a>
    <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
  </div>
</details>
```

- [ ] **Step 2: Style the disclosure as secondary footer metadata**

Add this exact block to `public/static/style.css`:

```css
.footer-photo-credit {
  width: min(calc(100% - 48px), var(--content-max));
  margin: 0 auto;
  padding: 18px 0 24px;
  border-top: 1px solid rgba(252, 250, 246, 0.16);
  color: rgba(252, 250, 246, 0.58);
  font-size: 0.72rem;
}

.footer-photo-credit summary {
  width: fit-content;
  cursor: pointer;
  color: rgba(252, 250, 246, 0.72);
}

.footer-photo-credit summary:focus-visible {
  outline: 2px solid var(--home-brass);
  outline-offset: 4px;
}

.footer-photo-credit div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  margin-top: 12px;
  line-height: 1.6;
}

.footer-photo-credit a {
  color: rgba(252, 250, 246, 0.78);
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 640px) {
  .footer-photo-credit {
    width: min(calc(100% - 32px), var(--content-max));
  }
}
```

- [ ] **Step 3: Run the asset tests and verify GREEN**

```bash
npm test -- tests/assets.test.ts
```

Expected: all asset tests PASS, including author, license, and four source-link checks.

- [ ] **Step 4: Commit attribution**

```bash
git add src/components/Layout.tsx public/static/style.css
git commit -m "feat: credit licensed instrument images"
```

---

### Task 5: Complete build and visual verification

**Files:**
- Verify: `src/pages/HomePage.tsx`
- Verify: `src/components/Layout.tsx`
- Verify: `public/static/style.css`
- Verify: `public/static/images/instruments/real/*.webp`

**Interfaces:**
- Consumes: all implementation outputs from Tasks 1–4.
- Produces: verified desktop and mobile homepage behavior.

- [ ] **Step 1: Run the complete automated verification**

```bash
npm run typecheck
npm test
npm run build
git diff --check
```

Expected: type checking succeeds, every Vitest test passes, Vite produces `dist`, and `git diff --check` prints no errors.

- [ ] **Step 2: Inspect desktop at 1440 × 1100**

Open the homepage and verify:

- all four instruments are real, complete, undistorted, and optically balanced;
- the warm-white media fields have no accidental top strip;
- the award photograph clearly shows the director and student;
- the credit stays visually subordinate in the footer.

- [ ] **Step 3: Inspect mobile at 390 × 844**

Verify card widths do not overflow, small instrument details remain legible, the award photograph crop keeps both faces, and the native credit disclosure is operable by keyboard/touch.

- [ ] **Step 4: Review repository scope**

```bash
git status --short --branch
git log -6 --oneline
```

Expected: only `.superpowers/` remains untracked, `main` is ahead of `origin/main`, and no push has occurred.
