import { SITE } from '../config/site'

type SeoProps = {
  title: string
  description: string
  canonicalUrl: string
  ogImageUrl: string
  isHome: boolean
}

export function Seo({
  title,
  description,
  canonicalUrl,
  ogImageUrl,
  isHome,
}: SeoProps) {
  const structuredData = isHome
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MusicSchool',
        name: SITE.name,
        address: SITE.address,
        telephone: SITE.phone,
        url: canonicalUrl,
        image: ogImageUrl,
      })
    : null

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="Little Brass, 리틀브라스, 음악학원, 금관악기, 트럼펫, 혼, 트롬본, 유포늄, 음악 레슨, 강동구 음악학원"
      />
      <meta name="author" content={SITE.name} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content="ko_KR" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImageUrl} />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      )}
    </>
  )
}
