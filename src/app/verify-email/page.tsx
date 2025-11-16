'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Navbar from "@/components/Navbar";

function VerifyEmailContent() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    // Get signup data from sessionStorage
    const signupData = sessionStorage.getItem('signupData');
    if (!signupData) {
      toast.error('No signup data found. Please sign up again.');
      router.push('/signup');
      return;
    }
    const { email: userEmail } = JSON.parse(signupData);
    setEmail(userEmail);
  }, [router]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCountdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      // Verify OTP
      await axios.post('/api/auth/verify-otp', { email, otp: otpCode });
      
      // Get signup data from sessionStorage
      const signupData = sessionStorage.getItem('signupData');
      if (!signupData) {
        toast.error('No signup data found. Please sign up again.');
        router.push('/signup');
        return;
      }

      const { username, password } = JSON.parse(signupData);

      // Register the user
      await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      // Clear sessionStorage
      sessionStorage.removeItem('signupData');

      toast.success('Registration successful! Please log in.');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : 'Failed to verify OTP';
      toast.error(message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    setResending(true);

    try {
      await axios.post('/api/auth/send-otp', { email });
      toast.success('New OTP sent to your email');
      setOtp(['', '', '', '', '', '']);
      setResendCountdown(60);
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error
        : 'Failed to resend OTP';
      toast.error(message || 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-black">Verify Your Email</h1>
            <p className="text-gray-600">
              Enter the 6-digit code sent to <span className="font-medium text-black">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-gray-200 rounded-lg shadow p-8">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border border-gray-300 rounded focus:border-[#FF5733] focus:outline-none focus:ring-2 focus:ring-[#FF5733] text-black"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#FF5733] text-white font-bold rounded-md hover:bg-[#E64A2E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify & Create Account'}
            </button>

            <div className="text-center">
              {resendCountdown > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in {resendCountdown} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resending}
                  className="text-sm text-[#FF5733] hover:text-[#E64A2E] transition-colors disabled:opacity-50"
                >
                  {resending ? 'Resending...' : "Didn't receive code? Resend"}
                </button>
              )}
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                sessionStorage.removeItem('signupData');
                router.push('/signup');
              }}
              className="text-sm text-gray-600 hover:text-[#FF5733]"
            >
              ← Back to Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-black">Loading...</div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
