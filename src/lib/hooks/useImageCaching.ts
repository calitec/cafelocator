import { useLayoutEffect } from 'react'

export default function useImageCaching() {
  useLayoutEffect(() => {
    ;['/images/star.png', '/images/star_bg.png', '/images/locator.png'].forEach(
      (v) => (new Image().src = v)
    )
  }, [])
}
