// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
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
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const onLogin = (loggedInUser, authentication) => {
    setUser(loggedInUser);
    setIsAuthenticated(authentication);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const onLogout = async () => {
    await fetch(`http://localhost:8000/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loggedIn: false })
    });

    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true); // Update authentication status
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, onSignup, onLogin, onLogout, isAdminPage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
