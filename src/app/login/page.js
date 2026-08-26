"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, loginWithGoogleToken, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoggingIn(true);
    const toastId = toast.loading("Logging in...");

    const success = await login(email, password);
    if (success) {
      toast.success("Successfully logged in!", { id: toastId });
    } else {
      toast.error("Login failed. Please check your credentials.", { id: toastId });
      setIsLoggingIn(false);
    }
  };
  const triggerGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // better-auth resolves with { error } on failure and redirects the browser
      // on success. Handle both paths: surface the actual error (not a generic
      // message) and never leave the form permanently disabled if no redirect happens.
      const res = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/select-role',
      });
      if (res?.error) {
        console.error('Google sign-in error:', res.error);
        toast.error(res.error.message || 'Failed to initialize Google login');
        setIsGoogleLoading(false);
      }
      // On success better-auth redirects the browser, so nothing else to do here.
    } catch (err) {
      console.error('Google sign-in threw:', err);
      toast.error(err?.message || 'Failed to initialize Google login');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex flex-1 flex-col justify-center items-center px-4 py-12 pt-24 w-full">
        <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 w-full max-w-[448px]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500 text-sm">
              Log in to your Crowdfundly account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
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
                  disabled={isLoggingIn}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <Link href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  disabled={isLoggingIn}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#12643E] focus:border-[#12643E] sm:text-sm transition-colors outline-none disabled:bg-slate-50"
                />
                <div 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn || !email || !password}
              className="w-full flex justify-center items-center gap-2 bg-[#065f46] hover:bg-[#044e39] text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors mt-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? "Logging in..." : (
                <>Login <ArrowRight className="w-4 h-4" /></>
              )}
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
                onClick={triggerGoogleLogin}
                disabled={isLoggingIn || isGoogleLoading}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                {isGoogleLoading ? 'Connecting…' : 'Sign in with Google'}
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
