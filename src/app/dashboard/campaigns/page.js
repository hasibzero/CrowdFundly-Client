"use client";
import { motion } from 'framer-motion';
import { Search, Bell, ChevronDown, CheckCircle2, ArrowRight, Hourglass } from 'lucide-react';
import Link from 'next/link';

export default function ExploreCampaignsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const categories = ["All Projects", "Technology", "Art & Design", "Community", "Health & Wellness", "Games"];

  const campaigns = [
    {
      id: 1,
      tag: "Technology",
      verified: true,
      creator: "Elena Rostova",
      image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600",
      title: "EcoSmart Hub: Intelligent Energy...",
      description: "A beautiful, AI-powered hub that optimizes your home energy...",
      amount: "$42,500",
      raisedGoal: "raised of $50k",
      fundedPercent: "85%",
      daysLeft: "12 Days Left",
      progressWidth: "85%"
    },
    {
      id: 2,
      tag: "Community",
      verified: false,
      creator: "UrbanGreen Initiative",
      image: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?auto=format&fit=crop&q=80&w=600",
      title: "Rooftop Oasis: Transforming City...",
      description: "Help us build a network of rooftop community gardens to...",
      amount: "$18,200",
      raisedGoal: "raised of $15k",
      fundedPercent: "121%",
      daysLeft: "5 Days Left",
      progressWidth: "100%"
    },
    {
      id: 3,
      tag: "Art & Design",
      verified: true,
      creator: "Studio Klay",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
      title: "The GeoMug Collection: ...",
      description: "A limited run of handcrafted, ergonomically designed ceram...",
      amount: "$3,450",
      raisedGoal: "raised of $10k",
      fundedPercent: "34%",
      daysLeft: "28 Days Left",
      progressWidth: "34%"
    }
  ];

  return (
    <motion.section 
      className="w-full max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top Bar (Mock Header inside Page) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div className="flex-1 w-full md:max-w-xl relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-transparent text-sm placeholder-gray-400 text-gray-900 shadow-sm"
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="bg-[#a7f3d0] text-[#047857] px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center">
            1,250 Credits
          </div>
          <button className="relative text-gray-600 hover:text-gray-900 transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#f8f9fc]"></span>
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 overflow-hidden bg-white cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-[32px] md:text-4xl font-bold text-[#0f172a] mb-2 tracking-tight">
            Explore Campaigns
          </h1>
          <p className="text-[15px] text-gray-600 max-w-2xl">
            Discover innovative projects and ambitious creators looking for support to launch their next big idea.
          </p>
        </div>
        
        <button className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm min-w-[180px] hover:bg-gray-50 transition-colors">
          <span>Sort by: Trending</span>
          <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
        </button>
      </motion.div>

      {/* Categories Filter */}
      <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 mb-10">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
              idx === 0 
                ? 'bg-[#3b2de6] text-white shadow-md' 
                : 'bg-[#e0e7ff] text-[#3b2de6] hover:bg-[#c7d2fe]'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Campaign Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {campaigns.map((camp) => (
          <div key={camp.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            
            {/* Image Container */}
            <div className="relative h-[220px] w-full overflow-hidden">
              <img src={camp.image} alt={camp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              
              {/* Days Left Badge */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm flex items-center text-[#d97706] text-xs font-bold">
                <Hourglass className="w-3.5 h-3.5 mr-1.5" />
                {camp.daysLeft}
              </div>

              {/* Tag Badge */}
              <div className="absolute bottom-4 left-4 bg-indigo-50/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                <span className="text-[#3b2de6] text-xs font-bold">{camp.tag}</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 flex flex-col flex-1">
              
              {/* Creator Info */}
              <div className="flex items-center text-xs text-gray-500 mb-3">
                {camp.verified ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                ) : (
                  <div className="w-3.5 h-3.5 mr-1.5 flex items-center justify-center text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                )}
                <span className="font-medium">by {camp.creator}</span>
              </div>

              {/* Title & Description */}
              <h3 className="text-[20px] font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                {camp.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-2 flex-1">
                {camp.description}
              </p>

              {/* Funding Stats */}
              <div className="mt-auto">
                <div className="flex items-baseline mb-2">
                  <span className="text-[22px] font-bold text-[#059669] tracking-tight">{camp.amount}</span>
                  <span className="text-xs text-gray-400 font-medium ml-2">{camp.raisedGoal}</span>
                  <span className="text-[13px] font-bold text-gray-900 ml-auto">{camp.fundedPercent}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-[#d1fae5] rounded-full overflow-hidden mb-6">
                  <div className="h-full bg-[#059669] rounded-full" style={{ width: camp.progressWidth }}></div>
                </div>

                {/* Action Button */}
                <Link 
                  href={`/campaigns/${camp.id}`}
                  className="w-full py-3 px-4 border border-[#3b2de6] text-[#3b2de6] hover:bg-indigo-50 rounded-lg flex items-center justify-center text-sm font-bold transition-colors group-hover:bg-[#3b2de6] group-hover:text-white"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}
