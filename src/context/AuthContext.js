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
  const { data: session, isPending: loading } = authClient.useSession();
  const user = session?.user || null;

  useEffect(() => {
    // Better Auth stores the JWT in a cookie when the jwt plugin is used.
    // Read the cookie to set the Axios Authorization header for the Express backend.
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    
    // Check for the better auth session token
    const token = getCookie("better-auth.session_token");
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
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Login exception:", error);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      // Better Auth signUp requires email, password, and name.
      // We can pass additional data like role and photoURL in the generic options if schema allows it,
      // but for now, we'll just pass them to the basic sign up.
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        // In Better Auth, extra fields need to be handled by custom plugins or schema.
        // Assuming we extended the user schema or just use basic fields for now.
        image: userData.photoURL,
      });

      if (error) {
        console.error("Registration failed:", error.message);
        throw new Error(error.message); // throw to be caught by the component toast
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
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser: () => {} }}>
      {children}
    </AuthContext.Provider>
  );
};
