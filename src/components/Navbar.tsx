'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Debug: Log user state
  useEffect(() => {
    console.log('Navbar - User state:', user);
    console.log('Navbar - Loading state:', loading);
  }, [user, loading]);

  // Handle role-based navigation after login
  useEffect(() => {
    if (!loading && user) {
      const currentPath = window.location.pathname;
      if (currentPath === '/login') {
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    }
  }, [user, loading, router]);

  const handleUserClick = () => {
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white flex justify-center">
      <div className="w-[95%] px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            
            <Link href="/" className="text-xl font-bold tracking-wider uppercase">
              Super Kleen
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
            <Link 
              href="/" 
              className={`transition-colors ${
                pathname === '/' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={`transition-colors ${
                pathname === '/services' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/plans" 
              className={`transition-colors ${
                pathname === '/plans' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              Plans
            </Link>
            <Link 
              href="/testimonials" 
              className={`transition-colors ${
                pathname === '/testimonials' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              Testimonials
            </Link>
            <Link 
              href="/location" 
              className={`transition-colors ${
                pathname === '/location' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              Location
            </Link>
            <Link 
              href="/faqs" 
              className={`transition-colors ${
                pathname === '/faqs' 
                  ? 'text-white border-b-2 border-[#FF5733] pb-1' 
                  : 'text-gray-300 hover:text-[#FF5733]'
              }`}
            >
              FAQs
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            {!loading && user ? (
              <>
                <button
                  onClick={handleUserClick}
                  className="px-6 py-2.5 text-white hover:text-[#FF5733] transition-colors font-medium tracking-wide uppercase text-sm cursor-pointer"
                >
                  {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-2 bg-[#FF5733] text-white hover:bg-[#E64A2E] transition-all duration-300 font-bold tracking-wider uppercase text-sm"
                >
                  Contact Us
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-white hover:text-[#FF5733] transition-colors font-medium tracking-wide uppercase text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-2 bg-[#FF5733] text-white hover:bg-[#E64A2E] transition-all duration-300 font-bold tracking-wider uppercase text-sm"
                >
                  Contact Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#FF5733] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              href="/"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/services' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/plans"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/plans' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Plans
            </Link>
            <Link
              href="/testimonials"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/testimonials' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/location"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/location' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Location
            </Link>
            <Link
              href="/faqs"
              className={`block px-4 py-3 hover:bg-white/10 transition-colors uppercase text-sm ${
                pathname === '/faqs' ? 'text-[#FF5733] font-bold' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            <div className="pt-4 space-y-2">
              {!loading && user ? (
                <>
                  <button
                    onClick={handleUserClick}
                    className="block px-4 py-3 text-center hover:text-[#FF5733] transition-all uppercase text-sm w-full"
                  >
                    {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                  </button>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 bg-[#FF5733] text-white text-center hover:bg-[#E64A2E] transition-all uppercase text-sm font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 text-center hover:text-[#FF5733] transition-all uppercase text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-3 bg-[#FF5733] text-white text-center hover:bg-[#E64A2E] transition-all uppercase text-sm font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}