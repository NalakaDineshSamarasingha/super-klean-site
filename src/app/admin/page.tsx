'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-black text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#FF5733] p-6 rounded">
              <h3 className="text-lg font-bold mb-2">Total Users</h3>
              <p className="text-3xl font-black">0</p>
            </div>
            <div className="bg-white/10 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">Total Bookings</h3>
              <p className="text-3xl font-black">0</p>
            </div>
            <div className="bg-white/10 p-6 rounded">
              <h3 className="text-lg font-bold mb-2">Pending Services</h3>
              <p className="text-3xl font-black">0</p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="py-3 px-4 bg-[#FF5733] hover:bg-[#E64A2E] transition-all rounded">
                Manage Users
              </button>
              <button className="py-3 px-4 bg-white/10 hover:bg-white/20 transition-all rounded">
                Manage Services
              </button>
              <button className="py-3 px-4 bg-white/10 hover:bg-white/20 transition-all rounded">
                View Reports
              </button>
              <button
                onClick={logout}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 transition-all rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
