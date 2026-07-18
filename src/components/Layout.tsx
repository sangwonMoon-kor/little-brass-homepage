import { jsxRenderer } from 'hono/jsx-renderer'
import { absoluteUrl, getPageMeta, SITE } from '../config/site'
import type { Bindings } from '../types/site'
import { Navigation } from './Navigation'
import { Seo } from './Seo'

type RendererProps = {
  children?: unknown
  title?: string
  description?: string
  canonicalUrl?: string
  ogImageUrl?: string
  pathname?: string
  [key: string]: unknown
}

export const layoutRenderer = jsxRenderer((props: RendererProps, c) => {
  const requestUrl = new URL(c.req.url)
  const pathname = props.pathname || requestUrl.pathname
  const isHome = pathname === '/'
  const pageMeta = getPageMeta(pathname)
  const configuredOrigin = (c.env as Bindings | undefined)?.PUBLIC_SITE_URL
  const siteOrigin = new URL(configuredOrigin || requestUrl.origin).origin
  const title = props.title || pageMeta?.title || '404 - 페이지를 찾을 수 없습니다 | Little Brass'
  const description = props.description || pageMeta?.description || SITE.description
  const canonicalUrl = props.canonicalUrl || absoluteUrl(siteOrigin, pathname)
  const ogImageUrl = props.ogImageUrl || absoluteUrl(siteOrigin, SITE.ogImagePath)

  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Seo
          title={title}
          description={description}
          canonicalUrl={canonicalUrl}
          ogImageUrl={ogImageUrl}
          isHome={pathname === '/'}
        />
        <link href="/static/tailwind.css" rel="stylesheet" />
        <link href="/static/style.css?v=20260718-photo-layout" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a class="skip-link" href="#main-content">본문 바로가기</a>
        {isHome && (
          <div class="site-info-bar">
            <div>
              <span>{SITE.address}</span>
              <a href={`tel:${SITE.phone}`}>상담 {SITE.phone}</a>
            </div>
          </div>
        )}
        <Navigation pathname={pathname} />
        <main id="main-content" tabindex={-1}>{props.children}</main>

        <footer class="site-footer">
          <div class="site-footer-inner">
            <div class="footer-identity">
              <p class="footer-wordmark">Little Brass</p>
              <p>금관악기 전문 음악학원</p>
            </div>
            <address class="footer-contact">
              <span>{SITE.address}</span>
              <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </address>
            <div class="footer-actions">
              {!isHome && (
                <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer">네이버 예약</a>
              )}
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">인스타그램</a>
              <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer">유튜브</a>
            </div>
          </div>
          <div class="site-footer-bottom">
            <p>&copy; {new Date().getFullYear()} Little Brass</p>
            <p>서울 강동구 상일동</p>
          </div>
          <details class="footer-photo-credit">
            <summary>악기 사진 출처</summary>
            <div>
              <span>Yamaha Corporation · WebP 변환 및 크기 조정</span>
              <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Trumpet_YTR-8335LA_crop.jpg" target="_blank" rel="noopener noreferrer">트럼펫</a>
              <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Horn_YHR-667V.png" target="_blank" rel="noopener noreferrer">호른</a>
              <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Tenor_trombone_YSL-891Z_(re-crop).jpg" target="_blank" rel="noopener noreferrer">트롬본</a>
              <a href="https://commons.wikimedia.org/wiki/File:Yamaha_Euphonium_YEP-621_transparent.png" target="_blank" rel="noopener noreferrer">유포늄</a>
              <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
            </div>
          </details>
        </footer>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
