import { readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'
import { fetchBlogPosts, parseBlogFeed } from '../src/services/blog'

const FIXTURE_XML = readFileSync(
  new URL('./fixtures/naver-rss.xml', import.meta.url),
  'utf8',
)

describe('parseBlogFeed', () => {
  it('returns at most three safe Naver posts', () => {
    const posts = parseBlogFeed(FIXTURE_XML, 3)

    expect(posts).toHaveLength(3)
    expect(posts.every((post) => new URL(post.link).hostname.endsWith('naver.com'))).toBe(true)
    expect(posts[0]).toMatchObject({
      title: '첫 번째 소식',
      description: '첫 번째 레슨 소식입니다.',
      date: '2026.07.13',
    })
  })

  it('drops javascript and non-Naver links', () => {
    const xml = `
      <rss><channel>
        <item><title>script</title><link><![CDATA[javascript:alert(1)]]></link></item>
        <item><title>external</title><link>https://example.com/post</link></item>
      </channel></rss>
    `

    expect(parseBlogFeed(xml, 3)).toEqual([])
  })

  it('returns an empty list for malformed XML', () => {
    expect(parseBlogFeed('<not-rss>', 3)).toEqual([])
  })
})

describe('fetchBlogPosts', () => {
  it('falls back without throwing when the network fails', async () => {
    const result = await fetchBlogPosts({
      feedUrl: 'https://rss.blog.naver.com/network-failure.xml',
      fetchImpl: vi.fn().mockRejectedValue(new Error('offline')),
      fallbackPosts: [
        {
          title: '공지',
          link: 'https://blog.naver.com/little_brass',
          description: '블로그에서 최신 소식을 확인하세요.',
          date: '',
          thumbnail: null,
        },
      ],
    })

    expect(result.source).toBe('fallback')
    expect(result.posts[0]?.title).toBe('공지')
  })

  it('falls back when the request is aborted by the timeout signal', async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new DOMException('Timed out', 'AbortError'))
    const result = await fetchBlogPosts({
      feedUrl: 'https://rss.blog.naver.com/timeout.xml',
      fetchImpl,
      timeoutMs: 1,
      fallbackPosts: [],
    })

    expect(result).toMatchObject({ source: 'fallback', posts: [] })
  })

  it('caches a successful response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(FIXTURE_XML, { status: 200 }))
    const options = {
      feedUrl: 'https://rss.blog.naver.com/cache-test.xml',
      fetchImpl,
      fallbackPosts: [],
    }

    expect((await fetchBlogPosts(options)).source).toBe('live')
    expect((await fetchBlogPosts(options)).source).toBe('cache')
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })
})
