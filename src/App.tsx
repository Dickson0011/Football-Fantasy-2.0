// ============================================================
// FOOTBALL FANTASY — App Root
// Wraps the entire application with providers and routing
// ============================================================

import { AuthProvider, AuthGuard } from './modules/auth';
import { Navbar } from './shared/components/Navbar';
import { CareerHub } from './modules/career/components/CareerHub';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <AuthGuard>
          <Navbar />
          <CareerHub />
        </AuthGuard>
      </div>
    </AuthProvider>
  );
}
