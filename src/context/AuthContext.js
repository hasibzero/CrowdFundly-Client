"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  
  // Use Better Auth's reactive session hook
  const { data: session, isPending: loading, error } = authClient.useSession();
  const user = session?.user || null;

  useEffect(() => {
    console.log("[AuthContext] Session updated:", { session, loading, user, error });
  }, [session, loading, user, error]);

  useEffect(() => {
    // Sync the token with Axios for the Express backend
    const token = typeof window !== 'undefined' ? localStorage.getItem('access-token') : null;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [session]);

  const login = async (email, password) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
      if (error) {
        console.error("Login failed:", error.message);
        return false;
      }
      
      if (data?.token) {
        localStorage.setItem('access-token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Login exception:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        image: userData.photoURL,
        role: userData.role,
        credits: userData.credits,
      });

      if (error) {
        console.error("Registration failed:", error.message);
        throw new Error(error.message); // throw to be caught by the component toast
      }
      
      if (data?.token) {
        localStorage.setItem('access-token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Registration exception:", error);
      throw error;
    }
  };

  const logout = async () => {
    await authClient.signOut();
    localStorage.removeItem('access-token');
    delete axios.defaults.headers.common['Authorization'];
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};
