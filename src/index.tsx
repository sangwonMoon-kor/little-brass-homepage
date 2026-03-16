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
app.get('/curriculum', (c) => {
  return c.render(
    <div>
      <section class="py-24 bg-[#FFFFFF]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 class="text-[48px] leading-[1.2] font-bold text-center text-[#2C2C2C] mb-4">커리큘럼</h1>
          <p class="text-center text-[#555555] mb-12">체계적이고 단계적인 교육 프로그램</p>

          {/* 피아노 커리큘럼 */}
          <div class="mb-12">
            <h2 class="text-[24px] leading-[1.4] font-bold text-[#C9A227] mb-6 flex items-center">
              <i class="fas fa-music mr-3"></i>피아노 과정
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#D4AF37]">
                <h3 class="font-bold text-lg mb-2">입문 과정</h3>
                <p class="text-sm text-[#555555] mb-3">악보 읽기, 기본 자세, 손가락 운지법</p>
                <p class="text-xs text-[#555555]">4주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#B8941C]">
                <h3 class="font-bold text-lg mb-2">초급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">스케일, 아르페지오, 간단한 곡 연주</p>
                <p class="text-xs text-[#555555]">12주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#B8941C]">
                <h3 class="font-bold text-lg mb-2">중급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">다양한 장르, 리듬 패턴, 표현력 향상</p>
                <p class="text-xs text-[#555555]">24주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#B8941C]">
                <h3 class="font-bold text-lg mb-2">고급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">클래식 명곡, 콩쿨 준비, 입시 대비</p>
                <p class="text-xs text-[#555555]">48주 이상</p>
              </div>
            </div>
          </div>

          {/* 바이올린 커리큘럼 */}
          <div class="mb-12">
            <h2 class="text-[24px] leading-[1.4] font-bold text-[#C9A227] mb-6 flex items-center">
              <i class="fas fa-music mr-3"></i>바이올린 과정
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#B8941C]">
                <h3 class="font-bold text-lg mb-2">입문 과정</h3>
                <p class="text-sm text-[#555555] mb-3">악기 다루기, 활 사용법, 기본 음계</p>
                <p class="text-xs text-[#555555]">4주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-[#D4AF37]">
                <h3 class="font-bold text-lg mb-2">초급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">1st 포지션, 간단한 멜로디 연주</p>
                <p class="text-xs text-[#555555]">12주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-blue-500">
                <h3 class="font-bold text-lg mb-2">중급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">3rd 포지션, 비브라토, 다양한 곡</p>
                <p class="text-xs text-[#555555]">24주 과정</p>
              </div>
              <div class="bg-[#FFFFFF] border border-[#EEEEEE] p-6 rounded-lg border-l-4 border-blue-400">
                <h3 class="font-bold text-lg mb-2">고급 과정</h3>
                <p class="text-sm text-[#555555] mb-3">협주곡, 실내악, 오케스트라 참여</p>
                <p class="text-xs text-[#555555]">48주 이상</p>
              </div>
            </div>
          </div>

          {/* 수업 정보 */}
          <div class="bg-[#FFFFFF] p-8 rounded-lg">
            <h2 class="text-[24px] leading-[1.4] font-bold text-[#2C2C2C] mb-6">수업 안내</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-user text-[#C9A227] mr-2"></i>개인 레슨
                </h3>
                <ul class="space-y-2 text-[#555555]">
                  <li>• 주 1회 (40분/회)</li>
                  <li>• 1:1 맞춤 레슨</li>
                  <li>• 월 20만원~</li>
                </ul>
              </div>
              <div>
                <h3 class="font-bold text-lg mb-3 flex items-center">
                  <i class="fas fa-users text-[#C9A227] mr-2"></i>그룹 레슨
                </h3>
                <ul class="space-y-2 text-[#555555]">
                  <li>• 주 1회 (60분/회)</li>
                  <li>• 2~4명 소그룹</li>
                  <li>• 월 15만원~</li>
                </ul>
              </div>
            </div>
            <div class="mt-6 p-4 bg-[#FFFFFF] border border-[#EEEEEE] rounded border-l-4 border-[#D4AF37]">
              <p class="text-sm text-[#555555]">
                <i class="fas fa-info-circle text-[#C9A227] mr-2"></i>
                <strong>참고:</strong> 수강료는 악기 및 레벨에 따라 상이할 수 있습니다. 자세한 상담은 문의 페이지를 이용해주세요.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>,
    { title: '커리큘럼 - Little Brass' }
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
