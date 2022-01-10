import * as React from 'react'
import {
  useEffect,
  useCallback,
  createContext,
  useState,
  useContext,
} from 'react'
import { useCoreState } from './CoreProvider'

interface State {
  infoPosition: {
    transY: number
  }
  setInfoPosition: (transY: object) => void
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void
}

export const InfoStateContext = createContext<State | null>(null)

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const { vision, setVision } = useCoreState()
  const [infoPosition, setInfoPosition] = useState({
    transY: 0,
    touchStart: false,
    touchMove: false,
    touchEnd: false,
  })
  const { transY, touchStart, touchMove, touchEnd } = infoPosition

  useEffect(() => {
    if (vision) {
      setInfoPosition({
        ...infoPosition,
        transY: 0,
        touchStart: false,
        touchMove: false,
        touchEnd: false,
    })
    }
  }, [vision])

  useEffect(()=>{
    if(touchEnd) {
      return () => {
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
    }
  },[touchEnd])

  const onTouchStart = useCallback(
    (e) => {
      setInfoPosition({
        ...infoPosition,
        transY: 0,
        touchStart: true,
        touchEnd: false,
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
      if (transY > 170 && transY < 350) {
        setVision(false)
        setInfoPosition({
          ...infoPosition,
          transY: 350,
          touchStart: false,
          touchMove: false,
          touchEnd: true,
        })
      } else {
        setVision(true)
        setInfoPosition({
          ...infoPosition,
          transY: 0,
          touchStart: false,
          touchMove: false,
          touchEnd: true,
        })
      }
      e.preventDefault()
    },
    [vision, infoPosition]
  )

  return (
    <InfoStateContext.Provider
      value={{
        infoPosition,
        setInfoPosition,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
      }}
    >
      {children}
    </InfoStateContext.Provider>
  )
}

export function useInfoState() {
  const state = useContext(InfoStateContext)
  if (!state) throw new Error('Cannot find InfoStateContext')
  return state
}
