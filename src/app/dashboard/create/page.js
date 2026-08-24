"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <motion.section 
      className="w-full max-w-3xl mx-auto flex flex-col items-center pt-4 pb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-10">
        <h1 className="text-[28px] md:text-[32px] font-bold text-[#0f172a] mb-2 tracking-tight">
          Create a New Campaign
        </h1>
        <p className="text-[14px] text-gray-500">
          Turn your idea into reality. Follow the steps below to launch your project.
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div variants={itemVariants} className="w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        
        {/* Stepper Header */}
        <div className="pt-8 px-8 pb-4">
          <div className="flex justify-between items-center relative">
            {/* Background Line */}
            <div className="absolute left-0 top-1/3 transform -translate-y-1/2 w-full h-[2px] bg-[#eef2f6] -z-10"></div>
            
            {/* Active Progress Line */}
            <div 
              className="absolute left-0 top-1/3 transform -translate-y-1/2 h-[3px] bg-[#12643E] transition-all duration-300 ease-in-out -z-10"
              style={{ width: step === 1 ? '16%' : step === 2 ? '50%' : '100%' }}
            ></div>

            {/* Steps */}
            {[
              { num: 1, label: 'Basics' },
              { num: 2, label: 'Funding' },
              { num: 3, label: 'Media' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center bg-white px-4">
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold transition-colors mb-2 shadow-sm ${
                    step >= s.num 
                      ? 'bg-[#12643E] text-white' 
                      : 'bg-[#eef2f6] text-gray-400'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[13px] font-bold ${step >= s.num ? 'text-[#12643E]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content Area */}
        <div className="p-8 min-h-[360px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={1}>
            {step === 1 && (
              <motion.div
                key="step1"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Campaign Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g., The Next Generation Smart Watch" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-500 bg-white appearance-none">
                    <option value="">Select a category</option>
                    <option value="technology">Technology</option>
                    <option value="art">Art & Design</option>
                    <option value="community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Campaign Story</label>
                  <textarea 
                    rows="4"
                    placeholder="Tell your backers why they should support this project..."
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Target Amount (Credits)</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 50000" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Campaign Duration (Days)</label>
                  <input 
                    type="number" 
                    placeholder="e.g., 30" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Campaign Cover Image</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-[14px] text-gray-600 mb-1">Drag and drop an image, or <span className="text-[#3b2de6] font-bold">browse</span></p>
                    <p className="text-[12px] text-gray-400">High resolution JPG or PNG</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-between items-center bg-[#fcfcfd]">
          <div className="flex space-x-4">
            {step > 1 && (
              <button 
                onClick={prevStep}
                className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="text-[13px] font-bold text-[#3b2de6] hover:text-indigo-800 transition-colors">
              Save Draft
            </button>
            <button 
              onClick={step < 3 ? nextStep : () => {}}
              className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-6 py-2 rounded-md font-bold text-[13px] transition-colors shadow-sm"
            >
              {step < 3 ? 'Continue' : 'Submit Campaign'}
            </button>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
