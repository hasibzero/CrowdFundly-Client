"use client";
import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ManualNotificationForm() {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    try {
      const token = localStorage.getItem('crowdfundly_token');
      await axios.post(`${API_URL}/api/notifications`, { message }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatus('success');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response?.data?.message || 'Failed to send');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] mt-8">
      <h3 className="text-[14px] font-bold text-[#0f172a] mb-4">Broadcast Manual Notification</h3>
      <form onSubmit={handleSend} className="flex space-x-3">
        <input 
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your notification message to all users..."
          className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-3"
          required
        />
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="bg-[#12643E] hover:bg-[#0e4f31] text-white px-6 py-3 rounded-lg text-sm font-bold flex items-center space-x-2 transition-colors disabled:opacity-50"
        >
          {status === 'loading' ? (
            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Send</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
      {status === 'success' && (
        <p className="mt-3 flex items-center text-sm text-emerald-600 font-medium">
          <CheckCircle className="w-4 h-4 mr-1.5" /> Broadcast sent successfully!
        </p>
      )}
      {status === 'error' && (
        <p className="mt-3 flex items-center text-sm text-red-500 font-medium">
          <AlertCircle className="w-4 h-4 mr-1.5" /> {errorMsg}
        </p>
      )}
    </div>
  );
}
