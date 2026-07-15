import { Hono } from 'hono'
import { layoutRenderer } from './components/Layout'
import { absoluteUrl, PUBLIC_ROUTES, resolveSiteOrigin } from './config/site'
import { CurriculumPage } from './pages/CurriculumPage'
import { GalleryPage } from './pages/GalleryPage'
import { HomePage } from './pages/HomePage'
import { LocationPage } from './pages/LocationPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { fetchBlogPosts } from './services/blog'
import type { Bindings } from './types/site'

export type AppDependencies = {
  getBlogPosts?: typeof fetchBlogPosts
}

export function createApp(dependencies: AppDependencies = {}) {
  const app = new Hono<{ Bindings: Bindings }>()
  const getBlogPosts = dependencies.getBlogPosts ?? fetchBlogPosts

  app.use(layoutRenderer)

  app.get('/sitemap.xml', (c) => {
    const origin = resolveSiteOrigin(c.req.url, c.env?.PUBLIC_SITE_URL)
    const urls = PUBLIC_ROUTES.map(
      ({ path }) => `  <url><loc>${absoluteUrl(origin, path)}</loc></url>`,
    ).join('\n')
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`

    return c.body(xml, 200, { 'Content-Type': 'application/xml; charset=UTF-8' })
  })

  app.get('/robots.txt', (c) => {
    const origin = resolveSiteOrigin(c.req.url, c.env?.PUBLIC_SITE_URL)
    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(origin, '/sitemap.xml')}\n`

    return c.text(robots)
  })

  app.get('/', async (c) => {
    const result = await getBlogPosts()
    return c.render(<HomePage posts={result.posts} />)
  })

  app.get('/curriculum', (c) => c.render(<CurriculumPage />))
  app.get('/philosophy', (c) => c.render(<PhilosophyPage />))
  app.get('/gallery', (c) => c.render(<GalleryPage />))
  app.get('/location', (c) => c.render(<LocationPage />))

  app.get('/api/blog/rss', async (c) => {
    const result = await getBlogPosts()

    if (result.source === 'fallback') {
      return c.json(
        {
          success: false,
          posts: result.posts,
          message: result.message,
        },
        503,
      )
    }

    return c.json({ success: true, posts: result.posts })
  })

  app.notFound((c) => {
    c.status(404)
    return c.render(<NotFoundPage />)
  })

  return app
}
