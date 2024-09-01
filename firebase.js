// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-meal-suggestions.firebaseapp.com",
  projectId: "ai-meal-suggestions",
  storageBucket: "ai-meal-suggestions.appspot.com",
  messagingSenderId: "320034150157",
  appId: "1:320034150157:web:dc1e1172a32bd54d6fc244",
  measurementId: "G-6H523KCN84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};