"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API_URL } from '@/lib/api';
import { uploadImageToImgBB } from '@/lib/uploadImage';

export default function CreateCampaignPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subCategory: '',
    location: '',
    shortDescription: '',
    story: '',
    targetAmount: '',
    duration: '',
    coverImage: '',
    teamName: '',
    teamRole: '',
    rewardTitle: '',
    rewardAmount: '',
    rewardDescription: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Uploading cover image...');
    
    try {
      const url = await uploadImageToImgBB(file);
      setFormData(prev => ({ ...prev, coverImage: url }));
      toast.success('Image uploaded successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message || 'Failed to upload image', { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmitCampaign = async () => {
    if (!formData.title || !formData.category || !formData.targetAmount || !formData.duration) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Submitting campaign...');

    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.post(`${API_URL}/api/campaigns`, {
        ...formData,
        targetAmount: Number(formData.targetAmount),
        duration: Number(formData.duration),
        creatorEmail: user?.email,
        creatorName: user?.name,
        creatorAvatar: user?.photoURL,
        team: formData.teamName ? [{ name: formData.teamName, role: formData.teamRole, initials: formData.teamName.substring(0, 2).toUpperCase() }] : [],
        rewards: formData.rewardTitle ? [
          {
            title: formData.rewardTitle,
            amount: Number(formData.rewardAmount) || 25,
            description: formData.rewardDescription,
            items: [],
            estimatedDelivery: "TBD",
            backers: 0,
            popular: true
          }
        ] : []
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Campaign created successfully! Awaiting Admin approval.', { id: toastId });
      router.push('/dashboard/my-campaigns');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create campaign.', { id: toastId });
      setIsSubmitting(false);
    }
  };

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

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
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
              { num: 2, label: 'Details' },
              { num: 3, label: 'Funding' },
              { num: 4, label: 'Media' }
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
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., The Next Generation Smart Watch" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-gray-700 mb-1.5">Category</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-500 bg-white appearance-none"
                    >
                      <option value="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Environment">Environment</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[13px] text-gray-700 mb-1.5">Sub-Category (Optional)</label>
                    <input 
                      type="text" 
                      name="subCategory"
                      value={formData.subCategory}
                      onChange={handleChange}
                      placeholder="e.g., Solar, AI, Hardware" 
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Seattle, WA" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
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
                  <label className="block text-[13px] text-gray-700 mb-1.5">Short Description (Subtitle)</label>
                  <input 
                    type="text" 
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Bring the future of sustainable agriculture into your home..." 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">The Vision (Full Story)</label>
                  <textarea 
                    name="story"
                    value={formData.story}
                    onChange={handleChange}
                    rows="4"
                    placeholder="We believe that everyone deserves access to fresh produce..."
                    className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400 resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] text-gray-700 mb-1.5">Core Team Member Name</label>
                    <input 
                      type="text" 
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleChange}
                      placeholder="e.g., Sarah Jenkins" 
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-gray-700 mb-1.5">Team Member Role</label>
                    <input 
                      type="text" 
                      name="teamRole"
                      value={formData.teamRole}
                      onChange={handleChange}
                      placeholder="e.g., CEO & Lead Engineer" 
                      className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                    />
                  </div>
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
                  <label className="block text-[13px] text-gray-700 mb-1.5">Target Amount (USD)</label>
                  <input 
                    type="number" 
                    name="targetAmount"
                    value={formData.targetAmount || ''}
                    onChange={handleChange}
                    placeholder="e.g., 50000" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-[13px] text-gray-700 mb-1.5">Campaign Duration (Days)</label>
                  <input 
                    type="number" 
                    name="duration"
                    value={formData.duration || ''}
                    onChange={handleChange}
                    placeholder="e.g., 30" 
                    className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-[14px] font-bold text-gray-900 mb-4">Add a Support Tier (Optional)</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[13px] text-gray-700 mb-1.5">Tier Title</label>
                      <input 
                        type="text" 
                        name="rewardTitle"
                        value={formData.rewardTitle}
                        onChange={handleChange}
                        placeholder="e.g., Early Bird Access" 
                        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] text-gray-700 mb-1.5">Tier Minimum Amount (USD)</label>
                      <input 
                        type="number" 
                        name="rewardAmount"
                        value={formData.rewardAmount}
                        onChange={handleChange}
                        placeholder="e.g., 50" 
                        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-gray-700 mb-1.5">Tier Description</label>
                    <textarea 
                      name="rewardDescription"
                      value={formData.rewardDescription}
                      onChange={handleChange}
                      rows="2"
                      placeholder="What backers get for this tier..."
                      className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
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
                  <input 
                    type="file" 
                    accept="image/*"
                    disabled={isUploading}
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#0f766e] focus:ring-1 focus:ring-[#0f766e] text-[14px] text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[13px] file:font-semibold file:bg-[#eef2f6] file:text-gray-700 hover:file:bg-gray-200 cursor-pointer"
                  />
                  {formData.coverImage && (
                    <div className="mt-4 border rounded-md p-2 relative h-32 w-full overflow-hidden">
                      <img src={formData.coverImage} alt="Cover Preview" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                  )}
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
              onClick={step < 4 ? nextStep : handleSubmitCampaign}
              disabled={isSubmitting || isUploading}
              className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-6 py-2 rounded-md font-bold text-[13px] transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : (step < 4 ? 'Continue' : 'Submit Campaign')}
            </button>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
}
