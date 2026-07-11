// ============================================================
// FOOTBALL FANTASY — Auth Module Public API
// Module 1: Foundation & Auth
// ============================================================

// Context & hooks
export { AuthProvider, useAuth } from './context/AuthContext';

// Components
export { AuthPage } from './components/AuthPage';
export { AuthGuard } from './components/AuthGuard';

// Types
export type { AuthState, AuthContextValue, PlayerProfile } from './types';
