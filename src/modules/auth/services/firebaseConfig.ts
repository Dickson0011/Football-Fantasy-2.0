// ============================================================
// FOOTBALL FANTASY — Firebase Configuration
// Module 1: Foundation & Auth
// ============================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase project configuration
// Replace these values with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyCAbR5eFM1kgCNFr6ZU34ETGHV_f3Lj2Ts",
  authDomain: "football-fantasy-7b4b0.firebaseapp.com",
  projectId: "football-fantasy-7b4b0",
  storageBucket: "football-fantasy-7b4b0.firebasestorage.app",
  messagingSenderId: "1097715363541",
  appId: "1:1097715363541:web:a73a61b8ebe897f5763c5c",
  measurementId: "G-HC8QVHHF1S"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);

// Firestore instance
export const db = getFirestore(app);

export default app;

// ============================================================
// TEST CREDENTIALS (Development Only)
// Email:    tester@gmail.com
// Password: 123456
// ============================================================
