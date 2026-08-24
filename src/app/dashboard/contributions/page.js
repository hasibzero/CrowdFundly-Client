"use client";
import { motion } from 'framer-motion';
import { Banknote, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function ContributionsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const contributions = [
    {
      id: 1,
      campaignTitle: "EcoRide E-Bike V2",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=300",
      date: "Oct 24, 2023",
      amount: "1,200",
      rewardTier: "Early Bird Special",
      status: "Approved"
    },
    {
      id: 2,
      campaignTitle: "Lumi Smart Hub",
      image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=300",
      date: "Nov 12, 2023",
      amount: "450",
      rewardTier: "Standard Kit",
      status: "Pending"
    },
    {
      id: 3,
      campaignTitle: "Artisan Sketchbook Pro",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300",
      date: "Dec 05, 2023",
      amount: "50",
      rewardTier: "Supporter Tier",
      status: "Approved"
    },
    {
      id: 4,
      campaignTitle: "AquaPure Portable",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=300",
      date: "Jan 18, 2024",
      amount: "150",
      rewardTier: "Explorer Pack",
      status: "Rejected"
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 bg-[#d1fae5] text-[#059669] text-xs font-bold rounded-full">Approved</span>;
      case 'Pending':
        return <span className="px-3 py-1 bg-[#ffedd5] text-[#ea580c] text-xs font-bold rounded-full">Pending</span>;
      case 'Rejected':
        return <span className="px-3 py-1 bg-[#fee2e2] text-[#dc2626] text-xs font-bold rounded-full">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto pt-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
          My Contributions
        </h1>
        <p className="text-[14px] text-gray-500">
          Track your support for innovative campaigns.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Total Contributed */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center h-28">
          <div className="w-14 h-14 rounded-full bg-[#2ea673] flex items-center justify-center mr-5 shadow-sm">
            <Banknote className="w-6 h-6 text-[#0e4f31]" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Contributed</p>
            <p className="text-[24px] font-bold text-[#0f172a] leading-none">
              4,250 <span className="text-[18px] font-medium text-gray-700">Credits</span>
            </p>
          </div>
        </div>

        {/* Projects Supported */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center h-28">
          <div className="w-14 h-14 rounded-full bg-[#6d28d9] flex items-center justify-center mr-5 shadow-sm">
            <Rocket className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Projects Supported</p>
            <p className="text-[24px] font-bold text-[#0f172a] leading-none">
              12 <span className="text-[18px] font-medium text-gray-700">Campaigns</span>
            </p>
          </div>
        </div>

      </motion.div>

      {/* Main Table Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
        
        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-[#f8f9fc]">
              <tr>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Campaign Title</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Date</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Amount (Credits)</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Reward Tier</th>
                <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contributions.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* Campaign Title */}
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                        <img 
                          src={contribution.image} 
                          alt={contribution.campaignTitle} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[14px] font-bold text-[#0f172a]">{contribution.campaignTitle}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5 text-[14px] text-[#475569] font-medium">
                    {contribution.date}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">
                    {contribution.amount}
                  </td>

                  {/* Reward Tier */}
                  <td className="px-6 py-5 text-[14px] text-[#475569]">
                    {contribution.rewardTier}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    {getStatusBadge(contribution.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f8f9fc]/50">
          <p className="text-[13px] text-gray-500">
            Showing 1 to 4 of 12 entries
          </p>
          <div className="flex space-x-1">
            <button className="px-3 py-1.5 rounded-md text-[13px] font-bold text-gray-400 cursor-not-allowed">
              Prev
            </button>
            <button className="w-8 h-8 rounded-md bg-[#eff4fc] text-[#3b2de6] text-[13px] font-bold flex items-center justify-center shadow-sm border border-[#d4e1f9]">
              1
            </button>
            <button className="w-8 h-8 rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-[13px] font-bold flex items-center justify-center transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 rounded-md text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-colors border border-gray-200 ml-1 bg-white">
              Next
            </button>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
