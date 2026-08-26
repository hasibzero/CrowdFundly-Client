"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Plus, Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/api';

const API = API_URL;

export default function MyCampaignsPage() {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchCampaigns = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('crowdfundly_token');
      const res = await axios.get(`${API}/api/creator/campaigns`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = [...res.data].sort((a, b) => {
        const da = a.deadline ? new Date(a.deadline).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() + (a.duration || 0) * 86400000 : 0);
        const db = b.deadline ? new Date(b.deadline).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() + (b.duration || 0) * 86400000 : 0);
        return db - da;
      });
      setCampaigns(sorted);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
      toast.error('Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCampaigns(); }, [user]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.delete(`${API}/api/campaigns/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Campaign deleted');
      fetchCampaigns();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Approved: 'bg-green-100 text-green-700',
      Pending: 'bg-amber-100 text-amber-700',
      Rejected: 'bg-red-100 text-red-700',
    };
    return <span className={`px-3 py-1 text-xs font-bold rounded-full ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>;
  };

  const effectiveDeadline = (c) => {
    if (c.deadline) return new Date(c.deadline);
    if (c.createdAt && c.duration) return new Date(new Date(c.createdAt).getTime() + c.duration * 24 * 60 * 60 * 1000);
    return null;
  };

  const getDeadline = (c) => {
    const end = effectiveDeadline(c);
    if (!end || Number.isNaN(end.getTime())) return '—';
    return end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <motion.section className="w-full max-w-6xl mx-auto pt-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-[24px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">My Campaigns</h1>
          <p className="text-[14px] text-gray-500">Manage and track the progress of your launched projects.</p>
        </div>
        <Link href="/dashboard/create" className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-5 py-2.5 rounded-full font-bold text-[14px] flex items-center transition-colors shadow-sm whitespace-nowrap">
          <Plus className="w-4 h-4 mr-1.5 stroke-[3]" />
          New Campaign
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#12643E] animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-500 max-w-[24rem] mb-4">You haven't launched any campaigns yet.</p>
            <Link href="/dashboard/create" className="bg-[#12643E] text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-[#0e4f31] transition-colors">
              Create Your First Campaign
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-white border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Campaign</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Deadline</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Status</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-gray-600">Raised</th>
                    <th className="px-6 py-5 text-[13px] font-bold text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {campaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((c) => {
                    const progress = Math.min(Math.round(((c.raised || 0) / (c.targetAmount || 1)) * 100), 100);
                    return (
                      <tr key={c._id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                              <img src={c.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.title)}&background=e0e7ff&color=4f46e5`} alt={c.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-[#0f172a] leading-tight mb-1">{c.title}</p>
                              <p className="text-[12px] text-gray-500 font-medium">{c.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[13px] font-bold text-gray-700">{getDeadline(c)}</td>
                        <td className="px-6 py-5">{getStatusBadge(c.status)}</td>
                        <td className="px-6 py-5">
                          <div className="mb-2 text-[13px]">
                            <span className="font-bold text-[#0f172a]">{(c.raised || 0).toLocaleString()} credits</span>
                            <span className="text-gray-400 font-medium"> / {(c.targetAmount || 0).toLocaleString()}</span>
                          </div>
                          <div className="w-32 h-1.5 bg-[#eef2f6] rounded-full overflow-hidden">
                            <div className="h-full bg-[#12643E] rounded-full" style={{ width: `${progress}%` }}></div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-2 text-gray-400">
                            <Link href={`/campaigns/${c._id}`} className="p-1.5 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link href={`/dashboard/edit/${c._id}`} className="p-1.5 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button onClick={() => handleDelete(c._id)} className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {campaigns.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((c) => {
                const progress = Math.min(Math.round(((c.raised || 0) / (c.targetAmount || 1)) * 100), 100);
                return (
                  <div key={c._id} className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                        <img src={c.coverImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.title)}&background=e0e7ff&color=4f46e5`} alt={c.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-[#0f172a] leading-tight truncate">{c.title}</p>
                        <p className="text-[12px] text-gray-500 mt-0.5">{c.category}</p>
                      </div>
                      <div className="flex-shrink-0">{getStatusBadge(c.status)}</div>
                    </div>

                    <div className="mb-2 text-[13px]">
                      <span className="font-bold text-[#0f172a]">{(c.raised || 0).toLocaleString()} credits</span>
                      <span className="text-gray-400 font-medium"> / {(c.targetAmount || 0).toLocaleString()} goal</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#eef2f6] rounded-full overflow-hidden mb-3">
                      <div className="h-full bg-[#12643E] rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>

                    <div className="flex items-center justify-between text-[12px] text-gray-500">
                      <span>Deadline: {getDeadline(c)}</span>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Link href={`/campaigns/${c._id}`} className="p-2 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link href={`/dashboard/edit/${c._id}`} className="p-2 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(c._id)} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {campaigns.length > itemsPerPage && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[13px] text-gray-500 font-medium">
                  Showing {Math.min(campaigns.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(campaigns.length, currentPage * itemsPerPage)} of {campaigns.length} campaigns
                </span>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Previous
                  </button>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(campaigns.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(campaigns.length / itemsPerPage)}
                    className="px-4 py-2 border border-gray-200 text-gray-600 rounded-md text-[13px] font-bold hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.section>
  );
}
