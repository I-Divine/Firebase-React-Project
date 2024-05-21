// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_DrPoEWp1uYbymZmWiJQrHTWaMWnukEk",
  authDomain: "fir-learn-121bb.firebaseapp.com",
  projectId: "fir-learn-121bb",
  storageBucket: "fir-learn-121bb.appspot.com",
  messagingSenderId: "750082872458",
  appId: "1:750082872458:web:a0739082d11f8823ce4973",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
