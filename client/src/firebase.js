// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate1-fc365.firebaseapp.com",
  projectId: "mern-estate1-fc365",
  storageBucket: "mern-estate1-fc365.firebasestorage.app",
  messagingSenderId: "891955487150",
  appId: "1:891955487150:web:a2a265b0422c43ffc4e83f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);