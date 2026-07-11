// ============================================================
// FOOTBALL FANTASY — Navbar Component
// Shared Component · Top navigation bar
// ============================================================

import { useAuth } from '../../modules/auth';
import ffLogo from '../../assets/shared/ff-logo.png';
import './Navbar.css';

export function Navbar() {
  const { user, playerProfile, logout } = useAuth();

  if (!user) return null;

  const displayName = playerProfile?.displayName || user.email?.split('@')[0] || 'Manager';

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Brand */}
      <div className="navbar__brand">
        <img src={ffLogo} alt="Football Fantasy" className="navbar__logo" />
        <span className="navbar__title">Football Fantasy</span>
      </div>

      {/* Navigation links */}
      <div className="navbar__nav">
        <button type="button" className="navbar__link navbar__link--active">
          Career Hub
        </button>
        <button type="button" className="navbar__link">
          Squad
        </button>
        <button type="button" className="navbar__link">
          Deck
        </button>
        <button type="button" className="navbar__link">
          League
        </button>
        <button type="button" className="navbar__link">
          Collection
        </button>
      </div>

      {/* User section */}
      <div className="navbar__user">
        <span className="navbar__username">{displayName}</span>
        {playerProfile && (
          <span className="navbar__division">
            Div {playerProfile.currentDivision}
          </span>
        )}
        <button type="button" className="navbar__logout" onClick={logout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}
