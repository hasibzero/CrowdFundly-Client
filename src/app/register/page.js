"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Supporter');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    // Key will be loaded from .env.local
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey || apiKey === 'your_imgbb_api_key_here') {
      throw new Error("ImgBB API Key is missing or invalid in .env.local");
    }

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return data.data.url;
    } else {
      throw new Error(data.error.message || "Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Creating your account...");
    
    try {
      let finalPhotoURL = '';
      if (imageFile) {
        toast.loading("Uploading profile picture...", { id: toastId });
        finalPhotoURL = await uploadToImgBB(imageFile);
      }

      const userData = {
        name,
        email,
        password,
        role,
        photoURL: finalPhotoURL,
        credits: role === 'Supporter' ? 50 : 20, // Initial credits
      };

      toast.loading("Registering...", { id: toastId });
      const success = await register(userData);
      
      if (success) {
        toast.success("Successfully registered!", { id: toastId });
      } else {
        toast.error("Registration failed. Email might already exist.", { id: toastId });
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during registration.", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-surface">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-10 text-center text-headline-lg font-bold leading-9 tracking-tight text-on-surface">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-on-surface-variant">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary-container">
            Sign in here
          </Link>
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-surface-container-lowest py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-outline-variant">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-on-surface">
                Full Name *
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  disabled={isUploading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant placeholder:text-outline focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-container-lowest disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-on-surface">
                Email address *
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isUploading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant placeholder:text-outline focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-container-lowest disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-on-surface">
                Password *
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  disabled={isUploading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant placeholder:text-outline focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-container-lowest disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-on-surface">
                Profile Picture (Optional)
              </label>
              <div className="mt-2">
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  disabled={isUploading}
                  onChange={handleImageChange}
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-container-lowest file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container disabled:opacity-50 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium leading-6 text-on-surface">
                I want to join as a *
              </label>
              <div className="mt-2">
                <select
                  id="role"
                  name="role"
                  required
                  disabled={isUploading}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-0 py-2 px-3 text-on-surface shadow-sm ring-1 ring-inset ring-outline-variant focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-surface-container-lowest disabled:opacity-50"
                >
                  <option value="Supporter">Supporter (Support projects)</option>
                  <option value="Creator">Creator (Launch projects)</option>
                </select>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant">
                {role === 'Supporter' ? "You'll receive 50 initial credits!" : "You'll receive 20 initial credits!"}
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isUploading}
                className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary shadow-sm hover:bg-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
