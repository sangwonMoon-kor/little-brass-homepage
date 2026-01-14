import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Little Brass - 음악이 흐르는 공간'}</title>
        <meta name="description" content="Little Brass 음악학원 - 피아노, 바이올린, 플루트 등 다양한 악기 레슨과 온라인 Zoom 레슨을 제공합니다." />
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50">
        <nav class="bg-white shadow-md sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex items-center">
                <a href="/" class="text-2xl font-bold text-amber-700">
                  <i class="fas fa-music mr-2"></i>Little Brass
                </a>
              </div>
              <div class="hidden md:flex space-x-6">
                <a href="/" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">홈</a>
                <a href="/about" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">학원소개</a>
                <a href="/teachers" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">강사소개</a>
                <a href="/curriculum" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">커리큘럼</a>
                <a href="/online" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">온라인과정</a>
                <a href="/location" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">오시는길</a>
                <a href="/contact" class="text-gray-700 hover:text-amber-700 px-3 py-2 transition">문의하기</a>
              </div>
              <button id="mobile-menu-button" class="md:hidden text-gray-700">
                <i class="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
          <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
              <a href="/" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">홈</a>
              <a href="/about" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">학원소개</a>
              <a href="/teachers" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">강사소개</a>
              <a href="/curriculum" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">커리큘럼</a>
              <a href="/online" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">온라인과정</a>
              <a href="/location" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">오시는길</a>
              <a href="/contact" class="block px-3 py-2 text-gray-700 hover:bg-amber-50 rounded">문의하기</a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer class="bg-gray-800 text-white mt-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 class="text-xl font-bold mb-4">Little Brass</h3>
                <p class="text-gray-400">음악이 흐르는 공간</p>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-4">연락처</h3>
                <p class="text-gray-400"><i class="fas fa-phone mr-2"></i>02-1234-5678</p>
                <p class="text-gray-400"><i class="fas fa-envelope mr-2"></i>info@littlebrass.com</p>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-4">소셜미디어</h3>
                <div class="flex space-x-4">
                  <a href="#" class="text-gray-400 hover:text-white text-2xl"><i class="fab fa-instagram"></i></a>
                  <a href="#" class="text-gray-400 hover:text-white text-2xl"><i class="fab fa-youtube"></i></a>
                  <a href="#" class="text-gray-400 hover:text-white text-2xl"><i class="fab fa-facebook"></i></a>
                </div>
              </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2026 Little Brass. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
