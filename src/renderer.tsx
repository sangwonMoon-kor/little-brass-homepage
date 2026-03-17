import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children, title }: { children?: any; title?: string;[key: string]: any }) => {
    const pageTitle = title || 'Little Brass - 프리미엄 금관악기 교육'
    const description = '리틀브라스 음악학원 - 트럼펫, 호른, 트롬본, 유포늄 금관악기 전문 교육. 서울 강동구 상일동.'
    const siteUrl = 'https://little-brass-homepage.pages.dev'
    const ogImage = `${siteUrl}/og-image.jpg`

    return (
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>{pageTitle}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content="Little Brass, 리틀브라스, 음악학원, 금관악기, 트럼펫, 혼, 트롬본, 유포늄, 음악 레슨, 온라인 레슨, 강동구 음악학원, 예고 입시, 음대 입시" />
          <meta name="author" content="Little Brass" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:site_name" content="Little Brass" />
          <meta property="og:locale" content="ko_KR" />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={siteUrl} />
          <meta property="twitter:title" content={pageTitle} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={ogImage} />

          {/* Canonical URL */}
          <link rel="canonical" href={siteUrl} />

          {/* Favicon */}
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />

          <script src="https://cdn.tailwindcss.com"></script>
          <script src="/static/tailwind-config.js"></script>
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
          <link href="/static/style.css" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Dancing+Script:wght@400;600;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        </head>
        <body class="bg-[#FFFFFF] text-[#555555]">
          {/* 스크롤 진행 바 */}
          <div class="scroll-progress" id="scroll-progress"></div>


          {/* Top Info Bar (Vienna Academy Style) */}
          <div class="absolute top-0 left-0 right-0 z-50 hidden lg:block" id="top-info-bar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between h-10 text-white/80 text-xs border-b border-white/10">
                <div class="flex items-center gap-1.5">
                  <i class="fas fa-map-marker-alt text-[10px]"></i>
                  <span>서울시 강동구 상일동</span>
                </div>
                <a href="mailto:little_brass@naver.com" class="flex items-center gap-1.5 hover:text-white transition">
                  <i class="fas fa-envelope text-[10px]"></i>
                  <span>little_brass@naver.com</span>
                </a>
                <div class="flex items-center gap-3">
                  <a href="https://instagram.com/little_brass.official" target="_blank" rel="noopener noreferrer" aria-label="인스타그램" class="text-white/60 hover:text-white transition"><i class="fab fa-instagram text-sm"></i></a>
                  <a href="https://youtube.com/@Littlebrass" target="_blank" rel="noopener noreferrer" aria-label="유튜브" class="text-white/60 hover:text-white transition"><i class="fab fa-youtube text-sm"></i></a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation (Vienna Academy Style) */}
          <nav class="absolute top-0 lg:top-10 left-0 right-0 z-50 transition-all duration-300 nav-scrolled" id="main-nav">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center h-16 lg:h-20">
                {/* Logo */}
                <a href="/" class="nav-logo">
                  <span class="text-xl lg:text-2xl font-bold text-white tracking-[0.15em]" style="font-family: 'Playfair Display', serif;">LITTLE BRASS</span>
                </a>

                {/* Desktop Menu */}
                <div class="hidden lg:flex items-center">
                  <a href="/" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">홈</a>
                  <a href="/curriculum" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">커리큘럼</a>
                  <a href="/philosophy" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">교육철학</a>
                  <a href="/gallery" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">갤러리</a>
                  <a href="/location" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide">찾아오시는 길</a>
                </div>

                {/* Mobile Menu Button */}
                <button id="mobile-menu-button" class="lg:hidden text-white hover:text-white/80 transition" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobile-menu">
                  <i class="fas fa-bars text-2xl"></i>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div id="mobile-menu" class="hidden lg:hidden bg-white/95 backdrop-blur-sm">
              <div class="px-4 py-3 space-y-1">
                <a href="/" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">홈</a>
                <a href="/curriculum" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">커리큘럼</a>
                <a href="/philosophy" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">교육철학</a>
                <a href="/gallery" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">갤러리</a>
                <a href="/location" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">찾아오시는 길</a>
                <div class="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
                  <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center rounded-full bg-[#C9A227] text-white h-12 px-6 hover:bg-[#B8941C] transition-colors text-base font-medium">
                    <i class="fas fa-ticket-alt mr-2"></i>원데이 클래스
                  </a>
                </div>
              </div>
            </div>
          </nav>
          <main>{children}</main>

          {/* 플로팅 원데이 클래스 버튼 */}
          <a
            href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5"
            target="_blank"
            rel="noopener noreferrer"
            class="fixed bottom-6 right-6 bg-gradient-to-r from-[#D4AF37] to-[#B8941C] text-white px-6 py-4 rounded-full shadow-md hover:from-[#E6C86F] hover:to-[#D4AF37] hover:scale-110 transition-all duration-300 z-50 flex items-center gap-3 font-bold animate-bounce-slow"
            id="floating-oneday-button"
          >
            <i class="fas fa-ticket-alt text-xl"></i>
            <span class="hidden sm:inline">원데이 클래스</span>
          </a>

          <footer style="background: #1a1a1a; color: #ffffff; padding: 0; margin-top: 0;">
            <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Left: Logo + Tagline */}
                <div>
                  <h3 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Little Brass</h3>
                  <p style="color: #999; font-size: 0.95rem; line-height: 1.8;">금관악기 전문 음악학원</p>
                </div>

                {/* Center: Contact Info */}
                <div>
                  <h4 style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #B8941C; margin-bottom: 1rem;">Contact</h4>
                  <div style="display: flex; flex-direction: column; gap: 0.5rem; color: #999; font-size: 0.9rem;">
                    <p style="margin: 0;">서울특별시 강동구 상일로12길 99 리엔프라자 501호</p>
                    <a href="tel:010-5819-4687" style="color: #999;">010-5819-4687</a>
                    <a href="mailto:little_brass@naver.com" style="color: #999;">little_brass@naver.com</a>
                  </div>
                </div>

                {/* Right: SNS + Naver */}
                <div>
                  <h4 style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #B8941C; margin-bottom: 1rem;">Follow Us</h4>
                  <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
                    <a href="https://www.instagram.com/little_brass.official" target="_blank" rel="noopener noreferrer" style="color: #999; display: flex; align-items: center; gap: 0.5rem;">
                      <i class="fab fa-instagram"></i> @little_brass.official
                    </a>
                    <a href="https://map.naver.com/p/entry/place/1094694626?placePath=/ticket&from=map&fromPanelNum=1&additionalHeight=76&locale=ko&svcName=map_pcv5" target="_blank" rel="noopener noreferrer" style="color: #999; display: flex; align-items: center; gap: 0.5rem;">
                      <i class="fas fa-calendar-check"></i> 네이버 예약
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Bottom Bar */}
            <div style="border-top: 1px solid #333; padding: 1.5rem 0; text-align: center;">
              <p style="font-size: 0.75rem; color: #666; margin: 0;">&copy; {new Date().getFullYear()} Little Brass. All rights reserved.</p>
            </div>
          </footer>
          <script src="/static/app.js"></script>
        </body>
      </html>
    )
  }
)