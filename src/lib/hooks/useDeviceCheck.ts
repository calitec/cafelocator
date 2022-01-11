import { useState, useEffect } from 'react'

export default function useDeviceCheck() {
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenWidth(window.screen.availWidth)
    setScreenHeight(window.screen.availHeight)
  }, [])

  return { screenWidth, screenHeight }
}
