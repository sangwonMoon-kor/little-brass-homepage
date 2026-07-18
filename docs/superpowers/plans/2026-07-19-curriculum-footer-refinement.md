# Curriculum and Footer Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 커리큘럼의 시각적 위계를 강화하고, 한글 줄바꿈·운영시간·푸터 사업 정보를 정확하고 일관되게 정리한다.

**Architecture:** `SITE` 설정을 운영시간과 공동원장 정보의 단일 출처로 확장하고, 찾아오시는 길과 공통 푸터가 이를 소비한다. 페이지 구조는 시맨틱 HTML을 유지하며, 최종 CSS 오버라이드에서 커리큘럼과 푸터의 반응형 시각 위계를 정의한다.

**Tech Stack:** Hono JSX, TypeScript, CSS, Vitest, Vite

## Global Constraints

- 화이트·네이비·브라스 기존 브랜드 팔레트를 유지한다.
- 확인되지 않은 사업자·등록 번호를 만들지 않는다.
- 한글 제목은 단어 중간에서 끊지 않는다.
- `.superpowers/` 작업 폴더는 수정하거나 커밋하지 않는다.

---

### Task 1: Lock copy and structure with regression tests

**Files:**
- Modify: `tests/accessibility-structure.test.ts`
- Modify: `tests/build-output.test.ts`

**Interfaces:**
- Consumes: `createApp()`의 실제 HTML 응답과 `public/static/style.css`
- Produces: 제목 줄바꿈, 운영시간, 푸터 정보, 커리큘럼 위계의 회귀 기준

- [ ] **Step 1: Write failing markup tests**

공동원장 제목의 명시적 줄바꿈, 새 운영시간과 안내 문구, 푸터의 학원명·공동원장·운영시간을 검사한다.

- [ ] **Step 2: Write failing stylesheet tests**

새 스타일 버전, `word-break: keep-all`, 네이비 활성 탭, 단계 패널, 강조 띠와 푸터 그리드를 검사한다.

- [ ] **Step 3: Run tests and confirm RED**

Run: `npm test -- tests/accessibility-structure.test.ts tests/build-output.test.ts`

Expected: 새 마크업과 스타일이 아직 없어서 FAIL.

### Task 2: Centralize public academy information

**Files:**
- Modify: `src/config/site.ts`
- Modify: `src/pages/LocationPage.tsx`
- Modify: `src/components/Layout.tsx`
- Modify: `src/pages/PhilosophyPage.tsx`

**Interfaces:**
- Consumes: `SITE.phone`, `SITE.email`, `SITE.address`
- Produces: `SITE.businessName`, `SITE.directors`, `SITE.hours`, `SITE.hoursNote`

- [ ] **Step 1: Add verified shared fields**

`SITE`에 학원명, 공동원장, 평일·토요일·일요일 운영시간과 방문 전 확인 안내를 추가한다.

- [ ] **Step 2: Render shared hours and footer ledger**

찾아오시는 길의 시간표를 `SITE.hours`로 바꾸고 푸터를 학원 정보·연락처·운영시간·바로가기 네 영역으로 구성한다.

- [ ] **Step 3: Fix the director heading break**

`리틀브라스를 함께<br />이끄는 두 원장`으로 제목의 의미 단위를 고정한다.

- [ ] **Step 4: Run markup tests and confirm GREEN**

Run: `npm test -- tests/accessibility-structure.test.ts`

Expected: PASS.

### Task 3: Build curriculum hierarchy and responsive rules

**Files:**
- Modify: `public/static/style.css`
- Modify: `src/components/Layout.tsx`

**Interfaces:**
- Consumes: 기존 `.curriculum-tab`, `.stage-row`, `.focus-ledger`, `.theory-ledger`, `.lesson-ledger`, `.site-footer-*` 클래스
- Produces: 데스크톱 4열·태블릿 2열·모바일 1열 반응형 스타일

- [ ] **Step 1: Add word-aware heading rules**

주요 제목에 `word-break: keep-all`과 안전한 `overflow-wrap`을 적용한다.

- [ ] **Step 2: Add curriculum visual hierarchy**

활성 악기 탭은 네이비, 단계는 번호 레일이 있는 흰 패널, 집중 과정은 네이비 강조 띠, 이론·수업 안내는 명확한 구획으로 스타일링한다.

- [ ] **Step 3: Add structured footer styles**

푸터를 4열 정보 레저로 만들고 모바일에서 한 열로 접는다.

- [ ] **Step 4: Bump stylesheet asset version**

`/static/style.css?v=20260719-curriculum-footer`로 변경해 Cloudflare의 이전 CSS 캐시를 우회한다.

- [ ] **Step 5: Run stylesheet tests and confirm GREEN**

Run: `npm test -- tests/build-output.test.ts`

Expected: PASS.

### Task 4: Visual and production verification

**Files:**
- Verify: `/curriculum`, `/philosophy`, `/location`, site footer

**Interfaces:**
- Consumes: 로컬 개발 서버
- Produces: 데스크톱·모바일 시각 확인 결과

- [ ] **Step 1: Run the local preview**

Run: `npm run dev -- --host 127.0.0.1`

- [ ] **Step 2: Inspect desktop and mobile**

1440×1100과 390×844에서 제목 줄바꿈, 탭 상태, 과정 패널, 운영시간, 푸터 가독성과 가로 넘침을 확인한다.

- [ ] **Step 3: Run all verification commands**

Run: `npm test && npm run build`

Expected: 모든 테스트와 프로덕션 빌드 PASS.
