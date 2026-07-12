// ============================================================
// FOOTBALL FANTASY — Auth Types
// Module 1: Foundation & Auth
// ============================================================

import type { User } from 'firebase/auth';

/** Auth context state shape */
export interface AuthState {
  user: User | null;
  playerProfile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
}

/** Player profile stored in Firestore */
export interface PlayerProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: unknown; // Firestore Timestamp
  lastLogin: unknown;
  currentDivision: number;
  clubName: string;
  coins: number;
  cardsOwned: string[];
  matchesPlayed: number;
  matchesWon: number;
}

/** Auth context value exposed to consumers */
export interface AuthContextValue {
  user: User | null;
  playerProfile: PlayerProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}
