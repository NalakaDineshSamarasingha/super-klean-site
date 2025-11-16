import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/bg.jpg"
          alt="Vehicle service background"
          fill
          className="object-cover opacity-60"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
      </div>
      
      <div className="relative z-10 w-[90%] mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="flex flex-col gap-9">
            <div className="border-l-4 border-[#FF5733] pl-2">
              <p className="text-gray-300 uppercase tracking-wider text-sm">Commitment to quality and innovation in every service</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wider leading-[0.9] uppercase font-[family-name:var(--font-teko)]">
              DISCOVER OUR
              <br />
              <span className="text-white">CAR JOURNEY</span>
            </h1>
          </div>

          {/* Right Content */}
          <div className="space-y-6 lg:text-right">
            <p className="text-gray-200 text-lg leading-relaxed max-w-xl lg:ml-auto">
              Welcome to Super Klean! Our values are rooted in trust, integrity, and a relentless pursuit of excellence. We are not just a service provider; we are your automotive partners, committed to ensuring your vehicle's performance and longevity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 lg:justify-end">
              <Link
                href="/services"
                className="inline-block px-10 py-4 bg-[#FF5733] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#E64A2E] transition-all duration-300 text-center"
              >
                Best Services
              </Link>
              <Link
                href="/testimonials"
                className="inline-block px-10 py-4 border-3 border-white text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 text-center"
              >
                Our Customers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
