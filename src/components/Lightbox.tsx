import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

interface Props {
  open: boolean
  index?: number
  slides: { src: string; alt?: string; title?: string }[]
  onClose: () => void
}

/** Loaded lazily (see LazyLightbox) so the library stays out of the main bundle. */
export default function PhotoLightbox({ open, index = 0, slides, onClose }: Props) {
  return (
    <Lightbox
      open={open}
      index={index}
      close={onClose}
      slides={slides}
      controller={{ closeOnBackdropClick: true }}
    />
  )
}
