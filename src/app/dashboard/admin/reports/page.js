"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, UserPlus, CheckCircle2, Banknote, Flag, Filter, ArrowUp, Loader2, Trash2, Eye, XCircle } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

import { API_URL } from '@/lib/api';

const API = API_URL;

const REASON_STYLES = {
  'Misleading Claims':    'bg-[#fee2e2] text-[#dc2626]',
  'Plagiarism':           'bg-[#ffedd5] text-[#d97706]',
  'Inappropriate Content':'bg-[#dbeafe] text-[#2563eb]',
  'Scam / Fraud':         'bg-[#fce7f3] text-[#be185d]',
  'Spam':                 'bg-[#f3f4f6] text-[#374151]',
  'Other':                'bg-[#f0fdf4] text-[#15803d]',
};

export default function AdminReportsPage() {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [reasonFilter, setReasonFilter] = useState('All');

  const fetchData = async () => {
    const token = localStorage.getItem('crowdfundly_token');
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [reportsRes, statsRes] = await Promise.all([
        axios.get(`${API}/api/reports`, { headers }),
        axios.get(`${API}/api/dashboard/stats`, { headers }),
      ]);
      setReports(reportsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleStatus = async (id, status) => {
    setProcessingId(id);
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API}/api/reports/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Report marked as ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Failed to update report');
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this report permanently?')) return;
    setProcessingId(id);
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.delete(`${API}/api/reports/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Report deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete report');
    } finally {
      setProcessingId(null);
    }
  };

  const pending   = reports.filter(r => r.status === 'Pending').length;
  const reviewed  = reports.filter(r => r.status === 'Reviewed').length;
  const dismissed = reports.filter(r => r.status === 'Dismissed').length;

  const allReasons = ['All', ...Array.from(new Set(reports.map(r => r.reason).filter(Boolean)))];
  const filtered = reasonFilter === 'All' ? reports : reports.filter(r => r.reason === reasonFilter);

  const statusBadge = (status) => {
    const s = {
      Pending:   'bg-amber-100 text-amber-700',
      Reviewed:  'bg-green-100 text-green-700',
      Dismissed: 'bg-gray-100 text-gray-500',
    };
    return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${s[status] || 'bg-gray-100 text-gray-600'}`}>{status}</span>;
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants      = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="w-full">

      <motion.div className="p-8 max-w-7xl mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-start mb-8 gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">Reports & Analytics</h1>
            <p className="text-[15px] text-gray-500">Monitor platform health, user acquisition, and flagged activities.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => toast.success('Exporting CSV...')} className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4 text-gray-500" /><span>Export CSV</span>
            </button>
            <button onClick={() => toast.success('Filter coming soon!')} className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" /><span>Last 30 Days</span>
            </button>
          </div>
        </motion.div>

        {/* 3 Metric Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#e6f7ef] flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-[#059669]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <ArrowUp className="w-3 h-3 mr-1" />{stats?.totalUsers ?? '—'}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Total Users</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">{loading ? '—' : (stats?.totalUsers ?? 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.03)] flex flex-col justify-between h-40">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#ede9fe] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#7c3aed]" />
              </div>
              <div className="flex items-center px-2 py-1 bg-[#e6f7ef] rounded-full text-[#059669] text-[11px] font-bold">
                <ArrowUp className="w-3 h-3 mr-1" />{loading ? '—' : `${reviewed} resolved`}
              </div>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-500 mb-1">Total Reports</p>
              <p className="text-[28px] font-bold text-[#0f172a] leading-none">{loading ? '—' : reports.length}</p>
            </div>
          </div>

          <div className="bg-[#24704e] rounded-xl p-6 shadow-[0_2px_10px_rgb(0,0,0,0.05)] flex flex-col justify-between h-40 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-lg bg-[#33825f] flex items-center justify-center">
                <Flag className="w-5 h-5 text-white" />
              </div>
              <span className="flex items-center px-2 py-1 bg-[#1a5c3b] rounded-full text-[#86efac] text-[11px] font-bold">
                {loading ? '—' : pending} pending
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[12px] font-bold text-[#86efac] mb-1">Flagged Campaigns</p>
              <p className="text-[28px] font-bold text-white leading-none">{loading ? '—' : reports.filter(r => r.status === 'Pending').length}</p>
            </div>
          </div>
        </motion.div>

        {/* Reported Issues Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden flex flex-col">
          <div className="px-8 py-6 flex justify-between items-start border-b border-gray-100">
            <div>
              <div className="flex items-center mb-1">
                <Flag className="w-5 h-5 text-[#dc2626] mr-2" fill="#fca5a5" />
                <h2 className="text-[20px] font-bold text-[#0f172a]">Reported Issues</h2>
              </div>
              <p className="text-[14px] text-gray-500">Campaigns flagged by community members requiring admin review.</p>
            </div>
            {/* Reason filter */}
            <div className="flex items-center gap-3">
              <select
                value={reasonFilter}
                onChange={(e) => setReasonFilter(e.target.value)}
                className="pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-md text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-[#12643E] cursor-pointer shadow-sm"
              >
                {allReasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-[#12643E] animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Flag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-[14px] text-gray-400">No reports found. The platform is clean! 🎉</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead className="bg-[#f8f9fc]">
                    <tr>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[22%]">Reporter</th>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[26%]">Campaign</th>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[18%]">Reason</th>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[12%]">Date</th>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[12%]">Status</th>
                      <th className="px-8 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest w-[10%] text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((report) => (
                      <tr key={report._id} className="hover:bg-gray-50/50 transition-colors group">
                        {/* Reporter */}
                        <td className="px-8 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-[12px] text-indigo-600 flex-shrink-0">
                              {report.reporterEmail?.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-[#0f172a] leading-tight">{report.reporterEmail}</p>
                              <p className="text-[11px] text-gray-400">
                                {report.description ? report.description.slice(0, 40) + (report.description.length > 40 ? '…' : '') : 'No description'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Campaign */}
                        <td className="px-8 py-5">
                          {report.campaignId ? (
                            <Link href={`/campaigns/${report.campaignId}`} className="text-[14px] font-bold text-[#4f46e5] hover:text-[#4338ca] transition-colors leading-tight block">
                              {report.campaignTitle || `Campaign #${report.campaignId.toString().slice(-6)}`}
                            </Link>
                          ) : (
                            <span className="text-[14px] font-bold text-[#0f172a]">{report.campaignTitle || '—'}</span>
                          )}
                        </td>

                        {/* Reason */}
                        <td className="px-8 py-5">
                          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${REASON_STYLES[report.reason] || 'bg-gray-100 text-gray-600'}`}>
                            {report.reason || 'Other'}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-8 py-5 text-[13px] font-medium text-[#475569]">
                          {report.createdAt ? new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>

                        {/* Status */}
                        <td className="px-8 py-5">{statusBadge(report.status)}</td>

                        {/* Actions */}
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {report.status === 'Pending' && (
                              <>
                                <button
                                  onClick={() => handleStatus(report._id, 'Reviewed')}
                                  disabled={processingId === report._id}
                                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                  title="Mark Reviewed"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleStatus(report._id, 'Dismissed')}
                                  disabled={processingId === report._id}
                                  className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                                  title="Dismiss"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDelete(report._id)}
                              disabled={processingId === report._id}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-4 border-t border-gray-100 text-[12px] text-gray-500 flex justify-between items-center">
                <span>Showing {filtered.length} of {reports.length} reports</span>
                <span className="flex gap-4">
                  <span className="text-amber-600 font-bold">{pending} Pending</span>
                  <span className="text-green-600 font-bold">{reviewed} Reviewed</span>
                  <span className="text-gray-400 font-bold">{dismissed} Dismissed</span>
                </span>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
