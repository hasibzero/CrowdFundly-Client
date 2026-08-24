"use client";
import { motion } from 'framer-motion';
import { HeartHandshake, CheckCircle2, Clock, ArrowRight, Wallet, Calendar } from 'lucide-react';
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
      campaignTitle: "Eco-Friendly Urban Farm Pods",
      creator: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=300",
      amountContributed: "2,500",
      date: "Oct 12, 2026",
      status: "Success",
      rewardTier: "Early Bird Beta Tester",
      campaignStatus: "Fully Funded"
    },
    {
      id: 2,
      campaignTitle: "Aero V1 Electric Commuter",
      creator: "Marcus Chen",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=300",
      amountContributed: "5,000",
      date: "Sep 28, 2026",
      status: "Processing",
      rewardTier: "Founders Edition E-Bike",
      campaignStatus: "Active"
    },
    {
      id: 3,
      campaignTitle: "Oasis VR Educational Platform",
      creator: "EduTech Dynamics",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=300",
      amountContributed: "1,000",
      date: "Aug 05, 2026",
      status: "Success",
      rewardTier: "Lifetime Premium Access",
      campaignStatus: "Fully Funded"
    }
  ];

  return (
    <motion.section 
      className="w-full max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
            My Contributions
          </h1>
          <p className="text-[15px] text-gray-600 max-w-2xl">
            Track your impact, review your active pledges, and manage your rewards all in one place.
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-[#0f766e] mr-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Total Backed</p>
              <p className="text-lg font-bold text-[#0f172a]">8,500 <span className="text-sm font-medium text-gray-500">Credits</span></p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contributions List */}
      <motion.div variants={itemVariants} className="space-y-6">
        {contributions.map((contribution) => (
          <div 
            key={contribution.id} 
            className="bg-white rounded-2xl p-5 md:p-6 border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow group flex flex-col md:flex-row gap-6"
          >
            {/* Project Image */}
            <div className="w-full md:w-48 h-32 flex-shrink-0 overflow-hidden rounded-xl relative">
              <img 
                src={contribution.image} 
                alt={contribution.campaignTitle} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-bold tracking-wide">
                {contribution.campaignStatus}
              </div>
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-[#0f172a] leading-tight">
                    {contribution.campaignTitle}
                  </h3>
                  {contribution.status === 'Success' ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#d1fae5] text-[#059669] border border-[#a7f3d0]">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#fef3c7] text-[#d97706] border border-[#fde68a]">
                      <Clock className="w-3 h-3 mr-1" />
                      Processing
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-gray-500 mb-4">by {contribution.creator}</p>
                
                {/* Reward Info */}
                <div className="bg-[#f8f9fc] rounded-lg p-3 inline-block">
                  <p className="text-[11px] font-bold text-gray-500 uppercase mb-0.5 tracking-wider">Selected Reward</p>
                  <p className="text-sm font-semibold text-[#0f766e]">{contribution.rewardTier}</p>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="w-full md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Wallet className="w-3 h-3 mr-1.5" /> Amount
                </p>
                <p className="text-2xl font-bold text-[#0f172a] tracking-tight">{contribution.amountContributed} <span className="text-sm font-medium text-gray-500">CR</span></p>
              </div>

              <div className="mt-4 md:mt-0">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Calendar className="w-3 h-3 mr-1.5" /> Pledged On
                </p>
                <p className="text-sm font-bold text-gray-900">{contribution.date}</p>
              </div>
              
              <Link 
                href={`/campaigns/${contribution.id}`}
                className="mt-4 w-full flex items-center justify-center text-[13px] font-bold text-[#3b2de6] bg-indigo-50 hover:bg-indigo-100 py-2 rounded-lg transition-colors"
              >
                View Campaign <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
