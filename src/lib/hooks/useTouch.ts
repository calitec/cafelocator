import { useEffect, useState, useCallback, useRef } from "react";
import { useCoreState } from '../../context/CoreProvider'

export default function useTouch() {
  const { vision, setVision } = useCoreState()
  const [infoPosition, setInfoPosition] = useState({
    transY: 0,
    touchStart: false,
    touchMove: false,
  })
  const { transY, touchStart, touchMove } = infoPosition
  const ref = useRef(null);

  useEffect(() => {
    if (vision) {
      setInfoPosition({
        transY: 0,
        touchStart: false,
        touchMove: false,
    })
    }
  }, [vision])

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
        const draggingDOMHeight = 34
        const iphoneXSafeArea = 145
        const contentHeight = 350 + draggingDOMHeight
        const mobileScreenHeight = window.screen.availHeight
        const clientY = e.changedTouches[0].clientY
        const device = clientY - (mobileScreenHeight - contentHeight - 13)
        const deviceX =
          clientY - (mobileScreenHeight - contentHeight - iphoneXSafeArea)
      requestAnimationFrame(() => {
        setInfoPosition({
          ...infoPosition,
          transY: mobileScreenHeight == 812 ? deviceX : device,
          touchStart: true,
          touchMove: true,
        })
      })
    },
    [infoPosition]
  )
  const onTouchEnd = useCallback(
    (e) => {
      e.stopPropagation()
      if (touchStart && !touchMove) {
      }
      if (transY > 170 && transY < 330) {
        setVision(false)
        setInfoPosition({
          ...infoPosition,
          transY: 330,
          touchStart: false,
          touchMove: false,
        })
      } else {
        setVision(true)
        setInfoPosition({
          ...infoPosition,
          transY: 0,
          touchStart: false,
          touchMove: false,
        })
      }
      e.preventDefault()
    },
    [vision, infoPosition]
  )

  useEffect(()=>{
    if(!ref.current) return;
      const touchevent = ref.current;
      touchevent.addEventListener("touchstart", onTouchStart);
      touchevent.addEventListener("touchmove", onTouchMove);
      touchevent.addEventListener("touchend", onTouchEnd);
      return () => {
        touchevent.removeEventListener("touchstart", onTouchStart);
        touchevent.removeEventListener("touchmove", onTouchMove);
        touchevent.removeEventListener("touchend", onTouchEnd);
      }
  })

  return {infoPosition, setInfoPosition, ref} as any;
};