'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-black text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">Customer Dashboard</h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded">
              <h2 className="text-xl font-bold mb-4">Profile Information</h2>
              <div className="space-y-2">
                <p><span className="text-gray-400">Name:</span> {user.firstName} {user.lastName}</p>
                <p><span className="text-gray-400">Username:</span> {user.username}</p>
                <p><span className="text-gray-400">Email:</span> {user.email}</p>
                <p><span className="text-gray-400">Role:</span> {user.role}</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full py-2 px-4 bg-[#FF5733] hover:bg-[#E64A2E] transition-all rounded">
                  Book Service
                </button>
                <button className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 transition-all rounded">
                  View Bookings
                </button>
                <button
                  onClick={logout}
                  className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 transition-all rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
