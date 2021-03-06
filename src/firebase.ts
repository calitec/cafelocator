import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAItEIk5cwXmrAI7XKPnJ0ounAbr34TCC8',
  authDomain: 'cali-cafe-locator.firebaseapp.com',
  databaseURL:
    'https://cali-cafe-locator-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'cali-cafe-locator',
  storageBucket: 'cali-cafe-locator.appspot.com',
  messagingSenderId: '364356729914',
  appId: '1:364356729914:web:9571a0c00b961d19104903',
  measurementId: 'G-WGKCVENCS7',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const provider = new GoogleAuthProvider()
export const database = getDatabase(firebaseApp)
