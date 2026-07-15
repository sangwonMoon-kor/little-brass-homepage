export function GalleryPage() {
  return (
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="/static/images/academy/corridor-02.webp" alt="Gallery" width="1434" height="2048" decoding="async" fetchpriority="high" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Gallery</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">갤러리</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스의 교육 공간과 활동을 만나보세요</p>
        </div>
      </section>

      {/* Our Space - 학원 시설 */}
      <section class="bg-[#FFFFFF]" style="padding: 60px 0;">
        <div class="gallery-header">
          <p class="sub-label">Our Space</p>
          <h2 class="main-title" style="font-family: 'Playfair Display', 'Noto Serif KR', serif;">교육 공간</h2>
        </div>
        <div class="gallery-asymmetric">
          <div class="gallery-item large">
            <img src="/static/images/academy/lobby-01.webp" alt="대기실" width="1600" height="1067" loading="lazy" decoding="async" />
            <div class="image-overlay">
              <span class="image-label">Lobby</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/static/images/academy/practice-room-01.webp" alt="연습실" width="1385" height="2048" loading="lazy" decoding="async" />
            <div class="image-overlay">
              <span class="image-label">Practice Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/static/images/academy/lesson-room-01.webp" alt="레슨실" width="1600" height="1021" loading="lazy" decoding="async" />
            <div class="image-overlay">
              <span class="image-label">Lesson Room</span>
            </div>
          </div>
        </div>
      </section>

      {/* Moments - 수업 & 연주회 */}
      <section style="background: #FFFFFF; padding: 0 0 60px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Moments</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">수업 & 연주회</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;" class="gallery-moments-grid">
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/display-02.webp" alt="악기 진열" width="988" height="1034" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>악기 진열</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/display-06.webp" alt="악기 전시" width="1402" height="2048" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>악기 전시</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/signage-01.webp" alt="학원 안내" width="1391" height="2048" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 안내</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/yellow-door-02.webp" alt="학원 입구" width="1366" height="2048" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 입구</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/lesson-room-02.webp" alt="레슨실" width="1600" height="1058" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>레슨실</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/corridor-01.webp" alt="학원 복도" width="1432" height="2048" loading="lazy" decoding="async" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 복도</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 블로그 안내 — CTA 배경 이미지 */}
      <section style="position: relative; padding: 80px 0; overflow: hidden;">
        <img src="/static/images/academy/display-07.webp" alt="" width="1600" height="1067" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.65);"></div>
        <div style="position: relative; z-index: 1; max-width: 600px; margin: 0 auto; text-align: center; padding: 0 1.5rem;">
          <p style="font-family: 'Dancing Script', cursive; color: #D4AF37; font-size: 2rem; font-weight: 600; margin-bottom: 0.75rem;">More Stories</p>
          <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 2.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">더 많은 이야기가 궁금하시다면</h2>
          <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.7; margin-bottom: 2.5rem;">리틀브라스 블로그에서 수업 후기, 연주회 소식, 음악 이야기를 확인하세요</p>
          <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" class="button final-cta-button">
            <i class="fas fa-blog"></i> 블로그 바로가기
          </a>
        </div>
      </section>
    </div>
  )
}
