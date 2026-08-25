"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ReviewContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchContributions = async () => {
    try {
      const token = localStorage.getItem('crowdfundly_token');
      const res = await axios.get(`${API}/api/contributions/review`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContributions(res.data);
    } catch (error) {
      console.error('Failed to fetch pending contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  const handleAction = async (id, status) => {
    if (!confirm(`Are you sure you want to ${status === 'Completed' ? 'approve' : 'reject'} this contribution?`)) return;
    
    setActionLoading(id);
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API}/api/contributions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove from list or refetch
      setContributions(contributions.filter(c => c._id !== id));
    } catch (error) {
      console.error('Failed to update status', error);
      alert('Error updating status');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#12643E]" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">Review Contributions</h1>
        <p className="text-gray-500 font-medium">Approve or reject pending support from your backers.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {contributions.length === 0 ? (
          <div className="p-12 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Pending Contributions</h3>
            <p className="text-gray-500 text-sm">You're all caught up! There are no new contributions to review.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                  <th className="p-4 pl-6 font-bold">Supporter Email</th>
                  <th className="p-4 font-bold">Campaign Title</th>
                  <th className="p-4 font-bold">Amount</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 pr-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {contributions.map((c) => (
                    <motion.tr 
                      key={c._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 pl-6 text-[14px] font-medium text-gray-900">{c.supporterEmail}</td>
                      <td className="p-4 text-[14px] font-medium text-gray-600 truncate max-w-[200px]">{c.campaignTitle || 'Unknown Campaign'}</td>
                      <td className="p-4 text-[14px] font-bold text-[#12643E]">{c.amount} CR</td>
                      <td className="p-4 text-[13px] text-gray-500">{new Date(c.date).toLocaleDateString()}</td>
                      <td className="p-4 pr-6 flex justify-end items-center space-x-2">
                        {actionLoading === c._id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                        ) : (
                          <>
                            <button 
                              onClick={() => handleAction(c._id, 'Completed')}
                              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-md font-bold text-xs flex items-center transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                            </button>
                            <button 
                              onClick={() => handleAction(c._id, 'Rejected')}
                              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md font-bold text-xs flex items-center transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </button>
                          </>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
