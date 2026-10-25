import { lazy, Suspense, type ComponentProps } from 'react'

const PhotoLightbox = lazy(() => import('./Lightbox'))

export function LazyLightbox(props: ComponentProps<typeof PhotoLightbox>) {
  if (!props.open) return null
  return (
    <Suspense fallback={null}>
      <PhotoLightbox {...props} />
    </Suspense>
  )
}
