# 이미지 최적화 & 레이지 로딩 가이드

## 📸 이미지 추가 방법

### 1. 이미지 파일 위치
```
webapp/
└── public/
    └── images/          # 이미지 저장 폴더
        ├── gallery/     # 갤러리 사진
        ├── teachers/    # 강사 프로필 사진
        ├── facility/    # 시설 사진
        ├── events/      # 행사/발표회 사진
        └── og-image.jpg # SNS 공유 이미지
```

### 2. 이미지 최적화 (필수)

#### WebP 변환 (권장)
```bash
# ImageMagick 사용
convert input.jpg -quality 80 output.webp

# 또는 온라인 도구 사용
# https://squoosh.app/
# https://tinypng.com/
```

#### 권장 해상도
- **갤러리 이미지**: 1200x800px (3:2 비율)
- **프로필 사진**: 500x500px (정사각형)
- **히어로 이미지**: 1920x1080px (16:9 비율)
- **썸네일**: 400x300px

### 3. 레이지 로딩 적용

#### 방법 1: HTML loading 속성 (간단)
```html
<img 
  src="/images/gallery/photo1.jpg" 
  alt="레슨 현장"
  loading="lazy"
  width="1200"
  height="800"
/>
```

#### 방법 2: Intersection Observer (고급)
```javascript
// app.js에 추가
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img.lazy').forEach(img => {
  imageObserver.observe(img);
});
```

```html
<img 
  data-src="/images/gallery/photo1.jpg"
  alt="레슨 현장"
  class="lazy"
  width="1200"
  height="800"
/>
```

### 4. 갤러리 페이지 이미지 추가 예시

```typescript
// src/index.tsx의 갤러리 페이지에서
<div class="premium-card overflow-hidden cursor-pointer gallery-item" data-category="performance">
  <div class="aspect-square relative group overflow-hidden">
    <img 
      src="/images/gallery/performance1.jpg"
      alt="2025년 겨울 발표회"
      loading="lazy"
      class="w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-navy-900/80 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
      <i class="fas fa-search-plus text-white text-3xl"></i>
    </div>
  </div>
  <div class="p-4">
    <span class="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">발표회</span>
    <h3 class="font-semibold text-navy-900 mt-2">2025년 겨울 발표회</h3>
  </div>
</div>
```

### 5. 강사 프로필 사진 추가 예시

```typescript
// src/index.tsx의 강사 소개 페이지에서
<div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
  <div class="h-80 overflow-hidden">
    <img 
      src="/images/teachers/teacher1.jpg"
      alt="김지은 강사"
      loading="lazy"
      class="w-full h-full object-cover"
    />
  </div>
  <div class="p-8">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-2xl font-bold text-navy-900">김지은</h3>
      <span class="text-gold-600 font-semibold">피아노</span>
    </div>
    <!-- 나머지 내용 -->
  </div>
</div>
```

### 6. SNS 공유 이미지 (Open Graph)

#### 이미지 요구사항
- **크기**: 1200x630px (1.91:1 비율)
- **형식**: JPG 또는 PNG
- **용량**: 최대 8MB
- **위치**: `/public/og-image.jpg`

#### 이미지 내용
- Little Brass 로고
- 학원 이름
- 간단한 소개 문구
- 고품질 배경 이미지

### 7. Favicon 추가

```
public/
├── favicon.ico          # 16x16, 32x32, 48x48
├── apple-touch-icon.png # 180x180 (iOS)
└── android-chrome-512x512.png # 512x512 (Android)
```

### 8. 성능 최적화 체크리스트

- [ ] 모든 이미지 WebP 변환
- [ ] 적절한 해상도로 리사이징
- [ ] loading="lazy" 속성 추가
- [ ] width/height 속성 명시 (CLS 방지)
- [ ] alt 텍스트 작성 (접근성)
- [ ] og-image.jpg 추가 (SNS 공유)
- [ ] favicon 추가

### 9. 이미지 CDN 사용 (선택사항)

Cloudflare Images를 사용하면 자동 최적화 가능:
- 자동 WebP 변환
- 반응형 이미지
- 리사이징
- 캐싱

```html
<!-- Cloudflare Images 사용 예시 -->
<img 
  src="https://imagedelivery.net/YOUR_ACCOUNT_HASH/IMAGE_ID/public"
  alt="레슨 현장"
  loading="lazy"
/>
```

### 10. 이미지 없을 때 플레이스홀더

현재 사용 중인 CSS 플레이스홀더:
```css
.img-placeholder {
  background: linear-gradient(135deg, var(--gray-light) 0%, var(--gray-medium) 100%);
  display: flex;
  align-items: center;
  justify-center;
  color: var(--gray-dark);
}
```

---

## 🚀 실제 이미지 적용 순서

1. **우선순위 높음**
   - [ ] 강사 프로필 사진 (3장)
   - [ ] og-image.jpg (SNS 공유)
   - [ ] favicon.ico

2. **우선순위 중간**
   - [ ] 갤러리 사진 (10~20장)
   - [ ] 시설 사진 (5~10장)

3. **우선순위 낮음**
   - [ ] 발표회 사진 (추가분)
   - [ ] 학생 후기 사진

---

**참고**: 실제 이미지 추가 후 Cloudflare Pages에 재배포하면 자동으로 CDN을 통해 전세계에 빠르게 제공됩니다.
