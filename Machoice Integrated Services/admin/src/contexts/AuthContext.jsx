// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { adminLogin, adminSignup, adminLogout, authCheck } from '../services/services';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await authCheck();
        setAuth(res.data.authenticated);
      } catch (error) {
        setAuth(false);
      }
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  const login = async (credentials) => {
    const res = await adminLogin(credentials);
    setAuth(true);
    return res;
  };

  const signup = async (data) => {
    const res = await adminSignup(data);
    setAuth(true);
    return res;
  };

  const logout = async () => {
    await adminLogout();
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
