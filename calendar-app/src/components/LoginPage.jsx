import { useState } from 'react';
import './LoginPage.css';

function LoginPage({ onLogin, error }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h1 className="login-title">CACF 2026 Calendar</h1>
        <p className="login-subtitle">Enter the password to view the calendar</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <input
              type="password"
              className={`login-input ${error ? 'login-input-error' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <div className="login-error">{error}</div>}
          </div>
          <button type="submit" className="login-btn">
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
