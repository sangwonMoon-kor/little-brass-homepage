import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(
  ({ children, title }: { children?: any; title?: string;[key: string]: any }) => {
    const pageTitle = title || 'Little Brass - 프리미엄 금관악기 교육'
    const description = 'Little Brass 음악학원 - 전문 금관악기 교육과 온라인 레슨을 제공하는 프리미엄 음악 학원입니다.'
    const siteUrl = 'https://littlebrass.com'
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
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Dancing+Script:wght@400;600;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
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
          <nav class="absolute top-0 lg:top-10 left-0 right-0 z-50 transition-all duration-300" id="main-nav">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center h-16 lg:h-20">
                {/* Logo */}
                <a href="/" class="nav-logo">
                  <span class="text-xl lg:text-2xl font-bold text-white tracking-[0.15em]" style="font-family: 'Playfair Display', serif;">LITTLE BRASS</span>
                </a>

                {/* Desktop Menu */}
                <div class="hidden lg:flex items-center">
                  <a href="/about" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">학원소개</a>
                  <a href="/curriculum" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">레슨안내</a>
                  <a href="/online" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">온라인과정</a>
                  <a href="/teachers" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">강사진</a>
                  <a href="/gallery" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide border-r border-white/20">갤러리</a>
                  <a href="/contact" class="nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide">문의하기</a>
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
                <a href="/about" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">학원소개</a>
                <a href="/curriculum" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">레슨안내</a>
                <a href="/online" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">온라인과정</a>
                <a href="/teachers" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">강사진</a>
                <a href="/gallery" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">갤러리</a>
                <a href="/achievements" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">학생성과</a>
                <a href="/faq" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">FAQ</a>
                <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">
                  <i class="fas fa-blog mr-2"></i>블로그
                </a>
                <a href="/location" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">오시는길</a>
                <a href="/contact" class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">문의하기</a>
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

          <footer class="bg-[#F9F9F9] text-[#555555] mt-24 border-t border-[#EEEEEE]">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="md:col-span-2">
                  <div class="flex items-center space-x-3 mb-4">
                    <div class="bg-[#D4AF37] p-3 rounded-xl shadow-sm">
                      <i class="fas fa-trumpet text-[#888888] text-2xl"></i>
                    </div>
                    <div>
                      <h3 class="text-2xl font-display font-bold text-[#2C2C2C]">Little Brass</h3>
                      <p class="text-[#C9A227] text-sm font-medium">Premium Music Academy</p>
                    </div>
                  </div>
                  <p class="text-[#888888] leading-relaxed mb-4">
                    프리미엄 금관악기 교육의 새로운 기준<br />
                    전문 강사진과 함께하는 최고급 음악 교육
                  </p>
                  <div class="flex space-x-3">
                    <a href="https://blog.naver.com/little_brass" target="_blank" rel="noopener noreferrer" aria-label="네이버 블로그" class="w-10 h-10 bg-gray-50 hover:bg-yellow-100 border border-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <i class="fas fa-blog text-[#888888] group-hover:text-[#555555]"></i>
                    </a>
                    <a href="https://instagram.com/little_brass.official" target="_blank" rel="noopener noreferrer" aria-label="인스타그램" class="w-10 h-10 bg-gray-50 hover:bg-yellow-100 border border-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <i class="fab fa-instagram text-[#888888] group-hover:text-[#555555]"></i>
                    </a>
                    <a href="https://youtube.com/@Littlebrass" target="_blank" rel="noopener noreferrer" aria-label="유튜브" class="w-10 h-10 bg-gray-50 hover:bg-yellow-100 border border-gray-100 rounded-lg flex items-center justify-center transition-all duration-300 group">
                      <i class="fab fa-youtube text-[#888888] group-hover:text-[#555555]"></i>
                    </a>
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-bold mb-4 text-[#C9A227]">바로가기</h3>
                  <ul class="space-y-2">
                    <li><a href="/about" class="text-[#888888] hover:text-[#C9A227] transition">학원소개</a></li>
                    <li><a href="/teachers" class="text-[#888888] hover:text-[#C9A227] transition">강사소개</a></li>
                    <li><a href="/curriculum" class="text-[#888888] hover:text-[#C9A227] transition">커리큘럼</a></li>
                    <li><a href="/gallery" class="text-[#888888] hover:text-[#C9A227] transition">갤러리</a></li>
                    <li><a href="/achievements" class="text-[#888888] hover:text-[#C9A227] transition">학생성과</a></li>
                    <li><a href="/faq" class="text-[#888888] hover:text-[#C9A227] transition">FAQ</a></li>
                    <li><a href="/online" class="text-[#888888] hover:text-[#C9A227] transition">온라인과정</a></li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-lg font-bold mb-4 text-[#C9A227]">연락처</h3>
                  <ul class="space-y-3 text-[#888888]">
                    <li class="flex items-start">
                      <i class="fas fa-phone text-[#C9A227] mt-1 mr-3"></i>
                      <a href="tel:010-5819-4687" class="hover:text-[#C9A227] transition">010-5819-4687</a>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-envelope text-[#C9A227] mt-1 mr-3"></i>
                      <a href="mailto:little_brass@naver.com" class="hover:text-[#C9A227] transition">little_brass@naver.com</a>
                    </li>
                    <li class="flex items-start">
                      <i class="fab fa-instagram text-[#C9A227] mt-1 mr-3"></i>
                      <a href="https://instagram.com/little_brass.official" target="_blank" rel="noopener noreferrer" class="hover:text-[#C9A227] transition">little_brass.official</a>
                    </li>
                    <li class="flex items-start">
                      <i class="fas fa-map-marker-alt text-[#C9A227] mt-1 mr-3"></i>
                      <span>서울특별시 강동구<br />상일로12길 99 리엔프라자 501호</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="border-t border-gray-300 pt-8">
                <div class="flex flex-col md:flex-row justify-between items-center text-sm text-[#888888]">
                  <p>&copy; 2026 Little Brass. All rights reserved.</p>
                  <p class="mt-2 md:mt-0">Designed with <i class="fas fa-heart text-[#C9A227]"></i> for music lovers</p>
                </div>
              </div>
            </div>
          </footer>
          <script src="/static/app.js"></script>
        </body>
      </html>
    )
  }
)