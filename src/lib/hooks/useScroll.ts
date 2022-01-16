import { useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash'

export default function useScroll() {
  const [scrollTop, setScrollTop] = useState(0)
  const ref = useRef(null)

  const onScroll = (e) => {
    requestAnimationFrame(() => {
      if (e.target.scrollTop >= 0) {
        setScrollTop(e.target.scrollTop)
      }
    })
  }

  useEffect(() => {
    if (ref) {
      const scrollContainer = ref.current
      setScrollTop(scrollContainer.scrollTop)
      const throttling = throttle(onScroll, 50)
      scrollContainer.addEventListener('scroll', throttling, { passive: true })
      return () => {
        scrollContainer.removeEventListener('scroll', throttling)
      }
    }
  }, [ref])

  return [scrollTop, ref] as any
}
