# Little Brass 음악학원 홈페이지

## 프로젝트 개요
- **이름**: Little Brass 홈페이지
- **목적**: 금관악기 음악학원 소개 및 온라인/오프라인 레슨 홍보
- **주요 특징**: 프리미엄 디자인, 반응형, SEO 최적화, 네이버 통합

## 🌐 공개 URL
- **개발 서버**: https://3000-ikusdu22r9pv151368eh4-2e77fc33.sandbox.novita.ai
- **프로덕션**: (Cloudflare Pages 배포 예정)
- **도메인**: littlebrass.com (연결 예정)

## ✅ 완성된 페이지 (총 9개)

### 1. 메인 페이지 (`/`)
- 히어로 섹션: 메인 비주얼 + 네이버 예약 버튼
- 특징 소개: 전문 강사진, 맞춤형 교육, 온라인 레슨
- 제공 악기: 피아노, 바이올린, 플루트, 첼로
- **Little Brass 소식**: 블로그 최신 글 3개 표시
- CTA 섹션: 무료 체험 레슨 신청

### 2. 학원 소개 (`/about`)
- 학원 소개 및 교육 철학
- 교육 방향: 개인 맞춤형, 체계적 커리큘럼, 전문 강사진, 최신 시설
- 차별화 포인트 5가지

### 3. 강사 소개 (`/teachers`)
- 3명의 강사 프로필 (피아노, 바이올린, 플루트)
- 학력, 경력, 수상 이력
- 강사 한마디

### 4. 커리큘럼 (`/curriculum`)
- 피아노 과정 (입문/초급/중급/고급)
- 바이올린 과정 (입문/초급/중급/고급)
- 개인 레슨/그룹 레슨 안내
- 수강료 정보

### 5. 갤러리 (`/gallery`)
- **필터링 기능**: 전체보기, 발표회, 수업 현장, 시설, 영상
- **YouTube 영상 섹션**: 발표회 및 레슨 영상
- **포토 갤러리**: 그리드 레이아웃, 라이트박스 효과
- 실시간 필터링 (JavaScript)

### 6. 학생 성과 (`/achievements`)
- **히어로 섹션**: 통계 카드 (150+ 콩쿠르 입상, 45+ 예고/음대 합격)
- **콩쿠르 입상 실적**: 연도별 타임라인 (2025, 2024)
- **예고/음대 합격 사례**: 6개 합격 카드 (선화예고, 서울대, 예원학교 등)
- **학생 & 학부모 후기**: 6개 후기 카드 (5성 평가)

### 7. FAQ (`/faq`)
- **검색 기능**: 질문/답변 실시간 검색
- **카테고리 필터**: 입학 관련(5), 수업 관련(3), 비용 관련(3), 온라인(2), 시설(2)
- **아코디언 UI**: 15개 FAQ
- **네이버 예약 CTA**: 하단 버튼

### 8. 온라인 과정 (`/online`)
- 온라인 레슨 소개 및 장점
- Zoom 레슨 진행 방식 (3단계)
- 수업 가능 악기
- 필요 장비 안내
- 수강료 (개인 레슨, 체험 레슨)
- FAQ

### 9. 오시는 길 (`/location`)
- 지도 영역 (카카오맵/네이버맵 연동 예정)
- 주소 및 상세 위치
- 지하철/버스 정보
- 주차 안내
- 주변 랜드마크

### 10. 문의하기 (`/contact`)
- 문의 폼 (이름, 연락처, 이메일, 문의 유형, 내용)
- 연락처 정보
- 운영 시간
- 네이버 예약 링크
- FAQ

## 🔗 외부 서비스 연동

### 네이버 플레이스
- **예약 링크**: https://naver.me/xLsaIlQK
- **배치 위치**:
  - 상단 네비게이션 (데스크톱 + 모바일)
  - 홈 페이지 히어로 섹션
  - 플로팅 버튼 (화면 우측 하단 고정)
  - FAQ 페이지 하단 CTA
  - 학생 성과 페이지 CTA

### 네이버 블로그
- **블로그 링크**: https://blog.naver.com/little_brass
- **배치 위치**:
  - 상단 네비게이션 (데스크톱 + 모바일)
  - 푸터 소셜 링크
  - 홈 페이지 "Little Brass 소식" 섹션 (3개 카드)

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Gold**: #D4AF37 (골드 메인)
- **Secondary Navy**: #1E3A5F (네이비 메인)
- **Bronze Accent**: #CD7F32 (브론즈 악센트)
- **White**: #FFFFFF
- **Gray**: #F8F9FA ~ #212529

### 타이포그래피
- **Heading**: Playfair Display (고급스러운 세리프)
- **Body**: Noto Sans KR (깔끔한 한글 폰트)

### UI 컴포넌트
- **버튼**: 라운드 풀 스타일, 그라데이션 효과
- **카드**: 2XL 라운드, 호버 시 translateY 효과
- **배지**: 골드/네이비 그라데이션
- **아이콘**: Font Awesome 6.4.0

## 📱 주요 기능

### 반응형 디자인
- 모바일 (< 640px)
- 태블릿 (640px ~ 1024px)
- 데스크톱 (> 1024px)
- 모바일 메뉴 토글
- Touch-friendly UI

### UX 최적화
- 플로팅 네이버 예약 버튼 (바운스 애니메이션)
- 스크롤 진행 바
- 호버 효과 (카드, 버튼, 링크)
- 부드러운 트랜지션 (300ms)
- 스크롤 애니메이션 (Intersection Observer)

### SEO & 성능
- 메타 태그 최적화
- Open Graph 태그
- Semantic HTML
- 이미지 레이지 로딩 (loading="lazy")
- 폰트 최적화 (font-display: swap)

### 접근성
- ARIA 레이블
- 키보드 네비게이션
- 적절한 색상 대비 (WCAG AA)
- Focus 스타일

## 🛠 기술 스택

### Frontend
- **프레임워크**: Hono (Cloudflare Workers)
- **빌드 도구**: Vite 6.4.1
- **스타일링**: Tailwind CSS 3.x (CDN)
- **아이콘**: Font Awesome 6.4.0
- **폰트**: 
  - Noto Sans KR (Google Fonts)
  - Playfair Display (Google Fonts)

### Backend & Deployment
- **런타임**: Cloudflare Workers
- **배포**: Cloudflare Pages
- **버전 관리**: Git
- **프로세스 관리**: PM2 (개발 환경)

### Development Tools
- **언어**: TypeScript
- **패키지 매니저**: npm
- **Linter**: (설정 예정)

## 📂 프로젝트 구조
```
webapp/
├── src/
│   ├── index.tsx          # 메인 앱 (모든 페이지 라우트)
│   └── renderer.tsx       # 공통 레이아웃 (네비, 푸터)
├── public/
│   └── static/
│       ├── app.js         # 프론트엔드 JS (갤러리 필터, FAQ 검색)
│       ├── style.css      # 커스텀 CSS (프리미엄 테마)
│       └── tailwind-config.js  # Tailwind 커스텀 설정
├── dist/                  # 빌드 결과물 (Cloudflare Pages)
├── .git/                  # Git 저장소
├── .gitignore             # Git 무시 파일
├── ecosystem.config.cjs   # PM2 설정 (개발 서버)
├── package.json          # 의존성 및 스크립트
├── vite.config.ts        # Vite 설정
├── wrangler.jsonc        # Cloudflare 설정
└── README.md            # 프로젝트 문서
```

## 🚀 개발 가이드

### 초기 설정
```bash
# 프로젝트 클론
git clone <repository-url>
cd webapp

# 의존성 설치
npm install

# 빌드
npm run build
```

### 로컬 개발 (Sandbox)
```bash
# PM2로 개발 서버 시작
pm2 start ecosystem.config.cjs

# 로그 확인
pm2 logs little-brass --nostream

# 서버 재시작
pm2 restart little-brass

# 서버 중지
pm2 stop little-brass

# PM2 프로세스 삭제
pm2 delete little-brass
```

### 빌드 & 배포
```bash
# 프로덕션 빌드
npm run build

# Cloudflare Pages 배포
npm run deploy

# 프로젝트명 지정 배포
npm run deploy:prod
```

### Git 워크플로우
```bash
# 현재 상태 확인
git status

# 변경사항 커밋
git add .
git commit -m "feat: 새로운 기능 추가"

# GitHub 푸시
git push origin main
```

## 📊 API 엔드포인트

### POST /api/contact
문의 폼 제출 API
- **요청 본문**: 
  ```json
  {
    "name": "홍길동",
    "phone": "010-1234-5678",
    "email": "example@email.com",
    "type": "수업 문의",
    "message": "문의 내용"
  }
  ```
- **응답**: 
  ```json
  {
    "success": true,
    "message": "문의가 접수되었습니다"
  }
  ```

## 🎯 완성된 기능 체크리스트

### 페이지 (10/10) ✅
- [x] 메인 페이지
- [x] 학원 소개
- [x] 강사 소개
- [x] 커리큘럼
- [x] 갤러리
- [x] 학생 성과
- [x] FAQ
- [x] 온라인 과정
- [x] 오시는 길
- [x] 문의하기

### 디자인 & UX ✅
- [x] 프리미엄 골드 & 네이비 테마
- [x] 반응형 디자인 (모바일/태블릿/데스크톱)
- [x] 모바일 메뉴 토글
- [x] 플로팅 네이버 예약 버튼
- [x] 스크롤 진행 바
- [x] 호버 효과 & 트랜지션
- [x] 스크롤 애니메이션
- [x] 로딩 애니메이션

### 기능 ✅
- [x] 갤러리 필터링 (JavaScript)
- [x] FAQ 검색 & 카테고리 필터
- [x] 문의 폼 (AJAX)
- [x] 네이버 플레이스 연동 (5곳)
- [x] 네이버 블로그 연동 (3곳)

### SEO & 성능 ✅
- [x] 메타 태그 최적화
- [x] Open Graph 태그
- [x] 이미지 레이지 로딩
- [x] 폰트 최적화
- [x] Semantic HTML

### 배포 준비 ⏳
- [ ] Cloudflare Pages 배포
- [ ] 도메인 연결 (littlebrass.com)
- [ ] SSL 인증서 (자동)
- [ ] 성능 테스트

## 📈 비용 절감 효과

### 연간 비용 비교
| 구분 | 캠페이너스 | 자체 제작 | 절약 금액 |
|------|-----------|----------|----------|
| 1년 | 50만원 | 2만원 | **48만원** |
| 3년 | 150만원 | 6만원 | **144만원** |
| 5년 | 250만원 | 10만원 | **240만원** |
| 10년 | 500만원 | 20만원 | **480만원** |

### 비용 구성
- **도메인 갱신**: 연 2만원
- **Cloudflare Pages 호스팅**: **무료**
- **Cloudflare Workers**: **무료** (10만 요청/일)
- **개발 비용**: **무료** (직접 제작)

### 자체 제작의 장점
- ✅ **연간 48만원 절약**
- ✅ 자유로운 수정 및 확장
- ✅ 플랫폼 종속성 제거
- ✅ 무제한 콘텐츠 추가
- ✅ SEO 완전 제어
- ✅ 빠른 로딩 속도 (Cloudflare CDN)

## 🔮 향후 개발 계획

### 콘텐츠 업데이트 (즉시 가능)
- [ ] 실제 학원 정보로 교체
- [ ] 강사 프로필 사진 & 정보
- [ ] 실제 연락처 & 주소
- [ ] 학원 사진 업로드 (갤러리)
- [ ] 실제 성과 데이터

### 추가 기능 (선택사항)
- [ ] 카카오맵 API 연동
- [ ] 카카오톡 채널 연동
- [ ] 이메일 알림 (문의 접수 시)
- [ ] 관리자 페이지
- [ ] 공지사항 CRUD

### 데이터베이스 (필요 시)
- [ ] Cloudflare D1 설정
- [ ] 문의 내역 저장
- [ ] 강사 정보 동적 관리
- [ ] 커리큘럼 동적 관리

## 🔧 문제 해결

### 자주 발생하는 문제

**1. 빌드 오류**
```bash
rm -rf dist && npm run build
```

**2. 포트 충돌 (3000)**
```bash
fuser -k 3000/tcp 2>/dev/null || true
pm2 delete all
```

**3. PM2 프로세스 확인**
```bash
pm2 list
pm2 logs little-brass --nostream
```

**4. Git 충돌**
```bash
git status
git add .
git commit -m "fix: resolve conflicts"
```

## 📞 연락처 (샘플 데이터)
- **이메일**: info@littlebrass.com
- **전화**: 02-1234-5678
- **주소**: 서울특별시 강남구 테헤란로 123
- **네이버 플레이스**: https://naver.me/xLsaIlQK
- **블로그**: https://blog.naver.com/little_brass

## 📄 라이선스
© 2026 Little Brass. All rights reserved.

---

**최종 업데이트**: 2026년 1월 14일  
**버전**: 2.0.0  
**상태**: ✅ 개발 완료 → 🚀 배포 준비 중

**개발자 노트**:
이 프로젝트는 Cloudflare Workers + Hono 프레임워크를 사용한 프리미엄 음악학원 홈페이지입니다.
모든 페이지와 기능이 완성되었으며, 실제 콘텐츠 교체 후 즉시 운영 가능합니다.
