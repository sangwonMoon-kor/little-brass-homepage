import type { BlogFeedResult, BlogPost } from '../types/blog'

const DEFAULT_FEED_URL = 'https://rss.blog.naver.com/little_brass.xml'
const DEFAULT_TIMEOUT_MS = 3_000
const DEFAULT_CACHE_TTL_MS = 15 * 60 * 1_000

export const DEFAULT_BLOG_FALLBACK: readonly BlogPost[] = [
  {
    title: '리틀브라스 최신 소식',
    link: 'https://blog.naver.com/little_brass',
    description: '네이버 블로그에서 리틀브라스의 최신 소식을 확인하세요.',
    date: '',
    thumbnail: null,
  },
]

type CacheEntry = {
  expiresAt: number
  posts: BlogPost[]
}

type FetchBlogPostsOptions = {
  feedUrl?: string
  fetchImpl?: typeof fetch
  fallbackPosts?: readonly BlogPost[]
  timeoutMs?: number
  cacheTtlMs?: number
}

const cache = new Map<string, CacheEntry>()

function unwrapCdata(value: string): string {
  const trimmed = value.trim()
  const match = trimmed.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)
  return (match?.[1] ?? trimmed).trim()
}

function extractTag(xml: string, tag: string): string | null {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return match ? unwrapCdata(match[1]) : null
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
}

function toPlainText(value: string): string {
  return decodeEntities(value.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength).trim()}…` : value
}

function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replaceAll('-', '.')
}

function extractThumbnail(description: string): string | null {
  const match = description.match(/<img\s+[^>]*src=["']([^"']+)["']/i)
  if (!match) return null

  try {
    const url = new URL(decodeEntities(match[1]))
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export function isAllowedBlogUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      (url.hostname === 'blog.naver.com' || url.hostname === 'm.blog.naver.com')
    )
  } catch {
    return false
  }
}

export function parseBlogFeed(xml: string, limit = 3): BlogPost[] {
  if (!/<rss(?:\s|>)/i.test(xml) || !/<item(?:\s|>)/i.test(xml) || limit <= 0) {
    return []
  }

  const posts: BlogPost[] = []
  const itemPattern = /<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi
  let itemMatch: RegExpExecArray | null

  while ((itemMatch = itemPattern.exec(xml)) !== null && posts.length < limit) {
    const title = extractTag(itemMatch[1], 'title')
    const link = extractTag(itemMatch[1], 'link')
    if (!title || !link || !isAllowedBlogUrl(link)) continue

    const rawDescription = extractTag(itemMatch[1], 'description') ?? ''
    const pubDate = extractTag(itemMatch[1], 'pubDate') ?? ''

    posts.push({
      title: toPlainText(title),
      link,
      description: truncate(toPlainText(rawDescription), 100),
      date: formatDate(pubDate),
      thumbnail: extractThumbnail(rawDescription),
    })
  }

  return posts
}

export async function fetchBlogPosts(
  options: FetchBlogPostsOptions = {},
): Promise<BlogFeedResult> {
  const feedUrl = options.feedUrl ?? DEFAULT_FEED_URL
  const now = Date.now()
  const cached = cache.get(feedUrl)
  if (cached && cached.expiresAt > now) {
    return { posts: cached.posts, source: 'cache' }
  }

  const fallbackPosts = [...(options.fallbackPosts ?? DEFAULT_BLOG_FALLBACK)]

  try {
    const response = await (options.fetchImpl ?? fetch)(feedUrl, {
      headers: { Accept: 'application/rss+xml, application/xml, text/xml' },
      signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    })
    if (!response.ok) {
      throw new Error(`RSS request failed with ${response.status}`)
    }

    const posts = parseBlogFeed(await response.text(), 3)
    if (posts.length === 0) {
      throw new Error('RSS feed contains no valid posts')
    }

    cache.set(feedUrl, {
      expiresAt: now + (options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS),
      posts,
    })

    return { posts, source: 'live' }
  } catch {
    return {
      posts: fallbackPosts,
      source: 'fallback',
      message: '네이버 블로그 피드를 일시적으로 불러올 수 없습니다.',
    }
  }
}
