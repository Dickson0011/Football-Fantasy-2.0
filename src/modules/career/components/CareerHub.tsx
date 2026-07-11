// ============================================================
// FOOTBALL FANTASY — Career Hub Component (Placeholder)
// Module 6: Career Mode · Dashboard landing page
// This is the first screen users see after authentication
// ============================================================

import { useAuth } from '../../auth';
import './CareerHub.css';

export function CareerHub() {
  const { playerProfile } = useAuth();

  const displayName = playerProfile?.displayName || 'Manager';
  const division = playerProfile?.currentDivision ?? 8;
  const coins = playerProfile?.coins ?? 1000;
  const matchesPlayed = playerProfile?.matchesPlayed ?? 0;
  const matchesWon = playerProfile?.matchesWon ?? 0;

  return (
    <div className="career-hub page-container">
      {/* Header */}
      <div className="career-hub__header">
        <p className="career-hub__greeting">Welcome back</p>
        <h1 className="career-hub__title">
          {displayName}'s <span>Career</span>
        </h1>
      </div>

      {/* Quick Stats */}
      <div className="section-title">Quick Overview</div>
      <div className="career-hub__stats stagger-children">
        <div className="stat-card animate-fade-in-up">
          <div className="stat-card__label">Division</div>
          <div className="stat-card__value stat-card__value--accent">{division}</div>
        </div>
        <div className="stat-card animate-fade-in-up">
          <div className="stat-card__label">Coins</div>
          <div className="stat-card__value stat-card__value--warning">
            {coins.toLocaleString()}
          </div>
        </div>
        <div className="stat-card animate-fade-in-up">
          <div className="stat-card__label">Matches Played</div>
          <div className="stat-card__value">{matchesPlayed}</div>
        </div>
        <div className="stat-card animate-fade-in-up">
          <div className="stat-card__label">Wins</div>
          <div className="stat-card__value stat-card__value--success">{matchesWon}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="section-title">Actions</div>
      <div className="career-hub__actions stagger-children">
        {/* Play Match */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <h3 className="action-card__title">Play Match</h3>
          <p className="action-card__desc">
            Enter the pitch and face your next opponent in the league.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Coming Soon</span>
          </div>
        </div>

        {/* Squad Management */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" />
              <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
          </div>
          <h3 className="action-card__title">Squad</h3>
          <p className="action-card__desc">
            Manage your Starting XI, coach, and formation.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Module 4</span>
          </div>
        </div>

        {/* Deck Builder */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <h3 className="action-card__title">Deck Builder</h3>
          <p className="action-card__desc">
            Build your Action Deck with Technique and Momentum cards.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Module 4</span>
          </div>
        </div>

        {/* League Table */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <h3 className="action-card__title">League Table</h3>
          <p className="action-card__desc">
            Check the standings, fixtures, and promotion race.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Module 6</span>
          </div>
        </div>

        {/* Football Daily */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
              <path d="M18 14h-8" />
              <path d="M15 18h-5" />
              <path d="M10 6h8v4h-8V6z" />
            </svg>
          </div>
          <h3 className="action-card__title">Football Daily</h3>
          <p className="action-card__desc">
            Read the latest headlines from across the league.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Module 6</span>
          </div>
        </div>

        {/* Card Collection */}
        <div className="action-card animate-fade-in-up" role="button" tabIndex={0}>
          <div className="action-card__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </div>
          <h3 className="action-card__title">Collection</h3>
          <p className="action-card__desc">
            Browse your cards, filter by archetype, and discover synergies.
          </p>
          <div className="action-card__badge">
            <span className="badge badge-common">Module 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
