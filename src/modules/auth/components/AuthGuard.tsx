// ============================================================
// FOOTBALL FANTASY — Auth Guard Component
// Module 1: Foundation & Auth
// Protects routes that require authentication
// ============================================================

import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthPage } from './AuthPage';

interface AuthGuardProps {
  children: ReactNode;
}

/**
 * Wraps protected content.
 * Shows AuthPage when not authenticated.
 * Shows a loading spinner during auth initialization.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  // Auth state still initializing
  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner spinner-lg" />
        <span className="label" style={{ color: 'var(--text-secondary)' }}>
          Loading...
        </span>
      </div>
    );
  }

  // Not authenticated — show login
  if (!user) {
    return <AuthPage />;
  }

  // Authenticated — render protected content
  return <>{children}</>;
}
