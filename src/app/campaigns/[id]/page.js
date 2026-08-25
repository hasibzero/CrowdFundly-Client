"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { MapPin, Lock, Rocket, Flag, X } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { API_URL, authHeaders } from '@/lib/api';
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pledgeAmount, setPledgeAmount] = useState(249);
  const [isContributing, setIsContributing] = useState(false);
  
  // Reporting state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Spam');
  const [reportDescription, setReportDescription] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/campaigns/${id}`);
        setCampaign(response.data);
      } catch (error) {
        console.error("Failed to fetch campaign details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCampaign();
    setMounted(true);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#12643E]"></div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <div className="text-gray-500 font-medium">Campaign not found.</div>
        </div>
      </div>
    );
  }

  const data = campaign;

  const truePercent = Math.round((data.raised / data.targetAmount) * 100) || 0;
  const progressWidth = Math.min(truePercent, 100);
  
  const start = new Date(data.createdAt || 0);
  const end = new Date(start.getTime() + (data.duration || 30) * 24 * 60 * 60 * 1000);
  const diff = end - new Date();
  const daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);

  const formatCurrency = (val) => `$${(val || 0).toLocaleString()}`;

  const handleContribute = async () => {
    const amount = Number(pledgeAmount);
    if (!user) return router.push('/login');
    if (user.role !== 'Supporter') return toast.error('Only supporter accounts can contribute to campaigns.');
    if (!Number.isInteger(amount) || amount < 1) return toast.error('Enter a whole number in USD.');
    setIsContributing(true);
    try {
      await axios.post(`${API_URL}/api/contributions`, { campaignId: data._id, amount }, { headers: authHeaders() });
      setCampaign((current) => ({ ...current, raised: (current.raised || 0) + amount, backers: (current.backers || 0) + 1 }));
      toast.success('Your contribution was recorded. Thank you!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to complete your contribution.');
    } finally {
      setIsContributing(false);
    }
  };

  const handleReport = async (e) => {
    e.preventDefault();
    if (!user) return router.push('/login');
    if (!reportDescription.trim()) return toast.error('Please provide a description.');
    
    setIsReporting(true);
    try {
      await axios.post(`${API_URL}/api/reports`, 
        { 
          campaignId: data._id, 
          campaignTitle: data.title, 
          reason: reportReason, 
          description: reportDescription 
        }, 
        { headers: authHeaders() }
      );
      toast.success('Report submitted successfully.');
      setIsReportModalOpen(false);
      setReportDescription('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report.');
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column (Main Content) */}
          <div className="flex-1 max-w-[720px]">
            {/* Hero Image */}
            <div className="w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden mb-6 bg-gray-100 shadow-sm">
              <img 
                src={data.coverImage} 
                alt={data.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-[#e0e7ff] text-[#4f46e5]">
                {data.category || 'Technology'}
              </span>
              <div className="flex items-center text-gray-500">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                <span className="text-[12px] font-medium">{data.location || 'Global'}</span>
              </div>
            </div>

            {/* Title & Short Description */}
            <h1 className="text-[32px] sm:text-[38px] font-extrabold text-[#0f172a] mb-3 leading-[1.15] tracking-tight">
              {data.title}
            </h1>
            <p className="text-[16px] text-gray-600 mb-12 leading-relaxed font-medium">
              {data.shortDescription || data.story}
            </p>

            <hr className="border-gray-100 mb-10" />

            {/* The Vision (Story) */}
            <div className="mb-14">
              <h2 className="text-[24px] font-bold text-[#0f172a] mb-6 tracking-tight">The Vision</h2>
              <div className="text-[15px] text-gray-700 leading-[1.8] space-y-6">
                {(data.story || '').split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* Meet the Team */}
            <div className="mb-10">
              <h2 className="text-[24px] font-bold text-[#0f172a] mb-6 tracking-tight">Meet the Team</h2>
              <div className="flex flex-wrap gap-8">
                {(data.team || []).map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#e0e7ff] text-[#4f46e5] flex items-center justify-center text-[16px] font-bold">
                      {member.initials || member.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-[#0f172a] mb-0.5">{member.name}</h4>
                      <p className="text-[13px] text-gray-500 font-medium">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Right Column (Sidebar) */}
          <aside className="w-full lg:w-[380px] flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Main Pledge Card */}
              <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <h2 className="text-[32px] font-extrabold text-[#059669] tracking-tight">{formatCurrency(data.raised)}</h2>
                    <span className="text-[13px] text-gray-500 font-medium">raised of {formatCurrency(data.targetAmount)} goal</span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-6">
                    <div 
                      className="h-full rounded-full bg-[#059669] transition-all duration-1000 ease-out"
                      style={{ width: `${progressWidth}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center text-center">
                    <div>
                      <div className="text-[20px] font-bold text-[#0f172a] leading-none mb-1">{(data.backers || 0).toLocaleString()}</div>
                      <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Backers</div>
                    </div>
                    <div>
                      <div className="text-[20px] font-bold text-[#0f172a] leading-none mb-1">{daysLeft}</div>
                      <div className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Days Left</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[12px] font-bold text-gray-700 mb-2">Contribution Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <input 
                      type="number"
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      min="1"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#12643E] focus:ring-1 focus:ring-[#12643E] text-[15px] font-medium text-gray-900"
                    />
                  </div>
                </div>

                <button onClick={handleContribute} disabled={isContributing} className="w-full bg-[#12c48b] hover:bg-[#10a877] disabled:cursor-not-allowed disabled:opacity-60 text-white py-3.5 rounded-lg text-[15px] font-bold transition-colors shadow-sm mb-2">
                  {isContributing ? 'Recording contribution…' : 'Contribute now'}
                </button>
                <Link href="/dashboard/credits" className="mb-4 block text-center text-xs font-semibold text-[#12643E] hover:underline">Need to add funds? Add USD securely.</Link>

                <div className="flex items-center justify-center text-gray-400 mb-6">
                  <Lock className="w-3 h-3 mr-1.5" />
                  <span className="text-[11px] font-medium">Secure transaction</span>
                </div>

                {/* Report Campaign Button */}
                <div className="border-t border-gray-100 pt-4 flex justify-center">
                  <button 
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center text-gray-400 hover:text-red-500 transition-colors text-[12px] font-medium"
                  >
                    <Flag className="w-3.5 h-3.5 mr-1.5" />
                    Report this campaign
                  </button>
                </div>
              </div>

              {/* Support Tiers */}
              <div>
                <h3 className="text-[18px] font-bold text-[#0f172a] mb-4">Support this project</h3>
                <div className="space-y-4">
                  {(data.rewards || []).map((tier, idx) => (
                    <div 
                      key={idx} 
                      className={`relative bg-white rounded-xl shadow-sm border ${tier.popular ? 'border-[#12c48b] shadow-[0_4px_15px_rgba(18,196,139,0.1)]' : 'border-gray-100'} p-6 transition-transform hover:-translate-y-1 duration-200 cursor-pointer`}
                      onClick={() => setPledgeAmount(tier.amount)}
                    >
                      {tier.popular && (
                        <div className="absolute top-0 right-0 bg-[#12c48b] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg rounded-tr-xl">
                          Popular
                        </div>
                      )}
                      
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-[15px] font-bold text-[#0f172a]">{tier.title}</h4>
                        <span className="text-[18px] font-extrabold text-[#059669]">${tier.amount}</span>
                      </div>
                      
                      <p className="text-[13px] text-gray-600 mb-4 leading-relaxed">
                        {tier.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {tier.items.map((item, i) => (
                          <li key={i} className="flex items-start text-[12px] text-gray-600">
                            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 mr-2 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="flex justify-between items-end border-t border-gray-50 pt-4">
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Est. Delivery</div>
                          <div className="text-[12px] font-bold text-[#0f172a]">{tier.estimatedDelivery}</div>
                        </div>
                        <div className="bg-[#e0e7ff] text-[#4f46e5] text-[10px] font-bold px-2 py-1 rounded-md">
                          {tier.backers} Backers
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* Report Modal - Headless UI */}
      <Dialog open={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} className="relative z-[9999999]">
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
                onClick={() => setIsReportModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-xl font-bold text-gray-900">
                      Report Campaign
                    </DialogTitle>
                    <p className="text-xs text-gray-500 mt-0.5">Please provide details about your concern.</p>
                  </div>
                </div>

                <form id="report-form" onSubmit={handleReport} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Reason</label>
                    <select 
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm"
                    >
                      <option value="Spam">Spam or Misleading</option>
                      <option value="Fraud">Suspected Fraud</option>
                      <option value="Inappropriate">Inappropriate Content</option>
                      <option value="Intellectual Property">Intellectual Property Violation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      rows="4"
                      placeholder="Provide additional details..."
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm resize-none"
                      required
                    ></textarea>
                  </div>
                </form>

                <div className="flex justify-end gap-3 mt-8 pt-2 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    form="report-form"
                    disabled={isReporting}
                    className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-60 flex items-center"
                  >
                    {isReporting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {/* Footer */}
      <footer className="bg-[#f1f3f9] pt-16 pb-8 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-6 h-6 text-[#12643E]" />
                <span className="text-xl font-extrabold text-[#12643E] tracking-tight">
                  Crowdfundly
                </span>
              </div>
              <p className="text-[13px] text-gray-500 max-w-xs mt-4">
                Empowering creators to bring their visions to life through community support.
              </p>
              <p className="text-[13px] text-gray-500 max-w-xs mt-8">
                © 2024 Crowdfundly. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4">Categories</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Technology</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Art</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Film</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Games</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Design</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-3 text-[13px] font-medium text-gray-600">
                <li><Link href="#" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
