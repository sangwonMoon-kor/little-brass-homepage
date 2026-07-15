export function NotFoundPage() {
  return (
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
    </div>
  )
}
