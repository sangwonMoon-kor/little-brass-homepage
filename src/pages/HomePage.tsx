import { SITE } from '../config/site'
import type { BlogPost } from '../types/blog'

type HomePageProps = {
  posts: BlogPost[]
}

export function HomePage({ posts: blogPosts }: HomePageProps) {
  return (
    <div>
      {/* Fullscreen Video Hero Section */}
      <section class="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <div class="absolute inset-0 w-full h-full">
          <video id="hero-video" autoplay muted loop playsinline preload="metadata" poster="/static/videos/hero-poster.webp" aria-hidden="true" class="hero-video">
            <source src="/static/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark Overlay */}
        <div class="hero-scrim absolute inset-0"></div>

        {/* Centered Text Content */}
        <div class="relative z-10 text-center px-6 max-w-[700px]">
          {/* Main Title */}
          <h1 class="hero-title tracking-wide text-white text-6xl md:text-7xl lg:text-8xl" style="font-family: 'Playfair Display', serif; font-style: italic;">
            Little Brass
          </h1>

          {/* Subtitle */}
          <p class="hero-subtitle mt-4 text-xl md:text-2xl text-white/80" style="font-family: 'Dancing Script', cursive;">
            Premium Brass Education
          </p>

          {/* Vertical Line Divider */}
          <div class="hero-divider flex justify-center my-6">
            <div class="w-px h-[60px] bg-white/50"></div>
          </div>

          {/* CTA Buttons */}
          <div class="hero-buttons flex items-center justify-center gap-4 flex-col sm:flex-row">
            <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="button button-primary hero-cta">
              원데이 클래스 예약
            </a>
            <a href="/curriculum" class="button button-secondary hero-cta">
              커리큘럼 보기
            </a>
          </div>
          <p class="hero-booking-note">새 창에서 네이버 예약으로 이동합니다</p>
        </div>
      </section>

      {/* Intro Section (Vienna Academy Style) */}
      <section class="py-20 bg-[#FFFFFF]">
        <div class="intro-section">
          <p class="handwriting-label">What We Offer</p>
          <ul class="offer-points">
            <li>트럼펫·호른·트롬본·유포늄을 배우는 금관악기 전문 교육</li>
            <li>기초부터 입시·오디션까지 이어지는 단계별 커리큘럼</li>
            <li>레슨과 개인 연습에 집중할 수 있는 전용 공간</li>
          </ul>
        </div>
      </section>

      {/* Instrument Cards Section (Vienna Academy Style) */}
      <section class="bg-[#FFFFFF]">
        <div class="instruments-grid">
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/trumpet.webp" alt="Trumpet" width="640" height="640" loading="lazy" decoding="async" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trumpet Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/horn.webp" alt="Horn" width="640" height="640" loading="lazy" decoding="async" />
              <div class="instrument-overlay">
                <span class="instrument-label">Horn Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/trombone.webp" alt="Trombone" width="640" height="640" loading="lazy" decoding="async" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trombone Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/euphonium.webp" alt="Euphonium" width="640" height="640" loading="lazy" decoding="async" />
              <div class="instrument-overlay">
                <span class="instrument-label">Euphonium Lessons</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Little Brass - Zigzag Alternating Layout */}
      <section class="bg-[#FFFFFF]">
        <p class="section-label">Why Little Brass</p>

        {/* Row 1: Image Left + Text Right */}
        <div class="zigzag-row">
          <div class="zigzag-image">
            <img src="/static/images/academy/display-03.webp" alt="전문 금관악기 교육" width="1600" height="1869" loading="lazy" decoding="async" />
          </div>
          <div class="zigzag-text">
            <p class="sub-label">Professional Education</p>
            <h3 class="main-title">전문 금관악기 교육</h3>
            <p class="desc">
              트럼펫, 호른, 트롬본, 유포늄 등 모든 금관악기를 전문적으로 교육합니다.
              입문부터 전문가 수준까지 체계적인 커리큘럼으로 진행됩니다.
            </p>
          </div>
        </div>

        {/* Row 2: Text Left + Image Right (reverse) */}
        <div class="zigzag-row reverse">
          <div class="zigzag-image">
            <img src="/static/images/academy/display-02.webp" alt="합리적인 악기 대여" width="988" height="1034" loading="lazy" decoding="async" />
          </div>
          <div class="zigzag-text">
            <p class="sub-label">Instrument Rental</p>
            <h3 class="main-title">합리적인 악기 대여</h3>
            <p class="desc">
              고가의 금관악기를 합리적인 가격으로 대여할 수 있습니다.
              초보자도 부담 없이 시작할 수 있도록 다양한 옵션을 제공합니다.
            </p>
          </div>
        </div>

        {/* Row 3: Image Left + Text Right */}
        <div class="zigzag-row">
          <div class="zigzag-image">
            <img src="/static/images/academy/corridor-01.webp" alt="온라인 & 오프라인" width="1432" height="2048" loading="lazy" decoding="async" />
          </div>
          <div class="zigzag-text">
            <p class="sub-label">Online &amp; Offline</p>
            <h3 class="main-title">온라인 &amp; 오프라인</h3>
            <p class="desc">
              원하는 방식으로 수업을 선택할 수 있습니다.
              시간과 장소의 제약 없이 언제 어디서나 레슨이 가능합니다.
            </p>
          </div>
        </div>
      </section>

      <section class="booking-band" aria-labelledby="booking-band-title">
        <div class="booking-band-content">
          <div>
            <p class="sub-label">One Day Class</p>
            <h2 id="booking-band-title">처음이라도 괜찮습니다</h2>
            <p>원데이 클래스로 악기와 수업 방식을 먼저 만나보세요.</p>
          </div>
          <div class="booking-band-actions">
            <a class="button button-primary" href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer">
              네이버에서 원데이 클래스 예약
            </a>
            <a class="button button-tertiary" href={`tel:${SITE.phone}`}>전화로 상담하기</a>
          </div>
        </div>
      </section>

      {/* Our Space - Asymmetric Gallery Grid */}
      <section class="bg-[#FFFFFF]">
        <div class="gallery-header">
          <p class="sub-label">Our Space</p>
          <h2 class="main-title">깨끗하고 쾌적한 학원 시설</h2>
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

      {/* Latest News - Blog Section */}
      <section class="bg-[#FFFFFF]">
        <p class="section-label">Latest News</p>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {blogPosts.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              {blogPosts.map((post) => (
                <a href={post.link} target="_blank" rel="noopener noreferrer" class="blog-card interactive-card">
                  <p style="color: #B8941C; font-size: 0.8rem; margin-bottom: 0.75rem; font-weight: 600;">{post.date}</p>
                  <h3 style="font-family: 'Noto Sans KR', sans-serif; font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem; line-height: 1.5;">{post.title}</h3>
                  <p style="color: #666; font-size: 0.9rem; line-height: 1.7;">{post.description}</p>
                </a>
              ))}
            </div>
          ) : (
            <div style="text-align: center; padding: 48px 0; margin-bottom: 2rem;">
              <p style="color: #555; font-size: 1rem; margin-bottom: 1.5rem;">블로그에서 최신 소식을 확인하세요</p>
            </div>
          )}

          <div class="text-center">
            <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer"
              class="button button-primary inline-flex items-center gap-3 px-10 py-4">
              <span>블로그 전체 보기</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Start Your Journey - CTA Section */}
      <section class="relative py-28 overflow-hidden">
        {/* Background Image + Overlay */}
        <div class="absolute inset-0">
          <img src="/static/images/academy/yellow-door-01.webp" alt="" width="1416" height="2048" loading="lazy" decoding="async" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.65);"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p style="font-family: 'Dancing Script', cursive; color: #D4AF37; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Start Your Journey</p>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #fff; margin-bottom: 1rem;">지금 바로 시작하세요</h2>
          <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2.5rem;">첫 음이 울리는 순간, 당신만의 음악이 시작됩니다</p>
          <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="button final-cta-button">
            원데이 클래스 예약하기
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>
  )
}
