"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Check if token exists on load
    const checkUser = () => {
      const token = localStorage.getItem('access-token');
      const storedUser = localStorage.getItem('user-info');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('access-token', response.data.token);
        localStorage.setItem('user-info', JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.push('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('access-token', response.data.token);
        localStorage.setItem('user-info', JSON.stringify(response.data.user));
        setUser(response.data.user);
        router.push('/dashboard');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('user-info');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
