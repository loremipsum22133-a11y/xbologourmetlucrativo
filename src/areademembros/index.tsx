import React, { useState, useEffect } from 'react';
import { Login } from './Login';
import { Dashboard } from './Dashboard';

const AUTH_KEY = 'xbolo_user';

export const MembersArea: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_KEY);
  });

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(AUTH_KEY, userEmail);
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [userEmail]);

  const handleLogin = (email: string) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail(null);
  };

  if (!userEmail) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
};
