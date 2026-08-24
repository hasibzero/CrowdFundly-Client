"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Rocket, DollarSign, Image as ImageIcon, AlignLeft, Info } from 'lucide-react';

export default function CreateCampaignPage() {
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      className="w-full max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
          Launch a Campaign
        </h1>
        <p className="text-[15px] text-gray-600 max-w-2xl">
          Bring your creative project to life. Fill out the details below to start raising funds from the community.
        </p>
      </motion.div>

      <motion.form variants={itemVariants} className="space-y-8">
        {/* Basic Info Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/60">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-4">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">Basic Details</h2>
              <p className="text-[13px] text-gray-500">The core information about your project.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-[#0f172a] mb-1.5">Campaign Title</label>
              <input 
                type="text" 
                placeholder="e.g. EcoSmart Hub: Intelligent Energy" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 placeholder-gray-400 transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[13px] font-bold text-[#0f172a] mb-1.5">Category</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 transition-all bg-white">
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="art">Art & Design</option>
                  <option value="community">Community</option>
                  <option value="health">Health & Wellness</option>
                  <option value="games">Games</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0f172a] mb-1.5">Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. San Francisco, CA" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 placeholder-gray-400 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/60">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-4">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">Campaign Media</h2>
              <p className="text-[13px] text-gray-500">Upload a high-quality cover image to attract backers.</p>
            </div>
          </div>

          <div className="mt-2 border-2 border-dashed border-gray-200 rounded-xl px-6 pt-10 pb-12 flex flex-col items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer group">
            <div className="w-14 h-14 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#0f766e] group-hover:text-white transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#0f172a] mb-1">Click to upload or drag and drop</p>
            <p className="text-[12px] text-gray-500">PNG, JPG or GIF (max. 5MB)</p>
          </div>
        </div>

        {/* Funding Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/60">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0f766e] flex items-center justify-center mr-4">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">Funding Goal</h2>
              <p className="text-[13px] text-gray-500">Set your target amount and campaign duration.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-[#0f172a] mb-1.5">Target Amount (Credits)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">CR</span>
                <input 
                  type="number" 
                  placeholder="10000" 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 placeholder-gray-400 transition-all font-semibold"
                />
              </div>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0f172a] mb-1.5">Duration (Days)</label>
              <input 
                type="number" 
                placeholder="30" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 placeholder-gray-400 transition-all font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Story Card */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/60">
          <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mr-4">
              <AlignLeft className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a]">Project Story</h2>
              <p className="text-[13px] text-gray-500">Tell potential backers why they should support your project.</p>
            </div>
          </div>

          <div>
            <textarea 
              rows="6"
              placeholder="Describe what you're raising funds to do, why you care about it, how you plan to make it happen, and who you are..."
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20 text-[14px] text-gray-900 placeholder-gray-400 transition-all resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 flex justify-end">
          <button 
            type="button"
            className="bg-[#0f766e] hover:bg-[#0d655e] text-white px-8 py-3.5 rounded-xl font-bold text-[15px] flex items-center transition-colors shadow-md shadow-teal-900/10"
          >
            Launch Campaign
            <Rocket className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.form>
    </motion.section>
  );
}
