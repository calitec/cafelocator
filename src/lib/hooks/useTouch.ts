import { useEffect, useState, useRef } from "react";
import { useCoreState } from '../../context/CoreProvider'

export default function useTouch() {
  const { vision, setVision } = useCoreState()
  const [infoPosition, setInfoPosition] = useState({
    transY: 0,
    touchStart: false,
    touchMove: false,
  })
  const { transY, touchStart } = infoPosition
  const ref = useRef(null);
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

  useEffect(()=>{
    const onTouchStart = (e) => {
      setInfoPosition({
        ...infoPosition,
        transY: 0,
        touchStart: true,
        touchMove: false,
      })
    }
    const onTouchMove = (e) => {
      if (!touchStart) return
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
    }
    const onTouchEnd = (e) => {
      e.stopPropagation()
      // if (touchStart && !touchMove) {
      // }
      if (transY >= 170 && transY < 350) {
        setVision(false)
        setInfoPosition({
          ...infoPosition,
          transY: 350,
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
    }

    if(!ref.current) return;
      const touchevent = ref.current;
      touchevent.addEventListener("touchstart", onTouchStart, {passive: true});
      touchevent.addEventListener("touchmove", onTouchMove, {passive: true});
      touchevent.addEventListener("touchend", onTouchEnd);
      return () => {
        touchevent.removeEventListener("touchstart", onTouchStart);
        touchevent.removeEventListener("touchmove", onTouchMove);
        touchevent.removeEventListener("touchend", onTouchEnd);
      }
  },[infoPosition, ref])

  return {infoPosition, setInfoPosition, ref} as any;
};