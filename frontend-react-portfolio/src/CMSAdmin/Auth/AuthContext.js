// AuthContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdminPage = location.pathname.startsWith("/form");
  const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const onSignup = (newUser, authentication) => {
    setUser(newUser);
    setIsAuthenticated(authentication);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const onLogin = (loggedInUser, token, authentication) => {
    setUser(loggedInUser);
    setIsAuthenticated(authentication);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    localStorage.setItem("token", token); // Save JWT token
    localStorage.setItem("userId", loggedInUser._id);
  };

  // Use useCallback to avoid recreating the function on every render
  const onLogout = useCallback(async () => {
    await signOut(auth); // Sign out from Firebase

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      toast.success("Logged out successfully!");
    } else {
      toast.error("Failed to log out. Please try again.");
    }
  }, [API_URL]);
  const isTokenExpired = (token) => {
    if (token) {
      try {
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const expiry = tokenPayload.exp * 1000; // Convert to milliseconds
        return Date.now() > expiry;
      } catch (error) {
        console.error("Failed to decode the token:", error.message);
      }
    }
    return true; // Default to true if no token
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      if (isTokenExpired(token)) {
        onLogout(); // Automatically log out if token is expired
      } else {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Set loading to false after check
  }, [onLogout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        onSignup,
        onLogin,
        onLogout,
        isAdminPage,
        isLoading, // Expose isLoading to consumers
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
