import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

export const FBApp = initializeApp({
  apiKey: process.env.WINE_COLLECTION_FIREBASE_API_KEY,
  authDomain: "wine-collection-9f054.firebaseapp.com",
  projectId: "wine-collection-9f054",
  storageBucket: "wine-collection-9f054.firebasestorage.app",
  messagingSenderId: "1082994031732",
  appId: "1:1082994031732:web:23e996315096a4ec532521",
  measurementId: "G-H1REPS47EF"
}, 'wine-collection');

export const FBAuth = getAuth(FBApp);
export const FBStore = getFirestore(FBApp);