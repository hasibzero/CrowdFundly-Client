"use client";
import Sidebar from '@/components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="flex h-screen items-center justify-center bg-gray-50">Loading Dashboard...</div>;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-body-md min-h-screen flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <div className="p-4 md:p-10 max-w-7xl mx-auto w-full flex-1 space-y-10">
          {children}
        </div>
      </main>
    </div>
  );
}
