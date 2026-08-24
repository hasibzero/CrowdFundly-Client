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
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0f172a]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 dark:bg-[#0b1120] text-gray-900 dark:text-gray-100 font-body-md min-h-screen flex">
      <Sidebar />
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen transition-all duration-300">
        <DashboardHeader />
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto w-full flex-1 space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
