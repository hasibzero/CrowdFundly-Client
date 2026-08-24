"use client";
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, Edit, Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function MyCampaignsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const campaigns = [
    {
      id: 1,
      title: "EcoSmart Thermostat",
      category: "Tech & Gadgets",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=300",
      deadline: "Dec 15, 2023",
      status: "Approved",
      raised: 24500,
      goal: 50000,
      progress: 49
    },
    {
      id: 2,
      title: "Realms of Aethelgard",
      category: "Tabletop Games",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300",
      deadline: "Jan 22, 2024",
      status: "Pending",
      raised: 0,
      goal: 15000,
      progress: 0
    },
    {
      id: 3,
      title: "Urban Harvest Kit",
      category: "Design & Food",
      image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=300",
      deadline: "Oct 05, 2023",
      status: "Ended",
      raised: 12000,
      goal: 10000,
      progress: 100
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="px-3 py-1 bg-[#d1fae5] text-[#059669] text-xs font-bold rounded-full">Approved</span>;
      case 'Pending':
        return <span className="px-3 py-1 bg-[#ffedd5] text-[#ea580c] text-xs font-bold rounded-full">Pending</span>;
      case 'Ended':
        return <span className="px-3 py-1 bg-[#e0e7ff] text-[#4f46e5] text-xs font-bold rounded-full">Ended</span>;
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
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">
            My Campaigns
          </h1>
          <p className="text-[14px] text-gray-500">
            Manage and track the progress of your launched projects.
          </p>
        </div>
        
        <Link 
          href="/dashboard/create"
          className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-5 py-2.5 rounded-full font-bold text-[14px] flex items-center transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
          New Campaign
        </Link>
      </motion.div>

      {/* Campaigns Table Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Campaign</th>
                <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Deadline</th>
                <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Status</th>
                <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Raised Amount</th>
                <th className="px-6 py-5 text-[13px] font-bold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                  {/* Campaign Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#0f172a] leading-tight mb-1">{campaign.title}</p>
                        <p className="text-[12px] text-gray-500 font-medium">{campaign.category}</p>
                      </div>
                    </div>
                  </td>

                  {/* Deadline */}
                  <td className="px-6 py-5 text-[13px] font-bold text-gray-700">
                    {campaign.deadline}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    {getStatusBadge(campaign.status)}
                  </td>

                  {/* Raised Amount & Progress */}
                  <td className="px-6 py-5">
                    <div className="mb-2 text-[13px]">
                      <span className="font-bold text-[#0f172a]">${campaign.raised.toLocaleString()}</span>
                      <span className="text-gray-400 font-medium"> / ${campaign.goal >= 1000 ? (campaign.goal / 1000) + 'k' : campaign.goal}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-32 h-1.5 bg-[#eef2f6] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#12643E] rounded-full" 
                        style={{ width: `${Math.min(campaign.progress, 100)}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 text-gray-400">
                      <button className="p-1.5 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Empty State Fallback (if no campaigns exist) */}
          {campaigns.length === 0 && (
            <div className="py-16 flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 max-w-sm mb-6">
                You haven't launched any campaigns yet. Click "New Campaign" to get started!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.section>
  );
}
