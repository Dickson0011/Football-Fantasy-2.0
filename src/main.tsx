// ============================================================
// FOOTBALL FANTASY — Application Entry Point
// ============================================================

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles (order matters)
import './shared/styles/index.css';
import './shared/styles/animations.css';

// App root
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
