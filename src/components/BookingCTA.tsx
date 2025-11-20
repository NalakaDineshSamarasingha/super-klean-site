'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function BookingCTA() {
  const { user } = useAuth();
  const router = useRouter();

  const handleBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
    } else {
      router.push('/booking');
    }
  };
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Luxury sports car"
          fill
          className="object-cover opacity-40"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-6 bg-[#FF5733]"></div>
            <p className="text-gray-300 uppercase tracking-wider text-sm">
              READY TO HIT THE ROAD? SCHEDULE YOUR SERVICE NOW!
            </p>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-12 font-[family-name:var(--font-teko)] uppercase tracking-wide">
            EXPERIENCE THE BEST<br />
            SERVICE – BOOK YOUR CAR<br />
            MAINTENANCE TODAY
          </h2>

          {/* CTA Button */}
          <div>
            <button
              onClick={handleBooking}
              className="inline-flex items-center justify-center px-12 py-5 bg-[#FF5733] text-white font-bold text-lg uppercase tracking-wider hover:bg-[#E64A2E] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              LET'S GET STARTED!
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Orange Squares */}
      <div className="absolute left-8 top-1/2 w-4 h-4 bg-[#FF5733]"></div>
      <div className="absolute right-8 top-1/2 w-4 h-4 bg-[#FF5733]"></div>
      <div className="absolute left-8 bottom-8 w-4 h-4 bg-[#FF5733]"></div>
      <div className="absolute right-8 bottom-8 w-4 h-4 bg-[#FF5733]"></div>
    </section>
  );
}
