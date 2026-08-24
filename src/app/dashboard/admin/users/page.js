"use client";
import { motion } from 'framer-motion';
import { Filter, Pencil, Trash2, BadgeCheck, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function AdminUsersPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const usersList = [
    {
      id: 1,
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      isVerified: false,
      status: "ACTIVE",
      role: "Creator",
      credits: "$1,450.00"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@invest.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      isVerified: true,
      status: "ACTIVE",
      role: "Supporter",
      credits: "$12,000.00"
    }
  ];

  return (
    <div className="w-full flex flex-col -mt-8 -mx-6 md:-mx-8">
      {/* Admin Topbar */}
      <div className="w-full h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex space-x-8 h-full">
          <Link href="/dashboard/admin" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Stats
          </Link>
          <Link href="/dashboard/admin/campaigns" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Approvals
          </Link>
          <Link href="/dashboard/admin/withdrawals" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Finance
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="p-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Area */}
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
              User Directory
            </h1>
            <p className="text-[14px] text-gray-500">
              Manage platform members, assign roles, and monitor account status.
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#12643E] cursor-pointer shadow-sm">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Creator</option>
                <option>Supporter</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4 text-gray-500" />
              <span>Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-[#f8f9fc]">
                <tr>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[30%]">User</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[30%]">Email & Status</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Role</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[15%]">Credits</th>
                  <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest w-[10%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                    
                    {/* User */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center">
                          <p className="text-[14px] font-bold text-[#0f172a] mr-1.5">{user.name}</p>
                          {user.isVerified && <BadgeCheck className="w-4 h-4 text-[#4f46e5]" fill="#eef2ff" />}
                        </div>
                      </div>
                    </td>

                    {/* Email & Status */}
                    <td className="px-6 py-5">
                      <p className="text-[14px] text-[#0f172a] mb-1.5">{user.email}</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#e6f7ef] text-[#059669] tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mr-1"></span>
                        {user.status}
                      </span>
                    </td>

                    {/* Role Dropdown */}
                    <td className="px-6 py-5">
                      <div className="relative w-32">
                        <select 
                          defaultValue={user.role}
                          className="w-full appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-[13px] font-medium text-[#0f172a] focus:outline-none focus:border-[#12643E] transition-colors cursor-pointer"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Creator">Creator</option>
                          <option value="Supporter">Supporter</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="px-6 py-5 text-[14px] font-bold text-[#0f172a]">
                      {user.credits}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-gray-400 hover:text-[#12643E] transition-colors" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 text-[12px]">
            <div className="text-gray-500 font-medium">
              Showing 1 to 10 of 2,451 users
            </div>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &lt;
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-[#12643E] text-white font-bold">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                3
              </button>
              <span className="w-8 h-8 flex items-center justify-center text-gray-400">...</span>
              <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors">
                &gt;
              </button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
