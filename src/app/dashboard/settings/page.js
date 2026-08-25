"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { Save, User, Mail, Camera, Loader2, ShieldCheck, BadgeCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { authClient } from '@/lib/auth-client';
import { uploadImageToImgBB } from '@/lib/uploadImage';

export default function SettingsPage() {
  const { user, login } = useAuth(); // using login to update user state if needed
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    photoURL: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        photoURL: user.photoURL || user.image || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const toastId = toast.loading('Uploading image...');
    
    try {
      const url = await uploadImageToImgBB(file);
      setFormData(prev => ({ ...prev, photoURL: url }));
      toast.success('Image uploaded successfully!', { id: toastId });
    } catch (error) {
      toast.error(error.message || 'Failed to upload image', { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    setLoading(true);
    try {
      // Use Better Auth client to update user profile directly
      const { data, error } = await authClient.updateUser({
        name: formData.name,
        image: formData.photoURL
      });
      
      if (error) {
        toast.error(error.message || 'Failed to update profile');
        setLoading(false);
        return;
      }

      toast.success('Profile updated successfully!');
      
      // Update local storage so context picks it up on reload (if AuthContext relies on it)
      const storedUser = localStorage.getItem('crowdfundly_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.name = formData.name;
          parsedUser.photoURL = formData.photoURL;
          parsedUser.image = formData.photoURL;
          localStorage.setItem('crowdfundly_user', JSON.stringify(parsedUser));
        } catch (err) {}
      }
      
      window.location.reload();
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (!user) return null;

  return (
    <motion.div 
      className="max-w-4xl mx-auto w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2 tracking-tight">Account Settings</h1>
        <p className="text-[15px] text-gray-500">Manage your profile information and account preferences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Sidebar - Profile Summary */}
        <motion.div variants={itemVariants} className="md:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-8">
            <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500 relative"></div>
            <div className="px-6 pb-6 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md absolute -top-12 left-6 overflow-hidden">
                <img 
                  src={formData.photoURL || user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0f766e&color=fff`} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-16">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Mail className="w-4 h-4 mr-1.5" />
                  {user.email}
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    {user.role}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    <BadgeCheck className="w-3.5 h-3.5 mr-1" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Settings Form */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors text-gray-900"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Email address cannot be changed. Contact support if needed.</p>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Profile Photo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Camera className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={uploadingImage}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-colors text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Choose a new profile picture from your device.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
