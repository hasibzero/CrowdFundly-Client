"use client";
import { createContext, useState, useEffect, useContext, useCallback, useRef } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { authClient } from '@/lib/auth-client';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mirror `user` into a ref so refreshUser can tell whether someone is logged
  // in (JWT or better-auth) without taking `user` as a dependency (which would
  // re-create the callback and loop the refresh effects).
  const userRef = useRef(null);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Initialize from localStorage and better-auth
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('crowdfundly_token');
      const storedUser = localStorage.getItem('crowdfundly_user');
      
      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        } catch (e) {
          console.error("Failed to parse stored user", e);
        }
      }

      // Check better-auth session if no manual JWT is found (Google sign-in)
      try {
        const { data: sessionData } = await authClient.getSession();
        if (sessionData && sessionData.user) {
          // Upgrade Better Auth session to a JWT for seamless cross-origin backend API calls
          let token = localStorage.getItem('crowdfundly_token');
          if (!token) {
            try {
              const jwtRes = await axios.get('/api/auth/jwt');
              if (jwtRes.data && jwtRes.data.token) {
                token = jwtRes.data.token;
                localStorage.setItem('crowdfundly_token', token);
              }
            } catch (e) {
              console.error("Failed to sync Better Auth session to JWT", e.response?.data || e);
            }
          }

          const userObj = {
            _id: sessionData.user.id,
            name: sessionData.user.name,
            email: sessionData.user.email,
            photoURL: sessionData.user.image || sessionData.user.photoURL || '',
            role: sessionData.user.role || 'Supporter',
            credits: sessionData.user.credits ?? 0,
            roleSelected: sessionData.user.roleSelected ?? false,
          };
          setUser(userObj);
          
          if (token) {
            localStorage.setItem('crowdfundly_user', JSON.stringify(userObj));
          }
        }
      } catch (err) {
        console.error("Better Auth session check failed", err);
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  // Re-fetch the current user (credits, role, etc.) from the server and merge
  // it into state + localStorage. Safe to call anytime; no-ops when logged out.
  const refreshUser = useCallback(async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('crowdfundly_token') : null;
    // Refresh for JWT users (token) and better-auth/Google users (session cookie,
    // sent automatically via axios withCredentials). Skip when nobody is logged
    // in to avoid noisy 401s on public pages.
    if (!token && !userRef.current) return;
    try {
      const { data } = await axios.get(`${API_URL}/api/users/me`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!data) return;
      setUser((prev) => {
        if (!prev) return prev;
        if (token) {
          // Legacy JWT user — the server profile is the source of truth.
          const merged = { ...prev, ...data };
          localStorage.setItem('crowdfundly_user', JSON.stringify(merged));
          return merged;
        }
        // Better-auth (Google) user — only sync the live credit balance and keep
        // the session identity fields (_id, role, roleSelected) intact.
        return { ...prev, credits: data.credits ?? prev.credits ?? 0 };
      });
    } catch (err) {
      // Network error or expired token — keep existing state, don't force logout.
      console.error('refreshUser failed:', err.response?.data?.message || err.message);
    }
  }, []);

  // Keep the user fresh: refresh on navigation and when the tab regains focus,
  // so credit balances (navbar, dashboard) reflect purchases/contributions/withdrawals.
  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  useEffect(() => {
    const onFocus = () => refreshUser();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refreshUser]);

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

  const loginWithGoogleToken = async (access_token, role = 'Supporter') => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        access_token,
        role
      });
      
      const { token, user: userData } = response.data;
      
      localStorage.setItem('crowdfundly_token', token);
      localStorage.setItem('crowdfundly_user', JSON.stringify(userData));
      document.cookie = `crowdfundly_token=${token}; path=/; max-age=604800; SameSite=Lax`;
      setUser(userData);
      
      router.push('/dashboard');
      return true;
    } catch (error) {
      console.error("Google Login exception:", error.response?.data?.message || error.message);
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
    try {
      await authClient.signOut();
    } catch (e) {
      console.error("Better Auth signout error", e);
    }
    localStorage.removeItem('crowdfundly_token');
    localStorage.removeItem('crowdfundly_user');
    document.cookie = "crowdfundly_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    document.cookie = "better-auth.session_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithGoogleToken, register, logout, setUser, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
