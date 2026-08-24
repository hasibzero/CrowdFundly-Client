"use client";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, Coins, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

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
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Card */}
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-8 bg-white dark:bg-[#1e293b] rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex flex-col justify-center relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 opacity-50 pointer-events-none transition-opacity duration-500 group-hover:opacity-100"></div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
        
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 relative z-10 tracking-tight leading-tight">
          Welcome back,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
            {user?.name || user?.email?.split('@')[0]}!
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl relative z-10 mb-8 leading-relaxed">
          Your support fuels innovation. Check out the latest updates from the projects you back and discover new opportunities to make an impact.
        </p>
        
        <div className="relative z-10 flex items-center space-x-4">
          <Link href="/campaigns" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg shadow-gray-900/20 dark:shadow-white/10 active:scale-95">
            <span>Explore Campaigns</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        variants={itemVariants}
        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {/* Role Card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-gray-800 flex items-center justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 font-bold">Your Role</p>
            <p className="text-3xl text-gray-900 dark:text-white font-black capitalize tracking-tight">{user?.role || 'Supporter'}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
            <LayoutDashboard className="w-6 h-6" />
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[24px] p-8 shadow-[0_8px_30px_rgb(99,102,241,0.2)] border border-indigo-400/30 flex items-center justify-between hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(99,102,241,0.3)] transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <p className="text-xs text-indigo-100 uppercase tracking-widest mb-2 font-bold">Available Credits</p>
            <p className="text-3xl text-white font-black tracking-tight">
              {user?.credits || 0}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner relative z-10">
            <Coins className="w-6 h-6" />
          </div>
        </div>
      </motion.div>

      {/* Quick Stats or Next Section (Placeholder for future) */}
      <motion.div variants={itemVariants} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {[1, 2, 3].map((i) => (
           <div key={i} className="bg-white dark:bg-[#1e293b] rounded-[20px] p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-gray-800 flex items-center space-x-4 hover:border-primary/30 transition-colors">
             <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
               <TrendingUp className="w-5 h-5" />
             </div>
             <div>
               <div className="h-4 w-24 bg-gray-100 dark:bg-gray-800 rounded animate-pulse mb-2"></div>
               <div className="h-3 w-16 bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse"></div>
             </div>
           </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
