"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreditCard, FileText } from 'lucide-react';
import { API_URL, authHeaders } from '@/lib/api';

export default function PaymentHistoryPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/api/credits/purchases`, { headers: authHeaders() })
      .then((response) => setPurchases(response.data))
      .finally(() => setLoading(false));
  }, []);

  return <section className="mx-auto w-full max-w-6xl">
    <div className="mb-10 flex items-end justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight text-[#0f172a]">Payment history</h1><p className="mt-2 text-sm text-gray-600">Completed credit purchases recorded in your account.</p></div><div className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#0f172a]">{purchases.length} completed orders</div></div>
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {loading ? <div className="p-12 text-center text-sm text-gray-500">Loading your purchase history…</div> : purchases.length === 0 ? <div className="flex flex-col items-center p-16 text-center"><FileText className="mb-4 h-9 w-9 text-gray-300" /><h2 className="font-bold text-gray-900">No purchases yet</h2><p className="mt-2 max-w-sm text-sm text-gray-500">Secure credit purchases will appear here after Stripe confirms payment.</p></div> : <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left"><thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Transaction</th><th className="px-6 py-4">Credits</th><th className="px-6 py-4">Method</th><th className="px-6 py-4 text-right">Amount</th></tr></thead><tbody className="divide-y divide-gray-100">{purchases.map((purchase) => <tr key={purchase._id}><td className="px-6 py-5 text-sm text-gray-600">{new Date(purchase.createdAt).toLocaleString()}</td><td className="px-6 py-5 font-mono text-xs text-gray-500">{purchase.stripeSessionId}</td><td className="px-6 py-5 font-bold text-[#0f766e]">+{purchase.credits.toLocaleString()} CR</td><td className="px-6 py-5"><span className="inline-flex items-center gap-2 text-sm text-gray-600"><CreditCard className="h-4 w-4" />Stripe Checkout</span></td><td className="px-6 py-5 text-right font-bold text-[#0f172a]">${(purchase.amountUSD || 0).toFixed(2)}</td></tr>)}</tbody></table></div>}
    </div>
  </section>;
}
