"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Trash2, BadgeCheck, ChevronDown, Loader2, Search } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';

const API = 'http://localhost:5000';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('crowdfundly_token');
      const res = await axios.get(`${API}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API}/api/admin/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Role updated');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (userId, name) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.delete(`${API}/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  const filtered = users.filter(u => {
    const roleMatch = roleFilter === 'All' || u.role === roleFilter;
    const searchMatch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    return roleMatch && searchMatch;
  });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  const roleBadge = (role) => {
    const s = { Admin: 'bg-purple-100 text-purple-700', Creator: 'bg-indigo-100 text-indigo-700', Supporter: 'bg-emerald-100 text-emerald-700' };
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s[role] || 'bg-gray-100 text-gray-600'}`}>{role}</span>;
  };

  return (
    <div className="w-full flex flex-col -mt-8 -mx-6 md:-mx-8">
      {/* Admin Topbar */}
      <div className="w-full h-16 bg-white border-b border-gray-200 px-8 flex items-center sticky top-0 z-30">
        <div className="flex space-x-8 h-full">
          <Link href="/dashboard/admin" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Stats</Link>
          <Link href="/dashboard/admin/campaigns" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Approvals</Link>
          <Link href="/dashboard/admin/withdrawals" className="h-full flex items-center text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">Finance</Link>
          <Link href="/dashboard/admin/users" className="h-full flex items-center border-b-2 border-[#12643E] text-[13px] font-bold text-[#12643E]">Users</Link>
        </div>
      </div>

      <motion.div className="p-8 max-w-7xl mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-1 tracking-tight">User Directory</h1>
            <p className="text-[14px] text-gray-500">Manage platform members, assign roles, and monitor accounts.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-md text-[13px] focus:outline-none focus:ring-1 focus:ring-[#12643E] shadow-sm w-52"
              />
            </div>
            {/* Role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-md text-[13px] font-medium text-[#0f172a] focus:outline-none focus:ring-1 focus:ring-[#12643E] cursor-pointer shadow-sm"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Creator">Creator</option>
                <option value="Supporter">Supporter</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-md text-[13px] font-medium text-[#0f172a] hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4 text-gray-500" /><span>Filters</span>
            </button>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Users', value: users.length, color: 'text-[#0f172a]' },
            { label: 'Creators', value: users.filter(u => u.role === 'Creator').length, color: 'text-indigo-600' },
            { label: 'Supporters', value: users.filter(u => u.role === 'Supporter').length, color: 'text-emerald-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
              <p className={`text-[26px] font-bold ${s.color}`}>{loading ? '—' : s.value}</p>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20"><Loader2 className="w-8 h-8 text-[#12643E] animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">No users match your filters.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className="bg-[#f8f9fc]">
                    <tr>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest">User</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Email</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Role</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Credits</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest">Joined</th>
                      <th className="px-6 py-4 text-[12px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((u) => (
                      <tr key={u._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                              <img
                                src={u.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || u.email)}&background=e0e7ff&color=4f46e5`}
                                alt={u.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-[14px] font-bold text-[#0f172a]">{u.name || 'Unnamed'}</p>
                              {u.role === 'Admin' && <BadgeCheck className="w-4 h-4 text-[#4f46e5]" fill="#eef2ff" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[14px] text-[#475569]">{u.email}</td>
                        <td className="px-6 py-5">
                          <div className="relative w-32">
                            <select
                              defaultValue={u.role}
                              onChange={(e) => handleRoleChange(u._id, e.target.value)}
                              className="w-full appearance-none pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded text-[13px] font-medium text-[#0f172a] focus:outline-none focus:border-[#12643E] transition-colors cursor-pointer"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Creator">Creator</option>
                              <option value="Supporter">Supporter</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
                          </div>
                        </td>
                        <td className="px-6 py-5 text-[14px] font-bold text-[#0f172a]">
                          {(u.credits || 0).toLocaleString()} <span className="text-[11px] text-gray-400 font-normal">CR</span>
                        </td>
                        <td className="px-6 py-5 text-[13px] text-gray-500">
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => handleDelete(u._id, u.name)}
                            className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 text-[12px] text-gray-500">
                Showing {filtered.length} of {users.length} users
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
