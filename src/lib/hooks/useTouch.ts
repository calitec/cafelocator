import { useEffect, useState, useRef, useCallback } from 'react'
import { useMapState } from '../../context/MapProvider'

export default function useTouch() {
  const { mapInfo, setMapInfo } = useMapState()
  const { vision } = mapInfo
  const [infoPosition, setInfoPosition] = useState({
    transY: 0,
    touchStart: false,
    touchMove: false,
  })
  const { transY, touchStart, touchMove } = infoPosition
  const ref = useRef<HTMLDivElement>(null)
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
    () => {
      setInfoPosition((prev) => ({
        ...prev,
        transY: 0,
        touchStart: true,
        touchMove: false,
      }))
    },
    [infoPosition]
  )

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!touchStart) return
      const clientY = e.changedTouches[0].clientY
      const device = clientY - (mobileScreenHeight - contentHeight - 13)
      const deviceX =
        clientY - (mobileScreenHeight - contentHeight - iphoneXSafeArea)
      setInfoPosition((prev) => ({
        ...prev,
        transY: mobileScreenHeight == 812 ? deviceX : device,
        touchStart: true,
        touchMove: true,
      }))
    },
    [infoPosition]
  )

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      e.preventDefault()
      if (touchStart && !touchMove) {
        setMapInfo((prev) => ({
          ...prev,
          vision: true,
        }))
        setInfoPosition((prev) => ({
          ...prev,
          transY: 0,
          touchStart: false,
          touchMove: false,
        }))
        return
      }
      if (transY >= 170 && transY < 350) {
        setMapInfo((prev) => ({
          ...prev,
          vision: false,
        }))
        setInfoPosition((prev) => ({
          ...prev,
          transY: 350,
          touchStart: false,
          touchMove: false,
        }))
      } else {
        setInfoPosition((prev) => ({
          ...prev,
          transY: 0,
          touchStart: false,
          touchMove: false,
        }))
      }
    },
    [infoPosition, mapInfo]
  )

  return { infoPosition, setInfoPosition, ref } as any
}
