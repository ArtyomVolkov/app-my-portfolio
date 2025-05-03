import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const FBApp = initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "my-portfolio-32f33.firebaseapp.com",
  projectId: "my-portfolio-32f33",
  storageBucket: "my-portfolio-32f33.firebasestorage.app",
  messagingSenderId: "18036699873",
  appId: "1:18036699873:web:284c112b5c9d4e929b7da0",
  measurementId: "G-CQRSRH0NSB"
});

export const FBAuth = getAuth(FBApp);
export const FBStore = getFirestore(FBApp);
export const DBName = 'wine-collection';