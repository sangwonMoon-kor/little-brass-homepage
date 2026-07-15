# Little Brass 홈페이지 프로덕션 하드닝 설계

## 1. 목적

Little Brass 홈페이지의 현재 5개 페이지와 브랜드 인상을 유지하면서 운영 품질을 높인다. 작업 범위는 UI/UX, 접근성, 모션, SEO, 보안, 성능, 코드 구조, 자동 테스트와 문서 정리다.

이 작업은 전면 재디자인이나 프레임워크 마이그레이션이 아니다. 실제 학원 사진, 골드·화이트·차콜 색상, 세리프 중심의 프리미엄 인상과 현재 콘텐츠를 보존한다.

## 2. 확정된 범위

### 정식 페이지

- `/` — 홈
- `/curriculum` — 커리큘럼
- `/philosophy` — 교육철학
- `/gallery` — 갤러리
- `/location` — 찾아오시는 길

위 5개 페이지가 의도된 정보 구조다. 과거 README와 sitemap에 남아 있던 `/about`, `/teachers`, `/achievements`, `/faq`, `/online`, `/contact`는 구현하지 않고 제거한다.

### 배포와 도메인

- 현재 배포 주소 `https://little-brass-homepage.pages.dev`는 계속 사용할 수 있어야 한다.
- 보유 중인 `littlebrass.com` 연결은 코드 정리와 검증 이후 별도 단계로 진행한다.
- 코드에는 `PUBLIC_SITE_URL` 환경변수를 지원한다.
- `PUBLIC_SITE_URL`이 없을 때는 현재 요청의 origin을 사용한다.
- 도메인 연결 후 프로덕션 환경변수를 `https://littlebrass.com`으로 설정한다.
- `www.littlebrass.com`과 `*.pages.dev`의 리디렉션은 Cloudflare 설정 단계에서 한 기준 주소로 통일한다.

## 3. 비목표

- Next.js, Remix 등 다른 프레임워크로 이전하지 않는다.
- 존재하지 않는 6개 페이지를 새로 만들지 않는다.
- 네이버 예약을 자체 예약 시스템으로 대체하지 않는다.
- 플로팅 예약 버튼을 다시 도입하지 않는다. 과거 제거 결정과 현재의 절제된 화면 구성을 유지한다.
- 강사 이력, 합격 실적, 후기처럼 검증되지 않은 콘텐츠를 새로 만들지 않는다.
- 이번 코드 작업에서 DNS 또는 도메인 네임서버를 변경하지 않는다.
- Lazyweb은 사용자가 현재 요청에서 직접 명시하지 않는 한 사용하지 않는다.

## 4. UI/UX 방향

### 4.1 시각적 정체성

- 실제 학생·악기·학원 공간 사진을 핵심 자산으로 유지한다.
- 골드 계열 포인트 색상은 하나의 토큰 체계로 통일한다.
- 흰색과 따뜻한 중립색을 기본 배경으로 사용한다.
- 제목용 세리프와 한글 본문용 산세리프 조합을 유지한다.
- 새로운 유행성 효과나 SaaS 스타일 컴포넌트를 추가하지 않는다.

### 4.2 홈 히어로

- 밝기가 변하는 영상에서도 제목과 CTA가 읽히도록 하단 중심의 어두운 그라데이션 scrim을 강화한다.
- 제목, 보조 문구, CTA를 영상의 안전영역 안에 배치한다.
- 기본 CTA는 `원데이 클래스 예약`으로 유지한다.
- 보조 CTA는 `커리큘럼 보기`로 유지하되 시각적 우선순위를 낮춘다.
- CTA 근처에 `네이버 예약으로 이동합니다`라는 짧은 안내를 추가한다.
- 모바일에서도 CTA 터치 영역은 최소 44×44 CSS px을 보장한다.

### 4.3 신뢰 정보의 위계

홈 초반의 기존 소개 영역을 다음 세 가지 핵심 가치가 빠르게 읽히도록 정리한다.

1. 금관악기 전문 교육
2. 입시·오디션을 포함한 단계별 커리큘럼
3. 실제 연습과 레슨에 맞춘 전용 공간

새로운 실적이나 수치를 만들지 않는다. 기존 콘텐츠를 짧고 스캔 가능한 문장으로 재배치한다. 사진 섹션을 제거하지 않으며, 텍스트와 이미지의 순서만 평가 흐름에 맞게 다듬는다.

### 4.4 예약 동선

- 플로팅 버튼은 사용하지 않는다.
- 홈의 초반 히어로, 중간 교육 가치 섹션 이후, 마지막 CTA에서 예약 진입점을 제공한다.
- `네이버 예약`과 `전화 상담`을 명확히 구분한다.
- 전화 링크는 `tel:010-5819-4687`, 예약 링크는 현재 네이버 플레이스 URL을 단일 상수에서 관리한다.
- 외부 링크는 새 탭과 `rel="noopener noreferrer"`를 유지한다.

### 4.5 내비게이션

- 데스크톱의 5개 메뉴 구조는 유지한다.
- 현재 pathname과 일치하는 메뉴에 활성 상태와 `aria-current="page"`를 제공한다.
- 모바일 메뉴는 아이콘 형태가 열림/닫힘 상태를 명확히 나타내야 한다.
- 메뉴가 열렸을 때 Escape 키와 메뉴 밖 클릭으로 닫을 수 있어야 한다.
- 포커스가 보이지 않는 상태를 금지하고 모든 링크와 버튼에 `:focus-visible` 스타일을 제공한다.

### 4.6 타이포그래피와 읽기성

- 본문 기본 크기는 모바일 16px 이상, 데스크톱 16–18px 범위로 맞춘다.
- 긴 문단은 약 65자 폭을 넘기지 않는다.
- 제목에는 `text-wrap: balance`, 본문에는 `text-wrap: pretty`를 사용한다.
- 작은 영문 라벨은 장식 역할로만 사용하고 핵심 정보를 영문 필기체에 의존하지 않는다.
- 이미지 위 텍스트와 내비게이션은 WCAG AA 대비를 만족하도록 배경 scrim 또는 불투명 표면을 사용한다.

## 5. 모션 설계

Emil Kowalski의 디자인 엔지니어링 원칙을 적용하되 애니메이션 수를 늘리는 것이 아니라 목적과 반응성을 개선한다.

### 모션 토큰

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--duration-press: 160ms;
--duration-ui: 200ms;
--duration-reveal: 420ms;
```

### 규칙

- `transition: all`을 사용하지 않는다.
- 버튼과 링크의 색상 변화는 200ms 이내로 제한한다.
- 누를 수 있는 요소는 `:active { transform: scale(0.97); }`로 짧은 피드백을 준다.
- hover 이동 효과는 `@media (hover: hover) and (pointer: fine)` 안에서만 실행한다.
- 자주 반복되는 내비게이션에는 큰 이동 애니메이션을 사용하지 않는다.
- 스크롤 reveal은 핵심 섹션에만 한 번 적용하고 `opacity`와 `transform`만 애니메이션한다.
- 모든 섹션을 일괄적으로 숨겼다가 나타내는 현재 방식은 제거한다.
- `prefers-reduced-motion: reduce`에서는 이동과 확대를 제거하고 160ms 이하의 opacity·color 전환만 남긴다.
- 스크롤 진행 바는 JavaScript로 매 프레임 계산하지 않는다. 유지하려면 CSS scroll-driven animation 지원 환경에서만 사용하고, 그렇지 않으면 제거한다.

## 6. 접근성

- 문서 첫 부분에 `본문 바로가기` skip link를 추가한다.
- 각 페이지에 하나의 명확한 `<h1>`을 유지한다.
- 내비게이션, 본문, 푸터를 시맨틱 요소로 구분한다.
- 의미 있는 모든 이미지에 구체적인 한국어 alt를 제공한다.
- 장식 이미지는 빈 alt와 적절한 role로 스크린리더에서 제외한다.
- 모바일 메뉴 버튼의 `aria-expanded`, `aria-controls`, accessible name을 상태와 동기화한다.
- 키보드만으로 메뉴, 탭, CTA에 접근할 수 있어야 한다.
- 커리큘럼 탭에는 tablist/tab/tabpanel 역할과 방향키 조작을 제공한다.
- 자동재생 영상은 muted·playsinline을 유지하고 reduced-motion 환경에서는 poster 이미지를 우선 표시한다.

## 7. SEO와 HTTP 정확성

### 페이지 메타데이터

각 라우트는 다음 값을 독립적으로 제공한다.

- title
- description
- canonical URL
- Open Graph URL/title/description/image
- Twitter card URL/title/description/image

canonical은 `site origin + pathname`으로 생성하고 모든 페이지를 홈 주소로 지정하지 않는다.

### 공유 이미지와 favicon

- 외부 Unsplash OG 이미지를 제거한다.
- 실제 리틀브라스 사진을 바탕으로 로컬 `1200×630` OG 이미지를 만든다.
- favicon SVG 또는 PNG와 Apple touch icon을 제공한다.
- 존재하지 않는 `/favicon.ico`를 참조하지 않는다.

### sitemap과 robots

- `/sitemap.xml`은 실제 5개 라우트만 포함한다.
- `/robots.txt`의 Sitemap URL은 현재 site origin을 사용한다.
- 정적 파일에 도메인을 하드코딩하지 않고 Hono 라우트에서 동적으로 반환한다.

### 상태 코드

- 알 수 없는 경로는 브랜드 404 화면과 함께 HTTP 404를 반환한다.
- 존재하지 않는 정적 자산도 404를 반환하며 HTML 200 응답으로 대체하지 않는다.
- RSS API 실패는 적절한 오류 상태와 안정적인 JSON 형식을 반환한다.

### 구조화 데이터

- 검증된 상호, 주소, 전화번호, URL만 사용해 `MusicSchool` 또는 가장 가까운 Schema.org 타입의 JSON-LD를 홈에 제공한다.
- 검증되지 않은 평점, 후기 수, 가격 범위는 넣지 않는다.

## 8. 보안과 외부 의존성

- Hono를 `4.12.30` 이상 호환 버전으로 업데이트한다.
- 업데이트 후 `npm audit --omit=dev`에서 알려진 프로덕션 취약점이 0건이어야 한다.
- 외부 RSS 요청에 3초 타임아웃을 적용한다.
- RSS에서 받은 URL은 `https:`와 허용된 네이버 호스트만 수용한다.
- RSS 텍스트는 HTML로 주입하지 않고 텍스트 노드로 렌더링한다.
- `dangerouslySetInnerHTML`은 정적 video markup에서도 제거하고 JSX 요소를 직접 사용한다.
- 외부 CDN 스크립트에 의존하는 Tailwind 런타임 구성을 제거한다.

## 9. 성능

### CSS

- Tailwind CSS 3.x를 개발 의존성으로 설치하고 build-time CSS를 생성한다.
- `cdn.tailwindcss.com`과 브라우저용 `tailwind-config.js`를 제거한다.
- 실제 TSX와 JavaScript에서 사용하는 클래스만 프로덕션 CSS에 포함한다.
- 기존 custom CSS는 디자인 회귀를 막기 위해 단계적으로 정리하며 한 번에 전부 다시 쓰지 않는다.

### 이미지

- 악기 PNG와 학원 JPG의 표시 크기를 조사해 과도한 원본 해상도를 줄인다.
- 하단 콘텐츠 이미지는 WebP를 기본으로 제공한다.
- 첫 화면 또는 LCP 후보를 제외한 이미지에는 `loading="lazy"`와 `decoding="async"`를 적용한다.
- 이미지 요소에 width와 height 또는 aspect-ratio를 지정해 layout shift를 줄인다.
- 원본 사진은 필요한 경우 보관하되 브라우저가 내려받는 파일은 최적화본으로 연결한다.

### 히어로 영상

- 현재 약 5.9MB MP4를 품질 확인 후 3.5MB 이하를 목표로 재인코딩한다.
- 모바일과 reduced-motion 환경에서 사용할 160KB 이하 WebP poster를 만든다.
- 영상 로드 실패 시 poster와 동일한 레이아웃이 유지되어야 한다.
- 영상은 접근성 트리에서 장식 콘텐츠로 처리한다.

### JavaScript

- 매 scroll 이벤트에서 DOM을 반복 탐색하거나 레이아웃을 강제 계산하지 않는다.
- IntersectionObserver는 관찰 대상이 있을 때 한 번만 생성한다.
- 이벤트 리스너 중복을 피하기 위해 DOM을 clone하여 교체하는 현재 모바일 메뉴 초기화 방식을 제거한다.

## 10. 네이버 블로그 RSS

RSS 처리는 별도 서비스 모듈로 분리한다.

- 요청 타임아웃: 3초
- 정상 응답 캐시: 15분
- 홈페이지 표시 개수: 최대 3개
- 파싱 실패 또는 네트워크 실패 시: 검증된 고정 공지 1개 또는 빈 상태 문구로 홈 렌더링 유지
- API JSON 스키마: `{ success: boolean, posts: BlogPost[], message?: string }`
- RSS 파서는 title, link, description, pubDate, thumbnail만 처리한다.
- 동일한 RSS 파싱 구현을 홈페이지와 API 라우트에서 중복하지 않는다.
- 정규식 파서가 처리하지 못하는 형식은 예외를 던지지 않고 빈 결과로 처리한다.

## 11. 코드 구조

현재 약 1,200줄인 `src/index.tsx`를 다음 책임 단위로 분리한다.

```text
src/
  app.tsx                 Hono 앱과 라우트 연결
  index.tsx               Cloudflare 진입점과 default export
  config/site.ts          사이트 정보, 링크, 라우트, 메타데이터
  components/
    Layout.tsx            문서 shell, skip link, nav, footer, scripts
    Navigation.tsx        데스크톱·모바일 내비게이션
    Seo.tsx               메타데이터와 JSON-LD
  pages/
    HomePage.tsx
    CurriculumPage.tsx
    PhilosophyPage.tsx
    GalleryPage.tsx
    LocationPage.tsx
    NotFoundPage.tsx
  services/
    blog.ts               RSS fetch, parse, cache, fallback
  types/
    site.ts
    blog.ts
```

페이지 콘텐츠를 무리하게 작은 컴포넌트로 쪼개지 않는다. 공통 동작이나 반복 마크업이 있는 경우에만 컴포넌트로 추출한다.

## 12. 테스트 전략

Vitest와 Hono의 `app.request()`를 사용한다.

### 라우트 테스트

- 5개 정식 페이지가 HTTP 200을 반환한다.
- 정식 페이지마다 고유한 title과 canonical이 존재한다.
- 존재하지 않는 6개 과거 경로와 임의 경로가 HTTP 404를 반환한다.
- `/sitemap.xml`에는 정식 5개 URL만 존재한다.
- `/robots.txt`는 현재 origin 기반 sitemap을 가리킨다.

### RSS 테스트

- 정상 Naver RSS fixture에서 최대 3개 글을 파싱한다.
- malformed RSS는 빈 배열을 반환한다.
- 허용되지 않은 URL scheme 또는 host는 제외한다.
- 타임아웃과 fetch 실패 시 홈페이지는 200으로 렌더링된다.
- RSS API는 실패 시에도 정의된 JSON 스키마를 유지한다.

### UI 구조 테스트

- skip link, 단일 h1, active navigation, `aria-current`를 확인한다.
- 모바일 메뉴 버튼의 초기 ARIA 상태를 확인한다.
- 이미지 lazy-loading 예외와 width/height 속성을 확인한다.

### 수동 시각 검증

- 1440×1000 데스크톱
- 390×844 모바일
- 키보드 내비게이션
- `prefers-reduced-motion: reduce`
- 네트워크를 Slow 4G로 제한한 첫 화면

## 13. 문서화

- README를 현재 5개 페이지와 실제 배포 주소 기준으로 다시 작성한다.
- 존재하지 않는 페이지와 문의 API 설명을 제거한다.
- 로컬 개발, 테스트, 빌드, 배포 명령을 실제 package scripts와 일치시킨다.
- `littlebrass.com` 연결 절차를 별도 체크리스트로 남긴다.
- 도메인 연결 전후에 변경해야 하는 값은 `PUBLIC_SITE_URL` 하나로 제한한다.

## 14. 완료 조건

- 기존 5개 페이지의 콘텐츠와 주요 시각 정체성이 유지된다.
- 모든 자동 테스트가 통과한다.
- 프로덕션 빌드가 성공한다.
- `npm audit --omit=dev` 취약점이 0건이다.
- favicon과 Apple touch icon은 이미지로 HTTP 200을 반환하고, 알 수 없는 경로와 정적 자산은 HTTP 404를 반환한다.
- 정식 페이지마다 올바른 canonical과 공유 메타데이터가 있다.
- Tailwind 런타임 CDN이 제거된다.
- 홈의 히어로, 신뢰 정보, 예약 CTA가 데스크톱과 모바일에서 명확히 읽힌다.
- 키보드 포커스와 reduced-motion 동작을 수동 검증한다.
- 저장소 문서가 실제 5개 페이지 및 명령과 일치한다.
- 도메인 연결은 코드 변경 없이 `PUBLIC_SITE_URL=https://littlebrass.com` 설정으로 준비된다.
