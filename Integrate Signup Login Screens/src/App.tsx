import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen">
      {currentPage === 'login' ? (
        <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} />
      ) : (
        <SignupPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </div>
  );
}
