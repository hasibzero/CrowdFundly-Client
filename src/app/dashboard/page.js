"use client";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Coins } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Card */}
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-xl p-10 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 relative z-10">
          Welcome back, {user?.name || user?.email?.split('@')[0]}!
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg relative z-10">
          Your support is fueling innovation. Check out the latest updates from the projects you back and discover new opportunities to make an impact.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {/* Total Projects */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Role</p>
            <p className="text-2xl text-primary font-bold capitalize">{user?.role}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <LayoutDashboard className="w-6 h-6" />
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between hover:-translate-y-1 transition-transform duration-300">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-semibold">Available Credits</p>
            <p className="text-2xl text-indigo-600 font-bold">
              {user?.credits} <span className="text-base font-normal text-gray-500">Credits</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
