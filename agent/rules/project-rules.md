# Little Brass 프로젝트 규칙

## 프로젝트 개요
- **프로젝트명**: Little Brass 음악학원 홈페이지
- **기술 스택**: Hono.js, Vite, TypeScript, Tailwind CSS
- **배포**: Cloudflare Pages (https://little-brass-homepage.pages.dev)

## 디자인 가이드
- **테마**: 화이트톤 미니멀 디자인
- **배경색**: #ffffff (흰색) 또는 #fafafa (연한 회색)
- **포인트 색상**: 골드 (#D4AF37)
- **텍스트 색상**: #333333 (진한 회색)
- **그림자**: 부드러운 shadow-sm, hover시 shadow-md

## 파일 구조
- `src/index.tsx` - 메인 페이지 콘텐츠
- `src/renderer.tsx` - 헤더, 푸터, 레이아웃
- `public/static/style.css` - 전역 스타일
- `src/types.ts` - TypeScript 타입 정의

## 코딩 규칙
- TypeScript 사용
- Tailwind CSS 클래스 우선 사용
- 한국어 주석 작성
- 접근성(aria-label, aria-expanded) 필수 적용
- 모바일 반응형 필수

## 브랜드 정보
- **학원명**: 리틀브라스 음악학원
- **슬로건**: 금관악기 전문 교육
- **서비스**: O2O 교육 (온라인 + 오프라인)
- **주요 메뉴**: 홈, 커리큘럼, 온라인과정, 강사진, 갤러리, 학생성과, 오시는길, 문의하기

## 주의사항
- 기존 기능 유지하면서 디자인만 변경
- 배포 전 `npm run build`로 빌드 확인
- Git 커밋 메시지는 한국어로 작성