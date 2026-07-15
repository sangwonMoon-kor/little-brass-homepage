export type PublicPath = '/' | '/curriculum' | '/philosophy' | '/gallery' | '/location'

export interface PageMeta {
  path: PublicPath
  label: string
  title: string
  description: string
}

export type Bindings = {
  PUBLIC_SITE_URL?: string
}
