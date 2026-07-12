// ============================================================
// FOOTBALL FANTASY — Auth Service
// Module 1: Foundation & Auth
// Handles Firebase Authentication operations
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

// ============================================================
// AUTH OPERATIONS
// ============================================================

/**
 * Register a new user with email and password.
 * Creates a Firestore player profile on successful registration.
 */
export async function registerUser(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);

  // Create player profile in Firestore (fire-and-forget to avoid blocking UI)
  setDoc(doc(db, 'players', credential.user.uid), {
    uid: credential.user.uid,
    email: credential.user.email,
    displayName,
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    // Career Mode defaults
    currentDivision: 8,
    clubName: '',
    coins: 1000,
    cardsOwned: [],
    matchesPlayed: 0,
    matchesWon: 0,
  }).catch((err) => {
    console.warn('Firestore profile creation delayed/failed:', err);
  });

  return credential;
}

/**
 * Sign in an existing user with email and password.
 * Updates last login timestamp.
 */
export async function loginUser(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential = await signInWithEmailAndPassword(auth, email, password);

  // Update last login (fire-and-forget to avoid blocking UI)
  setDoc(
    doc(db, 'players', credential.user.uid),
    { lastLogin: serverTimestamp() },
    { merge: true }
  ).catch((err) => {
    console.warn('Firestore lastLogin update delayed/failed:', err);
  });

  return credential;
}

/**
 * Sign out the current user.
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Subscribe to auth state changes.
 * Returns an unsubscribe function.
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Fetch the player profile from Firestore.
 */
export async function getPlayerProfile(uid: string) {
  const docRef = doc(db, 'players', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}
