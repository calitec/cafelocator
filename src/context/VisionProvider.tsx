import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, useState, useContext } from 'react'
interface State {
  vision: boolean
  setVision: (v: boolean) => void
}

const VisionContext = createContext<State | null>(null)

export function VisionProvider({ children }: { children: React.ReactNode }) {
  const [vision, setVision] = useState(true)

  return (
    <VisionContext.Provider value={{ vision, setVision }}>
      {children}
    </VisionContext.Provider>
  )
}

export function useVisionContext() {
  const state = useContext(VisionContext)
  if (!state) throw new Error('Cannot find VisionContext')
  return state
}
