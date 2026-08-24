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
    // This will normally contact your backend to verify credentials and get the JWT token.
    // For this demonstration, we'll assume the backend sends back a user object and token.
    try {
      const response = await axios.post('http://localhost:5000/jwt', { email });
      if (response.data.token) {
        localStorage.setItem('access-token', response.data.token);
        
        // Mock user fetching - you should fetch the user from your database here using the token
        const mockUser = {
          email,
          name: "User Name", // placeholder
          role: "Supporter", // placeholder
          credits: 50
        };
        localStorage.setItem('user-info', JSON.stringify(mockUser));
        setUser(mockUser);
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
      const response = await axios.post('http://localhost:5000/jwt', { email: userData.email });
      if (response.data.token) {
        localStorage.setItem('access-token', response.data.token);
        localStorage.setItem('user-info', JSON.stringify(userData));
        setUser(userData);
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
