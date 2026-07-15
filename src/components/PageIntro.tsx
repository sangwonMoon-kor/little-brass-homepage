type PageIntroProps = {
  index: string
  title: string
  description: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
}

export function PageIntro(props: PageIntroProps) {
  return (
    <header class={`page-intro${props.image ? ' page-intro-with-image' : ''}`}>
      <div class="page-intro-inner">
        <div class="page-intro-copy">
          <p class="page-index" aria-hidden="true">{props.index}</p>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
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
