import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, useState, useContext } from 'react'
import {
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup,
  onAuthStateChanged,
} from 'firebase/auth'
import { provider } from '../firebase'

interface State {
  user: any
  setUser: (data: object) => void
  onLogin: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const AuthStateContext = createContext<State | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null)
  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return
      setUser({ ...user, user: user })
    })
    const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`
    const user = JSON.parse(sessionStorage.getItem(sessionKey))
    setUser({ ...user, user })
  }, [])

  const onLogin = useCallback((e) => {
    e.preventDefault()
    try {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithPopup(auth, provider)
        })
        .catch((error) => {
          // Handle Errors here.
          // const errorCode = error.code
          const errorMessage = error.message
          console.error(errorMessage)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const onLogout = useCallback((e) => {
    try {
      e.preventDefault()
      if (window.confirm('로그아웃 하시겠습니까?')) {
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
            const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`
            sessionStorage.removeItem(sessionKey)
            setUser(null)
          })
          .catch((error) => {
            // An error happened.
          })
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <AuthStateContext.Provider value={{ user, setUser, onLogin, onLogout }}>
      {children}
    </AuthStateContext.Provider>
  )
}

export function useAuthState() {
  const state = useContext(AuthStateContext)
  if (!state) throw new Error('Cannot find AuthStateContext')
  return state
}
