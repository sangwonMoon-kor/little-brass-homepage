import { Hono } from 'hono'
import { renderer } from './renderer'

// RSS 피드 파싱 헬퍼 함수들
function extractCDATA(text: string): string {
  const match = text.match(/<!\[CDATA\[([\s\S]*?)\]\]>/)
  return match ? match[1].trim() : text.trim()
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim()
}

function extractThumbnail(description: string): string | null {
  const match = description.match(/<img\s+[^>]*src="([^"]+)"/)
  return match ? match[1] : null
}

function formatDate(pubDate: string): string {
  try {
    const date = new Date(pubDate)
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}.${m}.${d}`
  } catch {
    return pubDate
  }
}

interface BlogPost {
  title: string
  link: string
  description: string
  date: string
  thumbnail: string | null
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch('https://rss.blog.naver.com/little_brass.xml')
    if (!res.ok) return []
    const xml = await res.text()

    const items: BlogPost[] = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match
    while ((match = itemRegex.exec(xml)) !== null && items.length < 3) {
      const itemXml = match[1]

      const titleMatch = itemXml.match(/<title>([\s\S]*?)<\/title>/)
      const linkMatch = itemXml.match(/<link>([\s\S]*?)<\/link>/)
      const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/)
      const dateMatch = itemXml.match(/<pubDate>([\s\S]*?)<\/pubDate>/)

      if (titleMatch && linkMatch) {
        const rawDesc = descMatch ? extractCDATA(descMatch[1]) : ''
        const plainText = stripHtmlTags(rawDesc)
        const truncated = plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText

        items.push({
          title: extractCDATA(titleMatch[1]),
          link: extractCDATA(linkMatch[1]),
          description: truncated,
          date: dateMatch ? formatDate(dateMatch[1].trim()) : '',
          thumbnail: extractThumbnail(rawDesc),
        })
      }
    }
    return items
  } catch {
    return []
  }
}

const app = new Hono()

app.use(renderer)

// 메인 페이지
app.get('/', async (c) => {
  const blogPosts = await fetchBlogPosts()

  return c.render(
    <div>
      {/* Fullscreen Video Hero Section */}
      <section class="relative h-screen overflow-hidden flex items-center justify-center">
        {/* Video Background */}
        <video
          autoplay
          muted
          loop
          playsinline
          class="absolute inset-0 w-full h-full object-cover"
          style="z-index: -1;"
        >
          <source src="https://res.cloudinary.com/ddgt7ku2v/video/upload/v1772370250/%EB%A6%AC%ED%8B%80%EB%B8%8C%EB%9D%BC%EC%8A%A4_%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80_%EB%A9%94%EC%9D%B8%EC%98%81%EC%83%81_waoubo.mp4" type="video/mp4" />
        </video>

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
              <img src="/static/images/trumpet.png" alt="Trumpet" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trumpet Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/horn.png" alt="Horn" />
              <div class="instrument-overlay">
                <span class="instrument-label">Horn Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/trombone.png" alt="Trombone" />
              <div class="instrument-overlay">
                <span class="instrument-label">Trombone Lessons</span>
              </div>
            </div>
          </div>
          <div class="instrument-card">
            <div class="instrument-image-wrapper">
              <img src="/static/images/euphonium.png" alt="Euphonium" />
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
            <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80" alt="전문 금관악기 교육" />
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
            <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80" alt="합리적인 악기 대여" />
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
            <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80" alt="온라인 & 오프라인" />
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
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" alt="레슨실" />
            <div class="image-overlay">
              <span class="image-label">Lesson Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80" alt="연습실" />
            <div class="image-overlay">
              <span class="image-label">Practice Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="대기실" />
            <div class="image-overlay">
              <span class="image-label">Lounge</span>
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
          <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&q=80" alt="" class="w-full h-full object-cover" />
          <div class="absolute inset-0" style="background: rgba(0, 0, 0, 0.65);"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p style="font-family: 'Dancing Script', cursive; color: #D4AF37; font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">Start Your Journey</p>
          <h2 style="font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 600; color: #fff; margin-bottom: 1rem;">지금 바로 시작하세요</h2>
          <p style="color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.8; margin-bottom: 2.5rem;">원데이 클래스(20,000원/30분)로 금관악기의 매력을 경험해보세요</p>
          <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5" target="_blank" rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 0.5rem; background: #fff; color: #B8941C; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 700; font-size: 1.1rem; transition: all 0.3s; border: 2px solid #fff; text-decoration: none;"
            onmouseover="this.style.background='#B8941C';this.style.color='#fff';"
            onmouseout="this.style.background='#fff';this.style.color='#B8941C';">
            원데이 클래스 예약하기
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </section>
    </div>,
    { title: 'Little Brass - 음악이 흐르는 공간' }
  )
})

// 커리큘럼 페이지
// 커리큘럼 페이지
app.get('/curriculum', (c) => {
  return c.render(
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1400&q=80" alt="Curriculum" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Curriculum</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">커리큘럼</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스의 체계적인 금관악기 교육 과정을 소개합니다</p>
        </div>
      </section>

      {/* 실기 과정 — 탭 UI */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Practical Course</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">실기 과정</h2>
          </div>

          {/* 탭 버튼 */}
          <div style="display: flex; justify-content: center; gap: 0; border-bottom: 1px solid #eee; margin-bottom: 3rem;">
            <button data-tab="trumpet" class="tab-active" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">트럼펫</button>
            <button data-tab="horn" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">호른</button>
            <button data-tab="trombone" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">트롬본</button>
            <button data-tab="euphonium" class="tab-inactive" style="padding: 12px 24px; background: none; border: none; cursor: pointer; font-size: 0.95rem; font-weight: 600; transition: all 0.3s;">유포늄</button>
          </div>

          {/* 트럼펫 */}
          <div id="tab-content-trumpet" style="display: block;">
            <div class="curriculum-timeline">
              <div class="timeline-step"><div class="timeline-circle">1</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">입문 (1~3개월)</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">마우스피스 버징, 호흡법, 기본 음역 연습</p></div>
              <div class="timeline-step"><div class="timeline-circle">2</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">초급 (3~6개월)</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">스케일, 간단한 에튀드, 텅잉 기초</p></div>
              <div class="timeline-step"><div class="timeline-circle">3</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">중급 (6~12개월)</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">다양한 조성의 스케일, 에튀드 심화, 앙상블 참여</p></div>
              <div class="timeline-step"><div class="timeline-circle">4</div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">고급 (12개월~)</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">협주곡, 콩쿨/입시 준비, 오케스트라 레퍼토리</p></div>
            </div>
          </div>
          {/* 호른 */}
          <div id="tab-content-horn" style="display: none;">
            <div class="curriculum-timeline">
              <div class="timeline-step"><div class="timeline-circle">1</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">입문</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">마우스피스 적응, 호흡법, 기본 음역</p></div>
              <div class="timeline-step"><div class="timeline-circle">2</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">초급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">자연 배음 연습, 기초 스케일, 간단한 멜로디</p></div>
              <div class="timeline-step"><div class="timeline-circle">3</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">중급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">조옮김 연습, 에튀드 심화, 앙상블</p></div>
              <div class="timeline-step"><div class="timeline-circle">4</div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">고급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">오케스트라 발췌곡, 입시/콩쿨 준비</p></div>
            </div>
          </div>
          {/* 트롬본 */}
          <div id="tab-content-trombone" style="display: none;">
            <div class="curriculum-timeline">
              <div class="timeline-step"><div class="timeline-circle">1</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">입문</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">슬라이드 포지션 익히기, 호흡법, 기본 음역</p></div>
              <div class="timeline-step"><div class="timeline-circle">2</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">초급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">스케일, 레가토/스타카토 주법, 에튀드</p></div>
              <div class="timeline-step"><div class="timeline-circle">3</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">중급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">다양한 조성, 앙상블 참여, 표현력 향상</p></div>
              <div class="timeline-step"><div class="timeline-circle">4</div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">고급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">협주곡, 오케스트라 레퍼토리, 입시 준비</p></div>
            </div>
          </div>
          {/* 유포늄 */}
          <div id="tab-content-euphonium" style="display: none;">
            <div class="curriculum-timeline">
              <div class="timeline-step"><div class="timeline-circle">1</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">입문</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">마우스피스 버징, 호흡법, 기본 음역</p></div>
              <div class="timeline-step"><div class="timeline-circle">2</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">초급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">스케일, 기초 에튀드, 음색 만들기</p></div>
              <div class="timeline-step"><div class="timeline-circle">3</div><div class="timeline-connector"></div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">중급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">에튀드 심화, 다양한 장르, 앙상블</p></div>
              <div class="timeline-step"><div class="timeline-circle">4</div><h4 style="font-weight: 700; color: #1a1a1a; margin: 0.75rem 0 0.25rem; font-size: 0.95rem;">고급</h4><p style="color: #666; font-size: 0.85rem; line-height: 1.6;">솔로곡, 콩쿨 준비, 전문 레퍼토리</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* 이론 과정 — 지그재그 */}
      <section style="background: #f9f9f9; padding: 60px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="display: flex; gap: 0; min-height: 360px;" class="flex-col md:flex-row">
            <div style="flex: 1; background: linear-gradient(135deg, #B8941C 0%, #D4AF37 50%, #C9A227 100%); display: flex; align-items: center; justify-content: center; min-height: 280px; border-radius: 12px 0 0 12px;" class="theory-image-block">
              <i class="fas fa-book-open" style="font-size: 5rem; color: rgba(255,255,255,0.3);"></i>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px; background: #fff; border-radius: 0 12px 12px 0; border: 1px solid #eee; border-left: none;" class="theory-text-block">
              <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Theory Course</p>
              <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1rem;">뮤토랑 음악이론반</h2>
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;"><span style="color: #B8941C; font-weight: 600; font-size: 0.9rem; min-width: 48px;">대상</span><span style="color: #555; font-size: 0.9rem;">초등 고학년 ~ 중학생</span></div>
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;"><span style="color: #B8941C; font-weight: 600; font-size: 0.9rem; min-width: 48px;">내용</span><span style="color: #555; font-size: 0.9rem; line-height: 1.6;">악보 읽기(독보력), 음악 기초 이론, 리듬 훈련, 음정/화성 기초</span></div>
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;"><span style="color: #B8941C; font-weight: 600; font-size: 0.9rem; min-width: 48px;">특징</span><span style="color: #555; font-size: 0.9rem;">실기 병행 없이 이론만 수강 가능</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 수업 안내 */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Lesson Info</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">수업 안내</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="margin-bottom: 2.5rem;">
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-user" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 1rem;">개인 레슨</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">주 1회 (40분/회)<br/>1:1 맞춤 레슨</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-ticket-alt" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 1rem;">원데이 클래스</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">20,000원 / 30분<br/>악기 체험 수업</p>
            </div>
          </div>
          <div style="text-align: center;">
            <a href="/location" style="display: inline-flex; align-items: center; gap: 0.75rem; background: #B8941C; color: #fff; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: all 0.3s;" onmouseover="this.style.background='#A0801A'; this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#B8941C'; this.style.transform='translateY(0)'">
              <i class="fas fa-phone-alt"></i> 상담 문의하기
            </a>
          </div>
        </div>
      </section>
    </div>,
    { title: '커리큘럼 - Little Brass' }
  )
})

// 교육철학 페이지
app.get('/philosophy', (c) => {
  return c.render(
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1400&q=80" alt="Philosophy" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Philosophy</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">교육철학</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스가 추구하는 음악 교육의 가치</p>
        </div>
      </section>

      {/* 원장 소개 — 지그재그 */}
      <section style="background: #FFFFFF; padding: 80px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="zigzag-row">
            <div class="zigzag-image" style="background: linear-gradient(135deg, #B8941C 0%, #D4AF37 50%, #C9A227 100%); display: flex; align-items: center; justify-content: center;">
              <i class="fas fa-music" style="font-size: 5rem; color: rgba(255,255,255,0.3);"></i>
            </div>
            <div class="zigzag-text">
              <p class="sub-label" style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">About the Director</p>
              <h2 class="main-title" style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 2rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.25rem;">골드쌤 원장</h2>
              <p class="desc" style="color: #555; font-size: 0.95rem; line-height: 1.9;">안녕하세요. 리틀브라스 음악학원 원장 골드쌤입니다.<br/><br/>금관악기의 아름다운 소리와 가능성을 더 많은 분들에게 전하고 싶어 리틀브라스를 열게 되었습니다. 아이들부터 성인까지, 처음 악기를 잡는 순간부터 무대에 서는 그날까지 함께하겠습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 교육 철학 3가지 */}
      <section style="background: #f9f9f9; padding: 80px 0;">
        <div style="max-width: 800px; margin: 0 auto; padding: 0 1.5rem;">
          <div style="text-align: center; margin-bottom: 3rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Our Values</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">우리의 교육 철학</h2>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0; border-bottom: 1px solid #e5e5e5;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">01</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">기초에 충실한 교육</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">화려한 테크닉보다 탄탄한 기본기를 먼저 다집니다. 호흡, 앙부쉬르, 음색 — 기초가 단단해야 음악이 자유로워집니다.</p></div>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0; border-bottom: 1px solid #e5e5e5;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">02</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">학생 중심 맞춤 교육</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">같은 악기라도 학생마다 신체 조건, 성향, 목표가 다릅니다. 획일적인 커리큘럼이 아닌 개인별 맞춤 지도를 합니다.</p></div>
          </div>
          <div style="display: flex; gap: 2rem; align-items: flex-start; padding: 2.5rem 0;">
            <span style="font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 700; color: #B8941C; opacity: 0.15; line-height: 1; min-width: 80px;">03</span>
            <div><h3 style="font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">음악을 즐기는 경험</h3><p style="color: #555; font-size: 0.95rem; line-height: 1.8;">연습은 때로 힘들지만, 음악은 결국 즐거워야 합니다. 연주회, 앙상블, 다양한 장르 경험을 통해 음악의 즐거움을 느끼게 합니다.</p></div>
          </div>
        </div>
      </section>

      {/* 차별화 포인트 — 2x2 카드 */}
      <section style="background: #FFFFFF; padding: 80px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 3rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Why Little Brass</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">리틀브라스가 특별한 이유</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-music" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">금관악기 전문</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">피아노 학원이 아닙니다. 트럼펫, 호른, 트롬본, 유포늄 금관악기만 전문으로 교육합니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-medal" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">군악대 입시 100% 합격</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">실전 중심 커리큘럼으로 군악대 입시 준비반을 운영하며, 높은 합격률을 자랑합니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-video" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">온라인 레슨 가능</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">해외·지방 거주 학생도 Zoom을 통한 실시간 온라인 레슨으로 수업받을 수 있습니다.</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; transition: all 0.3s; text-align: center;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 8px 30px rgba(184,148,28,0.15)'; this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;"><i class="fas fa-theater-masks" style="color: #B8941C; font-size: 1.5rem;"></i></div>
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">정기 연주회 개최</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">3개월 배운 학생부터 2년차 학생까지, 모두가 무대에 서는 정기 연주회를 매년 개최합니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '교육철학 - Little Brass' }
  )
})

// 갤러리 페이지
// 갤러리 페이지
app.get('/gallery', (c) => {
  return c.render(
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1514119412350-e174d90d585e?w=1400&q=80" alt="Gallery" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
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
            <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80" alt="레슨실" />
            <div class="image-overlay">
              <span class="image-label">Lesson Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80" alt="연습실" />
            <div class="image-overlay">
              <span class="image-label">Practice Room</span>
            </div>
          </div>
          <div class="gallery-item">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="대기실" />
            <div class="image-overlay">
              <span class="image-label">Lounge</span>
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
              <img src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=600&q=80" alt="수업 풍경" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>수업 풍경</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80" alt="앙상블 연습" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>앙상블 연습</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&q=80" alt="개인 레슨" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>개인 레슨</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80" alt="연주회 무대" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>연주회 무대</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&q=80" alt="정기 연주회" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>정기 연주회</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80" alt="그룹 레슨" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>그룹 레슨</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 블로그 안내 — CTA 배경 이미지 */}
      <section style="position: relative; padding: 80px 0; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1400&q=80" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.65);"></div>
        <div style="position: relative; z-index: 1; max-width: 600px; margin: 0 auto; text-align: center; padding: 0 1.5rem;">
          <p style="font-family: 'Dancing Script', cursive; color: #D4AF37; font-size: 2rem; font-weight: 600; margin-bottom: 0.75rem;">More Stories</p>
          <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 2.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">더 많은 이야기가 궁금하시다면</h2>
          <p style="color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.7; margin-bottom: 2.5rem;">리틀브라스 블로그에서 수업 후기, 연주회 소식, 음악 이야기를 확인하세요</p>
          <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 0.75rem; background: #fff; color: #B8941C; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 0.95rem; transition: all 0.3s;"
            onmouseover="this.style.background='#B8941C'; this.style.color='#fff'; this.style.transform='translateY(-2px)'"
            onmouseout="this.style.background='#fff'; this.style.color='#B8941C'; this.style.transform='translateY(0)'">
            <i class="fas fa-blog"></i> 블로그 바로가기
          </a>
        </div>
      </section>
    </div>,
    { title: '갤러리 - Little Brass' }
  )
})

// 찾아오시는 길 페이지
app.get('/location', (c) => {
  return c.render(
    <div>
      {/* 배너 헤더 */}
      <section style="position: relative; height: 300px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
        <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=80" alt="Location" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Location</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">찾아오시는 길</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스 음악학원으로 오시는 길을 안내합니다</p>
        </div>
      </section>

      {/* 네이버지도 임베드 */}
      <section>
        <iframe
          src="https://map.naver.com/p/entry/place/1094694626?c=15.00,0,0,0,dh"
          style="width: 100%; height: 450px; border: none;"
          allowfullscreen
          loading="lazy"
          title="리틀브라스 음악학원 위치"
        ></iframe>
      </section>

      {/* 학원 정보 섹션 */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 왼쪽: 연락처 정보 */}
            <div>
              <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin-bottom: 2rem;">연락처 정보</h2>
              <div style="display: flex; flex-direction: column; gap: 0;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-map-marker-alt" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">주소</p>
                    <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">서울특별시 강동구 상일로12길 99 리엔프라자 501호</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-phone-alt" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">전화</p>
                    <a href="tel:010-5819-4687" style="color: #555; font-size: 0.95rem; text-decoration: none;">010-5819-4687</a>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-envelope" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">이메일</p>
                    <a href="mailto:little_brass@naver.com" style="color: #555; font-size: 0.95rem; text-decoration: none;">little_brass@naver.com</a>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                  <div style="width: 40px; height: 40px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i class="fas fa-clock" style="color: #B8941C; font-size: 0.9rem;"></i>
                  </div>
                  <div>
                    <p style="color: #333; font-size: 0.95rem; font-weight: 600; margin-bottom: 2px;">운영시간</p>
                    <p style="color: #555; font-size: 0.95rem; line-height: 2;">평일 14:00 - 21:00<br/>토요일 10:00 - 18:00<br/>일요일 휴무</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽: 액션 버튼 */}
            <div style="display: flex; flex-direction: column; gap: 20px; justify-content: center;">
              <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5"
                target="_blank" rel="noopener noreferrer"
                style="display: flex; align-items: center; gap: 1rem; background: #B8941C; color: #fff; padding: 28px; border-radius: 12px; text-decoration: none; transition: all 0.3s;"
                onmouseover="this.style.background='#A0801A'; this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'"
                onmouseout="this.style.background='#B8941C'; this.style.transform='scale(1)'; this.style.boxShadow='none'">
                <i class="fas fa-ticket-alt" style="font-size: 1.75rem;"></i>
                <div>
                  <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">원데이 클래스 예약하기</p>
                  <p style="font-size: 0.85rem; opacity: 0.7;">네이버에서 간편하게 예약하세요</p>
                </div>
              </a>
              <a href="#"
                style="display: flex; align-items: center; gap: 1rem; background: #FEE500; color: #3C1E1E; padding: 28px; border-radius: 12px; text-decoration: none; transition: all 0.3s;"
                onmouseover="this.style.background='#EDDA00'; this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.15)'"
                onmouseout="this.style.background='#FEE500'; this.style.transform='scale(1)'; this.style.boxShadow='none'">
                <i class="fas fa-comment" style="font-size: 1.75rem;"></i>
                <div>
                  <p style="font-size: 1.1rem; font-weight: 700; margin-bottom: 4px;">카카오톡 문의하기</p>
                  <p style="font-size: 0.85rem; opacity: 0.6;">1:1 채팅으로 편하게 문의하세요</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 교통편 안내 — 3열 카드 */}
      <section style="background: #f9f9f9; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Transportation</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a;">교통편 안내</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-subway" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">지하철</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">9호선 상일동역 3번 출구 도보 5분</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-bus" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">버스</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">강동구 방면 시내버스 이용</p>
            </div>
            <div style="background: #fff; border: 1px solid #eee; border-radius: 12px; padding: 32px; text-align: center;">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-parking" style="color: #B8941C; font-size: 1.5rem;"></i>
              </div>
              <h3 style="font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.5rem;">주차</h3>
              <p style="color: #555; font-size: 0.95rem; line-height: 1.6;">건물 내 주차장 이용 가능</p>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '찾아오시는 길 - Little Brass' }
  )
})


// 404 에러 페이지
app.notFound((c) => {
  return c.render(
    <div>
      <section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0 bg-navy-900"></div>
        </div>
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-24">
          {/* 404 애니메이션 */}
          <div class="mb-12">
            <div class="inline-block relative">
              <h1 class="text-9xl font-display font-bold text-gold-400 mb-4 animate-pulse">
                404
              </h1>
              <div class="absolute -top-8 -right-8">
                <i class="fas fa-music text-gold-500 text-6xl opacity-20 animate-spin-slow"></i>
              </div>
            </div>
          </div>

          {/* 메시지 */}
          <div class="mb-12">
            <h2 class="section-title">페이지를 찾을 수 없습니다</h2>
            <p class="text-[20px] leading-[1.6] font-normal text-gray-300 mb-2">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
            </p>
            <p class="text-gray-400">
              주소를 다시 확인하시거나 아래 버튼을 통해 홈으로 돌아가세요.
            </p>
          </div>

          {/* 버튼 그룹 */}
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="/"
              class="inline-flex items-center gap-3 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 px-8 py-4 rounded-full font-bold hover:from-gold-400 hover:to-gold-500 transition-all shadow-sm hover:shadow-md hover:scale-105">
              <i class="fas fa-home text-[20px] leading-[1.6] font-normal"></i>
              <span>홈으로 돌아가기</span>
            </a>
          </div>

          {/* 인기 페이지 링크 */}
          <div class="border-t border-white/20 pt-12">
            <p class="text-gray-400 mb-6">또는 인기 페이지를 방문해보세요</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/curriculum" class="bg-[#FFFFFF]/10 backdrop-blur-sm hover:bg-[#FFFFFF]/20 border border-[#EEEEEE] rounded-xl p-4 transition-all hover:-translate-y-1">
                <i class="fas fa-book text-gold-400 text-[24px] leading-[1.4] mb-2"></i>
                <p class="text-sm font-semibold">커리큘럼</p>
              </a>
              <a href="/philosophy" class="bg-[#FFFFFF]/10 backdrop-blur-sm hover:bg-[#FFFFFF]/20 border border-[#EEEEEE] rounded-xl p-4 transition-all hover:-translate-y-1">
                <i class="fas fa-lightbulb text-gold-400 text-[24px] leading-[1.4] mb-2"></i>
                <p class="text-sm font-semibold">교육철학</p>
              </a>
              <a href="/gallery" class="bg-[#FFFFFF]/10 backdrop-blur-sm hover:bg-[#FFFFFF]/20 border border-[#EEEEEE] rounded-xl p-4 transition-all hover:-translate-y-1">
                <i class="fas fa-images text-gold-400 text-[24px] leading-[1.4] mb-2"></i>
                <p class="text-sm font-semibold">갤러리</p>
              </a>
              <a href="/location" class="bg-[#FFFFFF]/10 backdrop-blur-sm hover:bg-[#FFFFFF]/20 border border-[#EEEEEE] rounded-xl p-4 transition-all hover:-translate-y-1">
                <i class="fas fa-map-marker-alt text-gold-400 text-[24px] leading-[1.4] mb-2"></i>
                <p class="text-sm font-semibold">찾아오시는 길</p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '404 - 페이지를 찾을 수 없습니다 | Little Brass' }
  )
})

// API: 네이버 블로그 RSS 피드
app.get('/api/blog/rss', async (c) => {
  try {
    // 설정 (하드코딩)
    const config = {
      pinnedPost: {
        enabled: true,
        title: "[강동 강명초 예비 초등 트럼펫]3월 신학기 적응, '예체능'은 선택이 아닌 '생존 체력' 준비하기!",
        category: "중요 공지",
        description: "신학기 시작 전 예체능 준비의 중요성! 강명초 예비 초등 학부모님들을 위한 특별 안내",
        link: "https://blog.naver.com/little_brass/224143518011",
        date: "2026-01-12"
      },
      rssUrl: "https://rss.blog.naver.com/little_brass.xml",
      displayCount: 3,
      showPinned: true
    }

    // RSS 피드 가져오기
    const rssResponse = await fetch(config.rssUrl)
    const rssText = await rssResponse.text()

    // RSS 파싱 (간단한 정규식 방식)
    const items: any[] = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match

    while ((match = itemRegex.exec(rssText)) !== null && items.length < 10) {
      const itemContent = match[1]

      const title = (itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || [])[1] || ''
      const link = (itemContent.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/) || [])[1] || ''
      const category = (itemContent.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/) || [])[1] || '일반'
      const description = (itemContent.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || [])[1] || ''
      const pubDate = (itemContent.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || ''

      // 설명 텍스트 추출 (HTML 태그 제거)
      const cleanDescription = description
        .replace(/<img[^>]*>/g, '')
        .replace(/<[^>]+>/g, '')
        .substring(0, 100)
        .trim()

      items.push({
        title: title.trim(),
        link: link.trim(),
        category: category.trim(),
        description: cleanDescription || '최신 소식을 확인하세요',
        pubDate: pubDate.trim()
      })
    }

    // 최신 글 3개만 반환
    const latestPosts = items.slice(0, 3).map(item => ({
      title: item.title,
      link: item.link,
      description: item.description,
      category: item.category,
      isPinned: false
    }))

    return c.json({
      success: true,
      posts: latestPosts
    })
  } catch (error) {
    console.error('RSS 파싱 오류:', error)
    return c.json({
      success: false,
      message: 'RSS 피드를 가져오는데 실패했습니다.',
      posts: []
    }, 500)
  }
})

export default app
