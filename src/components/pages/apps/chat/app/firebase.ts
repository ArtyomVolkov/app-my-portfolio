import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const FBApp = initializeApp({
  apiKey: process.env.CHAT_APP_FIREBASE_API_KEY,
  authDomain: "chat-app-95005.firebaseapp.com",
  projectId: "chat-app-95005",
  storageBucket: "chat-app-95005.firebasestorage.app",
  messagingSenderId: "415473356291",
  appId: "1:415473356291:web:905850c8e35825eb6f8836",
  measurementId: "G-C3674CCL5P"
}, 'chat-app');

export const FBAuth = getAuth(FBApp);
export const FBStore = getFirestore(FBApp);