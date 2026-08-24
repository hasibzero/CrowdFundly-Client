"use client";
import { motion } from 'framer-motion';
import { Filter, Check, X, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminCampaignsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pendingCampaigns = [
    {
      id: 1,
      title: "OceanClean Bottle Co.",
      image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=300",
      creatorName: "Sarah Jenkins",
      creatorAvatar: "https://ui-avatars.com/api/?name=Sarah+Jenkins&background=f3f4f6&color=1f2937",
      goal: "$150,000",
      category: "Product Design",
      status: "Pending"
    },
    {
      id: 2,
      title: "Neon Knights Game",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=300",
      creatorName: "David Chen",
      creatorAvatar: "https://ui-avatars.com/api/?name=David+Chen&background=f3f4f6&color=1f2937",
      goal: "$75,000",
      category: "Technology",
      status: "Pending"
    },
    {
      id: 3,
      title: "Urban Oasis Garden",
      image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=300",
      creatorName: "Maria Rossi",
      creatorAvatar: "https://ui-avatars.com/api/?name=Maria+Rossi&background=10b981&color=fff",
      goal: "$12,500",
      category: "Community",
      status: "Pending"
    }
  ];

  const approvedCampaigns = [
    {
      id: 4,
      title: "EcoSmart Thermostat",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=300",
      creatorName: "James Wilson",
      creatorAvatar: "https://ui-avatars.com/api/?name=James+Wilson&background=f3f4f6&color=1f2937",
      goal: "$50,000",
      category: "Technology",
      status: "Approved"
    },
    {
      id: 5,
      title: "Artisan Sketchbook Pro",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300",
      creatorName: "Elena Rodriguez",
      creatorAvatar: "https://ui-avatars.com/api/?name=Elena+Rodriguez&background=8b5cf6&color=fff",
      goal: "$25,000",
      category: "Art",
      status: "Approved"
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
          <Link href="/dashboard/admin/campaigns" className="h-full flex items-center border-b-2 border-[#12643E] text-[13px] font-bold text-[#12643E]">
            Approvals
          </Link>
          <Link href="#" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
            Finance
          </Link>
        </div>
      </div>

      {/* Main Admin Content */}
      <motion.div 
        className="p-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* PENDING CAMPAIGNS SECTION */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Pending Campaigns</h2>
            <button className="flex items-center text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
              Filter <Filter className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#f8f9fc]">
                  <tr>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Campaign Title</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Creator Name</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Funding Goal</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Category</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Campaign Title */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#0f172a] mb-1 leading-tight">{campaign.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e0e7ff] text-[#3b2de6]">
                              <span className="w-1 h-1 rounded-full bg-[#3b2de6] mr-1"></span>
                              PENDING
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Creator Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={campaign.creatorAvatar} alt={campaign.creatorName} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[14px] font-medium text-[#475569]">{campaign.creatorName}</span>
                        </div>
                      </td>

                      {/* Funding Goal */}
                      <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">
                        {campaign.goal}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-[#ede9fe] text-[#7c3aed] text-[11px] font-bold rounded-full whitespace-nowrap">
                          {campaign.category}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-1.5 text-gray-400 hover:text-[#0f766e] hover:bg-[#e6f7ef] rounded-md transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-[#059669] hover:bg-[#d1fae5] rounded-md transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-[#dc2626] hover:bg-[#fee2e2] rounded-md transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>


        {/* APPROVED CAMPAIGNS SECTION */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Approved Campaigns</h2>
            <button className="flex items-center text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
              Filter <Filter className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="bg-[#f8f9fc]">
                  <tr>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Campaign Title</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Creator Name</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Funding Goal</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b]">Category</th>
                    <th className="px-6 py-4 text-[13px] font-bold text-[#64748b] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {approvedCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Campaign Title */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                            <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#0f172a] mb-1 leading-tight">{campaign.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d1fae5] text-[#059669]">
                              <span className="w-1 h-1 rounded-full bg-[#059669] mr-1"></span>
                              APPROVED
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Creator Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={campaign.creatorAvatar} alt={campaign.creatorName} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[14px] font-medium text-[#475569]">{campaign.creatorName}</span>
                        </div>
                      </td>

                      {/* Funding Goal */}
                      <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">
                        {campaign.goal}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-[#ede9fe] text-[#7c3aed] text-[11px] font-bold rounded-full whitespace-nowrap">
                          {campaign.category}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/dashboard/admin/campaigns/${campaign.id}`} className="text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors flex items-center">
                            Manage <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
