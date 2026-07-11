// ============================================================
// FOOTBALL FANTASY — Auth Page Component
// Module 1: Foundation & Auth
// Two-column tactical dashboard login screen
// ============================================================

import { useState, type FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import authBg from '../../../assets/auth/auth.png';
import './AuthPage.css';

type AuthMode = 'login' | 'register';

export function AuthPage() {
  const { login, register, error, loading, clearError } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeRules, setAgreeRules] = useState(false);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    clearError();
    setLocalError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDisplayName('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (mode === 'register' && password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, displayName || 'Manager');
      }
    } catch {
      // Error is caught and stored in auth context
    }
  };

  const activeError = localError || error;

  return (
    <div className="auth-page">
      {/* LEFT COLUMN: Visual Stadium Grid */}
      <div className="auth-page__left">
        <img src={authBg} alt="Futuristic Football Stadium" className="auth-left-bg" />
        <div className="auth-left-overlay" />
        
        {/* Brand Title Top Left */}
        <div className="auth-left-brand">
          FOOTBALL FANTASY
        </div>

        {/* Dynamic HUD Content Bottom Left */}
        <div className="auth-left-hud stagger-children">
          <div className="hud-tag animate-fade-in-down">
            LIVE ARENA: DIVISION 08
          </div>
          <h2 className="hud-title animate-fade-in-up">
            {mode === 'login' ? (
              <>THE NEXT GENERATION OF <span className="text-accent">FANTASY.</span></>
            ) : (
              <>FORGE YOUR <span className="text-accent">LEGACY.</span></>
            )}
          </h2>
          <p className="hud-desc animate-fade-in-up">
            {mode === 'login' 
              ? 'Sync your squad across the grid and compete in high-stakes tactical stadium simulations.'
              : 'Experience the next evolution of tactical sports management. Machined precision, high-stakes competition, and legendary athletes.'}
          </p>
        </div>

        <div className="auth-left-footer">
          © 2026 FOOTBALL FANTASY. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Control Center */}
      <div className="auth-page__right">
        {/* Top Header Icons */}
        <div className="auth-right-header">
          <button className="header-icon-btn" aria-label="Help" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </button>
          <button className="header-icon-btn" aria-label="Settings" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>

        {/* Central Auth Form */}
        <div className="auth-right-container animate-fade-in">
          <div className="auth-header-block">
            <h1 className="auth-right-title">ENTER THE ARENA</h1>
            <p className="auth-right-subtitle">
              {mode === 'login' ? 'LOGIN TO YOUR SQUAD' : 'RECRUIT YOUR FIRST TEAM'}
            </p>
          </div>

          <form className="auth-right-form" onSubmit={handleSubmit} noValidate>
            
            {/* Full Name / Manager Name (Register Mode Only) */}
            {mode === 'register' && (
              <div className="form-group animate-fade-in">
                <label className="form-label" htmlFor="displayName">FULL NAME</label>
                <div className="input-wrapper">
                  <input
                    id="displayName"
                    className="form-input"
                    type="text"
                    placeholder="COMMANDER NAME"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    autoComplete="name"
                  />
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                </div>
              </div>
            )}

            {/* Email / Network Identifier */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                {mode === 'login' ? 'NETWORK IDENTIFIER' : 'EMAIL PROTOCOL'}
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  placeholder={mode === 'login' ? 'EMAIL ADDRESS' : 'COMM_CHANNEL@NEON.GRID'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Password / Security Key */}
            <div className="form-group">
              <div className="label-container">
                <label className="form-label" htmlFor="password">
                  {mode === 'login' ? 'SECURITY KEY' : 'ENCRYPTION KEY'}
                </label>
                {mode === 'login' && (
                  <button className="forgot-link" type="button">
                    LOST ACCESS?
                  </button>
                )}
              </div>
              <div className="input-wrapper">
                <input
                  id="password"
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="input-icon-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Key (Register Mode Only) */}
            {mode === 'register' && (
              <div className="form-group animate-fade-in">
                <label className="form-label" htmlFor="confirmPassword">CONFIRM KEY</label>
                <div className="input-wrapper">
                  <input
                    id="confirmPassword"
                    className="form-input"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="input-icon-btn"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide password confirmation' : 'Show password confirmation'}
                  >
                    {showConfirmPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Checkbox (Maintain Uplink / Agree Terms) */}
            <div className="form-checkbox-container">
              {mode === 'login' ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="custom-box" />
                  <span className="checkbox-text">Maintain persistent uplink</span>
                </label>
              ) : (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeRules}
                    onChange={(e) => setAgreeRules(e.target.checked)}
                  />
                  <span className="custom-box" />
                  <span className="checkbox-text">
                    I AGREE TO THE <span className="highlight">RULES OF THE GAME</span> AND FAIR PLAY PROTOCOLS.
                  </span>
                </label>
              )}
            </div>

            {/* Error handling */}
            {activeError && (
              <div className="auth-right-error animate-fade-in" role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{activeError}</span>
              </div>
            )}

            {/* Slanted Cyan Submit Button */}
            <button
              type="submit"
              className="parallelogram-btn"
              disabled={loading || !email || !password || (mode === 'register' && (!agreeRules || !confirmPassword))}
            >
              <span className="btn-skew-content">
                {loading ? (
                  <>
                    <div className="spinner" />
                    <span>LAUNCHING...</span>
                  </>
                ) : (
                  <span>LAUNCH SQUAD {mode === 'register' ? '⚡' : ''}</span>
                )}
              </span>
            </button>
          </form>

          {/* Switch Link */}
          <div className="mode-toggle">
            {mode === 'login' ? (
              <>
                New operative?{' '}
                <button type="button" className="mode-toggle-link" onClick={toggleMode}>
                  Register your grid signature
                </button>
              </>
            ) : (
              <>
                ALREADY HAVE A COMMAND CENTER?{' '}
                <button type="button" className="mode-toggle-link" onClick={toggleMode}>
                  SIGN IN
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="auth-right-footer">
          <div className="footer-links">
            <a href="#terms">Terms of Play</a>
            <span className="footer-sep">|</span>
            <a href="#privacy">Privacy Protocol</a>
            <span className="footer-sep">|</span>
            <a href="#support">Support</a>
          </div>
          <div className="footer-security">
            SECURED BY NEON GRID SECURITY <span className="footer-sep">|</span> EST. 2026
          </div>
        </div>
      </div>
    </div>
  );
}

