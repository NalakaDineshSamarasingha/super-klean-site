'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Stats {
  totalUsers: number;
  totalBookings: number;
  totalPendingBookings: number;
}

interface Booking {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  vehicleNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'suggestion_pending' | 'cancelled';
  suggestedDate?: string;
  suggestedTime?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  service: string;
  status: 'pending' | 'approved' | 'rejected';
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookings' | 'suggestions' | 'approved' | 'reviews'>('bookings');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalBookings: 0,
    totalPendingBookings: 0,
  });
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [suggestionBookings, setSuggestionBookings] = useState<Booking[]>([]);
  const [approvedBookings, setApprovedBookings] = useState<Booking[]>([]);
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [isLoadingApproved, setIsLoadingApproved] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [processingBookingId, setProcessingBookingId] = useState<string | null>(null);
  const [processingReviewId, setProcessingReviewId] = useState<string | null>(null);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [suggestedDate, setSuggestedDate] = useState('');
  const [suggestedTime, setSuggestedTime] = useState('');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Fetch admin stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const result = await response.json();

        if (response.ok && result.success) {
          setStats(result.stats);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (user?.role === 'admin') {
      fetchStats();
    }
  }, [user]);

  // Fetch pending bookings
  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings?status=pending');
        const result = await response.json();

        if (response.ok && result.success) {
          setPendingBookings(result.bookings);
        }
      } catch (error) {
        console.error('Error fetching pending bookings:', error);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    if (user?.role === 'admin') {
      fetchPendingBookings();
    }
  }, [user]);

  // Fetch suggestion bookings
  useEffect(() => {
    const fetchSuggestionBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings?status=suggestion_pending');
        const result = await response.json();

        if (response.ok && result.success) {
          setSuggestionBookings(result.bookings);
        }
      } catch (error) {
        console.error('Error fetching suggestion bookings:', error);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    if (user?.role === 'admin') {
      fetchSuggestionBookings();
    }
  }, [user]);

  // Fetch approved bookings
  useEffect(() => {
    const fetchApprovedBookings = async () => {
      try {
        const response = await fetch('/api/admin/bookings?status=approved');
        const result = await response.json();

        if (response.ok && result.success) {
          // Sort by preferredDate in ascending order
          const sortedBookings = result.bookings.sort((a: Booking, b: Booking) => {
            return new Date(a.preferredDate).getTime() - new Date(b.preferredDate).getTime();
          });
          setApprovedBookings(sortedBookings);
        }
      } catch (error) {
        console.error('Error fetching approved bookings:', error);
      } finally {
        setIsLoadingApproved(false);
      }
    };

    if (user?.role === 'admin') {
      fetchApprovedBookings();
    }
  }, [user]);

  // Fetch pending reviews
  useEffect(() => {
    const fetchPendingReviews = async () => {
      try {
        const response = await fetch('/api/reviews/list?status=pending');
        const result = await response.json();

        if (response.ok && result.success) {
          setPendingReviews(result.reviews);
        }
      } catch (error) {
        console.error('Error fetching pending reviews:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    if (user?.role === 'admin') {
      fetchPendingReviews();
    }
  }, [user]);

  const handleUpdateStatus = async (bookingId: string, status: 'approved' | 'rejected') => {
    setProcessingBookingId(bookingId);
    
    try {
      const response = await fetch('/api/admin/bookings/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId, status }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove the booking from pending list
        setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalPendingBookings: prev.totalPendingBookings - 1,
        }));

        alert(`Booking ${status} successfully!`);
      } else {
        alert(result.error || 'Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleSuggestDateTime = (booking: Booking) => {
    setSelectedBooking(booking);
    setSuggestedDate(booking.preferredDate);
    setSuggestedTime(booking.preferredTime);
    setAdminNote('');
    setShowSuggestModal(true);
  };

  const handleSubmitSuggestion = async () => {
    if (!selectedBooking || !suggestedDate || !suggestedTime) {
      alert('Please provide both date and time');
      return;
    }

    setProcessingBookingId(selectedBooking.id);
    
    try {
      const response = await fetch('/api/admin/bookings/suggest-datetime', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          bookingId: selectedBooking.id,
          suggestedDate,
          suggestedTime,
          adminNote,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove the booking from pending list
        setPendingBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
        
        // Update stats
        setStats(prev => ({
          ...prev,
          totalPendingBookings: prev.totalPendingBookings - 1,
        }));

        setShowSuggestModal(false);
        setSelectedBooking(null);
        setSuggestedDate('');
        setSuggestedTime('');
        setAdminNote('');
        
        alert('Date/Time suggestion sent to customer successfully!');
      } else {
        alert(result.error || 'Failed to send suggestion');
      }
    } catch (error) {
      console.error('Error sending suggestion:', error);
      alert('Failed to send suggestion');
    } finally {
      setProcessingBookingId(null);
    }
  };

  const handleUpdateReview = async (reviewId: string, status: 'approved' | 'rejected', isPublished?: boolean) => {
    setProcessingReviewId(reviewId);
    
    try {
      const response = await fetch('/api/reviews/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reviewId, 
          status, 
          isPublished: status === 'approved' ? (isPublished !== undefined ? isPublished : true) : false 
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove the review from pending list
        setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
        
        alert(`Review ${status} successfully!`);
      } else {
        alert(result.error || 'Failed to update review');
      }
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Failed to update review');
    } finally {
      setProcessingReviewId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your Super Klean business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#FF5733] to-[#E64A2E] p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white/80 text-sm font-medium mb-1">Total Users</h3>
                <p className="text-4xl font-black text-white">
                  {isLoadingStats ? '...' : stats.totalUsers}
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white/80 text-sm font-medium mb-1">Total Bookings</h3>
                <p className="text-4xl font-black text-white">
                  {isLoadingStats ? '...' : stats.totalBookings}
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white/80 text-sm font-medium mb-1">Pending Bookings</h3>
                <p className="text-4xl font-black text-white">
                  {isLoadingStats ? '...' : stats.totalPendingBookings}
                </p>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Switcher */}
        <div className="mb-8 flex gap-4 pt-10 flex-wrap">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'bookings'
                ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Pending Bookings ({pendingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'suggestions'
                ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Suggestion Bookings ({suggestionBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'approved'
                ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Approved Bookings ({approvedBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'reviews'
                ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Pending Reviews ({pendingReviews.length})
          </button>
        </div>

        {/* Pending Bookings Section */}
        {activeTab === 'bookings' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Pending Bookings</h2>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              {pendingBookings.length} pending
            </span>
          </div>

          {isLoadingBookings ? (
            <div className="text-center py-12 text-gray-400">Loading bookings...</div>
          ) : pendingBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400 text-lg">No pending bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#FF5733]/20 p-2 rounded">
                          <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Customer</p>
                          <p className="text-white font-semibold">{booking.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Contact</p>
                          <p className="text-white">{booking.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-white text-sm">{booking.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Vehicle</p>
                          <p className="text-white font-semibold">{booking.vehicleNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-orange-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Date & Time</p>
                          <p className="text-white">{booking.preferredDate} at {booking.preferredTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-yellow-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Service</p>
                          <p className="text-white font-semibold capitalize">{booking.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.specialNotes && (
                    <div className="bg-white/5 rounded p-3 mb-4">
                      <p className="text-xs text-gray-400 mb-1">Special Notes:</p>
                      <p className="text-white text-sm">{booking.specialNotes}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(booking.id, 'approved')}
                      disabled={processingBookingId === booking.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {processingBookingId === booking.id ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleSuggestDateTime(booking)}
                      disabled={processingBookingId === booking.id}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {processingBookingId === booking.id ? 'Processing...' : 'Suggest New Date/Time'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        )}

        {/* Suggestion Bookings Section */}
        {activeTab === 'suggestions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Suggestion Bookings</h2>
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
              {suggestionBookings.length} awaiting response
            </span>
          </div>

          {isLoadingSuggestions ? (
            <div className="text-center py-12 text-gray-400">Loading suggestion bookings...</div>
          ) : suggestionBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-lg">No suggestion bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestionBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border-2 border-purple-500/30 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#FF5733]/20 p-2 rounded">
                          <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Customer</p>
                          <p className="text-white font-semibold">{booking.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Contact</p>
                          <p className="text-white">{booking.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-green-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Vehicle & Service</p>
                          <p className="text-white font-semibold">{booking.vehicleNumber} - {booking.service}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-3">
                        <p className="text-xs text-red-400 mb-1">Original Request:</p>
                        <p className="text-white text-sm font-semibold">{booking.preferredDate} at {booking.preferredTime}</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                        <p className="text-xs text-purple-400 mb-1">Suggested:</p>
                        <p className="text-white text-sm font-semibold">{(booking as any).suggestedDate} at {(booking as any).suggestedTime}</p>
                        {(booking as any).adminNote && (
                          <p className="text-gray-400 text-xs mt-2">{(booking as any).adminNote}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {booking.specialNotes && (
                    <div className="bg-white/5 rounded p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-1">Customer Notes:</p>
                      <p className="text-white text-sm">{booking.specialNotes}</p>
                    </div>
                  )}

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-center">
                    <p className="text-purple-300 text-sm">
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Waiting for customer response
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        )}

        {/* Approved Bookings Section */}
        {activeTab === 'approved' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Approved Bookings</h2>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
              {approvedBookings.length} scheduled
            </span>
          </div>

          {isLoadingApproved ? (
            <div className="text-center py-12 text-gray-400">Loading approved bookings...</div>
          ) : approvedBookings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-gray-400 text-lg">No approved bookings</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border-2 border-green-500/30 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#FF5733]/20 p-2 rounded">
                          <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Customer</p>
                          <p className="text-white font-semibold">{booking.fullName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Contact</p>
                          <p className="text-white">{booking.phoneNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-purple-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-white text-sm">{booking.email || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-green-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Vehicle</p>
                          <p className="text-white font-semibold">{booking.vehicleNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-orange-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Scheduled Date & Time</p>
                          <p className="text-white font-bold">{booking.preferredDate} at {booking.preferredTime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-yellow-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Service</p>
                          <p className="text-white font-semibold capitalize">{booking.service}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {booking.specialNotes && (
                    <div className="bg-white/5 rounded p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-1">Special Notes:</p>
                      <p className="text-white text-sm">{booking.specialNotes}</p>
                    </div>
                  )}

                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                    <p className="text-green-300 text-sm font-medium">
                      <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Booking Confirmed
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        )}

        {/* Pending Reviews Section */}
        {activeTab === 'reviews' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Pending Reviews</h2>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
              {pendingReviews.length} pending
            </span>
          </div>

          {isLoadingReviews ? (
            <div className="text-center py-12 text-gray-400">Loading reviews...</div>
          ) : pendingReviews.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-gray-400 text-lg">No pending reviews</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 border border-white/10 rounded-lg p-5 hover:bg-white/10 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#FF5733]/20 p-2 rounded">
                          <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Customer</p>
                          <p className="text-white font-semibold">{review.userName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-purple-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Email</p>
                          <p className="text-white text-sm">{review.userEmail || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-yellow-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Rating</p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.service && (
                      <div className="flex items-center gap-2">
                        <div className="bg-blue-500/20 p-2 rounded">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Service</p>
                          <p className="text-white font-semibold capitalize">{review.service}</p>
                        </div>
                      </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded p-4 mb-4">
                    <p className="text-xs text-gray-400 mb-2">Review Comment:</p>
                    <p className="text-white text-sm leading-relaxed">{review.comment}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateReview(review.id, 'approved')}
                      disabled={processingReviewId === review.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {processingReviewId === review.id ? 'Processing...' : 'Approve & Publish'}
                    </button>
                    <button
                      onClick={() => handleUpdateReview(review.id, 'rejected')}
                      disabled={processingReviewId === review.id}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {processingReviewId === review.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
        )}

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={logout}
            className="bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-lg font-medium transition-all inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Suggest Date/Time Modal */}
      {showSuggestModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Suggest New Date & Time</h3>
            
            <div className="space-y-5 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Customer: <span className="text-white">{selectedBooking.fullName}</span>
                </label>
                <label className="block text-xs text-gray-400">
                  Current Request: {selectedBooking.preferredDate} at {selectedBooking.preferredTime}
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Suggested Date <span className="text-[#FF5733]">*</span>
                </label>
                <input
                  type="date"
                  value={suggestedDate}
                  onChange={(e) => setSuggestedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Suggested Time <span className="text-[#FF5733]">*</span>
                </label>
                <input
                  type="time"
                  value={suggestedTime}
                  onChange={(e) => setSuggestedTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Admin Note <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={3}
                  placeholder="Reason for suggesting different date/time..."
                  className="w-full px-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5733] transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowSuggestModal(false);
                  setSelectedBooking(null);
                  setSuggestedDate('');
                  setSuggestedTime('');
                  setAdminNote('');
                }}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitSuggestion}
                disabled={!suggestedDate || !suggestedTime || processingBookingId === selectedBooking.id}
                className="flex-1 bg-[#FF5733] hover:bg-[#E64A2E] disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl font-medium transition-all"
              >
                {processingBookingId === selectedBooking.id ? 'Sending...' : 'Send Suggestion'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
