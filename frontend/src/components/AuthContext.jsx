import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. CREATE THE AUTH CONTEXT ---
export const AuthContext = createContext({
  isLoggedIn: false,
  isAuthReady: false,
  user: null,
  handleLogin: () => {}, // <-- FIX: Removed 'userData' parameter
  handleLogout: () => {},
});

// --- HELPER: Safely decode JWT ---
const safeJwtDecode = (token) => {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) { 
    console.error("Failed to decode token:", e);
    return null; 
  }
};

// --- 2. CREATE THE AUTH PROVIDER ---
// This component will wrap your App, holding all auth state and logic.
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); 
  const [isAuthReady, setIsAuthReady] = useState(false); // For checking token on load
  const navigate = useNavigate();

  // --- Session Restoration Effect ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = safeJwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (decodedUser && decodedUser.exp > currentTime) {
        setUser(decodedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('token');
      }
    }
    setIsAuthReady(true);
  }, []);

  // Login handler
  const handleLogin = (userData) => { // <-- This one is correct
    setUser(userData); 
    setIsLoggedIn(true);
    // (Token is saved in Login.jsx)
    if (userData.role === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setUser(null);
    setIsLoggedIn(false);
    navigate('/'); 
  };

  // --- 3. DEFINE THE VALUE FOR THE CONTEXT ---
  const authContextValue = {
    isLoggedIn,
    user,
    isAuthReady,
    handleLogin,
    handleLogout
  };

  // Provide the context to all children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};