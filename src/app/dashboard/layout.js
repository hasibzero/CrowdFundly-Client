"use client";
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] dark:bg-[#0f172a]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fc] dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 font-body-md min-h-screen flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <DashboardHeader />
        <div className="p-8 md:p-12 max-w-[1400px] mx-auto w-full flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
