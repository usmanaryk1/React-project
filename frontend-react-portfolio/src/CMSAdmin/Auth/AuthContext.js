// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdminPage = location.pathname.startsWith("/form");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const onSignup = (newUser, authentication) => {
    setUser(newUser);
    setIsAuthenticated(authentication);
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("token", newUser.token); // Save JWT token
  };

  const onLogin = (loggedInUser, token, authentication) => {
    setUser(loggedInUser);
    setIsAuthenticated(authentication);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("token", token); // Save JWT token
    localStorage.setItem("userId", loggedInUser._id);
  };

  const onLogout = async () => {
    // Send the logout request to the server
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      // Clear user data and show a toast message
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      // Show success toast message
      toast.success("Logged out successfully!");
    } else {
      // Show error message if logout fails
      toast.error("Failed to log out. Please try again.");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true); // Update authentication status
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        onSignup,
        onLogin,
        onLogout,
        isAdminPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
