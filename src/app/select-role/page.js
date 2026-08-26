"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { authClient } from '@/lib/auth-client';
import { Rocket, Coins, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ROLES = [
  {
    id: 'Supporter',
    tagline: 'Back the projects you believe in',
    description: 'Purchase credits and contribute to campaigns you want to see succeed, then track everything you have funded from your dashboard.',
    Icon: Coins,
    points: ['Fund campaigns with credits', 'Follow the projects you support', 'See your full contribution history'],
  },
  {
    id: 'Creator',
    tagline: 'Launch and fund your ideas',
    description: 'Submit campaigns for review, raise credits from supporters, and withdraw what you earn once you reach the payout threshold.',
    Icon: Rocket,
    points: ['Create campaigns for review', 'Raise credits from backers', 'Withdraw your earned credits'],
  },
];

export default function SelectRolePage() {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const [checking, setChecking] = useState(true);

  // Gate: only unassigned Google (better-auth) users may see this page.
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    // Email/password users choose their role at registration — never here.
    const hasJwt = typeof window !== 'undefined' && localStorage.getItem('crowdfundly_token');
    if (hasJwt || user.role === 'Admin' || user.roleSelected) {
      router.replace('/dashboard');
      return;
    }
    setChecking(false);
  }, [user, loading, router]);

  const handleConfirm = async () => {
    if (!selected || saving) return;
    setSaving(true);
    const toastId = toast.loading('Setting up your account...');
    try {
      // One-time, permanent role assignment for this account.
      await authClient.updateUser({ role: selected, roleSelected: true });
      setUser((prev) => ({ ...(prev || {}), role: selected, roleSelected: true }));
      toast.success(`You're all set as a ${selected}.`, { id: toastId });
      router.replace('/dashboard');
    } catch (err) {
      console.error('Role selection failed:', err);
      toast.error('Could not save your choice. Please try again.', { id: toastId });
      setSaving(false);
    }
  };

  if (loading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Preparing your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Brand header (no navigation — this is a required one-time step) */}
      <header className="flex items-center gap-2 px-6 md:px-12 h-16 border-b border-gray-100 bg-white">
        <Rocket className="w-6 h-6 text-[#12643E]" />
        <span className="text-xl font-extrabold text-[#12643E] tracking-tight">Crowdfundly</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center">
            {user?.name && (
              <p className="text-sm font-semibold text-[#12643E] mb-2">
                Welcome, {user.name.split(' ')[0]}
              </p>
            )}
            <h1 className="text-3xl md:text-[34px] font-bold text-slate-900 tracking-tight">
              How do you want to use Crowdfundly?
            </h1>
            <p className="text-slate-500 text-sm md:text-base mt-3 max-w-[36rem] mx-auto">
              Pick the role that fits you best. This sets up your dashboard and is a
              one-time choice — <span className="font-semibold text-slate-700">it can&apos;t be changed later</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            {ROLES.map(({ id, tagline, description, Icon, points }) => {
              const isActive = selected === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelected(id)}
                  disabled={saving}
                  aria-pressed={isActive}
                  className={`relative text-left rounded-2xl border-2 p-6 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#12643E]/40 disabled:opacity-70 ${
                    isActive
                      ? 'border-[#12643E] bg-[#12643E]/[0.04] shadow-lg shadow-[#12643E]/10 -translate-y-0.5'
                      : 'border-slate-200 bg-white hover:border-[#12643E]/40 hover:shadow-md'
                  }`}
                >
                  {isActive && (
                    <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-[#12643E]" />
                  )}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                      isActive ? 'bg-[#12643E] text-white' : 'bg-emerald-50 text-[#12643E]'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{id}</h2>
                  <p className="text-[13px] font-semibold text-[#12643E] mb-3">{tagline}</p>
                  <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{description}</p>
                  <ul className="space-y-1.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-[13px] text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selected || saving}
              className="w-full sm:w-auto min-w-[240px] flex justify-center items-center gap-2 bg-[#12643E] hover:bg-[#0e4f31] text-white py-3 px-8 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Setting up...' : selected ? `Continue as ${selected}` : 'Select a role to continue'}
            </button>
            <p className="text-[12px] text-slate-400">You won&apos;t be able to switch roles after this step.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
