export interface BlogPost {
  title: string
  link: string
  description: string
  date: string
  thumbnail: string | null
}

export type BlogFeedSource = 'live' | 'cache' | 'fallback'

export interface BlogFeedResult {
  posts: BlogPost[]
  source: BlogFeedSource
  message?: string
}
