import * as React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { createContext, useState, useContext } from 'react'
import {
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence,
  signInWithRedirect,
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
  }, [])

  const onLogin = useCallback((e) => {
    e.preventDefault()
    try {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // const provider = new GoogleAuthProvider()
          // In memory persistence will be applied to the signed in Google user
          // even though the persistence was set to 'none' and a page redirect
          // occurred.
          return signInWithRedirect(auth, provider)
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
        })

      // signInWithPopup(auth, provider)
      //   .then((result) => {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      //     const credential = GoogleAuthProvider.credentialFromResult(result)
      //     const token = credential.accessToken
      //     // The signed-in user info.
      //     const user = result.user
      //     setUser({ ...user, user: user })
      //     // ...
      //   })
      //   .catch((error) => {
      //     // Handle Errors here.
      //     const errorCode = error.code
      //     const errorMessage = error.message
      //     // The email of the user's account used.
      //     const email = error.email
      //     // The AuthCredential type that was used.
      //     const credential = GoogleAuthProvider.credentialFromError(error)
      //     // ...
      //   })
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
