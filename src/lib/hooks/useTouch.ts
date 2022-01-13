import { useEffect, useState, useRef, useCallback } from 'react'
import { useMapState } from 'src/context/MapProvider'

export default function useTouch() {
  const { mapInfo, setMapInfo } = useMapState()
  const { vision } = mapInfo
  const [infoPosition, setInfoPosition] = useState({
    transY: 0,
    touchStart: false,
    touchMove: false,
  })
  const { transY, touchStart, touchMove } = infoPosition
  const ref = useRef(null)
  const draggingDOMHeight = 34
  const iphoneXSafeArea = 145
  const contentHeight = 350 + draggingDOMHeight
  const mobileScreenHeight = window.screen.availHeight

  useEffect(() => {
    if (vision) {
      setInfoPosition({
        transY: 0,
        touchStart: false,
        touchMove: false,
      })
    }
  }, [vision])

  useEffect(() => {
    if (!ref.current) return
    const touchevent = ref.current
    touchevent.addEventListener('touchstart', onTouchStart, { passive: true })
    touchevent.addEventListener('touchmove', onTouchMove, { passive: true })
    touchevent.addEventListener('touchend', onTouchEnd)
    return () => {
      touchevent.removeEventListener('touchstart', onTouchStart)
      touchevent.removeEventListener('touchmove', onTouchMove)
      touchevent.removeEventListener('touchend', onTouchEnd)
    }
  }, [infoPosition, ref])

  const onTouchStart = useCallback(
    (e) => {
      setInfoPosition({
        ...infoPosition,
        transY: 0,
        touchStart: true,
        touchMove: false,
      })
    },
    [infoPosition]
  )

  const onTouchMove = useCallback(
    (e) => {
      if (!touchStart) return
      const clientY = e.changedTouches[0].clientY
      const device = clientY - (mobileScreenHeight - contentHeight - 13)
      const deviceX =
        clientY - (mobileScreenHeight - contentHeight - iphoneXSafeArea)
      setInfoPosition({
        ...infoPosition,
        transY: mobileScreenHeight == 812 ? deviceX : device,
        touchStart: true,
        touchMove: true,
      })
    },
    [infoPosition]
  )

  const onTouchEnd = useCallback(
    (e) => {
      e.preventDefault()
      if (touchStart && !touchMove) {
        console.log('0')
        setMapInfo({
          ...mapInfo,
          vision: true,
        })
        setInfoPosition({
          ...infoPosition,
          transY: 0,
          touchStart: false,
          touchMove: false,
        })
        return
      }
      if (transY >= 170 && transY < 350) {
        console.log('1')
        setMapInfo({
          ...mapInfo,
          vision: false,
        })
        setInfoPosition({
          ...infoPosition,
          transY: 350,
          touchStart: false,
          touchMove: false,
        })
      }
    },
    [infoPosition, mapInfo]
  )

  return { infoPosition, setInfoPosition, ref } as any
}
