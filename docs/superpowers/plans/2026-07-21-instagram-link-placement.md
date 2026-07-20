# Instagram Link Placement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `@little_brass.official` clearly discoverable from the home journal, gallery closing area, and footer without embedding Instagram content.

**Architecture:** Add one small shared anchor component that owns the canonical destination, safe new-tab attributes, accessible name, and visible handle. Compose that component into the existing home, gallery, and footer structures, then add a compact editorial row and responsive styles using the current design tokens.

**Tech Stack:** Hono JSX, TypeScript, CSS, Vitest, Vite

## Global Constraints

- Use `SITE.instagramUrl` as the only Instagram destination.
- Display `@little_brass.official` instead of a generic social label.
- Do not use the Instagram API, embeds, SDK scripts, cookies, or share-tracking query strings.
- New external links use `target="_blank"` and `rel="noopener noreferrer"`.
- Do not add a new full-height home section or duplicate academy photos.
- Mobile layout at 390 px must not create horizontal overflow.

---

### Task 1: Shared Instagram Profile Link and Page Placement

**Files:**
- Create: `src/components/InstagramProfileLink.tsx`
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/GalleryPage.tsx`
- Modify: `src/components/Layout.tsx`
- Test: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Consumes: `SITE.instagramUrl: string` from `src/config/site.ts`
- Produces: `InstagramProfileLink({ className?: string }): JSX.Element`

- [ ] **Step 1: Write failing rendered-HTML tests**

Update the existing Instagram test in `tests/accessibility-structure.test.ts` and add placement assertions:

```ts
it('shows the official Instagram profile in the home journal, gallery journal, and footer', async () => {
  const home = await page('/')
  const gallery = await page('/gallery')
  const safeProfileLink = /<a href="https:\/\/www\.instagram\.com\/little_brass\.official\/" target="_blank" rel="noopener noreferrer"[^>]*aria-label="리틀브라스 인스타그램 @little_brass\.official 새 창에서 열기"/g

  expect(home.match(safeProfileLink)).toHaveLength(2)
  expect(gallery.match(safeProfileLink)).toHaveLength(2)
  expect(home).toContain('사진과 짧은 소식은 인스타그램에서도 이어집니다.')
  expect(home.indexOf('class="instagram-profile-row')).toBeGreaterThan(
    home.indexOf('네이버 블로그 전체 보기'),
  )
  expect(home.indexOf('class="instagram-profile-row')).toBeLessThan(
    home.indexOf('class="home-cta"'),
  )
  expect(gallery).toContain('더 많은 기록은 블로그와 인스타그램에 이어집니다.')
  expect(gallery).toContain('class="gallery-journal-actions')
  expect(home).not.toContain('>인스타그램</a>')
})
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `npm test -- --run tests/accessibility-structure.test.ts`

Expected: FAIL because `instagram-profile-row`, `gallery-journal-actions`, the accessible profile link, and the handle label do not exist yet.

- [ ] **Step 3: Add the shared profile link**

Create `src/components/InstagramProfileLink.tsx`:

```tsx
import { SITE } from '../config/site'

type InstagramProfileLinkProps = {
  className?: string
}

export function InstagramProfileLink({ className = '' }: InstagramProfileLinkProps) {
  return (
    <a
      href={SITE.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="리틀브라스 인스타그램 @little_brass.official 새 창에서 열기"
      class={className}
    >
      <span>@little_brass.official</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}
```

- [ ] **Step 4: Place the link in the home journal**

Import `InstagramProfileLink` into `src/pages/HomePage.tsx` and insert this immediately after the existing `news-more-link`:

```tsx
<div class="instagram-profile-row reveal">
  <div>
    <p class="section-kicker">INSTAGRAM</p>
    <p>사진과 짧은 소식은 인스타그램에서도 이어집니다.</p>
  </div>
  <InstagramProfileLink className="instagram-profile-link" />
</div>
```

- [ ] **Step 5: Add Instagram to the gallery closing area**

Import `InstagramProfileLink` into `src/pages/GalleryPage.tsx`, change the closing heading to `더 많은 기록은 블로그와 인스타그램에 이어집니다.`, and replace the single action with:

```tsx
<div class="gallery-journal-actions">
  <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" class="text-link">
    네이버 블로그 보기
  </a>
  <InstagramProfileLink className="instagram-profile-link" />
</div>
```

- [ ] **Step 6: Show the handle in the footer**

Import `InstagramProfileLink` into `src/components/Layout.tsx` and replace the generic footer anchor with:

```tsx
<InstagramProfileLink className="footer-instagram-link" />
```

- [ ] **Step 7: Run the focused test and confirm it passes**

Run: `npm test -- --run tests/accessibility-structure.test.ts`

Expected: all tests in `tests/accessibility-structure.test.ts` PASS.

- [ ] **Step 8: Commit the behavior change**

```bash
git add src/components/InstagramProfileLink.tsx src/pages/HomePage.tsx src/pages/GalleryPage.tsx src/components/Layout.tsx tests/accessibility-structure.test.ts
git commit -m "feat: surface official Instagram profile"
```

---

### Task 2: Editorial Styling and Responsive Verification

**Files:**
- Modify: `public/static/style.css`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `.instagram-profile-row`, `.instagram-profile-link`, `.gallery-journal-actions`, and `.footer-instagram-link` from Task 1
- Produces: desktop and mobile layout rules for those classes

- [ ] **Step 1: Write a failing stylesheet contract test**

Add this test to `tests/build-output.test.ts`:

```ts
it('includes responsive editorial styling for Instagram profile links', () => {
  const css = readFileSync('public/static/style.css', 'utf8')

  expect(css).toMatch(/\.instagram-profile-row\s*\{[^}]*display:\s*flex;[^}]*border-top:/s)
  expect(css).toMatch(/\.instagram-profile-link\s*\{[^}]*display:\s*inline-flex;[^}]*transition:\s*transform/s)
  expect(css).toMatch(/\.instagram-profile-link:active\s*\{[^}]*transform:\s*scale\(0\.97\)/s)
  expect(css).toMatch(/@media \(max-width:\s*640px\)[\s\S]*\.instagram-profile-row\s*\{[^}]*flex-direction:\s*column;/s)
})
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run: `npm test -- --run tests/build-output.test.ts`

Expected: FAIL because the new Instagram classes have no CSS rules.

- [ ] **Step 3: Add desktop and interaction styles**

Append the following near the current home-news and gallery-journal rules in `public/static/style.css`:

```css
.instagram-profile-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 44px;
  padding: 24px 0;
  border-top: 1px solid var(--home-rule);
  border-bottom: 1px solid var(--home-rule);
}

.instagram-profile-row .section-kicker {
  margin-bottom: 6px;
}

.instagram-profile-row > div > p:last-child {
  color: var(--home-muted);
  font-size: 0.84rem;
}

.instagram-profile-link,
.footer-instagram-link {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: fit-content;
  border-bottom: 1px solid currentColor;
  color: var(--home-navy);
  font-size: 0.82rem;
  font-weight: 600;
  transition: transform 160ms var(--ease-editorial), color 160ms var(--ease-editorial), border-color 160ms var(--ease-editorial);
}

.instagram-profile-link:active,
.footer-instagram-link:active {
  transform: scale(0.97);
}

.gallery-journal-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 22px 30px;
  align-items: center;
}

.footer-instagram-link {
  color: inherit;
}

@media (hover: hover) and (pointer: fine) {
  .instagram-profile-link:hover,
  .footer-instagram-link:hover {
    color: var(--home-muted-brass);
  }
}
```

- [ ] **Step 4: Add the mobile layout**

Add this rule inside the existing mobile styles or as a focused media block:

```css
@media (max-width: 640px) {
  .instagram-profile-row {
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    margin-top: 32px;
    padding: 22px 0;
  }

  .instagram-profile-link {
    width: 100%;
    min-height: 44px;
  }

  .gallery-journal-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
```

- [ ] **Step 5: Run the focused stylesheet test**

Run: `npm test -- --run tests/build-output.test.ts`

Expected: all tests in `tests/build-output.test.ts` PASS.

- [ ] **Step 6: Run the complete verification suite**

Run: `npm test && npm run build && git diff --check`

Expected: all tests PASS, TypeScript emits no errors, Vite build exits 0, and `git diff --check` prints no errors.

- [ ] **Step 7: Verify the responsive pages in a browser**

Run the local site and inspect `/`, `/gallery`, and a subpage footer at 1440 × 900 and 390 × 844. Confirm:

```text
Home: Instagram row follows the Naver Blog link and precedes the final CTA.
Gallery: blog and Instagram actions remain together without horizontal overflow.
Footer: @little_brass.official is visible and tappable.
Mobile: profile links are at least 44 px high and the document has no horizontal overflow.
```

- [ ] **Step 8: Commit the visual change**

```bash
git add public/static/style.css tests/build-output.test.ts
git commit -m "style: integrate Instagram profile links"
```

- [ ] **Step 9: Push and verify production**

Run: `git push origin main`

Expected: `main` advances on GitHub. After Cloudflare deploys, `https://littlebrass.com/` contains `@little_brass.official` in the journal and footer, and `https://littlebrass.com/gallery` contains both journal destinations.
