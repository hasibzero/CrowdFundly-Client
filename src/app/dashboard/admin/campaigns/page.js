"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Check, X, Eye, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL, authHeaders } from '@/lib/api';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/campaigns`, { headers: authHeaders() });
      setCampaigns(response.data);
    } catch (error) {
      console.error('Failed to fetch campaigns', error);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API_URL}/api/campaigns/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Campaign ${status.toLowerCase()} successfully!`);
      fetchCampaigns();
    } catch (error) {
      console.error(`Failed to ${status.toLowerCase()} campaign`, error);
      toast.error(error.response?.data?.message || `Failed to update status`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign? All backers will be refunded.")) return;
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.delete(`${API_URL}/api/campaigns/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Campaign deleted successfully!');
      fetchCampaigns();
    } catch (error) {
      console.error('Failed to delete campaign', error);
      toast.error(error.response?.data?.message || 'Failed to delete campaign');
    }
  };

  const pendingCampaigns = campaigns.filter(c => c.status === 'Pending');
  const approvedCampaigns = campaigns.filter(c => c.status === 'Approved');
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };



  return (
    <div className="w-full">


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
            <button onClick={() => toast.success('Filter coming soon!')} className="flex items-center text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
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
                    <tr key={campaign._id?.toString()} className="hover:bg-gray-50/50 transition-colors">
                      {/* Campaign Title */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                            <img src={campaign.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(campaign.title || 'C')}&background=e0e7ff&color=4f46e5`} alt={campaign.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#0f172a] mb-1 leading-tight">{campaign.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#e0e7ff] text-[#3b2de6] uppercase">
                              <span className="w-1 h-1 rounded-full bg-[#3b2de6] mr-1"></span>
                              {campaign.status}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Creator Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={campaign.creatorAvatar || `https://ui-avatars.com/api/?name=${campaign.creatorName}&background=f3f4f6&color=1f2937`} alt={campaign.creatorName} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[14px] font-medium text-[#475569]">{campaign.creatorName}</span>
                        </div>
                      </td>

                      {/* Funding Goal */}
                      <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">
                        ${campaign.targetAmount?.toLocaleString()}
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
                          <Link href={`/campaigns/${campaign._id}`} className="p-1.5 text-gray-400 hover:text-[#0f766e] hover:bg-[#e6f7ef] rounded-md transition-colors inline-block" title="View Details">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleUpdateStatus(campaign._id, 'Approved')} className="p-1.5 text-gray-400 hover:text-[#059669] hover:bg-[#d1fae5] rounded-md transition-colors" title="Approve">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleUpdateStatus(campaign._id, 'Rejected')} className="p-1.5 text-gray-400 hover:text-[#dc2626] hover:bg-[#fee2e2] rounded-md transition-colors" title="Reject">
                            <X className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(campaign._id)} className="p-1.5 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
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
            <button onClick={() => toast.success('Filter coming soon!')} className="flex items-center text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
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
                    <tr key={campaign._id?.toString()} className="hover:bg-gray-50/50 transition-colors">
                      {/* Campaign Title */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                            <img src={campaign.coverImage || "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=300"} alt={campaign.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-[#0f172a] mb-1 leading-tight">{campaign.title}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#d1fae5] text-[#059669] uppercase">
                              <span className="w-1 h-1 rounded-full bg-[#059669] mr-1"></span>
                              {campaign.status}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Creator Name */}
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={campaign.creatorAvatar || `https://ui-avatars.com/api/?name=${campaign.creatorName}&background=f3f4f6&color=1f2937`} alt={campaign.creatorName} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[14px] font-medium text-[#475569]">{campaign.creatorName}</span>
                        </div>
                      </td>

                      {/* Funding Goal */}
                      <td className="px-6 py-5 text-[15px] font-bold text-[#0f172a]">
                        ${campaign.targetAmount?.toLocaleString()}
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
                          <Link href={`/campaigns/${campaign._id}`} className="text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors flex items-center">
                            View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </Link>
                          <button onClick={() => handleDelete(campaign._id)} className="p-1.5 ml-2 text-gray-400 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
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

      </motion.div>
    </div>
  );
}
