import * as React from 'react'
import { createContext, useState, useContext } from 'react'

interface State {
  vision: boolean
  setVision: (bool: boolean) => void
}

export const CoreStateContext = createContext<State | null>(null)

export function CoreProvider({ children }: { children: React.ReactNode }) {
  const [vision, setVision] = useState(true)

  return (
    <CoreStateContext.Provider value={{ vision, setVision }}>
      {children}
    </CoreStateContext.Provider>
  )
}

export function useCoreState() {
  const state = useContext(CoreStateContext)
  if (!state) throw new Error('Cannot find CoreStateContext')
  return state
}
