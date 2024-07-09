// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdminPage = location.pathname.startsWith('/form');

  const onSignup = (newUser, authentication) => {
    setUser(newUser);
    setIsAuthenticated(authentication);
  };

  const onLogin = (loggedInUser, authentication) => {
    setUser(loggedInUser);
    setIsAuthenticated(authentication);
  };

  const onLogout = async () => {
    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loggedIn: false })
    });

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, onSignup, onLogin, onLogout, isAdminPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
