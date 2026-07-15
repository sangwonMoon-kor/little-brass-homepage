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
        <div
          class="absolute inset-0 w-full h-full"
          dangerouslySetInnerHTML={{
            __html: `<video id="hero-video" autoplay muted loop playsinline webkit-playsinline preload="auto" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;z-index:0;"><source src="/static/videos/hero-video.mp4" type="video/mp4"></video>`
          }}
        />

        {/* Dark Overlay */}
        <div class="absolute inset-0 bg-black/30"></div>

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
            <a href="/curriculum" class="rounded-full bg-[#C9A227] text-white px-8 py-3 hover:opacity-90 transition font-medium flex items-center justify-center">
              커리큘럼 보기
            </a>
            <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-white text-white px-8 py-3 hover:opacity-90 transition font-medium flex items-center justify-center">
              원데이 클래스 예약
            </a>
          </div>
        </div>
      </section>

      {/* Intro Section (Vienna Academy Style) */}
      <section class="py-20 bg-[#FFFFFF]">
        <div class="intro-section">
          <p class="handwriting-label">What We Offer</p>
          <p class="intro-text">
            금관악기는 오랜 역사와 함께 오케스트라의 중심에서 웅장한 소리를 만들어왔습니다.<br />
            트럼펫, 호른, 트롬본, 유포늄<br />
            각 악기가 가진 고유한 매력과 가능성을 리틀브라스가 이어갑니다.<br />
            금관악기 전문 교육의 새로운 기준을 만들어갑니다.
          </p>
          <p class="intro-text-italic">
            We provide professional brass instrument education with passion and dedication,
            nurturing the next generation of musicians.
          </p>
        </div>
      </section>

      {/* Instrument Cards Section (Vienna Academy Style) */}
      <section class="bg-[#FFFFFF]">
        <div class="instruments-grid">
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/trumpet.png" alt="Trumpet" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trumpet Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/horn.png" alt="Horn" />
              <div class="instrument-overlay">
                <span class="instrument-label">Horn Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/trombone.png" alt="Trombone" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trombone Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/instruments/euphonium.png" alt="Euphonium" />
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
            <img src="/static/images/academy/display-03.jpg" alt="전문 금관악기 교육" />
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
            <img src="/static/images/academy/display-02.jpg" alt="합리적인 악기 대여" />
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
            <img src="/static/images/academy/corridor-01.jpg" alt="온라인 & 오프라인" />
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

      {/* Our Space - Asymmetric Gallery Grid */}
      <section class="bg-[#FFFFFF]">
        <div class="gallery-header">
          <p class="sub-label">Our Space</p>
          <h2 class="main-title">깨끗하고 쾌적한 학원 시설</h2>
        </div>
        <div class="gallery-asymmetric">
          <div class="gallery-item large">
            <img src="/static/images/academy/lobby-01.jpg" alt="대기실" />
            <div class="image-overlay">
              <span class="image-label">Lobby</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/static/images/academy/practice-room-01.jpg" alt="연습실" />
            <div class="image-overlay">
              <span class="image-label">Practice Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="/static/images/academy/lesson-room-01.jpg" alt="레슨실" />
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
                <a href={post.link} target="_blank" rel="noopener noreferrer"
                  style="display: block; background: #f9f9f9; border-radius: 12px; border-top: 3px solid #B8941C; padding: 32px; text-decoration: none; color: inherit; transition: box-shadow 0.3s ease, transform 0.3s ease;"
                  onmouseover="this.style.boxShadow='0 8px 24px rgba(0,0,0,0.12)'; this.style.transform='translateY(-4px)';"
                  onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)';">
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
              class="inline-flex items-center gap-3 bg-[#B8941C] text-white px-10 py-4 rounded-full font-bold hover:bg-[#A0801A] transition-all hover:scale-105">
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
          <img src="/static/images/academy/yellow-door-01.jpg" alt="" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.65);"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p style="font-family: 'Dancing Script', cursive; color: #D4AF37; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Start Your Journey</p>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #fff; margin-bottom: 1rem;">지금 바로 시작하세요</h2>
          <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2.5rem;">첫 음이 울리는 순간, 당신만의 음악이 시작됩니다</p>
          <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5" target="_blank" rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 0.5rem; background: #fff; color: #B8941C; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 700; font-size: 1.1rem; transition: all 0.3s; border: 2px solid #fff; text-decoration: none;"
            onmouseover="this.style.background='#B8941C';this.style.color='#fff';"
            onmouseout="this.style.background='#fff';this.style.color='#B8941C';">
            원데이 클래스 예약하기
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>
  )
}
