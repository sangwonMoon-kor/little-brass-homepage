import { PUBLIC_ROUTES, SITE } from '../config/site'

type NavigationProps = {
  pathname: string
}

export function Navigation({ pathname: _pathname }: NavigationProps) {
  return (
    <>
      <div class="absolute top-0 left-0 right-0 z-50 hidden lg:block" id="top-info-bar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-10 text-white/80 text-xs border-b border-white/10">
            <div class="flex items-center gap-1.5">
              <i class="fas fa-map-marker-alt text-[10px]"></i>
              <span>서울시 강동구 상일동</span>
            </div>
            <a href={`mailto:${SITE.email}`} class="flex items-center gap-1.5 hover:text-white transition">
              <i class="fas fa-envelope text-[10px]"></i>
              <span>{SITE.email}</span>
            </a>
            <div class="flex items-center gap-3">
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="인스타그램" class="text-white/60 hover:text-white transition">
                <i class="fab fa-instagram text-sm"></i>
              </a>
              <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="유튜브" class="text-white/60 hover:text-white transition">
                <i class="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <nav class="absolute top-0 lg:top-10 left-0 right-0 z-50 transition-all duration-300 nav-scrolled" id="main-nav">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16 lg:h-20">
            <a href="/" class="nav-logo">
              <span class="text-xl lg:text-2xl font-bold text-white tracking-[0.15em]" style="font-family: 'Playfair Display', serif;">LITTLE BRASS</span>
            </a>

            <div class="hidden lg:flex items-center">
              {PUBLIC_ROUTES.map((route, index) => (
                <a
                  href={route.path}
                  class={`nav-link text-white/90 hover:text-white px-5 py-2 transition text-sm tracking-wide${index < PUBLIC_ROUTES.length - 1 ? ' border-r border-white/20' : ''}`}
                >
                  {route.label}
                </a>
              ))}
            </div>

            <button id="mobile-menu-button" class="lg:hidden text-white hover:text-white/80 transition" aria-label="메뉴 열기" aria-expanded="false" aria-controls="mobile-menu">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="hidden lg:hidden bg-white/95 backdrop-blur-sm">
          <div class="px-4 py-3 space-y-1">
            {PUBLIC_ROUTES.map((route) => (
              <a href={route.path} class="block px-4 py-3 text-[#555555] hover:bg-gray-50 rounded-xl transition">
                {route.label}
              </a>
            ))}
            <div class="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-4">
              <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center rounded-full bg-[#C9A227] text-white h-12 px-6 hover:bg-[#B8941C] transition-colors text-base font-medium">
                <i class="fas fa-ticket-alt mr-2"></i>원데이 클래스
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
