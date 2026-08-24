export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const authHeaders = () => {
  const token = typeof window === 'undefined' ? null : localStorage.getItem('crowdfundly_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
