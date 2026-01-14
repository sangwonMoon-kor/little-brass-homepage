import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Little Brass - 프리미엄 금관악기 교육'}</title>
        <meta name="description" content="Little Brass 음악학원 - 전문 금관악기 교육과 온라인 레슨을 제공하는 프리미엄 음악 학원입니다." />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="/static/tailwind-config.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-white">
        {/* 스크롤 진행 바 */}
        <div class="scroll-progress" id="scroll-progress"></div>
        
        <nav class="sticky top-0 z-50 backdrop-blur-sm bg-navy-900/95 shadow-lg">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
              <div class="flex items-center">
                <a href="/" class="flex items-center space-x-3 group">
                  <div class="bg-gradient-to-br from-gold-400 to-gold-600 p-2 rounded-lg shadow-gold group-hover:shadow-xl transition-all duration-300">
                    <i class="fas fa-trumpet text-white text-xl"></i>
                  </div>
                  <div>
                    <span class="text-2xl font-display font-bold text-white block leading-tight">Little Brass</span>
                    <span class="text-xs text-gold-400 font-medium">Premium Music Academy</span>
                  </div>
                </a>
              </div>
              <div class="hidden md:flex space-x-1">
                <a href="/" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">홈</a>
                <a href="/about" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">학원소개</a>
                <a href="/teachers" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">강사소개</a>
                <a href="/curriculum" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">커리큘럼</a>
                <a href="/gallery" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">갤러리</a>
                <a href="/faq" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">FAQ</a>
                <a href="/online" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">온라인과정</a>
                <a href="/location" class="text-white hover:text-gold-400 px-4 py-2 rounded-lg transition font-medium">오시는길</a>
                <a href="/contact" class="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-6 py-2 rounded-full hover:from-gold-400 hover:to-gold-500 transition font-bold shadow-gold">
                  문의하기
                </a>
              </div>
              <button id="mobile-menu-button" class="md:hidden text-gold-400 hover:text-gold-300 transition">
                <i class="fas fa-bars text-2xl"></i>
              </button>
            </div>
          </div>
          <div id="mobile-menu" class="hidden md:hidden bg-navy-900 border-t border-navy-700">
            <div class="px-4 py-3 space-y-2">
              <a href="/" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">홈</a>
              <a href="/about" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">학원소개</a>
              <a href="/teachers" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">강사소개</a>
              <a href="/curriculum" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">커리큘럼</a>
              <a href="/gallery" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">갤러리</a>
              <a href="/faq" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">FAQ</a>
              <a href="/online" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">온라인과정</a>
              <a href="/location" class="block px-4 py-3 text-white hover:bg-navy-800 rounded-lg transition">오시는길</a>
              <a href="/contact" class="block px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-lg font-bold text-center shadow-gold">문의하기</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer class="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white mt-20">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div class="md:col-span-2">
                <div class="flex items-center space-x-3 mb-4">
                  <div class="bg-gradient-to-br from-gold-400 to-gold-600 p-3 rounded-xl shadow-gold">
                    <i class="fas fa-trumpet text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 class="text-2xl font-display font-bold">Little Brass</h3>
                    <p class="text-gold-400 text-sm font-medium">Premium Music Academy</p>
                  </div>
                </div>
                <p class="text-gray-300 leading-relaxed mb-4">
                  프리미엄 금관악기 교육의 새로운 기준<br/>
                  전문 강사진과 함께하는 최고급 음악 교육
                </p>
                <div class="flex space-x-3">
                  <a href="#" class="w-10 h-10 bg-navy-700 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <i class="fab fa-instagram text-gray-300 group-hover:text-white"></i>
                  </a>
                  <a href="#" class="w-10 h-10 bg-navy-700 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <i class="fab fa-youtube text-gray-300 group-hover:text-white"></i>
                  </a>
                  <a href="#" class="w-10 h-10 bg-navy-700 hover:bg-gold-500 rounded-lg flex items-center justify-center transition-all duration-300 group">
                    <i class="fab fa-facebook text-gray-300 group-hover:text-white"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-4 text-gold-400">바로가기</h3>
                <ul class="space-y-2">
                  <li><a href="/about" class="text-gray-300 hover:text-gold-400 transition">학원소개</a></li>
                  <li><a href="/teachers" class="text-gray-300 hover:text-gold-400 transition">강사소개</a></li>
                  <li><a href="/curriculum" class="text-gray-300 hover:text-gold-400 transition">커리큘럼</a></li>
                  <li><a href="/gallery" class="text-gray-300 hover:text-gold-400 transition">갤러리</a></li>
                  <li><a href="/faq" class="text-gray-300 hover:text-gold-400 transition">FAQ</a></li>
                  <li><a href="/online" class="text-gray-300 hover:text-gold-400 transition">온라인과정</a></li>
                </ul>
              </div>
              <div>
                <h3 class="text-lg font-bold mb-4 text-gold-400">연락처</h3>
                <ul class="space-y-3 text-gray-300">
                  <li class="flex items-start">
                    <i class="fas fa-phone text-gold-500 mt-1 mr-3"></i>
                    <span>02-1234-5678</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-envelope text-gold-500 mt-1 mr-3"></i>
                    <span>info@littlebrass.com</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-map-marker-alt text-gold-500 mt-1 mr-3"></i>
                    <span>서울특별시 강남구<br/>테헤란로 123</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="border-t border-navy-700 pt-8">
              <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                <p>&copy; 2026 Little Brass. All rights reserved.</p>
                <p class="mt-2 md:mt-0">Designed with <i class="fas fa-heart text-gold-500"></i> for music lovers</p>
              </div>
            </div>
          </div>
        </footer>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
