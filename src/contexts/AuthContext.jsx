import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking local storage for an existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const fakeUser = { id: 1, email, name: email.split('@')[0] };
          setUser(fakeUser);
          localStorage.setItem('user', JSON.stringify(fakeUser));
          resolve(fakeUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const register = (email, password, name) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { id: Date.now(), email, name };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(newUser);
      }, 1000);
    });
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
