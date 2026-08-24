"use client";
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { HeartHandshake, Hourglass, WalletCards, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
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
 className="max-w-6xl w-full"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 >
 {/* Header Section */}
 <motion.div variants={itemVariants} className="mb-8">
 <h1 className="text-3xl md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
 Welcome back!
 </h1>
 <p className="text-[15px] text-gray-600 ">
 Here is an overview of your recent impact and active contributions.
 </p>
 </motion.div>

 {/* Summary Cards */}
 <motion.div 
 variants={itemVariants}
 className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
 >
 {/* Total Contributions */}
 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
 <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#d1fae5] flex items-center justify-center text-[#0f766e] z-10">
 <HeartHandshake className="w-5 h-5" />
 </div>
 
 <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Total Contributions</p>
 <p className="text-[40px] font-bold text-[#0f172a] leading-none mb-3 relative z-10 tracking-tight">24</p>
 
 <div className="flex items-center text-xs font-semibold text-emerald-600 relative z-10">
 <TrendingUp className="w-3.5 h-3.5 mr-1" />
 <span>+3 this month</span>
 </div>
 </div>

 {/* Pending Contributions */}
 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
 <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
 <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#fef3c7] flex items-center justify-center text-[#d97706] z-10">
 <Hourglass className="w-5 h-5" />
 </div>
 
 <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Pending Contributions</p>
 <p className="text-[40px] font-bold text-[#0f172a] leading-none mb-3 relative z-10 tracking-tight">2</p>
 
 <p className="text-xs text-gray-500 relative z-10 font-medium">Awaiting creator approval</p>
 </div>

 {/* Total Approved Amount */}
 <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200/60 relative overflow-hidden group hover:shadow-md transition-shadow">
 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
 <div className="absolute top-6 right-6 w-10 h-10 rounded-lg bg-[#e0e7ff] flex items-center justify-center text-[#4f46e5] z-10">
 <WalletCards className="w-5 h-5" />
 </div>
 
 <p className="text-[11px] text-gray-500 uppercase tracking-widest font-bold mb-4 relative z-10">Total Approved Amount</p>
 <div className="flex items-baseline mb-3 relative z-10">
 <p className="text-[40px] font-bold text-[#0f172a] leading-none tracking-tight">18,500</p>
 <span className="text-lg font-bold text-gray-400 ml-2">CR</span>
 </div>
 
 <p className="text-xs text-gray-500 relative z-10 font-medium">Lifetime deployed capital</p>
 </div>
 </motion.div>

 {/* Approved Contributions Table */}
 <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm border border-gray-200/60 overflow-hidden">
 <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
 <h3 className="text-[18px] font-bold text-[#0f172a] tracking-tight">Approved Contributions</h3>
 <Link href="/dashboard/contributions" className="text-sm font-bold text-[#4f46e5] hover:text-indigo-700 flex items-center transition-colors">
 View All <ArrowRight className="w-4 h-4 ml-1" />
 </Link>
 </div>
 
 <div className="overflow-x-auto">
 <table className="w-full text-sm text-left">
 <thead className="text-[11px] text-gray-500 font-bold uppercase tracking-widest bg-gray-50/50 border-b border-gray-100 ">
 <tr>
 <th className="px-6 py-4 font-bold">Campaign Title</th>
 <th className="px-6 py-4 font-bold">Creator Name</th>
 <th className="px-6 py-4 font-bold">Amount (Credits)</th>
 <th className="px-6 py-4 font-bold text-right">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100 ">
 {[
 { title: "Eco-Friendly Urban Farm Pods", creator: "Sarah Jenkins", amount: "2,500 CR", image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=150" },
 { title: "Aero V1 Electric Commuter", creator: "Marcus Chen", amount: "5,000 CR", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=150" },
 { title: "Oasis VR Educational Platform", creator: "EduTech Dynamics", amount: "1,000 CR", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=150" }
 ].map((item, idx) => (
 <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
 <td className="px-6 py-4">
 <div className="flex items-center space-x-4">
 <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover shadow-sm group-hover:shadow transition-shadow" />
 <span className="font-bold text-gray-800 text-[13px]">{item.title}</span>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center space-x-3">
 <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.creator)}&background=random&color=fff`} alt={item.creator} className="w-6 h-6 rounded-full" />
 <span className="text-gray-600 font-medium text-[13px]">{item.creator}</span>
 </div>
 </td>
 <td className="px-6 py-4 font-bold text-[#0f172a] text-[13px]">
 {item.amount}
 </td>
 <td className="px-6 py-4 text-right">
 <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d1fae5] text-[#059669] border border-[#a7f3d0] ">
 <CheckCircle2 className="w-3 h-3 mr-1" />
 Success
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </motion.div>
 </motion.section>
 );
}
