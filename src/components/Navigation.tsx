import { PUBLIC_ROUTES, SITE } from '../config/site'

type NavigationProps = {
  pathname: string
}

export function Navigation({ pathname }: NavigationProps) {
  return (
    <nav class={`site-nav nav-scrolled${pathname === '/' ? ' site-nav-home' : ''}`} id="main-nav">
      <div class="site-nav-inner">
        <a href="/" class="nav-logo" aria-label="리틀브라스 홈">
          <span>Little Brass</span>
          <small>금관악기 전문 음악학원</small>
        </a>

        <div class="desktop-nav" aria-label="주요 메뉴">
          {PUBLIC_ROUTES.map((route) => (
            <a
              href={route.path}
              aria-current={pathname === route.path ? 'page' : undefined}
              class="nav-link"
            >
              {route.label}
            </a>
          ))}
          {pathname !== '/' && (
            <a
              href={SITE.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="nav-booking-link nav-booking-link-subtle"
            >
              원데이 클래스
            </a>
          )}
        </div>

        <button
          id="mobile-menu-button"
          class="mobile-menu-button"
          aria-label="메뉴 열기"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span class="mobile-menu-line"></span>
          <span class="mobile-menu-line"></span>
        </button>
      </div>

      <div id="mobile-menu" class="mobile-menu hidden">
        <div class="mobile-menu-inner">
          {PUBLIC_ROUTES.map((route) => (
            <a
              href={route.path}
              aria-current={pathname === route.path ? 'page' : undefined}
              class="mobile-nav-link"
            >
              {route.label}
            </a>
          ))}
          {pathname !== '/' && (
            <a
              href={SITE.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-booking-link"
            >
              원데이 클래스 예약
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
