# Little Brass Photography and Layout Finish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct two homepage photographs and finish the homepage, philosophy, gallery, and location layouts with approved academy imagery.

**Architecture:** Keep the current page components and route structure. Add two non-destructive WebP assets, update page-level asset references, and introduce a gallery-specific modifier class so the academy-space layout can change without affecting the lesson-and-stage gallery.

**Tech Stack:** Hono JSX, TypeScript, Vitest, CSS, WebP assets, built-in image generation editing.

## Global Constraints

- Preserve the white, navy, and brass editorial system.
- Use real academy photos for all ungenerated replacements.
- Preserve explicit image width and height attributes.
- Do not stage or modify `.superpowers/`.
- Do not use Lazyweb.

---

### Task 1: Lock the requested media and content structure

**Files:**
- Modify: `tests/assets.test.ts`
- Modify: `tests/accessibility-structure.test.ts`

**Interfaces:**
- Consumes: rendered HTML from `createApp()` and `public/static/style.css`.
- Produces: regression expectations for asset paths, text-only philosophy intro, gallery modifier class, and arrival photography.

- [ ] **Step 1: Write failing asset expectations**

```ts
expect(home).toContain('/static/images/instruments/trumpet-no-hands.webp')
expect(home).toContain('/static/images/academy/ensemble-lesson-01-neutral.webp')
expect(home).toContain('/static/images/academy/display-02.webp')
expect(philosophy).not.toContain('page-intro-with-image')
expect(gallery).toContain('editorial-gallery gallery-space-grid')
expect(location).toContain('/static/images/academy/brand-wall-01.webp')
```

- [ ] **Step 2: Run the focused tests and verify RED**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: FAIL because the new asset paths, text-only philosophy intro, gallery modifier, and location photograph are not yet present.

- [ ] **Step 3: Keep the tests focused on rendered behavior**

Ensure each expectation describes visible content or a stable layout hook, not an internal implementation helper.

### Task 2: Create the corrected homepage image assets

**Files:**
- Create: `public/static/images/instruments/trumpet-no-hands.webp`
- Create: `public/static/images/academy/ensemble-lesson-01-neutral.webp`

**Interfaces:**
- Consumes: `trumpet.webp` and `ensemble-lesson-01.webp` as edit targets.
- Produces: optimized WebP assets referenced by `HomePage.tsx`.

- [ ] **Step 1: Inspect both source images**

Use the local image viewer at original detail before editing.

- [ ] **Step 2: Edit the trumpet photograph**

Use a `precise-object-edit` prompt that removes the person and both hands, reconstructs the same trumpet upright on a discreet support, and preserves the warm studio backdrop.

- [ ] **Step 3: Correct the ensemble white balance**

Use a `lighting-weather` prompt that neutralizes only white balance and exposure while preserving every student, face, pose, instrument, and room detail.

- [ ] **Step 4: Copy and optimize the selected outputs**

Save the chosen outputs under the exact WebP paths listed above and keep each file within 700KB.

- [ ] **Step 5: Visually inspect both final assets**

Confirm there are no remaining hands, no changed identities, no added objects, no text, and no watermark.

### Task 3: Update homepage and philosophy content

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/PhilosophyPage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: the two corrected assets and existing `display-02.webp`.
- Produces: an updated homepage education stack and text-only philosophy intro.

- [ ] **Step 1: Point the trumpet card to the corrected image**

```ts
image: '/static/images/instruments/trumpet-no-hands.webp'
```

- [ ] **Step 2: Update the education photo stack**

Use `ensemble-lesson-01-neutral.webp` for the primary image and `display-02.webp` for the secondary image, with matching alternative text and intrinsic dimensions.

- [ ] **Step 3: Remove philosophy PageIntro media props**

Keep only `index`, `variant`, `title`, and `description` on the philosophy `PageIntro`.

- [ ] **Step 4: Tune the two-image stack**

Set a landscape primary frame and a smaller supporting display frame while retaining the navy left rule and mobile stacking.

- [ ] **Step 5: Run the focused tests and verify GREEN**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts`

Expected: homepage and philosophy expectations pass; gallery and location expectations remain pending until Task 4.

### Task 4: Recompose gallery and arrival photography

**Files:**
- Modify: `src/pages/GalleryPage.tsx`
- Modify: `src/pages/LocationPage.tsx`
- Modify: `public/static/style.css`

**Interfaces:**
- Consumes: `brand-wall-01.webp` and existing supporting academy images.
- Produces: `gallery-space-grid` layout and full-front arrival photograph.

- [ ] **Step 1: Add a modifier to GalleryGrid**

```tsx
function GalleryGrid({ images, className = '' }: { images: readonly GalleryImage[]; className?: string }) {
  return <div class={`editorial-gallery ${className} reveal`}>...</div>
}
```

- [ ] **Step 2: Apply the academy-space modifier**

Render the first grid as `<GalleryGrid images={spaceImages} className="gallery-space-grid" />` and leave the stage grid unchanged.

- [ ] **Step 3: Implement the 12-column desktop composition**

Give the lead image seven columns and two rows, stack two supporting images in five columns, and place the final two supporting images in an equal row below. Show the lead image at its full natural ratio.

- [ ] **Step 4: Replace the arrival image and copy**

Use `brand-wall-01.webp`, update intrinsic dimensions and alt text, change the caption to `리엔프라자 5층 리틀브라스 정면`, and direct visitors to the logo and curved display window.

- [ ] **Step 5: Add the single-column responsive layout**

At mobile widths, reset all explicit grid placement, keep the front image uncropped, and use stable aspect ratios for supporting images.

- [ ] **Step 6: Run focused tests and verify GREEN**

Run: `npm test -- tests/assets.test.ts tests/accessibility-structure.test.ts tests/build-output.test.ts`

Expected: PASS.

### Task 5: Verify the complete site

**Files:**
- Verify only: all modified source, CSS, tests, and generated assets.

**Interfaces:**
- Consumes: the completed implementation.
- Produces: verified build and visual handoff.

- [ ] **Step 1: Run static and behavioral checks**

Run: `npm run typecheck && npm test && npm run build && git diff --check`

Expected: every command exits 0 without warnings caused by this change.

- [ ] **Step 2: Review desktop pages**

Inspect `/`, `/philosophy`, `/gallery`, and `/location` at desktop width. Confirm correct photos, full academy front, balanced gallery density, and readable text hierarchy.

- [ ] **Step 3: Review mobile pages**

Inspect the same routes near 390px width. Confirm no overflow, no cropped academy front, and stable single-column image order.

- [ ] **Step 4: Commit only intended files**

Stage the two documentation files, two generated assets, changed tests, page components, and stylesheet. Exclude `.superpowers/`.

