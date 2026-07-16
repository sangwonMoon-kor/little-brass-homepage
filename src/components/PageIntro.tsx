import type { Child } from 'hono/jsx'

type PageIntroVariant = 'curriculum' | 'philosophy' | 'gallery' | 'location'

type PageIntroProps = {
  index: string
  title: string
  description: string
  variant: PageIntroVariant
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  actions?: Child
}

export function PageIntro(props: PageIntroProps) {
  return (
    <header class={`page-intro page-intro-${props.variant}${props.image ? ' page-intro-with-image' : ''}`}>
      <div class="page-intro-inner">
        <div class="page-intro-copy">
          <p class="page-index" aria-hidden="true">{props.index}</p>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          {props.actions ? <div class="page-intro-actions">{props.actions}</div> : null}
        </div>
        {props.image ? (
          <figure class="page-intro-media">
            <img
              src={props.image}
              alt={props.imageAlt || ''}
              width={props.imageWidth}
              height={props.imageHeight}
              decoding="async"
              fetchpriority="high"
            />
          </figure>
        ) : null}
      </div>
    </header>
  )
}
