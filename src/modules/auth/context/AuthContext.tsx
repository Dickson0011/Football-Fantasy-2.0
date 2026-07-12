// ============================================================
// FOOTBALL FANTASY — Auth Context Provider
// Module 1: Foundation & Auth
// Provides auth state to the entire application
// ============================================================

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, onAuthChange, getPlayerProfile } from '../services/authService';
import type { AuthContextValue, PlayerProfile } from '../types';
import type { User } from 'firebase/auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        getPlayerProfile(firebaseUser.uid)
          .then((profile) => {
            setPlayerProfile(profile as PlayerProfile | null);
          })
          .catch((err) => {
            console.error('Failed to load player profile:', err);
            setPlayerProfile(null);
          });
      } else {
        setPlayerProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      await loginUser(email, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(formatAuthError(message));
      setLoading(false);
      throw err;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    setError(null);
    setLoading(true);
    try {
      await registerUser(email, password, displayName);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(formatAuthError(message));
      setLoading(false);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    try {
      await logoutUser();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(formatAuthError(message));
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  const value: AuthContextValue = {
    user,
    playerProfile,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume auth context.
 * Must be used within an AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// ============================================================
// HELPERS
// ============================================================

/** Convert Firebase error codes into user-friendly messages */
function formatAuthError(message: string): string {
  if (message.includes('auth/email-already-in-use')) {
    return 'This email is already registered.';
  }
  if (message.includes('auth/invalid-email')) {
    return 'Please enter a valid email address.';
  }
  if (message.includes('auth/weak-password')) {
    return 'Password must be at least 6 characters.';
  }
  if (message.includes('auth/user-not-found') || message.includes('auth/wrong-password')) {
    return 'Invalid email or password.';
  }
  if (message.includes('auth/invalid-credential')) {
    return 'Invalid email or password.';
  }
  if (message.includes('auth/too-many-requests')) {
    return 'Too many attempts. Please try again later.';
  }
  return message;
}
