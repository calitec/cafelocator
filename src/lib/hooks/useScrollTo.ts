import { useEffect } from 'react'

export default function useScrollTo(dom, state) {
  useEffect(() => {
    const height = dom.current.scrollHeight
    dom.current.scrollTo(0, height)
  }, [state])
}
