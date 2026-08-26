"use client";
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Coins } from 'lucide-react';
import NotificationBell from '@/components/NotificationBell';
import axios from 'axios';
import { API_URL, authHeaders } from '@/lib/api';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [credits, setCredits] = useState(0);
  const pathname = usePathname();

  // Google (better-auth) users must complete the one-time role choice before
  // entering the dashboard. Email/password users (JWT present) and Admins skip it.
  const needsRoleSelection =
    !!user &&
    user.role !== 'Admin' &&
    !user.roleSelected &&
    typeof window !== 'undefined' &&
    !localStorage.getItem('crowdfundly_token');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!loading && needsRoleSelection) {
      router.replace('/select-role');
    }
  }, [loading, needsRoleSelection, router]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Keep the header credit balance fresh across dashboard navigation
  useEffect(() => {
    if (!user) return;
    axios.get(`${API_URL}/api/users/me`, { headers: authHeaders() })
      .then((res) => setCredits(res.data?.credits || 0))
      .catch(() => {});
  }, [user, pathname]);

  if (loading || !user || needsRoleSelection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] ">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fc] text-gray-900 font-body-md min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#0f766e] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm">
            CF
          </div>
          <span className="font-bold text-[#0f766e]">Crowdfundly</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none p-1"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <Sidebar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300 w-full overflow-x-hidden relative">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 flex items-center gap-3">
          {user?.role !== 'Admin' && (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-3 pr-4 py-1.5 shadow-sm" title="Available credits">
              <Coins className="w-4 h-4 text-[#12643E]" />
              <span className="text-[13px] font-bold text-[#0f172a]">{credits.toLocaleString()}</span>
              <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">credits</span>
            </div>
          )}
          <NotificationBell />
        </div>
        <div className="p-4 sm:p-6 md:p-8 lg:p-12 max-w-[1400px] mx-auto w-full flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
