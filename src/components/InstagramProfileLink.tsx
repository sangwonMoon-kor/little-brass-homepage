import { SITE } from '../config/site'

type InstagramProfileLinkProps = {
  className?: string
}

export function InstagramProfileLink({ className = '' }: InstagramProfileLinkProps) {
  return (
    <a
      href={SITE.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="리틀브라스 인스타그램 @little_brass.official 새 창에서 열기"
      class={className}
    >
      <span>@little_brass.official</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}
