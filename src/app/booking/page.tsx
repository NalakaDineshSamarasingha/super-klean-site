'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  fullName: string;
  phoneNumber: string;
  vehicleNumber: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  specialNotes: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: Date;
}

const serviceOptions = [
  { value: 'basic', label: 'Basic Plan', price: 'Rs. 1,500', color: '#3B82F6' },
  { value: 'premium', label: 'Premium Plan', price: 'Rs. 2,500', color: '#8B5CF6' },
  { value: 'gold', label: 'Gold Plan', price: 'Rs. 5,000', color: '#F59E0B' },
  { value: 'exterior', label: 'Exterior Wash', price: 'Custom', color: '#10B981' },
  { value: 'interior', label: 'Interior Detailing', price: 'Custom', color: '#EC4899' },
  { value: 'fulldetail', label: 'Full Detailing', price: 'Custom', color: '#FF5733' },
];

export default function BookingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    vehicleNumber: '',
    service: '',
    preferredDate: '',
    preferredTime: '',
    specialNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      fullName: 'John Doe',
      phoneNumber: '+94 77 123 4567',
      vehicleNumber: 'ABC-1234',
      service: 'premium',
      preferredDate: '2025-11-25',
      preferredTime: '10:00',
      specialNotes: 'Please focus on interior cleaning',
      status: 'pending',
      createdAt: new Date('2025-11-20'),
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      phoneNumber: '+94 77 987 6543',
      vehicleNumber: 'XYZ-5678',
      service: 'gold',
      preferredDate: '2025-11-18',
      preferredTime: '14:00',
      specialNotes: 'Complete detailing needed',
      status: 'approved',
      createdAt: new Date('2025-11-15'),
    },
    {
      id: '3',
      fullName: 'Mike Johnson',
      phoneNumber: '+94 77 555 1234',
      vehicleNumber: 'DEF-9012',
      service: 'basic',
      preferredDate: '2025-11-10',
      preferredTime: '09:00',
      specialNotes: '',
      status: 'completed',
      createdAt: new Date('2025-11-08'),
    },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add new booking
    const newBooking: Booking = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      createdAt: new Date(),
    };

    setBookings(prev => [newBooking, ...prev]);
    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form
    setFormData({
      fullName: '',
      phoneNumber: '',
      vehicleNumber: '',
      service: '',
      preferredDate: '',
      preferredTime: '',
      specialNotes: ''
    });

    // Hide success message and switch to history tab after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setActiveTab('history');
    }, 3000);
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

  const getServiceDetails = (serviceValue: string) => {
    return serviceOptions.find(s => s.value === serviceValue) || serviceOptions[0];
  };

  if (loading) {
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
    <div className="min-h-screen bg-black text-white pt-25">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF5733] rounded-full blur-[140px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[#FF5733] rounded-full blur-[150px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-[120px]"
        ></motion.div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-[#FF5733]/10 border border-[#FF5733]/30 rounded-full text-[#FF5733] text-sm font-semibold tracking-wider uppercase">
              Service Booking
            </span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4 text-white text-center">
            Book Your Service
          </h1>
         
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-white/10 inline-flex gap-1">
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeTab === 'new'
                  ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Booking
              </span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 relative ${
                activeTab === 'history'
                  ? 'bg-[#FF5733] text-white shadow-lg shadow-[#FF5733]/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Bookings
                {bookings.filter(b => b.status === 'pending').length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF5733] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {bookings.filter(b => b.status === 'pending').length}
                  </span>
                )}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="mb-8 relative overflow-hidden"
            >
              <div className="bg-linear-to-r from-green-500/20 via-green-500/30 to-green-500/20 border border-green-500/50 rounded-2xl p-6 backdrop-blur-md shadow-lg shadow-green-500/10">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <p className="text-green-400 font-semibold text-lg">
                    Your booking has been submitted successfully! Our team will contact you shortly.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'new' ? (
            /* New Booking Form */
            <motion.div
              key="new-booking"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-10 md:p-12 lg:p-14 border border-white/10 shadow-2xl shadow-black/20">
            {/* Decorative Corner Accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#FF5733]/30 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#FF5733]/30 rounded-br-3xl"></div>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
            {/* Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Full Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 mb-2">
                  Full Name <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20"
                    placeholder="Enter your full name"
                  />
                  {focusedField === 'fullName' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Phone Number */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-300 mb-2">
                  Phone Number <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phoneNumber')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20"
                    placeholder="+94 XX XXX XXXX"
                  />
                  {focusedField === 'phoneNumber' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Vehicle Number */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="vehicleNumber" className="block text-sm font-semibold text-gray-300 mb-2">
                  Vehicle Number <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('vehicleNumber')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20 uppercase tracking-wider"
                    placeholder="ABC-1234"
                  />
                  {focusedField === 'vehicleNumber' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Select Service - Custom Dropdown */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Select Service <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                    onFocus={() => setFocusedField('service')}
                    onBlur={() => setTimeout(() => setFocusedField(null), 200)}
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-left text-white focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      {formData.service ? (
                        <>
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${getServiceDetails(formData.service).color}20` }}
                          >
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getServiceDetails(formData.service).color }}></div>
                          </div>
                          <span className="font-semibold">{getServiceDetails(formData.service).label}</span>
                          <span className="text-[#FF5733] text-sm">- {getServiceDetails(formData.service).price}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Choose your service</span>
                      )}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-[#FF5733] transition-transform duration-300 ${serviceDropdownOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {focusedField === 'service' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <AnimatePresence>
                    {serviceDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-black/95 backdrop-blur-xl border-2 border-white/20 rounded-xl overflow-hidden shadow-2xl"
                      >
                        {serviceOptions.map((option, index) => (
                          <motion.button
                            key={option.value}
                            type="button"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, service: option.value }));
                              setServiceDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-all duration-200 flex items-center gap-3 border-b border-white/5 last:border-b-0 group"
                          >
                            <div 
                              className="w-10 h-10 flex items-center justify-center rounded-lg transition-transform group-hover:scale-105"
                              style={{ backgroundColor: `${option.color}20` }}
                            >
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: option.color }}></div>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-white group-hover:text-[#FF5733] transition-colors">
                                {option.label}
                              </div>
                              <div className="text-xs text-gray-400">{option.price}</div>
                            </div>
                            {formData.service === option.value && (
                              <svg className="w-5 h-5 text-[#FF5733]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Preferred Date */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-300 mb-2">
                  Preferred Date <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('preferredDate')}
                    onBlur={() => setFocusedField(null)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20"
                  />
                  {focusedField === 'preferredDate' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Preferred Time */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
              >
                <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-300 mb-2">
                  Preferred Time <span className="text-[#FF5733]">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="time"
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('preferredTime')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 hover:border-white/20"
                  />
                  {focusedField === 'preferredTime' && (
                    <motion.div
                      layoutId="focus-indicator"
                      className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Special Notes - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <label htmlFor="specialNotes" className="block text-sm font-semibold text-gray-300 mb-2">
                Special Notes <span className="text-gray-500 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative group">
                <textarea
                  id="specialNotes"
                  name="specialNotes"
                  value={formData.specialNotes}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('specialNotes')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className="w-full px-5 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#FF5733] focus:bg-white/10 transition-all duration-300 resize-none hover:border-white/20"
                  placeholder="Tell us about any special requirements, preferred wash type, or additional services you'd like..."
                />
                {focusedField === 'specialNotes' && (
                  <motion.div
                    layoutId="focus-indicator"
                    className="absolute -inset-0.5 bg-[#FF5733]/20 rounded-xl -z-10 blur-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-10"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                className="w-full bg-linear-to-r from-[#FF5733] to-[#E64A2E] text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF5733]/30 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    ></motion.div>
                    <span>Processing...</span>
                  </span>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submit Booking
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      animate={{
                        translateX: isSubmitting ? 0 : '-100%',
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: isSubmitting ? 0 : Infinity,
                        repeatDelay: 1,
                      }}
                    ></motion.div>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 pt-8 border-t border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#FF5733]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white">Quick Response</h3>
                <p className="text-xs text-gray-400">We'll contact you within 1 hour</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#FF5733]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white">Secure Booking</h3>
                <p className="text-xs text-gray-400">Your data is safe with us</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#FF5733]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#FF5733]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white">Expert Service</h3>
                <p className="text-xs text-gray-400">Professional car care guaranteed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
          ) : (
            /* My Bookings Section */
            <motion.div
              key="booking-history"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="space-y-5"
            >
              {bookings.length === 0 ? (
                <div className="text-center py-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  >
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No Bookings Found</h3>
                  <p className="text-sm text-gray-500">Your booking history will appear here</p>
                </div>
              ) : (
                bookings.map((booking, index) => {
                  const serviceDetails = getServiceDetails(booking.service);
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="relative bg-white/5 backdrop-blur-xl rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:bg-white/[0.07]"
                    >
                      {/* Subtle gradient overlay */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#FF5733]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-11 h-11 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${serviceDetails.color}15` }}
                            >
                              <svg className="w-5 h-5" style={{ color: serviceDetails.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-white mb-0.5">{serviceDetails.label}</h3>
                              <p className="text-xs text-gray-500">Booking #{booking.id}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Customer</p>
                              <p className="text-sm font-medium text-white truncate">{booking.fullName}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Contact</p>
                              <p className="text-sm font-medium text-white truncate">{booking.phoneNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Vehicle</p>
                              <p className="text-sm font-medium text-white uppercase tracking-wide">{booking.vehicleNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Scheduled Date</p>
                              <p className="text-sm font-medium text-white">{new Date(booking.preferredDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Time Slot</p>
                              <p className="text-sm font-medium text-white">{booking.preferredTime}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 bg-white/5 rounded-lg p-3 border border-white/5">
                            <div className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs text-gray-500 mb-0.5">Price</p>
                              <p className="text-sm font-semibold text-white">{serviceDetails.price}</p>
                            </div>
                          </div>
                        </div>

                        {/* Special Notes */}
                        {booking.specialNotes && (
                          <div className="bg-gradient-to-r from-white/5 to-white/0 rounded-lg p-3.5 border-l-3 border-[#FF5733] mb-4">
                            <div className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-[#FF5733] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                              </svg>
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-gray-400 mb-1">Special Notes</p>
                                <p className="text-sm text-gray-300 leading-relaxed">{booking.specialNotes}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Created {booking.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          {booking.status === 'pending' && (
                            <span className="text-xs text-yellow-400 flex items-center gap-1.5 font-medium">
                              <svg className="w-3.5 h-3.5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              Awaiting confirmation
                            </span>
                          )}
                          {booking.status === 'approved' && (
                            <span className="text-xs text-blue-400 flex items-center gap-1.5 font-medium">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Confirmed & scheduled
                            </span>
                          )}
                          {booking.status === 'completed' && (
                            <span className="text-xs text-green-400 flex items-center gap-1.5 font-medium">
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Service completed
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
