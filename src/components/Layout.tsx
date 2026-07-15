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
        <link href="/static/style.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Noto+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <a class="skip-link" href="#main-content">본문 바로가기</a>
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
              <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer">네이버 예약</a>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer">인스타그램</a>
              <a href={SITE.youtubeUrl} target="_blank" rel="noopener noreferrer">유튜브</a>
            </div>
          </div>
          <div class="site-footer-bottom">
            <p>&copy; {new Date().getFullYear()} Little Brass</p>
            <p>서울 강동구 상일동</p>
          </div>
        </footer>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
