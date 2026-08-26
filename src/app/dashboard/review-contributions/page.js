"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CheckCircle2, XCircle, X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ReviewContributionsPage() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  // Modal open flag + retained data. Data is kept during the close animation
  // (not nulled) so the panel doesn't flash empty or crash while fading out.
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null); // { contribution, status }
  // Separate "View Contribution" details modal
  const [viewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

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

  const openConfirm = (contribution, status) => {
    setModalData({ contribution, status });
    setModalOpen(true);
  };

  const closeConfirm = () => {
    if (actionLoading) return; // don't allow closing mid-request
    setModalOpen(false);
  };

  const openView = (contribution) => {
    setViewData(contribution);
    setViewOpen(true);
  };

  const closeView = () => setViewOpen(false);

  const performAction = async () => {
    if (!modalData || actionLoading) return;
    const { contribution, status } = modalData;
    const id = contribution._id;

    setActionLoading(id);
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.patch(`${API}/api/contributions/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContributions((prev) => prev.filter((c) => c._id !== id));
      toast.success(status === 'Completed' ? 'Contribution approved.' : 'Contribution rejected.');
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error(error.response?.data?.message || 'Failed to update contribution.');
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

  const isApprove = modalData?.status === 'Completed';
  const modalBusy = !!modalData && actionLoading === modalData.contribution._id;

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
                  <th className="p-4 pl-6 font-bold">Supporter</th>
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
                      <td className="p-4 text-[14px]">
                        <div className="font-medium text-gray-900">{c.supporterName || c.supporterEmail}</div>
                        {c.supporterName && <div className="text-[12px] text-gray-400">{c.supporterEmail}</div>}
                      </td>
                      <td className="p-4 text-[14px] font-medium text-gray-600 truncate max-w-[200px]">{c.campaignTitle || 'Unknown Campaign'}</td>
                      <td className="p-4 text-[14px] font-bold text-[#12643E]">{c.amount} credits</td>
                      <td className="p-4 text-[13px] text-gray-500">{new Date(c.date).toLocaleDateString()}</td>
                      <td className="p-4 pr-6 flex justify-end items-center space-x-2">
                        {actionLoading === c._id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                        ) : (
                          <>
                            <button
                              onClick={() => openView(c)}
                              className="bg-gray-50 text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-md font-bold text-xs flex items-center transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5 mr-1" /> View
                            </button>
                            <button
                              onClick={() => openConfirm(c, 'Completed')}
                              className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-1.5 rounded-md font-bold text-xs flex items-center transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => openConfirm(c, 'Rejected')}
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

      {/* Approve / Reject confirmation modal — Headless UI (same pattern as the report modal) */}
      <Dialog open={modalOpen} onClose={closeConfirm} className="relative z-[9999999]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[95vw] sm:w-[448px] transform overflow-hidden rounded-2xl bg-white text-gray-900 text-left align-middle shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:scale-95"
            >
              <button
                type="button"
                onClick={closeConfirm}
                disabled={modalBusy}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-40"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isApprove ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {isApprove ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-xl font-bold text-gray-900">
                      {isApprove ? 'Approve this contribution?' : 'Reject this contribution?'}
                    </DialogTitle>
                    <p className="text-xs text-gray-500 mt-0.5">This action can&apos;t be undone.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  {isApprove ? (
                    <>
                      This adds <span className="font-semibold text-gray-800">{modalData?.contribution.amount} credits</span> to
                      {' '}&ldquo;{modalData?.contribution.campaignTitle || 'this campaign'}&rdquo; and credits your account.
                    </>
                  ) : (
                    <>
                      This refunds <span className="font-semibold text-gray-800">{modalData?.contribution.amount} credits</span> back to
                      {' '}{modalData?.contribution.supporterEmail}.
                    </>
                  )}
                </p>

                {/* Details */}
                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm space-y-2.5">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Supporter</span>
                    <span className="font-medium text-gray-800 truncate">{modalData?.contribution.supporterName || modalData?.contribution.supporterEmail}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Campaign</span>
                    <span className="font-medium text-gray-800 truncate">{modalData?.contribution.campaignTitle || 'Unknown Campaign'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-[#12643E]">{modalData?.contribution.amount} credits</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeConfirm}
                    disabled={modalBusy}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={performAction}
                    disabled={modalBusy}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                      isApprove ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {modalBusy && <Loader2 className="w-4 h-4 animate-spin" />}
                    {modalBusy ? 'Processing…' : isApprove ? 'Approve' : 'Reject'}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* View Contribution details modal */}
      <Dialog open={viewOpen} onClose={closeView} className="relative z-[9999999]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-[95vw] sm:w-[448px] transform overflow-hidden rounded-2xl bg-white text-gray-900 text-left align-middle shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:scale-95"
            >
              <button
                type="button"
                onClick={closeView}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#e6f7f2] text-[#12643E]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-xl font-bold text-gray-900">Contribution Details</DialogTitle>
                    <p className="text-xs text-gray-500 mt-0.5">Pending your review</p>
                  </div>
                </div>

                <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm space-y-2.5">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Supporter</span>
                    <span className="font-medium text-gray-800 truncate">{viewData?.supporterName || viewData?.supporterEmail}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium text-gray-800 truncate">{viewData?.supporterEmail}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Campaign</span>
                    <span className="font-medium text-gray-800 truncate">{viewData?.campaignTitle || 'Unknown Campaign'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-[#12643E]">{viewData?.amount} credits</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-800">{viewData?.date ? new Date(viewData.date).toLocaleString() : '—'}</span>
                  </div>
                  {viewData?.receiptNumber && (
                    <div className="flex justify-between gap-4">
                      <span className="text-gray-500">Receipt</span>
                      <span className="font-medium text-gray-800">{viewData.receiptNumber}</span>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">Status</span>
                    <span className="font-semibold text-amber-600">{viewData?.status}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeView}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => { const c = viewData; closeView(); openConfirm(c, 'Completed'); }}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
