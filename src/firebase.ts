import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
// import firebaseConfig from './firebase_config';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAItEIk5cwXmrAI7XKPnJ0ounAbr34TCC8",
    authDomain: "cali-cafe-locator.firebaseapp.com",
    databaseURL: "https://cali-cafe-locator-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cali-cafe-locator",
    storageBucket: "cali-cafe-locator.appspot.com",
    messagingSenderId: "364356729914",
    appId: "1:364356729914:web:9571a0c00b961d19104903",
    measurementId: "G-WGKCVENCS7"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;