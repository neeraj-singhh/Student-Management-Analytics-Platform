import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('edu_auth_token'));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('edu_auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('edu_auth_token', token);
    } else {
      localStorage.removeItem('edu_auth_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('edu_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edu_auth_user');
    }
  }, [user]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('edu_auth_token');
    localStorage.removeItem('edu_auth_user');
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === 'ROLE_ADMIN';
  const isStaff = user?.role === 'ROLE_STAFF' || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isAdmin,
        isStaff,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

