# Little Brass 홈페이지

서울 강동구 상일동 리틀브라스 음악학원의 공식 홈페이지입니다. 금관악기 교육 과정, 교육 철학, 학원 공간, 위치와 예약 동선을 제공하며 Cloudflare Pages에서 실행됩니다.

## URL

- 현재 공개 사이트: <https://little-brass-homepage.pages.dev>
- 보유 도메인: `littlebrass.com` (추후 연결)
- GitHub: <https://github.com/sangwonMoon-kor/little-brass-homepage>

도메인 연결 작업은 [커스텀 도메인 체크리스트](docs/deployment/custom-domain-checklist.md)를 따릅니다.

## 공개 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 메인 소개, 악기·공간 안내, 네이버 블로그 최신 글, 예약 CTA |
| `/curriculum` | 트럼펫·호른·트롬본·유포늄 실기 및 음악이론 과정 |
| `/philosophy` | 원장 소개와 교육 철학 |
| `/gallery` | 학원 시설과 활동 사진 |
| `/location` | 주소, 교통, 주차, 지도 및 연락처 |

그 밖에 `/sitemap.xml`, `/robots.txt`, `/api/blog/rss`를 제공하며 존재하지 않는 경로는 실제 HTTP 404를 반환합니다.

## 기술 구성

- Hono + TypeScript
- Vite SSR build for Cloudflare Pages
- 로컬 컴파일 Tailwind CSS + 커스텀 CSS
- Vitest
- Sharp 기반 WebP·브랜드 이미지 생성
- Cloudflare Wrangler

네이버 블로그 RSS는 서버에서 최대 3초 동안 요청하고 15분간 메모리 캐시합니다. RSS 장애 시 홈페이지는 대체 카드와 함께 정상 응답하며, `/api/blog/rss`는 안정된 JSON 형식의 503 응답을 반환합니다.

## 로컬 실행

Node.js 22 이상과 npm이 필요합니다.

```bash
git clone https://github.com/sangwonMoon-kor/little-brass-homepage.git
cd little-brass-homepage
npm ci
npm run dev
```

Vite 개발 서버가 출력한 로컬 URL에서 확인합니다.

## 검증과 빌드

```bash
npm test
npm run typecheck
npm run build
npm run preview
```

`npm run build`는 Tailwind CSS 컴파일, TypeScript 검사, Vite 프로덕션 빌드를 순서대로 실행하고 결과물을 `dist/`에 생성합니다.

## 환경 변수

| 이름 | 필수 | 설명 |
| --- | --- | --- |
| `PUBLIC_SITE_URL` | 선택 | canonical, sitemap, robots에 사용할 고정 origin. 미설정 시 요청 origin 사용 |

`littlebrass.com` 연결 후에는 Cloudflare Pages 프로덕션 환경에서 `PUBLIC_SITE_URL=https://littlebrass.com`으로 설정하고 다시 배포합니다.

## 미디어 자산

원본 JPG·PNG는 보존하며 페이지는 생성된 WebP를 사용합니다.

```bash
# 학원·악기 WebP 다시 생성
node scripts/optimize-images.mjs

# OG 이미지와 Apple touch icon 다시 생성
node scripts/optimize-images.mjs --og-only

# 영상에서 추출한 이미지로 히어로 포스터 생성
node scripts/optimize-images.mjs --poster /path/to/poster.png
```

히어로 영상은 음원 없는 H.264 MP4이며 초기 화면에는 경량 WebP 포스터를 사용합니다.

## 배포

Wrangler 로그인이 완료된 환경에서만 실행합니다.

```bash
npm run deploy:prod
```

이 명령은 빌드 후 `little-brass-homepage` Cloudflare Pages 프로젝트에 직접 배포하므로, 의도한 브랜치와 변경 범위를 먼저 확인해야 합니다. GitHub 연동 배포를 사용하는 경우에는 Cloudflare 대시보드의 Production branch 설정을 기준으로 합니다.

## 주요 구조

```text
src/
├── app.tsx                 # 라우팅과 응답 정책
├── components/             # 레이아웃, 내비게이션, SEO
├── config/site.ts          # 사이트 정보와 공개 라우트
├── pages/                  # 페이지별 JSX
├── services/blog.ts        # 네이버 RSS 파싱·캐시·fallback
└── types/                  # 공유 타입
public/
└── static/                 # CSS, JS, 이미지, 영상
scripts/                    # CSS·이미지 빌드 도구
tests/                      # 라우팅, SEO, RSS, 자산 계약 테스트
docs/                       # 설계, 구현 계획, 운영 문서
wrangler.jsonc              # Cloudflare Pages 설정
```

## 운영 정보

- 주소: 서울특별시 강동구 상일로12길 99 리엔프라자 501호
- 전화: 010-5819-4687
- 이메일: little_brass@naver.com
- 네이버 블로그: <https://blog.naver.com/little_brass>
- Instagram: <https://www.instagram.com/little_brass.official/>

© 2026 Little Brass. All rights reserved.
