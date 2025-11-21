'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Booking {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  vehicleNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  service: string;
  status: string;
  isPublished: boolean;
  createdAt: string;
}

interface UserData {
  fullName: string;
  mobileNumber: string;
  username: string;
  email: string;
}

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'reviews' | 'account'>('overview');
  const [currentBookings, setCurrentBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    mobileNumber: '',
    username: '',
    email: '',
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Fetch all user data
  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;

      setIsLoadingData(true);
      try {
        // Fetch user profile
        const userResponse = await fetch(`/api/users/${user.uid}`);
        if (userResponse.ok) {
          const userResult = await userResponse.json();
          setUserData(userResult.user);
        }

        // Fetch bookings
        const bookingsResponse = await fetch(`/api/bookings/list?userId=${user.uid}`);
        if (bookingsResponse.ok) {
          const bookingsResult = await bookingsResponse.json();
          const allBookings = bookingsResult.bookings || [];
          
          // Separate current and past bookings
          const current = allBookings.filter((b: Booking) => 
            b.status === 'pending' || b.status === 'approved'
          );
          const past = allBookings.filter((b: Booking) => 
            b.status === 'completed' || b.status === 'rejected'
          );
          
          setCurrentBookings(current);
          setPastBookings(past);
        }

        // Fetch reviews
        const reviewsResponse = await fetch(`/api/reviews/list?userId=${user.uid}`);
        if (reviewsResponse.ok) {
          const reviewsResult = await reviewsResponse.json();
          setReviews(reviewsResult.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchAllData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: userData.fullName,
          mobileNumber: userData.mobileNumber,
          username: userData.username,
        }),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/users/${user.uid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Account deleted successfully');
        await logout();
        router.push('/');
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Failed to delete account');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete account');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'approved':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[#FF5733] border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF5733] rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#FF5733] rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-start justify-between"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              Welcome back, <span className="text-[#FF5733]">{userData.fullName || user.email}</span>
            </h1>
            <p className="text-gray-400">Manage your bookings, reviews, and account settings</p>
          </div>
          <button
            onClick={logout}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 overflow-x-auto"
        >
          <div className="flex gap-2 bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-white/10 inline-flex min-w-full sm:min-w-0">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'account', label: 'Account' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="flex flex-col lg:flex-row gap-4 py-8"
            >
              {/* Bookings History */}
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span>Booking History</span>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                    {currentBookings.length + pastBookings.length}
                  </span>
                </h2>
                <div className="flex flex-col gap-5">
                  {[...currentBookings, ...pastBookings].length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 border border-white/10 text-center">
                      <p className="text-gray-400 mb-4">No bookings yet</p>
                      <button
                        onClick={() => router.push('/booking')}
                        className="px-6 py-2 bg-[#FF5733] hover:bg-[#E64A2E] rounded-lg transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  ) : (
                    [...currentBookings, ...pastBookings].map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold">{booking.service}</h3>
                            <p className="text-xs text-gray-400">Booking #{booking.id.slice(0, 8)}</p>
                          </div>
                          <span className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold uppercase">{booking.vehicleNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{new Date(booking.preferredDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{booking.preferredTime}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Reviews History */}
              <div className="flex-1 flex flex-col gap-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <span>Review History</span>
                  <span className="text-sm bg-white/10 px-3 py-1 rounded-full">
                    {reviews.length}
                  </span>
                </h2>
                <div className="flex flex-col gap-5">
                  {reviews.length === 0 ? (
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 border border-white/10 text-center">
                      <p className="text-gray-400">No reviews yet</p>
                    </div>
                  ) : (
                    reviews.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < review.rating ? 'text-[#FF5733]' : 'text-gray-600'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            review.isPublished
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          }`}>
                            {review.isPublished ? 'Published' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-gray-400">{review.service}</p>
                          <p className="text-white text-sm line-clamp-2">{review.comment}</p>
                          <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-8"
            >
              {/* Current Bookings */}
              <div>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>Current Bookings</span>
                  {currentBookings.length > 0 && (
                    <span className="text-sm bg-[#FF5733] px-2 py-1 rounded-full">{currentBookings.length}</span>
                  )}
                </h2>
                {currentBookings.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 border border-white/10 text-center">
                    <p className="text-gray-400 mb-4">No current bookings</p>
                    <button
                      onClick={() => router.push('/booking')}
                      className="px-6 py-2 bg-[#FF5733] hover:bg-[#E64A2E] rounded-lg transition-all"
                    >
                      Book Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{booking.service}</h3>
                            <p className="text-sm text-gray-400">Booking #{booking.id.slice(0, 8)}</p>
                          </div>
                          <span className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Vehicle</p>
                            <p className="font-semibold uppercase">{booking.vehicleNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Date</p>
                            <p className="font-semibold">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Time</p>
                            <p className="font-semibold">{booking.preferredTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Contact</p>
                            <p className="font-semibold">{booking.phoneNumber}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Past Bookings */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
                {pastBookings.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 border border-white/10 text-center">
                    <p className="text-gray-400">No past bookings</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pastBookings.map((booking, index) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{booking.service}</h3>
                            <p className="text-sm text-gray-400">Booking #{booking.id.slice(0, 8)}</p>
                          </div>
                          <span className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400">Vehicle</p>
                            <p className="font-semibold uppercase">{booking.vehicleNumber}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Date</p>
                            <p className="font-semibold">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Time</p>
                            <p className="font-semibold">{booking.preferredTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Completed</p>
                            <p className="font-semibold">{new Date(booking.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <h2 className="text-2xl font-bold mb-4">My Reviews</h2>
              {reviews.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-12 border border-white/10 text-center">
                  <p className="text-gray-400">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xl ${i < review.rating ? 'text-[#FF5733]' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                            review.isPublished
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          }`}>
                            {review.isPublished ? 'Published' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{review.service}</p>
                      <p className="text-white mb-2">{review.comment}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-2xl"
            >
              <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
              
              <form onSubmit={handleUpdateProfile} className="bg-white/5 backdrop-blur-xl rounded-xl p-8 border border-white/10 mb-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Full Name <span className="text-[#FF5733]">*</span>
                    </label>
                    <input
                      type="text"
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Username <span className="text-[#FF5733]">*</span>
                    </label>
                    <input
                      type="text"
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                      required
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Mobile Number <span className="text-[#FF5733]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={userData.mobileNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 10) {
                          setUserData({ ...userData, mobileNumber: value });
                        }
                      }}
                      required
                      pattern="\d{10}"
                      maxLength={10}
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] transition-all"
                    />
                    <p className="mt-1 text-xs text-gray-400">{userData.mobileNumber.length}/10 digits</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      Email <span className="text-gray-500">(Cannot be changed)</span>
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-[#FF5733] hover:bg-[#E64A2E] text-white font-semibold py-4 rounded-xl transition-all disabled:opacity-50"
                  >
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                  </button>
                </div>
              </form>

              {/* Delete Account Section */}
              <div className="bg-red-500/10 backdrop-blur-xl rounded-xl p-8 border border-red-500/30">
                <h3 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h3>
                <p className="text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-semibold rounded-xl transition-all"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-red-400 font-semibold">Are you absolutely sure?</p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleDeleteAccount}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all"
                      >
                        Yes, Delete My Account
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
