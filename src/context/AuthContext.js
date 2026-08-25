"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/lib/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('crowdfundly_token');
    const storedUser = localStorage.getItem('crowdfundly_user');
    
    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('crowdfundly_token', token);
      localStorage.setItem('crowdfundly_user', JSON.stringify(userData));
      document.cookie = `crowdfundly_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      setUser(userData);
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Login exception:", error.response?.data?.message || error.message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        photoURL: userData.photoURL,
        role: userData.role || 'Supporter',
      });

      const { token, user: newUserData } = response.data;
      
      localStorage.setItem('crowdfundly_token', token);
      localStorage.setItem('crowdfundly_user', JSON.stringify(newUserData));
      document.cookie = `crowdfundly_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      setUser(newUserData);
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Registration exception:", error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  const logout = async () => {
    localStorage.removeItem('crowdfundly_token');
    localStorage.removeItem('crowdfundly_user');
    document.cookie = "crowdfundly_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie = "better-auth.session_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
