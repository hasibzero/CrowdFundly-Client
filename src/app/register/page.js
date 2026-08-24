"use client";
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Mail, Lock, EyeOff, Link as LinkIcon } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Supporter');
  const [photoURL, setPhotoURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Creating your account...");
    
    try {
      const userData = {
        name,
        email,
        password,
        role,
        photoURL,
        credits: role === 'Supporter' ? 50 : 20,
      };

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
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex flex-1 pt-16">
        <div className="flex w-full max-w-7xl mx-auto my-8 md:my-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden mx-4">
          
          {/* Left Form Section */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Join Crowdfundly
            </h2>
            <p className="text-slate-600 text-sm mb-8 leading-relaxed pr-4">
              Start your journey. <span className="text-[#065f46] font-medium">Get 50 credits as a Supporter or 20 as a Creator upon registration.</span>
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isUploading}
                    value={name}
                    placeholder="Jane Doe"
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={isUploading}
                    value={email}
                    placeholder="jane@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="photoURL" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Profile Picture URL (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    disabled={isUploading}
                    value={photoURL}
                    placeholder="https://example.com/avatar.jpg"
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  I want to join as a:
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  disabled={isUploading}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                >
                  <option value="Supporter">Supporter (Back projects, earn rewards)</option>
                  <option value="Creator">Creator (Launch projects)</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={isUploading}
                    value={password}
                    placeholder="Create a secure password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex gap-1 w-full max-w-[200px]">
                    <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                    <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                    <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                    <div className="h-1 flex-1 bg-slate-200 rounded-full" />
                  </div>
                  <span>Min 8 chars</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full flex justify-center items-center bg-[#065f46] hover:bg-[#044e39] text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors mt-4 shadow-sm disabled:opacity-70"
              >
                {isUploading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                    <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                    <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Log in
              </Link>
            </p>
          </div>

          {/* Right Image Section */}
          <div className="hidden lg:block w-1/2 relative bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400" 
              alt="People collaborating" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-12 text-white">
              <h3 className="text-2xl font-bold mb-3 tracking-tight">Launch your dreams.</h3>
              <p className="text-zinc-200 text-sm leading-relaxed max-w-sm">
                Join thousands of creators and backers building the future together on Crowdfundly.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
