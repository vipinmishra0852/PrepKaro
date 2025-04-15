// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyC6SOIUBXsB48vDbhy050DR3yVJnWstE_8",
  authDomain: "prepkaro-9c8d8.firebaseapp.com",
  projectId: "prepkaro-9c8d8",
  storageBucket: "prepkaro-9c8d8.firebasestorage.app",
  messagingSenderId: "334650845560",
  appId: "1:334650845560:web:053e9d584e8d681bec808d",
  measurementId: "G-875MK55LWZ",
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
