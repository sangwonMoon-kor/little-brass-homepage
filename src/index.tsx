import { Hono } from 'hono'
import { absoluteUrl, PUBLIC_ROUTES, resolveSiteOrigin } from './config/site'
import { renderer } from './renderer'
import type { Bindings } from './types/site'

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

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)

app.get('/sitemap.xml', (c) => {
  const origin = resolveSiteOrigin(c.req.url, c.env?.PUBLIC_SITE_URL)
  const urls = PUBLIC_ROUTES.map(
    ({ path }) => `  <url><loc>${absoluteUrl(origin, path)}</loc></url>`,
  ).join('\n')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

  return c.body(xml, 200, { 'Content-Type': 'application/xml; charset=UTF-8' })
})

app.get('/robots.txt', (c) => {
  const origin = resolveSiteOrigin(c.req.url, c.env?.PUBLIC_SITE_URL)
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(origin, '/sitemap.xml')}\n`

  return c.text(robots)
})

// 메인 페이지
app.get('/', async (c) => {
  const blogPosts = await fetchBlogPosts()

  return c.render(
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
        <img src="/static/images/academy/display-04.jpg" alt="Curriculum" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Curriculum</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">커리큘럼</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스의 체계적인 금관악기 교육 과정을 소개합니다</p>
        </div>
      </section>

      {/* 실기 과정 — 탭 UI */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Practical Course</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">실기 과정</h2>
          </div>

          {/* 악기 성향별 추천 */}
          <div style="background: #faf8f2; border: 1px solid #f0ebdd; border-radius: 16px; padding: 28px; margin-bottom: 2.5rem;">
            <h3 style="text-align: center; font-weight: 700; font-size: 1.1rem; color: #1a1a1a; margin-bottom: 0.4rem;">어떤 악기가 나에게 맞을까요?</h3>
            <p style="text-align: center; color: #666; font-size: 0.88rem; line-height: 1.6; margin-bottom: 1.5rem;">악기마다 음색과 성향이 다릅니다. 리틀브라스에서는 <strong style="color: #B8941C;">여러 악기를 직접 체험해 보고</strong> 자신에게 맞는 악기를 선택할 수 있습니다.</p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">트럼펫</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">밝고 화려한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">호른</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">깊고 풍부한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">트롬본</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">활동적이고 다이나믹한 음색</p>
              </div>
              <div style="text-align: center; padding: 1.1rem 0.75rem; background: #fff; border: 1px solid #f0ebdd; border-radius: 12px;">
                <h4 style="font-weight: 700; font-size: 0.95rem; color: #1a1a1a; margin-bottom: 0.3rem;">유포늄</h4>
                <p style="font-size: 0.8rem; color: #666; line-height: 1.5; margin: 0;">따뜻하고 부드러운 음색</p>
              </div>
            </div>
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
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">악기와 친해지고 기본 연주 자세를 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">악기와 친해지고 기본기 익히기</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 자세·호흡, 한 옥타브 음역</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 초등 저학년~성인 입문자</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">기초 주법을 다지고 간단한 곡을 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법 습득과 간단한 멜로디 연주</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 싱글 텅잉, 기초 에튀드 (클라크, 아르방)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음을 안정적으로 낼 수 있는 분, 악보 기초를 배운 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">음역을 넓히고 다양한 주법을 구사하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음역 확장과 표현력 있는 연주 구현</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 더블 텅잉, 에튀드 심화, 앙상블 참여</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법을 익힌 분, 앙상블·합주에 참여하고 싶은 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">전문 레퍼토리 연주 및 입시·콩쿨을 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">연주 완성도와 개인 목표(입시/무대) 달성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡, 오케스트라 발췌, 콩쿨·군악대 입시 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 과정을 마친 분, 입시·전공·무대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 호른 */}
          <div id="tab-content-horn" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">깊고 좁은 마우스피스에 적응하고 기본 음을 내는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 적응과 안정적인 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 호흡과 지지, 저음역 음정 익히기</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 음악적 감수성이 풍부한 입문자</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">자연 배음과 기초 스케일을 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">배음 컨트롤과 기초 음악 표현</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">자연 배음 연습, 기초 장조 스케일, 간단한 멜로디</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기본 음을 낼 수 있는 분, 클래식 음악에 관심 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">조옮김과 핸드 포지션을 익히며 표현력을 키우는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">조옮김 읽기와 핸드 포지션 기법 습득</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">F·B♭ 이중 호른 운용, 조옮김, 에튀드 심화, 앙상블</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 스케일을 마친 분, 오케스트라 파트를 경험하고 싶은 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">오케스트라 발췌곡과 솔로 레퍼토리를 완성하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">전문 오케스트라 파트 연주 및 독주 역량 강화</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">오케스트라 발췌 (모차르트, 브람스), 협주곡, 입시·콩쿨 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전문 연주·전공을 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 트롬본 */}
          <div id="tab-content-trombone" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">슬라이드 7포지션을 익히고 안정적인 음을 내는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">슬라이드 포지션 암기와 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">슬라이드 1~7 포지션, 호흡법, 기본 음역 (B♭2~B♭3)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 저음역 악기에 관심 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">기초 주법과 스케일을 익혀 간단한 곡을 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">레가토·스타카토 주법 습득과 조성 이해</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 레가토·스타카토, 기초 에튀드</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">포지션에 익숙해진 분, 악보를 읽을 수 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">다양한 조성과 표현력을 키우며 앙상블에 참여하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음악적 표현과 앙상블 내 역할 수행</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 에튀드 심화, 앙상블 파트 연습</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 주법을 마친 분, 합주·밴드 활동에 관심 있는 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">협주곡과 오케스트라 레퍼토리를 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">전문 연주 완성도와 입시·무대 목표 달성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡 (그론달, 마르틴), 오케스트라 발췌, 입시·콩쿨 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전공·군악대·무대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>
          {/* 유포늄 */}
          <div id="tab-content-euphonium" style="display: none;">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {/* 01 입문 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">01</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">입문</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">1~3개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">풍부한 저음역에 적응하고 기초 자세를 익히는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">큰 마우스피스 적응과 안정적인 기본 음 생성</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">마우스피스 버징, 호흡·지지, 기본 음역 (B♭2~B♭3)</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">처음 시작하는 분, 깊고 따뜻한 음색을 좋아하는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">2회 만에 첫 소리 내기, 1개월에 예제곡 10곡 완성</p></div>
              </div>
              {/* 02 초급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">02</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">초급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">3~6개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">스케일과 음색을 다듬으며 기초 에튀드를 연주하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">음색 만들기와 기초 조성 연주</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장조 스케일, 기초 에튀드, 음색 컨트롤 연습</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기본 음을 안정적으로 내는 분, 악보를 배우고 있는 분</p></div>
                </div>
                <div style="margin-top: 0.85rem; background: rgba(184,148,28,0.07); border-radius: 8px; padding: 0.6rem 0.7rem;"><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block; margin-bottom: 0.15rem;"><i class="fas fa-bullseye" style="margin-right: 0.3rem;"></i>성취 포인트</span><p style="font-size: 0.8rem; color: #444; margin: 0; line-height: 1.5;">3개월에 교재 1권 마스터, 자유곡 1곡 이상 연주</p></div>
              </div>
              {/* 03 중급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">03</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">중급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">6~12개월</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">음악적 표현력을 키우고 다양한 장르를 경험하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">다양한 장르 연주와 앙상블 참여</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">장·단조 스케일, 에튀드 심화, 취주악·앙상블 파트</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">기초 에튀드를 마친 분, 취주악단·앙상블에 관심 있는 분</p></div>
                </div>
              </div>
              {/* 04 고급 */}
              <div style="background: #fff; border: 1px solid #eee; border-top: 3px solid #B8941C; border-radius: 16px; padding: 28px; display: flex; flex-direction: column;">
                <div style="font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: #B8941C; opacity: 0.2; line-height: 1; margin-bottom: 0.35rem;">04</div>
                <h3 style="font-weight: 700; font-size: 1.05rem; color: #1a1a1a; margin-bottom: 0.2rem;">고급</h3>
                <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 0.75rem;">12개월~</p>
                <p style="color: #444; font-size: 0.85rem; line-height: 1.6; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f0;">솔로 레퍼토리와 콩쿨·입시를 준비하는 단계</p>
                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: auto;">
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">학습 목표</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">독주 완성도와 전문 연주 역량 강화</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">주요 내용</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">협주곡 (요크), 취주악 전문 레퍼토리, 콩쿨·군악대 입시 준비</p></div>
                  <div><span style="font-size: 0.7rem; font-weight: 700; color: #B8941C; display: block;">추천 대상</span><p style="font-size: 0.82rem; color: #555; margin: 0.1rem 0 0; line-height: 1.5;">중급 수료 후 전공·솔리스트·군악대를 목표로 하는 분</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* 군악대·입시 전문 안내 */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5" style="margin-top: 3rem;">
            <div style="background: #1a1a1a; border-radius: 16px; padding: 32px; color: #fff;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem;"><i class="fas fa-medal" style="color: #C9A227; font-size: 1.25rem;"></i><h3 style="font-weight: 700; font-size: 1.15rem; color: #fff; margin: 0;">군악대 오디션 준비</h3></div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.88rem; line-height: 1.75; margin: 0;">악기별 군악대 실기시험곡 데이터를 보유하고 있어, 지원자에게 맞는 곡을 추천합니다. 현재 실력과 목표 시기에 따라 <strong style="color: #C9A227;">음역대를 조정한 맞춤 편곡</strong>까지 함께 진행하여, 행진곡·팡파레 스타일의 안정적인 사운드를 완성합니다.</p>
            </div>
            <div style="background: #1a1a1a; border-radius: 16px; padding: 32px; color: #fff;">
              <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.9rem;"><i class="fas fa-graduation-cap" style="color: #C9A227; font-size: 1.25rem;"></i><h3 style="font-weight: 700; font-size: 1.15rem; color: #fff; margin: 0;">예고·음대 입시 준비</h3></div>
              <p style="color: rgba(255,255,255,0.8); font-size: 0.88rem; line-height: 1.75; margin: 0;">음악대학 입시는 <strong style="color: #C9A227;">실기 비중이 70~80% 이상</strong>(일부 학교는 100%)으로, 곡 하나의 완성보다 탄탄한 기본기와 안정적인 연주력이 핵심입니다. 기초 훈련과 입시 레슨을 병행하여 예술고등학교·음악대학 진학을 체계적으로 준비합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 이론 과정 — 지그재그 */}
      <section style="background: #f9f9f9; padding: 60px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="display: flex; gap: 0; min-height: 360px;" class="flex-col md:flex-row">
            <div style="flex: 1; min-height: 280px; border-radius: 12px 0 0 12px; overflow: hidden;" class="theory-image-block">
              <img src="/static/images/academy/piano-room-01.jpg" alt="뮤토랑 음악이론반" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 40px; background: #fff; border-radius: 0 12px 12px 0; border: 1px solid #eee; border-left: none;" class="theory-text-block">
              <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Theory Course</p>
              <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.5rem; font-weight: 600; color: #1a1a1a; margin-bottom: 0.4rem;">뮤토랑 음악이론반</h2>
              <p style="color: #666; font-size: 0.9rem; margin-bottom: 1.25rem; line-height: 1.6;">음악을 더 깊이 이해하는 시작</p>
              <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">대상</span>
                  <span style="color: #555; font-size: 0.875rem;">초등 고학년 ~ 중학생</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수업 시간</span>
                  <span style="color: #555; font-size: 0.875rem;">주 1회 · 1회 50분</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수강 옵션</span>
                  <span style="color: #555; font-size: 0.875rem;">정규반 (월 단위) · 단기 특강 가능</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">수업 방식</span>
                  <span style="color: #555; font-size: 0.875rem;">소그룹 (2~4인) · 1:1 개인 수업 선택 가능</span>
                </div>
                <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                  <span style="color: #B8941C; font-weight: 700; font-size: 0.8rem; min-width: 56px; padding-top: 1px;">특징</span>
                  <span style="color: #555; font-size: 0.875rem;">실기 병행 없이 이론만 수강 가능</span>
                </div>
              </div>
              <div style="border-top: 1px solid #f0f0f0; padding-top: 1.25rem;">
                <p style="font-size: 0.75rem; font-weight: 700; color: #B8941C; margin-bottom: 0.75rem; letter-spacing: 0.05em;">커리큘럼</p>
                <ul style="display: flex; flex-direction: column; gap: 0.45rem; list-style: none; padding: 0; margin: 0;">
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>악보 읽기 · 독보력 훈련 (음자리표, 박자, 박자표)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>리듬 훈련 (기초 리듬형 → 점음표 · 당김음)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>음정 · 음계 · 화성 기초 (장단음계, 3화음)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>시창 · 청음 입문 (계이름 읽기, 음정 구별)</li>
                  <li style="display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: #555;"><span style="color: #B8941C; margin-top: 2px;">·</span>중급반: 조성 분석, 화성 진행, 악식론 기초</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 수업 안내 */}
      <section style="background: #FFFFFF; padding: 60px 0;">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Lesson Info</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">수업 안내</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6" style="margin-bottom: 2.5rem;">
            {/* 개인 레슨 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-user" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">개인 레슨</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">1:1 맞춤 레슨</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 시간</span><span style="color: #1a1a1a; font-weight: 500;">주 1회 · 40분</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 형태</span><span style="color: #1a1a1a; font-weight: 500;">1:1 개인 레슨</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수강료</span><span style="color: #1a1a1a; font-weight: 500;">문의</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>전공자 출신 강사진 1:1 밀착 지도</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>개인 목표에 맞춘 진도 및 레퍼토리</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 입문자 ~ 전공·입시 준비생</p>
            </div>
            {/* 원데이 클래스 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-ticket-alt" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">원데이 클래스</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">악기 첫 체험</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수업 시간</span><span style="color: #1a1a1a; font-weight: 500;">30분</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">수강료</span><span style="color: #1a1a1a; font-weight: 500;">20,000원</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">예약</span><span style="color: #1a1a1a; font-weight: 500;">카카오톡 · 전화</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>트럼펫 · 호른 · 트롬본 · 유포늄 선택</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>악기 사전 지식 없이도 참여 가능</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 입문 전 체험, 선물용</p>
            </div>
            {/* 악기 대여 */}
            <div style="background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 32px; transition: all 0.3s;" onmouseover="this.style.borderColor='#B8941C'; this.style.boxShadow='0 4px 20px rgba(184,148,28,0.12)'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='#eee'; this.style.boxShadow='none'; this.style.transform='translateY(0)'">
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(184,148,28,0.1); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem;"><i class="fas fa-music" style="color: #B8941C; font-size: 1.35rem;"></i></div>
              <h3 style="font-weight: 700; font-size: 1.15rem; color: #1a1a1a; margin-bottom: 0.25rem;">악기 대여</h3>
              <p style="color: #B8941C; font-size: 0.78rem; font-weight: 600; margin-bottom: 1rem;">수업 중 무료 제공</p>
              <div style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">대여료</span><span style="color: #1a1a1a; font-weight: 500;">수업 중 무료</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">보유 악기</span><span style="color: #1a1a1a; font-weight: 500;">4종 전 악기</span></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;"><span style="color: #888;">문의</span><span style="color: #1a1a1a; font-weight: 500;">등록 시 안내</span></div>
              </div>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>트럼펫 · 호른 · 트롬본 · 유포늄 보유</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65; margin-bottom: 0.75rem;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>악기 구매 전 충분히 체험 후 결정 가능</p>
              <p style="font-size: 0.82rem; color: #555; line-height: 1.65;"><i class="fas fa-check-circle" style="color: #B8941C; margin-right: 0.4rem;"></i>추천 대상: 악기 없이 바로 시작하고 싶은 분</p>
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
        <img src="/static/images/academy/lobby-01.jpg" alt="Philosophy" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
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
            <div class="zigzag-image">
              <img src="/static/images/academy/corridor-01.jpg" alt="리틀브라스 학원" />
            </div>
            <div class="zigzag-text">
              <p class="sub-label" style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.25rem; font-weight: 600; margin-bottom: 0.75rem;">About the Director</p>
              <h2 class="main-title" style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 2rem; font-weight: 600; color: #1a1a1a; margin-bottom: 1.25rem;">골드쌤 원장</h2>
              <p class="desc" style="color: #555; font-size: 0.95rem; line-height: 1.9;">안녕하세요. 리틀브라스 음악학원 원장 골드쌤입니다.<br/><br/>금관악기의 아름다운 소리와 가능성을 더 많은 분들에게 전하고 싶어 리틀브라스를 열게 되었습니다. 아이들부터 성인까지, 처음 악기를 잡는 순간부터 무대에 서는 그날까지 함께하겠습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 브랜드 스토리 — 이름의 의미 */}
      <section style="background: #1a1a1a; padding: 80px 0;">
        <div style="max-width: 760px; margin: 0 auto; padding: 0 1.5rem; text-align: center;">
          <p style="font-family: 'Dancing Script', cursive; color: #C9A227; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Our Name</p>
          <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #fff; margin-bottom: 1.75rem;">'리틀브라스'라는 이름</h2>
          <p style="color: rgba(255,255,255,0.85); font-size: 1rem; line-height: 2; margin-bottom: 1.5rem;">'브라스(Brass)'는 금속으로 만들어 나팔로 소리 내는 <strong style="color: #C9A227;">금관악기</strong>를 뜻합니다.<br/>오케스트라의 금관 파트는 트럼펫, 트롬본, 호른, 튜바, 유포늄으로 이루어집니다.</p>
          <p style="color: rgba(255,255,255,0.85); font-size: 1rem; line-height: 2; margin: 0;">자라나는 아이들이 금관악기를 더 가까이 만나기를 바라는 마음으로<br/>이름 앞에 <strong style="color: #C9A227;">'리틀(Little)'</strong>을 붙였습니다.<br/>리틀브라스는 '작은 금관악기 연주자'라는 의미를 담고 있습니다.</p>
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
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #1a1a1a; margin-bottom: 0.75rem;">연 2회 정기연주회 &amp; 마스터클래스</h3>
              <p style="color: #555; font-size: 0.9rem; line-height: 1.7;">3개월 배운 학생부터 2년차까지 모두가 무대에 서는 정기연주회를 연 2회 개최하고, 유명 연주자를 초청한 마스터클래스·특강도 운영합니다.</p>
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
        <img src="/static/images/academy/corridor-02.jpg" alt="Gallery" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
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

      {/* Moments - 수업 & 연주회 */}
      <section style="background: #FFFFFF; padding: 0 0 60px 0;">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <p style="font-family: 'Dancing Script', cursive; color: #B8941C; font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">Moments</p>
            <h2 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 1.75rem; font-weight: 600; color: #1a1a1a;">수업 & 연주회</h2>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;" class="gallery-moments-grid">
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/display-02.jpg" alt="악기 진열" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>악기 진열</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/display-06.jpg" alt="악기 전시" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>악기 전시</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/signage-01.jpg" alt="학원 안내" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 안내</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/yellow-door-02.jpg" alt="학원 입구" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 입구</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/lesson-room-02.jpg" alt="레슨실" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>레슨실</span></div>
            </div>
            <div class="image-card" style="aspect-ratio: 1/1;">
              <img src="/static/images/academy/corridor-01.jpg" alt="학원 복도" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="image-card-overlay"><span>학원 복도</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 블로그 안내 — CTA 배경 이미지 */}
      <section style="position: relative; padding: 80px 0; overflow: hidden;">
        <img src="/static/images/academy/display-07.jpg" alt="" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
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
        <img src="/static/images/academy/yellow-door-01.jpg" alt="Location" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;" />
        <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.6);"></div>
        <div style="position: relative; z-index: 1; text-align: center; padding-top: 40px;">
          <p style="font-family: 'Dancing Script', cursive; color: rgba(255,255,255,0.8); font-size: 2rem; font-weight: 600; margin-bottom: 0.5rem;">Location</p>
          <h1 style="font-family: 'Playfair Display', 'Noto Serif KR', serif; font-size: 3rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">찾아오시는 길</h1>
          <p style="color: rgba(255,255,255,0.7); font-size: 1rem;">리틀브라스 음악학원으로 오시는 길을 안내합니다</p>
        </div>
      </section>

      {/* 네이버지도 링크 */}
      <section style="padding: 0 1rem;">
        <a href="https://map.naver.com/p/entry/place/1094694626" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; max-width: 1200px; margin: 0 auto;">
          <div style="background: #f0f0f0; height: 400px; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; transition: background 0.3s; cursor: pointer; overflow: hidden;"
            onmouseover="this.style.background='#e5e5e5'"
            onmouseout="this.style.background='#f0f0f0'">
            <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #B8941C;"></i>
            <p style="color: #333; font-size: 1rem; font-weight: 600; text-align: center; padding: 0 1rem;">서울특별시 강동구 상일로12길 99 리엔프라자 501호</p>
            <p style="color: #B8941C; font-size: 0.95rem; font-weight: 600; text-decoration: underline;">네이버 지도에서 보기 →</p>
          </div>
        </a>
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
  c.status(404)
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
