import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Ensure cross-origin requests always include cookies (Better Auth session)
axios.defaults.withCredentials = true;

export const authHeaders = () => {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('crowdfundly_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
