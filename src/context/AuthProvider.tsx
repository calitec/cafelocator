import * as React from 'react';
import { useCallback } from 'react';
import { createContext, useState, useContext } from 'react';
import firebase from "../firebase";

interface State {
  user: any;
  setUser: (data: object) => void;
  onLogin: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLogout: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const AuthStateContext = createContext<State | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  
  const onLogin = useCallback((e) => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // console.log(user,'user')
          } else {
            if (!user) {
              firebase
                .auth()
                .signInWithPopup(provider)
                .then((result: any) => {
                  // /** @type {firebase.auth.OAuthCredential} */
                  // var credential = result.credential;
                  // var token = credential.accessToken;
                  const userResult = result.user;
                  setUser( prev => ({ ...prev, user: userResult }));
                })
                .catch((error) => {
                  // var errorCode = error.code;
                  // var errorMessage = error.message;
                  // var email = error.email;
                  // var credential = error.credential;
                })
            }
          }
        })
      })
  }, [])

  const onLogout = useCallback((e) => {
    e.preventDefault();
    if (window.confirm('로그아웃 하시겠습니까?')) {
      firebase.auth().signOut().then(() => {
        setUser( prev => ({ 
            ...prev,
            user: null
          })
        );
      }).catch((error) => {
      });
    }
  }, [])

  return (
    <AuthStateContext.Provider value={{user, setUser, onLogin, onLogout}}>
      {children}
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error('Cannot find AuthStateContext');
  return state;
}