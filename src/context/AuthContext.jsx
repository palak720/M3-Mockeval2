// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post('https://emphasized-horse-albertonykus.glitch.me/books', { token })
        .then(response => setUser(response.data.user))
        .catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = (email, password) => {
    axios.post('https://emphasized-horse-albertonykus.glitch.me/books', { email, password })
      .then(response => {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setUser({ email });
      })
      .catch(error => console.error(error));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
