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
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/tailwind.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Dancing+Script:wght@400;600;700&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body class="bg-[#FFFFFF] text-[#555555]">
        <a class="skip-link" href="#main-content">본문 바로가기</a>
        <Navigation pathname={pathname} />
        <main id="main-content" tabindex={-1}>{props.children}</main>

        <footer style="background: #1a1a1a; color: #ffffff; padding: 0; margin-top: 0;">
          <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">Little Brass</h3>
                <p style="color: #999; font-size: 0.95rem; line-height: 1.8;">금관악기 전문 음악학원</p>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #B8941C; margin-bottom: 1rem;">Contact</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem; color: #999; font-size: 0.9rem;">
                  <p style="margin: 0;">{SITE.address}</p>
                  <a href={`tel:${SITE.phone}`} style="color: #999;">{SITE.phone}</a>
                  <a href={`mailto:${SITE.email}`} style="color: #999;">{SITE.email}</a>
                </div>
              </div>
              <div>
                <h4 style="font-size: 0.85rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #B8941C; margin-bottom: 1rem;">Follow Us</h4>
                <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem;">
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" style="color: #999; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fab fa-instagram"></i> @little_brass.official
                  </a>
                  <a href={SITE.reservationUrl} target="_blank" rel="noopener noreferrer" style="color: #999; display: flex; align-items: center; gap: 0.5rem;">
                    <i class="fas fa-calendar-check"></i> 네이버 예약
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style="border-top: 1px solid #333; padding: 1.5rem 0; text-align: center;">
            <p style="font-size: 0.75rem; color: #666; margin: 0;">&copy; {new Date().getFullYear()} Little Brass. All rights reserved.</p>
          </div>
        </footer>
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
